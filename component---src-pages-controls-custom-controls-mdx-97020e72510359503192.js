(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{JWmx:function(e,n,t){"use strict";t.r(n),t.d(n,"_frontmatter",(function(){return l})),t.d(n,"default",(function(){return m}));t("rzGZ"),t("Dq+y"),t("8npG"),t("Ggvi"),t("E5k/"),t("q1tI");var a=t("7ljp"),r=t("iKr1"),o=t("hoDs");var l={Title:"Custom Controls"},i={_frontmatter:l};function m(e){var n=e.components,t=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},i,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"custom-controls"},"Custom controls"),Object(a.b)(r.d,{mdxType:"CustomControlExample"}),Object(a.b)("p",null,Object(a.b)("em",{parentName:"p"},"A custom control example")),Object(a.b)("p",null,"Don't like the predefined control types? Want more control on controls? no problem."),Object(a.b)("p",null,"You can import ",Object(a.b)("inlineCode",{parentName:"p"},"withControls"),", and wrap any arbitrary component with it."),Object(a.b)("h2",{id:"withcontrols-props"},"withControls props"),Object(a.b)("p",null,"When you do that, you expose this component to the following props:"),Object(a.b)(o.r,{mdxType:"WithControlsAPI"}),Object(a.b)("h2",{id:"custom-controls-use-cases"},"Custom controls use cases"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"do your own styling"),Object(a.b)("li",{parentName:"ul"},"position controls how you see fit relative to the ",Object(a.b)("inlineCode",{parentName:"li"},"Frame")," (not just below)"),Object(a.b)("li",{parentName:"ul"},"combine ",Object(a.b)("inlineCode",{parentName:"li"},"Frame")," and ",Object(a.b)("inlineCode",{parentName:"li"},"Control")," - the same component can render the simulation and change its parameters.")),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"import {withControls, Model} from 'react-sim';\n\nconst MyControl = ({ params, setParams }) => (\n  <input\n    type=\"range\"\n    value={params['my-param']}\n    onChange={e => setParams({ 'my-param': Number(e.target.value) })}\n  />\n);\n\nconst CustomControl = withControls(MyControl);\n\n/* ... */\n\nconst CustomControlExample = () => (\n  <Model showTimer={false} initialParams={{ 'my-param': 50 }}>\n    <Flex flexDirection=\"column\">\n      <CustomControl />\n      <MyFrame />\n    </Flex>\n  </Model>\n")),Object(a.b)("p",null,"The ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/examples/1d-automata"}),"1D automata")," is an example of custom controls."))}m.isMDXComponent=!0},iKr1:function(e,n,t){"use strict";t.d(n,"e",(function(){return m})),t.d(n,"i",(function(){return c})),t.d(n,"f",(function(){return u})),t.d(n,"g",(function(){return s})),t.d(n,"b",(function(){return b})),t.d(n,"q",(function(){return d})),t.d(n,"a",(function(){return f})),t.d(n,"j",(function(){return h})),t.d(n,"n",(function(){return y})),t.d(n,"m",(function(){return E})),t.d(n,"h",(function(){return g})),t.d(n,"k",(function(){return j})),t.d(n,"p",(function(){return C})),t.d(n,"l",(function(){return w})),t.d(n,"o",(function(){return O})),t.d(n,"d",(function(){return v})),t.d(n,"c",(function(){return P}));t("YBKJ"),t("rzGZ"),t("Dq+y"),t("8npG"),t("Ggvi");var a=t("q1tI"),r=t.n(a),o=t("1uUR"),l=t("VdAu"),i=t("sCKr");var m=function(){return r.a.createElement(i.a,null,r.a.createElement("div",null))},c=function(){return r.a.createElement(i.a,{minTime:-10,maxTime:0},r.a.createElement("div",null))},u=function(){return r.a.createElement(i.a,{showTime:!1},r.a.createElement("div",null))},s=function(){return r.a.createElement(i.a,{showTimeSlider:!1},r.a.createElement("div",null))},p=function(e){var n=e.params,t=(n.delay,n.minTime,n.maxTime,n.ticksPerAnimation,function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(n,["delay","minTime","maxTime","ticksPerAnimation"])),a=e.tick,o=e.showTime;return r.a.createElement("div",null,Object.keys(t).length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement(l.e,{sx:{fontSize:1,fontWeight:"bold"}},"params:"),r.a.createElement("pre",null,JSON.stringify(t,null,2))),o&&r.a.createElement("pre",null,JSON.stringify({tick:a},null,2)))},b=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{checked:!1},controls:{type:"checkbox",label:"Check me",param:"checked"}},r.a.createElement(p,null))},d=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{checked:!1},controls:{type:"toggle",label:"Toggle me",param:"checked"}},r.a.createElement(p,null))},f=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{checked:!1},controls:[[{type:"checkbox",label:"Check me again",param:"checked"},{type:"toggle",label:"Toggle me again",param:"checked"}]]},r.a.createElement(p,null))},h=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"radio",name:"radio-example",label:"Choose one",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},y=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},E=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example-2",param:"options",options:["jet","set","radio"]},{type:"radio",label:"Choose one",name:"radio-example-2",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},g=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{name:""},controls:{type:"input",label:"What is your name?",name:"name",param:"name"}},r.a.createElement(p,null))},j=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{value:0},controls:{type:"range",label:"Choose a value",name:"range",param:"value"}},r.a.createElement(p,null))},C=function(){return r.a.createElement(i.a,{showTimer:!1,controls:{type:"timer",label:"My explicit timer"}},r.a.createElement(p,{showTime:!0}))},w=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[{type:"range",label:"A",name:"a",param:"a"},{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]},r.a.createElement(p,null))},O=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[[{type:"range",label:"A",name:"a",param:"a"}],[{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]]},r.a.createElement(p,null))},x=Object(o.h)((function(e){var n=e.params,t=e.setParams;return r.a.createElement("input",{type:"range",value:n["my-param"],onChange:function(e){return t({"my-param":Number(e.target.value)})}})})),T=Object(o.i)(p),v=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(l.c,{flexDirection:"column"},r.a.createElement(x,null),r.a.createElement(T,null)))},k=Object(o.h)((function(e){var n=e.params,t=e.setParams,a=n["my-param"];return r.a.createElement(o.e,{label:"My range",value:a,setValue:function(e){return t({"my-param":e})},minValue:0,maxValue:100,step:1})})),P=function(){return r.a.createElement(i.a,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(l.c,{flexDirection:"column"},r.a.createElement(T,null),r.a.createElement(k,null)))}},sCKr:function(e,n,t){"use strict";var a=t("q1tI"),r=t.n(a),o=t("1uUR"),l=t("VdAu");n.a=function(e){return r.a.createElement(l.c,{sx:{border:"1px solid currentcolor",my:2,p:2,width:"350px"}},r.a.createElement(o.d,e))}}}]);
//# sourceMappingURL=component---src-pages-controls-custom-controls-mdx-97020e72510359503192.js.map