if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>n(e,c),d={module:{uri:c},exports:o,require:t};i[c]=Promise.all(r.map((e=>d[e]||t(e)))).then((e=>(s(...e),o)))}}define(["./workbox-e3490c72"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-BqvWi4PI.css",revision:null},{url:"assets/index-DZ66g50p.js",revision:null},{url:"index.html",revision:"92e3b27108f8789df21e0c34358d84cc"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"android-chrome-192x192.png",revision:"4f3a1f923b99c666a7a36a3836cd9beb"},{url:"android-chrome-512x512.png",revision:"e3b7b3998a5c411f5967865f7ccc4012"},{url:"apple-touch-icon.png",revision:"a488386bf452b7a9746bb2ea6574d042"},{url:"favicon.ico",revision:"2374caf2f0f2e6d4c90682304c1d755a"},{url:"maskable_icon.png",revision:"00d85c8012c0ee3520ac29da81f23585"},{url:"manifest.webmanifest",revision:"b0ee08bcbdc0e531b48f84810bfddc76"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
