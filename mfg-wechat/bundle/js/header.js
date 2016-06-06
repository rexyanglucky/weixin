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
	exports.push([module.id, "/***reset css**/\r\nbody, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre,\r\nfieldset, button, input, textarea, th, td {\r\n    margin: 0 auto;\r\n    padding: 0;\r\n}\r\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\r\n    　　-webkit-appearance: none;\r\n}\r\ntextarea { -webkit-appearance: none;}\r\nul, ol { list-style: none; }\r\na { text-decoration: none; }\r\na:hover { text-decoration: none; }\r\na:visited{ text-decoration: none;}\r\na:link{ text-decoration: none;}\r\nq:before, q:after { content: ''; }\r\nimg { border: none; }\r\nbutton, input, select, textarea {\r\n    font-size: 100%;\r\n}\r\ntable {\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n}\r\nhtml { overflow-y: scroll;font-size:10px; }\r\nbody{font-size:1.4rem;color:#000;background:#ebebeb;font-family: '\\5FAE\\8F6F\\96C5\\9ED1'}\r\n/*\r\n根元素设置字体大小10px\r\n1rem=10px;\r\n1.4rem=14px;\r\n1.6rem=16px;\r\n*/\r\n/*public css*/\r\n.overflow{overflow:hidden;zoom:1}\r\n.center{text-align:center}\r\n.block{display:block}\r\n.display-none{display:none}\r\n.green{background:#00d535}\r\n.left{float:left}\r\n.right{float:right}\r\n.font-size12{font-size:1.2rem}\r\n.font-size16{font-size:1.6rem}\r\n.font-size26{font-size:2.6rem}\r\n.font-size28{font-size:2.8rem}\r\n.font-size30{font-size:3rem}\r\n.font-size32{font-size:3.2rem}\r\n.font-size36{font-size:3.6rem}\r\n.color-white{color:#fff}\r\n.color-black{color:#6e6e6e}\r\n.color-siliver{color:#c2c2c2}\r\n.color-gray{color: #bebebe}\r\n.color-green{color:#00d535 !important;}\r\n.color-darkgreen{color:#00af15}\r\n.color-cheng{color:#ff6000}\r\n.color-ff7f01{color: #ff7f01}\r\n.color-e85700{color:#e85700}\r\n.bg-siliver{background:#ebebeb}\r\n.bg-white{background:white}\r\n.bg-cheng{background:#ff7827}\r\n.bg-ff7f01{background: #ff7f01}\r\n.bg-e85700{background:#e85700}\r\n.bg-red{background:#ff5050}\r\n.bg-yellow{background:#ffb21d}\r\n.bg-golden{background:#ffe066}\r\n.bg-green{background:#00d535 !important; }\r\n.bg-darkgreen{background:#00af15}\r\n.box-padding{padding:0 3.2%}\r\n.box-padding-left{padding-left:3.2%}\r\n.box-padding-right{padding-right:3.2%}\r\n.box-padding-top{padding-top:1.4rem}\r\n.box-padding-bottom{padding-bottom:1.4rem}\r\n.border-bottom{border-bottom:1px solid #bebebe}\r\n.border-top{border-top:1px solid #bebebe}\r\n.border-left{border-left:1px solid #bebebe}\r\n.border-right{border-right:1px solid #bebebe}\r\n.margin-bottom{margin-bottom:1.6rem}\r\n.margin-left{margin-left:1.6rem}\r\n.margin-right{margin-right:1.6rem}\r\n.margin-top{margin-top:1.6rem}\r\n.color-red{color:red}\r\n.fr{float: right}\r\n.fl{float:left}\r\n.ml10{margin-left: 10px}\r\n.mr10{margin-right: 10px}\r\n.ml25{margin-left: 25px}\r\n.mr25{margin-right: 25px}\r\n.mlp6{margin-left: 6%}\r\n.mrp6{margin-right: 6%}\r\n.container{width:100%;}\r\n.pct50{width: 50%;}\r\n.pct30{width: 30%;}\r\n.pct20{width: 20%;}\r\n.pct25{width: 25%}\r\n/*menu 样式*/\r\n#menuContr{\r\n    width:13.3%;\r\n    position: fixed;\r\n    bottom: 23px;\r\n    right:23px;\r\n    z-index: 999;\r\n    display:block;\r\n}\r\n#menuShow{\r\n    position:fixed;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background:#fff;\r\n    opacity: 0.9;\r\n    z-index: 900;\r\n}\r\n#menuShow a{\r\n    width:16.8%;\r\n    position: absolute;\r\n}\r\n#menuShow a img{\r\n    width:100%;\r\n}\r\n.ktxa{\r\n    top:47.3%;\r\n    left:21.3%;\r\n}\r\n.kxjl{\r\n    top:47.3%;\r\n    right:21.3%;\r\n}\r\n.ctjj{\r\n    top:66.6%;\r\n    left:21.3%;\r\n}\r\n.myrx{\r\n    top:66.6%;\r\n    right:21.3%;\r\n}\r\n/****消息弹出框start*****/\r\n.popmsg{\r\n    background:rgba(0,0,0,0.6) ;\r\n    top: 20%;\r\n    left: 15%;\r\n    width: 70%;\r\n    height: 150px;\r\n    position: fixed;\r\n    color: #ffffff;\r\n    text-align: center;\r\n    line-height: 20px;\r\n    border-radius: 5px;\r\n    display:table;\r\n}\r\n.popmsg div{\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n}\r\n/****消息弹出框end*****/\r\n\r\ninput[type=\"text\"],[type='password']{\r\n     border-radius: 5px;\r\n     line-height: 3rem;\r\n     border:solid  1px;\r\n     border-color: #acbac2;\r\n     padding-left: 5px;\r\n     margin: 7px 0;\r\n     font-family: 微软雅黑;\r\n    width: 87.7862%     !important;;\r\n }\r\ninput[type=\"button\"]{\r\n    display:block;\r\n    border:0;\r\n    font-family: 微软雅黑;\r\n    cursor: pointer;\r\n}\r\ninput[type=\"text\"]:hover{\r\n    border-color: #ffc371;\r\n}\r\n.btn{\r\n    display:block     !important;\r\n    height:30px     !important;;\r\n    line-height:2.5rem     !important;;\r\n    text-align:center     !important;;\r\n    font-family:arial,verdana,sans-serif, '\\65B0\\5B8B\\4F53'  !important;;\r\n    font-size:22px     !important;;\r\n    color:#fff     !important;;\r\n    text-decoration:none     !important;;\r\n    border:0     !important;;\r\n    border-radius: 5px     !important;;\r\n    width: 87.7862%     !important;;\r\n    margin-top: 25px     !important;;\r\n    /*3px solid #357ebd;*/\r\n    cursor:pointer     !important;\r\n    padding: 10px 0;\r\n\r\n}\r\n\r\n/*遮罩层*/\r\n.layer\r\n{\r\n    position:fixed;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background:#000000;\r\n    opacity: 0.6;\r\n}\r\n.ellipsis{\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n}\r\n/*题目模板样式*/\r\n.main{line-height:2rem;margin-bottom:100px; }\r\n.main-topic{height:43px;line-height:43px;}\r\n.main-answer{line-height:2rem;}\r\n.footer{padding-top:9px;padding-bottom:9px;position:fixed ;left:0;bottom:0;width:100%;}\r\n.margin-center{margin:0 auto;}\r\n.footer .left-text{border-right:1px solid  #e4e4e4}\r\n.footer .left-text,.footer .right-text{width:49%;height:25px;line-height:25px;  }\r\n.footer .left-text{border-right:1px solid #e4e4e4}\r\n.footer img{vertical-align:middle;margin-right:1px;display:inline-block}\r\n", ""]);
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWE4MjI4Y2U4MDZlNGUxNmY1YTgiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanMiLCJ3ZWJwYWNrOi8vLy4vanMvaGVhZGVyLmpzIiwid2VicGFjazovLy8uL2Nzcy9jb21tb24vcHVibGljLmNzcz8xZWJkIiwid2VicGFjazovLy8uL2Nzcy9jb21tb24vcHVibGljLmNzcyIsIndlYnBhY2s6Ly8vLi9jc3MvY29tbW9uL3F1ZW1haW4uY3NzPzU4YzIiLCJ3ZWJwYWNrOi8vLy4vY3NzL2NvbW1vbi9xdWVtYWluLmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQSx5Q0FBd0MsZ0JBQWdCO0FBQ3hELEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0IsaUJBQWlCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxvQkFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQjtB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QXFCLFdBQVcsYUFBYSx1QkFBdUIsa0JBQWtCLFNBQVMsRUFBRSx1QkFBdUIsWUFBWSxvQkFBb0IscUJBQXFCLHFCQUFxQixnQkFBZ0IsYUFBYSxlQUFlLEVBQUUsaUJBQWlCLG9CQUFvQixFQUFFLDBCQUEwQixpQkFBaUIsNEJBQTRCLGVBQWUsaUJBQWlCLGlCQUFpQixrQkFBa0IsbUJBQW1CLGNBQWMsa0NBQWtDLHVCQUF1QixTQUFTLGtCQUFrQixhQUFhLHVCQUF1QixFQUFFLDhCQUE4QixhQUFhLEVBQUUsc0JBQXNCLGlCQUFpQiw0QkFBNEIsZUFBZSxpQkFBaUIsaUJBQWlCLGtCQUFrQixtQkFBbUIsY0FBYyxrQ0FBa0MsdUJBQXVCLFNBQVMsa0JBQWtCLGFBQWEsdUJBQXVCLG1CQUFtQiwyQkFBMkIsWUFBWSwyQkFBMkIsZUFBZSxpQkFBaUIsaUJBQWlCLGtCQUFrQixtQkFBbUIsOEJBQThCLHVCQUF1QixTQUFTLGtCQUFrQixhQUFhLHVCQUF1QixnQkFBZ0Isa0JBQWtCLFdBQVcsWUFBWSxPQUFPLE1BQU0sb0NBQW9DLGNBQWMsa0NBQWtDLGtCQUFrQixFQUFFLDhCQUE4QixhQUFhLHFCQUFxQixFQUFFLDRDQUE0Qyx1QkFBdUIsYUFBYSxFQUFFLDBCQUEwQiw0QkFBNEIsRUFBRSxtQ0FBbUMsb0JBQW9CLHNDQUFzQyw2QkFBNkIsS0FBSyxrQkFBa0Isa0VBQWtFLHdDQUF3QyxtQkFBbUIsb0JBQW9CLG9DQUFvQyw4QkFBOEIsNkJBQTZCLEtBQUs7O0FBRXAwTiIsImZpbGUiOiJoZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvbWZnLXdlY2hhdC9idW5kbGUvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBhYTgyMjhjZTgwNmU0ZTE2ZjVhOFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDcgOSAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA3IDkgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMThcbiAqKi8iLCJyZXF1aXJlKCcuLi9jc3MvY29tbW9uL3B1YmxpYy5jc3MnKTtcclxucmVxdWlyZSgnLi4vY3NzL2NvbW1vbi9xdWVtYWluLmNzcycpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9oZWFkZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSA3XG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9wdWJsaWMuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3B1YmxpYy5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9wdWJsaWMuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vY3NzL2NvbW1vbi9wdWJsaWMuY3NzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gN1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqKnJlc2V0IGNzcyoqL1xcclxcbmJvZHksIGgxLCBoMiwgaDMsIGg0LCBoNSwgaDYsIGhyLCBwLCBibG9ja3F1b3RlLCBkbCwgZHQsIGRkLCB1bCwgb2wsIGxpLCBwcmUsXFxyXFxuZmllbGRzZXQsIGJ1dHRvbiwgaW5wdXQsIHRleHRhcmVhLCB0aCwgdGQge1xcclxcbiAgICBtYXJnaW46IDAgYXV0bztcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuaW5wdXRbdHlwZT1cXFwiYnV0dG9uXFxcIl0sIGlucHV0W3R5cGU9XFxcInN1Ym1pdFxcXCJdLCBpbnB1dFt0eXBlPVxcXCJyZXNldFxcXCJdIHtcXHJcXG4gICAg44CA44CALXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xcclxcbn1cXHJcXG50ZXh0YXJlYSB7IC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTt9XFxyXFxudWwsIG9sIHsgbGlzdC1zdHlsZTogbm9uZTsgfVxcclxcbmEgeyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXHJcXG5hOmhvdmVyIHsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XFxyXFxuYTp2aXNpdGVkeyB0ZXh0LWRlY29yYXRpb246IG5vbmU7fVxcclxcbmE6bGlua3sgdGV4dC1kZWNvcmF0aW9uOiBub25lO31cXHJcXG5xOmJlZm9yZSwgcTphZnRlciB7IGNvbnRlbnQ6ICcnOyB9XFxyXFxuaW1nIHsgYm9yZGVyOiBub25lOyB9XFxyXFxuYnV0dG9uLCBpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogMTAwJTtcXHJcXG59XFxyXFxudGFibGUge1xcclxcbiAgICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcbiAgICBib3JkZXItc3BhY2luZzogMDtcXHJcXG59XFxyXFxuaHRtbCB7IG92ZXJmbG93LXk6IHNjcm9sbDtmb250LXNpemU6MTBweDsgfVxcclxcbmJvZHl7Zm9udC1zaXplOjEuNHJlbTtjb2xvcjojMDAwO2JhY2tncm91bmQ6I2ViZWJlYjtmb250LWZhbWlseTogJ1xcXFw1RkFFXFxcXDhGNkZcXFxcOTZDNVxcXFw5RUQxJ31cXHJcXG4vKlxcclxcbuagueWFg+e0oOiuvue9ruWtl+S9k+Wkp+WwjzEwcHhcXHJcXG4xcmVtPTEwcHg7XFxyXFxuMS40cmVtPTE0cHg7XFxyXFxuMS42cmVtPTE2cHg7XFxyXFxuKi9cXHJcXG4vKnB1YmxpYyBjc3MqL1xcclxcbi5vdmVyZmxvd3tvdmVyZmxvdzpoaWRkZW47em9vbToxfVxcclxcbi5jZW50ZXJ7dGV4dC1hbGlnbjpjZW50ZXJ9XFxyXFxuLmJsb2Nre2Rpc3BsYXk6YmxvY2t9XFxyXFxuLmRpc3BsYXktbm9uZXtkaXNwbGF5Om5vbmV9XFxyXFxuLmdyZWVue2JhY2tncm91bmQ6IzAwZDUzNX1cXHJcXG4ubGVmdHtmbG9hdDpsZWZ0fVxcclxcbi5yaWdodHtmbG9hdDpyaWdodH1cXHJcXG4uZm9udC1zaXplMTJ7Zm9udC1zaXplOjEuMnJlbX1cXHJcXG4uZm9udC1zaXplMTZ7Zm9udC1zaXplOjEuNnJlbX1cXHJcXG4uZm9udC1zaXplMjZ7Zm9udC1zaXplOjIuNnJlbX1cXHJcXG4uZm9udC1zaXplMjh7Zm9udC1zaXplOjIuOHJlbX1cXHJcXG4uZm9udC1zaXplMzB7Zm9udC1zaXplOjNyZW19XFxyXFxuLmZvbnQtc2l6ZTMye2ZvbnQtc2l6ZTozLjJyZW19XFxyXFxuLmZvbnQtc2l6ZTM2e2ZvbnQtc2l6ZTozLjZyZW19XFxyXFxuLmNvbG9yLXdoaXRle2NvbG9yOiNmZmZ9XFxyXFxuLmNvbG9yLWJsYWNre2NvbG9yOiM2ZTZlNmV9XFxyXFxuLmNvbG9yLXNpbGl2ZXJ7Y29sb3I6I2MyYzJjMn1cXHJcXG4uY29sb3ItZ3JheXtjb2xvcjogI2JlYmViZX1cXHJcXG4uY29sb3ItZ3JlZW57Y29sb3I6IzAwZDUzNSAhaW1wb3J0YW50O31cXHJcXG4uY29sb3ItZGFya2dyZWVue2NvbG9yOiMwMGFmMTV9XFxyXFxuLmNvbG9yLWNoZW5ne2NvbG9yOiNmZjYwMDB9XFxyXFxuLmNvbG9yLWZmN2YwMXtjb2xvcjogI2ZmN2YwMX1cXHJcXG4uY29sb3ItZTg1NzAwe2NvbG9yOiNlODU3MDB9XFxyXFxuLmJnLXNpbGl2ZXJ7YmFja2dyb3VuZDojZWJlYmVifVxcclxcbi5iZy13aGl0ZXtiYWNrZ3JvdW5kOndoaXRlfVxcclxcbi5iZy1jaGVuZ3tiYWNrZ3JvdW5kOiNmZjc4Mjd9XFxyXFxuLmJnLWZmN2YwMXtiYWNrZ3JvdW5kOiAjZmY3ZjAxfVxcclxcbi5iZy1lODU3MDB7YmFja2dyb3VuZDojZTg1NzAwfVxcclxcbi5iZy1yZWR7YmFja2dyb3VuZDojZmY1MDUwfVxcclxcbi5iZy15ZWxsb3d7YmFja2dyb3VuZDojZmZiMjFkfVxcclxcbi5iZy1nb2xkZW57YmFja2dyb3VuZDojZmZlMDY2fVxcclxcbi5iZy1ncmVlbntiYWNrZ3JvdW5kOiMwMGQ1MzUgIWltcG9ydGFudDsgfVxcclxcbi5iZy1kYXJrZ3JlZW57YmFja2dyb3VuZDojMDBhZjE1fVxcclxcbi5ib3gtcGFkZGluZ3twYWRkaW5nOjAgMy4yJX1cXHJcXG4uYm94LXBhZGRpbmctbGVmdHtwYWRkaW5nLWxlZnQ6My4yJX1cXHJcXG4uYm94LXBhZGRpbmctcmlnaHR7cGFkZGluZy1yaWdodDozLjIlfVxcclxcbi5ib3gtcGFkZGluZy10b3B7cGFkZGluZy10b3A6MS40cmVtfVxcclxcbi5ib3gtcGFkZGluZy1ib3R0b217cGFkZGluZy1ib3R0b206MS40cmVtfVxcclxcbi5ib3JkZXItYm90dG9te2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNiZWJlYmV9XFxyXFxuLmJvcmRlci10b3B7Ym9yZGVyLXRvcDoxcHggc29saWQgI2JlYmViZX1cXHJcXG4uYm9yZGVyLWxlZnR7Ym9yZGVyLWxlZnQ6MXB4IHNvbGlkICNiZWJlYmV9XFxyXFxuLmJvcmRlci1yaWdodHtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNiZWJlYmV9XFxyXFxuLm1hcmdpbi1ib3R0b217bWFyZ2luLWJvdHRvbToxLjZyZW19XFxyXFxuLm1hcmdpbi1sZWZ0e21hcmdpbi1sZWZ0OjEuNnJlbX1cXHJcXG4ubWFyZ2luLXJpZ2h0e21hcmdpbi1yaWdodDoxLjZyZW19XFxyXFxuLm1hcmdpbi10b3B7bWFyZ2luLXRvcDoxLjZyZW19XFxyXFxuLmNvbG9yLXJlZHtjb2xvcjpyZWR9XFxyXFxuLmZye2Zsb2F0OiByaWdodH1cXHJcXG4uZmx7ZmxvYXQ6bGVmdH1cXHJcXG4ubWwxMHttYXJnaW4tbGVmdDogMTBweH1cXHJcXG4ubXIxMHttYXJnaW4tcmlnaHQ6IDEwcHh9XFxyXFxuLm1sMjV7bWFyZ2luLWxlZnQ6IDI1cHh9XFxyXFxuLm1yMjV7bWFyZ2luLXJpZ2h0OiAyNXB4fVxcclxcbi5tbHA2e21hcmdpbi1sZWZ0OiA2JX1cXHJcXG4ubXJwNnttYXJnaW4tcmlnaHQ6IDYlfVxcclxcbi5jb250YWluZXJ7d2lkdGg6MTAwJTt9XFxyXFxuLnBjdDUwe3dpZHRoOiA1MCU7fVxcclxcbi5wY3QzMHt3aWR0aDogMzAlO31cXHJcXG4ucGN0MjB7d2lkdGg6IDIwJTt9XFxyXFxuLnBjdDI1e3dpZHRoOiAyNSV9XFxyXFxuLyptZW51IOagt+W8jyovXFxyXFxuI21lbnVDb250cntcXHJcXG4gICAgd2lkdGg6MTMuMyU7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgYm90dG9tOiAyM3B4O1xcclxcbiAgICByaWdodDoyM3B4O1xcclxcbiAgICB6LWluZGV4OiA5OTk7XFxyXFxuICAgIGRpc3BsYXk6YmxvY2s7XFxyXFxufVxcclxcbiNtZW51U2hvd3tcXHJcXG4gICAgcG9zaXRpb246Zml4ZWQ7XFxyXFxuICAgIHRvcDowO1xcclxcbiAgICB3aWR0aDoxMDAlO1xcclxcbiAgICBoZWlnaHQ6MTAwJTtcXHJcXG4gICAgYmFja2dyb3VuZDojZmZmO1xcclxcbiAgICBvcGFjaXR5OiAwLjk7XFxyXFxuICAgIHotaW5kZXg6IDkwMDtcXHJcXG59XFxyXFxuI21lbnVTaG93IGF7XFxyXFxuICAgIHdpZHRoOjE2LjglO1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxufVxcclxcbiNtZW51U2hvdyBhIGltZ3tcXHJcXG4gICAgd2lkdGg6MTAwJTtcXHJcXG59XFxyXFxuLmt0eGF7XFxyXFxuICAgIHRvcDo0Ny4zJTtcXHJcXG4gICAgbGVmdDoyMS4zJTtcXHJcXG59XFxyXFxuLmt4amx7XFxyXFxuICAgIHRvcDo0Ny4zJTtcXHJcXG4gICAgcmlnaHQ6MjEuMyU7XFxyXFxufVxcclxcbi5jdGpqe1xcclxcbiAgICB0b3A6NjYuNiU7XFxyXFxuICAgIGxlZnQ6MjEuMyU7XFxyXFxufVxcclxcbi5teXJ4e1xcclxcbiAgICB0b3A6NjYuNiU7XFxyXFxuICAgIHJpZ2h0OjIxLjMlO1xcclxcbn1cXHJcXG4vKioqKua2iOaBr+W8ueWHuuahhnN0YXJ0KioqKiovXFxyXFxuLnBvcG1zZ3tcXHJcXG4gICAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLDAuNikgO1xcclxcbiAgICB0b3A6IDIwJTtcXHJcXG4gICAgbGVmdDogMTUlO1xcclxcbiAgICB3aWR0aDogNzAlO1xcclxcbiAgICBoZWlnaHQ6IDE1MHB4O1xcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIGNvbG9yOiAjZmZmZmZmO1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiAyMHB4O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICAgIGRpc3BsYXk6dGFibGU7XFxyXFxufVxcclxcbi5wb3Btc2cgZGl2e1xcclxcbiAgICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcclxcbn1cXHJcXG4vKioqKua2iOaBr+W8ueWHuuahhmVuZCoqKioqL1xcclxcblxcclxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXSxbdHlwZT0ncGFzc3dvcmQnXXtcXHJcXG4gICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgIGxpbmUtaGVpZ2h0OiAzcmVtO1xcclxcbiAgICAgYm9yZGVyOnNvbGlkICAxcHg7XFxyXFxuICAgICBib3JkZXItY29sb3I6ICNhY2JhYzI7XFxyXFxuICAgICBwYWRkaW5nLWxlZnQ6IDVweDtcXHJcXG4gICAgIG1hcmdpbjogN3B4IDA7XFxyXFxuICAgICBmb250LWZhbWlseTog5b6u6L2v6ZuF6buRO1xcclxcbiAgICB3aWR0aDogODcuNzg2MiUgICAgICFpbXBvcnRhbnQ7O1xcclxcbiB9XFxyXFxuaW5wdXRbdHlwZT1cXFwiYnV0dG9uXFxcIl17XFxyXFxuICAgIGRpc3BsYXk6YmxvY2s7XFxyXFxuICAgIGJvcmRlcjowO1xcclxcbiAgICBmb250LWZhbWlseTog5b6u6L2v6ZuF6buRO1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcbmlucHV0W3R5cGU9XFxcInRleHRcXFwiXTpob3ZlcntcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjZmZjMzcxO1xcclxcbn1cXHJcXG4uYnRue1xcclxcbiAgICBkaXNwbGF5OmJsb2NrICAgICAhaW1wb3J0YW50O1xcclxcbiAgICBoZWlnaHQ6MzBweCAgICAgIWltcG9ydGFudDs7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OjIuNXJlbSAgICAgIWltcG9ydGFudDs7XFxyXFxuICAgIHRleHQtYWxpZ246Y2VudGVyICAgICAhaW1wb3J0YW50OztcXHJcXG4gICAgZm9udC1mYW1pbHk6YXJpYWwsdmVyZGFuYSxzYW5zLXNlcmlmLCAnXFxcXDY1QjBcXFxcNUI4QlxcXFw0RjUzJyAgIWltcG9ydGFudDs7XFxyXFxuICAgIGZvbnQtc2l6ZToyMnB4ICAgICAhaW1wb3J0YW50OztcXHJcXG4gICAgY29sb3I6I2ZmZiAgICAgIWltcG9ydGFudDs7XFxyXFxuICAgIHRleHQtZGVjb3JhdGlvbjpub25lICAgICAhaW1wb3J0YW50OztcXHJcXG4gICAgYm9yZGVyOjAgICAgICFpbXBvcnRhbnQ7O1xcclxcbiAgICBib3JkZXItcmFkaXVzOiA1cHggICAgICFpbXBvcnRhbnQ7O1xcclxcbiAgICB3aWR0aDogODcuNzg2MiUgICAgICFpbXBvcnRhbnQ7O1xcclxcbiAgICBtYXJnaW4tdG9wOiAyNXB4ICAgICAhaW1wb3J0YW50OztcXHJcXG4gICAgLyozcHggc29saWQgIzM1N2ViZDsqL1xcclxcbiAgICBjdXJzb3I6cG9pbnRlciAgICAgIWltcG9ydGFudDtcXHJcXG4gICAgcGFkZGluZzogMTBweCAwO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4vKumBrue9qeWxgiovXFxyXFxuLmxheWVyXFxyXFxue1xcclxcbiAgICBwb3NpdGlvbjpmaXhlZDtcXHJcXG4gICAgdG9wOjA7XFxyXFxuICAgIHdpZHRoOjEwMCU7XFxyXFxuICAgIGhlaWdodDoxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiMwMDAwMDA7XFxyXFxuICAgIG9wYWNpdHk6IDAuNjtcXHJcXG59XFxyXFxuLmVsbGlwc2lze1xcclxcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXHJcXG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuLyrpopjnm67mqKHmnb/moLflvI8qL1xcclxcbi5tYWlue2xpbmUtaGVpZ2h0OjJyZW07bWFyZ2luLWJvdHRvbToxMDBweDsgfVxcclxcbi5tYWluLXRvcGlje2hlaWdodDo0M3B4O2xpbmUtaGVpZ2h0OjQzcHg7fVxcclxcbi5tYWluLWFuc3dlcntsaW5lLWhlaWdodDoycmVtO31cXHJcXG4uZm9vdGVye3BhZGRpbmctdG9wOjlweDtwYWRkaW5nLWJvdHRvbTo5cHg7cG9zaXRpb246Zml4ZWQgO2xlZnQ6MDtib3R0b206MDt3aWR0aDoxMDAlO31cXHJcXG4ubWFyZ2luLWNlbnRlcnttYXJnaW46MCBhdXRvO31cXHJcXG4uZm9vdGVyIC5sZWZ0LXRleHR7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAgI2U0ZTRlNH1cXHJcXG4uZm9vdGVyIC5sZWZ0LXRleHQsLmZvb3RlciAucmlnaHQtdGV4dHt3aWR0aDo0OSU7aGVpZ2h0OjI1cHg7bGluZS1oZWlnaHQ6MjVweDsgIH1cXHJcXG4uZm9vdGVyIC5sZWZ0LXRleHR7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjZTRlNGU0fVxcclxcbi5mb290ZXIgaW1ne3ZlcnRpY2FsLWFsaWduOm1pZGRsZTttYXJnaW4tcmlnaHQ6MXB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrfVxcclxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9jc3MvY29tbW9uL3B1YmxpYy5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSA3XG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9xdWVtYWluLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9xdWVtYWluLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3F1ZW1haW4uY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vY3NzL2NvbW1vbi9xdWVtYWluLmNzc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDdcbiAqKi8iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIlxcclxcbi8q6a2U5pa55qC86K+V6aKYKi9cXHJcXG4uYXJ0cHJldmlldyBmaWVsZHNldCB7IHBhZGRpbmctdG9wOiAxMHB4OyBmb250LXNpemU6IDE0cHg7IGNsZWFyOiBib3RoOyBvdmVyZmxvdzogaGlkZGVuOyB6b29tOiAxOyBsaW5lLWhlaWdodDogMjRweDsgZm9udC1mYW1pbHk6IFxcXCJcXFxcNUI4QlxcXFw0RjUzXFxcIixzYW5zLXNlcmlmOyBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXHJcXG4uYXJ0cHJldmlldyBmaWVsZHNldCBsZWdlbmQgeyBwYWRkaW5nOiA1cHggMDsgZGlzcGxheTogYmxvY2s7IG1hcmdpbjogNXB4OyBiYWNrZ3JvdW5kOiAjZjFmMWYxOyBjb2xvcjogIzAwMDsgb3ZlcmZsb3c6IGhpZGRlbjsgem9vbTogMTsgfVxcclxcbi5xdWVzZXJyb3IgeyBib3JkZXI6IDFweCBkb3R0ZWQgI2YwMDsgcGFkZGluZzogMnB4OyB9XFxyXFxuZmllbGRzZXQucXVlc2JvcmRlciB7IGZvbnQtc2l6ZTogMTNweDsgZGlzcGxheTogYmxvY2s7IGJvcmRlcjogMXB4IHNvbGlkICNjY2M7IHBhZGRpbmc6IDA7IGZvbnQtZmFtaWx5OiDlrovkvZMsc2Fucy1zZXJpZjsgbGluZS1oZWlnaHQ6IDI1cHg7IGxldHRlci1zcGFjaW5nOiAxcHg7IHdvcmQtYnJlYWs6IGJyZWFrLWFsbDsgfVxcclxcbmZpZWxkc2V0LnF1ZXNlcnJvciB7IGJvcmRlcjogMXB4IHNvbGlkICNmMDA7IGZvbnQtc2l6ZTogMTJweDsgcGFkZGluZzogMnB4OyB9XFxyXFxuZmllbGRzZXQucXVlc2JvcmRlciB0ZCwgZmllbGRzZXQucXVlc2Vycm9yIHRkIHsgbGluZS1oZWlnaHQ6IDE2cHg7IH1cXHJcXG5maWVsZHNldC5xdWVzYm9yZGVyIGVtLCBmaWVsZHNldC5xdWVzZXJyb3IgZW0geyBmb250LXN0eWxlOiBub3JtYWw7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAxMHB4OyBsZWZ0OiAyMHB4OyBmb250LXdlaWdodDogYm9sZDsgfVxcclxcbmZpZWxkc2V0LnRoaXNlcnJvcjEgeyBib3JkZXI6IDFweCBzb2xpZCAjZjAwOyB9XFxyXFxuZmllbGRzZXQudGhpc2Vycm9yMSBsZWdlbmQgeyBib3JkZXI6IDRweCBzb2xpZCAjZjAwOyB9XFxyXFxuZmllbGRzZXQudGhpc2Vycm9yMiB7IGJvcmRlcjogMXB4IHNvbGlkICNBRENEM0M7IH1cXHJcXG5maWVsZHNldC50aGlzZXJyb3IyIGxlZ2VuZCB7IGJvcmRlcjogNHB4IHNvbGlkICNBRENEM0M7IH1cXHJcXG5maWVsZHNldC50aGlzcXVlcyB7IGJvcmRlcjogMXB4IHNvbGlkIGJsdWU7IH1cXHJcXG5maWVsZHNldC50aGlzb24geyBib3JkZXI6IDFweCBzb2xpZCAjQTlDOUUyOyB9XFxyXFxuZmllbGRzZXQudGhpc29uIGRpdi5ib3JkZXIgeyBib3JkZXI6IDFweCBzb2xpZCAjQURDRDNDOyBiYWNrZ3JvdW5kLWNvbG9yOiAjRjJGRERCOyB9XFxyXFxuZmllbGRzZXQsIGltZyB7IGJvcmRlcjogMCBub25lOyB9XFxyXFxudGFibGUudGhpc29uIHsgYm9yZGVyOiAxcHggc29saWQgIzAwMDsgfVxcclxcbnRhYmxlLnRoaXNlcnIgeyBib3JkZXI6IDFweCBzb2xpZCAjMDAwOyB9XFxyXFxuZmllbGRzZXQudGhpc3ZpcDEgeyBib3JkZXI6IDFweCBzb2xpZCAjMDBGOyB9XFxyXFxuZmllbGRzZXQudGhpc3ZpcDEgbGVnZW5kIHsgYm9yZGVyOiA0cHggc29saWQgIzAwMDsgfVxcclxcbmZpZWxkc2V0LnN0YXR1czE3IHsgYm9yZGVyOiAxcHggc29saWQgI2ZmMDBmZjsgfVxcclxcbmZpZWxkc2V0LnN0YXR1czE3IGxlZ2VuZCB7IGJvcmRlcjogNHB4IHNvbGlkICNmZjAwZmY7IH1cXHJcXG4uc2VsZWN0b3B0aW9uIHsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgZm9udC1zaXplOiAxNHB4OyBwYWRkaW5nOiAycHg7IH1cXHJcXG4vKi5zZWxlY3RvcHRpb246aG92ZXIgeyBjb2xvcjogI0VBODUxMTsgfSovXFxyXFxuLnNlbGVjdG9wdGlvbiBsYWJlbCB7IHBhZGRpbmc6IDRweDsgfVxcclxcbmZpZWxkc2V0LnF1ZXNib3JkZXJlIHsgYm9yZGVyOiAycHggZG90dGVkICNmMDA7IH1cXHJcXG4uYW5zd2VyIHsgYm9yZGVyOiAxcHggZG90dGVkICNmZmZmZmY7IH1cXHJcXG5vbC5hbnN3ZXIgbGksIHVsLmFuc3dlciBsaSB7IHBhZGRpbmc6IDFweDsgZm9udC1zaXplOiAxNHB4OyB9XFxyXFxub2wuYW5zd2VyIGxpOmhvdmVyIHsgYmFja2dyb3VuZDogI2YyZjJmMjsgfVxcclxcbi5jb2xsYXBzZUNvbnRhaW5lclBhbmVsIHsgYm9yZGVyOiAwOyB9XFxyXFxuLmNvbGxhcHNlUGFuZWxIZWFkZXIgeyBoZWlnaHQ6IDMwcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBwYWRkaW5nOiA2cHggMCAwIDA7IH1cXHJcXG4uY29sbGFwc2VIZWFkZXJDb250ZW50IHsgZmxvYXQ6IGxlZnQ7IHBhZGRpbmctbGVmdDogNXB4OyB9XFxyXFxuLmNvbGxhcHNlQ29udGVudCB7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgYm9yZGVyLXRvcDogMDsgfVxcclxcbnNwYW4uZmllbGR0aXAgeyBoZWlnaHQ6IDI0cHg7IGxpbmUtaGVpZ2h0OiAyNHB4OyBmb250LXNpemU6IDEycHg7IHRleHQtYWxpZ246IGxlZnQ7IGRpc3BsYXk6IGJsb2NrOyBvdmVyZmxvdzogaGlkZGVuOyBvcGFjaXR5OiAxOyBwYWRkaW5nOiAwOyBwYWRkaW5nOiA1cHggMTBweDsgbWFyZ2luLXRvcDogLTFweDsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgYm9yZGVyLXRvcDogbm9uZSAwcHg7IGJhY2tncm91bmQ6ICNmNmY2ZjY7IH1cXHJcXG5zcGFuLmZpZWxkdGlwIGEgeyBoZWlnaHQ6IDIwcHg7IGxpbmUtaGVpZ2h0OiAyMHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IG1hcmdpbi1sZWZ0OiAxNXB4OyBtYXJnaW4tcmlnaHQ6IDE1cHg7IGN1cnNvcjogcG9pbnRlcjsgY29sb3I6ICMwMDA7IH1cXHJcXG4ucHQwIHsgcGFkZGluZzogMnB4IDAgNXB4IDA7IGZvbnQtc2l6ZTogMTRweDsgZm9udC1mYW1pbHk6IFxcXCJcXFxcOUVEMVxcXFw0RjUzXFxcIixzYW5zLXNlcmlmOyBmb250LXdlaWdodDogNzAwOyB9XFxyXFxuLnB0MSB7IG92ZXJmbG93OiBoaWRkZW47IHpvb206IDE7IGNsZWFyOiBib3RoOyBsaW5lLWhlaWdodDogMjVweDsgZm9udC1zaXplOiAxNHB4OyBwYWRkaW5nOiAyMHB4IDIwcHggNXB4IDIwcHg7IH1cXHJcXG4ucHQxIGltZyB7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcclxcbi5wdDIgeyBwYWRkaW5nOiAxMHB4IDIwcHg7IH1cXHJcXG4ucXVlX21haW4gLnB0MywgLnF1ZV9tYWluIC5wdDQsLnF1ZV9tYWluIC5wdDUsLnF1ZV9tYWluIC5wdDYsLnF1ZV9tYWluIC5wdDcgeyBwYWRkaW5nOiAxMHB4IDIwcHggMTBweCA4MHB4OyBjbGVhcjogYm90aDsgb3ZlcmZsb3c6IGhpZGRlbjsgem9vbTogMTsgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxyXFxuLnB0OCBhOmxpbmssIC5wdDggYTp2aXNpdGVkIHsgbWFyZ2luLXJpZ2h0OiAxMHB4OyBwYWRkaW5nOiAycHggNXB4OyB9XFxyXFxuLnB0OCBhOmhvdmVyIHsgYmFja2dyb3VuZDogI2ZjMDsgfVxcclxcbi5wdDkgeyBwYWRkaW5nOiAyMHB4OyB0ZXh0LWFsaWduOiByaWdodDsgYm9yZGVyOiAwIG5vbmU7IH1cXHJcXG5cXHJcXG4ucHRsaW5lIHsgaGVpZ2h0OiAxcHg7IGJvcmRlci10b3A6IDFweCBzb2xpZCAjY2NjOyBtYXJnaW46IDEwcHggMDsgfVxcclxcblxcclxcbnRhYmxlLmVkaXR0YWJsZSB7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IHRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luOiAycHg7IH1cXHJcXG50YWJsZS5lZGl0dGFibGUgdGgsIHRhYmxlLmVkaXR0YWJsZSB0ZCB7IGxpbmUtaGVpZ2h0OiAzMHB4OyBwYWRkaW5nOiA1cHg7IHdoaXRlLXNwYWNlOiBub3JtYWw7IHdvcmQtYnJlYWs6IGJyZWFrLWFsbDsgYm9yZGVyOiAxcHggc29saWQgIzAwMDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcclxcbi5zZWxlY3RvcHRpb24gbGFiZWwucy5zaCwgZGl2LnMuc2ggeyBtYXJnaW46IDFweDsgYm9yZGVyOiBub25lOyBiYWNrZ3JvdW5kOiBub25lOyB9XFxyXFxudGQubSBsYWJlbCB7IGJvcmRlcjogMXB4IHNvbGlkICNmMDA7IHBhZGRpbmc6IDRweDsgcGFkZGluZy1yaWdodDogNDBweDsgLypiYWNrZ3JvdW5kOiB1cmwoaW1hZ2VzL20ucG5nKSBib3R0b20gcmlnaHQgbm8tcmVwZWF0OyovIGRpc3BsYXk6IGlubGluZS1ibG9jazsgfVxcclxcbnRkLnIgbGFiZWwgeyBwYWRkaW5nLXJpZ2h0OiA0MHB4OyAvKmJhY2tncm91bmQ6IHVybChpbWFnZXMvci5wbmcpIGJvdHRvbSByaWdodCBuby1yZXBlYXQ7Ki8gZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxyXFxuXFxyXFxuLnNhbndzZXIge1xcclxcbiAgICBwYWRkaW5nOiA0cHggMTBweDtcXHJcXG4gICAgbWFyZ2luOiAwcHg7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNBRENEM0M7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGMkZEREI7XFxyXFxuICAgIGNvbG9yOiAjMDAwO1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG4vKuWFrOW8jyovXFxyXFxuLk1hdGhKeWUgeyBib3JkZXI6IDAgbm9uZTsgZGlyZWN0aW9uOiBsdHI7IGxpbmUtaGVpZ2h0OiBub3JtYWw7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgZmxvYXQ6IG5vbmU7IGZvbnQtZmFtaWx5OiAnVGltZXMgTmV3IFJvbWFuJywnXFxcXDVCOEJcXFxcNEY1Myc7IGZvbnQtc2l6ZTogMTVweDsgZm9udC1zdHlsZTogbm9ybWFsOyBmb250LXdlaWdodDogbm9ybWFsOyBsZXR0ZXItc3BhY2luZzogMXB4OyBsaW5lLWhlaWdodDogbm9ybWFsOyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IHRleHQtYWxpZ246IGxlZnQ7IHRleHQtaW5kZW50OiAwOyB0ZXh0LXRyYW5zZm9ybTogbm9uZTsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgd29yZC1zcGFjaW5nOiBub3JtYWw7IHdvcmQtd3JhcDogbm9ybWFsOyAtd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6IG5vbmU7IH1cXHJcXG4uTWF0aEp5ZSBkaXYsIC5NYXRoSnllIHNwYW4geyBib3JkZXI6IDAgbm9uZTsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyBsaW5lLWhlaWdodDogbm9ybWFsOyB0ZXh0LWFsaWduOiBsZWZ0OyBoZWlnaHQ6IGF1dG87IF9oZWlnaHQ6IGF1dG87IHdoaXRlLXNwYWNlOiBub3JtYWw7IH1cXHJcXG4uTWF0aEp5ZSB0YWJsZSB7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgdGV4dC1hbGlnbjogY2VudGVyOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBsaW5lLWhlaWdodDogbm9ybWFsOyBmb250LXNpemU6IGluaGVyaXQ7ICpmb250LXNpemU6IDEwMCU7IF9mb250LXNpemU6IDEwMCU7IGZvbnQtc3R5bGU6IG5vcm1hbDsgZm9udC13ZWlnaHQ6IG5vcm1hbDsgYm9yZGVyOiAwOyBmbG9hdDogbm9uZTsgZGlzcGxheTogaW5saW5lLWJsb2NrOyAqZGlzcGxheTogaW5saW5lOyB6b29tOiAwOyB9XFxyXFxuLk1hdGhKeWUgdGFibGUgdGQgeyBwYWRkaW5nOiAwOyBmb250LXNpemU6IGluaGVyaXQ7IGxpbmUtaGVpZ2h0OiBub3JtYWw7IHdoaXRlLXNwYWNlOiBub3dyYXA7IGJvcmRlcjogMCBub25lOyB3aWR0aDogYXV0bzsgX2hlaWdodDogYXV0bzsgfVxcclxcbi5NYXRoSnllX21pIHsgZm9udC1zdHlsZTogaXRhbGljOyB9XFxyXFxuXFxyXFxuLypkaXYucXVpelB1dFRhZyB7IGRpc3BsYXk6IGlubGluZTsgcGFkZGluZzogM3B4IDEwcHggMXB4IDEwcHg7IG1hcmdpbjogMCAzcHg7IGZvbnQtc2l6ZTogMTRweDsgbWluLXdpZHRoOiAzMHB4OyBtaW4taGVpZ2h0OiAxNnB4OyBsaW5lLWhlaWdodDogMThweDsgaGVpZ2h0OiBhdXRvOyBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwMzNGRjsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB6b29tOiAxOyBiYWNrZ3JvdW5kOiAjZmZmOyBjb2xvcjogI2ZmZjsgd29yZC1icmVhazogYnJlYWstYWxsOyB9Ki9cXHJcXG4vKmRpdi5xdWl6UHV0VGFnOmhvdmVyIHsgY29sb3I6ICNmNjA7IH0qL1xcclxcbmRpdi5xdWl6UHV0VGFnIHsgZGlzcGxheTogaW5saW5lOyBwYWRkaW5nOiAzcHggMTBweCAxcHggMTBweDsgbWFyZ2luOiAwIDNweDsgZm9udC1zaXplOiAxNHB4OyBtaW4td2lkdGg6IDMwcHg7IG1pbi1oZWlnaHQ6IDE2cHg7IGxpbmUtaGVpZ2h0OiAxOHB4OyBoZWlnaHQ6IGF1dG87IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDAzM0ZGOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IHpvb206IDE7IGJhY2tncm91bmQ6ICNmZmY7IGNvbG9yOiAjZmZmOyB3b3JkLWJyZWFrOiBicmVhay1hbGw7cG9zaXRpb246cmVsYXRpdmUgfVxcclxcbi8qZGl2LnF1aXpQdXRUYWc6YWZ0ZXJ7Y29udGVudDonICc7cGFkZGluZzogNHB4IDEycHggMnB4IDEycHg7IG1hcmdpbjogMCAzcHg7IGZvbnQtc2l6ZTogMTRweDsgbWluLXdpZHRoOiAzMHB4OyBtaW4taGVpZ2h0OiAxNnB4OyBsaW5lLWhlaWdodDogMThweDtib3JkZXItYm90dG9tOiAxcHggc29saWQgIzAwMDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB6b29tOiAxOyBiYWNrZ3JvdW5kOiAjZmZmOyBjb2xvcjogI2ZmZjsgd29yZC1icmVhazogYnJlYWstYWxsO2JhY2tncm91bmQ6I2ZmZjtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO2xlZnQ6MDt0b3A6MH0qL1xcclxcbmRpdi5xdWl6UHV0VGFnIC5NYXRoSnllIHRhYmxle2Rpc3BsYXk6bm9uZTt9XFxyXFxuLnB0NiBzcGFuLCAuYWMgdGQgc3Bhbi5mbGVmdCB7IHdoaXRlLXNwYWNlOiBwcmU7IH1cXHJcXG4vKuino+aekOmhtemdoiovXFxyXFxuLnF1ZXMtZGV0YWlsIHsgd2lkdGg6IDEwMCU7IGJhY2tncm91bmQ6ICNmY2ZjZmM7IH1cXHJcXG4ucXVlcy1kZXRhaWwgYSwgLnF1ZXMtZGV0YWlsIGE6dmlzaXRlZCB7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgY29sb3I6ICM1NTU7IH1cXHJcXG4ucXVlcy1kZXRhaWwgYTpob3ZlciB7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOyB9XFxyXFxuLyrotYTmupDor5XpopjmoLflvI8qL1xcclxcbi5lZGl0b3JGaWxsQmFuayB7XFxyXFxuICAgIHdpZHRoOjEwMHB4O1xcclxcbiAgICBib3JkZXItYm90dG9tOjFweCBzb2xpZCBibGFjaztcXHJcXG4gICAgZGlzcGxheTppbmxpbmUtYmxvY2s7XFxyXFxufVxcclxcbi5lZGl0b3JCcmFjZSB7XFxyXFxuICAgIC8qYmFja2dyb3VuZC1pbWFnZTp1cmwoL21mZ2VkaXRvci9pbWFnZXMvZWRpdG9yYnJhY2UucG5nKTsqL1xcclxcbiAgICBib3JkZXItYm90dG9tOjFweCBzb2xpZCBibGFjaztcXHJcXG4gICAgd2lkdGg6NDBweDtcXHJcXG4gICAgaGVpZ2h0OjIwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtcXHJcXG4gICAgdmVydGljYWwtYWxpZ246bWlkZGxlO1xcclxcbiAgICBkaXNwbGF5OmlubGluZS1ibG9jaztcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL2Nzcy9jb21tb24vcXVlbWFpbi5jc3NcbiAqKiBtb2R1bGUgaWQgPSA0N1xuICoqIG1vZHVsZSBjaHVua3MgPSA3XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==