(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{shuE:function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return i})),a.d(t,"default",(function(){return s}));a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi"),a("E5k/"),a("q1tI");var n=a("7ljp");var i={Title:"Motivation & Inspiration"},o={_frontmatter:i};function s(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,["components"]);return Object(n.b)("wrapper",Object.assign({},o,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("h1",{id:"motivation"},"Motivation"),Object(n.b)("p",null,Object(n.b)("inlineCode",{parentName:"p"},"react-sim")," was written to make building interactive models simple."),Object(n.b)("p",null,"It is based on three ideas:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"separation of concern,"),Object(n.b)("li",{parentName:"ul"},"building blocks instead of boiler-plate,"),Object(n.b)("li",{parentName:"ul"},"integration with other apps.")),Object(n.b)("h2",{id:"separation-of-concern"},"Separation of concern"),Object(n.b)("p",null,"To build an interactive model, a developer must manage several things:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"how the model is initialized,"),Object(n.b)("li",{parentName:"ul"},"how the data of the model changes over time,"),Object(n.b)("li",{parentName:"ul"},"how to render a visual representation of the simulation,"),Object(n.b)("li",{parentName:"ul"},"how to deal with time and animation - can the simulation play and pause, go forward or back in time, etc."),Object(n.b)("li",{parentName:"ul"},"handle user interaction.")),Object(n.b)("p",null,"In ",Object(n.b)("inlineCode",{parentName:"p"},"react-sim"),", those things can be dealt with ",Object(n.b)("em",{parentName:"p"},"separately"),". We don't need to know how the data will update to figure out how to render it.\nWhen the simulation is initalized, it doesn't need to be aware of how it will animate. So, in react-sim, the code that does any of these tasks is separate. By having all of that logic separated, the code is safer, more legible, easier to maintain and test."),Object(n.b)("h2",{id:"less-boiler-plate-more-building-blocks"},"Less boiler-plate, more building blocks"),Object(n.b)("p",null,"Another painpoint in creating an interactive model from scratch is that there are common tasks that need to be taken care of for each new project.\nThat can be: actually implementing an animation and calling certain functions at regular intervals, which is the core of what ",Object(n.b)("inlineCode",{parentName:"p"},"react-sim")," does.\nBut that also includes: setting up a component that can refresh a canvas, or building a simple UI to control the nodel."),Object(n.b)("p",null,Object(n.b)("inlineCode",{parentName:"p"},"react-sim")," comes with 2 series of building blocks, one for controls and one for display elements, that take care of the most basic and common tasks.\nBut it also allows developers to create their own."),Object(n.b)("h2",{id:"integration-in-other-apps"},"Integration in other apps"),Object(n.b)("p",null,Object(n.b)("inlineCode",{parentName:"p"},"react-sim")," produces a React component and works everywhere React does, just like any other React components. They can take parameters and properties from the outside.\nThe default UI of ",Object(n.b)("inlineCode",{parentName:"p"},"react-sim")," uses ",Object(n.b)("inlineCode",{parentName:"p"},"rebass"),", and so a simulation can appear in an app styled by ",Object(n.b)("inlineCode",{parentName:"p"},"rebass")," and seamlessly take its theme."),Object(n.b)("h1",{id:"inspiration"},"Inspiration"),Object(n.b)("p",null,"The three main sources of inspiration for ",Object(n.b)("inlineCode",{parentName:"p"},"react-sim")," are ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"https://processing.org/"}),"Processing"),", ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"https://observablehq.com/"}),"Observable"),", and ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"http://ccl.northwestern.edu/netlogo/"}),"NetLogo"),"."),Object(n.b)("p",null,Object(n.b)("a",Object.assign({parentName:"p"},{href:"https://processing.org/"}),"Processing")," sketches are similar to react-sim simulations in that they have a one-off setup function, followed by a draw function called continuously.\nProcessing also has a very expressive and concise language focused on building sketches.\n",Object(n.b)("inlineCode",{parentName:"p"},"react-sim")," goes further than processing in separating initial setup and iterations by also separating data and rendering, however, it uses standard JavaScript syntax."),Object(n.b)("p",null,Object(n.b)("a",Object.assign({parentName:"p"},{href:"https://observablehq.com/"}),"Observable")," also create visual representations of data and makes it easy to add interactive controls. Observable lets the user create visual explanations by combining and arranging visual elements, text and controls. Observable is also a platform where authors can publish their notebooks and fork the work of others.\n",Object(n.b)("inlineCode",{parentName:"p"},"react-sim")," doesn't have such a platform or the notebook format, but also lets developers style their work freely and integrate it whereever they want seamlessly."),Object(n.b)("p",null,Object(n.b)("a",Object.assign({parentName:"p"},{href:"http://netlogoweb.org/"}),"NetLogo")," is a dedicated programmable modeling environment and its syntax is narrowly focused on building multi-agent models. As a result, even more so than processing, it has a very concise and expressive way to do so. ",Object(n.b)("inlineCode",{parentName:"p"},"react-sim")," uses JavaScript/React syntax which is more verbose, but more flexible."))}s.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-motivation-mdx-9f0fc8a86fa569fac0ff.js.map