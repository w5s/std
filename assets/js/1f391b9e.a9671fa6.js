"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[3085],{8398:(e,n,t)=>{t.r(n),t.d(n,{default:()=>u});t(2784);var a=t(2978),i=t(8162),s=t(211),l=t(1110),r=t(5480),c=t(8188),o=t(9376);const d={mdxPageWrapper:"mdxPageWrapper_SLvB"};var m=t(2322);function u(e){const{content:n}=e,{metadata:{title:t,description:u,frontMatter:f,unlisted:v},assets:h}=n,{keywords:g,wrapperClassName:x,hide_table_of_contents:p}=f,L=h.image??f.image;return(0,m.jsx)(i.FG,{className:(0,a.Z)(x??s.k.wrapper.mdxPages,s.k.page.mdxPage),children:(0,m.jsxs)(l.Z,{children:[(0,m.jsx)(i.d,{title:t,description:u,keywords:g,image:L}),(0,m.jsx)("main",{className:"container container--fluid margin-vert--lg",children:(0,m.jsxs)("div",{className:(0,a.Z)("row",d.mdxPageWrapper),children:[(0,m.jsxs)("div",{className:(0,a.Z)("col",!p&&"col--8"),children:[v&&(0,m.jsx)(o.Z,{}),(0,m.jsx)("article",{children:(0,m.jsx)(r.default,{children:(0,m.jsx)(n,{})})})]}),!p&&n.toc.length>0&&(0,m.jsx)("div",{className:"col col--2",children:(0,m.jsx)(c.default,{toc:n.toc,minHeadingLevel:f.toc_min_heading_level,maxHeadingLevel:f.toc_max_heading_level})})]})})]})})}},8188:(e,n,t)=>{t.r(n),t.d(n,{default:()=>o});t(2784);var a=t(2978),i=t(3125);const s={tableOfContents:"tableOfContents_TN1Q",docItemContainer:"docItemContainer_JtJJ"};var l=t(2322);const r="table-of-contents__link toc-highlight",c="table-of-contents__link--active";function o(e){let{className:n,...t}=e;return(0,l.jsx)("div",{className:(0,a.Z)(s.tableOfContents,"thin-scrollbar",n),children:(0,l.jsx)(i.Z,{...t,linkClassName:r,linkActiveClassName:c})})}},3125:(e,n,t)=>{t.d(n,{Z:()=>m});var a=t(2784),i=t(7683),s=t(1072),l=t(4115),r=t(9817),c=t(2322);function o(e){let{toc:n,className:t,linkClassName:a,isChild:i}=e;return n.length?(0,c.jsx)("ul",{className:i?void 0:t,children:n.map((e=>(0,c.jsxs)("li",{children:[(0,c.jsx)(r.default,{to:`#${e.id}`,className:a??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,c.jsx)(o,{isChild:!0,toc:e.children,className:t,linkClassName:a})]},e.id)))}):null}const d=a.memo(o);function m(e){let{toc:n,className:t="table-of-contents table-of-contents__left-border",linkClassName:r="table-of-contents__link",linkActiveClassName:o,minHeadingLevel:m,maxHeadingLevel:u,...f}=e;const v=(0,i.L)(),h=m??v.tableOfContents.minHeadingLevel,g=u??v.tableOfContents.maxHeadingLevel,x=(0,s.b)({toc:n,minHeadingLevel:h,maxHeadingLevel:g}),p=(0,a.useMemo)((()=>{if(r&&o)return{linkClassName:r,linkActiveClassName:o,minHeadingLevel:h,maxHeadingLevel:g}}),[r,o,h,g]);return(0,l.S)(p),(0,c.jsx)(d,{toc:x,className:t,linkClassName:r,...f})}},9376:(e,n,t)=>{t.d(n,{Z:()=>o});t(2784);var a=t(2978),i=t(6631),s=t(211),l=t(4602),r=t(2322);function c(e){let{className:n}=e;return(0,r.jsx)(l.Z,{type:"caution",title:(0,r.jsx)(i.cI,{}),className:(0,a.Z)(n,s.k.common.unlistedBanner),children:(0,r.jsx)(i.eU,{})})}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.T$,{}),(0,r.jsx)(c,{...e})]})}},4115:(e,n,t)=>{t.d(n,{S:()=>c});var a=t(2784),i=t(7683);function s(e){const n=e.getBoundingClientRect();return n.top===n.bottom?s(e.parentNode):n}function l(e,n){let{anchorTopOffset:t}=n;const a=e.find((e=>s(e).top>=t));if(a){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(s(a))?a:e[e.indexOf(a)-1]??null}return e[e.length-1]??null}function r(){const e=(0,a.useRef)(0),{navbar:{hideOnScroll:n}}=(0,i.L)();return(0,a.useEffect)((()=>{e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function c(e){const n=(0,a.useRef)(void 0),t=r();(0,a.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:a,linkActiveClassName:i,minHeadingLevel:s,maxHeadingLevel:r}=e;function c(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(a),c=function(e){let{minHeadingLevel:n,maxHeadingLevel:t}=e;const a=[];for(let i=n;i<=t;i+=1)a.push(`h${i}.anchor`);return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:s,maxHeadingLevel:r}),o=l(c,{anchorTopOffset:t.current}),d=e.find((e=>o&&o.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,t){t?(n.current&&n.current!==e&&n.current.classList.remove(i),e.classList.add(i),n.current=e):e.classList.remove(i)}(e,e===d)}))}return document.addEventListener("scroll",c),document.addEventListener("resize",c),c(),()=>{document.removeEventListener("scroll",c),document.removeEventListener("resize",c)}}),[e,t])}},1072:(e,n,t)=>{t.d(n,{a:()=>s,b:()=>r});var a=t(2784);function i(e){const n=e.map((e=>({...e,parentIndex:-1,children:[]}))),t=Array(7).fill(-1);n.forEach(((e,n)=>{const a=t.slice(2,e.level);e.parentIndex=Math.max(...a),t[e.level]=n}));const a=[];return n.forEach((e=>{const{parentIndex:t,...i}=e;t>=0?n[t].children.push(i):a.push(i)})),a}function s(e){return(0,a.useMemo)((()=>i(e)),[e])}function l(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:a}=e;return n.flatMap((e=>{const n=l({toc:e.children,minHeadingLevel:t,maxHeadingLevel:a});return function(e){return e.level>=t&&e.level<=a}(e)?[{...e,children:n}]:n}))}function r(e){let{toc:n,minHeadingLevel:t,maxHeadingLevel:s}=e;return(0,a.useMemo)((()=>l({toc:i(n),minHeadingLevel:t,maxHeadingLevel:s})),[n,t,s])}},6631:(e,n,t)=>{t.d(n,{T$:()=>c,cI:()=>l,eU:()=>r});t(2784);var a=t(1077),i=t(9854),s=t(2322);function l(){return(0,s.jsx)(a.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function r(){return(0,s.jsx)(a.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function c(){return(0,s.jsx)(i.Z,{children:(0,s.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}}}]);