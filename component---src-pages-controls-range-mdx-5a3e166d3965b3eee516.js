(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{iKr1:function(e,t,a){"use strict";a.d(t,"e",(function(){return u})),a.d(t,"i",(function(){return m})),a.d(t,"f",(function(){return c})),a.d(t,"g",(function(){return s})),a.d(t,"b",(function(){return b})),a.d(t,"q",(function(){return h})),a.d(t,"a",(function(){return f})),a.d(t,"j",(function(){return d})),a.d(t,"n",(function(){return y})),a.d(t,"m",(function(){return E})),a.d(t,"h",(function(){return g})),a.d(t,"k",(function(){return w})),a.d(t,"p",(function(){return j})),a.d(t,"l",(function(){return v})),a.d(t,"o",(function(){return T})),a.d(t,"d",(function(){return k})),a.d(t,"c",(function(){return N}));a("YBKJ"),a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi");var n=a("q1tI"),r=a.n(n),l=a("1uUR"),i=a("VdAu");var o=function(e){return r.a.createElement(i.c,{sx:{border:"1px solid #000",p:2}},r.a.createElement(l.f,e))},u=function(){return r.a.createElement(o,null,r.a.createElement("div",null))},m=function(){return r.a.createElement(o,{minTime:-10,maxTime:0},r.a.createElement("div",null))},c=function(){return r.a.createElement(o,{showTime:!1},r.a.createElement("div",null))},s=function(){return r.a.createElement(o,{showTimeSlider:!1},r.a.createElement("div",null))},p=function(e){var t=e.params,a=(t.delay,t.minTime,t.maxTime,t.ticksPerAnimation,function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(t,["delay","minTime","maxTime","ticksPerAnimation"])),n=e.tick,l=e.showTime;return r.a.createElement("div",null,Object.keys(a).length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement("label",null,"params:"),r.a.createElement("pre",null,JSON.stringify(a,null,2))),l&&r.a.createElement("pre",null,JSON.stringify({tick:n},null,2)))},b=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{checked:!1},controls:{type:"checkbox",label:"Check me",param:"checked"}},r.a.createElement(p,null))},h=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{checked:!1},controls:{type:"toggle",label:"Toggle me",param:"checked"}},r.a.createElement(p,null))},f=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{checked:!1},controls:[[{type:"checkbox",label:"Check me again",param:"checked"},{type:"toggle",label:"Toggle me again",param:"checked"}]]},r.a.createElement(p,null))},d=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"radio",name:"radio-example",label:"Choose one",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},y=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},E=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example-2",param:"options",options:["jet","set","radio"]},{type:"radio",label:"Choose one",name:"radio-example-2",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},g=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{name:""},controls:{type:"input",label:"What is your name?",name:"name",param:"name"}},r.a.createElement(p,null))},w=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{value:0},controls:{type:"range",label:"Choose a value",name:"range",param:"value"}},r.a.createElement(p,null))},j=function(){return r.a.createElement(o,{showTimer:!1,controls:{type:"timer",label:"My explicit timer"}},r.a.createElement(p,{showTime:!0}))},v=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[{type:"range",label:"A",name:"a",param:"a"},{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]},r.a.createElement(p,null))},T=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[[{type:"range",label:"A",name:"a",param:"a"}],[{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]]},r.a.createElement(p,null))},x=Object(l.j)((function(e){var t=e.params,a=e.setParams;return r.a.createElement("input",{type:"range",value:t["my-param"],onChange:function(e){return a({"my-param":Number(e.target.value)})}})})),O=Object(l.k)(p),k=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(i.c,{flexDirection:"column"},r.a.createElement(x,null),r.a.createElement(O,null)))},P=Object(l.j)((function(e){var t=e.params,a=e.setParams,n=t["my-param"];return r.a.createElement(l.g,{label:"My range",value:n,setValue:function(e){return a({"my-param":e})},minValue:0,maxValue:100,step:1})})),N=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(i.c,{flexDirection:"column"},r.a.createElement(O,null),r.a.createElement(P,null)))}},xFhf:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return l})),a.d(t,"default",(function(){return o}));a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi"),a("E5k/"),a("q1tI");var n=a("7ljp"),r=a("iKr1");var l={Title:"Range"},i={_frontmatter:l};function o(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["components"]);return Object(n.b)("wrapper",Object.assign({},i,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("h1",null,"Range"),Object(n.b)("p",null,"The Range control is a slider that let a user choose a value between a minimum and a maximum, and that's the default control."),Object(n.b)("p",null,"It has more properties than the typical control:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"maxValue (number, defaults to 100): the maximum you can set your value to using this control."),Object(n.b)("li",{parentName:"ul"},"minValue (number, defaults to 0): the minimum value for your control."),Object(n.b)("li",{parentName:"ul"},"shouldDisplayLabel (boolean, true by default): whether the label will be shown."),Object(n.b)("li",{parentName:"ul"},"shouldDisplayMaxValue (boolean, true by default): whether the max value will be shown after the slider."),Object(n.b)("li",{parentName:"ul"},"shouldDisplayMinValue (boolean, true by default): whether the min value will be shown before the slider."),Object(n.b)("li",{parentName:"ul"},"shouldDisplaySlider (boolean, true by default): whether the slider will be shown (if false, min and max values are not shown either)."),Object(n.b)("li",{parentName:"ul"},"shouldDisplayValue (boolean, true by default): whether the value will be shown, next to the label"),Object(n.b)("li",{parentName:"ul"},"step (number, defaults to 1): by how much the user can change the value.")),Object(n.b)(r.k,{mdxType:"RangeExample"}),Object(n.b)("pre",null,Object(n.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model\n  showTimer={false}\n  initialParams={{ value: 0 }}\n  controls={{\n    type: 'range',\n    label: 'Choose a value',\n    name: 'range',\n    param: 'value',\n  }}\n/>\n")))}o.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-controls-range-mdx-5a3e166d3965b3eee516.js.map