import { expect, test } from "@playwright/test";

test.describe("portfolio improvement regressions", () => {
  test("homepage discovery actions route to the matching collections", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const heroActions = page.locator('.home-hero-copy nav[aria-label="Explore the site"]');
    const writingLink = heroActions.locator('a[href="/articles/"]');
    const experimentsLink = heroActions.locator('a[href="/work/"]');

    await expect(heroActions).toHaveCount(1);
    await expect(writingLink).toHaveCount(1);
    await expect(experimentsLink).toHaveCount(1);

    await writingLink.click();
    await expect(page).toHaveURL(/\/articles\/$/);
    await expect(page.locator("#articles-title")).toBeVisible();

    await page.goto("/", { waitUntil: "networkidle" });
    await experimentsLink.click();
    await expect(page).toHaveURL(/\/work\/$/);
    await expect(page.locator("#work-title")).toBeVisible();
  });

  test("copy email reports success and writes the advertised address", async ({ page, context, baseURL, browserName }) => {
    test.skip(browserName !== "chromium", "clipboard permission support is covered in Chromium");
    await context.grantPermissions(["clipboard-read", "clipboard-write"], {
      origin: new URL(baseURL ?? "http://127.0.0.1:4321").origin
    });
    await page.goto("/contact/", { waitUntil: "networkidle" });

    const copyButton = page.locator("button[data-copy-email]");
    const email = await copyButton.getAttribute("data-copy-email");
    expect(email).toMatch(/^\S+@\S+\.\S+$/);

    await copyButton.click();
    await expect(page.locator("[data-copy-status]")).toHaveText(/copied to clipboard/i);
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(email);
  });

  test("copy email offers a useful manual-selection fallback", async ({ page }) => {
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: undefined
      });
    });
    await page.goto("/contact/", { waitUntil: "networkidle" });

    const copyButton = page.locator("button[data-copy-email]");
    const email = await copyButton.getAttribute("data-copy-email");
    await copyButton.click();

    await expect(page.locator("[data-copy-status]")).toHaveText(/email selected|select the email address/i);
    await expect.poll(() => page.evaluate(() => window.getSelection()?.toString())).toBe(email);
  });

  test.describe("article metadata and navigation", () => {
    test.use({ viewport: { width: 1024, height: 768 } });

    test("article exposes a reachable title-specific image, reading time, and outline", async ({ page, request }) => {
      await page.goto("/articles/ai-is-non-deterministic/", { waitUntil: "networkidle" });

      const imageContent = await page.locator('meta[property="og:image"]').getAttribute("content");
      expect(imageContent).toBeTruthy();
      const imageUrl = new URL(imageContent!, page.url());
      expect(imageUrl.pathname).toBe("/og/articles/ai-is-non-deterministic.png");

      const imageResponse = await request.get(imageUrl.pathname);
      expect(imageResponse.status()).toBe(200);
      expect(imageResponse.headers()["content-type"]).toMatch(/^image\/png(?:;|$)/i);
      expect(Array.from((await imageResponse.body()).subarray(0, 8))).toEqual([
        0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a
      ]);

      await expect(page.locator(".reading-meta")).toHaveText(/\d+ min read/);

      const outlineLink = page.locator(".reading-outline-desktop a").first();
      await expect(outlineLink).toBeVisible();
      const target = await outlineLink.getAttribute("href");
      expect(target).toMatch(/^#[a-z0-9-]+$/);
      await outlineLink.click();
      await expect(page).toHaveURL(new RegExp(`${target!.slice(1)}$`));
      await expect(page.locator(target!)).toBeVisible();
    });

    for (const width of [768, 900]) {
      test(`collapses the reading outline into a full-width disclosure at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/articles/ai-is-non-deterministic/", { waitUntil: "networkidle" });

        const layout = page.locator(".writing-detail-layout");
        const outline = page.locator(".reading-outline");
        const layoutWidth = await layout.evaluate((element) => element.getBoundingClientRect().width);
        const outlineWidth = await outline.evaluate((element) => element.getBoundingClientRect().width);

        expect(outlineWidth).toBeCloseTo(layoutWidth, 0);
        await expect(page.locator(".reading-outline-desktop")).toBeHidden();
        const mobileOutline = page.locator(".reading-outline-mobile");
        await expect(mobileOutline).toBeVisible();
        await expect(mobileOutline).not.toHaveAttribute("open");

        await mobileOutline.locator("summary").click();
        await expect(mobileOutline).toHaveAttribute("open", "");

        const target = await mobileOutline.locator("a").first().getAttribute("href");
        expect(target).toMatch(/^#[a-z0-9-]+$/);
        await mobileOutline.locator("a").first().click();
        await expect(page).toHaveURL(new RegExp(`${target!.slice(1)}$`));
        await expect(page.locator(target!)).toBeVisible();
      });
    }
  });
});
