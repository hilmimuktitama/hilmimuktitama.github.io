import { expect, test, type Page } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 1000 } });
test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion: 'no-preference' }); });
const ready = async (page: Page) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => Boolean((window as any).__commonGround));
};
const triggers = (page: Page) => page.evaluate(() => (window as any).ScrollTrigger.getAll().length);

test('homepage automatically plays the shared assembly once without controls', async ({ page }) => {
  await ready(page);
  const time = () => page.evaluate(() => (window as any).__commonGround.score.time());
  await expect.poll(time).toBeGreaterThan(0);
  expect(await time()).toBeLessThan(3);
  expect(await page.evaluate(() => (window as any).__commonGround.score.isActive())).toBe(true);
  await expect(page.locator('[data-ground-controls]')).toHaveCount(0);
  await expect.poll(time, {timeout:12000}).toBe(10);
  expect(await page.locator('.sculpture').evaluateAll(els => els.every(el => {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(el).transform);
    return Math.abs(matrix.e)<.001 && Math.abs(matrix.f)<.001;
  }))).toBe(true);
  await page.evaluate(() => scrollTo(0,document.body.scrollHeight));
  await page.waitForTimeout(100);
  await page.evaluate(() => scrollTo(0,0));
  await page.waitForTimeout(200);
  expect(await time()).toBe(10);
});

test('automatic assembly pauses outside the viewport and resumes from the same point', async ({ page }) => {
  await ready(page);
  await page.evaluate(() => scrollTo({top:document.body.scrollHeight,behavior:'instant'}));
  await expect.poll(() => page.evaluate(() => (window as any).__commonGround.score.isActive())).toBe(false);
  const paused = await page.evaluate(() => (window as any).__commonGround.score.time());
  expect(paused).toBeLessThan(10);
  await page.waitForTimeout(150);
  expect(await page.evaluate(() => (window as any).__commonGround.score.time())).toBe(paused);
  await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
  await expect.poll(() => page.evaluate(() => (window as any).__commonGround.score.time())).toBeGreaterThan(paused);
});

test('initial reduced-motion preference leaves a settled sculpture', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await ready(page);
  expect(await page.evaluate(() => (window as any).__commonGround.score.time())).toBe(10);
  expect(await page.evaluate(() => (window as any).__commonGround.score.isActive())).toBe(false);
  await expect(page.locator('[data-title-reveal]').first()).toHaveCSS('opacity','1');
});

test('system motion preference settles the sculpture and removes decorative triggers', async ({ page }) => {
  await ready(page);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => triggers(page)).toBe(0);
  expect(await page.evaluate(() => (window as any).__commonGround.score.time())).toBe(10);
  await expect(page.locator('[data-title-reveal]')).toHaveCount(3);
  await expect(page.locator('[data-note]')).toHaveCount(12);
});

test('keyboard mode settles decorative movement and leaves content usable', async ({ page }) => {
  await ready(page);
  await page.keyboard.press('Tab');
  await expect.poll(() => triggers(page)).toBe(0);
  expect(await page.evaluate(() => (window as any).__commonGround.score.time())).toBe(10);
  await expect(page.locator('[data-title-reveal]').first()).toHaveCSS('opacity', '1');
  await expect(page.locator('[data-ground-controls]')).toHaveCount(0);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
});

test('archive motion cleans up on preference changes and keyboard mode stays still', async ({ page }) => {
  await page.goto('/work/', { waitUntil: 'networkidle' });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => triggers(page)).toBe(0);
  await page.keyboard.press('Tab');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => triggers(page)).toBe(0);
  expect(await page.locator('.work-entry').first().evaluate(el => getComputedStyle(el).transform)).toBe('none');
});

test('page suspension releases owned resources and restoration mounts writing filters only once', async ({ page }) => {
  await ready(page);
  // A sibling animation must survive cleanup of the sculpture owner.
  await page.evaluate(() => { (window as any).__sibling = (window as any).gsap.to({}, {duration:100}); });
  for (let i = 0; i < 3; i++) {
    await page.evaluate(() => dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true })));
    await expect.poll(() => triggers(page)).toBe(0);
    await expect(page.locator('[data-writing-filters]')).toBeHidden();
    expect(await page.evaluate(() => (window as any).__sibling.isActive())).toBe(true);
    await page.evaluate(() => dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true })));
    expect(await page.evaluate(() => (window as any).__commonGround.score.time())).toBe(10);
    expect(await page.evaluate(() => (window as any).__commonGround.score.isActive())).toBe(false);
    await expect(page.locator('[data-writing-filters]')).toBeVisible();
    await page.locator('[data-filter="ai"]').click();
    await expect(page.locator('[data-filter="ai"]')).toHaveAttribute('aria-pressed', 'true');
    const visible = await page.locator('[data-note]:visible').count();
    await expect(page.locator('[data-writing-count]')).toHaveText(`${visible} notes`);
  }
  expect(await page.evaluate(() => (window as any).gsap.globalTimeline.getChildren(true,true,true).filter((a:any)=>a.repeat()===-1).length)).toBe(0);
});
