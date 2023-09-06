import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from "./basePage";


export class BucketPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }
}