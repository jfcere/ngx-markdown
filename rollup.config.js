import commonjs from 'rollup-plugin-commonjs';
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
    commonjs({
      include: 'dist/lib/**',
      extensions: ['.js'],
      ignoreGlobal: false,
      sourceMap: false,
      namedExports: { 'node_modules/marked/lib/marked.js': ['marked'] },
    }),
  ],
  globals: {
    '@angular/common/http': 'ng.common.http',
    '@angular/core': 'ng.core',
    'marked': 'marked',
    'rxjs': 'rxjs',
    'rxjs/operators': 'rxjs.operators',
  },
  external: [
    '@angular/common/http',
    '@angular/core',
    'marked',
    'rxjs',
    'rxjs/operators',
  ],
}