// Local helper: `node e2e/screenshots.mjs` while `pnpm preview` is running.
import { chromium } from '@playwright/test';

const widths = [320, 375, 768, 1024, 1440];
const browser = await chromium.launch({ channel: 'chrome' });

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const messages = [];
  page.on('console', (msg) => messages.push(`${msg.type()}: ${msg.text()}`));
  await page.goto('http://localhost:4173/');
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  await page.screenshot({ path: `screenshots/${width}.png`, fullPage: true });
  console.log(width, overflow ? 'HORIZONTAL OVERFLOW' : 'ok', messages.join(' | '));
  await page.close();
}

await browser.close();
