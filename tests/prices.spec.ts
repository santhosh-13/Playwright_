import { test, expect } from '../fixtures';
import { PricesPage } from '../pages/PricesPage';

test.describe('Prices (SCRUM-4)', () => {
  test('TC20 capture all product prices', async ({ loginPage, page }) => {
    await loginPage.login(process.env.APP_USER!, process.env.APP_PASS!);
    const pricesPage = new PricesPage(page);

    const prices = await pricesPage.getPrices();
    console.log(prices);

    expect(prices).toHaveLength(6);
    prices.forEach(p => expect(p).toBeGreaterThan(0));
  });

  test('TC21 price low to high sorting works', async ({ loginPage, page }) => {
    await loginPage.login(process.env.APP_USER!, process.env.APP_PASS!);
    const pricesPage = new PricesPage(page);

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const actual = await pricesPage.getPrices();
    const expected = [...actual].sort((a, b) => a - b);

    expect(actual).toEqual(expected);
  });

  test('TC22 price high to low sorting works', async ({ loginPage, page }) => {
    await loginPage.login(process.env.APP_USER!, process.env.APP_PASS!);
    const pricesPage = new PricesPage(page);

    await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

    const actual = await pricesPage.getPrices();
    const expected = [...actual].sort((a, b) => b - a);

    expect(actual).toEqual(expected);
  });
});