import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from "./basePage";
import {SearchPanel} from "./searchPanel";
import {NavBar} from "./navBar";

export class MainPage extends BasePage {
    readonly searchPanel: SearchPanel;
    readonly navBar: NavBar;

    constructor(page: Page) {
        super(page)
        this.searchPanel = new SearchPanel(page)
        this.navBar = new NavBar(page)
    }
}