(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{iKr1:function(e,t,n){"use strict";n.d(t,"e",(function(){return u})),n.d(t,"i",(function(){return c})),n.d(t,"f",(function(){return m})),n.d(t,"g",(function(){return s})),n.d(t,"b",(function(){return p})),n.d(t,"q",(function(){return h})),n.d(t,"a",(function(){return d})),n.d(t,"j",(function(){return f})),n.d(t,"n",(function(){return y})),n.d(t,"m",(function(){return E})),n.d(t,"h",(function(){return g})),n.d(t,"k",(function(){return w})),n.d(t,"p",(function(){return v})),n.d(t,"l",(function(){return j})),n.d(t,"o",(function(){return x})),n.d(t,"d",(function(){return k})),n.d(t,"c",(function(){return C}));n("YBKJ"),n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi");var a=n("q1tI"),r=n.n(a),l=n("1uUR"),i=n("VdAu"),o=n("sCKr");var u=function(){return r.a.createElement(o.b,null,r.a.createElement("div",null))},c=function(){return r.a.createElement(o.b,{minTime:-10,maxTime:0},r.a.createElement("div",null))},m=function(){return r.a.createElement(o.b,{showTime:!1},r.a.createElement("div",null))},s=function(){return r.a.createElement(o.b,{showTimeSlider:!1},r.a.createElement("div",null))},b=function(e){var t=e.params,n=(t.delay,t.minTime,t.maxTime,t.ticksPerAnimation,function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(t,["delay","minTime","maxTime","ticksPerAnimation"])),a=e.tick,l=e.showTime;return r.a.createElement("div",null,Object.keys(n).length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement("label",null,"params:"),r.a.createElement("pre",null,JSON.stringify(n,null,2))),l&&r.a.createElement("pre",null,JSON.stringify({tick:a},null,2)))},p=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{checked:!1},controls:{type:"checkbox",label:"Check me",param:"checked"}},r.a.createElement(b,null))},h=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{checked:!1},controls:{type:"toggle",label:"Toggle me",param:"checked"}},r.a.createElement(b,null))},d=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{checked:!1},controls:[[{type:"checkbox",label:"Check me again",param:"checked"},{type:"toggle",label:"Toggle me again",param:"checked"}]]},r.a.createElement(b,null))},f=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"radio",name:"radio-example",label:"Choose one",param:"options",options:["jet","set","radio"]}]},r.a.createElement(b,null))},y=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example",param:"options",options:["jet","set","radio"]}]},r.a.createElement(b,null))},E=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example-2",param:"options",options:["jet","set","radio"]},{type:"radio",label:"Choose one",name:"radio-example-2",param:"options",options:["jet","set","radio"]}]},r.a.createElement(b,null))},g=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{name:""},controls:{type:"input",label:"What is your name?",name:"name",param:"name"}},r.a.createElement(b,null))},w=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{value:0},controls:{type:"range",label:"Choose a value",name:"range",param:"value"}},r.a.createElement(b,null))},v=function(){return r.a.createElement(o.b,{showTimer:!1,controls:{type:"timer",label:"My explicit timer"}},r.a.createElement(b,{showTime:!0}))},j=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[{type:"range",label:"A",name:"a",param:"a"},{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]},r.a.createElement(b,null))},x=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[[{type:"range",label:"A",name:"a",param:"a"}],[{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]]},r.a.createElement(b,null))},T=Object(l.h)((function(e){var t=e.params,n=e.setParams;return r.a.createElement("input",{type:"range",value:t["my-param"],onChange:function(e){return n({"my-param":Number(e.target.value)})}})})),O=Object(l.i)(b),k=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(i.c,{flexDirection:"column"},r.a.createElement(T,null),r.a.createElement(O,null)))},P=Object(l.h)((function(e){var t=e.params,n=e.setParams,a=t["my-param"];return r.a.createElement(l.e,{label:"My range",value:a,setValue:function(e){return n({"my-param":e})},minValue:0,maxValue:100,step:1})})),C=function(){return r.a.createElement(o.b,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(i.c,{flexDirection:"column"},r.a.createElement(O,null),r.a.createElement(P,null)))}},sCKr:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"a",(function(){return u}));var a=n("q1tI"),r=n.n(a),l=n("1uUR"),i=n("VdAu"),o=function(e){return r.a.createElement(i.c,{sx:{border:"1px solid currentcolor",p:2}},r.a.createElement(l.d,e))},u=function(e){return r.a.createElement(i.c,{sx:{border:"1px solid currentcolor",p:2,width:"fit-content"}},r.a.createElement(l.d,e))}},xFhf:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return l})),n.d(t,"default",(function(){return o}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp"),r=n("iKr1");var l={Title:"Range"},i={_frontmatter:l};function o(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},i,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"range"},"Range"),Object(a.b)("p",null,"The Range control is a slider that let a user choose a value between a minimum and a maximum, and that's the default control."),Object(a.b)("p",null,"It has more properties than the typical control:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"maxValue (number, defaults to 100): the maximum you can set your value to using this control."),Object(a.b)("li",{parentName:"ul"},"minValue (number, defaults to 0): the minimum value for your control."),Object(a.b)("li",{parentName:"ul"},"shouldDisplayLabel (boolean, true by default): whether the label will be shown."),Object(a.b)("li",{parentName:"ul"},"shouldDisplayMaxValue (boolean, true by default): whether the max value will be shown after the slider."),Object(a.b)("li",{parentName:"ul"},"shouldDisplayMinValue (boolean, true by default): whether the min value will be shown before the slider."),Object(a.b)("li",{parentName:"ul"},"shouldDisplaySlider (boolean, true by default): whether the slider will be shown (if false, min and max values are not shown either)."),Object(a.b)("li",{parentName:"ul"},"shouldDisplayValue (boolean, true by default): whether the value will be shown, next to the label"),Object(a.b)("li",{parentName:"ul"},"step (number, defaults to 1): by how much the user can change the value.")),Object(a.b)(r.k,{mdxType:"RangeExample"}),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model\n  showTimer={false}\n  initialParams={{ value: 0 }}\n  controls={{\n    type: 'range',\n    label: 'Choose a value',\n    name: 'range',\n    param: 'value',\n  }}\n/>\n")))}o.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-controls-range-mdx-8b4d0e26d5eaec92bf08.js.map