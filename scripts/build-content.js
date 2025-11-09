import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');

async function listJsonFiles(dir) {
  const out = [];
  async function walk(current) {
    const entries = await readdir(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        out.push(full);
      }
    }
  }
  await walk(dir);
  return out;
}

async function inlineTemplates() {
  const contentRoot = join(projectRoot, 'content');
  const pageDir = join(contentRoot, 'pages');
  const projDir = join(contentRoot, 'project');
  const files = [
    ...(await listJsonFiles(pageDir)),
    ...(await listJsonFiles(projDir)),
  ];

  await Promise.all(
    files.map(async (full) => {
      const rel = full.replace(projectRoot + '/', '');
      const raw = await readFile(full, 'utf8');
      let data;
      try {
        data = JSON.parse(raw);
      } catch (e) {
        console.warn(`! Skipping invalid JSON: ${rel}`);
        return;
      }
      const mainPath = data?.csskfields?.mainPath;
      if (typeof mainPath === 'string' && mainPath.trim()) {
        const abs = mainPath.startsWith('/')
          ? join(projectRoot, mainPath)
          : resolve(dirname(full), mainPath);
        try {
          const template = await readFile(abs, 'utf8');
          if (!data.csskfields) data.csskfields = {};
          data.csskfields.main = template;
        } catch (err) {
          console.warn(`! Missing template for ${rel}: ${mainPath}`);
        }
      }
      await writeFile(full, JSON.stringify(data, null, 2) + '\n');
    }),
  );
}

await inlineTemplates();
console.log('✓ Injected templates into content JSON');
