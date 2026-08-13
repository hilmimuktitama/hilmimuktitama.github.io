import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1024", width: 1024, height: 768 },
  { name: "973", width: 973, height: 1000 },
  { name: "901", width: 901, height: 900 },
  { name: "900", width: 900, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 }
] as const;

const routes = [
  "/",
  "/work/",
  "/articles/",
  "/resume/",
  "/contact/",
  "/work/truth-tools/",
  "/articles/ai-is-non-deterministic/"
] as const;

const screenshotViewports = viewports.filter(({ name }) => ["1440", "973", "901", "900", "390"].includes(name));
const consoleErrorAllowlist = [/favicon/i];

function meaningfulHeadings(page: Page) {
  return page.locator("h1").filter({ hasText: /\S/ });
}

async function preparePage(page: Page, theme: "light" | "dark" = "light", expected404Path?: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript((selectedTheme) => {
    if (!sessionStorage.getItem("e2e-theme-seeded")) {
      localStorage.setItem("theme", selectedTheme);
      sessionStorage.setItem("e2e-theme-seeded", "true");
    }
  }, theme);
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];
  let expectedDocument404Seen = false;
  let expectedDocument404ConsoleSeen = false;
  if (expected404Path) {
    page.on("response", (response) => {
      const responseUrl = new URL(response.url());
      if (
        response.status() === 404 &&
        response.request().resourceType() === "document" &&
        responseUrl.pathname === expected404Path
      ) {
        expectedDocument404Seen = true;
      }
    });
  }
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    const isExpectedDocument404Console =
      expected404Path &&
      expectedDocument404Seen &&
      !expectedDocument404ConsoleSeen &&
      message.type() === "error" &&
      message.text() === "Failed to load resource: the server responded with a status of 404 (Not Found)";
    if (isExpectedDocument404Console) {
      expectedDocument404ConsoleSeen = true;
      return;
    }
    if (
      message.type() === "error" &&
      !consoleErrorAllowlist.some((pattern) => pattern.test(message.text()))
    ) {
      consoleErrors.push(message.text());
    }
  });
  return { pageErrors, consoleErrors };
}

async function assertPageQuality(page: Page, errors: { pageErrors: string[]; consoleErrors: string[] }) {
  await expect(page).toHaveTitle(/\S/);
  await expect(page.locator('nav[aria-label="Primary navigation"]')).toBeVisible();
  await expect(meaningfulHeadings(page)).toHaveCount(1);
  await expect(page.locator("main")).toBeVisible();
  await assertReducedMotion(page);
  expect(errors.pageErrors, "page errors").toEqual([]);
  expect(errors.consoleErrors, "unexpected console errors").toEqual([]);
  await assertNoOverflow(page);

  const toggle = page.locator("[data-theme-toggle]");
  const initialPressed = await toggle.getAttribute("aria-pressed");
  const initialLabel = await toggle.getAttribute("aria-label");
  await toggle.click();
  await expect(toggle).not.toHaveAttribute("aria-pressed", initialPressed ?? "");
  await expect(toggle).not.toHaveAttribute("aria-label", initialLabel ?? "");
  await expect(page.locator("main")).toBeVisible();
}

async function assertNoOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => window.innerWidth + 2)
  );
}

async function assertReducedMotion(page: Page) {
  const motion = await page.evaluate(() => ({
    matches: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior
  }));
  expect(motion.matches).toBeTruthy();
  expect(motion.scrollBehavior).toBe("auto");
  await expect(page.locator("main")).toBeVisible();
}

async function assertStaticPageQuality(page: Page, errors: { pageErrors: string[]; consoleErrors: string[] }) {
  await expect(page.locator('nav[aria-label="Primary navigation"]')).toBeVisible();
  await expect(meaningfulHeadings(page)).toHaveCount(1);
  await expect(page.locator("main")).toBeVisible();
  await assertReducedMotion(page);
  await assertNoOverflow(page);
  expect(errors.pageErrors, "page errors").toEqual([]);
  expect(errors.consoleErrors, "unexpected console errors").toEqual([]);
}

async function applyScreenshotTypography(page: Page) {
  await page.addStyleTag({
    content: `
      @font-face {
        font-family: "E2E Hanken Grotesk";
        src: url("/fonts/HankenGrotesk-VariableFont_wght.woff2") format("woff2");
        font-style: normal;
        font-weight: 100 900;
        font-display: block;
      }
      h1, h2, h3 {
        font-family: "E2E Hanken Grotesk", sans-serif;
      }
    `
  });
  await page.evaluate(() => document.fonts.ready);
}

for (const viewport of viewports) {
  test.describe(`site quality at ${viewport.name}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of routes) {
      test(`${route} navigates cleanly`, async ({ page }) => {
        const errors = await preparePage(page);
        const response = await page.goto(route, { waitUntil: "networkidle" });
        expect(response?.ok(), route).toBeTruthy();
        await assertPageQuality(page, errors);
      });
    }
  });
}

test("internal keyboard navigation works without hover", async ({ page, browserName }) => {
  test.setTimeout(30_000);
  await preparePage(page);
  await page.goto("/", { waitUntil: "networkidle" });
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  const focused = page.locator(":focus");
  await expect(focused).toHaveAttribute("href", "#main-content");
  await expect(focused).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator("main#main-content")).toBeFocused();
});

test("primary navigation is keyboard activatable", async ({ page }) => {
  const errors = await preparePage(page);
  await page.goto("/", { waitUntil: "networkidle" });
  const workLink = page.locator('nav[aria-label="Primary navigation"] a[href="/work/"]');
  await workLink.focus();
  await expect(workLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/work\/$/);
  await expect(page.locator('nav[aria-label="Primary navigation"] a[aria-current="page"]')).toHaveAttribute("href", "/work/");
  expect(errors.pageErrors, "page errors").toEqual([]);
  expect(errors.consoleErrors, "unexpected console errors").toEqual([]);
});

test("theme toggle persists a deterministic dark preference", async ({ page }) => {
  const errors = await preparePage(page, "light");
  await page.goto("/", { waitUntil: "networkidle" });
  const toggle = page.locator("[data-theme-toggle]");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await expect(toggle).toHaveAttribute("aria-label", "Switch to dark mode");
  await toggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(toggle).toHaveAttribute("aria-label", "Switch to light mode");
  await expect.poll(() => page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  await expect(toggle).toHaveAttribute("aria-label", "Switch to light mode");
  expect(errors.pageErrors, "page errors after theme interaction and reload").toEqual([]);
  expect(errors.consoleErrors, "console errors after theme interaction and reload").toEqual([]);
});

test("every sitemap location is reachable", async ({ page, request, baseURL }) => {
  const errors = await preparePage(page);
  const response = await request.get(`${baseURL}/sitemap.xml`);
  expect(response.ok()).toBeTruthy();
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([_, location]) => new URL(location).pathname);
  expect(locations.length).toBeGreaterThan(0);
  for (const pathname of locations) {
    errors.pageErrors.length = 0;
    errors.consoleErrors.length = 0;
    const result = await page.goto(pathname, { waitUntil: "networkidle" });
    expect(result?.ok(), pathname).toBeTruthy();
    if (result?.headers()["content-type"]?.includes("text/html")) {
      await assertStaticPageQuality(page, errors);
    }
  }
});

test("unknown production route renders a useful 404", async ({ page }) => {
  const unknownPath = "/missing-portfolio-page/";
  const errors = await preparePage(page, "light", unknownPath);
  const allowedDocumentResponses: string[] = [];
  const failedResponses: string[] = [];
  const requestFailures: string[] = [];
  page.on("response", (resourceResponse) => {
    if (resourceResponse.status() < 400) return;
    const responseUrl = new URL(resourceResponse.url());
    const isExpectedDocument =
      resourceResponse.status() === 404 &&
      resourceResponse.request().resourceType() === "document" &&
      responseUrl.pathname === unknownPath;
    if (isExpectedDocument) {
      allowedDocumentResponses.push(resourceResponse.url());
    } else {
      failedResponses.push(`${resourceResponse.status()} ${resourceResponse.url()}`);
    }
  });
  page.on("requestfailed", (request) => {
    requestFailures.push(`${request.failure()?.errorText ?? "request failed"} ${request.url()}`);
  });
  const response = await page.goto(unknownPath, { waitUntil: "networkidle" });
  expect(response?.status()).toBe(404);
  expect(allowedDocumentResponses).toHaveLength(1);
  expect(failedResponses, "unexpected failed responses").toEqual([]);
  expect(requestFailures, "unexpected request failures").toEqual([]);
  await expect(meaningfulHeadings(page)).toHaveCount(1);
  await expect(page.locator('nav[aria-label="Primary navigation"]')).toBeVisible();
  await expect(page.locator('nav[aria-label="Helpful links"] a')).toHaveCount(4);
  await expect(page.locator("main")).toBeVisible();
  await assertReducedMotion(page);
  await assertNoOverflow(page);
  expect(errors.pageErrors, "page errors").toEqual([]);
  expect(errors.consoleErrors, "unexpected console errors").toEqual([]);
});

for (const route of ["/work/", "/articles/"] as const) {
  test.describe(`${route} desktop geometry`, () => {
    for (const viewport of viewports.filter(({ width }) => width > 900)) {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });
      test(`${viewport.name}px list geometry is intentional`, async ({ page }) => {
        await preparePage(page);
        await page.goto(route, { waitUntil: "networkidle" });
        const geometry = await page.locator(route === "/work/" ? ".work-index-list" : ".article-index-list").evaluate((list, currentRoute) => {
          const section = list.closest("section")!;
          const intro = section.querySelector<HTMLElement>(".page-intro-body")!;
          const description = list.querySelector<HTMLElement>(currentRoute === "/work/" ? ".project-desc" : ".article-index-item > div > p")!;
          const listBox = list.getBoundingClientRect();
          const introBox = intro.getBoundingClientRect();
          return { listLeft: listBox.left, introLeft: introBox.left, listWidth: listBox.width, sectionWidth: section.getBoundingClientRect().width, descriptionWidth: description.getBoundingClientRect().width };
        }, route);
        expect(Math.abs(geometry.listLeft - geometry.introLeft)).toBeLessThanOrEqual(2);
        expect(geometry.listWidth).toBeGreaterThanOrEqual(geometry.sectionWidth * 0.7);
        expect(geometry.descriptionWidth).toBeGreaterThan(200);
      });
    }
  });
}

for (const route of ["/work/", "/articles/"] as const) {
  for (const viewport of screenshotViewports) {
    test.describe(`${route} light ${viewport.name}px screenshots`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });
      test(`${route} light screenshot`, async ({ page }) => {
        await preparePage(page, "light");
        await page.goto(route, { waitUntil: "networkidle" });
        await applyScreenshotTypography(page);
        await expect(page).toHaveScreenshot(`${route.slice(1, -1)}-light-${viewport.name}.png`, {
          fullPage: false,
          animations: "disabled",
          caret: "hide",
          maxDiffPixelRatio: 0.04
        });
      });
    });
  }
}

for (const route of ["/work/", "/articles/"] as const) {
  for (const viewport of [viewports[0], viewports[6]] as const) {
    test.describe(`${route} dark ${viewport.name}px screenshots`, () => {
      test.use({ viewport: { width: viewport.width, height: viewport.height } });
      test(`${route} dark screenshot`, async ({ page }) => {
        await preparePage(page, "dark");
        await page.goto(route, { waitUntil: "networkidle" });
        await applyScreenshotTypography(page);
        await expect(page).toHaveScreenshot(`${route.slice(1, -1)}-dark-${viewport.name}.png`, {
          fullPage: false,
          animations: "disabled",
          caret: "hide",
          maxDiffPixelRatio: 0.04
        });
      });
    });
  }
}
