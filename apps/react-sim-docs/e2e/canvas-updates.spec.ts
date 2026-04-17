import { expect, test } from '@playwright/test';

function digestPng(buf: Buffer) {
  // Simple digest over bytes; good enough for "changed frame" assertion.
  let hash = 2166136261 >>> 0;
  let nonTrivial = 0;
  const step = Math.max(1, Math.floor(buf.length / 4096));
  for (let i = 0; i < buf.length; i += step) {
    const v = buf[i] ?? 0;
    if (v !== 0 && v !== 255) nonTrivial += 1;
    hash ^= v;
    hash = Math.imul(hash, 16777619) >>> 0;
  }
  return { hash, nonTrivial };
}

async function canvasScreenshot(page: import('@playwright/test').Page, selector: string) {
  const el = page.locator(selector).first();
  await expect(el).toBeVisible();
  const png = await el.screenshot();
  return { png, digest: digestPng(png) };
}

async function pauseIfPlaying(page: import('@playwright/test').Page) {
  const btn = page.getByRole('button', { name: /Play|Pause/ }).first();
  const label = (await btn.textContent()) ?? '';
  if (label.includes('Pause')) {
    await btn.click();
  }
}

test('Segregation: canvas is non-trivial and changes after one Step', async ({ page }) => {
  await page.goto('/examples/segregation');

  await pauseIfPlaying(page);

  // Wait for initial draw (not blank).
  await expect.poll(async () => (await canvasScreenshot(page, 'canvas')).digest.nonTrivial).toBeGreaterThan(0);
  const before = await canvasScreenshot(page, 'canvas');

  await page.getByRole('button', { name: /^Step/ }).first().click();

  await expect.poll(async () => (await canvasScreenshot(page, 'canvas')).digest.hash).not.toBe(before.digest.hash);
});

test('Worker canvas (xor ring): canvas is non-trivial and changes after one Step', async ({ page }) => {
  await page.goto('/examples/worker-canvas');

  await pauseIfPlaying(page);

  await expect.poll(async () => (await canvasScreenshot(page, 'canvas')).digest.nonTrivial).toBeGreaterThan(0);
  const before = await canvasScreenshot(page, 'canvas');

  await page.getByRole('button', { name: /^Step/ }).first().click();

  await expect.poll(async () => (await canvasScreenshot(page, 'canvas')).digest.hash).not.toBe(before.digest.hash);
});

test('Game of Life: DOM grid renders and changes after one Step', async ({ page }) => {
  await page.goto('/examples/game-of-life');

  // Game of Life uses a DOM grid, not canvas. Check the grid renders.
  await expect(page.locator('[role="img"]')).toBeVisible();

  // Click step and verify tick advances
  const tickBefore = await page.locator('text=tick:').textContent();
  await page.getByRole('button', { name: /^Step/ }).first().click();
  const tickAfter = await page.locator('text=tick:').textContent();
  expect(tickAfter).not.toBe(tickBefore);
});
