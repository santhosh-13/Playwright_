import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly cartBadge: Locator;

  constructor(private page: Page) {
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addToCart(itemId: string) {
    await this.page.locator(`[data-test="add-to-cart-${itemId}"]`).click();
  }

  async removeFromCart(itemId: string) {
    await this.page.locator(`[data-test="remove-${itemId}"]`).click();
  }
}