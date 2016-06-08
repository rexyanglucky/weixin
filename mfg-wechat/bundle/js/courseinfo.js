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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(36);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by humorHan on 2016/5/20.
	 */
	module.exports={
	    scr: function () {
	        var scrollTop = $(window).scrollTop();
	        var scrollHeight = $(document).height();
	        var windowHeight = $(window).height();
	        if(scrollTop + windowHeight == scrollHeight){
	            return true;
	        }
	    },
	    getSubjectName:function(id){
	
	        var subjectIdStr = "";
	        switch (id) {
	            case "01":
	                subjectIdStr = "语文";
	                break;
	            case "02":
	                subjectIdStr = "数学";
	                break;
	            case "03":
	                subjectIdStr = "英语";
	                break;
	            case "04":
	                subjectIdStr = "物理";
	                break;
	            case "05":
	                subjectIdStr = "化学";
	                break;
	            case "06":
	                subjectIdStr = "地理";
	                break;
	            case "07":
	                subjectIdStr = "历史";
	                break;
	            case "08":
	                subjectIdStr = "政治";
	                break;
	            case "09":
	                subjectIdStr = "生物";
	                break;
	            case "14":
	                subjectIdStr = "奥数";
	                break;
	            default:
	                break;
	        }
	        return subjectIdStr;
	    },
	    getStageStr: function (stageId) {
	        if(!stageId)
	        {
	            subjectIdStr = "初中";
	            return subjectIdStr;
	        }
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
	                $(".study-show").hide();
	                if( t == 'display: none;'){
	                    $("#study-show1").show();
	                    menuShow.style.display='block';
	                    img.src="../bundle/img/menu2.png";
	                }else{
	                    menuShow.style.display='none';
	                    img.src="../bundle/img/bottom-yuan-show.png";
	                }
	            }else{
	                var show=document.createElement('div');
	                show.setAttribute('id','menuShow');
	                show.setAttribute('style','display:block;');
	                show.innerHTML='<a href="afterclassjob.html" class="ktxa"><img src="../bundle/img/xuean.png"/></a><a href="homework-list.html" class="kxjl"><img src="../bundle/img/jilu.png"</a><a href="wrong-gather.html"  class="ctjj"><img src="../bundle/img/jijin.png"></a><a href="monthweak.html" class="myrx"><img src="../bundle/img/ruoxiang.png"></a>';
	                document.body.appendChild(show);
	            }
	        }
	    },
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
	    showPopMsg:function (msg,type) {
	        var html="";
	        switch (type) {
	            case 1:
	                html='<div class="popmsg"><div class="content"><img style="width:22% " src="../bundle/img/login-sucess.png"><p>'+msg+'</p></div></div>';
	                break;
	            case 2:
	                html='<div class="popmsg"><div class="content"><img style="width:22% " src="../bundle/img/login-tanhao.png"><p>'+msg+'</p></div></div>';
	                break;
	            default:
	                html='<div class="popmsg"><div class="content"><p>'+msg+'</p></div></div>';
	                break;
	        }
	        //var html='<div class="popmsg"><div class="content"><img src="../bundle/img/login-sucess.png"><p>'+msg+'</p></div></div>';
	        $('.popmsg').remove();
	        $('body').append(html);
	        $('.popmsg').css('left',(document.body.clientWidth  -$('.popmsg').width())/2);
	        $('.popmsg').css('top',(document.documentElement.clientHeight -$('.popmsg').height())/2);
	        setTimeout(function(){$('.popmsg').remove();},1000);
	    },
	    //获取接口url 如获取openid   getApiUrl('Account/GetOpenID')
	    getApiUrl:function(action){
	        //线下测试
	       //var baseurl='http://192.168.180.15:8998/';
	        //线上测试
	       var baseurl='http://192.168.180.15:8997/';
	       // var baseurl='http://localhost:46951/';
	        return baseurl+action;
	    },
	    //调用api成功后，先调用此方法，判断用户是否已经绑定，若未绑定，跳转到绑定页
	    checkBind:function(data){
	        if(!data.OK) {
	            if (data.Code == 1 || data.Code == 2 || data.Code == 4 || data.Code == 11 || data.Code == 12 || data.Code == 13) {
	                window.location.href = "bindInfo.html";
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
	                //alert('Ajax error!')
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/26.
	 */
	var noDataTpl = __webpack_require__(4);
	__webpack_require__(6);
	
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);
	module.exports=template('dep/component/no-data/tpl/no-data-tpl',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,msg=$data.msg,$out='';$out+='<div class="no-data-bg"></div> <div class="no-data-tip font-size12">';
	$out+=$escape(msg || '暂无数据');
	$out+='</div>';
	return new String($out);
	});

/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".no-data-bg{\r\n    margin: 47% auto 5%;\r\n    height: 57px;\r\n    width: 58px;\r\n    background: url(" + __webpack_require__(9) + ") center center no-repeat;\r\n}\r\n.no-data-tip{\r\n    text-align: center;\r\n    color: #999999;\r\n}", ""]);
	
	// exports


/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA6CAYAAAAKjPErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTVGNjVEQjYyMzI4MTFFNjlFRDU4OEIxMTg3ODdDNDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTVGNjVEQjUyMzI4MTFFNjlFRDU4OEIxMTg3ODdDNDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzM4ZDRiMi1kODE0LTQ5NTUtYjcxNC0zOGM2Mjc0YjNlOTYiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NDU0YWUyOC01ZTQwLTExNzktODQxZi04NmU0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"

/***/ },
/* 10 */
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
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
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
	        } else {
	            this.callback();
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
	        this.dom.undelegate().delegate('.name-wrap', 'tap', function(){
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
	        this.id.undelegate().delegate('li', 'tap', function(){
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
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".mock-select{\r\n    line-height: 42px;\r\n    height: 42px;\r\n    text-align: center;\r\n    border:none;\r\n}\r\n.mock-select .name-wrap.active{\r\n    background: #fff;\r\n}\r\n.mock-ul{\r\n    position: absolute;\r\n    background: #fff;\r\n    z-index: 100;\r\n    border-bottom: 1px solid #d9d9d9;\r\n    width: 93.6%;\r\n    overflow-y: scroll;\r\n}\r\n.mock-select .name-wrap{\r\n    color: #fff;\r\n    height: 42px;\r\n    overflow: hidden;\r\n}\r\n.mock-select .bg{\r\n    display: inline-block;\r\n    height: 6px;\r\n    width: 13px;\r\n}\r\n.mock-select .name-wrap .bg{\r\n    background: url(" + __webpack_require__(21) + ") center center no-repeat;\r\n}\r\n.mock-select .name-wrap.active{\r\n    color: #00d535;\r\n}\r\n.mock-select .name-wrap.active .bg {\r\n    background: url(" + __webpack_require__(22) + ") center center no-repeat;\r\n}\r\n.mock-ul li{\r\n    margin:0;\r\n    color: #333333;\r\n    text-align: left;\r\n    height: 42px;\r\n    line-height: 42px;\r\n    border-top: 1px solid #d9d9d9;\r\n}\r\n.mock-ul li .right{\r\n    display: none;\r\n    float: right;\r\n    margin-right: 1rem;\r\n}\r\n.mock-ul li.active .right{\r\n    display: inline;\r\n}\r\n.mock-ul li.active{\r\n    color: #00d535;\r\n}", ""]);
	
	// exports


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAGCAYAAAAYLBS/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTYwQkQ4RjgyMEI2MTFFNjk4QjBGMzFFNkNGQTgxMDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTYwQkQ4RjcyMEI2MTFFNjk4QjBGMzFFNkNGQTgxMDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjkxMkNDRTlBMjBFNjExOEZCQzg4QzIxN0QyRUJGOSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmYxYzk5MjgxLTM4NWEtMTE3OS1hMzViLTkzNTU2ZTcyMjJiNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PheHe58AAABVSURBVHjaYvj//78OEN/7DwGf8OD/UHU6DEAChE2RJHCBT1B1DDBNICwMxBdwaLgAlWdA1wTCXEB8GE3DYag4Ay5NMLwNqmEbNnlcmkA4C5ccQIABAPGiC0psi9bFAAAAAElFTkSuQmCC"

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAGCAYAAAAYLBS/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEFBNUQyRTYyMEI2MTFFNjg0OUZDNjY1RDdFMUNFMEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEFBNUQyRTUyMEI2MTFFNjg0OUZDNjY1RDdFMUNFMEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjkxMkNDRTlBMjBFNjExOEZCQzg4QzIxN0QyRUJGOSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmYxYzk5MjgxLTM4NWEtMTE3OS1hMzViLTkzNTU2ZTcyMjJiNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmlp944AAACeSURBVHjaYvj//78OEN/7DwGfQDjjWfsvEIbxofg/VJ0OA8NVUwYgwxQm0fhq9n+gGBiD2EjgE1QdA1gTVKNw6YtJz2EaYLjp1RyQhgsgeag6BkawJgioB+IGBiyAi4mj9du/HzUg9n+tUwwsUPF+IC5gwAGAGqqBFDcQF4L4IE35UA3fgfgPTCErIwvr7/9/fkO5LFA1D4B4IkCAAQDWEYtLHKvdIwAAAABJRU5ErkJggg=="

/***/ },
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);
	module.exports=template('dep/component/mock-select/tpl/select-ul-tpl',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul class="mock-ul box-padding display-none"> ';
	$each(data,function($value,$index){
	$out+=' ';
	if($index == 0){
	$out+=' <li class="active" style="border:none;" data-id="';
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
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/24.
	 */
	var mockSelect = __webpack_require__(18);
	var util = __webpack_require__(2);
	//var Mock = require('mock');
	//var mockData = Mock.mock(
	//    {
	//        'N|3-5': [
	//            {
	//                'GradeID|+1': 1,
	//                'GradeName|1': ['小学','初中','高中'],
	//                'SubjectID|+1': 100,
	//                'SubjectName|1': ['数学','语文','英语','物理','生物','化学','政治','历史']
	//            }
	//        ]
	//    }
	//);
	
	
	var isCourseReady = false;
	var CurrentBigGrade, CurrentSubject;
	var courseInfo = {
	    init: function(){
	        this.initCourse();
	    },
	    initCourse: function(){
	        var param = {
	            AppID: sessionStorage.getItem('appid'),
	            OpenID: sessionStorage.getItem('openid')
	        };
	        var tThis = this;
	        //处理数据
	        var subjectlist={data:[]} ;
	        //$.each(subjectlist.data,function(i, item){
	        //    item.id = item.GradeID + ',' + item.SubjectID;
	        //    item.name = item.GradeName + item.SubjectName
	        //});
	        $.ajax({
	            type: 'post',
	            async:false,
	            url:util.getApiUrl('HomeSchoolContact/Registration/GetRegistrationDropDownList'),
	            data: param,
	            success:function(data){
	               // util.checkBind(data);
	
	                if(data)
	                {
	                    if(data.OK)
	                    {
	                            //clist=data.N;
	                            $.each(data.N, function (i, item) {
	                                item.id = item.userSujectId;
	                                if (item.orderNum > 0) {
	                                    item.name = util.getStageStr(item.bgrade) + util.getSubjectName(item.subjectId) + item.orderNum.toString();
	                                }
	                                else {
	                                    item.name = util.getStageStr(item.bgrade) + util.getSubjectName(item.subjectId);
	                                }
	                                subjectlist.data = data.N;
	                            })
	                    }
	                    else {
	
	                    }
	                }
	            }
	        });
	
	        if(subjectlist.data.length>0)
	        {
	            mockSelect('course', subjectlist, function(ids){
	                //console.log('你需要的id集合: ' + ids);
	                var arrTemp = ids.split(',');
	                tThis.getcourseInfo(ids);
	            },function(){
	                //页面回调
	                //tThis.getcourseInfo();
	            },'course-option', function(flag){
	                if (flag) {}
	            });
	        }
	        else {
	            //无数据
	            var nodata=__webpack_require__(3);
	            nodata.init('bg-white','暂无课程信息');
	            return false;
	        }
	
	    },
	    //获取课程信息
	    getcourseInfo: function (id) {
	        var param = {
	            AppID: sessionStorage.getItem('appid'),
	            OpenID: sessionStorage.getItem('openid'),
	            usersubjectid:id
	
	        };
	        $.ajax({
	            type: 'post',
	            url: util.getApiUrl('HomeSchoolContact/Registration/GetRegistration'),
	            data: param,
	            dataType: 'json',
	            // timeout: 300,
	            success: function (data) {
	               // util.checkBind(data);
	                if (data) {
	                    if (data.OK) {
	                        var c=data.N;
	                        if(c.length>0){
	                            if(c[0].classStartTime&&c[0].planid>0)
	                            {
	                            $("#coursestarttime").html('于 '+util.getLocalTime(c[0].classStartTime)+' 开课');
	                            }
	                            else
	                            {
	                                $("#coursestarttime").html('未开课');
	                            }
	                            var tpl=__webpack_require__(37);
	                            $("#tbcourseinfo").html(tpl(c));
	                        }
	                        else {
	                            //无数据
	                            var nodata=__webpack_require__(3);
	                            nodata.init('main','暂无课程信息');
	                        }
	
	
	                    }
	                }
	            }
	        });
	    }
	};
	$(function(){
	    courseInfo.init();
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);
	module.exports=template('tpl/courseinfo',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' ';
	$each($data,function($value,$index){
	$out+=' <table> <tr><td class="pct25">授课老师</td><td class="tdvalue">';
	$out+=$escape($value.teacherName);
	$out+='<span class="color-green">(';
	$out+=$escape($value.classType==1?"1对1":$value.className);
	$out+=')</span></td></tr> <tr><td>报名课时</td><td class="tdvalue">';
	$out+=$escape($value.totalClassHour);
	$out+='</td></tr> <tr><td>剩余课时</td><td class="tdvalue">';
	$out+=$escape(($value.totalClassHour-$value.classHour)>0?($value.totalClassHour-$value.classHour):0);
	$out+='</td></tr> </table> <div class="foot"> <p class="plan">已上完 ';
	$out+=$escape($value.teachProcess);
	$out+='/';
	$out+=$escape($value.totalCourse);
	$out+=' 次课</p> <p class="hint">根据实际情况：总课次会略有调整</p> </div> <div class="totalinfo fl"> <div class="teach fl mlp6"> <p class="desc bg-ff7f01">';
	$out+=$escape($value.teachProcess);
	$out+='</p> <p class="num bg-e85700">已讲学案</p> </div> <div class="teach fr mrp6"> <p class="desc bg-green">';
	$out+=$escape($value.makeHomeWorkCount);
	$out+='</p> <p class="num bg-darkgreen">已做作业</p> </div> </div> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjlmMTk0ZTNjZTg3YmRhNWNmOWE/YzFmNioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL3V0aWwvdXRpbC5qcz8yMjIxKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvbm8tZGF0YS5qcz8xZjA5KioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbm8tZGF0YS90cGwvbm8tZGF0YS10cGwudHBsPzBhYzYqKioiLCJ3ZWJwYWNrOi8vLy4vfi90bW9kanMtbG9hZGVyL3J1bnRpbWUuanM/ODk2NioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2Nzcy9uby1kYXRhLmNzcz9iNjMyKioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbm8tZGF0YS9jc3Mvbm8tZGF0YS5jc3M/YTgxNSoqKiIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzP2RhMDQqKioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbm8tZGF0YS9pbWcvbm8tZGF0YS5wbmc/Y2Q0ZSoqKiIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCoqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9tb2NrLXNlbGVjdC5qcz9iNDI3Iiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvY3NzL21vY2stc2VsZWN0LmNzcz84YTBhKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2Nzcy9tb2NrLXNlbGVjdC5jc3M/MTM5NCIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2ltZy9hcnJvdy1ib3R0b20ucG5nP2Y3ZjkiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9pbWcvYXJyb3ctdG9wLnBuZz9lNjJjIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvdHBsL21vY2stc2VsZWN0LXRwbC50cGw/ZjdkZSIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9zZWxlY3QtdWwtdHBsLnRwbD8zYzQ1Iiwid2VicGFjazovLy8uL2pzL2NvdXJzZWluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vdHBsL2NvdXJzZWluZm8udHBsIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLDBEQUF5RDtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLHVCQUF1QjtBQUNyRCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsMENBQTBDO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFvRDtBQUNwRCxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztB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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7OztBQ3hJRDtBQUNBO0FBQ0E7QUFDQSxjQUFhLG1JQUFtSTtBQUNoSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLEVBQUMsRSIsImZpbGUiOiJjb3Vyc2VpbmZvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL21mZy13ZWNoYXQvYnVuZGxlL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjlmMTk0ZTNjZTg3YmRhNWNmOWFcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBodW1vckhhbiBvbiAyMDE2LzUvMjAuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cz17XHJcbiAgICBzY3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgIGlmKHNjcm9sbFRvcCArIHdpbmRvd0hlaWdodCA9PSBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0U3ViamVjdE5hbWU6ZnVuY3Rpb24oaWQpe1xyXG5cclxuICAgICAgICB2YXIgc3ViamVjdElkU3RyID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKGlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwMVwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLor63mlodcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDJcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5pWw5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjAzXCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuiLseivrVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwNFwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLniannkIZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDVcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5YyW5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA2XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuWcsOeQhlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwN1wiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLljoblj7JcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDhcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5pS/5rK7XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA5XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIueUn+eJqVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLlpaXmlbBcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0SWRTdHI7XHJcbiAgICB9LFxyXG4gICAgZ2V0U3RhZ2VTdHI6IGZ1bmN0aW9uIChzdGFnZUlkKSB7XHJcbiAgICAgICAgaWYoIXN0YWdlSWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuWIneS4rVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gc3ViamVjdElkU3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhZ2VJZFN0ciA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChzdGFnZUlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4XCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLlsI/lraZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY1wiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi5Yid5LitXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImdcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIumrmOS4rVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YWdlSWRTdHI7XHJcbiAgICB9LFxyXG4gICAgZ29fbWVudTpmdW5jdGlvbihjb25JZCl7XHJcbiAgICAgICAgdmFyIGNvbj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb25JZCk7XHJcbiAgICAgICAgdmFyIGltZz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVDb250cicpO1xyXG4gICAgICAgIGltZy5zcmM9Jy4uL2J1bmRsZS9pbWcvYm90dG9tLXl1YW4tc2hvdy5wbmcnO1xyXG4gICAgICAgIGNvbi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgIHZhciBtZW51Q29udHI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVDb250cicpO1xyXG4gICAgICAgIG1lbnVDb250ci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JyxtZW51Qm9keSxmYWxzZSk7XHJcbiAgICAgICAgZnVuY3Rpb24gbWVudUJvZHkoKXtcclxuICAgICAgICAgICAgdmFyIG1lbnVTaG93PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICBpZihtZW51U2hvdyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgdD1tZW51U2hvdy5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnN0dWR5LXNob3dcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYoIHQgPT0gJ2Rpc3BsYXk6IG5vbmU7Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNzdHVkeS1zaG93MVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudVNob3cuc3R5bGUuZGlzcGxheT0nYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL21lbnUyLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudVNob3cuc3R5bGUuZGlzcGxheT0nbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYz1cIi4uL2J1bmRsZS9pbWcvYm90dG9tLXl1YW4tc2hvdy5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2hvdz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVTaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCdkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5pbm5lckhUTUw9JzxhIGhyZWY9XCJhZnRlcmNsYXNzam9iLmh0bWxcIiBjbGFzcz1cImt0eGFcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcveHVlYW4ucG5nXCIvPjwvYT48YSBocmVmPVwiaG9tZXdvcmstbGlzdC5odG1sXCIgY2xhc3M9XCJreGpsXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppbHUucG5nXCI8L2E+PGEgaHJlZj1cIndyb25nLWdhdGhlci5odG1sXCIgIGNsYXNzPVwiY3RqalwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9qaWppbi5wbmdcIj48L2E+PGEgaHJlZj1cIm1vbnRod2Vhay5odG1sXCIgY2xhc3M9XCJteXJ4XCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3J1b3hpYW5nLnBuZ1wiPjwvYT4nO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzaG93Q29uZmlybTpmdW5jdGlvbihtc2csY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxheWVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGF5ZXIuY2xhc3NOYW1lPVwibGF5ZXJcIjtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxheWVyKTtcclxuICAgICAgICB2YXIgY29uZmlybT0nPGRpdiBjbGFzcz1cInBvcGNvbmZpcm1cIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8ZGl2IGNsYXNzPVwidGl0bGVcIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8aSBjbGFzcz1cImljb24tY2xvc2VcIj48L2k+JztcclxuICAgICAgICBjb25maXJtKz0nIDwvZGl2Pic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8ZGl2IGNsYXNzPVwiY29udGVudFwiPicrbXNnKycgPC9kaXY+JztcclxuICAgICAgICBjb25maXJtKz0nIDxkaXYgY2xhc3M9XCJmb290XCI+JztcclxuICAgICAgICBjb25maXJtKz0nICA8aW5wdXQgY2xhc3M9XCJwb3BidG4gYnRub2sgY29sb3ItZ3JlZW5cIiB0eXBlPVwiYnV0dG9uXCIgIHZhbHVlPVwi56Gu5a6aXCIvPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgPGlucHV0IGNsYXNzPVwicG9wYnRuIGJ0bmNhbmNlbCBjb2xvci1ncmVlblwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPlua2iFwiLz4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgICA8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoY29uZmlybSk7XHJcbiAgICAgICAgLy8kKCcucG9wY29uZmlybScpLmNzcygndG9wJywoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtJCgnLnBvcGNvbmZpcm0nKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgJChcIi5idG5va1wiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAkKFwiLmJ0bm9rXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuYnRuY2FuY2VsLC5pY29uLWNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+S/oeaBr+aPkOekuuahhlxyXG4gICAgc2hvd1BvcE1zZzpmdW5jdGlvbiAobXNnLHR5cGUpIHtcclxuICAgICAgICB2YXIgaHRtbD1cIlwiO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBodG1sPSc8ZGl2IGNsYXNzPVwicG9wbXNnXCI+PGRpdiBjbGFzcz1cImNvbnRlbnRcIj48aW1nIHN0eWxlPVwid2lkdGg6MjIlIFwiIHNyYz1cIi4uL2J1bmRsZS9pbWcvbG9naW4tc3VjZXNzLnBuZ1wiPjxwPicrbXNnKyc8L3A+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBodG1sPSc8ZGl2IGNsYXNzPVwicG9wbXNnXCI+PGRpdiBjbGFzcz1cImNvbnRlbnRcIj48aW1nIHN0eWxlPVwid2lkdGg6MjIlIFwiIHNyYz1cIi4uL2J1bmRsZS9pbWcvbG9naW4tdGFuaGFvLnBuZ1wiPjxwPicrbXNnKyc8L3A+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaHRtbD0nPGRpdiBjbGFzcz1cInBvcG1zZ1wiPjxkaXYgY2xhc3M9XCJjb250ZW50XCI+PHA+Jyttc2crJzwvcD48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdmFyIGh0bWw9JzxkaXYgY2xhc3M9XCJwb3Btc2dcIj48ZGl2IGNsYXNzPVwiY29udGVudFwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9sb2dpbi1zdWNlc3MucG5nXCI+PHA+Jyttc2crJzwvcD48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ2xlZnQnLChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoICAtJCgnLnBvcG1zZycpLndpZHRoKCkpLzIpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ3RvcCcsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSQoJy5wb3Btc2cnKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyQoJy5wb3Btc2cnKS5yZW1vdmUoKTt9LDEwMDApO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5o6l5Y+jdXJsIOWmguiOt+WPlm9wZW5pZCAgIGdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKVxyXG4gICAgZ2V0QXBpVXJsOmZ1bmN0aW9uKGFjdGlvbil7XHJcbiAgICAgICAgLy/nur/kuIvmtYvor5VcclxuICAgICAgIC8vdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk4Lyc7XHJcbiAgICAgICAgLy/nur/kuIrmtYvor5VcclxuICAgICAgIHZhciBiYXNldXJsPSdodHRwOi8vMTkyLjE2OC4xODAuMTU6ODk5Ny8nO1xyXG4gICAgICAgLy8gdmFyIGJhc2V1cmw9J2h0dHA6Ly9sb2NhbGhvc3Q6NDY5NTEvJztcclxuICAgICAgICByZXR1cm4gYmFzZXVybCthY3Rpb247XHJcbiAgICB9LFxyXG4gICAgLy/osIPnlKhhcGnmiJDlip/lkI7vvIzlhYjosIPnlKjmraTmlrnms5XvvIzliKTmlq3nlKjmiLfmmK/lkKblt7Lnu4/nu5HlrprvvIzoi6XmnKrnu5HlrprvvIzot7PovazliLDnu5HlrprpobVcclxuICAgIGNoZWNrQmluZDpmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBpZighZGF0YS5PSykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5Db2RlID09IDEgfHwgZGF0YS5Db2RlID09IDIgfHwgZGF0YS5Db2RlID09IDQgfHwgZGF0YS5Db2RlID09IDExIHx8IGRhdGEuQ29kZSA9PSAxMiB8fCBkYXRhLkNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCJiaW5kSW5mby5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5ZPcGVuSWRcclxuICAgIGdldE9wZW5JZDpmdW5jdGlvbihhcHBpZCxhcHBzZWNyZXQsY29kZSl7XHJcbnZhciBvcGVuaWQ7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBhc3luYzpmYWxzZSxcclxuICAgICAgICAgICAgdXJsOnRoaXMuZ2V0QXBpVXJsKCdBY2NvdW50L0dldE9wZW5JRCcpLFxyXG4gICAgICAgICAgICAvLyBkYXRhIHRvIGJlIGFkZGVkIHRvIHF1ZXJ5IHN0cmluZzpcclxuICAgICAgICAgICAgZGF0YToge0FwcElEOmFwcGlkLEFwcFNlY3JldDphcHBzZWNyZXQsQ29kZTpjb2RlfSxcclxuICAgICAgICAgICAgLy8gdHlwZSBvZiBkYXRhIHdlIGFyZSBleHBlY3RpbmcgaW4gcmV0dXJuOlxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAvL3RpbWVvdXQ6IDMwMCxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuT0spXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuaWQ9ZGF0YS5JRDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCB0eXBlKXtcclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoJ0FqYXggZXJyb3IhJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9wZW5pZDtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlnVybOWPguaVsFxyXG4gICAgZ2V0UXVlcnlTdHJpbmc6ZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKF58JilcIiArIG5hbWUgKyBcIj0oW14mXSopKCZ8JClcIiwgXCJpXCIpO1xyXG4gICAgdmFyIHIgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xyXG4gICAgaWYgKHIgIT0gbnVsbCkgcmV0dXJuIHVuZXNjYXBlKGRlY29kZVVSSShyWzJdKSk7IHJldHVybiBudWxsO1xyXG59LFxyXG5cclxuICAgIGRhdGVGb3JtYXQ6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCl7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICB2YXIgbWFwID0ge1xyXG4gICAgICAgICAgICBcIllcIjogZGF0ZS5nZXRZZWFyKCksXHJcbiAgICAgICAgICAgIFwiTVwiOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vVxyXG4gICAgICAgICAgICBcImRcIjogZGF0ZS5nZXREYXRlKCksIC8v5pelXHJcbiAgICAgICAgICAgIFwiaFwiOiBkYXRlLmdldEhvdXJzKCksIC8v5bCP5pe2XHJcbiAgICAgICAgICAgIFwibVwiOiBkYXRlLmdldE1pbnV0ZXMoKSwgLy/liIZcclxuICAgICAgICAgICAgXCJzXCI6IGRhdGUuZ2V0U2Vjb25kcygpLCAvL+enklxyXG4gICAgICAgICAgICBcInFcIjogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqZcclxuICAgICAgICAgICAgXCJTXCI6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLy/mr6vnp5JcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC8oW3lNZGhtc3FTXSkrL2csIGZ1bmN0aW9uIChhbGwsIHQpIHtcclxuICAgICAgICAgICAgdmFyIHYgPSBtYXBbdF07XHJcbiAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbGwubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSAnMCcgKyB2O1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSB2LnN1YnN0cih2Lmxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodCA9PT0gJ3knKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIGFsbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhbGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgIH0sXHJcbiAgICAvL+WkhOeQhuivlemimOWFrOW8jyBtYXRoamF4XHJcbiAgICBpbml0TWF0aEpheE9iajpmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBNYXRoSmF4Lkh1Yi5RdWV1ZShbXCJUeXBlc2V0XCIsIE1hdGhKYXguSHViLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCldKTtcclxuICAgIH0sXHJcbiAgICBnZXRMb2NhbFRpbWU6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludCh2YWwucmVwbGFjZShcIi9EYXRlKFwiLCBcIlwiKS5yZXBsYWNlKFwiKS9cIiwgXCJcIiksIDEwKSk7XHJcbiAgICAgICAgICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxIDwgMTAgPyBcIjBcIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKSA6IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0RGF0ZSgpIDogZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldEhvdXJzKCkgOiBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIHZhciBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKSA6IGRhdGUuZ2V0TWludXRlcygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHllYXIgKyBcIi1cIiArIG1vbnRoICsgXCItXCIgKyBjdXJyZW50RGF0ZSArIFwiIFwiICsgaG91cnMgKyBcIjpcIiArIG1pbnV0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC91dGlsL3V0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDggOSAxMCAxMSAxMiAxMyAxNCAxNiAxNyAxOCAxOVxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8yNi5cclxuICovXHJcbnZhciBub0RhdGFUcGwgPSByZXF1aXJlKCduby1kYXRhLXRwbCcpO1xyXG5yZXF1aXJlKCcuL2Nzcy9uby1kYXRhLmNzcycpO1xyXG5cclxudmFyIF8kZWw7XHJcbnZhciBub0RhdGEgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihtc2cpe1xyXG4gICAgICAgIHZhciBwPXttc2c6bXNnfVxyXG4gICAgICAgIF8kZWwuaHRtbChub0RhdGFUcGwocCkpO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRvbSxtc2cpe1xyXG4gICAgICAgIF8kZWwgPSAkKFwiLlwiICsgZG9tKTtcclxuICAgICAgICBub0RhdGEuaW5pdChtc2cpO1xyXG4gICAgfSxcclxuXHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9uby1kYXRhLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMyA0IDkgMTIgMTMgMTQgMTYgMTcgMThcbiAqKi8iLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnZGVwL2NvbXBvbmVudC9uby1kYXRhL3RwbC9uby1kYXRhLXRwbCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZXNjYXBlPSR1dGlscy4kZXNjYXBlLG1zZz0kZGF0YS5tc2csJG91dD0nJzskb3V0Kz0nPGRpdiBjbGFzcz1cIm5vLWRhdGEtYmdcIj48L2Rpdj4gPGRpdiBjbGFzcz1cIm5vLWRhdGEtdGlwIGZvbnQtc2l6ZTEyXCI+JztcbiRvdXQrPSRlc2NhcGUobXNnIHx8ICfmmoLml6DmlbDmja4nKTtcbiRvdXQrPSc8L2Rpdj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9uby1kYXRhL3RwbC9uby1kYXRhLXRwbC50cGxcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgOSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsIi8qVE1PREpTOnt9Ki9cclxuIWZ1bmN0aW9uICgpIHtcclxuXHRmdW5jdGlvbiBhKGEsIGIpIHtcclxuXHRcdHJldHVybiAoL3N0cmluZ3xmdW5jdGlvbi8udGVzdCh0eXBlb2YgYikgPyBoIDogZykoYSwgYilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGIoYSwgYykge1xyXG5cdFx0cmV0dXJuIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEgJiYgKGMgPSB0eXBlb2YgYSwgXCJudW1iZXJcIiA9PT0gYyA/IGEgKz0gXCJcIiA6IGEgPSBcImZ1bmN0aW9uXCIgPT09IGMgPyBiKGEuY2FsbChhKSkgOiBcIlwiKSwgYVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYyhhKSB7XHJcblx0XHRyZXR1cm4gbFthXVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZChhKSB7XHJcblx0XHRyZXR1cm4gYihhKS5yZXBsYWNlKC8mKD8hW1xcdyNdKzspfFs8PlwiJ10vZywgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGUoYSwgYikge1xyXG5cdFx0aWYgKG0oYSkpZm9yICh2YXIgYyA9IDAsIGQgPSBhLmxlbmd0aDsgZCA+IGM7IGMrKyliLmNhbGwoYSwgYVtjXSwgYywgYSk7IGVsc2UgZm9yIChjIGluIGEpYi5jYWxsKGEsIGFbY10sIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmKGEsIGIpIHtcclxuXHRcdHZhciBjID0gLyhcXC8pW15cXC9dK1xcMVxcLlxcLlxcMS8sIGQgPSAoXCIuL1wiICsgYSkucmVwbGFjZSgvW15cXC9dKyQvLCBcIlwiKSwgZSA9IGQgKyBiO1xyXG5cdFx0Zm9yIChlID0gZS5yZXBsYWNlKC9cXC9cXC5cXC8vZywgXCIvXCIpOyBlLm1hdGNoKGMpOyllID0gZS5yZXBsYWNlKGMsIFwiL1wiKTtcclxuXHRcdHJldHVybiBlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnKGIsIGMpIHtcclxuXHRcdHZhciBkID0gYS5nZXQoYikgfHwgaSh7ZmlsZW5hbWU6IGIsIG5hbWU6IFwiUmVuZGVyIEVycm9yXCIsIG1lc3NhZ2U6IFwiVGVtcGxhdGUgbm90IGZvdW5kXCJ9KTtcclxuXHRcdHJldHVybiBjID8gZChjKSA6IGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGgoYSwgYikge1xyXG5cdFx0aWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGIpIHtcclxuXHRcdFx0dmFyIGMgPSBiO1xyXG5cdFx0XHRiID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgayhjKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR2YXIgZCA9IGpbYV0gPSBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgYihjLCBhKSArIFwiXCJcclxuXHRcdFx0fSBjYXRjaCAoZCkge1xyXG5cdFx0XHRcdHJldHVybiBpKGQpKClcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBkLnByb3RvdHlwZSA9IGIucHJvdG90eXBlID0gbiwgZC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGIgKyBcIlwiXHJcblx0XHR9LCBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpKGEpIHtcclxuXHRcdHZhciBiID0gXCJ7VGVtcGxhdGUgRXJyb3J9XCIsIGMgPSBhLnN0YWNrIHx8IFwiXCI7XHJcblx0XHRpZiAoYyljID0gYy5zcGxpdChcIlxcblwiKS5zbGljZSgwLCAyKS5qb2luKFwiXFxuXCIpOyBlbHNlIGZvciAodmFyIGQgaW4gYSljICs9IFwiPFwiICsgZCArIFwiPlxcblwiICsgYVtkXSArIFwiXFxuXFxuXCI7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJvYmplY3RcIiA9PSB0eXBlb2YgY29uc29sZSAmJiBjb25zb2xlLmVycm9yKGIgKyBcIlxcblxcblwiICsgYyksIGJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBqID0gYS5jYWNoZSA9IHt9LCBrID0gdGhpcy5TdHJpbmcsIGwgPSB7XHJcblx0XHRcIjxcIjogXCImIzYwO1wiLFxyXG5cdFx0XCI+XCI6IFwiJiM2MjtcIixcclxuXHRcdCdcIic6IFwiJiMzNDtcIixcclxuXHRcdFwiJ1wiOiBcIiYjMzk7XCIsXHJcblx0XHRcIiZcIjogXCImIzM4O1wiXHJcblx0fSwgbSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGEpIHtcclxuXHRcdFx0cmV0dXJuIFwiW29iamVjdCBBcnJheV1cIiA9PT0ge30udG9TdHJpbmcuY2FsbChhKVxyXG5cdFx0fSwgbiA9IGEudXRpbHMgPSB7XHJcblx0XHQkaGVscGVyczoge30sICRpbmNsdWRlOiBmdW5jdGlvbiAoYSwgYiwgYykge1xyXG5cdFx0XHRyZXR1cm4gYSA9IGYoYywgYSksIGcoYSwgYilcclxuXHRcdH0sICRzdHJpbmc6IGIsICRlc2NhcGU6IGQsICRlYWNoOiBlXHJcblx0fSwgbyA9IGEuaGVscGVycyA9IG4uJGhlbHBlcnM7XHJcblx0YS5nZXQgPSBmdW5jdGlvbiAoYSkge1xyXG5cdFx0cmV0dXJuIGpbYS5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIildXHJcblx0fSwgYS5oZWxwZXIgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0b1thXSA9IGJcclxuXHR9LCBtb2R1bGUuZXhwb3J0cyA9IGFcclxufSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDggOSAxMSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbm8tZGF0YS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbm8tZGF0YS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9uby1kYXRhLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9jc3Mvbm8tZGF0YS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgOSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm5vLWRhdGEtYmd7XFxyXFxuICAgIG1hcmdpbjogNDclIGF1dG8gNSU7XFxyXFxuICAgIGhlaWdodDogNTdweDtcXHJcXG4gICAgd2lkdGg6IDU4cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIHJlcXVpcmUoXCIuLi9pbWcvbm8tZGF0YS5wbmdcIikgKyBcIikgY2VudGVyIGNlbnRlciBuby1yZXBlYXQ7XFxyXFxufVxcclxcbi5uby1kYXRhLXRpcHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBjb2xvcjogIzk5OTk5OTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9jc3Mvbm8tZGF0YS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgOSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDcgOSAxMSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURrQUFBQTZDQVlBQUFBS2pQRXJBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQTRCcFZGaDBXRTFNT21OdmJTNWhaRzlpWlM1NGJYQUFBQUFBQUR3L2VIQmhZMnRsZENCaVpXZHBiajBpNzd1L0lpQnBaRDBpVnpWTk1FMXdRMlZvYVVoNmNtVlRlazVVWTNwcll6bGtJajgrSUR4NE9uaHRjRzFsZEdFZ2VHMXNibk02ZUQwaVlXUnZZbVU2Ym5NNmJXVjBZUzhpSUhnNmVHMXdkR3M5SWtGa2IySmxJRmhOVUNCRGIzSmxJRFV1TXkxak1ERXhJRFkyTGpFME5UWTJNU3dnTWpBeE1pOHdNaTh3TmkweE5EbzFOam95TnlBZ0lDQWdJQ0FnSWo0Z1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNGdQSEprWmpwRVpYTmpjbWx3ZEdsdmJpQnlaR1k2WVdKdmRYUTlJaUlnZUcxc2JuTTZlRzF3VFUwOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOXRiUzhpSUhodGJHNXpPbk4wVW1WbVBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZjMVI1Y0dVdlVtVnpiM1Z5WTJWU1pXWWpJaUI0Yld4dWN6cDRiWEE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM4aUlIaHRjRTFOT2s5eWFXZHBibUZzUkc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRwaFlXTmhNemd5WkMwM1pUZG1MVFJsTURNdFlXUXdNeTFsWVRKa1kyVXhOakZoTVdRaUlIaHRjRTFOT2tSdlkzVnRaVzUwU1VROUluaHRjQzVrYVdRNlJUVkdOalZFUWpZeU16STRNVEZGTmpsRlJEVTRPRUl4TVRnM09EZERORFlpSUhodGNFMU5Pa2x1YzNSaGJtTmxTVVE5SW5odGNDNXBhV1E2UlRWR05qVkVRalV5TXpJNE1URkZOamxGUkRVNE9FSXhNVGczT0RkRE5EWWlJSGh0Y0RwRGNtVmhkRzl5Vkc5dmJEMGlRV1J2WW1VZ1VHaHZkRzl6YUc5d0lFTlROaUFvVjJsdVpHOTNjeWtpUGlBOGVHMXdUVTA2UkdWeWFYWmxaRVp5YjIwZ2MzUlNaV1k2YVc1emRHRnVZMlZKUkQwaWVHMXdMbWxwWkRvek56TTRaRFJpTWkxa09ERTBMVFE1TlRVdFlqY3hOQzB6T0dNMk1qYzBZak5sT1RZaUlITjBVbVZtT21SdlkzVnRaVzUwU1VROUltRmtiMkpsT21SdlkybGtPbkJvYjNSdmMyaHZjRG8xTkRVMFlXVXlPQzAxWlRRd0xURXhOemt0T0RReFppMDRObVUwT1dRek9UZGtNV1FpTHo0Z1BDOXlaR1k2UkdWelkzSnBjSFJwYjI0K0lEd3ZjbVJtT2xKRVJqNGdQQzk0T25odGNHMWxkR0UrSUR3L2VIQmhZMnRsZENCbGJtUTlJbklpUHo1Rm15aUZBQUFGcUVsRVFWUjQydVJhVzBzclZ4VGVtZHhOWWpYeGlxTFZlRzFQQ3kyZWVvNjlTRzJMUGIvRFVCOExmV3hwb2RBKzlxR1BsdlRINkl1Z0lvcW9lQW1DaXFLSTFXcTg1V0xYTjJUQ251MWtjbkZ5Wm1zWHhERXp5Y3orOWxyclc5OWVPeTVXZ3NYajhlL3A4QXU5L0E2SEk4TnN0dnY3ZXljZGJ1ajFheXdXKzdQWTV4MGxBUHpCNC9IOEZvMUcvVjZ2bDhsaXQ3ZTNMSkZJWEtkU3FaOG5KaWIrcUJqazFOU1V3K2wwL2pNNE9QaU9UQUExdTd1N1kydHJhLzltTXBtNnljbkorMEtmY3hXNVQ1L0w1WEtJQUduMjJPbnBLVXVuMHdpZHFvT2hGR0UwRGhZT2g1bmI3YzZmcHdoVDN4UElBWHE3WGhGSXV2bXJVQ2lrUTNoMWRjVjJkblpZYjI4dmEyNXVab3FpVkIxa05wdGxSMGRIYkhOemszVjFkYkdhbXByOE5ZeVBRbmVrWXBBMGU5OEdnMEVkeUwyOVBUWTJOc2JhMjl2ZmFtaDJkM2V6am80T05qMDl6ZnI3Ky9Qbk1iNnpzN054K3ZmdlF0OVZpckRZNjBBZ29FdDJoTTdiQnFoWlcxdWIrbnlNUXpPTWo4WTVZdlk5eFlSMEF2VGxKcC9QcHd2VmxwWVdXOGtHejhjNE5BTmYwRGpyYWJ5aFNqdzU1UGY3VS95Sm01c2IxdFRVWkN0SVBCL2o0STI4aWRvOVhEWklJcFF2YW10cmd5TEl4c1pHVzBIaStTSklJcDhnbGJyUnNrSFNsOFpwaG5UWGs4bWtTdU4yR3A2UGNmQkc1T01ncDR5WERaSm8rd09lZEZCNEVmK29WM1lhbm84U3dwTVAzbE90ZkEvaXBXU1E5T0YzeVpOUU96clNzVHRVK1pEbHZZbGFUY0lBZWRsWGppZUhLYzUxTHJ1K3ZsYUx2d3htUkQ2b2wxUmVSa29HU1ZKcG5MN2tGMG1ub2FGQkdrOGFrSThYNHFWa2tGUjNQdWZ6VVNNZFdVQWFrWStaS0ZBTTh0RkxwTk5HTlZJNjB1R1lYd1hGazA5T0ZJU05SSUdSSno4U1JZQk1wRk9JZkhJc216WVNCWXFCQ1BpTTRqc2dLK21Za1ErSmw1Q1JLRkFNUWdFckQ2ZXNwR05HUGhUQ0VBWGZGQVZKK2ZpeHpLUlRqSHhJRkx4dkNwS1N0cFZtd3MwVERMb0FXSUhMUWpwbTVBTlJRT1V2U3pqNnpEejVDanBROUtKc3BHTkdQcWlYSkFwZUZ3UkozdnBhSkIwWmxsZmxrSStSS0ZDRW5zNm9tSTh5TEsvS0pCL1V5MDhOUVZJY3V5aHB1M2tSQUx1OHZKU09kRFNMUkNJUHdqVW5DaUtFSjJqa3lROTlQbDhLUFJTUmRQZzJvRXdHb2lFT2VlQk5FZ1ZZa1h6eUFDU1NsZUxaLzFSSWg4OUx2dWVURXdXNlRvSENrYzRiaW1mM1V5R2RJajBmWGFkQTRWWWVMK0g2cDBJNm1vRXZJRHNOUk1FTEhVaEswZ2l1aWJrbk0rbnd5a2NNMTV3b3lHaWlRUFBrTUtIUDhoK1VuWFNLa1EveGkwZGJrU2c1aWZRbG5ReUp5eXZadldoR1BnVGNSdzU2a3dkSnMvR1ZLQUlRNTdLVFRoSHl5WGNLRklwYmhaSzBuOThwZ2tINHlrNDZ2Q2pnaFRvTTJ4dlk1c0IyQnp3NVFMbVhFcmZnc1Bjb3FoOVpqWnhrZUo0Y2h3N0hTd1Z0UEZFRWFET0JiVHJaRFp2QVMwdExUS0NVZktlQW5EZEtHc0NGOXFQSFNQd3VMeStyREl1OVFSenRNS2l1dzhORGRTTldORFRZdHJhMlZLRFl1eFFOb2dEYkhTNGtwMGc2TUlDS1JxTnNmWDJkTFN3c3FDV0ZuejNROXREUWtEb0IxYktWbFJXMnVMakk2dXJxQ3BZeVhDT1BHVjRETHBxY0Z5NzZFeTcwb3dlY041b2hyY1RNenM2cU05elQwMk01d09Qall6V1NCZ1lHS3U1SzVIakdTVWNsWGNrTndNYWRuWjFzYm02dUtsN2MyTmhRVStheGJSZmluT3lqZnRXZ3NlLzUrYm5sSUpHSG9wYXVXQlU5OWdaZ3RmMzlmVXNCb254QmpQQmIrYmFDUkhMdjd1NWFubzlXZWRFeVQySlFWdjVvQ2ZlelVvZzhHaVFZRENTRWdWbGxCd2NIVEpTWnRvTFVRdGJLdkR3NU9XRkd0ZHRXa0FqWlJDSmhXYWhDaUZqNWN6Wkw3b1RRUXBkdmZuN2VVSDZWYWhjWEYyeG1ac2J5ZGF4bEd4d1FCaEQwcTZ1ckZlVVRKZ2ZMcGRiV1ZsWmZYeThuU0d6QUFDZ0dpenBYaVVHZjhuMWY2VUR5Ykd2WGlxV3FPU203L1Q5QWtsSjUxa0NCRHdDVFloUG91VmdPVnhJZ2Y5emUzcjU2YmtDQkI3aUFUK1hyZUR6K0hSMStSMTNISXZNNWhDaWFGL1Q2S1JhTC9mV2ZBQU1BK3BSTFAwUFNML01BQUFBQVNVVk9SSzVDWUlJPVwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9pbWcvbm8tZGF0YS5wbmdcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgOSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbnZhciBzdHlsZXNJbkRvbSA9IHt9LFxyXG5cdG1lbW9pemUgPSBmdW5jdGlvbihmbikge1xyXG5cdFx0dmFyIG1lbW87XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRpZiAodHlwZW9mIG1lbW8gPT09IFwidW5kZWZpbmVkXCIpIG1lbW8gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG5cdFx0XHRyZXR1cm4gbWVtbztcclxuXHRcdH07XHJcblx0fSxcclxuXHRpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiAvbXNpZSBbNi05XVxcYi8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTtcclxuXHR9KSxcclxuXHRnZXRIZWFkRWxlbWVudCA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xyXG5cdFx0cmV0dXJuIGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xyXG5cdH0pLFxyXG5cdHNpbmdsZXRvbkVsZW1lbnQgPSBudWxsLFxyXG5cdHNpbmdsZXRvbkNvdW50ZXIgPSAwLFxyXG5cdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wID0gW107XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcclxuXHRpZih0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcclxuXHRcdGlmKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJvYmplY3RcIikgdGhyb3cgbmV3IEVycm9yKFwiVGhlIHN0eWxlLWxvYWRlciBjYW5ub3QgYmUgdXNlZCBpbiBhIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xyXG5cdH1cclxuXHJcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XHJcblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xyXG5cclxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgPGhlYWQ+LlxyXG5cdGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5pbnNlcnRBdCA9IFwiYm90dG9tXCI7XHJcblxyXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCk7XHJcblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XHJcblx0XHR2YXIgbWF5UmVtb3ZlID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcy0tO1xyXG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XHJcblx0XHR9XHJcblx0XHRpZihuZXdMaXN0KSB7XHJcblx0XHRcdHZhciBuZXdTdHlsZXMgPSBsaXN0VG9TdHlsZXMobmV3TGlzdCk7XHJcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgbWF5UmVtb3ZlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcclxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xyXG5cdFx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKylcclxuXHRcdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKCk7XHJcblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucykge1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xyXG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRpZihkb21TdHlsZSkge1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzKys7XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBkb21TdHlsZS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xyXG5cdFx0XHR9XHJcblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHZhciBwYXJ0cyA9IFtdO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzKGxpc3QpIHtcclxuXHR2YXIgc3R5bGVzID0gW107XHJcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xyXG5cdGZvcih2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHR2YXIgaWQgPSBpdGVtWzBdO1xyXG5cdFx0dmFyIGNzcyA9IGl0ZW1bMV07XHJcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xyXG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XHJcblx0XHR2YXIgcGFydCA9IHtjc3M6IGNzcywgbWVkaWE6IG1lZGlhLCBzb3VyY2VNYXA6IHNvdXJjZU1hcH07XHJcblx0XHRpZighbmV3U3R5bGVzW2lkXSlcclxuXHRcdFx0c3R5bGVzLnB1c2gobmV3U3R5bGVzW2lkXSA9IHtpZDogaWQsIHBhcnRzOiBbcGFydF19KTtcclxuXHRcdGVsc2VcclxuXHRcdFx0bmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xyXG5cdH1cclxuXHRyZXR1cm4gc3R5bGVzO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KSB7XHJcblx0dmFyIGhlYWQgPSBnZXRIZWFkRWxlbWVudCgpO1xyXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wW3N0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xyXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XHJcblx0XHRpZighbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBoZWFkLmZpcnN0Q2hpbGQpO1xyXG5cdFx0fSBlbHNlIGlmKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AucHVzaChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xyXG5cdFx0aGVhZC5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0Jy4gTXVzdCBiZSAndG9wJyBvciAnYm90dG9tJy5cIik7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XHJcblx0c3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR2YXIgaWR4ID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZUVsZW1lbnQpO1xyXG5cdGlmKGlkeCA+PSAwKSB7XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcclxuXHRzdHlsZUVsZW1lbnQudHlwZSA9IFwidGV4dC9jc3NcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGVFbGVtZW50KTtcclxuXHRyZXR1cm4gc3R5bGVFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKSB7XHJcblx0dmFyIGxpbmtFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XHJcblx0bGlua0VsZW1lbnQucmVsID0gXCJzdHlsZXNoZWV0XCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIGxpbmtFbGVtZW50KTtcclxuXHRyZXR1cm4gbGlua0VsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZFN0eWxlKG9iaiwgb3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQsIHVwZGF0ZSwgcmVtb3ZlO1xyXG5cclxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcclxuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gc2luZ2xldG9uRWxlbWVudCB8fCAoc2luZ2xldG9uRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCBmYWxzZSk7XHJcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50LCBzdHlsZUluZGV4LCB0cnVlKTtcclxuXHR9IGVsc2UgaWYob2JqLnNvdXJjZU1hcCAmJlxyXG5cdFx0dHlwZW9mIFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiICYmXHJcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IHVwZGF0ZUxpbmsuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0XHRpZihzdHlsZUVsZW1lbnQuaHJlZilcclxuXHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlRWxlbWVudC5ocmVmKTtcclxuXHRcdH07XHJcblx0fSBlbHNlIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQpO1xyXG5cdFx0cmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZShvYmopO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUobmV3T2JqKSB7XHJcblx0XHRpZihuZXdPYmopIHtcclxuXHRcdFx0aWYobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwKVxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0dXBkYXRlKG9iaiA9IG5ld09iaik7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZW1vdmUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xyXG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcclxuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcclxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xyXG5cdH07XHJcbn0pKCk7XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvU2luZ2xldG9uVGFnKHN0eWxlRWxlbWVudCwgaW5kZXgsIHJlbW92ZSwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xyXG5cclxuXHRpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xyXG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZUVsZW1lbnQuY2hpbGROb2RlcztcclxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdGlmIChjaGlsZE5vZGVzLmxlbmd0aCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuaW5zZXJ0QmVmb3JlKGNzc05vZGUsIGNoaWxkTm9kZXNbaW5kZXhdKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChjc3NOb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9UYWcoc3R5bGVFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XHJcblxyXG5cdGlmKG1lZGlhKSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXHJcblx0fVxyXG5cclxuXHRpZihzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcclxuXHR9IGVsc2Uge1xyXG5cdFx0d2hpbGUoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpbmsobGlua0VsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xyXG5cclxuXHRpZihzb3VyY2VNYXApIHtcclxuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XHJcblx0XHRjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiICsgYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSArIFwiICovXCI7XHJcblx0fVxyXG5cclxuXHR2YXIgYmxvYiA9IG5ldyBCbG9iKFtjc3NdLCB7IHR5cGU6IFwidGV4dC9jc3NcIiB9KTtcclxuXHJcblx0dmFyIG9sZFNyYyA9IGxpbmtFbGVtZW50LmhyZWY7XHJcblxyXG5cdGxpbmtFbGVtZW50LmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cclxuXHRpZihvbGRTcmMpXHJcblx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKG9sZFNyYyk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA3IDkgMTEgMTIgMTMgMTQgMTYgMTcgMThcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBodW1vckhhbiBvbiAyMDE2LzUvMjAuXHJcbiAqL1xyXG5yZXF1aXJlKCcuL2Nzcy9tb2NrLXNlbGVjdC5jc3MnKTtcclxudmFyIHNlbGVjdFRwbCA9IHJlcXVpcmUoJ21vY2stc2VsZWN0LXRwbCcpO1xyXG52YXIgc2VsZWN0VWxUcGwgPSByZXF1aXJlKCdzZWxlY3QtdWwtdHBsJyk7XHJcblxyXG5mdW5jdGlvbiBtb2NrU2VsZWN0KGRvbSwgZGF0YSwgY2FsbGJhY2tJZCwgY2FsbGJhY2ssIGlkLCBjYWxsQmFja0ZsYWcpe1xyXG4gICAgdGhpcy5kb20gPSAkKFwiLlwiICsgZG9tKTtcclxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgdGhpcy5pZCA9ICQoXCIjXCIgKyBpZCk7XHJcbiAgICB0aGlzLmNhbGxCYWNrRmxhZyA9IGNhbGxCYWNrRmxhZztcclxuICAgIHRoaXMuaW5pdERvbSgpO1xyXG4gICAgdGhpcy5pbml0QnRucygpO1xyXG59XHJcbm1vY2tTZWxlY3QucHJvdG90eXBlID0ge1xyXG4gICAgaW5pdERvbTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmRvbS5odG1sKHNlbGVjdFRwbCh0aGlzLmRhdGEpKTtcclxuICAgICAgICB0aGlzLmlkLmh0bWwoc2VsZWN0VWxUcGwodGhpcy5kYXRhKSk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkKHRoaXMuZG9tLmZpbmQoXCIubmFtZVwiKS5hdHRyKCdkYXRhLWlkJykpO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGxCYWNrRmxhZykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxCYWNrRmxhZyh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBvZmZzZXQgPSB0aGlzLmRvbS5vZmZzZXQoKTtcclxuICAgICAgICB0aGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5jc3Moe1xyXG4gICAgICAgICAgICAnbGVmdCc6IDAsXHJcbiAgICAgICAgICAgICd0b3AnOiBvZmZzZXQudG9wICsgNDJcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5jc3Moe1xyXG4gICAgICAgICAgICAnbWF4LWhlaWdodCc6ICQod2luZG93KS5oZWlnaHQoKSAtIG9mZnNldC5oZWlnaHQgLSBvZmZzZXQudG9wXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgaW5pdEJ0bnM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy/ngrnlh7vmmL7npLrkuIvmi4lcclxuICAgICAgICB2YXIgdFRoaXM9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kb20udW5kZWxlZ2F0ZSgpLmRlbGVnYXRlKCcubmFtZS13cmFwJywgJ3RhcCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codFRoaXMuZG9tKTtcclxuICAgICAgICAgICAgaWYgKCEodFRoaXMuZG9tLmZpbmQoJy5uYW1lLXdyYXAnKS5oYXNDbGFzcygnYWN0aXZlJykpKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vY2stc2VsZWN0XCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5maW5kKFwiLm5hbWUtd3JhcFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vY2stdWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5kb20uZmluZChcIi5tb2NrLXNlbGVjdFwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIi5tb2NrLXVsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoXCIubW9jay1zZWxlY3RcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoXCIubmFtZS13cmFwXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuZG9tLmZpbmQoXCIubW9jay1zZWxlY3RcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v5LiL5ouJ5raI5aSxXHJcbiAgICAgICAgdGhpcy5pZC51bmRlbGVnYXRlKCkuZGVsZWdhdGUoJ2xpJywgJ3RhcCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRUaGlzLmlkLmZpbmQoXCJsaS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmVcIikuZmluZChcIi5yaWdodFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXktbm9uZVwiKTtcclxuICAgICAgICAgICAgdFRoaXMuZG9tLmZpbmQoJy5uYW1lLXdyYXAnKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmluZChcIi5uYW1lXCIpLmh0bWwoJCh0aGlzKS5maW5kKFwiLml0ZW0tbmFtZVwiKS5odG1sKCkpLmF0dHIoXCJkYXRhLWlkXCIsICQodGhpcykuYXR0cihcImRhdGEtaWRcIikpO1xyXG4gICAgICAgICAgICB0VGhpcy5kb20uZmluZChcIi5tb2NrLXNlbGVjdFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHRUaGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIHRUaGlzLmNhbGxiYWNrSWQodFRoaXMuZG9tLmZpbmQoXCIubmFtZVwiKS5hdHRyKCdkYXRhLWlkJykpO1xyXG4gICAgICAgICAgICBpZiAodFRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb20sIGRhdGEsIGNhbGxiYWNrSWQsIGNhbGxiYWNrLCBpZCwgY2FsbEJhY2tGbGFnKXtcclxuICAgIC8qKlxyXG4gICAgICogKiDmqKHmi5/kuIvmi4nmoYbnu4Tku7ZcclxuICAgICAqIOaLv+WIsGlkXHJcbiAgICAgKiBAcGFyYW0gZG9tICAgICAgIOS4i+aLieahhueItue6p2NsYXNzXHJcbiAgICAgKiBAcGFyYW0gZGF0YSAgICAgIOS4i+aLieaVsOaNru+8iOWkhOeQhui/h+eahOagvOW8j+S4untkYXRhOiBbe2lkOicnLG5hbWU6Jyd9LHt9LHt9XX3vvIks5Y+m5aSW5rOo5oSPb3JkZXJOdW0gPiAwID8gK29yZGVyTnVtIDogJydcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja0lkICAgICAg6YCa6L+H5Zue6LCD5Lyg57uZ5Liq5Lq66aG16Z2i6ZyA6KaB55qEaWRcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAgICAgICAg5Liq5Lq66aG16Z2i55qE5Zue6LCD5aSE55CGXHJcbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgIOWtmOaUvuS4i+aLiemAiemhueeahGlkXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2tGbGFn77yI6Z2e5b+F5Lyg77yJICDlkYror4npobXpnaLmqKHmnb/muLLmn5PlrozkuobmnInkuoZpZOetieWPguaVsCDlj6/ku6XmuLLmn5PkuKrkurrpobXpnaLkuoZcclxuICAgICAqL1xyXG4gICAgcmV0dXJuIG5ldyBtb2NrU2VsZWN0KGRvbSwgZGF0YSwgY2FsbGJhY2tJZCwgY2FsbGJhY2ssIGlkLCBjYWxsQmFja0ZsYWcpO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L21vY2stc2VsZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDkgMTIgMThcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL21vY2stc2VsZWN0LmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9tb2NrLXNlbGVjdC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9tb2NrLXNlbGVjdC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2Nzcy9tb2NrLXNlbGVjdC5jc3NcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxOFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1vY2stc2VsZWN0e1xcclxcbiAgICBsaW5lLWhlaWdodDogNDJweDtcXHJcXG4gICAgaGVpZ2h0OiA0MnB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlcjpub25lO1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmV7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxufVxcclxcbi5tb2NrLXVse1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgIHotaW5kZXg6IDEwMDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOWQ5ZDk7XFxyXFxuICAgIHdpZHRoOiA5My42JTtcXHJcXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcHtcXHJcXG4gICAgY29sb3I6ICNmZmY7XFxyXFxuICAgIGhlaWdodDogNDJweDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5iZ3tcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBoZWlnaHQ6IDZweDtcXHJcXG4gICAgd2lkdGg6IDEzcHg7XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAubmFtZS13cmFwIC5iZ3tcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ltZy9hcnJvdy1ib3R0b20ucG5nXCIpICsgXCIpIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0O1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmV7XFxyXFxuICAgIGNvbG9yOiAjMDBkNTM1O1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmUgLmJnIHtcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ltZy9hcnJvdy10b3AucG5nXCIpICsgXCIpIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0O1xcclxcbn1cXHJcXG4ubW9jay11bCBsaXtcXHJcXG4gICAgbWFyZ2luOjA7XFxyXFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICBoZWlnaHQ6IDQycHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xcclxcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2Q5ZDlkOTtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGkgLnJpZ2h0e1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBmbG9hdDogcmlnaHQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMXJlbTtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGkuYWN0aXZlIC5yaWdodHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lO1xcclxcbn1cXHJcXG4ubW9jay11bCBsaS5hY3RpdmV7XFxyXFxuICAgIGNvbG9yOiAjMDBkNTM1O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9jc3MvbW9jay1zZWxlY3QuY3NzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDkgMTIgMThcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBMEFBQUFHQ0FZQUFBQVlMQlMvQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUE0SnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU15MWpNREV4SURZMkxqRTBOVFkyTVN3Z01qQXhNaTh3TWk4d05pMHhORG8xTmpveU55QWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rOXlhV2RwYm1Gc1JHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEcGhZV05oTXpneVpDMDNaVGRtTFRSbE1ETXRZV1F3TXkxbFlUSmtZMlV4TmpGaE1XUWlJSGh0Y0UxTk9rUnZZM1Z0Wlc1MFNVUTlJbmh0Y0M1a2FXUTZNVFl3UWtRNFJqZ3lNRUkyTVRGRk5qazRRakJHTXpGRk5rTkdRVGd4TURNaUlIaHRjRTFOT2tsdWMzUmhibU5sU1VROUluaHRjQzVwYVdRNk1UWXdRa1E0UmpjeU1FSTJNVEZGTmprNFFqQkdNekZGTmtOR1FUZ3hNRE1pSUhodGNEcERjbVZoZEc5eVZHOXZiRDBpUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5ESURJd01UVWdLRTFoWTJsdWRHOXphQ2tpUGlBOGVHMXdUVTA2UkdWeWFYWmxaRVp5YjIwZ2MzUlNaV1k2YVc1emRHRnVZMlZKUkQwaWVHMXdMbWxwWkRvd05qa3hNa05EUlRsQk1qQkZOakV4T0VaQ1F6ZzRRekl4TjBReVJVSkdPU0lnYzNSU1pXWTZaRzlqZFcxbGJuUkpSRDBpWVdSdlltVTZaRzlqYVdRNmNHaHZkRzl6YUc5d09tWXhZems1TWpneExUTTROV0V0TVRFM09TMWhNelZpTFRrek5UVTJaVGN5TWpKaU5TSXZQaUE4TDNKa1pqcEVaWE5qY21sd2RHbHZiajRnUEM5eVpHWTZVa1JHUGlBOEwzZzZlRzF3YldWMFlUNGdQRDk0Y0dGamEyVjBJR1Z1WkQwaWNpSS9QaGVIZTU4QUFBQlZTVVJCVkhqYVl2ai8vNzhPRU4vN0R3R2Y4T0QvVUhVNkRFQUNoRTJSSkhDQlQxQjFEREJOSUN3TXhCZHdhTGdBbFdkQTF3VENYRUI4R0UzRFlhZzRBeTVOTUx3TnFtRWJObmxjbWtBNEM1Y2NRSUFCQVBHaUMwcHNpOWJGQUFBQUFFbEZUa1N1UW1DQ1wiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LWJvdHRvbS5wbmdcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxOFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUEwQUFBQUdDQVlBQUFBWUxCUy9BQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQTRKcFZGaDBXRTFNT21OdmJTNWhaRzlpWlM1NGJYQUFBQUFBQUR3L2VIQmhZMnRsZENCaVpXZHBiajBpNzd1L0lpQnBaRDBpVnpWTk1FMXdRMlZvYVVoNmNtVlRlazVVWTNwcll6bGtJajgrSUR4NE9uaHRjRzFsZEdFZ2VHMXNibk02ZUQwaVlXUnZZbVU2Ym5NNmJXVjBZUzhpSUhnNmVHMXdkR3M5SWtGa2IySmxJRmhOVUNCRGIzSmxJRFV1TXkxak1ERXhJRFkyTGpFME5UWTJNU3dnTWpBeE1pOHdNaTh3TmkweE5EbzFOam95TnlBZ0lDQWdJQ0FnSWo0Z1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNGdQSEprWmpwRVpYTmpjbWx3ZEdsdmJpQnlaR1k2WVdKdmRYUTlJaUlnZUcxc2JuTTZlRzF3VFUwOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOXRiUzhpSUhodGJHNXpPbk4wVW1WbVBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZjMVI1Y0dVdlVtVnpiM1Z5WTJWU1pXWWpJaUI0Yld4dWN6cDRiWEE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM4aUlIaHRjRTFOT2s5eWFXZHBibUZzUkc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRwaFlXTmhNemd5WkMwM1pUZG1MVFJsTURNdFlXUXdNeTFsWVRKa1kyVXhOakZoTVdRaUlIaHRjRTFOT2tSdlkzVnRaVzUwU1VROUluaHRjQzVrYVdRNk1FRkJOVVF5UlRZeU1FSTJNVEZGTmpnME9VWkROalkxUkRkRk1VTkZNRUlpSUhodGNFMU5Pa2x1YzNSaGJtTmxTVVE5SW5odGNDNXBhV1E2TUVGQk5VUXlSVFV5TUVJMk1URkZOamcwT1VaRE5qWTFSRGRGTVVORk1FSWlJSGh0Y0RwRGNtVmhkRzl5Vkc5dmJEMGlRV1J2WW1VZ1VHaHZkRzl6YUc5d0lFTkRJREl3TVRVZ0tFMWhZMmx1ZEc5emFDa2lQaUE4ZUcxd1RVMDZSR1Z5YVhabFpFWnliMjBnYzNSU1pXWTZhVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRG93TmpreE1rTkRSVGxCTWpCRk5qRXhPRVpDUXpnNFF6SXhOMFF5UlVKR09TSWdjM1JTWldZNlpHOWpkVzFsYm5SSlJEMGlZV1J2WW1VNlpHOWphV1E2Y0dodmRHOXphRzl3T21ZeFl6azVNamd4TFRNNE5XRXRNVEUzT1MxaE16VmlMVGt6TlRVMlpUY3lNakppTlNJdlBpQThMM0prWmpwRVpYTmpjbWx3ZEdsdmJqNGdQQzl5WkdZNlVrUkdQaUE4TDNnNmVHMXdiV1YwWVQ0Z1BEOTRjR0ZqYTJWMElHVnVaRDBpY2lJL1BtbHA5NDRBQUFDZVNVUkJWSGphWXZqLy83OE9FTi83RHdHZlFEampXZnN2RUlieG9mZy9WSjBPQThOVlV3WWd3eFFtMGZocTluK2dHQmlEMkVqZ0UxUWRBMWdUVktOdzZZdEp6MkVhWUxqcDFSeVFoZ3NnZWFnNkJrYXdKZ2lvQitJR0JpeUFpNG1qOWR1L0h6VWc5bit0VXd3c1VQRitJQzVnd0FHQUdxcUJGRGNRRjRMNElFMzVVQTNmZ2ZnUFRDRXJJd3ZyNy85L2ZrTzVMRkExRDRCNElrQ0FBUURXRVl0TEhLdmRJd0FBQUFCSlJVNUVya0pnZ2c9PVwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LXRvcC5wbmdcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxOFxuICoqLyIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCdkZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9tb2NrLXNlbGVjdC10cGwnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVzY2FwZT0kdXRpbHMuJGVzY2FwZSxkYXRhPSRkYXRhLmRhdGEsJG91dD0nJzskb3V0Kz0nPGRpdiBjbGFzcz1cIm1vY2stc2VsZWN0IGZvbnQtc2l6ZTE2XCI+IDxkaXYgY2xhc3M9XCJuYW1lLXdyYXBcIj4gPHNwYW4gY2xhc3M9XCJuYW1lXCIgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKGRhdGFbMF0uaWQpO1xuJG91dCs9J1wiPic7XG4kb3V0Kz0kZXNjYXBlKGRhdGFbMF0ubmFtZSk7XG4kb3V0Kz0nPC9zcGFuPiA8c3BhbiBjbGFzcz1cImJnXCI+PC9zcGFuPiA8L2Rpdj4gPC9kaXY+JztcbnJldHVybiBuZXcgU3RyaW5nKCRvdXQpO1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvdHBsL21vY2stc2VsZWN0LXRwbC50cGxcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxOFxuICoqLyIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCdkZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9zZWxlY3QtdWwtdHBsJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlYWNoPSR1dGlscy4kZWFjaCxkYXRhPSRkYXRhLmRhdGEsJHZhbHVlPSRkYXRhLiR2YWx1ZSwkaW5kZXg9JGRhdGEuJGluZGV4LCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsJG91dD0nJzskb3V0Kz0nPHVsIGNsYXNzPVwibW9jay11bCBib3gtcGFkZGluZyBkaXNwbGF5LW5vbmVcIj4gJztcbiRlYWNoKGRhdGEsZnVuY3Rpb24oJHZhbHVlLCRpbmRleCl7XG4kb3V0Kz0nICc7XG5pZigkaW5kZXggPT0gMCl7XG4kb3V0Kz0nIDxsaSBjbGFzcz1cImFjdGl2ZVwiIHN0eWxlPVwiYm9yZGVyOm5vbmU7XCIgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5pZCk7XG4kb3V0Kz0nXCI+IDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJyaWdodFwiPuKImjwvc3Bhbj4gPC9saT4gJztcbn1lbHNle1xuJG91dCs9JyA8bGkgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5pZCk7XG4kb3V0Kz0nXCI+IDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJyaWdodFwiPuKImjwvc3Bhbj4gPC9saT4gJztcbn1cbiRvdXQrPScgJztcbn0pO1xuJG91dCs9JyA8L3VsPic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9zZWxlY3QtdWwtdHBsLnRwbFxuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCA5IDEyIDE4XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzI0LlxyXG4gKi9cclxudmFyIG1vY2tTZWxlY3QgPSByZXF1aXJlKCdjb21wb25lbnQvbW9jay1zZWxlY3QvbW9jay1zZWxlY3QuanMnKTtcclxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsL3V0aWwnKTtcclxuLy92YXIgTW9jayA9IHJlcXVpcmUoJ21vY2snKTtcclxuLy92YXIgbW9ja0RhdGEgPSBNb2NrLm1vY2soXHJcbi8vICAgIHtcclxuLy8gICAgICAgICdOfDMtNSc6IFtcclxuLy8gICAgICAgICAgICB7XHJcbi8vICAgICAgICAgICAgICAgICdHcmFkZUlEfCsxJzogMSxcclxuLy8gICAgICAgICAgICAgICAgJ0dyYWRlTmFtZXwxJzogWyflsI/lraYnLCfliJ3kuK0nLCfpq5jkuK0nXSxcclxuLy8gICAgICAgICAgICAgICAgJ1N1YmplY3RJRHwrMSc6IDEwMCxcclxuLy8gICAgICAgICAgICAgICAgJ1N1YmplY3ROYW1lfDEnOiBbJ+aVsOWtpicsJ+ivreaWhycsJ+iLseivrScsJ+eJqeeQhicsJ+eUn+eJqScsJ+WMluWtpicsJ+aUv+ayuycsJ+WOhuWPsiddXHJcbi8vICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgXVxyXG4vLyAgICB9XHJcbi8vKTtcclxuXHJcblxyXG52YXIgaXNDb3Vyc2VSZWFkeSA9IGZhbHNlO1xyXG52YXIgQ3VycmVudEJpZ0dyYWRlLCBDdXJyZW50U3ViamVjdDtcclxudmFyIGNvdXJzZUluZm8gPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuaW5pdENvdXJzZSgpO1xyXG4gICAgfSxcclxuICAgIGluaXRDb3Vyc2U6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICBBcHBJRDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYXBwaWQnKSxcclxuICAgICAgICAgICAgT3BlbklEOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdvcGVuaWQnKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdmFyIHRUaGlzID0gdGhpcztcclxuICAgICAgICAvL+WkhOeQhuaVsOaNrlxyXG4gICAgICAgIHZhciBzdWJqZWN0bGlzdD17ZGF0YTpbXX0gO1xyXG4gICAgICAgIC8vJC5lYWNoKHN1YmplY3RsaXN0LmRhdGEsZnVuY3Rpb24oaSwgaXRlbSl7XHJcbiAgICAgICAgLy8gICAgaXRlbS5pZCA9IGl0ZW0uR3JhZGVJRCArICcsJyArIGl0ZW0uU3ViamVjdElEO1xyXG4gICAgICAgIC8vICAgIGl0ZW0ubmFtZSA9IGl0ZW0uR3JhZGVOYW1lICsgaXRlbS5TdWJqZWN0TmFtZVxyXG4gICAgICAgIC8vfSk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBhc3luYzpmYWxzZSxcclxuICAgICAgICAgICAgdXJsOnV0aWwuZ2V0QXBpVXJsKCdIb21lU2Nob29sQ29udGFjdC9SZWdpc3RyYXRpb24vR2V0UmVnaXN0cmF0aW9uRHJvcERvd25MaXN0JyksXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAvLyB1dGlsLmNoZWNrQmluZChkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZihkYXRhKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuT0spXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jbGlzdD1kYXRhLk47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkLmVhY2goZGF0YS5OLCBmdW5jdGlvbiAoaSwgaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaWQgPSBpdGVtLnVzZXJTdWplY3RJZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5vcmRlck51bSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5uYW1lID0gdXRpbC5nZXRTdGFnZVN0cihpdGVtLmJncmFkZSkgKyB1dGlsLmdldFN1YmplY3ROYW1lKGl0ZW0uc3ViamVjdElkKSArIGl0ZW0ub3JkZXJOdW0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubmFtZSA9IHV0aWwuZ2V0U3RhZ2VTdHIoaXRlbS5iZ3JhZGUpICsgdXRpbC5nZXRTdWJqZWN0TmFtZShpdGVtLnN1YmplY3RJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1YmplY3RsaXN0LmRhdGEgPSBkYXRhLk47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmKHN1YmplY3RsaXN0LmRhdGEubGVuZ3RoPjApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtb2NrU2VsZWN0KCdjb3Vyc2UnLCBzdWJqZWN0bGlzdCwgZnVuY3Rpb24oaWRzKXtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ+S9oOmcgOimgeeahGlk6ZuG5ZCIOiAnICsgaWRzKTtcclxuICAgICAgICAgICAgICAgIHZhciBhcnJUZW1wID0gaWRzLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5nZXRjb3Vyc2VJbmZvKGlkcyk7XHJcbiAgICAgICAgICAgIH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIC8v6aG16Z2i5Zue6LCDXHJcbiAgICAgICAgICAgICAgICAvL3RUaGlzLmdldGNvdXJzZUluZm8oKTtcclxuICAgICAgICAgICAgfSwnY291cnNlLW9wdGlvbicsIGZ1bmN0aW9uKGZsYWcpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGZsYWcpIHt9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy/ml6DmlbDmja5cclxuICAgICAgICAgICAgdmFyIG5vZGF0YT1yZXF1aXJlKCdjb21wb25lbnQvbm8tZGF0YS9uby1kYXRhJyk7XHJcbiAgICAgICAgICAgIG5vZGF0YS5pbml0KCdiZy13aGl0ZScsJ+aaguaXoOivvueoi+S/oeaBrycpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluivvueoi+S/oeaBr1xyXG4gICAgZ2V0Y291cnNlSW5mbzogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgdmFyIHBhcmFtID0ge1xyXG4gICAgICAgICAgICBBcHBJRDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYXBwaWQnKSxcclxuICAgICAgICAgICAgT3BlbklEOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdvcGVuaWQnKSxcclxuICAgICAgICAgICAgdXNlcnN1YmplY3RpZDppZFxyXG5cclxuICAgICAgICB9O1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgdXJsOiB1dGlsLmdldEFwaVVybCgnSG9tZVNjaG9vbENvbnRhY3QvUmVnaXN0cmF0aW9uL0dldFJlZ2lzdHJhdGlvbicpLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgLy8gdGltZW91dDogMzAwLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAvLyB1dGlsLmNoZWNrQmluZChkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuT0spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGM9ZGF0YS5OO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNbMF0uY2xhc3NTdGFydFRpbWUmJmNbMF0ucGxhbmlkPjApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2NvdXJzZXN0YXJ0dGltZVwiKS5odG1sKCfkuo4gJyt1dGlsLmdldExvY2FsVGltZShjWzBdLmNsYXNzU3RhcnRUaW1lKSsnIOW8gOivvicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjY291cnNlc3RhcnR0aW1lXCIpLmh0bWwoJ+acquW8gOivvicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRwbD1yZXF1aXJlKCdjb3Vyc2VpbmZvLnRwbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiN0YmNvdXJzZWluZm9cIikuaHRtbCh0cGwoYykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ml6DmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RhdGE9cmVxdWlyZSgnY29tcG9uZW50L25vLWRhdGEvbm8tZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kYXRhLmluaXQoJ21haW4nLCfmmoLml6Dor77nqIvkv6Hmga8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbiQoZnVuY3Rpb24oKXtcclxuICAgIGNvdXJzZUluZm8uaW5pdCgpO1xyXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvY291cnNlaW5mby5qc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgndHBsL2NvdXJzZWluZm8nLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVhY2g9JHV0aWxzLiRlYWNoLCR2YWx1ZT0kZGF0YS4kdmFsdWUsJGluZGV4PSRkYXRhLiRpbmRleCwkZXNjYXBlPSR1dGlscy4kZXNjYXBlLCRvdXQ9Jyc7JG91dCs9JyAnO1xuJGVhY2goJGRhdGEsZnVuY3Rpb24oJHZhbHVlLCRpbmRleCl7XG4kb3V0Kz0nIDx0YWJsZT4gPHRyPjx0ZCBjbGFzcz1cInBjdDI1XCI+5o6I6K++6ICB5biIPC90ZD48dGQgY2xhc3M9XCJ0ZHZhbHVlXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLnRlYWNoZXJOYW1lKTtcbiRvdXQrPSc8c3BhbiBjbGFzcz1cImNvbG9yLWdyZWVuXCI+KCc7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5jbGFzc1R5cGU9PTE/XCIx5a+5MVwiOiR2YWx1ZS5jbGFzc05hbWUpO1xuJG91dCs9Jyk8L3NwYW4+PC90ZD48L3RyPiA8dHI+PHRkPuaKpeWQjeivvuaXtjwvdGQ+PHRkIGNsYXNzPVwidGR2YWx1ZVwiPic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS50b3RhbENsYXNzSG91cik7XG4kb3V0Kz0nPC90ZD48L3RyPiA8dHI+PHRkPuWJqeS9meivvuaXtjwvdGQ+PHRkIGNsYXNzPVwidGR2YWx1ZVwiPic7XG4kb3V0Kz0kZXNjYXBlKCgkdmFsdWUudG90YWxDbGFzc0hvdXItJHZhbHVlLmNsYXNzSG91cik+MD8oJHZhbHVlLnRvdGFsQ2xhc3NIb3VyLSR2YWx1ZS5jbGFzc0hvdXIpOjApO1xuJG91dCs9JzwvdGQ+PC90cj4gPC90YWJsZT4gPGRpdiBjbGFzcz1cImZvb3RcIj4gPHAgY2xhc3M9XCJwbGFuXCI+5bey5LiK5a6MICc7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS50ZWFjaFByb2Nlc3MpO1xuJG91dCs9Jy8nO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUudG90YWxDb3Vyc2UpO1xuJG91dCs9JyDmrKHor748L3A+IDxwIGNsYXNzPVwiaGludFwiPuagueaNruWunumZheaDheWGte+8muaAu+ivvuasoeS8mueVpeacieiwg+aVtDwvcD4gPC9kaXY+IDxkaXYgY2xhc3M9XCJ0b3RhbGluZm8gZmxcIj4gPGRpdiBjbGFzcz1cInRlYWNoIGZsIG1scDZcIj4gPHAgY2xhc3M9XCJkZXNjIGJnLWZmN2YwMVwiPic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS50ZWFjaFByb2Nlc3MpO1xuJG91dCs9JzwvcD4gPHAgY2xhc3M9XCJudW0gYmctZTg1NzAwXCI+5bey6K6y5a2m5qGIPC9wPiA8L2Rpdj4gPGRpdiBjbGFzcz1cInRlYWNoIGZyIG1ycDZcIj4gPHAgY2xhc3M9XCJkZXNjIGJnLWdyZWVuXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm1ha2VIb21lV29ya0NvdW50KTtcbiRvdXQrPSc8L3A+IDxwIGNsYXNzPVwibnVtIGJnLWRhcmtncmVlblwiPuW3suWBmuS9nOS4mjwvcD4gPC9kaXY+IDwvZGl2PiAnO1xufSk7XG4kb3V0Kz0nICc7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90cGwvY291cnNlaW5mby50cGxcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==