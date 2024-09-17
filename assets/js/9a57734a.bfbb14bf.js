"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[4082,9048],{572:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ue});var a=n(4041),o=n(4357),i=n(2783),r=n(7473),s=n(8082),l=n(5487),c=n(9082),d=n(1034),u=n(9404);const m={backToTopButton:"backToTopButton_z1FD",backToTopButtonShow:"backToTopButtonShow_w1wE"};var b=n(1085);function p(){const{shown:e,scrollToTop:t}=function(e){let{threshold:t}=e;const[n,o]=(0,a.useState)(!1),i=(0,a.useRef)(!1),{startScroll:r,cancelScroll:s}=(0,d.gk)();return(0,d.Mq)(((e,n)=>{let{scrollY:a}=e;const r=n?.scrollY;r&&(i.current?i.current=!1:a>=r?(s(),o(!1)):a<t?o(!1):a+window.innerHeight<document.documentElement.scrollHeight&&o(!0))})),(0,u.$)((e=>{e.location.hash&&(i.current=!0,o(!1))})),{shown:n,scrollToTop:()=>r(0)}}({threshold:300});return(0,b.jsx)("button",{"aria-label":(0,c.T)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,o.A)("clean-btn",r.G.common.backToTopButton,m.backToTopButton,e&&m.backToTopButtonShow),type:"button",onClick:t})}var h=n(2631),f=n(6090),x=n(1187),j=n(2520),v=n(1631);function g(e){return(0,b.jsx)("svg",{width:"20",height:"20","aria-hidden":"true",...e,children:(0,b.jsxs)("g",{fill:"#7a7a7a",children:[(0,b.jsx)("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),(0,b.jsx)("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})]})})}const _={collapseSidebarButton:"collapseSidebarButton_Ftvb",collapseSidebarButtonIcon:"collapseSidebarButtonIcon_c4WT"};function A(e){let{onClick:t}=e;return(0,b.jsx)("button",{type:"button",title:(0,c.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,o.A)("button button--secondary button--outline",_.collapseSidebarButton),onClick:t,children:(0,b.jsx)(g,{className:_.collapseSidebarButtonIcon})})}var y=n(9303),C=n(6948),k=n(1786),S=n(6476),N=n(4271),T=n(2436),w=n(213);function I(e){let{collapsed:t,categoryLabel:n,onClick:a}=e;return(0,b.jsx)("button",{"aria-label":t?(0,c.T)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:n}):(0,c.T)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:n}),"aria-expanded":!t,type:"button",className:"clean-btn menu__caret",onClick:a})}function B(e){let{item:t,onItemClick:n,activePath:i,level:l,index:c,...d}=e;const{items:u,label:m,collapsible:p,className:h,href:f}=t,{docs:{sidebar:{autoCollapseCategories:x}}}=(0,j.p)(),v=function(e){const t=(0,w.A)();return(0,a.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!t&&e.collapsible?(0,s.Nr)(e):void 0),[e,t])}(t),g=(0,s.w8)(t,i),_=(0,N.ys)(f,i),{collapsed:A,setCollapsed:y}=(0,S.u)({initialState:()=>!!p&&(!g&&t.collapsed)}),{expandedItem:B,setExpandedItem:E}=(0,C.G)(),O=function(e){void 0===e&&(e=!A),E(e?null:c),y(e)};return function(e){let{isActive:t,collapsed:n,updateCollapsed:o}=e;const i=(0,k.ZC)(t);(0,a.useEffect)((()=>{t&&!i&&n&&o(!1)}),[t,i,n,o])}({isActive:g,collapsed:A,updateCollapsed:O}),(0,a.useEffect)((()=>{p&&null!=B&&B!==c&&x&&y(!0)}),[p,B,c,y,x]),(0,b.jsxs)("li",{className:(0,o.A)(r.G.docs.docSidebarItemCategory,r.G.docs.docSidebarItemCategoryLevel(l),"menu__list-item",{"menu__list-item--collapsed":A},h),children:[(0,b.jsxs)("div",{className:(0,o.A)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":_}),children:[(0,b.jsx)(T.default,{className:(0,o.A)("menu__link",{"menu__link--sublist":p,"menu__link--sublist-caret":!f&&p,"menu__link--active":g}),onClick:p?e=>{n?.(t),f?O(!1):(e.preventDefault(),O())}:()=>{n?.(t)},"aria-current":_?"page":void 0,role:p&&!f?"button":void 0,"aria-expanded":p&&!f?!A:void 0,href:p?v??"#":v,...d,children:m}),f&&p&&(0,b.jsx)(I,{collapsed:A,categoryLabel:m,onClick:e=>{e.preventDefault(),O()}})]}),(0,b.jsx)(S.N,{lazy:!0,as:"ul",className:"menu__list",collapsed:A,children:(0,b.jsx)(G,{items:u,tabIndex:A?-1:0,onItemClick:n,activePath:i,level:l+1})})]})}var E=n(5436),O=n(2196);const L={menuExternalLink:"menuExternalLink_xK2O"};function P(e){let{item:t,onItemClick:n,activePath:a,level:i,index:l,...c}=e;const{href:d,label:u,className:m,autoAddBaseUrl:p}=t,h=(0,s.w8)(t,a),f=(0,E.A)(d);return(0,b.jsx)("li",{className:(0,o.A)(r.G.docs.docSidebarItemLink,r.G.docs.docSidebarItemLinkLevel(i),"menu__list-item",m),children:(0,b.jsxs)(T.default,{className:(0,o.A)("menu__link",!f&&L.menuExternalLink,{"menu__link--active":h}),autoAddBaseUrl:p,"aria-current":h?"page":void 0,to:d,...f&&{onClick:n?()=>n(t):void 0},...c,children:[u,!f&&(0,b.jsx)(O.A,{})]})},u)}const M={menuHtmlItem:"menuHtmlItem_anEq"};function H(e){let{item:t,level:n,index:a}=e;const{value:i,defaultStyle:s,className:l}=t;return(0,b.jsx)("li",{className:(0,o.A)(r.G.docs.docSidebarItemLink,r.G.docs.docSidebarItemLinkLevel(n),s&&[M.menuHtmlItem,"menu__list-item"],l),dangerouslySetInnerHTML:{__html:i}},a)}function D(e){let{item:t,...n}=e;switch(t.type){case"category":return(0,b.jsx)(B,{item:t,...n});case"html":return(0,b.jsx)(H,{item:t,...n});default:return(0,b.jsx)(P,{item:t,...n})}}function R(e){let{items:t,...n}=e;const a=(0,s.Y)(t,n.activePath);return(0,b.jsx)(C.A,{children:a.map(((e,t)=>(0,b.jsx)(D,{item:e,index:t,...n},t)))})}const G=(0,a.memo)(R),W={menu:"menu_qiME",menuWithAnnouncementBar:"menuWithAnnouncementBar_hRfJ"};function F(e){let{path:t,sidebar:n,className:i}=e;const s=function(){const{isActive:e}=(0,y.M)(),[t,n]=(0,a.useState)(e);return(0,d.Mq)((t=>{let{scrollY:a}=t;e&&n(0===a)}),[e]),e&&t}();return(0,b.jsx)("nav",{"aria-label":(0,c.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,o.A)("menu thin-scrollbar",W.menu,s&&W.menuWithAnnouncementBar,i),children:(0,b.jsx)("ul",{className:(0,o.A)(r.G.docs.docSidebarMenu,"menu__list"),children:(0,b.jsx)(G,{items:n,activePath:t,level:1})})})}const q="sidebar_vJCc",z="sidebarWithHideableNavbar_Fo4g",V="sidebarHidden_vBKa",Y="sidebarLogo_nlll";function K(e){let{path:t,sidebar:n,onCollapse:a,isHidden:i}=e;const{navbar:{hideOnScroll:r},docs:{sidebar:{hideable:s}}}=(0,j.p)();return(0,b.jsxs)("div",{className:(0,o.A)(q,r&&z,i&&V),children:[r&&(0,b.jsx)(v.A,{tabIndex:-1,className:Y}),(0,b.jsx)(F,{path:t,sidebar:n}),s&&(0,b.jsx)(A,{onClick:a})]})}const U=a.memo(K);var X=n(7226),J=n(5271);const Z=e=>{let{sidebar:t,path:n}=e;const a=(0,J.M)();return(0,b.jsx)("ul",{className:(0,o.A)(r.G.docs.docSidebarMenu,"menu__list"),children:(0,b.jsx)(G,{items:t,activePath:n,onItemClick:e=>{"category"===e.type&&e.href&&a.toggle(),"link"===e.type&&a.toggle()},level:1})})};function Q(e){return(0,b.jsx)(X.GX,{component:Z,props:e})}const $=a.memo(Q);function ee(e){const t=(0,x.l)(),n="desktop"===t||"ssr"===t,a="mobile"===t;return(0,b.jsxs)(b.Fragment,{children:[n&&(0,b.jsx)(U,{...e}),a&&(0,b.jsx)($,{...e})]})}const te={expandButton:"expandButton_SZY_",expandButtonIcon:"expandButtonIcon_CMLm"};function ne(e){let{toggleSidebar:t}=e;return(0,b.jsx)("div",{className:te.expandButton,title:(0,c.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t,children:(0,b.jsx)(g,{className:te.expandButtonIcon})})}const ae={docSidebarContainer:"docSidebarContainer_e5ai",docSidebarContainerHidden:"docSidebarContainerHidden_vqQo",sidebarViewport:"sidebarViewport_N8x0"};function oe(e){let{children:t}=e;const n=(0,l.t)();return(0,b.jsx)(a.Fragment,{children:t},n?.name??"noSidebar")}function ie(e){let{sidebar:t,hiddenSidebarContainer:n,setHiddenSidebarContainer:i}=e;const{pathname:s}=(0,f.zy)(),[l,c]=(0,a.useState)(!1),d=(0,a.useCallback)((()=>{l&&c(!1),!l&&(0,h.O)()&&c(!0),i((e=>!e))}),[i,l]);return(0,b.jsx)("aside",{className:(0,o.A)(r.G.docs.docSidebarContainer,ae.docSidebarContainer,n&&ae.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(ae.docSidebarContainer)&&n&&c(!0)},children:(0,b.jsx)(oe,{children:(0,b.jsxs)("div",{className:(0,o.A)(ae.sidebarViewport,l&&ae.sidebarViewportHidden),children:[(0,b.jsx)(ee,{sidebar:t,path:s,onCollapse:d,isHidden:l}),l&&(0,b.jsx)(ne,{toggleSidebar:d})]})})})}const re={docMainContainer:"docMainContainer_namt",docMainContainerEnhanced:"docMainContainerEnhanced_sRjM",docItemWrapperEnhanced:"docItemWrapperEnhanced_TX_6"};function se(e){let{hiddenSidebarContainer:t,children:n}=e;const a=(0,l.t)();return(0,b.jsx)("main",{className:(0,o.A)(re.docMainContainer,(t||!a)&&re.docMainContainerEnhanced),children:(0,b.jsx)("div",{className:(0,o.A)("container padding-top--md padding-bottom--lg",re.docItemWrapper,t&&re.docItemWrapperEnhanced),children:n})})}const le={docRoot:"docRoot_HciC",docsWrapper:"docsWrapper_XLvK"};function ce(e){let{children:t}=e;const n=(0,l.t)(),[o,i]=(0,a.useState)(!1);return(0,b.jsxs)("div",{className:le.docsWrapper,children:[(0,b.jsx)(p,{}),(0,b.jsxs)("div",{className:le.docRoot,children:[n&&(0,b.jsx)(ie,{sidebar:n.items,hiddenSidebarContainer:o,setHiddenSidebarContainer:i}),(0,b.jsx)(se,{hiddenSidebarContainer:o,children:t})]})]})}var de=n(2757);function ue(e){const t=(0,s.B5)(e);if(!t)return(0,b.jsx)(de.A,{});const{docElement:n,sidebarName:a,sidebarItems:c}=t;return(0,b.jsx)(i.e3,{className:(0,o.A)(r.G.page.docsDocPage),children:(0,b.jsx)(l.V,{name:a,items:c,children:(0,b.jsx)(ce,{children:n})})})}},2757:(e,t,n)=>{n.d(t,{A:()=>s});n(4041);var a=n(4357),o=n(9082),i=n(4441),r=n(1085);function s(e){let{className:t}=e;return(0,r.jsx)("main",{className:(0,a.A)("container margin-vert--xl",t),children:(0,r.jsx)("div",{className:"row",children:(0,r.jsxs)("div",{className:"col col--6 col--offset-3",children:[(0,r.jsx)(i.default,{as:"h1",className:"hero__title",children:(0,r.jsx)(o.A,{id:"theme.NotFound.title",description:"The title of the 404 page",children:"Page Not Found"})}),(0,r.jsx)("p",{children:(0,r.jsx)(o.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page",children:"We could not find what you were looking for."})}),(0,r.jsx)("p",{children:(0,r.jsx)(o.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page",children:"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."})})]})})})}},3006:(e,t,n)=>{const a=n(4041).createContext({options:{banner:"",breadcrumbs:!0,gitRefName:"master",minimal:!1,pluginId:"default",scopes:[]},reflections:{}});t.ApiDataContext=a},7858:(e,t,n)=>{const a=["options","packages"];function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t,n){return(t=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var a=n.call(e,t||"default");if("object"!=typeof a)return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n(1700),n(5903);const s=n(4041),l=n(572),c=n(3006),d=n(1085),u=(e=>e&&e.__esModule?e:{default:e})(l);function m(e){return"object"==typeof e&&null!==e&&!Array.isArray(e)}function b(e,t,n){return Object.entries(e).forEach((a=>{let[o,i]=a;if("id"===o){const a="type"in e;(!a||a&&"reference"!==e.type)&&(t[Number(i)]=e,n&&(e.parentId=n.id))}else Array.isArray(i)?i.forEach((n=>{m(n)&&b(n,t,e)})):m(i)&&b(i,t,e)})),t}function p(e){const t={};return e.forEach((e=>{e.entryPoints.forEach((e=>{b(e.reflection,t)}))})),t}e.exports=function(e){let t=e.options,n=e.packages,o=function(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n={};for(var a in e)if({}.hasOwnProperty.call(e,a)){if(t.includes(a))continue;n[a]=e[a]}return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.includes(n)||{}.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}(e,a);const r=s.useMemo((()=>({options:t,reflections:p(n)})),[t,n]);return d.jsx(c.ApiDataContext.Provider,{value:r,children:d.jsx("div",{className:"apiPage",children:d.jsx(u.default,i({},o))})})}},1700:(e,t,n)=>{n.r(t)},5903:(e,t,n)=>{n.r(t)}}]);