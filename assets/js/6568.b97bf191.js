(self.webpackChunkblog=self.webpackChunkblog||[]).push([[6568],{3905:function(e,t,r){"use strict";r.d(t,{Zo:function(){return u},kt:function(){return d}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},u=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},p=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=s(r),d=a,h=p["".concat(c,".").concat(d)]||p[d]||m[d]||l;return r?n.createElement(h,o(o({ref:t},u),{},{components:r})):n.createElement(h,o({ref:t},u))}));function d(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,o=new Array(l);o[0]=p;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,o[1]=i;for(var s=2;s<l;s++)o[s]=r[s];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}p.displayName="MDXCreateElement"},8711:function(e,t,r){"use strict";r.d(t,{Z:function(){return K}});var n=r(7294),a=r(6010),l=r(3905),o=r(4973),i=r(6742),c=r(9306),s=r(7462),u={plain:{backgroundColor:"#2a2734",color:"#9a86fd"},styles:[{types:["comment","prolog","doctype","cdata","punctuation"],style:{color:"#6c6783"}},{types:["namespace"],style:{opacity:.7}},{types:["tag","operator","number"],style:{color:"#e09142"}},{types:["property","function"],style:{color:"#9a86fd"}},{types:["tag-id","selector","atrule-id"],style:{color:"#eeebff"}},{types:["attr-name"],style:{color:"#c4b9fe"}},{types:["boolean","string","entity","url","attr-value","keyword","control","directive","unit","statement","regex","at-rule","placeholder","variable"],style:{color:"#ffcc99"}},{types:["deleted"],style:{textDecorationLine:"line-through"}},{types:["inserted"],style:{textDecorationLine:"underline"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["important"],style:{color:"#c4b9fe"}}]},m={Prism:r(7410).Z,theme:u};function p(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function d(){return(d=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}var h=/\r\n|\r|\n/,g=function(e){0===e.length?e.push({types:["plain"],content:"\n",empty:!0}):1===e.length&&""===e[0].content&&(e[0].content="\n",e[0].empty=!0)},y=function(e,t){var r=e.length;return r>0&&e[r-1]===t?e:e.concat(t)},f=function(e,t){var r=e.plain,n=Object.create(null),a=e.styles.reduce((function(e,r){var n=r.languages,a=r.style;return n&&!n.includes(t)||r.types.forEach((function(t){var r=d({},e[t],a);e[t]=r})),e}),n);return a.root=r,a.plain=d({},r,{backgroundColor:null}),a};function v(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&-1===t.indexOf(n)&&(r[n]=e[n]);return r}var b=function(e){function t(){for(var t=this,r=[],n=arguments.length;n--;)r[n]=arguments[n];e.apply(this,r),p(this,"getThemeDict",(function(e){if(void 0!==t.themeDict&&e.theme===t.prevTheme&&e.language===t.prevLanguage)return t.themeDict;t.prevTheme=e.theme,t.prevLanguage=e.language;var r=e.theme?f(e.theme,e.language):void 0;return t.themeDict=r})),p(this,"getLineProps",(function(e){var r=e.key,n=e.className,a=e.style,l=d({},v(e,["key","className","style","line"]),{className:"token-line",style:void 0,key:void 0}),o=t.getThemeDict(t.props);return void 0!==o&&(l.style=o.plain),void 0!==a&&(l.style=void 0!==l.style?d({},l.style,a):a),void 0!==r&&(l.key=r),n&&(l.className+=" "+n),l})),p(this,"getStyleForToken",(function(e){var r=e.types,n=e.empty,a=r.length,l=t.getThemeDict(t.props);if(void 0!==l){if(1===a&&"plain"===r[0])return n?{display:"inline-block"}:void 0;if(1===a&&!n)return l[r[0]];var o=n?{display:"inline-block"}:{},i=r.map((function(e){return l[e]}));return Object.assign.apply(Object,[o].concat(i))}})),p(this,"getTokenProps",(function(e){var r=e.key,n=e.className,a=e.style,l=e.token,o=d({},v(e,["key","className","style","token"]),{className:"token "+l.types.join(" "),children:l.content,style:t.getStyleForToken(l),key:void 0});return void 0!==a&&(o.style=void 0!==o.style?d({},o.style,a):a),void 0!==r&&(o.key=r),n&&(o.className+=" "+n),o})),p(this,"tokenize",(function(e,t,r,n){var a={code:t,grammar:r,language:n,tokens:[]};e.hooks.run("before-tokenize",a);var l=a.tokens=e.tokenize(a.code,a.grammar,a.language);return e.hooks.run("after-tokenize",a),l}))}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.render=function(){var e=this.props,t=e.Prism,r=e.language,n=e.code,a=e.children,l=this.getThemeDict(this.props),o=t.languages[r];return a({tokens:function(e){for(var t=[[]],r=[e],n=[0],a=[e.length],l=0,o=0,i=[],c=[i];o>-1;){for(;(l=n[o]++)<a[o];){var s=void 0,u=t[o],m=r[o][l];if("string"==typeof m?(u=o>0?u:["plain"],s=m):(u=y(u,m.type),m.alias&&(u=y(u,m.alias)),s=m.content),"string"==typeof s){var p=s.split(h),d=p.length;i.push({types:u,content:p[0]});for(var f=1;f<d;f++)g(i),c.push(i=[]),i.push({types:u,content:p[f]})}else o++,t.push(u),r.push(s),n.push(0),a.push(s.length)}o--,t.pop(),r.pop(),n.pop(),a.pop()}return g(i),c}(void 0!==o?this.tokenize(t,n,o,r):[n]),className:"prism-code language-"+r,style:void 0!==l?l.root:{},getLineProps:this.getLineProps,getTokenProps:this.getTokenProps})},t}(n.Component);var k=r(7594),E=r.n(k),N={plain:{color:"#bfc7d5",backgroundColor:"#292d3e"},styles:[{types:["comment"],style:{color:"rgb(105, 112, 152)",fontStyle:"italic"}},{types:["string","inserted"],style:{color:"rgb(195, 232, 141)"}},{types:["number"],style:{color:"rgb(247, 140, 108)"}},{types:["builtin","char","constant","function"],style:{color:"rgb(130, 170, 255)"}},{types:["punctuation","selector"],style:{color:"rgb(199, 146, 234)"}},{types:["variable"],style:{color:"rgb(191, 199, 213)"}},{types:["class-name","attr-name"],style:{color:"rgb(255, 203, 107)"}},{types:["tag","deleted"],style:{color:"rgb(255, 85, 114)"}},{types:["operator"],style:{color:"rgb(137, 221, 255)"}},{types:["boolean"],style:{color:"rgb(255, 88, 116)"}},{types:["keyword"],style:{fontStyle:"italic"}},{types:["doctype"],style:{color:"rgb(199, 146, 234)",fontStyle:"italic"}},{types:["namespace"],style:{color:"rgb(178, 204, 214)"}},{types:["url"],style:{color:"rgb(221, 221, 221)"}}]},j=r(5350),T=function(){var e=(0,c.LU)().prism,t=(0,j.Z)().isDarkTheme,r=e.theme||N,n=e.darkTheme||r;return t?n:r},O="codeBlockContainer_K1bP",_="codeBlockContent_hGly",Z="codeBlockTitle_eoMF",x="codeBlock_23N8",P="codeBlockWithTitle_2JqI",w="copyButton_Ue-o",L="codeBlockLines_39YC",C=/{([\d,-]+)}/,D=function(e){void 0===e&&(e=["js","jsBlock","jsx","python","html"]);var t={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},python:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},r=["highlight-next-line","highlight-start","highlight-end"].join("|"),n=e.map((function(e){return"(?:"+t[e].start+"\\s*("+r+")\\s*"+t[e].end+")"})).join("|");return new RegExp("^\\s*(?:"+n+")\\s*$")};function B(e){var t=e.children,r=e.className,l=e.metastring,i=e.title,u=(0,c.LU)().prism,p=(0,n.useState)(!1),d=p[0],h=p[1],g=(0,n.useState)(!1),y=g[0],f=g[1];(0,n.useEffect)((function(){f(!0)}),[]);var v=(0,c.bc)(l)||i,k=(0,n.useRef)(null),N=[],j=T(),B=Array.isArray(t)?t.join(""):t;if(l&&C.test(l)){var I=l.match(C)[1];N=E()(I).filter((function(e){return e>0}))}var S=r&&r.replace(/language-/,"");!S&&u.defaultLanguage&&(S=u.defaultLanguage);var A=B.replace(/\n$/,"");if(0===N.length&&void 0!==S){for(var R,U="",z=function(e){switch(e){case"js":case"javascript":case"ts":case"typescript":return D(["js","jsBlock"]);case"jsx":case"tsx":return D(["js","jsBlock","jsx"]);case"html":return D(["js","jsBlock","html"]);case"python":case"py":return D(["python"]);default:return D()}}(S),F=B.replace(/\n$/,"").split("\n"),M=0;M<F.length;){var $=M+1,V=F[M].match(z);if(null!==V){switch(V.slice(1).reduce((function(e,t){return e||t}),void 0)){case"highlight-next-line":U+=$+",";break;case"highlight-start":R=$;break;case"highlight-end":U+=R+"-"+($-1)+","}F.splice(M,1)}else M+=1}N=E()(U),A=F.join("\n")}var q=function(){!function(e,t){var r=(void 0===t?{}:t).target,n=void 0===r?document.body:r,a=document.createElement("textarea"),l=document.activeElement;a.value=e,a.setAttribute("readonly",""),a.style.contain="strict",a.style.position="absolute",a.style.left="-9999px",a.style.fontSize="12pt";var o=document.getSelection(),i=!1;o.rangeCount>0&&(i=o.getRangeAt(0)),n.append(a),a.select(),a.selectionStart=0,a.selectionEnd=e.length;var c=!1;try{c=document.execCommand("copy")}catch(s){}a.remove(),i&&(o.removeAllRanges(),o.addRange(i)),l&&l.focus()}(A),h(!0),setTimeout((function(){return h(!1)}),2e3)};return n.createElement(b,(0,s.Z)({},m,{key:String(y),theme:j,code:A,language:S}),(function(e){var t,r=e.className,l=e.style,i=e.tokens,c=e.getLineProps,u=e.getTokenProps;return n.createElement("div",{className:O},v&&n.createElement("div",{style:l,className:Z},v),n.createElement("div",{className:(0,a.Z)(_,S)},n.createElement("pre",{tabIndex:0,className:(0,a.Z)(r,x,"thin-scrollbar",(t={},t[P]=v,t)),style:l},n.createElement("code",{className:L},i.map((function(e,t){1===e.length&&""===e[0].content&&(e[0].content="\n");var r=c({line:e,key:t});return N.includes(t+1)&&(r.className+=" docusaurus-highlight-code-line"),n.createElement("span",(0,s.Z)({key:t},r),e.map((function(e,t){return n.createElement("span",(0,s.Z)({key:t},u({token:e,key:t})))})))})))),n.createElement("button",{ref:k,type:"button","aria-label":(0,o.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:(0,a.Z)(w,"clean-btn"),onClick:q},d?n.createElement(o.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):n.createElement(o.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy"))))}))}var I=r(3366),S="enhancedAnchor_2LWZ",A="h1Heading_27L5",R=["id"],U=function(e){var t=Object.assign({},e);return n.createElement("header",null,n.createElement("h1",(0,s.Z)({},t,{id:void 0,className:A}),t.children))},z=function(e){return"h1"===e?U:(t=e,function(e){var r,l=e.id,i=(0,I.Z)(e,R),s=(0,c.LU)().navbar.hideOnScroll;return l?n.createElement(t,i,n.createElement("a",{"aria-hidden":"true",tabIndex:-1,className:(0,a.Z)("anchor",(r={},r[S]=!s,r)),id:l}),i.children,n.createElement("a",{className:"hash-link",href:"#"+l,title:(0,o.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"#")):n.createElement(t,i)});var t},F={code:function(e){var t=e.children;return(0,n.isValidElement)(t)?t:t.includes("\n")?n.createElement(B,e):n.createElement("code",e)},a:function(e){return n.createElement(i.Z,e)},pre:function(e){var t,r=e.children;return(0,n.isValidElement)(null==r||null==(t=r.props)?void 0:t.children)?null==r?void 0:r.props.children:n.createElement(B,(0,n.isValidElement)(r)?null==r?void 0:r.props:{children:r})},h1:z("h1"),h2:z("h2"),h3:z("h3"),h4:z("h4"),h5:z("h5"),h6:z("h6")},M=r(1217),$="iconEdit_2_ui",V=["className"],q=function(e){var t=e.className,r=(0,I.Z)(e,V);return n.createElement("svg",(0,s.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,a.Z)($,t),"aria-hidden":"true"},r),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))};function W(e){var t=e.editUrl;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener"},n.createElement(q,null),n.createElement(o.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var G="blogPostTitle_GeHD",H="blogPostData_291c",J="blogPostDetailsFull_3kfx";var K=function(e){var t,r,s,u=(r=(0,c.c2)().selectMessage,function(e){var t=Math.ceil(e);return r(t,(0,o.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),m=e.children,p=e.frontMatter,d=e.metadata,h=e.truncated,g=e.isBlogPostPage,y=void 0!==g&&g,f=d.date,v=d.formattedDate,b=d.permalink,k=d.tags,E=d.readingTime,N=d.title,j=d.editUrl,T=p.author,O=p.image,_=p.keywords,Z=p.author_url||p.authorURL,x=p.author_title||p.authorTitle,P=p.author_image_url||p.authorImageURL;return n.createElement(n.Fragment,null,n.createElement(M.Z,{keywords:_,image:O}),n.createElement("article",{className:y?void 0:"margin-bottom--xl"},(s=y?"h1":"h2",n.createElement("header",null,n.createElement(s,{className:G},y?N:n.createElement(i.Z,{to:b},N)),n.createElement("div",{className:(0,a.Z)(H,"margin-vert--md")},n.createElement("time",{dateTime:f},v),E&&n.createElement(n.Fragment,null," \xb7 ",u(E))),n.createElement("div",{className:"avatar margin-vert--md"},P&&n.createElement(i.Z,{className:"avatar__photo-link avatar__photo",href:Z},n.createElement("img",{src:P,alt:T})),n.createElement("div",{className:"avatar__intro"},T&&n.createElement(n.Fragment,null,n.createElement("div",{className:"avatar__name"},n.createElement(i.Z,{href:Z},T)),n.createElement("small",{className:"avatar__subtitle"},x)))))),n.createElement("div",{className:"markdown"},n.createElement(l.Zo,{components:F},m)),(k.length>0||h)&&n.createElement("footer",{className:(0,a.Z)("row docusaurus-mt-lg",(t={},t[J]=y,t))},k.length>0&&n.createElement("div",{className:"col"},n.createElement("b",null,n.createElement(o.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),k.map((function(e){var t=e.label,r=e.permalink;return n.createElement(i.Z,{key:r,className:"margin-horiz--sm",to:r},t)}))),y&&j&&n.createElement("div",{className:"col margin-top--sm"},n.createElement(W,{editUrl:j})),!y&&h&&n.createElement("div",{className:"col text--right"},n.createElement(i.Z,{to:d.permalink,"aria-label":"Read more about "+N},n.createElement("b",null,n.createElement(o.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More")))))))}},5601:function(e,t,r){"use strict";r.d(t,{Z:function(){return d}});var n=r(7294),a=r(6010),l=r(6742),o="sidebar_2ahu",i="sidebarItemTitle_2hhb",c="sidebarItemList_2xAf",s="sidebarItem_2UVv",u="sidebarItemLink_1RT6",m="sidebarItemLinkActive_12pM",p=r(4973);function d(e){var t=e.sidebar;return 0===t.items.length?null:n.createElement("nav",{className:(0,a.Z)(o,"thin-scrollbar"),"aria-label":(0,p.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},n.createElement("div",{className:(0,a.Z)(i,"margin-bottom--md")},t.title),n.createElement("ul",{className:c},t.items.map((function(e){return n.createElement("li",{key:e.permalink,className:s},n.createElement(l.Z,{isNavLink:!0,to:e.permalink,className:u,activeClassName:m},e.title))}))))}},7594:function(e,t){function r(e){let t,r=[];for(let n of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(n))r.push(parseInt(n,10));else if(t=n.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,n,a,l]=t;if(n&&l){n=parseInt(n),l=parseInt(l);const e=n<l?1:-1;"-"!==a&&".."!==a&&"\u2025"!==a||(l+=e);for(let t=n;t!==l;t+=e)r.push(t)}}return r}t.default=r,e.exports=r}}]);