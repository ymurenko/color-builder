(this["webpackJsonpcolor-builder"]=this["webpackJsonpcolor-builder"]||[]).push([[0],[,,,,,,,,,,,function(e,t,a){},,function(e,t,a){e.exports=a(37)},,,,,,,,,,,function(e,t,a){},function(e,t,a){e.exports=a.p+"static/media/logotype.210a0c67.png"},function(e,t,a){e.exports=a.p+"static/media/logotype-dark.bbcc524e.png"},function(e,t,a){},function(e){e.exports=JSON.parse("{}")},function(e){e.exports=JSON.parse("{}")},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(4),o=a.n(r),s=a(1),i=a(2),l=a(5),u=a(3),d={COLORS:["#FFF","#FFF","#FFF"],LIGHTNESS:50,SATURATION:100,SELECTOR_COUNT:4,SELECTOR_ANGLE:180,SELECTOR_RADIUS:118,SELECTOR_STAGGER:0,LINKED:!1,DARK_MODE:!1,HASH:!0,QUOTES:!0,RESET:0},E=Object(u.b)({actionReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_COLOR":var a=Object(l.a)(e.COLORS);return a[t.INDEX]=t.COLOR,Object(i.a)({},e,{COLORS:a});case"SET_LIGHTNESS":return Object(i.a)({},e,{LIGHTNESS:t.LIGHTNESS});case"SET_SATURATION":return Object(i.a)({},e,{SATURATION:t.SATURATION});case"SET_SELECTOR_COUNT":var n=[];return n.length=t.SELECTOR_COUNT,n.fill("#FFF"),Object(i.a)({},e,{COLORS:n,SELECTOR_COUNT:t.SELECTOR_COUNT});case"SET_SELECTOR_ANGLE":return Object(i.a)({},e,{SELECTOR_ANGLE:t.SELECTOR_ANGLE});case"SET_SELECTOR_RADIUS":return Object(i.a)({},e,{SELECTOR_RADIUS:t.SELECTOR_RADIUS});case"SET_SELECTOR_STAGGER":return Object(i.a)({},e,{SELECTOR_STAGGER:t.SELECTOR_STAGGER});case"SET_LINKED":return Object(i.a)({},e,{LINKED:!e.LINKED});case"SET_DARK_MODE":case"SET_DARK_MODE":return Object(i.a)({},e,{DARK_MODE:!e.DARK_MODE});case"SET_HASH":return Object(i.a)({},e,{HASH:!e.HASH});case"SET_QUOTES":return Object(i.a)({},e,{QUOTES:!e.QUOTES});case"RESET":var c=e.DARK_MODE;return Object(i.a)({},d,{DARK_MODE:c,RESET:1-e.RESET});default:return e}}}),S=Object(u.c)(E),R=(a(24),a(25),a(26),a(27),function(){return{type:"SET_LINKED"}}),O=function(){return{type:"RESET"}};var m={storeColor:function(e,t){return{type:"SET_COLOR",COLOR:e,INDEX:t}}},T=Object(s.b)((function(e){return{selectorCount:e.actionReducer.SELECTOR_COUNT,selectorAngle:e.actionReducer.SELECTOR_ANGLE,selectorRadius:e.actionReducer.SELECTOR_RADIUS,selectorStagger:e.actionReducer.SELECTOR_STAGGER,lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,linked:e.actionReducer.LINKED,reset:e.actionReducer.RESET}}),m)((function(e){var t=Object(n.useRef)(null),a=(e.colorsContainer,e.canvas),r=0,o=0,s=null,i=[],l=null,u=0,d=function(t,n,c){var r=a.current.getContext("2d").getImageData(t,n,1,1).data,o="#"+((1<<24)+(r[0]<<16)+(r[1]<<8)+r[2]).toString(16).toUpperCase().slice(1);s[c].style.fill=o,e.lightness<50?s[c].style.stroke="#d4d4d4":s[c].style.stroke="#4d4d4d",e.storeColor(o,c)},E=function(){var t=[],a=s[0].getAttribute("cx"),n=s[0].getAttribute("cy"),c=Math.sqrt((250-a)*(250-a)+(250-n)*(250-n)),r=a-250,o=n-250,i=Math.atan2(o,r)-Math.atan2(0,250);t.push({angle:i,radius:c}),u=i;for(var l=1;l<e.selectorCount;l++){var d=s[l-1].getAttribute("cx"),E=s[l-1].getAttribute("cy"),S=s[l].getAttribute("cx"),R=s[l].getAttribute("cy"),O=Math.sqrt((250-S)*(250-S)+(250-R)*(250-R)),m=d-250,T=E-250,g=S-250,f=R-250,b=Math.atan2(f,g)-Math.atan2(T,m);t.push({angle:b,radius:O})}return t},S=function(e,t){return!(Math.sqrt((250-e)*(250-e)+(250-t)*(250-t))>237.5)||(m(),!1)},R=function(t){var a=t.pageX-r,n=t.pageY-o,c=s[0].getAttribute("cx"),l=s[0].getAttribute("cy"),u=c-250,E=l-250,R=Math.atan2(E,u),O=0;if(S(a,n)){s[0].setAttribute("cx","".concat(a)),s[0].setAttribute("cy","".concat(n)),d(c,l,0);for(var m=1;m<e.selectorCount;m++){O+=i[m].angle;var T=s[m].getAttribute("cx"),g=s[m].getAttribute("cy"),f=O+R,b=i[m].radius-(i[0].radius-Math.sqrt((250-a)*(250-a)+(250-n)*(250-n)));b<0&&(b=0),b>250&&(b=250),s[m].setAttribute("cx","".concat(250+b*Math.cos(f))),s[m].setAttribute("cy","".concat(250+b*Math.sin(f))),d(T,g,m)}}},O=function(e){var t=e.pageX-r,a=e.pageY-o;S(t,a)&&(l.setAttribute("cx","".concat(t)),l.setAttribute("cy","".concat(a)),d(t,a,l.id))},m=function(a){l=null,e.linked?t.current.removeEventListener("mousemove",R):t.current.removeEventListener("mousemove",O),i=E()},T=function(n){var c=a.current.getBoundingClientRect();r=c.left,o=c.top,l=n.target,e.linked?t.current.addEventListener("mousemove",R):t.current.addEventListener("mousemove",O),i=E()};return Object(n.useEffect)((function(){for(var t=u,a=0,n=Math.round(e.selectorAngle/e.selectorCount)*(Math.PI/180),c=0;c<e.selectorCount;c++){var r=250+(e.selectorRadius-a)*Math.cos(t),o=250+(e.selectorRadius-a)*Math.sin(t);s[c].setAttribute("cx","".concat(r)),s[c].setAttribute("cy","".concat(o)),t+=n,a+=e.selectorStagger/e.selectorCount}}),[e.selectorStagger,e.reset,e.selectorCount,e.selectorRadius,e.selectorAngle]),Object(n.useEffect)((function(){for(var t=0;t<e.selectorCount;t++){var a=s[t].getAttribute("cx"),n=s[t].getAttribute("cy");d(a,n,t)}})),Object(n.useLayoutEffect)((function(){s=t.current.children,i=E()})),c.a.createElement("svg",{className:"selector",ref:t,width:"".concat(500),height:"".concat(500),viewBox:"0 0 ".concat(500," ").concat(500)},function(){for(var t=[],a=u,n=Math.round(e.selectorAngle/e.selectorCount)*(Math.PI/180),r=0;r<e.selectorCount;r++){var o=250+e.selectorRadius*Math.cos(a),s=250+e.selectorRadius*Math.sin(a);t.push(c.a.createElement("circle",{cx:o,cy:s,r:"15",stroke:"#4d4d4d","stroke-width":"0.5",style:{filter:"drop-shadow(0 0 4px #4d4d4d)"},onMouseDown:function(e){return T(e)},onMouseUp:function(e){return m(e)},key:r,id:"".concat(r)})),a+=n}return t}())}));a(28),a(29),a(30);var g={resetState:O,setLinkedState:R},f=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,darkMode:e.actionReducer.DARK_MODE,linked:e.actionReducer.LINKED}}),g)((function(e){var t=Object(n.useRef)(null);return Object(n.useLayoutEffect)((function(){!function(){var a=t.current.getContext("2d");a.clearRect(0,0,500,500);for(var n=0;n<3600;n+=1){var c=n/10,r=(c-90)*Math.PI/180,o=250+250*Math.cos(-r),s=250+250*Math.sin(-r);a.beginPath();var i=a.createLinearGradient(250,250,o,s);i.addColorStop("0","".concat(e.lightness>45?"white":"black")),i.addColorStop("0.95","hsl(".concat(c,", ").concat(e.saturation,"%, ").concat(e.lightness,"%)")),i.addColorStop("0.95","".concat(e.darkMode?"#212121":"#b5b5b5")),i.addColorStop("1","".concat(e.darkMode?"#212121":"#b5b5b5")),a.strokeStyle=i,a.moveTo(250,250),a.lineTo(o,s),a.stroke()}}()})),c.a.createElement("div",{className:"container-block ".concat(e.darkMode?"dark":""),style:{height:"".concat(500),width:"".concat(500)}},c.a.createElement("button",{className:"button button-left ".concat(e.linked?"active":""," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setLinkedState()}},e.linked?"Unlink":"Link"),c.a.createElement("div",{className:"gradient"},c.a.createElement(T,{colorsContainer:e.colorsContainer,canvas:t}),c.a.createElement("canvas",{width:"".concat(500),height:"".concat(500),ref:t})),c.a.createElement("button",{className:"button button-right ".concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.resetState()}},"Reset"))}));a(11),a(31);var b={setLightness:function(e){return{type:"SET_LIGHTNESS",LIGHTNESS:e}},setSaturation:function(e){return{type:"SET_SATURATION",SATURATION:e}},setSelectorCount:function(e){return{type:"SET_SELECTOR_COUNT",SELECTOR_COUNT:e}},resetState:O,setLinkedState:R,setSelectorAngle:function(e){return{type:"SET_SELECTOR_ANGLE",SELECTOR_ANGLE:e}},setSelectorRadius:function(e){return{type:"SET_SELECTOR_RADIUS",SELECTOR_RADIUS:e}},setSelectorStagger:function(e){return{type:"SET_SELECTOR_STAGGER",SELECTOR_STAGGER:e}},setDarkMode:function(){return{type:"SET_DARK_MODE"}}},C=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,selectorCount:e.actionReducer.SELECTOR_COUNT,selectorAngle:e.actionReducer.SELECTOR_ANGLE,selectorRadius:e.actionReducer.SELECTOR_RADIUS,selectorStagger:e.actionReducer.SELECTOR_STAGGER,linked:e.actionReducer.LINKED,darkMode:e.actionReducer.DARK_MODE}}),b)((function(e){var t=Object(n.useRef)(null);return Object(n.useEffect)((function(){e.setSelectorStagger(t.current.value)}),[e.selectorRadius]),c.a.createElement("div",{className:"controls ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"control-container"},c.a.createElement("button",{className:"button set-dark ".concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setDarkMode()}},e.darkMode?"Light Mode":"Dark Mode")),c.a.createElement("div",{className:"control-container"},c.a.createElement("p",{className:"slider-label"},"Lightness: ",e.lightness,"%"),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:10,max:90,step:5,value:e.lightness,onChange:function(t){e.setLightness(t.target.value)}})),c.a.createElement("div",{className:"control-container slider-container"},c.a.createElement("p",{className:"slider-label"},"Saturation: ",e.saturation,"%"),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:10,max:100,step:5,value:e.saturation,onChange:function(t){e.setSaturation(t.target.value)}})),c.a.createElement("div",{className:"control-container slider-container"},c.a.createElement("p",{className:"slider-label"},"Number of Points: ",e.selectorCount),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:1,max:10,step:1,value:e.selectorCount,onChange:function(t){e.setSelectorCount(t.target.value)}})),c.a.createElement("div",{className:"control-container slider-container"},c.a.createElement("p",{className:"slider-label"},"Point Spacing Angle:"," ",(Math.round(e.selectorAngle/e.selectorCount*10)/10).toFixed(1),"\xba"),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:10,max:360,step:1,value:e.selectorAngle,onChange:function(t){e.setSelectorAngle(t.target.value)}})),c.a.createElement("div",{className:"control-container slider-container"},c.a.createElement("p",{className:"slider-label"},"Distance from Origin:"," ",(Math.round(e.selectorRadius/236*1e3)/10).toFixed(0)),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:1,max:236,step:1,value:e.selectorRadius,onChange:function(t){e.setSelectorRadius(t.target.value)}})),c.a.createElement("div",{className:"control-container"},c.a.createElement("p",{className:"slider-label"},"Distance Stagger:"," ",(Math.round(10*e.selectorStagger)/10).toFixed(0)),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),ref:t,min:-(236-e.selectorRadius),max:e.selectorRadius,step:1,defaultValue:e.selectorStagger,onChange:function(t){console.log("sdfds"),e.setSelectorStagger(t.target.value)}})))})),h=a(7),p=a.n(h);a(33);var v=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,selectorCount:e.actionReducer.SELECTOR_COUNT}}))((function(e){var t=Object(n.useRef)(null),a=400/e.selectorCount,r=e.lightness<50?"#bdbdbd":"#404040";e.lightness;return c.a.createElement("div",{className:"color-block",style:{height:a,color:r,backgroundColor:e.color}},c.a.createElement("div",{className:"edit-prompt",ref:t,style:{height:a}}),c.a.createElement("div",{className:"copy-prompt",style:{height:a,paddingTop:"".concat((a-20)/2,"px")}},e.color))}));a(34),a(35);var N={setQuotes:function(){return{type:"SET_QUOTES"}},setHash:function(){return{type:"SET_HASH"}}},A=Object(s.b)((function(e){return{selectorCount:e.actionReducer.SELECTOR_COUNT,lightness:e.actionReducer.LIGHTNESS,colors:e.actionReducer.COLORS,hash:e.actionReducer.HASH,quotes:e.actionReducer.QUOTES,darkMode:e.actionReducer.DARK_MODE}}),N)((function(e){var t=e.colors.map((function(e,t){return c.a.createElement(v,{color:e,key:t})}));return c.a.createElement("div",{className:"colors-wrapper ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"colors-container",ref:e.paletteRef},t),c.a.createElement("div",{className:"control-container"},c.a.createElement("button",{className:"button ".concat(e.hash?"active":""," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setHash()}},"Hash"),c.a.createElement("button",{className:"button ".concat(e.quotes?"active":""," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setQuotes()}},"Quotes")),c.a.createElement("div",{className:"control-container"},c.a.createElement("button",{className:"button ".concat(e.darkMode?"dark":""),type:"button",onClick:function(){!function(){for(var t=Object(l.a)(S.getState().actionReducer.COLORS),a=0;a<t.length;a++)e.hash||(t[a]=t[a].substr(1)),e.quotes&&(t[a]="'".concat(t[a],"'"));p()(t)}()}},"Copy all")))}));a(36);var L=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,selectorCount:e.actionReducer.SELECTOR_COUNT,linked:e.actionReducer.LINKED,darkMode:e.actionReducer.DARK_MODE}}))((function(e){var t=Object(n.useRef)(null);return c.a.createElement("div",{className:"color-picker-container ".concat(e.darkMode?"dark":"")},c.a.createElement(C,null),c.a.createElement(f,{colorsContainer:t}),c.a.createElement(A,{paletteRef:t}))}));var k=Object(s.b)((function(e){return{darkMode:e.actionReducer.DARK_MODE}}))((function(e){return c.a.createElement("div",{className:"App ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"wrapper ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"logo-container ".concat(e.darkMode?"hidden":"")}),c.a.createElement("div",{className:"logo-container ".concat(e.darkMode?"dark":"hidden")}),c.a.createElement(L,null)))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(s.a,{store:S},c.a.createElement(k,null)),document.getElementById("root"));"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[13,1,2]]]);
//# sourceMappingURL=main.cc919618.chunk.js.map