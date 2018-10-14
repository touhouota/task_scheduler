/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/touhouota/Dropbox/Program/5_master/rails/task_scheduler/app/assets/javascripts";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/reflection.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/lib/base_object.js":
/*!***********************************!*\
  !*** ./client/lib/base_object.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar Base = {\n  finish_status: [2, 3],\n\n  // Safari用、フォーム情報をオブジェクトに直す\n  form_element_to_object: function form_element_to_object(form) {\n    var inputs = form.querySelectorAll('input, select, textarea');\n    var array = [].slice.call(inputs);\n    var array_length = array.length;\n    var formdata = {};\n    for (var i = 0; i < array_length; i++) {\n      formdata[array[i].name] = array[i].value;\n    }\n\n    return formdata;\n  },\n\n  createFormData: function createFormData(formElement) {\n    var formData = void 0;\n    if (formElement) {\n      formData = new FormData(formElement);\n    } else {\n      formData = new FormData();\n    }\n\n    formData.append('user_id', Base.get_cookie('user_id'));\n    return formData;\n  },\n\n  // subディレクトリで動かすので、pathに関してsubディレクトリを返す\n  get_path: function get_path() {\n    var path = location.pathname.split('/');\n    while (path.length > 3) {\n      path.pop();\n    }\n\n    return path.join('/');\n  },\n\n  get_token: function get_token() {\n    return document.querySelector('[name=csrf-token]').content;\n  },\n\n  // クッキーをオブジェクトに直すもの\n  get_cookie: function get_cookie(property) {\n    var result = {};\n    var all = document.cookie;\n    if (all.length !== 0) {\n      var cookies = all.split(';');\n      var length = cookies.length;\n      for (var i = 0; i < length; i++) {\n        var cookie = cookies[i].split('=');\n        // console.log(cookie);\n        if (cookie[1].length !== 0) {\n          result[cookie[0].trim()] = cookie[1];\n        } else {\n          result[cookie[0].trim()] = null;\n        }\n      }\n    }\n\n    if (property) {\n      // 引数があるとき\n      if (result[property]) {\n        // cookieの中に引数のものがあれば返す\n        return result[property];\n      }\n      // なければnull\n      return null;\n    }\n    // 引数がない時は、cookieのobjectを返す\n    return result;\n  },\n\n  parents: function parents(dom, selector) {\n    var parent = [];\n    var target = dom;\n    if (dom.classList.contains(selector)) return dom;\n    while (target.parentElement) {\n      target = target.parentElement;\n      // console.log(target);\n      if (target.classList.contains(selector)) {\n        return target;\n      }\n      parent.push(target);\n    }\n    return parent;\n  },\n\n  // ///////////////////////////\n  // 指定した要素の祖先要素を返す関数\n  // クラス名を指定した場合、あればその要素を返す\n  // なければ、祖先要素を含んだ配列を返す\n  // ///////////////////////////\n\n  // 特定のあたい(num)を少数第at位で四捨五入する\n  round_at: function round_at(num, at) {\n    var powNum = Math.pow(10, Number(at));\n    var inputNum = Number(num);\n    return Math.round(inputNum * powNum) / powNum;\n  },\n\n  format_ymd: function format_ymd(date) {\n    var year = date.getFullYear();\n    // 3月 => 003となる中で、末尾から２文字をmonthとする\n    var month = ('00' + (date.getMonth() + 1)).slice(-2);\n    var day = ('00' + date.getDate()).slice(-2);\n\n    return [year, month, day].join('-');\n  },\n\n  format_hms: function format_hms(date) {\n    return (\n      // toTimeString: 14:39:07 GMT-0600 (PDT)という形式\n      date.toTimeString().split(' ').shift()\n    );\n  }\n\n};\n\nexports.default = Base;\n\n//# sourceURL=webpack:///./client/lib/base_object.js?");

/***/ }),

/***/ "./client/lib/buttons_events.js":
/*!**************************************!*\
  !*** ./client/lib/buttons_events.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _modal_process = __webpack_require__(/*! ./modal_process */ \"./client/lib/modal_process.jsx\");\n\nvar _modal_process2 = _interopRequireDefault(_modal_process);\n\nvar _base_object = __webpack_require__(/*! ./base_object */ \"./client/lib/base_object.js\");\n\nvar _base_object2 = _interopRequireDefault(_base_object);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Buttons = {\n  appendTask: function appendTask() {\n    _modal_process2.default.showModal();\n  },\n\n  members: function members() {\n    console.log('members_status');\n    _modal_process2.default.init();\n    var membersTask = document.querySelector('.members_status');\n    membersTask.classList.remove('hide');\n    _modal_process2.default.getModalBack().addEventListener('click', function () {\n      membersTask.classList.add('hide');\n    });\n  },\n\n  reflection: function reflection() {\n    var path = _base_object2.default.get_path();\n    var userId = _base_object2.default.get_cookie('user_id');\n    window.location.href = path + '/reflection/individual/' + userId;\n  },\n\n  github: function github() {\n    var URL = 'https://github.com/touhouota/task_scheduler/issues';\n    window.open(URL, '_blank');\n  },\n\n  logout: function logout() {\n    // cookieの削除\n    var userId = _base_object2.default.get_cookie('user_id');\n    var expires = new Date();\n    expires.setFullYear(expires.getFullYear() - 2);\n    var cookieString = ['user_id=' + userId, 'path=' + _base_object2.default.get_path(), 'expires=' + expires.toUTCString()];\n    document.cookie = cookieString.join(';');\n    var path = _base_object2.default.get_path();\n    window.location.href = '' + path;\n  },\n\n  taskList: function taskList() {\n    var path = _base_object2.default.get_path();\n    var userId = _base_object2.default.get_cookie('user_id');\n    window.location.href = path + '/structure/main/' + userId;\n  }\n};\n\nexports.default = Buttons;\n\n//# sourceURL=webpack:///./client/lib/buttons_events.js?");

/***/ }),

/***/ "./client/lib/graph.js":
/*!*****************************!*\
  !*** ./client/lib/graph.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _base_object = __webpack_require__(/*! ./base_object */ \"./client/lib/base_object.js\");\n\nvar _base_object2 = _interopRequireDefault(_base_object);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Graph = {\n  // canvasのdomを保持\n  canvas: null,\n  // canvasの描画関連を司るcontextを保持\n  context: null,\n  // グラフを描画するための値を保持\n  values: {},\n  init: function init(canvasId) {\n    Graph.canvas = document.getElementById(canvasId);\n    Graph.context = Graph.canvas.getContext('2d');\n    Graph.setInitialCanvasSize();\n    // Graph.test();\n  },\n  // 画面剤ずに合わせて、Canvasの大きさを初期化する\n  setInitialCanvasSize: function setInitialCanvasSize() {\n    var canvas = Graph.canvas;\n    var width = canvas.clientWidth;\n    var height = canvas.clientHeight;\n    canvas.setAttribute('width', width.toString());\n    canvas.setAttribute('height', height.toString());\n  },\n  // 描画するための値をセットする\n  setValue: function setValue(hash) {\n    Graph.values = hash;\n  },\n  // グラフを描画\n  draw: function draw(labelList) {\n    var canvas = Graph.canvas;\n    var ctx = Graph.context;\n    // canvasの大きさ\n    var width = canvas.width;\n    var height = canvas.height;\n\n    // 要素1つあたりの横幅スケールを指定\n    var widthScale = Graph.__getScale();\n    // グラフの高さのスケール\n    var heigthScale = 0.9;\n\n    // 描画する要素を取得\n    var values = Graph.values;\n    // 要素数を保持\n    var valuesNum = Object.values(values).length;\n\n    // グラフの色幅\n    var colorRange = 360 / valuesNum;\n\n    // グラフの縦幅を指定\n    var barHeight = height * heigthScale;\n    // グラフ描画の初期の高さ(グラフの高さの残りを上下に分けるため2で割る)\n    var barStartHeight = height * _base_object2.default.round_at(1 - heigthScale, 1) / 2;\n    // グラフの横幅を保持(描画の一時変数)\n\n    var barWidth = 0;\n\n    labelList.forEach(function (label, index) {\n      ctx.fillStyle = 'hsl(' + colorRange * index + ', 100%, 60%)';\n      ctx.fillRect(barWidth, barStartHeight, values[label] * widthScale, barHeight);\n      barWidth += values[label] * widthScale;\n    });\n    // console.table({\n    //   width,\n    //   height,\n    //   widthScale,\n    //   heigthScale,\n    //   values,\n    //   valuesNum,\n    //   colorRange,\n    //   barHeight,\n    //   barStartHeight,\n    // });\n  },\n  test: function test() {\n    console.log('Hello Graph');\n    console.log(Graph.canvas);\n    console.log(Graph.context);\n    Graph.context.moveTo(10, 10);\n    Graph.context.lineTo(90, 90);\n    Graph.context.stroke();\n    Graph.setValue({\n      a: 10,\n      b: 20\n    });\n    console.log(Graph.__getScale());\n    Graph.draw();\n  },\n  // 以下、内部だけで使う関数たち\n  __getScale: function __getScale() {\n    var values = Object.values(Graph.values);\n    var sum = 0;\n    values.forEach(function (num) {\n      sum += num;\n    });\n    return Graph.canvas.width / sum;\n  }\n};\n\nexports.default = Graph;\n\n//# sourceURL=webpack:///./client/lib/graph.js?");

/***/ }),

/***/ "./client/lib/modal_process.jsx":
/*!**************************************!*\
  !*** ./client/lib/modal_process.jsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _base_object = __webpack_require__(/*! ./base_object */ \"./client/lib/base_object.js\");\n\nvar _base_object2 = _interopRequireDefault(_base_object);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ModalProcess = {\n  init: function init() {\n    var background = document.createElement('div');\n    background.addEventListener('click', ModalProcess.closeModal);\n    background.classList.add('modal_back');\n    document.body.appendChild(background);\n  },\n\n  backgroundClose: function backgroundClose() {\n    var modalBack = document.querySelector('.modal_back');\n    document.body.removeChild(modalBack);\n  },\n\n  closeModal: function closeModal() {\n    ModalProcess.backgroundClose();\n    // modalを非表示\n    document.getElementById('modal_area').classList.add('hide');\n    document.querySelector('.modal').reset();\n  },\n\n  showModal: function showModal() {\n    ModalProcess.init();\n    // modalを表示\n    document.getElementById('modal_area').classList.remove('hide');\n  },\n\n  getModalBack: function getModalBack() {\n    return document.querySelector('.modal_back');\n  },\n\n  getModalData: function getModalData(formElement) {\n    var formdata = new FormData(formElement);\n    formdata.append('user_id', _base_object2.default.get_cookie('user_id'));\n    formdata.append('authenticity_token', _base_object2.default.get_token());\n    return formdata;\n  },\n\n  isModalOpen: function isModalOpen() {\n    return Boolean(ModalProcess.getModalBack());\n  }\n\n};\n\nexports.default = ModalProcess;\n\n//# sourceURL=webpack:///./client/lib/modal_process.jsx?");

/***/ }),

/***/ "./client/lib/reflection_page.js":
/*!***************************************!*\
  !*** ./client/lib/reflection_page.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _graph = __webpack_require__(/*! ./graph */ \"./client/lib/graph.js\");\n\nvar _graph2 = _interopRequireDefault(_graph);\n\nvar _base_object = __webpack_require__(/*! ./base_object */ \"./client/lib/base_object.js\");\n\nvar _base_object2 = _interopRequireDefault(_base_object);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar ReflectionPage = {\n  // ページを描画する\n  drawPage: function drawPage(canvasId) {\n    // グラフの初期化\n    ReflectionPage.__init(canvasId);\n    ReflectionPage.__getGraphData();\n  },\n  // ページの再描画\n  redraw: function redraw() {\n    console.log('redraw');\n    if (!_graph2.default.values) {\n      ReflectionPage.__getGraphData();\n    }\n    ReflectionPage.__drawGraph();\n  },\n  // Canvasの初期化\n  __init: function __init(canvasId) {\n    _graph2.default.init(canvasId);\n  },\n  // サーバからデータを取得\n  __getGraphData: function __getGraphData() {\n    var userId = _base_object2.default.get_cookie('user_id');\n    var path = _base_object2.default.get_path() + '/api/individual/' + userId;\n    fetch(path).then(function (response) {\n      return response.json();\n    }).then(function (json) {\n      // グラフ表示\n      ReflectionPage.__drawGraph(json.task_info);\n      // グラフのラベルごとの割合を計算・表示\n      ReflectionPage.__setLabelValue(json.task_info);\n      // タスクの達成率を計算・表示\n      ReflectionPage.__setAchiveRate(json.achieve);\n      // 総作業時間を計算・表示\n      ReflectionPage.__setTotalActualTime(json.actual_secs);\n    });\n  },\n  __drawGraph: function __drawGraph(tasks) {\n    _graph2.default.setValue(tasks);\n    var labelList = ['survay', 'develop', 'experiment', 'write'];\n    _graph2.default.draw(labelList);\n  },\n  __setLabelValue: function __setLabelValue(labels) {\n    var maxNum = 0;\n    Object.values(labels).forEach(function (item) {\n      maxNum += item;\n    });\n    var labelList = ['survay', 'develop', 'experiment', 'write'];\n    labelList.forEach(function (label) {\n      var rate = _base_object2.default.round_at(labels[label] / maxNum * 100, 1);\n      console.log(rate);\n      if (Number.isNaN(rate)) {\n        rate = 0;\n      }\n      var target = document.getElementById(label);\n      target.querySelector('.value').textContent = rate;\n    });\n  },\n  __setAchiveRate: function __setAchiveRate(achieve) {\n    var maxNum = 0;\n    Object.values(achieve).forEach(function (num) {\n      maxNum += num;\n    });\n    var rate = _base_object2.default.round_at(achieve[2] / maxNum * 100, 1);\n    var target = document.getElementById('achieve');\n    target.querySelector('.value').textContent = rate;\n  },\n  __setTotalActualTime: function __setTotalActualTime(sec) {\n    var min = Math.round(sec / 60);\n    var hour = Math.round(min / 60);\n    min -= hour * 60;\n    var day = Math.round(hour / 24);\n    hour -= day * 24;\n\n    var displayString = min + '\\u5206';\n    if (hour > 0) {\n      displayString = hour + '\\u6642\\u9593 ' + displayString;\n    }\n    if (day > 0) {\n      displayString = day + '\\u65E5 ' + displayString;\n    }\n\n    var target = document.getElementById('work_time');\n    target.querySelector('.value').textContent = displayString;\n  }\n};\n\nexports.default = ReflectionPage;\n\n//# sourceURL=webpack:///./client/lib/reflection_page.js?");

/***/ }),

/***/ "./client/reflection.jsx":
/*!*******************************!*\
  !*** ./client/reflection.jsx ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _reflection_page = __webpack_require__(/*! ./lib/reflection_page */ \"./client/lib/reflection_page.js\");\n\nvar _reflection_page2 = _interopRequireDefault(_reflection_page);\n\nvar _buttons_events = __webpack_require__(/*! ./lib/buttons_events */ \"./client/lib/buttons_events.js\");\n\nvar _buttons_events2 = _interopRequireDefault(_buttons_events);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar resizeTimer = void 0;\n\nwindow.onload = function () {\n  // グラフ描画処理\n  _reflection_page2.default.drawPage('graph');\n\n  // 画面サイズ変更イベント\n  resizeTimer = 0;\n  window.addEventListener('resize', function () {\n    if (resizeTimer > 0) {\n      clearTimeout(resizeTimer);\n    }\n\n    resizeTimer = setTimeout(function () {\n      _reflection_page2.default.redraw();\n    });\n  });\n\n  // 画面上部のボタンに対する処理\n  document.getElementById('task_list').addEventListener('click', _buttons_events2.default.taskList);\n  document.getElementById('github').addEventListener('click', _buttons_events2.default.github);\n  document.getElementById('logout').addEventListener('click', _buttons_events2.default.logout);\n};\n\n//# sourceURL=webpack:///./client/reflection.jsx?");

/***/ })

/******/ });