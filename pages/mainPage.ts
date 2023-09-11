import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';
import { NavBar } from './navBar';

export class MainPage extends BasePage {
  readonly navBar: NavBar;
  readonly paginator: Locator;

  constructor(page: Page) {
    super(page);
    this.navBar = new NavBar(page);
    this.paginator = page.locator('.page-item');
  }

  async openPageByNumber(number: number) {
    const activePaginator = this.page.locator(`//li[.=${number}][contains(@class, 'active')]`);
    await this.paginator.nth(number - 1).click();
    await activePaginator.waitFor();
  }

  async addFirstItemsWithCountAndDiscount(count: number, isDiscount: boolean = false, startNumber: number = 0) {
    const items = isDiscount
      ? this.page.locator("//div[contains(@class, 'note-list')]//*[contains(@class, 'hasDiscount')]//button")
      : this.page.locator(
          "//div[contains(@class, 'note-list')]//*[not(contains(@class, 'hasDiscount')) and contains(@class, 'note-item')]//button"
        );
    const itemsCount = (await items.count()) - startNumber;
    for (let i = 0, counter = startNumber; i < count; i++, counter++) {
      await items.nth(counter).click();
      if (itemsCount < count && itemsCount === i + 1) {
        await this.openPageByNumber(2);
        counter = -1;
      }
    }
  }

  async addItemsByNumberAndDiscount(count: number, isDiscount: boolean = false, number: number) {
    const items = isDiscount
      ? this.page.locator("//div[contains(@class, 'note-list')]//*[contains(@class, 'hasDiscount')]//button")
      : this.page.locator(
          "//div[contains(@class, 'note-list')]//*[not(contains(@class, 'hasDiscount')) and contains(@class, 'note-item')]//button"
        );
    for (let i = 0; i < count; i++) {
      await items.nth(number - 1).click();
    }
  }
}
