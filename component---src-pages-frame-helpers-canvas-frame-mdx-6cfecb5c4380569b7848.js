(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{"+CGw":function(e,t,a){"use strict";a.d(t,"d",(function(){return b})),a.d(t,"c",(function(){return s})),a.d(t,"a",(function(){return p}));a("xtjI"),a("4DPX"),a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi"),a("E5k/"),a("n0hJ"),a("YBKJ");var r=a("q1tI"),n=a.n(r),l=a("1uUR"),i=a("2A+t");function c(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?c(Object(a),!0).forEach((function(t){u(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function u(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function b(e){for(var t,a=e.data,r=e.tick,n=e.params.nbDice,l=a.totals,i=0,c=[],u=0;u<n;u++)c.push(Math.ceil(6*Math.random())),i+=c[u];var b=o(o({},l),{},((t={})[i]=(l[i]||0)+1,t));return{rolls:c,average:(a.average*(r-1)+a.total)/r,total:i,totals:b}}function s(e){return{rolls:[],average:3.5*e.nbDice,total:0,totals:{}}}var p=function(e){var t=e.value,a={background:"#000",width:3,height:3,borderRadius:"100%",position:"absolute"},r={top:3},l={bottom:3},i={right:3},c={left:3},u={top:8};return n.a.createElement("div",{style:{width:21,height:21,marginRight:10,position:"relative",border:"1px solid #000",borderRadius:"3px"}},1!==t&&n.a.createElement("div",{style:o(o(o({},a),r),c)}),t>3&&n.a.createElement("div",{style:o(o(o({},a),r),i)}),6===t&&n.a.createElement("div",{style:o(o(o({},a),u),c)}),t%2==1&&n.a.createElement("div",{style:o(o(o({},a),u),{left:8})}),6===t&&n.a.createElement("div",{style:o(o(o({},a),u),i)}),t>3&&n.a.createElement("div",{style:o(o(o({},a),l),c)}),1!==t&&n.a.createElement("div",{style:o(o(o({},a),l),i)}))},m=function(e){var t,a=e.label,r=e.max,i=e.nbRolls,c=e.nbValues,o=e.theme,u=r?50*i/r:0,b=500/c,s=(null==o||null===(t=o.colors)||void 0===t?void 0:t.primary)||"#33f";return n.a.createElement(l.c,null,n.a.createElement(l.d,{styles:{justifyContent:"center",alignItems:"flex-end",width:b,height:50}},n.a.createElement("div",{style:{width:.8*b,height:u,backgroundColor:s}})),n.a.createElement(l.d,{styles:{justifyContent:"center",fontSize:Math.min(250*c,12)}},a))},f=function(e){var t,a;function r(){return e.apply(this,arguments)||this}return a=e,(t=r).prototype=Object.create(a.prototype),t.prototype.constructor=t,t.__proto__=a,r.prototype.render=function(){if(null===this.props.data)return null;var e=this.props,t=e.data,a=(e.tick,e.params.nbDice),r=e.theme,i=Number(a),c=6*i-i+1,o=t.rolls,u=t.totals,b=0,s=Array(c).fill(0).map((function(e,t){var a=i+t,r=u[a]||0;return b=Math.max(b,r),{label:a,nbRolls:r}}));return n.a.createElement(l.c,{styles:{justifyContent:"space-between",height:"140px"}},n.a.createElement(l.d,null,o.map((function(e,t){return n.a.createElement(p,{value:e,key:"k-"+t})}))),n.a.createElement(l.d,{styles:{alignItems:"flex-end",height:"80px"}},s.map((function(e){return n.a.createElement(m,Object.assign({},e,{key:e.label,max:b,nbValues:c,theme:r}))}))))},r}(n.a.Component);t.b=function(){var e=Object(i.e)().theme;return n.a.createElement(n.a.Fragment,null,n.a.createElement(l.f,{theme:e,auto:!1,controls:{param:"nbDice",minValue:1,maxValue:6,resetOnChange:!0,label:"Number of dice per roll"},updateData:b,maxTime:1e3,initData:s,initialParams:{nbDice:5}},n.a.createElement(f,{theme:e})))}},"2jic":function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return l})),a.d(t,"default",(function(){return c}));a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi"),a("E5k/"),a("q1tI");var r=a("7ljp"),n=a("6d3j");var l={Title:"Canvas Frame"},i={_frontmatter:l};function c(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,["components"]);return Object(r.b)("wrapper",Object.assign({},i,a,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"CanvasFrame")," is a ",Object(r.b)("a",Object.assign({parentName:"p"},{href:"./frame-helpers"}),"frame helper")," that makes it easier to use canvas with react-sim."),Object(r.b)("p",null,"It's used in many of the examples such as ",Object(r.b)("a",Object.assign({parentName:"p"},{href:"./examples/chaos-game"}),"Chaos Game"),", ",Object(r.b)("a",Object.assign({parentName:"p"},{href:"./examples/percolation"}),"Percolation"),") ",Object(r.b)("a",Object.assign({parentName:"p"},{href:"./examples/epidemic"}),"Epidemic simulation"),", etc."),Object(r.b)(n.a,{mdxType:"CanvasFrameExample"}),Object(r.b)("h1",null,"CanvasFrame properties"),Object(r.b)("p",null,"Its properties are:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"all the connected Frame context props (",Object(r.b)("inlineCode",{parentName:"li"},"cachedData"),", ",Object(r.b)("inlineCode",{parentName:"li"},"data"),", ",Object(r.b)("inlineCode",{parentName:"li"},"initData"),", ",Object(r.b)("inlineCode",{parentName:"li"},"params"),", ",Object(r.b)("inlineCode",{parentName:"li"},"results"),", ",Object(r.b)("inlineCode",{parentName:"li"},"tick"),", ",Object(r.b)("inlineCode",{parentName:"li"},"setData")," ),"),Object(r.b)("li",{parentName:"ul"},"draw (function, optional): a function which will be called each time CanvasFrame is updated (ie at each animation cycle)."),Object(r.b)("li",{parentName:"ul"},"height (number, optional): the height of the canvas. If ignored, CanvasFrame will used params.height."),Object(r.b)("li",{parentName:"ul"},"width (number, optional): the width of the canvas. If ignored, CanvasFrame will used params.height.")),Object(r.b)("h1",null,"the draw function"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"draw")," function does all the heavy lifting."),Object(r.b)("p",null,"Its argument is an object with the following properties:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"all the CanvasFrame properties (data, tick, etc. - see above),"),Object(r.b)("li",{parentName:"ul"},"canvas (DOM Node): the actual canvas node."),Object(r.b)("li",{parentName:"ul"},"ctx: (canvas rendering context): the corresponding 2d context. Exactly what you'd get if you typed ",Object(r.b)("inlineCode",{parentName:"li"},"const ctx = canvas.getContext('2d');"),"."),Object(r.b)("li",{parentName:"ul"},"circle (helper function): see below"),Object(r.b)("li",{parentName:"ul"},"roundRectangle (helper function): see below")),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"circle")," and ",Object(r.b)("inlineCode",{parentName:"p"},"roundRectangle")," are helper functions to make it easier to draw circles and rounded rectangles with canvas."),Object(r.b)("p",null,"Both take an object as argument with the following properties:"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"circle:"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"x: x coordinate of circle center,"),Object(r.b)("li",{parentName:"ul"},"y: y coordinate of circle center,"),Object(r.b)("li",{parentName:"ul"},"r: radius of circle"))),Object(r.b)("li",{parentName:"ul"},Object(r.b)("p",{parentName:"li"},"roundRectangle:"),Object(r.b)("ul",{parentName:"li"},Object(r.b)("li",{parentName:"ul"},"x: x coordinate of top-left corner of rectangle,"),Object(r.b)("li",{parentName:"ul"},"y: y coordinate of top-left corner of rectangle,"),Object(r.b)("li",{parentName:"ul"},"width: width of rectangle,"),Object(r.b)("li",{parentName:"ul"},"height: height of rectangle,"),Object(r.b)("li",{parentName:"ul"},"tl: radius of top-left corner,"),Object(r.b)("li",{parentName:"ul"},"tr: radius of top-right corner,"),Object(r.b)("li",{parentName:"ul"},"bl: radius of bottom-left corner,"),Object(r.b)("li",{parentName:"ul"},"br: radius of botrom-right corner,"),Object(r.b)("li",{parentName:"ul"},"r: radius of all unspecified corners.")))),Object(r.b)("p",null,"so for example, you can have a ",Object(r.b)("inlineCode",{parentName:"p"},"draw")," function that would go like this:"),Object(r.b)("pre",null,Object(r.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"const draw = ({ctx, data, circle, params}) => {\n  const {height, width} = params;\n  ctx.clearReact(0, 0, width, height);\n  data.forEach(d => circle({x: d.x, y: d.y, 2}));\n  ctx.fill();\n}\n")))}c.isMDXComponent=!0},"6d3j":function(e,t,a){"use strict";a.d(t,"a",(function(){return h})),a.d(t,"b",(function(){return g}));a("pJf4"),a("q8oJ"),a("YbXK"),a("cFtU"),a("m210"),a("xtjI"),a("4DPX"),a("Ggvi"),a("rzGZ"),a("Dq+y"),a("8npG"),a("YBKJ"),a("n0hJ");var r=a("q1tI"),n=a.n(r),l=a("1uUR"),i=a("VdAu"),c=a("+CGw");function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,r=new Array(t);a<t;a++)r[a]=e[a];return r}function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var s,p=function(e){return n.a.createElement(i.c,{sx:{border:"1px solid currentcolor",p:2,width:"fit-content"}},n.a.createElement(l.f,e))},m=function(e){var t=e.height,a=e.width,r=e.balls,n=e.speed;return Array(r).fill(0).map((function(e){return{x:Math.random()*a,y:Math.random()*t,c:"hsl("+Math.floor(360*Math.random())+",85%,57%)",vx:(Math.random()-.5)*n,vy:(Math.random()-.5)*n}}))},f=function(e){var t=e.data,a=e.params;return t.map((function(e){var t=e.x,r=e.y,n=function(e,t){if(null==e)return{};var a,r,n={},l=Object.keys(e);for(r=0;r<l.length;r++)a=l[r],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,["x","y"]);return function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){b(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({x:(t+n.vx)%a.width,y:(r+n.vy)%a.height},n)}))},d=function(e){var t=e.ctx,a=e.cachedData,r=e.data,n=e.circle,l=e.params,i=e.tick,c=l.height,o=l.width;t.clearRect(0,0,o,c);for(var u=function(e){var r=i-e;t.globalAlpha=.1+.05*(10-r);var l=.3*(10-r);a[e].forEach((function(e){t.fillStyle=e.c,n({x:e.x,y:e.y,r:l}),t.fill()}))},b=Math.max(i-10,0);b<i;b++)u(b);t.globalAlpha=1,r.forEach((function(e){t.fillStyle=e.c,n({x:e.x,y:e.y,r:3}),t.fill()}))},h=function(){return n.a.createElement(p,{initData:m,updateData:f,maxTime:500,initialParams:{height:200,width:500,balls:200,speed:3}},n.a.createElement(l.a,{draw:d}))},O=Object(l.k)((function(e){var t=e.data;return n.a.createElement(i.c,{flexDirection:"row",sx:{height:"30px"}},t.rolls.map((function(e,t){return n.a.createElement(c.a,{value:e,key:"k-"+t})})))})),j=[{color:"#33e",label:"Average",accessor:function(e){return Number(e.average.toFixed(2))}},{color:"#e3e",label:"Last roll",accessor:function(e){return e.total}}],y=(s=Array(13).keys(),function(e){if(Array.isArray(e))return o(e)}(s)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(s)||function(e,t){if(e){if("string"==typeof e)return o(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?o(e,t):void 0}}(s)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).slice(2).map((function(e){return{color:"hsl("+360*(1+e-2)/11+",85%,57%)",label:String(e),accessor:function(t){return t.totals[e]||0}}})),g=function(){return n.a.createElement(p,{initData:c.c,updateData:c.d,initialParams:{nbDice:2}},n.a.createElement(i.c,{flexDirection:"column"},n.a.createElement(i.e,{sx:{fontSize:1,fontWeight:"bold"}},"Roll:"),n.a.createElement(O,null),n.a.createElement(i.e,{sx:{fontSize:1,fontWeight:"bold"}},"Average rolls:"),n.a.createElement(l.h,{series:j}),n.a.createElement(l.b,{series:j}),n.a.createElement(i.e,{sx:{fontSize:1,fontWeight:"bold"}},"Roll distribution:"),n.a.createElement(l.h,{series:y,stacked:!0}),n.a.createElement(l.b,{series:y.slice(0,6)}),n.a.createElement(l.b,{series:y.slice(6)})))}}}]);
//# sourceMappingURL=component---src-pages-frame-helpers-canvas-frame-mdx-6cfecb5c4380569b7848.js.map