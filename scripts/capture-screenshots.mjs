import { chromium } from 'playwright'; // run: npx playwright install chromium
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/projects');

const shots = [
  { name: 'trapiche', url: 'https://trapiche.cloud', wait: 3000 },
  { name: 'wisio', url: 'https://wisio.app', wait: 3000 },
  { name: 'luup', url: 'http://luup.dev', wait: 3000 },
  { name: 'dev-map', url: 'http://localhost:3456', wait: 4000 },
  { name: 'provador-virtual', url: 'http://localhost:3457', wait: 3000 },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const shot of shots) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  try {
    await page.goto(shot.url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(shot.wait);
    await page.screenshot({
      path: path.join(outDir, `${shot.name}.png`),
      clip: { x: 0, y: 0, width: 1280, height: 450 },
    });
    console.log(`✓ ${shot.name}`);
  } catch (err) {
    console.error(`✗ ${shot.name}: ${err.message}`);
  } finally {
    await page.close();
  }
}

await browser.close();
