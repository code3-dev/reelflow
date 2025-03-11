import { readdir, rename } from 'fs/promises';
import { join } from 'path';

async function renameFiles(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = join(dir, file.name);
    if (file.isDirectory()) {
      await renameFiles(fullPath);
    } else if (file.name.endsWith('.js')) {
      const newPath = fullPath.replace(/\.js$/, '.cjs');
      await rename(fullPath, newPath);
    }
  }
}

// Start renaming from the CJS build directory
renameFiles('./dist/cjs').catch(console.error); 