import {test, expect} from '../auth/fixtures';
import {MainPage} from "../pages/mainPage";
import {BucketPage} from "../pages/bucketPage";

test.describe('Корзина', () => {
  test('Переход в корзину с 9 разными товарами.', async ({page}) => {
    const mainPage = new MainPage(page)
    const bucketPage = new BucketPage(page)
    await mainPage.openPage()
    await mainPage.navBar.cleanBucket();
    await page.pause()
    await mainPage.addFirstItemsWithCountAndDiscount(1)

    await test.step('step_1 Добавить в корзину ещё 8 разных товаров', async () => {
      await mainPage.addFirstItemsWithCountAndDiscount(8, false, 1)
      expect(await mainPage.navBar.getItemCountsInBucket()).toEqual('9')

    });

    await test.step('step_2 Нажать на иконку корзины', async () => {
      await page.pause()
      await mainPage.navBar.bucketButton.click()
      expect(await mainPage.navBar.bucketPopUp.isOpened()).toBeTruthy()
      expect(await mainPage.navBar.bucketPopUp.isItemPresentByCount(9)).toBeTruthy()
    });

    await test.step('step_3 В окне корзины нажать кнопку перейти в корзину', async () => {
      await mainPage.navBar.bucketPopUp.openBucketPageButton.click()
      expect(bucketPage.isOpened()).toBeTruthy()
    });
  });

})
