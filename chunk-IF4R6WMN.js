import{a as N,c as Q,d as $}from"./chunk-FPZ3WRTH.js";import{a as z,b as q,c as G,d as K,f as Y,g as X,h as Z,i as J}from"./chunk-2AOCEGWT.js";import"./chunk-LI3L4VBM.js";import{a as V,b as U}from"./chunk-4AFKNOE3.js";import{$b as F,Da as P,Fa as a,Ka as t,La as n,Ma as i,Na as k,Qa as T,R as M,S,Sa as B,T as c,U as b,V as E,aa as _,ab as D,bb as e,eb as g,fb as h,ga as O,gb as x,hb as A,la as o,lb as I,ma as w,ra as j,rc as R,sc as H,tc as W,wc as L}from"./chunk-L73B4PLA.js";var y;(r=>{let u;(f=>(f.Strict="strict",f.Loose="loose",f.Antiscript="antiscript",f.Sandbox="sandbox"))(u=r.SecurityLevel||={});let p;(l=>(l.Base="base",l.Forest="forest",l.Dark="dark",l.Default="default",l.Neutral="neutral"))(p=r.Theme||={});let d;(l=>(l[l.Debug=1]="Debug",l[l.Info=2]="Info",l[l.Warn=3]="Warn",l[l.Error=4]="Error",l[l.Fatal=5]="Fatal"))(d=r.LogLevel||={})})(y||={});function ee(u,p){if(u&1){let d=k();t(0,"button",29),T("click",function(){c(d);let s=B();return b(s.onCopyToClipboard())}),E(),t(1,"svg",30),i(2,"path",31),n()()}}var v=class u{constructor(p,d){this.elementRef=p;this.snackbar=d;this.clipboardButton=$;this.emojiMarkdown="# I :heart: ngx-markdown";this.katexMarkdown="#### `katex` directive example\n\n```latex\nf(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi\n```\n\n$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$";this.mermaidMarkdown="```mermaid\ngraph TD;\n  A-->B;\n  A-->C;\n  B-->D;\n  C-->D;\n```";this.mermaidOptions={fontFamily:"inherit",theme:y.Theme.Dark}}ngOnInit(){this.setHeadings()}onCopyToClipboard(){this.snackbar.open("Copied to clipboard via ng-template!",void 0,{duration:3e3,horizontalPosition:"right",verticalPosition:"bottom"})}setHeadings(){let p=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(d=>p.push(d)),this.headings=p}static{this.\u0275fac=function(d){return new(d||u)(w(_),w(Q))}}static{this.\u0275cmp=j({type:u,selectors:[["app-plugins"]],features:[A([N({clipboardOptions:{provide:F,useValue:{}},sanitize:O.NONE})])],decls:153,vars:34,consts:[["buttonTemplate",""],[3,"headings"],["id","emoji"],[3,"src"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["appearance","fill","color","accent","fxFlex.gt-sm","calc(50% - 8px)"],["matInput","",3,"ngModelChange","ngModel"],["emoji","","fxFlex.gt-sm","calc(50% - 8px)",3,"data"],["emoji",""],["id","line-numbers"],["lineNumbers",""],["lineNumbers","",3,"start"],["id","line-highlight"],["lineHighlight","",3,"line","lineOffset"],["id","command-line"],["commandLine","",3,"user","host","src"],["commandLine","",3,"user","host","output","src"],["commandLine","",3,"prompt","output","src"],["commandLine","",3,"prompt","filterOutput","src"],["id","katex"],["katex","","fxFlex.gt-sm","calc(50% - 8px)",3,"data"],["id","mermaid"],["mermaid","","fxFlex.gt-sm","calc(50% - 8px)",3,"data","mermaidOptions"],["id","clipboard"],["clipboard",""],["clipboard","",1,"btn-clipboard-toolbar"],["clipboard","",1,"btn-clipboard-default"],["clipboard","",3,"clipboardButtonComponent"],["clipboard","",3,"clipboardButtonTemplate"],[1,"btn-clipboard",3,"click"],["viewBox","0 0 24 24",2,"width","16px","height","16px"],["fill","#fff","d","M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z"]],template:function(d,r){if(d&1){let s=k();t(0,"app-scrollspy-nav-layout",1)(1,"h1"),e(2,"Plugins"),n(),t(3,"markdown"),e(4," Before to use any plugin, make sure you've installed the required libraries by following the [installation](/get-started#installation) section of the __Get Started__ page. "),n(),t(5,"section")(6,"h2",2),e(7,"Emoji plugin"),n(),t(8,"markdown"),e(9,`
      #### Emoji-Toolkit file to include
      \`\`\`javascript
      node_modules/emoji-toolkit/lib/js/joypixels.min.js
      \`\`\`

      #### Directive
      \`emoji\` - activate emoji plugin

      ### Example
    `),n(),t(10,"markdown"),e(11," Using `emoji` input property on `markdown` component, directive or pipe allows you to convert shortnames to native unicode emojis. "),n(),i(12,"markdown",3),t(13,"markdown"),e(14," The example below illustrate `emoji` directive in action. "),n(),t(15,"div",4)(16,"mat-form-field",5)(17,"textarea",6),x("ngModelChange",function(m){return c(s),h(r.emojiMarkdown,m)||(r.emojiMarkdown=m),b(m)}),n()(),i(18,"markdown",7),n(),t(19,"markdown",8),e(20," > :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_. "),n()(),t(21,"section")(22,"h2",9),e(23,"Line Numbers plugin"),n(),t(24,"markdown"),e(25,`
      #### Prism files to include
      \`\`\`javascript
      node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css
      node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js
      \`\`\`

      #### Directive
      \`lineNumbers\` - activate line numbers plugin

      #### Attributes
      \`start\` - offset number for the first display line

      ### Example
    `),n(),t(26,"markdown"),e(27," Using `lineNumbers` input property on `markdown` component, directive or pipe allows you to add line number at the beginning of each lines of code block. "),n(),i(28,"markdown",3),t(29,"markdown"),e(30," The example below uses `lineNumbers` directive which uses default line offset of 1. "),n(),t(31,"markdown",10),e(32,`
      \`\`\`javascript
      var result = square(2);

      function square(number) {
        return number * number;
      }
      \`\`\`
    `),n(),t(33,"markdown"),e(34," Optionally you can use `start` to specify the offset number for the first display line. "),n(),t(35,"markdown"),e(36," In the example below line offset is set to 5 using `start` input property. "),n(),t(37,"markdown",11),e(38,`
      \`\`\`javascript
      var result = root(2);

      function root(x, n) {
        try {
          var negate = n % 2 == 1 && x < 0;
          if (negate)
            x = -x;
          var possible = Math.pow(x, 1 / n);
          n = Math.pow(possible, n);
          if (Math.abs(x - n) < 1 && (x > 0 == n > 0))
            return negate ? -possible : possible;
        } catch (e) { }
      }
      \`\`\`
    `),n()(),t(39,"section")(40,"h2",12),e(41,"Line Highlight plugin"),n(),t(42,"markdown"),e(43,`
      #### Prism files to include
      \`\`\`javascript
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js
      \`\`\`

      #### Directive
      \`lineHighlight\` - activate line highlight plugin

      #### Attributes
      \`line\` - lines to highlight (i.e.: 6, 11-15)`),i(44,"br"),e(45,"\n      `lineOffset` - starting offset for line numbers"),i(46,"br"),e(47,`

      ### Example
    `),n(),t(48,"markdown"),e(49,"\n      You can highlight different lines by adding `lineHighlight` directive on the `markdown` component/directive.\n\n      Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to specify the starting line of code your snippet represents.\n    "),n(),i(50,"markdown",3),t(51,"markdown"),e(52," In the example below `line` 6 and 10 to 16 are highlight using a `lineOffset` of 5. "),n(),t(53,"markdown",13),e(54,`
      \`\`\`javascript
      var result = root(2);

      function root(x, n) {
        try {
          var negate = n % 2 == 1 && x < 0;
          if (negate)
            x = -x;
          var possible = Math.pow(x, 1 / n);
          n = Math.pow(possible, n);
          if (Math.abs(x - n) < 1 && (x > 0 == n > 0))
            return negate ? -possible : possible;
        } catch (e) { }
      }
      \`\`\`
    `),n()(),t(55,"section")(56,"h2",14),e(57,"Command Line plugin"),n(),t(58,"markdown",8),e(59,`
      #### Prism file(s) to include
      \`\`\`javascript
      node_modules/prismjs/plugins/command-line/prism-command-line.css
      node_modules/prismjs/plugins/command-line/prism-command-line.min.js
      \`\`\`

      #### Directive
      \`commandLine\` - activate command-line display

      #### Attributes
      \`host\` - host name`),i(60,"br"),e(61,"\n      `output` - lines to be presented as output (optional)"),i(62,"br"),e(63,"\n      `filterOutput` - prefix to automatically present lines as output (optional)"),i(64,"br"),e(65,"\n      `prompt` - data prompt"),i(66,"br"),e(67,"\n      `user` - user name"),i(68,"br"),e(69,`

      ### Example
    `),n(),t(70,"markdown"),e(71,`
      Root user without output

      \`\`\`html
      <markdown
        commandLine
        [user]="'root'"
        [host]="'localhost'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),n(),i(72,"markdown",15),t(73,"markdown"),e(74,`
      Non-Root User With Output

      \`\`\`html
      <markdown
        commandLine
        [user]="'chris'"
        [host]="'remotehost'"
        [output]="'2, 4-8'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),n(),i(75,"markdown",16),t(76,"markdown"),e(77,`
      Windows PowerShell With Output

      \`\`\`html
      <markdown
        commandLine
        [prompt]="'PS C:\\Users\\Chris>'"
        [output]="'2-19'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),n(),i(78,"markdown",17),t(79,"markdown"),e(80,`
      Windows PowerShell With Filter Output

      \`\`\`html
      <markdown
        commandLine
        [prompt]="'PS C:\\Users\\Chris>'"
        [filterOutput]="'(out)'">
        \`\`\`powershell
        Get-Date
        (out)
        (out)Sunday, November 7, 2021 8:19:21 PM
        (out)
        \`\u200B\`\`
      </markdown>
      \`\`\`
    `),n(),i(81,"markdown",18),n(),t(82,"section")(83,"h2",19),e(84,"KaTeX plugin"),n(),t(85,"markdown"),e(86,`
      #### KaTeX files to include
      \`\`\`javascript
      node_modules/katex/dist/katex.min.css
      node_modules/katex/dist/katex.min.js
      node_modules/katex/dist/contrib/auto-render.min.js
      \`\`\`

      #### Directive
      \`katex\` - activate KaTeX plugin

      #### Attributes
      \`katexOptions\` - combine [KaTeX options](https://katex.org/docs/options.html) and [Auto-Renderer options](https://katex.org/docs/autorender.html#api)`),i(87,"br"),e(88,`

      ### Example
    `),n(),t(89,"markdown"),e(90," You can render KaTex expression by adding `katex` directive on the `markdown` component/directive. "),n(),i(91,"markdown",3),t(92,"markdown"),e(93," The example below illustrate `katex` directive in action. "),n(),t(94,"div",4)(95,"mat-form-field",5)(96,"textarea",6),x("ngModelChange",function(m){return c(s),h(r.katexMarkdown,m)||(r.katexMarkdown=m),b(m)}),n()(),i(97,"markdown",20),n(),t(98,"markdown"),e(99,`
      Optionally, you can specify both [KaTeX options](https://katex.org/docs/options.html) and [Auto-Renderer options](https://katex.org/docs/autorender.html#api) using \`katexOptions\` property.

      **example.component.ts**
      \`\`\`typescript
      import { KatexOptions } from 'ngx-markdown';

      public options: KatexOptions = {
        displayMode: true,
        throwOnError: false,
        errorColor: '#cc0000',
        delimiters: [...],
        ...
      };
      \`\`\`

      **example.component.html**
    `),n(),i(100,"markdown",3),n(),t(101,"section")(102,"h2",21),e(103,"Mermaid plugin"),n(),t(104,"markdown"),e(105,"\n      #### Mermaid file to include\n      ```javascript\n      node_modules/mermaid/dist/mermaid.min.js\n      ```\n\n      #### Directive\n      `mermaid` - activate mermaid plugin\n\n      #### Attributes\n      `mermaidOptions` - mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties)"),i(106,"br"),e(107,`

      ### Example
    `),n(),t(108,"markdown"),e(109," Using `mermaid` input property on `markdown` component, directive or pipe allows you to use [mermaid](https://mermaid-js.github.io/) syntax to generate diagrams and flowcharts. "),n(),i(110,"markdown",3),t(111,"markdown"),e(112," The example below illustrate `mermaid` directive in action. "),n(),t(113,"div",4)(114,"mat-form-field",5)(115,"textarea",6),x("ngModelChange",function(m){return c(s),h(r.mermaidMarkdown,m)||(r.mermaidMarkdown=m),b(m)}),n()(),i(116,"markdown",22),n(),t(117,"markdown"),e(118,`
      Optionally, you can specify mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) using \`mermaidOptions\` property.

      **example.component.ts**
      \`\`\`typescript
      import { MermaidAPI } from 'ngx-markdown';

      public options: MermaidAPI.Config = {
        fontFamily: '"trebuchet ms", verdana, arial, sans-serif',
        logLevel: MermaidAPI.LogLevel.Info,
        theme: MermaidAPI.Theme.Dark,
        ...
      };
      \`\`\`

      **example.component.html**
    `),n(),i(119,"markdown",3),t(120,"markdown",8),e(121," > :blue_book: You can refer to this [Mermaid](https://mermaid-js.github.io/) documentation for complete usage syntax. "),n()(),t(122,"section")(123,"h2",23),e(124,"Clipboard plugin"),n(),t(125,"markdown"),e(126,"\n      #### Clipboard file(s) to include\n\n      ```javascript\n      node_modules/clipboard/dist/clipboard.min.js\n      ```\n\n      #### Directive\n      `clipboard` - activate copy-to-clipboard plugin\n\n      #### Attributes\n      `clipboardButtonComponent` - component `Type<any>` to use as copy-to-clipboard button"),i(127,"br"),e(128,"\n      `clipboardButtonTemplate` - template reference `TemplateRef<T>` to use as copy-to-clipboard button"),i(129,"br"),e(130,`

      #### CSS Selectors
      \`markdown-clipboard-toolbar\` - toolbar wrapper`),i(131,"br"),e(132,"\n      `markdown-clipboard-toolbar.hover` - toolbar wrapper during mouse hover"),i(133,"br"),e(134,"\n      `markdown-clipboard-button` - default button"),i(135,"br"),e(136,'\n      `markdown-clipboard-button.copied` - default button during "copied" state'),i(137,"br"),e(138,`

      ### Example
    `),n(),t(139,"markdown",24),e(140,"\n      #### Default button\n\n      The `clipboard` plugin provide an unstyled default button with a default behavior out of the box if no alternative is used.\n\n      ```javascript\n      const example = 'the default clipboard button with default behavior';\n      ```\n    "),n(),t(141,"markdown",25),e(142,`
      #### Customize toolbar

      The clipboard button is placed inside a wrapper element that can be customize using the \`.markdown-clipboard-toolbar\` CSS selector in your global \`styles.css/scss\` file.

      This allows to override the default positionning of the clipboard button and play with the visibility of the button using the \`.hover\` CSS selector that is applied on the toolbar when the mouse cursor enters and leaves the code block element.

      \`\`\`css
      .markdown-clipboard-toolbar {
        top: 16px;
        right: 16px;
        opacity: 0;
        transition: opacity 250ms ease-out;
      }

      .markdown-clipboard-toolbar.hover {
        opacity: 1;
      }
      \`\`\`
    `),n(),t(143,"markdown",26),e(144,`
      #### Customize default button

      The default button can be customized using the \`.markdown-clipboard-button\` CSS selector in your global \`styles.css/scss\` file. You can also customized the "copied" state happening after the button is clicked using the \`.copied\` CSS selector.

      \`\`\`css
      .markdown-clipboard-button {
        background-color: rgba(255, 255, 255, 0.07);
        border: none;
        border-radius: 4px;
        color: #ffffff;
        cursor: pointer;
        font-size: 11px;
        padding: 4px 0;
        width: 50px;
        transition: all 250ms ease-out;
      }

      .markdown-clipboard-button:hover {
        background-color: rgba(255, 255, 255, 0.14);
      }

      .markdown-clipboard-button:active {
        transform: scale(0.95);
      }

      .markdown-clipboard-button.copied {
        background-color: rgba(0, 255, 0, 0.1);
        color: #00ff00;
      }
      \`\`\`
    `),n(),t(145,"markdown",27),e(146,`
      #### Using global configuration

      You can provide a custom component to use globaly across your application with the \`clipboardOptions\` in the \`MarkdownModuleConfig\` either with \`provideMarkdown\` provide-function for standalone components or \`MarkdownModule.forRoot()\` for module configuration.

      \`\`\`typescript
      // using the \`provideMarkdown\` function
      provideMarkdown({
        clipboardOptions: {
          provide: CLIPBOARD_OPTIONS,
          useValue: {
            buttonComponent: ClipboardButtonComponent,
          },
        },
      })

      // using \`MarkdownModule\` import
      MarkdownModule.forRoot({
        clipboardOptions: {
          provide: CLIPBOARD_OPTIONS,
          useValue: {
            buttonComponent: ClipboardButtonComponent,
          },
        },
      }),
      \`\`\`
    `),n(),t(147,"markdown",27),S(),e(148,`
      #### Using a component

      You can also provide your custom component using the \`clipboardButtonComponent\` input property when using the \`clipboard\` directive.

      \`\`\`typescript
      import { Component } from '@angular/core';

      @Component({
        selector: 'app-clipboard-button',
        template: \`<button (click)="onClick()">Copy</button>\`,
      })
      export class ClipboardButtonComponent {
        onClick() {
          alert('Copied to clipboard!');
        }
      }
      \`\`\`

      \`\`\`typescript
      import { ClipboardButtonComponent } from './clipboard-button-component';

      @Component({ ... })
      export class ExampleComponent {
        readonly clipboardButton = ClipboardButtonComponent;
      }
      \`\`\`

      \`\`\`html
      <markdown clipboard [clipboardButtonComponent]="clipboardButton"></markdown>
      \`\`\`
    `),M(),n(),P(149,ee,3,0,"ng-template",null,0,I),t(151,"markdown",28),e(152,'\n      #### Using ng-template\n\n      Alternatively, the `clipboard` directive can be used in conjonction with `ng-template` to provide a custom button implementation via the `clipboardButtonTemplate` input property on the `markdown` component.\n\n      ```html\n      <ng-template #buttonTemplate>\n        <button (click)="onCopyToClipboard()">...</button>\n      </ng-template>\n\n      <markdown clipboard [clipboardButtonTemplate]="buttonTemplate"></markdown>\n      ```\n    '),n()()()}if(d&2){let s=D(150);a("headings",r.headings),o(12),a("src","app/plugins/remote/emoji.html"),o(5),g("ngModel",r.emojiMarkdown),o(),a("data",r.emojiMarkdown),o(10),a("src","app/plugins/remote/line-numbers.html"),o(9),a("start",5),o(13),a("src","app/plugins/remote/line-highlight.html"),o(3),a("line","6, 10-16")("lineOffset",5),o(19),a("user","root")("host","localhost")("src","app/plugins/remote/root-user-without-output.bash"),o(3),a("user","chris")("host","remotehost")("output","2, 4-8")("src","app/plugins/remote/non-root-user-with-output.bash"),o(3),a("prompt","PS C:UsersChris>")("output","2-19")("src","app/plugins/remote/windows-powershell-with-output.powershell"),o(3),a("prompt","PS C:UsersChris>")("filterOutput","(out)")("src","app/plugins/remote/windows-powershell-with-filter-output.powershell"),o(10),a("src","app/plugins/remote/katex.html"),o(5),g("ngModel",r.katexMarkdown),o(),a("data",r.katexMarkdown),o(3),a("src","app/plugins/remote/katex-options.html"),o(10),a("src","app/plugins/remote/mermaid.html"),o(5),g("ngModel",r.mermaidMarkdown),o(),a("data",r.mermaidMarkdown)("mermaidOptions",r.mermaidOptions),o(3),a("src","app/plugins/remote/mermaid-options.html"),o(26),a("clipboardButtonComponent",r.clipboardButton),o(2),a("clipboardButtonComponent",r.clipboardButton),o(4),a("clipboardButtonTemplate",s)}},dependencies:[L,R,H,W,K,z,q,G,V,X,Y,J,Z,U],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:180px}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar{top:16px;right:16px;opacity:0;transition:opacity .25s ease-out}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar.hover{opacity:1}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Google Sans,Helvetica,sans-serif;font-size:11px;padding:4px 0;width:50px;transition:all .25s ease-out}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00ff001a;color:#0f0}.btn-clipboard[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#1e1e1e;border:1px solid #666666;border-radius:4px;padding:6px;cursor:pointer;transition:all .2s ease-out}.btn-clipboard[_ngcontent-%COMP%]:active, .btn-clipboard[_ngcontent-%COMP%]:hover{border-color:#888}.btn-clipboard[_ngcontent-%COMP%]:active{background-color:#3e3e3e;transform:scale(.95)}"],changeDetection:0})}};export{v as default};
