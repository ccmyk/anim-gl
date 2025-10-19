import { readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(root, '..');

async function inlineTemplates(glob) {
  const { globby } = await import('globby');
  const files = await globby(glob, { cwd: projectRoot });
  await Promise.all(
    files.map(async (file) => {
      const full = join(projectRoot, file);
      const data = JSON.parse(await readFile(full, 'utf8'));
      const mainPath = data?.csskfields?.mainPath;
      if (mainPath) {
        const template = await readFile(join(projectRoot, mainPath), 'utf8');
        data.csskfields.main = template;
      }
      await writeFile(full, JSON.stringify(data, null, 2) + '\n');
    }),
  );
}

await inlineTemplates('content/{pages,project}/*.json');
console.log('✓ Injected templates into content JSON');
