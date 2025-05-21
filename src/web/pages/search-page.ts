import { BasePage } from './base-page';
import { Page } from 'playwright';
export class SearchPage extends BasePage {

  [key: string]: any;
  searchInput = { selector: 'cr-searchbox#searchbox >> input#input.truncate' };
  password = { selector: '[data-test="password"]' };
  signIn = { selector: '[data-test="login-button"]' };
  inventoryList = { selector: 'div.inventory_item_name' };


  constructor(page: Page) {
    super(page); // Ensures page is properly passed to BasePage
  }
}
