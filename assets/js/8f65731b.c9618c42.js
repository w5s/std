"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[8689],{1455:(e,n,s)=>{s.r(n),s.d(n,{contentTitle:()=>i,default:()=>a,frontMatter:()=>r,toc:()=>l});var t=s(1085),o=s(1184);const r={},i=void 0,l=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"License",id:"license",level:2}];function c(e){const n={a:"a",blockquote:"blockquote",code:"code",h2:"h2",img:"img",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://www.npmjs.com/package/@w5s/promise",children:(0,t.jsx)(n.img,{src:"https://img.shields.io/npm/v/@w5s/promise.svg?style=flat-square",alt:"NPM Version"})}),"\n",(0,t.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/random/LICENSE",children:(0,t.jsx)(n.img,{src:"https://img.shields.io/badge/license-MIT-green.svg?style=flat-square",alt:"License"})})]}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"Promise module"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"npm install @w5s/promise\n"})}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { Deferred } from '@w5s/promise';\n\nconst deferred = new Deferred<number>();\n\n// resolve\ndeferred.resolve(Date.now());\n\n// reject\ndeferred.reject(new Error('Something went wrong!'));\n\nawait deferred.promise;\n"})}),"\n",(0,t.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/random/LICENSE",children:"MIT"})," \xa9 Julien Polo ",(0,t.jsx)(n.a,{href:"mailto:julien.polo@gmail.com",children:"julien.polo@gmail.com"})]})]})}function a(e){void 0===e&&(e={});const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1184:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>l});var t=s(4041);const o={},r=t.createContext(o);function i(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);