import { readdir, readFile, writeFile, rename } from 'fs/promises';
import { join } from 'path';

async function fixImports(dir) {
  const files = await readdir(dir, { withFileTypes: true });
  
  for (const file of files) {
    const fullPath = join(dir, file.name);
    if (file.isDirectory()) {
      await fixImports(fullPath);
    } else if (file.name.endsWith('.js')) {
      let content = await readFile(fullPath, 'utf8');
      
      // Fix relative imports
      content = content.replace(/from\s+['"](\.[^'"]+)\.js['"]/g, "from '$1.cjs'");
      content = content.replace(/require\(['"](\.[^'"]+)\.js['"]\)/g, "require('$1.cjs')");
      
      await writeFile(fullPath, content);
    }
  }
}

// Fix imports before renaming
await fixImports('./dist/cjs');

// Now rename the files
const renameFiles = async (dir) => {
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
};

await renameFiles('./dist/cjs'); 