if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const c=e=>s(e,o),l={module:{uri:o},exports:t,require:c};i[o]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-e3490c72"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-BX-y7wrs.js",revision:null},{url:"assets/index-C-4NK8oE.css",revision:null},{url:"index.html",revision:"65d14e7b0f735fce0a189963e5b93796"},{url:"registerSW.js",revision:"f553a4143cd2ceb4f82e36eed6938b53"},{url:"apple-touch-icon.png",revision:"a488386bf452b7a9746bb2ea6574d042"},{url:"favicon.ico",revision:"2374caf2f0f2e6d4c90682304c1d755a"},{url:"manifest.webmanifest",revision:"01957bc326413db9cdd5ef562e6006c4"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
