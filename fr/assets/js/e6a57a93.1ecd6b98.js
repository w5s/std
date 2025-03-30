"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[4752],{3142:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>c,contentTitle:()=>l,default:()=>p,frontMatter:()=>o,metadata:()=>t,toc:()=>u});const t=JSON.parse('{"id":"packages/error/stopping-execution","title":"Stopping execution","description":"Throw errors to stop execution with recoverable errors","source":"@site/docs/packages/0-error/stopping-execution.mdx","sourceDirName":"packages/0-error","slug":"/packages/error/stopping-execution","permalink":"/std/fr/docs/packages/error/stopping-execution","draft":false,"unlisted":false,"editUrl":"https://github.com/w5s/std.git/tree/main/apps/website/docs/packages/0-error/stopping-execution.mdx","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Creating Error type","permalink":"/std/fr/docs/packages/error/creating-error-type"},"next":{"title":"Core","permalink":"/std/fr/docs/category/core"}}');var a=r(1085),i=r(1184),s=r(2940);r(343);const o={sidebar_position:2},l="Stopping execution",c={},u=[{value:"Stopping execution with panic errors",id:"stopping-execution-with-panic-errors",level:2},{value:"Stopping execution with a condition (assertion)",id:"stopping-execution-with-a-condition-assertion",level:2},{value:"FAQ",id:"faq",level:2},{value:"Use <code>throw</code> with caution : when the program should be stopped",id:"disclaimer",level:3}];function d(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components},{Details:r}=n;return r||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"stopping-execution",children:"Stopping execution"})}),"\n",(0,a.jsxs)(n.blockquote,{children:["\n",(0,a.jsx)(n.p,{children:"Throw errors to stop execution with recoverable errors"}),"\n"]}),"\n",(0,a.jsx)(s.n,{apiHref:"/api/error/function/invariant"}),"\n",(0,a.jsx)(n.h2,{id:"stopping-execution-with-panic-errors",children:"Stopping execution with panic errors"}),"\n",(0,a.jsx)(n.admonition,{type:"warning",children:(0,a.jsxs)(n.p,{children:["Use with caution. ",(0,a.jsx)(n.a,{href:"./stopping-execution#disclaimer",children:"See explanation"})]})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"panic"})," is equivalent to ",(0,a.jsx)(n.code,{children:"throw"})," statement but as a function, it has the advantages :"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"it can be used as an expression (ex: in ternary operator)"}),"\n",(0,a.jsx)(n.li,{children:"it can be used as a parameter (ex: as a callback)"}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"import { panic } from '@w5s/error';\n\nfunction unsafeAsNotNullable(value: unknown) {\n  return value ?? panic(new TypeError('Value must not be nullable'));\n}\n"})}),"\n",(0,a.jsx)(n.h2,{id:"stopping-execution-with-a-condition-assertion",children:"Stopping execution with a condition (assertion)"}),"\n",(0,a.jsx)(n.admonition,{type:"warning",children:(0,a.jsxs)(n.p,{children:["Use with caution. ",(0,a.jsx)(n.a,{href:"./stopping-execution#disclaimer",children:"See explanation"})]})}),"\n",(0,a.jsxs)(n.p,{children:[(0,a.jsx)(n.code,{children:"invariant"})," can be used to assert a condition. If the condition is false, it will throw an error with a descriptive message."]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"invariant(\n  condition, \n  // \u2713 Describe what is wrong\n  // \u2713 Add a hint on how to fix it\n  // \u2713 Starts with upper case character\n  // ex: '\"A\" is not a valid integer', 'Unexpected parameter \"foo_bar\"', ...\n  '{{Invariant message}}'\n);\n"})}),"\n",(0,a.jsxs)(r,{children:[(0,a.jsx)("summary",{children:(0,a.jsx)(n.p,{children:"Example"})}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-typescript",children:"import { invariant } from '@w5s/error';\n\nfunction program() {\n  invariant(true, 'This will not throw an error'); \n  // -> nothing\n  invariant(false, 'This will throw an error'); \n  // -> throw InvariantError { message: 'Input should not be null' } when input is null or undefined\n\n  //... do something with input\n}\n"})})]}),"\n",(0,a.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,a.jsxs)(n.admonition,{type:"warning",children:[(0,a.jsxs)(n.h3,{id:"disclaimer",children:["Use ",(0,a.jsx)(n.code,{children:"throw"})," with caution : when the program should be stopped"]}),(0,a.jsxs)(n.p,{children:["In general, ",(0,a.jsx)(n.strong,{children:"throwing errors is discouraged"}),", instead ",(0,a.jsx)(n.a,{href:"../core/result",children:"Result"})," should be used."]}),(0,a.jsx)(n.p,{children:"Nevertheless, errors can be thrown when :"}),(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Some condition is detected during runtime and the program cannot continue (i.e. assertion)"}),"\n",(0,a.jsx)(n.li,{children:"Program is in an impossible logical state and should be stopped (i.e. panic)"}),"\n"]})]})]})}function p(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},2940:(e,n,r)=>{r.d(n,{n:()=>c});var t=r(2436),a=r(2196),i=r(396);const s={badgeGroup:"badgeGroup_YkPD",badge:"badge_qV9W",apiLink:"apiLink_d4om"};var o=r(1085);const l=(e,n,r)=>{let{siteConfig:t}=e;const a={className:s.badge,key:r.badgeType},i=r.badgeStyle??"flat-square";if(null!=n.packageName)switch(r.badgeType){case"bundle-size":return(0,o.jsx)("img",{...a,alt:"Bundle size",src:`https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(n.packageName)}?style=${i}`});case"npm-license":return(0,o.jsx)("img",{...a,alt:"NPM License",src:`https://img.shields.io/npm/l/${encodeURIComponent(n.packageName)}?style=${i}`});case"npm-version":return(0,o.jsx)("img",{...a,alt:"Github version",src:`https://img.shields.io/npm/v/${encodeURIComponent(n.packageName)}?style=${i}`})}return""};function c(e){const n=(0,i.default)(),{siteConfig:r}=n;return(0,o.jsxs)(o.Fragment,{children:[null==e.apiHref?null:(0,o.jsxs)(t.default,{className:s.apiLink,to:`${r.url}${r.baseUrl.replace(/\/$/,"")}${e.apiHref}`,children:["API ",(0,o.jsx)(a.A,{})]}),["npm-version","npm-license","bundle-size"].map((r=>l(n,e,{badgeType:r})))]})}},343:(e,n,r)=>{r.d(n,{d:()=>S});var t=r(4041),a=r(4357),i=r(1034),s=r(6090),o=r(3351),l=r(6703),c=r(6004),u=r(9001);function d(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function p(e){const{values:n,children:r}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return d(e).map((e=>{let{props:{value:n,label:r,attributes:t,default:a}}=e;return{value:n,label:r,attributes:t,default:a}}))}(r);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,r])}function h(e){let{value:n,tabValues:r}=e;return r.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:r}=e;const a=(0,s.W6)(),i=function(e){let{queryString:n=!1,groupId:r}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:n,groupId:r});return[(0,l.aZ)(i),(0,t.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(a.location.search);n.set(i,e),a.replace({...a.location,search:n.toString()})}),[i,a])]}function g(e){const{defaultValue:n,queryString:r=!1,groupId:a}=e,i=p(e),[s,l]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!h({value:n,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=r.find((e=>e.default))??r[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:i}))),[c,d]=m({queryString:r,groupId:a}),[g,b]=function(e){let{groupId:n}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(n),[a,i]=(0,u.Dv)(r);return[a,(0,t.useCallback)((e=>{r&&i.set(e)}),[r,i])]}({groupId:a}),f=(()=>{const e=c??g;return h({value:e,tabValues:i})?e:null})();(0,o.A)((()=>{f&&l(f)}),[f]);return{selectedValue:s,selectValue:(0,t.useCallback)((e=>{if(!h({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),b(e)}),[d,b,i]),tabValues:i}}var b=r(213);const f={tabList:"tabList_M0Dn",tabItem:"tabItem_ysIP"};var x=r(1085);function v(e){let{className:n,block:r,selectedValue:t,selectValue:s,tabValues:o}=e;const l=[],{blockElementScrollPositionUntilNextRender:c}=(0,i.a_)(),u=e=>{const n=e.currentTarget,r=l.indexOf(n),a=o[r].value;a!==t&&(c(n),s(a))},d=e=>{let n=null;switch(e.key){case"Enter":u(e);break;case"ArrowRight":{const r=l.indexOf(e.currentTarget)+1;n=l[r]??l[0];break}case"ArrowLeft":{const r=l.indexOf(e.currentTarget)-1;n=l[r]??l[l.length-1];break}}n?.focus()};return(0,x.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,a.A)("tabs",{"tabs--block":r},n),children:o.map((e=>{let{value:n,label:r,attributes:i}=e;return(0,x.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>l.push(e),onKeyDown:d,onClick:u,...i,className:(0,a.A)("tabs__item",f.tabItem,i?.className,{"tabs__item--active":t===n}),children:r??n},n)}))})}function w(e){let{lazy:n,children:r,selectedValue:i}=e;const s=(Array.isArray(r)?r:[r]).filter(Boolean);if(n){const e=s.find((e=>e.props.value===i));return e?(0,t.cloneElement)(e,{className:(0,a.A)("margin-top--md",e.props.className)}):null}return(0,x.jsx)("div",{className:"margin-top--md",children:s.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==i})))})}function j(e){const n=g(e);return(0,x.jsxs)("div",{className:(0,a.A)("tabs-container",f.tabList),children:[(0,x.jsx)(v,{...n,...e}),(0,x.jsx)(w,{...n,...e})]})}function y(e){const n=(0,b.A)();return(0,x.jsx)(j,{...e,children:d(e.children)},String(n))}const k={tabItem:"tabItem_OMyP"};function I(e){let{children:n,hidden:r,className:t}=e;return(0,x.jsx)("div",{role:"tabpanel",className:(0,a.A)(k.tabItem,t),hidden:r,children:n})}var N=r(2053);function S(e){let{packageName:n}=e;return(0,x.jsxs)(y,{groupId:"package-manager",defaultValue:"yarn",values:[{label:"yarn",value:"yarn"},{label:"pnpm",value:"pnpm"},{label:"npm",value:"npm"}],children:[(0,x.jsx)(I,{value:"yarn",children:(0,x.jsxs)(N.default,{language:"bash",children:["yarn add ",n]})}),(0,x.jsx)(I,{value:"pnpm",children:(0,x.jsxs)(N.default,{language:"bash",children:["pnpm add ",n]})}),(0,x.jsx)(I,{value:"npm",children:(0,x.jsxs)(N.default,{language:"bash",children:["npm install ",n]})})]})}}}]);