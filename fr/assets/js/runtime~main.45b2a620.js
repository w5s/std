(()=>{"use strict";var e,a,f,t,r,c={},b={};function d(e){var a=b[e];if(void 0!==a)return a.exports;var f=b[e]={exports:{}};return c[e].call(f.exports,f,f.exports,d),f.exports}d.m=c,e=[],d.O=(a,f,t,r)=>{if(!f){var c=1/0;for(i=0;i<e.length;i++){f=e[i][0],t=e[i][1],r=e[i][2];for(var b=!0,o=0;o<f.length;o++)(!1&r||c>=r)&&Object.keys(d.O).every((e=>d.O[e](f[o])))?f.splice(o--,1):(b=!1,r<c&&(c=r));if(b){e.splice(i--,1);var n=t();void 0!==n&&(a=n)}}return a}r=r||0;for(var i=e.length;i>0&&e[i-1][2]>r;i--)e[i]=e[i-1];e[i]=[f,t,r]},d.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return d.d(a,{a:a}),a},f=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,d.t=function(e,t){if(1&t&&(e=this(e)),8&t)return e;if("object"==typeof e&&e){if(4&t&&e.__esModule)return e;if(16&t&&"function"==typeof e.then)return e}var r=Object.create(null);d.r(r);var c={};a=a||[null,f({}),f([]),f(f)];for(var b=2&t&&e;"object"==typeof b&&!~a.indexOf(b);b=f(b))Object.getOwnPropertyNames(b).forEach((a=>c[a]=()=>e[a]));return c.default=()=>e,d.d(r,c),r},d.d=(e,a)=>{for(var f in a)d.o(a,f)&&!d.o(e,f)&&Object.defineProperty(e,f,{enumerable:!0,get:a[f]})},d.f={},d.e=e=>Promise.all(Object.keys(d.f).reduce(((a,f)=>(d.f[f](e,a),a)),[])),d.u=e=>"assets/js/"+({452:"515f625a",552:"f4f34a3a",580:"cce9e44b",584:"8f65731b",712:"c498aaaa",792:"8789b923",796:"f6e30afb",1228:"f729375e",1392:"362d6096",1820:"29d39535",2182:"91edd61e",2208:"5f9a2a73",2392:"6875c492",2408:"d9f32620",2944:"e44a2883",3224:"b4594516",4008:"204a2771",4204:"1f391b9e",4304:"5e95c892",4666:"a94703ab",4808:"63405112",4976:"a6aa9e1f",5044:"c519f80a",5264:"4bd46f6d",5356:"0bf98805",5416:"f840bdae",5488:"dff1c289",5512:"814f3328",5536:"7661071f",5696:"935f2afb",5848:"71cfe0fb",6344:"ccc49370",6500:"a7bd4aaa",6520:"49e627f6",6752:"17896441",6904:"be12ed6e",7028:"9e4087bc",7292:"41a60c87",7528:"768d6e11",7652:"393be207",7688:"9a57734a",8288:"8388e6a6",8332:"b7ccf3c9",8412:"01a85c17",8552:"1df93b7f",8928:"59362658",8940:"66bcb4ce",9e3:"905ce43c",9224:"316f32e4",9428:"6b38aa70",9496:"175efc29",9576:"14eb3368",9705:"79134d0a"}[e]||e)+"."+{80:"a8da059d",452:"e69bfd42",552:"36031bcc",580:"6645417e",584:"cbb82272",712:"c20a613e",792:"bc60ff3b",796:"0739b827",1208:"95ff25eb",1228:"cbf5d99b",1392:"38c08415",1820:"2887c41d",2182:"e095e77e",2208:"ad2923c3",2392:"3519e92e",2408:"47366f84",2907:"97520612",2944:"bd8b4f44",3224:"092e759c",4008:"d5da7ee9",4184:"d8477c2b",4204:"d7bf633f",4304:"4df7e414",4666:"e3820f4b",4808:"06d0da26",4976:"5b99948a",5044:"92fff960",5264:"707af685",5356:"8d50d23e",5416:"af9cb107",5488:"441c203a",5512:"3ceccb90",5536:"08232539",5696:"c1e7bd7f",5848:"ecee1b59",6344:"6bb5c8dc",6500:"b0da91d4",6520:"6f7fff46",6752:"b7ee339f",6904:"ddc6ef96",7028:"835c9ec9",7292:"a00cde14",7528:"47fe4ff0",7652:"e671500f",7688:"53b00776",8288:"6f5e64d3",8332:"684d4362",8412:"4a269cee",8552:"da5ec760",8928:"4575cadc",8940:"406f381b",9e3:"5f060f12",9224:"28d9170a",9428:"0ac568da",9496:"1488e7ae",9576:"3ff18c11",9705:"d57d961b"}[e]+".js",d.miniCssF=e=>{},d.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),d.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),t={},r="@w5s/website:",d.l=(e,a,f,c)=>{if(t[e])t[e].push(a);else{var b,o;if(void 0!==f)for(var n=document.getElementsByTagName("script"),i=0;i<n.length;i++){var u=n[i];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==r+f){b=u;break}}b||(o=!0,(b=document.createElement("script")).charset="utf-8",b.timeout=120,d.nc&&b.setAttribute("nonce",d.nc),b.setAttribute("data-webpack",r+f),b.src=e),t[e]=[a];var s=(a,f)=>{b.onerror=b.onload=null,clearTimeout(l);var r=t[e];if(delete t[e],b.parentNode&&b.parentNode.removeChild(b),r&&r.forEach((e=>e(f))),a)return a(f)},l=setTimeout(s.bind(null,void 0,{type:"timeout",target:b}),12e4);b.onerror=s.bind(null,b.onerror),b.onload=s.bind(null,b.onload),o&&document.head.appendChild(b)}},d.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},d.p="/std/fr/",d.gca=function(e){return e={17896441:"6752",59362658:"8928",63405112:"4808","515f625a":"452",f4f34a3a:"552",cce9e44b:"580","8f65731b":"584",c498aaaa:"712","8789b923":"792",f6e30afb:"796",f729375e:"1228","362d6096":"1392","29d39535":"1820","91edd61e":"2182","5f9a2a73":"2208","6875c492":"2392",d9f32620:"2408",e44a2883:"2944",b4594516:"3224","204a2771":"4008","1f391b9e":"4204","5e95c892":"4304",a94703ab:"4666",a6aa9e1f:"4976",c519f80a:"5044","4bd46f6d":"5264","0bf98805":"5356",f840bdae:"5416",dff1c289:"5488","814f3328":"5512","7661071f":"5536","935f2afb":"5696","71cfe0fb":"5848",ccc49370:"6344",a7bd4aaa:"6500","49e627f6":"6520",be12ed6e:"6904","9e4087bc":"7028","41a60c87":"7292","768d6e11":"7528","393be207":"7652","9a57734a":"7688","8388e6a6":"8288",b7ccf3c9:"8332","01a85c17":"8412","1df93b7f":"8552","66bcb4ce":"8940","905ce43c":"9000","316f32e4":"9224","6b38aa70":"9428","175efc29":"9496","14eb3368":"9576","79134d0a":"9705"}[e]||e,d.p+d.u(e)},(()=>{var e={296:0,2176:0};d.f.j=(a,f)=>{var t=d.o(e,a)?e[a]:void 0;if(0!==t)if(t)f.push(t[2]);else if(/^2(17|9)6$/.test(a))e[a]=0;else{var r=new Promise(((f,r)=>t=e[a]=[f,r]));f.push(t[2]=r);var c=d.p+d.u(a),b=new Error;d.l(c,(f=>{if(d.o(e,a)&&(0!==(t=e[a])&&(e[a]=void 0),t)){var r=f&&("load"===f.type?"missing":f.type),c=f&&f.target&&f.target.src;b.message="Loading chunk "+a+" failed.\n("+r+": "+c+")",b.name="ChunkLoadError",b.type=r,b.request=c,t[1](b)}}),"chunk-"+a,a)}},d.O.j=a=>0===e[a];var a=(a,f)=>{var t,r,c=f[0],b=f[1],o=f[2],n=0;if(c.some((a=>0!==e[a]))){for(t in b)d.o(b,t)&&(d.m[t]=b[t]);if(o)var i=o(d)}for(a&&a(f);n<c.length;n++)r=c[n],d.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return d.O(i)},f=self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[];f.forEach(a.bind(null,0)),f.push=a.bind(null,f.push.bind(f))})()})();