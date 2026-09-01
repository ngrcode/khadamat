import { expect, test } from '@playwright/test';

test.describe('application shell', () => {
  test('opens the login route', async ({ page }) => {
    await page.goto('/login');

    await expect(page.locator('body')).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });

  test('serves the PWA manifest', async ({ request }) => {
    const response = await request.get('/manifest.webmanifest');

    expect(response.ok()).toBeTruthy();

    const manifest = await response.json();
    expect(manifest).toMatchObject({
      name: 'سامانه خدمات گستر',
      display: 'standalone',
      start_url: '/dashboard',
    });
  });
});
