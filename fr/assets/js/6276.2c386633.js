"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[6276],{9471:(e,t,a)=>{a.d(t,{A:()=>i});a(4041);var s=a(9082),n=a(56),l=a(1085);function i(e){const{metadata:t}=e,{previousPage:a,nextPage:i}=t;return(0,l.jsxs)("nav",{className:"pagination-nav","aria-label":(0,s.T)({id:"theme.blog.paginator.navAriaLabel",message:"Blog list page navigation",description:"The ARIA label for the blog pagination"}),children:[a&&(0,l.jsx)(n.A,{permalink:a,title:(0,l.jsx)(s.A,{id:"theme.blog.paginator.newerEntries",description:"The label used to navigate to the newer blog posts page (previous page)",children:"Newer entries"})}),i&&(0,l.jsx)(n.A,{permalink:i,title:(0,l.jsx)(s.A,{id:"theme.blog.paginator.olderEntries",description:"The label used to navigate to the older blog posts page (next page)",children:"Older entries"}),isNext:!0})]})}},3701:(e,t,a)=>{a.d(t,{A:()=>B});a(4041);var s=a(4357),n=a(1098),l=a(1085);function i(e){let{children:t,className:a}=e;return(0,l.jsx)("article",{className:a,children:t})}var r=a(2436);const o={title:"title_cIQJ"};function d(e){let{className:t}=e;const{metadata:a,isBlogPostPage:i}=(0,n.e7)(),{permalink:d,title:c}=a,u=i?"h1":"h2";return(0,l.jsx)(u,{className:(0,s.A)(o.title,t),children:i?c:(0,l.jsx)(r.default,{to:d,children:c})})}var c=a(9082),u=a(7259),m=a(5392);const h={container:"container_PuMg"};function g(e){let{readingTime:t}=e;const a=function(){const{selectMessage:e}=(0,u.W)();return t=>{const a=Math.ceil(t);return e(a,(0,c.T)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}}();return(0,l.jsx)(l.Fragment,{children:a(t)})}function p(e){let{date:t,formattedDate:a}=e;return(0,l.jsx)("time",{dateTime:t,children:a})}function x(){return(0,l.jsx)(l.Fragment,{children:" \xb7 "})}function j(e){let{className:t}=e;const{metadata:a}=(0,n.e7)(),{date:i,readingTime:r}=a,o=(0,m.i)({day:"numeric",month:"long",year:"numeric",timeZone:"UTC"});return(0,l.jsxs)("div",{className:(0,s.A)(h.container,"margin-vert--md",t),children:[(0,l.jsx)(p,{date:i,formattedDate:(d=i,o.format(new Date(d)))}),void 0!==r&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(x,{}),(0,l.jsx)(g,{readingTime:r})]})]});var d}var f=a(5735);const b={authorCol:"authorCol_q_iI",imageOnlyAuthorRow:"imageOnlyAuthorRow_les7",imageOnlyAuthorCol:"imageOnlyAuthorCol_uMKf"};function A(e){let{className:t}=e;const{metadata:{authors:a},assets:i}=(0,n.e7)();if(0===a.length)return null;const r=a.every((e=>{let{name:t}=e;return!t})),o=1===a.length;return(0,l.jsx)("div",{className:(0,s.A)("margin-top--md margin-bottom--sm",r?b.imageOnlyAuthorRow:"row",t),children:a.map(((e,t)=>(0,l.jsx)("div",{className:(0,s.A)(!r&&(o?"col col--12":"col col--6"),r?b.imageOnlyAuthorCol:b.authorCol),children:(0,l.jsx)(f.A,{author:{...e,imageURL:i.authorsImageUrls[t]??e.imageURL}})},t)))})}function v(){return(0,l.jsxs)("header",{children:[(0,l.jsx)(d,{}),(0,l.jsx)(j,{}),(0,l.jsx)(A,{})]})}var U=a(2102),N=a(3480);function w(e){let{children:t,className:a}=e;const{isBlogPostPage:i}=(0,n.e7)();return(0,l.jsx)("div",{id:i?U.LU:void 0,className:(0,s.A)("markdown",a),children:(0,l.jsx)(N.default,{children:t})})}var T=a(7473),_=a(8806),y=a(5083);function k(){return(0,l.jsx)("b",{children:(0,l.jsx)(c.A,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read more"})})}function C(e){const{blogPostTitle:t,...a}=e;return(0,l.jsx)(r.default,{"aria-label":(0,c.T)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...a,children:(0,l.jsx)(k,{})})}function P(){const{metadata:e,isBlogPostPage:t}=(0,n.e7)(),{tags:a,title:i,editUrl:r,hasTruncateMarker:o,lastUpdatedBy:d,lastUpdatedAt:c}=e,u=!t&&o,m=a.length>0;if(!(m||u||r))return null;if(t){const e=!!(r||c||d);return(0,l.jsxs)("footer",{className:"docusaurus-mt-lg",children:[m&&(0,l.jsx)("div",{className:(0,s.A)("row","margin-top--sm",T.G.blog.blogFooterEditMetaRow),children:(0,l.jsx)("div",{className:"col",children:(0,l.jsx)(y.A,{tags:a})})}),e&&(0,l.jsx)(_.A,{className:(0,s.A)("margin-top--sm",T.G.blog.blogFooterEditMetaRow),editUrl:r,lastUpdatedAt:c,lastUpdatedBy:d})]})}return(0,l.jsxs)("footer",{className:"row docusaurus-mt-lg",children:[m&&(0,l.jsx)("div",{className:(0,s.A)("col",{"col--9":u}),children:(0,l.jsx)(y.A,{tags:a})}),u&&(0,l.jsx)("div",{className:(0,s.A)("col text--right",{"col--3":m}),children:(0,l.jsx)(C,{blogPostTitle:i,to:e.permalink})})]})}function B(e){let{children:t,className:a}=e;const r=function(){const{isBlogPostPage:e}=(0,n.e7)();return e?void 0:"margin-bottom--xl"}();return(0,l.jsxs)(i,{className:(0,s.A)(r,a),children:[(0,l.jsx)(v,{}),(0,l.jsx)(w,{children:t}),(0,l.jsx)(P,{})]})}},5906:(e,t,a)=>{a.d(t,{A:()=>i});a(4041);var s=a(1098),n=a(3701),l=a(1085);function i(e){let{items:t,component:a=n.A}=e;return(0,l.jsx)(l.Fragment,{children:t.map((e=>{let{content:t}=e;return(0,l.jsx)(s.in,{content:t,children:(0,l.jsx)(a,{children:(0,l.jsx)(t,{})})},t.metadata.permalink)}))})}},8806:(e,t,a)=>{a.d(t,{A:()=>x});a(4041);var s=a(4357),n=a(9082),l=a(7473),i=a(2436);const r={iconEdit:"iconEdit_UohW"};var o=a(1085);function d(e){let{className:t,...a}=e;return(0,o.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,s.A)(r.iconEdit,t),"aria-hidden":"true",...a,children:(0,o.jsx)("g",{children:(0,o.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function c(e){let{editUrl:t}=e;return(0,o.jsxs)(i.default,{to:t,className:l.G.common.editThisPage,children:[(0,o.jsx)(d,{}),(0,o.jsx)(n.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}var u=a(5392);function m(e){let{lastUpdatedAt:t}=e;const a=new Date(t),s=(0,u.i)({day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(a);return(0,o.jsx)(n.A,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,o.jsx)("b",{children:(0,o.jsx)("time",{dateTime:a.toISOString(),itemProp:"dateModified",children:s})})},children:" on {date}"})}function h(e){let{lastUpdatedBy:t}=e;return(0,o.jsx)(n.A,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,o.jsx)("b",{children:t})},children:" by {user}"})}function g(e){let{lastUpdatedAt:t,lastUpdatedBy:a}=e;return(0,o.jsxs)("span",{className:l.G.common.lastUpdated,children:[(0,o.jsx)(n.A,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t?(0,o.jsx)(m,{lastUpdatedAt:t}):"",byUser:a?(0,o.jsx)(h,{lastUpdatedBy:a}):""},children:"Last updated{atDate}{byUser}"}),!1]})}const p={lastUpdated:"lastUpdated_g62E"};function x(e){let{className:t,editUrl:a,lastUpdatedAt:n,lastUpdatedBy:l}=e;return(0,o.jsxs)("div",{className:(0,s.A)("row",t),children:[(0,o.jsx)("div",{className:"col",children:a&&(0,o.jsx)(c,{editUrl:a})}),(0,o.jsx)("div",{className:(0,s.A)("col",p.lastUpdated),children:(n||l)&&(0,o.jsx)(g,{lastUpdatedAt:n,lastUpdatedBy:l})})]})}},56:(e,t,a)=>{a.d(t,{A:()=>i});a(4041);var s=a(4357),n=a(2436),l=a(1085);function i(e){const{permalink:t,title:a,subLabel:i,isNext:r}=e;return(0,l.jsxs)(n.default,{className:(0,s.A)("pagination-nav__link",r?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[i&&(0,l.jsx)("div",{className:"pagination-nav__sublabel",children:i}),(0,l.jsx)("div",{className:"pagination-nav__label",children:a})]})}},2247:(e,t,a)=>{a.d(t,{A:()=>r});a(4041);var s=a(4357),n=a(2436);const l={tag:"tag_qE9H",tagRegular:"tagRegular_aHXt",tagWithCount:"tagWithCount_UC8q"};var i=a(1085);function r(e){let{permalink:t,label:a,count:r,description:o}=e;return(0,i.jsxs)(n.default,{href:t,title:o,className:(0,s.A)(l.tag,r?l.tagWithCount:l.tagRegular),children:[a,r&&(0,i.jsx)("span",{children:r})]})}},5083:(e,t,a)=>{a.d(t,{A:()=>o});a(4041);var s=a(4357),n=a(9082),l=a(2247);const i={tags:"tags_q74f",tag:"tag_lSC7"};var r=a(1085);function o(e){let{tags:t}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("b",{children:(0,r.jsx)(n.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,r.jsx)("ul",{className:(0,s.A)(i.tags,"padding--none","margin-left--sm"),children:t.map((e=>(0,r.jsx)("li",{className:i.tag,children:(0,r.jsx)(l.A,{...e})},e.permalink)))})]})}},5392:(e,t,a)=>{a.d(t,{i:()=>n});var s=a(396);function n(e){void 0===e&&(e={});const{i18n:{currentLocale:t}}=(0,s.default)(),a=function(){const{i18n:{currentLocale:e,localeConfigs:t}}=(0,s.default)();return t[e].calendar}();return new Intl.DateTimeFormat(t,{calendar:a,...e})}}}]);