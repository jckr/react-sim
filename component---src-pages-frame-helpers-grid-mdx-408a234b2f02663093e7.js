(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{"kX+8":function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return p})),n.d(t,"d",(function(){return m}));n("YBKJ"),n("n0hJ");var a=n("q1tI"),r=n.n(a),i=n("1uUR");function l(e,t,n){var a=n.length;if(!a)return 0;for(var r=n[0].length,i=0,l=-1;l<=1;l++)for(var o=-1;o<=1;o++){var c=e+l,u=t+o;c<r&&c>0&&u<a&&u>0&&(c!==e||u!==t)&&(i+=n[u][c])}return i}function o(e){var t=e.data,n=e.complete,a=0,r=t.map((function(e,n){return e.map((function(e,r){var i=l(r,n,t);return e&&(i<2||i>3)?(a++,0):e||3!==i?e:(a++,1)}))}));return 0===a&&n(),r}function c(e){var t=e.data;return t.map((function(e,n){return e.map((function(e,a){var r=l(a,n,t);return e&&(r<2||r>3)?0:e||3!==r?e:1}))}))}function u(e,t){var n=e.height,a=e.width,r=e.density;return void 0===t&&(t=Math.random),Array(n).fill(0).map((function(e){return Array(a).fill(0).map((function(){return Number(t()<r)}))}))}var s=function(){return r.a.createElement(i.d,{initData:u,initialParams:{height:10,width:10,density:.15}},r.a.createElement(i.c,null))},d=function(){return r.a.createElement(i.d,{initData:u,updateData:c,initialParams:{height:10,width:10,density:.15}},r.a.createElement(i.c,null))},p=function(){return r.a.createElement(i.d,{initData:u,updateData:o,initialParams:{height:10,width:10,density:.15}},r.a.createElement(i.c,null))},m=function(){return r.a.createElement(i.d,{controls:{param:"density",resetOnChange:!0,maxValue:1,step:.01,label:"Grid density"},showTimeSlider:!1,initData:u,updateData:o,initialParams:{height:24,width:48,density:.15}},r.a.createElement(i.c,null))};t.e=function(){return r.a.createElement(i.d,{auto:!1,controls:{param:"density",maxValue:1,step:.01,resetOnChange:!0,label:"Grid density"},showTimeSlider:!1,updateData:o,delay:100,initData:u,initialParams:{height:24,width:48,density:.15}},r.a.createElement(i.c,null))}},yq24:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return o}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp"),r=n("kX+8");var i={Title:"Grid"},l={_frontmatter:i};function o(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Grid is a ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"./frame-helpers"}),"frame helper")," which displays any 2-dimensional matrix of data as a grid of colored squares."),Object(a.b)(r.c,{mdxType:"Step4"}),Object(a.b)("p",null,"It's used in examples like ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"./examples/game-of-life"}),"Game of Life"),", ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"./examples/simple-model"}),"Simple Model")," or ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"./examples/activators-inhibitors"}),"Activators/inhibitors"),"."),Object(a.b)("h1",null,"Properties"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"data (Array): it expects data to be a 2-dimensional array of data."),Object(a.b)("li",{parentName:"ul"},"accessor (function): how to determine how to color each cell. The inputs of the function are:\ncell (content of the cell), x , y. The output is: a color. The default value is:\n",Object(a.b)("inlineCode",{parentName:"li"},"cell => cell ? 0 : 'none' : '#000'")),Object(a.b)("li",{parentName:"ul"},"size (string | integer, default: 12): how big the squares will be in pixels."),Object(a.b)("li",{parentName:"ul"},"cellProps: any extra prop to pass to each individual square."),Object(a.b)("li",{parentName:"ul"},"any other prop will be passed to the Grid.")))}o.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-frame-helpers-grid-mdx-408a234b2f02663093e7.js.map