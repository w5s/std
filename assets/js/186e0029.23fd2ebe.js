"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[5592],{8178:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>d,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>s,toc:()=>c});const s=JSON.parse('{"id":"packages/core/result","title":"Result","description":"Error handling in a type safe way","source":"@site/docs/packages/1-core/result.mdx","sourceDirName":"packages/1-core","slug":"/packages/core/result","permalink":"/std/docs/packages/core/result","draft":false,"unlisted":false,"editUrl":"https://github.com/w5s/std.git/tree/main/apps/website/docs/packages/1-core/result.mdx","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Option","permalink":"/std/docs/packages/core/option"},"next":{"title":"Ref","permalink":"/std/docs/packages/core/ref"}}');var i=n(1085),o=n(1184),l=n(2940);const t={sidebar_position:3},a="Result",d={},c=[{value:"Motivation",id:"motivation",level:2},{value:"Usage",id:"usage",level:2},{value:"Matching values",id:"matching-values",level:2},{value:"Method 1: <code>Result.isOk</code> / <code>Result.isError</code> (Recommended)",id:"method-1-resultisok--resultiserror-recommended",level:3},{value:"Method 2: <code>if(result.ok)</code>",id:"method-2-ifresultok",level:3},{value:"Chaining",id:"chaining",level:2},{value:"Using pipeline operator (<em>Draft proposal</em>)",id:"using-pipeline-operator-draft-proposal",level:3},{value:"Using <code>const</code>",id:"using-const",level:3},{value:"Handling error",id:"handling-error",level:2},{value:"Coding Guide",id:"coding-guide",level:2},{value:"Always use <code>Result</code> when possible",id:"always-use-result-when-possible",level:3},{value:"FAQ",id:"faq",level:2}];function u(e){const r={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components},{Details:n}=r;return n||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(r.header,{children:(0,i.jsx)(r.h1,{id:"result",children:"Result"})}),"\n",(0,i.jsxs)(r.blockquote,{children:["\n",(0,i.jsx)(r.p,{children:"Error handling in a type safe way"}),"\n"]}),"\n",(0,i.jsx)(l.n,{apiHref:"/api/core/namespace/result"}),"\n",(0,i.jsx)(r.h2,{id:"motivation",children:"Motivation"}),"\n",(0,i.jsxs)(r.p,{children:["A ",(0,i.jsx)(r.code,{children:"Result<Value, Error>"})," is a type to manipulate and propagate errors in a type safe way (like Rust result or Haskell Either).\nIt can be represented as a tagged union ",(0,i.jsx)(r.code,{children:"{ _: 'Ok', value: Value } | { _: 'Error', error: Error }"}),"."]}),"\n",(0,i.jsx)(r.p,{children:"Historically, Javascript programs tends to throw errors. But this practice have the following drawbacks :"}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["Runtime crash (ex: accessing a property of ",(0,i.jsx)(r.code,{children:"undefined"}),") and custom business errors (ex: the API returned an error) are mixed and are both caught with try/catch."]}),"\n",(0,i.jsxs)(r.li,{children:["Caught errors have always an ",(0,i.jsx)(r.code,{children:"unknown"})," type, they are hard to handle in a type safe way"]}),"\n",(0,i.jsx)(r.li,{children:"Developers are not aware that they should handle some error cases, as it is not represented in the type system (ex: division by zero)"}),"\n"]}),"\n",(0,i.jsxs)(r.p,{children:["On the contrary, ",(0,i.jsx)(r.code,{children:"Result"})," have the following capabilities :"]}),"\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["Developer must handle ",(0,i.jsx)(r.code,{children:"Ok"}),"/",(0,i.jsx)(r.code,{children:"Error"})," case to be able to use the ",(0,i.jsx)(r.code,{children:"value"})," or ",(0,i.jsx)(r.code,{children:"error"})]}),"\n",(0,i.jsxs)(r.li,{children:["All error cases can be represented using a union type ",(0,i.jsx)(r.code,{children:"Result<V, E1|E2|E3>"})]}),"\n",(0,i.jsx)(r.li,{children:"Runtime crashes follow a complete different path, and therefore can be handled in a proper way (stop the program, log in a crash reporter, etc)"}),"\n"]}),"\n",(0,i.jsx)(r.h2,{id:"usage",children:"Usage"}),"\n",(0,i.jsx)(r.p,{children:"An enum can be declared as the following example :"}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-ts",children:"import { Result } from '@w5s/core';\nimport { CustomError } from '@w5s/error';\n\nexport interface ZeroDivisionError\n  extends CustomError<{\n    name: 'ZeroDivisionError';\n  }> {}\nexport const ZeroDivisionError = CustomError.define<ZeroDivisionError>({ errorName: 'ZeroDivisionError' });\n\nexport function divide(value: number, divider: number): Result<number, ZeroDivisionError> {\n  const returnValue = value / divider;\n  return Number.isNaN(returnValue) ? Result.Error(ZeroDivisionError()) : Result.Ok(returnValue);\n}\n"})}),"\n",(0,i.jsx)(r.h2,{id:"matching-values",children:"Matching values"}),"\n",(0,i.jsxs)(r.h3,{id:"method-1-resultisok--resultiserror-recommended",children:["Method 1: ",(0,i.jsx)(r.code,{children:"Result.isOk"})," / ",(0,i.jsx)(r.code,{children:"Result.isError"})," (Recommended)"]}),"\n",(0,i.jsx)(r.admonition,{type:"note",children:(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u2713 Good performance"}),"\n",(0,i.jsx)(r.li,{children:"\u2713 Long term maintainable"}),"\n"]})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-ts",children:"const program = (result: Result<number, 'FooError'>) => {\n  if (Result.isOk(result)) {\n    console.log(result.value);\n  } else {\n    console.error(result.error);\n  }\n}\n"})}),"\n",(0,i.jsxs)(r.h3,{id:"method-2-ifresultok",children:["Method 2: ",(0,i.jsx)(r.code,{children:"if(result.ok)"})]}),"\n",(0,i.jsx)(r.admonition,{type:"note",children:(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsx)(r.li,{children:"\u2713 Highest performance"}),"\n",(0,i.jsx)(r.li,{children:"\u2713 No module load overhead"}),"\n",(0,i.jsx)(r.li,{children:"\u26a0\ufe0f Potentially less maintainable on long term"}),"\n"]})}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-ts",children:"const program = (result: Result<number, 'FooError'>) => {\n  if (result.ok) {\n    console.log(result.value);\n  } else {\n    console.error(result.error);\n  }\n}\n"})}),"\n",(0,i.jsx)(r.h2,{id:"chaining",children:"Chaining"}),"\n",(0,i.jsxs)(r.p,{children:["Use ",(0,i.jsx)(r.code,{children:"Result.map"})," and/or ",(0,i.jsx)(r.code,{children:"Result.andThen"})," to transform ",(0,i.jsx)(r.code,{children:"Ok"})," value"]}),"\n",(0,i.jsxs)(r.h3,{id:"using-pipeline-operator-draft-proposal",children:["Using pipeline operator (",(0,i.jsx)(r.em,{children:"Draft proposal"}),")"]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-ts",children:"function program(expression: string) {\n  // Convert string to number\n  return parseNumber(expression) // Result<number, ParseError>\n    // Divide by 2\n    |> Result.andThen(#, (_) => divide(10, 2)) // Result<number, ZeroDivisionError | ParseError>\n    // Multiple by 3\n    |> Result.map(#, (_) => _ * 3); // Result<number, ZeroDivisionError | ParseError>\n}\n"})}),"\n",(0,i.jsxs)(r.h3,{id:"using-const",children:["Using ",(0,i.jsx)(r.code,{children:"const"})]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-ts",children:"function program(expression: string) {\n  // Convert string to number\n  const parsed = parseNumber(expression); // Result<number, ParseError>\n  // Divide by 2\n  const dividedBy2 = divide(parsed, 2); // Result<number, ZeroDivisionError | ParseError>\n  // Multiple by 3\n  const multipliedBy3 = Result.map(dividedBy2, (_) => _ * 3); // Result<number, ZeroDivisionError | ParseError>\n  return multipliedBy3;\n}\n"})}),"\n",(0,i.jsx)(r.h2,{id:"handling-error",children:"Handling error"}),"\n",(0,i.jsxs)(r.p,{children:["Use ",(0,i.jsx)(r.code,{children:"Result.mapError"})," and/or ",(0,i.jsx)(r.code,{children:"Result.orElse"})," to transform ",(0,i.jsx)(r.code,{children:"Error"})," error."]}),"\n",(0,i.jsx)(r.pre,{children:(0,i.jsx)(r.code,{className:"language-ts",children:"const handleZeroDivisionError = <E>(result: Result<number, E|ZeroDivisionError>) => {\n  return Result.orElse(result, (error) => {\n    switch (error.name): {\n      case ZeroDivisionError.typeName: return Result.Ok(0);\n      default: Result.Error(error);\n    }\n  });// Result<number, E>\n};\n"})}),"\n",(0,i.jsx)(r.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,i.jsxs)(r.admonition,{type:"tip",children:[(0,i.jsxs)(r.h3,{id:"always-use-result-when-possible",children:["Always use ",(0,i.jsx)(r.code,{children:"Result"})," when possible"]}),(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["Prefer using ",(0,i.jsx)(r.code,{children:"Result"})," over throwing error.","\n",(0,i.jsxs)(r.ul,{children:["\n",(0,i.jsxs)(r.li,{children:["Prefer ",(0,i.jsx)(r.a,{href:"../error/invariant",children:(0,i.jsx)(r.code,{children:"invariant"})})," over throwing error."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(r.li,{children:["Prefer using ",(0,i.jsx)(r.code,{children:"Result"})," over returning ",(0,i.jsx)(r.code,{children:"Option"})," for a non representable value"]}),"\n"]})]}),"\n",(0,i.jsx)(r.h2,{id:"faq",children:"FAQ"}),"\n",(0,i.jsxs)(n,{children:[(0,i.jsx)("summary",{children:(0,i.jsxs)(r.p,{children:["Why choose the name ",(0,i.jsx)(r.code,{children:"Result"})," over ",(0,i.jsx)(r.code,{children:"Either"})," ?"]})}),(0,i.jsxs)(r.p,{children:["It is a matter of preference. ",(0,i.jsx)(r.code,{children:"Ok"})," / ",(0,i.jsx)(r.code,{children:"Error"})," is more explicit than ",(0,i.jsx)(r.code,{children:"Left"})," / ",(0,i.jsx)(r.code,{children:"Right"}),".\nGenerally speaking, ",(0,i.jsx)(r.code,{children:"W5S"})," packages naming tends to be often aligned with the ",(0,i.jsx)(r.code,{children:"Rust"})," naming when no ECMA equivalent exists."]})]})]})}function h(e={}){const{wrapper:r}={...(0,o.R)(),...e.components};return r?(0,i.jsx)(r,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},2940:(e,r,n)=>{n.d(r,{n:()=>d});var s=n(2436),i=n(2196),o=n(396);const l={badgeGroup:"badgeGroup_YkPD",badge:"badge_qV9W",apiLink:"apiLink_d4om"};var t=n(1085);const a=(e,r,n)=>{let{siteConfig:s}=e;const i={className:l.badge,key:n.badgeType},o=n.badgeStyle??"flat-square";if(null!=r.packageName)switch(n.badgeType){case"bundle-size":return(0,t.jsx)("img",{...i,alt:"Bundle size",src:`https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(r.packageName)}?style=${o}`});case"npm-license":return(0,t.jsx)("img",{...i,alt:"NPM License",src:`https://img.shields.io/npm/l/${encodeURIComponent(r.packageName)}?style=${o}`});case"npm-version":return(0,t.jsx)("img",{...i,alt:"Github version",src:`https://img.shields.io/npm/v/${encodeURIComponent(r.packageName)}?style=${o}`})}return""};function d(e){const r=(0,o.default)(),{siteConfig:n}=r;return(0,t.jsxs)(t.Fragment,{children:[null==e.apiHref?null:(0,t.jsxs)(s.default,{className:l.apiLink,to:`${n.url}${n.baseUrl.replace(/\/$/,"")}${e.apiHref}`,children:["API ",(0,t.jsx)(i.A,{})]}),["npm-version","npm-license","bundle-size"].map((n=>a(r,e,{badgeType:n})))]})}},1184:(e,r,n)=>{n.d(r,{R:()=>l,x:()=>t});var s=n(4041);const i={},o=s.createContext(i);function l(e){const r=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function t(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(o.Provider,{value:r},e.children)}}}]);