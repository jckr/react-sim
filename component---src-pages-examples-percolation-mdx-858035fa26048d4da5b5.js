(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{xSBE:function(e,t,o){"use strict";o.r(t),o.d(t,"_frontmatter",(function(){return r})),o.d(t,"default",(function(){return l}));o("rzGZ"),o("Dq+y"),o("8npG"),o("Ggvi"),o("E5k/"),o("q1tI");var i=o("7ljp"),n=o("TVkH");var r={Title:"Percolation"},a={_frontmatter:r};function l(e){var t=e.components,o=function(e,t){if(null==e)return{};var o,i,n={},r=Object.keys(e);for(i=0;i<r.length;i++)o=r[i],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,["components"]);return Object(i.b)("wrapper",Object.assign({},a,o,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"percolation"},"Percolation"),Object(i.b)("p",null,"A 2D lattice is made of cells which either let liquid go through (porous) or not.\nIf we pour liquid on the top of the lattice, will any of it go through? This depends on the porosity of the lattice, i.e. the percentage of cells which are porous."),Object(i.b)(n.l,{mdxType:"Percolation"}),Object(i.b)("p",null,"Interestingly, the chances of liquid getting through don't vary linearly with the porosity. If porosity is beyond a certain ",Object(i.b)("a",Object.assign({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Percolation_threshold"}),"threshold"),", there are very little chances that the liquid gets through, and beyond that threshold it becomes very likely.\nFor our 2D lattice with liquid being able to go in all 4 directions, the threshold is around ",Object(i.b)("em",{parentName:"p"},"0.59"),"."),Object(i.b)("p",null,"To see how dramatically the chances of liquid percolating increase once we're past the threshold, let's simulate 100 pours at a time:\nOn that grid, every column has the same porosity index."),Object(i.b)(n.m,{mdxType:"PercolationGrid"}))}l.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-examples-percolation-mdx-858035fa26048d4da5b5.js.map