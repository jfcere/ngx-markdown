import{a as S,b,c as _,d as E,e as F,f as D,g as L,h as R,i as I}from"./chunk-SSDLIIWZ.js";import{a as v,b as k}from"./chunk-3YMPAOXG.js";import{Da as p,Gb as y,Ka as a,M as h,Oa as g,Ub as w,Vb as C,Wb as M,Zb as x,ga as u,ja as d,ka as m,qa as l,wa as r,xa as o,ya as f}from"./chunk-L4IPUA5J.js";var V=(()=>{let i=class i{get accentColor(){return this._accentColor}set accentColor(e){this._accentColor!==e&&(this._accentColor=e,this.changeAccentColor())}constructor(e,t){this.elementRef=e,this.markdownService=t,this.overrideEnabled=!1,this._accentColor="",this.markdown=`## Markdown __rulez__!
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
> Blockquote to the max`}ngOnInit(){this.setHeadings()}ngOnDestroy(){this.resetRenderer()}changeAccentColor(){let e=this.accentColor?` style="color: ${this.accentColor}"`:"";this.overrideRenderer(e),this.markdownService.reload()}overrideRenderer(e){this.overrideEnabled=!0,this.markdownService.renderer.heading=(t,n)=>this.overrideEnabled?`<h${n}${e}>${t}</h${n}>`:!1}resetRenderer(){this.overrideEnabled=!1}setHeadings(){let e=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(t=>e.push(t)),this.headings=e}};i.\u0275fac=function(t){return new(t||i)(m(u),m(y))},i.\u0275cmp=h({type:i,selectors:[["app-rerender"]],standalone:!0,features:[g],decls:20,vars:4,consts:[[3,"headings"],["id","example"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["fxLayout","column","fxFlex.gt-sm","calc(50% - 8px)"],["appearance","fill","color","accent","floatLabel","always","fxFlex",""],["matInput","","placeholder","Ex: red, blue, #00a, etc.",3,"ngModel","ngModelChange"],["appearance","fill","color","accent","fxFlex",""],["matInput","",3,"ngModel","ngModelChange"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data"]],template:function(t,n){t&1&&(r(0,"app-scrollspy-nav-layout",0)(1,"h1"),a(2,"Re-render"),o(),r(3,"markdown"),a(4,`
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
  `),o(),r(5,"section")(6,"h2",1),a(7,"Example"),o(),r(8,"markdown"),a(9,"\n      The example below will apply the `style` attribute on heading elements to customize their colors. This requires markdown to be reloaded because it updates the renderer programmatically to override the `heading` token.\n\n      Although this could be done simply with CSS variables, this is only for demo purposes.\n    "),o(),r(10,"section")(11,"div",2)(12,"div",3)(13,"mat-form-field",4)(14,"mat-label"),a(15,"CSS Color"),o(),r(16,"input",5),p("ngModelChange",function(c){return n.accentColor=c}),o()(),r(17,"mat-form-field",6)(18,"textarea",7),p("ngModelChange",function(c){return n.markdown=c}),o()()(),f(19,"markdown",8),o()()()()),t&2&&(l("headings",n.headings),d(16),l("ngModel",n.accentColor),d(2),l("ngModel",n.markdown),d(1),l("data",n.markdown))},dependencies:[x,w,C,M,E,S,b,_,v,L,D,F,I,R,k],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:340px}"],changeDetection:0});let s=i;return s})();export{V as default};
