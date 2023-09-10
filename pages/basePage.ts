import {expect, type Locator, type Page} from '@playwright/test';

export class BasePage {
  readonly page: Page;
  url: string;

  constructor(page: Page) {
    this.page = page;
    this.url = '/'
  }

  async openPage() {
    await this.page.goto(this.url)
  }

  isOpened(): boolean {
    return this.page.url().includes(this.url)
  }
}