import{E as Gh,En as tC,I as J,K as Le,Lt as _E,O as HT,Ut as b5,_ as E5,an as hn,at as Tc,bt as Wc,ht as Vh,jn as w5,p as D5,rn as h,wn as rC,wt as Xb,x as Fb,z as Jb}from"./main-FOGERYFJ.js";import{n as et,t as U}from"./chunk-CAN5vBci.js";import{a as Zt,c as ut,i as Yo,l as xi,n as Sr,o as st,r as Xo,s as uo,t as Mn,u as xr}from"./chunk-C8FleOn5.js";var l=class l{constructor(){this.elementRef=h(J);this.markdownService=h(_E);this.overrideEnabled=!1;this._accentColor=``;this.markdown=`## Markdown rulez!
---

### Syntax highlight
\`\`\`typescript
const language = 'typescript';
\`\`\`

### Lists
1. Ordered list
2. Another bullet point
  - Unordered list
  - Another unordered bullet point

### Blockquote
> Blockquote to the max`}get accentColor(){return this._accentColor}set accentColor(e){this._accentColor!==e&&(this._accentColor=e,this.changeAccentColor())}ngOnInit(){this.setHeadings()}ngOnDestroy(){this.resetRenderer()}changeAccentColor(){let e=this.accentColor?` style="color: ${this.accentColor}"`:``;this.overrideRenderer(e),this.markdownService.reload()}overrideRenderer(e){this.overrideEnabled=!0,this.markdownService.renderer.heading=({text:o,depth:t})=>this.overrideEnabled?`<h${t}${e}>${o}</h${t}>`:!1}resetRenderer(){this.overrideEnabled=!1}setHeadings(){let e=[];this.elementRef.nativeElement.querySelectorAll(`h2`).forEach(o=>e.push(o)),this.headings=e}};l.ɵfac=function(o){return new(o||l)},l.ɵcmp=Le({type:l,selectors:[[`app-rerender`]],decls:20,vars:4,consts:[[3,`headings`],[`id`,`example`],[`fxLayout`,`column`,`fxLayout.gt-sm`,`row`,`fxLayoutGap`,`16px`],[`fxLayout`,`column`,`fxFlex.gt-sm`,`calc(50% - 8px)`],[`appearance`,`fill`,`color`,`accent`,`floatLabel`,`always`,`fxFlex`,``],[`matInput`,``,`placeholder`,`Ex: red, blue, #00a, etc.`,3,`ngModelChange`,`ngModel`],[`appearance`,`fill`,`color`,`accent`,`fxFlex`,``],[`matInput`,``,`cdkTextareaAutosize`,`true`,3,`ngModelChange`,`ngModel`],[`fxFlex.gt-sm`,`calc(50% - 8px)`,3,`data`]],template:function(o,t){o&1&&(Tc(0,`app-scrollspy-nav-layout`,0)(1,`h1`),Gh(2,`Re-render`),Vh(),Tc(3,`markdown`),Gh(4,`
    In some situations, you might need to re-render markdown after making changes. If you've updated the text this would be done automatically, however if the changes are internal to the library such as rendering options, you will need to inform the \`MarkdownService\` that it needs to update.

    To do so, inject the \`MarkdownService\` and call the \`reload()\` function as shown below.

    \`\`\`typescript
    import { MarkdownService } from 'ngx-markdown';

    constructor(
      private markdownService: MarkdownService,
    ) { }

    update() {
      this.markdownService.reload();
    }
    \`\`\`
  `),Vh(),Tc(5,`section`)(6,`h2`,1),Gh(7,`Example`),Vh(),Tc(8,`markdown`),Gh(9,`
      The example below will apply the \`style\` attribute on heading elements to customize their colors. This requires markdown to be reloaded because it updates the renderer programmatically to override the \`heading\` token.

      Although this could be done simply with CSS variables, this is only for demo purposes.
    `),Vh(),Tc(10,`section`)(11,`div`,2)(12,`div`,3)(13,`mat-form-field`,4)(14,`mat-label`),Gh(15,`CSS Color`),Vh(),Tc(16,`input`,5),Jb(`ngModelChange`,function(i){return HT(t.accentColor,i)||(t.accentColor=i),i}),Vh(),tC(),Vh(),Tc(17,`mat-form-field`,6)(18,`textarea`,7),Jb(`ngModelChange`,function(i){return HT(t.markdown,i)||(t.markdown=i),i}),Vh(),tC(),Vh()(),Wc(19,`markdown`,8),Vh()()()()),o&2&&(Fb(`headings`,t.headings),hn(16),Xb(`ngModel`,t.accentColor),rC(),hn(2),Xb(`ngModel`,t.markdown),rC(),hn(),Fb(`data`,t.markdown))},dependencies:[w5,b5,D5,E5,Sr,Zt,xr,xi,U,ut,Mn,st,Yo,Xo,uo,et],styles:[`[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:340px}`]});var f=l;export{f as default};