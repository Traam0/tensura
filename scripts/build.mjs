import { cp, mkdir, rm } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all(['index.html', 'src', 'public'].map((name) =>
  cp(new URL('../' + name, import.meta.url), new URL(name, output), { recursive: true })
));
console.log('Built static site in dist/');
