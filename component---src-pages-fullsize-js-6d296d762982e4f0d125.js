(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{"+CGw":function(e,t,r){"use strict";r.d(t,"d",(function(){return m})),r.d(t,"c",(function(){return h})),r.d(t,"a",(function(){return p}));r("xtjI"),r("4DPX"),r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("E5k/"),r("n0hJ"),r("YBKJ");var n=r("q1tI"),a=r.n(n),i=r("2A+t"),o=r("VdAu"),c=r("sCKr");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var f=function(e){return Math.ceil(6*e())};function m(e,t){var r,n=e.data,a=e.tick,i=e.params.nbDice;void 0===t&&(t=Math.random);for(var o=n.totals,c=0,l=[],s=0;s<i;s++)l.push(f(t)),c+=l[s];var m=u(u({},o),{},((r={})[c]=(o[c]||0)+1,r));return{rolls:l,average:(n.average*(a-1)+n.total)/a,total:c,totals:m}}function h(e){return{rolls:[],average:3.5*e.nbDice,total:0,totals:{}}}var p=function(e){var t=e.value,r={background:"#000",width:3,height:3,borderRadius:"100%",position:"absolute"},n={top:3},i={bottom:3},o={right:3},c={left:3},l={top:8};return a.a.createElement("div",{style:{width:21,height:21,marginRight:10,position:"relative",border:"1px solid #000",borderRadius:"3px"}},1!==t&&a.a.createElement("div",{style:u(u(u({},r),n),c)}),t>3&&a.a.createElement("div",{style:u(u(u({},r),n),o)}),6===t&&a.a.createElement("div",{style:u(u(u({},r),l),c)}),t%2==1&&a.a.createElement("div",{style:u(u(u({},r),l),{left:8})}),6===t&&a.a.createElement("div",{style:u(u(u({},r),l),o)}),t>3&&a.a.createElement("div",{style:u(u(u({},r),i),c)}),1!==t&&a.a.createElement("div",{style:u(u(u({},r),i),o)}))},d=function(e){var t,r=e.label,n=e.max,i=e.nbRolls,c=e.nbValues,l=e.theme,u=n?50*i/n:0,s=350/c,f=(null==l||null===(t=l.colors)||void 0===t?void 0:t.primary)||"#33f";return a.a.createElement(o.c,{flexDirection:"column"},a.a.createElement(o.c,{flexDirection:"row",sx:{justifyContent:"center",alignItems:"flex-end",width:s,height:"50px"}},a.a.createElement("div",{style:{width:.8*s,height:u,backgroundColor:f}})),a.a.createElement(o.c,{flexDirection:"row",sx:{justifyContent:"center",fontSize:Math.min(350/(1.5*c),12)+"px"}},r))},y=function(e){var t,r;function n(){return e.apply(this,arguments)||this}return r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,n.prototype.render=function(){if(null===this.props.data)return null;var e=this.props,t=e.data,r=e.params.nbDice,n=e.theme,i=Number(r),c=6*i-i+1,l=t.rolls,u=t.totals,s=0,f=Array(c).fill(0).map((function(e,t){var r=i+t,n=u[r]||0;return s=Math.max(s,n),{label:r,nbRolls:n}}));return a.a.createElement(o.c,{flexDirection:"column",sx:{justifyContent:"space-between",height:"140px"}},a.a.createElement(o.c,{flexDirection:"row"},l.map((function(e,t){return a.a.createElement(p,{value:e,key:"k-"+t})}))),a.a.createElement(o.c,{flexDirection:"row",sx:{alignItems:"flex-end",height:"80px"}},f.map((function(e){return a.a.createElement(d,Object.assign({},e,{key:e.label,max:s,nbValues:c,theme:n}))}))))},n}(a.a.Component);t.b=function(e){var t=Object(i.e)().theme;return a.a.createElement(a.a.Fragment,null,a.a.createElement(c.a,Object.assign({theme:t,auto:!1,controls:{param:"nbDice",minValue:1,maxValue:6,resetOnChange:!0,label:"Number of dice per roll"},updateData:m,maxTime:1e3,initData:h,initialParams:{nbDice:5}},e),a.a.createElement(y,{theme:t})))}},"1V8c":function(e,t,r){"use strict";r.d(t,"a",(function(){return g})),r.d(t,"b",(function(){return E}));r("pJf4"),r("q8oJ"),r("YbXK"),r("cFtU"),r("m210"),r("4DPX"),r("rzGZ"),r("Dq+y"),r("8npG"),r("E5k/"),r("n0hJ"),r("YBKJ");var n=r("q1tI"),a=r.n(n),i=r("VdAu"),o=r("1uUR"),c=r("sCKr");function l(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var s="PENDING",f="SUCCESS",m="FAILURE";function h(e){var t=e.data,r=e.params,n=e.complete,a=t.queue,i=t.grid,o=r.height,c=t.status;0===a.length&&(c=m);for(var l=[];a.length>0&&c===s;){var u=a.shift(),h=u.x,p=u.y;p===o-1?c=f:0===i[p+1][h]&&(i[p+1][h]=6,l.push({x:h,y:p+1})),0===i[p][h-1]&&(i[p][h-1]=7,l.push({x:h-1,y:p})),0===i[p][h+1]&&(i[p][h+1]=8,l.push({x:h+1,y:p}))}return c!==s&&r.shouldComplete&&n(c),{grid:i,queue:l,status:c}}function p(e){var t=e.data,r=e.params,n=e.complete,a=0;return t.grids.forEach((function(e,n){return e.forEach((function(e,i){if(e.status===s){var o=h({data:e,params:{height:r.height,shouldComplete:!1}});t.grids[n][i]=o,o.status===s&&a++,o.status===f&&t.cols[i].result++}}))})),0===a&&n(),t}function d(e,t){var r=e.porosity,n=e.height,a=e.width;void 0===t&&(t=Math.random);var i,o,c=[],l=[];for(o=0;o<n;o++){var u=[];for(i=0;i<a;i++)u.push(t()>Number(r)?1:0);c.push(u)}for(o=0;o<n;o++)for(i=0;i<a;i++)c[o][i]?(c[o+1]&&c[o+1][i]&&(c[o][i]=c[o][i]+2),c[o][i+1]&&(c[o][i]=c[o][i]+1),4===c[o][i]&&c[o+1][i+1]&&(c[o][i]=5)):0===o&&(c[o][i]=6,l.push({x:i,y:o}));return{grid:c,queue:l,status:s}}function y(e){var t=e.ctx,r=e.params,n=r.cellSize,a=r.margin,i=r.height,o=r.width,c=e.data,l=e.roundRectangle;t.fillStyle="beige",t.fillRect(0,0,o*n,i*n),c.grid.forEach((function(e,r){e.forEach((function(e,i){var o=i*n,c=r*n;e>=1&&e<=5&&(t.fillStyle="#777",l({ctx:t,x:o+a,y:c+a,r:a,height:n-2*a,width:n-2*a}),t.fill(),2!==e&&4!==e&&5!==e||t.fillRect(o+n-2*a,c+a,4*a,n-2*a),3!==e&&4!==e&&5!==e||t.fillRect(o+a,c+n-2*a,n-2*a,4*a),5===e&&t.fillRect(o+n-2*a,c+n-2*a,4*a,4*a)),e>=6&&(t.lineWidth=n-2*a,t.strokeStyle="cyan",t.lineCap="round",t.beginPath(),t.moveTo(o+n/2,c+n/2),6===e&&t.lineTo(o+n/2,Math.max(c-n/2,0)),8===e&&t.lineTo(o-n/2,c+n/2),7===e&&t.lineTo(o+3*n/2,c+n/2),t.stroke())}))}))}var v=function(e){var t=e.data,r=e.params,n=r.cellSize,i=r.height,c=r.width;return a.a.createElement("div",{style:{boxSizing:"content-box",height:n*i,width:n*c,border:"3px solid "+(t.status===s?"transparent":t.status===f?"#33e":"#777")}},a.a.createElement(o.a,{data:t,width:c*n,height:i*n,draw:y}))},b=function(e){var t=e.data,r=e.params,n=r.height*r.cellSize,o=r.width*r.cellSize;return a.a.createElement("div",{style:{display:"flex",margin:"0 auto",flexDirection:"column",height:(n+10)*r.rows+60,width:(o+10)*r.cols+10}},a.a.createElement(i.c,{flexDirection:"row",sx:{justifyContent:"space-around",width:"100%"}},t.cols.map((function(e){return a.a.createElement(i.a,{sx:{width:[o],fontSize:1,textAlign:"center",fontWeight:2}},e.p.toFixed(2))}))),a.a.createElement(i.c,{sx:{flexDirection:"column",justifyContent:"space-around",height:(n+10)*r.rows}},t.grids.map((function(e,t){return a.a.createElement(i.c,{sx:{flexDirection:"row",justifyContent:"space-around"},key:"row-"+t},e.map((function(e,n){return a.a.createElement(i.c,{sx:{height:r.height*r.cellSize,width:r.width*r.cellSize}},a.a.createElement(v,{key:"cell-"+n+"-"+t,data:e,params:r}))})))}))),a.a.createElement(i.c,{flexDirection:"row",sx:{justifyContent:"space-around"}},t.cols.map((function(e){return a.a.createElement(i.a,{sx:{width:[o],fontSize:1,textAlign:"center"}},e.result+"/"+e.total)}))))},g=function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement(c.a,Object.assign({auto:!1,controls:{param:"porosity",label:"Porosity",minValue:0,maxValue:1,step:.01},updateData:h,maxTime:1/0,initData:d,initialParams:{width:66,height:66,cellSize:5,margin:0,porosity:.6,shouldComplete:!0}},e),a.a.createElement(v,null)))};function x(e,t){var r=e.width,n=e.height,a=(e.cellSize,e.margin,e.rows),i=e.cols,o=e.minP,c=e.stepP;void 0===t&&(t=Math.random);var u=l(Array(i).keys());return{cols:u.map((function(e){return{p:o+e*c,result:0,total:a}})),grids:l(Array(a).keys()).map((function(e){return u.map((function(e){return d({height:n,width:r,porosity:o+e*c},t)}))}))}}var E=function(e){return a.a.createElement(a.a.Fragment,null,a.a.createElement(c.a,Object.assign({auto:!1,updateData:p,maxTime:1/0,initData:x,initialParams:{width:20,height:20,cellSize:1.5,margin:0,rows:10,cols:8,minP:.54,stepP:.02}},e),a.a.createElement(b,null)))};t.c=g},CczQ:function(e,t,r){var n=r("P8UN"),a=Math.abs;n(n.S,"Math",{hypot:function(e,t){for(var r,n,i=0,o=0,c=arguments.length,l=0;o<c;)l<(r=a(arguments[o++]))?(i=i*(n=l/r)*n+1,l=r):i+=r>0?(n=r/l)*n:r;return l===1/0?1/0:l*Math.sqrt(i)}})},DsOZ:function(e,t,r){"use strict";r.d(t,"a",(function(){return j}));r("xtjI"),r("Dq+y"),r("Ggvi"),r("pJf4"),r("q8oJ"),r("8npG"),r("YbXK"),r("cFtU"),r("rzGZ"),r("m210"),r("4DPX"),r("E5k/"),r("n0hJ"),r("CczQ");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("sCKr");function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){u(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e){return function(e){if(Array.isArray(e))return f(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return f(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return f(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var m={alignmentCoefficient:1,alignmentDistance:50,cohesionCoefficient:1,cohesionDistance:40,height:332,maxforce:.03,maxspeed:2,nbBoids:50,r:5,separationCoefficient:1.5,separationDistance:25,showCircles:!0,width:332},h=function(e){var t=Math.hypot.apply(Math,s(e));return 0===t?e:d(e,t)},p=function(e,t){return e.map((function(e){return e*t}))},d=function(e,t){return e.map((function(e){return e/t}))},y=function(e,t){return e.map((function(e,r){return e+t[r]}))},v=function(e,t){return e.map((function(e,r){return e-t[r]}))},b=function(e,t){var r=Math.hypot.apply(Math,s(e)),n=Math.min(r,t);return d(e,r/n)},g=function(e,t){var r=e.height,n=e.nbBoids,a=e.width;return void 0===t&&(t=Math.random),Array(n).fill(0).map((function(e){var n=2*t()*Math.PI,i=[Math.cos(n),Math.sin(n)];return{angle:n,acceleration:[0,0],position:[t()*a,t()*r],velocity:i}}))},x=function(e){var t=e.data,r=e.params,n=r.alignmentDistance,a=r.cohesionDistance,i=r.separationCoefficient,o=r.alignmentCoefficient,c=r.cohesionCoefficient,u=r.separationDistance,f=r.maxspeed,m=r.maxforce,g=r.r,x=r.height,w=r.width,O=t.map((function(e){return[0,0]})),k=t.map((function(e){return[0,0]})),j=t.map((function(e){return[0,0]}));return t.forEach((function(e,r){for(var l=0,g=0,x=0,w=0;w<t.length;w++)if(w!==r){var D=t[w],P=v(e.position,D.position),S=Math.hypot.apply(Math,s(P));if(S>0&&S<u){var A=d(h(P),S);O[r]=y(O[r],A),l++}S>0&&S<n&&(k[r]=y(k[r],D.velocity),g++),S>0&&S<a&&(j[r]=y(j[r],D.position),x++)}l>0&&(O[r]=d(O[r],l),O[r]=h(O[r]),O[r]=p(O[r],f),O[r]=v(O[r],e.velocity),O[r]=b(O[r],m),O[r]=p(O[r],i)),g>0&&(k[r]=d(k[r],g),k[r]=h(k[r]),k[r]=p(k[r],f),k[r]=v(k[r],e.velocity),k[r]=b(k[r],m),k[r]=p(k[r],o)),x>0&&(j[r]=d(j[r],x),j[r]=E(e.position,j[r],e.velocity,f,m),j[r]=p(j[r],c))})),t.map((function(e,t){var r=y(y(k[t],j[t]),O[t]),n=b(y(e.velocity,r),f),a=y(e.position,n),i=Math.atan2(e.velocity[1],e.velocity[0]);return a[0]<-g&&(a[0]=w+g),a[0]>w+g&&(a[0]=-g),a[1]<-g&&(a[1]=x+g),a[1]>x+g&&(a[1]=-g),l(l({},e),{},{angle:i,position:a,velocity:n})}))},E=function(e,t,r,n,a){var i=p(h(v(t,e)),n),o=v(i,r);return b(o,a)},w=function(e){var t=e.ctx,r=e.circle,n=e.data,a=e.params,i=a.alignmentDistance,o=a.cohesionDistance,c=a.separationDistance,l=a.height,u=a.showCircles,s=a.width,f=a.r;t.fillStyle="#fff",t.fillRect(0,0,s,l),n.forEach((function(e){var n=e.position,a=n[0],l=n[1],s=e.angle;t.strokeStyle="#000",t.globalAlpha=1,t.beginPath(),t.moveTo(a+Math.cos(s)*f,l+Math.sin(s)*f),t.lineTo(a+Math.cos(s+2*Math.PI/3)*f*2/3,l+Math.sin(s+2*Math.PI/3)*f*2/3),t.lineTo(a+Math.cos(s+4*Math.PI/3)*f*2/3,l+Math.sin(s+4*Math.PI/3)*f*2/3),t.closePath(),t.stroke(),u&&(t.globalAlpha=.2,t.strokeStyle="#f00",r({x:a,y:l,r:c}),t.closePath(),t.stroke(),t.strokeStyle="#0f0",r({x:a,y:l,r:i}),t.closePath(),t.stroke(),t.strokeStyle="#00f",r({x:a,y:l,r:o}),t.closePath(),t.stroke())}))},O=function(e){return a.a.createElement(i.a,Object.assign({draw:w},e))},k=function(e){return a.a.createElement(o.a,Object.assign({initialParams:m,maxTime:1/0,nocache:!0,initData:g,updateData:x,controls:[[{param:"alignmentCoefficient",label:"Alignment",minValue:0,maxValue:3,step:.01},{param:"alignmentDistance",label:"Radius",minValue:0,maxValue:50,step:1}],[{param:"cohesionCoefficient",label:"Cohesion",minValue:0,maxValue:3,step:.01},{param:"cohesionDistance",label:"Radius",minValue:0,maxValue:50,step:1}],[{param:"separationCoefficient",label:"Separation",minValue:0,maxValue:3,step:.01},{param:"separationDistance",label:"Radius",minValue:0,maxValue:50,step:1}],{param:"showCircles",label:"Show circles:",type:"toggle"}]},e),a.a.createElement(O,null))},j=function(e){return a.a.createElement(k,Object.assign({isPlaying:!0,noControls:!0},e))};t.b=k},GxbI:function(e,t,r){"use strict";r("xtjI"),r("4DPX"),r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("YBKJ"),r("E5k/"),r("n0hJ");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("VdAu"),c=r("sCKr");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){s(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var f=function(e,t){void 0===t&&(t=Math.random);var r=e.cols,n=e.rows,a=e.proportion,i=e.tolerance,o=Array(n).fill(0).map((function(e){return Array(r).fill(0).map((function(e){return{community:100*t()>a?1:0}}))}));o.forEach((function(e,t){return e.forEach((function(e,r){e.isHappy=m(o,r,t,i)}))}));var c=function(e,t){return e.reduce((function(r,n,a){return n.reduce((function(r,n,i){return r+m(e,i,a,t)}),r)}),0)}(o,i);return{grid:o,happy:c,happiness:c/(r*n),totalMoves:0}};function m(e,t,r,n){var a=function(e,t,r){var n=e.length,a=e[0].length,i=0===r||r===n-1;return 0===t||t===a-1?i?3:5:i?5:8}(e,t,r);return(a-function(e,t,r){var n=e[r][t].community;return[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]].reduce((function(a,i){var o=t+i[0],c=r+i[1];(function(e,t,r){if(!e)return!1;var n=e.length;if(r<0||r>=n)return!1;var a=e[0].length;if(t<0||t>=a)return!1;return!0})(e,o,c)&&(e[c][o].community===n&&(a+=1));return a}),0)}(e,t,r))/a<n/100}var h=function(e,t){var r=e.data,n=e.params,a=e.complete;void 0===t&&(t=Math.random);var i=n.cols,o=n.rows,c=n.threshold,l=n.tolerance,s=[],f=0,h=r.totalMoves,p=JSON.parse(JSON.stringify(r.grid));for(p.forEach((function(e,t){return e.forEach((function(e,r){e.prevX=r,e.prevY=t,m(p,r,t,l)?(f+=1,e.isHappy=1):(e.isHappy=0,s.push([r,t]))}))})),f>i*o*c/100&&a();s.length>1;){var d=s.shift(),y=Math.floor(t()*s.length),v=s[y],b=u({},p[d[1]][d[0]]);p[d[1]][d[0]]=u({},p[v[1]][v[0]]),p[v[1]][v[0]]=b,h+=2,s=s.slice(0,y).concat(s.slice(y+1))}return{grid:p,totalMoves:h,happy:f,happiness:f/(i*o)}},p=function(e){var t=e.ctx,r=e.data,n=e.params,a=e.circle,i=n.height,o=n.width,c=n.rows,l=n.cols,u=n.showmoves,s=i/c,f=o/l,m=.8*Math.min(s,f);t.clearRect(0,0,o,i),t.strokeStyle="#000",t.lineWidth=2,t.globalAlpha=1,r.grid.forEach((function(e,r){return e.forEach((function(e,n){if(0===e.community)t.fillStyle="#33e",a({x:(n+.5)*s,y:(r+.5)*f,r:m/2}),e.isHappy?t.fill():t.stroke();else{t.fillStyle="#a0c";var i=(n+.5)*s-m/2,o=(r+.5)*f-m/2;e.isHappy?t.fillRect(i,o,m,m):t.strokeRect(i,o,m,m)}}))})),u&&(t.strokeStyle="#222",t.fillStyle="#222",t.globalAlpha=.5,t.lineWidth=1,r.grid.forEach((function(e,r){e.forEach((function(e,n){if(void 0!==e.prevX){var i=e.prevX,o=e.prevY;if(i!==n||o!==r){var c=s*(i+.5),l=s*(n+.5),u=f*(o+.5),h=f*(r+.5);t.moveTo(c,u),t.lineTo(l,h),t.stroke(),a({x:c,y:u,r:m/4}),t.fill(),a({x:l,y:h,r:m/4}),t.fill()}}}))})))},d=function(e){return a.a.createElement(i.a,Object.assign({draw:p},e))},y={label:"Happiness",accessor:function(e){return e.happy}},v=[{label:"Happiness",accessor:function(e){return Math.floor(1e3*Number(e.happiness.toFixed(3)))/10+"%"}},{label:"Total moves",accessor:function(e){return e.totalMoves}}],b={cols:20,rows:20,height:330,width:330,tolerance:60,proportion:50,showmoves:!0,threshold:99};t.a=function(e){return a.a.createElement(c.a,Object.assign({initialParams:u(u({},b),e.extraParams),initData:f,updateData:h,maxTime:50,delay:100,controls:[{param:"tolerance",label:"Tolerance"},{param:"proportion",label:"Proportion"},{param:"threshold",label:"Threshold"},{param:"showmoves",label:"Show moves",type:"toggle"}]},e),a.a.createElement(o.c,{flexDirection:"column"},a.a.createElement(d,null),a.a.createElement(i.f,{series:y}),a.a.createElement(i.b,{series:v})))}},ZiRl:function(e,t,r){var n=r("P8UN");n(n.P,"String",{repeat:r("gd4K")})},ampr:function(e,t,r){"use strict";r("pJf4"),r("q8oJ"),r("YbXK"),r("cFtU"),r("m210"),r("4DPX"),r("E5k/"),r("rzGZ"),r("Dq+y"),r("8npG"),r("n0hJ");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("sCKr"),c=r("VdAu");function l(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var s={rule:110,cols:33,rows:24,firstLine:"blank"},f=function(e,t){var r=e.cols,n=e.firstLine;void 0===t&&(t=Math.random);var a=Array(r).fill(0);return a[Math.floor(a.length/2)]=1,"blank"===n?a:"full"===n?a.map((function(e){return 1})):a.map((function(e){return t()>.5?1:0}))},m=function(e){var t=e.data,r=(e.cols,e.params.rule);return t.map((function(e,n){var a=t[n-1],i=t[n],o=t[n+1];return r&1<<(a?4:0)+(i?2:0)+(o?1:0)}))},h=Object(i.i)((function(e){e.data;var t=e.cachedData,r=e.tick,n=e.params,i=n.rows,o=n.cols,u=Math.min(r,n.rows);return a.a.createElement("div",{style:{overflow:"hidden",position:"relative",height:10*i,width:10*o,margin:"0 auto"}},a.a.createElement(c.c,{direction:"column",sx:{position:"absolute",top:0}},l(Array(u).keys()).map((function(e){var n=r-u+e;return a.a.createElement(c.c,{direction:"row",key:"row-"+n,sx:{position:"absolute",top:10*e}},t[n].map((function(e,t){return a.a.createElement(p,{size:8,color:e?"#000":"none",key:"cell-"+t})})))}))))})),p=function(e){var t=e.color,r=e.size,n=void 0===r?12:r;return a.a.createElement(c.a,{sx:{height:n+"px",width:n+"px",bg:t,m:"1px",border:"2px solid #000"}})},d=Object(i.h)((function(e){var t=e.bit,r=e.params,n=e.setParams,i=r.rule,o=1<<t,l=o&i,u=4&t,s=2&t,f=1&t;return a.a.createElement(c.c,{flexDirection:"column",onClick:function(){n({rule:l?i-o:i+o})},alignItems:"center",sx:{mr:2,cursor:"pointer"}},a.a.createElement(c.c,{flexDirection:"row"},a.a.createElement(p,{color:u?"#000":"none"}),a.a.createElement(p,{color:s?"#000":"none"}),a.a.createElement(p,{color:f?"#000":"none"})),a.a.createElement(p,{color:l?"#000":"none"}))}));t.a=function(e){return a.a.createElement(o.a,Object.assign({initialParams:s,initData:f,updateData:m,controls:{param:"firstLine",label:"First line:",type:"radio",options:["blank","full","random"],resetOnChange:!0,vertical:!0}},e),a.a.createElement(c.c,{flexDirection:"column"},a.a.createElement(h,null),e.noControls?null:a.a.createElement(c.c,{flexDirection:"row",sx:{justifyContent:"space-between",my:2}},[0,1,2,3].map((function(e){return a.a.createElement(d,{bit:e,key:"bit-"+e})}))),e.noControls?null:a.a.createElement(c.c,{flexDirection:"row",sx:{justifyContent:"space-between",my:2}},[4,5,6,7].map((function(e){return a.a.createElement(d,{bit:e,key:"bit-"+e})})))))}},"c+yJ":function(e,t,r){"use strict";r.r(t);r("E5k/"),r("sPse");var n=r("q1tI"),a=r.n(n),i=r("ampr"),o=r("ocix"),c=r("DsOZ"),l=r("fiCR"),u=r("+CGw"),s=r("qlMS"),f=r("u0c3"),m=r("kX+8"),h=r("qjFt"),p=r("1V8c"),d=r("GxbI"),y=r("gaBZ"),v={delay:500,fmOverrides:{sx:{border:"none",my:0,p:0,width:"332px"}},noControls:!0,isPlaying:!0,maxTime:50,onAnimate:function(e){var t=e.tick;return console.log(t)}};t.default=function(e){switch(e.location.search.slice(1)){case"activators":return a.a.createElement(o.a,Object.assign({},v,{maxTime:30}));case"automata":return a.a.createElement(i.a,Object.assign({},v,{maxTime:65,initialParams:{rule:110,cols:33,rows:33,firstLine:"random"}}));case"boids":return a.a.createElement(c.b,Object.assign({},v,{maxTime:200}));case"chaos-game":return a.a.createElement(l.c,Object.assign({},v,{maxTime:5e3}));case"dice":return a.a.createElement(u.b,v);case"epidemic":return a.a.createElement(s.a,Object.assign({},v,{hideSeries:!0,maxTime:100}));case"fibonacci":return a.a.createElement(f.c,Object.assign({},v,{maxTime:15}));case"game-of-life":return a.a.createElement(m.e,v);case"maze":return a.a.createElement(h.a,Object.assign({},v,{extraParams:{grid:"circle",ticksPerAnimation:5}}));case"percolation":return a.a.createElement(p.c,Object.assign({},v,{initialParams:{width:16,height:16,cellSize:20.75,margin:0,porosity:.65,shouldComplete:!1}}));case"segregation":return a.a.createElement(d.a,Object.assign({},v,{extraParams:{tolerance:50}}));case"simple-model":return a.a.createElement(y.a,Object.assign({},v,{maxTime:100}));default:return a.a.createElement("div",null,"Usage: have an example name in the search query.")}}},fiCR:function(e,t,r){"use strict";r.d(t,"a",(function(){return d})),r.d(t,"b",(function(){return v}));r("pJf4"),r("q8oJ"),r("YbXK"),r("cFtU"),r("m210"),r("4DPX"),r("ZiRl"),r("n0hJ"),r("E5k/"),r("HQhv"),r("rzGZ"),r("Dq+y"),r("8npG");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("VdAu"),c=r("sCKr");function l(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var s=function(e){var t=e.angleOffset,r=e.nbAttractors,n=e.height,a=e.width,i=a/2,o=n/2,c=.95*Math.min(n,a)/2;return l(Array(r).keys()).map((function(e){var n=t+.5*(r+4*e)/r;return{x:i+c*Math.cos(n*Math.PI),y:o-c*Math.sin(n*Math.PI)}}))};function f(e,t){var r=e.angle,n=e.nbAttractors,a=e.height,i=e.width;void 0===t&&(t=Math.random);var o=void 0===r?2*t()*Math.PI:r,c=s({angleOffset:o,nbAttractors:n,height:a,width:i}),l={x:t()*i,y:t()*a};return{attractors:c,background:"hsla("+Math.floor(360*t())+", 30%, 7%, 1)",color:"hsla("+Math.floor(360*t())+", 77%, 45%, 1)",points:[l],prevDirection:0}}function m(e,t){var r=e.data,n=e.params;e.tick;void 0===t&&(t=Math.random);var a=n.nbAttractors;r.attractors.length!==a&&(r.attractors=s(n));var i=n.rules?n.rules.split("").reduce((function(e,t,r){return"1"===t&&e.push(r),e}),[]):l(Array(a).keys()),o=(r.prevDirection+i[Math.floor(t()*i.length)])%a;r.prevDirection=o;var c=r.points[r.points.length-1],u=r.attractors[o],f={x:(c.x+u.x)/2,y:(c.y+u.y)/2};return r.points.push(f),r}var h=function(e){return a.a.createElement(i.a,Object.assign({draw:p},e))};function p(e){var t=e.ctx,r=e.data,n=e.params,a=e.tick,i=e.circle,o=n.height,c=n.width;t.globalAlpha=1,t.fillStyle=r.background,t.globalCompositeOperation="source-over",t.fillRect(0,0,c,o),t.globalCompositeOperation="lighter",t.fillStyle=r.color,t.globalAlpha=.8;for(var l=0;l<a;l++){var u=r.points[l];i({x:u.x,y:u.y,r:n.r}),t.fill()}}var d=function(e){return a.a.createElement(c.a,Object.assign({ticksPerAnimation:100,maxTime:1e4,initData:f,isPlaying:!0,loop:!0,updateData:m,initialParams:{height:332,width:332,nbAttractors:3,r:1}},e),a.a.createElement(h,null))},y=Object(i.h)((function(e){var t=e.params,r=e.setParams,n=t.nbAttractors,c=Math.ceil(n/5),u=function(e){return e<n?a.a.createElement(i.g,{key:"toggle-"+e,sx:{flex:"1 1 0"},checked:"1"===t.rules.charAt(e),label:e+1+(0===e?"st":1===e?"nd":"th")+" vertex",setValue:function(n){var a="1"===t.rules.charAt(e)?"0":"1",i=t.rules.slice(0,e)+a+t.rules.slice(e+1);r({rules:i})}}):null},s=l(Array(c).keys()).map((function(e){return a.a.createElement(o.c,{flexDirection:"row",key:"tr-"+e,sx:{justifyContent:"space-between"}},[5*e,5*e+1,5*e+2,5*e+3,5*e+4].map(u))}));return a.a.createElement(o.c,{flexDirection:"column"},a.a.createElement(i.e,{key:"range",minValue:3,maxValue:20,label:"Vertices",value:t.nbAttractors,setValue:function(e){return r({nbAttractors:e,rules:"1".repeat(e)},!0)}}),a.a.createElement(o.c,{flexDirection:"column"},s))})),v=function(e){return a.a.createElement(c.a,Object.assign({ticksPerAnimation:100,maxTime:2e4,initData:f,updateData:m,initialParams:{height:332,width:332,nbAttractors:7,angle:0,r:1,rules:"1001100"}},e),a.a.createElement(o.c,{flexDirection:"column"},a.a.createElement(h,null),a.a.createElement(y,null)))};t.c=v},gaBZ:function(e,t,r){"use strict";r("n0hJ");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("sCKr"),c=function(e){var t=e.tick,r=Array(10).fill(0).map((function(e,r){return Array(10).fill(0).map((function(e,n){return 10*r+n>t?0:1}))}));return a.a.createElement(i.c,{data:r,size:36})};t.a=function(e){return a.a.createElement(o.a,e,a.a.createElement(c,null))}},"kX+8":function(e,t,r){"use strict";r.d(t,"a",(function(){return m})),r.d(t,"b",(function(){return h})),r.d(t,"c",(function(){return p})),r.d(t,"d",(function(){return d}));r("E5k/"),r("n0hJ"),r("YBKJ"),r("HQhv");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("sCKr"),c="0000010000000000010000000000\n0000000100010010000000000000\n1110001000000000000000000001\n1010000000000000000000000000\n0000000000100000000010110000\n0100000101010100000000000001\n0000000000010100000001000001\n0000000011100100000000100001\n0000010000000000000000010000\n0000000000010100000000000100".split("\n").map((function(e){return e.split("").map(Number)}));function l(e,t,r){var n=r.length;if(!n)return 0;for(var a=r[0].length,i=0,o=-1;o<=1;o++)for(var c=-1;c<=1;c++){var l=e+o,u=t+c;l<a&&l>0&&u<n&&u>0&&(l!==e||u!==t)&&(i+=r[u][l])}return i}function u(e){var t=e.data,r=e.complete,n=0,a=t.map((function(e,r){return e.map((function(e,a){var i=l(a,r,t);return e&&(i<2||i>3)?(n++,0):e||3!==i?e:(n++,1)}))}));return 0===n&&r(),a}function s(e){var t=e.data;return t.map((function(e,r){return e.map((function(e,n){var a=l(n,r,t);return e&&(a<2||a>3)?0:e||3!==a?e:1}))}))}function f(e,t){var r=e.height,n=e.width,a=e.density;return void 0===t&&(t=Math.random),Array(r).fill(0).map((function(e){return Array(n).fill(0).map((function(){return Number(t()<a)}))}))}var m=function(){return a.a.createElement(o.a,{initData:f,initialParams:{height:10,width:28,density:.15}},a.a.createElement(i.c,null))},h=function(){return a.a.createElement(o.a,{initData:function(){return c},updateData:s,initialParams:{height:10,width:28,density:.15}},a.a.createElement(i.c,null))},p=function(){return a.a.createElement(o.a,{initData:function(){return c},updateData:u,initialParams:{height:10,width:28,density:.15}},a.a.createElement(i.c,null))},d=function(){return a.a.createElement(o.a,{controls:{param:"density",resetOnChange:!0,maxValue:1,step:.01,label:"Grid density"},showTimeSlider:!1,initData:f,updateData:u,initialParams:{height:10,width:28,density:.15}},a.a.createElement(i.c,null))};t.e=function(e){return a.a.createElement(o.a,Object.assign({auto:!1,controls:{param:"density",maxValue:1,step:.01,resetOnChange:!0,label:"Grid density"},showTimeSlider:!1,updateData:u,delay:100,initData:f,initialParams:{height:28,width:28,density:.15}},e),a.a.createElement(i.c,null))}},ocix:function(e,t,r){"use strict";r("E5k/"),r("CczQ");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("sCKr");function c(e,t){return t.reduce((function(t,r){var n=r[0],a=r[1];return t+e[a][n].value}),0)}function l(e){for(var t=e.data,r=(e.tick,e.params),n=e.complete,a=JSON.parse(JSON.stringify(t)),i=0,o=r.height,l=r.width,u=r.w,s=0;s<o;s++)for(var f=0;f<l;f++){var m=t[s][f],h=m.innerNeighbors,p=m.outerNeighbors,d=c(t,h)-u*c(t,p);d>0&&(a[s][f].value=1),d<0&&(a[s][f].value=0),a[s][f]!==t[s][f]&&i++}return i<.01*o*l&&n(),a}function u(e,t){var r=e.height,n=e.width,a=e.density,i=e.innerRadius,o=e.outerRadius;void 0===t&&(t=Math.random);for(var c=[],l=0;l<r;l++){for(var u=[],s=0;s<n;s++){for(var f=[],m=[],h=Math.max(s-o,0),p=Math.min(s+o,n-1),d=Math.max(l-o,0),y=Math.min(l+o,r-1),v=h;v<p;v++)for(var b=d;b<y;b++){var g=Math.hypot(s-v,l-b);g>i&&g<=o?m.push([v,b]):g>0&&g<=i&&f.push([v,b])}var x=t()<a;u.push({value:x,innerNeighbors:f,outerNeighbors:m})}c.push(u)}return c}var s=function(e){return a.a.createElement(i.c,Object.assign({size:10,accessor:function(e){return e.value?"#000":"none"}},e))};t.a=function(e){return a.a.createElement(o.a,Object.assign({auto:"false",controls:[[{param:"innerRadius",minValue:1,maxValue:10,label:"Inner Radius"},{param:"outerRadius",minValue:1,maxValue:10,label:"Outer Radius"}],[{param:"w",minValue:0,maxValue:1,label:"weight",step:.01},{param:"density",minValue:0,maxValue:1,step:.1}]],initData:u,initialParams:{height:35,width:35,density:.5,innerRadius:3,outerRadius:6,w:.35},updateData:l,maxTime:200},e),a.a.createElement(s,null))}},qlMS:function(e,t,r){"use strict";r("pJf4"),r("q8oJ"),r("cFtU"),r("m210"),r("4DPX"),r("E5k/"),r("n0hJ"),r("Ggvi"),r("YbXK"),r("ToIb"),r("rzGZ"),r("Dq+y"),r("8npG"),r("CczQ");var n=r("q1tI"),a=r.n(n),i=r("VdAu"),o=r("1uUR"),c=r("sCKr");function l(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var s={sick:"#4f8c9d",recovered:"#add51f",healthy:"#997cfb",dead:"#6a9012"};function f(e,t){var r=e.data,n=e.tick,a=e.params,i=e.complete;void 0===t&&(t=Math.random);var o=JSON.parse(JSON.stringify(r.agents)),c=0,l=0,u=0,s=0,f=a.contaminationRisk,m=a.deathRisk,h=a.r,p=a.recoveryTicks,d=a.height,y=a.width;return o.forEach((function(e,r){if("sick"===e.status&&(n>=e.recovery?e.status="recovered":t()<m&&(e.status="dead")),"dead"!==e.status){for(var a=r+1;a<o.length;a++){var i=o[a],v=i.x-e.x,b=i.y-e.y,g=Math.hypot(v,b);if(g<2*h){var x=v/g,E=b/g;e.vx=e.vx-x,e.vy=e.vy-E,i.vx=x,i.vy=E,"sick"===e.status&&"healthy"===i.status&&t()<=f&&(i.status="sick",i.recovery=n+p),"healthy"===e.status&&"sick"===i.status&&t()<=f&&(e.status="sick",e.recovery=n+p)}}e.x=e.x+e.vx,e.y=e.y+e.vy,(e.vy<0&&e.y<h||e.vy>0&&e.y>d-h)&&(e.vy=-e.vy),(e.vx<0&&e.x<h||e.vx>0&&e.x>y-h)&&(e.vx=-e.vx)}switch(e.status){case"sick":c++;break;case"healthy":l++;break;case"recovered":s++;break;case"dead":u++}})),0===c&&i(),{agents:o,sick:c,recovered:s,dead:u,healthy:l}}function m(e,t,r){for(var n=l(Array(e).keys()).reduce((function(e,t){return e[t]=!0,e}),{}),a=new Set,i=0;i<t;i++){var o=Math.floor(r()*Object.keys(n).length);a.add(o),delete n[o]}return a}function h(e,t,r,n){var a=n.x,i=n.y;return e.slice(t).filter((function(e){var t=e.x,n=e.y;return Math.hypot(t-a,n-i)<r}))}function p(e,t){var r=e.nbAgents,n=void 0===r?200:r,a=e.nbSick,i=void 0===a?5:a,o=e.maxSpeed,c=void 0===o?30:o,l=(e.contaminationRisk,e.deathRisk,e.recoveryTicks),u=void 0===l?20:l,s=e.nbDistancing,f=void 0===s?50:s,p=e.r,d=void 0===p?3:p,y=e.height,v=void 0===y?300:y,b=e.width,g=void 0===b?400:b;void 0===t&&(t=Math.random);for(var x=m(n,i,t),E=m(n,f,t),w=[],O=0;O<n;O++){var k=void 0,j=void 0;do{j=d/2+t()*(v-d),k=d/2+t()*(g-d)}while(h(w,0,d,{x:k,y:j}).length);var D=x.has(O)?"sick":"healthy",P=x.has(O)?u:null,S=E.has(O),A=S?0:c,M=A*(2*t()-1),C=A*(2*t()-1);w.push({x:k,y:j,status:D,isBouncing:!1,isDistancing:S,vx:M,vy:C,recovery:P,speed:A})}return{agents:w,sick:i,healthy:n-i,dead:0,recovered:0}}var d=function(e){var t,r;function n(t){var r;return(r=e.call(this,t)||this).myRef=a.a.createRef(),r}r=e,(t=n).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r;var i=n.prototype;return i.componentDidUpdate=function(){var e=this.props,t=e.data,r=e.params,n=r.width,a=r.height,i=r.r,o=this.myRef.current.getContext("2d");o.fillStyle="#fff",o.lineWidth="5px",o.clearRect(0,0,n,a),t.agents.forEach((function(e){var t=e.status,r=(e.isBouncing,e.x),n=e.y;o.beginPath(),o.fillStyle=s[t],o.arc(r,n,i,0,2*Math.PI,!1),o.closePath(),o.fill()}))},i.render=function(){return a.a.createElement("div",null,a.a.createElement("canvas",{width:this.props.params.width,height:this.props.params.height,ref:this.myRef}))},n}(a.a.Component),y=Object(o.i)(d),v=[{color:s.healthy,label:"Healthy",accessor:function(e){return e.healthy}},{color:s.sick,label:"Sick",accessor:function(e){return e.sick}},{color:s.recovered,label:"Recovered",accessor:function(e){return e.recovered}},{color:s.dead,label:"Dead",accessor:function(e){return e.dead}}];t.a=function(e){return a.a.createElement(c.a,Object.assign({initData:p,initialParams:{nbAgents:500,nbSick:20,contaminationRisk:1,deathRisk:.001,maxSpeed:2,recoveryTicks:200,nbDistancing:0,r:2,height:332,width:332},updateData:f,maxTime:500},e),a.a.createElement(i.c,{flexDirection:"column"},a.a.createElement(y,null),e.hideSeries?null:a.a.createElement(o.f,{series:v,stacked:!0}),e.hideSeries?null:a.a.createElement(o.b,{series:v})))}},sCKr:function(e,t,r){"use strict";r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("E5k/");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("VdAu");t.a=function(e){var t=e.fmOverrides,r=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,["fmOverrides"]);return a.a.createElement(o.c,Object.assign({sx:{border:"1px solid currentcolor",my:2,p:2,width:"350px"}},t),a.a.createElement(i.d,r))}},u0c3:function(e,t,r){"use strict";r.d(t,"b",(function(){return y})),r.d(t,"a",(function(){return b}));r("pJf4"),r("q8oJ"),r("8npG"),r("YbXK"),r("cFtU"),r("rzGZ"),r("m210"),r("4DPX"),r("E5k/");var n=r("q1tI"),a=r.n(n),i=r("1uUR"),o=r("VdAu"),c=r("sCKr");function l(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var s=.5+Math.sqrt(5)/2,f={0:"right",1:"down",2:"left",3:"up"};function m(){return[0]}function h(e){var t=e.data,r=e.tick;if(0===r)return[0];if(1===r)return[0,1];var n=t[r-1]+t[r-2];return[].concat(l(t),[n])}function p(e){var t=e.ctx,r=e.params.size,n=e.tick;t.fillStyle="#fff",t.fillRect(0,0,r,r);for(var a=0,i=0,o=r,c=0;c<n;c++){var l=f[c%4];o/=s,t.strokeStyle="#ddd",t.strokeRect(a,i,o,o),t.strokeStyle="#222";var u=Math.max(0,o-1);switch(l){case"right":t.beginPath(),t.arc(a+o,i+o,u,Math.PI,-Math.PI/2),t.stroke(),t.closePath(),a+=o;break;case"down":t.beginPath(),t.arc(a,i+o,u,-Math.PI/2,0),t.stroke(),t.closePath(),a+=(1-1/s)*o,i+=o;break;case"left":t.beginPath(),t.arc(a,i,u,0,Math.PI/2),t.stroke(),t.closePath(),a-=o/s,i+=(1-1/s)*o;break;case"up":t.beginPath(),t.arc(a+o,i,u,Math.PI/2,Math.PI),t.stroke(),t.closePath(),i-=o/s}}}var d=function(e){e.tick;var t=e.params.size,r=t,n=t/s;return a.a.createElement(i.a,{height:n,width:r,draw:p})},y=function(e){return a.a.createElement(c.a,Object.assign({initialParams:{size:332},delay:100,maxTime:15},e),a.a.createElement(d,null))},v=function(e){var t=e.data;return a.a.createElement(o.c,{sx:{flexDirection:"row",flexWrap:"wrap"}},t.map((function(e,t){return a.a.createElement(o.a,{sx:{m:1,p:2,bg:"muted",fontSize:1},key:t},e)})))},b=function(e){return a.a.createElement(c.a,Object.assign({initData:m,updateData:h,maxTime:20},e),a.a.createElement(v,null))};t.c=y}}]);
//# sourceMappingURL=component---src-pages-fullsize-js-6d296d762982e4f0d125.js.map