(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{ulaq:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return b})),a.d(t,"default",(function(){return c}));var n=a("zLVn"),i=(a("q1tI"),a("7ljp")),l=a("tBDR"),o=["components"],b={Title:"how does it work?"},r={_frontmatter:b};function c(e){var t=e.components,a=Object(n.a)(e,o);return Object(i.b)("wrapper",Object.assign({},r,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"how-does-it-work"},"How does it work?"),Object(i.b)("p",null,"At the core of a React-Sim simulation is the ",Object(i.b)("inlineCode",{parentName:"p"},"Model"),"."),Object(i.b)(l.a,{name:"model",mdxType:"Image"}),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"Model")," maintains three key pieces of information:"),Object(i.b)(l.a,{name:"modelState",mdxType:"Image"}),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"params"),", parameters of the simulation which don't change without a user intervention,"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"tick"),", a measure of the progression of the simulation, which may increase automatically over time, and"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"data"),", data for the simulation which will be updated at each new tick.")),Object(i.b)(l.a,{name:"modelComponents",mdxType:"Image"}),Object(i.b)("p",null,"To make a simulation work, the model has to interact with several other parts of the simulation:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"controls"),", which will handle how users interact with the simulation,"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"initData"),", which is run at the beginning of the simulation, to create the initial dataset,"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"updateData"),", which is run each time the ",Object(i.b)("inlineCode",{parentName:"li"},"tick")," changes,"),Object(i.b)("li",{parentName:"ul"},Object(i.b)("inlineCode",{parentName:"li"},"frame"),", which will render the simulation for each tick.")),Object(i.b)("p",null,"Let's see how they work."),Object(i.b)("h2",{id:"controls"},"Controls"),Object(i.b)(l.a,{name:"modelControls",mdxType:"Image"}),Object(i.b)("p",null,"Controls let users interact with the simulation. Through ",Object(i.b)("inlineCode",{parentName:"p"},"controls"),", users can play or pause the simulation, when applicable, jump to a point in time, or control the parameters."),Object(i.b)("p",null,"Controls enable developers to describe a UI for these interactions, using things like sliders, textboxes, toggles etc. (or bring your own)."),Object(i.b)("p",null,"Controls get to change both the ",Object(i.b)("inlineCode",{parentName:"p"},"params")," and the ",Object(i.b)("inlineCode",{parentName:"p"},"tick")," inside the ",Object(i.b)("inlineCode",{parentName:"p"},"Model"),". Controls can't access or change the ",Object(i.b)("inlineCode",{parentName:"p"},"data")," though."),Object(i.b)("h2",{id:"initdata"},"initData"),Object(i.b)(l.a,{name:"modelInitData",mdxType:"Image"}),Object(i.b)("p",null,Object(i.b)("inlineCode",{parentName:"p"},"initData")," generates the dataset at the start of the simulation. It can read the model's ",Object(i.b)("inlineCode",{parentName:"p"},"params"),", and replace its ",Object(i.b)("inlineCode",{parentName:"p"},"data"),"."),Object(i.b)("h2",{id:"updatedata"},"updateData"),Object(i.b)(l.a,{name:"modelUpdateData",mdxType:"Image"}),Object(i.b)("p",null,"Each time the ",Object(i.b)("inlineCode",{parentName:"p"},"tick")," changes, ",Object(i.b)("inlineCode",{parentName:"p"},"updateData")," will generate a new dataset, as a function of:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"the existing ",Object(i.b)("inlineCode",{parentName:"li"},"data"),","),Object(i.b)("li",{parentName:"ul"},"the ",Object(i.b)("inlineCode",{parentName:"li"},"params"),","),Object(i.b)("li",{parentName:"ul"},"the value of the ",Object(i.b)("inlineCode",{parentName:"li"},"tick"),".")),Object(i.b)("h2",{id:"frame"},"frame"),Object(i.b)(l.a,{name:"modelFrame",mdxType:"Image"}),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"frame")," is how the simulation is going to represent the data.\nFrom the ",Object(i.b)("inlineCode",{parentName:"p"},"Model"),", it reads:"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},"the current ",Object(i.b)("inlineCode",{parentName:"li"},"data"),","),Object(i.b)("li",{parentName:"ul"},"the current ",Object(i.b)("inlineCode",{parentName:"li"},"tick"),","),Object(i.b)("li",{parentName:"ul"},"the ",Object(i.b)("inlineCode",{parentName:"li"},"params"))),Object(i.b)("p",null,"and it uses that to render the simulation. Anything that can be rendered by React can go into a Frame - canvas, HTML content, SVG, you name it."),Object(i.b)(l.a,{name:"modelHighLevelView",mdxType:"Image"}),Object(i.b)("p",null,"So that's how the Model and the other components interact at a high level."))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-concepts-mdx-8b4f4a70361790e79390.js.map