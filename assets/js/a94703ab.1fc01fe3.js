"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[9048],{2428:(e,t,n)=>{n.r(t),n.d(t,{default:()=>ue});var a=n(4041),o=n(4357),i=n(8582),s=n(7473),l=n(268),r=n(7186),c=n(9082),d=n(6585);const u={backToTopButton:"backToTopButton_z1FD",backToTopButtonShow:"backToTopButtonShow_w1wE"};var m=n(1085);function b(){const{shown:e,scrollToTop:t}=(0,d.H)({threshold:300});return(0,m.jsx)("button",{"aria-label":(0,c.T)({id:"theme.BackToTopButton.buttonAriaLabel",message:"Scroll back to top",description:"The ARIA label for the back to top button"}),className:(0,o.A)("clean-btn",s.G.common.backToTopButton,u.backToTopButton,e&&u.backToTopButtonShow),type:"button",onClick:t})}var h=n(2631),p=n(6090),x=n(1187),f=n(2520),j=n(1631);function v(e){return(0,m.jsx)("svg",{width:"20",height:"20","aria-hidden":"true",...e,children:(0,m.jsxs)("g",{fill:"#7a7a7a",children:[(0,m.jsx)("path",{d:"M9.992 10.023c0 .2-.062.399-.172.547l-4.996 7.492a.982.982 0 01-.828.454H1c-.55 0-1-.453-1-1 0-.2.059-.403.168-.551l4.629-6.942L.168 3.078A.939.939 0 010 2.528c0-.548.45-.997 1-.997h2.996c.352 0 .649.18.828.45L9.82 9.472c.11.148.172.347.172.55zm0 0"}),(0,m.jsx)("path",{d:"M19.98 10.023c0 .2-.058.399-.168.547l-4.996 7.492a.987.987 0 01-.828.454h-3c-.547 0-.996-.453-.996-1 0-.2.059-.403.168-.551l4.625-6.942-4.625-6.945a.939.939 0 01-.168-.55 1 1 0 01.996-.997h3c.348 0 .649.18.828.45l4.996 7.492c.11.148.168.347.168.55zm0 0"})]})})}const _={collapseSidebarButton:"collapseSidebarButton_Ftvb",collapseSidebarButtonIcon:"collapseSidebarButtonIcon_c4WT"};function g(e){let{onClick:t}=e;return(0,m.jsx)("button",{type:"button",title:(0,c.T)({id:"theme.docs.sidebar.collapseButtonTitle",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.collapseButtonAriaLabel",message:"Collapse sidebar",description:"The title attribute for collapse button of doc sidebar"}),className:(0,o.A)("button button--secondary button--outline",_.collapseSidebarButton),onClick:t,children:(0,m.jsx)(v,{className:_.collapseSidebarButtonIcon})})}var C=n(9303),A=n(1034),S=n(4579),k=n(1786),T=n(6476),N=n(4271),I=n(2436),B=n(213);function w(e){let{collapsed:t,categoryLabel:n,onClick:a}=e;return(0,m.jsx)("button",{"aria-label":t?(0,c.T)({id:"theme.DocSidebarItem.expandCategoryAriaLabel",message:"Expand sidebar category '{label}'",description:"The ARIA label to expand the sidebar category"},{label:n}):(0,c.T)({id:"theme.DocSidebarItem.collapseCategoryAriaLabel",message:"Collapse sidebar category '{label}'",description:"The ARIA label to collapse the sidebar category"},{label:n}),"aria-expanded":!t,type:"button",className:"clean-btn menu__caret",onClick:a})}function y(e){let{item:t,onItemClick:n,activePath:i,level:r,index:c,...d}=e;const{items:u,label:b,collapsible:h,className:p,href:x}=t,{docs:{sidebar:{autoCollapseCategories:j}}}=(0,f.p)(),v=function(e){const t=(0,B.A)();return(0,a.useMemo)((()=>e.href&&!e.linkUnlisted?e.href:!t&&e.collapsible?(0,l.Nr)(e):void 0),[e,t])}(t),_=(0,l.w8)(t,i),g=(0,N.ys)(x,i),{collapsed:C,setCollapsed:A}=(0,T.u)({initialState:()=>!!h&&(!_&&t.collapsed)}),{expandedItem:y,setExpandedItem:L}=(0,S.G)(),E=function(e){void 0===e&&(e=!C),L(e?null:c),A(e)};return function(e){let{isActive:t,collapsed:n,updateCollapsed:o}=e;const i=(0,k.ZC)(t);(0,a.useEffect)((()=>{t&&!i&&n&&o(!1)}),[t,i,n,o])}({isActive:_,collapsed:C,updateCollapsed:E}),(0,a.useEffect)((()=>{h&&null!=y&&y!==c&&j&&A(!0)}),[h,y,c,A,j]),(0,m.jsxs)("li",{className:(0,o.A)(s.G.docs.docSidebarItemCategory,s.G.docs.docSidebarItemCategoryLevel(r),"menu__list-item",{"menu__list-item--collapsed":C},p),children:[(0,m.jsxs)("div",{className:(0,o.A)("menu__list-item-collapsible",{"menu__list-item-collapsible--active":g}),children:[(0,m.jsx)(I.default,{className:(0,o.A)("menu__link",{"menu__link--sublist":h,"menu__link--sublist-caret":!x&&h,"menu__link--active":_}),onClick:h?e=>{n?.(t),x?E(!1):(e.preventDefault(),E())}:()=>{n?.(t)},"aria-current":g?"page":void 0,role:h&&!x?"button":void 0,"aria-expanded":h&&!x?!C:void 0,href:h?v??"#":v,...d,children:b}),x&&h&&(0,m.jsx)(w,{collapsed:C,categoryLabel:b,onClick:e=>{e.preventDefault(),E()}})]}),(0,m.jsx)(T.N,{lazy:!0,as:"ul",className:"menu__list",collapsed:C,children:(0,m.jsx)(D,{items:u,tabIndex:C?-1:0,onItemClick:n,activePath:i,level:r+1})})]})}var L=n(5436),E=n(2196);const H={menuExternalLink:"menuExternalLink_xK2O"};function M(e){let{item:t,onItemClick:n,activePath:a,level:i,index:r,...c}=e;const{href:d,label:u,className:b,autoAddBaseUrl:h}=t,p=(0,l.w8)(t,a),x=(0,L.A)(d);return(0,m.jsx)("li",{className:(0,o.A)(s.G.docs.docSidebarItemLink,s.G.docs.docSidebarItemLinkLevel(i),"menu__list-item",b),children:(0,m.jsxs)(I.default,{className:(0,o.A)("menu__link",!x&&H.menuExternalLink,{"menu__link--active":p}),autoAddBaseUrl:h,"aria-current":p?"page":void 0,to:d,...x&&{onClick:n?()=>n(t):void 0},...c,children:[u,!x&&(0,m.jsx)(E.A,{})]})},u)}const G={menuHtmlItem:"menuHtmlItem_anEq"};function R(e){let{item:t,level:n,index:a}=e;const{value:i,defaultStyle:l,className:r}=t;return(0,m.jsx)("li",{className:(0,o.A)(s.G.docs.docSidebarItemLink,s.G.docs.docSidebarItemLinkLevel(n),l&&[G.menuHtmlItem,"menu__list-item"],r),dangerouslySetInnerHTML:{__html:i}},a)}function W(e){let{item:t,...n}=e;switch(t.type){case"category":return(0,m.jsx)(y,{item:t,...n});case"html":return(0,m.jsx)(R,{item:t,...n});default:return(0,m.jsx)(M,{item:t,...n})}}function P(e){let{items:t,...n}=e;const a=(0,l.Y)(t,n.activePath);return(0,m.jsx)(S.A,{children:a.map(((e,t)=>(0,m.jsx)(W,{item:e,index:t,...n},t)))})}const D=(0,a.memo)(P),F={menu:"menu_qiME",menuWithAnnouncementBar:"menuWithAnnouncementBar_hRfJ"};function V(e){let{path:t,sidebar:n,className:i}=e;const l=function(){const{isActive:e}=(0,C.Mj)(),[t,n]=(0,a.useState)(e);return(0,A.Mq)((t=>{let{scrollY:a}=t;e&&n(0===a)}),[e]),e&&t}();return(0,m.jsx)("nav",{"aria-label":(0,c.T)({id:"theme.docs.sidebar.navAriaLabel",message:"Docs sidebar",description:"The ARIA label for the sidebar navigation"}),className:(0,o.A)("menu thin-scrollbar",F.menu,l&&F.menuWithAnnouncementBar,i),children:(0,m.jsx)("ul",{className:(0,o.A)(s.G.docs.docSidebarMenu,"menu__list"),children:(0,m.jsx)(D,{items:n,activePath:t,level:1})})})}const q="sidebar_vJCc",z="sidebarWithHideableNavbar_Fo4g",Y="sidebarHidden_vBKa",K="sidebarLogo_nlll";function U(e){let{path:t,sidebar:n,onCollapse:a,isHidden:i}=e;const{navbar:{hideOnScroll:s},docs:{sidebar:{hideable:l}}}=(0,f.p)();return(0,m.jsxs)("div",{className:(0,o.A)(q,s&&z,i&&Y),children:[s&&(0,m.jsx)(j.A,{tabIndex:-1,className:K}),(0,m.jsx)(V,{path:t,sidebar:n}),l&&(0,m.jsx)(g,{onClick:a})]})}const O=a.memo(U);var X=n(7226),J=n(5271);const Z=e=>{let{sidebar:t,path:n}=e;const a=(0,J.M)();return(0,m.jsx)("ul",{className:(0,o.A)(s.G.docs.docSidebarMenu,"menu__list"),children:(0,m.jsx)(D,{items:t,activePath:n,onItemClick:e=>{"category"===e.type&&e.href&&a.toggle(),"link"===e.type&&a.toggle()},level:1})})};function Q(e){return(0,m.jsx)(X.GX,{component:Z,props:e})}const $=a.memo(Q);function ee(e){const t=(0,x.l)(),n="desktop"===t||"ssr"===t,a="mobile"===t;return(0,m.jsxs)(m.Fragment,{children:[n&&(0,m.jsx)(O,{...e}),a&&(0,m.jsx)($,{...e})]})}const te={expandButton:"expandButton_SZY_",expandButtonIcon:"expandButtonIcon_CMLm"};function ne(e){let{toggleSidebar:t}=e;return(0,m.jsx)("div",{className:te.expandButton,title:(0,c.T)({id:"theme.docs.sidebar.expandButtonTitle",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),"aria-label":(0,c.T)({id:"theme.docs.sidebar.expandButtonAriaLabel",message:"Expand sidebar",description:"The ARIA label and title attribute for expand button of doc sidebar"}),tabIndex:0,role:"button",onKeyDown:t,onClick:t,children:(0,m.jsx)(v,{className:te.expandButtonIcon})})}const ae={docSidebarContainer:"docSidebarContainer_e5ai",docSidebarContainerHidden:"docSidebarContainerHidden_vqQo",sidebarViewport:"sidebarViewport_N8x0"};function oe(e){let{children:t}=e;const n=(0,r.t)();return(0,m.jsx)(a.Fragment,{children:t},n?.name??"noSidebar")}function ie(e){let{sidebar:t,hiddenSidebarContainer:n,setHiddenSidebarContainer:i}=e;const{pathname:l}=(0,p.zy)(),[r,c]=(0,a.useState)(!1),d=(0,a.useCallback)((()=>{r&&c(!1),!r&&(0,h.O)()&&c(!0),i((e=>!e))}),[i,r]);return(0,m.jsx)("aside",{className:(0,o.A)(s.G.docs.docSidebarContainer,ae.docSidebarContainer,n&&ae.docSidebarContainerHidden),onTransitionEnd:e=>{e.currentTarget.classList.contains(ae.docSidebarContainer)&&n&&c(!0)},children:(0,m.jsx)(oe,{children:(0,m.jsxs)("div",{className:(0,o.A)(ae.sidebarViewport,r&&ae.sidebarViewportHidden),children:[(0,m.jsx)(ee,{sidebar:t,path:l,onCollapse:d,isHidden:r}),r&&(0,m.jsx)(ne,{toggleSidebar:d})]})})})}const se={docMainContainer:"docMainContainer_namt",docMainContainerEnhanced:"docMainContainerEnhanced_sRjM",docItemWrapperEnhanced:"docItemWrapperEnhanced_TX_6"};function le(e){let{hiddenSidebarContainer:t,children:n}=e;const a=(0,r.t)();return(0,m.jsx)("main",{className:(0,o.A)(se.docMainContainer,(t||!a)&&se.docMainContainerEnhanced),children:(0,m.jsx)("div",{className:(0,o.A)("container padding-top--md padding-bottom--lg",se.docItemWrapper,t&&se.docItemWrapperEnhanced),children:n})})}const re={docRoot:"docRoot_HciC",docsWrapper:"docsWrapper_XLvK"};function ce(e){let{children:t}=e;const n=(0,r.t)(),[o,i]=(0,a.useState)(!1);return(0,m.jsxs)("div",{className:re.docsWrapper,children:[(0,m.jsx)(b,{}),(0,m.jsxs)("div",{className:re.docRoot,children:[n&&(0,m.jsx)(ie,{sidebar:n.items,hiddenSidebarContainer:o,setHiddenSidebarContainer:i}),(0,m.jsx)(le,{hiddenSidebarContainer:o,children:t})]})]})}var de=n(2757);function ue(e){const t=(0,l.B5)(e);if(!t)return(0,m.jsx)(de.A,{});const{docElement:n,sidebarName:a,sidebarItems:c}=t;return(0,m.jsx)(i.e3,{className:(0,o.A)(s.G.page.docsDocPage),children:(0,m.jsx)(r.V,{name:a,items:c,children:(0,m.jsx)(ce,{children:n})})})}},2757:(e,t,n)=>{n.d(t,{A:()=>l});n(4041);var a=n(4357),o=n(9082),i=n(4441),s=n(1085);function l(e){let{className:t}=e;return(0,s.jsx)("main",{className:(0,a.A)("container margin-vert--xl",t),children:(0,s.jsx)("div",{className:"row",children:(0,s.jsxs)("div",{className:"col col--6 col--offset-3",children:[(0,s.jsx)(i.default,{as:"h1",className:"hero__title",children:(0,s.jsx)(o.A,{id:"theme.NotFound.title",description:"The title of the 404 page",children:"Page Not Found"})}),(0,s.jsx)("p",{children:(0,s.jsx)(o.A,{id:"theme.NotFound.p1",description:"The first paragraph of the 404 page",children:"We could not find what you were looking for."})}),(0,s.jsx)("p",{children:(0,s.jsx)(o.A,{id:"theme.NotFound.p2",description:"The 2nd paragraph of the 404 page",children:"Please contact the owner of the site that linked you to the original URL and let them know their link is broken."})})]})})})}},4579:(e,t,n)=>{n.d(t,{A:()=>r,G:()=>c});var a=n(4041),o=n(1786),i=n(1085);const s=Symbol("EmptyContext"),l=a.createContext(s);function r(e){let{children:t}=e;const[n,o]=(0,a.useState)(null),s=(0,a.useMemo)((()=>({expandedItem:n,setExpandedItem:o})),[n]);return(0,i.jsx)(l.Provider,{value:s,children:t})}function c(){const e=(0,a.useContext)(l);if(e===s)throw new o.dV("DocSidebarItemsExpandedStateProvider");return e}},6585:(e,t,n)=>{n.d(t,{H:()=>s});var a=n(4041),o=n(1034),i=n(9404);function s(e){let{threshold:t}=e;const[n,s]=(0,a.useState)(!1),l=(0,a.useRef)(!1),{startScroll:r,cancelScroll:c}=(0,o.gk)();return(0,o.Mq)(((e,n)=>{let{scrollY:a}=e;const o=n?.scrollY;o&&(l.current?l.current=!1:a>=o?(c(),s(!1)):a<t?s(!1):a+window.innerHeight<document.documentElement.scrollHeight&&s(!0))})),(0,i.$)((e=>{e.location.hash&&(l.current=!0,s(!1))})),{shown:n,scrollToTop:()=>r(0)}}}}]);