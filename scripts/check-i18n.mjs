import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function collectKeys(obj, prefix = '') {
  const keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...collectKeys(value, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

const en = JSON.parse(readFileSync(resolve(root, 'i18n/messages/en.json'), 'utf8'));
const de = JSON.parse(readFileSync(resolve(root, 'i18n/messages/de.json'), 'utf8'));

const enKeys = new Set(collectKeys(en));
const deKeys = new Set(collectKeys(de));

const onlyInEn = [...enKeys].filter((k) => !deKeys.has(k));
const onlyInDe = [...deKeys].filter((k) => !enKeys.has(k));

let failed = false;

if (onlyInEn.length > 0) {
  console.error('Keys in en.json but missing from de.json:');
  onlyInEn.forEach((k) => console.error(`  - ${k}`));
  failed = true;
}

if (onlyInDe.length > 0) {
  console.error('Keys in de.json but missing from en.json:');
  onlyInDe.forEach((k) => console.error(`  - ${k}`));
  failed = true;
}

if (failed) {
  process.exit(1);
} else {
  console.log(`✓ i18n key parity confirmed — ${enKeys.size} keys in both en.json and de.json`);
}
