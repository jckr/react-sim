(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{CczQ:function(e,t,r){var n=r("P8UN"),a=Math.abs;n(n.S,"Math",{hypot:function(e,t){for(var r,n,i=0,o=0,s=arguments.length,c=0;o<s;)c<(r=a(arguments[o++]))?(i=i*(n=c/r)*n+1,c=r):i+=r>0?(n=r/c)*n:r;return c===1/0?1/0:c*Math.sqrt(i)}})},Hmny:function(e,t,r){"use strict";r.r(t),r.d(t,"_frontmatter",(function(){return i})),r.d(t,"default",(function(){return s}));r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("E5k/"),r("q1tI");var n=r("7ljp"),a=r("qlMS");var i={Title:"Epidemic"},o={_frontmatter:i};function s(e){var t=e.components,r=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,["components"]);return Object(n.b)("wrapper",Object.assign({},o,r,{components:t,mdxType:"MDXLayout"}),Object(n.b)("h1",{id:"epidemic"},"Epidemic"),Object(n.b)(a.a,{mdxType:"Epidemic"}),Object(n.b)("h3",{id:"caveat"},"Caveat"),Object(n.b)("p",null,"The purpose of this model is just to show how simulations work in React. It has no scientific value."),Object(n.b)("p",null,"This epidemic simulator is inspired by the work of ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"https://www.washingtonpost.com/graphics/2020/world/corona-simulator/"}),"Harry Stevens at the Washington Post"),".\nAgain, this react-sim version was made without any scientific supervision and the parameters are just put in so it can look interesting."),Object(n.b)("p",null,'We have a number of agents moving in a small space. When they collide, "sick" agents may contaminate "healthy" agents, and "sick" agents may die.'))}s.isMDXComponent=!0},qlMS:function(e,t,r){"use strict";r("pJf4"),r("q8oJ"),r("cFtU"),r("m210"),r("4DPX"),r("E5k/"),r("n0hJ"),r("Ggvi"),r("YbXK"),r("ToIb"),r("rzGZ"),r("Dq+y"),r("8npG"),r("CczQ");var n=r("q1tI"),a=r.n(n),i=r("VdAu"),o=r("1uUR"),s=r("sCKr");function c(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var l={sick:"#4f8c9d",recovered:"#add51f",healthy:"#997cfb",dead:"#6a9012"};function d(e,t){var r=e.data,n=e.tick,a=e.params,i=e.complete;void 0===t&&(t=Math.random);var o=JSON.parse(JSON.stringify(r.agents)),s=0,c=0,u=0,l=0,d=a.contaminationRisk,h=a.deathRisk,v=a.r,f=a.recoveryTicks,y=a.height,p=a.width;return o.forEach((function(e,r){if("sick"===e.status&&(n>=e.recovery?e.status="recovered":t()<h&&(e.status="dead")),"dead"!==e.status){for(var a=r+1;a<o.length;a++){var i=o[a],m=i.x-e.x,b=i.y-e.y,g=Math.hypot(m,b);if(g<2*v){var k=m/g,x=b/g;e.vx=e.vx-k,e.vy=e.vy-x,i.vx=k,i.vy=x,"sick"===e.status&&"healthy"===i.status&&t()<=d&&(i.status="sick",i.recovery=n+f),"healthy"===e.status&&"sick"===i.status&&t()<=d&&(e.status="sick",e.recovery=n+f)}}e.x=e.x+e.vx,e.y=e.y+e.vy,(e.vy<0&&e.y<v||e.vy>0&&e.y>y-v)&&(e.vy=-e.vy),(e.vx<0&&e.x<v||e.vx>0&&e.x>p-v)&&(e.vx=-e.vx)}switch(e.status){case"sick":s++;break;case"healthy":c++;break;case"recovered":l++;break;case"dead":u++}})),0===s&&i(),{agents:o,sick:s,recovered:l,dead:u,healthy:c}}function h(e,t,r){for(var n=c(Array(e).keys()).reduce((function(e,t){return e[t]=!0,e}),{}),a=new Set,i=0;i<t;i++){var o=Math.floor(r()*Object.keys(n).length);a.add(o),delete n[o]}return a}function v(e,t,r,n){var a=n.x,i=n.y;return e.slice(t).filter((function(e){var t=e.x,n=e.y;return Math.hypot(t-a,n-i)<r}))}function f(e,t){var r=e.nbAgents,n=void 0===r?200:r,a=e.nbSick,i=void 0===a?5:a,o=e.maxSpeed,s=void 0===o?30:o,c=(e.contaminationRisk,e.deathRisk,e.recoveryTicks),u=void 0===c?20:c,l=e.nbDistancing,d=void 0===l?50:l,f=e.r,y=void 0===f?3:f,p=e.height,m=void 0===p?300:p,b=e.width,g=void 0===b?400:b;void 0===t&&(t=Math.random);for(var k=h(n,i,t),x=h(n,d,t),w=[],O=0;O<n;O++){var j=void 0,S=void 0;do{S=y/2+t()*(m-y),j=y/2+t()*(g-y)}while(v(w,0,y,{x:j,y:S}).length);var E=k.has(O)?"sick":"healthy",R=k.has(O)?u:null,D=x.has(O),M=D?0:s,A=M*(2*t()-1),T=M*(2*t()-1);w.push({x:j,y:S,status:E,isBouncing:!1,isDistancing:D,vx:A,vy:T,recovery:R,speed:M})}return{agents:w,sick:i,healthy:n-i,dead:0,recovered:0}}var y=function(e){var t,r;function n(t){var r;return(r=e.call(this,t)||this).myRef=a.a.createRef(),r}r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r;var i=n.prototype;return i.componentDidUpdate=function(){var e=this.props,t=e.data,r=e.params,n=r.width,a=r.height,i=r.r,o=this.myRef.current.getContext("2d");o.fillStyle="#fff",o.lineWidth="5px",o.clearRect(0,0,n,a),t.agents.forEach((function(e){var t=e.status,r=(e.isBouncing,e.x),n=e.y;o.beginPath(),o.fillStyle=l[t],o.arc(r,n,i,0,2*Math.PI,!1),o.closePath(),o.fill()}))},i.render=function(){return a.a.createElement("div",null,a.a.createElement("canvas",{width:this.props.params.width,height:this.props.params.height,ref:this.myRef}))},n}(a.a.Component),p=Object(o.i)(y),m=[{color:l.healthy,label:"Healthy",accessor:function(e){return e.healthy}},{color:l.sick,label:"Sick",accessor:function(e){return e.sick}},{color:l.recovered,label:"Recovered",accessor:function(e){return e.recovered}},{color:l.dead,label:"Dead",accessor:function(e){return e.dead}}];t.a=function(e){return a.a.createElement(s.a,Object.assign({initData:f,initialParams:{nbAgents:500,nbSick:20,contaminationRisk:1,deathRisk:.001,maxSpeed:2,recoveryTicks:200,nbDistancing:0,r:2,height:332,width:332},updateData:d,maxTime:500},e),a.a.createElement(i.c,{flexDirection:"column"},a.a.createElement(p,null),e.hideSeries?null:a.a.createElement(o.f,{series:m,stacked:!0}),e.hideSeries?null:a.a.createElement(o.b,{series:m})))}},sCKr:function(e,t,r){"use strict";r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("E5k/");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("VdAu");t.a=function(e){var t=e.fmOverrides,r=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,["fmOverrides"]);return a.a.createElement(o.c,Object.assign({sx:{border:"1px solid currentcolor",my:2,p:2,width:"350px"}},t),a.a.createElement(i.d,r))}}}]);
//# sourceMappingURL=component---src-pages-examples-epidemic-mdx-85526b23ab8e9d63d668.js.map