(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{"BMd/":function(e,n,a){"use strict";a.r(n),a.d(n,"_frontmatter",(function(){return l})),a.d(n,"default",(function(){return o}));a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi"),a("E5k/"),a("q1tI");var t=a("7ljp"),r=a("iKr1");var l={},i={_frontmatter:l};function o(e){var n=e.components,a=function(e,n){if(null==e)return{};var a,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["components"]);return Object(t.b)("wrapper",Object.assign({},i,a,{components:n,mdxType:"MDXLayout"}),Object(t.b)(r.o,{mdxType:"SlidersOnTwoRowsExample"}))}o.isMDXComponent=!0},iKr1:function(e,n,a){"use strict";a.d(n,"e",(function(){return m})),a.d(n,"i",(function(){return c})),a.d(n,"f",(function(){return u})),a.d(n,"g",(function(){return s})),a.d(n,"b",(function(){return f})),a.d(n,"q",(function(){return d})),a.d(n,"a",(function(){return E})),a.d(n,"j",(function(){return h})),a.d(n,"n",(function(){return b})),a.d(n,"m",(function(){return y})),a.d(n,"h",(function(){return g})),a.d(n,"k",(function(){return T})),a.d(n,"p",(function(){return w})),a.d(n,"l",(function(){return v})),a.d(n,"o",(function(){return k})),a.d(n,"d",(function(){return P})),a.d(n,"c",(function(){return C}));a("YBKJ"),a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi");var t=a("q1tI"),r=a.n(t),l=a("1uUR"),i=a("VdAu"),o=a("sCKr");var m=function(){return r.a.createElement(o.a,null,r.a.createElement("div",null))},c=function(){return r.a.createElement(o.a,{minTime:-10,maxTime:0},r.a.createElement("div",null))},u=function(){return r.a.createElement(o.a,{showTime:!1},r.a.createElement("div",null))},s=function(){return r.a.createElement(o.a,{showTimeSlider:!1},r.a.createElement("div",null))},p=function(e){var n=e.params,a=(n.delay,n.minTime,n.maxTime,n.ticksPerAnimation,function(e,n){if(null==e)return{};var a,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(n,["delay","minTime","maxTime","ticksPerAnimation"])),t=e.tick,l=e.showTime;return r.a.createElement("div",null,Object.keys(a).length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement(i.e,{sx:{fontSize:1,fontWeight:"bold"}},"params:"),r.a.createElement("pre",null,JSON.stringify(a,null,2))),l&&r.a.createElement("pre",null,JSON.stringify({tick:t},null,2)))},f=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{checked:!1},controls:{type:"checkbox",label:"Check me",param:"checked"}},r.a.createElement(p,null))},d=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{checked:!1},controls:{type:"toggle",label:"Toggle me",param:"checked"}},r.a.createElement(p,null))},E=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{checked:!1},controls:[[{type:"checkbox",label:"Check me again",param:"checked"},{type:"toggle",label:"Toggle me again",param:"checked"}]]},r.a.createElement(p,null))},h=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"radio",name:"radio-example",label:"Choose one",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},b=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},y=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example-2",param:"options",options:["jet","set","radio"]},{type:"radio",label:"Choose one",name:"radio-example-2",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},g=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{name:""},controls:{type:"input",label:"What is your name?",name:"name",param:"name"}},r.a.createElement(p,null))},T=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{value:0},controls:{type:"range",label:"Choose a value",name:"range",param:"value"}},r.a.createElement(p,null))},w=function(){return r.a.createElement(o.a,{showTimer:!1,controls:{type:"timer",label:"My explicit timer"}},r.a.createElement(p,{showTime:!0}))},v=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[{type:"range",label:"A",name:"a",param:"a"},{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]},r.a.createElement(p,null))},k=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[[{type:"range",label:"A",name:"a",param:"a"}],[{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]]},r.a.createElement(p,null))},x=Object(l.h)((function(e){var n=e.params,a=e.setParams;return r.a.createElement("input",{type:"range",value:n["my-param"],onChange:function(e){return a({"my-param":Number(e.target.value)})}})})),j=Object(l.i)(p),P=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(i.c,{flexDirection:"column"},r.a.createElement(x,null),r.a.createElement(j,null)))},O=Object(l.h)((function(e){var n=e.params,a=e.setParams,t=n["my-param"];return r.a.createElement(l.e,{label:"My range",value:t,setValue:function(e){return a({"my-param":e})},minValue:0,maxValue:100,step:1})})),C=function(){return r.a.createElement(o.a,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(i.c,{flexDirection:"column"},r.a.createElement(j,null),r.a.createElement(O,null)))}}}]);
//# sourceMappingURL=component---src-pages-on-two-rows-mdx-d625246fbefa40ed5c6a.js.map