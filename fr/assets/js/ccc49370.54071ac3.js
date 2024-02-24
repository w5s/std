"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[3249],{7363:(e,n,t)=>{t.r(n),t.d(n,{default:()=>p});t(4041);var i=t(4357),a=t(1918),s=t(7473),o=t(4417),l=t(3191),r=t(9932),c=t(9082),d=t(56),u=t(1085);function m(e){const{nextItem:n,prevItem:t}=e;return(0,u.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,c.T)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"}),children:[t&&(0,u.jsx)(d.A,{...t,subLabel:(0,u.jsx)(c.A,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post",children:"Newer Post"})}),n&&(0,u.jsx)(d.A,{...n,subLabel:(0,u.jsx)(c.A,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post",children:"Older Post"}),isNext:!0})]})}function h(){const{assets:e,metadata:n}=(0,o.e)(),{title:t,description:i,date:s,tags:l,authors:r,frontMatter:c}=n,{keywords:d}=c,m=e.image??c.image;return(0,u.jsxs)(a.be,{title:t,description:i,keywords:d,image:m,children:[(0,u.jsx)("meta",{property:"og:type",content:"article"}),(0,u.jsx)("meta",{property:"article:published_time",content:s}),r.some((e=>e.url))&&(0,u.jsx)("meta",{property:"article:author",content:r.map((e=>e.url)).filter(Boolean).join(",")}),l.length>0&&(0,u.jsx)("meta",{property:"article:tag",content:l.map((e=>e.label)).join(",")})]})}var f=t(1017),g=t(4874);function v(e){let{sidebar:n,children:t}=e;const{metadata:i,toc:a}=(0,o.e)(),{nextItem:s,prevItem:c,frontMatter:d,unlisted:h}=i,{hide_table_of_contents:v,toc_min_heading_level:p,toc_max_heading_level:x}=d;return(0,u.jsxs)(l.A,{sidebar:n,toc:!v&&a.length>0?(0,u.jsx)(f.default,{toc:a,minHeadingLevel:p,maxHeadingLevel:x}):void 0,children:[h&&(0,u.jsx)(g.A,{}),(0,u.jsx)(r.A,{children:t}),(s||c)&&(0,u.jsx)(m,{nextItem:s,prevItem:c})]})}function p(e){const n=e.content;return(0,u.jsx)(o.i,{content:e.content,isBlogPostPage:!0,children:(0,u.jsxs)(a.e3,{className:(0,i.A)(s.G.wrapper.blogPages,s.G.page.blogPostPage),children:[(0,u.jsx)(h,{}),(0,u.jsx)(v,{sidebar:e.sidebar,children:(0,u.jsx)(n,{})})]})})}},1017:(e,n,t)=>{t.r(n),t.d(n,{default:()=>c});t(4041);var i=t(4357),a=t(7256);const s={tableOfContents:"tableOfContents_TN1Q",docItemContainer:"docItemContainer_JtJJ"};var o=t(1085);const l="table-of-contents__link toc-highlight",r="table-of-contents__link--active";function c(e){let{className:n,...t}=e;return(0,o.jsx)("div",{className:(0,i.A)(s.tableOfContents,"thin-scrollbar",n),children:(0,o.jsx)(a.A,{...t,linkClassName:l,linkActiveClassName:r})})}},7256:(e,n,t)=>{t.d(n,{A:()=>u});var i=t(4041),a=t(2520),s=t(9585),o=t(1020),l=t(2436),r=t(1085);function c(e){let{toc:n,className:t,linkClassName:i,isChild:a}=e;return n.length?(0,r.jsx)("ul",{className:a?void 0:t,children:n.map((e=>(0,r.jsxs)("li",{children:[(0,r.jsx)(l.default,{to:`#${e.id}`,className:i??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,r.jsx)(c,{isChild:!0,toc:e.children,className:t,linkClassName:i})]},e.id)))}):null}const d=i.memo(c);function u(e){let{toc:n,className:t="table-of-contents table-of-contents__left-border",linkClassName:l="table-of-contents__link",linkActiveClassName:c,minHeadingLevel:u,maxHeadingLevel:m,...h}=e;const f=(0,a.p)(),g=u??f.tableOfContents.minHeadingLevel,v=m??f.tableOfContents.maxHeadingLevel,p=(0,s.h)({toc:n,minHeadingLevel:g,maxHeadingLevel:v}),x=(0,i.useMemo)((()=>{if(l&&c)return{linkClassName:l,linkActiveClassName:c,minHeadingLevel:g,maxHeadingLevel:v}}),[l,c,g,v]);return(0,o.i)(x),(0,r.jsx)(d,{toc:p,className:t,linkClassName:l,...h})}},4874:(e,n,t)=>{t.d(n,{A:()=>c});t(4041);var i=t(4357),a=t(8751),s=t(7473),o=t(9286),l=t(1085);function r(e){let{className:n}=e;return(0,l.jsx)(o.A,{type:"caution",title:(0,l.jsx)(a.Rc,{}),className:(0,i.A)(n,s.G.common.unlistedBanner),children:(0,l.jsx)(a.Uh,{})})}function c(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a.AE,{}),(0,l.jsx)(r,{...e})]})}},1020:(e,n,t)=>{t.d(n,{i:()=>r});var i=t(4041),a=t(2520);function s(e){const n=e.getBoundingClientRect();return n.top===n.bottom?s(e.parentNode):n}function o(e,n){let{anchorTopOffset:t}=n;const i=e.find((e=>s(e).top>=t));if(i){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(s(i))?i:e[e.indexOf(i)-1]??null}return e[e.length-1]??null}function l(){const e=(0,i.useRef)(0),{navbar:{hideOnScroll:n}}=(0,a.p)();return(0,i.useEffect)((()=>{e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function r(e){const n=(0,i.useRef)(void 0),t=l();(0,i.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:i,linkActiveClassName:a,minHeadingLevel:s,maxHeadingLevel:l}=e;function r(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(i),r=function(e){let{minHeadingLevel:n,maxHeadingLevel:t}=e;const i=[];for(let a=n;a<=t;a+=1)i.push(`h${a}.anchor`);return Array.from(document.querySelectorAll(i.join()))}({minHeadingLevel:s,maxHeadingLevel:l}),c=o(r,{anchorTopOffset:t.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,t){t?(n.current&&n.current!==e&&n.current.classList.remove(a),e.classList.add(a),n.current=e):e.classList.remove(a)}(e,e===d)}))}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),()=>{document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}),[e,t])}},9585:(e,n,t)=>{t.d(n,{h:()=>l,v:()=>s});var i=t(4041);function a(e){const n=e.map((e=>({...e,parentIndex:-1,children:[]}))),t=Array(7).fill(-1);n.forEach(((e,n)=>{const i=t.slice(2,e.level);e.parentIndex=Math.max(...i),t[e.level]=n}));const i=[];return n.forEach((e=>{const{parentIndex:t,...a}=e;t>=0?n[t].children.push(a):i.push(a)})),i}function s(e){return(0,i.useMemo)((()=>a(e)),[e])}function o(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:i}=e;return n.flatMap((e=>{const n=o({toc:e.children,minHeadingLevel:t,maxHeadingLevel:i});return function(e){return e.level>=t&&e.level<=i}(e)?[{...e,children:n}]:n}))}function l(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:s}=e;return(0,i.useMemo)((()=>o({toc:a(n),minHeadingLevel:t,maxHeadingLevel:s})),[n,t,s])}},8751:(e,n,t)=>{t.d(n,{AE:()=>r,Rc:()=>o,Uh:()=>l});t(4041);var i=t(9082),a=t(9058),s=t(1085);function o(){return(0,s.jsx)(i.A,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function l(){return(0,s.jsx)(i.A,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function r(){return(0,s.jsx)(a.A,{children:(0,s.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}}}]);