import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('login page has no critical accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(({ impact }) => impact === 'critical')).toEqual([]);
});
