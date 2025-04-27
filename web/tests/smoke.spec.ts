import { test, expect } from '@playwright/test';

test('landing page shows login form', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('form')).toBeVisible();
  await expect(page.locator('input[placeholder="Username"]')).toBeVisible();
});