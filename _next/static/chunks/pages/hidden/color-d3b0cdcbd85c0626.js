(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[868],{5749:function(a,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hidden/color",function(){return t(8837)}])},8837:function(a,e,t){"use strict";t.r(e),t.d(e,{default:function(){return Q}});var n=t(1799),s=t(5893),r=t(7294);function c(){return c=Object.assign?Object.assign.bind():function(a){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(a[n]=t[n])}return a},c.apply(this,arguments)}function o(a,e){if(null==a)return{};var t,n,s={},r=Object.keys(a);for(n=0;n<r.length;n++)t=r[n],e.indexOf(t)>=0||(s[t]=a[t]);return s}var i=255,h=100,l=a=>{var{r:e,g:t,b:n,a:s}=a,r=Math.max(e,t,n),c=r-Math.min(e,t,n),o=c?r===e?(t-n)/c:r===t?2+(n-e)/c:4+(e-t)/c:0;return{h:60*(o<0?o+6:o),s:r?c/r*h:0,v:r/i*h,a:s}},u=a=>{var{h:e,s:t,v:n,a:s}=a,r=(200-t)*n/h;return{h:e,s:r>0&&r<200?t*n/h/(r<=h?r:200-r)*h:0,l:r/2,a:s}},v=(Math.PI,a=>{var e=/rgba?\(?\s*(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?[,\s]+(-?\d*\.?\d+)(%)?,?\s*[/\s]*(-?\d*\.?\d+)?(%)?\s*\)?/i.exec(a);return e?l({r:Number(e[1])/(e[2]?h/i:1),g:Number(e[3])/(e[4]?h/i:1),b:Number(e[5])/(e[6]?h/i:1),a:void 0===e[7]?1:Number(e[7])/(e[8]?h:1)}):{h:0,s:0,v:0,a:1}}),d=a=>{var e,{r:t,g:n,b:s}=a;return"#"+(e=(t<<16|n<<8|s).toString(16),new Array(7-e.length).join("0")+e)},f=a=>l(p(a)),p=a=>{var e=a.replace("#","");/^#?/.test(a)&&3===e.length&&(a="#"+e.charAt(0)+e.charAt(0)+e.charAt(1)+e.charAt(1)+e.charAt(2)+e.charAt(2));var t=new RegExp("[A-Za-z0-9]{2}","g"),[n,s,r=0,c]=a.match(t).map((a=>parseInt(a,16)));return{r:n,g:s,b:r,a:c?c/i:1}},m=a=>{var{h:e,s:t,v:n,a:s}=a,r=e/60,o=t/h,l=n/h,u=Math.floor(r)%6,v=r-Math.floor(r),d=i*l*(1-o),f=i*l*(1-o*v),p=i*l*(1-o*(1-v));l*=i;var m={};switch(u){case 0:m.r=l,m.g=p,m.b=d;break;case 1:m.r=f,m.g=l,m.b=d;break;case 2:m.r=d,m.g=l,m.b=p;break;case 3:m.r=d,m.g=f,m.b=l;break;case 4:m.r=p,m.g=d,m.b=l;break;case 5:m.r=l,m.g=d,m.b=f}return m.r=Math.round(m.r),m.g=Math.round(m.g),m.b=Math.round(m.b),c({},m,{a:s})},g=a=>d(m(a));function w(a){var e=(0,r.useRef)(a);return(0,r.useEffect)((()=>{e.current=a})),(0,r.useCallback)(((a,t)=>e.current&&e.current(a,t)),[])}var x=a=>"touches"in a,j=a=>{!x(a)&&a.preventDefault&&a.preventDefault()},b=function(a,e,t){return void 0===e&&(e=0),void 0===t&&(t=1),a>t?t:a<e?e:a},N=(a,e)=>{var t=a.getBoundingClientRect(),n=x(e)?e.touches[0]:e;return{left:b((n.pageX-(t.left+window.pageXOffset))/t.width),top:b((n.pageY-(t.top+window.pageYOffset))/t.height),width:t.width,height:t.height,x:n.pageX-(t.left+window.pageXOffset),y:n.pageY-(t.top+window.pageYOffset)}},A=["prefixCls","className","onMove","onDown"],y=r.forwardRef(((a,e)=>{var{prefixCls:t="w-color-interactive",className:n,onMove:i,onDown:h}=a,l=o(a,A),u=(0,r.useRef)(null),v=(0,r.useRef)(!1),[d,f]=(0,r.useState)(!1),p=w(i),m=w(h),g=(0,r.useCallback)((a=>{j(a),(x(a)?a.touches.length>0:a.buttons>0)&&u.current?p&&p(N(u.current,a),a):f(!1)}),[p]),b=(0,r.useCallback)((()=>f(!1)),[]),y=(0,r.useCallback)((a=>{var e=a?window.addEventListener:window.removeEventListener;e(v.current?"touchmove":"mousemove",g),e(v.current?"touchend":"mouseup",b)}),[]);(0,r.useEffect)((()=>(y(d),()=>{d&&y(!1)})),[d,y]);var C=(0,r.useCallback)((a=>{j(a.nativeEvent),(a=>!(v.current&&!x(a))&&(v.current=x(a),!0))(a.nativeEvent)&&(m&&m(N(u.current,a.nativeEvent),a.nativeEvent),f(!0))}),[m]);return(0,s.jsx)("div",c({},l,{className:[t,n||""].filter(Boolean).join(" "),style:c({},l.style,{touchAction:"none"}),ref:u,tabIndex:0,onMouseDown:C,onTouchStart:C}))}));y.displayName="Interactive";var C=y,_=a=>{var{className:e,prefixCls:t,left:n,top:c}=a,o={position:"absolute",left:n,top:c};return(0,r.useMemo)((()=>(0,s.jsx)("div",{className:t+"-pointer "+(e||""),style:o,children:(0,s.jsx)("div",{className:t+"-fill",style:{width:18,height:18,transform:n?"translate(-9px, -1px)":"translate(-1px, -9px)",boxShadow:"rgb(0 0 0 / 37%) 0px 1px 4px 0px",borderRadius:"50%",backgroundColor:"rgb(248, 248, 248)"}})})),[e,n,c,t])},k=["prefixCls","className","hsva","background","bgProps","innerProps","radius","width","height","direction","style","onChange","pointer"],E=r.forwardRef(((a,e)=>{var{prefixCls:t="w-color-alpha",className:n,hsva:i,background:h,bgProps:l={},innerProps:v={},radius:d=0,width:f,height:p=16,direction:m="horizontal",style:g,onChange:w,pointer:x}=a,j=o(a,k),b=(0,r.useCallback)((a=>{w&&w(c({},i,{a:"horizontal"===m?a.left:a.top}),a)}),[i]),N=(a=>{var{h:e,s:t,l:n,a:s}=u(a);return"hsla("+e+", "+t+"%, "+n+"%, "+s+")"})(Object.assign({},i,{a:1})),A="linear-gradient(to "+("horizontal"===m?"right":"bottom")+", rgba(244, 67, 54, 0) 0%, "+N+" 100%)",y={};return"horizontal"===m?y.left=100*i.a+"%":y.top=100*i.a+"%",(0,s.jsxs)("div",c({},j,{className:[t,t+"-"+m,n||""].filter(Boolean).join(" "),style:c({borderRadius:d,background:"url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==) left center",backgroundColor:"#fff"},g,{position:"relative"},{width:f,height:p}),ref:e,children:[(0,s.jsx)("div",c({},l,{style:c({inset:0,position:"absolute",background:h||A,borderRadius:d},l.style)})),(0,s.jsx)(C,c({},v,{style:c({},v.style,{inset:0,zIndex:1,position:"absolute"}),onMove:b,onDown:b,children:r.createElement(x||_,c({prefixCls:t},y))}))]}))}));E.displayName="Aplha";var S=E,O=["prefixCls","className","hue","onChange","direction"],P=r.forwardRef(((a,e)=>{var{prefixCls:t="w-color-hue",className:n,hue:r=0,onChange:i,direction:h="horizontal"}=a,l=o(a,O);return(0,s.jsx)(S,c({ref:e,className:t+" "+(n||"")},l,{direction:h,background:"linear-gradient(to "+("horizontal"===h?"right":"bottom")+", rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%)",hsva:{h:r,s:100,v:100,a:r/360},onChange:(a,e)=>{i&&i({h:"horizontal"===h?360*e.left:360*e.top})}}))}));P.displayName="Hue";var T=P,R=t(3452);var M=t(3375);var Z=t(1566);function z(a){return function(a){if(Array.isArray(a))return(0,R.Z)(a)}(a)||(0,M.Z)(a)||(0,Z.Z)(a)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var B=t(2898),D=t.n(B);function I(a){var e=a.color,t=a.palette,n=a.addToPalette,c=a.copy,o=void 0!==c&&c,i=(0,r.useState)(!1),h=i[0],l=i[1];return(0,s.jsx)("div",{className:h?D().swatchsel:D().swatch,style:{background:e},onClick:function(){!function(a,e,t,n,s,r){if(e)navigator.clipboard.writeText(a);else{var c=z(t);"NAC"===c[0]&&(c=[]),s?c.splice(c.indexOf(a),1):c.push(a),n(c),r((function(a){return!a}))}}(e,o,t,n,h,l)},children:e})}function Y(a){var e=a.colors,t=a.direction,n=a.copy,r=void 0!==n&&n,c=a.addToPalette,o=a.palette;return(0,s.jsx)("div",{className:"h"===t?D().hgroup:D().vgroup,children:e.map((function(a,e){return(0,s.jsx)(I,{color:a,copy:r,addToPalette:c,palette:o},"".concat(a,"-").concat(e))}))})}var G=t(2462),X=t.n(G),J=100;function Q(){var a=(0,r.useState)({h:0,s:J,v:J,a:1}),e=a[0],t=a[1],c=(0,r.useState)(["NAC"]),o=c[0],i=c[1],h=(0,r.useState)(""),l=h[0],u=h[1],d=function(a){i(a)};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{style:{padding:10}}),(0,s.jsx)(Y,{colors:o,direction:"h",copy:!0}),(0,s.jsx)("button",{onClick:function(a){i([""])},children:"CLEAR"}),(0,s.jsx)("input",{onKeyPress:function(a){"Enter"===a.key&&(a.preventDefault(),t({h:f(a.target.value).h,s:J,v:J,a:1}),console.log(a.target.value),console.log(e))}}),"\xa0 \xa0 \xa0 CONVERT: ",(0,s.jsx)("input",{onKeyPress:function(a){"Enter"===a.key&&(a.preventDefault(),a.target.value.includes("#")?u((a=>{var{r:e,g:t,b:n}=m(a);return"rgb("+e+", "+t+", "+n+")"})(f(a.target.value))):u(g(v("rgb("+a.target.value+")"))))}}),"\xa0 =\xa0 ",l,(0,s.jsx)(T,{hue:e.h,onChange:function(a){t((0,n.Z)({},e,a))}}),(0,s.jsx)("h3",{children:"Analogous"}),(0,s.jsxs)("div",{className:X().swatches,children:[q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:U({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:L({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:K({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:V({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))}))]}),(0,s.jsx)("h3",{children:"Complement"}),(0,s.jsxs)("div",{className:X().swatches,children:[q({h:F(e),s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:U({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:F(e),s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:L({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:F(e),s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:K({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:F(e),s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:V({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))}))]}),(0,s.jsx)("h3",{children:"Triadic"}),(0,s.jsxs)("div",{className:X().swatches,children:[q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:U({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:L({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:K({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:V({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))}))]}),(0,s.jsxs)("div",{className:X().swatches,children:[q({h:H(e)[0],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:U({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:H(e)[0],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:L({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:H(e)[0],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:K({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:H(e)[0],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:V({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))}))]}),(0,s.jsxs)("div",{className:X().swatches,children:[q({h:H(e)[1],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:U({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:H(e)[1],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:L({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:H(e)[1],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:K({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:H(e)[1],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:V({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))}))]}),(0,s.jsx)("h3",{children:"Tetradic"}),(0,s.jsxs)("div",{className:X().swatches,children:[q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:U({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:L({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:K({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q(e).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:V({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))}))]}),(0,s.jsxs)("div",{className:X().swatches,children:[q({h:W(e)[0],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:U({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:W(e)[0],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:L({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:W(e)[0],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:K({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:W(e)[0],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:V({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))}))]}),(0,s.jsxs)("div",{className:X().swatches,children:[q({h:W(e)[1],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:U({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:W(e)[1],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:L({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:W(e)[1],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:K({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:W(e)[1],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:V({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))}))]}),(0,s.jsxs)("div",{className:X().swatches,children:[q({h:W(e)[2],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:U({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:W(e)[2],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:L({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:W(e)[2],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:K({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))})),q({h:W(e)[2],s:J,v:J,a:1}).map((function(a,e){return(0,s.jsx)("div",{className:X().swatches,children:V({h:a,s:J,v:J,a:1},d,o)},"".concat(e,"+").concat(a))}))]})]})}function U(a,e,t){for(var n=[],r=0;r<5;r++)n[r]=g({h:a.h,s:(4-r+1)/5*100,v:a.v,a:100});return(0,s.jsx)(Y,{colors:n,addToPalette:e,palette:t})}function L(a,e,t){for(var n=[],r=0;r<5;r++)n[r]=g({h:a.h,s:a.s,v:(4-r+1)/5*100,a:100});return(0,s.jsx)(Y,{colors:n,addToPalette:e,palette:t})}function K(a,e,t){for(var n=[],r=0;r<5;r++)n[r]=g({h:a.h,s:(4-r+1)/5*100,v:(4-r+1)/5*100,a:100});return(0,s.jsx)(Y,{colors:n,addToPalette:e,palette:t})}function V(a,e,t){for(var n=[],r=0;r<5;r++)n[r]=g({h:a.h,s:(r+1)/5*100,v:(4-r+1)/5*100,a:100});return(0,s.jsx)(Y,{colors:n,addToPalette:e,palette:t})}function q(a){for(var e=[],t=0;t<5;t++){var n=a.h+(t-2)/5*100;n<0&&(n=360+n),e[t]=n}return e}function F(a){var e=a.h+180;return e<0&&(e=360+e),e}function H(a){var e,t=[];return(e=a.h+120)<0&&(e=360+e),t[0]=e,(e=e+120)<0&&(e=360+e),t[1]=e,t}function W(a){var e,t=[];return(e=a.h+90)<0&&(e=360+e),t[0]=e,(e=e+90)<0&&(e=360+e),t[1]=e,(e=e+90)<0&&(e=360+e),t[2]=e,t}},2898:function(a){a.exports={swatch:"ColorSwatch_swatch__J7xaB",swatchsel:"ColorSwatch_swatchsel__Zao9z",hgroup:"ColorSwatch_hgroup__wphy_",vgroup:"ColorSwatch_vgroup__EZaNw"}},2462:function(a){a.exports={swatches:"color_swatches__cGJnG",stick:"color_stick__qkS8j",sep:"color_sep__rjJhQ"}},3452:function(a,e,t){"use strict";function n(a,e){(null==e||e>a.length)&&(e=a.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=a[t];return n}t.d(e,{Z:function(){return n}})},3375:function(a,e,t){"use strict";function n(a){if("undefined"!==typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}t.d(e,{Z:function(){return n}})},1566:function(a,e,t){"use strict";t.d(e,{Z:function(){return s}});var n=t(3452);function s(a,e){if(a){if("string"===typeof a)return(0,n.Z)(a,e);var t=Object.prototype.toString.call(a).slice(8,-1);return"Object"===t&&a.constructor&&(t=a.constructor.name),"Map"===t||"Set"===t?Array.from(t):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?(0,n.Z)(a,e):void 0}}}},function(a){a.O(0,[774,888,179],(function(){return e=5749,a(a.s=e);var e}));var e=a.O();_N_E=e}]);