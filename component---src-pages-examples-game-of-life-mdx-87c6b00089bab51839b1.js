(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{XTd5:function(t,n,e){"use strict";e.r(n),e.d(n,"_frontmatter",(function(){return i})),e.d(n,"default",(function(){return c}));e("rzGZ"),e("Dq+y"),e("8npG"),e("Ggvi"),e("E5k/"),e("q1tI");var a=e("7ljp"),r=e("kX+8");var i={Title:"Game of Life"},u={_frontmatter:i};function c(t){var n=t.components,e=function(t,n){if(null==t)return{};var e,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)e=i[a],n.indexOf(e)>=0||(r[e]=t[e]);return r}(t,["components"]);return Object(a.b)("wrapper",Object.assign({},u,e,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"game-of-life"},"Game of Life"),Object(a.b)(r.e,{mdxType:"GameOfLife"}))}c.isMDXComponent=!0},"kX+8":function(t,n,e){"use strict";e.d(n,"a",(function(){return d})),e.d(n,"b",(function(){return s})),e.d(n,"c",(function(){return p})),e.d(n,"d",(function(){return h}));e("n0hJ"),e("YBKJ"),e("HQhv");var a=e("q1tI"),r=e.n(a),i=e("1uUR"),u=e("sCKr"),c="0000010000000000010000000000\n0000000100010010000000000000\n1110001000000000000000000001\n1010000000000000000000000000\n0000000000100000000010110000\n0100000101010100000000000001\n0000000000010100000001000001\n0000000011100100000000100001\n0000010000000000000000010000\n0000000000010100000000000100".split("\n").map((function(t){return t.split("").map(Number)}));function o(t,n,e){var a=e.length;if(!a)return 0;for(var r=e[0].length,i=0,u=-1;u<=1;u++)for(var c=-1;c<=1;c++){var o=t+u,l=n+c;o<r&&o>0&&l<a&&l>0&&(o!==t||l!==n)&&(i+=e[l][o])}return i}function l(t){var n=t.data,e=t.complete,a=0,r=n.map((function(t,e){return t.map((function(t,r){var i=o(r,e,n);return t&&(i<2||i>3)?(a++,0):t||3!==i?t:(a++,1)}))}));return 0===a&&e(),r}function f(t){var n=t.data;return n.map((function(t,e){return t.map((function(t,a){var r=o(a,e,n);return t&&(r<2||r>3)?0:t||3!==r?t:1}))}))}function m(t,n){var e=t.height,a=t.width,r=t.density;return void 0===n&&(n=Math.random),Array(e).fill(0).map((function(t){return Array(a).fill(0).map((function(){return Number(n()<r)}))}))}var d=function(){return r.a.createElement(u.a,{initData:m,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))},s=function(){return r.a.createElement(u.a,{initData:function(){return c},updateData:f,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))},p=function(){return r.a.createElement(u.a,{initData:function(){return c},updateData:l,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))},h=function(){return r.a.createElement(u.a,{controls:{param:"density",resetOnChange:!0,maxValue:1,step:.01,label:"Grid density"},showTimeSlider:!1,initData:m,updateData:l,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))};n.e=function(){return r.a.createElement(u.a,{auto:!1,controls:{param:"density",maxValue:1,step:.01,resetOnChange:!0,label:"Grid density"},showTimeSlider:!1,updateData:l,delay:100,initData:m,initialParams:{height:28,width:28,density:.15}},r.a.createElement(i.c,null))}}}]);
//# sourceMappingURL=component---src-pages-examples-game-of-life-mdx-87c6b00089bab51839b1.js.map