"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[565],{1858:(e,t,r)=>{r.d(t,{C:()=>u,n:()=>i});var n=r(2784),o=r(1661),s=r(2322);const a=n.createContext(null);function i(e){let{children:t,content:r,isBlogPostPage:o=!1}=e;const i=function(e){let{content:t,isBlogPostPage:r}=e;return(0,n.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:r})),[t,r])}({content:r,isBlogPostPage:o});return(0,s.jsx)(a.Provider,{value:i,children:t})}function u(){const e=(0,n.useContext)(a);if(null===e)throw new o.i6("BlogPostProvider");return e}},2844:(e,t,r)=>{r.d(t,{b:()=>i,k:()=>u});var n=r(2784),o=r(1661),s=r(2322);const a=n.createContext(null);function i(e){let{children:t,content:r}=e;const o=function(e){return(0,n.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(r);return(0,s.jsx)(a.Provider,{value:o,children:t})}function u(){const e=(0,n.useContext)(a);if(null===e)throw new o.i6("DocProvider");return e}},8134:(e,t,r)=>{r.d(t,{D:()=>u,f:()=>l});var n=r(2784),o=r(1661),s=r(2322);const a=Symbol("EmptyContext"),i=n.createContext(a);function u(e){let{children:t}=e;const[r,o]=(0,n.useState)(null),a=(0,n.useMemo)((()=>({expandedItem:r,setExpandedItem:o})),[r]);return(0,s.jsx)(i.Provider,{value:a,children:t})}function l(){const e=(0,n.useContext)(i);if(e===a)throw new o.i6("DocSidebarItemsExpandedStateProvider");return e}},580:(e,t,r)=>{r.d(t,{a:()=>a});var n=r(2784),o=r(6152),s=r(2462);function a(e){let{threshold:t}=e;const[r,a]=(0,n.useState)(!1),i=(0,n.useRef)(!1),{startScroll:u,cancelScroll:l}=(0,o.Ct)();return(0,o.RF)(((e,r)=>{let{scrollY:n}=e;const o=r?.scrollY;o&&(i.current?i.current=!1:n>=o?(l(),a(!1)):n<t?a(!1):n+window.innerHeight<document.documentElement.scrollHeight&&a(!0))})),(0,s.S)((e=>{e.location.hash&&(i.current=!0,a(!1))})),{shown:r,scrollToTop:()=>u(0)}}},1045:(e,t,r)=>{r.d(t,{S:()=>u});var n=r(2784),o=r(6371);function s(e){const t=e.getBoundingClientRect();return t.top===t.bottom?s(e.parentNode):t}function a(e,t){let{anchorTopOffset:r}=t;const n=e.find((e=>s(e).top>=r));if(n){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(s(n))?n:e[e.indexOf(n)-1]??null}return e[e.length-1]??null}function i(){const e=(0,n.useRef)(0),{navbar:{hideOnScroll:t}}=(0,o.L)();return(0,n.useEffect)((()=>{e.current=t?0:document.querySelector(".navbar").clientHeight}),[t]),e}function u(e){const t=(0,n.useRef)(void 0),r=i();(0,n.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:n,linkActiveClassName:o,minHeadingLevel:s,maxHeadingLevel:i}=e;function u(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(n),u=function(e){let{minHeadingLevel:t,maxHeadingLevel:r}=e;const n=[];for(let o=t;o<=r;o+=1)n.push(`h${o}.anchor`);return Array.from(document.querySelectorAll(n.join()))}({minHeadingLevel:s,maxHeadingLevel:i}),l=a(u,{anchorTopOffset:r.current}),c=e.find((e=>l&&l.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,r){r?(t.current&&t.current!==e&&t.current.classList.remove(o),e.classList.add(o),t.current=e):e.classList.remove(o)}(e,e===c)}))}return document.addEventListener("scroll",u),document.addEventListener("resize",u),u(),()=>{document.removeEventListener("scroll",u),document.removeEventListener("resize",u)}}),[e,r])}},426:(e,t,r)=>{r.r(t),r.d(t,{Collapsible:()=>l.z,ErrorBoundaryError:()=>B.aG,ErrorBoundaryErrorMessageFallback:()=>B.Ac,ErrorBoundaryTryAgainButton:()=>B.Cw,ErrorCauseBoundary:()=>B.QW,HtmlClassNameProvider:()=>m.FG,NavbarSecondaryMenuFiller:()=>g.Zo,PageMetadata:()=>m.d,ReactContextError:()=>f.i6,SkipToContentFallbackId:()=>w.u,SkipToContentLink:()=>w.l,ThemeClassNames:()=>c.k,ThemedComponent:()=>o.Z,UnlistedBannerMessage:()=>k.eU,UnlistedBannerTitle:()=>k.cI,UnlistedMetadata:()=>k.T$,composeProviders:()=>f.Qc,createStorageSlot:()=>s.WA,duplicates:()=>L.l,filterDocCardListItems:()=>i.MN,isMultiColumnFooterLinks:()=>x.a,isRegexpStringMatch:()=>E.F,listStorageKeys:()=>s._f,listTagsByLetters:()=>v.P,prefersReducedMotion:()=>d.n,processAdmonitionProps:()=>V.X,translateTagsPageTitle:()=>v.M,uniq:()=>L.j,useCollapsible:()=>l.u,useColorMode:()=>h.I,useContextualSearchFilters:()=>a._q,useCurrentSidebarCategory:()=>i.jA,useDocsPreferredVersion:()=>D.J,useEvent:()=>f.zX,usePluralForm:()=>u.c,usePrevious:()=>f.D9,usePrismTheme:()=>M.p,useSearchLinkCreator:()=>y,useSearchQueryString:()=>P,useStorageSlot:()=>s.Nk,useThemeConfig:()=>n.L,useWindowSize:()=>p.i});var n=r(6371),o=r(9222),s=r(1495),a=r(2217),i=r(2832),u=r(2384),l=r(9782),c=r(5138),d=r(2043),f=r(1661),m=r(5553),h=r(5869),g=r(3970),p=r(6086),v=r(6646),b=r(2784),C=r(5837),S=r(6250);const T="q";function P(){return(0,S.Nc)(T)}function y(){const{siteConfig:{baseUrl:e,themeConfig:t}}=(0,C.default)(),{algolia:{searchPagePath:r}}=t;return(0,b.useCallback)((t=>`${e}${r}?${T}=${encodeURIComponent(t)}`),[e,r])}var x=r(4720),E=r(2987),L=r(7054),M=r(7658),D=r(3855),V=r(7837),w=r(7147),k=r(3562),B=r(5357)},8762:(e,t,r)=>{r.r(t),r.d(t,{AnnouncementBarProvider:()=>c.pl,BlogPostProvider:()=>u.n,Collapsible:()=>n.Collapsible,ColorModeProvider:()=>x.S,DEFAULT_SEARCH_TAG:()=>M.HX,DocProvider:()=>i.b,DocSidebarItemsExpandedStateProvider:()=>o.D,DocsPreferredVersionContextProvider:()=>l.L5,DocsSidebarProvider:()=>a.b,DocsVersionProvider:()=>s.q,ErrorBoundaryError:()=>n.ErrorBoundaryError,ErrorBoundaryErrorMessageFallback:()=>n.ErrorBoundaryErrorMessageFallback,ErrorBoundaryTryAgainButton:()=>n.ErrorBoundaryTryAgainButton,ErrorCauseBoundary:()=>n.ErrorCauseBoundary,HtmlClassNameProvider:()=>n.HtmlClassNameProvider,NavbarProvider:()=>N.V,NavbarSecondaryMenuFiller:()=>n.NavbarSecondaryMenuFiller,PageMetadata:()=>n.PageMetadata,PluginHtmlClassNameProvider:()=>H.VC,ReactContextError:()=>n.ReactContextError,ScrollControllerProvider:()=>I.OC,SkipToContentFallbackId:()=>n.SkipToContentFallbackId,SkipToContentLink:()=>n.SkipToContentLink,ThemeClassNames:()=>n.ThemeClassNames,ThemedComponent:()=>n.ThemedComponent,UnlistedBannerMessage:()=>n.UnlistedBannerMessage,UnlistedBannerTitle:()=>n.UnlistedBannerTitle,UnlistedMetadata:()=>n.UnlistedMetadata,composeProviders:()=>n.composeProviders,containsLineNumbers:()=>L.nt,createStorageSlot:()=>n.createStorageSlot,docVersionSearchTag:()=>M.os,duplicates:()=>n.duplicates,filterDocCardListItems:()=>n.filterDocCardListItems,findFirstSidebarItemLink:()=>D.LM,findSidebarCategory:()=>D.em,getPrismCssVariables:()=>L.QC,isActiveSidebarItem:()=>D._F,isDocsPluginEnabled:()=>D.cE,isMultiColumnFooterLinks:()=>n.isMultiColumnFooterLinks,isRegexpStringMatch:()=>n.isRegexpStringMatch,isSamePath:()=>F.Mg,isVisibleSidebarItem:()=>D.pC,keyboardFocusedClassName:()=>$.h,listStorageKeys:()=>n.listStorageKeys,listTagsByLetters:()=>n.listTagsByLetters,parseCodeBlockTitle:()=>L.bc,parseLanguage:()=>L.Vo,parseLines:()=>L.nZ,prefersReducedMotion:()=>n.prefersReducedMotion,processAdmonitionProps:()=>n.processAdmonitionProps,sanitizeTabsChildren:()=>v,splitNavbarItems:()=>N.A,translateTagsPageTitle:()=>n.translateTagsPageTitle,uniq:()=>n.uniq,useAlternatePageUtils:()=>E.l,useAnnouncementBar:()=>c.nT,useBackToTopButton:()=>O.a,useBlogPost:()=>u.C,useCodeWordWrap:()=>q.F,useCollapsible:()=>n.useCollapsible,useColorMode:()=>n.useColorMode,useContextualSearchFilters:()=>n.useContextualSearchFilters,useCurrentSidebarCategory:()=>n.useCurrentSidebarCategory,useDoc:()=>i.k,useDocById:()=>D.xz,useDocRootMetadata:()=>D.SN,useDocSidebarItemsExpandedState:()=>o.f,useDocsPreferredVersion:()=>n.useDocsPreferredVersion,useDocsPreferredVersionByPluginId:()=>l.Oh,useDocsSidebar:()=>a.V,useDocsVersion:()=>s.E,useDocsVersionCandidates:()=>D.lO,useEvent:()=>n.useEvent,useFilteredAndTreeifiedTOC:()=>B.b,useHideableNavbar:()=>R.c,useHistoryPopHandler:()=>h.Rb,useHistorySelector:()=>h.xL,useHomePageRoute:()=>F.Ns,useKeyboardNavigation:()=>$.t,useLayoutDoc:()=>D.vY,useLayoutDocsSidebar:()=>D.oz,useLocalPathname:()=>k.b,useLocationChange:()=>w.S,useLockBodyScroll:()=>U.N,useNavbarMobileSidebar:()=>P.e,useNavbarSecondaryMenu:()=>y.Y,usePluralForm:()=>n.usePluralForm,usePrevious:()=>n.usePrevious,usePrismTheme:()=>n.usePrismTheme,useQueryStringValue:()=>h._X,useScrollController:()=>I.sG,useScrollPosition:()=>I.RF,useScrollPositionBlocker:()=>I.o5,useSearchLinkCreator:()=>n.useSearchLinkCreator,useSearchQueryString:()=>n.useSearchQueryString,useSidebarBreadcrumbs:()=>D.s1,useSmoothScrollTo:()=>I.Ct,useStorageSlot:()=>n.useStorageSlot,useTOCHighlight:()=>A.S,useTabs:()=>T,useThemeConfig:()=>n.useThemeConfig,useTitleFormatter:()=>V.p,useTreeifiedTOC:()=>B.a,useVisibleBlogSidebarItems:()=>j.c,useVisibleSidebarItems:()=>D.f,useWindowSize:()=>n.useWindowSize});var n=r(426),o=r(8134),s=r(2993),a=r(3504),i=r(2844),u=r(1858),l=r(3855),c=r(5830),d=r(2784),f=r(7267),m=r(4817),h=r(6250),g=r(7054),p=r(1495);function v(e){return d.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,d.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function b(e){const{values:t,children:r}=e;return(0,d.useMemo)((()=>{const e=t??function(e){return v(e).map((e=>{let{props:{value:t,label:r,attributes:n,default:o}}=e;return{value:t,label:r,attributes:n,default:o}}))}(r);return function(e){const t=(0,g.l)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function C(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function S(e){let{queryString:t=!1,groupId:r}=e;const n=(0,f.k6)(),o=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,h._X)(o),(0,d.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(n.location.search);t.set(o,e),n.replace({...n.location,search:t.toString()})}),[o,n])]}function T(e){const{defaultValue:t,queryString:r=!1,groupId:n}=e,o=b(e),[s,a]=(0,d.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!C({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=r.find((e=>e.default))??r[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:o}))),[i,u]=S({queryString:r,groupId:n}),[l,c]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,o]=(0,p.Nk)(r);return[n,(0,d.useCallback)((e=>{r&&o.set(e)}),[r,o])]}({groupId:n}),f=(()=>{const e=i??l;return C({value:e,tabValues:o})?e:null})();(0,m.Z)((()=>{f&&a(f)}),[f]);return{selectedValue:s,selectValue:(0,d.useCallback)((e=>{if(!C({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);a(e),u(e),c(e)}),[u,c,o]),tabValues:o}}var P=r(5443),y=r(557),x=r(5869),E=r(8345),L=r(7171),M=r(2217),D=r(2832),V=r(4493),w=r(2462),k=r(9967),B=r(5455),I=r(6152),F=r(9846),H=r(5553),N=r(2256),A=r(1045),j=r(6521),R=r(2793),$=r(1869),U=r(4203),q=r(4064),O=r(580)},6521:(e,t,r)=>{r.d(t,{c:()=>a});var n=r(2784),o=r(7267),s=r(9846);function a(e){const{pathname:t}=(0,o.TH)();return(0,n.useMemo)((()=>e.filter((e=>function(e,t){return!(e.unlisted&&!(0,s.Mg)(e.permalink,t))}(e,t)))),[e,t])}},6646:(e,t,r)=>{r.d(t,{M:()=>o,P:()=>s});var n=r(8004);const o=()=>(0,n.I)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function s(e){const t={};return Object.values(e).forEach((e=>{const r=function(e){return e[0].toUpperCase()}(e.label);t[r]??=[],t[r].push(e)})),Object.entries(t).sort(((e,t)=>{let[r]=e,[n]=t;return r.localeCompare(n)})).map((e=>{let[t,r]=e;return{letter:t,tags:r.sort(((e,t)=>e.label.localeCompare(t.label)))}}))}},5455:(e,t,r)=>{r.d(t,{a:()=>s,b:()=>i});var n=r(2784);function o(e){const t=e.map((e=>({...e,parentIndex:-1,children:[]}))),r=Array(7).fill(-1);t.forEach(((e,t)=>{const n=r.slice(2,e.level);e.parentIndex=Math.max(...n),r[e.level]=t}));const n=[];return t.forEach((e=>{const{parentIndex:r,...o}=e;r>=0?t[r].children.push(o):n.push(o)})),n}function s(e){return(0,n.useMemo)((()=>o(e)),[e])}function a(e){let{toc:t,minHeadingLevel:r,maxHeadingLevel:n}=e;return t.flatMap((e=>{const t=a({toc:e.children,minHeadingLevel:r,maxHeadingLevel:n});return function(e){return e.level>=r&&e.level<=n}(e)?[{...e,children:t}]:t}))}function i(e){let{toc:t,minHeadingLevel:r,maxHeadingLevel:s}=e;return(0,n.useMemo)((()=>a({toc:o(t),minHeadingLevel:r,maxHeadingLevel:s})),[t,r,s])}},3562:(e,t,r)=>{r.d(t,{T$:()=>u,cI:()=>a,eU:()=>i});r(2784);var n=r(8004),o=r(8428),s=r(2322);function a(){return(0,s.jsx)(n.Z,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function i(){return(0,s.jsx)(n.Z,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function u(){return(0,s.jsx)(o.Z,{children:(0,s.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}},2384:(e,t,r)=>{r.d(t,{c:()=>l});var n=r(2784),o=r(5837);const s=["zero","one","two","few","many","other"];function a(e){return s.filter((t=>e.includes(t)))}const i={locale:"en",pluralForms:a(["one","other"]),select:e=>1===e?"one":"other"};function u(){const{i18n:{currentLocale:e}}=(0,o.default)();return(0,n.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:a(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),i}}),[e])}function l(){const e=u();return{selectMessage:(t,r)=>function(e,t,r){const n=e.split("|");if(1===n.length)return n[0];n.length>r.pluralForms.length&&console.error(`For locale=${r.locale}, a maximum of ${r.pluralForms.length} plural forms are expected (${r.pluralForms.join(",")}), but the message contains ${n.length}: ${e}`);const o=r.select(t),s=r.pluralForms.indexOf(o);return n[Math.min(s,n.length-1)]}(r,t,e)}}},1752:(e,t,r)=>{const n=r(2322);t.Footer=function(){return n.jsxs("footer",{className:"tsd-footer",children:["Powered by"," ",n.jsx("a",{href:"https://github.com/milesj/docusaurus-plugin-typedoc-api",children:"docusaurus-plugin-typedoc-api"})," ","and ",n.jsx("a",{href:"https://typedoc.org/",children:"TypeDoc"})]})}},2160:(e,t,r)=>{const n=r(2784),o=r(2896),s=r(9654),a=r(426),i=r(8762),u=r(2322),l=(e=>e&&e.__esModule?e:{default:e})(o);t.VersionBanner=function(){const e=i.useDocsVersion(),t=e.banner,r=e.docs,o=e.pluginId,c=e.version,d=s.useDocVersionSuggestions(o).latestVersionSuggestion,f=a.useDocsPreferredVersion(o).savePreferredVersionName,m=n.useCallback((()=>{f(d.name)}),[d.name,f]);if(!t||!d)return null;const h=r[d.label];return u.jsx("div",{className:`${a.ThemeClassNames.docs.docVersionBanner} alert alert--warning margin-bottom--md`,role:"alert",children:u.jsxs("div",{children:["unreleased"===t&&u.jsx(u.Fragment,{children:"This is documentation for an unreleased version."}),"unmaintained"===t&&u.jsxs(u.Fragment,{children:["This is documentation for version ",u.jsx("b",{children:c}),"."]})," ","For the latest API, see version"," ",u.jsx("b",{children:u.jsx(l.default,{to:h.id,onClick:m,children:h.title})}),"."]})})}},9654:(e,t,r)=>{r.r(t),r.d(t,{useActiveDocContext:()=>p,useActivePlugin:()=>d,useActivePluginAndVersion:()=>f,useActiveVersion:()=>g,useAllDocsData:()=>l,useDocVersionSuggestions:()=>v,useDocsData:()=>c,useLatestVersion:()=>h,useVersions:()=>m});var n=r(7267),o=r(7e3);const s=e=>e.versions.find((e=>e.isLast));function a(e,t){const r=s(e);return[...e.versions.filter((e=>e!==r)),r].find((e=>!!(0,n.LX)(t,{path:e.path,exact:!1,strict:!1})))}function i(e,t){const r=a(e,t),o=r?.docs.find((e=>!!(0,n.LX)(t,{path:e.path,exact:!0,strict:!1})));return{activeVersion:r,activeDoc:o,alternateDocVersions:o?function(t){const r={};return e.versions.forEach((e=>{e.docs.forEach((n=>{n.id===t&&(r[e.name]=n)}))})),r}(o.id):{}}}const u={},l=()=>(0,o.OD)("docusaurus-plugin-content-docs")??u,c=e=>(0,o.eZ)("docusaurus-plugin-content-docs",e,{failfast:!0});function d(e){void 0===e&&(e={});const t=l(),{pathname:r}=(0,n.TH)();return function(e,t,r){void 0===r&&(r={});const o=Object.entries(e).sort(((e,t)=>t[1].path.localeCompare(e[1].path))).find((e=>{let[,r]=e;return!!(0,n.LX)(t,{path:r.path,exact:!1,strict:!1})})),s=o?{pluginId:o[0],pluginData:o[1]}:void 0;if(!s&&r.failfast)throw new Error(`Can't find active docs plugin for "${t}" pathname, while it was expected to be found. Maybe you tried to use a docs feature that can only be used on a docs-related page? Existing docs plugin paths are: ${Object.values(e).map((e=>e.path)).join(", ")}`);return s}(t,r,e)}function f(e){void 0===e&&(e={});const t=d(e),{pathname:r}=(0,n.TH)();if(!t)return;return{activePlugin:t,activeVersion:a(t.pluginData,r)}}function m(e){return c(e).versions}function h(e){const t=c(e);return s(t)}function g(e){const t=c(e),{pathname:r}=(0,n.TH)();return a(t,r)}function p(e){const t=c(e),{pathname:r}=(0,n.TH)();return i(t,r)}function v(e){const t=c(e),{pathname:r}=(0,n.TH)();return function(e,t){const r=s(e);return{latestDocSuggestion:i(e,t).alternateDocVersions[r.name],latestVersionSuggestion:r}}(t,r)}}}]);