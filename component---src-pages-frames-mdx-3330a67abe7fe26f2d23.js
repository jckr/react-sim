(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{EXrp:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return r})),n.d(t,"default",(function(){return o}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp");var r={Title:"Frames"},i={_frontmatter:r};function o(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},i,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"how-frames-works"},"How frames works"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"Frames")," are the part of the simulation in charge of rendering the internal state."),Object(a.b)("p",null,"Given a ",Object(a.b)("inlineCode",{parentName:"p"},"data")," and a ",Object(a.b)("inlineCode",{parentName:"p"},"tick")," prop, the ",Object(a.b)("inlineCode",{parentName:"p"},"Frames")," paint a view of that information."),Object(a.b)("p",null,"When the ",Object(a.b)("inlineCode",{parentName:"p"},"Model")," refreshes the animation, it sends updated ",Object(a.b)("inlineCode",{parentName:"p"},"tick")," and ",Object(a.b)("inlineCode",{parentName:"p"},"data")," to the ",Object(a.b)("inlineCode",{parentName:"p"},"Frames"),", so the ",Object(a.b)("inlineCode",{parentName:"p"},"Frames")," rerender and show fresh information."),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"Frames")," only job is to render the data. ",Object(a.b)("inlineCode",{parentName:"p"},"updateData")," does the calculation on the data, the ",Object(a.b)("inlineCode",{parentName:"p"},"Model")," manages the animation and ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls"}),"controls")," let the user interact with the Model."),Object(a.b)("p",null,"This is a completely declarative approach, consistent with the React approach."),Object(a.b)("h1",{id:"how-to-connect-frames-and-the-model"},"How to connect Frames and the Model"),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"Frames")," receive some information from the ",Object(a.b)("inlineCode",{parentName:"p"},"Model"),"."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"data")," (anything), the current state of the simulation."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"tick")," (integer), the progress in the simulation."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"params")," (object), all the parameters set by the user/author, which don't change over time without intervention."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"cachedData")," (object), data from previous ",Object(a.b)("inlineCode",{parentName:"li"},"ticks")," of the simulation, and"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"results")," (array), data from previous completed runs of the simulation,"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"initData")," (function), the Frame can reinitialize data,"),Object(a.b)("li",{parentName:"ul"},Object(a.b)("inlineCode",{parentName:"li"},"setData")," (function), the Frame can change the data. (so for instance the Frame can be used to let the user enter an initial state of data).")),Object(a.b)("p",null,"The ",Object(a.b)("inlineCode",{parentName:"p"},"Frames")," can be one or more components."),Object(a.b)("p",null,"The easiest way to connect ",Object(a.b)("inlineCode",{parentName:"p"},"Frames")," to a ",Object(a.b)("inlineCode",{parentName:"p"},"Model")," is just to have these components as children of the Model:"),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model>\n  <MyFrame />\n</Model>\n")),Object(a.b)("p",null,"A component which is a direct child of ",Object(a.b)("inlineCode",{parentName:"p"},"Model")," will receive all of the props above from ",Object(a.b)("inlineCode",{parentName:"p"},"Model"),"."),Object(a.b)("p",null,"This also works if there are several children:"),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model>\n  <MyFrame />\n  <MyOtherFrame />\n</Model>\n")),Object(a.b)("p",null,"All components will receive these props. The children will be arranged from left to right."),Object(a.b)("p",null,"However, it doesn't work if the components are deep into the tree, ie:"),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"<Model>\n  <div>\n    <MyFrame />\n  </div>\n</Model>\n")),Object(a.b)("p",null,"Here, ",Object(a.b)("inlineCode",{parentName:"p"},"<MyFrame />")," won't receive the frame props, because it is too deep.\nTo connect ",Object(a.b)("inlineCode",{parentName:"p"},"Frames")," deep in the tree, we can use the ",Object(a.b)("inlineCode",{parentName:"p"},"withFrames")," wrapper."),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"import { withFrames, Model } from 'react-sim';\nimport MyFrame from 'my-frame';\n\nconst MyConnectedFrame = withFrames(MyFrame);\n\nexport default () => (\n  <Model>\n    <div>\n      <MyConnectedFrame />\n    </div>\n  </Model>\n);\n")),Object(a.b)("p",null,"Here, ",Object(a.b)("inlineCode",{parentName:"p"},"<MyConnectedFrame />")," receives the ",Object(a.b)("inlineCode",{parentName:"p"},"frames")," props."))}o.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-frames-mdx-3330a67abe7fe26f2d23.js.map