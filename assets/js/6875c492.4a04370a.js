"use strict";(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[4813],{627:(e,t,n)=>{n.d(t,{A:()=>c});n(4041);var s=n(4357),i=n(2883),a=n(6558),r=n(2663),l=n(1085);function o(e){let{className:t}=e;return(0,l.jsx)(r.A,{type:"caution",title:(0,l.jsx)(i.Rc,{}),className:(0,s.A)(t,a.G.common.unlistedBanner),children:(0,l.jsx)(i.Uh,{})})}function c(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.AE,{}),(0,l.jsx)(o,{...e})]})}},2774:(e,t,n)=>{n.r(t),n.d(t,{default:()=>x});n(4041);var s=n(4357),i=n(5141),a=n(7868),r=n(6558),l=n(6068),o=n(6279),c=n(5315),d=n(3806),u=n(4450),h=n(1203),g=n(627),p=n(4661),m=n(1085);function b(e){let{tag:t}=e;const n=(0,l.ZD)(t);return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(a.be,{title:n,description:t.description}),(0,m.jsx)(u.A,{tag:"blog_tags_posts"})]})}function f(e){let{tag:t,items:n,sidebar:s,listMetadata:a}=e;const r=(0,l.ZD)(t);return(0,m.jsxs)(c.A,{sidebar:s,children:[t.unlisted&&(0,m.jsx)(g.A,{}),(0,m.jsxs)("header",{className:"margin-bottom--xl",children:[(0,m.jsx)(p.default,{as:"h1",children:r}),t.description&&(0,m.jsx)("p",{children:t.description}),(0,m.jsx)(o.default,{href:t.allTagsPath,children:(0,m.jsx)(i.A,{id:"theme.tags.tagsPageLink",description:"The label of the link targeting the tag list page",children:"View All Tags"})})]}),(0,m.jsx)(h.A,{items:n}),(0,m.jsx)(d.A,{metadata:a})]})}function x(e){return(0,m.jsxs)(a.e3,{className:(0,s.A)(r.G.wrapper.blogPages,r.G.page.blogTagPostListPage),children:[(0,m.jsx)(b,{...e}),(0,m.jsx)(f,{...e})]})}},2883:(e,t,n)=>{n.d(t,{AE:()=>o,Rc:()=>r,TT:()=>d,Uh:()=>l,Yh:()=>c});n(4041);var s=n(5141),i=n(2221),a=n(1085);function r(){return(0,a.jsx)(s.A,{id:"theme.contentVisibility.unlistedBanner.title",description:"The unlisted content banner title",children:"Unlisted page"})}function l(){return(0,a.jsx)(s.A,{id:"theme.contentVisibility.unlistedBanner.message",description:"The unlisted content banner message",children:"This page is unlisted. Search engines will not index it, and only users having a direct link can access it."})}function o(){return(0,a.jsx)(i.A,{children:(0,a.jsx)("meta",{name:"robots",content:"noindex, nofollow"})})}function c(){return(0,a.jsx)(s.A,{id:"theme.contentVisibility.draftBanner.title",description:"The draft content banner title",children:"Draft page"})}function d(){return(0,a.jsx)(s.A,{id:"theme.contentVisibility.draftBanner.message",description:"The draft content banner message",children:"This page is a draft. It will only be visible in dev and be excluded from the production build."})}},6068:(e,t,n)=>{n.d(t,{ZD:()=>r,uz:()=>l});n(4041);var s=n(5141),i=n(1240);n(1085);function a(){const{selectMessage:e}=(0,i.W)();return t=>e(t,(0,s.T)({id:"theme.blog.post.plurals",description:'Pluralized label for "{count} posts". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One post|{count} posts"},{count:t}))}function r(e){const t=a();return(0,s.T)({id:"theme.blog.tagTitle",description:"The title of the page for a blog tag",message:'{nPosts} tagged with "{tagName}"'},{nPosts:t(e.count),tagName:e.label})}const l=()=>(0,s.T)({id:"theme.blog.authorsList.pageTitle",message:"Authors",description:"The title of the authors page"})}}]);