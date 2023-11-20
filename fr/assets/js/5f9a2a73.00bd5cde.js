"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[5984],{2566:(e,n,r)=>{r.r(n),r.d(n,{contentTitle:()=>l,default:()=>i,frontMatter:()=>t,toc:()=>a});var o=r(2322),s=r(5392);const t={},l=void 0,a=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"License",id:"license",level:2}];function c(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://www.npmjs.com/package/@w5s/http",children:(0,o.jsx)(n.img,{src:"https://img.shields.io/npm/v/@w5s/http.svg?style=flat-square",alt:"NPM Version"})}),"\n",(0,o.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/http/LICENSE",children:(0,o.jsx)(n.img,{src:"https://img.shields.io/badge/license-MIT-green.svg?style=flat-square",alt:"License"})})]}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsx)(n.p,{children:"HTTP client module"}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-console",children:"npm install @w5s/http\n"})}),"\n",(0,o.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { HTTP, HTTPError, HTTPParser } from '@w5s/http';\nimport { Console, Task, unsafeRun } from '@w5s/core';\n\nconst getText = (id: number) => ({\n  url: `http://localhost/${id}`,\n  parse: HTTPParser.json<{ foo: boolean }>('unsafe'),\n});\n\nexport function program() {\n  const task = HTTP.request(getText(123));\n  const log = Task.andThen(task, (response) => Console.debug(response.foo));\n  const handled = Task.orElse(log, (error) => {\n    switch (error.name) {\n      case HTTPError.InvalidURL.errorName: {\n        return Console.error(`A wrong url was passed. Got ${error.input}`);\n      }\n      case HTTPError.NetworkError.errorName: {\n        return Console.error('A network error occurred');\n      }\n      case HTTPError.ParserError.errorName: {\n        return Console.error('A parser error occurred');\n      }\n      default: {\n        return Console.error('Unknown');\n      }\n    }\n  });\n\n  return handled;\n}\n\nunsafeRun(program()); // Result<{ foo: boolean }, FetchNetworkError|FetchParseError>\n"})}),"\n",(0,o.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/http/LICENSE",children:"MIT"})," \xa9 Julien Polo ",(0,o.jsx)(n.a,{href:"mailto:julien.polo@gmail.com",children:"julien.polo@gmail.com"})]})]})}function i(e){void 0===e&&(e={});const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},5392:(e,n,r)=>{r.d(n,{Z:()=>a,a:()=>l});var o=r(2784);const s={},t=o.createContext(s);function l(e){const n=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),o.createElement(t.Provider,{value:n},e.children)}}}]);