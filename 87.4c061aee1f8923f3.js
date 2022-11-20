"use strict";(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[87],{3087:(g,s,t)=>{t.r(s),t.d(s,{BindingsModule:()=>m});var o=t(4006),c=t(3161),u=t(2268),w=t(4820),y=t(1006),h=t(8393),n=t(4650),f=t(4142),Z=t(8455),k=t(253),l=t(1576),x=t(6627),v=t(9353);class r{constructor(a){this.elementRef=a,this.demoPython=t(1107).Z,this.languagePipe=t(4679).Z,this.markdown='### Markdown example\n---\nThis is an **example** where we bind a variable to the `markdown` component that is also bind to a textarea.\n\n#### example.component.ts\n```typescript\npublic markdown = "# Markdown";\n```\n\n#### example.component.html\n```html\n<textarea [(ngModel)]="markdown"></textarea>\n<markdown [data]="markdown"></markdown>\n```',this.typescriptMarkdown="import { Component } from '@angular/core';\n\n@Component({\n  selector: 'markdown-demo',\n  templateUrl: './markdown-demo.component.html',\n  styleUrls: ['./markdown-demo.component.scss'],\n})\nexport class MarkdownDemoComponent {\n  public pipeMarkdown = '# Markdown';\n}"}ngOnInit(){this.setHeadings()}setHeadings(){const a=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(e=>a.push(e)),this.headings=a}static#n=this.\u0275fac=function(e){return new(e||r)(n.Y36(n.SBq))};static#t=this.\u0275cmp=n.Xpm({type:r,selectors:[["app-bindings"]],decls:46,vars:19,consts:[[3,"headings"],["id","remote-url"],[3,"src"],["markdown","",3,"src"],["id","variable-binding"],["fxLayout","column","fxLayout.gt-sm","row","fxLayoutGap","16px"],["appearance","fill","color","accent","fxFlex.gt-sm","calc(50% - 8px)"],["matInput","",3,"ngModel","ngModelChange"],["fxFlex.gt-sm","calc(50% - 8px)",3,"data"],["id","pipe-usage"],["fxFlex.gt-sm","calc(50% - 8px)",3,"innerHTML"]],template:function(e,i){1&e&&(n.TgZ(0,"app-scrollspy-nav-layout",0)(1,"h1"),n._uU(2,"Bindings"),n.qZA(),n.TgZ(3,"section")(4,"h2",1),n._uU(5,"Remote Url"),n.qZA(),n.TgZ(6,"markdown"),n._uU(7," Using component with `src` property to fetch remote markdown file `app/bindings/remote/demo.md` "),n.qZA(),n._UZ(8,"markdown",2),n.TgZ(9,"markdown"),n._uU(10," Using component with static `python` code block "),n.qZA(),n.TgZ(11,"markdown"),n._uU(12),n.ALo(13,"language"),n.qZA(),n.TgZ(14,"markdown"),n._uU(15," Using directive with `src` property to fetch remote html file `app/bindings/remote/demo.html` "),n.qZA(),n._UZ(16,"div",3),n.TgZ(17,"markdown"),n._uU(18," Using directive with `src` property to fetch remote C++ file `app/bindings/remote/demo.cpp` "),n.qZA(),n._UZ(19,"div",3),n.qZA(),n.TgZ(20,"section")(21,"h2",4),n._uU(22,"Variable Binding"),n.qZA(),n.TgZ(23,"markdown"),n._uU(24," Using component or directive with `data` property allow to bind a variable that will update the DOM when value changes "),n.qZA(),n.TgZ(25,"div",5)(26,"mat-form-field",6)(27,"textarea",7),n.NdJ("ngModelChange",function(p){return i.markdown=p}),n.qZA()(),n._UZ(28,"markdown",8),n.qZA(),n.TgZ(29,"markdown"),n._uU(30," Using `language` pipe you can specify the language of the variable content for synthax highlights "),n.qZA(),n._UZ(31,"markdown",2),n.qZA(),n.TgZ(32,"section")(33,"h2",9),n._uU(34,"Pipe Usage"),n.qZA(),n.TgZ(35,"markdown"),n._uU(36," Using `markdown` pipe to transform markdown to HTML allow you to chain pipe transformations and will update the DOM when value changes "),n.qZA(),n._UZ(37,"markdown",2),n.TgZ(38,"markdown"),n._uU(39," In the following example using the synthax above, `typescriptMarkdown` property does not contain any `back-ticks` to set the content language but will be chain with `language` pipe instead to specify synthax highlights language along with `markdown` pipe for conversion "),n.qZA(),n.TgZ(40,"div",5)(41,"mat-form-field",6)(42,"textarea",7),n.NdJ("ngModelChange",function(p){return i.typescriptMarkdown=p}),n.qZA()(),n._UZ(43,"div",10),n.ALo(44,"markdown"),n.ALo(45,"language"),n.qZA()()()),2&e&&(n.Q6J("headings",i.headings),n.xp6(8),n.Q6J("src","app/bindings/remote/demo.md"),n.xp6(4),n.Oqu(n.xi3(13,11,i.demoPython,"python")),n.xp6(4),n.Q6J("src","app/bindings/remote/demo.html"),n.xp6(3),n.Q6J("src","app/bindings/remote/demo.cpp"),n.xp6(8),n.Q6J("ngModel",i.markdown),n.xp6(1),n.Q6J("data",i.markdown),n.xp6(3),n.Q6J("src","app/bindings/remote/language-pipe.html"),n.xp6(6),n.Q6J("src","app/bindings/remote/markdown-pipe.html"),n.xp6(5),n.Q6J("ngModel",i.typescriptMarkdown),n.xp6(1),n.Q6J("innerHTML",n.lcZ(44,14,n.xi3(45,16,i.typescriptMarkdown,"typescript")),n.oJD))},dependencies:[o.Fj,o.JJ,o.On,f.l,Z.v_,c.k0,k.c,l.xw,l.SQ,l.yH,x.A,v.N],styles:["[_nghost-%COMP%]{display:block}textarea[_ngcontent-%COMP%]{min-height:360px}"],changeDetection:0})}const U=[{path:"",component:r}];class d{static#n=this.\u0275fac=function(e){return new(e||d)};static#t=this.\u0275mod=n.oAB({type:d});static#e=this.\u0275inj=n.cJS({imports:[h.Bz.forChild(U),h.Bz]})}t(842);class m{static#n=this.\u0275fac=function(e){return new(e||m)};static#t=this.\u0275mod=n.oAB({type:m});static#e=this.\u0275inj=n.cJS({imports:[d,o.u5,u.JP.forChild(),c.x4,w.U,y.m]})}},1107:(g,s,t)=>{t.d(s,{Z:()=>o});const o='s = "Python syntax highlighting"\nprint s'},4679:(g,s,t)=>{t.d(s,{Z:()=>o});const o="<markdown [data]=\"markdown | language : 'typescript'\"></markdown>"}}]);