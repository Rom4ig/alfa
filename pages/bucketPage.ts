import { type Page } from '@playwright/test';
import { BasePage } from './basePage';
import { bucketUrl } from '../constants/routes';

export class BucketPage extends BasePage {
  constructor(page: Page) {
    super(page);
    this.url = bucketUrl;
  }
}
