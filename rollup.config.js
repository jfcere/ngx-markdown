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
    'marked': 'marked',
    'rxjs/add/observable/throw': 'rxjs.throw',
    'rxjs/add/operator/catch': 'rxjs.catch',
    'rxjs/add/operator/map': 'rxjs.map',
    'rxjs/Observable': 'rxjs.observable',
    'rxjs/observable/ErrorObservable': 'rxjs.errorObservable',
  },
  external: [
    '@angular/core',
    '@angular/http',
    'marked',
    'rxjs/add/observable/throw',
    'rxjs/add/operator/catch',
    'rxjs/add/operator/map',
    'rxjs/Observable',
    'rxjs/observable/ErrorObservable',
  ],
}