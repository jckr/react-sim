(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{BXRP:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return o}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp"),r=n("hoDs");var i={Title:"API reference"},c={_frontmatter:i};function o(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},c,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"A single-page reference of all the APIs used throughout ",Object(a.b)("inlineCode",{parentName:"p"},"React-Sim"),"."),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object.assign({parentName:"li"},{href:"/react-sim/api#model"}),"Model")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object.assign({parentName:"li"},{href:"/react-sim/api#withframe"}),"withFrame")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object.assign({parentName:"li"},{href:"/react-sim/api#grid"}),"grid")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object.assign({parentName:"li"},{href:"/react-sim/api#canvasframe"}),"canvasFrame")),Object(a.b)("li",{parentName:"ul"},Object(a.b)("a",Object.assign({parentName:"li"},{href:"/react-sim/api#timeseries"}),"timeSeries"))),Object(a.b)("h1",{id:"model"},"Model"),Object(a.b)("h2",{id:"usage"},"Usage"),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"import {Model} from 'react-sim';\n\nfunction initData = params => { /* ... */ }\nfunction updateData =\n  ({data, params, tick, ...args}) => { /* ... */ }\nconst params = { /* ... */};\nfunction Frame =\n  ({data, params, tick, ...args}) => <>{ /* ... */ }</>;\n\nexport function MyModel = () => <Model\n  initalParams={params}\n  initData={initData}\n  updateData={updateData}\n>\n  <Frame />\n</Model>\n")),Object(a.b)("h2",{id:"state"},"State"),Object(a.b)(r.j,{mdxType:"ModelStateAPI"}),Object(a.b)("h2",{id:"properties"},"Properties"),Object(a.b)(r.i,{mdxType:"ModelPropsAPI"}),Object(a.b)("p",null,"For more information on controls and the syntax of the control object, see ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls"}),"Controls"),"."),Object(a.b)("h1",{id:"frame-helpers"},"Frame Helpers"),Object(a.b)("h2",{id:"withframe"},"withFrame"),Object(a.b)("h3",{id:"usage-1"},"Usage"),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"import {Model, withFrame} from 'react-sim';\n\nconst FrameComponent = props => <>{ /* ... */ }</>;\nconst Frame = withFrame(FrameComponent);\n\nexport function MyModel = () => <Model>\n  <Frame />\n</Model>\n")),Object(a.b)("h3",{id:"api"},"API"),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"withFrame")," is a wrapper around a ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/frames"}),"Frame")," component."),Object(a.b)("p",null,"Wrapping a component with ",Object(a.b)("inlineCode",{parentName:"p"},"withFrame")," will expose the connected component to the following properties:\nThese properties come from the state of the ",Object(a.b)("inlineCode",{parentName:"p"},"Model")," this component is a descendant of."),Object(a.b)(r.s,{mdxType:"WithFrameAPI"}),Object(a.b)("p",null,"For convenience, a component which is a direct child of a ",Object(a.b)("inlineCode",{parentName:"p"},"Model")," automatically receives these properties without ",Object(a.b)("inlineCode",{parentName:"p"},"withFrame"),"."),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"import {Model, withFrame} from 'react-sim';\n\nconst FrameComponent = props => <>{ /* ... */ }</>;\nconst Frame = withFrame(FrameComponent);\n\nexport function MyModel = () => <Model>\n  {/* this component has access to frame props */}\n  <FrameComponent />\n  <div>\n    {/* this one doesn't, because it's not a direct child */}\n    <FrameComponent />\n    {/* this component has access to frame props, because it's connected */}\n    <Frame />\n  </div>\n</Model>\n")),Object(a.b)("h2",{id:"grid"},"Grid"),Object(a.b)("p",null,"see ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"./frame-helpers/grid"}),"Grid guide")),Object(a.b)("h3",{id:"usage-2"},"Usage"),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"  import {Model, Grid} from 'react-sim';\n\n  export function MyModel = () => <Model>\n    <Grid />\n  </Model>\n")),Object(a.b)("h3",{id:"api-1"},"API"),Object(a.b)(r.g,{mdxType:"GridAPI"}),Object(a.b)("h3",{id:"gridcomponent"},"GridComponent"),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"import { GridComponent } from 'react-sim';\n")),Object(a.b)("p",null,Object(a.b)("inlineCode",{parentName:"p"},"Grid")," is wrapped with ",Object(a.b)("inlineCode",{parentName:"p"},"withFrame")," so it can be used anywhere in the tree. The corresponding, unwrapped component, ",Object(a.b)("inlineCode",{parentName:"p"},"GridComponent"),", can also be exported from ",Object(a.b)("inlineCode",{parentName:"p"},"react-sim"),"."),Object(a.b)("h2",{id:"canvasframe"},"CanvasFrame"),Object(a.b)("p",null,"see ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"./frame-helpers/canvas-frame"}),"CanvasFrame guide")),Object(a.b)("h3",{id:"usage-3"},"Usage"),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"  import {Model, CanvasFrame} from 'react-sim';\n\n  function draw({ctx, data, ...args}) => {\n    /* canvas operations */\n  }\n\n  export function MyModel = () => <Model>\n    <CanvasFrame draw={draw} />\n  </Model>\n")),Object(a.b)("h3",{id:"api-2"},"API"),Object(a.b)(r.a,{mdxType:"CanvasFrameAPI"}),Object(a.b)("h3",{id:"circle"},"Circle"),Object(a.b)(r.b,{mdxType:"CircleAPI"}),Object(a.b)("h3",{id:"roundrectangle"},"RoundRectangle"),Object(a.b)(r.m,{mdxType:"RoundRectangleAPI"}),Object(a.b)("h3",{id:"draw"},"Draw"),Object(a.b)(r.f,{mdxType:"DrawAPI"}),Object(a.b)("h2",{id:"timeseries"},"TimeSeries"),Object(a.b)("p",null,"see ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/frame-helpers/time-series"}),"TimeSeries guide"),"."),Object(a.b)("h3",{id:"series"},"Series"),Object(a.b)(r.o,{mdxType:"SeriesAPI"}),Object(a.b)("h3",{id:"timeseries-1"},"TimeSeries"),Object(a.b)(r.p,{mdxType:"TimeSeriesAPI"}),Object(a.b)("h3",{id:"counter"},"Counter"),Object(a.b)(r.d,{mdxType:"CounterAPI"}),Object(a.b)("h3",{id:"indicator"},"Indicator"),Object(a.b)(r.h,{mdxType:"IndicatorAPI"}),Object(a.b)("h2",{id:"controls"},"Controls"),Object(a.b)("p",null,"See ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls"}),"Controls guide"),"."),Object(a.b)("h3",{id:"withcontrols"},"withControls"),Object(a.b)("p",null,"Components wrapped with ",Object(a.b)("inlineCode",{parentName:"p"},"withControls")," gain access to the following properties:"),Object(a.b)(r.r,{mdxType:"WithControlsAPI"}),Object(a.b)("h3",{id:"common-controls-properties"},"Common Controls Properties"),Object(a.b)("p",null,"Unless otherwise specified, all built-in controls have the following properties:"),Object(a.b)(r.c,{mdxType:"CommonControlsPropsAPI"}),Object(a.b)("h3",{id:"range"},"Range"),Object(a.b)("p",null,"See the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls/range"}),"Range guide"),"."),Object(a.b)(r.l,{mdxType:"RangeAPI"}),Object(a.b)("h3",{id:"timer"},"Timer"),Object(a.b)("h4",{id:"default-timer"},"Default Timer"),Object(a.b)("p",null,"See the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls/default-timer"}),"Default timer guide"),"."),Object(a.b)("p",null,"By default a ",Object(a.b)("inlineCode",{parentName:"p"},"Model")," comes with a built-in ",Object(a.b)("inlineCode",{parentName:"p"},"Timer")," control. For this defaut ",Object(a.b)("inlineCode",{parentName:"p"},"Timer"),", the following props come directly from ",Object(a.b)("inlineCode",{parentName:"p"},"Model")," (see ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/api/#model"}),"Model properties"),".)"),Object(a.b)(r.e,{mdxType:"DefaultTimerAPI"}),Object(a.b)("h4",{id:"general-case"},"General case"),Object(a.b)("p",null,"See the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls/timer"}),"Timer guide"),"."),Object(a.b)("p",null,"If the ",Object(a.b)("inlineCode",{parentName:"p"},"Timer")," is defined anywhere else, these properties can be passed to the ",Object(a.b)("inlineCode",{parentName:"p"},"Timer")," directly."),Object(a.b)(r.q,{mdxType:"TimerAPI"}),Object(a.b)("h3",{id:"checkbox"},"Checkbox"),Object(a.b)("p",null,"See the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls/checkbox"}),"Checkbox guide.")),Object(a.b)("p",null,"Its API is solely the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/api/#common-controls-properties"}),"Common Control Props.")),Object(a.b)("h3",{id:"input"},"Input"),Object(a.b)("p",null,"See the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls/input"}),"Input guide.")),Object(a.b)("p",null,"Its API is solely the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/api/#common-controls-properties"}),"Common Control Props.")),Object(a.b)("h3",{id:"radio"},"Radio"),Object(a.b)("p",null,"See the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls/radio"}),"Radio guide.")),Object(a.b)(r.k,{mdxType:"RadioAPI"}),Object(a.b)("h3",{id:"select"},"Select"),Object(a.b)("p",null,"See the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls/select"}),"Select guide.")),Object(a.b)(r.n,{mdxType:"SelectAPI"}),Object(a.b)("h3",{id:"toggle"},"Toggle"),Object(a.b)("p",null,"See the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls/toggle"}),"Toggle guide.")),Object(a.b)("p",null,"Its API is solely the ",Object(a.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/api/#common-controls-properties"}),"Common Control Props.")))}o.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-api-mdx-083e2da01da935c05eca.js.map