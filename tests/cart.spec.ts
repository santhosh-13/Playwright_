import { test, expect } from '../fixtures';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Cart (SCRUM-2)', () => {
  test('TC10 add item updates cart badge', async ({ loginPage, page }) => {
    await loginPage.login(process.env.APP_USER!, process.env.APP_PASS!);
    const inventory = new InventoryPage(page);
    await inventory.addToCart('sauce-labs-backpack');
    await expect(inventory.cartBadge).toHaveText('1');
  });

  test('TC11 remove item clears cart badge', async ({ loginPage, page }) => {
    await loginPage.login(process.env.APP_USER!, process.env.APP_PASS!);
    const inventory = new InventoryPage(page);
    await inventory.addToCart('sauce-labs-backpack');
    await inventory.removeFromCart('sauce-labs-backpack');
    await expect(inventory.cartBadge).toBeHidden();
  });
});