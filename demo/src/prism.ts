/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */

/**
 * Prism language extension
 * https://prismjs.com/extending.html
 */

 declare let Prism: any;

 Prism.languages.typescript = Prism.languages.extend('typescript', {

   'class-name': [
     // existing pattern
     Prism.languages.typescript['class-name'],

     // constructor(private foo:Foo, bar: Bar) { }
     // function foo(): Bar {}
     // const foo = (): Bar => {};
     // const foo = (): void => {};
     // foo: Bar = {};
     {
       pattern: /(:)([^,()={][A-Z]{1}[^,()={]+)/,
       lookbehind: true,
       inside: Prism.languages.typescript,
     },

     // new Foo();
     // new Foo.Bar();
     {
       pattern: /\b(new\s.*\.|new\s)([^(]+)/,
       lookbehind: true,
     },

     // import { foo, bar } from 'baz';
     {
       pattern: /(import\s*{)\s*([^}]*)/,
       lookbehind: true,
       inside: {
         'import-member': /([^,]+)/,
         punctuation: /(,)/,
       },
     },

     // TODO: not correctly highlighted
     // - `Baz` in `export class Foo implements Bar, Baz`
     // - `void` in `func: (foo: string) => void = (foo) => {};`
     // - `Foo` in `Foo.bar()` when Foo is a class
   ],

   function: [
     // existing pattern
     Prism.languages.typescript.function,

     // foo: () => Bar;
     {
       pattern: /\b\S+\s*[=]\s*\(.*\).*/,
       inside: Prism.languages.typescript,
     },
   ],

   keyword: [
     // existing pattern
     ...Prism.languages.typescript.keyword,

     // constructor()
     /\b(?:constructor)\b/,
   ],
 });

 Prism.languages.ts = Prism.languages.typescript;
