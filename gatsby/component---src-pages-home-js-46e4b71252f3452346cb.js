(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{gHPf:function(t,n,e){"use strict";e.r(n);e("n0hJ"),e("YBKJ"),e("HQhv");var r=e("q1tI"),a=e.n(r),i=e("Wbzz"),u=(e("9eSz"),e("1uUR")),l=e("kX+8"),o="0000000000000000000000000000000000000000000000000000000\n0000000000000000000000000000000000000000000000000000000\n0011110011111001110001110011111000000111001110100000100\n0010001010000010001010001000100000001000100100110001100\n0010001010000010001010001000100000001000100100101010100\n0010001010000010001010000000100000001000000100100100100\n0011110011110010001010000000100011100111000100100000100\n0010001010000011111010000000100000000000100100100000100\n0010001010000010001010001000100000001000100100100000100\n0010001010000010001010001000100000001000100100100000100\n0010001011111010001001110000100000000111001110100000100\n0000000000000000000000000000000000000000000000000000000\n0000000000000000000000000000000000000000000000000000000".split("\n").map((function(t){return t.split("").map(Number)}));function c(t){var n=t.height,e=t.width,r=Array(n).fill(0).map((function(t){return Array(e).fill(0).map((function(t){return Math.random()>.8?1:0}))})),a=Math.floor((n-o.length)/2),i=Math.floor((e-o[0].length)/2);return o.forEach((function(t,n){return t.forEach((function(t,e){r[a+n]&&(r[a+n][i+e]=t)}))})),r}n.default=function(){return a.a.createElement("div",null,a.a.createElement(u.c,{start:!1,updateData:l.g,maxTime:1/0,initData:c,initialParams:{height:60,width:80}},a.a.createElement(l.a,null)),a.a.createElement(i.Link,{to:"/about"},"Get Started"))}},"kX+8":function(t,n,e){"use strict";e.d(n,"g",(function(){return l})),e.d(n,"a",(function(){return d})),e.d(n,"b",(function(){return f})),e.d(n,"c",(function(){return h})),e.d(n,"d",(function(){return m})),e.d(n,"e",(function(){return p}));e("YBKJ"),e("n0hJ");var r=e("q1tI"),a=e.n(r),i=e("1uUR");function u(t,n,e){var r=e.length;if(!r)return 0;for(var a=e[0].length,i=0,u=-1;u<=1;u++)for(var l=-1;l<=1;l++){var o=t+u,c=n+l;o<a&&o>0&&c<r&&c>0&&(o!==t||c!==n)&&(i+=e[c][o])}return i}function l(t){var n=t.data,e=t.complete,r=0,a=n.map((function(t,e){return t.map((function(t,a){var i=u(a,e,n);return t&&(i<2||i>3)?(r++,0):t||3!==i?t:(r++,1)}))}));return 0===r&&e(),a}function o(t){var n=t.data;return n.map((function(t,e){return t.map((function(t,r){var a=u(r,e,n);return t&&(a<2||a>3)?0:t||3!==a?t:1}))}))}function c(t){var n=t.height,e=t.width,r=t.density;return Array(n).fill(0).map((function(t){return Array(e).fill(0).map((function(){return Number(Math.random()<r)}))}))}var d=function(t){var n,e;function r(){return t.apply(this,arguments)||this}return e=t,(n=r).prototype=Object.create(e.prototype),n.prototype.constructor=n,n.__proto__=e,r.prototype.render=function(){if(null===this.props.data)return null;var t=this.props,n=t.accessor,e=t.data,r=t.size;return a.a.createElement("div",null,e.map((function(t,e){return a.a.createElement(i.b,{key:"r-"+e,styles:{height:r}},t.map((function(t,e){return a.a.createElement(i.a,{key:"c-"+e,styles:{width:r,overflow:"hidden",alignItems:"center",justifyContent:"center"}},a.a.createElement("div",{style:{background:"#000",borderRadius:n(t)?0:"50%",width:n(t)?"100%":0,height:n(t)?"100%":0}}))})))})))},r}(a.a.Component);d.defaultProps={size:12,accessor:function(t){return t}};var s=function(t){var n=t.data,e=t.size,r=void 0===e?12:e;t.initData;return null===n?null:a.a.createElement("div",null,n.map((function(t,n){return a.a.createElement("div",{key:"r-"+n,style:{display:"flex",flexDirection:"row",height:r}},t.map((function(t,n){return a.a.createElement("div",{key:"c-"+n,style:{width:r,background:t?"#000":"none"}})})))})))},f=function(){return a.a.createElement(i.c,{initData:c,initialParams:{height:24,width:48,density:.15}},a.a.createElement(s,null))},h=function(){return a.a.createElement(i.c,{initData:c,updateData:o,initialParams:{height:24,width:48,density:.15}},a.a.createElement(s,null))},m=function(){return a.a.createElement(i.c,{initData:c,updateData:l,initialParams:{height:24,width:48,density:.15}},a.a.createElement(s,null))},p=function(){return a.a.createElement(i.c,{controls:{param:"density",resetOnChange:!0,maxValue:1,step:.01,label:"Grid density"},showTimeSlider:!1,initData:c,updateData:l,initialParams:{height:24,width:48,density:.15}},a.a.createElement(s,null))};n.f=function(){return a.a.createElement(i.c,{auto:!1,controls:{param:"density",maxValue:1,step:.01,resetOnChange:!0,label:"Grid density"},showTimeSlider:!1,updateData:l,delay:100,initData:c,initialParams:{height:24,width:48,density:.15}},a.a.createElement(s,null))}}}]);
//# sourceMappingURL=component---src-pages-home-js-46e4b71252f3452346cb.js.map