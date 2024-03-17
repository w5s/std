"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[2008],{4086:(r,e,n)=>{n.r(e),n.d(e,{assets:()=>c,contentTitle:()=>t,default:()=>u,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var o=n(1085),s=n(1184);const i={sidebar_position:4},t="Error",a={id:"manual/basics/error",title:"Error",description:"Error factory creation",source:"@site/docs/manual/0-basics/error.md",sourceDirName:"manual/0-basics",slug:"/manual/basics/error",permalink:"/std/fr/docs/manual/basics/error",draft:!1,unlisted:!1,editUrl:"https://github.com/w5s/std.git/tree/main/apps/website/docs/manual/0-basics/error.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Result",permalink:"/std/fr/docs/manual/basics/result"},next:{title:"Ref",permalink:"/std/fr/docs/manual/basics/ref"}},c={},l=[{value:"Motivation",id:"motivation",level:2},{value:"Usage",id:"usage",level:2},{value:"Matching errors",id:"matching-errors",level:2},{value:"Chaining / Specializing errors",id:"chaining--specializing-errors",level:2},{value:"Coding Guide",id:"coding-guide",level:2},{value:"FAQ",id:"faq",level:2}];function d(r){const e={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.R)(),...r.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h1,{id:"error",children:"Error"}),"\n",(0,o.jsxs)(e.blockquote,{children:["\n",(0,o.jsx)(e.p,{children:"Error factory creation"}),"\n"]}),"\n",(0,o.jsx)(e.h2,{id:"motivation",children:"Motivation"}),"\n",(0,o.jsxs)(e.p,{children:["Extending ",(0,o.jsx)(e.code,{children:"globalThis.Error"})," have multiple drawbacks :"]}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Matching on errors relies on ",(0,o.jsx)(e.code,{children:"instanceof"})," which have some limitations (ex: ",(0,o.jsx)(e.code,{children:"iframe"}),")"]}),"\n",(0,o.jsx)(e.li,{children:"Can be verbose even for adding just one property"}),"\n"]}),"\n",(0,o.jsxs)(e.p,{children:["The ",(0,o.jsx)(e.code,{children:"@w5s/error"})," package helps creating type safe errors :"]}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Easy declaration using ",(0,o.jsx)(e.code,{children:"defineCustomError"})]}),"\n",(0,o.jsxs)(e.li,{children:["Type safe matching on ",(0,o.jsx)(e.code,{children:"name"})]}),"\n",(0,o.jsxs)(e.li,{children:["Discourage matching using ",(0,o.jsx)(e.code,{children:"instanceof"})]}),"\n"]}),"\n",(0,o.jsx)(e.h2,{id:"usage",children:"Usage"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"import { defineCustomError, type CustomError } from '@w5s/error';\nimport { Result } from '@w5s/core';\n\ninterface SomeError\n  extends CustomError<{\n    name: 'SomeError';\n    customProperty: string;\n  }> {}\nconst SomeError = defineCustomError<SomeError>('SomeError');\n\nconsole.log(SomeError({\n  message: 'This is a message',\n  customProperty: 'custom',\n  cause: new TypeError('This is the cause')\n}));\n// SomeError {\n//   name: 'SomeError',\n//   message: 'This is a message',\n//   customProperty: 'custom',\n//   cause: TypeError { message: 'This is the cause' }\n// }\n"})}),"\n",(0,o.jsx)(e.h2,{id:"matching-errors",children:"Matching errors"}),"\n",(0,o.jsxs)(e.p,{children:["The recommended way to match on errors created with ",(0,o.jsx)(e.code,{children:"defineCustomError"})," is to use a ",(0,o.jsx)(e.code,{children:"switch"})," / ",(0,o.jsx)(e.code,{children:"case"})," on the error ",(0,o.jsx)(e.code,{children:"name"})]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"interface FooError\n  extends CustomError<{\n    name: 'FooError';\n    fooProperty: boolean;\n  }> {}\nconst FooError = defineCustomError<FooError>('FooError');\n\ninterface BarError\n  extends CustomError<{\n    name: 'BarError';\n    barProperty: number;\n  }> {}\nconst BarError = defineCustomError<BarError>('BarError');\n\nfunction parse(): Result<string, FooError | BarError> {\n  //...\n}\n\nfunction program() {\n  const result = parse();\n  if (Result.isError(result)) {\n    switch (result.name) {\n      case FooError.typeName: { \n        console.log('FooError:', error.fooProperty);\n        break;\n      }\n      case BarError.typeName: { \n        console.log('BarError:', error.barProperty);\n        break;\n      }\n      default: assertNever(result.name);\n    }\n  }\n}\n\n"})}),"\n",(0,o.jsx)(e.h2,{id:"chaining--specializing-errors",children:"Chaining / Specializing errors"}),"\n",(0,o.jsxs)(e.p,{children:[(0,o.jsx)(e.code,{children:"CustomError"})," can be used to create specific errors with a ",(0,o.jsx)(e.code,{children:"cause"})," property that is useful to keep track of the chain of errors."]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"export interface CauseError\n  extends CustomError<{\n    name: 'CauseError';\n  }> {}\nexport const CauseError = defineCustomError<CauseError>('CauseError');\n\ntry {\n  // ...\n} catch (error) {\n  throw CauseError({\n    message: 'This is a better error',\n    cause: error,\n  });\n}\n"})}),"\n",(0,o.jsx)(e.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-ts",children:"// \u2713 Export an interface\n// \u2713 PascalCase\n// \u2713 Suffix 'Error'\nexport interface {{SomeError}} extends CustomError<{\n  name: '{{SomeError}}';// <- This is required\n  // Add more properties\n  // ...\n}> {}\n// \u2713 Export const with same name as const\nexport const {{SomeError}} = defineCustomError<{{SomeError}}>({{SomeError}});\n"})}),"\n",(0,o.jsx)(e.h2,{id:"faq",children:"FAQ"})]})}function u(r={}){const{wrapper:e}={...(0,s.R)(),...r.components};return e?(0,o.jsx)(e,{...r,children:(0,o.jsx)(d,{...r})}):d(r)}},1184:(r,e,n)=>{n.d(e,{R:()=>t,x:()=>a});var o=n(4041);const s={},i=o.createContext(s);function t(r){const e=o.useContext(i);return o.useMemo((function(){return"function"==typeof r?r(e):{...e,...r}}),[e,r])}function a(r){let e;return e=r.disableParentContext?"function"==typeof r.components?r.components(s):r.components||s:t(r.components),o.createElement(i.Provider,{value:e},r.children)}}}]);