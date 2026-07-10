import { chromium } from 'playwright'; // run: npx playwright install chromium
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/projects');

const shots = [
  { name: 'trapiche', urls: ['https://trapiche.cloud'], wait: 3000 },
  { name: 'wisio', urls: ['https://wisio.app'], wait: 3000 },
  { name: 'luup', urls: ['http://luup.dev'], wait: 3000 },
  { name: 'dev-map', urls: ['http://localhost:3456'], wait: 4000 },
  { name: 'provador-virtual', urls: ['http://localhost:3457'], wait: 3000 },
  { name: 'elevar-salud', urls: ['https://elevar-astro-lp.vercel.app'], wait: 3000 },
  { name: 'qcalc', urls: ['https://qcalc.vercel.app'], wait: 3000 },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

for (const shot of shots) {
  for (const [index, url] of shot.urls.entries()) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    const suffix = shot.urls.length > 1 ? `-${index + 1}` : '';
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(shot.wait);
      await page.screenshot({
        path: path.join(outDir, `${shot.name}${suffix}.png`),
        clip: { x: 0, y: 0, width: 1280, height: 450 },
      });
      console.log(`✓ ${shot.name}${suffix}`);
    } catch (err) {
      console.error(`✗ ${shot.name}${suffix}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
}

await browser.close();
