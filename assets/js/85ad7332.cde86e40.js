"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[8696],{7873:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>m,frontMatter:()=>o,metadata:()=>l,toc:()=>u});var a=s(1085),t=s(1184),i=s(2940);const o={sidebar_position:1},r="Enum",l={id:"packages/core/enum",title:"Enum",description:"Enumeration of constant values",source:"@site/docs/packages/1-core/enum.mdx",sourceDirName:"packages/1-core",slug:"/packages/core/enum",permalink:"/std/docs/packages/core/enum",draft:!1,unlisted:!1,editUrl:"https://github.com/w5s/std.git/tree/main/apps/website/docs/packages/1-core/enum.mdx",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Core",permalink:"/std/docs/category/core"},next:{title:"Option",permalink:"/std/docs/packages/core/option"}},c={},u=[{value:"Motivation",id:"motivation",level:2},{value:"Define an Enum",id:"define-an-enum",level:2},{value:"Matching on values",id:"matching-on-values",level:2},{value:"Keys &amp; Values",id:"keys--values",level:2},{value:"Extending Enum",id:"extending-enum",level:2},{value:"Coding Guide",id:"coding-guide",level:2},{value:"FAQ",id:"faq",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components},{Details:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"enum",children:"Enum"}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"Enumeration of constant values"}),"\n"]}),"\n",(0,a.jsx)(i.n,{apiHref:"/api/core/namespace/enum"}),"\n",(0,a.jsx)(n.h2,{id:"motivation",children:"Motivation"}),"\n",(0,a.jsx)(n.p,{children:"Enums are useful for defining types that can only take on a limited set of values."}),"\n",(0,a.jsx)(n.h2,{id:"define-an-enum",children:"Define an Enum"}),"\n",(0,a.jsx)(n.p,{children:"An enum can be declared as the following example :"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"import { Enum } from '@w5s/core';\n\nexport const MyEnum = Enum.Make({\n  Foo: 'foo',\n  Bar: 'bar',\n});\nexport type MyEnum = Enum.ValueOf<typeof MyEnum>;\n"})}),"\n",(0,a.jsx)(n.h2,{id:"matching-on-values",children:"Matching on values"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"import { assertNever } from '@w5s/invariant';\n\nexport function getName(value: MyEnum) {\n  switch (value) {\n    case MyEnum.Foo:\n      return 'foo_name';\n    case MyEnum.Bar:\n      return 'bar_name';\n    default:\n      assertNever(value);// Exhaustive check\n  }\n}\n"})}),"\n",(0,a.jsx)(n.h2,{id:"keys--values",children:"Keys & Values"}),"\n",(0,a.jsxs)(n.p,{children:["To read enum keys and values, use ",(0,a.jsx)(n.code,{children:"Enum.keys"})," and ",(0,a.jsx)(n.code,{children:"Enum.values"})," :"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"export const MyEnum = Enum.Make({\n  Foo: 'foo',\n  Bar: 'bar',\n});\n\nEnum.keys(MyEnum); // ['Foo', 'Bar']\nEnum.values(MyEnum); // ['foo', 'bar']\n"})}),"\n",(0,a.jsx)(n.h2,{id:"extending-enum",children:"Extending Enum"}),"\n",(0,a.jsxs)(n.p,{children:["Extending an enum can be done just using the ",(0,a.jsx)(n.code,{children:"..."})," operator"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"const MyEnumValues = Enum.Make({\n  Foo: 'foo',\n  Bar: 'bar',\n});\n\nexport type MyEnum = Enum.ValueOf<typeof MyEnumValues>;\n\nexport const MyEnum = {\n  ...MyEnumValues,\n  someMethod(value: MyEnum | undefined) {\n    switch (value) {\n      case 'foo': return 'foo_label';\n      case 'bar': return 'bar_label';\n      default: return '';\n    }\n  }\n}\n\n// Enum.keys(MyEnum) will still return ['Foo', 'Bar'] !\n"})}),"\n",(0,a.jsx)(n.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"// \u2713 Export a const\n// \u2713 PascalCase\n// \u2713 Singular\nexport const {{EnumType}} = Enum.Make({\n  // \u2713 PascalCase\n  {{EnumValueName}}: '{{EnumValue}}',\n  // ...\n});\n// \u2713 Export a type with the same name as the const\nexport type {{EnumType}} = Enum.ValueOf<typeof {{EnumType}}>;\n"})}),"\n",(0,a.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,a.jsxs)(s,{children:[(0,a.jsx)("summary",{children:(0,a.jsxs)(n.p,{children:["Why not using Typescript ",(0,a.jsx)(n.code,{children:"enum"})," ?"]})}),(0,a.jsx)(n.p,{children:"Typescript enums have several drawbacks such as :"}),(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"Number based enum are not safe"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"enum Roles {\n  Admin,\n}\ndeclare function hasAccess(role: Roles): void;\n\nhasAccess(10);// This is valid, but it should not \ud83d\ude23\n"})}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\n",(0,a.jsx)(n.p,{children:"String based enum are using nominal typing (Typescript is almost full structurally typed)"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"enum Roles {\n  Admin = 'admin',\n}\ndeclare function hasAccess(role: Roles): void;\n\nhasAccess('admin') // Invalid.\nhasAccess(Roles.Admin) // Valid.\n"})}),"\n"]}),"\n"]}),(0,a.jsx)(n.p,{children:"References :"}),(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["[",(0,a.jsx)(n.a,{href:"https://dev.to/ivanzm123/dont-use-enums-in-typescript-they-are-very-dangerous-57bh",children:"https://dev.to/ivanzm123/dont-use-enums-in-typescript-they-are-very-dangerous-57bh"}),"]"]}),"\n"]}),(0,a.jsx)(n.p,{children:"This library was created to solve these issues."})]})]})}function m(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},2940:(e,n,s)=>{s.d(n,{n:()=>c});var a=s(2436),t=s(2196),i=s(396);const o={badgeGroup:"badgeGroup_YkPD",badge:"badge_qV9W",apiLink:"apiLink_d4om"};var r=s(1085);const l=(e,n,s)=>{let{siteConfig:a}=e;const t={className:o.badge,key:s.badgeType},i=s.badgeStyle??"flat-square";if(null!=n.packageName)switch(s.badgeType){case"bundle-size":return(0,r.jsx)("img",{...t,alt:"Bundle size",src:`https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(n.packageName)}?style=${i}`});case"npm-license":return(0,r.jsx)("img",{...t,alt:"NPM License",src:`https://img.shields.io/npm/l/${encodeURIComponent(n.packageName)}?style=${i}`});case"npm-version":return(0,r.jsx)("img",{...t,alt:"Github version",src:`https://img.shields.io/npm/v/${encodeURIComponent(n.packageName)}?style=${i}`})}return""};function c(e){const n=(0,i.default)(),{siteConfig:s}=n;return(0,r.jsxs)(r.Fragment,{children:[null==e.apiHref?null:(0,r.jsxs)(a.default,{className:o.apiLink,to:`${s.url}${s.baseUrl}${e.apiHref}`,children:["API ",(0,r.jsx)(t.A,{})]}),["npm-version","npm-license","bundle-size"].map((s=>l(n,e,{badgeType:s})))]})}},1184:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>r});var a=s(4041);const t={},i=a.createContext(t);function o(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),a.createElement(i.Provider,{value:n},e.children)}}}]);