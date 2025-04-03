import { BasePage } from './base-page';
import { Page } from 'playwright';

export class LoginPage extends BasePage {

  [key: string]: any;
  userName = { selector: '[data-test="username"]' };
  password = { selector: '[data-test="password"]' };
  signIn = { selector: '[data-test="login-button"]' };

  constructor(page: Page) {
    super(page); // Ensures page is properly passed to BasePage
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillField(this.userName.selector, username);
    await this.fillField(this.password.selector, password);
    await this.clickElement(this.signIn.selector);
  }

  async open(): Promise<void> {
    await this.navigateTo(process.env.BASE_URL || "https://www.saucedemo.com/");
  }
}
