"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[994],{3191:(e,t,a)=>{a.d(t,{A:()=>p});a(4041);var s=a(4357),n=a(8523),l=a(1187),r=a(2436),i=a(9082),o=a(2277);const c={sidebar:"sidebar_RYHo",sidebarItemTitle:"sidebarItemTitle_sRjx",sidebarItemList:"sidebarItemList_uMtB",sidebarItem:"sidebarItem_rygH",sidebarItemLink:"sidebarItemLink_EKgd",sidebarItemLinkActive:"sidebarItemLinkActive_hRXJ"};var d=a(1085);function m(e){let{sidebar:t}=e;const a=(0,o.G)(t.items);return(0,d.jsx)("aside",{className:"col col--3",children:(0,d.jsxs)("nav",{className:(0,s.A)(c.sidebar,"thin-scrollbar"),"aria-label":(0,i.T)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,d.jsx)("div",{className:(0,s.A)(c.sidebarItemTitle,"margin-bottom--md"),children:t.title}),(0,d.jsx)("ul",{className:(0,s.A)(c.sidebarItemList,"clean-list"),children:a.map((e=>(0,d.jsx)("li",{className:c.sidebarItem,children:(0,d.jsx)(r.default,{isNavLink:!0,to:e.permalink,className:c.sidebarItemLink,activeClassName:c.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var u=a(7226);function h(e){let{sidebar:t}=e;const a=(0,o.G)(t.items);return(0,d.jsx)("ul",{className:"menu__list",children:a.map((e=>(0,d.jsx)("li",{className:"menu__list-item",children:(0,d.jsx)(r.default,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function g(e){return(0,d.jsx)(u.GX,{component:h,props:e})}function x(e){let{sidebar:t}=e;const a=(0,l.l)();return t?.items.length?"mobile"===a?(0,d.jsx)(g,{sidebar:t}):(0,d.jsx)(m,{sidebar:t}):null}function p(e){const{sidebar:t,toc:a,children:l,...r}=e,i=t&&t.items.length>0;return(0,d.jsx)(n.A,{...r,children:(0,d.jsx)("div",{className:"container margin-vert--lg",children:(0,d.jsxs)("div",{className:"row",children:[(0,d.jsx)(x,{sidebar:t}),(0,d.jsx)("main",{className:(0,s.A)("col",{"col--7":i,"col--9 col--offset-1":!i}),children:l}),a&&(0,d.jsx)("div",{className:"col col--2",children:a})]})})})}},8273:(e,t,a)=>{a.d(t,{A:()=>L});a(4041);var s=a(4357),n=a(4417),l=a(1085);function r(e){let{children:t,className:a}=e;return(0,l.jsx)("article",{className:a,children:t})}var i=a(2436);const o={title:"title_cIQJ"};function c(e){let{className:t}=e;const{metadata:a,isBlogPostPage:r}=(0,n.e)(),{permalink:c,title:d}=a,m=r?"h1":"h2";return(0,l.jsx)(m,{className:(0,s.A)(o.title,t),children:r?d:(0,l.jsx)(i.default,{to:c,children:d})})}var d=a(9082),m=a(7259),u=a(5392);const h={container:"container_PuMg"};function g(e){let{readingTime:t}=e;const a=function(){const{selectMessage:e}=(0,m.W)();return t=>{const a=Math.ceil(t);return e(a,(0,d.T)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}}();return(0,l.jsx)(l.Fragment,{children:a(t)})}function x(e){let{date:t,formattedDate:a}=e;return(0,l.jsx)("time",{dateTime:t,children:a})}function p(){return(0,l.jsx)(l.Fragment,{children:" \xb7 "})}function j(e){let{className:t}=e;const{metadata:a}=(0,n.e)(),{date:r,readingTime:i}=a,o=(0,u.i)({day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});return(0,l.jsxs)("div",{className:(0,s.A)(h.container,"margin-vert--md",t),children:[(0,l.jsx)(x,{date:r,formattedDate:(c=r,o.format(new Date(c)))}),void 0!==i&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(p,{}),(0,l.jsx)(g,{readingTime:i})]})]});var c}function f(e){return e.href?(0,l.jsx)(i.default,{...e}):(0,l.jsx)(l.Fragment,{children:e.children})}function b(e){let{author:t,className:a}=e;const{name:n,title:r,url:i,imageURL:o,email:c}=t,d=i||c&&`mailto:${c}`||void 0;return(0,l.jsxs)("div",{className:(0,s.A)("avatar margin-bottom--sm",a),children:[o&&(0,l.jsx)(f,{href:d,className:"avatar__photo-link",children:(0,l.jsx)("img",{className:"avatar__photo",src:o,alt:n})}),n&&(0,l.jsxs)("div",{className:"avatar__intro",children:[(0,l.jsx)("div",{className:"avatar__name",children:(0,l.jsx)(f,{href:d,children:(0,l.jsx)("span",{children:n})})}),r&&(0,l.jsx)("small",{className:"avatar__subtitle",children:r})]})]})}const v={authorCol:"authorCol_q_iI",imageOnlyAuthorRow:"imageOnlyAuthorRow_les7",imageOnlyAuthorCol:"imageOnlyAuthorCol_uMKf"};function A(e){let{className:t}=e;const{metadata:{authors:a},assets:r}=(0,n.e)();if(0===a.length)return null;const i=a.every((e=>{let{name:t}=e;return!t}));return(0,l.jsx)("div",{className:(0,s.A)("margin-top--md margin-bottom--sm",i?v.imageOnlyAuthorRow:"row",t),children:a.map(((e,t)=>(0,l.jsx)("div",{className:(0,s.A)(!i&&"col col--6",i?v.imageOnlyAuthorCol:v.authorCol),children:(0,l.jsx)(b,{author:{...e,imageURL:r.authorsImageUrls[t]??e.imageURL}})},t)))})}function N(){return(0,l.jsxs)("header",{children:[(0,l.jsx)(c,{}),(0,l.jsx)(j,{}),(0,l.jsx)(A,{})]})}var _=a(2102),U=a(3480);function w(e){let{children:t,className:a}=e;const{isBlogPostPage:r}=(0,n.e)();return(0,l.jsx)("div",{id:r?_.blogPostContainerID:void 0,className:(0,s.A)("markdown",a),children:(0,l.jsx)(U.default,{children:t})})}var k=a(7473),y=a(8806),T=a(5083);function P(){return(0,l.jsx)("b",{children:(0,l.jsx)(d.A,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read More"})})}function I(e){const{blogPostTitle:t,...a}=e;return(0,l.jsx)(i.default,{"aria-label":(0,d.T)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...a,children:(0,l.jsx)(P,{})})}function C(){const{metadata:e,isBlogPostPage:t}=(0,n.e)(),{tags:a,title:r,editUrl:i,hasTruncateMarker:o,lastUpdatedBy:c,lastUpdatedAt:d}=e,m=!t&&o,u=a.length>0;if(!(u||m||i))return null;if(t){const e=!!(i||d||c);return(0,l.jsxs)("footer",{className:"docusaurus-mt-lg",children:[u&&(0,l.jsx)("div",{className:(0,s.A)("row","margin-top--sm",k.G.blog.blogFooterEditMetaRow),children:(0,l.jsx)("div",{className:"col",children:(0,l.jsx)(T.A,{tags:a})})}),e&&(0,l.jsx)(y.A,{className:(0,s.A)("margin-top--sm",k.G.blog.blogFooterEditMetaRow),editUrl:i,lastUpdatedAt:d,lastUpdatedBy:c})]})}return(0,l.jsxs)("footer",{className:"row docusaurus-mt-lg",children:[u&&(0,l.jsx)("div",{className:(0,s.A)("col",{"col--9":m}),children:(0,l.jsx)(T.A,{tags:a})}),m&&(0,l.jsx)("div",{className:(0,s.A)("col text--right",{"col--3":u}),children:(0,l.jsx)(I,{blogPostTitle:r,to:e.permalink})})]})}function L(e){let{children:t,className:a}=e;const i=function(){const{isBlogPostPage:e}=(0,n.e)();return e?void 0:"margin-bottom--xl"}();return(0,l.jsxs)(r,{className:(0,s.A)(i,a),children:[(0,l.jsx)(N,{}),(0,l.jsx)(w,{children:t}),(0,l.jsx)(C,{})]})}},8806:(e,t,a)=>{a.d(t,{A:()=>p});a(4041);var s=a(4357),n=a(9082),l=a(7473),r=a(2436);const i={iconEdit:"iconEdit_UohW"};var o=a(1085);function c(e){let{className:t,...a}=e;return(0,o.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,s.A)(i.iconEdit,t),"aria-hidden":"true",...a,children:(0,o.jsx)("g",{children:(0,o.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function d(e){let{editUrl:t}=e;return(0,o.jsxs)(r.default,{to:t,className:l.G.common.editThisPage,children:[(0,o.jsx)(c,{}),(0,o.jsx)(n.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}var m=a(5392);function u(e){let{lastUpdatedAt:t}=e;const a=new Date(t),s=(0,m.i)({day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(a);return(0,o.jsx)(n.A,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,o.jsx)("b",{children:(0,o.jsx)("time",{dateTime:a.toISOString(),itemProp:"dateModified",children:s})})},children:" on {date}"})}function h(e){let{lastUpdatedBy:t}=e;return(0,o.jsx)(n.A,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,o.jsx)("b",{children:t})},children:" by {user}"})}function g(e){let{lastUpdatedAt:t,lastUpdatedBy:a}=e;return(0,o.jsxs)("span",{className:l.G.common.lastUpdated,children:[(0,o.jsx)(n.A,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t?(0,o.jsx)(u,{lastUpdatedAt:t}):"",byUser:a?(0,o.jsx)(h,{lastUpdatedBy:a}):""},children:"Last updated{atDate}{byUser}"}),!1]})}const x={lastUpdated:"lastUpdated_g62E"};function p(e){let{className:t,editUrl:a,lastUpdatedAt:n,lastUpdatedBy:l}=e;return(0,o.jsxs)("div",{className:(0,s.A)("row",t),children:[(0,o.jsx)("div",{className:"col",children:a&&(0,o.jsx)(d,{editUrl:a})}),(0,o.jsx)("div",{className:(0,s.A)("col",x.lastUpdated),children:(n||l)&&(0,o.jsx)(g,{lastUpdatedAt:n,lastUpdatedBy:l})})]})}},56:(e,t,a)=>{a.d(t,{A:()=>r});a(4041);var s=a(4357),n=a(2436),l=a(1085);function r(e){const{permalink:t,title:a,subLabel:r,isNext:i}=e;return(0,l.jsxs)(n.default,{className:(0,s.A)("pagination-nav__link",i?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[r&&(0,l.jsx)("div",{className:"pagination-nav__sublabel",children:r}),(0,l.jsx)("div",{className:"pagination-nav__label",children:a})]})}},2247:(e,t,a)=>{a.d(t,{A:()=>i});a(4041);var s=a(4357),n=a(2436);const l={tag:"tag_qE9H",tagRegular:"tagRegular_aHXt",tagWithCount:"tagWithCount_UC8q"};var r=a(1085);function i(e){let{permalink:t,label:a,count:i}=e;return(0,r.jsxs)(n.default,{href:t,className:(0,s.A)(l.tag,i?l.tagWithCount:l.tagRegular),children:[a,i&&(0,r.jsx)("span",{children:i})]})}},5083:(e,t,a)=>{a.d(t,{A:()=>o});a(4041);var s=a(4357),n=a(9082),l=a(2247);const r={tags:"tags_q74f",tag:"tag_lSC7"};var i=a(1085);function o(e){let{tags:t}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("b",{children:(0,i.jsx)(n.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,i.jsx)("ul",{className:(0,s.A)(r.tags,"padding--none","margin-left--sm"),children:t.map((e=>{let{label:t,permalink:a}=e;return(0,i.jsx)("li",{className:r.tag,children:(0,i.jsx)(l.A,{label:t,permalink:a})},a)}))})]})}},4417:(e,t,a)=>{a.d(t,{e:()=>o,i:()=>i});var s=a(4041),n=a(1786),l=a(1085);const r=s.createContext(null);function i(e){let{children:t,content:a,isBlogPostPage:n=!1}=e;const i=function(e){let{content:t,isBlogPostPage:a}=e;return(0,s.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:a})),[t,a])}({content:a,isBlogPostPage:n});return(0,l.jsx)(r.Provider,{value:i,children:t})}function o(){const e=(0,s.useContext)(r);if(null===e)throw new n.dV("BlogPostProvider");return e}},5392:(e,t,a)=>{a.d(t,{i:()=>n});var s=a(396);function n(e){void 0===e&&(e={});const{i18n:{currentLocale:t}}=(0,s.default)(),a=function(){const{i18n:{currentLocale:e,localeConfigs:t}}=(0,s.default)();return t[e].calendar}();return new Intl.DateTimeFormat(t,{calendar:a,...e})}},2277:(e,t,a)=>{a.d(t,{G:()=>r});var s=a(4041),n=a(6090),l=a(4271);function r(e){const{pathname:t}=(0,n.zy)();return(0,s.useMemo)((()=>e.filter((e=>function(e,t){return!(e.unlisted&&!(0,l.ys)(e.permalink,t))}(e,t)))),[e,t])}},7259:(e,t,a)=>{a.d(t,{W:()=>c});var s=a(4041),n=a(396);const l=["zero","one","two","few","many","other"];function r(e){return l.filter((t=>e.includes(t)))}const i={locale:"en",pluralForms:r(["one","other"]),select:e=>1===e?"one":"other"};function o(){const{i18n:{currentLocale:e}}=(0,n.default)();return(0,s.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:r(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),i}}),[e])}function c(){const e=o();return{selectMessage:(t,a)=>function(e,t,a){const s=e.split("|");if(1===s.length)return s[0];s.length>a.pluralForms.length&&console.error(`For locale=${a.locale}, a maximum of ${a.pluralForms.length} plural forms are expected (${a.pluralForms.join(",")}), but the message contains ${s.length}: ${e}`);const n=a.select(t),l=a.pluralForms.indexOf(n);return s[Math.min(l,s.length-1)]}(a,t,e)}}}}]);