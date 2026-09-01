import { expect, test } from '@playwright/test';

test.skip(
  process.env.VISUAL_REGRESSION !== '1',
  'Run npm run test:visual or npm run test:visual:update to enable snapshots.'
);

test('login page visual baseline', async ({ page }) => {
  await page.goto('/login');
  await page.locator('body').waitFor({ state: 'visible' });

  await expect(page).toHaveScreenshot('login-page.png', {
    fullPage: true,
    maxDiffPixelRatio: 0.02,
  });
});
