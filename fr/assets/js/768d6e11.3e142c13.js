"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[7553],{3398:(e,r,n)=>{n.r(r),n.d(r,{contentTitle:()=>i,default:()=>a,frontMatter:()=>t,toc:()=>c});var o=n(1085),s=n(1184);const t={},i=void 0,c=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"License",id:"license",level:2}];function l(e){const r={a:"a",blockquote:"blockquote",code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.a,{href:"https://www.npmjs.com/package/@w5s/error",children:(0,o.jsx)(r.img,{src:"https://img.shields.io/npm/v/@w5s/error.svg?style=flat-square",alt:"NPM Version"})}),"\n",(0,o.jsx)(r.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/error/LICENSE",children:(0,o.jsx)(r.img,{src:"https://img.shields.io/badge/license-MIT-green.svg?style=flat-square",alt:"License"})})]}),"\n",(0,o.jsxs)(r.blockquote,{children:["\n",(0,o.jsx)(r.p,{children:"Error module"}),"\n"]}),"\n",(0,o.jsx)(r.h2,{id:"installation",children:"Installation"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-sh",children:"npm install @w5s/error\n"})}),"\n",(0,o.jsx)(r.h2,{id:"usage",children:"Usage"}),"\n",(0,o.jsx)(r.pre,{children:(0,o.jsx)(r.code,{className:"language-ts",children:"import { type CustomError, defineCustomError, Error, TypeError } from '@w5s/error';\n\nexport interface MyError\n  extends CustomError<{\n    name: 'MyError';\n    foo: string;\n    bar: boolean;\n  }> {}\nexport const MyError = defineCustomError<MyError>('MyError');\n\nconst myError = MyError({\n  foo: 'this is foo',\n  bar: true,\n  cause: TypeError('this is the cause'),\n});\nconsole.log(myError instanceof Error); // true\n"})}),"\n",(0,o.jsx)(r.h2,{id:"license",children:"License"}),"\n",(0,o.jsxs)(r.p,{children:[(0,o.jsx)(r.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/error/LICENSE",children:"MIT"})," \xa9 Julien Polo ",(0,o.jsx)(r.a,{href:"mailto:julien.polo@gmail.com",children:"julien.polo@gmail.com"})]})]})}function a(e){void 0===e&&(e={});const{wrapper:r}={...(0,s.R)(),...e.components};return r?(0,o.jsx)(r,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},1184:(e,r,n)=>{n.d(r,{R:()=>i,x:()=>c});var o=n(4041);const s={},t=o.createContext(s);function i(e){const r=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function c(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),o.createElement(t.Provider,{value:r},e.children)}}}]);