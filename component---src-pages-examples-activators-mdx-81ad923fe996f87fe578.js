(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{CczQ:function(t,e,r){var a=r("P8UN"),n=Math.abs;a(a.S,"Math",{hypot:function(t,e){for(var r,a,i=0,u=0,o=arguments.length,s=0;u<o;)s<(r=n(arguments[u++]))?(i=i*(a=s/r)*a+1,s=r):i+=r>0?(a=r/s)*a:r;return s===1/0?1/0:s*Math.sqrt(i)}})},sCKr:function(t,e,r){"use strict";r.d(e,"b",(function(){return o})),r.d(e,"a",(function(){return s}));var a=r("q1tI"),n=r.n(a),i=r("1uUR"),u=r("VdAu"),o=function(t){return n.a.createElement(u.c,{sx:{border:"1px solid currentcolor",p:2}},n.a.createElement(i.d,t))},s=function(t){return n.a.createElement(u.c,{sx:{border:"1px solid currentcolor",p:2,width:"fit-content"}},n.a.createElement(i.d,t))}},tqXG:function(t,e,r){"use strict";r.r(e),r.d(e,"_frontmatter",(function(){return d})),r.d(e,"default",(function(){return f}));r("rzGZ"),r("Dq+y"),r("8npG"),r("Ggvi"),r("E5k/");var a=r("q1tI"),n=r.n(a),i=r("7ljp"),u=(r("CczQ"),r("1uUR")),o=r("sCKr");function s(t,e){return e.reduce((function(e,r){var a=r[0],n=r[1];return e+t[n][a].value}),0)}function c(t){for(var e=t.data,r=(t.tick,t.params),a=t.complete,n=JSON.parse(JSON.stringify(e)),i=0,u=r.height,o=r.width,c=r.w,l=0;l<u;l++)for(var m=0;m<o;m++){var h=e[l][m],d=h.innerNeighbors,p=h.outerNeighbors,f=s(e,d)-c*s(e,p);f>0&&(n[l][m].value=1),f<0&&(n[l][m].value=0),n[l][m]!==e[l][m]&&i++}return i<.01*u*o&&a(),n}function l(t,e){var r=t.height,a=t.width,n=t.density,i=t.innerRadius,u=t.outerRadius;void 0===e&&(e=Math.random);for(var o=[],s=0;s<r;s++){for(var c=[],l=0;l<a;l++){for(var m=[],h=[],d=Math.max(l-u,0),p=Math.min(l+u,a-1),f=Math.max(s-u,0),v=Math.min(s+u,r-1),b=d;b<p;b++)for(var g=f;g<v;g++){var w=Math.hypot(l-b,s-g);w>i&&w<=u?h.push([b,g]):w>0&&w<=i&&m.push([b,g])}var x=e()<n;c.push({value:x,innerNeighbors:m,outerNeighbors:h})}o.push(c)}return o}var m=function(t){return n.a.createElement(u.c,Object.assign({size:10,accessor:function(t){return t.value?"#000":"none"}},t))},h=function(){return n.a.createElement(o.a,{auto:"false",controls:[[{param:"w",minValue:0,maxValue:1,label:"weight",step:.01},{param:"innerRadius",minValue:1,maxValue:10,label:"Inner Radius"},{param:"outerRadius",minValue:1,maxValue:10,label:"Outer Radius"}],[{param:"height",minValue:5,maxValue:100,label:"Height"},{param:"width",minValue:5,maxValue:100,label:"Width"},{param:"density",minValue:0,maxValue:1,step:.1}]],initData:l,initialParams:{height:30,width:30,density:.5,innerRadius:3,outerRadius:6,w:.35},updateData:c,maxTime:200},n.a.createElement(m,null))};var d={Title:"Activators / Inhibitors"},p={_frontmatter:d};function f(t){var e=t.components,r=function(t,e){if(null==t)return{};var r,a,n={},i=Object.keys(t);for(a=0;a<i.length;a++)r=i[a],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,["components"]);return Object(i.b)("wrapper",Object.assign({},p,r,{components:e,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"activators--inhibitors"},"Activators / Inhibitors"),Object(i.b)(h,{mdxType:"Activators"}))}f.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-examples-activators-mdx-81ad923fe996f87fe578.js.map