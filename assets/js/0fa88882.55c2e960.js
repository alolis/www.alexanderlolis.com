"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6982],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},u="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(r),m=a,f=u["".concat(s,".").concat(m)]||u[m]||d[m]||o;return r?n.createElement(f,i(i({ref:t},p),{},{components:r})):n.createElement(f,i({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},6739:(e,t,r)=>{r.r(t),r.d(t,{contentTitle:()=>i,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>s});var n=r(7462),a=(r(7294),r(3905));const o={slug:"riding-the-bull",title:"Riding the bull; the npm package, that is",date:new Date("2021-08-16T00:00:00.000Z"),author:"Alexander Lolis",author_url:"https://github.com/alolis",author_image_url:"https://avatars.githubusercontent.com/u/82233?v=4",tags:["development","battlefield","nodejs","javascript"]},i=void 0,l={permalink:"/riding-the-bull",source:"@site/blog/riding-the-bull.md",title:"Riding the bull; the npm package, that is",description:"This is a post about a specific Node.js library, named bull, which is used to execute background jobs.",date:"2021-08-16T00:00:00.000Z",formattedDate:"August 16, 2021",tags:[{label:"development",permalink:"/tags/development"},{label:"battlefield",permalink:"/tags/battlefield"},{label:"nodejs",permalink:"/tags/nodejs"},{label:"javascript",permalink:"/tags/javascript"}],readingTime:21.68,truncated:!0,prevItem:{title:"Node.js fork is slow; Deal with it",permalink:"/node-js-fork-is-slow-deal-with-it"},nextItem:{title:"How to pass the first round of my interviews",permalink:"/how-to-pass-the-first-round-of-my-interviews"}},s=[],c={toc:s},p="wrapper";function u(e){let{components:t,...r}=e;return(0,a.kt)(p,(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"This is a post about a specific ",(0,a.kt)("inlineCode",{parentName:"p"},"Node.js")," library, named ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/OptimalBits/bull"},"bull"),", which is used to execute background jobs. "),(0,a.kt)("p",null,"The reason I am writing this is to address some cases which the library does not cover out of the box and share our experience on how we solved them in case others have the same needs."))}u.isMDXComponent=!0}}]);