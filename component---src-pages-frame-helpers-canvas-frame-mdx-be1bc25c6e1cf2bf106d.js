(window.webpackJsonp=window.webpackJsonp||[]).push([[55,7,8,12,20],{"+CGw":function(e,t,n){"use strict";n.d(t,"d",(function(){return p})),n.d(t,"c",(function(){return m})),n.d(t,"a",(function(){return O}));n("xtjI"),n("4DPX"),n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("n0hJ"),n("YBKJ");var a=n("q1tI"),r=n.n(a),c=n("2A+t"),b=n("VdAu"),l=n("sCKr");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var u=function(e){return Math.ceil(6*e())};function p(e,t){var n,a=e.data,r=e.tick,c=e.params.nbDice;void 0===t&&(t=Math.random);for(var b=a.totals,l=0,i=[],s=0;s<c;s++)i.push(u(t)),l+=i[s];var p=o(o({},b),{},((n={})[l]=(b[l]||0)+1,n));return{rolls:i,average:(a.average*(r-1)+a.total)/r,total:l,totals:p}}function m(e){return{rolls:[],average:3.5*e.nbDice,total:0,totals:{}}}var O=function(e){var t=e.value,n={background:"#000",width:3,height:3,borderRadius:"100%",position:"absolute"},a={top:3},c={bottom:3},b={right:3},l={left:3},i={top:8};return r.a.createElement("div",{style:{width:21,height:21,marginRight:10,position:"relative",border:"1px solid #000",borderRadius:"3px"}},1!==t&&r.a.createElement("div",{style:o(o(o({},n),a),l)}),t>3&&r.a.createElement("div",{style:o(o(o({},n),a),b)}),6===t&&r.a.createElement("div",{style:o(o(o({},n),i),l)}),t%2==1&&r.a.createElement("div",{style:o(o(o({},n),i),{left:8})}),6===t&&r.a.createElement("div",{style:o(o(o({},n),i),b)}),t>3&&r.a.createElement("div",{style:o(o(o({},n),c),l)}),1!==t&&r.a.createElement("div",{style:o(o(o({},n),c),b)}))},j=function(e){var t,n=e.label,a=e.max,c=e.nbRolls,l=e.nbValues,i=e.theme,o=a?50*c/a:0,s=350/l,u=(null==i||null===(t=i.colors)||void 0===t?void 0:t.primary)||"#33f";return r.a.createElement(b.c,{flexDirection:"column"},r.a.createElement(b.c,{flexDirection:"row",sx:{justifyContent:"center",alignItems:"flex-end",width:s,height:"50px"}},r.a.createElement("div",{style:{width:.8*s,height:o,backgroundColor:u}})),r.a.createElement(b.c,{flexDirection:"row",sx:{justifyContent:"center",fontSize:Math.min(350/(1.5*l),12)+"px"}},n))},d=function(e){var t,n;function a(){return e.apply(this,arguments)||this}return n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,a.prototype.render=function(){if(null===this.props.data)return null;var e=this.props,t=e.data,n=e.params.nbDice,a=e.theme,c=Number(n),l=6*c-c+1,i=t.rolls,o=t.totals,s=0,u=Array(l).fill(0).map((function(e,t){var n=c+t,a=o[n]||0;return s=Math.max(s,a),{label:n,nbRolls:a}}));return r.a.createElement(b.c,{flexDirection:"column",sx:{justifyContent:"space-between",height:"140px"}},r.a.createElement(b.c,{flexDirection:"row"},i.map((function(e,t){return r.a.createElement(O,{value:e,key:"k-"+t})}))),r.a.createElement(b.c,{flexDirection:"row",sx:{alignItems:"flex-end",height:"80px"}},u.map((function(e){return r.a.createElement(j,Object.assign({},e,{key:e.label,max:s,nbValues:l,theme:a}))}))))},a}(r.a.Component);t.b=function(e){var t=Object(c.e)().theme;return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.a,Object.assign({theme:t,auto:!1,controls:{param:"nbDice",minValue:1,maxValue:6,resetOnChange:!0,label:"Number of dice per roll"},updateData:p,maxTime:1e3,initData:m,initialParams:{nbDice:5}},e),r.a.createElement(d,{theme:t})))}},"2jic":function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return o})),n.d(t,"default",(function(){return u}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp"),r=n("6d3j"),c=n("qEe1"),b=n("IiH9"),l=n("f4hJ"),i=n("FFgS");var o={Title:"Canvas Frame"},s={_frontmatter:o};function u(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},s,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"CanvasFrame")," is a ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/frame-helpers"}),"frame helper")," that makes it easier to use canvas with react-sim."),Object(a.b)("p",null,"It's used in many of the examples such as ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/examples/chaos-game"}),"Chaos Game"),", ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/examples/percolation"}),"Percolation"),") ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/examples/epidemic"}),"Epidemic simulation"),", etc."),Object(a.b)(r.a,{mdxType:"CanvasFrameExample"}),Object(a.b)("h1",{id:"canvasframe-properties"},"CanvasFrame properties"),Object(a.b)("p",null,"Its properties are:"),Object(a.b)(c.default,{mdxType:"CanvasFrameAPI"}),Object(a.b)("h1",{id:"the-draw-function"},"the draw function"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"draw")," function does all the heavy lifting."),Object(a.b)("p",null,"Its argument is an object with the following properties:"),Object(a.b)(b.default,{mdxType:"DrawAPI"}),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"circle")," and ",Object(a.b)("inlineCode",{parentName:"p"},"roundRectangle")," are helper functions to make it easier to draw circles and rounded rectangles with canvas."),Object(a.b)("p",null,"Both take an object as argument with the following properties:"),Object(a.b)(l.default,{mdxType:"CircleAPI"}),Object(a.b)(i.default,{mdxType:"RoundRectangleAPI"}),Object(a.b)("p",null,"so for example, you can have a ",Object(a.b)("inlineCode",{parentName:"p"},"draw")," function that would go like this:"),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"const draw = ({ctx, data, circle, params}) => {\n  const {height, width} = params;\n  ctx.clearReact(0, 0, width, height);\n  data.forEach(d => circle({x: d.x, y: d.y, 2}));\n  ctx.fill();\n}\n")))}u.isMDXComponent=!0},"6d3j":function(e,t,n){"use strict";n.d(t,"a",(function(){return d})),n.d(t,"b",(function(){return y}));n("pJf4"),n("q8oJ"),n("YbXK"),n("cFtU"),n("m210"),n("xtjI"),n("4DPX"),n("Ggvi"),n("rzGZ"),n("Dq+y"),n("8npG"),n("YBKJ"),n("E5k/"),n("n0hJ");var a=n("q1tI"),r=n.n(a),c=n("1uUR"),b=n("VdAu"),l=n("sCKr"),i=n("+CGw");function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function u(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var p,m=function(e){var t=e.height,n=e.width,a=e.balls,r=e.speed;return Array(a).fill(0).map((function(e){return{x:Math.random()*n,y:Math.random()*t,c:"hsl("+Math.floor(360*Math.random())+",85%,57%)",vx:(Math.random()-.5)*r,vy:(Math.random()-.5)*r}}))},O=function(e){var t=e.data,n=e.params;return t.map((function(e){var t=e.x,a=e.y,r=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["x","y"]);return function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){u(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({x:(t+r.vx)%n.width,y:(a+r.vy)%n.height},r)}))},j=function(e){var t=e.ctx,n=e.cachedData,a=e.data,r=e.circle,c=e.params,b=e.tick,l=c.height,i=c.width;t.clearRect(0,0,i,l);for(var o=function(e){var a=b-e;t.globalAlpha=.1+.05*(10-a);var c=.3*(10-a);n[e].forEach((function(e){t.fillStyle=e.c,r({x:e.x,y:e.y,r:c}),t.fill()}))},s=Math.max(b-10,0);s<b;s++)o(s);t.globalAlpha=1,a.forEach((function(e){t.fillStyle=e.c,r({x:e.x,y:e.y,r:3}),t.fill()}))},d=function(e){return r.a.createElement(l.a,Object.assign({initData:m,updateData:O,maxTime:500,initialParams:{height:200,width:332,balls:200,speed:3}},e),r.a.createElement(c.a,{draw:j}))},f=Object(c.i)((function(e){var t=e.data;return r.a.createElement(b.c,{flexDirection:"row",sx:{height:"30px"}},t.rolls.map((function(e,t){return r.a.createElement(i.a,{value:e,key:"k-"+t})})))})),g=[{color:"#33e",label:"Average",accessor:function(e){return Number(e.average.toFixed(2))}},{color:"#e3e",label:"Last roll",accessor:function(e){return e.total}}],h=(p=Array(13).keys(),function(e){if(Array.isArray(e))return o(e)}(p)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(p)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(e,t):void 0}}(p)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).slice(2).map((function(e){return{color:"hsl("+360*(1+e-2)/11+",85%,57%)",label:String(e),accessor:function(t){return t.totals[e]||0}}})),y=function(e){return r.a.createElement(l.a,Object.assign({initData:i.c,updateData:i.d,initialParams:{nbDice:2}},e),r.a.createElement(b.c,{flexDirection:"column"},r.a.createElement(b.e,{sx:{fontSize:1,fontWeight:"bold"}},"Roll:"),r.a.createElement(f,null),r.a.createElement(b.e,{sx:{fontSize:1,fontWeight:"bold"}},"Average rolls:"),r.a.createElement(c.f,{series:g}),r.a.createElement(c.b,{series:g}),r.a.createElement(b.e,{sx:{fontSize:1,fontWeight:"bold"}},"Roll distribution:"),r.a.createElement(c.f,{series:h,stacked:!0}),r.a.createElement(c.b,{series:h.slice(0,6)}),r.a.createElement(c.b,{series:h.slice(6)})))}},FFgS:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return r})),n.d(t,"default",(function(){return b}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp");var r={},c={_frontmatter:r};function b(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"roundRectangle")," takes an object as argument with the following properties:"),Object(a.b)("p",null,"All the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/api/#canvasframe"}),"CanvasFrame")," properties, plus:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",Object.assign({parentName:"tr"},{align:null}),"Name"),Object(a.b)("th",Object.assign({parentName:"tr"},{align:null}),"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"x"),Object(a.b)("br",null),"number"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"x coordinate of top-left corner of rectangle")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"y"),Object(a.b)("br",null),"number"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"y coordinate of top-left corner of rectangle")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"width"),Object(a.b)("br",null),"number"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"Width of rectangle")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"height"),Object(a.b)("br",null),"number"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"Height of rectangle")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"tl"),Object(a.b)("br",null),"number, optional"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"Radius of top-left corner")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"tr"),Object(a.b)("br",null),"number, optional"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"Radius of top-right corner")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"bl"),Object(a.b)("br",null),"number, optional"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"Radius of bottom-left corner")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"br"),Object(a.b)("br",null),"number, optional"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"Radius of botrom-right corner")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"r"),Object(a.b)("br",null),"number, optional"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"Radius of all unspecified corners")))))}b.isMDXComponent=!0},IiH9:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return r})),n.d(t,"default",(function(){return b}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp");var r={},c={_frontmatter:r};function b(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"All the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/api/#canvasframe"}),"CanvasFrame")," properties, plus:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",Object.assign({parentName:"tr"},{align:null}),"Name"),Object(a.b)("th",Object.assign({parentName:"tr"},{align:null}),"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"canvas"),Object(a.b)("br",null),"DOM Node"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"The actual canvas node")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"ctx"),Object(a.b)("br",null),"Canvas rendering context"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"the corresponding 2d context.",Object(a.b)("br",null),"Exactly what you'd get if you typed",Object(a.b)("br",null)," ",Object(a.b)("inlineCode",{parentName:"td"},"const ctx = canvas.getContext('2d');"))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"circle"),Object(a.b)("br",null),"Helper function"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"see ",Object(a.b)("a",Object.assign({parentName:"td"},{href:"/react-sim/api#circle"}),"circle API"))),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"roundRectangle"),Object(a.b)("br",null),"Helper function"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"see ",Object(a.b)("a",Object.assign({parentName:"td"},{href:"/react-sim/api#roundrectangle"}),"roundRectangle API"))))))}b.isMDXComponent=!0},f4hJ:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return r})),n.d(t,"default",(function(){return b}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp");var r={},c={_frontmatter:r};function b(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"circle")," takes an object as argument with the following properties:"),Object(a.b)("p",null,"All the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/api/#canvasframe"}),"CanvasFrame")," properties, plus:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",Object.assign({parentName:"tr"},{align:null}),"Name"),Object(a.b)("th",Object.assign({parentName:"tr"},{align:null}),"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"x"),Object(a.b)("br",null),"number"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"x coordinate of circle center")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"y"),Object(a.b)("br",null),"number"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"y coordinate of circle center")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"r"),Object(a.b)("br",null),"number"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"Radius of circle")))))}b.isMDXComponent=!0},qEe1:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return r})),n.d(t,"default",(function(){return b}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp");var r={},c={_frontmatter:r};function b(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},c=Object.keys(e);for(a=0;a<c.length;a++)n=c[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"All the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/api/#withframe"}),"connected Frame")," context props, plus:"),Object(a.b)("table",null,Object(a.b)("thead",{parentName:"table"},Object(a.b)("tr",{parentName:"thead"},Object(a.b)("th",Object.assign({parentName:"tr"},{align:null}),"Name"),Object(a.b)("th",Object.assign({parentName:"tr"},{align:null}),"Description"))),Object(a.b)("tbody",{parentName:"table"},Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"draw"),Object(a.b)("br",null),"function, optional"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"A function which will be called each time CanvasFrame is updated (ie at each animation cycle)")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"height"),Object(a.b)("br",null),"number, optional"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"The height of the canvas. If ignored, CanvasFrame will used ",Object(a.b)("inlineCode",{parentName:"td"},"params.height"),".")),Object(a.b)("tr",{parentName:"tbody"},Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),Object(a.b)("strong",{parentName:"td"},"width"),Object(a.b)("br",null),"number, optional"),Object(a.b)("td",Object.assign({parentName:"tr"},{align:null}),"The width of the canvas. If ignored, CanvasFrame will used ",Object(a.b)("inlineCode",{parentName:"td"},"params.width"),".")))))}b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-frame-helpers-canvas-frame-mdx-be1bc25c6e1cf2bf106d.js.map