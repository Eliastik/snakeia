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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/engine/GameEngineWorker.js");
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

/***/ "./node_modules/@babel/runtime/helpers/defineProperty.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

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

/***/ "./src/engine/GameEngineWorker.js":
/*!****************************************!*\
  !*** ./src/engine/GameEngineWorker.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Constants */ "./src/engine/Constants.js");
/* harmony import */ var _Position__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Position */ "./src/engine/Position.js");
/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Grid */ "./src/engine/Grid.js");
/* harmony import */ var _Snake__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Snake */ "./src/engine/Snake.js");
/* harmony import */ var _GameEngine_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./GameEngine.js */ "./src/engine/GameEngine.js");


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





var game;

function copySnakes(snakes) {
  var copy = JSON.parse(JSON.stringify(snakes));

  if (copy) {
    for (var i = 0; i < copy.length; i++) {
      delete copy[i]["grid"];
      if (snakes[i].snakeAI && snakes[i].snakeAI.aiLevelText) copy[i]["snakeAI"]["aiLevelText"] = snakes[i].snakeAI.aiLevelText;
    }
  }

  return copy;
}

function copyGrid(grid) {
  var copy = JSON.parse(JSON.stringify(grid));

  if (copy) {
    copy.rngGrid = null;
    copy.rngGame = null;
  }

  return copy;
}

function parseSnakes(snakes, grid) {
  if (game) {
    grid = grid != null ? grid : game.grid;
  }

  grid = Object.assign(new _Grid__WEBPACK_IMPORTED_MODULE_3__["default"](), grid);

  if (!snakes && game) {
    snakes = game.snakes;
  }

  for (var i = 0; i < snakes.length; i++) {
    snakes[i].grid = grid;
    snakes[i] = Object.assign(new _Snake__WEBPACK_IMPORTED_MODULE_4__["default"](), snakes[i]);

    for (var j = 0; j < snakes[i].queue.length; j++) {
      snakes[i].queue[j] = Object.assign(new _Position__WEBPACK_IMPORTED_MODULE_2__["default"](), snakes[i].queue[j]);
    }

    snakes[i].initAI();
  }

  return {
    grid: grid,
    snakes: snakes
  };
}

onmessage = function onmessage(e) {
  var data = e.data;

  if (data.length > 1 && data[0] == "init") {
    var parsed = parseSnakes(data[1]["snakes"], data[1]["grid"]);
    var grid = parsed["grid"];
    var snakes = parsed["snakes"];
    game = new _GameEngine_js__WEBPACK_IMPORTED_MODULE_5__["default"](grid, snakes, data[1]["speed"], data[1]["enablePause"], data[1]["enableRetry"], data[1]["progressiveSpeed"]);
    game.init();
    self.postMessage(["init", {
      "snakes": copySnakes(game.snakes),
      "grid": copyGrid(game.grid),
      "enablePause": game.enablePause,
      "enableRetry": game.enableRetry,
      "progressiveSpeed": game.progressiveSpeed,
      "offsetFrame": game.speed * _Constants__WEBPACK_IMPORTED_MODULE_1__["default"].Setting.TIME_MULTIPLIER,
      "errorOccurred": game.errorOccurred
    }]);
    game.onReset(function () {
      self.postMessage(["reset", {
        "paused": game.paused,
        "isReseted": game.isReseted,
        "exited": game.exited,
        "snakes": copySnakes(game.snakes),
        "grid": copyGrid(game.grid),
        "numFruit": game.numFruit,
        "ticks": game.ticks,
        "scoreMax": game.scoreMax,
        "gameOver": game.gameOver,
        "gameFinished": game.gameFinished,
        "gameMazeWin": game.gameMazeWin,
        "starting": game.starting,
        "initialSpeed": game.initialSpeed,
        "speed": game.speed,
        "offsetFrame": game.speed * _Constants__WEBPACK_IMPORTED_MODULE_1__["default"].Setting.TIME_MULTIPLIER,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred,
        "aiStuck": game.aiStuck,
        "precAiStuck": false
      }]);
    });
    game.onStart(function () {
      self.postMessage(["start", {
        "snakes": copySnakes(game.snakes),
        "grid": copyGrid(game.grid),
        "starting": game.starting,
        "countBeforePlay": game.countBeforePlay,
        "paused": game.paused,
        "isReseted": game.isReseted,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });
    game.onPause(function () {
      self.postMessage(["pause", {
        "paused": game.paused,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });
    game.onContinue(function () {
      self.postMessage(["continue", {
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });
    game.onStop(function () {
      self.postMessage(["stop", {
        "paused": game.paused,
        "scoreMax": game.scoreMax,
        "gameOver": game.gameOver,
        "gameFinished": game.gameFinished,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });
    game.onExit(function () {
      self.postMessage(["exit", {
        "paused": game.paused,
        "gameOver": game.gameOver,
        "gameFinished": game.gameFinished,
        "exited": game.exited,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });
    game.onKill(function () {
      self.postMessage(["kill", {
        "paused": game.paused,
        "gameOver": game.gameOver,
        "killed": game.killed,
        "snakes": copySnakes(game.snakes),
        "grid": copyGrid(game.grid),
        "gameFinished": game.gameFinished,
        "confirmReset": false,
        "confirmExit": false,
        "getInfos": false,
        "getInfosGame": false,
        "errorOccurred": game.errorOccurred
      }]);
    });
    game.onScoreIncreased(function () {
      self.postMessage(["scoreIncreased", {}]);
    });
    game.onUpdate(function () {
      var _ref;

      self.postMessage(["update", (_ref = {
        "paused": game.paused,
        "isReseted": game.isReseted,
        "exited": game.exited,
        "snakes": copySnakes(game.snakes),
        "grid": copyGrid(game.grid),
        "numFruit": game.numFruit,
        "ticks": game.ticks,
        "scoreMax": game.scoreMax,
        "gameOver": game.gameOver,
        "gameFinished": game.gameFinished,
        "gameMazeWin": game.gameMazeWin,
        "starting": game.starting,
        "initialSpeed": game.initialSpeed,
        "speed": game.speed,
        "countBeforePlay": game.countBeforePlay
      }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, "numFruit", game.numFruit), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, "offsetFrame", 0), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, "errorOccurred", game.errorOccurred), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref, "aiStuck", game.aiStuck), _ref)]);
    });
    game.onUpdateCounter(function () {
      var _ref2;

      self.postMessage(["updateCounter", (_ref2 = {
        "paused": game.paused,
        "isReseted": game.isReseted,
        "exited": game.exited,
        "snakes": copySnakes(game.snakes),
        "grid": copyGrid(game.grid),
        "numFruit": game.numFruit,
        "ticks": game.ticks,
        "scoreMax": game.scoreMax,
        "gameOver": game.gameOver,
        "gameFinished": game.gameFinished,
        "gameMazeWin": game.gameMazeWin,
        "starting": game.starting,
        "initialSpeed": game.initialSpeed,
        "speed": game.speed,
        "countBeforePlay": game.countBeforePlay
      }, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, "numFruit", game.numFruit), _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(_ref2, "errorOccurred", game.errorOccurred), _ref2)]);
    });
  } else if (game != null) {
    var message = data[0];

    switch (message) {
      case "reset":
        game.reset();
        break;

      case "start":
        game.start();
        break;

      case "stop":
        game.stop();
        break;

      case "finish":
        game.stop(true);
        break;

      case "stop":
        game.stop(false);
        break;

      case "pause":
        game.pause();
        break;

      case "kill":
        game.kill();
        break;

      case "tick":
        game.paused = false;
        game.countBeforePlay = -1;
        game.tick();
        break;

      case "ping":
        self.postMessage("pong");
        break;

      case "exit":
        game.exit();
        break;

      case "forceStart":
        game.forceStart();
        break;

      case "key":
        if (data.length > 1) {
          game.lastKey = data[1];
          var playerSnake = game.getPlayer(1, _Constants__WEBPACK_IMPORTED_MODULE_1__["default"].PlayerType.HUMAN) || game.getPlayer(1, _Constants__WEBPACK_IMPORTED_MODULE_1__["default"].PlayerType.HYBRID_HUMAN_AI);

          if (playerSnake != null && playerSnake.lastKey != null) {
            playerSnake.lastKey = data[1];
          }
        }

        break;

      case "update":
        if (data.length > 1) {
          if (data[1]["key"] == "snakes") {
            var d = parseSnakes(data[1]["data"]);
            if (d) game.snakes = d.snakes;
          } else if (data[1]["key"] == "grid") {
            var _d = parseSnakes(null, data[1]["data"]);

            if (_d) game.grid = _d.grid;
          } else {
            game[data[1]["key"]] = data[1]["data"];
          }
        }

        break;

      case "destroySnakes":
        if (data[1] && data[2]) game.destroySnakes(data[1], data[2]);
        break;
    }
  } else if (data == "ping") {
    self.postMessage("pong");
  }
};

self.postMessage("ready");

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

/***/ 0:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbGlicy9sb3dsaWdodC5hc3Rhci5taW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2dldC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9nZXRQcm90b3R5cGVPZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbmhlcml0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3NldFByb3RvdHlwZU9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL3N1cGVyUHJvcEJhc2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi9hbGVhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi90eWNoZWkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vbGliL3hvcjEyOC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIveG9yNDA5Ni5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc2VlZHJhbmRvbS9saWIveG9yc2hpZnQ3LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zZWVkcmFuZG9tL2xpYi94b3J3b3cuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3NlZWRyYW5kb20vc2VlZHJhbmRvbS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lL0NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lL0V2ZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9lbmdpbmUvR2FtZUVuZ2luZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lL0dhbWVFbmdpbmVXb3JrZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS9HYW1lVXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS9HcmlkLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmdpbmUvUG9zaXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS9SZWFjdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmdpbmUvU25ha2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS9haS9TbmFrZUFJLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmdpbmUvYWkvU25ha2VBSUhpZ2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS9haS9TbmFrZUFJTG93LmpzIiwid2VicGFjazovLy8uL3NyYy9lbmdpbmUvYWkvU25ha2VBSU1vY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VuZ2luZS9haS9TbmFrZUFJTm9ybWFsLmpzIiwid2VicGFjazovLy8uL3NyYy9lbmdpbmUvYWkvU25ha2VBSVJhbmRvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW5naW5lL2FpL2luZGV4LmpzIiwid2VicGFjazovLy9jcnlwdG8gKGlnbm9yZWQpIl0sIm5hbWVzIjpbIkNhc2VUeXBlIiwiRU1QVFkiLCJTTkFLRSIsIkZSVUlUIiwiV0FMTCIsIlNOQUtFX0RFQUQiLCJTVVJST1VOREVEIiwiRlJVSVRfR09MRCIsIkNST1NTRUQiLCJQbGF5ZXJUeXBlIiwiQUkiLCJIVU1BTiIsIkhZQlJJRF9IVU1BTl9BSSIsIkFpTGV2ZWwiLCJSQU5ET00iLCJMT1ciLCJERUZBVUxUIiwiSElHSCIsIlVMVFJBIiwiQ1VTVE9NIiwiTU9DSyIsIk91dHB1dFR5cGUiLCJURVhUIiwiR1JBUEhJQ0FMIiwiU2V0dGluZyIsIkNBTlZBU19XSURUSCIsIkNBTlZBU19IRUlHSFQiLCJGT05UX0ZBTUlMWSIsIkZPTlRfU0laRSIsIkhFQURFUl9IRUlHSFRfREVGQVVMVCIsIlRBUkdFVF9GUFMiLCJUSU1FX01VTFRJUExJRVIiLCJJTUFHRV9TTkFLRV9IVUUiLCJJTUFHRV9TTkFLRV9TQVRVUkFUSU9OIiwiSU1BR0VfU05BS0VfVkFMVUUiLCJDQVJTX1RPX1BSRVJFTkRFUiIsIkFQUF9WRVJTSU9OIiwiREFURV9WRVJTSU9OIiwiUFJPQl9HT0xEX0ZSVUlUXzFfUExBWUVSIiwiUFJPQl9HT0xEX0ZSVUlUX01VTFRJUExFX1BMQVlFUlMiLCJJTkZPX05PVElGX0NPTE9SIiwiRVJST1JfTk9USUZfQ09MT1IiLCJEaXJlY3Rpb24iLCJVUCIsIlRPUCIsIlJJR0hUIiwiQk9UVE9NIiwiRE9XTiIsIkxFRlQiLCJBTkdMRV8xIiwiQU5HTEVfMiIsIkFOR0xFXzMiLCJBTkdMRV80IiwiS2V5IiwiRU5URVIiLCJFcnJvciIsIlJPT01fTk9UX0ZPVU5EIiwiUk9PTV9BTFJFQURZX0pPSU5FRCIsIklOVkFMSURfU0VUVElOR1MiLCJNQVhfUk9PTV9MSU1JVF9SRUFDSEVEIiwiQVVUSEVOVElDQVRJT05fUkVRVUlSRUQiLCJBTFJFQURZX0NSRUFURURfUk9PTSIsIkJBTk5FRCIsIkRJU0NPTk5FQ1RFRCIsIkdhbWVTdGF0ZSIsIlNUQVJUSU5HIiwiU1RBUlRFRCIsIlNFQVJDSElOR19QTEFZRVJTIiwiQVVUSEVOVElDQVRJT05fU1VDQ0VTUyIsIkV2ZW50IiwibmFtZSIsImNhbGxiYWNrcyIsImNhbGxiYWNrIiwicHVzaCIsIkdhbWVFbmdpbmUiLCJncmlkIiwic25ha2UiLCJzcGVlZCIsImVuYWJsZVBhdXNlIiwiZW5hYmxlUmV0cnkiLCJwcm9ncmVzc2l2ZVNwZWVkIiwiYWlTdHVja0xpbWl0Iiwic25ha2VzIiwiaW5pdGlhbFNwZWVkIiwiaW5pdGlhbFNwZWVkVW50b3VjaGVkIiwiY291bnRCZWZvcmVQbGF5IiwibGFzdEtleSIsIm51bUZydWl0IiwidGlja3MiLCJmaXJzdFN0YXJ0Iiwic3RhcnRpbmciLCJwYXVzZWQiLCJleGl0ZWQiLCJraWxsZWQiLCJpc1Jlc2V0ZWQiLCJnYW1lT3ZlciIsImdhbWVGaW5pc2hlZCIsImdhbWVNYXplV2luIiwic2NvcmVNYXgiLCJlcnJvck9jY3VycmVkIiwiY2xpZW50U2lkZVByZWRpY3Rpb25zTW9kZSIsImFpU3R1Y2siLCJpbnRlcnZhbFBsYXkiLCJyZWFjdG9yIiwiUmVhY3RvciIsInJlZ2lzdGVyRXZlbnQiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJtYXplIiwiR3JpZCIsImluaXRHcmlkQW5kU25ha2VzIiwic3RhcnRIdWUiLCJHYW1lVXRpbHMiLCJyYW5kUmFuZ2UiLCJzZWVkcmFuZG9tIiwic2VlZEdhbWUiLCJpIiwiU25ha2UiLCJhZGRIdWUiLCJNYXRoIiwicm91bmQiLCJjb2xvciIsInJlc2V0IiwiaW5pdCIsInNldEZydWl0IiwiY2xlYXJJbnRlcnZhbFBsYXkiLCJzZWVkR3JpZCIsInBhcnNlSW50IiwiZGlzcGF0Y2hFdmVudCIsInN0YXJ0IiwiZXJyb3JJbml0Iiwic3RvcCIsInNldEludGVydmFsIiwiZm9yY2VTdGFydCIsInRpY2siLCJjbGVhckludGVydmFsIiwiZmluaXNoIiwia2lsbCIsImV4Y2VwdGlvbklkcyIsInR5cGVzIiwiaW5kZXhPZiIsInBsYXllciIsInNldEdhbWVPdmVyIiwidHlwZSIsIm51bVBsYXllciIsIm51bSIsInNldFRpbWVvdXQiLCJkb1RpY2siLCJHYW1lQ29uc3RhbnRzIiwibGFzdFRpbWUiLCJ0aW1lIiwic2NvcmVJbmNyZWFzZWQiLCJzZXRGcnVpdEVycm9yIiwibWF6ZUZvcmNlQXV0byIsImdldE5CUGxheWVyIiwiZ2V0UGxheWVyIiwiaW5pdGlhbERpcmVjdGlvbiIsImRpcmVjdGlvbiIsImdvbGRGcnVpdCIsImxhc3RUYWlsTW92ZWQiLCJtb3ZlVG8iLCJhaUxldmVsIiwiYWkiLCJoZWFkU25ha2VQb3MiLCJnZXRIZWFkUG9zaXRpb24iLCJpc0RlYWRQb3NpdGlvbiIsImdldE5leHRQb3NpdGlvbiIsImdldCIsInNjb3JlIiwic2V0IiwiZnJ1aXRQb3MiLCJmcnVpdFBvc0dvbGQiLCJpbnNlcnQiLCJoYXNNYXhTY29yZSIsImNlaWwiLCJyZW1vdmUiLCJkZXRlY3RDb3JyaWRvciIsImlzRnJ1aXRTdXJyb3VuZGVkIiwibmJPdmVyIiwiaiIsImVuZEdhbWVBSVN0dWNrIiwiayIsImlzQUlTdHVjayIsImFkZEV2ZW50TGlzdGVuZXIiLCJnYW1lIiwiY29weVNuYWtlcyIsImNvcHkiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJzbmFrZUFJIiwiYWlMZXZlbFRleHQiLCJjb3B5R3JpZCIsInJuZ0dyaWQiLCJybmdHYW1lIiwicGFyc2VTbmFrZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJxdWV1ZSIsIlBvc2l0aW9uIiwiaW5pdEFJIiwib25tZXNzYWdlIiwiZSIsImRhdGEiLCJwYXJzZWQiLCJzZWxmIiwicG9zdE1lc3NhZ2UiLCJvblJlc2V0Iiwib25TdGFydCIsIm9uUGF1c2UiLCJvbkNvbnRpbnVlIiwib25TdG9wIiwib25FeGl0Iiwib25LaWxsIiwib25TY29yZUluY3JlYXNlZCIsIm9uVXBkYXRlIiwib25VcGRhdGVDb3VudGVyIiwibWVzc2FnZSIsInBhdXNlIiwiZXhpdCIsInBsYXllclNuYWtlIiwiZCIsImRlc3Ryb3lTbmFrZXMiLCJtaW4iLCJtYXgiLCJybmciLCJmbG9vciIsInJhbmRvbSIsImh1ZSIsImFkZCIsInJlcyIsInNodWZmbGUiLCJhIiwieCIsIm1pbGxpc2Vjb25kc0Zvcm1hdCIsIm1pbGxpc2Vjb25kcyIsInRydW5jIiwic2xpY2UiLCJzZWNvbmRzRm9ybWF0Iiwic2Vjb25kcyIsIndpZHRoIiwiaGVpZ2h0IiwiZ2VuZXJhdGVXYWxscyIsImJvcmRlcldhbGxzIiwiY3VzdG9tR3JpZCIsInByb2JHb2xkRnJ1aXRJbmNyZWFzZSIsInVuZGVmaW5lZCIsIm1hemVGaXJzdFBvc2l0aW9uIiwiaW5pdGlhbEdyaWQiLCJncmlkVG9Db3B5IiwiZ2VuZXJhdGVNYXplIiwiZml4V2FsbHMiLCJzdGFydFkiLCJzdGFydFgiLCJlbmRZIiwiZW5kWCIsImN1cnJlbnRQb3MiLCJ1cHBlckNhc2UiLCJ1cHBlckxlZnRDYXNlIiwidXBwZXJSaWdodENhc2UiLCJkb3duQ2FzZSIsImRvd25MZWZ0Q2FzZSIsImRvd25SaWdodENhc2UiLCJyIiwiYyIsImRpcmVjdGlvbnMiLCJtYXplX3JlY3Vyc2lvbiIsInZhbHVlIiwicG9zaXRpb24iLCJ5IiwiaWdub3JlU25ha2VQb3MiLCJudW1iZXJQbGF5ZXJzIiwiZ29sZCIsInRyaWVkIiwiZ2V0VG90YWwiLCJyYW5kb21Qb3MiLCJpc0NvcnJpZG9yIiwiZ2V0UmFuZG9tUG9zaXRpb24iLCJ0ZXN0RnJ1aXRNYXplIiwiZ2V0R3JhcGgiLCJncmFwaCIsIkxvd2xpZ2h0IiwiQ29uZmlndXJhdGlvbiIsIm9yZGVyIiwidG9ydXMiLCJkaWFnb25hbHMiLCJjdXR0aW5nIiwiY29zdCIsImIiLCJwYXRoIiwiZmlsbCIsImZvdW5kVmFscyIsImZvcmJpZGRlblZhbHMiLCJncmlkQ29weSIsImNoZWNrTGlzdCIsImN1cnJlbnRQb3NpdGlvbiIsInNoaWZ0Iiwic3Vycm91bmRlZCIsImlzQ2FzZVN1cnJvdW5kZWQiLCJwb3NUb3AiLCJwb3NCb3R0b20iLCJwb3NSaWdodCIsInBvc0xlZnQiLCJpc0RlYWRQb3NpdGlvblRvcCIsImlzRGVhZFBvc2l0aW9uQm90dG9tIiwiaXNEZWFkUG9zaXRpb25SaWdodCIsImlzRGVhZFBvc2l0aW9uTGVmdCIsIm51bURlYWRQb3NpdGlvbkFycm91bmQiLCJjb3JyaWRvclRvcCIsImNvcnJpZG9yQm90dG9tIiwiY29ycmlkb3JMZWZ0IiwiY29ycmlkb3JSaWdodCIsImxpbmUiLCJ0b3QiLCJnZXRPbkxpbmUiLCJvbGRQb3MiLCJuZXdEaXJlY3Rpb24iLCJvdGhlclBvc2l0aW9uIiwiZXF1YWxzIiwiZXhjbHVkZVNuYWtlIiwiaW5jbHVkZVN1cnJvdW5kZWQiLCJ2YWxUb0NoYXIiLCJldmVudHMiLCJldmVudE5hbWUiLCJldmVudEFyZ3MiLCJsIiwicmVnaXN0ZXJDYWxsYmFjayIsImF1dG9SZXRyeSIsImN1c3RvbUFJIiwiaW5pdGlhbExlbmd0aCIsImluaXRUcmllZERpcmVjdGlvbnMiLCJsYXN0VGFpbCIsInRpY2tzRGVhZCIsIlNuYWtlQUkiLCJ0aWNrc1dpdGhvdXRBY3Rpb24iLCJzcGFjZUxpbmVBdmFpbGFibGUiLCJzcGFjZUNvbEF2YWlsYWJsZSIsImVtcHR5T25MaW5lIiwiZW1wdHlPbkNvbCIsInBvc05vdFZhbGlkYXRlZCIsInBvc2l0aW9uc1RvQWRkIiwic3RhcnRQb3MiLCJuZWFyRGVhZFBvc2l0aW9uIiwiZmlyc3RQb3NpdGlvbiIsImludmVydERpcmVjdGlvbiIsIlNuYWtlQUlSYW5kb20iLCJTbmFrZUFJTG93IiwiU25ha2VBSU5vcm1hbCIsIlNuYWtlQUlIaWdoIiwiU25ha2VBSU1vY2siLCJhaUZydWl0R29hbCIsInVuc2hpZnQiLCJsYXN0IiwicG9wIiwiaW5kZXgiLCJrZXkiLCJrZXlUb0RpcmVjdGlvbiIsImdldERpcmVjdGlvblRvIiwiY3VycmVudCIsIm5leHQiLCJwcmVjIiwiZGlyZWN0aW9uVG9QcmVjIiwiZGlyZWN0aW9uVG9OZXh0IiwiZ2V0R3JhcGhpY0RpcmVjdGlvbkZvciIsImVsZW0iLCJhY3Rpb24iLCJ3aWR0aExpbWl0IiwiaGVpZ2h0TGltaXQiLCJfYWlMZXZlbFRleHQiLCJkaXN0RnJ1aXQiLCJhYnMiLCJkaXN0RnJ1aXRHb2xkIiwiYWlMb3ciLCJkaXJlY3Rpb25OZXh0IiwibmV4dFBvc2l0aW9uIiwiY3VycmVudERpcmVjdGlvbiIsImZpcnN0RGlmZmVyZW50RGlyZWN0aW9uIiwiY29udmVydFRvS2V5RGlyZWN0aW9uIiwiZW5hYmxlVG9ydXMiLCJmcnVpdFRhcmdldCIsInRvcCIsImxlZnQiLCJib3R0b20iLCJyaWdodCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFD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QlIsS0FBOUI7QUFDQTtBQVpKO0FBY0Q7O0FBRUQsZUFBT2lILFNBQVA7QUFDRDtBQUNGOzs7O0VBekN3Q2dMLGdEOzs7Ozs7Ozs7Ozs7OztBQ3ZCM0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3ZCQSxlIiwiZmlsZSI6IkdhbWVFbmdpbmVXb3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9lbmdpbmUvR2FtZUVuZ2luZVdvcmtlci5qc1wiKTtcbiIsIi8qKlxuQ29weXJpZ2h0IDIwMTcsIExlY29xIFNpbW9uIChsb3dsaWdodC5mcilcblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5USEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuKi9cbihmdW5jdGlvbihhKXt2YXIgYj1NYXRoLnNpZ24sYz1NYXRoLm1pbixkPU1hdGguYWJzO1widW5kZWZpbmVkXCI9PXR5cGVvZiBhLkxvd2xpZ2h0JiYoYS5Mb3dsaWdodD17fSksXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZSYmXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9YS5Mb3dsaWdodCk7Y2xhc3MgZXtjb25zdHJ1Y3Rvcigpe3RoaXMubm9kZXM9bmV3IE1hcH1pZChhKXtyZXR1cm4gYX1ub2RlKGEsYj0hMSl7cmV0dXJuIGI/dGhpcy5ub2Rlcy5nZXQodGhpcy5pZChhcmd1bWVudHNbMF0pKTp0aGlzLm5vZGVzLmdldChhKX1kYXRhKGEsYil7cmV0dXJuIDI9PT1hcmd1bWVudHMubGVuZ3RoJiYoYS5ncmFwaC5nZXQodGhpcykuX2RhdGE9YiksYS5ncmFwaC5nZXQodGhpcykuX2RhdGF9YWRqYWNlbnQoYyxhKXtyZXR1cm4gYy5ncmFwaC5nZXQodGhpcykuaGFzKGEpfW5laWdoYm9ycyhhKXtyZXR1cm4gQXJyYXkuZnJvbShhLmdyYXBoLmdldCh0aGlzKS5rZXlzKCkpfWNvbm5lY3RlZChjLGEpe3JldHVybiBjLmdyYXBoLmdldCh0aGlzKS5fY29ubmVjdGl2aXR5PT09YS5ncmFwaC5nZXQodGhpcykuX2Nvbm5lY3Rpdml0eX1jb25uZWN0KCl7bGV0IGE9QXJyYXkuZnJvbSh0aGlzLm5vZGVzLnZhbHVlcygpKSxiPTA7Zm9yKGxldCBiPTA7YjxhLmxlbmd0aDtiKyspYVtiXS5ncmFwaC5nZXQodGhpcykuX2Nvbm5lY3Rpdml0eT12b2lkIDA7Zm9yKGxldCBjPTA7YzxhLmxlbmd0aDtjKyspe2lmKHZvaWQgMCE9PWFbY10uZ3JhcGguZ2V0KHRoaXMpLl9jb25uZWN0aXZpdHkpY29udGludWU7bGV0IGQ9W2FbY11dO2ZvcihiKys7ZC5sZW5ndGg7KXtsZXQgYT1kLnNoaWZ0KCk7YS5ncmFwaC5nZXQodGhpcykuX2Nvbm5lY3Rpdml0eT1iLHRoaXMubmVpZ2hib3JzKGEpLm1hcCgoYSk9Pnt2b2lkIDA9PT1hLmdyYXBoLmdldCh0aGlzKS5fY29ubmVjdGl2aXR5JiYwPmQuaW5kZXhPZihhKSYmZC5wdXNoKGEpfSl9fX1hZGQoYSl7cmV0dXJuIDE8YXJndW1lbnRzLmxlbmd0aD9BcnJheS5mcm9tKGFyZ3VtZW50cykubWFwKChhKT0+dGhpcy5hZGQoYSkpOihhLmdyYXBoLnNldCh0aGlzLG5ldyBNYXApLHRoaXMubm9kZXMuc2V0KGEuaWQsYSksYSl9ZGVsZXRlKGEpe3JldHVybiAxPGFyZ3VtZW50cy5sZW5ndGg/QXJyYXkuZnJvbShhcmd1bWVudHMpLm1hcCgoYSk9PnRoaXMuZGVsZXRlKGEpKTooYS5ncmFwaC5kZWxldGUodGhpcyksdGhpcy5ub2Rlcy5kZWxldGUoYS5pZCksYSl9ZWRnZShjLGEsYj0xLGQ9MSl7aWYoIWMuZ3JhcGguaGFzKHRoaXMpfHwhYS5ncmFwaC5oYXModGhpcykpdGhyb3cgbmV3IEVycm9yKFwiTm9kZXMgbXVzdCBiZSBvbiB0aGUgc2FtZSBncmFwaFwiKTtyZXR1cm4gbnVsbD09PWI/Yy5ncmFwaC5nZXQodGhpcykuZGVsZXRlKGEpOmMuZ3JhcGguZ2V0KHRoaXMpLnNldChhLGIpLG51bGw9PT1kP2EuZ3JhcGguZ2V0KHRoaXMpLmRlbGV0ZShjKTphLmdyYXBoLmdldCh0aGlzKS5zZXQoYyxkKSx0aGlzfWNvc3QoYyxhKXtyZXR1cm4gdGhpcy5hZGphY2VudChjLGEpP2MuZ3JhcGguZ2V0KHRoaXMpLmdldChhKTpudWxsfX1lLmZyb21BcnJheT1mdW5jdGlvbihhLGI9e30pe2xldCBjPWUuZnJvbUFycmF5LlgoYSxiLm9yZGVyKSxkPWUuZnJvbUFycmF5LlkoYSxiLm9yZGVyKSxnPWUuZnJvbUFycmF5LmF0LmJpbmQobnVsbCxhLGIub3JkZXIpLGg9W10saj1udWxsO2ZvcihsZXQgayxsPTE7bDxNYXRoLm1heCgyLGFyZ3VtZW50cy5sZW5ndGgpO2wrKyl7az1uZXcgZSxoLnB1c2goayksYj1hcmd1bWVudHNbbF18fHt9O2xldCBhPWUuZnJvbUFycmF5LmlkLmJpbmQobnVsbCxjLGQsYi50b3J1cyksaT1iLmNvc3R8fGUuZnJvbUFycmF5LmNvc3Qsbj1lLmZyb21BcnJheS5lZGdlLmJpbmQobnVsbCxrLGkpO2ZvcihsZXQgYj0wO2I8YztiKyspZm9yKGxldCBjLGU9MDtlPGQ7ZSsrKWM9ay5hZGQoaj9qLmdldChhKGIsZSkpOm5ldyBmKGEoYixlKSkpLGMueD1iLGMueT1lLGMuZ3JhcGguZ2V0KGspLl9kYXRhPWcoYixlKSxuKGMsay5ub2Rlcy5nZXQoYShiLTEsZSkpKSxuKGMsay5ub2Rlcy5nZXQoYShiKzEsZSkpKSxuKGMsay5ub2Rlcy5nZXQoYShiLGUtMSkpKSxuKGMsay5ub2Rlcy5nZXQoYShiLGUrMSkpKTtpZihiLmRpYWdvbmFscylmb3IobGV0IGU9MDtlPGM7ZSsrKWZvcihsZXQgYz0wO2M8ZDtjKyspe2xldCBkPWsubm9kZXMuZ2V0KGEoZSxjKSksZj1rLmFkamFjZW50KGQsay5ub2Rlcy5nZXQoYShlLTEsYykpKSxnPWsuYWRqYWNlbnQoZCxrLm5vZGVzLmdldChhKGUrMSxjKSkpLGg9ay5hZGphY2VudChkLGsubm9kZXMuZ2V0KGEoZSxjLTEpKSksaT1rLmFkamFjZW50KGQsay5ub2Rlcy5nZXQoYShlLGMrMSkpKTtcInN0cmljdFwiPT09Yi5jdXR0aW5nPyhmJiZoJiZuKGQsay5ub2Rlcy5nZXQoYShlLTEsYy0xKSkpLGYmJmkmJm4oZCxrLm5vZGVzLmdldChhKGUtMSxjKzEpKSksZyYmaCYmbihkLGsubm9kZXMuZ2V0KGEoZSsxLGMtMSkpKSxnJiZpJiZuKGQsay5ub2Rlcy5nZXQoYShlKzEsYysxKSkpKTooKGZ8fGh8fGIuY3V0dGluZykmJm4oZCxrLm5vZGVzLmdldChhKGUtMSxjLTEpKSksKGZ8fGl8fGIuY3V0dGluZykmJm4oZCxrLm5vZGVzLmdldChhKGUtMSxjKzEpKSksKGd8fGh8fGIuY3V0dGluZykmJm4oZCxrLm5vZGVzLmdldChhKGUrMSxjLTEpKSksKGd8fGl8fGIuY3V0dGluZykmJm4oZCxrLm5vZGVzLmdldChhKGUrMSxjKzEpKSkpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShrLFwiaWRcIix7ZW51bWVyYWJsZTohMSxjb25maWd1cmFibGU6ITEsd3JpdGFibGU6ITAsdmFsdWUoYil7cmV0dXJuIGEoYi54LGIueSl9fSksay5jb25uZWN0KCksay5YPWMsay5ZPWQsay5UT1JVUz1iLnRvcnVzLGp8fChqPWsubm9kZXMpfXJldHVybiAxPGgubGVuZ3RoP2g6aFswXX0sZS5mcm9tQXJyYXkuWD1mdW5jdGlvbihhLGI9XCJ5eFwiKXtyZXR1cm5cInh5XCI9PT1iP2EubGVuZ3RoOlwieXhcIj09PWI/YVswXS5sZW5ndGg6MH0sZS5mcm9tQXJyYXkuWT1mdW5jdGlvbihhLGI9XCJ5eFwiKXtyZXR1cm5cInh5XCI9PT1iP2FbMF0ubGVuZ3RoOlwieXhcIj09PWI/YS5sZW5ndGg6MH0sZS5mcm9tQXJyYXkuYXQ9ZnVuY3Rpb24oYSxiPVwieXhcIixjLGQpe3JldHVyblwieHlcIj09PWI/YVtjXVtkXTphW2RdW2NdfSxlLmZyb21BcnJheS5pZD1mdW5jdGlvbihhPTAsYj0wLGM9ITEsZCxlKXtyZXR1cm4gYz8oZStiKSViKmErKGQrYSklYTowPD1kJiZkPGEmJjA8PWUmJmU8Yj9lKmErZDpudWxsfSxlLmZyb21BcnJheS5jb3N0PWZ1bmN0aW9uKCl7cmV0dXJuIDF9LGUuZnJvbUFycmF5LmVkZ2U9ZnVuY3Rpb24oYyxkLGUsYSl7YSYmYy5lZGdlKGUsYSxkKGMuZGF0YShlKSxjLmRhdGEoYSkpLGQoYy5kYXRhKGEpLGMuZGF0YShlKSkpfSxlLmZyb21BcnJheS51cGRhdGU9ZnVuY3Rpb24oKXtjb25zb2xlLndhcm4oXCJHcmFwaC5mcm9tQXJyYXkgaXNuJ3QgaW1wbGVtZW50ZWQgeWV0XCIpfTtjbGFzcyBme2NvbnN0cnVjdG9yKGEsYil7Zm9yKGxldCBjIGluIHRoaXMuaWQ9YSx0aGlzLmdyYXBoPW5ldyBNYXAsYilcImlkXCIhPWMmJlwiZ3JhcGhcIiE9YyYmKHRoaXNbY109YltjXSl9fWNsYXNzIGd7Y29uc3RydWN0b3IoYSl7dGhpcy5ub2Rlcz1bXSx0aGlzLnNjb3JlPVwiZnVuY3Rpb25cIj09dHlwZW9mIGE/YTooYik9PitifWdldCBzaXplKCl7cmV0dXJuIHRoaXMubm9kZXMubGVuZ3RofWFkZChhKXtpZigxPGFyZ3VtZW50cy5sZW5ndGgpe2ZvcihsZXQgYT0wO2E8YXJndW1lbnRzLmxlbmd0aDthKyspdGhpcy5hZGQoYXJndW1lbnRzW2FdKTtyZXR1cm4gdGhpc31yZXR1cm4gdGhpcy5ub2Rlcy5wdXNoKGEpLHRoaXMuYnViYmxlKHRoaXMuc2l6ZS0xKX1zZXQoYSl7bGV0IGI9dGhpcy5ub2Rlcy5pbmRleE9mKGEpO3JldHVybn5iP3RoaXMuc2NvcmUoYSk8PXRoaXMuc2NvcmUodGhpcy5ub2Rlc1tiXSk/dGhpcy5idWJibGUodGhpcy5ub2Rlcy5pbmRleE9mKGEpKTp0aGlzLnNpbmsodGhpcy5ub2Rlcy5pbmRleE9mKGEpKTp0aGlzLmFkZChhKX1wb3AoKXtsZXQgYT10aGlzLm5vZGVzWzBdLGI9dGhpcy5ub2Rlcy5wb3AoKTtyZXR1cm4gMDx0aGlzLnNpemUmJih0aGlzLm5vZGVzWzBdPWIsdGhpcy5zaW5rKDApKSxhfXRvcCgpe3JldHVybiB0aGlzLm5vZGVzWzBdfWRlbGV0ZShhKXtpZigxPGFyZ3VtZW50cy5sZW5ndGgpe2ZvcihsZXQgYT0wO2E8YXJndW1lbnRzLmxlbmd0aDthKyspdGhpcy5kZWxldGUoYXJndW1lbnRzW2FdKTtyZXR1cm4gdGhpc31mb3IobGV0IGI9MDtiPHRoaXMuc2l6ZTtiKyspe2lmKHRoaXMubm9kZXNbYl0hPWEpY29udGludWU7bGV0IGM9dGhpcy5ub2Rlcy5wb3AoKTtyZXR1cm4gYj09dGhpcy5zaXplLTE/dGhpczoodGhpcy5ub2Rlc1tiXT1jLHRoaXMuYnViYmxlKGIpLnNpbmsoYikpfX1idWJibGUoYSl7bGV0IGI9dGhpcy5ub2Rlc1thXSxjPXRoaXMuc2NvcmUoYik7Zm9yKDswPGE7KXtsZXQgZD1NYXRoLmZsb29yKChhKzEpLzIpLTEsZT10aGlzLm5vZGVzW2RdO2lmKGM+PXRoaXMuc2NvcmUoZSkpYnJlYWs7dGhpcy5ub2Rlc1tkXT1iLHRoaXMubm9kZXNbYV09ZSxhPWR9cmV0dXJuIHRoaXN9c2luayhhKXtsZXQgYj10aGlzLm5vZGVzW2FdLGM9dGhpcy5zY29yZShiKTtmb3IoOzspe2xldCBkPTIqKGErMSksZT1kLTEsZj1udWxsO2lmKGU8dGhpcy5zaXplJiZ0aGlzLnNjb3JlKHRoaXMubm9kZXNbZV0pPGMmJihmPWUpLGQ8dGhpcy5zaXplJiZ0aGlzLnNjb3JlKHRoaXMubm9kZXNbZF0pPChmP3RoaXMuc2NvcmUodGhpcy5ub2Rlc1tmXSk6YykmJihmPWQpLG51bGw9PT1mKWJyZWFrO3RoaXMubm9kZXNbYV09dGhpcy5ub2Rlc1tmXSx0aGlzLm5vZGVzW2ZdPWIsYT1mfXJldHVybiB0aGlzfX1sZXQgaD17bWFuaGF0dGFuOmZ1bmN0aW9uKGMsYSxiPXt9KXtsZXQgZT1kKGEueC1jLngpLGY9ZChhLnktYy55KTtyZXR1cm4oYi5tdWx0aXBsaWVyfHwxKSooZStmKX0sbWFuaGF0dGFuVG9ydXM6ZnVuY3Rpb24oZSxhLGI9e30pe2xldCBmPWMoZChhLngtZS54KSxhLngrKGIueHx8MCktZS54LGUueCsoYi54fHwwKS1hLngpLGc9YyhkKGEueS1lLnkpLGEueSsoYi55fHwwKS1lLnksZS55KyhiLnl8fDApLWEueSk7cmV0dXJuKGIubXVsdGlwbGllcnx8MSkqKGYrZyl9LGRpYWdvbmFsOmZ1bmN0aW9uKGUsYSxiPXt9KXtsZXQgZj1kKGEueC1lLngpLGc9ZChhLnktZS55KTtyZXR1cm4gbSooZitnKSsoZG0tMiptKSpjKGYsZyl9LGRpYWdvbmFsVG9ydXM6ZnVuY3Rpb24oZSxhLGI9e30pe2xldCBmPWMoZChhLngtZS54KSxhLngrKGIueHx8MCktZS54LGUueCsoYi54fHwwKS1hLngpLGc9YyhkKGEueS1lLnkpLGEueSsoYi55fHwwKS1lLnksZS55KyhiLnl8fDApLWEueSk7cmV0dXJuKGIubXVsdGlwbGllcnx8MSkqKGYrZykrKChiLmRpYWdvbmFsTXVsdGlwbGllcnx8MS40KS0yKihiLm11bHRpcGxpZXJ8fDEpKSpjKGYsZyl9LGV1Y2xpZGlhbjpmdW5jdGlvbihjLGEsYj17fSl7bGV0IGU9ZChhLngtYy54KSxmPWQoYS55LWMueSk7cmV0dXJuKGIubXVsdGlwbGllcnx8MSkqTWF0aC5zcXJ0KGUqZStmKmYpfSxldWNsaWRpYW5Ub3J1czpmdW5jdGlvbihlLGEsYj17fSl7bGV0IGY9YyhkKGEueC1lLngpLGEueCsoYi54fHwwKS1lLngsZS54KyhiLnh8fDApLWEueCksZz1jKGQoYS55LWUueSksYS55KyhiLnl8fDApLWUueSxlLnkrKGIueXx8MCktYS55KTtyZXR1cm4oYi5tdWx0aXBsaWVyfHwxKSooZitnKSsoKGIuZGlhZ29uYWxNdWx0aXBsaWVyfHwxLjQpLTIqKGIubXVsdGlwbGllcnx8MSkpKmMoZixnKX19O2NsYXNzIGkgZXh0ZW5kcyBFcnJvcntjb25zdHJ1Y3RvcihhKXtzdXBlcihhKSx0aGlzLm5hbWU9XCJXb3JrZXJFcnJvclwifX1jbGFzcyBqe2NvbnN0cnVjdG9yKGEsYj17fSl7aWYodGhpcy5ncmFwaHM9W10sdGhpcy5oZXVyaXN0aWM9Yi5oZXVyaXN0aWN8fFwibWFuaGF0dGFuXCIsdGhpcy5oZXVyaXN0aWNPcHRpb25zPWIuaGV1cmlzdGljT3B0aW9uc3x8e30sQXJyYXkuaXNBcnJheShhKSYmKHRoaXMuaGV1cmlzdGljPWIuaGV1cmlzdGljIGluIGg/Yi5oZXVyaXN0aWM6Yi5kaWFnb25hbHM/Yi50b3J1cz9cImRpYWdvbmFsVG9ydXNcIjpcImRpYWdvbmFsXCI6Yi50b3J1cz9cIm1hbmhhdHRhblRvcnVzXCI6XCJtYW5oYXR0YW5cIix0aGlzLmhldXJpc3RpY09wdGlvbnMueD1lLmZyb21BcnJheS5YKGEsYi5vcmRlciksdGhpcy5oZXVyaXN0aWNPcHRpb25zLnk9ZS5mcm9tQXJyYXkuWShhLGIub3JkZXIpLHRoaXMuZ3JhcGhzPWUuZnJvbUFycmF5LmFwcGx5KHRoaXMsYXJndW1lbnRzKSwhQXJyYXkuaXNBcnJheSh0aGlzLmdyYXBocykmJih0aGlzLmdyYXBocz1bdGhpcy5ncmFwaHNdKSksYi50aHJlYWQmJihcInVuZGVmaW5lZFwiPT10eXBlb2YgV29ya2VyR2xvYmFsU2NvcGV8fCEoc2VsZiBpbnN0YW5jZW9mIFdvcmtlckdsb2JhbFNjb3BlKSkpe3RoaXMud29ya2VyPW51bGw7dHJ5e3RoaXMud29ya2VyPW5ldyBXb3JrZXIoYi50aHJlYWQpfWNhdGNoKGEpe3Rocm93XCJmaWxlOlwiPT09d2luZG93LmxvY2F0aW9uLnByb3RvY29sJiZjb25zb2xlLndhcm4oXCJXZWJXb3JrZXJzIGluIGxvY2FsIGZpbGVzIG1heSBub3QgYmUgc3VwcG9ydGVkIGJ5IHlvdXIgYnJvd3Nlci5cIiksbmV3IGkoYCR7Yi50aHJlYWR9IGNvdWxkbid0IGJlIG9wZW5lZC5gKX1cImNvc3RcImluIGImJihiLmNvc3Q9Yi5jb3N0LnRvU3RyaW5nKCkpLHRoaXMud29ya2VyLnBvc3RNZXNzYWdlKFtcImNvbnN0cnVjdG9yXCIsYSxiXSksdGhpcy5wYXRoPShhLGIsYz17fSk9Pnt0aGlzLl93b3JrZXJfcGF0aF9jYWxsYmFjaz1jLmNhbGxiYWNrLGRlbGV0ZSBjLmNhbGxiYWNrLHRoaXMud29ya2VyLnBvc3RNZXNzYWdlKFtcInBhdGhcIixhLGIsY10pfSx0aGlzLndvcmtlci5vbm1lc3NhZ2U9KGEpPT57bGV0IGI9SlNPTi5wYXJzZShhLmRhdGEpO3N3aXRjaChiWzBdKXtjYXNlXCJwYXRoXCI6dGhpcy5fd29ya2VyX3BhdGhfY2FsbGJhY2soYlsxXSk7fX19fXBhdGgoYSxiLGM9e30pe2lmKGMuanBzKXJldHVybiB0aGlzLmpwcyhhLGIsYyk7bGV0IGQ9bmV3IGcoKGEpPT5hLmVzdGltYXRlZCksZT1uZXcgTWFwLGY9dGhpcy5ncmFwaHNbYy5sYXllcnx8MF07aWYoYT1mLm5vZGUoYSwhMCksYj1mLm5vZGUoYiwhMCksZC5hZGQoe25vZGU6YSxlc3RpbWF0ZWQ6MH0pLGUuc2V0KGEse3Njb3JlOjAsZnJvbTpudWxsfSksIWMuc3RhdGljfHxmLmNvbm5lY3RlZChhLGIpKWZvcig7ZC5zaXplOyl7bGV0IGE9ZC5wb3AoKS5ub2RlO2lmKGE9PT1iKWJyZWFrO2YubmVpZ2hib3JzKGEpLm1hcCgoZyk9PntsZXQgaT0oZS5oYXMoYSk/ZS5nZXQoYSkuc2NvcmU6MCkrZi5jb3N0KGEsZyk7aTwoZS5oYXMoZyk/ZS5nZXQoZykuc2NvcmU6SW5maW5pdHkpJiYoZS5zZXQoZyx7c2NvcmU6aSxmcm9tOmF9KSxkLnNldCh7bm9kZTpnLGVzdGltYXRlZDppK2hbYy5oZXVyaXN0aWN8fHRoaXMuaGV1cmlzdGljXShnLGIsYy5oZXVyaXN0aWNPcHRpb25zfHx0aGlzLmhldXJpc3RpY09wdGlvbnMpfSkpfSksZC5kZWxldGUoYSl9bGV0IGk9W107aWYoZS5oYXMoYikpe2xldCBhPWI7Zm9yKGkucHVzaChiKTtudWxsIT09KGE9ZS5nZXQoYSkuZnJvbSk7KWkucHVzaChhKTtpPWkucmV2ZXJzZSgpfXJldHVybiBjLmNhbGxiYWNrJiZjLmNhbGxiYWNrKGksZSksaX19aWYoai5KUFM9Y2xhc3N7Y29uc3RydWN0b3IoKXt9c3RhdGljIGFjY2VzcyhjLGQsYSxiKXtyZXR1cm4gYy5hZGphY2VudChkLGI/Yy5ub2RlKGEsITApOmEpfXN0YXRpYyBuZWlnaGJvcmhvb2QoYSxjLGQsZSl7bGV0IGY9W10sZz1kLmdldChlKS5mcm9tfHxudWxsO2lmKG51bGwhPT1nKXtsZXQgaD17eDpiKGUueC1nLngpLHk6YihlLnktZy55KX07aWYoMCE9aC54JiYwIT1oLnkpe2xldCBiPWEoZSx7eDplLngraC54LHk6ZS55fSwhMCksZD1hKGUse3g6ZS54LHk6ZS55K2gueX0sITApOyhifHxkKSYmKGYucHVzaChjLm5vZGUoe3g6ZS54K2gueCx5OmUueStoLnl9LCEwKSksYiYmKGYucHVzaChjLm5vZGUoe3g6ZS54K2gueCx5OmUueX0sITApKSwhYShlLHt4OmUueCx5OmUueS1oLnl9LCEwKSYmZi5wdXNoKGMubm9kZSh7eDplLngraC54LHk6ZS55LWgueX0sITApKSksZCYmKGYucHVzaChjLm5vZGUoe3g6ZS54LHk6ZS55K2gueX0sITApKSwhYShlLHt4OmUueC1oLngseTplLnl9LCEwKSYmZi5wdXNoKGMubm9kZSh7eDplLngtaC54LHk6ZS55K2gueX0sITApKSkpfWVsc2UgYShlLHt4OmUueCtoLngseTplLnkraC55fSwhMCkmJihmLnB1c2goYy5ub2RlKHt4OmUueCtoLngseTplLnkraC55fSwhMCkpLDA9PWgueD8wIT1oLnkmJighYShlLHt4OmUueC0xLHk6ZS55fSwhMCkmJmYucHVzaChjLm5vZGUoe3g6ZS54LTEseTplLnkraC55fSwhMCkpLCFhKGUse3g6ZS54KzEseTplLnl9LCEwKSYmZi5wdXNoKGMubm9kZSh7eDplLngrMSx5OmUueStoLnl9LCEwKSkpOighYShlLHt4OmUueCx5OmUueS0xfSwhMCkmJmYucHVzaChjLm5vZGUoe3g6ZS54K2gueCx5OmUueS0xfSwhMCkpLCFhKGUse3g6ZS54LHk6ZS55KzF9LCEwKSYmZi5wdXNoKGMubm9kZSh7eDplLngraC54LHk6ZS55KzF9LCEwKSkpKX1lbHNlIHJldHVybiBjLm5laWdoYm9ycyhlKTtyZXR1cm4gZi5maWx0ZXIoKGEpPT5hKX1zdGF0aWMganVtcChhLGMsZSxmLGcsaCl7Zm9yKDs7KXtpZighYShoLGcpKXJldHVybiBudWxsO2lmKGcueD09PWYueCYmZy55PT09Zi55KXJldHVybiBnO2xldCBpPXt4OmIoZy54LWgueCkseTpiKGcueS1oLnkpfTtpZigwIT1pLngmJjAhPWkueSl7aWYoIWEoZyx7eDpnLngtaS54LHk6Zy55fSwhMCkmJmEoZyx7eDpnLngtaS54LHk6Zy55K2kueX0sITApfHwhYShnLHt4OmcueCx5OmcueS1pLnl9LCEwKSYmYShnLHt4OmcueCtpLngseTpnLnktaS55fSwhMCkpcmV0dXJuIGc7bGV0IGI9ai5KUFMuanVtcC5iaW5kKHRoaXMsYSxjLGUsZik7aWYobnVsbCE9PWIoYy5ub2RlKHt4OmcueCtpLngseTpnLnl9LCEwKSxnKXx8bnVsbCE9PWIoYy5ub2RlKHt4OmcueCx5OmcueStpLnl9LCEwKSxnKSlyZXR1cm4gZ31lbHNlIGlmKDAhPWkueCl7aWYoIWEoZyx7eDpnLngseTpnLnktMX0sITApJiZhKGcse3g6Zy54K2kueCx5OmcueS0xfSwhMCl8fCFhKGcse3g6Zy54LHk6Zy55KzF9LCEwKSYmYShnLHt4OmcueCtpLngseTpnLnkrMX0sITApKXJldHVybiBnO31lbHNlIGlmKDAhPWkueSYmKCFhKGcse3g6Zy54LTEseTpnLnl9LCEwKSYmYShnLHt4OmcueC0xLHk6Zy55K2kueX0sITApfHwhYShnLHt4OmcueCsxLHk6Zy55fSwhMCkmJmEoZyx7eDpnLngrMSx5OmcueStpLnl9LCEwKSkpcmV0dXJuIGc7aD1nLGc9Yy5ub2RlKHt4OmcueCtpLngseTpnLnkraS55fSwhMCl9cmV0dXJuIG51bGx9fSxqLnByb3RvdHlwZS5qcHM9ZnVuY3Rpb24oYSxjLGQ9e30pe2lmKHRoaXMuZ3JhcGhzW2QubGF5ZXJ8fDBdLlRPUlVTKXJldHVybiBjb25zb2xlLndhcm4oXCJUb3J1cyBtYXAgYXJlbid0IHlldCBzdXBwb3J0ZWQgYnkgSlBTXCIpLGQuY2FsbGJhY2smJmQuY2FsbGJhY2soW10sbmV3IE1hcCksW107bGV0IGU9bmV3IGcoKGEpPT5hLmVzdGltYXRlZCksZj1uZXcgTWFwLGk9dGhpcy5ncmFwaHNbZC5sYXllcnx8MF0saz1udWxsO2E9aS5ub2RlKGEsITApLGM9aS5ub2RlKGMsITApLGUuYWRkKHtub2RlOmEsZXN0aW1hdGVkOjB9KSxmLnNldChhLHtzY29yZTowLGZyb206bnVsbH0pO2xldCBsPWouSlBTLmFjY2Vzcy5iaW5kKHRoaXMsaSksbj1qLkpQUy5uZWlnaGJvcmhvb2QuYmluZCh0aGlzLGwsaSxmKSxvPWouSlBTLmp1bXAuYmluZCh0aGlzLGwsaSxmLGMpO2lmKCFkLnN0YXRpY3x8aS5jb25uZWN0ZWQoYSxjKSlmb3IoO2Uuc2l6ZTspe2xldCBhPWUucG9wKCkubm9kZTtpZihhPT09YylicmVhaztuKGEpLm1hcCgoYik9PntpZihudWxsIT09KGs9byhiLGEpKSl7bGV0IGI9KGYuaGFzKGEpP2YuZ2V0KGEpLnNjb3JlOjApK2kuY29zdChhLGspO2I8KGYuaGFzKGspP2YuZ2V0KGspLnNjb3JlOkluZmluaXR5KSYmKGYuc2V0KGsse3Njb3JlOmIsZnJvbTphLGp1bXBlZDohMH0pLGUuc2V0KHtub2RlOmssZXN0aW1hdGVkOmIraFtkLmhldXJpc3RpY3x8dGhpcy5oZXVyaXN0aWNdKGssYyxkLmhldXJpc3RpY09wdGlvbnN8fHRoaXMuaGV1cmlzdGljT3B0aW9ucyl9KSl9fSksZS5kZWxldGUoYSl9bGV0IHA9W107aWYoZi5oYXMoYykpe2xldCBkPWM7Zm9yKDtkLnghPWEueHx8ZC55IT1hLnk7KWZvcihsZXQgYT1mLmdldChkKS5mcm9tO2QueCE9YS54fHxkLnkhPWEueTspcC5wdXNoKGQpLGQ9aS5ub2RlKHt4OmQueCtiKGEueC1kLngpLHk6ZC55K2IoYS55LWQueSl9LCEwKTtwLnB1c2goZCkscC5yZXZlcnNlKCl9cmV0dXJuIGQuY2FsbGJhY2smJmQuY2FsbGJhY2socCxmKSxwfSxcInVuZGVmaW5lZFwiIT10eXBlb2YgV29ya2VyR2xvYmFsU2NvcGUmJnNlbGYgaW5zdGFuY2VvZiBXb3JrZXJHbG9iYWxTY29wZSl7bGV0IGE7b25tZXNzYWdlPWZ1bmN0aW9uKGIpe2xldCBjPWIuZGF0YTtzd2l0Y2goY1swXSl7Y2FzZVwiY29uc3RydWN0b3JcIjppZihcImNvc3RcImluIGNbMl0pe2xldCBhPS9eXFwoKC4qPylcXClcXHMqPT5cXHMqey8udGVzdChjWzJdLmNvc3QpLGI9L15mdW5jdGlvbiAvLnRlc3QoY1syXS5jb3N0KTtjWzJdLmNvc3Q9ZXZhbChgKCR7YXx8Yj9cIlwiOlwiZnVuY3Rpb24gXCJ9JHtjWzJdLmNvc3R9KWApfWE9bmV3IGooY1sxXSxjWzJdKTticmVhaztjYXNlXCJwYXRoXCI6cG9zdE1lc3NhZ2UoSlNPTi5zdHJpbmdpZnkoW1wicGF0aFwiLGEucGF0aChjWzFdLGNbMl0sY1szXSldKSk7fX19YS5Mb3dsaWdodC5Bc3Rhcj17R3JhcGg6ZSxOb2RlOmYsQmluYXJ5SGVhcDpnLEhldXJpc3RpYzpoLENvbmZpZ3VyYXRpb246aixXb3JrZXJFcnJvcjppfX0pKFwidW5kZWZpbmVkXCI9PXR5cGVvZiB3aW5kb3c/dGhpczp3aW5kb3cpOyIsImZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikge1xuICBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGY7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2Fzc2VydFRoaXNJbml0aWFsaXplZDsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9kZWZpbmVQcm9wZXJ0eTsiLCJ2YXIgc3VwZXJQcm9wQmFzZSA9IHJlcXVpcmUoXCIuL3N1cGVyUHJvcEJhc2VcIik7XG5cbmZ1bmN0aW9uIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHtcbiAgaWYgKHR5cGVvZiBSZWZsZWN0ICE9PSBcInVuZGVmaW5lZFwiICYmIFJlZmxlY3QuZ2V0KSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0ID0gUmVmbGVjdC5nZXQ7XG4gIH0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBfZ2V0ID0gZnVuY3Rpb24gX2dldCh0YXJnZXQsIHByb3BlcnR5LCByZWNlaXZlcikge1xuICAgICAgdmFyIGJhc2UgPSBzdXBlclByb3BCYXNlKHRhcmdldCwgcHJvcGVydHkpO1xuICAgICAgaWYgKCFiYXNlKSByZXR1cm47XG4gICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoYmFzZSwgcHJvcGVydHkpO1xuXG4gICAgICBpZiAoZGVzYy5nZXQpIHtcbiAgICAgICAgcmV0dXJuIGRlc2MuZ2V0LmNhbGwocmVjZWl2ZXIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVzYy52YWx1ZTtcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIgfHwgdGFyZ2V0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfZ2V0OyIsImZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2dldFByb3RvdHlwZU9mID0gT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LmdldFByb3RvdHlwZU9mIDogZnVuY3Rpb24gX2dldFByb3RvdHlwZU9mKG8pIHtcbiAgICByZXR1cm4gby5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKG8pO1xuICB9O1xuICByZXR1cm4gX2dldFByb3RvdHlwZU9mKG8pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9nZXRQcm90b3R5cGVPZjsiLCJ2YXIgc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9zZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbmhlcml0czsiLCJ2YXIgX3R5cGVvZiA9IHJlcXVpcmUoXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIGFzc2VydFRoaXNJbml0aWFsaXplZCA9IHJlcXVpcmUoXCIuL2Fzc2VydFRoaXNJbml0aWFsaXplZFwiKTtcblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkge1xuICBpZiAoY2FsbCAmJiAoX3R5cGVvZihjYWxsKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgIHJldHVybiBjYWxsO1xuICB9XG5cbiAgcmV0dXJuIGFzc2VydFRoaXNJbml0aWFsaXplZChzZWxmKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybjsiLCJmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICBtb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkge1xuICAgIG8uX19wcm90b19fID0gcDtcbiAgICByZXR1cm4gbztcbiAgfTtcblxuICByZXR1cm4gX3NldFByb3RvdHlwZU9mKG8sIHApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zZXRQcm90b3R5cGVPZjsiLCJ2YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi9nZXRQcm90b3R5cGVPZlwiKTtcblxuZnVuY3Rpb24gX3N1cGVyUHJvcEJhc2Uob2JqZWN0LCBwcm9wZXJ0eSkge1xuICB3aGlsZSAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkge1xuICAgIG9iamVjdCA9IGdldFByb3RvdHlwZU9mKG9iamVjdCk7XG4gICAgaWYgKG9iamVjdCA9PT0gbnVsbCkgYnJlYWs7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9zdXBlclByb3BCYXNlOyIsImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCIvLyBBIGxpYnJhcnkgb2Ygc2VlZGFibGUgUk5HcyBpbXBsZW1lbnRlZCBpbiBKYXZhc2NyaXB0LlxuLy9cbi8vIFVzYWdlOlxuLy9cbi8vIHZhciBzZWVkcmFuZG9tID0gcmVxdWlyZSgnc2VlZHJhbmRvbScpO1xuLy8gdmFyIHJhbmRvbSA9IHNlZWRyYW5kb20oMSk7IC8vIG9yIGFueSBzZWVkLlxuLy8gdmFyIHggPSByYW5kb20oKTsgICAgICAgLy8gMCA8PSB4IDwgMS4gIEV2ZXJ5IGJpdCBpcyByYW5kb20uXG4vLyB2YXIgeCA9IHJhbmRvbS5xdWljaygpOyAvLyAwIDw9IHggPCAxLiAgMzIgYml0cyBvZiByYW5kb21uZXNzLlxuXG4vLyBhbGVhLCBhIDUzLWJpdCBtdWx0aXBseS13aXRoLWNhcnJ5IGdlbmVyYXRvciBieSBKb2hhbm5lcyBCYWFnw7hlLlxuLy8gUGVyaW9kOiB+Ml4xMTZcbi8vIFJlcG9ydGVkIHRvIHBhc3MgYWxsIEJpZ0NydXNoIHRlc3RzLlxudmFyIGFsZWEgPSByZXF1aXJlKCcuL2xpYi9hbGVhJyk7XG5cbi8vIHhvcjEyOCwgYSBwdXJlIHhvci1zaGlmdCBnZW5lcmF0b3IgYnkgR2VvcmdlIE1hcnNhZ2xpYS5cbi8vIFBlcmlvZDogMl4xMjgtMS5cbi8vIFJlcG9ydGVkIHRvIGZhaWw6IE1hdHJpeFJhbmsgYW5kIExpbmVhckNvbXAuXG52YXIgeG9yMTI4ID0gcmVxdWlyZSgnLi9saWIveG9yMTI4Jyk7XG5cbi8vIHhvcndvdywgR2VvcmdlIE1hcnNhZ2xpYSdzIDE2MC1iaXQgeG9yLXNoaWZ0IGNvbWJpbmVkIHBsdXMgd2V5bC5cbi8vIFBlcmlvZDogMl4xOTItMl4zMlxuLy8gUmVwb3J0ZWQgdG8gZmFpbDogQ29sbGlzaW9uT3ZlciwgU2ltcFBva2VyLCBhbmQgTGluZWFyQ29tcC5cbnZhciB4b3J3b3cgPSByZXF1aXJlKCcuL2xpYi94b3J3b3cnKTtcblxuLy8geG9yc2hpZnQ3LCBieSBGcmFuw6dvaXMgUGFubmV0b24gYW5kIFBpZXJyZSBMJ2VjdXllciwgdGFrZXNcbi8vIGEgZGlmZmVyZW50IGFwcHJvYWNoOiBpdCBhZGRzIHJvYnVzdG5lc3MgYnkgYWxsb3dpbmcgbW9yZSBzaGlmdHNcbi8vIHRoYW4gTWFyc2FnbGlhJ3Mgb3JpZ2luYWwgdGhyZWUuICBJdCBpcyBhIDctc2hpZnQgZ2VuZXJhdG9yXG4vLyB3aXRoIDI1NiBiaXRzLCB0aGF0IHBhc3NlcyBCaWdDcnVzaCB3aXRoIG5vIHN5c3RtYXRpYyBmYWlsdXJlcy5cbi8vIFBlcmlvZCAyXjI1Ni0xLlxuLy8gTm8gc3lzdGVtYXRpYyBCaWdDcnVzaCBmYWlsdXJlcyByZXBvcnRlZC5cbnZhciB4b3JzaGlmdDcgPSByZXF1aXJlKCcuL2xpYi94b3JzaGlmdDcnKTtcblxuLy8geG9yNDA5NiwgYnkgUmljaGFyZCBCcmVudCwgaXMgYSA0MDk2LWJpdCB4b3Itc2hpZnQgd2l0aCBhXG4vLyB2ZXJ5IGxvbmcgcGVyaW9kIHRoYXQgYWxzbyBhZGRzIGEgV2V5bCBnZW5lcmF0b3IuIEl0IGFsc28gcGFzc2VzXG4vLyBCaWdDcnVzaCB3aXRoIG5vIHN5c3RlbWF0aWMgZmFpbHVyZXMuICBJdHMgbG9uZyBwZXJpb2QgbWF5XG4vLyBiZSB1c2VmdWwgaWYgeW91IGhhdmUgbWFueSBnZW5lcmF0b3JzIGFuZCBuZWVkIHRvIGF2b2lkXG4vLyBjb2xsaXNpb25zLlxuLy8gUGVyaW9kOiAyXjQxMjgtMl4zMi5cbi8vIE5vIHN5c3RlbWF0aWMgQmlnQ3J1c2ggZmFpbHVyZXMgcmVwb3J0ZWQuXG52YXIgeG9yNDA5NiA9IHJlcXVpcmUoJy4vbGliL3hvcjQwOTYnKTtcblxuLy8gVHljaGUtaSwgYnkgU2FtdWVsIE5ldmVzIGFuZCBGaWxpcGUgQXJhdWpvLCBpcyBhIGJpdC1zaGlmdGluZyByYW5kb21cbi8vIG51bWJlciBnZW5lcmF0b3IgZGVyaXZlZCBmcm9tIENoYUNoYSwgYSBtb2Rlcm4gc3RyZWFtIGNpcGhlci5cbi8vIGh0dHBzOi8vZWRlbi5kZWkudWMucHQvfnNuZXZlcy9wdWJzLzIwMTEtc25mYTIucGRmXG4vLyBQZXJpb2Q6IH4yXjEyN1xuLy8gTm8gc3lzdGVtYXRpYyBCaWdDcnVzaCBmYWlsdXJlcyByZXBvcnRlZC5cbnZhciB0eWNoZWkgPSByZXF1aXJlKCcuL2xpYi90eWNoZWknKTtcblxuLy8gVGhlIG9yaWdpbmFsIEFSQzQtYmFzZWQgcHJuZyBpbmNsdWRlZCBpbiB0aGlzIGxpYnJhcnkuXG4vLyBQZXJpb2Q6IH4yXjE2MDBcbnZhciBzciA9IHJlcXVpcmUoJy4vc2VlZHJhbmRvbScpO1xuXG5zci5hbGVhID0gYWxlYTtcbnNyLnhvcjEyOCA9IHhvcjEyODtcbnNyLnhvcndvdyA9IHhvcndvdztcbnNyLnhvcnNoaWZ0NyA9IHhvcnNoaWZ0NztcbnNyLnhvcjQwOTYgPSB4b3I0MDk2O1xuc3IudHljaGVpID0gdHljaGVpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNyO1xuIiwiLy8gQSBwb3J0IG9mIGFuIGFsZ29yaXRobSBieSBKb2hhbm5lcyBCYWFnw7hlIDxiYWFnb2VAYmFhZ29lLmNvbT4sIDIwMTBcbi8vIGh0dHA6Ly9iYWFnb2UuY29tL2VuL1JhbmRvbU11c2luZ3MvamF2YXNjcmlwdC9cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9ucXVpbmxhbi9iZXR0ZXItcmFuZG9tLW51bWJlcnMtZm9yLWphdmFzY3JpcHQtbWlycm9yXG4vLyBPcmlnaW5hbCB3b3JrIGlzIHVuZGVyIE1JVCBsaWNlbnNlIC1cblxuLy8gQ29weXJpZ2h0IChDKSAyMDEwIGJ5IEpvaGFubmVzIEJhYWfDuGUgPGJhYWdvZUBiYWFnb2Uub3JnPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuLy8gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4vLyBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbi8vIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbi8vIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4vLyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOXG4vLyBUSEUgU09GVFdBUkUuXG5cblxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBBbGVhKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcywgbWFzaCA9IE1hc2goKTtcblxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHQgPSAyMDkxNjM5ICogbWUuczAgKyBtZS5jICogMi4zMjgzMDY0MzY1Mzg2OTYzZS0xMDsgLy8gMl4tMzJcbiAgICBtZS5zMCA9IG1lLnMxO1xuICAgIG1lLnMxID0gbWUuczI7XG4gICAgcmV0dXJuIG1lLnMyID0gdCAtIChtZS5jID0gdCB8IDApO1xuICB9O1xuXG4gIC8vIEFwcGx5IHRoZSBzZWVkaW5nIGFsZ29yaXRobSBmcm9tIEJhYWdvZS5cbiAgbWUuYyA9IDE7XG4gIG1lLnMwID0gbWFzaCgnICcpO1xuICBtZS5zMSA9IG1hc2goJyAnKTtcbiAgbWUuczIgPSBtYXNoKCcgJyk7XG4gIG1lLnMwIC09IG1hc2goc2VlZCk7XG4gIGlmIChtZS5zMCA8IDApIHsgbWUuczAgKz0gMTsgfVxuICBtZS5zMSAtPSBtYXNoKHNlZWQpO1xuICBpZiAobWUuczEgPCAwKSB7IG1lLnMxICs9IDE7IH1cbiAgbWUuczIgLT0gbWFzaChzZWVkKTtcbiAgaWYgKG1lLnMyIDwgMCkgeyBtZS5zMiArPSAxOyB9XG4gIG1hc2ggPSBudWxsO1xufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC5jID0gZi5jO1xuICB0LnMwID0gZi5zMDtcbiAgdC5zMSA9IGYuczE7XG4gIHQuczIgPSBmLnMyO1xuICByZXR1cm4gdDtcbn1cblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBBbGVhKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0geGcubmV4dDtcbiAgcHJuZy5pbnQzMiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSAqIDB4MTAwMDAwMDAwKSB8IDA7IH1cbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcHJuZygpICsgKHBybmcoKSAqIDB4MjAwMDAwIHwgMCkgKiAxLjExMDIyMzAyNDYyNTE1NjVlLTE2OyAvLyAyXi01M1xuICB9O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuZnVuY3Rpb24gTWFzaCgpIHtcbiAgdmFyIG4gPSAweGVmYzgyNDlkO1xuXG4gIHZhciBtYXNoID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGRhdGEgPSBTdHJpbmcoZGF0YSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICBuICs9IGRhdGEuY2hhckNvZGVBdChpKTtcbiAgICAgIHZhciBoID0gMC4wMjUxOTYwMzI4MjQxNjkzOCAqIG47XG4gICAgICBuID0gaCA+Pj4gMDtcbiAgICAgIGggLT0gbjtcbiAgICAgIGggKj0gbjtcbiAgICAgIG4gPSBoID4+PiAwO1xuICAgICAgaCAtPSBuO1xuICAgICAgbiArPSBoICogMHgxMDAwMDAwMDA7IC8vIDJeMzJcbiAgICB9XG4gICAgcmV0dXJuIChuID4+PiAwKSAqIDIuMzI4MzA2NDM2NTM4Njk2M2UtMTA7IC8vIDJeLTMyXG4gIH07XG5cbiAgcmV0dXJuIG1hc2g7XG59XG5cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy5hbGVhID0gaW1wbDtcbn1cblxufSkoXG4gIHRoaXMsXG4gICh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUsICAgIC8vIHByZXNlbnQgaW4gbm9kZS5qc1xuICAodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUgICAvLyBwcmVzZW50IHdpdGggYW4gQU1EIGxvYWRlclxuKTtcblxuXG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiB0aGUgXCJUeWNoZS1pXCIgcHJuZyBhbGdvcml0aG0gYnlcbi8vIFNhbXVlbCBOZXZlcyBhbmQgRmlsaXBlIEFyYXVqby5cbi8vIFNlZSBodHRwczovL2VkZW4uZGVpLnVjLnB0L35zbmV2ZXMvcHVicy8yMDExLXNuZmEyLnBkZlxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzLCBzdHJzZWVkID0gJyc7XG5cbiAgLy8gU2V0IHVwIGdlbmVyYXRvciBmdW5jdGlvbi5cbiAgbWUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBiID0gbWUuYiwgYyA9IG1lLmMsIGQgPSBtZS5kLCBhID0gbWUuYTtcbiAgICBiID0gKGIgPDwgMjUpIF4gKGIgPj4+IDcpIF4gYztcbiAgICBjID0gKGMgLSBkKSB8IDA7XG4gICAgZCA9IChkIDw8IDI0KSBeIChkID4+PiA4KSBeIGE7XG4gICAgYSA9IChhIC0gYikgfCAwO1xuICAgIG1lLmIgPSBiID0gKGIgPDwgMjApIF4gKGIgPj4+IDEyKSBeIGM7XG4gICAgbWUuYyA9IGMgPSAoYyAtIGQpIHwgMDtcbiAgICBtZS5kID0gKGQgPDwgMTYpIF4gKGMgPj4+IDE2KSBeIGE7XG4gICAgcmV0dXJuIG1lLmEgPSAoYSAtIGIpIHwgMDtcbiAgfTtcblxuICAvKiBUaGUgZm9sbG93aW5nIGlzIG5vbi1pbnZlcnRlZCB0eWNoZSwgd2hpY2ggaGFzIGJldHRlciBpbnRlcm5hbFxuICAgKiBiaXQgZGlmZnVzaW9uLCBidXQgd2hpY2ggaXMgYWJvdXQgMjUlIHNsb3dlciB0aGFuIHR5Y2hlLWkgaW4gSlMuXG4gIG1lLm5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYSA9IG1lLmEsIGIgPSBtZS5iLCBjID0gbWUuYywgZCA9IG1lLmQ7XG4gICAgYSA9IChtZS5hICsgbWUuYiB8IDApID4+PiAwO1xuICAgIGQgPSBtZS5kIF4gYTsgZCA9IGQgPDwgMTYgXiBkID4+PiAxNjtcbiAgICBjID0gbWUuYyArIGQgfCAwO1xuICAgIGIgPSBtZS5iIF4gYzsgYiA9IGIgPDwgMTIgXiBkID4+PiAyMDtcbiAgICBtZS5hID0gYSA9IGEgKyBiIHwgMDtcbiAgICBkID0gZCBeIGE7IG1lLmQgPSBkID0gZCA8PCA4IF4gZCA+Pj4gMjQ7XG4gICAgbWUuYyA9IGMgPSBjICsgZCB8IDA7XG4gICAgYiA9IGIgXiBjO1xuICAgIHJldHVybiBtZS5iID0gKGIgPDwgNyBeIGIgPj4+IDI1KTtcbiAgfVxuICAqL1xuXG4gIG1lLmEgPSAwO1xuICBtZS5iID0gMDtcbiAgbWUuYyA9IDI2NTQ0MzU3NjkgfCAwO1xuICBtZS5kID0gMTM2NzEzMDU1MTtcblxuICBpZiAoc2VlZCA9PT0gTWF0aC5mbG9vcihzZWVkKSkge1xuICAgIC8vIEludGVnZXIgc2VlZC5cbiAgICBtZS5hID0gKHNlZWQgLyAweDEwMDAwMDAwMCkgfCAwO1xuICAgIG1lLmIgPSBzZWVkIHwgMDtcbiAgfSBlbHNlIHtcbiAgICAvLyBTdHJpbmcgc2VlZC5cbiAgICBzdHJzZWVkICs9IHNlZWQ7XG4gIH1cblxuICAvLyBNaXggaW4gc3RyaW5nIHNlZWQsIHRoZW4gZGlzY2FyZCBhbiBpbml0aWFsIGJhdGNoIG9mIDY0IHZhbHVlcy5cbiAgZm9yICh2YXIgayA9IDA7IGsgPCBzdHJzZWVkLmxlbmd0aCArIDIwOyBrKyspIHtcbiAgICBtZS5iIF49IHN0cnNlZWQuY2hhckNvZGVBdChrKSB8IDA7XG4gICAgbWUubmV4dCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmEgPSBmLmE7XG4gIHQuYiA9IGYuYjtcbiAgdC5jID0gZi5jO1xuICB0LmQgPSBmLmQ7XG4gIHJldHVybiB0O1xufTtcblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHR5cGVvZihzdGF0ZSkgPT0gJ29iamVjdCcpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy50eWNoZWkgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG5cbiIsIi8vIEEgSmF2YXNjcmlwdCBpbXBsZW1lbnRhaW9uIG9mIHRoZSBcInhvcjEyOFwiIHBybmcgYWxnb3JpdGhtIGJ5XG4vLyBHZW9yZ2UgTWFyc2FnbGlhLiAgU2VlIGh0dHA6Ly93d3cuanN0YXRzb2Z0Lm9yZy92MDgvaTE0L3BhcGVyXG5cbihmdW5jdGlvbihnbG9iYWwsIG1vZHVsZSwgZGVmaW5lKSB7XG5cbmZ1bmN0aW9uIFhvckdlbihzZWVkKSB7XG4gIHZhciBtZSA9IHRoaXMsIHN0cnNlZWQgPSAnJztcblxuICBtZS54ID0gMDtcbiAgbWUueSA9IDA7XG4gIG1lLnogPSAwO1xuICBtZS53ID0gMDtcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHQgPSBtZS54IF4gKG1lLnggPDwgMTEpO1xuICAgIG1lLnggPSBtZS55O1xuICAgIG1lLnkgPSBtZS56O1xuICAgIG1lLnogPSBtZS53O1xuICAgIHJldHVybiBtZS53IF49IChtZS53ID4+PiAxOSkgXiB0IF4gKHQgPj4+IDgpO1xuICB9O1xuXG4gIGlmIChzZWVkID09PSAoc2VlZCB8IDApKSB7XG4gICAgLy8gSW50ZWdlciBzZWVkLlxuICAgIG1lLnggPSBzZWVkO1xuICB9IGVsc2Uge1xuICAgIC8vIFN0cmluZyBzZWVkLlxuICAgIHN0cnNlZWQgKz0gc2VlZDtcbiAgfVxuXG4gIC8vIE1peCBpbiBzdHJpbmcgc2VlZCwgdGhlbiBkaXNjYXJkIGFuIGluaXRpYWwgYmF0Y2ggb2YgNjQgdmFsdWVzLlxuICBmb3IgKHZhciBrID0gMDsgayA8IHN0cnNlZWQubGVuZ3RoICsgNjQ7IGsrKykge1xuICAgIG1lLnggXj0gc3Ryc2VlZC5jaGFyQ29kZUF0KGspIHwgMDtcbiAgICBtZS5uZXh0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY29weShmLCB0KSB7XG4gIHQueCA9IGYueDtcbiAgdC55ID0gZi55O1xuICB0LnogPSBmLno7XG4gIHQudyA9IGYudztcbiAgcmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGltcGwoc2VlZCwgb3B0cykge1xuICB2YXIgeGcgPSBuZXcgWG9yR2VuKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwOyB9O1xuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvIHtcbiAgICAgIHZhciB0b3AgPSB4Zy5uZXh0KCkgPj4+IDExLFxuICAgICAgICAgIGJvdCA9ICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDAsXG4gICAgICAgICAgcmVzdWx0ID0gKHRvcCArIGJvdCkgLyAoMSA8PCAyMSk7XG4gICAgfSB3aGlsZSAocmVzdWx0ID09PSAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBwcm5nLmludDMyID0geGcubmV4dDtcbiAgcHJuZy5xdWljayA9IHBybmc7XG4gIGlmIChzdGF0ZSkge1xuICAgIGlmICh0eXBlb2Yoc3RhdGUpID09ICdvYmplY3QnKSBjb3B5KHN0YXRlLCB4Zyk7XG4gICAgcHJuZy5zdGF0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29weSh4Zywge30pOyB9XG4gIH1cbiAgcmV0dXJuIHBybmc7XG59XG5cbmlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBpbXBsO1xufSBlbHNlIGlmIChkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBpbXBsOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMueG9yMTI4ID0gaW1wbDtcbn1cblxufSkoXG4gIHRoaXMsXG4gICh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUsICAgIC8vIHByZXNlbnQgaW4gbm9kZS5qc1xuICAodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUgICAvLyBwcmVzZW50IHdpdGggYW4gQU1EIGxvYWRlclxuKTtcblxuXG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiBSaWNoYXJkIEJyZW50J3MgWG9yZ2VucyB4b3I0MDk2IGFsZ29yaXRobS5cbi8vXG4vLyBUaGlzIGZhc3Qgbm9uLWNyeXB0b2dyYXBoaWMgcmFuZG9tIG51bWJlciBnZW5lcmF0b3IgaXMgZGVzaWduZWQgZm9yXG4vLyB1c2UgaW4gTW9udGUtQ2FybG8gYWxnb3JpdGhtcy4gSXQgY29tYmluZXMgYSBsb25nLXBlcmlvZCB4b3JzaGlmdFxuLy8gZ2VuZXJhdG9yIHdpdGggYSBXZXlsIGdlbmVyYXRvciwgYW5kIGl0IHBhc3NlcyBhbGwgY29tbW9uIGJhdHRlcmllc1xuLy8gb2Ygc3Rhc3RpY2lhbCB0ZXN0cyBmb3IgcmFuZG9tbmVzcyB3aGlsZSBjb25zdW1pbmcgb25seSBhIGZldyBuYW5vc2Vjb25kc1xuLy8gZm9yIGVhY2ggcHJuZyBnZW5lcmF0ZWQuICBGb3IgYmFja2dyb3VuZCBvbiB0aGUgZ2VuZXJhdG9yLCBzZWUgQnJlbnQnc1xuLy8gcGFwZXI6IFwiU29tZSBsb25nLXBlcmlvZCByYW5kb20gbnVtYmVyIGdlbmVyYXRvcnMgdXNpbmcgc2hpZnRzIGFuZCB4b3JzLlwiXG4vLyBodHRwOi8vYXJ4aXYub3JnL3BkZi8xMDA0LjMxMTV2MS5wZGZcbi8vXG4vLyBVc2FnZTpcbi8vXG4vLyB2YXIgeG9yNDA5NiA9IHJlcXVpcmUoJ3hvcjQwOTYnKTtcbi8vIHJhbmRvbSA9IHhvcjQwOTYoMSk7ICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VlZCB3aXRoIGludDMyIG9yIHN0cmluZy5cbi8vIGFzc2VydC5lcXVhbChyYW5kb20oKSwgMC4xNTIwNDM2NDUwNTM4NTQ3KTsgLy8gKDAsIDEpIHJhbmdlLCA1MyBiaXRzLlxuLy8gYXNzZXJ0LmVxdWFsKHJhbmRvbS5pbnQzMigpLCAxODA2NTM0ODk3KTsgICAvLyBzaWduZWQgaW50MzIsIDMyIGJpdHMuXG4vL1xuLy8gRm9yIG5vbnplcm8gbnVtZXJpYyBrZXlzLCB0aGlzIGltcGVsZW1lbnRhdGlvbiBwcm92aWRlcyBhIHNlcXVlbmNlXG4vLyBpZGVudGljYWwgdG8gdGhhdCBieSBCcmVudCdzIHhvcmdlbnMgMyBpbXBsZW1lbnRhaW9uIGluIEMuICBUaGlzXG4vLyBpbXBsZW1lbnRhdGlvbiBhbHNvIHByb3ZpZGVzIGZvciBpbml0YWxpemluZyB0aGUgZ2VuZXJhdG9yIHdpdGhcbi8vIHN0cmluZyBzZWVkcywgb3IgZm9yIHNhdmluZyBhbmQgcmVzdG9yaW5nIHRoZSBzdGF0ZSBvZiB0aGUgZ2VuZXJhdG9yLlxuLy9cbi8vIE9uIENocm9tZSwgdGhpcyBwcm5nIGJlbmNobWFya3MgYWJvdXQgMi4xIHRpbWVzIHNsb3dlciB0aGFuXG4vLyBKYXZhc2NyaXB0J3MgYnVpbHQtaW4gTWF0aC5yYW5kb20oKS5cblxuKGZ1bmN0aW9uKGdsb2JhbCwgbW9kdWxlLCBkZWZpbmUpIHtcblxuZnVuY3Rpb24gWG9yR2VuKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHcgPSBtZS53LFxuICAgICAgICBYID0gbWUuWCwgaSA9IG1lLmksIHQsIHY7XG4gICAgLy8gVXBkYXRlIFdleWwgZ2VuZXJhdG9yLlxuICAgIG1lLncgPSB3ID0gKHcgKyAweDYxYzg4NjQ3KSB8IDA7XG4gICAgLy8gVXBkYXRlIHhvciBnZW5lcmF0b3IuXG4gICAgdiA9IFhbKGkgKyAzNCkgJiAxMjddO1xuICAgIHQgPSBYW2kgPSAoKGkgKyAxKSAmIDEyNyldO1xuICAgIHYgXj0gdiA8PCAxMztcbiAgICB0IF49IHQgPDwgMTc7XG4gICAgdiBePSB2ID4+PiAxNTtcbiAgICB0IF49IHQgPj4+IDEyO1xuICAgIC8vIFVwZGF0ZSBYb3IgZ2VuZXJhdG9yIGFycmF5IHN0YXRlLlxuICAgIHYgPSBYW2ldID0gdiBeIHQ7XG4gICAgbWUuaSA9IGk7XG4gICAgLy8gUmVzdWx0IGlzIHRoZSBjb21iaW5hdGlvbi5cbiAgICByZXR1cm4gKHYgKyAodyBeICh3ID4+PiAxNikpKSB8IDA7XG4gIH07XG5cbiAgZnVuY3Rpb24gaW5pdChtZSwgc2VlZCkge1xuICAgIHZhciB0LCB2LCBpLCBqLCB3LCBYID0gW10sIGxpbWl0ID0gMTI4O1xuICAgIGlmIChzZWVkID09PSAoc2VlZCB8IDApKSB7XG4gICAgICAvLyBOdW1lcmljIHNlZWRzIGluaXRpYWxpemUgdiwgd2hpY2ggaXMgdXNlZCB0byBnZW5lcmF0ZXMgWC5cbiAgICAgIHYgPSBzZWVkO1xuICAgICAgc2VlZCA9IG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN0cmluZyBzZWVkcyBhcmUgbWl4ZWQgaW50byB2IGFuZCBYIG9uZSBjaGFyYWN0ZXIgYXQgYSB0aW1lLlxuICAgICAgc2VlZCA9IHNlZWQgKyAnXFwwJztcbiAgICAgIHYgPSAwO1xuICAgICAgbGltaXQgPSBNYXRoLm1heChsaW1pdCwgc2VlZC5sZW5ndGgpO1xuICAgIH1cbiAgICAvLyBJbml0aWFsaXplIGNpcmN1bGFyIGFycmF5IGFuZCB3ZXlsIHZhbHVlLlxuICAgIGZvciAoaSA9IDAsIGogPSAtMzI7IGogPCBsaW1pdDsgKytqKSB7XG4gICAgICAvLyBQdXQgdGhlIHVuaWNvZGUgY2hhcmFjdGVycyBpbnRvIHRoZSBhcnJheSwgYW5kIHNodWZmbGUgdGhlbS5cbiAgICAgIGlmIChzZWVkKSB2IF49IHNlZWQuY2hhckNvZGVBdCgoaiArIDMyKSAlIHNlZWQubGVuZ3RoKTtcbiAgICAgIC8vIEFmdGVyIDMyIHNodWZmbGVzLCB0YWtlIHYgYXMgdGhlIHN0YXJ0aW5nIHcgdmFsdWUuXG4gICAgICBpZiAoaiA9PT0gMCkgdyA9IHY7XG4gICAgICB2IF49IHYgPDwgMTA7XG4gICAgICB2IF49IHYgPj4+IDE1O1xuICAgICAgdiBePSB2IDw8IDQ7XG4gICAgICB2IF49IHYgPj4+IDEzO1xuICAgICAgaWYgKGogPj0gMCkge1xuICAgICAgICB3ID0gKHcgKyAweDYxYzg4NjQ3KSB8IDA7ICAgICAvLyBXZXlsLlxuICAgICAgICB0ID0gKFhbaiAmIDEyN10gXj0gKHYgKyB3KSk7ICAvLyBDb21iaW5lIHhvciBhbmQgd2V5bCB0byBpbml0IGFycmF5LlxuICAgICAgICBpID0gKDAgPT0gdCkgPyBpICsgMSA6IDA7ICAgICAvLyBDb3VudCB6ZXJvZXMuXG4gICAgICB9XG4gICAgfVxuICAgIC8vIFdlIGhhdmUgZGV0ZWN0ZWQgYWxsIHplcm9lczsgbWFrZSB0aGUga2V5IG5vbnplcm8uXG4gICAgaWYgKGkgPj0gMTI4KSB7XG4gICAgICBYWyhzZWVkICYmIHNlZWQubGVuZ3RoIHx8IDApICYgMTI3XSA9IC0xO1xuICAgIH1cbiAgICAvLyBSdW4gdGhlIGdlbmVyYXRvciA1MTIgdGltZXMgdG8gZnVydGhlciBtaXggdGhlIHN0YXRlIGJlZm9yZSB1c2luZyBpdC5cbiAgICAvLyBGYWN0b3JpbmcgdGhpcyBhcyBhIGZ1bmN0aW9uIHNsb3dzIHRoZSBtYWluIGdlbmVyYXRvciwgc28gaXQgaXMganVzdFxuICAgIC8vIHVucm9sbGVkIGhlcmUuICBUaGUgd2V5bCBnZW5lcmF0b3IgaXMgbm90IGFkdmFuY2VkIHdoaWxlIHdhcm1pbmcgdXAuXG4gICAgaSA9IDEyNztcbiAgICBmb3IgKGogPSA0ICogMTI4OyBqID4gMDsgLS1qKSB7XG4gICAgICB2ID0gWFsoaSArIDM0KSAmIDEyN107XG4gICAgICB0ID0gWFtpID0gKChpICsgMSkgJiAxMjcpXTtcbiAgICAgIHYgXj0gdiA8PCAxMztcbiAgICAgIHQgXj0gdCA8PCAxNztcbiAgICAgIHYgXj0gdiA+Pj4gMTU7XG4gICAgICB0IF49IHQgPj4+IDEyO1xuICAgICAgWFtpXSA9IHYgXiB0O1xuICAgIH1cbiAgICAvLyBTdG9yaW5nIHN0YXRlIGFzIG9iamVjdCBtZW1iZXJzIGlzIGZhc3RlciB0aGFuIHVzaW5nIGNsb3N1cmUgdmFyaWFibGVzLlxuICAgIG1lLncgPSB3O1xuICAgIG1lLlggPSBYO1xuICAgIG1lLmkgPSBpO1xuICB9XG5cbiAgaW5pdChtZSwgc2VlZCk7XG59XG5cbmZ1bmN0aW9uIGNvcHkoZiwgdCkge1xuICB0LmkgPSBmLmk7XG4gIHQudyA9IGYudztcbiAgdC5YID0gZi5YLnNsaWNlKCk7XG4gIHJldHVybiB0O1xufTtcblxuZnVuY3Rpb24gaW1wbChzZWVkLCBvcHRzKSB7XG4gIGlmIChzZWVkID09IG51bGwpIHNlZWQgPSArKG5ldyBEYXRlKTtcbiAgdmFyIHhnID0gbmV3IFhvckdlbihzZWVkKSxcbiAgICAgIHN0YXRlID0gb3B0cyAmJiBvcHRzLnN0YXRlLFxuICAgICAgcHJuZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMDsgfTtcbiAgcHJuZy5kb3VibGUgPSBmdW5jdGlvbigpIHtcbiAgICBkbyB7XG4gICAgICB2YXIgdG9wID0geGcubmV4dCgpID4+PiAxMSxcbiAgICAgICAgICBib3QgPSAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwLFxuICAgICAgICAgIHJlc3VsdCA9ICh0b3AgKyBib3QpIC8gKDEgPDwgMjEpO1xuICAgIH0gd2hpbGUgKHJlc3VsdCA9PT0gMCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgcHJuZy5pbnQzMiA9IHhnLm5leHQ7XG4gIHBybmcucXVpY2sgPSBwcm5nO1xuICBpZiAoc3RhdGUpIHtcbiAgICBpZiAoc3RhdGUuWCkgY29weShzdGF0ZSwgeGcpO1xuICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoeGcsIHt9KTsgfVxuICB9XG4gIHJldHVybiBwcm5nO1xufVxuXG5pZiAobW9kdWxlICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gaW1wbDtcbn0gZWxzZSBpZiAoZGVmaW5lICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gaW1wbDsgfSk7XG59IGVsc2Uge1xuICB0aGlzLnhvcjQwOTYgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcywgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2luZG93IG9iamVjdCBvciBnbG9iYWxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuIiwiLy8gQSBKYXZhc2NyaXB0IGltcGxlbWVudGFpb24gb2YgdGhlIFwieG9yc2hpZnQ3XCIgYWxnb3JpdGhtIGJ5XG4vLyBGcmFuw6dvaXMgUGFubmV0b24gYW5kIFBpZXJyZSBMJ2VjdXllcjpcbi8vIFwiT24gdGhlIFhvcmdzaGlmdCBSYW5kb20gTnVtYmVyIEdlbmVyYXRvcnNcIlxuLy8gaHR0cDovL3NhbHVjLmVuZ3IudWNvbm4uZWR1L3JlZnMvY3J5cHRvL3JuZy9wYW5uZXRvbjA1b250aGV4b3JzaGlmdC5wZGZcblxuKGZ1bmN0aW9uKGdsb2JhbCwgbW9kdWxlLCBkZWZpbmUpIHtcblxuZnVuY3Rpb24gWG9yR2VuKHNlZWQpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICAvLyBTZXQgdXAgZ2VuZXJhdG9yIGZ1bmN0aW9uLlxuICBtZS5uZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gVXBkYXRlIHhvciBnZW5lcmF0b3IuXG4gICAgdmFyIFggPSBtZS54LCBpID0gbWUuaSwgdCwgdiwgdztcbiAgICB0ID0gWFtpXTsgdCBePSAodCA+Pj4gNyk7IHYgPSB0IF4gKHQgPDwgMjQpO1xuICAgIHQgPSBYWyhpICsgMSkgJiA3XTsgdiBePSB0IF4gKHQgPj4+IDEwKTtcbiAgICB0ID0gWFsoaSArIDMpICYgN107IHYgXj0gdCBeICh0ID4+PiAzKTtcbiAgICB0ID0gWFsoaSArIDQpICYgN107IHYgXj0gdCBeICh0IDw8IDcpO1xuICAgIHQgPSBYWyhpICsgNykgJiA3XTsgdCA9IHQgXiAodCA8PCAxMyk7IHYgXj0gdCBeICh0IDw8IDkpO1xuICAgIFhbaV0gPSB2O1xuICAgIG1lLmkgPSAoaSArIDEpICYgNztcbiAgICByZXR1cm4gdjtcbiAgfTtcblxuICBmdW5jdGlvbiBpbml0KG1lLCBzZWVkKSB7XG4gICAgdmFyIGosIHcsIFggPSBbXTtcblxuICAgIGlmIChzZWVkID09PSAoc2VlZCB8IDApKSB7XG4gICAgICAvLyBTZWVkIHN0YXRlIGFycmF5IHVzaW5nIGEgMzItYml0IGludGVnZXIuXG4gICAgICB3ID0gWFswXSA9IHNlZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNlZWQgc3RhdGUgdXNpbmcgYSBzdHJpbmcuXG4gICAgICBzZWVkID0gJycgKyBzZWVkO1xuICAgICAgZm9yIChqID0gMDsgaiA8IHNlZWQubGVuZ3RoOyArK2opIHtcbiAgICAgICAgWFtqICYgN10gPSAoWFtqICYgN10gPDwgMTUpIF5cbiAgICAgICAgICAgIChzZWVkLmNoYXJDb2RlQXQoaikgKyBYWyhqICsgMSkgJiA3XSA8PCAxMyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEVuZm9yY2UgYW4gYXJyYXkgbGVuZ3RoIG9mIDgsIG5vdCBhbGwgemVyb2VzLlxuICAgIHdoaWxlIChYLmxlbmd0aCA8IDgpIFgucHVzaCgwKTtcbiAgICBmb3IgKGogPSAwOyBqIDwgOCAmJiBYW2pdID09PSAwOyArK2opO1xuICAgIGlmIChqID09IDgpIHcgPSBYWzddID0gLTE7IGVsc2UgdyA9IFhbal07XG5cbiAgICBtZS54ID0gWDtcbiAgICBtZS5pID0gMDtcblxuICAgIC8vIERpc2NhcmQgYW4gaW5pdGlhbCAyNTYgdmFsdWVzLlxuICAgIGZvciAoaiA9IDI1NjsgaiA+IDA7IC0taikge1xuICAgICAgbWUubmV4dCgpO1xuICAgIH1cbiAgfVxuXG4gIGluaXQobWUsIHNlZWQpO1xufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC54ID0gZi54LnNsaWNlKCk7XG4gIHQuaSA9IGYuaTtcbiAgcmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGltcGwoc2VlZCwgb3B0cykge1xuICBpZiAoc2VlZCA9PSBudWxsKSBzZWVkID0gKyhuZXcgRGF0ZSk7XG4gIHZhciB4ZyA9IG5ldyBYb3JHZW4oc2VlZCksXG4gICAgICBzdGF0ZSA9IG9wdHMgJiYgb3B0cy5zdGF0ZSxcbiAgICAgIHBybmcgPSBmdW5jdGlvbigpIHsgcmV0dXJuICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDA7IH07XG4gIHBybmcuZG91YmxlID0gZnVuY3Rpb24oKSB7XG4gICAgZG8ge1xuICAgICAgdmFyIHRvcCA9IHhnLm5leHQoKSA+Pj4gMTEsXG4gICAgICAgICAgYm90ID0gKHhnLm5leHQoKSA+Pj4gMCkgLyAweDEwMDAwMDAwMCxcbiAgICAgICAgICByZXN1bHQgPSAodG9wICsgYm90KSAvICgxIDw8IDIxKTtcbiAgICB9IHdoaWxlIChyZXN1bHQgPT09IDApO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHBybmcuaW50MzIgPSB4Zy5uZXh0O1xuICBwcm5nLnF1aWNrID0gcHJuZztcbiAgaWYgKHN0YXRlKSB7XG4gICAgaWYgKHN0YXRlLngpIGNvcHkoc3RhdGUsIHhnKTtcbiAgICBwcm5nLnN0YXRlID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb3B5KHhnLCB7fSk7IH1cbiAgfVxuICByZXR1cm4gcHJuZztcbn1cblxuaWYgKG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGltcGw7XG59IGVsc2UgaWYgKGRlZmluZSAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIGltcGw7IH0pO1xufSBlbHNlIHtcbiAgdGhpcy54b3JzaGlmdDcgPSBpbXBsO1xufVxuXG59KShcbiAgdGhpcyxcbiAgKHR5cGVvZiBtb2R1bGUpID09ICdvYmplY3QnICYmIG1vZHVsZSwgICAgLy8gcHJlc2VudCBpbiBub2RlLmpzXG4gICh0eXBlb2YgZGVmaW5lKSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZSAgIC8vIHByZXNlbnQgd2l0aCBhbiBBTUQgbG9hZGVyXG4pO1xuXG4iLCIvLyBBIEphdmFzY3JpcHQgaW1wbGVtZW50YWlvbiBvZiB0aGUgXCJ4b3J3b3dcIiBwcm5nIGFsZ29yaXRobSBieVxuLy8gR2VvcmdlIE1hcnNhZ2xpYS4gIFNlZSBodHRwOi8vd3d3LmpzdGF0c29mdC5vcmcvdjA4L2kxNC9wYXBlclxuXG4oZnVuY3Rpb24oZ2xvYmFsLCBtb2R1bGUsIGRlZmluZSkge1xuXG5mdW5jdGlvbiBYb3JHZW4oc2VlZCkge1xuICB2YXIgbWUgPSB0aGlzLCBzdHJzZWVkID0gJyc7XG5cbiAgLy8gU2V0IHVwIGdlbmVyYXRvciBmdW5jdGlvbi5cbiAgbWUubmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0ID0gKG1lLnggXiAobWUueCA+Pj4gMikpO1xuICAgIG1lLnggPSBtZS55OyBtZS55ID0gbWUuejsgbWUueiA9IG1lLnc7IG1lLncgPSBtZS52O1xuICAgIHJldHVybiAobWUuZCA9IChtZS5kICsgMzYyNDM3IHwgMCkpICtcbiAgICAgICAobWUudiA9IChtZS52IF4gKG1lLnYgPDwgNCkpIF4gKHQgXiAodCA8PCAxKSkpIHwgMDtcbiAgfTtcblxuICBtZS54ID0gMDtcbiAgbWUueSA9IDA7XG4gIG1lLnogPSAwO1xuICBtZS53ID0gMDtcbiAgbWUudiA9IDA7XG5cbiAgaWYgKHNlZWQgPT09IChzZWVkIHwgMCkpIHtcbiAgICAvLyBJbnRlZ2VyIHNlZWQuXG4gICAgbWUueCA9IHNlZWQ7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RyaW5nIHNlZWQuXG4gICAgc3Ryc2VlZCArPSBzZWVkO1xuICB9XG5cbiAgLy8gTWl4IGluIHN0cmluZyBzZWVkLCB0aGVuIGRpc2NhcmQgYW4gaW5pdGlhbCBiYXRjaCBvZiA2NCB2YWx1ZXMuXG4gIGZvciAodmFyIGsgPSAwOyBrIDwgc3Ryc2VlZC5sZW5ndGggKyA2NDsgaysrKSB7XG4gICAgbWUueCBePSBzdHJzZWVkLmNoYXJDb2RlQXQoaykgfCAwO1xuICAgIGlmIChrID09IHN0cnNlZWQubGVuZ3RoKSB7XG4gICAgICBtZS5kID0gbWUueCA8PCAxMCBeIG1lLnggPj4+IDQ7XG4gICAgfVxuICAgIG1lLm5leHQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC54ID0gZi54O1xuICB0LnkgPSBmLnk7XG4gIHQueiA9IGYuejtcbiAgdC53ID0gZi53O1xuICB0LnYgPSBmLnY7XG4gIHQuZCA9IGYuZDtcbiAgcmV0dXJuIHQ7XG59XG5cbmZ1bmN0aW9uIGltcGwoc2VlZCwgb3B0cykge1xuICB2YXIgeGcgPSBuZXcgWG9yR2VuKHNlZWQpLFxuICAgICAgc3RhdGUgPSBvcHRzICYmIG9wdHMuc3RhdGUsXG4gICAgICBwcm5nID0gZnVuY3Rpb24oKSB7IHJldHVybiAoeGcubmV4dCgpID4+PiAwKSAvIDB4MTAwMDAwMDAwOyB9O1xuICBwcm5nLmRvdWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgIGRvIHtcbiAgICAgIHZhciB0b3AgPSB4Zy5uZXh0KCkgPj4+IDExLFxuICAgICAgICAgIGJvdCA9ICh4Zy5uZXh0KCkgPj4+IDApIC8gMHgxMDAwMDAwMDAsXG4gICAgICAgICAgcmVzdWx0ID0gKHRvcCArIGJvdCkgLyAoMSA8PCAyMSk7XG4gICAgfSB3aGlsZSAocmVzdWx0ID09PSAwKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICBwcm5nLmludDMyID0geGcubmV4dDtcbiAgcHJuZy5xdWljayA9IHBybmc7XG4gIGlmIChzdGF0ZSkge1xuICAgIGlmICh0eXBlb2Yoc3RhdGUpID09ICdvYmplY3QnKSBjb3B5KHN0YXRlLCB4Zyk7XG4gICAgcHJuZy5zdGF0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29weSh4Zywge30pOyB9XG4gIH1cbiAgcmV0dXJuIHBybmc7XG59XG5cbmlmIChtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBpbXBsO1xufSBlbHNlIGlmIChkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBpbXBsOyB9KTtcbn0gZWxzZSB7XG4gIHRoaXMueG9yd293ID0gaW1wbDtcbn1cblxufSkoXG4gIHRoaXMsXG4gICh0eXBlb2YgbW9kdWxlKSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUsICAgIC8vIHByZXNlbnQgaW4gbm9kZS5qc1xuICAodHlwZW9mIGRlZmluZSkgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUgICAvLyBwcmVzZW50IHdpdGggYW4gQU1EIGxvYWRlclxuKTtcblxuXG4iLCIvKlxuQ29weXJpZ2h0IDIwMTkgRGF2aWQgQmF1LlxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcbmEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG53aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG5kaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbnBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xudGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG5FWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbk1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC5cbklOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZXG5DTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULFxuVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEVcblNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4qL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgcG9vbCwgbWF0aCkge1xuLy9cbi8vIFRoZSBmb2xsb3dpbmcgY29uc3RhbnRzIGFyZSByZWxhdGVkIHRvIElFRUUgNzU0IGxpbWl0cy5cbi8vXG5cbnZhciB3aWR0aCA9IDI1NiwgICAgICAgIC8vIGVhY2ggUkM0IG91dHB1dCBpcyAwIDw9IHggPCAyNTZcbiAgICBjaHVua3MgPSA2LCAgICAgICAgIC8vIGF0IGxlYXN0IHNpeCBSQzQgb3V0cHV0cyBmb3IgZWFjaCBkb3VibGVcbiAgICBkaWdpdHMgPSA1MiwgICAgICAgIC8vIHRoZXJlIGFyZSA1MiBzaWduaWZpY2FudCBkaWdpdHMgaW4gYSBkb3VibGVcbiAgICBybmduYW1lID0gJ3JhbmRvbScsIC8vIHJuZ25hbWU6IG5hbWUgZm9yIE1hdGgucmFuZG9tIGFuZCBNYXRoLnNlZWRyYW5kb21cbiAgICBzdGFydGRlbm9tID0gbWF0aC5wb3cod2lkdGgsIGNodW5rcyksXG4gICAgc2lnbmlmaWNhbmNlID0gbWF0aC5wb3coMiwgZGlnaXRzKSxcbiAgICBvdmVyZmxvdyA9IHNpZ25pZmljYW5jZSAqIDIsXG4gICAgbWFzayA9IHdpZHRoIC0gMSxcbiAgICBub2RlY3J5cHRvOyAgICAgICAgIC8vIG5vZGUuanMgY3J5cHRvIG1vZHVsZSwgaW5pdGlhbGl6ZWQgYXQgdGhlIGJvdHRvbS5cblxuLy9cbi8vIHNlZWRyYW5kb20oKVxuLy8gVGhpcyBpcyB0aGUgc2VlZHJhbmRvbSBmdW5jdGlvbiBkZXNjcmliZWQgYWJvdmUuXG4vL1xuZnVuY3Rpb24gc2VlZHJhbmRvbShzZWVkLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICB2YXIga2V5ID0gW107XG4gIG9wdGlvbnMgPSAob3B0aW9ucyA9PSB0cnVlKSA/IHsgZW50cm9weTogdHJ1ZSB9IDogKG9wdGlvbnMgfHwge30pO1xuXG4gIC8vIEZsYXR0ZW4gdGhlIHNlZWQgc3RyaW5nIG9yIGJ1aWxkIG9uZSBmcm9tIGxvY2FsIGVudHJvcHkgaWYgbmVlZGVkLlxuICB2YXIgc2hvcnRzZWVkID0gbWl4a2V5KGZsYXR0ZW4oXG4gICAgb3B0aW9ucy5lbnRyb3B5ID8gW3NlZWQsIHRvc3RyaW5nKHBvb2wpXSA6XG4gICAgKHNlZWQgPT0gbnVsbCkgPyBhdXRvc2VlZCgpIDogc2VlZCwgMyksIGtleSk7XG5cbiAgLy8gVXNlIHRoZSBzZWVkIHRvIGluaXRpYWxpemUgYW4gQVJDNCBnZW5lcmF0b3IuXG4gIHZhciBhcmM0ID0gbmV3IEFSQzQoa2V5KTtcblxuICAvLyBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSByYW5kb20gZG91YmxlIGluIFswLCAxKSB0aGF0IGNvbnRhaW5zXG4gIC8vIHJhbmRvbW5lc3MgaW4gZXZlcnkgYml0IG9mIHRoZSBtYW50aXNzYSBvZiB0aGUgSUVFRSA3NTQgdmFsdWUuXG4gIHZhciBwcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG4gPSBhcmM0LmcoY2h1bmtzKSwgICAgICAgICAgICAgLy8gU3RhcnQgd2l0aCBhIG51bWVyYXRvciBuIDwgMiBeIDQ4XG4gICAgICAgIGQgPSBzdGFydGRlbm9tLCAgICAgICAgICAgICAgICAgLy8gICBhbmQgZGVub21pbmF0b3IgZCA9IDIgXiA0OC5cbiAgICAgICAgeCA9IDA7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGFuZCBubyAnZXh0cmEgbGFzdCBieXRlJy5cbiAgICB3aGlsZSAobiA8IHNpZ25pZmljYW5jZSkgeyAgICAgICAgICAvLyBGaWxsIHVwIGFsbCBzaWduaWZpY2FudCBkaWdpdHMgYnlcbiAgICAgIG4gPSAobiArIHgpICogd2lkdGg7ICAgICAgICAgICAgICAvLyAgIHNoaWZ0aW5nIG51bWVyYXRvciBhbmRcbiAgICAgIGQgKj0gd2lkdGg7ICAgICAgICAgICAgICAgICAgICAgICAvLyAgIGRlbm9taW5hdG9yIGFuZCBnZW5lcmF0aW5nIGFcbiAgICAgIHggPSBhcmM0LmcoMSk7ICAgICAgICAgICAgICAgICAgICAvLyAgIG5ldyBsZWFzdC1zaWduaWZpY2FudC1ieXRlLlxuICAgIH1cbiAgICB3aGlsZSAobiA+PSBvdmVyZmxvdykgeyAgICAgICAgICAgICAvLyBUbyBhdm9pZCByb3VuZGluZyB1cCwgYmVmb3JlIGFkZGluZ1xuICAgICAgbiAvPSAyOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgbGFzdCBieXRlLCBzaGlmdCBldmVyeXRoaW5nXG4gICAgICBkIC89IDI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICByaWdodCB1c2luZyBpbnRlZ2VyIG1hdGggdW50aWxcbiAgICAgIHggPj4+PSAxOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHdlIGhhdmUgZXhhY3RseSB0aGUgZGVzaXJlZCBiaXRzLlxuICAgIH1cbiAgICByZXR1cm4gKG4gKyB4KSAvIGQ7ICAgICAgICAgICAgICAgICAvLyBGb3JtIHRoZSBudW1iZXIgd2l0aGluIFswLCAxKS5cbiAgfTtcblxuICBwcm5nLmludDMyID0gZnVuY3Rpb24oKSB7IHJldHVybiBhcmM0LmcoNCkgfCAwOyB9XG4gIHBybmcucXVpY2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGFyYzQuZyg0KSAvIDB4MTAwMDAwMDAwOyB9XG4gIHBybmcuZG91YmxlID0gcHJuZztcblxuICAvLyBNaXggdGhlIHJhbmRvbW5lc3MgaW50byBhY2N1bXVsYXRlZCBlbnRyb3B5LlxuICBtaXhrZXkodG9zdHJpbmcoYXJjNC5TKSwgcG9vbCk7XG5cbiAgLy8gQ2FsbGluZyBjb252ZW50aW9uOiB3aGF0IHRvIHJldHVybiBhcyBhIGZ1bmN0aW9uIG9mIHBybmcsIHNlZWQsIGlzX21hdGguXG4gIHJldHVybiAob3B0aW9ucy5wYXNzIHx8IGNhbGxiYWNrIHx8XG4gICAgICBmdW5jdGlvbihwcm5nLCBzZWVkLCBpc19tYXRoX2NhbGwsIHN0YXRlKSB7XG4gICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgIC8vIExvYWQgdGhlIGFyYzQgc3RhdGUgZnJvbSB0aGUgZ2l2ZW4gc3RhdGUgaWYgaXQgaGFzIGFuIFMgYXJyYXkuXG4gICAgICAgICAgaWYgKHN0YXRlLlMpIHsgY29weShzdGF0ZSwgYXJjNCk7IH1cbiAgICAgICAgICAvLyBPbmx5IHByb3ZpZGUgdGhlIC5zdGF0ZSBtZXRob2QgaWYgcmVxdWVzdGVkIHZpYSBvcHRpb25zLnN0YXRlLlxuICAgICAgICAgIHBybmcuc3RhdGUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvcHkoYXJjNCwge30pOyB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBjYWxsZWQgYXMgYSBtZXRob2Qgb2YgTWF0aCAoTWF0aC5zZWVkcmFuZG9tKCkpLCBtdXRhdGVcbiAgICAgICAgLy8gTWF0aC5yYW5kb20gYmVjYXVzZSB0aGF0IGlzIGhvdyBzZWVkcmFuZG9tLmpzIGhhcyB3b3JrZWQgc2luY2UgdjEuMC5cbiAgICAgICAgaWYgKGlzX21hdGhfY2FsbCkgeyBtYXRoW3JuZ25hbWVdID0gcHJuZzsgcmV0dXJuIHNlZWQ7IH1cblxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0IGlzIGEgbmV3ZXIgY2FsbGluZyBjb252ZW50aW9uLCBzbyByZXR1cm4gdGhlXG4gICAgICAgIC8vIHBybmcgZGlyZWN0bHkuXG4gICAgICAgIGVsc2UgcmV0dXJuIHBybmc7XG4gICAgICB9KShcbiAgcHJuZyxcbiAgc2hvcnRzZWVkLFxuICAnZ2xvYmFsJyBpbiBvcHRpb25zID8gb3B0aW9ucy5nbG9iYWwgOiAodGhpcyA9PSBtYXRoKSxcbiAgb3B0aW9ucy5zdGF0ZSk7XG59XG5cbi8vXG4vLyBBUkM0XG4vL1xuLy8gQW4gQVJDNCBpbXBsZW1lbnRhdGlvbi4gIFRoZSBjb25zdHJ1Y3RvciB0YWtlcyBhIGtleSBpbiB0aGUgZm9ybSBvZlxuLy8gYW4gYXJyYXkgb2YgYXQgbW9zdCAod2lkdGgpIGludGVnZXJzIHRoYXQgc2hvdWxkIGJlIDAgPD0geCA8ICh3aWR0aCkuXG4vL1xuLy8gVGhlIGcoY291bnQpIG1ldGhvZCByZXR1cm5zIGEgcHNldWRvcmFuZG9tIGludGVnZXIgdGhhdCBjb25jYXRlbmF0ZXNcbi8vIHRoZSBuZXh0IChjb3VudCkgb3V0cHV0cyBmcm9tIEFSQzQuICBJdHMgcmV0dXJuIHZhbHVlIGlzIGEgbnVtYmVyIHhcbi8vIHRoYXQgaXMgaW4gdGhlIHJhbmdlIDAgPD0geCA8ICh3aWR0aCBeIGNvdW50KS5cbi8vXG5mdW5jdGlvbiBBUkM0KGtleSkge1xuICB2YXIgdCwga2V5bGVuID0ga2V5Lmxlbmd0aCxcbiAgICAgIG1lID0gdGhpcywgaSA9IDAsIGogPSBtZS5pID0gbWUuaiA9IDAsIHMgPSBtZS5TID0gW107XG5cbiAgLy8gVGhlIGVtcHR5IGtleSBbXSBpcyB0cmVhdGVkIGFzIFswXS5cbiAgaWYgKCFrZXlsZW4pIHsga2V5ID0gW2tleWxlbisrXTsgfVxuXG4gIC8vIFNldCB1cCBTIHVzaW5nIHRoZSBzdGFuZGFyZCBrZXkgc2NoZWR1bGluZyBhbGdvcml0aG0uXG4gIHdoaWxlIChpIDwgd2lkdGgpIHtcbiAgICBzW2ldID0gaSsrO1xuICB9XG4gIGZvciAoaSA9IDA7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgc1tpXSA9IHNbaiA9IG1hc2sgJiAoaiArIGtleVtpICUga2V5bGVuXSArICh0ID0gc1tpXSkpXTtcbiAgICBzW2pdID0gdDtcbiAgfVxuXG4gIC8vIFRoZSBcImdcIiBtZXRob2QgcmV0dXJucyB0aGUgbmV4dCAoY291bnQpIG91dHB1dHMgYXMgb25lIG51bWJlci5cbiAgKG1lLmcgPSBmdW5jdGlvbihjb3VudCkge1xuICAgIC8vIFVzaW5nIGluc3RhbmNlIG1lbWJlcnMgaW5zdGVhZCBvZiBjbG9zdXJlIHN0YXRlIG5lYXJseSBkb3VibGVzIHNwZWVkLlxuICAgIHZhciB0LCByID0gMCxcbiAgICAgICAgaSA9IG1lLmksIGogPSBtZS5qLCBzID0gbWUuUztcbiAgICB3aGlsZSAoY291bnQtLSkge1xuICAgICAgdCA9IHNbaSA9IG1hc2sgJiAoaSArIDEpXTtcbiAgICAgIHIgPSByICogd2lkdGggKyBzW21hc2sgJiAoKHNbaV0gPSBzW2ogPSBtYXNrICYgKGogKyB0KV0pICsgKHNbal0gPSB0KSldO1xuICAgIH1cbiAgICBtZS5pID0gaTsgbWUuaiA9IGo7XG4gICAgcmV0dXJuIHI7XG4gICAgLy8gRm9yIHJvYnVzdCB1bnByZWRpY3RhYmlsaXR5LCB0aGUgZnVuY3Rpb24gY2FsbCBiZWxvdyBhdXRvbWF0aWNhbGx5XG4gICAgLy8gZGlzY2FyZHMgYW4gaW5pdGlhbCBiYXRjaCBvZiB2YWx1ZXMuICBUaGlzIGlzIGNhbGxlZCBSQzQtZHJvcFsyNTZdLlxuICAgIC8vIFNlZSBodHRwOi8vZ29vZ2xlLmNvbS9zZWFyY2g/cT1yc2ErZmx1aHJlcityZXNwb25zZSZidG5JXG4gIH0pKHdpZHRoKTtcbn1cblxuLy9cbi8vIGNvcHkoKVxuLy8gQ29waWVzIGludGVybmFsIHN0YXRlIG9mIEFSQzQgdG8gb3IgZnJvbSBhIHBsYWluIG9iamVjdC5cbi8vXG5mdW5jdGlvbiBjb3B5KGYsIHQpIHtcbiAgdC5pID0gZi5pO1xuICB0LmogPSBmLmo7XG4gIHQuUyA9IGYuUy5zbGljZSgpO1xuICByZXR1cm4gdDtcbn07XG5cbi8vXG4vLyBmbGF0dGVuKClcbi8vIENvbnZlcnRzIGFuIG9iamVjdCB0cmVlIHRvIG5lc3RlZCBhcnJheXMgb2Ygc3RyaW5ncy5cbi8vXG5mdW5jdGlvbiBmbGF0dGVuKG9iaiwgZGVwdGgpIHtcbiAgdmFyIHJlc3VsdCA9IFtdLCB0eXAgPSAodHlwZW9mIG9iaiksIHByb3A7XG4gIGlmIChkZXB0aCAmJiB0eXAgPT0gJ29iamVjdCcpIHtcbiAgICBmb3IgKHByb3AgaW4gb2JqKSB7XG4gICAgICB0cnkgeyByZXN1bHQucHVzaChmbGF0dGVuKG9ialtwcm9wXSwgZGVwdGggLSAxKSk7IH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuICB9XG4gIHJldHVybiAocmVzdWx0Lmxlbmd0aCA/IHJlc3VsdCA6IHR5cCA9PSAnc3RyaW5nJyA/IG9iaiA6IG9iaiArICdcXDAnKTtcbn1cblxuLy9cbi8vIG1peGtleSgpXG4vLyBNaXhlcyBhIHN0cmluZyBzZWVkIGludG8gYSBrZXkgdGhhdCBpcyBhbiBhcnJheSBvZiBpbnRlZ2VycywgYW5kXG4vLyByZXR1cm5zIGEgc2hvcnRlbmVkIHN0cmluZyBzZWVkIHRoYXQgaXMgZXF1aXZhbGVudCB0byB0aGUgcmVzdWx0IGtleS5cbi8vXG5mdW5jdGlvbiBtaXhrZXkoc2VlZCwga2V5KSB7XG4gIHZhciBzdHJpbmdzZWVkID0gc2VlZCArICcnLCBzbWVhciwgaiA9IDA7XG4gIHdoaWxlIChqIDwgc3RyaW5nc2VlZC5sZW5ndGgpIHtcbiAgICBrZXlbbWFzayAmIGpdID1cbiAgICAgIG1hc2sgJiAoKHNtZWFyIF49IGtleVttYXNrICYgal0gKiAxOSkgKyBzdHJpbmdzZWVkLmNoYXJDb2RlQXQoaisrKSk7XG4gIH1cbiAgcmV0dXJuIHRvc3RyaW5nKGtleSk7XG59XG5cbi8vXG4vLyBhdXRvc2VlZCgpXG4vLyBSZXR1cm5zIGFuIG9iamVjdCBmb3IgYXV0b3NlZWRpbmcsIHVzaW5nIHdpbmRvdy5jcnlwdG8gYW5kIE5vZGUgY3J5cHRvXG4vLyBtb2R1bGUgaWYgYXZhaWxhYmxlLlxuLy9cbmZ1bmN0aW9uIGF1dG9zZWVkKCkge1xuICB0cnkge1xuICAgIHZhciBvdXQ7XG4gICAgaWYgKG5vZGVjcnlwdG8gJiYgKG91dCA9IG5vZGVjcnlwdG8ucmFuZG9tQnl0ZXMpKSB7XG4gICAgICAvLyBUaGUgdXNlIG9mICdvdXQnIHRvIHJlbWVtYmVyIHJhbmRvbUJ5dGVzIG1ha2VzIHRpZ2h0IG1pbmlmaWVkIGNvZGUuXG4gICAgICBvdXQgPSBvdXQod2lkdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXQgPSBuZXcgVWludDhBcnJheSh3aWR0aCk7XG4gICAgICAoZ2xvYmFsLmNyeXB0byB8fCBnbG9iYWwubXNDcnlwdG8pLmdldFJhbmRvbVZhbHVlcyhvdXQpO1xuICAgIH1cbiAgICByZXR1cm4gdG9zdHJpbmcob3V0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHZhciBicm93c2VyID0gZ2xvYmFsLm5hdmlnYXRvcixcbiAgICAgICAgcGx1Z2lucyA9IGJyb3dzZXIgJiYgYnJvd3Nlci5wbHVnaW5zO1xuICAgIHJldHVybiBbK25ldyBEYXRlLCBnbG9iYWwsIHBsdWdpbnMsIGdsb2JhbC5zY3JlZW4sIHRvc3RyaW5nKHBvb2wpXTtcbiAgfVxufVxuXG4vL1xuLy8gdG9zdHJpbmcoKVxuLy8gQ29udmVydHMgYW4gYXJyYXkgb2YgY2hhcmNvZGVzIHRvIGEgc3RyaW5nXG4vL1xuZnVuY3Rpb24gdG9zdHJpbmcoYSkge1xuICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseSgwLCBhKTtcbn1cblxuLy9cbi8vIFdoZW4gc2VlZHJhbmRvbS5qcyBpcyBsb2FkZWQsIHdlIGltbWVkaWF0ZWx5IG1peCBhIGZldyBiaXRzXG4vLyBmcm9tIHRoZSBidWlsdC1pbiBSTkcgaW50byB0aGUgZW50cm9weSBwb29sLiAgQmVjYXVzZSB3ZSBkb1xuLy8gbm90IHdhbnQgdG8gaW50ZXJmZXJlIHdpdGggZGV0ZXJtaW5pc3RpYyBQUk5HIHN0YXRlIGxhdGVyLFxuLy8gc2VlZHJhbmRvbSB3aWxsIG5vdCBjYWxsIG1hdGgucmFuZG9tIG9uIGl0cyBvd24gYWdhaW4gYWZ0ZXJcbi8vIGluaXRpYWxpemF0aW9uLlxuLy9cbm1peGtleShtYXRoLnJhbmRvbSgpLCBwb29sKTtcblxuLy9cbi8vIE5vZGVqcyBhbmQgQU1EIHN1cHBvcnQ6IGV4cG9ydCB0aGUgaW1wbGVtZW50YXRpb24gYXMgYSBtb2R1bGUgdXNpbmdcbi8vIGVpdGhlciBjb252ZW50aW9uLlxuLy9cbmlmICgodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBzZWVkcmFuZG9tO1xuICAvLyBXaGVuIGluIG5vZGUuanMsIHRyeSB1c2luZyBjcnlwdG8gcGFja2FnZSBmb3IgYXV0b3NlZWRpbmcuXG4gIHRyeSB7XG4gICAgbm9kZWNyeXB0byA9IHJlcXVpcmUoJ2NyeXB0bycpO1xuICB9IGNhdGNoIChleCkge31cbn0gZWxzZSBpZiAoKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBzZWVkcmFuZG9tOyB9KTtcbn0gZWxzZSB7XG4gIC8vIFdoZW4gaW5jbHVkZWQgYXMgYSBwbGFpbiBzY3JpcHQsIHNldCB1cCBNYXRoLnNlZWRyYW5kb20gZ2xvYmFsLlxuICBtYXRoWydzZWVkJyArIHJuZ25hbWVdID0gc2VlZHJhbmRvbTtcbn1cblxuXG4vLyBFbmQgYW5vbnltb3VzIHNjb3BlLCBhbmQgcGFzcyBpbml0aWFsIHZhbHVlcy5cbn0pKFxuICAvLyBnbG9iYWw6IGBzZWxmYCBpbiBicm93c2VycyAoaW5jbHVkaW5nIHN0cmljdCBtb2RlIGFuZCB3ZWIgd29ya2VycyksXG4gIC8vIG90aGVyd2lzZSBgdGhpc2AgaW4gTm9kZSBhbmQgb3RoZXIgZW52aXJvbm1lbnRzXG4gICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpID8gc2VsZiA6IHRoaXMsXG4gIFtdLCAgICAgLy8gcG9vbDogZW50cm9weSBwb29sIHN0YXJ0cyBlbXB0eVxuICBNYXRoICAgIC8vIG1hdGg6IHBhY2thZ2UgY29udGFpbmluZyByYW5kb20sIHBvdywgYW5kIHNlZWRyYW5kb21cbik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXHR0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7XG59O1xuIiwiLyogZ2xvYmFscyBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXyAqL1xubW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxuXHRcdGlmICghbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcblx0fVxuXHRyZXR1cm4gbW9kdWxlO1xufTtcbiIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuICBDYXNlVHlwZToge1xuICAgIEVNUFRZOiAwLFxuICAgIFNOQUtFOiAxLFxuICAgIEZSVUlUOiAyLFxuICAgIFdBTEw6IDMsXG4gICAgU05BS0VfREVBRDogNCxcbiAgICBTVVJST1VOREVEOiA1LFxuICAgIEZSVUlUX0dPTEQ6IDYsXG4gICAgQ1JPU1NFRDogN1xuICB9LFxuICBQbGF5ZXJUeXBlOiB7XG4gICAgQUk6IFwiUExBWUVSX0FJXCIsXG4gICAgSFVNQU46IFwiUExBWUVSX0hVTUFOXCIsXG4gICAgSFlCUklEX0hVTUFOX0FJOiBcIlBMQVlFUl9IWUJSSURfSFVNQU5fQUlcIlxuICB9LFxuICBBaUxldmVsOiB7XG4gICAgUkFORE9NOiBcIkFJX0xFVkVMX1JBTkRPTVwiLFxuICAgIExPVzogXCJBSV9MRVZFTF9MT1dcIixcbiAgICBERUZBVUxUOiBcIkFJX0xFVkVMX0RFRkFVTFRcIixcbiAgICBISUdIOiBcIkFJX0xFVkVMX0hJR0hcIixcbiAgICBVTFRSQTogXCJBSV9MRVZFTF9VTFRSQVwiLFxuICAgIENVU1RPTTogXCJBSV9MRVZFTF9DVVNUT01cIixcbiAgICBNT0NLOiBcIkFJX0xFVkVMX01PQ0tcIlxuICB9LFxuICBPdXRwdXRUeXBlOiB7XG4gICAgVEVYVDogXCJPVVRQVVRfVEVYVFwiLFxuICAgIEdSQVBISUNBTDogXCJPVVRQVVRfR1JBUEhJQ0FMXCJcbiAgfSxcbiAgU2V0dGluZzoge1xuICAgIENBTlZBU19XSURUSDogODAwLFxuICAgIENBTlZBU19IRUlHSFQ6IDYwMCxcbiAgICBGT05UX0ZBTUlMWTogXCJEZWxpdXNcIixcbiAgICBGT05UX1NJWkU6IDMyLFxuICAgIEhFQURFUl9IRUlHSFRfREVGQVVMVDogNzUsXG4gICAgVEFSR0VUX0ZQUzogNjAsXG4gICAgVElNRV9NVUxUSVBMSUVSOiAxNSxcbiAgICBJTUFHRV9TTkFLRV9IVUU6IDc1LFxuICAgIElNQUdFX1NOQUtFX1NBVFVSQVRJT046IDUwLFxuICAgIElNQUdFX1NOQUtFX1ZBTFVFOiA3NyxcbiAgICBDQVJTX1RPX1BSRVJFTkRFUjogW1wiQVwiLCBcIkJcIiwgXCJDXCIsIFwiRFwiLCBcIkVcIiwgXCJGXCIsIFwiR1wiLCBcIkhcIiwgXCJJXCIsIFwiSlwiLCBcIktcIiwgXCJMXCIsIFwiTVwiLCBcIk5cIiwgXCJPXCIsIFwiUFwiLCBcIlFcIiwgXCJSXCIsIFwiU1wiLCBcIlRcIiwgXCJWXCIsIFwiV1wiLCBcIlhcIiwgXCJZXCIsIFwiWlwiLCBcImFcIiwgXCJiXCIsIFwiY1wiLCBcImRcIiwgXCJlXCIsIFwiZlwiLCBcImdcIiwgXCJoXCIsIFwiaVwiLCBcImpcIiwgXCJrXCIsIFwibFwiLCBcIm1cIiwgXCJuXCIsIFwib1wiLCBcInBcIiwgXCJxXCIsIFwiclwiLCBcInNcIiwgXCJ0XCIsIFwidlwiLCBcIndcIiwgXCJ4XCIsIFwieVwiLCBcInpcIiwgXCIwXCIsIFwiMVwiLCBcIjJcIiwgXCIzXCIsIFwiNFwiLCBcIjVcIiwgXCI2XCIsIFwiN1wiLCBcIjhcIiwgXCI5XCIsIFwiw5dcIl0sXG4gICAgQVBQX1ZFUlNJT046IFwiMi4yXCIsXG4gICAgREFURV9WRVJTSU9OOiBcIjEwLzE4LzIwMjBcIixcbiAgICBQUk9CX0dPTERfRlJVSVRfMV9QTEFZRVI6IDEwMCxcbiAgICBQUk9CX0dPTERfRlJVSVRfTVVMVElQTEVfUExBWUVSUzogNTAsXG4gICAgSU5GT19OT1RJRl9DT0xPUjogXCJyZ2JhKDUyLCAxNTIsIDIxOSwgMC41KVwiLFxuICAgIEVSUk9SX05PVElGX0NPTE9SOiBcInJnYmEoMjMxLCA3NiwgNjAsIDAuNSlcIlxuICB9LFxuICBEaXJlY3Rpb246IHtcbiAgICBVUDogMCxcbiAgICBUT1A6IDAsXG4gICAgUklHSFQ6IDEsXG4gICAgQk9UVE9NOiAyLFxuICAgIERPV046IDIsXG4gICAgTEVGVDogMyxcbiAgICBBTkdMRV8xOiA0LFxuICAgIEFOR0xFXzI6IDUsXG4gICAgQU5HTEVfMzogNixcbiAgICBBTkdMRV80OiA3XG4gIH0sXG4gIEtleToge1xuICAgIFVQOiAzOCxcbiAgICBSSUdIVDogMzksXG4gICAgQk9UVE9NOiA0MCxcbiAgICBMRUZUOiAzNyxcbiAgICBFTlRFUjogMTNcbiAgfSxcbiAgRXJyb3I6IHtcbiAgICBST09NX05PVF9GT1VORDogXCJST09NX05PVF9GT1VORFwiLFxuICAgIFJPT01fQUxSRUFEWV9KT0lORUQ6IFwiUk9PTV9BTFJFQURZX0pPSU5FRFwiLFxuICAgIElOVkFMSURfU0VUVElOR1M6IFwiSU5WQUxJRF9TRVRUSU5HU1wiLFxuICAgIE1BWF9ST09NX0xJTUlUX1JFQUNIRUQ6IFwiTUFYX1JPT01fTElNSVRfUkVBQ0hFRFwiLFxuICAgIEFVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEOiBcIkFVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEXCIsXG4gICAgQUxSRUFEWV9DUkVBVEVEX1JPT006IFwiQUxSRUFEWV9DUkVBVEVEX1JPT01cIixcbiAgICBCQU5ORUQ6IFwiQkFOTkVEXCIsXG4gICAgRElTQ09OTkVDVEVEOiBcIkRJU0NPTk5FQ1RFRFwiXG4gIH0sXG4gIEdhbWVTdGF0ZToge1xuICAgIFNUQVJUSU5HOiBcIlNUQVJUSU5HXCIsXG4gICAgU1RBUlRFRDogXCJTVEFSVEVEXCIsXG4gICAgU0VBUkNISU5HX1BMQVlFUlM6IFwiU0VBUkNISU5HX1BMQVlFUlNcIixcbiAgICBBVVRIRU5USUNBVElPTl9TVUNDRVNTOiBcIkFVVEhFTlRJQ0FUSU9OX1NVQ0NFU1NcIlxuICB9XG59OyIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnQge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLmNhbGxiYWNrcyA9IFtdO1xuICB9XG5cbiAgcmVnaXN0ZXJDYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICB9XG59IiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAxOS0yMDIwIEVsaWFzdGlrIChlbGlhc3Rpa3NvZnRzLmNvbSlcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBcIlNuYWtlSUFcIi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFwiU25ha2VJQVwiLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovICBcbmltcG9ydCBHYW1lVXRpbHMgZnJvbSBcIi4vR2FtZVV0aWxzXCI7XG5pbXBvcnQgR2FtZUNvbnN0YW50cyBmcm9tIFwiLi9Db25zdGFudHNcIjtcbmltcG9ydCBSZWFjdG9yIGZyb20gXCIuL1JlYWN0b3JcIjtcbmltcG9ydCBHcmlkIGZyb20gXCIuL0dyaWRcIjtcbmltcG9ydCBTbmFrZSBmcm9tIFwiLi9TbmFrZVwiO1xuaW1wb3J0IHNlZWRyYW5kb20gZnJvbSBcInNlZWRyYW5kb21cIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUVuZ2luZSB7XG4gIGNvbnN0cnVjdG9yKGdyaWQsIHNuYWtlLCBzcGVlZCwgZW5hYmxlUGF1c2UsIGVuYWJsZVJldHJ5LCBwcm9ncmVzc2l2ZVNwZWVkLCBhaVN0dWNrTGltaXQpIHtcbiAgICAvLyBHYW1lIHNldHRpbmdzXG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgICB0aGlzLnNuYWtlcyA9IHNuYWtlO1xuICAgIHRoaXMuc3BlZWQgPSBzcGVlZCA9PSBudWxsID8gOCA6IHNwZWVkO1xuICAgIHRoaXMuaW5pdGlhbFNwZWVkID0gc3BlZWQgPT0gbnVsbCA/IDggOiBzcGVlZDtcbiAgICB0aGlzLmluaXRpYWxTcGVlZFVudG91Y2hlZCA9IHNwZWVkID09IG51bGwgPyA4IDogc3BlZWQ7XG4gICAgdGhpcy5lbmFibGVQYXVzZSA9IGVuYWJsZVBhdXNlID09IG51bGwgPyB0cnVlIDogZW5hYmxlUGF1c2U7XG4gICAgdGhpcy5lbmFibGVSZXRyeSA9IGVuYWJsZVJldHJ5ID09IG51bGwgPyB0cnVlIDogZW5hYmxlUmV0cnk7XG4gICAgdGhpcy5wcm9ncmVzc2l2ZVNwZWVkID0gcHJvZ3Jlc3NpdmVTcGVlZCA9PSBudWxsID8gZmFsc2UgOiBwcm9ncmVzc2l2ZVNwZWVkO1xuICAgIHRoaXMuYWlTdHVja0xpbWl0ID0gYWlTdHVja0xpbWl0ID09IG51bGwgPyAzIDogYWlTdHVja0xpbWl0O1xuICAgIHRoaXMuY291bnRCZWZvcmVQbGF5ID0gMztcbiAgICAvLyBHYW1lIHZhcmlhYmxlc1xuICAgIHRoaXMubGFzdEtleSA9IC0xO1xuICAgIHRoaXMubnVtRnJ1aXQgPSAxO1xuICAgIHRoaXMudGlja3MgPSAwO1xuICAgIC8vIEdhbWUgc3RhdGUgdmFyaWFibGVzXG4gICAgdGhpcy5maXJzdFN0YXJ0ID0gdHJ1ZTtcbiAgICB0aGlzLnN0YXJ0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuZXhpdGVkID0gZmFsc2U7XG4gICAgdGhpcy5raWxsZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVzZXRlZCA9IHRydWU7XG4gICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgIHRoaXMuZ2FtZUZpbmlzaGVkID0gZmFsc2U7IC8vIG9ubHkgdXNlZCBpZiAyIGFuZCBtb3JlIHNuYWtlc1xuICAgIHRoaXMuZ2FtZU1hemVXaW4gPSBmYWxzZTsgLy8gdXNlZCBpbiBtYXplIG1vZGVcbiAgICB0aGlzLnNjb3JlTWF4ID0gZmFsc2U7XG4gICAgdGhpcy5lcnJvck9jY3VycmVkID0gZmFsc2U7XG4gICAgdGhpcy5jbGllbnRTaWRlUHJlZGljdGlvbnNNb2RlID0gZmFsc2U7IC8vIEVuYWJsZSBjbGllbnQtc2lkZSBwcmVkaWN0aW9ucyBtb2RlIGZvciB0aGUgb25saW5lIGdhbWUgKGRpc2FibGUgc29tZSBmdW5jdGlvbnMpXG4gICAgdGhpcy5haVN0dWNrID0gZmFsc2U7IC8vIHRydWUgaWYgb25lIEFJIGlzIHN0dWNrIC0gZGlzYWJsZWQgaWYgYW4gaHVtYW4gcGxheWVyIGlzIHBsYXlpbmdcbiAgICAvLyBJbnRlcnZhbHMsIHRpbWVvdXRzLCBmcmFtZXNcbiAgICB0aGlzLmludGVydmFsUGxheTtcbiAgICAvLyBFdmVudHNcbiAgICB0aGlzLnJlYWN0b3IgPSBuZXcgUmVhY3RvcigpO1xuICAgIHRoaXMucmVhY3Rvci5yZWdpc3RlckV2ZW50KFwib25TdGFydFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uUGF1c2VcIik7XG4gICAgdGhpcy5yZWFjdG9yLnJlZ2lzdGVyRXZlbnQoXCJvbkNvbnRpbnVlXCIpO1xuICAgIHRoaXMucmVhY3Rvci5yZWdpc3RlckV2ZW50KFwib25SZXNldFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uU3RvcFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uRXhpdFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uS2lsbFwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uU2NvcmVJbmNyZWFzZWRcIik7XG4gICAgdGhpcy5yZWFjdG9yLnJlZ2lzdGVyRXZlbnQoXCJvblVwZGF0ZVwiKTtcbiAgICB0aGlzLnJlYWN0b3IucmVnaXN0ZXJFdmVudChcIm9uVXBkYXRlQ291bnRlclwiKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYoIXRoaXMuY2xpZW50U2lkZVByZWRpY3Rpb25zTW9kZSkge1xuICAgICAgaWYodGhpcy5zbmFrZXMgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmVycm9yT2NjdXJyZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnNuYWtlcyA9IFtdO1xuICAgICAgfSBlbHNlIGlmKCFBcnJheS5pc0FycmF5KHRoaXMuc25ha2VzKSkge1xuICAgICAgICB0aGlzLnNuYWtlcyA9IFt0aGlzLnNuYWtlc107XG4gICAgICB9IGVsc2UgaWYoKEFycmF5LmlzQXJyYXkodGhpcy5zbmFrZXMpICYmIHRoaXMuc25ha2VzLmxlbmd0aCA8PSAwKSB8fCAodGhpcy5ncmlkLm1hemUgJiYgdGhpcy5zbmFrZXMubGVuZ3RoID4gMSkpIHtcbiAgICAgICAgdGhpcy5lcnJvck9jY3VycmVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYodGhpcy5ncmlkIGluc3RhbmNlb2YgR3JpZCA9PSBmYWxzZSkge1xuICAgICAgICB0aGlzLmVycm9yT2NjdXJyZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmKCF0aGlzLmVycm9yT2NjdXJyZWQpIHtcbiAgICAgICAgdGhpcy5pbml0R3JpZEFuZFNuYWtlcygpO1xuXG4gICAgICAgIC8vIEluaXQgU25ha2UgY29sb3JzXG4gICAgICAgIGxldCBzdGFydEh1ZSA9IEdhbWVVdGlscy5yYW5kUmFuZ2UoMCwgMzYwLCB0aGlzLmdyaWQgPyBuZXcgc2VlZHJhbmRvbSh0aGlzLmdyaWQuc2VlZEdhbWUpIDogbnVsbCk7XG4gIFxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZih0aGlzLnNuYWtlc1tpXSBpbnN0YW5jZW9mIFNuYWtlID09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9yT2NjdXJyZWQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGFydEh1ZSA9IEdhbWVVdGlscy5hZGRIdWUoc3RhcnRIdWUsIE1hdGgucm91bmQoMzYwIC8gKHRoaXMuc25ha2VzLmxlbmd0aCkpKTtcbiAgICAgICAgICAgIHRoaXMuc25ha2VzW2ldLmNvbG9yID0gc3RhcnRIdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdEdyaWRBbmRTbmFrZXMoKSB7XG4gICAgdGhpcy5ncmlkLnJlc2V0KCk7XG4gICAgdGhpcy5ncmlkLmluaXQoKTtcblxuICAgIGlmKHRoaXMuc25ha2VzICE9IG51bGwpIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNuYWtlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLnNuYWtlc1tpXS5yZXNldCgpO1xuICAgICAgfVxuICAgICAgXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5zbmFrZXNbaV0uaW5pdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZ3JpZC5zZXRGcnVpdCh0aGlzLnNuYWtlcy5sZW5ndGgpO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgIHRoaXMuaXNSZXNldGVkID0gdHJ1ZTtcbiAgICB0aGlzLmV4aXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuY2xlYXJJbnRlcnZhbFBsYXkoKTtcblxuICAgIHRoaXMubnVtRnJ1aXQgPSAxO1xuICAgIHRoaXMudGlja3MgPSAwO1xuICAgIHRoaXMubGFzdEtleSA9IC0xO1xuICAgIHRoaXMuc2NvcmVNYXggPSBmYWxzZTtcbiAgICB0aGlzLmVycm9yT2NjdXJyZWQgPSBmYWxzZTtcbiAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gICAgdGhpcy5nYW1lRmluaXNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLmdhbWVNYXplV2luID0gZmFsc2U7XG4gICAgdGhpcy5zdGFydGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaW5pdGlhbFNwZWVkID0gdGhpcy5pbml0aWFsU3BlZWRVbnRvdWNoZWQ7XG4gICAgdGhpcy5zcGVlZCA9IHRoaXMuaW5pdGlhbFNwZWVkVW50b3VjaGVkO1xuICAgIHRoaXMuYWlTdHVjayA9IGZhbHNlO1xuXG4gICAgaWYodGhpcy5ncmlkLnNlZWRHcmlkKSB7XG4gICAgICB0aGlzLmdyaWQuc2VlZEdyaWQgPSBcIlwiICsgKHBhcnNlSW50KHRoaXMuZ3JpZC5zZWVkR3JpZCkgKyAxKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLmdyaWQuc2VlZEdhbWUpIHtcbiAgICAgIHRoaXMuZ3JpZC5zZWVkR2FtZSA9IFwiXCIgKyAocGFyc2VJbnQodGhpcy5ncmlkLnNlZWRHYW1lKSArIDEpO1xuICAgIH1cblxuICAgIHRoaXMuaW5pdEdyaWRBbmRTbmFrZXMoKTtcblxuICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25SZXNldFwiKTtcbiAgICB0aGlzLnN0YXJ0KCk7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uVXBkYXRlQ291bnRlclwiKTtcbiAgICBcbiAgICBpZighdGhpcy5lcnJvck9jY3VycmVkKSB7XG4gICAgICBpZih0aGlzLnNuYWtlcyAhPSBudWxsKSB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnNuYWtlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmKHRoaXMuc25ha2VzW2ldLmVycm9ySW5pdCkge1xuICAgICAgICAgICAgdGhpcy5lcnJvck9jY3VycmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZih0aGlzLnBhdXNlZCAmJiAhdGhpcy5nYW1lT3ZlciAmJiAhdGhpcy5raWxsZWQgJiYgIXRoaXMuc2NvcmVNYXggJiYgIXRoaXMuc3RhcnRpbmcpIHtcbiAgICAgICAgdGhpcy5zdGFydGluZyA9IHRydWU7XG5cbiAgICAgICAgaWYoIXRoaXMuZmlyc3RTdGFydCkge1xuICAgICAgICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25Db250aW51ZVwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY291bnRCZWZvcmVQbGF5ID0gMztcbiAgICAgICAgdGhpcy5jbGVhckludGVydmFsUGxheSgpO1xuICAgICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uVXBkYXRlQ291bnRlclwiKTtcblxuICAgICAgICB0aGlzLmludGVydmFsUGxheSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNvdW50QmVmb3JlUGxheS0tO1xuICAgICAgICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25VcGRhdGVDb3VudGVyXCIpO1xuXG4gICAgICAgICAgaWYodGhpcy5jb3VudEJlZm9yZVBsYXkgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmZvcmNlU3RhcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMDApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvcmNlU3RhcnQoKSB7XG4gICAgdGhpcy5jbGVhckludGVydmFsUGxheSgpO1xuICAgIHRoaXMuY291bnRCZWZvcmVQbGF5ID0gLTE7XG4gICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmlzUmVzZXRlZCA9IGZhbHNlO1xuICAgIHRoaXMuZmlyc3RTdGFydCA9IGZhbHNlO1xuICAgIHRoaXMuc3RhcnRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uU3RhcnRcIik7XG4gICAgdGhpcy50aWNrKCk7XG4gIH1cblxuICBjbGVhckludGVydmFsUGxheSgpIHtcbiAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWxQbGF5KTtcbiAgfVxuXG4gIGNvbnRpbnVlKCkge1xuICAgIGlmKCF0aGlzLmNsaWVudFNpZGVQcmVkaWN0aW9uc01vZGUpIHtcbiAgICAgIHRoaXMuc3RhcnQoKTtcbiAgICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25Db250aW51ZVwiKTtcbiAgICB9XG4gIH1cblxuICBzdG9wKGZpbmlzaCkge1xuICAgIGlmKCF0aGlzLmdhbWVPdmVyICYmICF0aGlzLmNsaWVudFNpZGVQcmVkaWN0aW9uc01vZGUpIHtcbiAgICAgIHRoaXMucGF1c2VkID0gdHJ1ZTtcbiAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgaWYoZmluaXNoKSB0aGlzLmdhbWVGaW5pc2hlZCA9IHRydWU7XG4gICAgICB0aGlzLmNsZWFySW50ZXJ2YWxQbGF5KCk7XG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uU3RvcFwiKTtcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpIHtcbiAgICBpZighdGhpcy5wYXVzZWQgJiYgIXRoaXMuY2xpZW50U2lkZVByZWRpY3Rpb25zTW9kZSkge1xuICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuICAgICAgdGhpcy5jbGVhckludGVydmFsUGxheSgpO1xuICAgICAgdGhpcy5yZWFjdG9yLmRpc3BhdGNoRXZlbnQoXCJvblBhdXNlXCIpO1xuICAgIH1cbiAgfVxuXG4gIGtpbGwoKSB7XG4gICAgaWYoIXRoaXMua2lsbGVkKSB7XG4gICAgICB0aGlzLnBhdXNlZCA9IHRydWU7XG4gICAgICB0aGlzLmdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgIHRoaXMua2lsbGVkID0gdHJ1ZTtcblxuICAgICAgaWYodGhpcy5zbmFrZXMgIT0gbnVsbCkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5raWxsKCk7XG4gICAgICAgICAgdGhpcy5zbmFrZXNbaV0gPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2xlYXJJbnRlcnZhbFBsYXkoKTtcbiAgICAgIHRoaXMuZ3JpZCA9IG51bGw7XG4gICAgICB0aGlzLnNuYWtlcyA9IG51bGw7XG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uS2lsbFwiKTtcbiAgICB9XG4gIH1cblxuICBleGl0KCkge1xuICAgIGlmKCF0aGlzLmV4aXRlZCkge1xuICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICB0aGlzLmV4aXRlZCA9IHRydWU7XG4gICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uRXhpdFwiKTtcbiAgICB9XG4gIH1cblxuICBkZXN0cm95U25ha2VzKGV4Y2VwdGlvbklkcywgdHlwZXMpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKGV4Y2VwdGlvbklkcyAmJiBBcnJheS5pc0FycmF5KGV4Y2VwdGlvbklkcykgJiYgZXhjZXB0aW9uSWRzLmluZGV4T2YoaSkgPCAwICYmIHR5cGVzLmluZGV4T2YodGhpcy5zbmFrZXNbaV0ucGxheWVyKSA+IC0xKSB0aGlzLnNuYWtlc1tpXS5zZXRHYW1lT3Zlcih0aGlzLnRpY2tzKTtcbiAgICB9XG4gIH1cblxuICBnZXROQlBsYXllcih0eXBlKSB7XG4gICAgbGV0IG51bVBsYXllciA9IDA7XG5cbiAgICBpZih0aGlzLnNuYWtlcyAhPSBudWxsKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYodGhpcy5zbmFrZXNbaV0ucGxheWVyID09IHR5cGUpIHtcbiAgICAgICAgICBudW1QbGF5ZXIrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudW1QbGF5ZXI7XG4gIH1cblxuICBnZXRQbGF5ZXIobnVtLCB0eXBlKSB7XG4gICAgbGV0IG51bVBsYXllciA9IDA7XG5cbiAgICBpZih0aGlzLnNuYWtlcyAhPSBudWxsKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYodGhpcy5zbmFrZXNbaV0ucGxheWVyID09IHR5cGUpIHtcbiAgICAgICAgICBudW1QbGF5ZXIrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG51bVBsYXllciA9PSBudW0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zbmFrZXNbaV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRvVGljaygpO1xuICAgIH0sIHRoaXMuaW5pdGlhbFNwZWVkICogR2FtZUNvbnN0YW50cy5TZXR0aW5nLlRJTUVfTVVMVElQTElFUik7XG4gIH1cblxuICBkb1RpY2soKSB7XG4gICAgaWYoIXRoaXMucGF1c2VkICYmICF0aGlzLmtpbGxlZCkge1xuICAgICAgaWYodGhpcy5sYXN0VGltZSA9PSAwKSB0aGlzLmxhc3RUaW1lID0gdGltZTtcbiAgICAgIHRoaXMudGlja3MrKztcblxuICAgICAgbGV0IHNjb3JlSW5jcmVhc2VkLCBzZXRGcnVpdEVycm9yID0gZmFsc2U7XG5cbiAgICAgIGlmKHRoaXMuZ3JpZCAmJiAoIXRoaXMuZ3JpZC5tYXplIHx8IHRoaXMuZ3JpZC5tYXplRm9yY2VBdXRvIHx8ICgodGhpcy5ncmlkLm1hemUgJiYgKHRoaXMuZ2V0TkJQbGF5ZXIoR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhVTUFOKSA8PSAwICYmIHRoaXMuZ2V0TkJQbGF5ZXIoR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhZQlJJRF9IVU1BTl9BSSkgPD0gMCkpKSB8fCAodGhpcy5ncmlkLm1hemUgJiYgKCh0aGlzLmdldE5CUGxheWVyKEdhbWVDb25zdGFudHMuUGxheWVyVHlwZS5IVU1BTikgPiAwIHx8IHRoaXMuZ2V0TkJQbGF5ZXIoR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhZQlJJRF9IVU1BTl9BSSkgPiAwKSAmJiAodGhpcy5nZXRQbGF5ZXIoMSwgR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhZQlJJRF9IVU1BTl9BSSkgfHwgdGhpcy5nZXRQbGF5ZXIoMSwgR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhVTUFOKSkubGFzdEtleSAhPSAtMSkpKSkge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBpbml0aWFsRGlyZWN0aW9uID0gdGhpcy5zbmFrZXNbaV0uZGlyZWN0aW9uO1xuICAgICAgICAgIGxldCBzZXRGcnVpdCA9IGZhbHNlO1xuICAgICAgICAgIGxldCBnb2xkRnJ1aXQgPSBmYWxzZTtcbiAgICAgICAgICBzZXRGcnVpdEVycm9yID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5zbmFrZXNbaV0ubGFzdFRhaWxNb3ZlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgaWYoIXRoaXMuc25ha2VzW2ldLmdhbWVPdmVyICYmICF0aGlzLnNuYWtlc1tpXS5zY29yZU1heCkge1xuICAgICAgICAgICAgaWYodGhpcy5zbmFrZXNbaV0ucGxheWVyID09IEdhbWVDb25zdGFudHMuUGxheWVyVHlwZS5IVU1BTiB8fCB0aGlzLnNuYWtlc1tpXS5wbGF5ZXIgPT0gR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhZQlJJRF9IVU1BTl9BSSkge1xuICAgICAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5tb3ZlVG8odGhpcy5zbmFrZXNbaV0ubGFzdEtleSk7XG4gICAgICAgICAgICAgIHRoaXMuc25ha2VzW2ldLmxhc3RLZXkgPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNuYWtlc1tpXS5wbGF5ZXIgPT0gR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkFJICYmICghdGhpcy5jbGllbnRTaWRlUHJlZGljdGlvbnNNb2RlIHx8ICh0aGlzLmNsaWVudFNpZGVQcmVkaWN0aW9uc01vZGUgJiYgdGhpcy5zbmFrZXNbaV0uYWlMZXZlbCAhPSBHYW1lQ29uc3RhbnRzLkFpTGV2ZWwuUkFORE9NKSkpIHtcbiAgICAgICAgICAgICAgdGhpcy5zbmFrZXNbaV0ubW92ZVRvKHRoaXMuc25ha2VzW2ldLmFpKCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgaGVhZFNuYWtlUG9zID0gdGhpcy5zbmFrZXNbaV0uZ2V0SGVhZFBvc2l0aW9uKCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc25ha2VzW2ldLnBsYXllciA9PSBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuSFlCUklEX0hVTUFOX0FJICYmIHRoaXMuZ3JpZC5pc0RlYWRQb3NpdGlvbih0aGlzLnNuYWtlc1tpXS5nZXROZXh0UG9zaXRpb24oaGVhZFNuYWtlUG9zLCB0aGlzLnNuYWtlc1tpXS5kaXJlY3Rpb24pKSkge1xuICAgICAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5kaXJlY3Rpb24gPSBpbml0aWFsRGlyZWN0aW9uO1xuICAgICAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5tb3ZlVG8odGhpcy5zbmFrZXNbaV0uYWkoKSk7XG4gICAgICAgICAgICAgIHRoaXMuc25ha2VzW2ldLmxhc3RLZXkgPSAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGVhZFNuYWtlUG9zID0gdGhpcy5zbmFrZXNbaV0uZ2V0TmV4dFBvc2l0aW9uKGhlYWRTbmFrZVBvcywgdGhpcy5zbmFrZXNbaV0uZGlyZWN0aW9uKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYodGhpcy5ncmlkLmlzRGVhZFBvc2l0aW9uKGhlYWRTbmFrZVBvcykpIHtcbiAgICAgICAgICAgICAgdGhpcy5zbmFrZXNbaV0uc2V0R2FtZU92ZXIodGhpcy50aWNrcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZih0aGlzLmdyaWQuZ2V0KGhlYWRTbmFrZVBvcykgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVCB8fCB0aGlzLmdyaWQuZ2V0KGhlYWRTbmFrZVBvcykgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5ncmlkLmdldChoZWFkU25ha2VQb3MpID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc25ha2VzW2ldLnNjb3JlKys7XG4gICAgICAgICAgICAgICAgICB0aGlzLmdyaWQuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIHRoaXMuZ3JpZC5mcnVpdFBvcyk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmdyaWQuZnJ1aXRQb3MgPSBudWxsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLmdyaWQuZ2V0KGhlYWRTbmFrZVBvcykgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5zY29yZSArPSAzO1xuICAgICAgICAgICAgICAgICAgdGhpcy5ncmlkLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCB0aGlzLmdyaWQuZnJ1aXRQb3NHb2xkKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZ3JpZC5mcnVpdFBvc0dvbGQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgZ29sZEZydWl0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzY29yZUluY3JlYXNlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5zbmFrZXNbaV0uaW5zZXJ0KGhlYWRTbmFrZVBvcyk7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmdyaWQubWF6ZSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lTWF6ZVdpbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLmdhbWVGaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zbmFrZXNbaV0uaGFzTWF4U2NvcmUoKSAmJiB0aGlzLnNuYWtlcy5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5zY29yZU1heCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLnNuYWtlc1tpXS5zY29yZU1heCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdGhpcy5udW1GcnVpdCsrO1xuICAgICAgICAgICAgICAgICAgaWYoIWdvbGRGcnVpdCkgc2V0RnJ1aXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuc25ha2VzLmxlbmd0aCA8PSAxICYmIHRoaXMucHJvZ3Jlc3NpdmVTcGVlZCAmJiB0aGlzLnNuYWtlc1tpXS5zY29yZSA+IDAgJiYgdGhpcy5pbml0aWFsU3BlZWQgPiAxKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxTcGVlZCA9IE1hdGguY2VpbCgoKC10aGlzLmluaXRpYWxTcGVlZFVudG91Y2hlZCAvIDEwMCkgKiB0aGlzLnNuYWtlc1tpXS5zY29yZSkgKyB0aGlzLmluaXRpYWxTcGVlZFVudG91Y2hlZCk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxTcGVlZCA9IHRoaXMuaW5pdGlhbFNwZWVkIDwgMSA/IDEgOiB0aGlzLmluaXRpYWxTcGVlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbmFrZXNbaV0uaW5zZXJ0KGhlYWRTbmFrZVBvcyk7XG5cbiAgICAgICAgICAgICAgICBpZighdGhpcy5ncmlkLm1hemUpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc25ha2VzW2ldLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zbmFrZXNbaV0ubGFzdFRhaWxNb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYoIXRoaXMuc2NvcmVNYXggJiYgc2V0RnJ1aXQgJiYgIXRoaXMuY2xpZW50U2lkZVByZWRpY3Rpb25zTW9kZSkge1xuICAgICAgICAgICAgc2V0RnJ1aXRFcnJvciA9ICF0aGlzLmdyaWQuc2V0RnJ1aXQodGhpcy5zbmFrZXMubGVuZ3RoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZighdGhpcy5zY29yZU1heCAmJiAhc2V0RnJ1aXRFcnJvciAmJiAodGhpcy5ncmlkLmRldGVjdENvcnJpZG9yKHRoaXMuZ3JpZC5mcnVpdFBvcykgfHwgdGhpcy5ncmlkLmlzRnJ1aXRTdXJyb3VuZGVkKHRoaXMuZ3JpZC5mcnVpdFBvcywgdHJ1ZSkpICYmICF0aGlzLmNsaWVudFNpZGVQcmVkaWN0aW9uc01vZGUpIHtcbiAgICAgICAgICBzZXRGcnVpdEVycm9yID0gIXRoaXMuZ3JpZC5zZXRGcnVpdCh0aGlzLnNuYWtlcy5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIXRoaXMuc2NvcmVNYXggJiYgdGhpcy5ncmlkLmZydWl0UG9zR29sZCAhPSBudWxsICYmICh0aGlzLmdyaWQuZGV0ZWN0Q29ycmlkb3IodGhpcy5ncmlkLmZydWl0UG9zR29sZCkgfHwgdGhpcy5ncmlkLmlzRnJ1aXRTdXJyb3VuZGVkKHRoaXMuZ3JpZC5mcnVpdFBvc0dvbGQsIHRydWUpKSkge1xuICAgICAgICAgIHRoaXMuZ3JpZC5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgdGhpcy5ncmlkLmZydWl0UG9zR29sZCk7XG4gICAgICAgICAgdGhpcy5ncmlkLmZydWl0UG9zR29sZCA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbmJPdmVyID0gMDtcblxuICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5zbmFrZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAodGhpcy5zbmFrZXNbal0uZ2FtZU92ZXIgfHwgdGhpcy5zbmFrZXNbal0uc2NvcmVNYXgpICYmIG5iT3ZlcisrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2tpbmcgaWYgdGhlIEFJcyBhcmUgYWxsIHN0dWNrXG4gICAgICAgIGxldCBlbmRHYW1lQUlTdHVjayA9IGZhbHNlO1xuXG4gICAgICAgIGZvcihsZXQgayA9IDA7IGsgPCB0aGlzLnNuYWtlcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgIGlmKCF0aGlzLnNuYWtlc1trXS5nYW1lT3ZlciAmJiB0aGlzLnNuYWtlc1trXS5pc0FJU3R1Y2soMSwgMSkpIHtcbiAgICAgICAgICAgIHRoaXMuYWlTdHVjayA9IHRydWU7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuc25ha2VzW2tdLmlzQUlTdHVjayh0aGlzLmFpU3R1Y2tMaW1pdCwgdGhpcy5haVN0dWNrTGltaXQpKSB7IC8vIExpbWl0IG9mIGFpU3R1Y2tMaW1pdCBsb29wcyAtIGVuZCB0aGUgZ2FtZVxuICAgICAgICAgICAgICBlbmRHYW1lQUlTdHVjayA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbmRHYW1lQUlTdHVjayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZigoKHRoaXMuc25ha2VzW2tdLnBsYXllciA9PSBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuSFVNQU4gfHwgdGhpcy5zbmFrZXNba10ucGxheWVyID09IEdhbWVDb25zdGFudHMuUGxheWVyVHlwZS5IWUJSSURfSFVNQU5fQUkpICYmICF0aGlzLnNuYWtlc1trXS5nYW1lT3ZlcikgfHwgKHRoaXMuc25ha2VzW2tdLnBsYXllciA9PSBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuQUkgJiYgIXRoaXMuc25ha2VzW2tdLmdhbWVPdmVyKSkge1xuICAgICAgICAgICAgdGhpcy5haVN0dWNrID0gZmFsc2U7XG4gICAgICAgICAgICBlbmRHYW1lQUlTdHVjayA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfSBcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG5iT3ZlciA+PSB0aGlzLnNuYWtlcy5sZW5ndGggfHwgc2V0RnJ1aXRFcnJvciB8fCBlbmRHYW1lQUlTdHVjaykge1xuICAgICAgICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgICAgICAgaWYodGhpcy5zbmFrZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lRmluaXNoZWQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVhY3Rvci5kaXNwYXRjaEV2ZW50KFwib25VcGRhdGVcIik7XG5cbiAgICAgICAgaWYoc2NvcmVJbmNyZWFzZWQpIHtcbiAgICAgICAgICB0aGlzLnJlYWN0b3IuZGlzcGF0Y2hFdmVudChcIm9uU2NvcmVJbmNyZWFzZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy50aWNrKCk7XG4gICAgfVxuICB9XG5cbiAgb25SZXNldChjYWxsYmFjaykge1xuICAgIHRoaXMucmVhY3Rvci5hZGRFdmVudExpc3RlbmVyKFwib25SZXNldFwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBvblN0YXJ0KGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWFjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJvblN0YXJ0XCIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uQ29udGludWUoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uQ29udGludWVcIiwgY2FsbGJhY2spO1xuICB9XG5cbiAgb25TdG9wKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWFjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJvblN0b3BcIiwgY2FsbGJhY2spO1xuICB9XG5cbiAgb25QYXVzZShjYWxsYmFjaykge1xuICAgIHRoaXMucmVhY3Rvci5hZGRFdmVudExpc3RlbmVyKFwib25QYXVzZVwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBvbkV4aXQoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uRXhpdFwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBvbktpbGwoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uS2lsbFwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBvblNjb3JlSW5jcmVhc2VkKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWFjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJvblNjb3JlSW5jcmVhc2VkXCIsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIG9uVXBkYXRlKGNhbGxiYWNrKSB7XG4gICAgdGhpcy5yZWFjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJvblVwZGF0ZVwiLCBjYWxsYmFjayk7XG4gIH1cblxuICBvblVwZGF0ZUNvdW50ZXIoY2FsbGJhY2spIHtcbiAgICB0aGlzLnJlYWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcIm9uVXBkYXRlQ291bnRlclwiLCBjYWxsYmFjayk7XG4gIH1cbn0iLCIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE5LTIwMjAgRWxpYXN0aWsgKGVsaWFzdGlrc29mdHMuY29tKVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFwiU25ha2VJQVwiLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggXCJTbmFrZUlBXCIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbmltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IFBvc2l0aW9uIGZyb20gXCIuL1Bvc2l0aW9uXCI7XG5pbXBvcnQgR3JpZCBmcm9tIFwiLi9HcmlkXCI7XG5pbXBvcnQgU25ha2UgZnJvbSBcIi4vU25ha2VcIjtcbmltcG9ydCBHYW1lRW5naW5lIGZyb20gXCIuL0dhbWVFbmdpbmUuanNcIjtcblxubGV0IGdhbWU7XG5cbmZ1bmN0aW9uIGNvcHlTbmFrZXMoc25ha2VzKSB7XG4gIGNvbnN0IGNvcHkgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHNuYWtlcykpO1xuXG4gIGlmKGNvcHkpIHtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgY29weS5sZW5ndGg7IGkrKykge1xuICAgICAgZGVsZXRlIGNvcHlbaV1bXCJncmlkXCJdO1xuICAgICAgaWYoc25ha2VzW2ldLnNuYWtlQUkgJiYgc25ha2VzW2ldLnNuYWtlQUkuYWlMZXZlbFRleHQpIGNvcHlbaV1bXCJzbmFrZUFJXCJdW1wiYWlMZXZlbFRleHRcIl0gPSBzbmFrZXNbaV0uc25ha2VBSS5haUxldmVsVGV4dDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gY29weUdyaWQoZ3JpZCkge1xuICBjb25zdCBjb3B5ID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShncmlkKSk7XG5cbiAgaWYoY29weSkge1xuICAgIGNvcHkucm5nR3JpZCA9IG51bGw7XG4gICAgY29weS5ybmdHYW1lID0gbnVsbDtcbiAgfVxuXG4gIHJldHVybiBjb3B5O1xufVxuXG5mdW5jdGlvbiBwYXJzZVNuYWtlcyhzbmFrZXMsIGdyaWQpIHtcbiAgaWYoZ2FtZSkge1xuICAgIGdyaWQgPSBncmlkICE9IG51bGwgPyBncmlkIDogZ2FtZS5ncmlkO1xuICB9XG4gIFxuICBncmlkID0gT2JqZWN0LmFzc2lnbihuZXcgR3JpZCgpLCBncmlkKTtcbiAgXG4gIGlmKCFzbmFrZXMgJiYgZ2FtZSkge1xuICAgIHNuYWtlcyA9IGdhbWUuc25ha2VzO1xuICB9XG4gIFxuICBmb3IobGV0IGkgPSAwOyBpIDwgc25ha2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgc25ha2VzW2ldLmdyaWQgPSBncmlkO1xuICAgIHNuYWtlc1tpXSA9IE9iamVjdC5hc3NpZ24obmV3IFNuYWtlKCksIHNuYWtlc1tpXSk7XG5cbiAgICBmb3IobGV0IGogPSAwOyBqIDwgc25ha2VzW2ldLnF1ZXVlLmxlbmd0aDsgaisrKSB7XG4gICAgICBzbmFrZXNbaV0ucXVldWVbal0gPSBPYmplY3QuYXNzaWduKG5ldyBQb3NpdGlvbigpLCBzbmFrZXNbaV0ucXVldWVbal0pO1xuICAgIH1cblxuICAgIHNuYWtlc1tpXS5pbml0QUkoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ3JpZDogZ3JpZCxcbiAgICBzbmFrZXM6IHNuYWtlc1xuICB9O1xufVxuXG5vbm1lc3NhZ2UgPSBlID0+IHtcbiAgY29uc3QgZGF0YSA9IGUuZGF0YTtcblxuICBpZihkYXRhLmxlbmd0aCA+IDEgJiYgZGF0YVswXSA9PSBcImluaXRcIikge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlU25ha2VzKGRhdGFbMV1bXCJzbmFrZXNcIl0sIGRhdGFbMV1bXCJncmlkXCJdKTtcbiAgICBjb25zdCBncmlkID0gcGFyc2VkW1wiZ3JpZFwiXTtcbiAgICBjb25zdCBzbmFrZXMgPSBwYXJzZWRbXCJzbmFrZXNcIl07XG5cbiAgICBnYW1lID0gbmV3IEdhbWVFbmdpbmUoZ3JpZCwgc25ha2VzLCBkYXRhWzFdW1wic3BlZWRcIl0sIGRhdGFbMV1bXCJlbmFibGVQYXVzZVwiXSwgZGF0YVsxXVtcImVuYWJsZVJldHJ5XCJdLCBkYXRhWzFdW1wicHJvZ3Jlc3NpdmVTcGVlZFwiXSk7XG4gICAgZ2FtZS5pbml0KCk7XG5cbiAgICBzZWxmLnBvc3RNZXNzYWdlKFtcImluaXRcIiwge1xuICAgICAgXCJzbmFrZXNcIjogY29weVNuYWtlcyhnYW1lLnNuYWtlcyksXG4gICAgICBcImdyaWRcIjogY29weUdyaWQoZ2FtZS5ncmlkKSxcbiAgICAgIFwiZW5hYmxlUGF1c2VcIjogZ2FtZS5lbmFibGVQYXVzZSxcbiAgICAgIFwiZW5hYmxlUmV0cnlcIjogZ2FtZS5lbmFibGVSZXRyeSxcbiAgICAgIFwicHJvZ3Jlc3NpdmVTcGVlZFwiOiBnYW1lLnByb2dyZXNzaXZlU3BlZWQsXG4gICAgICBcIm9mZnNldEZyYW1lXCI6IGdhbWUuc3BlZWQgKiBHYW1lQ29uc3RhbnRzLlNldHRpbmcuVElNRV9NVUxUSVBMSUVSLFxuICAgICAgXCJlcnJvck9jY3VycmVkXCI6IGdhbWUuZXJyb3JPY2N1cnJlZFxuICAgIH1dKTtcblxuICAgIGdhbWUub25SZXNldCgoKSA9PiB7XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKFtcInJlc2V0XCIsIHtcbiAgICAgICAgXCJwYXVzZWRcIjogZ2FtZS5wYXVzZWQsXG4gICAgICAgIFwiaXNSZXNldGVkXCI6IGdhbWUuaXNSZXNldGVkLFxuICAgICAgICBcImV4aXRlZFwiOiBnYW1lLmV4aXRlZCxcbiAgICAgICAgXCJzbmFrZXNcIjogY29weVNuYWtlcyhnYW1lLnNuYWtlcyksXG4gICAgICAgIFwiZ3JpZFwiOiBjb3B5R3JpZChnYW1lLmdyaWQpLFxuICAgICAgICBcIm51bUZydWl0XCI6IGdhbWUubnVtRnJ1aXQsXG4gICAgICAgIFwidGlja3NcIjogZ2FtZS50aWNrcyxcbiAgICAgICAgXCJzY29yZU1heFwiOiBnYW1lLnNjb3JlTWF4LFxuICAgICAgICBcImdhbWVPdmVyXCI6IGdhbWUuZ2FtZU92ZXIsXG4gICAgICAgIFwiZ2FtZUZpbmlzaGVkXCI6IGdhbWUuZ2FtZUZpbmlzaGVkLFxuICAgICAgICBcImdhbWVNYXplV2luXCI6IGdhbWUuZ2FtZU1hemVXaW4sXG4gICAgICAgIFwic3RhcnRpbmdcIjogZ2FtZS5zdGFydGluZyxcbiAgICAgICAgXCJpbml0aWFsU3BlZWRcIjogZ2FtZS5pbml0aWFsU3BlZWQsXG4gICAgICAgIFwic3BlZWRcIjogZ2FtZS5zcGVlZCxcbiAgICAgICAgXCJvZmZzZXRGcmFtZVwiOiBnYW1lLnNwZWVkICogR2FtZUNvbnN0YW50cy5TZXR0aW5nLlRJTUVfTVVMVElQTElFUixcbiAgICAgICAgXCJjb25maXJtUmVzZXRcIjogZmFsc2UsXG4gICAgICAgIFwiY29uZmlybUV4aXRcIjogZmFsc2UsXG4gICAgICAgIFwiZ2V0SW5mb3NcIjogZmFsc2UsXG4gICAgICAgIFwiZ2V0SW5mb3NHYW1lXCI6IGZhbHNlLFxuICAgICAgICBcImVycm9yT2NjdXJyZWRcIjogZ2FtZS5lcnJvck9jY3VycmVkLFxuICAgICAgICBcImFpU3R1Y2tcIjogZ2FtZS5haVN0dWNrLFxuICAgICAgICBcInByZWNBaVN0dWNrXCI6IGZhbHNlXG4gICAgICB9XSk7XG4gICAgfSk7XG5cbiAgICBnYW1lLm9uU3RhcnQoKCkgPT4ge1xuICAgICAgc2VsZi5wb3N0TWVzc2FnZShbXCJzdGFydFwiLCB7XG4gICAgICAgIFwic25ha2VzXCI6IGNvcHlTbmFrZXMoZ2FtZS5zbmFrZXMpLFxuICAgICAgICBcImdyaWRcIjogY29weUdyaWQoZ2FtZS5ncmlkKSxcbiAgICAgICAgXCJzdGFydGluZ1wiOiBnYW1lLnN0YXJ0aW5nLFxuICAgICAgICBcImNvdW50QmVmb3JlUGxheVwiOiBnYW1lLmNvdW50QmVmb3JlUGxheSxcbiAgICAgICAgXCJwYXVzZWRcIjogZ2FtZS5wYXVzZWQsXG4gICAgICAgIFwiaXNSZXNldGVkXCI6IGdhbWUuaXNSZXNldGVkLFxuICAgICAgICBcImNvbmZpcm1SZXNldFwiOiBmYWxzZSxcbiAgICAgICAgXCJjb25maXJtRXhpdFwiOiBmYWxzZSxcbiAgICAgICAgXCJnZXRJbmZvc1wiOiBmYWxzZSxcbiAgICAgICAgXCJnZXRJbmZvc0dhbWVcIjogZmFsc2UsXG4gICAgICAgIFwiZXJyb3JPY2N1cnJlZFwiOiBnYW1lLmVycm9yT2NjdXJyZWRcbiAgICAgIH1dKTtcbiAgICB9KTtcblxuICAgIGdhbWUub25QYXVzZSgoKSA9PiB7XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKFtcInBhdXNlXCIsIHtcbiAgICAgICAgXCJwYXVzZWRcIjogZ2FtZS5wYXVzZWQsXG4gICAgICAgIFwiY29uZmlybVJlc2V0XCI6IGZhbHNlLFxuICAgICAgICBcImNvbmZpcm1FeGl0XCI6IGZhbHNlLFxuICAgICAgICBcImdldEluZm9zXCI6IGZhbHNlLFxuICAgICAgICBcImdldEluZm9zR2FtZVwiOiBmYWxzZSxcbiAgICAgICAgXCJlcnJvck9jY3VycmVkXCI6IGdhbWUuZXJyb3JPY2N1cnJlZFxuICAgICAgfV0pO1xuICAgIH0pO1xuXG4gICAgZ2FtZS5vbkNvbnRpbnVlKCgpID0+IHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoW1wiY29udGludWVcIiwge1xuICAgICAgICBcImNvbmZpcm1SZXNldFwiOiBmYWxzZSxcbiAgICAgICAgXCJjb25maXJtRXhpdFwiOiBmYWxzZSxcbiAgICAgICAgXCJnZXRJbmZvc1wiOiBmYWxzZSxcbiAgICAgICAgXCJnZXRJbmZvc0dhbWVcIjogZmFsc2UsXG4gICAgICAgIFwiZXJyb3JPY2N1cnJlZFwiOiBnYW1lLmVycm9yT2NjdXJyZWRcbiAgICAgIH1dKTtcbiAgICB9KTtcblxuICAgIGdhbWUub25TdG9wKCgpID0+IHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoW1wic3RvcFwiLCB7XG4gICAgICAgIFwicGF1c2VkXCI6IGdhbWUucGF1c2VkLFxuICAgICAgICBcInNjb3JlTWF4XCI6IGdhbWUuc2NvcmVNYXgsXG4gICAgICAgIFwiZ2FtZU92ZXJcIjogZ2FtZS5nYW1lT3ZlcixcbiAgICAgICAgXCJnYW1lRmluaXNoZWRcIjogZ2FtZS5nYW1lRmluaXNoZWQsXG4gICAgICAgIFwiY29uZmlybVJlc2V0XCI6IGZhbHNlLFxuICAgICAgICBcImNvbmZpcm1FeGl0XCI6IGZhbHNlLFxuICAgICAgICBcImdldEluZm9zXCI6IGZhbHNlLFxuICAgICAgICBcImdldEluZm9zR2FtZVwiOiBmYWxzZSxcbiAgICAgICAgXCJlcnJvck9jY3VycmVkXCI6IGdhbWUuZXJyb3JPY2N1cnJlZFxuICAgICAgfV0pO1xuICAgIH0pO1xuXG4gICAgZ2FtZS5vbkV4aXQoKCkgPT4ge1xuICAgICAgc2VsZi5wb3N0TWVzc2FnZShbXCJleGl0XCIsIHtcbiAgICAgICAgXCJwYXVzZWRcIjogZ2FtZS5wYXVzZWQsXG4gICAgICAgIFwiZ2FtZU92ZXJcIjogZ2FtZS5nYW1lT3ZlcixcbiAgICAgICAgXCJnYW1lRmluaXNoZWRcIjogZ2FtZS5nYW1lRmluaXNoZWQsXG4gICAgICAgIFwiZXhpdGVkXCI6IGdhbWUuZXhpdGVkLFxuICAgICAgICBcImNvbmZpcm1SZXNldFwiOiBmYWxzZSxcbiAgICAgICAgXCJjb25maXJtRXhpdFwiOiBmYWxzZSxcbiAgICAgICAgXCJnZXRJbmZvc1wiOiBmYWxzZSxcbiAgICAgICAgXCJnZXRJbmZvc0dhbWVcIjogZmFsc2UsXG4gICAgICAgIFwiZXJyb3JPY2N1cnJlZFwiOiBnYW1lLmVycm9yT2NjdXJyZWRcbiAgICAgIH1dKTtcbiAgICB9KTtcblxuICAgIGdhbWUub25LaWxsKCgpID0+IHtcbiAgICAgIHNlbGYucG9zdE1lc3NhZ2UoW1wia2lsbFwiLCB7XG4gICAgICAgIFwicGF1c2VkXCI6IGdhbWUucGF1c2VkLFxuICAgICAgICBcImdhbWVPdmVyXCI6IGdhbWUuZ2FtZU92ZXIsXG4gICAgICAgIFwia2lsbGVkXCI6IGdhbWUua2lsbGVkLFxuICAgICAgICBcInNuYWtlc1wiOiBjb3B5U25ha2VzKGdhbWUuc25ha2VzKSxcbiAgICAgICAgXCJncmlkXCI6IGNvcHlHcmlkKGdhbWUuZ3JpZCksXG4gICAgICAgIFwiZ2FtZUZpbmlzaGVkXCI6IGdhbWUuZ2FtZUZpbmlzaGVkLFxuICAgICAgICBcImNvbmZpcm1SZXNldFwiOiBmYWxzZSxcbiAgICAgICAgXCJjb25maXJtRXhpdFwiOiBmYWxzZSxcbiAgICAgICAgXCJnZXRJbmZvc1wiOiBmYWxzZSxcbiAgICAgICAgXCJnZXRJbmZvc0dhbWVcIjogZmFsc2UsXG4gICAgICAgIFwiZXJyb3JPY2N1cnJlZFwiOiBnYW1lLmVycm9yT2NjdXJyZWRcbiAgICAgIH1dKTtcbiAgICB9KTtcblxuICAgIGdhbWUub25TY29yZUluY3JlYXNlZCgoKSA9PiB7XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKFtcInNjb3JlSW5jcmVhc2VkXCIsIHt9XSk7XG4gICAgfSk7XG4gICAgXG4gICAgZ2FtZS5vblVwZGF0ZSgoKSA9PiB7XG4gICAgICBzZWxmLnBvc3RNZXNzYWdlKFtcInVwZGF0ZVwiLCB7XG4gICAgICAgIFwicGF1c2VkXCI6IGdhbWUucGF1c2VkLFxuICAgICAgICBcImlzUmVzZXRlZFwiOiBnYW1lLmlzUmVzZXRlZCxcbiAgICAgICAgXCJleGl0ZWRcIjogZ2FtZS5leGl0ZWQsXG4gICAgICAgIFwic25ha2VzXCI6IGNvcHlTbmFrZXMoZ2FtZS5zbmFrZXMpLFxuICAgICAgICBcImdyaWRcIjogY29weUdyaWQoZ2FtZS5ncmlkKSxcbiAgICAgICAgXCJudW1GcnVpdFwiOiBnYW1lLm51bUZydWl0LFxuICAgICAgICBcInRpY2tzXCI6IGdhbWUudGlja3MsXG4gICAgICAgIFwic2NvcmVNYXhcIjogZ2FtZS5zY29yZU1heCxcbiAgICAgICAgXCJnYW1lT3ZlclwiOiBnYW1lLmdhbWVPdmVyLFxuICAgICAgICBcImdhbWVGaW5pc2hlZFwiOiBnYW1lLmdhbWVGaW5pc2hlZCxcbiAgICAgICAgXCJnYW1lTWF6ZVdpblwiOiBnYW1lLmdhbWVNYXplV2luLFxuICAgICAgICBcInN0YXJ0aW5nXCI6IGdhbWUuc3RhcnRpbmcsXG4gICAgICAgIFwiaW5pdGlhbFNwZWVkXCI6IGdhbWUuaW5pdGlhbFNwZWVkLFxuICAgICAgICBcInNwZWVkXCI6IGdhbWUuc3BlZWQsXG4gICAgICAgIFwiY291bnRCZWZvcmVQbGF5XCI6IGdhbWUuY291bnRCZWZvcmVQbGF5LFxuICAgICAgICBcIm51bUZydWl0XCI6IGdhbWUubnVtRnJ1aXQsXG4gICAgICAgIFwib2Zmc2V0RnJhbWVcIjogMCxcbiAgICAgICAgXCJlcnJvck9jY3VycmVkXCI6IGdhbWUuZXJyb3JPY2N1cnJlZCxcbiAgICAgICAgXCJhaVN0dWNrXCI6IGdhbWUuYWlTdHVja1xuICAgICAgfV0pO1xuICAgIH0pO1xuXG4gICAgZ2FtZS5vblVwZGF0ZUNvdW50ZXIoKCkgPT4ge1xuICAgICAgc2VsZi5wb3N0TWVzc2FnZShbXCJ1cGRhdGVDb3VudGVyXCIsIHtcbiAgICAgICAgXCJwYXVzZWRcIjogZ2FtZS5wYXVzZWQsXG4gICAgICAgIFwiaXNSZXNldGVkXCI6IGdhbWUuaXNSZXNldGVkLFxuICAgICAgICBcImV4aXRlZFwiOiBnYW1lLmV4aXRlZCxcbiAgICAgICAgXCJzbmFrZXNcIjogY29weVNuYWtlcyhnYW1lLnNuYWtlcyksXG4gICAgICAgIFwiZ3JpZFwiOiBjb3B5R3JpZChnYW1lLmdyaWQpLFxuICAgICAgICBcIm51bUZydWl0XCI6IGdhbWUubnVtRnJ1aXQsXG4gICAgICAgIFwidGlja3NcIjogZ2FtZS50aWNrcyxcbiAgICAgICAgXCJzY29yZU1heFwiOiBnYW1lLnNjb3JlTWF4LFxuICAgICAgICBcImdhbWVPdmVyXCI6IGdhbWUuZ2FtZU92ZXIsXG4gICAgICAgIFwiZ2FtZUZpbmlzaGVkXCI6IGdhbWUuZ2FtZUZpbmlzaGVkLFxuICAgICAgICBcImdhbWVNYXplV2luXCI6IGdhbWUuZ2FtZU1hemVXaW4sXG4gICAgICAgIFwic3RhcnRpbmdcIjogZ2FtZS5zdGFydGluZyxcbiAgICAgICAgXCJpbml0aWFsU3BlZWRcIjogZ2FtZS5pbml0aWFsU3BlZWQsXG4gICAgICAgIFwic3BlZWRcIjogZ2FtZS5zcGVlZCxcbiAgICAgICAgXCJjb3VudEJlZm9yZVBsYXlcIjogZ2FtZS5jb3VudEJlZm9yZVBsYXksXG4gICAgICAgIFwibnVtRnJ1aXRcIjogZ2FtZS5udW1GcnVpdCxcbiAgICAgICAgXCJlcnJvck9jY3VycmVkXCI6IGdhbWUuZXJyb3JPY2N1cnJlZFxuICAgICAgfV0pO1xuICAgIH0pO1xufSBlbHNlIGlmKGdhbWUgIT0gbnVsbCkge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBkYXRhWzBdO1xuXG4gICAgc3dpdGNoKG1lc3NhZ2UpIHtcbiAgICAgIGNhc2UgXCJyZXNldFwiOlxuICAgICAgICBnYW1lLnJlc2V0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInN0YXJ0XCI6XG4gICAgICAgIGdhbWUuc3RhcnQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic3RvcFwiOlxuICAgICAgICBnYW1lLnN0b3AoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZmluaXNoXCI6XG4gICAgICAgIGdhbWUuc3RvcCh0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic3RvcFwiOlxuICAgICAgICBnYW1lLnN0b3AoZmFsc2UpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJwYXVzZVwiOlxuICAgICAgICBnYW1lLnBhdXNlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImtpbGxcIjpcbiAgICAgICAgZ2FtZS5raWxsKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInRpY2tcIjpcbiAgICAgICAgZ2FtZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgZ2FtZS5jb3VudEJlZm9yZVBsYXkgPSAtMTtcbiAgICAgICAgZ2FtZS50aWNrKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInBpbmdcIjpcbiAgICAgICAgc2VsZi5wb3N0TWVzc2FnZShcInBvbmdcIik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImV4aXRcIjpcbiAgICAgICAgZ2FtZS5leGl0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZvcmNlU3RhcnRcIjpcbiAgICAgICAgZ2FtZS5mb3JjZVN0YXJ0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImtleVwiOlxuICAgICAgICBpZihkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBnYW1lLmxhc3RLZXkgPSBkYXRhWzFdO1xuXG4gICAgICAgICAgY29uc3QgcGxheWVyU25ha2UgPSBnYW1lLmdldFBsYXllcigxLCBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuSFVNQU4pIHx8IGdhbWUuZ2V0UGxheWVyKDEsIEdhbWVDb25zdGFudHMuUGxheWVyVHlwZS5IWUJSSURfSFVNQU5fQUkpO1xuXG4gICAgICAgICAgaWYocGxheWVyU25ha2UgIT0gbnVsbCAmJiBwbGF5ZXJTbmFrZS5sYXN0S2V5ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBsYXllclNuYWtlLmxhc3RLZXkgPSBkYXRhWzFdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cGRhdGVcIjpcbiAgICAgICAgaWYoZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgaWYoZGF0YVsxXVtcImtleVwiXSA9PSBcInNuYWtlc1wiKSB7XG4gICAgICAgICAgICBjb25zdCBkID0gcGFyc2VTbmFrZXMoZGF0YVsxXVtcImRhdGFcIl0pO1xuICAgICAgICAgICAgaWYoZCkgZ2FtZS5zbmFrZXMgPSBkLnNuYWtlcztcbiAgICAgICAgICB9IGVsc2UgaWYoZGF0YVsxXVtcImtleVwiXSA9PSBcImdyaWRcIikge1xuICAgICAgICAgICAgY29uc3QgZCA9IHBhcnNlU25ha2VzKG51bGwsIGRhdGFbMV1bXCJkYXRhXCJdKTtcbiAgICAgICAgICAgIGlmKGQpIGdhbWUuZ3JpZCA9IGQuZ3JpZDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2FtZVtkYXRhWzFdW1wia2V5XCJdXSA9IGRhdGFbMV1bXCJkYXRhXCJdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkZXN0cm95U25ha2VzXCI6XG4gICAgICAgIGlmKGRhdGFbMV0gJiYgZGF0YVsyXSkgZ2FtZS5kZXN0cm95U25ha2VzKGRhdGFbMV0sIGRhdGFbMl0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0gZWxzZSBpZihkYXRhID09IFwicGluZ1wiKSB7XG4gICAgc2VsZi5wb3N0TWVzc2FnZShcInBvbmdcIik7XG4gIH1cbn07XG5cbnNlbGYucG9zdE1lc3NhZ2UoXCJyZWFkeVwiKTsiLCIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE5LTIwMjAgRWxpYXN0aWsgKGVsaWFzdGlrc29mdHMuY29tKVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFwiU25ha2VJQVwiLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggXCJTbmFrZUlBXCIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgcmFuZFJhbmdlOiBmdW5jdGlvbihtaW4sIG1heCwgcm5nKSB7IC8vIFJldHVybiBhbiBpbnRlZ2VyIGJldHdlZW4gbWluIChpbmNsdXNpdmUpIGFuZCBtYXggKGluY2x1c2l2ZSlcbiAgICByZXR1cm4gTWF0aC5mbG9vcigocm5nID8gcm5nKCkgOiBNYXRoLnJhbmRvbSgpKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG4gIH0sXG4gIGFkZEh1ZTogZnVuY3Rpb24oaHVlLCBhZGQpIHtcbiAgICBjb25zdCByZXMgPSBodWUgKyBhZGQ7XG4gIFxuICAgIGlmKHJlcyA+IDM2MCkge1xuICAgICAgcmV0dXJuIChyZXMgLSAzNjApO1xuICAgIH0gZWxzZSBpZihyZXMgPCAwKSB7XG4gICAgICByZXR1cm4gKDM2MCArIHJlcyk7XG4gICAgfVxuICBcbiAgICByZXR1cm4gcmVzO1xuICB9LFxuICBzaHVmZmxlOiBmdW5jdGlvbihhLCBybmcpIHtcbiAgICBsZXQgaiwgeDtcbiAgICBcbiAgICBmb3IobGV0IGkgPSBhLmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcbiAgICAgIGogPSBNYXRoLmZsb29yKChybmcgPyBybmcoKSA6IE1hdGgucmFuZG9tKCkpICogKGkgKyAxKSk7XG4gICAgICB4ID0gYVtpXTtcbiAgICAgIGFbaV0gPSBhW2pdO1xuICAgICAgYVtqXSA9IHg7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiBhO1xuICB9LFxuICBtaWxsaXNlY29uZHNGb3JtYXQ6IGZ1bmN0aW9uKG1pbGxpc2Vjb25kcykge1xuICAgIG1pbGxpc2Vjb25kcyAvPSAxMDAwO1xuICAgIHJldHVybiAoXCIwXCIgKyBNYXRoLnRydW5jKG1pbGxpc2Vjb25kcyAvIDYwKSkuc2xpY2UoLTIpICsgXCI6XCIgKyAoXCIwXCIgKyBNYXRoLnRydW5jKG1pbGxpc2Vjb25kcyAlIDYwKSkuc2xpY2UoLTIpO1xuICB9LFxuICBzZWNvbmRzRm9ybWF0OiBmdW5jdGlvbihzZWNvbmRzKSB7XG4gICAgcmV0dXJuIHRoaXMubWlsbGlzZWNvbmRzRm9ybWF0KHNlY29uZHMgKiAxMDAwKTtcbiAgfVxufSIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuaW1wb3J0IEdhbWVVdGlscyBmcm9tIFwiLi9HYW1lVXRpbHNcIjtcbmltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gXCIuL0NvbnN0YW50c1wiO1xuaW1wb3J0IFBvc2l0aW9uIGZyb20gXCIuL1Bvc2l0aW9uXCI7XG5pbXBvcnQgc2VlZHJhbmRvbSBmcm9tIFwic2VlZHJhbmRvbVwiO1xuaW1wb3J0ICogYXMgTG93bGlnaHQgZnJvbSBcIi4uLy4uL2xpYnMvbG93bGlnaHQuYXN0YXIubWluXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBnZW5lcmF0ZVdhbGxzLCBib3JkZXJXYWxscywgbWF6ZSwgY3VzdG9tR3JpZCwgbWF6ZUZvcmNlQXV0bywgc2VlZEdyaWQsIHNlZWRHYW1lLCBwcm9iR29sZEZydWl0SW5jcmVhc2UpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGggPT0gdW5kZWZpbmVkID8gMjAgOiB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodCA9PSB1bmRlZmluZWQgPyAyMCA6IGhlaWdodDtcbiAgICB0aGlzLmdlbmVyYXRlV2FsbHMgPSBnZW5lcmF0ZVdhbGxzID09IHVuZGVmaW5lZCA/IGZhbHNlIDogZ2VuZXJhdGVXYWxscztcbiAgICB0aGlzLmJvcmRlcldhbGxzID0gYm9yZGVyV2FsbHMgPT0gdW5kZWZpbmVkID8gZmFsc2UgOiBib3JkZXJXYWxscztcbiAgICB0aGlzLm1hemUgPSBtYXplID09IHVuZGVmaW5lZCA/IGZhbHNlIDogbWF6ZTtcbiAgICB0aGlzLm1hemVGaXJzdFBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKDEsIDEsIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKTtcbiAgICB0aGlzLm1hemVGb3JjZUF1dG8gPSBtYXplRm9yY2VBdXRvID09IHVuZGVmaW5lZCA/IGZhbHNlIDogbWF6ZUZvcmNlQXV0bztcbiAgICB0aGlzLmdyaWQ7XG4gICAgdGhpcy5pbml0aWFsR3JpZDtcbiAgICB0aGlzLmZydWl0UG9zO1xuICAgIHRoaXMuZnJ1aXRQb3NHb2xkO1xuICAgIHRoaXMuY3VzdG9tR3JpZCA9IGN1c3RvbUdyaWQ7XG4gICAgdGhpcy5zZWVkR3JpZCA9IHNlZWRHcmlkID8gXCJcIiArIHBhcnNlSW50KHNlZWRHcmlkKSA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLnNlZWRHYW1lID0gc2VlZEdyaWQgPyBcIlwiICsgcGFyc2VJbnQoc2VlZEdhbWUpIDogdW5kZWZpbmVkO1xuICAgIHRoaXMucm5nR3JpZDtcbiAgICB0aGlzLnJuZ0dhbWU7XG4gICAgdGhpcy5wcm9iR29sZEZydWl0SW5jcmVhc2UgPSBwcm9iR29sZEZydWl0SW5jcmVhc2UgPT0gdW5kZWZpbmVkID8gZmFsc2UgOiBwcm9iR29sZEZydWl0SW5jcmVhc2U7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGlmKHRoaXMuY3VzdG9tR3JpZCAhPSB1bmRlZmluZWQgfHwgdGhpcy5pbml0aWFsR3JpZCAhPSB1bmRlZmluZWQpIHtcbiAgICAgIGxldCBncmlkVG9Db3B5O1xuXG4gICAgICBpZih0aGlzLmluaXRpYWxHcmlkICE9IHVuZGVmaW5lZCkge1xuICAgICAgICBncmlkVG9Db3B5ID0gdGhpcy5pbml0aWFsR3JpZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyaWRUb0NvcHkgPSB0aGlzLmN1c3RvbUdyaWQ7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGVpZ2h0ID0gZ3JpZFRvQ29weS5sZW5ndGg7XG4gICAgICB0aGlzLndpZHRoID0gZ3JpZFRvQ29weVswXS5sZW5ndGg7XG5cbiAgICAgIHRoaXMuaW5pdGlhbEdyaWQgPSBuZXcgQXJyYXkodGhpcy5oZWlnaHQpO1xuICAgICAgdGhpcy5ncmlkID0gbmV3IEFycmF5KHRoaXMuaGVpZ2h0KTtcblxuICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgdGhpcy5pbml0aWFsR3JpZFtpXSA9IGdyaWRUb0NvcHlbaV0uc2xpY2UoKTtcbiAgICAgICAgdGhpcy5ncmlkW2ldID0gZ3JpZFRvQ29weVtpXS5zbGljZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdyaWQgPSBuZXcgQXJyYXkodGhpcy5oZWlnaHQpO1xuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWlnaHQ7IGkrKykge1xuICAgICAgICB0aGlzLmdyaWRbaV0gPSBuZXcgQXJyYXkodGhpcy53aWR0aCk7XG5cbiAgICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMud2lkdGg7IGorKykge1xuICAgICAgICAgIGlmKCh0aGlzLmJvcmRlcldhbGxzICYmIChpID09IDAgfHwgaSA9PSB0aGlzLmhlaWdodCAtIDEgfHwgaiA9PSAwIHx8IGogPT0gdGhpcy53aWR0aCAtIDEpKSB8fCAodGhpcy5nZW5lcmF0ZVdhbGxzICYmIHRoaXMucm5nR3JpZCAmJiB0aGlzLnJuZ0dyaWQoKSA+IDAuNjUpIHx8IHRoaXMubWF6ZSkge1xuICAgICAgICAgICAgdGhpcy5ncmlkW2ldW2pdID0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5XQUxMO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdyaWRbaV1bal0gPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZih0aGlzLm1hemUpIHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZU1hemUoKTtcbiAgICAgIH0gZWxzZSBpZih0aGlzLmdlbmVyYXRlV2FsbHMpIHtcbiAgICAgICAgdGhpcy5maXhXYWxscyh0aGlzLmJvcmRlcldhbGxzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmZydWl0UG9zR29sZCA9IG51bGw7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICB0aGlzLmdyaWQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5pbml0aWFsR3JpZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZydWl0UG9zID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZnJ1aXRQb3NHb2xkID0gdW5kZWZpbmVkO1xuICAgIHRoaXMucm5nR3JpZCA9IG5ldyBzZWVkcmFuZG9tKHRoaXMuc2VlZEdyaWQpO1xuICAgIHRoaXMucm5nR2FtZSA9IG5ldyBzZWVkcmFuZG9tKHRoaXMuc2VlZEdhbWUpO1xuICB9XG5cbiAgZml4V2FsbHMoYm9yZGVyV2FsbHMpIHtcbiAgICBsZXQgc3RhcnRZLCBzdGFydFgsIGVuZFksIGVuZFg7XG5cbiAgICBpZihib3JkZXJXYWxscykge1xuICAgICAgc3RhcnRZID0gMTsgZW5kWSA9IHRoaXMuaGVpZ2h0IC0gMTtcbiAgICAgIHN0YXJ0WCA9IDE7IGVuZFggPSB0aGlzLndpZHRoIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhcnRZID0gMDsgZW5kWSA9IHRoaXMuaGVpZ2h0O1xuICAgICAgc3RhcnRYID0gMDsgZW5kWCA9IHRoaXMud2lkdGg7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpID0gc3RhcnRZOyBpIDwgZW5kWTsgaSsrKSB7XG4gICAgICBmb3IobGV0IGogPSBzdGFydFg7IGogPCBlbmRYOyBqKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFBvcyA9IG5ldyBQb3NpdGlvbihqLCBpKTtcbiAgICAgICAgY29uc3QgdXBwZXJDYXNlID0gdGhpcy5nZXROZXh0UG9zaXRpb24oY3VycmVudFBvcywgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVApO1xuICAgICAgICBjb25zdCB1cHBlckxlZnRDYXNlID0gdGhpcy5nZXROZXh0UG9zaXRpb24odXBwZXJDYXNlLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUKTtcbiAgICAgICAgY29uc3QgdXBwZXJSaWdodENhc2UgPSB0aGlzLmdldE5leHRQb3NpdGlvbih1cHBlckNhc2UsIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKTtcbiAgICAgICAgY29uc3QgZG93bkNhc2UgPSB0aGlzLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00pO1xuICAgICAgICBjb25zdCBkb3duTGVmdENhc2UgPSB0aGlzLmdldE5leHRQb3NpdGlvbihkb3duQ2FzZSwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCk7XG4gICAgICAgIGNvbnN0IGRvd25SaWdodENhc2UgPSB0aGlzLmdldE5leHRQb3NpdGlvbihkb3duQ2FzZSwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQpO1xuXG4gICAgICAgIGlmKHRoaXMuZ2V0KHVwcGVyTGVmdENhc2UpID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuV0FMTCB8fCB0aGlzLmdldCh1cHBlclJpZ2h0Q2FzZSkgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5XQUxMIHx8IHRoaXMuZ2V0KGRvd25MZWZ0Q2FzZSkgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5XQUxMIHx8IHRoaXMuZ2V0KGRvd25SaWdodENhc2UpID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuV0FMTCkge1xuICAgICAgICAgIHRoaXMuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIGN1cnJlbnRQb3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbWF6ZV9yZWN1cnNpb24ociwgYykge1xuICAgIGNvbnN0IGRpcmVjdGlvbnMgPSBHYW1lVXRpbHMuc2h1ZmZsZShbR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVAsIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hULCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlRdLCB0aGlzLnJuZ0dyaWQpO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGRpcmVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN3aXRjaChkaXJlY3Rpb25zW2ldKSB7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVA6XG4gICAgICAgICAgaWYociAtIDIgPD0gMCkgY29udGludWU7XG5cbiAgICAgICAgICBpZih0aGlzLmdldChuZXcgUG9zaXRpb24oYywgciAtIDIpKSAhPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSB7XG4gICAgICAgICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCBuZXcgUG9zaXRpb24oYywgciAtIDIpKTtcbiAgICAgICAgICAgIHRoaXMuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIG5ldyBQb3NpdGlvbihjLCByIC0gMSkpO1xuICAgICAgICAgICAgdGhpcy5tYXplX3JlY3Vyc2lvbihyIC0gMiwgYyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQ6XG4gICAgICAgICAgaWYoYyArIDIgPj0gdGhpcy53aWR0aCAtIDEpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaWYodGhpcy5nZXQobmV3IFBvc2l0aW9uKGMgKyAyLCByKSkgIT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgbmV3IFBvc2l0aW9uKGMgKyAyLCByKSk7XG4gICAgICAgICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCBuZXcgUG9zaXRpb24oYyArIDEsIHIpKTtcbiAgICAgICAgICAgIHRoaXMubWF6ZV9yZWN1cnNpb24ociwgYyArIDIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTTpcbiAgICAgICAgICBpZihyICsgMiA+PSB0aGlzLmhlaWdodCAtIDEpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgaWYodGhpcy5nZXQobmV3IFBvc2l0aW9uKGMsIHIgKyAyKSkgIT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSkge1xuICAgICAgICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgbmV3IFBvc2l0aW9uKGMsIHIgKyAyKSk7XG4gICAgICAgICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCBuZXcgUG9zaXRpb24oYywgciArIDEpKTtcbiAgICAgICAgICAgIHRoaXMubWF6ZV9yZWN1cnNpb24ociArIDIsIGMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQ6XG4gICAgICAgICAgaWYoYyAtIDIgPD0gMCkgY29udGludWU7XG5cbiAgICAgICAgICBpZih0aGlzLmdldChuZXcgUG9zaXRpb24oYyAtIDIsIHIpKSAhPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSB7XG4gICAgICAgICAgICB0aGlzLnNldChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCBuZXcgUG9zaXRpb24oYyAtIDIsIHIpKTtcbiAgICAgICAgICAgIHRoaXMuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIG5ldyBQb3NpdGlvbihjIC0gMSwgcikpO1xuICAgICAgICAgICAgdGhpcy5tYXplX3JlY3Vyc2lvbihyLCBjIC0gMik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVNYXplKCkge1xuICAgIHRoaXMubWF6ZUZpcnN0UG9zaXRpb24gPSBuZXcgUG9zaXRpb24oMSwgMSwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQpO1xuICAgIHRoaXMuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIHRoaXMubWF6ZUZpcnN0UG9zaXRpb24pO1xuICAgIHRoaXMubWF6ZV9yZWN1cnNpb24oMSwgMSk7XG4gIH1cblxuICBzZXQodmFsdWUsIHBvc2l0aW9uKSB7XG4gICAgdGhpcy5ncmlkW3Bvc2l0aW9uLnldW3Bvc2l0aW9uLnhdID0gdmFsdWU7XG4gIH1cblxuICBnZXQocG9zaXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkW3Bvc2l0aW9uLnldW3Bvc2l0aW9uLnhdO1xuICB9XG5cbiAgdmFsVG9DaGFyKHZhbHVlKSB7XG4gICAgc3dpdGNoKHZhbHVlKSB7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFk6XG4gICAgICAgIHJldHVybiBcIi1cIjtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TTkFLRTpcbiAgICAgICAgcmV0dXJuIFwib1wiO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNOQUtFX0RFQUQ6XG4gICAgICAgIHJldHVybiBcIk9cIjtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVDpcbiAgICAgICAgcmV0dXJuIFwieFwiO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLldBTEw6XG4gICAgICAgIHJldHVybiBcIiNcIjtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TVVJST1VOREVEOlxuICAgICAgICByZXR1cm4gXCIvXCI7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVRfR09MRDpcbiAgICAgICAgcmV0dXJuIFwiWFwiO1xuICAgIH1cbiAgfVxuXG4gIGdldEltYWdlQ2FzZShwb3NpdGlvbikge1xuICAgIHN3aXRjaCh0aGlzLmdldChwb3NpdGlvbikpIHtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5XQUxMOlxuICAgICAgICByZXR1cm4gXCJ3YWxsLnBuZ1wiO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUOlxuICAgICAgICByZXR1cm4gXCJmcnVpdC5wbmdcIjtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEOlxuICAgICAgICByZXR1cm4gXCJmcnVpdF9nb2xkLnBuZ1wiO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZOlxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TTkFLRTpcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU05BS0VfREVBRDpcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU1VSUk9VTkRFRDpcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuQ1JPU1NFRDpcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIFwidW5rbm93bi5wbmdcIjtcbiAgfVxuXG4gIGdldEdyYXBoKGlnbm9yZVNuYWtlUG9zKSB7XG4gICAgY29uc3QgcmVzID0gbmV3IEFycmF5KHRoaXMuaGVpZ2h0KTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmhlaWdodDsgaSsrKSB7XG4gICAgICByZXNbaV0gPSBuZXcgQXJyYXkodGhpcy53aWR0aCk7XG5cbiAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLndpZHRoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudFBvcyA9IG5ldyBQb3NpdGlvbihqLCBpKTtcblxuICAgICAgICBpZihpZ25vcmVTbmFrZVBvcyAmJiB0aGlzLmdldChjdXJyZW50UG9zKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNOQUtFKSB7XG4gICAgICAgICAgcmVzW2ldW2pdID0gMDtcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuaXNEZWFkUG9zaXRpb24oY3VycmVudFBvcykpIHtcbiAgICAgICAgICByZXNbaV1bal0gPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc1tpXVtqXSA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgZ2V0UmFuZG9tUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBQb3NpdGlvbihHYW1lVXRpbHMucmFuZFJhbmdlKDAsIHRoaXMud2lkdGggLSAxLCB0aGlzLnJuZ0dhbWUpLCBHYW1lVXRpbHMucmFuZFJhbmdlKDAsIHRoaXMuaGVpZ2h0IC0gMSwgdGhpcy5ybmdHYW1lKSk7XG4gIH1cblxuICBzZXRGcnVpdChudW1iZXJQbGF5ZXJzLCBnb2xkKSB7XG4gICAgY29uc3QgdHJpZWQgPSBbMV07XG5cbiAgICBpZighZ29sZCAmJiB0aGlzLmZydWl0UG9zICE9IG51bGwgJiYgdGhpcy5nZXQodGhpcy5mcnVpdFBvcykgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVCkge1xuICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgdGhpcy5mcnVpdFBvcyk7XG4gICAgfVxuXG4gICAgaWYodGhpcy5nZXRUb3RhbChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSA+IDApIHtcbiAgICAgIGxldCByYW5kb21Qb3MsIGlzQ29ycmlkb3I7XG5cbiAgICAgIGRvIHtcbiAgICAgICAgcmFuZG9tUG9zID0gdGhpcy5nZXRSYW5kb21Qb3NpdGlvbigpO1xuICAgICAgICBpc0NvcnJpZG9yID0gdGhpcy5kZXRlY3RDb3JyaWRvcihyYW5kb21Qb3MpO1xuXG4gICAgICAgIGlmKGlzQ29ycmlkb3IgJiYgdGhpcy5nZXQocmFuZG9tUG9zKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSB7XG4gICAgICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TVVJST1VOREVELCByYW5kb21Qb3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5nZXRUb3RhbChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSA8PSAwKSB7XG4gICAgICAgICAgaWYodGhpcy5mcnVpdFBvc0dvbGQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IHdoaWxlKHRoaXMuZ2V0KHJhbmRvbVBvcykgIT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSB8fCB0aGlzLmlzRnJ1aXRTdXJyb3VuZGVkKHJhbmRvbVBvcywgdHJ1ZSkgfHwgKHRoaXMubWF6ZSAmJiAhdGhpcy50ZXN0RnJ1aXRNYXplKHJhbmRvbVBvcywgdHJpZWQpKSB8fCBpc0NvcnJpZG9yKTtcblxuICAgICAgaWYoZ29sZCkge1xuICAgICAgICB0aGlzLmZydWl0UG9zR29sZCA9IHJhbmRvbVBvcztcbiAgICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xELCByYW5kb21Qb3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5mcnVpdFBvcyA9IHJhbmRvbVBvcztcbiAgICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVCwgcmFuZG9tUG9zKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYodGhpcy5nZXRUb3RhbChHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSA8PSAwICYmIHRoaXMuZnJ1aXRQb3NHb2xkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmKCF0aGlzLm1hemUgJiYgdGhpcy5mcnVpdFBvc0dvbGQgPT0gbnVsbCAmJiBHYW1lVXRpbHMucmFuZFJhbmdlKDEsICh0aGlzLnByb2JHb2xkRnJ1aXRJbmNyZWFzZSA/IDMgOiAobnVtYmVyUGxheWVycyA+IDEgPyBHYW1lQ29uc3RhbnRzLlNldHRpbmcuUFJPQl9HT0xEX0ZSVUlUX01VTFRJUExFX1BMQVlFUlMgOiBHYW1lQ29uc3RhbnRzLlNldHRpbmcuUFJPQl9HT0xEX0ZSVUlUXzFfUExBWUVSKSksIHRoaXMucm5nR2FtZSkgPT0gMSkge1xuICAgICAgdGhpcy5zZXRGcnVpdChudW1iZXJQbGF5ZXJzLCB0cnVlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHRlc3RGcnVpdE1hemUocG9zaXRpb24sIHRyaWVkKSB7IC8vIE1hemUgbW9kZTogYXZvaWQgcHV0dGluZyB0aGUgZnJ1aXQgdG9vIGNsb3NlIHRvIHRoZSBTbmFrZVxuICAgIGNvbnN0IGdyaWQgPSB0aGlzLmdldEdyYXBoKHRydWUpO1xuICAgIGNvbnN0IGdyYXBoID0gbmV3IExvd2xpZ2h0LkFzdGFyLkNvbmZpZ3VyYXRpb24oZ3JpZCwge1xuICAgICAgb3JkZXI6IFwieXhcIixcbiAgICAgIHRvcnVzOiBmYWxzZSxcbiAgICAgIGRpYWdvbmFsczogZmFsc2UsXG4gICAgICBjdXR0aW5nOiBmYWxzZSxcbiAgICAgIGNvc3QoYSwgYikgeyByZXR1cm4gYiA9PSAxID8gbnVsbCA6IDEgfVxuICAgIH0pO1xuICAgIGNvbnN0IHBhdGggPSBncmFwaC5wYXRoKHt4OiB0aGlzLm1hemVGaXJzdFBvc2l0aW9uLngsIHk6IHRoaXMubWF6ZUZpcnN0UG9zaXRpb24ueX0sIHt4OiBwb3NpdGlvbi54LCB5OiBwb3NpdGlvbi55fSk7XG5cbiAgICBpZihwYXRoLmxlbmd0aCA8IE1hdGguY2VpbCh0aGlzLmdldFRvdGFsKEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFkpIC8gKDEgKiBNYXRoLmNlaWwodHJpZWRbMF0gLyA0KSkpKSB7XG4gICAgICB0cmllZFswXSsrO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmllZFswXSsrO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgaXNDYXNlU3Vycm91bmRlZChwb3NpdGlvbiwgZmlsbCwgZm91bmRWYWxzLCBmb3JiaWRkZW5WYWxzKSB7XG4gICAgaWYoIXBvc2l0aW9uKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBncmlkQ29weSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5ncmlkKSk7XG4gICAgY29uc3QgY2hlY2tMaXN0ID0gW3Bvc2l0aW9uXTtcblxuICAgIHdoaWxlKGNoZWNrTGlzdC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBjaGVja0xpc3RbMF07XG4gICAgICBjaGVja0xpc3Quc2hpZnQoKTtcblxuICAgICAgY29uc3QgZGlyZWN0aW9ucyA9IFt0aGlzLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQKSwgdGhpcy5nZXROZXh0UG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00pLCB0aGlzLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpLCB0aGlzLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKV07IC8vIFVQLCBET1dOLCBMRUZULCBSSUdIVFxuXG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgZGlyZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihncmlkQ29weVtkaXJlY3Rpb25zW2ldLnldW2RpcmVjdGlvbnNbaV0ueF0gIT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5DUk9TU0VEICYmIGZvcmJpZGRlblZhbHMuaW5kZXhPZih0aGlzLmdldChkaXJlY3Rpb25zW2ldKSkgPiAtMSkge1xuICAgICAgICAgIGNoZWNrTGlzdC5wdXNoKGRpcmVjdGlvbnNbaV0pO1xuXG4gICAgICAgICAgaWYoZm91bmRWYWxzLmluZGV4T2YodGhpcy5nZXQoZGlyZWN0aW9uc1tpXSkpID4gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZihmaWxsICYmIHRoaXMuZ2V0KGRpcmVjdGlvbnNbaV0pID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU1VSUk9VTkRFRCwgZGlyZWN0aW9uc1tpXSk7XG4gICAgICAgICAgICBncmlkQ29weVtkaXJlY3Rpb25zW2ldLnldW2RpcmVjdGlvbnNbaV0ueF0gPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNVUlJPVU5ERUQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdyaWRDb3B5W2RpcmVjdGlvbnNbaV0ueV1bZGlyZWN0aW9uc1tpXS54XSA9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuQ1JPU1NFRDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihmaWxsICYmICh0aGlzLmdldChwb3NpdGlvbikgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSB8fCB0aGlzLmdldChwb3NpdGlvbikgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVCkgfHwgdGhpcy5nZXQocG9zaXRpb24pID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVRfR09MRCkge1xuICAgICAgdGhpcy5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TVVJST1VOREVELCBwb3NpdGlvbik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0ZydWl0U3Vycm91bmRlZChwb3NpdGlvbiwgZmlsbCkge1xuICAgIGNvbnN0IHN1cnJvdW5kZWQgPSB0aGlzLmlzQ2FzZVN1cnJvdW5kZWQocG9zaXRpb24sIGZhbHNlLCBbR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TTkFLRV0sIFtHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZLCBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNOQUtFXSk7XG5cbiAgICBpZihzdXJyb3VuZGVkICYmIGZpbGwpIHtcbiAgICAgIHRoaXMuaXNDYXNlU3Vycm91bmRlZChwb3NpdGlvbiwgdHJ1ZSwgW0dhbWVDb25zdGFudHMuQ2FzZVR5cGUuU05BS0VdLCBbR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSwgR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TTkFLRV0pO1xuICAgIH1cblxuICAgIHJldHVybiBzdXJyb3VuZGVkO1xuICB9XG5cbiAgZGV0ZWN0Q29ycmlkb3IocG9zaXRpb24sIGdyaWRDb3B5ID0gdGhpcy5ncmlkID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmdyaWQpKSA6IG51bGwpIHtcbiAgICBpZih0aGlzLm1hemUgfHwgIXBvc2l0aW9uICB8fCAhZ3JpZENvcHkpIHJldHVybiBmYWxzZTtcblxuICAgIGNvbnN0IHBvc1RvcCA9IHRoaXMuZ2V0TmV4dFBvc2l0aW9uKHBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5UT1ApO1xuICAgIGNvbnN0IHBvc0JvdHRvbSA9IHRoaXMuZ2V0TmV4dFBvc2l0aW9uKHBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00pO1xuICAgIGNvbnN0IHBvc1JpZ2h0ID0gdGhpcy5nZXROZXh0UG9zaXRpb24ocG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKTtcbiAgICBjb25zdCBwb3NMZWZ0ID0gdGhpcy5nZXROZXh0UG9zaXRpb24ocG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpO1xuXG4gICAgY29uc3QgaXNEZWFkUG9zaXRpb25Ub3AgPSB0aGlzLmlzRGVhZFBvc2l0aW9uKHBvc1RvcCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgY29uc3QgaXNEZWFkUG9zaXRpb25Cb3R0b20gPSB0aGlzLmlzRGVhZFBvc2l0aW9uKHBvc0JvdHRvbSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgY29uc3QgaXNEZWFkUG9zaXRpb25SaWdodCA9IHRoaXMuaXNEZWFkUG9zaXRpb24ocG9zUmlnaHQsIHRydWUsIHRydWUpO1xuICAgIGNvbnN0IGlzRGVhZFBvc2l0aW9uTGVmdCA9IHRoaXMuaXNEZWFkUG9zaXRpb24ocG9zTGVmdCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgY29uc3QgbnVtRGVhZFBvc2l0aW9uQXJyb3VuZCA9IGlzRGVhZFBvc2l0aW9uVG9wICsgaXNEZWFkUG9zaXRpb25Cb3R0b20gKyBpc0RlYWRQb3NpdGlvblJpZ2h0ICsgaXNEZWFkUG9zaXRpb25MZWZ0O1xuXG4gICAgaWYobnVtRGVhZFBvc2l0aW9uQXJyb3VuZCA8PSAxIHx8IHRoaXMuaXNEZWFkUG9zaXRpb24ocG9zaXRpb24sIHRydWUpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIGlmKG51bURlYWRQb3NpdGlvbkFycm91bmQgPj0gMykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZ3JpZENvcHlbcG9zaXRpb24ueV1bcG9zaXRpb24ueF0gPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkNST1NTRUQ7XG5cbiAgICBjb25zdCBjb3JyaWRvclRvcCA9IGdyaWRDb3B5W3Bvc1RvcC55XVtwb3NUb3AueF0gIT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5DUk9TU0VEID8gdGhpcy5kZXRlY3RDb3JyaWRvcihwb3NUb3AsIGdyaWRDb3B5KSA6IGZhbHNlO1xuICAgIGNvbnN0IGNvcnJpZG9yQm90dG9tID0gZ3JpZENvcHlbcG9zQm90dG9tLnldW3Bvc0JvdHRvbS54XSAhPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkNST1NTRUQgPyB0aGlzLmRldGVjdENvcnJpZG9yKHBvc0JvdHRvbSwgZ3JpZENvcHkpIDogZmFsc2U7XG4gICAgY29uc3QgY29ycmlkb3JMZWZ0ID0gZ3JpZENvcHlbcG9zTGVmdC55XVtwb3NMZWZ0LnhdICE9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuQ1JPU1NFRCA/IHRoaXMuZGV0ZWN0Q29ycmlkb3IocG9zTGVmdCwgZ3JpZENvcHkpIDogZmFsc2U7XG4gICAgY29uc3QgY29ycmlkb3JSaWdodCA9IGdyaWRDb3B5W3Bvc1JpZ2h0LnldW3Bvc1JpZ2h0LnhdICE9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuQ1JPU1NFRCA/IHRoaXMuZGV0ZWN0Q29ycmlkb3IocG9zUmlnaHQsIGdyaWRDb3B5KSA6IGZhbHNlO1xuXG4gICAgaWYoY29ycmlkb3JCb3R0b20gfHwgY29ycmlkb3JUb3AgfHwgY29ycmlkb3JMZWZ0IHx8IGNvcnJpZG9yUmlnaHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGdldE9uTGluZSh0eXBlLCBsaW5lKSB7XG4gICAgbGV0IHRvdCA9IDA7XG5cbiAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy53aWR0aDsgaisrKSB7XG4gICAgICBpZih0aGlzLmdldChuZXcgUG9zaXRpb24oaiwgbGluZSkpID09IHR5cGUpIHtcbiAgICAgICAgdG90Kys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvdDtcbiAgfVxuXG4gIGdldFRvdGFsKHR5cGUpIHtcbiAgICBsZXQgdG90ID0gMDtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmhlaWdodDsgaSsrKSB7XG4gICAgICB0b3QgKz0gdGhpcy5nZXRPbkxpbmUodHlwZSwgaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRvdDtcbiAgfVxuXG4gIGdldE5leHRQb3NpdGlvbihvbGRQb3MsIG5ld0RpcmVjdGlvbikge1xuICAgIGNvbnN0IHBvc2l0aW9uID0gbmV3IFBvc2l0aW9uKG9sZFBvcy54LCBvbGRQb3MueSwgbmV3RGlyZWN0aW9uKTtcblxuICAgIHN3aXRjaChuZXdEaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVDpcbiAgICAgICAgcG9zaXRpb24ueC0tO1xuICAgICAgICBwb3NpdGlvbi5kaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVA6XG4gICAgICAgIHBvc2l0aW9uLnktLTtcbiAgICAgICAgcG9zaXRpb24uZGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVDpcbiAgICAgICAgcG9zaXRpb24ueCsrO1xuICAgICAgICBwb3NpdGlvbi5kaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTTpcbiAgICAgICAgcG9zaXRpb24ueSsrO1xuICAgICAgICBwb3NpdGlvbi5kaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT007XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLktleS5MRUZUOlxuICAgICAgICBwb3NpdGlvbi54LS07XG4gICAgICAgIHBvc2l0aW9uLmRpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuS2V5LkxFRlQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLktleS5VUDpcbiAgICAgICAgcG9zaXRpb24ueS0tO1xuICAgICAgICBwb3NpdGlvbi5kaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLktleS5VUDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuS2V5LlJJR0hUOlxuICAgICAgICBwb3NpdGlvbi54Kys7XG4gICAgICAgIHBvc2l0aW9uLmRpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5LZXkuQk9UVE9NOlxuICAgICAgICBwb3NpdGlvbi55Kys7XG4gICAgICAgIHBvc2l0aW9uLmRpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYocG9zaXRpb24ueCA8IDApIHtcbiAgICAgIHBvc2l0aW9uLnggPSB0aGlzLndpZHRoIC0gMTtcbiAgICB9IGVsc2UgaWYocG9zaXRpb24ueCA+PSB0aGlzLndpZHRoKSB7XG4gICAgICBwb3NpdGlvbi54ID0gMDtcbiAgICB9XG5cbiAgICBpZihwb3NpdGlvbi55IDwgMCkge1xuICAgICAgcG9zaXRpb24ueSA9IHRoaXMuaGVpZ2h0IC0gMTtcbiAgICB9IGVsc2UgaWYocG9zaXRpb24ueSA+PSB0aGlzLmhlaWdodCkge1xuICAgICAgcG9zaXRpb24ueSA9IDA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0RGlyZWN0aW9uVG8ocG9zaXRpb24sIG90aGVyUG9zaXRpb24pIHtcbiAgICBpZih0aGlzLmdldE5leHRQb3NpdGlvbihwb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVApLmVxdWFscyhvdGhlclBvc2l0aW9uKSkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQO1xuICAgIH0gZWxzZSBpZih0aGlzLmdldE5leHRQb3NpdGlvbihwb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NKS5lcXVhbHMob3RoZXJQb3NpdGlvbikpIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT007XG4gICAgfSBlbHNlIGlmKHRoaXMuZ2V0TmV4dFBvc2l0aW9uKHBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCkuZXF1YWxzKG90aGVyUG9zaXRpb24pKSB7XG4gICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQ7XG4gICAgfSBlbHNlIGlmKHRoaXMuZ2V0TmV4dFBvc2l0aW9uKHBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUKS5lcXVhbHMob3RoZXJQb3NpdGlvbikpIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUO1xuICAgIH1cblxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIGludmVydERpcmVjdGlvbihkaXJlY3Rpb24pIHtcbiAgICBpZihkaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVApIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT007XG4gICAgfSBlbHNlIGlmKGRpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00pIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUDtcbiAgICB9IGVsc2UgaWYoZGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUKSB7XG4gICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVDtcbiAgICB9IGVsc2UgaWYoZGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVDtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlzRGVhZFBvc2l0aW9uKHBvc2l0aW9uLCBleGNsdWRlU25ha2UsIGluY2x1ZGVTdXJyb3VuZGVkKSB7XG4gICAgcmV0dXJuICghZXhjbHVkZVNuYWtlICYmIHRoaXMuZ2V0KHBvc2l0aW9uKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNOQUtFKSB8fCAodGhpcy5nZXQocG9zaXRpb24pID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuV0FMTCkgfHwgKHRoaXMuZ2V0KHBvc2l0aW9uKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNOQUtFX0RFQUQpIHx8ICghIWluY2x1ZGVTdXJyb3VuZGVkICYmIHRoaXMuZ2V0KHBvc2l0aW9uKSA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLlNVUlJPVU5ERUQpO1xuICB9XG5cbiAgdG9TdHJpbmcoKSB7XG4gICAgbGV0IHJlcyA9IFwiXCI7XG5cbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5oZWlnaHQ7IGkrKykge1xuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMud2lkdGg7IGorKykge1xuICAgICAgICByZXMgKz0gdGhpcy52YWxUb0NoYXIodGhpcy5nZXQobmV3IFBvc2l0aW9uKGosIGkpKSkgKyBcIiBcIjtcbiAgICAgIH1cblxuICAgICAgcmVzICs9IFwiXFxuXCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcztcbiAgfVxufSIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvc2l0aW9uIHtcbiAgY29uc3RydWN0b3IoeCwgeSwgZGlyZWN0aW9uKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgY29weSgpIHtcbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHRoaXMueCwgdGhpcy55LCB0aGlzLmRpcmVjdGlvbik7XG4gIH1cblxuICBjb252ZXJ0VG9LZXlEaXJlY3Rpb24oKSB7XG4gICAgc3dpdGNoKHRoaXMuZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQOlxuICAgICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5LZXkuVVA7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUOlxuICAgICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5LZXkuUklHSFQ7XG4gICAgICBjYXNlIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQ6XG4gICAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLktleS5MRUZUO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT006XG4gICAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLktleS5CT1RUT007XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb247XG4gICAgfVxuICB9XG5cbiAgY29udmVydFRvU2ltcGxlRGlyZWN0aW9uKCkge1xuICAgIHN3aXRjaCh0aGlzLmRpcmVjdGlvbikge1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLktleS5VUDpcbiAgICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLktleS5SSUdIVDpcbiAgICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUO1xuICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLktleS5MRUZUOlxuICAgICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVDtcbiAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5LZXkuQk9UVE9NOlxuICAgICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uO1xuICAgIH1cbiAgfVxuXG4gIGVxdWFscyhvdGhlclBvc2l0aW9uKSB7XG4gICAgaWYob3RoZXJQb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy54ID09IG90aGVyUG9zaXRpb24ueCAmJiB0aGlzLnkgPT0gb3RoZXJQb3NpdGlvbi55O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59IiwiLypcbiAqIENvcHlyaWdodCAoQykgMjAxOS0yMDIwIEVsaWFzdGlrIChlbGlhc3Rpa3NvZnRzLmNvbSlcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBcIlNuYWtlSUFcIi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFwiU25ha2VJQVwiLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5pbXBvcnQgRXZlbnQgZnJvbSBcIi4vRXZlbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVhY3RvciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZXZlbnRzID0ge307XG4gIH1cblxuICByZWdpc3RlckV2ZW50KGV2ZW50TmFtZSkge1xuICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBuZXcgRXZlbnQoZXZlbnROYW1lKTtcbiAgfVxuXG4gIGRpc3BhdGNoRXZlbnQoZXZlbnROYW1lLCBldmVudEFyZ3MpIHtcbiAgICBjb25zdCBjYWxsYmFja3MgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmNhbGxiYWNrcztcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwLCBsID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgY2FsbGJhY2tzW2ldKGV2ZW50QXJncyk7XG4gICAgfVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5yZWdpc3RlckNhbGxiYWNrKGNhbGxiYWNrKTtcbiAgfVxufSIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSBcIi4vQ29uc3RhbnRzXCI7XG5pbXBvcnQgUG9zaXRpb24gZnJvbSBcIi4vUG9zaXRpb25cIjtcbmltcG9ydCBHcmlkIGZyb20gXCIuL0dyaWRcIjtcbmltcG9ydCB7IFNuYWtlQUksIFNuYWtlQUlSYW5kb20sIFNuYWtlQUlMb3csIFNuYWtlQUlOb3JtYWwsIFNuYWtlQUlIaWdoLCBTbmFrZUFJTW9jayB9IGZyb20gXCIuL2FpL2luZGV4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNuYWtlIHtcbiAgY29uc3RydWN0b3IoZGlyZWN0aW9uLCBsZW5ndGgsIGdyaWQsIHBsYXllciwgYWlMZXZlbCwgYXV0b1JldHJ5LCBuYW1lLCBjdXN0b21BSSkge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uID09IHVuZGVmaW5lZCA/IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUIDogZGlyZWN0aW9uO1xuICAgIHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uO1xuICAgIHRoaXMuaW5pdGlhbExlbmd0aCA9IGxlbmd0aCA9PSB1bmRlZmluZWQgPyAzIDogbGVuZ3RoO1xuICAgIHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucyA9IFtdO1xuICAgIHRoaXMuZXJyb3JJbml0ID0gZmFsc2U7XG4gICAgdGhpcy5ncmlkID0gZ3JpZCB8fCBuZXcgR3JpZCgpO1xuICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICB0aGlzLmxhc3RLZXkgPSAtMTtcbiAgICB0aGlzLmxhc3RUYWlsO1xuICAgIHRoaXMubGFzdFRhaWxNb3ZlZDtcbiAgICB0aGlzLnRpY2tzRGVhZCA9IDA7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXIgPT0gdW5kZWZpbmVkID8gR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhVTUFOIDogcGxheWVyO1xuICAgIHRoaXMuYWlMZXZlbCA9IGFpTGV2ZWwgPT0gdW5kZWZpbmVkID8gR2FtZUNvbnN0YW50cy5BaUxldmVsLkRFRkFVTFQgOiBhaUxldmVsO1xuICAgIHRoaXMuYXV0b1JldHJ5ID0gYXV0b1JldHJ5ID09IHVuZGVmaW5lZCA/IGZhbHNlIDogYXV0b1JldHJ5O1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLnNjb3JlTWF4ID0gZmFsc2U7XG4gICAgdGhpcy5jb2xvcjtcbiAgICB0aGlzLm5hbWUgPSBuYW1lID09IHVuZGVmaW5lZCA/IFwiU25ha2VcIiA6IG5hbWU7XG4gICAgdGhpcy5zbmFrZUFJID0gbmV3IFNuYWtlQUkoKTtcbiAgICB0aGlzLmN1c3RvbUFJID0gY3VzdG9tQUk7XG4gICAgdGhpcy50aWNrc1dpdGhvdXRBY3Rpb24gPSAwO1xuXG4gICAgdGhpcy5pbml0QUkoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgaWYodGhpcy5pbml0aWFsTGVuZ3RoIDw9IDApIHtcbiAgICAgIHRoaXMuZXJyb3JJbml0ID0gdHJ1ZTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZih0aGlzLmdyaWQubWF6ZSAmJiB0aGlzLmluaXRUcmllZERpcmVjdGlvbnMubGVuZ3RoIDw9IDApIHtcbiAgICAgIHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9IHRoaXMuZ3JpZC5tYXplRmlyc3RQb3NpdGlvbi5kaXJlY3Rpb247XG4gICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMuaW5pdGlhbERpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBsZXQgc3BhY2VMaW5lQXZhaWxhYmxlID0gMDtcbiAgICBsZXQgc3BhY2VDb2xBdmFpbGFibGUgPSAwO1xuXG4gICAgaWYoKHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCAmJiB0aGlzLmluaXRUcmllZERpcmVjdGlvbnMuaW5kZXhPZihHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCkgPT0gLTEpIHx8ICh0aGlzLmluaXRpYWxEaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCAmJiB0aGlzLmluaXRUcmllZERpcmVjdGlvbnMuaW5kZXhPZihHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUKSA9PSAtMSkpIHtcbiAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmdyaWQuaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgbGV0IGVtcHR5T25MaW5lID0gMDtcblxuICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkLndpZHRoOyBqKyspIHtcbiAgICAgICAgICBpZih0aGlzLmdyaWQuZ2V0KG5ldyBQb3NpdGlvbihqLCBpKSkgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSkge1xuICAgICAgICAgICAgZW1wdHlPbkxpbmUrKztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW1wdHlPbkxpbmUgPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKGVtcHR5T25MaW5lID49IHRoaXMuaW5pdGlhbExlbmd0aCkge1xuICAgICAgICAgICAgc3BhY2VMaW5lQXZhaWxhYmxlKys7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoKHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCAmJiB0aGlzLmluaXRUcmllZERpcmVjdGlvbnMuaW5kZXhPZihHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCkgPT0gLTEpIHx8ICh0aGlzLmluaXRpYWxEaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NICYmIHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucy5pbmRleE9mKEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSkgPT0gLTEpKSB7XG4gICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5ncmlkLndpZHRoOyBpKyspIHtcbiAgICAgICAgbGV0IGVtcHR5T25Db2wgPSAwO1xuXG4gICAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmdyaWQuaGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICBpZih0aGlzLmdyaWQuZ2V0KG5ldyBQb3NpdGlvbihpLCBqKSkgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5FTVBUWSkge1xuICAgICAgICAgICAgZW1wdHlPbkNvbCsrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbXB0eU9uQ29sID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZihlbXB0eU9uQ29sID49IHRoaXMuaW5pdGlhbExlbmd0aCkge1xuICAgICAgICAgICAgc3BhY2VDb2xBdmFpbGFibGUrKztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucy5wdXNoKHRoaXMuaW5pdGlhbERpcmVjdGlvbik7XG5cbiAgICBpZigoc3BhY2VMaW5lQXZhaWxhYmxlIDw9IDAgJiYgKHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCB8fCB0aGlzLmluaXRpYWxEaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCkpIHx8IChzcGFjZUNvbEF2YWlsYWJsZSA8PSAwICYmICh0aGlzLmluaXRpYWxEaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVAgfHwgdGhpcy5pbml0aWFsRGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSkpKSB7XG4gICAgICBpZih0aGlzLmluaXRUcmllZERpcmVjdGlvbnMuaW5kZXhPZihHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCkgPT0gLTEpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsRGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQ7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQ7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXQoKTtcbiAgICAgIH0gZWxzZSBpZih0aGlzLmluaXRUcmllZERpcmVjdGlvbnMuaW5kZXhPZihHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUKSA9PSAtMSkge1xuICAgICAgICB0aGlzLmluaXRpYWxEaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUO1xuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQ7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXQoKTtcbiAgICAgIH0gZWxzZSBpZih0aGlzLmluaXRUcmllZERpcmVjdGlvbnMuaW5kZXhPZihHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCkgPT0gLTEpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsRGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVA7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVA7XG4gICAgICAgIHJldHVybiB0aGlzLmluaXQoKTtcbiAgICAgIH0gZWxzZSBpZih0aGlzLmluaXRUcmllZERpcmVjdGlvbnMuaW5kZXhPZihHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00pID09IC0xKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTTtcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT007XG4gICAgICAgIHJldHVybiB0aGlzLmluaXQoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5lcnJvckluaXQgPSB0cnVlO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBwb3NOb3RWYWxpZGF0ZWQgPSB0cnVlO1xuICAgIGxldCBwb3NpdGlvbnNUb0FkZCA9IFtdO1xuICAgIGxldCBzdGFydFBvcywgY3VycmVudFBvcztcblxuICAgIHdoaWxlKHBvc05vdFZhbGlkYXRlZCkge1xuICAgICAgcG9zTm90VmFsaWRhdGVkID0gZmFsc2U7XG5cbiAgICAgIGlmKHRoaXMuZ3JpZC5tYXplKSB7XG4gICAgICAgIHN0YXJ0UG9zID0gdGhpcy5ncmlkLm1hemVGaXJzdFBvc2l0aW9uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnRQb3MgPSB0aGlzLmdyaWQuZ2V0UmFuZG9tUG9zaXRpb24oKTtcbiAgICAgIH1cblxuICAgICAgaWYoIXN0YXJ0UG9zKSB7XG4gICAgICAgIHRoaXMuZXJyb3JJbml0ID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjdXJyZW50UG9zID0gbmV3IFBvc2l0aW9uKHN0YXJ0UG9zLngsIHN0YXJ0UG9zLnksIHRoaXMuaW5pdGlhbERpcmVjdGlvbik7XG4gICAgICBwb3NpdGlvbnNUb0FkZCA9IFtdO1xuXG4gICAgICBmb3IobGV0IGkgPSB0aGlzLmluaXRpYWxMZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBpZihpIDwgdGhpcy5pbml0aWFsTGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGlmKHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCkge1xuICAgICAgICAgICAgY3VycmVudFBvcyA9IHRoaXMuZ3JpZC5nZXROZXh0UG9zaXRpb24obmV3IFBvc2l0aW9uKGN1cnJlbnRQb3MueCwgY3VycmVudFBvcy55LCB0aGlzLmluaXRpYWxEaXJlY3Rpb24pLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUKSB7XG4gICAgICAgICAgICBjdXJyZW50UG9zID0gdGhpcy5ncmlkLmdldE5leHRQb3NpdGlvbihuZXcgUG9zaXRpb24oY3VycmVudFBvcy54LCBjdXJyZW50UG9zLnksIHRoaXMuaW5pdGlhbERpcmVjdGlvbiksIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpO1xuICAgICAgICAgIH0gZWxzZSBpZih0aGlzLmluaXRpYWxEaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NKSB7XG4gICAgICAgICAgICBjdXJyZW50UG9zID0gdGhpcy5ncmlkLmdldE5leHRQb3NpdGlvbihuZXcgUG9zaXRpb24oY3VycmVudFBvcy54LCBjdXJyZW50UG9zLnksIHRoaXMuaW5pdGlhbERpcmVjdGlvbiksIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSk7XG4gICAgICAgICAgfSBlbHNlIGlmKHRoaXMuaW5pdGlhbERpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCkge1xuICAgICAgICAgICAgY3VycmVudFBvcyA9IHRoaXMuZ3JpZC5nZXROZXh0UG9zaXRpb24obmV3IFBvc2l0aW9uKGN1cnJlbnRQb3MueCwgY3VycmVudFBvcy55LCB0aGlzLmluaXRpYWxEaXJlY3Rpb24pLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5ncmlkLmdldChjdXJyZW50UG9zKSAhPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkVNUFRZKSB7XG4gICAgICAgICAgcG9zTm90VmFsaWRhdGVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwb3NpdGlvbnNUb0FkZC5wdXNoKG5ldyBQb3NpdGlvbihjdXJyZW50UG9zLngsIGN1cnJlbnRQb3MueSwgY3VycmVudFBvcy5kaXJlY3Rpb24pKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZih0aGlzLmdyaWQubWF6ZSAmJiBwb3NOb3RWYWxpZGF0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHRoZSBTbmFrZSBpcyBuZWFyIGEgZGVhZCBwb3NpdGlvblxuICAgIGxldCBuZWFyRGVhZFBvc2l0aW9uID0gZmFsc2U7XG5cbiAgICBpZighdGhpcy5ncmlkLm1hemUpIHtcbiAgICAgIGNvbnN0IGZpcnN0UG9zaXRpb24gPSBuZXcgUG9zaXRpb24ocG9zaXRpb25zVG9BZGRbcG9zaXRpb25zVG9BZGQubGVuZ3RoIC0gMV0ueCwgcG9zaXRpb25zVG9BZGRbcG9zaXRpb25zVG9BZGQubGVuZ3RoIC0gMV0ueSwgdGhpcy5kaXJlY3Rpb24pO1xuICBcbiAgICAgIGlmKCh0aGlzLmdyaWQuaXNEZWFkUG9zaXRpb24odGhpcy5ncmlkLmdldE5leHRQb3NpdGlvbihmaXJzdFBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCksIGZhbHNlKSAmJiB0aGlzLmRpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCkgfHwgKHRoaXMuZ3JpZC5pc0RlYWRQb3NpdGlvbih0aGlzLmdyaWQuZ2V0TmV4dFBvc2l0aW9uKGZpcnN0UG9zaXRpb24sIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSksIGZhbHNlKSAmJiB0aGlzLmRpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00pIHx8ICh0aGlzLmdyaWQuaXNEZWFkUG9zaXRpb24odGhpcy5ncmlkLmdldE5leHRQb3NpdGlvbihmaXJzdFBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUKSwgZmFsc2UpICYmIHRoaXMuZGlyZWN0aW9uID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpIHx8ICh0aGlzLmdyaWQuaXNEZWFkUG9zaXRpb24odGhpcy5ncmlkLmdldE5leHRQb3NpdGlvbihmaXJzdFBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCksIGZhbHNlKSAmJiB0aGlzLmRpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCkpIHtcbiAgICAgICAgbmVhckRlYWRQb3NpdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5ncmlkLmludmVydERpcmVjdGlvbih0aGlzLmRpcmVjdGlvbik7XG4gICAgICB9XG4gICAgfVxuICBcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcG9zaXRpb25zVG9BZGQubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmKG5lYXJEZWFkUG9zaXRpb24pIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBwb3NpdGlvbnNUb0FkZFtwb3NpdGlvbnNUb0FkZC5sZW5ndGggLSBpIC0gMV07XG4gICAgICAgIHBvc2l0aW9uLmRpcmVjdGlvbiA9ICB0aGlzLmdyaWQuaW52ZXJ0RGlyZWN0aW9uKHBvc2l0aW9uLmRpcmVjdGlvbik7XG4gICAgICAgIHRoaXMuaW5zZXJ0KHBvc2l0aW9uc1RvQWRkW3Bvc2l0aW9uc1RvQWRkLmxlbmd0aCAtIGkgLSAxXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmluc2VydChwb3NpdGlvbnNUb0FkZFtpXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYodGhpcy5ncmlkLm1hemUgJiYgdGhpcy5wbGF5ZXIgPT0gR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhZQlJJRF9IVU1BTl9BSSkge1xuICAgICAgdGhpcy5wbGF5ZXIgPSBHYW1lQ29uc3RhbnRzLlBsYXllclR5cGUuSFVNQU47XG4gICAgfVxuXG4gICAgaWYodGhpcy5wbGF5ZXIgPT0gR2FtZUNvbnN0YW50cy5QbGF5ZXJUeXBlLkhZQlJJRF9IVU1BTl9BSSkge1xuICAgICAgdGhpcy5haUxldmVsID0gR2FtZUNvbnN0YW50cy5BaUxldmVsLkhJR0g7XG4gICAgfVxuXG4gICAgdGhpcy5sYXN0VGFpbCA9IHRoaXMuZ2V0KHRoaXMucXVldWUubGVuZ3RoIC0gMSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpbml0QUkoKSB7XG4gICAgaWYoIXRoaXMuY3VzdG9tQUkpIHtcbiAgICAgIHN3aXRjaCh0aGlzLmFpTGV2ZWwpIHtcbiAgICAgICAgY2FzZSBHYW1lQ29uc3RhbnRzLkFpTGV2ZWwuUkFORE9NOlxuICAgICAgICAgIHRoaXMuc25ha2VBSSA9IG5ldyBTbmFrZUFJUmFuZG9tKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5BaUxldmVsLkxPVzpcbiAgICAgICAgICB0aGlzLnNuYWtlQUkgPSBuZXcgU25ha2VBSUxvdygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuQWlMZXZlbC5ERUZBVUxUOlxuICAgICAgICAgIHRoaXMuc25ha2VBSSA9IG5ldyBTbmFrZUFJTm9ybWFsKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5BaUxldmVsLkhJR0g6XG4gICAgICAgICAgdGhpcy5zbmFrZUFJID0gbmV3IFNuYWtlQUlIaWdoKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgR2FtZUNvbnN0YW50cy5BaUxldmVsLlVMVFJBOlxuICAgICAgICAgIHRoaXMuc25ha2VBSSA9IG5ldyBTbmFrZUFJSGlnaCgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEdhbWVDb25zdGFudHMuQWlMZXZlbC5NT0NLOlxuICAgICAgICAgIHRoaXMuc25ha2VBSSA9IG5ldyBTbmFrZUFJTW9jaygpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMuc25ha2VBSSA9IG5ldyBTbmFrZUFJTm9ybWFsKCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc25ha2VBSSA9IHRoaXMuY3VzdG9tQUk7XG4gICAgICB0aGlzLmFpTGV2ZWwgPSBHYW1lQ29uc3RhbnRzLkFpTGV2ZWwuQ1VTVE9NO1xuICAgIH1cbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5pbml0aWFsRGlyZWN0aW9uO1xuICAgIHRoaXMuaW5pdFRyaWVkRGlyZWN0aW9ucyA9IFtdO1xuICAgIHRoaXMuZXJyb3JJbml0ID0gZmFsc2U7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLnNjb3JlTWF4ID0gZmFsc2U7XG4gICAgdGhpcy5sYXN0VGFpbE1vdmVkID0gdHJ1ZTtcbiAgICB0aGlzLmxhc3RUYWlsID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubGFzdEtleSA9IC0xO1xuICAgIHRoaXMudGlja3NEZWFkID0gMDtcbiAgICB0aGlzLnRpY2tzV2l0aG91dEFjdGlvbiA9IDA7XG4gICAgaWYodGhpcy5zbmFrZUFJKSB0aGlzLnNuYWtlQUkuYWlGcnVpdEdvYWwgPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUO1xuICB9XG5cbiAgaW5zZXJ0KHBvc2l0aW9uKSB7XG4gICAgdGhpcy5xdWV1ZS51bnNoaWZ0KHBvc2l0aW9uKTtcbiAgICB0aGlzLmdyaWQuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuU05BS0UsIHBvc2l0aW9uKTtcbiAgfVxuXG4gIHJlbW92ZSgpIHtcbiAgICBjb25zdCBsYXN0ID0gdGhpcy5xdWV1ZS5wb3AoKTtcbiAgICB0aGlzLmdyaWQuc2V0KEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFksIGxhc3QpO1xuICAgIHRoaXMubGFzdFRhaWwgPSBsYXN0O1xuICB9XG5cbiAgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXVlLmxlbmd0aDtcbiAgfVxuXG4gIGdldChpbmRleCkge1xuICAgIGlmKHRoaXMucXVldWVbaW5kZXhdICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlW2luZGV4XS5jb3B5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHNldChpbmRleCwgcG9zaXRpb24pIHtcbiAgICBpZihpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5sZW5ndGgoKSkge1xuICAgICAgdGhpcy5xdWV1ZVtpbmRleF0gPSBwb3NpdGlvbjtcbiAgICB9XG4gIH1cblxuICBnZXRIZWFkUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KDApO1xuICB9XG5cbiAgZ2V0VGFpbFBvc2l0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmdldCh0aGlzLmxlbmd0aCgpIC0gMSk7XG4gIH1cblxuICBoYXNNYXhTY29yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkLmdldFRvdGFsKEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRU1QVFkpIDw9IDAgJiYgIXRoaXMuZ3JpZC5mcnVpdFBvc0dvbGQgJiYgIXRoaXMuZ3JpZC5mcnVpdFBvcztcbiAgfVxuXG4gIHNldEdhbWVPdmVyKHRpY2tzKSB7XG4gICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgdGhpcy50aWNrc0RlYWQgPSB0aWNrcztcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aCgpOyBpKyspIHtcbiAgICAgIHRoaXMuZ3JpZC5zZXQoR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5TTkFLRV9ERUFELCB0aGlzLmdldChpKSk7XG4gICAgfVxuICB9XG5cbiAga2lsbCgpIHtcbiAgICB0aGlzLmF1dG9SZXRyeSA9IGZhbHNlO1xuICAgIHRoaXMuZ3JpZCA9IG51bGw7XG4gICAgdGhpcy5xdWV1ZSA9IG51bGw7XG4gIH1cblxuICBrZXlUb0RpcmVjdGlvbihrZXkpIHtcbiAgICBpZihrZXkgPT0gR2FtZUNvbnN0YW50cy5LZXkuTEVGVCAmJiB0aGlzLmRpcmVjdGlvbiAhPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCAmJiB0aGlzLmRpcmVjdGlvbiAhPSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5MRUZUKSB7XG4gICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVDtcbiAgICB9XG5cbiAgICBpZihrZXkgPT0gR2FtZUNvbnN0YW50cy5LZXkuVVAgJiYgdGhpcy5kaXJlY3Rpb24gIT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NICYmIHRoaXMuZGlyZWN0aW9uICE9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQKSB7XG4gICAgICByZXR1cm4gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVA7XG4gICAgfVxuXG4gICAgaWYoa2V5ID09IEdhbWVDb25zdGFudHMuS2V5LlJJR0hUICYmIHRoaXMuZGlyZWN0aW9uICE9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQgJiYgdGhpcy5kaXJlY3Rpb24gIT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQpIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVDtcbiAgICB9XG5cbiAgICBpZihrZXkgPT0gR2FtZUNvbnN0YW50cy5LZXkuQk9UVE9NICYmIHRoaXMuZGlyZWN0aW9uICE9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlVQICYmIHRoaXMuZGlyZWN0aW9uICE9IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG1vdmVUbyhrZXkpIHtcbiAgICBjb25zdCBkaXJlY3Rpb24gPSB0aGlzLmtleVRvRGlyZWN0aW9uKGtleSk7XG5cbiAgICBpZihkaXJlY3Rpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgfVxuICB9XG5cbiAgZ2V0TmV4dFBvc2l0aW9uKG9sZFBvcywgbmV3RGlyZWN0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3JpZC5nZXROZXh0UG9zaXRpb24ob2xkUG9zLCBuZXdEaXJlY3Rpb24pO1xuICB9XG5cbiAgZ2V0RGlyZWN0aW9uVG8ocG9zaXRpb24sIG90aGVyUG9zaXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkLmdldERpcmVjdGlvblRvKHBvc2l0aW9uLCBvdGhlclBvc2l0aW9uKTtcbiAgfVxuXG4gIGdldEdyYXBoaWNEaXJlY3Rpb25Gb3IoY3VycmVudCwgbmV4dCwgcHJlYykge1xuICAgIGlmKG5leHQgPT0gdW5kZWZpbmVkIHx8IHByZWMgPT0gdW5kZWZpbmVkKSByZXR1cm4gY3VycmVudC5kaXJlY3Rpb247XG5cbiAgICBjb25zdCBkaXJlY3Rpb25Ub1ByZWMgPSB0aGlzLmdldERpcmVjdGlvblRvKGN1cnJlbnQsIHByZWMpO1xuICAgIGNvbnN0IGRpcmVjdGlvblRvTmV4dCA9IHRoaXMuZ2V0RGlyZWN0aW9uVG8oY3VycmVudCwgbmV4dCk7XG5cbiAgICBpZihkaXJlY3Rpb25Ub1ByZWMgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCAmJiBkaXJlY3Rpb25Ub05leHQgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NIHx8IGRpcmVjdGlvblRvUHJlYyA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5CT1RUT00gJiYgZGlyZWN0aW9uVG9OZXh0ID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkxFRlQpIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5BTkdMRV8xO1xuICAgIH0gZWxzZSBpZihkaXJlY3Rpb25Ub1ByZWMgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQgJiYgZGlyZWN0aW9uVG9OZXh0ID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkJPVFRPTSB8fCBkaXJlY3Rpb25Ub1ByZWMgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NICYmIGRpcmVjdGlvblRvTmV4dCA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkFOR0xFXzI7XG4gICAgfSBlbHNlIGlmKGRpcmVjdGlvblRvUHJlYyA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCAmJiBkaXJlY3Rpb25Ub05leHQgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uUklHSFQgfHwgZGlyZWN0aW9uVG9QcmVjID09IEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLlJJR0hUICYmIGRpcmVjdGlvblRvTmV4dCA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCkge1xuICAgICAgcmV0dXJuIEdhbWVDb25zdGFudHMuRGlyZWN0aW9uLkFOR0xFXzM7XG4gICAgfSBlbHNlIGlmKGRpcmVjdGlvblRvUHJlYyA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5VUCAmJiBkaXJlY3Rpb25Ub05leHQgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCB8fCBkaXJlY3Rpb25Ub1ByZWMgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCAmJiBkaXJlY3Rpb25Ub05leHQgPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVApIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5BTkdMRV80O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gY3VycmVudC5kaXJlY3Rpb247XG4gICAgfVxuICB9XG5cbiAgZ2V0R3JhcGhpY0RpcmVjdGlvbihpbmRleCkge1xuICAgIHJldHVybiB0aGlzLmdldEdyYXBoaWNEaXJlY3Rpb25Gb3IodGhpcy5nZXQoaW5kZXgpLCB0aGlzLmdldChpbmRleCAtIDEpLCB0aGlzLmdldChpbmRleCArIDEpKTtcbiAgfVxuXG4gIGNvcHkoKSB7XG4gICAgY29uc3Qgc25ha2UgPSBuZXcgU25ha2UoZGlyZWN0aW9uLCAzLCBuZXcgR3JpZCh0aGlzLmdyaWQud2lkdGgsIHRoaXMuZ3JpZC5oZWlnaHQsIGZhbHNlLCBmYWxzZSksIHRoaXMucGxheWVyLCB0aGlzLmFpTGV2ZWwsIGZhbHNlKTtcblxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzbmFrZS5ncmlkLmhlaWdodDsgaSsrKSB7XG4gICAgICBmb3IobGV0IGogPSAwOyBqIDwgc25ha2UuZ3JpZC53aWR0aDsgaisrKSB7XG4gICAgICAgIHNuYWtlLmdyaWQuc2V0KHRoaXMuZ3JpZC5nZXQobmV3IFBvc2l0aW9uKGosIGkpKSwgbmV3IFBvc2l0aW9uKGosIGkpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzbmFrZS5xdWV1ZSA9IFtdO1xuXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucXVldWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNuYWtlLnF1ZXVlLnB1c2goZWxlbS5jb3B5KCkpO1xuICAgIH1cblxuICAgIHJldHVybiBzbmFrZTtcbiAgfVxuXG4gIGFpKCkge1xuICAgIGlmKHRoaXMuc25ha2VBSSAmJiB0aGlzLnNuYWtlQUkuYWkpIHtcbiAgICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuc25ha2VBSS5haSh0aGlzKTtcblxuICAgICAgaWYoIWFjdGlvbiB8fCB0aGlzLmtleVRvRGlyZWN0aW9uKGFjdGlvbikgPT0gdGhpcy5kaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy50aWNrc1dpdGhvdXRBY3Rpb24rKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudGlja3NXaXRob3V0QWN0aW9uID0gMDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFjdGlvbjtcbiAgICB9XG4gICAgXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpc0FJU3R1Y2sod2lkdGhMaW1pdCwgaGVpZ2h0TGltaXQpIHtcbiAgICBpZih0aGlzLnNuYWtlQUkgJiYgdGhpcy5zbmFrZUFJLmFpKSB7XG4gICAgICBpZigodGhpcy5kaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uTEVGVCB8fCB0aGlzLmRpcmVjdGlvbiA9PSBHYW1lQ29uc3RhbnRzLkRpcmVjdGlvbi5SSUdIVCkgJiYgdGhpcy50aWNrc1dpdGhvdXRBY3Rpb24gPj0gdGhpcy5ncmlkLndpZHRoICogd2lkdGhMaW1pdCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZigodGhpcy5kaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uVVAgfHwgdGhpcy5kaXJlY3Rpb24gPT0gR2FtZUNvbnN0YW50cy5EaXJlY3Rpb24uQk9UVE9NKSAmJiB0aGlzLnRpY2tzV2l0aG91dEFjdGlvbiA+PSB0aGlzLmdyaWQuaGVpZ2h0ICogaGVpZ2h0TGltaXQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0QUlMZXZlbFRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuc25ha2VBSSA/IHRoaXMuc25ha2VBSS5haUxldmVsVGV4dCA6IFwiPz8/XCI7XG4gIH1cbn0iLCIvKlxuICogQ29weXJpZ2h0IChDKSAyMDE5LTIwMjAgRWxpYXN0aWsgKGVsaWFzdGlrc29mdHMuY29tKVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFwiU25ha2VJQVwiLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggXCJTbmFrZUlBXCIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbmltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gXCIuLi9Db25zdGFudHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU25ha2VBSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWlGcnVpdEdvYWwgPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUO1xuICAgIHRoaXMuX2FpTGV2ZWxUZXh0ID0gXCJjdXN0b21cIjtcbiAgfVxuXG4gIGFpKHNuYWtlKSB7XG4gICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gc25ha2UuZ2V0SGVhZFBvc2l0aW9uKCk7XG4gICAgY29uc3QgZnJ1aXRQb3MgPSBzbmFrZS5ncmlkLmZydWl0UG9zO1xuICAgIGNvbnN0IGZydWl0UG9zR29sZCA9IHNuYWtlLmdyaWQuZnJ1aXRQb3NHb2xkO1xuXG4gICAgaWYoZnJ1aXRQb3MgJiYgc25ha2UuZ3JpZC5nZXQoZnJ1aXRQb3MpID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVQpIHtcbiAgICAgIGNvbnN0IGRpc3RGcnVpdCA9IE1hdGguYWJzKGZydWl0UG9zLnggLSBjdXJyZW50UG9zaXRpb24ueCkgKyBNYXRoLmFicyhmcnVpdFBvcy55IC0gY3VycmVudFBvc2l0aW9uLnkpO1xuICAgICAgY29uc3QgZGlzdEZydWl0R29sZCA9IGZydWl0UG9zR29sZCA/IE1hdGguYWJzKGZydWl0UG9zR29sZC54IC0gY3VycmVudFBvc2l0aW9uLngpICsgTWF0aC5hYnMoZnJ1aXRQb3NHb2xkLnkgLSBjdXJyZW50UG9zaXRpb24ueSkgOiAtMTtcbiAgICBcbiAgICAgIGlmKGZydWl0UG9zR29sZCAmJiBzbmFrZS5ncmlkLmdldChmcnVpdFBvc0dvbGQpID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVRfR09MRCAmJiB0aGlzLmFpRnJ1aXRHb2FsID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVQpIHtcbiAgICAgICAgaWYoZGlzdEZydWl0R29sZCA8PSBkaXN0RnJ1aXQpIHtcbiAgICAgICAgICB0aGlzLmFpRnJ1aXRHb2FsID0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuYWlGcnVpdEdvYWwgPSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoIWZydWl0UG9zR29sZCB8fCBzbmFrZS5ncmlkLmdldChmcnVpdFBvc0dvbGQpICE9IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVRfR09MRCkge1xuICAgICAgICB0aGlzLmFpRnJ1aXRHb2FsID0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoKCFmcnVpdFBvcyB8fCBzbmFrZS5ncmlkLmdldChmcnVpdFBvcykgIT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVCkgJiYgZnJ1aXRQb3NHb2xkICYmIHNuYWtlLmdyaWQuZ2V0KGZydWl0UG9zR29sZCkgPT0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEKSB7XG4gICAgICB0aGlzLmFpRnJ1aXRHb2FsID0gR2FtZUNvbnN0YW50cy5DYXNlVHlwZS5GUlVJVF9HT0xEO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0IGFpTGV2ZWxUZXh0KCkge1xuICAgIHJldHVybiB0aGlzLl9haUxldmVsVGV4dDtcbiAgfVxufSIsIlxuLypcbiAqIENvcHlyaWdodCAoQykgMjAxOS0yMDIwIEVsaWFzdGlrIChlbGlhc3Rpa3NvZnRzLmNvbSlcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBcIlNuYWtlSUFcIi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFwiU25ha2VJQVwiLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5pbXBvcnQgU25ha2VBSUxvdyBmcm9tIFwiLi9TbmFrZUFJTG93XCI7XG5pbXBvcnQgU25ha2VBSU5vcm1hbCBmcm9tIFwiLi9TbmFrZUFJTm9ybWFsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNuYWtlQUlIaWdoIGV4dGVuZHMgU25ha2VBSU5vcm1hbCB7XG4gIGNvbnN0cnVjdG9yKHNuYWtlKSB7XG4gICAgc3VwZXIodHJ1ZSk7XG4gICAgdGhpcy5haUxvdyA9IG5ldyBTbmFrZUFJTG93KHNuYWtlKTtcbiAgICB0aGlzLl9haUxldmVsVGV4dCA9IFwiaGlnaFwiO1xuICB9XG5cbiAgYWkoc25ha2UpIHtcbiAgICBjb25zdCByZXMgPSBzdXBlci5haShzbmFrZSk7XG5cbiAgICBpZighcmVzKSB7XG4gICAgICByZXR1cm4gdGhpcy5haUxvdy5haShzbmFrZSk7XG4gICAgfVxuICAgIFxuICAgIHJldHVybiByZXM7XG4gIH1cbn0iLCJcbi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuaW1wb3J0IFNuYWtlQUkgZnJvbSBcIi4vU25ha2VBSVwiO1xuaW1wb3J0IEdhbWVDb25zdGFudHMgZnJvbSBcIi4uL0NvbnN0YW50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbmFrZUFJTG93IGV4dGVuZHMgU25ha2VBSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYWlMZXZlbFRleHQgPSBcImxvd1wiO1xuICB9XG5cbiAgYWkoc25ha2UpIHtcbiAgICBzdXBlci5haShzbmFrZSk7XG5cbiAgICBpZihzbmFrZS5ncmlkLmZydWl0UG9zICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHNuYWtlLmdldEhlYWRQb3NpdGlvbigpO1xuICAgICAgY29uc3QgZnJ1aXRQb3MgPSB0aGlzLmFpRnJ1aXRHb2FsID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVRfR09MRCA/IHNuYWtlLmdyaWQuZnJ1aXRQb3NHb2xkIDogc25ha2UuZ3JpZC5mcnVpdFBvcztcbiAgICAgIGxldCBkaXJlY3Rpb25OZXh0ID0gR2FtZUNvbnN0YW50cy5LZXkuUklHSFQ7XG5cbiAgICAgIGlmKGZydWl0UG9zLnggPiBjdXJyZW50UG9zaXRpb24ueCkge1xuICAgICAgICBpZihmcnVpdFBvcy54IC0gY3VycmVudFBvc2l0aW9uLnggPiBzbmFrZS5ncmlkLndpZHRoIC8gMikge1xuICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5MRUZUO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5SSUdIVDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKGZydWl0UG9zLnggPCBjdXJyZW50UG9zaXRpb24ueCkge1xuICAgICAgICBpZihjdXJyZW50UG9zaXRpb24ueCAtIGZydWl0UG9zLnggPiBzbmFrZS5ncmlkLndpZHRoIC8gMikge1xuICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5SSUdIVDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXJlY3Rpb25OZXh0ID0gR2FtZUNvbnN0YW50cy5LZXkuTEVGVDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKGZydWl0UG9zLnkgPCBjdXJyZW50UG9zaXRpb24ueSkge1xuICAgICAgICBpZihjdXJyZW50UG9zaXRpb24ueSAtIGZydWl0UG9zLnkgPiBzbmFrZS5ncmlkLmhlaWdodCAvIDIpIHtcbiAgICAgICAgICBkaXJlY3Rpb25OZXh0ID0gR2FtZUNvbnN0YW50cy5LZXkuQk9UVE9NO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5VUDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKGZydWl0UG9zLnkgPiBjdXJyZW50UG9zaXRpb24ueSkge1xuICAgICAgICBpZihmcnVpdFBvcy55IC0gY3VycmVudFBvc2l0aW9uLnkgPiBzbmFrZS5ncmlkLmhlaWdodCAvIDIpIHtcbiAgICAgICAgICBkaXJlY3Rpb25OZXh0ID0gR2FtZUNvbnN0YW50cy5LZXkuVVA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGlyZWN0aW9uTmV4dCA9IEdhbWVDb25zdGFudHMuS2V5LkJPVFRPTTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgbmV4dFBvc2l0aW9uID0gc25ha2UuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgZGlyZWN0aW9uTmV4dCk7XG5cbiAgICAgIGlmKHNuYWtlLmdyaWQuaXNEZWFkUG9zaXRpb24obmV4dFBvc2l0aW9uKSkge1xuICAgICAgICBjb25zdCBjdXJyZW50RGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XG4gICAgICAgIGxldCBmaXJzdERpZmZlcmVudERpcmVjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IHNuYWtlLnF1ZXVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYoc25ha2UuZ2V0KGkpLmRpcmVjdGlvbiAhPSBjdXJyZW50RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBmaXJzdERpZmZlcmVudERpcmVjdGlvbiA9IHNuYWtlLmdldChpKS5kaXJlY3Rpb247XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuZXh0UG9zaXRpb24gPSBzbmFrZS5nZXROZXh0UG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBmaXJzdERpZmZlcmVudERpcmVjdGlvbik7XG5cbiAgICAgICAgaWYoc25ha2UuZ3JpZC5pc0RlYWRQb3NpdGlvbihuZXh0UG9zaXRpb24pKSB7XG4gICAgICAgICAgaWYoIXNuYWtlLmdyaWQuaXNEZWFkUG9zaXRpb24oc25ha2UuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5LZXkuVVApKSkge1xuICAgICAgICAgICAgZGlyZWN0aW9uTmV4dCA9IEdhbWVDb25zdGFudHMuS2V5LlVQO1xuICAgICAgICAgIH0gZWxzZSBpZighc25ha2UuZ3JpZC5pc0RlYWRQb3NpdGlvbihzbmFrZS5nZXROZXh0UG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLktleS5SSUdIVCkpKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb25OZXh0ID0gR2FtZUNvbnN0YW50cy5LZXkuUklHSFQ7XG4gICAgICAgICAgfSBlbHNlIGlmKCFzbmFrZS5ncmlkLmlzRGVhZFBvc2l0aW9uKHNuYWtlLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIEdhbWVDb25zdGFudHMuS2V5LkJPVFRPTSkpKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb25OZXh0ID0gR2FtZUNvbnN0YW50cy5LZXkuQk9UVE9NO1xuICAgICAgICAgIH0gZWxzZSBpZighc25ha2UuZ3JpZC5pc0RlYWRQb3NpdGlvbihzbmFrZS5nZXROZXh0UG9zaXRpb24oY3VycmVudFBvc2l0aW9uLCBHYW1lQ29uc3RhbnRzLktleS5MRUZUKSkpIHtcbiAgICAgICAgICAgIGRpcmVjdGlvbk5leHQgPSBHYW1lQ29uc3RhbnRzLktleS5MRUZUO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkaXJlY3Rpb25OZXh0ID0gbmV4dFBvc2l0aW9uLmNvbnZlcnRUb0tleURpcmVjdGlvbigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkaXJlY3Rpb25OZXh0O1xuICAgIH1cbiAgfVxufSIsIlxuLypcbiAqIENvcHlyaWdodCAoQykgMjAxOS0yMDIwIEVsaWFzdGlrIChlbGlhc3Rpa3NvZnRzLmNvbSlcbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiBcIlNuYWtlSUFcIi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gKiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIFwiU25ha2VJQVwiLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxuICovXG5pbXBvcnQgU25ha2VBSSBmcm9tIFwiLi9TbmFrZUFJXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNuYWtlQUlNb2NrIGV4dGVuZHMgU25ha2VBSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYWlMZXZlbFRleHQgPSBcIm1vY2tcIjtcbiAgfVxuXG4gIGFpKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59IiwiXG4vKlxuICogQ29weXJpZ2h0IChDKSAyMDE5LTIwMjAgRWxpYXN0aWsgKGVsaWFzdGlrc29mdHMuY29tKVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFwiU25ha2VJQVwiLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggXCJTbmFrZUlBXCIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbmltcG9ydCBTbmFrZUFJIGZyb20gXCIuL1NuYWtlQUlcIjtcbmltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBQb3NpdGlvbiBmcm9tIFwiLi4vUG9zaXRpb25cIjtcbmltcG9ydCAqIGFzIExvd2xpZ2h0IGZyb20gXCIuLi8uLi8uLi9saWJzL2xvd2xpZ2h0LmFzdGFyLm1pblwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbmFrZUFJTm9ybWFsIGV4dGVuZHMgU25ha2VBSSB7XG4gIGNvbnN0cnVjdG9yKGVuYWJsZVRvcnVzKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmVuYWJsZVRvcnVzID0gZW5hYmxlVG9ydXM7XG4gICAgdGhpcy5fYWlMZXZlbFRleHQgPSBcIm5vcm1hbFwiO1xuICB9XG5cbiAgYWkoc25ha2UpIHtcbiAgICBzdXBlci5haShzbmFrZSk7XG5cbiAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBzbmFrZS5nZXRIZWFkUG9zaXRpb24oKTtcbiAgICBjb25zdCBmcnVpdFBvcyA9IHNuYWtlLmdyaWQuZnJ1aXRQb3M7XG4gICAgY29uc3QgZnJ1aXRQb3NHb2xkID0gc25ha2UuZ3JpZC5mcnVpdFBvc0dvbGQ7XG4gICAgbGV0IGZydWl0VGFyZ2V0ID0gZnJ1aXRQb3M7XG5cbiAgICBpZihjdXJyZW50UG9zaXRpb24gJiYgKGZydWl0UG9zIHx8IGZydWl0UG9zR29sZCkpIHtcbiAgICAgIGNvbnN0IGdyaWQgPSBzbmFrZS5ncmlkLmdldEdyYXBoKGZhbHNlKTtcblxuICAgICAgY29uc3QgZ3JhcGggPSBuZXcgTG93bGlnaHQuQXN0YXIuQ29uZmlndXJhdGlvbihncmlkLCB7XG4gICAgICAgIG9yZGVyOiBcInl4XCIsXG4gICAgICAgIHRvcnVzOiB0aGlzLmVuYWJsZVRvcnVzID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICBkaWFnb25hbHM6IGZhbHNlLFxuICAgICAgICBjdXR0aW5nOiBmYWxzZSxcbiAgICAgICAgc3RhdGljOiB0cnVlLFxuICAgICAgICBjb3N0KGEsIGIpIHsgcmV0dXJuIGIgPT0gMSA/IG51bGwgOiAxIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZihmcnVpdFBvc0dvbGQgJiYgdGhpcy5haUZydWl0R29hbCA9PSBHYW1lQ29uc3RhbnRzLkNhc2VUeXBlLkZSVUlUX0dPTEQpIHtcbiAgICAgICAgZnJ1aXRUYXJnZXQgPSBmcnVpdFBvc0dvbGQ7XG4gICAgICB9XG5cbiAgICAgIGxldCBwYXRoID0gZ3JhcGgucGF0aCh7IHg6IGN1cnJlbnRQb3NpdGlvbi54LCB5OiBjdXJyZW50UG9zaXRpb24ueSB9LCB7IHg6IGZydWl0VGFyZ2V0ID8gZnJ1aXRUYXJnZXQueCA6IG51bGwsIHk6IGZydWl0VGFyZ2V0ID8gZnJ1aXRUYXJnZXQueSA6IG51bGwgfSk7XG5cbiAgICAgIGlmKHBhdGgubGVuZ3RoIDwgMSkge1xuICAgICAgICBpZih0aGlzLmFpRnJ1aXRHb2FsID09IEdhbWVDb25zdGFudHMuQ2FzZVR5cGUuRlJVSVRfR09MRCB8fCAhZnJ1aXRQb3NHb2xkKSB7XG4gICAgICAgICAgZnJ1aXRUYXJnZXQgPSBmcnVpdFBvcztcbiAgICAgICAgfVxuXG4gICAgICAgIHBhdGggPSBncmFwaC5wYXRoKHsgeDogY3VycmVudFBvc2l0aW9uLngsIHk6IGN1cnJlbnRQb3NpdGlvbi55IH0sIHsgeDogZnJ1aXRUYXJnZXQgPyBmcnVpdFRhcmdldC54IDogbnVsbCwgeTogZnJ1aXRUYXJnZXQgPyBmcnVpdFRhcmdldC55IDogbnVsbCB9KTtcbiAgICAgIH1cblxuICAgICAgaWYocGF0aC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IG5leHRQb3NpdGlvbiA9IG5ldyBQb3NpdGlvbihwYXRoWzFdLngsIHBhdGhbMV0ueSk7XG4gICAgICAgIHJldHVybiBuZXcgUG9zaXRpb24obnVsbCwgbnVsbCwgc25ha2UuZ2V0RGlyZWN0aW9uVG8oY3VycmVudFBvc2l0aW9uLCBuZXh0UG9zaXRpb24pKS5jb252ZXJ0VG9LZXlEaXJlY3Rpb24oKTtcbiAgICAgIH1cblxuICAgICAgZ3JpZCwgZ3JhcGgsIHBhdGggPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG59IiwiXG4vKlxuICogQ29weXJpZ2h0IChDKSAyMDE5LTIwMjAgRWxpYXN0aWsgKGVsaWFzdGlrc29mdHMuY29tKVxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIFwiU25ha2VJQVwiLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBcIlNuYWtlSUFcIiBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcbiAqIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggXCJTbmFrZUlBXCIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG4gKi9cbmltcG9ydCBTbmFrZUFJIGZyb20gXCIuL1NuYWtlQUlcIjtcbmltcG9ydCBHYW1lQ29uc3RhbnRzIGZyb20gXCIuLi9Db25zdGFudHNcIjtcbmltcG9ydCBHYW1lVXRpbHMgZnJvbSBcIi4uL0dhbWVVdGlsc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbmFrZUFJUmFuZG9tIGV4dGVuZHMgU25ha2VBSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5fYWlMZXZlbFRleHQgPSBcInJhbmRvbVwiO1xuICB9XG5cbiAgYWkoc25ha2UpIHtcbiAgICBzdXBlci5haShzbmFrZSk7XG5cbiAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBzbmFrZS5nZXRIZWFkUG9zaXRpb24oKTtcbiAgICBjb25zdCB0b3AgPSBzbmFrZS5ncmlkLmlzRGVhZFBvc2l0aW9uKHNuYWtlLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIEdhbWVDb25zdGFudHMuS2V5LlVQKSk7XG4gICAgY29uc3QgbGVmdCA9IHNuYWtlLmdyaWQuaXNEZWFkUG9zaXRpb24oc25ha2UuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5LZXkuTEVGVCkpO1xuICAgIGNvbnN0IGJvdHRvbSA9IHNuYWtlLmdyaWQuaXNEZWFkUG9zaXRpb24oc25ha2UuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgR2FtZUNvbnN0YW50cy5LZXkuQk9UVE9NKSk7XG4gICAgY29uc3QgcmlnaHQgPSBzbmFrZS5ncmlkLmlzRGVhZFBvc2l0aW9uKHNuYWtlLmdldE5leHRQb3NpdGlvbihjdXJyZW50UG9zaXRpb24sIEdhbWVDb25zdGFudHMuS2V5LlJJR0hUKSk7XG5cbiAgICBpZih0b3AgJiYgbGVmdCAmJiBib3R0b20gJiYgcmlnaHQpIHtcbiAgICAgIHJldHVybiBHYW1lQ29uc3RhbnRzLktleS5VUDtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGRpcmVjdGlvbiA9IG51bGw7XG5cbiAgICAgIHdoaWxlKGRpcmVjdGlvbiA9PSBudWxsIHx8IHNuYWtlLmdyaWQuaXNEZWFkUG9zaXRpb24oc25ha2UuZ2V0TmV4dFBvc2l0aW9uKGN1cnJlbnRQb3NpdGlvbiwgZGlyZWN0aW9uKSkpIHtcbiAgICAgICAgY29uc3QgciA9IEdhbWVVdGlscy5yYW5kUmFuZ2UoMSwgNCwgc25ha2UuZ3JpZCA/IHNuYWtlLmdyaWQucm5nR2FtZSA6IG51bGwpO1xuXG4gICAgICAgIHN3aXRjaChyKSB7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgZGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5LZXkuVVA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBHYW1lQ29uc3RhbnRzLktleS5MRUZUO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgZGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5LZXkuQk9UVE9NO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgZGlyZWN0aW9uID0gR2FtZUNvbnN0YW50cy5LZXkuUklHSFQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGlyZWN0aW9uO1xuICAgIH1cbiAgfVxufSIsIi8qXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTktMjAyMCBFbGlhc3RpayAoZWxpYXN0aWtzb2Z0cy5jb20pXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgXCJTbmFrZUlBXCIuXG4gKlxuICogXCJTbmFrZUlBXCIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIFwiU25ha2VJQVwiIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxuICogR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBcIlNuYWtlSUFcIi4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cbiAqL1xuaW1wb3J0IFNuYWtlQUkgZnJvbSBcIi4vU25ha2VBSVwiO1xuaW1wb3J0IFNuYWtlQUlSYW5kb20gZnJvbSBcIi4vU25ha2VBSVJhbmRvbVwiO1xuaW1wb3J0IFNuYWtlQUlMb3cgZnJvbSBcIi4vU25ha2VBSUxvd1wiO1xuaW1wb3J0IFNuYWtlQUlOb3JtYWwgZnJvbSBcIi4vU25ha2VBSU5vcm1hbFwiO1xuaW1wb3J0IFNuYWtlQUlIaWdoIGZyb20gXCIuL1NuYWtlQUlIaWdoXCI7XG5pbXBvcnQgU25ha2VBSU1vY2sgZnJvbSBcIi4vU25ha2VBSU1vY2tcIjtcblxuZXhwb3J0IHsgU25ha2VBSSwgU25ha2VBSVJhbmRvbSwgU25ha2VBSUxvdywgU25ha2VBSU5vcm1hbCwgU25ha2VBSUhpZ2gsIFNuYWtlQUlNb2NrIH0iLCIvKiAoaWdub3JlZCkgKi8iXSwic291cmNlUm9vdCI6IiJ9