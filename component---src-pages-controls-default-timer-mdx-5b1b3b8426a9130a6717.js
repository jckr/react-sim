(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{OTDG:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return c}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp"),r=n("iKr1"),l=n("hoDs");var i={Title:"Default timer"},m={_frontmatter:i};function c(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},m,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"default-timer"},"Default timer"),Object(a.b)(r.e,{mdxType:"DefaultTimer"}),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"The default timer")),Object(a.b)("p",null,"The following ",Object(a.b)("inlineCode",{parentName:"p"},"Model")," props affect the behavior of the ",Object(a.b)("inlineCode",{parentName:"p"},"Timer"),":"),Object(a.b)(l.e,{mdxType:"DefaultTimerAPI"}),Object(a.b)(r.i,{mdxType:"NegativeMinTime"}),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Timer with negative minTime")),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model minTime={-10} maxTime={0} />\n")),Object(a.b)(r.g,{mdxType:"HideTimerSlider"}),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Timer with showTimeSlider set to false")),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model showTimeSlider={false} />\n")),Object(a.b)(r.f,{mdxType:"HideTimerBlock"}),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"Timer with showTime set to false")),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model showTime={false} />\n")))}c.isMDXComponent=!0},iKr1:function(e,t,n){"use strict";n.d(t,"e",(function(){return c})),n.d(t,"i",(function(){return o})),n.d(t,"f",(function(){return u})),n.d(t,"g",(function(){return s})),n.d(t,"b",(function(){return b})),n.d(t,"q",(function(){return f})),n.d(t,"a",(function(){return d})),n.d(t,"j",(function(){return h})),n.d(t,"n",(function(){return T})),n.d(t,"m",(function(){return g})),n.d(t,"h",(function(){return j})),n.d(t,"k",(function(){return E})),n.d(t,"p",(function(){return y})),n.d(t,"l",(function(){return O})),n.d(t,"o",(function(){return w})),n.d(t,"d",(function(){return k})),n.d(t,"c",(function(){return N}));n("YBKJ"),n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi");var a=n("q1tI"),r=n.n(a),l=n("1uUR"),i=n("VdAu"),m=n("sCKr");var c=function(){return r.a.createElement(m.a,null,r.a.createElement("div",null))},o=function(){return r.a.createElement(m.a,{minTime:-10,maxTime:0},r.a.createElement("div",null))},u=function(){return r.a.createElement(m.a,{showTime:!1},r.a.createElement("div",null))},s=function(){return r.a.createElement(m.a,{showTimeSlider:!1},r.a.createElement("div",null))},p=function(e){var t=e.params,n=(t.delay,t.minTime,t.maxTime,t.ticksPerAnimation,function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(t,["delay","minTime","maxTime","ticksPerAnimation"])),a=e.tick,l=e.showTime;return r.a.createElement("div",null,Object.keys(n).length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement(i.e,{sx:{fontSize:1,fontWeight:"bold"}},"params:"),r.a.createElement("pre",null,JSON.stringify(n,null,2))),l&&r.a.createElement("pre",null,JSON.stringify({tick:a},null,2)))},b=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{checked:!1},controls:{type:"checkbox",label:"Check me",param:"checked"}},r.a.createElement(p,null))},f=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{checked:!1},controls:{type:"toggle",label:"Toggle me",param:"checked"}},r.a.createElement(p,null))},d=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{checked:!1},controls:[[{type:"checkbox",label:"Check me again",param:"checked"},{type:"toggle",label:"Toggle me again",param:"checked"}]]},r.a.createElement(p,null))},h=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"radio",name:"radio-example",label:"Choose one",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},T=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},g=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example-2",param:"options",options:["jet","set","radio"]},{type:"radio",label:"Choose one",name:"radio-example-2",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},j=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{name:""},controls:{type:"input",label:"What is your name?",name:"name",param:"name"}},r.a.createElement(p,null))},E=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{value:0},controls:{type:"range",label:"Choose a value",name:"range",param:"value"}},r.a.createElement(p,null))},y=function(){return r.a.createElement(m.a,{showTimer:!1,controls:{type:"timer",label:"My explicit timer"}},r.a.createElement(p,{showTime:!0}))},O=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[{type:"range",label:"A",name:"a",param:"a"},{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]},r.a.createElement(p,null))},w=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[[{type:"range",label:"A",name:"a",param:"a"}],[{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]]},r.a.createElement(p,null))},v=Object(l.h)((function(e){var t=e.params,n=e.setParams;return r.a.createElement("input",{type:"range",value:t["my-param"],onChange:function(e){return n({"my-param":Number(e.target.value)})}})})),x=Object(l.i)(p),k=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(i.c,{flexDirection:"column"},r.a.createElement(v,null),r.a.createElement(x,null)))},P=Object(l.h)((function(e){var t=e.params,n=e.setParams,a=t["my-param"];return r.a.createElement(l.e,{label:"My range",value:a,setValue:function(e){return n({"my-param":e})},minValue:0,maxValue:100,step:1})})),N=function(){return r.a.createElement(m.a,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(i.c,{flexDirection:"column"},r.a.createElement(x,null),r.a.createElement(P,null)))}}}]);
//# sourceMappingURL=component---src-pages-controls-default-timer-mdx-5b1b3b8426a9130a6717.js.map