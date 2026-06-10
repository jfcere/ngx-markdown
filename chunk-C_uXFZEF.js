import {h,X,q as bn,t as Bn,L as Le,Z as Z4,H as H4,z as z4,u as q4,G as G4,K as KS,D as Dc,B as Bh,F as Fh,j as jc,b as Gb,T as Tg,w as wT,v as Mg,P as PC,x as Sg,C as Cg,I as Ib,y as tT,S as Sb,f as fn,c as zb,d as BC,A as Zb,E as Go,$ as $D,J as Js,N as VD,a as Bc,Q as $g,Y as YS,U as FT}from'./main-GM4SH2N5.js';import {y as yr,Z as Zt,v as vr,_ as _n,a as at,F as Fi,I as Io,S as So,s as so}from'./chunk-vq4aiYt-.js';import {U,e as et}from'./chunk-CuRo2V91.js';function ie(te,s){if(te&1){let m=KS();Dc(0,"button",29),Bc("click",function(){Tg(m);let p=YS();return Mg(p.onCopyToClipboard())}),$g(),Dc(1,"svg",30),jc(2,"path",31),Fh()();}}var d=class d{constructor(){this.elementRef=h(X);this.snackbar=h(bn);this.clipboardButton=Bn;this.emojiMarkdown="# I :heart: ngx-markdown";this.katexMarkdown="#### `katex` directive example\n\n```latex\nf(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi\n```\n\n$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$";this.mermaidMarkdown="```mermaid\ngraph TD;\n  A-->B;\n  A-->C;\n  B-->D;\n  C-->D;\n```";this.mermaidOptions={fontFamily:"inherit",theme:"dark"};}ngOnInit(){this.setHeadings();}onCopyToClipboard(){this.snackbar.open("Copied to clipboard via ng-template!",void 0,{duration:3e3,horizontalPosition:"right",verticalPosition:"bottom"});}setHeadings(){let s=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(m=>s.push(m)),this.headings=s;}};d.\u0275fac=function(m){return new(m||d)},d.\u0275cmp=Le({type:d,selectors:[["app-plugins"]],features:[Zb([Go({clipboardOptions:{provide:$D,useValue:{}},sanitize:{provide:VD,useValue:Js}})])],decls:153,vars:34,consts:[["buttonTemplate",""],[3,"headings"],["id","emoji"],[3,"src"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["appearance","fill","color","accent","fxFlex.gt-sm","calc(50% - 8px)"],["matInput","","cdkTextareaAutosize","true",3,"ngModelChange","ngModel"],["emoji","","fxFlex.gt-sm","calc(50% - 8px)",3,"data"],["emoji",""],["id","line-numbers"],["lineNumbers",""],["lineNumbers","",3,"start"],["id","line-highlight"],["lineHighlight","",3,"line","lineOffset"],["id","command-line"],["commandLine","",3,"user","host","src"],["commandLine","",3,"user","host","output","src"],["commandLine","",3,"prompt","output","src"],["commandLine","",3,"prompt","filterOutput","src"],["id","katex"],["katex","","fxFlex.gt-sm","calc(50% - 8px)",3,"data"],["id","mermaid"],["mermaid","","fxLayoutAlign","center center","fxFlex.gt-sm","calc(50% - 8px)",3,"data","mermaidOptions"],["id","clipboard"],["clipboard",""],["clipboard","",1,"btn-clipboard-toolbar"],["clipboard","",1,"btn-clipboard-default"],["clipboard","",3,"clipboardButtonComponent"],["clipboard","",3,"clipboardButtonTemplate"],[1,"btn-clipboard",3,"click"],["viewBox","0 0 24 24",2,"width","16px","height","16px"],["fill","#fff","d","M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z"]],template:function(m,a){if(m&1){let p=KS();Dc(0,"app-scrollspy-nav-layout",1)(1,"h1"),Bh(2,"Plugins"),Fh(),Dc(3,"markdown"),Bh(4," Before to use any plugin, make sure you've installed the required libraries by following the [installation](/get-started#installation) section of the __Get Started__ page. "),Fh(),Dc(5,"section")(6,"h2",2),Bh(7,"Emoji plugin"),Fh(),Dc(8,"markdown"),Bh(9,`
      #### Emoji-Toolkit file to include
      \`\`\`javascript
      node_modules/emoji-toolkit/lib/js/joypixels.min.js
      \`\`\`

      #### Directive
      \`emoji\` - activate emoji plugin

      ### Example
    `),Fh(),Dc(10,"markdown"),Bh(11," Using `emoji` input property on `markdown` component, directive or pipe allows you to convert shortnames to native unicode emojis. "),Fh(),jc(12,"markdown",3),Dc(13,"markdown"),Bh(14," The example below illustrate `emoji` directive in action. "),Fh(),Dc(15,"div",4)(16,"mat-form-field",5)(17,"textarea",6),Gb("ngModelChange",function(l){return Tg(p),wT(a.emojiMarkdown,l)||(a.emojiMarkdown=l),Mg(l)}),Fh(),PC(),Fh(),jc(18,"markdown",7),Fh(),Dc(19,"markdown",8),Bh(20," > :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_. "),Fh()(),Dc(21,"section")(22,"h2",9),Bh(23,"Line Numbers plugin"),Fh(),Dc(24,"markdown"),Bh(25,`
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
    `),Fh(),Dc(26,"markdown"),Bh(27," Using `lineNumbers` input property on `markdown` component, directive or pipe allows you to add line number at the beginning of each lines of code block. "),Fh(),jc(28,"markdown",3),Dc(29,"markdown"),Bh(30," The example below uses `lineNumbers` directive which uses default line offset of 1. "),Fh(),Dc(31,"markdown",10),Bh(32,`
      \`\`\`javascript
      var result = square(2);

      function square(number) {
        return number * number;
      }
      \`\`\`
    `),Fh(),Dc(33,"markdown"),Bh(34," Optionally you can use `start` to specify the offset number for the first display line. "),Fh(),Dc(35,"markdown"),Bh(36," In the example below line offset is set to 5 using `start` input property. "),Fh(),Dc(37,"markdown",11),Bh(38,`
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
    `),Fh()(),Dc(39,"section")(40,"h2",12),Bh(41,"Line Highlight plugin"),Fh(),Dc(42,"markdown"),Bh(43,`
      #### Prism files to include
      \`\`\`javascript
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js
      \`\`\`

      #### Directive
      \`lineHighlight\` - activate line highlight plugin

      #### Attributes
      \`line\` - lines to highlight (i.e.: 6, 11-15)`),jc(44,"br"),Bh(45,"\n      `lineOffset` - starting offset for line numbers"),jc(46,"br"),Bh(47,`

      ### Example
    `),Fh(),Dc(48,"markdown"),Bh(49,"\n      You can highlight different lines by adding `lineHighlight` directive on the `markdown` component/directive.\n\n      Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to specify the starting line of code your snippet represents.\n    "),Fh(),jc(50,"markdown",3),Dc(51,"markdown"),Bh(52," In the example below `line` 6 and 10 to 16 are highlight using a `lineOffset` of 5. "),Fh(),Dc(53,"markdown",13),Bh(54,`
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
    `),Fh()(),Dc(55,"section")(56,"h2",14),Bh(57,"Command Line plugin"),Fh(),Dc(58,"markdown",8),Bh(59,`
      #### Prism file(s) to include
      \`\`\`javascript
      node_modules/prismjs/plugins/command-line/prism-command-line.css
      node_modules/prismjs/plugins/command-line/prism-command-line.min.js
      \`\`\`

      #### Directive
      \`commandLine\` - activate command-line display

      #### Attributes
      \`host\` - host name`),jc(60,"br"),Bh(61,"\n      `output` - lines to be presented as output (optional)"),jc(62,"br"),Bh(63,"\n      `filterOutput` - prefix to automatically present lines as output (optional)"),jc(64,"br"),Bh(65,"\n      `prompt` - data prompt"),jc(66,"br"),Bh(67,"\n      `user` - user name"),jc(68,"br"),Bh(69,`

      ### Example
    `),Fh(),Dc(70,"markdown"),Bh(71,`
      Root user without output

      \`\`\`html
      <markdown
        commandLine
        [user]="'root'"
        [host]="'localhost'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Fh(),jc(72,"markdown",15),Dc(73,"markdown"),Bh(74,`
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
    `),Fh(),jc(75,"markdown",16),Dc(76,"markdown"),Bh(77,`
      Windows PowerShell With Output

      \`\`\`html
      <markdown
        commandLine
        [prompt]="'PS C:\\Users\\Chris>'"
        [output]="'2-19'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Fh(),jc(78,"markdown",17),Dc(79,"markdown"),Bh(80,`
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
    `),Fh(),jc(81,"markdown",18),Fh(),Dc(82,"section")(83,"h2",19),Bh(84,"KaTeX plugin"),Fh(),Dc(85,"markdown"),Bh(86,"\n      #### KaTeX files to include\n      ```javascript\n      node_modules/katex/dist/katex.min.css\n      ```\n\n      #### Directive\n      `katex` - activate KaTeX plugin\n\n      #### Attributes\n      `katexOptions` - [KaTeX options](https://katex.org/docs/options.html)"),jc(87,"br"),Bh(88,`

      ### Example
    `),Fh(),Dc(89,"markdown"),Bh(90," You can render LaTeX expression by adding `katex` directive on the `markdown` component/directive. "),Fh(),jc(91,"markdown",3),Dc(92,"markdown"),Bh(93," The example below illustrate `katex` directive in action. "),Fh(),Dc(94,"div",4)(95,"mat-form-field",5)(96,"textarea",6),Gb("ngModelChange",function(l){return Tg(p),wT(a.katexMarkdown,l)||(a.katexMarkdown=l),Mg(l)}),Fh(),PC(),Fh(),jc(97,"markdown",20),Fh(),Dc(98,"markdown"),Bh(99,`
      Optionally, you can specify the [KaTeX options](https://katex.org/docs/options.html) at the component-level through \`katexOptions\` property.

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
    `),Fh(),jc(100,"markdown",3),Fh(),Dc(101,"section")(102,"h2",21),Bh(103,"Mermaid plugin"),Fh(),Dc(104,"markdown"),Bh(105,"\n      #### Mermaid file to include\n      ```javascript\n      node_modules/mermaid/dist/mermaid.min.js\n      ```\n\n      #### Directive\n      `mermaid` - activate mermaid plugin\n\n      #### Attributes\n      `mermaidOptions` - mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties)"),jc(106,"br"),Bh(107,`

      ### Example
    `),Fh(),Dc(108,"markdown"),Bh(109," Using `mermaid` input property on `markdown` component, directive or pipe allows you to use [mermaid](https://mermaid-js.github.io/) syntax to generate diagrams and flowcharts. "),Fh(),jc(110,"markdown",3),Dc(111,"markdown"),Bh(112," The example below illustrate `mermaid` directive in action. "),Fh(),Dc(113,"div",4)(114,"mat-form-field",5)(115,"textarea",6),Gb("ngModelChange",function(l){return Tg(p),wT(a.mermaidMarkdown,l)||(a.mermaidMarkdown=l),Mg(l)}),Fh(),PC(),Fh(),jc(116,"markdown",22),Fh(),Dc(117,"markdown"),Bh(118,`
      #### Global configuration

      You can provide a global configuration for mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) to use across your application with the \`mermaidOptions\` when configuring \`provideMarkdown\`.

      \`\`\`typescript
      provideMarkdown({
        mermaidOptions: {
          provide: MERMAID_OPTIONS,
          useValue: {
            darkMode: true,
            look: 'handDrawn',
            ...
          },
        },
      }),
      \`\`\`

      #### Component configuration

      Additionally, you can specify mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties) on component directly using \`mermaidOptions\` property.

     **example.component.ts**
      \`\`\`typescript
      import { MermaidAPI } from 'ngx-markdown';

      public options: MermaidAPI.MermaidConfig = {
        darkMode: true,
        look: 'handDrawn',
        ...
      };
      \`\`\`

      **example.component.html**
    `),Fh(),jc(119,"markdown",3),Dc(120,"markdown",8),Bh(121," > :blue_book: You can refer to this [Mermaid](https://mermaid-js.github.io/) documentation for complete usage syntax. "),Fh()(),Dc(122,"section")(123,"h2",23),Bh(124,"Clipboard plugin"),Fh(),Dc(125,"markdown"),Bh(126,"\n      #### Clipboard file(s) to include\n\n      ```javascript\n      node_modules/clipboard/dist/clipboard.min.js\n      ```\n\n      #### Directive\n      `clipboard` - activate copy-to-clipboard plugin\n\n      #### Attributes\n      `clipboardButtonComponent` - component `Type<any>` to use as copy-to-clipboard button"),jc(127,"br"),Bh(128,"\n      `clipboardButtonTemplate` - template reference `TemplateRef<T>` to use as copy-to-clipboard button"),jc(129,"br"),Bh(130,`

      #### CSS Selectors
      \`markdown-clipboard-toolbar\` - toolbar wrapper`),jc(131,"br"),Bh(132,"\n      `markdown-clipboard-toolbar.hover` - toolbar wrapper during mouse hover"),jc(133,"br"),Bh(134,"\n      `markdown-clipboard-button` - default button"),jc(135,"br"),Bh(136,'\n      `markdown-clipboard-button.copied` - default button during "copied" state'),jc(137,"br"),Bh(138,`

      ### Example
    `),Fh(),Dc(139,"markdown",24),Bh(140,"\n      #### Default button\n\n      The `clipboard` plugin provide an unstyled default button with a default behavior out of the box if no alternative is used.\n\n      ```javascript\n      const example = 'the default clipboard button with default behavior';\n      ```\n    "),Fh(),Dc(141,"markdown",25),Bh(142,`
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
    `),Fh(),Dc(143,"markdown",26),Bh(144,`
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
    `),Fh(),Dc(145,"markdown",27),Bh(146,`
      #### Using global configuration

      You can provide a custom component to use globaly across your application with the \`clipboardOptions\` when configuring \`provideMarkdown\`.

      \`\`\`typescript
      provideMarkdown({
        clipboardOptions: {
          provide: CLIPBOARD_OPTIONS,
          useValue: {
            buttonComponent: ClipboardButtonComponent,
          },
        },
      })
      \`\`\`
    `),Fh(),Dc(147,"markdown",27),Sg(),Bh(148,`
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
    `),Cg(),Fh(),Ib(149,ie,3,0,"ng-template",null,0,FT),Dc(151,"markdown",28),Bh(152,'\n      #### Using ng-template\n\n      Alternatively, the `clipboard` directive can be used in conjonction with `ng-template` to provide a custom button implementation via the `clipboardButtonTemplate` input property on the `markdown` component.\n\n      ```html\n      <ng-template #buttonTemplate>\n        <button (click)="onCopyToClipboard()">...</button>\n      </ng-template>\n\n      <markdown clipboard [clipboardButtonTemplate]="buttonTemplate"></markdown>\n      ```\n    '),Fh()()();}if(m&2){let p=tT(150);Sb("headings",a.headings),fn(12),Sb("src","app/plugins/remote/emoji.html"),fn(5),zb("ngModel",a.emojiMarkdown),BC(),fn(),Sb("data",a.emojiMarkdown),fn(10),Sb("src","app/plugins/remote/line-numbers.html"),fn(9),Sb("start",5),fn(13),Sb("src","app/plugins/remote/line-highlight.html"),fn(3),Sb("line","6, 10-16")("lineOffset",5),fn(19),Sb("user","root")("host","localhost")("src","app/plugins/remote/root-user-without-output.bash"),fn(3),Sb("user","chris")("host","remotehost")("output","2, 4-8")("src","app/plugins/remote/non-root-user-with-output.bash"),fn(3),Sb("prompt","PS C:UsersChris>")("output","2-19")("src","app/plugins/remote/windows-powershell-with-output.powershell"),fn(3),Sb("prompt","PS C:UsersChris>")("filterOutput","(out)")("src","app/plugins/remote/windows-powershell-with-filter-output.powershell"),fn(10),Sb("src","app/plugins/remote/katex.html"),fn(5),zb("ngModel",a.katexMarkdown),BC(),fn(),Sb("data",a.katexMarkdown),fn(3),Sb("src","app/plugins/remote/katex-options.html"),fn(10),Sb("src","app/plugins/remote/mermaid.html"),fn(5),zb("ngModel",a.mermaidMarkdown),BC(),fn(),Sb("data",a.mermaidMarkdown)("mermaidOptions",a.mermaidOptions),fn(3),Sb("src","app/plugins/remote/mermaid-options.html"),fn(26),Sb("clipboardButtonComponent",a.clipboardButton),fn(2),Sb("clipboardButtonComponent",a.clipboardButton),fn(4),Sb("clipboardButtonTemplate",p);}},dependencies:[Z4,H4,z4,q4,G4,yr,Zt,vr,_n,U,at,Fi,Io,So,so,et],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:180px}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar{top:16px;right:16px;opacity:0;transition:opacity .25s ease-out}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar.hover{opacity:1}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Google Sans,Helvetica,sans-serif;font-size:11px;padding:4px 0;width:50px;transition:all .25s ease-out}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00ff001a;color:#0f0}.btn-clipboard[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#1e1e1e;border:1px solid #666666;border-radius:4px;padding:6px;cursor:pointer;transition:all .2s ease-out}.btn-clipboard[_ngcontent-%COMP%]:active, .btn-clipboard[_ngcontent-%COMP%]:hover{border-color:#888}.btn-clipboard[_ngcontent-%COMP%]:active{background-color:#3e3e3e;transform:scale(.95)}"]});var y=d;export{y as default};