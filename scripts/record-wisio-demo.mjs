import { chromium } from 'playwright';
import { mkdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/work');
const tmpDir = path.join(outDir, '.recordings');

await mkdir(tmpDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: tmpDir, size: { width: 1280, height: 800 } },
});

const page = await context.newPage();

try {
  await page.goto('https://wisio.app', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(2000);

  // Scroll through landing sections
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollBy(0, 400));
  await page.waitForTimeout(2500);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2500);

  // Try editor page if linked from landing
  const editorLink = page.locator('a[href*="editor"], a[href*="project"], a[href*="app"]').first();
  if (await editorLink.count()) {
    await editorLink.click();
    await page.waitForTimeout(5000);
  }
} catch (err) {
  console.warn('Navigation partial — saving whatever was captured:', err.message);
}

const video = page.video();
await page.close();
await context.close();
await browser.close();

if (video) {
  const webmPath = await video.path();
  const dest = path.join(outDir, 'wisio-demo.webm');
  await rename(webmPath, dest);
  console.log(`✓ ${dest}`);
} else {
  console.error('✗ No video recorded');
  process.exit(1);
}
