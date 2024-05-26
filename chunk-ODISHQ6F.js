import{b as Z,c as J}from"./chunk-X4C2RXSO.js";import{a as H,b as U,c as K,d as Y,f as z,g as G,h as X,i as q}from"./chunk-RXICN7MS.js";import"./chunk-VE2HCBXU.js";import{a as F,b as R}from"./chunk-FRCDZLEY.js";import{$a as B,Ea as n,Fa as e,Ga as o,Ha as y,Ka as O,Ma as P,O as C,U as S,Ua as T,Ub as V,V as M,Va as t,W as u,X as h,Y as E,Ya as b,Za as f,_a as g,ab as D,ba as _,eb as A,ka as r,kc as I,la as k,lc as L,mc as W,pc as N,xa as j,za as a}from"./chunk-AWIFZR5O.js";var x;(function(m){let s;(function(i){i.Strict="strict",i.Loose="loose",i.Antiscript="antiscript",i.Sandbox="sandbox"})(s=m.SecurityLevel||(m.SecurityLevel={}));let w;(function(i){i.Base="base",i.Forest="forest",i.Dark="dark",i.Default="default",i.Neutral="neutral"})(w=m.Theme||(m.Theme={}));let d;(function(i){i[i.Debug=1]="Debug",i[i.Info=2]="Info",i[i.Warn=3]="Warn",i[i.Error=4]="Error",i[i.Fatal=5]="Fatal"})(d=m.LogLevel||(m.LogLevel={}))})(x||(x={}));function Q(m,s){if(m&1){let w=y();n(0,"button",28),O("click",function(){u(w);let i=P();return h(i.onCopyToClipboard())}),E(),n(1,"svg",29),o(2,"path",30),e()()}}var ue=(()=>{let s=class s{constructor(d,i){this.elementRef=d,this.snackbar=i,this.clipboardButton=J,this.emojiMarkdown="# I :heart: ngx-markdown",this.katexMarkdown="#### `katex` directive example\n\n```latex\nf(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi\n```\n\n$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$",this.mermaidMarkdown="```mermaid\ngraph TD;\n  A-->B;\n  A-->C;\n  B-->D;\n  C-->D;\n```",this.mermaidOptions={fontFamily:"inherit",theme:x.Theme.Dark}}ngOnInit(){this.setHeadings()}onCopyToClipboard(){this.snackbar.open("Copied to clipboard via ng-template!",void 0,{duration:3e3,horizontalPosition:"right",verticalPosition:"bottom"})}setHeadings(){let d=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(i=>d.push(i)),this.headings=d}};s.\u0275fac=function(i){return new(i||s)(k(_),k(Z))},s.\u0275cmp=C({type:s,selectors:[["app-plugins"]],standalone:!0,features:[B([{provide:V,useValue:{}}]),D],decls:137,vars:34,consts:[["buttonTemplate",""],[3,"headings"],["id","emoji"],[3,"src"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["appearance","fill","color","accent","fxFlex.gt-sm","calc(50% - 8px)"],["matInput","",3,"ngModelChange","ngModel"],["emoji","","fxFlex.gt-sm","calc(50% - 8px)",3,"data"],["emoji",""],["id","line-numbers"],["lineNumbers",""],["lineNumbers","",3,"start"],["id","line-highlight"],["lineHighlight","",3,"line","lineOffset"],["id","command-line"],["commandLine","",3,"user","host","src"],["commandLine","",3,"user","host","output","src"],["commandLine","",3,"prompt","output","src"],["commandLine","",3,"prompt","filterOutput","src"],["id","katex"],["katex","","fxFlex.gt-sm","calc(50% - 8px)",3,"data"],["id","mermaid"],["mermaid","","fxFlex.gt-sm","calc(50% - 8px)",3,"data","mermaidOptions"],["id","clipboard"],["clipboard",""],["emoji","","clipboard","",1,"btn-clipboard-default"],["clipboard","",3,"clipboardButtonComponent"],["clipboard","",3,"clipboardButtonTemplate"],[1,"btn-clipboard",3,"click"],["viewBox","0 0 24 24",2,"width","16px","height","16px"],["fill","#fff","d","M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z"]],template:function(i,l){if(i&1){let c=y();n(0,"app-scrollspy-nav-layout",1)(1,"h1"),t(2,"Plugins"),e(),n(3,"markdown"),t(4," Before to use any plugin, make sure you've installed the required libraries by following the [installation](/get-started#installation) section of the __Get Started__ page. "),e(),n(5,"section")(6,"h2",2),t(7,"Emoji plugin"),e(),n(8,"markdown"),t(9,"\n      #### Emoji-Toolkit file to include\n      ```javascript\n      node_modules/emoji-toolkit/lib/js/joypixels.min.js\n      ```\n      #### Directive\n      `emoji` - activate emoji plugin\n      ### Example\n    "),e(),n(10,"markdown"),t(11," Using `emoji` input property on `markdown` component, directive or pipe allows you to convert shortnames to native unicode emojis. "),e(),o(12,"markdown",3),n(13,"markdown"),t(14," The example below illustrate `emoji` directive in action. "),e(),n(15,"div",4)(16,"mat-form-field",5)(17,"textarea",6),g("ngModelChange",function(p){return u(c),f(l.emojiMarkdown,p)||(l.emojiMarkdown=p),h(p)}),e()(),o(18,"markdown",7),e(),n(19,"markdown",8),t(20," > :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_. "),e()(),n(21,"section")(22,"h2",9),t(23,"Line Numbers plugin"),e(),n(24,"markdown"),t(25,`
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
    `),e(),n(26,"markdown"),t(27," Using `lineNumbers` input property on `markdown` component, directive or pipe allows you to add line number at the beginning of each lines of code block. "),e(),o(28,"markdown",3),n(29,"markdown"),t(30," The example below uses `lineNumbers` directive which uses default line offset of 1. "),e(),n(31,"markdown",10),t(32,`
      \`\`\`javascript
      var result = square(2);

      function square(number) {
        return number * number;
      }
      \`\`\`
    `),e(),n(33,"markdown"),t(34," Optionally you can use `start` to specify the offset number for the first display line. "),e(),n(35,"markdown"),t(36," In the example below line offset is set to 5 using `start` input property. "),e(),n(37,"markdown",11),t(38,`
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
    `),e()(),n(39,"section")(40,"h2",12),t(41,"Line Highlight plugin"),e(),n(42,"markdown"),t(43,"\n      #### Prism files to include\n      ```javascript\n      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css\n      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js\n      ```\n      #### Directive\n      `lineHighlight` - activate line highlight plugin\n      #### Attributes\n      `line` - lines to highlight (i.e.: 6, 11-15)"),o(44,"br"),t(45,`
      \`lineOffset\` - starting offset for line numbers
      ### Example
    `),e(),n(46,"markdown"),t(47,"\n      You can highlight different lines by adding `lineHighlight` directive on the `markdown` component/directive.\n\n      Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to specify the starting line of code your snippet represents.\n    "),e(),o(48,"markdown",3),n(49,"markdown"),t(50," In the example below `line` 6 and 10 to 16 are highlight using a `lineOffset` of 5. "),e(),n(51,"markdown",13),t(52,`
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
    `),e()(),n(53,"section")(54,"h2",14),t(55,"Command Line plugin"),e(),n(56,"markdown",8),t(57,"\n      #### Prism file(s) to include\n      ```javascript\n      node_modules/prismjs/plugins/command-line/prism-command-line.css\n      node_modules/prismjs/plugins/command-line/prism-command-line.min.js\n      ```\n      #### Directive\n      `commandLine` - activate command-line display\n      #### Attributes\n      `host` - host name"),o(58,"br"),t(59,"\n      `output` - lines to be presented as output (optional)"),o(60,"br"),t(61,"\n      `filterOutput` - prefix to automatically present lines as output (optional)"),o(62,"br"),t(63,"\n      `prompt` - data prompt"),o(64,"br"),t(65,"\n      `user` - user name"),o(66,"br"),t(67,`
      ### Example
    `),e(),n(68,"markdown"),t(69,`
      Root user without output

      \`\`\`html
      <markdown
        commandLine
        [user]="'root'"
        [host]="'localhost'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),e(),o(70,"markdown",15),n(71,"markdown"),t(72,`
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
    `),e(),o(73,"markdown",16),n(74,"markdown"),t(75,`
      Windows PowerShell With Output

      \`\`\`html
      <markdown
        commandLine
        [prompt]="'PS C:\\Users\\Chris>'"
        [output]="'2-19'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),e(),o(76,"markdown",17),n(77,"markdown"),t(78,`
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
    `),e(),o(79,"markdown",18),e(),n(80,"section")(81,"h2",19),t(82,"KaTeX plugin"),e(),n(83,"markdown"),t(84,"\n      #### KaTeX files to include\n      ```javascript\n      node_modules/katex/dist/katex.min.css\n      node_modules/katex/dist/katex.min.js\n      node_modules/katex/dist/contrib/auto-render.min.js\n      ```\n      #### Directive\n      `katex` - activate KaTeX plugin\n      #### Attributes\n      `katexOptions` - combine [KaTeX options](https://katex.org/docs/options.html) and [Auto-Renderer options](https://katex.org/docs/autorender.html#api)"),o(85,"br"),t(86,`
      ### Example
    `),e(),n(87,"markdown"),t(88," You can render KaTex expression by adding `katex` directive on the `markdown` component/directive. "),e(),o(89,"markdown",3),n(90,"markdown"),t(91," The example below illustrate `katex` directive in action. "),e(),n(92,"div",4)(93,"mat-form-field",5)(94,"textarea",6),g("ngModelChange",function(p){return u(c),f(l.katexMarkdown,p)||(l.katexMarkdown=p),h(p)}),e()(),o(95,"markdown",20),e(),n(96,"markdown"),t(97,`
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
    `),e(),o(98,"markdown",3),e(),n(99,"section")(100,"h2",21),t(101,"Mermaid plugin"),e(),n(102,"markdown"),t(103,"\n      #### Mermaid file to include\n      ```javascript\n      node_modules/mermaid/dist/mermaid.min.js\n      ```\n      #### Directive\n      `mermaid` - activate mermaid plugin\n      #### Attributes\n      `mermaidOptions` - mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties)"),o(104,"br"),t(105,`
      ### Example
    `),e(),n(106,"markdown"),t(107," Using `mermaid` input property on `markdown` component, directive or pipe allows you to use [mermaid](https://mermaid-js.github.io/) syntax to generate diagrams and flowcharts. "),e(),o(108,"markdown",3),n(109,"markdown"),t(110," The example below illustrate `mermaid` directive in action. "),e(),n(111,"div",4)(112,"mat-form-field",5)(113,"textarea",6),g("ngModelChange",function(p){return u(c),f(l.mermaidMarkdown,p)||(l.mermaidMarkdown=p),h(p)}),e()(),o(114,"markdown",22),e(),n(115,"markdown"),t(116,`
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
    `),e(),o(117,"markdown",3),n(118,"markdown",8),t(119," > :blue_book: You can refer to this [Mermaid](https://mermaid-js.github.io/) documentation for complete usage syntax. "),e()(),n(120,"section")(121,"h2",23),t(122,"Clipboard plugin"),e(),n(123,"markdown"),t(124,"\n      #### Clipboard file(s) to include\n      ```javascript\n      node_modules/clipboard/dist/clipboard.min.js\n      ```\n      #### Directive\n      `clipboard` - activate copy-to-clipboard plugin\n      #### Attributes\n      `clipboardButtonComponent` - component `Type<any>` to use as copy-to-clipboard button\n      `clipboardButtonTemplate` - template reference `TemplateRef<T>` to use as copy-to-clipboard button\n      ### Example\n    "),e(),n(125,"markdown",24),t(126,"\n      #### Default button\n\n      The `clipboard` plugin provide an unstyled default button with a default behavior out of the box if no alternative is used.\n\n      ```javascript\n      const example = 'rollover me to see the default clipboard button appears!';\n      ```\n    "),e(),n(127,"markdown",25),t(128,`
      #### Customize default button

      To customize the default button styling, use the \`.markdown-clipboard-button\` CSS selector in your global \`styles.css/scss\` file. You can also customized the "copied" state happening after the button is clicked using the \`.copied\` CSS selector.

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
    `),e(),n(129,"markdown",26),t(130,`
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
    `),e(),n(131,"markdown",26),M(),t(132,`
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
    `),S(),e(),j(133,Q,3,0,"ng-template",null,0,A),n(135,"markdown",27),t(136,'\n      #### Using ng-template\n\n      Alternatively, the `clipboard` directive can be used in conjonction with `ng-template` to provide a custom button implementation via the `clipboardButtonTemplate` input property on the `markdown` component.\n\n      ```html\n      <ng-template #buttonTemplate>\n        <button (click)="onCopyToClipboard()">...</button>\n      </ng-template>\n\n      <markdown clipboard [clipboardButtonTemplate]="buttonTemplate"></markdown>\n      ```\n    '),e()()()}if(i&2){let c=T(134);a("headings",l.headings),r(12),a("src","app/plugins/remote/emoji.html"),r(5),b("ngModel",l.emojiMarkdown),r(),a("data",l.emojiMarkdown),r(10),a("src","app/plugins/remote/line-numbers.html"),r(9),a("start",5),r(11),a("src","app/plugins/remote/line-highlight.html"),r(3),a("line","6, 10-16")("lineOffset",5),r(19),a("user","root")("host","localhost")("src","app/plugins/remote/root-user-without-output.bash"),r(3),a("user","chris")("host","remotehost")("output","2, 4-8")("src","app/plugins/remote/non-root-user-with-output.bash"),r(3),a("prompt","PS C:UsersChris>")("output","2-19")("src","app/plugins/remote/windows-powershell-with-output.powershell"),r(3),a("prompt","PS C:UsersChris>")("filterOutput","(out)")("src","app/plugins/remote/windows-powershell-with-filter-output.powershell"),r(10),a("src","app/plugins/remote/katex.html"),r(5),b("ngModel",l.katexMarkdown),r(),a("data",l.katexMarkdown),r(3),a("src","app/plugins/remote/katex-options.html"),r(10),a("src","app/plugins/remote/mermaid.html"),r(5),b("ngModel",l.mermaidMarkdown),r(),a("data",l.mermaidMarkdown)("mermaidOptions",l.mermaidOptions),r(3),a("src","app/plugins/remote/mermaid-options.html"),r(12),a("clipboardButtonComponent",l.clipboardButton),r(2),a("clipboardButtonComponent",l.clipboardButton),r(4),a("clipboardButtonTemplate",c)}},dependencies:[N,I,L,W,Y,H,U,K,F,G,z,q,X,R],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:180px}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Google Sans,Helvetica,sans-serif;font-size:11px;padding:4px 0;width:50px;transition:all .25s ease-out}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00ff001a;color:#0f0}.btn-clipboard[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#1e1e1e;border:1px solid #666666;border-radius:4px;padding:6px;cursor:pointer;transition:all .2s ease-out}.btn-clipboard[_ngcontent-%COMP%]:active, .btn-clipboard[_ngcontent-%COMP%]:hover{border-color:#888}.btn-clipboard[_ngcontent-%COMP%]:active{background-color:#3e3e3e;transform:scale(.95)}"],changeDetection:0});let m=s;return m})();export{ue as default};
