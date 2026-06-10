import {y as yr,Z as Zt,v as vr,_ as _n,a as at,F as Fi,i as it,I as Io,S as So,s as so}from'./chunk-BtKC-bEP.js';import {h,X,l as fE,L as Le,Z as Z4,H as H4,z as z4,G as G4,D as Dc,B as Bh,F as Fh,b as Gb,w as wT,P as PC,j as jc,S as Sb,f as fn,c as zb,d as BC}from'./main-KA6DQZIU.js';import {U,e as et}from'./chunk-5rUGPa-d.js';var l=class l{constructor(){this.elementRef=h(X);this.markdownService=h(fE);this.overrideEnabled=false;this._accentColor="";this.markdown=`## Markdown rulez!
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
> Blockquote to the max`;}get accentColor(){return this._accentColor}set accentColor(e){this._accentColor!==e&&(this._accentColor=e,this.changeAccentColor());}ngOnInit(){this.setHeadings();}ngOnDestroy(){this.resetRenderer();}changeAccentColor(){let e=this.accentColor?` style="color: ${this.accentColor}"`:"";this.overrideRenderer(e),this.markdownService.reload();}overrideRenderer(e){this.overrideEnabled=true,this.markdownService.renderer.heading=({text:o,depth:t})=>this.overrideEnabled?`<h${t}${e}>${o}</h${t}>`:false;}resetRenderer(){this.overrideEnabled=false;}setHeadings(){let e=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(o=>e.push(o)),this.headings=e;}};l.\u0275fac=function(o){return new(o||l)},l.\u0275cmp=Le({type:l,selectors:[["app-rerender"]],decls:20,vars:4,consts:[[3,"headings"],["id","example"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["fxLayout","column","fxFlex.gt-sm","calc(50% - 8px)"],["appearance","fill","color","accent","floatLabel","always","fxFlex",""],["matInput","","placeholder","Ex: red, blue, #00a, etc.",3,"ngModelChange","ngModel"],["appearance","fill","color","accent","fxFlex",""],["matInput","","cdkTextareaAutosize","true",3,"ngModelChange","ngModel"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data"]],template:function(o,t){o&1&&(Dc(0,"app-scrollspy-nav-layout",0)(1,"h1"),Bh(2,"Re-render"),Fh(),Dc(3,"markdown"),Bh(4,`
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
  `),Fh(),Dc(5,"section")(6,"h2",1),Bh(7,"Example"),Fh(),Dc(8,"markdown"),Bh(9,"\n      The example below will apply the `style` attribute on heading elements to customize their colors. This requires markdown to be reloaded because it updates the renderer programmatically to override the `heading` token.\n\n      Although this could be done simply with CSS variables, this is only for demo purposes.\n    "),Fh(),Dc(10,"section")(11,"div",2)(12,"div",3)(13,"mat-form-field",4)(14,"mat-label"),Bh(15,"CSS Color"),Fh(),Dc(16,"input",5),Gb("ngModelChange",function(i){return wT(t.accentColor,i)||(t.accentColor=i),i}),Fh(),PC(),Fh(),Dc(17,"mat-form-field",6)(18,"textarea",7),Gb("ngModelChange",function(i){return wT(t.markdown,i)||(t.markdown=i),i}),Fh(),PC(),Fh()(),jc(19,"markdown",8),Fh()()()()),o&2&&(Sb("headings",t.headings),fn(16),zb("ngModel",t.accentColor),BC(),fn(2),zb("ngModel",t.markdown),BC(),fn(),Sb("data",t.markdown));},dependencies:[Z4,H4,z4,G4,yr,Zt,vr,_n,U,at,Fi,it,Io,So,so,et],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:340px}"]});var f=l;export{f as default};