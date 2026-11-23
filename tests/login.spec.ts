import { test, expect } from '../fixtures';

test.describe('Login (SCRUM-1)', () => {
  test('TC01 valid user can log in @smoke', async ({ loginPage, page }) => {
    await loginPage.login(process.env.APP_USER!, process.env.APP_PASS!);
    await expect(page).toHaveURL(/inventory/);
  });

  test('TC02 locked out user sees error', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectError('locked out');
  });

  test('TC03 wrong password shows error', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'wrong');
    await loginPage.expectError('do not match');
  });

  test('TC04 empty username shows required error', async ({ loginPage }) => {
    await loginPage.login('', 'secret_sauce');
    await loginPage.expectError('Username is required');
  });
});