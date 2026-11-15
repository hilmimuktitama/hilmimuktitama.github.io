import { expect, test } from '@playwright/test';

function contrast(foreground: string, background: string) {
  const luminance = (color: string) => {
    const channels = color.match(/[\d.]+/g)!.slice(0, 3).map(Number).map(v => {
      const s = v / 255;
      return s <= .04045 ? s / 12.92 : ((s + .055) / 1.055) ** 2.4;
    });
    return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
  };
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + .05) / (values[1] + .05);
}

test('Common Ground reaches every published page in both reading themes', async ({ page, request }) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const sitemap = await (await request.get('/sitemap.xml')).text();
  const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => new URL(match[1]).pathname);
  routes.push('/404.html');
  expect(routes.length).toBeGreaterThan(20);
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('body')).toHaveClass(/common-ground/);
      await expect(page.locator('.ground-nav')).toHaveCount(1);
      await expect(page.locator('.ground-footer')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('[data-ground-controls], .site-header, .site-footer, [data-line-study]')).toHaveCount(0);
      for (const theme of ['light', 'dark']) {
        await page.evaluate(theme => { document.documentElement.dataset.theme = theme; }, theme);
        const styles = await page.evaluate(() => {
          const title = document.querySelector('h1')!;
          const prose = document.querySelector('.prose');
          const selection = getComputedStyle(title, '::selection');
          return {
            bodyFont: getComputedStyle(document.body).fontFamily,
            titleFont: getComputedStyle(title).fontFamily,
            proseFont: prose ? getComputedStyle(prose).fontFamily : null,
            selectionText: selection.color,
            selectionBackground: selection.backgroundColor,
            overflow: document.documentElement.scrollWidth - innerWidth
          };
        });
        const context = `${route} ${width}px ${theme}`;
        expect(styles.bodyFont, context).toMatch(/^Hanken/);
        expect(styles.titleFont, context).toMatch(/^Hanken/);
        if (styles.proseFont) expect(styles.proseFont, context).toMatch(/^Newsreader/);
        expect(styles.overflow, context).toBeLessThanOrEqual(0);
        expect(contrast(styles.selectionText, styles.selectionBackground), context).toBeGreaterThanOrEqual(4.5);
      }
    }
  }
});

test('fixed palette links remain legible on hover in either theme', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const theme of ['light', 'dark']) {
    await page.evaluate(theme => { document.documentElement.dataset.theme = theme; }, theme);
    for (const selector of ['.ground-nav nav a', '.notebook-card h3 a', '.ground-footer nav a']) {
      const link = page.locator(selector).first();
      await link.hover();
      const colors = await link.evaluate(el => ({
        foreground: getComputedStyle(el).color,
        background: getComputedStyle(el.closest('header, section, footer')!).backgroundColor
      }));
      expect(contrast(colors.foreground, colors.background), `${theme} ${selector}`).toBeGreaterThanOrEqual(4.5);
    }
  }
});

test('article diagrams and printed resume retain the shared identity', async ({ page }) => {
  await page.goto('/articles/keep-up-with-what-ai-makes-possible/');
  await expect(page.locator('.ai-news-request .ground-arrow')).toHaveCount(1);
  await expect(page.locator('.ai-news-request')).not.toContainText('→');
  await page.goto('/resume/');
  await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.ground-nav')).toBeHidden();
  await expect(page.locator('.ground-footer')).toBeHidden();
  await expect(page.locator('.resume-page')).toBeVisible();
  expect(await page.locator('.resume-page').evaluate(el => getComputedStyle(el).color)).toBe('rgb(0, 0, 0)');
  expect(await page.locator('.resume-page').evaluate(el => getComputedStyle(el).getPropertyValue('--accent').trim())).toBe('#111');
});
