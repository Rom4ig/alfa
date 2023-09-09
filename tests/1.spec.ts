import { test, expect } from '../auth/fixtures';
import {LoginPage} from "../pages/loginPage";
import User from "../models/user";

test('1', async ({ page }) => {
  const user: User = {
    login: 'test',
    password: 'test'
  }
  const loginPage = new LoginPage(page)
  await loginPage.openPage()
  await loginPage.auth(user)
  await page.pause()
  await test.step('step_1 Кликнуть на иконку корзины', async () => {
  });
  await test.step('step_2 В окне корзины нажать кнопку Перейти в корзину', async () => {
  });
});
