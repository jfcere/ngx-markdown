/**
 * Fixture: Vite import-analysis treats a string-literal dynamic import as a
 * static dependency. That is why unused-KaTeX apps 500 on ng serve after #660.
 * Matches the published-path failure:
 * Failed to resolve import "marked-katex-extension" from ngx-markdown.mjs
 *
 * Type-only `typeof import('...')` is erased from .mjs and is not this bug.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const servicePath = path.join(here, '..', 'src', 'markdown.service.ts');
const source = fs.readFileSync(servicePath, 'utf8');

// Strip type-only import() so we only see runtime dynamic imports (emitted JS).
const withoutTypeImports = source.replace(/typeof\s+import\s*\(\s*['"][^'"]+['"]\s*\)/g, 'any');

// Vite import-analysis flags import('literal'), not import(expr).
// /* @vite-ignore */ on that statement tells Vite to skip the specifier.
const viteStaticImport = /(?:\/\*\s*@vite-ignore\s*\*\/\s*)?import\s*\(\s*(['"])([^'"]+)\1\s*\)/g;

const visible = [];
for (const match of withoutTypeImports.matchAll(viteStaticImport)) {
  const ignored = /@vite-ignore/.test(match[0]);
  const specifier = match[2];
  if (specifier === 'marked-katex-extension' && !ignored) {
    visible.push(match[0]);
  }
}

assert.equal(
  visible.length,
  0,
  `Vite-visible static import of optional peer marked-katex-extension still present:\n${visible.join('\n')}\n` +
    'Hide the specifier (indirect import or /* @vite-ignore */) so unused-KaTeX apps can boot.',
);

console.log('GREEN: no Vite-static runtime import("marked-katex-extension") in markdown.service.ts');
