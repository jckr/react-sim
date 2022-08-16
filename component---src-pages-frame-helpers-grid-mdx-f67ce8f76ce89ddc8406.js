(window.webpackJsonp=window.webpackJsonp||[]).push([[57,12],{BvgZ:function(t,e,n){"use strict";n.r(e),n.d(e,"_frontmatter",(function(){return i})),n.d(e,"default",(function(){return c}));n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp"),r=["components"];var i={},l={_frontmatter:i};function c(t){var e=t.components,n=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,r);return Object(a.b)("wrapper",Object.assign({},l,n,{components:e,mdxType:"MDXLayout"}),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",{parentName:"tr",align:null},"Name"),Object(a.b)("th",{parentName:"tr",align:null},"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("strong",{parentName:"td"},"data"),Object(a.b)("br",null),"Array"),Object(a.b)("td",{parentName:"tr",align:null},"It expects data to be a 2-dimensional array of data.")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("strong",{parentName:"td"},"accessor"),Object(a.b)("br",null),"function"),Object(a.b)("td",{parentName:"tr",align:null},"How to determine how to color each cell. The inputs of the function are:",Object(a.b)("br",null),"cell (content of the cell), x , y. The output is: a color. The default value is:",Object(a.b)("br",null),Object(a.b)("inlineCode",{parentName:"td"},"cell => cell ? 0 : 'none' : '#000'"))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("strong",{parentName:"td"},"size"),Object(a.b)("br",null),"string/integer, default: 12"),Object(a.b)("td",{parentName:"tr",align:null},"How big the squares will be in pixels.")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",{parentName:"tr",align:null},Object(a.b)("strong",{parentName:"td"},"cellProps"),Object(a.b)("br",null),"anything"),Object(a.b)("td",{parentName:"tr",align:null},"Any extra prop to pass to each individual square")))),Object(a.b)("p",null,"Any other prop will be passed to the Grid."))}c.isMDXComponent=!0},"kX+8":function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return m})),n.d(e,"c",(function(){return d})),n.d(e,"d",(function(){return f}));n("AqHK"),n("HQhv"),n("YBKJ"),n("n0hJ"),n("E5k/");var a=n("q1tI"),r=n.n(a),i=n("1uUR"),l=n("sCKr"),c="0000010000000000010000000000\n0000000100010010000000000000\n1110001000000000000000000001\n1010000000000000000000000000\n0000000000100000000010110000\n0100000101010100000000000001\n0000000000010100000001000001\n0000000011100100000000100001\n0000010000000000000000010000\n0000000000010100000000000100".split("\n").map((function(t){return t.split("").map(Number)}));function o(t,e,n){var a=n.length;if(!a)return 0;for(var r=n[0].length,i=0,l=-1;l<=1;l++)for(var c=-1;c<=1;c++){var o=t+l,u=e+c;o<r&&o>0&&u<a&&u>0&&(o!==t||u!==e)&&(i+=n[u][o])}return i}function u(t){var e=t.data,n=t.complete,a=0,r=e.map((function(t,n){return t.map((function(t,r){var i=o(r,n,e);return t&&(i<2||i>3)?(a++,0):t||3!==i?t:(a++,1)}))}));return 0===a&&n(),r}function b(t){var e=t.data;return e.map((function(t,n){return t.map((function(t,a){var r=o(a,n,e);return t&&(r<2||r>3)?0:t||3!==r?t:1}))}))}function p(t,e){var n=t.height,a=t.width,r=t.density;return void 0===e&&(e=Math.random),Array(n).fill(0).map((function(t){return Array(a).fill(0).map((function(){return Number(e()<r)}))}))}var s=function(){return r.a.createElement(l.a,{initData:p,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))},m=function(){return r.a.createElement(l.a,{initData:function(){return c},updateData:b,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))},d=function(){return r.a.createElement(l.a,{initData:function(){return c},updateData:u,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))},f=function(){return r.a.createElement(l.a,{controls:{param:"density",resetOnChange:!0,maxValue:1,step:.01,label:"Grid density"},showTimeSlider:!1,initData:p,updateData:u,initialParams:{height:10,width:28,density:.15}},r.a.createElement(i.c,null))};e.e=function(t){return r.a.createElement(l.a,Object.assign({auto:!1,controls:{param:"density",maxValue:1,step:.01,resetOnChange:!0,label:"Grid density"},showTimeSlider:!1,updateData:u,delay:100,initData:p,initialParams:{height:28,width:28,density:.15}},t),r.a.createElement(i.c,null))}},yq24:function(t,e,n){"use strict";n.r(e),n.d(e,"_frontmatter",(function(){return c})),n.d(e,"default",(function(){return u}));n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp"),r=n("kX+8"),i=n("BvgZ"),l=["components"];var c={Title:"Grid"},o={_frontmatter:c};function u(t){var e=t.components,n=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,l);return Object(a.b)("wrapper",Object.assign({},o,n,{components:e,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Grid is a ",Object(a.b)("a",{parentName:"p",href:"/react-sim/frame-helpers"},"frame helper")," which displays any 2-dimensional matrix of data as a grid of colored squares."),Object(a.b)(r.c,{mdxType:"Step4"}),Object(a.b)("p",null,"It's used in examples like ",Object(a.b)("a",{parentName:"p",href:"/react-sim/examples/game-of-life"},"Game of Life"),", ",Object(a.b)("a",{parentName:"p",href:"/react-sim/examples/simple-model"},"Simple Model")," or ",Object(a.b)("a",{parentName:"p",href:"/react-sim/examples/activators-inhibitors"},"Activators/inhibitors"),"."),Object(a.b)("h1",{id:"properties"},"Properties"),Object(a.b)(i.default,{mdxType:"GridAPI"}))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-frame-helpers-grid-mdx-f67ce8f76ce89ddc8406.js.map