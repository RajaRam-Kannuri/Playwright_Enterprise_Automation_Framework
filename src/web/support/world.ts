// features/support/world.ts
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
export interface CustomWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
}
interface CustomWorldOptions extends IWorldOptions {
  parameters: { [key: string]: any };
}
export class PlaywrightWorld extends World {
  browser?: Browser;
  context?: BrowserContext;
  page?: Page;
  attach: World['attach'];

  constructor(options: IWorldOptions) {
    super(options);
    this.attach = options.attach;
  }
}

setWorldConstructor(PlaywrightWorld);
