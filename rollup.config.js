import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'dist/lib/index.js',
  output: {
    file: 'dist/bundles/ngx-markdown.umd.js',
    format: 'umd',
  },
  sourceMap: false,
  name: 'ngx.markdown',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
    }),
  ],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/http': 'ng.http',
    'markdown-it': 'markdown-it',
    'rxjs/Observable': 'rxjs.observable',
    'rxjs/add/operator/catch': 'rxjs.catch',
    'rxjs/add/operator/map': 'rxjs.map',
    'rxjs/observable/ErrorObservable': 'rxjs.errorobservable',
  },
  external: [
    '@angular/core',
    '@angular/http',
    'markdown-it',
    'rxjs/Observable',
    'rxjs/add/operator/catch',
    'rxjs/add/operator/map',
    'rxjs/observable/ErrorObservable',
  ],
}