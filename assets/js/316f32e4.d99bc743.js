(self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[]).push([[3034],{6835:(e,t,s)=>{"use strict";s.d(t,{F:()=>l});var r=s(2784),n=s(6335);const a={attributes:!0,characterData:!0,childList:!0,subtree:!0};function c(e,t){const[s,c]=(0,r.useState)(),l=(0,r.useCallback)((()=>{c(e.current?.closest("[role=tabpanel][hidden]"))}),[e,c]);(0,r.useEffect)((()=>{l()}),[l]),function(e,t,s){void 0===s&&(s=a);const c=(0,n.zX)(t),l=(0,n.Ql)(s);(0,r.useEffect)((()=>{const t=new MutationObserver(c);return e&&t.observe(e,l),()=>t.disconnect()}),[e,c,l])}(s,(e=>{e.forEach((e=>{"attributes"===e.type&&"hidden"===e.attributeName&&(t(),l())}))}),{attributes:!0,characterData:!1,childList:!1,subtree:!1})}function l(){const[e,t]=(0,r.useState)(!1),[s,n]=(0,r.useState)(!1),a=(0,r.useRef)(null),l=(0,r.useCallback)((()=>{const s=a.current.querySelector("code");e?s.removeAttribute("style"):(s.style.whiteSpace="pre-wrap",s.style.overflowWrap="anywhere"),t((e=>!e))}),[a,e]),i=(0,r.useCallback)((()=>{const{scrollWidth:e,clientWidth:t}=a.current,s=e>t||a.current.querySelector("code").hasAttribute("style");n(s)}),[a]);return c(a,i),(0,r.useEffect)((()=>{i()}),[e,i]),(0,r.useEffect)((()=>(window.addEventListener("resize",i,{passive:!0}),()=>{window.removeEventListener("resize",i)})),[i]),{codeBlockRef:a,isEnabled:e,isCodeScrollable:s,toggle:l}}},822:(e,t,s)=>{"use strict";s.d(t,{p:()=>a});var r=s(361),n=s(7683);function a(){const{prism:e}=(0,n.L)(),{colorMode:t}=(0,r.I)(),s=e.theme,a=e.darkTheme||s;return"dark"===t?a:s}},1849:(e,t,s)=>{"use strict";s.d(t,{X:()=>a});var r=s(2784),n=s(2322);function a(e){const{mdxAdmonitionTitle:t,rest:s}=function(e){const t=r.Children.toArray(e),s=t.find((e=>r.isValidElement(e)&&"mdxAdmonitionTitle"===e.type)),a=t.filter((e=>e!==s)),c=s?.props.children;return{mdxAdmonitionTitle:c,rest:a.length>0?(0,n.jsx)(n.Fragment,{children:a}):null}}(e.children),a=e.title??t;return{...e,...a&&{title:a},children:s}}},335:(e,t,s)=>{"use strict";s.d(t,{QC:()=>f,Vo:()=>h,bc:()=>d,nZ:()=>p,nt:()=>m});var r=s(4501),n=s.n(r);const a=/title=(?<quote>["'])(?<title>.*?)\1/,c=/\{(?<range>[\d,-]+)\}/,l={js:{start:"\\/\\/",end:""},jsBlock:{start:"\\/\\*",end:"\\*\\/"},jsx:{start:"\\{\\s*\\/\\*",end:"\\*\\/\\s*\\}"},bash:{start:"#",end:""},html:{start:"\x3c!--",end:"--\x3e"}},i={...l,lua:{start:"--",end:""},wasm:{start:"\\;\\;",end:""},tex:{start:"%",end:""},vb:{start:"['\u2018\u2019]",end:""},rem:{start:"[Rr][Ee][Mm]\\b",end:""},f90:{start:"!",end:""},ml:{start:"\\(\\*",end:"\\*\\)"},cobol:{start:"\\*>",end:""}},o=Object.keys(l);function u(e,t){const s=e.map((e=>{const{start:s,end:r}=i[e];return`(?:${s}\\s*(${t.flatMap((e=>[e.line,e.block?.start,e.block?.end].filter(Boolean))).join("|")})\\s*${r})`})).join("|");return new RegExp(`^\\s*(?:${s})\\s*$`)}function d(e){return e?.match(a)?.groups.title??""}function m(e){return Boolean(e?.includes("showLineNumbers"))}function h(e){const t=e.split(" ").find((e=>e.startsWith("language-")));return t?.replace(/language-/,"")}function p(e,t){let s=e.replace(/\n$/,"");const{language:r,magicComments:a,metastring:l}=t;if(l&&c.test(l)){const e=l.match(c).groups.range;if(0===a.length)throw new Error(`A highlight range has been given in code block's metastring (\`\`\` ${l}), but no magic comment config is available. Docusaurus applies the first magic comment entry's className for metastring ranges.`);const t=a[0].className,r=n()(e).filter((e=>e>0)).map((e=>[e-1,[t]]));return{lineClassNames:Object.fromEntries(r),code:s}}if(void 0===r)return{lineClassNames:{},code:s};const i=function(e,t){switch(e){case"js":case"javascript":case"ts":case"typescript":return u(["js","jsBlock"],t);case"jsx":case"tsx":return u(["js","jsBlock","jsx"],t);case"html":return u(["js","jsBlock","html"],t);case"python":case"py":case"bash":return u(["bash"],t);case"markdown":case"md":return u(["html","jsx","bash"],t);case"tex":case"latex":case"matlab":return u(["tex"],t);case"lua":case"haskell":case"sql":return u(["lua"],t);case"wasm":return u(["wasm"],t);case"vb":case"vbnet":case"vba":case"visual-basic":return u(["vb","rem"],t);case"batch":return u(["rem"],t);case"basic":return u(["rem","f90"],t);case"fsharp":return u(["js","ml"],t);case"ocaml":case"sml":return u(["ml"],t);case"fortran":return u(["f90"],t);case"cobol":return u(["cobol"],t);default:return u(o,t)}}(r,a),d=s.split("\n"),m=Object.fromEntries(a.map((e=>[e.className,{start:0,range:""}]))),h=Object.fromEntries(a.filter((e=>e.line)).map((e=>{let{className:t,line:s}=e;return[s,t]}))),p=Object.fromEntries(a.filter((e=>e.block)).map((e=>{let{className:t,block:s}=e;return[s.start,t]}))),f=Object.fromEntries(a.filter((e=>e.block)).map((e=>{let{className:t,block:s}=e;return[s.end,t]})));for(let n=0;n<d.length;){const e=d[n].match(i);if(!e){n+=1;continue}const t=e.slice(1).find((e=>void 0!==e));h[t]?m[h[t]].range+=`${n},`:p[t]?m[p[t]].start=n:f[t]&&(m[f[t]].range+=`${m[f[t]].start}-${n-1},`),d.splice(n,1)}s=d.join("\n");const b={};return Object.entries(m).forEach((e=>{let[t,{range:s}]=e;n()(s).forEach((e=>{b[e]??=[],b[e].push(t)}))})),{lineClassNames:b,code:s}}function f(e){const t={color:"--prism-color",backgroundColor:"--prism-background-color"},s={};return Object.entries(e.plain).forEach((e=>{let[r,n]=e;const a=t[r];a&&"string"==typeof n&&(s[a]=n)})),s}},9120:(e,t,s)=>{"use strict";const r=s(2784),n=s(7718),a=s(8029),c=s(973),l=s(3851),i=s(5873),o=s(1004),u=s(1949),d=s(2322),m=e=>e&&e.__esModule?e:{default:e},h=m(n),p=m(l);function f(e,t,s){if(!e.match(/api\/([\d.]+)/)&&!e.includes("api/next")&&s&&s.name!==t.version){const t="current"===s.name?"next":s.name;return e.endsWith("/api")?`${e}/${t}`:e.replace("/api/",`/api/${t}/`)}return e}e.exports=function(e){let{options:t,packages:s,history:n}=e;const l=c.useDocsVersion(),m=a.useDocsPreferredVersion(l.pluginId).preferredVersion;return r.useEffect((()=>{1===s.length?n.replace(f(s[0].entryPoints[0].reflection.permalink,l,m)):m&&n.replace(f(n.location.pathname,l,m))}),[s,n,l,m]),d.jsx("div",{className:"row",children:d.jsxs("div",{className:"col apiItemCol",children:[t.banner&&d.jsx("div",{className:"alert alert--info margin-bottom--md",role:"alert",children:d.jsx("div",{dangerouslySetInnerHTML:{__html:t.banner}})}),d.jsx(u.VersionBanner,{}),d.jsx("div",{className:"apiItemContainer",children:d.jsxs("article",{children:[d.jsxs("div",{className:"markdown",children:[d.jsx("header",{children:d.jsx(p.default,{as:"h1",children:"API"})}),d.jsxs("section",{className:"tsd-panel",children:[d.jsx("h3",{className:"tsd-panel-header",children:"Packages"}),d.jsx("div",{className:"tsd-panel-content",children:d.jsx("ul",{className:"tsd-index-list",children:s.map((e=>d.jsx("li",{className:"tsd-truncate",children:d.jsxs(h.default,{className:"tsd-kind-icon",to:e.entryPoints[0].reflection.permalink,children:[d.jsxs("span",{className:"tsd-signature-symbol",children:["v",e.packageVersion]})," ",d.jsx("span",{children:i.removeScopes(e.packageName,t.scopes)})]})},e.packageName)))})})]})]}),d.jsx(o.Footer,{})]})})]})})}},5873:(e,t)=>{"use strict";t.removeScopes=function(e,t){return 0===t.length?e:t.reduce(((e,t)=>e.replace(new RegExp(`^(${t}-|@${t}/)`),"")),e)}},4501:(e,t)=>{function s(e){let t,s=[];for(let r of e.split(",").map((e=>e.trim())))if(/^-?\d+$/.test(r))s.push(parseInt(r,10));else if(t=r.match(/^(-?\d+)(-|\.\.\.?|\u2025|\u2026|\u22EF)(-?\d+)$/)){let[e,r,n,a]=t;if(r&&a){r=parseInt(r),a=parseInt(a);const e=r<a?1:-1;"-"!==n&&".."!==n&&"\u2025"!==n||(a+=e);for(let t=r;t!==a;t+=e)s.push(t)}}return s}t.default=s,e.exports=s}}]);