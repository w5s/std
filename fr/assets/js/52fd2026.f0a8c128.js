"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[7666],{7521:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var s=t(1085),a=t(1184),r=t(2940);const i={sidebar_position:5},o="Ref",l={id:"packages/core/ref",title:"Ref",description:"A type safe and functional way to handle mutable references to value",source:"@site/docs/packages/1-core/ref.mdx",sourceDirName:"packages/1-core",slug:"/packages/core/ref",permalink:"/std/fr/docs/packages/core/ref",draft:!1,unlisted:!1,editUrl:"https://github.com/w5s/std.git/tree/main/apps/website/docs/packages/1-core/ref.mdx",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"Result",permalink:"/std/fr/docs/packages/core/result"},next:{title:"Int",permalink:"/std/fr/docs/packages/core/int"}},c={},d=[{value:"Motivation",id:"motivation",level:2},{value:"Usage",id:"usage",level:2},{value:"Read / Write <code>value</code>",id:"read--write-value",level:2},{value:"Coding Guide",id:"coding-guide",level:2},{value:"Always Ref in the following cases",id:"always-ref-in-the-following-cases",level:3},{value:"Always use immutable values everywhere and use <code>Ref</code> for mutations",id:"always-use-immutable-values-everywhere-and-use-ref-for-mutations",level:3},{value:"FAQ",id:"faq",level:2}];function u(e){const n={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"ref",children:"Ref"})}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"A type safe and functional way to handle mutable references to value"}),"\n"]}),"\n",(0,s.jsx)(r.n,{apiHref:"/api/core/namespace/ref"}),"\n",(0,s.jsx)(n.h2,{id:"motivation",children:"Motivation"}),"\n",(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"Ref"})," type represents a mutable value that can be shared over the program."]}),"\n",(0,s.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { Ref } from '@w5s/core';\n\nconst counter = Ref(0);\nconst increment = () => {\n  counter.value = counter.value + 1;\n};\n\nincrement();// counter.value === 1\nincrement();// counter.value === 2\n"})}),"\n",(0,s.jsxs)(n.h2,{id:"read--write-value",children:["Read / Write ",(0,s.jsx)(n.code,{children:"value"})]}),"\n",(0,s.jsxs)(n.p,{children:["It is possible read and / or write ",(0,s.jsx)(n.code,{children:"Ref"})," value, using ",(0,s.jsx)(n.code,{children:"Ref"})," namespace"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const counter = Ref(0);\n\n// Use `Ref.modify` when mapping previous value to new value\nconst increment = () => Ref.modify(counter, (current) => current + 1);\n\n// Use `Ref.write` when setting a value\nconst reset = () => Ref.write(counter, 0);\n"})}),"\n",(0,s.jsx)(n.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,s.jsxs)(n.admonition,{type:"tip",children:[(0,s.jsx)(n.h3,{id:"always-ref-in-the-following-cases",children:"Always Ref in the following cases"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["When you want to mutate a value","\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Prefer ",(0,s.jsx)(n.code,{children:"Ref"})," over ",(0,s.jsx)(n.code,{children:"let"})]}),"\n",(0,s.jsxs)(n.li,{children:["\u26a0\ufe0f ",(0,s.jsx)(n.code,{children:"let"})," could be used for internal state, when performances are critical"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"When you want to share a mutable value across multiple parts of your code"}),"\n"]})]}),"\n",(0,s.jsxs)(n.admonition,{type:"tip",children:[(0,s.jsxs)(n.h3,{id:"always-use-immutable-values-everywhere-and-use-ref-for-mutations",children:["Always use immutable values everywhere and use ",(0,s.jsx)(n.code,{children:"Ref"})," for mutations"]}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"// \u2713 GOOD\ninterface State {\n  readonly name: string,\n  readonly total: number,\n  readonly items: ReadonlyArray<string>,\n}\nconst state = Ref<State>>({\n  name: 'pet store',\n  total: 1,\n  items: ['dog']\n});\nconst addItem = (state: typeof state, item: string) => {\n  Ref.modify(state, (current) => ({\n    ...current,\n    total: current.total + 1,\n    items: [...current.items, item],\n  }));\n};\n\n// \u2713 BAD\nconst state = {\n  total: 1,\n  items: ['dog']\n};\nconst addItem = (state: typeof state, item: string) => {\n  state.total += 1;\n  state.items.push(item);\n};\n"})})]}),"\n",(0,s.jsx)(n.h2,{id:"faq",children:"FAQ"})]})}function m(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}},2940:(e,n,t)=>{t.d(n,{n:()=>c});var s=t(2436),a=t(2196),r=t(396);const i={badgeGroup:"badgeGroup_YkPD",badge:"badge_qV9W",apiLink:"apiLink_d4om"};var o=t(1085);const l=(e,n,t)=>{let{siteConfig:s}=e;const a={className:i.badge,key:t.badgeType},r=t.badgeStyle??"flat-square";if(null!=n.packageName)switch(t.badgeType){case"bundle-size":return(0,o.jsx)("img",{...a,alt:"Bundle size",src:`https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(n.packageName)}?style=${r}`});case"npm-license":return(0,o.jsx)("img",{...a,alt:"NPM License",src:`https://img.shields.io/npm/l/${encodeURIComponent(n.packageName)}?style=${r}`});case"npm-version":return(0,o.jsx)("img",{...a,alt:"Github version",src:`https://img.shields.io/npm/v/${encodeURIComponent(n.packageName)}?style=${r}`})}return""};function c(e){const n=(0,r.default)(),{siteConfig:t}=n;return(0,o.jsxs)(o.Fragment,{children:[null==e.apiHref?null:(0,o.jsxs)(s.default,{className:i.apiLink,to:`${t.url}${t.baseUrl.replace(/\/$/,"")}${e.apiHref}`,children:["API ",(0,o.jsx)(a.A,{})]}),["npm-version","npm-license","bundle-size"].map((t=>l(n,e,{badgeType:t})))]})}},1184:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>o});var s=t(4041);const a={},r=s.createContext(a);function i(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);