if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const l=e=>n(e,o),t={module:{uri:o},exports:c,require:l};i[o]=Promise.all(r.map((e=>t[e]||l(e)))).then((e=>(s(...e),c)))}}define(["./workbox-e3490c72"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-BliRlamE.css",revision:null},{url:"assets/index-DO-31HG_.js",revision:null},{url:"index.html",revision:"1dfffc76bab1e9485366f6c9b4f72fa2"},{url:"registerSW.js",revision:"f553a4143cd2ceb4f82e36eed6938b53"},{url:"android-chrome-192x192.png",revision:"4f3a1f923b99c666a7a36a3836cd9beb"},{url:"android-chrome-512x512.png",revision:"e3b7b3998a5c411f5967865f7ccc4012"},{url:"apple-touch-icon.png",revision:"a488386bf452b7a9746bb2ea6574d042"},{url:"favicon.ico",revision:"2374caf2f0f2e6d4c90682304c1d755a"},{url:"maskable_icon.png",revision:"00d85c8012c0ee3520ac29da81f23585"},{url:"manifest.webmanifest",revision:"3ba28b374a125a310b714ed1980e7445"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
