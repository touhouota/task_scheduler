!function(n){var o={};function a(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}a.m=n,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)a.d(n,o,function(e){return t[e]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/Users/touhouota/Dropbox/Program/5_master/rails/task_scheduler/app/assets/javascripts",a(a.s=22)}({1:function(e,t,n){"use strict";var o={finish_status:[2,3],form_element_to_object:function(e){for(var t=e.querySelectorAll("input, select, textarea"),n=[].slice.call(t),o=n.length,a={},r=0;r<o;r++)a[n[r].name]=n[r].value;return a},createFormData:function(e){var t;return(t=e?new FormData(e):new FormData).append("user_id",o.get_cookie("user_id")),t},get_path:function(){for(var e=location.pathname.split("/");3<e.length;)e.pop();return e.join("/")},get_token:function(){return document.querySelector("[name=csrf-token]").content},get_cookie:function(e){var t={},n=document.cookie;if(0!==n.length)for(var o=n.split(";"),a=o.length,r=0;r<a;r++){var c=o[r].split("=");0!==c[1].length?t[c[0].trim()]=c[1]:t[c[0].trim()]=null}return e?t[e]?t[e]:null:t},parents:function(e,t){var n=[],o=e;if(e.classList.contains(t))return e;for(;o.parentElement;){if((o=o.parentElement).classList.contains(t))return o;n.push(o)}return n},round_at:function(e,t){var n=Math.pow(10,Number(t)),o=Number(e);return Math.round(o*n)/n},format_ymd:function(e){return[e.getFullYear(),"00".concat(e.getMonth()+1).slice(-2),"00".concat(e.getDate()).slice(-2)].join("-")},format_hms:function(e){return e.toTimeString().split(" ").shift()}};t.a=o},22:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n(5),i=function(e){var t=new FormData;t.append("user_id",r.a.get_cookie("user_id")),t.append("box_name",e.target.name);var n="".concat(r.a.get_path(),"/api/checklist/update");fetch(n,{method:"POST",headers:{Accept:"application/json","X-CSRF-Token":r.a.get_token()},credentials:"same-origin",body:t})};window.onload=function(){var e,t;document.getElementById("task_list").addEventListener("click",c.a.taskList),document.getElementById("week_reflection").addEventListener("click",c.a.reflection),document.getElementById("github").addEventListener("click",c.a.github),document.getElementById("logout").addEventListener("click",c.a.logout),e=r.a.get_cookie("user_id"),t="".concat(r.a.get_path(),"/api/checklist/confirm/").concat(e),fetch(t).then(function(e){return e.json()}).then(function(e){e.forEach(function(e){document.querySelector("input[name=".concat(e.box_name,"]")).checked=!0})});for(var n=document.querySelectorAll("input[type=checkbox]"),o=0,a=n.length;o<a;o+=1)n[o].addEventListener("click",i)}},3:function(e,t,n){"use strict";var o=n(1),a={init:function(){var e=document.createElement("div");e.addEventListener("click",a.closeModal),e.classList.add("modal_back"),document.body.appendChild(e)},backgroundClose:function(){var e=document.querySelector(".modal_back");document.body.removeChild(e)},closeModal:function(){a.backgroundClose(),document.getElementById("modal_area").classList.add("hide"),document.querySelector(".modal").reset()},showModal:function(){a.init(),document.getElementById("modal_area").classList.remove("hide")},getModalBack:function(){return document.querySelector(".modal_back")},getModalData:function(e){var t=new FormData(e);return t.append("user_id",o.a.get_cookie("user_id")),t.append("authenticity_token",o.a.get_token()),t},isModalOpen:function(){return Boolean(a.getModalBack())}};t.a=a},5:function(e,t,n){"use strict";var o=n(3),a=n(1),r={appendTask:function(){o.a.showModal()},members:function(){o.a.init();var e=document.querySelector(".members_status");e.classList.remove("hide"),o.a.getModalBack().addEventListener("click",function(){e.classList.add("hide")})},reflection:function(){var e=a.a.get_path(),t=a.a.get_cookie("user_id");window.location.href="".concat(e,"/reflection/individual/").concat(t)},checklist:function(){var e=a.a.get_path(),t=a.a.get_cookie("user_id");window.location.href="".concat(e,"/report/list/").concat(t)},github:function(){window.open("https://github.com/touhouota/task_scheduler/issues","_blank")},logout:function(){var e=a.a.get_cookie("user_id"),t=new Date;t.setFullYear(t.getFullYear()-2);var n=["user_id=".concat(e),"path=".concat(a.a.get_path()),"expires=".concat(t.toUTCString())];document.cookie=n.join(";");var o=a.a.get_path();window.location.href="".concat(o)},taskList:function(){var e=a.a.get_path(),t=a.a.get_cookie("user_id");window.location.href="".concat(e,"/structure/main/").concat(t)}};t.a=r}});