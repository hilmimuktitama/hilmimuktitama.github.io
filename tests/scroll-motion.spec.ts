import { expect, test, type Locator, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "no-preference" });
});

async function installScrollProbe(page: Page, disableObserver = false) {
  await page.addInitScript(({ disable }) => {
    const events: Array<{ kind: string; animationName?: string; markerIndex?: number }> = [];
    (window as typeof window & { __scrollMotionEvents?: typeof events }).__scrollMotionEvents = events;
    const markerIndex = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return -1;
      const marker = target.closest("[data-scroll-reveal]");
      return marker ? Array.from(document.querySelectorAll("[data-scroll-reveal]")).indexOf(marker) : -1;
    };

    document.addEventListener("animationstart", (event) => {
      if (event.animationName === "scroll-reveal-in") {
        events.push({ kind: "animationstart", animationName: event.animationName, markerIndex: markerIndex(event.target) });
      }
    }, true);
    document.addEventListener("animationend", (event) => {
      if (event.animationName === "scroll-reveal-in") {
        events.push({ kind: "animationend", animationName: event.animationName, markerIndex: markerIndex(event.target) });
      }
    }, true);
    document.addEventListener("animationcancel", (event) => {
      if (event.animationName === "scroll-reveal-in") {
        events.push({ kind: "animationcancel", animationName: event.animationName, markerIndex: markerIndex(event.target) });
      }
    }, true);

    const observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.target instanceof HTMLElement && record.target.matches("[data-scroll-reveal]")) {
          events.push({
            kind: `state:${record.target.getAttribute("data-scroll-state") ?? "none"}`,
            markerIndex: Array.from(document.querySelectorAll("[data-scroll-reveal]")).indexOf(record.target)
          });
        }
      }
    });
    observer.observe(document, { attributes: true, subtree: true, attributeFilter: ["data-scroll-state"] });

    if (disable) {
      try {
        Object.defineProperty(window, "IntersectionObserver", { configurable: true, value: undefined });
      } catch {
        window.IntersectionObserver = undefined as unknown as typeof window.IntersectionObserver;
      }
    }
  }, { disable: disableObserver });
}

async function markerStates(page: Page) {
  return page.locator("[data-scroll-reveal]").evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("data-scroll-state"))
  );
}

async function allMarkersShown(page: Page) {
  const states = await markerStates(page);
  return states.length > 0 && states.every((state) => state === "shown");
}

async function motionEventCount(page: Page, kind: string, markerIndex?: number) {
  return page.evaluate(({ eventKind, index }) =>
    ((window as typeof window & { __scrollMotionEvents?: Array<{ kind: string; markerIndex?: number }> }).__scrollMotionEvents ?? [])
      .filter((event) => event.kind === eventKind && (index === undefined || event.markerIndex === index)).length
  , { eventKind: kind, index: markerIndex });
}

async function markerIndex(marker: Locator) {
  return marker.evaluate((element) => Array.from(document.querySelectorAll("[data-scroll-reveal]")).indexOf(element));
}

async function wheelUntilVisible(page: Page, marker: Locator) {
  const step = await page.evaluate(() => Math.max(320, Math.round(window.innerHeight * 0.7)));
  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (await marker.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    })) return;
    await page.mouse.wheel(0, step);
  }
  throw new Error("Scroll reveal target did not enter the viewport");
}

async function assertReadableMarkers(page: Page) {
  const markers = page.locator("[data-scroll-reveal]");
  expect(await markers.count()).toBeGreaterThan(0);
  expect(await markers.evaluateAll((elements) => elements.every((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.opacity !== "0" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
  }))).toBeTruthy();
}

test("Home reveals a below-fold section on wheel scroll, once, without overflow", async ({ page }) => {
  await installScrollProbe(page);
  await page.goto("/", { waitUntil: "networkidle" });

  const markers = page.locator("[data-scroll-reveal]");
  expect(await markers.count()).toBeGreaterThanOrEqual(4);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
    await page.evaluate(() => window.innerWidth + 2)
  );

  const target = page.locator(".home-background[data-scroll-reveal]");
  const targetIndex = await markerIndex(target);
  await wheelUntilVisible(page, target);
  await expect.poll(() => target.getAttribute("data-scroll-state"), { timeout: 3_000 }).toBe("shown");
  await expect.poll(() => motionEventCount(page, "animationstart", targetIndex), { timeout: 3_000 }).toBeGreaterThan(0);
  expect(await target.evaluate((element) => getComputedStyle(element).transform)).toBe("none");

  const startsBeforeReturn = await motionEventCount(page, "animationstart", targetIndex);
  await page.mouse.wheel(0, -12_000);
  await page.mouse.wheel(0, 12_000);
  await expect.poll(() => target.getAttribute("data-scroll-state"), { timeout: 3_000 }).toBe("shown");
  await expect.poll(() => motionEventCount(page, "animationstart", targetIndex), { timeout: 3_000 }).toBe(startsBeforeReturn);
});

test("Writing and Experiments reveal index content once while scrolling back", async ({ page }) => {
  await installScrollProbe(page);
  for (const route of ["/articles/", "/work/"]) {
    await page.goto(route, { waitUntil: "networkidle" });
    const markers = page.locator("[data-scroll-reveal]");
    expect(await markers.count(), route).toBeGreaterThan(1);

    const target = route === "/articles/"
      ? page.locator(".writing-index-list > li[data-scroll-reveal]").nth(2)
      : page.locator(".work-entry[data-scroll-reveal]").nth(2);
    await expect(target).toHaveAttribute("data-scroll-state", "pending");
    const targetIndex = await markerIndex(target);
    await wheelUntilVisible(page, target);
    await expect.poll(() => target.getAttribute("data-scroll-state"), { timeout: 3_000 }).toBe("shown");
    const starts = await motionEventCount(page, "animationstart", targetIndex);
    expect(starts).toBeGreaterThan(0);

    await page.mouse.wheel(0, -12_000);
    await page.mouse.wheel(0, 12_000);
    await expect.poll(() => target.getAttribute("data-scroll-state"), { timeout: 3_000 }).toBe("shown");
    await expect.poll(() => motionEventCount(page, "animationstart", targetIndex), { timeout: 3_000 }).toBe(starts);
    expect(await target.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
  }
});

test("Keyboard, reduced motion, and focus settle scroll reveals immediately", async ({ page }) => {
  await installScrollProbe(page);
  await page.goto("/articles/", { waitUntil: "networkidle" });
  const markers = page.locator("[data-scroll-reveal]");
  expect(await markers.count()).toBeGreaterThan(1);

  await page.keyboard.press("Tab");
  await expect.poll(() => allMarkersShown(page), { timeout: 3_000 }).toBeTruthy();
  await expect(page.locator("html")).toHaveAttribute("data-input", "keyboard");
  expect(await page.evaluate(() => document.getAnimations().some((animation) => animation.playState === "running"))).toBeFalsy();

  await page.reload({ waitUntil: "networkidle" });
  const target = page.locator(".writing-index-list > li[data-scroll-reveal]").nth(1);
  const targetIndex = await markerIndex(target);
  await wheelUntilVisible(page, target);
  await expect.poll(() => motionEventCount(page, "animationstart", targetIndex), { timeout: 3_000 }).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect.poll(() => allMarkersShown(page), { timeout: 3_000 }).toBeTruthy();

  // Reset only the next scenario's setup; Firefox caps a single wheel delta.
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await expect.poll(() => page.evaluate(() => window.scrollY), { timeout: 3_000 }).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload({ waitUntil: "networkidle" });
  const focusMarker = page.locator(".writing-index-list > li[data-scroll-reveal]").nth(1);
  await expect(focusMarker).toHaveAttribute("data-scroll-state", "pending");
  const focusTarget = focusMarker.locator("a").first();
  await focusTarget.focus();
  await expect.poll(() => focusTarget.evaluate((element) =>
    element.closest("[data-scroll-reveal]")?.getAttribute("data-scroll-state")
  )).toBe("shown");
});

test("Index navigation works after reveal, history returns cleanly, and detail pages have no markers", async ({ page }) => {
  await installScrollProbe(page);
  await page.goto("/articles/", { waitUntil: "networkidle" });
  const marker = page.locator(".writing-index-list > li[data-scroll-reveal]").nth(1);
  await wheelUntilVisible(page, marker);
  await expect.poll(() => marker.getAttribute("data-scroll-state"), { timeout: 3_000 }).toBe("shown");

  const titleLink = marker.locator("h2 a").first();
  await expect(titleLink).toBeVisible();
  const title = await titleLink.innerText();
  await titleLink.click();
  await expect(page).toHaveURL(/\/articles\/.+\/$/);
  await expect(page.locator("h1")).toHaveText(title);
  expect(await page.locator("[data-scroll-reveal]").count()).toBe(0);

  await page.goBack({ waitUntil: "networkidle" });
  await expect(page).toHaveURL(/\/articles\/$/);
  await expect(page.locator("h2 a").filter({ hasText: title }).first()).toBeVisible();
  await expect(page.locator("[data-scroll-reveal]").first()).toHaveAttribute("data-scroll-state", "shown");

  await page.goto("/articles/ai-is-non-deterministic/", { waitUntil: "networkidle" });
  expect(await page.locator("[data-scroll-reveal]").count()).toBe(0);
  await page.goto("/work/truth-tools/", { waitUntil: "networkidle" });
  expect(await page.locator("[data-scroll-reveal]").count()).toBe(0);
});

test("Index content stays readable when IntersectionObserver is unavailable", async ({ page }) => {
  await installScrollProbe(page, true);
  await page.goto("/work/", { waitUntil: "networkidle" });
  await assertReadableMarkers(page);
  expect(await markerStates(page)).not.toContain("entering");
  expect(await markerStates(page)).not.toContain("pending");
  await expect(page.locator("h1")).toHaveCount(1);
});

test("Fresh reload resets pending entries while height-only resize preserves them", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await installScrollProbe(page);
  await page.goto("/articles/", { waitUntil: "networkidle" });

  const target = page.locator(".writing-index-list > li[data-scroll-reveal]").nth(1);
  await expect(target).toHaveAttribute("data-scroll-state", "pending");

  await page.setViewportSize({ width: 1280, height: 680 });
  await expect(target).toHaveAttribute("data-scroll-state", "pending");

  await page.setViewportSize({ width: 1100, height: 680 });
  await expect.poll(() => allMarkersShown(page), { timeout: 3_000 }).toBeTruthy();

  await page.reload({ waitUntil: "networkidle" });
  await expect(page.locator(".writing-index-list > li[data-scroll-reveal]").nth(1))
    .toHaveAttribute("data-scroll-state", "pending");
});

test.describe("native fallback", () => {
  test.use({ javaScriptEnabled: false });

  test("Home and index content remains visible and linkable without JavaScript", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await expect(page.locator(".home-hero h1")).toBeVisible();
    await assertReadableMarkers(page);

    await page.goto("/articles/", { waitUntil: "networkidle" });
    await assertReadableMarkers(page);
    const titleLink = page.locator("[data-scroll-reveal] h2 a").first();
    await expect(titleLink).toBeVisible();
    await titleLink.click();
    await expect(page).toHaveURL(/\/articles\/.+\/$/);
    await expect(page.locator("h1")).toBeVisible();
  });
});
