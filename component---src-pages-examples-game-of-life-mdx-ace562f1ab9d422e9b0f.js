(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{XTd5:function(t,e,n){"use strict";n.r(e),n.d(e,"_frontmatter",(function(){return i})),n.d(e,"default",(function(){return c}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp"),r=n("kX+8");var i={Title:"Game of Life"},u={_frontmatter:i};function c(t){var e=t.components,n=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,["components"]);return Object(a.b)("wrapper",Object.assign({},u,n,{components:e,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"game-of-life"},"Game of Life"),Object(a.b)(r.e,{mdxType:"GameOfLife"}))}c.isMDXComponent=!0},"kX+8":function(t,e,n){"use strict";n.d(e,"a",(function(){return f})),n.d(e,"b",(function(){return m})),n.d(e,"c",(function(){return s})),n.d(e,"d",(function(){return p}));n("YBKJ"),n("n0hJ");var a=n("q1tI"),r=n.n(a),i=n("1uUR"),u=n("sCKr");function c(t,e,n){var a=n.length;if(!a)return 0;for(var r=n[0].length,i=0,u=-1;u<=1;u++)for(var c=-1;c<=1;c++){var o=t+u,l=e+c;o<r&&o>0&&l<a&&l>0&&(o!==t||l!==e)&&(i+=n[l][o])}return i}function o(t){var e=t.data,n=t.complete,a=0,r=e.map((function(t,n){return t.map((function(t,r){var i=c(r,n,e);return t&&(i<2||i>3)?(a++,0):t||3!==i?t:(a++,1)}))}));return 0===a&&n(),r}function l(t){var e=t.data;return e.map((function(t,n){return t.map((function(t,a){var r=c(a,n,e);return t&&(r<2||r>3)?0:t||3!==r?t:1}))}))}function d(t,e){var n=t.height,a=t.width,r=t.density;return void 0===e&&(e=Math.random),Array(n).fill(0).map((function(t){return Array(a).fill(0).map((function(){return Number(e()<r)}))}))}var f=function(){return r.a.createElement(u.a,{initData:d,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))},m=function(){return r.a.createElement(u.a,{initData:d,updateData:l,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))},s=function(){return r.a.createElement(u.a,{initData:d,updateData:o,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))},p=function(){return r.a.createElement(u.a,{controls:{param:"density",resetOnChange:!0,maxValue:1,step:.01,label:"Grid density"},showTimeSlider:!1,initData:d,updateData:o,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))};e.e=function(){return r.a.createElement(u.a,{auto:!1,controls:{param:"density",maxValue:1,step:.01,resetOnChange:!0,label:"Grid density"},showTimeSlider:!1,updateData:o,delay:100,initData:d,initialParams:{height:28,width:28,density:.15}},r.a.createElement(i.c,null))}}}]);
//# sourceMappingURL=component---src-pages-examples-game-of-life-mdx-ace562f1ab9d422e9b0f.js.map