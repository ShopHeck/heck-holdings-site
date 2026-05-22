// Convert scripts/og-source.svg → public/og.png (1200×630).
// Run: node scripts/build-og.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, 'og-source.svg');
const out = resolve(__dirname, '..', 'public', 'og.png');

const svg = readFileSync(src);

await sharp(svg, { density: 144 })
  .resize(1200, 630)
  .png({ quality: 92, compressionLevel: 9 })
  .toFile(out);

console.log(`✓ wrote ${out}`);
