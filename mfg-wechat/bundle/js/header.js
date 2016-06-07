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

	module.exports = __webpack_require__(43);


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

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(44);
	__webpack_require__(46);

/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(45);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./public.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./public.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "/***reset css**/\r\nbody, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre,\r\nfieldset, button, input, textarea, th, td {\r\n    margin: 0 auto;\r\n    padding: 0;\r\n}\r\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\r\n    　　-webkit-appearance: none;\r\n}\r\ntextarea { -webkit-appearance: none;}\r\nul, ol { list-style: none; }\r\na { text-decoration: none; }\r\na:hover { text-decoration: none; }\r\na:visited{ text-decoration: none;}\r\na:link{ text-decoration: none;}\r\nq:before, q:after { content: ''; }\r\nimg { border: none; }\r\nbutton, input, select, textarea {\r\n    font-size: 100%;\r\n}\r\ntable {\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n}\r\nhtml { overflow-y: scroll;font-size:10px; }\r\nbody{font-size:1.4rem;color:#000;background:#ebebeb;font-family: '\\5FAE\\8F6F\\96C5\\9ED1'}\r\n/*\r\n根元素设置字体大小10px\r\n1rem=10px;\r\n1.4rem=14px;\r\n1.6rem=16px;\r\n*/\r\n/*public css*/\r\n.overflow{overflow:hidden;zoom:1}\r\n.center{text-align:center}\r\n.block{display:block}\r\n.display-none{display:none}\r\n.green{background:#00d535}\r\n.left{float:left}\r\n.right{float:right}\r\n.font-size12{font-size:1.2rem}\r\n.font-size16{font-size:1.6rem}\r\n.font-size26{font-size:2.6rem}\r\n.font-size28{font-size:2.8rem}\r\n.font-size30{font-size:3rem}\r\n.font-size32{font-size:3.2rem}\r\n.font-size36{font-size:3.6rem}\r\n.color-white{color:#fff}\r\n.color-black{color:#6e6e6e}\r\n.color-siliver{color:#c2c2c2}\r\n.color-gray{color: #bebebe}\r\n.color-green{color:#00d535 !important;}\r\n.color-darkgreen{color:#00af15}\r\n.color-cheng{color:#ff6000}\r\n.color-ff7f01{color: #ff7f01}\r\n.color-e85700{color:#e85700}\r\n.bg-siliver{background:#ebebeb}\r\n.bg-white{background:white}\r\n.bg-cheng{background:#ff7827}\r\n.bg-ff7f01{background: #ff7f01}\r\n.bg-e85700{background:#e85700}\r\n.bg-red{background:#ff5050}\r\n.bg-yellow{background:#ffb21d}\r\n.bg-golden{background:#ffe066}\r\n.bg-green{background:#00d535 !important; }\r\n.bg-darkgreen{background:#00af15}\r\n.box-padding{padding:0 3.2%}\r\n.box-padding-left{padding-left:3.2%}\r\n.box-padding-right{padding-right:3.2%}\r\n.box-padding-top{padding-top:1.4rem}\r\n.box-padding-bottom{padding-bottom:1.4rem}\r\n.border-bottom{border-bottom:1px solid #bebebe}\r\n.border-top{border-top:1px solid #bebebe}\r\n.border-left{border-left:1px solid #bebebe}\r\n.border-right{border-right:1px solid #bebebe}\r\n.margin-bottom{margin-bottom:1.6rem}\r\n.margin-left{margin-left:1.6rem}\r\n.margin-right{margin-right:1.6rem}\r\n.margin-top{margin-top:1.6rem}\r\n.color-red{color:red}\r\n.fr{float: right}\r\n.fl{float:left}\r\n.ml10{margin-left: 10px}\r\n.mr10{margin-right: 10px}\r\n.ml25{margin-left: 25px}\r\n.mr25{margin-right: 25px}\r\n.mlp6{margin-left: 6%}\r\n.mrp6{margin-right: 6%}\r\n.container{width:100%;}\r\n.pct50{width: 50%;}\r\n.pct30{width: 30%;}\r\n.pct20{width: 20%;}\r\n.pct25{width: 25%}\r\n/*menu 样式*/\r\n#menuContr{\r\n    width:13.3%;\r\n    position: fixed;\r\n    bottom: 23px;\r\n    right:23px;\r\n    z-index: 999;\r\n    display:block;\r\n}\r\n#menuShow{\r\n    position:fixed;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background:#fff;\r\n    opacity: 0.9;\r\n    z-index: 900;\r\n}\r\n#menuShow a{\r\n    width:16.8%;\r\n    position: absolute;\r\n}\r\n#menuShow a img{\r\n    width:100%;\r\n}\r\n.ktxa{\r\n    top:47.3%;\r\n    left:21.3%;\r\n}\r\n.kxjl{\r\n    top:47.3%;\r\n    right:21.3%;\r\n}\r\n.ctjj{\r\n    top:66.6%;\r\n    left:21.3%;\r\n}\r\n.myrx{\r\n    top:66.6%;\r\n    right:21.3%;\r\n}\r\n/****消息弹出框start*****/\r\n.popmsg{\r\n    background:rgba(0,0,0,0.8) ;\r\n    top: 20%;\r\n    left:23%;\r\n    width: 54%;\r\n    height: 150px;\r\n    position: fixed;\r\n    color: #ffffff;\r\n    text-align: center;\r\n    line-height: 20px;\r\n    border-radius: 5px;\r\n    display:table;\r\n}\r\n.popmsg div{\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n}\r\n/****消息弹出框end*****/\r\n\r\ninput[type=\"text\"],[type='password']{\r\n     border-radius: 5px;\r\n     line-height: 3rem;\r\n     border:solid  1px;\r\n     border-color: #acbac2;\r\n     padding-left: 5px;\r\n     margin: 7px 0;\r\n     font-family: 微软雅黑;\r\n    background-color: #fdfaf6;\r\n    width: 87.7862%     !important;;\r\n }\r\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\r\n    -webkit-appearance: none;\r\n}\r\ninput[type=\"button\"]{\r\n    display:block;\r\n    border:0;\r\n    font-family: 微软雅黑;\r\n    cursor: pointer;\r\n}\r\ninput[type=\"text\"]:hover,[type='password']:hover{\r\n    background-color: #fdfaf6;\r\n    border-color: #ffc371;\r\n}\r\ninput[type=\"text\"]:active,[type='password']:active{\r\n    background-color: #fdfaf6;\r\n    border-color: #ffc371;\r\n}\r\n.readonly{\r\n    border: 0;color:#cccccc;padding: 0; background:#fff\r\n}\r\n.btn{\r\n    display:block     !important;\r\n    height:30px     !important;;\r\n    line-height:30px     !important;;\r\n    text-align:center     !important;;\r\n    font-family:微软雅黑  !important;;\r\n    font-size:18px     !important;;\r\n    color:#fff     !important;;\r\n    text-decoration:none     !important;;\r\n    border:0     !important;;\r\n    border-radius: 5px     !important;;\r\n    width: 87.7862%     !important;;\r\n    margin-top: 25px     !important;;\r\n    /*3px solid #357ebd;*/\r\n    cursor:pointer     !important;\r\n    padding: 10px 0;\r\n\r\n}\r\n\r\n/*遮罩层*/\r\n.layer\r\n{\r\n    position:fixed;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background:#000000;\r\n    opacity: 0.6;\r\n}\r\n.ellipsis{\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n}\r\n/*题目模板样式*/\r\n.main{line-height:2rem;margin-bottom:100px; }\r\n.main-topic{height:43px;line-height:43px;}\r\n.main-answer{line-height:2rem;}\r\n.footer{padding-top:9px;padding-bottom:9px;position:fixed ;left:0;bottom:0;width:100%;}\r\n.margin-center{margin:0 auto;}\r\n.footer .left-text{border-right:1px solid  #e4e4e4}\r\n.footer .left-text,.footer .right-text{width:49%;height:25px;line-height:25px;  }\r\n.footer .left-text{border-right:1px solid #e4e4e4}\r\n.footer img{vertical-align:middle;margin-right:1px;display:inline-block}\r\n.pretext{white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;word-break: break-all;}\r\n\r\n", ""]);
	
	// exports


/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(47);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./quemain.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./quemain.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\r\n/*魔方格试题*/\r\n.artpreview fieldset { padding-top: 10px; font-size: 14px; clear: both; overflow: hidden; zoom: 1; line-height: 24px; font-family: \"\\5B8B\\4F53\",sans-serif; position: relative; }\r\n.artpreview fieldset legend { padding: 5px 0; display: block; margin: 5px; background: #f1f1f1; color: #000; overflow: hidden; zoom: 1; }\r\n.queserror { border: 1px dotted #f00; padding: 2px; }\r\nfieldset.quesborder { font-size: 13px; display: block; border: 1px solid #ccc; padding: 0; font-family: 宋体,sans-serif; line-height: 25px; letter-spacing: 1px; word-break: break-all; }\r\nfieldset.queserror { border: 1px solid #f00; font-size: 12px; padding: 2px; }\r\nfieldset.quesborder td, fieldset.queserror td { line-height: 16px; }\r\nfieldset.quesborder em, fieldset.queserror em { font-style: normal; position: absolute; top: 10px; left: 20px; font-weight: bold; }\r\nfieldset.thiserror1 { border: 1px solid #f00; }\r\nfieldset.thiserror1 legend { border: 4px solid #f00; }\r\nfieldset.thiserror2 { border: 1px solid #ADCD3C; }\r\nfieldset.thiserror2 legend { border: 4px solid #ADCD3C; }\r\nfieldset.thisques { border: 1px solid blue; }\r\nfieldset.thison { border: 1px solid #A9C9E2; }\r\nfieldset.thison div.border { border: 1px solid #ADCD3C; background-color: #F2FDDB; }\r\nfieldset, img { border: 0 none; }\r\ntable.thison { border: 1px solid #000; }\r\ntable.thiserr { border: 1px solid #000; }\r\nfieldset.thisvip1 { border: 1px solid #00F; }\r\nfieldset.thisvip1 legend { border: 4px solid #000; }\r\nfieldset.status17 { border: 1px solid #ff00ff; }\r\nfieldset.status17 legend { border: 4px solid #ff00ff; }\r\n.selectoption { vertical-align: middle; font-size: 14px; padding: 2px; }\r\n/*.selectoption:hover { color: #EA8511; }*/\r\n.selectoption label { padding: 4px; }\r\nfieldset.quesbordere { border: 2px dotted #f00; }\r\n.answer { border: 1px dotted #ffffff; }\r\nol.answer li, ul.answer li { padding: 1px; font-size: 14px; }\r\nol.answer li:hover { background: #f2f2f2; }\r\n.collapseContainerPanel { border: 0; }\r\n.collapsePanelHeader { height: 30px; font-weight: bold; padding: 6px 0 0 0; }\r\n.collapseHeaderContent { float: left; padding-left: 5px; }\r\n.collapseContent { margin: 0; padding: 0; border: 1px solid #ccc; border-top: 0; }\r\nspan.fieldtip { height: 24px; line-height: 24px; font-size: 12px; text-align: left; display: block; overflow: hidden; opacity: 1; padding: 0; padding: 5px 10px; margin-top: -1px; border: 1px solid #ccc; border-top: none 0px; background: #f6f6f6; }\r\nspan.fieldtip a { height: 20px; line-height: 20px; display: inline-block; margin-left: 15px; margin-right: 15px; cursor: pointer; color: #000; }\r\n.pt0 { padding: 2px 0 5px 0; font-size: 14px; font-family: \"\\9ED1\\4F53\",sans-serif; font-weight: 700; }\r\n.pt1 { overflow: hidden; zoom: 1; clear: both; line-height: 25px; font-size: 14px; padding: 20px 20px 5px 20px; }\r\n.pt1 img { position: relative; }\r\n.pt2 { padding: 10px 20px; }\r\n.que_main .pt3, .que_main .pt4,.que_main .pt5,.que_main .pt6,.que_main .pt7 { padding: 10px 20px 10px 80px; clear: both; overflow: hidden; zoom: 1; position: relative; }\r\n.pt8 a:link, .pt8 a:visited { margin-right: 10px; padding: 2px 5px; }\r\n.pt8 a:hover { background: #fc0; }\r\n.pt9 { padding: 20px; text-align: right; border: 0 none; }\r\n\r\n.ptline { height: 1px; border-top: 1px solid #ccc; margin: 10px 0; }\r\n\r\ntable.edittable { border-collapse: collapse; text-align: center; margin: 2px; }\r\ntable.edittable th, table.edittable td { line-height: 30px; padding: 5px; white-space: normal; word-break: break-all; border: 1px solid #000; vertical-align: middle; }\r\n.selectoption label.s.sh, div.s.sh { margin: 1px; border: none; background: none; }\r\ntd.m label { border: 1px solid #f00; padding: 4px; padding-right: 40px; /*background: url(images/m.png) bottom right no-repeat;*/ display: inline-block; }\r\ntd.r label { padding-right: 40px; /*background: url(images/r.png) bottom right no-repeat;*/ display: inline-block; }\r\n\r\n.sanwser {\r\n    padding: 4px 10px;\r\n    margin: 0px;\r\n    border: 1px solid #ADCD3C;\r\n    background-color: #F2FDDB;\r\n    color: #000;\r\n    display: none;\r\n}\r\n/*公式*/\r\n.MathJye { border: 0 none; direction: ltr; line-height: normal; display: inline-block; float: none; font-family: 'Times New Roman','\\5B8B\\4F53'; font-size: 15px; font-style: normal; font-weight: normal; letter-spacing: 1px; line-height: normal; margin: 0; padding: 0; text-align: left; text-indent: 0; text-transform: none; white-space: nowrap; word-spacing: normal; word-wrap: normal; -webkit-text-size-adjust: none; }\r\n.MathJye div, .MathJye span { border: 0 none; margin: 0; padding: 0; line-height: normal; text-align: left; height: auto; _height: auto; white-space: normal; }\r\n.MathJye table { border-collapse: collapse; margin: 0; padding: 0; text-align: center; vertical-align: middle; line-height: normal; font-size: inherit; *font-size: 100%; _font-size: 100%; font-style: normal; font-weight: normal; border: 0; float: none; display: inline-block; *display: inline; zoom: 0; }\r\n.MathJye table td { padding: 0; font-size: inherit; line-height: normal; white-space: nowrap; border: 0 none; width: auto; _height: auto; }\r\n.MathJye_mi { font-style: italic; }\r\n\r\n/*div.quizPutTag { display: inline; padding: 3px 10px 1px 10px; margin: 0 3px; font-size: 14px; min-width: 30px; min-height: 16px; line-height: 18px; height: auto; border-bottom: 1px solid #0033FF; text-decoration: none; zoom: 1; background: #fff; color: #fff; word-break: break-all; }*/\r\n/*div.quizPutTag:hover { color: #f60; }*/\r\ndiv.quizPutTag { display: inline; padding: 3px 10px 1px 10px; margin: 0 3px; font-size: 14px; min-width: 30px; min-height: 16px; line-height: 18px; height: auto; border-bottom: 1px solid #0033FF; text-decoration: none; zoom: 1; background: #fff; color: #fff; word-break: break-all;position:relative }\r\n/*div.quizPutTag:after{content:' ';padding: 4px 12px 2px 12px; margin: 0 3px; font-size: 14px; min-width: 30px; min-height: 16px; line-height: 18px;border-bottom: 1px solid #000; text-decoration: none; zoom: 1; background: #fff; color: #fff; word-break: break-all;background:#fff;position:absolute;width:100%;height:100%;left:0;top:0}*/\r\ndiv.quizPutTag .MathJye table{display:none;}\r\n.pt6 span, .ac td span.fleft { white-space: pre; }\r\n/*解析页面*/\r\n.ques-detail { width: 100%; background: #fcfcfc; }\r\n.ques-detail a, .ques-detail a:visited { text-decoration: none; color: #555; }\r\n.ques-detail a:hover { text-decoration: underline; }\r\n/*资源试题样式*/\r\n.editorFillBank {\r\n    width:100px;\r\n    border-bottom:1px solid black;\r\n    display:inline-block;\r\n}\r\n.editorBrace {\r\n    /*background-image:url(/mfgeditor/images/editorbrace.png);*/\r\n    border-bottom:1px solid black;\r\n    width:40px;\r\n    height:20px;\r\n    background-repeat:no-repeat;\r\n    vertical-align:middle;\r\n    display:inline-block;\r\n}", ""]);
	
	// exports


/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTdjNTkxN2RjOTM2NTJjYzE1NTg/Y2EwOSoqKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcz9kYTA0KioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzP2I5ODAqKioqKiIsIndlYnBhY2s6Ly8vLi9qcy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY3NzL2NvbW1vbi9wdWJsaWMuY3NzPzFlYmQiLCJ3ZWJwYWNrOi8vLy4vY3NzL2NvbW1vbi9wdWJsaWMuY3NzIiwid2VicGFjazovLy8uL2Nzcy9jb21tb24vcXVlbWFpbi5jc3M/NThjMiIsIndlYnBhY2s6Ly8vLi9jc3MvY29tbW9uL3F1ZW1haW4uY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBLHlDQUF3QyxnQkFBZ0I7QUFDeEQsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixpQkFBaUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLG9CQUFvQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FD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QUFzQixtQkFBbUIsZ0NBQWdDLEVBQUUsaUNBQWlDLGdCQUFnQixXQUFXLFlBQVkscUJBQXFCLGtCQUFrQixjQUFjLGVBQWUscUJBQXFCLEVBQUUsb0JBQW9CLDJCQUEyQixXQUFXLFlBQVksb0JBQW9CLHdCQUF3QixxQkFBcUIsb0JBQW9CLGtCQUFrQixrQkFBa0Isb0JBQW9CLHFCQUFxQixXQUFXLGFBQWEsdUJBQXVCLGtCQUFrQixTQUFTLEVBQUUsdUJBQXVCLFlBQVksb0JBQW9CLHFCQUFxQixxQkFBcUIsZ0JBQWdCLGFBQWEsZUFBZSxFQUFFLGlCQUFpQixvQkFBb0IsRUFBRSwwQkFBMEIsaUJBQWlCLDRCQUE0QixlQUFlLGlCQUFpQixpQkFBaUIsa0JBQWtCLG1CQUFtQixjQUFjLGtDQUFrQyx1QkFBdUIsU0FBUyxrQkFBa0IsYUFBYSx1QkFBdUIsRUFBRSw4QkFBOEIsYUFBYSxFQUFFLHNCQUFzQixpQkFBaUIsNEJBQTRCLGVBQWUsaUJBQWlCLGlCQUFpQixrQkFBa0IsbUJBQW1CLGNBQWMsa0NBQWtDLHVCQUF1QixTQUFTLGtCQUFrQixhQUFhLHVCQUF1QixtQkFBbUIsMkJBQTJCLFlBQVksMkJBQTJCLGVBQWUsaUJBQWlCLGlCQUFpQixrQkFBa0IsbUJBQW1CLDhCQUE4Qix1QkFBdUIsU0FBUyxrQkFBa0IsYUFBYSx1QkFBdUIsZ0JBQWdCLGtCQUFrQixXQUFXLFlBQVksT0FBTyxNQUFNLG9DQUFvQyxjQUFjLGtDQUFrQyxrQkFBa0IsRUFBRSw4QkFBOEIsYUFBYSxxQkFBcUIsRUFBRSw0Q0FBNEMsdUJBQXVCLGFBQWEsRUFBRSwwQkFBMEIsNEJBQTRCLEVBQUUsbUNBQW1DLG9CQUFvQixzQ0FBc0MsNkJBQTZCLEtBQUssa0JBQWtCLGtFQUFrRSx3Q0FBd0MsbUJBQW1CLG9CQUFvQixvQ0FBb0MsOEJBQThCLDZCQUE2QixLQUFLOztBQUVwME4iLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL21mZy13ZWNoYXQvYnVuZGxlL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZTdjNTkxN2RjOTM2NTJjYzE1NThcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA3IDkgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMThcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNyA5IDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4XG4gKiovIiwicmVxdWlyZSgnLi4vY3NzL2NvbW1vbi9wdWJsaWMuY3NzJyk7XHJcbnJlcXVpcmUoJy4uL2Nzcy9jb21tb24vcXVlbWFpbi5jc3MnKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvaGVhZGVyLmpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gN1xuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vcHVibGljLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9wdWJsaWMuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vcHVibGljLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2Nzcy9jb21tb24vcHVibGljLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDdcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qKipyZXNldCBjc3MqKi9cXHJcXG5ib2R5LCBoMSwgaDIsIGgzLCBoNCwgaDUsIGg2LCBociwgcCwgYmxvY2txdW90ZSwgZGwsIGR0LCBkZCwgdWwsIG9sLCBsaSwgcHJlLFxcclxcbmZpZWxkc2V0LCBidXR0b24sIGlucHV0LCB0ZXh0YXJlYSwgdGgsIHRkIHtcXHJcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcbmlucHV0W3R5cGU9XFxcImJ1dHRvblxcXCJdLCBpbnB1dFt0eXBlPVxcXCJzdWJtaXRcXFwiXSwgaW5wdXRbdHlwZT1cXFwicmVzZXRcXFwiXSB7XFxyXFxuICAgIOOAgOOAgC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcXHJcXG59XFxyXFxudGV4dGFyZWEgeyAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7fVxcclxcbnVsLCBvbCB7IGxpc3Qtc3R5bGU6IG5vbmU7IH1cXHJcXG5hIHsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxyXFxuYTpob3ZlciB7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcclxcbmE6dmlzaXRlZHsgdGV4dC1kZWNvcmF0aW9uOiBub25lO31cXHJcXG5hOmxpbmt7IHRleHQtZGVjb3JhdGlvbjogbm9uZTt9XFxyXFxucTpiZWZvcmUsIHE6YWZ0ZXIgeyBjb250ZW50OiAnJzsgfVxcclxcbmltZyB7IGJvcmRlcjogbm9uZTsgfVxcclxcbmJ1dHRvbiwgaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEge1xcclxcbiAgICBmb250LXNpemU6IDEwMCU7XFxyXFxufVxcclxcbnRhYmxlIHtcXHJcXG4gICAgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcXHJcXG4gICAgYm9yZGVyLXNwYWNpbmc6IDA7XFxyXFxufVxcclxcbmh0bWwgeyBvdmVyZmxvdy15OiBzY3JvbGw7Zm9udC1zaXplOjEwcHg7IH1cXHJcXG5ib2R5e2ZvbnQtc2l6ZToxLjRyZW07Y29sb3I6IzAwMDtiYWNrZ3JvdW5kOiNlYmViZWI7Zm9udC1mYW1pbHk6ICdcXFxcNUZBRVxcXFw4RjZGXFxcXDk2QzVcXFxcOUVEMSd9XFxyXFxuLypcXHJcXG7moLnlhYPntKDorr7nva7lrZfkvZPlpKflsI8xMHB4XFxyXFxuMXJlbT0xMHB4O1xcclxcbjEuNHJlbT0xNHB4O1xcclxcbjEuNnJlbT0xNnB4O1xcclxcbiovXFxyXFxuLypwdWJsaWMgY3NzKi9cXHJcXG4ub3ZlcmZsb3d7b3ZlcmZsb3c6aGlkZGVuO3pvb206MX1cXHJcXG4uY2VudGVye3RleHQtYWxpZ246Y2VudGVyfVxcclxcbi5ibG9ja3tkaXNwbGF5OmJsb2NrfVxcclxcbi5kaXNwbGF5LW5vbmV7ZGlzcGxheTpub25lfVxcclxcbi5ncmVlbntiYWNrZ3JvdW5kOiMwMGQ1MzV9XFxyXFxuLmxlZnR7ZmxvYXQ6bGVmdH1cXHJcXG4ucmlnaHR7ZmxvYXQ6cmlnaHR9XFxyXFxuLmZvbnQtc2l6ZTEye2ZvbnQtc2l6ZToxLjJyZW19XFxyXFxuLmZvbnQtc2l6ZTE2e2ZvbnQtc2l6ZToxLjZyZW19XFxyXFxuLmZvbnQtc2l6ZTI2e2ZvbnQtc2l6ZToyLjZyZW19XFxyXFxuLmZvbnQtc2l6ZTI4e2ZvbnQtc2l6ZToyLjhyZW19XFxyXFxuLmZvbnQtc2l6ZTMwe2ZvbnQtc2l6ZTozcmVtfVxcclxcbi5mb250LXNpemUzMntmb250LXNpemU6My4ycmVtfVxcclxcbi5mb250LXNpemUzNntmb250LXNpemU6My42cmVtfVxcclxcbi5jb2xvci13aGl0ZXtjb2xvcjojZmZmfVxcclxcbi5jb2xvci1ibGFja3tjb2xvcjojNmU2ZTZlfVxcclxcbi5jb2xvci1zaWxpdmVye2NvbG9yOiNjMmMyYzJ9XFxyXFxuLmNvbG9yLWdyYXl7Y29sb3I6ICNiZWJlYmV9XFxyXFxuLmNvbG9yLWdyZWVue2NvbG9yOiMwMGQ1MzUgIWltcG9ydGFudDt9XFxyXFxuLmNvbG9yLWRhcmtncmVlbntjb2xvcjojMDBhZjE1fVxcclxcbi5jb2xvci1jaGVuZ3tjb2xvcjojZmY2MDAwfVxcclxcbi5jb2xvci1mZjdmMDF7Y29sb3I6ICNmZjdmMDF9XFxyXFxuLmNvbG9yLWU4NTcwMHtjb2xvcjojZTg1NzAwfVxcclxcbi5iZy1zaWxpdmVye2JhY2tncm91bmQ6I2ViZWJlYn1cXHJcXG4uYmctd2hpdGV7YmFja2dyb3VuZDp3aGl0ZX1cXHJcXG4uYmctY2hlbmd7YmFja2dyb3VuZDojZmY3ODI3fVxcclxcbi5iZy1mZjdmMDF7YmFja2dyb3VuZDogI2ZmN2YwMX1cXHJcXG4uYmctZTg1NzAwe2JhY2tncm91bmQ6I2U4NTcwMH1cXHJcXG4uYmctcmVke2JhY2tncm91bmQ6I2ZmNTA1MH1cXHJcXG4uYmcteWVsbG93e2JhY2tncm91bmQ6I2ZmYjIxZH1cXHJcXG4uYmctZ29sZGVue2JhY2tncm91bmQ6I2ZmZTA2Nn1cXHJcXG4uYmctZ3JlZW57YmFja2dyb3VuZDojMDBkNTM1ICFpbXBvcnRhbnQ7IH1cXHJcXG4uYmctZGFya2dyZWVue2JhY2tncm91bmQ6IzAwYWYxNX1cXHJcXG4uYm94LXBhZGRpbmd7cGFkZGluZzowIDMuMiV9XFxyXFxuLmJveC1wYWRkaW5nLWxlZnR7cGFkZGluZy1sZWZ0OjMuMiV9XFxyXFxuLmJveC1wYWRkaW5nLXJpZ2h0e3BhZGRpbmctcmlnaHQ6My4yJX1cXHJcXG4uYm94LXBhZGRpbmctdG9we3BhZGRpbmctdG9wOjEuNHJlbX1cXHJcXG4uYm94LXBhZGRpbmctYm90dG9te3BhZGRpbmctYm90dG9tOjEuNHJlbX1cXHJcXG4uYm9yZGVyLWJvdHRvbXtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjYmViZWJlfVxcclxcbi5ib3JkZXItdG9we2JvcmRlci10b3A6MXB4IHNvbGlkICNiZWJlYmV9XFxyXFxuLmJvcmRlci1sZWZ0e2JvcmRlci1sZWZ0OjFweCBzb2xpZCAjYmViZWJlfVxcclxcbi5ib3JkZXItcmlnaHR7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjYmViZWJlfVxcclxcbi5tYXJnaW4tYm90dG9te21hcmdpbi1ib3R0b206MS42cmVtfVxcclxcbi5tYXJnaW4tbGVmdHttYXJnaW4tbGVmdDoxLjZyZW19XFxyXFxuLm1hcmdpbi1yaWdodHttYXJnaW4tcmlnaHQ6MS42cmVtfVxcclxcbi5tYXJnaW4tdG9we21hcmdpbi10b3A6MS42cmVtfVxcclxcbi5jb2xvci1yZWR7Y29sb3I6cmVkfVxcclxcbi5mcntmbG9hdDogcmlnaHR9XFxyXFxuLmZse2Zsb2F0OmxlZnR9XFxyXFxuLm1sMTB7bWFyZ2luLWxlZnQ6IDEwcHh9XFxyXFxuLm1yMTB7bWFyZ2luLXJpZ2h0OiAxMHB4fVxcclxcbi5tbDI1e21hcmdpbi1sZWZ0OiAyNXB4fVxcclxcbi5tcjI1e21hcmdpbi1yaWdodDogMjVweH1cXHJcXG4ubWxwNnttYXJnaW4tbGVmdDogNiV9XFxyXFxuLm1ycDZ7bWFyZ2luLXJpZ2h0OiA2JX1cXHJcXG4uY29udGFpbmVye3dpZHRoOjEwMCU7fVxcclxcbi5wY3Q1MHt3aWR0aDogNTAlO31cXHJcXG4ucGN0MzB7d2lkdGg6IDMwJTt9XFxyXFxuLnBjdDIwe3dpZHRoOiAyMCU7fVxcclxcbi5wY3QyNXt3aWR0aDogMjUlfVxcclxcbi8qbWVudSDmoLflvI8qL1xcclxcbiNtZW51Q29udHJ7XFxyXFxuICAgIHdpZHRoOjEzLjMlO1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIGJvdHRvbTogMjNweDtcXHJcXG4gICAgcmlnaHQ6MjNweDtcXHJcXG4gICAgei1pbmRleDogOTk5O1xcclxcbiAgICBkaXNwbGF5OmJsb2NrO1xcclxcbn1cXHJcXG4jbWVudVNob3d7XFxyXFxuICAgIHBvc2l0aW9uOmZpeGVkO1xcclxcbiAgICB0b3A6MDtcXHJcXG4gICAgd2lkdGg6MTAwJTtcXHJcXG4gICAgaGVpZ2h0OjEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQ6I2ZmZjtcXHJcXG4gICAgb3BhY2l0eTogMC45O1xcclxcbiAgICB6LWluZGV4OiA5MDA7XFxyXFxufVxcclxcbiNtZW51U2hvdyBhe1xcclxcbiAgICB3aWR0aDoxNi44JTtcXHJcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbn1cXHJcXG4jbWVudVNob3cgYSBpbWd7XFxyXFxuICAgIHdpZHRoOjEwMCU7XFxyXFxufVxcclxcbi5rdHhhe1xcclxcbiAgICB0b3A6NDcuMyU7XFxyXFxuICAgIGxlZnQ6MjEuMyU7XFxyXFxufVxcclxcbi5reGpse1xcclxcbiAgICB0b3A6NDcuMyU7XFxyXFxuICAgIHJpZ2h0OjIxLjMlO1xcclxcbn1cXHJcXG4uY3RqantcXHJcXG4gICAgdG9wOjY2LjYlO1xcclxcbiAgICBsZWZ0OjIxLjMlO1xcclxcbn1cXHJcXG4ubXlyeHtcXHJcXG4gICAgdG9wOjY2LjYlO1xcclxcbiAgICByaWdodDoyMS4zJTtcXHJcXG59XFxyXFxuLyoqKirmtojmga/lvLnlh7rmoYZzdGFydCoqKioqL1xcclxcbi5wb3Btc2d7XFxyXFxuICAgIGJhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjgpIDtcXHJcXG4gICAgdG9wOiAyMCU7XFxyXFxuICAgIGxlZnQ6MjMlO1xcclxcbiAgICB3aWR0aDogNTQlO1xcclxcbiAgICBoZWlnaHQ6IDE1MHB4O1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIGNvbG9yOiAjZmZmZmZmO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIGRpc3BsYXk6dGFibGU7XFxyXFxufVxcclxcbi5wb3Btc2cgZGl2e1xcclxcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbn1cXHJcXG4vKioqKua2iOaBr+W8ueWHuuahhmVuZCoqKioqL1xcclxcblxcclxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXSxbdHlwZT0ncGFzc3dvcmQnXXtcXHJcXG4gICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgIGxpbmUtaGVpZ2h0OiAzcmVtO1xcclxcbiAgICAgYm9yZGVyOnNvbGlkICAxcHg7XFxyXFxuICAgICBib3JkZXItY29sb3I6ICNhY2JhYzI7XFxyXFxuICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXHJcXG4gICAgIG1hcmdpbjogN3B4IDA7XFxyXFxuICAgICBmb250LWZhbWlseTog5b6u6L2v6ZuF6buRO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRmYWY2O1xcclxcbiAgICB3aWR0aDogODcuNzg2MiUgICAgICFpbXBvcnRhbnQ7O1xcclxcbiB9XFxyXFxuaW5wdXRbdHlwZT1cXFwiYnV0dG9uXFxcIl0sIGlucHV0W3R5cGU9XFxcInN1Ym1pdFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJyZXNldFxcXCJdIHtcXHJcXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcclxcbn1cXHJcXG5pbnB1dFt0eXBlPVxcXCJidXR0b25cXFwiXXtcXHJcXG4gICAgZGlzcGxheTpibG9jaztcXHJcXG4gICAgYm9yZGVyOjA7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiDlvq7ova/pm4Xpu5E7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdOmhvdmVyLFt0eXBlPSdwYXNzd29yZCddOmhvdmVye1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRmYWY2O1xcclxcbiAgICBib3JkZXItY29sb3I6ICNmZmMzNzE7XFxyXFxufVxcclxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXTphY3RpdmUsW3R5cGU9J3Bhc3N3b3JkJ106YWN0aXZle1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmRmYWY2O1xcclxcbiAgICBib3JkZXItY29sb3I6ICNmZmMzNzE7XFxyXFxufVxcclxcbi5yZWFkb25seXtcXHJcXG4gICAgYm9yZGVyOiAwO2NvbG9yOiNjY2NjY2M7cGFkZGluZzogMDsgYmFja2dyb3VuZDojZmZmXFxyXFxufVxcclxcbi5idG57XFxyXFxuICAgIGRpc3BsYXk6YmxvY2sgICAgICFpbXBvcnRhbnQ7XFxyXFxuICAgIGhlaWdodDozMHB4ICAgICAhaW1wb3J0YW50OztcXHJcXG4gICAgbGluZS1oZWlnaHQ6MzBweCAgICAgIWltcG9ydGFudDs7XFxyXFxuICAgIHRleHQtYWxpZ246Y2VudGVyICAgICAhaW1wb3J0YW50OztcXHJcXG4gICAgZm9udC1mYW1pbHk65b6u6L2v6ZuF6buRICAhaW1wb3J0YW50OztcXHJcXG4gICAgZm9udC1zaXplOjE4cHggICAgICFpbXBvcnRhbnQ7O1xcclxcbiAgICBjb2xvcjojZmZmICAgICAhaW1wb3J0YW50OztcXHJcXG4gICAgdGV4dC1kZWNvcmF0aW9uOm5vbmUgICAgICFpbXBvcnRhbnQ7O1xcclxcbiAgICBib3JkZXI6MCAgICAgIWltcG9ydGFudDs7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweCAgICAgIWltcG9ydGFudDs7XFxyXFxuICAgIHdpZHRoOiA4Ny43ODYyJSAgICAgIWltcG9ydGFudDs7XFxyXFxuICAgIG1hcmdpbi10b3A6IDI1cHggICAgICFpbXBvcnRhbnQ7O1xcclxcbiAgICAvKjNweCBzb2xpZCAjMzU3ZWJkOyovXFxyXFxuICAgIGN1cnNvcjpwb2ludGVyICAgICAhaW1wb3J0YW50O1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi8q6YGu572p5bGCKi9cXHJcXG4ubGF5ZXJcXHJcXG57XFxyXFxuICAgIHBvc2l0aW9uOmZpeGVkO1xcclxcbiAgICB0b3A6MDtcXHJcXG4gICAgd2lkdGg6MTAwJTtcXHJcXG4gICAgaGVpZ2h0OjEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQ6IzAwMDAwMDtcXHJcXG4gICAgb3BhY2l0eTogMC42O1xcclxcbn1cXHJcXG4uZWxsaXBzaXN7XFxyXFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcclxcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG4vKumimOebruaooeadv+agt+W8jyovXFxyXFxuLm1haW57bGluZS1oZWlnaHQ6MnJlbTttYXJnaW4tYm90dG9tOjEwMHB4OyB9XFxyXFxuLm1haW4tdG9waWN7aGVpZ2h0OjQzcHg7bGluZS1oZWlnaHQ6NDNweDt9XFxyXFxuLm1haW4tYW5zd2Vye2xpbmUtaGVpZ2h0OjJyZW07fVxcclxcbi5mb290ZXJ7cGFkZGluZy10b3A6OXB4O3BhZGRpbmctYm90dG9tOjlweDtwb3NpdGlvbjpmaXhlZCA7bGVmdDowO2JvdHRvbTowO3dpZHRoOjEwMCU7fVxcclxcbi5tYXJnaW4tY2VudGVye21hcmdpbjowIGF1dG87fVxcclxcbi5mb290ZXIgLmxlZnQtdGV4dHtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICAjZTRlNGU0fVxcclxcbi5mb290ZXIgLmxlZnQtdGV4dCwuZm9vdGVyIC5yaWdodC10ZXh0e3dpZHRoOjQ5JTtoZWlnaHQ6MjVweDtsaW5lLWhlaWdodDoyNXB4OyAgfVxcclxcbi5mb290ZXIgLmxlZnQtdGV4dHtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNlNGU0ZTR9XFxyXFxuLmZvb3RlciBpbWd7dmVydGljYWwtYWxpZ246bWlkZGxlO21hcmdpbi1yaWdodDoxcHg7ZGlzcGxheTppbmxpbmUtYmxvY2t9XFxyXFxuLnByZXRleHR7d2hpdGUtc3BhY2U6cHJlLXdyYXA7d2hpdGUtc3BhY2U6LW1vei1wcmUtd3JhcDt3aGl0ZS1zcGFjZTotby1wcmUtd3JhcDt3b3JkLXdyYXA6YnJlYWstd29yZDt3b3JkLWJyZWFrOiBicmVhay1hbGw7fVxcclxcblxcclxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9jc3MvY29tbW9uL3B1YmxpYy5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSA3XG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9xdWVtYWluLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9xdWVtYWluLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3F1ZW1haW4uY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vY3NzL2NvbW1vbi9xdWVtYWluLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDdcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcclxcbi8q6a2U5pa55qC86K+V6aKYKi9cXHJcXG4uYXJ0cHJldmlldyBmaWVsZHNldCB7IHBhZGRpbmctdG9wOiAxMHB4OyBmb250LXNpemU6IDE0cHg7IGNsZWFyOiBib3RoOyBvdmVyZmxvdzogaGlkZGVuOyB6b29tOiAxOyBsaW5lLWhlaWdodDogMjRweDsgZm9udC1mYW1pbHk6IFxcXCJcXFxcNUI4QlxcXFw0RjUzXFxcIixzYW5zLXNlcmlmOyBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXHJcXG4uYXJ0cHJldmlldyBmaWVsZHNldCBsZWdlbmQgeyBwYWRkaW5nOiA1cHggMDsgZGlzcGxheTogYmxvY2s7IG1hcmdpbjogNXB4OyBiYWNrZ3JvdW5kOiAjZjFmMWYxOyBjb2xvcjogIzAwMDsgb3ZlcmZsb3c6IGhpZGRlbjsgem9vbTogMTsgfVxcclxcbi5xdWVzZXJyb3IgeyBib3JkZXI6IDFweCBkb3R0ZWQgI2YwMDsgcGFkZGluZzogMnB4OyB9XFxyXFxuZmllbGRzZXQucXVlc2JvcmRlciB7IGZvbnQtc2l6ZTogMTNweDsgZGlzcGxheTogYmxvY2s7IGJvcmRlcjogMXB4IHNvbGlkICNjY2M7IHBhZGRpbmc6IDA7IGZvbnQtZmFtaWx5OiDlrovkvZMsc2Fucy1zZXJpZjsgbGluZS1oZWlnaHQ6IDI1cHg7IGxldHRlci1zcGFjaW5nOiAxcHg7IHdvcmQtYnJlYWs6IGJyZWFrLWFsbDsgfVxcclxcbmZpZWxkc2V0LnF1ZXNlcnJvciB7IGJvcmRlcjogMXB4IHNvbGlkICNmMDA7IGZvbnQtc2l6ZTogMTJweDsgcGFkZGluZzogMnB4OyB9XFxyXFxuZmllbGRzZXQucXVlc2JvcmRlciB0ZCwgZmllbGRzZXQucXVlc2Vycm9yIHRkIHsgbGluZS1oZWlnaHQ6IDE2cHg7IH1cXHJcXG5maWVsZHNldC5xdWVzYm9yZGVyIGVtLCBmaWVsZHNldC5xdWVzZXJyb3IgZW0geyBmb250LXN0eWxlOiBub3JtYWw7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAxMHB4OyBsZWZ0OiAyMHB4OyBmb250LXdlaWdodDogYm9sZDsgfVxcclxcbmZpZWxkc2V0LnRoaXNlcnJvcjEgeyBib3JkZXI6IDFweCBzb2xpZCAjZjAwOyB9XFxyXFxuZmllbGRzZXQudGhpc2Vycm9yMSBsZWdlbmQgeyBib3JkZXI6IDRweCBzb2xpZCAjZjAwOyB9XFxyXFxuZmllbGRzZXQudGhpc2Vycm9yMiB7IGJvcmRlcjogMXB4IHNvbGlkICNBRENEM0M7IH1cXHJcXG5maWVsZHNldC50aGlzZXJyb3IyIGxlZ2VuZCB7IGJvcmRlcjogNHB4IHNvbGlkICNBRENEM0M7IH1cXHJcXG5maWVsZHNldC50aGlzcXVlcyB7IGJvcmRlcjogMXB4IHNvbGlkIGJsdWU7IH1cXHJcXG5maWVsZHNldC50aGlzb24geyBib3JkZXI6IDFweCBzb2xpZCAjQTlDOUUyOyB9XFxyXFxuZmllbGRzZXQudGhpc29uIGRpdi5ib3JkZXIgeyBib3JkZXI6IDFweCBzb2xpZCAjQURDRDNDOyBiYWNrZ3JvdW5kLWNvbG9yOiAjRjJGRERCOyB9XFxyXFxuZmllbGRzZXQsIGltZyB7IGJvcmRlcjogMCBub25lOyB9XFxyXFxudGFibGUudGhpc29uIHsgYm9yZGVyOiAxcHggc29saWQgIzAwMDsgfVxcclxcbnRhYmxlLnRoaXNlcnIgeyBib3JkZXI6IDFweCBzb2xpZCAjMDAwOyB9XFxyXFxuZmllbGRzZXQudGhpc3ZpcDEgeyBib3JkZXI6IDFweCBzb2xpZCAjMDBGOyB9XFxyXFxuZmllbGRzZXQudGhpc3ZpcDEgbGVnZW5kIHsgYm9yZGVyOiA0cHggc29saWQgIzAwMDsgfVxcclxcbmZpZWxkc2V0LnN0YXR1czE3IHsgYm9yZGVyOiAxcHggc29saWQgI2ZmMDBmZjsgfVxcclxcbmZpZWxkc2V0LnN0YXR1czE3IGxlZ2VuZCB7IGJvcmRlcjogNHB4IHNvbGlkICNmZjAwZmY7IH1cXHJcXG4uc2VsZWN0b3B0aW9uIHsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgZm9udC1zaXplOiAxNHB4OyBwYWRkaW5nOiAycHg7IH1cXHJcXG4vKi5zZWxlY3RvcHRpb246aG92ZXIgeyBjb2xvcjogI0VBODUxMTsgfSovXFxyXFxuLnNlbGVjdG9wdGlvbiBsYWJlbCB7IHBhZGRpbmc6IDRweDsgfVxcclxcbmZpZWxkc2V0LnF1ZXNib3JkZXJlIHsgYm9yZGVyOiAycHggZG90dGVkICNmMDA7IH1cXHJcXG4uYW5zd2VyIHsgYm9yZGVyOiAxcHggZG90dGVkICNmZmZmZmY7IH1cXHJcXG5vbC5hbnN3ZXIgbGksIHVsLmFuc3dlciBsaSB7IHBhZGRpbmc6IDFweDsgZm9udC1zaXplOiAxNHB4OyB9XFxyXFxub2wuYW5zd2VyIGxpOmhvdmVyIHsgYmFja2dyb3VuZDogI2YyZjJmMjsgfVxcclxcbi5jb2xsYXBzZUNvbnRhaW5lclBhbmVsIHsgYm9yZGVyOiAwOyB9XFxyXFxuLmNvbGxhcHNlUGFuZWxIZWFkZXIgeyBoZWlnaHQ6IDMwcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBwYWRkaW5nOiA2cHggMCAwIDA7IH1cXHJcXG4uY29sbGFwc2VIZWFkZXJDb250ZW50IHsgZmxvYXQ6IGxlZnQ7IHBhZGRpbmctbGVmdDogNXB4OyB9XFxyXFxuLmNvbGxhcHNlQ29udGVudCB7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgYm9yZGVyLXRvcDogMDsgfVxcclxcbnNwYW4uZmllbGR0aXAgeyBoZWlnaHQ6IDI0cHg7IGxpbmUtaGVpZ2h0OiAyNHB4OyBmb250LXNpemU6IDEycHg7IHRleHQtYWxpZ246IGxlZnQ7IGRpc3BsYXk6IGJsb2NrOyBvdmVyZmxvdzogaGlkZGVuOyBvcGFjaXR5OiAxOyBwYWRkaW5nOiAwOyBwYWRkaW5nOiA1cHggMTBweDsgbWFyZ2luLXRvcDogLTFweDsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgYm9yZGVyLXRvcDogbm9uZSAwcHg7IGJhY2tncm91bmQ6ICNmNmY2ZjY7IH1cXHJcXG5zcGFuLmZpZWxkdGlwIGEgeyBoZWlnaHQ6IDIwcHg7IGxpbmUtaGVpZ2h0OiAyMHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IG1hcmdpbi1sZWZ0OiAxNXB4OyBtYXJnaW4tcmlnaHQ6IDE1cHg7IGN1cnNvcjogcG9pbnRlcjsgY29sb3I6ICMwMDA7IH1cXHJcXG4ucHQwIHsgcGFkZGluZzogMnB4IDAgNXB4IDA7IGZvbnQtc2l6ZTogMTRweDsgZm9udC1mYW1pbHk6IFxcXCJcXFxcOUVEMVxcXFw0RjUzXFxcIixzYW5zLXNlcmlmOyBmb250LXdlaWdodDogNzAwOyB9XFxyXFxuLnB0MSB7IG92ZXJmbG93OiBoaWRkZW47IHpvb206IDE7IGNsZWFyOiBib3RoOyBsaW5lLWhlaWdodDogMjVweDsgZm9udC1zaXplOiAxNHB4OyBwYWRkaW5nOiAyMHB4IDIwcHggNXB4IDIwcHg7IH1cXHJcXG4ucHQxIGltZyB7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcclxcbi5wdDIgeyBwYWRkaW5nOiAxMHB4IDIwcHg7IH1cXHJcXG4ucXVlX21haW4gLnB0MywgLnF1ZV9tYWluIC5wdDQsLnF1ZV9tYWluIC5wdDUsLnF1ZV9tYWluIC5wdDYsLnF1ZV9tYWluIC5wdDcgeyBwYWRkaW5nOiAxMHB4IDIwcHggMTBweCA4MHB4OyBjbGVhcjogYm90aDsgb3ZlcmZsb3c6IGhpZGRlbjsgem9vbTogMTsgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxyXFxuLnB0OCBhOmxpbmssIC5wdDggYTp2aXNpdGVkIHsgbWFyZ2luLXJpZ2h0OiAxMHB4OyBwYWRkaW5nOiAycHggNXB4OyB9XFxyXFxuLnB0OCBhOmhvdmVyIHsgYmFja2dyb3VuZDogI2ZjMDsgfVxcclxcbi5wdDkgeyBwYWRkaW5nOiAyMHB4OyB0ZXh0LWFsaWduOiByaWdodDsgYm9yZGVyOiAwIG5vbmU7IH1cXHJcXG5cXHJcXG4ucHRsaW5lIHsgaGVpZ2h0OiAxcHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjOyBtYXJnaW46IDEwcHggMDsgfVxcclxcblxcclxcbnRhYmxlLmVkaXR0YWJsZSB7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IHRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luOiAycHg7IH1cXHJcXG50YWJsZS5lZGl0dGFibGUgdGgsIHRhYmxlLmVkaXR0YWJsZSB0ZCB7IGxpbmUtaGVpZ2h0OiAzMHB4OyBwYWRkaW5nOiA1cHg7IHdoaXRlLXNwYWNlOiBub3JtYWw7IHdvcmQtYnJlYWs6IGJyZWFrLWFsbDsgYm9yZGVyOiAxcHggc29saWQgIzAwMDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcclxcbi5zZWxlY3RvcHRpb24gbGFiZWwucy5zaCwgZGl2LnMuc2ggeyBtYXJnaW46IDFweDsgYm9yZGVyOiBub25lOyBiYWNrZ3JvdW5kOiBub25lOyB9XFxyXFxudGQubSBsYWJlbCB7IGJvcmRlcjogMXB4IHNvbGlkICNmMDA7IHBhZGRpbmc6IDRweDsgcGFkZGluZy1yaWdodDogNDBweDsgLypiYWNrZ3JvdW5kOiB1cmwoaW1hZ2VzL20ucG5nKSBib3R0b20gcmlnaHQgbm8tcmVwZWF0OyovIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcclxcbnRkLnIgbGFiZWwgeyBwYWRkaW5nLXJpZ2h0OiA0MHB4OyAvKmJhY2tncm91bmQ6IHVybChpbWFnZXMvci5wbmcpIGJvdHRvbSByaWdodCBuby1yZXBlYXQ7Ki8gZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxyXFxuXFxyXFxuLnNhbndzZXIge1xcclxcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcXHJcXG4gICAgbWFyZ2luOiAwcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNBRENEM0M7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkZEREI7XFxyXFxuICAgIGNvbG9yOiAjMDAwO1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG4vKuWFrOW8jyovXFxyXFxuLk1hdGhKeWUgeyBib3JkZXI6IDAgbm9uZTsgZGlyZWN0aW9uOiBsdHI7IGxpbmUtaGVpZ2h0OiBub3JtYWw7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgZmxvYXQ6IG5vbmU7IGZvbnQtZmFtaWx5OiAnVGltZXMgTmV3IFJvbWFuJywnXFxcXDVCOEJcXFxcNEY1Myc7IGZvbnQtc2l6ZTogMTVweDsgZm9udC1zdHlsZTogbm9ybWFsOyBmb250LXdlaWdodDogbm9ybWFsOyBsZXR0ZXItc3BhY2luZzogMXB4OyBsaW5lLWhlaWdodDogbm9ybWFsOyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IHRleHQtYWxpZ246IGxlZnQ7IHRleHQtaW5kZW50OiAwOyB0ZXh0LXRyYW5zZm9ybTogbm9uZTsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgd29yZC1zcGFjaW5nOiBub3JtYWw7IHdvcmQtd3JhcDogbm9ybWFsOyAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7IH1cXHJcXG4uTWF0aEp5ZSBkaXYsIC5NYXRoSnllIHNwYW4geyBib3JkZXI6IDAgbm9uZTsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyBsaW5lLWhlaWdodDogbm9ybWFsOyB0ZXh0LWFsaWduOiBsZWZ0OyBoZWlnaHQ6IGF1dG87IF9oZWlnaHQ6IGF1dG87IHdoaXRlLXNwYWNlOiBub3JtYWw7IH1cXHJcXG4uTWF0aEp5ZSB0YWJsZSB7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgdGV4dC1hbGlnbjogY2VudGVyOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBsaW5lLWhlaWdodDogbm9ybWFsOyBmb250LXNpemU6IGluaGVyaXQ7ICpmb250LXNpemU6IDEwMCU7IF9mb250LXNpemU6IDEwMCU7IGZvbnQtc3R5bGU6IG5vcm1hbDsgZm9udC13ZWlnaHQ6IG5vcm1hbDsgYm9yZGVyOiAwOyBmbG9hdDogbm9uZTsgZGlzcGxheTogaW5saW5lLWJsb2NrOyAqZGlzcGxheTogaW5saW5lOyB6b29tOiAwOyB9XFxyXFxuLk1hdGhKeWUgdGFibGUgdGQgeyBwYWRkaW5nOiAwOyBmb250LXNpemU6IGluaGVyaXQ7IGxpbmUtaGVpZ2h0OiBub3JtYWw7IHdoaXRlLXNwYWNlOiBub3dyYXA7IGJvcmRlcjogMCBub25lOyB3aWR0aDogYXV0bzsgX2hlaWdodDogYXV0bzsgfVxcclxcbi5NYXRoSnllX21pIHsgZm9udC1zdHlsZTogaXRhbGljOyB9XFxyXFxuXFxyXFxuLypkaXYucXVpelB1dFRhZyB7IGRpc3BsYXk6IGlubGluZTsgcGFkZGluZzogM3B4IDEwcHggMXB4IDEwcHg7IG1hcmdpbjogMCAzcHg7IGZvbnQtc2l6ZTogMTRweDsgbWluLXdpZHRoOiAzMHB4OyBtaW4taGVpZ2h0OiAxNnB4OyBsaW5lLWhlaWdodDogMThweDsgaGVpZ2h0OiBhdXRvOyBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwMzNGRjsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB6b29tOiAxOyBiYWNrZ3JvdW5kOiAjZmZmOyBjb2xvcjogI2ZmZjsgd29yZC1icmVhazogYnJlYWstYWxsOyB9Ki9cXHJcXG4vKmRpdi5xdWl6UHV0VGFnOmhvdmVyIHsgY29sb3I6ICNmNjA7IH0qL1xcclxcbmRpdi5xdWl6UHV0VGFnIHsgZGlzcGxheTogaW5saW5lOyBwYWRkaW5nOiAzcHggMTBweCAxcHggMTBweDsgbWFyZ2luOiAwIDNweDsgZm9udC1zaXplOiAxNHB4OyBtaW4td2lkdGg6IDMwcHg7IG1pbi1oZWlnaHQ6IDE2cHg7IGxpbmUtaGVpZ2h0OiAxOHB4OyBoZWlnaHQ6IGF1dG87IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDAzM0ZGOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IHpvb206IDE7IGJhY2tncm91bmQ6ICNmZmY7IGNvbG9yOiAjZmZmOyB3b3JkLWJyZWFrOiBicmVhay1hbGw7cG9zaXRpb246cmVsYXRpdmUgfVxcclxcbi8qZGl2LnF1aXpQdXRUYWc6YWZ0ZXJ7Y29udGVudDonICc7cGFkZGluZzogNHB4IDEycHggMnB4IDEycHg7IG1hcmdpbjogMCAzcHg7IGZvbnQtc2l6ZTogMTRweDsgbWluLXdpZHRoOiAzMHB4OyBtaW4taGVpZ2h0OiAxNnB4OyBsaW5lLWhlaWdodDogMThweDtib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwMDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB6b29tOiAxOyBiYWNrZ3JvdW5kOiAjZmZmOyBjb2xvcjogI2ZmZjsgd29yZC1icmVhazogYnJlYWstYWxsO2JhY2tncm91bmQ6I2ZmZjtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2xlZnQ6MDt0b3A6MH0qL1xcclxcbmRpdi5xdWl6UHV0VGFnIC5NYXRoSnllIHRhYmxle2Rpc3BsYXk6bm9uZTt9XFxyXFxuLnB0NiBzcGFuLCAuYWMgdGQgc3Bhbi5mbGVmdCB7IHdoaXRlLXNwYWNlOiBwcmU7IH1cXHJcXG4vKuino+aekOmhtemdoiovXFxyXFxuLnF1ZXMtZGV0YWlsIHsgd2lkdGg6IDEwMCU7IGJhY2tncm91bmQ6ICNmY2ZjZmM7IH1cXHJcXG4ucXVlcy1kZXRhaWwgYSwgLnF1ZXMtZGV0YWlsIGE6dmlzaXRlZCB7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgY29sb3I6ICM1NTU7IH1cXHJcXG4ucXVlcy1kZXRhaWwgYTpob3ZlciB7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB9XFxyXFxuLyrotYTmupDor5XpopjmoLflvI8qL1xcclxcbi5lZGl0b3JGaWxsQmFuayB7XFxyXFxuICAgIHdpZHRoOjEwMHB4O1xcclxcbiAgICBib3JkZXItYm90dG9tOjFweCBzb2xpZCBibGFjaztcXHJcXG4gICAgZGlzcGxheTppbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcbi5lZGl0b3JCcmFjZSB7XFxyXFxuICAgIC8qYmFja2dyb3VuZC1pbWFnZTp1cmwoL21mZ2VkaXRvci9pbWFnZXMvZWRpdG9yYnJhY2UucG5nKTsqL1xcclxcbiAgICBib3JkZXItYm90dG9tOjFweCBzb2xpZCBibGFjaztcXHJcXG4gICAgd2lkdGg6NDBweDtcXHJcXG4gICAgaGVpZ2h0OjIwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246bWlkZGxlO1xcclxcbiAgICBkaXNwbGF5OmlubGluZS1ibG9jaztcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL2Nzcy9jb21tb24vcXVlbWFpbi5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSA3XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==