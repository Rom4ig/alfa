import { test, expect } from '../auth/fixtures';
import { MainPage } from '../pages/mainPage';
import { BucketPage } from '../pages/bucketPage';

test.describe('Корзина', () => {
  test('Переход в пустую корзину.', async ({ page }) => {
    const mainPage = new MainPage(page);
    const bucketPage = new BucketPage(page);
    await mainPage.openPage();
    await mainPage.navBar.cleanBucket();
    await test.step('step_1 Кликнуть на иконку корзины', async () => {
      await mainPage.navBar.bucketButton.click();
      expect(await mainPage.navBar.bucketPopUp.isOpened()).toBeTruthy();
    });

    await test.step('step_2 В окне корзины нажать кнопку Перейти в корзину', async () => {
      await mainPage.navBar.bucketPopUp.openBucketPageButton.click();
      expect(bucketPage.isOpened()).toBeTruthy();
    });
  });
});
