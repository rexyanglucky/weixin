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

	module.exports = __webpack_require__(54);


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
	            var h=window.innerHeight+"px";
	            if(menuShow){
	                var t=menuShow.getAttribute('style');
	                $(".study-show").hide();
	                if( t == 'display: none;'){
	                    $("#study-show1").show();
	                    menuShow.style.display='block';
	                    img.src="../bundle/img/menu2.png";
	                    con.setAttribute('style','height:'+h+',overflow:hidden');
	                }else{
	                    menuShow.style.display='none';
	                    img.src="../bundle/img/bottom-yuan-show.png";
	                    con.removeAttribute('style');
	                }
	            }else{
	                var show=document.createElement('div');
	                show.setAttribute('id','menuShow');
	                show.setAttribute('style','display:block;');
	                show.innerHTML='<a href="afterclassjob.html" class="ktxa"><img src="../bundle/img/xuean.png"/></a><a href="homework-list.html" class="kxjl"><img src="../bundle/img/jilu.png"</a><a href="wrong-gather.html"  class="ctjj"><img src="../bundle/img/jijin.png"></a><a href="monthweak.html" class="myrx"><img src="../bundle/img/ruoxiang.png"></a>';
	                document.body.appendChild(show);
	                img.src="../bundle/img/menu2.png";
	                con.setAttribute('style','height:'+h+',overflow:hidden');
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
	       //var baseurl='http://192.168.180.15:8997/';
	
	        //生产环境
	       //var baseurl='http://testing.mofangge.com/';
	       var baseurl='http://localhost:8997/';
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
	    },
	    //获取题型
	   getItemStyle:function (subject,style) {
	       if (subject == '03' || subject == '01') {
	           if (style * 1 < 101) {
	               return 1;
	           }
	           else if (style * 1 < 201) {
	               return 2;
	           }
	           else if (style * 1 < 301) {
	               return 3;
	           }
	           else {
	               return 3;
	           }
	       }
	       else {
	           return style;
	       }
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
	exports.push([module.id, ".no-data-bg{\r\n    margin: 47% auto 5%;\r\n    height: 57px;\r\n    width: 58px;\r\n    background: url(" + __webpack_require__(9) + ") center center no-repeat;\r\n    background-size: 58px 57px;\r\n}\r\n.no-data-tip{\r\n    text-align: center;\r\n    color: #999999;\r\n}", ""]);
	
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

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACHCAYAAAA4Epo3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU0MUQ2NEYzMjEzMTFFNkFENzg5RDU0OEMwNkRDQkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU0MUQ2NEUzMjEzMTFFNkFENzg5RDU0OEMwNkRDQkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzM4ZDRiMi1kODE0LTQ5NTUtYjcxNC0zOGM2Mjc0YjNlOTYiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NDU0YWUyOC01ZTQwLTExNzktODQxZi04NmU0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"

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
	        this.dom.undelegate().delegate('.name-wrap', 'tap', function(e){
	            e.stopPropagation();
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
	        this.id.undelegate().delegate('li', 'tap', function(e){
	            e.stopPropagation();
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
	        //下拉消失
	        $(document).unbind(".local").bind("tap.local", function(){
	            $(".mock-ul").hide();
	            $('.name-wrap,.mock-select').removeClass('active');
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
	exports.push([module.id, ".mock-select{\r\n    line-height: 42px;\r\n    height: 42px;\r\n    text-align: center;\r\n    border:none;\r\n}\r\n.mock-select .name-wrap.active{\r\n    background: #fff;\r\n}\r\n.mock-ul{\r\n    position: absolute;\r\n    background: #fff;\r\n    z-index: 100;\r\n    border-bottom: 1px solid #d9d9d9;\r\n    width: 93.6%;\r\n    overflow-y: scroll;\r\n}\r\n.mock-select .name-wrap{\r\n    color: #fff;\r\n    height: 42px;\r\n    overflow: hidden;\r\n}\r\n.mock-select .bg{\r\n    display: inline-block;\r\n    height: 6px;\r\n    width: 13px;\r\n}\r\n.mock-select .name-wrap .bg{\r\n    background: url(" + __webpack_require__(21) + ") center center no-repeat;\r\n    background-size: 13px 6px;\r\n}\r\n.mock-select .name-wrap.active{\r\n    color: #00d535;\r\n}\r\n.mock-select .name-wrap.active .bg {\r\n    background: url(" + __webpack_require__(22) + ") center center no-repeat;\r\n    background-size: 13px 6px;\r\n}\r\n.mock-ul li{\r\n    margin:0;\r\n    color: #333333;\r\n    text-align: left;\r\n    height: 42px;\r\n    line-height: 42px;\r\n    border-top: 1px solid #d9d9d9;\r\n}\r\n.mock-ul li .right{\r\n    display: none;\r\n    float: right;\r\n    margin-right: 1rem;\r\n    padding: 16px 0;\r\n    height: 9px;\r\n    width: 14px;\r\n}\r\n.mock-ul li.active .right{\r\n    display: inline;\r\n}\r\n.mock-ul li.active{\r\n    color: #00d535;\r\n}", ""]);
	
	// exports


/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAPCAYAAADzun+cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjRBQjBFMUEzMjA4MTFFNjgzOTc5QTg0MjY1Q0VDMjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjRBQjBFMTkzMjA4MTFFNjgzOTc5QTg0MjY1Q0VDMjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNTIzOTYwYS0xYWIyLTQ4OTMtOGYwNC00NGE1MmZjMjZhNDgiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo5NjRlZjJlNi0zYjg1LTExNzktOTUzMy1kYTJiMDM2MTcxMmMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6oCuBDAAAAf0lEQVR42rzPSw6AIAwE0Bo8KTfDe5paDCSofDoITDIk7eYVYmYjPXhdnDdJHlqIu2BRhCPuVqBveCb+QHPwDPyDluCReBatwSPwItqC/+BVVAP34E1UCyO4CkVgDa5GUbiGQ2gPnMNh1HcnPKfUJrMNOyjb/e2+mOQQOJcAAwDfflpudharlAAAAABJRU5ErkJggg=="

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAPCAYAAADzun+cAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTZEOEIyODQzMjBBMTFFNjhBODFDNzI5QzUwQzI3NDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTZEOEIyODUzMjBBMTFFNjhBODFDNzI5QzUwQzI3NDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1NkQ4QjI4MjMyMEExMUU2OEE4MUM3MjlDNTBDMjc0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1NkQ4QjI4MzMyMEExMUU2OEE4MUM3MjlDNTBDMjc0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqW+rdgAAAB7SURBVHjavNU7CoAwEATQZHIbez2O4MW08Db2ehvRBAykUZP9Dcx2wyvXu713xIR0rm47KWMw0DnVH0OwgjM6PiXhYKA5JBxMlIxDACXhEEKbcQiiTTiE0WocCmgVDiX0F4ci+olDGX3FYYCW+JJxH7+TBVpmjZ1uAQYAuZ0t+0s+5IwAAAAASUVORK5CYII="

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
	$out+='</span> <img src="../bundle/img/right.png" class="right"> </li> ';
	}else{
	$out+=' <li data-id="';
	$out+=$escape($value.id);
	$out+='"> <span class="item-name">';
	$out+=$escape($value.name);
	$out+='</span> <img src="../bundle/img/right.png" class="right"> </li> ';
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
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	//获取公共对象
	var home=__webpack_require__(2);
	home.go_menu('container');
	//获取无数据状态
	var nodata=__webpack_require__(3);
	//获取下来框对象
	var sele=__webpack_require__(18);
	//获取appid opeid
	var apid='',opid='';
	    apid=sessionStorage.getItem('appid');
	    opid=sessionStorage.getItem('openid');
	
	//声明下拉表单的默认值
	var seleId='';
	var seleName=null;
	//获取下拉框数据生成下来框
	    //请求科目
	    $.ajax({
	        async:false,
	        type:'post',
	        url:home.getApiUrl('HomeSchoolContact/LerningPath/GetSubjectGradeListHomeWork'),
	        dataType:'json',
	        data:{"OpenId":opid,"AppId":apid},
	        success:function(data){
	            home.checkBind(data);
	            if(!data.N.length){
	                nodata.init('container','暂无当月弱项信息');
	                return;
	            }
	            var message={"data":[]};
	            if(data.OK){
	                for(var i=0;i<data.N.length;i++){
	                    message.data[i]={
	                        "id":data.N[i].GradeID +',' + data.N[i].SubjectID,
	                        "name":data.N[i].GradeName + data.N[i].SubjectName
	                    }
	                }
	            }
	           sele('subject',message,function(id){
	                seleId=id.split(',');
	           },function(){
	               if(seleName !== null){
	                   cont(seleId[0],seleId[1],seleName);
	               }
	           },'op');
	        }
	    });
	
	    //请求月份
	$.ajax({
	    async:false,
	    type:'post',
	    url:home.getApiUrl('HomeSchoolContact/LerningPath/GraspAnalyzeMonthList'),
	    dataType:'json',
	    data:{"OpenId":opid,"AppId":apid},
	    success:function(dt){
	        home.checkBind(dt);
	
	        if(!dt.length){
	            nodata.init('container','暂无当月弱项信息');
	            return;
	        }
	        
	        var message={"data":[]};
	        for(var i=0;i<dt.length;i++){
	            message.data[i]={
	                "id":dt[i],
	                "name":dt[i]
	            }
	        }
	
	        sele('date1',message,function(name){
	            seleName=name;
	
	        },function(){
	            if(seleId.length){
	                cont(seleId[0],seleId[1],seleName);
	            }
	        },'dt');
	
	    }
	});
	
	//生成下拉框
	
	//页面主体显示内容
	function cont(gid,sid,month){
	        var ur=home.getApiUrl('HomeSchoolContact/LerningPath/GraspAnalyze');
	        var message={
	            "OpenId":opid,
	            "AppID":apid,
	            "CurrentBigGrade":gid,
	            "CurrentSubject":sid,
	            "month":month,
	        };
	        $.ajax({
	            type:'post',
	            url:ur,
	            dataType:'json',
	            data:message,
	            success:function(data){
	                if(!data.N){
	                    nodata.init('user','暂无当月弱项信息');
	                    return ;
	                }
	                if(data.OK){
	                    $('.user-name').html(data.N.StudentName);
	                    $('.user-subject').html(data.N.SubjectName);
	                    $('.user-month').html(data.N.DefaultMonthDesc);
	                    $('.konwpoint').remove();
	                    $.each(data.N.Top10List,function(index,item){
	                            var rate=parseInt(item.rate * 100)+'%';
	                             var name=item.name+'（'+rate+'）';
	                            $('.user').append('<li class="konwpoint"><p>'+name+'</p><div class="progress"><p></p></div></li>');
	                            $('.progress > p').eq(index).css({width:rate});
	                    });
	                }
	
	            }
	        });
	}


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDE0MTA3ODFmYWUyNmM2OGRmOGY/ODNhNyoqKioqKioqKioqIiwid2VicGFjazovLy8uL2RlcC91dGlsL3V0aWwuanM/MjIyMSoqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvbm8tZGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvdHBsL25vLWRhdGEtdHBsLnRwbCIsIndlYnBhY2s6Ly8vLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qcz84OTY2KioqKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvY3NzL25vLWRhdGEuY3NzP2I2MzIqKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvY3NzL25vLWRhdGEuY3NzIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanM/ZGEwNCoqKioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2ltZy9uby1kYXRhLnBuZyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCoqKioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9tb2NrLXNlbGVjdC5qcz9iNDI3KioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9jc3MvbW9jay1zZWxlY3QuY3NzPzhhMGEqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9jc3MvbW9jay1zZWxlY3QuY3NzPzEzOTQqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2ltZy9hcnJvdy1ib3R0b20ucG5nP2Y3ZjkqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2ltZy9hcnJvdy10b3AucG5nP2U2MmMqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9tb2NrLXNlbGVjdC10cGwudHBsP2Y3ZGUqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9zZWxlY3QtdWwtdHBsLnRwbD8zYzQ1KioiLCJ3ZWJwYWNrOi8vLy4vanMvbW9udGh3ZWFrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxj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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVSwyQkFBMkI7QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUI7QUFDckIscUJBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQThELFdBQVc7QUFDekUsc0JBQXFCO0FBQ3JCOztBQUVBO0FBQ0EsVUFBUztBQUNUIiwiZmlsZSI6Im1vbnRod2Vhay5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9tZmctd2VjaGF0L2J1bmRsZS9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDAxNDEwNzgxZmFlMjZjNjhkZjhmXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzIwLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgc2NyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gJChkb2N1bWVudCkuaGVpZ2h0KCk7XHJcbiAgICAgICAgdmFyIHdpbmRvd0hlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICBpZihzY3JvbGxUb3AgKyB3aW5kb3dIZWlnaHQgPT0gc2Nyb2xsSGVpZ2h0KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGdldFN1YmplY3ROYW1lOmZ1bmN0aW9uKGlkKXtcclxuXHJcbiAgICAgICAgdmFyIHN1YmplY3RJZFN0ciA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChpZCkge1xyXG4gICAgICAgICAgICBjYXNlIFwiMDFcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi6K+t5paHXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjAyXCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuaVsOWtplwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwM1wiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLoi7Hor61cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDRcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi54mp55CGXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA1XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuWMluWtplwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwNlwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLlnLDnkIZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDdcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5Y6G5Y+yXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA4XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuaUv+ayu1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwOVwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLnlJ/nialcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMTRcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5aWl5pWwXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3ViamVjdElkU3RyO1xyXG4gICAgfSxcclxuICAgIGdldFN0YWdlU3RyOiBmdW5jdGlvbiAoc3RhZ2VJZCkge1xyXG4gICAgICAgIGlmKCFzdGFnZUlkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLliJ3kuK1cIjtcclxuICAgICAgICAgICAgcmV0dXJuIHN1YmplY3RJZFN0cjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHN0YWdlSWRTdHIgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhZ2VJZCkge1xyXG4gICAgICAgICAgICBjYXNlIFwieFwiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi5bCP5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIuWIneS4rVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnXCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLpq5jkuK1cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGFnZUlkU3RyO1xyXG4gICAgfSxcclxuICAgIGdvX21lbnU6ZnVuY3Rpb24oY29uSWQpe1xyXG4gICAgICAgIHZhciBjb249ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uSWQpO1xyXG4gICAgICAgIHZhciBpbWc9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnaWQnLCdtZW51Q29udHInKTtcclxuICAgICAgICBpbWcuc3JjPScuLi9idW5kbGUvaW1nL2JvdHRvbS15dWFuLXNob3cucG5nJztcclxuICAgICAgICBjb24uYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICB2YXIgbWVudUNvbnRyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51Q29udHInKTtcclxuICAgICAgICBtZW51Q29udHIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsbWVudUJvZHksZmFsc2UpO1xyXG4gICAgICAgIGZ1bmN0aW9uIG1lbnVCb2R5KCl7XHJcbiAgICAgICAgICAgIHZhciBtZW51U2hvdz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudVNob3cnKTtcclxuICAgICAgICAgICAgdmFyIGg9d2luZG93LmlubmVySGVpZ2h0K1wicHhcIjtcclxuICAgICAgICAgICAgaWYobWVudVNob3cpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHQ9bWVudVNob3cuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zdHVkeS1zaG93XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGlmKCB0ID09ICdkaXNwbGF5OiBub25lOycpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc3R1ZHktc2hvdzFcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPVwiLi4vYnVuZGxlL2ltZy9tZW51Mi5wbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb24uc2V0QXR0cmlidXRlKCdzdHlsZScsJ2hlaWdodDonK2grJyxvdmVyZmxvdzpoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL2JvdHRvbS15dWFuLXNob3cucG5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2hvdz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVTaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCdkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5pbm5lckhUTUw9JzxhIGhyZWY9XCJhZnRlcmNsYXNzam9iLmh0bWxcIiBjbGFzcz1cImt0eGFcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcveHVlYW4ucG5nXCIvPjwvYT48YSBocmVmPVwiaG9tZXdvcmstbGlzdC5odG1sXCIgY2xhc3M9XCJreGpsXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppbHUucG5nXCI8L2E+PGEgaHJlZj1cIndyb25nLWdhdGhlci5odG1sXCIgIGNsYXNzPVwiY3RqalwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9qaWppbi5wbmdcIj48L2E+PGEgaHJlZj1cIm1vbnRod2Vhay5odG1sXCIgY2xhc3M9XCJteXJ4XCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3J1b3hpYW5nLnBuZ1wiPjwvYT4nO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaG93KTtcclxuICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL21lbnUyLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgY29uLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCdoZWlnaHQ6JytoKycsb3ZlcmZsb3c6aGlkZGVuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHNob3dDb25maXJtOmZ1bmN0aW9uKG1zZyxjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICB2YXIgbGF5ZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBsYXllci5jbGFzc05hbWU9XCJsYXllclwiO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGF5ZXIpO1xyXG4gICAgICAgIHZhciBjb25maXJtPSc8ZGl2IGNsYXNzPVwicG9wY29uZmlybVwiPic7XHJcbiAgICAgICAgY29uZmlybSs9JzxkaXYgY2xhc3M9XCJ0aXRsZVwiPic7XHJcbiAgICAgICAgY29uZmlybSs9JzxpIGNsYXNzPVwiaWNvbi1jbG9zZVwiPjwvaT4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgPC9kaXY+JztcclxuICAgICAgICBjb25maXJtKz0nIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+Jyttc2crJyA8L2Rpdj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgPGRpdiBjbGFzcz1cImZvb3RcIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgIDxpbnB1dCBjbGFzcz1cInBvcGJ0biBidG5vayBjb2xvci1ncmVlblwiIHR5cGU9XCJidXR0b25cIiAgdmFsdWU9XCLnoa7lrppcIi8+JztcclxuICAgICAgICBjb25maXJtKz0nICA8aW5wdXQgY2xhc3M9XCJwb3BidG4gYnRuY2FuY2VsIGNvbG9yLWdyZWVuXCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5Y+W5raIXCIvPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgIDwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChjb25maXJtKTtcclxuICAgICAgICAvLyQoJy5wb3Bjb25maXJtJykuY3NzKCd0b3AnLChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0kKCcucG9wY29uZmlybScpLmhlaWdodCgpKS8yKTtcclxuICAgICAgICAkKFwiLmJ0bm9rXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAgICQoXCIuYnRub2tcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJChcIi5sYXllclwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJChcIi5wb3Bjb25maXJtXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5idG5jYW5jZWwsLmljb24tY2xvc2VcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJChcIi5sYXllclwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJChcIi5wb3Bjb25maXJtXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v5L+h5oGv5o+Q56S65qGGXHJcbiAgICBzaG93UG9wTXNnOmZ1bmN0aW9uIChtc2csdHlwZSkge1xyXG4gICAgICAgIHZhciBodG1sPVwiXCI7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIGh0bWw9JzxkaXYgY2xhc3M9XCJwb3Btc2dcIj48ZGl2IGNsYXNzPVwiY29udGVudFwiPjxpbWcgc3R5bGU9XCJ3aWR0aDoyMiUgXCIgc3JjPVwiLi4vYnVuZGxlL2ltZy9sb2dpbi1zdWNlc3MucG5nXCI+PHA+Jyttc2crJzwvcD48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIGh0bWw9JzxkaXYgY2xhc3M9XCJwb3Btc2dcIj48ZGl2IGNsYXNzPVwiY29udGVudFwiPjxpbWcgc3R5bGU9XCJ3aWR0aDoyMiUgXCIgc3JjPVwiLi4vYnVuZGxlL2ltZy9sb2dpbi10YW5oYW8ucG5nXCI+PHA+Jyttc2crJzwvcD48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBodG1sPSc8ZGl2IGNsYXNzPVwicG9wbXNnXCI+PGRpdiBjbGFzcz1cImNvbnRlbnRcIj48cD4nK21zZysnPC9wPjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgLy92YXIgaHRtbD0nPGRpdiBjbGFzcz1cInBvcG1zZ1wiPjxkaXYgY2xhc3M9XCJjb250ZW50XCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2xvZ2luLXN1Y2Vzcy5wbmdcIj48cD4nK21zZysnPC9wPjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgJCgnLnBvcG1zZycpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgJCgnLnBvcG1zZycpLmNzcygnbGVmdCcsKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggIC0kKCcucG9wbXNnJykud2lkdGgoKSkvMik7XHJcbiAgICAgICAgJCgnLnBvcG1zZycpLmNzcygndG9wJywoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtJCgnLnBvcG1zZycpLmhlaWdodCgpKS8yKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7JCgnLnBvcG1zZycpLnJlbW92ZSgpO30sMTAwMCk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5bmjqXlj6N1cmwg5aaC6I635Y+Wb3BlbmlkICAgZ2V0QXBpVXJsKCdBY2NvdW50L0dldE9wZW5JRCcpXHJcbiAgICBnZXRBcGlVcmw6ZnVuY3Rpb24oYWN0aW9uKXtcclxuICAgICAgICAvL+e6v+S4i+a1i+ivlVxyXG4gICAgICAgLy92YXIgYmFzZXVybD0naHR0cDovLzE5Mi4xNjguMTgwLjE1Ojg5OTgvJztcclxuICAgICAgICAvL+e6v+S4iua1i+ivlVxyXG4gICAgICAgLy92YXIgYmFzZXVybD0naHR0cDovLzE5Mi4xNjguMTgwLjE1Ojg5OTcvJztcclxuXHJcbiAgICAgICAgLy/nlJ/kuqfnjq/looNcclxuICAgICAgIC8vdmFyIGJhc2V1cmw9J2h0dHA6Ly90ZXN0aW5nLm1vZmFuZ2dlLmNvbS8nO1xyXG4gICAgICAgdmFyIGJhc2V1cmw9J2h0dHA6Ly9sb2NhbGhvc3Q6ODk5Ny8nO1xyXG4gICAgICAgIHJldHVybiBiYXNldXJsK2FjdGlvbjtcclxuICAgIH0sXHJcbiAgICAvL+iwg+eUqGFwaeaIkOWKn+WQju+8jOWFiOiwg+eUqOatpOaWueazle+8jOWIpOaWreeUqOaIt+aYr+WQpuW3sue7j+e7keWumu+8jOiLpeacque7keWumu+8jOi3s+i9rOWIsOe7keWumumhtVxyXG4gICAgY2hlY2tCaW5kOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGlmKCFkYXRhLk9LKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLkNvZGUgPT0gMSB8fCBkYXRhLkNvZGUgPT0gMiB8fCBkYXRhLkNvZGUgPT0gNCB8fCBkYXRhLkNvZGUgPT0gMTEgfHwgZGF0YS5Db2RlID09IDEyIHx8IGRhdGEuQ29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImJpbmRJbmZvLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlk9wZW5JZFxyXG4gICAgZ2V0T3BlbklkOmZ1bmN0aW9uKGFwcGlkLGFwcHNlY3JldCxjb2RlKXtcclxudmFyIG9wZW5pZDtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGFzeW5jOmZhbHNlLFxyXG4gICAgICAgICAgICB1cmw6dGhpcy5nZXRBcGlVcmwoJ0FjY291bnQvR2V0T3BlbklEJyksXHJcbiAgICAgICAgICAgIC8vIGRhdGEgdG8gYmUgYWRkZWQgdG8gcXVlcnkgc3RyaW5nOlxyXG4gICAgICAgICAgICBkYXRhOiB7QXBwSUQ6YXBwaWQsQXBwU2VjcmV0OmFwcHNlY3JldCxDb2RlOmNvZGV9LFxyXG4gICAgICAgICAgICAvLyB0eXBlIG9mIGRhdGEgd2UgYXJlIGV4cGVjdGluZyBpbiByZXR1cm46XHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIC8vdGltZW91dDogMzAwLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5PSylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5pZD1kYXRhLklEO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgLy9hbGVydCgnQWpheCBlcnJvciEnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gb3BlbmlkO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+WdXJs5Y+C5pWwXHJcbiAgICBnZXRRdWVyeVN0cmluZzpmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoXnwmKVwiICsgbmFtZSArIFwiPShbXiZdKikoJnwkKVwiLCBcImlcIik7XHJcbiAgICB2YXIgciA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLm1hdGNoKHJlZyk7XHJcbiAgICBpZiAociAhPSBudWxsKSByZXR1cm4gdW5lc2NhcGUoZGVjb2RlVVJJKHJbMl0pKTsgcmV0dXJuIG51bGw7XHJcbn0sXHJcblxyXG4gICAgZGF0ZUZvcm1hdDogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0KXtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHZhciBtYXAgPSB7XHJcbiAgICAgICAgICAgIFwiWVwiOiBkYXRlLmdldFllYXIoKSxcclxuICAgICAgICAgICAgXCJNXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9XHJcbiAgICAgICAgICAgIFwiZFwiOiBkYXRlLmdldERhdGUoKSwgLy/ml6VcclxuICAgICAgICAgICAgXCJoXCI6IGRhdGUuZ2V0SG91cnMoKSwgLy/lsI/ml7ZcclxuICAgICAgICAgICAgXCJtXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhlxyXG4gICAgICAgICAgICBcInNcIjogZGF0ZS5nZXRTZWNvbmRzKCksIC8v56eSXHJcbiAgICAgICAgICAgIFwicVwiOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6plxyXG4gICAgICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enklxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoLyhbeU1kaG1zcVNdKSsvZywgZnVuY3Rpb24gKGFsbCwgdCkge1xyXG4gICAgICAgICAgICB2YXIgdiA9IG1hcFt0XTtcclxuICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFsbC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdiA9ICcwJyArIHY7XHJcbiAgICAgICAgICAgICAgICAgICAgdiA9IHYuc3Vic3RyKHYubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0ID09PSAneScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gYWxsLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFsbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgfSxcclxuICAgIC8v5aSE55CG6K+V6aKY5YWs5byPIG1hdGhqYXhcclxuICAgIGluaXRNYXRoSmF4T2JqOmZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIE1hdGhKYXguSHViLlF1ZXVlKFtcIlR5cGVzZXRcIiwgTWF0aEpheC5IdWIsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKV0pO1xyXG4gICAgfSxcclxuICAgIGdldExvY2FsVGltZTogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KHZhbC5yZXBsYWNlKFwiL0RhdGUoXCIsIFwiXCIpLnJlcGxhY2UoXCIpL1wiLCBcIlwiKSwgMTApKTtcclxuICAgICAgICAgICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEgPCAxMCA/IFwiMFwiICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gZGF0ZS5nZXREYXRlKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0SG91cnMoKSA6IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgdmFyIG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpIDogZGF0ZS5nZXRNaW51dGVzKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geWVhciArIFwiLVwiICsgbW9udGggKyBcIi1cIiArIGN1cnJlbnREYXRlICsgXCIgXCIgKyBob3VycyArIFwiOlwiICsgbWludXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlumimOWei1xyXG4gICBnZXRJdGVtU3R5bGU6ZnVuY3Rpb24gKHN1YmplY3Qsc3R5bGUpIHtcclxuICAgICAgIGlmIChzdWJqZWN0ID09ICcwMycgfHwgc3ViamVjdCA9PSAnMDEnKSB7XHJcbiAgICAgICAgICAgaWYgKHN0eWxlICogMSA8IDEwMSkge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgZWxzZSBpZiAoc3R5bGUgKiAxIDwgMjAxKSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBlbHNlIGlmIChzdHlsZSAqIDEgPCAzMDEpIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICAgICB9XHJcbiAgICAgICB9XHJcbiAgICAgICBlbHNlIHtcclxuICAgICAgICAgICByZXR1cm4gc3R5bGU7XHJcbiAgICAgICB9XHJcbiAgIH1cclxuXHJcblxyXG59O1xyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC91dGlsL3V0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA2IDggOSAxMCAxMSAxMiAxMyAxNCAxNiAxNyAxOCAxOVxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8yNi5cclxuICovXHJcbnZhciBub0RhdGFUcGwgPSByZXF1aXJlKCduby1kYXRhLXRwbCcpO1xyXG5yZXF1aXJlKCcuL2Nzcy9uby1kYXRhLmNzcycpO1xyXG5cclxudmFyIF8kZWw7XHJcbnZhciBub0RhdGEgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihtc2cpe1xyXG4gICAgICAgIHZhciBwPXttc2c6bXNnfVxyXG4gICAgICAgIF8kZWwuaHRtbChub0RhdGFUcGwocCkpO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRvbSxtc2cpe1xyXG4gICAgICAgIF8kZWwgPSAkKFwiLlwiICsgZG9tKTtcclxuICAgICAgICBub0RhdGEuaW5pdChtc2cpO1xyXG4gICAgfSxcclxuXHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9uby1kYXRhLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMyA0IDkgMTIgMTMgMTQgMTYgMTcgMThcbiAqKi8iLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnZGVwL2NvbXBvbmVudC9uby1kYXRhL3RwbC9uby1kYXRhLXRwbCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZXNjYXBlPSR1dGlscy4kZXNjYXBlLG1zZz0kZGF0YS5tc2csJG91dD0nJzskb3V0Kz0nPGRpdiBjbGFzcz1cIm5vLWRhdGEtYmdcIj48L2Rpdj4gPGRpdiBjbGFzcz1cIm5vLWRhdGEtdGlwIGZvbnQtc2l6ZTEyXCI+JztcbiRvdXQrPSRlc2NhcGUobXNnIHx8ICfmmoLml6DmlbDmja4nKTtcbiRvdXQrPSc8L2Rpdj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9uby1kYXRhL3RwbC9uby1kYXRhLXRwbC50cGxcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgOSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsIi8qVE1PREpTOnt9Ki9cclxuIWZ1bmN0aW9uICgpIHtcclxuXHRmdW5jdGlvbiBhKGEsIGIpIHtcclxuXHRcdHJldHVybiAoL3N0cmluZ3xmdW5jdGlvbi8udGVzdCh0eXBlb2YgYikgPyBoIDogZykoYSwgYilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGIoYSwgYykge1xyXG5cdFx0cmV0dXJuIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEgJiYgKGMgPSB0eXBlb2YgYSwgXCJudW1iZXJcIiA9PT0gYyA/IGEgKz0gXCJcIiA6IGEgPSBcImZ1bmN0aW9uXCIgPT09IGMgPyBiKGEuY2FsbChhKSkgOiBcIlwiKSwgYVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYyhhKSB7XHJcblx0XHRyZXR1cm4gbFthXVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZChhKSB7XHJcblx0XHRyZXR1cm4gYihhKS5yZXBsYWNlKC8mKD8hW1xcdyNdKzspfFs8PlwiJ10vZywgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGUoYSwgYikge1xyXG5cdFx0aWYgKG0oYSkpZm9yICh2YXIgYyA9IDAsIGQgPSBhLmxlbmd0aDsgZCA+IGM7IGMrKyliLmNhbGwoYSwgYVtjXSwgYywgYSk7IGVsc2UgZm9yIChjIGluIGEpYi5jYWxsKGEsIGFbY10sIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmKGEsIGIpIHtcclxuXHRcdHZhciBjID0gLyhcXC8pW15cXC9dK1xcMVxcLlxcLlxcMS8sIGQgPSAoXCIuL1wiICsgYSkucmVwbGFjZSgvW15cXC9dKyQvLCBcIlwiKSwgZSA9IGQgKyBiO1xyXG5cdFx0Zm9yIChlID0gZS5yZXBsYWNlKC9cXC9cXC5cXC8vZywgXCIvXCIpOyBlLm1hdGNoKGMpOyllID0gZS5yZXBsYWNlKGMsIFwiL1wiKTtcclxuXHRcdHJldHVybiBlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnKGIsIGMpIHtcclxuXHRcdHZhciBkID0gYS5nZXQoYikgfHwgaSh7ZmlsZW5hbWU6IGIsIG5hbWU6IFwiUmVuZGVyIEVycm9yXCIsIG1lc3NhZ2U6IFwiVGVtcGxhdGUgbm90IGZvdW5kXCJ9KTtcclxuXHRcdHJldHVybiBjID8gZChjKSA6IGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGgoYSwgYikge1xyXG5cdFx0aWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGIpIHtcclxuXHRcdFx0dmFyIGMgPSBiO1xyXG5cdFx0XHRiID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgayhjKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR2YXIgZCA9IGpbYV0gPSBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgYihjLCBhKSArIFwiXCJcclxuXHRcdFx0fSBjYXRjaCAoZCkge1xyXG5cdFx0XHRcdHJldHVybiBpKGQpKClcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBkLnByb3RvdHlwZSA9IGIucHJvdG90eXBlID0gbiwgZC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGIgKyBcIlwiXHJcblx0XHR9LCBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpKGEpIHtcclxuXHRcdHZhciBiID0gXCJ7VGVtcGxhdGUgRXJyb3J9XCIsIGMgPSBhLnN0YWNrIHx8IFwiXCI7XHJcblx0XHRpZiAoYyljID0gYy5zcGxpdChcIlxcblwiKS5zbGljZSgwLCAyKS5qb2luKFwiXFxuXCIpOyBlbHNlIGZvciAodmFyIGQgaW4gYSljICs9IFwiPFwiICsgZCArIFwiPlxcblwiICsgYVtkXSArIFwiXFxuXFxuXCI7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJvYmplY3RcIiA9PSB0eXBlb2YgY29uc29sZSAmJiBjb25zb2xlLmVycm9yKGIgKyBcIlxcblxcblwiICsgYyksIGJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBqID0gYS5jYWNoZSA9IHt9LCBrID0gdGhpcy5TdHJpbmcsIGwgPSB7XHJcblx0XHRcIjxcIjogXCImIzYwO1wiLFxyXG5cdFx0XCI+XCI6IFwiJiM2MjtcIixcclxuXHRcdCdcIic6IFwiJiMzNDtcIixcclxuXHRcdFwiJ1wiOiBcIiYjMzk7XCIsXHJcblx0XHRcIiZcIjogXCImIzM4O1wiXHJcblx0fSwgbSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGEpIHtcclxuXHRcdFx0cmV0dXJuIFwiW29iamVjdCBBcnJheV1cIiA9PT0ge30udG9TdHJpbmcuY2FsbChhKVxyXG5cdFx0fSwgbiA9IGEudXRpbHMgPSB7XHJcblx0XHQkaGVscGVyczoge30sICRpbmNsdWRlOiBmdW5jdGlvbiAoYSwgYiwgYykge1xyXG5cdFx0XHRyZXR1cm4gYSA9IGYoYywgYSksIGcoYSwgYilcclxuXHRcdH0sICRzdHJpbmc6IGIsICRlc2NhcGU6IGQsICRlYWNoOiBlXHJcblx0fSwgbyA9IGEuaGVscGVycyA9IG4uJGhlbHBlcnM7XHJcblx0YS5nZXQgPSBmdW5jdGlvbiAoYSkge1xyXG5cdFx0cmV0dXJuIGpbYS5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIildXHJcblx0fSwgYS5oZWxwZXIgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0b1thXSA9IGJcclxuXHR9LCBtb2R1bGUuZXhwb3J0cyA9IGFcclxufSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDggOSAxMSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbm8tZGF0YS5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbm8tZGF0YS5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9uby1kYXRhLmNzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9jc3Mvbm8tZGF0YS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgOSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm5vLWRhdGEtYmd7XFxyXFxuICAgIG1hcmdpbjogNDclIGF1dG8gNSU7XFxyXFxuICAgIGhlaWdodDogNTdweDtcXHJcXG4gICAgd2lkdGg6IDU4cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIHJlcXVpcmUoXCIuLi9pbWcvbm8tZGF0YS5wbmdcIikgKyBcIikgY2VudGVyIGNlbnRlciBuby1yZXBlYXQ7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogNThweCA1N3B4O1xcclxcbn1cXHJcXG4ubm8tZGF0YS10aXB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgY29sb3I6ICM5OTk5OTk7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9kZXAvY29tcG9uZW50L25vLWRhdGEvY3NzL25vLWRhdGEuY3NzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMyA0IDkgMTIgMTMgMTQgMTYgMTcgMThcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA3IDkgMTEgMTIgMTMgMTQgMTYgMTcgMThcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJVUFBQUNIQ0FZQUFBQTRFcG8zQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUE0QnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU15MWpNREV4SURZMkxqRTBOVFkyTVN3Z01qQXhNaTh3TWk4d05pMHhORG8xTmpveU55QWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rOXlhV2RwYm1Gc1JHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEcGhZV05oTXpneVpDMDNaVGRtTFRSbE1ETXRZV1F3TXkxbFlUSmtZMlV4TmpGaE1XUWlJSGh0Y0UxTk9rUnZZM1Z0Wlc1MFNVUTlJbmh0Y0M1a2FXUTZORVUwTVVRMk5FWXpNakV6TVRGRk5rRkVOemc1UkRVME9FTXdOa1JEUWtZaUlIaHRjRTFOT2tsdWMzUmhibU5sU1VROUluaHRjQzVwYVdRNk5FVTBNVVEyTkVVek1qRXpNVEZGTmtGRU56ZzVSRFUwT0VNd05rUkRRa1lpSUhodGNEcERjbVZoZEc5eVZHOXZiRDBpUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5UTmlBb1YybHVaRzkzY3lraVBpQThlRzF3VFUwNlJHVnlhWFpsWkVaeWIyMGdjM1JTWldZNmFXNXpkR0Z1WTJWSlJEMGllRzF3TG1scFpEb3pOek00WkRSaU1pMWtPREUwTFRRNU5UVXRZamN4TkMwek9HTTJNamMwWWpObE9UWWlJSE4wVW1WbU9tUnZZM1Z0Wlc1MFNVUTlJbUZrYjJKbE9tUnZZMmxrT25Cb2IzUnZjMmh2Y0RvMU5EVTBZV1V5T0MwMVpUUXdMVEV4TnprdE9EUXhaaTA0Tm1VME9XUXpPVGRrTVdRaUx6NGdQQzl5WkdZNlJHVnpZM0pwY0hScGIyNCtJRHd2Y21SbU9sSkVSajRnUEM5NE9uaHRjRzFsZEdFK0lEdy9lSEJoWTJ0bGRDQmxibVE5SW5JaVB6N1lrTFFvQUFBTHdFbEVRVlI0MnV4ZFNVOGNSeGd0bXNWNHdjYllKc1liU0FRRFJra01KREV6VWFRY0xEa1NqdklIa2pQM25ITHhLWGZmdWVjZVM1RXM3RWkyNUVzdTRIaVhMV1JzdklNQnMzbkY0TlNyZEtGMmg1bXVxdTZacnByK25sVE0yQXd6UFZXdnYrOTlyNnVxcTFpSk1Edzg3UEdISDNuN21iYzhiNTh3UWx4TThmWTNiNy96OXNmUTBOQmFLVDZrcWtTRU9Pd2YrRmMwamlYREdHOC9jV0xjdHA0VW5CQkgrY05mdk8ydXJxNW16YzNOckxHeGtkWFYxYkdxcWlvYVNrTjgrUENCdlh2M2pzM1B6N1BwNldtMnVycUsvNTdqN1FRbnhxaTFwT0NFYU9RUC8vRFd0blhyVnRiZTNzNXFhMnRwUkJQR3lzb0t1M3YzTG52NThpWCsrWkMzTHpneFhpVDEvbDdDeC9zckNMRnAweWJXMGRGQmhDZ1IwSytIRHg5bTlmWDErT2RCM2s1WkdTbDRsS2pqRDg5NTJ3NUNiTisrblVhdnhGaGNYR1RqNCtONHVveDB6YVBGVzlzaXhiY2dCRmhNaENnUDBNL1FhaHpiZVB2T3h2U1Jsd2RLS0I4YUdocmswMitTZXMrYUJJOHZoeDhRbURwWVdscGlNek16YkhsNVdRZ29xT3lzNmdRTThPN2R1NE1ESFlsdDI3YXgyZGxaUEIyd1NsTndQWUgzbWVHdHFidTdtMjNac2tWSlFVOU9UcktGaFFVNjNVUFlzV01IYTIxdFZSTHFyMSsvWnJkdTNSTG5GMitOU1JoYVNVVUttRlZObnVleHpaczNLeEhpenAwNzdPM2J0d3hlUmxkWGx5aGY0V2ZnUGJLR3RiVTE0VCtnekx4OSs3WTRVZEEvcURCOHpWQVE2Ry8wNGVycUtzTExFZDV1MkVLS1kvaUJDQkZsVUNFOTRNdURFTkFmSjA2Y1lEdDM3c3g4ZE5pN2Q2OW9QVDA5YkdSa1JGUVdFeE1UckxPek03SlBrYkx4ZWwvWHhTWkZVcWRsVHVhM0tNek56UW5UQldmQTRPQWdFU0lFUk11VEowOHllRDNvSitpdEtBUjBYQ0s2SWlsU0RLaUt6S21wS2ZIWTM5K3ZKYWl5Qkp4YzZCOEFscllHS1hKV2tJS0xUQnpSWnlxa2dKYUFNSUp1UUZna0ZCRnBYRStnbjk2OGVTT3VlVVNSeUVjWEg0K2ROa1FLWEFtdFJqcUlVc3UrVjg5Mjdkb1ZLYUN5RHZRUHl0Tmd2eFVDaEtadmVTZVNRcElneFlDcW5wQmZUbjVaUW5ISWZucjE2bFZaVTBoaXBGRFJFL0xMN2RtemgwWmNBYktmb2lKRjZLUzBJbExrZEVsQmtVS1BGSnFSWXNDZjlaWU9LZmlIdC9HSFp0VFJVUzRteE5MNzkrK0ZlR3BxYXFJUlZ3REs5WnFhR2pHaEJyNU9NVWdUaTBPYVdLbEZDaEVsVkV3cnlYYUl6Q3k2bGlaQW42Sy9WRk5JSUZya1V5Y0ZpVXo3VWtpYXBEaEdJclB5S2hCalVuQTlnY0s0bDBTbVBaRWlLUk1yVHFUb1kySWFRRzJrRVVVaTB4eTRGcUlxTnBNeXNlS1FRdHVmSUpGWlZyR1pzNW9VSkRKVFNTR3BSSXE4YXVWQklqTVpVbWhHQ21NVHkraVArSWZ0NHcvN1ZVd3JFcG5salJSSm1GaGVuQ2lCQTRqU0NFR1JTUk5xeklBNW14RDBtTGFIUytrYTBTSmZUbEpvK3hPb09ud0dFMktJelhLWVdLYWtVSFl5S1hXVVA0WEVyVUMwU2NIMUJHYlM5T3RHQ2lKRitjUm1YQlBMSkZKZ3E0RjZHQ3FZWEVxVlIzbWdZM2ZITmJGTVNLR3NKekFuRTQyY3pGVEZacTRjcEZEMkoyU29JNUdack5nczlVd3NFMUo4VFhvaUhXQlhJSk1LUk5mRTBub3hmM01jVlR1ZWsybGxkd1VTeDhUU2pSUURvUThra1ptUzJGUlpuVzlxWWhtUmdrUm1lbUlUMHhRTXhPYUFGYVFna1psK2FXcGFnU2lUZ3V1SmFpa3l5Y2wwZ3hTbUpwWk9wT2dCK1VMR0NKSENZckZwYW1McGtFSnIreUlTbWRhSnpWeXFwQ0NSYVkvWU5ER3hkRWh4VEZWUGtNZ3NUN1FvMVV3c3BSZjVJcVZMTlZLUW5pZ3RkSnhORXhQTDA0a1NFQzA2cGhXUkl2MEtKSFFpNTVNa2hiSS9RYVFvSHltd0s1Q20yQnhJa2hUYUloTlg5VWhrbGdiWVZSQnpXVXAxR1QyU0ZQN0dxZG9pVXk2ako2UXZOblZOTEpWSUFZRzVBK1dsam1sRi9rUnBVVW9UUzRVVTY2bEQ1YzQrcENlc0Y1dTVKRWloUFAyT0lrVTZwRkFSbXpvbWxsYWtJSkZwbjlnRUlWQ0Y2RlFnVVNhV0Z5RXlZWGowcUlwTUdTVklaTnFuSzNSTXJLaElnVXZsSGhpcE1zaVVPdXdsUlNoYTVPT1FRa3RQMEpZRDlwYWw0UlFTaHhSNUVwbjJSd29EWnpNWE4zMlF5TFFVMEhud0gxVEZwcXFKNVJVUm1aK0NqREN0ZEtiems4aTAxNjlRTmJHS1JRcnhSeW9icDFMcWNGSnM1b3hKUVNLenNzU21pb21WR0Nrb1VqZ25OZ3VhV0Y0QlBZRmJCaDROTVl0RXBxVmlFOFlVQ0pHVWlWVW9VbUJUa21vc2ZWZTVOeWFKVEdkMVJWNkhGTXJiRFZEcWNLc0NDYWNRSFZLUWs1bmhDcVFRS1l3Vy9oQXAwbzBVcW1JenlzVHlOaENaaC9oRGkrckdxVUdSS1hkYUlaUVhPSGwxeEdhVWllVVZLa1ZCQ0pYTjFlVkJ5TjNtQ2U2bkVDOHBmNEpTaHgwcEpBa1R5MHRLVDFEbDRXeWsrSitKNVlYMEJPN20wbWRTamxLa3NJTVVXQWVDOVNCUktHWmloU01GYnY5VUIyMmdjdHRwYk1TT0Rka2hNb2tVNlFJYUVFMzFNbm9vV3VTTGtTSm5FaVZJWkxxZlFvcVJna3lyQ2lDRndmUzhYR1NrSUpIcGRnV2lHaWtLbVZoZVFHUzI4SWRXNkFNcVI5MG1oYXJZTEdSaWVlSFVvWEszSHhLWkZTazJjeHVSd2loMWtNaTBDM0krUzlROVREZElJUnRHQ2kwbkUxRkNrb0pnRDZTVmdKdmI2bFlnMHNUeWZEMkJVLzFMSFZMSW5FVlJ3aTdJeWtObGNwU1VDMkVUUzBhS3o1R1NNTUFxZTFBRXliQzh2RXdqWVFtUU1wNC9mNzZ1TDFRUk5yRThrOVFSekVWVFUxTktXK3dRU28rclY2K0tDQTVDcURqU0c2V1FXS1RBaDRJWU9JakxseS9UaUtTTUJ3OGVDRklBKy9idDAvcmJjQVZpVElyZ2g5KzRjWU9OajQvVHlLUUFuSlFndy9uejUwVXBpdW9EdS9McUlHeGkxZkFmbUM3VllVS0tob1lHc2RIbjlQUTB1M2p4SXB1ZG5XVjlmWDFhb1N2TFFOcDk5dXlaS085VnF3VUp2SDVoWVlFOWZQandJM3VncmExTit6aWtpZVhMZ0FHb1JhMk5VOE00Y09DQVlDZ0V6clZyMTlqTm16ZFpTMHVMMkdsRm1tQWd5VVpMRC9GN3FGK1lYNWpLcDdJOHNSS0FrMmgwZEpROWV2UW9rZmREcFlHb0hjZEVSRUR3U1pHcllaclQrY1BBUUI0NmRFaXc5UEhqeDRLMUpsOFdVYWUzdDVkMWRYVlZOQ0dndjhiR3h0WW4yRUlVWWxNWUZSYzUzTzhnQThZTmZSZjNoTUw3SU5KL0ZDbDBVMGNZaUF4b1lCdHFaWmhiOG9zWENvMzRQVjZIc25acGFZbGR1blNKVFV4TXNPUEhqMWRrQ2dJaEVDRUFSRWFjM2JaOHowQUoyd2RTOU92V3RjV0FOS1RxZFFURjBzek1qSWcwaURMbnpwMWpnNE9EMm1lUHpZQjJRSVFBRUZsdHU3SWNJT2N1OUxxNFpLcHlpK3BTQVlNUHdkcloyU2wwemRPblQ5bVZLMWNxS2tvZ1FpQXlJa0xZT05VZ21INjhvQUsxSVlUaExBSkFDbmw5eFhVZ25UNTU4a1E4Mzc5L3YvWEhhMTE4UnAyTmlnU1g1dS9mdjE4UnBFQmFsR0pPOVpvRWtTSUVyRjRINE5KVkFuQXBJRTZGUjZUd0t4bDVocW1zalhTRkZIRXJ2RXlUQXRvQ0dnZFgvZnphMlZsZ25lMkxGeThvVWlTaGhHSElBRW01Zm1rQjdpV2luZXF1eFVRS2hSVGlPaWxjU3gxT2tBS2Rpa3FFUkNhUlFvUmJ1R3l3eU9FR3VwdytLRkpRQ2xuSC9QeThFTXZ5YWpDUmdranhVWlJ3YVZxQTFhU1FGY2pjM0p6eTRoWVNtUlZPQ3BSdzh1cXR0SXFKRkJrbmhjc3B4RVhUaWtoUkJqM2htbW5sRENsd2xrRzlZNXFmUFBNb2RXU2NGRkR0TXZ5NnBDdGNOSzJjSVVVd2hkeTdkODhaUFNFbjFSQXBTZ1JNdkVIRXdEUTlGOXpONjlldkN5Y1docFZMcHBWVHBNQnNKYm5GODRVTEY1UzM3MGtEaUJCeUdTWFd2N2dJWjZaTFk5RVJsRHlXQTV3NWM4YTZhZ1F6MHJFUWFtUmtSRHhIZEpNenlGeURNN1VTSnQxMGRIU0lOYXNneHRtelowWDB3RVRZTkJVK0NMQzR1Q2ltRHNxOUlVeVg3eEVwRElCSTBkM2RMVUkwMW9sZ1ZwWk5NN09RNXBBeVhOOHQwTGx0YUJBeERoNDhLRG9mWnlqMFJacnpMZVR5UFVRclZFbVZzQjdXMmIySjRCSWliOU9ON0RJc05BbEVDZ0tSZ2tDa0lCQXBDRVFLQXBHQ1FLUWdaSWNVbGJDNm01QWNLY1ErZVM0dnpTUEVSMkN6dWpjZ3hWMDhVNzN2RktFeUVaaWpNZzVTbk1VelhIVWtaQmVCOFI4QktZWjVXOEdXdmxpSlJjZ2VNTzRZZi9BQWZQQ0dob2FRUGs3amZ5WW5KNGtZR1NRRXh0M0hhZkJCWGpvL3hkdVJ0YlcxSHpCakdpL0VQczlZc29lNUFsblpNenNMUUpXSjJlYlFFRWdaZm9RQS92UjV3TlpIZTNoNEdIdjUvY2JiTDd6VlV2ZGxCaXQrcGpqRm84VEtSNlFJa0tPZFB3eng5ajM3NzVZUDlkUnZGUWZZRUxoQnl3aUczSmNRNi9oWGdBRUFObzFWSStZWnNmUUFBQUFBU1VWT1JLNUNZSUk9XCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2ltZy9uby1kYXRhLnBuZ1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNCA5IDEyIDEzIDE0IDE2IDE3IDE4XG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDcgOSAxMSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8yMC5cclxuICovXHJcbnJlcXVpcmUoJy4vY3NzL21vY2stc2VsZWN0LmNzcycpO1xyXG52YXIgc2VsZWN0VHBsID0gcmVxdWlyZSgnbW9jay1zZWxlY3QtdHBsJyk7XHJcbnZhciBzZWxlY3RVbFRwbCA9IHJlcXVpcmUoJ3NlbGVjdC11bC10cGwnKTtcclxuXHJcbmZ1bmN0aW9uIG1vY2tTZWxlY3QoZG9tLCBkYXRhLCBjYWxsYmFja0lkLCBjYWxsYmFjaywgaWQsIGNhbGxCYWNrRmxhZyl7XHJcbiAgICB0aGlzLmRvbSA9ICQoXCIuXCIgKyBkb20pO1xyXG4gICAgdGhpcy5kYXRhID0gZGF0YTtcclxuICAgIHRoaXMuY2FsbGJhY2tJZCA9IGNhbGxiYWNrSWQ7XHJcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2s7XHJcbiAgICB0aGlzLmlkID0gJChcIiNcIiArIGlkKTtcclxuICAgIHRoaXMuY2FsbEJhY2tGbGFnID0gY2FsbEJhY2tGbGFnO1xyXG4gICAgdGhpcy5pbml0RG9tKCk7XHJcbiAgICB0aGlzLmluaXRCdG5zKCk7XHJcbn1cclxubW9ja1NlbGVjdC5wcm90b3R5cGUgPSB7XHJcbiAgICBpbml0RG9tOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuZG9tLmh0bWwoc2VsZWN0VHBsKHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIHRoaXMuaWQuaHRtbChzZWxlY3RVbFRwbCh0aGlzLmRhdGEpKTtcclxuICAgICAgICB0aGlzLmNhbGxiYWNrSWQodGhpcy5kb20uZmluZChcIi5uYW1lXCIpLmF0dHIoJ2RhdGEtaWQnKSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbEJhY2tGbGFnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbEJhY2tGbGFnKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuZG9tLm9mZnNldCgpO1xyXG4gICAgICAgIHRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICdsZWZ0JzogMCxcclxuICAgICAgICAgICAgJ3RvcCc6IG9mZnNldC50b3AgKyA0MlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogJCh3aW5kb3cpLmhlaWdodCgpIC0gb2Zmc2V0LmhlaWdodCAtIG9mZnNldC50b3BcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBpbml0QnRuczogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL+eCueWHu+aYvuekuuS4i+aLiVxyXG4gICAgICAgIHZhciB0VGhpcz0gdGhpcztcclxuICAgICAgICB0aGlzLmRvbS51bmRlbGVnYXRlKCkuZGVsZWdhdGUoJy5uYW1lLXdyYXAnLCAndGFwJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2codFRoaXMuZG9tKTtcclxuICAgICAgICAgICAgaWYgKCEodFRoaXMuZG9tLmZpbmQoJy5uYW1lLXdyYXAnKS5oYXNDbGFzcygnYWN0aXZlJykpKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vY2stc2VsZWN0XCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5maW5kKFwiLm5hbWUtd3JhcFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vY2stdWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5kb20uZmluZChcIi5tb2NrLXNlbGVjdFwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuc2hvdygpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIi5tb2NrLXVsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICQoXCIubW9jay1zZWxlY3RcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoXCIubmFtZS13cmFwXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuZG9tLmZpbmQoXCIubW9jay1zZWxlY3RcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v5LiL5ouJ5raI5aSxXHJcbiAgICAgICAgdGhpcy5pZC51bmRlbGVnYXRlKCkuZGVsZWdhdGUoJ2xpJywgJ3RhcCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICB0VGhpcy5pZC5maW5kKFwibGkuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlXCIpLmZpbmQoXCIucmlnaHRcIikucmVtb3ZlQ2xhc3MoXCJkaXNwbGF5LW5vbmVcIik7XHJcbiAgICAgICAgICAgIHRUaGlzLmRvbS5maW5kKCcubmFtZS13cmFwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoXCIubmFtZVwiKS5odG1sKCQodGhpcykuZmluZChcIi5pdGVtLW5hbWVcIikuaHRtbCgpKS5hdHRyKFwiZGF0YS1pZFwiLCAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpKTtcclxuICAgICAgICAgICAgdFRoaXMuZG9tLmZpbmQoXCIubW9jay1zZWxlY3RcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICB0VGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICB0VGhpcy5jYWxsYmFja0lkKHRUaGlzLmRvbS5maW5kKFwiLm5hbWVcIikuYXR0cignZGF0YS1pZCcpKTtcclxuICAgICAgICAgICAgaWYgKHRUaGlzLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5jYWxsYmFjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/kuIvmi4nmtojlpLFcclxuICAgICAgICAkKGRvY3VtZW50KS51bmJpbmQoXCIubG9jYWxcIikuYmluZChcInRhcC5sb2NhbFwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLm1vY2stdWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKCcubmFtZS13cmFwLC5tb2NrLXNlbGVjdCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb20sIGRhdGEsIGNhbGxiYWNrSWQsIGNhbGxiYWNrLCBpZCwgY2FsbEJhY2tGbGFnKXtcclxuICAgIC8qKlxyXG4gICAgICogKiDmqKHmi5/kuIvmi4nmoYbnu4Tku7ZcclxuICAgICAqIOaLv+WIsGlkXHJcbiAgICAgKiBAcGFyYW0gZG9tICAgICAgIOS4i+aLieahhueItue6p2NsYXNzXHJcbiAgICAgKiBAcGFyYW0gZGF0YSAgICAgIOS4i+aLieaVsOaNru+8iOWkhOeQhui/h+eahOagvOW8j+S4untkYXRhOiBbe2lkOicnLG5hbWU6Jyd9LHt9LHt9XX3vvIks5Y+m5aSW5rOo5oSPb3JkZXJOdW0gPiAwID8gK29yZGVyTnVtIDogJydcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja0lkICAgICAg6YCa6L+H5Zue6LCD5Lyg57uZ5Liq5Lq66aG16Z2i6ZyA6KaB55qEaWRcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAgICAgICAg5Liq5Lq66aG16Z2i55qE5Zue6LCD5aSE55CGXHJcbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgIOWtmOaUvuS4i+aLiemAiemhueeahGlkXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2tGbGFn77yI6Z2e5b+F5Lyg77yJICDlkYror4npobXpnaLmqKHmnb/muLLmn5PlrozkuobmnInkuoZpZOetieWPguaVsCDlj6/ku6XmuLLmn5PkuKrkurrpobXpnaLkuoZcclxuICAgICAqL1xyXG4gICAgcmV0dXJuIG5ldyBtb2NrU2VsZWN0KGRvbSwgZGF0YSwgY2FsbGJhY2tJZCwgY2FsbGJhY2ssIGlkLCBjYWxsQmFja0ZsYWcpO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L21vY2stc2VsZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDkgMTIgMThcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL21vY2stc2VsZWN0LmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9tb2NrLXNlbGVjdC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9tb2NrLXNlbGVjdC5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2Nzcy9tb2NrLXNlbGVjdC5jc3NcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxOFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1vY2stc2VsZWN0e1xcclxcbiAgICBsaW5lLWhlaWdodDogNDJweDtcXHJcXG4gICAgaGVpZ2h0OiA0MnB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlcjpub25lO1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmV7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxufVxcclxcbi5tb2NrLXVse1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgIHotaW5kZXg6IDEwMDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOWQ5ZDk7XFxyXFxuICAgIHdpZHRoOiA5My42JTtcXHJcXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcHtcXHJcXG4gICAgY29sb3I6ICNmZmY7XFxyXFxuICAgIGhlaWdodDogNDJweDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5iZ3tcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBoZWlnaHQ6IDZweDtcXHJcXG4gICAgd2lkdGg6IDEzcHg7XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAubmFtZS13cmFwIC5iZ3tcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ltZy9hcnJvdy1ib3R0b20ucG5nXCIpICsgXCIpIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEzcHggNnB4O1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmV7XFxyXFxuICAgIGNvbG9yOiAjMDBkNTM1O1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmUgLmJnIHtcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ltZy9hcnJvdy10b3AucG5nXCIpICsgXCIpIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEzcHggNnB4O1xcclxcbn1cXHJcXG4ubW9jay11bCBsaXtcXHJcXG4gICAgbWFyZ2luOjA7XFxyXFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICBoZWlnaHQ6IDQycHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xcclxcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2Q5ZDlkOTtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGkgLnJpZ2h0e1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBmbG9hdDogcmlnaHQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMXJlbTtcXHJcXG4gICAgcGFkZGluZzogMTZweCAwO1xcclxcbiAgICBoZWlnaHQ6IDlweDtcXHJcXG4gICAgd2lkdGg6IDE0cHg7XFxyXFxufVxcclxcbi5tb2NrLXVsIGxpLmFjdGl2ZSAucmlnaHR7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZTtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGkuYWN0aXZle1xcclxcbiAgICBjb2xvcjogIzAwZDUzNTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvY3NzL21vY2stc2VsZWN0LmNzc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCA5IDEyIDE4XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQjRBQUFBUENBWUFBQUR6dW4rY0FBQUFHWFJGV0hSVGIyWjBkMkZ5WlFCQlpHOWlaU0JKYldGblpWSmxZV1I1Y2NsbFBBQUFBNEJwVkZoMFdFMU1PbU52YlM1aFpHOWlaUzU0YlhBQUFBQUFBRHcvZUhCaFkydGxkQ0JpWldkcGJqMGk3N3UvSWlCcFpEMGlWelZOTUUxd1EyVm9hVWg2Y21WVGVrNVVZM3ByWXpsa0lqOCtJRHg0T25odGNHMWxkR0VnZUcxc2JuTTZlRDBpWVdSdlltVTZibk02YldWMFlTOGlJSGc2ZUcxd2RHczlJa0ZrYjJKbElGaE5VQ0JEYjNKbElEVXVNeTFqTURFeElEWTJMakUwTlRZMk1Td2dNakF4TWk4d01pOHdOaTB4TkRvMU5qb3lOeUFnSUNBZ0lDQWdJajRnUEhKa1pqcFNSRVlnZUcxc2JuTTZjbVJtUFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eE9UazVMekF5THpJeUxYSmtaaTF6ZVc1MFlYZ3Ribk1qSWo0Z1BISmtaanBFWlhOamNtbHdkR2x2YmlCeVpHWTZZV0p2ZFhROUlpSWdlRzFzYm5NNmVHMXdUVTA5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5dGJTOGlJSGh0Ykc1ek9uTjBVbVZtUFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdmMxUjVjR1V2VW1WemIzVnlZMlZTWldZaklpQjRiV3h1Y3pwNGJYQTlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzhpSUhodGNFMU5Pazl5YVdkcGJtRnNSRzlqZFcxbGJuUkpSRDBpZUcxd0xtUnBaRHBoWVdOaE16Z3laQzAzWlRkbUxUUmxNRE10WVdRd015MWxZVEprWTJVeE5qRmhNV1FpSUhodGNFMU5Pa1J2WTNWdFpXNTBTVVE5SW5odGNDNWthV1E2UmpSQlFqQkZNVUV6TWpBNE1URkZOamd6T1RjNVFUZzBNalkxUTBWRE1qSWlJSGh0Y0UxTk9rbHVjM1JoYm1ObFNVUTlJbmh0Y0M1cGFXUTZSalJCUWpCRk1Ua3pNakE0TVRGRk5qZ3pPVGM1UVRnME1qWTFRMFZETWpJaUlIaHRjRHBEY21WaGRHOXlWRzl2YkQwaVFXUnZZbVVnVUdodmRHOXphRzl3SUVOVE5pQW9WMmx1Wkc5M2N5a2lQaUE4ZUcxd1RVMDZSR1Z5YVhabFpFWnliMjBnYzNSU1pXWTZhVzV6ZEdGdVkyVkpSRDBpZUcxd0xtbHBaRHBoTlRJek9UWXdZUzB4WVdJeUxUUTRPVE10T0dZd05DMDBOR0UxTW1aak1qWmhORGdpSUhOMFVtVm1PbVJ2WTNWdFpXNTBTVVE5SW1Ga2IySmxPbVJ2WTJsa09uQm9iM1J2YzJodmNEbzVOalJsWmpKbE5pMHpZamcxTFRFeE56a3RPVFV6TXkxa1lUSmlNRE0yTVRjeE1tTWlMejRnUEM5eVpHWTZSR1Z6WTNKcGNIUnBiMjQrSUR3dmNtUm1PbEpFUmo0Z1BDOTRPbmh0Y0cxbGRHRStJRHcvZUhCaFkydGxkQ0JsYm1ROUluSWlQejZvQ3VCREFBQUFmMGxFUVZSNDJyelBTdzZBSUF3RTBCbzhLVGZEZTVwYURDU29mRG9JVERJazdlWVZZbVlqUFhoZG5EZEpIbHFJdTJCUmhDUHVWcUJ2ZUNiK1FIUHdEUHlEbHVDUmVCYXR3U1B3SXRxQy8rQlZWQVAzNEUxVUN5TzRDa1ZnRGE1R1ViaUdRMmdQbk1OaDFIY25QS2ZVSnJNTk95amIvZTIrbU9RUU9KY0FBd0RmZmxwdWRoYXJsQUFBQUFCSlJVNUVya0pnZ2c9PVwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LWJvdHRvbS5wbmdcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxOFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUI0QUFBQVBDQVlBQUFEenVuK2NBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQXlKcFZGaDBXRTFNT21OdmJTNWhaRzlpWlM1NGJYQUFBQUFBQUR3L2VIQmhZMnRsZENCaVpXZHBiajBpNzd1L0lpQnBaRDBpVnpWTk1FMXdRMlZvYVVoNmNtVlRlazVVWTNwcll6bGtJajgrSUR4NE9uaHRjRzFsZEdFZ2VHMXNibk02ZUQwaVlXUnZZbVU2Ym5NNmJXVjBZUzhpSUhnNmVHMXdkR3M5SWtGa2IySmxJRmhOVUNCRGIzSmxJRFV1TXkxak1ERXhJRFkyTGpFME5UWTJNU3dnTWpBeE1pOHdNaTh3TmkweE5EbzFOam95TnlBZ0lDQWdJQ0FnSWo0Z1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNGdQSEprWmpwRVpYTmpjbWx3ZEdsdmJpQnlaR1k2WVdKdmRYUTlJaUlnZUcxc2JuTTZlRzF3UFNKb2RIUndPaTh2Ym5NdVlXUnZZbVV1WTI5dEwzaGhjQzh4TGpBdklpQjRiV3h1Y3pwNGJYQk5UVDBpYUhSMGNEb3ZMMjV6TG1Ga2IySmxMbU52YlM5NFlYQXZNUzR3TDIxdEx5SWdlRzFzYm5NNmMzUlNaV1k5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM5elZIbHdaUzlTWlhOdmRYSmpaVkpsWmlNaUlIaHRjRHBEY21WaGRHOXlWRzl2YkQwaVFXUnZZbVVnVUdodmRHOXphRzl3SUVOVE5pQW9WMmx1Wkc5M2N5a2lJSGh0Y0UxTk9rbHVjM1JoYm1ObFNVUTlJbmh0Y0M1cGFXUTZOVFpFT0VJeU9EUXpNakJCTVRGRk5qaEJPREZETnpJNVF6VXdRekkzTkRnaUlIaHRjRTFOT2tSdlkzVnRaVzUwU1VROUluaHRjQzVrYVdRNk5UWkVPRUl5T0RVek1qQkJNVEZGTmpoQk9ERkROekk1UXpVd1F6STNORGdpUGlBOGVHMXdUVTA2UkdWeWFYWmxaRVp5YjIwZ2MzUlNaV1k2YVc1emRHRnVZMlZKUkQwaWVHMXdMbWxwWkRvMU5rUTRRakk0TWpNeU1FRXhNVVUyT0VFNE1VTTNNamxETlRCRE1qYzBPQ0lnYzNSU1pXWTZaRzlqZFcxbGJuUkpSRDBpZUcxd0xtUnBaRG8xTmtRNFFqSTRNek15TUVFeE1VVTJPRUU0TVVNM01qbEROVEJETWpjME9DSXZQaUE4TDNKa1pqcEVaWE5qY21sd2RHbHZiajRnUEM5eVpHWTZVa1JHUGlBOEwzZzZlRzF3YldWMFlUNGdQRDk0Y0dGamEyVjBJR1Z1WkQwaWNpSS9QcVcrcmRnQUFBQjdTVVJCVkhqYXZOVTdDb0F3RUFUUVpISWJlejJPNE1XMDhEYjJlaHZSQkF5a1VaUDlEY3gyd3l2WHU3MTN4SVIwcm00N0tXTXcwRG5WSDBPd2dqTTZQaVhoWUtBNUpCeE1sSXhEQUNYaEVFS2JjUWlpVFRpRTBXb2NDbWdWRGlYMEY0Y2krb2xER1gzRllZQ1crSkp4SDcrVEJWcG1qWjF1QVFZQXVaMHQrMHMrNUl3QUFBQUFTVVZPUks1Q1lJST1cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2ltZy9hcnJvdy10b3AucG5nXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDkgMTIgMThcbiAqKi8iLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvbW9jay1zZWxlY3QtdHBsJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsZGF0YT0kZGF0YS5kYXRhLCRvdXQ9Jyc7JG91dCs9JzxkaXYgY2xhc3M9XCJtb2NrLXNlbGVjdCBmb250LXNpemUxNlwiPiA8ZGl2IGNsYXNzPVwibmFtZS13cmFwXCI+IDxzcGFuIGNsYXNzPVwibmFtZVwiIGRhdGEtaWQ9XCInO1xuJG91dCs9JGVzY2FwZShkYXRhWzBdLmlkKTtcbiRvdXQrPSdcIj4nO1xuJG91dCs9JGVzY2FwZShkYXRhWzBdLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJiZ1wiPjwvc3Bhbj4gPC9kaXY+IDwvZGl2Pic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9tb2NrLXNlbGVjdC10cGwudHBsXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDkgMTIgMThcbiAqKi8iLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvc2VsZWN0LXVsLXRwbCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZWFjaD0kdXRpbHMuJGVhY2gsZGF0YT0kZGF0YS5kYXRhLCR2YWx1ZT0kZGF0YS4kdmFsdWUsJGluZGV4PSRkYXRhLiRpbmRleCwkZXNjYXBlPSR1dGlscy4kZXNjYXBlLCRvdXQ9Jyc7JG91dCs9Jzx1bCBjbGFzcz1cIm1vY2stdWwgYm94LXBhZGRpbmcgZGlzcGxheS1ub25lXCI+ICc7XG4kZWFjaChkYXRhLGZ1bmN0aW9uKCR2YWx1ZSwkaW5kZXgpe1xuJG91dCs9JyAnO1xuaWYoJGluZGV4ID09IDApe1xuJG91dCs9JyA8bGkgY2xhc3M9XCJhY3RpdmVcIiBzdHlsZT1cImJvcmRlcjpub25lO1wiIGRhdGEtaWQ9XCInO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuaWQpO1xuJG91dCs9J1wiPiA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5uYW1lKTtcbiRvdXQrPSc8L3NwYW4+IDxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9yaWdodC5wbmdcIiBjbGFzcz1cInJpZ2h0XCI+IDwvbGk+ICc7XG59ZWxzZXtcbiRvdXQrPScgPGxpIGRhdGEtaWQ9XCInO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuaWQpO1xuJG91dCs9J1wiPiA8c3BhbiBjbGFzcz1cIml0ZW0tbmFtZVwiPic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5uYW1lKTtcbiRvdXQrPSc8L3NwYW4+IDxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9yaWdodC5wbmdcIiBjbGFzcz1cInJpZ2h0XCI+IDwvbGk+ICc7XG59XG4kb3V0Kz0nICc7XG59KTtcbiRvdXQrPScgPC91bD4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvc2VsZWN0LXVsLXRwbC50cGxcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxOFxuICoqLyIsIi8v6I635Y+W5YWs5YWx5a+56LGhXHJcbnZhciBob21lPXJlcXVpcmUoJy4uL2RlcC91dGlsL3V0aWwnKTtcclxuaG9tZS5nb19tZW51KCdjb250YWluZXInKTtcclxuLy/ojrflj5bml6DmlbDmja7nirbmgIFcclxudmFyIG5vZGF0YT1yZXF1aXJlKCcuLi9kZXAvY29tcG9uZW50L25vLWRhdGEvbm8tZGF0YS5qcycpO1xyXG4vL+iOt+WPluS4i+adpeahhuWvueixoVxyXG52YXIgc2VsZT1yZXF1aXJlKCcuLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L21vY2stc2VsZWN0LmpzJyk7XHJcbi8v6I635Y+WYXBwaWQgb3BlaWRcclxudmFyIGFwaWQ9Jycsb3BpZD0nJztcclxuICAgIGFwaWQ9c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYXBwaWQnKTtcclxuICAgIG9waWQ9c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnb3BlbmlkJyk7XHJcblxyXG4vL+WjsOaYjuS4i+aLieihqOWNleeahOm7mOiupOWAvFxyXG52YXIgc2VsZUlkPScnO1xyXG52YXIgc2VsZU5hbWU9bnVsbDtcclxuLy/ojrflj5bkuIvmi4nmoYbmlbDmja7nlJ/miJDkuIvmnaXmoYZcclxuICAgIC8v6K+35rGC56eR55uuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIGFzeW5jOmZhbHNlLFxyXG4gICAgICAgIHR5cGU6J3Bvc3QnLFxyXG4gICAgICAgIHVybDpob21lLmdldEFwaVVybCgnSG9tZVNjaG9vbENvbnRhY3QvTGVybmluZ1BhdGgvR2V0U3ViamVjdEdyYWRlTGlzdEhvbWVXb3JrJyksXHJcbiAgICAgICAgZGF0YVR5cGU6J2pzb24nLFxyXG4gICAgICAgIGRhdGE6e1wiT3BlbklkXCI6b3BpZCxcIkFwcElkXCI6YXBpZH0sXHJcbiAgICAgICAgc3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgaG9tZS5jaGVja0JpbmQoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKCFkYXRhLk4ubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgIG5vZGF0YS5pbml0KCdjb250YWluZXInLCfmmoLml6DlvZPmnIjlvLHpobnkv6Hmga8nKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZT17XCJkYXRhXCI6W119O1xyXG4gICAgICAgICAgICBpZihkYXRhLk9LKXtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8ZGF0YS5OLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UuZGF0YVtpXT17XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpkYXRhLk5baV0uR3JhZGVJRCArJywnICsgZGF0YS5OW2ldLlN1YmplY3RJRCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6ZGF0YS5OW2ldLkdyYWRlTmFtZSArIGRhdGEuTltpXS5TdWJqZWN0TmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgIHNlbGUoJ3N1YmplY3QnLG1lc3NhZ2UsZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgICAgICAgICAgc2VsZUlkPWlkLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgICAgfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICBpZihzZWxlTmFtZSAhPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAgICBjb250KHNlbGVJZFswXSxzZWxlSWRbMV0sc2VsZU5hbWUpO1xyXG4gICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgfSwnb3AnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL+ivt+axguaciOS7vVxyXG4kLmFqYXgoe1xyXG4gICAgYXN5bmM6ZmFsc2UsXHJcbiAgICB0eXBlOidwb3N0JyxcclxuICAgIHVybDpob21lLmdldEFwaVVybCgnSG9tZVNjaG9vbENvbnRhY3QvTGVybmluZ1BhdGgvR3Jhc3BBbmFseXplTW9udGhMaXN0JyksXHJcbiAgICBkYXRhVHlwZTonanNvbicsXHJcbiAgICBkYXRhOntcIk9wZW5JZFwiOm9waWQsXCJBcHBJZFwiOmFwaWR9LFxyXG4gICAgc3VjY2VzczpmdW5jdGlvbihkdCl7XHJcbiAgICAgICAgaG9tZS5jaGVja0JpbmQoZHQpO1xyXG5cclxuICAgICAgICBpZighZHQubGVuZ3RoKXtcclxuICAgICAgICAgICAgbm9kYXRhLmluaXQoJ2NvbnRhaW5lcicsJ+aaguaXoOW9k+aciOW8semhueS/oeaBrycpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHZhciBtZXNzYWdlPXtcImRhdGFcIjpbXX07XHJcbiAgICAgICAgZm9yKHZhciBpPTA7aTxkdC5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgbWVzc2FnZS5kYXRhW2ldPXtcclxuICAgICAgICAgICAgICAgIFwiaWRcIjpkdFtpXSxcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOmR0W2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGUoJ2RhdGUxJyxtZXNzYWdlLGZ1bmN0aW9uKG5hbWUpe1xyXG4gICAgICAgICAgICBzZWxlTmFtZT1uYW1lO1xyXG5cclxuICAgICAgICB9LGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHNlbGVJZC5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgY29udChzZWxlSWRbMF0sc2VsZUlkWzFdLHNlbGVOYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sJ2R0Jyk7XHJcblxyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v55Sf5oiQ5LiL5ouJ5qGGXHJcblxyXG4vL+mhtemdouS4u+S9k+aYvuekuuWGheWuuVxyXG5mdW5jdGlvbiBjb250KGdpZCxzaWQsbW9udGgpe1xyXG4gICAgICAgIHZhciB1cj1ob21lLmdldEFwaVVybCgnSG9tZVNjaG9vbENvbnRhY3QvTGVybmluZ1BhdGgvR3Jhc3BBbmFseXplJyk7XHJcbiAgICAgICAgdmFyIG1lc3NhZ2U9e1xyXG4gICAgICAgICAgICBcIk9wZW5JZFwiOm9waWQsXHJcbiAgICAgICAgICAgIFwiQXBwSURcIjphcGlkLFxyXG4gICAgICAgICAgICBcIkN1cnJlbnRCaWdHcmFkZVwiOmdpZCxcclxuICAgICAgICAgICAgXCJDdXJyZW50U3ViamVjdFwiOnNpZCxcclxuICAgICAgICAgICAgXCJtb250aFwiOm1vbnRoLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZToncG9zdCcsXHJcbiAgICAgICAgICAgIHVybDp1cixcclxuICAgICAgICAgICAgZGF0YVR5cGU6J2pzb24nLFxyXG4gICAgICAgICAgICBkYXRhOm1lc3NhZ2UsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6ZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBpZighZGF0YS5OKXtcclxuICAgICAgICAgICAgICAgICAgICBub2RhdGEuaW5pdCgndXNlcicsJ+aaguaXoOW9k+aciOW8semhueS/oeaBrycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLk9LKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcudXNlci1uYW1lJykuaHRtbChkYXRhLk4uU3R1ZGVudE5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy51c2VyLXN1YmplY3QnKS5odG1sKGRhdGEuTi5TdWJqZWN0TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnVzZXItbW9udGgnKS5odG1sKGRhdGEuTi5EZWZhdWx0TW9udGhEZXNjKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcua29ud3BvaW50JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGRhdGEuTi5Ub3AxMExpc3QsZnVuY3Rpb24oaW5kZXgsaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmF0ZT1wYXJzZUludChpdGVtLnJhdGUgKiAxMDApKyclJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZT1pdGVtLm5hbWUrJ++8iCcrcmF0ZSsn77yJJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy51c2VyJykuYXBwZW5kKCc8bGkgY2xhc3M9XCJrb253cG9pbnRcIj48cD4nK25hbWUrJzwvcD48ZGl2IGNsYXNzPVwicHJvZ3Jlc3NcIj48cD48L3A+PC9kaXY+PC9saT4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wcm9ncmVzcyA+IHAnKS5lcShpbmRleCkuY3NzKHt3aWR0aDpyYXRlfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL21vbnRod2Vhay5qc1xuICoqIG1vZHVsZSBpZCA9IDU0XG4gKiogbW9kdWxlIGNodW5rcyA9IDEyXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==