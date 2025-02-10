import{$ as ot,A as st,Ac as Ot,Bc as Lt,Ca as K,Db as xt,Ea as E,Fa as dt,Ga as y,H as lt,Ia as gt,L as rt,La as p,M as N,Ma as h,Mb as yt,Na as F,Nb as Z,Oa as W,Pb as j,R as V,Ra as B,Rb as q,Sc as J,Ta as G,U as z,Ua as ft,V as U,Va as mt,X as $,Zb as St,Zc as kt,_c as Nt,ba as P,bd as Vt,ca as at,cb as M,d as Kt,db as ut,e as Wt,f as C,ic as vt,jc as Ct,ka as ct,kc as wt,lc as Dt,ma as w,mc as It,na as u,nc as Ht,oc as Mt,pc as bt,qc as O,sa as H,ta as A,ua as Y,wc as _t,xc as Et,yb as pt,yc as Ft,zb as ht,zc as jt}from"./chunk-5WVJHME3.js";var zt=Kt((tt,Rt)=>{"use strict";(function(t,i){typeof define=="function"&&define.amd?define([],function(){return i(t)}):typeof tt=="object"?Rt.exports=i(t):t.Gumshoe=i(t)})(typeof global<"u"?global:typeof window<"u"?window:tt,function(t){"use strict";var i={navClass:"active",contentClass:"active",nested:!1,nestedClass:"active",offset:0,reflow:!1,events:!0},e=function(s,l,r){if(r.settings.events){var a=new CustomEvent(s,{bubbles:!0,cancelable:!0,detail:r});l.dispatchEvent(a)}},n=function(s){var l=0;if(s.offsetParent)for(;s;)l+=s.offsetTop,s=s.offsetParent;return l>=0?l:0},o=function(s){s&&s.sort(function(l,r){return n(l.content)<n(r.content)?-1:1})},g=function(s,l,r){var a=s.getBoundingClientRect(),c=function(d){return typeof d.offset=="function"?parseFloat(d.offset()):parseFloat(d.offset)}(l);return r?parseInt(a.bottom,10)<(t.innerHeight||document.documentElement.clientHeight):parseInt(a.top,10)<=c},D=function(){return t.innerHeight+t.pageYOffset>=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},I=function(s,l){var r=s[s.length-1];if(function(c,d){return!(!D()||!g(c.content,d,!0))}(r,l))return r;for(var a=s.length-1;a>=0;a--)if(g(s[a].content,l))return s[a]},L=function(s,l){if(l.nested&&s.parentNode){var r=s.parentNode.closest("li");r&&(r.classList.remove(l.nestedClass),L(r,l))}},R=function(s,l){if(s){var r=s.nav.closest("li");r&&(r.classList.remove(l.navClass),s.content.classList.remove(l.contentClass),L(r,l),e("gumshoeDeactivate",r,{link:s.nav,content:s.content,settings:l}))}},et=function(s,l){if(l.nested){var r=s.parentNode.closest("li");r&&(r.classList.add(l.nestedClass),et(r,l))}};return function(s,l){var r,a,c,d,x,S={};S.setup=function(){r=document.querySelectorAll(s),a=[],Array.prototype.forEach.call(r,function(f){var m=document.getElementById(decodeURIComponent(f.hash.substr(1)));m&&a.push({nav:f,content:m})}),o(a)},S.detect=function(){var f=I(a,x);f?c&&f.content===c.content||(R(c,x),function(m,v){if(m){var k=m.nav.closest("li");k&&(k.classList.add(v.navClass),m.content.classList.add(v.contentClass),et(k,v),e("gumshoeActivate",k,{link:m.nav,content:m.content,settings:v}))}}(f,x),c=f):c&&(R(c,x),c=null)};var it=function(f){d&&t.cancelAnimationFrame(d),d=t.requestAnimationFrame(S.detect)},nt=function(f){d&&t.cancelAnimationFrame(d),d=t.requestAnimationFrame(function(){o(a),S.detect()})};return S.destroy=function(){c&&R(c,x),t.removeEventListener("scroll",it,!1),x.reflow&&t.removeEventListener("resize",nt,!1),a=null,r=null,c=null,d=null,x=null},x=function(){var f={};return Array.prototype.forEach.call(arguments,function(m){for(var v in m){if(!m.hasOwnProperty(v))return;f[v]=m[v]}}),f}(i,l||{}),S.setup(),S.detect(),t.addEventListener("scroll",it,!1),x.reflow&&t.addEventListener("resize",nt,!1),S}})});var Gt=(()=>{class t extends It{buildStyles(e,n){return{display:e==="true"?n.display||(n.isServer?"initial":""):"none"}}}return t.\u0275fac=(()=>{let i;return function(n){return(i||(i=$(t)))(n||t)}})(),t.\u0275prov=rt({token:t,factory:t.\u0275fac,providedIn:"root"}),t})(),Zt=(()=>{class t extends bt{constructor(e,n,o,g,D,I,L){super(e,n,o,g),this.layoutConfig=D,this.platformId=I,this.serverModuleLoaded=L,this.DIRECTIVE_KEY="show-hide",this.display="",this.hasLayout=!1,this.hasFlexChild=!1}ngAfterViewInit(){this.trackExtraTriggers();let e=Array.from(this.nativeElement.children);for(let o=0;o<e.length;o++)if(this.marshal.hasValue(e[o],"flex")){this.hasFlexChild=!0;break}X.has(this.nativeElement)?this.display=X.get(this.nativeElement):(this.display=this.getDisplayStyle(),X.set(this.nativeElement,this.display)),this.init();let n=this.marshal.getValue(this.nativeElement,this.DIRECTIVE_KEY,"");n===void 0||n===""?this.setValue(!0,""):this.triggerUpdate()}ngOnChanges(e){Object.keys(e).forEach(n=>{if(this.inputs.indexOf(n)!==-1){let o=n.split("."),g=o.slice(1).join("."),D=e[n].currentValue,I=D!==""?D!==0?O(D):!1:!0;o[0]==="fxHide"&&(I=!I),this.setValue(I,g)}})}trackExtraTriggers(){this.hasLayout=this.marshal.hasValue(this.nativeElement,"layout"),["layout","layout-align"].forEach(e=>{this.marshal.trackValue(this.nativeElement,e).pipe(lt(this.destroySubject)).subscribe(this.triggerUpdate.bind(this))})}getDisplayStyle(){return this.hasLayout||this.hasFlexChild&&this.layoutConfig.addFlexToParent?"flex":this.styler.lookupStyle(this.nativeElement,"display",!0)}updateWithValue(e=!0){if(e==="")return;let n=xt(this.platformId);this.addStyles(e?"true":"false",{display:this.display,isServer:n}),n&&this.serverModuleLoaded&&this.nativeElement.style.setProperty("display",""),this.marshal.triggerUpdate(this.parentElement,"layout-gap")}}return t.\u0275fac=function(e){return new(e||t)(u(P),u(Gt),u(Ht),u(Mt),u(wt),u(at),u(Dt))},t.\u0275dir=Y({type:t,standalone:!1,features:[K,V]}),t})(),X=new WeakMap,qt=["fxShow","fxShow.print","fxShow.xs","fxShow.sm","fxShow.md","fxShow.lg","fxShow.xl","fxShow.lt-sm","fxShow.lt-md","fxShow.lt-lg","fxShow.lt-xl","fxShow.gt-xs","fxShow.gt-sm","fxShow.gt-md","fxShow.gt-lg","fxHide","fxHide.print","fxHide.xs","fxHide.sm","fxHide.md","fxHide.lg","fxHide.xl","fxHide.lt-sm","fxHide.lt-md","fxHide.lt-lg","fxHide.lt-xl","fxHide.gt-xs","fxHide.gt-sm","fxHide.gt-md","fxHide.gt-lg"];var Pt=(()=>{class t extends Zt{constructor(){super(...arguments),this.inputs=qt}}return t.\u0275fac=(()=>{let i;return function(n){return(i||(i=$(t)))(n||t)}})(),t.\u0275dir=Y({type:t,selectors:[["","fxShow",""],["","fxShow.print",""],["","fxShow.xs",""],["","fxShow.sm",""],["","fxShow.md",""],["","fxShow.lg",""],["","fxShow.xl",""],["","fxShow.lt-sm",""],["","fxShow.lt-md",""],["","fxShow.lt-lg",""],["","fxShow.lt-xl",""],["","fxShow.gt-xs",""],["","fxShow.gt-sm",""],["","fxShow.gt-md",""],["","fxShow.gt-lg",""],["","fxHide",""],["","fxHide.print",""],["","fxHide.xs",""],["","fxHide.sm",""],["","fxHide.md",""],["","fxHide.lg",""],["","fxHide.xl",""],["","fxHide.lt-sm",""],["","fxHide.lt-md",""],["","fxHide.lt-lg",""],["","fxHide.lt-xl",""],["","fxHide.gt-xs",""],["","fxHide.gt-sm",""],["","fxHide.gt-md",""],["","fxHide.gt-lg",""]],inputs:{fxShow:"fxShow","fxShow.print":"fxShow.print","fxShow.xs":"fxShow.xs","fxShow.sm":"fxShow.sm","fxShow.md":"fxShow.md","fxShow.lg":"fxShow.lg","fxShow.xl":"fxShow.xl","fxShow.lt-sm":"fxShow.lt-sm","fxShow.lt-md":"fxShow.lt-md","fxShow.lt-lg":"fxShow.lt-lg","fxShow.lt-xl":"fxShow.lt-xl","fxShow.gt-xs":"fxShow.gt-xs","fxShow.gt-sm":"fxShow.gt-sm","fxShow.gt-md":"fxShow.gt-md","fxShow.gt-lg":"fxShow.gt-lg",fxHide:"fxHide","fxHide.print":"fxHide.print","fxHide.xs":"fxHide.xs","fxHide.sm":"fxHide.sm","fxHide.md":"fxHide.md","fxHide.lg":"fxHide.lg","fxHide.xl":"fxHide.xl","fxHide.lt-sm":"fxHide.lt-sm","fxHide.lt-md":"fxHide.lt-md","fxHide.lt-lg":"fxHide.lt-lg","fxHide.lt-xl":"fxHide.lt-xl","fxHide.gt-xs":"fxHide.gt-xs","fxHide.gt-sm":"fxHide.gt-sm","fxHide.gt-md":"fxHide.gt-md","fxHide.gt-lg":"fxHide.gt-lg"},standalone:!1,features:[K]}),t})();var At=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=A({type:t}),t.\u0275inj=N({imports:[Ct]}),t})();var Bt=(()=>{let i=class i{constructor(){C(this,"_vertical",!1);C(this,"_inset",!1)}get vertical(){return this._vertical}set vertical(n){this._vertical=O(n)}get inset(){return this._inset}set inset(n){this._inset=O(n)}};C(i,"\u0275fac",function(o){return new(o||i)}),C(i,"\u0275cmp",H({type:i,selectors:[["mat-divider"]],hostAttrs:["role","separator",1,"mat-divider"],hostVars:7,hostBindings:function(o,g){o&2&&(dt("aria-orientation",g.vertical?"vertical":"horizontal"),gt("mat-divider-vertical",g.vertical)("mat-divider-horizontal",!g.vertical)("mat-divider-inset",g.inset))},inputs:{vertical:"vertical",inset:"inset"},decls:0,vars:0,template:function(o,g){},styles:[".mat-divider{display:block;margin:0;border-top-style:solid;border-top-color:var(--mat-divider-color, var(--mat-sys-outline));border-top-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-vertical{border-top:0;border-right-style:solid;border-right-color:var(--mat-divider-color, var(--mat-sys-outline));border-right-width:var(--mat-divider-width, 1px)}.mat-divider.mat-divider-inset{margin-left:80px}[dir=rtl] .mat-divider.mat-divider-inset{margin-left:auto;margin-right:80px}"],encapsulation:2,changeDetection:0}));let t=i;return t})(),Tt=(()=>{let i=class i{};C(i,"\u0275fac",function(o){return new(o||i)}),C(i,"\u0275mod",A({type:i})),C(i,"\u0275inj",N({imports:[J,J]}));let t=i;return t})();var Ut=Wt(zt());function te(t,i){if(t&1&&(p(0,"li")(1,"a",2),M(2),h()()),t&2){let e=i.$implicit;w(),y("fragment",e.id),w(),ut(e.innerHTML)}}var b=class b{constructor(i,e){this.elementRef=i;this.zone=e}ngOnChanges(i){var e;(e=i.headings)!=null&&e.currentValue&&this.setScrollSpy()}ngOnDestroy(){this.destroyScrollSpy()}destroyScrollSpy(){this.scrollSpy&&this.scrollSpy.destroy()}setScrollSpy(){if(this.scrollSpy){this.scrollSpy.setup();return}this.zone.onStable.pipe(st()).subscribe(()=>{let i=this.elementRef.nativeElement,e=`${i.tagName}.${i.className} a`;this.scrollSpy=new Ut.default(e,{offset:64,reflow:!0})})}};b.\u0275fac=function(e){return new(e||b)(u(P),u(ot))},b.\u0275cmp=H({type:b,selectors:[["app-scrollspy-nav"]],inputs:{headings:"headings"},features:[V],decls:2,vars:1,consts:[[1,"scrollspy-nav"],[4,"ngFor","ngForOf"],["routerLink",".",3,"fragment"]],template:function(e,n){e&1&&(p(0,"ul",0),E(1,te,3,2,"li",1),h()),e&2&&(w(),y("ngForOf",n.headings))},dependencies:[pt,St],styles:["ul.scrollspy-nav[_ngcontent-%COMP%]{padding:0}ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{border-radius:2px;font-size:14px;font-weight:500;list-style:none;padding:4px 0 4px 16px}ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%], ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:active, ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:focus, ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] > a[_ngcontent-%COMP%]:hover{text-decoration:none}ul.scrollspy-nav[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:not(.active){border-color:transparent;opacity:.6}"],changeDetection:0});var T=b;var $t=yt("zoomAnimation",[q("void => *",[j({opacity:0,transform:"translateY(32px) scale(0)"}),Z("400ms cubic-bezier(0.35, 0, 0.25, 1)",j({opacity:1,transform:"translateY(0) scale(1)"}))]),q("* => void",[j({opacity:1,transform:"translateY(0)"}),Z("300ms cubic-bezier(0.35, 0, 0.25, 1)",j({opacity:0,transform:"translateY(32px)"}))])]);var ee=["*"];function ie(t,i){if(t&1){let e=W();p(0,"button",9),B("click",function(){z(e);let o=G();return U(o.onScrollUp())}),F(1,"img",10),h()}t&2&&y("@zoomAnimation",void 0)}function ne(t,i){if(t&1){let e=W();p(0,"button",11),B("click",function(){z(e);let o=G();return U(o.onScrollUp())}),F(1,"img",10),h()}t&2&&y("@zoomAnimation",void 0)}var _=class _{constructor(){this.showScrollUpButton=!1}onWindowScroll(){this.showScrollUpButton=Math.ceil(window.pageYOffset)>64}onScrollUp(){window.scrollTo(0,0),location.hash=""}};_.\u0275fac=function(e){return new(e||_)},_.\u0275cmp=H({type:_,selectors:[["app-scrollspy-nav-layout"]],hostBindings:function(e,n){e&1&&B("scroll",function(){return n.onWindowScroll()},!1,ct)},inputs:{headings:"headings"},ngContentSelectors:ee,decls:14,vars:3,consts:[["fxLayout","row","fxLayoutGap","40px"],["fxFlex","1 1 calc(100% - 220px)"],[1,"footer"],["emoji","","fxLayout","row","fxLayoutAlign.gt-xs","center",1,"footer-text"],[2,"margin","0 .15em"],["class","scrollup-button--fixed","mat-fab","","color","accent","fxHide.gt-sm","",3,"click",4,"ngIf"],["fxLayout","column","fxFlex","1 0 180px","fxFlexAlign","flex-start","fxHide.lt-md","",1,"sticky"],[3,"headings"],["class","scrollup-button","mat-mini-fab","","color","accent",3,"click",4,"ngIf"],["mat-fab","","color","accent","fxHide.gt-sm","",1,"scrollup-button--fixed",3,"click"],["src","icon-chevron-up.svg"],["mat-mini-fab","","color","accent",1,"scrollup-button",3,"click"]],template:function(e,n){e&1&&(ft(),p(0,"div",0)(1,"div",1),mt(2),p(3,"div",2),F(4,"mat-divider"),p(5,"markdown",3),M(6," Crafted with :heart: by **jfcere** "),p(7,"span",4),M(8,"\u2022"),h(),M(9," Follow on [GitHub](https://github.com/jfcere) "),h()(),E(10,ie,2,1,"button",5),h(),p(11,"div",6),F(12,"app-scrollspy-nav",7),E(13,ne,2,1,"button",8),h()()),e&2&&(w(10),y("ngIf",n.showScrollUpButton),w(2),y("headings",n.headings),w(),y("ngIf",n.showScrollUpButton))},dependencies:[At,Pt,Lt,_t,Et,Ot,jt,Ft,vt,Vt,Nt,kt,Tt,Bt,ht,T],styles:[".footer[_ngcontent-%COMP%]{margin:32px 0 8px}.footer-text[_ngcontent-%COMP%]{display:block;font-size:13px;padding-top:4px}.sticky[_ngcontent-%COMP%]{position:sticky;top:80px}.scrollup-button[_ngcontent-%COMP%]{margin:14px}.scrollup-button--fixed[_ngcontent-%COMP%]{position:fixed;bottom:16px;right:16px}.scrollup-button[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:flex}"],data:{animation:[$t]},changeDetection:0});var Yt=_;export{Yt as a};
