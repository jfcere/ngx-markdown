!function(){"use strict";var e,n,r={},t={};function o(e){var n=t[e];if(void 0!==n)return n.exports;var u=t[e]={exports:{}};return r[e].call(u.exports,u,u.exports,o),u.exports}o.m=r,e=[],o.O=function(n,r,t,u){if(!r){var a=1/0;for(f=0;f<e.length;f++){r=e[f][0],t=e[f][1],u=e[f][2];for(var i=!0,c=0;c<r.length;c++)(!1&u||a>=u)&&Object.keys(o.O).every(function(e){return o.O[e](r[c])})?r.splice(c--,1):(i=!1,u<a&&(a=u));i&&(e.splice(f--,1),n=t())}return n}u=u||0;for(var f=e.length;f>0&&e[f-1][2]>u;f--)e[f]=e[f-1];e[f]=[r,t,u]},o.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(n,{a:n}),n},o.d=function(e,n){for(var r in n)o.o(n,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce(function(n,r){return o.f[r](e,n),n},[]))},o.u=function(e){return e+"-es5."+{203:"37b9fa20cfaf5c8ccdde",285:"4c602dd3e0be8c5da404",430:"d8ccf986791bb249e39b",494:"2421a0e75840fe15f7a5",670:"f36082e6686c5fe9b344",716:"cecaa8063015e02ba4df"}[e]+".js"},o.miniCssF=function(e){return"styles.bb27e241eb25052918e9.css"},o.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},n={},o.l=function(e,r,t,u){if(n[e])n[e].push(r);else{var a,i;if(void 0!==t)for(var c=document.getElementsByTagName("script"),f=0;f<c.length;f++){var l=c[f];if(l.getAttribute("src")==e||l.getAttribute("data-webpack")=="ngx-markdown:"+t){a=l;break}}a||(i=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,o.nc&&a.setAttribute("nonce",o.nc),a.setAttribute("data-webpack","ngx-markdown:"+t),a.src=e),n[e]=[r];var d=function(r,t){a.onerror=a.onload=null,clearTimeout(s);var o=n[e];if(delete n[e],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach(function(e){return e(t)}),r)return r(t)},s=setTimeout(d.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=d.bind(null,a.onerror),a.onload=d.bind(null,a.onload),i&&document.head.appendChild(a)}},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.p="",function(){var e={666:0};o.f.j=function(n,r){var t=o.o(e,n)?e[n]:void 0;if(0!==t)if(t)r.push(t[2]);else if(666!=n){var u=new Promise(function(r,o){t=e[n]=[r,o]});r.push(t[2]=u);var a=o.p+o.u(n),i=new Error;o.l(a,function(r){if(o.o(e,n)&&(0!==(t=e[n])&&(e[n]=void 0),t)){var u=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;i.message="Loading chunk "+n+" failed.\n("+u+": "+a+")",i.name="ChunkLoadError",i.type=u,i.request=a,t[1](i)}},"chunk-"+n,n)}else e[n]=0},o.O.j=function(n){return 0===e[n]};var n=function(n,r){var t,u,a=r[0],i=r[1],c=r[2],f=0;for(t in i)o.o(i,t)&&(o.m[t]=i[t]);if(c)var l=c(o);for(n&&n(r);f<a.length;f++)o.o(e,u=a[f])&&e[u]&&e[u][0](),e[a[f]]=0;return o.O(l)},r=self.webpackChunkngx_markdown=self.webpackChunkngx_markdown||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}()}();