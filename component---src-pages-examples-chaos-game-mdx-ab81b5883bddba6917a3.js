(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{F6sC:function(t,e,r){"use strict";r.r(e),r.d(e,"_frontmatter",(function(){return y})),r.d(e,"default",(function(){return w}));r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("E5k/");var a=r("q1tI"),n=r.n(a),o=r("7ljp"),i=(r("pJf4"),r("q8oJ"),r("YbXK"),r("cFtU"),r("m210"),r("4DPX"),r("ZiRl"),r("n0hJ"),r("HQhv"),r("1uUR")),l=r("VdAu");function c(t){return function(t){if(Array.isArray(t))return s(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return s(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(t);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return s(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,a=new Array(e);r<e;r++)a[r]=t[r];return a}var u=function(t){return n.a.createElement(l.c,{sx:{border:"1px solid #000",p:2,width:"fit-content"}},n.a.createElement(i.f,t))},h=function(t){var e=t.angleOffset,r=t.nbAttractors,a=t.height,n=t.width,o=n/2,i=a/2,l=.95*Math.min(a,n)/2;return c(Array(r).keys()).map((function(t){var a=e+.5*(r+4*t)/r;return{x:o+l*Math.cos(a*Math.PI),y:i-l*Math.sin(a*Math.PI)}}))};function p(t){var e=t.angle,r=t.nbAttractors,a=t.height,n=t.width,o=void 0===e?2*Math.random()*Math.PI:e,i=h({angleOffset:o,nbAttractors:r,height:a,width:n}),l={x:Math.random()*n,y:Math.random()*a};return{attractors:i,background:"hsla("+Math.floor(360*Math.random())+", 30%, 7%, 1)",color:"hsla("+Math.floor(360*Math.random())+", 77%, 45%, 1)",points:[l],prevDirection:0}}function f(t){var e=t.data,r=t.params,a=(t.tick,r.nbAttractors);e.attractors.length!==a&&(e.attractors=h(r));var n=r.rules?r.rules.split("").reduce((function(t,e,r){return"1"===e&&t.push(r),t}),[]):c(Array(a).keys()),o=(e.prevDirection+n[Math.floor(Math.random()*n.length)])%a;e.prevDirection=o;var i=e.points[e.points.length-1],l=e.attractors[o],s={x:(i.x+l.x)/2,y:(i.y+l.y)/2};return e.points.push(s),e}function m(t){var e=t.ctx,r=t.data,a=t.params,n=t.tick,o=t.circle,i=a.height,l=a.width;e.globalAlpha=1,e.fillStyle=r.background,e.globalCompositeOperation="source-over",e.fillRect(0,0,l,i),e.globalCompositeOperation="lighter",e.fillStyle=r.color,e.globalAlpha=.8;for(var c=0;c<n;c++){var s=r.points[c];o({x:s.x,y:s.y,r:a.r}),e.fill()}}var b=function(){return n.a.createElement(u,{ticksPerAnimation:100,maxTime:1e4,initData:p,isPlaying:!0,loop:!0,updateData:f,initialParams:{height:500,width:500,nbAttractors:3,r:1}},n.a.createElement(i.a,{draw:m}))},g=Object(i.j)((function(t){var e=t.params,r=t.setParams,a=e.nbAttractors,o=Math.ceil(a/5),s=function(t){return t<a?n.a.createElement(i.i,{key:"toggle-"+t,sx:{flex:"1 1 0"},checked:"1"===e.rules.charAt(t),label:t+1+(0===t?"st":1===t?"nd":"th")+" vertex",setValue:function(a){var n="1"===e.rules.charAt(t)?"0":"1",o=e.rules.slice(0,t)+n+e.rules.slice(t+1);r({rules:o})}}):null},u=c(Array(o).keys()).map((function(t){return n.a.createElement(l.c,{flexDirection:"row",key:"tr-"+t,sx:{justifyContent:"space-between"}},[5*t,5*t+1,5*t+2,5*t+3,5*t+4].map(s))}));return n.a.createElement(l.c,{flexDirection:"column"},n.a.createElement(i.g,{key:"range",minValue:3,maxValue:20,label:"Vertices",value:e.nbAttractors,setValue:function(t){return r({nbAttractors:t,rules:"1".repeat(t)},!0)}}),n.a.createElement(l.c,{flexDirection:"column"},u))})),d=(Object(i.k)((function(t){var e=t.data,r=t.tick,o=t.params,i=Object(a.useRef)(null),l=o.height,c=o.width;return Object(a.useEffect)((function(){var t=i.current.getContext("2d");t.globalAlpha=1,t.fillStyle=e.background,t.globalCompositeOperation="source-over",t.fillRect(0,0,c,l),t.globalCompositeOperation="lighter",t.fillStyle=e.color;for(var a=0;a<r;a++){t.globalAlpha=.8;var n=e.points[a];t.beginPath(),t.arc(n.x,n.y,o.r,0,2*Math.PI),t.fill()}})),n.a.createElement("canvas",{height:l,width:c,ref:i})})),function(){return n.a.createElement(u,{ticksPerAnimation:100,maxTime:2e4,initData:p,updateData:f,initialParams:{height:500,width:500,nbAttractors:7,angle:0,r:1,rules:"1001100"}},n.a.createElement(l.c,{flexDirection:"column"},n.a.createElement(i.a,{draw:m}),n.a.createElement(g,null)))});var y={Title:"Chaos Game"},v={_frontmatter:y};function w(t){var e=t.components,r=function(t,e){if(null==t)return{};var r,a,n={},o=Object.keys(t);for(a=0;a<o.length;a++)r=o[a],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,["components"]);return Object(o.b)("wrapper",Object.assign({},v,r,{components:e,mdxType:"MDXLayout"}),Object(o.b)("h1",null,"Chaos Game"),Object(o.b)(b,{mdxType:"BasicChaosGame"}),Object(o.b)("p",null,"The ",Object(o.b)("a",Object.assign({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Chaos_game"}),"Chaos Game")," is a method to generate a fractal."),Object(o.b)("p",null,"We start from an equilateral triangle, and one point chosen at random in the plane.\nAt each iteration, we plot a new point which is halfway between the previous point, and one of the vertices of the triangle, chosen at random.\nWe continue plot points like these."),Object(o.b)("p",null,"Eventually, our figure looks like the ",Object(o.b)("a",Object.assign({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Sierpi%C5%84ski_triangle"}),"Sierpiński triangle")),Object(o.b)(d,{mdxType:"ChaosGame"}),Object(o.b)("p",null,"But we can generalize this to other polygons.\nIn this second version, we can choose a regular polygon with 3 to 12 vertices (so, anything from a triangle to a dodecagon).\nWe can also choose whether we use each vertex as an attractor or not. If a vertex is not an attractor, it won't be used to compute the position of new points in iterations."),Object(o.b)("p",null,"For larger polygons, if all vertices are used as attractors, the resulting figure looks a bit messy. But if we only pick a few, then shapes will start to emerge."))}w.isMDXComponent=!0},ZiRl:function(t,e,r){var a=r("P8UN");a(a.P,"String",{repeat:r("gd4K")})},gd4K:function(t,e,r){"use strict";var a=r("1Llc"),n=r("ap2Z");t.exports=function(t){var e=String(n(this)),r="",o=a(t);if(o<0||o==1/0)throw RangeError("Count can't be negative");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(r+=e);return r}}}]);
//# sourceMappingURL=component---src-pages-examples-chaos-game-mdx-ab81b5883bddba6917a3.js.map