import{$ as Qc,B as N5,Bt as ee,Dt as _T,I as Lg,J as Og,L as M5,Lt as eD,M as Kc,N as Kg,O as JD,P as Lb,Rt as eE,T as Hh,Tn as vT,V as Nc,W as O5,Wt as gT,Y as Pe,_ as Fg,_n as qh,a as no,an as mn,bn as rD,i as Ia,k as Jb,l as A5,mn as oC,n as Ar,nn as kg,q as Ob,qt as h,r as Bn,sn as nM,tn as k5,y as GT,yn as rC}from"./main-KW2AL426.js";import{n as et,t as U}from"./chunk-CplNoSK3.js";import{a as Zt,c as ut,i as Yo,l as xi,n as Mn,r as Sr,s as uo,t as Ko,u as xr}from"./chunk-w7MD9aZD.js";function ie(te,s){if(te&1){let m=gT();Nc(0,`button`,29),Qc(`click`,function(){Fg(m);return Lg(vT().onCopyToClipboard())}),Kg(),Nc(1,`svg`,30),Kc(2,`path`,31),Hh()()}}var d=class d{constructor(){this.elementRef=h(ee);this.snackbar=h(Bn);this.clipboardButton=no;this.emojiMarkdown=`# I :heart: ngx-markdown`;this.katexMarkdown="#### `katex` directive example\n\n```latex\nf(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi\n```\n\n$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$";this.mermaidMarkdown=`\`\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\``;this.mermaidOptions={fontFamily:`inherit`,theme:`dark`}}ngOnInit(){this.setHeadings()}onCopyToClipboard(){this.snackbar.open(`Copied to clipboard via ng-template!`,void 0,{duration:3e3,horizontalPosition:`right`,verticalPosition:`bottom`})}setHeadings(){let s=[];this.elementRef.nativeElement.querySelectorAll(`h2`).forEach(m=>s.push(m)),this.headings=s}};d.ɵfac=function(m){return new(m||d)},d.ɵcmp=Pe({type:d,selectors:[[`app-plugins`]],features:[rD([Ar({clipboardOptions:{provide:JD,useValue:{}},sanitize:{provide:eE,useValue:Ia}})])],decls:153,vars:34,consts:[[`buttonTemplate`,``],[3,`headings`],[`id`,`emoji`],[3,`src`],[`fxLayout`,`column`,`fxLayout.gt-sm`,`row`,`fxLayoutGap`,`16px`],[`appearance`,`fill`,`color`,`accent`,`fxFlex.gt-sm`,`calc(50% - 8px)`],[`matInput`,``,`cdkTextareaAutosize`,`true`,3,`ngModelChange`,`ngModel`],[`emoji`,``,`fxFlex.gt-sm`,`calc(50% - 8px)`,3,`data`],[`emoji`,``],[`id`,`line-numbers`],[`lineNumbers`,``],[`lineNumbers`,``,3,`start`],[`id`,`line-highlight`],[`lineHighlight`,``,3,`line`,`lineOffset`],[`id`,`command-line`],[`commandLine`,``,3,`user`,`host`,`src`],[`commandLine`,``,3,`user`,`host`,`output`,`src`],[`commandLine`,``,3,`prompt`,`output`,`src`],[`commandLine`,``,3,`prompt`,`filterOutput`,`src`],[`id`,`katex`],[`katex`,``,`fxFlex.gt-sm`,`calc(50% - 8px)`,3,`data`],[`id`,`mermaid`],[`mermaid`,``,`fxLayoutAlign`,`center center`,`fxFlex.gt-sm`,`calc(50% - 8px)`,3,`data`,`mermaidOptions`],[`id`,`clipboard`],[`clipboard`,``],[`clipboard`,``,1,`btn-clipboard-toolbar`],[`clipboard`,``,1,`btn-clipboard-default`],[`clipboard`,``,3,`clipboardButtonComponent`],[`clipboard`,``,3,`clipboardButtonTemplate`],[1,`btn-clipboard`,3,`click`],[`viewBox`,`0 0 24 24`,2,`width`,`16px`,`height`,`16px`],[`fill`,`#fff`,`d`,`M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z`]],template:function(m,a){if(m&1){let p=gT();Nc(0,`app-scrollspy-nav-layout`,1)(1,`h1`),qh(2,`Plugins`),Hh(),Nc(3,`markdown`),qh(4,` Before to use any plugin, make sure you've installed the required libraries by following the [installation](/get-started#installation) section of the __Get Started__ page. `),Hh(),Nc(5,`section`)(6,`h2`,2),qh(7,`Emoji plugin`),Hh(),Nc(8,`markdown`),qh(9,`
      #### Emoji-Toolkit file to include
      \`\`\`javascript
      node_modules/emoji-toolkit/lib/js/joypixels.min.js
      \`\`\`

      #### Directive
      \`emoji\` - activate emoji plugin

      ### Example
    `),Hh(),Nc(10,`markdown`),qh(11," Using `emoji` input property on `markdown` component, directive or pipe allows you to convert shortnames to native unicode emojis. "),Hh(),Kc(12,`markdown`,3),Nc(13,`markdown`),qh(14," The example below illustrate `emoji` directive in action. "),Hh(),Nc(15,`div`,4)(16,`mat-form-field`,5)(17,`textarea`,6),eD(`ngModelChange`,function(l){return Fg(p),GT(a.emojiMarkdown,l)||(a.emojiMarkdown=l),Lg(l)}),Hh(),rC(),Hh(),Kc(18,`markdown`,7),Hh(),Nc(19,`markdown`,8),qh(20,` > :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_. `),Hh()(),Nc(21,`section`)(22,`h2`,9),qh(23,`Line Numbers plugin`),Hh(),Nc(24,`markdown`),qh(25,`
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
    `),Hh(),Nc(26,`markdown`),qh(27," Using `lineNumbers` input property on `markdown` component, directive or pipe allows you to add line number at the beginning of each lines of code block. "),Hh(),Kc(28,`markdown`,3),Nc(29,`markdown`),qh(30," The example below uses `lineNumbers` directive which uses default line offset of 1. "),Hh(),Nc(31,`markdown`,10),qh(32,`
      \`\`\`javascript
      var result = square(2);

      function square(number) {
        return number * number;
      }
      \`\`\`
    `),Hh(),Nc(33,`markdown`),qh(34," Optionally you can use `start` to specify the offset number for the first display line. "),Hh(),Nc(35,`markdown`),qh(36," In the example below line offset is set to 5 using `start` input property. "),Hh(),Nc(37,`markdown`,11),qh(38,`
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
    `),Hh()(),Nc(39,`section`)(40,`h2`,12),qh(41,`Line Highlight plugin`),Hh(),Nc(42,`markdown`),qh(43,`
      #### Prism files to include
      \`\`\`javascript
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js
      \`\`\`

      #### Directive
      \`lineHighlight\` - activate line highlight plugin

      #### Attributes
      \`line\` - lines to highlight (i.e.: 6, 11-15)`),Kc(44,`br`),qh(45,"\n      `lineOffset` - starting offset for line numbers"),Kc(46,`br`),qh(47,`

      ### Example
    `),Hh(),Nc(48,`markdown`),qh(49,"\n      You can highlight different lines by adding `lineHighlight` directive on the `markdown` component/directive.\n\n      Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to specify the starting line of code your snippet represents.\n    "),Hh(),Kc(50,`markdown`,3),Nc(51,`markdown`),qh(52," In the example below `line` 6 and 10 to 16 are highlight using a `lineOffset` of 5. "),Hh(),Nc(53,`markdown`,13),qh(54,`
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
    `),Hh()(),Nc(55,`section`)(56,`h2`,14),qh(57,`Command Line plugin`),Hh(),Nc(58,`markdown`,8),qh(59,`
      #### Prism file(s) to include
      \`\`\`javascript
      node_modules/prismjs/plugins/command-line/prism-command-line.css
      node_modules/prismjs/plugins/command-line/prism-command-line.min.js
      \`\`\`

      #### Directive
      \`commandLine\` - activate command-line display

      #### Attributes
      \`host\` - host name`),Kc(60,`br`),qh(61,"\n      `output` - lines to be presented as output (optional)"),Kc(62,`br`),qh(63,"\n      `filterOutput` - prefix to automatically present lines as output (optional)"),Kc(64,`br`),qh(65,"\n      `prompt` - data prompt"),Kc(66,`br`),qh(67,"\n      `user` - user name"),Kc(68,`br`),qh(69,`

      ### Example
    `),Hh(),Nc(70,`markdown`),qh(71,`
      Root user without output

      \`\`\`html
      <markdown
        commandLine
        [user]="'root'"
        [host]="'localhost'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Hh(),Kc(72,`markdown`,15),Nc(73,`markdown`),qh(74,`
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
    `),Hh(),Kc(75,`markdown`,16),Nc(76,`markdown`),qh(77,`
      Windows PowerShell With Output

      \`\`\`html
      <markdown
        commandLine
        [prompt]="'PS C:\\Users\\Chris>'"
        [output]="'2-19'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Hh(),Kc(78,`markdown`,17),Nc(79,`markdown`),qh(80,`
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
    `),Hh(),Kc(81,`markdown`,18),Hh(),Nc(82,`section`)(83,`h2`,19),qh(84,`KaTeX plugin`),Hh(),Nc(85,`markdown`),qh(86,`
      #### KaTeX files to include
      \`\`\`javascript
      node_modules/katex/dist/katex.min.css
      \`\`\`

      #### Directive
      \`katex\` - activate KaTeX plugin

      #### Attributes
      \`katexOptions\` - [KaTeX options](https://katex.org/docs/options.html)`),Kc(87,`br`),qh(88,`

      ### Example
    `),Hh(),Nc(89,`markdown`),qh(90," You can render LaTeX expression by adding `katex` directive on the `markdown` component/directive. "),Hh(),Kc(91,`markdown`,3),Nc(92,`markdown`),qh(93," The example below illustrate `katex` directive in action. "),Hh(),Nc(94,`div`,4)(95,`mat-form-field`,5)(96,`textarea`,6),eD(`ngModelChange`,function(l){return Fg(p),GT(a.katexMarkdown,l)||(a.katexMarkdown=l),Lg(l)}),Hh(),rC(),Hh(),Kc(97,`markdown`,20),Hh(),Nc(98,`markdown`),qh(99,`
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
    `),Hh(),Kc(100,`markdown`,3),Hh(),Nc(101,`section`)(102,`h2`,21),qh(103,`Mermaid plugin`),Hh(),Nc(104,`markdown`),qh(105,`
      #### Mermaid file to include
      \`\`\`javascript
      node_modules/mermaid/dist/mermaid.min.js
      \`\`\`

      #### Directive
      \`mermaid\` - activate mermaid plugin

      #### Attributes
      \`mermaidOptions\` - mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties)`),Kc(106,`br`),qh(107,`

      ### Example
    `),Hh(),Nc(108,`markdown`),qh(109," Using `mermaid` input property on `markdown` component, directive or pipe allows you to use [mermaid](https://mermaid-js.github.io/) syntax to generate diagrams and flowcharts. "),Hh(),Kc(110,`markdown`,3),Nc(111,`markdown`),qh(112," The example below illustrate `mermaid` directive in action. "),Hh(),Nc(113,`div`,4)(114,`mat-form-field`,5)(115,`textarea`,6),eD(`ngModelChange`,function(l){return Fg(p),GT(a.mermaidMarkdown,l)||(a.mermaidMarkdown=l),Lg(l)}),Hh(),rC(),Hh(),Kc(116,`markdown`,22),Hh(),Nc(117,`markdown`),qh(118,`
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
    `),Hh(),Kc(119,`markdown`,3),Nc(120,`markdown`,8),qh(121,` > :blue_book: You can refer to this [Mermaid](https://mermaid-js.github.io/) documentation for complete usage syntax. `),Hh()(),Nc(122,`section`)(123,`h2`,23),qh(124,`Clipboard plugin`),Hh(),Nc(125,`markdown`),qh(126,"\n      #### Clipboard file(s) to include\n\n      ```javascript\n      node_modules/clipboard/dist/clipboard.min.js\n      ```\n\n      #### Directive\n      `clipboard` - activate copy-to-clipboard plugin\n\n      #### Attributes\n      `clipboardButtonComponent` - component `Type<any>` to use as copy-to-clipboard button"),Kc(127,`br`),qh(128,"\n      `clipboardButtonTemplate` - template reference `TemplateRef<T>` to use as copy-to-clipboard button"),Kc(129,`br`),qh(130,`

      #### CSS Selectors
      \`markdown-clipboard-toolbar\` - toolbar wrapper`),Kc(131,`br`),qh(132,"\n      `markdown-clipboard-toolbar.hover` - toolbar wrapper during mouse hover"),Kc(133,`br`),qh(134,"\n      `markdown-clipboard-button` - default button"),Kc(135,`br`),qh(136,'\n      `markdown-clipboard-button.copied` - default button during "copied" state'),Kc(137,`br`),qh(138,`

      ### Example
    `),Hh(),Nc(139,`markdown`,24),qh(140,`
      #### Default button

      The \`clipboard\` plugin provide an unstyled default button with a default behavior out of the box if no alternative is used.

      \`\`\`javascript
      const example = 'the default clipboard button with default behavior';
      \`\`\`
    `),Hh(),Nc(141,`markdown`,25),qh(142,`
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
    `),Hh(),Nc(143,`markdown`,26),qh(144,`
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
    `),Hh(),Nc(145,`markdown`,27),qh(146,`
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
    `),Hh(),Nc(147,`markdown`,27),Og(),qh(148,`
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
    `),kg(),Hh(),Ob(149,ie,3,0,`ng-template`,null,0,nM),Nc(151,`markdown`,28),qh(152,'\n      #### Using ng-template\n\n      Alternatively, the `clipboard` directive can be used in conjonction with `ng-template` to provide a custom button implementation via the `clipboardButtonTemplate` input property on the `markdown` component.\n\n      ```html\n      <ng-template #buttonTemplate>\n        <button (click)="onCopyToClipboard()">...</button>\n      </ng-template>\n\n      <markdown clipboard [clipboardButtonTemplate]="buttonTemplate"></markdown>\n      ```\n    '),Hh()()()}if(m&2){let p=_T(150);Lb(`headings`,a.headings),mn(12),Lb(`src`,`app/plugins/remote/emoji.html`),mn(5),Jb(`ngModel`,a.emojiMarkdown),oC(),mn(),Lb(`data`,a.emojiMarkdown),mn(10),Lb(`src`,`app/plugins/remote/line-numbers.html`),mn(9),Lb(`start`,5),mn(13),Lb(`src`,`app/plugins/remote/line-highlight.html`),mn(3),Lb(`line`,`6, 10-16`)(`lineOffset`,5),mn(19),Lb(`user`,`root`)(`host`,`localhost`)(`src`,`app/plugins/remote/root-user-without-output.bash`),mn(3),Lb(`user`,`chris`)(`host`,`remotehost`)(`output`,`2, 4-8`)(`src`,`app/plugins/remote/non-root-user-with-output.bash`),mn(3),Lb(`prompt`,`PS C:UsersChris>`)(`output`,`2-19`)(`src`,`app/plugins/remote/windows-powershell-with-output.powershell`),mn(3),Lb(`prompt`,`PS C:UsersChris>`)(`filterOutput`,`(out)`)(`src`,`app/plugins/remote/windows-powershell-with-filter-output.powershell`),mn(10),Lb(`src`,`app/plugins/remote/katex.html`),mn(5),Jb(`ngModel`,a.katexMarkdown),oC(),mn(),Lb(`data`,a.katexMarkdown),mn(3),Lb(`src`,`app/plugins/remote/katex-options.html`),mn(10),Lb(`src`,`app/plugins/remote/mermaid.html`),mn(5),Jb(`ngModel`,a.mermaidMarkdown),oC(),mn(),Lb(`data`,a.mermaidMarkdown)(`mermaidOptions`,a.mermaidOptions),mn(3),Lb(`src`,`app/plugins/remote/mermaid-options.html`),mn(26),Lb(`clipboardButtonComponent`,a.clipboardButton),mn(2),Lb(`clipboardButtonComponent`,a.clipboardButton),mn(4),Lb(`clipboardButtonTemplate`,p)}},dependencies:[O5,M5,N5,k5,A5,Sr,Zt,xr,xi,U,ut,Mn,Ko,Yo,uo,et],styles:[`[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:180px}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar{top:16px;right:16px;opacity:0;transition:opacity .25s ease-out}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar.hover{opacity:1}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Google Sans,Helvetica,sans-serif;font-size:11px;padding:4px 0;width:50px;transition:all .25s ease-out}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00ff001a;color:#0f0}.btn-clipboard[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#1e1e1e;border:1px solid #666666;border-radius:4px;padding:6px;cursor:pointer;transition:all .2s ease-out}.btn-clipboard[_ngcontent-%COMP%]:active, .btn-clipboard[_ngcontent-%COMP%]:hover{border-color:#888}.btn-clipboard[_ngcontent-%COMP%]:active{background-color:#3e3e3e;transform:scale(.95)}`]});var y=d;export{y as default};