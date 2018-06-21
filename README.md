# ngx-markdown
[![CircleCI](https://circleci.com/gh/jfcere/ngx-markdown/tree/master.svg?style=shield&)](https://circleci.com/gh/jfcere/ngx-markdown/tree/master) [![Coverage Status](https://coveralls.io/repos/github/jfcere/ngx-markdown/badge.svg?branch=master)](https://coveralls.io/github/jfcere/ngx-markdown?branch=master) [![version](https://img.shields.io/npm/v/ngx-markdown.svg?style=flat)](https://www.npmjs.com/package/ngx-markdown) [![npm](https://img.shields.io/npm/l/ngx-markdown.svg)](https://opensource.org/licenses/MIT) [![dependencies Status](https://david-dm.org/jfcere/ngx-markdown/status.svg?path=lib)](https://david-dm.org/jfcere/ngx-markdown?path=lib) [![peerDependencies Status](https://david-dm.org/jfcere/ngx-markdown/peer-status.svg?path=lib)](https://david-dm.org/jfcere/ngx-markdown?path=lib&type=peer) [![monthly Downloads](https://img.shields.io/npm/dm/ngx-markdown.svg)](https://www.npmjs.com/package/ngx-markdown)

> **v1.6.0 and up** are using **Angular 6**  and now uses `HttpClient` instead of `Http` service.  
*Please use a previous version of the package if you are using an older version of Angular.*

ngx-markdown is an [Angular](https://angular.io/) library that uses [marked](https://github.com/chjj/marked) to parse markdown to html combined with [Prism.js](http://prismjs.com/) for syntax highlight.

- Demo available @ [https://jfcere.github.io/ngx-markdown](https://jfcere.github.io/ngx-markdown)
- Plunker available @ [https://plnkr.co/edit/y5LPj7?p=preview](https://plnkr.co/edit/y5LPj7?p=preview)

### Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Renderer](#renderer)
- [Syntax highlight](#syntax-highlight)
- [Demo application](#demo-application)
- [AoT compilation](#aot-compilation)
- [Road map](#road-map)
- [Contribution](#contribution)

## Installation

### ngx-markdown

To add ngx-markdown library to your `package.json` use the following command.

```bash
npm install ngx-markdown --save
```

As the library is using [marked](https://github.com/chjj/marked) parser you will need to add `node_modules/marked/lib/marked.js` to your application.

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"scripts": [
+ "node_modules/marked/lib/marked.js"
]
```

### Syntax highlight

> Syntax highlight is **optional**, skip this step if you are not planning to use it

To activate [Prism.js](http://prismjs.com/) syntax highlight you will need to include...
- prism.js core library - `node_modules/prismjs/prism.js` file
- a highlight css theme - from `node_modules/prismjs/themes` directory
- desired code language syntax files - from `node_modules/prismjs/components` directory

_Additional themes can be found by browsing the web such as [Prism-Themes](https://github.com/PrismJS/prism-themes) or [Mokokai](https://github.com/Ahrengot/Monokai-theme-for-Prism.js) for example._

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"styles": [
  "styles.css",
+ "node_modules/prismjs/themes/prism-okaidia.css"
],
"scripts": [
+ "node_modules/prismjs/prism.js",
+ "node_modules/prismjs/components/prism-csharp.min.js", # c-sharp language syntax
+ "node_modules/prismjs/components/prism-css.min.js" # css language syntax
]
```

## Configuration

### Main application module

You must import `MarkdownModule` inside your main application module (usually named AppModule) with `forRoot` to be able to use `markdown` component and/or directive.

```diff
import { NgModule } from '@angular/core';
+ import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
+   MarkdownModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

If you want to use the `[src]` attribute to directly load a remote file, in order to keep only one instance of `HttpClient` and avoid issues with interceptors, you also have to provide `HttpClient`:

```diff
imports: [
+  HttpClientModule,
+  MarkdownModule.forRoot({ loader: HttpClient }),
],
```

#### MarkedOptions

Optionaly, markdown parsing can be configured by passing [MarkedOptions](https://marked.js.org/#/USING_ADVANCED.md#options) to the `forRoot` method of `MarkdownModule`.

Imports:
```typescript
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
```

Default options:
```typescript
// using default options
MarkdownModule.forRoot(),
```

Custom options and passing `HttpClient` to use `[src]` attribute:
```typescript
// using specific options with ValueProvider and passing HttpClient
MarkdownModule.forRoot({
  loader: HttpClient, // optional, only if you use [src] attribute
  markedOptions: {
    provide: MarkedOptions,
    useValue: {
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    },
  },
}),
```

#### MarkedOptions.renderer

`MarkedOptions` also exposes the `renderer` property which allows you to override token rendering for your whole application.

The example below overrides the default blockquote token rendering by adding a CSS class for custom styling when using Bootstrap CSS:

```typescript
import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';

// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.blockquote = (text: string) => {
    return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
  };

  return {
    renderer: renderer,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
  };
}

// using specific option with FactoryProvider
MarkdownModule.forRoot({
  loader: HttpClient,
  markedOptions: {
    provide: MarkedOptions,
    useFactory: markedOptionsFactory,
  },
}),
```

### Other application modules

Use `forChild` when importing `MarkdownModule` into other application modules to allow you to use the same parser configuration accross your application.

```diff
import { NgModule } from '@angular/core';
+ import { MarkdownModule } from 'ngx-markdown';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
+   MarkdownModule.forChild(),
  ],
  declarations: [HomeComponent],
})
export class HomeModule { }
```

## Usage

`ngx-markdown` provides different approaches to help you parse markdown to your application depending of your needs.

> As of Angular 6, the template compiler strips whitespace by default. Use `ngPreserveWhitespaces` directive to preserve whitespaces such as newlines in order for the markdown-formatted content to render as intended.  
https://angular.io/api/core/Component#preserveWhitespaces

### Component

You can use `markdown` component to either parse static markdown directly from your html markup, load the content from a remote url using `src` property or bind a variable to your component using `data` property. You can get a hook on load complete using `load` output event property or on loading error using `error` output event property.

```html
<!-- static markdown -->
<markdown ngPreserveWhitespaces>
  # Markdown
</markdown>

<!-- loaded from remote url -->
<markdown [src]="'path/to/file.md'" (load)="onLoad($event)" (error)="onError($event)"></markdown>

<!-- variable binding -->
<markdown [data]="markdown"></markdown>
```

### Directive

The same way the component works, you can use `markdown` directive to accomplish the same thing.

```html
<!-- static markdown -->
<div markdown ngPreserveWhitespaces>
  # Markdown
</div>

<!-- loaded from remote url -->
<div markdown [src]="'path/to/file.md'" (load)="onLoad($event)" (error)="onError($event)"></div>

<!-- variable binding -->
<div markdown [data]="markdown"></div>
```

### Pipe

Using `markdown` pipe to transform markdown to HTML allow you to chain pipe transformations and will update the DOM when value changes.

```html
<!-- chain `language` pipe with `markdown` pipe to convert typescriptMarkdown variable content -->
<div [innerHTML]="typescriptMarkdown | language : 'typescript' | markdown"></div>
```

### Service

You can use `MarkdownService` to have access to markdown parser and syntax highlight methods.

```typescript
import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Component({ ... })
export class ExampleComponent implements OnInit() {
  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
    // outputs: <p>I am using <strong>markdown</strong>.</p>
    console.log(this.markdownService.compile('I am using __markdown__.'));
  }
}
```

## Renderer

Tokens can be render in a custom manner by either...
- providing the `renderer` property with the `MarkedOptions` when importing `MarkdownModule.forRoot()` into your main application module (see [Configuration](#markedoptionsrenderer) section)
- using `MarkdownService` exposed `renderer`

Here is an example of overriding the default heading token rendering through `MarkdownService` by adding an embedded anchor tag like on GitHub:

```typescript
import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-example',
  template: '<markdown># Heading</markdown>',
})
export class ExampleComponent implements OnInit() {
  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
      return '<h' + level + '>' +
               '<a name="' + escapedText + '" class="anchor" href="#' + escapedText + '">' +
                 '<span class="header-link"></span>' +
               '</a>' + text +
             '</h' + level + '>';
    };
  }
}
```

This code will output the following HTML:

```html
<h1>
  <a name="heading" class="anchor" href="#heading">
    <span class="header-link"></span>
  </a>
  Heading
</h1>
```

> Follow official [marked.renderer](https://github.com/chjj/marked#block-level-renderer-methods) documentation for the list of tokens that can be overriden.

## Syntax highlight

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

A demo is available @ [https://jfcere.github.io/ngx-markdown](https://jfcere.github.io/ngx-markdown) and it source code can be found inside the `demo` directory.

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
- ~~Make Prism highlight optional~~
- Support Prism.js customizing options (line-numbers, line-height, ...)

## Contribution

Contributions are always welcome, just make sure that ...

- Your code style matches with the rest of the project
- Unit tests pass
- Linter passes

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
