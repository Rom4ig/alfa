import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from "./basePage";


export class BucketPopUp {
  readonly page: Page;
  readonly wrapper: Locator;
  readonly clearBucketButton: Locator;
  readonly openBucketPageButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.wrapper = page.locator("//*[@aria-labelledby='dropdownBasket']")
    this.clearBucketButton = this.wrapper.locator('.mr-auto')
    this.openBucketPageButton = this.wrapper.getByText('Перейти в корзину')
  }

  async isOpened(): Promise<boolean> {
    return this.wrapper.isVisible()
  }

  async cleanBucket() {
    if (await this.isOpened()) {
      await this.clearBucketButton.click()
    }
  }

  async
}