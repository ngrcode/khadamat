import { expect, test } from '@playwright/test';

test('opens the hokm create route without client runtime errors', async ({
  context,
  page,
}) => {
  const pageErrors: string[] = [];

  page.on('pageerror', (error) => {
    pageErrors.push(error.stack ?? error.message);
  });

  await context.addCookies([
    {
      name: 'token',
      value: 'e2e-token',
      domain: '127.0.0.1',
      path: '/',
    },
  ]);

  await page.goto('/dashboard/hokmCreate');
  await expect(page.getByRole('heading', { name: 'افزودن' })).toBeVisible();

  expect(pageErrors).toEqual([]);
});
