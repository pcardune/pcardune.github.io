(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[3],{83:function(n,t,r){"use strict";(function(n){r.d(t,"n",(function(){return v})),r.d(t,"o",(function(){return y})),r.d(t,"a",(function(){return I})),r.d(t,"b",(function(){return T})),r.d(t,"j",(function(){return A})),r.d(t,"c",(function(){return P})),r.d(t,"l",(function(){return q})),r.d(t,"e",(function(){return M})),r.d(t,"f",(function(){return C})),r.d(t,"i",(function(){return J})),r.d(t,"d",(function(){return U})),r.d(t,"h",(function(){return W})),r.d(t,"g",(function(){return z})),r.d(t,"m",(function(){return B})),r.d(t,"k",(function(){return V}));var e=r(10),u=r(11),i=r(84),o=new Array(32).fill(void 0);function c(n){return o[n]}o.push(void 0,null,!0,!1);var f=o.length;function a(n){var t=c(n);return function(n){n<36||(o[n]=f,f=n)}(n),t}var d=new("undefined"===typeof TextDecoder?(0,n.require)("util").TextDecoder:TextDecoder)("utf-8",{ignoreBOM:!0,fatal:!0});d.decode();var l=null;function _(){return null!==l&&l.buffer===i.j.buffer||(l=new Uint8Array(i.j.buffer)),l}function s(n,t){return d.decode(_().subarray(n,n+t))}function b(n){f===o.length&&o.push(o.length+1);var t=f;return f=o[t],o[t]=n,t}function v(){i.h()}function y(){i.i()}var p=0,h=new("undefined"===typeof TextEncoder?(0,n.require)("util").TextEncoder:TextEncoder)("utf-8"),w="function"===typeof h.encodeInto?function(n,t){return h.encodeInto(n,t)}:function(n,t){var r=h.encode(n);return t.set(r),{read:n.length,written:r.length}};function g(n,t,r){if(void 0===r){var e=h.encode(n),u=t(e.length);return _().subarray(u,u+e.length).set(e),p=e.length,u}for(var i=n.length,o=t(i),c=_(),f=0;f<i;f++){var a=n.charCodeAt(f);if(a>127)break;c[o+f]=a}if(f!==i){0!==f&&(n=n.slice(f)),o=r(o,i,i=f+3*n.length);var d=_().subarray(o+f,o+i);f+=w(n,d).written}return p=f,o}var k=null;function j(){return null!==k&&k.buffer===i.j.buffer||(k=new Int32Array(i.j.buffer)),k}var m=32;function O(n){if(1==m)throw new Error("out of js stack");return o[--m]=n,m}function x(n){return function(){try{return n.apply(this,arguments)}catch(t){i.d(b(t))}}}var D=null;function E(n,t){return(null!==D&&D.buffer===i.j.buffer||(D=new Uint8ClampedArray(i.j.buffer)),D).subarray(n/1,n/1+t)}var I=function(){function n(){Object(e.a)(this,n)}return Object(u.a)(n,[{key:"__destroy_into_raw",value:function(){var n=this.ptr;return this.ptr=0,n}},{key:"free",value:function(){var n=this.__destroy_into_raw();i.a(n)}},{key:"load_asm_program",value:function(n){var t=g(n,i.f,i.g),r=p;return a(i.l(this.ptr,t,r))}},{key:"load_program",value:function(n){var t=g(n,i.f,i.g),r=p;return a(i.m(this.ptr,t,r))}},{key:"tick",value:function(n){i.q(this.ptr,n)}},{key:"reset",value:function(){i.o(this.ptr)}},{key:"set_keyboard",value:function(n){i.p(this.ptr,n)}},{key:"draw_screen",value:function(n){try{i.k(this.ptr,O(n))}finally{o[m++]=void 0}}}],[{key:"__wrap",value:function(t){var r=Object.create(n.prototype);return r.ptr=t,r}},{key:"new",value:function(){var t=i.n();return n.__wrap(t)}}]),n}(),T=function(){function n(){Object(e.a)(this,n)}return Object(u.a)(n,[{key:"__destroy_into_raw",value:function(){var n=this.ptr;return this.ptr=0,n}},{key:"free",value:function(){var n=this.__destroy_into_raw();i.b(n)}},{key:"load_file",value:function(n,t){var r=g(n,i.f,i.g),e=p,u=g(t,i.f,i.g),o=p;i.u(this.ptr,r,e,u,o)}},{key:"init",value:function(){i.t(this.ptr)}},{key:"tick",value:function(n){i.y(this.ptr,n)}},{key:"set_keyboard",value:function(n){i.x(this.ptr,n)}},{key:"get_ram",value:function(n){try{var t=i.c(-16);i.s(t,this.ptr,n);var r=j()[t/4+0],e=j()[t/4+1];return 0===r?void 0:e}finally{i.c(16)}}},{key:"reset",value:function(){i.w(this.ptr)}},{key:"draw_screen",value:function(n){try{i.r(this.ptr,O(n))}finally{o[m++]=void 0}}}],[{key:"__wrap",value:function(t){var r=Object.create(n.prototype);return r.ptr=t,r}},{key:"new",value:function(){var t=i.v();return n.__wrap(t)}}]),n}(),A=function(n){a(n)},P=function(n,t){alert(s(n,t))},q=function(n,t){return b(s(n,t))},M=function(n,t){console.log(s(n,t))},C=function(){return b(new Error)},J=function(n,t){var r=g(c(t).stack,i.f,i.g),e=p;j()[n/4+1]=e,j()[n/4+0]=r},U=function(n,t){try{console.error(s(n,t))}finally{i.e(n,t)}},W=x((function(n,t,r,e){c(n).putImageData(c(t),r,e)})),z=x((function(n,t,r,e){return b(new ImageData(E(n,t),r>>>0,e>>>0))})),B=function(n,t){throw new Error(s(n,t))},V=function(n){throw a(n)}}).call(this,r(85)(n))},84:function(n,t,r){"use strict";var e=r.w[n.i];n.exports=e;r(83);e.z()},85:function(n,t){n.exports=function(n){if(!n.webpackPolyfill){var t=Object.create(n);t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),Object.defineProperty(t,"exports",{enumerable:!0}),t.webpackPolyfill=1}return t}},86:function(n,t,r){"use strict";r.r(t);var e=r(83);r.d(t,"greet",(function(){return e.n})),r.d(t,"init_panic_hook",(function(){return e.o})),r.d(t,"WebMachine",(function(){return e.a})),r.d(t,"WebVM",(function(){return e.b})),r.d(t,"__wbindgen_object_drop_ref",(function(){return e.j})),r.d(t,"__wbg_alert_0c025e151bffda84",(function(){return e.c})),r.d(t,"__wbindgen_string_new",(function(){return e.l})),r.d(t,"__wbg_log_4ebb392c34b0451d",(function(){return e.e})),r.d(t,"__wbg_new_59cb74e423758ede",(function(){return e.f})),r.d(t,"__wbg_stack_558ba5917b466edd",(function(){return e.i})),r.d(t,"__wbg_error_4bb6c2a97407129a",(function(){return e.d})),r.d(t,"__wbg_putImageData_a0ab6f94c11984ac",(function(){return e.h})),r.d(t,"__wbg_newwithu8clampedarrayandsh_daf4b2743e8c858d",(function(){return e.g})),r.d(t,"__wbindgen_throw",(function(){return e.m})),r.d(t,"__wbindgen_rethrow",(function(){return e.k}))}}]);
//# sourceMappingURL=3.301dcf18.chunk.js.map