import {expect, type Locator, type Page} from '@playwright/test';
import {BasePage} from "./basePage";
import User from "../models/user";
import {loginUrl} from "../constants/routes";


export class LoginPage extends BasePage {
    readonly loginField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page)
        this.loginField = page.locator('#loginform-username')
        this.passwordField = page.locator('#loginform-password')
        this.loginButton = page.getByRole('button', { name: 'Вход' });
    }
    async openPage() {
        await this.page.goto(loginUrl)
    }
    async auth(user: User) {
        //FILL -
        await this.loginField.type(user.login)
        await this.passwordField.type(user.password)
        await this.loginButton.click();
    }
}