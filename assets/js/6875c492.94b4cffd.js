"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[8610],{9404:(e,t,a)=>{a.r(t),a.d(t,{default:()=>m});var l=a(7294),s=a(9748),r=a(8997),n=a(6742),o=a(5601),c=a(4973),g=a(9306);const m=function(e){const{metadata:t,items:a,sidebar:m}=e,{allTagsPath:i,name:p,count:u}=t,d=function(){const{selectMessage:e}=(0,g.c2)();return t=>e(t,(0,c.I)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:t}))}(),h=(0,c.I)({id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",message:'{nPosts} tagged with "{tagName}"'},{nPosts:d(u),tagName:p});return l.createElement(s.Z,{title:h,wrapperClassName:g.kM.wrapper.blogPages,pageClassName:g.kM.page.blogTagsPostPage,searchMetadatas:{tag:"blog_tags_posts"}},l.createElement("div",{className:"container margin-vert--lg"},l.createElement("div",{className:"row"},l.createElement("aside",{className:"col col--3"},l.createElement(o.Z,{sidebar:m})),l.createElement("main",{className:"col col--7"},l.createElement("header",{className:"margin-bottom--xl"},l.createElement("h1",null,h),l.createElement(n.Z,{href:i},l.createElement(c.Z,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page"},"View All Tags"))),a.map((e=>{let{content:t}=e;return l.createElement(r.Z,{key:t.metadata.permalink,frontMatter:t.frontMatter,metadata:t.metadata,truncated:!0},l.createElement(t,null))}))))))}}}]);