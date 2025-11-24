import{a as b,b as E,c as D,d as _,e as L,f as F,g as R,h as A,i as I,j as O}from"./chunk-HEYIWR6G.js";import"./chunk-WZZDBH3D.js";import{a as w,b as S}from"./chunk-65Z2A63L.js";import{A as s,Ac as k,Dc as x,Ja as m,Ka as r,La as n,Ma as y,da as g,fb as a,ib as c,jb as p,jc as v,kb as h,la as d,ua as f,yc as C,zc as M}from"./chunk-J25UQQLT.js";var l=class l{constructor(){this.elementRef=s(g);this.markdownService=s(v);this.overrideEnabled=!1;this._accentColor="";this.markdown=`## Markdown rulez!
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
> Blockquote to the max`}get accentColor(){return this._accentColor}set accentColor(e){this._accentColor!==e&&(this._accentColor=e,this.changeAccentColor())}ngOnInit(){this.setHeadings()}ngOnDestroy(){this.resetRenderer()}changeAccentColor(){let e=this.accentColor?` style="color: ${this.accentColor}"`:"";this.overrideRenderer(e),this.markdownService.reload()}overrideRenderer(e){this.overrideEnabled=!0,this.markdownService.renderer.heading=({text:o,depth:t})=>this.overrideEnabled?`<h${t}${e}>${o}</h${t}>`:!1}resetRenderer(){this.overrideEnabled=!1}setHeadings(){let e=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(o=>e.push(o)),this.headings=e}};l.\u0275fac=function(o){return new(o||l)},l.\u0275cmp=f({type:l,selectors:[["app-rerender"]],decls:20,vars:4,consts:[[3,"headings"],["id","example"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["fxLayout","column","fxFlex.gt-sm","calc(50% - 8px)"],["appearance","fill","color","accent","floatLabel","always","fxFlex",""],["matInput","","placeholder","Ex: red, blue, #00a, etc.",3,"ngModelChange","ngModel"],["appearance","fill","color","accent","fxFlex",""],["matInput","","cdkTextareaAutosize","true",3,"ngModelChange","ngModel"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data"]],template:function(o,t){o&1&&(r(0,"app-scrollspy-nav-layout",0)(1,"h1"),a(2,"Re-render"),n(),r(3,"markdown"),a(4,`
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
  `),n(),r(5,"section")(6,"h2",1),a(7,"Example"),n(),r(8,"markdown"),a(9,"\n      The example below will apply the `style` attribute on heading elements to customize their colors. This requires markdown to be reloaded because it updates the renderer programmatically to override the `heading` token.\n\n      Although this could be done simply with CSS variables, this is only for demo purposes.\n    "),n(),r(10,"section")(11,"div",2)(12,"div",3)(13,"mat-form-field",4)(14,"mat-label"),a(15,"CSS Color"),n(),r(16,"input",5),h("ngModelChange",function(i){return p(t.accentColor,i)||(t.accentColor=i),i}),n()(),r(17,"mat-form-field",6)(18,"textarea",7),h("ngModelChange",function(i){return p(t.markdown,i)||(t.markdown=i),i}),n()()(),y(19,"markdown",8),n()()()()),o&2&&(m("headings",t.headings),d(16),c("ngModel",t.accentColor),d(2),c("ngModel",t.markdown),d(),m("data",t.markdown))},dependencies:[x,C,M,k,_,b,E,D,w,R,F,L,O,I,A,S],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:340px}"],changeDetection:0});var u=l;export{u as default};
