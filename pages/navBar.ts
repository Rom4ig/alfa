import {expect, type Locator, type Page} from '@playwright/test';
import {BucketPopUp} from "./bucketPopUp";

export class NavBar {
  readonly page: Page;
  readonly bucketButton: Locator;
  readonly bucketPopUp: BucketPopUp;
  readonly bucketCountItems: Locator;
  constructor(page: Page) {
    this.page = page;
    this.bucketButton = page.locator('#dropdownBasket')
    this.bucketPopUp = new BucketPopUp(page)
    this.bucketCountItems = page.locator('.basket-count-items')
  }

  async cleanBucket() {
    await this.bucketButton.click()
    await this.bucketPopUp.cleanBucket();
  }

  async getItemCountsInBucket(): Promise<string> {
    return this.bucketCountItems.textContent()
  }
}