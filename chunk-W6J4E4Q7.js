import{a as b,b as E,c as _,d as D,e as R,f as L,g as F,h as I,i as A,j as O}from"./chunk-E4GMOIJ4.js";import"./chunk-BTWGBLHG.js";import{a as S}from"./chunk-V72TJ7RD.js";import{Ac as x,Fa as s,Ka as o,La as r,Ma as v,aa as g,bb as a,eb as m,fb as c,gb as p,gc as y,hc as w,la as l,ma as d,ra as f,vc as C,wc as M,xc as k}from"./chunk-YRPUISPE.js";var h=class u{constructor(e,n){this.elementRef=e;this.markdownService=n;this.overrideEnabled=!1;this._accentColor="";this.markdown=`## Markdown rulez!
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
> Blockquote to the max`}get accentColor(){return this._accentColor}set accentColor(e){this._accentColor!==e&&(this._accentColor=e,this.changeAccentColor())}ngOnInit(){this.setHeadings()}ngOnDestroy(){this.resetRenderer()}changeAccentColor(){let e=this.accentColor?` style="color: ${this.accentColor}"`:"";this.overrideRenderer(e),this.markdownService.reload()}overrideRenderer(e){this.overrideEnabled=!0,this.markdownService.renderer.heading=({text:n,depth:t})=>this.overrideEnabled?`<h${t}${e}>${n}</h${t}>`:!1}resetRenderer(){this.overrideEnabled=!1}setHeadings(){let e=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(n=>e.push(n)),this.headings=e}static{this.\u0275fac=function(n){return new(n||u)(d(g),d(y))}}static{this.\u0275cmp=f({type:u,selectors:[["app-rerender"]],decls:20,vars:4,consts:[[3,"headings"],["id","example"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["fxLayout","column","fxFlex.gt-sm","calc(50% - 8px)"],["appearance","fill","color","accent","floatLabel","always","fxFlex",""],["matInput","","placeholder","Ex: red, blue, #00a, etc.",3,"ngModelChange","ngModel"],["appearance","fill","color","accent","fxFlex",""],["matInput","","cdkTextareaAutosize","true",3,"ngModelChange","ngModel"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data"]],template:function(n,t){n&1&&(o(0,"app-scrollspy-nav-layout",0)(1,"h1"),a(2,"Re-render"),r(),o(3,"markdown"),a(4,`
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
  `),r(),o(5,"section")(6,"h2",1),a(7,"Example"),r(),o(8,"markdown"),a(9,"\n      The example below will apply the `style` attribute on heading elements to customize their colors. This requires markdown to be reloaded because it updates the renderer programmatically to override the `heading` token.\n\n      Although this could be done simply with CSS variables, this is only for demo purposes.\n    "),r(),o(10,"section")(11,"div",2)(12,"div",3)(13,"mat-form-field",4)(14,"mat-label"),a(15,"CSS Color"),r(),o(16,"input",5),p("ngModelChange",function(i){return c(t.accentColor,i)||(t.accentColor=i),i}),r()(),o(17,"mat-form-field",6)(18,"textarea",7),p("ngModelChange",function(i){return c(t.markdown,i)||(t.markdown=i),i}),r()()(),v(19,"markdown",8),r()()()()),n&2&&(s("headings",t.headings),l(16),m("ngModel",t.accentColor),l(2),m("ngModel",t.markdown),l(),s("data",t.markdown))},dependencies:[x,C,M,k,D,b,E,_,w,F,L,R,O,A,I,S],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:340px}"],changeDetection:0})}};export{h as default};
