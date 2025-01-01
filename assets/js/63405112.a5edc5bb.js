"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[8213],{9498:(e,n,t)=>{t.r(n),t.d(n,{contentTitle:()=>a,default:()=>r,frontMatter:()=>o,toc:()=>l});var s=t(1085),i=t(1184);const o={},a="W5S Application management (@w5s/application)",l=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"License",id:"license",level:2}];function c(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",img:"img",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsxs)(n.h1,{id:"w5s-application-management-w5sapplication",children:["W5S Application management ",(0,s.jsx)(n.em,{children:"(@w5s/application)"})]})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://www.npmjs.com/package/@w5s/application",children:(0,s.jsx)(n.img,{src:"https://img.shields.io/npm/v/@w5s/application.svg?style=flat-square",alt:"NPM Version"})}),"\n",(0,s.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/application/LICENSE",children:(0,s.jsx)(n.img,{src:"https://img.shields.io/badge/license-MIT-green.svg?style=flat-square",alt:"License"})})]}),"\n",(0,s.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"npm install @w5s/application\n"})}),"\n",(0,s.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { useStorage, useRef } from '@w5s/application';\n\nexport function main(): void {\n  const globalStorage = useStorage(globalThis);\n  const counterRef = useRef(globalStorage, 'counter', 1);\n\n  counterRef.current += 1;\n  console.log(counterRef.current); // 2\n  console.log(globalStorage.get('counter')); // 2\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/application/LICENSE",children:"MIT"})," \xa9 Julien Polo ",(0,s.jsx)(n.a,{href:"mailto:julien.polo@gmail.com",children:"julien.polo@gmail.com"})]})]})}function r(e){void 0===e&&(e={});const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},1184:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>l});var s=t(4041);const i={},o=s.createContext(i);function a(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);