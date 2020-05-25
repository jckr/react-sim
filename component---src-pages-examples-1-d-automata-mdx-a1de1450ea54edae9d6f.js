(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{F0NN:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return w})),n.d(t,"default",(function(){return j}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/");var r=n("q1tI"),o=n.n(r),a=n("7ljp"),c=(n("pJf4"),n("q8oJ"),n("YbXK"),n("cFtU"),n("m210"),n("4DPX"),n("n0hJ"),n("1uUR")),i=n("sCKr"),l=n("VdAu");function s(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m={rule:110,cols:33,rows:24,firstLine:"blank"},f=function(e,t){var n=e.cols,r=e.firstLine;void 0===t&&(t=Math.random);var o=Array(n).fill(0);return o[Math.floor(o.length/2)]=1,"blank"===r?o:"full"===r?o.map((function(e){return 1})):o.map((function(e){return t()>.5?1:0}))},p=function(e){var t=e.data,n=(e.cols,e.params.rule);return t.map((function(e,r){var o=t[r-1],a=t[r],c=t[r+1];return n&1<<(o?4:0)+(a?2:0)+(c?1:0)}))},b=Object(c.i)((function(e){e.data;var t=e.cachedData,n=e.tick,r=e.params,a=r.rows,c=r.cols,i=Math.min(n,r.rows);return o.a.createElement("div",{style:{overflow:"hidden",position:"relative",height:10*a,width:10*c,margin:"0 auto"}},o.a.createElement(l.c,{direction:"column",sx:{position:"absolute",top:0}},s(Array(i).keys()).map((function(e){var r=n-i+e;return o.a.createElement(l.c,{direction:"row",key:"row-"+r,sx:{position:"absolute",top:10*e}},t[r].map((function(e,t){return o.a.createElement(h,{size:8,color:e?"#000":"none",key:"cell-"+t})})))}))))})),h=function(e){var t=e.color,n=e.size,r=void 0===n?12:n;return o.a.createElement(l.a,{sx:{height:r+"px",width:r+"px",bg:t,m:"1px",border:"2px solid #000"}})},d=Object(c.h)((function(e){var t=e.bit,n=e.params,r=e.setParams,a=n.rule,c=1<<t,i=c&a,s=4&t,u=2&t,m=1&t;return o.a.createElement(l.c,{flexDirection:"column",onClick:function(){r({rule:i?a-c:a+c})},alignItems:"center",sx:{mr:2,cursor:"pointer"}},o.a.createElement(l.c,{flexDirection:"row"},o.a.createElement(h,{color:s?"#000":"none"}),o.a.createElement(h,{color:u?"#000":"none"}),o.a.createElement(h,{color:m?"#000":"none"})),o.a.createElement(h,{color:i?"#000":"none"}))})),y=function(){return o.a.createElement(i.a,{initialParams:m,initData:f,updateData:p,controls:{param:"firstLine",label:"First line:",type:"radio",options:["blank","full","random"],resetOnChange:!0,vertical:!0}},o.a.createElement(l.c,{flexDirection:"column"},o.a.createElement(b,null),o.a.createElement(l.c,{flexDirection:"row",sx:{justifyContent:"space-between",my:2}},[0,1,2,3].map((function(e){return o.a.createElement(d,{bit:e,key:"bit-"+e})}))),o.a.createElement(l.c,{flexDirection:"row",sx:{justifyContent:"space-between",my:2}},[4,5,6,7].map((function(e){return o.a.createElement(d,{bit:e,key:"bit-"+e})})))))};var w={Title:"1D automata"},v={_frontmatter:w};function j(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},v,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"1d-automata"},"1D Automata"),Object(a.b)(y,{mdxType:"Automata"}),Object(a.b)("p",null,Object(a.b)("a",Object.assign({parentName:"p"},{href:"https://mathworld.wolfram.com/ElementaryCellularAutomaton.html"}),"1D cellular automata")," are among the simplest of automata.\nEach line consists of a series of cells which are either set (colored) or not."),Object(a.b)("p",null,"At each tick, we use a rule to determine whether cells on the next line will be set.\nFor each new cell, we consider the three cells above. There are 8 possible combinations - each of these cells can be set or not (so 2x2x2).\nFor each of these combinations, the rule determines whether the cell should be set or not. So we have 2",Object(a.b)("sup",null,"8")," rules, or 256."),Object(a.b)("p",null,"You can select a rule by adjusting the slider, or by clicking on each of the bits."),Object(a.b)("p",null,"This simulation is an interesting example of ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls/custom-controls"}),"custom control components")))}j.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-examples-1-d-automata-mdx-a1de1450ea54edae9d6f.js.map