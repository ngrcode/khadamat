import { expect, test } from '@playwright/test';

test('application responds at its root route', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).toBeVisible();
});
