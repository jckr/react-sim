(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{"3AzE":function(t,e,n){"use strict";n.r(e),n.d(e,"_frontmatter",(function(){return i})),n.d(e,"default",(function(){return c}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var a=n("7ljp"),r=n("DsOZ");var i={Title:"Boids"},o={_frontmatter:i};function c(t){var e=t.components,n=function(t,e){if(null==t)return{};var n,a,r={},i=Object.keys(t);for(a=0;a<i.length;a++)n=i[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,["components"]);return Object(a.b)("wrapper",Object.assign({},o,n,{components:e,mdxType:"MDXLayout"}),Object(a.b)("h1",{id:"boids"},"Boids"),Object(a.b)(r.b,{mdxType:"Boids"}),Object(a.b)("p",null,Object(a.b)("a",Object.assign({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Boids"}),"Boids")," is one of the best-known agent simulations in computer graphics."),Object(a.b)("p",null,"A number of boid agents move in a plane and their movement is governed by three forces:"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},"alignment: they try to move in the same direction than the boids around them,"),Object(a.b)("li",{parentName:"ul"},"cohesion: they try to move towards the average position of boids around them,"),Object(a.b)("li",{parentName:"ul"},"separation: they try to avoid other boids around them.")),Object(a.b)("p",null,"The boids movement is reminescent of that of flock of birds."),Object(a.b)("p",null,"In our implementation, each of these forces can be parameterized: the coefficient is how much this force affects the boid's movement, and the radius is the maximum distance at which neighboring boids are considered."))}c.isMDXComponent=!0},CczQ:function(t,e,n){var a=n("P8UN"),r=Math.abs;a(a.S,"Math",{hypot:function(t,e){for(var n,a,i=0,o=0,c=arguments.length,s=0;o<c;)s<(n=r(arguments[o++]))?(i=i*(a=s/n)*a+1,s=n):i+=n>0?(a=n/s)*a:n;return s===1/0?1/0:s*Math.sqrt(i)}})},DsOZ:function(t,e,n){"use strict";n.d(e,"a",(function(){return D}));n("xtjI"),n("Dq+y"),n("Ggvi"),n("pJf4"),n("q8oJ"),n("8npG"),n("YbXK"),n("cFtU"),n("rzGZ"),n("m210"),n("4DPX"),n("E5k/"),n("n0hJ"),n("CczQ");var a=n("q1tI"),r=n.n(a),i=n("1uUR"),o=n("sCKr");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){l(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t){return function(t){if(Array.isArray(t))return f(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||function(t,e){if(!t)return;if("string"==typeof t)return f(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return f(t,e)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}var p={alignmentCoefficient:1,alignmentDistance:50,cohesionCoefficient:1,cohesionDistance:40,height:332,maxforce:.03,maxspeed:2,nbBoids:50,r:5,separationCoefficient:1.5,separationDistance:25,showCircles:!0,width:332},h=function(t){var e=Math.hypot.apply(Math,u(t));return 0===e?t:b(t,e)},m=function(t,e){return t.map((function(t){return t*e}))},b=function(t,e){return t.map((function(t){return t/e}))},d=function(t,e){return t.map((function(t,n){return t+e[n]}))},y=function(t,e){return t.map((function(t,n){return t-e[n]}))},g=function(t,e){var n=Math.hypot.apply(Math,u(t)),a=Math.min(n,e);return b(t,n/a)},v=function(t,e){var n=t.height,a=t.nbBoids,r=t.width;return void 0===e&&(e=Math.random),Array(a).fill(0).map((function(t){var a=2*e()*Math.PI,i=[Math.cos(a),Math.sin(a)];return{angle:a,acceleration:[0,0],position:[e()*r,e()*n],velocity:i}}))},O=function(t){var e=t.data,n=t.params,a=n.alignmentDistance,r=n.cohesionDistance,i=n.separationCoefficient,o=n.alignmentCoefficient,c=n.cohesionCoefficient,l=n.separationDistance,f=n.maxspeed,p=n.maxforce,v=n.r,O=n.height,w=n.width,M=e.map((function(t){return[0,0]})),D=e.map((function(t){return[0,0]})),P=e.map((function(t){return[0,0]}));return e.forEach((function(t,n){for(var s=0,v=0,O=0,w=0;w<e.length;w++)if(w!==n){var x=e[w],C=y(t.position,x.position),k=Math.hypot.apply(Math,u(C));if(k>0&&k<l){var S=b(h(C),k);M[n]=d(M[n],S),s++}k>0&&k<a&&(D[n]=d(D[n],x.velocity),v++),k>0&&k<r&&(P[n]=d(P[n],x.position),O++)}s>0&&(M[n]=b(M[n],s),M[n]=h(M[n]),M[n]=m(M[n],f),M[n]=y(M[n],t.velocity),M[n]=g(M[n],p),M[n]=m(M[n],i)),v>0&&(D[n]=b(D[n],v),D[n]=h(D[n]),D[n]=m(D[n],f),D[n]=y(D[n],t.velocity),D[n]=g(D[n],p),D[n]=m(D[n],o)),O>0&&(P[n]=b(P[n],O),P[n]=j(t.position,P[n],t.velocity,f,p),P[n]=m(P[n],c))})),e.map((function(t,e){var n=d(d(D[e],P[e]),M[e]),a=g(d(t.velocity,n),f),r=d(t.position,a),i=Math.atan2(t.velocity[1],t.velocity[0]);return r[0]<-v&&(r[0]=w+v),r[0]>w+v&&(r[0]=-v),r[1]<-v&&(r[1]=O+v),r[1]>O+v&&(r[1]=-v),s(s({},t),{},{angle:i,position:r,velocity:a})}))},j=function(t,e,n,a,r){var i=m(h(y(e,t)),a),o=y(i,n);return g(o,r)},w=function(t){var e=t.ctx,n=t.circle,a=t.data,r=t.params,i=r.alignmentDistance,o=r.cohesionDistance,c=r.separationDistance,s=r.height,l=r.showCircles,u=r.width,f=r.r;e.fillStyle="#fff",e.fillRect(0,0,u,s),a.forEach((function(t){var a=t.position,r=a[0],s=a[1],u=t.angle;e.strokeStyle="#000",e.globalAlpha=1,e.beginPath(),e.moveTo(r+Math.cos(u)*f,s+Math.sin(u)*f),e.lineTo(r+Math.cos(u+2*Math.PI/3)*f*2/3,s+Math.sin(u+2*Math.PI/3)*f*2/3),e.lineTo(r+Math.cos(u+4*Math.PI/3)*f*2/3,s+Math.sin(u+4*Math.PI/3)*f*2/3),e.closePath(),e.stroke(),l&&(e.globalAlpha=.2,e.strokeStyle="#f00",n({x:r,y:s,r:c}),e.closePath(),e.stroke(),e.strokeStyle="#0f0",n({x:r,y:s,r:i}),e.closePath(),e.stroke(),e.strokeStyle="#00f",n({x:r,y:s,r:o}),e.closePath(),e.stroke())}))},M=function(t){return r.a.createElement(i.a,Object.assign({draw:w},t))},D=function(){return r.a.createElement(o.a,{initialParams:p,isPlaying:!0,maxTime:1/0,noCache:!0,noControls:!0,initData:v,updateData:O},r.a.createElement(M,null))};e.b=function(){return r.a.createElement(o.a,{initialParams:p,maxTime:1/0,nocache:!0,initData:v,updateData:O,controls:[[{param:"alignmentCoefficient",label:"Alignment",minValue:0,maxValue:3,step:.01},{param:"alignmentDistance",label:"Radius",minValue:0,maxValue:50,step:1}],[{param:"cohesionCoefficient",label:"Cohesion",minValue:0,maxValue:3,step:.01},{param:"cohesionDistance",label:"Radius",minValue:0,maxValue:50,step:1}],[{param:"separationCoefficient",label:"Separation",minValue:0,maxValue:3,step:.01},{param:"separationDistance",label:"Radius",minValue:0,maxValue:50,step:1}],{param:"showCircles",label:"Show circles:",type:"toggle"}]},r.a.createElement(M,null))}}}]);
//# sourceMappingURL=component---src-pages-examples-boids-mdx-1d11cd898a50cebf6461.js.map