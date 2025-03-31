"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[7293],{1184:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>a});var s=i(4041);const t={},r=s.createContext(t);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(r.Provider,{value:n},e.children)}},4131:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>p,frontMatter:()=>a,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"packages/core/string","title":"String","description":"Lightweight namespace for string manipulation","source":"@site/docs/packages/1-core/string.mdx","sourceDirName":"packages/1-core","slug":"/packages/core/string","permalink":"/std/docs/packages/core/string","draft":false,"unlisted":false,"editUrl":"https://github.com/w5s/std.git/tree/main/apps/website/docs/packages/1-core/string.mdx","tags":[],"version":"current","sidebarPosition":6,"frontMatter":{"sidebar_position":6},"sidebar":"tutorialSidebar","previous":{"title":"Int","permalink":"/std/docs/packages/core/int"}}');var t=i(1085),r=i(1184),o=i(5657);const a={sidebar_position:6},c="String",l={},d=[{value:"Motivation",id:"motivation",level:2},{value:"Usage",id:"usage",level:2},{value:"Coding Guide",id:"coding-guide",level:2},{value:"Prefer <code>String</code> functions over <code>globalThis.String</code>",id:"prefer-string-functions-over-globalthisstring",level:3},{value:"FAQ",id:"faq",level:2}];function h(e){const n={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"string",children:"String"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"Lightweight namespace for string manipulation"}),"\n"]}),"\n",(0,t.jsx)(o.n,{apiHref:"/api/core/namespace/string"}),"\n",(0,t.jsx)(n.h2,{id:"motivation",children:"Motivation"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"globalThis.String"})," functions and methods are very useful but has the following drawbacks :"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Most functions are on the ",(0,t.jsx)(n.code,{children:"prototype"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Since ESM, it creates a double syntax standard ",(0,t.jsx)(n.code,{children:"toDashCase(string)"})," VS ",(0,t.jsx)(n.code,{children:"myString.toLowerCase()"})]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"String.prototype"})," should never be extended"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["Some legacy design decisions","\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"indexOf"}),", ",(0,t.jsx)(n.code,{children:"lastIndexOf"})," returns ",(0,t.jsx)(n.code,{children:"-1"})," when not found"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"String"})," namespace corrects these problems in a pragmatic way :"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Extendable : as an object ",(0,t.jsx)(n.code,{children:"String"})," can be extends with a simple ",(0,t.jsx)(n.code,{children:"{ ...String, myMethod() {} }"})]}),"\n",(0,t.jsxs)(n.li,{children:["Uniform : every ",(0,t.jsx)(n.code,{children:"String"})," function has a string as first parameter"]}),"\n",(0,t.jsxs)(n.li,{children:["Expressive : ",(0,t.jsx)(n.code,{children:"indexOf"})," and ",(0,t.jsx)(n.code,{children:"lastIndexOf"})," returns ",(0,t.jsx)(n.code,{children:"Option<Int>"})]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"import { String, Option, Int } from '@w5s/core';\n\nconst baseName = (path: string): Option<string> => {\n  const positionOption = String.lastIndexOf(expression, '/'); // Option<Int>;\n  const afterLastSlash = Option.match(positionOption, (position) => ({\n    None: () => path, // unchanged when not found\n    Some: (position) => String.slice(path, position + 1), // everything after the last slash\n  });\n  return afterLastSlash;\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,t.jsxs)(n.admonition,{type:"tip",children:[(0,t.jsxs)(n.h3,{id:"prefer-string-functions-over-globalthisstring",children:["Prefer ",(0,t.jsx)(n.code,{children:"String"})," functions over ",(0,t.jsx)(n.code,{children:"globalThis.String"})]}),(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["At best ",(0,t.jsx)(n.code,{children:"String"})," will provide polyfill / better performance / better type safety"]}),"\n",(0,t.jsxs)(n.li,{children:["At worst ",(0,t.jsx)(n.code,{children:"String"})," will call the native function"]}),"\n"]})]}),"\n",(0,t.jsx)(n.h2,{id:"faq",children:"FAQ"})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},5657:(e,n,i)=>{i.d(n,{n:()=>l});var s=i(6279),t=i(6985),r=i(1215);const o={badgeGroup:"badgeGroup_YkPD",badge:"badge_qV9W",apiLink:"apiLink_d4om"};var a=i(1085);const c=(e,n,i)=>{let{siteConfig:s}=e;const t={className:o.badge,key:i.badgeType},r=i.badgeStyle??"flat-square";if(null!=n.packageName)switch(i.badgeType){case"bundle-size":return(0,a.jsx)("img",{...t,alt:"Bundle size",src:`https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(n.packageName)}?style=${r}`});case"npm-license":return(0,a.jsx)("img",{...t,alt:"NPM License",src:`https://img.shields.io/npm/l/${encodeURIComponent(n.packageName)}?style=${r}`});case"npm-version":return(0,a.jsx)("img",{...t,alt:"Github version",src:`https://img.shields.io/npm/v/${encodeURIComponent(n.packageName)}?style=${r}`})}return""};function l(e){const n=(0,r.default)(),{siteConfig:i}=n;return(0,a.jsxs)(a.Fragment,{children:[null==e.apiHref?null:(0,a.jsxs)(s.default,{className:o.apiLink,to:`${i.url}${i.baseUrl.replace(/\/$/,"")}${e.apiHref}`,children:["API ",(0,a.jsx)(t.A,{})]}),["npm-version","npm-license","bundle-size"].map((i=>c(n,e,{badgeType:i})))]})}}}]);