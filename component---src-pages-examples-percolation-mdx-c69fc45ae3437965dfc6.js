(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{xSBE:function(e,t,r){"use strict";r.r(t),r.d(t,"_frontmatter",(function(){return y})),r.d(t,"default",(function(){return b}));r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("E5k/");var n=r("q1tI"),i=r.n(n),a=r("7ljp"),o=(r("pJf4"),r("q8oJ"),r("YbXK"),r("cFtU"),r("m210"),r("4DPX"),r("n0hJ"),r("YBKJ"),r("VdAu"),r("1uUR"));function l(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(e);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return u(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var c={pending:"PENDING",success:"SUCCESS",failure:"FAILURE"};function s(e){var t=e.data,r=e.params,n=e.complete,i=t.queue,a=t.grid,o=r.height,l=(r.width,t.status);0===i.length&&(l=c.failure);for(var u=[];i.length>0&&l===c.pending;){var s=i.shift(),h=s.x,f=s.y;f===o-1?l=c.success:0===a[f+1][h]&&(a[f+1][h]=6,u.push({x:h,y:f+1})),0===a[f][h-1]&&(a[f][h-1]=7,u.push({x:h-1,y:f})),0===a[f][h+1]&&(a[f][h+1]=8,u.push({x:h+1,y:f}))}return l!==c.PENDING&&r.shouldComplete&&n(l),{grid:a,queue:u,status:l}}function h(e){var t=e.data,r=e.params,n=e.complete,i=0;return t.forEach((function(e,n){return e.forEach((function(e,a){if(e.status===c.pending){var o=s({data:e,params:{height:r.height,shouldComplete:!1}});t[n][a]=o,o.status===c.pending&&i++}}))})),0===i&&n(),t}function f(e){var t,r,n=e.porosity,i=e.height,a=e.width,o=[],l=[];for(r=0;r<i;r++){var u=[];for(t=0;t<a;t++)u.push(Math.random()<Number(n)?1:0);o.push(u)}for(r=0;r<i;r++)for(t=0;t<a;t++)o[r][t]?(o[r+1]&&o[r+1][t]&&(o[r][t]=o[r][t]+2),o[r][t+1]&&(o[r][t]=o[r][t]+1),4===o[r][t]&&o[r+1][t+1]&&(o[r][t]=5)):0===r&&(o[r][t]=6,l.push({x:t,y:r}));return{grid:o,queue:l,status:c.pending}}var d=function(e){var t=e.data,r=e.params,a=r.cellSize,o=r.margin,l=r.height,u=r.width,s=Object(n.useRef)(null);return Object(n.useEffect)((function(){var e=s.current.getContext("2d");e.fillStyle="beige",e.fillRect(0,0,u*a,l*a),null!==t&&t.grid.forEach((function(t,r){t.forEach((function(t,n){var i=n*a,l=r*a;t>=1&&t<=5&&(e.fillStyle="#777",function(e){var t=e.ctx,r=e.x,n=e.y,i=e.width,a=e.height,o=e.r,l=void 0===o?1:o,u=e.tl,c=e.tr,s=e.br,h=u||l,f=c||l,d=e.bl||l,p=s||l;t.beginPath(),t.moveTo(r+h,n),t.lineTo(r+i-f,n),t.quadraticCurveTo(r+i,n,r+i,n+f),t.lineTo(r+i,n+a-p),t.quadraticCurveTo(r+i,n+a,r+i-p,n+a),t.lineTo(r+d,n+a),t.quadraticCurveTo(r,n+a,r,n+a-d),t.lineTo(r,n+h),t.quadraticCurveTo(r,n,r+h,n),t.closePath()}({ctx:e,x:i+o,y:l+o,r:o,height:a-2*o,width:a-2*o}),e.fill(),2!==t&&4!==t&&5!==t||e.fillRect(i+a-2*o,l+o,4*o,a-2*o),3!==t&&4!==t&&5!==t||e.fillRect(i+o,l+a-2*o,a-2*o,4*o),5===t&&e.fillRect(i+a-2*o,l+a-2*o,4*o,4*o)),t>=6&&(e.lineWidth=a-2*o,e.strokeStyle="cyan",e.lineCap="round",e.beginPath(),e.moveTo(i+a/2,l+a/2),6===t&&e.lineTo(i+a/2,Math.max(l-a/2,0)),8===t&&e.lineTo(i-a/2,l+a/2),7===t&&e.lineTo(i+3*a/2,l+a/2),e.stroke())}))}))})),i.a.createElement("div",{style:{boxSizing:"content-box",height:a*l,width:a*u,border:"3px solid "+(t.status===c.pending?"transparent":t.status===c.success?"green":"red")}},i.a.createElement("canvas",{width:u*a,height:l*a,ref:s}))},p=function(e){var t=e.data,r=e.params;return i.a.createElement("div",{style:{display:"flex",flexDirection:"column",height:(r.height*r.cellSize+10)*r.rows+20,width:(r.width*r.cellSize+10)*r.cols+20}},t.map((function(e,t){return i.a.createElement("div",{style:{display:"flex",flexDirection:"row"},key:"row-"+t},e.map((function(e,n){return i.a.createElement("div",{style:{height:r.height*r.cellSize,width:r.width*r.cellSize,margin:5}},i.a.createElement(d,{key:"cell-"+n+"-"+t,data:e,params:r}))})))})))};function m(e){var t=e.width,r=e.height,n=(e.cellSize,e.margin,e.rows),i=e.cols,a=e.minP,o=e.stepP;return l(Array(n).keys()).map((function(e){return l(Array(i).keys()).map((function(e){return f({height:r,width:t,porosity:a+e*o})}))}))}var g=function(){return i.a.createElement(i.a.Fragment,null,i.a.createElement(o.d,{auto:!1,updateData:h,maxTime:1/0,initData:m,initialParams:{width:20,height:20,cellSize:1.5,margin:0,rows:10,cols:10,minP:.35,stepP:.02}},i.a.createElement(p,null)))};var y={Title:"Percolation"},v={_frontmatter:y};function b(e){var t=e.components,r=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,["components"]);return Object(a.b)("wrapper",Object.assign({},v,r,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h1",null,"Percolation"),Object(a.b)(g,{mdxType:"PercolationGrid"}))}b.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-examples-percolation-mdx-c69fc45ae3437965dfc6.js.map