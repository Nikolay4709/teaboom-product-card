import { expect, test } from '@playwright/test';

test('switching weight updates sku, prices and selection', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('[data-product-sku]')).toHaveText('01306');

  await page.getByLabel('1000 г').check();

  await expect(page.getByLabel('1000 г')).toBeChecked();
  await expect(page.locator('[data-product-sku]')).toHaveText('01308');
  await expect(page.locator('[data-product-price]')).toHaveText(/2\s064\s₽/);
  await expect(page.locator('[data-product-old-price]')).toHaveText(/2\s592\s₽/);
  await expect(page.locator('[data-product-discount]')).toHaveText('−20%');
});

test('weights are switchable from the keyboard', async ({ page }) => {
  await page.goto('/');

  await page.getByLabel('100 г').focus();
  await page.keyboard.press('ArrowRight');

  await expect(page.getByLabel('500 г')).toBeChecked();
  await expect(page.locator('[data-product-sku]')).toHaveText('01307');
});

test('add to cart shows a confirmation', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'В корзину' }).click();

  await expect(page.getByRole('status')).toContainText('Добавлено в корзину: 100 г');
});
