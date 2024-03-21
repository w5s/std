"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[9261],{6531:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>i,contentTitle:()=>u,default:()=>d,frontMatter:()=>o,metadata:()=>r,toc:()=>c});var s=a(1085),t=a(1184);const o={sidebar_position:1},u="Enum",r={id:"packages/core/enum",title:"Enum",description:"Enumeration of constant values",source:"@site/docs/packages/1-core/enum.md",sourceDirName:"packages/1-core",slug:"/packages/core/enum",permalink:"/std/docs/packages/core/enum",draft:!1,unlisted:!1,editUrl:"https://github.com/w5s/std.git/tree/main/apps/website/docs/packages/1-core/enum.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Core",permalink:"/std/docs/category/core"},next:{title:"Option",permalink:"/std/docs/packages/core/option"}},i={},c=[{value:"Motivation",id:"motivation",level:2},{value:"Define an Enum",id:"define-an-enum",level:2},{value:"Matching on values",id:"matching-on-values",level:2},{value:"Keys &amp; Values",id:"keys--values",level:2},{value:"Extending Enum",id:"extending-enum",level:2},{value:"Coding Guide",id:"coding-guide",level:2}];function l(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"enum",children:"Enum"}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"Enumeration of constant values"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"motivation",children:"Motivation"}),"\n",(0,s.jsx)(n.p,{children:"Enums are useful for defining types that can only take on a limited set of values."}),"\n",(0,s.jsx)(n.h2,{id:"define-an-enum",children:"Define an Enum"}),"\n",(0,s.jsx)(n.p,{children:"An enum can be declared as the following example :"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { Enum } from '@w5s/core';\n\nexport const MyEnum = Enum.Make({\n  Foo: 'foo',\n  Bar: 'bar',\n});\nexport type MyEnum = Enum.ValueOf<typeof MyEnum>;\n"})}),"\n",(0,s.jsx)(n.h2,{id:"matching-on-values",children:"Matching on values"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { assertNever } from '@w5s/invariant';\n\nexport function getName(value: MyEnum) {\n  switch (value) {\n    case MyEnum.Foo:\n      return 'foo_name';\n    case MyEnum.Bar:\n      return 'bar_name';\n    default:\n      assertNever(value);// Exhaustive check\n  }\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"keys--values",children:"Keys & Values"}),"\n",(0,s.jsxs)(n.p,{children:["To read enum keys and values, use ",(0,s.jsx)(n.code,{children:"Enum.keys"})," and ",(0,s.jsx)(n.code,{children:"Enum.values"})," :"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"export const MyEnum = Enum.Make({\n  Foo: 'foo',\n  Bar: 'bar',\n});\n\nEnum.keys(MyEnum); // ['Foo', 'Bar']\nEnum.values(MyEnum); // ['foo', 'bar']\n"})}),"\n",(0,s.jsx)(n.h2,{id:"extending-enum",children:"Extending Enum"}),"\n",(0,s.jsxs)(n.p,{children:["To read enum keys and values, use ",(0,s.jsx)(n.code,{children:"Enum.keys"})," and ",(0,s.jsx)(n.code,{children:"Enum.values"})," :"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const MyEnumValues = Enum.Make({\n  Foo: 'foo',\n  Bar: 'bar',\n});\n\nexport type MyEnum = Enum.ValueOf<typeof MyEnumValues>;\n\nexport const MyEnum = {\n  ...MyEnumValues,\n  someMethod(value: MyEnum | undefined) {\n    switch (value) {\n      case 'foo': return 'foo_label';\n      case 'bar': return 'bar_label';\n      default: return '';\n    }\n  }\n}\n\n// Enum.keys(MyEnum) will still return ['Foo', 'Bar'] !\n"})}),"\n",(0,s.jsx)(n.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"// \u2713 Export a const\n// \u2713 PascalCase\nexport const {{EnumType}} = Enum.Make({\n  // \u2713 PascalCase\n  {{EnumValueName}}: '{{EnumValue}}',\n  // ...\n});\n// \u2713 Export a type with the same name as the const\nexport type {{EnumType}} = Enum.ValueOf<typeof {{EnumType}}>;\n"})})]})}function d(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},1184:(e,n,a)=>{a.d(n,{R:()=>u,x:()=>r});var s=a(4041);const t={},o=s.createContext(t);function u(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:u(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);