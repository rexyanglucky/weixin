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

	module.exports = __webpack_require__(55);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	/**
	 * Created by humorHan on 2016/5/20.
	 */
	module.exports={
	        scr: function () {
	        var dHeight = document.body.scrollHeight;
	        var sTop = document.body.scrollTop;
	        var cHeight = window.innerHeight;
	        if (sTop + cHeight == dHeight) {
	            return true;
	        }
	
	    },
	    getSubjectName:function(id){
	        var name='';
	        switch (id.toString())
	        {
	            case '01':
	                name='语文';
	                break;
	            case '02':
	                name='数学';
	                break;
	            case '03':
	                name='英语';
	                break;
	            case '04':
	                name='物理';
	                break;
	            case '05':
	                name='化学';
	                break;
	            case '06':
	                name='政治';
	                break;
	            case '07':
	                name='历史';
	                break;
	            case '08':
	                name='地理';
	                break;
	            case '09':
	                name='生物';
	                break;
	        }
	        return name;
	    },
	    getStageStr: function (stageId) {
	        var stageIdStr = "";
	        switch (stageId) {
	            case "x":
	                stageIdStr = "小学";
	                break;
	            case "c":
	                stageIdStr = "初中";
	                break;
	            case "g":
	                stageIdStr = "高中";
	                break;
	            default:
	                break;
	        }
	        return stageIdStr;
	    },
	    go_menu:function(conId){
	        var con=document.getElementById(conId);
	        var img=document.createElement('img');
	        img.setAttribute('id','menuContr');
	        img.src='../bundle/img/bottom-yuan-show.png';
	        con.appendChild(img);
	        var menuContr=document.getElementById('menuContr');
	        menuContr.addEventListener('touchstart',menuBody,false);
	        function menuBody(){
	            var menuShow=document.getElementById('menuShow');
	            if(menuShow){
	                var t=menuShow.getAttribute('style');
	                if( t == 'display: none;'){
	                    menuShow.style.display='block';
	                    img.src="../bundle/img/menu2.png";
	                }else{
	                    menuShow.style.display='none';
	                    img.src="../bundle/img/bottom-yuan-show.png"
	                }
	            }else{
	                var show=document.createElement('div');
	                show.setAttribute('id','menuShow');
	                show.setAttribute('style','display:block;');
	                show.innerHTML='<a href="afterclassjob.html" class="ktxa"><img src="../bundle/img/xuean.png"/></a><a href="wrong-gather.html" class="kxjl"><img src="../bundle/img/jijin.png"</a><a href="homework-list.html"  class="ctjj"><img src="../bundle/img/jilu.png"></a><a href="monthweak.html" class="myrx"><img src="../bundle/img/ruoxiang.png"></a>';
	                document.body.appendChild(show);
	            }
	        }
	    },
	
	    go_study_show:function(imglogo,showid){
	           var n=1;
	            $(imglogo).parent("h3").on("touchstart",function(){
	                if(n %2 !=0){
	                    $(imglogo).attr("src","../img/btm.png");
	                    $(showid).show();
	                }
	                else{
	                    $(imglogo).attr("src","../img/top-jiantou.png");
	                    $(showid).hide();
	                }
	                n++;
	            })},
	
	    showConfirm:function(msg,callback)
	    {
	        var layer=document.createElement("div");
	        layer.className="layer";
	        document.body.appendChild(layer);
	        var confirm='<div class="popconfirm">';
	        confirm+='<div class="title">';
	        confirm+='<i class="icon-close"></i>';
	        confirm+=' </div>';
	        confirm+=' <div class="content">'+msg+' </div>';
	        confirm+=' <div class="foot">';
	        confirm+='  <input class="popbtn btnok color-green" type="button"  value="确定"/>';
	        confirm+='  <input class="popbtn btncancel color-green" type="button" value="取消"/>';
	        confirm+='   </div></div>';
	        $('body').append(confirm);
	        //$('.popconfirm').css('top',(document.documentElement.clientHeight -$('.popconfirm').height())/2);
	        $(".btnok").unbind("click");
	        $(".btnok").click(function(){
	            $(".layer").remove();
	            $(".popconfirm").remove();
	            return callback(true);
	        });
	        $(".btncancel,.icon-close").click(function(){
	            $(".layer").remove();
	            $(".popconfirm").remove();
	            return callback(false);
	        });
	    },
	    //信息提示框
	    showPopMsg:function (msg) {
	        var html='<div class="popmsg"><div class="content">'+msg+'</div></div>';
	        $('.popmsg').remove();
	        $('body').append(html);
	        $('.popmsg').css('left',(document.body.clientWidth  -$('.popmsg').width())/2);
	        $('.popmsg').css('top',(document.documentElement.clientHeight -$('.popmsg').height())/2);
	        setTimeout(function(){$('.popmsg').remove();},1000);
	    },
	    //获取接口url 如获取openid   getApiUrl('Account/GetOpenID')
	    getApiUrl:function(action){
	        var baseurl='http://192.168.180.15:8998/';
	        //var baseurl='http://localhost:5441/';
	        return baseurl+action;
	    },
	    //调用api成功后，先调用此方法，判断用户是否已经绑定，若未绑定，跳转到绑定页
	    checkBind:function(data){
	        if(!data.OK)
	        {
	            if(data.Code==1)
	            {
	                window.location.href="bindinfo.html";
	                return;
	            }
	        }
	    },
	    //获取OpenId
	    getOpenId:function(appid,appsecret,code){
	var openid;
	        $.ajax({
	            type: 'post',
	            async:false,
	            url:this.getApiUrl('Account/GetOpenID'),
	            // data to be added to query string:
	            data: {AppID:appid,AppSecret:appsecret,Code:code},
	            // type of data we are expecting in return:
	            dataType: 'json',
	            //timeout: 300,
	            success: function(data){
	                if(data)
	                {
	                    if(data.OK)
	                    {
	                         openid=data.ID;
	
	                    }
	                }
	
	            },
	            error: function(xhr, type){
	                alert('Ajax error!')
	            }
	        })
	        return openid;
	    },
	    //获取url参数
	    getQueryString:function (name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(decodeURI(r[2])); return null;
	},
	
	    dateFormat: function(date, format){
	        var date = new Date(date);
	        var map = {
	            "Y": date.getYear(),
	            "M": date.getMonth() + 1, //月份
	            "d": date.getDate(), //日
	            "h": date.getHours(), //小时
	            "m": date.getMinutes(), //分
	            "s": date.getSeconds(), //秒
	            "q": Math.floor((date.getMonth() + 3) / 3), //季度
	            "S": date.getMilliseconds() //毫秒
	        };
	        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
	            var v = map[t];
	            if (v !== undefined) {
	                if (all.length > 1) {
	                    v = '0' + v;
	                    v = v.substr(v.length - 2);
	                }
	                return v;
	            }
	            else if (t === 'y') {
	                return (date.getFullYear() + '').substr(4 - all.length);
	            }
	            return all;
	        });
	        return format;
	    },
	    //处理试题公式 mathjax
	    initMathJaxObj:function (id) {
	        MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById(id)]);
	    },
	    getLocalTime: function (val) {
	        if (val != null) {
	            var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
	            var year = date.getFullYear();
	            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	            var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	
	            return year + "-" + month + "-" + currentDate + " " + hours + ":" + minute;
	        }
	        return "";
	    }
	
	};
	


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

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/26.
	 */
	var noDataTpl = __webpack_require__(26);
	__webpack_require__(27);
	
	var _$el;
	var noData = {
	    init: function(msg){
	        var p={msg:msg}
	        _$el.html(noDataTpl(p));
	    }
	};
	module.exports = {
	    init: function(dom,msg){
	        _$el = $("." + dom);
	        noData.init(msg);
	    },
	
	};

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(4);
	module.exports=template('dep/component/no-data/tpl/no-data-tpl',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,msg=$data.msg,$out='';$out+='<div class="no-data-bg"></div> <div class="no-data-tip font-size12">';
	$out+=$escape(msg || '暂无数据');
	$out+='</div>';
	return new String($out);
	});

/***/ },

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./no-data.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./no-data.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".no-data-bg{\r\n    margin: 47% auto 5%;\r\n    height: 57px;\r\n    width: 58px;\r\n    background: url(" + __webpack_require__(29) + ") center center no-repeat;\r\n}\r\n.no-data-tip{\r\n    text-align: center;\r\n    color: #999999;\r\n}", ""]);
	
	// exports


/***/ },

/***/ 29:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA6CAYAAAAKjPErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTVGNjVEQjYyMzI4MTFFNjlFRDU4OEIxMTg3ODdDNDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTVGNjVEQjUyMzI4MTFFNjlFRDU4OEIxMTg3ODdDNDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzM4ZDRiMi1kODE0LTQ5NTUtYjcxNC0zOGM2Mjc0YjNlOTYiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NDU0YWUyOC01ZTQwLTExNzktODQxZi04NmU0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"

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	   // alert('无数据')
	    var WebStorageCache = __webpack_require__(56);
	    var home = __webpack_require__(2);
	    var nodedata=__webpack_require__(25);
	    nodedata.init('main','对不起，数据暂时未加载');
	   // nodedata.module.exports.init(dom,'目前无数据')
	    //引入时间设置的插件
	    // var WebStorageCache = require('web-storage-cache.min.js');
	
	    var todyurl = home.getApiUrl('HomeSchoolContact/TodayStudyStatus/GetTodayStudyStatusList');
	    console.log(todyurl);
	    //得打AppID和openid
	    var appid = sessionStorage.getItem('appid');
	    var openid = sessionStorage.getItem('openid');
	    console.log(appid);
	    console.log(openid);
	    var wsCache = new WebStorageCache({
	        storage: 'localStorage'
	    });
	    //书写数组存储对应类的id
	    var speak = [];
	    var homework = [];
	    var module = [];
	    var newwork = [];
	   /* //声明一个数组来存储点击时候的id；
	    var clickId=[];*/
	    //请求数据
	    $.ajax({
	        type: 'post',
	        async: false,
	        url: todyurl,
	        // data to be added to query string:
	        data: {AppID: appid, openID: openid},
	        // type of data we are expecting in return:
	        dataType: 'json',
	        //timeout: 300,
	        success: function (data) {
	            console.log(data.N);
	            //开课提醒的数据
	            var datta = data.N.HaveClassAlertList;
	            //交作业提醒的数据
	            var datta1 = data.N.SubmitHomeWorkAlertList;
	            //学案提醒的数据
	            var datta2 = data.N.NewTeachPlanAlertList;
	            //新作业提醒的数据
	            var datta3 = data.N.NewHomeWorkAlertList;
	            var length = datta.length;
	            var length1 = datta1.length;
	            var length2 = datta2.length;
	            var length3 = datta3.length;
	            var str = '';
	            var str1 = '';
	            var str2 = '';
	            var str3 = '';
	            for (var i = 0; i < length; i++) {
	                //将Id存到数组里面
	                speak.push(datta[i].id);
	                var string0 = (datta0[i].dateTimes).match((/(\d)+/));
	                var start0 = home.dateFormat(+string0[0], 'hh:mm');
	                var string01 = (datta0[i].endDateTime).match((/(\d)+/));
	                var end0 = home.dateFormat(+string01[0], 'hh:mm');
	                str += '<div class="part speak" id="' + datta[i].id + '"><img src="../bundle/img/details_03.png"><span class="title">开讲啦</span><p>您好:<span class="first_span">' + datta[i].userName + '</span>今天有课，快提醒他上课吧~</p><hr /><p  class="detailed"><span class="subject">' + datta[i].subject + '</span>（第<span  class="num">' + datta[i].extendNum + '</span>次)<span class="datatime">' + start0 + '</span>~<span class="datatime">' + end0 + '</span></p></div>'
	            }
	            $('.main').append(str);
	            for (var i = 0; i < length1; i++) {
	                homework.push(datta1[i].id);
	                var string1 = (datta1[i].dateTimes).match((/(\d)+/));
	                var start1 = home.dateFormat(+string1[0], 'yyyy:MM:dd:hh:mm');
	                var string11 = (datta1[i].endDateTime).match((/(\d)+/));
	                var end1 = home.dateFormat(+string11[0], 'yyyy:MM:dd:hh:mm');
	                str1 += '<div class="part homework" id="' + datta1[i].id + '"><img src="../bundle/img/details_06.jpg"><span class="title">快交作业啦</span><p>您好:<span class="first_span">' + datta1[i].userName + '</span>还有未交作业，快督促他交作业吧~</p><hr /><p  class="detailed"><span class="subject">' + datta1[i].subject + '</span>（第<span  class="num">' + datta1[i].extendNum + '</span>次)<span class="datatime">截止&nbsp;&nbsp明天&nbsp;' + end1 + '</span></span></p></div>'
	            }
	            $('.main').append(str1);
	            for (var i = 0; i < length2; i++) {
	                module.push(datta2[i].id);
	                var string2 = (datta2[i].dateTimes).match((/(\d)+/));
	                var start2 = home.dateFormat(+string2[0], 'hh:mm');
	                var string21 = (datta2[i].endDateTime).match((/(\d)+/));
	                var end2 = home.dateFormat(+string21[0], 'hh:mm');
	                str2 += '<div class="part module" id="' + datta2[i].id + '"><img src="../bundle/img/details_09.jpg"><span class="title">收到一份新学案</span><p>您好:老师发布了新学案，快提醒<span class="first_span">' + datta2[i].userName + '</span>预习吧</p><hr /><p  class="detailed"><span class="subject">' + datta2[i].subject + '</span>（第<span  class="num">' + datta2[i].extendNum + '</span>次)<span class="datatime">上课&nbsp;&nbsp&nbsp;<span class="time">' + end2 + '</span></span></p></div>'
	            }
	            ;
	            $('.main').append(str2);
	            for (var i = 0; i < length3; i++) {
	                newwork.push(datta3[i].id);
	                var string3 = (datta3[i].dateTimes).match((/(\d)+/));
	                var start3 = home.dateFormat(+string3[0], 'hh:mm');
	                var string31 = (datta3[i].endDateTime).match((/(\d)+/));
	                var end3 = home.dateFormat(+string31[0], 'hh:mm');
	                str3 += '<div class="part newwork" id="' + datta3[i].id + '"><img src="../bundle/img/details.jpg"><span class="title">收到一份新作业</span><p>您好:老师布置了新作业，快督促<span class="first_span">' + datta3[i].userName + '</span>作答吧~</p><hr /><p  class="detailed"><span class="subject">' + datta3[i].subject + '</span>（第<span  class="num">' + datta3[i].extendNum + '</span>次)<span class="datatime">截止&nbsp;&nbsp明天&nbsp;<span class="time">' + end3 + '</span></span></p></div>'
	            }
	            $('.main').append(str3);
	        },
	        error: function (xhr, type) {
	            alert('Ajax error!')
	        }
	    });
	    //书写一个得到url地址的函数
	    function geturl(oriurl,dom){
	        var  myidurl=$(dom).attr('id');
	        if(clas=='.speak'){//开讲了的页面的跳转
	            var oldurl=location.href;
	        }else if(clas=='.homework'){//交作业的跳转
	            var oldurl=location.href;
	        }else if(clas=='.module'){//跳转到学案的页面
	            var oldurl=location.href;
	        }else{//新作业的跳转
	            var oldurl=location.href;
	        }
	        var newurl=oldurl+'?id='+myidurl;
	        location.href=newurl;
	    }
	    var typestr = ['speak', 'homework', 'module', 'newwork'];
	    var typeval = [speak, homework, module, newwork];
	    console.log(typeval);
	    var typeclass = ['.speak', '.homework', '.module', '.newwork'];
	    //wsCache.set('detailsnums', 1, {exp : new Date('2016 5 28')});
	    //对作业处的信息进行设置
	
	    //clas代表选择器的类目typeclass
	    //val代表数组typeval
	    //str代表标识的变量typestr
	    function readed(clas, va, str) {
	         for (var i = 0; i < va.length; i++) {
	            //设置一个过期时间
	            wsCache.set('detailsnums', 1, {exp: new Date('2016 5 28')});
	            if (localStorage.getItem('detailsnums') == null){
	                $(clas).eq(i).children('.detailed').html('此信息已过期');
	            }
	        }
	        $(clas).click(function () {
	            //得到此时点击的元素的位置值
	            var num = $(this).index(clas);
	            //点击的时候跳转页面
	            geturl(clas,this);
	            //对work数组进行循环对当前点击的元素设置一个localStorage数值
	            for (var i = 0; i < va.length; i++) {
	                if (num == i) {
	                    localStorage.setItem(str + i, va[i]);
	                }
	            }
	            $(this).children('.detailed').html('此信息已被读取');
	        });
	        //循环便利所有的数值，如果点击之后将信息设置成已读
	        for (var i = 0; i < va.length; i++) {
	             //得到元素的id
	            var myId=$(clas).eq(i).attr('id');
	           if (myId==localStorage.getItem(str + i)) {
	                $(clas).eq(i).children('.detailed').html('此信息已被读取');
	            }
	        }
	    }
	    //循环的便利上面的函数
	    for (var i = 0; i < 4; i++) {
	        readed(typeclass[i], typeval[i], typestr[i]);
	    }
	
	});
	
	
	
	


/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 web-storage-cache -- Added `expires` attribute and serialize data with `JSON.parse` for the localStorage and sessionStorage.
	 Version 1.0.0
	 https://github.com/WQTeam/web-storage-cache
	 (c) 2013-2016 WQTeam, MIT license
	 */
	!function(a,b){ true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (b), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=b():a.WebStorageCache=b()}(this,function(){"use strict";function a(a,b){for(var c in b)a[c]=b[c];return a}function b(a){var b=!1;if(a&&a.setItem){b=!0;var c="__"+Math.round(1e7*Math.random());try{a.setItem(c,c),a.removeItem(c)}catch(d){b=!1}}return b}function c(a){var b=typeof a;return"string"===b&&window[a]instanceof Storage?window[a]:a}function d(a){return"[object Date]"===Object.prototype.toString.call(a)&&!isNaN(a.getTime())}function e(a,b){if(b=b||new Date,"number"==typeof a?a=a===1/0?l:new Date(b.getTime()+1e3*a):"string"==typeof a&&(a=new Date(a)),a&&!d(a))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return a}function f(a){var b=!1;if(a)if(a.code)switch(a.code){case 22:b=!0;break;case 1014:"NS_ERROR_DOM_QUOTA_REACHED"===a.name&&(b=!0)}else-2147024882===a.number&&(b=!0);return b}function g(a,b){this.c=(new Date).getTime(),b=b||l;var c=e(b);this.e=c.getTime(),this.v=a}function h(a){return a&&"c"in a&&"e"in a&&"v"in a?!0:!1}function i(a){var b=(new Date).getTime();return b<a.e}function j(a){return"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a)),a}function k(d){var e={storage:"localStorage",exp:1/0},f=a(e,d),g=c(f.storage),h=b(g);this.isSupported=function(){return h},h?(this.storage=g,this.quotaExceedHandler=function(a,b,c){if(console.warn("Quota exceeded!"),c&&c.force===!0){var d=this.deleteAllExpires();console.warn("delete all expires CacheItem : ["+d+"] and try execute `set` method again!");try{c.force=!1,this.set(a,b,c)}catch(e){console.warn(e)}}}):a(this,n)}var l=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),m={serialize:function(a){return JSON.stringify(a)},deserialize:function(a){return a&&JSON.parse(a)}},n={set:function(){},get:function(){},"delete":function(){},deleteAllExpires:function(){},clear:function(){},add:function(){},replace:function(){},touch:function(){}},o={set:function(b,c,d){if(b=j(b),d=a({force:!0},d),void 0===c)return this["delete"](b);var e=m.serialize(c),h=new g(e,d.exp);try{this.storage.setItem(b,m.serialize(h))}catch(i){f(i)?this.quotaExceedHandler(b,e,d,i):console.error(i)}return c},get:function(a){a=j(a);var b=null;try{b=m.deserialize(this.storage.getItem(a))}catch(c){return null}if(h(b)){if(i(b)){var d=b.v;return m.deserialize(d)}this["delete"](a)}return null},"delete":function(a){return a=j(a),this.storage.removeItem(a),a},deleteAllExpires:function(){for(var a=this.storage.length,b=[],c=this,d=0;a>d;d++){var e=this.storage.key(d),f=null;try{f=m.deserialize(this.storage.getItem(e))}catch(g){}if(null!==f&&void 0!==f.e){var h=(new Date).getTime();h>=f.e&&b.push(e)}}return b.forEach(function(a){c["delete"](a)}),b},clear:function(){this.storage.clear()},add:function(b,c,d){b=j(b),d=a({force:!0},d);try{var e=m.deserialize(this.storage.getItem(b));if(!h(e)||!i(e))return this.set(b,c,d),!0}catch(f){return this.set(b,c,d),!0}return!1},replace:function(a,b,c){a=j(a);var d=null;try{d=m.deserialize(this.storage.getItem(a))}catch(e){return!1}if(h(d)){if(i(d))return this.set(a,b,c),!0;this["delete"](a)}return!1},touch:function(a,b){a=j(a);var c=null;try{c=m.deserialize(this.storage.getItem(a))}catch(d){return!1}if(h(c)){if(i(c))return this.set(a,this.get(a),{exp:b}),!0;this["delete"](a)}return!1}};return k.prototype=o,k});

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzJhMTc3MDI4NjBjODg0YTcxNTc/ODUyNCoqKioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL3V0aWwvdXRpbC5qcz8yMjIxKioqKioqKioqKioqIiwid2VicGFjazovLy8uL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzPzg5NjYqKioqKioqKioqIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanM/ZGEwNCoqKioqIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcz9iOTgwKioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9uby1kYXRhL25vLWRhdGEuanM/MWYwOSoqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbm8tZGF0YS90cGwvbm8tZGF0YS10cGwudHBsPzBhYzYqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvY3NzL25vLWRhdGEuY3NzP2I2MzIqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2Nzcy9uby1kYXRhLmNzcz9hODE1KioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2ltZy9uby1kYXRhLnBuZz9jZDRlKioiLCJ3ZWJwYWNrOi8vLy4vanMvdG9kYXktc3R1ZHkuanMiLCJ3ZWJwYWNrOi8vLy4vZGVwL3dlYi1zdG9yYWdlLWNhY2hlLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7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NEJBQTRCLFNBQVMsMkRBQTJELG9EQUFvRCw4QkFBOEIsMkZBQTJGLElBQUksMkJBQTJCLFNBQVMsa0JBQWtCLFlBQVksbURBQW1ELHNCQUFzQix5QkFBeUIseUJBQXlCLHlCQUF5QixJQUFJLGdCQUFnQixpQkFBaUIsc0JBQXNCLDhCQUE4QixtQkFBbUIsaUJBQWlCLHFCQUFxQixvQkFBb0IsSUFBSSxvQkFBb0IsZUFBZSxTQUFTLHdDQUF3QyxzQ0FBc0MsSUFBSSx1Q0FBdUMsU0FBUyx1REFBdUQsU0FBUyxpQkFBaUIsT0FBTyxXQUFXLElBQUkseUNBQXlDLFNBQVMsWUFBWSxTQUFTLFNBQVMsVUFBVSx3QkFBd0Isa0JBQWtCLFlBQVksc0JBQXNCLDJDQUEyQyw2QkFBNkIsOENBQThDLElBQUksS0FBSyxpQ0FBaUMsSUFBSSx5Q0FBeUMsVUFBVSwyQkFBMkIsMkJBQTJCLG1CQUFtQiw2QkFBNkIsZUFBZSxJQUFJLGtCQUFrQixxQkFBcUIscUJBQXFCLFlBQVksU0FBUyxJQUFJLElBQUksNkNBQTZDLDBDQUEwQyxTQUFTLDBCQUEwQixTQUFTLHlCQUF5QixPQUFPLFdBQVcsSUFBSSx5Q0FBeUMsU0FBUyxTQUFTLFNBQVMsa0NBQWtDLGtCQUFrQixTQUFTLHFCQUFxQixPQUFPLFdBQVcsSUFBSSx5Q0FBeUMsU0FBUyxTQUFTLFNBQVMsdUNBQXVDLE1BQU0sS0FBSyxrQkFBa0IsV0FBVyx1QkFBdUIsRSIsImZpbGUiOiJ0b2RheS1zdHVkeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9tZmctd2VjaGF0L2J1bmRsZS9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDcyYTE3NzAyODYwYzg4NGE3MTU3XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzIwLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgICAgIHNjcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkSGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcclxuICAgICAgICB2YXIgY0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICBpZiAoc1RvcCArIGNIZWlnaHQgPT0gZEhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIGdldFN1YmplY3ROYW1lOmZ1bmN0aW9uKGlkKXtcclxuICAgICAgICB2YXIgbmFtZT0nJztcclxuICAgICAgICBzd2l0Y2ggKGlkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlICcwMSc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfor63mlocnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzAyJzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+aVsOWtpic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDMnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n6Iux6K+tJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwNCc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfniannkIYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA1JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+WMluWtpic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDYnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n5pS/5rK7JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwNyc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfljoblj7InO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA4JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+WcsOeQhic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDknOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n55Sf54mpJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH0sXHJcbiAgICBnZXRTdGFnZVN0cjogZnVuY3Rpb24gKHN0YWdlSWQpIHtcclxuICAgICAgICB2YXIgc3RhZ2VJZFN0ciA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChzdGFnZUlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4XCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLlsI/lraZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY1wiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi5Yid5LitXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImdcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIumrmOS4rVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YWdlSWRTdHI7XHJcbiAgICB9LFxyXG4gICAgZ29fbWVudTpmdW5jdGlvbihjb25JZCl7XHJcbiAgICAgICAgdmFyIGNvbj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb25JZCk7XHJcbiAgICAgICAgdmFyIGltZz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVDb250cicpO1xyXG4gICAgICAgIGltZy5zcmM9Jy4uL2J1bmRsZS9pbWcvYm90dG9tLXl1YW4tc2hvdy5wbmcnO1xyXG4gICAgICAgIGNvbi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgIHZhciBtZW51Q29udHI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVDb250cicpO1xyXG4gICAgICAgIG1lbnVDb250ci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JyxtZW51Qm9keSxmYWxzZSk7XHJcbiAgICAgICAgZnVuY3Rpb24gbWVudUJvZHkoKXtcclxuICAgICAgICAgICAgdmFyIG1lbnVTaG93PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICBpZihtZW51U2hvdyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgdD1tZW51U2hvdy5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiggdCA9PSAnZGlzcGxheTogbm9uZTsnKXtcclxuICAgICAgICAgICAgICAgICAgICBtZW51U2hvdy5zdHlsZS5kaXNwbGF5PSdibG9jayc7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYz1cIi4uL2J1bmRsZS9pbWcvbWVudTIucG5nXCI7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtZW51U2hvdy5zdHlsZS5kaXNwbGF5PSdub25lJztcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPVwiLi4vYnVuZGxlL2ltZy9ib3R0b20teXVhbi1zaG93LnBuZ1wiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdmFyIHNob3c9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnaWQnLCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuaW5uZXJIVE1MPSc8YSBocmVmPVwiYWZ0ZXJjbGFzc2pvYi5odG1sXCIgY2xhc3M9XCJrdHhhXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3h1ZWFuLnBuZ1wiLz48L2E+PGEgaHJlZj1cIndyb25nLWdhdGhlci5odG1sXCIgY2xhc3M9XCJreGpsXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppamluLnBuZ1wiPC9hPjxhIGhyZWY9XCJob21ld29yay1saXN0Lmh0bWxcIiAgY2xhc3M9XCJjdGpqXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppbHUucG5nXCI+PC9hPjxhIGhyZWY9XCJtb250aHdlYWsuaHRtbFwiIGNsYXNzPVwibXlyeFwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9ydW94aWFuZy5wbmdcIj48L2E+JztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdvX3N0dWR5X3Nob3c6ZnVuY3Rpb24oaW1nbG9nbyxzaG93aWQpe1xyXG4gICAgICAgICAgIHZhciBuPTE7XHJcbiAgICAgICAgICAgICQoaW1nbG9nbykucGFyZW50KFwiaDNcIikub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKG4gJTIgIT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAkKGltZ2xvZ28pLmF0dHIoXCJzcmNcIixcIi4uL2ltZy9idG0ucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoc2hvd2lkKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykuYXR0cihcInNyY1wiLFwiLi4vaW1nL3RvcC1qaWFudG91LnBuZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHNob3dpZCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICB9KX0sXHJcblxyXG4gICAgc2hvd0NvbmZpcm06ZnVuY3Rpb24obXNnLGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsYXllcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxheWVyLmNsYXNzTmFtZT1cImxheWVyXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsYXllcik7XHJcbiAgICAgICAgdmFyIGNvbmZpcm09JzxkaXYgY2xhc3M9XCJwb3Bjb25maXJtXCI+JztcclxuICAgICAgICBjb25maXJtKz0nPGRpdiBjbGFzcz1cInRpdGxlXCI+JztcclxuICAgICAgICBjb25maXJtKz0nPGkgY2xhc3M9XCJpY29uLWNsb3NlXCI+PC9pPic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8L2Rpdj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj4nK21zZysnIDwvZGl2Pic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8ZGl2IGNsYXNzPVwiZm9vdFwiPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgPGlucHV0IGNsYXNzPVwicG9wYnRuIGJ0bm9rIGNvbG9yLWdyZWVuXCIgdHlwZT1cImJ1dHRvblwiICB2YWx1ZT1cIuehruWumlwiLz4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgIDxpbnB1dCBjbGFzcz1cInBvcGJ0biBidG5jYW5jZWwgY29sb3ItZ3JlZW5cIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLlj5bmtohcIi8+JztcclxuICAgICAgICBjb25maXJtKz0nICAgPC9kaXY+PC9kaXY+JztcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGNvbmZpcm0pO1xyXG4gICAgICAgIC8vJCgnLnBvcGNvbmZpcm0nKS5jc3MoJ3RvcCcsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSQoJy5wb3Bjb25maXJtJykuaGVpZ2h0KCkpLzIpO1xyXG4gICAgICAgICQoXCIuYnRub2tcIikudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICAgJChcIi5idG5va1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLmxheWVyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBvcGNvbmZpcm1cIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmJ0bmNhbmNlbCwuaWNvbi1jbG9zZVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLmxheWVyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBvcGNvbmZpcm1cIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/kv6Hmga/mj5DnpLrmoYZcclxuICAgIHNob3dQb3BNc2c6ZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgIHZhciBodG1sPSc8ZGl2IGNsYXNzPVwicG9wbXNnXCI+PGRpdiBjbGFzcz1cImNvbnRlbnRcIj4nK21zZysnPC9kaXY+PC9kaXY+JztcclxuICAgICAgICAkKCcucG9wbXNnJykucmVtb3ZlKCk7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChodG1sKTtcclxuICAgICAgICAkKCcucG9wbXNnJykuY3NzKCdsZWZ0JywoZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAgLSQoJy5wb3Btc2cnKS53aWR0aCgpKS8yKTtcclxuICAgICAgICAkKCcucG9wbXNnJykuY3NzKCd0b3AnLChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0kKCcucG9wbXNnJykuaGVpZ2h0KCkpLzIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXskKCcucG9wbXNnJykucmVtb3ZlKCk7fSwxMDAwKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluaOpeWPo3VybCDlpoLojrflj5ZvcGVuaWQgICBnZXRBcGlVcmwoJ0FjY291bnQvR2V0T3BlbklEJylcclxuICAgIGdldEFwaVVybDpmdW5jdGlvbihhY3Rpb24pe1xyXG4gICAgICAgIHZhciBiYXNldXJsPSdodHRwOi8vMTkyLjE2OC4xODAuMTU6ODk5OC8nO1xyXG4gICAgICAgIC8vdmFyIGJhc2V1cmw9J2h0dHA6Ly9sb2NhbGhvc3Q6NTQ0MS8nO1xyXG4gICAgICAgIHJldHVybiBiYXNldXJsK2FjdGlvbjtcclxuICAgIH0sXHJcbiAgICAvL+iwg+eUqGFwaeaIkOWKn+WQju+8jOWFiOiwg+eUqOatpOaWueazle+8jOWIpOaWreeUqOaIt+aYr+WQpuW3sue7j+e7keWumu+8jOiLpeacque7keWumu+8jOi3s+i9rOWIsOe7keWumumhtVxyXG4gICAgY2hlY2tCaW5kOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGlmKCFkYXRhLk9LKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZGF0YS5Db2RlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj1cImJpbmRpbmZvLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlk9wZW5JZFxyXG4gICAgZ2V0T3BlbklkOmZ1bmN0aW9uKGFwcGlkLGFwcHNlY3JldCxjb2RlKXtcclxudmFyIG9wZW5pZDtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGFzeW5jOmZhbHNlLFxyXG4gICAgICAgICAgICB1cmw6dGhpcy5nZXRBcGlVcmwoJ0FjY291bnQvR2V0T3BlbklEJyksXHJcbiAgICAgICAgICAgIC8vIGRhdGEgdG8gYmUgYWRkZWQgdG8gcXVlcnkgc3RyaW5nOlxyXG4gICAgICAgICAgICBkYXRhOiB7QXBwSUQ6YXBwaWQsQXBwU2VjcmV0OmFwcHNlY3JldCxDb2RlOmNvZGV9LFxyXG4gICAgICAgICAgICAvLyB0eXBlIG9mIGRhdGEgd2UgYXJlIGV4cGVjdGluZyBpbiByZXR1cm46XHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIC8vdGltZW91dDogMzAwLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5PSylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuaWQ9ZGF0YS5JRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnQWpheCBlcnJvciEnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gb3BlbmlkO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+WdXJs5Y+C5pWwXHJcbiAgICBnZXRRdWVyeVN0cmluZzpmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoXnwmKVwiICsgbmFtZSArIFwiPShbXiZdKikoJnwkKVwiLCBcImlcIik7XHJcbiAgICB2YXIgciA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLm1hdGNoKHJlZyk7XHJcbiAgICBpZiAociAhPSBudWxsKSByZXR1cm4gdW5lc2NhcGUoZGVjb2RlVVJJKHJbMl0pKTsgcmV0dXJuIG51bGw7XHJcbn0sXHJcblxyXG4gICAgZGF0ZUZvcm1hdDogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0KXtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHZhciBtYXAgPSB7XHJcbiAgICAgICAgICAgIFwiWVwiOiBkYXRlLmdldFllYXIoKSxcclxuICAgICAgICAgICAgXCJNXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9XHJcbiAgICAgICAgICAgIFwiZFwiOiBkYXRlLmdldERhdGUoKSwgLy/ml6VcclxuICAgICAgICAgICAgXCJoXCI6IGRhdGUuZ2V0SG91cnMoKSwgLy/lsI/ml7ZcclxuICAgICAgICAgICAgXCJtXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhlxyXG4gICAgICAgICAgICBcInNcIjogZGF0ZS5nZXRTZWNvbmRzKCksIC8v56eSXHJcbiAgICAgICAgICAgIFwicVwiOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6plxyXG4gICAgICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enklxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoLyhbeU1kaG1zcVNdKSsvZywgZnVuY3Rpb24gKGFsbCwgdCkge1xyXG4gICAgICAgICAgICB2YXIgdiA9IG1hcFt0XTtcclxuICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFsbC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdiA9ICcwJyArIHY7XHJcbiAgICAgICAgICAgICAgICAgICAgdiA9IHYuc3Vic3RyKHYubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0ID09PSAneScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gYWxsLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFsbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgfSxcclxuICAgIC8v5aSE55CG6K+V6aKY5YWs5byPIG1hdGhqYXhcclxuICAgIGluaXRNYXRoSmF4T2JqOmZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIE1hdGhKYXguSHViLlF1ZXVlKFtcIlR5cGVzZXRcIiwgTWF0aEpheC5IdWIsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKV0pO1xyXG4gICAgfSxcclxuICAgIGdldExvY2FsVGltZTogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KHZhbC5yZXBsYWNlKFwiL0RhdGUoXCIsIFwiXCIpLnJlcGxhY2UoXCIpL1wiLCBcIlwiKSwgMTApKTtcclxuICAgICAgICAgICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEgPCAxMCA/IFwiMFwiICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gZGF0ZS5nZXREYXRlKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0SG91cnMoKSA6IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgdmFyIG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpIDogZGF0ZS5nZXRNaW51dGVzKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geWVhciArIFwiLVwiICsgbW9udGggKyBcIi1cIiArIGN1cnJlbnREYXRlICsgXCIgXCIgKyBob3VycyArIFwiOlwiICsgbWludXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL3V0aWwvdXRpbC5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDcgOSAxMCAxMSAxMiAxMyAxNCAxNSAxNyAxOCAxOSAyMFxuICoqLyIsIi8qVE1PREpTOnt9Ki9cclxuIWZ1bmN0aW9uICgpIHtcclxuXHRmdW5jdGlvbiBhKGEsIGIpIHtcclxuXHRcdHJldHVybiAoL3N0cmluZ3xmdW5jdGlvbi8udGVzdCh0eXBlb2YgYikgPyBoIDogZykoYSwgYilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGIoYSwgYykge1xyXG5cdFx0cmV0dXJuIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEgJiYgKGMgPSB0eXBlb2YgYSwgXCJudW1iZXJcIiA9PT0gYyA/IGEgKz0gXCJcIiA6IGEgPSBcImZ1bmN0aW9uXCIgPT09IGMgPyBiKGEuY2FsbChhKSkgOiBcIlwiKSwgYVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYyhhKSB7XHJcblx0XHRyZXR1cm4gbFthXVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZChhKSB7XHJcblx0XHRyZXR1cm4gYihhKS5yZXBsYWNlKC8mKD8hW1xcdyNdKzspfFs8PlwiJ10vZywgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGUoYSwgYikge1xyXG5cdFx0aWYgKG0oYSkpZm9yICh2YXIgYyA9IDAsIGQgPSBhLmxlbmd0aDsgZCA+IGM7IGMrKyliLmNhbGwoYSwgYVtjXSwgYywgYSk7IGVsc2UgZm9yIChjIGluIGEpYi5jYWxsKGEsIGFbY10sIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmKGEsIGIpIHtcclxuXHRcdHZhciBjID0gLyhcXC8pW15cXC9dK1xcMVxcLlxcLlxcMS8sIGQgPSAoXCIuL1wiICsgYSkucmVwbGFjZSgvW15cXC9dKyQvLCBcIlwiKSwgZSA9IGQgKyBiO1xyXG5cdFx0Zm9yIChlID0gZS5yZXBsYWNlKC9cXC9cXC5cXC8vZywgXCIvXCIpOyBlLm1hdGNoKGMpOyllID0gZS5yZXBsYWNlKGMsIFwiL1wiKTtcclxuXHRcdHJldHVybiBlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnKGIsIGMpIHtcclxuXHRcdHZhciBkID0gYS5nZXQoYikgfHwgaSh7ZmlsZW5hbWU6IGIsIG5hbWU6IFwiUmVuZGVyIEVycm9yXCIsIG1lc3NhZ2U6IFwiVGVtcGxhdGUgbm90IGZvdW5kXCJ9KTtcclxuXHRcdHJldHVybiBjID8gZChjKSA6IGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGgoYSwgYikge1xyXG5cdFx0aWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGIpIHtcclxuXHRcdFx0dmFyIGMgPSBiO1xyXG5cdFx0XHRiID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgayhjKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR2YXIgZCA9IGpbYV0gPSBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgYihjLCBhKSArIFwiXCJcclxuXHRcdFx0fSBjYXRjaCAoZCkge1xyXG5cdFx0XHRcdHJldHVybiBpKGQpKClcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBkLnByb3RvdHlwZSA9IGIucHJvdG90eXBlID0gbiwgZC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGIgKyBcIlwiXHJcblx0XHR9LCBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpKGEpIHtcclxuXHRcdHZhciBiID0gXCJ7VGVtcGxhdGUgRXJyb3J9XCIsIGMgPSBhLnN0YWNrIHx8IFwiXCI7XHJcblx0XHRpZiAoYyljID0gYy5zcGxpdChcIlxcblwiKS5zbGljZSgwLCAyKS5qb2luKFwiXFxuXCIpOyBlbHNlIGZvciAodmFyIGQgaW4gYSljICs9IFwiPFwiICsgZCArIFwiPlxcblwiICsgYVtkXSArIFwiXFxuXFxuXCI7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJvYmplY3RcIiA9PSB0eXBlb2YgY29uc29sZSAmJiBjb25zb2xlLmVycm9yKGIgKyBcIlxcblxcblwiICsgYyksIGJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBqID0gYS5jYWNoZSA9IHt9LCBrID0gdGhpcy5TdHJpbmcsIGwgPSB7XHJcblx0XHRcIjxcIjogXCImIzYwO1wiLFxyXG5cdFx0XCI+XCI6IFwiJiM2MjtcIixcclxuXHRcdCdcIic6IFwiJiMzNDtcIixcclxuXHRcdFwiJ1wiOiBcIiYjMzk7XCIsXHJcblx0XHRcIiZcIjogXCImIzM4O1wiXHJcblx0fSwgbSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGEpIHtcclxuXHRcdFx0cmV0dXJuIFwiW29iamVjdCBBcnJheV1cIiA9PT0ge30udG9TdHJpbmcuY2FsbChhKVxyXG5cdFx0fSwgbiA9IGEudXRpbHMgPSB7XHJcblx0XHQkaGVscGVyczoge30sICRpbmNsdWRlOiBmdW5jdGlvbiAoYSwgYiwgYykge1xyXG5cdFx0XHRyZXR1cm4gYSA9IGYoYywgYSksIGcoYSwgYilcclxuXHRcdH0sICRzdHJpbmc6IGIsICRlc2NhcGU6IGQsICRlYWNoOiBlXHJcblx0fSwgbyA9IGEuaGVscGVycyA9IG4uJGhlbHBlcnM7XHJcblx0YS5nZXQgPSBmdW5jdGlvbiAoYSkge1xyXG5cdFx0cmV0dXJuIGpbYS5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIildXHJcblx0fSwgYS5oZWxwZXIgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0b1thXSA9IGJcclxuXHR9LCBtb2R1bGUuZXhwb3J0cyA9IGFcclxufSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNCA1IDkgMTAgMTIgMTMgMTUgMTYgMTcgMTlcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDMgNCAxMCAxMyAxNiAxNyAxOVxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgMyA0IDEwIDEzIDE2IDE3IDE5XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzI2LlxyXG4gKi9cclxudmFyIG5vRGF0YVRwbCA9IHJlcXVpcmUoJ25vLWRhdGEtdHBsJyk7XHJcbnJlcXVpcmUoJy4vY3NzL25vLWRhdGEuY3NzJyk7XHJcblxyXG52YXIgXyRlbDtcclxudmFyIG5vRGF0YSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKG1zZyl7XHJcbiAgICAgICAgdmFyIHA9e21zZzptc2d9XHJcbiAgICAgICAgXyRlbC5odG1sKG5vRGF0YVRwbChwKSk7XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZG9tLG1zZyl7XHJcbiAgICAgICAgXyRlbCA9ICQoXCIuXCIgKyBkb20pO1xyXG4gICAgICAgIG5vRGF0YS5pbml0KG1zZyk7XHJcbiAgICB9LFxyXG5cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9uby1kYXRhL25vLWRhdGEuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDQgMTAgMTcgMTlcbiAqKi8iLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnZGVwL2NvbXBvbmVudC9uby1kYXRhL3RwbC9uby1kYXRhLXRwbCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZXNjYXBlPSR1dGlscy4kZXNjYXBlLG1zZz0kZGF0YS5tc2csJG91dD0nJzskb3V0Kz0nPGRpdiBjbGFzcz1cIm5vLWRhdGEtYmdcIj48L2Rpdj4gPGRpdiBjbGFzcz1cIm5vLWRhdGEtdGlwIGZvbnQtc2l6ZTEyXCI+JztcbiRvdXQrPSRlc2NhcGUobXNnIHx8ICfmmoLml6DmlbDmja4nKTtcbiRvdXQrPSc8L2Rpdj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9uby1kYXRhL3RwbC9uby1kYXRhLXRwbC50cGxcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDQgMTAgMTcgMTlcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25vLWRhdGEuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25vLWRhdGEuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbm8tZGF0YS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L25vLWRhdGEvY3NzL25vLWRhdGEuY3NzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA0IDEwIDE3IDE5XG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubm8tZGF0YS1iZ3tcXHJcXG4gICAgbWFyZ2luOiA0NyUgYXV0byA1JTtcXHJcXG4gICAgaGVpZ2h0OiA1N3B4O1xcclxcbiAgICB3aWR0aDogNThweDtcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ltZy9uby1kYXRhLnBuZ1wiKSArIFwiKSBjZW50ZXIgY2VudGVyIG5vLXJlcGVhdDtcXHJcXG59XFxyXFxuLm5vLWRhdGEtdGlwe1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGNvbG9yOiAjOTk5OTk5O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2Nzcy9uby1kYXRhLmNzc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgNCAxMCAxNyAxOVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURrQUFBQTZDQVlBQUFBS2pQRXJBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQTRCcFZGaDBXRTFNT21OdmJTNWhaRzlpWlM1NGJYQUFBQUFBQUR3L2VIQmhZMnRsZENCaVpXZHBiajBpNzd1L0lpQnBaRDBpVnpWTk1FMXdRMlZvYVVoNmNtVlRlazVVWTNwcll6bGtJajgrSUR4NE9uaHRjRzFsZEdFZ2VHMXNibk02ZUQwaVlXUnZZbVU2Ym5NNmJXVjBZUzhpSUhnNmVHMXdkR3M5SWtGa2IySmxJRmhOVUNCRGIzSmxJRFV1TXkxak1ERXhJRFkyTGpFME5UWTJNU3dnTWpBeE1pOHdNaTh3TmkweE5EbzFOam95TnlBZ0lDQWdJQ0FnSWo0Z1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNGdQSEprWmpwRVpYTmpjbWx3ZEdsdmJpQnlaR1k2WVdKdmRYUTlJaUlnZUcxc2JuTTZlRzF3VFUwOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOXRiUzhpSUhodGJHNXpPbk4wVW1WbVBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZjMVI1Y0dVdlVtVnpiM1Z5WTJWU1pXWWpJaUI0Yld4dWN6cDRiWEE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM4aUlIaHRjRTFOT2s5eWFXZHBibUZzUkc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRwaFlXTmhNemd5WkMwM1pUZG1MVFJsTURNdFlXUXdNeTFsWVRKa1kyVXhOakZoTVdRaUlIaHRjRTFOT2tSdlkzVnRaVzUwU1VROUluaHRjQzVrYVdRNlJUVkdOalZFUWpZeU16STRNVEZGTmpsRlJEVTRPRUl4TVRnM09EZERORFlpSUhodGNFMU5Pa2x1YzNSaGJtTmxTVVE5SW5odGNDNXBhV1E2UlRWR05qVkVRalV5TXpJNE1URkZOamxGUkRVNE9FSXhNVGczT0RkRE5EWWlJSGh0Y0RwRGNtVmhkRzl5Vkc5dmJEMGlRV1J2WW1VZ1VHaHZkRzl6YUc5d0lFTlROaUFvVjJsdVpHOTNjeWtpUGlBOGVHMXdUVTA2UkdWeWFYWmxaRVp5YjIwZ2MzUlNaV1k2YVc1emRHRnVZMlZKUkQwaWVHMXdMbWxwWkRvek56TTRaRFJpTWkxa09ERTBMVFE1TlRVdFlqY3hOQzB6T0dNMk1qYzBZak5sT1RZaUlITjBVbVZtT21SdlkzVnRaVzUwU1VROUltRmtiMkpsT21SdlkybGtPbkJvYjNSdmMyaHZjRG8xTkRVMFlXVXlPQzAxWlRRd0xURXhOemt0T0RReFppMDRObVUwT1dRek9UZGtNV1FpTHo0Z1BDOXlaR1k2UkdWelkzSnBjSFJwYjI0K0lEd3ZjbVJtT2xKRVJqNGdQQzk0T25odGNHMWxkR0UrSUR3L2VIQmhZMnRsZENCbGJtUTlJbklpUHo1Rm15aUZBQUFGcUVsRVFWUjQydVJhVzBzclZ4VGVtZHhOWWpYeGlxTFZlRzFQQ3kyZWVvNjlTRzJMUGIvRFVCOExmV3hwb2RBKzlxR1BsdlRINkl1Z0lvcW9lQW1DaXFLSTFXcTg1V0xYTjJUQ251MWtjbkZ5Wm1zWHhERXp5Y3orOWxyclc5OWVPeTVXZ3NYajhlL3A4QXU5L0E2SEk4TnN0dnY3ZXljZGJ1ajFheXdXKzdQWTV4MGxBUHpCNC9IOEZvMUcvVjZ2bDhsaXQ3ZTNMSkZJWEtkU3FaOG5KaWIrcUJqazFOU1V3K2wwL2pNNE9QaU9UQUExdTd1N1kydHJhLzltTXBtNnljbkorMEtmY3hXNVQ1L0w1WEtJQUduMjJPbnBLVXVuMHdpZHFvT2hGR0UwRGhZT2g1bmI3YzZmcHdoVDN4UElBWHE3WGhGSXV2bXJVQ2lrUTNoMWRjVjJkblpZYjI4dmEyNXVab3FpVkIxa05wdGxSMGRIYkhOemszVjFkYkdhbXByOE5ZeVBRbmVrWXBBMGU5OEdnMEVkeUwyOVBUWTJOc2JhMjl2ZmFtaDJkM2V6am80T05qMDl6ZnI3Ky9Qbk1iNnpzN054K3ZmdlF0OVZpckRZNjBBZ29FdDJoTTdiQnFoWlcxdWIrbnlNUXpPTWo4WTVZdlk5eFlSMEF2VGxKcC9QcHd2VmxwWVdXOGtHejhjNE5BTmYwRGpyYWJ5aFNqdzU1UGY3VS95Sm01c2IxdFRVWkN0SVBCL2o0STI4aWRvOVhEWklJcFF2YW10cmd5TEl4c1pHVzBIaStTSklJcDhnbGJyUnNrSFNsOFpwaG5UWGs4bWtTdU4yR3A2UGNmQkc1T01ncDR5WERaSm8rd09lZEZCNEVmK29WM1lhbm84U3dwTVAzbE90ZkEvaXBXU1E5T0YzeVpOUU96clNzVHRVK1pEbHZZbGFUY0lBZWRsWGppZUhLYzUxTHJ1K3ZsYUx2d3htUkQ2b2wxUmVSa29HU1ZKcG5MN2tGMG1ub2FGQkdrOGFrSThYNHFWa2tGUjNQdWZ6VVNNZFdVQWFrWStaS0ZBTTh0RkxwTk5HTlZJNjB1R1lYd1hGazA5T0ZJU05SSUdSSno4U1JZQk1wRk9JZkhJc216WVNCWXFCQ1BpTTRqc2dLK21Za1ErSmw1Q1JLRkFNUWdFckQ2ZXNwR05HUGhUQ0VBWGZGQVZKK2ZpeHpLUlRqSHhJRkx4dkNwS1N0cFZtd3MwVERMb0FXSUhMUWpwbTVBTlJRT1V2U3pqNnpEejVDanBROUtKc3BHTkdQcWlYSkFwZUZ3UkozdnBhSkIwWmxsZmxrSStSS0ZDRW5zNm9tSTh5TEsvS0pCL1V5MDhOUVZJY3V5aHB1M2tSQUx1OHZKU09kRFNMUkNJUHdqVW5DaUtFSjJqa3lROTlQbDhLUFJTUmRQZzJvRXdHb2lFT2VlQk5FZ1ZZa1h6eUFDU1NsZUxaLzFSSWg4OUx2dWVURXdXNlRvSENrYzRiaW1mM1V5R2RJajBmWGFkQTRWWWVMK0g2cDBJNm1vRXZJRHNOUk1FTEhVaEswZ2l1aWJrbk0rbnd5a2NNMTV3b3lHaWlRUFBrTUtIUDhoK1VuWFNLa1EveGkwZGJrU2c1aWZRbG5ReUp5eXZadldoR1BnVGNSdzU2a3dkSnMvR1ZLQUlRNTdLVFRoSHl5WGNLRklwYmhaSzBuOThwZ2tINHlrNDZ2Q2pnaFRvTTJ4dlk1c0IyQnp3NVFMbVhFcmZnc1Bjb3FoOVpqWnhrZUo0Y2h3N0hTd1Z0UEZFRWFET0JiVHJaRFp2QVMwdExUS0NVZktlQW5EZEtHc0NGOXFQSFNQd3VMeStyREl1OVFSenRNS2l1dzhORGRTTldORFRZdHJhMlZLRFl1eFFOb2dEYkhTNGtwMGc2TUlDS1JxTnNmWDJkTFN3c3FDV0ZuejNROXREUWtEb0IxYktWbFJXMnVMakk2dXJxQ3BZeVhDT1BHVjRETHBxY0Z5NzZFeTcwb3dlY041b2hyY1RNenM2cU05elQwMk01d09Qall6V1NCZ1lHS3U1SzVIakdTVWNsWGNrTndNYWRuWjFzYm02dUtsN2MyTmhRVStheGJSZmluT3lqZnRXZ3NlLzUrYm5sSUpHSG9wYXVXQlU5OWdaZ3RmMzlmVXNCb254QmpQQmIrYmFDUkhMdjd1NWFubzlXZWRFeVQySlFWdjVvQ2ZlelVvZzhHaVFZRENTRWdWbGxCd2NIVEpTWnRvTFVRdGJLdkR3NU9XRkd0ZHRXa0FqWlJDSmhXYWhDaUZqNWN6Wkw3b1RRUXBkdmZuN2VVSDZWYWhjWEYyeG1ac2J5ZGF4bEd4d1FCaEQwcTZ1ckZlVVRKZ2ZMcGRiV1ZsWmZYeThuU0d6QUFDZ0dpenBYaVVHZjhuMWY2VUR5Ykd2WGlxV3FPU203L1Q5QWtsSjUxa0NCRHdDVFloUG91VmdPVnhJZ2Y5emUzcjU2YmtDQkI3aUFUK1hyZUR6K0hSMStSMTNISXZNNWhDaWFGL1Q2S1JhTC9mV2ZBQU1BK3BSTFAwUFNML01BQUFBQVNVVk9SSzVDWUlJPVwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9pbWcvbm8tZGF0YS5wbmdcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDQgMTAgMTcgMTlcbiAqKi8iLCIkKGZ1bmN0aW9uICgpIHtcclxuICAgLy8gYWxlcnQoJ+aXoOaVsOaNricpXHJcbiAgICB2YXIgV2ViU3RvcmFnZUNhY2hlID0gcmVxdWlyZSgnd2ViLXN0b3JhZ2UtY2FjaGUubWluLmpzJyk7XHJcbiAgICB2YXIgaG9tZSA9IHJlcXVpcmUoXCJ1dGlsL3V0aWxcIik7XHJcbiAgICB2YXIgbm9kZWRhdGE9cmVxdWlyZSgnY29tcG9uZW50L25vLWRhdGEvbm8tZGF0YS5qcycpO1xyXG4gICAgbm9kZWRhdGEuaW5pdCgnbWFpbicsJ+WvueS4jei1t++8jOaVsOaNruaaguaXtuacquWKoOi9vScpO1xyXG4gICAvLyBub2RlZGF0YS5tb2R1bGUuZXhwb3J0cy5pbml0KGRvbSwn55uu5YmN5peg5pWw5o2uJylcclxuICAgIC8v5byV5YWl5pe26Ze06K6+572u55qE5o+S5Lu2XHJcbiAgICAvLyB2YXIgV2ViU3RvcmFnZUNhY2hlID0gcmVxdWlyZSgnd2ViLXN0b3JhZ2UtY2FjaGUubWluLmpzJyk7XHJcblxyXG4gICAgdmFyIHRvZHl1cmwgPSBob21lLmdldEFwaVVybCgnSG9tZVNjaG9vbENvbnRhY3QvVG9kYXlTdHVkeVN0YXR1cy9HZXRUb2RheVN0dWR5U3RhdHVzTGlzdCcpO1xyXG4gICAgY29uc29sZS5sb2codG9keXVybCk7XHJcbiAgICAvL+W+l+aJk0FwcElE5ZKMb3BlbmlkXHJcbiAgICB2YXIgYXBwaWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhcHBpZCcpO1xyXG4gICAgdmFyIG9wZW5pZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ29wZW5pZCcpO1xyXG4gICAgY29uc29sZS5sb2coYXBwaWQpO1xyXG4gICAgY29uc29sZS5sb2cob3BlbmlkKTtcclxuICAgIHZhciB3c0NhY2hlID0gbmV3IFdlYlN0b3JhZ2VDYWNoZSh7XHJcbiAgICAgICAgc3RvcmFnZTogJ2xvY2FsU3RvcmFnZSdcclxuICAgIH0pO1xyXG4gICAgLy/kuablhpnmlbDnu4TlrZjlgqjlr7nlupTnsbvnmoRpZFxyXG4gICAgdmFyIHNwZWFrID0gW107XHJcbiAgICB2YXIgaG9tZXdvcmsgPSBbXTtcclxuICAgIHZhciBtb2R1bGUgPSBbXTtcclxuICAgIHZhciBuZXd3b3JrID0gW107XHJcbiAgIC8qIC8v5aOw5piO5LiA5Liq5pWw57uE5p2l5a2Y5YKo54K55Ye75pe25YCZ55qEaWTvvJtcclxuICAgIHZhciBjbGlja0lkPVtdOyovXHJcbiAgICAvL+ivt+axguaVsOaNrlxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgIHVybDogdG9keXVybCxcclxuICAgICAgICAvLyBkYXRhIHRvIGJlIGFkZGVkIHRvIHF1ZXJ5IHN0cmluZzpcclxuICAgICAgICBkYXRhOiB7QXBwSUQ6IGFwcGlkLCBvcGVuSUQ6IG9wZW5pZH0sXHJcbiAgICAgICAgLy8gdHlwZSBvZiBkYXRhIHdlIGFyZSBleHBlY3RpbmcgaW4gcmV0dXJuOlxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgLy90aW1lb3V0OiAzMDAsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YS5OKTtcclxuICAgICAgICAgICAgLy/lvIDor77mj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhID0gZGF0YS5OLkhhdmVDbGFzc0FsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/kuqTkvZzkuJrmj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhMSA9IGRhdGEuTi5TdWJtaXRIb21lV29ya0FsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/lrabmoYjmj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhMiA9IGRhdGEuTi5OZXdUZWFjaFBsYW5BbGVydExpc3Q7XHJcbiAgICAgICAgICAgIC8v5paw5L2c5Lia5o+Q6YaS55qE5pWw5o2uXHJcbiAgICAgICAgICAgIHZhciBkYXR0YTMgPSBkYXRhLk4uTmV3SG9tZVdvcmtBbGVydExpc3Q7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBkYXR0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGgxID0gZGF0dGExLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aDIgPSBkYXR0YTIubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgbGVuZ3RoMyA9IGRhdHRhMy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjEgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjIgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjMgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy/lsIZJZOWtmOWIsOaVsOe7hOmHjOmdolxyXG4gICAgICAgICAgICAgICAgc3BlYWsucHVzaChkYXR0YVtpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMCA9IChkYXR0YTBbaV0uZGF0ZVRpbWVzKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGFydDAgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzBbMF0sICdoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZzAxID0gKGRhdHRhMFtpXS5lbmREYXRlVGltZSkubWF0Y2goKC8oXFxkKSsvKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW5kMCA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMDFbMF0sICdoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgc3RyICs9ICc8ZGl2IGNsYXNzPVwicGFydCBzcGVha1wiIGlkPVwiJyArIGRhdHRhW2ldLmlkICsgJ1wiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9kZXRhaWxzXzAzLnBuZ1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj7lvIDorrLllaY8L3NwYW4+PHA+5oKo5aW9OjxzcGFuIGNsYXNzPVwiZmlyc3Rfc3BhblwiPicgKyBkYXR0YVtpXS51c2VyTmFtZSArICc8L3NwYW4+5LuK5aSp5pyJ6K++77yM5b+r5o+Q6YaS5LuW5LiK6K++5ZCnfjwvcD48aHIgLz48cCAgY2xhc3M9XCJkZXRhaWxlZFwiPjxzcGFuIGNsYXNzPVwic3ViamVjdFwiPicgKyBkYXR0YVtpXS5zdWJqZWN0ICsgJzwvc3Bhbj7vvIjnrKw8c3BhbiAgY2xhc3M9XCJudW1cIj4nICsgZGF0dGFbaV0uZXh0ZW5kTnVtICsgJzwvc3Bhbj7mrKEpPHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPicgKyBzdGFydDAgKyAnPC9zcGFuPn48c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+JyArIGVuZDAgKyAnPC9zcGFuPjwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGgxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbWV3b3JrLnB1c2goZGF0dGExW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcxID0gKGRhdHRhMVtpXS5kYXRlVGltZXMpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0MSA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMVswXSwgJ3l5eXk6TU06ZGQ6aGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcxMSA9IChkYXR0YTFbaV0uZW5kRGF0ZVRpbWUpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVuZDEgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzExWzBdLCAneXl5eTpNTTpkZDpoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgc3RyMSArPSAnPGRpdiBjbGFzcz1cInBhcnQgaG9tZXdvcmtcIiBpZD1cIicgKyBkYXR0YTFbaV0uaWQgKyAnXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2RldGFpbHNfMDYuanBnXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPuW/q+S6pOS9nOS4muWVpjwvc3Bhbj48cD7mgqjlpb06PHNwYW4gY2xhc3M9XCJmaXJzdF9zcGFuXCI+JyArIGRhdHRhMVtpXS51c2VyTmFtZSArICc8L3NwYW4+6L+Y5pyJ5pyq5Lqk5L2c5Lia77yM5b+r552j5L+D5LuW5Lqk5L2c5Lia5ZCnfjwvcD48aHIgLz48cCAgY2xhc3M9XCJkZXRhaWxlZFwiPjxzcGFuIGNsYXNzPVwic3ViamVjdFwiPicgKyBkYXR0YTFbaV0uc3ViamVjdCArICc8L3NwYW4+77yI56ysPHNwYW4gIGNsYXNzPVwibnVtXCI+JyArIGRhdHRhMVtpXS5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+5oiq5q2iJm5ic3A7Jm5ic3DmmI7lpKkmbmJzcDsnICsgZW5kMSArICc8L3NwYW4+PC9zcGFuPjwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyMSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBtb2R1bGUucHVzaChkYXR0YTJbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZzIgPSAoZGF0dGEyW2ldLmRhdGVUaW1lcykubWF0Y2goKC8oXFxkKSsvKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQyID0gaG9tZS5kYXRlRm9ybWF0KCtzdHJpbmcyWzBdLCAnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcyMSA9IChkYXR0YTJbaV0uZW5kRGF0ZVRpbWUpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVuZDIgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzIxWzBdLCAnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHN0cjIgKz0gJzxkaXYgY2xhc3M9XCJwYXJ0IG1vZHVsZVwiIGlkPVwiJyArIGRhdHRhMltpXS5pZCArICdcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlsc18wOS5qcGdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5pS25Yiw5LiA5Lu95paw5a2m5qGIPC9zcGFuPjxwPuaCqOWlvTrogIHluIjlj5HluIPkuobmlrDlrabmoYjvvIzlv6vmj5DphpI8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICsgZGF0dGEyW2ldLnVzZXJOYW1lICsgJzwvc3Bhbj7pooTkuaDlkKc8L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICsgZGF0dGEyW2ldLnN1YmplY3QgKyAnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgKyBkYXR0YTJbaV0uZXh0ZW5kTnVtICsgJzwvc3Bhbj7mrKEpPHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPuS4iuivviZuYnNwOyZuYnNwJm5ic3A7PHNwYW4gY2xhc3M9XCJ0aW1lXCI+JyArIGVuZDIgKyAnPC9zcGFuPjwvc3Bhbj48L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyMik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBuZXd3b3JrLnB1c2goZGF0dGEzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmczID0gKGRhdHRhM1tpXS5kYXRlVGltZXMpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0MyA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nM1swXSwgJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMzEgPSAoZGF0dGEzW2ldLmVuZERhdGVUaW1lKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHZhciBlbmQzID0gaG9tZS5kYXRlRm9ybWF0KCtzdHJpbmczMVswXSwgJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICBzdHIzICs9ICc8ZGl2IGNsYXNzPVwicGFydCBuZXd3b3JrXCIgaWQ9XCInICsgZGF0dGEzW2ldLmlkICsgJ1wiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9kZXRhaWxzLmpwZ1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj7mlLbliLDkuIDku73mlrDkvZzkuJo8L3NwYW4+PHA+5oKo5aW9OuiAgeW4iOW4g+e9ruS6huaWsOS9nOS4mu+8jOW/q+edo+S/gzxzcGFuIGNsYXNzPVwiZmlyc3Rfc3BhblwiPicgKyBkYXR0YTNbaV0udXNlck5hbWUgKyAnPC9zcGFuPuS9nOetlOWQp348L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICsgZGF0dGEzW2ldLnN1YmplY3QgKyAnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgKyBkYXR0YTNbaV0uZXh0ZW5kTnVtICsgJzwvc3Bhbj7mrKEpPHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPuaIquatoiZuYnNwOyZuYnNw5piO5aSpJm5ic3A7PHNwYW4gY2xhc3M9XCJ0aW1lXCI+JyArIGVuZDMgKyAnPC9zcGFuPjwvc3Bhbj48L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5tYWluJykuYXBwZW5kKHN0cjMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHR5cGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ0FqYXggZXJyb3IhJylcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8v5Lmm5YaZ5LiA5Liq5b6X5YiwdXJs5Zyw5Z2A55qE5Ye95pWwXHJcbiAgICBmdW5jdGlvbiBnZXR1cmwob3JpdXJsLGRvbSl7XHJcbiAgICAgICAgdmFyICBteWlkdXJsPSQoZG9tKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgIGlmKGNsYXM9PScuc3BlYWsnKXsvL+W8gOiusuS6hueahOmhtemdoueahOi3s+i9rFxyXG4gICAgICAgICAgICB2YXIgb2xkdXJsPWxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgfWVsc2UgaWYoY2xhcz09Jy5ob21ld29yaycpey8v5Lqk5L2c5Lia55qE6Lez6L2sXHJcbiAgICAgICAgICAgIHZhciBvbGR1cmw9bG9jYXRpb24uaHJlZjtcclxuICAgICAgICB9ZWxzZSBpZihjbGFzPT0nLm1vZHVsZScpey8v6Lez6L2s5Yiw5a2m5qGI55qE6aG16Z2iXHJcbiAgICAgICAgICAgIHZhciBvbGR1cmw9bG9jYXRpb24uaHJlZjtcclxuICAgICAgICB9ZWxzZXsvL+aWsOS9nOS4mueahOi3s+i9rFxyXG4gICAgICAgICAgICB2YXIgb2xkdXJsPWxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBuZXd1cmw9b2xkdXJsKyc/aWQ9JytteWlkdXJsO1xyXG4gICAgICAgIGxvY2F0aW9uLmhyZWY9bmV3dXJsO1xyXG4gICAgfVxyXG4gICAgdmFyIHR5cGVzdHIgPSBbJ3NwZWFrJywgJ2hvbWV3b3JrJywgJ21vZHVsZScsICduZXd3b3JrJ107XHJcbiAgICB2YXIgdHlwZXZhbCA9IFtzcGVhaywgaG9tZXdvcmssIG1vZHVsZSwgbmV3d29ya107XHJcbiAgICBjb25zb2xlLmxvZyh0eXBldmFsKTtcclxuICAgIHZhciB0eXBlY2xhc3MgPSBbJy5zcGVhaycsICcuaG9tZXdvcmsnLCAnLm1vZHVsZScsICcubmV3d29yayddO1xyXG4gICAgLy93c0NhY2hlLnNldCgnZGV0YWlsc251bXMnLCAxLCB7ZXhwIDogbmV3IERhdGUoJzIwMTYgNSAyOCcpfSk7XHJcbiAgICAvL+WvueS9nOS4muWkhOeahOS/oeaBr+i/m+ihjOiuvue9rlxyXG5cclxuICAgIC8vY2xhc+S7o+ihqOmAieaLqeWZqOeahOexu+ebrnR5cGVjbGFzc1xyXG4gICAgLy92YWzku6PooajmlbDnu4R0eXBldmFsXHJcbiAgICAvL3N0cuS7o+ihqOagh+ivhueahOWPmOmHj3R5cGVzdHJcclxuICAgIGZ1bmN0aW9uIHJlYWRlZChjbGFzLCB2YSwgc3RyKSB7XHJcbiAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy/orr7nva7kuIDkuKrov4fmnJ/ml7bpl7RcclxuICAgICAgICAgICAgd3NDYWNoZS5zZXQoJ2RldGFpbHNudW1zJywgMSwge2V4cDogbmV3IERhdGUoJzIwMTYgNSAyOCcpfSk7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGV0YWlsc251bXMnKSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICQoY2xhcykuZXEoaSkuY2hpbGRyZW4oJy5kZXRhaWxlZCcpLmh0bWwoJ+atpOS/oeaBr+W3sui/h+acnycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoY2xhcykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+W+l+WIsOatpOaXtueCueWHu+eahOWFg+e0oOeahOS9jee9ruWAvFxyXG4gICAgICAgICAgICB2YXIgbnVtID0gJCh0aGlzKS5pbmRleChjbGFzKTtcclxuICAgICAgICAgICAgLy/ngrnlh7vnmoTml7blgJnot7PovazpobXpnaJcclxuICAgICAgICAgICAgZ2V0dXJsKGNsYXMsdGhpcyk7XHJcbiAgICAgICAgICAgIC8v5a+5d29ya+aVsOe7hOi/m+ihjOW+queOr+WvueW9k+WJjeeCueWHu+eahOWFg+e0oOiuvue9ruS4gOS4qmxvY2FsU3RvcmFnZeaVsOWAvFxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVtID09IGkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdHIgKyBpLCB2YVtpXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbignLmRldGFpbGVkJykuaHRtbCgn5q2k5L+h5oGv5bey6KKr6K+75Y+WJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/lvqrnjq/kvr/liKnmiYDmnInnmoTmlbDlgLzvvIzlpoLmnpzngrnlh7vkuYvlkI7lsIbkv6Hmga/orr7nva7miJDlt7Lor7tcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAvL+W+l+WIsOWFg+e0oOeahGlkXHJcbiAgICAgICAgICAgIHZhciBteUlkPSQoY2xhcykuZXEoaSkuYXR0cignaWQnKTtcclxuICAgICAgICAgICBpZiAobXlJZD09bG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RyICsgaSkpIHtcclxuICAgICAgICAgICAgICAgICQoY2xhcykuZXEoaSkuY2hpbGRyZW4oJy5kZXRhaWxlZCcpLmh0bWwoJ+atpOS/oeaBr+W3suiiq+ivu+WPlicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy/lvqrnjq/nmoTkvr/liKnkuIrpnaLnmoTlh73mlbBcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgcmVhZGVkKHR5cGVjbGFzc1tpXSwgdHlwZXZhbFtpXSwgdHlwZXN0cltpXSk7XHJcbiAgICB9XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy90b2RheS1zdHVkeS5qc1xuICoqIG1vZHVsZSBpZCA9IDU1XG4gKiogbW9kdWxlIGNodW5rcyA9IDE3XG4gKiovIiwiLyohXHJcbiB3ZWItc3RvcmFnZS1jYWNoZSAtLSBBZGRlZCBgZXhwaXJlc2AgYXR0cmlidXRlIGFuZCBzZXJpYWxpemUgZGF0YSB3aXRoIGBKU09OLnBhcnNlYCBmb3IgdGhlIGxvY2FsU3RvcmFnZSBhbmQgc2Vzc2lvblN0b3JhZ2UuXHJcbiBWZXJzaW9uIDEuMC4wXHJcbiBodHRwczovL2dpdGh1Yi5jb20vV1FUZWFtL3dlYi1zdG9yYWdlLWNhY2hlXHJcbiAoYykgMjAxMy0yMDE2IFdRVGVhbSwgTUlUIGxpY2Vuc2VcclxuICovXHJcbiFmdW5jdGlvbihhLGIpe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoYik6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9YigpOmEuV2ViU3RvcmFnZUNhY2hlPWIoKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGEoYSxiKXtmb3IodmFyIGMgaW4gYilhW2NdPWJbY107cmV0dXJuIGF9ZnVuY3Rpb24gYihhKXt2YXIgYj0hMTtpZihhJiZhLnNldEl0ZW0pe2I9ITA7dmFyIGM9XCJfX1wiK01hdGgucm91bmQoMWU3Kk1hdGgucmFuZG9tKCkpO3RyeXthLnNldEl0ZW0oYyxjKSxhLnJlbW92ZUl0ZW0oYyl9Y2F0Y2goZCl7Yj0hMX19cmV0dXJuIGJ9ZnVuY3Rpb24gYyhhKXt2YXIgYj10eXBlb2YgYTtyZXR1cm5cInN0cmluZ1wiPT09YiYmd2luZG93W2FdaW5zdGFuY2VvZiBTdG9yYWdlP3dpbmRvd1thXTphfWZ1bmN0aW9uIGQoYSl7cmV0dXJuXCJbb2JqZWN0IERhdGVdXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSkmJiFpc05hTihhLmdldFRpbWUoKSl9ZnVuY3Rpb24gZShhLGIpe2lmKGI9Ynx8bmV3IERhdGUsXCJudW1iZXJcIj09dHlwZW9mIGE/YT1hPT09MS8wP2w6bmV3IERhdGUoYi5nZXRUaW1lKCkrMWUzKmEpOlwic3RyaW5nXCI9PXR5cGVvZiBhJiYoYT1uZXcgRGF0ZShhKSksYSYmIWQoYSkpdGhyb3cgbmV3IEVycm9yKFwiYGV4cGlyZXNgIHBhcmFtZXRlciBjYW5ub3QgYmUgY29udmVydGVkIHRvIGEgdmFsaWQgRGF0ZSBpbnN0YW5jZVwiKTtyZXR1cm4gYX1mdW5jdGlvbiBmKGEpe3ZhciBiPSExO2lmKGEpaWYoYS5jb2RlKXN3aXRjaChhLmNvZGUpe2Nhc2UgMjI6Yj0hMDticmVhaztjYXNlIDEwMTQ6XCJOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRFwiPT09YS5uYW1lJiYoYj0hMCl9ZWxzZS0yMTQ3MDI0ODgyPT09YS5udW1iZXImJihiPSEwKTtyZXR1cm4gYn1mdW5jdGlvbiBnKGEsYil7dGhpcy5jPShuZXcgRGF0ZSkuZ2V0VGltZSgpLGI9Ynx8bDt2YXIgYz1lKGIpO3RoaXMuZT1jLmdldFRpbWUoKSx0aGlzLnY9YX1mdW5jdGlvbiBoKGEpe3JldHVybiBhJiZcImNcImluIGEmJlwiZVwiaW4gYSYmXCJ2XCJpbiBhPyEwOiExfWZ1bmN0aW9uIGkoYSl7dmFyIGI9KG5ldyBEYXRlKS5nZXRUaW1lKCk7cmV0dXJuIGI8YS5lfWZ1bmN0aW9uIGooYSl7cmV0dXJuXCJzdHJpbmdcIiE9dHlwZW9mIGEmJihjb25zb2xlLndhcm4oYStcIiB1c2VkIGFzIGEga2V5LCBidXQgaXQgaXMgbm90IGEgc3RyaW5nLlwiKSxhPVN0cmluZyhhKSksYX1mdW5jdGlvbiBrKGQpe3ZhciBlPXtzdG9yYWdlOlwibG9jYWxTdG9yYWdlXCIsZXhwOjEvMH0sZj1hKGUsZCksZz1jKGYuc3RvcmFnZSksaD1iKGcpO3RoaXMuaXNTdXBwb3J0ZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gaH0saD8odGhpcy5zdG9yYWdlPWcsdGhpcy5xdW90YUV4Y2VlZEhhbmRsZXI9ZnVuY3Rpb24oYSxiLGMpe2lmKGNvbnNvbGUud2FybihcIlF1b3RhIGV4Y2VlZGVkIVwiKSxjJiZjLmZvcmNlPT09ITApe3ZhciBkPXRoaXMuZGVsZXRlQWxsRXhwaXJlcygpO2NvbnNvbGUud2FybihcImRlbGV0ZSBhbGwgZXhwaXJlcyBDYWNoZUl0ZW0gOiBbXCIrZCtcIl0gYW5kIHRyeSBleGVjdXRlIGBzZXRgIG1ldGhvZCBhZ2FpbiFcIik7dHJ5e2MuZm9yY2U9ITEsdGhpcy5zZXQoYSxiLGMpfWNhdGNoKGUpe2NvbnNvbGUud2FybihlKX19fSk6YSh0aGlzLG4pfXZhciBsPW5ldyBEYXRlKFwiRnJpLCAzMSBEZWMgOTk5OSAyMzo1OTo1OSBVVENcIiksbT17c2VyaWFsaXplOmZ1bmN0aW9uKGEpe3JldHVybiBKU09OLnN0cmluZ2lmeShhKX0sZGVzZXJpYWxpemU6ZnVuY3Rpb24oYSl7cmV0dXJuIGEmJkpTT04ucGFyc2UoYSl9fSxuPXtzZXQ6ZnVuY3Rpb24oKXt9LGdldDpmdW5jdGlvbigpe30sXCJkZWxldGVcIjpmdW5jdGlvbigpe30sZGVsZXRlQWxsRXhwaXJlczpmdW5jdGlvbigpe30sY2xlYXI6ZnVuY3Rpb24oKXt9LGFkZDpmdW5jdGlvbigpe30scmVwbGFjZTpmdW5jdGlvbigpe30sdG91Y2g6ZnVuY3Rpb24oKXt9fSxvPXtzZXQ6ZnVuY3Rpb24oYixjLGQpe2lmKGI9aihiKSxkPWEoe2ZvcmNlOiEwfSxkKSx2b2lkIDA9PT1jKXJldHVybiB0aGlzW1wiZGVsZXRlXCJdKGIpO3ZhciBlPW0uc2VyaWFsaXplKGMpLGg9bmV3IGcoZSxkLmV4cCk7dHJ5e3RoaXMuc3RvcmFnZS5zZXRJdGVtKGIsbS5zZXJpYWxpemUoaCkpfWNhdGNoKGkpe2YoaSk/dGhpcy5xdW90YUV4Y2VlZEhhbmRsZXIoYixlLGQsaSk6Y29uc29sZS5lcnJvcihpKX1yZXR1cm4gY30sZ2V0OmZ1bmN0aW9uKGEpe2E9aihhKTt2YXIgYj1udWxsO3RyeXtiPW0uZGVzZXJpYWxpemUodGhpcy5zdG9yYWdlLmdldEl0ZW0oYSkpfWNhdGNoKGMpe3JldHVybiBudWxsfWlmKGgoYikpe2lmKGkoYikpe3ZhciBkPWIudjtyZXR1cm4gbS5kZXNlcmlhbGl6ZShkKX10aGlzW1wiZGVsZXRlXCJdKGEpfXJldHVybiBudWxsfSxcImRlbGV0ZVwiOmZ1bmN0aW9uKGEpe3JldHVybiBhPWooYSksdGhpcy5zdG9yYWdlLnJlbW92ZUl0ZW0oYSksYX0sZGVsZXRlQWxsRXhwaXJlczpmdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLnN0b3JhZ2UubGVuZ3RoLGI9W10sYz10aGlzLGQ9MDthPmQ7ZCsrKXt2YXIgZT10aGlzLnN0b3JhZ2Uua2V5KGQpLGY9bnVsbDt0cnl7Zj1tLmRlc2VyaWFsaXplKHRoaXMuc3RvcmFnZS5nZXRJdGVtKGUpKX1jYXRjaChnKXt9aWYobnVsbCE9PWYmJnZvaWQgMCE9PWYuZSl7dmFyIGg9KG5ldyBEYXRlKS5nZXRUaW1lKCk7aD49Zi5lJiZiLnB1c2goZSl9fXJldHVybiBiLmZvckVhY2goZnVuY3Rpb24oYSl7Y1tcImRlbGV0ZVwiXShhKX0pLGJ9LGNsZWFyOmZ1bmN0aW9uKCl7dGhpcy5zdG9yYWdlLmNsZWFyKCl9LGFkZDpmdW5jdGlvbihiLGMsZCl7Yj1qKGIpLGQ9YSh7Zm9yY2U6ITB9LGQpO3RyeXt2YXIgZT1tLmRlc2VyaWFsaXplKHRoaXMuc3RvcmFnZS5nZXRJdGVtKGIpKTtpZighaChlKXx8IWkoZSkpcmV0dXJuIHRoaXMuc2V0KGIsYyxkKSwhMH1jYXRjaChmKXtyZXR1cm4gdGhpcy5zZXQoYixjLGQpLCEwfXJldHVybiExfSxyZXBsYWNlOmZ1bmN0aW9uKGEsYixjKXthPWooYSk7dmFyIGQ9bnVsbDt0cnl7ZD1tLmRlc2VyaWFsaXplKHRoaXMuc3RvcmFnZS5nZXRJdGVtKGEpKX1jYXRjaChlKXtyZXR1cm4hMX1pZihoKGQpKXtpZihpKGQpKXJldHVybiB0aGlzLnNldChhLGIsYyksITA7dGhpc1tcImRlbGV0ZVwiXShhKX1yZXR1cm4hMX0sdG91Y2g6ZnVuY3Rpb24oYSxiKXthPWooYSk7dmFyIGM9bnVsbDt0cnl7Yz1tLmRlc2VyaWFsaXplKHRoaXMuc3RvcmFnZS5nZXRJdGVtKGEpKX1jYXRjaChkKXtyZXR1cm4hMX1pZihoKGMpKXtpZihpKGMpKXJldHVybiB0aGlzLnNldChhLHRoaXMuZ2V0KGEpLHtleHA6Yn0pLCEwO3RoaXNbXCJkZWxldGVcIl0oYSl9cmV0dXJuITF9fTtyZXR1cm4gay5wcm90b3R5cGU9byxrfSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC93ZWItc3RvcmFnZS1jYWNoZS5taW4uanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAxN1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=