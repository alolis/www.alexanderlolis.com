"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[4013],{5601:(e,t,a)=>{a.d(t,{Z:()=>m});var s=a(7294),r=a(6010),l=a(6742);const i={sidebar:"sidebar_q+wC",sidebarItemTitle:"sidebarItemTitle_9G5K",sidebarItemList:"sidebarItemList_6T4b",sidebarItem:"sidebarItem_cjdF",sidebarItemLink:"sidebarItemLink_zyXk",sidebarItemLinkActive:"sidebarItemLinkActive_wcJs"};var n=a(4973);function m(e){let{sidebar:t}=e;return 0===t.items.length?null:s.createElement("nav",{className:(0,r.Z)(i.sidebar,"thin-scrollbar"),"aria-label":(0,n.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},s.createElement("div",{className:(0,r.Z)(i.sidebarItemTitle,"margin-bottom--md")},t.title),s.createElement("ul",{className:i.sidebarItemList},t.items.map((e=>s.createElement("li",{key:e.permalink,className:i.sidebarItem},s.createElement(l.Z,{isNavLink:!0,to:e.permalink,className:i.sidebarItemLink,activeClassName:i.sidebarItemLinkActive},e.title))))))}},94:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var s=a(7294),r=a(9748),l=a(6742),i=a(5601),n=a(4973),m=a(9306);const c=function(e){const{tags:t,sidebar:a}=e,c=(0,n.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"}),b={};Object.keys(t).forEach((e=>{const t=function(e){return e[0].toUpperCase()}(e);b[t]=b[t]||[],b[t].push(e)}));const d=Object.entries(b).sort(((e,t)=>{let[a]=e,[s]=t;return a.localeCompare(s)})).map((e=>{let[a,r]=e;return s.createElement("article",{key:a},s.createElement("h2",null,a),r.map((e=>s.createElement(l.Z,{className:"padding-right--md",href:t[e].permalink,key:e},t[e].name," (",t[e].count,")"))),s.createElement("hr",null))})).filter((e=>null!=e));return s.createElement(r.Z,{title:c,wrapperClassName:m.kM.wrapper.blogPages,pageClassName:m.kM.page.blogTagsListPage,searchMetadatas:{tag:"blog_tags_list"}},s.createElement("div",{className:"container margin-vert--lg"},s.createElement("div",{className:"row"},s.createElement("aside",{className:"col col--3"},s.createElement(i.Z,{sidebar:a})),s.createElement("main",{className:"col col--7"},s.createElement("h1",null,c),s.createElement("section",{className:"margin-vert--lg"},d)))))}}}]);