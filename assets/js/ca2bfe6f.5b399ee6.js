"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[5196],{3623:(n,e,i)=>{i.r(e),i.d(e,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>c,toc:()=>d});var s=i(1085),t=i(1184);const r={sidebar_position:6},o="String",c={id:"manual/basics/string",title:"String",description:"Lightweight namespace for string manipulation",source:"@site/docs/manual/0-basics/string.md",sourceDirName:"manual/0-basics",slug:"/manual/basics/string",permalink:"/std/docs/manual/basics/string",draft:!1,unlisted:!1,editUrl:"https://github.com/w5s/std.git/tree/main/apps/website/docs/manual/0-basics/string.md",tags:[],version:"current",sidebarPosition:6,frontMatter:{sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"Ref",permalink:"/std/docs/manual/basics/ref"}},l={},d=[{value:"Motivation",id:"motivation",level:2},{value:"Usage",id:"usage",level:2},{value:"Coding Guide",id:"coding-guide",level:2},{value:"Prefer <code>String</code> functions over <code>globalThis.String</code>",id:"prefer-string-functions-over-globalthisstring",level:3},{value:"FAQ",id:"faq",level:2}];function a(n){const e={admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.h1,{id:"string",children:"String"}),"\n",(0,s.jsxs)(e.blockquote,{children:["\n",(0,s.jsx)(e.p,{children:"Lightweight namespace for string manipulation"}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"motivation",children:"Motivation"}),"\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.code,{children:"globalThis.String"})," functions and methods are very useful but has the following drawbacks :"]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Most functions are on the ",(0,s.jsx)(e.code,{children:"prototype"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Since ESM, it creates a double syntax standard ",(0,s.jsx)(e.code,{children:"toDashCase(string)"})," VS ",(0,s.jsx)(e.code,{children:"myString.toLowerCase()"})]}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"String.prototype"})," should never be extended"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["Some legacy design decisions","\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"indexOf"}),", ",(0,s.jsx)(e.code,{children:"lastIndexOf"})," returns ",(0,s.jsx)(e.code,{children:"-1"})," when not found"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.p,{children:[(0,s.jsx)(e.code,{children:"String"})," namespace corrects these problems in a pragmatic way :"]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["Extendable : as an object ",(0,s.jsx)(e.code,{children:"String"})," can be extends with a simple ",(0,s.jsx)(e.code,{children:"{ ...String, myMethod() {} }"})]}),"\n",(0,s.jsxs)(e.li,{children:["Uniform : every ",(0,s.jsx)(e.code,{children:"String"})," function has a string as first parameter"]}),"\n",(0,s.jsxs)(e.li,{children:["Expressive : ",(0,s.jsx)(e.code,{children:"indexOf"})," and ",(0,s.jsx)(e.code,{children:"lastIndexOf"})," returns ",(0,s.jsx)(e.code,{children:"Option<Int>"})]}),"\n"]}),"\n",(0,s.jsx)(e.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-ts",children:"import { String, Option, Int } from '@w5s/core';\n\nconst baseName = (path: string): Option<string> => {\n  const positionOption = String.lastIndexOf(expression, '/'); // Option<Int>;\n  const afterLastSlash = Option.match(positionOption, (position) => \n    None: () => path, // unchanged when not found\n    Some: (position) => String.slice(path, position + 1), // everything after the last slash\n  );\n  return afterLastSlash;\n}\n"})}),"\n",(0,s.jsx)(e.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,s.jsxs)(e.admonition,{type:"tip",children:[(0,s.jsxs)(e.h3,{id:"prefer-string-functions-over-globalthisstring",children:["Prefer ",(0,s.jsx)(e.code,{children:"String"})," functions over ",(0,s.jsx)(e.code,{children:"globalThis.String"})]}),(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["At best ",(0,s.jsx)(e.code,{children:"String"})," will provide polyfill / better performance / better type safety"]}),"\n",(0,s.jsxs)(e.li,{children:["At worst ",(0,s.jsx)(e.code,{children:"String"})," will call the native function"]}),"\n"]})]}),"\n",(0,s.jsx)(e.h2,{id:"faq",children:"FAQ"})]})}function h(n={}){const{wrapper:e}={...(0,t.R)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(a,{...n})}):a(n)}},1184:(n,e,i)=>{i.d(e,{R:()=>o,x:()=>c});var s=i(4041);const t={},r=s.createContext(t);function o(n){const e=s.useContext(r);return s.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:o(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);