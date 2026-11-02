import { expect, test, type Page } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 1000 } });
test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion: 'no-preference' }); });
const ready = async (page: Page) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => Boolean((window as any).__editorialMotion));
};
const triggers = (page: Page) => page.evaluate(() => (window as any).ScrollTrigger.getAll().length);

for (const preference of ['site', 'system']) {
  test(`${preference} motion preference leaves all content available and stops line movement`, async ({ page }) => {
    await ready(page);
    if (preference === 'site') await page.locator('[data-world-motion]').click();
    else await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect(page.locator('[data-world-motion]')).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => triggers(page)).toBe(0);
    const line = page.locator('.line-study-hero .line-accent').first();
    const shape = await line.getAttribute('d');
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(400);
    expect(await line.getAttribute('d')).toBe(shape);
    await expect(page.locator('.editorial-note').first()).toBeVisible();
    await expect(page.locator('.editorial-project')).toHaveCount(4);
  });
}

test('line geometry responds to scroll without infinite idle loops or pinned content', async ({ page }) => {
  await ready(page);
  const line = page.locator('.line-study-hero .line-accent').first();
  const shape = await line.getAttribute('d');
  await page.mouse.wheel(0, 400);
  await expect.poll(() => line.getAttribute('d')).not.toBe(shape);
  expect(await page.evaluate(() => (window as any).gsap.globalTimeline.getChildren(true, true, true).filter((animation: any) => animation.repeat() === -1).length)).toBe(0);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
});

test('the saved motion choice also keeps archive pages still', async ({ page }) => {
  await ready(page);
  await page.locator('[data-world-motion]').click();
  await page.goto('/articles/', { waitUntil: 'networkidle' });
  await expect.poll(() => triggers(page)).toBe(0);
  await expect(page.locator('.writing-index-entry-featured')).toBeVisible();
});

test('archive motion cleans up on preference changes and keyboard mode stays still', async ({ page }) => {
  await page.goto('/work/', { waitUntil: 'networkidle' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => triggers(page)).toBe(0);
  await page.keyboard.press('Tab');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => triggers(page)).toBe(0);
  expect(await page.locator('.work-entry').first().evaluate(el => getComputedStyle(el).transform)).toBe('none');
  await expect(page.locator(':focus')).toBeVisible();
});

test('resize notifications coalesce layout refreshes', async ({ page }) => {
  await ready(page);
  const count = await page.evaluate(async () => {
    const { ScrollTrigger } = window as any;
    let count = 0;
    const record = () => count++;
    ScrollTrigger.addEventListener('refresh', record);
    for (let i = 0; i < 20; i++) dispatchEvent(new Event('resize'));
    await new Promise(resolve => setTimeout(resolve, 450));
    ScrollTrigger.removeEventListener('refresh', record);
    return count;
  });
  expect(count).toBeLessThanOrEqual(2);
});

test('page suspension releases resources and restoration creates each line timeline once', async ({ page }) => {
  await ready(page);
  const studies = await page.locator('[data-line-study]').count();
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })));
    await expect.poll(() => triggers(page)).toBe(0);
    await page.evaluate(() => dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
    expect(await triggers(page)).toBe(studies);
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
  }
  await page.locator('[data-world-motion]').click();
  await expect.poll(() => triggers(page)).toBe(0);
});
