import{a as b,b as _,c as E,d as F,e as D,f as L,g as R,h as I,i as A}from"./chunk-7WI3NGJG.js";import"./chunk-ZWLPU56G.js";import{a as C,b as x}from"./chunk-UL67FB7Q.js";import{Ba as c,Ga as r,Ha as o,Ia as g,O as u,Za as a,ab as m,bb as p,cb as h,cc as w,da as f,eb as y,la as d,ma as s,pc as v,qc as M,rc as S,uc as k}from"./chunk-ZQROOWMS.js";var $=(()=>{class l{get accentColor(){return this._accentColor}set accentColor(e){this._accentColor!==e&&(this._accentColor=e,this.changeAccentColor())}constructor(e,n){this.elementRef=e,this.markdownService=n,this.overrideEnabled=!1,this._accentColor="",this.markdown=`## Markdown __rulez__!
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
> Blockquote to the max`}ngOnInit(){this.setHeadings()}ngOnDestroy(){this.resetRenderer()}changeAccentColor(){let e=this.accentColor?` style="color: ${this.accentColor}"`:"";this.overrideRenderer(e),this.markdownService.reload()}overrideRenderer(e){this.overrideEnabled=!0,this.markdownService.renderer.heading=(n,t)=>this.overrideEnabled?`<h${t}${e}>${n}</h${t}>`:!1}resetRenderer(){this.overrideEnabled=!1}setHeadings(){let e=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(n=>e.push(n)),this.headings=e}static{this.\u0275fac=function(n){return new(n||l)(s(f),s(w))}}static{this.\u0275cmp=u({type:l,selectors:[["app-rerender"]],standalone:!0,features:[y],decls:20,vars:4,consts:[[3,"headings"],["id","example"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["fxLayout","column","fxFlex.gt-sm","calc(50% - 8px)"],["appearance","fill","color","accent","floatLabel","always","fxFlex",""],["matInput","","placeholder","Ex: red, blue, #00a, etc.",3,"ngModelChange","ngModel"],["appearance","fill","color","accent","fxFlex",""],["matInput","",3,"ngModelChange","ngModel"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data"]],template:function(n,t){n&1&&(r(0,"app-scrollspy-nav-layout",0)(1,"h1"),a(2,"Re-render"),o(),r(3,"markdown"),a(4,`
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
  `),o(),r(5,"section")(6,"h2",1),a(7,"Example"),o(),r(8,"markdown"),a(9,"\n      The example below will apply the `style` attribute on heading elements to customize their colors. This requires markdown to be reloaded because it updates the renderer programmatically to override the `heading` token.\n\n      Although this could be done simply with CSS variables, this is only for demo purposes.\n    "),o(),r(10,"section")(11,"div",2)(12,"div",3)(13,"mat-form-field",4)(14,"mat-label"),a(15,"CSS Color"),o(),r(16,"input",5),h("ngModelChange",function(i){return p(t.accentColor,i)||(t.accentColor=i),i}),o()(),r(17,"mat-form-field",6)(18,"textarea",7),h("ngModelChange",function(i){return p(t.markdown,i)||(t.markdown=i),i}),o()()(),g(19,"markdown",8),o()()()()),n&2&&(c("headings",t.headings),d(16),m("ngModel",t.accentColor),d(2),m("ngModel",t.markdown),d(),c("data",t.markdown))},dependencies:[k,v,M,S,F,b,_,E,C,R,L,D,A,I,x],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:340px}"],changeDetection:0})}}return l})();export{$ as default};
