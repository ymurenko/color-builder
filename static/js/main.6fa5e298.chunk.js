(this["webpackJsonpcolor-builder"]=this["webpackJsonpcolor-builder"]||[]).push([[0],[,,,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},,,function(e,t,a){e.exports=a(37)},,,,,,,,,,,function(e,t,a){},function(e,t,a){},function(e){e.exports=JSON.parse("{}")},function(e){e.exports=JSON.parse("{}")},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),r=a(5),o=a.n(r),s=a(1),i=a(3),u=a(2),l=a(4),d=function(){var e=Math.max(document.documentElement.clientHeight,window.innerHeight||0),t=Math.max(document.documentElement.clientHeight,window.innerWidth||0);return e>t?t:e},E={VIEWPORT_HEIGHT:d(),COLORS:["#FFF","#FFF","#FFF"],PALETTES:[],LIGHTNESS:50,SATURATION:100,SELECTOR_COUNT:4,SELECTOR_ANGLE:180,SELECTOR_RADIUS:118,SELECTOR_STAGGER:0,CLUSTER_ANGLE:30,LINKED:!1,DARK_MODE:!1,HASH:!0,QUOTES:!0,PRESET:1,RESET:0},R=Object(l.b)({actionReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_VIEWPORT_HEIGHT":return Object(u.a)({},e,{VIEWPORT_HEIGHT:d()});case"SET_COLOR":var a=Object(i.a)(e.COLORS);return a[t.INDEX]=t.COLOR,Object(u.a)({},e,{COLORS:a});case"STORE_PALETTE":var n=Object(i.a)(e.PALETTES);return n.push(Object(i.a)(e.COLORS)),Object(u.a)({},e,{PALETTES:n});case"DELETE_PALETTE":var c=Object(i.a)(e.PALETTES);return c.splice(t.INDEX,1),Object(u.a)({},e,{PALETTES:c});case"SET_LIGHTNESS":return Object(u.a)({},e,{LIGHTNESS:t.LIGHTNESS});case"SET_SATURATION":return Object(u.a)({},e,{SATURATION:t.SATURATION});case"SET_SELECTOR_COUNT":var r=[];return r.length=t.SELECTOR_COUNT,r.fill("#FFF"),Object(u.a)({},e,{COLORS:r,SELECTOR_COUNT:t.SELECTOR_COUNT});case"SET_SELECTOR_ANGLE":return Object(u.a)({},e,{SELECTOR_ANGLE:t.SELECTOR_ANGLE});case"SET_SELECTOR_RADIUS":return Object(u.a)({},e,{SELECTOR_RADIUS:t.SELECTOR_RADIUS});case"SET_SELECTOR_STAGGER":return Object(u.a)({},e,{SELECTOR_STAGGER:t.SELECTOR_STAGGER});case"SET_LINKED":return Object(u.a)({},e,{LINKED:!e.LINKED});case"SET_DARK_MODE":case"SET_DARK_MODE":return Object(u.a)({},e,{DARK_MODE:!e.DARK_MODE});case"SET_HASH":return Object(u.a)({},e,{HASH:!e.HASH});case"SET_QUOTES":return Object(u.a)({},e,{QUOTES:!e.QUOTES});case"SET_PRESET":switch(t.PRESET){case 2:return Object(u.a)({},E,{VIEWPORT_HEIGHT:e.VIEWPORT_HEIGHT,PALETTES:e.PALETTES,SELECTOR_ANGLE:360,DARK_MODE:e.DARK_MODE,PRESET:t.PRESET,LINKED:!0,CLUSTER_ANGLE:20});case 3:case 4:return Object(u.a)({},E,{VIEWPORT_HEIGHT:e.VIEWPORT_HEIGHT,PALETTES:e.PALETTES,SELECTOR_ANGLE:360,DARK_MODE:e.DARK_MODE,PRESET:t.PRESET,LINKED:!0,CLUSTER_ANGLE:16});case 5:return Object(u.a)({},E,{VIEWPORT_HEIGHT:e.VIEWPORT_HEIGHT,PALETTES:e.PALETTES,SELECTOR_ANGLE:360,DARK_MODE:e.DARK_MODE,PRESET:t.PRESET,LINKED:!0,CLUSTER_ANGLE:15});default:return e}case"SET_CLUSTER_ANGLE":return Object(u.a)({},e,{CLUSTER_ANGLE:t.CLUSTER_ANGLE});case"RESET":return Object(u.a)({},E,{VIEWPORT_HEIGHT:e.VIEWPORT_HEIGHT,PALETTES:e.PALETTES,SELECTOR_COUNT:e.SELECTOR_COUNT,DARK_MODE:e.DARK_MODE,RESET:1-e.RESET});default:return e}}}),T=Object(l.c)(R),S=(a(27),function(e){return{type:"SET_SELECTOR_COUNT",SELECTOR_COUNT:e}}),C=function(){return{type:"SET_LINKED"}},m=function(){return{type:"SET_DARK_MODE"}},O=function(){return{type:"RESET"}};a(28);var p={storeColor:function(e,t){return{type:"SET_COLOR",COLOR:e,INDEX:t}}},b=Object(s.b)((function(e){return{selectorCount:e.actionReducer.SELECTOR_COUNT,selectorAngle:e.actionReducer.SELECTOR_ANGLE,selectorRadius:e.actionReducer.SELECTOR_RADIUS,selectorStagger:e.actionReducer.SELECTOR_STAGGER,lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,linked:e.actionReducer.LINKED,reset:e.actionReducer.RESET,preset:e.actionReducer.PRESET,clusterAngle:e.actionReducer.CLUSTER_ANGLE,CWRadius:.325*e.actionReducer.VIEWPORT_HEIGHT}}),p)((function(e){var t=Object(n.useRef)(null),a=e.canvas,r=0,o=0,s=null,i=[],u=null,l=0,d=0,E=function(t,n,c){var r=a.current.getContext("2d").getImageData(t,n,1,1).data,o="#"+((1<<24)+(r[0]<<16)+(r[1]<<8)+r[2]).toString(16).toUpperCase().slice(1);s[c].style.fill=o,e.lightness<50?s[c].style.stroke="#d4d4d4":s[c].style.stroke="#4d4d4d",e.storeColor(o,c)},R=function(){var t,a={total:0,count:1};if(1!=e.preset&&e.selectorCount!=e.preset){t=[0,0];for(var n=1;n<e.selectorCount;n++)a.count===Math.round(e.selectorCount/e.preset)?(a.total++,a.count=0,t.push(t[n]=Math.round(e.selectorAngle/e.preset)*(Math.PI/180)*a.total)):t.push(t[n]+=e.clusterAngle*(Math.PI/180)),a.count++}else{t=[l];for(var c=0;c<e.selectorCount;c++)t.push(t[c]+Math.round(e.selectorAngle/e.selectorCount)*(Math.PI/180))}return t},T=function(){var t=[],a=s[0].getAttribute("cx"),n=s[0].getAttribute("cy"),c=Math.sqrt((e.CWRadius-a)*(e.CWRadius-a)+(e.CWRadius-n)*(e.CWRadius-n)),r=e.CWRadius,o=a-e.CWRadius,i=n-e.CWRadius,u=Math.atan2(i,o)-Math.atan2(0,r);t.push({angle:u,radius:c}),l=u;for(var d=1;d<e.selectorCount;d++){var E=s[d-1].getAttribute("cx"),R=s[d-1].getAttribute("cy"),T=s[d].getAttribute("cx"),S=s[d].getAttribute("cy"),C=Math.sqrt((e.CWRadius-T)*(e.CWRadius-T)+(e.CWRadius-S)*(e.CWRadius-S)),m=E-e.CWRadius,O=R-e.CWRadius,p=T-e.CWRadius,b=S-e.CWRadius,f=Math.atan2(b,p)-Math.atan2(O,m);t.push({angle:f,radius:C})}return t},S=function(t,a){return!(Math.sqrt((e.CWRadius-t)*(e.CWRadius-t)+(e.CWRadius-a)*(e.CWRadius-a))>.95*e.CWRadius)||(O(),!1)},C=function(t){var a=t.pageX-r,n=t.pageY-o,c=s[0].getAttribute("cx"),u=s[0].getAttribute("cy"),l=c-e.CWRadius,d=u-e.CWRadius,R=Math.atan2(d,l),T=0;if(S(a,n)){s[0].setAttribute("cx","".concat(a)),s[0].setAttribute("cy","".concat(n)),E(c,u,0);for(var C=1;C<e.selectorCount;C++){T+=i[C].angle;var m=s[C].getAttribute("cx"),O=s[C].getAttribute("cy"),p=T+R,b=i[C].radius-(i[0].radius-Math.sqrt((e.CWRadius-a)*(e.CWRadius-a)+(e.CWRadius-n)*(e.CWRadius-n)));b<0&&(b=0),b>e.CWRadius&&(b=e.CWRadius),s[C].setAttribute("cx","".concat(e.CWRadius+b*Math.cos(p))),s[C].setAttribute("cy","".concat(e.CWRadius+b*Math.sin(p))),E(m,O,C)}}},m=function(e){var t=e.pageX-r,a=e.pageY-o;S(t,a)&&(u.setAttribute("cx","".concat(t)),u.setAttribute("cy","".concat(a)),E(t,a,u.id))},O=function(a){u=null,e.linked?t.current.removeEventListener("mousemove",C):t.current.removeEventListener("mousemove",m),i=T()},p=function(n){var c=a.current.getBoundingClientRect();r=c.left,o=c.top,u=n.target,e.linked?t.current.addEventListener("mousemove",C):t.current.addEventListener("mousemove",m),i=T()};return Object(n.useEffect)((function(){for(var t=R(),a=0,n=e.CWRadius/d,c=0;c<e.selectorCount;c++){var r=e.CWRadius+(e.selectorRadius-a)*Math.cos(t[c]),o=e.CWRadius+(e.selectorRadius-a)*Math.sin(t[c]);s[c].setAttribute("cx","".concat(r*n)),s[c].setAttribute("cy","".concat(o*n)),a+=e.selectorStagger/e.selectorCount}}),[e.selectorStagger,e.selectorCount,e.selectorRadius,e.selectorAngle,e.clusterAngle,e.reset,e.CWRadius]),Object(n.useEffect)((function(){for(var t=0;t<e.selectorCount;t++){var a=s[t].getAttribute("cx"),n=s[t].getAttribute("cy");E(a,n,t)}})),Object(n.useLayoutEffect)((function(){d=e.CWRadius,s=t.current.children,i=T()})),c.a.createElement("svg",{className:"selector",ref:t,width:"".concat(2*e.CWRadius),height:"".concat(2*e.CWRadius),viewBox:"0 0 ".concat(2*e.CWRadius," ").concat(2*e.CWRadius)},function(){for(var t=[],a=R(),n=0;n<e.selectorCount;n++){var r=e.CWRadius+e.selectorRadius*Math.cos(a[n]),o=e.CWRadius+e.selectorRadius*Math.sin(a[n]);t.push(c.a.createElement("circle",{cx:r,cy:o,r:"".concat(.06*e.CWRadius),stroke:"#a1a1a1",strokeWidth:"".concat(.003*e.CWRadius),onMouseDown:function(e){return p(e)},onMouseUp:function(e){return O(e)},key:n,id:"".concat(n)}))}return t}())}));a(29),a(30),a(31);var f={resetState:O,setLinkedState:C},A=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,darkMode:e.actionReducer.DARK_MODE,linked:e.actionReducer.LINKED,CWRadius:.325*e.actionReducer.VIEWPORT_HEIGHT}}),f)((function(e){var t=Object(n.useRef)(null);return Object(n.useLayoutEffect)((function(){!function(){var a=t.current.getContext("2d");a.clearRect(0,0,2*e.CWRadius,2*e.CWRadius);for(var n=0;n<3600;n+=1){var c=n/10,r=(c-90)*Math.PI/180,o=e.CWRadius+e.CWRadius*Math.cos(-r),s=e.CWRadius+e.CWRadius*Math.sin(-r);a.beginPath();var i=a.createLinearGradient(e.CWRadius,e.CWRadius,o,s);i.addColorStop("0","".concat(e.lightness>45?"white":"black")),i.addColorStop("0.95","hsl(".concat(c,", ").concat(e.saturation,"%, ").concat(e.lightness,"%)")),i.addColorStop("0.95","".concat(e.darkMode?"#212121":"#b5b5b5")),i.addColorStop("1","".concat(e.darkMode?"#212121":"#b5b5b5")),a.strokeStyle=i,a.moveTo(e.CWRadius,e.CWRadius),a.lineTo(o,s),a.stroke()}}()})),c.a.createElement("div",{className:"color-wheel ui-block ".concat(e.darkMode?"dark":""),style:{height:"".concat(2*e.CWRadius),width:"".concat(2*e.CWRadius)}},c.a.createElement("button",{className:"button button-left ".concat(e.linked?"active":""," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setLinkedState()}},e.linked?"Unlink":"Link"),c.a.createElement("div",{className:"gradient"},c.a.createElement(b,{colorsContainer:e.colorsContainer,canvas:t}),c.a.createElement("canvas",{width:"".concat(2*e.CWRadius),height:"".concat(2*e.CWRadius),ref:t})),c.a.createElement("button",{className:"button button-right ".concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.resetState()}},"Reset"))}));a(11),a(12);var L={setLightness:function(e){return{type:"SET_LIGHTNESS",LIGHTNESS:e}},setSaturation:function(e){return{type:"SET_SATURATION",SATURATION:e}},setSelectorCount:S,resetState:O,setLinkedState:C,setSelectorAngle:function(e){return{type:"SET_SELECTOR_ANGLE",SELECTOR_ANGLE:e}},setSelectorRadius:function(e){return{type:"SET_SELECTOR_RADIUS",SELECTOR_RADIUS:e}},setSelectorStagger:function(e){return{type:"SET_SELECTOR_STAGGER",SELECTOR_STAGGER:e}},setDarkMode:m},k=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,selectorCount:e.actionReducer.SELECTOR_COUNT,selectorAngle:e.actionReducer.SELECTOR_ANGLE,selectorRadius:e.actionReducer.SELECTOR_RADIUS,selectorStagger:e.actionReducer.SELECTOR_STAGGER,linked:e.actionReducer.LINKED,darkMode:e.actionReducer.DARK_MODE,preset:e.actionReducer.PRESET,Viewport:e.actionReducer.VIEWPORT_HEIGHT}}),L)((function(e){var t=Object(n.useRef)(null),a=Object(n.useRef)(null);return Object(n.useEffect)((function(){e.setSelectorStagger(t.current.value)}),[e.selectorRadius]),c.a.createElement("div",{className:"controls ui-half-block ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"controls-wrapper"},c.a.createElement("div",{className:"slider-container"},c.a.createElement("p",{className:"slider-label"},"Lightness: ",e.lightness,"%"),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:10,max:90,step:5,value:e.lightness,onChange:function(t){e.setLightness(t.target.value)}})),c.a.createElement("div",{className:"slider-container"},c.a.createElement("p",{className:"slider-label"},"Saturation: ",e.saturation,"%"),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:10,max:100,step:5,value:e.saturation,onChange:function(t){e.setSaturation(t.target.value)}})),c.a.createElement("div",{className:"slider-container"},c.a.createElement("p",{className:"slider-label"},"Number of Points: ",e.selectorCount),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),ref:a,min:e.preset,max:15,step:e.preset,value:e.selectorCount,onChange:function(t){e.setSelectorCount(t.target.value)}})),c.a.createElement("div",{className:"slider-container"},c.a.createElement("p",{className:"slider-label"},"Point Spacing Angle:"," ",(Math.round(e.selectorAngle/e.selectorCount*10)/10).toFixed(1),"\xba"),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:10,max:360,step:1,value:e.selectorAngle,onChange:function(t){e.setSelectorAngle(t.target.value)}})),c.a.createElement("div",{className:"slider-container"},c.a.createElement("p",{className:"slider-label"},"Distance From Origin:"," ",(Math.round(e.selectorRadius/236*1e3)/10).toFixed(0)),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:1,max:.295*e.Viewport,step:1,value:e.selectorRadius,onChange:function(t){e.setSelectorRadius(t.target.value)}})),c.a.createElement("div",{className:"slider-container"},c.a.createElement("p",{className:"slider-label"},"Distance Stagger:"," ",(Math.round(10*e.selectorStagger)/10).toFixed(0)),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),ref:t,min:-(.295*e.Viewport-e.selectorRadius),max:e.selectorRadius,step:1,defaultValue:e.selectorStagger,onChange:function(t){e.setSelectorStagger(t.target.value)}}))))}));a(32);var N={setSelectorCount:S,setDarkMode:m,setClusterAngle:function(e){return{type:"SET_CLUSTER_ANGLE",CLUSTER_ANGLE:e}},setPreset:function(e){return{type:"SET_PRESET",PRESET:e}}},g=Object(s.b)((function(e){return{selectorCount:e.actionReducer.SELECTOR_COUNT,selectorAngle:e.actionReducer.SELECTOR_ANGLE,selectorRadius:e.actionReducer.SELECTOR_RADIUS,darkMode:e.actionReducer.DARK_MODE,preset:e.actionReducer.PRESET,clusterAngle:e.actionReducer.CLUSTER_ANGLE,Viewport:e.actionReducer.VIEWPORT_HEIGHT}}),N)((function(e){return Object(n.useEffect)((function(){1!=e.preset&&e.setSelectorCount(3*e.preset)}),[e.preset]),c.a.createElement("div",{className:"presets ui-half-block ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"presets-wrapper"},c.a.createElement("div",{className:"presets-grid"},c.a.createElement("button",{className:"preset dyad ".concat(e.darkMode?"dark":""," ").concat(2===e.preset?"active":""," "),type:"button",onClick:function(){2!==e.preset&&e.setPreset(2)}}),c.a.createElement("button",{className:"preset triad  ".concat(e.darkMode?"dark":""," ").concat(3===e.preset?"active":""),type:"button",onClick:function(){3!==e.preset&&e.setPreset(3)}}),c.a.createElement("button",{className:"preset tetrad  ".concat(e.darkMode?"dark":""," ").concat(4===e.preset?"active":""),type:"button",onClick:function(){4!==e.preset&&e.setPreset(4)}}),c.a.createElement("button",{className:"preset pentad  ".concat(e.darkMode?"dark":""," ").concat(5===e.preset?"active":""),type:"button",onClick:function(){5!==e.preset&&e.setPreset(5)}}))),c.a.createElement("div",{className:"slider-container",style:{marginTop:"".concat(.1*e.Viewport)}},c.a.createElement("p",{className:"slider-label"},"Cluster Spacing Angle:"," ",(Math.round(10*e.clusterAngle)/10).toFixed(1),"\xba"),c.a.createElement("input",{type:"range",className:"slider ".concat(e.darkMode?"dark":""),min:1,max:e.selectorAngle/e.preset/e.selectorCount*e.preset,step:1,value:e.clusterAngle,onChange:function(t){e.setClusterAngle(t.target.value)}})))})),v=a(6),h=a.n(v);a(34);var _=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,selectorCount:e.actionReducer.SELECTOR_COUNT,hash:e.actionReducer.HASH,quotes:e.actionReducer.QUOTES,Viewport:e.actionReducer.VIEWPORT_HEIGHT}}))((function(e){var t=Object(n.useRef)(null),a=.575*e.Viewport/e.selectorCount,r=e.lightness<50?"#bdbdbd":"#404040";return c.a.createElement("div",{ref:t,className:"color-block",style:{height:a,color:r,backgroundColor:e.color},onClick:function(t){return function(t){var a=e.color;e.hash||(a=a.substr(1)),e.quotes&&(a="'".concat(a,"'")),h()(a)}()}},c.a.createElement("div",{className:"copy-prompt",style:{height:a,paddingTop:"".concat((a-.025*e.Viewport)/2,"px")}},c.a.createElement("p",{className:"color-text hover-cta"},e.color),c.a.createElement("p",{className:"copy-text hover-cta"},"Click to copy")))}));a(35);var M={setQuotes:function(){return{type:"SET_QUOTES"}},setHash:function(){return{type:"SET_HASH"}}},I=Object(s.b)((function(e){return{selectorCount:e.actionReducer.SELECTOR_COUNT,lightness:e.actionReducer.LIGHTNESS,colors:e.actionReducer.COLORS,hash:e.actionReducer.HASH,quotes:e.actionReducer.QUOTES,darkMode:e.actionReducer.DARK_MODE}}),M)((function(e){var t=e.colors.map((function(e,t){return c.a.createElement(_,{color:e,key:t})}));return c.a.createElement("div",{className:"picker-palette ui-block ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"colors-container",ref:e.paletteRef},t),c.a.createElement("div",{className:"control-container"},c.a.createElement("button",{className:"button ".concat(e.hash?"active":""," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setHash()}},"Hash"),c.a.createElement("button",{className:"button ".concat(e.quotes?"active":""," ").concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setQuotes()}},"Quotes")),c.a.createElement("div",{className:"control-container"},c.a.createElement("button",{className:"button ".concat(e.darkMode?"dark":""),type:"button",onClick:function(){!function(){for(var t=Object(i.a)(T.getState().actionReducer.COLORS),a=0;a<t.length;a++)e.hash||(t[a]=t[a].substr(1)),e.quotes&&(t[a]="'".concat(t[a],"'"));h()(t)}()}},"Copy all")))})),W=(a(36),a(15));a(13);var D={deletePalette:function(e){return{type:"DELETE_PALETTE",INDEX:e}}},y=Object(s.b)((function(e){return{darkMode:e.actionReducer.DARK_MODE,Viewport:e.actionReducer.VIEWPORT_HEIGHT}}),D)((function(e){var t=.1623*e.Viewport/e.palette.length,a=e.palette.map((function(e,a){return c.a.createElement("div",{className:"block-color",style:{backgroundColor:e,width:"".concat(t,"px")},key:a})}));return c.a.createElement("div",{className:"palette-block ".concat(e.darkMode?"dark":""," ").concat(e.deleteMode?"delete-mode":""),onClick:function(){e.deleteMode&&e.deletePalette(e.index)}},c.a.createElement("div",{className:"icon-overlay"}),a)}));var G={storePalette:function(){return{type:"STORE_PALETTE"}}},H=Object(s.b)((function(e){return{darkMode:e.actionReducer.DARK_MODE,palettes:e.actionReducer.PALETTES}}),G)((function(e){var t=Object(n.useState)(!1),a=Object(W.a)(t,2),r=a[0],o=a[1],s=e.palettes.map((function(e,t){return c.a.createElement(y,{palette:e,key:t,deleteMode:r,index:t})}));return c.a.createElement("div",{className:"palette ".concat(e.darkMode?"dark":"")},c.a.createElement("button",{className:"button palettes-button ".concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.storePalette()}},"Add"),c.a.createElement("button",{className:"button palettes-button ".concat(e.darkMode?"dark":""," ").concat(r?"active":""),type:"button",onClick:function(){o(!r)}},"Delete"),c.a.createElement("div",{className:"palette-blocks-wrapper"},s))}));var P={setDarkMode:m},U=Object(s.b)((function(e){return{lightness:e.actionReducer.LIGHTNESS,saturation:e.actionReducer.SATURATION,selectorCount:e.actionReducer.SELECTOR_COUNT,linked:e.actionReducer.LINKED,darkMode:e.actionReducer.DARK_MODE}}),P)((function(e){var t=Object(n.useRef)(null);return c.a.createElement("div",{className:"color-picker-container active-tab ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"navbar-container"},c.a.createElement("div",{className:"tab color-picker-tab active-tab ".concat(e.darkMode?"dark":"")},"Colorpicker"),c.a.createElement("div",{className:"shadow-tab tab color-picker-tab ".concat(e.darkMode?"dark":"")}),c.a.createElement("div",{className:"tab editor-tab ".concat(e.darkMode?"dark":"")},"Palette editor"),c.a.createElement("div",{className:"shadow-tab tab editor-tab ".concat(e.darkMode?"dark":"")}),c.a.createElement("button",{className:"button set-dark ".concat(e.darkMode?"dark":""),type:"button",onClick:function(){e.setDarkMode()}},e.darkMode?"Light Mode":"Dark Mode")),c.a.createElement("div",{className:"color-picker-components ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"settings-wrapper"},c.a.createElement(g,null),c.a.createElement(k,null)),c.a.createElement(A,{colorsContainer:t}),c.a.createElement(I,{paletteRef:t}),c.a.createElement(H,null)))}));var j={setViewport:function(){return{type:"SET_VIEWPORT_HEIGHT"}}},w=Object(s.b)((function(e){return{darkMode:e.actionReducer.DARK_MODE}}),j)((function(e){return Object(n.useLayoutEffect)((function(){window.addEventListener("resize",(function(){return e.setViewport()}))})),c.a.createElement("div",{className:"App ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"wrapper ".concat(e.darkMode?"dark":"")},c.a.createElement("div",{className:"logo-container ".concat(e.darkMode?"hidden":"")}),c.a.createElement("div",{className:"logo-container ".concat(e.darkMode?"dark":"hidden")}),c.a.createElement(U,null)))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(s.a,{store:T},c.a.createElement(w,null)),document.getElementById("root"));var x=Math.max(document.documentElement.clientWidth,window.innerWidth||0),K=Math.max(document.documentElement.clientHeight,window.innerHeight||0);console.log(x,K),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[16,1,2]]]);
//# sourceMappingURL=main.6fa5e298.chunk.js.map