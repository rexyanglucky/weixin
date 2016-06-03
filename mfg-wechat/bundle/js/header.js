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

	module.exports = __webpack_require__(41);


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

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(65);
	__webpack_require__(67);

/***/ },

/***/ 65:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(66);
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

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "/***reset css**/\r\nbody, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre,\r\nfieldset, button, input, textarea, th, td {\r\n    margin: 0 auto;\r\n    padding: 0;\r\n}\r\ninput[type=\"button\"], input[type=\"submit\"], input[type=\"reset\"] {\r\n    　　-webkit-appearance: none;\r\n}\r\ntextarea { -webkit-appearance: none;}\r\nul, ol { list-style: none; }\r\na { text-decoration: none; }\r\na:hover { text-decoration: none; }\r\na:visited{ text-decoration: none;}\r\na:link{ text-decoration: none;}\r\nq:before, q:after { content: ''; }\r\nimg { border: none; }\r\nbutton, input, select, textarea {\r\n    font-size: 100%;\r\n}\r\ntable {\r\n    border-collapse: collapse;\r\n    border-spacing: 0;\r\n}\r\nhtml { overflow-y: scroll;font-size:10px; }\r\nbody{font-size:1.4rem;color:#000;background:#ebebeb;font-family: '\\5FAE\\8F6F\\96C5\\9ED1'}\r\n/*\r\n根元素设置字体大小10px\r\n1rem=10px;\r\n1.4rem=14px;\r\n1.6rem=16px;\r\n*/\r\n/*public css*/\r\n.overflow{overflow:hidden;zoom:1}\r\n.center{text-align:center}\r\n.block{display:block}\r\n.display-none{display:none}\r\n.green{background:#00d535}\r\n.left{float:left}\r\n.right{float:right}\r\n.font-size12{font-size:1.2rem}\r\n.font-size16{font-size:1.6rem}\r\n.font-size26{font-size:2.6rem}\r\n.font-size28{font-size:2.8rem}\r\n.font-size30{font-size:3rem}\r\n.font-size32{font-size:3.2rem}\r\n.font-size36{font-size:3.6rem}\r\n.color-white{color:#fff}\r\n.color-black{color:#6e6e6e}\r\n.color-siliver{color:#c2c2c2}\r\n.color-gray{color: #bebebe}\r\n.color-green{color:#00d535}\r\n.color-darkgreen{color:#00af15}\r\n.color-cheng{color:#ff6000}\r\n.color-ff7f01{color: #ff7f01}\r\n.color-e85700{color:#e85700}\r\n.bg-siliver{background:#ebebeb}\r\n.bg-white{background:white}\r\n.bg-cheng{background:#ff7827}\r\n.bg-ff7f01{background: #ff7f01}\r\n.bg-e85700{background:#e85700}\r\n.bg-red{background:#ff5050}\r\n.bg-yellow{background:#ffb21d}\r\n.bg-golden{background:#ffe066}\r\n.bg-green{background:#00d535 !important; }\r\n.bg-darkgreen{background:#00af15}\r\n.box-padding{padding:0 3.2%}\r\n.box-padding-left{padding-left:3.2%}\r\n.box-padding-right{padding-right:3.2%}\r\n.box-padding-top{padding-top:1.4rem}\r\n.box-padding-bottom{padding-bottom:1.4rem}\r\n.border-bottom{border-bottom:1px solid #bebebe}\r\n.border-top{border-top:1px solid #bebebe}\r\n.border-left{border-left:1px solid #bebebe}\r\n.border-right{border-right:1px solid #bebebe}\r\n.margin-bottom{margin-bottom:1.6rem}\r\n.margin-left{margin-left:1.6rem}\r\n.margin-right{margin-right:1.6rem}\r\n.margin-top{margin-top:1.6rem}\r\n.color-red{color:red}\r\n.fr{float: right}\r\n.fl{float:left}\r\n.ml10{margin-left: 10px}\r\n.mr10{margin-right: 10px}\r\n.ml25{margin-left: 25px}\r\n.mr25{margin-right: 25px}\r\n.mlp6{margin-left: 6%}\r\n.mrp6{margin-right: 6%}\r\n.container{width:100%;}\r\n.pct50{width: 50%;}\r\n.pct30{width: 30%;}\r\n.pct20{width: 20%;}\r\n.pct25{width: 25%}\r\n/*menu 样式*/\r\n#menuContr{\r\n    width:13.3%;\r\n    position: fixed;\r\n    bottom: 23px;\r\n    right:23px;\r\n    z-index: 999;\r\n    display:block;\r\n}\r\n#menuShow{\r\n    position:fixed;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background:#fff;\r\n    opacity: 0.9;\r\n    z-index: 900;\r\n}\r\n#menuShow a{\r\n    width:16.8%;\r\n    position: absolute;\r\n}\r\n#menuShow a img{\r\n    width:100%;\r\n}\r\n.ktxa{\r\n    top:47.3%;\r\n    left:21.3%;\r\n}\r\n.kxjl{\r\n    top:47.3%;\r\n    right:21.3%;\r\n}\r\n.ctjj{\r\n    top:66.6%;\r\n    left:21.3%;\r\n}\r\n.myrx{\r\n    top:66.6%;\r\n    right:21.3%;\r\n}\r\n/****消息弹出框start*****/\r\n.popmsg{\r\n    background:rgba(0,0,0,0.6) ;\r\n    top: 20%;\r\n    left: 15%;\r\n    width: 70%;\r\n    height: 150px;\r\n    position: fixed;\r\n    color: #ffffff;\r\n    text-align: center;\r\n    line-height: 20px;\r\n    border-radius: 5px;\r\n    display:table;\r\n}\r\n.popmsg div{\r\n    display: table-cell;\r\n    vertical-align: middle;\r\n}\r\n/****消息弹出框end*****/\r\n\r\ninput[type=\"text\"],[type='password']{\r\n     border-radius: 5px;\r\n     line-height: 3rem;\r\n     border:solid  1px;\r\n     border-color: #acbac2;\r\n     padding-left: 5px;\r\n     margin: 7px 0;\r\n     font-family: 微软雅黑;\r\n    width: 87.7862%     !important;;\r\n }\r\ninput[type=\"button\"]{\r\n    display:block;\r\n    border:0;\r\n    font-family: 微软雅黑;\r\n    cursor: pointer;\r\n}\r\ninput[type=\"text\"]:hover{\r\n    border-color: #ffc371;\r\n}\r\n.btn{\r\n    display:block     !important;\r\n    height:30px     !important;;\r\n    line-height:2.5rem     !important;;\r\n    text-align:center     !important;;\r\n    font-family:arial,verdana,sans-serif, '\\65B0\\5B8B\\4F53'  !important;;\r\n    font-size:22px     !important;;\r\n    color:#fff     !important;;\r\n    text-decoration:none     !important;;\r\n    border:0     !important;;\r\n    border-radius: 5px     !important;;\r\n    width: 87.7862%     !important;;\r\n    margin-top: 25px     !important;;\r\n    /*3px solid #357ebd;*/\r\n    cursor:pointer     !important;\r\n    padding: 10px 0;\r\n\r\n}\r\n\r\n/*遮罩层*/\r\n.layer\r\n{\r\n    position:fixed;\r\n    top:0;\r\n    width:100%;\r\n    height:100%;\r\n    background:#000000;\r\n    opacity: 0.6;\r\n}\r\n.ellipsis{\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n    overflow: hidden;\r\n}\r\n/*题目模板样式*/\r\n.main{line-height:2rem;margin-bottom:100px; }\r\n.main-topic{height:43px;line-height:43px;}\r\n.main-answer{line-height:2rem;}\r\n.footer{padding-top:9px;padding-bottom:9px;position:fixed ;left:0;bottom:0;width:100%;}\r\n.margin-center{margin:0 auto;}\r\n.footer .left-text{border-right:1px solid  #e4e4e4}\r\n.footer .left-text,.footer .right-text{width:49%;height:25px;line-height:25px;  }\r\n.footer .left-text{border-right:1px solid #e4e4e4}\r\n.footer img{vertical-align:middle;margin-right:1px;display:inline-block}\r\n", ""]);
	
	// exports


/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(68);
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

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, "\r\n/*魔方格试题*/\r\n.artpreview fieldset { padding-top: 10px; font-size: 14px; clear: both; overflow: hidden; zoom: 1; line-height: 24px; font-family: \"\\5B8B\\4F53\",sans-serif; position: relative; }\r\n.artpreview fieldset legend { padding: 5px 0; display: block; margin: 5px; background: #f1f1f1; color: #000; overflow: hidden; zoom: 1; }\r\n.queserror { border: 1px dotted #f00; padding: 2px; }\r\nfieldset.quesborder { font-size: 13px; display: block; border: 1px solid #ccc; padding: 0; font-family: 宋体,sans-serif; line-height: 25px; letter-spacing: 1px; word-break: break-all; }\r\nfieldset.queserror { border: 1px solid #f00; font-size: 12px; padding: 2px; }\r\nfieldset.quesborder td, fieldset.queserror td { line-height: 16px; }\r\nfieldset.quesborder em, fieldset.queserror em { font-style: normal; position: absolute; top: 10px; left: 20px; font-weight: bold; }\r\nfieldset.thiserror1 { border: 1px solid #f00; }\r\nfieldset.thiserror1 legend { border: 4px solid #f00; }\r\nfieldset.thiserror2 { border: 1px solid #ADCD3C; }\r\nfieldset.thiserror2 legend { border: 4px solid #ADCD3C; }\r\nfieldset.thisques { border: 1px solid blue; }\r\nfieldset.thison { border: 1px solid #A9C9E2; }\r\nfieldset.thison div.border { border: 1px solid #ADCD3C; background-color: #F2FDDB; }\r\nfieldset, img { border: 0 none; }\r\ntable.thison { border: 1px solid #000; }\r\ntable.thiserr { border: 1px solid #000; }\r\nfieldset.thisvip1 { border: 1px solid #00F; }\r\nfieldset.thisvip1 legend { border: 4px solid #000; }\r\nfieldset.status17 { border: 1px solid #ff00ff; }\r\nfieldset.status17 legend { border: 4px solid #ff00ff; }\r\n.selectoption { vertical-align: middle; font-size: 14px; padding: 2px; }\r\n/*.selectoption:hover { color: #EA8511; }*/\r\n.selectoption label { padding: 4px; }\r\nfieldset.quesbordere { border: 2px dotted #f00; }\r\n.answer { border: 1px dotted #ffffff; }\r\nol.answer li, ul.answer li { padding: 1px; font-size: 14px; }\r\nol.answer li:hover { background: #f2f2f2; }\r\n.collapseContainerPanel { border: 0; }\r\n.collapsePanelHeader { height: 30px; font-weight: bold; padding: 6px 0 0 0; }\r\n.collapseHeaderContent { float: left; padding-left: 5px; }\r\n.collapseContent { margin: 0; padding: 0; border: 1px solid #ccc; border-top: 0; }\r\nspan.fieldtip { height: 24px; line-height: 24px; font-size: 12px; text-align: left; display: block; overflow: hidden; opacity: 1; padding: 0; padding: 5px 10px; margin-top: -1px; border: 1px solid #ccc; border-top: none 0px; background: #f6f6f6; }\r\nspan.fieldtip a { height: 20px; line-height: 20px; display: inline-block; margin-left: 15px; margin-right: 15px; cursor: pointer; color: #000; }\r\n.pt0 { padding: 2px 0 5px 0; font-size: 14px; font-family: \"\\9ED1\\4F53\",sans-serif; font-weight: 700; }\r\n.pt1 { overflow: hidden; zoom: 1; clear: both; line-height: 25px; font-size: 14px; padding: 20px 20px 5px 20px; }\r\n.pt1 img { position: relative; }\r\n.pt2 { padding: 10px 20px; }\r\n.que_main .pt3, .que_main .pt4,.que_main .pt5,.que_main .pt6,.que_main .pt7 { padding: 10px 20px 10px 80px; clear: both; overflow: hidden; zoom: 1; position: relative; }\r\n.pt8 a:link, .pt8 a:visited { margin-right: 10px; padding: 2px 5px; }\r\n.pt8 a:hover { background: #fc0; }\r\n.pt9 { padding: 20px; text-align: right; border: 0 none; }\r\n\r\n.ptline { height: 1px; border-top: 1px solid #ccc; margin: 10px 0; }\r\n\r\ntable.edittable { border-collapse: collapse; text-align: center; margin: 2px; }\r\ntable.edittable th, table.edittable td { line-height: 30px; padding: 5px; white-space: normal; word-break: break-all; border: 1px solid #000; vertical-align: middle; }\r\n.selectoption label.s.sh, div.s.sh { margin: 1px; border: none; background: none; }\r\ntd.m label { border: 1px solid #f00; padding: 4px; padding-right: 40px; /*background: url(images/m.png) bottom right no-repeat;*/ display: inline-block; }\r\ntd.r label { padding-right: 40px; /*background: url(images/r.png) bottom right no-repeat;*/ display: inline-block; }\r\n\r\n.sanwser {\r\n    padding: 4px 10px;\r\n    margin: 0px;\r\n    border: 1px solid #ADCD3C;\r\n    background-color: #F2FDDB;\r\n    color: #000;\r\n    display: none;\r\n}\r\n/*公式*/\r\n.MathJye { border: 0 none; direction: ltr; line-height: normal; display: inline-block; float: none; font-family: 'Times New Roman','\\5B8B\\4F53'; font-size: 15px; font-style: normal; font-weight: normal; letter-spacing: 1px; line-height: normal; margin: 0; padding: 0; text-align: left; text-indent: 0; text-transform: none; white-space: nowrap; word-spacing: normal; word-wrap: normal; -webkit-text-size-adjust: none; }\r\n.MathJye div, .MathJye span { border: 0 none; margin: 0; padding: 0; line-height: normal; text-align: left; height: auto; _height: auto; white-space: normal; }\r\n.MathJye table { border-collapse: collapse; margin: 0; padding: 0; text-align: center; vertical-align: middle; line-height: normal; font-size: inherit; *font-size: 100%; _font-size: 100%; font-style: normal; font-weight: normal; border: 0; float: none; display: inline-block; *display: inline; zoom: 0; }\r\n.MathJye table td { padding: 0; font-size: inherit; line-height: normal; white-space: nowrap; border: 0 none; width: auto; _height: auto; }\r\n.MathJye_mi { font-style: italic; }\r\n\r\n/*div.quizPutTag { display: inline; padding: 3px 10px 1px 10px; margin: 0 3px; font-size: 14px; min-width: 30px; min-height: 16px; line-height: 18px; height: auto; border-bottom: 1px solid #0033FF; text-decoration: none; zoom: 1; background: #fff; color: #fff; word-break: break-all; }*/\r\n/*div.quizPutTag:hover { color: #f60; }*/\r\ndiv.quizPutTag { display: inline; padding: 3px 10px 1px 10px; margin: 0 3px; font-size: 14px; min-width: 30px; min-height: 16px; line-height: 18px; height: auto; border-bottom: 1px solid #0033FF; text-decoration: none; zoom: 1; background: #fff; color: #fff; word-break: break-all;position:relative }\r\n/*div.quizPutTag:after{content:' ';padding: 4px 12px 2px 12px; margin: 0 3px; font-size: 14px; min-width: 30px; min-height: 16px; line-height: 18px;border-bottom: 1px solid #000; text-decoration: none; zoom: 1; background: #fff; color: #fff; word-break: break-all;background:#fff;position:absolute;width:100%;height:100%;left:0;top:0}*/\r\ndiv.quizPutTag .MathJye table{display:none;}\r\n.pt6 span, .ac td span.fleft { white-space: pre; }\r\n/*解析页面*/\r\n.ques-detail { width: 100%; background: #fcfcfc; }\r\n.ques-detail a, .ques-detail a:visited { text-decoration: none; color: #555; }\r\n.ques-detail a:hover { text-decoration: underline; }\r\n/*资源试题样式*/\r\n.editorFillBank {\r\n    width:100px;\r\n    border-bottom:1px solid black;\r\n    display:inline-block;\r\n}\r\n.editorBrace {\r\n    /*background-image:url(/mfgeditor/images/editorbrace.png);*/\r\n    border-bottom:1px solid black;\r\n    width:40px;\r\n    height:20px;\r\n    background-repeat:no-repeat;\r\n    vertical-align:middle;\r\n    display:inline-block;\r\n}", ""]);
	
	// exports


/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGFmYzJmNWVkNjk1NzMxOGZlZTc/YjcwZSoqKioqKiIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzP2RhMDQqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCoqKioqIiwid2VicGFjazovLy8uL2pzL2hlYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9jc3MvY29tbW9uL3B1YmxpYy5jc3M/MWViZCIsIndlYnBhY2s6Ly8vLi9jc3MvY29tbW9uL3B1YmxpYy5jc3MiLCJ3ZWJwYWNrOi8vLy4vY3NzL2NvbW1vbi9xdWVtYWluLmNzcz81OGMyIiwid2VicGFjazovLy8uL2Nzcy9jb21tb24vcXVlbWFpbi5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0EseUNBQXdDLGdCQUFnQjtBQUN4RCxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCLGlCQUFpQjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQVksb0JBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNq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QUFvQixrQkFBa0Isa0JBQWtCLG9CQUFvQixxQkFBcUIsV0FBVyxhQUFhLHVCQUF1QixrQkFBa0IsU0FBUyxFQUFFLHVCQUF1QixZQUFZLG9CQUFvQixxQkFBcUIscUJBQXFCLGdCQUFnQixhQUFhLGVBQWUsRUFBRSxpQkFBaUIsb0JBQW9CLEVBQUUsMEJBQTBCLGlCQUFpQiw0QkFBNEIsZUFBZSxpQkFBaUIsaUJBQWlCLGtCQUFrQixtQkFBbUIsY0FBYyxrQ0FBa0MsdUJBQXVCLFNBQVMsa0JBQWtCLGFBQWEsdUJBQXVCLEVBQUUsOEJBQThCLGFBQWEsRUFBRSxzQkFBc0IsaUJBQWlCLDRCQUE0QixlQUFlLGlCQUFpQixpQkFBaUIsa0JBQWtCLG1CQUFtQixjQUFjLGtDQUFrQyx1QkFBdUIsU0FBUyxrQkFBa0IsYUFBYSx1QkFBdUIsbUJBQW1CLDJCQUEyQixZQUFZLDJCQUEyQixlQUFlLGlCQUFpQixpQkFBaUIsa0JBQWtCLG1CQUFtQiw4QkFBOEIsdUJBQXVCLFNBQVMsa0JBQWtCLGFBQWEsdUJBQXVCLGdCQUFnQixrQkFBa0IsV0FBVyxZQUFZLE9BQU8sTUFBTSxvQ0FBb0MsY0FBYyxrQ0FBa0Msa0JBQWtCLEVBQUUsOEJBQThCLGFBQWEscUJBQXFCLEVBQUUsNENBQTRDLHVCQUF1QixhQUFhLEVBQUUsMEJBQTBCLDRCQUE0QixFQUFFLG1DQUFtQyxvQkFBb0Isc0NBQXNDLDZCQUE2QixLQUFLLGtCQUFrQixrRUFBa0Usd0NBQXdDLG1CQUFtQixvQkFBb0Isb0NBQW9DLDhCQUE4Qiw2QkFBNkIsS0FBSzs7QUFFcDBOIiwiZmlsZSI6ImhlYWRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9tZmctd2VjaGF0L2J1bmRsZS9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDhhZmMyZjVlZDY5NTczMThmZWU3XG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNyA5IDExIDEyIDEzIDE0IDE1IDE2IDE3IDE4XG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDcgOSAxMSAxMiAxMyAxNCAxNSAxNiAxNyAxOFxuICoqLyIsInJlcXVpcmUoJy4uL2Nzcy9jb21tb24vcHVibGljLmNzcycpO1xyXG5yZXF1aXJlKCcuLi9jc3MvY29tbW9uL3F1ZW1haW4uY3NzJyk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2hlYWRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDdcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3B1YmxpYy5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vcHVibGljLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3B1YmxpYy5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9jc3MvY29tbW9uL3B1YmxpYy5jc3NcbiAqKiBtb2R1bGUgaWQgPSA2NVxuICoqIG1vZHVsZSBjaHVua3MgPSA3XG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKioqcmVzZXQgY3NzKiovXFxyXFxuYm9keSwgaDEsIGgyLCBoMywgaDQsIGg1LCBoNiwgaHIsIHAsIGJsb2NrcXVvdGUsIGRsLCBkdCwgZGQsIHVsLCBvbCwgbGksIHByZSxcXHJcXG5maWVsZHNldCwgYnV0dG9uLCBpbnB1dCwgdGV4dGFyZWEsIHRoLCB0ZCB7XFxyXFxuICAgIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5pbnB1dFt0eXBlPVxcXCJidXR0b25cXFwiXSwgaW5wdXRbdHlwZT1cXFwic3VibWl0XFxcIl0sIGlucHV0W3R5cGU9XFxcInJlc2V0XFxcIl0ge1xcclxcbiAgICDjgIDjgIAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XFxyXFxufVxcclxcbnRleHRhcmVhIHsgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO31cXHJcXG51bCwgb2wgeyBsaXN0LXN0eWxlOiBub25lOyB9XFxyXFxuYSB7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfVxcclxcbmE6aG92ZXIgeyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH1cXHJcXG5hOnZpc2l0ZWR7IHRleHQtZGVjb3JhdGlvbjogbm9uZTt9XFxyXFxuYTpsaW5reyB0ZXh0LWRlY29yYXRpb246IG5vbmU7fVxcclxcbnE6YmVmb3JlLCBxOmFmdGVyIHsgY29udGVudDogJyc7IH1cXHJcXG5pbWcgeyBib3JkZXI6IG5vbmU7IH1cXHJcXG5idXR0b24sIGlucHV0LCBzZWxlY3QsIHRleHRhcmVhIHtcXHJcXG4gICAgZm9udC1zaXplOiAxMDAlO1xcclxcbn1cXHJcXG50YWJsZSB7XFxyXFxuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XFxyXFxuICAgIGJvcmRlci1zcGFjaW5nOiAwO1xcclxcbn1cXHJcXG5odG1sIHsgb3ZlcmZsb3cteTogc2Nyb2xsO2ZvbnQtc2l6ZToxMHB4OyB9XFxyXFxuYm9keXtmb250LXNpemU6MS40cmVtO2NvbG9yOiMwMDA7YmFja2dyb3VuZDojZWJlYmViO2ZvbnQtZmFtaWx5OiAnXFxcXDVGQUVcXFxcOEY2RlxcXFw5NkM1XFxcXDlFRDEnfVxcclxcbi8qXFxyXFxu5qC55YWD57Sg6K6+572u5a2X5L2T5aSn5bCPMTBweFxcclxcbjFyZW09MTBweDtcXHJcXG4xLjRyZW09MTRweDtcXHJcXG4xLjZyZW09MTZweDtcXHJcXG4qL1xcclxcbi8qcHVibGljIGNzcyovXFxyXFxuLm92ZXJmbG93e292ZXJmbG93OmhpZGRlbjt6b29tOjF9XFxyXFxuLmNlbnRlcnt0ZXh0LWFsaWduOmNlbnRlcn1cXHJcXG4uYmxvY2t7ZGlzcGxheTpibG9ja31cXHJcXG4uZGlzcGxheS1ub25le2Rpc3BsYXk6bm9uZX1cXHJcXG4uZ3JlZW57YmFja2dyb3VuZDojMDBkNTM1fVxcclxcbi5sZWZ0e2Zsb2F0OmxlZnR9XFxyXFxuLnJpZ2h0e2Zsb2F0OnJpZ2h0fVxcclxcbi5mb250LXNpemUxMntmb250LXNpemU6MS4ycmVtfVxcclxcbi5mb250LXNpemUxNntmb250LXNpemU6MS42cmVtfVxcclxcbi5mb250LXNpemUyNntmb250LXNpemU6Mi42cmVtfVxcclxcbi5mb250LXNpemUyOHtmb250LXNpemU6Mi44cmVtfVxcclxcbi5mb250LXNpemUzMHtmb250LXNpemU6M3JlbX1cXHJcXG4uZm9udC1zaXplMzJ7Zm9udC1zaXplOjMuMnJlbX1cXHJcXG4uZm9udC1zaXplMzZ7Zm9udC1zaXplOjMuNnJlbX1cXHJcXG4uY29sb3Itd2hpdGV7Y29sb3I6I2ZmZn1cXHJcXG4uY29sb3ItYmxhY2t7Y29sb3I6IzZlNmU2ZX1cXHJcXG4uY29sb3Itc2lsaXZlcntjb2xvcjojYzJjMmMyfVxcclxcbi5jb2xvci1ncmF5e2NvbG9yOiAjYmViZWJlfVxcclxcbi5jb2xvci1ncmVlbntjb2xvcjojMDBkNTM1fVxcclxcbi5jb2xvci1kYXJrZ3JlZW57Y29sb3I6IzAwYWYxNX1cXHJcXG4uY29sb3ItY2hlbmd7Y29sb3I6I2ZmNjAwMH1cXHJcXG4uY29sb3ItZmY3ZjAxe2NvbG9yOiAjZmY3ZjAxfVxcclxcbi5jb2xvci1lODU3MDB7Y29sb3I6I2U4NTcwMH1cXHJcXG4uYmctc2lsaXZlcntiYWNrZ3JvdW5kOiNlYmViZWJ9XFxyXFxuLmJnLXdoaXRle2JhY2tncm91bmQ6d2hpdGV9XFxyXFxuLmJnLWNoZW5ne2JhY2tncm91bmQ6I2ZmNzgyN31cXHJcXG4uYmctZmY3ZjAxe2JhY2tncm91bmQ6ICNmZjdmMDF9XFxyXFxuLmJnLWU4NTcwMHtiYWNrZ3JvdW5kOiNlODU3MDB9XFxyXFxuLmJnLXJlZHtiYWNrZ3JvdW5kOiNmZjUwNTB9XFxyXFxuLmJnLXllbGxvd3tiYWNrZ3JvdW5kOiNmZmIyMWR9XFxyXFxuLmJnLWdvbGRlbntiYWNrZ3JvdW5kOiNmZmUwNjZ9XFxyXFxuLmJnLWdyZWVue2JhY2tncm91bmQ6IzAwZDUzNSAhaW1wb3J0YW50OyB9XFxyXFxuLmJnLWRhcmtncmVlbntiYWNrZ3JvdW5kOiMwMGFmMTV9XFxyXFxuLmJveC1wYWRkaW5ne3BhZGRpbmc6MCAzLjIlfVxcclxcbi5ib3gtcGFkZGluZy1sZWZ0e3BhZGRpbmctbGVmdDozLjIlfVxcclxcbi5ib3gtcGFkZGluZy1yaWdodHtwYWRkaW5nLXJpZ2h0OjMuMiV9XFxyXFxuLmJveC1wYWRkaW5nLXRvcHtwYWRkaW5nLXRvcDoxLjRyZW19XFxyXFxuLmJveC1wYWRkaW5nLWJvdHRvbXtwYWRkaW5nLWJvdHRvbToxLjRyZW19XFxyXFxuLmJvcmRlci1ib3R0b217Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2JlYmViZX1cXHJcXG4uYm9yZGVyLXRvcHtib3JkZXItdG9wOjFweCBzb2xpZCAjYmViZWJlfVxcclxcbi5ib3JkZXItbGVmdHtib3JkZXItbGVmdDoxcHggc29saWQgI2JlYmViZX1cXHJcXG4uYm9yZGVyLXJpZ2h0e2JvcmRlci1yaWdodDoxcHggc29saWQgI2JlYmViZX1cXHJcXG4ubWFyZ2luLWJvdHRvbXttYXJnaW4tYm90dG9tOjEuNnJlbX1cXHJcXG4ubWFyZ2luLWxlZnR7bWFyZ2luLWxlZnQ6MS42cmVtfVxcclxcbi5tYXJnaW4tcmlnaHR7bWFyZ2luLXJpZ2h0OjEuNnJlbX1cXHJcXG4ubWFyZ2luLXRvcHttYXJnaW4tdG9wOjEuNnJlbX1cXHJcXG4uY29sb3ItcmVke2NvbG9yOnJlZH1cXHJcXG4uZnJ7ZmxvYXQ6IHJpZ2h0fVxcclxcbi5mbHtmbG9hdDpsZWZ0fVxcclxcbi5tbDEwe21hcmdpbi1sZWZ0OiAxMHB4fVxcclxcbi5tcjEwe21hcmdpbi1yaWdodDogMTBweH1cXHJcXG4ubWwyNXttYXJnaW4tbGVmdDogMjVweH1cXHJcXG4ubXIyNXttYXJnaW4tcmlnaHQ6IDI1cHh9XFxyXFxuLm1scDZ7bWFyZ2luLWxlZnQ6IDYlfVxcclxcbi5tcnA2e21hcmdpbi1yaWdodDogNiV9XFxyXFxuLmNvbnRhaW5lcnt3aWR0aDoxMDAlO31cXHJcXG4ucGN0NTB7d2lkdGg6IDUwJTt9XFxyXFxuLnBjdDMwe3dpZHRoOiAzMCU7fVxcclxcbi5wY3QyMHt3aWR0aDogMjAlO31cXHJcXG4ucGN0MjV7d2lkdGg6IDI1JX1cXHJcXG4vKm1lbnUg5qC35byPKi9cXHJcXG4jbWVudUNvbnRye1xcclxcbiAgICB3aWR0aDoxMy4zJTtcXHJcXG4gICAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgICBib3R0b206IDIzcHg7XFxyXFxuICAgIHJpZ2h0OjIzcHg7XFxyXFxuICAgIHotaW5kZXg6IDk5OTtcXHJcXG4gICAgZGlzcGxheTpibG9jaztcXHJcXG59XFxyXFxuI21lbnVTaG93e1xcclxcbiAgICBwb3NpdGlvbjpmaXhlZDtcXHJcXG4gICAgdG9wOjA7XFxyXFxuICAgIHdpZHRoOjEwMCU7XFxyXFxuICAgIGhlaWdodDoxMDAlO1xcclxcbiAgICBiYWNrZ3JvdW5kOiNmZmY7XFxyXFxuICAgIG9wYWNpdHk6IDAuOTtcXHJcXG4gICAgei1pbmRleDogOTAwO1xcclxcbn1cXHJcXG4jbWVudVNob3cgYXtcXHJcXG4gICAgd2lkdGg6MTYuOCU7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuI21lbnVTaG93IGEgaW1ne1xcclxcbiAgICB3aWR0aDoxMDAlO1xcclxcbn1cXHJcXG4ua3R4YXtcXHJcXG4gICAgdG9wOjQ3LjMlO1xcclxcbiAgICBsZWZ0OjIxLjMlO1xcclxcbn1cXHJcXG4ua3hqbHtcXHJcXG4gICAgdG9wOjQ3LjMlO1xcclxcbiAgICByaWdodDoyMS4zJTtcXHJcXG59XFxyXFxuLmN0amp7XFxyXFxuICAgIHRvcDo2Ni42JTtcXHJcXG4gICAgbGVmdDoyMS4zJTtcXHJcXG59XFxyXFxuLm15cnh7XFxyXFxuICAgIHRvcDo2Ni42JTtcXHJcXG4gICAgcmlnaHQ6MjEuMyU7XFxyXFxufVxcclxcbi8qKioq5raI5oGv5by55Ye65qGGc3RhcnQqKioqKi9cXHJcXG4ucG9wbXNne1xcclxcbiAgICBiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsMC42KSA7XFxyXFxuICAgIHRvcDogMjAlO1xcclxcbiAgICBsZWZ0OiAxNSU7XFxyXFxuICAgIHdpZHRoOiA3MCU7XFxyXFxuICAgIGhlaWdodDogMTUwcHg7XFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgY29sb3I6ICNmZmZmZmY7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcXHJcXG4gICAgZGlzcGxheTp0YWJsZTtcXHJcXG59XFxyXFxuLnBvcG1zZyBkaXZ7XFxyXFxuICAgIGRpc3BsYXk6IHRhYmxlLWNlbGw7XFxyXFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxyXFxufVxcclxcbi8qKioq5raI5oGv5by55Ye65qGGZW5kKioqKiovXFxyXFxuXFxyXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdLFt0eXBlPSdwYXNzd29yZCdde1xcclxcbiAgICAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgICAgbGluZS1oZWlnaHQ6IDNyZW07XFxyXFxuICAgICBib3JkZXI6c29saWQgIDFweDtcXHJcXG4gICAgIGJvcmRlci1jb2xvcjogI2FjYmFjMjtcXHJcXG4gICAgIHBhZGRpbmctbGVmdDogNXB4O1xcclxcbiAgICAgbWFyZ2luOiA3cHggMDtcXHJcXG4gICAgIGZvbnQtZmFtaWx5OiDlvq7ova/pm4Xpu5E7XFxyXFxuICAgIHdpZHRoOiA4Ny43ODYyJSAgICAgIWltcG9ydGFudDs7XFxyXFxuIH1cXHJcXG5pbnB1dFt0eXBlPVxcXCJidXR0b25cXFwiXXtcXHJcXG4gICAgZGlzcGxheTpibG9jaztcXHJcXG4gICAgYm9yZGVyOjA7XFxyXFxuICAgIGZvbnQtZmFtaWx5OiDlvq7ova/pm4Xpu5E7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuaW5wdXRbdHlwZT1cXFwidGV4dFxcXCJdOmhvdmVye1xcclxcbiAgICBib3JkZXItY29sb3I6ICNmZmMzNzE7XFxyXFxufVxcclxcbi5idG57XFxyXFxuICAgIGRpc3BsYXk6YmxvY2sgICAgICFpbXBvcnRhbnQ7XFxyXFxuICAgIGhlaWdodDozMHB4ICAgICAhaW1wb3J0YW50OztcXHJcXG4gICAgbGluZS1oZWlnaHQ6Mi41cmVtICAgICAhaW1wb3J0YW50OztcXHJcXG4gICAgdGV4dC1hbGlnbjpjZW50ZXIgICAgICFpbXBvcnRhbnQ7O1xcclxcbiAgICBmb250LWZhbWlseTphcmlhbCx2ZXJkYW5hLHNhbnMtc2VyaWYsICdcXFxcNjVCMFxcXFw1QjhCXFxcXDRGNTMnICAhaW1wb3J0YW50OztcXHJcXG4gICAgZm9udC1zaXplOjIycHggICAgICFpbXBvcnRhbnQ7O1xcclxcbiAgICBjb2xvcjojZmZmICAgICAhaW1wb3J0YW50OztcXHJcXG4gICAgdGV4dC1kZWNvcmF0aW9uOm5vbmUgICAgICFpbXBvcnRhbnQ7O1xcclxcbiAgICBib3JkZXI6MCAgICAgIWltcG9ydGFudDs7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDVweCAgICAgIWltcG9ydGFudDs7XFxyXFxuICAgIHdpZHRoOiA4Ny43ODYyJSAgICAgIWltcG9ydGFudDs7XFxyXFxuICAgIG1hcmdpbi10b3A6IDI1cHggICAgICFpbXBvcnRhbnQ7O1xcclxcbiAgICAvKjNweCBzb2xpZCAjMzU3ZWJkOyovXFxyXFxuICAgIGN1cnNvcjpwb2ludGVyICAgICAhaW1wb3J0YW50O1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDA7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi8q6YGu572p5bGCKi9cXHJcXG4ubGF5ZXJcXHJcXG57XFxyXFxuICAgIHBvc2l0aW9uOmZpeGVkO1xcclxcbiAgICB0b3A6MDtcXHJcXG4gICAgd2lkdGg6MTAwJTtcXHJcXG4gICAgaGVpZ2h0OjEwMCU7XFxyXFxuICAgIGJhY2tncm91bmQ6IzAwMDAwMDtcXHJcXG4gICAgb3BhY2l0eTogMC42O1xcclxcbn1cXHJcXG4uZWxsaXBzaXN7XFxyXFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcclxcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG4vKumimOebruaooeadv+agt+W8jyovXFxyXFxuLm1haW57bGluZS1oZWlnaHQ6MnJlbTttYXJnaW4tYm90dG9tOjEwMHB4OyB9XFxyXFxuLm1haW4tdG9waWN7aGVpZ2h0OjQzcHg7bGluZS1oZWlnaHQ6NDNweDt9XFxyXFxuLm1haW4tYW5zd2Vye2xpbmUtaGVpZ2h0OjJyZW07fVxcclxcbi5mb290ZXJ7cGFkZGluZy10b3A6OXB4O3BhZGRpbmctYm90dG9tOjlweDtwb3NpdGlvbjpmaXhlZCA7bGVmdDowO2JvdHRvbTowO3dpZHRoOjEwMCU7fVxcclxcbi5tYXJnaW4tY2VudGVye21hcmdpbjowIGF1dG87fVxcclxcbi5mb290ZXIgLmxlZnQtdGV4dHtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICAjZTRlNGU0fVxcclxcbi5mb290ZXIgLmxlZnQtdGV4dCwuZm9vdGVyIC5yaWdodC10ZXh0e3dpZHRoOjQ5JTtoZWlnaHQ6MjVweDtsaW5lLWhlaWdodDoyNXB4OyAgfVxcclxcbi5mb290ZXIgLmxlZnQtdGV4dHtib3JkZXItcmlnaHQ6MXB4IHNvbGlkICNlNGU0ZTR9XFxyXFxuLmZvb3RlciBpbWd7dmVydGljYWwtYWxpZ246bWlkZGxlO21hcmdpbi1yaWdodDoxcHg7ZGlzcGxheTppbmxpbmUtYmxvY2t9XFxyXFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL2Nzcy9jb21tb24vcHVibGljLmNzc1xuICoqIG1vZHVsZSBpZCA9IDY2XG4gKiogbW9kdWxlIGNodW5rcyA9IDdcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3F1ZW1haW4uY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL3F1ZW1haW4uY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vcXVlbWFpbi5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9jc3MvY29tbW9uL3F1ZW1haW4uY3NzXG4gKiogbW9kdWxlIGlkID0gNjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gN1xuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxyXFxuLyrprZTmlrnmoLzor5XpopgqL1xcclxcbi5hcnRwcmV2aWV3IGZpZWxkc2V0IHsgcGFkZGluZy10b3A6IDEwcHg7IGZvbnQtc2l6ZTogMTRweDsgY2xlYXI6IGJvdGg7IG92ZXJmbG93OiBoaWRkZW47IHpvb206IDE7IGxpbmUtaGVpZ2h0OiAyNHB4OyBmb250LWZhbWlseTogXFxcIlxcXFw1QjhCXFxcXDRGNTNcXFwiLHNhbnMtc2VyaWY7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcclxcbi5hcnRwcmV2aWV3IGZpZWxkc2V0IGxlZ2VuZCB7IHBhZGRpbmc6IDVweCAwOyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiA1cHg7IGJhY2tncm91bmQ6ICNmMWYxZjE7IGNvbG9yOiAjMDAwOyBvdmVyZmxvdzogaGlkZGVuOyB6b29tOiAxOyB9XFxyXFxuLnF1ZXNlcnJvciB7IGJvcmRlcjogMXB4IGRvdHRlZCAjZjAwOyBwYWRkaW5nOiAycHg7IH1cXHJcXG5maWVsZHNldC5xdWVzYm9yZGVyIHsgZm9udC1zaXplOiAxM3B4OyBkaXNwbGF5OiBibG9jazsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgcGFkZGluZzogMDsgZm9udC1mYW1pbHk6IOWui+S9kyxzYW5zLXNlcmlmOyBsaW5lLWhlaWdodDogMjVweDsgbGV0dGVyLXNwYWNpbmc6IDFweDsgd29yZC1icmVhazogYnJlYWstYWxsOyB9XFxyXFxuZmllbGRzZXQucXVlc2Vycm9yIHsgYm9yZGVyOiAxcHggc29saWQgI2YwMDsgZm9udC1zaXplOiAxMnB4OyBwYWRkaW5nOiAycHg7IH1cXHJcXG5maWVsZHNldC5xdWVzYm9yZGVyIHRkLCBmaWVsZHNldC5xdWVzZXJyb3IgdGQgeyBsaW5lLWhlaWdodDogMTZweDsgfVxcclxcbmZpZWxkc2V0LnF1ZXNib3JkZXIgZW0sIGZpZWxkc2V0LnF1ZXNlcnJvciBlbSB7IGZvbnQtc3R5bGU6IG5vcm1hbDsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDEwcHg7IGxlZnQ6IDIwcHg7IGZvbnQtd2VpZ2h0OiBib2xkOyB9XFxyXFxuZmllbGRzZXQudGhpc2Vycm9yMSB7IGJvcmRlcjogMXB4IHNvbGlkICNmMDA7IH1cXHJcXG5maWVsZHNldC50aGlzZXJyb3IxIGxlZ2VuZCB7IGJvcmRlcjogNHB4IHNvbGlkICNmMDA7IH1cXHJcXG5maWVsZHNldC50aGlzZXJyb3IyIHsgYm9yZGVyOiAxcHggc29saWQgI0FEQ0QzQzsgfVxcclxcbmZpZWxkc2V0LnRoaXNlcnJvcjIgbGVnZW5kIHsgYm9yZGVyOiA0cHggc29saWQgI0FEQ0QzQzsgfVxcclxcbmZpZWxkc2V0LnRoaXNxdWVzIHsgYm9yZGVyOiAxcHggc29saWQgYmx1ZTsgfVxcclxcbmZpZWxkc2V0LnRoaXNvbiB7IGJvcmRlcjogMXB4IHNvbGlkICNBOUM5RTI7IH1cXHJcXG5maWVsZHNldC50aGlzb24gZGl2LmJvcmRlciB7IGJvcmRlcjogMXB4IHNvbGlkICNBRENEM0M7IGJhY2tncm91bmQtY29sb3I6ICNGMkZEREI7IH1cXHJcXG5maWVsZHNldCwgaW1nIHsgYm9yZGVyOiAwIG5vbmU7IH1cXHJcXG50YWJsZS50aGlzb24geyBib3JkZXI6IDFweCBzb2xpZCAjMDAwOyB9XFxyXFxudGFibGUudGhpc2VyciB7IGJvcmRlcjogMXB4IHNvbGlkICMwMDA7IH1cXHJcXG5maWVsZHNldC50aGlzdmlwMSB7IGJvcmRlcjogMXB4IHNvbGlkICMwMEY7IH1cXHJcXG5maWVsZHNldC50aGlzdmlwMSBsZWdlbmQgeyBib3JkZXI6IDRweCBzb2xpZCAjMDAwOyB9XFxyXFxuZmllbGRzZXQuc3RhdHVzMTcgeyBib3JkZXI6IDFweCBzb2xpZCAjZmYwMGZmOyB9XFxyXFxuZmllbGRzZXQuc3RhdHVzMTcgbGVnZW5kIHsgYm9yZGVyOiA0cHggc29saWQgI2ZmMDBmZjsgfVxcclxcbi5zZWxlY3RvcHRpb24geyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBmb250LXNpemU6IDE0cHg7IHBhZGRpbmc6IDJweDsgfVxcclxcbi8qLnNlbGVjdG9wdGlvbjpob3ZlciB7IGNvbG9yOiAjRUE4NTExOyB9Ki9cXHJcXG4uc2VsZWN0b3B0aW9uIGxhYmVsIHsgcGFkZGluZzogNHB4OyB9XFxyXFxuZmllbGRzZXQucXVlc2JvcmRlcmUgeyBib3JkZXI6IDJweCBkb3R0ZWQgI2YwMDsgfVxcclxcbi5hbnN3ZXIgeyBib3JkZXI6IDFweCBkb3R0ZWQgI2ZmZmZmZjsgfVxcclxcbm9sLmFuc3dlciBsaSwgdWwuYW5zd2VyIGxpIHsgcGFkZGluZzogMXB4OyBmb250LXNpemU6IDE0cHg7IH1cXHJcXG5vbC5hbnN3ZXIgbGk6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZjJmMmYyOyB9XFxyXFxuLmNvbGxhcHNlQ29udGFpbmVyUGFuZWwgeyBib3JkZXI6IDA7IH1cXHJcXG4uY29sbGFwc2VQYW5lbEhlYWRlciB7IGhlaWdodDogMzBweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IHBhZGRpbmc6IDZweCAwIDAgMDsgfVxcclxcbi5jb2xsYXBzZUhlYWRlckNvbnRlbnQgeyBmbG9hdDogbGVmdDsgcGFkZGluZy1sZWZ0OiA1cHg7IH1cXHJcXG4uY29sbGFwc2VDb250ZW50IHsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyBib3JkZXItdG9wOiAwOyB9XFxyXFxuc3Bhbi5maWVsZHRpcCB7IGhlaWdodDogMjRweDsgbGluZS1oZWlnaHQ6IDI0cHg7IGZvbnQtc2l6ZTogMTJweDsgdGV4dC1hbGlnbjogbGVmdDsgZGlzcGxheTogYmxvY2s7IG92ZXJmbG93OiBoaWRkZW47IG9wYWNpdHk6IDE7IHBhZGRpbmc6IDA7IHBhZGRpbmc6IDVweCAxMHB4OyBtYXJnaW4tdG9wOiAtMXB4OyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyBib3JkZXItdG9wOiBub25lIDBweDsgYmFja2dyb3VuZDogI2Y2ZjZmNjsgfVxcclxcbnNwYW4uZmllbGR0aXAgYSB7IGhlaWdodDogMjBweDsgbGluZS1oZWlnaHQ6IDIwcHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgbWFyZ2luLWxlZnQ6IDE1cHg7IG1hcmdpbi1yaWdodDogMTVweDsgY3Vyc29yOiBwb2ludGVyOyBjb2xvcjogIzAwMDsgfVxcclxcbi5wdDAgeyBwYWRkaW5nOiAycHggMCA1cHggMDsgZm9udC1zaXplOiAxNHB4OyBmb250LWZhbWlseTogXFxcIlxcXFw5RUQxXFxcXDRGNTNcXFwiLHNhbnMtc2VyaWY7IGZvbnQtd2VpZ2h0OiA3MDA7IH1cXHJcXG4ucHQxIHsgb3ZlcmZsb3c6IGhpZGRlbjsgem9vbTogMTsgY2xlYXI6IGJvdGg7IGxpbmUtaGVpZ2h0OiAyNXB4OyBmb250LXNpemU6IDE0cHg7IHBhZGRpbmc6IDIwcHggMjBweCA1cHggMjBweDsgfVxcclxcbi5wdDEgaW1nIHsgcG9zaXRpb246IHJlbGF0aXZlOyB9XFxyXFxuLnB0MiB7IHBhZGRpbmc6IDEwcHggMjBweDsgfVxcclxcbi5xdWVfbWFpbiAucHQzLCAucXVlX21haW4gLnB0NCwucXVlX21haW4gLnB0NSwucXVlX21haW4gLnB0NiwucXVlX21haW4gLnB0NyB7IHBhZGRpbmc6IDEwcHggMjBweCAxMHB4IDgwcHg7IGNsZWFyOiBib3RoOyBvdmVyZmxvdzogaGlkZGVuOyB6b29tOiAxOyBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXHJcXG4ucHQ4IGE6bGluaywgLnB0OCBhOnZpc2l0ZWQgeyBtYXJnaW4tcmlnaHQ6IDEwcHg7IHBhZGRpbmc6IDJweCA1cHg7IH1cXHJcXG4ucHQ4IGE6aG92ZXIgeyBiYWNrZ3JvdW5kOiAjZmMwOyB9XFxyXFxuLnB0OSB7IHBhZGRpbmc6IDIwcHg7IHRleHQtYWxpZ246IHJpZ2h0OyBib3JkZXI6IDAgbm9uZTsgfVxcclxcblxcclxcbi5wdGxpbmUgeyBoZWlnaHQ6IDFweDsgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7IG1hcmdpbjogMTBweCAwOyB9XFxyXFxuXFxyXFxudGFibGUuZWRpdHRhYmxlIHsgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsgdGV4dC1hbGlnbjogY2VudGVyOyBtYXJnaW46IDJweDsgfVxcclxcbnRhYmxlLmVkaXR0YWJsZSB0aCwgdGFibGUuZWRpdHRhYmxlIHRkIHsgbGluZS1oZWlnaHQ6IDMwcHg7IHBhZGRpbmc6IDVweDsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgd29yZC1icmVhazogYnJlYWstYWxsOyBib3JkZXI6IDFweCBzb2xpZCAjMDAwOyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyB9XFxyXFxuLnNlbGVjdG9wdGlvbiBsYWJlbC5zLnNoLCBkaXYucy5zaCB7IG1hcmdpbjogMXB4OyBib3JkZXI6IG5vbmU7IGJhY2tncm91bmQ6IG5vbmU7IH1cXHJcXG50ZC5tIGxhYmVsIHsgYm9yZGVyOiAxcHggc29saWQgI2YwMDsgcGFkZGluZzogNHB4OyBwYWRkaW5nLXJpZ2h0OiA0MHB4OyAvKmJhY2tncm91bmQ6IHVybChpbWFnZXMvbS5wbmcpIGJvdHRvbSByaWdodCBuby1yZXBlYXQ7Ki8gZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XFxyXFxudGQuciBsYWJlbCB7IHBhZGRpbmctcmlnaHQ6IDQwcHg7IC8qYmFja2dyb3VuZDogdXJsKGltYWdlcy9yLnBuZykgYm90dG9tIHJpZ2h0IG5vLXJlcGVhdDsqLyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cXHJcXG5cXHJcXG4uc2Fud3NlciB7XFxyXFxuICAgIHBhZGRpbmc6IDRweCAxMHB4O1xcclxcbiAgICBtYXJnaW46IDBweDtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgI0FEQ0QzQztcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0YyRkREQjtcXHJcXG4gICAgY29sb3I6ICMwMDA7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcbi8q5YWs5byPKi9cXHJcXG4uTWF0aEp5ZSB7IGJvcmRlcjogMCBub25lOyBkaXJlY3Rpb246IGx0cjsgbGluZS1oZWlnaHQ6IG5vcm1hbDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyBmbG9hdDogbm9uZTsgZm9udC1mYW1pbHk6ICdUaW1lcyBOZXcgUm9tYW4nLCdcXFxcNUI4QlxcXFw0RjUzJzsgZm9udC1zaXplOiAxNXB4OyBmb250LXN0eWxlOiBub3JtYWw7IGZvbnQtd2VpZ2h0OiBub3JtYWw7IGxldHRlci1zcGFjaW5nOiAxcHg7IGxpbmUtaGVpZ2h0OiBub3JtYWw7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgdGV4dC1hbGlnbjogbGVmdDsgdGV4dC1pbmRlbnQ6IDA7IHRleHQtdHJhbnNmb3JtOiBub25lOyB3aGl0ZS1zcGFjZTogbm93cmFwOyB3b3JkLXNwYWNpbmc6IG5vcm1hbDsgd29yZC13cmFwOiBub3JtYWw7IC13ZWJraXQtdGV4dC1zaXplLWFkanVzdDogbm9uZTsgfVxcclxcbi5NYXRoSnllIGRpdiwgLk1hdGhKeWUgc3BhbiB7IGJvcmRlcjogMCBub25lOyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IGxpbmUtaGVpZ2h0OiBub3JtYWw7IHRleHQtYWxpZ246IGxlZnQ7IGhlaWdodDogYXV0bzsgX2hlaWdodDogYXV0bzsgd2hpdGUtc3BhY2U6IG5vcm1hbDsgfVxcclxcbi5NYXRoSnllIHRhYmxlIHsgYm9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyB0ZXh0LWFsaWduOiBjZW50ZXI7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IGxpbmUtaGVpZ2h0OiBub3JtYWw7IGZvbnQtc2l6ZTogaW5oZXJpdDsgKmZvbnQtc2l6ZTogMTAwJTsgX2ZvbnQtc2l6ZTogMTAwJTsgZm9udC1zdHlsZTogbm9ybWFsOyBmb250LXdlaWdodDogbm9ybWFsOyBib3JkZXI6IDA7IGZsb2F0OiBub25lOyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7ICpkaXNwbGF5OiBpbmxpbmU7IHpvb206IDA7IH1cXHJcXG4uTWF0aEp5ZSB0YWJsZSB0ZCB7IHBhZGRpbmc6IDA7IGZvbnQtc2l6ZTogaW5oZXJpdDsgbGluZS1oZWlnaHQ6IG5vcm1hbDsgd2hpdGUtc3BhY2U6IG5vd3JhcDsgYm9yZGVyOiAwIG5vbmU7IHdpZHRoOiBhdXRvOyBfaGVpZ2h0OiBhdXRvOyB9XFxyXFxuLk1hdGhKeWVfbWkgeyBmb250LXN0eWxlOiBpdGFsaWM7IH1cXHJcXG5cXHJcXG4vKmRpdi5xdWl6UHV0VGFnIHsgZGlzcGxheTogaW5saW5lOyBwYWRkaW5nOiAzcHggMTBweCAxcHggMTBweDsgbWFyZ2luOiAwIDNweDsgZm9udC1zaXplOiAxNHB4OyBtaW4td2lkdGg6IDMwcHg7IG1pbi1oZWlnaHQ6IDE2cHg7IGxpbmUtaGVpZ2h0OiAxOHB4OyBoZWlnaHQ6IGF1dG87IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDAzM0ZGOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IHpvb206IDE7IGJhY2tncm91bmQ6ICNmZmY7IGNvbG9yOiAjZmZmOyB3b3JkLWJyZWFrOiBicmVhay1hbGw7IH0qL1xcclxcbi8qZGl2LnF1aXpQdXRUYWc6aG92ZXIgeyBjb2xvcjogI2Y2MDsgfSovXFxyXFxuZGl2LnF1aXpQdXRUYWcgeyBkaXNwbGF5OiBpbmxpbmU7IHBhZGRpbmc6IDNweCAxMHB4IDFweCAxMHB4OyBtYXJnaW46IDAgM3B4OyBmb250LXNpemU6IDE0cHg7IG1pbi13aWR0aDogMzBweDsgbWluLWhlaWdodDogMTZweDsgbGluZS1oZWlnaHQ6IDE4cHg7IGhlaWdodDogYXV0bzsgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMwMDMzRkY7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgem9vbTogMTsgYmFja2dyb3VuZDogI2ZmZjsgY29sb3I6ICNmZmY7IHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtwb3NpdGlvbjpyZWxhdGl2ZSB9XFxyXFxuLypkaXYucXVpelB1dFRhZzphZnRlcntjb250ZW50OicgJztwYWRkaW5nOiA0cHggMTJweCAycHggMTJweDsgbWFyZ2luOiAwIDNweDsgZm9udC1zaXplOiAxNHB4OyBtaW4td2lkdGg6IDMwcHg7IG1pbi1oZWlnaHQ6IDE2cHg7IGxpbmUtaGVpZ2h0OiAxOHB4O2JvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMDAwOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IHpvb206IDE7IGJhY2tncm91bmQ6ICNmZmY7IGNvbG9yOiAjZmZmOyB3b3JkLWJyZWFrOiBicmVhay1hbGw7YmFja2dyb3VuZDojZmZmO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjEwMCU7aGVpZ2h0OjEwMCU7bGVmdDowO3RvcDowfSovXFxyXFxuZGl2LnF1aXpQdXRUYWcgLk1hdGhKeWUgdGFibGV7ZGlzcGxheTpub25lO31cXHJcXG4ucHQ2IHNwYW4sIC5hYyB0ZCBzcGFuLmZsZWZ0IHsgd2hpdGUtc3BhY2U6IHByZTsgfVxcclxcbi8q6Kej5p6Q6aG16Z2iKi9cXHJcXG4ucXVlcy1kZXRhaWwgeyB3aWR0aDogMTAwJTsgYmFja2dyb3VuZDogI2ZjZmNmYzsgfVxcclxcbi5xdWVzLWRldGFpbCBhLCAucXVlcy1kZXRhaWwgYTp2aXNpdGVkIHsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBjb2xvcjogIzU1NTsgfVxcclxcbi5xdWVzLWRldGFpbCBhOmhvdmVyIHsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IH1cXHJcXG4vKui1hOa6kOivlemimOagt+W8jyovXFxyXFxuLmVkaXRvckZpbGxCYW5rIHtcXHJcXG4gICAgd2lkdGg6MTAwcHg7XFxyXFxuICAgIGJvcmRlci1ib3R0b206MXB4IHNvbGlkIGJsYWNrO1xcclxcbiAgICBkaXNwbGF5OmlubGluZS1ibG9jaztcXHJcXG59XFxyXFxuLmVkaXRvckJyYWNlIHtcXHJcXG4gICAgLypiYWNrZ3JvdW5kLWltYWdlOnVybCgvbWZnZWRpdG9yL2ltYWdlcy9lZGl0b3JicmFjZS5wbmcpOyovXFxyXFxuICAgIGJvcmRlci1ib3R0b206MXB4IHNvbGlkIGJsYWNrO1xcclxcbiAgICB3aWR0aDo0MHB4O1xcclxcbiAgICBoZWlnaHQ6MjBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O1xcclxcbiAgICB2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7XFxyXFxuICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrO1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vY3NzL2NvbW1vbi9xdWVtYWluLmNzc1xuICoqIG1vZHVsZSBpZCA9IDY4XG4gKiogbW9kdWxlIGNodW5rcyA9IDdcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9