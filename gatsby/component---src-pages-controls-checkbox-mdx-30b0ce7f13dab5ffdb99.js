(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{hqDk:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return l})),t.d(n,"default",(function(){return i}));t("rzGZ"),t("Dq+y"),t("8npG"),t("Ggvi"),t("E5k/"),t("q1tI");var a=t("7ljp"),r=t("iKr1");var l={Title:"Checkbox"},c={_frontmatter:l};function i(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},c,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",null,"Checkbox"),Object(a.b)(r.b,{mdxType:"CheckBoxExample"}),Object(a.b)("p",null,"A Checkbox is a simple control that will cause a param to toggle from true to false.\nIt doesn't need anything else besides the common props."),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model\n  showTimer={false}\n  initialParams={{ checked: false }}\n  controls={{\n    type: 'checkbox',\n    label: 'Check me',\n    param: 'checked',\n  }}\n/>\n")))}i.isMDXComponent=!0},iKr1:function(e,n,t){"use strict";t.d(n,"d",(function(){return i})),t.d(n,"h",(function(){return o})),t.d(n,"e",(function(){return m})),t.d(n,"f",(function(){return u})),t.d(n,"b",(function(){return p})),t.d(n,"p",(function(){return f})),t.d(n,"a",(function(){return d})),t.d(n,"i",(function(){return b})),t.d(n,"m",(function(){return h})),t.d(n,"l",(function(){return E})),t.d(n,"g",(function(){return g})),t.d(n,"j",(function(){return y})),t.d(n,"o",(function(){return k})),t.d(n,"k",(function(){return T})),t.d(n,"n",(function(){return w})),t.d(n,"c",(function(){return v}));t("YBKJ"),t("rzGZ"),t("Dq+y"),t("8npG"),t("Ggvi");var a=t("q1tI"),r=t.n(a),l=t("1uUR"),c=t("VdAu");var i=function(){return r.a.createElement(l.c,null,r.a.createElement("div",null))},o=function(){return r.a.createElement(l.c,{minTime:-10,maxTime:0},r.a.createElement("div",null))},m=function(){return r.a.createElement(l.c,{showTime:!1},r.a.createElement("div",null))},u=function(){return r.a.createElement(l.c,{showTimeSlider:!1},r.a.createElement("div",null))},s=function(e){var n=e.params,t=(n.delay,n.minTime,n.maxTime,n.ticksPerAnimation,function(e,n){if(null==e)return{};var t,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)t=l[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(n,["delay","minTime","maxTime","ticksPerAnimation"])),a=e.tick,l=e.showTime;return r.a.createElement("div",null,Object.keys(t).length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement("label",null,"params:"),r.a.createElement("pre",null,JSON.stringify(t,null,2))),l&&r.a.createElement("pre",null,JSON.stringify({tick:a},null,2)))},p=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{checked:!1},controls:{type:"checkbox",label:"Check me",param:"checked"}},r.a.createElement(s,null))},f=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{checked:!1},controls:{type:"toggle",label:"Toggle me",param:"checked"}},r.a.createElement(s,null))},d=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{checked:!1},controls:[[{type:"checkbox",label:"Check me again",param:"checked"},{type:"toggle",label:"Toggle me again",param:"checked"}]]},r.a.createElement(s,null))},b=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"radio",name:"radio-example",label:"Choose one",param:"options",options:["jet","set","radio"]}]},r.a.createElement(s,null))},h=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example",param:"options",options:["jet","set","radio"]}]},r.a.createElement(s,null))},E=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example-2",param:"options",options:["jet","set","radio"]},{type:"radio",label:"Choose one",name:"radio-example-2",param:"options",options:["jet","set","radio"]}]},r.a.createElement(s,null))},g=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{name:""},controls:{type:"input",label:"What is your name?",name:"name",param:"name"}},r.a.createElement(s,null))},y=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{value:0},controls:{type:"range",label:"Choose a value",name:"range",param:"value"}},r.a.createElement(s,null))},k=function(){return r.a.createElement(l.c,{showTimer:!1,controls:{type:"timer",label:"My explicit timer"}},r.a.createElement(s,{showTime:!0}))},T=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[{type:"range",label:"A",name:"a",param:"a"},{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]},r.a.createElement(s,null))},w=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[[{type:"range",label:"A",name:"a",param:"a"}],[{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]]},r.a.createElement(s,null))},j=Object(l.d)((function(e){var n=e.params,t=e.setParams;return r.a.createElement("input",{type:"range",value:n["my-param"],onChange:function(e){return t({"my-param":Number(e.target.value)})}})})),x=Object(l.e)(s),v=function(){return r.a.createElement(l.c,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(c.c,{flexDirection:"column"},r.a.createElement(j,null),r.a.createElement(x,null)))}}}]);
//# sourceMappingURL=component---src-pages-controls-checkbox-mdx-30b0ce7f13dab5ffdb99.js.map