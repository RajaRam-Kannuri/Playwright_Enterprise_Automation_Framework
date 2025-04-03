import { Given, When, Then } from '@cucumber/cucumber';
import { LoginPage } from '../pages/login-page';
import { LoginErrorPage } from '../pages/login-error-page';
import { HomePage } from '../pages/home-page';
import { CustomWorld } from '../support/world';
import { expect } from 'chai';


const pages = {
  loginPage: LoginPage,
  loginErrorPage: LoginErrorPage,
  homePage: HomePage
};

Given('I am on the {string} page', async function (this: CustomWorld, pageName: keyof typeof pages) {
  console.log("🚀 Checking Page in Step Definitions:", this.page ? "✅ Page Initialized" : "❌ Page is Undefined");

  if (!this.page) {
    throw new Error("❌ Page object is not initialized. Ensure the Before hook is running properly.");
  }

  console.log(`🌐 Navigating to: ${process.env.BASE_URL}`);
  const PageObject = pages[pageName];
  const pageInstance = new PageObject(this.page);
  await pageInstance.open();
});

When('I enter {string} as {string} on {string}', async function (this: CustomWorld, field: string, value: string, pageName: keyof typeof pages) {
  console.log("🚀 Checking Page before entering value:", this.page ? "✅ Page Initialized" : "❌ Page is Undefined");

  if (!this.page) throw new Error("❌ Page object is not initialized.");

  const PageObject = pages[pageName];
  const pageInstance = new PageObject(this.page);
  const locator = pageInstance[field].selector;
  await this.page.locator(locator).scrollIntoViewIfNeeded();
  await pageInstance.fillField(locator, value);
});

When('I click on {string} on {string}', async function (this: CustomWorld, button: string, pageName: keyof typeof pages) {
  console.log("🚀 Checking Page before clicking:", this.page ? "✅ Page Initialized" : "❌ Page is Undefined");

  if (!this.page) throw new Error("❌ Page object is not initialized.");

  const PageObject = pages[pageName];
  const pageInstance = new PageObject(this.page);
  const locator = pageInstance[button].selector;
  await this.page.locator(locator).scrollIntoViewIfNeeded();
  await pageInstance.clickElement(locator);
});

Then('I should see {string} for {string} on {string}', async function (this: CustomWorld, message: string, username: string, pageName: keyof typeof pages) {
  console.log("🚀 Checking Page before validation:", this.page ? "✅ Page Initialized" : "❌ Page is Undefined");

  if (!this.page) throw new Error("❌ Page object is not initialized.");

  const PageObject = pages[pageName];
  const pageInstance = new PageObject(this.page);
  const locator = pageInstance[username].selector;
  await this.page.locator(locator).scrollIntoViewIfNeeded();
  await this.page.waitForSelector(locator);
  const text = await this.page.textContent(locator);
  expect(text, `❌ Expected "${text}" to contain "${message}"`).to.include(message);

});

When('I select {string} from {string} on {string}', async function (this: CustomWorld, option: string, dropdown: string, pageName: keyof typeof pages) {

  if (!this.page) throw new Error("❌ Page object is not initialized.");
  const PageObject = pages[pageName];
  const pageInstance = new PageObject(this.page);
  const locator = pageInstance[dropdown].selector;
  await this.page.locator(locator).scrollIntoViewIfNeeded();
  await this.page.selectOption(locator, { label: option });
});

Then(
  'the list {string} on {string} should contain:',
  async function (
    this: CustomWorld,
    listName: string,
    pageName: keyof typeof pages,
    dataTable: any
  ) {
    if (!this.page) throw new Error("❌ Page object is not initialized.");

    const expectedItems: string[] = dataTable.raw().flat();
    const PageObject = pages[pageName];
    const pageInstance = new PageObject(this.page);
    const locator = pageInstance[listName].selector;

    const actualItems = await this.page.locator(locator).allTextContents();

    // Optional: Trim and normalize both arrays
    const trimmedActual = actualItems.map(item => item.trim());
    const trimmedExpected = expectedItems.map(item => item.trim());

    expect(trimmedActual).to.deep.equal(trimmedExpected);
  }
);

When(
  'I type {string} in {string} on {string} and select suggestion {string}',
  async function (this: CustomWorld, keyword: string, input: string, pageName: keyof typeof pages, suggestion: string) {
    if (!this.page) throw new Error("❌ Page object is not initialized.");
    const PageObject = pages[pageName];
    const pageInstance = new PageObject(this.page);
    const inputSelector = pageInstance[input].selector;

    await this.page.fill(inputSelector, keyword);
    await this.page.waitForTimeout(500); // Let suggestions load
    await this.page.click(`text=${suggestion}`);
  }
);

Then(
  'I should see {int} suggestions on {string}',
  async function (this: CustomWorld, expectedCount: number, pageName: keyof typeof pages) {
    if (!this.page) throw new Error("❌ Page object is not initialized.");
    const PageObject = pages[pageName];
    const pageInstance = new PageObject(this.page);

    const suggestionSelector = pageInstance['suggestionList'].selector; // e.g. '.suggestion-item'
    await this.page.waitForSelector(suggestionSelector, { state: 'visible' });
    const count = await this.page.locator(suggestionSelector).count();

    expect(count).to.equal(expectedCount, `❌ Expected ${expectedCount} suggestions but got ${count}`);
  }
);

Then(
  'a suggestion containing {string} is shown on {string}',
  async function (this: CustomWorld, partialText: string, pageName: keyof typeof pages) {
    if (!this.page) throw new Error("❌ Page object is not initialized.");
    const PageObject = pages[pageName];
    const pageInstance = new PageObject(this.page);
    const suggestionSelector = pageInstance['suggestionList'].selector;

    await this.page.waitForSelector(suggestionSelector, { state: 'visible' });
    const texts = await this.page.locator(suggestionSelector).allTextContents();
    const match = texts.some(t => t.toLowerCase().includes(partialText.toLowerCase()));

    expect(match, `❌ No suggestion contains "${partialText}"`).to.be.true;
  }
);

Then(
  'a suggestion exactly matching {string} is shown on {string}',
  async function (this: CustomWorld, exactText: string, pageName: keyof typeof pages) {
    if (!this.page) throw new Error("❌ Page object is not initialized.");
    const PageObject = pages[pageName];
    const pageInstance = new PageObject(this.page);
    const suggestionSelector = pageInstance['suggestionList'].selector;

    await this.page.waitForSelector(suggestionSelector, { state: 'visible' });
    const texts = await this.page.locator(suggestionSelector).allTextContents();
    const match = texts.some(t => t.trim().toLowerCase() === exactText.toLowerCase());

    expect(match, `❌ No exact match found for "${exactText}"`).to.be.true;
  }
);

Then(
  'all suggestions contain {string} on {string}',
  async function (this: CustomWorld, keyword: string, pageName: keyof typeof pages) {
    if (!this.page) throw new Error("❌ Page object is not initialized.");
    const PageObject = pages[pageName];
    const pageInstance = new PageObject(this.page);
    const suggestionSelector = pageInstance['suggestionList'].selector;

    await this.page.waitForSelector(suggestionSelector, { state: 'visible' });
    const texts = await this.page.locator(suggestionSelector).allTextContents();
    const allMatch = texts.every(t => t.toLowerCase().includes(keyword.toLowerCase()));

    expect(allMatch, `❌ Not all suggestions contain "${keyword}"`).to.be.true;
  }
);

When('I open {string} then click on {string} on {string}', async function (this: CustomWorld, menu: string, submenu: string, pageName: keyof typeof pages) {
  if (!this.page) throw new Error("❌ Page object is not initialized.");
  const PageObject = pages[pageName];
  const pageInstance = new PageObject(this.page);
  const menuLocator = pageInstance[menu].selector;
  const subLocator = pageInstance[submenu].selector;
  await this.page.click(menuLocator);
  await this.page.click(subLocator);
});

When('I click page number {string} on pagination of {string}', async function (this: CustomWorld, pageNum: string, pageName: keyof typeof pages) {
  if (!this.page) throw new Error("❌ Page object is not initialized.");
  const PageObject = pages[pageName];
  const pageInstance = new PageObject(this.page);
  await this.page.click(`text="${pageNum}"`);
});
