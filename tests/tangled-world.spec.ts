// Production regression coverage for the Common Ground replacement of Tangled World.
import { expect, test } from '@playwright/test';

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
    await expect(page.locator('[data-writing-count]')).toHaveText(`${count} notes`);
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
