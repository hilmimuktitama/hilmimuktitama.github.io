// Production regression coverage for the Common Ground replacement of Tangled World.
import { expect, test } from '@playwright/test';

const noteLabel = (count: number) => `${count} ${count === 1 ? 'note' : 'notes'}`;

test('approved identity, collection content and production-only chrome', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Good work happens between.');
  await expect(page.locator('[data-note]')).toHaveCount(12);
  await expect(page.locator('details.work-entry')).toHaveCount(4);
  await expect(page.locator('.sculpture')).toHaveCount(3);
  await expect(page.locator('[data-ground-controls], [data-film], [data-assemble], [data-ground-scrub]')).toHaveCount(0);
  await expect(page.getByText(/Study 03.2|The first sketch/)).toHaveCount(0);
  await expect(page.getByRole('link', {name:'A little more about me'}).locator('svg')).toHaveCount(0);
  await expect(page.locator('.hello-link')).toHaveText("Let's talk");
  expect(await page.locator('.note-meta').evaluateAll(els=>els.every(el=>el.firstElementChild?.tagName==='TIME'))).toBe(true);
});

test('shared score retains staggered text, rigid landings and height-sensitive shadows', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const seek=async(time:number)=>page.evaluate(time=>{(window as any).__commonGround.score.pause().time(time);},time);
  await seek(.4);
  const opening=await page.locator('[data-title-reveal]').evaluateAll(els=>els.map(el=>getComputedStyle(el).opacity));
  expect(Number(opening[0])).toBeGreaterThan(Number(opening[2]));
  await seek(8);await seek(.4);
  expect(await page.locator('[data-title-reveal]').evaluateAll(els=>els.map(el=>getComputedStyle(el).opacity))).toEqual(opening);
  await seek(4.9);
  expect(await page.locator('.sculpture').evaluateAll(els=>els.every(el=>{const m=new DOMMatrixReadOnly(getComputedStyle(el).transform);return Math.abs(m.b)<.001&&Math.abs(m.c)<.001&&m.f<0;}))).toBe(true);
  expect(await page.locator('.contact-shadow').evaluateAll(els=>els.every(el=>Number(getComputedStyle(el).opacity)<.3))).toBe(true);
  await seek(9.9);
  expect(await page.locator('.sculpture').evaluateAll(els=>els.every(el=>Math.abs(new DOMMatrixReadOnly(getComputedStyle(el).transform).f)<.001))).toBe(true);
  for(const topic of ['ai','teams','all']){
    await page.locator(`[data-filter="${topic}"]`).click();
    const count=await page.locator('[data-note]:visible').count();
    expect(count).toBeGreaterThan(0);
    await expect(page.locator('[data-writing-count]')).toHaveText(noteLabel(count));
  }
});

test('mobile layouts expose every entry without horizontal overflow', async ({ page }) => {
  await page.emulateMedia({reducedMotion:'reduce'});
  for(const width of [320,390,768,1440]) {
    await page.setViewportSize({width,height:1000});await page.goto('/');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBe(0);
    await expect(page.locator('[data-note]')).toHaveCount(12);
    await expect(page.locator('details.work-entry')).toHaveCount(4);
    expect(await page.locator('img').evaluateAll((els:HTMLImageElement[])=>els.filter(e=>!e.loading||e.loading!=='lazy').every(e=>e.complete&&e.naturalWidth>0))).toBe(true);
  }
});

test('real entry links and Back restore working homepage filters', async ({ page }) => {
  await page.goto('/');
  await page.locator('.notebook-card h3 a').first().click();
  await expect(page).toHaveURL(/\/articles\/.+\/$/);
  await page.goBack();
  await page.locator('.work-detail a').first().click();
  await expect(page).toHaveURL(/\/work\/truth-tools\/$/);
  await page.goBack();
  await expect(page.locator('[data-writing-filters]')).toBeVisible();
  await expect(page.locator('[data-ground-controls]')).toHaveCount(0);
});

test('no JavaScript retains content, links, sculpture and native accordions', async ({browser,baseURL})=>{
  const context=await browser.newContext({javaScriptEnabled:false,baseURL,viewport:{width:390,height:844}});
  const page=await context.newPage();await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('[data-note]:visible')).toHaveCount(12);
  await expect(page.locator('[data-ground-controls]')).toHaveCount(0);
  await expect(page.locator('[data-writing-filters]')).toBeHidden();
  const detail=page.locator('details.work-entry').nth(1);await detail.locator('summary').click();await expect(detail).toHaveAttribute('open','');
  await page.locator('.notebook-card h3 a').first().click();await expect(page.locator('.prose')).toBeVisible();
  await context.close();
});

test('writing filter click records the topic in the URL and updates aria-pressed', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-writing-count]')).toHaveText('12 notes');
  await page.locator('[data-filter="ai"]').click();
  await expect(page).toHaveURL(/\?topic=ai$/);
  await expect(page.locator('[data-filter="ai"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-filter="all"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('[data-filter="teams"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('[data-note]:visible')).toHaveCount(11);
  await expect(page.locator('[data-writing-count]')).toHaveText('11 notes');
  await expect(page.locator('[data-writing-empty]')).toBeHidden();
});

test('writing filter applies a valid topic from the URL on load', async ({ page }) => {
  await page.goto('/?topic=teams');
  await expect(page.locator('[data-filter="teams"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-filter="all"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('[data-note]:visible')).toHaveCount(8);
  await expect(page.locator('[data-writing-count]')).toHaveText('8 notes');
});

test('writing filter selection survives article navigation and Back', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-filter="ai"]').click();
  await expect(page).toHaveURL(/\?topic=ai$/);
  const visible = await page.locator('[data-note]:visible').count();
  expect(visible).toBeGreaterThan(0);
  await expect(page.locator('[data-writing-count]')).toHaveText(noteLabel(visible));

  await page.locator('.notebook-card:visible h3 a').first().click();
  await expect(page).toHaveURL(/\/articles\/.+\/$/);
  await page.goBack();

  await expect(page).toHaveURL(/\?topic=ai$/);
  await expect(page.locator('[data-filter="ai"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-filter="all"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('[data-note]:visible')).toHaveCount(visible);
  await expect(page.locator('[data-writing-count]')).toHaveText(noteLabel(visible));
});

test('Everything clears the topic param and keeps other URL parts', async ({ page }) => {
  await page.goto('/?topic=ai&ref=newsletter#writing');
  await expect(page.locator('[data-filter="ai"]')).toHaveAttribute('aria-pressed', 'true');
  await page.locator('[data-filter="all"]').click();
  const url = new URL(page.url());
  expect(url.searchParams.get('topic')).toBeNull();
  expect(url.searchParams.get('ref')).toBe('newsletter');
  expect(url.hash).toBe('#writing');
  await expect(page.locator('[data-note]:visible')).toHaveCount(12);
  await expect(page.locator('[data-writing-count]')).toHaveText('12 notes');
});

test('unknown topic falls back to Everything', async ({ page }) => {
  await page.goto('/?topic=xyz');
  await expect(page.locator('[data-filter="all"]')).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-filter="ai"]')).toHaveAttribute('aria-pressed', 'false');
  await expect(page.locator('[data-note]:visible')).toHaveCount(12);
  await expect(page.locator('[data-writing-count]')).toHaveText('12 notes');
  await expect(page.locator('[data-writing-empty]')).toBeHidden();
});

test('writing count pluralizes and empty state appears with no matches', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    [...document.querySelectorAll('[data-note]')].forEach((note, index) => {
      (note as HTMLElement).dataset.topic = index === 0 ? 'ai' : '';
    });
  });
  await page.locator('[data-filter="ai"]').click();
  await expect(page.locator('[data-note]:visible')).toHaveCount(1);
  await expect(page.locator('[data-writing-count]')).toHaveText('1 note');
  await expect(page.locator('[data-writing-empty]')).toBeHidden();

  await page.evaluate(() => {
    document.querySelectorAll('[data-note]').forEach(note => { (note as HTMLElement).dataset.topic = ''; });
  });
  await page.locator('[data-filter="teams"]').click();
  await expect(page.locator('[data-note]:visible')).toHaveCount(0);
  await expect(page.locator('[data-writing-count]')).toHaveText('0 notes');
  await expect(page.locator('[data-writing-empty]')).toBeVisible();
  await expect(page.locator('[data-writing-empty]')).toHaveText('No notes in this topic yet.');
});
