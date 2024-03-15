"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[7728],{6167:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>c,contentTitle:()=>d,default:()=>p,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var o=i(1085),t=i(1184);const s={sidebar_position:2},d="Option",r={id:"manual/basics/option",title:"Option",description:"Motivation",source:"@site/docs/manual/0-basics/option.md",sourceDirName:"manual/0-basics",slug:"/manual/basics/option",permalink:"/std/docs/manual/basics/option",draft:!1,unlisted:!1,editUrl:"https://github.com/w5s/std.git/tree/main/apps/website/docs/manual/0-basics/option.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Enum",permalink:"/std/docs/manual/basics/enum"},next:{title:"Result",permalink:"/std/docs/manual/basics/result"}},c={},l=[{value:"Motivation",id:"motivation",level:2},{value:"Usage",id:"usage",level:2},{value:"Matching on values",id:"matching-on-values",level:2},{value:"<code>Option.isNone</code> / <code>Option.isSome</code> (Recommended)",id:"optionisnone--optionissome-recommended",level:3},{value:"<code>Option.match</code>",id:"optionmatch",level:3},{value:"<code>=== undefined</code> / <code>!== undefined</code> (i.e. inlining isNone / isSome)",id:"-undefined---undefined-ie-inlining-isnone--issome",level:3},{value:"Coding Guide",id:"coding-guide",level:2},{value:"Use idiomatic functions",id:"use-idiomatic-functions",level:3},{value:"Try to eliminate <code>null</code> when possible",id:"try-to-eliminate-null-when-possible",level:3},{value:"FAQ",id:"faq",level:2}];function a(n){const e={admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...n.components},{Details:i}=e;return i||function(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h1,{id:"option",children:"Option"}),"\n",(0,o.jsx)(e.h2,{id:"motivation",children:"Motivation"}),"\n",(0,o.jsxs)(e.p,{children:["An ",(0,o.jsx)(e.code,{children:"Option<V>"})," is either a value of type ",(0,o.jsx)(e.code,{children:"V"})," or nothing. An empty value is represented by ",(0,o.jsx)(e.code,{children:"Option.None"})," and a defined value by ",(0,o.jsx)(e.code,{children:"Option.Some(...)"}),". Internally, ",(0,o.jsx)(e.code,{children:"Option.None"})," is ",(0,o.jsx)(e.code,{children:"undefined"}),"."]}),"\n",(0,o.jsx)(e.h2,{id:"usage",children:"Usage"}),"\n",(0,o.jsx)(e.p,{children:"An enum can be declared as the following example :"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"import { Option } from '@w5s/core';\n\nexport type OptString = Option<string>;\n\nconst withSuffix = (opt: OptString) => Option.map(opt, (_) => `${_}_suffix`);\nwithSuffix(Option.Some('foo')); // Option.Some('foo_suffix')\nwithSuffix(Option.None); // Option.None\n\nconst withFallback = (opt: OptString) => Option.orElse(opt, () => 'fallback');\nwithFallback(Option.Some('foo')); // Option.Some('foo')\nwithFallback(Option.None);// Option.None\n"})}),"\n",(0,o.jsx)(e.h2,{id:"matching-on-values",children:"Matching on values"}),"\n",(0,o.jsxs)(e.h3,{id:"optionisnone--optionissome-recommended",children:[(0,o.jsx)(e.code,{children:"Option.isNone"})," / ",(0,o.jsx)(e.code,{children:"Option.isSome"})," (Recommended)"]}),"\n",(0,o.jsx)(e.admonition,{type:"info",children:(0,o.jsx)(e.p,{children:"Offers the best readability with expressiveness, with high performances"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"import { Option } from '@w5s/core';\n\nconst optionToString = <V>(option: Option<V>) => Option.isSome(option) ? `Some(${v})` : 'None');\noptionToString(Option.Some(1));// 'Some(1)'\noptionToString(Option.None);// 'None'\n"})}),"\n",(0,o.jsx)(e.h3,{id:"optionmatch",children:(0,o.jsx)(e.code,{children:"Option.match"})}),"\n",(0,o.jsx)(e.admonition,{type:"info",children:(0,o.jsx)(e.p,{children:"Offers a good readability with expressiveness, with a small tradeoff on performances (object and function creation)"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"import { Option } from '@w5s/core';\n\nconst optionToString = <V>(option: Option<V>) => Option.match(option, {\n  Some: (v) => `Some(${v})`,\n  None: () => 'None',\n});\noptionToString(Option.Some(1));// 'Some(1)'\noptionToString(Option.None);// 'None'\n"})}),"\n",(0,o.jsxs)(e.h3,{id:"-undefined---undefined-ie-inlining-isnone--issome",children:[(0,o.jsx)(e.code,{children:"=== undefined"})," / ",(0,o.jsx)(e.code,{children:"!== undefined"})," (i.e. inlining isNone / isSome)"]}),"\n",(0,o.jsx)(e.admonition,{type:"info",children:(0,o.jsx)(e.p,{children:"At the cost of a mediocre expressiveness, this solution is the best for performances because the Option module does not have to be loaded (it is a type only dependency).\nNot recommended for an application, but only for a third party library."})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"import type { Option } from '@w5s/core';\n\nconst optionToString = <V>(option: Option<V>) => option === undefined ? `Some(${v})` : 'None';\n"})}),"\n",(0,o.jsx)(e.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,o.jsxs)(e.admonition,{type:"tip",children:[(0,o.jsx)(e.h3,{id:"use-idiomatic-functions",children:"Use idiomatic functions"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Prefer ",(0,o.jsx)(e.code,{children:"Option.map"})," / ",(0,o.jsx)(e.code,{children:"Option.andThen"})," /  ",(0,o.jsx)(e.code,{children:"Option.orElse"})," when mapping an ",(0,o.jsx)(e.code,{children:"Option"})," to an ",(0,o.jsx)(e.code,{children:"Option"})]}),"\n",(0,o.jsxs)(e.li,{children:["Prefer ternary operators over ",(0,o.jsx)(e.code,{children:"if"})," / ",(0,o.jsx)(e.code,{children:"else"})]}),"\n"]}),(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"// \u2713 OK\nconst myFunc = <V>(option: Option<V>) => Option.map(option, () => /* ... */);\n\n// = OK with caution\nconst myFunc = <V>(option: Option<V>) => Option.isNone(option) ? /* ... */ : /* ... */;\n// \u26a0\ufe0f Be careful to return the same type in both cases\n\n// \u292b BAD\nconst myFunc = <V>(option: Option<V>) => {\n  if (Option.isNone(option)) {\n    return /* ... */ // Risk of returning a different type on both branches\n  }\n  return /* ... */\n};\n"})})]}),"\n",(0,o.jsxs)(e.admonition,{type:"tip",children:[(0,o.jsxs)(e.h3,{id:"try-to-eliminate-null-when-possible",children:["Try to eliminate ",(0,o.jsx)(e.code,{children:"null"})," when possible"]}),(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"// \u2713 GOOD\nconst someOptionFunc = () => Option.from(someNullableFunc()); // null -> undefined\n"})})]}),"\n",(0,o.jsx)(e.h2,{id:"faq",children:"FAQ"}),"\n",(0,o.jsxs)(i,{children:[(0,o.jsx)("summary",{children:(0,o.jsxs)(e.p,{children:["Why choose ",(0,o.jsx)(e.code,{children:"undefined"})," instead of ",(0,o.jsx)(e.code,{children:"null"})," or a variant object (like ",(0,o.jsx)(e.code,{children:"fp-ts"}),") ?"]})}),(0,o.jsx)(e.p,{children:(0,o.jsxs)(e.strong,{children:["SOLUTION 1 : Tagged variant ",(0,o.jsx)(e.code,{children:"{ _: 'None' } | { _: 'Some', value, }"})," :"]})}),(0,o.jsx)(e.p,{children:"PROS :"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"Generic pattern matching"}),"\n"]}),(0,o.jsx)(e.p,{children:"CONS :"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:['Creates a third "nullable" representation after ',(0,o.jsx)(e.code,{children:"null"})," and ",(0,o.jsx)(e.code,{children:"undefined"})]}),"\n",(0,o.jsxs)(e.li,{children:["Every access to a propery or array would have to be converted from ",(0,o.jsx)(e.code,{children:"undefined"})," or ",(0,o.jsx)(e.code,{children:"null"})," to ",(0,o.jsx)(e.code,{children:"None|Some()"})]}),"\n"]}),(0,o.jsx)(e.p,{children:(0,o.jsxs)(e.strong,{children:["SOLUTION 2 : ",(0,o.jsx)(e.code,{children:"null"})," as ",(0,o.jsx)(e.code,{children:"None"})," :"]})}),(0,o.jsx)(e.p,{children:"PROS :"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"JSON friendly"}),"\n"]}),(0,o.jsx)(e.p,{children:"CONS :"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"`typeof null == 'object'``"}),"\n",(0,o.jsxs)(e.li,{children:["Every access to a propery or array would have to be converted from ",(0,o.jsx)(e.code,{children:"undefined"})," to ",(0,o.jsx)(e.code,{children:"null"})]}),"\n"]}),(0,o.jsx)(e.p,{children:(0,o.jsxs)(e.strong,{children:["SOLUTION 3 : ",(0,o.jsx)(e.code,{children:"undefined"})," as ",(0,o.jsx)(e.code,{children:"None"})," :"]})}),(0,o.jsx)(e.p,{children:"PROS :"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"array and property access are already well typed"}),"\n",(0,o.jsx)(e.li,{children:(0,o.jsx)(e.code,{children:"typeof undefined == 'undefined'"})}),"\n"]}),(0,o.jsx)(e.p,{children:"CONS :"}),(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:[(0,o.jsx)(e.code,{children:"undefined"})," does not exist in JSON"]}),"\n"]})]})]})}function p(n={}){const{wrapper:e}={...(0,t.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(a,{...n})}):a(n)}},1184:(n,e,i)=>{i.d(e,{R:()=>d,x:()=>r});var o=i(4041);const t={},s=o.createContext(t);function d(n){const e=o.useContext(s);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:d(n.components),o.createElement(s.Provider,{value:e},n.children)}}}]);