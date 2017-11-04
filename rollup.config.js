export default {
  input: 'dist/lib/index.js',
  output: {
    file: 'dist/bundles/ngx-markdown.umd.js',
    format: 'umd',
  },
  sourceMap: false,
  name: 'ngx.markdown',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/http': 'ng.http',
    'markdown-it': 'markdown-it',
    'prismjs': 'prismjs',
    'rxjs/Observable': 'Rx',
  },
  external: [
    '@angular/core',
    '@angular/http',
    'markdown-it',
    'prismjs',
    'prismjs/prism',
  ],
}