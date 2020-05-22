/**
 * Prism language extension
 * https://prismjs.com/extending.html
 */

declare var Prism: any;

Prism.languages.typescript = Prism.languages.extend('typescript', {
  'class-name': [
    // existing patterns
    ...Prism.languages.typescript['class-name'],
    // constructor(private foo:Foo, bar: Bar) { }
    { pattern: /(?<=constructor\(.*:)(.*?)(?=[,)])/ },
    // function foo(): Foo {
    // func = bar(): Bar => {
    { pattern: /(?<=\(\):)(.*?)(?=[={])/ },
    // foo: Foo = {
    // { pattern: /(?<=:)(.*?)(?=\=)/ },
  ],
});
