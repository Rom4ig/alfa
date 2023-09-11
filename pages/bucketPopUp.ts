import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from "./basePage";


export class BucketPopUp {
  readonly page: Page;
  readonly wrapper: Locator;
  readonly clearBucketButton: Locator;
  readonly openBucketPageButton: Locator;
  readonly basketItemTitle: Locator;
  readonly basketItemPrice: Locator;
  readonly basketTotalPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.wrapper = page.locator("//*[@aria-labelledby='dropdownBasket']")
    this.clearBucketButton = this.wrapper.locator('.mr-auto')
    this.openBucketPageButton = this.wrapper.getByText('Перейти в корзину')
    this.basketItemTitle = this.wrapper.locator('.basket-item-title')
    this.basketItemPrice = this.wrapper.locator('.basket-item-price')
    this.basketTotalPrice = this.wrapper.locator('.basket_price')
  }

  async isOpened(): Promise<boolean> {
    return this.wrapper.isVisible()
  }

  async isItemPresentByCount(count: number = 1): Promise<boolean> {
    const countItemsTitle = await this.basketItemTitle.count()
    const countItemsPrice = await this.basketItemPrice.count()
    return await (countItemsPrice === count) && (countItemsTitle === count) && await this.basketTotalPrice.isVisible()
  }

  async cleanBucket() {
    if (await this.isOpened()) {
      await this.clearBucketButton.click()
    }
  }
}