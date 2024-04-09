"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[7215],{1029:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>h,frontMatter:()=>d,metadata:()=>r,toc:()=>a});var o=i(1085),s=i(1184),t=i(2940);const d={sidebar_position:2},c="Option",r={id:"packages/core/option",title:"Option",description:"Optional values",source:"@site/docs/packages/1-core/option.mdx",sourceDirName:"packages/1-core",slug:"/packages/core/option",permalink:"/std/fr/docs/packages/core/option",draft:!1,unlisted:!1,editUrl:"https://github.com/w5s/std.git/tree/main/apps/website/docs/packages/1-core/option.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Enum",permalink:"/std/fr/docs/packages/core/enum"},next:{title:"Result",permalink:"/std/fr/docs/packages/core/result"}},l={},a=[{value:"Motivation",id:"motivation",level:2},{value:"Usage",id:"usage",level:2},{value:"Matching on values",id:"matching-on-values",level:2},{value:"Method 1:  <code>Option.isNone</code> / <code>Option.isSome</code> (Recommended)",id:"method-1--optionisnone--optionissome-recommended",level:3},{value:"Method 2: <code>Option.match</code>",id:"method-2-optionmatch",level:3},{value:"Method 3: <code>=== undefined</code> / <code>!== undefined</code> (i.e. inlining isNone / isSome)",id:"method-3--undefined---undefined-ie-inlining-isnone--issome",level:3},{value:"Coding Guide",id:"coding-guide",level:2},{value:"Always use <code>Option</code> type when possible",id:"always-use-option-type-when-possible",level:3},{value:"Use precise and meaningful functions",id:"use-precise-and-meaningful-functions",level:3},{value:"FAQ",id:"faq",level:2}];function p(e){const n={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components},{Details:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"option",children:"Option"}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsx)(n.p,{children:"Optional values"}),"\n"]}),"\n",(0,o.jsx)(t.n,{apiHref:"/api/core/namespace/option"}),"\n",(0,o.jsx)(n.h2,{id:"motivation",children:"Motivation"}),"\n",(0,o.jsxs)(n.p,{children:["An ",(0,o.jsx)(n.code,{children:"Option<V>"})," is either a value of type ",(0,o.jsx)(n.code,{children:"V"})," or nothing. An empty value is represented by ",(0,o.jsx)(n.code,{children:"Option.None"})," and a defined value by ",(0,o.jsx)(n.code,{children:"Option.Some(...)"}),". Internally, ",(0,o.jsx)(n.code,{children:"Option.None"})," is ",(0,o.jsx)(n.code,{children:"undefined"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,o.jsx)(n.p,{children:"An enum can be declared as the following example :"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { Option } from '@w5s/core';\n\nexport type OptString = Option<string>;\n\nconst withSuffix = (opt: OptString) => Option.map(opt, (_) => `${_}_suffix`);\nwithSuffix(Option.Some('foo')); // Option.Some('foo_suffix')\nwithSuffix(Option.None); // Option.None\n\nconst withFallback = (opt: OptString) => Option.orElse(opt, () => 'fallback');\nwithFallback(Option.Some('foo')); // Option.Some('foo')\nwithFallback(Option.None);// Option.None\n"})}),"\n",(0,o.jsx)(n.h2,{id:"matching-on-values",children:"Matching on values"}),"\n",(0,o.jsxs)(n.h3,{id:"method-1--optionisnone--optionissome-recommended",children:["Method 1:  ",(0,o.jsx)(n.code,{children:"Option.isNone"})," / ",(0,o.jsx)(n.code,{children:"Option.isSome"})," (Recommended)"]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u2713 Best Expressiveness"}),"\n",(0,o.jsx)(n.li,{children:"\u2713 Good performances"}),"\n"]})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { Option } from '@w5s/core';\n\nconst optionToString = <V>(option: Option<V>) => Option.isSome(option) ? `Some(${v})` : 'None');\noptionToString(Option.Some(1));// 'Some(1)'\noptionToString(Option.None);// 'None'\n"})}),"\n",(0,o.jsxs)(n.h3,{id:"method-2-optionmatch",children:["Method 2: ",(0,o.jsx)(n.code,{children:"Option.match"})]}),"\n",(0,o.jsx)(n.admonition,{type:"note",children:(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u2713 Good Expressiveness"}),"\n",(0,o.jsx)(n.li,{children:"\u26a0\ufe0f Lower performances"}),"\n"]})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { Option } from '@w5s/core';\n\nconst optionToString = <V>(option: Option<V>) => Option.match(option, {\n  Some: (v) => `Some(${v})`,\n  None: () => 'None',\n});\noptionToString(Option.Some(1));// 'Some(1)'\noptionToString(Option.None);// 'None'\n"})}),"\n",(0,o.jsxs)(n.h3,{id:"method-3--undefined---undefined-ie-inlining-isnone--issome",children:["Method 3: ",(0,o.jsx)(n.code,{children:"=== undefined"})," / ",(0,o.jsx)(n.code,{children:"!== undefined"})," (i.e. inlining isNone / isSome)"]}),"\n",(0,o.jsxs)(n.admonition,{type:"note",children:[(0,o.jsx)(n.p,{children:"Not recommended for an application, but only for a third party library."}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"\u26a0\ufe0f Low expressiveness"}),"\n",(0,o.jsx)(n.li,{children:"\u2713 Highest performances"}),"\n",(0,o.jsx)(n.li,{children:"\u2713 No module load overhead"}),"\n"]})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import type { Option } from '@w5s/core';\n\nconst optionToString = <V>(option: Option<V>) => option === undefined ? `Some(${v})` : 'None';\n"})}),"\n",(0,o.jsx)(n.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,o.jsxs)(n.admonition,{type:"tip",children:[(0,o.jsxs)(n.h3,{id:"always-use-option-type-when-possible",children:["Always use ",(0,o.jsx)(n.code,{children:"Option"})," type when possible"]}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:["Avoid using ",(0,o.jsx)(n.code,{children:"null"})]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"// \u2713 GOOD\nconst someOptionFunc = () => Option.from(someNullableFunc()); // null -> undefined\n"})}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"Option<V>"})," is more expressive than ",(0,o.jsx)(n.code,{children:"V | undefined"})," and more readable, especially when combining with more union type"]}),"\n"]}),"\n"]})]}),"\n",(0,o.jsxs)(n.admonition,{type:"tip",children:[(0,o.jsx)(n.h3,{id:"use-precise-and-meaningful-functions",children:"Use precise and meaningful functions"}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Prefer ",(0,o.jsx)(n.code,{children:"Option.map"})," / ",(0,o.jsx)(n.code,{children:"Option.andThen"})," /  ",(0,o.jsx)(n.code,{children:"Option.orElse"})," when mapping an ",(0,o.jsx)(n.code,{children:"Option"})," to an ",(0,o.jsx)(n.code,{children:"Option"})]}),"\n",(0,o.jsxs)(n.li,{children:["Prefer ternary operators over ",(0,o.jsx)(n.code,{children:"if"})," / ",(0,o.jsx)(n.code,{children:"else"})]}),"\n"]}),(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"// \u2713 OK\nconst myFunc = <V>(option: Option<V>) => Option.map(option, (value) => /* ... */);\n\n// = OK with caution\nconst myFunc = <V>(option: Option<V>) => Option.isNone(option) ? /* ... */ : /* ... */;\n// \u26a0\ufe0f Be careful to return the same type in both cases\n\n// \u292b BAD\nconst myFunc = <V>(option: Option<V>) => {\n  if (Option.isNone(option)) {\n    return /* ... */ // Risk of returning a different type on both branches\n  }\n  return /* ... */\n};\n"})})]}),"\n",(0,o.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,o.jsxs)(i,{children:[(0,o.jsx)("summary",{children:(0,o.jsxs)(n.p,{children:["Why choose ",(0,o.jsx)(n.code,{children:"undefined"})," instead of ",(0,o.jsx)(n.code,{children:"null"})," or a variant object (like ",(0,o.jsx)(n.code,{children:"fp-ts"}),") ?"]})}),(0,o.jsx)(n.p,{children:(0,o.jsxs)(n.strong,{children:["SOLUTION 1 : Tagged variant ",(0,o.jsx)(n.code,{children:"{ _: 'None' } | { _: 'Some', value, }"})," :"]})}),(0,o.jsx)(n.p,{children:"PROS :"}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"Generic pattern matching"}),"\n"]}),(0,o.jsx)(n.p,{children:"CONS :"}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:['Creates a third "nullable" representation after ',(0,o.jsx)(n.code,{children:"null"})," and ",(0,o.jsx)(n.code,{children:"undefined"})]}),"\n",(0,o.jsxs)(n.li,{children:["Every access to a propery or array would have to be converted from ",(0,o.jsx)(n.code,{children:"undefined"})," or ",(0,o.jsx)(n.code,{children:"null"})," to ",(0,o.jsx)(n.code,{children:"None|Some()"})]}),"\n"]}),(0,o.jsx)(n.p,{children:(0,o.jsxs)(n.strong,{children:["SOLUTION 2 : ",(0,o.jsx)(n.code,{children:"null"})," as ",(0,o.jsx)(n.code,{children:"None"})," :"]})}),(0,o.jsx)(n.p,{children:"PROS :"}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"JSON friendly"}),"\n"]}),(0,o.jsx)(n.p,{children:"CONS :"}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"`typeof null == 'object'``"}),"\n",(0,o.jsxs)(n.li,{children:["Every access to a propery or array would have to be converted from ",(0,o.jsx)(n.code,{children:"undefined"})," to ",(0,o.jsx)(n.code,{children:"null"})]}),"\n"]}),(0,o.jsx)(n.p,{children:(0,o.jsxs)(n.strong,{children:["SOLUTION 3 : ",(0,o.jsx)(n.code,{children:"undefined"})," as ",(0,o.jsx)(n.code,{children:"None"})," :"]})}),(0,o.jsx)(n.p,{children:"PROS :"}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"array and property access are already well typed"}),"\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.code,{children:"typeof undefined == 'undefined'"})}),"\n"]}),(0,o.jsx)(n.p,{children:"CONS :"}),(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.code,{children:"undefined"})," does not exist in JSON"]}),"\n"]})]}),"\n",(0,o.jsxs)(i,{children:[(0,o.jsx)("summary",{children:(0,o.jsxs)(n.p,{children:["Why choose the name ",(0,o.jsx)(n.code,{children:"Option"})," over ",(0,o.jsx)(n.code,{children:"Maybe"})," ?"]})}),(0,o.jsxs)(n.p,{children:["It is a matter of preference. ",(0,o.jsx)(n.code,{children:"Rust"})," uses ",(0,o.jsx)(n.code,{children:"Option"}),", ",(0,o.jsx)(n.code,{children:"Haskell"})," uses ",(0,o.jsx)(n.code,{children:"Maybe"}),".\nGenerally speaking, ",(0,o.jsx)(n.code,{children:"W5S"})," packages naming tends to be often aligned with the ",(0,o.jsx)(n.code,{children:"Rust"})," naming when no ECMA equivalent exists."]})]})]})}function h(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},2940:(e,n,i)=>{i.d(n,{n:()=>l});var o=i(2436),s=i(2196),t=i(396);const d={badgeGroup:"badgeGroup_YkPD",badge:"badge_qV9W",apiLink:"apiLink_d4om"};var c=i(1085);const r=(e,n,i)=>{let{siteConfig:o}=e;const s={className:d.badge,key:i.badgeType},t=i.badgeStyle??"flat-square";if(null!=n.packageName)switch(i.badgeType){case"bundle-size":return(0,c.jsx)("img",{...s,alt:"Bundle size",src:`https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(n.packageName)}?style=${t}`});case"npm-license":return(0,c.jsx)("img",{...s,alt:"NPM License",src:`https://img.shields.io/npm/l/${encodeURIComponent(n.packageName)}?style=${t}`});case"npm-version":return(0,c.jsx)("img",{...s,alt:"Github version",src:`https://img.shields.io/npm/v/${encodeURIComponent(n.packageName)}?style=${t}`})}return""};function l(e){const n=(0,t.default)(),{siteConfig:i}=n;return(0,c.jsxs)(c.Fragment,{children:[null==e.apiHref?null:(0,c.jsxs)(o.default,{className:d.apiLink,to:`${i.url}${i.baseUrl}${e.apiHref}`,children:["API ",(0,c.jsx)(s.A,{})]}),["npm-version","npm-license","bundle-size"].map((i=>r(n,e,{badgeType:i})))]})}},1184:(e,n,i)=>{i.d(n,{R:()=>d,x:()=>c});var o=i(4041);const s={},t=o.createContext(s);function d(e){const n=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),o.createElement(t.Provider,{value:n},e.children)}}}]);