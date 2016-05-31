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
/******/ 	__webpack_require__.p = "/mfg-wechat/bundle/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(59);


/***/ },

/***/ 4:
/***/ function(module, exports) {

	/*TMODJS:{}*/
	!function () {
		function a(a, b) {
			return (/string|function/.test(typeof b) ? h : g)(a, b)
		}
	
		function b(a, c) {
			return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
		}
	
		function c(a) {
			return l[a]
		}
	
		function d(a) {
			return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
		}
	
		function e(a, b) {
			if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
		}
	
		function f(a, b) {
			var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
			for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
			return e
		}
	
		function g(b, c) {
			var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
			return c ? d(c) : d
		}
	
		function h(a, b) {
			if ("string" == typeof b) {
				var c = b;
				b = function () {
					return new k(c)
				}
			}
			var d = j[a] = function (c) {
				try {
					return new b(c, a) + ""
				} catch (d) {
					return i(d)()
				}
			};
			return d.prototype = b.prototype = n, d.toString = function () {
				return b + ""
			}, d
		}
	
		function i(a) {
			var b = "{Template Error}", c = a.stack || "";
			if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
			return function () {
				return "object" == typeof console && console.error(b + "\n\n" + c), b
			}
		}
	
		var j = a.cache = {}, k = this.String, l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		}, m = Array.isArray || function (a) {
				return "[object Array]" === {}.toString.call(a)
			}, n = a.utils = {
			$helpers: {}, $include: function (a, b, c) {
				return a = f(c, a), g(a, b)
			}, $string: b, $escape: d, $each: e
		}, o = a.helpers = n.$helpers;
		a.get = function (a) {
			return j[a.replace(/^\.\//, "")]
		}, a.helper = function (a, b) {
			o[a] = b
		}, module.exports = a
	}();

/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/20.
	 */
	__webpack_require__(12);
	var selectTpl = __webpack_require__(18);
	var selectUlTpl = __webpack_require__(19);
	
	function mockSelect(dom, data, callbackId, callback, id, callBackFlag){
	    this.dom = $("." + dom);
	    this.data = data;
	    this.callbackId = callbackId;
	    this.callback = callback;
	    this.id = $("#" + id);
	    this.callBackFlag = callBackFlag;
	    this.initDom();
	    this.initBtns();
	}
	mockSelect.prototype = {
	    initDom: function(){
	        this.dom.html(selectTpl(this.data));
	        this.id.html(selectUlTpl(this.data));
	        this.callbackId(this.dom.find(".name").attr('data-id'));
	        if (this.callBackFlag) {
	            this.callBackFlag(true);
	        }
	        var offset = this.dom.offset();
	        this.id.find(".mock-ul").css({
	            'left': 0,
	            'top': offset.top + 42
	        });
	        this.id.find(".mock-ul").css({
	            'max-height': $(window).height() - offset.height - offset.top
	        });
	    },
	    initBtns: function(){
	        //点击显示下拉
	        var tThis= this;
	        this.dom.delegate('.name-wrap', 'touchstart', function(){
	            //console.log(tThis.dom);
	            if (!(tThis.dom.find('.name-wrap').hasClass('active'))) {
	                $(".mock-select").removeClass('active').find(".name-wrap").removeClass('active');
	                $(".mock-ul").hide();
	                $(this).addClass('active');
	                tThis.dom.find(".mock-select").addClass('active');
	                tThis.id.find(".mock-ul").show();
	            } else {
	                $(".mock-ul").hide();
	                $(".mock-select").removeClass('active').find(".name-wrap").removeClass('active');
	                $(this).removeClass('active');
	                tThis.dom.find(".mock-select").removeClass('active');
	                tThis.id.find(".mock-ul").hide();
	            }
	        });
	        //下拉消失
	        this.id.delegate('li', 'touchend', function(){
	            tThis.id.find("li.active").removeClass("active");
	            $(this).addClass("active").find(".right").removeClass("display-none");
	            tThis.dom.find('.name-wrap').removeClass('active').find(".name").html($(this).find(".item-name").html()).attr("data-id", $(this).attr("data-id"));
	            tThis.dom.find(".mock-select").removeClass('active');
	            tThis.id.find(".mock-ul").hide();
	            tThis.callbackId(tThis.dom.find(".name").attr('data-id'));
	            if (tThis.callback) {
	                tThis.callback();
	            }
	        });
	    }
	};
	module.exports = function(dom, data, callbackId, callback, id, callBackFlag){
	    /**
	     * * 模拟下拉框组件
	     * 拿到id
	     * @param dom       下拉框父级class
	     * @param data      下拉数据（处理过的格式为{data: [{id:'',name:''},{},{}]}）,另外注意orderNum > 0 ? +orderNum : ''
	     * @param callbackId      通过回调传给个人页面需要的id
	     * @param callback        个人页面的回调处理
	     * @param id              存放下拉选项的id
	     * @param callBackFlag（非必传）  告诉页面模板渲染完了有了id等参数 可以渲染个人页面了
	     */
	    return new mockSelect(dom, data, callbackId, callback, id, callBackFlag);
	};

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./mock-select.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./mock-select.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".mock-select{\r\n    line-height: 42px;\r\n    height: 42px;\r\n    text-align: center;\r\n    border:none;\r\n}\r\n.mock-select .name-wrap.active{\r\n    background: #fff;\r\n}\r\n.mock-ul{\r\n    position: absolute;\r\n    background: #fff;\r\n    z-index: 100;\r\n    border-bottom: 1px solid #d9d9d9;\r\n    width: 93.6%;\r\n    overflow: scroll;\r\n}\r\n.mock-select .name-wrap{\r\n    color: #fff;\r\n    height: 42px;\r\n    overflow: hidden;\r\n}\r\n.mock-select .bg{\r\n    display: inline-block;\r\n    height: 6px;\r\n    width: 13px;\r\n}\r\n.mock-select .name-wrap .bg{\r\n    background: url(" + __webpack_require__(15) + ") center center no-repeat;\r\n}\r\n.mock-select .name-wrap.active{\r\n    color: #00d535;\r\n}\r\n.mock-select .name-wrap.active .bg {\r\n    background: url(" + __webpack_require__(16) + ") center center no-repeat;\r\n}\r\n.mock-ul li{\r\n    margin:0;\r\n    color: #333333;\r\n    text-align: left;\r\n    height: 42px;\r\n    line-height: 42px;\r\n    border-top: 1px solid #d9d9d9;\r\n}\r\n.mock-ul li .right{\r\n    display: none;\r\n    float: right;\r\n    margin-right: 10px;\r\n}\r\n.mock-ul li.active .right{\r\n    display: inline;\r\n}\r\n.mock-ul li.active{\r\n    color: #00d535;\r\n}", ""]);
	
	// exports


/***/ },

/***/ 14:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 15:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAGCAYAAAAYLBS/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTYwQkQ4RjgyMEI2MTFFNjk4QjBGMzFFNkNGQTgxMDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTYwQkQ4RjcyMEI2MTFFNjk4QjBGMzFFNkNGQTgxMDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjkxMkNDRTlBMjBFNjExOEZCQzg4QzIxN0QyRUJGOSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmYxYzk5MjgxLTM4NWEtMTE3OS1hMzViLTkzNTU2ZTcyMjJiNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PheHe58AAABVSURBVHjaYvj//78OEN/7DwGf8OD/UHU6DEAChE2RJHCBT1B1DDBNICwMxBdwaLgAlWdA1wTCXEB8GE3DYag4Ay5NMLwNqmEbNnlcmkA4C5ccQIABAPGiC0psi9bFAAAAAElFTkSuQmCC"

/***/ },

/***/ 16:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAGCAYAAAAYLBS/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEFBNUQyRTYyMEI2MTFFNjg0OUZDNjY1RDdFMUNFMEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEFBNUQyRTUyMEI2MTFFNjg0OUZDNjY1RDdFMUNFMEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjkxMkNDRTlBMjBFNjExOEZCQzg4QzIxN0QyRUJGOSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmYxYzk5MjgxLTM4NWEtMTE3OS1hMzViLTkzNTU2ZTcyMjJiNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmlp944AAACeSURBVHjaYvj//78OEN/7DwGfQDjjWfsvEIbxofg/VJ0OA8NVUwYgwxQm0fhq9n+gGBiD2EjgE1QdA1gTVKNw6YtJz2EaYLjp1RyQhgsgeag6BkawJgioB+IGBiyAi4mj9du/HzUg9n+tUwwsUPF+IC5gwAGAGqqBFDcQF4L4IE35UA3fgfgPTCErIwvr7/9/fkO5LFA1D4B4IkCAAQDWEYtLHKvdIwAAAABJRU5ErkJggg=="

/***/ },

/***/ 17:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 18:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(4);
	module.exports=template('dep/component/mock-select/tpl/mock-select-tpl',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,data=$data.data,$out='';$out+='<div class="mock-select font-size16"> <div class="name-wrap"> <span class="name" data-id="';
	$out+=$escape(data[0].id);
	$out+='">';
	$out+=$escape(data[0].name);
	$out+='</span> <span class="bg"></span> </div> </div>';
	return new String($out);
	});

/***/ },

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(4);
	module.exports=template('dep/component/mock-select/tpl/select-ul-tpl',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul class="mock-ul box-padding display-none"> ';
	$each(data,function($value,$index){
	$out+=' ';
	if($index == 0){
	$out+=' <li style="border:none;" data-id="';
	$out+=$escape($value.id);
	$out+='"> <span class="item-name">';
	$out+=$escape($value.name);
	$out+='</span> <span class="right">√</span> </li> ';
	}else{
	$out+=' <li data-id="';
	$out+=$escape($value.id);
	$out+='"> <span class="item-name">';
	$out+=$escape($value.name);
	$out+='</span> <span class="right">√</span> </li> ';
	}
	$out+=' ';
	});
	$out+=' </ul>';
	return new String($out);
	});

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! mockjs 23-06-2014 15:57:37 */
	/*! src/mock-prefix.js */
	/*!
	    Mock - 模拟请求 & 模拟数据
	    https://github.com/nuysoft/Mock
	    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
	*/
	(function(undefined) {
	    var Mock = {
	        version: "0.1.5",
	        _mocked: {}
	    };
	    /*! src/util.js */
	    var Util = function() {
	        var Util = {};
	        Util.extend = function extend() {
	            var target = arguments[0] || {}, i = 1, length = arguments.length, options, name, src, copy, clone;
	            if (length === 1) {
	                target = this;
	                i = 0;
	            }
	            for (;i < length; i++) {
	                options = arguments[i];
	                if (!options) continue;
	                for (name in options) {
	                    src = target[name];
	                    copy = options[name];
	                    if (target === copy) continue;
	                    if (copy === undefined) continue;
	                    if (Util.isArray(copy) || Util.isObject(copy)) {
	                        if (Util.isArray(copy)) clone = src && Util.isArray(src) ? src : [];
	                        if (Util.isObject(copy)) clone = src && Util.isObject(src) ? src : {};
	                        target[name] = Util.extend(clone, copy);
	                    } else {
	                        target[name] = copy;
	                    }
	                }
	            }
	            return target;
	        };
	        Util.each = function each(obj, iterator, context) {
	            var i, key;
	            if (this.type(obj) === "number") {
	                for (i = 0; i < obj; i++) {
	                    iterator(i, i);
	                }
	            } else if (obj.length === +obj.length) {
	                for (i = 0; i < obj.length; i++) {
	                    if (iterator.call(context, obj[i], i, obj) === false) break;
	                }
	            } else {
	                for (key in obj) {
	                    if (iterator.call(context, obj[key], key, obj) === false) break;
	                }
	            }
	        };
	        Util.type = function type(obj) {
	            return obj === null || obj === undefined ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
	        };
	        Util.each("String Object Array RegExp Function".split(" "), function(value) {
	            Util["is" + value] = function(obj) {
	                return Util.type(obj) === value.toLowerCase();
	            };
	        });
	        Util.isObjectOrArray = function(value) {
	            return Util.isObject(value) || Util.isArray(value);
	        };
	        Util.isNumeric = function(value) {
	            return !isNaN(parseFloat(value)) && isFinite(value);
	        };
	        Util.keys = function(obj) {
	            var keys = [];
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) keys.push(key);
	            }
	            return keys;
	        };
	        Util.values = function(obj) {
	            var values = [];
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) values.push(obj[key]);
	            }
	            return values;
	        };
	        Util.heredoc = function heredoc(fn) {
	            return fn.toString().replace(/^[^\/]+\/\*!?/, "").replace(/\*\/[^\/]+$/, "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
	        };
	        Util.noop = function() {};
	        return Util;
	    }();
	    /*! src/random.js */
	    var Random = function() {
	        var Random = {
	            extend: Util.extend
	        };
	        Random.extend({
	            "boolean": function(min, max, cur) {
	                if (cur !== undefined) {
	                    min = typeof min !== "undefined" && !isNaN(min) ? parseInt(min, 10) : 1;
	                    max = typeof max !== "undefined" && !isNaN(max) ? parseInt(max, 10) : 1;
	                    return Math.random() > 1 / (min + max) * min ? !cur : cur;
	                }
	                return Math.random() >= .5;
	            },
	            bool: function(min, max, cur) {
	                return this.boolean(min, max, cur);
	            },
	            natural: function(min, max) {
	                min = typeof min !== "undefined" ? parseInt(min, 10) : 0;
	                max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
	                return Math.round(Math.random() * (max - min)) + min;
	            },
	            integer: function(min, max) {
	                min = typeof min !== "undefined" ? parseInt(min, 10) : -9007199254740992;
	                max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
	                return Math.round(Math.random() * (max - min)) + min;
	            },
	            "int": function(min, max) {
	                return this.integer(min, max);
	            },
	            "float": function(min, max, dmin, dmax) {
	                dmin = dmin === undefined ? 0 : dmin;
	                dmin = Math.max(Math.min(dmin, 17), 0);
	                dmax = dmax === undefined ? 17 : dmax;
	                dmax = Math.max(Math.min(dmax, 17), 0);
	                var ret = this.integer(min, max) + ".";
	                for (var i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
	                    ret += this.character("number");
	                }
	                return parseFloat(ret, 10);
	            },
	            character: function(pool) {
	                var pools = {
	                    lower: "abcdefghijklmnopqrstuvwxyz",
	                    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	                    number: "0123456789",
	                    symbol: "!@#$%^&*()[]"
	                };
	                pools.alpha = pools.lower + pools.upper;
	                pools["undefined"] = pools.lower + pools.upper + pools.number + pools.symbol;
	                pool = pools[("" + pool).toLowerCase()] || pool;
	                return pool.charAt(Random.natural(0, pool.length - 1));
	            },
	            "char": function(pool) {
	                return this.character(pool);
	            },
	            string: function(pool, min, max) {
	                var length;
	                if (arguments.length === 3) {
	                    length = Random.natural(min, max);
	                }
	                if (arguments.length === 2) {
	                    if (typeof arguments[0] === "string") {
	                        length = min;
	                    } else {
	                        length = Random.natural(pool, min);
	                        pool = undefined;
	                    }
	                }
	                if (arguments.length === 1) {
	                    length = pool;
	                    pool = undefined;
	                }
	                if (arguments.length === 0) {
	                    length = Random.natural(3, 7);
	                }
	                var text = "";
	                for (var i = 0; i < length; i++) {
	                    text += Random.character(pool);
	                }
	                return text;
	            },
	            str: function(pool, min, max) {
	                return this.string(pool, min, max);
	            },
	            range: function(start, stop, step) {
	                if (arguments.length <= 1) {
	                    stop = start || 0;
	                    start = 0;
	                }
	                step = arguments[2] || 1;
	                start = +start, stop = +stop, step = +step;
	                var len = Math.max(Math.ceil((stop - start) / step), 0);
	                var idx = 0;
	                var range = new Array(len);
	                while (idx < len) {
	                    range[idx++] = start;
	                    start += step;
	                }
	                return range;
	            }
	        });
	        Random.extend({
	            patternLetters: {
	                yyyy: "getFullYear",
	                yy: function(date) {
	                    return ("" + date.getFullYear()).slice(2);
	                },
	                y: "yy",
	                MM: function(date) {
	                    var m = date.getMonth() + 1;
	                    return m < 10 ? "0" + m : m;
	                },
	                M: function(date) {
	                    return date.getMonth() + 1;
	                },
	                dd: function(date) {
	                    var d = date.getDate();
	                    return d < 10 ? "0" + d : d;
	                },
	                d: "getDate",
	                HH: function(date) {
	                    var h = date.getHours();
	                    return h < 10 ? "0" + h : h;
	                },
	                H: "getHours",
	                hh: function(date) {
	                    var h = date.getHours() % 12;
	                    return h < 10 ? "0" + h : h;
	                },
	                h: function(date) {
	                    return date.getHours() % 12;
	                },
	                mm: function(date) {
	                    var m = date.getMinutes();
	                    return m < 10 ? "0" + m : m;
	                },
	                m: "getMinutes",
	                ss: function(date) {
	                    var s = date.getSeconds();
	                    return s < 10 ? "0" + s : s;
	                },
	                s: "getSeconds",
	                SS: function(date) {
	                    var ms = date.getMilliseconds();
	                    return ms < 10 && "00" + ms || ms < 100 && "0" + ms || ms;
	                },
	                S: "getMilliseconds",
	                A: function(date) {
	                    return date.getHours() < 12 ? "AM" : "PM";
	                },
	                a: function(date) {
	                    return date.getHours() < 12 ? "am" : "pm";
	                },
	                T: "getTime"
	            }
	        });
	        Random.extend({
	            rformat: new RegExp(function() {
	                var re = [];
	                for (var i in Random.patternLetters) re.push(i);
	                return "(" + re.join("|") + ")";
	            }(), "g"),
	            format: function(date, format) {
	                var patternLetters = Random.patternLetters, rformat = Random.rformat;
	                return format.replace(rformat, function($0, flag) {
	                    return typeof patternLetters[flag] === "function" ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? arguments.callee($0, patternLetters[flag]) : date[patternLetters[flag]]();
	                });
	            },
	            randomDate: function(min, max) {
	                min = min === undefined ? new Date(0) : min;
	                max = max === undefined ? new Date() : max;
	                return new Date(Math.random() * (max.getTime() - min.getTime()));
	            },
	            date: function(format) {
	                format = format || "yyyy-MM-dd";
	                return this.format(this.randomDate(), format);
	            },
	            time: function(format) {
	                format = format || "HH:mm:ss";
	                return this.format(this.randomDate(), format);
	            },
	            datetime: function(format) {
	                format = format || "yyyy-MM-dd HH:mm:ss";
	                return this.format(this.randomDate(), format);
	            },
	            now: function(unit, format) {
	                if (arguments.length === 1) {
	                    if (!/year|month|week|day|hour|minute|second|week/.test(unit)) {
	                        format = unit;
	                        unit = "";
	                    }
	                }
	                unit = (unit || "").toLowerCase();
	                format = format || "yyyy-MM-dd HH:mm:ss";
	                var date = new Date();
	                switch (unit) {
	                  case "year":
	                    date.setMonth(0);
	
	                  case "month":
	                    date.setDate(1);
	
	                  case "week":
	                  case "day":
	                    date.setHours(0);
	
	                  case "hour":
	                    date.setMinutes(0);
	
	                  case "minute":
	                    date.setSeconds(0);
	
	                  case "second":
	                    date.setMilliseconds(0);
	                }
	                switch (unit) {
	                  case "week":
	                    date.setDate(date.getDate() - date.getDay());
	                }
	                return this.format(date, format);
	            }
	        });
	        Random.extend({
	            ad_size: [ "300x250", "250x250", "240x400", "336x280", "180x150", "720x300", "468x60", "234x60", "88x31", "120x90", "120x60", "120x240", "125x125", "728x90", "160x600", "120x600", "300x600" ],
	            screen_size: [ "320x200", "320x240", "640x480", "800x480", "800x480", "1024x600", "1024x768", "1280x800", "1440x900", "1920x1200", "2560x1600" ],
	            video_size: [ "720x480", "768x576", "1280x720", "1920x1080" ],
	            image: function(size, background, foreground, format, text) {
	                if (arguments.length === 4) {
	                    text = format;
	                    format = undefined;
	                }
	                if (arguments.length === 3) {
	                    text = foreground;
	                    foreground = undefined;
	                }
	                if (!size) size = this.pick(this.ad_size);
	                if (background && ~background.indexOf("#")) background = background.slice(1);
	                if (foreground && ~foreground.indexOf("#")) foreground = foreground.slice(1);
	                return "http://dummyimage.com/" + size + (background ? "/" + background : "") + (foreground ? "/" + foreground : "") + (format ? "." + format : "") + (text ? "&text=" + text : "");
	            },
	            img: function() {
	                return this.image.apply(this, arguments);
	            }
	        });
	        Random.extend({
	            brandColors: {
	                "4ormat": "#fb0a2a",
	                "500px": "#02adea",
	                "About.me (blue)": "#00405d",
	                "About.me (yellow)": "#ffcc33",
	                Addvocate: "#ff6138",
	                Adobe: "#ff0000",
	                Aim: "#fcd20b",
	                Amazon: "#e47911",
	                Android: "#a4c639",
	                "Angie's List": "#7fbb00",
	                AOL: "#0060a3",
	                Atlassian: "#003366",
	                Behance: "#053eff",
	                "Big Cartel": "#97b538",
	                bitly: "#ee6123",
	                Blogger: "#fc4f08",
	                Boeing: "#0039a6",
	                "Booking.com": "#003580",
	                Carbonmade: "#613854",
	                Cheddar: "#ff7243",
	                "Code School": "#3d4944",
	                Delicious: "#205cc0",
	                Dell: "#3287c1",
	                Designmoo: "#e54a4f",
	                Deviantart: "#4e6252",
	                "Designer News": "#2d72da",
	                Devour: "#fd0001",
	                DEWALT: "#febd17",
	                "Disqus (blue)": "#59a3fc",
	                "Disqus (orange)": "#db7132",
	                Dribbble: "#ea4c89",
	                Dropbox: "#3d9ae8",
	                Drupal: "#0c76ab",
	                Dunked: "#2a323a",
	                eBay: "#89c507",
	                Ember: "#f05e1b",
	                Engadget: "#00bdf6",
	                Envato: "#528036",
	                Etsy: "#eb6d20",
	                Evernote: "#5ba525",
	                "Fab.com": "#dd0017",
	                Facebook: "#3b5998",
	                Firefox: "#e66000",
	                "Flickr (blue)": "#0063dc",
	                "Flickr (pink)": "#ff0084",
	                Forrst: "#5b9a68",
	                Foursquare: "#25a0ca",
	                Garmin: "#007cc3",
	                GetGlue: "#2d75a2",
	                Gimmebar: "#f70078",
	                GitHub: "#171515",
	                "Google Blue": "#0140ca",
	                "Google Green": "#16a61e",
	                "Google Red": "#dd1812",
	                "Google Yellow": "#fcca03",
	                "Google+": "#dd4b39",
	                Grooveshark: "#f77f00",
	                Groupon: "#82b548",
	                "Hacker News": "#ff6600",
	                HelloWallet: "#0085ca",
	                "Heroku (light)": "#c7c5e6",
	                "Heroku (dark)": "#6567a5",
	                HootSuite: "#003366",
	                Houzz: "#73ba37",
	                HTML5: "#ec6231",
	                IKEA: "#ffcc33",
	                IMDb: "#f3ce13",
	                Instagram: "#3f729b",
	                Intel: "#0071c5",
	                Intuit: "#365ebf",
	                Kickstarter: "#76cc1e",
	                kippt: "#e03500",
	                Kodery: "#00af81",
	                LastFM: "#c3000d",
	                LinkedIn: "#0e76a8",
	                Livestream: "#cf0005",
	                Lumo: "#576396",
	                Mixpanel: "#a086d3",
	                Meetup: "#e51937",
	                Nokia: "#183693",
	                NVIDIA: "#76b900",
	                Opera: "#cc0f16",
	                Path: "#e41f11",
	                "PayPal (dark)": "#1e477a",
	                "PayPal (light)": "#3b7bbf",
	                Pinboard: "#0000e6",
	                Pinterest: "#c8232c",
	                PlayStation: "#665cbe",
	                Pocket: "#ee4056",
	                Prezi: "#318bff",
	                Pusha: "#0f71b4",
	                Quora: "#a82400",
	                "QUOTE.fm": "#66ceff",
	                Rdio: "#008fd5",
	                Readability: "#9c0000",
	                "Red Hat": "#cc0000",
	                Resource: "#7eb400",
	                Rockpack: "#0ba6ab",
	                Roon: "#62b0d9",
	                RSS: "#ee802f",
	                Salesforce: "#1798c1",
	                Samsung: "#0c4da2",
	                Shopify: "#96bf48",
	                Skype: "#00aff0",
	                Snagajob: "#f47a20",
	                Softonic: "#008ace",
	                SoundCloud: "#ff7700",
	                "Space Box": "#f86960",
	                Spotify: "#81b71a",
	                Sprint: "#fee100",
	                Squarespace: "#121212",
	                StackOverflow: "#ef8236",
	                Staples: "#cc0000",
	                "Status Chart": "#d7584f",
	                Stripe: "#008cdd",
	                StudyBlue: "#00afe1",
	                StumbleUpon: "#f74425",
	                "T-Mobile": "#ea0a8e",
	                Technorati: "#40a800",
	                "The Next Web": "#ef4423",
	                Treehouse: "#5cb868",
	                Trulia: "#5eab1f",
	                Tumblr: "#34526f",
	                "Twitch.tv": "#6441a5",
	                Twitter: "#00acee",
	                TYPO3: "#ff8700",
	                Ubuntu: "#dd4814",
	                Ustream: "#3388ff",
	                Verizon: "#ef1d1d",
	                Vimeo: "#86c9ef",
	                Vine: "#00a478",
	                Virb: "#06afd8",
	                "Virgin Media": "#cc0000",
	                Wooga: "#5b009c",
	                "WordPress (blue)": "#21759b",
	                "WordPress (orange)": "#d54e21",
	                "WordPress (grey)": "#464646",
	                Wunderlist: "#2b88d9",
	                XBOX: "#9bc848",
	                XING: "#126567",
	                "Yahoo!": "#720e9e",
	                Yandex: "#ffcc00",
	                Yelp: "#c41200",
	                YouTube: "#c4302b",
	                Zalongo: "#5498dc",
	                Zendesk: "#78a300",
	                Zerply: "#9dcc7a",
	                Zootool: "#5e8b1d"
	            },
	            brands: function() {
	                var brands = [];
	                for (var b in this.brandColors) {
	                    brands.push(b);
	                }
	                return brands;
	            },
	            dataImage: function(size, text) {
	                var canvas = typeof document !== "undefined" && document.createElement("canvas"), ctx = canvas && canvas.getContext && canvas.getContext("2d");
	                if (!canvas || !ctx) return "";
	                if (!size) size = this.pick(this.ad_size);
	                text = text !== undefined ? text : size;
	                size = size.split("x");
	                var width = parseInt(size[0], 10), height = parseInt(size[1], 10), background = this.brandColors[this.pick(this.brands())], foreground = "#FFF", text_height = 14, font = "sans-serif";
	                canvas.width = width;
	                canvas.height = height;
	                ctx.textAlign = "center";
	                ctx.textBaseline = "middle";
	                ctx.fillStyle = background;
	                ctx.fillRect(0, 0, width, height);
	                ctx.fillStyle = foreground;
	                ctx.font = "bold " + text_height + "px " + font;
	                ctx.fillText(text, width / 2, height / 2, width);
	                return canvas.toDataURL("image/png");
	            }
	        });
	        Random.extend({
	            color: function() {
	                var colour = Math.floor(Math.random() * (16 * 16 * 16 * 16 * 16 * 16 - 1)).toString(16);
	                colour = "#" + ("000000" + colour).slice(-6);
	                return colour;
	            }
	        });
	        Random.extend({
	            capitalize: function(word) {
	                return (word + "").charAt(0).toUpperCase() + (word + "").substr(1);
	            },
	            upper: function(str) {
	                return (str + "").toUpperCase();
	            },
	            lower: function(str) {
	                return (str + "").toLowerCase();
	            },
	            pick: function(arr) {
	                arr = arr || [];
	                return arr[this.natural(0, arr.length - 1)];
	            },
	            shuffle: function(arr) {
	                arr = arr || [];
	                var old = arr.slice(0), result = [], index = 0, length = old.length;
	                for (var i = 0; i < length; i++) {
	                    index = this.natural(0, old.length - 1);
	                    result.push(old[index]);
	                    old.splice(index, 1);
	                }
	                return result;
	            }
	        });
	        Random.extend({
	            paragraph: function(min, max) {
	                var len;
	                if (arguments.length === 0) len = Random.natural(3, 7);
	                if (arguments.length === 1) len = max = min;
	                if (arguments.length === 2) {
	                    min = parseInt(min, 10);
	                    max = parseInt(max, 10);
	                    len = Random.natural(min, max);
	                }
	                var arr = [];
	                for (var i = 0; i < len; i++) {
	                    arr.push(Random.sentence());
	                }
	                return arr.join(" ");
	            },
	            sentence: function(min, max) {
	                var len;
	                if (arguments.length === 0) len = Random.natural(12, 18);
	                if (arguments.length === 1) len = max = min;
	                if (arguments.length === 2) {
	                    min = parseInt(min, 10);
	                    max = parseInt(max, 10);
	                    len = Random.natural(min, max);
	                }
	                var arr = [];
	                for (var i = 0; i < len; i++) {
	                    arr.push(Random.word());
	                }
	                return Random.capitalize(arr.join(" ")) + ".";
	            },
	            word: function(min, max) {
	                var len;
	                if (arguments.length === 0) len = Random.natural(3, 10);
	                if (arguments.length === 1) len = max = min;
	                if (arguments.length === 2) {
	                    min = parseInt(min, 10);
	                    max = parseInt(max, 10);
	                    len = Random.natural(min, max);
	                }
	                var result = "";
	                for (var i = 0; i < len; i++) {
	                    result += Random.character("lower");
	                }
	                return result;
	            },
	            title: function(min, max) {
	                var len, result = [];
	                if (arguments.length === 0) len = Random.natural(3, 7);
	                if (arguments.length === 1) len = max = min;
	                if (arguments.length === 2) {
	                    min = parseInt(min, 10);
	                    max = parseInt(max, 10);
	                    len = Random.natural(min, max);
	                }
	                for (var i = 0; i < len; i++) {
	                    result.push(this.capitalize(this.word()));
	                }
	                return result.join(" ");
	            }
	        });
	        Random.extend({
	            first: function() {
	                var names = [ "James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric" ].concat([ "Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna" ]);
	                return this.pick(names);
	                return this.capitalize(this.word());
	            },
	            last: function() {
	                var names = [ "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen" ];
	                return this.pick(names);
	                return this.capitalize(this.word());
	            },
	            name: function(middle) {
	                return this.first() + " " + (middle ? this.first() + " " : "") + this.last();
	            }
	        });
	        Random.extend({
	            url: function() {
	                return "http://" + this.domain() + "/" + this.word();
	            },
	            domain: function(tld) {
	                return this.word() + "." + (tld || this.tld());
	            },
	            email: function(domain) {
	                return this.character("lower") + "." + this.last().toLowerCase() + "@" + this.last().toLowerCase() + "." + this.tld();
	                return this.word() + "@" + (domain || this.domain());
	            },
	            ip: function() {
	                return this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255);
	            },
	            tlds: [ "com", "org", "edu", "gov", "co.uk", "net", "io" ],
	            tld: function() {
	                return this.pick(this.tlds);
	            }
	        });
	        Random.extend({
	            areas: [ "东北", "华北", "华东", "华中", "华南", "西南", "西北" ],
	            area: function() {
	                return this.pick(this.areas);
	            },
	            regions: [ "110000 北京市", "120000 天津市", "130000 河北省", "140000 山西省", "150000 内蒙古自治区", "210000 辽宁省", "220000 吉林省", "230000 黑龙江省", "310000 上海市", "320000 江苏省", "330000 浙江省", "340000 安徽省", "350000 福建省", "360000 江西省", "370000 山东省", "410000 河南省", "420000 湖北省", "430000 湖南省", "440000 广东省", "450000 广西壮族自治区", "460000 海南省", "500000 重庆市", "510000 四川省", "520000 贵州省", "530000 云南省", "540000 西藏自治区", "610000 陕西省", "620000 甘肃省", "630000 青海省", "640000 宁夏回族自治区", "650000 新疆维吾尔自治区", "650000 新疆维吾尔自治区", "710000 台湾省", "810000 香港特别行政区", "820000 澳门特别行政区" ],
	            region: function() {
	                return this.pick(this.regions).split(" ")[1];
	            },
	            address: function() {},
	            city: function() {},
	            phone: function() {},
	            areacode: function() {},
	            street: function() {},
	            street_suffixes: function() {},
	            street_suffix: function() {},
	            states: function() {},
	            state: function() {},
	            zip: function(len) {
	                var zip = "";
	                for (var i = 0; i < (len || 6); i++) zip += this.natural(0, 9);
	                return zip;
	            }
	        });
	        Random.extend({
	            todo: function() {
	                return "todo";
	            }
	        });
	        Random.extend({
	            d4: function() {
	                return this.natural(1, 4);
	            },
	            d6: function() {
	                return this.natural(1, 6);
	            },
	            d8: function() {
	                return this.natural(1, 8);
	            },
	            d12: function() {
	                return this.natural(1, 12);
	            },
	            d20: function() {
	                return this.natural(1, 20);
	            },
	            d100: function() {
	                return this.natural(1, 100);
	            },
	            guid: function() {
	                var pool = "ABCDEF1234567890", guid = this.string(pool, 8) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 12);
	                return guid;
	            },
	            id: function() {
	                var id, sum = 0, rank = [ "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2" ], last = [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ];
	                id = this.pick(this.regions).split(" ")[0] + this.date("yyyyMMdd") + this.string("number", 3);
	                for (var i = 0; i < id.length; i++) {
	                    sum += id[i] * rank[i];
	                }
	                id += last[sum % 11];
	                return id;
	            },
	            autoIncrementInteger: 0,
	            increment: function(step) {
	                return this.autoIncrementInteger += +step || 1;
	            },
	            inc: function(step) {
	                return this.increment(step);
	            }
	        });
	        return Random;
	    }();
	    /*! src/mock.js */
	    var rkey = /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/, rrange = /([\+\-]?\d+)-?([\+\-]?\d+)?/, rplaceholder = /\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g;
	    Mock.extend = Util.extend;
	    Mock.mock = function(rurl, rtype, template) {
	        if (arguments.length === 1) {
	            return Handle.gen(rurl);
	        }
	        if (arguments.length === 2) {
	            template = rtype;
	            rtype = undefined;
	        }
	        Mock._mocked[rurl + (rtype || "")] = {
	            rurl: rurl,
	            rtype: rtype,
	            template: template
	        };
	        return Mock;
	    };
	    var Handle = {
	        extend: Util.extend
	    };
	    Handle.rule = function(name) {
	        name = (name || "") + "";
	        var parameters = (name || "").match(rkey), range = parameters && parameters[3] && parameters[3].match(rrange), min = range && parseInt(range[1], 10), max = range && parseInt(range[2], 10), count = range ? !range[2] && parseInt(range[1], 10) || Random.integer(min, max) : 1, decimal = parameters && parameters[4] && parameters[4].match(rrange), dmin = decimal && parseInt(decimal[1], 10), dmax = decimal && parseInt(decimal[2], 10), dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random.integer(dmin, dmax) : 0, point = parameters && parameters[4];
	        return {
	            parameters: parameters,
	            range: range,
	            min: min,
	            max: max,
	            count: count,
	            decimal: decimal,
	            dmin: dmin,
	            dmax: dmax,
	            dcount: dcount,
	            point: point
	        };
	    };
	    Handle.gen = function(template, name, context) {
	        name = name = (name || "") + "";
	        context = context || {};
	        context = {
	            path: context.path || [],
	            templatePath: context.templatePath || [],
	            currentContext: context.currentContext,
	            templateCurrentContext: context.templateCurrentContext || template,
	            root: context.root,
	            templateRoot: context.templateRoot
	        };
	        var rule = Handle.rule(name);
	        var type = Util.type(template);
	        if (Handle[type]) {
	            return Handle[type]({
	                type: type,
	                template: template,
	                name: name,
	                parsedName: name ? name.replace(rkey, "$1") : name,
	                rule: rule,
	                context: context
	            });
	        }
	        return template;
	    };
	    Handle.extend({
	        array: function(options) {
	            var result = [], i, j;
	            if (!options.rule.parameters) {
	                for (i = 0; i < options.template.length; i++) {
	                    options.context.path.push(i);
	                    result.push(Handle.gen(options.template[i], i, {
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        path: options.context.path
	                    }));
	                    options.context.path.pop();
	                }
	            } else {
	                if (options.rule.count === 1 && options.template.length > 1) {
	                    options.context.path.push(options.name);
	                    result = Random.pick(Handle.gen(options.template, undefined, {
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        path: options.context.path
	                    }));
	                    options.context.path.pop();
	                } else {
	                    for (i = 0; i < options.rule.count; i++) {
	                        j = 0;
	                        do {
	                            result.push(Handle.gen(options.template[j++]));
	                        } while (j < options.template.length);
	                    }
	                }
	            }
	            return result;
	        },
	        object: function(options) {
	            var result = {}, keys, fnKeys, key, parsedKey, inc, i;
	            if (options.rule.min) {
	                keys = Util.keys(options.template);
	                keys = Random.shuffle(keys);
	                keys = keys.slice(0, options.rule.count);
	                for (i = 0; i < keys.length; i++) {
	                    key = keys[i];
	                    parsedKey = key.replace(rkey, "$1");
	                    options.context.path.push(parsedKey);
	                    result[parsedKey] = Handle.gen(options.template[key], key, {
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        path: options.context.path
	                    });
	                    options.context.path.pop();
	                }
	            } else {
	                keys = [];
	                fnKeys = [];
	                for (key in options.template) {
	                    (typeof options.template[key] === "function" ? fnKeys : keys).push(key);
	                }
	                keys = keys.concat(fnKeys);
	                for (i = 0; i < keys.length; i++) {
	                    key = keys[i];
	                    parsedKey = key.replace(rkey, "$1");
	                    options.context.path.push(parsedKey);
	                    result[parsedKey] = Handle.gen(options.template[key], key, {
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        path: options.context.path
	                    });
	                    options.context.path.pop();
	                    inc = key.match(rkey);
	                    if (inc && inc[2] && Util.type(options.template[key]) === "number") {
	                        options.template[key] += parseInt(inc[2], 10);
	                    }
	                }
	            }
	            return result;
	        },
	        number: function(options) {
	            var result, parts, i;
	            if (options.rule.point) {
	                options.template += "";
	                parts = options.template.split(".");
	                parts[0] = options.rule.range ? options.rule.count : parts[0];
	                parts[1] = (parts[1] || "").slice(0, options.rule.dcount);
	                for (i = 0; parts[1].length < options.rule.dcount; i++) {
	                    parts[1] += Random.character("number");
	                }
	                result = parseFloat(parts.join("."), 10);
	            } else {
	                result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template;
	            }
	            return result;
	        },
	        "boolean": function(options) {
	            var result;
	            result = options.rule.parameters ? Random.bool(options.rule.min, options.rule.max, options.template) : options.template;
	            return result;
	        },
	        string: function(options) {
	            var result = "", i, placeholders, ph, phed;
	            if (options.template.length) {
	                for (i = 0; i < options.rule.count; i++) {
	                    result += options.template;
	                }
	                placeholders = result.match(rplaceholder) || [];
	                for (i = 0; i < placeholders.length; i++) {
	                    ph = placeholders[i];
	                    if (/^\\/.test(ph)) {
	                        placeholders.splice(i--, 1);
	                        continue;
	                    }
	                    phed = Handle.placeholder(ph, options.context.currentContext, options.context.templateCurrentContext);
	                    if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) {
	                        result = phed;
	                        break;
	                        if (Util.isNumeric(phed)) {
	                            result = parseFloat(phed, 10);
	                            break;
	                        }
	                        if (/^(true|false)$/.test(phed)) {
	                            result = phed === "true" ? true : phed === "false" ? false : phed;
	                            break;
	                        }
	                    }
	                    result = result.replace(ph, phed);
	                }
	            } else {
	                result = options.rule.range ? Random.string(options.rule.count) : options.template;
	            }
	            return result;
	        },
	        "function": function(options) {
	            return options.template.call(options.context.currentContext);
	        }
	    });
	    Handle.extend({
	        _all: function() {
	            var re = {};
	            for (var key in Random) re[key.toLowerCase()] = key;
	            return re;
	        },
	        placeholder: function(placeholder, obj, templateContext) {
	            rplaceholder.exec("");
	            var parts = rplaceholder.exec(placeholder), key = parts && parts[1], lkey = key && key.toLowerCase(), okey = this._all()[lkey], params = parts && parts[2] || "";
	            try {
	                params = eval("(function(){ return [].splice.call(arguments, 0 ) })(" + params + ")");
	            } catch (error) {
	                params = parts[2].split(/,\s*/);
	            }
	            if (obj && key in obj) return obj[key];
	            if (templateContext && typeof templateContext === "object" && key in templateContext && placeholder !== templateContext[key]) {
	                templateContext[key] = Handle.gen(templateContext[key], key, {
	                    currentContext: obj,
	                    templateCurrentContext: templateContext
	                });
	                return templateContext[key];
	            }
	            if (!(key in Random) && !(lkey in Random) && !(okey in Random)) return placeholder;
	            for (var i = 0; i < params.length; i++) {
	                rplaceholder.exec("");
	                if (rplaceholder.test(params[i])) {
	                    params[i] = Handle.placeholder(params[i], obj);
	                }
	            }
	            var handle = Random[key] || Random[lkey] || Random[okey];
	            switch (Util.type(handle)) {
	              case "array":
	                return Random.pick(handle);
	
	              case "function":
	                var re = handle.apply(Random, params);
	                if (re === undefined) re = "";
	                return re;
	            }
	        }
	    });
	    /*! src/mockjax.js */
	    function find(options) {
	        for (var sUrlType in Mock._mocked) {
	            var item = Mock._mocked[sUrlType];
	            if ((!item.rurl || match(item.rurl, options.url)) && (!item.rtype || match(item.rtype, options.type.toLowerCase()))) {
	                return item;
	            }
	        }
	        function match(expected, actual) {
	            if (Util.type(expected) === "string") {
	                return expected === actual;
	            }
	            if (Util.type(expected) === "regexp") {
	                return expected.test(actual);
	            }
	        }
	    }
	    function convert(item, options) {
	        return Util.isFunction(item.template) ? item.template(options) : Mock.mock(item.template);
	    }
	    Mock.mockjax = function mockjax(jQuery) {
	        function mockxhr() {
	            return {
	                readyState: 4,
	                status: 200,
	                statusText: "",
	                open: jQuery.noop,
	                send: function() {
	                    if (this.onload) this.onload();
	                },
	                setRequestHeader: jQuery.noop,
	                getAllResponseHeaders: jQuery.noop,
	                getResponseHeader: jQuery.noop,
	                statusCode: jQuery.noop,
	                abort: jQuery.noop
	            };
	        }
	        function prefilter(options, originalOptions, jqXHR) {
	            var item = find(options);
	            if (item) {
	                options.dataFilter = options.converters["text json"] = options.converters["text jsonp"] = options.converters["text script"] = options.converters["script json"] = function() {
	                    return convert(item, options);
	                };
	                options.xhr = mockxhr;
	                if (originalOptions.dataType !== "script") return "json";
	            }
	        }
	        jQuery.ajaxPrefilter("json jsonp script", prefilter);
	        return Mock;
	    };
	    if (typeof jQuery != "undefined") Mock.mockjax(jQuery);
	    if (typeof Zepto != "undefined") {
	        Mock.mockjax = function(Zepto) {
	            var __original_ajax = Zepto.ajax;
	            var xhr = {
	                readyState: 4,
	                responseText: "",
	                responseXML: null,
	                state: 2,
	                status: 200,
	                statusText: "success",
	                timeoutTimer: null
	            };
	            Zepto.ajax = function(options) {
	                var item = find(options);
	                if (item) {
	                    var data = Mock.mock(item.template);
	                    if (options.success) options.success(data, xhr, options);
	                    if (options.complete) options.complete(xhr.status, xhr, options);
	                    return xhr;
	                }
	                return __original_ajax.call(Zepto, options);
	            };
	        };
	        Mock.mockjax(Zepto);
	    }
	    if (typeof KISSY != "undefined" && KISSY.add) {
	        Mock.mockjax = function mockjax(KISSY) {
	            var _original_ajax = KISSY.io;
	            var xhr = {
	                readyState: 4,
	                responseText: "",
	                responseXML: null,
	                state: 2,
	                status: 200,
	                statusText: "success",
	                timeoutTimer: null
	            };
	            KISSY.io = function(options) {
	                var item = find(options);
	                if (item) {
	                    var data = Mock.mock(item.template);
	                    if (options.success) options.success(data, xhr, options);
	                    if (options.complete) options.complete(xhr.status, xhr, options);
	                    return xhr;
	                }
	                return _original_ajax.apply(this, arguments);
	            };
	            for (var name in _original_ajax) {
	                KISSY.io[name] = _original_ajax[name];
	            }
	        };
	    }
	    /*! src/expose.js */
	    Mock.Util = Util;
	    Mock.Random = Random;
	    Mock.heredoc = Util.heredoc;
	    if (typeof module === "object" && module.exports) {
	        module.exports = Mock;
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return Mock;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof define === "function" && define.cmd) {
	        define(function() {
	            return Mock;
	        });
	    }
	    this.Mock = Mock;
	    this.Random = Random;
	    if (typeof KISSY != "undefined") {
	        Util.each([ "mock", "components/mock/", "mock/dist/mock", "gallery/Mock/0.1.1/", "gallery/Mock/0.1.2/", "gallery/Mock/0.1.3/" ], function register(name) {
	            KISSY.add(name, function(S) {
	                Mock.mockjax(S);
	                return Mock;
	            }, {
	                requires: [ "ajax" ]
	            });
	        });
	    }
	    /*! src/mock4tpl.js */
	    (function(undefined) {
	        var Mock4Tpl = {
	            version: "0.0.1"
	        };
	        if (!this.Mock) module.exports = Mock4Tpl;
	        Mock.tpl = function(input, options, helpers, partials) {
	            return Mock4Tpl.mock(input, options, helpers, partials);
	        };
	        Mock.parse = function(input) {
	            return Handlebars.parse(input);
	        };
	        Mock4Tpl.mock = function(input, options, helpers, partials) {
	            helpers = helpers ? Util.extend({}, helpers, Handlebars.helpers) : Handlebars.helpers;
	            partials = partials ? Util.extend({}, partials, Handlebars.partials) : Handlebars.partials;
	            return Handle.gen(input, null, options, helpers, partials);
	        };
	        var Handle = {
	            debug: Mock4Tpl.debug || false,
	            extend: Util.extend
	        };
	        Handle.gen = function(node, context, options, helpers, partials) {
	            if (Util.isString(node)) {
	                var ast = Handlebars.parse(node);
	                options = Handle.parseOptions(node, options);
	                var data = Handle.gen(ast, context, options, helpers, partials);
	                return data;
	            }
	            context = context || [ {} ];
	            options = options || {};
	            if (this[node.type] === Util.noop) return;
	            options.__path = options.__path || [];
	            if (Mock4Tpl.debug || Handle.debug) {
	                console.log();
	                console.group("[" + node.type + "]", JSON.stringify(node));
	                console.log("[options]", options.__path.length, JSON.stringify(options));
	            }
	            var preLength = options.__path.length;
	            this[node.type](node, context, options, helpers, partials);
	            options.__path.splice(preLength);
	            if (Mock4Tpl.debug || Handle.debug) {
	                console.groupEnd();
	            }
	            return context[context.length - 1];
	        };
	        Handle.parseOptions = function(input, options) {
	            var rComment = /<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g;
	            var comments = input.match(rComment), ret = {}, i, ma, option;
	            for (i = 0; comments && i < comments.length; i++) {
	                rComment.lastIndex = 0;
	                ma = rComment.exec(comments[i]);
	                if (ma) {
	                    option = new Function("return " + ma[1]);
	                    option = option();
	                    Util.extend(ret, option);
	                }
	            }
	            return Util.extend(ret, options);
	        };
	        Handle.val = function(name, options, context, def) {
	            if (name !== options.__path[options.__path.length - 1]) throw new Error(name + "!==" + options.__path);
	            if (Mock4Tpl.debug || Handle.debug) console.log("[options]", name, options.__path);
	            if (def !== undefined) def = Mock.mock(def);
	            if (options) {
	                var mocked = Mock.mock(options);
	                if (Util.isString(mocked)) return mocked;
	                if (name in mocked) {
	                    return mocked[name];
	                }
	            }
	            if (Util.isArray(context[0])) return {};
	            return def !== undefined ? def : name || Random.word();
	        };
	        Handle.program = function(node, context, options, helpers, partials) {
	            for (var i = 0; i < node.statements.length; i++) {
	                this.gen(node.statements[i], context, options, helpers, partials);
	            }
	        };
	        Handle.mustache = function(node, context, options, helpers, partials) {
	            var i, currentContext = context[0], contextLength = context.length;
	            if (Util.type(currentContext) === "array") {
	                currentContext.push({});
	                currentContext = currentContext[currentContext.length - 1];
	                context.unshift(currentContext);
	            }
	            if (node.isHelper || helpers && helpers[node.id.string]) {
	                if (node.params.length === 0) {} else {
	                    for (i = 0; i < node.params.length; i++) {
	                        this.gen(node.params[i], context, options, helpers, partials);
	                    }
	                }
	                if (node.hash) this.gen(node.hash, context, options, helpers, partials);
	            } else {
	                this.gen(node.id, context, options, helpers, partials);
	            }
	            if (context.length > contextLength) context.splice(0, context.length - contextLength);
	        };
	        Handle.block = function(node, context, options, helpers, partials) {
	            var parts = node.mustache.id.parts, i, len, cur, val, type, currentContext = context[0], contextLength = context.length;
	            if (node.inverse) {}
	            if (node.mustache.isHelper || helpers && helpers[node.mustache.id.string]) {
	                type = parts[0];
	                val = (Helpers[type] || Helpers.custom).apply(this, arguments);
	                currentContext = context[0];
	            } else {
	                for (i = 0; i < parts.length; i++) {
	                    options.__path.push(parts[i]);
	                    cur = parts[i];
	                    val = this.val(cur, options, context, {});
	                    currentContext[cur] = Util.isArray(val) && [] || val;
	                    type = Util.type(currentContext[cur]);
	                    if (type === "object" || type === "array") {
	                        currentContext = currentContext[cur];
	                        context.unshift(currentContext);
	                    }
	                }
	            }
	            if (node.program) {
	                if (Util.type(currentContext) === "array") {
	                    len = val.length || Random.integer(3, 7);
	                    for (i = 0; i < len; i++) {
	                        currentContext.push(typeof val[i] !== "undefined" ? val[i] : {});
	                        options.__path.push("[]");
	                        context.unshift(currentContext[currentContext.length - 1]);
	                        this.gen(node.program, context, options, helpers, partials);
	                        options.__path.pop();
	                        context.shift();
	                    }
	                } else this.gen(node.program, context, options, helpers, partials);
	            }
	            if (context.length > contextLength) context.splice(0, context.length - contextLength);
	        };
	        Handle.hash = function(node, context, options, helpers, partials) {
	            var pairs = node.pairs, pair, i, j;
	            for (i = 0; i < pairs.length; i++) {
	                pair = pairs[i];
	                for (j = 1; j < pair.length; j++) {
	                    this.gen(pair[j], context, options, helpers, partials);
	                }
	            }
	        };
	        Handle.ID = function(node, context, options) {
	            var parts = node.parts, i, len, cur, prev, def, val, type, valType, preOptions, currentContext = context[node.depth], contextLength = context.length;
	            if (Util.isArray(currentContext)) currentContext = context[node.depth + 1];
	            if (!parts.length) {} else {
	                for (i = 0, len = parts.length; i < len; i++) {
	                    options.__path.push(parts[i]);
	                    cur = parts[i];
	                    prev = parts[i - 1];
	                    preOptions = options[prev];
	                    def = i === len - 1 ? currentContext[cur] : {};
	                    val = this.val(cur, options, context, def);
	                    type = Util.type(currentContext[cur]);
	                    valType = Util.type(val);
	                    if (type === "undefined") {
	                        if (i < len - 1 && valType !== "object" && valType !== "array") {
	                            currentContext[cur] = {};
	                        } else {
	                            currentContext[cur] = Util.isArray(val) && [] || val;
	                        }
	                    } else {
	                        if (i < len - 1 && type !== "object" && type !== "array") {
	                            currentContext[cur] = Util.isArray(val) && [] || {};
	                        }
	                    }
	                    type = Util.type(currentContext[cur]);
	                    if (type === "object" || type === "array") {
	                        currentContext = currentContext[cur];
	                        context.unshift(currentContext);
	                    }
	                }
	            }
	            if (context.length > contextLength) context.splice(0, context.length - contextLength);
	        };
	        Handle.partial = function(node, context, options, helpers, partials) {
	            var name = node.partialName.name, partial = partials && partials[name], contextLength = context.length;
	            if (partial) Handle.gen(partial, context, options, helpers, partials);
	            if (context.length > contextLength) context.splice(0, context.length - contextLength);
	        };
	        Handle.content = Util.noop;
	        Handle.PARTIAL_NAME = Util.noop;
	        Handle.DATA = Util.noop;
	        Handle.STRING = Util.noop;
	        Handle.INTEGER = Util.noop;
	        Handle.BOOLEAN = Util.noop;
	        Handle.comment = Util.noop;
	        var Helpers = {};
	        Helpers.each = function(node, context, options) {
	            var i, len, cur, val, parts, def, type, currentContext = context[0];
	            parts = node.mustache.params[0].parts;
	            for (i = 0, len = parts.length; i < len; i++) {
	                options.__path.push(parts[i]);
	                cur = parts[i];
	                def = i === len - 1 ? [] : {};
	                val = this.val(cur, options, context, def);
	                currentContext[cur] = Util.isArray(val) && [] || val;
	                type = Util.type(currentContext[cur]);
	                if (type === "object" || type === "array") {
	                    currentContext = currentContext[cur];
	                    context.unshift(currentContext);
	                }
	            }
	            return val;
	        };
	        Helpers["if"] = Helpers.unless = function(node, context, options) {
	            var params = node.mustache.params, i, j, cur, val, parts, def, type, currentContext = context[0];
	            for (i = 0; i < params.length; i++) {
	                parts = params[i].parts;
	                for (j = 0; j < parts.length; j++) {
	                    if (i === 0) options.__path.push(parts[j]);
	                    cur = parts[j];
	                    def = j === parts.length - 1 ? "@BOOL(2,1,true)" : {};
	                    val = this.val(cur, options, context, def);
	                    if (j === parts.length - 1) {
	                        val = val === "true" ? true : val === "false" ? false : val;
	                    }
	                    currentContext[cur] = Util.isArray(val) ? [] : val;
	                    type = Util.type(currentContext[cur]);
	                    if (type === "object" || type === "array") {
	                        currentContext = currentContext[cur];
	                        context.unshift(currentContext);
	                    }
	                }
	            }
	            return val;
	        };
	        Helpers["with"] = function(node, context, options) {
	            var i, cur, val, parts, def, currentContext = context[0];
	            parts = node.mustache.params[0].parts;
	            for (i = 0; i < parts.length; i++) {
	                options.__path.push(parts[i]);
	                cur = parts[i];
	                def = {};
	                val = this.val(cur, options, context, def);
	                currentContext = currentContext[cur] = val;
	                context.unshift(currentContext);
	            }
	            return val;
	        };
	        Helpers.log = function() {};
	        Helpers.custom = function(node, context, options) {
	            var i, len, cur, val, parts, def, type, currentContext = context[0];
	            if (node.mustache.params.length === 0) {
	                return;
	                options.__path.push(node.mustache.id.string);
	                cur = node.mustache.id.string;
	                def = "@BOOL(2,1,true)";
	                val = this.val(cur, options, context, def);
	                currentContext[cur] = Util.isArray(val) && [] || val;
	                type = Util.type(currentContext[cur]);
	                if (type === "object" || type === "array") {
	                    currentContext = currentContext[cur];
	                    context.unshift(currentContext);
	                }
	            } else {
	                parts = node.mustache.params[0].parts;
	                for (i = 0, len = parts.length; i < len; i++) {
	                    options.__path.push(parts[i]);
	                    cur = parts[i];
	                    def = i === len - 1 ? [] : {};
	                    val = this.val(cur, options, context, def);
	                    currentContext[cur] = Util.isArray(val) && [] || val;
	                    type = Util.type(currentContext[cur]);
	                    if (type === "object" || type === "array") {
	                        currentContext = currentContext[cur];
	                        context.unshift(currentContext);
	                    }
	                }
	            }
	            return val;
	        };
	    }).call(this);
	    /*! src/mock4xtpl.js */
	    (function(undefined) {
	        if (typeof KISSY === "undefined") return;
	        var Mock4XTpl = {
	            debug: false
	        };
	        var XTemplate;
	        KISSY.use("xtemplate", function(S, T) {
	            XTemplate = T;
	        });
	        if (!this.Mock) module.exports = Mock4XTpl;
	        Mock.xtpl = function(input, options, helpers, partials) {
	            return Mock4XTpl.mock(input, options, helpers, partials);
	        };
	        Mock.xparse = function(input) {
	            return XTemplate.compiler.parse(input);
	        };
	        Mock4XTpl.mock = function(input, options, helpers, partials) {
	            helpers = helpers ? Util.extend({}, helpers, XTemplate.RunTime.commands) : XTemplate.RunTime.commands;
	            partials = partials ? Util.extend({}, partials, XTemplate.RunTime.subTpls) : XTemplate.RunTime.subTpls;
	            return this.gen(input, null, options, helpers, partials, {});
	        };
	        Mock4XTpl.parse = function(input) {
	            return XTemplate.compiler.parse(input);
	        };
	        Mock4XTpl.gen = function(node, context, options, helpers, partials, other) {
	            if (typeof node === "string") {
	                if (Mock4XTpl.debug) {
	                    console.log("[tpl    ]\n", node);
	                }
	                var ast = this.parse(node);
	                options = this.parseOptions(node, options);
	                var data = this.gen(ast, context, options, helpers, partials, other);
	                return data;
	            }
	            context = context || [ {} ];
	            options = options || {};
	            node.type = node.type;
	            if (this[node.type] === Util.noop) return;
	            options.__path = options.__path || [];
	            if (Mock4XTpl.debug) {
	                console.log();
	                console.group("[" + node.type + "]", JSON.stringify(node));
	                console.log("[context]", "[before]", context.length, JSON.stringify(context));
	                console.log("[options]", "[before]", options.__path.length, JSON.stringify(options));
	                console.log("[other  ]", "[before]", JSON.stringify(other));
	            }
	            var preLength = options.__path.length;
	            this[node.type](node, context, options, helpers, partials, other);
	            if (Mock4XTpl.debug) {
	                console.log("[__path ]", "[after ]", options.__path);
	            }
	            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context)) {
	                options.__path.splice(preLength);
	            }
	            if (Mock4XTpl.debug) {
	                console.log("[context]", "[after ]", context.length, JSON.stringify(context));
	                console.groupEnd();
	            }
	            return context[context.length - 1];
	        };
	        Mock4XTpl.parseOptions = function(input, options) {
	            var rComment = /<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g;
	            var comments = input.match(rComment), ret = {}, i, ma, option;
	            for (i = 0; comments && i < comments.length; i++) {
	                rComment.lastIndex = 0;
	                ma = rComment.exec(comments[i]);
	                if (ma) {
	                    option = new Function("return " + ma[1]);
	                    option = option();
	                    Util.extend(ret, option);
	                }
	            }
	            return Util.extend(ret, options);
	        };
	        Mock4XTpl.parseVal = function(expr, object) {
	            function queryArray(prop, context) {
	                if (typeof context === "object" && prop in context) return [ context[prop] ];
	                var ret = [];
	                for (var i = 0; i < context.length; i++) {
	                    ret.push.apply(ret, query(prop, [ context[i] ]));
	                }
	                return ret;
	            }
	            function queryObject(prop, context) {
	                if (typeof context === "object" && prop in context) return [ context[prop] ];
	                var ret = [];
	                for (var key in context) {
	                    ret.push.apply(ret, query(prop, [ context[key] ]));
	                }
	                return ret;
	            }
	            function query(prop, set) {
	                var ret = [];
	                for (var i = 0; i < set.length; i++) {
	                    if (typeof set[i] !== "object") continue;
	                    if (prop in set[i]) ret.push(set[i][prop]); else {
	                        ret.push.apply(ret, Util.isArray(set[i]) ? queryArray(prop, set[i]) : queryObject(prop, set[i]));
	                    }
	                }
	                return ret;
	            }
	            function parse(expr, context) {
	                var parts = typeof expr === "string" ? expr.split(".") : expr.slice(0), set = [ context ];
	                while (parts.length) {
	                    set = query(parts.shift(), set);
	                }
	                return set;
	            }
	            return parse(expr, object);
	        };
	        Mock4XTpl.val = function(name, options, context, def) {
	            if (name !== options.__path[options.__path.length - 1]) throw new Error(name + "!==" + options.__path);
	            if (def !== undefined) def = Mock.mock(def);
	            if (options) {
	                var mocked = Mock.mock(options);
	                if (Util.isString(mocked)) return mocked;
	                var ret = Mock4XTpl.parseVal(options.__path, mocked);
	                if (ret.length > 0) return ret[0];
	                if (name in mocked) {
	                    return mocked[name];
	                }
	            }
	            if (Util.isArray(context[0])) return {};
	            return def !== undefined ? def : name;
	        };
	        Mock4XTpl.program = function(node, context, options, helpers, partials, other) {
	            for (var i = 0; i < node.statements.length; i++) {
	                this.gen(node.statements[i], context, options, helpers, partials, other);
	            }
	            for (var j = 0; node.inverse && j < node.inverse.length; j++) {
	                this.gen(node.inverse[j], context, options, helpers, partials, other);
	            }
	        };
	        Mock4XTpl.block = function(node, context, options, helpers, partials, other) {
	            var contextLength = context.length;
	            this.gen(node.tpl, context, options, helpers, partials, Util.extend({}, other, {
	                def: {},
	                hold: true
	            }));
	            var currentContext = context[0], mocked, i, len;
	            if (Util.type(currentContext) === "array") {
	                mocked = this.val(options.__path[options.__path.length - 1], options, context);
	                len = mocked && mocked.length || Random.integer(3, 7);
	                for (i = 0; i < len; i++) {
	                    currentContext.push(mocked && mocked[i] !== undefined ? mocked[i] : {});
	                    options.__path.push(i);
	                    context.unshift(currentContext[currentContext.length - 1]);
	                    this.gen(node.program, context, options, helpers, partials, other);
	                    options.__path.pop();
	                    context.shift();
	                }
	            } else this.gen(node.program, context, options, helpers, partials, other);
	            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context)) {
	                context.splice(0, context.length - contextLength);
	            }
	        };
	        Mock4XTpl.tpl = function(node, context, options, helpers, partials, other) {
	            if (node.params && node.params.length) {
	                other = Util.extend({}, other, {
	                    def: {
	                        each: [],
	                        "if": "@BOOL(2,1,true)",
	                        unless: "@BOOL(2,1,false)",
	                        "with": {}
	                    }[node.path.string],
	                    hold: {
	                        each: true,
	                        "if": function(_, __, ___, name, value) {
	                            return typeof value === "object";
	                        },
	                        unless: function(_, __, ___, name, value) {
	                            return typeof value === "object";
	                        },
	                        "with": true,
	                        include: false
	                    }[node.path.string]
	                });
	                for (var i = 0, input; i < node.params.length; i++) {
	                    if (node.path.string === "include") {
	                        input = partials && partials[node.params[i].value];
	                    } else input = node.params[i];
	                    if (input) this.gen(input, context, options, helpers, partials, other);
	                }
	                if (node.hash) {
	                    this.gen(node.hash, context, options, helpers, partials, other);
	                }
	            } else {
	                this.gen(node.path, context, options, helpers, partials, other);
	            }
	        };
	        Mock4XTpl.tplExpression = function(node, context, options, helpers, partials, other) {
	            this.gen(node.expression, context, options, helpers, partials, other);
	        };
	        Mock4XTpl.content = Util.noop;
	        Mock4XTpl.unaryExpression = Util.noop;
	        Mock4XTpl.multiplicativeExpression = Mock4XTpl.additiveExpression = function(node, context, options, helpers, partials, other) {
	            this.gen(node.op1, context, options, helpers, partials, Util.extend({}, other, {
	                def: function() {
	                    return node.op2.type === "number" ? node.op2.value.indexOf(".") > -1 ? Random.float(-Math.pow(10, 10), Math.pow(10, 10), 1, Math.pow(10, 6)) : Random.integer() : undefined;
	                }()
	            }));
	            this.gen(node.op2, context, options, helpers, partials, Util.extend({}, other, {
	                def: function() {
	                    return node.op1.type === "number" ? node.op1.value.indexOf(".") > -1 ? Random.float(-Math.pow(10, 10), Math.pow(10, 10), 1, Math.pow(10, 6)) : Random.integer() : undefined;
	                }()
	            }));
	        };
	        Mock4XTpl.relationalExpression = function(node, context, options, helpers, partials, other) {
	            this.gen(node.op1, context, options, helpers, partials, other);
	            this.gen(node.op2, context, options, helpers, partials, other);
	        };
	        Mock4XTpl.equalityExpression = Util.noop;
	        Mock4XTpl.conditionalAndExpression = Util.noop;
	        Mock4XTpl.conditionalOrExpression = Util.noop;
	        Mock4XTpl.string = Util.noop;
	        Mock4XTpl.number = Util.noop;
	        Mock4XTpl.boolean = Util.noop;
	        Mock4XTpl.hash = function(node, context, options, helpers, partials, other) {
	            var pairs = node.value, key;
	            for (key in pairs) {
	                this.gen(pairs[key], context, options, helpers, partials, other);
	            }
	        };
	        Mock4XTpl.id = function(node, context, options, helpers, partials, other) {
	            var contextLength = context.length;
	            var parts = node.parts, currentContext = context[node.depth], i, len, cur, def, val;
	            function fix(currentContext, index, length, name, val) {
	                var type = Util.type(currentContext[name]), valType = Util.type(val);
	                val = val === "true" ? true : val === "false" ? false : val;
	                if (type === "undefined") {
	                    if (index < length - 1 && !Util.isObjectOrArray(val)) {
	                        currentContext[name] = {};
	                    } else {
	                        currentContext[name] = Util.isArray(val) && [] || val;
	                    }
	                } else {
	                    if (index < length - 1 && type !== "object" && type !== "array") {
	                        currentContext[name] = Util.isArray(val) && [] || {};
	                    } else {
	                        if (type !== "object" && type !== "array" && valType !== "object" && valType !== "array") {
	                            currentContext[name] = val;
	                        }
	                    }
	                }
	                return currentContext[name];
	            }
	            if (Util.isArray(currentContext)) currentContext = context[node.depth + 1];
	            for (i = 0, len = parts.length; i < len; i++) {
	                if (i === 0 && parts[i] === "this") continue;
	                if (/^(xindex|xcount|xkey)$/.test(parts[i])) continue;
	                if (i === 0 && len === 1 && parts[i] in helpers) continue;
	                options.__path.push(parts[i]);
	                cur = parts[i];
	                def = i === len - 1 ? other.def !== undefined ? other.def : context[0][cur] : {};
	                val = this.val(cur, options, context, def);
	                if (Mock4XTpl.debug) {
	                    console.log("[def    ]", JSON.stringify(def));
	                    console.log("[val    ]", JSON.stringify(val));
	                }
	                val = fix(currentContext, i, len, cur, val);
	                if (Util.isObjectOrArray(currentContext[cur])) {
	                    context.unshift(currentContext = currentContext[cur]);
	                }
	            }
	            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context, cur, val)) {
	                context.splice(0, context.length - contextLength);
	            }
	        };
	    }).call(this);
	}).call(this);

/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/20.
	 */
	var mockSelect = __webpack_require__(11);
	var Mock = __webpack_require__(31);
	
	var mockData = Mock.mock(
	    {
	        'data|3-5': [
	            {
	                'id|+1': 1,
	                'name|1': ['数学','语文','英语','物理','生物']
	            }
	        ]
	    }
	);
	var mockData1 = Mock.mock(
	    {
	        'data|3-5': [
	            {
	                'id|+1': 1,
	                'name|1': ['数学','语文','英语','物理','生物']
	            }
	        ]
	    }
	);
	
	mockSelect('dom1', mockData, function(id){
	    console.log(id);
	},function(){
	    console.log('页面1回调');
	},'id1');
	
	mockSelect('dom2', mockData1, function(id){
	    console.log(id);
	},function(){
	    console.log('页面2回调');
	},'id2');

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTM2ZGJlYzQzMzZlNjI1NThjNDQ/Y2Y2NCoqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qcz84OTY2KioqKioqKioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvbW9jay1zZWxlY3QuanM/YjQyNyoqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2Nzcy9tb2NrLXNlbGVjdC5jc3M/OGEwYSoqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9jc3MvbW9jay1zZWxlY3QuY3NzPzEzOTQqKioqIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanM/ZGEwNCoqKioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LWJvdHRvbS5wbmc/ZjdmOSoqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2ltZy9hcnJvdy10b3AucG5nP2U2MmMqKioiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzP2I5ODAqKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9tb2NrLXNlbGVjdC10cGwudHBsP2Y3ZGUqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvc2VsZWN0LXVsLXRwbC50cGw/M2M0NSoqKiIsIndlYnBhY2s6Ly8vLi9kZXAvbW9jay5qcz8yNDA2KiIsIndlYnBhY2s6Ly8vLi9qcy9kZW1vL3Rlc3QtbW9jay1zZWxlY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQSx5Q0FBd0MsT0FBTywyQkFBMkI7QUFDMUU7O0FBRUE7QUFDQTtBQUNBLHNDQUFxQyxZQUFZO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQSwwQkFBeUIsaUVBQWlFO0FBQzFGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBLGFBQVksZUFBZTtBQUMzQixrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXFCO0FBQ3JCLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsR0FBRTtBQUNGLGtDQUFpQztBQUNqQyxJQUFHO0FBQ0gsZUFBYztBQUNkO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGLEVBQUMsRzs7Ozs7OztBQzlFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQyxRQUFRLGNBQWMsR0FBRyxHQUFHLEVBQUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7OztBQy9FQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5RjtBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7OztBQ3BCQTtBQUNBOzs7QUFHQTtBQUNBLHdDQUF1QywwQkFBMEIscUJBQXFCLDJCQUEyQixvQkFBb0IsS0FBSyxtQ0FBbUMseUJBQXlCLEtBQUssYUFBYSwyQkFBMkIseUJBQXlCLHFCQUFxQix5Q0FBeUMscUJBQXFCLHlCQUF5QixLQUFLLDRCQUE0QixvQkFBb0IscUJBQXFCLHlCQUF5QixLQUFLLHFCQUFxQiw4QkFBOEIsb0JBQW9CLG9CQUFvQixLQUFLLGdDQUFnQyxpRkFBNEYsS0FBSyxtQ0FBbUMsdUJBQXVCLEtBQUssd0NBQXdDLGlGQUF5RixLQUFLLGdCQUFnQixpQkFBaUIsdUJBQXVCLHlCQUF5QixxQkFBcUIsMEJBQTBCLHNDQUFzQyxLQUFLLHVCQUF1QixzQkFBc0IscUJBQXFCLDJCQUEyQixLQUFLLDhCQUE4Qix3QkFBd0IsS0FBSyx1QkFBdUIsdUJBQXVCLEtBQUs7O0FBRWp3Qzs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pEQSxrQ0FBaUMsbzdDOzs7Ozs7O0FDQWpDLGtDQUFpQyx3aEQ7Ozs7Ozs7QUNBakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixzQkFBc0I7QUFDdEM7QUFDQTtBQUNBLG1CQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0JBQWUsbUJBQW1CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLDJCQUEyQjtBQUM1QztBQUNBO0FBQ0EsU0FBUSx1QkFBdUI7QUFDL0I7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLGtCQUFpQix1QkFBdUI7QUFDeEM7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxpQ0FBZ0Msc0JBQXNCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBdUQ7QUFDdkQ7O0FBRUEsOEJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3JQQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLHdGQUF3RjtBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7O0FDVEQ7QUFDQTtBQUNBO0FBQ0EsY0FBYSxtSkFBbUo7QUFDaEs7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsWUFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixTQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixTQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixTQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FB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QUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBMkMsdUNBQXVDO0FBQ2xGLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsbUJBQW1CO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0EsVUFBUztBQUNU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LEVBQUM7O0FBRUQ7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLEVBQUMsUSIsImZpbGUiOiJ0ZXN0LW1vY2stc2VsZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL21mZy13ZWNoYXQvYnVuZGxlL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgOTM2ZGJlYzQzMzZlNjI1NThjNDRcbiAqKi8iLCIvKlRNT0RKUzp7fSovXHJcbiFmdW5jdGlvbiAoKSB7XHJcblx0ZnVuY3Rpb24gYShhLCBiKSB7XHJcblx0XHRyZXR1cm4gKC9zdHJpbmd8ZnVuY3Rpb24vLnRlc3QodHlwZW9mIGIpID8gaCA6IGcpKGEsIGIpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBiKGEsIGMpIHtcclxuXHRcdHJldHVybiBcInN0cmluZ1wiICE9IHR5cGVvZiBhICYmIChjID0gdHlwZW9mIGEsIFwibnVtYmVyXCIgPT09IGMgPyBhICs9IFwiXCIgOiBhID0gXCJmdW5jdGlvblwiID09PSBjID8gYihhLmNhbGwoYSkpIDogXCJcIiksIGFcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGMoYSkge1xyXG5cdFx0cmV0dXJuIGxbYV1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGQoYSkge1xyXG5cdFx0cmV0dXJuIGIoYSkucmVwbGFjZSgvJig/IVtcXHcjXSs7KXxbPD5cIiddL2csIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBlKGEsIGIpIHtcclxuXHRcdGlmIChtKGEpKWZvciAodmFyIGMgPSAwLCBkID0gYS5sZW5ndGg7IGQgPiBjOyBjKyspYi5jYWxsKGEsIGFbY10sIGMsIGEpOyBlbHNlIGZvciAoYyBpbiBhKWIuY2FsbChhLCBhW2NdLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZihhLCBiKSB7XHJcblx0XHR2YXIgYyA9IC8oXFwvKVteXFwvXStcXDFcXC5cXC5cXDEvLCBkID0gKFwiLi9cIiArIGEpLnJlcGxhY2UoL1teXFwvXSskLywgXCJcIiksIGUgPSBkICsgYjtcclxuXHRcdGZvciAoZSA9IGUucmVwbGFjZSgvXFwvXFwuXFwvL2csIFwiL1wiKTsgZS5tYXRjaChjKTspZSA9IGUucmVwbGFjZShjLCBcIi9cIik7XHJcblx0XHRyZXR1cm4gZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZyhiLCBjKSB7XHJcblx0XHR2YXIgZCA9IGEuZ2V0KGIpIHx8IGkoe2ZpbGVuYW1lOiBiLCBuYW1lOiBcIlJlbmRlciBFcnJvclwiLCBtZXNzYWdlOiBcIlRlbXBsYXRlIG5vdCBmb3VuZFwifSk7XHJcblx0XHRyZXR1cm4gYyA/IGQoYykgOiBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoKGEsIGIpIHtcclxuXHRcdGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBiKSB7XHJcblx0XHRcdHZhciBjID0gYjtcclxuXHRcdFx0YiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGsoYylcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dmFyIGQgPSBqW2FdID0gZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGIoYywgYSkgKyBcIlwiXHJcblx0XHRcdH0gY2F0Y2ggKGQpIHtcclxuXHRcdFx0XHRyZXR1cm4gaShkKSgpXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRyZXR1cm4gZC5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSA9IG4sIGQudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBiICsgXCJcIlxyXG5cdFx0fSwgZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaShhKSB7XHJcblx0XHR2YXIgYiA9IFwie1RlbXBsYXRlIEVycm9yfVwiLCBjID0gYS5zdGFjayB8fCBcIlwiO1xyXG5cdFx0aWYgKGMpYyA9IGMuc3BsaXQoXCJcXG5cIikuc2xpY2UoMCwgMikuam9pbihcIlxcblwiKTsgZWxzZSBmb3IgKHZhciBkIGluIGEpYyArPSBcIjxcIiArIGQgKyBcIj5cXG5cIiArIGFbZF0gKyBcIlxcblxcblwiO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIFwib2JqZWN0XCIgPT0gdHlwZW9mIGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcihiICsgXCJcXG5cXG5cIiArIGMpLCBiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgaiA9IGEuY2FjaGUgPSB7fSwgayA9IHRoaXMuU3RyaW5nLCBsID0ge1xyXG5cdFx0XCI8XCI6IFwiJiM2MDtcIixcclxuXHRcdFwiPlwiOiBcIiYjNjI7XCIsXHJcblx0XHQnXCInOiBcIiYjMzQ7XCIsXHJcblx0XHRcIidcIjogXCImIzM5O1wiLFxyXG5cdFx0XCImXCI6IFwiJiMzODtcIlxyXG5cdH0sIG0gPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRcdHJldHVybiBcIltvYmplY3QgQXJyYXldXCIgPT09IHt9LnRvU3RyaW5nLmNhbGwoYSlcclxuXHRcdH0sIG4gPSBhLnV0aWxzID0ge1xyXG5cdFx0JGhlbHBlcnM6IHt9LCAkaW5jbHVkZTogZnVuY3Rpb24gKGEsIGIsIGMpIHtcclxuXHRcdFx0cmV0dXJuIGEgPSBmKGMsIGEpLCBnKGEsIGIpXHJcblx0XHR9LCAkc3RyaW5nOiBiLCAkZXNjYXBlOiBkLCAkZWFjaDogZVxyXG5cdH0sIG8gPSBhLmhlbHBlcnMgPSBuLiRoZWxwZXJzO1xyXG5cdGEuZ2V0ID0gZnVuY3Rpb24gKGEpIHtcclxuXHRcdHJldHVybiBqW2EucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpXVxyXG5cdH0sIGEuaGVscGVyID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdG9bYV0gPSBiXHJcblx0fSwgbW9kdWxlLmV4cG9ydHMgPSBhXHJcbn0oKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi90bW9kanMtbG9hZGVyL3J1bnRpbWUuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgNSA5IDEwIDEyIDEzIDE1IDE2IDE5XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzIwLlxyXG4gKi9cclxucmVxdWlyZSgnLi9jc3MvbW9jay1zZWxlY3QuY3NzJyk7XHJcbnZhciBzZWxlY3RUcGwgPSByZXF1aXJlKCdtb2NrLXNlbGVjdC10cGwnKTtcclxudmFyIHNlbGVjdFVsVHBsID0gcmVxdWlyZSgnc2VsZWN0LXVsLXRwbCcpO1xyXG5cclxuZnVuY3Rpb24gbW9ja1NlbGVjdChkb20sIGRhdGEsIGNhbGxiYWNrSWQsIGNhbGxiYWNrLCBpZCwgY2FsbEJhY2tGbGFnKXtcclxuICAgIHRoaXMuZG9tID0gJChcIi5cIiArIGRvbSk7XHJcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcclxuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIHRoaXMuaWQgPSAkKFwiI1wiICsgaWQpO1xyXG4gICAgdGhpcy5jYWxsQmFja0ZsYWcgPSBjYWxsQmFja0ZsYWc7XHJcbiAgICB0aGlzLmluaXREb20oKTtcclxuICAgIHRoaXMuaW5pdEJ0bnMoKTtcclxufVxyXG5tb2NrU2VsZWN0LnByb3RvdHlwZSA9IHtcclxuICAgIGluaXREb206IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kb20uaHRtbChzZWxlY3RUcGwodGhpcy5kYXRhKSk7XHJcbiAgICAgICAgdGhpcy5pZC5odG1sKHNlbGVjdFVsVHBsKHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCh0aGlzLmRvbS5maW5kKFwiLm5hbWVcIikuYXR0cignZGF0YS1pZCcpKTtcclxuICAgICAgICBpZiAodGhpcy5jYWxsQmFja0ZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsQmFja0ZsYWcodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLmRvbS5vZmZzZXQoKTtcclxuICAgICAgICB0aGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5jc3Moe1xyXG4gICAgICAgICAgICAnbGVmdCc6IDAsXHJcbiAgICAgICAgICAgICd0b3AnOiBvZmZzZXQudG9wICsgNDJcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5jc3Moe1xyXG4gICAgICAgICAgICAnbWF4LWhlaWdodCc6ICQod2luZG93KS5oZWlnaHQoKSAtIG9mZnNldC5oZWlnaHQgLSBvZmZzZXQudG9wXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaW5pdEJ0bnM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/ngrnlh7vmmL7npLrkuIvmi4lcclxuICAgICAgICB2YXIgdFRoaXM9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kb20uZGVsZWdhdGUoJy5uYW1lLXdyYXAnLCAndG91Y2hzdGFydCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codFRoaXMuZG9tKTtcclxuICAgICAgICAgICAgaWYgKCEodFRoaXMuZG9tLmZpbmQoJy5uYW1lLXdyYXAnKS5oYXNDbGFzcygnYWN0aXZlJykpKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vY2stc2VsZWN0XCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5maW5kKFwiLm5hbWUtd3JhcFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vY2stdWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5kb20uZmluZChcIi5tb2NrLXNlbGVjdFwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIi5tb2NrLXVsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoXCIubW9jay1zZWxlY3RcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoXCIubmFtZS13cmFwXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuZG9tLmZpbmQoXCIubW9jay1zZWxlY3RcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v5LiL5ouJ5raI5aSxXHJcbiAgICAgICAgdGhpcy5pZC5kZWxlZ2F0ZSgnbGknLCAndG91Y2hlbmQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB0VGhpcy5pZC5maW5kKFwibGkuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlXCIpLmZpbmQoXCIucmlnaHRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5LW5vbmVcIik7XHJcbiAgICAgICAgICAgIHRUaGlzLmRvbS5maW5kKCcubmFtZS13cmFwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoXCIubmFtZVwiKS5odG1sKCQodGhpcykuZmluZChcIi5pdGVtLW5hbWVcIikuaHRtbCgpKS5hdHRyKFwiZGF0YS1pZFwiLCAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpKTtcclxuICAgICAgICAgICAgdFRoaXMuZG9tLmZpbmQoXCIubW9jay1zZWxlY3RcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB0VGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICB0VGhpcy5jYWxsYmFja0lkKHRUaGlzLmRvbS5maW5kKFwiLm5hbWVcIikuYXR0cignZGF0YS1pZCcpKTtcclxuICAgICAgICAgICAgaWYgKHRUaGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9tLCBkYXRhLCBjYWxsYmFja0lkLCBjYWxsYmFjaywgaWQsIGNhbGxCYWNrRmxhZyl7XHJcbiAgICAvKipcclxuICAgICAqICog5qih5ouf5LiL5ouJ5qGG57uE5Lu2XHJcbiAgICAgKiDmi7/liLBpZFxyXG4gICAgICogQHBhcmFtIGRvbSAgICAgICDkuIvmi4nmoYbniLbnuqdjbGFzc1xyXG4gICAgICogQHBhcmFtIGRhdGEgICAgICDkuIvmi4nmlbDmja7vvIjlpITnkIbov4fnmoTmoLzlvI/kuLp7ZGF0YTogW3tpZDonJyxuYW1lOicnfSx7fSx7fV1977yJLOWPpuWkluazqOaEj29yZGVyTnVtID4gMCA/ICtvcmRlck51bSA6ICcnXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2tJZCAgICAgIOmAmui/h+Wbnuiwg+S8oOe7meS4quS6uumhtemdoumcgOimgeeahGlkXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sgICAgICAgIOS4quS6uumhtemdoueahOWbnuiwg+WkhOeQhlxyXG4gICAgICogQHBhcmFtIGlkICAgICAgICAgICAgICDlrZjmlL7kuIvmi4npgInpobnnmoRpZFxyXG4gICAgICogQHBhcmFtIGNhbGxCYWNrRmxhZ++8iOmdnuW/heS8oO+8iSAg5ZGK6K+J6aG16Z2i5qih5p2/5riy5p+T5a6M5LqG5pyJ5LqGaWTnrYnlj4LmlbAg5Y+v5Lul5riy5p+T5Liq5Lq66aG16Z2i5LqGXHJcbiAgICAgKi9cclxuICAgIHJldHVybiBuZXcgbW9ja1NlbGVjdChkb20sIGRhdGEsIGNhbGxiYWNrSWQsIGNhbGxiYWNrLCBpZCwgY2FsbEJhY2tGbGFnKTtcclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9tb2NrLXNlbGVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCAxMCAxMyAxNiAxOVxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbW9jay1zZWxlY3QuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL21vY2stc2VsZWN0LmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL21vY2stc2VsZWN0LmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvY3NzL21vY2stc2VsZWN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCAxMCAxMyAxNiAxOVxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1vY2stc2VsZWN0e1xcclxcbiAgICBsaW5lLWhlaWdodDogNDJweDtcXHJcXG4gICAgaGVpZ2h0OiA0MnB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlcjpub25lO1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmV7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxufVxcclxcbi5tb2NrLXVse1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgIHotaW5kZXg6IDEwMDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOWQ5ZDk7XFxyXFxuICAgIHdpZHRoOiA5My42JTtcXHJcXG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5uYW1lLXdyYXB7XFxyXFxuICAgIGNvbG9yOiAjZmZmO1xcclxcbiAgICBoZWlnaHQ6IDQycHg7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAuYmd7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgaGVpZ2h0OiA2cHg7XFxyXFxuICAgIHdpZHRoOiAxM3B4O1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcCAuYmd7XFxyXFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIHJlcXVpcmUoXCIuLi9pbWcvYXJyb3ctYm90dG9tLnBuZ1wiKSArIFwiKSBjZW50ZXIgY2VudGVyIG5vLXJlcGVhdDtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5uYW1lLXdyYXAuYWN0aXZle1xcclxcbiAgICBjb2xvcjogIzAwZDUzNTtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5uYW1lLXdyYXAuYWN0aXZlIC5iZyB7XFxyXFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIHJlcXVpcmUoXCIuLi9pbWcvYXJyb3ctdG9wLnBuZ1wiKSArIFwiKSBjZW50ZXIgY2VudGVyIG5vLXJlcGVhdDtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGl7XFxyXFxuICAgIG1hcmdpbjowO1xcclxcbiAgICBjb2xvcjogIzMzMzMzMztcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgaGVpZ2h0OiA0MnB4O1xcclxcbiAgICBsaW5lLWhlaWdodDogNDJweDtcXHJcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkOWQ5ZDk7XFxyXFxufVxcclxcbi5tb2NrLXVsIGxpIC5yaWdodHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxyXFxufVxcclxcbi5tb2NrLXVsIGxpLmFjdGl2ZSAucmlnaHR7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZTtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGkuYWN0aXZle1xcclxcbiAgICBjb2xvcjogIzAwZDUzNTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvY3NzL21vY2stc2VsZWN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCAxMCAxMyAxNiAxOVxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgMyA0IDEwIDEyIDEzIDE2IDE5XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQTBBQUFBR0NBWUFBQUFZTEJTL0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBNEpwVkZoMFdFMU1PbU52YlM1aFpHOWlaUzU0YlhBQUFBQUFBRHcvZUhCaFkydGxkQ0JpWldkcGJqMGk3N3UvSWlCcFpEMGlWelZOTUUxd1EyVm9hVWg2Y21WVGVrNVVZM3ByWXpsa0lqOCtJRHg0T25odGNHMWxkR0VnZUcxc2JuTTZlRDBpWVdSdlltVTZibk02YldWMFlTOGlJSGc2ZUcxd2RHczlJa0ZrYjJKbElGaE5VQ0JEYjNKbElEVXVNeTFqTURFeElEWTJMakUwTlRZMk1Td2dNakF4TWk4d01pOHdOaTB4TkRvMU5qb3lOeUFnSUNBZ0lDQWdJajRnUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0Z1BISmtaanBFWlhOamNtbHdkR2x2YmlCeVpHWTZZV0p2ZFhROUlpSWdlRzFzYm5NNmVHMXdUVTA5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5dGJTOGlJSGh0Ykc1ek9uTjBVbVZtUFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdmMxUjVjR1V2VW1WemIzVnlZMlZTWldZaklpQjRiV3h1Y3pwNGJYQTlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzhpSUhodGNFMU5Pazl5YVdkcGJtRnNSRzlqZFcxbGJuUkpSRDBpZUcxd0xtUnBaRHBoWVdOaE16Z3laQzAzWlRkbUxUUmxNRE10WVdRd015MWxZVEprWTJVeE5qRmhNV1FpSUhodGNFMU5Pa1J2WTNWdFpXNTBTVVE5SW5odGNDNWthV1E2TVRZd1FrUTRSamd5TUVJMk1URkZOams0UWpCR016RkZOa05HUVRneE1ETWlJSGh0Y0UxTk9rbHVjM1JoYm1ObFNVUTlJbmh0Y0M1cGFXUTZNVFl3UWtRNFJqY3lNRUkyTVRGRk5qazRRakJHTXpGRk5rTkdRVGd4TURNaUlIaHRjRHBEY21WaGRHOXlWRzl2YkQwaVFXUnZZbVVnVUdodmRHOXphRzl3SUVORElESXdNVFVnS0UxaFkybHVkRzl6YUNraVBpQThlRzF3VFUwNlJHVnlhWFpsWkVaeWIyMGdjM1JTWldZNmFXNXpkR0Z1WTJWSlJEMGllRzF3TG1scFpEb3dOamt4TWtORFJUbEJNakJGTmpFeE9FWkNRemc0UXpJeE4wUXlSVUpHT1NJZ2MzUlNaV1k2Wkc5amRXMWxiblJKUkQwaVlXUnZZbVU2Wkc5amFXUTZjR2h2ZEc5emFHOXdPbVl4WXprNU1qZ3hMVE00TldFdE1URTNPUzFoTXpWaUxUa3pOVFUyWlRjeU1qSmlOU0l2UGlBOEwzSmtaanBFWlhOamNtbHdkR2x2Ymo0Z1BDOXlaR1k2VWtSR1BpQThMM2c2ZUcxd2JXVjBZVDRnUEQ5NGNHRmphMlYwSUdWdVpEMGljaUkvUGhlSGU1OEFBQUJWU1VSQlZIamFZdmovLzc4T0VOLzdEd0dmOE9EL1VIVTZERUFDaEUyUkpIQ0JUMUIxRERCTklDd014QmR3YUxnQWxXZEExd1RDWEVCOEdFM0RZYWc0QXk1Tk1Md05xbUViTm5sY21rQTRDNWNjUUlBQkFQR2lDMHBzaTliRkFBQUFBRWxGVGtTdVFtQ0NcIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2ltZy9hcnJvdy1ib3R0b20ucG5nXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDEwIDEzIDE2IDE5XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQTBBQUFBR0NBWUFBQUFZTEJTL0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBNEpwVkZoMFdFMU1PbU52YlM1aFpHOWlaUzU0YlhBQUFBQUFBRHcvZUhCaFkydGxkQ0JpWldkcGJqMGk3N3UvSWlCcFpEMGlWelZOTUUxd1EyVm9hVWg2Y21WVGVrNVVZM3ByWXpsa0lqOCtJRHg0T25odGNHMWxkR0VnZUcxc2JuTTZlRDBpWVdSdlltVTZibk02YldWMFlTOGlJSGc2ZUcxd2RHczlJa0ZrYjJKbElGaE5VQ0JEYjNKbElEVXVNeTFqTURFeElEWTJMakUwTlRZMk1Td2dNakF4TWk4d01pOHdOaTB4TkRvMU5qb3lOeUFnSUNBZ0lDQWdJajRnUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0Z1BISmtaanBFWlhOamNtbHdkR2x2YmlCeVpHWTZZV0p2ZFhROUlpSWdlRzFzYm5NNmVHMXdUVTA5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5dGJTOGlJSGh0Ykc1ek9uTjBVbVZtUFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdmMxUjVjR1V2VW1WemIzVnlZMlZTWldZaklpQjRiV3h1Y3pwNGJYQTlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzhpSUhodGNFMU5Pazl5YVdkcGJtRnNSRzlqZFcxbGJuUkpSRDBpZUcxd0xtUnBaRHBoWVdOaE16Z3laQzAzWlRkbUxUUmxNRE10WVdRd015MWxZVEprWTJVeE5qRmhNV1FpSUhodGNFMU5Pa1J2WTNWdFpXNTBTVVE5SW5odGNDNWthV1E2TUVGQk5VUXlSVFl5TUVJMk1URkZOamcwT1VaRE5qWTFSRGRGTVVORk1FSWlJSGh0Y0UxTk9rbHVjM1JoYm1ObFNVUTlJbmh0Y0M1cGFXUTZNRUZCTlVReVJUVXlNRUkyTVRGRk5qZzBPVVpETmpZMVJEZEZNVU5GTUVJaUlIaHRjRHBEY21WaGRHOXlWRzl2YkQwaVFXUnZZbVVnVUdodmRHOXphRzl3SUVORElESXdNVFVnS0UxaFkybHVkRzl6YUNraVBpQThlRzF3VFUwNlJHVnlhWFpsWkVaeWIyMGdjM1JTWldZNmFXNXpkR0Z1WTJWSlJEMGllRzF3TG1scFpEb3dOamt4TWtORFJUbEJNakJGTmpFeE9FWkNRemc0UXpJeE4wUXlSVUpHT1NJZ2MzUlNaV1k2Wkc5amRXMWxiblJKUkQwaVlXUnZZbVU2Wkc5amFXUTZjR2h2ZEc5emFHOXdPbVl4WXprNU1qZ3hMVE00TldFdE1URTNPUzFoTXpWaUxUa3pOVFUyWlRjeU1qSmlOU0l2UGlBOEwzSmtaanBFWlhOamNtbHdkR2x2Ymo0Z1BDOXlaR1k2VWtSR1BpQThMM2c2ZUcxd2JXVjBZVDRnUEQ5NGNHRmphMlYwSUdWdVpEMGljaUkvUG1scDk0NEFBQUNlU1VSQlZIamFZdmovLzc4T0VOLzdEd0dmUURqaldmc3ZFSWJ4b2ZnL1ZKME9BOE5WVXdZZ3d4UW0wZmhxOW4rZ0dCaUQyRWpnRTFRZEExZ1RWS053Nll0SnoyRWFZTGpwMVJ5UWhnc2dlYWc2Qmthd0pnaW9CK0lHQml5QWk0bWo5ZHUvSHpVZzluK3RVd3dzVVBGK0lDNWd3QUdBR3FxQkZEY1FGNEw0SUUzNVVBM2ZnZmdQVENFckl3dnI3LzkvZmtPNUxGQTFENEI0SWtDQUFRRFdFWXRMSEt2ZEl3QUFBQUJKUlU1RXJrSmdnZz09XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9pbWcvYXJyb3ctdG9wLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCAxMCAxMyAxNiAxOVxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgMyA0IDEwIDEyIDEzIDE2IDE5XG4gKiovIiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvdHBsL21vY2stc2VsZWN0LXRwbCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZXNjYXBlPSR1dGlscy4kZXNjYXBlLGRhdGE9JGRhdGEuZGF0YSwkb3V0PScnOyRvdXQrPSc8ZGl2IGNsYXNzPVwibW9jay1zZWxlY3QgZm9udC1zaXplMTZcIj4gPGRpdiBjbGFzcz1cIm5hbWUtd3JhcFwiPiA8c3BhbiBjbGFzcz1cIm5hbWVcIiBkYXRhLWlkPVwiJztcbiRvdXQrPSRlc2NhcGUoZGF0YVswXS5pZCk7XG4kb3V0Kz0nXCI+JztcbiRvdXQrPSRlc2NhcGUoZGF0YVswXS5uYW1lKTtcbiRvdXQrPSc8L3NwYW4+IDxzcGFuIGNsYXNzPVwiYmdcIj48L3NwYW4+IDwvZGl2PiA8L2Rpdj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvbW9jay1zZWxlY3QtdHBsLnRwbFxuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCAxMCAxMyAxNiAxOVxuICoqLyIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCdkZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9zZWxlY3QtdWwtdHBsJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlYWNoPSR1dGlscy4kZWFjaCxkYXRhPSRkYXRhLmRhdGEsJHZhbHVlPSRkYXRhLiR2YWx1ZSwkaW5kZXg9JGRhdGEuJGluZGV4LCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsJG91dD0nJzskb3V0Kz0nPHVsIGNsYXNzPVwibW9jay11bCBib3gtcGFkZGluZyBkaXNwbGF5LW5vbmVcIj4gJztcbiRlYWNoKGRhdGEsZnVuY3Rpb24oJHZhbHVlLCRpbmRleCl7XG4kb3V0Kz0nICc7XG5pZigkaW5kZXggPT0gMCl7XG4kb3V0Kz0nIDxsaSBzdHlsZT1cImJvcmRlcjpub25lO1wiIGRhdGEtaWQ9XCInO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuaWQpO1xuJG91dCs9J1wiPiA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5uYW1lKTtcbiRvdXQrPSc8L3NwYW4+IDxzcGFuIGNsYXNzPVwicmlnaHRcIj7iiJo8L3NwYW4+IDwvbGk+ICc7XG59ZWxzZXtcbiRvdXQrPScgPGxpIGRhdGEtaWQ9XCInO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuaWQpO1xuJG91dCs9J1wiPiA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5uYW1lKTtcbiRvdXQrPSc8L3NwYW4+IDxzcGFuIGNsYXNzPVwicmlnaHRcIj7iiJo8L3NwYW4+IDwvbGk+ICc7XG59XG4kb3V0Kz0nICc7XG59KTtcbiRvdXQrPScgPC91bD4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvc2VsZWN0LXVsLXRwbC50cGxcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgMTAgMTMgMTYgMTlcbiAqKi8iLCIvKiEgbW9ja2pzIDIzLTA2LTIwMTQgMTU6NTc6MzcgKi9cclxuLyohIHNyYy9tb2NrLXByZWZpeC5qcyAqL1xyXG4vKiFcclxuICAgIE1vY2sgLSDmqKHmi5/or7fmsYIgJiDmqKHmi5/mlbDmja5cclxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9udXlzb2Z0L01vY2tcclxuICAgIOWiqOaZuiBtb3poaS5neXlAdGFvYmFvLmNvbSBudXlzb2Z0QGdtYWlsLmNvbVxyXG4qL1xyXG4oZnVuY3Rpb24odW5kZWZpbmVkKSB7XHJcbiAgICB2YXIgTW9jayA9IHtcclxuICAgICAgICB2ZXJzaW9uOiBcIjAuMS41XCIsXHJcbiAgICAgICAgX21vY2tlZDoge31cclxuICAgIH07XHJcbiAgICAvKiEgc3JjL3V0aWwuanMgKi9cclxuICAgIHZhciBVdGlsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIFV0aWwgPSB7fTtcclxuICAgICAgICBVdGlsLmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSwgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY2xvbmU7XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKDtpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcmMgPSB0YXJnZXRbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29weSA9IG9wdGlvbnNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gY29weSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvcHkgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNBcnJheShjb3B5KSB8fCBVdGlsLmlzT2JqZWN0KGNvcHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY29weSkpIGNsb25lID0gc3JjICYmIFV0aWwuaXNBcnJheShzcmMpID8gc3JjIDogW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzT2JqZWN0KGNvcHkpKSBjbG9uZSA9IHNyYyAmJiBVdGlsLmlzT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gVXRpbC5leHRlbmQoY2xvbmUsIGNvcHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9IGNvcHk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLmVhY2ggPSBmdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGksIGtleTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZShvYmopID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2JqOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvcihpLCBpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKSA9PT0gZmFsc2UpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKSA9PT0gZmFsc2UpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLnR5cGUgPSBmdW5jdGlvbiB0eXBlKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkID8gU3RyaW5nKG9iaikgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5tYXRjaCgvXFxbb2JqZWN0IChcXHcrKVxcXS8pWzFdLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLmVhY2goXCJTdHJpbmcgT2JqZWN0IEFycmF5IFJlZ0V4cCBGdW5jdGlvblwiLnNwbGl0KFwiIFwiKSwgZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgVXRpbFtcImlzXCIgKyB2YWx1ZV0gPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBVdGlsLnR5cGUob2JqKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBVdGlsLmlzT2JqZWN0T3JBcnJheSA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlsLmlzT2JqZWN0KHZhbHVlKSB8fCBVdGlsLmlzQXJyYXkodmFsdWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXRpbC5pc051bWVyaWMgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLmtleXMgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSBrZXlzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4ga2V5cztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWwudmFsdWVzID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB2YWx1ZXMucHVzaChvYmpba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWwuaGVyZWRvYyA9IGZ1bmN0aW9uIGhlcmVkb2MoZm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZuLnRvU3RyaW5nKCkucmVwbGFjZSgvXlteXFwvXStcXC9cXCohPy8sIFwiXCIpLnJlcGxhY2UoL1xcKlxcL1teXFwvXSskLywgXCJcIikucmVwbGFjZSgvXltcXHNcXHhBMF0rLywgXCJcIikucmVwbGFjZSgvW1xcc1xceEEwXSskLywgXCJcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLm5vb3AgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICAgIHJldHVybiBVdGlsO1xyXG4gICAgfSgpO1xyXG4gICAgLyohIHNyYy9yYW5kb20uanMgKi9cclxuICAgIHZhciBSYW5kb20gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgUmFuZG9tID0ge1xyXG4gICAgICAgICAgICBleHRlbmQ6IFV0aWwuZXh0ZW5kXHJcbiAgICAgICAgfTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgXCJib29sZWFuXCI6IGZ1bmN0aW9uKG1pbiwgbWF4LCBjdXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IHR5cGVvZiBtaW4gIT09IFwidW5kZWZpbmVkXCIgJiYgIWlzTmFOKG1pbikgPyBwYXJzZUludChtaW4sIDEwKSA6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gdHlwZW9mIG1heCAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhaXNOYU4obWF4KSA/IHBhcnNlSW50KG1heCwgMTApIDogMTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDEgLyAobWluICsgbWF4KSAqIG1pbiA/ICFjdXIgOiBjdXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+PSAuNTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9vbDogZnVuY3Rpb24obWluLCBtYXgsIGN1cikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm9vbGVhbihtaW4sIG1heCwgY3VyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF0dXJhbDogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IHR5cGVvZiBtaW4gIT09IFwidW5kZWZpbmVkXCIgPyBwYXJzZUludChtaW4sIDEwKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBtYXggPSB0eXBlb2YgbWF4ICE9PSBcInVuZGVmaW5lZFwiID8gcGFyc2VJbnQobWF4LCAxMCkgOiA5MDA3MTk5MjU0NzQwOTkyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW50ZWdlcjogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IHR5cGVvZiBtaW4gIT09IFwidW5kZWZpbmVkXCIgPyBwYXJzZUludChtaW4sIDEwKSA6IC05MDA3MTk5MjU0NzQwOTkyO1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gdHlwZW9mIG1heCAhPT0gXCJ1bmRlZmluZWRcIiA/IHBhcnNlSW50KG1heCwgMTApIDogOTAwNzE5OTI1NDc0MDk5MjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaW50XCI6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlZ2VyKG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJmbG9hdFwiOiBmdW5jdGlvbihtaW4sIG1heCwgZG1pbiwgZG1heCkge1xyXG4gICAgICAgICAgICAgICAgZG1pbiA9IGRtaW4gPT09IHVuZGVmaW5lZCA/IDAgOiBkbWluO1xyXG4gICAgICAgICAgICAgICAgZG1pbiA9IE1hdGgubWF4KE1hdGgubWluKGRtaW4sIDE3KSwgMCk7XHJcbiAgICAgICAgICAgICAgICBkbWF4ID0gZG1heCA9PT0gdW5kZWZpbmVkID8gMTcgOiBkbWF4O1xyXG4gICAgICAgICAgICAgICAgZG1heCA9IE1hdGgubWF4KE1hdGgubWluKGRtYXgsIDE3KSwgMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gdGhpcy5pbnRlZ2VyKG1pbiwgbWF4KSArIFwiLlwiO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGRjb3VudCA9IHRoaXMubmF0dXJhbChkbWluLCBkbWF4KTsgaSA8IGRjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9IHRoaXMuY2hhcmFjdGVyKFwibnVtYmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocmV0LCAxMCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoYXJhY3RlcjogZnVuY3Rpb24ocG9vbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvb2xzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VyOiBcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdXBwZXI6IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIixcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFwiMDEyMzQ1Njc4OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbDogXCIhQCMkJV4mKigpW11cIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHBvb2xzLmFscGhhID0gcG9vbHMubG93ZXIgKyBwb29scy51cHBlcjtcclxuICAgICAgICAgICAgICAgIHBvb2xzW1widW5kZWZpbmVkXCJdID0gcG9vbHMubG93ZXIgKyBwb29scy51cHBlciArIHBvb2xzLm51bWJlciArIHBvb2xzLnN5bWJvbDtcclxuICAgICAgICAgICAgICAgIHBvb2wgPSBwb29sc1soXCJcIiArIHBvb2wpLnRvTG93ZXJDYXNlKCldIHx8IHBvb2w7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9vbC5jaGFyQXQoUmFuZG9tLm5hdHVyYWwoMCwgcG9vbC5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY2hhclwiOiBmdW5jdGlvbihwb29sKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXIocG9vbCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0cmluZzogZnVuY3Rpb24ocG9vbCwgbWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IFJhbmRvbS5uYXR1cmFsKG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gbWluO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IFJhbmRvbS5uYXR1cmFsKHBvb2wsIG1pbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvb2wgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBwb29sO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvb2wgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IFJhbmRvbS5uYXR1cmFsKDMsIDcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gUmFuZG9tLmNoYXJhY3Rlcihwb29sKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdHI6IGZ1bmN0aW9uKHBvb2wsIG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpbmcocG9vbCwgbWluLCBtYXgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByYW5nZTogZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wID0gc3RhcnQgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGVwID0gYXJndW1lbnRzWzJdIHx8IDE7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9ICtzdGFydCwgc3RvcCA9ICtzdG9wLCBzdGVwID0gK3N0ZXA7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gTWF0aC5tYXgoTWF0aC5jZWlsKChzdG9wIC0gc3RhcnQpIC8gc3RlcCksIDApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkeCA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgQXJyYXkobGVuKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICByYW5nZVtpZHgrK10gPSBzdGFydDtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCArPSBzdGVwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIHBhdHRlcm5MZXR0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICB5eXl5OiBcImdldEZ1bGxZZWFyXCIsXHJcbiAgICAgICAgICAgICAgICB5eTogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXCJcIiArIGRhdGUuZ2V0RnVsbFllYXIoKSkuc2xpY2UoMik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgeTogXCJ5eVwiLFxyXG4gICAgICAgICAgICAgICAgTU06IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0gPCAxMCA/IFwiMFwiICsgbSA6IG07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgTTogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRkOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZCA8IDEwID8gXCIwXCIgKyBkIDogZDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkOiBcImdldERhdGVcIixcclxuICAgICAgICAgICAgICAgIEhIOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGggPSBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGggPCAxMCA/IFwiMFwiICsgaCA6IGg7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgSDogXCJnZXRIb3Vyc1wiLFxyXG4gICAgICAgICAgICAgICAgaGg6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKSAlIDEyO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoIDwgMTAgPyBcIjBcIiArIGggOiBoO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGg6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpICUgMTI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbW06IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtIDwgMTAgPyBcIjBcIiArIG0gOiBtO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG06IFwiZ2V0TWludXRlc1wiLFxyXG4gICAgICAgICAgICAgICAgc3M6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IGRhdGUuZ2V0U2Vjb25kcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzIDwgMTAgPyBcIjBcIiArIHMgOiBzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHM6IFwiZ2V0U2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgU1M6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbXMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtcyA8IDEwICYmIFwiMDBcIiArIG1zIHx8IG1zIDwgMTAwICYmIFwiMFwiICsgbXMgfHwgbXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgUzogXCJnZXRNaWxsaXNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIEE6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyBcIkFNXCIgOiBcIlBNXCI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYTogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgPCAxMiA/IFwiYW1cIiA6IFwicG1cIjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBUOiBcImdldFRpbWVcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIHJmb3JtYXQ6IG5ldyBSZWdFeHAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmUgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gUmFuZG9tLnBhdHRlcm5MZXR0ZXJzKSByZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiKFwiICsgcmUuam9pbihcInxcIikgKyBcIilcIjtcclxuICAgICAgICAgICAgfSgpLCBcImdcIiksXHJcbiAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0dGVybkxldHRlcnMgPSBSYW5kb20ucGF0dGVybkxldHRlcnMsIHJmb3JtYXQgPSBSYW5kb20ucmZvcm1hdDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXQucmVwbGFjZShyZm9ybWF0LCBmdW5jdGlvbigkMCwgZmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcGF0dGVybkxldHRlcnNbZmxhZ10gPT09IFwiZnVuY3Rpb25cIiA/IHBhdHRlcm5MZXR0ZXJzW2ZsYWddKGRhdGUpIDogcGF0dGVybkxldHRlcnNbZmxhZ10gaW4gcGF0dGVybkxldHRlcnMgPyBhcmd1bWVudHMuY2FsbGVlKCQwLCBwYXR0ZXJuTGV0dGVyc1tmbGFnXSkgOiBkYXRlW3BhdHRlcm5MZXR0ZXJzW2ZsYWddXSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJhbmRvbURhdGU6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBtaW4gPSBtaW4gPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKDApIDogbWluO1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gbWF4ID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSgpIDogbWF4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKE1hdGgucmFuZG9tKCkgKiAobWF4LmdldFRpbWUoKSAtIG1pbi5nZXRUaW1lKCkpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0ZTogZnVuY3Rpb24oZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgXCJ5eXl5LU1NLWRkXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5yYW5kb21EYXRlKCksIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpbWU6IGZ1bmN0aW9uKGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8IFwiSEg6bW06c3NcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLnJhbmRvbURhdGUoKSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0ZXRpbWU6IGZ1bmN0aW9uKGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8IFwieXl5eS1NTS1kZCBISDptbTpzc1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMucmFuZG9tRGF0ZSgpLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBub3c6IGZ1bmN0aW9uKHVuaXQsIGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIS95ZWFyfG1vbnRofHdlZWt8ZGF5fGhvdXJ8bWludXRlfHNlY29uZHx3ZWVrLy50ZXN0KHVuaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVuaXQgPSAodW5pdCB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8IFwieXl5eS1NTS1kZCBISDptbTpzc1wiO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh1bml0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ5ZWFyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXRNb250aCgwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJtb250aFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0RGF0ZSgxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3ZWVrXCI6XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXlcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgY2FzZSBcImhvdXJcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXMoMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwibWludXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgY2FzZSBcInNlY29uZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh1bml0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3ZWVrXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gZGF0ZS5nZXREYXkoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQoZGF0ZSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBhZF9zaXplOiBbIFwiMzAweDI1MFwiLCBcIjI1MHgyNTBcIiwgXCIyNDB4NDAwXCIsIFwiMzM2eDI4MFwiLCBcIjE4MHgxNTBcIiwgXCI3MjB4MzAwXCIsIFwiNDY4eDYwXCIsIFwiMjM0eDYwXCIsIFwiODh4MzFcIiwgXCIxMjB4OTBcIiwgXCIxMjB4NjBcIiwgXCIxMjB4MjQwXCIsIFwiMTI1eDEyNVwiLCBcIjcyOHg5MFwiLCBcIjE2MHg2MDBcIiwgXCIxMjB4NjAwXCIsIFwiMzAweDYwMFwiIF0sXHJcbiAgICAgICAgICAgIHNjcmVlbl9zaXplOiBbIFwiMzIweDIwMFwiLCBcIjMyMHgyNDBcIiwgXCI2NDB4NDgwXCIsIFwiODAweDQ4MFwiLCBcIjgwMHg0ODBcIiwgXCIxMDI0eDYwMFwiLCBcIjEwMjR4NzY4XCIsIFwiMTI4MHg4MDBcIiwgXCIxNDQweDkwMFwiLCBcIjE5MjB4MTIwMFwiLCBcIjI1NjB4MTYwMFwiIF0sXHJcbiAgICAgICAgICAgIHZpZGVvX3NpemU6IFsgXCI3MjB4NDgwXCIsIFwiNzY4eDU3NlwiLCBcIjEyODB4NzIwXCIsIFwiMTkyMHgxMDgwXCIgXSxcclxuICAgICAgICAgICAgaW1hZ2U6IGZ1bmN0aW9uKHNpemUsIGJhY2tncm91bmQsIGZvcmVncm91bmQsIGZvcm1hdCwgdGV4dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGZvcmVncm91bmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghc2l6ZSkgc2l6ZSA9IHRoaXMucGljayh0aGlzLmFkX3NpemUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhY2tncm91bmQgJiYgfmJhY2tncm91bmQuaW5kZXhPZihcIiNcIikpIGJhY2tncm91bmQgPSBiYWNrZ3JvdW5kLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvcmVncm91bmQgJiYgfmZvcmVncm91bmQuaW5kZXhPZihcIiNcIikpIGZvcmVncm91bmQgPSBmb3JlZ3JvdW5kLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaHR0cDovL2R1bW15aW1hZ2UuY29tL1wiICsgc2l6ZSArIChiYWNrZ3JvdW5kID8gXCIvXCIgKyBiYWNrZ3JvdW5kIDogXCJcIikgKyAoZm9yZWdyb3VuZCA/IFwiL1wiICsgZm9yZWdyb3VuZCA6IFwiXCIpICsgKGZvcm1hdCA/IFwiLlwiICsgZm9ybWF0IDogXCJcIikgKyAodGV4dCA/IFwiJnRleHQ9XCIgKyB0ZXh0IDogXCJcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGJyYW5kQ29sb3JzOiB7XHJcbiAgICAgICAgICAgICAgICBcIjRvcm1hdFwiOiBcIiNmYjBhMmFcIixcclxuICAgICAgICAgICAgICAgIFwiNTAwcHhcIjogXCIjMDJhZGVhXCIsXHJcbiAgICAgICAgICAgICAgICBcIkFib3V0Lm1lIChibHVlKVwiOiBcIiMwMDQwNWRcIixcclxuICAgICAgICAgICAgICAgIFwiQWJvdXQubWUgKHllbGxvdylcIjogXCIjZmZjYzMzXCIsXHJcbiAgICAgICAgICAgICAgICBBZGR2b2NhdGU6IFwiI2ZmNjEzOFwiLFxyXG4gICAgICAgICAgICAgICAgQWRvYmU6IFwiI2ZmMDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgQWltOiBcIiNmY2QyMGJcIixcclxuICAgICAgICAgICAgICAgIEFtYXpvbjogXCIjZTQ3OTExXCIsXHJcbiAgICAgICAgICAgICAgICBBbmRyb2lkOiBcIiNhNGM2MzlcIixcclxuICAgICAgICAgICAgICAgIFwiQW5naWUncyBMaXN0XCI6IFwiIzdmYmIwMFwiLFxyXG4gICAgICAgICAgICAgICAgQU9MOiBcIiMwMDYwYTNcIixcclxuICAgICAgICAgICAgICAgIEF0bGFzc2lhbjogXCIjMDAzMzY2XCIsXHJcbiAgICAgICAgICAgICAgICBCZWhhbmNlOiBcIiMwNTNlZmZcIixcclxuICAgICAgICAgICAgICAgIFwiQmlnIENhcnRlbFwiOiBcIiM5N2I1MzhcIixcclxuICAgICAgICAgICAgICAgIGJpdGx5OiBcIiNlZTYxMjNcIixcclxuICAgICAgICAgICAgICAgIEJsb2dnZXI6IFwiI2ZjNGYwOFwiLFxyXG4gICAgICAgICAgICAgICAgQm9laW5nOiBcIiMwMDM5YTZcIixcclxuICAgICAgICAgICAgICAgIFwiQm9va2luZy5jb21cIjogXCIjMDAzNTgwXCIsXHJcbiAgICAgICAgICAgICAgICBDYXJib25tYWRlOiBcIiM2MTM4NTRcIixcclxuICAgICAgICAgICAgICAgIENoZWRkYXI6IFwiI2ZmNzI0M1wiLFxyXG4gICAgICAgICAgICAgICAgXCJDb2RlIFNjaG9vbFwiOiBcIiMzZDQ5NDRcIixcclxuICAgICAgICAgICAgICAgIERlbGljaW91czogXCIjMjA1Y2MwXCIsXHJcbiAgICAgICAgICAgICAgICBEZWxsOiBcIiMzMjg3YzFcIixcclxuICAgICAgICAgICAgICAgIERlc2lnbm1vbzogXCIjZTU0YTRmXCIsXHJcbiAgICAgICAgICAgICAgICBEZXZpYW50YXJ0OiBcIiM0ZTYyNTJcIixcclxuICAgICAgICAgICAgICAgIFwiRGVzaWduZXIgTmV3c1wiOiBcIiMyZDcyZGFcIixcclxuICAgICAgICAgICAgICAgIERldm91cjogXCIjZmQwMDAxXCIsXHJcbiAgICAgICAgICAgICAgICBERVdBTFQ6IFwiI2ZlYmQxN1wiLFxyXG4gICAgICAgICAgICAgICAgXCJEaXNxdXMgKGJsdWUpXCI6IFwiIzU5YTNmY1wiLFxyXG4gICAgICAgICAgICAgICAgXCJEaXNxdXMgKG9yYW5nZSlcIjogXCIjZGI3MTMyXCIsXHJcbiAgICAgICAgICAgICAgICBEcmliYmJsZTogXCIjZWE0Yzg5XCIsXHJcbiAgICAgICAgICAgICAgICBEcm9wYm94OiBcIiMzZDlhZThcIixcclxuICAgICAgICAgICAgICAgIERydXBhbDogXCIjMGM3NmFiXCIsXHJcbiAgICAgICAgICAgICAgICBEdW5rZWQ6IFwiIzJhMzIzYVwiLFxyXG4gICAgICAgICAgICAgICAgZUJheTogXCIjODljNTA3XCIsXHJcbiAgICAgICAgICAgICAgICBFbWJlcjogXCIjZjA1ZTFiXCIsXHJcbiAgICAgICAgICAgICAgICBFbmdhZGdldDogXCIjMDBiZGY2XCIsXHJcbiAgICAgICAgICAgICAgICBFbnZhdG86IFwiIzUyODAzNlwiLFxyXG4gICAgICAgICAgICAgICAgRXRzeTogXCIjZWI2ZDIwXCIsXHJcbiAgICAgICAgICAgICAgICBFdmVybm90ZTogXCIjNWJhNTI1XCIsXHJcbiAgICAgICAgICAgICAgICBcIkZhYi5jb21cIjogXCIjZGQwMDE3XCIsXHJcbiAgICAgICAgICAgICAgICBGYWNlYm9vazogXCIjM2I1OTk4XCIsXHJcbiAgICAgICAgICAgICAgICBGaXJlZm94OiBcIiNlNjYwMDBcIixcclxuICAgICAgICAgICAgICAgIFwiRmxpY2tyIChibHVlKVwiOiBcIiMwMDYzZGNcIixcclxuICAgICAgICAgICAgICAgIFwiRmxpY2tyIChwaW5rKVwiOiBcIiNmZjAwODRcIixcclxuICAgICAgICAgICAgICAgIEZvcnJzdDogXCIjNWI5YTY4XCIsXHJcbiAgICAgICAgICAgICAgICBGb3Vyc3F1YXJlOiBcIiMyNWEwY2FcIixcclxuICAgICAgICAgICAgICAgIEdhcm1pbjogXCIjMDA3Y2MzXCIsXHJcbiAgICAgICAgICAgICAgICBHZXRHbHVlOiBcIiMyZDc1YTJcIixcclxuICAgICAgICAgICAgICAgIEdpbW1lYmFyOiBcIiNmNzAwNzhcIixcclxuICAgICAgICAgICAgICAgIEdpdEh1YjogXCIjMTcxNTE1XCIsXHJcbiAgICAgICAgICAgICAgICBcIkdvb2dsZSBCbHVlXCI6IFwiIzAxNDBjYVwiLFxyXG4gICAgICAgICAgICAgICAgXCJHb29nbGUgR3JlZW5cIjogXCIjMTZhNjFlXCIsXHJcbiAgICAgICAgICAgICAgICBcIkdvb2dsZSBSZWRcIjogXCIjZGQxODEyXCIsXHJcbiAgICAgICAgICAgICAgICBcIkdvb2dsZSBZZWxsb3dcIjogXCIjZmNjYTAzXCIsXHJcbiAgICAgICAgICAgICAgICBcIkdvb2dsZStcIjogXCIjZGQ0YjM5XCIsXHJcbiAgICAgICAgICAgICAgICBHcm9vdmVzaGFyazogXCIjZjc3ZjAwXCIsXHJcbiAgICAgICAgICAgICAgICBHcm91cG9uOiBcIiM4MmI1NDhcIixcclxuICAgICAgICAgICAgICAgIFwiSGFja2VyIE5ld3NcIjogXCIjZmY2NjAwXCIsXHJcbiAgICAgICAgICAgICAgICBIZWxsb1dhbGxldDogXCIjMDA4NWNhXCIsXHJcbiAgICAgICAgICAgICAgICBcIkhlcm9rdSAobGlnaHQpXCI6IFwiI2M3YzVlNlwiLFxyXG4gICAgICAgICAgICAgICAgXCJIZXJva3UgKGRhcmspXCI6IFwiIzY1NjdhNVwiLFxyXG4gICAgICAgICAgICAgICAgSG9vdFN1aXRlOiBcIiMwMDMzNjZcIixcclxuICAgICAgICAgICAgICAgIEhvdXp6OiBcIiM3M2JhMzdcIixcclxuICAgICAgICAgICAgICAgIEhUTUw1OiBcIiNlYzYyMzFcIixcclxuICAgICAgICAgICAgICAgIElLRUE6IFwiI2ZmY2MzM1wiLFxyXG4gICAgICAgICAgICAgICAgSU1EYjogXCIjZjNjZTEzXCIsXHJcbiAgICAgICAgICAgICAgICBJbnN0YWdyYW06IFwiIzNmNzI5YlwiLFxyXG4gICAgICAgICAgICAgICAgSW50ZWw6IFwiIzAwNzFjNVwiLFxyXG4gICAgICAgICAgICAgICAgSW50dWl0OiBcIiMzNjVlYmZcIixcclxuICAgICAgICAgICAgICAgIEtpY2tzdGFydGVyOiBcIiM3NmNjMWVcIixcclxuICAgICAgICAgICAgICAgIGtpcHB0OiBcIiNlMDM1MDBcIixcclxuICAgICAgICAgICAgICAgIEtvZGVyeTogXCIjMDBhZjgxXCIsXHJcbiAgICAgICAgICAgICAgICBMYXN0Rk06IFwiI2MzMDAwZFwiLFxyXG4gICAgICAgICAgICAgICAgTGlua2VkSW46IFwiIzBlNzZhOFwiLFxyXG4gICAgICAgICAgICAgICAgTGl2ZXN0cmVhbTogXCIjY2YwMDA1XCIsXHJcbiAgICAgICAgICAgICAgICBMdW1vOiBcIiM1NzYzOTZcIixcclxuICAgICAgICAgICAgICAgIE1peHBhbmVsOiBcIiNhMDg2ZDNcIixcclxuICAgICAgICAgICAgICAgIE1lZXR1cDogXCIjZTUxOTM3XCIsXHJcbiAgICAgICAgICAgICAgICBOb2tpYTogXCIjMTgzNjkzXCIsXHJcbiAgICAgICAgICAgICAgICBOVklESUE6IFwiIzc2YjkwMFwiLFxyXG4gICAgICAgICAgICAgICAgT3BlcmE6IFwiI2NjMGYxNlwiLFxyXG4gICAgICAgICAgICAgICAgUGF0aDogXCIjZTQxZjExXCIsXHJcbiAgICAgICAgICAgICAgICBcIlBheVBhbCAoZGFyaylcIjogXCIjMWU0NzdhXCIsXHJcbiAgICAgICAgICAgICAgICBcIlBheVBhbCAobGlnaHQpXCI6IFwiIzNiN2JiZlwiLFxyXG4gICAgICAgICAgICAgICAgUGluYm9hcmQ6IFwiIzAwMDBlNlwiLFxyXG4gICAgICAgICAgICAgICAgUGludGVyZXN0OiBcIiNjODIzMmNcIixcclxuICAgICAgICAgICAgICAgIFBsYXlTdGF0aW9uOiBcIiM2NjVjYmVcIixcclxuICAgICAgICAgICAgICAgIFBvY2tldDogXCIjZWU0MDU2XCIsXHJcbiAgICAgICAgICAgICAgICBQcmV6aTogXCIjMzE4YmZmXCIsXHJcbiAgICAgICAgICAgICAgICBQdXNoYTogXCIjMGY3MWI0XCIsXHJcbiAgICAgICAgICAgICAgICBRdW9yYTogXCIjYTgyNDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIlFVT1RFLmZtXCI6IFwiIzY2Y2VmZlwiLFxyXG4gICAgICAgICAgICAgICAgUmRpbzogXCIjMDA4ZmQ1XCIsXHJcbiAgICAgICAgICAgICAgICBSZWFkYWJpbGl0eTogXCIjOWMwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIlJlZCBIYXRcIjogXCIjY2MwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBSZXNvdXJjZTogXCIjN2ViNDAwXCIsXHJcbiAgICAgICAgICAgICAgICBSb2NrcGFjazogXCIjMGJhNmFiXCIsXHJcbiAgICAgICAgICAgICAgICBSb29uOiBcIiM2MmIwZDlcIixcclxuICAgICAgICAgICAgICAgIFJTUzogXCIjZWU4MDJmXCIsXHJcbiAgICAgICAgICAgICAgICBTYWxlc2ZvcmNlOiBcIiMxNzk4YzFcIixcclxuICAgICAgICAgICAgICAgIFNhbXN1bmc6IFwiIzBjNGRhMlwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcGlmeTogXCIjOTZiZjQ4XCIsXHJcbiAgICAgICAgICAgICAgICBTa3lwZTogXCIjMDBhZmYwXCIsXHJcbiAgICAgICAgICAgICAgICBTbmFnYWpvYjogXCIjZjQ3YTIwXCIsXHJcbiAgICAgICAgICAgICAgICBTb2Z0b25pYzogXCIjMDA4YWNlXCIsXHJcbiAgICAgICAgICAgICAgICBTb3VuZENsb3VkOiBcIiNmZjc3MDBcIixcclxuICAgICAgICAgICAgICAgIFwiU3BhY2UgQm94XCI6IFwiI2Y4Njk2MFwiLFxyXG4gICAgICAgICAgICAgICAgU3BvdGlmeTogXCIjODFiNzFhXCIsXHJcbiAgICAgICAgICAgICAgICBTcHJpbnQ6IFwiI2ZlZTEwMFwiLFxyXG4gICAgICAgICAgICAgICAgU3F1YXJlc3BhY2U6IFwiIzEyMTIxMlwiLFxyXG4gICAgICAgICAgICAgICAgU3RhY2tPdmVyZmxvdzogXCIjZWY4MjM2XCIsXHJcbiAgICAgICAgICAgICAgICBTdGFwbGVzOiBcIiNjYzAwMDBcIixcclxuICAgICAgICAgICAgICAgIFwiU3RhdHVzIENoYXJ0XCI6IFwiI2Q3NTg0ZlwiLFxyXG4gICAgICAgICAgICAgICAgU3RyaXBlOiBcIiMwMDhjZGRcIixcclxuICAgICAgICAgICAgICAgIFN0dWR5Qmx1ZTogXCIjMDBhZmUxXCIsXHJcbiAgICAgICAgICAgICAgICBTdHVtYmxlVXBvbjogXCIjZjc0NDI1XCIsXHJcbiAgICAgICAgICAgICAgICBcIlQtTW9iaWxlXCI6IFwiI2VhMGE4ZVwiLFxyXG4gICAgICAgICAgICAgICAgVGVjaG5vcmF0aTogXCIjNDBhODAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIlRoZSBOZXh0IFdlYlwiOiBcIiNlZjQ0MjNcIixcclxuICAgICAgICAgICAgICAgIFRyZWVob3VzZTogXCIjNWNiODY4XCIsXHJcbiAgICAgICAgICAgICAgICBUcnVsaWE6IFwiIzVlYWIxZlwiLFxyXG4gICAgICAgICAgICAgICAgVHVtYmxyOiBcIiMzNDUyNmZcIixcclxuICAgICAgICAgICAgICAgIFwiVHdpdGNoLnR2XCI6IFwiIzY0NDFhNVwiLFxyXG4gICAgICAgICAgICAgICAgVHdpdHRlcjogXCIjMDBhY2VlXCIsXHJcbiAgICAgICAgICAgICAgICBUWVBPMzogXCIjZmY4NzAwXCIsXHJcbiAgICAgICAgICAgICAgICBVYnVudHU6IFwiI2RkNDgxNFwiLFxyXG4gICAgICAgICAgICAgICAgVXN0cmVhbTogXCIjMzM4OGZmXCIsXHJcbiAgICAgICAgICAgICAgICBWZXJpem9uOiBcIiNlZjFkMWRcIixcclxuICAgICAgICAgICAgICAgIFZpbWVvOiBcIiM4NmM5ZWZcIixcclxuICAgICAgICAgICAgICAgIFZpbmU6IFwiIzAwYTQ3OFwiLFxyXG4gICAgICAgICAgICAgICAgVmlyYjogXCIjMDZhZmQ4XCIsXHJcbiAgICAgICAgICAgICAgICBcIlZpcmdpbiBNZWRpYVwiOiBcIiNjYzAwMDBcIixcclxuICAgICAgICAgICAgICAgIFdvb2dhOiBcIiM1YjAwOWNcIixcclxuICAgICAgICAgICAgICAgIFwiV29yZFByZXNzIChibHVlKVwiOiBcIiMyMTc1OWJcIixcclxuICAgICAgICAgICAgICAgIFwiV29yZFByZXNzIChvcmFuZ2UpXCI6IFwiI2Q1NGUyMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJXb3JkUHJlc3MgKGdyZXkpXCI6IFwiIzQ2NDY0NlwiLFxyXG4gICAgICAgICAgICAgICAgV3VuZGVybGlzdDogXCIjMmI4OGQ5XCIsXHJcbiAgICAgICAgICAgICAgICBYQk9YOiBcIiM5YmM4NDhcIixcclxuICAgICAgICAgICAgICAgIFhJTkc6IFwiIzEyNjU2N1wiLFxyXG4gICAgICAgICAgICAgICAgXCJZYWhvbyFcIjogXCIjNzIwZTllXCIsXHJcbiAgICAgICAgICAgICAgICBZYW5kZXg6IFwiI2ZmY2MwMFwiLFxyXG4gICAgICAgICAgICAgICAgWWVscDogXCIjYzQxMjAwXCIsXHJcbiAgICAgICAgICAgICAgICBZb3VUdWJlOiBcIiNjNDMwMmJcIixcclxuICAgICAgICAgICAgICAgIFphbG9uZ286IFwiIzU0OThkY1wiLFxyXG4gICAgICAgICAgICAgICAgWmVuZGVzazogXCIjNzhhMzAwXCIsXHJcbiAgICAgICAgICAgICAgICBaZXJwbHk6IFwiIzlkY2M3YVwiLFxyXG4gICAgICAgICAgICAgICAgWm9vdG9vbDogXCIjNWU4YjFkXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJhbmRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBicmFuZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGIgaW4gdGhpcy5icmFuZENvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyYW5kcy5wdXNoKGIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyYW5kcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YUltYWdlOiBmdW5jdGlvbihzaXplLCB0ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FudmFzID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksIGN0eCA9IGNhbnZhcyAmJiBjYW52YXMuZ2V0Q29udGV4dCAmJiBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjYW52YXMgfHwgIWN0eCkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNpemUpIHNpemUgPSB0aGlzLnBpY2sodGhpcy5hZF9zaXplKTtcclxuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0ICE9PSB1bmRlZmluZWQgPyB0ZXh0IDogc2l6ZTtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBzaXplLnNwbGl0KFwieFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHBhcnNlSW50KHNpemVbMF0sIDEwKSwgaGVpZ2h0ID0gcGFyc2VJbnQoc2l6ZVsxXSwgMTApLCBiYWNrZ3JvdW5kID0gdGhpcy5icmFuZENvbG9yc1t0aGlzLnBpY2sodGhpcy5icmFuZHMoKSldLCBmb3JlZ3JvdW5kID0gXCIjRkZGXCIsIHRleHRfaGVpZ2h0ID0gMTQsIGZvbnQgPSBcInNhbnMtc2VyaWZcIjtcclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gYmFja2dyb3VuZDtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmb3JlZ3JvdW5kO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBcImJvbGQgXCIgKyB0ZXh0X2hlaWdodCArIFwicHggXCIgKyBmb250O1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiwgd2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgY29sb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG91ciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxNiAqIDE2ICogMTYgKiAxNiAqIDE2ICogMTYgLSAxKSkudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgICAgICAgICAgY29sb3VyID0gXCIjXCIgKyAoXCIwMDAwMDBcIiArIGNvbG91cikuc2xpY2UoLTYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbG91cjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBjYXBpdGFsaXplOiBmdW5jdGlvbih3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHdvcmQgKyBcIlwiKS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArICh3b3JkICsgXCJcIikuc3Vic3RyKDEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cHBlcjogZnVuY3Rpb24oc3RyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHN0ciArIFwiXCIpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxvd2VyOiBmdW5jdGlvbihzdHIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoc3RyICsgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGljazogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBhcnIgfHwgW107XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyW3RoaXMubmF0dXJhbCgwLCBhcnIubGVuZ3RoIC0gMSldO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaHVmZmxlOiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IGFyciB8fCBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBvbGQgPSBhcnIuc2xpY2UoMCksIHJlc3VsdCA9IFtdLCBpbmRleCA9IDAsIGxlbmd0aCA9IG9sZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5hdHVyYWwoMCwgb2xkLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9sZFtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9sZC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBwYXJhZ3JhcGg6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIGxlbiA9IFJhbmRvbS5uYXR1cmFsKDMsIDcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIGxlbiA9IG1heCA9IG1pbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcGFyc2VJbnQobWluLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VJbnQobWF4LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gUmFuZG9tLm5hdHVyYWwobWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKFJhbmRvbS5zZW50ZW5jZSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnIuam9pbihcIiBcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbnRlbmNlOiBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSBsZW4gPSBSYW5kb20ubmF0dXJhbCgxMiwgMTgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIGxlbiA9IG1heCA9IG1pbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcGFyc2VJbnQobWluLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VJbnQobWF4LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gUmFuZG9tLm5hdHVyYWwobWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKFJhbmRvbS53b3JkKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5jYXBpdGFsaXplKGFyci5qb2luKFwiIFwiKSkgKyBcIi5cIjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgd29yZDogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsZW47XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgbGVuID0gUmFuZG9tLm5hdHVyYWwoMywgMTApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIGxlbiA9IG1heCA9IG1pbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcGFyc2VJbnQobWluLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VJbnQobWF4LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gUmFuZG9tLm5hdHVyYWwobWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFJhbmRvbS5jaGFyYWN0ZXIoXCJsb3dlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbiwgcmVzdWx0ID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgbGVuID0gUmFuZG9tLm5hdHVyYWwoMywgNyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgbGVuID0gbWF4ID0gbWluO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBwYXJzZUludChtaW4sIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUludChtYXgsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSBSYW5kb20ubmF0dXJhbChtaW4sIG1heCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCIgXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGZpcnN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuYW1lcyA9IFsgXCJKYW1lc1wiLCBcIkpvaG5cIiwgXCJSb2JlcnRcIiwgXCJNaWNoYWVsXCIsIFwiV2lsbGlhbVwiLCBcIkRhdmlkXCIsIFwiUmljaGFyZFwiLCBcIkNoYXJsZXNcIiwgXCJKb3NlcGhcIiwgXCJUaG9tYXNcIiwgXCJDaHJpc3RvcGhlclwiLCBcIkRhbmllbFwiLCBcIlBhdWxcIiwgXCJNYXJrXCIsIFwiRG9uYWxkXCIsIFwiR2VvcmdlXCIsIFwiS2VubmV0aFwiLCBcIlN0ZXZlblwiLCBcIkVkd2FyZFwiLCBcIkJyaWFuXCIsIFwiUm9uYWxkXCIsIFwiQW50aG9ueVwiLCBcIktldmluXCIsIFwiSmFzb25cIiwgXCJNYXR0aGV3XCIsIFwiR2FyeVwiLCBcIlRpbW90aHlcIiwgXCJKb3NlXCIsIFwiTGFycnlcIiwgXCJKZWZmcmV5XCIsIFwiRnJhbmtcIiwgXCJTY290dFwiLCBcIkVyaWNcIiBdLmNvbmNhdChbIFwiTWFyeVwiLCBcIlBhdHJpY2lhXCIsIFwiTGluZGFcIiwgXCJCYXJiYXJhXCIsIFwiRWxpemFiZXRoXCIsIFwiSmVubmlmZXJcIiwgXCJNYXJpYVwiLCBcIlN1c2FuXCIsIFwiTWFyZ2FyZXRcIiwgXCJEb3JvdGh5XCIsIFwiTGlzYVwiLCBcIk5hbmN5XCIsIFwiS2FyZW5cIiwgXCJCZXR0eVwiLCBcIkhlbGVuXCIsIFwiU2FuZHJhXCIsIFwiRG9ubmFcIiwgXCJDYXJvbFwiLCBcIlJ1dGhcIiwgXCJTaGFyb25cIiwgXCJNaWNoZWxsZVwiLCBcIkxhdXJhXCIsIFwiU2FyYWhcIiwgXCJLaW1iZXJseVwiLCBcIkRlYm9yYWhcIiwgXCJKZXNzaWNhXCIsIFwiU2hpcmxleVwiLCBcIkN5bnRoaWFcIiwgXCJBbmdlbGFcIiwgXCJNZWxpc3NhXCIsIFwiQnJlbmRhXCIsIFwiQW15XCIsIFwiQW5uYVwiIF0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGljayhuYW1lcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGFzdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmFtZXMgPSBbIFwiU21pdGhcIiwgXCJKb2huc29uXCIsIFwiV2lsbGlhbXNcIiwgXCJCcm93blwiLCBcIkpvbmVzXCIsIFwiTWlsbGVyXCIsIFwiRGF2aXNcIiwgXCJHYXJjaWFcIiwgXCJSb2RyaWd1ZXpcIiwgXCJXaWxzb25cIiwgXCJNYXJ0aW5lelwiLCBcIkFuZGVyc29uXCIsIFwiVGF5bG9yXCIsIFwiVGhvbWFzXCIsIFwiSGVybmFuZGV6XCIsIFwiTW9vcmVcIiwgXCJNYXJ0aW5cIiwgXCJKYWNrc29uXCIsIFwiVGhvbXBzb25cIiwgXCJXaGl0ZVwiLCBcIkxvcGV6XCIsIFwiTGVlXCIsIFwiR29uemFsZXpcIiwgXCJIYXJyaXNcIiwgXCJDbGFya1wiLCBcIkxld2lzXCIsIFwiUm9iaW5zb25cIiwgXCJXYWxrZXJcIiwgXCJQZXJlelwiLCBcIkhhbGxcIiwgXCJZb3VuZ1wiLCBcIkFsbGVuXCIgXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2sobmFtZXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwaXRhbGl6ZSh0aGlzLndvcmQoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hbWU6IGZ1bmN0aW9uKG1pZGRsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3QoKSArIFwiIFwiICsgKG1pZGRsZSA/IHRoaXMuZmlyc3QoKSArIFwiIFwiIDogXCJcIikgKyB0aGlzLmxhc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICB1cmw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaHR0cDovL1wiICsgdGhpcy5kb21haW4oKSArIFwiL1wiICsgdGhpcy53b3JkKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRvbWFpbjogZnVuY3Rpb24odGxkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53b3JkKCkgKyBcIi5cIiArICh0bGQgfHwgdGhpcy50bGQoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVtYWlsOiBmdW5jdGlvbihkb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlcihcImxvd2VyXCIpICsgXCIuXCIgKyB0aGlzLmxhc3QoKS50b0xvd2VyQ2FzZSgpICsgXCJAXCIgKyB0aGlzLmxhc3QoKS50b0xvd2VyQ2FzZSgpICsgXCIuXCIgKyB0aGlzLnRsZCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud29yZCgpICsgXCJAXCIgKyAoZG9tYWluIHx8IHRoaXMuZG9tYWluKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpcDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDAsIDI1NSkgKyBcIi5cIiArIHRoaXMubmF0dXJhbCgwLCAyNTUpICsgXCIuXCIgKyB0aGlzLm5hdHVyYWwoMCwgMjU1KSArIFwiLlwiICsgdGhpcy5uYXR1cmFsKDAsIDI1NSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRsZHM6IFsgXCJjb21cIiwgXCJvcmdcIiwgXCJlZHVcIiwgXCJnb3ZcIiwgXCJjby51a1wiLCBcIm5ldFwiLCBcImlvXCIgXSxcclxuICAgICAgICAgICAgdGxkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2sodGhpcy50bGRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBhcmVhczogWyBcIuS4nOWMl1wiLCBcIuWNjuWMl1wiLCBcIuWNjuS4nFwiLCBcIuWNjuS4rVwiLCBcIuWNjuWNl1wiLCBcIuilv+WNl1wiLCBcIuilv+WMl1wiIF0sXHJcbiAgICAgICAgICAgIGFyZWE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGljayh0aGlzLmFyZWFzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVnaW9uczogWyBcIjExMDAwMCDljJfkuqzluIJcIiwgXCIxMjAwMDAg5aSp5rSl5biCXCIsIFwiMTMwMDAwIOays+WMl+ecgVwiLCBcIjE0MDAwMCDlsbHopb/nnIFcIiwgXCIxNTAwMDAg5YaF6JKZ5Y+k6Ieq5rK75Yy6XCIsIFwiMjEwMDAwIOi+veWugeecgVwiLCBcIjIyMDAwMCDlkInmnpfnnIFcIiwgXCIyMzAwMDAg6buR6b6Z5rGf55yBXCIsIFwiMzEwMDAwIOS4iua1t+W4glwiLCBcIjMyMDAwMCDmsZ/oi4/nnIFcIiwgXCIzMzAwMDAg5rWZ5rGf55yBXCIsIFwiMzQwMDAwIOWuieW+veecgVwiLCBcIjM1MDAwMCDnpo/lu7rnnIFcIiwgXCIzNjAwMDAg5rGf6KW/55yBXCIsIFwiMzcwMDAwIOWxseS4nOecgVwiLCBcIjQxMDAwMCDmsrPljZfnnIFcIiwgXCI0MjAwMDAg5rmW5YyX55yBXCIsIFwiNDMwMDAwIOa5luWNl+ecgVwiLCBcIjQ0MDAwMCDlub/kuJznnIFcIiwgXCI0NTAwMDAg5bm/6KW/5aOu5peP6Ieq5rK75Yy6XCIsIFwiNDYwMDAwIOa1t+WNl+ecgVwiLCBcIjUwMDAwMCDph43luobluIJcIiwgXCI1MTAwMDAg5Zub5bed55yBXCIsIFwiNTIwMDAwIOi0teW3nuecgVwiLCBcIjUzMDAwMCDkupHljZfnnIFcIiwgXCI1NDAwMDAg6KW/6JeP6Ieq5rK75Yy6XCIsIFwiNjEwMDAwIOmZleilv+ecgVwiLCBcIjYyMDAwMCDnlJjogoPnnIFcIiwgXCI2MzAwMDAg6Z2S5rW355yBXCIsIFwiNjQwMDAwIOWugeWkj+WbnuaXj+iHquayu+WMulwiLCBcIjY1MDAwMCDmlrDnlobnu7TlkL7lsJToh6rmsrvljLpcIiwgXCI2NTAwMDAg5paw55aG57u05ZC+5bCU6Ieq5rK75Yy6XCIsIFwiNzEwMDAwIOWPsOa5vuecgVwiLCBcIjgxMDAwMCDpppnmuK/nibnliKvooYzmlL/ljLpcIiwgXCI4MjAwMDAg5r6z6Zeo54m55Yir6KGM5pS/5Yy6XCIgXSxcclxuICAgICAgICAgICAgcmVnaW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2sodGhpcy5yZWdpb25zKS5zcGxpdChcIiBcIilbMV07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIGNpdHk6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHBob25lOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBhcmVhY29kZTogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgc3RyZWV0OiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBzdHJlZXRfc3VmZml4ZXM6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHN0cmVldF9zdWZmaXg6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHN0YXRlczogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgc3RhdGU6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHppcDogZnVuY3Rpb24obGVuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgemlwID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgKGxlbiB8fCA2KTsgaSsrKSB6aXAgKz0gdGhpcy5uYXR1cmFsKDAsIDkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHppcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICB0b2RvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInRvZG9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBkNDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkNjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDYpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkODogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkMTI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbCgxLCAxMik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGQyMDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDIwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZDEwMDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDEwMCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGd1aWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvb2wgPSBcIkFCQ0RFRjEyMzQ1Njc4OTBcIiwgZ3VpZCA9IHRoaXMuc3RyaW5nKHBvb2wsIDgpICsgXCItXCIgKyB0aGlzLnN0cmluZyhwb29sLCA0KSArIFwiLVwiICsgdGhpcy5zdHJpbmcocG9vbCwgNCkgKyBcIi1cIiArIHRoaXMuc3RyaW5nKHBvb2wsIDQpICsgXCItXCIgKyB0aGlzLnN0cmluZyhwb29sLCAxMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3VpZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkLCBzdW0gPSAwLCByYW5rID0gWyBcIjdcIiwgXCI5XCIsIFwiMTBcIiwgXCI1XCIsIFwiOFwiLCBcIjRcIiwgXCIyXCIsIFwiMVwiLCBcIjZcIiwgXCIzXCIsIFwiN1wiLCBcIjlcIiwgXCIxMFwiLCBcIjVcIiwgXCI4XCIsIFwiNFwiLCBcIjJcIiBdLCBsYXN0ID0gWyBcIjFcIiwgXCIwXCIsIFwiWFwiLCBcIjlcIiwgXCI4XCIsIFwiN1wiLCBcIjZcIiwgXCI1XCIsIFwiNFwiLCBcIjNcIiwgXCIyXCIgXTtcclxuICAgICAgICAgICAgICAgIGlkID0gdGhpcy5waWNrKHRoaXMucmVnaW9ucykuc3BsaXQoXCIgXCIpWzBdICsgdGhpcy5kYXRlKFwieXl5eU1NZGRcIikgKyB0aGlzLnN0cmluZyhcIm51bWJlclwiLCAzKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gaWRbaV0gKiByYW5rW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWQgKz0gbGFzdFtzdW0gJSAxMV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGF1dG9JbmNyZW1lbnRJbnRlZ2VyOiAwLFxyXG4gICAgICAgICAgICBpbmNyZW1lbnQ6IGZ1bmN0aW9uKHN0ZXApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9JbmNyZW1lbnRJbnRlZ2VyICs9ICtzdGVwIHx8IDE7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluYzogZnVuY3Rpb24oc3RlcCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5jcmVtZW50KHN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFJhbmRvbTtcclxuICAgIH0oKTtcclxuICAgIC8qISBzcmMvbW9jay5qcyAqL1xyXG4gICAgdmFyIHJrZXkgPSAvKC4rKVxcfCg/OlxcKyhcXGQrKXwoW1xcK1xcLV0/XFxkKy0/W1xcK1xcLV0/XFxkKik/KD86XFwuKFxcZCstP1xcZCopKT8pLywgcnJhbmdlID0gLyhbXFwrXFwtXT9cXGQrKS0/KFtcXCtcXC1dP1xcZCspPy8sIHJwbGFjZWhvbGRlciA9IC9cXFxcKkAoW15AIyUmKClcXD9cXHNcXC9cXC5dKykoPzpcXCgoLio/KVxcKSk/L2c7XHJcbiAgICBNb2NrLmV4dGVuZCA9IFV0aWwuZXh0ZW5kO1xyXG4gICAgTW9jay5tb2NrID0gZnVuY3Rpb24ocnVybCwgcnR5cGUsIHRlbXBsYXRlKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEhhbmRsZS5nZW4ocnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gcnR5cGU7XHJcbiAgICAgICAgICAgIHJ0eXBlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNb2NrLl9tb2NrZWRbcnVybCArIChydHlwZSB8fCBcIlwiKV0gPSB7XHJcbiAgICAgICAgICAgIHJ1cmw6IHJ1cmwsXHJcbiAgICAgICAgICAgIHJ0eXBlOiBydHlwZSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gTW9jaztcclxuICAgIH07XHJcbiAgICB2YXIgSGFuZGxlID0ge1xyXG4gICAgICAgIGV4dGVuZDogVXRpbC5leHRlbmRcclxuICAgIH07XHJcbiAgICBIYW5kbGUucnVsZSA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBuYW1lID0gKG5hbWUgfHwgXCJcIikgKyBcIlwiO1xyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJzID0gKG5hbWUgfHwgXCJcIikubWF0Y2gocmtleSksIHJhbmdlID0gcGFyYW1ldGVycyAmJiBwYXJhbWV0ZXJzWzNdICYmIHBhcmFtZXRlcnNbM10ubWF0Y2gocnJhbmdlKSwgbWluID0gcmFuZ2UgJiYgcGFyc2VJbnQocmFuZ2VbMV0sIDEwKSwgbWF4ID0gcmFuZ2UgJiYgcGFyc2VJbnQocmFuZ2VbMl0sIDEwKSwgY291bnQgPSByYW5nZSA/ICFyYW5nZVsyXSAmJiBwYXJzZUludChyYW5nZVsxXSwgMTApIHx8IFJhbmRvbS5pbnRlZ2VyKG1pbiwgbWF4KSA6IDEsIGRlY2ltYWwgPSBwYXJhbWV0ZXJzICYmIHBhcmFtZXRlcnNbNF0gJiYgcGFyYW1ldGVyc1s0XS5tYXRjaChycmFuZ2UpLCBkbWluID0gZGVjaW1hbCAmJiBwYXJzZUludChkZWNpbWFsWzFdLCAxMCksIGRtYXggPSBkZWNpbWFsICYmIHBhcnNlSW50KGRlY2ltYWxbMl0sIDEwKSwgZGNvdW50ID0gZGVjaW1hbCA/ICFkZWNpbWFsWzJdICYmIHBhcnNlSW50KGRlY2ltYWxbMV0sIDEwKSB8fCBSYW5kb20uaW50ZWdlcihkbWluLCBkbWF4KSA6IDAsIHBvaW50ID0gcGFyYW1ldGVycyAmJiBwYXJhbWV0ZXJzWzRdO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcclxuICAgICAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgICAgIG1heDogbWF4LFxyXG4gICAgICAgICAgICBjb3VudDogY291bnQsXHJcbiAgICAgICAgICAgIGRlY2ltYWw6IGRlY2ltYWwsXHJcbiAgICAgICAgICAgIGRtaW46IGRtaW4sXHJcbiAgICAgICAgICAgIGRtYXg6IGRtYXgsXHJcbiAgICAgICAgICAgIGRjb3VudDogZGNvdW50LFxyXG4gICAgICAgICAgICBwb2ludDogcG9pbnRcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIEhhbmRsZS5nZW4gPSBmdW5jdGlvbih0ZW1wbGF0ZSwgbmFtZSwgY29udGV4dCkge1xyXG4gICAgICAgIG5hbWUgPSBuYW1lID0gKG5hbWUgfHwgXCJcIikgKyBcIlwiO1xyXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xyXG4gICAgICAgIGNvbnRleHQgPSB7XHJcbiAgICAgICAgICAgIHBhdGg6IGNvbnRleHQucGF0aCB8fCBbXSxcclxuICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBjb250ZXh0LnRlbXBsYXRlUGF0aCB8fCBbXSxcclxuICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IGNvbnRleHQuY3VycmVudENvbnRleHQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IGNvbnRleHQudGVtcGxhdGVDdXJyZW50Q29udGV4dCB8fCB0ZW1wbGF0ZSxcclxuICAgICAgICAgICAgcm9vdDogY29udGV4dC5yb290LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IGNvbnRleHQudGVtcGxhdGVSb290XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgcnVsZSA9IEhhbmRsZS5ydWxlKG5hbWUpO1xyXG4gICAgICAgIHZhciB0eXBlID0gVXRpbC50eXBlKHRlbXBsYXRlKTtcclxuICAgICAgICBpZiAoSGFuZGxlW3R5cGVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBIYW5kbGVbdHlwZV0oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXJzZWROYW1lOiBuYW1lID8gbmFtZS5yZXBsYWNlKHJrZXksIFwiJDFcIikgOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgcnVsZTogcnVsZSxcclxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICAgIH07XHJcbiAgICBIYW5kbGUuZXh0ZW5kKHtcclxuICAgICAgICBhcnJheTogZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sIGksIGo7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLnRlbXBsYXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChIYW5kbGUuZ2VuKG9wdGlvbnMudGVtcGxhdGVbaV0sIGksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGhcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ydWxlLmNvdW50ID09PSAxICYmIG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2gob3B0aW9ucy5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBSYW5kb20ucGljayhIYW5kbGUuZ2VuKG9wdGlvbnMudGVtcGxhdGUsIHVuZGVmaW5lZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMucnVsZS5jb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChIYW5kbGUuZ2VuKG9wdGlvbnMudGVtcGxhdGVbaisrXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChqIDwgb3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb2JqZWN0OiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fSwga2V5cywgZm5LZXlzLCBrZXksIHBhcnNlZEtleSwgaW5jLCBpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ydWxlLm1pbikge1xyXG4gICAgICAgICAgICAgICAga2V5cyA9IFV0aWwua2V5cyhvcHRpb25zLnRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgIGtleXMgPSBSYW5kb20uc2h1ZmZsZShrZXlzKTtcclxuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlzLnNsaWNlKDAsIG9wdGlvbnMucnVsZS5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkS2V5ID0ga2V5LnJlcGxhY2UocmtleSwgXCIkMVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKHBhcnNlZEtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3BhcnNlZEtleV0gPSBIYW5kbGUuZ2VuKG9wdGlvbnMudGVtcGxhdGVba2V5XSwga2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBrZXlzID0gW107XHJcbiAgICAgICAgICAgICAgICBmbktleXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG9wdGlvbnMudGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIG9wdGlvbnMudGVtcGxhdGVba2V5XSA9PT0gXCJmdW5jdGlvblwiID8gZm5LZXlzIDoga2V5cykucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGZuS2V5cyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkS2V5ID0ga2V5LnJlcGxhY2UocmtleSwgXCIkMVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKHBhcnNlZEtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3BhcnNlZEtleV0gPSBIYW5kbGUuZ2VuKG9wdGlvbnMudGVtcGxhdGVba2V5XSwga2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5jID0ga2V5Lm1hdGNoKHJrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmMgJiYgaW5jWzJdICYmIFV0aWwudHlwZShvcHRpb25zLnRlbXBsYXRlW2tleV0pID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGVba2V5XSArPSBwYXJzZUludChpbmNbMl0sIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG51bWJlcjogZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0LCBwYXJ0cywgaTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5wb2ludCkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZSArPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgcGFydHMgPSBvcHRpb25zLnRlbXBsYXRlLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICAgICAgICAgIHBhcnRzWzBdID0gb3B0aW9ucy5ydWxlLnJhbmdlID8gb3B0aW9ucy5ydWxlLmNvdW50IDogcGFydHNbMF07XHJcbiAgICAgICAgICAgICAgICBwYXJ0c1sxXSA9IChwYXJ0c1sxXSB8fCBcIlwiKS5zbGljZSgwLCBvcHRpb25zLnJ1bGUuZGNvdW50KTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IHBhcnRzWzFdLmxlbmd0aCA8IG9wdGlvbnMucnVsZS5kY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzWzFdICs9IFJhbmRvbS5jaGFyYWN0ZXIoXCJudW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBwYXJzZUZsb2F0KHBhcnRzLmpvaW4oXCIuXCIpLCAxMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvcHRpb25zLnJ1bGUucmFuZ2UgJiYgIW9wdGlvbnMucnVsZS5wYXJhbWV0ZXJzWzJdID8gb3B0aW9ucy5ydWxlLmNvdW50IDogb3B0aW9ucy50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJib29sZWFuXCI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdDtcclxuICAgICAgICAgICAgcmVzdWx0ID0gb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnMgPyBSYW5kb20uYm9vbChvcHRpb25zLnJ1bGUubWluLCBvcHRpb25zLnJ1bGUubWF4LCBvcHRpb25zLnRlbXBsYXRlKSA6IG9wdGlvbnMudGVtcGxhdGU7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHJpbmc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCIsIGksIHBsYWNlaG9sZGVycywgcGgsIHBoZWQ7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRlbXBsYXRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMucnVsZS5jb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IG9wdGlvbnMudGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcnMgPSByZXN1bHQubWF0Y2gocnBsYWNlaG9sZGVyKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwbGFjZWhvbGRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwaCA9IHBsYWNlaG9sZGVyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoL15cXFxcLy50ZXN0KHBoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcnMuc3BsaWNlKGktLSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwaGVkID0gSGFuZGxlLnBsYWNlaG9sZGVyKHBoLCBvcHRpb25zLmNvbnRleHQuY3VycmVudENvbnRleHQsIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZUN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2Vob2xkZXJzLmxlbmd0aCA9PT0gMSAmJiBwaCA9PT0gcmVzdWx0ICYmIHR5cGVvZiBwaGVkICE9PSB0eXBlb2YgcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBoZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc051bWVyaWMocGhlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBhcnNlRmxvYXQocGhlZCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9eKHRydWV8ZmFsc2UpJC8udGVzdChwaGVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcGhlZCA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogcGhlZCA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiBwaGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UocGgsIHBoZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb3B0aW9ucy5ydWxlLnJhbmdlID8gUmFuZG9tLnN0cmluZyhvcHRpb25zLnJ1bGUuY291bnQpIDogb3B0aW9ucy50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJmdW5jdGlvblwiOiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLnRlbXBsYXRlLmNhbGwob3B0aW9ucy5jb250ZXh0LmN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIEhhbmRsZS5leHRlbmQoe1xyXG4gICAgICAgIF9hbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcmUgPSB7fTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIFJhbmRvbSkgcmVba2V5LnRvTG93ZXJDYXNlKCldID0ga2V5O1xyXG4gICAgICAgICAgICByZXR1cm4gcmU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGFjZWhvbGRlcjogZnVuY3Rpb24ocGxhY2Vob2xkZXIsIG9iaiwgdGVtcGxhdGVDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJwbGFjZWhvbGRlci5leGVjKFwiXCIpO1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBycGxhY2Vob2xkZXIuZXhlYyhwbGFjZWhvbGRlciksIGtleSA9IHBhcnRzICYmIHBhcnRzWzFdLCBsa2V5ID0ga2V5ICYmIGtleS50b0xvd2VyQ2FzZSgpLCBva2V5ID0gdGhpcy5fYWxsKClbbGtleV0sIHBhcmFtcyA9IHBhcnRzICYmIHBhcnRzWzJdIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBldmFsKFwiKGZ1bmN0aW9uKCl7IHJldHVybiBbXS5zcGxpY2UuY2FsbChhcmd1bWVudHMsIDAgKSB9KShcIiArIHBhcmFtcyArIFwiKVwiKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHBhcnRzWzJdLnNwbGl0KC8sXFxzKi8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmogJiYga2V5IGluIG9iaikgcmV0dXJuIG9ialtrZXldO1xyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGVDb250ZXh0ICYmIHR5cGVvZiB0ZW1wbGF0ZUNvbnRleHQgPT09IFwib2JqZWN0XCIgJiYga2V5IGluIHRlbXBsYXRlQ29udGV4dCAmJiBwbGFjZWhvbGRlciAhPT0gdGVtcGxhdGVDb250ZXh0W2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlQ29udGV4dFtrZXldID0gSGFuZGxlLmdlbih0ZW1wbGF0ZUNvbnRleHRba2V5XSwga2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IG9iaixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiB0ZW1wbGF0ZUNvbnRleHRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlQ29udGV4dFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghKGtleSBpbiBSYW5kb20pICYmICEobGtleSBpbiBSYW5kb20pICYmICEob2tleSBpbiBSYW5kb20pKSByZXR1cm4gcGxhY2Vob2xkZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBycGxhY2Vob2xkZXIuZXhlYyhcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChycGxhY2Vob2xkZXIudGVzdChwYXJhbXNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zW2ldID0gSGFuZGxlLnBsYWNlaG9sZGVyKHBhcmFtc1tpXSwgb2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gUmFuZG9tW2tleV0gfHwgUmFuZG9tW2xrZXldIHx8IFJhbmRvbVtva2V5XTtcclxuICAgICAgICAgICAgc3dpdGNoIChVdGlsLnR5cGUoaGFuZGxlKSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJhcnJheVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKGhhbmRsZSk7XHJcblxyXG4gICAgICAgICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIHJlID0gaGFuZGxlLmFwcGx5KFJhbmRvbSwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZSA9PT0gdW5kZWZpbmVkKSByZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8qISBzcmMvbW9ja2pheC5qcyAqL1xyXG4gICAgZnVuY3Rpb24gZmluZChvcHRpb25zKSB7XHJcbiAgICAgICAgZm9yICh2YXIgc1VybFR5cGUgaW4gTW9jay5fbW9ja2VkKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gTW9jay5fbW9ja2VkW3NVcmxUeXBlXTtcclxuICAgICAgICAgICAgaWYgKCghaXRlbS5ydXJsIHx8IG1hdGNoKGl0ZW0ucnVybCwgb3B0aW9ucy51cmwpKSAmJiAoIWl0ZW0ucnR5cGUgfHwgbWF0Y2goaXRlbS5ydHlwZSwgb3B0aW9ucy50eXBlLnRvTG93ZXJDYXNlKCkpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbWF0Y2goZXhwZWN0ZWQsIGFjdHVhbCkge1xyXG4gICAgICAgICAgICBpZiAoVXRpbC50eXBlKGV4cGVjdGVkKSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGVkID09PSBhY3R1YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFV0aWwudHlwZShleHBlY3RlZCkgPT09IFwicmVnZXhwXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBleHBlY3RlZC50ZXN0KGFjdHVhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjb252ZXJ0KGl0ZW0sIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gVXRpbC5pc0Z1bmN0aW9uKGl0ZW0udGVtcGxhdGUpID8gaXRlbS50ZW1wbGF0ZShvcHRpb25zKSA6IE1vY2subW9jayhpdGVtLnRlbXBsYXRlKTtcclxuICAgIH1cclxuICAgIE1vY2subW9ja2pheCA9IGZ1bmN0aW9uIG1vY2tqYXgoalF1ZXJ5KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gbW9ja3hocigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU6IDQsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBvcGVuOiBqUXVlcnkubm9vcCxcclxuICAgICAgICAgICAgICAgIHNlbmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ubG9hZCkgdGhpcy5vbmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXRSZXF1ZXN0SGVhZGVyOiBqUXVlcnkubm9vcCxcclxuICAgICAgICAgICAgICAgIGdldEFsbFJlc3BvbnNlSGVhZGVyczogalF1ZXJ5Lm5vb3AsXHJcbiAgICAgICAgICAgICAgICBnZXRSZXNwb25zZUhlYWRlcjogalF1ZXJ5Lm5vb3AsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBqUXVlcnkubm9vcCxcclxuICAgICAgICAgICAgICAgIGFib3J0OiBqUXVlcnkubm9vcFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBwcmVmaWx0ZXIob3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCBqcVhIUikge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGZpbmQob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGFGaWx0ZXIgPSBvcHRpb25zLmNvbnZlcnRlcnNbXCJ0ZXh0IGpzb25cIl0gPSBvcHRpb25zLmNvbnZlcnRlcnNbXCJ0ZXh0IGpzb25wXCJdID0gb3B0aW9ucy5jb252ZXJ0ZXJzW1widGV4dCBzY3JpcHRcIl0gPSBvcHRpb25zLmNvbnZlcnRlcnNbXCJzY3JpcHQganNvblwiXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb252ZXJ0KGl0ZW0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMueGhyID0gbW9ja3hocjtcclxuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbE9wdGlvbnMuZGF0YVR5cGUgIT09IFwic2NyaXB0XCIpIHJldHVybiBcImpzb25cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBqUXVlcnkuYWpheFByZWZpbHRlcihcImpzb24ganNvbnAgc2NyaXB0XCIsIHByZWZpbHRlcik7XHJcbiAgICAgICAgcmV0dXJuIE1vY2s7XHJcbiAgICB9O1xyXG4gICAgaWYgKHR5cGVvZiBqUXVlcnkgIT0gXCJ1bmRlZmluZWRcIikgTW9jay5tb2NramF4KGpRdWVyeSk7XHJcbiAgICBpZiAodHlwZW9mIFplcHRvICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBNb2NrLm1vY2tqYXggPSBmdW5jdGlvbihaZXB0bykge1xyXG4gICAgICAgICAgICB2YXIgX19vcmlnaW5hbF9hamF4ID0gWmVwdG8uYWpheDtcclxuICAgICAgICAgICAgdmFyIHhociA9IHtcclxuICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU6IDQsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZVRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZVhNTDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiAyLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRpbWVvdXRUaW1lcjogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBaZXB0by5hamF4ID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBmaW5kKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayhpdGVtLnRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zdWNjZXNzKSBvcHRpb25zLnN1Y2Nlc3MoZGF0YSwgeGhyLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jb21wbGV0ZSkgb3B0aW9ucy5jb21wbGV0ZSh4aHIuc3RhdHVzLCB4aHIsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4aHI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX19vcmlnaW5hbF9hamF4LmNhbGwoWmVwdG8sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jay5tb2NramF4KFplcHRvKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgS0lTU1kgIT0gXCJ1bmRlZmluZWRcIiAmJiBLSVNTWS5hZGQpIHtcclxuICAgICAgICBNb2NrLm1vY2tqYXggPSBmdW5jdGlvbiBtb2NramF4KEtJU1NZKSB7XHJcbiAgICAgICAgICAgIHZhciBfb3JpZ2luYWxfYWpheCA9IEtJU1NZLmlvO1xyXG4gICAgICAgICAgICB2YXIgeGhyID0ge1xyXG4gICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTogNCxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlVGV4dDogXCJcIixcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlWE1MOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IDIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGltZW91dFRpbWVyOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIEtJU1NZLmlvID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBmaW5kKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayhpdGVtLnRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zdWNjZXNzKSBvcHRpb25zLnN1Y2Nlc3MoZGF0YSwgeGhyLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jb21wbGV0ZSkgb3B0aW9ucy5jb21wbGV0ZSh4aHIuc3RhdHVzLCB4aHIsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4aHI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX29yaWdpbmFsX2FqYXguYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBfb3JpZ2luYWxfYWpheCkge1xyXG4gICAgICAgICAgICAgICAgS0lTU1kuaW9bbmFtZV0gPSBfb3JpZ2luYWxfYWpheFtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKiEgc3JjL2V4cG9zZS5qcyAqL1xyXG4gICAgTW9jay5VdGlsID0gVXRpbDtcclxuICAgIE1vY2suUmFuZG9tID0gUmFuZG9tO1xyXG4gICAgTW9jay5oZXJlZG9jID0gVXRpbC5oZXJlZG9jO1xyXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IE1vY2s7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTW9jaztcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5jbWQpIHtcclxuICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb2NrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5Nb2NrID0gTW9jaztcclxuICAgIHRoaXMuUmFuZG9tID0gUmFuZG9tO1xyXG4gICAgaWYgKHR5cGVvZiBLSVNTWSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgVXRpbC5lYWNoKFsgXCJtb2NrXCIsIFwiY29tcG9uZW50cy9tb2NrL1wiLCBcIm1vY2svZGlzdC9tb2NrXCIsIFwiZ2FsbGVyeS9Nb2NrLzAuMS4xL1wiLCBcImdhbGxlcnkvTW9jay8wLjEuMi9cIiwgXCJnYWxsZXJ5L01vY2svMC4xLjMvXCIgXSwgZnVuY3Rpb24gcmVnaXN0ZXIobmFtZSkge1xyXG4gICAgICAgICAgICBLSVNTWS5hZGQobmFtZSwgZnVuY3Rpb24oUykge1xyXG4gICAgICAgICAgICAgICAgTW9jay5tb2NramF4KFMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1vY2s7XHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVzOiBbIFwiYWpheFwiIF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKiEgc3JjL21vY2s0dHBsLmpzICovXHJcbiAgICAoZnVuY3Rpb24odW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmFyIE1vY2s0VHBsID0ge1xyXG4gICAgICAgICAgICB2ZXJzaW9uOiBcIjAuMC4xXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghdGhpcy5Nb2NrKSBtb2R1bGUuZXhwb3J0cyA9IE1vY2s0VHBsO1xyXG4gICAgICAgIE1vY2sudHBsID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb2NrNFRwbC5tb2NrKGlucHV0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrLnBhcnNlID0gZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEhhbmRsZWJhcnMucGFyc2UoaW5wdXQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRUcGwubW9jayA9IGZ1bmN0aW9uKGlucHV0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICBoZWxwZXJzID0gaGVscGVycyA/IFV0aWwuZXh0ZW5kKHt9LCBoZWxwZXJzLCBIYW5kbGViYXJzLmhlbHBlcnMpIDogSGFuZGxlYmFycy5oZWxwZXJzO1xyXG4gICAgICAgICAgICBwYXJ0aWFscyA9IHBhcnRpYWxzID8gVXRpbC5leHRlbmQoe30sIHBhcnRpYWxzLCBIYW5kbGViYXJzLnBhcnRpYWxzKSA6IEhhbmRsZWJhcnMucGFydGlhbHM7XHJcbiAgICAgICAgICAgIHJldHVybiBIYW5kbGUuZ2VuKGlucHV0LCBudWxsLCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgSGFuZGxlID0ge1xyXG4gICAgICAgICAgICBkZWJ1ZzogTW9jazRUcGwuZGVidWcgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGV4dGVuZDogVXRpbC5leHRlbmRcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5nZW4gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFzdCA9IEhhbmRsZWJhcnMucGFyc2Uobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gSGFuZGxlLnBhcnNlT3B0aW9ucyhub2RlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSGFuZGxlLmdlbihhc3QsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IFsge30gXTtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgICAgIGlmICh0aGlzW25vZGUudHlwZV0gPT09IFV0aWwubm9vcCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBvcHRpb25zLl9fcGF0aCA9IG9wdGlvbnMuX19wYXRoIHx8IFtdO1xyXG4gICAgICAgICAgICBpZiAoTW9jazRUcGwuZGVidWcgfHwgSGFuZGxlLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5ncm91cChcIltcIiArIG5vZGUudHlwZSArIFwiXVwiLCBKU09OLnN0cmluZ2lmeShub2RlKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltvcHRpb25zXVwiLCBvcHRpb25zLl9fcGF0aC5sZW5ndGgsIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHJlTGVuZ3RoID0gb3B0aW9ucy5fX3BhdGgubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzW25vZGUudHlwZV0obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5zcGxpY2UocHJlTGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYgKE1vY2s0VHBsLmRlYnVnIHx8IEhhbmRsZS5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0W2NvbnRleHQubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUucGFyc2VPcHRpb25zID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJDb21tZW50ID0gLzwhLS1cXHMqXFxuKk1vY2tcXHMqXFxuKihbXFx3XFxXXSs/KVxccypcXG4qLS0+L2c7XHJcbiAgICAgICAgICAgIHZhciBjb21tZW50cyA9IGlucHV0Lm1hdGNoKHJDb21tZW50KSwgcmV0ID0ge30sIGksIG1hLCBvcHRpb247XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGNvbW1lbnRzICYmIGkgPCBjb21tZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgckNvbW1lbnQubGFzdEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIG1hID0gckNvbW1lbnQuZXhlYyhjb21tZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gXCIgKyBtYVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gb3B0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5leHRlbmQocmV0LCBvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlsLmV4dGVuZChyZXQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLnZhbCA9IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnMsIGNvbnRleHQsIGRlZikge1xyXG4gICAgICAgICAgICBpZiAobmFtZSAhPT0gb3B0aW9ucy5fX3BhdGhbb3B0aW9ucy5fX3BhdGgubGVuZ3RoIC0gMV0pIHRocm93IG5ldyBFcnJvcihuYW1lICsgXCIhPT1cIiArIG9wdGlvbnMuX19wYXRoKTtcclxuICAgICAgICAgICAgaWYgKE1vY2s0VHBsLmRlYnVnIHx8IEhhbmRsZS5kZWJ1ZykgY29uc29sZS5sb2coXCJbb3B0aW9uc11cIiwgbmFtZSwgb3B0aW9ucy5fX3BhdGgpO1xyXG4gICAgICAgICAgICBpZiAoZGVmICE9PSB1bmRlZmluZWQpIGRlZiA9IE1vY2subW9jayhkZWYpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vY2tlZCA9IE1vY2subW9jayhvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKG1vY2tlZCkpIHJldHVybiBtb2NrZWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSBpbiBtb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9ja2VkW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY29udGV4dFswXSkpIHJldHVybiB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZiAhPT0gdW5kZWZpbmVkID8gZGVmIDogbmFtZSB8fCBSYW5kb20ud29yZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLnByb2dyYW0gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuc3RhdGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5zdGF0ZW1lbnRzW2ldLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5tdXN0YWNoZSA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbMF0sIGNvbnRleHRMZW5ndGggPSBjb250ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKFV0aWwudHlwZShjdXJyZW50Q29udGV4dCkgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQucHVzaCh7fSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cnJlbnRDb250ZXh0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5pc0hlbHBlciB8fCBoZWxwZXJzICYmIGhlbHBlcnNbbm9kZS5pZC5zdHJpbmddKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXJhbXMubGVuZ3RoID09PSAwKSB7fSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbm9kZS5wYXJhbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5wYXJhbXNbaV0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5oYXNoKSB0aGlzLmdlbihub2RlLmhhc2gsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUuaWQsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5sZW5ndGggPiBjb250ZXh0TGVuZ3RoKSBjb250ZXh0LnNwbGljZSgwLCBjb250ZXh0Lmxlbmd0aCAtIGNvbnRleHRMZW5ndGgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLmJsb2NrID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gbm9kZS5tdXN0YWNoZS5pZC5wYXJ0cywgaSwgbGVuLCBjdXIsIHZhbCwgdHlwZSwgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdLCBjb250ZXh0TGVuZ3RoID0gY29udGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmludmVyc2UpIHt9XHJcbiAgICAgICAgICAgIGlmIChub2RlLm11c3RhY2hlLmlzSGVscGVyIHx8IGhlbHBlcnMgJiYgaGVscGVyc1tub2RlLm11c3RhY2hlLmlkLnN0cmluZ10pIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBwYXJ0c1swXTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IChIZWxwZXJzW3R5cGVdIHx8IEhlbHBlcnMuY3VzdG9tKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyID0gcGFydHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlLnByb2dyYW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLnR5cGUoY3VycmVudENvbnRleHQpID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSB2YWwubGVuZ3RoIHx8IFJhbmRvbS5pbnRlZ2VyKDMsIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dC5wdXNoKHR5cGVvZiB2YWxbaV0gIT09IFwidW5kZWZpbmVkXCIgPyB2YWxbaV0gOiB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2goXCJbXVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0W2N1cnJlbnRDb250ZXh0Lmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5wcm9ncmFtLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHRoaXMuZ2VuKG5vZGUucHJvZ3JhbSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IGNvbnRleHRMZW5ndGgpIGNvbnRleHQuc3BsaWNlKDAsIGNvbnRleHQubGVuZ3RoIC0gY29udGV4dExlbmd0aCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUuaGFzaCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWlycyA9IG5vZGUucGFpcnMsIHBhaXIsIGksIGo7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcGFpciA9IHBhaXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yIChqID0gMTsgaiA8IHBhaXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbihwYWlyW2pdLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5JRCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gbm9kZS5wYXJ0cywgaSwgbGVuLCBjdXIsIHByZXYsIGRlZiwgdmFsLCB0eXBlLCB2YWxUeXBlLCBwcmVPcHRpb25zLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbbm9kZS5kZXB0aF0sIGNvbnRleHRMZW5ndGggPSBjb250ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNBcnJheShjdXJyZW50Q29udGV4dCkpIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFtub2RlLmRlcHRoICsgMV07XHJcbiAgICAgICAgICAgIGlmICghcGFydHMubGVuZ3RoKSB7fSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHBhcnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyID0gcGFydHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldiA9IHBhcnRzW2kgLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBwcmVPcHRpb25zID0gb3B0aW9uc1twcmV2XTtcclxuICAgICAgICAgICAgICAgICAgICBkZWYgPSBpID09PSBsZW4gLSAxID8gY3VycmVudENvbnRleHRbY3VyXSA6IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwgZGVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbFR5cGUgPSBVdGlsLnR5cGUodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IGxlbiAtIDEgJiYgdmFsVHlwZSAhPT0gXCJvYmplY3RcIiAmJiB2YWxUeXBlICE9PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IGxlbiAtIDEgJiYgdHlwZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlICE9PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IGNvbnRleHRMZW5ndGgpIGNvbnRleHQuc3BsaWNlKDAsIGNvbnRleHQubGVuZ3RoIC0gY29udGV4dExlbmd0aCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUucGFydGlhbCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gbm9kZS5wYXJ0aWFsTmFtZS5uYW1lLCBwYXJ0aWFsID0gcGFydGlhbHMgJiYgcGFydGlhbHNbbmFtZV0sIGNvbnRleHRMZW5ndGggPSBjb250ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKHBhcnRpYWwpIEhhbmRsZS5nZW4ocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5sZW5ndGggPiBjb250ZXh0TGVuZ3RoKSBjb250ZXh0LnNwbGljZSgwLCBjb250ZXh0Lmxlbmd0aCAtIGNvbnRleHRMZW5ndGgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLmNvbnRlbnQgPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgSGFuZGxlLlBBUlRJQUxfTkFNRSA9IFV0aWwubm9vcDtcclxuICAgICAgICBIYW5kbGUuREFUQSA9IFV0aWwubm9vcDtcclxuICAgICAgICBIYW5kbGUuU1RSSU5HID0gVXRpbC5ub29wO1xyXG4gICAgICAgIEhhbmRsZS5JTlRFR0VSID0gVXRpbC5ub29wO1xyXG4gICAgICAgIEhhbmRsZS5CT09MRUFOID0gVXRpbC5ub29wO1xyXG4gICAgICAgIEhhbmRsZS5jb21tZW50ID0gVXRpbC5ub29wO1xyXG4gICAgICAgIHZhciBIZWxwZXJzID0ge307XHJcbiAgICAgICAgSGVscGVycy5lYWNoID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgaSwgbGVuLCBjdXIsIHZhbCwgcGFydHMsIGRlZiwgdHlwZSwgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdO1xyXG4gICAgICAgICAgICBwYXJ0cyA9IG5vZGUubXVzdGFjaGUucGFyYW1zWzBdLnBhcnRzO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBjdXIgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgICAgICAgIGRlZiA9IGkgPT09IGxlbiAtIDEgPyBbXSA6IHt9O1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHZhbDtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBVdGlsLnR5cGUoY3VycmVudENvbnRleHRbY3VyXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGVscGVyc1tcImlmXCJdID0gSGVscGVycy51bmxlc3MgPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBub2RlLm11c3RhY2hlLnBhcmFtcywgaSwgaiwgY3VyLCB2YWwsIHBhcnRzLCBkZWYsIHR5cGUsIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFswXTtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcGFydHMgPSBwYXJhbXNbaV0ucGFydHM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyID0gcGFydHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmID0gaiA9PT0gcGFydHMubGVuZ3RoIC0gMSA/IFwiQEJPT0woMiwxLHRydWUpXCIgOiB7fTtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbChjdXIsIG9wdGlvbnMsIGNvbnRleHQsIGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IHBhcnRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsID09PSBcInRydWVcIiA/IHRydWUgOiB2YWwgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtjdXJdID0gVXRpbC5pc0FycmF5KHZhbCkgPyBbXSA6IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIZWxwZXJzW1wid2l0aFwiXSA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIGksIGN1ciwgdmFsLCBwYXJ0cywgZGVmLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbMF07XHJcbiAgICAgICAgICAgIHBhcnRzID0gbm9kZS5tdXN0YWNoZS5wYXJhbXNbMF0ucGFydHM7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBjdXIgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgICAgICAgIGRlZiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGVscGVycy5sb2cgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICAgIEhlbHBlcnMuY3VzdG9tID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgaSwgbGVuLCBjdXIsIHZhbCwgcGFydHMsIGRlZiwgdHlwZSwgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5tdXN0YWNoZS5wYXJhbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKG5vZGUubXVzdGFjaGUuaWQuc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIGN1ciA9IG5vZGUubXVzdGFjaGUuaWQuc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgZGVmID0gXCJAQk9PTCgyLDEsdHJ1ZSlcIjtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwgZGVmKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB2YWw7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIgfHwgdHlwZSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0cyA9IG5vZGUubXVzdGFjaGUucGFyYW1zWzBdLnBhcnRzO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXIgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBkZWYgPSBpID09PSBsZW4gLSAxID8gW10gOiB7fTtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbChjdXIsIG9wdGlvbnMsIGNvbnRleHQsIGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfTtcclxuICAgIH0pLmNhbGwodGhpcyk7XHJcbiAgICAvKiEgc3JjL21vY2s0eHRwbC5qcyAqL1xyXG4gICAgKGZ1bmN0aW9uKHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgS0lTU1kgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICAgICAgICB2YXIgTW9jazRYVHBsID0ge1xyXG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBYVGVtcGxhdGU7XHJcbiAgICAgICAgS0lTU1kudXNlKFwieHRlbXBsYXRlXCIsIGZ1bmN0aW9uKFMsIFQpIHtcclxuICAgICAgICAgICAgWFRlbXBsYXRlID0gVDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXRoaXMuTW9jaykgbW9kdWxlLmV4cG9ydHMgPSBNb2NrNFhUcGw7XHJcbiAgICAgICAgTW9jay54dHBsID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb2NrNFhUcGwubW9jayhpbnB1dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jay54cGFyc2UgPSBmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWFRlbXBsYXRlLmNvbXBpbGVyLnBhcnNlKGlucHV0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5tb2NrID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIGhlbHBlcnMgPSBoZWxwZXJzID8gVXRpbC5leHRlbmQoe30sIGhlbHBlcnMsIFhUZW1wbGF0ZS5SdW5UaW1lLmNvbW1hbmRzKSA6IFhUZW1wbGF0ZS5SdW5UaW1lLmNvbW1hbmRzO1xyXG4gICAgICAgICAgICBwYXJ0aWFscyA9IHBhcnRpYWxzID8gVXRpbC5leHRlbmQoe30sIHBhcnRpYWxzLCBYVGVtcGxhdGUuUnVuVGltZS5zdWJUcGxzKSA6IFhUZW1wbGF0ZS5SdW5UaW1lLnN1YlRwbHM7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbihpbnB1dCwgbnVsbCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIHt9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5wYXJzZSA9IGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBYVGVtcGxhdGUuY29tcGlsZXIucGFyc2UoaW5wdXQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLmdlbiA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChNb2NrNFhUcGwuZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlt0cGwgICAgXVxcblwiLCBub2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBhc3QgPSB0aGlzLnBhcnNlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMucGFyc2VPcHRpb25zKG5vZGUsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdlbihhc3QsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCBbIHt9IF07XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgICAgICBub2RlLnR5cGUgPSBub2RlLnR5cGU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzW25vZGUudHlwZV0gPT09IFV0aWwubm9vcCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBvcHRpb25zLl9fcGF0aCA9IG9wdGlvbnMuX19wYXRoIHx8IFtdO1xyXG4gICAgICAgICAgICBpZiAoTW9jazRYVHBsLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5ncm91cChcIltcIiArIG5vZGUudHlwZSArIFwiXVwiLCBKU09OLnN0cmluZ2lmeShub2RlKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltjb250ZXh0XVwiLCBcIltiZWZvcmVdXCIsIGNvbnRleHQubGVuZ3RoLCBKU09OLnN0cmluZ2lmeShjb250ZXh0KSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltvcHRpb25zXVwiLCBcIltiZWZvcmVdXCIsIG9wdGlvbnMuX19wYXRoLmxlbmd0aCwgSlNPTi5zdHJpbmdpZnkob3B0aW9ucykpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbb3RoZXIgIF1cIiwgXCJbYmVmb3JlXVwiLCBKU09OLnN0cmluZ2lmeShvdGhlcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwcmVMZW5ndGggPSBvcHRpb25zLl9fcGF0aC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXNbbm9kZS50eXBlXShub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICBpZiAoTW9jazRYVHBsLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltfX3BhdGggXVwiLCBcIlthZnRlciBdXCIsIG9wdGlvbnMuX19wYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW90aGVyLmhvbGQgfHwgdHlwZW9mIG90aGVyLmhvbGQgPT09IFwiZnVuY3Rpb25cIiAmJiAhb3RoZXIuaG9sZChub2RlLCBvcHRpb25zLCBjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGguc3BsaWNlKHByZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE1vY2s0WFRwbC5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbY29udGV4dF1cIiwgXCJbYWZ0ZXIgXVwiLCBjb250ZXh0Lmxlbmd0aCwgSlNPTi5zdHJpbmdpZnkoY29udGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0W2NvbnRleHQubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwucGFyc2VPcHRpb25zID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJDb21tZW50ID0gLzwhLS1cXHMqXFxuKk1vY2tcXHMqXFxuKihbXFx3XFxXXSs/KVxccypcXG4qLS0+L2c7XHJcbiAgICAgICAgICAgIHZhciBjb21tZW50cyA9IGlucHV0Lm1hdGNoKHJDb21tZW50KSwgcmV0ID0ge30sIGksIG1hLCBvcHRpb247XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGNvbW1lbnRzICYmIGkgPCBjb21tZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgckNvbW1lbnQubGFzdEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIG1hID0gckNvbW1lbnQuZXhlYyhjb21tZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gXCIgKyBtYVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gb3B0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5leHRlbmQocmV0LCBvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlsLmV4dGVuZChyZXQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLnBhcnNlVmFsID0gZnVuY3Rpb24oZXhwciwgb2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHF1ZXJ5QXJyYXkocHJvcCwgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSBcIm9iamVjdFwiICYmIHByb3AgaW4gY29udGV4dCkgcmV0dXJuIFsgY29udGV4dFtwcm9wXSBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2guYXBwbHkocmV0LCBxdWVyeShwcm9wLCBbIGNvbnRleHRbaV0gXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBxdWVyeU9iamVjdChwcm9wLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQgPT09IFwib2JqZWN0XCIgJiYgcHJvcCBpbiBjb250ZXh0KSByZXR1cm4gWyBjb250ZXh0W3Byb3BdIF07XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldC5wdXNoLmFwcGx5KHJldCwgcXVlcnkocHJvcCwgWyBjb250ZXh0W2tleV0gXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBxdWVyeShwcm9wLCBzZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXQgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXRbaV0gIT09IFwib2JqZWN0XCIpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wIGluIHNldFtpXSkgcmV0LnB1c2goc2V0W2ldW3Byb3BdKTsgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5wdXNoLmFwcGx5KHJldCwgVXRpbC5pc0FycmF5KHNldFtpXSkgPyBxdWVyeUFycmF5KHByb3AsIHNldFtpXSkgOiBxdWVyeU9iamVjdChwcm9wLCBzZXRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhcnNlKGV4cHIsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHR5cGVvZiBleHByID09PSBcInN0cmluZ1wiID8gZXhwci5zcGxpdChcIi5cIikgOiBleHByLnNsaWNlKDApLCBzZXQgPSBbIGNvbnRleHQgXTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChwYXJ0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXQgPSBxdWVyeShwYXJ0cy5zaGlmdCgpLCBzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2UoZXhwciwgb2JqZWN0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC52YWwgPSBmdW5jdGlvbihuYW1lLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpIHtcclxuICAgICAgICAgICAgaWYgKG5hbWUgIT09IG9wdGlvbnMuX19wYXRoW29wdGlvbnMuX19wYXRoLmxlbmd0aCAtIDFdKSB0aHJvdyBuZXcgRXJyb3IobmFtZSArIFwiIT09XCIgKyBvcHRpb25zLl9fcGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChkZWYgIT09IHVuZGVmaW5lZCkgZGVmID0gTW9jay5tb2NrKGRlZik7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9ja2VkID0gTW9jay5tb2NrKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcobW9ja2VkKSkgcmV0dXJuIG1vY2tlZDtcclxuICAgICAgICAgICAgICAgIHZhciByZXQgPSBNb2NrNFhUcGwucGFyc2VWYWwob3B0aW9ucy5fX3BhdGgsIG1vY2tlZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0Lmxlbmd0aCA+IDApIHJldHVybiByZXRbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSBpbiBtb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9ja2VkW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY29udGV4dFswXSkpIHJldHVybiB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZiAhPT0gdW5kZWZpbmVkID8gZGVmIDogbmFtZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5wcm9ncmFtID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5zdGF0ZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLnN0YXRlbWVudHNbaV0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IG5vZGUuaW52ZXJzZSAmJiBqIDwgbm9kZS5pbnZlcnNlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLmludmVyc2Vbal0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5ibG9jayA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dExlbmd0aCA9IGNvbnRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLmdlbihub2RlLnRwbCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIFV0aWwuZXh0ZW5kKHt9LCBvdGhlciwge1xyXG4gICAgICAgICAgICAgICAgZGVmOiB7fSxcclxuICAgICAgICAgICAgICAgIGhvbGQ6IHRydWVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdLCBtb2NrZWQsIGksIGxlbjtcclxuICAgICAgICAgICAgaWYgKFV0aWwudHlwZShjdXJyZW50Q29udGV4dCkgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgbW9ja2VkID0gdGhpcy52YWwob3B0aW9ucy5fX3BhdGhbb3B0aW9ucy5fX3BhdGgubGVuZ3RoIC0gMV0sIG9wdGlvbnMsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgbGVuID0gbW9ja2VkICYmIG1vY2tlZC5sZW5ndGggfHwgUmFuZG9tLmludGVnZXIoMywgNyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dC5wdXNoKG1vY2tlZCAmJiBtb2NrZWRbaV0gIT09IHVuZGVmaW5lZCA/IG1vY2tlZFtpXSA6IHt9KTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dFtjdXJyZW50Q29udGV4dC5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5wcm9ncmFtLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHRoaXMuZ2VuKG5vZGUucHJvZ3JhbSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgaWYgKCFvdGhlci5ob2xkIHx8IHR5cGVvZiBvdGhlci5ob2xkID09PSBcImZ1bmN0aW9uXCIgJiYgIW90aGVyLmhvbGQobm9kZSwgb3B0aW9ucywgY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3BsaWNlKDAsIGNvbnRleHQubGVuZ3RoIC0gY29udGV4dExlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC50cGwgPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUucGFyYW1zICYmIG5vZGUucGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgb3RoZXIgPSBVdGlsLmV4dGVuZCh7fSwgb3RoZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWY6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFjaDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWZcIjogXCJAQk9PTCgyLDEsdHJ1ZSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzOiBcIkBCT09MKDIsMSxmYWxzZSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aXRoXCI6IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfVtub2RlLnBhdGguc3RyaW5nXSxcclxuICAgICAgICAgICAgICAgICAgICBob2xkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhY2g6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWZcIjogZnVuY3Rpb24oXywgX18sIF9fXywgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzczogZnVuY3Rpb24oXywgX18sIF9fXywgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2l0aFwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1bbm9kZS5wYXRoLnN0cmluZ11cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlucHV0OyBpIDwgbm9kZS5wYXJhbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXRoLnN0cmluZyA9PT0gXCJpbmNsdWRlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBwYXJ0aWFscyAmJiBwYXJ0aWFsc1tub2RlLnBhcmFtc1tpXS52YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlucHV0ID0gbm9kZS5wYXJhbXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0KSB0aGlzLmdlbihpbnB1dCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmhhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLmhhc2gsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLnBhdGgsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC50cGxFeHByZXNzaW9uID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUuZXhwcmVzc2lvbiwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5jb250ZW50ID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC51bmFyeUV4cHJlc3Npb24gPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLm11bHRpcGxpY2F0aXZlRXhwcmVzc2lvbiA9IE1vY2s0WFRwbC5hZGRpdGl2ZUV4cHJlc3Npb24gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5vcDEsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBVdGlsLmV4dGVuZCh7fSwgb3RoZXIsIHtcclxuICAgICAgICAgICAgICAgIGRlZjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUub3AyLnR5cGUgPT09IFwibnVtYmVyXCIgPyBub2RlLm9wMi52YWx1ZS5pbmRleE9mKFwiLlwiKSA+IC0xID8gUmFuZG9tLmZsb2F0KC1NYXRoLnBvdygxMCwgMTApLCBNYXRoLnBvdygxMCwgMTApLCAxLCBNYXRoLnBvdygxMCwgNikpIDogUmFuZG9tLmludGVnZXIoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH0oKVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUub3AyLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgVXRpbC5leHRlbmQoe30sIG90aGVyLCB7XHJcbiAgICAgICAgICAgICAgICBkZWY6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm9wMS50eXBlID09PSBcIm51bWJlclwiID8gbm9kZS5vcDEudmFsdWUuaW5kZXhPZihcIi5cIikgPiAtMSA/IFJhbmRvbS5mbG9hdCgtTWF0aC5wb3coMTAsIDEwKSwgTWF0aC5wb3coMTAsIDEwKSwgMSwgTWF0aC5wb3coMTAsIDYpKSA6IFJhbmRvbS5pbnRlZ2VyKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9KClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLnJlbGF0aW9uYWxFeHByZXNzaW9uID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUub3AxLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmdlbihub2RlLm9wMiwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5lcXVhbGl0eUV4cHJlc3Npb24gPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLmNvbmRpdGlvbmFsQW5kRXhwcmVzc2lvbiA9IFV0aWwubm9vcDtcclxuICAgICAgICBNb2NrNFhUcGwuY29uZGl0aW9uYWxPckV4cHJlc3Npb24gPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLnN0cmluZyA9IFV0aWwubm9vcDtcclxuICAgICAgICBNb2NrNFhUcGwubnVtYmVyID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC5ib29sZWFuID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC5oYXNoID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWlycyA9IG5vZGUudmFsdWUsIGtleTtcclxuICAgICAgICAgICAgZm9yIChrZXkgaW4gcGFpcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuKHBhaXJzW2tleV0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5pZCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dExlbmd0aCA9IGNvbnRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBub2RlLnBhcnRzLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbbm9kZS5kZXB0aF0sIGksIGxlbiwgY3VyLCBkZWYsIHZhbDtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZml4KGN1cnJlbnRDb250ZXh0LCBpbmRleCwgbGVuZ3RoLCBuYW1lLCB2YWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W25hbWVdKSwgdmFsVHlwZSA9IFV0aWwudHlwZSh2YWwpO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdmFsID09PSBcInRydWVcIiA/IHRydWUgOiB2YWwgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogdmFsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBsZW5ndGggLSAxICYmICFVdGlsLmlzT2JqZWN0T3JBcnJheSh2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W25hbWVdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbbmFtZV0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBsZW5ndGggLSAxICYmIHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZSAhPT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W25hbWVdID0gVXRpbC5pc0FycmF5KHZhbCkgJiYgW10gfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZSAhPT0gXCJhcnJheVwiICYmIHZhbFR5cGUgIT09IFwib2JqZWN0XCIgJiYgdmFsVHlwZSAhPT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtuYW1lXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Q29udGV4dFtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc0FycmF5KGN1cnJlbnRDb250ZXh0KSkgY3VycmVudENvbnRleHQgPSBjb250ZXh0W25vZGUuZGVwdGggKyAxXTtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09PSAwICYmIHBhcnRzW2ldID09PSBcInRoaXNcIikgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoL14oeGluZGV4fHhjb3VudHx4a2V5KSQvLnRlc3QocGFydHNbaV0pKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChpID09PSAwICYmIGxlbiA9PT0gMSAmJiBwYXJ0c1tpXSBpbiBoZWxwZXJzKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2gocGFydHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgY3VyID0gcGFydHNbaV07XHJcbiAgICAgICAgICAgICAgICBkZWYgPSBpID09PSBsZW4gLSAxID8gb3RoZXIuZGVmICE9PSB1bmRlZmluZWQgPyBvdGhlci5kZWYgOiBjb250ZXh0WzBdW2N1cl0gOiB7fTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwgZGVmKTtcclxuICAgICAgICAgICAgICAgIGlmIChNb2NrNFhUcGwuZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltkZWYgICAgXVwiLCBKU09OLnN0cmluZ2lmeShkZWYpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlt2YWwgICAgXVwiLCBKU09OLnN0cmluZ2lmeSh2YWwpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhbCA9IGZpeChjdXJyZW50Q29udGV4dCwgaSwgbGVuLCBjdXIsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc09iamVjdE9yQXJyYXkoY3VycmVudENvbnRleHRbY3VyXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW90aGVyLmhvbGQgfHwgdHlwZW9mIG90aGVyLmhvbGQgPT09IFwiZnVuY3Rpb25cIiAmJiAhb3RoZXIuaG9sZChub2RlLCBvcHRpb25zLCBjb250ZXh0LCBjdXIsIHZhbCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3BsaWNlKDAsIGNvbnRleHQubGVuZ3RoIC0gY29udGV4dExlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSkuY2FsbCh0aGlzKTtcclxufSkuY2FsbCh0aGlzKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL21vY2suanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSA0IDUgMTZcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBodW1vckhhbiBvbiAyMDE2LzUvMjAuXHJcbiAqL1xyXG52YXIgbW9ja1NlbGVjdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC9tb2NrLXNlbGVjdC9tb2NrLXNlbGVjdC5qcycpO1xyXG52YXIgTW9jayA9IHJlcXVpcmUoJ21vY2snKTtcclxuXHJcbnZhciBtb2NrRGF0YSA9IE1vY2subW9jayhcclxuICAgIHtcclxuICAgICAgICAnZGF0YXwzLTUnOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdpZHwrMSc6IDEsXHJcbiAgICAgICAgICAgICAgICAnbmFtZXwxJzogWyfmlbDlraYnLCfor63mlocnLCfoi7Hor60nLCfniannkIYnLCfnlJ/niaknXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG4pO1xyXG52YXIgbW9ja0RhdGExID0gTW9jay5tb2NrKFxyXG4gICAge1xyXG4gICAgICAgICdkYXRhfDMtNSc6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ2lkfCsxJzogMSxcclxuICAgICAgICAgICAgICAgICduYW1lfDEnOiBbJ+aVsOWtpicsJ+ivreaWhycsJ+iLseivrScsJ+eJqeeQhicsJ+eUn+eJqSddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbik7XHJcblxyXG5tb2NrU2VsZWN0KCdkb20xJywgbW9ja0RhdGEsIGZ1bmN0aW9uKGlkKXtcclxuICAgIGNvbnNvbGUubG9nKGlkKTtcclxufSxmdW5jdGlvbigpe1xyXG4gICAgY29uc29sZS5sb2coJ+mhtemdojHlm57osIMnKTtcclxufSwnaWQxJyk7XHJcblxyXG5tb2NrU2VsZWN0KCdkb20yJywgbW9ja0RhdGExLCBmdW5jdGlvbihpZCl7XHJcbiAgICBjb25zb2xlLmxvZyhpZCk7XHJcbn0sZnVuY3Rpb24oKXtcclxuICAgIGNvbnNvbGUubG9nKCfpobXpnaIy5Zue6LCDJyk7XHJcbn0sJ2lkMicpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9kZW1vL3Rlc3QtbW9jay1zZWxlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAxNlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=