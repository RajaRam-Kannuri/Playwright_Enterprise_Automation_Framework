import { BasePage } from './base-page.ts';
import { Page } from 'playwright';

export class LoginErrorPage extends BasePage {
 [key: string]: any; // Index signature to allow dynamic property access
  locked_out_user = { selector: "//h3[@data-test='error']" };
  problem_user = { selector: "//h3[@data-test='error']" };
  errorMessageperformance = { selector: "//h3[@data-test='error']" };
  errorMessageuser = { selector: "//h3[@data-test='error']" };
  errorMessagevisual = { selector: "//h3[@data-test='error']" };

  constructor(page: Page) {
    super(page);
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    const errorMessageElement = this.locked_out_user.selector;
    await this.page.waitForSelector(errorMessageElement);
    const text = await this.page.textContent(errorMessageElement);
    if (text !== expectedMessage) {
      throw new Error(`Expected message: ${expectedMessage}, but got: ${text}`);
    }
  }

  async open(): Promise<void> {
    await this.navigateTo(process.env.baseUrl+'/');
  }
}