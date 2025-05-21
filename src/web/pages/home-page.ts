import { BasePage } from './base-page';
import { Page } from 'playwright';

export class HomePage extends BasePage {

  [key: string]: any;
  appName = { selector: '#header_container .app_logo' };
  password = { selector: '[data-test="password"]' };
  signIn = { selector: '[data-test="login-button"]' };
  inventoryList = { selector: 'div.inventory_item_name' };


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
