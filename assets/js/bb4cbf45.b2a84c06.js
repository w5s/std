"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[2801],{4162:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>o,metadata:()=>i,toc:()=>d});const i=JSON.parse('{"id":"packages/core/int","title":"Int","description":"A tagged type to represent integer values","source":"@site/docs/packages/1-core/int.mdx","sourceDirName":"packages/1-core","slug":"/packages/core/int","permalink":"/std/docs/packages/core/int","draft":false,"unlisted":false,"editUrl":"https://github.com/w5s/std.git/tree/main/apps/website/docs/packages/1-core/int.mdx","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6},"sidebar":"tutorialSidebar","previous":{"title":"Ref","permalink":"/std/docs/packages/core/ref"},"next":{"title":"String","permalink":"/std/docs/packages/core/string"}}');var r=t(1085),s=t(1184),a=t(2940);const o={sidebar_position:6},c="Int",l={},d=[{value:"Motivation",id:"motivation",level:2},{value:"Usage",id:"usage",level:2},{value:"Coding Guide",id:"coding-guide",level:2},{value:"Prefer <code>Int</code> for type safety except when performance are critical",id:"prefer-int-for-type-safety-except-when-performance-are-critical",level:3},{value:"FAQ",id:"faq",level:2}];function p(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"int",children:"Int"})}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:"A tagged type to represent integer values"}),"\n"]}),"\n",(0,r.jsx)(a.n,{apiHref:"/api/core/namespace/int"}),"\n",(0,r.jsx)(n.h2,{id:"motivation",children:"Motivation"}),"\n",(0,r.jsxs)(n.p,{children:["There is no ",(0,r.jsx)(n.code,{children:"int"})," in ",(0,r.jsx)(n.code,{children:"ES"})," only ",(0,r.jsx)(n.code,{children:"number"}),". Nevertheless, there is a notion of ",(0,r.jsx)(n.a,{href:"https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger",children:"Safe Integer"})," which represent an integer value in the range -2^53 to (2^53)-1, without any precision loss.\n",(0,r.jsx)(n.code,{children:"Int"})," is a ",(0,r.jsx)(n.code,{children:"Tag"}),' type that helps to validate at compile time that the value is a "safe integer".']}),"\n",(0,r.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ts",children:"import { Int } from '@w5s/core'\n\nconst one = Int(1);\nconst two = Int(2);\nconst three = Int['+'](one, two); // 3\n"})}),"\n",(0,r.jsx)(n.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,r.jsxs)(n.admonition,{type:"tip",children:[(0,r.jsxs)(n.h3,{id:"prefer-int-for-type-safety-except-when-performance-are-critical",children:["Prefer ",(0,r.jsx)(n.code,{children:"Int"})," for type safety except when performance are critical"]}),(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Int"})," functions are designed to perform integer operations in a type safe way and represent explicitly all possible errors (parsing errors, division by zero, etc)"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"Int"})," functions will never have better performance than inline regular ",(0,r.jsx)(n.code,{children:"number"})," operation"]}),"\n"]})]}),"\n",(0,r.jsx)(n.h2,{id:"faq",children:"FAQ"})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(p,{...e})}):p(e)}},2940:(e,n,t)=>{t.d(n,{n:()=>l});var i=t(2436),r=t(2196),s=t(396);const a={badgeGroup:"badgeGroup_YkPD",badge:"badge_qV9W",apiLink:"apiLink_d4om"};var o=t(1085);const c=(e,n,t)=>{let{siteConfig:i}=e;const r={className:a.badge,key:t.badgeType},s=t.badgeStyle??"flat-square";if(null!=n.packageName)switch(t.badgeType){case"bundle-size":return(0,o.jsx)("img",{...r,alt:"Bundle size",src:`https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(n.packageName)}?style=${s}`});case"npm-license":return(0,o.jsx)("img",{...r,alt:"NPM License",src:`https://img.shields.io/npm/l/${encodeURIComponent(n.packageName)}?style=${s}`});case"npm-version":return(0,o.jsx)("img",{...r,alt:"Github version",src:`https://img.shields.io/npm/v/${encodeURIComponent(n.packageName)}?style=${s}`})}return""};function l(e){const n=(0,s.default)(),{siteConfig:t}=n;return(0,o.jsxs)(o.Fragment,{children:[null==e.apiHref?null:(0,o.jsxs)(i.default,{className:a.apiLink,to:`${t.url}${t.baseUrl.replace(/\/$/,"")}${e.apiHref}`,children:["API ",(0,o.jsx)(r.A,{})]}),["npm-version","npm-license","bundle-size"].map((t=>c(n,e,{badgeType:t})))]})}},1184:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>o});var i=t(4041);const r={},s=i.createContext(r);function a(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);