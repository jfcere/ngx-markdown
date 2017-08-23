# ng2-markdown-to-html
[![CircleCI](https://circleci.com/gh/jfcere/ng2-markdown-to-html/tree/master.svg?style=shield&)](https://circleci.com/gh/jfcere/ng2-markdown-to-html/tree/master) [![Coverage Status](https://coveralls.io/repos/github/jfcere/ng2-markdown-to-html/badge.svg?branch=master)](https://coveralls.io/github/jfcere/ng2-markdown-to-html?branch=master) [![version](https://img.shields.io/npm/v/ng2-markdown-to-html.svg?style=flat)](https://www.npmjs.com/package/ng2-markdown-to-html) [![npm](https://img.shields.io/npm/l/ng2-markdown-to-html.svg)](https://opensource.org/licenses/MIT) [![dependencies Status](https://david-dm.org/jfcere/ng2-markdown-to-html/status.svg)](https://david-dm.org/jfcere/ng2-markdown-to-html) [![peerDependencies Status](https://david-dm.org/jfcere/ng2-markdown-to-html/peer-status.svg)](https://david-dm.org/jfcere/ng2-markdown-to-html?type=peer)

ng2-markdown-to-html is an [Angular 2+](https://angular.io/) library that uses [marked](https://github.com/chjj/marked) to parse markdown to html combined with [Prism.js](http://prismjs.com/) for synthax highlights.

Demo available @ [jfcere.github.io/ng2-markdown-to-html](https://jfcere.github.io/ng2-markdown-to-html)

## Installation

Use the following command to add ng2-markdown-to-html library to your `package.json` file.

```bash
npm install ng2-markdown-to-html --save
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

You must import `MarkdownToHtmlModule` inside your module to be able to use `markdown-to-html` component and/or directive.

```diff
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
+ import { MarkdownToHtmlModule } from 'ng2-markdown-to-html';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
+    MarkdownToHtmlModule.forRoot(),
  ],
  declarations: [HomeComponent],
})
```

ng2-markdown-to-html provides one component and one directive to parse your markdown to your web application.

### Component

You can use `markdown-to-html` component to either parse static markdown directly from your html markup, load the content from a remote url using `src` property or bind a variable to your component using `data` property.

```html
<!-- static markdown -->
<markdown-to-html>
  # Markdown
</markdown-to-html>

<!-- loaded from remote url -->
<markdown-to-html [src]="'path/to/file.md'"></markdown-to-html>

<!-- variable binding -->
<markdown-to-html [data]="markdown"></markdown-to-html>
```

### Directive

The same way the component works, you can use `markdown-to-html` directive to accomplish the same thing.

```html
<!-- static markdown -->
<div markdown-to-html>
  # Markdown
</div>

<!-- loaded from remote url -->
<div markdown-to-html [src]="'path/to/file.md'"></div>

<!-- variable binding -->
<div markdown-to-html [data]="markdown"></div>
```

## Synthax highlight

When using static markdown you are responsible to provide the code block with related language.

```diff
<markdown-to-html>
+  ```typescript
    const myProp: string = 'value';
+  ```
</markdown-to-html>
```

When using remote url ng2-markdown-to-html will use file extension to automatically resolve the code language.

```html
<!-- will use html highlights -->
<markdown-to-html [src]="'path/to/file.html'"></markdown-to-html>

<!-- will use php highlights -->
<markdown-to-html [src]="'path/to/file.php'"></markdown-to-html>
```

When using variable binding you can optionally use `language` pipe to specify the language of the variable content (default value is markdown when pipe is not used).

```html
<markdown-to-html [data]="markdown | language : 'typescript'"></markdown-to-html>
```

## Demo application

A demo is available @ [https://jfcere.github.io/ng2-markdown-to-html](https://jfcere.github.io/ng2-markdown-to-html) and it source code can be found inside the `src/app/markdown-demo` directory.

The following commands will clone the repository, install npm dependencies and serve the application @ [http://localhost:4200](http://localhost:4200)

```bash
git clone https://github.com/jfcere/ng2-markdown-to-html.git
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