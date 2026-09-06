import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 768, height: 900 } });

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.addInitScript(() => {
    if (!sessionStorage.getItem("motion-theme-seeded")) {
      localStorage.setItem("theme", "light");
      sessionStorage.setItem("motion-theme-seeded", "true");
    }
  });
});

test("rapid theme changes settle on the latest choice and keep the matching icon", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/articles/");
  const toggle = page.locator("[data-theme-toggle]");
  await toggle.click();
  await toggle.click();
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-label", "Switch to light mode");
  await expect(page.locator("html")).not.toHaveAttribute("data-transition");
  await expect(page.locator(".theme-icon-dark")).toHaveCSS("opacity", "1");
  await expect(page.locator(".theme-icon-light")).toHaveCSS("opacity", "0");

  await toggle.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(() => document.getAnimations().filter((animation) => animation.playState === "running").length)).toBe(0);
  expect(errors).toEqual([]);
});

test("theme switching works without the View Transition API", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(document, "startViewTransition", { configurable: true, value: undefined });
  });
  await page.goto("/articles/");
  await page.locator("[data-theme-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator(".theme-icon-dark")).toHaveCSS("opacity", "1");
  await expect(page.locator("html")).not.toHaveAttribute("data-transition");
});

test("rapid outline toggles and keyboard activation settle on the latest state", async ({ page }) => {
  await page.goto("/articles/ai-is-non-deterministic/");
  const details = page.locator(".reading-outline-mobile");
  const summary = details.locator("summary");
  const panel = details.locator(".reading-outline-panel");
  await summary.click();
  await summary.click();
  await summary.press("Enter");
  await expect(details).toHaveAttribute("open", "");
  await expect(details).not.toHaveAttribute("data-reading-outline-state");
  expect(await panel.evaluate((element) => element.getAnimations().length)).toBe(0);
  expect(await panel.evaluate((element) => (element as HTMLElement).style.height)).toBe("");
  await expect(details.locator("a").first()).toBeVisible();

  await summary.press("Enter");
  await expect(details).not.toHaveAttribute("open");
});

test("outline settles safely when motion preference or viewport changes", async ({ page }) => {
  await page.goto("/articles/ai-is-non-deterministic/");
  const details = page.locator(".reading-outline-mobile");
  const panel = details.locator(".reading-outline-panel");
  await details.locator("summary").click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(details).toHaveAttribute("open", "");
  await expect(details).not.toHaveAttribute("data-reading-outline-state");
  expect(await panel.evaluate((element) => element.getAnimations().length)).toBe(0);

  await details.locator("summary").click();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await details.locator("summary").click();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(page.locator(".reading-outline-desktop")).toBeVisible();
  await page.setViewportSize({ width: 768, height: 900 });
  await expect(details.locator("a").first()).toBeVisible();
  expect(await panel.evaluate((element) => (element as HTMLElement).style.height)).toBe("");
});

test("native navigation keeps history and theme controls usable", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/articles/");
  await page.locator('.site-nav a[href$="/work/"]').click();
  await expect(page).toHaveURL(/\/work\/$/);
  await expect(page.locator("h1")).toHaveText("Experiments");
  await page.goBack();
  await expect(page).toHaveURL(/\/articles\/$/);
  await page.locator("[data-theme-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("html")).not.toHaveAttribute("data-transition");
  await page.locator('.site-nav a[href$="/contact/"]').focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/contact\/$/);
  await expect(page.locator("h1")).toHaveText("Get in touch.");
  expect(errors).toEqual([]);
});

test("copy success feedback does not resize or lock the control", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: async () => {} }
    });
  });
  await page.goto("/contact/");
  const button = page.locator("[data-copy-email]");
  const width = await button.evaluate((element) => element.getBoundingClientRect().width);
  await button.click();
  await expect(button).toHaveText("Copied");
  await expect(button).toBeEnabled();
  expect(await button.evaluate((element) => element.getBoundingClientRect().width)).toBeCloseTo(width, 1);
  await button.press("Enter");
  await expect(button).toHaveText("Copied");
  await expect(button).not.toHaveAttribute("data-copy-motion");
  await expect(button).toHaveText("Copy email", { timeout: 3500 });
  await expect(page.locator('[role="status"]')).toHaveText("Email copied to clipboard.");
});

test.describe("native fallback", () => {
  test.use({ javaScriptEnabled: false });
  test("reading outline remains usable without JavaScript", async ({ page }) => {
    await page.goto("/articles/ai-is-non-deterministic/");
    const details = page.locator(".reading-outline-mobile");
    await details.locator("summary").click();
    await expect(details).toHaveAttribute("open", "");
    await expect(details.locator("a").first()).toBeVisible();
  });
});
