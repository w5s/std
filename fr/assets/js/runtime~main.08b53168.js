(()=>{"use strict";var e,a,f,c,t,r={},d={};function b(e){var a=d[e];if(void 0!==a)return a.exports;var f=d[e]={exports:{}};return r[e].call(f.exports,f,f.exports,b),f.exports}b.m=r,e=[],b.O=(a,f,c,t)=>{if(!f){var r=1/0;for(i=0;i<e.length;i++){f=e[i][0],c=e[i][1],t=e[i][2];for(var d=!0,o=0;o<f.length;o++)(!1&t||r>=t)&&Object.keys(b.O).every((e=>b.O[e](f[o])))?f.splice(o--,1):(d=!1,t<r&&(r=t));if(d){e.splice(i--,1);var n=c();void 0!==n&&(a=n)}}return a}t=t||0;for(var i=e.length;i>0&&e[i-1][2]>t;i--)e[i]=e[i-1];e[i]=[f,c,t]},b.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return b.d(a,{a:a}),a},f=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,b.t=function(e,c){if(1&c&&(e=this(e)),8&c)return e;if("object"==typeof e&&e){if(4&c&&e.__esModule)return e;if(16&c&&"function"==typeof e.then)return e}var t=Object.create(null);b.r(t);var r={};a=a||[null,f({}),f([]),f(f)];for(var d=2&c&&e;"object"==typeof d&&!~a.indexOf(d);d=f(d))Object.getOwnPropertyNames(d).forEach((a=>r[a]=()=>e[a]));return r.default=()=>e,b.d(t,r),t},b.d=(e,a)=>{for(var f in a)b.o(a,f)&&!b.o(e,f)&&Object.defineProperty(e,f,{enumerable:!0,get:a[f]})},b.f={},b.e=e=>Promise.all(Object.keys(b.f).reduce(((a,f)=>(b.f[f](e,a),a)),[])),b.u=e=>"assets/js/"+({3:"d89bacef",516:"8388e6a6",991:"41a60c87",1062:"b7dc2f4c",1118:"7661071f",1235:"a7456010",1614:"7bec34f5",1650:"6e719b2a",1798:"e65df9dd",1903:"acecf23e",1922:"aedc0831",1952:"66bcb4ce",2194:"444e2fd0",2711:"9e4087bc",2801:"bb4cbf45",2816:"b0a16a48",3249:"ccc49370",3430:"cce9e44b",3637:"f4f34a3a",4082:"9a57734a",4134:"393be207",4583:"1df93b7f",4766:"91edd61e",4813:"6875c492",5223:"9119172b",5293:"6b38aa70",5380:"41f52e64",5507:"b4594516",5557:"d9f32620",5582:"86ac3b6b",5592:"186e0029",5637:"905ce43c",5742:"aba21aa0",5804:"fcc0311d",5865:"59769699",5939:"12989661",5967:"8d578534",6061:"1f391b9e",6089:"29d39535",6370:"f6e30afb",6969:"14eb3368",7098:"a7bd4aaa",7128:"51a8a78f",7215:"8dd133ad",7293:"2ca705f0",7472:"814f3328",7553:"768d6e11",7559:"316f32e4",7643:"a6aa9e1f",7666:"52fd2026",8209:"01a85c17",8213:"63405112",8401:"17896441",8696:"85ad7332",8737:"362d6096",8749:"91b965a3",9048:"a94703ab",9325:"59362658",9581:"5f9a2a73",9647:"5e95c892",9858:"36994c47"}[e]||e)+"."+{3:"9298d76c",516:"a659fa00",991:"4354c69b",994:"ee537fd1",1062:"feb75bd9",1118:"2c4eb8d2",1235:"86686a14",1614:"f36af217",1650:"0f26ae96",1798:"2899047c",1903:"800c1726",1922:"3382ae32",1952:"d2686f4a",2194:"090b84aa",2711:"8734b487",2801:"19c2c496",2816:"a299ee3a",3249:"719c27be",3430:"c590d999",3637:"042ff648",4082:"87004d62",4134:"c79a60c0",4553:"b3a50b27",4583:"a654d0d6",4766:"ad7b8e46",4813:"fd720988",5223:"06ef3d45",5293:"d0a4f018",5380:"e5cdd05a",5507:"7c5a9708",5557:"3c824dae",5582:"61f1e092",5592:"84f14ca6",5637:"f5c01872",5723:"8ab11a71",5742:"4cff54b8",5804:"4aa81847",5865:"e929dfe3",5939:"69cc39a8",5967:"a802d92b",6061:"73116518",6089:"9b81484e",6205:"21f38bca",6370:"2e45e0c4",6969:"e6bc732e",7098:"869053ec",7128:"815e5040",7215:"d5f81dad",7293:"b9f783c5",7472:"a3d5b596",7553:"b69d6c2f",7559:"9eb808db",7643:"4e2a0eed",7666:"9e162f21",8209:"42c1592c",8213:"25157de1",8401:"7e631113",8696:"4abc5178",8737:"cc81f754",8749:"b2c4a436",9048:"dad58927",9325:"d1fa0e69",9581:"1a6f5bbb",9647:"b60a9804",9858:"ac8ddc99",9972:"756b0f9d"}[e]+".js",b.miniCssF=e=>{},b.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),b.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),c={},t="@w5s/website:",b.l=(e,a,f,r)=>{if(c[e])c[e].push(a);else{var d,o;if(void 0!==f)for(var n=document.getElementsByTagName("script"),i=0;i<n.length;i++){var u=n[i];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==t+f){d=u;break}}d||(o=!0,(d=document.createElement("script")).charset="utf-8",d.timeout=120,b.nc&&d.setAttribute("nonce",b.nc),d.setAttribute("data-webpack",t+f),d.src=e),c[e]=[a];var s=(a,f)=>{d.onerror=d.onload=null,clearTimeout(l);var t=c[e];if(delete c[e],d.parentNode&&d.parentNode.removeChild(d),t&&t.forEach((e=>e(f))),a)return a(f)},l=setTimeout(s.bind(null,void 0,{type:"timeout",target:d}),12e4);d.onerror=s.bind(null,d.onerror),d.onload=s.bind(null,d.onload),o&&document.head.appendChild(d)}},b.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},b.p="/std/fr/",b.gca=function(e){return e={12989661:"5939",17896441:"8401",59362658:"9325",59769699:"5865",63405112:"8213",d89bacef:"3","8388e6a6":"516","41a60c87":"991",b7dc2f4c:"1062","7661071f":"1118",a7456010:"1235","7bec34f5":"1614","6e719b2a":"1650",e65df9dd:"1798",acecf23e:"1903",aedc0831:"1922","66bcb4ce":"1952","444e2fd0":"2194","9e4087bc":"2711",bb4cbf45:"2801",b0a16a48:"2816",ccc49370:"3249",cce9e44b:"3430",f4f34a3a:"3637","9a57734a":"4082","393be207":"4134","1df93b7f":"4583","91edd61e":"4766","6875c492":"4813","9119172b":"5223","6b38aa70":"5293","41f52e64":"5380",b4594516:"5507",d9f32620:"5557","86ac3b6b":"5582","186e0029":"5592","905ce43c":"5637",aba21aa0:"5742",fcc0311d:"5804","8d578534":"5967","1f391b9e":"6061","29d39535":"6089",f6e30afb:"6370","14eb3368":"6969",a7bd4aaa:"7098","51a8a78f":"7128","8dd133ad":"7215","2ca705f0":"7293","814f3328":"7472","768d6e11":"7553","316f32e4":"7559",a6aa9e1f:"7643","52fd2026":"7666","01a85c17":"8209","85ad7332":"8696","362d6096":"8737","91b965a3":"8749",a94703ab:"9048","5f9a2a73":"9581","5e95c892":"9647","36994c47":"9858"}[e]||e,b.p+b.u(e)},(()=>{var e={5354:0,1869:0};b.f.j=(a,f)=>{var c=b.o(e,a)?e[a]:void 0;if(0!==c)if(c)f.push(c[2]);else if(/^(1869|5354)$/.test(a))e[a]=0;else{var t=new Promise(((f,t)=>c=e[a]=[f,t]));f.push(c[2]=t);var r=b.p+b.u(a),d=new Error;b.l(r,(f=>{if(b.o(e,a)&&(0!==(c=e[a])&&(e[a]=void 0),c)){var t=f&&("load"===f.type?"missing":f.type),r=f&&f.target&&f.target.src;d.message="Loading chunk "+a+" failed.\n("+t+": "+r+")",d.name="ChunkLoadError",d.type=t,d.request=r,c[1](d)}}),"chunk-"+a,a)}},b.O.j=a=>0===e[a];var a=(a,f)=>{var c,t,r=f[0],d=f[1],o=f[2],n=0;if(r.some((a=>0!==e[a]))){for(c in d)b.o(d,c)&&(b.m[c]=d[c]);if(o)var i=o(b)}for(a&&a(f);n<r.length;n++)t=r[n],b.o(e,t)&&e[t]&&e[t][0](),e[t]=0;return b.O(i)},f=self.webpackChunk_w5s_website=self.webpackChunk_w5s_website||[];f.forEach(a.bind(null,0)),f.push=a.bind(null,f.push.bind(f))})()})();