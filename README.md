# ngx-markdown
[![CircleCI](https://circleci.com/gh/jfcere/ngx-markdown/tree/master.svg?style=shield&)](https://circleci.com/gh/jfcere/ngx-markdown/tree/master) [![Coverage Status](https://coveralls.io/repos/github/jfcere/ngx-markdown/badge.svg?branch=master)](https://coveralls.io/github/jfcere/ngx-markdown?branch=master) [![version](https://img.shields.io/npm/v/ngx-markdown.svg?style=flat)](https://www.npmjs.com/package/ngx-markdown) [![npm](https://img.shields.io/npm/l/ngx-markdown.svg)](https://opensource.org/licenses/MIT) [![dependencies Status](https://david-dm.org/jfcere/ngx-markdown/status.svg)](https://david-dm.org/jfcere/ngx-markdown) [![peerDependencies Status](https://david-dm.org/jfcere/ngx-markdown/peer-status.svg)](https://david-dm.org/jfcere/ngx-markdown?type=peer)

ngx-markdown is an [Angular 2+](https://angular.io/) library that uses [marked](https://github.com/chjj/marked) to parse markdown to html combined with [Prism.js](http://prismjs.com/) for synthax highlights.

Demo available @ [jfcere.github.io/ngx-markdown](https://jfcere.github.io/ngx-markdown)

## Installation

Use the following command to add ngx-markdown library to your `package.json` file.

```bash
npm install ngx-markdown --save
```

## Configuration

To activate [Prism.js](http://prismjs.com/) synthax highlight you will need to choose a css theme file from `node_modules/prismjs/themes` directory and add it to your application along with `@types/prismjs` types file.

> Note that you can also find additional themes by browsing the web such as [Prism-Themes](https://github.com/PrismJS/prism-themes) or [Mokokai](https://github.com/Ahrengot/Monokai-theme-for-Prism.js) for example.

If you are using [Angular CLI](https://cli.angular.io/) you can follow the example below...

#### .angular-cli.json

```diff
"styles": [
  "styles.css",
+ "../node_modules/prismjs/themes/prism-okaidia.css"
],
```

#### tsconfig.app.json (for Angular-CLI >= 1.0.0-rc.0)

```diff
"compilerOptions": {
  "types": [
+   "prismjs"
  ]
},
```

## Usage

You must import `MarkdownModule` inside your module to be able to use `markdown` component and/or directive.

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
+ import { MarkdownModule } from 'ngx-markdown';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
+    MarkdownModule.forRoot(),
  ],
  declarations: [HomeComponent],
})
```

ngx-markdown provides one component and one directive to parse your markdown to your web application.

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
- Make Prism highlight optional
- Support Prism.js customizing options (line-numbers, line-height, ...)

## Contribution

Contributions are always welcome, just make sure that ...

- Your code style matches with the rest of the project
- Unit tests pass
- Linter passes

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).