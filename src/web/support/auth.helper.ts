import { chromium } from 'playwright';
import fs from 'fs';

export async function globalLogin() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(process.env.BASE_URL_SAUCEDEMO || "https://www.saucedemo.com/");
  await page.fill('[data-test="username"]', 'standard_user');
  await page.fill('[data-test="password"]', 'secret_sauce');
  await page.click('[data-test="login-button"]');
  await page.waitForURL('**/inventory.html');

  fs.mkdirSync('storage', { recursive: true });
  await context.storageState({ path: 'storage/state.json' });
}
