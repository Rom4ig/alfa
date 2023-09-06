import { expect, type Locator, type Page } from '@playwright/test';

export class NavBar {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}