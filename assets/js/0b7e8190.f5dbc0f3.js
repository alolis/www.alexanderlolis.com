"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[7180],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),f=s(n),d=a,m=f["".concat(l,".").concat(d)]||f[d]||u[d]||o;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8210:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return f}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],c={slug:"javascript-objects-cachification",title:"JavaScript Objects Cachification",date:new Date("2020-12-19T00:00:00.000Z"),description:"Wrapping your JavaScript Objects with caching capabilities",author:"Alexander Lolis",author_url:"https://github.com/alolis",author_image_url:"https://avatars.githubusercontent.com/u/82233?v=4",tags:["development","javascript","nodejs","caching","battlefield"]},l=void 0,s={permalink:"/javascript-objects-cachification",source:"@site/blog/javascript-objects-cachification.md",title:"JavaScript Objects Cachification",description:"Wrapping your JavaScript Objects with caching capabilities",date:"2020-12-19T00:00:00.000Z",formattedDate:"December 19, 2020",tags:[{label:"development",permalink:"/tags/development"},{label:"javascript",permalink:"/tags/javascript"},{label:"nodejs",permalink:"/tags/nodejs"},{label:"caching",permalink:"/tags/caching"},{label:"battlefield",permalink:"/tags/battlefield"}],readingTime:13.985,truncated:!0,prevItem:{title:"My 2020 reads",permalink:"/my-2020-reads"},nextItem:{title:"How to tag data in Redis",permalink:"/how-to-tag-data-in-redis"}},p=[],u={toc:p};function f(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"In one of our backend services, we have a class, that is basically the business model of the service and is used in many locations within the code. At some point, we decided that we need to do some caching since a few methods were doing very expensive calls to other remote services and they didn\u2019t need to occur that often."),(0,o.kt)("p",null,"How do you add caching to a ",(0,o.kt)("inlineCode",{parentName:"p"},"class")," that is used very often within the rest of the codebase in the least intrusive way? You wrap the ",(0,o.kt)("inlineCode",{parentName:"p"},"prototype")," of the ",(0,o.kt)("inlineCode",{parentName:"p"},"class")," of course! And how do you wrap the prototype of the class? With another function that does the wrapping of course!"))}f.isMDXComponent=!0}}]);