(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{Jh09:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return i})),n.d(t,"default",(function(){return c}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp"),r=n("u0c3");var i={Title:"Fibonacci"},o={_frontmatter:i};function c(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},o,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"fibonacci-sequence"},"Fibonacci sequence"),Object(a.b)("p",null,"Both of these examples are inspired by the Fibonacci sequence, where:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"F",Object(a.b)("sub",null,"0")," = 0,"),Object(a.b)("li",{parentName:"ul"},"F",Object(a.b)("sub",null,"1")," = 1,"),Object(a.b)("li",{parentName:"ul"},"F",Object(a.b)("sub",null,"n")," = F",Object(a.b)("sub",null,"n - 1")," + F",Object(a.b)("sub",null,"n - 2")," for each n > 2.")),Object(a.b)("p",null,"0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ..."),Object(a.b)(r.b,{mdxType:"FibonacciSquares"}),Object(a.b)("p",null,"The corresponding ",Object(a.b)("inlineCode",{parentName:"p"},"udpateData")," function is really simple:"),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"function updateData({ data, tick }) {\n  if (tick === 0) {\n    return [0];\n  }\n  if (tick === 1) {\n    return [0, 1];\n  }\n  const lastNumber = data[tick - 1] + data[tick - 2];\n  return [...data, lastNumber];\n}\n")),Object(a.b)("p",null,"We can draw squares with sides corresponding to the number in the sequence:"),Object(a.b)("p",null,"Joining their corners, they form a spiral."),Object(a.b)("p",null,"F",Object(a.b)("sub",null,"n")," / F",Object(a.b)("sub",null,"n-1")," converges to φ, the golden ratio - (1 - √5) / 2."),Object(a.b)("p",null,"We can start from a rectangle φ * k by k rectangle, divide its longer side by φ, draw that square, and keep on dividing the remaining rectangle.\nWe'll have squares of same proportions and can also draw a similar spiral."),Object(a.b)(r.a,{mdxType:"FibonacciSpiral"}),Object(a.b)("p",null,"In this case, we don't even need to provide data, an initData or an updateData function.\nAll we need is the number of steps we want to go (tick) and a Frame to render the squares and spiral."),Object(a.b)("pre",null,Object(a.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"const FibonacciSpiral = () => (\n  <Model initialParams={{ size: 500 }} delay={100} maxTime={20}>\n    <FibonacciSpiralFrame />\n  </Model>\n);\n")))}c.isMDXComponent=!0},u0c3:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return j}));n("pJf4"),n("q8oJ"),n("8npG"),n("YbXK"),n("cFtU"),n("rzGZ"),n("m210"),n("4DPX");var a=n("q1tI"),r=n.n(a),i=n("1uUR"),o=n("sCKr");function c(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}var s=.5+Math.sqrt(5)/2,u={0:"right",1:"down",2:"left",3:"up"},b={right:"#b6b6e2",down:"#a6d3d9",left:"#ffeb3b",up:"#95d392"};function d(){return[0]}function p(e){var t=e.data,n=e.tick;if(0===n)return[0];if(1===n)return[0,1];var a=t[n-1]+t[n-2];return[].concat(c(t),[a])}function f(e){var t=e.ctx,n=e.params.size,a=e.tick;t.fillStyle="#fff",t.fillRect(0,0,n,n);for(var r=0,i=0,o=n,c=0;c<a;c++){var l=u[c%4];o/=s,t.strokeStyle="#ddd",t.strokeRect(r,i,o,o),t.strokeStyle="#222";var b=Math.max(0,o-1);switch(l){case"right":t.beginPath(),t.arc(r+o,i+o,b,Math.PI,-Math.PI/2),t.stroke(),t.closePath(),r+=o;break;case"down":t.beginPath(),t.arc(r,i+o,b,-Math.PI/2,0),t.stroke(),t.closePath(),r+=(1-1/s)*o,i+=o;break;case"left":t.beginPath(),t.arc(r,i,b,0,Math.PI/2),t.stroke(),t.closePath(),r-=o/s,i+=(1-1/s)*o;break;case"up":t.beginPath(),t.arc(r+o,i,b,Math.PI/2,Math.PI),t.stroke(),t.closePath(),i-=o/s}}}var h=function(e){e.tick;var t=e.params.size,n=t,a=t/s;return r.a.createElement(i.a,{height:a,width:n,draw:f})},m=function(){return r.a.createElement(o.a,{initialParams:{size:332},delay:100,maxTime:15},r.a.createElement(h,null))},g=function(e){var t=e.data,n=(e.tick,e.params),a=0,i=0,o=0,c=0,l=0,s=0;var d,p=(d=t.slice(1)).map((function(e,t){var p=10*e,f=u[t%4];switch(f){case"right":s-=p;break;case"left":l-=p;break;case"up":l-=p,s-=p}var h=Math.max(.1,t<2?1/n.size:1/(p+10*d[t-1])),m=p/(1.5*String(e).length),g=r.a.createElement("div",{key:"rect-"+t,style:{position:"absolute",border:"#{borderWidth}px solid #777",boxSizing:"border-box",display:"flex",alignItems:"center",justifyContent:"center",background:b[f],top:s,left:l,width:p,height:p,overflow:"hidden"}},r.a.createElement("div",{style:{fontSize:m}},e),r.a.createElement("div",{style:{position:"absolute",width:2*p,height:2*p,border:h+"px solid black",borderRadius:p,boxSizing:"border-box",top:0,left:0,transform:{right:void 0,down:"translate(-50%)",left:"translate(-50%,-50%)",up:"translate(0,-50%)"}[f]}}));switch(f){case"right":l+=p;break;case"down":l+=p,s+=p;break;case"left":s+=p}return a=Math.max(a,l),i=Math.min(i,l),o=Math.max(o,s),c=Math.min(c,s),g})),f=Math.max(a-i,o-c),h=n.size/f;return r.a.createElement("div",{style:{width:n.size,height:n.size,position:"relative",pointerEvents:"none",overflow:"hidden"}},r.a.createElement("div",{style:{position:"relative",transformOrigin:"top left",transform:"scale("+h+") translate("+-i+"px,"+-c+"px)",width:a-i+"px",height:o-c+"px",transition:"transform 0.2s"}},p))},j=function(){return r.a.createElement(o.a,{initialParams:{size:350},initData:d,updateData:p,delay:400,maxTime:12},r.a.createElement(g,null))}}}]);
//# sourceMappingURL=component---src-pages-examples-fibonacci-mdx-e5574c1d5e6cd2c876b4.js.map