"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[8696],{1184:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>o});var a=s(4041);const t={},i=a.createContext(t);function r(e){const n=a.useContext(i);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),a.createElement(i.Provider,{value:n},e.children)}},5657:(e,n,s)=>{s.d(n,{n:()=>c});var a=s(6279),t=s(6985),i=s(1215);const r={badgeGroup:"badgeGroup_YkPD",badge:"badge_qV9W",apiLink:"apiLink_d4om"};var o=s(1085);const l=(e,n,s)=>{let{siteConfig:a}=e;const t={className:r.badge,key:s.badgeType},i=s.badgeStyle??"flat-square";if(null!=n.packageName)switch(s.badgeType){case"bundle-size":return(0,o.jsx)("img",{...t,alt:"Bundle size",src:`https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(n.packageName)}?style=${i}`});case"npm-license":return(0,o.jsx)("img",{...t,alt:"NPM License",src:`https://img.shields.io/npm/l/${encodeURIComponent(n.packageName)}?style=${i}`});case"npm-version":return(0,o.jsx)("img",{...t,alt:"Github version",src:`https://img.shields.io/npm/v/${encodeURIComponent(n.packageName)}?style=${i}`})}return""};function c(e){const n=(0,i.default)(),{siteConfig:s}=n;return(0,o.jsxs)(o.Fragment,{children:[null==e.apiHref?null:(0,o.jsxs)(a.default,{className:r.apiLink,to:`${s.url}${s.baseUrl.replace(/\/$/,"")}${e.apiHref}`,children:["API ",(0,o.jsx)(t.A,{})]}),["npm-version","npm-license","bundle-size"].map((s=>l(n,e,{badgeType:s})))]})}},6584:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>m,frontMatter:()=>o,metadata:()=>a,toc:()=>u});const a=JSON.parse('{"id":"packages/core/enum","title":"Enum","description":"Enumeration of constant values","source":"@site/docs/packages/1-core/enum.mdx","sourceDirName":"packages/1-core","slug":"/packages/core/enum","permalink":"/std/fr/docs/packages/core/enum","draft":false,"unlisted":false,"editUrl":"https://github.com/w5s/std.git/tree/main/apps/website/docs/packages/1-core/enum.mdx","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Core","permalink":"/std/fr/docs/category/core"},"next":{"title":"Option","permalink":"/std/fr/docs/packages/core/option"}}');var t=s(1085),i=s(1184),r=s(5657);const o={sidebar_position:1},l="Enum",c={},u=[{value:"Motivation",id:"motivation",level:2},{value:"Define an Enum",id:"define-an-enum",level:2},{value:"Matching on values",id:"matching-on-values",level:2},{value:"Keys &amp; Values",id:"keys--values",level:2},{value:"Extending Enum",id:"extending-enum",level:2},{value:"Coding Guide",id:"coding-guide",level:2},{value:"FAQ",id:"faq",level:2}];function d(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components},{Details:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"enum",children:"Enum"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"Enumeration of constant values"}),"\n"]}),"\n",(0,t.jsx)(r.n,{apiHref:"/api/core/namespace/enum"}),"\n",(0,t.jsx)(n.h2,{id:"motivation",children:"Motivation"}),"\n",(0,t.jsx)(n.p,{children:"Enums are useful for defining types that can only take on a limited set of values."}),"\n",(0,t.jsx)(n.h2,{id:"define-an-enum",children:"Define an Enum"}),"\n",(0,t.jsx)(n.p,{children:"An enum can be declared as the following example :"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"import { Enum } from '@w5s/core';\n\nexport const MyEnum = Enum.define({\n  Foo: 'foo',\n  Bar: 'bar',\n});\nexport type MyEnum = Enum.ValueOf<typeof MyEnum>;\n"})}),"\n",(0,t.jsx)(n.h2,{id:"matching-on-values",children:"Matching on values"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"import { assertNever } from '@w5s/error';\n\nexport function getName(value: MyEnum) {\n  switch (value) {\n    case MyEnum.Foo:\n      return 'foo_name';\n    case MyEnum.Bar:\n      return 'bar_name';\n    default:\n      assertNever(value);// Exhaustive check\n  }\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"keys--values",children:"Keys & Values"}),"\n",(0,t.jsxs)(n.p,{children:["To read enum keys and values, use ",(0,t.jsx)(n.code,{children:"Enum.keys"})," and ",(0,t.jsx)(n.code,{children:"Enum.values"})," :"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"export const MyEnum = Enum.define({\n  Foo: 'foo',\n  Bar: 'bar',\n});\n\nEnum.keys(MyEnum); // ['Foo', 'Bar']\nEnum.values(MyEnum); // ['foo', 'bar']\n"})}),"\n",(0,t.jsx)(n.h2,{id:"extending-enum",children:"Extending Enum"}),"\n",(0,t.jsxs)(n.p,{children:["Extending an enum can be done just using the ",(0,t.jsx)(n.code,{children:"..."})," operator"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"const MyEnumValues = Enum.define({\n  Foo: 'foo',\n  Bar: 'bar',\n});\n\nexport type MyEnum = Enum.ValueOf<typeof MyEnumValues>;\n\nexport const MyEnum = {\n  ...MyEnumValues,\n  someMethod(value: MyEnum | undefined) {\n    switch (value) {\n      case 'foo': return 'foo_label';\n      case 'bar': return 'bar_label';\n      default: return '';\n    }\n  }\n}\n\n// Enum.keys(MyEnum) will still return ['Foo', 'Bar'] !\n"})}),"\n",(0,t.jsx)(n.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"// \u2713 Export a const\n// \u2713 PascalCase\n// \u2713 Singular\nexport const {{EnumType}} = Enum.define({\n  // \u2713 PascalCase\n  {{EnumValueName}}: '{{EnumValue}}',\n  // ...\n});\n// \u2713 Export a type with the same name as the const\nexport type {{EnumType}} = Enum.ValueOf<typeof {{EnumType}}>;\n"})}),"\n",(0,t.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,t.jsxs)(s,{children:[(0,t.jsx)("summary",{children:(0,t.jsxs)(n.p,{children:["Why not using Typescript ",(0,t.jsx)(n.code,{children:"enum"})," ?"]})}),(0,t.jsx)(n.p,{children:"Typescript enums have several drawbacks such as :"}),(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"Number based enum are not safe"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"enum Roles {\n  Admin,\n}\ndeclare function hasAccess(role: Roles): void;\n\nhasAccess(10);// This is valid, but it should not \ud83d\ude23\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsx)(n.p,{children:"String based enum are using nominal typing (Typescript is almost full structurally typed)"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-typescript",children:"enum Roles {\n  Admin = 'admin',\n}\ndeclare function hasAccess(role: Roles): void;\n\nhasAccess('admin') // Invalid.\nhasAccess(Roles.Admin) // Valid.\n"})}),"\n"]}),"\n"]}),(0,t.jsx)(n.p,{children:"References :"}),(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["[",(0,t.jsx)(n.a,{href:"https://dev.to/ivanzm123/dont-use-enums-in-typescript-they-are-very-dangerous-57bh",children:"https://dev.to/ivanzm123/dont-use-enums-in-typescript-they-are-very-dangerous-57bh"}),"]"]}),"\n"]}),(0,t.jsx)(n.p,{children:"This library was created to solve these issues."})]})]})}function m(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}}}]);