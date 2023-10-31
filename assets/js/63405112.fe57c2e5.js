"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[1002],{876:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>g});var r=n(2784);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},s=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),u=p(n),f=a,g=u["".concat(c,".").concat(f)]||u[f]||m[f]||o;return n?r.createElement(g,l(l({ref:t},s),{},{components:n})):r.createElement(g,l({ref:t},s))}));function g(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=f;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i[u]="string"==typeof e?e:a,l[1]=i;for(var p=2;p<o;p++)l[p]=n[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},7970:(e,t,n)=>{n.r(t),n.d(t,{contentTitle:()=>l,default:()=>s,frontMatter:()=>o,toc:()=>i});var r=n(7896),a=(n(2784),n(876));const o={},l=void 0,i=[{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"License",id:"license",level:2}],c={toc:i},p="wrapper";function s(e){let{components:t,...n}=e;return(0,a.kt)(p,(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/@w5s/application"},(0,a.kt)("img",{parentName:"a",src:"https://img.shields.io/npm/v/@w5s/application.svg?style=flat-square",alt:"NPM Version"})),"\n",(0,a.kt)("a",{parentName:"p",href:"../../LICENSE"},(0,a.kt)("img",{parentName:"a",src:"https://img.shields.io/badge/license-MIT-green.svg?style=flat-square",alt:"License"}))),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Application management")),(0,a.kt)("h2",{id:"installation"},"Installation"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"npm install @w5s/application\n")),(0,a.kt)("h2",{id:"usage"},"Usage"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"import { globalStorage, useRef } from '@w5s/application';\n\nexport function main(): void {\n  const counterRef = useRef('counter', 1);\n\n  counterRef.current += 1;\n  console.log(counterRef.current); // 2\n  console.log(globalStorage.get('counter')); // 2\n}\n")),(0,a.kt)("h2",{id:"license"},"License"),(0,a.kt)("p",null,(0,a.kt)("a",{parentName:"p",href:"../../LICENSE"},"MIT")," \xa9 Julien Polo ",(0,a.kt)("a",{parentName:"p",href:"mailto:julien.polo@gmail.com"},"julien.polo@gmail.com")))}s.isMDXComponent=!0}}]);