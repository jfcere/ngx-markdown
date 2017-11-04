# ngx-markdown
[![CircleCI](https://circleci.com/gh/jfcere/ngx-markdown/tree/master.svg?style=shield&)](https://circleci.com/gh/jfcere/ngx-markdown/tree/master) [![Coverage Status](https://coveralls.io/repos/github/jfcere/ngx-markdown/badge.svg?branch=master)](https://coveralls.io/github/jfcere/ngx-markdown?branch=master) [![version](https://img.shields.io/npm/v/ngx-markdown.svg?style=flat)](https://www.npmjs.com/package/ngx-markdown) [![npm](https://img.shields.io/npm/l/ngx-markdown.svg)](https://opensource.org/licenses/MIT) [![dependencies Status](https://david-dm.org/jfcere/ngx-markdown/status.svg)](https://david-dm.org/jfcere/ngx-markdown) [![peerDependencies Status](https://david-dm.org/jfcere/ngx-markdown/peer-status.svg)](https://david-dm.org/jfcere/ngx-markdown?type=peer)

> **v1.4.0** Repository has been renamed from `ng2-markdown-to-html` to `ngx-markdown`. Follow [v1.4.0 release notes](https://github.com/jfcere/ngx-markdown/releases/tag/v1.4.0) for quick required changes.

ngx-markdown is an [Angular 2+](https://angular.io/) library that uses [markdown-it](https://github.com/markdown-it/markdown-it) to parse markdown to html combined with [Prism.js](http://prismjs.com/) for synthax highlights.

Demo available @ [jfcere.github.io/ngx-markdown](https://jfcere.github.io/ngx-markdown)

### Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Synthax highlight](#synthax-highlight)
- [Demo application](#demo-application)
- [AoT compilation](#aot-compilation)
- [Road map](#road-map)
- [Contribution](#contribution)

## Installation

### ngx-markdown

Use the following command to add ngx-markdown library to your `package.json` file.

To add ngx-markdown library to your `package.json` file use the following command

```bash
npm install ngx-markdown --save
```

As the library is using [markdown-it]() parser you will need to add `../node_modules/markdown-it/dist/markdown-it.min.js` to your application.

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `.angular-cli.json` example below...

```diff
"scripts": [
+ "../node_modules/markdown-it/dist/markdown-it.min.js"
]
```

### Synthax highlight

To add [Prism.js](http://prismjs.com/) synthax highlight to your `package.json` use the following command

> Synthax highlight is **optional**, skip this step if you are not planning to use it

```bash
npm install prismjs --save
```

To activate [Prism.js](http://prismjs.com/) synthax highlight you will need include...
- prism.js core library - `node_modules/prismjs/prism.js` file
- a highlight css theme - from `node_modules/prismjs/themes` directory
- desired code language synthax files - from `node_modules/prismjs/components` directory

> Additional themes can be found by browsing the web such as [Prism-Themes](https://github.com/PrismJS/prism-themes) or [Mokokai](https://github.com/Ahrengot/Monokai-theme-for-Prism.js) for example.

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `.angular-cli.json` example below...

```diff
"styles": [
  "styles.css",
+ "../node_modules/prismjs/themes/prism-okaidia.css"
],
"scripts": [
+ "../node_modules/prismjs/prism.js",
+ "../node_modules/prismjs/components/prism-csharp.min.js", # c-sharp language synthax
+ "../node_modules/prismjs/components/prism-css.min.js" # css language synthax
]
```

## Usage

You must import `MarkdownModule` inside your module to be able to use `markdown` component and/or directive.

```diff
import { NgModule } from '@angular/core';
+ import { MarkdownModule } from 'ngx-markdown';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
+   MarkdownModule.forRoot(),
  ],
  declarations: [HomeComponent],
})
```

Optionaly, markdown parsing can be customized by passing [markdown-it](https://markdown-it.github.io/markdown-it/#MarkdownIt.new) preset and/or options to the `forRoot` method of `MarkdownModule`.

```typescript
// using default options
MarkdownModule.forRoot(),

// using preset
MarkdownModule.forRoot({ preset: 'commonmark' }),

// using options
MarkdownModule.forRoot({
  options: {
    html: true,
    linkify: true,
    typographer: true,
  }
}),

// combining preset and options
MarkdownModule.forRoot({
  preset: 'zero',
  options: {
    html: true,
    linkify: true,
    typographer: true,
  }
}),
```

### Component

You can use `markdown` component to either parse static markdown directly from your html markup, load the content from a remote url using `src` property or bind a variable to your component using `data` property.

```html
<!-- static markdown -->
<markdown>
  # Markdown
</markdown>

<!-- loaded from remote url -->
<markdown [src]="'path/to/file.md'"></markdown>

<!-- variable binding -->
<markdown [data]="markdown"></markdown>
```

### Directive

The same way the component works, you can use `markdown` directive to accomplish the same thing.

```html
<!-- static markdown -->
<div markdown>
  # Markdown
</div>

<!-- loaded from remote url -->
<div markdown [src]="'path/to/file.md'"></div>

<!-- variable binding -->
<div markdown [data]="markdown"></div>
```

## Synthax highlight

When using static markdown you are responsible to provide the code block with related language.

```diff
<markdown>
+  ```typescript
    const myProp: string = 'value';
+  ```
</markdown>
```

When using remote url ngx-markdown will use file extension to automatically resolve the code language.

```html
<!-- will use html highlights -->
<markdown [src]="'path/to/file.html'"></markdown>

<!-- will use php highlights -->
<markdown [src]="'path/to/file.php'"></markdown>
```

When using variable binding you can optionally use `language` pipe to specify the language of the variable content (default value is markdown when pipe is not used).

```html
<markdown [data]="markdown | language : 'typescript'"></markdown>
```

## Demo application

A demo is available @ [https://jfcere.github.io/ngx-markdown](https://jfcere.github.io/ngx-markdown) and it source code can be found inside the `src/app/markdown-demo` directory.

The following commands will clone the repository, install npm dependencies and serve the application @ [http://localhost:4200](http://localhost:4200)

```bash
git clone https://github.com/jfcere/ngx-markdown.git
npm install
ng serve
```

## AoT compilation

Building with AoT is part of the CI and is tested every time a commit occurs so you don't have to worry at all.

## Road map

Here is the list of tasks that will be done on this library in a near future ...

- ~~Add CircleCI integration~~
- ~~Publish demo on github pages~~
- ~~Add variable binding feature~~
- ~~Transpile library to Javascript~~
- ~~Replace marked parser~~
- ~~Make Prism highlight optional~~
- Support Prism.js customizing options (line-numbers, line-height, ...)

## Contribution

Contributions are always welcome, just make sure that ...

- Your code style matches with the rest of the project
- Unit tests pass
- Linter passes

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).