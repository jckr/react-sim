(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{iKr1:function(e,t,n){"use strict";n.d(t,"e",(function(){return u})),n.d(t,"i",(function(){return s})),n.d(t,"f",(function(){return p})),n.d(t,"g",(function(){return d})),n.d(t,"b",(function(){return f})),n.d(t,"q",(function(){return h})),n.d(t,"a",(function(){return y})),n.d(t,"j",(function(){return E})),n.d(t,"n",(function(){return T})),n.d(t,"m",(function(){return g})),n.d(t,"h",(function(){return j})),n.d(t,"k",(function(){return w})),n.d(t,"p",(function(){return x})),n.d(t,"l",(function(){return O})),n.d(t,"o",(function(){return k})),n.d(t,"d",(function(){return C})),n.d(t,"c",(function(){return M}));var a=n("zLVn"),r=n("q1tI"),l=n.n(r),i=n("1uUR"),o=n("VdAu"),m=n("sCKr"),c=["delay","minTime","maxTime","ticksPerAnimation"],u=function(){return l.a.createElement(m.a,null,l.a.createElement("div",null))},s=function(){return l.a.createElement(m.a,{minTime:-10,maxTime:0},l.a.createElement("div",null))},p=function(){return l.a.createElement(m.a,{showTime:!1},l.a.createElement("div",null))},d=function(){return l.a.createElement(m.a,{showTimeSlider:!1},l.a.createElement("div",null))},b=function(e){var t=e.params,n=(t.delay,t.minTime,t.maxTime,t.ticksPerAnimation,Object(a.a)(t,c)),r=e.tick,i=e.showTime;return l.a.createElement("div",null,Object.keys(n).length>0&&l.a.createElement(l.a.Fragment,null,l.a.createElement(o.e,{sx:{fontSize:1,fontWeight:"bold"}},"params:"),l.a.createElement("pre",null,JSON.stringify(n,null,2))),i&&l.a.createElement("pre",null,JSON.stringify({tick:r},null,2)))},f=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{checked:!1},controls:{type:"checkbox",label:"Check me",param:"checked"}},l.a.createElement(b,null))},h=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{checked:!1},controls:{type:"toggle",label:"Toggle me",param:"checked"}},l.a.createElement(b,null))},y=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{checked:!1},controls:[[{type:"checkbox",label:"Check me again",param:"checked"},{type:"toggle",label:"Toggle me again",param:"checked"}]]},l.a.createElement(b,null))},E=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"radio",name:"radio-example",label:"Choose one",param:"options",options:["jet","set","radio"]}]},l.a.createElement(b,null))},T=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example",param:"options",options:["jet","set","radio"]}]},l.a.createElement(b,null))},g=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example-2",param:"options",options:["jet","set","radio"]},{type:"radio",label:"Choose one",name:"radio-example-2",param:"options",options:["jet","set","radio"]}]},l.a.createElement(b,null))},j=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{name:""},controls:{type:"input",label:"What is your name?",name:"name",param:"name"}},l.a.createElement(b,null))},w=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{value:0},controls:{type:"range",label:"Choose a value",name:"range",param:"value"}},l.a.createElement(b,null))},x=function(){return l.a.createElement(m.a,{showTimer:!1,controls:{type:"timer",label:"My explicit timer"}},l.a.createElement(b,{showTime:!0}))},O=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[{type:"range",label:"A",name:"a",param:"a"},{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]},l.a.createElement(b,null))},k=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[[{type:"range",label:"A",name:"a",param:"a"}],[{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]]},l.a.createElement(b,null))},v=Object(i.h)((function(e){var t=e.params,n=e.setParams;return l.a.createElement("input",{type:"range",value:t["my-param"],onChange:function(e){return n({"my-param":Number(e.target.value)})}})})),P=Object(i.i)(b),C=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{"my-param":50}},l.a.createElement(o.c,{flexDirection:"column"},l.a.createElement(v,null),l.a.createElement(P,null)))},N=Object(i.h)((function(e){var t=e.params,n=e.setParams,a=t["my-param"];return l.a.createElement(i.e,{label:"My range",value:a,setValue:function(e){return n({"my-param":e})},minValue:0,maxValue:100,step:1})})),M=function(){return l.a.createElement(m.a,{showTimer:!1,initialParams:{"my-param":50}},l.a.createElement(o.c,{flexDirection:"column"},l.a.createElement(P,null),l.a.createElement(N,null)))}},szIz:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return m})),n.d(t,"default",(function(){return u}));var a=n("zLVn"),r=(n("q1tI"),n("7ljp")),l=n("iKr1"),i=n("hoDs"),o=["components"],m={},c={_frontmatter:m};function u(e){var t=e.components,n=Object(a.a)(e,o);return Object(r.b)("wrapper",Object.assign({},c,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h1",{id:"timer"},"Timer"),Object(r.b)("p",null,"You can also explicitly specify your timer, so it can be anywhere you want in the controls, not just at the very end (default)."),Object(r.b)(l.p,{mdxType:"TimerExample"}),"The Timer takes the following props:",Object(r.b)(i.q,{mdxType:"TimerAPI"}),Object(r.b)("pre",null,Object(r.b)("code",{parentName:"pre",className:"language-jsx"},"<Model\n  showTimer={false}\n  controls={{\n    type: 'timer',\n    label: 'My explicit timer',\n  }}\n/>\n")),Object(r.b)("p",null,"If you explictly include a ",Object(r.b)("inlineCode",{parentName:"p"},"timer")," through the ",Object(r.b)("inlineCode",{parentName:"p"},"controls")," prop of ",Object(r.b)("inlineCode",{parentName:"p"},"Model"),", then the ",Object(r.b)("a",{parentName:"p",href:"/react-sim/controls/default-timer"},"default timer")," won't be added at the end."))}u.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-controls-timer-mdx-c6cc47d400a366a6f2dd.js.map