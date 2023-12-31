import { LoginPage } from '../pages/loginPage';
import type User from '../models/user';
import { test } from '@playwright/test';

test.skip('Авторизация', async ({ page }) => {
  const user: User = {
    login: 'test',
    password: 'test'
  };
  const loginPage = new LoginPage(page);
  await loginPage.openPage();
  await loginPage.auth(user);
});
