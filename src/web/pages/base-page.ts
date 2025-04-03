import { Page } from 'playwright';
import dotenv from 'dotenv';

dotenv.config();

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    if (!page) {
      throw new Error("Page object is undefined. Ensure it is properly initialized.");
    }
    this.page = page;
  }

  async navigateTo(url: string): Promise<void> {
    if (!this.page) throw new Error("Page is not initialized.");
    await this.page.goto(url);
  }

  async fillField(selector: string, value: string): Promise<void> {
    await this.page.fill(selector, value);
  }

  async clickElement(selector: string): Promise<void> {
    await this.page.click(selector);
  }

  async getText(selector: string): Promise<string> {
    const text = await this.page.textContent(selector);
    if (!text) {
      throw new Error(`No text content found for selector: ${selector}`);
    }
    return text;
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }
}
