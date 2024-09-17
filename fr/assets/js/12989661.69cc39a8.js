"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[5939],{7307:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>i,default:()=>c,frontMatter:()=>r,toc:()=>l});var s=t(1085),o=t(1184);const r={},i=void 0,l=[{value:"About the project",id:"about-the-project",level:2},{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Example",id:"example",level:3},{value:"License",id:"license",level:2}];function a(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/@w5s/task",children:(0,s.jsx)(n.img,{src:"https://img.shields.io/npm/v/@w5s/task.svg?style=flat-square",alt:"NPM Version"})}),"\n",(0,s.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/core/LICENSE",children:(0,s.jsx)(n.img,{src:"https://img.shields.io/badge/license-MIT-green.svg?style=flat-square",alt:"License"})})]}),"\n",(0,s.jsxs)(n.blockquote,{children:["\n",(0,s.jsx)(n.p,{children:"Task modules"}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"about-the-project",children:"About the project"}),"\n",(0,s.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"npm install @w5s/task\n"})}),"\n",(0,s.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { Result } from '@w5s/core';\nimport { Console, Task } from '@w5s/task';\n\nfunction parseNumber(expr: string) {\n  const parsed = Number(expr);\n\n  // - Return a immutable Result object\n  // - Avoid throwing error because impure\n  // - Avoid using NaN because the error case is implicit in the typing\n  return Number.isNaN(parsed) ? Result.Ok(parsed) : Result.Error('NotANumber');\n}\n\nexport function main() {\n  const parsed = parseNumber('1.1'); // Result.Ok(1.1)\n  const computed = Result.map(parsed, (amount) => amount + 2); // Result.Ok(3.1)\n\n  // Lazy operation that will display in console the computed result when evaluated\n  return Console.debug(computed);\n}\n\n// runTask is impure and should be put at the edge of the program\nvoid Task.unsafeRun(main()); // prints { _: 'Result/Ok', value: 3.1 }\n"})}),"\n",(0,s.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/core/LICENSE",children:"MIT"})," \xa9 Julien Polo ",(0,s.jsx)(n.a,{href:"mailto:julien.polo@gmail.com",children:"julien.polo@gmail.com"})]})]})}function c(e){void 0===e&&(e={});const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},1184:(e,n,t)=>{t.d(n,{R:()=>i,x:()=>l});var s=t(4041);const o={},r=s.createContext(o);function i(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);