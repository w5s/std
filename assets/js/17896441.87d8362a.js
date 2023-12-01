"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[7918],{3311:(e,t,n)=>{n.r(t),n.d(t,{default:()=>p});n(2784);var a=n(489),s=n(5138),i=n(2832),l=n(9846),o=n(2896),r=n(8004),d=n(4198),c=n(2322);function u(e){return(0,c.jsx)("svg",{viewBox:"0 0 24 24",...e,children:(0,c.jsx)("path",{d:"M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z",fill:"currentColor"})})}const m={breadcrumbHomeIcon:"breadcrumbHomeIcon_JFrk"};function h(){const e=(0,d.Z)("/");return(0,c.jsx)("li",{className:"breadcrumbs__item",children:(0,c.jsx)(o.default,{"aria-label":(0,r.I)({id:"theme.docs.breadcrumbs.home",message:"Home page",description:"The ARIA label for the home page in the breadcrumbs"}),className:"breadcrumbs__link",href:e,children:(0,c.jsx)(u,{className:m.breadcrumbHomeIcon})})})}const v={breadcrumbsContainer:"breadcrumbsContainer_zCmv"};function x(e){let{children:t,href:n,isLast:a}=e;const s="breadcrumbs__link";return a?(0,c.jsx)("span",{className:s,itemProp:"name",children:t}):n?(0,c.jsx)(o.default,{className:s,href:n,itemProp:"item",children:(0,c.jsx)("span",{itemProp:"name",children:t})}):(0,c.jsx)("span",{className:s,children:t})}function b(e){let{children:t,active:n,index:s,addMicrodata:i}=e;return(0,c.jsxs)("li",{...i&&{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem"},className:(0,a.Z)("breadcrumbs__item",{"breadcrumbs__item--active":n}),children:[t,(0,c.jsx)("meta",{itemProp:"position",content:String(s+1)})]})}function p(){const e=(0,i.s1)(),t=(0,l.Ns)();return e?(0,c.jsx)("nav",{className:(0,a.Z)(s.k.docs.docBreadcrumbs,v.breadcrumbsContainer),"aria-label":(0,r.I)({id:"theme.docs.breadcrumbs.navAriaLabel",message:"Breadcrumbs",description:"The ARIA label for the breadcrumbs"}),children:(0,c.jsxs)("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList",children:[t&&(0,c.jsx)(h,{}),e.map(((t,n)=>{const a=n===e.length-1,s="category"===t.type&&t.linkUnlisted?void 0:t.href;return(0,c.jsx)(b,{active:a,index:n,addMicrodata:!!s,children:(0,c.jsx)(x,{href:s,isLast:a,children:t.label})},n)}))]})}):null}},6768:(e,t,n)=>{n.r(t),n.d(t,{default:()=>E});n(2784);var a=n(5553),s=n(2844),i=n(2322);function l(){const{metadata:e,frontMatter:t,assets:n}=(0,s.k)();return(0,i.jsx)(a.d,{title:e.title,description:e.description,keywords:t.keywords,image:n.image??t.image})}var o=n(489),r=n(6086),d=n(6106);function c(){const{metadata:e}=(0,s.k)();return(0,i.jsx)(d.default,{previous:e.previous,next:e.next})}var u=n(6246),m=n(3362),h=n(5138),v=n(8004);function x(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n}=e;return(0,i.jsx)(v.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:(0,i.jsx)("b",{children:(0,i.jsx)("time",{dateTime:new Date(1e3*t).toISOString(),children:n})})},children:" on {date}"})}function b(e){let{lastUpdatedBy:t}=e;return(0,i.jsx)(v.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:(0,i.jsx)("b",{children:t})},children:" by {user}"})}function p(e){let{lastUpdatedAt:t,formattedLastUpdatedAt:n,lastUpdatedBy:a}=e;return(0,i.jsxs)("span",{className:h.k.common.lastUpdated,children:[(0,i.jsx)(v.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&n?(0,i.jsx)(x,{lastUpdatedAt:t,formattedLastUpdatedAt:n}):"",byUser:a?(0,i.jsx)(b,{lastUpdatedBy:a}):""},children:"Last updated{atDate}{byUser}"}),!1]})}var f=n(8869),g=n(7721);const j={lastUpdated:"lastUpdated_T23F"};function L(e){return(0,i.jsx)("div",{className:(0,o.Z)(h.k.docs.docFooterTagsRow,"row margin-bottom--sm"),children:(0,i.jsx)("div",{className:"col",children:(0,i.jsx)(g.Z,{...e})})})}function N(e){let{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:a,formattedLastUpdatedAt:s}=e;return(0,i.jsxs)("div",{className:(0,o.Z)(h.k.docs.docFooterEditMetaRow,"row"),children:[(0,i.jsx)("div",{className:"col",children:t&&(0,i.jsx)(f.Z,{editUrl:t})}),(0,i.jsx)("div",{className:(0,o.Z)("col",j.lastUpdated),children:(n||a)&&(0,i.jsx)(p,{lastUpdatedAt:n,formattedLastUpdatedAt:s,lastUpdatedBy:a})})]})}function C(){const{metadata:e}=(0,s.k)(),{editUrl:t,lastUpdatedAt:n,formattedLastUpdatedAt:a,lastUpdatedBy:l,tags:r}=e,d=r.length>0,c=!!(t||n||l);return d||c?(0,i.jsxs)("footer",{className:(0,o.Z)(h.k.docs.docFooter,"docusaurus-mt-lg"),children:[d&&(0,i.jsx)(L,{tags:r}),c&&(0,i.jsx)(N,{editUrl:t,lastUpdatedAt:n,lastUpdatedBy:l,formattedLastUpdatedAt:a})]}):null}var k=n(6783);const _={tocMobile:"tocMobile_tjDr"};function Z(){const{toc:e,frontMatter:t}=(0,s.k)();return(0,i.jsx)(k.default,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:(0,o.Z)(h.k.docs.docTocMobile,_.tocMobile)})}var T=n(1502);function U(){const{toc:e,frontMatter:t}=(0,s.k)();return(0,i.jsx)(T.default,{toc:e,minHeadingLevel:t.toc_min_heading_level,maxHeadingLevel:t.toc_max_heading_level,className:h.k.docs.docTocDesktop})}var H=n(5046),w=n(1809);function y(e){let{children:t}=e;const n=function(){const{metadata:e,frontMatter:t,contentTitle:n}=(0,s.k)();return t.hide_title||void 0!==n?null:e.title}();return(0,i.jsxs)("div",{className:(0,o.Z)(h.k.docs.docMarkdown,"markdown"),children:[n&&(0,i.jsx)("header",{children:(0,i.jsx)(H.default,{as:"h1",children:n})}),(0,i.jsx)(w.default,{children:t})]})}var A=n(3311),M=n(9139);const I={docItemContainer:"docItemContainer_Rv5Z",docItemCol:"docItemCol_YAwJ"};function B(e){let{children:t}=e;const n=function(){const{frontMatter:e,toc:t}=(0,s.k)(),n=(0,r.i)(),a=e.hide_table_of_contents,l=!a&&t.length>0;return{hidden:a,mobile:l?(0,i.jsx)(Z,{}):void 0,desktop:!l||"desktop"!==n&&"ssr"!==n?void 0:(0,i.jsx)(U,{})}}(),{metadata:{unlisted:a}}=(0,s.k)();return(0,i.jsxs)("div",{className:"row",children:[(0,i.jsxs)("div",{className:(0,o.Z)("col",!n.hidden&&I.docItemCol),children:[a&&(0,i.jsx)(M.Z,{}),(0,i.jsx)(u.Z,{}),(0,i.jsxs)("div",{className:I.docItemContainer,children:[(0,i.jsxs)("article",{children:[(0,i.jsx)(A.default,{}),(0,i.jsx)(m.default,{}),n.mobile,(0,i.jsx)(y,{children:t}),(0,i.jsx)(C,{})]}),(0,i.jsx)(c,{})]})]}),n.desktop&&(0,i.jsx)("div",{className:"col col--3",children:n.desktop})]})}function E(e){const t=`docs-doc-id-${e.content.metadata.id}`,n=e.content;return(0,i.jsx)(s.b,{content:e.content,children:(0,i.jsxs)(a.FG,{className:t,children:[(0,i.jsx)(l,{}),(0,i.jsx)(B,{children:(0,i.jsx)(n,{})})]})})}},6106:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});n(2784);var a=n(8004),s=n(2030),i=n(2322);function l(e){const{previous:t,next:n}=e;return(0,i.jsxs)("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,a.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages",description:"The ARIA label for the docs pagination"}),children:[t&&(0,i.jsx)(s.Z,{...t,subLabel:(0,i.jsx)(a.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc",children:"Previous"})}),n&&(0,i.jsx)(s.Z,{...n,subLabel:(0,i.jsx)(a.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc",children:"Next"}),isNext:!0})]})}},3362:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});n(2784);var a=n(489),s=n(8004),i=n(5138),l=n(2993),o=n(2322);function r(e){let{className:t}=e;const n=(0,l.E)();return n.badge?(0,o.jsx)("span",{className:(0,a.Z)(t,i.k.docs.docVersionBadge,"badge badge--secondary"),children:(0,o.jsx)(s.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:n.label},children:"Version: {versionLabel}"})}):null}},6246:(e,t,n)=>{n.d(t,{Z:()=>b});n(2784);var a=n(489),s=n(5837),i=n(2896),l=n(8004),o=n(7409),r=n(5138),d=n(3855),c=n(2993),u=n(2322);const m={unreleased:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,u.jsx)(l.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:(0,u.jsx)("b",{children:n.label})},children:"This is unreleased documentation for {siteTitle} {versionLabel} version."})},unmaintained:function(e){let{siteTitle:t,versionMetadata:n}=e;return(0,u.jsx)(l.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:(0,u.jsx)("b",{children:n.label})},children:"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained."})}};function h(e){const t=m[e.versionMetadata.banner];return(0,u.jsx)(t,{...e})}function v(e){let{versionLabel:t,to:n,onClick:a}=e;return(0,u.jsx)(l.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:(0,u.jsx)("b",{children:(0,u.jsx)(i.default,{to:n,onClick:a,children:(0,u.jsx)(l.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label",children:"latest version"})})})},children:"For up-to-date documentation, see the {latestVersionLink} ({versionLabel})."})}function x(e){let{className:t,versionMetadata:n}=e;const{siteConfig:{title:i}}=(0,s.default)(),{pluginId:l}=(0,o.gA)({failfast:!0}),{savePreferredVersionName:c}=(0,d.J)(l),{latestDocSuggestion:m,latestVersionSuggestion:x}=(0,o.Jo)(l),b=m??(p=x).docs.find((e=>e.id===p.mainDocId));var p;return(0,u.jsxs)("div",{className:(0,a.Z)(t,r.k.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert",children:[(0,u.jsx)("div",{children:(0,u.jsx)(h,{siteTitle:i,versionMetadata:n})}),(0,u.jsx)("div",{className:"margin-top--md",children:(0,u.jsx)(v,{versionLabel:x.label,to:b.path,onClick:()=>c(x.name)})})]})}function b(e){let{className:t}=e;const n=(0,c.E)();return n.banner?(0,u.jsx)(x,{className:t,versionMetadata:n}):null}},8869:(e,t,n)=>{n.d(t,{Z:()=>c});n(2784);var a=n(8004),s=n(5138),i=n(2896),l=n(489);const o={iconEdit:"iconEdit_UohW"};var r=n(2322);function d(e){let{className:t,...n}=e;return(0,r.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,l.Z)(o.iconEdit,t),"aria-hidden":"true",...n,children:(0,r.jsx)("g",{children:(0,r.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function c(e){let{editUrl:t}=e;return(0,r.jsxs)(i.default,{to:t,className:s.k.common.editThisPage,children:[(0,r.jsx)(d,{}),(0,r.jsx)(a.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}},2030:(e,t,n)=>{n.d(t,{Z:()=>l});n(2784);var a=n(489),s=n(2896),i=n(2322);function l(e){const{permalink:t,title:n,subLabel:l,isNext:o}=e;return(0,i.jsxs)(s.default,{className:(0,a.Z)("pagination-nav__link",o?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[l&&(0,i.jsx)("div",{className:"pagination-nav__sublabel",children:l}),(0,i.jsx)("div",{className:"pagination-nav__label",children:n})]})}},1502:(e,t,n)=>{n.r(t),n.d(t,{default:()=>d});n(2784);var a=n(489),s=n(1674);const i={tableOfContents:"tableOfContents_TN1Q",docItemContainer:"docItemContainer_JtJJ"};var l=n(2322);const o="table-of-contents__link toc-highlight",r="table-of-contents__link--active";function d(e){let{className:t,...n}=e;return(0,l.jsx)("div",{className:(0,a.Z)(i.tableOfContents,"thin-scrollbar",t),children:(0,l.jsx)(s.Z,{...n,linkClassName:o,linkActiveClassName:r})})}},6783:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});n(2784);var a=n(489),s=n(9782),i=n(1674),l=n(8004);const o={tocCollapsibleButton:"tocCollapsibleButton_htYj",tocCollapsibleButtonExpanded:"tocCollapsibleButtonExpanded_pAh7"};var r=n(2322);function d(e){let{collapsed:t,...n}=e;return(0,r.jsx)("button",{type:"button",...n,className:(0,a.Z)("clean-btn",o.tocCollapsibleButton,!t&&o.tocCollapsibleButtonExpanded,n.className),children:(0,r.jsx)(l.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component",children:"On this page"})})}const c={tocCollapsible:"tocCollapsible_O_Qc",tocCollapsibleContent:"tocCollapsibleContent_SlnY",tocCollapsibleExpanded:"tocCollapsibleExpanded_klrc"};function u(e){let{toc:t,className:n,minHeadingLevel:l,maxHeadingLevel:o}=e;const{collapsed:u,toggleCollapsed:m}=(0,s.u)({initialState:!0});return(0,r.jsxs)("div",{className:(0,a.Z)(c.tocCollapsible,!u&&c.tocCollapsibleExpanded,n),children:[(0,r.jsx)(d,{collapsed:u,onClick:m}),(0,r.jsx)(s.z,{lazy:!0,className:c.tocCollapsibleContent,collapsed:u,children:(0,r.jsx)(i.Z,{toc:t,minHeadingLevel:l,maxHeadingLevel:o})})]})}},1674:(e,t,n)=>{n.d(t,{Z:()=>u});var a=n(2784),s=n(6371),i=n(5455),l=n(1045),o=n(2896),r=n(2322);function d(e){let{toc:t,className:n,linkClassName:a,isChild:s}=e;return t.length?(0,r.jsx)("ul",{className:s?void 0:n,children:t.map((e=>(0,r.jsxs)("li",{children:[(0,r.jsx)(o.default,{to:`#${e.id}`,className:a??void 0,dangerouslySetInnerHTML:{__html:e.value}}),(0,r.jsx)(d,{isChild:!0,toc:e.children,className:n,linkClassName:a})]},e.id)))}):null}const c=a.memo(d);function u(e){let{toc:t,className:n="table-of-contents table-of-contents__left-border",linkClassName:o="table-of-contents__link",linkActiveClassName:d,minHeadingLevel:u,maxHeadingLevel:m,...h}=e;const v=(0,s.L)(),x=u??v.tableOfContents.minHeadingLevel,b=m??v.tableOfContents.maxHeadingLevel,p=(0,i.b)({toc:t,minHeadingLevel:x,maxHeadingLevel:b}),f=(0,a.useMemo)((()=>{if(o&&d)return{linkClassName:o,linkActiveClassName:d,minHeadingLevel:x,maxHeadingLevel:b}}),[o,d,x,b]);return(0,l.S)(f),(0,r.jsx)(c,{toc:p,className:n,linkClassName:o,...h})}},5561:(e,t,n)=>{n.d(t,{Z:()=>o});n(2784);var a=n(489),s=n(2896);const i={tag:"tag_qE9H",tagRegular:"tagRegular_aHXt",tagWithCount:"tagWithCount_UC8q"};var l=n(2322);function o(e){let{permalink:t,label:n,count:o}=e;return(0,l.jsxs)(s.default,{href:t,className:(0,a.Z)(i.tag,o?i.tagWithCount:i.tagRegular),children:[n,o&&(0,l.jsx)("span",{children:o})]})}},7721:(e,t,n)=>{n.d(t,{Z:()=>r});n(2784);var a=n(489),s=n(8004),i=n(5561);const l={tags:"tags_q74f",tag:"tag_lSC7"};var o=n(2322);function r(e){let{tags:t}=e;return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)("b",{children:(0,o.jsx)(s.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,o.jsx)("ul",{className:(0,a.Z)(l.tags,"padding--none","margin-left--sm"),children:t.map((e=>{let{label:t,permalink:n}=e;return(0,o.jsx)("li",{className:l.tag,children:(0,o.jsx)(i.Z,{label:t,permalink:n})},n)}))})]})}},9139:(e,t,n)=>{n.d(t,{Z:()=>d});n(2784);var a=n(489),s=n(3562),i=n(5138),l=n(8415),o=n(2322);function r(e){let{className:t}=e;return(0,o.jsx)(l.Z,{type:"caution",title:(0,o.jsx)(s.cI,{}),className:(0,a.Z)(t,i.k.common.unlistedBanner),children:(0,o.jsx)(s.eU,{})})}function d(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.T$,{}),(0,o.jsx)(r,{...e})]})}},2844:(e,t,n)=>{n.d(t,{b:()=>o,k:()=>r});var a=n(2784),s=n(1661),i=n(2322);const l=a.createContext(null);function o(e){let{children:t,content:n}=e;const s=function(e){return(0,a.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(n);return(0,i.jsx)(l.Provider,{value:s,children:t})}function r(){const e=(0,a.useContext)(l);if(null===e)throw new s.i6("DocProvider");return e}},1045:(e,t,n)=>{n.d(t,{S:()=>r});var a=n(2784),s=n(6371);function i(e){const t=e.getBoundingClientRect();return t.top===t.bottom?i(e.parentNode):t}function l(e,t){let{anchorTopOffset:n}=t;const a=e.find((e=>i(e).top>=n));if(a){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(i(a))?a:e[e.indexOf(a)-1]??null}return e[e.length-1]??null}function o(){const e=(0,a.useRef)(0),{navbar:{hideOnScroll:t}}=(0,s.L)();return(0,a.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function r(e){const t=(0,a.useRef)(void 0),n=o();(0,a.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:a,linkActiveClassName:s,minHeadingLevel:i,maxHeadingLevel:o}=e;function r(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(a),r=function(e){let{minHeadingLevel:t,maxHeadingLevel:n}=e;const a=[];for(let s=t;s<=n;s+=1)a.push(`h${s}.anchor`);return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:i,maxHeadingLevel:o}),d=l(r,{anchorTopOffset:n.current}),c=e.find((e=>d&&d.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,n){n?(t.current&&t.current!==e&&t.current.classList.remove(s),e.classList.add(s),t.current=e):e.classList.remove(s)}(e,e===c)}))}return document.addEventListener("scroll",r),document.addEventListener("resize",r),r(),()=>{document.removeEventListener("scroll",r),document.removeEventListener("resize",r)}}),[e,n])}},5455:(e,t,n)=>{n.d(t,{a:()=>i,b:()=>o});var a=n(2784);function s(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),n=Array(7).fill(-1);t.forEach(((e,t)=>{const a=n.slice(2,e.level);e.parentIndex=Math.max(...a),n[e.level]=t}));const a=[];return t.forEach((e=>{const{parentIndex:n,...s}=e;n>=0?t[n].children.push(s):a.push(s)})),a}function i(e){return(0,a.useMemo)((()=>s(e)),[e])}function l(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:a}=e;return t.flatMap((e=>{const t=l({toc:e.children,minHeadingLevel:n,maxHeadingLevel:a});return function(e){return e.level>=n&&e.level<=a}(e)?[{...e,children:t}]:t}))}function o(e){let{toc:t,minHeadingLevel:n,maxHeadingLevel:i}=e;return(0,a.useMemo)((()=>l({toc:s(t),minHeadingLevel:n,maxHeadingLevel:i})),[t,n,i])}},3562:(e,t,n)=>{n.d(t,{T$:()=>r,cI:()=>l,eU:()=>o});n(2784);var a=n(8004),s=n(8428),i=n(2322);function l(){return(0,i.jsx)(a.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function o(){return(0,i.jsx)(a.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function r(){return(0,i.jsx)(s.Z,{children:(0,i.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}}}]);