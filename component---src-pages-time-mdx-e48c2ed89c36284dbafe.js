(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{"jTN+":function(e,t,a){"use strict";a.r(t),a.d(t,"_frontmatter",(function(){return l})),a.d(t,"default",(function(){return o}));a("rzGZ"),a("Dq+y"),a("8npG"),a("Ggvi"),a("E5k/"),a("q1tI");var n=a("7ljp"),i=a("u0c3");var l={Title:"Time"},r={_frontmatter:l};function o(e){var t=e.components,a=function(e,t){if(null==e)return{};var a,n,i={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(i[a]=e[a]);return i}(e,["components"]);return Object(n.b)("wrapper",Object.assign({},r,a,{components:t,mdxType:"MDXLayout"}),Object(n.b)("h1",{id:"how-time-works"},"How Time Works"),Object(n.b)("p",null,"Time is one of the central notions of ",Object(n.b)("inlineCode",{parentName:"p"},"react-sim"),"."),Object(n.b)("p",null,"A react-sim ",Object(n.b)("inlineCode",{parentName:"p"},"Model")," will maintain:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"tick")," (integer), a representation of the progress in the simulation,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"data")," (anything), the internal state of the data to be shown,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"isPlaying")," (boolean), a flag that controls whether the animation is running or not.")),Object(n.b)("p",null,"In addition to these main properties, ",Object(n.b)("inlineCode",{parentName:"p"},"Model")," also maintains:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"cachedData")," (object), which caches data which has already been calculated for a given ",Object(n.b)("inlineCode",{parentName:"li"},"tick"),","),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"results")," (array), where information on the previous runs of the simulation can be stored.")),Object(n.b)("p",null,"The simulation author is expected to pass properties such as:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"initialParams")," (object), a list of params for the simulation. They can be overridden by the ",Object(n.b)("a",Object.assign({parentName:"li"},{href:"/react-sim/controls"}),"controls"),"."),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"initData")," (function), which takes ",Object(n.b)("inlineCode",{parentName:"li"},"params"),"as input and outputs the first value for ",Object(n.b)("inlineCode",{parentName:"li"},"data"),"."),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"updateData")," (function), which takes: ",Object(n.b)("inlineCode",{parentName:"li"},"params"),", ",Object(n.b)("inlineCode",{parentName:"li"},"data"),", ",Object(n.b)("inlineCode",{parentName:"li"},"tick"),", ",Object(n.b)("inlineCode",{parentName:"li"},"cachedData"),", and ",Object(n.b)("inlineCode",{parentName:"li"},"results")," as inputs, and outputs a new value for ",Object(n.b)("inlineCode",{parentName:"li"},"data"),".")),Object(n.b)("h1",{id:"the-simulation-lifecycle"},"The simulation lifecycle"),Object(n.b)("h2",{id:"initial-state"},"Initial state"),Object(n.b)("p",null,"When a ",Object(n.b)("inlineCode",{parentName:"p"},"<Model />")," is created it will:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"initiate the interal ",Object(n.b)("inlineCode",{parentName:"li"},"params")," from the values of ",Object(n.b)("inlineCode",{parentName:"li"},"initParams"),"."),Object(n.b)("li",{parentName:"ul"},"initiate ",Object(n.b)("inlineCode",{parentName:"li"},"tick")," - either through the ",Object(n.b)("inlineCode",{parentName:"li"},"minTime")," or the ",Object(n.b)("inlineCode",{parentName:"li"},"initialTick")," prop. ",Object(n.b)("inlineCode",{parentName:"li"},"minTime")," takes precedence."),Object(n.b)("li",{parentName:"ul"},"run ",Object(n.b)("inlineCode",{parentName:"li"},"initData")," and generate a first value for ",Object(n.b)("inlineCode",{parentName:"li"},"data")," from the ",Object(n.b)("inlineCode",{parentName:"li"},"params"),".")),Object(n.b)("p",null,"The ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/frame"}),"frames")," will not render until ",Object(n.b)("inlineCode",{parentName:"p"},"initData")," has run, but they will render once ",Object(n.b)("inlineCode",{parentName:"p"},"data")," has been initialized once."),Object(n.b)("p",null,"If the ",Object(n.b)("inlineCode",{parentName:"p"},"isPlaying")," prop of the ",Object(n.b)("inlineCode",{parentName:"p"},"<Model />")," is set to true, it will start ",Object(n.b)("inlineCode",{parentName:"p"},"playing"),". Else, the simulation doesn't change until ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls"}),"controls")," trigger it."),Object(n.b)("h2",{id:"playing"},"Playing"),Object(n.b)("p",null,"When the simulation is playing, every so often it will try to update ",Object(n.b)("inlineCode",{parentName:"p"},"data")," and refresh the ",Object(n.b)("inlineCode",{parentName:"p"},"Frames"),".\nBy default, the simulation refreshes 60 times per second."),Object(n.b)("p",null,"It's possible to make it go slower by providing a ",Object(n.b)("inlineCode",{parentName:"p"},"delay")," prop to ",Object(n.b)("inlineCode",{parentName:"p"},"Model"),". The simulation will wait that long (in ms) to refresh the animation.\nEach time the animation refreshes, the simulation will progress by 1 tick (i.e. the ",Object(n.b)("inlineCode",{parentName:"p"},"tick")," value will increase by 1.)\nIt's also possible to make it go faster with a ",Object(n.b)("inlineCode",{parentName:"p"},"ticksPerAnimation")," prop. If this value is greater than 1, then the simualtion will try to update ",Object(n.b)("inlineCode",{parentName:"p"},"data")," that many times before re-rendering ",Object(n.b)("inlineCode",{parentName:"p"},"Frames"),"."),Object(n.b)("p",null,"We can use both values at once. For instance, we can have a simulation that, every 100ms, updates 500 times."),Object(n.b)("h3",{id:"playing-stops-if"},"Playing stops if:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},"the user ",Object(n.b)("em",{parentName:"li"},"pauses")," or ",Object(n.b)("em",{parentName:"li"},"stops")," the simulation,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"ticks")," reaches the maximum value,"),Object(n.b)("li",{parentName:"ul"},"the simulation ",Object(n.b)("em",{parentName:"li"},"completes"),".")),Object(n.b)("p",null,"When the simulation ",Object(n.b)("em",{parentName:"p"},"pauses"),", ",Object(n.b)("inlineCode",{parentName:"p"},"isPlaying")," simply switches to false. Nothing else changes, ",Object(n.b)("inlineCode",{parentName:"p"},"tick")," stays the same, so does ",Object(n.b)("inlineCode",{parentName:"p"},"data"),", etc.\nThe ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-sim/controls/default-timer"}),"default timer")," provides an easy way for a user to trigger a ",Object(n.b)("inlineCode",{parentName:"p"},"pause"),". Model has an internal method that pauses, which can be exposed to controls."),Object(n.b)("p",null,"When the simulation ",Object(n.b)("em",{parentName:"p"},"stops"),", ",Object(n.b)("inlineCode",{parentName:"p"},"isPlaying")," switches to false, but data is also re-initiated:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"tick")," goes back to its original value,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"initData")," fires again and overwrites ",Object(n.b)("inlineCode",{parentName:"li"},"data"),","),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"cachedData")," is emptied,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"results")," is left unchanged.")),Object(n.b)("p",null,"The simulation ",Object(n.b)("em",{parentName:"p"},"completes")," when ",Object(n.b)("inlineCode",{parentName:"p"},"updateData")," triggered a condition where it can't go any further.\nWhen this happens:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"isPlaying")," switches to false, but:"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"tick")," is unchanged,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"data")," is unchanged,"),Object(n.b)("li",{parentName:"ul"},"A ",Object(n.b)("inlineCode",{parentName:"li"},"result")," for this run may be appended to ",Object(n.b)("inlineCode",{parentName:"li"},"results"),".")),Object(n.b)("p",null,"The simulation won't reset unless manually triggered."),Object(n.b)("h3",{id:"when-to-update-or-cache-data"},"When to update or cache data"),Object(n.b)("p",null,"Each time ",Object(n.b)("inlineCode",{parentName:"p"},"tick")," changes, ",Object(n.b)("inlineCode",{parentName:"p"},"data")," is updated.\nIf using cached data, and ",Object(n.b)("inlineCode",{parentName:"p"},"tick")," changes to a value for which ",Object(n.b)("inlineCode",{parentName:"p"},"cachedData")," has precomputed values, then the simulation will simply retrieve those values and not do further calculations.\nThis can happen, for instance, if a user uses the time slider to move back in time."),Object(n.b)("p",null,"Else, we're going to figure out which is the latest value of ",Object(n.b)("inlineCode",{parentName:"p"},"tick")," for which we have data, and through how many cycles do we have to go to get to the current value of ",Object(n.b)("inlineCode",{parentName:"p"},"tick")," - which can be just 1 if tick is simply incrementing along the animation, but which could be more if ",Object(n.b)("inlineCode",{parentName:"p"},"ticksPerAnimation")," is set, or if we are moving foward in time with the time slider, and run ",Object(n.b)("inlineCode",{parentName:"p"},"updateData")," as many times as needed.\n",Object(n.b)("inlineCode",{parentName:"p"},"updateData")," will stop running if:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"tick")," reaches the maximum value, or"),Object(n.b)("li",{parentName:"ul"},"the simulation ",Object(n.b)("em",{parentName:"li"},"completes"),".")),Object(n.b)("p",null,"Each time it successfully runs, if caching data, it will update ",Object(n.b)("inlineCode",{parentName:"p"},"cachedData"),"."),Object(n.b)("p",null,"If a simulation is never going to complete, and has no maximum time value, and there's no reason to go back in time, then it may be a good idea to disable caching, as the system will eventually run out of memory. You can do that by setting the ",Object(n.b)("inlineCode",{parentName:"p"},"noCache")," property of the ",Object(n.b)("inlineCode",{parentName:"p"},"Model")," to ",Object(n.b)("inlineCode",{parentName:"p"},"true"),"."),Object(n.b)("h3",{id:"updating-data"},"Updating data"),Object(n.b)("p",null,"Updating data is done through the ",Object(n.b)("inlineCode",{parentName:"p"},"updateData")," function, which takes as arguments an object with the following properties:"),Object(n.b)("ul",null,Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"data"),": the existing ",Object(n.b)("inlineCode",{parentName:"li"},"data"),","),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"tick"),": the next value of ",Object(n.b)("inlineCode",{parentName:"li"},"tick"),","),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"params"),": all the ",Object(n.b)("inlineCode",{parentName:"li"},"params")," of the simulation,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"cachedData"),": the cached values of ",Object(n.b)("inlineCode",{parentName:"li"},"data")," for previous ticks,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"results"),": the results of previous runs,"),Object(n.b)("li",{parentName:"ul"},Object(n.b)("inlineCode",{parentName:"li"},"complete"),": a function that signals that the simulation is complete. If it's provided an argument (result), that is added to the ",Object(n.b)("inlineCode",{parentName:"li"},"results")," property of the simulation.")),Object(n.b)("p",null,Object(n.b)("inlineCode",{parentName:"p"},"updateData")," will return an updated value for ",Object(n.b)("inlineCode",{parentName:"p"},"data"),". Even if it completes, it's expected to return ",Object(n.b)("inlineCode",{parentName:"p"},"data"),"."),Object(n.b)("p",null,"The main idea behind ",Object(n.b)("inlineCode",{parentName:"p"},"updateData")," taking the existing ",Object(n.b)("inlineCode",{parentName:"p"},"data")," as an argument is that it can operates as a mathematical sequence."),Object(n.b)("p",null,"For example, in the following Fibonacci spiral example:"),Object(n.b)(i.b,{mdxType:"FibonacciSpiral"}),Object(n.b)("p",null,"the ",Object(n.b)("inlineCode",{parentName:"p"},"updateData")," function is a very simple recursion:"),Object(n.b)("pre",null,Object(n.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"function updateData({ data, tick }) {\n  if (tick === 0) {\n    return [0];\n  }\n  if (tick === 1) {\n    return [0, 1];\n  }\n  const lastNumber = data[tick - 1] + data[tick - 2];\n  return [...data, lastNumber];\n}\n")),Object(n.b)("p",null,"But ",Object(n.b)("inlineCode",{parentName:"p"},"updateData")," has access to other properties of the simulation, and can use past values of data, or even information on previous runs of the simulation, as needed.\n",Object(n.b)("inlineCode",{parentName:"p"},"updateData")," can also not use any of these arguments and provide values unrelated to the previous state of the simulation."))}o.isMDXComponent=!0},u0c3:function(e,t,a){"use strict";a.d(t,"b",(function(){return j})),a.d(t,"a",(function(){return f}));a("pJf4"),a("q8oJ"),a("8npG"),a("YbXK"),a("cFtU"),a("rzGZ"),a("m210"),a("4DPX"),a("E5k/");var n=a("q1tI"),i=a.n(n),l=a("1uUR"),r=a("VdAu"),o=a("sCKr");function c(e){return function(e){if(Array.isArray(e))return b(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return b(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);"Object"===a&&e.constructor&&(a=e.constructor.name);if("Map"===a||"Set"===a)return Array.from(e);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return b(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function b(e,t){(null==t||t>e.length)&&(t=e.length);for(var a=0,n=new Array(t);a<t;a++)n[a]=e[a];return n}var s=.5+Math.sqrt(5)/2,p={0:"right",1:"down",2:"left",3:"up"};function m(){return[0]}function u(e){var t=e.data,a=e.tick;if(0===a)return[0];if(1===a)return[0,1];var n=t[a-1]+t[a-2];return[].concat(c(t),[n])}function d(e){var t=e.ctx,a=e.params.size,n=e.tick;t.fillStyle="#fff",t.fillRect(0,0,a,a);for(var i=0,l=0,r=a,o=0;o<n;o++){var c=p[o%4];r/=s,t.strokeStyle="#ddd",t.strokeRect(i,l,r,r),t.strokeStyle="#222";var b=Math.max(0,r-1);switch(c){case"right":t.beginPath(),t.arc(i+r,l+r,b,Math.PI,-Math.PI/2),t.stroke(),t.closePath(),i+=r;break;case"down":t.beginPath(),t.arc(i,l+r,b,-Math.PI/2,0),t.stroke(),t.closePath(),i+=(1-1/s)*r,l+=r;break;case"left":t.beginPath(),t.arc(i,l,b,0,Math.PI/2),t.stroke(),t.closePath(),i-=r/s,l+=(1-1/s)*r;break;case"up":t.beginPath(),t.arc(i+r,l,b,Math.PI/2,Math.PI),t.stroke(),t.closePath(),l-=r/s}}}var h=function(e){e.tick;var t=e.params.size,a=t,n=t/s;return i.a.createElement(l.a,{height:n,width:a,draw:d})},j=function(e){return i.a.createElement(o.a,Object.assign({initialParams:{size:332},delay:100,maxTime:15},e),i.a.createElement(h,null))},O=function(e){var t=e.data;return i.a.createElement(r.c,{sx:{flexDirection:"row",flexWrap:"wrap"}},t.map((function(e,t){return i.a.createElement(r.a,{sx:{m:1,p:2,bg:"muted",fontSize:1},key:t},e)})))},f=function(e){return i.a.createElement(o.a,Object.assign({initData:m,updateData:u,maxTime:20},e),i.a.createElement(O,null))};t.c=j}}]);
//# sourceMappingURL=component---src-pages-time-mdx-e48c2ed89c36284dbafe.js.map