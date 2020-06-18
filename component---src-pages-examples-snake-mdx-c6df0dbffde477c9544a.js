(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{hMyd:function(e,t,n){"use strict";n.r(t),n.d(t,"_frontmatter",(function(){return o})),n.d(t,"default",(function(){return r}));n("rzGZ"),n("Dq+y"),n("8npG"),n("Ggvi"),n("E5k/"),n("q1tI");var i=n("7ljp"),a=n("TVkH");var o={Title:"Snake"},s={_frontmatter:o};function r(e){var t=e.components,n=function(e,t){if(null==e)return{};var n,i,a={},o=Object.keys(e);for(i=0;i<o.length;i++)n=o[i],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,["components"]);return Object(i.b)("wrapper",Object.assign({},s,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"snake"},"Snake"),Object(i.b)(a.p,{mdxType:"Snake"}),Object(i.b)("p",null,"This model tries to win the game of ",Object(i.b)("a",Object.assign({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Snake_(video_game_genre)"}),"Snake"),"."),Object(i.b)("p",null,"A snake moves on a 2d grid. It can go straight, turn left or right. If it hits the borders of the grid or a part of its body, the game is over. If the snake eats a fruit, it grows in size. The goal of the game is to eat all the fruits, until the snake covers the entirety of the grid."),Object(i.b)("p",null,"If the snake can stay on a ",Object(i.b)("strong",{parentName:"p"},"circuit")," that covers the entirety of the grid, it can just loop that circuit endlessly, eat all the fruits and never collide with itself or the walls."),Object(i.b)("p",null,"But it could be very slow to do that."),Object(i.b)("p",null,"So instead, the snake tries to find better circuits."),Object(i.b)("p",null,"Whenever it eats a fruit, and a new fruit appears, the snake finds ",Object(i.b)("strong",{parentName:"p"},"the quickest route")," from its head to the new fruit.\nThen, it tries to find a route that goes from the fruit to its tail, and covers all the free tiles (in other words, the ",Object(i.b)("strong",{parentName:"p"},"longest route")," from its fruit to the tail.)"),Object(i.b)("p",null,"If the snake can find such a route, then there is another safe circuit it can take - only this one will take it to the fruit sooner."),Object(i.b)("p",null,"So, it updates its route."),Object(i.b)("p",null,"Finding a quickest path between two points on a grid is easy, but how to find the longest path?"),Object(i.b)("p",null,"We start by finding the ",Object(i.b)("em",{parentName:"p"},"shortest path")," between these two points. Then, we take this path segment by segment and see each time if we can extend it. When we run out of segments where we can extend the path, we have a long path between the two points.\nThis other model shows how this works:"),Object(i.b)(a.q,{mdxType:"SnakeGrid"}),Object(i.b)("p",null,"This method is not guaranteed to find ",Object(i.b)("em",{parentName:"p"},"the")," longest path between 2 points - sometimes such a route will leave a couple of cells uncovered. This is why the snake waits to find a circuit that covers every cell in the grid before it updates its circuit."))}r.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-examples-snake-mdx-c6df0dbffde477c9544a.js.map