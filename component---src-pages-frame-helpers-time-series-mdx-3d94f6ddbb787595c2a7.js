(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{"+CGw":function(e,t,r){"use strict";r.d(t,"d",(function(){return p})),r.d(t,"c",(function(){return m})),r.d(t,"a",(function(){return f}));r("xtjI"),r("4DPX"),r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("E5k/"),r("n0hJ"),r("YBKJ");var n=r("q1tI"),a=r.n(n),i=r("2A+t"),o=r("VdAu"),c=r("sCKr");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var b=function(e){return Math.ceil(6*e())};function p(e,t){var r,n=e.data,a=e.tick,i=e.params.nbDice;void 0===t&&(t=Math.random);for(var o=n.totals,c=0,l=[],s=0;s<i;s++)l.push(b(t)),c+=l[s];var p=u(u({},o),{},((r={})[c]=(o[c]||0)+1,r));return{rolls:l,average:(n.average*(a-1)+n.total)/a,total:c,totals:p}}function m(e){return{rolls:[],average:3.5*e.nbDice,total:0,totals:{}}}var f=function(e){var t=e.value,r={background:"#000",width:3,height:3,borderRadius:"100%",position:"absolute"},n={top:3},i={bottom:3},o={right:3},c={left:3},l={top:8};return a.a.createElement("div",{style:{width:21,height:21,marginRight:10,position:"relative",border:"1px solid #000",borderRadius:"3px"}},1!==t&&a.a.createElement("div",{style:u(u(u({},r),n),c)}),t>3&&a.a.createElement("div",{style:u(u(u({},r),n),o)}),6===t&&a.a.createElement("div",{style:u(u(u({},r),l),c)}),t%2==1&&a.a.createElement("div",{style:u(u(u({},r),l),{left:8})}),6===t&&a.a.createElement("div",{style:u(u(u({},r),l),o)}),t>3&&a.a.createElement("div",{style:u(u(u({},r),i),c)}),1!==t&&a.a.createElement("div",{style:u(u(u({},r),i),o)}))},d=function(e){var t,r=e.label,n=e.max,i=e.nbRolls,c=e.nbValues,l=e.theme,u=n?50*i/n:0,s=500/c,b=(null==l||null===(t=l.colors)||void 0===t?void 0:t.primary)||"#33f";return a.a.createElement(o.c,{flexDirection:"column"},a.a.createElement(o.c,{flexDirection:"row",sx:{justifyContent:"center",alignItems:"flex-end",width:s,height:"50px"}},a.a.createElement("div",{style:{width:.8*s,height:u,backgroundColor:b}})),a.a.createElement(o.c,{flexDirection:"row",sx:{justifyContent:"center",fontSize:Math.min(250*c,12)+"px"}},r))},h=function(e){var t,r;function n(){return e.apply(this,arguments)||this}return r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,n.prototype.render=function(){if(null===this.props.data)return null;var e=this.props,t=e.data,r=(e.tick,e.params.nbDice),n=e.theme,i=Number(r),c=6*i-i+1,l=t.rolls,u=t.totals,s=0,b=Array(c).fill(0).map((function(e,t){var r=i+t,n=u[r]||0;return s=Math.max(s,n),{label:r,nbRolls:n}}));return a.a.createElement(o.c,{flexDirection:"column",sx:{justifyContent:"space-between",height:"140px"}},a.a.createElement(o.c,{flexDirection:"row"},l.map((function(e,t){return a.a.createElement(f,{value:e,key:"k-"+t})}))),a.a.createElement(o.c,{flexDirection:"row",sx:{alignItems:"flex-end",height:"80px"}},b.map((function(e){return a.a.createElement(d,Object.assign({},e,{key:e.label,max:s,nbValues:c,theme:n}))}))))},n}(a.a.Component);t.b=function(){var e=Object(i.e)().theme;return a.a.createElement(a.a.Fragment,null,a.a.createElement(c.a,{theme:e,auto:!1,controls:{param:"nbDice",minValue:1,maxValue:6,resetOnChange:!0,label:"Number of dice per roll"},updateData:p,maxTime:1e3,initData:m,initialParams:{nbDice:5}},a.a.createElement(h,{theme:e})))}},"6d3j":function(e,t,r){"use strict";r.d(t,"a",(function(){return h})),r.d(t,"b",(function(){return g}));r("pJf4"),r("q8oJ"),r("YbXK"),r("cFtU"),r("m210"),r("xtjI"),r("4DPX"),r("Ggvi"),r("rzGZ"),r("Dq+y"),r("8npG"),r("YBKJ"),r("n0hJ");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("VdAu"),c=r("sCKr"),l=r("+CGw");function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function b(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var p,m=function(e){var t=e.height,r=e.width,n=e.balls,a=e.speed;return Array(n).fill(0).map((function(e){return{x:Math.random()*r,y:Math.random()*t,c:"hsl("+Math.floor(360*Math.random())+",85%,57%)",vx:(Math.random()-.5)*a,vy:(Math.random()-.5)*a}}))},f=function(e){var t=e.data,r=e.params;return t.map((function(e){var t=e.x,n=e.y,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,["x","y"]);return function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){b(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}({x:(t+a.vx)%r.width,y:(n+a.vy)%r.height},a)}))},d=function(e){var t=e.ctx,r=e.cachedData,n=e.data,a=e.circle,i=e.params,o=e.tick,c=i.height,l=i.width;t.clearRect(0,0,l,c);for(var u=function(e){var n=o-e;t.globalAlpha=.1+.05*(10-n);var i=.3*(10-n);r[e].forEach((function(e){t.fillStyle=e.c,a({x:e.x,y:e.y,r:i}),t.fill()}))},s=Math.max(o-10,0);s<o;s++)u(s);t.globalAlpha=1,n.forEach((function(e){t.fillStyle=e.c,a({x:e.x,y:e.y,r:3}),t.fill()}))},h=function(){return a.a.createElement(c.a,{initData:m,updateData:f,maxTime:500,initialParams:{height:200,width:500,balls:200,speed:3}},a.a.createElement(i.a,{draw:d}))},y=Object(i.i)((function(e){var t=e.data;return a.a.createElement(o.c,{flexDirection:"row",sx:{height:"30px"}},t.rolls.map((function(e,t){return a.a.createElement(l.a,{value:e,key:"k-"+t})})))})),v=[{color:"#33e",label:"Average",accessor:function(e){return Number(e.average.toFixed(2))}},{color:"#e3e",label:"Last roll",accessor:function(e){return e.total}}],O=(p=Array(13).keys(),function(e){if(Array.isArray(e))return u(e)}(p)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(p)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}(p)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).slice(2).map((function(e){return{color:"hsl("+360*(1+e-2)/11+",85%,57%)",label:String(e),accessor:function(t){return t.totals[e]||0}}})),g=function(){return a.a.createElement(c.a,{initData:l.c,updateData:l.d,initialParams:{nbDice:2}},a.a.createElement(o.c,{flexDirection:"column"},a.a.createElement(o.e,{sx:{fontSize:1,fontWeight:"bold"}},"Roll:"),a.a.createElement(y,null),a.a.createElement(o.e,{sx:{fontSize:1,fontWeight:"bold"}},"Average rolls:"),a.a.createElement(i.f,{series:v}),a.a.createElement(i.b,{series:v}),a.a.createElement(o.e,{sx:{fontSize:1,fontWeight:"bold"}},"Roll distribution:"),a.a.createElement(i.f,{series:O,stacked:!0}),a.a.createElement(i.b,{series:O.slice(0,6)}),a.a.createElement(i.b,{series:O.slice(6)})))}},"8hjj":function(e,t,r){"use strict";r.r(t),r.d(t,"_frontmatter",(function(){return o})),r.d(t,"default",(function(){return l}));r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("E5k/"),r("q1tI");var n=r("7ljp"),a=r("6d3j"),i=r("hoDs");var o={Title:"Time Series, Counter, Indicator"},c={_frontmatter:o};function l(e){var t=e.components,r=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,["components"]);return Object(n.b)("wrapper",Object.assign({},c,r,{components:t,mdxType:"MDXLayout"}),Object(n.b)("p",null,Object(n.b)("inlineCode",{parentName:"p"},"Time Series")," is a ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"./frame-helpers"}),"frame helper")," with which you can plot some changes in your data object during your simulation."),Object(n.b)(a.b,{mdxType:"TimeSeriesExample"}),Object(n.b)("p",null,"In this example, we are throwing 2 dice 100 times, and we are plotting the average value of the roll during the process.\nWe are also looking at the distribution of the rolls."),Object(n.b)("h2",{id:"series-parameter"},"Series parameter"),Object(n.b)("p",null,Object(n.b)("inlineCode",{parentName:"p"},"TimeSeries"),", ",Object(n.b)("inlineCode",{parentName:"p"},"Counter")," and ",Object(n.b)("inlineCode",{parentName:"p"},"Indicator")," all rely on a parameter called ",Object(n.b)("inlineCode",{parentName:"p"},"series"),"."),Object(n.b)("p",null,Object(n.b)("inlineCode",{parentName:"p"},"TimeSeries")," and ",Object(n.b)("inlineCode",{parentName:"p"},"Counter")," can take either an array of series or a single series, ",Object(n.b)("inlineCode",{parentName:"p"},"Indicator")," only takes a single series."),Object(n.b)(i.o,{mdxType:"SeriesAPI"}),Object(n.b)("h2",{id:"timeseries"},"TimeSeries"),Object(n.b)(i.p,{mdxType:"TimeSeriesAPI"}),Object(n.b)("h2",{id:"counter"},"Counter"),Object(n.b)(i.d,{mdxType:"CounterAPI"}),Object(n.b)("h2",{id:"indicator"},"Indicator"),Object(n.b)(i.h,{mdxType:"IndicatorAPI"}))}l.isMDXComponent=!0},sCKr:function(e,t,r){"use strict";r.d(t,"b",(function(){return c})),r.d(t,"a",(function(){return l}));var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("VdAu"),c=function(e){return a.a.createElement(o.c,{sx:{border:"1px solid currentcolor",p:2}},a.a.createElement(i.d,e))},l=function(e){return a.a.createElement(o.c,{sx:{border:"1px solid currentcolor",p:2,width:"fit-content"}},a.a.createElement(i.d,e))}}}]);
//# sourceMappingURL=component---src-pages-frame-helpers-time-series-mdx-3d94f6ddbb787595c2a7.js.map