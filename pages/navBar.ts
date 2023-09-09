import { expect, type Locator, type Page } from '@playwright/test';

export class NavBar {
    readonly page: Page;
    readonly bucketButton;

    constructor(page: Page) {
        this.page = page;
        this.bucketButton = page.locator('#dropdownBasket')
    }
}