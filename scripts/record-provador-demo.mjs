import { chromium } from 'playwright';
import { mkdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '../public/work');
const tmpDir = path.join(outDir, '.recordings');
const provadorDir = path.resolve(__dirname, '../../provador-virtual');
const PORT = 3457;

await mkdir(tmpDir, { recursive: true });

const devServer = spawn('npm', ['run', 'dev', '--', '-p', String(PORT)], {
  cwd: provadorDir,
  stdio: 'pipe',
  env: { ...process.env, PORT: String(PORT) },
});

const waitForServer = () =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Dev server timeout')), 60000);
    devServer.stdout?.on('data', (chunk) => {
      if (String(chunk).includes('Ready') || String(chunk).includes('started')) {
        clearTimeout(timeout);
        resolve(undefined);
      }
    });
    devServer.stderr?.on('data', (chunk) => {
      if (String(chunk).includes('Ready') || String(chunk).includes('started')) {
        clearTimeout(timeout);
        resolve(undefined);
      }
    });
    devServer.on('error', reject);
  });

try {
  await waitForServer();
  await new Promise((r) => setTimeout(r, 2000));

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    recordVideo: { dir: tmpDir, size: { width: 390, height: 844 } },
  });

  const page = await context.newPage();
  await page.goto(`http://localhost:${PORT}/try`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(3000);

  // Scroll and interact with upload UI (no inference — just show the flow)
  await page.locator('text=Monte seu look').waitFor({ timeout: 10000 });
  await page.waitForTimeout(4000);
  await page.evaluate(() => window.scrollBy(0, 200));
  await page.waitForTimeout(5000);

  const video = page.video();
  await page.close();
  await context.close();
  await browser.close();

  if (video) {
    const webmPath = await video.path();
    const dest = path.join(outDir, 'provador-demo.webm');
    await rename(webmPath, dest);
    console.log(`✓ ${dest}`);
  }
} catch (err) {
  console.error('✗', err.message);
  process.exitCode = 1;
} finally {
  devServer.kill('SIGTERM');
}
