!function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=3)}([function(e,n){e.exports=require("path")},function(e,n){e.exports=require("fs")},function(e,n){e.exports=require("chokidar")},function(e,n,t){"use strict";t.r(n);var r=t(1),o=t(2),i=t(0),u=t.n(i),a=function(e,n){var t=n||[];return r.readdirSync(e).map((function(n){try{var o=e+"/"+n,i=r.statSync(o);i.isDirectory()?a(o,t):i.isFile()&&t.push(o)}catch(e){}})),t},c=(console.log.bind(console),o.watch("public/notes/*.md")),f=function(e){if("_notes.md"!==u.a.basename(e)){var n,t,o=a("public/notes"),i=["- [トップ](#index)"];o.forEach((function(e){if(".md"===u.a.extname(e)&&"_notes.md"!==u.a.basename(e)&&"index.md"!==u.a.basename(e)){console.log("base",u.a.basename(e));var n=r.readFileSync(e,"utf8").split("\n");if(n&&n.length){var t=n[0].replace(/^# (.+)/g,"$1"),o=function(e){return"#"+u.a.basename(e).replace(/(\..+)$/g,"")}(e);i.push("- ["+t+"]("+o+")")}}})),n="public/notes/_notes.md",t=i.join("\n"),r.mkdirSync(u.a.dirname(n),{recursive:!0}),r.writeFileSync(n,t)}};c.once("ready",(function(){c.on("add",(function(e){f(e)})).on("change",(function(e){f(e)})).on("unlink",(function(e){f(e)}))}))}]);