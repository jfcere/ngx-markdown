# ng2-markdown-to-html

ng2-markdown-to-html is an [Angular 2](https://angular.io/) library that uses [marked](https://github.com/chjj/marked) to parse markdown to html combined with [Prism.js](http://prismjs.com/) for synthax highlights.

## Installation

Use the following command to add ng2-markdown-to-html library to your `package.json` file.

```bash
npm install ng2-markdown-to-html --save
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

You can use `markdown-to-html` component to either parse static markdown directly from your html markup or load the content from a remote url using `src` property.

```html
<!-- static markdown -->
<markdown-to-html>
  # Markdown
</markdown-to-html>

<!-- loaded from remote url -->
<markdown-to-html [src]="'path/to/file.md'"></markdown-to-html>
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
```

## Synthax hightlight

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

## Demo application

A demo application can be found inside the `src/app/demo` directory.

The following commands will clone the repository, install npm dependencies and serve the application.

```bash
git clone https://github.com/jfcere/ng2-markdown-to-html.git

npm install

ng serve
```

Navigate to the demo application @ [http://localhost:4200](http://localhost:4200)

## AoT workaround

Temporarily if you are using AoT compilation you will need to use this workaround as the ng2-markdown-to-html library is currently packaged with source file and is not transpiled to Javascript. Take note that I will work on that shortly to avoid theses modifications.

For now you will need to do the following modifications to `tsconfig.json`:

- Add relative paths to node_modules for angular dependencies
- Exclude `test.ts` file (loading TestBed pull on dependencies that are not needed when serving app)

> **Warning!**
You should copy your `tsconfig.json` and create a new one for AoT compilation like `tsconfig-aot.json` as stated on Angular official website [here](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html#!#compile) othwerwise your tests won't run after excluding `test.ts`

```diff
{
  "compilerOptions": {
    "baseUrl": "",
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": ["es2015", "dom"],
    "mapRoot": "./",
    "module": "es2015",
    "moduleResolution": "node",
    "outDir": "../dist/out-tsc",
    "sourceMap": true,
    "target": "es5",
    "typeRoots": [
      "../node_modules/@types"
    ],
    "paths": {
+      "@angular/common": ["../node_modules/@angular/common"],
+      "@angular/compiler": ["../node_modules/@angular/compiler"],
+      "@angular/core": ["../node_modules/@angular/core"],
+      "@angular/forms": ["../node_modules/@angular/forms"],
+      "@angular/http": ["../node_modules/@angular/http"],
+      "@angular/platform-browser": ["../node_modules/@angular/platform-browser"],
+      "@angular/platform-browser-dynamic": ["../node_modules/@angular/platform-browser-dynamic"],
+      "@angular/router": ["../node_modules/@angular/router"],
+      "rxjs/Rx": ["../node_modules/rxjs/Rx"],
+      "rxjs/add/operator/toPromise": ["../node_modules/rxjs/add/operator/toPromise"]
    }
  },
  "exclude": [
+    "test.ts"
  ],
  "angularCompilerOptions": {
    "genDir": "aot",
    "skipMetadataEmit" : true
 }
}
```

## Road map

Here is the list of tasks that will be done on this library in a near future ...

- Add Circle-CI integration
- AoT compilation ready (currently needs to use workaround)

## Contribution

Contributions are always welcome, just make sure that ...

- Your code style matches with the rest of the project
- Unit tests pass
- Linter passes

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).