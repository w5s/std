"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[9972],{4417:(e,r,t)=>{t.d(r,{e:()=>i,i:()=>l});var n=t(4041),o=t(1786),s=t(1085);const a=n.createContext(null);function l(e){let{children:r,content:t,isBlogPostPage:o=!1}=e;const l=function(e){let{content:r,isBlogPostPage:t}=e;return(0,n.useMemo)((()=>({metadata:r.metadata,frontMatter:r.frontMatter,assets:r.assets,toc:r.toc,isBlogPostPage:t})),[r,t])}({content:t,isBlogPostPage:o});return(0,s.jsx)(a.Provider,{value:l,children:r})}function i(){const e=(0,n.useContext)(a);if(null===e)throw new o.dV("BlogPostProvider");return e}},457:(e,r,t)=>{t.d(r,{_:()=>l,u:()=>i});var n=t(4041),o=t(1786),s=t(1085);const a=n.createContext(null);function l(e){let{children:r,content:t}=e;const o=function(e){return(0,n.useMemo)((()=>({metadata:e.metadata,frontMatter:e.frontMatter,assets:e.assets,contentTitle:e.contentTitle,toc:e.toc})),[e])}(t);return(0,s.jsx)(a.Provider,{value:o,children:r})}function i(){const e=(0,n.useContext)(a);if(null===e)throw new o.dV("DocProvider");return e}},4579:(e,r,t)=>{t.d(r,{A:()=>i,G:()=>u});var n=t(4041),o=t(1786),s=t(1085);const a=Symbol("EmptyContext"),l=n.createContext(a);function i(e){let{children:r}=e;const[t,o]=(0,n.useState)(null),a=(0,n.useMemo)((()=>({expandedItem:t,setExpandedItem:o})),[t]);return(0,s.jsx)(l.Provider,{value:a,children:r})}function u(){const e=(0,n.useContext)(l);if(e===a)throw new o.dV("DocSidebarItemsExpandedStateProvider");return e}},6585:(e,r,t)=>{t.d(r,{H:()=>a});var n=t(4041),o=t(1034),s=t(9404);function a(e){let{threshold:r}=e;const[t,a]=(0,n.useState)(!1),l=(0,n.useRef)(!1),{startScroll:i,cancelScroll:u}=(0,o.gk)();return(0,o.Mq)(((e,t)=>{let{scrollY:n}=e;const o=t?.scrollY;o&&(l.current?l.current=!1:n>=o?(u(),a(!1)):n<r?a(!1):n+window.innerHeight<document.documentElement.scrollHeight&&a(!0))})),(0,s.$)((e=>{e.location.hash&&(l.current=!0,a(!1))})),{shown:t,scrollToTop:()=>i(0)}}},1020:(e,r,t)=>{t.d(r,{i:()=>i});var n=t(4041),o=t(2520);function s(e){const r=e.getBoundingClientRect();return r.top===r.bottom?s(e.parentNode):r}function a(e,r){let{anchorTopOffset:t}=r;const n=e.find((e=>s(e).top>=t));if(n){return function(e){return e.top>0&&e.bottom<window.innerHeight/2}(s(n))?n:e[e.indexOf(n)-1]??null}return e[e.length-1]??null}function l(){const e=(0,n.useRef)(0),{navbar:{hideOnScroll:r}}=(0,o.p)();return(0,n.useEffect)((()=>{e.current=r?0:document.querySelector(".navbar").clientHeight}),[r]),e}function i(e){const r=(0,n.useRef)(void 0),t=l();(0,n.useEffect)((()=>{if(!e)return()=>{};const{linkClassName:n,linkActiveClassName:o,minHeadingLevel:s,maxHeadingLevel:l}=e;function i(){const e=function(e){return Array.from(document.getElementsByClassName(e))}(n),i=function(e){let{minHeadingLevel:r,maxHeadingLevel:t}=e;const n=[];for(let o=r;o<=t;o+=1)n.push(`h${o}.anchor`);return Array.from(document.querySelectorAll(n.join()))}({minHeadingLevel:s,maxHeadingLevel:l}),u=a(i,{anchorTopOffset:t.current}),c=e.find((e=>u&&u.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)));e.forEach((e=>{!function(e,t){t?(r.current&&r.current!==e&&r.current.classList.remove(o),e.classList.add(o),r.current=e):e.classList.remove(o)}(e,e===c)}))}return document.addEventListener("scroll",i),document.addEventListener("resize",i),i(),()=>{document.removeEventListener("scroll",i),document.removeEventListener("resize",i)}}),[e,t])}},7772:(e,r,t)=>{t.r(r),t.d(r,{Collapsible:()=>u.N,ErrorBoundaryError:()=>D.bq,ErrorBoundaryErrorMessageFallback:()=>D.MN,ErrorBoundaryTryAgainButton:()=>D.a2,ErrorCauseBoundary:()=>D.k2,HtmlClassNameProvider:()=>f.e3,NavbarSecondaryMenuFiller:()=>g.GX,PageMetadata:()=>f.be,ReactContextError:()=>m.dV,SkipToContentFallbackId:()=>k.j,SkipToContentLink:()=>k.K,ThemeClassNames:()=>c.G,ThemedComponent:()=>o.A,UnlistedBannerMessage:()=>V.Uh,UnlistedBannerTitle:()=>V.Rc,UnlistedMetadata:()=>V.AE,composeProviders:()=>m.fM,createStorageSlot:()=>s.Wf,duplicates:()=>M.X,filterDocCardListItems:()=>l.d1,isMultiColumnFooterLinks:()=>x.C,isRegexpStringMatch:()=>E.G,listStorageKeys:()=>s.Eo,listTagsByLetters:()=>v.Q,prefersReducedMotion:()=>d.O,processAdmonitionProps:()=>w.c,translateTagsPageTitle:()=>v.b,uniq:()=>M.s,useCollapsible:()=>u.u,useColorMode:()=>h.G,useContextualSearchFilters:()=>a.af,useCurrentSidebarCategory:()=>l.$S,useDocsPreferredVersion:()=>L.g1,useEvent:()=>m._q,usePluralForm:()=>i.W,usePrevious:()=>m.ZC,usePrismTheme:()=>B.A,useSearchLinkCreator:()=>T,useSearchQueryString:()=>P,useStorageSlot:()=>s.Dv,useThemeConfig:()=>n.p,useWindowSize:()=>p.l});var n=t(2520),o=t(8977),s=t(2096),a=t(7789),l=t(268),i=t(7259),u=t(6476),c=t(7473),d=t(2631),m=t(1786),f=t(1918),h=t(2727),g=t(7226),p=t(1187),v=t(8494),b=t(4041),C=t(396),S=t(6703);const y="q";function P(){return(0,S.l)(y)}function T(){const{siteConfig:{baseUrl:e,themeConfig:r}}=(0,C.default)(),{algolia:{searchPagePath:t}}=r;return(0,b.useCallback)((r=>`${e}${t}?${y}=${encodeURIComponent(r)}`),[e,t])}var x=t(5780),E=t(5374),M=t(6004),B=t(8408),L=t(9599),w=t(7659),k=t(550),V=t(8751),D=t(419)},84:(e,r,t)=>{t.r(r),t.d(r,{AnnouncementBarProvider:()=>c.oq,BlogPostProvider:()=>i.i,Collapsible:()=>n.Collapsible,ColorModeProvider:()=>x.a,DEFAULT_SEARCH_TAG:()=>B.Cy,DocProvider:()=>l._,DocSidebarItemsExpandedStateProvider:()=>o.A,DocsPreferredVersionContextProvider:()=>u.VQ,DocsSidebarProvider:()=>a.V,DocsVersionProvider:()=>s.n,ErrorBoundaryError:()=>n.ErrorBoundaryError,ErrorBoundaryErrorMessageFallback:()=>n.ErrorBoundaryErrorMessageFallback,ErrorBoundaryTryAgainButton:()=>n.ErrorBoundaryTryAgainButton,ErrorCauseBoundary:()=>n.ErrorCauseBoundary,HtmlClassNameProvider:()=>n.HtmlClassNameProvider,NavbarProvider:()=>H.G,NavbarSecondaryMenuFiller:()=>n.NavbarSecondaryMenuFiller,PageMetadata:()=>n.PageMetadata,PluginHtmlClassNameProvider:()=>A.Jx,ReactContextError:()=>n.ReactContextError,ScrollControllerProvider:()=>I.Tv,SkipToContentFallbackId:()=>n.SkipToContentFallbackId,SkipToContentLink:()=>n.SkipToContentLink,ThemeClassNames:()=>n.ThemeClassNames,ThemedComponent:()=>n.ThemedComponent,UnlistedBannerMessage:()=>n.UnlistedBannerMessage,UnlistedBannerTitle:()=>n.UnlistedBannerTitle,UnlistedMetadata:()=>n.UnlistedMetadata,composeProviders:()=>n.composeProviders,containsLineNumbers:()=>M._u,createStorageSlot:()=>n.createStorageSlot,docVersionSearchTag:()=>B.tU,duplicates:()=>n.duplicates,filterDocCardListItems:()=>n.filterDocCardListItems,findFirstSidebarItemLink:()=>L.Nr,findSidebarCategory:()=>L._j,getPrismCssVariables:()=>M.M$,isActiveSidebarItem:()=>L.w8,isDocsPluginEnabled:()=>L.C5,isMultiColumnFooterLinks:()=>n.isMultiColumnFooterLinks,isRegexpStringMatch:()=>n.isRegexpStringMatch,isSamePath:()=>F.ys,isVisibleSidebarItem:()=>L.Se,keyboardFocusedClassName:()=>R.w,listStorageKeys:()=>n.listStorageKeys,listTagsByLetters:()=>n.listTagsByLetters,parseCodeBlockTitle:()=>M.wt,parseLanguage:()=>M.Op,parseLines:()=>M.Li,prefersReducedMotion:()=>n.prefersReducedMotion,processAdmonitionProps:()=>n.processAdmonitionProps,sanitizeTabsChildren:()=>v,splitNavbarItems:()=>H.D,translateTagsPageTitle:()=>n.translateTagsPageTitle,uniq:()=>n.uniq,useAlternatePageUtils:()=>E.o,useAnnouncementBar:()=>c.Mj,useBackToTopButton:()=>O.H,useBlogPost:()=>i.e,useCodeWordWrap:()=>U.f,useCollapsible:()=>n.useCollapsible,useColorMode:()=>n.useColorMode,useContextualSearchFilters:()=>n.useContextualSearchFilters,useCurrentSidebarCategory:()=>n.useCurrentSidebarCategory,useDoc:()=>l.u,useDocById:()=>L.cC,useDocRootMetadata:()=>L.B5,useDocSidebarItemsExpandedState:()=>o.G,useDocsPreferredVersion:()=>n.useDocsPreferredVersion,useDocsPreferredVersionByPluginId:()=>u.XK,useDocsSidebar:()=>a.t,useDocsVersion:()=>s.r,useDocsVersionCandidates:()=>L.Vd,useEvent:()=>n.useEvent,useFilteredAndTreeifiedTOC:()=>D.h,useHideableNavbar:()=>$.S,useHistoryPopHandler:()=>h.$Z,useHistorySelector:()=>h.Hl,useHomePageRoute:()=>F.Dt,useKeyboardNavigation:()=>R.J,useLayoutDoc:()=>L.QB,useLayoutDocsSidebar:()=>L.fW,useLocalPathname:()=>V.B,useLocationChange:()=>k.$,useLockBodyScroll:()=>q._,useNavbarMobileSidebar:()=>P.M,useNavbarSecondaryMenu:()=>T.T,usePluralForm:()=>n.usePluralForm,usePrevious:()=>n.usePrevious,usePrismTheme:()=>n.usePrismTheme,useQueryStringValue:()=>h.aZ,useScrollController:()=>I.n1,useScrollPosition:()=>I.Mq,useScrollPositionBlocker:()=>I.a_,useSearchLinkCreator:()=>n.useSearchLinkCreator,useSearchQueryString:()=>n.useSearchQueryString,useSidebarBreadcrumbs:()=>L.OF,useSmoothScrollTo:()=>I.gk,useStorageSlot:()=>n.useStorageSlot,useTOCHighlight:()=>N.i,useTabs:()=>y,useThemeConfig:()=>n.useThemeConfig,useTitleFormatter:()=>w.s,useTreeifiedTOC:()=>D.v,useVisibleBlogSidebarItems:()=>j.G,useVisibleSidebarItems:()=>L.Y,useWindowSize:()=>n.useWindowSize});var n=t(7772),o=t(4579),s=t(6738),a=t(7186),l=t(457),i=t(4417),u=t(9599),c=t(9303),d=t(4041),m=t(6090),f=t(3351),h=t(6703),g=t(6004),p=t(2096);function v(e){return d.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,d.isValidElement)(e)&&function(e){const{props:r}=e;return!!r&&"object"==typeof r&&"value"in r}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function b(e){const{values:r,children:t}=e;return(0,d.useMemo)((()=>{const e=r??function(e){return v(e).map((e=>{let{props:{value:r,label:t,attributes:n,default:o}}=e;return{value:r,label:t,attributes:n,default:o}}))}(t);return function(e){const r=(0,g.X)(e,((e,r)=>e.value===r.value));if(r.length>0)throw new Error(`Docusaurus error: Duplicate values "${r.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[r,t])}function C(e){let{value:r,tabValues:t}=e;return t.some((e=>e.value===r))}function S(e){let{queryString:r=!1,groupId:t}=e;const n=(0,m.W6)(),o=function(e){let{queryString:r=!1,groupId:t}=e;if("string"==typeof r)return r;if(!1===r)return null;if(!0===r&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:r,groupId:t});return[(0,h.aZ)(o),(0,d.useCallback)((e=>{if(!o)return;const r=new URLSearchParams(n.location.search);r.set(o,e),n.replace({...n.location,search:r.toString()})}),[o,n])]}function y(e){const{defaultValue:r,queryString:t=!1,groupId:n}=e,o=b(e),[s,a]=(0,d.useState)((()=>function(e){let{defaultValue:r,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(r){if(!C({value:r,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${r}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return r}const n=t.find((e=>e.default))??t[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:r,tabValues:o}))),[l,i]=S({queryString:t,groupId:n}),[u,c]=function(e){let{groupId:r}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(r),[n,o]=(0,p.Dv)(t);return[n,(0,d.useCallback)((e=>{t&&o.set(e)}),[t,o])]}({groupId:n}),m=(()=>{const e=l??u;return C({value:e,tabValues:o})?e:null})();(0,f.A)((()=>{m&&a(m)}),[m]);return{selectedValue:s,selectValue:(0,d.useCallback)((e=>{if(!C({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);a(e),i(e),c(e)}),[i,c,o]),tabValues:o}}var P=t(5271),T=t(2973),x=t(2727),E=t(1893),M=t(209),B=t(7789),L=t(268),w=t(2747),k=t(9404),V=t(520),D=t(9585),I=t(1034),F=t(4271),A=t(1918),H=t(131),N=t(1020),j=t(2277),$=t(9320),R=t(9924),q=t(6516),U=t(4905),O=t(6585)},2277:(e,r,t)=>{t.d(r,{G:()=>a});var n=t(4041),o=t(6090),s=t(4271);function a(e){const{pathname:r}=(0,o.zy)();return(0,n.useMemo)((()=>e.filter((e=>function(e,r){return!(e.unlisted&&!(0,s.ys)(e.permalink,r))}(e,r)))),[e,r])}},8494:(e,r,t)=>{t.d(r,{Q:()=>s,b:()=>o});var n=t(9082);const o=()=>(0,n.T)({id:"theme.tags.tagsPageTitle",message:"Tags",description:"The title of the tag list page"});function s(e){const r={};return Object.values(e).forEach((e=>{const t=function(e){return e[0].toUpperCase()}(e.label);r[t]??=[],r[t].push(e)})),Object.entries(r).sort(((e,r)=>{let[t]=e,[n]=r;return t.localeCompare(n)})).map((e=>{let[r,t]=e;return{letter:r,tags:t.sort(((e,r)=>e.label.localeCompare(r.label)))}}))}},9585:(e,r,t)=>{t.d(r,{h:()=>l,v:()=>s});var n=t(4041);function o(e){const r=e.map((e=>({...e,parentIndex:-1,children:[]}))),t=Array(7).fill(-1);r.forEach(((e,r)=>{const n=t.slice(2,e.level);e.parentIndex=Math.max(...n),t[e.level]=r}));const n=[];return r.forEach((e=>{const{parentIndex:t,...o}=e;t>=0?r[t].children.push(o):n.push(o)})),n}function s(e){return(0,n.useMemo)((()=>o(e)),[e])}function a(e){let{toc:r,minHeadingLevel:t,maxHeadingLevel:n}=e;return r.flatMap((e=>{const r=a({toc:e.children,minHeadingLevel:t,maxHeadingLevel:n});return function(e){return e.level>=t&&e.level<=n}(e)?[{...e,children:r}]:r}))}function l(e){let{toc:r,minHeadingLevel:t,maxHeadingLevel:s}=e;return(0,n.useMemo)((()=>a({toc:o(r),minHeadingLevel:t,maxHeadingLevel:s})),[r,t,s])}},8751:(e,r,t)=>{t.d(r,{AE:()=>i,Rc:()=>a,Uh:()=>l});t(4041);var n=t(9082),o=t(9058),s=t(1085);function a(){return(0,s.jsx)(n.A,{id:"theme.unlistedContent.title",description:"The unlisted content banner title",children:"Unlisted page"})}function l(){return(0,s.jsx)(n.A,{id:"theme.unlistedContent.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function i(){return(0,s.jsx)(o.A,{children:(0,s.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}},7259:(e,r,t)=>{t.d(r,{W:()=>u});var n=t(4041),o=t(396);const s=["zero","one","two","few","many","other"];function a(e){return s.filter((r=>e.includes(r)))}const l={locale:"en",pluralForms:a(["one","other"]),select:e=>1===e?"one":"other"};function i(){const{i18n:{currentLocale:e}}=(0,o.default)();return(0,n.useMemo)((()=>{try{return function(e){const r=new Intl.PluralRules(e);return{locale:e,pluralForms:a(r.resolvedOptions().pluralCategories),select:e=>r.select(e)}}(e)}catch(r){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${r.message}\n`),l}}),[e])}function u(){const e=i();return{selectMessage:(r,t)=>function(e,r,t){const n=e.split("|");if(1===n.length)return n[0];n.length>t.pluralForms.length&&console.error(`For locale=${t.locale}, a maximum of ${t.pluralForms.length} plural forms are expected (${t.pluralForms.join(",")}), but the message contains ${n.length}: ${e}`);const o=t.select(r),s=t.pluralForms.indexOf(o);return n[Math.min(s,n.length-1)]}(t,r,e)}}},5738:(e,r,t)=>{const n=t(1085);r.Footer=function(){return n.jsxs("footer",{className:"tsd-footer",children:["Powered by"," ",n.jsx("a",{href:"https://github.com/milesj/docusaurus-plugin-typedoc-api",children:"docusaurus-plugin-typedoc-api"})," ","and ",n.jsx("a",{href:"https://typedoc.org/",children:"TypeDoc"})]})}},2695:(e,r,t)=>{const n=t(4041),o=t(2436),s=t(8016),a=t(7772),l=t(84),i=t(1085),u=(e=>e&&e.__esModule?e:{default:e})(o);r.VersionBanner=function(){const e=l.useDocsVersion(),r=e.banner,t=e.docs,o=e.pluginId,c=e.version,d=s.useDocVersionSuggestions(o).latestVersionSuggestion,m=a.useDocsPreferredVersion(o).savePreferredVersionName,f=n.useCallback((()=>{m(d.name)}),[d.name,m]);if(!r||!d)return null;const h=t[d.label];return i.jsx("div",{className:`${a.ThemeClassNames.docs.docVersionBanner} alert alert--warning margin-bottom--md`,role:"alert",children:i.jsxs("div",{children:["unreleased"===r&&i.jsx(i.Fragment,{children:"This is documentation for an unreleased version."}),"unmaintained"===r&&i.jsxs(i.Fragment,{children:["This is documentation for version ",i.jsx("b",{children:c}),"."]})," ","For the latest API, see version"," ",i.jsx("b",{children:i.jsx(u.default,{to:h.id,onClick:f,children:h.title})}),"."]})})}}}]);