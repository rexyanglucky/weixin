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

	module.exports = __webpack_require__(58);


/***/ },

/***/ 5:
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

/***/ 8:
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

/***/ 10:
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

	/**
	 * Created by humorHan on 2016/5/20.
	 */
	__webpack_require__(19);
	var selectTpl = __webpack_require__(23);
	var selectUlTpl = __webpack_require__(24);
	
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

/***/ 19:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(20);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
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

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".mock-select{\r\n    line-height: 42px;\r\n    height: 42px;\r\n    text-align: center;\r\n    border:none;\r\n}\r\n.mock-select .name-wrap.active{\r\n    background: #fff;\r\n}\r\n.mock-ul{\r\n    position: absolute;\r\n    background: #fff;\r\n    z-index: 100;\r\n    border-bottom: 1px solid #d9d9d9;\r\n    width: 93.6%;\r\n    overflow-y: scroll;\r\n}\r\n.mock-select .name-wrap{\r\n    color: #fff;\r\n    height: 42px;\r\n    overflow: hidden;\r\n}\r\n.mock-select .bg{\r\n    display: inline-block;\r\n    height: 6px;\r\n    width: 13px;\r\n}\r\n.mock-select .name-wrap .bg{\r\n    background: url(" + __webpack_require__(21) + ") center center no-repeat;\r\n}\r\n.mock-select .name-wrap.active{\r\n    color: #00d535;\r\n}\r\n.mock-select .name-wrap.active .bg {\r\n    background: url(" + __webpack_require__(22) + ") center center no-repeat;\r\n}\r\n.mock-ul li{\r\n    margin:0;\r\n    color: #333333;\r\n    text-align: left;\r\n    height: 42px;\r\n    line-height: 42px;\r\n    border-top: 1px solid #d9d9d9;\r\n}\r\n.mock-ul li .right{\r\n    display: none;\r\n    float: right;\r\n    margin-right: 1rem;\r\n}\r\n.mock-ul li.active .right{\r\n    display: inline;\r\n}\r\n.mock-ul li.active{\r\n    color: #00d535;\r\n}", ""]);
	
	// exports


/***/ },

/***/ 21:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAGCAYAAAAYLBS/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTYwQkQ4RjgyMEI2MTFFNjk4QjBGMzFFNkNGQTgxMDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTYwQkQ4RjcyMEI2MTFFNjk4QjBGMzFFNkNGQTgxMDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjkxMkNDRTlBMjBFNjExOEZCQzg4QzIxN0QyRUJGOSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmYxYzk5MjgxLTM4NWEtMTE3OS1hMzViLTkzNTU2ZTcyMjJiNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PheHe58AAABVSURBVHjaYvj//78OEN/7DwGf8OD/UHU6DEAChE2RJHCBT1B1DDBNICwMxBdwaLgAlWdA1wTCXEB8GE3DYag4Ay5NMLwNqmEbNnlcmkA4C5ccQIABAPGiC0psi9bFAAAAAElFTkSuQmCC"

/***/ },

/***/ 22:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAGCAYAAAAYLBS/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEFBNUQyRTYyMEI2MTFFNjg0OUZDNjY1RDdFMUNFMEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEFBNUQyRTUyMEI2MTFFNjg0OUZDNjY1RDdFMUNFMEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjkxMkNDRTlBMjBFNjExOEZCQzg4QzIxN0QyRUJGOSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmYxYzk5MjgxLTM4NWEtMTE3OS1hMzViLTkzNTU2ZTcyMjJiNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmlp944AAACeSURBVHjaYvj//78OEN/7DwGfQDjjWfsvEIbxofg/VJ0OA8NVUwYgwxQm0fhq9n+gGBiD2EjgE1QdA1gTVKNw6YtJz2EaYLjp1RyQhgsgeag6BkawJgioB+IGBiyAi4mj9du/HzUg9n+tUwwsUPF+IC5gwAGAGqqBFDcQF4L4IE35UA3fgfgPTCErIwvr7/9/fkO5LFA1D4B4IkCAAQDWEYtLHKvdIwAAAABJRU5ErkJggg=="

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);
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

/***/ 24:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);
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

/***/ 36:
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

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/20.
	 */
	var mockSelect = __webpack_require__(18);
	var Mock = __webpack_require__(36);
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzk1ZjYzOTgzMjhhMTFlZDdlZDU/NDAyMCoqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qcz84OTY2KioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzP2RhMDQqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzP2I5ODAqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9tb2NrLXNlbGVjdC5qcz9iNDI3KioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvY3NzL21vY2stc2VsZWN0LmNzcz84YTBhKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2Nzcy9tb2NrLXNlbGVjdC5jc3M/MTM5NCoqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9pbWcvYXJyb3ctYm90dG9tLnBuZz9mN2Y5KioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LXRvcC5wbmc/ZTYyYyoqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9tb2NrLXNlbGVjdC10cGwudHBsP2Y3ZGUqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvc2VsZWN0LXVsLXRwbC50cGw/M2M0NSoqKiIsIndlYnBhY2s6Ly8vLi9kZXAvbW9jay5qcz8yNDA2Iiwid2VicGFjazovLy8uL2pzL2RlbW8vdGVzdC1tb2NrLXNlbGVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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O0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLFlBQVk7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakIsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixZQUFZO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUErQixTQUFTO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNU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QTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQyx1Q0FBdUM7QUFDbEYsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQixtQkFBbUI7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQSxV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QUNEO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsRUFBQyxRIiwiZmlsZSI6InRlc3QtbW9jay1zZWxlY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvbWZnLXdlY2hhdC9idW5kbGUvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjOTVmNjM5ODMyOGExMWVkN2VkNVxuICoqLyIsIi8qVE1PREpTOnt9Ki9cclxuIWZ1bmN0aW9uICgpIHtcclxuXHRmdW5jdGlvbiBhKGEsIGIpIHtcclxuXHRcdHJldHVybiAoL3N0cmluZ3xmdW5jdGlvbi8udGVzdCh0eXBlb2YgYikgPyBoIDogZykoYSwgYilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGIoYSwgYykge1xyXG5cdFx0cmV0dXJuIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEgJiYgKGMgPSB0eXBlb2YgYSwgXCJudW1iZXJcIiA9PT0gYyA/IGEgKz0gXCJcIiA6IGEgPSBcImZ1bmN0aW9uXCIgPT09IGMgPyBiKGEuY2FsbChhKSkgOiBcIlwiKSwgYVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYyhhKSB7XHJcblx0XHRyZXR1cm4gbFthXVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZChhKSB7XHJcblx0XHRyZXR1cm4gYihhKS5yZXBsYWNlKC8mKD8hW1xcdyNdKzspfFs8PlwiJ10vZywgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGUoYSwgYikge1xyXG5cdFx0aWYgKG0oYSkpZm9yICh2YXIgYyA9IDAsIGQgPSBhLmxlbmd0aDsgZCA+IGM7IGMrKyliLmNhbGwoYSwgYVtjXSwgYywgYSk7IGVsc2UgZm9yIChjIGluIGEpYi5jYWxsKGEsIGFbY10sIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmKGEsIGIpIHtcclxuXHRcdHZhciBjID0gLyhcXC8pW15cXC9dK1xcMVxcLlxcLlxcMS8sIGQgPSAoXCIuL1wiICsgYSkucmVwbGFjZSgvW15cXC9dKyQvLCBcIlwiKSwgZSA9IGQgKyBiO1xyXG5cdFx0Zm9yIChlID0gZS5yZXBsYWNlKC9cXC9cXC5cXC8vZywgXCIvXCIpOyBlLm1hdGNoKGMpOyllID0gZS5yZXBsYWNlKGMsIFwiL1wiKTtcclxuXHRcdHJldHVybiBlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnKGIsIGMpIHtcclxuXHRcdHZhciBkID0gYS5nZXQoYikgfHwgaSh7ZmlsZW5hbWU6IGIsIG5hbWU6IFwiUmVuZGVyIEVycm9yXCIsIG1lc3NhZ2U6IFwiVGVtcGxhdGUgbm90IGZvdW5kXCJ9KTtcclxuXHRcdHJldHVybiBjID8gZChjKSA6IGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGgoYSwgYikge1xyXG5cdFx0aWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGIpIHtcclxuXHRcdFx0dmFyIGMgPSBiO1xyXG5cdFx0XHRiID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgayhjKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR2YXIgZCA9IGpbYV0gPSBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgYihjLCBhKSArIFwiXCJcclxuXHRcdFx0fSBjYXRjaCAoZCkge1xyXG5cdFx0XHRcdHJldHVybiBpKGQpKClcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBkLnByb3RvdHlwZSA9IGIucHJvdG90eXBlID0gbiwgZC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGIgKyBcIlwiXHJcblx0XHR9LCBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpKGEpIHtcclxuXHRcdHZhciBiID0gXCJ7VGVtcGxhdGUgRXJyb3J9XCIsIGMgPSBhLnN0YWNrIHx8IFwiXCI7XHJcblx0XHRpZiAoYyljID0gYy5zcGxpdChcIlxcblwiKS5zbGljZSgwLCAyKS5qb2luKFwiXFxuXCIpOyBlbHNlIGZvciAodmFyIGQgaW4gYSljICs9IFwiPFwiICsgZCArIFwiPlxcblwiICsgYVtkXSArIFwiXFxuXFxuXCI7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJvYmplY3RcIiA9PSB0eXBlb2YgY29uc29sZSAmJiBjb25zb2xlLmVycm9yKGIgKyBcIlxcblxcblwiICsgYyksIGJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBqID0gYS5jYWNoZSA9IHt9LCBrID0gdGhpcy5TdHJpbmcsIGwgPSB7XHJcblx0XHRcIjxcIjogXCImIzYwO1wiLFxyXG5cdFx0XCI+XCI6IFwiJiM2MjtcIixcclxuXHRcdCdcIic6IFwiJiMzNDtcIixcclxuXHRcdFwiJ1wiOiBcIiYjMzk7XCIsXHJcblx0XHRcIiZcIjogXCImIzM4O1wiXHJcblx0fSwgbSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGEpIHtcclxuXHRcdFx0cmV0dXJuIFwiW29iamVjdCBBcnJheV1cIiA9PT0ge30udG9TdHJpbmcuY2FsbChhKVxyXG5cdFx0fSwgbiA9IGEudXRpbHMgPSB7XHJcblx0XHQkaGVscGVyczoge30sICRpbmNsdWRlOiBmdW5jdGlvbiAoYSwgYiwgYykge1xyXG5cdFx0XHRyZXR1cm4gYSA9IGYoYywgYSksIGcoYSwgYilcclxuXHRcdH0sICRzdHJpbmc6IGIsICRlc2NhcGU6IGQsICRlYWNoOiBlXHJcblx0fSwgbyA9IGEuaGVscGVycyA9IG4uJGhlbHBlcnM7XHJcblx0YS5nZXQgPSBmdW5jdGlvbiAoYSkge1xyXG5cdFx0cmV0dXJuIGpbYS5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIildXHJcblx0fSwgYS5oZWxwZXIgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0b1thXSA9IGJcclxuXHR9LCBtb2R1bGUuZXhwb3J0cyA9IGFcclxufSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDkgMTAgMTIgMTMgMTQgMTUgMTYgMTggMTlcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCAxMCAxMiAxMyAxNCAxNSAxNiAxOCAxOVxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCAxMCAxMiAxMyAxNCAxNSAxNiAxOCAxOVxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8yMC5cclxuICovXHJcbnJlcXVpcmUoJy4vY3NzL21vY2stc2VsZWN0LmNzcycpO1xyXG52YXIgc2VsZWN0VHBsID0gcmVxdWlyZSgnbW9jay1zZWxlY3QtdHBsJyk7XHJcbnZhciBzZWxlY3RVbFRwbCA9IHJlcXVpcmUoJ3NlbGVjdC11bC10cGwnKTtcclxuXHJcbmZ1bmN0aW9uIG1vY2tTZWxlY3QoZG9tLCBkYXRhLCBjYWxsYmFja0lkLCBjYWxsYmFjaywgaWQsIGNhbGxCYWNrRmxhZyl7XHJcbiAgICB0aGlzLmRvbSA9ICQoXCIuXCIgKyBkb20pO1xyXG4gICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XHJcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB0aGlzLmlkID0gJChcIiNcIiArIGlkKTtcclxuICAgIHRoaXMuY2FsbEJhY2tGbGFnID0gY2FsbEJhY2tGbGFnO1xyXG4gICAgdGhpcy5pbml0RG9tKCk7XHJcbiAgICB0aGlzLmluaXRCdG5zKCk7XHJcbn1cclxubW9ja1NlbGVjdC5wcm90b3R5cGUgPSB7XHJcbiAgICBpbml0RG9tOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZG9tLmh0bWwoc2VsZWN0VHBsKHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIHRoaXMuaWQuaHRtbChzZWxlY3RVbFRwbCh0aGlzLmRhdGEpKTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrSWQodGhpcy5kb20uZmluZChcIi5uYW1lXCIpLmF0dHIoJ2RhdGEtaWQnKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbEJhY2tGbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEJhY2tGbGFnKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5kb20ub2Zmc2V0KCk7XHJcbiAgICAgICAgdGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuY3NzKHtcclxuICAgICAgICAgICAgJ2xlZnQnOiAwLFxyXG4gICAgICAgICAgICAndG9wJzogb2Zmc2V0LnRvcCArIDQyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuY3NzKHtcclxuICAgICAgICAgICAgJ21heC1oZWlnaHQnOiAkKHdpbmRvdykuaGVpZ2h0KCkgLSBvZmZzZXQuaGVpZ2h0IC0gb2Zmc2V0LnRvcFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGluaXRCdG5zOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8v54K55Ye75pi+56S65LiL5ouJXHJcbiAgICAgICAgdmFyIHRUaGlzPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZG9tLmRlbGVnYXRlKCcubmFtZS13cmFwJywgJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRUaGlzLmRvbSk7XHJcbiAgICAgICAgICAgIGlmICghKHRUaGlzLmRvbS5maW5kKCcubmFtZS13cmFwJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSkge1xyXG4gICAgICAgICAgICAgICAgJChcIi5tb2NrLXNlbGVjdFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmluZChcIi5uYW1lLXdyYXBcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5tb2NrLXVsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuZG9tLmZpbmQoXCIubW9jay1zZWxlY3RcIikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIubW9jay11bFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vY2stc2VsZWN0XCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5maW5kKFwiLm5hbWUtd3JhcFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmRvbS5maW5kKFwiLm1vY2stc2VsZWN0XCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+S4i+aLiea2iOWksVxyXG4gICAgICAgIHRoaXMuaWQuZGVsZWdhdGUoJ2xpJywgJ3RvdWNoZW5kJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdFRoaXMuaWQuZmluZChcImxpLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImFjdGl2ZVwiKS5maW5kKFwiLnJpZ2h0XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheS1ub25lXCIpO1xyXG4gICAgICAgICAgICB0VGhpcy5kb20uZmluZCgnLm5hbWUtd3JhcCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5maW5kKFwiLm5hbWVcIikuaHRtbCgkKHRoaXMpLmZpbmQoXCIuaXRlbS1uYW1lXCIpLmh0bWwoKSkuYXR0cihcImRhdGEtaWRcIiwgJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKSk7XHJcbiAgICAgICAgICAgIHRUaGlzLmRvbS5maW5kKFwiLm1vY2stc2VsZWN0XCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgdFRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgdFRoaXMuY2FsbGJhY2tJZCh0VGhpcy5kb20uZmluZChcIi5uYW1lXCIpLmF0dHIoJ2RhdGEtaWQnKSk7XHJcbiAgICAgICAgICAgIGlmICh0VGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbSwgZGF0YSwgY2FsbGJhY2tJZCwgY2FsbGJhY2ssIGlkLCBjYWxsQmFja0ZsYWcpe1xyXG4gICAgLyoqXHJcbiAgICAgKiAqIOaooeaLn+S4i+aLieahhue7hOS7tlxyXG4gICAgICog5ou/5YiwaWRcclxuICAgICAqIEBwYXJhbSBkb20gICAgICAg5LiL5ouJ5qGG54i257qnY2xhc3NcclxuICAgICAqIEBwYXJhbSBkYXRhICAgICAg5LiL5ouJ5pWw5o2u77yI5aSE55CG6L+H55qE5qC85byP5Li6e2RhdGE6IFt7aWQ6JycsbmFtZTonJ30se30se31dfe+8iSzlj6blpJbms6jmhI9vcmRlck51bSA+IDAgPyArb3JkZXJOdW0gOiAnJ1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrSWQgICAgICDpgJrov4flm57osIPkvKDnu5nkuKrkurrpobXpnaLpnIDopoHnmoRpZFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrICAgICAgICDkuKrkurrpobXpnaLnmoTlm57osIPlpITnkIZcclxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAg5a2Y5pS+5LiL5ouJ6YCJ6aG555qEaWRcclxuICAgICAqIEBwYXJhbSBjYWxsQmFja0ZsYWfvvIjpnZ7lv4XkvKDvvIkgIOWRiuiviemhtemdouaooeadv+a4suafk+WujOS6huacieS6hmlk562J5Y+C5pWwIOWPr+S7pea4suafk+S4quS6uumhtemdouS6hlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gbmV3IG1vY2tTZWxlY3QoZG9tLCBkYXRhLCBjYWxsYmFja0lkLCBjYWxsYmFjaywgaWQsIGNhbGxCYWNrRmxhZyk7XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvbW9jay1zZWxlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgMTAgMTMgMTYgMTlcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL21vY2stc2VsZWN0LmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9tb2NrLXNlbGVjdC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9tb2NrLXNlbGVjdC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2Nzcy9tb2NrLXNlbGVjdC5jc3NcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgMTAgMTMgMTYgMTlcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi5tb2NrLXNlbGVjdHtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDQycHg7XFxyXFxuICAgIGhlaWdodDogNDJweDtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBib3JkZXI6bm9uZTtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5uYW1lLXdyYXAuYWN0aXZle1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcclxcbn1cXHJcXG4ubW9jay11bHtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcclxcbiAgICB6LWluZGV4OiAxMDA7XFxyXFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZDlkOWQ5O1xcclxcbiAgICB3aWR0aDogOTMuNiU7XFxyXFxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5uYW1lLXdyYXB7XFxyXFxuICAgIGNvbG9yOiAjZmZmO1xcclxcbiAgICBoZWlnaHQ6IDQycHg7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAuYmd7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXHJcXG4gICAgaGVpZ2h0OiA2cHg7XFxyXFxuICAgIHdpZHRoOiAxM3B4O1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcCAuYmd7XFxyXFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIHJlcXVpcmUoXCIuLi9pbWcvYXJyb3ctYm90dG9tLnBuZ1wiKSArIFwiKSBjZW50ZXIgY2VudGVyIG5vLXJlcGVhdDtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5uYW1lLXdyYXAuYWN0aXZle1xcclxcbiAgICBjb2xvcjogIzAwZDUzNTtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5uYW1lLXdyYXAuYWN0aXZlIC5iZyB7XFxyXFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIHJlcXVpcmUoXCIuLi9pbWcvYXJyb3ctdG9wLnBuZ1wiKSArIFwiKSBjZW50ZXIgY2VudGVyIG5vLXJlcGVhdDtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGl7XFxyXFxuICAgIG1hcmdpbjowO1xcclxcbiAgICBjb2xvcjogIzMzMzMzMztcXHJcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXHJcXG4gICAgaGVpZ2h0OiA0MnB4O1xcclxcbiAgICBsaW5lLWhlaWdodDogNDJweDtcXHJcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkOWQ5ZDk7XFxyXFxufVxcclxcbi5tb2NrLXVsIGxpIC5yaWdodHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgZmxvYXQ6IHJpZ2h0O1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDFyZW07XFxyXFxufVxcclxcbi5tb2NrLXVsIGxpLmFjdGl2ZSAucmlnaHR7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZTtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGkuYWN0aXZle1xcclxcbiAgICBjb2xvcjogIzAwZDUzNTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvY3NzL21vY2stc2VsZWN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCAxMCAxMyAxNiAxOVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUEwQUFBQUdDQVlBQUFBWUxCUy9BQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQTRKcFZGaDBXRTFNT21OdmJTNWhaRzlpWlM1NGJYQUFBQUFBQUR3L2VIQmhZMnRsZENCaVpXZHBiajBpNzd1L0lpQnBaRDBpVnpWTk1FMXdRMlZvYVVoNmNtVlRlazVVWTNwcll6bGtJajgrSUR4NE9uaHRjRzFsZEdFZ2VHMXNibk02ZUQwaVlXUnZZbVU2Ym5NNmJXVjBZUzhpSUhnNmVHMXdkR3M5SWtGa2IySmxJRmhOVUNCRGIzSmxJRFV1TXkxak1ERXhJRFkyTGpFME5UWTJNU3dnTWpBeE1pOHdNaTh3TmkweE5EbzFOam95TnlBZ0lDQWdJQ0FnSWo0Z1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNGdQSEprWmpwRVpYTmpjbWx3ZEdsdmJpQnlaR1k2WVdKdmRYUTlJaUlnZUcxc2JuTTZlRzF3VFUwOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOXRiUzhpSUhodGJHNXpPbk4wVW1WbVBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZjMVI1Y0dVdlVtVnpiM1Z5WTJWU1pXWWpJaUI0Yld4dWN6cDRiWEE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM4aUlIaHRjRTFOT2s5eWFXZHBibUZzUkc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRwaFlXTmhNemd5WkMwM1pUZG1MVFJsTURNdFlXUXdNeTFsWVRKa1kyVXhOakZoTVdRaUlIaHRjRTFOT2tSdlkzVnRaVzUwU1VROUluaHRjQzVrYVdRNk1UWXdRa1E0UmpneU1FSTJNVEZGTmprNFFqQkdNekZGTmtOR1FUZ3hNRE1pSUhodGNFMU5Pa2x1YzNSaGJtTmxTVVE5SW5odGNDNXBhV1E2TVRZd1FrUTRSamN5TUVJMk1URkZOams0UWpCR016RkZOa05HUVRneE1ETWlJSGh0Y0RwRGNtVmhkRzl5Vkc5dmJEMGlRV1J2WW1VZ1VHaHZkRzl6YUc5d0lFTkRJREl3TVRVZ0tFMWhZMmx1ZEc5emFDa2lQaUE4ZUcxd1RVMDZSR1Z5YVhabFpFWnliMjBnYzNSU1pXWTZhVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRG93TmpreE1rTkRSVGxCTWpCRk5qRXhPRVpDUXpnNFF6SXhOMFF5UlVKR09TSWdjM1JTWldZNlpHOWpkVzFsYm5SSlJEMGlZV1J2WW1VNlpHOWphV1E2Y0dodmRHOXphRzl3T21ZeFl6azVNamd4TFRNNE5XRXRNVEUzT1MxaE16VmlMVGt6TlRVMlpUY3lNakppTlNJdlBpQThMM0prWmpwRVpYTmpjbWx3ZEdsdmJqNGdQQzl5WkdZNlVrUkdQaUE4TDNnNmVHMXdiV1YwWVQ0Z1BEOTRjR0ZqYTJWMElHVnVaRDBpY2lJL1BoZUhlNThBQUFCVlNVUkJWSGphWXZqLy83OE9FTi83RHdHZjhPRC9VSFU2REVBQ2hFMlJKSENCVDFCMUREQk5JQ3dNeEJkd2FMZ0FsV2RBMXdUQ1hFQjhHRTNEWWFnNEF5NU5NTHdOcW1FYk5ubGNta0E0QzVjY1FJQUJBUEdpQzBwc2k5YkZBQUFBQUVsRlRrU3VRbUNDXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9pbWcvYXJyb3ctYm90dG9tLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCAxMCAxMyAxNiAxOVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUEwQUFBQUdDQVlBQUFBWUxCUy9BQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQTRKcFZGaDBXRTFNT21OdmJTNWhaRzlpWlM1NGJYQUFBQUFBQUR3L2VIQmhZMnRsZENCaVpXZHBiajBpNzd1L0lpQnBaRDBpVnpWTk1FMXdRMlZvYVVoNmNtVlRlazVVWTNwcll6bGtJajgrSUR4NE9uaHRjRzFsZEdFZ2VHMXNibk02ZUQwaVlXUnZZbVU2Ym5NNmJXVjBZUzhpSUhnNmVHMXdkR3M5SWtGa2IySmxJRmhOVUNCRGIzSmxJRFV1TXkxak1ERXhJRFkyTGpFME5UWTJNU3dnTWpBeE1pOHdNaTh3TmkweE5EbzFOam95TnlBZ0lDQWdJQ0FnSWo0Z1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNGdQSEprWmpwRVpYTmpjbWx3ZEdsdmJpQnlaR1k2WVdKdmRYUTlJaUlnZUcxc2JuTTZlRzF3VFUwOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOXRiUzhpSUhodGJHNXpPbk4wVW1WbVBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZjMVI1Y0dVdlVtVnpiM1Z5WTJWU1pXWWpJaUI0Yld4dWN6cDRiWEE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM4aUlIaHRjRTFOT2s5eWFXZHBibUZzUkc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRwaFlXTmhNemd5WkMwM1pUZG1MVFJsTURNdFlXUXdNeTFsWVRKa1kyVXhOakZoTVdRaUlIaHRjRTFOT2tSdlkzVnRaVzUwU1VROUluaHRjQzVrYVdRNk1FRkJOVVF5UlRZeU1FSTJNVEZGTmpnME9VWkROalkxUkRkRk1VTkZNRUlpSUhodGNFMU5Pa2x1YzNSaGJtTmxTVVE5SW5odGNDNXBhV1E2TUVGQk5VUXlSVFV5TUVJMk1URkZOamcwT1VaRE5qWTFSRGRGTVVORk1FSWlJSGh0Y0RwRGNtVmhkRzl5Vkc5dmJEMGlRV1J2WW1VZ1VHaHZkRzl6YUc5d0lFTkRJREl3TVRVZ0tFMWhZMmx1ZEc5emFDa2lQaUE4ZUcxd1RVMDZSR1Z5YVhabFpFWnliMjBnYzNSU1pXWTZhVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRG93TmpreE1rTkRSVGxCTWpCRk5qRXhPRVpDUXpnNFF6SXhOMFF5UlVKR09TSWdjM1JTWldZNlpHOWpkVzFsYm5SSlJEMGlZV1J2WW1VNlpHOWphV1E2Y0dodmRHOXphRzl3T21ZeFl6azVNamd4TFRNNE5XRXRNVEUzT1MxaE16VmlMVGt6TlRVMlpUY3lNakppTlNJdlBpQThMM0prWmpwRVpYTmpjbWx3ZEdsdmJqNGdQQzl5WkdZNlVrUkdQaUE4TDNnNmVHMXdiV1YwWVQ0Z1BEOTRjR0ZqYTJWMElHVnVaRDBpY2lJL1BtbHA5NDRBQUFDZVNVUkJWSGphWXZqLy83OE9FTi83RHdHZlFEampXZnN2RUlieG9mZy9WSjBPQThOVlV3WWd3eFFtMGZocTluK2dHQmlEMkVqZ0UxUWRBMWdUVktOdzZZdEp6MkVhWUxqcDFSeVFoZ3NnZWFnNkJrYXdKZ2lvQitJR0JpeUFpNG1qOWR1L0h6VWc5bit0VXd3c1VQRitJQzVnd0FHQUdxcUJGRGNRRjRMNElFMzVVQTNmZ2ZnUFRDRXJJd3ZyNy85L2ZrTzVMRkExRDRCNElrQ0FBUURXRVl0TEhLdmRJd0FBQUFCSlJVNUVya0pnZ2c9PVwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LXRvcC5wbmdcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgMTAgMTMgMTYgMTlcbiAqKi8iLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvbW9jay1zZWxlY3QtdHBsJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsZGF0YT0kZGF0YS5kYXRhLCRvdXQ9Jyc7JG91dCs9JzxkaXYgY2xhc3M9XCJtb2NrLXNlbGVjdCBmb250LXNpemUxNlwiPiA8ZGl2IGNsYXNzPVwibmFtZS13cmFwXCI+IDxzcGFuIGNsYXNzPVwibmFtZVwiIGRhdGEtaWQ9XCInO1xuJG91dCs9JGVzY2FwZShkYXRhWzBdLmlkKTtcbiRvdXQrPSdcIj4nO1xuJG91dCs9JGVzY2FwZShkYXRhWzBdLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJiZ1wiPjwvc3Bhbj4gPC9kaXY+IDwvZGl2Pic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9tb2NrLXNlbGVjdC10cGwudHBsXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDEwIDEzIDE2IDE5XG4gKiovIiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvdHBsL3NlbGVjdC11bC10cGwnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVhY2g9JHV0aWxzLiRlYWNoLGRhdGE9JGRhdGEuZGF0YSwkdmFsdWU9JGRhdGEuJHZhbHVlLCRpbmRleD0kZGF0YS4kaW5kZXgsJGVzY2FwZT0kdXRpbHMuJGVzY2FwZSwkb3V0PScnOyRvdXQrPSc8dWwgY2xhc3M9XCJtb2NrLXVsIGJveC1wYWRkaW5nIGRpc3BsYXktbm9uZVwiPiAnO1xuJGVhY2goZGF0YSxmdW5jdGlvbigkdmFsdWUsJGluZGV4KXtcbiRvdXQrPScgJztcbmlmKCRpbmRleCA9PSAwKXtcbiRvdXQrPScgPGxpIHN0eWxlPVwiYm9yZGVyOm5vbmU7XCIgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5pZCk7XG4kb3V0Kz0nXCI+IDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJyaWdodFwiPuKImjwvc3Bhbj4gPC9saT4gJztcbn1lbHNle1xuJG91dCs9JyA8bGkgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5pZCk7XG4kb3V0Kz0nXCI+IDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJyaWdodFwiPuKImjwvc3Bhbj4gPC9saT4gJztcbn1cbiRvdXQrPScgJztcbn0pO1xuJG91dCs9JyA8L3VsPic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9zZWxlY3QtdWwtdHBsLnRwbFxuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCAxMCAxMyAxNiAxOVxuICoqLyIsIi8qISBtb2NranMgMjMtMDYtMjAxNCAxNTo1NzozNyAqL1xyXG4vKiEgc3JjL21vY2stcHJlZml4LmpzICovXHJcbi8qIVxyXG4gICAgTW9jayAtIOaooeaLn+ivt+axgiAmIOaooeaLn+aVsOaNrlxyXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL251eXNvZnQvTW9ja1xyXG4gICAg5aKo5pm6IG1vemhpLmd5eUB0YW9iYW8uY29tIG51eXNvZnRAZ21haWwuY29tXHJcbiovXHJcbihmdW5jdGlvbih1bmRlZmluZWQpIHtcclxuICAgIHZhciBNb2NrID0ge1xyXG4gICAgICAgIHZlcnNpb246IFwiMC4xLjVcIixcclxuICAgICAgICBfbW9ja2VkOiB7fVxyXG4gICAgfTtcclxuICAgIC8qISBzcmMvdXRpbC5qcyAqL1xyXG4gICAgdmFyIFV0aWwgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgVXRpbCA9IHt9O1xyXG4gICAgICAgIFV0aWwuZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kKCkge1xyXG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gYXJndW1lbnRzWzBdIHx8IHt9LCBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCwgb3B0aW9ucywgbmFtZSwgc3JjLCBjb3B5LCBjbG9uZTtcclxuICAgICAgICAgICAgaWYgKGxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0ID0gdGhpcztcclxuICAgICAgICAgICAgICAgIGkgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoO2kgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgICAgIGlmICghb3B0aW9ucykgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBmb3IgKG5hbWUgaW4gb3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNyYyA9IHRhcmdldFtuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICBjb3B5ID0gb3B0aW9uc1tuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBjb3B5KSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29weSA9PT0gdW5kZWZpbmVkKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc0FycmF5KGNvcHkpIHx8IFV0aWwuaXNPYmplY3QoY29weSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNBcnJheShjb3B5KSkgY2xvbmUgPSBzcmMgJiYgVXRpbC5pc0FycmF5KHNyYykgPyBzcmMgOiBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNPYmplY3QoY29weSkpIGNsb25lID0gc3JjICYmIFV0aWwuaXNPYmplY3Qoc3JjKSA/IHNyYyA6IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBVdGlsLmV4dGVuZChjbG9uZSwgY29weSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gY29weTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWwuZWFjaCA9IGZ1bmN0aW9uIGVhY2gob2JqLCBpdGVyYXRvciwgY29udGV4dCkge1xyXG4gICAgICAgICAgICB2YXIgaSwga2V5O1xyXG4gICAgICAgICAgICBpZiAodGhpcy50eXBlKG9iaikgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvYmo7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yKGksIGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9iai5sZW5ndGggPT09ICtvYmoubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2ldLCBpLCBvYmopID09PSBmYWxzZSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopID09PSBmYWxzZSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWwudHlwZSA9IGZ1bmN0aW9uIHR5cGUob2JqKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQgPyBTdHJpbmcob2JqKSA6IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopLm1hdGNoKC9cXFtvYmplY3QgKFxcdyspXFxdLylbMV0udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWwuZWFjaChcIlN0cmluZyBPYmplY3QgQXJyYXkgUmVnRXhwIEZ1bmN0aW9uXCIuc3BsaXQoXCIgXCIpLCBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICBVdGlsW1wiaXNcIiArIHZhbHVlXSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWwudHlwZShvYmopID09PSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFV0aWwuaXNPYmplY3RPckFycmF5ID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFV0aWwuaXNPYmplY3QodmFsdWUpIHx8IFV0aWwuaXNBcnJheSh2YWx1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLmlzTnVtZXJpYyA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICYmIGlzRmluaXRlKHZhbHVlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWwua2V5cyA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICB2YXIga2V5cyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIGtleXMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBrZXlzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXRpbC52YWx1ZXMgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGtleSkpIHZhbHVlcy5wdXNoKG9ialtrZXldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXRpbC5oZXJlZG9jID0gZnVuY3Rpb24gaGVyZWRvYyhmbikge1xyXG4gICAgICAgICAgICByZXR1cm4gZm4udG9TdHJpbmcoKS5yZXBsYWNlKC9eW15cXC9dK1xcL1xcKiE/LywgXCJcIikucmVwbGFjZSgvXFwqXFwvW15cXC9dKyQvLCBcIlwiKS5yZXBsYWNlKC9eW1xcc1xceEEwXSsvLCBcIlwiKS5yZXBsYWNlKC9bXFxzXFx4QTBdKyQvLCBcIlwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWwubm9vcCA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgICAgcmV0dXJuIFV0aWw7XHJcbiAgICB9KCk7XHJcbiAgICAvKiEgc3JjL3JhbmRvbS5qcyAqL1xyXG4gICAgdmFyIFJhbmRvbSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBSYW5kb20gPSB7XHJcbiAgICAgICAgICAgIGV4dGVuZDogVXRpbC5leHRlbmRcclxuICAgICAgICB9O1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBcImJvb2xlYW5cIjogZnVuY3Rpb24obWluLCBtYXgsIGN1cikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1ciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gdHlwZW9mIG1pbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhaXNOYU4obWluKSA/IHBhcnNlSW50KG1pbiwgMTApIDogMTtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSB0eXBlb2YgbWF4ICE9PSBcInVuZGVmaW5lZFwiICYmICFpc05hTihtYXgpID8gcGFyc2VJbnQobWF4LCAxMCkgOiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID4gMSAvIChtaW4gKyBtYXgpICogbWluID8gIWN1ciA6IGN1cjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID49IC41O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib29sOiBmdW5jdGlvbihtaW4sIG1heCwgY3VyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ib29sZWFuKG1pbiwgbWF4LCBjdXIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYXR1cmFsOiBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgbWluID0gdHlwZW9mIG1pbiAhPT0gXCJ1bmRlZmluZWRcIiA/IHBhcnNlSW50KG1pbiwgMTApIDogMDtcclxuICAgICAgICAgICAgICAgIG1heCA9IHR5cGVvZiBtYXggIT09IFwidW5kZWZpbmVkXCIgPyBwYXJzZUludChtYXgsIDEwKSA6IDkwMDcxOTkyNTQ3NDA5OTI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbnRlZ2VyOiBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgbWluID0gdHlwZW9mIG1pbiAhPT0gXCJ1bmRlZmluZWRcIiA/IHBhcnNlSW50KG1pbiwgMTApIDogLTkwMDcxOTkyNTQ3NDA5OTI7XHJcbiAgICAgICAgICAgICAgICBtYXggPSB0eXBlb2YgbWF4ICE9PSBcInVuZGVmaW5lZFwiID8gcGFyc2VJbnQobWF4LCAxMCkgOiA5MDA3MTk5MjU0NzQwOTkyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJpbnRcIjogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmludGVnZXIobWluLCBtYXgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImZsb2F0XCI6IGZ1bmN0aW9uKG1pbiwgbWF4LCBkbWluLCBkbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBkbWluID0gZG1pbiA9PT0gdW5kZWZpbmVkID8gMCA6IGRtaW47XHJcbiAgICAgICAgICAgICAgICBkbWluID0gTWF0aC5tYXgoTWF0aC5taW4oZG1pbiwgMTcpLCAwKTtcclxuICAgICAgICAgICAgICAgIGRtYXggPSBkbWF4ID09PSB1bmRlZmluZWQgPyAxNyA6IGRtYXg7XHJcbiAgICAgICAgICAgICAgICBkbWF4ID0gTWF0aC5tYXgoTWF0aC5taW4oZG1heCwgMTcpLCAwKTtcclxuICAgICAgICAgICAgICAgIHZhciByZXQgPSB0aGlzLmludGVnZXIobWluLCBtYXgpICsgXCIuXCI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgZGNvdW50ID0gdGhpcy5uYXR1cmFsKGRtaW4sIGRtYXgpOyBpIDwgZGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQgKz0gdGhpcy5jaGFyYWN0ZXIoXCJudW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChyZXQsIDEwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY2hhcmFjdGVyOiBmdW5jdGlvbihwb29sKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9vbHMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG93ZXI6IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIixcclxuICAgICAgICAgICAgICAgICAgICB1cHBlcjogXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWlwiLFxyXG4gICAgICAgICAgICAgICAgICAgIG51bWJlcjogXCIwMTIzNDU2Nzg5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgc3ltYm9sOiBcIiFAIyQlXiYqKClbXVwiXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcG9vbHMuYWxwaGEgPSBwb29scy5sb3dlciArIHBvb2xzLnVwcGVyO1xyXG4gICAgICAgICAgICAgICAgcG9vbHNbXCJ1bmRlZmluZWRcIl0gPSBwb29scy5sb3dlciArIHBvb2xzLnVwcGVyICsgcG9vbHMubnVtYmVyICsgcG9vbHMuc3ltYm9sO1xyXG4gICAgICAgICAgICAgICAgcG9vbCA9IHBvb2xzWyhcIlwiICsgcG9vbCkudG9Mb3dlckNhc2UoKV0gfHwgcG9vbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb29sLmNoYXJBdChSYW5kb20ubmF0dXJhbCgwLCBwb29sLmxlbmd0aCAtIDEpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjaGFyXCI6IGZ1bmN0aW9uKHBvb2wpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3Rlcihwb29sKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RyaW5nOiBmdW5jdGlvbihwb29sLCBtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gUmFuZG9tLm5hdHVyYWwobWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1swXSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBtaW47XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gUmFuZG9tLm5hdHVyYWwocG9vbCwgbWluKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9vbCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IHBvb2w7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9vbCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gUmFuZG9tLm5hdHVyYWwoMywgNyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBSYW5kb20uY2hhcmFjdGVyKHBvb2wpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0cjogZnVuY3Rpb24ocG9vbCwgbWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0cmluZyhwb29sLCBtaW4sIG1heCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJhbmdlOiBmdW5jdGlvbihzdGFydCwgc3RvcCwgc3RlcCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPD0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b3AgPSBzdGFydCB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0ZXAgPSBhcmd1bWVudHNbMl0gfHwgMTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gK3N0YXJ0LCBzdG9wID0gK3N0b3AsIHN0ZXAgPSArc3RlcDtcclxuICAgICAgICAgICAgICAgIHZhciBsZW4gPSBNYXRoLm1heChNYXRoLmNlaWwoKHN0b3AgLSBzdGFydCkgLyBzdGVwKSwgMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWR4ID0gMDtcclxuICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IG5ldyBBcnJheShsZW4pO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlW2lkeCsrXSA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0ICs9IHN0ZXA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgcGF0dGVybkxldHRlcnM6IHtcclxuICAgICAgICAgICAgICAgIHl5eXk6IFwiZ2V0RnVsbFllYXJcIixcclxuICAgICAgICAgICAgICAgIHl5OiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcIlwiICsgZGF0ZS5nZXRGdWxsWWVhcigpKS5zbGljZSgyKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB5OiBcInl5XCIsXHJcbiAgICAgICAgICAgICAgICBNTTogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtID0gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbSA8IDEwID8gXCIwXCIgKyBtIDogbTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBNOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZGQ6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkIDwgMTAgPyBcIjBcIiArIGQgOiBkO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGQ6IFwiZ2V0RGF0ZVwiLFxyXG4gICAgICAgICAgICAgICAgSEg6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaCA8IDEwID8gXCIwXCIgKyBoIDogaDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBIOiBcImdldEhvdXJzXCIsXHJcbiAgICAgICAgICAgICAgICBoaDogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoID0gZGF0ZS5nZXRIb3VycygpICUgMTI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGggPCAxMCA/IFwiMFwiICsgaCA6IGg7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgaDogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgJSAxMjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtbTogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtID0gZGF0ZS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0gPCAxMCA/IFwiMFwiICsgbSA6IG07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbTogXCJnZXRNaW51dGVzXCIsXHJcbiAgICAgICAgICAgICAgICBzczogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzID0gZGF0ZS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHMgPCAxMCA/IFwiMFwiICsgcyA6IHM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgczogXCJnZXRTZWNvbmRzXCIsXHJcbiAgICAgICAgICAgICAgICBTUzogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtcyA9IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1zIDwgMTAgJiYgXCIwMFwiICsgbXMgfHwgbXMgPCAxMDAgJiYgXCIwXCIgKyBtcyB8fCBtcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBTOiBcImdldE1pbGxpc2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgQTogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgPCAxMiA/IFwiQU1cIiA6IFwiUE1cIjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBhOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKSA8IDEyID8gXCJhbVwiIDogXCJwbVwiO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFQ6IFwiZ2V0VGltZVwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgcmZvcm1hdDogbmV3IFJlZ0V4cChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBSYW5kb20ucGF0dGVybkxldHRlcnMpIHJlLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIoXCIgKyByZS5qb2luKFwifFwiKSArIFwiKVwiO1xyXG4gICAgICAgICAgICB9KCksIFwiZ1wiKSxcclxuICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbihkYXRlLCBmb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXR0ZXJuTGV0dGVycyA9IFJhbmRvbS5wYXR0ZXJuTGV0dGVycywgcmZvcm1hdCA9IFJhbmRvbS5yZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdC5yZXBsYWNlKHJmb3JtYXQsIGZ1bmN0aW9uKCQwLCBmbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXR0ZXJuTGV0dGVyc1tmbGFnXSA9PT0gXCJmdW5jdGlvblwiID8gcGF0dGVybkxldHRlcnNbZmxhZ10oZGF0ZSkgOiBwYXR0ZXJuTGV0dGVyc1tmbGFnXSBpbiBwYXR0ZXJuTGV0dGVycyA/IGFyZ3VtZW50cy5jYWxsZWUoJDAsIHBhdHRlcm5MZXR0ZXJzW2ZsYWddKSA6IGRhdGVbcGF0dGVybkxldHRlcnNbZmxhZ11dKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmFuZG9tRGF0ZTogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IG1pbiA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUoMCkgOiBtaW47XHJcbiAgICAgICAgICAgICAgICBtYXggPSBtYXggPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKCkgOiBtYXg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoTWF0aC5yYW5kb20oKSAqIChtYXguZ2V0VGltZSgpIC0gbWluLmdldFRpbWUoKSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRlOiBmdW5jdGlvbihmb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCBcInl5eXktTU0tZGRcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLnJhbmRvbURhdGUoKSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGltZTogZnVuY3Rpb24oZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgXCJISDptbTpzc1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMucmFuZG9tRGF0ZSgpLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRldGltZTogZnVuY3Rpb24oZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgXCJ5eXl5LU1NLWRkIEhIOm1tOnNzXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5yYW5kb21EYXRlKCksIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5vdzogZnVuY3Rpb24odW5pdCwgZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghL3llYXJ8bW9udGh8d2Vla3xkYXl8aG91cnxtaW51dGV8c2Vjb25kfHdlZWsvLnRlc3QodW5pdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5pdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdW5pdCA9ICh1bml0IHx8IFwiXCIpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgXCJ5eXl5LU1NLWRkIEhIOm1tOnNzXCI7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcclxuICAgICAgICAgICAgICAgICAgY2FzZSBcInllYXJcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldE1vbnRoKDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgY2FzZSBcIm1vbnRoXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXREYXRlKDEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgY2FzZSBcIndlZWtcIjpcclxuICAgICAgICAgICAgICAgICAgY2FzZSBcImRheVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwiaG91clwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcygwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJtaW51dGVcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldFNlY29uZHMoMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwic2Vjb25kXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcclxuICAgICAgICAgICAgICAgICAgY2FzZSBcIndlZWtcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgLSBkYXRlLmdldERheSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdChkYXRlLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGFkX3NpemU6IFsgXCIzMDB4MjUwXCIsIFwiMjUweDI1MFwiLCBcIjI0MHg0MDBcIiwgXCIzMzZ4MjgwXCIsIFwiMTgweDE1MFwiLCBcIjcyMHgzMDBcIiwgXCI0Njh4NjBcIiwgXCIyMzR4NjBcIiwgXCI4OHgzMVwiLCBcIjEyMHg5MFwiLCBcIjEyMHg2MFwiLCBcIjEyMHgyNDBcIiwgXCIxMjV4MTI1XCIsIFwiNzI4eDkwXCIsIFwiMTYweDYwMFwiLCBcIjEyMHg2MDBcIiwgXCIzMDB4NjAwXCIgXSxcclxuICAgICAgICAgICAgc2NyZWVuX3NpemU6IFsgXCIzMjB4MjAwXCIsIFwiMzIweDI0MFwiLCBcIjY0MHg0ODBcIiwgXCI4MDB4NDgwXCIsIFwiODAweDQ4MFwiLCBcIjEwMjR4NjAwXCIsIFwiMTAyNHg3NjhcIiwgXCIxMjgweDgwMFwiLCBcIjE0NDB4OTAwXCIsIFwiMTkyMHgxMjAwXCIsIFwiMjU2MHgxNjAwXCIgXSxcclxuICAgICAgICAgICAgdmlkZW9fc2l6ZTogWyBcIjcyMHg0ODBcIiwgXCI3Njh4NTc2XCIsIFwiMTI4MHg3MjBcIiwgXCIxOTIweDEwODBcIiBdLFxyXG4gICAgICAgICAgICBpbWFnZTogZnVuY3Rpb24oc2l6ZSwgYmFja2dyb3VuZCwgZm9yZWdyb3VuZCwgZm9ybWF0LCB0ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBmb3JtYXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybWF0ID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZm9yZWdyb3VuZDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JlZ3JvdW5kID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFzaXplKSBzaXplID0gdGhpcy5waWNrKHRoaXMuYWRfc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFja2dyb3VuZCAmJiB+YmFja2dyb3VuZC5pbmRleE9mKFwiI1wiKSkgYmFja2dyb3VuZCA9IGJhY2tncm91bmQuc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm9yZWdyb3VuZCAmJiB+Zm9yZWdyb3VuZC5pbmRleE9mKFwiI1wiKSkgZm9yZWdyb3VuZCA9IGZvcmVncm91bmQuc2xpY2UoMSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJodHRwOi8vZHVtbXlpbWFnZS5jb20vXCIgKyBzaXplICsgKGJhY2tncm91bmQgPyBcIi9cIiArIGJhY2tncm91bmQgOiBcIlwiKSArIChmb3JlZ3JvdW5kID8gXCIvXCIgKyBmb3JlZ3JvdW5kIDogXCJcIikgKyAoZm9ybWF0ID8gXCIuXCIgKyBmb3JtYXQgOiBcIlwiKSArICh0ZXh0ID8gXCImdGV4dD1cIiArIHRleHQgOiBcIlwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW1nOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmltYWdlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgYnJhbmRDb2xvcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiNG9ybWF0XCI6IFwiI2ZiMGEyYVwiLFxyXG4gICAgICAgICAgICAgICAgXCI1MDBweFwiOiBcIiMwMmFkZWFcIixcclxuICAgICAgICAgICAgICAgIFwiQWJvdXQubWUgKGJsdWUpXCI6IFwiIzAwNDA1ZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJBYm91dC5tZSAoeWVsbG93KVwiOiBcIiNmZmNjMzNcIixcclxuICAgICAgICAgICAgICAgIEFkZHZvY2F0ZTogXCIjZmY2MTM4XCIsXHJcbiAgICAgICAgICAgICAgICBBZG9iZTogXCIjZmYwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBBaW06IFwiI2ZjZDIwYlwiLFxyXG4gICAgICAgICAgICAgICAgQW1hem9uOiBcIiNlNDc5MTFcIixcclxuICAgICAgICAgICAgICAgIEFuZHJvaWQ6IFwiI2E0YzYzOVwiLFxyXG4gICAgICAgICAgICAgICAgXCJBbmdpZSdzIExpc3RcIjogXCIjN2ZiYjAwXCIsXHJcbiAgICAgICAgICAgICAgICBBT0w6IFwiIzAwNjBhM1wiLFxyXG4gICAgICAgICAgICAgICAgQXRsYXNzaWFuOiBcIiMwMDMzNjZcIixcclxuICAgICAgICAgICAgICAgIEJlaGFuY2U6IFwiIzA1M2VmZlwiLFxyXG4gICAgICAgICAgICAgICAgXCJCaWcgQ2FydGVsXCI6IFwiIzk3YjUzOFwiLFxyXG4gICAgICAgICAgICAgICAgYml0bHk6IFwiI2VlNjEyM1wiLFxyXG4gICAgICAgICAgICAgICAgQmxvZ2dlcjogXCIjZmM0ZjA4XCIsXHJcbiAgICAgICAgICAgICAgICBCb2Vpbmc6IFwiIzAwMzlhNlwiLFxyXG4gICAgICAgICAgICAgICAgXCJCb29raW5nLmNvbVwiOiBcIiMwMDM1ODBcIixcclxuICAgICAgICAgICAgICAgIENhcmJvbm1hZGU6IFwiIzYxMzg1NFwiLFxyXG4gICAgICAgICAgICAgICAgQ2hlZGRhcjogXCIjZmY3MjQzXCIsXHJcbiAgICAgICAgICAgICAgICBcIkNvZGUgU2Nob29sXCI6IFwiIzNkNDk0NFwiLFxyXG4gICAgICAgICAgICAgICAgRGVsaWNpb3VzOiBcIiMyMDVjYzBcIixcclxuICAgICAgICAgICAgICAgIERlbGw6IFwiIzMyODdjMVwiLFxyXG4gICAgICAgICAgICAgICAgRGVzaWdubW9vOiBcIiNlNTRhNGZcIixcclxuICAgICAgICAgICAgICAgIERldmlhbnRhcnQ6IFwiIzRlNjI1MlwiLFxyXG4gICAgICAgICAgICAgICAgXCJEZXNpZ25lciBOZXdzXCI6IFwiIzJkNzJkYVwiLFxyXG4gICAgICAgICAgICAgICAgRGV2b3VyOiBcIiNmZDAwMDFcIixcclxuICAgICAgICAgICAgICAgIERFV0FMVDogXCIjZmViZDE3XCIsXHJcbiAgICAgICAgICAgICAgICBcIkRpc3F1cyAoYmx1ZSlcIjogXCIjNTlhM2ZjXCIsXHJcbiAgICAgICAgICAgICAgICBcIkRpc3F1cyAob3JhbmdlKVwiOiBcIiNkYjcxMzJcIixcclxuICAgICAgICAgICAgICAgIERyaWJiYmxlOiBcIiNlYTRjODlcIixcclxuICAgICAgICAgICAgICAgIERyb3Bib3g6IFwiIzNkOWFlOFwiLFxyXG4gICAgICAgICAgICAgICAgRHJ1cGFsOiBcIiMwYzc2YWJcIixcclxuICAgICAgICAgICAgICAgIER1bmtlZDogXCIjMmEzMjNhXCIsXHJcbiAgICAgICAgICAgICAgICBlQmF5OiBcIiM4OWM1MDdcIixcclxuICAgICAgICAgICAgICAgIEVtYmVyOiBcIiNmMDVlMWJcIixcclxuICAgICAgICAgICAgICAgIEVuZ2FkZ2V0OiBcIiMwMGJkZjZcIixcclxuICAgICAgICAgICAgICAgIEVudmF0bzogXCIjNTI4MDM2XCIsXHJcbiAgICAgICAgICAgICAgICBFdHN5OiBcIiNlYjZkMjBcIixcclxuICAgICAgICAgICAgICAgIEV2ZXJub3RlOiBcIiM1YmE1MjVcIixcclxuICAgICAgICAgICAgICAgIFwiRmFiLmNvbVwiOiBcIiNkZDAwMTdcIixcclxuICAgICAgICAgICAgICAgIEZhY2Vib29rOiBcIiMzYjU5OThcIixcclxuICAgICAgICAgICAgICAgIEZpcmVmb3g6IFwiI2U2NjAwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJGbGlja3IgKGJsdWUpXCI6IFwiIzAwNjNkY1wiLFxyXG4gICAgICAgICAgICAgICAgXCJGbGlja3IgKHBpbmspXCI6IFwiI2ZmMDA4NFwiLFxyXG4gICAgICAgICAgICAgICAgRm9ycnN0OiBcIiM1YjlhNjhcIixcclxuICAgICAgICAgICAgICAgIEZvdXJzcXVhcmU6IFwiIzI1YTBjYVwiLFxyXG4gICAgICAgICAgICAgICAgR2FybWluOiBcIiMwMDdjYzNcIixcclxuICAgICAgICAgICAgICAgIEdldEdsdWU6IFwiIzJkNzVhMlwiLFxyXG4gICAgICAgICAgICAgICAgR2ltbWViYXI6IFwiI2Y3MDA3OFwiLFxyXG4gICAgICAgICAgICAgICAgR2l0SHViOiBcIiMxNzE1MTVcIixcclxuICAgICAgICAgICAgICAgIFwiR29vZ2xlIEJsdWVcIjogXCIjMDE0MGNhXCIsXHJcbiAgICAgICAgICAgICAgICBcIkdvb2dsZSBHcmVlblwiOiBcIiMxNmE2MWVcIixcclxuICAgICAgICAgICAgICAgIFwiR29vZ2xlIFJlZFwiOiBcIiNkZDE4MTJcIixcclxuICAgICAgICAgICAgICAgIFwiR29vZ2xlIFllbGxvd1wiOiBcIiNmY2NhMDNcIixcclxuICAgICAgICAgICAgICAgIFwiR29vZ2xlK1wiOiBcIiNkZDRiMzlcIixcclxuICAgICAgICAgICAgICAgIEdyb292ZXNoYXJrOiBcIiNmNzdmMDBcIixcclxuICAgICAgICAgICAgICAgIEdyb3Vwb246IFwiIzgyYjU0OFwiLFxyXG4gICAgICAgICAgICAgICAgXCJIYWNrZXIgTmV3c1wiOiBcIiNmZjY2MDBcIixcclxuICAgICAgICAgICAgICAgIEhlbGxvV2FsbGV0OiBcIiMwMDg1Y2FcIixcclxuICAgICAgICAgICAgICAgIFwiSGVyb2t1IChsaWdodClcIjogXCIjYzdjNWU2XCIsXHJcbiAgICAgICAgICAgICAgICBcIkhlcm9rdSAoZGFyaylcIjogXCIjNjU2N2E1XCIsXHJcbiAgICAgICAgICAgICAgICBIb290U3VpdGU6IFwiIzAwMzM2NlwiLFxyXG4gICAgICAgICAgICAgICAgSG91eno6IFwiIzczYmEzN1wiLFxyXG4gICAgICAgICAgICAgICAgSFRNTDU6IFwiI2VjNjIzMVwiLFxyXG4gICAgICAgICAgICAgICAgSUtFQTogXCIjZmZjYzMzXCIsXHJcbiAgICAgICAgICAgICAgICBJTURiOiBcIiNmM2NlMTNcIixcclxuICAgICAgICAgICAgICAgIEluc3RhZ3JhbTogXCIjM2Y3MjliXCIsXHJcbiAgICAgICAgICAgICAgICBJbnRlbDogXCIjMDA3MWM1XCIsXHJcbiAgICAgICAgICAgICAgICBJbnR1aXQ6IFwiIzM2NWViZlwiLFxyXG4gICAgICAgICAgICAgICAgS2lja3N0YXJ0ZXI6IFwiIzc2Y2MxZVwiLFxyXG4gICAgICAgICAgICAgICAga2lwcHQ6IFwiI2UwMzUwMFwiLFxyXG4gICAgICAgICAgICAgICAgS29kZXJ5OiBcIiMwMGFmODFcIixcclxuICAgICAgICAgICAgICAgIExhc3RGTTogXCIjYzMwMDBkXCIsXHJcbiAgICAgICAgICAgICAgICBMaW5rZWRJbjogXCIjMGU3NmE4XCIsXHJcbiAgICAgICAgICAgICAgICBMaXZlc3RyZWFtOiBcIiNjZjAwMDVcIixcclxuICAgICAgICAgICAgICAgIEx1bW86IFwiIzU3NjM5NlwiLFxyXG4gICAgICAgICAgICAgICAgTWl4cGFuZWw6IFwiI2EwODZkM1wiLFxyXG4gICAgICAgICAgICAgICAgTWVldHVwOiBcIiNlNTE5MzdcIixcclxuICAgICAgICAgICAgICAgIE5va2lhOiBcIiMxODM2OTNcIixcclxuICAgICAgICAgICAgICAgIE5WSURJQTogXCIjNzZiOTAwXCIsXHJcbiAgICAgICAgICAgICAgICBPcGVyYTogXCIjY2MwZjE2XCIsXHJcbiAgICAgICAgICAgICAgICBQYXRoOiBcIiNlNDFmMTFcIixcclxuICAgICAgICAgICAgICAgIFwiUGF5UGFsIChkYXJrKVwiOiBcIiMxZTQ3N2FcIixcclxuICAgICAgICAgICAgICAgIFwiUGF5UGFsIChsaWdodClcIjogXCIjM2I3YmJmXCIsXHJcbiAgICAgICAgICAgICAgICBQaW5ib2FyZDogXCIjMDAwMGU2XCIsXHJcbiAgICAgICAgICAgICAgICBQaW50ZXJlc3Q6IFwiI2M4MjMyY1wiLFxyXG4gICAgICAgICAgICAgICAgUGxheVN0YXRpb246IFwiIzY2NWNiZVwiLFxyXG4gICAgICAgICAgICAgICAgUG9ja2V0OiBcIiNlZTQwNTZcIixcclxuICAgICAgICAgICAgICAgIFByZXppOiBcIiMzMThiZmZcIixcclxuICAgICAgICAgICAgICAgIFB1c2hhOiBcIiMwZjcxYjRcIixcclxuICAgICAgICAgICAgICAgIFF1b3JhOiBcIiNhODI0MDBcIixcclxuICAgICAgICAgICAgICAgIFwiUVVPVEUuZm1cIjogXCIjNjZjZWZmXCIsXHJcbiAgICAgICAgICAgICAgICBSZGlvOiBcIiMwMDhmZDVcIixcclxuICAgICAgICAgICAgICAgIFJlYWRhYmlsaXR5OiBcIiM5YzAwMDBcIixcclxuICAgICAgICAgICAgICAgIFwiUmVkIEhhdFwiOiBcIiNjYzAwMDBcIixcclxuICAgICAgICAgICAgICAgIFJlc291cmNlOiBcIiM3ZWI0MDBcIixcclxuICAgICAgICAgICAgICAgIFJvY2twYWNrOiBcIiMwYmE2YWJcIixcclxuICAgICAgICAgICAgICAgIFJvb246IFwiIzYyYjBkOVwiLFxyXG4gICAgICAgICAgICAgICAgUlNTOiBcIiNlZTgwMmZcIixcclxuICAgICAgICAgICAgICAgIFNhbGVzZm9yY2U6IFwiIzE3OThjMVwiLFxyXG4gICAgICAgICAgICAgICAgU2Ftc3VuZzogXCIjMGM0ZGEyXCIsXHJcbiAgICAgICAgICAgICAgICBTaG9waWZ5OiBcIiM5NmJmNDhcIixcclxuICAgICAgICAgICAgICAgIFNreXBlOiBcIiMwMGFmZjBcIixcclxuICAgICAgICAgICAgICAgIFNuYWdham9iOiBcIiNmNDdhMjBcIixcclxuICAgICAgICAgICAgICAgIFNvZnRvbmljOiBcIiMwMDhhY2VcIixcclxuICAgICAgICAgICAgICAgIFNvdW5kQ2xvdWQ6IFwiI2ZmNzcwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTcGFjZSBCb3hcIjogXCIjZjg2OTYwXCIsXHJcbiAgICAgICAgICAgICAgICBTcG90aWZ5OiBcIiM4MWI3MWFcIixcclxuICAgICAgICAgICAgICAgIFNwcmludDogXCIjZmVlMTAwXCIsXHJcbiAgICAgICAgICAgICAgICBTcXVhcmVzcGFjZTogXCIjMTIxMjEyXCIsXHJcbiAgICAgICAgICAgICAgICBTdGFja092ZXJmbG93OiBcIiNlZjgyMzZcIixcclxuICAgICAgICAgICAgICAgIFN0YXBsZXM6IFwiI2NjMDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJTdGF0dXMgQ2hhcnRcIjogXCIjZDc1ODRmXCIsXHJcbiAgICAgICAgICAgICAgICBTdHJpcGU6IFwiIzAwOGNkZFwiLFxyXG4gICAgICAgICAgICAgICAgU3R1ZHlCbHVlOiBcIiMwMGFmZTFcIixcclxuICAgICAgICAgICAgICAgIFN0dW1ibGVVcG9uOiBcIiNmNzQ0MjVcIixcclxuICAgICAgICAgICAgICAgIFwiVC1Nb2JpbGVcIjogXCIjZWEwYThlXCIsXHJcbiAgICAgICAgICAgICAgICBUZWNobm9yYXRpOiBcIiM0MGE4MDBcIixcclxuICAgICAgICAgICAgICAgIFwiVGhlIE5leHQgV2ViXCI6IFwiI2VmNDQyM1wiLFxyXG4gICAgICAgICAgICAgICAgVHJlZWhvdXNlOiBcIiM1Y2I4NjhcIixcclxuICAgICAgICAgICAgICAgIFRydWxpYTogXCIjNWVhYjFmXCIsXHJcbiAgICAgICAgICAgICAgICBUdW1ibHI6IFwiIzM0NTI2ZlwiLFxyXG4gICAgICAgICAgICAgICAgXCJUd2l0Y2gudHZcIjogXCIjNjQ0MWE1XCIsXHJcbiAgICAgICAgICAgICAgICBUd2l0dGVyOiBcIiMwMGFjZWVcIixcclxuICAgICAgICAgICAgICAgIFRZUE8zOiBcIiNmZjg3MDBcIixcclxuICAgICAgICAgICAgICAgIFVidW50dTogXCIjZGQ0ODE0XCIsXHJcbiAgICAgICAgICAgICAgICBVc3RyZWFtOiBcIiMzMzg4ZmZcIixcclxuICAgICAgICAgICAgICAgIFZlcml6b246IFwiI2VmMWQxZFwiLFxyXG4gICAgICAgICAgICAgICAgVmltZW86IFwiIzg2YzllZlwiLFxyXG4gICAgICAgICAgICAgICAgVmluZTogXCIjMDBhNDc4XCIsXHJcbiAgICAgICAgICAgICAgICBWaXJiOiBcIiMwNmFmZDhcIixcclxuICAgICAgICAgICAgICAgIFwiVmlyZ2luIE1lZGlhXCI6IFwiI2NjMDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgV29vZ2E6IFwiIzViMDA5Y1wiLFxyXG4gICAgICAgICAgICAgICAgXCJXb3JkUHJlc3MgKGJsdWUpXCI6IFwiIzIxNzU5YlwiLFxyXG4gICAgICAgICAgICAgICAgXCJXb3JkUHJlc3MgKG9yYW5nZSlcIjogXCIjZDU0ZTIxXCIsXHJcbiAgICAgICAgICAgICAgICBcIldvcmRQcmVzcyAoZ3JleSlcIjogXCIjNDY0NjQ2XCIsXHJcbiAgICAgICAgICAgICAgICBXdW5kZXJsaXN0OiBcIiMyYjg4ZDlcIixcclxuICAgICAgICAgICAgICAgIFhCT1g6IFwiIzliYzg0OFwiLFxyXG4gICAgICAgICAgICAgICAgWElORzogXCIjMTI2NTY3XCIsXHJcbiAgICAgICAgICAgICAgICBcIllhaG9vIVwiOiBcIiM3MjBlOWVcIixcclxuICAgICAgICAgICAgICAgIFlhbmRleDogXCIjZmZjYzAwXCIsXHJcbiAgICAgICAgICAgICAgICBZZWxwOiBcIiNjNDEyMDBcIixcclxuICAgICAgICAgICAgICAgIFlvdVR1YmU6IFwiI2M0MzAyYlwiLFxyXG4gICAgICAgICAgICAgICAgWmFsb25nbzogXCIjNTQ5OGRjXCIsXHJcbiAgICAgICAgICAgICAgICBaZW5kZXNrOiBcIiM3OGEzMDBcIixcclxuICAgICAgICAgICAgICAgIFplcnBseTogXCIjOWRjYzdhXCIsXHJcbiAgICAgICAgICAgICAgICBab290b29sOiBcIiM1ZThiMWRcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBicmFuZHM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGJyYW5kcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgYiBpbiB0aGlzLmJyYW5kQ29sb3JzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJhbmRzLnB1c2goYik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJhbmRzO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhSW1hZ2U6IGZ1bmN0aW9uKHNpemUsIHRleHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjYW52YXMgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSwgY3R4ID0gY2FudmFzICYmIGNhbnZhcy5nZXRDb250ZXh0ICYmIGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNhbnZhcyB8fCAhY3R4KSByZXR1cm4gXCJcIjtcclxuICAgICAgICAgICAgICAgIGlmICghc2l6ZSkgc2l6ZSA9IHRoaXMucGljayh0aGlzLmFkX3NpemUpO1xyXG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQgIT09IHVuZGVmaW5lZCA/IHRleHQgOiBzaXplO1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IHNpemUuc3BsaXQoXCJ4XCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gcGFyc2VJbnQoc2l6ZVswXSwgMTApLCBoZWlnaHQgPSBwYXJzZUludChzaXplWzFdLCAxMCksIGJhY2tncm91bmQgPSB0aGlzLmJyYW5kQ29sb3JzW3RoaXMucGljayh0aGlzLmJyYW5kcygpKV0sIGZvcmVncm91bmQgPSBcIiNGRkZcIiwgdGV4dF9oZWlnaHQgPSAxNCwgZm9udCA9IFwic2Fucy1zZXJpZlwiO1xyXG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIjtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBiYWNrZ3JvdW5kO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZvcmVncm91bmQ7XHJcbiAgICAgICAgICAgICAgICBjdHguZm9udCA9IFwiYm9sZCBcIiArIHRleHRfaGVpZ2h0ICsgXCJweCBcIiArIGZvbnQ7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQodGV4dCwgd2lkdGggLyAyLCBoZWlnaHQgLyAyLCB3aWR0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBjb2xvcjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY29sb3VyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDE2ICogMTYgKiAxNiAqIDE2ICogMTYgKiAxNiAtIDEpKS50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgICAgICBjb2xvdXIgPSBcIiNcIiArIChcIjAwMDAwMFwiICsgY29sb3VyKS5zbGljZSgtNik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3VyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGNhcGl0YWxpemU6IGZ1bmN0aW9uKHdvcmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAod29yZCArIFwiXCIpLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgKHdvcmQgKyBcIlwiKS5zdWJzdHIoMSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHVwcGVyOiBmdW5jdGlvbihzdHIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoc3RyICsgXCJcIikudG9VcHBlckNhc2UoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbG93ZXI6IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChzdHIgKyBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwaWNrOiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IGFyciB8fCBbXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnJbdGhpcy5uYXR1cmFsKDAsIGFyci5sZW5ndGggLSAxKV07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNodWZmbGU6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gYXJyIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IGFyci5zbGljZSgwKSwgcmVzdWx0ID0gW10sIGluZGV4ID0gMCwgbGVuZ3RoID0gb2xkLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMubmF0dXJhbCgwLCBvbGQubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2gob2xkW2luZGV4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb2xkLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIHBhcmFncmFwaDogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsZW47XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgbGVuID0gUmFuZG9tLm5hdHVyYWwoMywgNyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgbGVuID0gbWF4ID0gbWluO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBwYXJzZUludChtaW4sIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUludChtYXgsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSBSYW5kb20ubmF0dXJhbChtaW4sIG1heCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJyID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goUmFuZG9tLnNlbnRlbmNlKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyci5qb2luKFwiIFwiKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2VudGVuY2U6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIGxlbiA9IFJhbmRvbS5uYXR1cmFsKDEyLCAxOCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgbGVuID0gbWF4ID0gbWluO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBwYXJzZUludChtaW4sIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUludChtYXgsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSBSYW5kb20ubmF0dXJhbChtaW4sIG1heCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgYXJyID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goUmFuZG9tLndvcmQoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLmNhcGl0YWxpemUoYXJyLmpvaW4oXCIgXCIpKSArIFwiLlwiO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB3b3JkOiBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSBsZW4gPSBSYW5kb20ubmF0dXJhbCgzLCAxMCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgbGVuID0gbWF4ID0gbWluO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBwYXJzZUludChtaW4sIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUludChtYXgsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSBSYW5kb20ubmF0dXJhbChtaW4sIG1heCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gUmFuZG9tLmNoYXJhY3RlcihcImxvd2VyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGl0bGU6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuLCByZXN1bHQgPSBbXTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSBsZW4gPSBSYW5kb20ubmF0dXJhbCgzLCA3KTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSBsZW4gPSBtYXggPSBtaW47XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IHBhcnNlSW50KG1pbiwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IHBhcnNlSW50KG1heCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IFJhbmRvbS5uYXR1cmFsKG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmNhcGl0YWxpemUodGhpcy53b3JkKCkpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuam9pbihcIiBcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgZmlyc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5hbWVzID0gWyBcIkphbWVzXCIsIFwiSm9oblwiLCBcIlJvYmVydFwiLCBcIk1pY2hhZWxcIiwgXCJXaWxsaWFtXCIsIFwiRGF2aWRcIiwgXCJSaWNoYXJkXCIsIFwiQ2hhcmxlc1wiLCBcIkpvc2VwaFwiLCBcIlRob21hc1wiLCBcIkNocmlzdG9waGVyXCIsIFwiRGFuaWVsXCIsIFwiUGF1bFwiLCBcIk1hcmtcIiwgXCJEb25hbGRcIiwgXCJHZW9yZ2VcIiwgXCJLZW5uZXRoXCIsIFwiU3RldmVuXCIsIFwiRWR3YXJkXCIsIFwiQnJpYW5cIiwgXCJSb25hbGRcIiwgXCJBbnRob255XCIsIFwiS2V2aW5cIiwgXCJKYXNvblwiLCBcIk1hdHRoZXdcIiwgXCJHYXJ5XCIsIFwiVGltb3RoeVwiLCBcIkpvc2VcIiwgXCJMYXJyeVwiLCBcIkplZmZyZXlcIiwgXCJGcmFua1wiLCBcIlNjb3R0XCIsIFwiRXJpY1wiIF0uY29uY2F0KFsgXCJNYXJ5XCIsIFwiUGF0cmljaWFcIiwgXCJMaW5kYVwiLCBcIkJhcmJhcmFcIiwgXCJFbGl6YWJldGhcIiwgXCJKZW5uaWZlclwiLCBcIk1hcmlhXCIsIFwiU3VzYW5cIiwgXCJNYXJnYXJldFwiLCBcIkRvcm90aHlcIiwgXCJMaXNhXCIsIFwiTmFuY3lcIiwgXCJLYXJlblwiLCBcIkJldHR5XCIsIFwiSGVsZW5cIiwgXCJTYW5kcmFcIiwgXCJEb25uYVwiLCBcIkNhcm9sXCIsIFwiUnV0aFwiLCBcIlNoYXJvblwiLCBcIk1pY2hlbGxlXCIsIFwiTGF1cmFcIiwgXCJTYXJhaFwiLCBcIktpbWJlcmx5XCIsIFwiRGVib3JhaFwiLCBcIkplc3NpY2FcIiwgXCJTaGlybGV5XCIsIFwiQ3ludGhpYVwiLCBcIkFuZ2VsYVwiLCBcIk1lbGlzc2FcIiwgXCJCcmVuZGFcIiwgXCJBbXlcIiwgXCJBbm5hXCIgXSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5waWNrKG5hbWVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcGl0YWxpemUodGhpcy53b3JkKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsYXN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuYW1lcyA9IFsgXCJTbWl0aFwiLCBcIkpvaG5zb25cIiwgXCJXaWxsaWFtc1wiLCBcIkJyb3duXCIsIFwiSm9uZXNcIiwgXCJNaWxsZXJcIiwgXCJEYXZpc1wiLCBcIkdhcmNpYVwiLCBcIlJvZHJpZ3VlelwiLCBcIldpbHNvblwiLCBcIk1hcnRpbmV6XCIsIFwiQW5kZXJzb25cIiwgXCJUYXlsb3JcIiwgXCJUaG9tYXNcIiwgXCJIZXJuYW5kZXpcIiwgXCJNb29yZVwiLCBcIk1hcnRpblwiLCBcIkphY2tzb25cIiwgXCJUaG9tcHNvblwiLCBcIldoaXRlXCIsIFwiTG9wZXpcIiwgXCJMZWVcIiwgXCJHb256YWxlelwiLCBcIkhhcnJpc1wiLCBcIkNsYXJrXCIsIFwiTGV3aXNcIiwgXCJSb2JpbnNvblwiLCBcIldhbGtlclwiLCBcIlBlcmV6XCIsIFwiSGFsbFwiLCBcIllvdW5nXCIsIFwiQWxsZW5cIiBdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGljayhuYW1lcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmFtZTogZnVuY3Rpb24obWlkZGxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maXJzdCgpICsgXCIgXCIgKyAobWlkZGxlID8gdGhpcy5maXJzdCgpICsgXCIgXCIgOiBcIlwiKSArIHRoaXMubGFzdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIHVybDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJodHRwOi8vXCIgKyB0aGlzLmRvbWFpbigpICsgXCIvXCIgKyB0aGlzLndvcmQoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZG9tYWluOiBmdW5jdGlvbih0bGQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndvcmQoKSArIFwiLlwiICsgKHRsZCB8fCB0aGlzLnRsZCgpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZW1haWw6IGZ1bmN0aW9uKGRvbWFpbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyKFwibG93ZXJcIikgKyBcIi5cIiArIHRoaXMubGFzdCgpLnRvTG93ZXJDYXNlKCkgKyBcIkBcIiArIHRoaXMubGFzdCgpLnRvTG93ZXJDYXNlKCkgKyBcIi5cIiArIHRoaXMudGxkKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53b3JkKCkgKyBcIkBcIiArIChkb21haW4gfHwgdGhpcy5kb21haW4oKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdHVyYWwoMCwgMjU1KSArIFwiLlwiICsgdGhpcy5uYXR1cmFsKDAsIDI1NSkgKyBcIi5cIiArIHRoaXMubmF0dXJhbCgwLCAyNTUpICsgXCIuXCIgKyB0aGlzLm5hdHVyYWwoMCwgMjU1KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdGxkczogWyBcImNvbVwiLCBcIm9yZ1wiLCBcImVkdVwiLCBcImdvdlwiLCBcImNvLnVrXCIsIFwibmV0XCIsIFwiaW9cIiBdLFxyXG4gICAgICAgICAgICB0bGQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGljayh0aGlzLnRsZHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGFyZWFzOiBbIFwi5Lic5YyXXCIsIFwi5Y2O5YyXXCIsIFwi5Y2O5LicXCIsIFwi5Y2O5LitXCIsIFwi5Y2O5Y2XXCIsIFwi6KW/5Y2XXCIsIFwi6KW/5YyXXCIgXSxcclxuICAgICAgICAgICAgYXJlYTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5waWNrKHRoaXMuYXJlYXMpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZWdpb25zOiBbIFwiMTEwMDAwIOWMl+S6rOW4glwiLCBcIjEyMDAwMCDlpKnmtKXluIJcIiwgXCIxMzAwMDAg5rKz5YyX55yBXCIsIFwiMTQwMDAwIOWxseilv+ecgVwiLCBcIjE1MDAwMCDlhoXokpnlj6Toh6rmsrvljLpcIiwgXCIyMTAwMDAg6L695a6B55yBXCIsIFwiMjIwMDAwIOWQieael+ecgVwiLCBcIjIzMDAwMCDpu5HpvpnmsZ/nnIFcIiwgXCIzMTAwMDAg5LiK5rW35biCXCIsIFwiMzIwMDAwIOaxn+iLj+ecgVwiLCBcIjMzMDAwMCDmtZnmsZ/nnIFcIiwgXCIzNDAwMDAg5a6J5b6955yBXCIsIFwiMzUwMDAwIOemj+W7uuecgVwiLCBcIjM2MDAwMCDmsZ/opb/nnIFcIiwgXCIzNzAwMDAg5bGx5Lic55yBXCIsIFwiNDEwMDAwIOays+WNl+ecgVwiLCBcIjQyMDAwMCDmuZbljJfnnIFcIiwgXCI0MzAwMDAg5rmW5Y2X55yBXCIsIFwiNDQwMDAwIOW5v+S4nOecgVwiLCBcIjQ1MDAwMCDlub/opb/lo67ml4/oh6rmsrvljLpcIiwgXCI0NjAwMDAg5rW35Y2X55yBXCIsIFwiNTAwMDAwIOmHjeW6huW4glwiLCBcIjUxMDAwMCDlm5vlt53nnIFcIiwgXCI1MjAwMDAg6LS15bee55yBXCIsIFwiNTMwMDAwIOS6keWNl+ecgVwiLCBcIjU0MDAwMCDopb/ol4/oh6rmsrvljLpcIiwgXCI2MTAwMDAg6ZmV6KW/55yBXCIsIFwiNjIwMDAwIOeUmOiCg+ecgVwiLCBcIjYzMDAwMCDpnZLmtbfnnIFcIiwgXCI2NDAwMDAg5a6B5aSP5Zue5peP6Ieq5rK75Yy6XCIsIFwiNjUwMDAwIOaWsOeWhue7tOWQvuWwlOiHquayu+WMulwiLCBcIjY1MDAwMCDmlrDnlobnu7TlkL7lsJToh6rmsrvljLpcIiwgXCI3MTAwMDAg5Y+w5rm+55yBXCIsIFwiODEwMDAwIOmmmea4r+eJueWIq+ihjOaUv+WMulwiLCBcIjgyMDAwMCDmvrPpl6jnibnliKvooYzmlL/ljLpcIiBdLFxyXG4gICAgICAgICAgICByZWdpb246IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGljayh0aGlzLnJlZ2lvbnMpLnNwbGl0KFwiIFwiKVsxXTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYWRkcmVzczogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgY2l0eTogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgcGhvbmU6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIGFyZWFjb2RlOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBzdHJlZXQ6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHN0cmVldF9zdWZmaXhlczogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgc3RyZWV0X3N1ZmZpeDogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgc3RhdGVzOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBzdGF0ZTogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgemlwOiBmdW5jdGlvbihsZW4pIHtcclxuICAgICAgICAgICAgICAgIHZhciB6aXAgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAobGVuIHx8IDYpOyBpKyspIHppcCArPSB0aGlzLm5hdHVyYWwoMCwgOSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gemlwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIHRvZG86IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidG9kb1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGQ0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdHVyYWwoMSwgNCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGQ2OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdHVyYWwoMSwgNik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGQ4OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdHVyYWwoMSwgOCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGQxMjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDEyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZDIwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdHVyYWwoMSwgMjApO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkMTAwOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdHVyYWwoMSwgMTAwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZ3VpZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcG9vbCA9IFwiQUJDREVGMTIzNDU2Nzg5MFwiLCBndWlkID0gdGhpcy5zdHJpbmcocG9vbCwgOCkgKyBcIi1cIiArIHRoaXMuc3RyaW5nKHBvb2wsIDQpICsgXCItXCIgKyB0aGlzLnN0cmluZyhwb29sLCA0KSArIFwiLVwiICsgdGhpcy5zdHJpbmcocG9vbCwgNCkgKyBcIi1cIiArIHRoaXMuc3RyaW5nKHBvb2wsIDEyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBndWlkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaWQsIHN1bSA9IDAsIHJhbmsgPSBbIFwiN1wiLCBcIjlcIiwgXCIxMFwiLCBcIjVcIiwgXCI4XCIsIFwiNFwiLCBcIjJcIiwgXCIxXCIsIFwiNlwiLCBcIjNcIiwgXCI3XCIsIFwiOVwiLCBcIjEwXCIsIFwiNVwiLCBcIjhcIiwgXCI0XCIsIFwiMlwiIF0sIGxhc3QgPSBbIFwiMVwiLCBcIjBcIiwgXCJYXCIsIFwiOVwiLCBcIjhcIiwgXCI3XCIsIFwiNlwiLCBcIjVcIiwgXCI0XCIsIFwiM1wiLCBcIjJcIiBdO1xyXG4gICAgICAgICAgICAgICAgaWQgPSB0aGlzLnBpY2sodGhpcy5yZWdpb25zKS5zcGxpdChcIiBcIilbMF0gKyB0aGlzLmRhdGUoXCJ5eXl5TU1kZFwiKSArIHRoaXMuc3RyaW5nKFwibnVtYmVyXCIsIDMpO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpZC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBpZFtpXSAqIHJhbmtbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZCArPSBsYXN0W3N1bSAlIDExXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYXV0b0luY3JlbWVudEludGVnZXI6IDAsXHJcbiAgICAgICAgICAgIGluY3JlbWVudDogZnVuY3Rpb24oc3RlcCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXV0b0luY3JlbWVudEludGVnZXIgKz0gK3N0ZXAgfHwgMTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW5jOiBmdW5jdGlvbihzdGVwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbmNyZW1lbnQoc3RlcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gUmFuZG9tO1xyXG4gICAgfSgpO1xyXG4gICAgLyohIHNyYy9tb2NrLmpzICovXHJcbiAgICB2YXIgcmtleSA9IC8oLispXFx8KD86XFwrKFxcZCspfChbXFwrXFwtXT9cXGQrLT9bXFwrXFwtXT9cXGQqKT8oPzpcXC4oXFxkKy0/XFxkKikpPykvLCBycmFuZ2UgPSAvKFtcXCtcXC1dP1xcZCspLT8oW1xcK1xcLV0/XFxkKyk/LywgcnBsYWNlaG9sZGVyID0gL1xcXFwqQChbXkAjJSYoKVxcP1xcc1xcL1xcLl0rKSg/OlxcKCguKj8pXFwpKT8vZztcclxuICAgIE1vY2suZXh0ZW5kID0gVXRpbC5leHRlbmQ7XHJcbiAgICBNb2NrLm1vY2sgPSBmdW5jdGlvbihydXJsLCBydHlwZSwgdGVtcGxhdGUpIHtcclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSGFuZGxlLmdlbihydXJsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSBydHlwZTtcclxuICAgICAgICAgICAgcnR5cGUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE1vY2suX21vY2tlZFtydXJsICsgKHJ0eXBlIHx8IFwiXCIpXSA9IHtcclxuICAgICAgICAgICAgcnVybDogcnVybCxcclxuICAgICAgICAgICAgcnR5cGU6IHJ0eXBlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGVcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJldHVybiBNb2NrO1xyXG4gICAgfTtcclxuICAgIHZhciBIYW5kbGUgPSB7XHJcbiAgICAgICAgZXh0ZW5kOiBVdGlsLmV4dGVuZFxyXG4gICAgfTtcclxuICAgIEhhbmRsZS5ydWxlID0gZnVuY3Rpb24obmFtZSkge1xyXG4gICAgICAgIG5hbWUgPSAobmFtZSB8fCBcIlwiKSArIFwiXCI7XHJcbiAgICAgICAgdmFyIHBhcmFtZXRlcnMgPSAobmFtZSB8fCBcIlwiKS5tYXRjaChya2V5KSwgcmFuZ2UgPSBwYXJhbWV0ZXJzICYmIHBhcmFtZXRlcnNbM10gJiYgcGFyYW1ldGVyc1szXS5tYXRjaChycmFuZ2UpLCBtaW4gPSByYW5nZSAmJiBwYXJzZUludChyYW5nZVsxXSwgMTApLCBtYXggPSByYW5nZSAmJiBwYXJzZUludChyYW5nZVsyXSwgMTApLCBjb3VudCA9IHJhbmdlID8gIXJhbmdlWzJdICYmIHBhcnNlSW50KHJhbmdlWzFdLCAxMCkgfHwgUmFuZG9tLmludGVnZXIobWluLCBtYXgpIDogMSwgZGVjaW1hbCA9IHBhcmFtZXRlcnMgJiYgcGFyYW1ldGVyc1s0XSAmJiBwYXJhbWV0ZXJzWzRdLm1hdGNoKHJyYW5nZSksIGRtaW4gPSBkZWNpbWFsICYmIHBhcnNlSW50KGRlY2ltYWxbMV0sIDEwKSwgZG1heCA9IGRlY2ltYWwgJiYgcGFyc2VJbnQoZGVjaW1hbFsyXSwgMTApLCBkY291bnQgPSBkZWNpbWFsID8gIWRlY2ltYWxbMl0gJiYgcGFyc2VJbnQoZGVjaW1hbFsxXSwgMTApIHx8IFJhbmRvbS5pbnRlZ2VyKGRtaW4sIGRtYXgpIDogMCwgcG9pbnQgPSBwYXJhbWV0ZXJzICYmIHBhcmFtZXRlcnNbNF07XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGFyYW1ldGVyczogcGFyYW1ldGVycyxcclxuICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxyXG4gICAgICAgICAgICBtaW46IG1pbixcclxuICAgICAgICAgICAgbWF4OiBtYXgsXHJcbiAgICAgICAgICAgIGNvdW50OiBjb3VudCxcclxuICAgICAgICAgICAgZGVjaW1hbDogZGVjaW1hbCxcclxuICAgICAgICAgICAgZG1pbjogZG1pbixcclxuICAgICAgICAgICAgZG1heDogZG1heCxcclxuICAgICAgICAgICAgZGNvdW50OiBkY291bnQsXHJcbiAgICAgICAgICAgIHBvaW50OiBwb2ludFxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG4gICAgSGFuZGxlLmdlbiA9IGZ1bmN0aW9uKHRlbXBsYXRlLCBuYW1lLCBjb250ZXh0KSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUgPSAobmFtZSB8fCBcIlwiKSArIFwiXCI7XHJcbiAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwge307XHJcbiAgICAgICAgY29udGV4dCA9IHtcclxuICAgICAgICAgICAgcGF0aDogY29udGV4dC5wYXRoIHx8IFtdLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IGNvbnRleHQudGVtcGxhdGVQYXRoIHx8IFtdLFxyXG4gICAgICAgICAgICBjdXJyZW50Q29udGV4dDogY29udGV4dC5jdXJyZW50Q29udGV4dCxcclxuICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogY29udGV4dC50ZW1wbGF0ZUN1cnJlbnRDb250ZXh0IHx8IHRlbXBsYXRlLFxyXG4gICAgICAgICAgICByb290OiBjb250ZXh0LnJvb3QsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogY29udGV4dC50ZW1wbGF0ZVJvb3RcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBydWxlID0gSGFuZGxlLnJ1bGUobmFtZSk7XHJcbiAgICAgICAgdmFyIHR5cGUgPSBVdGlsLnR5cGUodGVtcGxhdGUpO1xyXG4gICAgICAgIGlmIChIYW5kbGVbdHlwZV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIEhhbmRsZVt0eXBlXSh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgIHBhcnNlZE5hbWU6IG5hbWUgPyBuYW1lLnJlcGxhY2UocmtleSwgXCIkMVwiKSA6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICBydWxlOiBydWxlLFxyXG4gICAgICAgICAgICAgICAgY29udGV4dDogY29udGV4dFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xyXG4gICAgfTtcclxuICAgIEhhbmRsZS5leHRlbmQoe1xyXG4gICAgICAgIGFycmF5OiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXSwgaSwgajtcclxuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnJ1bGUucGFyYW1ldGVycykge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKEhhbmRsZS5nZW4ob3B0aW9ucy50ZW1wbGF0ZVtpXSwgaSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnJ1bGUuY291bnQgPT09IDEgJiYgb3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChvcHRpb25zLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IFJhbmRvbS5waWNrKEhhbmRsZS5nZW4ob3B0aW9ucy50ZW1wbGF0ZSwgdW5kZWZpbmVkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy5ydWxlLmNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKEhhbmRsZS5nZW4ob3B0aW9ucy50ZW1wbGF0ZVtqKytdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gd2hpbGUgKGogPCBvcHRpb25zLnRlbXBsYXRlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBvYmplY3Q6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHt9LCBrZXlzLCBmbktleXMsIGtleSwgcGFyc2VkS2V5LCBpbmMsIGk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnJ1bGUubWluKSB7XHJcbiAgICAgICAgICAgICAgICBrZXlzID0gVXRpbC5rZXlzKG9wdGlvbnMudGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAga2V5cyA9IFJhbmRvbS5zaHVmZmxlKGtleXMpO1xyXG4gICAgICAgICAgICAgICAga2V5cyA9IGtleXMuc2xpY2UoMCwgb3B0aW9ucy5ydWxlLmNvdW50KTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRLZXkgPSBrZXkucmVwbGFjZShya2V5LCBcIiQxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2gocGFyc2VkS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbcGFyc2VkS2V5XSA9IEhhbmRsZS5nZW4ob3B0aW9ucy50ZW1wbGF0ZVtrZXldLCBrZXksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGhcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGtleXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZuS2V5cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb3B0aW9ucy50ZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICh0eXBlb2Ygb3B0aW9ucy50ZW1wbGF0ZVtrZXldID09PSBcImZ1bmN0aW9uXCIgPyBmbktleXMgOiBrZXlzKS5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoZm5LZXlzKTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZWRLZXkgPSBrZXkucmVwbGFjZShya2V5LCBcIiQxXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2gocGFyc2VkS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbcGFyc2VkS2V5XSA9IEhhbmRsZS5nZW4ob3B0aW9ucy50ZW1wbGF0ZVtrZXldLCBrZXksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGhcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBpbmMgPSBrZXkubWF0Y2gocmtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluYyAmJiBpbmNbMl0gJiYgVXRpbC50eXBlKG9wdGlvbnMudGVtcGxhdGVba2V5XSkgPT09IFwibnVtYmVyXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZVtrZXldICs9IHBhcnNlSW50KGluY1syXSwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbnVtYmVyOiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQsIHBhcnRzLCBpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ydWxlLnBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlICs9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBwYXJ0cyA9IG9wdGlvbnMudGVtcGxhdGUuc3BsaXQoXCIuXCIpO1xyXG4gICAgICAgICAgICAgICAgcGFydHNbMF0gPSBvcHRpb25zLnJ1bGUucmFuZ2UgPyBvcHRpb25zLnJ1bGUuY291bnQgOiBwYXJ0c1swXTtcclxuICAgICAgICAgICAgICAgIHBhcnRzWzFdID0gKHBhcnRzWzFdIHx8IFwiXCIpLnNsaWNlKDAsIG9wdGlvbnMucnVsZS5kY291bnQpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgcGFydHNbMV0ubGVuZ3RoIDwgb3B0aW9ucy5ydWxlLmRjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHNbMV0gKz0gUmFuZG9tLmNoYXJhY3RlcihcIm51bWJlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBhcnNlRmxvYXQocGFydHMuam9pbihcIi5cIiksIDEwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9wdGlvbnMucnVsZS5yYW5nZSAmJiAhb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnNbMl0gPyBvcHRpb25zLnJ1bGUuY291bnQgOiBvcHRpb25zLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImJvb2xlYW5cIjogZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0O1xyXG4gICAgICAgICAgICByZXN1bHQgPSBvcHRpb25zLnJ1bGUucGFyYW1ldGVycyA/IFJhbmRvbS5ib29sKG9wdGlvbnMucnVsZS5taW4sIG9wdGlvbnMucnVsZS5tYXgsIG9wdGlvbnMudGVtcGxhdGUpIDogb3B0aW9ucy50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0cmluZzogZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gXCJcIiwgaSwgcGxhY2Vob2xkZXJzLCBwaCwgcGhlZDtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy5ydWxlLmNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gb3B0aW9ucy50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVycyA9IHJlc3VsdC5tYXRjaChycGxhY2Vob2xkZXIpIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBsYWNlaG9sZGVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBoID0gcGxhY2Vob2xkZXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgvXlxcXFwvLnRlc3QocGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVycy5zcGxpY2UoaS0tLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHBoZWQgPSBIYW5kbGUucGxhY2Vob2xkZXIocGgsIG9wdGlvbnMuY29udGV4dC5jdXJyZW50Q29udGV4dCwgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlQ3VycmVudENvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlcnMubGVuZ3RoID09PSAxICYmIHBoID09PSByZXN1bHQgJiYgdHlwZW9mIHBoZWQgIT09IHR5cGVvZiByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcGhlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzTnVtZXJpYyhwaGVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcGFyc2VGbG9hdChwaGVkLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoL14odHJ1ZXxmYWxzZSkkLy50ZXN0KHBoZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwaGVkID09PSBcInRydWVcIiA/IHRydWUgOiBwaGVkID09PSBcImZhbHNlXCIgPyBmYWxzZSA6IHBoZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHQucmVwbGFjZShwaCwgcGhlZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvcHRpb25zLnJ1bGUucmFuZ2UgPyBSYW5kb20uc3RyaW5nKG9wdGlvbnMucnVsZS5jb3VudCkgOiBvcHRpb25zLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImZ1bmN0aW9uXCI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMudGVtcGxhdGUuY2FsbChvcHRpb25zLmNvbnRleHQuY3VycmVudENvbnRleHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgSGFuZGxlLmV4dGVuZCh7XHJcbiAgICAgICAgX2FsbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciByZSA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gUmFuZG9tKSByZVtrZXkudG9Mb3dlckNhc2UoKV0gPSBrZXk7XHJcbiAgICAgICAgICAgIHJldHVybiByZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBsYWNlaG9sZGVyOiBmdW5jdGlvbihwbGFjZWhvbGRlciwgb2JqLCB0ZW1wbGF0ZUNvbnRleHQpIHtcclxuICAgICAgICAgICAgcnBsYWNlaG9sZGVyLmV4ZWMoXCJcIik7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IHJwbGFjZWhvbGRlci5leGVjKHBsYWNlaG9sZGVyKSwga2V5ID0gcGFydHMgJiYgcGFydHNbMV0sIGxrZXkgPSBrZXkgJiYga2V5LnRvTG93ZXJDYXNlKCksIG9rZXkgPSB0aGlzLl9hbGwoKVtsa2V5XSwgcGFyYW1zID0gcGFydHMgJiYgcGFydHNbMl0gfHwgXCJcIjtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IGV2YWwoXCIoZnVuY3Rpb24oKXsgcmV0dXJuIFtdLnNwbGljZS5jYWxsKGFyZ3VtZW50cywgMCApIH0pKFwiICsgcGFyYW1zICsgXCIpXCIpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gcGFydHNbMl0uc3BsaXQoLyxcXHMqLyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG9iaiAmJiBrZXkgaW4gb2JqKSByZXR1cm4gb2JqW2tleV07XHJcbiAgICAgICAgICAgIGlmICh0ZW1wbGF0ZUNvbnRleHQgJiYgdHlwZW9mIHRlbXBsYXRlQ29udGV4dCA9PT0gXCJvYmplY3RcIiAmJiBrZXkgaW4gdGVtcGxhdGVDb250ZXh0ICYmIHBsYWNlaG9sZGVyICE9PSB0ZW1wbGF0ZUNvbnRleHRba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVDb250ZXh0W2tleV0gPSBIYW5kbGUuZ2VuKHRlbXBsYXRlQ29udGV4dFtrZXldLCBrZXksIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogb2JqLFxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IHRlbXBsYXRlQ29udGV4dFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGVtcGxhdGVDb250ZXh0W2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCEoa2V5IGluIFJhbmRvbSkgJiYgIShsa2V5IGluIFJhbmRvbSkgJiYgIShva2V5IGluIFJhbmRvbSkpIHJldHVybiBwbGFjZWhvbGRlcjtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJwbGFjZWhvbGRlci5leGVjKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJwbGFjZWhvbGRlci50ZXN0KHBhcmFtc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXNbaV0gPSBIYW5kbGUucGxhY2Vob2xkZXIocGFyYW1zW2ldLCBvYmopO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGUgPSBSYW5kb21ba2V5XSB8fCBSYW5kb21bbGtleV0gfHwgUmFuZG9tW29rZXldO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKFV0aWwudHlwZShoYW5kbGUpKSB7XHJcbiAgICAgICAgICAgICAgY2FzZSBcImFycmF5XCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2soaGFuZGxlKTtcclxuXHJcbiAgICAgICAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XHJcbiAgICAgICAgICAgICAgICB2YXIgcmUgPSBoYW5kbGUuYXBwbHkoUmFuZG9tLCBwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlID09PSB1bmRlZmluZWQpIHJlID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLyohIHNyYy9tb2NramF4LmpzICovXHJcbiAgICBmdW5jdGlvbiBmaW5kKG9wdGlvbnMpIHtcclxuICAgICAgICBmb3IgKHZhciBzVXJsVHlwZSBpbiBNb2NrLl9tb2NrZWQpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBNb2NrLl9tb2NrZWRbc1VybFR5cGVdO1xyXG4gICAgICAgICAgICBpZiAoKCFpdGVtLnJ1cmwgfHwgbWF0Y2goaXRlbS5ydXJsLCBvcHRpb25zLnVybCkpICYmICghaXRlbS5ydHlwZSB8fCBtYXRjaChpdGVtLnJ0eXBlLCBvcHRpb25zLnR5cGUudG9Mb3dlckNhc2UoKSkpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBtYXRjaChleHBlY3RlZCwgYWN0dWFsKSB7XHJcbiAgICAgICAgICAgIGlmIChVdGlsLnR5cGUoZXhwZWN0ZWQpID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWQgPT09IGFjdHVhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoVXRpbC50eXBlKGV4cGVjdGVkKSA9PT0gXCJyZWdleHBcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGVkLnRlc3QoYWN0dWFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNvbnZlcnQoaXRlbSwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBVdGlsLmlzRnVuY3Rpb24oaXRlbS50ZW1wbGF0ZSkgPyBpdGVtLnRlbXBsYXRlKG9wdGlvbnMpIDogTW9jay5tb2NrKGl0ZW0udGVtcGxhdGUpO1xyXG4gICAgfVxyXG4gICAgTW9jay5tb2NramF4ID0gZnVuY3Rpb24gbW9ja2pheChqUXVlcnkpIHtcclxuICAgICAgICBmdW5jdGlvbiBtb2NreGhyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTogNCxcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogXCJcIixcclxuICAgICAgICAgICAgICAgIG9wZW46IGpRdWVyeS5ub29wLFxyXG4gICAgICAgICAgICAgICAgc2VuZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub25sb2FkKSB0aGlzLm9ubG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHNldFJlcXVlc3RIZWFkZXI6IGpRdWVyeS5ub29wLFxyXG4gICAgICAgICAgICAgICAgZ2V0QWxsUmVzcG9uc2VIZWFkZXJzOiBqUXVlcnkubm9vcCxcclxuICAgICAgICAgICAgICAgIGdldFJlc3BvbnNlSGVhZGVyOiBqUXVlcnkubm9vcCxcclxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IGpRdWVyeS5ub29wLFxyXG4gICAgICAgICAgICAgICAgYWJvcnQ6IGpRdWVyeS5ub29wXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIHByZWZpbHRlcihvcHRpb25zLCBvcmlnaW5hbE9wdGlvbnMsIGpxWEhSKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gZmluZChvcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YUZpbHRlciA9IG9wdGlvbnMuY29udmVydGVyc1tcInRleHQganNvblwiXSA9IG9wdGlvbnMuY29udmVydGVyc1tcInRleHQganNvbnBcIl0gPSBvcHRpb25zLmNvbnZlcnRlcnNbXCJ0ZXh0IHNjcmlwdFwiXSA9IG9wdGlvbnMuY29udmVydGVyc1tcInNjcmlwdCBqc29uXCJdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbnZlcnQoaXRlbSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy54aHIgPSBtb2NreGhyO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9yaWdpbmFsT3B0aW9ucy5kYXRhVHlwZSAhPT0gXCJzY3JpcHRcIikgcmV0dXJuIFwianNvblwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGpRdWVyeS5hamF4UHJlZmlsdGVyKFwianNvbiBqc29ucCBzY3JpcHRcIiwgcHJlZmlsdGVyKTtcclxuICAgICAgICByZXR1cm4gTW9jaztcclxuICAgIH07XHJcbiAgICBpZiAodHlwZW9mIGpRdWVyeSAhPSBcInVuZGVmaW5lZFwiKSBNb2NrLm1vY2tqYXgoalF1ZXJ5KTtcclxuICAgIGlmICh0eXBlb2YgWmVwdG8gIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIE1vY2subW9ja2pheCA9IGZ1bmN0aW9uKFplcHRvKSB7XHJcbiAgICAgICAgICAgIHZhciBfX29yaWdpbmFsX2FqYXggPSBaZXB0by5hamF4O1xyXG4gICAgICAgICAgICB2YXIgeGhyID0ge1xyXG4gICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTogNCxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlVGV4dDogXCJcIixcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlWE1MOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IDIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGltZW91dFRpbWVyOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIFplcHRvLmFqYXggPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGZpbmQob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKGl0ZW0udGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnN1Y2Nlc3MpIG9wdGlvbnMuc3VjY2VzcyhkYXRhLCB4aHIsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbXBsZXRlKSBvcHRpb25zLmNvbXBsZXRlKHhoci5zdGF0dXMsIHhociwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhocjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBfX29yaWdpbmFsX2FqYXguY2FsbChaZXB0bywgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrLm1vY2tqYXgoWmVwdG8pO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBLSVNTWSAhPSBcInVuZGVmaW5lZFwiICYmIEtJU1NZLmFkZCkge1xyXG4gICAgICAgIE1vY2subW9ja2pheCA9IGZ1bmN0aW9uIG1vY2tqYXgoS0lTU1kpIHtcclxuICAgICAgICAgICAgdmFyIF9vcmlnaW5hbF9hamF4ID0gS0lTU1kuaW87XHJcbiAgICAgICAgICAgIHZhciB4aHIgPSB7XHJcbiAgICAgICAgICAgICAgICByZWFkeVN0YXRlOiA0LFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VYTUw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogMixcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0VGltZXI6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgS0lTU1kuaW8gPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGZpbmQob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKGl0ZW0udGVtcGxhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLnN1Y2Nlc3MpIG9wdGlvbnMuc3VjY2VzcyhkYXRhLCB4aHIsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLmNvbXBsZXRlKSBvcHRpb25zLmNvbXBsZXRlKHhoci5zdGF0dXMsIHhociwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHhocjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBfb3JpZ2luYWxfYWpheC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIF9vcmlnaW5hbF9hamF4KSB7XHJcbiAgICAgICAgICAgICAgICBLSVNTWS5pb1tuYW1lXSA9IF9vcmlnaW5hbF9hamF4W25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8qISBzcmMvZXhwb3NlLmpzICovXHJcbiAgICBNb2NrLlV0aWwgPSBVdGlsO1xyXG4gICAgTW9jay5SYW5kb20gPSBSYW5kb207XHJcbiAgICBNb2NrLmhlcmVkb2MgPSBVdGlsLmhlcmVkb2M7XHJcbiAgICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xyXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gTW9jaztcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcclxuICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb2NrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmNtZCkge1xyXG4gICAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1vY2s7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLk1vY2sgPSBNb2NrO1xyXG4gICAgdGhpcy5SYW5kb20gPSBSYW5kb207XHJcbiAgICBpZiAodHlwZW9mIEtJU1NZICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBVdGlsLmVhY2goWyBcIm1vY2tcIiwgXCJjb21wb25lbnRzL21vY2svXCIsIFwibW9jay9kaXN0L21vY2tcIiwgXCJnYWxsZXJ5L01vY2svMC4xLjEvXCIsIFwiZ2FsbGVyeS9Nb2NrLzAuMS4yL1wiLCBcImdhbGxlcnkvTW9jay8wLjEuMy9cIiBdLCBmdW5jdGlvbiByZWdpc3RlcihuYW1lKSB7XHJcbiAgICAgICAgICAgIEtJU1NZLmFkZChuYW1lLCBmdW5jdGlvbihTKSB7XHJcbiAgICAgICAgICAgICAgICBNb2NrLm1vY2tqYXgoUyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTW9jaztcclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgcmVxdWlyZXM6IFsgXCJhamF4XCIgXVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIC8qISBzcmMvbW9jazR0cGwuanMgKi9cclxuICAgIChmdW5jdGlvbih1bmRlZmluZWQpIHtcclxuICAgICAgICB2YXIgTW9jazRUcGwgPSB7XHJcbiAgICAgICAgICAgIHZlcnNpb246IFwiMC4wLjFcIlxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKCF0aGlzLk1vY2spIG1vZHVsZS5leHBvcnRzID0gTW9jazRUcGw7XHJcbiAgICAgICAgTW9jay50cGwgPSBmdW5jdGlvbihpbnB1dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1vY2s0VHBsLm1vY2soaW5wdXQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2sucGFyc2UgPSBmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gSGFuZGxlYmFycy5wYXJzZShpbnB1dCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFRwbC5tb2NrID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIGhlbHBlcnMgPSBoZWxwZXJzID8gVXRpbC5leHRlbmQoe30sIGhlbHBlcnMsIEhhbmRsZWJhcnMuaGVscGVycykgOiBIYW5kbGViYXJzLmhlbHBlcnM7XHJcbiAgICAgICAgICAgIHBhcnRpYWxzID0gcGFydGlhbHMgPyBVdGlsLmV4dGVuZCh7fSwgcGFydGlhbHMsIEhhbmRsZWJhcnMucGFydGlhbHMpIDogSGFuZGxlYmFycy5wYXJ0aWFscztcclxuICAgICAgICAgICAgcmV0dXJuIEhhbmRsZS5nZW4oaW5wdXQsIG51bGwsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBIYW5kbGUgPSB7XHJcbiAgICAgICAgICAgIGRlYnVnOiBNb2NrNFRwbC5kZWJ1ZyB8fCBmYWxzZSxcclxuICAgICAgICAgICAgZXh0ZW5kOiBVdGlsLmV4dGVuZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLmdlbiA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKG5vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXN0ID0gSGFuZGxlYmFycy5wYXJzZShub2RlKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBIYW5kbGUucGFyc2VPcHRpb25zKG5vZGUsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBIYW5kbGUuZ2VuKGFzdCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgWyB7fSBdO1xyXG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICAgICAgaWYgKHRoaXNbbm9kZS50eXBlXSA9PT0gVXRpbC5ub29wKSByZXR1cm47XHJcbiAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoID0gb3B0aW9ucy5fX3BhdGggfHwgW107XHJcbiAgICAgICAgICAgIGlmIChNb2NrNFRwbC5kZWJ1ZyB8fCBIYW5kbGUuZGVidWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmdyb3VwKFwiW1wiICsgbm9kZS50eXBlICsgXCJdXCIsIEpTT04uc3RyaW5naWZ5KG5vZGUpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW29wdGlvbnNdXCIsIG9wdGlvbnMuX19wYXRoLmxlbmd0aCwgSlNPTi5zdHJpbmdpZnkob3B0aW9ucykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwcmVMZW5ndGggPSBvcHRpb25zLl9fcGF0aC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXNbbm9kZS50eXBlXShub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnNwbGljZShwcmVMZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAoTW9jazRUcGwuZGVidWcgfHwgSGFuZGxlLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHRbY29udGV4dC5sZW5ndGggLSAxXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5wYXJzZU9wdGlvbnMgPSBmdW5jdGlvbihpbnB1dCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgckNvbW1lbnQgPSAvPCEtLVxccypcXG4qTW9ja1xccypcXG4qKFtcXHdcXFddKz8pXFxzKlxcbiotLT4vZztcclxuICAgICAgICAgICAgdmFyIGNvbW1lbnRzID0gaW5wdXQubWF0Y2gockNvbW1lbnQpLCByZXQgPSB7fSwgaSwgbWEsIG9wdGlvbjtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgY29tbWVudHMgJiYgaSA8IGNvbW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByQ29tbWVudC5sYXN0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgbWEgPSByQ29tbWVudC5leGVjKGNvbW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IG5ldyBGdW5jdGlvbihcInJldHVybiBcIiArIG1hWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBvcHRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBVdGlsLmV4dGVuZChyZXQsIG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFV0aWwuZXh0ZW5kKHJldCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUudmFsID0gZnVuY3Rpb24obmFtZSwgb3B0aW9ucywgY29udGV4dCwgZGVmKSB7XHJcbiAgICAgICAgICAgIGlmIChuYW1lICE9PSBvcHRpb25zLl9fcGF0aFtvcHRpb25zLl9fcGF0aC5sZW5ndGggLSAxXSkgdGhyb3cgbmV3IEVycm9yKG5hbWUgKyBcIiE9PVwiICsgb3B0aW9ucy5fX3BhdGgpO1xyXG4gICAgICAgICAgICBpZiAoTW9jazRUcGwuZGVidWcgfHwgSGFuZGxlLmRlYnVnKSBjb25zb2xlLmxvZyhcIltvcHRpb25zXVwiLCBuYW1lLCBvcHRpb25zLl9fcGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChkZWYgIT09IHVuZGVmaW5lZCkgZGVmID0gTW9jay5tb2NrKGRlZik7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9ja2VkID0gTW9jay5tb2NrKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcobW9ja2VkKSkgcmV0dXJuIG1vY2tlZDtcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lIGluIG1vY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2NrZWRbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNBcnJheShjb250ZXh0WzBdKSkgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmICE9PSB1bmRlZmluZWQgPyBkZWYgOiBuYW1lIHx8IFJhbmRvbS53b3JkKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUucHJvZ3JhbSA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5zdGF0ZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLnN0YXRlbWVudHNbaV0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLm11c3RhY2hlID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgdmFyIGksIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFswXSwgY29udGV4dExlbmd0aCA9IGNvbnRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAoVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0KSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dC5wdXNoKHt9KTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gY3VycmVudENvbnRleHRbY3VycmVudENvbnRleHQubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlLmlzSGVscGVyIHx8IGhlbHBlcnMgJiYgaGVscGVyc1tub2RlLmlkLnN0cmluZ10pIHtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlLnBhcmFtcy5sZW5ndGggPT09IDApIHt9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBub2RlLnBhcmFtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLnBhcmFtc1tpXSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmhhc2gpIHRoaXMuZ2VuKG5vZGUuaGFzaCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5pZCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IGNvbnRleHRMZW5ndGgpIGNvbnRleHQuc3BsaWNlKDAsIGNvbnRleHQubGVuZ3RoIC0gY29udGV4dExlbmd0aCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUuYmxvY2sgPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBub2RlLm11c3RhY2hlLmlkLnBhcnRzLCBpLCBsZW4sIGN1ciwgdmFsLCB0eXBlLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbMF0sIGNvbnRleHRMZW5ndGggPSBjb250ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKG5vZGUuaW52ZXJzZSkge31cclxuICAgICAgICAgICAgaWYgKG5vZGUubXVzdGFjaGUuaXNIZWxwZXIgfHwgaGVscGVycyAmJiBoZWxwZXJzW25vZGUubXVzdGFjaGUuaWQuc3RyaW5nXSkge1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IHBhcnRzWzBdO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gKEhlbHBlcnNbdHlwZV0gfHwgSGVscGVycy5jdXN0b20pLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbMF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXIgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbChjdXIsIG9wdGlvbnMsIGNvbnRleHQsIHt9KTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtjdXJdID0gVXRpbC5pc0FycmF5KHZhbCkgJiYgW10gfHwgdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBVdGlsLnR5cGUoY3VycmVudENvbnRleHRbY3VyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIgfHwgdHlwZSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gY3VycmVudENvbnRleHRbY3VyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUucHJvZ3JhbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwudHlwZShjdXJyZW50Q29udGV4dCkgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHZhbC5sZW5ndGggfHwgUmFuZG9tLmludGVnZXIoMywgNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0LnB1c2godHlwZW9mIHZhbFtpXSAhPT0gXCJ1bmRlZmluZWRcIiA/IHZhbFtpXSA6IHt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChcIltdXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHRbY3VycmVudENvbnRleHQubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLnByb2dyYW0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgdGhpcy5nZW4obm9kZS5wcm9ncmFtLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gY29udGV4dExlbmd0aCkgY29udGV4dC5zcGxpY2UoMCwgY29udGV4dC5sZW5ndGggLSBjb250ZXh0TGVuZ3RoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5oYXNoID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgdmFyIHBhaXJzID0gbm9kZS5wYWlycywgcGFpciwgaSwgajtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwYWlyID0gcGFpcnNbaV07XHJcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAxOyBqIDwgcGFpci5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuKHBhaXJbal0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLklEID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBub2RlLnBhcnRzLCBpLCBsZW4sIGN1ciwgcHJldiwgZGVmLCB2YWwsIHR5cGUsIHZhbFR5cGUsIHByZU9wdGlvbnMsIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFtub2RlLmRlcHRoXSwgY29udGV4dExlbmd0aCA9IGNvbnRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc0FycmF5KGN1cnJlbnRDb250ZXh0KSkgY3VycmVudENvbnRleHQgPSBjb250ZXh0W25vZGUuZGVwdGggKyAxXTtcclxuICAgICAgICAgICAgaWYgKCFwYXJ0cy5sZW5ndGgpIHt9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXIgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gcGFydHNbaSAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZU9wdGlvbnMgPSBvcHRpb25zW3ByZXZdO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZiA9IGkgPT09IGxlbiAtIDEgPyBjdXJyZW50Q29udGV4dFtjdXJdIDoge307XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBVdGlsLnR5cGUoY3VycmVudENvbnRleHRbY3VyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsVHlwZSA9IFV0aWwudHlwZSh2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgbGVuIC0gMSAmJiB2YWxUeXBlICE9PSBcIm9iamVjdFwiICYmIHZhbFR5cGUgIT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpIDwgbGVuIC0gMSAmJiB0eXBlICE9PSBcIm9iamVjdFwiICYmIHR5cGUgIT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBVdGlsLnR5cGUoY3VycmVudENvbnRleHRbY3VyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIgfHwgdHlwZSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gY3VycmVudENvbnRleHRbY3VyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gY29udGV4dExlbmd0aCkgY29udGV4dC5zcGxpY2UoMCwgY29udGV4dC5sZW5ndGggLSBjb250ZXh0TGVuZ3RoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5wYXJ0aWFsID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgdmFyIG5hbWUgPSBub2RlLnBhcnRpYWxOYW1lLm5hbWUsIHBhcnRpYWwgPSBwYXJ0aWFscyAmJiBwYXJ0aWFsc1tuYW1lXSwgY29udGV4dExlbmd0aCA9IGNvbnRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAocGFydGlhbCkgSGFuZGxlLmdlbihwYXJ0aWFsLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IGNvbnRleHRMZW5ndGgpIGNvbnRleHQuc3BsaWNlKDAsIGNvbnRleHQubGVuZ3RoIC0gY29udGV4dExlbmd0aCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUuY29udGVudCA9IFV0aWwubm9vcDtcclxuICAgICAgICBIYW5kbGUuUEFSVElBTF9OQU1FID0gVXRpbC5ub29wO1xyXG4gICAgICAgIEhhbmRsZS5EQVRBID0gVXRpbC5ub29wO1xyXG4gICAgICAgIEhhbmRsZS5TVFJJTkcgPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgSGFuZGxlLklOVEVHRVIgPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgSGFuZGxlLkJPT0xFQU4gPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgSGFuZGxlLmNvbW1lbnQgPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgdmFyIEhlbHBlcnMgPSB7fTtcclxuICAgICAgICBIZWxwZXJzLmVhY2ggPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBsZW4sIGN1ciwgdmFsLCBwYXJ0cywgZGVmLCB0eXBlLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbMF07XHJcbiAgICAgICAgICAgIHBhcnRzID0gbm9kZS5tdXN0YWNoZS5wYXJhbXNbMF0ucGFydHM7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHBhcnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIGN1ciA9IHBhcnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZGVmID0gaSA9PT0gbGVuIC0gMSA/IFtdIDoge307XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbChjdXIsIG9wdGlvbnMsIGNvbnRleHQsIGRlZik7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtjdXJdID0gVXRpbC5pc0FycmF5KHZhbCkgJiYgW10gfHwgdmFsO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFV0aWwudHlwZShjdXJyZW50Q29udGV4dFtjdXJdKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gY3VycmVudENvbnRleHRbY3VyXTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIZWxwZXJzW1wiaWZcIl0gPSBIZWxwZXJzLnVubGVzcyA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IG5vZGUubXVzdGFjaGUucGFyYW1zLCBpLCBqLCBjdXIsIHZhbCwgcGFydHMsIGRlZiwgdHlwZSwgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0cyA9IHBhcmFtc1tpXS5wYXJ0cztcclxuICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBwYXJ0cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSBvcHRpb25zLl9fcGF0aC5wdXNoKHBhcnRzW2pdKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXIgPSBwYXJ0c1tqXTtcclxuICAgICAgICAgICAgICAgICAgICBkZWYgPSBqID09PSBwYXJ0cy5sZW5ndGggLSAxID8gXCJAQk9PTCgyLDEsdHJ1ZSlcIiA6IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwgZGVmKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gcGFydHMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB2YWwgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IHZhbCA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSBVdGlsLmlzQXJyYXkodmFsKSA/IFtdIDogdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBVdGlsLnR5cGUoY3VycmVudENvbnRleHRbY3VyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIgfHwgdHlwZSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gY3VycmVudENvbnRleHRbY3VyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhlbHBlcnNbXCJ3aXRoXCJdID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgaSwgY3VyLCB2YWwsIHBhcnRzLCBkZWYsIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFswXTtcclxuICAgICAgICAgICAgcGFydHMgPSBub2RlLm11c3RhY2hlLnBhcmFtc1swXS5wYXJ0cztcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIGN1ciA9IHBhcnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZGVmID0ge307XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbChjdXIsIG9wdGlvbnMsIGNvbnRleHQsIGRlZik7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIZWxwZXJzLmxvZyA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgICAgSGVscGVycy5jdXN0b20gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBsZW4sIGN1ciwgdmFsLCBwYXJ0cywgZGVmLCB0eXBlLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbMF07XHJcbiAgICAgICAgICAgIGlmIChub2RlLm11c3RhY2hlLnBhcmFtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2gobm9kZS5tdXN0YWNoZS5pZC5zdHJpbmcpO1xyXG4gICAgICAgICAgICAgICAgY3VyID0gbm9kZS5tdXN0YWNoZS5pZC5zdHJpbmc7XHJcbiAgICAgICAgICAgICAgICBkZWYgPSBcIkBCT09MKDIsMSx0cnVlKVwiO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHZhbDtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBVdGlsLnR5cGUoY3VycmVudENvbnRleHRbY3VyXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhcnRzID0gbm9kZS5tdXN0YWNoZS5wYXJhbXNbMF0ucGFydHM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2gocGFydHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ciA9IHBhcnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZiA9IGkgPT09IGxlbiAtIDEgPyBbXSA6IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwgZGVmKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtjdXJdID0gVXRpbC5pc0FycmF5KHZhbCkgJiYgW10gfHwgdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSBVdGlsLnR5cGUoY3VycmVudENvbnRleHRbY3VyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIgfHwgdHlwZSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gY3VycmVudENvbnRleHRbY3VyXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9O1xyXG4gICAgfSkuY2FsbCh0aGlzKTtcclxuICAgIC8qISBzcmMvbW9jazR4dHBsLmpzICovXHJcbiAgICAoZnVuY3Rpb24odW5kZWZpbmVkKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBLSVNTWSA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gICAgICAgIHZhciBNb2NrNFhUcGwgPSB7XHJcbiAgICAgICAgICAgIGRlYnVnOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIFhUZW1wbGF0ZTtcclxuICAgICAgICBLSVNTWS51c2UoXCJ4dGVtcGxhdGVcIiwgZnVuY3Rpb24oUywgVCkge1xyXG4gICAgICAgICAgICBYVGVtcGxhdGUgPSBUO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICghdGhpcy5Nb2NrKSBtb2R1bGUuZXhwb3J0cyA9IE1vY2s0WFRwbDtcclxuICAgICAgICBNb2NrLnh0cGwgPSBmdW5jdGlvbihpbnB1dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1vY2s0WFRwbC5tb2NrKGlucHV0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrLnhwYXJzZSA9IGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBYVGVtcGxhdGUuY29tcGlsZXIucGFyc2UoaW5wdXQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLm1vY2sgPSBmdW5jdGlvbihpbnB1dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgaGVscGVycyA9IGhlbHBlcnMgPyBVdGlsLmV4dGVuZCh7fSwgaGVscGVycywgWFRlbXBsYXRlLlJ1blRpbWUuY29tbWFuZHMpIDogWFRlbXBsYXRlLlJ1blRpbWUuY29tbWFuZHM7XHJcbiAgICAgICAgICAgIHBhcnRpYWxzID0gcGFydGlhbHMgPyBVdGlsLmV4dGVuZCh7fSwgcGFydGlhbHMsIFhUZW1wbGF0ZS5SdW5UaW1lLnN1YlRwbHMpIDogWFRlbXBsYXRlLlJ1blRpbWUuc3ViVHBscztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuKGlucHV0LCBudWxsLCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywge30pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLnBhcnNlID0gZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFhUZW1wbGF0ZS5jb21waWxlci5wYXJzZShpbnB1dCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwuZ2VuID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKE1vY2s0WFRwbC5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW3RwbCAgICBdXFxuXCIsIG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGFzdCA9IHRoaXMucGFyc2Uobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gdGhpcy5wYXJzZU9wdGlvbnMobm9kZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZ2VuKGFzdCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IFsge30gXTtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgICAgIG5vZGUudHlwZSA9IG5vZGUudHlwZTtcclxuICAgICAgICAgICAgaWYgKHRoaXNbbm9kZS50eXBlXSA9PT0gVXRpbC5ub29wKSByZXR1cm47XHJcbiAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoID0gb3B0aW9ucy5fX3BhdGggfHwgW107XHJcbiAgICAgICAgICAgIGlmIChNb2NrNFhUcGwuZGVidWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmdyb3VwKFwiW1wiICsgbm9kZS50eXBlICsgXCJdXCIsIEpTT04uc3RyaW5naWZ5KG5vZGUpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW2NvbnRleHRdXCIsIFwiW2JlZm9yZV1cIiwgY29udGV4dC5sZW5ndGgsIEpTT04uc3RyaW5naWZ5KGNvbnRleHQpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW29wdGlvbnNdXCIsIFwiW2JlZm9yZV1cIiwgb3B0aW9ucy5fX3BhdGgubGVuZ3RoLCBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltvdGhlciAgXVwiLCBcIltiZWZvcmVdXCIsIEpTT04uc3RyaW5naWZ5KG90aGVyKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHByZUxlbmd0aCA9IG9wdGlvbnMuX19wYXRoLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpc1tub2RlLnR5cGVdKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIGlmIChNb2NrNFhUcGwuZGVidWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW19fcGF0aCBdXCIsIFwiW2FmdGVyIF1cIiwgb3B0aW9ucy5fX3BhdGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghb3RoZXIuaG9sZCB8fCB0eXBlb2Ygb3RoZXIuaG9sZCA9PT0gXCJmdW5jdGlvblwiICYmICFvdGhlci5ob2xkKG5vZGUsIG9wdGlvbnMsIGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5zcGxpY2UocHJlTGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoTW9jazRYVHBsLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltjb250ZXh0XVwiLCBcIlthZnRlciBdXCIsIGNvbnRleHQubGVuZ3RoLCBKU09OLnN0cmluZ2lmeShjb250ZXh0KSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmdyb3VwRW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRleHRbY29udGV4dC5sZW5ndGggLSAxXTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5wYXJzZU9wdGlvbnMgPSBmdW5jdGlvbihpbnB1dCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgckNvbW1lbnQgPSAvPCEtLVxccypcXG4qTW9ja1xccypcXG4qKFtcXHdcXFddKz8pXFxzKlxcbiotLT4vZztcclxuICAgICAgICAgICAgdmFyIGNvbW1lbnRzID0gaW5wdXQubWF0Y2gockNvbW1lbnQpLCByZXQgPSB7fSwgaSwgbWEsIG9wdGlvbjtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgY29tbWVudHMgJiYgaSA8IGNvbW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICByQ29tbWVudC5sYXN0SW5kZXggPSAwO1xyXG4gICAgICAgICAgICAgICAgbWEgPSByQ29tbWVudC5leGVjKGNvbW1lbnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IG5ldyBGdW5jdGlvbihcInJldHVybiBcIiArIG1hWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBvcHRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBVdGlsLmV4dGVuZChyZXQsIG9wdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFV0aWwuZXh0ZW5kKHJldCwgb3B0aW9ucyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwucGFyc2VWYWwgPSBmdW5jdGlvbihleHByLCBvYmplY3QpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gcXVlcnlBcnJheShwcm9wLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQgPT09IFwib2JqZWN0XCIgJiYgcHJvcCBpbiBjb250ZXh0KSByZXR1cm4gWyBjb250ZXh0W3Byb3BdIF07XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRleHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQucHVzaC5hcHBseShyZXQsIHF1ZXJ5KHByb3AsIFsgY29udGV4dFtpXSBdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHF1ZXJ5T2JqZWN0KHByb3AsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGV4dCA9PT0gXCJvYmplY3RcIiAmJiBwcm9wIGluIGNvbnRleHQpIHJldHVybiBbIGNvbnRleHRbcHJvcF0gXTtcclxuICAgICAgICAgICAgICAgIHZhciByZXQgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2guYXBwbHkocmV0LCBxdWVyeShwcm9wLCBbIGNvbnRleHRba2V5XSBdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHF1ZXJ5KHByb3AsIHNldCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZXQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNldFtpXSAhPT0gXCJvYmplY3RcIikgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3AgaW4gc2V0W2ldKSByZXQucHVzaChzZXRbaV1bcHJvcF0pOyBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2guYXBwbHkocmV0LCBVdGlsLmlzQXJyYXkoc2V0W2ldKSA/IHF1ZXJ5QXJyYXkocHJvcCwgc2V0W2ldKSA6IHF1ZXJ5T2JqZWN0KHByb3AsIHNldFtpXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gcGFyc2UoZXhwciwgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gdHlwZW9mIGV4cHIgPT09IFwic3RyaW5nXCIgPyBleHByLnNwbGl0KFwiLlwiKSA6IGV4cHIuc2xpY2UoMCksIHNldCA9IFsgY29udGV4dCBdO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUgKHBhcnRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldCA9IHF1ZXJ5KHBhcnRzLnNoaWZ0KCksIHNldCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2V0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZShleHByLCBvYmplY3QpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLnZhbCA9IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnMsIGNvbnRleHQsIGRlZikge1xyXG4gICAgICAgICAgICBpZiAobmFtZSAhPT0gb3B0aW9ucy5fX3BhdGhbb3B0aW9ucy5fX3BhdGgubGVuZ3RoIC0gMV0pIHRocm93IG5ldyBFcnJvcihuYW1lICsgXCIhPT1cIiArIG9wdGlvbnMuX19wYXRoKTtcclxuICAgICAgICAgICAgaWYgKGRlZiAhPT0gdW5kZWZpbmVkKSBkZWYgPSBNb2NrLm1vY2soZGVmKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb2NrZWQgPSBNb2NrLm1vY2sob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhtb2NrZWQpKSByZXR1cm4gbW9ja2VkO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IE1vY2s0WFRwbC5wYXJzZVZhbChvcHRpb25zLl9fcGF0aCwgbW9ja2VkKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXQubGVuZ3RoID4gMCkgcmV0dXJuIHJldFswXTtcclxuICAgICAgICAgICAgICAgIGlmIChuYW1lIGluIG1vY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2NrZWRbbmFtZV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNBcnJheShjb250ZXh0WzBdKSkgcmV0dXJuIHt9O1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmICE9PSB1bmRlZmluZWQgPyBkZWYgOiBuYW1lO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLnByb2dyYW0gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLnN0YXRlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUuc3RhdGVtZW50c1tpXSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgbm9kZS5pbnZlcnNlICYmIGogPCBub2RlLmludmVyc2UubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUuaW52ZXJzZVtqXSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLmJsb2NrID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0TGVuZ3RoID0gY29udGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUudHBsLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgVXRpbC5leHRlbmQoe30sIG90aGVyLCB7XHJcbiAgICAgICAgICAgICAgICBkZWY6IHt9LFxyXG4gICAgICAgICAgICAgICAgaG9sZDogdHJ1ZVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbMF0sIG1vY2tlZCwgaSwgbGVuO1xyXG4gICAgICAgICAgICBpZiAoVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0KSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICBtb2NrZWQgPSB0aGlzLnZhbChvcHRpb25zLl9fcGF0aFtvcHRpb25zLl9fcGF0aC5sZW5ndGggLSAxXSwgb3B0aW9ucywgY29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICBsZW4gPSBtb2NrZWQgJiYgbW9ja2VkLmxlbmd0aCB8fCBSYW5kb20uaW50ZWdlcigzLCA3KTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0LnB1c2gobW9ja2VkICYmIG1vY2tlZFtpXSAhPT0gdW5kZWZpbmVkID8gbW9ja2VkW2ldIDoge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0W2N1cnJlbnRDb250ZXh0Lmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLnByb2dyYW0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgdGhpcy5nZW4obm9kZS5wcm9ncmFtLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICBpZiAoIW90aGVyLmhvbGQgfHwgdHlwZW9mIG90aGVyLmhvbGQgPT09IFwiZnVuY3Rpb25cIiAmJiAhb3RoZXIuaG9sZChub2RlLCBvcHRpb25zLCBjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zcGxpY2UoMCwgY29udGV4dC5sZW5ndGggLSBjb250ZXh0TGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLnRwbCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5wYXJhbXMgJiYgbm9kZS5wYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBvdGhlciA9IFV0aWwuZXh0ZW5kKHt9LCBvdGhlciwge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlYWNoOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZlwiOiBcIkBCT09MKDIsMSx0cnVlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3M6IFwiQEJPT0woMiwxLGZhbHNlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpdGhcIjoge31cclxuICAgICAgICAgICAgICAgICAgICB9W25vZGUucGF0aC5zdHJpbmddLFxyXG4gICAgICAgICAgICAgICAgICAgIGhvbGQ6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFjaDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZlwiOiBmdW5jdGlvbihfLCBfXywgX19fLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzOiBmdW5jdGlvbihfLCBfXywgX19fLCBuYW1lLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aXRoXCI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IGZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgfVtub2RlLnBhdGguc3RyaW5nXVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgaW5wdXQ7IGkgPCBub2RlLnBhcmFtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnBhdGguc3RyaW5nID09PSBcImluY2x1ZGVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dCA9IHBhcnRpYWxzICYmIHBhcnRpYWxzW25vZGUucGFyYW1zW2ldLnZhbHVlXTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaW5wdXQgPSBub2RlLnBhcmFtc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXQpIHRoaXMuZ2VuKGlucHV0LCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUuaGFzaCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUucGF0aCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLnRwbEV4cHJlc3Npb24gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5leHByZXNzaW9uLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLmNvbnRlbnQgPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLnVuYXJ5RXhwcmVzc2lvbiA9IFV0aWwubm9vcDtcclxuICAgICAgICBNb2NrNFhUcGwubXVsdGlwbGljYXRpdmVFeHByZXNzaW9uID0gTW9jazRYVHBsLmFkZGl0aXZlRXhwcmVzc2lvbiA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICB0aGlzLmdlbihub2RlLm9wMSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIFV0aWwuZXh0ZW5kKHt9LCBvdGhlciwge1xyXG4gICAgICAgICAgICAgICAgZGVmOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5vcDIudHlwZSA9PT0gXCJudW1iZXJcIiA/IG5vZGUub3AyLnZhbHVlLmluZGV4T2YoXCIuXCIpID4gLTEgPyBSYW5kb20uZmxvYXQoLU1hdGgucG93KDEwLCAxMCksIE1hdGgucG93KDEwLCAxMCksIDEsIE1hdGgucG93KDEwLCA2KSkgOiBSYW5kb20uaW50ZWdlcigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfSgpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5vcDIsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBVdGlsLmV4dGVuZCh7fSwgb3RoZXIsIHtcclxuICAgICAgICAgICAgICAgIGRlZjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUub3AxLnR5cGUgPT09IFwibnVtYmVyXCIgPyBub2RlLm9wMS52YWx1ZS5pbmRleE9mKFwiLlwiKSA+IC0xID8gUmFuZG9tLmZsb2F0KC1NYXRoLnBvdygxMCwgMTApLCBNYXRoLnBvdygxMCwgMTApLCAxLCBNYXRoLnBvdygxMCwgNikpIDogUmFuZG9tLmludGVnZXIoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH0oKVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwucmVsYXRpb25hbEV4cHJlc3Npb24gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5vcDEsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUub3AyLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLmVxdWFsaXR5RXhwcmVzc2lvbiA9IFV0aWwubm9vcDtcclxuICAgICAgICBNb2NrNFhUcGwuY29uZGl0aW9uYWxBbmRFeHByZXNzaW9uID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC5jb25kaXRpb25hbE9yRXhwcmVzc2lvbiA9IFV0aWwubm9vcDtcclxuICAgICAgICBNb2NrNFhUcGwuc3RyaW5nID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC5udW1iZXIgPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLmJvb2xlYW4gPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLmhhc2ggPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgdmFyIHBhaXJzID0gbm9kZS52YWx1ZSwga2V5O1xyXG4gICAgICAgICAgICBmb3IgKGtleSBpbiBwYWlycykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4ocGFpcnNba2V5XSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLmlkID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBjb250ZXh0TGVuZ3RoID0gY29udGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IG5vZGUucGFydHMsIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFtub2RlLmRlcHRoXSwgaSwgbGVuLCBjdXIsIGRlZiwgdmFsO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBmaXgoY3VycmVudENvbnRleHQsIGluZGV4LCBsZW5ndGgsIG5hbWUsIHZhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBVdGlsLnR5cGUoY3VycmVudENvbnRleHRbbmFtZV0pLCB2YWxUeXBlID0gVXRpbC50eXBlKHZhbCk7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWwgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IHZhbCA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiB2YWw7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IGxlbmd0aCAtIDEgJiYgIVV0aWwuaXNPYmplY3RPckFycmF5KHZhbCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbbmFtZV0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtuYW1lXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IGxlbmd0aCAtIDEgJiYgdHlwZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlICE9PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbbmFtZV0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlICE9PSBcImFycmF5XCIgJiYgdmFsVHlwZSAhPT0gXCJvYmplY3RcIiAmJiB2YWxUeXBlICE9PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W25hbWVdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRDb250ZXh0W25hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY3VycmVudENvbnRleHQpKSBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbbm9kZS5kZXB0aCArIDFdO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDAgJiYgcGFydHNbaV0gPT09IFwidGhpc1wiKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmICgvXih4aW5kZXh8eGNvdW50fHhrZXkpJC8udGVzdChwYXJ0c1tpXSkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDAgJiYgbGVuID09PSAxICYmIHBhcnRzW2ldIGluIGhlbHBlcnMpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBjdXIgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgICAgICAgIGRlZiA9IGkgPT09IGxlbiAtIDEgPyBvdGhlci5kZWYgIT09IHVuZGVmaW5lZCA/IG90aGVyLmRlZiA6IGNvbnRleHRbMF1bY3VyXSA6IHt9O1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgaWYgKE1vY2s0WFRwbC5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW2RlZiAgICBdXCIsIEpTT04uc3RyaW5naWZ5KGRlZikpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW3ZhbCAgICBdXCIsIEpTT04uc3RyaW5naWZ5KHZhbCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFsID0gZml4KGN1cnJlbnRDb250ZXh0LCBpLCBsZW4sIGN1ciwgdmFsKTtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzT2JqZWN0T3JBcnJheShjdXJyZW50Q29udGV4dFtjdXJdKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghb3RoZXIuaG9sZCB8fCB0eXBlb2Ygb3RoZXIuaG9sZCA9PT0gXCJmdW5jdGlvblwiICYmICFvdGhlci5ob2xkKG5vZGUsIG9wdGlvbnMsIGNvbnRleHQsIGN1ciwgdmFsKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zcGxpY2UoMCwgY29udGV4dC5sZW5ndGggLSBjb250ZXh0TGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KS5jYWxsKHRoaXMpO1xyXG59KS5jYWxsKHRoaXMpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvbW9jay5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDQgMTZcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBodW1vckhhbiBvbiAyMDE2LzUvMjAuXHJcbiAqL1xyXG52YXIgbW9ja1NlbGVjdCA9IHJlcXVpcmUoJ2NvbXBvbmVudC9tb2NrLXNlbGVjdC9tb2NrLXNlbGVjdC5qcycpO1xyXG52YXIgTW9jayA9IHJlcXVpcmUoJ21vY2snKTtcclxuXHJcbnZhciBtb2NrRGF0YSA9IE1vY2subW9jayhcclxuICAgIHtcclxuICAgICAgICAnZGF0YXwzLTUnOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdpZHwrMSc6IDEsXHJcbiAgICAgICAgICAgICAgICAnbmFtZXwxJzogWyfmlbDlraYnLCfor63mlocnLCfoi7Hor60nLCfniannkIYnLCfnlJ/niaknXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG4pO1xyXG52YXIgbW9ja0RhdGExID0gTW9jay5tb2NrKFxyXG4gICAge1xyXG4gICAgICAgICdkYXRhfDMtNSc6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ2lkfCsxJzogMSxcclxuICAgICAgICAgICAgICAgICduYW1lfDEnOiBbJ+aVsOWtpicsJ+ivreaWhycsJ+iLseivrScsJ+eJqeeQhicsJ+eUn+eJqSddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbik7XHJcblxyXG5tb2NrU2VsZWN0KCdkb20xJywgbW9ja0RhdGEsIGZ1bmN0aW9uKGlkKXtcclxuICAgIGNvbnNvbGUubG9nKGlkKTtcclxufSxmdW5jdGlvbigpe1xyXG4gICAgY29uc29sZS5sb2coJ+mhtemdojHlm57osIMnKTtcclxufSwnaWQxJyk7XHJcblxyXG5tb2NrU2VsZWN0KCdkb20yJywgbW9ja0RhdGExLCBmdW5jdGlvbihpZCl7XHJcbiAgICBjb25zb2xlLmxvZyhpZCk7XHJcbn0sZnVuY3Rpb24oKXtcclxuICAgIGNvbnNvbGUubG9nKCfpobXpnaIy5Zue6LCDJyk7XHJcbn0sJ2lkMicpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9kZW1vL3Rlc3QtbW9jay1zZWxlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1OFxuICoqIG1vZHVsZSBjaHVua3MgPSAxNlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=