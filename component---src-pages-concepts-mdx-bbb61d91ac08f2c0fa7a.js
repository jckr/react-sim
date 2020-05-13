(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{ulaq:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return l})),a.d(t,"default",(function(){return b}));a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi"),a("E5k/"),a("q1tI");var n=a("7ljp"),i=a("tBDR");var l={Title:"how does it work?"},o={_frontmatter:l};function b(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,n,i={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,["components"]);return Object(n.b)("wrapper",Object.assign({},o,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("h1",null,"How does it work?"),Object(n.b)("p",null,"At the core of a React-Sim simulation is the ",Object(n.b)("inlineCode",{parentName:"p"},"Model"),"."),Object(n.b)(i.a,{name:"model",mdxType:"Image"}),Object(n.b)("p",null,"The ",Object(n.b)("inlineCode",{parentName:"p"},"Model")," maintains three key pieces of information:"),Object(n.b)(i.a,{name:"modelState",mdxType:"Image"}),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"params"),", parameters of the simulation which don't change without a user intervention,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"tick"),", a measure of the progression of the simulation, which may increase automatically over time, and"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"data"),", data for the simulation which will be updated at each new tick.")),Object(n.b)(i.a,{name:"modelComponents",mdxType:"Image"}),Object(n.b)("p",null,"To make a simulation work, the model has to interact with several other parts of the simulation:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"controls"),", which will handle how users interact with the simulation,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"initData"),", which is run at the beginning of the simulation, to create the initial dataset,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"updateData"),", which is run each time the ",Object(n.b)("inlineCode",{parentName:"li"},"tick")," changes,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"frame"),", which will render the simulation for each tick.")),Object(n.b)("p",null,"Let's see how they work."),Object(n.b)("h2",null,"Controls"),Object(n.b)(i.a,{name:"modelControls",mdxType:"Image"}),Object(n.b)("p",null,"Controls let users interact with the simulation. Through ",Object(n.b)("inlineCode",{parentName:"p"},"controls"),", users can play or pause the simulation, when applicable, jump to a point in time, or control the parameters."),Object(n.b)("p",null,"Controls enable developers to describe a UI for these interactions, using things like sliders, textboxes, toggles etc. (or bring your own)."),Object(n.b)("p",null,"Controls get to change both the ",Object(n.b)("inlineCode",{parentName:"p"},"params")," and the ",Object(n.b)("inlineCode",{parentName:"p"},"tick")," inside the ",Object(n.b)("inlineCode",{parentName:"p"},"Model"),". Controls can't access or change the ",Object(n.b)("inlineCode",{parentName:"p"},"data")," though."),Object(n.b)("h2",null,"initData"),Object(n.b)(i.a,{name:"modelInitData",mdxType:"Image"}),Object(n.b)("p",null,Object(n.b)("inlineCode",{parentName:"p"},"initData")," generates the dataset at the start of the simulation. It can read the model's ",Object(n.b)("inlineCode",{parentName:"p"},"params"),", and replace its ",Object(n.b)("inlineCode",{parentName:"p"},"data"),"."),Object(n.b)("h2",null,"updateData"),Object(n.b)(i.a,{name:"modelUpdateData",mdxType:"Image"}),Object(n.b)("p",null,"Each time the ",Object(n.b)("inlineCode",{parentName:"p"},"tick")," changes, ",Object(n.b)("inlineCode",{parentName:"p"},"updateData")," will generate a new dataset, as a function of:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"the existing ",Object(n.b)("inlineCode",{parentName:"li"},"data"),","),Object(n.b)("li",{parentName:"ul"},"the ",Object(n.b)("inlineCode",{parentName:"li"},"params"),","),Object(n.b)("li",{parentName:"ul"},"the value of the ",Object(n.b)("inlineCode",{parentName:"li"},"tick"),".")),Object(n.b)("h2",null,"frame"),Object(n.b)(i.a,{name:"modelFrame",mdxType:"Image"}),Object(n.b)("p",null,"The ",Object(n.b)("inlineCode",{parentName:"p"},"frame")," is how the simulation is going to represent the data.\nFrom the ",Object(n.b)("inlineCode",{parentName:"p"},"Model"),", it reads:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"the current ",Object(n.b)("inlineCode",{parentName:"li"},"data"),","),Object(n.b)("li",{parentName:"ul"},"the current ",Object(n.b)("inlineCode",{parentName:"li"},"tick"),","),Object(n.b)("li",{parentName:"ul"},"the ",Object(n.b)("inlineCode",{parentName:"li"},"params"))),Object(n.b)("p",null,"and it uses that to render the simulation. Anything that can be rendered by React can go into a Frame - canvas, HTML content, SVG, you name it."),Object(n.b)(i.a,{name:"modelHighLevelView",mdxType:"Image"}),Object(n.b)("p",null,"So that's how the Model and the other components interact at a high level."))}b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-concepts-mdx-bbb61d91ac08f2c0fa7a.js.map