"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[5939],{1184:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>r});var a=s(4041);const t={},l=a.createContext(t);function o(e){const n=a.useContext(l);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),a.createElement(l.Provider,{value:n},e.children)}},7307:(e,n,s)=>{s.r(n),s.d(n,{contentTitle:()=>o,default:()=>c,frontMatter:()=>l,toc:()=>r});var a=s(1085),t=s(1184);const l={},o="W5S Task modules (@w5s/task)",r=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Example",id:"example",level:3},{value:"License",id:"license",level:2}];function i(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",img:"img",p:"p",pre:"pre",...(0,t.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsxs)(n.h1,{id:"w5s-task-modules-w5stask",children:["W5S Task modules ",(0,a.jsx)(n.em,{children:"(@w5s/task)"})]})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://www.npmjs.com/package/@w5s/task",children:(0,a.jsx)(n.img,{src:"https://img.shields.io/npm/v/@w5s/task.svg?style=flat-square",alt:"NPM Version"})}),"\n",(0,a.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/core/LICENSE",children:(0,a.jsx)(n.img,{src:"https://img.shields.io/badge/license-MIT-green.svg?style=flat-square",alt:"License"})})]}),"\n",(0,a.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-sh",children:"npm install @w5s/task\n"})}),"\n",(0,a.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,a.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"import { Task } from '@w5s/task';\n\nfunction randomNumber() {\n  return Task.create(({ ok }) => ok(Math.random()));\n}\n\nfunction log(value: unknown) {\n  // This is a lazy operation that will only be evaluated when the Task is run\n  return Task.create(({ ok }) => ok(console.log(value)));\n}\n\n// This function returns a task that will do nothing until Task.run is called on it\nexport function main() {\n  // 1. Generate a random number\n  const randomValueTask = randomNumber();\n  // 2. Compute square value\n  const squareValueTask = Task.map(randomValueTask, (value) => value * value);\n  // 3. Log value in console\n  return Task.andThen(squareValueTask, log);\n}\n\n// runTask is impure and should be put at the edge of the program\nvoid Task.run(main()); // prints { _: 'Result/Ok', value: <random number> * <random number> }\n"})}),"\n",(0,a.jsx)(n.h2,{id:"license",children:"License"}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.a,{href:"https://github.com/w5s/project-config/blob/HEAD/packages/core/LICENSE",children:"MIT"})," \xa9 Julien Polo ",(0,a.jsx)(n.a,{href:"mailto:julien.polo@gmail.com",children:"julien.polo@gmail.com"})]})]})}function c(e){void 0===e&&(e={});const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(i,{...e})}):i(e)}}}]);