<p align="center">
  <img alt="Ngx-Markdown Logo" src="https://github.com/jfcere/ngx-markdown/raw/master/demo/src/assets/ngx-markdown.png">
</p>
<p align="center">
  <a href="https://circleci.com/gh/jfcere/ngx-markdown">
    <img alt="CircleCI Status" src="https://circleci.com/gh/jfcere/ngx-markdown/tree/master.svg?style=shield">
  </a>
  <a href="https://coveralls.io/github/jfcere/ngx-markdown?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/jfcere/ngx-markdown/badge.svg?branch=master">
  </a>
  <a href="https://www.npmjs.com/package/ngx-markdown">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/ngx-markdown.svg?style=flat">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img alt="License" src="https://img.shields.io/npm/l/ngx-markdown.svg">
  </a>
  <br>
  <img alt="Dependency Status" src="https://img.shields.io/librariesio/release/npm/ngx-markdown/14.0.1">
  <a href="https://www.npmjs.com/package/ngx-markdown">
    <img alt="Monthly Downloads" src="https://img.shields.io/npm/dm/ngx-markdown.svg">
  </a>
</p>

# ngx-markdown

ngx-markdown is an [Angular](https://angular.io/) library that combines...
- [Marked](http://marked.js.org/) to parse markdown to HTML
- [Prism.js](http://prismjs.com/) for language syntax highlight
- [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) for emoji support
- [KaTeX](https://katex.org/) for math expression rendering
- [Mermaid](https://mermaid-js.github.io/) for diagrams and charts visualization
- [Clipboard.js](https://clipboardjs.com/) to copy code blocks to clipboard

Demo available @ [https://jfcere.github.io/ngx-markdown](https://jfcere.github.io/ngx-markdown)  
StackBlitz available @ [https://stackblitz.com/edit/ngx-markdown](https://stackblitz.com/edit/ngx-markdown)

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
- [Support Development](#support-development)

## Installation

### ngx-markdown

To add ngx-markdown library to your `package.json` use the following command.

```bash
npm install ngx-markdown --save
```

As the library is using [Marked](https://github.com/chjj/marked) parser you will need to add `node_modules/marked/marked.min.js` to your application.

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"scripts": [
+ "node_modules/marked/marked.min.js"
]
```

### Syntax highlight

> :bell: Syntax highlight is **optional**, skip this step if you are not planning to use it

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
  "node_modules/marked/marked.min.js",
+ "node_modules/prismjs/prism.js",
+ "node_modules/prismjs/components/prism-csharp.min.js", # c-sharp language syntax
+ "node_modules/prismjs/components/prism-css.min.js" # css language syntax
]
```

#### Line Numbers plugin

To use the [line numbers plugin](http://prismjs.com/plugins/line-numbers/) that shows line numbers in code blocks, in addition to Prism.js configuration files, you will need to include the following files from `prismjs/plugins/line-numbers` directory to your application:

- CSS styling for line numbers - `prism-line-numbers.css`
- line numbers plugin script - `prism-line-numbers.js`

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"styles": [
  "src/styles.css",
  "node_modules/prismjs/themes/prism-okaidia.css",
+ "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css"
],
"scripts": [
  "node_modules/marked/marked.min.js",
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-csharp.min.js",
  "node_modules/prismjs/components/prism-css.min.js",
+ "node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js"
]
```

Using `markdown` component and/or directive, you will be able to use the `lineNumbers` property to activate the plugin. The property can be used in combination with either `data` for variable binding, `src` for remote content or using transclusion for static markdown.

Additionally, you can use `start` input property to specify the offset number for the first display line.

```html
<markdown
  lineNumbers
  [start]="5"
  [src]="path/to/file.js">
</markdown>
```

#### Line Highlight plugin

To use the [line highlight plugin](http://prismjs.com/plugins/line-highlight/) that highlights specific lines and/or line ranges in code blocks, in addition to Prism.js configuration files, you will need to include the following files from `prismjs/plugins/line-highlight` directory to your application:

- CSS styling for line highlight - `prism-line-highlight.css`
- line highlight plugin script - `prism-line-highlight.js`

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"styles": [
  "src/styles.css",
  "node_modules/prismjs/themes/prism-okaidia.css",
+ "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css"
],
"scripts": [
  "node_modules/marked/marked.min.js",
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-csharp.min.js",
  "node_modules/prismjs/components/prism-css.min.js",
+ "node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js"
]
```

Using `markdown` component and/or directive, you will be able to use the `lineHighlight` property to activate the plugin. The property can be used in combination with either `data` for variable binding, `src` for remote content or using transclusion for static markdown.

Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to specify the starting line of code your snippet represents.

```html
<markdown
  lineHighlight
  [line]="'6, 10-16'"
  [lineOffset]="5"
  [src]="path/to/file.js">
</markdown>
```

#### Command Line Plugin

To use the [command line plugin](https://prismjs.com/plugins/command-line/) that displays a command line with a prompt and, optionally, the output/response from the commands, you will need to include the following files from `prismjs/plugins/command-line` directory to your application:

- CSS styling for command line - `prism-command-line.css`
- command line plugin script - `prism-command-line.js`

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"styles": [
  "src/styles.css",
  "node_modules/prismjs/themes/prism-okaidia.css",
+ "node_modules/prismjs/plugins/command-line/prism-command-line.css"
],
"scripts": [
  "node_modules/marked/marked.min.js",
  "node_modules/prismjs/prism.js",
  "node_modules/prismjs/components/prism-csharp.min.js",
  "node_modules/prismjs/components/prism-css.min.js",
+ "node_modules/prismjs/plugins/command-line/prism-command-line.js"
]
```

Using `markdown` component and/or directive, you will be able to use the `commandLine` property to activate the plugin. The property can be used in combination with either `data` for variable binding, `src` for remote content or using transclusion for static markdown.

For a server command line, specify the user and host names using the `user` and `host` input properties. The resulting prompt displays a `#` for the root user and `$` for all other users. For any other command line, such as a Windows prompt, you may specify the entire prompt using the `prompt` input property.

You may also specify the lines to be presented as output (no prompt and no highlighting) through the `output` property in the following simple format:

- A single number refers to the line with that number
- Ranges are denoted by two numbers, separated with a hyphen (-)
- Multiple line numbers or ranges are separated by commas
- Whitespace is allowed anywhere and will be stripped off

```html
<markdown
  commandLine
  [user]="'chris'"
  [host]="'remotehost'"
  [output]="'2, 4-8'"
  [src]="'path/to/file.bash'">
</markdown>
```

Optionally, to automatically present some lines as output without providing the line numbers, you can prefix those lines with any string and specify the prefix using the `filterOutput` input property. For example, `[filterOutput]="'(out)'"` will treat lines beginning with `(out)` as output and remove the prefix.

```html
<markdown
  commandLine
  [prompt]="'PS C:\Users\Chris>'"
  [filterOutput]="'(out)'">
  ```powershell
  Get-Date
  (out)
  (out)Sunday, November 7, 2021 8:19:21 PM
  (out)
  `​``
</markdown>
```

### Emoji support

> :bell: Emoji support is **optional**, skip this step if you are not planning to use it

To activate [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) for emoji suppport you will need to include...
- Emoji-Toolkit library - `node_modules/emoji-toolkit/lib/js/joypixels.min.js`

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"scripts": [
  "node_modules/marked/marked.min.js",
+ "node_modules/emoji-toolkit/lib/js/joypixels.min.js",
]
```

#### Emoji plugin

Using `markdown` component and/or directive, you will be able to use the `emoji` property to activate [Emoji-Toolkit](https://github.com/joypixels/emoji-toolkit) plugin that converts emoji shortnames such as `:heart:` to native unicode emojis.

```html
<markdown emoji>
  I :heart: ngx-markdown
</markdown>
```

> :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_.

### Math rendering

> :bell: Math rendering is **optional**, skip this step if you are not planning to use it

To activate [KaTeX](https://katex.org/) math rendering you will need to include...
- KaTex JavaScript library - `node_modules/katex/dist/katex.min.js` file
- KaTex Auto-Render extension - `node_modules/katex/dist/contrib/auto-render.min.js,` file
- KaTex CSS customization - `node_modules/katex/dist/katex.min.css` file

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"styles": [
  "styles.css",
+ "node_modules/katex/dist/katex.min.css"
],
"scripts": [
  "node_modules/marked/marked.min.js",
+ "node_modules/katex/dist/katex.min.js",
+ "node_modules/katex/dist/contrib/auto-render.min.js",
]
```

#### KaTeX plugin

Using `markdown` component and/or directive, you will be able to use the `katex` property to activate [KaTeX](https://katex.org/) plugin that renders mathematical expression to HTML.

```html
<markdown
  katex
  [src]="path/to/file.md">
</markdown>
```

Optionally, you can use `katexOptions` property to specify both the [KaTeX options](https://katex.org/docs/options.html) and the [KaTeX Auto-Render options](https://katex.org/docs/autorender.html#api).

```typescript
import { KatexOptions } from 'ngx-markdown';

public options: KatexOptions = {
  displayMode: true,
  throwOnError: false,
  errorColor: '#cc0000',
  delimiters: [...],
  ...
};
```

```html
<markdown
  katex
  [katexOptions]="options"
  [src]="path/to/file.md">
</markdown>
```

> :blue_book: Follow official [KaTeX options](https://katex.org/docs/options.html) and [KaTeX Auto-Render options](https://katex.org/docs/autorender.html#api) documentation for more details on the available options.

### Diagrams tool

> :bell: Diagram support is **optional**, skip this step if you are not planning to use it

To activate [Mermaid](https://mermaid-js.github.io/) diagramming and charting tool you will need to include...
- Mermaid JavaScript library - `node_modules/mermaid/dist/mermaid.min.js` file

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"scripts": [
  "node_modules/marked/marked.min.js",
+ "node_modules/mermaid/dist/mermaid.min.js",
]
```

#### Mermaid plugin

Using `markdown` component and/or directive, you will be able to use the `mermaid` property to activate [Mermaid](https://mermaid-js.github.io/) plugin that renders Markdown-inspired text definitions to create and modify diagrams dynamically.

```html
<markdown
  mermaid
  [src]="path/to/file.md">
</markdown>
```

Optionally, you can specify mermaid [configuration options](https://mermaid-js.github.io/mermaid/#/Setup?id=configuration) using `mermaidOptions` property.

```typescript
import { MermaidAPI } from 'ngx-markdown';

public options: MermaidAPI.Config = {
  fontFamily: '"trebuchet ms", verdana, arial, sans-serif',
  logLevel: MermaidAPI.LogLevel.Info,
  theme: MermaidAPI.Theme.Dark,
  ...
};
```

```html
<markdown
  mermaid
  [mermaidOptions]="options"
  [src]="'path/to/file.md'">
</markdown>
```

> :blue_book: Follow official [Mermaid](https://mermaid-js.github.io/) documentation for more details on diagrams and charts syntax.

### Copy-to-clipboard

> :bell: Copy-to-clipboard support is **optional**, skip this step if you are not planning to use it

To activate [Clipboard](https://clipboardjs.com/) allowing copy-to-clipboard you will need to include...
- Clipboard JavaScript library - `node_modules/clipboard/dist/clipboard.min.js` file

If you are using [Angular CLI](https://cli.angular.io/) you can follow the `angular.json` example below...

```diff
"scripts": [
  "node_modules/marked/marked.min.js",
+ "node_modules/clipboard/dist/clipboard.min.js",
]
```

#### Clipboard plugin

Using `markdown` component and/or directive, you will be able to use the `clipboard` property to activate [Clipboard](https://clipboardjs.com/) plugin that enable copy-to-clipboard for code block from a single click.

```html
<markdown
  clipboard
  [src]="path/to/file.md">
</markdown>
```

#### Default button

The `clipboard` plugin provide an unstyled default button with a default behavior out of the box if no alternative is used.

To customize the default button styling, use the `.markdown-clipboard-button` CSS selector in your global `styles.css/scss` file. You can also customized the "copied" state happening after the button is clicked using the `.copied` CSS selector.

#### Using global configuration

You can provide a custom component to use globaly across your application with the `clipboardOptions` via `MarkdownModule.forRoot()` import configuration.

```typescript
MarkdownModule.forRoot({
  ...
  clipboardOptions: {
    provide: ClipboardOptions,
    useValue: {
      buttonComponent: ClipboardButtonComponent,
    },
  },
}),
```

#### Using a component

You can also provide your custom component using the `clipboardButtonComponent` input property when using the `clipboard` directive.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-clipboard-button',
  template: `<button (click)="onClick()">Copy</button>`,
})
export class ClipboardButtonComponent {
  onClick() {
    alert('Copied to clipboard!');
  }
}
```

```typescript
import { ClipboardButtonComponent } from './clipboard-button-component';

@Component({ ... })
export class ExampleComponent {
  readonly clipboardButton = ClipboardButtonComponent;
}
```

```html
<markdown 
  clipboard 
  [clipboardButtonComponent]="clipboardButton">
</markdown>
```

#### Using ng-template

Alternatively, the `clipboard` directive can be used in conjonction with `ng-template` to provide a custom button implementation via the `clipboardButtonTemplate` input property on the `markdown` component.

```html
<ng-template #buttonTemplate>
  <button (click)="onCopyToClipboard()">...</button>
</ng-template>

<markdown 
  clipboard 
  [clipboardButtonTemplate]="buttonTemplate">
</markdown>
```

> :blue_book: Refer to the ngx-markdown [clipboard plugin demo](https://jfcere.github.io/ngx-markdown/plugins#clipboard) for live examples.

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

#### Sanitization

As of ngx-markdown v9.0.0 **sanitization is enabled by default** and uses Angular `DomSanitizer` with `SecurityContext.HTML` to avoid XSS vulnerabilities. The `SecurityContext` level can be changed using the `sanitize` property when configuring `MarkdownModule`.

```typescript
import { SecurityContext } from '@angular/core';

// enable default sanitization
MarkdownModule.forRoot()

// turn off sanitization
MarkdownModule.forRoot({
  sanitize: SecurityContext.NONE
})
```

> :blue_book: Follow [Angular DomSanitizer](https://angular.io/api/platform-browser/DomSanitizer#sanitize) documentation for more information on sanitization and security contexts.

#### MarkedOptions

Optionally, markdown parsing can be configured by passing [MarkedOptions](https://marked.js.org/#/USING_ADVANCED.md#options) to the `forRoot` method of `MarkdownModule`.

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
      breaks: false,
      pedantic: false,
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
    breaks: false,
    pedantic: false,
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

Use `forChild` when importing `MarkdownModule` into other application modules to allow you to use the same parser configuration across your application.

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

`ngx-markdown` provides different approaches to help you parse markdown to your application depending on your needs.

> :bulb: As of Angular 6, the template compiler strips whitespace by default. Use `ngPreserveWhitespaces` directive to preserve whitespaces such as newlines in order for the markdown-formatted content to render as intended.  
https://angular.io/api/core/Component#preserveWhitespaces

### Component

You can use `markdown` component to either parse static markdown directly from your HTML markup, load the content from a remote URL using `src` property or bind a variable to your component using `data` property. You can get a hook on load complete using `load` output event property, on loading error using `error` output event property or when parsing is completed using `ready` output event property.

```html
<!-- static markdown -->
<markdown ngPreserveWhitespaces>
  # Markdown
</markdown>

<!-- loaded from remote url -->
<markdown
  [src]="'path/to/file.md'"
  (load)="onLoad($event)"
  (error)="onError($event)">
</markdown>

<!-- variable binding -->
<markdown
  [data]="markdown"
  (ready)="onReady()">
</markdown>

<!-- inline parser, omitting rendering top-level paragraph -->
<markdown
  [data]="markdown"
  [inline]="true">
</markdown>
```

### Directive

The same way the component works, you can use `markdown` directive to accomplish the same thing.

```html
<!-- static markdown -->
<div markdown ngPreserveWhitespaces>
  # Markdown
</div>

<!-- loaded from remote url -->
<div markdown
  [src]="'path/to/file.md'"
  (load)="onLoad($event)"
  (error)="onError($event)">
</div>

<!-- variable binding -->
<div markdown
  [data]="markdown"
  (ready)="onReady()">
</div>

<!-- inline parser, omitting rendering top-level paragraph -->
<div markdown
  [data]="markdown"
  [inline]="true">
</div>
```

### Pipe

Using `markdown` pipe to transform markdown to HTML allow you to chain pipe transformations and will update the DOM when value changes.

```html
<!-- chain `language` pipe with `markdown` pipe to convert typescriptMarkdown variable content -->
<div [innerHTML]="typescriptMarkdown | language : 'typescript' | markdown"></div>
```

The `markdown` pipe allow you to use all the same plugins as the component by providing the options parameters.

```html
<!-- provide options parameters to activate plugins or for configuration -->
<div [innerHTML]="typescriptMarkdown | language : 'typescript' | markdown : { emoji: true, inline: true }"></div>
```

This is the `MarkdownPipeOptions` parameters interface, those options are the same as the ones available for the `markdown` component:

```typescript
export interface MarkdownPipeOptions {
  decodeHtml?: boolean;
  inline?: boolean;
  emoji?: boolean;
  katex?: boolean;
  katexOptions?: KatexOptions;
  mermaid?: boolean;
  mermaidOptions?: MermaidAPI.Config;
  markedOptions?: MarkedOptions;
}
```

### Service

You can use `MarkdownService` to have access to markdown parsing, rendering and syntax highlight methods.

```typescript
import { Component, OnInit } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Component({ ... })
export class ExampleComponent implements OnInit {
  constructor(private markdownService: MarkdownService) { }

  ngOnInit() {
    // outputs: <p>I am using <strong>markdown</strong>.</p>
    console.log(this.markdownService.parse('I am using __markdown__.'));
  }
}
```

## Renderer

Tokens can be rendered in a custom manner by either...
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
export class ExampleComponent implements OnInit {
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

> :blue_book: Follow official [marked.renderer](https://marked.js.org/#/USING_PRO.md#renderer) documentation for the list of tokens that can be overriden.

## Re-render Markdown

In some situations, you might need to re-render markdown after making changes. If you've updated the text this would be done automatically, however if the changes are internal to the library such as rendering options, you will need to inform the `MarkdownService` that it needs to update.

To do so, inject the `MarkdownService` and call the `reload()` function as shown below.

```typescript
import { MarkdownService } from 'ngx-markdown';

constructor(
  private markdownService: MarkdownService,
) { }

update() {
  this.markdownService.reload();
}
```

> :blue_book: Refer to the ngx-markdown [re-render demo](https://jfcere.github.io/ngx-markdown/rerender) for a live example.

## Syntax highlight

When using static markdown you are responsible to provide the code block with related language.

```diff
<markdown ngPreserveWhitespaces>
+  ```typescript
    const myProp: string = 'value';
+  ```
</markdown>
```

When using remote URL ngx-markdown will use the file extension to automatically resolve the code language.

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

A demo is available @ [https://jfcere.github.io/ngx-markdown](https://jfcere.github.io/ngx-markdown) and its source code can be found inside the `demo` directory.

The following commands will clone the repository, install npm dependencies and serve the application @ [http://localhost:4200](http://localhost:4200)

```bash
git clone https://github.com/jfcere/ngx-markdown.git
npm install
npm start
```

## AoT compilation

Building with AoT is part of the CI and is tested every time a commit occurs so you don't have to worry at all.

## Road map

Here is the list of tasks that will be done on this library in the near future ...

- Add a FAQ section to the README.md
- Improve flexibily for some options

## Contribution

Contributions are always welcome, just make sure that ...

- Your code style matches with the rest of the project
- Unit tests pass
- Linter passes

## Support Development

The use of this library is totally free and no donation is required.

As the owner and primary maintainer of this project, I am putting a lot of time and effort beside my job, my family and my private time to bring the best support I can by answering questions, addressing issues and improving the library to provide more and more features over time.

If this project has been useful, that it helped you or your business to save precious time, don't hesitate to give it a star and to consider a donation to support its maintenance and future development.

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
