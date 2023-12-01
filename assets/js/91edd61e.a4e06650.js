"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[6607],{1501:(e,n,s)=>{s.r(n),s.d(n,{contentTitle:()=>i,default:()=>l,frontMatter:()=>a,toc:()=>r});var o=s(2322),t=s(5392);const a={},i=void 0,r=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"License",id:"license",level:2}];function c(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://www.npmjs.com/package/@w5s/random",children:(0,o.jsx)(n.img,{src:"https://img.shields.io/npm/v/@w5s/random.svg?style=flat-square",alt:"NPM Version"})}),"\n",(0,o.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/random/LICENSE",children:(0,o.jsx)(n.img,{src:"https://img.shields.io/badge/license-MIT-green.svg?style=flat-square",alt:"License"})})]}),"\n",(0,o.jsxs)(n.blockquote,{children:["\n",(0,o.jsx)(n.p,{children:"Random module (UUID, number)"}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-sh",children:"npm install @w5s/random\n"})}),"\n",(0,o.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"import { randomUUID } from '@w5s/random';\nimport { Task, unsafeRun } from '@w5s/core';\n\nfunction createUser(name: string) {\n  return Task.map(randomUUID(), (uuid) => ({\n    id: uuid,\n    name,\n  }));\n}\n\nexport function main(): void {\n  const userTask = createUser('John Doe');\n  console.log(unsafeRun(userTask)); // > Result.Ok({ id: 'XXXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXX', name: 'John Doe' })\n}\n"})}),"\n",(0,o.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/random/LICENSE",children:"MIT"})," \xa9 Julien Polo ",(0,o.jsx)(n.a,{href:"mailto:julien.polo@gmail.com",children:"julien.polo@gmail.com"})]})]})}function l(e){void 0===e&&(e={});const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},5392:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>i});var o=s(2784);const t={},a=o.createContext(t);function i(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);