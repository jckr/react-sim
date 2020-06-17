(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{"EgR/":function(e,n,a){"use strict";a.r(n),a.d(n,"_frontmatter",(function(){return l})),a.d(n,"default",(function(){return c}));a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi"),a("E5k/"),a("q1tI");var t=a("7ljp"),r=a("iKr1");var l={Title:"Arranging controls"},o={_frontmatter:l};function c(e){var n=e.components,a=function(e,n){if(null==e)return{};var a,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(e,["components"]);return Object(t.b)("wrapper",Object.assign({},o,a,{components:n,mdxType:"MDXLayout"}),Object(t.b)("h1",{id:"arranging-controls"},"Arranging controls"),Object(t.b)("h2",{id:"presenting-default-controls-on-several-rows-and-columns"},"Presenting default controls on several rows and columns"),Object(t.b)("p",null,"Instead of passing just one control object, you can pass an array of control objects.\nEach item of the array will be a different row."),Object(t.b)(r.l,{mdxType:"RowsOfSlidersExample"}),Object(t.b)("pre",null,Object(t.b)("code",Object.assign({parentName:"pre"},{className:"language-json"}),'[\n  {\n    "type": "range",\n    "label": "A",\n    "name": "a",\n    "param": "a"\n  },\n  {\n    "type": "range",\n    "label": "B",\n    "name": "b",\n    "param": "b"\n  },\n  {\n    "type": "range",\n    "label": "C",\n    "name": "c",\n    "param": "c"\n  }\n]\n')),Object(t.b)("p",null,"But you can also arrange your sliders on two rows, like so:"),Object(t.b)(r.o,{mdxType:"SlidersOnTwoRowsExample"}),Object(t.b)("pre",null,Object(t.b)("code",Object.assign({parentName:"pre"},{className:"language-json"}),'[\n  [\n    {\n      "type": "range",\n      "label": "A",\n      "name": "a",\n      "param": "a"\n    }\n  ],\n  [\n    {\n      "type": "range",\n      "label": "B",\n      "name": "b",\n      "param": "b"\n    },\n    {\n      "type": "range",\n      "label": "C",\n      "name": "c",\n      "param": "c"\n    }\n  ]\n]\n')),Object(t.b)("h2",{id:"arranging-controls-as-components"},"Arranging controls as components"),Object(t.b)("p",null,"You've seen in ",Object(t.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/custom-controls"}),"custom controls")," how you can make your own control components.\nYou can also import the pre-defined types:"),Object(t.b)("pre",null,Object(t.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"import {\n  Checkbox,\n  Input,\n  Radio,\n  Range,\n  Select,\n  Timer,\n  Toggle,\n} from 'react-sim';\n")),Object(t.b)("p",null,"You can now use these as Components and arrange them freely."),Object(t.b)(r.c,{mdxType:"ControlAsComponent"}),Object(t.b)("pre",null,Object(t.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"const MyCustomRange = ({ params, setParams }) => {\n  const value = params['my-param'];\n  const setValue = v => setParams({ 'my-param': v });\n  return (\n    <Range\n    label=\"My range\"\n      value={value}\n      setValue={setValue}\n      minValue={0}\n      maxValue={100}\n      step={1}\n    />\n  );\n};\nconst CustomRange = withControls(MyCustomRange);\n\nexport const ControlAsComponent = () => (\n  <Model\n    showTimer={false}\n    initialParams={{ 'my-param': 50 }}\n  >\n    <Flex flexDirection=\"column\">\n      <CustomFrame />\n      <CustomRange />\n    </Flex>\n  </Model>\n);\n}\n")))}c.isMDXComponent=!0},iKr1:function(e,n,a){"use strict";a.d(n,"e",(function(){return m})),a.d(n,"i",(function(){return i})),a.d(n,"f",(function(){return s})),a.d(n,"g",(function(){return u})),a.d(n,"b",(function(){return b})),a.d(n,"q",(function(){return g})),a.d(n,"a",(function(){return d})),a.d(n,"j",(function(){return f})),a.d(n,"n",(function(){return y})),a.d(n,"m",(function(){return h})),a.d(n,"h",(function(){return E})),a.d(n,"k",(function(){return j})),a.d(n,"p",(function(){return w})),a.d(n,"l",(function(){return O})),a.d(n,"o",(function(){return T})),a.d(n,"d",(function(){return C})),a.d(n,"c",(function(){return P}));a("YBKJ"),a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi");var t=a("q1tI"),r=a.n(t),l=a("1uUR"),o=a("VdAu"),c=a("sCKr");var m=function(){return r.a.createElement(c.a,null,r.a.createElement("div",null))},i=function(){return r.a.createElement(c.a,{minTime:-10,maxTime:0},r.a.createElement("div",null))},s=function(){return r.a.createElement(c.a,{showTime:!1},r.a.createElement("div",null))},u=function(){return r.a.createElement(c.a,{showTimeSlider:!1},r.a.createElement("div",null))},p=function(e){var n=e.params,a=(n.delay,n.minTime,n.maxTime,n.ticksPerAnimation,function(e,n){if(null==e)return{};var a,t,r={},l=Object.keys(e);for(t=0;t<l.length;t++)a=l[t],n.indexOf(a)>=0||(r[a]=e[a]);return r}(n,["delay","minTime","maxTime","ticksPerAnimation"])),t=e.tick,l=e.showTime;return r.a.createElement("div",null,Object.keys(a).length>0&&r.a.createElement(r.a.Fragment,null,r.a.createElement(o.e,{sx:{fontSize:1,fontWeight:"bold"}},"params:"),r.a.createElement("pre",null,JSON.stringify(a,null,2))),l&&r.a.createElement("pre",null,JSON.stringify({tick:t},null,2)))},b=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{checked:!1},controls:{type:"checkbox",label:"Check me",param:"checked"}},r.a.createElement(p,null))},g=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{checked:!1},controls:{type:"toggle",label:"Toggle me",param:"checked"}},r.a.createElement(p,null))},d=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{checked:!1},controls:[[{type:"checkbox",label:"Check me again",param:"checked"},{type:"toggle",label:"Toggle me again",param:"checked"}]]},r.a.createElement(p,null))},f=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"radio",name:"radio-example",label:"Choose one",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},y=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},h=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{options:"jet"},controls:[{type:"select",label:"Choose one",name:"select-example-2",param:"options",options:["jet","set","radio"]},{type:"radio",label:"Choose one",name:"radio-example-2",param:"options",options:["jet","set","radio"]}]},r.a.createElement(p,null))},E=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{name:""},controls:{type:"input",label:"What is your name?",name:"name",param:"name"}},r.a.createElement(p,null))},j=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{value:0},controls:{type:"range",label:"Choose a value",name:"range",param:"value"}},r.a.createElement(p,null))},w=function(){return r.a.createElement(c.a,{showTimer:!1,controls:{type:"timer",label:"My explicit timer"}},r.a.createElement(p,{showTime:!0}))},O=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[{type:"range",label:"A",name:"a",param:"a"},{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]},r.a.createElement(p,null))},T=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{a:0,b:0,c:0},controls:[[{type:"range",label:"A",name:"a",param:"a"}],[{type:"range",label:"B",name:"b",param:"b"},{type:"range",label:"C",name:"c",param:"c"}]]},r.a.createElement(p,null))},v=Object(l.h)((function(e){var n=e.params,a=e.setParams;return r.a.createElement("input",{type:"range",value:n["my-param"],onChange:function(e){return a({"my-param":Number(e.target.value)})}})})),x=Object(l.i)(p),C=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(o.c,{flexDirection:"column"},r.a.createElement(v,null),r.a.createElement(x,null)))},k=Object(l.h)((function(e){var n=e.params,a=e.setParams,t=n["my-param"];return r.a.createElement(l.e,{label:"My range",value:t,setValue:function(e){return a({"my-param":e})},minValue:0,maxValue:100,step:1})})),P=function(){return r.a.createElement(c.a,{showTimer:!1,initialParams:{"my-param":50}},r.a.createElement(o.c,{flexDirection:"column"},r.a.createElement(x,null),r.a.createElement(k,null)))}}}]);
//# sourceMappingURL=component---src-pages-controls-arranging-controls-mdx-b66eb78373ecd60f8fd1.js.map