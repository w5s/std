(()=>{"use strict";var e,a,f,t,r,c={},b={};function d(e){var a=b[e];if(void 0!==a)return a.exports;var f=b[e]={exports:{}};return c[e].call(f.exports,f,f.exports,d),f.exports}d.m=c,e=[],d.O=(a,f,t,r)=>{if(!f){var c=1/0;for(i=0;i<e.length;i++){f=e[i][0],t=e[i][1],r=e[i][2];for(var b=!0,o=0;o<f.length;o++)(!1&r||c>=r)&&Object.keys(d.O).every((e=>d.O[e](f[o])))?f.splice(o--,1):(b=!1,r<c&&(c=r));if(b){e.splice(i--,1);var n=t();void 0!==n&&(a=n)}}return a}r=r||0;for(var i=e.length;i>0&&e[i-1][2]>r;i--)e[i]=e[i-1];e[i]=[f,t,r]},d.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return d.d(a,{a:a}),a},f=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,d.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var r=Object.create(null);d.r(r);var c={};a=a||[null,f({}),f([]),f(f)];for(var b=2&t&&e;"object"==typeof b&&!~a.indexOf(b);b=f(b))Object.getOwnPropertyNames(b).forEach((a=>c[a]=()=>e[a]));return c.default=()=>e,d.d(r,c),r},d.d=(e,a)=>{for(var f in a)d.o(a,f)&&!d.o(e,f)&&Object.defineProperty(e,f,{enumerable:!0,get:a[f]})},d.f={},d.e=e=>Promise.all(Object.keys(d.f).reduce(((a,f)=>(d.f[f](e,a),a)),[])),d.u=e=>"assets/js/"+({3:"d89bacef",378:"c519f80a",516:"8388e6a6",991:"41a60c87",1110:"49e627f6",1118:"7661071f",1724:"dff1c289",1903:"8789b923",1952:"66bcb4ce",2711:"9e4087bc",3249:"ccc49370",3430:"cce9e44b",3637:"f4f34a3a",3730:"515f625a",3883:"4bd46f6d",4059:"175efc29",4082:"9a57734a",4134:"393be207",4583:"1df93b7f",4736:"e44a2883",4766:"91edd61e",4813:"6875c492",5293:"6b38aa70",5421:"f729375e",5507:"b4594516",5557:"d9f32620",5637:"905ce43c",6047:"71cfe0fb",6061:"1f391b9e",6089:"29d39535",6133:"b7ccf3c9",6229:"f840bdae",6370:"f6e30afb",6753:"be12ed6e",6969:"14eb3368",7098:"a7bd4aaa",7472:"814f3328",7553:"768d6e11",7559:"316f32e4",7643:"a6aa9e1f",8209:"01a85c17",8213:"63405112",8327:"0bf98805",8366:"79134d0a",8401:"17896441",8581:"935f2afb",8689:"8f65731b",8737:"362d6096",9048:"a94703ab",9325:"59362658",9421:"c498aaaa",9581:"5f9a2a73",9647:"5e95c892",9925:"204a2771"}[e]||e)+"."+{3:"9298d76c",378:"3aa2cf40",516:"a00f291b",991:"4354c69b",1110:"a4f32f43",1118:"013e8d5c",1724:"d6afe79f",1903:"795bfd43",1952:"d2686f4a",2711:"e894771d",3249:"54071ac3",3430:"5bf6d507",3480:"7a9d1365",3637:"a13f16d0",3730:"e923ea15",3883:"12fc55ca",4059:"9243cbf5",4082:"7f020c97",4134:"0d5a79f1",4583:"a4ad673e",4736:"aac458b3",4766:"1222689e",4813:"1d1eae65",5293:"d0a4f018",5421:"dd355c86",5507:"3cbfd27e",5557:"479d3c15",5637:"f5c01872",5723:"78d05223",6047:"cac9a725",6061:"3c7722c4",6089:"c9b0b81e",6133:"c726e31b",6229:"6197ab4f",6370:"db886f3a",6753:"5039f1f7",6969:"3d7d1f03",7098:"b2d387ff",7472:"a3d5b596",7553:"3e142c13",7559:"db228f00",7643:"8e5e74e0",7915:"b50432e7",8209:"053525f1",8213:"25157de1",8327:"841dca01",8366:"32a2aadc",8401:"4bf7f52b",8581:"2f07d8a3",8689:"c9618c42",8737:"8fe66983",9048:"ca9f2f2a",9325:"d42817df",9421:"1d0d4f6e",9581:"02c95560",9647:"c1d6d55d",9925:"4287e38b",9972:"fa1939b4"}[e]+".js",d.miniCssF=e=>{},d.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),d.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),t={},r="@w5s/website:",d.l=(e,a,f,c)=>{if(t[e])t[e].push(a);else{var b,o;if(void 0!==f)for(var n=document.getElementsByTagName("script"),i=0;i<n.length;i++){var u=n[i];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==r+f){b=u;break}}b||(o=!0,(b=document.createElement("script")).charset="utf-8",b.timeout=120,d.nc&&b.setAttribute("nonce",d.nc),b.setAttribute("data-webpack",r+f),b.src=e),t[e]=[a];var s=(a,f)=>{b.onerror=b.onload=null,clearTimeout(l);var r=t[e];if(delete t[e],b.parentNode&&b.parentNode.removeChild(b),r&&r.forEach((e=>e(f))),a)return a(f)},l=setTimeout(s.bind(null,void 0,{type:"timeout",target:b}),12e4);b.onerror=s.bind(null,b.onerror),b.onload=s.bind(null,b.onload),o&&document.head.appendChild(b)}},d.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.p="/std/fr/",d.gca=function(e){return e={17896441:"8401",59362658:"9325",63405112:"8213",d89bacef:"3",c519f80a:"378","8388e6a6":"516","41a60c87":"991","49e627f6":"1110","7661071f":"1118",dff1c289:"1724","8789b923":"1903","66bcb4ce":"1952","9e4087bc":"2711",ccc49370:"3249",cce9e44b:"3430",f4f34a3a:"3637","515f625a":"3730","4bd46f6d":"3883","175efc29":"4059","9a57734a":"4082","393be207":"4134","1df93b7f":"4583",e44a2883:"4736","91edd61e":"4766","6875c492":"4813","6b38aa70":"5293",f729375e:"5421",b4594516:"5507",d9f32620:"5557","905ce43c":"5637","71cfe0fb":"6047","1f391b9e":"6061","29d39535":"6089",b7ccf3c9:"6133",f840bdae:"6229",f6e30afb:"6370",be12ed6e:"6753","14eb3368":"6969",a7bd4aaa:"7098","814f3328":"7472","768d6e11":"7553","316f32e4":"7559",a6aa9e1f:"7643","01a85c17":"8209","0bf98805":"8327","79134d0a":"8366","935f2afb":"8581","8f65731b":"8689","362d6096":"8737",a94703ab:"9048",c498aaaa:"9421","5f9a2a73":"9581","5e95c892":"9647","204a2771":"9925"}[e]||e,d.p+d.u(e)},(()=>{var e={5354:0,1869:0};d.f.j=(a,f)=>{var t=d.o(e,a)?e[a]:void 0;if(0!==t)if(t)f.push(t[2]);else if(/^(1869|5354)$/.test(a))e[a]=0;else{var r=new Promise(((f,r)=>t=e[a]=[f,r]));f.push(t[2]=r);var c=d.p+d.u(a),b=new Error;d.l(c,(f=>{if(d.o(e,a)&&(0!==(t=e[a])&&(e[a]=void 0),t)){var r=f&&("load"===f.type?"missing":f.type),c=f&&f.target&&f.target.src;b.message="Loading chunk "+a+" failed.\n("+r+": "+c+")",b.name="ChunkLoadError",b.type=r,b.request=c,t[1](b)}}),"chunk-"+a,a)}},d.O.j=a=>0===e[a];var a=(a,f)=>{var t,r,c=f[0],b=f[1],o=f[2],n=0;if(c.some((a=>0!==e[a]))){for(t in b)d.o(b,t)&&(d.m[t]=b[t]);if(o)var i=o(d)}for(a&&a(f);n<c.length;n++)r=c[n],d.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return d.O(i)},f=self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[];f.forEach(a.bind(null,0)),f.push=a.bind(null,f.push.bind(f))})()})();