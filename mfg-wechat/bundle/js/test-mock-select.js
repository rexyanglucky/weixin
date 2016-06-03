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
	        this.dom.undelegate().delegate('.name-wrap', 'touchstart', function(){
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

/***/ 37:
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
	var Mock = __webpack_require__(37);
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWNiMzViZjQ4M2QwMGY4YmJiNjA/YzRmMyoqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzPzg5NjYqKioqKioqKioqIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanM/ZGEwNCoqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCoqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L21vY2stc2VsZWN0LmpzP2I0MjcqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9jc3MvbW9jay1zZWxlY3QuY3NzPzhhMGEqKioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvY3NzL21vY2stc2VsZWN0LmNzcz8xMzk0KioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2ltZy9hcnJvdy1ib3R0b20ucG5nP2Y3ZjkqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9pbWcvYXJyb3ctdG9wLnBuZz9lNjJjKioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvdHBsL21vY2stc2VsZWN0LXRwbC50cGw/ZjdkZSoqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9zZWxlY3QtdWwtdHBsLnRwbD8zYzQ1KioqIiwid2VicGFjazovLy8uL2RlcC9tb2NrLmpzPzI0MDYiLCJ3ZWJwYWNrOi8vLy4vanMvZGVtby90ZXN0LW1vY2stc2VsZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3REFBdUQ7QUFDdkQ7O0FBRUEsOEJBQTZCLG1CQUFtQjs7QUFFaEQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7OztBQ3JQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLFlBQVk7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7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O0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTJDLHVDQUF1QztBQUNsRixjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLG1CQUFtQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBLFVB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Q0Q7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSxFQUFDLFEiLCJmaWxlIjoidGVzdC1tb2NrLXNlbGVjdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9tZmctd2VjaGF0L2J1bmRsZS9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGVjYjM1YmY0ODNkMDBmOGJiYjYwXG4gKiovIiwiLypUTU9ESlM6e30qL1xyXG4hZnVuY3Rpb24gKCkge1xyXG5cdGZ1bmN0aW9uIGEoYSwgYikge1xyXG5cdFx0cmV0dXJuICgvc3RyaW5nfGZ1bmN0aW9uLy50ZXN0KHR5cGVvZiBiKSA/IGggOiBnKShhLCBiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYihhLCBjKSB7XHJcblx0XHRyZXR1cm4gXCJzdHJpbmdcIiAhPSB0eXBlb2YgYSAmJiAoYyA9IHR5cGVvZiBhLCBcIm51bWJlclwiID09PSBjID8gYSArPSBcIlwiIDogYSA9IFwiZnVuY3Rpb25cIiA9PT0gYyA/IGIoYS5jYWxsKGEpKSA6IFwiXCIpLCBhXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjKGEpIHtcclxuXHRcdHJldHVybiBsW2FdXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkKGEpIHtcclxuXHRcdHJldHVybiBiKGEpLnJlcGxhY2UoLyYoPyFbXFx3I10rOyl8Wzw+XCInXS9nLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZShhLCBiKSB7XHJcblx0XHRpZiAobShhKSlmb3IgKHZhciBjID0gMCwgZCA9IGEubGVuZ3RoOyBkID4gYzsgYysrKWIuY2FsbChhLCBhW2NdLCBjLCBhKTsgZWxzZSBmb3IgKGMgaW4gYSliLmNhbGwoYSwgYVtjXSwgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGYoYSwgYikge1xyXG5cdFx0dmFyIGMgPSAvKFxcLylbXlxcL10rXFwxXFwuXFwuXFwxLywgZCA9IChcIi4vXCIgKyBhKS5yZXBsYWNlKC9bXlxcL10rJC8sIFwiXCIpLCBlID0gZCArIGI7XHJcblx0XHRmb3IgKGUgPSBlLnJlcGxhY2UoL1xcL1xcLlxcLy9nLCBcIi9cIik7IGUubWF0Y2goYyk7KWUgPSBlLnJlcGxhY2UoYywgXCIvXCIpO1xyXG5cdFx0cmV0dXJuIGVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGcoYiwgYykge1xyXG5cdFx0dmFyIGQgPSBhLmdldChiKSB8fCBpKHtmaWxlbmFtZTogYiwgbmFtZTogXCJSZW5kZXIgRXJyb3JcIiwgbWVzc2FnZTogXCJUZW1wbGF0ZSBub3QgZm91bmRcIn0pO1xyXG5cdFx0cmV0dXJuIGMgPyBkKGMpIDogZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaChhLCBiKSB7XHJcblx0XHRpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgYikge1xyXG5cdFx0XHR2YXIgYyA9IGI7XHJcblx0XHRcdGIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBrKGMpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHZhciBkID0galthXSA9IGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBiKGMsIGEpICsgXCJcIlxyXG5cdFx0XHR9IGNhdGNoIChkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGkoZCkoKVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGQucHJvdG90eXBlID0gYi5wcm90b3R5cGUgPSBuLCBkLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gYiArIFwiXCJcclxuXHRcdH0sIGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGkoYSkge1xyXG5cdFx0dmFyIGIgPSBcIntUZW1wbGF0ZSBFcnJvcn1cIiwgYyA9IGEuc3RhY2sgfHwgXCJcIjtcclxuXHRcdGlmIChjKWMgPSBjLnNwbGl0KFwiXFxuXCIpLnNsaWNlKDAsIDIpLmpvaW4oXCJcXG5cIik7IGVsc2UgZm9yICh2YXIgZCBpbiBhKWMgKz0gXCI8XCIgKyBkICsgXCI+XFxuXCIgKyBhW2RdICsgXCJcXG5cXG5cIjtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBcIm9iamVjdFwiID09IHR5cGVvZiBjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IoYiArIFwiXFxuXFxuXCIgKyBjKSwgYlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIGogPSBhLmNhY2hlID0ge30sIGsgPSB0aGlzLlN0cmluZywgbCA9IHtcclxuXHRcdFwiPFwiOiBcIiYjNjA7XCIsXHJcblx0XHRcIj5cIjogXCImIzYyO1wiLFxyXG5cdFx0J1wiJzogXCImIzM0O1wiLFxyXG5cdFx0XCInXCI6IFwiJiMzOTtcIixcclxuXHRcdFwiJlwiOiBcIiYjMzg7XCJcclxuXHR9LCBtID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYSkge1xyXG5cdFx0XHRyZXR1cm4gXCJbb2JqZWN0IEFycmF5XVwiID09PSB7fS50b1N0cmluZy5jYWxsKGEpXHJcblx0XHR9LCBuID0gYS51dGlscyA9IHtcclxuXHRcdCRoZWxwZXJzOiB7fSwgJGluY2x1ZGU6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XHJcblx0XHRcdHJldHVybiBhID0gZihjLCBhKSwgZyhhLCBiKVxyXG5cdFx0fSwgJHN0cmluZzogYiwgJGVzY2FwZTogZCwgJGVhY2g6IGVcclxuXHR9LCBvID0gYS5oZWxwZXJzID0gbi4kaGVscGVycztcclxuXHRhLmdldCA9IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRyZXR1cm4galthLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKV1cclxuXHR9LCBhLmhlbHBlciA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRvW2FdID0gYlxyXG5cdH0sIG1vZHVsZS5leHBvcnRzID0gYVxyXG59KCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgOCA5IDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4XG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgOSAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA5IDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzIwLlxyXG4gKi9cclxucmVxdWlyZSgnLi9jc3MvbW9jay1zZWxlY3QuY3NzJyk7XHJcbnZhciBzZWxlY3RUcGwgPSByZXF1aXJlKCdtb2NrLXNlbGVjdC10cGwnKTtcclxudmFyIHNlbGVjdFVsVHBsID0gcmVxdWlyZSgnc2VsZWN0LXVsLXRwbCcpO1xyXG5cclxuZnVuY3Rpb24gbW9ja1NlbGVjdChkb20sIGRhdGEsIGNhbGxiYWNrSWQsIGNhbGxiYWNrLCBpZCwgY2FsbEJhY2tGbGFnKXtcclxuICAgIHRoaXMuZG9tID0gJChcIi5cIiArIGRvbSk7XHJcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcclxuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIHRoaXMuaWQgPSAkKFwiI1wiICsgaWQpO1xyXG4gICAgdGhpcy5jYWxsQmFja0ZsYWcgPSBjYWxsQmFja0ZsYWc7XHJcbiAgICB0aGlzLmluaXREb20oKTtcclxuICAgIHRoaXMuaW5pdEJ0bnMoKTtcclxufVxyXG5tb2NrU2VsZWN0LnByb3RvdHlwZSA9IHtcclxuICAgIGluaXREb206IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kb20uaHRtbChzZWxlY3RUcGwodGhpcy5kYXRhKSk7XHJcbiAgICAgICAgdGhpcy5pZC5odG1sKHNlbGVjdFVsVHBsKHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCh0aGlzLmRvbS5maW5kKFwiLm5hbWVcIikuYXR0cignZGF0YS1pZCcpKTtcclxuICAgICAgICBpZiAodGhpcy5jYWxsQmFja0ZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsQmFja0ZsYWcodHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLmRvbS5vZmZzZXQoKTtcclxuICAgICAgICB0aGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5jc3Moe1xyXG4gICAgICAgICAgICAnbGVmdCc6IDAsXHJcbiAgICAgICAgICAgICd0b3AnOiBvZmZzZXQudG9wICsgNDJcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5jc3Moe1xyXG4gICAgICAgICAgICAnbWF4LWhlaWdodCc6ICQod2luZG93KS5oZWlnaHQoKSAtIG9mZnNldC5oZWlnaHQgLSBvZmZzZXQudG9wXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaW5pdEJ0bnM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/ngrnlh7vmmL7npLrkuIvmi4lcclxuICAgICAgICB2YXIgdFRoaXM9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kb20udW5kZWxlZ2F0ZSgpLmRlbGVnYXRlKCcubmFtZS13cmFwJywgJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHRUaGlzLmRvbSk7XHJcbiAgICAgICAgICAgIGlmICghKHRUaGlzLmRvbS5maW5kKCcubmFtZS13cmFwJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSkge1xyXG4gICAgICAgICAgICAgICAgJChcIi5tb2NrLXNlbGVjdFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmluZChcIi5uYW1lLXdyYXBcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5tb2NrLXVsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuZG9tLmZpbmQoXCIubW9jay1zZWxlY3RcIikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLnNob3coKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIubW9jay11bFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vY2stc2VsZWN0XCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5maW5kKFwiLm5hbWUtd3JhcFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmRvbS5maW5kKFwiLm1vY2stc2VsZWN0XCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+S4i+aLiea2iOWksVxyXG4gICAgICAgIHRoaXMuaWQuZGVsZWdhdGUoJ2xpJywgJ3RvdWNoZW5kJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdFRoaXMuaWQuZmluZChcImxpLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcyhcImFjdGl2ZVwiKS5maW5kKFwiLnJpZ2h0XCIpLnJlbW92ZUNsYXNzKFwiZGlzcGxheS1ub25lXCIpO1xyXG4gICAgICAgICAgICB0VGhpcy5kb20uZmluZCgnLm5hbWUtd3JhcCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5maW5kKFwiLm5hbWVcIikuaHRtbCgkKHRoaXMpLmZpbmQoXCIuaXRlbS1uYW1lXCIpLmh0bWwoKSkuYXR0cihcImRhdGEtaWRcIiwgJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKSk7XHJcbiAgICAgICAgICAgIHRUaGlzLmRvbS5maW5kKFwiLm1vY2stc2VsZWN0XCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgdFRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgdFRoaXMuY2FsbGJhY2tJZCh0VGhpcy5kb20uZmluZChcIi5uYW1lXCIpLmF0dHIoJ2RhdGEtaWQnKSk7XHJcbiAgICAgICAgICAgIGlmICh0VGhpcy5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbSwgZGF0YSwgY2FsbGJhY2tJZCwgY2FsbGJhY2ssIGlkLCBjYWxsQmFja0ZsYWcpe1xyXG4gICAgLyoqXHJcbiAgICAgKiAqIOaooeaLn+S4i+aLieahhue7hOS7tlxyXG4gICAgICog5ou/5YiwaWRcclxuICAgICAqIEBwYXJhbSBkb20gICAgICAg5LiL5ouJ5qGG54i257qnY2xhc3NcclxuICAgICAqIEBwYXJhbSBkYXRhICAgICAg5LiL5ouJ5pWw5o2u77yI5aSE55CG6L+H55qE5qC85byP5Li6e2RhdGE6IFt7aWQ6JycsbmFtZTonJ30se30se31dfe+8iSzlj6blpJbms6jmhI9vcmRlck51bSA+IDAgPyArb3JkZXJOdW0gOiAnJ1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrSWQgICAgICDpgJrov4flm57osIPkvKDnu5nkuKrkurrpobXpnaLpnIDopoHnmoRpZFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrICAgICAgICDkuKrkurrpobXpnaLnmoTlm57osIPlpITnkIZcclxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAg5a2Y5pS+5LiL5ouJ6YCJ6aG555qEaWRcclxuICAgICAqIEBwYXJhbSBjYWxsQmFja0ZsYWfvvIjpnZ7lv4XkvKDvvIkgIOWRiuiviemhtemdouaooeadv+a4suafk+WujOS6huacieS6hmlk562J5Y+C5pWwIOWPr+S7pea4suafk+S4quS6uumhtemdouS6hlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gbmV3IG1vY2tTZWxlY3QoZG9tLCBkYXRhLCBjYWxsYmFja0lkLCBjYWxsYmFjaywgaWQsIGNhbGxCYWNrRmxhZyk7XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvbW9jay1zZWxlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxNSAxOFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbW9jay1zZWxlY3QuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL21vY2stc2VsZWN0LmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL21vY2stc2VsZWN0LmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvY3NzL21vY2stc2VsZWN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCA5IDEyIDE1IDE4XG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubW9jay1zZWxlY3R7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xcclxcbiAgICBoZWlnaHQ6IDQycHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgYm9yZGVyOm5vbmU7XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAubmFtZS13cmFwLmFjdGl2ZXtcXHJcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXHJcXG59XFxyXFxuLm1vY2stdWx7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXHJcXG4gICAgei1pbmRleDogMTAwO1xcclxcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q5ZDlkOTtcXHJcXG4gICAgd2lkdGg6IDkzLjYlO1xcclxcbiAgICBvdmVyZmxvdy15OiBzY3JvbGw7XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAubmFtZS13cmFwe1xcclxcbiAgICBjb2xvcjogI2ZmZjtcXHJcXG4gICAgaGVpZ2h0OiA0MnB4O1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLmJne1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxyXFxuICAgIGhlaWdodDogNnB4O1xcclxcbiAgICB3aWR0aDogMTNweDtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5uYW1lLXdyYXAgLmJne1xcclxcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vaW1nL2Fycm93LWJvdHRvbS5wbmdcIikgKyBcIikgY2VudGVyIGNlbnRlciBuby1yZXBlYXQ7XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAubmFtZS13cmFwLmFjdGl2ZXtcXHJcXG4gICAgY29sb3I6ICMwMGQ1MzU7XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAubmFtZS13cmFwLmFjdGl2ZSAuYmcge1xcclxcbiAgICBiYWNrZ3JvdW5kOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vaW1nL2Fycm93LXRvcC5wbmdcIikgKyBcIikgY2VudGVyIGNlbnRlciBuby1yZXBlYXQ7XFxyXFxufVxcclxcbi5tb2NrLXVsIGxpe1xcclxcbiAgICBtYXJnaW46MDtcXHJcXG4gICAgY29sb3I6ICMzMzMzMzM7XFxyXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxyXFxuICAgIGhlaWdodDogNDJweDtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDQycHg7XFxyXFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZDlkOWQ5O1xcclxcbn1cXHJcXG4ubW9jay11bCBsaSAucmlnaHR7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIGZsb2F0OiByaWdodDtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xcclxcbn1cXHJcXG4ubW9jay11bCBsaS5hY3RpdmUgLnJpZ2h0e1xcclxcbiAgICBkaXNwbGF5OiBpbmxpbmU7XFxyXFxufVxcclxcbi5tb2NrLXVsIGxpLmFjdGl2ZXtcXHJcXG4gICAgY29sb3I6ICMwMGQ1MzU7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2Nzcy9tb2NrLXNlbGVjdC5jc3NcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxNSAxOFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUEwQUFBQUdDQVlBQUFBWUxCUy9BQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQTRKcFZGaDBXRTFNT21OdmJTNWhaRzlpWlM1NGJYQUFBQUFBQUR3L2VIQmhZMnRsZENCaVpXZHBiajBpNzd1L0lpQnBaRDBpVnpWTk1FMXdRMlZvYVVoNmNtVlRlazVVWTNwcll6bGtJajgrSUR4NE9uaHRjRzFsZEdFZ2VHMXNibk02ZUQwaVlXUnZZbVU2Ym5NNmJXVjBZUzhpSUhnNmVHMXdkR3M5SWtGa2IySmxJRmhOVUNCRGIzSmxJRFV1TXkxak1ERXhJRFkyTGpFME5UWTJNU3dnTWpBeE1pOHdNaTh3TmkweE5EbzFOam95TnlBZ0lDQWdJQ0FnSWo0Z1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNGdQSEprWmpwRVpYTmpjbWx3ZEdsdmJpQnlaR1k2WVdKdmRYUTlJaUlnZUcxc2JuTTZlRzF3VFUwOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOXRiUzhpSUhodGJHNXpPbk4wVW1WbVBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZjMVI1Y0dVdlVtVnpiM1Z5WTJWU1pXWWpJaUI0Yld4dWN6cDRiWEE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM4aUlIaHRjRTFOT2s5eWFXZHBibUZzUkc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRwaFlXTmhNemd5WkMwM1pUZG1MVFJsTURNdFlXUXdNeTFsWVRKa1kyVXhOakZoTVdRaUlIaHRjRTFOT2tSdlkzVnRaVzUwU1VROUluaHRjQzVrYVdRNk1UWXdRa1E0UmpneU1FSTJNVEZGTmprNFFqQkdNekZGTmtOR1FUZ3hNRE1pSUhodGNFMU5Pa2x1YzNSaGJtTmxTVVE5SW5odGNDNXBhV1E2TVRZd1FrUTRSamN5TUVJMk1URkZOams0UWpCR016RkZOa05HUVRneE1ETWlJSGh0Y0RwRGNtVmhkRzl5Vkc5dmJEMGlRV1J2WW1VZ1VHaHZkRzl6YUc5d0lFTkRJREl3TVRVZ0tFMWhZMmx1ZEc5emFDa2lQaUE4ZUcxd1RVMDZSR1Z5YVhabFpFWnliMjBnYzNSU1pXWTZhVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRG93TmpreE1rTkRSVGxCTWpCRk5qRXhPRVpDUXpnNFF6SXhOMFF5UlVKR09TSWdjM1JTWldZNlpHOWpkVzFsYm5SSlJEMGlZV1J2WW1VNlpHOWphV1E2Y0dodmRHOXphRzl3T21ZeFl6azVNamd4TFRNNE5XRXRNVEUzT1MxaE16VmlMVGt6TlRVMlpUY3lNakppTlNJdlBpQThMM0prWmpwRVpYTmpjbWx3ZEdsdmJqNGdQQzl5WkdZNlVrUkdQaUE4TDNnNmVHMXdiV1YwWVQ0Z1BEOTRjR0ZqYTJWMElHVnVaRDBpY2lJL1BoZUhlNThBQUFCVlNVUkJWSGphWXZqLy83OE9FTi83RHdHZjhPRC9VSFU2REVBQ2hFMlJKSENCVDFCMUREQk5JQ3dNeEJkd2FMZ0FsV2RBMXdUQ1hFQjhHRTNEWWFnNEF5NU5NTHdOcW1FYk5ubGNta0E0QzVjY1FJQUJBUEdpQzBwc2k5YkZBQUFBQUVsRlRrU3VRbUNDXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9pbWcvYXJyb3ctYm90dG9tLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCA5IDEyIDE1IDE4XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQTBBQUFBR0NBWUFBQUFZTEJTL0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBNEpwVkZoMFdFMU1PbU52YlM1aFpHOWlaUzU0YlhBQUFBQUFBRHcvZUhCaFkydGxkQ0JpWldkcGJqMGk3N3UvSWlCcFpEMGlWelZOTUUxd1EyVm9hVWg2Y21WVGVrNVVZM3ByWXpsa0lqOCtJRHg0T25odGNHMWxkR0VnZUcxc2JuTTZlRDBpWVdSdlltVTZibk02YldWMFlTOGlJSGc2ZUcxd2RHczlJa0ZrYjJKbElGaE5VQ0JEYjNKbElEVXVNeTFqTURFeElEWTJMakUwTlRZMk1Td2dNakF4TWk4d01pOHdOaTB4TkRvMU5qb3lOeUFnSUNBZ0lDQWdJajRnUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0Z1BISmtaanBFWlhOamNtbHdkR2x2YmlCeVpHWTZZV0p2ZFhROUlpSWdlRzFzYm5NNmVHMXdUVTA5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5dGJTOGlJSGh0Ykc1ek9uTjBVbVZtUFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdmMxUjVjR1V2VW1WemIzVnlZMlZTWldZaklpQjRiV3h1Y3pwNGJYQTlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzhpSUhodGNFMU5Pazl5YVdkcGJtRnNSRzlqZFcxbGJuUkpSRDBpZUcxd0xtUnBaRHBoWVdOaE16Z3laQzAzWlRkbUxUUmxNRE10WVdRd015MWxZVEprWTJVeE5qRmhNV1FpSUhodGNFMU5Pa1J2WTNWdFpXNTBTVVE5SW5odGNDNWthV1E2TUVGQk5VUXlSVFl5TUVJMk1URkZOamcwT1VaRE5qWTFSRGRGTVVORk1FSWlJSGh0Y0UxTk9rbHVjM1JoYm1ObFNVUTlJbmh0Y0M1cGFXUTZNRUZCTlVReVJUVXlNRUkyTVRGRk5qZzBPVVpETmpZMVJEZEZNVU5GTUVJaUlIaHRjRHBEY21WaGRHOXlWRzl2YkQwaVFXUnZZbVVnVUdodmRHOXphRzl3SUVORElESXdNVFVnS0UxaFkybHVkRzl6YUNraVBpQThlRzF3VFUwNlJHVnlhWFpsWkVaeWIyMGdjM1JTWldZNmFXNXpkR0Z1WTJWSlJEMGllRzF3TG1scFpEb3dOamt4TWtORFJUbEJNakJGTmpFeE9FWkNRemc0UXpJeE4wUXlSVUpHT1NJZ2MzUlNaV1k2Wkc5amRXMWxiblJKUkQwaVlXUnZZbVU2Wkc5amFXUTZjR2h2ZEc5emFHOXdPbVl4WXprNU1qZ3hMVE00TldFdE1URTNPUzFoTXpWaUxUa3pOVFUyWlRjeU1qSmlOU0l2UGlBOEwzSmtaanBFWlhOamNtbHdkR2x2Ymo0Z1BDOXlaR1k2VWtSR1BpQThMM2c2ZUcxd2JXVjBZVDRnUEQ5NGNHRmphMlYwSUdWdVpEMGljaUkvUG1scDk0NEFBQUNlU1VSQlZIamFZdmovLzc4T0VOLzdEd0dmUURqaldmc3ZFSWJ4b2ZnL1ZKME9BOE5WVXdZZ3d4UW0wZmhxOW4rZ0dCaUQyRWpnRTFRZEExZ1RWS053Nll0SnoyRWFZTGpwMVJ5UWhnc2dlYWc2Qmthd0pnaW9CK0lHQml5QWk0bWo5ZHUvSHpVZzluK3RVd3dzVVBGK0lDNWd3QUdBR3FxQkZEY1FGNEw0SUUzNVVBM2ZnZmdQVENFckl3dnI3LzkvZmtPNUxGQTFENEI0SWtDQUFRRFdFWXRMSEt2ZEl3QUFBQUJKUlU1RXJrSmdnZz09XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9pbWcvYXJyb3ctdG9wLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCA5IDEyIDE1IDE4XG4gKiovIiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvdHBsL21vY2stc2VsZWN0LXRwbCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZXNjYXBlPSR1dGlscy4kZXNjYXBlLGRhdGE9JGRhdGEuZGF0YSwkb3V0PScnOyRvdXQrPSc8ZGl2IGNsYXNzPVwibW9jay1zZWxlY3QgZm9udC1zaXplMTZcIj4gPGRpdiBjbGFzcz1cIm5hbWUtd3JhcFwiPiA8c3BhbiBjbGFzcz1cIm5hbWVcIiBkYXRhLWlkPVwiJztcbiRvdXQrPSRlc2NhcGUoZGF0YVswXS5pZCk7XG4kb3V0Kz0nXCI+JztcbiRvdXQrPSRlc2NhcGUoZGF0YVswXS5uYW1lKTtcbiRvdXQrPSc8L3NwYW4+IDxzcGFuIGNsYXNzPVwiYmdcIj48L3NwYW4+IDwvZGl2PiA8L2Rpdj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvbW9jay1zZWxlY3QtdHBsLnRwbFxuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCA5IDEyIDE1IDE4XG4gKiovIiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvdHBsL3NlbGVjdC11bC10cGwnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVhY2g9JHV0aWxzLiRlYWNoLGRhdGE9JGRhdGEuZGF0YSwkdmFsdWU9JGRhdGEuJHZhbHVlLCRpbmRleD0kZGF0YS4kaW5kZXgsJGVzY2FwZT0kdXRpbHMuJGVzY2FwZSwkb3V0PScnOyRvdXQrPSc8dWwgY2xhc3M9XCJtb2NrLXVsIGJveC1wYWRkaW5nIGRpc3BsYXktbm9uZVwiPiAnO1xuJGVhY2goZGF0YSxmdW5jdGlvbigkdmFsdWUsJGluZGV4KXtcbiRvdXQrPScgJztcbmlmKCRpbmRleCA9PSAwKXtcbiRvdXQrPScgPGxpIHN0eWxlPVwiYm9yZGVyOm5vbmU7XCIgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5pZCk7XG4kb3V0Kz0nXCI+IDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJyaWdodFwiPuKImjwvc3Bhbj4gPC9saT4gJztcbn1lbHNle1xuJG91dCs9JyA8bGkgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5pZCk7XG4kb3V0Kz0nXCI+IDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJyaWdodFwiPuKImjwvc3Bhbj4gPC9saT4gJztcbn1cbiRvdXQrPScgJztcbn0pO1xuJG91dCs9JyA8L3VsPic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9zZWxlY3QtdWwtdHBsLnRwbFxuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCA5IDEyIDE1IDE4XG4gKiovIiwiLyohIG1vY2tqcyAyMy0wNi0yMDE0IDE1OjU3OjM3ICovXHJcbi8qISBzcmMvbW9jay1wcmVmaXguanMgKi9cclxuLyohXHJcbiAgICBNb2NrIC0g5qih5ouf6K+35rGCICYg5qih5ouf5pWw5o2uXHJcbiAgICBodHRwczovL2dpdGh1Yi5jb20vbnV5c29mdC9Nb2NrXHJcbiAgICDloqjmmbogbW96aGkuZ3l5QHRhb2Jhby5jb20gbnV5c29mdEBnbWFpbC5jb21cclxuKi9cclxuKGZ1bmN0aW9uKHVuZGVmaW5lZCkge1xyXG4gICAgdmFyIE1vY2sgPSB7XHJcbiAgICAgICAgdmVyc2lvbjogXCIwLjEuNVwiLFxyXG4gICAgICAgIF9tb2NrZWQ6IHt9XHJcbiAgICB9O1xyXG4gICAgLyohIHNyYy91dGlsLmpzICovXHJcbiAgICB2YXIgVXRpbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBVdGlsID0ge307XHJcbiAgICAgICAgVXRpbC5leHRlbmQgPSBmdW5jdGlvbiBleHRlbmQoKSB7XHJcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF0gfHwge30sIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoLCBvcHRpb25zLCBuYW1lLCBzcmMsIGNvcHksIGNsb25lO1xyXG4gICAgICAgICAgICBpZiAobGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgaSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICg7aSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvcHRpb25zKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGZvciAobmFtZSBpbiBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3JjID0gdGFyZ2V0W25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvcHkgPSBvcHRpb25zW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGNvcHkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3B5ID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY29weSkgfHwgVXRpbC5pc09iamVjdChjb3B5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc0FycmF5KGNvcHkpKSBjbG9uZSA9IHNyYyAmJiBVdGlsLmlzQXJyYXkoc3JjKSA/IHNyYyA6IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc09iamVjdChjb3B5KSkgY2xvbmUgPSBzcmMgJiYgVXRpbC5pc09iamVjdChzcmMpID8gc3JjIDoge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9IFV0aWwuZXh0ZW5kKGNsb25lLCBjb3B5KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRbbmFtZV0gPSBjb3B5O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXRpbC5lYWNoID0gZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBrZXk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnR5cGUob2JqKSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9iajsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlcmF0b3IoaSwgaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpbaV0sIGksIG9iaikgPT09IGZhbHNlKSBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaikgPT09IGZhbHNlKSBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXRpbC50eXBlID0gZnVuY3Rpb24gdHlwZShvYmopIHtcclxuICAgICAgICAgICAgcmV0dXJuIG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCA/IFN0cmluZyhvYmopIDogT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikubWF0Y2goL1xcW29iamVjdCAoXFx3KylcXF0vKVsxXS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXRpbC5lYWNoKFwiU3RyaW5nIE9iamVjdCBBcnJheSBSZWdFeHAgRnVuY3Rpb25cIi5zcGxpdChcIiBcIiksIGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIFV0aWxbXCJpc1wiICsgdmFsdWVdID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbC50eXBlKG9iaikgPT09IHZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgVXRpbC5pc09iamVjdE9yQXJyYXkgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gVXRpbC5pc09iamVjdCh2YWx1ZSkgfHwgVXRpbC5pc0FycmF5KHZhbHVlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWwuaXNOdW1lcmljID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXRpbC5rZXlzID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBrZXlzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkga2V5cy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGtleXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLnZhbHVlcyA9IGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWVzID0gW107XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkgdmFsdWVzLnB1c2gob2JqW2tleV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLmhlcmVkb2MgPSBmdW5jdGlvbiBoZXJlZG9jKGZuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmbi50b1N0cmluZygpLnJlcGxhY2UoL15bXlxcL10rXFwvXFwqIT8vLCBcIlwiKS5yZXBsYWNlKC9cXCpcXC9bXlxcL10rJC8sIFwiXCIpLnJlcGxhY2UoL15bXFxzXFx4QTBdKy8sIFwiXCIpLnJlcGxhY2UoL1tcXHNcXHhBMF0rJC8sIFwiXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXRpbC5ub29wID0gZnVuY3Rpb24oKSB7fTtcclxuICAgICAgICByZXR1cm4gVXRpbDtcclxuICAgIH0oKTtcclxuICAgIC8qISBzcmMvcmFuZG9tLmpzICovXHJcbiAgICB2YXIgUmFuZG9tID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIFJhbmRvbSA9IHtcclxuICAgICAgICAgICAgZXh0ZW5kOiBVdGlsLmV4dGVuZFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIFwiYm9vbGVhblwiOiBmdW5jdGlvbihtaW4sIG1heCwgY3VyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW4gPSB0eXBlb2YgbWluICE9PSBcInVuZGVmaW5lZFwiICYmICFpc05hTihtaW4pID8gcGFyc2VJbnQobWluLCAxMCkgOiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IHR5cGVvZiBtYXggIT09IFwidW5kZWZpbmVkXCIgJiYgIWlzTmFOKG1heCkgPyBwYXJzZUludChtYXgsIDEwKSA6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPiAxIC8gKG1pbiArIG1heCkgKiBtaW4gPyAhY3VyIDogY3VyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucmFuZG9tKCkgPj0gLjU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvb2w6IGZ1bmN0aW9uKG1pbiwgbWF4LCBjdXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJvb2xlYW4obWluLCBtYXgsIGN1cik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hdHVyYWw6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBtaW4gPSB0eXBlb2YgbWluICE9PSBcInVuZGVmaW5lZFwiID8gcGFyc2VJbnQobWluLCAxMCkgOiAwO1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gdHlwZW9mIG1heCAhPT0gXCJ1bmRlZmluZWRcIiA/IHBhcnNlSW50KG1heCwgMTApIDogOTAwNzE5OTI1NDc0MDk5MjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGludGVnZXI6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBtaW4gPSB0eXBlb2YgbWluICE9PSBcInVuZGVmaW5lZFwiID8gcGFyc2VJbnQobWluLCAxMCkgOiAtOTAwNzE5OTI1NDc0MDk5MjtcclxuICAgICAgICAgICAgICAgIG1heCA9IHR5cGVvZiBtYXggIT09IFwidW5kZWZpbmVkXCIgPyBwYXJzZUludChtYXgsIDEwKSA6IDkwMDcxOTkyNTQ3NDA5OTI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImludFwiOiBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW50ZWdlcihtaW4sIG1heCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZmxvYXRcIjogZnVuY3Rpb24obWluLCBtYXgsIGRtaW4sIGRtYXgpIHtcclxuICAgICAgICAgICAgICAgIGRtaW4gPSBkbWluID09PSB1bmRlZmluZWQgPyAwIDogZG1pbjtcclxuICAgICAgICAgICAgICAgIGRtaW4gPSBNYXRoLm1heChNYXRoLm1pbihkbWluLCAxNyksIDApO1xyXG4gICAgICAgICAgICAgICAgZG1heCA9IGRtYXggPT09IHVuZGVmaW5lZCA/IDE3IDogZG1heDtcclxuICAgICAgICAgICAgICAgIGRtYXggPSBNYXRoLm1heChNYXRoLm1pbihkbWF4LCAxNyksIDApO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IHRoaXMuaW50ZWdlcihtaW4sIG1heCkgKyBcIi5cIjtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBkY291bnQgPSB0aGlzLm5hdHVyYWwoZG1pbiwgZG1heCk7IGkgPCBkY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldCArPSB0aGlzLmNoYXJhY3RlcihcIm51bWJlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHJldCwgMTApO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXI6IGZ1bmN0aW9uKHBvb2wpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb29scyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBsb3dlcjogXCJhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHVwcGVyOiBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyOiBcIjAxMjM0NTY3ODlcIixcclxuICAgICAgICAgICAgICAgICAgICBzeW1ib2w6IFwiIUAjJCVeJiooKVtdXCJcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwb29scy5hbHBoYSA9IHBvb2xzLmxvd2VyICsgcG9vbHMudXBwZXI7XHJcbiAgICAgICAgICAgICAgICBwb29sc1tcInVuZGVmaW5lZFwiXSA9IHBvb2xzLmxvd2VyICsgcG9vbHMudXBwZXIgKyBwb29scy5udW1iZXIgKyBwb29scy5zeW1ib2w7XHJcbiAgICAgICAgICAgICAgICBwb29sID0gcG9vbHNbKFwiXCIgKyBwb29sKS50b0xvd2VyQ2FzZSgpXSB8fCBwb29sO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvb2wuY2hhckF0KFJhbmRvbS5uYXR1cmFsKDAsIHBvb2wubGVuZ3RoIC0gMSkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNoYXJcIjogZnVuY3Rpb24ocG9vbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyKHBvb2wpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdHJpbmc6IGZ1bmN0aW9uKHBvb2wsIG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBSYW5kb20ubmF0dXJhbChtaW4sIG1heCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzBdID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IG1pbjtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBSYW5kb20ubmF0dXJhbChwb29sLCBtaW4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb29sID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gcG9vbDtcclxuICAgICAgICAgICAgICAgICAgICBwb29sID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBSYW5kb20ubmF0dXJhbCgzLCA3KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFJhbmRvbS5jaGFyYWN0ZXIocG9vbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3RyOiBmdW5jdGlvbihwb29sLCBtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nKHBvb2wsIG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmFuZ2U6IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBzdGVwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RvcCA9IHN0YXJ0IHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3RlcCA9IGFyZ3VtZW50c1syXSB8fCAxO1xyXG4gICAgICAgICAgICAgICAgc3RhcnQgPSArc3RhcnQsIHN0b3AgPSArc3RvcCwgc3RlcCA9ICtzdGVwO1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IE1hdGgubWF4KE1hdGguY2VpbCgoc3RvcCAtIHN0YXJ0KSAvIHN0ZXApLCAwKTtcclxuICAgICAgICAgICAgICAgIHZhciBpZHggPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gbmV3IEFycmF5KGxlbik7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2VbaWR4KytdID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhcnQgKz0gc3RlcDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByYW5nZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBwYXR0ZXJuTGV0dGVyczoge1xyXG4gICAgICAgICAgICAgICAgeXl5eTogXCJnZXRGdWxsWWVhclwiLFxyXG4gICAgICAgICAgICAgICAgeXk6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFwiXCIgKyBkYXRlLmdldEZ1bGxZZWFyKCkpLnNsaWNlKDIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHk6IFwieXlcIixcclxuICAgICAgICAgICAgICAgIE1NOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtIDwgMTAgPyBcIjBcIiArIG0gOiBtO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIE06IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkZDogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQgPCAxMCA/IFwiMFwiICsgZCA6IGQ7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgZDogXCJnZXREYXRlXCIsXHJcbiAgICAgICAgICAgICAgICBISDogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBoID0gZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoIDwgMTAgPyBcIjBcIiArIGggOiBoO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIEg6IFwiZ2V0SG91cnNcIixcclxuICAgICAgICAgICAgICAgIGhoOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGggPSBkYXRlLmdldEhvdXJzKCkgJSAxMjtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaCA8IDEwID8gXCIwXCIgKyBoIDogaDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBoOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKSAlIDEyO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1tOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbSA8IDEwID8gXCIwXCIgKyBtIDogbTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBtOiBcImdldE1pbnV0ZXNcIixcclxuICAgICAgICAgICAgICAgIHNzOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHMgPSBkYXRlLmdldFNlY29uZHMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcyA8IDEwID8gXCIwXCIgKyBzIDogcztcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzOiBcImdldFNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIFNTOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1zID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbXMgPCAxMCAmJiBcIjAwXCIgKyBtcyB8fCBtcyA8IDEwMCAmJiBcIjBcIiArIG1zIHx8IG1zO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFM6IFwiZ2V0TWlsbGlzZWNvbmRzXCIsXHJcbiAgICAgICAgICAgICAgICBBOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKSA8IDEyID8gXCJBTVwiIDogXCJQTVwiO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGE6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyBcImFtXCIgOiBcInBtXCI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgVDogXCJnZXRUaW1lXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICByZm9ybWF0OiBuZXcgUmVnRXhwKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIFJhbmRvbS5wYXR0ZXJuTGV0dGVycykgcmUucHVzaChpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIihcIiArIHJlLmpvaW4oXCJ8XCIpICsgXCIpXCI7XHJcbiAgICAgICAgICAgIH0oKSwgXCJnXCIpLFxyXG4gICAgICAgICAgICBmb3JtYXQ6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhdHRlcm5MZXR0ZXJzID0gUmFuZG9tLnBhdHRlcm5MZXR0ZXJzLCByZm9ybWF0ID0gUmFuZG9tLnJmb3JtYXQ7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0LnJlcGxhY2UocmZvcm1hdCwgZnVuY3Rpb24oJDAsIGZsYWcpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHBhdHRlcm5MZXR0ZXJzW2ZsYWddID09PSBcImZ1bmN0aW9uXCIgPyBwYXR0ZXJuTGV0dGVyc1tmbGFnXShkYXRlKSA6IHBhdHRlcm5MZXR0ZXJzW2ZsYWddIGluIHBhdHRlcm5MZXR0ZXJzID8gYXJndW1lbnRzLmNhbGxlZSgkMCwgcGF0dGVybkxldHRlcnNbZmxhZ10pIDogZGF0ZVtwYXR0ZXJuTGV0dGVyc1tmbGFnXV0oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByYW5kb21EYXRlOiBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgbWluID0gbWluID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSgwKSA6IG1pbjtcclxuICAgICAgICAgICAgICAgIG1heCA9IG1heCA9PT0gdW5kZWZpbmVkID8gbmV3IERhdGUoKSA6IG1heDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShNYXRoLnJhbmRvbSgpICogKG1heC5nZXRUaW1lKCkgLSBtaW4uZ2V0VGltZSgpKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGU6IGZ1bmN0aW9uKGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8IFwieXl5eS1NTS1kZFwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMucmFuZG9tRGF0ZSgpLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aW1lOiBmdW5jdGlvbihmb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCBcIkhIOm1tOnNzXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5yYW5kb21EYXRlKCksIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGV0aW1lOiBmdW5jdGlvbihmb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCBcInl5eXktTU0tZGQgSEg6bW06c3NcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLnJhbmRvbURhdGUoKSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbm93OiBmdW5jdGlvbih1bml0LCBmb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEveWVhcnxtb250aHx3ZWVrfGRheXxob3VyfG1pbnV0ZXxzZWNvbmR8d2Vlay8udGVzdCh1bml0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSB1bml0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bml0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB1bml0ID0gKHVuaXQgfHwgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCBcInl5eXktTU0tZGQgSEg6bW06c3NcIjtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodW5pdCkge1xyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwieWVhclwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0TW9udGgoMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwibW9udGhcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldERhdGUoMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwid2Vla1wiOlxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwiZGF5XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXRIb3VycygwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJob3VyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXRNaW51dGVzKDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgY2FzZSBcIm1pbnV0ZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0U2Vjb25kcygwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJzZWNvbmRcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldE1pbGxpc2Vjb25kcygwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAodW5pdCkge1xyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwid2Vla1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIGRhdGUuZ2V0RGF5KCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KGRhdGUsIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgYWRfc2l6ZTogWyBcIjMwMHgyNTBcIiwgXCIyNTB4MjUwXCIsIFwiMjQweDQwMFwiLCBcIjMzNngyODBcIiwgXCIxODB4MTUwXCIsIFwiNzIweDMwMFwiLCBcIjQ2OHg2MFwiLCBcIjIzNHg2MFwiLCBcIjg4eDMxXCIsIFwiMTIweDkwXCIsIFwiMTIweDYwXCIsIFwiMTIweDI0MFwiLCBcIjEyNXgxMjVcIiwgXCI3Mjh4OTBcIiwgXCIxNjB4NjAwXCIsIFwiMTIweDYwMFwiLCBcIjMwMHg2MDBcIiBdLFxyXG4gICAgICAgICAgICBzY3JlZW5fc2l6ZTogWyBcIjMyMHgyMDBcIiwgXCIzMjB4MjQwXCIsIFwiNjQweDQ4MFwiLCBcIjgwMHg0ODBcIiwgXCI4MDB4NDgwXCIsIFwiMTAyNHg2MDBcIiwgXCIxMDI0eDc2OFwiLCBcIjEyODB4ODAwXCIsIFwiMTQ0MHg5MDBcIiwgXCIxOTIweDEyMDBcIiwgXCIyNTYweDE2MDBcIiBdLFxyXG4gICAgICAgICAgICB2aWRlb19zaXplOiBbIFwiNzIweDQ4MFwiLCBcIjc2OHg1NzZcIiwgXCIxMjgweDcyMFwiLCBcIjE5MjB4MTA4MFwiIF0sXHJcbiAgICAgICAgICAgIGltYWdlOiBmdW5jdGlvbihzaXplLCBiYWNrZ3JvdW5kLCBmb3JlZ3JvdW5kLCBmb3JtYXQsIHRleHQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSA0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGZvcm1hdDtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgPSBmb3JlZ3JvdW5kO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcmVncm91bmQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNpemUpIHNpemUgPSB0aGlzLnBpY2sodGhpcy5hZF9zaXplKTtcclxuICAgICAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kICYmIH5iYWNrZ3JvdW5kLmluZGV4T2YoXCIjXCIpKSBiYWNrZ3JvdW5kID0gYmFja2dyb3VuZC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIGlmIChmb3JlZ3JvdW5kICYmIH5mb3JlZ3JvdW5kLmluZGV4T2YoXCIjXCIpKSBmb3JlZ3JvdW5kID0gZm9yZWdyb3VuZC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImh0dHA6Ly9kdW1teWltYWdlLmNvbS9cIiArIHNpemUgKyAoYmFja2dyb3VuZCA/IFwiL1wiICsgYmFja2dyb3VuZCA6IFwiXCIpICsgKGZvcmVncm91bmQgPyBcIi9cIiArIGZvcmVncm91bmQgOiBcIlwiKSArIChmb3JtYXQgPyBcIi5cIiArIGZvcm1hdCA6IFwiXCIpICsgKHRleHQgPyBcIiZ0ZXh0PVwiICsgdGV4dCA6IFwiXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbWc6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBicmFuZENvbG9yczoge1xyXG4gICAgICAgICAgICAgICAgXCI0b3JtYXRcIjogXCIjZmIwYTJhXCIsXHJcbiAgICAgICAgICAgICAgICBcIjUwMHB4XCI6IFwiIzAyYWRlYVwiLFxyXG4gICAgICAgICAgICAgICAgXCJBYm91dC5tZSAoYmx1ZSlcIjogXCIjMDA0MDVkXCIsXHJcbiAgICAgICAgICAgICAgICBcIkFib3V0Lm1lICh5ZWxsb3cpXCI6IFwiI2ZmY2MzM1wiLFxyXG4gICAgICAgICAgICAgICAgQWRkdm9jYXRlOiBcIiNmZjYxMzhcIixcclxuICAgICAgICAgICAgICAgIEFkb2JlOiBcIiNmZjAwMDBcIixcclxuICAgICAgICAgICAgICAgIEFpbTogXCIjZmNkMjBiXCIsXHJcbiAgICAgICAgICAgICAgICBBbWF6b246IFwiI2U0NzkxMVwiLFxyXG4gICAgICAgICAgICAgICAgQW5kcm9pZDogXCIjYTRjNjM5XCIsXHJcbiAgICAgICAgICAgICAgICBcIkFuZ2llJ3MgTGlzdFwiOiBcIiM3ZmJiMDBcIixcclxuICAgICAgICAgICAgICAgIEFPTDogXCIjMDA2MGEzXCIsXHJcbiAgICAgICAgICAgICAgICBBdGxhc3NpYW46IFwiIzAwMzM2NlwiLFxyXG4gICAgICAgICAgICAgICAgQmVoYW5jZTogXCIjMDUzZWZmXCIsXHJcbiAgICAgICAgICAgICAgICBcIkJpZyBDYXJ0ZWxcIjogXCIjOTdiNTM4XCIsXHJcbiAgICAgICAgICAgICAgICBiaXRseTogXCIjZWU2MTIzXCIsXHJcbiAgICAgICAgICAgICAgICBCbG9nZ2VyOiBcIiNmYzRmMDhcIixcclxuICAgICAgICAgICAgICAgIEJvZWluZzogXCIjMDAzOWE2XCIsXHJcbiAgICAgICAgICAgICAgICBcIkJvb2tpbmcuY29tXCI6IFwiIzAwMzU4MFwiLFxyXG4gICAgICAgICAgICAgICAgQ2FyYm9ubWFkZTogXCIjNjEzODU0XCIsXHJcbiAgICAgICAgICAgICAgICBDaGVkZGFyOiBcIiNmZjcyNDNcIixcclxuICAgICAgICAgICAgICAgIFwiQ29kZSBTY2hvb2xcIjogXCIjM2Q0OTQ0XCIsXHJcbiAgICAgICAgICAgICAgICBEZWxpY2lvdXM6IFwiIzIwNWNjMFwiLFxyXG4gICAgICAgICAgICAgICAgRGVsbDogXCIjMzI4N2MxXCIsXHJcbiAgICAgICAgICAgICAgICBEZXNpZ25tb286IFwiI2U1NGE0ZlwiLFxyXG4gICAgICAgICAgICAgICAgRGV2aWFudGFydDogXCIjNGU2MjUyXCIsXHJcbiAgICAgICAgICAgICAgICBcIkRlc2lnbmVyIE5ld3NcIjogXCIjMmQ3MmRhXCIsXHJcbiAgICAgICAgICAgICAgICBEZXZvdXI6IFwiI2ZkMDAwMVwiLFxyXG4gICAgICAgICAgICAgICAgREVXQUxUOiBcIiNmZWJkMTdcIixcclxuICAgICAgICAgICAgICAgIFwiRGlzcXVzIChibHVlKVwiOiBcIiM1OWEzZmNcIixcclxuICAgICAgICAgICAgICAgIFwiRGlzcXVzIChvcmFuZ2UpXCI6IFwiI2RiNzEzMlwiLFxyXG4gICAgICAgICAgICAgICAgRHJpYmJibGU6IFwiI2VhNGM4OVwiLFxyXG4gICAgICAgICAgICAgICAgRHJvcGJveDogXCIjM2Q5YWU4XCIsXHJcbiAgICAgICAgICAgICAgICBEcnVwYWw6IFwiIzBjNzZhYlwiLFxyXG4gICAgICAgICAgICAgICAgRHVua2VkOiBcIiMyYTMyM2FcIixcclxuICAgICAgICAgICAgICAgIGVCYXk6IFwiIzg5YzUwN1wiLFxyXG4gICAgICAgICAgICAgICAgRW1iZXI6IFwiI2YwNWUxYlwiLFxyXG4gICAgICAgICAgICAgICAgRW5nYWRnZXQ6IFwiIzAwYmRmNlwiLFxyXG4gICAgICAgICAgICAgICAgRW52YXRvOiBcIiM1MjgwMzZcIixcclxuICAgICAgICAgICAgICAgIEV0c3k6IFwiI2ViNmQyMFwiLFxyXG4gICAgICAgICAgICAgICAgRXZlcm5vdGU6IFwiIzViYTUyNVwiLFxyXG4gICAgICAgICAgICAgICAgXCJGYWIuY29tXCI6IFwiI2RkMDAxN1wiLFxyXG4gICAgICAgICAgICAgICAgRmFjZWJvb2s6IFwiIzNiNTk5OFwiLFxyXG4gICAgICAgICAgICAgICAgRmlyZWZveDogXCIjZTY2MDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIkZsaWNrciAoYmx1ZSlcIjogXCIjMDA2M2RjXCIsXHJcbiAgICAgICAgICAgICAgICBcIkZsaWNrciAocGluaylcIjogXCIjZmYwMDg0XCIsXHJcbiAgICAgICAgICAgICAgICBGb3Jyc3Q6IFwiIzViOWE2OFwiLFxyXG4gICAgICAgICAgICAgICAgRm91cnNxdWFyZTogXCIjMjVhMGNhXCIsXHJcbiAgICAgICAgICAgICAgICBHYXJtaW46IFwiIzAwN2NjM1wiLFxyXG4gICAgICAgICAgICAgICAgR2V0R2x1ZTogXCIjMmQ3NWEyXCIsXHJcbiAgICAgICAgICAgICAgICBHaW1tZWJhcjogXCIjZjcwMDc4XCIsXHJcbiAgICAgICAgICAgICAgICBHaXRIdWI6IFwiIzE3MTUxNVwiLFxyXG4gICAgICAgICAgICAgICAgXCJHb29nbGUgQmx1ZVwiOiBcIiMwMTQwY2FcIixcclxuICAgICAgICAgICAgICAgIFwiR29vZ2xlIEdyZWVuXCI6IFwiIzE2YTYxZVwiLFxyXG4gICAgICAgICAgICAgICAgXCJHb29nbGUgUmVkXCI6IFwiI2RkMTgxMlwiLFxyXG4gICAgICAgICAgICAgICAgXCJHb29nbGUgWWVsbG93XCI6IFwiI2ZjY2EwM1wiLFxyXG4gICAgICAgICAgICAgICAgXCJHb29nbGUrXCI6IFwiI2RkNGIzOVwiLFxyXG4gICAgICAgICAgICAgICAgR3Jvb3Zlc2hhcms6IFwiI2Y3N2YwMFwiLFxyXG4gICAgICAgICAgICAgICAgR3JvdXBvbjogXCIjODJiNTQ4XCIsXHJcbiAgICAgICAgICAgICAgICBcIkhhY2tlciBOZXdzXCI6IFwiI2ZmNjYwMFwiLFxyXG4gICAgICAgICAgICAgICAgSGVsbG9XYWxsZXQ6IFwiIzAwODVjYVwiLFxyXG4gICAgICAgICAgICAgICAgXCJIZXJva3UgKGxpZ2h0KVwiOiBcIiNjN2M1ZTZcIixcclxuICAgICAgICAgICAgICAgIFwiSGVyb2t1IChkYXJrKVwiOiBcIiM2NTY3YTVcIixcclxuICAgICAgICAgICAgICAgIEhvb3RTdWl0ZTogXCIjMDAzMzY2XCIsXHJcbiAgICAgICAgICAgICAgICBIb3V6ejogXCIjNzNiYTM3XCIsXHJcbiAgICAgICAgICAgICAgICBIVE1MNTogXCIjZWM2MjMxXCIsXHJcbiAgICAgICAgICAgICAgICBJS0VBOiBcIiNmZmNjMzNcIixcclxuICAgICAgICAgICAgICAgIElNRGI6IFwiI2YzY2UxM1wiLFxyXG4gICAgICAgICAgICAgICAgSW5zdGFncmFtOiBcIiMzZjcyOWJcIixcclxuICAgICAgICAgICAgICAgIEludGVsOiBcIiMwMDcxYzVcIixcclxuICAgICAgICAgICAgICAgIEludHVpdDogXCIjMzY1ZWJmXCIsXHJcbiAgICAgICAgICAgICAgICBLaWNrc3RhcnRlcjogXCIjNzZjYzFlXCIsXHJcbiAgICAgICAgICAgICAgICBraXBwdDogXCIjZTAzNTAwXCIsXHJcbiAgICAgICAgICAgICAgICBLb2Rlcnk6IFwiIzAwYWY4MVwiLFxyXG4gICAgICAgICAgICAgICAgTGFzdEZNOiBcIiNjMzAwMGRcIixcclxuICAgICAgICAgICAgICAgIExpbmtlZEluOiBcIiMwZTc2YThcIixcclxuICAgICAgICAgICAgICAgIExpdmVzdHJlYW06IFwiI2NmMDAwNVwiLFxyXG4gICAgICAgICAgICAgICAgTHVtbzogXCIjNTc2Mzk2XCIsXHJcbiAgICAgICAgICAgICAgICBNaXhwYW5lbDogXCIjYTA4NmQzXCIsXHJcbiAgICAgICAgICAgICAgICBNZWV0dXA6IFwiI2U1MTkzN1wiLFxyXG4gICAgICAgICAgICAgICAgTm9raWE6IFwiIzE4MzY5M1wiLFxyXG4gICAgICAgICAgICAgICAgTlZJRElBOiBcIiM3NmI5MDBcIixcclxuICAgICAgICAgICAgICAgIE9wZXJhOiBcIiNjYzBmMTZcIixcclxuICAgICAgICAgICAgICAgIFBhdGg6IFwiI2U0MWYxMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJQYXlQYWwgKGRhcmspXCI6IFwiIzFlNDc3YVwiLFxyXG4gICAgICAgICAgICAgICAgXCJQYXlQYWwgKGxpZ2h0KVwiOiBcIiMzYjdiYmZcIixcclxuICAgICAgICAgICAgICAgIFBpbmJvYXJkOiBcIiMwMDAwZTZcIixcclxuICAgICAgICAgICAgICAgIFBpbnRlcmVzdDogXCIjYzgyMzJjXCIsXHJcbiAgICAgICAgICAgICAgICBQbGF5U3RhdGlvbjogXCIjNjY1Y2JlXCIsXHJcbiAgICAgICAgICAgICAgICBQb2NrZXQ6IFwiI2VlNDA1NlwiLFxyXG4gICAgICAgICAgICAgICAgUHJlemk6IFwiIzMxOGJmZlwiLFxyXG4gICAgICAgICAgICAgICAgUHVzaGE6IFwiIzBmNzFiNFwiLFxyXG4gICAgICAgICAgICAgICAgUXVvcmE6IFwiI2E4MjQwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJRVU9URS5mbVwiOiBcIiM2NmNlZmZcIixcclxuICAgICAgICAgICAgICAgIFJkaW86IFwiIzAwOGZkNVwiLFxyXG4gICAgICAgICAgICAgICAgUmVhZGFiaWxpdHk6IFwiIzljMDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJSZWQgSGF0XCI6IFwiI2NjMDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgUmVzb3VyY2U6IFwiIzdlYjQwMFwiLFxyXG4gICAgICAgICAgICAgICAgUm9ja3BhY2s6IFwiIzBiYTZhYlwiLFxyXG4gICAgICAgICAgICAgICAgUm9vbjogXCIjNjJiMGQ5XCIsXHJcbiAgICAgICAgICAgICAgICBSU1M6IFwiI2VlODAyZlwiLFxyXG4gICAgICAgICAgICAgICAgU2FsZXNmb3JjZTogXCIjMTc5OGMxXCIsXHJcbiAgICAgICAgICAgICAgICBTYW1zdW5nOiBcIiMwYzRkYTJcIixcclxuICAgICAgICAgICAgICAgIFNob3BpZnk6IFwiIzk2YmY0OFwiLFxyXG4gICAgICAgICAgICAgICAgU2t5cGU6IFwiIzAwYWZmMFwiLFxyXG4gICAgICAgICAgICAgICAgU25hZ2Fqb2I6IFwiI2Y0N2EyMFwiLFxyXG4gICAgICAgICAgICAgICAgU29mdG9uaWM6IFwiIzAwOGFjZVwiLFxyXG4gICAgICAgICAgICAgICAgU291bmRDbG91ZDogXCIjZmY3NzAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIlNwYWNlIEJveFwiOiBcIiNmODY5NjBcIixcclxuICAgICAgICAgICAgICAgIFNwb3RpZnk6IFwiIzgxYjcxYVwiLFxyXG4gICAgICAgICAgICAgICAgU3ByaW50OiBcIiNmZWUxMDBcIixcclxuICAgICAgICAgICAgICAgIFNxdWFyZXNwYWNlOiBcIiMxMjEyMTJcIixcclxuICAgICAgICAgICAgICAgIFN0YWNrT3ZlcmZsb3c6IFwiI2VmODIzNlwiLFxyXG4gICAgICAgICAgICAgICAgU3RhcGxlczogXCIjY2MwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIlN0YXR1cyBDaGFydFwiOiBcIiNkNzU4NGZcIixcclxuICAgICAgICAgICAgICAgIFN0cmlwZTogXCIjMDA4Y2RkXCIsXHJcbiAgICAgICAgICAgICAgICBTdHVkeUJsdWU6IFwiIzAwYWZlMVwiLFxyXG4gICAgICAgICAgICAgICAgU3R1bWJsZVVwb246IFwiI2Y3NDQyNVwiLFxyXG4gICAgICAgICAgICAgICAgXCJULU1vYmlsZVwiOiBcIiNlYTBhOGVcIixcclxuICAgICAgICAgICAgICAgIFRlY2hub3JhdGk6IFwiIzQwYTgwMFwiLFxyXG4gICAgICAgICAgICAgICAgXCJUaGUgTmV4dCBXZWJcIjogXCIjZWY0NDIzXCIsXHJcbiAgICAgICAgICAgICAgICBUcmVlaG91c2U6IFwiIzVjYjg2OFwiLFxyXG4gICAgICAgICAgICAgICAgVHJ1bGlhOiBcIiM1ZWFiMWZcIixcclxuICAgICAgICAgICAgICAgIFR1bWJscjogXCIjMzQ1MjZmXCIsXHJcbiAgICAgICAgICAgICAgICBcIlR3aXRjaC50dlwiOiBcIiM2NDQxYTVcIixcclxuICAgICAgICAgICAgICAgIFR3aXR0ZXI6IFwiIzAwYWNlZVwiLFxyXG4gICAgICAgICAgICAgICAgVFlQTzM6IFwiI2ZmODcwMFwiLFxyXG4gICAgICAgICAgICAgICAgVWJ1bnR1OiBcIiNkZDQ4MTRcIixcclxuICAgICAgICAgICAgICAgIFVzdHJlYW06IFwiIzMzODhmZlwiLFxyXG4gICAgICAgICAgICAgICAgVmVyaXpvbjogXCIjZWYxZDFkXCIsXHJcbiAgICAgICAgICAgICAgICBWaW1lbzogXCIjODZjOWVmXCIsXHJcbiAgICAgICAgICAgICAgICBWaW5lOiBcIiMwMGE0NzhcIixcclxuICAgICAgICAgICAgICAgIFZpcmI6IFwiIzA2YWZkOFwiLFxyXG4gICAgICAgICAgICAgICAgXCJWaXJnaW4gTWVkaWFcIjogXCIjY2MwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBXb29nYTogXCIjNWIwMDljXCIsXHJcbiAgICAgICAgICAgICAgICBcIldvcmRQcmVzcyAoYmx1ZSlcIjogXCIjMjE3NTliXCIsXHJcbiAgICAgICAgICAgICAgICBcIldvcmRQcmVzcyAob3JhbmdlKVwiOiBcIiNkNTRlMjFcIixcclxuICAgICAgICAgICAgICAgIFwiV29yZFByZXNzIChncmV5KVwiOiBcIiM0NjQ2NDZcIixcclxuICAgICAgICAgICAgICAgIFd1bmRlcmxpc3Q6IFwiIzJiODhkOVwiLFxyXG4gICAgICAgICAgICAgICAgWEJPWDogXCIjOWJjODQ4XCIsXHJcbiAgICAgICAgICAgICAgICBYSU5HOiBcIiMxMjY1NjdcIixcclxuICAgICAgICAgICAgICAgIFwiWWFob28hXCI6IFwiIzcyMGU5ZVwiLFxyXG4gICAgICAgICAgICAgICAgWWFuZGV4OiBcIiNmZmNjMDBcIixcclxuICAgICAgICAgICAgICAgIFllbHA6IFwiI2M0MTIwMFwiLFxyXG4gICAgICAgICAgICAgICAgWW91VHViZTogXCIjYzQzMDJiXCIsXHJcbiAgICAgICAgICAgICAgICBaYWxvbmdvOiBcIiM1NDk4ZGNcIixcclxuICAgICAgICAgICAgICAgIFplbmRlc2s6IFwiIzc4YTMwMFwiLFxyXG4gICAgICAgICAgICAgICAgWmVycGx5OiBcIiM5ZGNjN2FcIixcclxuICAgICAgICAgICAgICAgIFpvb3Rvb2w6IFwiIzVlOGIxZFwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJyYW5kczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYnJhbmRzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBiIGluIHRoaXMuYnJhbmRDb2xvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBicmFuZHMucHVzaChiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBicmFuZHM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGFJbWFnZTogZnVuY3Rpb24oc2l6ZSwgdGV4dCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNhbnZhcyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLCBjdHggPSBjYW52YXMgJiYgY2FudmFzLmdldENvbnRleHQgJiYgY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmICghY2FudmFzIHx8ICFjdHgpIHJldHVybiBcIlwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzaXplKSBzaXplID0gdGhpcy5waWNrKHRoaXMuYWRfc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXh0ID0gdGV4dCAhPT0gdW5kZWZpbmVkID8gdGV4dCA6IHNpemU7XHJcbiAgICAgICAgICAgICAgICBzaXplID0gc2l6ZS5zcGxpdChcInhcIik7XHJcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSBwYXJzZUludChzaXplWzBdLCAxMCksIGhlaWdodCA9IHBhcnNlSW50KHNpemVbMV0sIDEwKSwgYmFja2dyb3VuZCA9IHRoaXMuYnJhbmRDb2xvcnNbdGhpcy5waWNrKHRoaXMuYnJhbmRzKCkpXSwgZm9yZWdyb3VuZCA9IFwiI0ZGRlwiLCB0ZXh0X2hlaWdodCA9IDE0LCBmb250ID0gXCJzYW5zLXNlcmlmXCI7XHJcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBcIm1pZGRsZVwiO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJhY2tncm91bmQ7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZm9yZWdyb3VuZDtcclxuICAgICAgICAgICAgICAgIGN0eC5mb250ID0gXCJib2xkIFwiICsgdGV4dF9oZWlnaHQgKyBcInB4IFwiICsgZm9udDtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCB3aWR0aCAvIDIsIGhlaWdodCAvIDIsIHdpZHRoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGNvbG9yOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBjb2xvdXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTYgKiAxNiAqIDE2ICogMTYgKiAxNiAqIDE2IC0gMSkpLnRvU3RyaW5nKDE2KTtcclxuICAgICAgICAgICAgICAgIGNvbG91ciA9IFwiI1wiICsgKFwiMDAwMDAwXCIgKyBjb2xvdXIpLnNsaWNlKC02KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb2xvdXI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgY2FwaXRhbGl6ZTogZnVuY3Rpb24od29yZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh3b3JkICsgXCJcIikuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyAod29yZCArIFwiXCIpLnN1YnN0cigxKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdXBwZXI6IGZ1bmN0aW9uKHN0cikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChzdHIgKyBcIlwiKS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBsb3dlcjogZnVuY3Rpb24oc3RyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHN0ciArIFwiXCIpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBpY2s6IGZ1bmN0aW9uKGFycikge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gYXJyIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyclt0aGlzLm5hdHVyYWwoMCwgYXJyLmxlbmd0aCAtIDEpXTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2h1ZmZsZTogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBhcnIgfHwgW107XHJcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gYXJyLnNsaWNlKDApLCByZXN1bHQgPSBbXSwgaW5kZXggPSAwLCBsZW5ndGggPSBvbGQubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gdGhpcy5uYXR1cmFsKDAsIG9sZC5sZW5ndGggLSAxKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChvbGRbaW5kZXhdKTtcclxuICAgICAgICAgICAgICAgICAgICBvbGQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgcGFyYWdyYXBoOiBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSBsZW4gPSBSYW5kb20ubmF0dXJhbCgzLCA3KTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSBsZW4gPSBtYXggPSBtaW47XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IHBhcnNlSW50KG1pbiwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IHBhcnNlSW50KG1heCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IFJhbmRvbS5uYXR1cmFsKG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChSYW5kb20uc2VudGVuY2UoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyLmpvaW4oXCIgXCIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZW50ZW5jZTogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsZW47XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgbGVuID0gUmFuZG9tLm5hdHVyYWwoMTIsIDE4KTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSBsZW4gPSBtYXggPSBtaW47XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IHBhcnNlSW50KG1pbiwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IHBhcnNlSW50KG1heCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IFJhbmRvbS5uYXR1cmFsKG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBhcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChSYW5kb20ud29yZCgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20uY2FwaXRhbGl6ZShhcnIuam9pbihcIiBcIikpICsgXCIuXCI7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHdvcmQ6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIGxlbiA9IFJhbmRvbS5uYXR1cmFsKDMsIDEwKTtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSBsZW4gPSBtYXggPSBtaW47XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IHBhcnNlSW50KG1pbiwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIG1heCA9IHBhcnNlSW50KG1heCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IFJhbmRvbS5uYXR1cmFsKG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBSYW5kb20uY2hhcmFjdGVyKFwibG93ZXJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aXRsZTogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsZW4sIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIGxlbiA9IFJhbmRvbS5uYXR1cmFsKDMsIDcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIGxlbiA9IG1heCA9IG1pbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcGFyc2VJbnQobWluLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VJbnQobWF4LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gUmFuZG9tLm5hdHVyYWwobWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY2FwaXRhbGl6ZSh0aGlzLndvcmQoKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKFwiIFwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBmaXJzdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmFtZXMgPSBbIFwiSmFtZXNcIiwgXCJKb2huXCIsIFwiUm9iZXJ0XCIsIFwiTWljaGFlbFwiLCBcIldpbGxpYW1cIiwgXCJEYXZpZFwiLCBcIlJpY2hhcmRcIiwgXCJDaGFybGVzXCIsIFwiSm9zZXBoXCIsIFwiVGhvbWFzXCIsIFwiQ2hyaXN0b3BoZXJcIiwgXCJEYW5pZWxcIiwgXCJQYXVsXCIsIFwiTWFya1wiLCBcIkRvbmFsZFwiLCBcIkdlb3JnZVwiLCBcIktlbm5ldGhcIiwgXCJTdGV2ZW5cIiwgXCJFZHdhcmRcIiwgXCJCcmlhblwiLCBcIlJvbmFsZFwiLCBcIkFudGhvbnlcIiwgXCJLZXZpblwiLCBcIkphc29uXCIsIFwiTWF0dGhld1wiLCBcIkdhcnlcIiwgXCJUaW1vdGh5XCIsIFwiSm9zZVwiLCBcIkxhcnJ5XCIsIFwiSmVmZnJleVwiLCBcIkZyYW5rXCIsIFwiU2NvdHRcIiwgXCJFcmljXCIgXS5jb25jYXQoWyBcIk1hcnlcIiwgXCJQYXRyaWNpYVwiLCBcIkxpbmRhXCIsIFwiQmFyYmFyYVwiLCBcIkVsaXphYmV0aFwiLCBcIkplbm5pZmVyXCIsIFwiTWFyaWFcIiwgXCJTdXNhblwiLCBcIk1hcmdhcmV0XCIsIFwiRG9yb3RoeVwiLCBcIkxpc2FcIiwgXCJOYW5jeVwiLCBcIkthcmVuXCIsIFwiQmV0dHlcIiwgXCJIZWxlblwiLCBcIlNhbmRyYVwiLCBcIkRvbm5hXCIsIFwiQ2Fyb2xcIiwgXCJSdXRoXCIsIFwiU2hhcm9uXCIsIFwiTWljaGVsbGVcIiwgXCJMYXVyYVwiLCBcIlNhcmFoXCIsIFwiS2ltYmVybHlcIiwgXCJEZWJvcmFoXCIsIFwiSmVzc2ljYVwiLCBcIlNoaXJsZXlcIiwgXCJDeW50aGlhXCIsIFwiQW5nZWxhXCIsIFwiTWVsaXNzYVwiLCBcIkJyZW5kYVwiLCBcIkFteVwiLCBcIkFubmFcIiBdKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2sobmFtZXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwaXRhbGl6ZSh0aGlzLndvcmQoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxhc3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIG5hbWVzID0gWyBcIlNtaXRoXCIsIFwiSm9obnNvblwiLCBcIldpbGxpYW1zXCIsIFwiQnJvd25cIiwgXCJKb25lc1wiLCBcIk1pbGxlclwiLCBcIkRhdmlzXCIsIFwiR2FyY2lhXCIsIFwiUm9kcmlndWV6XCIsIFwiV2lsc29uXCIsIFwiTWFydGluZXpcIiwgXCJBbmRlcnNvblwiLCBcIlRheWxvclwiLCBcIlRob21hc1wiLCBcIkhlcm5hbmRlelwiLCBcIk1vb3JlXCIsIFwiTWFydGluXCIsIFwiSmFja3NvblwiLCBcIlRob21wc29uXCIsIFwiV2hpdGVcIiwgXCJMb3BlelwiLCBcIkxlZVwiLCBcIkdvbnphbGV6XCIsIFwiSGFycmlzXCIsIFwiQ2xhcmtcIiwgXCJMZXdpc1wiLCBcIlJvYmluc29uXCIsIFwiV2Fsa2VyXCIsIFwiUGVyZXpcIiwgXCJIYWxsXCIsIFwiWW91bmdcIiwgXCJBbGxlblwiIF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5waWNrKG5hbWVzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhcGl0YWxpemUodGhpcy53b3JkKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBuYW1lOiBmdW5jdGlvbihtaWRkbGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0KCkgKyBcIiBcIiArIChtaWRkbGUgPyB0aGlzLmZpcnN0KCkgKyBcIiBcIiA6IFwiXCIpICsgdGhpcy5sYXN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgdXJsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImh0dHA6Ly9cIiArIHRoaXMuZG9tYWluKCkgKyBcIi9cIiArIHRoaXMud29yZCgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkb21haW46IGZ1bmN0aW9uKHRsZCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud29yZCgpICsgXCIuXCIgKyAodGxkIHx8IHRoaXMudGxkKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlbWFpbDogZnVuY3Rpb24oZG9tYWluKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXIoXCJsb3dlclwiKSArIFwiLlwiICsgdGhpcy5sYXN0KCkudG9Mb3dlckNhc2UoKSArIFwiQFwiICsgdGhpcy5sYXN0KCkudG9Mb3dlckNhc2UoKSArIFwiLlwiICsgdGhpcy50bGQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndvcmQoKSArIFwiQFwiICsgKGRvbWFpbiB8fCB0aGlzLmRvbWFpbigpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaXA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbCgwLCAyNTUpICsgXCIuXCIgKyB0aGlzLm5hdHVyYWwoMCwgMjU1KSArIFwiLlwiICsgdGhpcy5uYXR1cmFsKDAsIDI1NSkgKyBcIi5cIiArIHRoaXMubmF0dXJhbCgwLCAyNTUpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0bGRzOiBbIFwiY29tXCIsIFwib3JnXCIsIFwiZWR1XCIsIFwiZ292XCIsIFwiY28udWtcIiwgXCJuZXRcIiwgXCJpb1wiIF0sXHJcbiAgICAgICAgICAgIHRsZDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5waWNrKHRoaXMudGxkcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgYXJlYXM6IFsgXCLkuJzljJdcIiwgXCLljY7ljJdcIiwgXCLljY7kuJxcIiwgXCLljY7kuK1cIiwgXCLljY7ljZdcIiwgXCLopb/ljZdcIiwgXCLopb/ljJdcIiBdLFxyXG4gICAgICAgICAgICBhcmVhOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2sodGhpcy5hcmVhcyk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlZ2lvbnM6IFsgXCIxMTAwMDAg5YyX5Lqs5biCXCIsIFwiMTIwMDAwIOWkqea0peW4glwiLCBcIjEzMDAwMCDmsrPljJfnnIFcIiwgXCIxNDAwMDAg5bGx6KW/55yBXCIsIFwiMTUwMDAwIOWGheiSmeWPpOiHquayu+WMulwiLCBcIjIxMDAwMCDovr3lroHnnIFcIiwgXCIyMjAwMDAg5ZCJ5p6X55yBXCIsIFwiMjMwMDAwIOm7kem+meaxn+ecgVwiLCBcIjMxMDAwMCDkuIrmtbfluIJcIiwgXCIzMjAwMDAg5rGf6IuP55yBXCIsIFwiMzMwMDAwIOa1meaxn+ecgVwiLCBcIjM0MDAwMCDlronlvr3nnIFcIiwgXCIzNTAwMDAg56aP5bu655yBXCIsIFwiMzYwMDAwIOaxn+ilv+ecgVwiLCBcIjM3MDAwMCDlsbHkuJznnIFcIiwgXCI0MTAwMDAg5rKz5Y2X55yBXCIsIFwiNDIwMDAwIOa5luWMl+ecgVwiLCBcIjQzMDAwMCDmuZbljZfnnIFcIiwgXCI0NDAwMDAg5bm/5Lic55yBXCIsIFwiNDUwMDAwIOW5v+ilv+WjruaXj+iHquayu+WMulwiLCBcIjQ2MDAwMCDmtbfljZfnnIFcIiwgXCI1MDAwMDAg6YeN5bqG5biCXCIsIFwiNTEwMDAwIOWbm+W3neecgVwiLCBcIjUyMDAwMCDotLXlt57nnIFcIiwgXCI1MzAwMDAg5LqR5Y2X55yBXCIsIFwiNTQwMDAwIOilv+iXj+iHquayu+WMulwiLCBcIjYxMDAwMCDpmZXopb/nnIFcIiwgXCI2MjAwMDAg55SY6IKD55yBXCIsIFwiNjMwMDAwIOmdkua1t+ecgVwiLCBcIjY0MDAwMCDlroHlpI/lm57ml4/oh6rmsrvljLpcIiwgXCI2NTAwMDAg5paw55aG57u05ZC+5bCU6Ieq5rK75Yy6XCIsIFwiNjUwMDAwIOaWsOeWhue7tOWQvuWwlOiHquayu+WMulwiLCBcIjcxMDAwMCDlj7Dmub7nnIFcIiwgXCI4MTAwMDAg6aaZ5riv54m55Yir6KGM5pS/5Yy6XCIsIFwiODIwMDAwIOa+s+mXqOeJueWIq+ihjOaUv+WMulwiIF0sXHJcbiAgICAgICAgICAgIHJlZ2lvbjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5waWNrKHRoaXMucmVnaW9ucykuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhZGRyZXNzOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBjaXR5OiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBwaG9uZTogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgYXJlYWNvZGU6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHN0cmVldDogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgc3RyZWV0X3N1ZmZpeGVzOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBzdHJlZXRfc3VmZml4OiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBzdGF0ZXM6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHN0YXRlOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICB6aXA6IGZ1bmN0aW9uKGxlbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHppcCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IChsZW4gfHwgNik7IGkrKykgemlwICs9IHRoaXMubmF0dXJhbCgwLCA5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB6aXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgdG9kbzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ0b2RvXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgZDQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbCgxLCA0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZDY6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbCgxLCA2KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZDg6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbCgxLCA4KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZDEyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm5hdHVyYWwoMSwgMTIpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkMjA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbCgxLCAyMCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGQxMDA6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbCgxLCAxMDApO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBndWlkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwb29sID0gXCJBQkNERUYxMjM0NTY3ODkwXCIsIGd1aWQgPSB0aGlzLnN0cmluZyhwb29sLCA4KSArIFwiLVwiICsgdGhpcy5zdHJpbmcocG9vbCwgNCkgKyBcIi1cIiArIHRoaXMuc3RyaW5nKHBvb2wsIDQpICsgXCItXCIgKyB0aGlzLnN0cmluZyhwb29sLCA0KSArIFwiLVwiICsgdGhpcy5zdHJpbmcocG9vbCwgMTIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGd1aWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGlkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpZCwgc3VtID0gMCwgcmFuayA9IFsgXCI3XCIsIFwiOVwiLCBcIjEwXCIsIFwiNVwiLCBcIjhcIiwgXCI0XCIsIFwiMlwiLCBcIjFcIiwgXCI2XCIsIFwiM1wiLCBcIjdcIiwgXCI5XCIsIFwiMTBcIiwgXCI1XCIsIFwiOFwiLCBcIjRcIiwgXCIyXCIgXSwgbGFzdCA9IFsgXCIxXCIsIFwiMFwiLCBcIlhcIiwgXCI5XCIsIFwiOFwiLCBcIjdcIiwgXCI2XCIsIFwiNVwiLCBcIjRcIiwgXCIzXCIsIFwiMlwiIF07XHJcbiAgICAgICAgICAgICAgICBpZCA9IHRoaXMucGljayh0aGlzLnJlZ2lvbnMpLnNwbGl0KFwiIFwiKVswXSArIHRoaXMuZGF0ZShcInl5eXlNTWRkXCIpICsgdGhpcy5zdHJpbmcoXCJudW1iZXJcIiwgMyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGlkW2ldICogcmFua1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlkICs9IGxhc3Rbc3VtICUgMTFdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBhdXRvSW5jcmVtZW50SW50ZWdlcjogMCxcclxuICAgICAgICAgICAgaW5jcmVtZW50OiBmdW5jdGlvbihzdGVwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hdXRvSW5jcmVtZW50SW50ZWdlciArPSArc3RlcCB8fCAxO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpbmM6IGZ1bmN0aW9uKHN0ZXApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluY3JlbWVudChzdGVwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBSYW5kb207XHJcbiAgICB9KCk7XHJcbiAgICAvKiEgc3JjL21vY2suanMgKi9cclxuICAgIHZhciBya2V5ID0gLyguKylcXHwoPzpcXCsoXFxkKyl8KFtcXCtcXC1dP1xcZCstP1tcXCtcXC1dP1xcZCopPyg/OlxcLihcXGQrLT9cXGQqKSk/KS8sIHJyYW5nZSA9IC8oW1xcK1xcLV0/XFxkKyktPyhbXFwrXFwtXT9cXGQrKT8vLCBycGxhY2Vob2xkZXIgPSAvXFxcXCpAKFteQCMlJigpXFw/XFxzXFwvXFwuXSspKD86XFwoKC4qPylcXCkpPy9nO1xyXG4gICAgTW9jay5leHRlbmQgPSBVdGlsLmV4dGVuZDtcclxuICAgIE1vY2subW9jayA9IGZ1bmN0aW9uKHJ1cmwsIHJ0eXBlLCB0ZW1wbGF0ZSkge1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBIYW5kbGUuZ2VuKHJ1cmwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICB0ZW1wbGF0ZSA9IHJ0eXBlO1xyXG4gICAgICAgICAgICBydHlwZSA9IHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgTW9jay5fbW9ja2VkW3J1cmwgKyAocnR5cGUgfHwgXCJcIildID0ge1xyXG4gICAgICAgICAgICBydXJsOiBydXJsLFxyXG4gICAgICAgICAgICBydHlwZTogcnR5cGUsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIE1vY2s7XHJcbiAgICB9O1xyXG4gICAgdmFyIEhhbmRsZSA9IHtcclxuICAgICAgICBleHRlbmQ6IFV0aWwuZXh0ZW5kXHJcbiAgICB9O1xyXG4gICAgSGFuZGxlLnJ1bGUgPSBmdW5jdGlvbihuYW1lKSB7XHJcbiAgICAgICAgbmFtZSA9IChuYW1lIHx8IFwiXCIpICsgXCJcIjtcclxuICAgICAgICB2YXIgcGFyYW1ldGVycyA9IChuYW1lIHx8IFwiXCIpLm1hdGNoKHJrZXkpLCByYW5nZSA9IHBhcmFtZXRlcnMgJiYgcGFyYW1ldGVyc1szXSAmJiBwYXJhbWV0ZXJzWzNdLm1hdGNoKHJyYW5nZSksIG1pbiA9IHJhbmdlICYmIHBhcnNlSW50KHJhbmdlWzFdLCAxMCksIG1heCA9IHJhbmdlICYmIHBhcnNlSW50KHJhbmdlWzJdLCAxMCksIGNvdW50ID0gcmFuZ2UgPyAhcmFuZ2VbMl0gJiYgcGFyc2VJbnQocmFuZ2VbMV0sIDEwKSB8fCBSYW5kb20uaW50ZWdlcihtaW4sIG1heCkgOiAxLCBkZWNpbWFsID0gcGFyYW1ldGVycyAmJiBwYXJhbWV0ZXJzWzRdICYmIHBhcmFtZXRlcnNbNF0ubWF0Y2gocnJhbmdlKSwgZG1pbiA9IGRlY2ltYWwgJiYgcGFyc2VJbnQoZGVjaW1hbFsxXSwgMTApLCBkbWF4ID0gZGVjaW1hbCAmJiBwYXJzZUludChkZWNpbWFsWzJdLCAxMCksIGRjb3VudCA9IGRlY2ltYWwgPyAhZGVjaW1hbFsyXSAmJiBwYXJzZUludChkZWNpbWFsWzFdLCAxMCkgfHwgUmFuZG9tLmludGVnZXIoZG1pbiwgZG1heCkgOiAwLCBwb2ludCA9IHBhcmFtZXRlcnMgJiYgcGFyYW1ldGVyc1s0XTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzLFxyXG4gICAgICAgICAgICByYW5nZTogcmFuZ2UsXHJcbiAgICAgICAgICAgIG1pbjogbWluLFxyXG4gICAgICAgICAgICBtYXg6IG1heCxcclxuICAgICAgICAgICAgY291bnQ6IGNvdW50LFxyXG4gICAgICAgICAgICBkZWNpbWFsOiBkZWNpbWFsLFxyXG4gICAgICAgICAgICBkbWluOiBkbWluLFxyXG4gICAgICAgICAgICBkbWF4OiBkbWF4LFxyXG4gICAgICAgICAgICBkY291bnQ6IGRjb3VudCxcclxuICAgICAgICAgICAgcG9pbnQ6IHBvaW50XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcbiAgICBIYW5kbGUuZ2VuID0gZnVuY3Rpb24odGVtcGxhdGUsIG5hbWUsIGNvbnRleHQpIHtcclxuICAgICAgICBuYW1lID0gbmFtZSA9IChuYW1lIHx8IFwiXCIpICsgXCJcIjtcclxuICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCB7fTtcclxuICAgICAgICBjb250ZXh0ID0ge1xyXG4gICAgICAgICAgICBwYXRoOiBjb250ZXh0LnBhdGggfHwgW10sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogY29udGV4dC50ZW1wbGF0ZVBhdGggfHwgW10sXHJcbiAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiBjb250ZXh0LmN1cnJlbnRDb250ZXh0LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBjb250ZXh0LnRlbXBsYXRlQ3VycmVudENvbnRleHQgfHwgdGVtcGxhdGUsXHJcbiAgICAgICAgICAgIHJvb3Q6IGNvbnRleHQucm9vdCxcclxuICAgICAgICAgICAgdGVtcGxhdGVSb290OiBjb250ZXh0LnRlbXBsYXRlUm9vdFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHJ1bGUgPSBIYW5kbGUucnVsZShuYW1lKTtcclxuICAgICAgICB2YXIgdHlwZSA9IFV0aWwudHlwZSh0ZW1wbGF0ZSk7XHJcbiAgICAgICAgaWYgKEhhbmRsZVt0eXBlXSkge1xyXG4gICAgICAgICAgICByZXR1cm4gSGFuZGxlW3R5cGVdKHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgcGFyc2VkTmFtZTogbmFtZSA/IG5hbWUucmVwbGFjZShya2V5LCBcIiQxXCIpIDogbmFtZSxcclxuICAgICAgICAgICAgICAgIHJ1bGU6IHJ1bGUsXHJcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBjb250ZXh0XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XHJcbiAgICB9O1xyXG4gICAgSGFuZGxlLmV4dGVuZCh7XHJcbiAgICAgICAgYXJyYXk6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdLCBpLCBqO1xyXG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucnVsZS5wYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2goaSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goSGFuZGxlLmdlbihvcHRpb25zLnRlbXBsYXRlW2ldLCBpLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5jb3VudCA9PT0gMSAmJiBvcHRpb25zLnRlbXBsYXRlLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKG9wdGlvbnMubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gUmFuZG9tLnBpY2soSGFuZGxlLmdlbihvcHRpb25zLnRlbXBsYXRlLCB1bmRlZmluZWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGhcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLnJ1bGUuY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goSGFuZGxlLmdlbihvcHRpb25zLnRlbXBsYXRlW2orK10pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSB3aGlsZSAoaiA8IG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG9iamVjdDogZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge30sIGtleXMsIGZuS2V5cywga2V5LCBwYXJzZWRLZXksIGluYywgaTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5taW4pIHtcclxuICAgICAgICAgICAgICAgIGtleXMgPSBVdGlsLmtleXMob3B0aW9ucy50ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBrZXlzID0gUmFuZG9tLnNodWZmbGUoa2V5cyk7XHJcbiAgICAgICAgICAgICAgICBrZXlzID0ga2V5cy5zbGljZSgwLCBvcHRpb25zLnJ1bGUuY291bnQpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZEtleSA9IGtleS5yZXBsYWNlKHJrZXksIFwiJDFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChwYXJzZWRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtwYXJzZWRLZXldID0gSGFuZGxlLmdlbihvcHRpb25zLnRlbXBsYXRlW2tleV0sIGtleSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAga2V5cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm5LZXlzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGtleSBpbiBvcHRpb25zLnRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBvcHRpb25zLnRlbXBsYXRlW2tleV0gPT09IFwiZnVuY3Rpb25cIiA/IGZuS2V5cyA6IGtleXMpLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChmbktleXMpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZEtleSA9IGtleS5yZXBsYWNlKHJrZXksIFwiJDFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChwYXJzZWRLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtwYXJzZWRLZXldID0gSGFuZGxlLmdlbihvcHRpb25zLnRlbXBsYXRlW2tleV0sIGtleSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGluYyA9IGtleS5tYXRjaChya2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5jICYmIGluY1syXSAmJiBVdGlsLnR5cGUob3B0aW9ucy50ZW1wbGF0ZVtrZXldKSA9PT0gXCJudW1iZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlW2tleV0gKz0gcGFyc2VJbnQoaW5jWzJdLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBudW1iZXI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCwgcGFydHMsIGk7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnJ1bGUucG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUgKz0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHBhcnRzID0gb3B0aW9ucy50ZW1wbGF0ZS5zcGxpdChcIi5cIik7XHJcbiAgICAgICAgICAgICAgICBwYXJ0c1swXSA9IG9wdGlvbnMucnVsZS5yYW5nZSA/IG9wdGlvbnMucnVsZS5jb3VudCA6IHBhcnRzWzBdO1xyXG4gICAgICAgICAgICAgICAgcGFydHNbMV0gPSAocGFydHNbMV0gfHwgXCJcIikuc2xpY2UoMCwgb3B0aW9ucy5ydWxlLmRjb3VudCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBwYXJ0c1sxXS5sZW5ndGggPCBvcHRpb25zLnJ1bGUuZGNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0c1sxXSArPSBSYW5kb20uY2hhcmFjdGVyKFwibnVtYmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gcGFyc2VGbG9hdChwYXJ0cy5qb2luKFwiLlwiKSwgMTApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb3B0aW9ucy5ydWxlLnJhbmdlICYmICFvcHRpb25zLnJ1bGUucGFyYW1ldGVyc1syXSA/IG9wdGlvbnMucnVsZS5jb3VudCA6IG9wdGlvbnMudGVtcGxhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiYm9vbGVhblwiOiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQ7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IG9wdGlvbnMucnVsZS5wYXJhbWV0ZXJzID8gUmFuZG9tLmJvb2wob3B0aW9ucy5ydWxlLm1pbiwgb3B0aW9ucy5ydWxlLm1heCwgb3B0aW9ucy50ZW1wbGF0ZSkgOiBvcHRpb25zLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RyaW5nOiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBcIlwiLCBpLCBwbGFjZWhvbGRlcnMsIHBoLCBwaGVkO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLnJ1bGUuY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBvcHRpb25zLnRlbXBsYXRlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJzID0gcmVzdWx0Lm1hdGNoKHJwbGFjZWhvbGRlcikgfHwgW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGxhY2Vob2xkZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGggPSBwbGFjZWhvbGRlcnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9eXFxcXC8udGVzdChwaCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJzLnNwbGljZShpLS0sIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcGhlZCA9IEhhbmRsZS5wbGFjZWhvbGRlcihwaCwgb3B0aW9ucy5jb250ZXh0LmN1cnJlbnRDb250ZXh0LCBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVDdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVycy5sZW5ndGggPT09IDEgJiYgcGggPT09IHJlc3VsdCAmJiB0eXBlb2YgcGhlZCAhPT0gdHlwZW9mIHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwaGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNOdW1lcmljKHBoZWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwYXJzZUZsb2F0KHBoZWQsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXih0cnVlfGZhbHNlKSQvLnRlc3QocGhlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBoZWQgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IHBoZWQgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogcGhlZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHBoLCBwaGVkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9wdGlvbnMucnVsZS5yYW5nZSA/IFJhbmRvbS5zdHJpbmcob3B0aW9ucy5ydWxlLmNvdW50KSA6IG9wdGlvbnMudGVtcGxhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZnVuY3Rpb25cIjogZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy50ZW1wbGF0ZS5jYWxsKG9wdGlvbnMuY29udGV4dC5jdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBIYW5kbGUuZXh0ZW5kKHtcclxuICAgICAgICBfYWxsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHJlID0ge307XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBSYW5kb20pIHJlW2tleS50b0xvd2VyQ2FzZSgpXSA9IGtleTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGxhY2Vob2xkZXI6IGZ1bmN0aW9uKHBsYWNlaG9sZGVyLCBvYmosIHRlbXBsYXRlQ29udGV4dCkge1xyXG4gICAgICAgICAgICBycGxhY2Vob2xkZXIuZXhlYyhcIlwiKTtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gcnBsYWNlaG9sZGVyLmV4ZWMocGxhY2Vob2xkZXIpLCBrZXkgPSBwYXJ0cyAmJiBwYXJ0c1sxXSwgbGtleSA9IGtleSAmJiBrZXkudG9Mb3dlckNhc2UoKSwgb2tleSA9IHRoaXMuX2FsbCgpW2xrZXldLCBwYXJhbXMgPSBwYXJ0cyAmJiBwYXJ0c1syXSB8fCBcIlwiO1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gZXZhbChcIihmdW5jdGlvbigpeyByZXR1cm4gW10uc3BsaWNlLmNhbGwoYXJndW1lbnRzLCAwICkgfSkoXCIgKyBwYXJhbXMgKyBcIilcIik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBwYXJ0c1syXS5zcGxpdCgvLFxccyovKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAob2JqICYmIGtleSBpbiBvYmopIHJldHVybiBvYmpba2V5XTtcclxuICAgICAgICAgICAgaWYgKHRlbXBsYXRlQ29udGV4dCAmJiB0eXBlb2YgdGVtcGxhdGVDb250ZXh0ID09PSBcIm9iamVjdFwiICYmIGtleSBpbiB0ZW1wbGF0ZUNvbnRleHQgJiYgcGxhY2Vob2xkZXIgIT09IHRlbXBsYXRlQ29udGV4dFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZUNvbnRleHRba2V5XSA9IEhhbmRsZS5nZW4odGVtcGxhdGVDb250ZXh0W2tleV0sIGtleSwge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiBvYmosXHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogdGVtcGxhdGVDb250ZXh0XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZUNvbnRleHRba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIShrZXkgaW4gUmFuZG9tKSAmJiAhKGxrZXkgaW4gUmFuZG9tKSAmJiAhKG9rZXkgaW4gUmFuZG9tKSkgcmV0dXJuIHBsYWNlaG9sZGVyO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcnBsYWNlaG9sZGVyLmV4ZWMoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocnBsYWNlaG9sZGVyLnRlc3QocGFyYW1zW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtc1tpXSA9IEhhbmRsZS5wbGFjZWhvbGRlcihwYXJhbXNbaV0sIG9iaik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IFJhbmRvbVtrZXldIHx8IFJhbmRvbVtsa2V5XSB8fCBSYW5kb21bb2tleV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAoVXRpbC50eXBlKGhhbmRsZSkpIHtcclxuICAgICAgICAgICAgICBjYXNlIFwiYXJyYXlcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhoYW5kbGUpO1xyXG5cclxuICAgICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcclxuICAgICAgICAgICAgICAgIHZhciByZSA9IGhhbmRsZS5hcHBseShSYW5kb20sIHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmUgPT09IHVuZGVmaW5lZCkgcmUgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvKiEgc3JjL21vY2tqYXguanMgKi9cclxuICAgIGZ1bmN0aW9uIGZpbmQob3B0aW9ucykge1xyXG4gICAgICAgIGZvciAodmFyIHNVcmxUeXBlIGluIE1vY2suX21vY2tlZCkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IE1vY2suX21vY2tlZFtzVXJsVHlwZV07XHJcbiAgICAgICAgICAgIGlmICgoIWl0ZW0ucnVybCB8fCBtYXRjaChpdGVtLnJ1cmwsIG9wdGlvbnMudXJsKSkgJiYgKCFpdGVtLnJ0eXBlIHx8IG1hdGNoKGl0ZW0ucnR5cGUsIG9wdGlvbnMudHlwZS50b0xvd2VyQ2FzZSgpKSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZ1bmN0aW9uIG1hdGNoKGV4cGVjdGVkLCBhY3R1YWwpIHtcclxuICAgICAgICAgICAgaWYgKFV0aWwudHlwZShleHBlY3RlZCkgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBleHBlY3RlZCA9PT0gYWN0dWFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChVdGlsLnR5cGUoZXhwZWN0ZWQpID09PSBcInJlZ2V4cFwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWQudGVzdChhY3R1YWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY29udmVydChpdGVtLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIFV0aWwuaXNGdW5jdGlvbihpdGVtLnRlbXBsYXRlKSA/IGl0ZW0udGVtcGxhdGUob3B0aW9ucykgOiBNb2NrLm1vY2soaXRlbS50ZW1wbGF0ZSk7XHJcbiAgICB9XHJcbiAgICBNb2NrLm1vY2tqYXggPSBmdW5jdGlvbiBtb2NramF4KGpRdWVyeSkge1xyXG4gICAgICAgIGZ1bmN0aW9uIG1vY2t4aHIoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICByZWFkeVN0YXRlOiA0LFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgb3BlbjogalF1ZXJ5Lm5vb3AsXHJcbiAgICAgICAgICAgICAgICBzZW5kOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vbmxvYWQpIHRoaXMub25sb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc2V0UmVxdWVzdEhlYWRlcjogalF1ZXJ5Lm5vb3AsXHJcbiAgICAgICAgICAgICAgICBnZXRBbGxSZXNwb25zZUhlYWRlcnM6IGpRdWVyeS5ub29wLFxyXG4gICAgICAgICAgICAgICAgZ2V0UmVzcG9uc2VIZWFkZXI6IGpRdWVyeS5ub29wLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogalF1ZXJ5Lm5vb3AsXHJcbiAgICAgICAgICAgICAgICBhYm9ydDogalF1ZXJ5Lm5vb3BcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gcHJlZmlsdGVyKG9wdGlvbnMsIG9yaWdpbmFsT3B0aW9ucywganFYSFIpIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBmaW5kKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kYXRhRmlsdGVyID0gb3B0aW9ucy5jb252ZXJ0ZXJzW1widGV4dCBqc29uXCJdID0gb3B0aW9ucy5jb252ZXJ0ZXJzW1widGV4dCBqc29ucFwiXSA9IG9wdGlvbnMuY29udmVydGVyc1tcInRleHQgc2NyaXB0XCJdID0gb3B0aW9ucy5jb252ZXJ0ZXJzW1wic2NyaXB0IGpzb25cIl0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udmVydChpdGVtLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLnhociA9IG1vY2t4aHI7XHJcbiAgICAgICAgICAgICAgICBpZiAob3JpZ2luYWxPcHRpb25zLmRhdGFUeXBlICE9PSBcInNjcmlwdFwiKSByZXR1cm4gXCJqc29uXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgalF1ZXJ5LmFqYXhQcmVmaWx0ZXIoXCJqc29uIGpzb25wIHNjcmlwdFwiLCBwcmVmaWx0ZXIpO1xyXG4gICAgICAgIHJldHVybiBNb2NrO1xyXG4gICAgfTtcclxuICAgIGlmICh0eXBlb2YgalF1ZXJ5ICE9IFwidW5kZWZpbmVkXCIpIE1vY2subW9ja2pheChqUXVlcnkpO1xyXG4gICAgaWYgKHR5cGVvZiBaZXB0byAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgTW9jay5tb2NramF4ID0gZnVuY3Rpb24oWmVwdG8pIHtcclxuICAgICAgICAgICAgdmFyIF9fb3JpZ2luYWxfYWpheCA9IFplcHRvLmFqYXg7XHJcbiAgICAgICAgICAgIHZhciB4aHIgPSB7XHJcbiAgICAgICAgICAgICAgICByZWFkeVN0YXRlOiA0LFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VUZXh0OiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VYTUw6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzdGF0ZTogMixcclxuICAgICAgICAgICAgICAgIHN0YXR1czogMjAwLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzVGV4dDogXCJzdWNjZXNzXCIsXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0VGltZXI6IG51bGxcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgWmVwdG8uYWpheCA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gZmluZChvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soaXRlbS50ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc3VjY2Vzcykgb3B0aW9ucy5zdWNjZXNzKGRhdGEsIHhociwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29tcGxldGUpIG9wdGlvbnMuY29tcGxldGUoeGhyLnN0YXR1cywgeGhyLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geGhyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fb3JpZ2luYWxfYWpheC5jYWxsKFplcHRvLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2subW9ja2pheChaZXB0byk7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIEtJU1NZICE9IFwidW5kZWZpbmVkXCIgJiYgS0lTU1kuYWRkKSB7XHJcbiAgICAgICAgTW9jay5tb2NramF4ID0gZnVuY3Rpb24gbW9ja2pheChLSVNTWSkge1xyXG4gICAgICAgICAgICB2YXIgX29yaWdpbmFsX2FqYXggPSBLSVNTWS5pbztcclxuICAgICAgICAgICAgdmFyIHhociA9IHtcclxuICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU6IDQsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZVRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZVhNTDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiAyLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRpbWVvdXRUaW1lcjogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBLSVNTWS5pbyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpdGVtID0gZmluZChvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soaXRlbS50ZW1wbGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuc3VjY2Vzcykgb3B0aW9ucy5zdWNjZXNzKGRhdGEsIHhociwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMuY29tcGxldGUpIG9wdGlvbnMuY29tcGxldGUoeGhyLnN0YXR1cywgeGhyLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geGhyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9vcmlnaW5hbF9hamF4LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gX29yaWdpbmFsX2FqYXgpIHtcclxuICAgICAgICAgICAgICAgIEtJU1NZLmlvW25hbWVdID0gX29yaWdpbmFsX2FqYXhbbmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgLyohIHNyYy9leHBvc2UuanMgKi9cclxuICAgIE1vY2suVXRpbCA9IFV0aWw7XHJcbiAgICBNb2NrLlJhbmRvbSA9IFJhbmRvbTtcclxuICAgIE1vY2suaGVyZWRvYyA9IFV0aWwuaGVyZWRvYztcclxuICAgIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBNb2NrO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xyXG4gICAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIE1vY2s7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuY21kKSB7XHJcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTW9jaztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRoaXMuTW9jayA9IE1vY2s7XHJcbiAgICB0aGlzLlJhbmRvbSA9IFJhbmRvbTtcclxuICAgIGlmICh0eXBlb2YgS0lTU1kgIT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIFV0aWwuZWFjaChbIFwibW9ja1wiLCBcImNvbXBvbmVudHMvbW9jay9cIiwgXCJtb2NrL2Rpc3QvbW9ja1wiLCBcImdhbGxlcnkvTW9jay8wLjEuMS9cIiwgXCJnYWxsZXJ5L01vY2svMC4xLjIvXCIsIFwiZ2FsbGVyeS9Nb2NrLzAuMS4zL1wiIF0sIGZ1bmN0aW9uIHJlZ2lzdGVyKG5hbWUpIHtcclxuICAgICAgICAgICAgS0lTU1kuYWRkKG5hbWUsIGZ1bmN0aW9uKFMpIHtcclxuICAgICAgICAgICAgICAgIE1vY2subW9ja2pheChTKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNb2NrO1xyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICByZXF1aXJlczogWyBcImFqYXhcIiBdXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLyohIHNyYy9tb2NrNHRwbC5qcyAqL1xyXG4gICAgKGZ1bmN0aW9uKHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHZhciBNb2NrNFRwbCA9IHtcclxuICAgICAgICAgICAgdmVyc2lvbjogXCIwLjAuMVwiXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAoIXRoaXMuTW9jaykgbW9kdWxlLmV4cG9ydHMgPSBNb2NrNFRwbDtcclxuICAgICAgICBNb2NrLnRwbCA9IGZ1bmN0aW9uKGlucHV0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICByZXR1cm4gTW9jazRUcGwubW9jayhpbnB1dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jay5wYXJzZSA9IGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBIYW5kbGViYXJzLnBhcnNlKGlucHV0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0VHBsLm1vY2sgPSBmdW5jdGlvbihpbnB1dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgaGVscGVycyA9IGhlbHBlcnMgPyBVdGlsLmV4dGVuZCh7fSwgaGVscGVycywgSGFuZGxlYmFycy5oZWxwZXJzKSA6IEhhbmRsZWJhcnMuaGVscGVycztcclxuICAgICAgICAgICAgcGFydGlhbHMgPSBwYXJ0aWFscyA/IFV0aWwuZXh0ZW5kKHt9LCBwYXJ0aWFscywgSGFuZGxlYmFycy5wYXJ0aWFscykgOiBIYW5kbGViYXJzLnBhcnRpYWxzO1xyXG4gICAgICAgICAgICByZXR1cm4gSGFuZGxlLmdlbihpbnB1dCwgbnVsbCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIEhhbmRsZSA9IHtcclxuICAgICAgICAgICAgZGVidWc6IE1vY2s0VHBsLmRlYnVnIHx8IGZhbHNlLFxyXG4gICAgICAgICAgICBleHRlbmQ6IFV0aWwuZXh0ZW5kXHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUuZ2VuID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcobm9kZSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhc3QgPSBIYW5kbGViYXJzLnBhcnNlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IEhhbmRsZS5wYXJzZU9wdGlvbnMobm9kZSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IEhhbmRsZS5nZW4oYXN0LCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCBbIHt9IF07XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgICAgICBpZiAodGhpc1tub2RlLnR5cGVdID09PSBVdGlsLm5vb3ApIHJldHVybjtcclxuICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGggPSBvcHRpb25zLl9fcGF0aCB8fCBbXTtcclxuICAgICAgICAgICAgaWYgKE1vY2s0VHBsLmRlYnVnIHx8IEhhbmRsZS5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXAoXCJbXCIgKyBub2RlLnR5cGUgKyBcIl1cIiwgSlNPTi5zdHJpbmdpZnkobm9kZSkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbb3B0aW9uc11cIiwgb3B0aW9ucy5fX3BhdGgubGVuZ3RoLCBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHByZUxlbmd0aCA9IG9wdGlvbnMuX19wYXRoLmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpc1tub2RlLnR5cGVdKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGguc3BsaWNlKHByZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIGlmIChNb2NrNFRwbC5kZWJ1ZyB8fCBIYW5kbGUuZGVidWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29udGV4dFtjb250ZXh0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLnBhcnNlT3B0aW9ucyA9IGZ1bmN0aW9uKGlucHV0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciByQ29tbWVudCA9IC88IS0tXFxzKlxcbipNb2NrXFxzKlxcbiooW1xcd1xcV10rPylcXHMqXFxuKi0tPi9nO1xyXG4gICAgICAgICAgICB2YXIgY29tbWVudHMgPSBpbnB1dC5tYXRjaChyQ29tbWVudCksIHJldCA9IHt9LCBpLCBtYSwgb3B0aW9uO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBjb21tZW50cyAmJiBpIDwgY29tbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJDb21tZW50Lmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBtYSA9IHJDb21tZW50LmV4ZWMoY29tbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gbmV3IEZ1bmN0aW9uKFwicmV0dXJuIFwiICsgbWFbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IG9wdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXh0ZW5kKHJldCwgb3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gVXRpbC5leHRlbmQocmV0LCBvcHRpb25zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS52YWwgPSBmdW5jdGlvbihuYW1lLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpIHtcclxuICAgICAgICAgICAgaWYgKG5hbWUgIT09IG9wdGlvbnMuX19wYXRoW29wdGlvbnMuX19wYXRoLmxlbmd0aCAtIDFdKSB0aHJvdyBuZXcgRXJyb3IobmFtZSArIFwiIT09XCIgKyBvcHRpb25zLl9fcGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChNb2NrNFRwbC5kZWJ1ZyB8fCBIYW5kbGUuZGVidWcpIGNvbnNvbGUubG9nKFwiW29wdGlvbnNdXCIsIG5hbWUsIG9wdGlvbnMuX19wYXRoKTtcclxuICAgICAgICAgICAgaWYgKGRlZiAhPT0gdW5kZWZpbmVkKSBkZWYgPSBNb2NrLm1vY2soZGVmKTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBtb2NrZWQgPSBNb2NrLm1vY2sob3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhtb2NrZWQpKSByZXR1cm4gbW9ja2VkO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgaW4gbW9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vY2tlZFtuYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc0FycmF5KGNvbnRleHRbMF0pKSByZXR1cm4ge307XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYgIT09IHVuZGVmaW5lZCA/IGRlZiA6IG5hbWUgfHwgUmFuZG9tLndvcmQoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5wcm9ncmFtID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLnN0YXRlbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUuc3RhdGVtZW50c1tpXSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUubXVzdGFjaGUgPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICB2YXIgaSwgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdLCBjb250ZXh0TGVuZ3RoID0gY29udGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChVdGlsLnR5cGUoY3VycmVudENvbnRleHQpID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0LnB1c2goe30pO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJyZW50Q29udGV4dC5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKG5vZGUuaXNIZWxwZXIgfHwgaGVscGVycyAmJiBoZWxwZXJzW25vZGUuaWQuc3RyaW5nXSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUucGFyYW1zLmxlbmd0aCA9PT0gMCkge30gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5vZGUucGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUucGFyYW1zW2ldLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG5vZGUuaGFzaCkgdGhpcy5nZW4obm9kZS5oYXNoLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLmlkLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gY29udGV4dExlbmd0aCkgY29udGV4dC5zcGxpY2UoMCwgY29udGV4dC5sZW5ndGggLSBjb250ZXh0TGVuZ3RoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5ibG9jayA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IG5vZGUubXVzdGFjaGUuaWQucGFydHMsIGksIGxlbiwgY3VyLCB2YWwsIHR5cGUsIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFswXSwgY29udGV4dExlbmd0aCA9IGNvbnRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5pbnZlcnNlKSB7fVxyXG4gICAgICAgICAgICBpZiAobm9kZS5tdXN0YWNoZS5pc0hlbHBlciB8fCBoZWxwZXJzICYmIGhlbHBlcnNbbm9kZS5tdXN0YWNoZS5pZC5zdHJpbmddKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gcGFydHNbMF07XHJcbiAgICAgICAgICAgICAgICB2YWwgPSAoSGVscGVyc1t0eXBlXSB8fCBIZWxwZXJzLmN1c3RvbSkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFswXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2gocGFydHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ciA9IHBhcnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwge30pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFV0aWwudHlwZShjdXJyZW50Q29udGV4dFtjdXJdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5wcm9ncmFtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0KSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gdmFsLmxlbmd0aCB8fCBSYW5kb20uaW50ZWdlcigzLCA3KTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQucHVzaCh0eXBlb2YgdmFsW2ldICE9PSBcInVuZGVmaW5lZFwiID8gdmFsW2ldIDoge30pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKFwiW11cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dFtjdXJyZW50Q29udGV4dC5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUucHJvZ3JhbSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB0aGlzLmdlbihub2RlLnByb2dyYW0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5sZW5ndGggPiBjb250ZXh0TGVuZ3RoKSBjb250ZXh0LnNwbGljZSgwLCBjb250ZXh0Lmxlbmd0aCAtIGNvbnRleHRMZW5ndGgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLmhhc2ggPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICB2YXIgcGFpcnMgPSBub2RlLnBhaXJzLCBwYWlyLCBpLCBqO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHBhaXIgPSBwYWlyc1tpXTtcclxuICAgICAgICAgICAgICAgIGZvciAoaiA9IDE7IGogPCBwYWlyLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW4ocGFpcltqXSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUuSUQgPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IG5vZGUucGFydHMsIGksIGxlbiwgY3VyLCBwcmV2LCBkZWYsIHZhbCwgdHlwZSwgdmFsVHlwZSwgcHJlT3B0aW9ucywgY3VycmVudENvbnRleHQgPSBjb250ZXh0W25vZGUuZGVwdGhdLCBjb250ZXh0TGVuZ3RoID0gY29udGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY3VycmVudENvbnRleHQpKSBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbbm9kZS5kZXB0aCArIDFdO1xyXG4gICAgICAgICAgICBpZiAoIXBhcnRzLmxlbmd0aCkge30gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2gocGFydHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ciA9IHBhcnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXYgPSBwYXJ0c1tpIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlT3B0aW9ucyA9IG9wdGlvbnNbcHJldl07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmID0gaSA9PT0gbGVuIC0gMSA/IGN1cnJlbnRDb250ZXh0W2N1cl0gOiB7fTtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbChjdXIsIG9wdGlvbnMsIGNvbnRleHQsIGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFV0aWwudHlwZShjdXJyZW50Q29udGV4dFtjdXJdKTtcclxuICAgICAgICAgICAgICAgICAgICB2YWxUeXBlID0gVXRpbC50eXBlKHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBsZW4gLSAxICYmIHZhbFR5cGUgIT09IFwib2JqZWN0XCIgJiYgdmFsVHlwZSAhPT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtjdXJdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtjdXJdID0gVXRpbC5pc0FycmF5KHZhbCkgJiYgW10gfHwgdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPCBsZW4gLSAxICYmIHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZSAhPT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtjdXJdID0gVXRpbC5pc0FycmF5KHZhbCkgJiYgW10gfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFV0aWwudHlwZShjdXJyZW50Q29udGV4dFtjdXJdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5sZW5ndGggPiBjb250ZXh0TGVuZ3RoKSBjb250ZXh0LnNwbGljZSgwLCBjb250ZXh0Lmxlbmd0aCAtIGNvbnRleHRMZW5ndGgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLnBhcnRpYWwgPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IG5vZGUucGFydGlhbE5hbWUubmFtZSwgcGFydGlhbCA9IHBhcnRpYWxzICYmIHBhcnRpYWxzW25hbWVdLCBjb250ZXh0TGVuZ3RoID0gY29udGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChwYXJ0aWFsKSBIYW5kbGUuZ2VuKHBhcnRpYWwsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgaWYgKGNvbnRleHQubGVuZ3RoID4gY29udGV4dExlbmd0aCkgY29udGV4dC5zcGxpY2UoMCwgY29udGV4dC5sZW5ndGggLSBjb250ZXh0TGVuZ3RoKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5jb250ZW50ID0gVXRpbC5ub29wO1xyXG4gICAgICAgIEhhbmRsZS5QQVJUSUFMX05BTUUgPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgSGFuZGxlLkRBVEEgPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgSGFuZGxlLlNUUklORyA9IFV0aWwubm9vcDtcclxuICAgICAgICBIYW5kbGUuSU5URUdFUiA9IFV0aWwubm9vcDtcclxuICAgICAgICBIYW5kbGUuQk9PTEVBTiA9IFV0aWwubm9vcDtcclxuICAgICAgICBIYW5kbGUuY29tbWVudCA9IFV0aWwubm9vcDtcclxuICAgICAgICB2YXIgSGVscGVycyA9IHt9O1xyXG4gICAgICAgIEhlbHBlcnMuZWFjaCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIGksIGxlbiwgY3VyLCB2YWwsIHBhcnRzLCBkZWYsIHR5cGUsIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFswXTtcclxuICAgICAgICAgICAgcGFydHMgPSBub2RlLm11c3RhY2hlLnBhcmFtc1swXS5wYXJ0cztcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2gocGFydHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgY3VyID0gcGFydHNbaV07XHJcbiAgICAgICAgICAgICAgICBkZWYgPSBpID09PSBsZW4gLSAxID8gW10gOiB7fTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwgZGVmKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB2YWw7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIgfHwgdHlwZSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhlbHBlcnNbXCJpZlwiXSA9IEhlbHBlcnMudW5sZXNzID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gbm9kZS5tdXN0YWNoZS5wYXJhbXMsIGksIGosIGN1ciwgdmFsLCBwYXJ0cywgZGVmLCB0eXBlLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbMF07XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJhbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHBhcnRzID0gcGFyYW1zW2ldLnBhcnRzO1xyXG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHBhcnRzLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIG9wdGlvbnMuX19wYXRoLnB1c2gocGFydHNbal0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1ciA9IHBhcnRzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZiA9IGogPT09IHBhcnRzLmxlbmd0aCAtIDEgPyBcIkBCT09MKDIsMSx0cnVlKVwiIDoge307XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChqID09PSBwYXJ0cy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHZhbCA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogdmFsID09PSBcImZhbHNlXCIgPyBmYWxzZSA6IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IFV0aWwuaXNBcnJheSh2YWwpID8gW10gOiB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFV0aWwudHlwZShjdXJyZW50Q29udGV4dFtjdXJdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGVscGVyc1tcIndpdGhcIl0gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBjdXIsIHZhbCwgcGFydHMsIGRlZiwgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdO1xyXG4gICAgICAgICAgICBwYXJ0cyA9IG5vZGUubXVzdGFjaGUucGFyYW1zWzBdLnBhcnRzO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2gocGFydHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgY3VyID0gcGFydHNbaV07XHJcbiAgICAgICAgICAgICAgICBkZWYgPSB7fTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwgZGVmKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gY3VycmVudENvbnRleHRbY3VyXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhlbHBlcnMubG9nID0gZnVuY3Rpb24oKSB7fTtcclxuICAgICAgICBIZWxwZXJzLmN1c3RvbSA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIGksIGxlbiwgY3VyLCB2YWwsIHBhcnRzLCBkZWYsIHR5cGUsIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFswXTtcclxuICAgICAgICAgICAgaWYgKG5vZGUubXVzdGFjaGUucGFyYW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChub2RlLm11c3RhY2hlLmlkLnN0cmluZyk7XHJcbiAgICAgICAgICAgICAgICBjdXIgPSBub2RlLm11c3RhY2hlLmlkLnN0cmluZztcclxuICAgICAgICAgICAgICAgIGRlZiA9IFwiQEJPT0woMiwxLHRydWUpXCI7XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbChjdXIsIG9wdGlvbnMsIGNvbnRleHQsIGRlZik7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtjdXJdID0gVXRpbC5pc0FycmF5KHZhbCkgJiYgW10gfHwgdmFsO1xyXG4gICAgICAgICAgICAgICAgdHlwZSA9IFV0aWwudHlwZShjdXJyZW50Q29udGV4dFtjdXJdKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0ID0gY3VycmVudENvbnRleHRbY3VyXTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFydHMgPSBub2RlLm11c3RhY2hlLnBhcmFtc1swXS5wYXJ0cztcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHBhcnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyID0gcGFydHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmID0gaSA9PT0gbGVuIC0gMSA/IFtdIDoge307XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9IFV0aWwudHlwZShjdXJyZW50Q29udGV4dFtjdXJdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH07XHJcbiAgICB9KS5jYWxsKHRoaXMpO1xyXG4gICAgLyohIHNyYy9tb2NrNHh0cGwuanMgKi9cclxuICAgIChmdW5jdGlvbih1bmRlZmluZWQpIHtcclxuICAgICAgICBpZiAodHlwZW9mIEtJU1NZID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgICAgICAgdmFyIE1vY2s0WFRwbCA9IHtcclxuICAgICAgICAgICAgZGVidWc6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgWFRlbXBsYXRlO1xyXG4gICAgICAgIEtJU1NZLnVzZShcInh0ZW1wbGF0ZVwiLCBmdW5jdGlvbihTLCBUKSB7XHJcbiAgICAgICAgICAgIFhUZW1wbGF0ZSA9IFQ7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKCF0aGlzLk1vY2spIG1vZHVsZS5leHBvcnRzID0gTW9jazRYVHBsO1xyXG4gICAgICAgIE1vY2sueHRwbCA9IGZ1bmN0aW9uKGlucHV0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICByZXR1cm4gTW9jazRYVHBsLm1vY2soaW5wdXQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2sueHBhcnNlID0gZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFhUZW1wbGF0ZS5jb21waWxlci5wYXJzZShpbnB1dCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwubW9jayA9IGZ1bmN0aW9uKGlucHV0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICBoZWxwZXJzID0gaGVscGVycyA/IFV0aWwuZXh0ZW5kKHt9LCBoZWxwZXJzLCBYVGVtcGxhdGUuUnVuVGltZS5jb21tYW5kcykgOiBYVGVtcGxhdGUuUnVuVGltZS5jb21tYW5kcztcclxuICAgICAgICAgICAgcGFydGlhbHMgPSBwYXJ0aWFscyA/IFV0aWwuZXh0ZW5kKHt9LCBwYXJ0aWFscywgWFRlbXBsYXRlLlJ1blRpbWUuc3ViVHBscykgOiBYVGVtcGxhdGUuUnVuVGltZS5zdWJUcGxzO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW4oaW5wdXQsIG51bGwsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCB7fSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwucGFyc2UgPSBmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWFRlbXBsYXRlLmNvbXBpbGVyLnBhcnNlKGlucHV0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5nZW4gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBub2RlID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoTW9jazRYVHBsLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbdHBsICAgIF1cXG5cIiwgbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXIgYXN0ID0gdGhpcy5wYXJzZShub2RlKTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSB0aGlzLnBhcnNlT3B0aW9ucyhub2RlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gdGhpcy5nZW4oYXN0LCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29udGV4dCA9IGNvbnRleHQgfHwgWyB7fSBdO1xyXG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuICAgICAgICAgICAgbm9kZS50eXBlID0gbm9kZS50eXBlO1xyXG4gICAgICAgICAgICBpZiAodGhpc1tub2RlLnR5cGVdID09PSBVdGlsLm5vb3ApIHJldHVybjtcclxuICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGggPSBvcHRpb25zLl9fcGF0aCB8fCBbXTtcclxuICAgICAgICAgICAgaWYgKE1vY2s0WFRwbC5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXAoXCJbXCIgKyBub2RlLnR5cGUgKyBcIl1cIiwgSlNPTi5zdHJpbmdpZnkobm9kZSkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbY29udGV4dF1cIiwgXCJbYmVmb3JlXVwiLCBjb250ZXh0Lmxlbmd0aCwgSlNPTi5zdHJpbmdpZnkoY29udGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbb3B0aW9uc11cIiwgXCJbYmVmb3JlXVwiLCBvcHRpb25zLl9fcGF0aC5sZW5ndGgsIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW290aGVyICBdXCIsIFwiW2JlZm9yZV1cIiwgSlNPTi5zdHJpbmdpZnkob3RoZXIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHJlTGVuZ3RoID0gb3B0aW9ucy5fX3BhdGgubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzW25vZGUudHlwZV0obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgaWYgKE1vY2s0WFRwbC5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbX19wYXRoIF1cIiwgXCJbYWZ0ZXIgXVwiLCBvcHRpb25zLl9fcGF0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFvdGhlci5ob2xkIHx8IHR5cGVvZiBvdGhlci5ob2xkID09PSBcImZ1bmN0aW9uXCIgJiYgIW90aGVyLmhvbGQobm9kZSwgb3B0aW9ucywgY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnNwbGljZShwcmVMZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChNb2NrNFhUcGwuZGVidWcpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW2NvbnRleHRdXCIsIFwiW2FmdGVyIF1cIiwgY29udGV4dC5sZW5ndGgsIEpTT04uc3RyaW5naWZ5KGNvbnRleHQpKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gY29udGV4dFtjb250ZXh0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLnBhcnNlT3B0aW9ucyA9IGZ1bmN0aW9uKGlucHV0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciByQ29tbWVudCA9IC88IS0tXFxzKlxcbipNb2NrXFxzKlxcbiooW1xcd1xcV10rPylcXHMqXFxuKi0tPi9nO1xyXG4gICAgICAgICAgICB2YXIgY29tbWVudHMgPSBpbnB1dC5tYXRjaChyQ29tbWVudCksIHJldCA9IHt9LCBpLCBtYSwgb3B0aW9uO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBjb21tZW50cyAmJiBpIDwgY29tbWVudHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHJDb21tZW50Lmxhc3RJbmRleCA9IDA7XHJcbiAgICAgICAgICAgICAgICBtYSA9IHJDb21tZW50LmV4ZWMoY29tbWVudHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gbmV3IEZ1bmN0aW9uKFwicmV0dXJuIFwiICsgbWFbMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbiA9IG9wdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIFV0aWwuZXh0ZW5kKHJldCwgb3B0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gVXRpbC5leHRlbmQocmV0LCBvcHRpb25zKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5wYXJzZVZhbCA9IGZ1bmN0aW9uKGV4cHIsIG9iamVjdCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBxdWVyeUFycmF5KHByb3AsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29udGV4dCA9PT0gXCJvYmplY3RcIiAmJiBwcm9wIGluIGNvbnRleHQpIHJldHVybiBbIGNvbnRleHRbcHJvcF0gXTtcclxuICAgICAgICAgICAgICAgIHZhciByZXQgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGV4dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldC5wdXNoLmFwcGx5KHJldCwgcXVlcnkocHJvcCwgWyBjb250ZXh0W2ldIF0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gcXVlcnlPYmplY3QocHJvcCwgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSBcIm9iamVjdFwiICYmIHByb3AgaW4gY29udGV4dCkgcmV0dXJuIFsgY29udGV4dFtwcm9wXSBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXQucHVzaC5hcHBseShyZXQsIHF1ZXJ5KHByb3AsIFsgY29udGV4dFtrZXldIF0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZnVuY3Rpb24gcXVlcnkocHJvcCwgc2V0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNldC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2V0W2ldICE9PSBcIm9iamVjdFwiKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcCBpbiBzZXRbaV0pIHJldC5wdXNoKHNldFtpXVtwcm9wXSk7IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXQucHVzaC5hcHBseShyZXQsIFV0aWwuaXNBcnJheShzZXRbaV0pID8gcXVlcnlBcnJheShwcm9wLCBzZXRbaV0pIDogcXVlcnlPYmplY3QocHJvcCwgc2V0W2ldKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBwYXJzZShleHByLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSB0eXBlb2YgZXhwciA9PT0gXCJzdHJpbmdcIiA/IGV4cHIuc3BsaXQoXCIuXCIpIDogZXhwci5zbGljZSgwKSwgc2V0ID0gWyBjb250ZXh0IF07XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAocGFydHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0ID0gcXVlcnkocGFydHMuc2hpZnQoKSwgc2V0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBzZXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlKGV4cHIsIG9iamVjdCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwudmFsID0gZnVuY3Rpb24obmFtZSwgb3B0aW9ucywgY29udGV4dCwgZGVmKSB7XHJcbiAgICAgICAgICAgIGlmIChuYW1lICE9PSBvcHRpb25zLl9fcGF0aFtvcHRpb25zLl9fcGF0aC5sZW5ndGggLSAxXSkgdGhyb3cgbmV3IEVycm9yKG5hbWUgKyBcIiE9PVwiICsgb3B0aW9ucy5fX3BhdGgpO1xyXG4gICAgICAgICAgICBpZiAoZGVmICE9PSB1bmRlZmluZWQpIGRlZiA9IE1vY2subW9jayhkZWYpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vY2tlZCA9IE1vY2subW9jayhvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKG1vY2tlZCkpIHJldHVybiBtb2NrZWQ7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gTW9jazRYVHBsLnBhcnNlVmFsKG9wdGlvbnMuX19wYXRoLCBtb2NrZWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldC5sZW5ndGggPiAwKSByZXR1cm4gcmV0WzBdO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgaW4gbW9ja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vY2tlZFtuYW1lXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc0FycmF5KGNvbnRleHRbMF0pKSByZXR1cm4ge307XHJcbiAgICAgICAgICAgIHJldHVybiBkZWYgIT09IHVuZGVmaW5lZCA/IGRlZiA6IG5hbWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwucHJvZ3JhbSA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuc3RhdGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5zdGF0ZW1lbnRzW2ldLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBub2RlLmludmVyc2UgJiYgaiA8IG5vZGUuaW52ZXJzZS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5pbnZlcnNlW2pdLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwuYmxvY2sgPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHRMZW5ndGggPSBjb250ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgdGhpcy5nZW4obm9kZS50cGwsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBVdGlsLmV4dGVuZCh7fSwgb3RoZXIsIHtcclxuICAgICAgICAgICAgICAgIGRlZjoge30sXHJcbiAgICAgICAgICAgICAgICBob2xkOiB0cnVlXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFswXSwgbW9ja2VkLCBpLCBsZW47XHJcbiAgICAgICAgICAgIGlmIChVdGlsLnR5cGUoY3VycmVudENvbnRleHQpID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgIG1vY2tlZCA9IHRoaXMudmFsKG9wdGlvbnMuX19wYXRoW29wdGlvbnMuX19wYXRoLmxlbmd0aCAtIDFdLCBvcHRpb25zLCBjb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIGxlbiA9IG1vY2tlZCAmJiBtb2NrZWQubGVuZ3RoIHx8IFJhbmRvbS5pbnRlZ2VyKDMsIDcpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQucHVzaChtb2NrZWQgJiYgbW9ja2VkW2ldICE9PSB1bmRlZmluZWQgPyBtb2NrZWRbaV0gOiB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHRbY3VycmVudENvbnRleHQubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUucHJvZ3JhbSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB0aGlzLmdlbihub2RlLnByb2dyYW0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIGlmICghb3RoZXIuaG9sZCB8fCB0eXBlb2Ygb3RoZXIuaG9sZCA9PT0gXCJmdW5jdGlvblwiICYmICFvdGhlci5ob2xkKG5vZGUsIG9wdGlvbnMsIGNvbnRleHQpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNwbGljZSgwLCBjb250ZXh0Lmxlbmd0aCAtIGNvbnRleHRMZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwudHBsID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChub2RlLnBhcmFtcyAmJiBub2RlLnBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG90aGVyID0gVXRpbC5leHRlbmQoe30sIG90aGVyLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhY2g6IFtdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlmXCI6IFwiQEJPT0woMiwxLHRydWUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzczogXCJAQk9PTCgyLDEsZmFsc2UpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2l0aFwiOiB7fVxyXG4gICAgICAgICAgICAgICAgICAgIH1bbm9kZS5wYXRoLnN0cmluZ10sXHJcbiAgICAgICAgICAgICAgICAgICAgaG9sZDoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlYWNoOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlmXCI6IGZ1bmN0aW9uKF8sIF9fLCBfX18sIG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxlc3M6IGZ1bmN0aW9uKF8sIF9fLCBfX18sIG5hbWUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndpdGhcIjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogZmFsc2VcclxuICAgICAgICAgICAgICAgICAgICB9W25vZGUucGF0aC5zdHJpbmddXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBpbnB1dDsgaSA8IG5vZGUucGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUucGF0aC5zdHJpbmcgPT09IFwiaW5jbHVkZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0ID0gcGFydGlhbHMgJiYgcGFydGlhbHNbbm9kZS5wYXJhbXNbaV0udmFsdWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpbnB1dCA9IG5vZGUucGFyYW1zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbnB1dCkgdGhpcy5nZW4oaW5wdXQsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5oYXNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5oYXNoLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5wYXRoLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwudHBsRXhwcmVzc2lvbiA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICB0aGlzLmdlbihub2RlLmV4cHJlc3Npb24sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwuY29udGVudCA9IFV0aWwubm9vcDtcclxuICAgICAgICBNb2NrNFhUcGwudW5hcnlFeHByZXNzaW9uID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC5tdWx0aXBsaWNhdGl2ZUV4cHJlc3Npb24gPSBNb2NrNFhUcGwuYWRkaXRpdmVFeHByZXNzaW9uID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUub3AxLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgVXRpbC5leHRlbmQoe30sIG90aGVyLCB7XHJcbiAgICAgICAgICAgICAgICBkZWY6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm9wMi50eXBlID09PSBcIm51bWJlclwiID8gbm9kZS5vcDIudmFsdWUuaW5kZXhPZihcIi5cIikgPiAtMSA/IFJhbmRvbS5mbG9hdCgtTWF0aC5wb3coMTAsIDEwKSwgTWF0aC5wb3coMTAsIDEwKSwgMSwgTWF0aC5wb3coMTAsIDYpKSA6IFJhbmRvbS5pbnRlZ2VyKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9KClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB0aGlzLmdlbihub2RlLm9wMiwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIFV0aWwuZXh0ZW5kKHt9LCBvdGhlciwge1xyXG4gICAgICAgICAgICAgICAgZGVmOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5vcDEudHlwZSA9PT0gXCJudW1iZXJcIiA/IG5vZGUub3AxLnZhbHVlLmluZGV4T2YoXCIuXCIpID4gLTEgPyBSYW5kb20uZmxvYXQoLU1hdGgucG93KDEwLCAxMCksIE1hdGgucG93KDEwLCAxMCksIDEsIE1hdGgucG93KDEwLCA2KSkgOiBSYW5kb20uaW50ZWdlcigpIDogdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAgICAgfSgpXHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5yZWxhdGlvbmFsRXhwcmVzc2lvbiA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICB0aGlzLmdlbihub2RlLm9wMSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5vcDIsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwuZXF1YWxpdHlFeHByZXNzaW9uID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC5jb25kaXRpb25hbEFuZEV4cHJlc3Npb24gPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLmNvbmRpdGlvbmFsT3JFeHByZXNzaW9uID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC5zdHJpbmcgPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLm51bWJlciA9IFV0aWwubm9vcDtcclxuICAgICAgICBNb2NrNFhUcGwuYm9vbGVhbiA9IFV0aWwubm9vcDtcclxuICAgICAgICBNb2NrNFhUcGwuaGFzaCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICB2YXIgcGFpcnMgPSBub2RlLnZhbHVlLCBrZXk7XHJcbiAgICAgICAgICAgIGZvciAoa2V5IGluIHBhaXJzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbihwYWlyc1trZXldLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwuaWQgPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgdmFyIGNvbnRleHRMZW5ndGggPSBjb250ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gbm9kZS5wYXJ0cywgY3VycmVudENvbnRleHQgPSBjb250ZXh0W25vZGUuZGVwdGhdLCBpLCBsZW4sIGN1ciwgZGVmLCB2YWw7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZpeChjdXJyZW50Q29udGV4dCwgaW5kZXgsIGxlbmd0aCwgbmFtZSwgdmFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IFV0aWwudHlwZShjdXJyZW50Q29udGV4dFtuYW1lXSksIHZhbFR5cGUgPSBVdGlsLnR5cGUodmFsKTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHZhbCA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogdmFsID09PSBcImZhbHNlXCIgPyBmYWxzZSA6IHZhbDtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgbGVuZ3RoIC0gMSAmJiAhVXRpbC5pc09iamVjdE9yQXJyYXkodmFsKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtuYW1lXSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W25hbWVdID0gVXRpbC5pc0FycmF5KHZhbCkgJiYgW10gfHwgdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgbGVuZ3RoIC0gMSAmJiB0eXBlICE9PSBcIm9iamVjdFwiICYmIHR5cGUgIT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtuYW1lXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlICE9PSBcIm9iamVjdFwiICYmIHR5cGUgIT09IFwiYXJyYXlcIiAmJiB2YWxUeXBlICE9PSBcIm9iamVjdFwiICYmIHZhbFR5cGUgIT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbbmFtZV0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudENvbnRleHRbbmFtZV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNBcnJheShjdXJyZW50Q29udGV4dCkpIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFtub2RlLmRlcHRoICsgMV07XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHBhcnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCAmJiBwYXJ0c1tpXSA9PT0gXCJ0aGlzXCIpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKC9eKHhpbmRleHx4Y291bnR8eGtleSkkLy50ZXN0KHBhcnRzW2ldKSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCAmJiBsZW4gPT09IDEgJiYgcGFydHNbaV0gaW4gaGVscGVycykgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgICAgIGN1ciA9IHBhcnRzW2ldO1xyXG4gICAgICAgICAgICAgICAgZGVmID0gaSA9PT0gbGVuIC0gMSA/IG90aGVyLmRlZiAhPT0gdW5kZWZpbmVkID8gb3RoZXIuZGVmIDogY29udGV4dFswXVtjdXJdIDoge307XHJcbiAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbChjdXIsIG9wdGlvbnMsIGNvbnRleHQsIGRlZik7XHJcbiAgICAgICAgICAgICAgICBpZiAoTW9jazRYVHBsLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbZGVmICAgIF1cIiwgSlNPTi5zdHJpbmdpZnkoZGVmKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbdmFsICAgIF1cIiwgSlNPTi5zdHJpbmdpZnkodmFsKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YWwgPSBmaXgoY3VycmVudENvbnRleHQsIGksIGxlbiwgY3VyLCB2YWwpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNPYmplY3RPckFycmF5KGN1cnJlbnRDb250ZXh0W2N1cl0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0ID0gY3VycmVudENvbnRleHRbY3VyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFvdGhlci5ob2xkIHx8IHR5cGVvZiBvdGhlci5ob2xkID09PSBcImZ1bmN0aW9uXCIgJiYgIW90aGVyLmhvbGQobm9kZSwgb3B0aW9ucywgY29udGV4dCwgY3VyLCB2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnNwbGljZSgwLCBjb250ZXh0Lmxlbmd0aCAtIGNvbnRleHRMZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pLmNhbGwodGhpcyk7XHJcbn0pLmNhbGwodGhpcyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9tb2NrLmpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gNCAxNVxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8yMC5cclxuICovXHJcbnZhciBtb2NrU2VsZWN0ID0gcmVxdWlyZSgnY29tcG9uZW50L21vY2stc2VsZWN0L21vY2stc2VsZWN0LmpzJyk7XHJcbnZhciBNb2NrID0gcmVxdWlyZSgnbW9jaycpO1xyXG5cclxudmFyIG1vY2tEYXRhID0gTW9jay5tb2NrKFxyXG4gICAge1xyXG4gICAgICAgICdkYXRhfDMtNSc6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgJ2lkfCsxJzogMSxcclxuICAgICAgICAgICAgICAgICduYW1lfDEnOiBbJ+aVsOWtpicsJ+ivreaWhycsJ+iLseivrScsJ+eJqeeQhicsJ+eUn+eJqSddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbik7XHJcbnZhciBtb2NrRGF0YTEgPSBNb2NrLm1vY2soXHJcbiAgICB7XHJcbiAgICAgICAgJ2RhdGF8My01JzogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAnaWR8KzEnOiAxLFxyXG4gICAgICAgICAgICAgICAgJ25hbWV8MSc6IFsn5pWw5a2mJywn6K+t5paHJywn6Iux6K+tJywn54mp55CGJywn55Sf54mpJ11cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH1cclxuKTtcclxuXHJcbm1vY2tTZWxlY3QoJ2RvbTEnLCBtb2NrRGF0YSwgZnVuY3Rpb24oaWQpe1xyXG4gICAgY29uc29sZS5sb2coaWQpO1xyXG59LGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zb2xlLmxvZygn6aG16Z2iMeWbnuiwgycpO1xyXG59LCdpZDEnKTtcclxuXHJcbm1vY2tTZWxlY3QoJ2RvbTInLCBtb2NrRGF0YTEsIGZ1bmN0aW9uKGlkKXtcclxuICAgIGNvbnNvbGUubG9nKGlkKTtcclxufSxmdW5jdGlvbigpe1xyXG4gICAgY29uc29sZS5sb2coJ+mhtemdojLlm57osIMnKTtcclxufSwnaWQyJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2RlbW8vdGVzdC1tb2NrLXNlbGVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDE1XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==