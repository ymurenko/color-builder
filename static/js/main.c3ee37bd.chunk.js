(this["webpackJsonpcolor-builder"]=this["webpackJsonpcolor-builder"]||[]).push([[0],[,,,,,,,,,,,function(e,t,a){},,,function(e,t,a){e.exports=a(36)},,,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e){e.exports=JSON.parse("{}")},function(e){e.exports=JSON.parse("{}")},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(4),o=a.n(r),s=a(2),l=a(1),u=a(5),i=a(3),d={COLORS:["#FFF","#FFF","#FFF"],LIGHTNESS:50,SATURATION:100,SELECTOR_COUNT:4,SELECTOR_ANGLE:180,SELECTOR_RADIUS:118,SELECTOR_STAGGER:0,LINKED:!1,DARK_MODE:!1,HASH:!0,QUOTES:!0,PRESET:"default",RESET:0},E=Object(i.b)({actionReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:d,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_COLOR":var a=Object(u.a)(e.COLORS);return a[t.INDEX]=t.COLOR,Object(l.a)({},e,{COLORS:a});case"SET_LIGHTNESS":return Object(l.a)({},e,{LIGHTNESS:t.LIGHTNESS});case"SET_SATURATION":return Object(l.a)({},e,{SATURATION:t.SATURATION});case"SET_SELECTOR_COUNT":var n=[];return n.length=t.SELECTOR_COUNT,n.fill("#FFF"),Object(l.a)({},e,{COLORS:n,SELECTOR_COUNT:t.SELECTOR_COUNT});case"SET_SELECTOR_ANGLE":return Object(l.a)({},e,{SELECTOR_ANGLE:t.SELECTOR_ANGLE});case"SET_SELECTOR_RADIUS":return Object(l.a)({},e,{SELECTOR_RADIUS:t.SELECTOR_RADIUS});case"SET_SELECTOR_STAGGER":return Object(l.a)({},e,{SELECTOR_STAGGER:t.SELECTOR_STAGGER});case"SET_LINKED":return Object(l.a)({},e,{LINKED:!e.LINKED});case"SET_DARK_MODE":case"SET_DARK_MODE":return Object(l.a)({},e,{DARK_MODE:!e.DARK_MODE});case"SET_HASH":return Object(l.a)({},e,{HASH:!e.HASH});case"SET_QUOTES":return Object(l.a)({},e,{QUOTES:!e.QUOTES});case"SET_PRESET":return"default"===t.PRESET?Object(l.a)({},d,{DARK_MODE:e.DARK_MODE,SELECTOR_COUNT:e.SELECTOR_COUNT}):"triad"===t.PRESET?Object(l.a)({},d,{SELECTOR_COUNT:9,SELECTOR_ANGLE:360,DARK_MODE:e.DARK_MODE,PRESET:t.PRESET}):"tetrad"===t.PRESET?Object(l.a)({},d,{SELECTOR_COUNT:12,SELECTOR_ANGLE:360,DARK_MODE:e.DARK_MODE,PRESET:t.PRESET}):"pentad"===t.PRESET?Object(l.a)({},d,{SELECTOR_COUNT:10,SELECTOR_ANGLE:360,DARK_MODE:e.DARK_MODE,PRESET:t.PRESET}):Object(l.a)({},d,{SELECTOR_COUNT:e.SELECTOR_COUNT,SELECTOR_ANGLE:360,PRESET:t.PRESET});case"RESET":return Object(l.a)({},d,{DARK_MODE:e.DARK_MODE,RESET:1-e.RESET});default:return e}}}),S=Object(i.c)(E),R=(a(25),a(26),function(){return{type:"SET_LINKED"}}),O=function(){return{type:"SET_DARK_MODE"}},T=function(){return{type:"RESET"}};var m={storeColor:function(e,t){return{type:"SET_COLOR",COLOR:e,INDEX:t}}},b=Object(s.b)((function(e){return{selectorCount:e.actionReducer.SELECTOR_COUNT,selectorAngle:e.actionReducer.SELECTOR_ANGLE,selectorRadius:e.actionReducer.SELECTOR_RADIUS,selectorStagger:e.actionReducer.SELECTOR_STAGGER,lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,linked:e.actionReducer.LINKED,reset:e.actionReducer.RESET,preset:e.actionReducer.PRESET}}),m)((function(e){var t=Object(n.useRef)(null),a=(e.colorsContainer,e.canvas),r=0,o=0,s=null,l=[],u=null,i=0,d=function(t,n,c){var r=a.current.getContext("2d").getImageData(t,n,1,1).data,o="#"+((1<<24)+(r[0]<<16)+(r[1]<<8)+r[2]).toString(16).toUpperCase().slice(1);s[c].style.fill=o,e.lightness<50?s[c].style.stroke="#d4d4d4":s[c].style.stroke="#4d4d4d",e.storeColor(o,c)},E=function(){var t,a={total:0,count:1};if("triad"===e.preset&&3!=e.selectorCount){t=[0,0];for(var n=1;n<e.selectorCount;n++)a.count===Math.round(e.selectorCount/3)?(a.total++,a.count=0,t.push(t[n]=Math.round(e.selectorAngle/3)*(Math.PI/180)*a.total)):t.push(t[n]+=Math.round(e.selectorAngle/(2.5*e.selectorCount))*(Math.PI/180)),a.count++}else if("tetrad"===e.preset&&4!=e.selectorCount){t=[0,0];for(var c=1;c<e.selectorCount;c++)a.count===Math.round(e.selectorCount/4)?(a.total++,a.count=0,t.push(t[c]=Math.round(e.selectorAngle/4)*(Math.PI/180)*a.total)):t.push(t[c]+=Math.round(e.selectorAngle/(2.5*e.selectorCount))*(Math.PI/180)),a.count++}else if("pentad"===e.preset&&5!=e.selectorCount){t=[0,0];for(var r=1;r<e.selectorCount;r++)a.count===Math.round(e.selectorCount/5)?(a.total++,a.count=0,t.push(t[r]=Math.round(e.selectorAngle/5)*(Math.PI/180)*a.total)):t.push(t[r]+=Math.round(e.selectorAngle/(2*e.selectorCount))*(Math.PI/180)),a.count++}else{t=[i];for(var o=0;o<e.selectorCount;o++)t.push(t[o]+=Math.round(e.selectorAngle/e.selectorCount)*(Math.PI/180))}return t},S=function(){var t=[],a=s[0].getAttribute("cx"),n=s[0].getAttribute("cy"),c=Math.sqrt((250-a)*(250-a)+(250-n)*(250-n)),r=a-250,o=n-250,l=Math.atan2(o,r)-Math.atan2(0,250);t.push({angle:l,radius:c}),i=l;for(var u=1;u<e.selectorCount;u++){var d=s[u-1].getAttribute("cx"),E=s[u-1].getAttribute("cy"),S=s[u].getAttribute("cx"),R=s[u].getAttribute("cy"),O=Math.sqrt((250-S)*(250-S)+(250-R)*(250-R)),T=d-250,m=E-250,b=S-250,C=R-250,p=Math.atan2(C,b)-Math.atan2(m,T);t.push({angle:p,radius:O})}return t},R=function(e,t){return!(Math.sqrt((250-e)*(250-e)+(250-t)*(250-t))>237.5)||(m(),!1)},O=function(t){var a=t.pageX-r,n=t.pageY-o,c=s[0].getAttribute("cx"),u=s[0].getAttribute("cy"),i=c-250,E=u-250,S=Math.atan2(E,i),O=0;if(R(a,n)){s[0].setAttribute("cx","".concat(a)),s[0].setAttribute("cy","".concat(n)),d(c,u,0);for(var T=1;T<e.selectorCount;T++){O+=l[T].angle;var m=s[T].getAttribute("cx"),b=s[T].getAttribute("cy"),C=O+S,p=l[T].radius-(l[0].radius-Math.sqrt((250-a)*(250-a)+(250-n)*(250-n)));p<0&&(p=0),p>250&&(p=250),s[T].setAttribute("cx","".concat(250+p*Math.cos(C))),s[T].setAttribute("cy","".concat(250+p*Math.sin(C))),d(m,b,T)}}},T=function(e){var t=e.pageX-r,a=e.pageY-o;R(t,a)&&(u.setAttribute("cx","".concat(t)),u.setAttribute("cy","".concat(a)),d(t,a,u.id))},m=function(a){u=null,e.linked?t.current.removeEventListener("mousemove",O):t.current.removeEventListener("mousemove",T),l=S()},b=function(n){var c=a.current.getBoundingClientRect();r=c.left,o=c.top,u=n.target,e.linked?t.current.addEventListener("mousemove",O):t.current.addEventListener("mousemove",T),l=S()};return Object(n.useEffect)((function(){for(var t=E(),a=0,n=0;n<e.selectorCount;n++){var c=250+(e.selectorRadius-a)*Math.cos(t[n]),r=250+(e.selectorRadius-a)*Math.sin(t[n]);s[n].setAttribute("cx","".concat(c)),s[n].setAttribute("cy","".concat(r)),a+=e.selectorStagger/e.selectorCount}}),[e.selectorStagger,e.selectorCount,e.selectorRadius,e.selectorAngle]),Object(n.useEffect)((function(){for(var t=0;t<e.selectorCount;t++){var a=s[t].getAttribute("cx"),n=s[t].getAttribute("cy");d(a,n,t)}})),Object(n.useLayoutEffect)((function(){s=t.current.children,l=S()})),c.a.createElement("svg",{className:"selector",ref:t,width:"".concat(500),height:"".concat(500),viewBox:"0 0 ".concat(500," ").concat(500)},function(){for(var t=[],a=E(),n=0;n<e.selectorCount;n++){var r=250+e.selectorRadius*Math.cos(a[n]),o=250+e.selectorRadius*Math.sin(a[n]);t.push(c.a.createElement("circle",{cx:r,cy:o,r:"15",stroke:"#4d4d4d","stroke-width":"0.5",style:{filter:"drop-shadow(0 0 4px #4d4d4d)"},onMouseDown:function(e){return b(e)},onMouseUp:function(e){return m(e)},key:n,id:"".concat(n)}))}return t}())}));a(27),a(28),a(29);var C={resetState:T,setLinkedState:R},p=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,darkMode:e.actionReducer.DARK_MODE,linked:e.actionReducer.LINKED}}),C)((function(e){var t=Object(n.useRef)(null);return Object(n.useLayoutEffect)((function(){!function(){var a=t.current.getContext("2d");a.clearRect(0,0,500,500);for(var n=0;n<3600;n+=1){var c=n/10,r=(c-90)*Math.PI/180,o=250+250*Math.cos(-r),s=250+250*Math.sin(-r);a.beginPath();var l=a.createLinearGradient(250,250,o,s);l.addColorStop("0","".concat(e.lightness>45?"white":"black")),l.addColorStop("0.95","hsl(".concat(c,", ").concat(e.saturation,"%, ").concat(e.lightness,"%)")),l.addColorStop("0.95","".concat(e.darkMode?"#212121":"#b5b5b5")),l.addColorStop("1","".concat(e.darkMode?"#212121":"#b5b5b5")),a.strokeStyle=l,a.moveTo(250,250),a.lineTo(o,s),a.stroke()}}()})),c.a.createElement("div",{className:"color-wheel ui-block ".concat(e.darkMode?"dark":""),style:{height:"".concat(500),width:"".concat(500)}},c.a.createElement("button",{className:"button button-left ".concat(e.linked?"active":""," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setLinkedState()}},e.linked?"Unlink":"Link"),c.a.createElement("div",{className:"gradient"},c.a.createElement(b,{colorsContainer:e.colorsContainer,canvas:t}),c.a.createElement("canvas",{width:"".concat(500),height:"".concat(500),ref:t})),c.a.createElement("button",{className:"button button-right ".concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.resetState()}},"Reset"))})),f=a(13);a(11),a(30);var g={setLightness:function(e){return{type:"SET_LIGHTNESS",LIGHTNESS:e}},setSaturation:function(e){return{type:"SET_SATURATION",SATURATION:e}},setSelectorCount:function(e){return{type:"SET_SELECTOR_COUNT",SELECTOR_COUNT:e}},resetState:T,setLinkedState:R,setSelectorAngle:function(e){return{type:"SET_SELECTOR_ANGLE",SELECTOR_ANGLE:e}},setSelectorRadius:function(e){return{type:"SET_SELECTOR_RADIUS",SELECTOR_RADIUS:e}},setSelectorStagger:function(e){return{type:"SET_SELECTOR_STAGGER",SELECTOR_STAGGER:e}},setDarkMode:O,setPreset:function(e){return{type:"SET_PRESET",PRESET:e}}},N=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,selectorCount:e.actionReducer.SELECTOR_COUNT,selectorAngle:e.actionReducer.SELECTOR_ANGLE,selectorRadius:e.actionReducer.SELECTOR_RADIUS,selectorStagger:e.actionReducer.SELECTOR_STAGGER,linked:e.actionReducer.LINKED,darkMode:e.actionReducer.DARK_MODE,preset:e.actionReducer.PRESET}}),g)((function(e){var t=Object(n.useState)(!0),a=Object(f.a)(t,2),r=a[0],o=a[1],s=Object(n.useRef)(null);return Object(n.useEffect)((function(){e.setSelectorStagger(s.current.value)}),[e.selectorRadius]),c.a.createElement("div",{className:"controls ui-block ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"control-container"},c.a.createElement("button",{className:"button ".concat(r?"active":""," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){o(!0)}},"Settings"),c.a.createElement("button",{className:"button ".concat(r?"":"active"," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){o(!1)}},"Presets")),c.a.createElement("div",{className:"presets",style:{display:r?"none":""}},c.a.createElement("div",{className:"presets-grid"},c.a.createElement("button",{className:"preset button ".concat(e.darkMode?"dark":""," ").concat("default"===e.preset?"active":""," "),type:"button",onClick:function(){"default"!==e.preset&&e.setPreset("default")}},"Analogous"),c.a.createElement("button",{className:"preset button  ".concat(e.darkMode?"dark":""," ").concat("triad"===e.preset?"active":""),type:"button",onClick:function(){"triad"!==e.preset&&e.setPreset("triad")}},"Triad"),c.a.createElement("button",{className:"preset button  ".concat(e.darkMode?"dark":""," ").concat("tetrad"===e.preset?"active":""),type:"button",onClick:function(){"tetrad"!==e.preset&&e.setPreset("tetrad")}},"Tetrad"),c.a.createElement("button",{className:"preset button  ".concat(e.darkMode?"dark":""," ").concat("pentad"===e.preset?"active":""),type:"button",onClick:function(){"pentad"!==e.preset&&e.setPreset("pentad")}},"Pentad"))),c.a.createElement("div",{className:"settings",style:{display:r?"":"none"}},c.a.createElement("div",{className:"control-container"},c.a.createElement("p",{className:"slider-label"},"Lightness: ",e.lightness,"%"),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:10,max:90,step:5,value:e.lightness,onChange:function(t){e.setLightness(t.target.value)}})),c.a.createElement("div",{className:"control-container slider-container"},c.a.createElement("p",{className:"slider-label"},"Saturation: ",e.saturation,"%"),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:10,max:100,step:5,value:e.saturation,onChange:function(t){e.setSaturation(t.target.value)}})),c.a.createElement("div",{className:"control-container slider-container"},c.a.createElement("p",{className:"slider-label"},"Number of Points: ",e.selectorCount),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:1,max:10,step:1,value:e.selectorCount,onChange:function(t){e.setSelectorCount(t.target.value)}})),c.a.createElement("div",{className:"control-container slider-container"},c.a.createElement("p",{className:"slider-label"},"Point Spacing Angle:"," ",(Math.round(e.selectorAngle/e.selectorCount*10)/10).toFixed(1),"\xba"),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:10,max:360,step:1,value:e.selectorAngle,onChange:function(t){e.setSelectorAngle(t.target.value)}})),c.a.createElement("div",{className:"control-container slider-container"},c.a.createElement("p",{className:"slider-label"},"Distance from Origin:"," ",(Math.round(e.selectorRadius/236*1e3)/10).toFixed(0)),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:1,max:236,step:1,value:e.selectorRadius,onChange:function(t){e.setSelectorRadius(t.target.value)}})),c.a.createElement("div",{className:"control-container"},c.a.createElement("p",{className:"slider-label"},"Distance Stagger:"," ",(Math.round(10*e.selectorStagger)/10).toFixed(0)),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),ref:s,min:-(236-e.selectorRadius),max:e.selectorRadius,step:1,defaultValue:e.selectorStagger,onChange:function(t){console.log("sdfds"),e.setSelectorStagger(t.target.value)}}))))})),h=a(7),k=a.n(h);a(32);var v=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,selectorCount:e.actionReducer.SELECTOR_COUNT}}))((function(e){var t=Object(n.useRef)(null),a=400/e.selectorCount,r=e.lightness<50?"#bdbdbd":"#404040";e.lightness;return c.a.createElement("div",{className:"color-block",style:{height:a,color:r,backgroundColor:e.color}},c.a.createElement("div",{className:"edit-prompt",ref:t,style:{height:a}}),c.a.createElement("div",{className:"copy-prompt",style:{height:a,paddingTop:"".concat((a-20)/2,"px")}},e.color))}));a(33),a(34);var A={setQuotes:function(){return{type:"SET_QUOTES"}},setHash:function(){return{type:"SET_HASH"}}},L=Object(s.b)((function(e){return{selectorCount:e.actionReducer.SELECTOR_COUNT,lightness:e.actionReducer.LIGHTNESS,colors:e.actionReducer.COLORS,hash:e.actionReducer.HASH,quotes:e.actionReducer.QUOTES,darkMode:e.actionReducer.DARK_MODE}}),A)((function(e){var t=e.colors.map((function(e,t){return c.a.createElement(v,{color:e,key:t})}));return c.a.createElement("div",{className:"palette ui-block ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"colors-container",ref:e.paletteRef},t),c.a.createElement("div",{className:"control-container"},c.a.createElement("button",{className:"button ".concat(e.hash?"active":""," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setHash()}},"Hash"),c.a.createElement("button",{className:"button ".concat(e.quotes?"active":""," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setQuotes()}},"Quotes")),c.a.createElement("div",{className:"control-container"},c.a.createElement("button",{className:"button ".concat(e.darkMode?"dark":""),type:"button",onClick:function(){!function(){for(var t=Object(u.a)(S.getState().actionReducer.COLORS),a=0;a<t.length;a++)e.hash||(t[a]=t[a].substr(1)),e.quotes&&(t[a]="'".concat(t[a],"'"));k()(t)}()}},"Copy all")))}));a(35);var M={setDarkMode:O},_=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,selectorCount:e.actionReducer.SELECTOR_COUNT,linked:e.actionReducer.LINKED,darkMode:e.actionReducer.DARK_MODE}}),M)((function(e){var t=Object(n.useRef)(null);return c.a.createElement("div",{className:"color-picker-container active-tab ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"navbar-container"},c.a.createElement("div",{className:"tab color-picker-tab active-tab ".concat(e.darkMode?"dark":"")},"Colorpicker"),c.a.createElement("div",{className:"shadow-tab tab color-picker-tab ".concat(e.darkMode?"dark":"")}),c.a.createElement("div",{className:"tab editor-tab ".concat(e.darkMode?"dark":"")},"Palette editor"),c.a.createElement("div",{className:"shadow-tab tab editor-tab ".concat(e.darkMode?"dark":"")}),c.a.createElement("button",{className:"button set-dark ".concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setDarkMode()}},e.darkMode?"Light Mode":"Dark Mode")),c.a.createElement("div",{className:"color-picker-components ".concat(e.darkMode?"dark":"")},c.a.createElement(N,null),c.a.createElement(p,{colorsContainer:t}),c.a.createElement(L,{paletteRef:t})))}));var D=Object(s.b)((function(e){return{darkMode:e.actionReducer.DARK_MODE}}))((function(e){return c.a.createElement("div",{className:"App ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"wrapper ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"logo-container ".concat(e.darkMode?"hidden":"")}),c.a.createElement("div",{className:"logo-container ".concat(e.darkMode?"dark":"hidden")}),c.a.createElement(_,null)))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(s.a,{store:S},c.a.createElement(D,null)),document.getElementById("root"));"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[14,1,2]]]);
//# sourceMappingURL=main.c3ee37bd.chunk.js.map