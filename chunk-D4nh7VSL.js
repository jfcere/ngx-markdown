import{B as N5,Bt as ee,Dn as wE,L as M5,Lt as eD,M as Kc,P as Lb,T as Hh,V as Nc,W as O5,Y as Pe,_n as qh,an as mn,k as Jb,l as A5,mn as oC,qt as h,y as GT,yn as rC}from"./main-KW2AL426.js";import{n as et,t as U}from"./chunk-CplNoSK3.js";import{a as Zt,c as ut,i as Yo,l as xi,n as Mn,o as st,r as Sr,s as uo,t as Ko,u as xr}from"./chunk-w7MD9aZD.js";var l=class l{constructor(){this.elementRef=h(ee);this.markdownService=h(wE);this.overrideEnabled=!1;this._accentColor=``;this.markdown=`## Markdown rulez!
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
> Blockquote to the max`}get accentColor(){return this._accentColor}set accentColor(e){this._accentColor!==e&&(this._accentColor=e,this.changeAccentColor())}ngOnInit(){this.setHeadings()}ngOnDestroy(){this.resetRenderer()}changeAccentColor(){let e=this.accentColor?` style="color: ${this.accentColor}"`:``;this.overrideRenderer(e),this.markdownService.reload()}overrideRenderer(e){this.overrideEnabled=!0,this.markdownService.renderer.heading=({text:o,depth:t})=>this.overrideEnabled?`<h${t}${e}>${o}</h${t}>`:!1}resetRenderer(){this.overrideEnabled=!1}setHeadings(){let e=[];this.elementRef.nativeElement.querySelectorAll(`h2`).forEach(o=>e.push(o)),this.headings=e}};l.ɵfac=function(o){return new(o||l)},l.ɵcmp=Pe({type:l,selectors:[[`app-rerender`]],decls:20,vars:4,consts:[[3,`headings`],[`id`,`example`],[`fxLayout`,`column`,`fxLayout.gt-sm`,`row`,`fxLayoutGap`,`16px`],[`fxLayout`,`column`,`fxFlex.gt-sm`,`calc(50% - 8px)`],[`appearance`,`fill`,`color`,`accent`,`floatLabel`,`always`,`fxFlex`,``],[`matInput`,``,`placeholder`,`Ex: red, blue, #00a, etc.`,3,`ngModelChange`,`ngModel`],[`appearance`,`fill`,`color`,`accent`,`fxFlex`,``],[`matInput`,``,`cdkTextareaAutosize`,`true`,3,`ngModelChange`,`ngModel`],[`fxFlex.gt-sm`,`calc(50% - 8px)`,3,`data`]],template:function(o,t){o&1&&(Nc(0,`app-scrollspy-nav-layout`,0)(1,`h1`),qh(2,`Re-render`),Hh(),Nc(3,`markdown`),qh(4,`
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
  `),Hh(),Nc(5,`section`)(6,`h2`,1),qh(7,`Example`),Hh(),Nc(8,`markdown`),qh(9,`
      The example below will apply the \`style\` attribute on heading elements to customize their colors. This requires markdown to be reloaded because it updates the renderer programmatically to override the \`heading\` token.

      Although this could be done simply with CSS variables, this is only for demo purposes.
    `),Hh(),Nc(10,`section`)(11,`div`,2)(12,`div`,3)(13,`mat-form-field`,4)(14,`mat-label`),qh(15,`CSS Color`),Hh(),Nc(16,`input`,5),eD(`ngModelChange`,function(i){return GT(t.accentColor,i)||(t.accentColor=i),i}),Hh(),rC(),Hh(),Nc(17,`mat-form-field`,6)(18,`textarea`,7),eD(`ngModelChange`,function(i){return GT(t.markdown,i)||(t.markdown=i),i}),Hh(),rC(),Hh()(),Kc(19,`markdown`,8),Hh()()()()),o&2&&(Lb(`headings`,t.headings),mn(16),Jb(`ngModel`,t.accentColor),oC(),mn(2),Jb(`ngModel`,t.markdown),oC(),mn(),Lb(`data`,t.markdown))},dependencies:[O5,M5,N5,A5,Sr,Zt,xr,xi,U,ut,Mn,st,Ko,Yo,uo,et],styles:[`[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:340px}`]});var f=l;export{f as default};