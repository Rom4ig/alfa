import {test, expect} from '../auth/fixtures';
import {MainPage} from "../pages/mainPage";
import {BucketPage} from "../pages/bucketPage";

test.describe('Корзина', () => {
  test('Переход в корзину с 1 неакционным товаром.', async ({page}) => {
    const mainPage = new MainPage(page)
    const bucketPage = new BucketPage(page)
    await mainPage.openPage()
    await mainPage.navBar.cleanBucket();

    await test.step('step_1 Добавить в корзину один товар без скидки', async () => {
      await page.pause()
      await mainPage.addFirstItemsWithCountAndDiscount(1)
      expect(await mainPage.navBar.getItemCountsInBucket()).toEqual('1')
    });

    await test.step('step_2 Нажать на иконку корзины', async () => {
      await mainPage.navBar.bucketButton.click()
      expect(await mainPage.navBar.bucketPopUp.isOpened()).toBeTruthy()
      expect(await mainPage.navBar.bucketPopUp.isItemPresentByCount()).toBeTruthy()
    });

    await test.step('step_3 В окне корзины нажать кнопку перейти в корзину', async () => {
      await mainPage.navBar.bucketPopUp.openBucketPageButton.click()
      expect(bucketPage.isOpened()).toBeTruthy()
    });
  });
})
