import{a as F,b as I,c as L,d as _,e as R,f as A,g as N,h as j}from"./chunk-QIXYL4SG.js";import{a as E,b as D}from"./chunk-XJVX5M5X.js";import{Ga as l,H as d,L as g,M as m,ca as y,cc as w,dc as C,fa as c,fc as M,ga as h,lc as f,ma as s,nc as x,oc as k,pc as S,sa as a,ta as i,tc as b,ua as v,za as u}from"./chunk-YJGDTA2A.js";var O=(()=>{let e=class e{get accentColor(){return this._accentColor}set accentColor(t){this._accentColor!==t&&(this._accentColor=t,this.changeAccentColor())}constructor(t,o){this.elementRef=t,this.markdownService=o,this.overrideEnabled=!1,this._accentColor="",this.markdown=`## Markdown __rulez__!
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
> Blockquote to the max`}ngOnInit(){this.setHeadings()}ngOnDestroy(){this.resetRenderer()}changeAccentColor(){let t=this.accentColor?` style="color: ${this.accentColor}"`:"";this.overrideRenderer(t),this.markdownService.reload()}overrideRenderer(t){this.overrideEnabled=!0,this.markdownService.renderer.heading=(o,r)=>this.overrideEnabled?`<h${r}${t}>${o}</h${r}>`:!1}resetRenderer(){this.overrideEnabled=!1}setHeadings(){let t=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(o=>t.push(o)),this.headings=t}};e.\u0275fac=function(o){return new(o||e)(h(y),h(w))},e.\u0275cmp=g({type:e,selectors:[["app-rerender"]],decls:20,vars:4,consts:[[3,"headings"],["id","example"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["fxLayout","column","fxFlex.gt-sm","calc(50% - 8px)"],["appearance","fill","color","accent","floatLabel","always","fxFlex",""],["matInput","","placeholder","Ex: red, blue, #00a, etc.",3,"ngModel","ngModelChange"],["appearance","fill","color","accent","fxFlex",""],["matInput","",3,"ngModel","ngModelChange"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data"]],template:function(o,r){o&1&&(a(0,"app-scrollspy-nav-layout",0)(1,"h1"),l(2,"Re-render"),i(),a(3,"markdown"),l(4,`
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
  `),i(),a(5,"section")(6,"h2",1),l(7,"Example"),i(),a(8,"markdown"),l(9,"\n      The example below will apply the `style` attribute on heading elements to customize their colors. This requires markdown to be reloaded because it updates the renderer programmatically to override the `heading` token.\n\n      Although this could be done simply with CSS variables, this is only for demo purposes.\n    "),i(),a(10,"section")(11,"div",2)(12,"div",3)(13,"mat-form-field",4)(14,"mat-label"),l(15,"CSS Color"),i(),a(16,"input",5),u("ngModelChange",function(p){return r.accentColor=p}),i()(),a(17,"mat-form-field",6)(18,"textarea",7),u("ngModelChange",function(p){return r.markdown=p}),i()()(),v(19,"markdown",8),i()()()()),o&2&&(s("headings",r.headings),c(16),s("ngModel",r.accentColor),c(2),s("ngModel",r.markdown),c(1),s("data",r.markdown))},dependencies:[F,I,L,C,N,A,R,E,x,k,S],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:340px}"],changeDetection:0});let n=e;return n})();var z=[{path:"",component:O}],$=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=m({type:e}),e.\u0275inj=d({imports:[f.forChild(z),f]});let n=e;return n})();var ae=(()=>{let e=class e{};e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=m({type:e}),e.\u0275inj=d({imports:[_,M.forChild(),j,$,D,b]});let n=e;return n})();export{ae as RerenderModule};
