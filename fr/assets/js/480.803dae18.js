"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[480],{5330:(e,t,a)=>{a.d(t,{Z:()=>x});a(2784);var s=a(489),n=a(8234),l=a(6086),r=a(2896),i=a(8004),o=a(6521);const c={sidebar:"sidebar_RYHo",sidebarItemTitle:"sidebarItemTitle_sRjx",sidebarItemList:"sidebarItemList_uMtB",sidebarItem:"sidebarItem_rygH",sidebarItemLink:"sidebarItemLink_EKgd",sidebarItemLinkActive:"sidebarItemLinkActive_hRXJ"};var m=a(2322);function d(e){let{sidebar:t}=e;const a=(0,o.c)(t.items);return(0,m.jsx)("aside",{className:"col col--3",children:(0,m.jsxs)("nav",{className:(0,s.Z)(c.sidebar,"thin-scrollbar"),"aria-label":(0,i.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"}),children:[(0,m.jsx)("div",{className:(0,s.Z)(c.sidebarItemTitle,"margin-bottom--md"),children:t.title}),(0,m.jsx)("ul",{className:(0,s.Z)(c.sidebarItemList,"clean-list"),children:a.map((e=>(0,m.jsx)("li",{className:c.sidebarItem,children:(0,m.jsx)(r.default,{isNavLink:!0,to:e.permalink,className:c.sidebarItemLink,activeClassName:c.sidebarItemLinkActive,children:e.title})},e.permalink)))})]})})}var u=a(3970);function h(e){let{sidebar:t}=e;const a=(0,o.c)(t.items);return(0,m.jsx)("ul",{className:"menu__list",children:a.map((e=>(0,m.jsx)("li",{className:"menu__list-item",children:(0,m.jsx)(r.default,{isNavLink:!0,to:e.permalink,className:"menu__link",activeClassName:"menu__link--active",children:e.title})},e.permalink)))})}function g(e){return(0,m.jsx)(u.Zo,{component:h,props:e})}function p(e){let{sidebar:t}=e;const a=(0,l.i)();return t?.items.length?"mobile"===a?(0,m.jsx)(g,{sidebar:t}):(0,m.jsx)(d,{sidebar:t}):null}function x(e){const{sidebar:t,toc:a,children:l,...r}=e,i=t&&t.items.length>0;return(0,m.jsx)(n.Z,{...r,children:(0,m.jsx)("div",{className:"container margin-vert--lg",children:(0,m.jsxs)("div",{className:"row",children:[(0,m.jsx)(p,{sidebar:t}),(0,m.jsx)("main",{className:(0,s.Z)("col",{"col--7":i,"col--9 col--offset-1":!i}),itemScope:!0,itemType:"https://schema.org/Blog",children:l}),a&&(0,m.jsx)("div",{className:"col col--2",children:a})]})})})}},1522:(e,t,a)=>{a.d(t,{Z:()=>M});a(2784);var s=a(489),n=a(1858),l=a(4198),r=a(2322);function i(e){let{children:t,className:a}=e;const{frontMatter:s,assets:i,metadata:{description:o}}=(0,n.C)(),{withBaseUrl:c}=(0,l.C)(),m=i.image??s.image,d=s.keywords??[];return(0,r.jsxs)("article",{className:a,itemProp:"blogPost",itemScope:!0,itemType:"https://schema.org/BlogPosting",children:[o&&(0,r.jsx)("meta",{itemProp:"description",content:o}),m&&(0,r.jsx)("link",{itemProp:"image",href:c(m,{absolute:!0})}),d.length>0&&(0,r.jsx)("meta",{itemProp:"keywords",content:d.join(",")}),t]})}var o=a(2896);const c={title:"title_cIQJ"};function m(e){let{className:t}=e;const{metadata:a,isBlogPostPage:l}=(0,n.C)(),{permalink:i,title:m}=a,d=l?"h1":"h2";return(0,r.jsx)(d,{className:(0,s.Z)(c.title,t),itemProp:"headline",children:l?m:(0,r.jsx)(o.default,{itemProp:"url",to:i,children:m})})}var d=a(8004),u=a(2384);const h={container:"container_PuMg"};function g(e){let{readingTime:t}=e;const a=function(){const{selectMessage:e}=(0,u.c)();return t=>{const a=Math.ceil(t);return e(a,(0,d.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:a}))}}();return(0,r.jsx)(r.Fragment,{children:a(t)})}function p(e){let{date:t,formattedDate:a}=e;return(0,r.jsx)("time",{dateTime:t,itemProp:"datePublished",children:a})}function x(){return(0,r.jsx)(r.Fragment,{children:" \xb7 "})}function j(e){let{className:t}=e;const{metadata:a}=(0,n.C)(),{date:l,formattedDate:i,readingTime:o}=a;return(0,r.jsxs)("div",{className:(0,s.Z)(h.container,"margin-vert--md",t),children:[(0,r.jsx)(p,{date:l,formattedDate:i}),void 0!==o&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(x,{}),(0,r.jsx)(g,{readingTime:o})]})]})}function f(e){return e.href?(0,r.jsx)(o.default,{...e}):(0,r.jsx)(r.Fragment,{children:e.children})}function b(e){let{author:t,className:a}=e;const{name:n,title:l,url:i,imageURL:o,email:c}=t,m=i||c&&`mailto:${c}`||void 0;return(0,r.jsxs)("div",{className:(0,s.Z)("avatar margin-bottom--sm",a),children:[o&&(0,r.jsx)(f,{href:m,className:"avatar__photo-link",children:(0,r.jsx)("img",{className:"avatar__photo",src:o,alt:n,itemProp:"image"})}),n&&(0,r.jsxs)("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person",children:[(0,r.jsx)("div",{className:"avatar__name",children:(0,r.jsx)(f,{href:m,itemProp:"url",children:(0,r.jsx)("span",{itemProp:"name",children:n})})}),l&&(0,r.jsx)("small",{className:"avatar__subtitle",itemProp:"description",children:l})]})]})}const v={authorCol:"authorCol_q_iI",imageOnlyAuthorRow:"imageOnlyAuthorRow_les7",imageOnlyAuthorCol:"imageOnlyAuthorCol_uMKf"};function _(e){let{className:t}=e;const{metadata:{authors:a},assets:l}=(0,n.C)();if(0===a.length)return null;const i=a.every((e=>{let{name:t}=e;return!t}));return(0,r.jsx)("div",{className:(0,s.Z)("margin-top--md margin-bottom--sm",i?v.imageOnlyAuthorRow:"row",t),children:a.map(((e,t)=>(0,r.jsx)("div",{className:(0,s.Z)(!i&&"col col--6",i?v.imageOnlyAuthorCol:v.authorCol),children:(0,r.jsx)(b,{author:{...e,imageURL:l.authorsImageUrls[t]??e.imageURL}})},t)))})}function N(){return(0,r.jsxs)("header",{children:[(0,r.jsx)(m,{}),(0,r.jsx)(j,{}),(0,r.jsx)(_,{})]})}var P=a(6744),k=a(1809);function Z(e){let{children:t,className:a}=e;const{isBlogPostPage:l}=(0,n.C)();return(0,r.jsx)("div",{id:l?P.blogPostContainerID:void 0,className:(0,s.Z)("markdown",a),itemProp:"articleBody",children:(0,r.jsx)(k.default,{children:t})})}var C=a(8869),w=a(7721);function I(){return(0,r.jsx)("b",{children:(0,r.jsx)(d.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts",children:"Read More"})})}function T(e){const{blogPostTitle:t,...a}=e;return(0,r.jsx)(o.default,{"aria-label":(0,d.I)({message:"Read more about {title}",id:"theme.blog.post.readMoreLabel",description:"The ARIA label for the link to full blog posts from excerpts"},{title:t}),...a,children:(0,r.jsx)(I,{})})}const L={blogPostFooterDetailsFull:"blogPostFooterDetailsFull_bikM"};function F(){const{metadata:e,isBlogPostPage:t}=(0,n.C)(),{tags:a,title:l,editUrl:i,hasTruncateMarker:o}=e,c=!t&&o,m=a.length>0;return m||c||i?(0,r.jsxs)("footer",{className:(0,s.Z)("row docusaurus-mt-lg",t&&L.blogPostFooterDetailsFull),children:[m&&(0,r.jsx)("div",{className:(0,s.Z)("col",{"col--9":c}),children:(0,r.jsx)(w.Z,{tags:a})}),t&&i&&(0,r.jsx)("div",{className:"col margin-top--sm",children:(0,r.jsx)(C.Z,{editUrl:i})}),c&&(0,r.jsx)("div",{className:(0,s.Z)("col text--right",{"col--3":m}),children:(0,r.jsx)(T,{blogPostTitle:l,to:e.permalink})})]}):null}function M(e){let{children:t,className:a}=e;const l=function(){const{isBlogPostPage:e}=(0,n.C)();return e?void 0:"margin-bottom--xl"}();return(0,r.jsxs)(i,{className:(0,s.Z)(l,a),children:[(0,r.jsx)(N,{}),(0,r.jsx)(Z,{children:t}),(0,r.jsx)(F,{})]})}},8869:(e,t,a)=>{a.d(t,{Z:()=>m});a(2784);var s=a(8004),n=a(5138),l=a(2896),r=a(489);const i={iconEdit:"iconEdit_UohW"};var o=a(2322);function c(e){let{className:t,...a}=e;return(0,o.jsx)("svg",{fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,r.Z)(i.iconEdit,t),"aria-hidden":"true",...a,children:(0,o.jsx)("g",{children:(0,o.jsx)("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})})})}function m(e){let{editUrl:t}=e;return(0,o.jsxs)(l.default,{to:t,className:n.k.common.editThisPage,children:[(0,o.jsx)(c,{}),(0,o.jsx)(s.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page",children:"Edit this page"})]})}},2030:(e,t,a)=>{a.d(t,{Z:()=>r});a(2784);var s=a(489),n=a(2896),l=a(2322);function r(e){const{permalink:t,title:a,subLabel:r,isNext:i}=e;return(0,l.jsxs)(n.default,{className:(0,s.Z)("pagination-nav__link",i?"pagination-nav__link--next":"pagination-nav__link--prev"),to:t,children:[r&&(0,l.jsx)("div",{className:"pagination-nav__sublabel",children:r}),(0,l.jsx)("div",{className:"pagination-nav__label",children:a})]})}},5561:(e,t,a)=>{a.d(t,{Z:()=>i});a(2784);var s=a(489),n=a(2896);const l={tag:"tag_qE9H",tagRegular:"tagRegular_aHXt",tagWithCount:"tagWithCount_UC8q"};var r=a(2322);function i(e){let{permalink:t,label:a,count:i}=e;return(0,r.jsxs)(n.default,{href:t,className:(0,s.Z)(l.tag,i?l.tagWithCount:l.tagRegular),children:[a,i&&(0,r.jsx)("span",{children:i})]})}},7721:(e,t,a)=>{a.d(t,{Z:()=>o});a(2784);var s=a(489),n=a(8004),l=a(5561);const r={tags:"tags_q74f",tag:"tag_lSC7"};var i=a(2322);function o(e){let{tags:t}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("b",{children:(0,i.jsx)(n.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list",children:"Tags:"})}),(0,i.jsx)("ul",{className:(0,s.Z)(r.tags,"padding--none","margin-left--sm"),children:t.map((e=>{let{label:t,permalink:a}=e;return(0,i.jsx)("li",{className:r.tag,children:(0,i.jsx)(l.Z,{label:t,permalink:a})},a)}))})]})}},1858:(e,t,a)=>{a.d(t,{C:()=>o,n:()=>i});var s=a(2784),n=a(1661),l=a(2322);const r=s.createContext(null);function i(e){let{children:t,content:a,isBlogPostPage:n=!1}=e;const i=function(e){let{content:t,isBlogPostPage:a}=e;return(0,s.useMemo)((()=>({metadata:t.metadata,frontMatter:t.frontMatter,assets:t.assets,toc:t.toc,isBlogPostPage:a})),[t,a])}({content:a,isBlogPostPage:n});return(0,l.jsx)(r.Provider,{value:i,children:t})}function o(){const e=(0,s.useContext)(r);if(null===e)throw new n.i6("BlogPostProvider");return e}},6521:(e,t,a)=>{a.d(t,{c:()=>r});var s=a(2784),n=a(7267),l=a(9846);function r(e){const{pathname:t}=(0,n.TH)();return(0,s.useMemo)((()=>e.filter((e=>function(e,t){return!(e.unlisted&&!(0,l.Mg)(e.permalink,t))}(e,t)))),[e,t])}},2384:(e,t,a)=>{a.d(t,{c:()=>c});var s=a(2784),n=a(5837);const l=["zero","one","two","few","many","other"];function r(e){return l.filter((t=>e.includes(t)))}const i={locale:"en",pluralForms:r(["one","other"]),select:e=>1===e?"one":"other"};function o(){const{i18n:{currentLocale:e}}=(0,n.default)();return(0,s.useMemo)((()=>{try{return function(e){const t=new Intl.PluralRules(e);return{locale:e,pluralForms:r(t.resolvedOptions().pluralCategories),select:e=>t.select(e)}}(e)}catch(t){return console.error(`Failed to use Intl.PluralRules for locale "${e}".\nDocusaurus will fallback to the default (English) implementation.\nError: ${t.message}\n`),i}}),[e])}function c(){const e=o();return{selectMessage:(t,a)=>function(e,t,a){const s=e.split("|");if(1===s.length)return s[0];s.length>a.pluralForms.length&&console.error(`For locale=${a.locale}, a maximum of ${a.pluralForms.length} plural forms are expected (${a.pluralForms.join(",")}), but the message contains ${s.length}: ${e}`);const n=a.select(t),l=a.pluralForms.indexOf(n);return s[Math.min(l,s.length-1)]}(a,t,e)}}}}]);