(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{CczQ:function(e,t,a){var r=a("P8UN"),i=Math.abs;r(r.S,"Math",{hypot:function(e,t){for(var a,r,n=0,s=0,o=arguments.length,c=0;s<o;)c<(a=i(arguments[s++]))?(n=n*(r=c/a)*r+1,c=a):n+=a>0?(r=a/c)*r:a;return c===1/0?1/0:c*Math.sqrt(n)}})},ocix:function(e,t,a){"use strict";a("E5k/"),a("CczQ");var r=a("q1tI"),i=a.n(r),n=a("1uUR"),s=a("sCKr");function o(e,t){return t.reduce((function(t,a){var r=a[0],i=a[1];return t+e[i][r].value}),0)}function c(e){for(var t=e.data,a=(e.tick,e.params),r=e.complete,i=JSON.parse(JSON.stringify(t)),n=0,s=a.height,c=a.width,u=a.w,l=0;l<s;l++)for(var h=0;h<c;h++){var d=t[l][h],f=d.innerNeighbors,m=d.outerNeighbors,b=o(t,f)-u*o(t,m);b>0&&(i[l][h].value=1),b<0&&(i[l][h].value=0),i[l][h]!==t[l][h]&&n++}return n<.01*s*c&&r(),i}function u(e,t){var a=e.height,r=e.width,i=e.density,n=e.innerRadius,s=e.outerRadius;void 0===t&&(t=Math.random);for(var o=[],c=0;c<a;c++){for(var u=[],l=0;l<r;l++){for(var h=[],d=[],f=Math.max(l-s,0),m=Math.min(l+s,r-1),b=Math.max(c-s,0),p=Math.min(c+s,a-1),v=f;v<m;v++)for(var g=b;g<p;g++){var w=Math.hypot(l-v,c-g);w>n&&w<=s?d.push([v,g]):w>0&&w<=n&&h.push([v,g])}var O=t()<i;u.push({value:O,innerNeighbors:h,outerNeighbors:d})}o.push(u)}return o}var l=function(e){return i.a.createElement(n.c,Object.assign({size:10,accessor:function(e){return e.value?"#000":"none"}},e))};t.a=function(e){return i.a.createElement(s.a,Object.assign({auto:"false",controls:[[{param:"innerRadius",minValue:1,maxValue:10,label:"Inner Radius"},{param:"outerRadius",minValue:1,maxValue:10,label:"Outer Radius"}],[{param:"w",minValue:0,maxValue:1,label:"weight",step:.01},{param:"density",minValue:0,maxValue:1,step:.1}]],initData:u,initialParams:{height:35,width:35,density:.5,innerRadius:3,outerRadius:6,w:.35},updateData:c,maxTime:200},e),i.a.createElement(l,null))}},sCKr:function(e,t,a){"use strict";a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi"),a("E5k/");var r=a("q1tI"),i=a.n(r),n=a("1uUR"),s=a("VdAu");t.a=function(e){var t=e.fmOverrides,a=function(e,t){if(null==e)return{};var a,r,i={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,["fmOverrides"]);return i.a.createElement(s.c,Object.assign({sx:{border:"1px solid currentcolor",my:2,p:2,width:"350px"}},t),i.a.createElement(n.d,a))}},tqXG:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return n})),a.d(t,"default",(function(){return o}));a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi"),a("E5k/"),a("q1tI");var r=a("7ljp"),i=a("ocix");var n={Title:"Activators / Inhibitors"},s={_frontmatter:n};function o(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,r,i={},n=Object.keys(e);for(r=0;r<n.length;r++)a=n[r],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,["components"]);return Object(r.b)("wrapper",Object.assign({},s,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"activators--inhibitors"},"Activators / Inhibitors"),Object(r.b)(i.a,{mdxType:"Activators"}),Object(r.b)("p",null,"The ",Object(r.b)("a",Object.assign({parentName:"p"},{href:"http://www.scholarpedia.org/article/Gierer-Meinhardt_model"}),"activator-inhibitor")," model is a simulation of pattern formation such as the fur patterns of animals like the zebra or the giraffe."),Object(r.b)("p",null,"In this pattern, cells are arranged in a familar, 2d grid, and can either be activated (colored) or not (left blank)."),Object(r.b)("p",null,"Each activated cell activates cells in its inner radius, and inhibits cells in its outer radius.\nFor instance, if the inner radius is 3, and the outer radius is 6, all the cells within 3 cells of the activated cell are activated, and all cells beyond that and within 6 cells are inhibited."),Object(r.b)("p",null,"Each turn, we go through all the cells in the grid, and count how many times they are activated, and how many times they are inhibited.\nThe weight coefficient determines the relative power of inhibitors.\nIf a cell is activated more than it's inhibited, it becomes (or stays) activated, else it's deactivated."))}o.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-examples-activators-mdx-da59a5184f3f6db085b9.js.map