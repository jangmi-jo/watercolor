/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/lib/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _path_generator = __webpack_require__(1);
	
	var _path_generator2 = _interopRequireDefault(_path_generator);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener('DOMContentLoaded', function () {
	  var pathGenerator = new _path_generator2.default();
	  // let canvas = document.getElementById('canvas');
	  // let click = new MouseEvent('click', {clientX: 500, clientY: 500});
	  // canvas.dispatchEvent(click);
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _breadth_first = __webpack_require__(3);
	
	var _breadth_first2 = _interopRequireDefault(_breadth_first);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var PathGenerator = function () {
	  function PathGenerator() {
	    var _this = this;
	
	    _classCallCheck(this, PathGenerator);
	
	    this.canvas = document.getElementById('canvas');
	    this.ctx = this.canvas.getContext("2d");
	    this.width = this.canvas.width;
	    this.height = this.canvas.height;
	    this.color = [0, 0, 0];
	    this.paths = [];
	    this.cells = {};
	    this.lineSegments = [];
	    this.mode = "water";
	    this.night = false;
	    this.clear = this.clear.bind(this);
	
	    var colorInput = document.getElementById('color');
	    colorInput.addEventListener('change', function (e) {
	      _this.color = e.target.style.backgroundColor.match(/\d+/g).map(function (n) {
	        return parseInt(n);
	      });
	    });
	
	    this.sizeInput = document.getElementById('size');
	    this.size = parseInt(this.sizeInput.value);
	    this.sizeInput.addEventListener('change', function (e) {
	      _this.size = parseInt(e.target.value);
	    });
	
	    var images = document.querySelectorAll('.options > *');
	    images.forEach(function (i) {
	      i.addEventListener('click', _this.changeBackGround.bind(_this));
	    });
	
	    var clearButton = document.getElementById('clear');
	    clearButton.addEventListener('click', this.clear);
	
	    var modeChangeButton = document.getElementById('mode_img');
	    modeChangeButton.addEventListener('click', this.modeChange.bind(this));
	
	    this.canvas.addEventListener('click', this.clickHandler.bind(this));
	    this.canvas.addEventListener('mousemove', this.dragHandler.bind(this));
	    this.canvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
	  }
	
	  _createClass(PathGenerator, [{
	    key: 'changeBackGround',
	    value: function changeBackGround(e) {
	      if (this.night && e.target.id !== "night" && window.confirm("Are you sure? To shift day mode, it will clear current canvas.")) {
	        this.night = false;
	        this.clear();
	      }
	      if (e.target.id === "default") {
	        this.canvas.setAttribute('style', 'background-image: none; background-color: white');
	      } else if (e.target.id === "night") {
	        if (!this.night && window.confirm("Are you sure? To shift night mode, it will clear current canvas.")) {
	          this.night = true;
	          this.canvas.setAttribute('style', 'background-image: none; background-color: black');
	          this.clear();
	        }
	      } else {
	        this.canvas.setAttribute('style', 'background-image: url(' + e.target.src + ')');
	      }
	    }
	  }, {
	    key: 'modeChange',
	    value: function modeChange(e) {
	      if (this.mode === 'water') {
	        this.mode = 'brush';
	        e.target.src = "http://res.cloudinary.com/wkdal720/image/upload/v1473786825/brush_hmunvb.png";
	        this.sizeInput.min = '2';
	        this.sizeInput.max = '10';
	        this.sizeInput.setAttribute('value', '5');
	        this.size = 5;
	      } else {
	        this.mode = 'water';
	        e.target.src = "http://res.cloudinary.com/wkdal720/image/upload/v1473786828/water_qnvczd.png";
	        this.sizeInput.min = '100';
	        this.sizeInput.max = '1000';
	        this.sizeInput.setAttribute('value', '300');
	        this.size = 300;
	      }
	    }
	  }, {
	    key: 'mouseUpHandler',
	    value: function mouseUpHandler(e) {
	      var _this2 = this;
	
	      if (this.mode === 'brush' && this.lineSegments.length > 1) {
	        this.ctx.lineCap = "round";
	        this.ctx.lineJoin = "round";
	        this.ctx.lineWidth = this.size;
	        this.ctx.strokeStyle = 'rgb(' + this.color.map(function (n) {
	          return parseInt(n);
	        }).join(", ") + ')';
	        this.ctx.beginPath();
	        this.ctx.moveTo(this.lineSegments[0][0], this.lineSegments[0][1]);
	        this.lineSegments.slice(1).forEach(function (l) {
	          _this2.ctx.lineTo(l[0], l[1]);
	        });
	        this.ctx.stroke();
	        this.lineSegments = [];
	      }
	    }
	  }, {
	    key: 'indexHelper',
	    value: function indexHelper(x, y) {
	      return parseInt(x) + parseInt(y) * this.width;
	    }
	  }, {
	    key: 'clickHandler',
	    value: function clickHandler(e) {
	      if (this.mode === 'water') {
	        var sIdx = this.indexHelper(e.offsetX, e.offsetY);
	        var breadthFirst = new _breadth_first2.default({
	          color: this.color,
	          width: this.width,
	          height: this.height,
	          startIdx: sIdx,
	          size: this.size,
	          cells: this.cells,
	          night: this.night,
	          ctx: this.ctx });
	        this.paths.push(breadthFirst);
	      } else {
	        this.ctx.fillStyle = 'rgb(' + this.color.map(function (n) {
	          return parseInt(n);
	        }).join(", ") + ')';
	        this.ctx.fillRect(e.offsetX, e.offsetY, this.size, this.size);
	        this.lineSegments = [];
	      }
	    }
	  }, {
	    key: 'dragHandler',
	    value: function dragHandler(e) {
	      if (e.button === 0 && e.buttons === 1) {
	        if (this.mode === 'water') {
	          var sIdx = this.indexHelper(e.offsetX, e.offsetY);
	          var breadthFirst = new _breadth_first2.default({
	            color: this.color,
	            width: this.width,
	            height: this.height,
	            startIdx: sIdx,
	            size: this.size,
	            cells: this.cells,
	            night: this.night,
	            ctx: this.ctx });
	          this.paths.push(breadthFirst);
	        } else {
	          this.lineSegments.push([e.offsetX, e.offsetY]);
	          this.ctx.fillStyle = 'rgb(' + this.color.map(function (n) {
	            return parseInt(n);
	          }).join(", ") + ')';
	          this.ctx.fillRect(e.offsetX, e.offsetY, 1, 1);
	        }
	      }
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      this.paths.forEach(function (p) {
	        return p.clearInterval();
	      });
	      this.cells = {};
	      this.paths = [];
	      this.lineSegments = [];
	    }
	  }]);
	
	  return PathGenerator;
	}();
	
	exports.default = PathGenerator;

/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BreadthFirst = function () {
	  function BreadthFirst(data) {
	    var _this = this;
	
	    _classCallCheck(this, BreadthFirst);
	
	    this.ctx = data.ctx;
	    this.width = data.width;
	    this.height = data.height;
	    this.cells = data.cells;
	    this.size = data.size;
	    this.color = data.color;
	    this.startIdx = data.startIdx;
	    this.night = data.night;
	
	    this.dist = 0;
	    this.segments = [];
	    this.colorGap = this.color.map(function (c) {
	      return _this.colorGapGenerator(c);
	    });
	    this.onePixelProcess = this.onePixelProcess.bind(this);
	
	    if (!this.cells[this.startIdx]) {
	      this.fillCell(this.startIdx);
	    }
	    this.segmentNeighbors(this.startIdx);
	
	    this.interval = window.setInterval(this.onePixelProcess, 10);
	    this.clearInterval = this.clearInterval.bind(this);
	  }
	
	  _createClass(BreadthFirst, [{
	    key: "clearInterval",
	    value: function clearInterval() {
	      window.clearInterval(this.interval);
	    }
	  }, {
	    key: "colorGapGenerator",
	    value: function colorGapGenerator(c) {
	      return this.night ? c / this.size : (255 - c) / this.size;
	    }
	  }, {
	    key: "onePixelProcess",
	    value: function onePixelProcess() {
	      var _this2 = this;
	
	      if (this.segments.length === 0) {
	        this.clearInterval();
	      }
	      var randomSeg = this.popRandomSegment();
	      this.fillCell(randomSeg);
	      this.segmentNeighbors(randomSeg);
	      this.color = this.color.map(function (c, i) {
	        return _this2.night ? c - _this2.colorGap[i] : c + _this2.colorGap[i];
	      });
	    }
	  }, {
	    key: "segmentNeighbors",
	    value: function segmentNeighbors(idx) {
	      var _this3 = this;
	
	      var neighbors = [idx - this.width, idx + this.width, idx - 1, idx + 1];
	      neighbors = neighbors.filter(function (i) {
	        return i >= 0 && i < _this3.width * _this3.height && _this3.isInline(idx) && _this3.isOpen(i);
	      });
	      neighbors.forEach(function (n) {
	        return _this3.segments.push(n);
	      });
	    }
	  }, {
	    key: "isInline",
	    value: function isInline(idx) {
	      return idx % this.width !== 0 && idx % this.width !== this.width - 1;
	    }
	  }, {
	    key: "isOpen",
	    value: function isOpen(idx) {
	      return !this.cells[idx] && !this.segments.includes(idx);
	    }
	  }, {
	    key: "popRandomSegment",
	    value: function popRandomSegment() {
	      var idx = Math.floor(Math.random() * this.segments.length);
	      return this.segments.splice(idx, 1)[0];
	    }
	  }, {
	    key: "fillCell",
	    value: function fillCell(idx) {
	      this.dist += 1;
	      this.cells[idx] = true;
	      this.ctx.fillStyle = "rgb(" + this.color.map(function (n) {
	        return parseInt(n);
	      }).join(", ") + ")";
	      var x = idx % this.width,
	          y = parseInt(idx / this.width);
	      this.ctx.fillRect(x, y, 1, 1);
	      if (this.dist === this.size) {
	        this.clearInterval();
	      }
	    }
	  }]);
	
	  return BreadthFirst;
	}();
	
	exports.default = BreadthFirst;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map