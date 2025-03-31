"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[7559],{1148:(e,n,r)=>{r.d(n,{c:()=>a});var t=r(4041),s=r(1085);function a(e){const{mdxAdmonitionTitle:n,rest:r}=function(e){const n=t.Children.toArray(e),r=n.find((e=>t.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),a=n.filter((e=>e!==r)),i=r?.props.children;return{mdxAdmonitionTitle:i,rest:a.length>0?(0,s.jsx)(s.Fragment,{children:a}):null}}(e.children),a=e.title??n;return{...e,...a&&{title:a},children:r}}},1240:(e,n,r)=>{r.d(n,{W:()=>c});var t=r(4041),s=r(1215);const a=["zero","one","two","few","many","other"];function i(e){return a.filter((n=>e.includes(n)))}const o={locale:"en",pluralForms:i(["one","other"]),select:e=>1===e?"one":"other"};function l(){const{i18n:{currentLocale:e}}=(0,s.default)();return(0,t.useMemo)((()=>{try{return function(e){const n=new Intl.PluralRules(e);return{locale:e,pluralForms:i(n.resolvedOptions().pluralCategories),select:e=>n.select(e)}}(e)}catch(n){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${n.message}\n`),o}}),[e])}function c(){const e=l();return{selectMessage:(n,r)=>function(e,n,r){const t=e.split("|");if(1===t.length)return t[0];t.length>r.pluralForms.length&&console.error(`For locale=${r.locale}, a maximum of ${r.pluralForms.length} plural forms are expected (${r.pluralForms.join(",")}), but the message contains ${t.length}: ${e}`);const s=r.select(n),a=r.pluralForms.indexOf(s);return t[Math.min(a,t.length-1)]}(r,n,e)}}},1917:(e,n,r)=>{r.d(n,{Q:()=>a,b:()=>s});var t=r(5141);const s=()=>(0,t.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function a(e){const n={};return Object.values(e).forEach((e=>{const r=function(e){return e[0].toUpperCase()}(e.label);n[r]??=[],n[r].push(e)})),Object.entries(n).sort(((e,n)=>{let[r]=e,[t]=n;return r.localeCompare(t)})).map((e=>{let[n,r]=e;return{letter:n,tags:r.sort(((e,n)=>e.label.localeCompare(n.label)))}}))}},2883:(e,n,r)=>{r.d(n,{AE:()=>l,Rc:()=>i,TT:()=>u,Uh:()=>o,Yh:()=>c});r(4041);var t=r(5141),s=r(2221),a=r(1085);function i(){return(0,a.jsx)(t.A,{id:"theme.contentVisibility.unlistedBanner.title",description:"The unlisted content banner title",children:"Unlisted page"})}function o(){return(0,a.jsx)(t.A,{id:"theme.contentVisibility.unlistedBanner.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function l(){return(0,a.jsx)(s.A,{children:(0,a.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}function c(){return(0,a.jsx)(t.A,{id:"theme.contentVisibility.draftBanner.title",description:"The draft content banner title",children:"Draft page"})}function u(){return(0,a.jsx)(t.A,{id:"theme.contentVisibility.draftBanner.message",description:"The draft content banner message",children:"This page is a draft. It will only be visible in dev and be excluded from the production build."})}},3199:(e,n,r)=>{r.d(n,{A:()=>a});var t=r(2438),s=r(4293);function a(){const{prism:e}=(0,s.p)(),{colorMode:n}=(0,t.G)(),r=e.theme,a=e.darkTheme||r;return"dark"===n?a:r}},6436:(e,n,r)=>{const t=r(4041),s=r(6279),a=r(1292),i=r(8183),o=r(1085),l=(e=>e&&e.__esModule?e:{default:e})(s);n.VersionBanner=function(){const e=a.useDocsVersion(),n=e.banner,r=e.docs,s=e.pluginId,c=e.version,u=a.useDocVersionSuggestions(s).latestVersionSuggestion,d=a.useDocsPreferredVersion(s).savePreferredVersionName,h=t.useCallback((()=>{d(u.name)}),[u.name,d]);if(!n||!u)return null;const m=r[u.label];return o.jsx("div",{className:`${i.ThemeClassNames.docs.docVersionBanner} alert alert--warning margin-bottom--md`,role:"alert",children:o.jsxs("div",{children:["unreleased"===n&&o.jsx(o.Fragment,{children:"This is documentation for an unreleased version."}),"unmaintained"===n&&o.jsxs(o.Fragment,{children:["This is documentation for version ",o.jsx("b",{children:c}),"."]})," ","For the latest API, see version"," ",o.jsx("b",{children:o.jsx(l.default,{to:m.id,onClick:h,children:m.title})}),"."]})})}},6687:(e,n,r)=>{const t=r(1085);n.Footer=function(){return t.jsxs("footer",{className:"tsd-footer",children:["Powered by"," ",t.jsx("a",{href:"https://github.com/milesj/docusaurus-plugin-typedoc-api",children:"docusaurus-plugin-typedoc-api"})," ","and ",t.jsx("a",{href:"https://typedoc.org/",children:"TypeDoc"})]})}},6764:(e,n,r)=>{const t=r(4041),s=r(6279),a=r(1292),i=r(4661),o=r(7322),l=r(6687),c=r(6436),u=r(1085),d=e=>e&&e.__esModule?e:{default:e},h=d(s),m=d(i);function p(e,n,r){if(!e.match(/api\/([\d.]+)/)&&!e.includes("api/next")&&r&&r.name!==n.version){const n="current"===r.name?"next":r.name;return e.endsWith("/api")?`${e}/${n}`:e.replace("/api/",`/api/${n}/`)}return e}e.exports=function(e){let{options:n,packages:r,history:s}=e;const i=a.useDocsVersion(),d=a.useDocsPreferredVersion(i.pluginId).preferredVersion;return t.useEffect((()=>{1===r.length?s.replace(p(r[0].entryPoints[0].reflection.permalink,i,d)):d&&s.replace(p(s.location.pathname,i,d))}),[r,s,i,d]),u.jsx("div",{className:"row",children:u.jsxs("div",{className:"col apiItemCol",children:[n.banner&&u.jsx("div",{className:"alert alert--info margin-bottom--md",role:"alert",children:u.jsx("div",{dangerouslySetInnerHTML:{__html:n.banner}})}),u.jsx(c.VersionBanner,{}),u.jsx("div",{className:"apiItemContainer",children:u.jsxs("article",{children:[u.jsxs("div",{className:"markdown",children:[u.jsx("header",{children:u.jsx(m.default,{as:"h1",children:"API"})}),u.jsxs("section",{className:"tsd-panel",children:[u.jsx("h3",{className:"tsd-panel-header",children:"Packages"}),u.jsx("div",{className:"tsd-panel-content",children:u.jsx("ul",{className:"tsd-index-list",children:r.map((e=>u.jsx("li",{className:"tsd-truncate",children:u.jsxs(h.default,{className:"tsd-kind-icon",to:e.entryPoints[0].reflection.permalink,children:[u.jsxs("span",{className:"tsd-signature-symbol",children:["v",e.packageVersion]})," ",u.jsx("span",{children:o.removeScopes(e.packageName,n.scopes)})]})},e.packageName)))})})]})]}),u.jsx(l.Footer,{})]})})]})})}},7322:(e,n)=>{n.removeScopes=function(e,n){return 0===n.length?e:n.reduce(((e,n)=>e.replace(new RegExp(`^(${n}-|@${n}/)`),"")),e)}},8183:(e,n,r)=>{r.r(n),r.d(n,{Collapsible:()=>c.N,DraftBannerMessage:()=>F.TT,DraftBannerTitle:()=>F.Yh,ErrorBoundaryError:()=>w.bq,ErrorBoundaryErrorMessageFallback:()=>w.MN,ErrorBoundaryTryAgainButton:()=>w.a2,ErrorCauseBoundary:()=>w.k2,HtmlClassNameProvider:()=>m.e3,NavbarSecondaryMenuFiller:()=>f.GX,PageMetadata:()=>m.be,ReactContextError:()=>h.dV,SkipToContentFallbackId:()=>V.j,SkipToContentLink:()=>V.K,ThemeClassNames:()=>u.G,ThemedComponent:()=>i.A,UnlistedBannerMessage:()=>F.Uh,UnlistedBannerTitle:()=>F.Rc,UnlistedMetadata:()=>F.AE,composeProviders:()=>h.fM,createStorageSlot:()=>o.Wf,duplicates:()=>S.XI,filterDocCardListItems:()=>A,groupBy:()=>S.$z,isMultiColumnFooterLinks:()=>T.C,isRegexpStringMatch:()=>k.G,listStorageKeys:()=>o.Eo,listTagsByLetters:()=>x.Q,prefersReducedMotion:()=>d.O,processAdmonitionProps:()=>N.c,translateTagsPageTitle:()=>x.b,uniq:()=>S.sb,useClearQueryString:()=>j.W9,useCollapsible:()=>c.u,useColorMode:()=>p.G,useContextualSearchFilters:()=>$,useCurrentSidebarCategory:()=>M,useDocsPreferredVersion:()=>B,useEvent:()=>h._q,useHistorySelector:()=>j.Hl,usePluralForm:()=>l.W,usePrevious:()=>h.ZC,usePrismTheme:()=>P.A,useQueryString:()=>j.l,useQueryStringList:()=>j.fV,useSearchLinkCreator:()=>y,useSearchQueryString:()=>v,useStorageSlot:()=>o.Dv,useThemeConfig:()=>a.p,useWindowSize:()=>g.l});var t=r(1215),s=r(450),a=r(4293),i=r(8021),o=r(50),l=r(1240),c=r(9741),u=r(6558),d=r(7366),h=r(3815),m=r(7868),p=r(2438),f=r(7171),g=r(6640),x=r(1917),b=r(4041),j=r(838);const C="q";function v(){return(0,j.l)(C)}function y(){const{siteConfig:{baseUrl:e,themeConfig:n}}=(0,t.default)(),{algolia:{searchPagePath:r}}=n;return(0,b.useCallback)((n=>`${e}${r}?${C}=${encodeURIComponent(n)}`),[e,r])}var T=r(2771),k=r(4593),S=r(6423),P=r(3199),N=r(1148),V=r(1371),F=r(2883),w=r(5940);function M(){return r(1292).useCurrentSidebarCategory(...arguments)}function A(){return r(1292).filterDocCardListItems(...arguments)}function B(){return r(1292).useDocsPreferredVersion(...arguments)}function $(){const{i18n:e}=(0,t.default)(),n=r(1292).useDocsContextualSearchTags(),a=[s.C,...n];return{locale:e.currentLocale,tags:a}}}}]);