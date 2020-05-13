(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{ChlL:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return l})),t.d(n,"default",(function(){return o}));t("rzGZ"),t("Dq+y"),t("8npG"),t("Ggvi"),t("E5k/"),t("q1tI");var a=t("7ljp"),r=t("iKr1");var l={Title:"Toggle"},c={_frontmatter:l};function o(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},c,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",null,"Toggle"),Object(a.b)(r.q,{mdxType:"ToggleExample"}),Object(a.b)("p",null,"A Toggle is functionally equivalent to a checkbox, but looks differently.\nLike the checkbox, it doesn't need anything else besides the common props."),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model\n  showTimer={false}\n  initialParams={{ checked: false }}\n  controls={{\n    type: 'toggle',\n    label: 'Check me',\n    param: 'checked',\n  }}\n/>\n")),Object(a.b)("p",null,"Two controls can act on the same param:"),Object(a.b)(r.a,{mdxType:"CheckAndToggleExample"}),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model\n  showTimer={false}\n  initialParams={{ checked: false }}\n  controls={[\n    {\n      type: 'checkbox',\n      label: 'Check me',\n      param: 'checked',\n    },\n    {\n      type: 'toggle',\n      label: 'Toggle me',\n      param: 'checked',\n    },\n  ]}\n/>\n")))}o.isMDXComponent=!0},iKr1:function(e,n,t){"use strict";t.d(n,"e",(function(){return i})),t.d(n,"i",(function(){return m})),t.d(n,"f",(function(){return u})),t.d(n,"g",(function(){return s})),t.d(n,"b",(function(){return b})),t.d(n,"q",(function(){return f})),t.d(n,"a",(function(){return d})),t.d(n,"j",(function(){return h})),t.d(n,"n",(function(){return g})),t.d(n,"m",(function(){return E})),t.d(n,"h",(function(){return y})),t.d(n,"k",(function(){return T})),t.d(n,"p",(function(){return k})),t.d(n,"l",(function(){return j})),t.d(n,"o",(function(){return w})),t.d(n,"d",(function(){return O})),t.d(n,"c",(function(){return C}));t("YBKJ"),t("rzGZ"),t("Dq+y"),t("8npG"),t("Ggvi");var a=t("q1tI"),r=t.n(a),l=t("1uUR"),c=t("VdAu");var o=function(e){return r.a.createElement(c.c,{sx:{border:"1px solid #000",p:2}},r.a.createElement(l.f,e))},i=function(){return r.a.createElement(o,null,r.a.createElement("div",null))},m=function(){return r.a.createElement(o,{minTime:-10,maxTime:0},r.a.createElement("div",null))},u=function(){return r.a.createElement(o,{showTime:!1},r.a.createElement("div",null))},s=function(){return r.a.createElement(o,{showTimeSlider:!1},r.a.createElement("div",null))},p=function(e){var n=e.params,t=(n.delay,n.minTime,n.maxTime,n.ticksPerAnimation,function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(n,["delay","minTime","maxTime","ticksPerAnimation"])),a=e.tick,l=e.showTime;return r.a.createElement("div",null,Object.keys(t).length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement("label",null,"params:"),r.a.createElement("pre",null,JSON.stringify(t,null,2))),l&&r.a.createElement("pre",null,JSON.stringify({tick:a},null,2)))},b=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{checked:!1},controls:{type:"checkbox",label:"Check me",param:"checked"}},r.a.createElement(p,null))},f=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{checked:!1},controls:{type:"toggle",label:"Toggle me",param:"checked"}},r.a.createElement(p,null))},d=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{checked:!1},controls:[[{type:"checkbox",label:"Check me again",param:"checked"},{type:"toggle",label:"Toggle me again",param:"checked"}]]},r.a.createElement(p,null))},h=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"radio",name:"radio-example",label:"Choose one",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},g=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},E=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example-2",param:"options",options:["jet","set","radio"]},{type:"radio",label:"Choose one",name:"radio-example-2",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},y=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{name:""},controls:{type:"input",label:"What is your name?",name:"name",param:"name"}},r.a.createElement(p,null))},T=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{value:0},controls:{type:"range",label:"Choose a value",name:"range",param:"value"}},r.a.createElement(p,null))},k=function(){return r.a.createElement(o,{showTimer:!1,controls:{type:"timer",label:"My explicit timer"}},r.a.createElement(p,{showTime:!0}))},j=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[{type:"range",label:"A",name:"a",param:"a"},{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]},r.a.createElement(p,null))},w=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[[{type:"range",label:"A",name:"a",param:"a"}],[{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]]},r.a.createElement(p,null))},x=Object(l.j)((function(e){var n=e.params,t=e.setParams;return r.a.createElement("input",{type:"range",value:n["my-param"],onChange:function(e){return t({"my-param":Number(e.target.value)})}})})),v=Object(l.k)(p),O=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(c.c,{flexDirection:"column"},r.a.createElement(x,null),r.a.createElement(v,null)))},P=Object(l.j)((function(e){var n=e.params,t=e.setParams,a=n["my-param"];return r.a.createElement(l.g,{label:"My range",value:a,setValue:function(e){return t({"my-param":e})},minValue:0,maxValue:100,step:1})})),C=function(){return r.a.createElement(o,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(c.c,{flexDirection:"column"},r.a.createElement(v,null),r.a.createElement(P,null)))}}}]);
//# sourceMappingURL=component---src-pages-controls-toggle-mdx-f8732fad31b880ffbcde.js.map