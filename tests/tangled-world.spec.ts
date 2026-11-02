import { expect, test, type Page } from '@playwright/test';

test.use({ viewport: { width: 1440, height: 1000 } });
test.beforeEach(async ({ page }) => { await page.emulateMedia({ reducedMotion: 'no-preference' }); });
const ready = async (page: Page) => {
  await page.goto('/', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => Boolean((window as any).__editorialMotion));
};

test('writing and experiments are exposed without cats, knots, or drag plugins', async ({ page }) => {
  await ready(page);
  await expect(page.locator('.editorial-note')).toHaveCount(3);
  await expect(page.locator('.editorial-project')).toHaveCount(4);
  await expect(page.locator('[data-thread-cat],.world-pull,.world-knot-frame,[inert],.world-map,.world-cursor')).toHaveCount(0);
  await expect(page.locator('.editorial-project svg')).toHaveCount(0);
  await expect(page.locator('.experiment-line-study svg')).toHaveCount(1);
  await expect(page.getByText(/Senior Technical Program Manager|Based in Jakarta|Making sense of/)).toHaveCount(0);
  const scripts = await page.locator('script[src]').evaluateAll(elements => elements.map(el => el.getAttribute('src')));
  expect(scripts.join(' ')).not.toMatch(/Draggable|MorphSVG|MotionPath|ScrollToPlugin/);
  await expect(page.locator('.editorial-hero h1 a')).toHaveAttribute('href', /^\/(articles|work)\/.+\/$/);
});

test('writing and experiments remain upright vertical lists while scrolling', async ({ page }) => {
  await ready(page);
  for (const selector of ['.editorial-note', '.editorial-project']) {
    const rows = page.locator(selector);
    await rows.first().scrollIntoViewIfNeeded();
    const x = await rows.first().evaluate(el => el.getBoundingClientRect().x);
    await page.mouse.wheel(0, 250);
    await expect.poll(() => rows.first().evaluate(el => Number((window as any).gsap.getProperty(el, 'x')))).toBe(0);
    const geometry = await rows.evaluateAll(elements => elements.map(el => {
      const rect = el.getBoundingClientRect();
      return { x: rect.x, top: rect.top, bottom: rect.bottom, rotation: Number((window as any).gsap.getProperty(el, 'rotation')) };
    }));
    expect(Math.abs(geometry[0].x - x)).toBeLessThan(1);
    for (let i = 1; i < geometry.length; i++) expect(geometry[i].top).toBeGreaterThanOrEqual(geometry[i - 1].bottom - 1);
    expect(geometry.every(row => row.rotation === 0)).toBe(true);
  }
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
});

test('real article and project links navigate normally and Back restores the homepage', async ({ page }) => {
  await ready(page);
  const leadTitle = await page.locator('.editorial-hero h1').innerText();
  const leadHref = await page.locator('.hero-support a').getAttribute('href');
  await page.locator('.hero-support a').click();
  await expect(page).toHaveURL(new URL(leadHref!, page.url()).href);
  await expect(page.locator('h1')).toHaveText(leadTitle);
  await page.goBack();
  await page.locator('.editorial-project h3 a').first().click();
  await expect(page).toHaveURL(/\/work\/truth-tools\/$/);
  await page.goBack();
  await expect(page.locator('.editorial-project')).toHaveCount(4);
  await expect(page.locator('.pin-spacer')).toHaveCount(0);
});

test('keyboard navigation reads the latest entry and opts out of decorative motion', async ({ page, browserName }) => {
  await ready(page);
  await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
  await expect(page.locator('[data-world-motion]')).toHaveAttribute('aria-pressed', 'true');
  const leadHref = await page.locator('.hero-support a').getAttribute('href');
  await page.locator('.hero-support a').focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(new URL(leadHref!, page.url()).href);
  await expect(page.locator('h1')).toBeVisible();
});

test('mobile layouts expose every entry without horizontal overflow', async ({ page }) => {
  await ready(page);
  for (const width of [768, 390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await expect(page.locator('.editorial-note')).toHaveCount(3);
    await expect(page.locator('.editorial-project')).toHaveCount(4);
    await page.locator('.editorial-project').last().scrollIntoViewIfNeeded();
    await expect(page.locator('.editorial-project').last().locator('.editorial-project-arrow')).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0);
    await expect(page.locator('.pin-spacer')).toHaveCount(0);
  }
});

test('theme changes persist and archives no longer show cat illustrations', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await ready(page);
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  for (const route of ['/articles/', '/work/']) {
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('.archive-illustration,[data-thread-cat]')).toHaveCount(0);
    await expect(page.locator('h1')).toBeVisible();
  }
});

test('the complete page and navigation remain usable without JavaScript', async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('.editorial-hero h1 a')).toBeVisible();
  await expect(page.locator('.editorial-note')).toHaveCount(3);
  await expect(page.locator('.editorial-project')).toHaveCount(4);
  await expect(page.locator('[data-world-motion]')).toBeHidden();
  await page.locator('.editorial-note h3 a').first().click();
  await expect(page).toHaveURL(/\/articles\/.+\/$/);
  await context.close();
});
