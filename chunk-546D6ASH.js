import{$ as m,A as a,Jb as d,ba as f,g as p,hc as w,na as r,va as o,za as c}from"./chunk-5WVJHME3.js";var t=class t{transform(e,i){return e==null&&(e=""),i==null&&(i=""),typeof e!="string"?(console.error(`LanguagePipe has been invoked with an invalid value type [${typeof e}]`),e):typeof i!="string"?(console.error(`LanguagePipe has been invoked with an invalid parameter [${typeof i}]`),e):"```"+i+`
`+e+"\n```"}};t.\u0275fac=function(i){return new(i||t)},t.\u0275pipe=o({name:"language",type:t,pure:!0});var l=t;var n=class n{constructor(e,i,s,S,h){this.domSanitizer=e;this.elementRef=i;this.markdownService=s;this.viewContainerRef=S;this.zone=h}transform(e,i){return p(this,null,function*(){if(e==null)return"";if(typeof e!="string")return console.error(`MarkdownPipe has been invoked with an invalid value type [${typeof e}]`),e;let s=yield this.markdownService.parse(e,i);return this.zone.onStable.pipe(a()).subscribe(()=>this.markdownService.render(this.elementRef.nativeElement,i,this.viewContainerRef)),this.domSanitizer.bypassSecurityTrustHtml(s)})}};n.\u0275fac=function(i){return new(i||n)(r(d,16),r(f,16),r(w,16),r(c,16),r(m,16))},n.\u0275pipe=o({name:"markdown",type:n,pure:!0});var v=n;export{l as a,v as b};
