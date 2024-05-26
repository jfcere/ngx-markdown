import{a as _,b as E,c as F,d as D,e as L,f as R,g as I,h as A,i as T}from"./chunk-RXICN7MS.js";import"./chunk-VE2HCBXU.js";import{a as C,b}from"./chunk-FRCDZLEY.js";import{Ea as r,Fa as o,Ga as y,O as f,Va as l,Ya as h,Za as p,Zb as v,_a as u,ab as w,ba as g,ka as d,kc as M,la as c,lc as S,mc as k,pc as x,za as m}from"./chunk-AWIFZR5O.js";var J=(()=>{let a=class a{get accentColor(){return this._accentColor}set accentColor(e){this._accentColor!==e&&(this._accentColor=e,this.changeAccentColor())}constructor(e,n){this.elementRef=e,this.markdownService=n,this.overrideEnabled=!1,this._accentColor="",this.markdown=`## Markdown __rulez__!
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
> Blockquote to the max`}ngOnInit(){this.setHeadings()}ngOnDestroy(){this.resetRenderer()}changeAccentColor(){let e=this.accentColor?` style="color: ${this.accentColor}"`:"";this.overrideRenderer(e),this.markdownService.reload()}overrideRenderer(e){this.overrideEnabled=!0,this.markdownService.renderer.heading=(n,t)=>this.overrideEnabled?`<h${t}${e}>${n}</h${t}>`:!1}resetRenderer(){this.overrideEnabled=!1}setHeadings(){let e=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(n=>e.push(n)),this.headings=e}};a.\u0275fac=function(n){return new(n||a)(c(g),c(v))},a.\u0275cmp=f({type:a,selectors:[["app-rerender"]],standalone:!0,features:[w],decls:20,vars:4,consts:[[3,"headings"],["id","example"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["fxLayout","column","fxFlex.gt-sm","calc(50% - 8px)"],["appearance","fill","color","accent","floatLabel","always","fxFlex",""],["matInput","","placeholder","Ex: red, blue, #00a, etc.",3,"ngModelChange","ngModel"],["appearance","fill","color","accent","fxFlex",""],["matInput","",3,"ngModelChange","ngModel"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data"]],template:function(n,t){n&1&&(r(0,"app-scrollspy-nav-layout",0)(1,"h1"),l(2,"Re-render"),o(),r(3,"markdown"),l(4,`
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
  `),o(),r(5,"section")(6,"h2",1),l(7,"Example"),o(),r(8,"markdown"),l(9,"\n      The example below will apply the `style` attribute on heading elements to customize their colors. This requires markdown to be reloaded because it updates the renderer programmatically to override the `heading` token.\n\n      Although this could be done simply with CSS variables, this is only for demo purposes.\n    "),o(),r(10,"section")(11,"div",2)(12,"div",3)(13,"mat-form-field",4)(14,"mat-label"),l(15,"CSS Color"),o(),r(16,"input",5),u("ngModelChange",function(i){return p(t.accentColor,i)||(t.accentColor=i),i}),o()(),r(17,"mat-form-field",6)(18,"textarea",7),u("ngModelChange",function(i){return p(t.markdown,i)||(t.markdown=i),i}),o()()(),y(19,"markdown",8),o()()()()),n&2&&(m("headings",t.headings),d(16),h("ngModel",t.accentColor),d(2),h("ngModel",t.markdown),d(),m("data",t.markdown))},dependencies:[x,M,S,k,D,_,E,F,C,I,R,L,T,A,b],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:340px}"],changeDetection:0});let s=a;return s})();export{J as default};
