// features/support/hooks.ts
import { BeforeAll, AfterAll, Before, After, AfterStep, Status } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { CustomWorld } from './world';
import * as fs from 'fs';

let browser: import('playwright').Browser;  // will hold the global Browser instance

BeforeAll(async function () {
  // Launch the browser (one for all scenarios)
  browser = await chromium.launch({ headless: false });
});

Before(async function (this: CustomWorld) {
  // Create a new browser context and page for each scenario
  this.context = await browser.newContext({
    recordVideo: { dir: "videos/" },             // enable video recording to 'videos' folder
    ignoreHTTPSErrors: true
  });
  await this.context.tracing.start({ screenshots: true, snapshots: true });  // start tracing
  this.page = await this.context.newPage();
});

AfterStep(async function (this: CustomWorld, { result }) {
  // If a step has failed, take screenshot and attach immediately
  if (result.status === Status.FAILED) {
    if (this.page) {
      const imageBuffer = await this.page.screenshot();
      this.attach(imageBuffer, { mediaType: 'image/png', fileName: 'screenshot.png' });
    }
    // Duplicate line removed as imageBuffer is already attached above
    
    // Stop tracing and attach trace file
    if (this.context) {
      await this.context.tracing.stop({ path: 'trace.zip' });
    }
    const traceData = fs.readFileSync('trace.zip');
    this.attach(traceData, { mediaType: 'application/zip', fileName: 'trace.zip' });
    
    // Finalize video: get path, close context to save video, attach the video
    let videoPath: string | undefined;
    if (this.page?.video) {
      const video = this.page?.video();
      if (video) {
        videoPath = await video.path();
      }
    }
    if (this.context) {
      await this.context.close();  // this will save the video to disk (in 'videos/' dir)
    }
    if (videoPath && fs.existsSync(videoPath)) {
      const videoData = fs.readFileSync(videoPath);
      this.attach(videoData, { mediaType: 'video/webm', fileName: 'video.webm' });
    }
    // Set context/page to undefined to avoid closing again in After hook
    this.page = undefined;
    this.context = undefined;
  }
});

After(async function (this: CustomWorld) {
  // Cleanup after each scenario (if not already closed)
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});

AfterAll(async function () {
  // Close the browser after all tests
  await browser.close();
});
