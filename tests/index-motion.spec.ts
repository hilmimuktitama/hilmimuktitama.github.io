import { expect, test, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "no-preference" });
});

async function titleSnapshot(page: Page) {
  return page.locator(".view-transition-title").evaluateAll((elements) =>
    elements.map((element) => {
      const link = element.matches("a") ? element : element.querySelector("a");
      return {
        href: link?.getAttribute("href"),
        name: getComputedStyle(element).getPropertyValue("view-transition-name").trim(),
        text: element.textContent?.replace(/\s+/g, " ").trim()
      };
    })
  );
}

async function clickTitle(page: Page, titleIndex: number) {
  const title = page.locator(".view-transition-title").nth(titleIndex);
  await title.scrollIntoViewIfNeeded();
  const link = title.locator("a");
  if (await link.count()) {
    await link.first().click();
  } else {
    await title.click();
  }
}

test("index entry titles use unique names that continue into detail headings", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const indexPath of ["/", "/articles/", "/work/"]) {
    await page.goto(indexPath, { waitUntil: "networkidle" });

    const titles = await titleSnapshot(page);
    expect(titles.length, indexPath).toBeGreaterThan(0);

    const names = titles.map(({ name }) => name);
    expect(names.every((name) => name && name !== "none"), indexPath).toBeTruthy();
    expect(new Set(names).size, indexPath).toBe(names.length);

    const candidates = titles.filter(({ href }) => href?.startsWith("/articles/") || href?.startsWith("/work/"));
    const source = indexPath === "/articles/"
      ? candidates.reduce((longest, candidate) =>
          (candidate.text?.length ?? 0) > (longest.text?.length ?? 0) ? candidate : longest
        )
      : candidates[0];
    expect(source?.href, indexPath).toBeTruthy();
    const sourceIndex = titles.findIndex(({ href }) => href === source?.href);
    const sourceName = source?.name;
    const targetPath = new URL(source!.href!, "http://localhost").pathname;

    await clickTitle(page, sourceIndex);
    await expect(page).toHaveURL(new RegExp(`${targetPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`));
    const detail = page.locator("h1.view-transition-title");
    await expect(detail).toBeVisible();
    expect(await detail.evaluate((element) => getComputedStyle(element).getPropertyValue("view-transition-name").trim())).toBe(sourceName);

    if (indexPath === "/articles/") {
      await page.goBack({ waitUntil: "networkidle" });
      await expect(page).toHaveURL(/\/articles\/$/);
      await expect(page.locator(".view-transition-title").nth(sourceIndex)).toContainText(source!.text!);
    }
  }
  expect(errors).toEqual([]);
});

test("view-transition names are disabled for reduced motion, keyboard input, and theme capture", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/articles/", { waitUntil: "networkidle" });
  expect((await titleSnapshot(page)).every(({ name }) => name === "none")).toBeTruthy();

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload({ waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  await expect(page.locator("html")).toHaveAttribute("data-input", "keyboard");
  expect((await titleSnapshot(page)).every(({ name }) => name === "none")).toBeTruthy();

  await page.addInitScript(() => {
    const events: string[][] = [];
    (window as typeof window & { __themeTitleSnapshots?: string[][] }).__themeTitleSnapshots = events;
    const startViewTransition = document.startViewTransition;
    if (typeof startViewTransition !== "function") return;
    const wrappedStartViewTransition = (callbackOptions?: Parameters<typeof document.startViewTransition>[0]) => {
      events.push([...document.querySelectorAll(".view-transition-title")].map((element) =>
        getComputedStyle(element).getPropertyValue("view-transition-name").trim()
      ));
      return startViewTransition.call(document, callbackOptions);
    };
    document.startViewTransition = wrappedStartViewTransition;
  });
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("[data-theme-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const themeTransition = await page.evaluate(() => ({
    supported: typeof document.startViewTransition === "function",
    snapshots: (window as typeof window & { __themeTitleSnapshots?: string[][] }).__themeTitleSnapshots ?? []
  }));
  if (themeTransition.supported) {
    expect(themeTransition.snapshots.length).toBeGreaterThan(0);
    expect(themeTransition.snapshots.at(-1)?.every((name) => name === "none")).toBeTruthy();
  }
});

test("matched article snapshots hide the old title to prevent ghost text", async ({ page }) => {
  await page.goto("/articles/", { waitUntil: "networkidle" });
  const support = await page.evaluate(() => ({
    api: typeof document.startViewTransition === "function",
    class: CSS.supports("view-transition-class", "entry-title")
  }));
  test.skip(!support.api || !support.class, "View Transition class snapshots are unsupported in this browser");

  const title = page.locator(".view-transition-title").first();
  const actualName = await title.evaluate((element) =>
    getComputedStyle(element).getPropertyValue("view-transition-name").trim()
  );
  expect(actualName).not.toBe("none");

  const snapshotStyles = await page.evaluate(async (transitionName) => {
    const transition = document.startViewTransition(() => {});
    try {
      await transition.ready;
      const oldTitle = getComputedStyle(document.documentElement, `::view-transition-old(${transitionName})`);
      const newTitle = getComputedStyle(document.documentElement, `::view-transition-new(${transitionName})`);
      return {
        oldOpacity: oldTitle.opacity,
        newOpacity: newTitle.opacity,
        newObjectFit: newTitle.objectFit
      };
    } finally {
      transition.skipTransition();
      await transition.finished.catch(() => {});
    }
  }, actualName);
  expect(snapshotStyles.oldOpacity).toBe("0");
  expect(snapshotStyles.newOpacity).toBe("1");
  expect(snapshotStyles.newObjectFit).toBe("contain");
});

test.describe("native fallback", () => {
  test.use({ javaScriptEnabled: false });

  test("index titles remain usable and route to detail pages without JavaScript", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator(".editorial-hero h1")).toBeVisible();

    await page.goto("/articles/", { waitUntil: "networkidle" });
    const title = page.locator(".view-transition-title").first();
    await expect(title).toBeVisible();
    const link = title.locator("a");
    await expect(link).toHaveAttribute("href", /\/articles\/.+\/$/);
    await link.click();
    await expect(page).toHaveURL(/\/articles\/.+\/$/);
    await expect(page.locator("h1")).toBeVisible();
  });
});
