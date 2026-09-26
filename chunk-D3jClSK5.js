import{Cn as qc,E as Gh,En as tC,I as J,K as Le,Nn as x5,O as HT,Ot as YD,St as XD,Ut as b5,Y as Og,_ as E5,_n as nD,a as no,an as hn,at as Tc,bt as Wc,ht as Vh,i as Ia,jn as w5,l as Ag,ln as kb,m as DT,n as Ar,p as D5,qt as eM,r as Bn,rn as h,rt as Rg,tn as gT,un as kg,wn as rC,wt as Xb,x as Fb,xt as Wg,yn as pT,z as Jb}from"./main-ZKQ5VCMV.js";import{n as et,t as U}from"./chunk-pw2Eq08b.js";import{a as Zt,c as ut,i as Yo,l as xi,n as Sr,r as Xo,s as uo,t as Mn,u as xr}from"./chunk-DQ4VMMPF.js";function ie(te,s){if(te&1){let m=pT();Tc(0,`button`,29),qc(`click`,function(){kg(m);return Og(gT().onCopyToClipboard())}),Wg(),Tc(1,`svg`,30),Wc(2,`path`,31),Vh()()}}var d=class d{constructor(){this.elementRef=h(J);this.snackbar=h(Bn);this.clipboardButton=no;this.emojiMarkdown=`# I :heart: ngx-markdown`;this.katexMarkdown="#### `katex` directive example\n\n```latex\nf(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi\n```\n\n$f(x) = \\int_{-\\infty}^\\infty \\hat f(\\xi) e^{2 \\pi i \\xi x} d\\xi$";this.mermaidMarkdown=`\`\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\``;this.mermaidOptions={fontFamily:`inherit`,theme:`dark`}}ngOnInit(){this.setHeadings()}onCopyToClipboard(){this.snackbar.open(`Copied to clipboard via ng-template!`,void 0,{duration:3e3,horizontalPosition:`right`,verticalPosition:`bottom`})}setHeadings(){let s=[];this.elementRef.nativeElement.querySelectorAll(`h2`).forEach(m=>s.push(m)),this.headings=s}};d.ɵfac=function(m){return new(m||d)},d.ɵcmp=Le({type:d,selectors:[[`app-plugins`]],features:[nD([Ar({clipboardOptions:{provide:YD,useValue:{}},sanitize:{provide:XD,useValue:Ia}})])],decls:153,vars:34,consts:[[`buttonTemplate`,``],[3,`headings`],[`id`,`emoji`],[3,`src`],[`fxLayout`,`column`,`fxLayout.gt-sm`,`row`,`fxLayoutGap`,`16px`],[`appearance`,`fill`,`color`,`accent`,`fxFlex.gt-sm`,`calc(50% - 8px)`],[`matInput`,``,`cdkTextareaAutosize`,`true`,3,`ngModelChange`,`ngModel`],[`emoji`,``,`fxFlex.gt-sm`,`calc(50% - 8px)`,3,`data`],[`emoji`,``],[`id`,`line-numbers`],[`lineNumbers`,``],[`lineNumbers`,``,3,`start`],[`id`,`line-highlight`],[`lineHighlight`,``,3,`line`,`lineOffset`],[`id`,`command-line`],[`commandLine`,``,3,`user`,`host`,`src`],[`commandLine`,``,3,`user`,`host`,`output`,`src`],[`commandLine`,``,3,`prompt`,`output`,`src`],[`commandLine`,``,3,`prompt`,`filterOutput`,`src`],[`id`,`katex`],[`katex`,``,`fxFlex.gt-sm`,`calc(50% - 8px)`,3,`data`],[`id`,`mermaid`],[`mermaid`,``,`fxLayoutAlign`,`center center`,`fxFlex.gt-sm`,`calc(50% - 8px)`,3,`data`,`mermaidOptions`],[`id`,`clipboard`],[`clipboard`,``],[`clipboard`,``,1,`btn-clipboard-toolbar`],[`clipboard`,``,1,`btn-clipboard-default`],[`clipboard`,``,3,`clipboardButtonComponent`],[`clipboard`,``,3,`clipboardButtonTemplate`],[1,`btn-clipboard`,3,`click`],[`viewBox`,`0 0 24 24`,2,`width`,`16px`,`height`,`16px`],[`fill`,`#fff`,`d`,`M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M7,7H17V5H19V19H5V5H7V7Z`]],template:function(m,a){if(m&1){let p=pT();Tc(0,`app-scrollspy-nav-layout`,1)(1,`h1`),Gh(2,`Plugins`),Vh(),Tc(3,`markdown`),Gh(4,` Before to use any plugin, make sure you've installed the required libraries by following the [installation](/get-started#installation) section of the __Get Started__ page. `),Vh(),Tc(5,`section`)(6,`h2`,2),Gh(7,`Emoji plugin`),Vh(),Tc(8,`markdown`),Gh(9,`
      #### Emoji-Toolkit file to include
      \`\`\`javascript
      node_modules/emoji-toolkit/lib/js/joypixels.min.js
      \`\`\`

      #### Directive
      \`emoji\` - activate emoji plugin

      ### Example
    `),Vh(),Tc(10,`markdown`),Gh(11," Using `emoji` input property on `markdown` component, directive or pipe allows you to convert shortnames to native unicode emojis. "),Vh(),Wc(12,`markdown`,3),Tc(13,`markdown`),Gh(14," The example below illustrate `emoji` directive in action. "),Vh(),Tc(15,`div`,4)(16,`mat-form-field`,5)(17,`textarea`,6),Jb(`ngModelChange`,function(l){return kg(p),HT(a.emojiMarkdown,l)||(a.emojiMarkdown=l),Og(l)}),Vh(),tC(),Vh(),Wc(18,`markdown`,7),Vh(),Tc(19,`markdown`,8),Gh(20,` > :blue_book: You can refer to this [Emoji Cheat Sheet](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) for a complete list of _shortnames_. `),Vh()(),Tc(21,`section`)(22,`h2`,9),Gh(23,`Line Numbers plugin`),Vh(),Tc(24,`markdown`),Gh(25,`
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
    `),Vh(),Tc(26,`markdown`),Gh(27," Using `lineNumbers` input property on `markdown` component, directive or pipe allows you to add line number at the beginning of each lines of code block. "),Vh(),Wc(28,`markdown`,3),Tc(29,`markdown`),Gh(30," The example below uses `lineNumbers` directive which uses default line offset of 1. "),Vh(),Tc(31,`markdown`,10),Gh(32,`
      \`\`\`javascript
      var result = square(2);

      function square(number) {
        return number * number;
      }
      \`\`\`
    `),Vh(),Tc(33,`markdown`),Gh(34," Optionally you can use `start` to specify the offset number for the first display line. "),Vh(),Tc(35,`markdown`),Gh(36," In the example below line offset is set to 5 using `start` input property. "),Vh(),Tc(37,`markdown`,11),Gh(38,`
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
    `),Vh()(),Tc(39,`section`)(40,`h2`,12),Gh(41,`Line Highlight plugin`),Vh(),Tc(42,`markdown`),Gh(43,`
      #### Prism files to include
      \`\`\`javascript
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css
      node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js
      \`\`\`

      #### Directive
      \`lineHighlight\` - activate line highlight plugin

      #### Attributes
      \`line\` - lines to highlight (i.e.: 6, 11-15)`),Wc(44,`br`),Gh(45,"\n      `lineOffset` - starting offset for line numbers"),Wc(46,`br`),Gh(47,`

      ### Example
    `),Vh(),Tc(48,`markdown`),Gh(49,"\n      You can highlight different lines by adding `lineHighlight` directive on the `markdown` component/directive.\n\n      Use `line` input property to specify the line(s) to highlight and optionally there is a `lineOffset` property to specify the starting line of code your snippet represents.\n    "),Vh(),Wc(50,`markdown`,3),Tc(51,`markdown`),Gh(52," In the example below `line` 6 and 10 to 16 are highlight using a `lineOffset` of 5. "),Vh(),Tc(53,`markdown`,13),Gh(54,`
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
    `),Vh()(),Tc(55,`section`)(56,`h2`,14),Gh(57,`Command Line plugin`),Vh(),Tc(58,`markdown`,8),Gh(59,`
      #### Prism file(s) to include
      \`\`\`javascript
      node_modules/prismjs/plugins/command-line/prism-command-line.css
      node_modules/prismjs/plugins/command-line/prism-command-line.min.js
      \`\`\`

      #### Directive
      \`commandLine\` - activate command-line display

      #### Attributes
      \`host\` - host name`),Wc(60,`br`),Gh(61,"\n      `output` - lines to be presented as output (optional)"),Wc(62,`br`),Gh(63,"\n      `filterOutput` - prefix to automatically present lines as output (optional)"),Wc(64,`br`),Gh(65,"\n      `prompt` - data prompt"),Wc(66,`br`),Gh(67,"\n      `user` - user name"),Wc(68,`br`),Gh(69,`

      ### Example
    `),Vh(),Tc(70,`markdown`),Gh(71,`
      Root user without output

      \`\`\`html
      <markdown
        commandLine
        [user]="'root'"
        [host]="'localhost'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Vh(),Wc(72,`markdown`,15),Tc(73,`markdown`),Gh(74,`
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
    `),Vh(),Wc(75,`markdown`,16),Tc(76,`markdown`),Gh(77,`
      Windows PowerShell With Output

      \`\`\`html
      <markdown
        commandLine
        [prompt]="'PS C:\\Users\\Chris>'"
        [output]="'2-19'"
        [src]="'path/to/file.bash'">
      </markdown>
      \`\`\`
    `),Vh(),Wc(78,`markdown`,17),Tc(79,`markdown`),Gh(80,`
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
    `),Vh(),Wc(81,`markdown`,18),Vh(),Tc(82,`section`)(83,`h2`,19),Gh(84,`KaTeX plugin`),Vh(),Tc(85,`markdown`),Gh(86,`
      #### KaTeX files to include
      \`\`\`javascript
      node_modules/katex/dist/katex.min.css
      \`\`\`

      #### Directive
      \`katex\` - activate KaTeX plugin

      #### Attributes
      \`katexOptions\` - [KaTeX options](https://katex.org/docs/options.html)`),Wc(87,`br`),Gh(88,`

      ### Example
    `),Vh(),Tc(89,`markdown`),Gh(90," You can render LaTeX expression by adding `katex` directive on the `markdown` component/directive. "),Vh(),Wc(91,`markdown`,3),Tc(92,`markdown`),Gh(93," The example below illustrate `katex` directive in action. "),Vh(),Tc(94,`div`,4)(95,`mat-form-field`,5)(96,`textarea`,6),Jb(`ngModelChange`,function(l){return kg(p),HT(a.katexMarkdown,l)||(a.katexMarkdown=l),Og(l)}),Vh(),tC(),Vh(),Wc(97,`markdown`,20),Vh(),Tc(98,`markdown`),Gh(99,`
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
    `),Vh(),Wc(100,`markdown`,3),Vh(),Tc(101,`section`)(102,`h2`,21),Gh(103,`Mermaid plugin`),Vh(),Tc(104,`markdown`),Gh(105,`
      #### Mermaid file to include
      \`\`\`javascript
      node_modules/mermaid/dist/mermaid.min.js
      \`\`\`

      #### Directive
      \`mermaid\` - activate mermaid plugin

      #### Attributes
      \`mermaidOptions\` - mermaid [configuration options](https://mermaid.js.org/config/schema-docs/config.html#mermaid-config-properties)`),Wc(106,`br`),Gh(107,`

      ### Example
    `),Vh(),Tc(108,`markdown`),Gh(109," Using `mermaid` input property on `markdown` component, directive or pipe allows you to use [mermaid](https://mermaid-js.github.io/) syntax to generate diagrams and flowcharts. "),Vh(),Wc(110,`markdown`,3),Tc(111,`markdown`),Gh(112," The example below illustrate `mermaid` directive in action. "),Vh(),Tc(113,`div`,4)(114,`mat-form-field`,5)(115,`textarea`,6),Jb(`ngModelChange`,function(l){return kg(p),HT(a.mermaidMarkdown,l)||(a.mermaidMarkdown=l),Og(l)}),Vh(),tC(),Vh(),Wc(116,`markdown`,22),Vh(),Tc(117,`markdown`),Gh(118,`
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
    `),Vh(),Wc(119,`markdown`,3),Tc(120,`markdown`,8),Gh(121,` > :blue_book: You can refer to this [Mermaid](https://mermaid-js.github.io/) documentation for complete usage syntax. `),Vh()(),Tc(122,`section`)(123,`h2`,23),Gh(124,`Clipboard plugin`),Vh(),Tc(125,`markdown`),Gh(126,"\n      #### Clipboard file(s) to include\n\n      ```javascript\n      node_modules/clipboard/dist/clipboard.min.js\n      ```\n\n      #### Directive\n      `clipboard` - activate copy-to-clipboard plugin\n\n      #### Attributes\n      `clipboardButtonComponent` - component `Type<any>` to use as copy-to-clipboard button"),Wc(127,`br`),Gh(128,"\n      `clipboardButtonTemplate` - template reference `TemplateRef<T>` to use as copy-to-clipboard button"),Wc(129,`br`),Gh(130,`

      #### CSS Selectors
      \`markdown-clipboard-toolbar\` - toolbar wrapper`),Wc(131,`br`),Gh(132,"\n      `markdown-clipboard-toolbar.hover` - toolbar wrapper during mouse hover"),Wc(133,`br`),Gh(134,"\n      `markdown-clipboard-button` - default button"),Wc(135,`br`),Gh(136,'\n      `markdown-clipboard-button.copied` - default button during "copied" state'),Wc(137,`br`),Gh(138,`

      ### Example
    `),Vh(),Tc(139,`markdown`,24),Gh(140,`
      #### Default button

      The \`clipboard\` plugin provide an unstyled default button with a default behavior out of the box if no alternative is used.

      \`\`\`javascript
      const example = 'the default clipboard button with default behavior';
      \`\`\`
    `),Vh(),Tc(141,`markdown`,25),Gh(142,`
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
    `),Vh(),Tc(143,`markdown`,26),Gh(144,`
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
    `),Vh(),Tc(145,`markdown`,27),Gh(146,`
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
    `),Vh(),Tc(147,`markdown`,27),Rg(),Gh(148,`
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
    `),Ag(),Vh(),kb(149,ie,3,0,`ng-template`,null,0,eM),Tc(151,`markdown`,28),Gh(152,'\n      #### Using ng-template\n\n      Alternatively, the `clipboard` directive can be used in conjonction with `ng-template` to provide a custom button implementation via the `clipboardButtonTemplate` input property on the `markdown` component.\n\n      ```html\n      <ng-template #buttonTemplate>\n        <button (click)="onCopyToClipboard()">...</button>\n      </ng-template>\n\n      <markdown clipboard [clipboardButtonTemplate]="buttonTemplate"></markdown>\n      ```\n    '),Vh()()()}if(m&2){let p=DT(150);Fb(`headings`,a.headings),hn(12),Fb(`src`,`app/plugins/remote/emoji.html`),hn(5),Xb(`ngModel`,a.emojiMarkdown),rC(),hn(),Fb(`data`,a.emojiMarkdown),hn(10),Fb(`src`,`app/plugins/remote/line-numbers.html`),hn(9),Fb(`start`,5),hn(13),Fb(`src`,`app/plugins/remote/line-highlight.html`),hn(3),Fb(`line`,`6, 10-16`)(`lineOffset`,5),hn(19),Fb(`user`,`root`)(`host`,`localhost`)(`src`,`app/plugins/remote/root-user-without-output.bash`),hn(3),Fb(`user`,`chris`)(`host`,`remotehost`)(`output`,`2, 4-8`)(`src`,`app/plugins/remote/non-root-user-with-output.bash`),hn(3),Fb(`prompt`,`PS C:UsersChris>`)(`output`,`2-19`)(`src`,`app/plugins/remote/windows-powershell-with-output.powershell`),hn(3),Fb(`prompt`,`PS C:UsersChris>`)(`filterOutput`,`(out)`)(`src`,`app/plugins/remote/windows-powershell-with-filter-output.powershell`),hn(10),Fb(`src`,`app/plugins/remote/katex.html`),hn(5),Xb(`ngModel`,a.katexMarkdown),rC(),hn(),Fb(`data`,a.katexMarkdown),hn(3),Fb(`src`,`app/plugins/remote/katex-options.html`),hn(10),Fb(`src`,`app/plugins/remote/mermaid.html`),hn(5),Xb(`ngModel`,a.mermaidMarkdown),rC(),hn(),Fb(`data`,a.mermaidMarkdown)(`mermaidOptions`,a.mermaidOptions),hn(3),Fb(`src`,`app/plugins/remote/mermaid-options.html`),hn(26),Fb(`clipboardButtonComponent`,a.clipboardButton),hn(2),Fb(`clipboardButtonComponent`,a.clipboardButton),hn(4),Fb(`clipboardButtonTemplate`,p)}},dependencies:[w5,b5,D5,x5,E5,Sr,Zt,xr,xi,U,ut,Mn,Yo,Xo,uo,et],styles:[`[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:180px}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar{top:16px;right:16px;opacity:0;transition:opacity .25s ease-out}.btn-clipboard-toolbar[_ngcontent-%COMP%]     .markdown-clipboard-toolbar.hover{opacity:1}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button{background-color:#ffffff12;border:none;border-radius:4px;color:#fff;cursor:pointer;font-family:Google Sans,Helvetica,sans-serif;font-size:11px;padding:4px 0;width:50px;transition:all .25s ease-out}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:hover, .btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:focus{background-color:#ffffff24}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button:active{transform:scale(.95)}.btn-clipboard-default[_ngcontent-%COMP%]     .markdown-clipboard-button.copied{background-color:#00ff001a;color:#0f0}.btn-clipboard[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;background-color:#1e1e1e;border:1px solid #666666;border-radius:4px;padding:6px;cursor:pointer;transition:all .2s ease-out}.btn-clipboard[_ngcontent-%COMP%]:active, .btn-clipboard[_ngcontent-%COMP%]:hover{border-color:#888}.btn-clipboard[_ngcontent-%COMP%]:active{background-color:#3e3e3e;transform:scale(.95)}`]});var y=d;export{y as default};