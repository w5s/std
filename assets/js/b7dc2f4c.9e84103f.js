"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[1062],{6740:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>l,metadata:()=>u,toc:()=>d});var t=a(1085),r=a(1184),i=a(2940),s=a(7328);const l={sidebar_position:0},o="Invariant",u={id:"packages/invariant",title:"Invariant",description:"Throw descriptive error in development, generic error in production.",source:"@site/docs/packages/invariant.mdx",sourceDirName:"packages",slug:"/packages/invariant",permalink:"/std/docs/packages/invariant",draft:!1,unlisted:!1,editUrl:"https://github.com/w5s/std.git/tree/main/apps/website/docs/packages/invariant.mdx",tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0},sidebar:"tutorialSidebar",previous:{title:"Packages",permalink:"/std/docs/category/packages"},next:{title:"Error",permalink:"/std/docs/packages/error"}},c={},d=[{value:"Motivation",id:"motivation",level:2},{value:"Installation",id:"installation",level:2},{value:"Usage",id:"usage",level:2},{value:"Coding Guide",id:"coding-guide",level:2},{value:"Use <code>invariant</code> with caution",id:"use-invariant-with-caution",level:3},{value:"FAQ",id:"faq",level:2}];function p(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"invariant",children:"Invariant"}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"Throw descriptive error in development, generic error in production."}),"\n"]}),"\n",(0,t.jsx)(i.n,{packageName:"@w5s/invariant",apiHref:"/api/invariant"}),"\n",(0,t.jsx)(n.h2,{id:"motivation",children:"Motivation"}),"\n",(0,t.jsx)(n.p,{children:"This package provides a simple way to throw error from an assertion and a message.\nIt is built to be easily parsable / stripable at compile time."}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(s.d,{packageName:"@w5s/invariant"}),"\n",(0,t.jsx)(n.h2,{id:"usage",children:"Usage"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { invariant } from '@w5s/invariant';\n\nfunction program() {\n  invariant(true, 'This will not throw an error'); \n  // -> nothing\n  invariant(false, 'This will throw an error'); \n  // -> throw InvariantError { message: 'Input should not be null' } when input is null or undefined\n\n  //... do something with input\n}\n"})}),"\n",(0,t.jsx)(n.h2,{id:"coding-guide",children:"Coding Guide"}),"\n",(0,t.jsxs)(n.admonition,{type:"warning",children:[(0,t.jsxs)(n.h3,{id:"use-invariant-with-caution",children:["Use ",(0,t.jsx)(n.code,{children:"invariant"})," with caution"]}),(0,t.jsxs)(n.p,{children:["In general, ",(0,t.jsx)(n.strong,{children:"throwing errors is discouraged"}),", instead ",(0,t.jsx)(n.a,{href:"./core/result",children:"Result"})," should be used."]}),(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"./error#throwing-errors",children:"See explanation"})})]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"invariant(\n  condition, \n  // \u2713 Describe what is wrong\n  // \u2713 Add a hint on how to fix it\n  // \u2713 Starts with upper case character\n  // ex: '\"A\" is not a valid integer', 'Unexpected parameter \"foo_bar\"', ...\n  '{{Invariant message}}'\n);\n"})}),"\n",(0,t.jsx)(n.h2,{id:"faq",children:"FAQ"})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(p,{...e})}):p(e)}},2940:(e,n,a)=>{a.d(n,{n:()=>u});var t=a(2436),r=a(2196),i=a(396);const s={badgeGroup:"badgeGroup_YkPD",badge:"badge_qV9W",apiLink:"apiLink_d4om"};var l=a(1085);const o=(e,n,a)=>{let{siteConfig:t}=e;const r={className:s.badge,key:a.badgeType},i=a.badgeStyle??"flat-square";if(null!=n.packageName)switch(a.badgeType){case"bundle-size":return(0,l.jsx)("img",{...r,alt:"Bundle size",src:`https://img.shields.io/bundlephobia/minzip/${encodeURIComponent(n.packageName)}?style=${i}`});case"npm-license":return(0,l.jsx)("img",{...r,alt:"NPM License",src:`https://img.shields.io/npm/l/${encodeURIComponent(n.packageName)}?style=${i}`});case"npm-version":return(0,l.jsx)("img",{...r,alt:"Github version",src:`https://img.shields.io/npm/v/${encodeURIComponent(n.packageName)}?style=${i}`})}return""};function u(e){const n=(0,i.default)(),{siteConfig:a}=n;return(0,l.jsxs)(l.Fragment,{children:[null==e.apiHref?null:(0,l.jsxs)(t.default,{className:s.apiLink,to:`${a.url}${a.baseUrl.replace(/\/$/,"")}${e.apiHref}`,children:["API ",(0,l.jsx)(r.A,{})]}),["npm-version","npm-license","bundle-size"].map((a=>o(n,e,{badgeType:a})))]})}},7328:(e,n,a)=>{a.d(n,{d:()=>b});var t=a(4041),r=a(4357),i=a(1034),s=a(841),l=a(213);const o={tabList:"tabList_M0Dn",tabItem:"tabItem_ysIP"};var u=a(1085);function c(e){let{className:n,block:a,selectedValue:t,selectValue:s,tabValues:l}=e;const c=[],{blockElementScrollPositionUntilNextRender:d}=(0,i.a_)(),p=e=>{const n=e.currentTarget,a=c.indexOf(n),r=l[a].value;r!==t&&(d(n),s(r))},h=e=>{let n=null;switch(e.key){case"Enter":p(e);break;case"ArrowRight":{const a=c.indexOf(e.currentTarget)+1;n=c[a]??c[0];break}case"ArrowLeft":{const a=c.indexOf(e.currentTarget)-1;n=c[a]??c[c.length-1];break}}n?.focus()};return(0,u.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.A)("tabs",{"tabs--block":a},n),children:l.map((e=>{let{value:n,label:a,attributes:i}=e;return(0,u.jsx)("li",{role:"tab",tabIndex:t===n?0:-1,"aria-selected":t===n,ref:e=>c.push(e),onKeyDown:h,onClick:p,...i,className:(0,r.A)("tabs__item",o.tabItem,i?.className,{"tabs__item--active":t===n}),children:a??n},n)}))})}function d(e){let{lazy:n,children:a,selectedValue:r}=e;const i=(Array.isArray(a)?a:[a]).filter(Boolean);if(n){const e=i.find((e=>e.props.value===r));return e?(0,t.cloneElement)(e,{className:"margin-top--md"}):null}return(0,u.jsx)("div",{className:"margin-top--md",children:i.map(((e,n)=>(0,t.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function p(e){const n=(0,s.u)(e);return(0,u.jsxs)("div",{className:(0,r.A)("tabs-container",o.tabList),children:[(0,u.jsx)(c,{...e,...n}),(0,u.jsx)(d,{...e,...n})]})}function h(e){const n=(0,l.A)();return(0,u.jsx)(p,{...e,children:(0,s.v)(e.children)},String(n))}const m={tabItem:"tabItem_OMyP"};function g(e){let{children:n,hidden:a,className:t}=e;return(0,u.jsx)("div",{role:"tabpanel",className:(0,r.A)(m.tabItem,t),hidden:a,children:n})}var v=a(5094);function b(e){let{packageName:n}=e;return(0,u.jsxs)(h,{groupId:"package-manager",defaultValue:"yarn",values:[{label:"yarn",value:"yarn"},{label:"pnpm",value:"pnpm"},{label:"npm",value:"npm"}],children:[(0,u.jsx)(g,{value:"yarn",children:(0,u.jsxs)(v.default,{language:"bash",children:["yarn add ",n]})}),(0,u.jsx)(g,{value:"pnpm",children:(0,u.jsxs)(v.default,{language:"bash",children:["pnpm add ",n]})}),(0,u.jsx)(g,{value:"npm",children:(0,u.jsxs)(v.default,{language:"bash",children:["npm install ",n]})})]})}},841:(e,n,a)=>{a.d(n,{u:()=>h,v:()=>u});var t=a(4041),r=a(6090),i=a(3351),s=a(6703),l=a(6004),o=a(2096);function u(e){return t.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,t.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function c(e){const{values:n,children:a}=e;return(0,t.useMemo)((()=>{const e=n??function(e){return u(e).map((e=>{let{props:{value:n,label:a,attributes:t,default:r}}=e;return{value:n,label:a,attributes:t,default:r}}))}(a);return function(e){const n=(0,l.X)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,a])}function d(e){let{value:n,tabValues:a}=e;return a.some((e=>e.value===n))}function p(e){let{queryString:n=!1,groupId:a}=e;const i=(0,r.W6)(),l=function(e){let{queryString:n=!1,groupId:a}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!a)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return a??null}({queryString:n,groupId:a});return[(0,s.aZ)(l),(0,t.useCallback)((e=>{if(!l)return;const n=new URLSearchParams(i.location.search);n.set(l,e),i.replace({...i.location,search:n.toString()})}),[l,i])]}function h(e){const{defaultValue:n,queryString:a=!1,groupId:r}=e,s=c(e),[l,u]=(0,t.useState)((()=>function(e){let{defaultValue:n,tabValues:a}=e;if(0===a.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!d({value:n,tabValues:a}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${a.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const t=a.find((e=>e.default))??a[0];if(!t)throw new Error("Unexpected error: 0 tabValues");return t.value}({defaultValue:n,tabValues:s}))),[h,m]=p({queryString:a,groupId:r}),[g,v]=function(e){let{groupId:n}=e;const a=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,i]=(0,o.Dv)(a);return[r,(0,t.useCallback)((e=>{a&&i.set(e)}),[a,i])]}({groupId:r}),b=(()=>{const e=h??g;return d({value:e,tabValues:s})?e:null})();(0,i.A)((()=>{b&&u(b)}),[b]);return{selectedValue:l,selectValue:(0,t.useCallback)((e=>{if(!d({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);u(e),m(e),v(e)}),[m,v,s]),tabValues:s}}}}]);