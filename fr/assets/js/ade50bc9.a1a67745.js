"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[6464],{2539:(e,r,n)=>{n.r(r),n.d(r,{assets:()=>a,contentTitle:()=>t,default:()=>u,frontMatter:()=>o,metadata:()=>l,toc:()=>d});var s=n(1085),i=n(1184);const o={sidebar_position:3},t="Result",l={id:"manual/basics/result",title:"Result",description:"Motivation",source:"@site/docs/manual/0-basics/result.md",sourceDirName:"manual/0-basics",slug:"/manual/basics/result",permalink:"/std/fr/docs/manual/basics/result",draft:!1,unlisted:!1,editUrl:"https://github.com/w5s/std.git/tree/main/apps/website/docs/manual/0-basics/result.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Option",permalink:"/std/fr/docs/manual/basics/option"}},a={},d=[{value:"Motivation",id:"motivation",level:2},{value:"Usage",id:"usage",level:2},{value:"Chaining",id:"chaining",level:2},{value:"Using pipeline operator (<em>Draft proposal</em>)",id:"using-pipeline-operator-draft-proposal",level:3},{value:"Using <code>const</code>",id:"using-const",level:3},{value:"Handling error",id:"handling-error",level:2},{value:"Coding Guide",id:"coding-guide",level:2},{value:"Always use <code>Result</code> when possible",id:"always-use-result-when-possible",level:3},{value:"FAQ",id:"faq",level:2}];function c(e){const r={admonition:"admonition",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components},{Details:n}=r;return n||function(e,r){throw new Error("Expected "+(r?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.h1,{id:"result",children:"Result"}),"\n",(0,s.jsx)(r.h2,{id:"motivation",children:"Motivation"}),"\n",(0,s.jsxs)(r.p,{children:["A ",(0,s.jsx)(r.code,{children:"Result<Value, Error>"})," is a type to manipulate and propagate errors in a type safe way (like Rust result or Haskell Either).\nIt can be represented as a tagged union ",(0,s.jsx)(r.code,{children:"{ _: 'Ok', value: Value } | { _: 'Error', error: Error }"}),"."]}),"\n",(0,s.jsx)(r.p,{children:"Historically, Javascript programs tends to throw errors. But this practice have the following drawbacks :"}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["Runtime crash (ex: accessing a property of ",(0,s.jsx)(r.code,{children:"undefined"}),") and custom business errors (ex: the API returned an error) are mixed and are both caught with try/catch."]}),"\n",(0,s.jsxs)(r.li,{children:["Caught errors have always an ",(0,s.jsx)(r.code,{children:"unknown"})," type, they are hard to handle in a type safe way"]}),"\n",(0,s.jsx)(r.li,{children:"Developers are not aware that they should handle some error cases, as it is not represented in the type system (ex: division by zero)"}),"\n"]}),"\n",(0,s.jsxs)(r.p,{children:["On the contrary, ",(0,s.jsx)(r.code,{children:"Result"})," have the following capabilities :"]}),"\n",(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["Developer must handle ",(0,s.jsx)(r.code,{children:"Ok"}),"/",(0,s.jsx)(r.code,{children:"Error"})," case to be able to use the ",(0,s.jsx)(r.code,{children:"value"})," or ",(0,s.jsx)(r.code,{children:"error"})]}),"\n",(0,s.jsxs)(r.li,{children:["All error cases can be represented using a union type ",(0,s.jsx)(r.code,{children:"Result<V, E1|E2|E3>"})]}),"\n",(0,s.jsx)(r.li,{children:"Runtime crashes follow a complete different path, and therefore can be handled in a proper way (stop the program, log in a crash reporter, etc)"}),"\n"]}),"\n",(0,s.jsx)(r.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(r.p,{children:"An enum can be declared as the following example :"}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"import { Result } from '@w5s/core';\nimport { defineCustomError } from '@w5s/error';\n\nexport interface ZeroDivisionError\n  extends CustomError<{\n    name: 'ZeroDivisionError';\n  }> {}\nexport const ZeroDivisionError = defineCustomError<ZeroDivisionError>('ZeroDivisionError');\n\nexport function divide(value: number, divider: number): Result<number, ZeroDivisionError> {\n    const returnValue = value / divider;\n    return Number.isNaN(returnValue) ? Result.Error(ZeroDivisionError()) : Result.Ok(returnValue);\n}\n"})}),"\n",(0,s.jsx)(r.h2,{id:"chaining",children:"Chaining"}),"\n",(0,s.jsxs)(r.p,{children:["Use ",(0,s.jsx)(r.code,{children:"Result.map"})," and/or ",(0,s.jsx)(r.code,{children:"Result.andThen"})," to transform ",(0,s.jsx)(r.code,{children:"Ok"})," value"]}),"\n",(0,s.jsxs)(r.h3,{id:"using-pipeline-operator-draft-proposal",children:["Using pipeline operator (",(0,s.jsx)(r.em,{children:"Draft proposal"}),")"]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"const program = (expression: string) => {\n    // Convert string to number\n    return parseNumber(expression) // Result<number, ParseError>\n        // Divide by 2\n        |> Result.andThen(#, (_) => divide(10, 2)) // Result<number, ZeroDivisionError | ParseError>\n        // Multiple by 3\n        |> Result.map(#, (_) => _ * 3); // Result<number, ZeroDivisionError | ParseError>\n};\n"})}),"\n",(0,s.jsxs)(r.h3,{id:"using-const",children:["Using ",(0,s.jsx)(r.code,{children:"const"})]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"const program = (expression: string) => {\n    // Convert string to number\n    const parsed = parseNumber(expression); // Result<number, ParseError>\n    // Divide by 2\n    const dividedBy2 = divide(parsed, 2); // Result<number, ZeroDivisionError | ParseError>\n    // Multiple by 3\n    const multipliedBy3 = Result.map(dividedBy2, (_) => _ * 3); // Result<number, ZeroDivisionError | ParseError>\n    return multipliedBy3;\n};\n"})}),"\n",(0,s.jsx)(r.h2,{id:"handling-error",children:"Handling error"}),"\n",(0,s.jsxs)(r.p,{children:["Use ",(0,s.jsx)(r.code,{children:"Result.mapError"})," and/or ",(0,s.jsx)(r.code,{children:"Result.orElse"})," to transform ",(0,s.jsx)(r.code,{children:"Error"})," error."]}),"\n",(0,s.jsx)(r.pre,{children:(0,s.jsx)(r.code,{className:"language-ts",children:"const handleZeroDivisionError = <E>(result: Result<number, E|ZeroDivisionError>) => {\n    return Result.orElse(result, (error) => {\n        switch (error.name): {\n            case ZeroDivisionError.typeName: return Result.Ok(0);\n            default: Result.Error(error);\n        }\n    });// Result<number, E>\n};\n"})}),"\n",(0,s.jsx)(r.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,s.jsxs)(r.admonition,{type:"tip",children:[(0,s.jsxs)(r.h3,{id:"always-use-result-when-possible",children:["Always use ",(0,s.jsx)(r.code,{children:"Result"})," when possible"]}),(0,s.jsxs)(r.ul,{children:["\n",(0,s.jsxs)(r.li,{children:["Prefer using ",(0,s.jsx)(r.code,{children:"Result"})," over throwing error."]}),"\n",(0,s.jsxs)(r.li,{children:["Prefer using ",(0,s.jsx)(r.code,{children:"Result"})," over returning ",(0,s.jsx)(r.code,{children:"Option"})," for a non representable value"]}),"\n",(0,s.jsxs)(r.li,{children:["When throwing error prefer using ",(0,s.jsx)(r.code,{children:"import { invariant } from '@w5s/invariant'"})]}),"\n"]})]}),"\n",(0,s.jsx)(r.h2,{id:"faq",children:"FAQ"}),"\n",(0,s.jsxs)(n,{children:[(0,s.jsx)("summary",{children:(0,s.jsxs)(r.p,{children:["Why choose the name ",(0,s.jsx)(r.code,{children:"Result"})," over ",(0,s.jsx)(r.code,{children:"Either"})," ?"]})}),(0,s.jsxs)(r.p,{children:["It is a matter of preference. ",(0,s.jsx)(r.code,{children:"Ok"})," / ",(0,s.jsx)(r.code,{children:"Error"})," is more explicit than ",(0,s.jsx)(r.code,{children:"Left"})," / ",(0,s.jsx)(r.code,{children:"Right"}),"."]})]})]})}function u(e={}){const{wrapper:r}={...(0,i.R)(),...e.components};return r?(0,s.jsx)(r,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1184:(e,r,n)=>{n.d(r,{R:()=>t,x:()=>l});var s=n(4041);const i={},o=s.createContext(i);function t(e){const r=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function l(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:t(e.components),s.createElement(o.Provider,{value:r},e.children)}}}]);