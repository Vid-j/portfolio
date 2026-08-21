import { access, appendFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HEADER = 'date,email\n';

function csvEscape(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function resolveCsvPath() {
  const fromModule = join(dirname(fileURLToPath(import.meta.url)), '..', 'data', 'subscribers.csv');
  return process.env.SUBSCRIBERS_CSV_PATH ?? fromModule;
}

async function ensureCsv(filePath) {
  await mkdir(dirname(filePath), { recursive: true });
  try {
    await access(filePath);
  } catch {
    await writeFile(filePath, HEADER, 'utf8');
  }
}

export async function appendSubscriber(email) {
  const date = new Date().toISOString();
  const row = `${csvEscape(date)},${csvEscape(email)}\n`;

  let filePath = resolveCsvPath();
  try {
    await ensureCsv(filePath);
    await appendFile(filePath, row, 'utf8');
  } catch {
    filePath = join('/tmp', 'subscribers.csv');
    await ensureCsv(filePath);
    await appendFile(filePath, row, 'utf8');
  }

  return { date, path: filePath };
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
