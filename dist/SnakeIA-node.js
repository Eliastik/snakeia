(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SnakeIA"] = factory();
	else
		root["SnakeIA"] = factory();
})(typeof self !== "undefined" ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/node-index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./libs/lowlight.astar.min.js":
/*!************************************!*\
  !*** ./libs/lowlight.astar.min.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
Copyright 2017, Lecoq Simon (lowlight.fr)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
(function(a){var b=Math.sign,c=Math.min,d=Math.abs;"undefined"==typeof a.Lowlight&&(a.Lowlight={}), true&&"object"==typeof module.exports&&(module.exports=a.Lowlight);class e{constructor(){this.nodes=new Map}id(a){return a}node(a,b=!1){return b?this.nodes.get(this.id(arguments[0])):this.nodes.get(a)}data(a,b){return 2===arguments.length&&(a.graph.get(this)._data=b),a.graph.get(this)._data}adjacent(c,a){return c.graph.get(this).has(a)}neighbors(a){return Array.from(a.graph.get(this).keys())}connected(c,a){return c.graph.get(this)._connectivity===a.graph.get(this)._connectivity}connect(){let a=Array.from(this.nodes.values()),b=0;for(let b=0;b<a.length;b++)a[b].graph.get(this)._connectivity=void 0;for(let c=0;c<a.length;c++){if(void 0!==a[c].graph.get(this)._connectivity)continue;let d=[a[c]];for(b++;d.length;){let a=d.shift();a.graph.get(this)._connectivity=b,this.neighbors(a).map((a)=>{void 0===a.graph.get(this)._connectivity&&0>d.indexOf(a)&&d.push(a)})}}}add(a){return 1<arguments.length?Array.from(arguments).map((a)=>this.add(a)):(a.graph.set(this,new Map),this.nodes.set(a.id,a),a)}delete(a){return 1<arguments.length?Array.from(arguments).map((a)=>this.delete(a)):(a.graph.delete(this),this.nodes.delete(a.id),a)}edge(c,a,b=1,d=1){if(!c.graph.has(this)||!a.graph.has(this))throw new Error("Nodes must be on the same graph");return null===b?c.graph.get(this).delete(a):c.graph.get(this).set(a,b),null===d?a.graph.get(this).delete(c):a.graph.get(this).set(c,d),this}cost(c,a){return this.adjacent(c,a)?c.graph.get(this).get(a):null}}e.fromArray=function(a,b={}){let c=e.fromArray.X(a,b.order),d=e.fromArray.Y(a,b.order),g=e.fromArray.at.bind(null,a,b.order),h=[],j=null;for(let k,l=1;l<Math.max(2,arguments.length);l++){k=new e,h.push(k),b=arguments[l]||{};let a=e.fromArray.id.bind(null,c,d,b.torus),i=b.cost||e.fromArray.cost,n=e.fromArray.edge.bind(null,k,i);for(let b=0;b<c;b++)for(let c,e=0;e<d;e++)c=k.add(j?j.get(a(b,e)):new f(a(b,e))),c.x=b,c.y=e,c.graph.get(k)._data=g(b,e),n(c,k.nodes.get(a(b-1,e))),n(c,k.nodes.get(a(b+1,e))),n(c,k.nodes.get(a(b,e-1))),n(c,k.nodes.get(a(b,e+1)));if(b.diagonals)for(let e=0;e<c;e++)for(let c=0;c<d;c++){let d=k.nodes.get(a(e,c)),f=k.adjacent(d,k.nodes.get(a(e-1,c))),g=k.adjacent(d,k.nodes.get(a(e+1,c))),h=k.adjacent(d,k.nodes.get(a(e,c-1))),i=k.adjacent(d,k.nodes.get(a(e,c+1)));"strict"===b.cutting?(f&&h&&n(d,k.nodes.get(a(e-1,c-1))),f&&i&&n(d,k.nodes.get(a(e-1,c+1))),g&&h&&n(d,k.nodes.get(a(e+1,c-1))),g&&i&&n(d,k.nodes.get(a(e+1,c+1)))):((f||h||b.cutting)&&n(d,k.nodes.get(a(e-1,c-1))),(f||i||b.cutting)&&n(d,k.nodes.get(a(e-1,c+1))),(g||h||b.cutting)&&n(d,k.nodes.get(a(e+1,c-1))),(g||i||b.cutting)&&n(d,k.nodes.get(a(e+1,c+1))))}Object.defineProperty(k,"id",{enumerable:!1,configurable:!1,writable:!0,value(b){return a(b.x,b.y)}}),k.connect(),k.X=c,k.Y=d,k.TORUS=b.torus,j||(j=k.nodes)}return 1<h.length?h:h[0]},e.fromArray.X=function(a,b="yx"){return"xy"===b?a.length:"yx"===b?a[0].length:0},e.fromArray.Y=function(a,b="yx"){return"xy"===b?a[0].length:"yx"===b?a.length:0},e.fromArray.at=function(a,b="yx",c,d){return"xy"===b?a[c][d]:a[d][c]},e.fromArray.id=function(a=0,b=0,c=!1,d,e){return c?(e+b)%b*a+(d+a)%a:0<=d&&d<a&&0<=e&&e<b?e*a+d:null},e.fromArray.cost=function(){return 1},e.fromArray.edge=function(c,d,e,a){a&&c.edge(e,a,d(c.data(e),c.data(a)),d(c.data(a),c.data(e)))},e.fromArray.update=function(){console.warn("Graph.fromArray isn't implemented yet")};class f{constructor(a,b){for(let c in this.id=a,this.graph=new Map,b)"id"!=c&&"graph"!=c&&(this[c]=b[c])}}class g{constructor(a){this.nodes=[],this.score="function"==typeof a?a:(b)=>+b}get size(){return this.nodes.length}add(a){if(1<arguments.length){for(let a=0;a<arguments.length;a++)this.add(arguments[a]);return this}return this.nodes.push(a),this.bubble(this.size-1)}set(a){let b=this.nodes.indexOf(a);return~b?this.score(a)<=this.score(this.nodes[b])?this.bubble(this.nodes.indexOf(a)):this.sink(this.nodes.indexOf(a)):this.add(a)}pop(){let a=this.nodes[0],b=this.nodes.pop();return 0<this.size&&(this.nodes[0]=b,this.sink(0)),a}top(){return this.nodes[0]}delete(a){if(1<arguments.length){for(let a=0;a<arguments.length;a++)this.delete(arguments[a]);return this}for(let b=0;b<this.size;b++){if(this.nodes[b]!=a)continue;let c=this.nodes.pop();return b==this.size-1?this:(this.nodes[b]=c,this.bubble(b).sink(b))}}bubble(a){let b=this.nodes[a],c=this.score(b);for(;0<a;){let d=Math.floor((a+1)/2)-1,e=this.nodes[d];if(c>=this.score(e))break;this.nodes[d]=b,this.nodes[a]=e,a=d}return this}sink(a){let b=this.nodes[a],c=this.score(b);for(;;){let d=2*(a+1),e=d-1,f=null;if(e<this.size&&this.score(this.nodes[e])<c&&(f=e),d<this.size&&this.score(this.nodes[d])<(f?this.score(this.nodes[f]):c)&&(f=d),null===f)break;this.nodes[a]=this.nodes[f],this.nodes[f]=b,a=f}return this}}let h={manhattan:function(c,a,b={}){let e=d(a.x-c.x),f=d(a.y-c.y);return(b.multiplier||1)*(e+f)},manhattanTorus:function(e,a,b={}){let f=c(d(a.x-e.x),a.x+(b.x||0)-e.x,e.x+(b.x||0)-a.x),g=c(d(a.y-e.y),a.y+(b.y||0)-e.y,e.y+(b.y||0)-a.y);return(b.multiplier||1)*(f+g)},diagonal:function(e,a,b={}){let f=d(a.x-e.x),g=d(a.y-e.y);return m*(f+g)+(dm-2*m)*c(f,g)},diagonalTorus:function(e,a,b={}){let f=c(d(a.x-e.x),a.x+(b.x||0)-e.x,e.x+(b.x||0)-a.x),g=c(d(a.y-e.y),a.y+(b.y||0)-e.y,e.y+(b.y||0)-a.y);return(b.multiplier||1)*(f+g)+((b.diagonalMultiplier||1.4)-2*(b.multiplier||1))*c(f,g)},euclidian:function(c,a,b={}){let e=d(a.x-c.x),f=d(a.y-c.y);return(b.multiplier||1)*Math.sqrt(e*e+f*f)},euclidianTorus:function(e,a,b={}){let f=c(d(a.x-e.x),a.x+(b.x||0)-e.x,e.x+(b.x||0)-a.x),g=c(d(a.y-e.y),a.y+(b.y||0)-e.y,e.y+(b.y||0)-a.y);return(b.multiplier||1)*(f+g)+((b.diagonalMultiplier||1.4)-2*(b.multiplier||1))*c(f,g)}};class i extends Error{constructor(a){super(a),this.name="WorkerError"}}class j{constructor(a,b={}){if(this.graphs=[],this.heuristic=b.heuristic||"manhattan",this.heuristicOptions=b.heuristicOptions||{},Array.isArray(a)&&(this.heuristic=b.heuristic in h?b.heuristic:b.diagonals?b.torus?"diagonalTorus":"diagonal":b.torus?"manhattanTorus":"manhattan",this.heuristicOptions.x=e.fromArray.X(a,b.order),this.heuristicOptions.y=e.fromArray.Y(a,b.order),this.graphs=e.fromArray.apply(this,arguments),!Array.isArray(this.graphs)&&(this.graphs=[this.graphs])),b.thread&&("undefined"==typeof WorkerGlobalScope||!(self instanceof WorkerGlobalScope))){this.worker=null;try{this.worker=new Worker(b.thread)}catch(a){throw"file:"===window.location.protocol&&console.warn("WebWorkers in local files may not be supported by your browser."),new i(`${b.thread} couldn't be opened.`)}"cost"in b&&(b.cost=b.cost.toString()),this.worker.postMessage(["constructor",a,b]),this.path=(a,b,c={})=>{this._worker_path_callback=c.callback,delete c.callback,this.worker.postMessage(["path",a,b,c])},this.worker.onmessage=(a)=>{let b=JSON.parse(a.data);switch(b[0]){case"path":this._worker_path_callback(b[1]);}}}}path(a,b,c={}){if(c.jps)return this.jps(a,b,c);let d=new g((a)=>a.estimated),e=new Map,f=this.graphs[c.layer||0];if(a=f.node(a,!0),b=f.node(b,!0),d.add({node:a,estimated:0}),e.set(a,{score:0,from:null}),!c.static||f.connected(a,b))for(;d.size;){let a=d.pop().node;if(a===b)break;f.neighbors(a).map((g)=>{let i=(e.has(a)?e.get(a).score:0)+f.cost(a,g);i<(e.has(g)?e.get(g).score:Infinity)&&(e.set(g,{score:i,from:a}),d.set({node:g,estimated:i+h[c.heuristic||this.heuristic](g,b,c.heuristicOptions||this.heuristicOptions)}))}),d.delete(a)}let i=[];if(e.has(b)){let a=b;for(i.push(b);null!==(a=e.get(a).from);)i.push(a);i=i.reverse()}return c.callback&&c.callback(i,e),i}}if(j.JPS=class{constructor(){}static access(c,d,a,b){return c.adjacent(d,b?c.node(a,!0):a)}static neighborhood(a,c,d,e){let f=[],g=d.get(e).from||null;if(null!==g){let h={x:b(e.x-g.x),y:b(e.y-g.y)};if(0!=h.x&&0!=h.y){let b=a(e,{x:e.x+h.x,y:e.y},!0),d=a(e,{x:e.x,y:e.y+h.y},!0);(b||d)&&(f.push(c.node({x:e.x+h.x,y:e.y+h.y},!0)),b&&(f.push(c.node({x:e.x+h.x,y:e.y},!0)),!a(e,{x:e.x,y:e.y-h.y},!0)&&f.push(c.node({x:e.x+h.x,y:e.y-h.y},!0))),d&&(f.push(c.node({x:e.x,y:e.y+h.y},!0)),!a(e,{x:e.x-h.x,y:e.y},!0)&&f.push(c.node({x:e.x-h.x,y:e.y+h.y},!0))))}else a(e,{x:e.x+h.x,y:e.y+h.y},!0)&&(f.push(c.node({x:e.x+h.x,y:e.y+h.y},!0)),0==h.x?0!=h.y&&(!a(e,{x:e.x-1,y:e.y},!0)&&f.push(c.node({x:e.x-1,y:e.y+h.y},!0)),!a(e,{x:e.x+1,y:e.y},!0)&&f.push(c.node({x:e.x+1,y:e.y+h.y},!0))):(!a(e,{x:e.x,y:e.y-1},!0)&&f.push(c.node({x:e.x+h.x,y:e.y-1},!0)),!a(e,{x:e.x,y:e.y+1},!0)&&f.push(c.node({x:e.x+h.x,y:e.y+1},!0))))}else return c.neighbors(e);return f.filter((a)=>a)}static jump(a,c,e,f,g,h){for(;;){if(!a(h,g))return null;if(g.x===f.x&&g.y===f.y)return g;let i={x:b(g.x-h.x),y:b(g.y-h.y)};if(0!=i.x&&0!=i.y){if(!a(g,{x:g.x-i.x,y:g.y},!0)&&a(g,{x:g.x-i.x,y:g.y+i.y},!0)||!a(g,{x:g.x,y:g.y-i.y},!0)&&a(g,{x:g.x+i.x,y:g.y-i.y},!0))return g;let b=j.JPS.jump.bind(this,a,c,e,f);if(null!==b(c.node({x:g.x+i.x,y:g.y},!0),g)||null!==b(c.node({x:g.x,y:g.y+i.y},!0),g))return g}else if(0!=i.x){if(!a(g,{x:g.x,y:g.y-1},!0)&&a(g,{x:g.x+i.x,y:g.y-1},!0)||!a(g,{x:g.x,y:g.y+1},!0)&&a(g,{x:g.x+i.x,y:g.y+1},!0))return g;}else if(0!=i.y&&(!a(g,{x:g.x-1,y:g.y},!0)&&a(g,{x:g.x-1,y:g.y+i.y},!0)||!a(g,{x:g.x+1,y:g.y},!0)&&a(g,{x:g.x+1,y:g.y+i.y},!0)))return g;h=g,g=c.node({x:g.x+i.x,y:g.y+i.y},!0)}return null}},j.prototype.jps=function(a,c,d={}){if(this.graphs[d.layer||0].TORUS)return console.warn("Torus map aren't yet supported by JPS"),d.callback&&d.callback([],new Map),[];let e=new g((a)=>a.estimated),f=new Map,i=this.graphs[d.layer||0],k=null;a=i.node(a,!0),c=i.node(c,!0),e.add({node:a,estimated:0}),f.set(a,{score:0,from:null});let l=j.JPS.access.bind(this,i),n=j.JPS.neighborhood.bind(this,l,i,f),o=j.JPS.jump.bind(this,l,i,f,c);if(!d.static||i.connected(a,c))for(;e.size;){let a=e.pop().node;if(a===c)break;n(a).map((b)=>{if(null!==(k=o(b,a))){let b=(f.has(a)?f.get(a).score:0)+i.cost(a,k);b<(f.has(k)?f.get(k).score:Infinity)&&(f.set(k,{score:b,from:a,jumped:!0}),e.set({node:k,estimated:b+h[d.heuristic||this.heuristic](k,c,d.heuristicOptions||this.heuristicOptions)}))}}),e.delete(a)}let p=[];if(f.has(c)){let d=c;for(;d.x!=a.x||d.y!=a.y;)for(let a=f.get(d).from;d.x!=a.x||d.y!=a.y;)p.push(d),d=i.node({x:d.x+b(a.x-d.x),y:d.y+b(a.y-d.y)},!0);p.push(d),p.reverse()}return d.callback&&d.callback(p,f),p},"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope){let a;onmessage=function(b){let c=b.data;switch(c[0]){case"constructor":if("cost"in c[2]){let a=/^\((.*?)\)\s*=>\s*{/.test(c[2].cost),b=/^function /.test(c[2].cost);c[2].cost=eval(`(${a||b?"":"function "}${c[2].cost})`)}a=new j(c[1],c[2]);break;case"path":postMessage(JSON.stringify(["path",a.path(c[1],c[2],c[3])]));}}}a.Lowlight.Astar={Graph:e,Node:f,BinaryHeap:g,Heuristic:h,Configuration:j,WorkerError:i}})("undefined"==typeof window?this:window);

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/assertThisInitialized.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/classCallCheck.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/createClass.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/get.js":
/*!****************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/get.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var superPropBase = __webpack_require__(/*! ./superPropBase */ "./node_modules/@babel/runtime/helpers/superPropBase.js");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/getPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/inherits.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/inherits.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/setPrototypeOf.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/superPropBase.js":
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/superPropBase.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getPrototypeOf = __webpack_require__(/*! ./getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/typeof.js":
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/seedrandom/index.js":
/*!******************************************!*\
  !*** ./node_modules/seedrandom/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.
var alea = __webpack_require__(/*! ./lib/alea */ "./node_modules/seedrandom/lib/alea.js");

// xor128, a pure xor-shift generator by George Marsaglia.
// Period: 2^128-1.
// Reported to fail: MatrixRank and LinearComp.
var xor128 = __webpack_require__(/*! ./lib/xor128 */ "./node_modules/seedrandom/lib/xor128.js");

// xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
// Period: 2^192-2^32
// Reported to fail: CollisionOver, SimpPoker, and LinearComp.
var xorwow = __webpack_require__(/*! ./lib/xorwow */ "./node_modules/seedrandom/lib/xorwow.js");

// xorshift7, by François Panneton and Pierre L'ecuyer, takes
// a different approach: it adds robustness by allowing more shifts
// than Marsaglia's original three.  It is a 7-shift generator
// with 256 bits, that passes BigCrush with no systmatic failures.
// Period 2^256-1.
// No systematic BigCrush failures reported.
var xorshift7 = __webpack_require__(/*! ./lib/xorshift7 */ "./node_modules/seedrandom/lib/xorshift7.js");

// xor4096, by Richard Brent, is a 4096-bit xor-shift with a
// very long period that also adds a Weyl generator. It also passes
// BigCrush with no systematic failures.  Its long period may
// be useful if you have many generators and need to avoid
// collisions.
// Period: 2^4128-2^32.
// No systematic BigCrush failures reported.
var xor4096 = __webpack_require__(/*! ./lib/xor4096 */ "./node_modules/seedrandom/lib/xor4096.js");

// Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
// number generator derived from ChaCha, a modern stream cipher.
// https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
// Period: ~2^127
// No systematic BigCrush failures reported.
var tychei = __webpack_require__(/*! ./lib/tychei */ "./node_modules/seedrandom/lib/tychei.js");

// The original ARC4-based prng included in this library.
// Period: ~2^1600
var sr = __webpack_require__(/*! ./seedrandom */ "./node_modules/seedrandom/seedrandom.js");

sr.alea = alea;
sr.xor128 = xor128;
sr.xorwow = xorwow;
sr.xorshift7 = xorshift7;
sr.xor4096 = xor4096;
sr.tychei = tychei;

module.exports = sr;


/***/ }),

/***/ "./node_modules/seedrandom/lib/alea.js":
/*!*********************************************!*\
  !*** ./node_modules/seedrandom/lib/alea.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -

// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.



(function(global, module, define) {

function Alea(seed) {
  var me = this, mash = Mash();

  me.next = function() {
    var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
    me.s0 = me.s1;
    me.s1 = me.s2;
    return me.s2 = t - (me.c = t | 0);
  };

  // Apply the seeding algorithm from Baagoe.
  me.c = 1;
  me.s0 = mash(' ');
  me.s1 = mash(' ');
  me.s2 = mash(' ');
  me.s0 -= mash(seed);
  if (me.s0 < 0) { me.s0 += 1; }
  me.s1 -= mash(seed);
  if (me.s1 < 0) { me.s1 += 1; }
  me.s2 -= mash(seed);
  if (me.s2 < 0) { me.s2 += 1; }
  mash = null;
}

function copy(f, t) {
  t.c = f.c;
  t.s0 = f.s0;
  t.s1 = f.s1;
  t.s2 = f.s2;
  return t;
}

function impl(seed, opts) {
  var xg = new Alea(seed),
      state = opts && opts.state,
      prng = xg.next;
  prng.int32 = function() { return (xg.next() * 0x100000000) | 0; }
  prng.double = function() {
    return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
  };
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

function Mash() {
  var n = 0xefc8249d;

  var mash = function(data) {
    data = String(data);
    for (var i = 0; i < data.length; i++) {
      n += data.charCodeAt(i);
      var h = 0.02519603282416938 * n;
      n = h >>> 0;
      h -= n;
      h *= n;
      n = h >>> 0;
      h -= n;
      n += h * 0x100000000; // 2^32
    }
    return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
  };

  return mash;
}


if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.alea = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/tychei.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/tychei.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var b = me.b, c = me.c, d = me.d, a = me.a;
    b = (b << 25) ^ (b >>> 7) ^ c;
    c = (c - d) | 0;
    d = (d << 24) ^ (d >>> 8) ^ a;
    a = (a - b) | 0;
    me.b = b = (b << 20) ^ (b >>> 12) ^ c;
    me.c = c = (c - d) | 0;
    me.d = (d << 16) ^ (c >>> 16) ^ a;
    return me.a = (a - b) | 0;
  };

  /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */

  me.a = 0;
  me.b = 0;
  me.c = 2654435769 | 0;
  me.d = 1367130551;

  if (seed === Math.floor(seed)) {
    // Integer seed.
    me.a = (seed / 0x100000000) | 0;
    me.b = seed | 0;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 20; k++) {
    me.b ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.a = f.a;
  t.b = f.b;
  t.c = f.c;
  t.d = f.d;
  return t;
};

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.tychei = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor128.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xor128.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;

  // Set up generator function.
  me.next = function() {
    var t = me.x ^ (me.x << 11);
    me.x = me.y;
    me.y = me.z;
    me.z = me.w;
    return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
  };

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor128 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xor4096.js":
/*!************************************************!*\
  !*** ./node_modules/seedrandom/lib/xor4096.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    var w = me.w,
        X = me.X, i = me.i, t, v;
    // Update Weyl generator.
    me.w = w = (w + 0x61c88647) | 0;
    // Update xor generator.
    v = X[(i + 34) & 127];
    t = X[i = ((i + 1) & 127)];
    v ^= v << 13;
    t ^= t << 17;
    v ^= v >>> 15;
    t ^= t >>> 12;
    // Update Xor generator array state.
    v = X[i] = v ^ t;
    me.i = i;
    // Result is the combination.
    return (v + (w ^ (w >>> 16))) | 0;
  };

  function init(me, seed) {
    var t, v, i, j, w, X = [], limit = 128;
    if (seed === (seed | 0)) {
      // Numeric seeds initialize v, which is used to generates X.
      v = seed;
      seed = null;
    } else {
      // String seeds are mixed into v and X one character at a time.
      seed = seed + '\0';
      v = 0;
      limit = Math.max(limit, seed.length);
    }
    // Initialize circular array and weyl value.
    for (i = 0, j = -32; j < limit; ++j) {
      // Put the unicode characters into the array, and shuffle them.
      if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
      // After 32 shuffles, take v as the starting w value.
      if (j === 0) w = v;
      v ^= v << 10;
      v ^= v >>> 15;
      v ^= v << 4;
      v ^= v >>> 13;
      if (j >= 0) {
        w = (w + 0x61c88647) | 0;     // Weyl.
        t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
        i = (0 == t) ? i + 1 : 0;     // Count zeroes.
      }
    }
    // We have detected all zeroes; make the key nonzero.
    if (i >= 128) {
      X[(seed && seed.length || 0) & 127] = -1;
    }
    // Run the generator 512 times to further mix the state before using it.
    // Factoring this as a function slows the main generator, so it is just
    // unrolled here.  The weyl generator is not advanced while warming up.
    i = 127;
    for (j = 4 * 128; j > 0; --j) {
      v = X[(i + 34) & 127];
      t = X[i = ((i + 1) & 127)];
      v ^= v << 13;
      t ^= t << 17;
      v ^= v >>> 15;
      t ^= t >>> 12;
      X[i] = v ^ t;
    }
    // Storing state as object members is faster than using closure variables.
    me.w = w;
    me.X = X;
    me.i = i;
  }

  init(me, seed);
}

function copy(f, t) {
  t.i = f.i;
  t.w = f.w;
  t.X = f.X.slice();
  return t;
};

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.X) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xor4096 = impl;
}

})(
  this,                                     // window object or global
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorshift7.js":
/*!**************************************************!*\
  !*** ./node_modules/seedrandom/lib/xorshift7.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

(function(global, module, define) {

function XorGen(seed) {
  var me = this;

  // Set up generator function.
  me.next = function() {
    // Update xor generator.
    var X = me.x, i = me.i, t, v, w;
    t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
    t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
    t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
    t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
    t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
    X[i] = v;
    me.i = (i + 1) & 7;
    return v;
  };

  function init(me, seed) {
    var j, w, X = [];

    if (seed === (seed | 0)) {
      // Seed state array using a 32-bit integer.
      w = X[0] = seed;
    } else {
      // Seed state using a string.
      seed = '' + seed;
      for (j = 0; j < seed.length; ++j) {
        X[j & 7] = (X[j & 7] << 15) ^
            (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
      }
    }
    // Enforce an array length of 8, not all zeroes.
    while (X.length < 8) X.push(0);
    for (j = 0; j < 8 && X[j] === 0; ++j);
    if (j == 8) w = X[7] = -1; else w = X[j];

    me.x = X;
    me.i = 0;

    // Discard an initial 256 values.
    for (j = 256; j > 0; --j) {
      me.next();
    }
  }

  init(me, seed);
}

function copy(f, t) {
  t.x = f.x.slice();
  t.i = f.i;
  return t;
}

function impl(seed, opts) {
  if (seed == null) seed = +(new Date);
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (state.x) copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorshift7 = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/lib/xorwow.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/lib/xorwow.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

(function(global, module, define) {

function XorGen(seed) {
  var me = this, strseed = '';

  // Set up generator function.
  me.next = function() {
    var t = (me.x ^ (me.x >>> 2));
    me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
    return (me.d = (me.d + 362437 | 0)) +
       (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
  };

  me.x = 0;
  me.y = 0;
  me.z = 0;
  me.w = 0;
  me.v = 0;

  if (seed === (seed | 0)) {
    // Integer seed.
    me.x = seed;
  } else {
    // String seed.
    strseed += seed;
  }

  // Mix in string seed, then discard an initial batch of 64 values.
  for (var k = 0; k < strseed.length + 64; k++) {
    me.x ^= strseed.charCodeAt(k) | 0;
    if (k == strseed.length) {
      me.d = me.x << 10 ^ me.x >>> 4;
    }
    me.next();
  }
}

function copy(f, t) {
  t.x = f.x;
  t.y = f.y;
  t.z = f.z;
  t.w = f.w;
  t.v = f.v;
  t.d = f.d;
  return t;
}

function impl(seed, opts) {
  var xg = new XorGen(seed),
      state = opts && opts.state,
      prng = function() { return (xg.next() >>> 0) / 0x100000000; };
  prng.double = function() {
    do {
      var top = xg.next() >>> 11,
          bot = (xg.next() >>> 0) / 0x100000000,
          result = (top + bot) / (1 << 21);
    } while (result === 0);
    return result;
  };
  prng.int32 = xg.next;
  prng.quick = prng;
  if (state) {
    if (typeof(state) == 'object') copy(state, xg);
    prng.state = function() { return copy(xg, {}); }
  }
  return prng;
}

if (module && module.exports) {
  module.exports = impl;
} else if (__webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js") && __webpack_require__(/*! !webpack amd options */ "./node_modules/webpack/buildin/amd-options.js")) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return impl; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
  this.xorwow = impl;
}

})(
  this,
   true && module,    // present in node.js
  __webpack_require__(/*! !webpack amd define */ "./node_modules/webpack/buildin/amd-define.js")   // present with an AMD loader
);



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/seedrandom/seedrandom.js":
/*!***********************************************!*\
  !*** ./node_modules/seedrandom/seedrandom.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function (global, pool, math) {
//
// The following constants are related to IEEE 754 limits.
//

var width = 256,        // each RC4 output is 0 <= x < 256
    chunks = 6,         // at least six RC4 outputs for each double
    digits = 52,        // there are 52 significant digits in a double
    rngname = 'random', // rngname: name for Math.random and Math.seedrandom
    startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto;         // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = (options == true) ? { entropy: true } : (options || {});

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(
    options.entropy ? [seed, tostring(pool)] :
    (seed == null) ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function() {
    var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
        d = startdenom,                 //   and denominator d = 2 ^ 48.
        x = 0;                          //   and no 'extra last byte'.
    while (n < significance) {          // Fill up all significant digits by
      n = (n + x) * width;              //   shifting numerator and
      d *= width;                       //   denominator and generating a
      x = arc4.g(1);                    //   new least-significant-byte.
    }
    while (n >= overflow) {             // To avoid rounding up, before adding
      n /= 2;                           //   last byte, shift everything
      d /= 2;                           //   right using integer math until
      x >>>= 1;                         //   we have exactly the desired bits.
    }
    return (n + x) / d;                 // Form the number within [0, 1).
  };

  prng.int32 = function() { return arc4.g(4) | 0; }
  prng.quick = function() { return arc4.g(4) / 0x100000000; }
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback ||
      function(prng, seed, is_math_call, state) {
        if (state) {
          // Load the arc4 state from the given state if it has an S array.
          if (state.S) { copy(state, arc4); }
          // Only provide the .state method if requested via options.state.
          prng.state = function() { return copy(arc4, {}); }
        }

        // If called as a method of Math (Math.seedrandom()), mutate
        // Math.random because that is how seedrandom.js has worked since v1.0.
        if (is_math_call) { math[rngname] = prng; return seed; }

        // Otherwise, it is a newer calling convention, so return the
        // prng directly.
        else return prng;
      })(
  prng,
  shortseed,
  'global' in options ? options.global : (this == math),
  options.state);
}

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t, keylen = key.length,
      me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) { key = [keylen++]; }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function(count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t, r = 0,
        i = me.i, j = me.j, s = me.S;
    while (count--) {
      t = s[i = mask & (i + 1)];
      r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
    }
    me.i = i; me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [], typ = (typeof obj), prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
    }
  }
  return (result.length ? result : typ == 'string' ? obj : obj + '\0');
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '', smear, j = 0;
  while (j < stringseed.length) {
    key[mask & j] =
      mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    var out;
    if (nodecrypto && (out = nodecrypto.randomBytes)) {
      // The use of 'out' to remember randomBytes makes tight minified code.
      out = out(width);
    } else {
      out = new Uint8Array(width);
      (global.crypto || global.msCrypto).getRandomValues(out);
    }
    return tostring(out);
  } catch (e) {
    var browser = global.navigator,
        plugins = browser && browser.plugins;
    return [+new Date, global, plugins, global.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
if ( true && module.exports) {
  module.exports = seedrandom;
  // When in node.js, try using crypto package for autoseeding.
  try {
    nodecrypto = __webpack_require__(/*! crypto */ 0);
  } catch (ex) {}
} else if (true) {
  !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() { return seedrandom; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}


// End anonymous scope, and pass initial values.
})(
  // global: `self` in browsers (including strict mode and web workers),
  // otherwise `this` in Node and other environments
  (typeof self !== 'undefined') ? self : this,
  [],     // pool: entropy pool starts empty
  Math    // math: package containing random, pow, and seedrandom
);


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-define.js":
/*!***************************************!*\
  !*** (webpack)/buildin/amd-define.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function() {
	throw new Error("define cannot be used indirect");
};


/***/ }),

/***/ "./node_modules/webpack/buildin/amd-options.js":
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/engine/Constants.js":
/*!*********************************!*\
  !*** ./src/engine/Constants.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  CaseType: {
    EMPTY: 0,
    SNAKE: 1,
    FRUIT: 2,
    WALL: 3,
    SNAKE_DEAD: 4,
    SURROUNDED: 5,
    FRUIT_GOLD: 6,
    CROSSED: 7
  },
  PlayerType: {
    AI: "PLAYER_AI",
    HUMAN: "PLAYER_HUMAN",
    HYBRID_HUMAN_AI: "PLAYER_HYBRID_HUMAN_AI"
  },
  AiLevel: {
    RANDOM: "AI_LEVEL_RANDOM",
    LOW: "AI_LEVEL_LOW",
    DEFAULT: "AI_LEVEL_DEFAULT",
    HIGH: "AI_LEVEL_HIGH",
    ULTRA: "AI_LEVEL_ULTRA",
    CUSTOM: "AI_LEVEL_CUSTOM",
    MOCK: "AI_LEVEL_MOCK"
  },
  OutputType: {
    TEXT: "OUTPUT_TEXT",
    GRAPHICAL: "OUTPUT_GRAPHICAL"
  },
  Setting: {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,
    FONT_FAMILY: "Delius",
    FONT_SIZE: 32,
    HEADER_HEIGHT_DEFAULT: 75,
    TARGET_FPS: 60,
    TIME_MULTIPLIER: 15,
    IMAGE_SNAKE_HUE: 75,
    IMAGE_SNAKE_SATURATION: 50,
    IMAGE_SNAKE_VALUE: 77,
    CARS_TO_PRERENDER: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "×"],
    APP_VERSION: "2.2",
    DATE_VERSION: "10/18/2020",
    PROB_GOLD_FRUIT_1_PLAYER: 100,
    PROB_GOLD_FRUIT_MULTIPLE_PLAYERS: 50,
    INFO_NOTIF_COLOR: "rgba(52, 152, 219, 0.5)",
    ERROR_NOTIF_COLOR: "rgba(231, 76, 60, 0.5)"
  },
  Direction: {
    UP: 0,
    TOP: 0,
    RIGHT: 1,
    BOTTOM: 2,
    DOWN: 2,
    LEFT: 3,
    ANGLE_1: 4,
    ANGLE_2: 5,
    ANGLE_3: 6,
    ANGLE_4: 7
  },
  Key: {
    UP: 38,
    RIGHT: 39,
    BOTTOM: 40,
    LEFT: 37,
    ENTER: 13
  },
  Error: {
    ROOM_NOT_FOUND: "ROOM_NOT_FOUND",
    ROOM_ALREADY_JOINED: "ROOM_ALREADY_JOINED",
    INVALID_SETTINGS: "INVALID_SETTINGS",
    MAX_ROOM_LIMIT_REACHED: "MAX_ROOM_LIMIT_REACHED",
    AUTHENTICATION_REQUIRED: "AUTHENTICATION_REQUIRED",
    ALREADY_CREATED_ROOM: "ALREADY_CREATED_ROOM",
    BANNED: "BANNED",
    DISCONNECTED: "DISCONNECTED"
  },
  GameState: {
    STARTING: "STARTING",
    STARTED: "STARTED",
    SEARCHING_PLAYERS: "SEARCHING_PLAYERS",
    AUTHENTICATION_SUCCESS: "AUTHENTICATION_SUCCESS"
  }
});

/***/ }),

/***/ "./src/engine/Event.js":
/*!*****************************!*\
  !*** ./src/engine/Event.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Event; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);



/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */
var Event = /*#__PURE__*/function () {
  function Event(name) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Event);

    this.name = name;
    this.callbacks = [];
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Event, [{
    key: "registerCallback",
    value: function registerCallback(callback) {
      this.callbacks.push(callback);
    }
  }]);

  return Event;
}();



/***/ }),

/***/ "./src/engine/GameEngine.js":
/*!**********************************!*\
  !*** ./src/engine/GameEngine.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameEngine; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GameUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameUtils */ "./src/engine/GameUtils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Constants */ "./src/engine/Constants.js");
/* harmony import */ var _Reactor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Reactor */ "./src/engine/Reactor.js");
/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Grid */ "./src/engine/Grid.js");
/* harmony import */ var _Snake__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Snake */ "./src/engine/Snake.js");
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! seedrandom */ "./node_modules/seedrandom/index.js");
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(seedrandom__WEBPACK_IMPORTED_MODULE_7__);



/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */







var GameEngine = /*#__PURE__*/function () {
  function GameEngine(grid, snake, speed, enablePause, enableRetry, progressiveSpeed, aiStuckLimit) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GameEngine);

    // Game settings
    this.grid = grid;
    this.snakes = snake;
    this.speed = speed == null ? 8 : speed;
    this.initialSpeed = speed == null ? 8 : speed;
    this.initialSpeedUntouched = speed == null ? 8 : speed;
    this.enablePause = enablePause == null ? true : enablePause;
    this.enableRetry = enableRetry == null ? true : enableRetry;
    this.progressiveSpeed = progressiveSpeed == null ? false : progressiveSpeed;
    this.aiStuckLimit = aiStuckLimit == null ? 3 : aiStuckLimit;
    this.countBeforePlay = 3; // Game variables

    this.lastKey = -1;
    this.numFruit = 1;
    this.ticks = 0; // Game state variables

    this.firstStart = true;
    this.starting = false;
    this.paused = true;
    this.exited = false;
    this.killed = false;
    this.isReseted = true;
    this.gameOver = false;
    this.gameFinished = false; // only used if 2 and more snakes

    this.gameMazeWin = false; // used in maze mode

    this.scoreMax = false;
    this.errorOccurred = false;
    this.clientSidePredictionsMode = false; // Enable client-side predictions mode for the online game (disable some functions)

    this.aiStuck = false; // true if one AI is stuck - disabled if an human player is playing
    // Intervals, timeouts, frames

    this.intervalPlay; // Events

    this.reactor = new _Reactor__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.reactor.registerEvent("onStart");
    this.reactor.registerEvent("onPause");
    this.reactor.registerEvent("onContinue");
    this.reactor.registerEvent("onReset");
    this.reactor.registerEvent("onStop");
    this.reactor.registerEvent("onExit");
    this.reactor.registerEvent("onKill");
    this.reactor.registerEvent("onScoreIncreased");
    this.reactor.registerEvent("onUpdate");
    this.reactor.registerEvent("onUpdateCounter");
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(GameEngine, [{
    key: "init",
    value: function init() {
      if (!this.clientSidePredictionsMode) {
        if (this.snakes == null) {
          this.errorOccurred = true;
          this.snakes = [];
        } else if (!Array.isArray(this.snakes)) {
          this.snakes = [this.snakes];
        } else if (Array.isArray(this.snakes) && this.snakes.length <= 0 || this.grid.maze && this.snakes.length > 1) {
          this.errorOccurred = true;
        }

        if (this.grid instanceof _Grid__WEBPACK_IMPORTED_MODULE_5__["default"] == false) {
          this.errorOccurred = true;
        } else if (!this.errorOccurred) {
          this.initGridAndSnakes(); // Init Snake colors

          var startHue = _GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].randRange(0, 360, this.grid ? new seedrandom__WEBPACK_IMPORTED_MODULE_7___default.a(this.grid.seedGame) : null);

          for (var i = 0; i < this.snakes.length; i++) {
            if (this.snakes[i] instanceof _Snake__WEBPACK_IMPORTED_MODULE_6__["default"] == false) {
              this.errorOccurred = true;
            } else {
              startHue = _GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].addHue(startHue, Math.round(360 / this.snakes.length));
              this.snakes[i].color = startHue;
            }
          }
        }
      }
    }
  }, {
    key: "initGridAndSnakes",
    value: function initGridAndSnakes() {
      this.grid.reset();
      this.grid.init();

      if (this.snakes != null) {
        for (var i = 0; i < this.snakes.length; i++) {
          this.snakes[i].reset();
        }

        for (var _i = 0; _i < this.snakes.length; _i++) {
          this.snakes[_i].init();
        }
      }

      this.grid.setFruit(this.snakes.length);
    }
  }, {
    key: "reset",
    value: function reset() {
      this.paused = true;
      this.isReseted = true;
      this.exited = false;
      this.clearIntervalPlay();
      this.numFruit = 1;
      this.ticks = 0;
      this.lastKey = -1;
      this.scoreMax = false;
      this.errorOccurred = false;
      this.gameOver = false;
      this.gameFinished = false;
      this.gameMazeWin = false;
      this.starting = false;
      this.initialSpeed = this.initialSpeedUntouched;
      this.speed = this.initialSpeedUntouched;
      this.aiStuck = false;

      if (this.grid.seedGrid) {
        this.grid.seedGrid = "" + (parseInt(this.grid.seedGrid) + 1);
      }

      if (this.grid.seedGame) {
        this.grid.seedGame = "" + (parseInt(this.grid.seedGame) + 1);
      }

      this.initGridAndSnakes();
      this.reactor.dispatchEvent("onReset");
      this.start();
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      this.reactor.dispatchEvent("onUpdateCounter");

      if (!this.errorOccurred) {
        if (this.snakes != null) {
          for (var i = 0; i < this.snakes.length; i++) {
            if (this.snakes[i].errorInit) {
              this.errorOccurred = true;
              this.stop();
            }
          }
        }

        if (this.paused && !this.gameOver && !this.killed && !this.scoreMax && !this.starting) {
          this.starting = true;

          if (!this.firstStart) {
            this.reactor.dispatchEvent("onContinue");
          }

          this.countBeforePlay = 3;
          this.clearIntervalPlay();
          this.reactor.dispatchEvent("onUpdateCounter");
          this.intervalPlay = setInterval(function () {
            _this.countBeforePlay--;

            _this.reactor.dispatchEvent("onUpdateCounter");

            if (_this.countBeforePlay < 0) {
              _this.forceStart();
            }
          }, 1000);
        }
      }
    }
  }, {
    key: "forceStart",
    value: function forceStart() {
      this.clearIntervalPlay();
      this.countBeforePlay = -1;
      this.paused = false;
      this.isReseted = false;
      this.firstStart = false;
      this.starting = false;
      this.reactor.dispatchEvent("onStart");
      this.tick();
    }
  }, {
    key: "clearIntervalPlay",
    value: function clearIntervalPlay() {
      clearInterval(this.intervalPlay);
    }
  }, {
    key: "continue",
    value: function _continue() {
      if (!this.clientSidePredictionsMode) {
        this.start();
        this.reactor.dispatchEvent("onContinue");
      }
    }
  }, {
    key: "stop",
    value: function stop(finish) {
      if (!this.gameOver && !this.clientSidePredictionsMode) {
        this.paused = true;
        this.gameOver = true;
        if (finish) this.gameFinished = true;
        this.clearIntervalPlay();
        this.reactor.dispatchEvent("onStop");
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      if (!this.paused && !this.clientSidePredictionsMode) {
        this.paused = true;
        this.clearIntervalPlay();
        this.reactor.dispatchEvent("onPause");
      }
    }
  }, {
    key: "kill",
    value: function kill() {
      if (!this.killed) {
        this.paused = true;
        this.gameOver = true;
        this.killed = true;

        if (this.snakes != null) {
          for (var i = 0; i < this.snakes.length; i++) {
            this.snakes[i].kill();
            this.snakes[i] = null;
          }
        }

        this.clearIntervalPlay();
        this.grid = null;
        this.snakes = null;
        this.reactor.dispatchEvent("onKill");
      }
    }
  }, {
    key: "exit",
    value: function exit() {
      if (!this.exited) {
        this.stop();
        this.exited = true;
        this.reactor.dispatchEvent("onExit");
      }
    }
  }, {
    key: "destroySnakes",
    value: function destroySnakes(exceptionIds, types) {
      for (var i = 0; i < this.snakes.length; i++) {
        if (exceptionIds && Array.isArray(exceptionIds) && exceptionIds.indexOf(i) < 0 && types.indexOf(this.snakes[i].player) > -1) this.snakes[i].setGameOver(this.ticks);
      }
    }
  }, {
    key: "getNBPlayer",
    value: function getNBPlayer(type) {
      var numPlayer = 0;

      if (this.snakes != null) {
        for (var i = 0; i < this.snakes.length; i++) {
          if (this.snakes[i].player == type) {
            numPlayer++;
          }
        }
      }

      return numPlayer;
    }
  }, {
    key: "getPlayer",
    value: function getPlayer(num, type) {
      var numPlayer = 0;

      if (this.snakes != null) {
        for (var i = 0; i < this.snakes.length; i++) {
          if (this.snakes[i].player == type) {
            numPlayer++;
          }

          if (numPlayer == num) {
            return this.snakes[i];
          }
        }
      }

      return null;
    }
  }, {
    key: "tick",
    value: function tick() {
      var _this2 = this;

      setTimeout(function () {
        _this2.doTick();
      }, this.initialSpeed * _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Setting.TIME_MULTIPLIER);
    }
  }, {
    key: "doTick",
    value: function doTick() {
      if (!this.paused && !this.killed) {
        if (this.lastTime == 0) this.lastTime = time;
        this.ticks++;
        var scoreIncreased,
            setFruitError = false;

        if (this.grid && (!this.grid.maze || this.grid.mazeForceAuto || this.grid.maze && this.getNBPlayer(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HUMAN) <= 0 && this.getNBPlayer(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HYBRID_HUMAN_AI) <= 0 || this.grid.maze && (this.getNBPlayer(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HUMAN) > 0 || this.getNBPlayer(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HYBRID_HUMAN_AI) > 0) && (this.getPlayer(1, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HYBRID_HUMAN_AI) || this.getPlayer(1, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HUMAN)).lastKey != -1)) {
          for (var i = 0; i < this.snakes.length; i++) {
            var initialDirection = this.snakes[i].direction;
            var setFruit = false;
            var goldFruit = false;
            setFruitError = false;
            this.snakes[i].lastTailMoved = false;

            if (!this.snakes[i].gameOver && !this.snakes[i].scoreMax) {
              if (this.snakes[i].player == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HUMAN || this.snakes[i].player == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HYBRID_HUMAN_AI) {
                this.snakes[i].moveTo(this.snakes[i].lastKey);
                this.snakes[i].lastKey = -1;
              } else if (this.snakes[i].player == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.AI && (!this.clientSidePredictionsMode || this.clientSidePredictionsMode && this.snakes[i].aiLevel != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].AiLevel.RANDOM)) {
                this.snakes[i].moveTo(this.snakes[i].ai());
              }

              var headSnakePos = this.snakes[i].getHeadPosition();

              if (this.snakes[i].player == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HYBRID_HUMAN_AI && this.grid.isDeadPosition(this.snakes[i].getNextPosition(headSnakePos, this.snakes[i].direction))) {
                this.snakes[i].direction = initialDirection;
                this.snakes[i].moveTo(this.snakes[i].ai());
                this.snakes[i].lastKey = -1;
              }

              headSnakePos = this.snakes[i].getNextPosition(headSnakePos, this.snakes[i].direction);

              if (this.grid.isDeadPosition(headSnakePos)) {
                this.snakes[i].setGameOver(this.ticks);
              } else {
                if (this.grid.get(headSnakePos) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT || this.grid.get(headSnakePos) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT_GOLD) {
                  if (this.grid.get(headSnakePos) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT) {
                    this.snakes[i].score++;
                    this.grid.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, this.grid.fruitPos);
                    this.grid.fruitPos = null;
                  } else if (this.grid.get(headSnakePos) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT_GOLD) {
                    this.snakes[i].score += 3;
                    this.grid.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, this.grid.fruitPosGold);
                    this.grid.fruitPosGold = null;
                    goldFruit = true;
                  }

                  scoreIncreased = true;
                  this.snakes[i].insert(headSnakePos);

                  if (this.grid.maze) {
                    this.gameMazeWin = true;
                    this.gameFinished = true;
                    this.stop();
                  } else if (this.snakes[i].hasMaxScore() && this.snakes.length <= 1) {
                    this.scoreMax = true;
                    this.snakes[i].scoreMax = true;
                    this.stop();
                  } else {
                    this.numFruit++;
                    if (!goldFruit) setFruit = true;
                  }

                  if (this.snakes.length <= 1 && this.progressiveSpeed && this.snakes[i].score > 0 && this.initialSpeed > 1) {
                    this.initialSpeed = Math.ceil(-this.initialSpeedUntouched / 100 * this.snakes[i].score + this.initialSpeedUntouched);
                    this.initialSpeed = this.initialSpeed < 1 ? 1 : this.initialSpeed;
                  }
                } else {
                  this.snakes[i].insert(headSnakePos);

                  if (!this.grid.maze) {
                    this.snakes[i].remove();
                    this.snakes[i].lastTailMoved = true;
                  }
                }
              }
            }

            if (!this.scoreMax && setFruit && !this.clientSidePredictionsMode) {
              setFruitError = !this.grid.setFruit(this.snakes.length);
            }
          }

          if (!this.scoreMax && !setFruitError && (this.grid.detectCorridor(this.grid.fruitPos) || this.grid.isFruitSurrounded(this.grid.fruitPos, true)) && !this.clientSidePredictionsMode) {
            setFruitError = !this.grid.setFruit(this.snakes.length);
          }

          if (!this.scoreMax && this.grid.fruitPosGold != null && (this.grid.detectCorridor(this.grid.fruitPosGold) || this.grid.isFruitSurrounded(this.grid.fruitPosGold, true))) {
            this.grid.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, this.grid.fruitPosGold);
            this.grid.fruitPosGold = null;
          }

          var nbOver = 0;

          for (var j = 0; j < this.snakes.length; j++) {
            (this.snakes[j].gameOver || this.snakes[j].scoreMax) && nbOver++;
          } // Checking if the AIs are all stuck


          var endGameAIStuck = false;

          for (var k = 0; k < this.snakes.length; k++) {
            if (!this.snakes[k].gameOver && this.snakes[k].isAIStuck(1, 1)) {
              this.aiStuck = true;

              if (this.snakes[k].isAIStuck(this.aiStuckLimit, this.aiStuckLimit)) {
                // Limit of aiStuckLimit loops - end the game
                endGameAIStuck = true;
              } else {
                endGameAIStuck = false;
              }
            } else if ((this.snakes[k].player == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HUMAN || this.snakes[k].player == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.HYBRID_HUMAN_AI) && !this.snakes[k].gameOver || this.snakes[k].player == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].PlayerType.AI && !this.snakes[k].gameOver) {
              this.aiStuck = false;
              endGameAIStuck = false;
              break;
            }
          }

          if (nbOver >= this.snakes.length || setFruitError || endGameAIStuck) {
            this.stop();

            if (this.snakes.length > 1) {
              this.gameFinished = true;
            }
          }

          this.reactor.dispatchEvent("onUpdate");

          if (scoreIncreased) {
            this.reactor.dispatchEvent("onScoreIncreased");
          }
        }

        this.tick();
      }
    }
  }, {
    key: "onReset",
    value: function onReset(callback) {
      this.reactor.addEventListener("onReset", callback);
    }
  }, {
    key: "onStart",
    value: function onStart(callback) {
      this.reactor.addEventListener("onStart", callback);
    }
  }, {
    key: "onContinue",
    value: function onContinue(callback) {
      this.reactor.addEventListener("onContinue", callback);
    }
  }, {
    key: "onStop",
    value: function onStop(callback) {
      this.reactor.addEventListener("onStop", callback);
    }
  }, {
    key: "onPause",
    value: function onPause(callback) {
      this.reactor.addEventListener("onPause", callback);
    }
  }, {
    key: "onExit",
    value: function onExit(callback) {
      this.reactor.addEventListener("onExit", callback);
    }
  }, {
    key: "onKill",
    value: function onKill(callback) {
      this.reactor.addEventListener("onKill", callback);
    }
  }, {
    key: "onScoreIncreased",
    value: function onScoreIncreased(callback) {
      this.reactor.addEventListener("onScoreIncreased", callback);
    }
  }, {
    key: "onUpdate",
    value: function onUpdate(callback) {
      this.reactor.addEventListener("onUpdate", callback);
    }
  }, {
    key: "onUpdateCounter",
    value: function onUpdateCounter(callback) {
      this.reactor.addEventListener("onUpdateCounter", callback);
    }
  }]);

  return GameEngine;
}();



/***/ }),

/***/ "./src/engine/GameGroup.js":
/*!*********************************!*\
  !*** ./src/engine/GameGroup.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameGroup; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Reactor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Reactor */ "./src/engine/Reactor.js");



/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */


var GameGroup = /*#__PURE__*/function () {
  function GameGroup(games) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, GameGroup);

    this.games = games == undefined ? [] : games;
    this.reactor = new _Reactor__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.reactor.registerEvent("onStart");
    this.reactor.registerEvent("onPause");
    this.reactor.registerEvent("onContinue");
    this.reactor.registerEvent("onStop");
    this.reactor.registerEvent("onReset");
    this.reactor.registerEvent("onExit");
    this.reactor.registerEvent("onScoreIncreased");
    this.init();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(GameGroup, [{
    key: "init",
    value: function init() {
      var _this = this;

      for (var i = 0; i < this.games.length; i++) {
        if (i == 0) {
          this.games[i].enableKeyMenu = true;
        }

        this.games[i].onPause(function (i) {
          _this.pauseAll(i);
        }.bind(null, i));
        this.games[i].onContinue(function (i) {
          _this.startAll(i);
        }.bind(null, i));
        this.games[i].onExit(function (i) {
          _this.checkExit(i);
        }.bind(null, i));
        this.games[i].onStop(function (i) {
          _this.checkStop(i);
        }.bind(null, i));
        this.games[i].onReset(function (i) {
          _this.resetAll(i);
        }.bind(null, i));
        this.games[i].onScoreIncreased(function (i) {
          _this.checkOnScoreIncreased(i);
        }.bind(null, i));
      }
    }
  }, {
    key: "start",
    value: function start() {
      this.startAll(null);
    }
  }, {
    key: "startAll",
    value: function startAll(game) {
      for (var i = 0; i < this.games.length; i++) {
        if (this.games[i].paused && !this.games[i].starting && (game == null || i != game)) {
          this.games[i].start();
        }
      }

      this.reactor.dispatchEvent("onStart");
    }
  }, {
    key: "onStart",
    value: function onStart(callback) {
      this.reactor.addEventListener("onStart", callback);
    }
  }, {
    key: "pauseAll",
    value: function pauseAll(game) {
      for (var i = 0; i < this.games.length; i++) {
        if (!this.games[i].paused && (game == null || i != game)) {
          this.games[i].pause();
        }
      }

      this.reactor.dispatchEvent("onPause");
    }
  }, {
    key: "onPause",
    value: function onPause(callback) {
      this.reactor.addEventListener("onPause", callback);
    }
  }, {
    key: "resetAll",
    value: function resetAll(game) {
      for (var i = 0; i < this.games.length; i++) {
        if (!this.games[i].isReseted && (game == null || i != game)) {
          this.games[i].reset();
        }
      }

      this.reactor.dispatchEvent("onReset");
    }
  }, {
    key: "onReset",
    value: function onReset(callback) {
      this.reactor.addEventListener("onReset", callback);
    }
  }, {
    key: "checkExit",
    value: function checkExit(game) {
      var allExited = true;

      for (var i = 0; i < this.games.length; i++) {
        if (!this.games[i].exited) {
          allExited = false;
        }
      }

      if (allExited) {
        this.reactor.dispatchEvent("onExit");
      } else {
        this.startAll(game);
      }
    }
  }, {
    key: "onExit",
    value: function onExit(callback) {
      this.reactor.addEventListener("onExit", callback);
    }
  }, {
    key: "checkStop",
    value: function checkStop() {
      var allStopped = true;

      for (var i = 0; i < this.games.length; i++) {
        if (!this.games[i].gameOver) {
          allStopped = false;
        }
      }

      if (allStopped) {
        this.reactor.dispatchEvent("onStop");
      }
    }
  }, {
    key: "onStop",
    value: function onStop(callback) {
      this.reactor.addEventListener("onStop", callback);
    }
  }, {
    key: "stopAll",
    value: function stopAll(finished) {
      for (var i = 0; i < this.games.length; i++) {
        if (finished) {
          this.games[i].finish(true);
        } else {
          this.games[i].stop();
        }
      }
    }
  }, {
    key: "killAll",
    value: function killAll() {
      for (var i = 0; i < this.games.length; i++) {
        this.games[i].kill();
      }
    }
  }, {
    key: "checkOnScoreIncreased",
    value: function checkOnScoreIncreased() {
      this.reactor.dispatchEvent("onScoreIncreased");
    }
  }, {
    key: "onScoreIncreased",
    value: function onScoreIncreased(callback) {
      this.reactor.addEventListener("onScoreIncreased", callback);
    }
  }, {
    key: "setDisplayFPS",
    value: function setDisplayFPS(value) {
      for (var i = 0; i < this.games.length; i++) {
        this.games[i].setDisplayFPS(value);
      }
    }
  }, {
    key: "setNotification",
    value: function setNotification(notification) {
      for (var i = 0; i < this.games.length; i++) {
        this.games[i].setNotification(notification.copy());
      }
    }
  }, {
    key: "closeNotification",
    value: function closeNotification() {
      for (var i = 0; i < this.games.length; i++) {
        this.games[i].setNotification(null);
      }
    }
  }, {
    key: "errorOccurred",
    value: function errorOccurred() {
      for (var i = 0; i < this.games.length; i++) {
        if (this.games[i].errorOccurred) return true;
      }

      return false;
    }
  }, {
    key: "closeRanking",
    value: function closeRanking() {
      for (var i = 0; i < this.games.length; i++) {
        this.games[i].closeRanking();
      }

      return false;
    }
  }, {
    key: "destroySnakes",
    value: function destroySnakes(exceptionIds, types) {
      for (var i = 0; i < this.games.length; i++) {
        this.games[i].destroySnakes(exceptionIds, types);

        if (exceptionIds && Array.isArray(exceptionIds)) {
          for (var j = 0; j < exceptionIds.length; j++) {
            exceptionIds[j] -= 1;
          }
        }
      }
    }
  }, {
    key: "getWinners",
    value: function getWinners() {
      var winners = [];
      var index = [];
      var maxScore = -1;

      for (var i = 0; i < this.games.length; i++) {
        for (var j = 0; j < this.games[i].snakes.length; j++) {
          if (this.games[i].snakes[j].score > maxScore) {
            maxScore = this.games[i].snakes[j].score;
          }
        }
      }

      if (maxScore >= 0) {
        var idx = 0;

        for (var _i = 0; _i < this.games.length; _i++) {
          for (var _j = 0; _j < this.games[_i].snakes.length; _j++) {
            if (this.games[_i].snakes[_j].score >= maxScore) {
              winners.push(this.games[_i].snakes[_j]);
              index.push(idx);
            }

            idx++;
          }
        }
      }

      return {
        winners: winners,
        score: maxScore,
        index: index
      };
    }
  }]);

  return GameGroup;
}();



/***/ }),

/***/ "./src/engine/GameUtils.js":
/*!*********************************!*\
  !*** ./src/engine/GameUtils.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */
/* harmony default export */ __webpack_exports__["default"] = ({
  randRange: function randRange(min, max, rng) {
    // Return an integer between min (inclusive) and max (inclusive)
    return Math.floor((rng ? rng() : Math.random()) * (max - min + 1)) + min;
  },
  addHue: function addHue(hue, add) {
    var res = hue + add;

    if (res > 360) {
      return res - 360;
    } else if (res < 0) {
      return 360 + res;
    }

    return res;
  },
  shuffle: function shuffle(a, rng) {
    var j, x;

    for (var i = a.length - 1; i > 0; i--) {
      j = Math.floor((rng ? rng() : Math.random()) * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }

    return a;
  },
  millisecondsFormat: function millisecondsFormat(milliseconds) {
    milliseconds /= 1000;
    return ("0" + Math.trunc(milliseconds / 60)).slice(-2) + ":" + ("0" + Math.trunc(milliseconds % 60)).slice(-2);
  },
  secondsFormat: function secondsFormat(seconds) {
    return this.millisecondsFormat(seconds * 1000);
  }
});

/***/ }),

/***/ "./src/engine/Grid.js":
/*!****************************!*\
  !*** ./src/engine/Grid.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Grid; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GameUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameUtils */ "./src/engine/GameUtils.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Constants */ "./src/engine/Constants.js");
/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Position */ "./src/engine/Position.js");
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! seedrandom */ "./node_modules/seedrandom/index.js");
/* harmony import */ var seedrandom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(seedrandom__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _libs_lowlight_astar_min__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../libs/lowlight.astar.min */ "./libs/lowlight.astar.min.js");
/* harmony import */ var _libs_lowlight_astar_min__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_libs_lowlight_astar_min__WEBPACK_IMPORTED_MODULE_6__);



/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */






var Grid = /*#__PURE__*/function () {
  function Grid(width, height, generateWalls, borderWalls, maze, customGrid, mazeForceAuto, seedGrid, seedGame, probGoldFruitIncrease) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Grid);

    this.width = width == undefined ? 20 : width;
    this.height = height == undefined ? 20 : height;
    this.generateWalls = generateWalls == undefined ? false : generateWalls;
    this.borderWalls = borderWalls == undefined ? false : borderWalls;
    this.maze = maze == undefined ? false : maze;
    this.mazeFirstPosition = new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](1, 1, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT);
    this.mazeForceAuto = mazeForceAuto == undefined ? false : mazeForceAuto;
    this.grid;
    this.initialGrid;
    this.fruitPos;
    this.fruitPosGold;
    this.customGrid = customGrid;
    this.seedGrid = seedGrid ? "" + parseInt(seedGrid) : undefined;
    this.seedGame = seedGrid ? "" + parseInt(seedGame) : undefined;
    this.rngGrid;
    this.rngGame;
    this.probGoldFruitIncrease = probGoldFruitIncrease == undefined ? false : probGoldFruitIncrease;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Grid, [{
    key: "init",
    value: function init() {
      if (this.customGrid != undefined || this.initialGrid != undefined) {
        var gridToCopy;

        if (this.initialGrid != undefined) {
          gridToCopy = this.initialGrid;
        } else {
          gridToCopy = this.customGrid;
        }

        this.height = gridToCopy.length;
        this.width = gridToCopy[0].length;
        this.initialGrid = new Array(this.height);
        this.grid = new Array(this.height);

        for (var i = 0; i < this.height; i++) {
          this.initialGrid[i] = gridToCopy[i].slice();
          this.grid[i] = gridToCopy[i].slice();
        }
      } else {
        this.grid = new Array(this.height);

        for (var _i = 0; _i < this.height; _i++) {
          this.grid[_i] = new Array(this.width);

          for (var j = 0; j < this.width; j++) {
            if (this.borderWalls && (_i == 0 || _i == this.height - 1 || j == 0 || j == this.width - 1) || this.generateWalls && this.rngGrid && this.rngGrid() > 0.65 || this.maze) {
              this.grid[_i][j] = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.WALL;
            } else {
              this.grid[_i][j] = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY;
            }
          }
        }

        if (this.maze) {
          this.generateMaze();
        } else if (this.generateWalls) {
          this.fixWalls(this.borderWalls);
        }
      }

      this.fruitPosGold = null;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.grid = undefined;
      this.initialGrid = undefined;
      this.fruitPos = undefined;
      this.fruitPosGold = undefined;
      this.rngGrid = new seedrandom__WEBPACK_IMPORTED_MODULE_5___default.a(this.seedGrid);
      this.rngGame = new seedrandom__WEBPACK_IMPORTED_MODULE_5___default.a(this.seedGame);
    }
  }, {
    key: "fixWalls",
    value: function fixWalls(borderWalls) {
      var startY, startX, endY, endX;

      if (borderWalls) {
        startY = 1;
        endY = this.height - 1;
        startX = 1;
        endX = this.width - 1;
      } else {
        startY = 0;
        endY = this.height;
        startX = 0;
        endX = this.width;
      }

      for (var i = startY; i < endY; i++) {
        for (var j = startX; j < endX; j++) {
          var currentPos = new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](j, i);
          var upperCase = this.getNextPosition(currentPos, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.UP);
          var upperLeftCase = this.getNextPosition(upperCase, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT);
          var upperRightCase = this.getNextPosition(upperCase, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT);
          var downCase = this.getNextPosition(currentPos, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM);
          var downLeftCase = this.getNextPosition(downCase, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT);
          var downRightCase = this.getNextPosition(downCase, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT);

          if (this.get(upperLeftCase) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.WALL || this.get(upperRightCase) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.WALL || this.get(downLeftCase) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.WALL || this.get(downRightCase) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.WALL) {
            this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, currentPos);
          }
        }
      }
    }
  }, {
    key: "maze_recursion",
    value: function maze_recursion(r, c) {
      var directions = _GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].shuffle([_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.UP, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT], this.rngGrid);

      for (var i = 0; i < directions.length; i++) {
        switch (directions[i]) {
          case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.UP:
            if (r - 2 <= 0) continue;

            if (this.get(new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c, r - 2)) != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY) {
              this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c, r - 2));
              this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c, r - 1));
              this.maze_recursion(r - 2, c);
            }

            break;

          case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT:
            if (c + 2 >= this.width - 1) continue;

            if (this.get(new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c + 2, r)) != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY) {
              this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c + 2, r));
              this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c + 1, r));
              this.maze_recursion(r, c + 2);
            }

            break;

          case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM:
            if (r + 2 >= this.height - 1) continue;

            if (this.get(new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c, r + 2)) != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY) {
              this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c, r + 2));
              this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c, r + 1));
              this.maze_recursion(r + 2, c);
            }

            break;

          case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT:
            if (c - 2 <= 0) continue;

            if (this.get(new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c - 2, r)) != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY) {
              this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c - 2, r));
              this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](c - 1, r));
              this.maze_recursion(r, c - 2);
            }

            break;
        }
      }
    }
  }, {
    key: "generateMaze",
    value: function generateMaze() {
      this.mazeFirstPosition = new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](1, 1, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT);
      this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, this.mazeFirstPosition);
      this.maze_recursion(1, 1);
    }
  }, {
    key: "set",
    value: function set(value, position) {
      this.grid[position.y][position.x] = value;
    }
  }, {
    key: "get",
    value: function get(position) {
      return this.grid[position.y][position.x];
    }
  }, {
    key: "valToChar",
    value: function valToChar(value) {
      switch (value) {
        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY:
          return "-";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE:
          return "o";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE_DEAD:
          return "O";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT:
          return "x";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.WALL:
          return "#";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SURROUNDED:
          return "/";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT_GOLD:
          return "X";
      }
    }
  }, {
    key: "getImageCase",
    value: function getImageCase(position) {
      switch (this.get(position)) {
        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.WALL:
          return "wall.png";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT:
          return "fruit.png";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT_GOLD:
          return "fruit_gold.png";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY:
          return "";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE:
          return "";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE_DEAD:
          return "";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SURROUNDED:
          return "";

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.CROSSED:
          return "";
      }

      return "unknown.png";
    }
  }, {
    key: "getGraph",
    value: function getGraph(ignoreSnakePos) {
      var res = new Array(this.height);

      for (var i = 0; i < this.height; i++) {
        res[i] = new Array(this.width);

        for (var j = 0; j < this.width; j++) {
          var currentPos = new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](j, i);

          if (ignoreSnakePos && this.get(currentPos) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE) {
            res[i][j] = 0;
          } else if (this.isDeadPosition(currentPos)) {
            res[i][j] = 1;
          } else {
            res[i][j] = 0;
          }
        }
      }

      return res;
    }
  }, {
    key: "getRandomPosition",
    value: function getRandomPosition() {
      return new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](_GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].randRange(0, this.width - 1, this.rngGame), _GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].randRange(0, this.height - 1, this.rngGame));
    }
  }, {
    key: "setFruit",
    value: function setFruit(numberPlayers, gold) {
      var tried = [1];

      if (!gold && this.fruitPos != null && this.get(this.fruitPos) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT) {
        this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, this.fruitPos);
      }

      if (this.getTotal(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY) > 0) {
        var randomPos, isCorridor;

        do {
          randomPos = this.getRandomPosition();
          isCorridor = this.detectCorridor(randomPos);

          if (isCorridor && this.get(randomPos) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY) {
            this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SURROUNDED, randomPos);
          }

          if (this.getTotal(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY) <= 0) {
            if (this.fruitPosGold) {
              return true;
            } else {
              return false;
            }
          }
        } while (this.get(randomPos) != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY || this.isFruitSurrounded(randomPos, true) || this.maze && !this.testFruitMaze(randomPos, tried) || isCorridor);

        if (gold) {
          this.fruitPosGold = randomPos;
          this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT_GOLD, randomPos);
        } else {
          this.fruitPos = randomPos;
          this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT, randomPos);
        }
      } else if (this.getTotal(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY) <= 0 && this.fruitPosGold) {
        return true;
      } else {
        return false;
      }

      if (!this.maze && this.fruitPosGold == null && _GameUtils__WEBPACK_IMPORTED_MODULE_2__["default"].randRange(1, this.probGoldFruitIncrease ? 3 : numberPlayers > 1 ? _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Setting.PROB_GOLD_FRUIT_MULTIPLE_PLAYERS : _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Setting.PROB_GOLD_FRUIT_1_PLAYER, this.rngGame) == 1) {
        this.setFruit(numberPlayers, true);
      }

      return true;
    }
  }, {
    key: "testFruitMaze",
    value: function testFruitMaze(position, tried) {
      // Maze mode: avoid putting the fruit too close to the Snake
      var grid = this.getGraph(true);
      var graph = new _libs_lowlight_astar_min__WEBPACK_IMPORTED_MODULE_6__["Astar"].Configuration(grid, {
        order: "yx",
        torus: false,
        diagonals: false,
        cutting: false,
        cost: function cost(a, b) {
          return b == 1 ? null : 1;
        }
      });
      var path = graph.path({
        x: this.mazeFirstPosition.x,
        y: this.mazeFirstPosition.y
      }, {
        x: position.x,
        y: position.y
      });

      if (path.length < Math.ceil(this.getTotal(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY) / (1 * Math.ceil(tried[0] / 4)))) {
        tried[0]++;
        return false;
      } else {
        tried[0]++;
        return true;
      }
    }
  }, {
    key: "isCaseSurrounded",
    value: function isCaseSurrounded(position, fill, foundVals, forbiddenVals) {
      if (!position) return false;
      var gridCopy = JSON.parse(JSON.stringify(this.grid));
      var checkList = [position];

      while (checkList.length > 0) {
        var currentPosition = checkList[0];
        checkList.shift();
        var directions = [this.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.UP), this.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM), this.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT), this.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT)]; // UP, DOWN, LEFT, RIGHT

        for (var i = 0; i < directions.length; i++) {
          if (gridCopy[directions[i].y][directions[i].x] != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.CROSSED && forbiddenVals.indexOf(this.get(directions[i])) > -1) {
            checkList.push(directions[i]);

            if (foundVals.indexOf(this.get(directions[i])) > -1) {
              return false;
            }

            if (fill && this.get(directions[i]) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY) {
              this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SURROUNDED, directions[i]);
              gridCopy[directions[i].y][directions[i].x] = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SURROUNDED;
            } else {
              gridCopy[directions[i].y][directions[i].x] = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.CROSSED;
            }
          }
        }
      }

      if (fill && (this.get(position) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY || this.get(position) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT) || this.get(position) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.FRUIT_GOLD) {
        this.set(_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SURROUNDED, position);
      }

      return true;
    }
  }, {
    key: "isFruitSurrounded",
    value: function isFruitSurrounded(position, fill) {
      var surrounded = this.isCaseSurrounded(position, false, [_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE], [_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE]);

      if (surrounded && fill) {
        this.isCaseSurrounded(position, true, [_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE], [_Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.EMPTY, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE]);
      }

      return surrounded;
    }
  }, {
    key: "detectCorridor",
    value: function detectCorridor(position) {
      var gridCopy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.grid ? JSON.parse(JSON.stringify(this.grid)) : null;
      if (this.maze || !position || !gridCopy) return false;
      var posTop = this.getNextPosition(position, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.TOP);
      var posBottom = this.getNextPosition(position, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM);
      var posRight = this.getNextPosition(position, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT);
      var posLeft = this.getNextPosition(position, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT);
      var isDeadPositionTop = this.isDeadPosition(posTop, true, true);
      var isDeadPositionBottom = this.isDeadPosition(posBottom, true, true);
      var isDeadPositionRight = this.isDeadPosition(posRight, true, true);
      var isDeadPositionLeft = this.isDeadPosition(posLeft, true, true);
      var numDeadPositionArround = isDeadPositionTop + isDeadPositionBottom + isDeadPositionRight + isDeadPositionLeft;

      if (numDeadPositionArround <= 1 || this.isDeadPosition(position, true)) {
        return false;
      } else if (numDeadPositionArround >= 3) {
        return true;
      }

      gridCopy[position.y][position.x] = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.CROSSED;
      var corridorTop = gridCopy[posTop.y][posTop.x] != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.CROSSED ? this.detectCorridor(posTop, gridCopy) : false;
      var corridorBottom = gridCopy[posBottom.y][posBottom.x] != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.CROSSED ? this.detectCorridor(posBottom, gridCopy) : false;
      var corridorLeft = gridCopy[posLeft.y][posLeft.x] != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.CROSSED ? this.detectCorridor(posLeft, gridCopy) : false;
      var corridorRight = gridCopy[posRight.y][posRight.x] != _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.CROSSED ? this.detectCorridor(posRight, gridCopy) : false;

      if (corridorBottom || corridorTop || corridorLeft || corridorRight) {
        return true;
      }

      return false;
    }
  }, {
    key: "getOnLine",
    value: function getOnLine(type, line) {
      var tot = 0;

      for (var j = 0; j < this.width; j++) {
        if (this.get(new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](j, line)) == type) {
          tot++;
        }
      }

      return tot;
    }
  }, {
    key: "getTotal",
    value: function getTotal(type) {
      var tot = 0;

      for (var i = 0; i < this.height; i++) {
        tot += this.getOnLine(type, i);
      }

      return tot;
    }
  }, {
    key: "getNextPosition",
    value: function getNextPosition(oldPos, newDirection) {
      var position = new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](oldPos.x, oldPos.y, newDirection);

      switch (newDirection) {
        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT:
          position.x--;
          position.direction = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT;
          break;

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.UP:
          position.y--;
          position.direction = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.UP;
          break;

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT:
          position.x++;
          position.direction = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT;
          break;

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM:
          position.y++;
          position.direction = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM;
          break;

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Key.LEFT:
          position.x--;
          position.direction = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Key.LEFT;
          break;

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Key.UP:
          position.y--;
          position.direction = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Key.UP;
          break;

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Key.RIGHT:
          position.x++;
          position.direction = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT;
          break;

        case _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Key.BOTTOM:
          position.y++;
          position.direction = _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM;
          break;
      }

      if (position.x < 0) {
        position.x = this.width - 1;
      } else if (position.x >= this.width) {
        position.x = 0;
      }

      if (position.y < 0) {
        position.y = this.height - 1;
      } else if (position.y >= this.height) {
        position.y = 0;
      }

      return position;
    }
  }, {
    key: "getDirectionTo",
    value: function getDirectionTo(position, otherPosition) {
      if (this.getNextPosition(position, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.UP).equals(otherPosition)) {
        return _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.UP;
      } else if (this.getNextPosition(position, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM).equals(otherPosition)) {
        return _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM;
      } else if (this.getNextPosition(position, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT).equals(otherPosition)) {
        return _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT;
      } else if (this.getNextPosition(position, _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT).equals(otherPosition)) {
        return _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT;
      }

      return -1;
    }
  }, {
    key: "invertDirection",
    value: function invertDirection(direction) {
      if (direction == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.UP) {
        return _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM;
      } else if (direction == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.BOTTOM) {
        return _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.UP;
      } else if (direction == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT) {
        return _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT;
      } else if (direction == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.LEFT) {
        return _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].Direction.RIGHT;
      }

      return null;
    }
  }, {
    key: "isDeadPosition",
    value: function isDeadPosition(position, excludeSnake, includeSurrounded) {
      return !excludeSnake && this.get(position) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE || this.get(position) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.WALL || this.get(position) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SNAKE_DEAD || !!includeSurrounded && this.get(position) == _Constants__WEBPACK_IMPORTED_MODULE_3__["default"].CaseType.SURROUNDED;
    }
  }, {
    key: "toString",
    value: function toString() {
      var res = "";

      for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
          res += this.valToChar(this.get(new _Position__WEBPACK_IMPORTED_MODULE_4__["default"](j, i))) + " ";
        }

        res += "\n";
      }

      return res;
    }
  }]);

  return Grid;
}();



/***/ }),

/***/ "./src/engine/Position.js":
/*!********************************!*\
  !*** ./src/engine/Position.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Position; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./src/engine/Constants.js");



/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */


var Position = /*#__PURE__*/function () {
  function Position(x, y, direction) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Position);

    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Position, [{
    key: "copy",
    value: function copy() {
      return new Position(this.x, this.y, this.direction);
    }
  }, {
    key: "convertToKeyDirection",
    value: function convertToKeyDirection() {
      switch (this.direction) {
        case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP:
          return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.UP;

        case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT:
          return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.RIGHT;

        case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT:
          return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.LEFT;

        case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM:
          return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.BOTTOM;

        default:
          return this.direction;
      }
    }
  }, {
    key: "convertToSimpleDirection",
    value: function convertToSimpleDirection() {
      switch (this.direction) {
        case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.UP:
          return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP;

        case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.RIGHT:
          return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT;

        case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.LEFT:
          return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT;

        case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.BOTTOM:
          return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM;

        default:
          return this.direction;
      }
    }
  }, {
    key: "equals",
    value: function equals(otherPosition) {
      if (otherPosition != null) {
        return this.x == otherPosition.x && this.y == otherPosition.y;
      } else {
        return false;
      }
    }
  }]);

  return Position;
}();



/***/ }),

/***/ "./src/engine/Reactor.js":
/*!*******************************!*\
  !*** ./src/engine/Reactor.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Reactor; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Event */ "./src/engine/Event.js");



/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */


var Reactor = /*#__PURE__*/function () {
  function Reactor() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Reactor);

    this.events = {};
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Reactor, [{
    key: "registerEvent",
    value: function registerEvent(eventName) {
      this.events[eventName] = new _Event__WEBPACK_IMPORTED_MODULE_2__["default"](eventName);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(eventName, eventArgs) {
      var callbacks = this.events[eventName].callbacks;

      for (var i = 0, l = callbacks.length; i < l; i++) {
        callbacks[i](eventArgs);
      }
    }
  }, {
    key: "addEventListener",
    value: function addEventListener(eventName, callback) {
      this.events[eventName].registerCallback(callback);
    }
  }]);

  return Reactor;
}();



/***/ }),

/***/ "./src/engine/Snake.js":
/*!*****************************!*\
  !*** ./src/engine/Snake.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Snake; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Constants */ "./src/engine/Constants.js");
/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Position */ "./src/engine/Position.js");
/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Grid */ "./src/engine/Grid.js");
/* harmony import */ var _ai_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ai/index */ "./src/engine/ai/index.js");



/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */





var Snake = /*#__PURE__*/function () {
  function Snake(direction, length, grid, player, aiLevel, autoRetry, name, customAI) {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Snake);

    this.direction = direction == undefined ? _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT : direction;
    this.initialDirection = this.direction;
    this.initialLength = length == undefined ? 3 : length;
    this.initTriedDirections = [];
    this.errorInit = false;
    this.grid = grid || new _Grid__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.queue = [];
    this.lastKey = -1;
    this.lastTail;
    this.lastTailMoved;
    this.ticksDead = 0;
    this.player = player == undefined ? _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].PlayerType.HUMAN : player;
    this.aiLevel = aiLevel == undefined ? _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].AiLevel.DEFAULT : aiLevel;
    this.autoRetry = autoRetry == undefined ? false : autoRetry;
    this.score = 0;
    this.gameOver = false;
    this.scoreMax = false;
    this.color;
    this.name = name == undefined ? "Snake" : name;
    this.snakeAI = new _ai_index__WEBPACK_IMPORTED_MODULE_5__["SnakeAI"]();
    this.customAI = customAI;
    this.ticksWithoutAction = 0;
    this.initAI();
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Snake, [{
    key: "init",
    value: function init() {
      if (this.initialLength <= 0) {
        this.errorInit = true;
        return false;
      }

      if (this.grid.maze && this.initTriedDirections.length <= 0) {
        this.initialDirection = this.grid.mazeFirstPosition.direction;
        this.direction = this.initialDirection;
      }

      var spaceLineAvailable = 0;
      var spaceColAvailable = 0;

      if (this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT && this.initTriedDirections.indexOf(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT) == -1 || this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT && this.initTriedDirections.indexOf(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT) == -1) {
        for (var i = 0; i < this.grid.height; i++) {
          var emptyOnLine = 0;

          for (var j = 0; j < this.grid.width; j++) {
            if (this.grid.get(new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](j, i)) == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.EMPTY) {
              emptyOnLine++;
            } else {
              emptyOnLine = 0;
            }

            if (emptyOnLine >= this.initialLength) {
              spaceLineAvailable++;
              break;
            }
          }
        }
      } else if (this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP && this.initTriedDirections.indexOf(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP) == -1 || this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM && this.initTriedDirections.indexOf(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM) == -1) {
        for (var _i = 0; _i < this.grid.width; _i++) {
          var emptyOnCol = 0;

          for (var _j = 0; _j < this.grid.height; _j++) {
            if (this.grid.get(new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](_i, _j)) == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.EMPTY) {
              emptyOnCol++;
            } else {
              emptyOnCol = 0;
            }

            if (emptyOnCol >= this.initialLength) {
              spaceColAvailable++;
              break;
            }
          }
        }
      }

      this.initTriedDirections.push(this.initialDirection);

      if (spaceLineAvailable <= 0 && (this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT || this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT) || spaceColAvailable <= 0 && (this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP || this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM)) {
        if (this.initTriedDirections.indexOf(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT) == -1) {
          this.initialDirection = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT;
          this.direction = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT;
          return this.init();
        } else if (this.initTriedDirections.indexOf(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT) == -1) {
          this.initialDirection = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT;
          this.direction = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT;
          return this.init();
        } else if (this.initTriedDirections.indexOf(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP) == -1) {
          this.initialDirection = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP;
          this.direction = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP;
          return this.init();
        } else if (this.initTriedDirections.indexOf(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM) == -1) {
          this.initialDirection = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM;
          this.direction = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM;
          return this.init();
        }

        this.errorInit = true;
        return false;
      }

      var posNotValidated = true;
      var positionsToAdd = [];
      var startPos, currentPos;

      while (posNotValidated) {
        posNotValidated = false;

        if (this.grid.maze) {
          startPos = this.grid.mazeFirstPosition;
        } else {
          startPos = this.grid.getRandomPosition();
        }

        if (!startPos) {
          this.errorInit = true;
          return false;
        }

        currentPos = new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](startPos.x, startPos.y, this.initialDirection);
        positionsToAdd = [];

        for (var _i2 = this.initialLength - 1; _i2 >= 0; _i2--) {
          if (_i2 < this.initialLength - 1) {
            if (this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT) {
              currentPos = this.grid.getNextPosition(new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](currentPos.x, currentPos.y, this.initialDirection), _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT);
            } else if (this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT) {
              currentPos = this.grid.getNextPosition(new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](currentPos.x, currentPos.y, this.initialDirection), _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT);
            } else if (this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM) {
              currentPos = this.grid.getNextPosition(new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](currentPos.x, currentPos.y, this.initialDirection), _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM);
            } else if (this.initialDirection == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP) {
              currentPos = this.grid.getNextPosition(new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](currentPos.x, currentPos.y, this.initialDirection), _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP);
            }
          }

          if (this.grid.get(currentPos) != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.EMPTY) {
            posNotValidated = true;
          } else {
            positionsToAdd.push(new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](currentPos.x, currentPos.y, currentPos.direction));
          }
        }

        if (this.grid.maze && posNotValidated) {
          return this.init();
        }
      } // If the Snake is near a dead position


      var nearDeadPosition = false;

      if (!this.grid.maze) {
        var firstPosition = new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](positionsToAdd[positionsToAdd.length - 1].x, positionsToAdd[positionsToAdd.length - 1].y, this.direction);

        if (this.grid.isDeadPosition(this.grid.getNextPosition(firstPosition, _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP), false) && this.direction == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP || this.grid.isDeadPosition(this.grid.getNextPosition(firstPosition, _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM), false) && this.direction == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM || this.grid.isDeadPosition(this.grid.getNextPosition(firstPosition, _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT), false) && this.direction == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT || this.grid.isDeadPosition(this.grid.getNextPosition(firstPosition, _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT), false) && this.direction == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT) {
          nearDeadPosition = true;
          this.direction = this.grid.invertDirection(this.direction);
        }
      }

      for (var _i3 = 0; _i3 < positionsToAdd.length; _i3++) {
        if (nearDeadPosition) {
          var position = positionsToAdd[positionsToAdd.length - _i3 - 1];
          position.direction = this.grid.invertDirection(position.direction);
          this.insert(positionsToAdd[positionsToAdd.length - _i3 - 1]);
        } else {
          this.insert(positionsToAdd[_i3]);
        }
      }

      if (this.grid.maze && this.player == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].PlayerType.HYBRID_HUMAN_AI) {
        this.player = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].PlayerType.HUMAN;
      }

      if (this.player == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].PlayerType.HYBRID_HUMAN_AI) {
        this.aiLevel = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].AiLevel.HIGH;
      }

      this.lastTail = this.get(this.queue.length - 1);
      return true;
    }
  }, {
    key: "initAI",
    value: function initAI() {
      if (!this.customAI) {
        switch (this.aiLevel) {
          case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].AiLevel.RANDOM:
            this.snakeAI = new _ai_index__WEBPACK_IMPORTED_MODULE_5__["SnakeAIRandom"]();
            break;

          case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].AiLevel.LOW:
            this.snakeAI = new _ai_index__WEBPACK_IMPORTED_MODULE_5__["SnakeAILow"]();
            break;

          case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].AiLevel.DEFAULT:
            this.snakeAI = new _ai_index__WEBPACK_IMPORTED_MODULE_5__["SnakeAINormal"]();
            break;

          case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].AiLevel.HIGH:
            this.snakeAI = new _ai_index__WEBPACK_IMPORTED_MODULE_5__["SnakeAIHigh"]();
            break;

          case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].AiLevel.ULTRA:
            this.snakeAI = new _ai_index__WEBPACK_IMPORTED_MODULE_5__["SnakeAIHigh"]();
            break;

          case _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].AiLevel.MOCK:
            this.snakeAI = new _ai_index__WEBPACK_IMPORTED_MODULE_5__["SnakeAIMock"]();
            break;

          default:
            this.snakeAI = new _ai_index__WEBPACK_IMPORTED_MODULE_5__["SnakeAINormal"]();
            break;
        }
      } else {
        this.snakeAI = this.customAI;
        this.aiLevel = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].AiLevel.CUSTOM;
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.direction = this.initialDirection;
      this.initTriedDirections = [];
      this.errorInit = false;
      this.queue = [];
      this.score = 0;
      this.gameOver = false;
      this.scoreMax = false;
      this.lastTailMoved = true;
      this.lastTail = undefined;
      this.lastKey = -1;
      this.ticksDead = 0;
      this.ticksWithoutAction = 0;
      if (this.snakeAI) this.snakeAI.aiFruitGoal = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT;
    }
  }, {
    key: "insert",
    value: function insert(position) {
      this.queue.unshift(position);
      this.grid.set(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.SNAKE, position);
    }
  }, {
    key: "remove",
    value: function remove() {
      var last = this.queue.pop();
      this.grid.set(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.EMPTY, last);
      this.lastTail = last;
    }
  }, {
    key: "length",
    value: function length() {
      return this.queue.length;
    }
  }, {
    key: "get",
    value: function get(index) {
      if (this.queue[index] != null) {
        return this.queue[index].copy();
      } else {
        return null;
      }
    }
  }, {
    key: "set",
    value: function set(index, position) {
      if (index >= 0 && index < this.length()) {
        this.queue[index] = position;
      }
    }
  }, {
    key: "getHeadPosition",
    value: function getHeadPosition() {
      return this.get(0);
    }
  }, {
    key: "getTailPosition",
    value: function getTailPosition() {
      return this.get(this.length() - 1);
    }
  }, {
    key: "hasMaxScore",
    value: function hasMaxScore() {
      return this.grid.getTotal(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.EMPTY) <= 0 && !this.grid.fruitPosGold && !this.grid.fruitPos;
    }
  }, {
    key: "setGameOver",
    value: function setGameOver(ticks) {
      this.gameOver = true;
      this.ticksDead = ticks;

      for (var i = 0; i < this.length(); i++) {
        this.grid.set(_Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.SNAKE_DEAD, this.get(i));
      }
    }
  }, {
    key: "kill",
    value: function kill() {
      this.autoRetry = false;
      this.grid = null;
      this.queue = null;
    }
  }, {
    key: "keyToDirection",
    value: function keyToDirection(key) {
      if (key == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.LEFT && this.direction != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT && this.direction != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT) {
        return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT;
      }

      if (key == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.UP && this.direction != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM && this.direction != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP) {
        return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP;
      }

      if (key == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.RIGHT && this.direction != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT && this.direction != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT) {
        return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT;
      }

      if (key == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Key.BOTTOM && this.direction != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP && this.direction != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM) {
        return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM;
      }

      return null;
    }
  }, {
    key: "moveTo",
    value: function moveTo(key) {
      var direction = this.keyToDirection(key);

      if (direction != null) {
        this.direction = direction;
      }
    }
  }, {
    key: "getNextPosition",
    value: function getNextPosition(oldPos, newDirection) {
      return this.grid.getNextPosition(oldPos, newDirection);
    }
  }, {
    key: "getDirectionTo",
    value: function getDirectionTo(position, otherPosition) {
      return this.grid.getDirectionTo(position, otherPosition);
    }
  }, {
    key: "getGraphicDirectionFor",
    value: function getGraphicDirectionFor(current, next, prec) {
      if (next == undefined || prec == undefined) return current.direction;
      var directionToPrec = this.getDirectionTo(current, prec);
      var directionToNext = this.getDirectionTo(current, next);

      if (directionToPrec == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT && directionToNext == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM || directionToPrec == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM && directionToNext == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT) {
        return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.ANGLE_1;
      } else if (directionToPrec == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT && directionToNext == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM || directionToPrec == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM && directionToNext == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT) {
        return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.ANGLE_2;
      } else if (directionToPrec == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP && directionToNext == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT || directionToPrec == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT && directionToNext == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP) {
        return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.ANGLE_3;
      } else if (directionToPrec == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP && directionToNext == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT || directionToPrec == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT && directionToNext == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP) {
        return _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.ANGLE_4;
      } else {
        return current.direction;
      }
    }
  }, {
    key: "getGraphicDirection",
    value: function getGraphicDirection(index) {
      return this.getGraphicDirectionFor(this.get(index), this.get(index - 1), this.get(index + 1));
    }
  }, {
    key: "copy",
    value: function copy() {
      var snake = new Snake(direction, 3, new _Grid__WEBPACK_IMPORTED_MODULE_4__["default"](this.grid.width, this.grid.height, false, false), this.player, this.aiLevel, false);

      for (var i = 0; i < snake.grid.height; i++) {
        for (var j = 0; j < snake.grid.width; j++) {
          snake.grid.set(this.grid.get(new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](j, i)), new _Position__WEBPACK_IMPORTED_MODULE_3__["default"](j, i));
        }
      }

      snake.queue = [];

      for (var _i4 = 0; _i4 < this.queue.length; _i4++) {
        snake.queue.push(elem.copy());
      }

      return snake;
    }
  }, {
    key: "ai",
    value: function ai() {
      if (this.snakeAI && this.snakeAI.ai) {
        var action = this.snakeAI.ai(this);

        if (!action || this.keyToDirection(action) == this.direction) {
          this.ticksWithoutAction++;
        } else {
          this.ticksWithoutAction = 0;
        }

        return action;
      }

      return null;
    }
  }, {
    key: "isAIStuck",
    value: function isAIStuck(widthLimit, heightLimit) {
      if (this.snakeAI && this.snakeAI.ai) {
        if ((this.direction == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.LEFT || this.direction == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.RIGHT) && this.ticksWithoutAction >= this.grid.width * widthLimit) {
          return true;
        } else if ((this.direction == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.UP || this.direction == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].Direction.BOTTOM) && this.ticksWithoutAction >= this.grid.height * heightLimit) {
          return true;
        }
      }

      return false;
    }
  }, {
    key: "getAILevelText",
    value: function getAILevelText() {
      return this.snakeAI ? this.snakeAI.aiLevelText : "???";
    }
  }]);

  return Snake;
}();



/***/ }),

/***/ "./src/engine/ai/SnakeAI.js":
/*!**********************************!*\
  !*** ./src/engine/ai/SnakeAI.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SnakeAI; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Constants */ "./src/engine/Constants.js");



/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */


var SnakeAI = /*#__PURE__*/function () {
  function SnakeAI() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SnakeAI);

    this.aiFruitGoal = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT;
    this._aiLevelText = "custom";
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SnakeAI, [{
    key: "ai",
    value: function ai(snake) {
      var currentPosition = snake.getHeadPosition();
      var fruitPos = snake.grid.fruitPos;
      var fruitPosGold = snake.grid.fruitPosGold;

      if (fruitPos && snake.grid.get(fruitPos) == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT) {
        var distFruit = Math.abs(fruitPos.x - currentPosition.x) + Math.abs(fruitPos.y - currentPosition.y);
        var distFruitGold = fruitPosGold ? Math.abs(fruitPosGold.x - currentPosition.x) + Math.abs(fruitPosGold.y - currentPosition.y) : -1;

        if (fruitPosGold && snake.grid.get(fruitPosGold) == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT_GOLD && this.aiFruitGoal == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT) {
          if (distFruitGold <= distFruit) {
            this.aiFruitGoal = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT_GOLD;
          } else {
            this.aiFruitGoal = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT;
          }
        } else if (!fruitPosGold || snake.grid.get(fruitPosGold) != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT_GOLD) {
          this.aiFruitGoal = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT;
        }
      } else if ((!fruitPos || snake.grid.get(fruitPos) != _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT) && fruitPosGold && snake.grid.get(fruitPosGold) == _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT_GOLD) {
        this.aiFruitGoal = _Constants__WEBPACK_IMPORTED_MODULE_2__["default"].CaseType.FRUIT_GOLD;
      }

      return null;
    }
  }, {
    key: "aiLevelText",
    get: function get() {
      return this._aiLevelText;
    }
  }]);

  return SnakeAI;
}();



/***/ }),

/***/ "./src/engine/ai/SnakeAIHigh.js":
/*!**************************************!*\
  !*** ./src/engine/ai/SnakeAIHigh.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SnakeAIHigh; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _SnakeAILow__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SnakeAILow */ "./src/engine/ai/SnakeAILow.js");
/* harmony import */ var _SnakeAINormal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SnakeAINormal */ "./src/engine/ai/SnakeAINormal.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */



var SnakeAIHigh = /*#__PURE__*/function (_SnakeAINormal) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(SnakeAIHigh, _SnakeAINormal);

  var _super = _createSuper(SnakeAIHigh);

  function SnakeAIHigh(snake) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SnakeAIHigh);

    _this = _super.call(this, true);
    _this.aiLow = new _SnakeAILow__WEBPACK_IMPORTED_MODULE_6__["default"](snake);
    _this._aiLevelText = "high";
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SnakeAIHigh, [{
    key: "ai",
    value: function ai(snake) {
      var res = _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(SnakeAIHigh.prototype), "ai", this).call(this, snake);

      if (!res) {
        return this.aiLow.ai(snake);
      }

      return res;
    }
  }]);

  return SnakeAIHigh;
}(_SnakeAINormal__WEBPACK_IMPORTED_MODULE_7__["default"]);



/***/ }),

/***/ "./src/engine/ai/SnakeAILow.js":
/*!*************************************!*\
  !*** ./src/engine/ai/SnakeAILow.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SnakeAILow; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _SnakeAI__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SnakeAI */ "./src/engine/ai/SnakeAI.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Constants */ "./src/engine/Constants.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */



var SnakeAILow = /*#__PURE__*/function (_SnakeAI) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(SnakeAILow, _SnakeAI);

  var _super = _createSuper(SnakeAILow);

  function SnakeAILow() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SnakeAILow);

    _this = _super.call(this);
    _this._aiLevelText = "low";
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SnakeAILow, [{
    key: "ai",
    value: function ai(snake) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(SnakeAILow.prototype), "ai", this).call(this, snake);

      if (snake.grid.fruitPos != null) {
        var currentPosition = snake.getHeadPosition();
        var fruitPos = this.aiFruitGoal == _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].CaseType.FRUIT_GOLD ? snake.grid.fruitPosGold : snake.grid.fruitPos;
        var directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.RIGHT;

        if (fruitPos.x > currentPosition.x) {
          if (fruitPos.x - currentPosition.x > snake.grid.width / 2) {
            directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.LEFT;
          } else {
            directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.RIGHT;
          }
        } else if (fruitPos.x < currentPosition.x) {
          if (currentPosition.x - fruitPos.x > snake.grid.width / 2) {
            directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.RIGHT;
          } else {
            directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.LEFT;
          }
        } else if (fruitPos.y < currentPosition.y) {
          if (currentPosition.y - fruitPos.y > snake.grid.height / 2) {
            directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.BOTTOM;
          } else {
            directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.UP;
          }
        } else if (fruitPos.y > currentPosition.y) {
          if (fruitPos.y - currentPosition.y > snake.grid.height / 2) {
            directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.UP;
          } else {
            directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.BOTTOM;
          }
        }

        var nextPosition = snake.getNextPosition(currentPosition, directionNext);

        if (snake.grid.isDeadPosition(nextPosition)) {
          var currentDirection = this.direction;
          var firstDifferentDirection = null;

          for (var i = 1; i < snake.queue.length; i++) {
            if (snake.get(i).direction != currentDirection) {
              firstDifferentDirection = snake.get(i).direction;
              break;
            }
          }

          nextPosition = snake.getNextPosition(currentPosition, firstDifferentDirection);

          if (snake.grid.isDeadPosition(nextPosition)) {
            if (!snake.grid.isDeadPosition(snake.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.UP))) {
              directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.UP;
            } else if (!snake.grid.isDeadPosition(snake.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.RIGHT))) {
              directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.RIGHT;
            } else if (!snake.grid.isDeadPosition(snake.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.BOTTOM))) {
              directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.BOTTOM;
            } else if (!snake.grid.isDeadPosition(snake.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.LEFT))) {
              directionNext = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.LEFT;
            }
          } else {
            directionNext = nextPosition.convertToKeyDirection();
          }
        }

        return directionNext;
      }
    }
  }]);

  return SnakeAILow;
}(_SnakeAI__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./src/engine/ai/SnakeAIMock.js":
/*!**************************************!*\
  !*** ./src/engine/ai/SnakeAIMock.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SnakeAIMock; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SnakeAI__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SnakeAI */ "./src/engine/ai/SnakeAI.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */


var SnakeAIMock = /*#__PURE__*/function (_SnakeAI) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(SnakeAIMock, _SnakeAI);

  var _super = _createSuper(SnakeAIMock);

  function SnakeAIMock() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SnakeAIMock);

    _this = _super.call(this);
    _this._aiLevelText = "mock";
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SnakeAIMock, [{
    key: "ai",
    value: function ai() {
      return null;
    }
  }]);

  return SnakeAIMock;
}(_SnakeAI__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ }),

/***/ "./src/engine/ai/SnakeAINormal.js":
/*!****************************************!*\
  !*** ./src/engine/ai/SnakeAINormal.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SnakeAINormal; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _SnakeAI__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SnakeAI */ "./src/engine/ai/SnakeAI.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Constants */ "./src/engine/Constants.js");
/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Position */ "./src/engine/Position.js");
/* harmony import */ var _libs_lowlight_astar_min__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../libs/lowlight.astar.min */ "./libs/lowlight.astar.min.js");
/* harmony import */ var _libs_lowlight_astar_min__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_libs_lowlight_astar_min__WEBPACK_IMPORTED_MODULE_9__);







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */





var SnakeAINormal = /*#__PURE__*/function (_SnakeAI) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(SnakeAINormal, _SnakeAI);

  var _super = _createSuper(SnakeAINormal);

  function SnakeAINormal(enableTorus) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SnakeAINormal);

    _this = _super.call(this);
    _this.enableTorus = enableTorus;
    _this._aiLevelText = "normal";
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SnakeAINormal, [{
    key: "ai",
    value: function ai(snake) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(SnakeAINormal.prototype), "ai", this).call(this, snake);

      var currentPosition = snake.getHeadPosition();
      var fruitPos = snake.grid.fruitPos;
      var fruitPosGold = snake.grid.fruitPosGold;
      var fruitTarget = fruitPos;

      if (currentPosition && (fruitPos || fruitPosGold)) {
        var grid = snake.grid.getGraph(false);
        var graph = new _libs_lowlight_astar_min__WEBPACK_IMPORTED_MODULE_9__["Astar"].Configuration(grid, {
          order: "yx",
          torus: this.enableTorus ? true : false,
          diagonals: false,
          cutting: false,
          "static": true,
          cost: function cost(a, b) {
            return b == 1 ? null : 1;
          }
        });

        if (fruitPosGold && this.aiFruitGoal == _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].CaseType.FRUIT_GOLD) {
          fruitTarget = fruitPosGold;
        }

        var path = graph.path({
          x: currentPosition.x,
          y: currentPosition.y
        }, {
          x: fruitTarget ? fruitTarget.x : null,
          y: fruitTarget ? fruitTarget.y : null
        });

        if (path.length < 1) {
          if (this.aiFruitGoal == _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].CaseType.FRUIT_GOLD || !fruitPosGold) {
            fruitTarget = fruitPos;
          }

          path = graph.path({
            x: currentPosition.x,
            y: currentPosition.y
          }, {
            x: fruitTarget ? fruitTarget.x : null,
            y: fruitTarget ? fruitTarget.y : null
          });
        }

        if (path.length > 1) {
          var nextPosition = new _Position__WEBPACK_IMPORTED_MODULE_8__["default"](path[1].x, path[1].y);
          return new _Position__WEBPACK_IMPORTED_MODULE_8__["default"](null, null, snake.getDirectionTo(currentPosition, nextPosition)).convertToKeyDirection();
        }

        grid, graph, path = null;
      }

      return null;
    }
  }]);

  return SnakeAINormal;
}(_SnakeAI__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./src/engine/ai/SnakeAIRandom.js":
/*!****************************************!*\
  !*** ./src/engine/ai/SnakeAIRandom.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SnakeAIRandom; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/get.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _SnakeAI__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SnakeAI */ "./src/engine/ai/SnakeAI.js");
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Constants */ "./src/engine/Constants.js");
/* harmony import */ var _GameUtils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../GameUtils */ "./src/engine/GameUtils.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */




var SnakeAIRandom = /*#__PURE__*/function (_SnakeAI) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3___default()(SnakeAIRandom, _SnakeAI);

  var _super = _createSuper(SnakeAIRandom);

  function SnakeAIRandom() {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, SnakeAIRandom);

    _this = _super.call(this);
    _this._aiLevelText = "random";
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(SnakeAIRandom, [{
    key: "ai",
    value: function ai(snake) {
      _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2___default()(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(SnakeAIRandom.prototype), "ai", this).call(this, snake);

      var currentPosition = snake.getHeadPosition();
      var top = snake.grid.isDeadPosition(snake.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.UP));
      var left = snake.grid.isDeadPosition(snake.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.LEFT));
      var bottom = snake.grid.isDeadPosition(snake.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.BOTTOM));
      var right = snake.grid.isDeadPosition(snake.getNextPosition(currentPosition, _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.RIGHT));

      if (top && left && bottom && right) {
        return _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.UP;
      } else {
        var direction = null;

        while (direction == null || snake.grid.isDeadPosition(snake.getNextPosition(currentPosition, direction))) {
          var r = _GameUtils__WEBPACK_IMPORTED_MODULE_8__["default"].randRange(1, 4, snake.grid ? snake.grid.rngGame : null);

          switch (r) {
            case 1:
              direction = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.UP;
              break;

            case 2:
              direction = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.LEFT;
              break;

            case 3:
              direction = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.BOTTOM;
              break;

            case 4:
              direction = _Constants__WEBPACK_IMPORTED_MODULE_7__["default"].Key.RIGHT;
              break;
          }
        }

        return direction;
      }
    }
  }]);

  return SnakeAIRandom;
}(_SnakeAI__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ }),

/***/ "./src/engine/ai/index.js":
/*!********************************!*\
  !*** ./src/engine/ai/index.js ***!
  \********************************/
/*! exports provided: SnakeAI, SnakeAIRandom, SnakeAILow, SnakeAINormal, SnakeAIHigh, SnakeAIMock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SnakeAI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SnakeAI */ "./src/engine/ai/SnakeAI.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SnakeAI", function() { return _SnakeAI__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _SnakeAIRandom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SnakeAIRandom */ "./src/engine/ai/SnakeAIRandom.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SnakeAIRandom", function() { return _SnakeAIRandom__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _SnakeAILow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SnakeAILow */ "./src/engine/ai/SnakeAILow.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SnakeAILow", function() { return _SnakeAILow__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _SnakeAINormal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SnakeAINormal */ "./src/engine/ai/SnakeAINormal.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SnakeAINormal", function() { return _SnakeAINormal__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _SnakeAIHigh__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SnakeAIHigh */ "./src/engine/ai/SnakeAIHigh.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SnakeAIHigh", function() { return _SnakeAIHigh__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _SnakeAIMock__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SnakeAIMock */ "./src/engine/ai/SnakeAIMock.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SnakeAIMock", function() { return _SnakeAIMock__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */








/***/ }),

/***/ "./src/node-index.js":
/*!***************************!*\
  !*** ./src/node-index.js ***!
  \***************************/
/*! exports provided: GameConstants, Event, Reactor, Grid, Snake, GameGroup, GameUtils, Position, GameEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _engine_Constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./engine/Constants */ "./src/engine/Constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameConstants", function() { return _engine_Constants__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _engine_Event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./engine/Event */ "./src/engine/Event.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Event", function() { return _engine_Event__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _engine_Reactor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./engine/Reactor */ "./src/engine/Reactor.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Reactor", function() { return _engine_Reactor__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _engine_Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./engine/Grid */ "./src/engine/Grid.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return _engine_Grid__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _engine_Snake__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./engine/Snake */ "./src/engine/Snake.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Snake", function() { return _engine_Snake__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _engine_GameGroup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./engine/GameGroup */ "./src/engine/GameGroup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameGroup", function() { return _engine_GameGroup__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _engine_GameUtils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./engine/GameUtils */ "./src/engine/GameUtils.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameUtils", function() { return _engine_GameUtils__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _engine_Position__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./engine/Position */ "./src/engine/Position.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return _engine_Position__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _engine_GameEngine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./engine/GameEngine */ "./src/engine/GameEngine.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GameEngine", function() { return _engine_GameEngine__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/*
 * Copyright (C) 2019-2020 Eliastik (eliastiksofts.com)
 *
 * This file is part of "SnakeIA".
 *
 * "SnakeIA" is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * "SnakeIA" is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with "SnakeIA".  If not, see <http://www.gnu.org/licenses/>.
 */
// Exports engine classes











/***/ }),

/***/ 0:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9TbmFrZUlBL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9TbmFrZUlBL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NuYWtlSUEvLi9saWJzL2xvd2xpZ2h0LmFzdGFyLm1pbi5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jbGFzc0NhbGxDaGVjay5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY3JlYXRlQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vU25ha2VJQS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldC5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZ2V0UHJvdG90eXBlT2YuanMiLCJ3ZWJwYWNrOi8vU25ha2VJQS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9zZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvc3VwZXJQcm9wQmFzZS5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9pbmRleC5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL2FsZWEuanMiLCJ3ZWJwYWNrOi8vU25ha2VJQS8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi90eWNoZWkuanMiLCJ3ZWJwYWNrOi8vU25ha2VJQS8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi94b3IxMjguanMiLCJ3ZWJwYWNrOi8vU25ha2VJQS8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi94b3I0MDk2LmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIveG9yc2hpZnQ3LmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIveG9yd293LmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9zZWVkcmFuZG9tLmpzIiwid2VicGFjazovL1NuYWtlSUEvKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLyh3ZWJwYWNrKS9idWlsZGluL2FtZC1vcHRpb25zLmpzIiwid2VicGFjazovL1NuYWtlSUEvKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9zcmMvZW5naW5lL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vc3JjL2VuZ2luZS9FdmVudC5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vc3JjL2VuZ2luZS9HYW1lRW5naW5lLmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9zcmMvZW5naW5lL0dhbWVHcm91cC5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vc3JjL2VuZ2luZS9HYW1lVXRpbHMuanMiLCJ3ZWJwYWNrOi8vU25ha2VJQS8uL3NyYy9lbmdpbmUvR3JpZC5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vc3JjL2VuZ2luZS9Qb3NpdGlvbi5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vc3JjL2VuZ2luZS9SZWFjdG9yLmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9zcmMvZW5naW5lL1NuYWtlLmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9zcmMvZW5naW5lL2FpL1NuYWtlQUkuanMiLCJ3ZWJwYWNrOi8vU25ha2VJQS8uL3NyYy9lbmdpbmUvYWkvU25ha2VBSUhpZ2guanMiLCJ3ZWJwYWNrOi8vU25ha2VJQS8uL3NyYy9lbmdpbmUvYWkvU25ha2VBSUxvdy5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vc3JjL2VuZ2luZS9haS9TbmFrZUFJTW9jay5qcyIsIndlYnBhY2s6Ly9TbmFrZUlBLy4vc3JjL2VuZ2luZS9haS9TbmFrZUFJTm9ybWFsLmpzIiwid2VicGFjazovL1NuYWtlSUEvLi9zcmMvZW5naW5lL2FpL1NuYWtlQUlSYW5kb20uanMiLCJ3ZWJwYWNrOi8vU25ha2VJQS8uL3NyYy9lbmdpbmUvYWkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vU25ha2VJQS8uL3NyYy9ub2RlLWluZGV4LmpzIiwid2VicGFjazovL1NuYWtlSUEvY3J5cHRvIChpZ25vcmVkKSJdLCJuYW1lcyI6WyJDYXNlVHlwZSIsIkVNUFRZIiwiU05BS0UiLCJGUlVJVCIsIldBTEwiLCJTTkFLRV9ERUFEIiwiU1VSUk9VTkRFRCIsIkZSVUlUX0dPTEQiLCJDUk9TU0VEIiwiUGxheWVyVHlwZSIsIkFJIiwiSFVNQU4iLCJIWUJSSURfSFVNQU5fQUkiLCJBaUxldmVsIiwiUkFORE9NIiwiTE9XIiwiREVGQVVMVCIsIkhJR0giLCJVTFRSQSIsIkNVU1RPTSIsIk1PQ0siLCJPdXRwdXRUeXBlIiwiVEVYVCIsIkdSQVBISUNBTCIsIlNldHRpbmciLCJDQU5WQVNfV0lEVEgiLCJDQU5WQVNfSEVJR0hUIiwiRk9OVF9GQU1JTFkiLCJGT05UX1NJWkUiLCJIRUFERVJfSEVJR0hUX0RFRkFVTFQiLCJUQVJHRVRfRlBTIiwiVElNRV9NVUxUSVBMSUVSIiwiSU1BR0VfU05BS0VfSFVFIiwiSU1BR0VfU05BS0VfU0FUVVJBVElPTiIsIklNQUdFX1NOQUtFX1ZBTFVFIiwiQ0FSU19UT19QUkVSRU5ERVIiLCJBUFBfVkVSU0lPTiIsIkRBVEVfVkVSU0lPTiIsIlBST0JfR09MRF9GUlVJVF8xX1BMQVlFUiIsIlBST0JfR09MRF9GUlVJVF9NVUxUSVBMRV9QTEFZRVJTIiwiSU5GT19OT1RJRl9DT0xPUiIsIkVSUk9SX05PVElGX0NPTE9SIiwiRGlyZWN0aW9uIiwiVVAiLCJUT1AiLCJSSUdIVCIsIkJPVFRPTSIsIkRPV04iLCJMRUZUIiwiQU5HTEVfMSIsIkFOR0xFXzIiLCJBTkdMRV8zIiwiQU5HTEVfNCIsIktleSIsIkVOVEVSIiwiRXJyb3IiLCJST09NX05PVF9GT1VORCIsIlJPT01fQUxSRUFEWV9KT0lORUQiLCJJTlZBTElEX1NFVFRJTkdTIiwiTUFYX1JPT01fTElNSVRfUkVBQ0hFRCIsIkFVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEIiwiQUxSRUFEWV9DUkVBVEVEX1JPT00iLCJCQU5ORUQiLCJESVNDT05ORUNURUQiLCJHYW1lU3RhdGUiLCJTVEFSVElORyIsIlNUQVJURUQiLCJTRUFSQ0hJTkdfUExBWUVSUyIsIkFVVEhFTlRJQ0FUSU9OX1NVQ0NFU1MiLCJFdmVudCIsIm5hbWUiLCJjYWxsYmFja3MiLCJjYWxsYmFjayIsInB1c2giLCJHYW1lRW5naW5lIiwiZ3JpZCIsInNuYWtlIiwic3BlZWQiLCJlbmFibGVQYXVzZSIsImVuYWJsZVJldHJ5IiwicHJvZ3Jlc3NpdmVTcGVlZCIsImFpU3R1Y2tMaW1pdCIsInNuYWtlcyIsImluaXRpYWxTcGVlZCIsImluaXRpYWxTcGVlZFVudG91Y2hlZCIsImNvdW50QmVmb3JlUGxheSIsImxhc3RLZXkiLCJudW1GcnVpdCIsInRpY2tzIiwiZmlyc3RTdGFydCIsInN0YXJ0aW5nIiwicGF1c2VkIiwiZXhpdGVkIiwia2lsbGVkIiwiaXNSZXNldGVkIiwiZ2FtZU92ZXIiLCJnYW1lRmluaXNoZWQiLCJnYW1lTWF6ZVdpbiIsInNjb3JlTWF4IiwiZXJyb3JPY2N1cnJlZCIsImNsaWVudFNpZGVQcmVkaWN0aW9uc01vZGUiLCJhaVN0dWNrIiwiaW50ZXJ2YWxQbGF5IiwicmVhY3RvciIsIlJlYWN0b3IiLCJyZWdpc3RlckV2ZW50IiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwibWF6ZSIsIkdyaWQiLCJpbml0R3JpZEFuZFNuYWtlcyIsInN0YXJ0SHVlIiwiR2FtZVV0aWxzIiwicmFuZFJhbmdlIiwic2VlZHJhbmRvbSIsInNlZWRHYW1lIiwiaSIsIlNuYWtlIiwiYWRkSHVlIiwiTWF0aCIsInJvdW5kIiwiY29sb3IiLCJyZXNldCIsImluaXQiLCJzZXRGcnVpdCIsImNsZWFySW50ZXJ2YWxQbGF5Iiwic2VlZEdyaWQiLCJwYXJzZUludCIsImRpc3BhdGNoRXZlbnQiLCJzdGFydCIsImVycm9ySW5pdCIsInN0b3AiLCJzZXRJbnRlcnZhbCIsImZvcmNlU3RhcnQiLCJ0aWNrIiwiY2xlYXJJbnRlcnZhbCIsImZpbmlzaCIsImtpbGwiLCJleGNlcHRpb25JZHMiLCJ0eXBlcyIsImluZGV4T2YiLCJwbGF5ZXIiLCJzZXRHYW1lT3ZlciIsInR5cGUiLCJudW1QbGF5ZXIiLCJudW0iLCJzZXRUaW1lb3V0IiwiZG9UaWNrIiwiR2FtZUNvbnN0YW50cyIsImxhc3RUaW1lIiwidGltZSIsInNjb3JlSW5jcmVhc2VkIiwic2V0RnJ1aXRFcnJvciIsIm1hemVGb3JjZUF1dG8iLCJnZXROQlBsYXllciIsImdldFBsYXllciIsImluaXRpYWxEaXJlY3Rpb24iLCJkaXJlY3Rpb24iLCJnb2xkRnJ1aXQiLCJsYXN0VGFpbE1vdmVkIiwibW92ZVRvIiwiYWlMZXZlbCIsImFpIiwiaGVhZFNuYWtlUG9zIiwiZ2V0SGVhZFBvc2l0aW9uIiwiaXNEZWFkUG9zaXRpb24iLCJnZXROZXh0UG9zaXRpb24iLCJnZXQiLCJzY29yZSIsInNldCIsImZydWl0UG9zIiwiZnJ1aXRQb3NHb2xkIiwiaW5zZXJ0IiwiaGFzTWF4U2NvcmUiLCJjZWlsIiwicmVtb3ZlIiwiZGV0ZWN0Q29ycmlkb3IiLCJpc0ZydWl0U3Vycm91bmRlZCIsIm5iT3ZlciIsImoiLCJlbmRHYW1lQUlTdHVjayIsImsiLCJpc0FJU3R1Y2siLCJhZGRFdmVudExpc3RlbmVyIiwiR2FtZUdyb3VwIiwiZ2FtZXMiLCJ1bmRlZmluZWQiLCJlbmFibGVLZXlNZW51Iiwib25QYXVzZSIsInBhdXNlQWxsIiwiYmluZCIsIm9uQ29udGludWUiLCJzdGFydEFsbCIsIm9uRXhpdCIsImNoZWNrRXhpdCIsIm9uU3RvcCIsImNoZWNrU3RvcCIsIm9uUmVzZXQiLCJyZXNldEFsbCIsIm9uU2NvcmVJbmNyZWFzZWQiLCJjaGVja09uU2NvcmVJbmNyZWFzZWQiLCJnYW1lIiwicGF1c2UiLCJhbGxFeGl0ZWQiLCJhbGxTdG9wcGVkIiwiZmluaXNoZWQiLCJ2YWx1ZSIsInNldERpc3BsYXlGUFMiLCJub3RpZmljYXRpb24iLCJzZXROb3RpZmljYXRpb24iLCJjb3B5IiwiY2xvc2VSYW5raW5nIiwiZGVzdHJveVNuYWtlcyIsIndpbm5lcnMiLCJpbmRleCIsIm1heFNjb3JlIiwiaWR4IiwibWluIiwibWF4Iiwicm5nIiwiZmxvb3IiLCJyYW5kb20iLCJodWUiLCJhZGQiLCJyZXMiLCJzaHVmZmxlIiwiYSIsIngiLCJtaWxsaXNlY29uZHNGb3JtYXQiLCJtaWxsaXNlY29uZHMiLCJ0cnVuYyIsInNsaWNlIiwic2Vjb25kc0Zvcm1hdCIsInNlY29uZHMiLCJ3aWR0aCIsImhlaWdodCIsImdlbmVyYXRlV2FsbHMiLCJib3JkZXJXYWxscyIsImN1c3RvbUdyaWQiLCJwcm9iR29sZEZydWl0SW5jcmVhc2UiLCJtYXplRmlyc3RQb3NpdGlvbiIsIlBvc2l0aW9uIiwiaW5pdGlhbEdyaWQiLCJybmdHcmlkIiwicm5nR2FtZSIsImdyaWRUb0NvcHkiLCJnZW5lcmF0ZU1hemUiLCJmaXhXYWxscyIsInN0YXJ0WSIsInN0YXJ0WCIsImVuZFkiLCJlbmRYIiwiY3VycmVudFBvcyIsInVwcGVyQ2FzZSIsInVwcGVyTGVmdENhc2UiLCJ1cHBlclJpZ2h0Q2FzZSIsImRvd25DYXNlIiwiZG93bkxlZnRDYXNlIiwiZG93blJpZ2h0Q2FzZSIsInIiLCJjIiwiZGlyZWN0aW9ucyIsIm1hemVfcmVjdXJzaW9uIiwicG9zaXRpb24iLCJ5IiwiaWdub3JlU25ha2VQb3MiLCJudW1iZXJQbGF5ZXJzIiwiZ29sZCIsInRyaWVkIiwiZ2V0VG90YWwiLCJyYW5kb21Qb3MiLCJpc0NvcnJpZG9yIiwiZ2V0UmFuZG9tUG9zaXRpb24iLCJ0ZXN0RnJ1aXRNYXplIiwiZ2V0R3JhcGgiLCJncmFwaCIsIkxvd2xpZ2h0IiwiQ29uZmlndXJhdGlvbiIsIm9yZGVyIiwidG9ydXMiLCJkaWFnb25hbHMiLCJjdXR0aW5nIiwiY29zdCIsImIiLCJwYXRoIiwiZmlsbCIsImZvdW5kVmFscyIsImZvcmJpZGRlblZhbHMiLCJncmlkQ29weSIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsImNoZWNrTGlzdCIsImN1cnJlbnRQb3NpdGlvbiIsInNoaWZ0Iiwic3Vycm91bmRlZCIsImlzQ2FzZVN1cnJvdW5kZWQiLCJwb3NUb3AiLCJwb3NCb3R0b20iLCJwb3NSaWdodCIsInBvc0xlZnQiLCJpc0RlYWRQb3NpdGlvblRvcCIsImlzRGVhZFBvc2l0aW9uQm90dG9tIiwiaXNEZWFkUG9zaXRpb25SaWdodCIsImlzRGVhZFBvc2l0aW9uTGVmdCIsIm51bURlYWRQb3NpdGlvbkFycm91bmQiLCJjb3JyaWRvclRvcCIsImNvcnJpZG9yQm90dG9tIiwiY29ycmlkb3JMZWZ0IiwiY29ycmlkb3JSaWdodCIsImxpbmUiLCJ0b3QiLCJnZXRPbkxpbmUiLCJvbGRQb3MiLCJuZXdEaXJlY3Rpb24iLCJvdGhlclBvc2l0aW9uIiwiZXF1YWxzIiwiZXhjbHVkZVNuYWtlIiwiaW5jbHVkZVN1cnJvdW5kZWQiLCJ2YWxUb0NoYXIiLCJldmVudHMiLCJldmVudE5hbWUiLCJldmVudEFyZ3MiLCJsIiwicmVnaXN0ZXJDYWxsYmFjayIsImF1dG9SZXRyeSIsImN1c3RvbUFJIiwiaW5pdGlhbExlbmd0aCIsImluaXRUcmllZERpcmVjdGlvbnMiLCJxdWV1ZSIsImxhc3RUYWlsIiwidGlja3NEZWFkIiwic25ha2VBSSIsIlNuYWtlQUkiLCJ0aWNrc1dpdGhvdXRBY3Rpb24iLCJpbml0QUkiLCJzcGFjZUxpbmVBdmFpbGFibGUiLCJzcGFjZUNvbEF2YWlsYWJsZSIsImVtcHR5T25MaW5lIiwiZW1wdHlPbkNvbCIsInBvc05vdFZhbGlkYXRlZCIsInBvc2l0aW9uc1RvQWRkIiwic3RhcnRQb3MiLCJuZWFyRGVhZFBvc2l0aW9uIiwiZmlyc3RQb3NpdGlvbiIsImludmVydERpcmVjdGlvbiIsIlNuYWtlQUlSYW5kb20iLCJTbmFrZUFJTG93IiwiU25ha2VBSU5vcm1hbCIsIlNuYWtlQUlIaWdoIiwiU25ha2VBSU1vY2siLCJhaUZydWl0R29hbCIsInVuc2hpZnQiLCJsYXN0IiwicG9wIiwia2V5Iiwia2V5VG9EaXJlY3Rpb24iLCJnZXREaXJlY3Rpb25UbyIsImN1cnJlbnQiLCJuZXh0IiwicHJlYyIsImRpcmVjdGlvblRvUHJlYyIsImRpcmVjdGlvblRvTmV4dCIsImdldEdyYXBoaWNEaXJlY3Rpb25Gb3IiLCJlbGVtIiwiYWN0aW9uIiwid2lkdGhMaW1pdCIsImhlaWdodExpbWl0IiwiYWlMZXZlbFRleHQiLCJfYWlMZXZlbFRleHQiLCJkaXN0RnJ1aXQiLCJhYnMiLCJkaXN0RnJ1aXRHb2xkIiwiYWlMb3ciLCJkaXJlY3Rpb25OZXh0IiwibmV4dFBvc2l0aW9uIiwiY3VycmVudERpcmVjdGlvbiIsImZpcnN0RGlmZmVyZW50RGlyZWN0aW9uIiwiY29udmVydFRvS2V5RGlyZWN0aW9uIiwiZW5hYmxlVG9ydXMiLCJmcnVpdFRhcmdldCIsInRvcCIsImxlZnQiLCJib3R0b20iLCJyaWdodCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNE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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzNCQSxlIiwiZmlsZSI6IlNuYWtlSUEtbm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlNuYWtlSUFcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wiU25ha2VJQVwiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL25vZGUtaW5kZXguanNcIik7XG4iLCIvKipcbkNvcHlyaWdodCAyMDE3LCBMZWNvcSBTaW1vbiAobG93bGlnaHQuZnIpXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbiovXG4oZnVuY3Rpb24oYSl7dmFyIGI9TWF0aC5zaWduLGM9TWF0aC5taW4sZD1NYXRoLmFicztcInVuZGVmaW5lZFwiPT10eXBlb2YgYS5Mb3dsaWdodCYmKGEuTG93bGlnaHQ9e30pLFwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUmJlwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGUuZXhwb3J0cyYmKG1vZHVsZS5leHBvcnRzPWEuTG93bGlnaHQpO2NsYXNzIGV7Y29uc3RydWN0b3IoKXt0aGlzLm5vZGVzPW5ldyBNYXB9aWQoYSl7cmV0dXJuIGF9bm9kZShhLGI9ITEpe3JldHVybiBiP3RoaXMubm9kZXMuZ2V0KHRoaXMuaWQoYXJndW1lbnRzWzBdKSk6dGhpcy5ub2Rlcy5nZXQoYSl9ZGF0YShhLGIpe3JldHVybiAyPT09YXJndW1lbnRzLmxlbmd0aCYmKGEuZ3JhcGguZ2V0KHRoaXMpLl9kYXRhPWIpLGEuZ3JhcGguZ2V0KHRoaXMpLl9kYXRhfWFkamFjZW50KGMsYSl7cmV0dXJuIGMuZ3JhcGguZ2V0KHRoaXMpLmhhcyhhKX1uZWlnaGJvcnMoYSl7cmV0dXJuIEFycmF5LmZyb20oYS5ncmFwaC5nZXQodGhpcykua2V5cygpKX1jb25uZWN0ZWQoYyxhKXtyZXR1cm4gYy5ncmFwaC5nZXQodGhpcykuX2Nvbm5lY3Rpdml0eT09PWEuZ3JhcGguZ2V0KHRoaXMpLl9jb25uZWN0aXZpdHl9Y29ubmVjdCgpe2xldCBhPUFycmF5LmZyb20odGhpcy5ub2Rlcy52YWx1ZXMoKSksYj0wO2ZvcihsZXQgYj0wO2I8YS5sZW5ndGg7YisrKWFbYl0uZ3JhcGguZ2V0KHRoaXMpLl9jb25uZWN0aXZpdHk9dm9pZCAwO2ZvcihsZXQgYz0wO2M8YS5sZW5ndGg7YysrKXtpZih2b2lkIDAhPT1hW2NdLmdyYXBoLmdldCh0aGlzKS5fY29ubmVjdGl2aXR5KWNvbnRpbnVlO2xldCBkPVthW2NdXTtmb3IoYisrO2QubGVuZ3RoOyl7bGV0IGE9ZC5zaGlmdCgpO2EuZ3JhcGguZ2V0KHRoaXMpLl9jb25uZWN0aXZpdHk9Yix0aGlzLm5laWdoYm9ycyhhKS5tYXAoKGEpPT57dm9pZCAwPT09YS5ncmFwaC5nZXQodGhpcykuX2Nvbm5lY3Rpdml0eSYmMD5kLmluZGV4T2YoYSkmJmQucHVzaChhKX0pfX19YWRkKGEpe3JldHVybiAxPGFyZ3VtZW50cy5sZW5ndGg/QXJyYXkuZnJvbShhcmd1bWVudHMpLm1hcCgoYSk9PnRoaXMuYWRkKGEpKTooYS5ncmFwaC5zZXQodGhpcyxuZXcgTWFwKSx0aGlzLm5vZGVzLnNldChhLmlkLGEpLGEpfWRlbGV0ZShhKXtyZXR1cm4gMTxhcmd1bWVudHMubGVuZ3RoP0FycmF5LmZyb20oYXJndW1lbnRzKS5tYXAoKGEpPT50aGlzLmRlbGV0ZShhKSk6KGEuZ3JhcGguZGVsZXRlKHRoaXMpLHRoaXMubm9kZXMuZGVsZXRlKGEuaWQpLGEpfWVkZ2UoYyxhLGI9MSxkPTEpe2lmKCFjLmdyYXBoLmhhcyh0aGlzKXx8IWEuZ3JhcGguaGFzKHRoaXMpKXRocm93IG5ldyBFcnJvcihcIk5vZGVzIG11c3QgYmUgb24gdGhlIHNhbWUgZ3JhcGhcIik7cmV0dXJuIG51bGw9PT1iP2MuZ3JhcGguZ2V0KHRoaXMpLmRlbGV0ZShhKTpjLmdyYXBoLmdldCh0aGlzKS5zZXQoYSxiKSxudWxsPT09ZD9hLmdyYXBoLmdldCh0aGlzKS5kZWxldGUoYyk6YS5ncmFwaC5nZXQodGhpcykuc2V0KGMsZCksdGhpc31jb3N0KGMsYSl7cmV0dXJuIHRoaXMuYWRqYWNlbnQoYyxhKT9jLmdyYXBoLmdldCh0aGlzKS5nZXQoYSk6bnVsbH19ZS5mcm9tQXJyYXk9ZnVuY3Rpb24oYSxiPXt9KXtsZXQgYz1lLmZyb21BcnJheS5YKGEsYi5vcmRlciksZD1lLmZyb21BcnJheS5ZKGEsYi5vcmRlciksZz1lLmZyb21BcnJheS5hdC5iaW5kKG51bGwsYSxiLm9yZGVyKSxoPVtdLGo9bnVsbDtmb3IobGV0IGssbD0xO2w8TWF0aC5tYXgoMixhcmd1bWVudHMubGVuZ3RoKTtsKyspe2s9bmV3IGUsaC5wdXNoKGspLGI9YXJndW1lbnRzW2xdfHx7fTtsZXQgYT1lLmZyb21BcnJheS5pZC5iaW5kKG51bGwsYyxkLGIudG9ydXMpLGk9Yi5jb3N0fHxlLmZyb21BcnJheS5jb3N0LG49ZS5mcm9tQXJyYXkuZWRnZS5iaW5kKG51bGwsayxpKTtmb3IobGV0IGI9MDtiPGM7YisrKWZvcihsZXQgYyxlPTA7ZTxkO2UrKyljPWsuYWRkKGo/ai5nZXQoYShiLGUpKTpuZXcgZihhKGIsZSkpKSxjLng9YixjLnk9ZSxjLmdyYXBoLmdldChrKS5fZGF0YT1nKGIsZSksbihjLGsubm9kZXMuZ2V0KGEoYi0xLGUpKSksbihjLGsubm9kZXMuZ2V0KGEoYisxLGUpKSksbihjLGsubm9kZXMuZ2V0KGEoYixlLTEpKSksbihjLGsubm9kZXMuZ2V0KGEoYixlKzEpKSk7aWYoYi5kaWFnb25hbHMpZm9yKGxldCBlPTA7ZTxjO2UrKylmb3IobGV0IGM9MDtjPGQ7YysrKXtsZXQgZD1rLm5vZGVzLmdldChhKGUsYykpLGY9ay5hZGphY2VudChkLGsubm9kZXMuZ2V0KGEoZS0xLGMpKSksZz1rLmFkamFjZW50KGQsay5ub2Rlcy5nZXQoYShlKzEsYykpKSxoPWsuYWRqYWNlbnQoZCxrLm5vZGVzLmdldChhKGUsYy0xKSkpLGk9ay5hZGphY2VudChkLGsubm9kZXMuZ2V0KGEoZSxjKzEpKSk7XCJzdHJpY3RcIj09PWIuY3V0dGluZz8oZiYmaCYmbihkLGsubm9kZXMuZ2V0KGEoZS0xLGMtMSkpKSxmJiZpJiZuKGQsay5ub2Rlcy5nZXQoYShlLTEsYysxKSkpLGcmJmgmJm4oZCxrLm5vZGVzLmdldChhKGUrMSxjLTEpKSksZyYmaSYmbihkLGsubm9kZXMuZ2V0KGEoZSsxLGMrMSkpKSk6KChmfHxofHxiLmN1dHRpbmcpJiZuKGQsay5ub2Rlcy5nZXQoYShlLTEsYy0xKSkpLChmfHxpfHxiLmN1dHRpbmcpJiZuKGQsay5ub2Rlcy5nZXQoYShlLTEsYysxKSkpLChnfHxofHxiLmN1dHRpbmcpJiZuKGQsay5ub2Rlcy5nZXQoYShlKzEsYy0xKSkpLChnfHxpfHxiLmN1dHRpbmcpJiZuKGQsay5ub2Rlcy5nZXQoYShlKzEsYysxKSkpKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoayxcImlkXCIse2VudW1lcmFibGU6ITEsY29uZmlndXJhYmxlOiExLHdyaXRhYmxlOiEwLHZhbHVlKGIpe3JldHVybiBhKGIueCxiLnkpfX0pLGsuY29ubmVjdCgpLGsuWD1jLGsuWT1kLGsuVE9SVVM9Yi50b3J1cyxqfHwoaj1rLm5vZGVzKX1yZXR1cm4gMTxoLmxlbmd0aD9oOmhbMF19LGUuZnJvbUFycmF5Llg9ZnVuY3Rpb24oYSxiPVwieXhcIil7cmV0dXJuXCJ4eVwiPT09Yj9hLmxlbmd0aDpcInl4XCI9PT1iP2FbMF0ubGVuZ3RoOjB9LGUuZnJvbUFycmF5Llk9ZnVuY3Rpb24oYSxiPVwieXhcIil7cmV0dXJuXCJ4eVwiPT09Yj9hWzBdLmxlbmd0aDpcInl4XCI9PT1iP2EubGVuZ3RoOjB9LGUuZnJvbUFycmF5LmF0PWZ1bmN0aW9uKGEsYj1cInl4XCIsYyxkKXtyZXR1cm5cInh5XCI9PT1iP2FbY11bZF06YVtkXVtjXX0sZS5mcm9tQXJyYXkuaWQ9ZnVuY3Rpb24oYT0wLGI9MCxjPSExLGQsZSl7cmV0dXJuIGM/KGUrYiklYiphKyhkK2EpJWE6MDw9ZCYmZDxhJiYwPD1lJiZlPGI/ZSphK2Q6bnVsbH0sZS5mcm9tQXJyYXkuY29zdD1mdW5jdGlvbigpe3JldHVybiAxfSxlLmZyb21BcnJheS5lZGdlPWZ1bmN0aW9uKGMsZCxlLGEpe2EmJmMuZWRnZShlLGEsZChjLmRhdGEoZSksYy5kYXRhKGEpKSxkKGMuZGF0YShhKSxjLmRhdGEoZSkpKX0sZS5mcm9tQXJyYXkudXBkYXRlPWZ1bmN0aW9uKCl7Y29uc29sZS53YXJuKFwiR3JhcGguZnJvbUFycmF5IGlzbid0IGltcGxlbWVudGVkIHlldFwiKX07Y2xhc3MgZntjb25zdHJ1Y3RvcihhLGIpe2ZvcihsZXQgYyBpbiB0aGlzLmlkPWEsdGhpcy5ncmFwaD1uZXcgTWFwLGIpXCJpZFwiIT1jJiZcImdyYXBoXCIhPWMmJih0aGlzW2NdPWJbY10pfX1jbGFzcyBne2NvbnN0cnVjdG9yKGEpe3RoaXMubm9kZXM9W10sdGhpcy5zY29yZT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBhP2E6KGIpPT4rYn1nZXQgc2l6ZSgpe3JldHVybiB0aGlzLm5vZGVzLmxlbmd0aH1hZGQoYSl7aWYoMTxhcmd1bWVudHMubGVuZ3RoKXtmb3IobGV0IGE9MDthPGFyZ3VtZW50cy5sZW5ndGg7YSsrKXRoaXMuYWRkKGFyZ3VtZW50c1thXSk7cmV0dXJuIHRoaXN9cmV0dXJuIHRoaXMubm9kZXMucHVzaChhKSx0aGlzLmJ1YmJsZSh0aGlzLnNpemUtMSl9c2V0KGEpe2xldCBiPXRoaXMubm9kZXMuaW5kZXhPZihhKTtyZXR1cm5+Yj90aGlzLnNjb3JlKGEpPD10aGlzLnNjb3JlKHRoaXMubm9kZXNbYl0pP3RoaXMuYnViYmxlKHRoaXMubm9kZXMuaW5kZXhPZihhKSk6dGhpcy5zaW5rKHRoaXMubm9kZXMuaW5kZXhPZihhKSk6dGhpcy5hZGQoYSl9cG9wKCl7bGV0IGE9dGhpcy5ub2Rlc1swXSxiPXRoaXMubm9kZXMucG9wKCk7cmV0dXJuIDA8dGhpcy5zaXplJiYodGhpcy5ub2Rlc1swXT1iLHRoaXMuc2luaygwKSksYX10b3AoKXtyZXR1cm4gdGhpcy5ub2Rlc1swXX1kZWxldGUoYSl7aWYoMTxhcmd1bWVudHMubGVuZ3RoKXtmb3IobGV0IGE9MDthPGFyZ3VtZW50cy5sZW5ndGg7YSsrKXRoaXMuZGVsZXRlKGFyZ3VtZW50c1thXSk7cmV0dXJuIHRoaXN9Zm9yKGxldCBiPTA7Yjx0aGlzLnNpemU7YisrKXtpZih0aGlzLm5vZGVzW2JdIT1hKWNvbnRpbnVlO2xldCBjPXRoaXMubm9kZXMucG9wKCk7cmV0dXJuIGI9PXRoaXMuc2l6ZS0xP3RoaXM6KHRoaXMubm9kZXNbYl09Yyx0aGlzLmJ1YmJsZShiKS5zaW5rKGIpKX19YnViYmxlKGEpe2xldCBiPXRoaXMubm9kZXNbYV0sYz10aGlzLnNjb3JlKGIpO2Zvcig7MDxhOyl7bGV0IGQ9TWF0aC5mbG9vcigoYSsxKS8yKS0xLGU9dGhpcy5ub2Rlc1tkXTtpZihjPj10aGlzLnNjb3JlKGUpKWJyZWFrO3RoaXMubm9kZXNbZF09Yix0aGlzLm5vZGVzW2FdPWUsYT1kfXJldHVybiB0aGlzfXNpbmsoYSl7bGV0IGI9dGhpcy5ub2Rlc1thXSxjPXRoaXMuc2NvcmUoYik7Zm9yKDs7KXtsZXQgZD0yKihhKzEpLGU9ZC0xLGY9bnVsbDtpZihlPHRoaXMuc2l6ZSYmdGhpcy5zY29yZSh0aGlzLm5vZGVzW2VdKTxjJiYoZj1lKSxkPHRoaXMuc2l6ZSYmdGhpcy5zY29yZSh0aGlzLm5vZGVzW2RdKTwoZj90aGlzLnNjb3JlKHRoaXMubm9kZXNbZl0pOmMpJiYoZj1kKSxudWxsPT09ZilicmVhazt0aGlzLm5vZGVzW2FdPXRoaXMubm9kZXNbZl0sdGhpcy5ub2Rlc1tmXT1iLGE9Zn1yZXR1cm4gdGhpc319bGV0IGg9e21hbmhhdHRhbjpmdW5jdGlvbihjLGEsYj17fSl7bGV0IGU9ZChhLngtYy54KSxmPWQoYS55LWMueSk7cmV0dXJuKGIubXVsdGlwbGllcnx8MSkqKGUrZil9LG1hbmhhdHRhblRvcnVzOmZ1bmN0aW9uKGUsYSxiPXt9KXtsZXQgZj1jKGQoYS54LWUueCksYS54KyhiLnh8fDApLWUueCxlLngrKGIueHx8MCktYS54KSxnPWMoZChhLnktZS55KSxhLnkrKGIueXx8MCktZS55LGUueSsoYi55fHwwKS1hLnkpO3JldHVybihiLm11bHRpcGxpZXJ8fDEpKihmK2cpfSxkaWFnb25hbDpmdW5jdGlvbihlLGEsYj17fSl7bGV0IGY9ZChhLngtZS54KSxnPWQoYS55LWUueSk7cmV0dXJuIG0qKGYrZykrKGRtLTIqbSkqYyhmLGcpfSxkaWFnb25hbFRvcnVzOmZ1bmN0aW9uKGUsYSxiPXt9KXtsZXQgZj1jKGQoYS54LWUueCksYS54KyhiLnh8fDApLWUueCxlLngrKGIueHx8MCktYS54KSxnPWMoZChhLnktZS55KSxhLnkrKGIueXx8MCktZS55LGUueSsoYi55fHwwKS1hLnkpO3JldHVybihiLm11bHRpcGxpZXJ8fDEpKihmK2cpKygoYi5kaWFnb25hbE11bHRpcGxpZXJ8fDEuNCktMiooYi5tdWx0aXBsaWVyfHwxKSkqYyhmLGcpfSxldWNsaWRpYW46ZnVuY3Rpb24oYyxhLGI9e30pe2xldCBlPWQoYS54LWMueCksZj1kKGEueS1jLnkpO3JldHVybihiLm11bHRpcGxpZXJ8fDEpKk1hdGguc3FydChlKmUrZipmKX0sZXVjbGlkaWFuVG9ydXM6ZnVuY3Rpb24oZSxhLGI9e30pe2xldCBmPWMoZChhLngtZS54KSxhLngrKGIueHx8MCktZS54LGUueCsoYi54fHwwKS1hLngpLGc9YyhkKGEueS1lLnkpLGEueSsoYi55fHwwKS1lLnksZS55KyhiLnl8fDApLWEueSk7cmV0dXJuKGIubXVsdGlwbGllcnx8MSkqKGYrZykrKChiLmRpYWdvbmFsTXVsdGlwbGllcnx8MS40KS0yKihiLm11bHRpcGxpZXJ8fDEpKSpjKGYsZyl9fTtjbGFzcyBpIGV4dGVuZHMgRXJyb3J7Y29uc3RydWN0b3IoYSl7c3VwZXIoYSksdGhpcy5uYW1lPVwiV29ya2VyRXJyb3JcIn19Y2xhc3Mgantjb25zdHJ1Y3RvcihhLGI9e30pe2lmKHRoaXMuZ3JhcGhzPVtdLHRoaXMuaGV1cmlzdGljPWIuaGV1cmlzdGljfHxcIm1hbmhhdHRhblwiLHRoaXMuaGV1cmlzdGljT3B0aW9ucz1iLmhldXJpc3RpY09wdGlvbnN8fHt9LEFycmF5LmlzQXJyYXkoYSkmJih0aGlzLmhldXJpc3RpYz1iLmhldXJpc3RpYyBpbiBoP2IuaGV1cmlzdGljOmIuZGlhZ29uYWxzP2IudG9ydXM/XCJkaWFnb25hbFRvcnVzXCI6XCJkaWFnb25hbFwiOmIudG9ydXM/XCJtYW5oYXR0YW5Ub3J1c1wiOlwibWFuaGF0dGFuXCIsdGhpcy5oZXVyaXN0aWNPcHRpb25zLng9ZS5mcm9tQXJyYXkuWChhLGIub3JkZXIpLHRoaXMuaGV1cmlzdGljT3B0aW9ucy55PWUuZnJvbUFycmF5LlkoYSxiLm9yZGVyKSx0aGlzLmdyYXBocz1lLmZyb21BcnJheS5hcHBseSh0aGlzLGFyZ3VtZW50cyksIUFycmF5LmlzQXJyYXkodGhpcy5ncmFwaHMpJiYodGhpcy5ncmFwaHM9W3RoaXMuZ3JhcGhzXSkpLGIudGhyZWFkJiYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlfHwhKHNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSkpKXt0aGlzLndvcmtlcj1udWxsO3RyeXt0aGlzLndvcmtlcj1uZXcgV29ya2VyKGIudGhyZWFkKX1jYXRjaChhKXt0aHJvd1wiZmlsZTpcIj09PXdpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCYmY29uc29sZS53YXJuKFwiV2ViV29ya2VycyBpbiBsb2NhbCBmaWxlcyBtYXkgbm90IGJlIHN1cHBvcnRlZCBieSB5b3VyIGJyb3dzZXIuXCIpLG5ldyBpKGAke2IudGhyZWFkfSBjb3VsZG4ndCBiZSBvcGVuZWQuYCl9XCJjb3N0XCJpbiBiJiYoYi5jb3N0PWIuY29zdC50b1N0cmluZygpKSx0aGlzLndvcmtlci5wb3N0TWVzc2FnZShbXCJjb25zdHJ1Y3RvclwiLGEsYl0pLHRoaXMucGF0aD0oYSxiLGM9e30pPT57dGhpcy5fd29ya2VyX3BhdGhfY2FsbGJhY2s9Yy5jYWxsYmFjayxkZWxldGUgYy5jYWxsYmFjayx0aGlzLndvcmtlci5wb3N0TWVzc2FnZShbXCJwYXRoXCIsYSxiLGNdKX0sdGhpcy53b3JrZXIub25tZXNzYWdlPShhKT0+e2xldCBiPUpTT04ucGFyc2UoYS5kYXRhKTtzd2l0Y2goYlswXSl7Y2FzZVwicGF0aFwiOnRoaXMuX3dvcmtlcl9wYXRoX2NhbGxiYWNrKGJbMV0pO319fX1wYXRoKGEsYixjPXt9KXtpZihjLmpwcylyZXR1cm4gdGhpcy5qcHMoYSxiLGMpO2xldCBkPW5ldyBnKChhKT0+YS5lc3RpbWF0ZWQpLGU9bmV3IE1hcCxmPXRoaXMuZ3JhcGhzW2MubGF5ZXJ8fDBdO2lmKGE9Zi5ub2RlKGEsITApLGI9Zi5ub2RlKGIsITApLGQuYWRkKHtub2RlOmEsZXN0aW1hdGVkOjB9KSxlLnNldChhLHtzY29yZTowLGZyb206bnVsbH0pLCFjLnN0YXRpY3x8Zi5jb25uZWN0ZWQoYSxiKSlmb3IoO2Quc2l6ZTspe2xldCBhPWQucG9wKCkubm9kZTtpZihhPT09YilicmVhaztmLm5laWdoYm9ycyhhKS5tYXAoKGcpPT57bGV0IGk9KGUuaGFzKGEpP2UuZ2V0KGEpLnNjb3JlOjApK2YuY29zdChhLGcpO2k8KGUuaGFzKGcpP2UuZ2V0KGcpLnNjb3JlOkluZmluaXR5KSYmKGUuc2V0KGcse3Njb3JlOmksZnJvbTphfSksZC5zZXQoe25vZGU6Zyxlc3RpbWF0ZWQ6aStoW2MuaGV1cmlzdGljfHx0aGlzLmhldXJpc3RpY10oZyxiLGMuaGV1cmlzdGljT3B0aW9uc3x8dGhpcy5oZXVyaXN0aWNPcHRpb25zKX0pKX0pLGQuZGVsZXRlKGEpfWxldCBpPVtdO2lmKGUuaGFzKGIpKXtsZXQgYT1iO2ZvcihpLnB1c2goYik7bnVsbCE9PShhPWUuZ2V0KGEpLmZyb20pOylpLnB1c2goYSk7aT1pLnJldmVyc2UoKX1yZXR1cm4gYy5jYWxsYmFjayYmYy5jYWxsYmFjayhpLGUpLGl9fWlmKGouSlBTPWNsYXNze2NvbnN0cnVjdG9yKCl7fXN0YXRpYyBhY2Nlc3MoYyxkLGEsYil7cmV0dXJuIGMuYWRqYWNlbnQoZCxiP2Mubm9kZShhLCEwKTphKX1zdGF0aWMgbmVpZ2hib3Job29kKGEsYyxkLGUpe2xldCBmPVtdLGc9ZC5nZXQoZSkuZnJvbXx8bnVsbDtpZihudWxsIT09Zyl7bGV0IGg9e3g6YihlLngtZy54KSx5OmIoZS55LWcueSl9O2lmKDAhPWgueCYmMCE9aC55KXtsZXQgYj1hKGUse3g6ZS54K2gueCx5OmUueX0sITApLGQ9YShlLHt4OmUueCx5OmUueStoLnl9LCEwKTsoYnx8ZCkmJihmLnB1c2goYy5ub2RlKHt4OmUueCtoLngseTplLnkraC55fSwhMCkpLGImJihmLnB1c2goYy5ub2RlKHt4OmUueCtoLngseTplLnl9LCEwKSksIWEoZSx7eDplLngseTplLnktaC55fSwhMCkmJmYucHVzaChjLm5vZGUoe3g6ZS54K2gueCx5OmUueS1oLnl9LCEwKSkpLGQmJihmLnB1c2goYy5ub2RlKHt4OmUueCx5OmUueStoLnl9LCEwKSksIWEoZSx7eDplLngtaC54LHk6ZS55fSwhMCkmJmYucHVzaChjLm5vZGUoe3g6ZS54LWgueCx5OmUueStoLnl9LCEwKSkpKX1lbHNlIGEoZSx7eDplLngraC54LHk6ZS55K2gueX0sITApJiYoZi5wdXNoKGMubm9kZSh7eDplLngraC54LHk6ZS55K2gueX0sITApKSwwPT1oLng/MCE9aC55JiYoIWEoZSx7eDplLngtMSx5OmUueX0sITApJiZmLnB1c2goYy5ub2RlKHt4OmUueC0xLHk6ZS55K2gueX0sITApKSwhYShlLHt4OmUueCsxLHk6ZS55fSwhMCkmJmYucHVzaChjLm5vZGUoe3g6ZS54KzEseTplLnkraC55fSwhMCkpKTooIWEoZSx7eDplLngseTplLnktMX0sITApJiZmLnB1c2goYy5ub2RlKHt4OmUueCtoLngseTplLnktMX0sITApKSwhYShlLHt4OmUueCx5OmUueSsxfSwhMCkmJmYucHVzaChjLm5vZGUoe3g6ZS54K2gueCx5OmUueSsxfSwhMCkpKSl9ZWxzZSByZXR1cm4gYy5uZWlnaGJvcnMoZSk7cmV0dXJuIGYuZmlsdGVyKChhKT0+YSl9c3RhdGljIGp1bXAoYSxjLGUsZixnLGgpe2Zvcig7Oyl7aWYoIWEoaCxnKSlyZXR1cm4gbnVsbDtpZihnLng9PT1mLngmJmcueT09PWYueSlyZXR1cm4gZztsZXQgaT17eDpiKGcueC1oLngpLHk6YihnLnktaC55KX07aWYoMCE9aS54JiYwIT1pLnkpe2lmKCFhKGcse3g6Zy54LWkueCx5OmcueX0sITApJiZhKGcse3g6Zy54LWkueCx5OmcueStpLnl9LCEwKXx8IWEoZyx7eDpnLngseTpnLnktaS55fSwhMCkmJmEoZyx7eDpnLngraS54LHk6Zy55LWkueX0sITApKXJldHVybiBnO2xldCBiPWouSlBTLmp1bXAuYmluZCh0aGlzLGEsYyxlLGYpO2lmKG51bGwhPT1iKGMubm9kZSh7eDpnLngraS54LHk6Zy55fSwhMCksZyl8fG51bGwhPT1iKGMubm9kZSh7eDpnLngseTpnLnkraS55fSwhMCksZykpcmV0dXJuIGd9ZWxzZSBpZigwIT1pLngpe2lmKCFhKGcse3g6Zy54LHk6Zy55LTF9LCEwKSYmYShnLHt4OmcueCtpLngseTpnLnktMX0sITApfHwhYShnLHt4OmcueCx5OmcueSsxfSwhMCkmJmEoZyx7eDpnLngraS54LHk6Zy55KzF9LCEwKSlyZXR1cm4gZzt9ZWxzZSBpZigwIT1pLnkmJighYShnLHt4OmcueC0xLHk6Zy55fSwhMCkmJmEoZyx7eDpnLngtMSx5OmcueStpLnl9LCEwKXx8IWEoZyx7eDpnLngrMSx5OmcueX0sITApJiZhKGcse3g6Zy54KzEseTpnLnkraS55fSwhMCkpKXJldHVybiBnO2g9ZyxnPWMubm9kZSh7eDpnLngraS54LHk6Zy55K2kueX0sITApfXJldHVybiBudWxsfX0sai5wcm90b3R5cGUuanBzPWZ1bmN0aW9uKGEsYyxkPXt9KXtpZih0aGlzLmdyYXBoc1tkLmxheWVyfHwwXS5UT1JVUylyZXR1cm4gY29uc29sZS53YXJuKFwiVG9ydXMgbWFwIGFyZW4ndCB5ZXQgc3VwcG9ydGVkIGJ5IEpQU1wiKSxkLmNhbGxiYWNrJiZkLmNhbGxiYWNrKFtdLG5ldyBNYXApLFtdO2xldCBlPW5ldyBnKChhKT0+YS5lc3RpbWF0ZWQpLGY9bmV3IE1hcCxpPXRoaXMuZ3JhcGhzW2QubGF5ZXJ8fDBdLGs9bnVsbDthPWkubm9kZShhLCEwKSxjPWkubm9kZShjLCEwKSxlLmFkZCh7bm9kZTphLGVzdGltYXRlZDowfSksZi5zZXQoYSx7c2NvcmU6MCxmcm9tOm51bGx9KTtsZXQgbD1qLkpQUy5hY2Nlc3MuYmluZCh0aGlzLGkpLG49ai5KUFMubmVpZ2hib3Job29kLmJpbmQodGhpcyxsLGksZiksbz1qLkpQUy5qdW1wLmJpbmQodGhpcyxsLGksZixjKTtpZighZC5zdGF0aWN8fGkuY29ubmVjdGVkKGEsYykpZm9yKDtlLnNpemU7KXtsZXQgYT1lLnBvcCgpLm5vZGU7aWYoYT09PWMpYnJlYWs7bihhKS5tYXAoKGIpPT57aWYobnVsbCE9PShrPW8oYixhKSkpe2xldCBiPShmLmhhcyhhKT9mLmdldChhKS5zY29yZTowKStpLmNvc3QoYSxrKTtiPChmLmhhcyhrKT9mLmdldChrKS5zY29yZTpJbmZpbml0eSkmJihmLnNldChrLHtzY29yZTpiLGZyb206YSxqdW1wZWQ6ITB9KSxlLnNldCh7bm9kZTprLGVzdGltYXRlZDpiK2hbZC5oZXVyaXN0aWN8fHRoaXMuaGV1cmlzdGljXShrLGMsZC5oZXVyaXN0aWNPcHRpb25zfHx0aGlzLmhldXJpc3RpY09wdGlvbnMpfSkpfX0pLGUuZGVsZXRlKGEpfWxldCBwPVtdO2lmKGYuaGFzKGMpKXtsZXQgZD1jO2Zvcig7ZC54IT1hLnh8fGQueSE9YS55Oylmb3IobGV0IGE9Zi5nZXQoZCkuZnJvbTtkLnghPWEueHx8ZC55IT1hLnk7KXAucHVzaChkKSxkPWkubm9kZSh7eDpkLngrYihhLngtZC54KSx5OmQueStiKGEueS1kLnkpfSwhMCk7cC5wdXNoKGQpLHAucmV2ZXJzZSgpfXJldHVybiBkLmNhbGxiYWNrJiZkLmNhbGxiYWNrKHAsZikscH0sXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdvcmtlckdsb2JhbFNjb3BlJiZzZWxmIGluc3RhbmNlb2YgV29ya2VyR2xvYmFsU2NvcGUpe2xldCBhO29ubWVzc2FnZT1mdW5jdGlvbihiKXtsZXQgYz1iLmRhdGE7c3dpdGNoKGNbMF0pe2Nhc2VcImNvbnN0cnVjdG9yXCI6aWYoXCJjb3N0XCJpbiBjWzJdKXtsZXQgYT0vXlxcKCguKj8pXFwpXFxzKj0+XFxzKnsvLnRlc3QoY1syXS5jb3N0KSxiPS9eZnVuY3Rpb24gLy50ZXN0KGNbMl0uY29zdCk7Y1syXS5jb3N0PWV2YWwoYCgke2F8fGI/XCJcIjpcImZ1bmN0aW9uIFwifSR7Y1syXS5jb3N0fSlgKX1hPW5ldyBqKGNbMV0sY1syXSk7YnJlYWs7Y2FzZVwicGF0aFwiOnBvc3RNZXNzYWdlKEpTT04uc3RyaW5naWZ5KFtcInBhdGhcIixhLnBhdGgoY1sxXSxjWzJdLGNbM10pXSkpO319fWEuTG93bGlnaHQuQXN0YXI9e0dyYXBoOmUsTm9kZTpmLEJpbmFyeUhlYXA6ZyxIZXVyaXN0aWM6aCxDb25maWd1cmF0aW9uOmosV29ya2VyRXJyb3I6aX19KShcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93P3RoaXM6d2luZG93KTsiLCJmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQ7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCJ2YXIgc3VwZXJQcm9wQmFzZSA9IHJlcXVpcmUoXCIuL3N1cGVyUHJvcEJhc2VcIik7XG5cbmZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIFJlZmxlY3QuZ2V0KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0ID0gUmVmbGVjdC5nZXQ7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0ID0gZnVuY3Rpb24gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgdmFyIGJhc2UgPSBzdXBlclByb3BCYXNlKHRhcmdldCwgcHJvcGVydHkpO1xuICAgICAgaWYgKCFiYXNlKSByZXR1cm47XG4gICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYmFzZSwgcHJvcGVydHkpO1xuXG4gICAgICBpZiAoZGVzYy5nZXQpIHtcbiAgICAgICAgcmV0dXJuIGRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIgfHwgdGFyZ2V0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0OyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJ2YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9nZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX3N1cGVyUHJvcEJhc2Uob2JqZWN0LCBwcm9wZXJ0eSkge1xuICB3aGlsZSAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkge1xuICAgIG9iamVjdCA9IGdldFByb3RvdHlwZU9mKG9iamVjdCk7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zdXBlclByb3BCYXNlOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCIvLyBBIGxpYnJhcnkgb2Ygc2VlZGFibGUgUk5HcyBpbXBsZW1lbnRlZCBpbiBKYXZhc2NyaXB0LlxuLy9cbi8vIFVzYWdlOlxuLy9cbi8vIHZhciBzZWVkcmFuZG9tID0gcmVxdWlyZSgnc2VlZHJhbmRvbScpO1xuLy8gdmFyIHJhbmRvbSA9IHNlZWRyYW5kb20oMSk7IC8vIG9yIGFueSBzZWVkLlxuLy8gdmFyIHggPSByYW5kb20oKTsgICAgICAgLy8gMCA8PSB4IDwgMS4gIEV2ZXJ5IGJpdCBpcyByYW5kb20uXG4vLyB2YXIgeCA9IHJhbmRvbS5xdWljaygpOyAvLyAwIDw9IHggPCAxLiAgMzIgYml0cyBvZiByYW5kb21uZXNzLlxuXG4vLyBhbGVhLCBhIDUzLWJpdCBtdWx0aXBseS13aXRoLWNhcnJ5IGdlbmVyYXRvciBieSBKb2hhbm5lcyBCYWFnw7hlLlxuLy8gUGVyaW9kOiB+Ml4xMTZcbi8vIFJlcG9ydGVkIHRvIHBhc3MgYWxsIEJpZ0NydXNoIHRlc3RzLlxudmFyIGFsZWEgPSByZXF1aXJlKCcuL2xpYi9hbGVhJyk7XG5cbi8vIHhvcjEyOCwgYSBwdXJlIHhvci1zaGlmdCBnZW5lcmF0b3IgYnkgR2VvcmdlIE1hcnNhZ2xpYS5cbi8vIFBlcmlvZDogMl4xMjgtMS5cbi8vIFJlcG9ydGVkIHRvIGZhaWw6IE1hdHJpeFJhbmsgYW5kIExpbmVhckNvbXAuXG52YXIgeG9yMTI4ID0gcmVxdWlyZSgnLi9saWIveG9yMTI4Jyk7XG5cbi8vIHhvcndvdywgR2VvcmdlIE1hcnNhZ2xpYSdzIDE2MC1iaXQgeG9yLXNoaWZ0IGNvbWJpbmVkIHBsdXMgd2V5bC5cbi8vIFBlcmlvZDogMl4xOTItMl4zMlxuLy8gUmVwb3J0ZWQgdG8gZmFpbDogQ29sbGlzaW9uT3ZlciwgU2ltcFBva2VyLCBhbmQgTGluZWFyQ29tcC5cbnZhciB4b3J3b3cgPSByZXF1aXJlKCcuL2xpYi94b3J3b3cnKTtcblxuLy8geG9yc2hpZnQ3LCBieSBGcmFuw6dvaXMgUGFubmV0b24gYW5kIFBpZXJyZSBMJ2VjdXllciwgdGFrZXNcbi8vIGEgZGlmZmVyZW50IGFwcHJvYWNoOiBpdCBhZGRzIHJvYnVzdG5lc3MgYnkgYWxsb3dpbmcgbW9yZSBzaGlmdHNcbi8vIHRoYW4gTWFyc2FnbGlhJ3Mgb3JpZ2luYWwgdGhyZWUuICBJdCBpcyBhIDctc2hpZnQgZ2VuZXJhdG9yXG4vLyB3aXRoIDI1NiBiaXRzLCB0aGF0IHBhc3NlcyBCaWdDcnVzaCB3aXRoIG5vIHN5c3RtYXRpYyBmYWlsdXJlcy5cbi8vIFBlcmlvZCAyXjI1Ni0xLlxuLy8gTm8gc3lzdGVtYXRpYyBCaWdDcnVzaCBmYWlsdXJlcyByZXBvcnRlZC5cbnZhciB4b3JzaGlmdDcgPSByZXF1aXJlKCcuL2xpYi94b3JzaGlmdDcnKTtcblxuLy8geG9yNDA5NiwgYnkgUmljaGFyZCBCcmVudCwgaXMgYSA0MDk2LWJpdCB4b3Itc2hpZnQgd2l0aCBhXG4vLyB2ZXJ5IGxvbmcgcGVyaW9kIHRoYXQgYWxzbyBhZGRzIGEgV2V5bCBnZW5lcmF0b3IuIEl0IGFsc28gcGFzc2VzXG4vLyBCaWdDcnVzaCB3aXRoIG5vIHN5c3RlbWF0aWMgZmFpbHVyZXMuICBJdHMgbG9uZyBwZXJpb2QgbWF5XG4vLyBiZSB1c2VmdWwgaWYgeW91IGhhdmUgbWFueSBnZW5lcmF0b3JzIGFuZCBuZWVkIHRvIGF2b2lkXG4vLyBjb2xsaXNpb25zLlxuLy8gUGVyaW9kOiAyXjQxMjgtMl4zMi5cbi8vIE5vIHN5c3RlbWF0aWMgQmlnQ3J1c2ggZmFpbHVyZXMgcmVwb3J0ZWQuXG52YXIgeG9yNDA5NiA9IHJlcXVpcmUoJy4vbGliL3hvcjQwOTYnKTtcblxuLy8gVHljaGUtaSwgYnkgU2FtdWVsIE5ldmVzIGFuZCBGaWxpcGUgQXJhdWpvLCBpcyBhIGJpdC1zaGlmdGluZyByYW5kb21cbi8vIG51bWJlciBnZW5lcmF0b3IgZGVyaXZlZCBmcm9tIENoYUNoYSwgYSBtb2Rlcm4gc3RyZWFtIGNpcGhlci5cbi8vIGh0dHBzOi8vZWRlbi5kZWkudWMucHQvfnNuZXZlcy9wdWJzLzIwMTEtc25mYTIucGRmXG4vLyBQZXJpb2Q6IH4yXjEyN1xuLy8gTm8gc3lzdGVtYXRpYyBCaWdDcnVzaCBmYWlsdXJlcyByZXBvcnRlZC5cbnZhciB0eWNoZWkgPSByZXF1aXJlKCcuL2xpYi90eWNoZWknKTtcblxuLy8gVGhlIG9yaWdpbmFsIEFSQzQtYmFzZWQgcHJuZyBpbmNsdWRlZCBpbiB0aGlzIGxpYnJhcnkuXG4vLyBQZXJpb2Q6IH4yXjE2MDBcbnZhciBzciA9IHJlcXVpcmUoJy4vc2VlZHJhbmRvbScpO1xuXG5zci5hbGVhID0gYWxlYTtcbnNyLnhvcjEyOCA9IHhvcjEyODtcbnNyLnhvcndvdyA9IHhvcndvdztcbnNyLnhvcnNoaWZ0NyA9IHhvcnNoaWZ0NztcbnNyLnhvcjQwOTYgPSB4b3I0MDk2O1xuc3IudHljaGVpID0gdHljaGVpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNyO1xuIiwiLy8gQSBwb3J0IG9mIGFuIGFsZ29yaXRobSBieSBKb2hhbm5lcyBCYWFnw7hlIDxiYWFnb2VAYmFhZ29lLmNvbT4sIDIwMTBcbi8vIGh0dHA6Ly9iYWFnb2UuY29tL2VuL1JhbmRvbU11c2luZ3MvamF2YXNjcmlwdC9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ucXVpbmxhbi9iZXR0ZXItcmFuZG9tLW51bWJlcnMtZm9yLWphdmFzY3JpcHQtbWlycm9yXG4vLyBPcmlnaW5hbCB3b3JrIGlzIHVuZGVyIE1JVCBsaWNlbnNlIC1cblxuLy8gQ29weXJpZ2h0IChDKSAyMDEwIGJ5IEpvaGFubmVzIEJhYWfDuGUgPGJhYWdvZUBiYWFnb2Uub3JnPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cblxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBBbGVhKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcywgbWFzaCA9IE1hc2goKTtcblxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHQgPSAyMDkxNjM5ICogbWUuczAgKyBtZS5jICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgICBtZS5zMCA9IG1lLnMxO1xuICAgIG1lLnMxID0gbWUuczI7XG4gICAgcmV0dXJuIG1lLnMyID0gdCAtIChtZS5jID0gdCB8IDApO1xuICB9O1xuXG4gIC8vIEFwcGx5IHRoZSBzZWVkaW5nIGFsZ29yaXRobSBmcm9tIEJhYWdvZS5cbiAgbWUuYyA9IDE7XG4gIG1lLnMwID0gbWFzaCgnICcpO1xuICBtZS5zMSA9IG1hc2goJyAnKTtcbiAgbWUuczIgPSBtYXNoKCcgJyk7XG4gIG1lLnMwIC09IG1hc2goc2VlZCk7XG4gIGlmIChtZS5zMCA8IDApIHsgbWUuczAgKz0gMTsgfVxuICBtZS5zMSAtPSBtYXNoKHNlZWQpO1xuICBpZiAobWUuczEgPCAwKSB7IG1lLnMxICs9IDE7IH1cbiAgbWUuczIgLT0gbWFzaChzZWVkKTtcbiAgaWYgKG1lLnMyIDwgMCkgeyBtZS5zMiArPSAxOyB9XG4gIG1hc2ggPSBudWxsO1xufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC5jID0gZi5jO1xuICB0LnMwID0gZi5zMDtcbiAgdC5zMSA9IGYuczE7XG4gIHQuczIgPSBmLnMyO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBBbGVhKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0geGcubmV4dDtcbiAgcHJuZy5pbnQzMiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSAqIDB4MTAwMDAwMDAwKSB8IDA7IH1cbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcHJuZygpICsgKHBybmcoKSAqIDB4MjAwMDAwIHwgMCkgKiAxLjExMDIyMzAyNDYyNTE1NjVlLTE2OyAvLyAyXi01M1xuICB9O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuZnVuY3Rpb24gTWFzaCgpIHtcbiAgdmFyIG4gPSAweGVmYzgyNDlkO1xuXG4gIHZhciBtYXNoID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGRhdGEgPSBTdHJpbmcoZGF0YSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuICs9IGRhdGEuY2hhckNvZGVBdChpKTtcbiAgICAgIHZhciBoID0gMC4wMjUxOTYwMzI4MjQxNjkzOCAqIG47XG4gICAgICBuID0gaCA+Pj4gMDtcbiAgICAgIGggLT0gbjtcbiAgICAgIGggKj0gbjtcbiAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgaCAtPSBuO1xuICAgICAgbiArPSBoICogMHgxMDAwMDAwMDA7IC8vIDJeMzJcbiAgICB9XG4gICAgcmV0dXJuIChuID4+PiAwKSAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG4gIH07XG5cbiAgcmV0dXJuIG1hc2g7XG59XG5cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy5hbGVhID0gaW1wbDtcbn1cblxufSkoXG4gIHRoaXMsXG4gICh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUsICAgIC8vIHByZXNlbnQgaW4gbm9kZS5qc1xuICAodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUgICAvLyBwcmVzZW50IHdpdGggYW4gQU1EIGxvYWRlclxuKTtcblxuXG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiB0aGUgXCJUeWNoZS1pXCIgcHJuZyBhbGdvcml0aG0gYnlcbi8vIFNhbXVlbCBOZXZlcyBhbmQgRmlsaXBlIEFyYXVqby5cbi8vIFNlZSBodHRwczovL2VkZW4uZGVpLnVjLnB0L35zbmV2ZXMvcHVicy8yMDExLXNuZmEyLnBkZlxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzLCBzdHJzZWVkID0gJyc7XG5cbiAgLy8gU2V0IHVwIGdlbmVyYXRvciBmdW5jdGlvbi5cbiAgbWUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBiID0gbWUuYiwgYyA9IG1lLmMsIGQgPSBtZS5kLCBhID0gbWUuYTtcbiAgICBiID0gKGIgPDwgMjUpIF4gKGIgPj4+IDcpIF4gYztcbiAgICBjID0gKGMgLSBkKSB8IDA7XG4gICAgZCA9IChkIDw8IDI0KSBeIChkID4+PiA4KSBeIGE7XG4gICAgYSA9IChhIC0gYikgfCAwO1xuICAgIG1lLmIgPSBiID0gKGIgPDwgMjApIF4gKGIgPj4+IDEyKSBeIGM7XG4gICAgbWUuYyA9IGMgPSAoYyAtIGQpIHwgMDtcbiAgICBtZS5kID0gKGQgPDwgMTYpIF4gKGMgPj4+IDE2KSBeIGE7XG4gICAgcmV0dXJuIG1lLmEgPSAoYSAtIGIpIHwgMDtcbiAgfTtcblxuICAvKiBUaGUgZm9sbG93aW5nIGlzIG5vbi1pbnZlcnRlZCB0eWNoZSwgd2hpY2ggaGFzIGJldHRlciBpbnRlcm5hbFxuICAgKiBiaXQgZGlmZnVzaW9uLCBidXQgd2hpY2ggaXMgYWJvdXQgMjUlIHNsb3dlciB0aGFuIHR5Y2hlLWkgaW4gSlMuXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYSA9IG1lLmEsIGIgPSBtZS5iLCBjID0gbWUuYywgZCA9IG1lLmQ7XG4gICAgYSA9IChtZS5hICsgbWUuYiB8IDApID4+PiAwO1xuICAgIGQgPSBtZS5kIF4gYTsgZCA9IGQgPDwgMTYgXiBkID4+PiAxNjtcbiAgICBjID0gbWUuYyArIGQgfCAwO1xuICAgIGIgPSBtZS5iIF4gYzsgYiA9IGIgPDwgMTIgXiBkID4+PiAyMDtcbiAgICBtZS5hID0gYSA9IGEgKyBiIHwgMDtcbiAgICBkID0gZCBeIGE7IG1lLmQgPSBkID0gZCA8PCA4IF4gZCA+Pj4gMjQ7XG4gICAgbWUuYyA9IGMgPSBjICsgZCB8IDA7XG4gICAgYiA9IGIgXiBjO1xuICAgIHJldHVybiBtZS5iID0gKGIgPDwgNyBeIGIgPj4+IDI1KTtcbiAgfVxuICAqL1xuXG4gIG1lLmEgPSAwO1xuICBtZS5iID0gMDtcbiAgbWUuYyA9IDI2NTQ0MzU3NjkgfCAwO1xuICBtZS5kID0gMTM2NzEzMDU1MTtcblxuICBpZiAoc2VlZCA9PT0gTWF0aC5mbG9vcihzZWVkKSkge1xuICAgIC8vIEludGVnZXIgc2VlZC5cbiAgICBtZS5hID0gKHNlZWQgLyAweDEwMDAwMDAwMCkgfCAwO1xuICAgIG1lLmIgPSBzZWVkIHwgMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdHJpbmcgc2VlZC5cbiAgICBzdHJzZWVkICs9IHNlZWQ7XG4gIH1cblxuICAvLyBNaXggaW4gc3RyaW5nIHNlZWQsIHRoZW4gZGlzY2FyZCBhbiBpbml0aWFsIGJhdGNoIG9mIDY0IHZhbHVlcy5cbiAgZm9yICh2YXIgayA9IDA7IGsgPCBzdHJzZWVkLmxlbmd0aCArIDIwOyBrKyspIHtcbiAgICBtZS5iIF49IHN0cnNlZWQuY2hhckNvZGVBdChrKSB8IDA7XG4gICAgbWUubmV4dCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmEgPSBmLmE7XG4gIHQuYiA9IGYuYjtcbiAgdC5jID0gZi5jO1xuICB0LmQgPSBmLmQ7XG4gIHJldHVybiB0O1xufTtcblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy50eWNoZWkgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIHRoZSBcInhvcjEyOFwiIHBybmcgYWxnb3JpdGhtIGJ5XG4vLyBHZW9yZ2UgTWFyc2FnbGlhLiAgU2VlIGh0dHA6Ly93d3cuanN0YXRzb2Z0Lm9yZy92MDgvaTE0L3BhcGVyXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIFhvckdlbihzZWVkKSB7XG4gIHZhciBtZSA9IHRoaXMsIHN0cnNlZWQgPSAnJztcblxuICBtZS54ID0gMDtcbiAgbWUueSA9IDA7XG4gIG1lLnogPSAwO1xuICBtZS53ID0gMDtcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHQgPSBtZS54IF4gKG1lLnggPDwgMTEpO1xuICAgIG1lLnggPSBtZS55O1xuICAgIG1lLnkgPSBtZS56O1xuICAgIG1lLnogPSBtZS53O1xuICAgIHJldHVybiBtZS53IF49IChtZS53ID4+PiAxOSkgXiB0IF4gKHQgPj4+IDgpO1xuICB9O1xuXG4gIGlmIChzZWVkID09PSAoc2VlZCB8IDApKSB7XG4gICAgLy8gSW50ZWdlciBzZWVkLlxuICAgIG1lLnggPSBzZWVkO1xuICB9IGVsc2Uge1xuICAgIC8vIFN0cmluZyBzZWVkLlxuICAgIHN0cnNlZWQgKz0gc2VlZDtcbiAgfVxuXG4gIC8vIE1peCBpbiBzdHJpbmcgc2VlZCwgdGhlbiBkaXNjYXJkIGFuIGluaXRpYWwgYmF0Y2ggb2YgNjQgdmFsdWVzLlxuICBmb3IgKHZhciBrID0gMDsgayA8IHN0cnNlZWQubGVuZ3RoICsgNjQ7IGsrKykge1xuICAgIG1lLnggXj0gc3Ryc2VlZC5jaGFyQ29kZUF0KGspIHwgMDtcbiAgICBtZS5uZXh0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29weShmLCB0KSB7XG4gIHQueCA9IGYueDtcbiAgdC55ID0gZi55O1xuICB0LnogPSBmLno7XG4gIHQudyA9IGYudztcbiAgcmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGltcGwoc2VlZCwgb3B0cykge1xuICB2YXIgeGcgPSBuZXcgWG9yR2VuKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwOyB9O1xuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvIHtcbiAgICAgIHZhciB0b3AgPSB4Zy5uZXh0KCkgPj4+IDExLFxuICAgICAgICAgIGJvdCA9ICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDAsXG4gICAgICAgICAgcmVzdWx0ID0gKHRvcCArIGJvdCkgLyAoMSA8PCAyMSk7XG4gICAgfSB3aGlsZSAocmVzdWx0ID09PSAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBwcm5nLmludDMyID0geGcubmV4dDtcbiAgcHJuZy5xdWljayA9IHBybmc7XG4gIGlmIChzdGF0ZSkge1xuICAgIGlmICh0eXBlb2Yoc3RhdGUpID09ICdvYmplY3QnKSBjb3B5KHN0YXRlLCB4Zyk7XG4gICAgcHJuZy5zdGF0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29weSh4Zywge30pOyB9XG4gIH1cbiAgcmV0dXJuIHBybmc7XG59XG5cbmlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBpbXBsO1xufSBlbHNlIGlmIChkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBpbXBsOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMueG9yMTI4ID0gaW1wbDtcbn1cblxufSkoXG4gIHRoaXMsXG4gICh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUsICAgIC8vIHByZXNlbnQgaW4gbm9kZS5qc1xuICAodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUgICAvLyBwcmVzZW50IHdpdGggYW4gQU1EIGxvYWRlclxuKTtcblxuXG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiBSaWNoYXJkIEJyZW50J3MgWG9yZ2VucyB4b3I0MDk2IGFsZ29yaXRobS5cbi8vXG4vLyBUaGlzIGZhc3Qgbm9uLWNyeXB0b2dyYXBoaWMgcmFuZG9tIG51bWJlciBnZW5lcmF0b3IgaXMgZGVzaWduZWQgZm9yXG4vLyB1c2UgaW4gTW9udGUtQ2FybG8gYWxnb3JpdGhtcy4gSXQgY29tYmluZXMgYSBsb25nLXBlcmlvZCB4b3JzaGlmdFxuLy8gZ2VuZXJhdG9yIHdpdGggYSBXZXlsIGdlbmVyYXRvciwgYW5kIGl0IHBhc3NlcyBhbGwgY29tbW9uIGJhdHRlcmllc1xuLy8gb2Ygc3Rhc3RpY2lhbCB0ZXN0cyBmb3IgcmFuZG9tbmVzcyB3aGlsZSBjb25zdW1pbmcgb25seSBhIGZldyBuYW5vc2Vjb25kc1xuLy8gZm9yIGVhY2ggcHJuZyBnZW5lcmF0ZWQuICBGb3IgYmFja2dyb3VuZCBvbiB0aGUgZ2VuZXJhdG9yLCBzZWUgQnJlbnQnc1xuLy8gcGFwZXI6IFwiU29tZSBsb25nLXBlcmlvZCByYW5kb20gbnVtYmVyIGdlbmVyYXRvcnMgdXNpbmcgc2hpZnRzIGFuZCB4b3JzLlwiXG4vLyBodHRwOi8vYXJ4aXYub3JnL3BkZi8xMDA0LjMxMTV2MS5wZGZcbi8vXG4vLyBVc2FnZTpcbi8vXG4vLyB2YXIgeG9yNDA5NiA9IHJlcXVpcmUoJ3hvcjQwOTYnKTtcbi8vIHJhbmRvbSA9IHhvcjQwOTYoMSk7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VlZCB3aXRoIGludDMyIG9yIHN0cmluZy5cbi8vIGFzc2VydC5lcXVhbChyYW5kb20oKSwgMC4xNTIwNDM2NDUwNTM4NTQ3KTsgLy8gKDAsIDEpIHJhbmdlLCA1MyBiaXRzLlxuLy8gYXNzZXJ0LmVxdWFsKHJhbmRvbS5pbnQzMigpLCAxODA2NTM0ODk3KTsgICAvLyBzaWduZWQgaW50MzIsIDMyIGJpdHMuXG4vL1xuLy8gRm9yIG5vbnplcm8gbnVtZXJpYyBrZXlzLCB0aGlzIGltcGVsZW1lbnRhdGlvbiBwcm92aWRlcyBhIHNlcXVlbmNlXG4vLyBpZGVudGljYWwgdG8gdGhhdCBieSBCcmVudCdzIHhvcmdlbnMgMyBpbXBsZW1lbnRhaW9uIGluIEMuICBUaGlzXG4vLyBpbXBsZW1lbnRhdGlvbiBhbHNvIHByb3ZpZGVzIGZvciBpbml0YWxpemluZyB0aGUgZ2VuZXJhdG9yIHdpdGhcbi8vIHN0cmluZyBzZWVkcywgb3IgZm9yIHNhdmluZyBhbmQgcmVzdG9yaW5nIHRoZSBzdGF0ZSBvZiB0aGUgZ2VuZXJhdG9yLlxuLy9cbi8vIE9uIENocm9tZSwgdGhpcyBwcm5nIGJlbmNobWFya3MgYWJvdXQgMi4xIHRpbWVzIHNsb3dlciB0aGFuXG4vLyBKYXZhc2NyaXB0J3MgYnVpbHQtaW4gTWF0aC5yYW5kb20oKS5cblxuKGZ1bmN0aW9uKGdsb2JhbCwgbW9kdWxlLCBkZWZpbmUpIHtcblxuZnVuY3Rpb24gWG9yR2VuKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHcgPSBtZS53LFxuICAgICAgICBYID0gbWUuWCwgaSA9IG1lLmksIHQsIHY7XG4gICAgLy8gVXBkYXRlIFdleWwgZ2VuZXJhdG9yLlxuICAgIG1lLncgPSB3ID0gKHcgKyAweDYxYzg4NjQ3KSB8IDA7XG4gICAgLy8gVXBkYXRlIHhvciBnZW5lcmF0b3IuXG4gICAgdiA9IFhbKGkgKyAzNCkgJiAxMjddO1xuICAgIHQgPSBYW2kgPSAoKGkgKyAxKSAmIDEyNyldO1xuICAgIHYgXj0gdiA8PCAxMztcbiAgICB0IF49IHQgPDwgMTc7XG4gICAgdiBePSB2ID4+PiAxNTtcbiAgICB0IF49IHQgPj4+IDEyO1xuICAgIC8vIFVwZGF0ZSBYb3IgZ2VuZXJhdG9yIGFycmF5IHN0YXRlLlxuICAgIHYgPSBYW2ldID0gdiBeIHQ7XG4gICAgbWUuaSA9IGk7XG4gICAgLy8gUmVzdWx0IGlzIHRoZSBjb21iaW5hdGlvbi5cbiAgICByZXR1cm4gKHYgKyAodyBeICh3ID4+PiAxNikpKSB8IDA7XG4gIH07XG5cbiAgZnVuY3Rpb24gaW5pdChtZSwgc2VlZCkge1xuICAgIHZhciB0LCB2LCBpLCBqLCB3LCBYID0gW10sIGxpbWl0ID0gMTI4O1xuICAgIGlmIChzZWVkID09PSAoc2VlZCB8IDApKSB7XG4gICAgICAvLyBOdW1lcmljIHNlZWRzIGluaXRpYWxpemUgdiwgd2hpY2ggaXMgdXNlZCB0byBnZW5lcmF0ZXMgWC5cbiAgICAgIHYgPSBzZWVkO1xuICAgICAgc2VlZCA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0cmluZyBzZWVkcyBhcmUgbWl4ZWQgaW50byB2IGFuZCBYIG9uZSBjaGFyYWN0ZXIgYXQgYSB0aW1lLlxuICAgICAgc2VlZCA9IHNlZWQgKyAnXFwwJztcbiAgICAgIHYgPSAwO1xuICAgICAgbGltaXQgPSBNYXRoLm1heChsaW1pdCwgc2VlZC5sZW5ndGgpO1xuICAgIH1cbiAgICAvLyBJbml0aWFsaXplIGNpcmN1bGFyIGFycmF5IGFuZCB3ZXlsIHZhbHVlLlxuICAgIGZvciAoaSA9IDAsIGogPSAtMzI7IGogPCBsaW1pdDsgKytqKSB7XG4gICAgICAvLyBQdXQgdGhlIHVuaWNvZGUgY2hhcmFjdGVycyBpbnRvIHRoZSBhcnJheSwgYW5kIHNodWZmbGUgdGhlbS5cbiAgICAgIGlmIChzZWVkKSB2IF49IHNlZWQuY2hhckNvZGVBdCgoaiArIDMyKSAlIHNlZWQubGVuZ3RoKTtcbiAgICAgIC8vIEFmdGVyIDMyIHNodWZmbGVzLCB0YWtlIHYgYXMgdGhlIHN0YXJ0aW5nIHcgdmFsdWUuXG4gICAgICBpZiAoaiA9PT0gMCkgdyA9IHY7XG4gICAgICB2IF49IHYgPDwgMTA7XG4gICAgICB2IF49IHYgPj4+IDE1O1xuICAgICAgdiBePSB2IDw8IDQ7XG4gICAgICB2IF49IHYgPj4+IDEzO1xuICAgICAgaWYgKGogPj0gMCkge1xuICAgICAgICB3ID0gKHcgKyAweDYxYzg4NjQ3KSB8IDA7ICAgICAvLyBXZXlsLlxuICAgICAgICB0ID0gKFhbaiAmIDEyN10gXj0gKHYgKyB3KSk7ICAvLyBDb21iaW5lIHhvciBhbmQgd2V5bCB0byBpbml0IGFycmF5LlxuICAgICAgICBpID0gKDAgPT0gdCkgPyBpICsgMSA6IDA7ICAgICAvLyBDb3VudCB6ZXJvZXMuXG4gICAgICB9XG4gICAgfVxuICAgIC8vIFdlIGhhdmUgZGV0ZWN0ZWQgYWxsIHplcm9lczsgbWFrZSB0aGUga2V5IG5vbnplcm8uXG4gICAgaWYgKGkgPj0gMTI4KSB7XG4gICAgICBYWyhzZWVkICYmIHNlZWQubGVuZ3RoIHx8IDApICYgMTI3XSA9IC0xO1xuICAgIH1cbiAgICAvLyBSdW4gdGhlIGdlbmVyYXRvciA1MTIgdGltZXMgdG8gZnVydGhlciBtaXggdGhlIHN0YXRlIGJlZm9yZSB1c2luZyBpdC5cbiAgICAvLyBGYWN0b3JpbmcgdGhpcyBhcyBhIGZ1bmN0aW9uIHNsb3dzIHRoZSBtYWluIGdlbmVyYXRvciwgc28gaXQgaXMganVzdFxuICAgIC8vIHVucm9sbGVkIGhlcmUuICBUaGUgd2V5bCBnZW5lcmF0b3IgaXMgbm90IGFkdmFuY2VkIHdoaWxlIHdhcm1pbmcgdXAuXG4gICAgaSA9IDEyNztcbiAgICBmb3IgKGogPSA0ICogMTI4OyBqID4gMDsgLS1qKSB7XG4gICAgICB2ID0gWFsoaSArIDM0KSAmIDEyN107XG4gICAgICB0ID0gWFtpID0gKChpICsgMSkgJiAxMjcpXTtcbiAgICAgIHYgXj0gdiA8PCAxMztcbiAgICAgIHQgXj0gdCA8PCAxNztcbiAgICAgIHYgXj0gdiA+Pj4gMTU7XG4gICAgICB0IF49IHQgPj4+IDEyO1xuICAgICAgWFtpXSA9IHYgXiB0O1xuICAgIH1cbiAgICAvLyBTdG9yaW5nIHN0YXRlIGFzIG9iamVjdCBtZW1iZXJzIGlzIGZhc3RlciB0aGFuIHVzaW5nIGNsb3N1cmUgdmFyaWFibGVzLlxuICAgIG1lLncgPSB3O1xuICAgIG1lLlggPSBYO1xuICAgIG1lLmkgPSBpO1xuICB9XG5cbiAgaW5pdChtZSwgc2VlZCk7XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmkgPSBmLmk7XG4gIHQudyA9IGYudztcbiAgdC5YID0gZi5YLnNsaWNlKCk7XG4gIHJldHVybiB0O1xufTtcblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIGlmIChzZWVkID09IG51bGwpIHNlZWQgPSArKG5ldyBEYXRlKTtcbiAgdmFyIHhnID0gbmV3IFhvckdlbihzZWVkKSxcbiAgICAgIHN0YXRlID0gb3B0cyAmJiBvcHRzLnN0YXRlLFxuICAgICAgcHJuZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMDsgfTtcbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgdG9wID0geGcubmV4dCgpID4+PiAxMSxcbiAgICAgICAgICBib3QgPSAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwLFxuICAgICAgICAgIHJlc3VsdCA9ICh0b3AgKyBib3QpIC8gKDEgPDwgMjEpO1xuICAgIH0gd2hpbGUgKHJlc3VsdCA9PT0gMCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcHJuZy5pbnQzMiA9IHhnLm5leHQ7XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuWCkgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLnhvcjQwOTYgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2luZG93IG9iamVjdCBvciBnbG9iYWxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuIiwiLy8gQSBKYXZhc2NyaXB0IGltcGxlbWVudGFpb24gb2YgdGhlIFwieG9yc2hpZnQ3XCIgYWxnb3JpdGhtIGJ5XG4vLyBGcmFuw6dvaXMgUGFubmV0b24gYW5kIFBpZXJyZSBMJ2VjdXllcjpcbi8vIFwiT24gdGhlIFhvcmdzaGlmdCBSYW5kb20gTnVtYmVyIEdlbmVyYXRvcnNcIlxuLy8gaHR0cDovL3NhbHVjLmVuZ3IudWNvbm4uZWR1L3JlZnMvY3J5cHRvL3JuZy9wYW5uZXRvbjA1b250aGV4b3JzaGlmdC5wZGZcblxuKGZ1bmN0aW9uKGdsb2JhbCwgbW9kdWxlLCBkZWZpbmUpIHtcblxuZnVuY3Rpb24gWG9yR2VuKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gVXBkYXRlIHhvciBnZW5lcmF0b3IuXG4gICAgdmFyIFggPSBtZS54LCBpID0gbWUuaSwgdCwgdiwgdztcbiAgICB0ID0gWFtpXTsgdCBePSAodCA+Pj4gNyk7IHYgPSB0IF4gKHQgPDwgMjQpO1xuICAgIHQgPSBYWyhpICsgMSkgJiA3XTsgdiBePSB0IF4gKHQgPj4+IDEwKTtcbiAgICB0ID0gWFsoaSArIDMpICYgN107IHYgXj0gdCBeICh0ID4+PiAzKTtcbiAgICB0ID0gWFsoaSArIDQpICYgN107IHYgXj0gdCBeICh0IDw8IDcpO1xuICAgIHQgPSBYWyhpICsgNykgJiA3XTsgdCA9IHQgXiAodCA8PCAxMyk7IHYgXj0gdCBeICh0IDw8IDkpO1xuICAgIFhbaV0gPSB2O1xuICAgIG1lLmkgPSAoaSArIDEpICYgNztcbiAgICByZXR1cm4gdjtcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0KG1lLCBzZWVkKSB7XG4gICAgdmFyIGosIHcsIFggPSBbXTtcblxuICAgIGlmIChzZWVkID09PSAoc2VlZCB8IDApKSB7XG4gICAgICAvLyBTZWVkIHN0YXRlIGFycmF5IHVzaW5nIGEgMzItYml0IGludGVnZXIuXG4gICAgICB3ID0gWFswXSA9IHNlZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNlZWQgc3RhdGUgdXNpbmcgYSBzdHJpbmcuXG4gICAgICBzZWVkID0gJycgKyBzZWVkO1xuICAgICAgZm9yIChqID0gMDsgaiA8IHNlZWQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgWFtqICYgN10gPSAoWFtqICYgN10gPDwgMTUpIF5cbiAgICAgICAgICAgIChzZWVkLmNoYXJDb2RlQXQoaikgKyBYWyhqICsgMSkgJiA3XSA8PCAxMyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEVuZm9yY2UgYW4gYXJyYXkgbGVuZ3RoIG9mIDgsIG5vdCBhbGwgemVyb2VzLlxuICAgIHdoaWxlIChYLmxlbmd0aCA8IDgpIFgucHVzaCgwKTtcbiAgICBmb3IgKGogPSAwOyBqIDwgOCAmJiBYW2pdID09PSAwOyArK2opO1xuICAgIGlmIChqID09IDgpIHcgPSBYWzddID0gLTE7IGVsc2UgdyA9IFhbal07XG5cbiAgICBtZS54ID0gWDtcbiAgICBtZS5pID0gMDtcblxuICAgIC8vIERpc2NhcmQgYW4gaW5pdGlhbCAyNTYgdmFsdWVzLlxuICAgIGZvciAoaiA9IDI1NjsgaiA+IDA7IC0taikge1xuICAgICAgbWUubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQobWUsIHNlZWQpO1xufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC54ID0gZi54LnNsaWNlKCk7XG4gIHQuaSA9IGYuaTtcbiAgcmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGltcGwoc2VlZCwgb3B0cykge1xuICBpZiAoc2VlZCA9PSBudWxsKSBzZWVkID0gKyhuZXcgRGF0ZSk7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLngpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy54b3JzaGlmdDcgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiB0aGUgXCJ4b3J3b3dcIiBwcm5nIGFsZ29yaXRobSBieVxuLy8gR2VvcmdlIE1hcnNhZ2xpYS4gIFNlZSBodHRwOi8vd3d3LmpzdGF0c29mdC5vcmcvdjA4L2kxNC9wYXBlclxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzLCBzdHJzZWVkID0gJyc7XG5cbiAgLy8gU2V0IHVwIGdlbmVyYXRvciBmdW5jdGlvbi5cbiAgbWUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ID0gKG1lLnggXiAobWUueCA+Pj4gMikpO1xuICAgIG1lLnggPSBtZS55OyBtZS55ID0gbWUuejsgbWUueiA9IG1lLnc7IG1lLncgPSBtZS52O1xuICAgIHJldHVybiAobWUuZCA9IChtZS5kICsgMzYyNDM3IHwgMCkpICtcbiAgICAgICAobWUudiA9IChtZS52IF4gKG1lLnYgPDwgNCkpIF4gKHQgXiAodCA8PCAxKSkpIHwgMDtcbiAgfTtcblxuICBtZS54ID0gMDtcbiAgbWUueSA9IDA7XG4gIG1lLnogPSAwO1xuICBtZS53ID0gMDtcbiAgbWUudiA9IDA7XG5cbiAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAvLyBJbnRlZ2VyIHNlZWQuXG4gICAgbWUueCA9IHNlZWQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RyaW5nIHNlZWQuXG4gICAgc3Ryc2VlZCArPSBzZWVkO1xuICB9XG5cbiAgLy8gTWl4IGluIHN0cmluZyBzZWVkLCB0aGVuIGRpc2NhcmQgYW4gaW5pdGlhbCBiYXRjaCBvZiA2NCB2YWx1ZXMuXG4gIGZvciAodmFyIGsgPSAwOyBrIDwgc3Ryc2VlZC5sZW5ndGggKyA2NDsgaysrKSB7XG4gICAgbWUueCBePSBzdHJzZWVkLmNoYXJDb2RlQXQoaykgfCAwO1xuICAgIGlmIChrID09IHN0cnNlZWQubGVuZ3RoKSB7XG4gICAgICBtZS5kID0gbWUueCA8PCAxMCBeIG1lLnggPj4+IDQ7XG4gICAgfVxuICAgIG1lLm5leHQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC54ID0gZi54O1xuICB0LnkgPSBmLnk7XG4gIHQueiA9IGYuejtcbiAgdC53ID0gZi53O1xuICB0LnYgPSBmLnY7XG4gIHQuZCA9IGYuZDtcbiAgcmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGltcGwoc2VlZCwgb3B0cykge1xuICB2YXIgeGcgPSBuZXcgWG9yR2VuKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwOyB9O1xuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvIHtcbiAgICAgIHZhciB0b3AgPSB4Zy5uZXh0KCkgPj4+IDExLFxuICAgICAgICAgIGJvdCA9ICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDAsXG4gICAgICAgICAgcmVzdWx0ID0gKHRvcCArIGJvdCkgLyAoMSA8PCAyMSk7XG4gICAgfSB3aGlsZSAocmVzdWx0ID09PSAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBwcm5nLmludDMyID0geGcubmV4dDtcbiAgcHJuZy5xdWljayA9IHBybmc7XG4gIGlmIChzdGF0ZSkge1xuICAgIGlmICh0eXBlb2Yoc3RhdGUpID09ICdvYmplY3QnKSBjb3B5KHN0YXRlLCB4Zyk7XG4gICAgcHJuZy5zdGF0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29weSh4Zywge30pOyB9XG4gIH1cbiAgcmV0dXJuIHBybmc7XG59XG5cbmlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBpbXBsO1xufSBlbHNlIGlmIChkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBpbXBsOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMueG9yd293ID0gaW1wbDtcbn1cblxufSkoXG4gIHRoaXMsXG4gICh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUsICAgIC8vIHByZXNlbnQgaW4gbm9kZS5qc1xuICAodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUgICAvLyBwcmVzZW50IHdpdGggYW4gQU1EIGxvYWRlclxuKTtcblxuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTkgRGF2aWQgQmF1LlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcbmEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG53aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG5kaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbnBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xudGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG5FWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbk1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC5cbklOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZXG5DTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULFxuVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEVcblNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4qL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgcG9vbCwgbWF0aCkge1xuLy9cbi8vIFRoZSBmb2xsb3dpbmcgY29uc3RhbnRzIGFyZSByZWxhdGVkIHRvIElFRUUgNzU0IGxpbWl0cy5cbi8vXG5cbnZhciB3aWR0aCA9IDI1NiwgICAgICAgIC8vIGVhY2ggUkM0IG91dHB1dCBpcyAwIDw9IHggPCAyNTZcbiAgICBjaHVua3MgPSA2LCAgICAgICAgIC8vIGF0IGxlYXN0IHNpeCBSQzQgb3V0cHV0cyBmb3IgZWFjaCBkb3VibGVcbiAgICBkaWdpdHMgPSA1MiwgICAgICAgIC8vIHRoZXJlIGFyZSA1MiBzaWduaWZpY2FudCBkaWdpdHMgaW4gYSBkb3VibGVcbiAgICBybmduYW1lID0gJ3JhbmRvbScsIC8vIHJuZ25hbWU6IG5hbWUgZm9yIE1hdGgucmFuZG9tIGFuZCBNYXRoLnNlZWRyYW5kb21cbiAgICBzdGFydGRlbm9tID0gbWF0aC5wb3cod2lkdGgsIGNodW5rcyksXG4gICAgc2lnbmlmaWNhbmNlID0gbWF0aC5wb3coMiwgZGlnaXRzKSxcbiAgICBvdmVyZmxvdyA9IHNpZ25pZmljYW5jZSAqIDIsXG4gICAgbWFzayA9IHdpZHRoIC0gMSxcbiAgICBub2RlY3J5cHRvOyAgICAgICAgIC8vIG5vZGUuanMgY3J5cHRvIG1vZHVsZSwgaW5pdGlhbGl6ZWQgYXQgdGhlIGJvdHRvbS5cblxuLy9cbi8vIHNlZWRyYW5kb20oKVxuLy8gVGhpcyBpcyB0aGUgc2VlZHJhbmRvbSBmdW5jdGlvbiBkZXNjcmliZWQgYWJvdmUuXG4vL1xuZnVuY3Rpb24gc2VlZHJhbmRvbShzZWVkLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIga2V5ID0gW107XG4gIG9wdGlvbnMgPSAob3B0aW9ucyA9PSB0cnVlKSA/IHsgZW50cm9weTogdHJ1ZSB9IDogKG9wdGlvbnMgfHwge30pO1xuXG4gIC8vIEZsYXR0ZW4gdGhlIHNlZWQgc3RyaW5nIG9yIGJ1aWxkIG9uZSBmcm9tIGxvY2FsIGVudHJvcHkgaWYgbmVlZGVkLlxuICB2YXIgc2hvcnRzZWVkID0gbWl4a2V5KGZsYXR0ZW4oXG4gICAgb3B0aW9ucy5lbnRyb3B5ID8gW3NlZWQsIHRvc3RyaW5nKHBvb2wpXSA6XG4gICAgKHNlZWQgPT0gbnVsbCkgPyBhdXRvc2VlZCgpIDogc2VlZCwgMyksIGtleSk7XG5cbiAgLy8gVXNlIHRoZSBzZWVkIHRvIGluaXRpYWxpemUgYW4gQVJDNCBnZW5lcmF0b3IuXG4gIHZhciBhcmM0ID0gbmV3IEFSQzQoa2V5KTtcblxuICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByYW5kb20gZG91YmxlIGluIFswLCAxKSB0aGF0IGNvbnRhaW5zXG4gIC8vIHJhbmRvbW5lc3MgaW4gZXZlcnkgYml0IG9mIHRoZSBtYW50aXNzYSBvZiB0aGUgSUVFRSA3NTQgdmFsdWUuXG4gIHZhciBwcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG4gPSBhcmM0LmcoY2h1bmtzKSwgICAgICAgICAgICAgLy8gU3RhcnQgd2l0aCBhIG51bWVyYXRvciBuIDwgMiBeIDQ4XG4gICAgICAgIGQgPSBzdGFydGRlbm9tLCAgICAgICAgICAgICAgICAgLy8gICBhbmQgZGVub21pbmF0b3IgZCA9IDIgXiA0OC5cbiAgICAgICAgeCA9IDA7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGFuZCBubyAnZXh0cmEgbGFzdCBieXRlJy5cbiAgICB3aGlsZSAobiA8IHNpZ25pZmljYW5jZSkgeyAgICAgICAgICAvLyBGaWxsIHVwIGFsbCBzaWduaWZpY2FudCBkaWdpdHMgYnlcbiAgICAgIG4gPSAobiArIHgpICogd2lkdGg7ICAgICAgICAgICAgICAvLyAgIHNoaWZ0aW5nIG51bWVyYXRvciBhbmRcbiAgICAgIGQgKj0gd2lkdGg7ICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGRlbm9taW5hdG9yIGFuZCBnZW5lcmF0aW5nIGFcbiAgICAgIHggPSBhcmM0LmcoMSk7ICAgICAgICAgICAgICAgICAgICAvLyAgIG5ldyBsZWFzdC1zaWduaWZpY2FudC1ieXRlLlxuICAgIH1cbiAgICB3aGlsZSAobiA+PSBvdmVyZmxvdykgeyAgICAgICAgICAgICAvLyBUbyBhdm9pZCByb3VuZGluZyB1cCwgYmVmb3JlIGFkZGluZ1xuICAgICAgbiAvPSAyOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgbGFzdCBieXRlLCBzaGlmdCBldmVyeXRoaW5nXG4gICAgICBkIC89IDI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICByaWdodCB1c2luZyBpbnRlZ2VyIG1hdGggdW50aWxcbiAgICAgIHggPj4+PSAxOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHdlIGhhdmUgZXhhY3RseSB0aGUgZGVzaXJlZCBiaXRzLlxuICAgIH1cbiAgICByZXR1cm4gKG4gKyB4KSAvIGQ7ICAgICAgICAgICAgICAgICAvLyBGb3JtIHRoZSBudW1iZXIgd2l0aGluIFswLCAxKS5cbiAgfTtcblxuICBwcm5nLmludDMyID0gZnVuY3Rpb24oKSB7IHJldHVybiBhcmM0LmcoNCkgfCAwOyB9XG4gIHBybmcucXVpY2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGFyYzQuZyg0KSAvIDB4MTAwMDAwMDAwOyB9XG4gIHBybmcuZG91YmxlID0gcHJuZztcblxuICAvLyBNaXggdGhlIHJhbmRvbW5lc3MgaW50byBhY2N1bXVsYXRlZCBlbnRyb3B5LlxuICBtaXhrZXkodG9zdHJpbmcoYXJjNC5TKSwgcG9vbCk7XG5cbiAgLy8gQ2FsbGluZyBjb252ZW50aW9uOiB3aGF0IHRvIHJldHVybiBhcyBhIGZ1bmN0aW9uIG9mIHBybmcsIHNlZWQsIGlzX21hdGguXG4gIHJldHVybiAob3B0aW9ucy5wYXNzIHx8IGNhbGxiYWNrIHx8XG4gICAgICBmdW5jdGlvbihwcm5nLCBzZWVkLCBpc19tYXRoX2NhbGwsIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIC8vIExvYWQgdGhlIGFyYzQgc3RhdGUgZnJvbSB0aGUgZ2l2ZW4gc3RhdGUgaWYgaXQgaGFzIGFuIFMgYXJyYXkuXG4gICAgICAgICAgaWYgKHN0YXRlLlMpIHsgY29weShzdGF0ZSwgYXJjNCk7IH1cbiAgICAgICAgICAvLyBPbmx5IHByb3ZpZGUgdGhlIC5zdGF0ZSBtZXRob2QgaWYgcmVxdWVzdGVkIHZpYSBvcHRpb25zLnN0YXRlLlxuICAgICAgICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoYXJjNCwge30pOyB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBjYWxsZWQgYXMgYSBtZXRob2Qgb2YgTWF0aCAoTWF0aC5zZWVkcmFuZG9tKCkpLCBtdXRhdGVcbiAgICAgICAgLy8gTWF0aC5yYW5kb20gYmVjYXVzZSB0aGF0IGlzIGhvdyBzZWVkcmFuZG9tLmpzIGhhcyB3b3JrZWQgc2luY2UgdjEuMC5cbiAgICAgICAgaWYgKGlzX21hdGhfY2FsbCkgeyBtYXRoW3JuZ25hbWVdID0gcHJuZzsgcmV0dXJuIHNlZWQ7IH1cblxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0IGlzIGEgbmV3ZXIgY2FsbGluZyBjb252ZW50aW9uLCBzbyByZXR1cm4gdGhlXG4gICAgICAgIC8vIHBybmcgZGlyZWN0bHkuXG4gICAgICAgIGVsc2UgcmV0dXJuIHBybmc7XG4gICAgICB9KShcbiAgcHJuZyxcbiAgc2hvcnRzZWVkLFxuICAnZ2xvYmFsJyBpbiBvcHRpb25zID8gb3B0aW9ucy5nbG9iYWwgOiAodGhpcyA9PSBtYXRoKSxcbiAgb3B0aW9ucy5zdGF0ZSk7XG59XG5cbi8vXG4vLyBBUkM0XG4vL1xuLy8gQW4gQVJDNCBpbXBsZW1lbnRhdGlvbi4gIFRoZSBjb25zdHJ1Y3RvciB0YWtlcyBhIGtleSBpbiB0aGUgZm9ybSBvZlxuLy8gYW4gYXJyYXkgb2YgYXQgbW9zdCAod2lkdGgpIGludGVnZXJzIHRoYXQgc2hvdWxkIGJlIDAgPD0geCA8ICh3aWR0aCkuXG4vL1xuLy8gVGhlIGcoY291bnQpIG1ldGhvZCByZXR1cm5zIGEgcHNldWRvcmFuZG9tIGludGVnZXIgdGhhdCBjb25jYXRlbmF0ZXNcbi8vIHRoZSBuZXh0IChjb3VudCkgb3V0cHV0cyBmcm9tIEFSQzQuICBJdHMgcmV0dXJuIHZhbHVlIGlzIGEgbnVtYmVyIHhcbi8vIHRoYXQgaXMgaW4gdGhlIHJhbmdlIDAgPD0geCA8ICh3aWR0aCBeIGNvdW50KS5cbi8vXG5mdW5jdGlvbiBBUkM0KGtleSkge1xuICB2YXIgdCwga2V5bGVuID0ga2V5Lmxlbmd0aCxcbiAgICAgIG1lID0gdGhpcywgaSA9IDAsIGogPSBtZS5pID0gbWUuaiA9IDAsIHMgPSBtZS5TID0gW107XG5cbiAgLy8gVGhlIGVtcHR5IGtleSBbXSBpcyB0cmVhdGVkIGFzIFswXS5cbiAgaWYgKCFrZXlsZW4pIHsga2V5ID0gW2tleWxlbisrXTsgfVxuXG4gIC8vIFNldCB1cCBTIHVzaW5nIHRoZSBzdGFuZGFyZCBrZXkgc2NoZWR1bGluZyBhbGdvcml0aG0uXG4gIHdoaWxlIChpIDwgd2lkdGgpIHtcbiAgICBzW2ldID0gaSsrO1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgc1tpXSA9IHNbaiA9IG1hc2sgJiAoaiArIGtleVtpICUga2V5bGVuXSArICh0ID0gc1tpXSkpXTtcbiAgICBzW2pdID0gdDtcbiAgfVxuXG4gIC8vIFRoZSBcImdcIiBtZXRob2QgcmV0dXJucyB0aGUgbmV4dCAoY291bnQpIG91dHB1dHMgYXMgb25lIG51bWJlci5cbiAgKG1lLmcgPSBmdW5jdGlvbihjb3VudCkge1xuICAgIC8vIFVzaW5nIGluc3RhbmNlIG1lbWJlcnMgaW5zdGVhZCBvZiBjbG9zdXJlIHN0YXRlIG5lYXJseSBkb3VibGVzIHNwZWVkLlxuICAgIHZhciB0LCByID0gMCxcbiAgICAgICAgaSA9IG1lLmksIGogPSBtZS5qLCBzID0gbWUuUztcbiAgICB3aGlsZSAoY291bnQtLSkge1xuICAgICAgdCA9IHNbaSA9IG1hc2sgJiAoaSArIDEpXTtcbiAgICAgIHIgPSByICogd2lkdGggKyBzW21hc2sgJiAoKHNbaV0gPSBzW2ogPSBtYXNrICYgKGogKyB0KV0pICsgKHNbal0gPSB0KSldO1xuICAgIH1cbiAgICBtZS5pID0gaTsgbWUuaiA9IGo7XG4gICAgcmV0dXJuIHI7XG4gICAgLy8gRm9yIHJvYnVzdCB1bnByZWRpY3RhYmlsaXR5LCB0aGUgZnVuY3Rpb24gY2FsbCBiZWxvdyBhdXRvbWF0aWNhbGx5XG4gICAgLy8gZGlzY2FyZHMgYW4gaW5pdGlhbCBiYXRjaCBvZiB2YWx1ZXMuICBUaGlzIGlzIGNhbGxlZCBSQzQtZHJvcFsyNTZdLlxuICAgIC8vIFNlZSBodHRwOi8vZ29vZ2xlLmNvbS9zZWFyY2g/cT1yc2ErZmx1aHJlcityZXNwb25zZSZidG5JXG4gIH0pKHdpZHRoKTtcbn1cblxuLy9cbi8vIGNvcHkoKVxuLy8gQ29waWVzIGludGVybmFsIHN0YXRlIG9mIEFSQzQgdG8gb3IgZnJvbSBhIHBsYWluIG9iamVjdC5cbi8vXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC5pID0gZi5pO1xuICB0LmogPSBmLmo7XG4gIHQuUyA9IGYuUy5zbGljZSgpO1xuICByZXR1cm4gdDtcbn07XG5cbi8vXG4vLyBmbGF0dGVuKClcbi8vIENvbnZlcnRzIGFuIG9iamVjdCB0cmVlIHRvIG5lc3RlZCBhcnJheXMgb2Ygc3RyaW5ncy5cbi8vXG5mdW5jdGlvbiBmbGF0dGVuKG9iaiwgZGVwdGgpIHtcbiAgdmFyIHJlc3VsdCA9IFtdLCB0eXAgPSAodHlwZW9mIG9iaiksIHByb3A7XG4gIGlmIChkZXB0aCAmJiB0eXAgPT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgICB0cnkgeyByZXN1bHQucHVzaChmbGF0dGVuKG9ialtwcm9wXSwgZGVwdGggLSAxKSk7IH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuICB9XG4gIHJldHVybiAocmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6IHR5cCA9PSAnc3RyaW5nJyA/IG9iaiA6IG9iaiArICdcXDAnKTtcbn1cblxuLy9cbi8vIG1peGtleSgpXG4vLyBNaXhlcyBhIHN0cmluZyBzZWVkIGludG8gYSBrZXkgdGhhdCBpcyBhbiBhcnJheSBvZiBpbnRlZ2VycywgYW5kXG4vLyByZXR1cm5zIGEgc2hvcnRlbmVkIHN0cmluZyBzZWVkIHRoYXQgaXMgZXF1aXZhbGVudCB0byB0aGUgcmVzdWx0IGtleS5cbi8vXG5mdW5jdGlvbiBtaXhrZXkoc2VlZCwga2V5KSB7XG4gIHZhciBzdHJpbmdzZWVkID0gc2VlZCArICcnLCBzbWVhciwgaiA9IDA7XG4gIHdoaWxlIChqIDwgc3RyaW5nc2VlZC5sZW5ndGgpIHtcbiAgICBrZXlbbWFzayAmIGpdID1cbiAgICAgIG1hc2sgJiAoKHNtZWFyIF49IGtleVttYXNrICYgal0gKiAxOSkgKyBzdHJpbmdzZWVkLmNoYXJDb2RlQXQoaisrKSk7XG4gIH1cbiAgcmV0dXJuIHRvc3RyaW5nKGtleSk7XG59XG5cbi8vXG4vLyBhdXRvc2VlZCgpXG4vLyBSZXR1cm5zIGFuIG9iamVjdCBmb3IgYXV0b3NlZWRpbmcsIHVzaW5nIHdpbmRvdy5jcnlwdG8gYW5kIE5vZGUgY3J5cHRvXG4vLyBtb2R1bGUgaWYgYXZhaWxhYmxlLlxuLy9cbmZ1bmN0aW9uIGF1dG9zZWVkKCkge1xuICB0cnkge1xuICAgIHZhciBvdXQ7XG4gICAgaWYgKG5vZGVjcnlwdG8gJiYgKG91dCA9IG5vZGVjcnlwdG8ucmFuZG9tQnl0ZXMpKSB7XG4gICAgICAvLyBUaGUgdXNlIG9mICdvdXQnIHRvIHJlbWVtYmVyIHJhbmRvbUJ5dGVzIG1ha2VzIHRpZ2h0IG1pbmlmaWVkIGNvZGUuXG4gICAgICBvdXQgPSBvdXQod2lkdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQgPSBuZXcgVWludDhBcnJheSh3aWR0aCk7XG4gICAgICAoZ2xvYmFsLmNyeXB0byB8fCBnbG9iYWwubXNDcnlwdG8pLmdldFJhbmRvbVZhbHVlcyhvdXQpO1xuICAgIH1cbiAgICByZXR1cm4gdG9zdHJpbmcob3V0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciBicm93c2VyID0gZ2xvYmFsLm5hdmlnYXRvcixcbiAgICAgICAgcGx1Z2lucyA9IGJyb3dzZXIgJiYgYnJvd3Nlci5wbHVnaW5zO1xuICAgIHJldHVybiBbK25ldyBEYXRlLCBnbG9iYWwsIHBsdWdpbnMsIGdsb2JhbC5zY3JlZW4sIHRvc3RyaW5nKHBvb2wpXTtcbiAgfVxufVxuXG4vL1xuLy8gdG9zdHJpbmcoKVxuLy8gQ29udmVydHMgYW4gYXJyYXkgb2YgY2hhcmNvZGVzIHRvIGEgc3RyaW5nXG4vL1xuZnVuY3Rpb24gdG9zdHJpbmcoYSkge1xuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseSgwLCBhKTtcbn1cblxuLy9cbi8vIFdoZW4gc2VlZHJhbmRvbS5qcyBpcyBsb2FkZWQsIHdlIGltbWVkaWF0ZWx5IG1peCBhIGZldyBiaXRzXG4vLyBmcm9tIHRoZSBidWlsdC1pbiBSTkcgaW50byB0aGUgZW50cm9weSBwb29sLiAgQmVjYXVzZSB3ZSBkb1xuLy8gbm90IHdhbnQgdG8gaW50ZXJmZXJlIHdpdGggZGV0ZXJtaW5pc3RpYyBQUk5HIHN0YXRlIGxhdGVyLFxuLy8gc2VlZHJhbmRvbSB3aWxsIG5vdCBjYWxsIG1hdGgucmFuZG9tIG9uIGl0cyBvd24gYWdhaW4gYWZ0ZXJcbi8vIGluaXRpYWxpemF0aW9uLlxuLy9cbm1peGtleShtYXRoLnJhbmRvbSgpLCBwb29sKTtcblxuLy9cbi8vIE5vZGVqcyBhbmQgQU1EIHN1cHBvcnQ6IGV4cG9ydCB0aGUgaW1wbGVtZW50YXRpb24gYXMgYSBtb2R1bGUgdXNpbmdcbi8vIGVpdGhlciBjb252ZW50aW9uLlxuLy9cbmlmICgodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBzZWVkcmFuZG9tO1xuICAvLyBXaGVuIGluIG5vZGUuanMsIHRyeSB1c2luZyBjcnlwdG8gcGFja2FnZSBmb3IgYXV0b3NlZWRpbmcuXG4gIHRyeSB7XG4gICAgbm9kZWNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuICB9IGNhdGNoIChleCkge31cbn0gZWxzZSBpZiAoKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBzZWVkcmFuZG9tOyB9KTtcbn0gZWxzZSB7XG4gIC8vIFdoZW4gaW5jbHVkZWQgYXMgYSBwbGFpbiBzY3JpcHQsIHNldCB1cCBNYXRoLnNlZWRyYW5kb20gZ2xvYmFsLlxuICBtYXRoWydzZWVkJyArIHJuZ25hbWVdID0gc2VlZHJhbmRvbTtcbn1cblxuXG4vLyBFbmQgYW5vbnltb3VzIHNjb3BlLCBhbmQgcGFzcyBpbml0aWFsIHZhbHVlcy5cbn0pKFxuICAvLyBnbG9iYWw6IGBzZWxmYCBpbiBicm93c2VycyAoaW5jbHVkaW5nIHN0cmljdCBtb2RlIGFuZCB3ZWIgd29ya2VycyksXG4gIC8vIG90aGVyd2lzZSBgdGhpc2AgaW4gTm9kZSBhbmQgb3RoZXIgZW52aXJvbm1lbnRzXG4gICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpID8gc2VsZiA6IHRoaXMsXG4gIFtdLCAgICAgLy8gcG9vbDogZW50cm9weSBwb29sIHN0YXJ0cyBlbXB0eVxuICBNYXRoICAgIC8vIG1hdGg6IHBhY2thZ2UgY29udGFpbmluZyByYW5kb20sIHBvdywgYW5kIHNlZWRyYW5kb21cbik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7XG59O1xuIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBDYXNlVHlwZToge1xuICAgIEVNUFRZOiAwLFxuICAgIFNOQUtFOiAxLFxuICAgIEZSVUlUOiAyLFxuICAgIFdBTEw6IDMsXG4gICAgU05BS0VfREVBRDogNCxcbiAgICBTVVJST1VOREVEOiA1LFxuICAgIEZSVUlUX0dPTEQ6IDYsXG4gICAgQ1JPU1NFRDogN1xuICB9LFxuICBQbGF5ZXJUeXBlOiB7XG4gICAgQUk6IFwiUExBWUVSX0FJXCIsXG4gICAgSFVNQU46IFwiUExBWUVSX0hVTUFOXCIsXG4gICAgSFlCUklEX0hVTUFOX0FJOiBcIlBMQVlFUl9IWUJSSURfSFVNQU5fQUlcIlxuICB9LFxuICBBaUxldmVsOiB7XG4gICAgUkFORE9NOiBcIkFJX0xFVkVMX1JBTkRPTVwiLFxuICAgIExPVzogXCJBSV9MRVZFTF9MT1dcIixcbiAgICBERUZBVUxUOiBcIkFJX0xFVkVMX0RFRkFVTFRcIixcbiAgICBISUdIOiBcIkFJX0xFVkVMX0hJR0hcIixcbiAgICBVTFRSQTogXCJBSV9MRVZFTF9VTFRSQVwiLFxuICAgIENVU1RPTTogXCJBSV9MRVZFTF9DVVNUT01cIixcbiAgICBNT0NLOiBcIkFJX0xFVkVMX01PQ0tcIlxuICB9LFxuICBPdXRwdXRUeXBlOiB7XG4gICAgVEVYVDogXCJPVVRQVVRfVEVYVFwiLFxuICAgIEdSQVBISUNBTDogXCJPVVRQVVRfR1JBUEhJQ0FMXCJcbiAgfSxcbiAgU2V0dGluZzoge1xuICAgIENBTlZBU19XSURUSDogODAwLFxuICAgIENBTlZBU19IRUlHSFQ6IDYwMCxcbiAgICBGT05UX0ZBTUlMWTogXCJEZWxpdXNcIixcbiAgICBGT05UX1NJWkU6IDMyLFxuICAgIEhFQURFUl9IRUlHSFRfREVGQVVMVDogNzUsXG4gICAgVEFSR0VUX0ZQUzogNjAsXG4gICAgVElNRV9NVUxUSVBMSUVSOiAxNSxcbiAgICBJTUFHRV9TTkFLRV9IVUU6IDc1LFxuICAgIElNQUdFX1NOQUtFX1NBVFVSQVRJT046IDUwLFxuICAgIElNQUdFX1NOQUtFX1ZBTFVFOiA3NyxcbiAgICBDQVJTX1RPX1BSRVJFTkRFUjogW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJJXCIsIFwiSlwiLCBcIktcIiwgXCJMXCIsIFwiTVwiLCBcIk5cIiwgXCJPXCIsIFwiUFwiLCBcIlFcIiwgXCJSXCIsIFwiU1wiLCBcIlRcIiwgXCJWXCIsIFwiV1wiLCBcIlhcIiwgXCJZXCIsIFwiWlwiLCBcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIiwgXCJrXCIsIFwibFwiLCBcIm1cIiwgXCJuXCIsIFwib1wiLCBcInBcIiwgXCJxXCIsIFwiclwiLCBcInNcIiwgXCJ0XCIsIFwidlwiLCBcIndcIiwgXCJ4XCIsIFwieVwiLCBcInpcIiwgXCIwXCIsIFwiMVwiLCBcIjJcIiwgXCIzXCIsIFwiNFwiLCBcIjVcIiwgXCI2XCIsIFwiN1wiLCBcIjhcIiwgXCI5XCIsIFwiw5dcIl0sXG4gICAgQVBQX1ZFUlNJT046IFwiMi4yXCIsXG4gICAgREFURV9WRVJTSU9OOiBcIjEwLzE4LzIwMjBcIixcbiAgICBQUk9CX0dPTERfRlJVSVRfMV9QTEFZRVI6IDEwMCxcbiAgICBQUk9CX0dPTERfRlJVSVRfTVVMVElQTEVfUExBWUVSUzogNTAsXG4gICAgSU5GT19OT1RJRl9DT0xPUjogXCJyZ2JhKDUyLCAxNTIsIDIxOSwgMC41KVwiLFxuICAgIEVSUk9SX05PVElGX0NPTE9SOiBcInJnYmEoMjMxLCA3NiwgNjAsIDAuNSlcIlxuICB9LFxuICBEaXJlY3Rpb246IHtcbiAgICBVUDogMCxcbiAgICBUT1A6IDAsXG4gICAgUklHSFQ6IDEsXG4gICAgQk9UVE9NOiAyLFxuICAgIERPV046IDIsXG4gICAgTEVGVDogMyxcbiAgICBBTkdMRV8xOiA0LFxuICAgIEFOR0xFXzI6IDUsXG4gICAgQU5HTEVfMzogNixcbiAgICBBTkdMRV80OiA3XG4gIH0sXG4gIEtleToge1xuICAgIFVQOiAzOCxcbiAgICBSSUdIVDogMzksXG4gICAgQk9UVE9NOiA0MCxcbiAgICBMRUZUOiAzNyxcbiAgICBFTlRFUjogMTNcbiAgfSxcbiAgRXJyb3I6IHtcbiAgICBST09NX05PVF9GT1VORDogXCJST09NX05PVF9GT1VORFwiLFxuICAgIFJPT01fQUxSRUFEWV9KT0lORUQ6IFwiUk9PTV9BTFJFQURZX0pPSU5FRFwiLFxuICAgIElOVkFMSURfU0VUVElOR1M6IFwiSU5WQUxJRF9TRVRUSU5HU1wiLFxuICAgIE1BWF9ST09NX0xJTUlUX1JFQUNIRUQ6IFwiTUFYX1JPT01fTElNSVRfUkVBQ0hFRFwiLFxuICAgIEFVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEOiBcIkFVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEXCIsXG4gICAgQUxSRUFEWV9DUkVBVEVEX1JPT006IFwiQUxSRUFEWV9DUkVBVEVEX1JPT01cIixcbiAgICBCQU5ORUQ6IFwiQkFOTkVEXCIsXG4gICAgRElTQ09OTkVDVEVEOiBcIkRJU0NPTk5FQ1RFRFwiXG4gIH0sXG4gIEdhbWVTdGF0ZToge1xuICAgIFNUQVJUSU5HOiBcIlNUQVJUSU5HXCIsXG4gICAgU1RBUlRFRDogXCJTVEFSVEVEXCIsXG4gICAgU0VBUkNISU5HX1BMQVlFUlM6IFwiU0VBUkNISU5HX1BMQVlFUlNcIixcbiAgICBBVVRIRU5USUNBVElPTl9TVUNDRVNTOiBcIkFVVEhFTlRJQ0FUSU9OX1NVQ0NFU1NcIlxuICB9XG59OyIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnQge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICB9XG5cbiAgcmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICB9XG59IiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAxOS0yMDIwIEVsaWFzdGlrIChlbGlhc3Rpa3NvZnRzLmNvbSlcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBcIlNuYWtlSUFcIi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFwiU25ha2VJQVwiLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovICBcbmltcG9ydCBHYW1lVXRpbHMgZnJvbSBcIi4vR2FtZVV0aWxzXCI7XG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBSZWFjdG9yIGZyb20gXCIuL1JlYWN0b3JcIjtcbmltcG9ydCBHcmlkIGZyb20gXCIuL0dyaWRcIjtcbmltcG9ydCBTbmFrZSBmcm9tIFwiLi9TbmFrZVwiO1xuaW1wb3J0IHNlZWRyYW5kb20gZnJvbSBcInNlZWRyYW5kb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGdyaWQsIHNuYWtlLCBzcGVlZCwgZW5hYmxlUGF1c2UsIGVuYWJsZVJldHJ5LCBwcm9ncmVzc2l2ZVNwZWVkLCBhaVN0dWNrTGltaXQpIHtcbiAgICAvLyBHYW1lIHNldHRpbmdzXG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgICB0aGlzLnNuYWtlcyA9IHNuYWtlO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZCA9PSBudWxsID8gOCA6IHNwZWVkO1xuICAgIHRoaXMuaW5pdGlhbFNwZWVkID0gc3BlZWQgPT0gbnVsbCA/IDggOiBzcGVlZDtcbiAgICB0aGlzLmluaXRpYWxTcGVlZFVudG91Y2hlZCA9IHNwZWVkID09IG51bGwgPyA4IDogc3BlZWQ7XG4gICAgdGhpcy5lbmFibGVQYXVzZSA9IGVuYWJsZVBhdXNlID09IG51bGwgPyB0cnVlIDogZW5hYmxlUGF1c2U7XG4gICAgdGhpcy5lbmFibGVSZXRyeSA9IGVuYWJsZVJldHJ5ID09IG51bGwgPyB0cnVlIDogZW5hYmxlUmV0cnk7XG4gICAgdGhpcy5wcm9ncmVzc2l2ZVNwZWVkID0gcHJvZ3Jlc3NpdmVTcGVlZCA9PSBudWxsID8gZmFsc2UgOiBwcm9ncmVzc2l2ZVNwZWVkO1xuICAgIHRoaXMuYWlTdHVja0xpbWl0ID0gYWlTdHVja0xpbWl0ID09IG51bGwgPyAzIDogYWlTdHVja0xpbWl0O1xuICAgIHRoaXMuY291bnRCZWZvcmVQbGF5ID0gMztcbiAgICAvLyBHYW1lIHZhcmlhYmxlc1xuICAgIHRoaXMubGFzdEtleSA9IC0xO1xuICAgIHRoaXMubnVtRnJ1aXQgPSAxO1xuICAgIHRoaXMudGlja3MgPSAwO1xuICAgIC8vIEdhbWUgc3RhdGUgdmFyaWFibGVzXG4gICAgdGhpcy5maXJzdFN0YXJ0ID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXJ0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuZXhpdGVkID0gZmFsc2U7XG4gICAgdGhpcy5raWxsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVzZXRlZCA9IHRydWU7XG4gICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgIHRoaXMuZ2FtZUZpbmlzaGVkID0gZmFsc2U7IC8vIG9ubHkgdXNlZCBpZiAyIGFuZCBtb3JlIHNuYWtlc1xuICAgIHRoaXMuZ2FtZU1hemVXaW4gPSBmYWxzZTsgLy8gdXNlZCBpbiBtYXplIG1vZGVcbiAgICB0aGlzLnNjb3JlTWF4ID0gZmFsc2U7XG4gICAgdGhpcy5lcnJvck9jY3VycmVkID0gZmFsc2U7XG4gICAgdGhpcy5jbGllbnRTaWRlUHJlZGljdGlvbnNNb2RlID0gZmFsc2U7IC8vIEVuYWJsZSBjbGllbnQtc2lkZSBwcmVkaWN0aW9ucyBtb2RlIGZvciB0aGUgb25saW5lIGdhbWUgKGRpc2FibGUgc29tZSBmdW5jdGlvbnMpXG4gICAgdGhpcy5haVN0dWNrID0gZmFsc2U7IC8vIHRydWUgaWYgb25lIEFJIGlzIHN0dWNrIC0gZGlzYWJsZWQgaWYgYW4gaHVtYW4gcGxheWVyIGlzIHBsYXlpbmdcbiAgICAvLyBJbnRlcnZhbHMsIHRpbWVvdXRzLCBmcmFtZXNcbiAgICB0aGlzLmludGVydmFsUGxheTtcbiAgICAvLyBFdmVudHNcbiAgICB0aGlzLnJlYWN0b3IgPSBuZXcgUmVhY3RvcigpO1xuICAgIHRoaXMucmVhY3Rvci5yZWdpc3RlckV2ZW50KFwib25TdGFydFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uUGF1c2VcIik7XG4gICAgdGhpcy5yZWFjdG9yLnJlZ2lzdGVyRXZlbnQoXCJvbkNvbnRpbnVlXCIpO1xuICAgIHRoaXMucmVhY3Rvci5yZWdpc3RlckV2ZW50KFwib25SZXNldFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uU3RvcFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uRXhpdFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uS2lsbFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uU2NvcmVJbmNyZWFzZWRcIik7XG4gICAgdGhpcy5yZWFjdG9yLnJlZ2lzdGVyRXZlbnQoXCJvblVwZGF0ZVwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uVXBkYXRlQ291bnRlclwiKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYoIXRoaXMuY2xpZW50U2lkZVByZWRpY3Rpb25zTW9kZSkge1xuICAgICAgaWYodGhpcy5zbmFrZXMgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmVycm9yT2NjdXJyZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNuYWtlcyA9IFtdO1xuICAgICAgfSBlbHNlIGlmKCFBcnJheS5pc0FycmF5KHRoaXMuc25ha2VzKSkge1xuICAgICAgICB0aGlzLnNuYWtlcyA9IFt0aGlzLnNuYWtlc107XG4gICAgICB9IGVsc2UgaWYoKEFycmF5LmlzQXJyYXkodGhpcy5zbmFrZXMpICYmIHRoaXMuc25ha2VzLmxlbmd0aCA8PSAwKSB8fCAodGhpcy5ncmlkLm1hemUgJiYgdGhpcy5zbmFrZXMubGVuZ3RoID4gMSkpIHtcbiAgICAgICAgdGhpcy5lcnJvck9jY3VycmVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYodGhpcy5ncmlkIGluc3RhbmNlb2YgR3JpZCA9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmVycm9yT2NjdXJyZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmKCF0aGlzLmVycm9yT2NjdXJyZWQpIHtcbiAgICAgICAgdGhpcy5pbml0R3JpZEFuZFNuYWtlcygpO1xuXG4gICAgICAgIC8vIEluaXQgU25ha2UgY29sb3JzXG4gICAgICAgIGxldCBzdGFydEh1ZSA9IEdhbWVVdGlscy5yYW5kUmFuZ2UoMCwgMzYwLCB0aGlzLmdyaWQgPyBuZXcgc2VlZHJhbmRvbSh0aGlzLmdyaWQuc2VlZEdhbWUpIDogbnVsbCk7XG4gIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZih0aGlzLnNuYWtlc1tpXSBpbnN0YW5jZW9mIFNuYWtlID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yT2NjdXJyZWQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFydEh1ZSA9IEdhbWVVdGlscy5hZGRIdWUoc3RhcnRIdWUsIE1hdGgucm91bmQoMzYwIC8gKHRoaXMuc25ha2VzLmxlbmd0aCkpKTtcbiAgICAgICAgICAgIHRoaXMuc25ha2VzW2ldLmNvbG9yID0gc3RhcnRIdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdEdyaWRBbmRTbmFrZXMoKSB7XG4gICAgdGhpcy5ncmlkLnJlc2V0KCk7XG4gICAgdGhpcy5ncmlkLmluaXQoKTtcblxuICAgIGlmKHRoaXMuc25ha2VzICE9IG51bGwpIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNuYWtlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnNuYWtlc1tpXS5yZXNldCgpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zbmFrZXNbaV0uaW5pdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZ3JpZC5zZXRGcnVpdCh0aGlzLnNuYWtlcy5sZW5ndGgpO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNSZXNldGVkID0gdHJ1ZTtcbiAgICB0aGlzLmV4aXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuY2xlYXJJbnRlcnZhbFBsYXkoKTtcblxuICAgIHRoaXMubnVtRnJ1aXQgPSAxO1xuICAgIHRoaXMudGlja3MgPSAwO1xuICAgIHRoaXMubGFzdEtleSA9IC0xO1xuICAgIHRoaXMuc2NvcmVNYXggPSBmYWxzZTtcbiAgICB0aGlzLmVycm9yT2NjdXJyZWQgPSBmYWxzZTtcbiAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gICAgdGhpcy5nYW1lRmluaXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLmdhbWVNYXplV2luID0gZmFsc2U7XG4gICAgdGhpcy5zdGFydGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaW5pdGlhbFNwZWVkID0gdGhpcy5pbml0aWFsU3BlZWRVbnRvdWNoZWQ7XG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuaW5pdGlhbFNwZWVkVW50b3VjaGVkO1xuICAgIHRoaXMuYWlTdHVjayA9IGZhbHNlO1xuXG4gICAgaWYodGhpcy5ncmlkLnNlZWRHcmlkKSB7XG4gICAgICB0aGlzLmdyaWQuc2VlZEdyaWQgPSBcIlwiICsgKHBhcnNlSW50KHRoaXMuZ3JpZC5zZWVkR3JpZCkgKyAxKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLmdyaWQuc2VlZEdhbWUpIHtcbiAgICAgIHRoaXMuZ3JpZC5zZWVkR2FtZSA9IFwiXCIgKyAocGFyc2VJbnQodGhpcy5ncmlkLnNlZWRHYW1lKSArIDEpO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdEdyaWRBbmRTbmFrZXMoKTtcblxuICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25SZXNldFwiKTtcbiAgICB0aGlzLnN0YXJ0KCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uVXBkYXRlQ291bnRlclwiKTtcbiAgICBcbiAgICBpZighdGhpcy5lcnJvck9jY3VycmVkKSB7XG4gICAgICBpZih0aGlzLnNuYWtlcyAhPSBudWxsKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNuYWtlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmKHRoaXMuc25ha2VzW2ldLmVycm9ySW5pdCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvck9jY3VycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZih0aGlzLnBhdXNlZCAmJiAhdGhpcy5nYW1lT3ZlciAmJiAhdGhpcy5raWxsZWQgJiYgIXRoaXMuc2NvcmVNYXggJiYgIXRoaXMuc3RhcnRpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYoIXRoaXMuZmlyc3RTdGFydCkge1xuICAgICAgICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25Db250aW51ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY291bnRCZWZvcmVQbGF5ID0gMztcbiAgICAgICAgdGhpcy5jbGVhckludGVydmFsUGxheSgpO1xuICAgICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uVXBkYXRlQ291bnRlclwiKTtcblxuICAgICAgICB0aGlzLmludGVydmFsUGxheSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNvdW50QmVmb3JlUGxheS0tO1xuICAgICAgICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25VcGRhdGVDb3VudGVyXCIpO1xuXG4gICAgICAgICAgaWYodGhpcy5jb3VudEJlZm9yZVBsYXkgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmNlU3RhcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvcmNlU3RhcnQoKSB7XG4gICAgdGhpcy5jbGVhckludGVydmFsUGxheSgpO1xuICAgIHRoaXMuY291bnRCZWZvcmVQbGF5ID0gLTE7XG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVzZXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuZmlyc3RTdGFydCA9IGZhbHNlO1xuICAgIHRoaXMuc3RhcnRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uU3RhcnRcIik7XG4gICAgdGhpcy50aWNrKCk7XG4gIH1cblxuICBjbGVhckludGVydmFsUGxheSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxQbGF5KTtcbiAgfVxuXG4gIGNvbnRpbnVlKCkge1xuICAgIGlmKCF0aGlzLmNsaWVudFNpZGVQcmVkaWN0aW9uc01vZGUpIHtcbiAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25Db250aW51ZVwiKTtcbiAgICB9XG4gIH1cblxuICBzdG9wKGZpbmlzaCkge1xuICAgIGlmKCF0aGlzLmdhbWVPdmVyICYmICF0aGlzLmNsaWVudFNpZGVQcmVkaWN0aW9uc01vZGUpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgaWYoZmluaXNoKSB0aGlzLmdhbWVGaW5pc2hlZCA9IHRydWU7XG4gICAgICB0aGlzLmNsZWFySW50ZXJ2YWxQbGF5KCk7XG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uU3RvcFwiKTtcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZighdGhpcy5wYXVzZWQgJiYgIXRoaXMuY2xpZW50U2lkZVByZWRpY3Rpb25zTW9kZSkge1xuICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgICAgdGhpcy5jbGVhckludGVydmFsUGxheSgpO1xuICAgICAgdGhpcy5yZWFjdG9yLmRpc3BhdGNoRXZlbnQoXCJvblBhdXNlXCIpO1xuICAgIH1cbiAgfVxuXG4gIGtpbGwoKSB7XG4gICAgaWYoIXRoaXMua2lsbGVkKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgIHRoaXMua2lsbGVkID0gdHJ1ZTtcblxuICAgICAgaWYodGhpcy5zbmFrZXMgIT0gbnVsbCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5raWxsKCk7XG4gICAgICAgICAgdGhpcy5zbmFrZXNbaV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xlYXJJbnRlcnZhbFBsYXkoKTtcbiAgICAgIHRoaXMuZ3JpZCA9IG51bGw7XG4gICAgICB0aGlzLnNuYWtlcyA9IG51bGw7XG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uS2lsbFwiKTtcbiAgICB9XG4gIH1cblxuICBleGl0KCkge1xuICAgIGlmKCF0aGlzLmV4aXRlZCkge1xuICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICB0aGlzLmV4aXRlZCA9IHRydWU7XG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uRXhpdFwiKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95U25ha2VzKGV4Y2VwdGlvbklkcywgdHlwZXMpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKGV4Y2VwdGlvbklkcyAmJiBBcnJheS5pc0FycmF5KGV4Y2VwdGlvbklkcykgJiYgZXhjZXB0aW9uSWRzLmluZGV4T2YoaSkgPCAwICYmIHR5cGVzLmluZGV4T2YodGhpcy5zbmFrZXNbaV0ucGxheWVyKSA+IC0xKSB0aGlzLnNuYWtlc1tpXS5zZXRHYW1lT3Zlcih0aGlzLnRpY2tzKTtcbiAgICB9XG4gIH1cblxuICBnZXROQlBsYXllcih0eXBlKSB7XG4gICAgbGV0IG51bVBsYXllciA9IDA7XG5cbiAgICBpZih0aGlzLnNuYWtlcyAhPSBudWxsKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYodGhpcy5zbmFrZXNbaV0ucGxheWVyID09IHR5cGUpIHtcbiAgICAgICAgICBudW1QbGF5ZXIrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudW1QbGF5ZXI7XG4gIH1cblxuICBnZXRQbGF5ZXIobnVtLCB0eXBlKSB7XG4gICAgbGV0IG51bVBsYXllciA9IDA7XG5cbiAgICBpZih0aGlzLnNuYWtlcyAhPSBudWxsKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYodGhpcy5zbmFrZXNbaV0ucGxheWVyID09IHR5cGUpIHtcbiAgICAgICAgICBudW1QbGF5ZXIrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG51bVBsYXllciA9PSBudW0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zbmFrZXNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRvVGljaygpO1xuICAgIH0sIHRoaXMuaW5pdGlhbFNwZWVkICogR2FtZUNvbnN0YW50cy5TZXR0aW5nLlRJTUVfTVVMVElQTElFUik7XG4gIH1cblxuICBkb1RpY2soKSB7XG4gICAgaWYoIXRoaXMucGF1c2VkICYmICF0aGlzLmtpbGxlZCkge1xuICAgICAgaWYodGhpcy5sYXN0VGltZSA9PSAwKSB0aGlzLmxhc3RUaW1lID0gdGltZTtcbiAgICAgIHRoaXMudGlja3MrKztcblxuICAgICAgbGV0IHNjb3JlSW5jcmVhc2VkLCBzZXRGcnVpdEVycm9yID0gZmFsc2U7XG5cbiAgICAgIGlmKHRoaXMuZ3JpZCAmJiAoIXRoaXMuZ3JpZC5tYXplIHx8IHRoaXMuZ3JpZC5tYXplRm9yY2VBdXRvIHx8ICgodGhpcy5ncmlkLm1hemUgJiYgKHRoaXMuZ2V0TkJQbGF5ZXIoR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhVTUFOKSA8PSAwICYmIHRoaXMuZ2V0TkJQbGF5ZXIoR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhZQlJJRF9IVU1BTl9BSSkgPD0gMCkpKSB8fCAodGhpcy5ncmlkLm1hemUgJiYgKCh0aGlzLmdldE5CUGxheWVyKEdhbWVDb25zdGFudHMuUGxheWVyVHlwZS5IVU1BTikgPiAwIHx8IHRoaXMuZ2V0TkJQbGF5ZXIoR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhZQlJJRF9IVU1BTl9BSSkgPiAwKSAmJiAodGhpcy5nZXRQbGF5ZXIoMSwgR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhZQlJJRF9IVU1BTl9BSSkgfHwgdGhpcy5nZXRQbGF5ZXIoMSwgR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhVTUFOKSkubGFzdEtleSAhPSAtMSkpKSkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBpbml0aWFsRGlyZWN0aW9uID0gdGhpcy5zbmFrZXNbaV0uZGlyZWN0aW9uO1xuICAgICAgICAgIGxldCBzZXRGcnVpdCA9IGZhbHNlO1xuICAgICAgICAgIGxldCBnb2xkRnJ1aXQgPSBmYWxzZTtcbiAgICAgICAgICBzZXRGcnVpdEVycm9yID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zbmFrZXNbaV0ubGFzdFRhaWxNb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYoIXRoaXMuc25ha2VzW2ldLmdhbWVPdmVyICYmICF0aGlzLnNuYWtlc1tpXS5zY29yZU1heCkge1xuICAgICAgICAgICAgaWYodGhpcy5zbmFrZXNbaV0ucGxheWVyID09IEdhbWVDb25zdGFudHMuUGxheWVyVHlwZS5IVU1BTiB8fCB0aGlzLnNuYWtlc1tpXS5wbGF5ZXIgPT0gR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhZQlJJRF9IVU1BTl9BSSkge1xuICAgICAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5tb3ZlVG8odGhpcy5zbmFrZXNbaV0ubGFzdEtleSk7XG4gICAgICAgICAgICAgIHRoaXMuc25ha2VzW2ldLmxhc3RLZXkgPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNuYWtlc1tpXS5wbGF5ZXIgPT0gR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkFJICYmICghdGhpcy5jbGllbnRTaWRlUHJlZGljdGlvbnNNb2RlIHx8ICh0aGlzLmNsaWVudFNpZGVQcmVkaWN0aW9uc01vZGUgJiYgdGhpcy5zbmFrZXNbaV0uYWlMZXZlbCAhPSBHYW1lQ29uc3RhbnRzLkFpTGV2ZWwuUkFORE9NKSkpIHtcbiAgICAgICAgICAgICAgdGhpcy5zbmFrZXNbaV0ubW92ZVRvKHRoaXMuc25ha2VzW2ldLmFpKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaGVhZFNuYWtlUG9zID0gdGhpcy5zbmFrZXNbaV0uZ2V0SGVhZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc25ha2VzW2ldLnBsYXllciA9PSBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuSFlCUklEX0hVTUFOX0FJICYmIHRoaXMuZ3JpZC5pc0RlYWRQb3NpdGlvbih0aGlzLnNuYWtlc1tpXS5nZXROZXh0UG9zaXRpb24oaGVhZFNuYWtlUG9zLCB0aGlzLnNuYWtlc1tpXS5kaXJlY3Rpb24pKSkge1xuICAgICAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5kaXJlY3Rpb24gPSBpbml0aWFsRGlyZWN0aW9uO1xuICAgICAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5tb3ZlVG8odGhpcy5zbmFrZXNbaV0uYWkoKSk7XG4gICAgICAgICAgICAgIHRoaXMuc25ha2VzW2ldLmxhc3RLZXkgPSAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGVhZFNuYWtlUG9zID0gdGhpcy5zbmFrZXNbaV0uZ2V0TmV4dFBvc2l0aW9uKGhlYWRTbmFrZVBvcywgdGhpcy5zbmFrZXNbaV0uZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodGhpcy5ncmlkLmlzRGVhZFBvc2l0aW9uKGhlYWRTbmFrZVBvcykpIHtcbiAgICAgICAgICAgICAgdGhpcy5zbmFrZXNbaV0uc2V0R2FtZU92ZXIodGhpcy50aWNrcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZih0aGlzLmdyaWQuZ2V0KGhlYWRTbmFrZVBvcykgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVCB8fCB0aGlzLmdyaWQuZ2V0KGhlYWRTbmFrZVBvcykgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5ncmlkLmdldChoZWFkU25ha2VQb3MpID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc25ha2VzW2ldLnNjb3JlKys7XG4gICAgICAgICAgICAgICAgICB0aGlzLmdyaWQuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIHRoaXMuZ3JpZC5mcnVpdFBvcyk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmdyaWQuZnJ1aXRQb3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLmdyaWQuZ2V0KGhlYWRTbmFrZVBvcykgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5zY29yZSArPSAzO1xuICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCB0aGlzLmdyaWQuZnJ1aXRQb3NHb2xkKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5mcnVpdFBvc0dvbGQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgZ29sZEZydWl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzY29yZUluY3JlYXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zbmFrZXNbaV0uaW5zZXJ0KGhlYWRTbmFrZVBvcyk7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmdyaWQubWF6ZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lTWF6ZVdpbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLmdhbWVGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zbmFrZXNbaV0uaGFzTWF4U2NvcmUoKSAmJiB0aGlzLnNuYWtlcy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZU1heCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5zY29yZU1heCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5udW1GcnVpdCsrO1xuICAgICAgICAgICAgICAgICAgaWYoIWdvbGRGcnVpdCkgc2V0RnJ1aXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc25ha2VzLmxlbmd0aCA8PSAxICYmIHRoaXMucHJvZ3Jlc3NpdmVTcGVlZCAmJiB0aGlzLnNuYWtlc1tpXS5zY29yZSA+IDAgJiYgdGhpcy5pbml0aWFsU3BlZWQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxTcGVlZCA9IE1hdGguY2VpbCgoKC10aGlzLmluaXRpYWxTcGVlZFVudG91Y2hlZCAvIDEwMCkgKiB0aGlzLnNuYWtlc1tpXS5zY29yZSkgKyB0aGlzLmluaXRpYWxTcGVlZFVudG91Y2hlZCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxTcGVlZCA9IHRoaXMuaW5pdGlhbFNwZWVkIDwgMSA/IDEgOiB0aGlzLmluaXRpYWxTcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbmFrZXNbaV0uaW5zZXJ0KGhlYWRTbmFrZVBvcyk7XG5cbiAgICAgICAgICAgICAgICBpZighdGhpcy5ncmlkLm1hemUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc25ha2VzW2ldLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zbmFrZXNbaV0ubGFzdFRhaWxNb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIXRoaXMuc2NvcmVNYXggJiYgc2V0RnJ1aXQgJiYgIXRoaXMuY2xpZW50U2lkZVByZWRpY3Rpb25zTW9kZSkge1xuICAgICAgICAgICAgc2V0RnJ1aXRFcnJvciA9ICF0aGlzLmdyaWQuc2V0RnJ1aXQodGhpcy5zbmFrZXMubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGhpcy5zY29yZU1heCAmJiAhc2V0RnJ1aXRFcnJvciAmJiAodGhpcy5ncmlkLmRldGVjdENvcnJpZG9yKHRoaXMuZ3JpZC5mcnVpdFBvcykgfHwgdGhpcy5ncmlkLmlzRnJ1aXRTdXJyb3VuZGVkKHRoaXMuZ3JpZC5mcnVpdFBvcywgdHJ1ZSkpICYmICF0aGlzLmNsaWVudFNpZGVQcmVkaWN0aW9uc01vZGUpIHtcbiAgICAgICAgICBzZXRGcnVpdEVycm9yID0gIXRoaXMuZ3JpZC5zZXRGcnVpdCh0aGlzLnNuYWtlcy5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXRoaXMuc2NvcmVNYXggJiYgdGhpcy5ncmlkLmZydWl0UG9zR29sZCAhPSBudWxsICYmICh0aGlzLmdyaWQuZGV0ZWN0Q29ycmlkb3IodGhpcy5ncmlkLmZydWl0UG9zR29sZCkgfHwgdGhpcy5ncmlkLmlzRnJ1aXRTdXJyb3VuZGVkKHRoaXMuZ3JpZC5mcnVpdFBvc0dvbGQsIHRydWUpKSkge1xuICAgICAgICAgIHRoaXMuZ3JpZC5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgdGhpcy5ncmlkLmZydWl0UG9zR29sZCk7XG4gICAgICAgICAgdGhpcy5ncmlkLmZydWl0UG9zR29sZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmJPdmVyID0gMDtcblxuICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAodGhpcy5zbmFrZXNbal0uZ2FtZU92ZXIgfHwgdGhpcy5zbmFrZXNbal0uc2NvcmVNYXgpICYmIG5iT3ZlcisrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2tpbmcgaWYgdGhlIEFJcyBhcmUgYWxsIHN0dWNrXG4gICAgICAgIGxldCBlbmRHYW1lQUlTdHVjayA9IGZhbHNlO1xuXG4gICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCB0aGlzLnNuYWtlcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIGlmKCF0aGlzLnNuYWtlc1trXS5nYW1lT3ZlciAmJiB0aGlzLnNuYWtlc1trXS5pc0FJU3R1Y2soMSwgMSkpIHtcbiAgICAgICAgICAgIHRoaXMuYWlTdHVjayA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc25ha2VzW2tdLmlzQUlTdHVjayh0aGlzLmFpU3R1Y2tMaW1pdCwgdGhpcy5haVN0dWNrTGltaXQpKSB7IC8vIExpbWl0IG9mIGFpU3R1Y2tMaW1pdCBsb29wcyAtIGVuZCB0aGUgZ2FtZVxuICAgICAgICAgICAgICBlbmRHYW1lQUlTdHVjayA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbmRHYW1lQUlTdHVjayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZigoKHRoaXMuc25ha2VzW2tdLnBsYXllciA9PSBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuSFVNQU4gfHwgdGhpcy5zbmFrZXNba10ucGxheWVyID09IEdhbWVDb25zdGFudHMuUGxheWVyVHlwZS5IWUJSSURfSFVNQU5fQUkpICYmICF0aGlzLnNuYWtlc1trXS5nYW1lT3ZlcikgfHwgKHRoaXMuc25ha2VzW2tdLnBsYXllciA9PSBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuQUkgJiYgIXRoaXMuc25ha2VzW2tdLmdhbWVPdmVyKSkge1xuICAgICAgICAgICAgdGhpcy5haVN0dWNrID0gZmFsc2U7XG4gICAgICAgICAgICBlbmRHYW1lQUlTdHVjayA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG5iT3ZlciA+PSB0aGlzLnNuYWtlcy5sZW5ndGggfHwgc2V0RnJ1aXRFcnJvciB8fCBlbmRHYW1lQUlTdHVjaykge1xuICAgICAgICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgICAgICAgaWYodGhpcy5zbmFrZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25VcGRhdGVcIik7XG5cbiAgICAgICAgaWYoc2NvcmVJbmNyZWFzZWQpIHtcbiAgICAgICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uU2NvcmVJbmNyZWFzZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy50aWNrKCk7XG4gICAgfVxuICB9XG5cbiAgb25SZXNldChjYWxsYmFjaykge1xuICAgIHRoaXMucmVhY3Rvci5hZGRFdmVudExpc3RlbmVyKFwib25SZXNldFwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBvblN0YXJ0KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWFjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJvblN0YXJ0XCIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uQ29udGludWUoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uQ29udGludWVcIiwgY2FsbGJhY2spO1xuICB9XG5cbiAgb25TdG9wKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWFjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJvblN0b3BcIiwgY2FsbGJhY2spO1xuICB9XG5cbiAgb25QYXVzZShjYWxsYmFjaykge1xuICAgIHRoaXMucmVhY3Rvci5hZGRFdmVudExpc3RlbmVyKFwib25QYXVzZVwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBvbkV4aXQoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uRXhpdFwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBvbktpbGwoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uS2lsbFwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBvblNjb3JlSW5jcmVhc2VkKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWFjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJvblNjb3JlSW5jcmVhc2VkXCIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uVXBkYXRlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWFjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJvblVwZGF0ZVwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBvblVwZGF0ZUNvdW50ZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uVXBkYXRlQ291bnRlclwiLCBjYWxsYmFjayk7XG4gIH1cbn0iLCIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE5LTIwMjAgRWxpYXN0aWsgKGVsaWFzdGlrc29mdHMuY29tKVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFwiU25ha2VJQVwiLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggXCJTbmFrZUlBXCIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbmltcG9ydCBSZWFjdG9yIGZyb20gXCIuL1JlYWN0b3JcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUdyb3VwIHtcbiAgY29uc3RydWN0b3IoZ2FtZXMpIHtcbiAgICB0aGlzLmdhbWVzID0gZ2FtZXMgPT0gdW5kZWZpbmVkID8gW10gOiBnYW1lcztcbiAgICB0aGlzLnJlYWN0b3IgPSBuZXcgUmVhY3RvcigpO1xuICAgIHRoaXMucmVhY3Rvci5yZWdpc3RlckV2ZW50KFwib25TdGFydFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uUGF1c2VcIik7XG4gICAgdGhpcy5yZWFjdG9yLnJlZ2lzdGVyRXZlbnQoXCJvbkNvbnRpbnVlXCIpO1xuICAgIHRoaXMucmVhY3Rvci5yZWdpc3RlckV2ZW50KFwib25TdG9wXCIpO1xuICAgIHRoaXMucmVhY3Rvci5yZWdpc3RlckV2ZW50KFwib25SZXNldFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uRXhpdFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uU2NvcmVJbmNyZWFzZWRcIik7XG4gICAgXG4gICAgdGhpcy5pbml0KCk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihpID09IDApIHtcbiAgICAgICAgdGhpcy5nYW1lc1tpXS5lbmFibGVLZXlNZW51ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdGhpcy5nYW1lc1tpXS5vblBhdXNlKChpID0+IHtcbiAgICAgICAgdGhpcy5wYXVzZUFsbChpKTtcbiAgICAgIH0pLmJpbmQobnVsbCwgaSkpO1xuXG4gICAgICB0aGlzLmdhbWVzW2ldLm9uQ29udGludWUoKGkgPT4ge1xuICAgICAgICB0aGlzLnN0YXJ0QWxsKGkpO1xuICAgICAgfSkuYmluZChudWxsLCBpKSk7XG5cbiAgICAgIHRoaXMuZ2FtZXNbaV0ub25FeGl0KChpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja0V4aXQoaSk7XG4gICAgICB9KS5iaW5kKG51bGwsIGkpKTtcblxuICAgICAgdGhpcy5nYW1lc1tpXS5vblN0b3AoKGkgPT4ge1xuICAgICAgICB0aGlzLmNoZWNrU3RvcChpKTtcbiAgICAgIH0pLmJpbmQobnVsbCwgaSkpO1xuXG4gICAgICB0aGlzLmdhbWVzW2ldLm9uUmVzZXQoKGkgPT4ge1xuICAgICAgICB0aGlzLnJlc2V0QWxsKGkpO1xuICAgICAgfSkuYmluZChudWxsLCBpKSk7XG5cbiAgICAgIHRoaXMuZ2FtZXNbaV0ub25TY29yZUluY3JlYXNlZCgoaSA9PiB7XG4gICAgICAgIHRoaXMuY2hlY2tPblNjb3JlSW5jcmVhc2VkKGkpO1xuICAgICAgfSkuYmluZChudWxsLCBpKSk7XG4gICAgfVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5zdGFydEFsbChudWxsKTtcbiAgfVxuXG4gIHN0YXJ0QWxsKGdhbWUpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYodGhpcy5nYW1lc1tpXS5wYXVzZWQgJiYgIXRoaXMuZ2FtZXNbaV0uc3RhcnRpbmcgJiYgKGdhbWUgPT0gbnVsbCB8fCBpICE9IGdhbWUpKSB7XG4gICAgICAgIHRoaXMuZ2FtZXNbaV0uc3RhcnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uU3RhcnRcIik7XG4gIH1cblxuICBvblN0YXJ0KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWFjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJvblN0YXJ0XCIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHBhdXNlQWxsKGdhbWUpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoIXRoaXMuZ2FtZXNbaV0ucGF1c2VkICYmIChnYW1lID09IG51bGwgfHwgaSAhPSBnYW1lKSkge1xuICAgICAgICB0aGlzLmdhbWVzW2ldLnBhdXNlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5yZWFjdG9yLmRpc3BhdGNoRXZlbnQoXCJvblBhdXNlXCIpO1xuICB9XG5cbiAgb25QYXVzZShjYWxsYmFjaykge1xuICAgIHRoaXMucmVhY3Rvci5hZGRFdmVudExpc3RlbmVyKFwib25QYXVzZVwiLCBjYWxsYmFjayk7XG4gIH1cblxuICByZXNldEFsbChnYW1lKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKCF0aGlzLmdhbWVzW2ldLmlzUmVzZXRlZCAmJiAoZ2FtZSA9PSBudWxsIHx8IGkgIT0gZ2FtZSkpIHtcbiAgICAgICAgdGhpcy5nYW1lc1tpXS5yZXNldCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25SZXNldFwiKTtcbiAgfVxuXG4gIG9uUmVzZXQoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uUmVzZXRcIiwgY2FsbGJhY2spO1xuICB9XG5cbiAgY2hlY2tFeGl0KGdhbWUpIHtcbiAgICBsZXQgYWxsRXhpdGVkID0gdHJ1ZTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZighdGhpcy5nYW1lc1tpXS5leGl0ZWQpIHtcbiAgICAgICAgYWxsRXhpdGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoYWxsRXhpdGVkKSB7XG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uRXhpdFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdGFydEFsbChnYW1lKTtcbiAgICB9XG4gIH1cblxuICBvbkV4aXQoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uRXhpdFwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBjaGVja1N0b3AoKSB7XG4gICAgbGV0IGFsbFN0b3BwZWQgPSB0cnVlO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKCF0aGlzLmdhbWVzW2ldLmdhbWVPdmVyKSB7XG4gICAgICAgIGFsbFN0b3BwZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihhbGxTdG9wcGVkKSB7XG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uU3RvcFwiKTtcbiAgICB9XG4gIH1cblxuICBvblN0b3AoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uU3RvcFwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBzdG9wQWxsKGZpbmlzaGVkKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKGZpbmlzaGVkKSB7XG4gICAgICAgIHRoaXMuZ2FtZXNbaV0uZmluaXNoKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5nYW1lc1tpXS5zdG9wKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAga2lsbEFsbCgpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5nYW1lc1tpXS5raWxsKCk7XG4gICAgfVxuICB9XG5cbiAgY2hlY2tPblNjb3JlSW5jcmVhc2VkKCkge1xuICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25TY29yZUluY3JlYXNlZFwiKTtcbiAgfVxuXG4gIG9uU2NvcmVJbmNyZWFzZWQoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uU2NvcmVJbmNyZWFzZWRcIiwgY2FsbGJhY2spO1xuICB9XG5cbiAgc2V0RGlzcGxheUZQUyh2YWx1ZSkge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmdhbWVzW2ldLnNldERpc3BsYXlGUFModmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHNldE5vdGlmaWNhdGlvbihub3RpZmljYXRpb24pIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5nYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5nYW1lc1tpXS5zZXROb3RpZmljYXRpb24obm90aWZpY2F0aW9uLmNvcHkoKSk7XG4gICAgfVxuICB9XG5cbiAgY2xvc2VOb3RpZmljYXRpb24oKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuZ2FtZXNbaV0uc2V0Tm90aWZpY2F0aW9uKG51bGwpO1xuICAgIH1cbiAgfVxuXG4gIGVycm9yT2NjdXJyZWQoKSB7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKHRoaXMuZ2FtZXNbaV0uZXJyb3JPY2N1cnJlZCkgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2xvc2VSYW5raW5nKCkge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmdhbWVzW2ldLmNsb3NlUmFua2luZygpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGRlc3Ryb3lTbmFrZXMoZXhjZXB0aW9uSWRzLCB0eXBlcykge1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmdhbWVzW2ldLmRlc3Ryb3lTbmFrZXMoZXhjZXB0aW9uSWRzLCB0eXBlcyk7XG5cbiAgICAgIGlmKGV4Y2VwdGlvbklkcyAmJiBBcnJheS5pc0FycmF5KGV4Y2VwdGlvbklkcykpIHtcbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IGV4Y2VwdGlvbklkcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIGV4Y2VwdGlvbklkc1tqXSAtPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0V2lubmVycygpIHtcbiAgICBjb25zdCB3aW5uZXJzID0gW107XG4gICAgY29uc3QgaW5kZXggPSBbXTtcbiAgICBsZXQgbWF4U2NvcmUgPSAtMTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5nYW1lc1tpXS5zbmFrZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYodGhpcy5nYW1lc1tpXS5zbmFrZXNbal0uc2NvcmUgPiBtYXhTY29yZSkge1xuICAgICAgICAgIG1heFNjb3JlID0gdGhpcy5nYW1lc1tpXS5zbmFrZXNbal0uc2NvcmU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihtYXhTY29yZSA+PSAwKSB7XG4gICAgICBsZXQgaWR4ID0gMDtcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ2FtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuZ2FtZXNbaV0uc25ha2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgaWYodGhpcy5nYW1lc1tpXS5zbmFrZXNbal0uc2NvcmUgPj0gbWF4U2NvcmUpIHtcbiAgICAgICAgICAgIHdpbm5lcnMucHVzaCh0aGlzLmdhbWVzW2ldLnNuYWtlc1tqXSk7XG4gICAgICAgICAgICBpbmRleC5wdXNoKGlkeCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWR4Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgd2lubmVyczogd2lubmVycyxcbiAgICAgIHNjb3JlOiBtYXhTY29yZSxcbiAgICAgIGluZGV4OiBpbmRleFxuICAgIH1cbiAgfVxufSIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICByYW5kUmFuZ2U6IGZ1bmN0aW9uKG1pbiwgbWF4LCBybmcpIHsgLy8gUmV0dXJuIGFuIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1c2l2ZSkgYW5kIG1heCAoaW5jbHVzaXZlKVxuICAgIHJldHVybiBNYXRoLmZsb29yKChybmcgPyBybmcoKSA6IE1hdGgucmFuZG9tKCkpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcbiAgfSxcbiAgYWRkSHVlOiBmdW5jdGlvbihodWUsIGFkZCkge1xuICAgIGNvbnN0IHJlcyA9IGh1ZSArIGFkZDtcbiAgXG4gICAgaWYocmVzID4gMzYwKSB7XG4gICAgICByZXR1cm4gKHJlcyAtIDM2MCk7XG4gICAgfSBlbHNlIGlmKHJlcyA8IDApIHtcbiAgICAgIHJldHVybiAoMzYwICsgcmVzKTtcbiAgICB9XG4gIFxuICAgIHJldHVybiByZXM7XG4gIH0sXG4gIHNodWZmbGU6IGZ1bmN0aW9uKGEsIHJuZykge1xuICAgIGxldCBqLCB4O1xuICAgIFxuICAgIGZvcihsZXQgaSA9IGEubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgaiA9IE1hdGguZmxvb3IoKHJuZyA/IHJuZygpIDogTWF0aC5yYW5kb20oKSkgKiAoaSArIDEpKTtcbiAgICAgIHggPSBhW2ldO1xuICAgICAgYVtpXSA9IGFbal07XG4gICAgICBhW2pdID0geDtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIGE7XG4gIH0sXG4gIG1pbGxpc2Vjb25kc0Zvcm1hdDogZnVuY3Rpb24obWlsbGlzZWNvbmRzKSB7XG4gICAgbWlsbGlzZWNvbmRzIC89IDEwMDA7XG4gICAgcmV0dXJuIChcIjBcIiArIE1hdGgudHJ1bmMobWlsbGlzZWNvbmRzIC8gNjApKS5zbGljZSgtMikgKyBcIjpcIiArIChcIjBcIiArIE1hdGgudHJ1bmMobWlsbGlzZWNvbmRzICUgNjApKS5zbGljZSgtMik7XG4gIH0sXG4gIHNlY29uZHNGb3JtYXQ6IGZ1bmN0aW9uKHNlY29uZHMpIHtcbiAgICByZXR1cm4gdGhpcy5taWxsaXNlY29uZHNGb3JtYXQoc2Vjb25kcyAqIDEwMDApO1xuICB9XG59IiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAxOS0yMDIwIEVsaWFzdGlrIChlbGlhc3Rpa3NvZnRzLmNvbSlcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBcIlNuYWtlSUFcIi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFwiU25ha2VJQVwiLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5pbXBvcnQgR2FtZVV0aWxzIGZyb20gXCIuL0dhbWVVdGlsc1wiO1xuaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgUG9zaXRpb24gZnJvbSBcIi4vUG9zaXRpb25cIjtcbmltcG9ydCBzZWVkcmFuZG9tIGZyb20gXCJzZWVkcmFuZG9tXCI7XG5pbXBvcnQgKiBhcyBMb3dsaWdodCBmcm9tIFwiLi4vLi4vbGlicy9sb3dsaWdodC5hc3Rhci5taW5cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIGdlbmVyYXRlV2FsbHMsIGJvcmRlcldhbGxzLCBtYXplLCBjdXN0b21HcmlkLCBtYXplRm9yY2VBdXRvLCBzZWVkR3JpZCwgc2VlZEdhbWUsIHByb2JHb2xkRnJ1aXRJbmNyZWFzZSkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aCA9PSB1bmRlZmluZWQgPyAyMCA6IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0ID09IHVuZGVmaW5lZCA/IDIwIDogaGVpZ2h0O1xuICAgIHRoaXMuZ2VuZXJhdGVXYWxscyA9IGdlbmVyYXRlV2FsbHMgPT0gdW5kZWZpbmVkID8gZmFsc2UgOiBnZW5lcmF0ZVdhbGxzO1xuICAgIHRoaXMuYm9yZGVyV2FsbHMgPSBib3JkZXJXYWxscyA9PSB1bmRlZmluZWQgPyBmYWxzZSA6IGJvcmRlcldhbGxzO1xuICAgIHRoaXMubWF6ZSA9IG1hemUgPT0gdW5kZWZpbmVkID8gZmFsc2UgOiBtYXplO1xuICAgIHRoaXMubWF6ZUZpcnN0UG9zaXRpb24gPSBuZXcgUG9zaXRpb24oMSwgMSwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQpO1xuICAgIHRoaXMubWF6ZUZvcmNlQXV0byA9IG1hemVGb3JjZUF1dG8gPT0gdW5kZWZpbmVkID8gZmFsc2UgOiBtYXplRm9yY2VBdXRvO1xuICAgIHRoaXMuZ3JpZDtcbiAgICB0aGlzLmluaXRpYWxHcmlkO1xuICAgIHRoaXMuZnJ1aXRQb3M7XG4gICAgdGhpcy5mcnVpdFBvc0dvbGQ7XG4gICAgdGhpcy5jdXN0b21HcmlkID0gY3VzdG9tR3JpZDtcbiAgICB0aGlzLnNlZWRHcmlkID0gc2VlZEdyaWQgPyBcIlwiICsgcGFyc2VJbnQoc2VlZEdyaWQpIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuc2VlZEdhbWUgPSBzZWVkR3JpZCA/IFwiXCIgKyBwYXJzZUludChzZWVkR2FtZSkgOiB1bmRlZmluZWQ7XG4gICAgdGhpcy5ybmdHcmlkO1xuICAgIHRoaXMucm5nR2FtZTtcbiAgICB0aGlzLnByb2JHb2xkRnJ1aXRJbmNyZWFzZSA9IHByb2JHb2xkRnJ1aXRJbmNyZWFzZSA9PSB1bmRlZmluZWQgPyBmYWxzZSA6IHByb2JHb2xkRnJ1aXRJbmNyZWFzZTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYodGhpcy5jdXN0b21HcmlkICE9IHVuZGVmaW5lZCB8fCB0aGlzLmluaXRpYWxHcmlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgbGV0IGdyaWRUb0NvcHk7XG5cbiAgICAgIGlmKHRoaXMuaW5pdGlhbEdyaWQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGdyaWRUb0NvcHkgPSB0aGlzLmluaXRpYWxHcmlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JpZFRvQ29weSA9IHRoaXMuY3VzdG9tR3JpZDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5oZWlnaHQgPSBncmlkVG9Db3B5Lmxlbmd0aDtcbiAgICAgIHRoaXMud2lkdGggPSBncmlkVG9Db3B5WzBdLmxlbmd0aDtcblxuICAgICAgdGhpcy5pbml0aWFsR3JpZCA9IG5ldyBBcnJheSh0aGlzLmhlaWdodCk7XG4gICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkodGhpcy5oZWlnaHQpO1xuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWlnaHQ7IGkrKykge1xuICAgICAgICB0aGlzLmluaXRpYWxHcmlkW2ldID0gZ3JpZFRvQ29weVtpXS5zbGljZSgpO1xuICAgICAgICB0aGlzLmdyaWRbaV0gPSBncmlkVG9Db3B5W2ldLnNsaWNlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ3JpZCA9IG5ldyBBcnJheSh0aGlzLmhlaWdodCk7XG5cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmhlaWdodDsgaSsrKSB7XG4gICAgICAgIHRoaXMuZ3JpZFtpXSA9IG5ldyBBcnJheSh0aGlzLndpZHRoKTtcblxuICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy53aWR0aDsgaisrKSB7XG4gICAgICAgICAgaWYoKHRoaXMuYm9yZGVyV2FsbHMgJiYgKGkgPT0gMCB8fCBpID09IHRoaXMuaGVpZ2h0IC0gMSB8fCBqID09IDAgfHwgaiA9PSB0aGlzLndpZHRoIC0gMSkpIHx8ICh0aGlzLmdlbmVyYXRlV2FsbHMgJiYgdGhpcy5ybmdHcmlkICYmIHRoaXMucm5nR3JpZCgpID4gMC42NSkgfHwgdGhpcy5tYXplKSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRbaV1bal0gPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLldBTEw7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ3JpZFtpXVtqXSA9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMubWF6ZSkge1xuICAgICAgICB0aGlzLmdlbmVyYXRlTWF6ZSgpO1xuICAgICAgfSBlbHNlIGlmKHRoaXMuZ2VuZXJhdGVXYWxscykge1xuICAgICAgICB0aGlzLmZpeFdhbGxzKHRoaXMuYm9yZGVyV2FsbHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZnJ1aXRQb3NHb2xkID0gbnVsbDtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZ3JpZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmluaXRpYWxHcmlkID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZnJ1aXRQb3MgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5mcnVpdFBvc0dvbGQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5ybmdHcmlkID0gbmV3IHNlZWRyYW5kb20odGhpcy5zZWVkR3JpZCk7XG4gICAgdGhpcy5ybmdHYW1lID0gbmV3IHNlZWRyYW5kb20odGhpcy5zZWVkR2FtZSk7XG4gIH1cblxuICBmaXhXYWxscyhib3JkZXJXYWxscykge1xuICAgIGxldCBzdGFydFksIHN0YXJ0WCwgZW5kWSwgZW5kWDtcblxuICAgIGlmKGJvcmRlcldhbGxzKSB7XG4gICAgICBzdGFydFkgPSAxOyBlbmRZID0gdGhpcy5oZWlnaHQgLSAxO1xuICAgICAgc3RhcnRYID0gMTsgZW5kWCA9IHRoaXMud2lkdGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydFkgPSAwOyBlbmRZID0gdGhpcy5oZWlnaHQ7XG4gICAgICBzdGFydFggPSAwOyBlbmRYID0gdGhpcy53aWR0aDtcbiAgICB9XG5cbiAgICBmb3IobGV0IGkgPSBzdGFydFk7IGkgPCBlbmRZOyBpKyspIHtcbiAgICAgIGZvcihsZXQgaiA9IHN0YXJ0WDsgaiA8IGVuZFg7IGorKykge1xuICAgICAgICBjb25zdCBjdXJyZW50UG9zID0gbmV3IFBvc2l0aW9uKGosIGkpO1xuICAgICAgICBjb25zdCB1cHBlckNhc2UgPSB0aGlzLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCk7XG4gICAgICAgIGNvbnN0IHVwcGVyTGVmdENhc2UgPSB0aGlzLmdldE5leHRQb3NpdGlvbih1cHBlckNhc2UsIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpO1xuICAgICAgICBjb25zdCB1cHBlclJpZ2h0Q2FzZSA9IHRoaXMuZ2V0TmV4dFBvc2l0aW9uKHVwcGVyQ2FzZSwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQpO1xuICAgICAgICBjb25zdCBkb3duQ2FzZSA9IHRoaXMuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3MsIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSk7XG4gICAgICAgIGNvbnN0IGRvd25MZWZ0Q2FzZSA9IHRoaXMuZ2V0TmV4dFBvc2l0aW9uKGRvd25DYXNlLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUKTtcbiAgICAgICAgY29uc3QgZG93blJpZ2h0Q2FzZSA9IHRoaXMuZ2V0TmV4dFBvc2l0aW9uKGRvd25DYXNlLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCk7XG5cbiAgICAgICAgaWYodGhpcy5nZXQodXBwZXJMZWZ0Q2FzZSkgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5XQUxMIHx8IHRoaXMuZ2V0KHVwcGVyUmlnaHRDYXNlKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLldBTEwgfHwgdGhpcy5nZXQoZG93bkxlZnRDYXNlKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLldBTEwgfHwgdGhpcy5nZXQoZG93blJpZ2h0Q2FzZSkgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5XQUxMKSB7XG4gICAgICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgY3VycmVudFBvcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtYXplX3JlY3Vyc2lvbihyLCBjKSB7XG4gICAgY29uc3QgZGlyZWN0aW9ucyA9IEdhbWVVdGlscy5zaHVmZmxlKFtHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQsIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVF0sIHRoaXMucm5nR3JpZCk7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGlyZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgc3dpdGNoKGRpcmVjdGlvbnNbaV0pIHtcbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUDpcbiAgICAgICAgICBpZihyIC0gMiA8PSAwKSBjb250aW51ZTtcblxuICAgICAgICAgIGlmKHRoaXMuZ2V0KG5ldyBQb3NpdGlvbihjLCByIC0gMikpICE9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIG5ldyBQb3NpdGlvbihjLCByIC0gMikpO1xuICAgICAgICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgbmV3IFBvc2l0aW9uKGMsIHIgLSAxKSk7XG4gICAgICAgICAgICB0aGlzLm1hemVfcmVjdXJzaW9uKHIgLSAyLCBjKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVDpcbiAgICAgICAgICBpZihjICsgMiA+PSB0aGlzLndpZHRoIC0gMSkgY29udGludWU7XG5cbiAgICAgICAgICBpZih0aGlzLmdldChuZXcgUG9zaXRpb24oYyArIDIsIHIpKSAhPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSB7XG4gICAgICAgICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCBuZXcgUG9zaXRpb24oYyArIDIsIHIpKTtcbiAgICAgICAgICAgIHRoaXMuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIG5ldyBQb3NpdGlvbihjICsgMSwgcikpO1xuICAgICAgICAgICAgdGhpcy5tYXplX3JlY3Vyc2lvbihyLCBjICsgMik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NOlxuICAgICAgICAgIGlmKHIgKyAyID49IHRoaXMuaGVpZ2h0IC0gMSkgY29udGludWU7XG5cbiAgICAgICAgICBpZih0aGlzLmdldChuZXcgUG9zaXRpb24oYywgciArIDIpKSAhPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSB7XG4gICAgICAgICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCBuZXcgUG9zaXRpb24oYywgciArIDIpKTtcbiAgICAgICAgICAgIHRoaXMuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIG5ldyBQb3NpdGlvbihjLCByICsgMSkpO1xuICAgICAgICAgICAgdGhpcy5tYXplX3JlY3Vyc2lvbihyICsgMiwgYyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVDpcbiAgICAgICAgICBpZihjIC0gMiA8PSAwKSBjb250aW51ZTtcblxuICAgICAgICAgIGlmKHRoaXMuZ2V0KG5ldyBQb3NpdGlvbihjIC0gMiwgcikpICE9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIG5ldyBQb3NpdGlvbihjIC0gMiwgcikpO1xuICAgICAgICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgbmV3IFBvc2l0aW9uKGMgLSAxLCByKSk7XG4gICAgICAgICAgICB0aGlzLm1hemVfcmVjdXJzaW9uKHIsIGMgLSAyKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZU1hemUoKSB7XG4gICAgdGhpcy5tYXplRmlyc3RQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbigxLCAxLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCk7XG4gICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgdGhpcy5tYXplRmlyc3RQb3NpdGlvbik7XG4gICAgdGhpcy5tYXplX3JlY3Vyc2lvbigxLCAxKTtcbiAgfVxuXG4gIHNldCh2YWx1ZSwgcG9zaXRpb24pIHtcbiAgICB0aGlzLmdyaWRbcG9zaXRpb24ueV1bcG9zaXRpb24ueF0gPSB2YWx1ZTtcbiAgfVxuXG4gIGdldChwb3NpdGlvbikge1xuICAgIHJldHVybiB0aGlzLmdyaWRbcG9zaXRpb24ueV1bcG9zaXRpb24ueF07XG4gIH1cblxuICB2YWxUb0NoYXIodmFsdWUpIHtcbiAgICBzd2l0Y2godmFsdWUpIHtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWTpcbiAgICAgICAgcmV0dXJuIFwiLVwiO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNOQUtFOlxuICAgICAgICByZXR1cm4gXCJvXCI7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU05BS0VfREVBRDpcbiAgICAgICAgcmV0dXJuIFwiT1wiO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUOlxuICAgICAgICByZXR1cm4gXCJ4XCI7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuV0FMTDpcbiAgICAgICAgcmV0dXJuIFwiI1wiO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNVUlJPVU5ERUQ6XG4gICAgICAgIHJldHVybiBcIi9cIjtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEOlxuICAgICAgICByZXR1cm4gXCJYXCI7XG4gICAgfVxuICB9XG5cbiAgZ2V0SW1hZ2VDYXNlKHBvc2l0aW9uKSB7XG4gICAgc3dpdGNoKHRoaXMuZ2V0KHBvc2l0aW9uKSkge1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLldBTEw6XG4gICAgICAgIHJldHVybiBcIndhbGwucG5nXCI7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVQ6XG4gICAgICAgIHJldHVybiBcImZydWl0LnBuZ1wiO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUX0dPTEQ6XG4gICAgICAgIHJldHVybiBcImZydWl0X2dvbGQucG5nXCI7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFk6XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNOQUtFOlxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TTkFLRV9ERUFEOlxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TVVJST1VOREVEOlxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5DUk9TU0VEOlxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gXCJ1bmtub3duLnBuZ1wiO1xuICB9XG5cbiAgZ2V0R3JhcGgoaWdub3JlU25ha2VQb3MpIHtcbiAgICBjb25zdCByZXMgPSBuZXcgQXJyYXkodGhpcy5oZWlnaHQpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuaGVpZ2h0OyBpKyspIHtcbiAgICAgIHJlc1tpXSA9IG5ldyBBcnJheSh0aGlzLndpZHRoKTtcblxuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMud2lkdGg7IGorKykge1xuICAgICAgICBjb25zdCBjdXJyZW50UG9zID0gbmV3IFBvc2l0aW9uKGosIGkpO1xuXG4gICAgICAgIGlmKGlnbm9yZVNuYWtlUG9zICYmIHRoaXMuZ2V0KGN1cnJlbnRQb3MpID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU05BS0UpIHtcbiAgICAgICAgICByZXNbaV1bal0gPSAwO1xuICAgICAgICB9IGVsc2UgaWYodGhpcy5pc0RlYWRQb3NpdGlvbihjdXJyZW50UG9zKSkge1xuICAgICAgICAgIHJlc1tpXVtqXSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzW2ldW2pdID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBnZXRSYW5kb21Qb3NpdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKEdhbWVVdGlscy5yYW5kUmFuZ2UoMCwgdGhpcy53aWR0aCAtIDEsIHRoaXMucm5nR2FtZSksIEdhbWVVdGlscy5yYW5kUmFuZ2UoMCwgdGhpcy5oZWlnaHQgLSAxLCB0aGlzLnJuZ0dhbWUpKTtcbiAgfVxuXG4gIHNldEZydWl0KG51bWJlclBsYXllcnMsIGdvbGQpIHtcbiAgICBjb25zdCB0cmllZCA9IFsxXTtcblxuICAgIGlmKCFnb2xkICYmIHRoaXMuZnJ1aXRQb3MgIT0gbnVsbCAmJiB0aGlzLmdldCh0aGlzLmZydWl0UG9zKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUKSB7XG4gICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCB0aGlzLmZydWl0UG9zKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLmdldFRvdGFsKEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFkpID4gMCkge1xuICAgICAgbGV0IHJhbmRvbVBvcywgaXNDb3JyaWRvcjtcblxuICAgICAgZG8ge1xuICAgICAgICByYW5kb21Qb3MgPSB0aGlzLmdldFJhbmRvbVBvc2l0aW9uKCk7XG4gICAgICAgIGlzQ29ycmlkb3IgPSB0aGlzLmRldGVjdENvcnJpZG9yKHJhbmRvbVBvcyk7XG5cbiAgICAgICAgaWYoaXNDb3JyaWRvciAmJiB0aGlzLmdldChyYW5kb21Qb3MpID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFkpIHtcbiAgICAgICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNVUlJPVU5ERUQsIHJhbmRvbVBvcyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmdldFRvdGFsKEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFkpIDw9IDApIHtcbiAgICAgICAgICBpZih0aGlzLmZydWl0UG9zR29sZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gd2hpbGUodGhpcy5nZXQocmFuZG9tUG9zKSAhPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZIHx8IHRoaXMuaXNGcnVpdFN1cnJvdW5kZWQocmFuZG9tUG9zLCB0cnVlKSB8fCAodGhpcy5tYXplICYmICF0aGlzLnRlc3RGcnVpdE1hemUocmFuZG9tUG9zLCB0cmllZCkpIHx8IGlzQ29ycmlkb3IpO1xuXG4gICAgICBpZihnb2xkKSB7XG4gICAgICAgIHRoaXMuZnJ1aXRQb3NHb2xkID0gcmFuZG9tUG9zO1xuICAgICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUX0dPTEQsIHJhbmRvbVBvcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmZydWl0UG9zID0gcmFuZG9tUG9zO1xuICAgICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlULCByYW5kb21Qb3MpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZih0aGlzLmdldFRvdGFsKEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFkpIDw9IDAgJiYgdGhpcy5mcnVpdFBvc0dvbGQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoIXRoaXMubWF6ZSAmJiB0aGlzLmZydWl0UG9zR29sZCA9PSBudWxsICYmIEdhbWVVdGlscy5yYW5kUmFuZ2UoMSwgKHRoaXMucHJvYkdvbGRGcnVpdEluY3JlYXNlID8gMyA6IChudW1iZXJQbGF5ZXJzID4gMSA/IEdhbWVDb25zdGFudHMuU2V0dGluZy5QUk9CX0dPTERfRlJVSVRfTVVMVElQTEVfUExBWUVSUyA6IEdhbWVDb25zdGFudHMuU2V0dGluZy5QUk9CX0dPTERfRlJVSVRfMV9QTEFZRVIpKSwgdGhpcy5ybmdHYW1lKSA9PSAxKSB7XG4gICAgICB0aGlzLnNldEZydWl0KG51bWJlclBsYXllcnMsIHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdGVzdEZydWl0TWF6ZShwb3NpdGlvbiwgdHJpZWQpIHsgLy8gTWF6ZSBtb2RlOiBhdm9pZCBwdXR0aW5nIHRoZSBmcnVpdCB0b28gY2xvc2UgdG8gdGhlIFNuYWtlXG4gICAgY29uc3QgZ3JpZCA9IHRoaXMuZ2V0R3JhcGgodHJ1ZSk7XG4gICAgY29uc3QgZ3JhcGggPSBuZXcgTG93bGlnaHQuQXN0YXIuQ29uZmlndXJhdGlvbihncmlkLCB7XG4gICAgICBvcmRlcjogXCJ5eFwiLFxuICAgICAgdG9ydXM6IGZhbHNlLFxuICAgICAgZGlhZ29uYWxzOiBmYWxzZSxcbiAgICAgIGN1dHRpbmc6IGZhbHNlLFxuICAgICAgY29zdChhLCBiKSB7IHJldHVybiBiID09IDEgPyBudWxsIDogMSB9XG4gICAgfSk7XG4gICAgY29uc3QgcGF0aCA9IGdyYXBoLnBhdGgoe3g6IHRoaXMubWF6ZUZpcnN0UG9zaXRpb24ueCwgeTogdGhpcy5tYXplRmlyc3RQb3NpdGlvbi55fSwge3g6IHBvc2l0aW9uLngsIHk6IHBvc2l0aW9uLnl9KTtcblxuICAgIGlmKHBhdGgubGVuZ3RoIDwgTWF0aC5jZWlsKHRoaXMuZ2V0VG90YWwoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSkgLyAoMSAqIE1hdGguY2VpbCh0cmllZFswXSAvIDQpKSkpIHtcbiAgICAgIHRyaWVkWzBdKys7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyaWVkWzBdKys7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpc0Nhc2VTdXJyb3VuZGVkKHBvc2l0aW9uLCBmaWxsLCBmb3VuZFZhbHMsIGZvcmJpZGRlblZhbHMpIHtcbiAgICBpZighcG9zaXRpb24pIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IGdyaWRDb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmdyaWQpKTtcbiAgICBjb25zdCBjaGVja0xpc3QgPSBbcG9zaXRpb25dO1xuXG4gICAgd2hpbGUoY2hlY2tMaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IGNoZWNrTGlzdFswXTtcbiAgICAgIGNoZWNrTGlzdC5zaGlmdCgpO1xuXG4gICAgICBjb25zdCBkaXJlY3Rpb25zID0gW3RoaXMuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVApLCB0aGlzLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSksIHRoaXMuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCksIHRoaXMuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQpXTsgLy8gVVAsIERPV04sIExFRlQsIFJJR0hUXG5cbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBkaXJlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKGdyaWRDb3B5W2RpcmVjdGlvbnNbaV0ueV1bZGlyZWN0aW9uc1tpXS54XSAhPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkNST1NTRUQgJiYgZm9yYmlkZGVuVmFscy5pbmRleE9mKHRoaXMuZ2V0KGRpcmVjdGlvbnNbaV0pKSA+IC0xKSB7XG4gICAgICAgICAgY2hlY2tMaXN0LnB1c2goZGlyZWN0aW9uc1tpXSk7XG5cbiAgICAgICAgICBpZihmb3VuZFZhbHMuaW5kZXhPZih0aGlzLmdldChkaXJlY3Rpb25zW2ldKSkgPiAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKGZpbGwgJiYgdGhpcy5nZXQoZGlyZWN0aW9uc1tpXSkgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TVVJST1VOREVELCBkaXJlY3Rpb25zW2ldKTtcbiAgICAgICAgICAgIGdyaWRDb3B5W2RpcmVjdGlvbnNbaV0ueV1bZGlyZWN0aW9uc1tpXS54XSA9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU1VSUk9VTkRFRDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ3JpZENvcHlbZGlyZWN0aW9uc1tpXS55XVtkaXJlY3Rpb25zW2ldLnhdID0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5DUk9TU0VEO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmKGZpbGwgJiYgKHRoaXMuZ2V0KHBvc2l0aW9uKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZIHx8IHRoaXMuZ2V0KHBvc2l0aW9uKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUKSB8fCB0aGlzLmdldChwb3NpdGlvbikgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEKSB7XG4gICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNVUlJPVU5ERUQsIHBvc2l0aW9uKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlzRnJ1aXRTdXJyb3VuZGVkKHBvc2l0aW9uLCBmaWxsKSB7XG4gICAgY29uc3Qgc3Vycm91bmRlZCA9IHRoaXMuaXNDYXNlU3Vycm91bmRlZChwb3NpdGlvbiwgZmFsc2UsIFtHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNOQUtFXSwgW0dhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU05BS0VdKTtcblxuICAgIGlmKHN1cnJvdW5kZWQgJiYgZmlsbCkge1xuICAgICAgdGhpcy5pc0Nhc2VTdXJyb3VuZGVkKHBvc2l0aW9uLCB0cnVlLCBbR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TTkFLRV0sIFtHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNOQUtFXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cnJvdW5kZWQ7XG4gIH1cblxuICBkZXRlY3RDb3JyaWRvcihwb3NpdGlvbiwgZ3JpZENvcHkgPSB0aGlzLmdyaWQgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuZ3JpZCkpIDogbnVsbCkge1xuICAgIGlmKHRoaXMubWF6ZSB8fCAhcG9zaXRpb24gIHx8ICFncmlkQ29weSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgcG9zVG9wID0gdGhpcy5nZXROZXh0UG9zaXRpb24ocG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlRPUCk7XG4gICAgY29uc3QgcG9zQm90dG9tID0gdGhpcy5nZXROZXh0UG9zaXRpb24ocG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSk7XG4gICAgY29uc3QgcG9zUmlnaHQgPSB0aGlzLmdldE5leHRQb3NpdGlvbihwb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQpO1xuICAgIGNvbnN0IHBvc0xlZnQgPSB0aGlzLmdldE5leHRQb3NpdGlvbihwb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCk7XG5cbiAgICBjb25zdCBpc0RlYWRQb3NpdGlvblRvcCA9IHRoaXMuaXNEZWFkUG9zaXRpb24ocG9zVG9wLCB0cnVlLCB0cnVlKTtcbiAgICBjb25zdCBpc0RlYWRQb3NpdGlvbkJvdHRvbSA9IHRoaXMuaXNEZWFkUG9zaXRpb24ocG9zQm90dG9tLCB0cnVlLCB0cnVlKTtcbiAgICBjb25zdCBpc0RlYWRQb3NpdGlvblJpZ2h0ID0gdGhpcy5pc0RlYWRQb3NpdGlvbihwb3NSaWdodCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgY29uc3QgaXNEZWFkUG9zaXRpb25MZWZ0ID0gdGhpcy5pc0RlYWRQb3NpdGlvbihwb3NMZWZ0LCB0cnVlLCB0cnVlKTtcbiAgICBjb25zdCBudW1EZWFkUG9zaXRpb25BcnJvdW5kID0gaXNEZWFkUG9zaXRpb25Ub3AgKyBpc0RlYWRQb3NpdGlvbkJvdHRvbSArIGlzRGVhZFBvc2l0aW9uUmlnaHQgKyBpc0RlYWRQb3NpdGlvbkxlZnQ7XG5cbiAgICBpZihudW1EZWFkUG9zaXRpb25BcnJvdW5kIDw9IDEgfHwgdGhpcy5pc0RlYWRQb3NpdGlvbihwb3NpdGlvbiwgdHJ1ZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYobnVtRGVhZFBvc2l0aW9uQXJyb3VuZCA+PSAzKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBncmlkQ29weVtwb3NpdGlvbi55XVtwb3NpdGlvbi54XSA9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuQ1JPU1NFRDtcblxuICAgIGNvbnN0IGNvcnJpZG9yVG9wID0gZ3JpZENvcHlbcG9zVG9wLnldW3Bvc1RvcC54XSAhPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkNST1NTRUQgPyB0aGlzLmRldGVjdENvcnJpZG9yKHBvc1RvcCwgZ3JpZENvcHkpIDogZmFsc2U7XG4gICAgY29uc3QgY29ycmlkb3JCb3R0b20gPSBncmlkQ29weVtwb3NCb3R0b20ueV1bcG9zQm90dG9tLnhdICE9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuQ1JPU1NFRCA/IHRoaXMuZGV0ZWN0Q29ycmlkb3IocG9zQm90dG9tLCBncmlkQ29weSkgOiBmYWxzZTtcbiAgICBjb25zdCBjb3JyaWRvckxlZnQgPSBncmlkQ29weVtwb3NMZWZ0LnldW3Bvc0xlZnQueF0gIT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5DUk9TU0VEID8gdGhpcy5kZXRlY3RDb3JyaWRvcihwb3NMZWZ0LCBncmlkQ29weSkgOiBmYWxzZTtcbiAgICBjb25zdCBjb3JyaWRvclJpZ2h0ID0gZ3JpZENvcHlbcG9zUmlnaHQueV1bcG9zUmlnaHQueF0gIT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5DUk9TU0VEID8gdGhpcy5kZXRlY3RDb3JyaWRvcihwb3NSaWdodCwgZ3JpZENvcHkpIDogZmFsc2U7XG5cbiAgICBpZihjb3JyaWRvckJvdHRvbSB8fCBjb3JyaWRvclRvcCB8fCBjb3JyaWRvckxlZnQgfHwgY29ycmlkb3JSaWdodCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0T25MaW5lKHR5cGUsIGxpbmUpIHtcbiAgICBsZXQgdG90ID0gMDtcblxuICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLndpZHRoOyBqKyspIHtcbiAgICAgIGlmKHRoaXMuZ2V0KG5ldyBQb3NpdGlvbihqLCBsaW5lKSkgPT0gdHlwZSkge1xuICAgICAgICB0b3QrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdG90O1xuICB9XG5cbiAgZ2V0VG90YWwodHlwZSkge1xuICAgIGxldCB0b3QgPSAwO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuaGVpZ2h0OyBpKyspIHtcbiAgICAgIHRvdCArPSB0aGlzLmdldE9uTGluZSh0eXBlLCBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG90O1xuICB9XG5cbiAgZ2V0TmV4dFBvc2l0aW9uKG9sZFBvcywgbmV3RGlyZWN0aW9uKSB7XG4gICAgY29uc3QgcG9zaXRpb24gPSBuZXcgUG9zaXRpb24ob2xkUG9zLngsIG9sZFBvcy55LCBuZXdEaXJlY3Rpb24pO1xuXG4gICAgc3dpdGNoKG5ld0RpcmVjdGlvbikge1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUOlxuICAgICAgICBwb3NpdGlvbi54LS07XG4gICAgICAgIHBvc2l0aW9uLmRpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUDpcbiAgICAgICAgcG9zaXRpb24ueS0tO1xuICAgICAgICBwb3NpdGlvbi5kaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUOlxuICAgICAgICBwb3NpdGlvbi54Kys7XG4gICAgICAgIHBvc2l0aW9uLmRpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NOlxuICAgICAgICBwb3NpdGlvbi55Kys7XG4gICAgICAgIHBvc2l0aW9uLmRpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuS2V5LkxFRlQ6XG4gICAgICAgIHBvc2l0aW9uLngtLTtcbiAgICAgICAgcG9zaXRpb24uZGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5LZXkuTEVGVDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuS2V5LlVQOlxuICAgICAgICBwb3NpdGlvbi55LS07XG4gICAgICAgIHBvc2l0aW9uLmRpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuS2V5LlVQO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5LZXkuUklHSFQ6XG4gICAgICAgIHBvc2l0aW9uLngrKztcbiAgICAgICAgcG9zaXRpb24uZGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLktleS5CT1RUT006XG4gICAgICAgIHBvc2l0aW9uLnkrKztcbiAgICAgICAgcG9zaXRpb24uZGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBpZihwb3NpdGlvbi54IDwgMCkge1xuICAgICAgcG9zaXRpb24ueCA9IHRoaXMud2lkdGggLSAxO1xuICAgIH0gZWxzZSBpZihwb3NpdGlvbi54ID49IHRoaXMud2lkdGgpIHtcbiAgICAgIHBvc2l0aW9uLnggPSAwO1xuICAgIH1cblxuICAgIGlmKHBvc2l0aW9uLnkgPCAwKSB7XG4gICAgICBwb3NpdGlvbi55ID0gdGhpcy5oZWlnaHQgLSAxO1xuICAgIH0gZWxzZSBpZihwb3NpdGlvbi55ID49IHRoaXMuaGVpZ2h0KSB7XG4gICAgICBwb3NpdGlvbi55ID0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBnZXREaXJlY3Rpb25Ubyhwb3NpdGlvbiwgb3RoZXJQb3NpdGlvbikge1xuICAgIGlmKHRoaXMuZ2V0TmV4dFBvc2l0aW9uKHBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCkuZXF1YWxzKG90aGVyUG9zaXRpb24pKSB7XG4gICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVA7XG4gICAgfSBlbHNlIGlmKHRoaXMuZ2V0TmV4dFBvc2l0aW9uKHBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00pLmVxdWFscyhvdGhlclBvc2l0aW9uKSkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTTtcbiAgICB9IGVsc2UgaWYodGhpcy5nZXROZXh0UG9zaXRpb24ocG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKS5lcXVhbHMob3RoZXJQb3NpdGlvbikpIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVDtcbiAgICB9IGVsc2UgaWYodGhpcy5nZXROZXh0UG9zaXRpb24ocG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpLmVxdWFscyhvdGhlclBvc2l0aW9uKSkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgaW52ZXJ0RGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgIGlmKGRpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTTtcbiAgICB9IGVsc2UgaWYoZGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQO1xuICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQpIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUO1xuICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaXNEZWFkUG9zaXRpb24ocG9zaXRpb24sIGV4Y2x1ZGVTbmFrZSwgaW5jbHVkZVN1cnJvdW5kZWQpIHtcbiAgICByZXR1cm4gKCFleGNsdWRlU25ha2UgJiYgdGhpcy5nZXQocG9zaXRpb24pID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU05BS0UpIHx8ICh0aGlzLmdldChwb3NpdGlvbikgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5XQUxMKSB8fCAodGhpcy5nZXQocG9zaXRpb24pID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU05BS0VfREVBRCkgfHwgKCEhaW5jbHVkZVN1cnJvdW5kZWQgJiYgdGhpcy5nZXQocG9zaXRpb24pID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU1VSUk9VTkRFRCk7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBsZXQgcmVzID0gXCJcIjtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmhlaWdodDsgaSsrKSB7XG4gICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy53aWR0aDsgaisrKSB7XG4gICAgICAgIHJlcyArPSB0aGlzLnZhbFRvQ2hhcih0aGlzLmdldChuZXcgUG9zaXRpb24oaiwgaSkpKSArIFwiIFwiO1xuICAgICAgfVxuXG4gICAgICByZXMgKz0gXCJcXG5cIjtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG59IiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAxOS0yMDIwIEVsaWFzdGlrIChlbGlhc3Rpa3NvZnRzLmNvbSlcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBcIlNuYWtlSUFcIi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFwiU25ha2VJQVwiLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tIFwiLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9zaXRpb24ge1xuICBjb25zdHJ1Y3Rvcih4LCB5LCBkaXJlY3Rpb24pIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gIH1cblxuICBjb3B5KCkge1xuICAgIHJldHVybiBuZXcgUG9zaXRpb24odGhpcy54LCB0aGlzLnksIHRoaXMuZGlyZWN0aW9uKTtcbiAgfVxuXG4gIGNvbnZlcnRUb0tleURpcmVjdGlvbigpIHtcbiAgICBzd2l0Y2godGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVA6XG4gICAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLktleS5VUDtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQ6XG4gICAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLktleS5SSUdIVDtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVDpcbiAgICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuS2V5LkxFRlQ7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTTpcbiAgICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuS2V5LkJPVFRPTTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbjtcbiAgICB9XG4gIH1cblxuICBjb252ZXJ0VG9TaW1wbGVEaXJlY3Rpb24oKSB7XG4gICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuS2V5LlVQOlxuICAgICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVA7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuS2V5LlJJR0hUOlxuICAgICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQ7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuS2V5LkxFRlQ6XG4gICAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLktleS5CT1RUT006XG4gICAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT007XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb247XG4gICAgfVxuICB9XG5cbiAgZXF1YWxzKG90aGVyUG9zaXRpb24pIHtcbiAgICBpZihvdGhlclBvc2l0aW9uICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLnggPT0gb3RoZXJQb3NpdGlvbi54ICYmIHRoaXMueSA9PSBvdGhlclBvc2l0aW9uLnk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn0iLCIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE5LTIwMjAgRWxpYXN0aWsgKGVsaWFzdGlrc29mdHMuY29tKVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFwiU25ha2VJQVwiLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggXCJTbmFrZUlBXCIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbmltcG9ydCBFdmVudCBmcm9tIFwiLi9FdmVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFjdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ldmVudHMgPSB7fTtcbiAgfVxuXG4gIHJlZ2lzdGVyRXZlbnQoZXZlbnROYW1lKSB7XG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IG5ldyBFdmVudChldmVudE5hbWUpO1xuICB9XG5cbiAgZGlzcGF0Y2hFdmVudChldmVudE5hbWUsIGV2ZW50QXJncykge1xuICAgIGNvbnN0IGNhbGxiYWNrcyA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uY2FsbGJhY2tzO1xuICAgIFxuICAgIGZvcihsZXQgaSA9IDAsIGwgPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBjYWxsYmFja3NbaV0oZXZlbnRBcmdzKTtcbiAgICB9XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnJlZ2lzdGVyQ2FsbGJhY2soY2FsbGJhY2spO1xuICB9XG59IiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAxOS0yMDIwIEVsaWFzdGlrIChlbGlhc3Rpa3NvZnRzLmNvbSlcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBcIlNuYWtlSUFcIi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFwiU25ha2VJQVwiLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBQb3NpdGlvbiBmcm9tIFwiLi9Qb3NpdGlvblwiO1xuaW1wb3J0IEdyaWQgZnJvbSBcIi4vR3JpZFwiO1xuaW1wb3J0IHsgU25ha2VBSSwgU25ha2VBSVJhbmRvbSwgU25ha2VBSUxvdywgU25ha2VBSU5vcm1hbCwgU25ha2VBSUhpZ2gsIFNuYWtlQUlNb2NrIH0gZnJvbSBcIi4vYWkvaW5kZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU25ha2Uge1xuICBjb25zdHJ1Y3RvcihkaXJlY3Rpb24sIGxlbmd0aCwgZ3JpZCwgcGxheWVyLCBhaUxldmVsLCBhdXRvUmV0cnksIG5hbWUsIGN1c3RvbUFJKSB7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT0gdW5kZWZpbmVkID8gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQgOiBkaXJlY3Rpb247XG4gICAgdGhpcy5pbml0aWFsRGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XG4gICAgdGhpcy5pbml0aWFsTGVuZ3RoID0gbGVuZ3RoID09IHVuZGVmaW5lZCA/IDMgOiBsZW5ndGg7XG4gICAgdGhpcy5pbml0VHJpZWREaXJlY3Rpb25zID0gW107XG4gICAgdGhpcy5lcnJvckluaXQgPSBmYWxzZTtcbiAgICB0aGlzLmdyaWQgPSBncmlkIHx8IG5ldyBHcmlkKCk7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIHRoaXMubGFzdEtleSA9IC0xO1xuICAgIHRoaXMubGFzdFRhaWw7XG4gICAgdGhpcy5sYXN0VGFpbE1vdmVkO1xuICAgIHRoaXMudGlja3NEZWFkID0gMDtcbiAgICB0aGlzLnBsYXllciA9IHBsYXllciA9PSB1bmRlZmluZWQgPyBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuSFVNQU4gOiBwbGF5ZXI7XG4gICAgdGhpcy5haUxldmVsID0gYWlMZXZlbCA9PSB1bmRlZmluZWQgPyBHYW1lQ29uc3RhbnRzLkFpTGV2ZWwuREVGQVVMVCA6IGFpTGV2ZWw7XG4gICAgdGhpcy5hdXRvUmV0cnkgPSBhdXRvUmV0cnkgPT0gdW5kZWZpbmVkID8gZmFsc2UgOiBhdXRvUmV0cnk7XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgIHRoaXMuc2NvcmVNYXggPSBmYWxzZTtcbiAgICB0aGlzLmNvbG9yO1xuICAgIHRoaXMubmFtZSA9IG5hbWUgPT0gdW5kZWZpbmVkID8gXCJTbmFrZVwiIDogbmFtZTtcbiAgICB0aGlzLnNuYWtlQUkgPSBuZXcgU25ha2VBSSgpO1xuICAgIHRoaXMuY3VzdG9tQUkgPSBjdXN0b21BSTtcbiAgICB0aGlzLnRpY2tzV2l0aG91dEFjdGlvbiA9IDA7XG5cbiAgICB0aGlzLmluaXRBSSgpO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBpZih0aGlzLmluaXRpYWxMZW5ndGggPD0gMCkge1xuICAgICAgdGhpcy5lcnJvckluaXQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKHRoaXMuZ3JpZC5tYXplICYmIHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucy5sZW5ndGggPD0gMCkge1xuICAgICAgdGhpcy5pbml0aWFsRGlyZWN0aW9uID0gdGhpcy5ncmlkLm1hemVGaXJzdFBvc2l0aW9uLmRpcmVjdGlvbjtcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5pbml0aWFsRGlyZWN0aW9uO1xuICAgIH1cblxuICAgIGxldCBzcGFjZUxpbmVBdmFpbGFibGUgPSAwO1xuICAgIGxldCBzcGFjZUNvbEF2YWlsYWJsZSA9IDA7XG5cbiAgICBpZigodGhpcy5pbml0aWFsRGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUICYmIHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucy5pbmRleE9mKEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKSA9PSAtMSkgfHwgKHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUICYmIHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucy5pbmRleE9mKEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpID09IC0xKSkge1xuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZC5oZWlnaHQ7IGkrKykge1xuICAgICAgICBsZXQgZW1wdHlPbkxpbmUgPSAwO1xuXG4gICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWQud2lkdGg7IGorKykge1xuICAgICAgICAgIGlmKHRoaXMuZ3JpZC5nZXQobmV3IFBvc2l0aW9uKGosIGkpKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSB7XG4gICAgICAgICAgICBlbXB0eU9uTGluZSsrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbXB0eU9uTGluZSA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoZW1wdHlPbkxpbmUgPj0gdGhpcy5pbml0aWFsTGVuZ3RoKSB7XG4gICAgICAgICAgICBzcGFjZUxpbmVBdmFpbGFibGUrKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZigodGhpcy5pbml0aWFsRGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQICYmIHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucy5pbmRleE9mKEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQKSA9PSAtMSkgfHwgKHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00gJiYgdGhpcy5pbml0VHJpZWREaXJlY3Rpb25zLmluZGV4T2YoR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NKSA9PSAtMSkpIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWQud2lkdGg7IGkrKykge1xuICAgICAgICBsZXQgZW1wdHlPbkNvbCA9IDA7XG5cbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuZ3JpZC5oZWlnaHQ7IGorKykge1xuICAgICAgICAgIGlmKHRoaXMuZ3JpZC5nZXQobmV3IFBvc2l0aW9uKGksIGopKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSB7XG4gICAgICAgICAgICBlbXB0eU9uQ29sKys7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVtcHR5T25Db2wgPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKGVtcHR5T25Db2wgPj0gdGhpcy5pbml0aWFsTGVuZ3RoKSB7XG4gICAgICAgICAgICBzcGFjZUNvbEF2YWlsYWJsZSsrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5pbml0VHJpZWREaXJlY3Rpb25zLnB1c2godGhpcy5pbml0aWFsRGlyZWN0aW9uKTtcblxuICAgIGlmKChzcGFjZUxpbmVBdmFpbGFibGUgPD0gMCAmJiAodGhpcy5pbml0aWFsRGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUIHx8IHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUKSkgfHwgKHNwYWNlQ29sQXZhaWxhYmxlIDw9IDAgJiYgKHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCB8fCB0aGlzLmluaXRpYWxEaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NKSkpIHtcbiAgICAgIGlmKHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucy5pbmRleE9mKEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKSA9PSAtMSkge1xuICAgICAgICB0aGlzLmluaXRpYWxEaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVDtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCgpO1xuICAgICAgfSBlbHNlIGlmKHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucy5pbmRleE9mKEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpID09IC0xKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQ7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCgpO1xuICAgICAgfSBlbHNlIGlmKHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucy5pbmRleE9mKEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQKSA9PSAtMSkge1xuICAgICAgICB0aGlzLmluaXRpYWxEaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUDtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCgpO1xuICAgICAgfSBlbHNlIGlmKHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucy5pbmRleE9mKEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSkgPT0gLTEpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsRGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmVycm9ySW5pdCA9IHRydWU7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgbGV0IHBvc05vdFZhbGlkYXRlZCA9IHRydWU7XG4gICAgbGV0IHBvc2l0aW9uc1RvQWRkID0gW107XG4gICAgbGV0IHN0YXJ0UG9zLCBjdXJyZW50UG9zO1xuXG4gICAgd2hpbGUocG9zTm90VmFsaWRhdGVkKSB7XG4gICAgICBwb3NOb3RWYWxpZGF0ZWQgPSBmYWxzZTtcblxuICAgICAgaWYodGhpcy5ncmlkLm1hemUpIHtcbiAgICAgICAgc3RhcnRQb3MgPSB0aGlzLmdyaWQubWF6ZUZpcnN0UG9zaXRpb247XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydFBvcyA9IHRoaXMuZ3JpZC5nZXRSYW5kb21Qb3NpdGlvbigpO1xuICAgICAgfVxuXG4gICAgICBpZighc3RhcnRQb3MpIHtcbiAgICAgICAgdGhpcy5lcnJvckluaXQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGN1cnJlbnRQb3MgPSBuZXcgUG9zaXRpb24oc3RhcnRQb3MueCwgc3RhcnRQb3MueSwgdGhpcy5pbml0aWFsRGlyZWN0aW9uKTtcbiAgICAgIHBvc2l0aW9uc1RvQWRkID0gW107XG5cbiAgICAgIGZvcihsZXQgaSA9IHRoaXMuaW5pdGlhbExlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmKGkgPCB0aGlzLmluaXRpYWxMZW5ndGggLSAxKSB7XG4gICAgICAgICAgaWYodGhpcy5pbml0aWFsRGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKSB7XG4gICAgICAgICAgICBjdXJyZW50UG9zID0gdGhpcy5ncmlkLmdldE5leHRQb3NpdGlvbihuZXcgUG9zaXRpb24oY3VycmVudFBvcy54LCBjdXJyZW50UG9zLnksIHRoaXMuaW5pdGlhbERpcmVjdGlvbiksIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhpcy5pbml0aWFsRGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpIHtcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgPSB0aGlzLmdyaWQuZ2V0TmV4dFBvc2l0aW9uKG5ldyBQb3NpdGlvbihjdXJyZW50UG9zLngsIGN1cnJlbnRQb3MueSwgdGhpcy5pbml0aWFsRGlyZWN0aW9uKSwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00pIHtcbiAgICAgICAgICAgIGN1cnJlbnRQb3MgPSB0aGlzLmdyaWQuZ2V0TmV4dFBvc2l0aW9uKG5ldyBQb3NpdGlvbihjdXJyZW50UG9zLngsIGN1cnJlbnRQb3MueSwgdGhpcy5pbml0aWFsRGlyZWN0aW9uKSwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NKTtcbiAgICAgICAgICB9IGVsc2UgaWYodGhpcy5pbml0aWFsRGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQKSB7XG4gICAgICAgICAgICBjdXJyZW50UG9zID0gdGhpcy5ncmlkLmdldE5leHRQb3NpdGlvbihuZXcgUG9zaXRpb24oY3VycmVudFBvcy54LCBjdXJyZW50UG9zLnksIHRoaXMuaW5pdGlhbERpcmVjdGlvbiksIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmdyaWQuZ2V0KGN1cnJlbnRQb3MpICE9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFkpIHtcbiAgICAgICAgICBwb3NOb3RWYWxpZGF0ZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBvc2l0aW9uc1RvQWRkLnB1c2gobmV3IFBvc2l0aW9uKGN1cnJlbnRQb3MueCwgY3VycmVudFBvcy55LCBjdXJyZW50UG9zLmRpcmVjdGlvbikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmKHRoaXMuZ3JpZC5tYXplICYmIHBvc05vdFZhbGlkYXRlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbml0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIFNuYWtlIGlzIG5lYXIgYSBkZWFkIHBvc2l0aW9uXG4gICAgbGV0IG5lYXJEZWFkUG9zaXRpb24gPSBmYWxzZTtcblxuICAgIGlmKCF0aGlzLmdyaWQubWF6ZSkge1xuICAgICAgY29uc3QgZmlyc3RQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbihwb3NpdGlvbnNUb0FkZFtwb3NpdGlvbnNUb0FkZC5sZW5ndGggLSAxXS54LCBwb3NpdGlvbnNUb0FkZFtwb3NpdGlvbnNUb0FkZC5sZW5ndGggLSAxXS55LCB0aGlzLmRpcmVjdGlvbik7XG4gIFxuICAgICAgaWYoKHRoaXMuZ3JpZC5pc0RlYWRQb3NpdGlvbih0aGlzLmdyaWQuZ2V0TmV4dFBvc2l0aW9uKGZpcnN0UG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQKSwgZmFsc2UpICYmIHRoaXMuZGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQKSB8fCAodGhpcy5ncmlkLmlzRGVhZFBvc2l0aW9uKHRoaXMuZ3JpZC5nZXROZXh0UG9zaXRpb24oZmlyc3RQb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NKSwgZmFsc2UpICYmIHRoaXMuZGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSkgfHwgKHRoaXMuZ3JpZC5pc0RlYWRQb3NpdGlvbih0aGlzLmdyaWQuZ2V0TmV4dFBvc2l0aW9uKGZpcnN0UG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpLCBmYWxzZSkgJiYgdGhpcy5kaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCkgfHwgKHRoaXMuZ3JpZC5pc0RlYWRQb3NpdGlvbih0aGlzLmdyaWQuZ2V0TmV4dFBvc2l0aW9uKGZpcnN0UG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKSwgZmFsc2UpICYmIHRoaXMuZGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKSkge1xuICAgICAgICBuZWFyRGVhZFBvc2l0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLmdyaWQuaW52ZXJ0RGlyZWN0aW9uKHRoaXMuZGlyZWN0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIFxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBwb3NpdGlvbnNUb0FkZC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYobmVhckRlYWRQb3NpdGlvbikge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHBvc2l0aW9uc1RvQWRkW3Bvc2l0aW9uc1RvQWRkLmxlbmd0aCAtIGkgLSAxXTtcbiAgICAgICAgcG9zaXRpb24uZGlyZWN0aW9uID0gIHRoaXMuZ3JpZC5pbnZlcnREaXJlY3Rpb24ocG9zaXRpb24uZGlyZWN0aW9uKTtcbiAgICAgICAgdGhpcy5pbnNlcnQocG9zaXRpb25zVG9BZGRbcG9zaXRpb25zVG9BZGQubGVuZ3RoIC0gaSAtIDFdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0KHBvc2l0aW9uc1RvQWRkW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZih0aGlzLmdyaWQubWF6ZSAmJiB0aGlzLnBsYXllciA9PSBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuSFlCUklEX0hVTUFOX0FJKSB7XG4gICAgICB0aGlzLnBsYXllciA9IEdhbWVDb25zdGFudHMuUGxheWVyVHlwZS5IVU1BTjtcbiAgICB9XG5cbiAgICBpZih0aGlzLnBsYXllciA9PSBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuSFlCUklEX0hVTUFOX0FJKSB7XG4gICAgICB0aGlzLmFpTGV2ZWwgPSBHYW1lQ29uc3RhbnRzLkFpTGV2ZWwuSElHSDtcbiAgICB9XG5cbiAgICB0aGlzLmxhc3RUYWlsID0gdGhpcy5nZXQodGhpcy5xdWV1ZS5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGluaXRBSSgpIHtcbiAgICBpZighdGhpcy5jdXN0b21BSSkge1xuICAgICAgc3dpdGNoKHRoaXMuYWlMZXZlbCkge1xuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuQWlMZXZlbC5SQU5ET006XG4gICAgICAgICAgdGhpcy5zbmFrZUFJID0gbmV3IFNuYWtlQUlSYW5kb20oKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkFpTGV2ZWwuTE9XOlxuICAgICAgICAgIHRoaXMuc25ha2VBSSA9IG5ldyBTbmFrZUFJTG93KCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5BaUxldmVsLkRFRkFVTFQ6XG4gICAgICAgICAgdGhpcy5zbmFrZUFJID0gbmV3IFNuYWtlQUlOb3JtYWwoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkFpTGV2ZWwuSElHSDpcbiAgICAgICAgICB0aGlzLnNuYWtlQUkgPSBuZXcgU25ha2VBSUhpZ2goKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkFpTGV2ZWwuVUxUUkE6XG4gICAgICAgICAgdGhpcy5zbmFrZUFJID0gbmV3IFNuYWtlQUlIaWdoKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5BaUxldmVsLk1PQ0s6XG4gICAgICAgICAgdGhpcy5zbmFrZUFJID0gbmV3IFNuYWtlQUlNb2NrKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhpcy5zbmFrZUFJID0gbmV3IFNuYWtlQUlOb3JtYWwoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zbmFrZUFJID0gdGhpcy5jdXN0b21BSTtcbiAgICAgIHRoaXMuYWlMZXZlbCA9IEdhbWVDb25zdGFudHMuQWlMZXZlbC5DVVNUT007XG4gICAgfVxuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLmluaXRpYWxEaXJlY3Rpb247XG4gICAgdGhpcy5pbml0VHJpZWREaXJlY3Rpb25zID0gW107XG4gICAgdGhpcy5lcnJvckluaXQgPSBmYWxzZTtcbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgIHRoaXMuc2NvcmVNYXggPSBmYWxzZTtcbiAgICB0aGlzLmxhc3RUYWlsTW92ZWQgPSB0cnVlO1xuICAgIHRoaXMubGFzdFRhaWwgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5sYXN0S2V5ID0gLTE7XG4gICAgdGhpcy50aWNrc0RlYWQgPSAwO1xuICAgIHRoaXMudGlja3NXaXRob3V0QWN0aW9uID0gMDtcbiAgICBpZih0aGlzLnNuYWtlQUkpIHRoaXMuc25ha2VBSS5haUZydWl0R29hbCA9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVQ7XG4gIH1cblxuICBpbnNlcnQocG9zaXRpb24pIHtcbiAgICB0aGlzLnF1ZXVlLnVuc2hpZnQocG9zaXRpb24pO1xuICAgIHRoaXMuZ3JpZC5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TTkFLRSwgcG9zaXRpb24pO1xuICB9XG5cbiAgcmVtb3ZlKCkge1xuICAgIGNvbnN0IGxhc3QgPSB0aGlzLnF1ZXVlLnBvcCgpO1xuICAgIHRoaXMuZ3JpZC5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgbGFzdCk7XG4gICAgdGhpcy5sYXN0VGFpbCA9IGxhc3Q7XG4gIH1cblxuICBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoO1xuICB9XG5cbiAgZ2V0KGluZGV4KSB7XG4gICAgaWYodGhpcy5xdWV1ZVtpbmRleF0gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWVbaW5kZXhdLmNvcHkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgc2V0KGluZGV4LCBwb3NpdGlvbikge1xuICAgIGlmKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLmxlbmd0aCgpKSB7XG4gICAgICB0aGlzLnF1ZXVlW2luZGV4XSA9IHBvc2l0aW9uO1xuICAgIH1cbiAgfVxuXG4gIGdldEhlYWRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoMCk7XG4gIH1cblxuICBnZXRUYWlsUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMubGVuZ3RoKCkgLSAxKTtcbiAgfVxuXG4gIGhhc01heFNjb3JlKCkge1xuICAgIHJldHVybiB0aGlzLmdyaWQuZ2V0VG90YWwoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSkgPD0gMCAmJiAhdGhpcy5ncmlkLmZydWl0UG9zR29sZCAmJiAhdGhpcy5ncmlkLmZydWl0UG9zO1xuICB9XG5cbiAgc2V0R2FtZU92ZXIodGlja3MpIHtcbiAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZTtcbiAgICB0aGlzLnRpY2tzRGVhZCA9IHRpY2tzO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoKCk7IGkrKykge1xuICAgICAgdGhpcy5ncmlkLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNOQUtFX0RFQUQsIHRoaXMuZ2V0KGkpKTtcbiAgICB9XG4gIH1cblxuICBraWxsKCkge1xuICAgIHRoaXMuYXV0b1JldHJ5ID0gZmFsc2U7XG4gICAgdGhpcy5ncmlkID0gbnVsbDtcbiAgICB0aGlzLnF1ZXVlID0gbnVsbDtcbiAgfVxuXG4gIGtleVRvRGlyZWN0aW9uKGtleSkge1xuICAgIGlmKGtleSA9PSBHYW1lQ29uc3RhbnRzLktleS5MRUZUICYmIHRoaXMuZGlyZWN0aW9uICE9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUICYmIHRoaXMuZGlyZWN0aW9uICE9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUO1xuICAgIH1cblxuICAgIGlmKGtleSA9PSBHYW1lQ29uc3RhbnRzLktleS5VUCAmJiB0aGlzLmRpcmVjdGlvbiAhPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00gJiYgdGhpcy5kaXJlY3Rpb24gIT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVApIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUDtcbiAgICB9XG5cbiAgICBpZihrZXkgPT0gR2FtZUNvbnN0YW50cy5LZXkuUklHSFQgJiYgdGhpcy5kaXJlY3Rpb24gIT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCAmJiB0aGlzLmRpcmVjdGlvbiAhPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUO1xuICAgIH1cblxuICAgIGlmKGtleSA9PSBHYW1lQ29uc3RhbnRzLktleS5CT1RUT00gJiYgdGhpcy5kaXJlY3Rpb24gIT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVAgJiYgdGhpcy5kaXJlY3Rpb24gIT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NKSB7XG4gICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbW92ZVRvKGtleSkge1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMua2V5VG9EaXJlY3Rpb24oa2V5KTtcblxuICAgIGlmKGRpcmVjdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB9XG4gIH1cblxuICBnZXROZXh0UG9zaXRpb24ob2xkUG9zLCBuZXdEaXJlY3Rpb24pIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkLmdldE5leHRQb3NpdGlvbihvbGRQb3MsIG5ld0RpcmVjdGlvbik7XG4gIH1cblxuICBnZXREaXJlY3Rpb25Ubyhwb3NpdGlvbiwgb3RoZXJQb3NpdGlvbikge1xuICAgIHJldHVybiB0aGlzLmdyaWQuZ2V0RGlyZWN0aW9uVG8ocG9zaXRpb24sIG90aGVyUG9zaXRpb24pO1xuICB9XG5cbiAgZ2V0R3JhcGhpY0RpcmVjdGlvbkZvcihjdXJyZW50LCBuZXh0LCBwcmVjKSB7XG4gICAgaWYobmV4dCA9PSB1bmRlZmluZWQgfHwgcHJlYyA9PSB1bmRlZmluZWQpIHJldHVybiBjdXJyZW50LmRpcmVjdGlvbjtcblxuICAgIGNvbnN0IGRpcmVjdGlvblRvUHJlYyA9IHRoaXMuZ2V0RGlyZWN0aW9uVG8oY3VycmVudCwgcHJlYyk7XG4gICAgY29uc3QgZGlyZWN0aW9uVG9OZXh0ID0gdGhpcy5nZXREaXJlY3Rpb25UbyhjdXJyZW50LCBuZXh0KTtcblxuICAgIGlmKGRpcmVjdGlvblRvUHJlYyA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUICYmIGRpcmVjdGlvblRvTmV4dCA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00gfHwgZGlyZWN0aW9uVG9QcmVjID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSAmJiBkaXJlY3Rpb25Ub05leHQgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkFOR0xFXzE7XG4gICAgfSBlbHNlIGlmKGRpcmVjdGlvblRvUHJlYyA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCAmJiBkaXJlY3Rpb25Ub05leHQgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NIHx8IGRpcmVjdGlvblRvUHJlYyA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00gJiYgZGlyZWN0aW9uVG9OZXh0ID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKSB7XG4gICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQU5HTEVfMjtcbiAgICB9IGVsc2UgaWYoZGlyZWN0aW9uVG9QcmVjID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQICYmIGRpcmVjdGlvblRvTmV4dCA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCB8fCBkaXJlY3Rpb25Ub1ByZWMgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQgJiYgZGlyZWN0aW9uVG9OZXh0ID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQKSB7XG4gICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQU5HTEVfMztcbiAgICB9IGVsc2UgaWYoZGlyZWN0aW9uVG9QcmVjID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQICYmIGRpcmVjdGlvblRvTmV4dCA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUIHx8IGRpcmVjdGlvblRvUHJlYyA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUICYmIGRpcmVjdGlvblRvTmV4dCA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkFOR0xFXzQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdXJyZW50LmRpcmVjdGlvbjtcbiAgICB9XG4gIH1cblxuICBnZXRHcmFwaGljRGlyZWN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0R3JhcGhpY0RpcmVjdGlvbkZvcih0aGlzLmdldChpbmRleCksIHRoaXMuZ2V0KGluZGV4IC0gMSksIHRoaXMuZ2V0KGluZGV4ICsgMSkpO1xuICB9XG5cbiAgY29weSgpIHtcbiAgICBjb25zdCBzbmFrZSA9IG5ldyBTbmFrZShkaXJlY3Rpb24sIDMsIG5ldyBHcmlkKHRoaXMuZ3JpZC53aWR0aCwgdGhpcy5ncmlkLmhlaWdodCwgZmFsc2UsIGZhbHNlKSwgdGhpcy5wbGF5ZXIsIHRoaXMuYWlMZXZlbCwgZmFsc2UpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHNuYWtlLmdyaWQuaGVpZ2h0OyBpKyspIHtcbiAgICAgIGZvcihsZXQgaiA9IDA7IGogPCBzbmFrZS5ncmlkLndpZHRoOyBqKyspIHtcbiAgICAgICAgc25ha2UuZ3JpZC5zZXQodGhpcy5ncmlkLmdldChuZXcgUG9zaXRpb24oaiwgaSkpLCBuZXcgUG9zaXRpb24oaiwgaSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNuYWtlLnF1ZXVlID0gW107XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5xdWV1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgc25ha2UucXVldWUucHVzaChlbGVtLmNvcHkoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNuYWtlO1xuICB9XG5cbiAgYWkoKSB7XG4gICAgaWYodGhpcy5zbmFrZUFJICYmIHRoaXMuc25ha2VBSS5haSkge1xuICAgICAgY29uc3QgYWN0aW9uID0gdGhpcy5zbmFrZUFJLmFpKHRoaXMpO1xuXG4gICAgICBpZighYWN0aW9uIHx8IHRoaXMua2V5VG9EaXJlY3Rpb24oYWN0aW9uKSA9PSB0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICB0aGlzLnRpY2tzV2l0aG91dEFjdGlvbisrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy50aWNrc1dpdGhvdXRBY3Rpb24gPSAwO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYWN0aW9uO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlzQUlTdHVjayh3aWR0aExpbWl0LCBoZWlnaHRMaW1pdCkge1xuICAgIGlmKHRoaXMuc25ha2VBSSAmJiB0aGlzLnNuYWtlQUkuYWkpIHtcbiAgICAgIGlmKCh0aGlzLmRpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUIHx8IHRoaXMuZGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKSAmJiB0aGlzLnRpY2tzV2l0aG91dEFjdGlvbiA+PSB0aGlzLmdyaWQud2lkdGggKiB3aWR0aExpbWl0KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmKCh0aGlzLmRpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCB8fCB0aGlzLmRpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00pICYmIHRoaXMudGlja3NXaXRob3V0QWN0aW9uID49IHRoaXMuZ3JpZC5oZWlnaHQgKiBoZWlnaHRMaW1pdCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBnZXRBSUxldmVsVGV4dCgpIHtcbiAgICByZXR1cm4gdGhpcy5zbmFrZUFJID8gdGhpcy5zbmFrZUFJLmFpTGV2ZWxUZXh0IDogXCI/Pz9cIjtcbiAgfVxufSIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbmFrZUFJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5haUZydWl0R29hbCA9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVQ7XG4gICAgdGhpcy5fYWlMZXZlbFRleHQgPSBcImN1c3RvbVwiO1xuICB9XG5cbiAgYWkoc25ha2UpIHtcbiAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBzbmFrZS5nZXRIZWFkUG9zaXRpb24oKTtcbiAgICBjb25zdCBmcnVpdFBvcyA9IHNuYWtlLmdyaWQuZnJ1aXRQb3M7XG4gICAgY29uc3QgZnJ1aXRQb3NHb2xkID0gc25ha2UuZ3JpZC5mcnVpdFBvc0dvbGQ7XG5cbiAgICBpZihmcnVpdFBvcyAmJiBzbmFrZS5ncmlkLmdldChmcnVpdFBvcykgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVCkge1xuICAgICAgY29uc3QgZGlzdEZydWl0ID0gTWF0aC5hYnMoZnJ1aXRQb3MueCAtIGN1cnJlbnRQb3NpdGlvbi54KSArIE1hdGguYWJzKGZydWl0UG9zLnkgLSBjdXJyZW50UG9zaXRpb24ueSk7XG4gICAgICBjb25zdCBkaXN0RnJ1aXRHb2xkID0gZnJ1aXRQb3NHb2xkID8gTWF0aC5hYnMoZnJ1aXRQb3NHb2xkLnggLSBjdXJyZW50UG9zaXRpb24ueCkgKyBNYXRoLmFicyhmcnVpdFBvc0dvbGQueSAtIGN1cnJlbnRQb3NpdGlvbi55KSA6IC0xO1xuICAgIFxuICAgICAgaWYoZnJ1aXRQb3NHb2xkICYmIHNuYWtlLmdyaWQuZ2V0KGZydWl0UG9zR29sZCkgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEICYmIHRoaXMuYWlGcnVpdEdvYWwgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVCkge1xuICAgICAgICBpZihkaXN0RnJ1aXRHb2xkIDw9IGRpc3RGcnVpdCkge1xuICAgICAgICAgIHRoaXMuYWlGcnVpdEdvYWwgPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUX0dPTEQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5haUZydWl0R29hbCA9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVQ7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZighZnJ1aXRQb3NHb2xkIHx8IHNuYWtlLmdyaWQuZ2V0KGZydWl0UG9zR29sZCkgIT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEKSB7XG4gICAgICAgIHRoaXMuYWlGcnVpdEdvYWwgPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZigoIWZydWl0UG9zIHx8IHNuYWtlLmdyaWQuZ2V0KGZydWl0UG9zKSAhPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUKSAmJiBmcnVpdFBvc0dvbGQgJiYgc25ha2UuZ3JpZC5nZXQoZnJ1aXRQb3NHb2xkKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUX0dPTEQpIHtcbiAgICAgIHRoaXMuYWlGcnVpdEdvYWwgPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUX0dPTEQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBnZXQgYWlMZXZlbFRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FpTGV2ZWxUZXh0O1xuICB9XG59IiwiXG4vKlxuICogQ29weXJpZ2h0IChDKSAyMDE5LTIwMjAgRWxpYXN0aWsgKGVsaWFzdGlrc29mdHMuY29tKVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFwiU25ha2VJQVwiLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggXCJTbmFrZUlBXCIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbmltcG9ydCBTbmFrZUFJTG93IGZyb20gXCIuL1NuYWtlQUlMb3dcIjtcbmltcG9ydCBTbmFrZUFJTm9ybWFsIGZyb20gXCIuL1NuYWtlQUlOb3JtYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU25ha2VBSUhpZ2ggZXh0ZW5kcyBTbmFrZUFJTm9ybWFsIHtcbiAgY29uc3RydWN0b3Ioc25ha2UpIHtcbiAgICBzdXBlcih0cnVlKTtcbiAgICB0aGlzLmFpTG93ID0gbmV3IFNuYWtlQUlMb3coc25ha2UpO1xuICAgIHRoaXMuX2FpTGV2ZWxUZXh0ID0gXCJoaWdoXCI7XG4gIH1cblxuICBhaShzbmFrZSkge1xuICAgIGNvbnN0IHJlcyA9IHN1cGVyLmFpKHNuYWtlKTtcblxuICAgIGlmKCFyZXMpIHtcbiAgICAgIHJldHVybiB0aGlzLmFpTG93LmFpKHNuYWtlKTtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufSIsIlxuLypcbiAqIENvcHlyaWdodCAoQykgMjAxOS0yMDIwIEVsaWFzdGlrIChlbGlhc3Rpa3NvZnRzLmNvbSlcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBcIlNuYWtlSUFcIi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFwiU25ha2VJQVwiLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5pbXBvcnQgU25ha2VBSSBmcm9tIFwiLi9TbmFrZUFJXCI7XG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tIFwiLi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNuYWtlQUlMb3cgZXh0ZW5kcyBTbmFrZUFJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9haUxldmVsVGV4dCA9IFwibG93XCI7XG4gIH1cblxuICBhaShzbmFrZSkge1xuICAgIHN1cGVyLmFpKHNuYWtlKTtcblxuICAgIGlmKHNuYWtlLmdyaWQuZnJ1aXRQb3MgIT0gbnVsbCkge1xuICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gc25ha2UuZ2V0SGVhZFBvc2l0aW9uKCk7XG4gICAgICBjb25zdCBmcnVpdFBvcyA9IHRoaXMuYWlGcnVpdEdvYWwgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEID8gc25ha2UuZ3JpZC5mcnVpdFBvc0dvbGQgOiBzbmFrZS5ncmlkLmZydWl0UG9zO1xuICAgICAgbGV0IGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5SSUdIVDtcblxuICAgICAgaWYoZnJ1aXRQb3MueCA+IGN1cnJlbnRQb3NpdGlvbi54KSB7XG4gICAgICAgIGlmKGZydWl0UG9zLnggLSBjdXJyZW50UG9zaXRpb24ueCA+IHNuYWtlLmdyaWQud2lkdGggLyAyKSB7XG4gICAgICAgICAgZGlyZWN0aW9uTmV4dCA9IEdhbWVDb25zdGFudHMuS2V5LkxFRlQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlyZWN0aW9uTmV4dCA9IEdhbWVDb25zdGFudHMuS2V5LlJJR0hUO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoZnJ1aXRQb3MueCA8IGN1cnJlbnRQb3NpdGlvbi54KSB7XG4gICAgICAgIGlmKGN1cnJlbnRQb3NpdGlvbi54IC0gZnJ1aXRQb3MueCA+IHNuYWtlLmdyaWQud2lkdGggLyAyKSB7XG4gICAgICAgICAgZGlyZWN0aW9uTmV4dCA9IEdhbWVDb25zdGFudHMuS2V5LlJJR0hUO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5MRUZUO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoZnJ1aXRQb3MueSA8IGN1cnJlbnRQb3NpdGlvbi55KSB7XG4gICAgICAgIGlmKGN1cnJlbnRQb3NpdGlvbi55IC0gZnJ1aXRQb3MueSA+IHNuYWtlLmdyaWQuaGVpZ2h0IC8gMikge1xuICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5CT1RUT007XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlyZWN0aW9uTmV4dCA9IEdhbWVDb25zdGFudHMuS2V5LlVQO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoZnJ1aXRQb3MueSA+IGN1cnJlbnRQb3NpdGlvbi55KSB7XG4gICAgICAgIGlmKGZydWl0UG9zLnkgLSBjdXJyZW50UG9zaXRpb24ueSA+IHNuYWtlLmdyaWQuaGVpZ2h0IC8gMikge1xuICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5VUDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXJlY3Rpb25OZXh0ID0gR2FtZUNvbnN0YW50cy5LZXkuQk9UVE9NO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBuZXh0UG9zaXRpb24gPSBzbmFrZS5nZXROZXh0UG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBkaXJlY3Rpb25OZXh0KTtcblxuICAgICAgaWYoc25ha2UuZ3JpZC5pc0RlYWRQb3NpdGlvbihuZXh0UG9zaXRpb24pKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnREaXJlY3Rpb24gPSB0aGlzLmRpcmVjdGlvbjtcbiAgICAgICAgbGV0IGZpcnN0RGlmZmVyZW50RGlyZWN0aW9uID0gbnVsbDtcblxuICAgICAgICBmb3IobGV0IGkgPSAxOyBpIDwgc25ha2UucXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZihzbmFrZS5nZXQoaSkuZGlyZWN0aW9uICE9IGN1cnJlbnREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGZpcnN0RGlmZmVyZW50RGlyZWN0aW9uID0gc25ha2UuZ2V0KGkpLmRpcmVjdGlvbjtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5leHRQb3NpdGlvbiA9IHNuYWtlLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIGZpcnN0RGlmZmVyZW50RGlyZWN0aW9uKTtcblxuICAgICAgICBpZihzbmFrZS5ncmlkLmlzRGVhZFBvc2l0aW9uKG5leHRQb3NpdGlvbikpIHtcbiAgICAgICAgICBpZighc25ha2UuZ3JpZC5pc0RlYWRQb3NpdGlvbihzbmFrZS5nZXROZXh0UG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLktleS5VUCkpKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb25OZXh0ID0gR2FtZUNvbnN0YW50cy5LZXkuVVA7XG4gICAgICAgICAgfSBlbHNlIGlmKCFzbmFrZS5ncmlkLmlzRGVhZFBvc2l0aW9uKHNuYWtlLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIEdhbWVDb25zdGFudHMuS2V5LlJJR0hUKSkpIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5SSUdIVDtcbiAgICAgICAgICB9IGVsc2UgaWYoIXNuYWtlLmdyaWQuaXNEZWFkUG9zaXRpb24oc25ha2UuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5LZXkuQk9UVE9NKSkpIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5CT1RUT007XG4gICAgICAgICAgfSBlbHNlIGlmKCFzbmFrZS5ncmlkLmlzRGVhZFBvc2l0aW9uKHNuYWtlLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIEdhbWVDb25zdGFudHMuS2V5LkxFRlQpKSkge1xuICAgICAgICAgICAgZGlyZWN0aW9uTmV4dCA9IEdhbWVDb25zdGFudHMuS2V5LkxFRlQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBuZXh0UG9zaXRpb24uY29udmVydFRvS2V5RGlyZWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRpcmVjdGlvbk5leHQ7XG4gICAgfVxuICB9XG59IiwiXG4vKlxuICogQ29weXJpZ2h0IChDKSAyMDE5LTIwMjAgRWxpYXN0aWsgKGVsaWFzdGlrc29mdHMuY29tKVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFwiU25ha2VJQVwiLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggXCJTbmFrZUlBXCIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbmltcG9ydCBTbmFrZUFJIGZyb20gXCIuL1NuYWtlQUlcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU25ha2VBSU1vY2sgZXh0ZW5kcyBTbmFrZUFJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9haUxldmVsVGV4dCA9IFwibW9ja1wiO1xuICB9XG5cbiAgYWkoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn0iLCJcbi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuaW1wb3J0IFNuYWtlQUkgZnJvbSBcIi4vU25ha2VBSVwiO1xuaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IFBvc2l0aW9uIGZyb20gXCIuLi9Qb3NpdGlvblwiO1xuaW1wb3J0ICogYXMgTG93bGlnaHQgZnJvbSBcIi4uLy4uLy4uL2xpYnMvbG93bGlnaHQuYXN0YXIubWluXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNuYWtlQUlOb3JtYWwgZXh0ZW5kcyBTbmFrZUFJIHtcbiAgY29uc3RydWN0b3IoZW5hYmxlVG9ydXMpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMuZW5hYmxlVG9ydXMgPSBlbmFibGVUb3J1cztcbiAgICB0aGlzLl9haUxldmVsVGV4dCA9IFwibm9ybWFsXCI7XG4gIH1cblxuICBhaShzbmFrZSkge1xuICAgIHN1cGVyLmFpKHNuYWtlKTtcblxuICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHNuYWtlLmdldEhlYWRQb3NpdGlvbigpO1xuICAgIGNvbnN0IGZydWl0UG9zID0gc25ha2UuZ3JpZC5mcnVpdFBvcztcbiAgICBjb25zdCBmcnVpdFBvc0dvbGQgPSBzbmFrZS5ncmlkLmZydWl0UG9zR29sZDtcbiAgICBsZXQgZnJ1aXRUYXJnZXQgPSBmcnVpdFBvcztcblxuICAgIGlmKGN1cnJlbnRQb3NpdGlvbiAmJiAoZnJ1aXRQb3MgfHwgZnJ1aXRQb3NHb2xkKSkge1xuICAgICAgY29uc3QgZ3JpZCA9IHNuYWtlLmdyaWQuZ2V0R3JhcGgoZmFsc2UpO1xuXG4gICAgICBjb25zdCBncmFwaCA9IG5ldyBMb3dsaWdodC5Bc3Rhci5Db25maWd1cmF0aW9uKGdyaWQsIHtcbiAgICAgICAgb3JkZXI6IFwieXhcIixcbiAgICAgICAgdG9ydXM6IHRoaXMuZW5hYmxlVG9ydXMgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgIGRpYWdvbmFsczogZmFsc2UsXG4gICAgICAgIGN1dHRpbmc6IGZhbHNlLFxuICAgICAgICBzdGF0aWM6IHRydWUsXG4gICAgICAgIGNvc3QoYSwgYikgeyByZXR1cm4gYiA9PSAxID8gbnVsbCA6IDEgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmKGZydWl0UG9zR29sZCAmJiB0aGlzLmFpRnJ1aXRHb2FsID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVRfR09MRCkge1xuICAgICAgICBmcnVpdFRhcmdldCA9IGZydWl0UG9zR29sZDtcbiAgICAgIH1cblxuICAgICAgbGV0IHBhdGggPSBncmFwaC5wYXRoKHsgeDogY3VycmVudFBvc2l0aW9uLngsIHk6IGN1cnJlbnRQb3NpdGlvbi55IH0sIHsgeDogZnJ1aXRUYXJnZXQgPyBmcnVpdFRhcmdldC54IDogbnVsbCwgeTogZnJ1aXRUYXJnZXQgPyBmcnVpdFRhcmdldC55IDogbnVsbCB9KTtcblxuICAgICAgaWYocGF0aC5sZW5ndGggPCAxKSB7XG4gICAgICAgIGlmKHRoaXMuYWlGcnVpdEdvYWwgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEIHx8ICFmcnVpdFBvc0dvbGQpIHtcbiAgICAgICAgICBmcnVpdFRhcmdldCA9IGZydWl0UG9zO1xuICAgICAgICB9XG5cbiAgICAgICAgcGF0aCA9IGdyYXBoLnBhdGgoeyB4OiBjdXJyZW50UG9zaXRpb24ueCwgeTogY3VycmVudFBvc2l0aW9uLnkgfSwgeyB4OiBmcnVpdFRhcmdldCA/IGZydWl0VGFyZ2V0LnggOiBudWxsLCB5OiBmcnVpdFRhcmdldCA/IGZydWl0VGFyZ2V0LnkgOiBudWxsIH0pO1xuICAgICAgfVxuXG4gICAgICBpZihwYXRoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKHBhdGhbMV0ueCwgcGF0aFsxXS55KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3NpdGlvbihudWxsLCBudWxsLCBzbmFrZS5nZXREaXJlY3Rpb25UbyhjdXJyZW50UG9zaXRpb24sIG5leHRQb3NpdGlvbikpLmNvbnZlcnRUb0tleURpcmVjdGlvbigpO1xuICAgICAgfVxuXG4gICAgICBncmlkLCBncmFwaCwgcGF0aCA9IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn0iLCJcbi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuaW1wb3J0IFNuYWtlQUkgZnJvbSBcIi4vU25ha2VBSVwiO1xuaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuaW1wb3J0IEdhbWVVdGlscyBmcm9tIFwiLi4vR2FtZVV0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNuYWtlQUlSYW5kb20gZXh0ZW5kcyBTbmFrZUFJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLl9haUxldmVsVGV4dCA9IFwicmFuZG9tXCI7XG4gIH1cblxuICBhaShzbmFrZSkge1xuICAgIHN1cGVyLmFpKHNuYWtlKTtcblxuICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHNuYWtlLmdldEhlYWRQb3NpdGlvbigpO1xuICAgIGNvbnN0IHRvcCA9IHNuYWtlLmdyaWQuaXNEZWFkUG9zaXRpb24oc25ha2UuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5LZXkuVVApKTtcbiAgICBjb25zdCBsZWZ0ID0gc25ha2UuZ3JpZC5pc0RlYWRQb3NpdGlvbihzbmFrZS5nZXROZXh0UG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLktleS5MRUZUKSk7XG4gICAgY29uc3QgYm90dG9tID0gc25ha2UuZ3JpZC5pc0RlYWRQb3NpdGlvbihzbmFrZS5nZXROZXh0UG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLktleS5CT1RUT00pKTtcbiAgICBjb25zdCByaWdodCA9IHNuYWtlLmdyaWQuaXNEZWFkUG9zaXRpb24oc25ha2UuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5LZXkuUklHSFQpKTtcblxuICAgIGlmKHRvcCAmJiBsZWZ0ICYmIGJvdHRvbSAmJiByaWdodCkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuS2V5LlVQO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZGlyZWN0aW9uID0gbnVsbDtcblxuICAgICAgd2hpbGUoZGlyZWN0aW9uID09IG51bGwgfHwgc25ha2UuZ3JpZC5pc0RlYWRQb3NpdGlvbihzbmFrZS5nZXROZXh0UG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBkaXJlY3Rpb24pKSkge1xuICAgICAgICBjb25zdCByID0gR2FtZVV0aWxzLnJhbmRSYW5nZSgxLCA0LCBzbmFrZS5ncmlkID8gc25ha2UuZ3JpZC5ybmdHYW1lIDogbnVsbCk7XG5cbiAgICAgICAgc3dpdGNoKHIpIHtcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLktleS5VUDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuS2V5LkxFRlQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLktleS5CT1RUT007XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLktleS5SSUdIVDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkaXJlY3Rpb247XG4gICAgfVxuICB9XG59IiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAxOS0yMDIwIEVsaWFzdGlrIChlbGlhc3Rpa3NvZnRzLmNvbSlcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBcIlNuYWtlSUFcIi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFwiU25ha2VJQVwiLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5pbXBvcnQgU25ha2VBSSBmcm9tIFwiLi9TbmFrZUFJXCI7XG5pbXBvcnQgU25ha2VBSVJhbmRvbSBmcm9tIFwiLi9TbmFrZUFJUmFuZG9tXCI7XG5pbXBvcnQgU25ha2VBSUxvdyBmcm9tIFwiLi9TbmFrZUFJTG93XCI7XG5pbXBvcnQgU25ha2VBSU5vcm1hbCBmcm9tIFwiLi9TbmFrZUFJTm9ybWFsXCI7XG5pbXBvcnQgU25ha2VBSUhpZ2ggZnJvbSBcIi4vU25ha2VBSUhpZ2hcIjtcbmltcG9ydCBTbmFrZUFJTW9jayBmcm9tIFwiLi9TbmFrZUFJTW9ja1wiO1xuXG5leHBvcnQgeyBTbmFrZUFJLCBTbmFrZUFJUmFuZG9tLCBTbmFrZUFJTG93LCBTbmFrZUFJTm9ybWFsLCBTbmFrZUFJSGlnaCwgU25ha2VBSU1vY2sgfSIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuLy8gRXhwb3J0cyBlbmdpbmUgY2xhc3Nlc1xuaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSBcIi4vZW5naW5lL0NvbnN0YW50c1wiO1xuaW1wb3J0IEV2ZW50IGZyb20gXCIuL2VuZ2luZS9FdmVudFwiO1xuaW1wb3J0IFJlYWN0b3IgZnJvbSBcIi4vZW5naW5lL1JlYWN0b3JcIjtcbmltcG9ydCBHcmlkIGZyb20gXCIuL2VuZ2luZS9HcmlkXCI7XG5pbXBvcnQgU25ha2UgZnJvbSBcIi4vZW5naW5lL1NuYWtlXCI7XG5pbXBvcnQgR2FtZUdyb3VwIGZyb20gXCIuL2VuZ2luZS9HYW1lR3JvdXBcIjtcbmltcG9ydCBHYW1lVXRpbHMgZnJvbSBcIi4vZW5naW5lL0dhbWVVdGlsc1wiO1xuaW1wb3J0IFBvc2l0aW9uIGZyb20gXCIuL2VuZ2luZS9Qb3NpdGlvblwiO1xuaW1wb3J0IEdhbWVFbmdpbmUgZnJvbSAnLi9lbmdpbmUvR2FtZUVuZ2luZSc7XG5cbmV4cG9ydCB7IEdhbWVDb25zdGFudHMsIEV2ZW50LCBSZWFjdG9yLCBHcmlkLCBTbmFrZSwgR2FtZUdyb3VwLCBHYW1lVXRpbHMsIFBvc2l0aW9uLCBHYW1lRW5naW5lIH07IiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==