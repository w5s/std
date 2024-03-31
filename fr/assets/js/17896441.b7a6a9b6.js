"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[8401],{3021:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});n(4041);var a=n(4357),s=n(7473),i=n(268),l=n(4271),o=n(2436),r=n(9082),c=n(5215),d=n(1085);function u(e){return(0,d.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,d.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const m={breadcrumbHomeIcon:"breadcrumbHomeIcon_JFrk"};function h(){const e=(0,c.A)("/");return(0,d.jsx)("li",{className:"breadcrumbs__item",children:(0,d.jsx)(o.default,{"aria-label":(0,r.T)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,d.jsx)(u,{className:m.breadcrumbHomeIcon})})})}const v={breadcrumbsContainer:"breadcrumbsContainer_zCmv"};function x(e){let{children:t,href:n,isLast:a}=e;const s="breadcrumbs__link";return a?(0,d.jsx)("span",{className:s,itemProp:"name",children:t}):n?(0,d.jsx)(o.default,{className:s,href:n,itemProp:"item",children:(0,d.jsx)("span",{itemProp:"name",children:t})}):(0,d.jsx)("span",{className:s,children:t})}function b(e){let{children:t,active:n,index:s,addMicrodata:i}=e;return(0,d.jsxs)("li",{...i&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,a.A)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,d.jsx)("meta",{itemProp:"position",content:String(s+1)})]})}function p(){const e=(0,i.OF)(),t=(0,l.Dt)();return e?(0,d.jsx)("nav",{className:(0,a.A)(s.G.docs.docBreadcrumbs,v.breadcrumbsContainer),"aria-label":(0,r.T)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,d.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,d.jsx)(h,{}),e.map(((t,n)=>{const a=n===e.length-1,s="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,d.jsx)(b,{active:a,index:n,addMicrodata:!!s,children:(0,d.jsx)(x,{href:s,isLast:a,children:t.label})},n)}))]})}):null}},6424:(e,t,n)=>{n.r(t),n.d(t,{default:()=>U});n(4041);var a=n(8582),s=n(457),i=n(1085);function l(){const{metadata:e,frontMatter:t,assets:n}=(0,s.u)();return(0,i.jsx)(a.be,{title:e.title,description:e.description,keywords:t.keywords,image:n.image??t.image})}var o=n(4357),r=n(1187),c=n(4289);function d(){const{metadata:e}=(0,s.u)();return(0,i.jsx)(c.default,{previous:e.previous,next:e.next})}var u=n(1524),m=n(2101),h=n(7473),v=n(5083),x=n(8806);function b(){const{metadata:e}=(0,s.u)(),{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:a,tags:l}=e,r=l.length>0,c=!!(t||n||a);return r||c?(0,i.jsxs)("footer",{className:(0,o.A)(h.G.docs.docFooter,"docusaurus-mt-lg"),children:[r&&(0,i.jsx)("div",{className:(0,o.A)("row margin-top--sm",h.G.docs.docFooterTagsRow),children:(0,i.jsx)("div",{className:"col",children:(0,i.jsx)(v.A,{tags:l})})}),c&&(0,i.jsx)(x.A,{className:(0,o.A)("margin-top--sm",h.G.docs.docFooterEditMetaRow),editUrl:t,lastUpdatedAt:n,lastUpdatedBy:a})]}):null}var p=n(1687);const f={tocMobile:"tocMobile_tjDr"};function g(){const{toc:e,frontMatter:t}=(0,s.u)();return(0,i.jsx)(p.default,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,o.A)(h.G.docs.docTocMobile,f.tocMobile)})}var j=n(1017);function A(){const{toc:e,frontMatter:t}=(0,s.u)();return(0,i.jsx)(j.default,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:h.G.docs.docTocDesktop})}var N=n(4441),C=n(3480);function L(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=(0,s.u)();return t.hide_title||void 0!==n?null:e.title}();return(0,i.jsxs)("div",{className:(0,o.A)(h.G.docs.docMarkdown,"markdown"),children:[n&&(0,i.jsx)("header",{children:(0,i.jsx)(N.default,{as:"h1",children:n})}),(0,i.jsx)(C.default,{children:t})]})}var _=n(3021),k=n(4874);const T={docItemContainer:"docItemContainer_Rv5Z",docItemCol:"docItemCol_YAwJ"};function H(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=(0,s.u)(),n=(0,r.l)(),a=e.hide_table_of_contents,l=!a&&t.length>0;return{hidden:a,mobile:l?(0,i.jsx)(g,{}):void 0,desktop:!l||"desktop"!==n&&"ssr"!==n?void 0:(0,i.jsx)(A,{})}}(),{metadata:{unlisted:a}}=(0,s.u)();return(0,i.jsxs)("div",{className:"row",children:[(0,i.jsxs)("div",{className:(0,o.A)("col",!n.hidden&&T.docItemCol),children:[a&&(0,i.jsx)(k.A,{}),(0,i.jsx)(u.A,{}),(0,i.jsxs)("div",{className:T.docItemContainer,children:[(0,i.jsxs)("article",{children:[(0,i.jsx)(_.default,{}),(0,i.jsx)(m.default,{}),n.mobile,(0,i.jsx)(L,{children:t}),(0,i.jsx)(b,{})]}),(0,i.jsx)(d,{})]})]}),n.desktop&&(0,i.jsx)("div",{className:"col col--3",children:n.desktop})]})}function U(e){const t=`docs-doc-id-${e.content.metadata.id}`,n=e.content;return(0,i.jsx)(s._,{content:e.content,children:(0,i.jsxs)(a.e3,{className:t,children:[(0,i.jsx)(l,{}),(0,i.jsx)(H,{children:(0,i.jsx)(n,{})})]})})}},4289:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});n(4041);var a=n(9082),s=n(56),i=n(1085);function l(e){const{previous:t,next:n}=e;return(0,i.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,a.T)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,i.jsx)(s.A,{...t,subLabel:(0,i.jsx)(a.A,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,i.jsx)(s.A,{...n,subLabel:(0,i.jsx)(a.A,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}},2101:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});n(4041);var a=n(4357),s=n(9082),i=n(7473),l=n(6738),o=n(1085);function r(e){let{className:t}=e;const n=(0,l.r)();return n.badge?(0,o.jsx)("span",{className:(0,a.A)(t,i.G.docs.docVersionBadge,"badge badge--secondary"),children:(0,o.jsx)(s.A,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}},1524:(e,t,n)=>{n.d(t,{A:()=>b});n(4041);var a=n(4357),s=n(396),i=n(2436),l=n(9082),o=n(8016),r=n(7473),c=n(9599),d=n(6738),u=n(1085);const m={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,u.jsx)(l.A,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,u.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,u.jsx)(l.A,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,u.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function h(e){const t=m[e.versionMetadata.banner];return(0,u.jsx)(t,{...e})}function v(e){let{versionLabel:t,to:n,onClick:a}=e;return(0,u.jsx)(l.A,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,u.jsx)("b",{children:(0,u.jsx)(i.default,{to:n,onClick:a,children:(0,u.jsx)(l.A,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function x(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:i}}=(0,s.default)(),{pluginId:l}=(0,o.useActivePlugin)({failfast:!0}),{savePreferredVersionName:d}=(0,c.g1)(l),{latestDocSuggestion:m,latestVersionSuggestion:x}=(0,o.useDocVersionSuggestions)(l),b=m??(p=x).docs.find((e=>e.id===p.mainDocId));var p;return(0,u.jsxs)("div",{className:(0,a.A)(t,r.G.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,u.jsx)("div",{children:(0,u.jsx)(h,{siteTitle:i,versionMetadata:n})}),(0,u.jsx)("div",{className:"margin-top--md",children:(0,u.jsx)(v,{versionLabel:x.label,to:b.path,onClick:()=>d(x.name)})})]})}function b(e){let{className:t}=e;const n=(0,d.r)();return n.banner?(0,u.jsx)(x,{className:t,versionMetadata:n}):null}},8806:(e,t,n)=>{n.d(t,{A:()=>b});n(4041);var a=n(4357),s=n(9082),i=n(7473),l=n(2436);const o={iconEdit:"iconEdit_UohW"};var r=n(1085);function c(e){let{className:t,...n}=e;return(0,r.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,a.A)(o.iconEdit,t),"aria-hidden":"true",...n,children:(0,r.jsx)("g",{children:(0,r.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function d(e){let{editUrl:t}=e;return(0,r.jsxs)(l.default,{to:t,className:i.G.common.editThisPage,children:[(0,r.jsx)(c,{}),(0,r.jsx)(s.A,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}var u=n(5392);function m(e){let{lastUpdatedAt:t}=e;const n=new Date(t),a=(0,u.i)({day:"numeric",month:"short",year:"numeric",timeZone:"UTC"}).format(n);return(0,r.jsx)(s.A,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,r.jsx)("b",{children:(0,r.jsx)("time",{dateTime:n.toISOString(),itemProp:"dateModified",children:a})})},children:" on {date}"})}function h(e){let{lastUpdatedBy:t}=e;return(0,r.jsx)(s.A,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,r.jsx)("b",{children:t})},children:" by {user}"})}function v(e){let{lastUpdatedAt:t,lastUpdatedBy:n}=e;return(0,r.jsxs)("span",{className:i.G.common.lastUpdated,children:[(0,r.jsx)(s.A,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t?(0,r.jsx)(m,{lastUpdatedAt:t}):"",byUser:n?(0,r.jsx)(h,{lastUpdatedBy:n}):""},children:"Last updated{atDate}{byUser}"}),!1]})}const x={lastUpdated:"lastUpdated_g62E"};function b(e){let{className:t,editUrl:n,lastUpdatedAt:s,lastUpdatedBy:i}=e;return(0,r.jsxs)("div",{className:(0,a.A)("row",t),children:[(0,r.jsx)("div",{className:"col",children:n&&(0,r.jsx)(d,{editUrl:n})}),(0,r.jsx)("div",{className:(0,a.A)("col",x.lastUpdated),children:(s||i)&&(0,r.jsx)(v,{lastUpdatedAt:s,lastUpdatedBy:i})})]})}},56:(e,t,n)=>{n.d(t,{A:()=>l});n(4041);var a=n(4357),s=n(2436),i=n(1085);function l(e){const{permalink:t,title:n,subLabel:l,isNext:o}=e;return(0,i.jsxs)(s.default,{className:(0,a.A)("pagination-nav__link",o?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[l&&(0,i.jsx)("div",{className:"pagination-nav__sublabel",children:l}),(0,i.jsx)("div",{className:"pagination-nav__label",children:n})]})}},1017:(e,t,n)=>{n.r(t),n.d(t,{default:()=>c});n(4041);var a=n(4357),s=n(7256);const i={tableOfContents:"tableOfContents_TN1Q",docItemContainer:"docItemContainer_JtJJ"};var l=n(1085);const o="table-of-contents__link toc-highlight",r="table-of-contents__link--active";function c(e){let{className:t,...n}=e;return(0,l.jsx)("div",{className:(0,a.A)(i.tableOfContents,"thin-scrollbar",t),children:(0,l.jsx)(s.A,{...n,linkClassName:o,linkActiveClassName:r})})}},1687:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});n(4041);var a=n(4357),s=n(6476),i=n(7256),l=n(9082);const o={tocCollapsibleButton:"tocCollapsibleButton_htYj",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_pAh7"};var r=n(1085);function c(e){let{collapsed:t,...n}=e;return(0,r.jsx)("button",{type:"button",...n,className:(0,a.A)("clean-btn",o.tocCollapsibleButton,!t&&o.tocCollapsibleButtonExpanded,n.className),children:(0,r.jsx)(l.A,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const d={tocCollapsible:"tocCollapsible_O_Qc",tocCollapsibleContent:"tocCollapsibleContent_SlnY",tocCollapsibleExpanded:"tocCollapsibleExpanded_klrc"};function u(e){let{toc:t,className:n,minHeadingLevel:l,maxHeadingLevel:o}=e;const{collapsed:u,toggleCollapsed:m}=(0,s.u)({initialState:!0});return(0,r.jsxs)("div",{className:(0,a.A)(d.tocCollapsible,!u&&d.tocCollapsibleExpanded,n),children:[(0,r.jsx)(c,{collapsed:u,onClick:m}),(0,r.jsx)(s.N,{lazy:!0,className:d.tocCollapsibleContent,collapsed:u,children:(0,r.jsx)(i.A,{toc:t,minHeadingLevel:l,maxHeadingLevel:o})})]})}},7256:(e,t,n)=>{n.d(t,{A:()=>u});var a=n(4041),s=n(2520),i=n(9585),l=n(1020),o=n(2436),r=n(1085);function c(e){let{toc:t,className:n,linkClassName:a,isChild:s}=e;return t.length?(0,r.jsx)("ul",{className:s?void 0:n,children:t.map((e=>(0,r.jsxs)("li",{children:[(0,r.jsx)(o.default,{to:`#${e.id}`,className:a??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,r.jsx)(c,{isChild:!0,toc:e.children,className:n,linkClassName:a})]},e.id)))}):null}const d=a.memo(c);function u(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:o="table-of-contents__link",linkActiveClassName:c,minHeadingLevel:u,maxHeadingLevel:m,...h}=e;const v=(0,s.p)(),x=u??v.tableOfContents.minHeadingLevel,b=m??v.tableOfContents.maxHeadingLevel,p=(0,i.h)({toc:t,minHeadingLevel:x,maxHeadingLevel:b}),f=(0,a.useMemo)((()=>{if(o&&c)return{linkClassName:o,linkActiveClassName:c,minHeadingLevel:x,maxHeadingLevel:b}}),[o,c,x,b]);return(0,l.i)(f),(0,r.jsx)(d,{toc:p,className:n,linkClassName:o,...h})}},2247:(e,t,n)=>{n.d(t,{A:()=>o});n(4041);var a=n(4357),s=n(2436);const i={tag:"tag_qE9H",tagRegular:"tagRegular_aHXt",tagWithCount:"tagWithCount_UC8q"};var l=n(1085);function o(e){let{permalink:t,label:n,count:o}=e;return(0,l.jsxs)(s.default,{href:t,className:(0,a.A)(i.tag,o?i.tagWithCount:i.tagRegular),children:[n,o&&(0,l.jsx)("span",{children:o})]})}},5083:(e,t,n)=>{n.d(t,{A:()=>r});n(4041);var a=n(4357),s=n(9082),i=n(2247);const l={tags:"tags_q74f",tag:"tag_lSC7"};var o=n(1085);function r(e){let{tags:t}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("b",{children:(0,o.jsx)(s.A,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,o.jsx)("ul",{className:(0,a.A)(l.tags,"padding--none","margin-left--sm"),children:t.map((e=>{let{label:t,permalink:n}=e;return(0,o.jsx)("li",{className:l.tag,children:(0,o.jsx)(i.A,{label:t,permalink:n})},n)}))})]})}},4874:(e,t,n)=>{n.d(t,{A:()=>c});n(4041);var a=n(4357),s=n(8751),i=n(7473),l=n(9286),o=n(1085);function r(e){let{className:t}=e;return(0,o.jsx)(l.A,{type:"caution",title:(0,o.jsx)(s.Rc,{}),className:(0,a.A)(t,i.G.common.unlistedBanner),children:(0,o.jsx)(s.Uh,{})})}function c(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.AE,{}),(0,o.jsx)(r,{...e})]})}},457:(e,t,n)=>{n.d(t,{_:()=>o,u:()=>r});var a=n(4041),s=n(1786),i=n(1085);const l=a.createContext(null);function o(e){let{children:t,content:n}=e;const s=function(e){return(0,a.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return(0,i.jsx)(l.Provider,{value:s,children:t})}function r(){const e=(0,a.useContext)(l);if(null===e)throw new s.dV("DocProvider");return e}},1020:(e,t,n)=>{n.d(t,{i:()=>r});var a=n(4041),s=n(2520);function i(e){const t=e.getBoundingClientRect();return t.top===t.bottom?i(e.parentNode):t}function l(e,t){let{anchorTopOffset:n}=t;const a=e.find((e=>i(e).top>=n));if(a){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(i(a))?a:e[e.indexOf(a)-1]??null}return e[e.length-1]??null}function o(){const e=(0,a.useRef)(0),{navbar:{hideOnScroll:t}}=(0,s.p)();return(0,a.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function r(e){const t=(0,a.useRef)(void 0),n=o();(0,a.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:a,linkActiveClassName:s,minHeadingLevel:i,maxHeadingLevel:o}=e;function r(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(a),r=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const a=[];for(let s=t;s<=n;s+=1)a.push(`h${s}.anchor`);return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:i,maxHeadingLevel:o}),c=l(r,{anchorTopOffset:n.current}),d=e.find((e=>c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(s),e.classList.add(s),t.current=e):e.classList.remove(s)}(e,e===d)}))}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),()=>{document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}),[e,n])}},5392:(e,t,n)=>{n.d(t,{i:()=>s});var a=n(396);function s(e){void 0===e&&(e={});const{i18n:{currentLocale:t}}=(0,a.default)(),n=function(){const{i18n:{currentLocale:e,localeConfigs:t}}=(0,a.default)();return t[e].calendar}();return new Intl.DateTimeFormat(t,{calendar:n,...e})}},9585:(e,t,n)=>{n.d(t,{h:()=>o,v:()=>i});var a=n(4041);function s(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const a=n.slice(2,e.level);e.parentIndex=Math.max(...a),n[e.level]=t}));const a=[];return t.forEach((e=>{const{parentIndex:n,...s}=e;n>=0?t[n].children.push(s):a.push(s)})),a}function i(e){return(0,a.useMemo)((()=>s(e)),[e])}function l(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return t.flatMap((e=>{const t=l({toc:e.children,minHeadingLevel:n,maxHeadingLevel:a});return function(e){return e.level>=n&&e.level<=a}(e)?[{...e,children:t}]:t}))}function o(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:i}=e;return(0,a.useMemo)((()=>l({toc:s(t),minHeadingLevel:n,maxHeadingLevel:i})),[t,n,i])}},8751:(e,t,n)=>{n.d(t,{AE:()=>r,Rc:()=>l,Uh:()=>o});n(4041);var a=n(9082),s=n(9058),i=n(1085);function l(){return(0,i.jsx)(a.A,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function o(){return(0,i.jsx)(a.A,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function r(){return(0,i.jsx)(s.A,{children:(0,i.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}}}]);