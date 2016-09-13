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
	    this.speed = 0.01;
	    this.color = [0, 0, 0];
	    this.paths = [];
	    this.cells = {};
	    this.mode = "water";
	    this.line = [];
	
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
	
	    var clearButton = document.getElementById('clear');
	    clearButton.addEventListener('click', this.clear.bind(this));
	
	    var modeChangeButton = document.getElementById('mode_img');
	    modeChangeButton.addEventListener('click', this.modeChange.bind(this));
	
	    this.canvas.addEventListener('click', this.clickHandler.bind(this));
	    this.canvas.addEventListener('mousemove', this.dragHandler.bind(this));
	    this.canvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
	  }
	
	  _createClass(PathGenerator, [{
	    key: 'modeChange',
	    value: function modeChange(e) {
	      if (this.mode === 'water') {
	        this.mode = 'brush';
	        e.target.src = "./assets/brush.png";
	        // e.target.src = "http://res.cloudinary.com/wkdal720/image/upload/v1473786825/brush_hmunvb.png";
	        this.sizeInput.min = '2';
	        this.sizeInput.max = '10';
	        this.sizeInput.setAttribute('value', '5');
	        this.size = 5;
	      } else {
	        this.mode = 'water';
	        e.target.src = "./assets/water.png";
	        this.sizeInput.min = '100';
	        this.sizeInput.max = '1000';
	        this.sizeInput.setAttribute('value', '300');
	        this.size = 300;
	        // e.target.src = "http://res.cloudinary.com/wkdal720/image/upload/v1473786828/water_qnvczd.png";
	      }
	    }
	  }, {
	    key: 'mouseUpHandler',
	    value: function mouseUpHandler(e) {
	      var _this2 = this;
	
	      if (this.mode === 'brush' && this.line.length > 1) {
	        this.ctx.lineCap = "round";
	        this.ctx.lineJoin = "round";
	        this.ctx.lineWidth = this.size;
	        this.ctx.strokeStyle = 'rgb(' + this.color.map(function (n) {
	          return parseInt(n);
	        }).join(", ") + ')';
	        this.ctx.beginPath();
	        this.ctx.moveTo(this.line[0][0], this.line[0][1]);
	        this.line.slice(1).forEach(function (l) {
	          _this2.ctx.lineTo(l[0], l[1]);
	        });
	        this.ctx.stroke();
	        this.line = [];
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
	          speed: this.speed,
	          size: this.size,
	          cells: this.cells,
	          ctx: this.ctx });
	        this.paths.push(breadthFirst);
	      } else {
	        this.ctx.fillStyle = 'rgb(' + this.color.map(function (n) {
	          return parseInt(n);
	        }).join(", ") + ')';
	        this.ctx.fillRect(e.offsetX, e.offsetY, this.size, this.size);
	        this.line = [];
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
	            speed: this.speed,
	            size: this.size,
	            cells: this.cells,
	            ctx: this.ctx });
	          this.paths.push(breadthFirst);
	        } else {
	          this.line.push([e.offsetX, e.offsetY]);
	          this.ctx.fillStyle = 'rgb(' + this.color.map(function (n) {
	            return parseInt(n);
	          }).join(", ") + ')';
	          this.ctx.fillRect(e.offsetX, e.offsetY, 1, 1);
	        }
	      }
	    }
	  }, {
	    key: 'clear',
	    value: function clear(e) {
	      e.preventDefault();
	      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	      this.cells = new Array(this.canvas.width * this.canvas.height);
	      this.paths.forEach(function (p) {
	        return window.clearInterval(p.interval);
	      });
	      this.cells = {};
	      this.paths = [];
	      this.line = [];
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
	
	    this.width = data.width;
	    this.height = data.height;
	    this.dist = 0;
	    this.startIdx = data.startIdx;
	    this.segments = [];
	    this.ctx = data.ctx;
	    this.size = data.size;
	    this.color = data.color;
	    this.colorGap = this.color.map(function (c) {
	      return _this.colorGapGenerator(c);
	    });
	    this.speed = data.speed;
	    this.visited = {};
	    this.cells = data.cells;
	
	    this.fillCell(this.startIdx);
	    this.segmentNeighbors(this.startIdx);
	    this.onePixelProcess = this.onePixelProcess.bind(this);
	
	    this.interval = window.setInterval(this.onePixelProcess, this.speed);
	  }
	
	  _createClass(BreadthFirst, [{
	    key: "resumeInterval",
	    value: function resumeInterval() {
	      if (this.segments.length) {
	        this.interval = window.setInterval(this.onePixelProcess, this.speed);
	      }
	    }
	  }, {
	    key: "colorGapGenerator",
	    value: function colorGapGenerator(c) {
	      return (255 - c) / this.size;
	    }
	  }, {
	    key: "onePixelProcess",
	    value: function onePixelProcess() {
	      var _this2 = this;
	
	      if (this.segments.length === 0) {
	        window.clearInterval(this.interval);
	      }
	      var randomSeg = this.popRandomSegment();
	      this.fillCell(randomSeg);
	      this.segmentNeighbors(randomSeg);
	      this.color = this.color.map(function (c, i) {
	        return c + _this2.colorGap[i];
	      });
	    }
	  }, {
	    key: "segmentNeighbors",
	    value: function segmentNeighbors(idx) {
	      var _this3 = this;
	
	      var neighbors = [idx - this.width, idx + this.width, idx - 1, idx + 1];
	      neighbors = neighbors.filter(function (i) {
	        return i >= 0 && _this3.isInline(i) && i < _this3.width * _this3.height && _this3.isOpen(i);
	      });
	      neighbors.forEach(function (n) {
	        return _this3.segments.push(n);
	      });
	    }
	  }, {
	    key: "isInline",
	    value: function isInline(idx) {
	      return idx % this.width !== 0;
	    }
	  }, {
	    key: "isOpen",
	    value: function isOpen(idx) {
	      return !this.cells[idx] && !this.segments.includes(idx);
	    }
	  }, {
	    key: "popRandomSegment",
	    value: function popRandomSegment() {
	      var segments = this.segments;
	      var length = segments.length;
	      var i = Math.floor(Math.random() * length);
	      return segments.splice(i, 1)[0];
	    }
	    //
	    // rgbaSum(c1, c2){
	    //   let a = c1.a + c2.a*(1-c1.a);
	    //   return {
	    //     r: (c1.r * c1.a  + c2.r * c2.a * (1 - c1.a)) / a,
	    //     g: (c1.g * c1.a  + c2.g * c2.a * (1 - c1.a)) / a,
	    //     b: (c1.b * c1.a  + c2.b * c2.a * (1 - c1.a)) / a,
	    //     a: a
	    //   };
	    // }
	    //
	    // colorObject(c) {
	    //   let color = {};
	    //   ['r', 'g', 'b', 'a'].forEach((chr, idx) => {
	    //     color[chr] = Number((c[idx] / 255).toFixed(2));
	    //   });
	    //   return color;
	    // }
	    //
	    // colorArray(ob) {
	    //   let color = [ob.r, ob.g, ob.b, ob.a];
	    //   return color.map((n) => parseInt(n * 255));
	    // }
	
	  }, {
	    key: "fillCell",
	    value: function fillCell(idx) {
	      this.dist += 1;
	      this.visited[idx] = true;
	      this.cells[idx] = true;
	      var x = idx % this.width,
	          y = parseInt(idx / this.width);
	      // let spotColor = this.ctx.getImageData(x, y, 1, 1).data;
	      // let mergedColor = this.colorObject(this.color.concat(127));
	      //
	      // if (!spotColor.every(i => i === 0)) {
	      //   mergedColor = this.rgbaSum(this.colorObject(spotColor), mergedColor);
	      // }
	      // this.ctx.fillStyle = `rgba(${this.colorArray(mergedColor).join(", ")})`;
	      this.ctx.fillStyle = "rgb(" + this.color.map(function (n) {
	        return parseInt(n);
	      }).join(", ") + ")";
	      this.ctx.fillRect(x, y, 1, 1);
	      if (this.dist === this.size) {
	        window.clearInterval(this.interval);
	      }
	    }
	  }]);
	
	  return BreadthFirst;
	}();
	
	exports.default = BreadthFirst;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map