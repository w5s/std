(()=>{"use strict";var e,a,f,t,r,c={},d={};function b(e){var a=d[e];if(void 0!==a)return a.exports;var f=d[e]={exports:{}};return c[e].call(f.exports,f,f.exports,b),f.exports}b.m=c,e=[],b.O=(a,f,t,r)=>{if(!f){var c=1/0;for(i=0;i<e.length;i++){f=e[i][0],t=e[i][1],r=e[i][2];for(var d=!0,o=0;o<f.length;o++)(!1&r||c>=r)&&Object.keys(b.O).every((e=>b.O[e](f[o])))?f.splice(o--,1):(d=!1,r<c&&(c=r));if(d){e.splice(i--,1);var n=t();void 0!==n&&(a=n)}}return a}r=r||0;for(var i=e.length;i>0&&e[i-1][2]>r;i--)e[i]=e[i-1];e[i]=[f,t,r]},b.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return b.d(a,{a:a}),a},f=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,b.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var r=Object.create(null);b.r(r);var c={};a=a||[null,f({}),f([]),f(f)];for(var d=2&t&&e;"object"==typeof d&&!~a.indexOf(d);d=f(d))Object.getOwnPropertyNames(d).forEach((a=>c[a]=()=>e[a]));return c.default=()=>e,b.d(r,c),r},b.d=(e,a)=>{for(var f in a)b.o(a,f)&&!b.o(e,f)&&Object.defineProperty(e,f,{enumerable:!0,get:a[f]})},b.f={},b.e=e=>Promise.all(Object.keys(b.f).reduce(((a,f)=>(b.f[f](e,a),a)),[])),b.u=e=>"assets/js/"+({21:"c498aaaa",53:"935f2afb",1002:"63405112",1142:"79134d0a",1367:"4bd46f6d",1398:"8789b923",1773:"515f625a",1914:"d9f32620",2213:"9a57734a",2245:"8f65731b",2267:"59362658",2535:"814f3328",2785:"be12ed6e",2873:"8388e6a6",3034:"316f32e4",3085:"1f391b9e",3089:"a6aa9e1f",3237:"1df93b7f",3350:"6b38aa70",3503:"362d6096",3608:"9e4087bc",3756:"175efc29",3792:"dff1c289",3859:"b4594516",4013:"01a85c17",4368:"a94703ab",4713:"768d6e11",4912:"cce9e44b",5453:"f840bdae",5587:"204a2771",5776:"b7ccf3c9",5984:"5f9a2a73",6026:"29d39535",6103:"ccc49370",6607:"91edd61e",6755:"e44a2883",7145:"905ce43c",7298:"41a60c87",7414:"393be207",7438:"49e627f6",7911:"f729375e",7918:"17896441",8518:"a7bd4aaa",8610:"6875c492",8636:"f4f34a3a",8732:"c519f80a",9179:"f6e30afb",9635:"0bf98805",9642:"7661071f",9661:"5e95c892",9817:"14eb3368",9962:"71cfe0fb"}[e]||e)+"."+{12:"081f80f1",21:"41f16e63",53:"329339c2",1002:"e2880a89",1142:"374778a2",1367:"a80fc4c1",1398:"f5c358e3",1773:"c47efc84",1914:"6cc84aec",2213:"8a758d07",2245:"5d7d5846",2267:"5d48ab6a",2535:"f4ed7964",2785:"7e80ef55",2873:"8a0b4279",3034:"d99bc743",3085:"f4af5d2f",3089:"54e04095",3237:"243509ac",3350:"b1c15741",3503:"b9eadf70",3608:"8da4b2e8",3756:"6011a2fa",3792:"8e5d20d3",3859:"2969ef3e",4013:"921673c3",4090:"3f5914c6",4368:"28d7936a",4713:"b87a3d8e",4912:"fa9522ed",5453:"35681726",5480:"4bf5d25b",5587:"4b08fcc5",5776:"8b796544",5984:"00bd5cde",6026:"49927570",6103:"5a587452",6209:"2a235a67",6607:"a4e06650",6755:"d4cfb6ae",7145:"19b593e0",7298:"bb71a919",7414:"4572ade0",7438:"d8404717",7911:"7aed870d",7918:"7bfa64af",8518:"dfea5dd5",8610:"5e6e466e",8636:"446e27ad",8732:"81c9daa3",9179:"64e2af11",9635:"62c754ba",9642:"dbdb3fba",9661:"35613f4d",9817:"9ac13e13",9962:"4361db32"}[e]+".js",b.miniCssF=e=>{},b.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),b.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),t={},r="@w5s/website:",b.l=(e,a,f,c)=>{if(t[e])t[e].push(a);else{var d,o;if(void 0!==f)for(var n=document.getElementsByTagName("script"),i=0;i<n.length;i++){var u=n[i];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==r+f){d=u;break}}d||(o=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,b.nc&&d.setAttribute("nonce",b.nc),d.setAttribute("data-webpack",r+f),d.src=e),t[e]=[a];var s=(a,f)=>{d.onerror=d.onload=null,clearTimeout(l);var r=t[e];if(delete t[e],d.parentNode&&d.parentNode.removeChild(d),r&&r.forEach((e=>e(f))),a)return a(f)},l=setTimeout(s.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=s.bind(null,d.onerror),d.onload=s.bind(null,d.onload),o&&document.head.appendChild(d)}},b.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},b.p="/std/fr/",b.gca=function(e){return e={17896441:"7918",59362658:"2267",63405112:"1002",c498aaaa:"21","935f2afb":"53","79134d0a":"1142","4bd46f6d":"1367","8789b923":"1398","515f625a":"1773",d9f32620:"1914","9a57734a":"2213","8f65731b":"2245","814f3328":"2535",be12ed6e:"2785","8388e6a6":"2873","316f32e4":"3034","1f391b9e":"3085",a6aa9e1f:"3089","1df93b7f":"3237","6b38aa70":"3350","362d6096":"3503","9e4087bc":"3608","175efc29":"3756",dff1c289:"3792",b4594516:"3859","01a85c17":"4013",a94703ab:"4368","768d6e11":"4713",cce9e44b:"4912",f840bdae:"5453","204a2771":"5587",b7ccf3c9:"5776","5f9a2a73":"5984","29d39535":"6026",ccc49370:"6103","91edd61e":"6607",e44a2883:"6755","905ce43c":"7145","41a60c87":"7298","393be207":"7414","49e627f6":"7438",f729375e:"7911",a7bd4aaa:"8518","6875c492":"8610",f4f34a3a:"8636",c519f80a:"8732",f6e30afb:"9179","0bf98805":"9635","7661071f":"9642","5e95c892":"9661","14eb3368":"9817","71cfe0fb":"9962"}[e]||e,b.p+b.u(e)},(()=>{var e={1303:0,532:0};b.f.j=(a,f)=>{var t=b.o(e,a)?e[a]:void 0;if(0!==t)if(t)f.push(t[2]);else if(/^(1303|532)$/.test(a))e[a]=0;else{var r=new Promise(((f,r)=>t=e[a]=[f,r]));f.push(t[2]=r);var c=b.p+b.u(a),d=new Error;b.l(c,(f=>{if(b.o(e,a)&&(0!==(t=e[a])&&(e[a]=void 0),t)){var r=f&&("load"===f.type?"missing":f.type),c=f&&f.target&&f.target.src;d.message="Loading chunk "+a+" failed.\n("+r+": "+c+")",d.name="ChunkLoadError",d.type=r,d.request=c,t[1](d)}}),"chunk-"+a,a)}},b.O.j=a=>0===e[a];var a=(a,f)=>{var t,r,c=f[0],d=f[1],o=f[2],n=0;if(c.some((a=>0!==e[a]))){for(t in d)b.o(d,t)&&(b.m[t]=d[t]);if(o)var i=o(b)}for(a&&a(f);n<c.length;n++)r=c[n],b.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return b.O(i)},f=self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[];f.forEach(a.bind(null,0)),f.push=a.bind(null,f.push.bind(f))})()})();