(self.webpackChunkdemo=self.webpackChunkdemo||[]).push([[223],{7223:(b,O,e)=>{"use strict";e.r(O),e.d(O,{GetStartedModule:()=>C});var c=e(2268),d=e(4820),t=e(1006),x=e(8393),i=e(4650),u=e(4142),v=e(253);class r{constructor(n){this.elementRef=n}onLoad(){this.stripContent(),this.setHeadings()}setHeadings(){const n=[];this.elementRef.nativeElement.querySelectorAll("h2").forEach(o=>n.push(o)),this.headings=n}stripContent(){this.elementRef.nativeElement.querySelector("markdown").querySelectorAll("markdown > p:nth-child(-n + 2), #ngx-markdown, #table-of-contents + ul, #table-of-contents").forEach(n=>n.remove())}static#t=this.\u0275fac=function(o){return new(o||r)(i.Y36(i.SBq))};static#n=this.\u0275cmp=i.Xpm({type:r,selectors:[["app-get-started"]],decls:4,vars:1,consts:[[3,"headings"],["id","getting-started"],["emoji","","src","https://raw.githubusercontent.com/jfcere/ngx-markdown/master/README.md",3,"load"]],template:function(o,f){1&o&&(i.TgZ(0,"app-scrollspy-nav-layout",0)(1,"h1",1),i._uU(2,"Get Started"),i.qZA(),i.TgZ(3,"markdown",2),i.NdJ("load",function(){return f.onLoad()}),i.qZA()()),2&o&&i.Q6J("headings",f.headings)},dependencies:[u.l,v.c],styles:["[_nghost-%COMP%]{display:block}"],changeDetection:0})}const y=[{path:"",component:r}];class A{static#t=this.\u0275fac=function(o){return new(o||A)};static#n=this.\u0275mod=i.oAB({type:A});static#e=this.\u0275inj=i.cJS({imports:[x.Bz.forChild(y),x.Bz]})}e(842);class C{static#t=this.\u0275fac=function(o){return new(o||C)};static#n=this.\u0275mod=i.oAB({type:C});static#e=this.\u0275inj=i.cJS({imports:[A,c.JP.forChild(),d.U,t.m]})}},253:(b,O,e)=>{"use strict";e.d(O,{c:()=>m});var c=e(7340);const d=(0,c.X$)("zoomAnimation",[(0,c.eR)("void => *",[(0,c.oB)({opacity:0,transform:"translateY(32px) scale(0)"}),(0,c.jt)("400ms cubic-bezier(0.35, 0, 0.25, 1)",(0,c.oB)({opacity:1,transform:"translateY(0) scale(1)"}))]),(0,c.eR)("* => void",[(0,c.oB)({opacity:1,transform:"translateY(0)"}),(0,c.jt)("300ms cubic-bezier(0.35, 0, 0.25, 1)",(0,c.oB)({opacity:0,transform:"translateY(32px)"}))])]);var t=e(4650),x=e(6895),i=e(1576),u=e(5829),v=e(4142),r=e(9818),y=e(8729),A=e(6412),P=e(7224),C=e(8393);function s(p,l){if(1&p&&(t.TgZ(0,"li")(1,"a",2),t._uU(2),t.qZA()()),2&p){const a=l.$implicit;t.xp6(1),t.Q6J("fragment",a.id),t.xp6(1),t.Oqu(a.innerHTML)}}class n{constructor(l,a){this.elementRef=l,this.zone=a}ngOnChanges(l){l.headings?.currentValue&&this.setScrollSpy()}ngOnDestroy(){this.destroyScrollSpy()}destroyScrollSpy(){this.scrollSpy&&this.scrollSpy.destroy()}setScrollSpy(){this.scrollSpy?this.scrollSpy.setup():this.zone.onStable.pipe((0,P.P)()).subscribe(()=>{const l=this.elementRef.nativeElement;this.scrollSpy=new A(`${l.tagName}.${l.className} a`,{offset:64,reflow:!0})})}static#t=this.\u0275fac=function(a){return new(a||n)(t.Y36(t.SBq),t.Y36(t.R0b))};static#n=this.\u0275cmp=t.Xpm({type:n,selectors:[["app-scrollspy-nav"]],inputs:{headings:"headings"},features:[t.TTD],decls:2,vars:1,consts:[[1,"scrollspy-nav"],[4,"ngFor","ngForOf"],["routerLink",".",3,"fragment"]],template:function(a,M){1&a&&(t.TgZ(0,"ul",0),t.YNc(1,s,3,2,"li",1),t.qZA()),2&a&&(t.xp6(1),t.Q6J("ngForOf",M.headings))},dependencies:[x.sg,C.rH],styles:["ul.scrollspy-nav[_ngcontent-%COMP%]{padding:0}ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{border-radius:2px;font-size:14px;font-weight:500;list-style:none;padding:4px 0 4px 16px}ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%], ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:active, ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:focus, ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:hover{text-decoration:none}ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(.active){border-color:transparent;opacity:.6}"],changeDetection:0})}function o(p,l){if(1&p){const a=t.EpF();t.TgZ(0,"button",9),t.NdJ("click",function(){t.CHM(a);const h=t.oxw();return t.KtG(h.onScrollUp())}),t._UZ(1,"img",10),t.qZA()}2&p&&t.Q6J("@zoomAnimation",void 0)}function f(p,l){if(1&p){const a=t.EpF();t.TgZ(0,"button",11),t.NdJ("click",function(){t.CHM(a);const h=t.oxw();return t.KtG(h.onScrollUp())}),t._UZ(1,"img",10),t.qZA()}2&p&&t.Q6J("@zoomAnimation",void 0)}const g=["*"];class m{constructor(){this.showScrollUpButton=!1}onWindowScroll(){this.showScrollUpButton=Math.ceil(window.pageYOffset)>64}onScrollUp(){window.scrollTo(0,0),location.hash=""}static#t=this.\u0275fac=function(a){return new(a||m)};static#n=this.\u0275cmp=t.Xpm({type:m,selectors:[["app-scrollspy-nav-layout"]],hostBindings:function(a,M){1&a&&t.NdJ("scroll",function(){return M.onWindowScroll()},!1,t.Jf7)},inputs:{headings:"headings"},ngContentSelectors:g,decls:14,vars:3,consts:[["fxLayout","row","fxLayoutGap","40px"],["fxFlex","1 1 calc(100% - 220px)"],[1,"footer"],["emoji","","fxLayout","row","fxLayoutAlign.gt-xs","center",1,"footer-text"],[2,"margin","0 .15em"],["class","scrollup-button--fixed","mat-fab","","color","accent","fxHide.gt-sm","",3,"click",4,"ngIf"],["fxLayout","column","fxFlex","1 0 180px","fxFlexAlign","flex-start","fxHide.lt-md","",1,"sticky"],[3,"headings"],["class","scrollup-button","mat-mini-fab","","color","accent",3,"click",4,"ngIf"],["mat-fab","","color","accent","fxHide.gt-sm","",1,"scrollup-button--fixed",3,"click"],["src","assets/icon-chevron-up.svg"],["mat-mini-fab","","color","accent",1,"scrollup-button",3,"click"]],template:function(a,M){1&a&&(t.F$t(),t.TgZ(0,"div",0)(1,"div",1),t.Hsn(2),t.TgZ(3,"div",2),t._UZ(4,"mat-divider"),t.TgZ(5,"markdown",3),t._uU(6," Crafted with :heart: by **jfcere** "),t.TgZ(7,"span",4),t._uU(8,"\u2022"),t.qZA(),t._uU(9," Follow on [GitHub](https://github.com/jfcere) "),t.qZA()(),t.YNc(10,o,2,1,"button",5),t.qZA(),t.TgZ(11,"div",6),t._UZ(12,"app-scrollspy-nav",7),t.YNc(13,f,2,1,"button",8),t.qZA()()),2&a&&(t.xp6(10),t.Q6J("ngIf",M.showScrollUpButton),t.xp6(2),t.Q6J("headings",M.headings),t.xp6(1),t.Q6J("ngIf",M.showScrollUpButton))},dependencies:[x.O5,i.xw,i.SQ,i.Wh,i.XD,i.yH,u.b8,v.l,r.eB,y.d,n],styles:[".footer[_ngcontent-%COMP%]{margin:32px 0 8px}.footer-text[_ngcontent-%COMP%]{display:block;font-size:13px;padding-top:4px}.mat-fab[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .mat-mini-fab[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-bottom:2px}.sticky[_ngcontent-%COMP%]{position:sticky;top:80px}.scrollup-button[_ngcontent-%COMP%]{margin:14px}.scrollup-button--fixed[_ngcontent-%COMP%]{position:fixed;bottom:16px;right:16px}"],data:{animation:[d]},changeDetection:0})}},4820:(b,O,e)=>{"use strict";e.d(O,{U:()=>y});var c=e(6895),d=e(9814),t=e(8729),x=e(9818),i=e(2268),u=e(8393),v=e(4650);class r{static#t=this.\u0275fac=function(C){return new(C||r)};static#n=this.\u0275mod=v.oAB({type:r});static#e=this.\u0275inj=v.cJS({imports:[c.ez,u.Bz]})}class y{static#t=this.\u0275fac=function(C){return new(C||y)};static#n=this.\u0275mod=v.oAB({type:y});static#e=this.\u0275inj=v.cJS({imports:[c.ez,d.o9,i.JP,x.yu,t.t,r]})}},6412:function(b,O){var c,d;d=typeof global<"u"?global:typeof window<"u"?window:this,c=function(){return function(d){"use strict";var t={navClass:"active",contentClass:"active",nested:!1,nestedClass:"active",offset:0,reflow:!1,events:!0},x=function(s,n,o){if(o.settings.events){var f=new CustomEvent(s,{bubbles:!0,cancelable:!0,detail:o});n.dispatchEvent(f)}},i=function(s){var n=0;if(s.offsetParent)for(;s;)n+=s.offsetTop,s=s.offsetParent;return n>=0?n:0},u=function(s){s&&s.sort(function(n,o){return i(n.content)<i(o.content)?-1:1})},v=function(s,n,o){var m,f=s.getBoundingClientRect(),g="function"==typeof(m=n).offset?parseFloat(m.offset()):parseFloat(m.offset);return o?parseInt(f.bottom,10)<(d.innerHeight||document.documentElement.clientHeight):parseInt(f.top,10)<=g},y=function(s,n){var g,m,o=s[s.length-1];if(g=o,m=n,d.innerHeight+d.pageYOffset>=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)&&v(g.content,m,!0))return o;for(var f=s.length-1;f>=0;f--)if(v(s[f].content,n))return s[f]},A=function(s,n){if(n.nested&&s.parentNode){var o=s.parentNode.closest("li");o&&(o.classList.remove(n.nestedClass),A(o,n))}},P=function(s,n){if(s){var o=s.nav.closest("li");o&&(o.classList.remove(n.navClass),s.content.classList.remove(n.contentClass),A(o,n),x("gumshoeDeactivate",o,{link:s.nav,content:s.content,settings:n}))}},C=function(s,n){if(n.nested){var o=s.parentNode.closest("li");o&&(o.classList.add(n.nestedClass),C(o,n))}};return function(s,n){var o,f,g,m,p,l={setup:function(){o=document.querySelectorAll(s),f=[],Array.prototype.forEach.call(o,function(h){var S=document.getElementById(decodeURIComponent(h.hash.substr(1)));S&&f.push({nav:h,content:S})}),u(f)},detect:function(){var h=y(f,p);h?g&&h.content===g.content||(P(g,p),function(S,E){if(S){var B=S.nav.closest("li");B&&(B.classList.add(E.navClass),S.content.classList.add(E.contentClass),C(B,E),x("gumshoeActivate",B,{link:S.nav,content:S.content,settings:E}))}}(h,p),g=h):g&&(P(g,p),g=null)}},a=function(h){m&&d.cancelAnimationFrame(m),m=d.requestAnimationFrame(l.detect)},M=function(h){m&&d.cancelAnimationFrame(m),m=d.requestAnimationFrame(function(){u(f),l.detect()})};return l.destroy=function(){g&&P(g,p),d.removeEventListener("scroll",a,!1),p.reflow&&d.removeEventListener("resize",M,!1),f=null,o=null,g=null,m=null,p=null},p=function(){var h={};return Array.prototype.forEach.call(arguments,function(S){for(var E in S){if(!S.hasOwnProperty(E))return;h[E]=S[E]}}),h}(t,n||{}),l.setup(),l.detect(),d.addEventListener("scroll",a,!1),p.reflow&&d.addEventListener("resize",M,!1),l}}(d)}.apply(O,[]),void 0!==c&&(b.exports=c)},8729:(b,O,e)=>{"use strict";e.d(O,{d:()=>x,t:()=>i});var c=e(4650),d=e(1281),t=e(3238);let x=(()=>{class u{constructor(){this._vertical=!1,this._inset=!1}get vertical(){return this._vertical}set vertical(r){this._vertical=(0,d.Ig)(r)}get inset(){return this._inset}set inset(r){this._inset=(0,d.Ig)(r)}}return u.\u0275fac=function(r){return new(r||u)},u.\u0275cmp=c.Xpm({type:u,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(r,y){2&r&&(c.uIk("aria-orientation",y.vertical?"vertical":"horizontal"),c.ekj("mat-divider-vertical",y.vertical)("mat-divider-horizontal",!y.vertical)("mat-divider-inset",y.inset))},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(r,y){},styles:[".mat-divider{display:block;margin:0;border-top-width:1px;border-top-style:solid}.mat-divider.mat-divider-vertical{border-top:0;border-right-width:1px;border-right-style:solid}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"],encapsulation:2,changeDetection:0}),u})(),i=(()=>{class u{}return u.\u0275fac=function(r){return new(r||u)},u.\u0275mod=c.oAB({type:u}),u.\u0275inj=c.cJS({imports:[t.BQ,t.BQ]}),u})()}}]);