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

	module.exports = __webpack_require__(17);


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
	       var baseurl='http://192.168.140.59:8000/';
	
	        //生产环境
	       //var baseurl='http://testing.mofangge.com/';
	       // var baseurl='http://localhost:8997/';
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var sele=__webpack_require__(18);
	var home=__webpack_require__(2);
	var nodata=__webpack_require__(3);
	//生成菜单
	home.go_menu('container');
	//获取openid appid
	var apid='',opid='';
	apid=sessionStorage.getItem('appid');
	opid=sessionStorage.getItem('openid');
	
	//moban
	var mode=__webpack_require__(25);
	//请求下拉框数据页面显示
	var planid='';
	var planindexid='';
	$.ajax({
	    type:'post',
	    url:home.getApiUrl('HomeSchoolContact/LerningPath/GetSubjectGradeListPlanInfo'),
	    dataType:'json',
	    data:{"OpenID":opid,"AppID":apid},
	    success:function(data){
	        home.checkBind(data);
	        if(!data.N.length){
	            nodata.init('container','暂无报名学科');
	            return;
	        }
	        if(data.OK){
	            var message={"data":[]};
	            if(data.OK){
	                for(var i=0;i<data.N.length;i++){
	
	                    message.data[i]={
	                        "id":data.N[i].planid,
	                        "name":data.N[i].orderNum > 0 ? data.N[i].GradeName + data.N[i].SubjectName+data.N[i].orderNum:data.N[i].GradeName + data.N[i].SubjectName,
	                    }
	                }
	            }
	            sele('class-learn',message,function(id){
	                    planid=id;
	            },function(){
	                if(planid > 0){
	                    xuean(planid);
	                }else{
	                    nodata.init('main','暂无学案信息');
	                    $('.class-date').html('');
	                }
	            },'le');
	        }
	    }
	});
	function xuean(planid){
	    $.ajax({
	        type:'post',
	        url:home.getApiUrl('HomeSchoolContact/LerningPath/GetPlanIndexList'),
	        dataType:'json',
	        data:{"OpenID":opid,"AppID":apid,"PlanId":planid},
	        success:function(data){
	            if(!data.N.length){
	                nodata.init('main','暂无学案信息');
	                $('.class-date').html('');
	                return;
	            }
	            $('.main').html(mode());
	            if(data.OK){
	                var message={"data":[]};
	                if(data.OK){
	                    for(var i=0;i<data.N.length;i++){
	
	                        message.data[i]={
	                            "id":data.N[i].PlanIndexId,
	                            "name":data.N[i].OrderName
	                        }
	                    }
	                }
	                sele('class-date',message,function(id){
	                    planindexid=id;
	                },function(){
	                    detainls(planindexid);
	                },'cl');
	            }
	        }
	    });
	}
	
	function detainls(planindex){
	    $.ajax({
	        type:'post',
	        url:home.getApiUrl('HomeSchoolContact/LerningPath/LessonPlanDetails'),
	        dataType:'json',
	        data:{"OpenID":opid,"AppID":apid,"Planindex":planindex},
	        success:function(data){
	
	            if(!data.N){
	                nodata.init('main','暂无学案信息');
	                return;
	            }
	            $('.main').html(mode());
	            if(data.Result){
	                if(data.N.IsTitle){
	                    $('.teachplan-name').html(data.N.TitleName);
	                }else{
	                    $('.teachplan-name').html('');
	                }
	                if(data.N.IsFirst){
	                    $('.cri-contain').html(data.N.FirstMark);
	                }else{
	                    $('.classroom-intake').html('');
	                }
	                if(data.N.IsTarget){
	                    $('.teachaim > p ').html(data.N.TargetMark);
	                }else{
	                    $('.teachaim').html('');
	                }
	                if(data.N.IsDiff){
	                    $('.diff > p ').html(data.N.DiffMark);
	                }else{
	                    $('.diff').html('');
	                }
	                if(data.N.IsSummary){
	                    $('.summary > p').html(data.N.SummaryMark);
	                }else{
	                    $('.summary').html('');
	                }
	
	                $('.teachplan-starttime').html(time(data.N.StartTime
	                ) +'~'+ time(data.N.EndTime) );
	                $('.konwpoint').html('');
	                $('.testway').html('');
	                var poIndex=1;
	                $.each(data.N.PlanPointsList,function(index,item){
	                    if(item.CurrentLever == 2 && item.IsShow){
	                            var par=item.PlanPointsID;
	                            var wayIndex=1;
	                            $('.konwpoint').append(
	                                '<div id=' + item.PlanPointsID + '><p class="point-title">知识点' + poIndex + ':' + item.PointName + '</p></div>'
	                            );
	                            $('#'+par).append('<div class="konwpoint-title"></div>');
	                            poIndex++;
	                            $.each(data.N.PlanPointsList,function(index,item){
	                                if(item.CurrentLever == 3 && item.IsShow && item.ParentID==par ){
	                                    $('#'+item.ParentID).find('.konwpoint-title').append('<p>'+wayIndex+':'+item.PointName+'</p>');
	                                    $('#'+item.ParentID).append('<div id='+item.PlanPointsID+'><p class="testway-title">考法'+wayIndex+':'+item.PointName+'</p><div class="jingpin"><p>精品例题</p></div><div class="suitang"><p>随堂练习</p></div></div>');
	                                    wayIndex++;
	                                }
	                            });
	                    }
	                });
	            }
	            question(data.N.PlanIndexID);
	        }
	    });
	}
	function  question(planindex){
	    $.ajax({
	        type:'post',
	        url:home.getApiUrl('HomeSchoolContact/LerningPath/GetPlanQuestionItems'),
	        dataType:'json',
	        data:{"OpenID":opid,"AppID":apid,"Planindex":planindex},
	        success:function(data){
	            $.each(data.N,function(index,item){
	                item.PointType == 1 ? $('#'+item.PlanPointsID).find('.jingpin').append('<p>例题'+item.ItemIndex+'</p>'+item.ItemName +'<p>解析:</p>'+item.ItemAnaly):$('#'+item.PlanPointsID).find('.suitang').append('<p>练习'+item.ItemIndex+'</p>'+item.ItemName +'<p>解析</p>'+item.ItemAnaly);
	            });
	            home.initMathJaxObj('container');
	            //initImg();
	        }
	    });
	}
	
	function  time(data){
	    var stringT=data.split('T');
	    var result=stringT[0].replace(/-/,'年').replace(/-/,'月');
	    var h=stringT[1].split(':');
	    result=result + '日 '+h[0]+':'+h[1];
	    return result ;
	}
	
	//处理试题样式
	/*function initImg(){
	    var img=$('.konwpoint').find('img');
	    var w=document.body.clientWidth || window.innerWidth;
	    for(var i=0;i<img.length;i++){
	        if (img.eq(i).width() >= w) {
	            img.eq(i).width("100%");
	        }
	    }
	}*/

/***/ },
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);
	module.exports=template('tpl/afterclassjob',' <ul class="teach-plan"> <li class="teachplan-info"> <p class="teachplan-name title"></p> <p class="teachplan-starttime"></p> </li> <li class="classroom-intake"> <div class="title"><i class="icon fl"></i><p class="fl">课堂引入</p></div> <p class="cri-contain"></p> </li> <li class="teachaim"> <div class="title"><i class="icon fl"></i><p class="fl">教学目标</p></div> <p></p> </li> <li class="diff"> <div class="title"><i class="icon fl"></i><p class="fl">重难点分析</p></div> <p></p> </li> <li class="teach-course"> <div class="title"><i class="icon fl"></i><p class="fl">教学过程</p></div> <div class="konwpoint"> </div> </li> <li class="summary"> <div class="title"><i class="icon fl"></i><p class="fl">方法与总结</p></div> <p></p> </li> </ul>');

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDZkZDMyZWU3NzVmNjg1ZjczZGU/MGIwYioiLCJ3ZWJwYWNrOi8vLy4vZGVwL3V0aWwvdXRpbC5qcz8yMjIxKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvbm8tZGF0YS5qcz8xZjA5KiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvdHBsL25vLWRhdGEtdHBsLnRwbD8wYWM2KiIsIndlYnBhY2s6Ly8vLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qcz84OTY2KiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvY3NzL25vLWRhdGEuY3NzP2I2MzIqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbm8tZGF0YS9jc3Mvbm8tZGF0YS5jc3M/YTgxNSoiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcz9kYTA0KiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvaW1nL25vLWRhdGEucG5nP2NkNGUqIiwid2VicGFjazovLy8uL34vc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qcz9iOTgwKiIsIndlYnBhY2s6Ly8vLi9qcy9hZnRlcmNsYXNzam9iLmpzIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvbW9jay1zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9jc3MvbW9jay1zZWxlY3QuY3NzPzhhMGEiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9jc3MvbW9jay1zZWxlY3QuY3NzIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LWJvdHRvbS5wbmciLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9pbWcvYXJyb3ctdG9wLnBuZyIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9tb2NrLXNlbGVjdC10cGwudHBsIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvdHBsL3NlbGVjdC11bC10cGwudHBsIiwid2VicGFjazovLy8uL3RwbC9hZnRlcmNsYXNzam9iLnRwbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSwwREFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLHVCQUF1QjtBQUNyRCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQiwwQ0FBMEM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQW9EO0FBQ3BELEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLGlDQUFnQyxVQUFVLEVBQUU7QUFDNUMsRTs7Ozs7O0FDcEJBO0FBQ0E7OztBQUdBO0FBQ0Esd0NBQXVDLDBCQUEwQixxQkFBcUIsMkJBQTJCLG9CQUFvQixLQUFLLG1DQUFtQyx5QkFBeUIsS0FBSyxhQUFhLDJCQUEyQix5QkFBeUIscUJBQXFCLHlDQUF5QyxxQkFBcUIsMkJBQTJCLEtBQUssNEJBQTRCLG9CQUFvQixxQkFBcUIseUJBQXlCLEtBQUsscUJBQXFCLDhCQUE4QixvQkFBb0Isb0JBQW9CLEtBQUssZ0NBQWdDLGlGQUE0RixrQ0FBa0MsS0FBSyxtQ0FBbUMsdUJBQXVCLEtBQUssd0NBQXdDLGlGQUF5RixrQ0FBa0MsS0FBSyxnQkFBZ0IsaUJBQWlCLHVCQUF1Qix5QkFBeUIscUJBQXFCLDBCQUEwQixzQ0FBc0MsS0FBSyx1QkFBdUIsc0JBQXNCLHFCQUFxQiwyQkFBMkIsd0JBQXdCLG9CQUFvQixvQkFBb0IsS0FBSyw4QkFBOEIsd0JBQXdCLEtBQUssdUJBQXVCLHVCQUF1QixLQUFLOztBQUV2NEM7Ozs7Ozs7QUNQQSxrQ0FBaUMsNCtDOzs7Ozs7QUNBakMsa0NBQWlDLHcyQzs7Ozs7O0FDQWpDO0FBQ0E7QUFDQTtBQUNBLGNBQWEsd0ZBQXdGO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7OztBQ1REO0FBQ0E7QUFDQTtBQUNBLGNBQWEsbUpBQW1KO0FBQ2hLO0FBQ0E7QUFDQTtBQUNBLCtDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7QUN2QkQ7QUFDQSxxd0IiLCJmaWxlIjoiYWZ0ZXJjbGFzc2pvYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9tZmctd2VjaGF0L2J1bmRsZS9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkNmRkMzJlZTc3NWY2ODVmNzNkZSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8yMC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzPXtcclxuICAgIHNjcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9ICQoZG9jdW1lbnQpLmhlaWdodCgpO1xyXG4gICAgICAgIHZhciB3aW5kb3dIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCk7XHJcbiAgICAgICAgaWYoc2Nyb2xsVG9wICsgd2luZG93SGVpZ2h0ID09IHNjcm9sbEhlaWdodCl7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICBnZXRTdWJqZWN0TmFtZTpmdW5jdGlvbihpZCl7XHJcblxyXG4gICAgICAgIHZhciBzdWJqZWN0SWRTdHIgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAoaWQpIHtcclxuICAgICAgICAgICAgY2FzZSBcIjAxXCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuivreaWh1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwMlwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLmlbDlraZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDNcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi6Iux6K+tXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA0XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIueJqeeQhlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwNVwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLljJblraZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDZcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5Zyw55CGXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA3XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuWOhuWPslwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwOFwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLmlL/msrtcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDlcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi55Sf54mpXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjE0XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuWlpeaVsFwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3RJZFN0cjtcclxuICAgIH0sXHJcbiAgICBnZXRTdGFnZVN0cjogZnVuY3Rpb24gKHN0YWdlSWQpIHtcclxuICAgICAgICBpZighc3RhZ2VJZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5Yid5LitXCI7XHJcbiAgICAgICAgICAgIHJldHVybiBzdWJqZWN0SWRTdHI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzdGFnZUlkU3RyID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKHN0YWdlSWQpIHtcclxuICAgICAgICAgICAgY2FzZSBcInhcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIuWwj+WtplwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjXCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLliJ3kuK1cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZ1wiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi6auY5LitXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhZ2VJZFN0cjtcclxuICAgIH0sXHJcbiAgICBnb19tZW51OmZ1bmN0aW9uKGNvbklkKXtcclxuICAgICAgICB2YXIgY29uPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbklkKTtcclxuICAgICAgICB2YXIgaW1nPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2lkJywnbWVudUNvbnRyJyk7XHJcbiAgICAgICAgaW1nLnNyYz0nLi4vYnVuZGxlL2ltZy9ib3R0b20teXVhbi1zaG93LnBuZyc7XHJcbiAgICAgICAgY29uLmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICAgICAgdmFyIG1lbnVDb250cj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudUNvbnRyJyk7XHJcbiAgICAgICAgbWVudUNvbnRyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLG1lbnVCb2R5LGZhbHNlKTtcclxuICAgICAgICBmdW5jdGlvbiBtZW51Qm9keSgpe1xyXG4gICAgICAgICAgICB2YXIgbWVudVNob3c9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVTaG93Jyk7XHJcbiAgICAgICAgICAgIHZhciBoPXdpbmRvdy5pbm5lckhlaWdodCtcInB4XCI7XHJcbiAgICAgICAgICAgIGlmKG1lbnVTaG93KXtcclxuICAgICAgICAgICAgICAgIHZhciB0PW1lbnVTaG93LmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgICQoXCIuc3R1ZHktc2hvd1wiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICBpZiggdCA9PSAnZGlzcGxheTogbm9uZTsnKXtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3N0dWR5LXNob3cxXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICBtZW51U2hvdy5zdHlsZS5kaXNwbGF5PSdibG9jayc7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYz1cIi4uL2J1bmRsZS9pbWcvbWVudTIucG5nXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCdoZWlnaHQ6JytoKycsb3ZlcmZsb3c6aGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtZW51U2hvdy5zdHlsZS5kaXNwbGF5PSdub25lJztcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPVwiLi4vYnVuZGxlL2ltZy9ib3R0b20teXVhbi1zaG93LnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbi5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdmFyIHNob3c9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnaWQnLCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuaW5uZXJIVE1MPSc8YSBocmVmPVwiYWZ0ZXJjbGFzc2pvYi5odG1sXCIgY2xhc3M9XCJrdHhhXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3h1ZWFuLnBuZ1wiLz48L2E+PGEgaHJlZj1cImhvbWV3b3JrLWxpc3QuaHRtbFwiIGNsYXNzPVwia3hqbFwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9qaWx1LnBuZ1wiPC9hPjxhIGhyZWY9XCJ3cm9uZy1nYXRoZXIuaHRtbFwiICBjbGFzcz1cImN0ampcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvamlqaW4ucG5nXCI+PC9hPjxhIGhyZWY9XCJtb250aHdlYWsuaHRtbFwiIGNsYXNzPVwibXlyeFwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9ydW94aWFuZy5wbmdcIj48L2E+JztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hvdyk7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3JjPVwiLi4vYnVuZGxlL2ltZy9tZW51Mi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIGNvbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnaGVpZ2h0OicraCsnLG92ZXJmbG93OmhpZGRlbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBzaG93Q29uZmlybTpmdW5jdGlvbihtc2csY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxheWVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGF5ZXIuY2xhc3NOYW1lPVwibGF5ZXJcIjtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxheWVyKTtcclxuICAgICAgICB2YXIgY29uZmlybT0nPGRpdiBjbGFzcz1cInBvcGNvbmZpcm1cIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8ZGl2IGNsYXNzPVwidGl0bGVcIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8aSBjbGFzcz1cImljb24tY2xvc2VcIj48L2k+JztcclxuICAgICAgICBjb25maXJtKz0nIDwvZGl2Pic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8ZGl2IGNsYXNzPVwiY29udGVudFwiPicrbXNnKycgPC9kaXY+JztcclxuICAgICAgICBjb25maXJtKz0nIDxkaXYgY2xhc3M9XCJmb290XCI+JztcclxuICAgICAgICBjb25maXJtKz0nICA8aW5wdXQgY2xhc3M9XCJwb3BidG4gYnRub2sgY29sb3ItZ3JlZW5cIiB0eXBlPVwiYnV0dG9uXCIgIHZhbHVlPVwi56Gu5a6aXCIvPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgPGlucHV0IGNsYXNzPVwicG9wYnRuIGJ0bmNhbmNlbCBjb2xvci1ncmVlblwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPlua2iFwiLz4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgICA8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoY29uZmlybSk7XHJcbiAgICAgICAgLy8kKCcucG9wY29uZmlybScpLmNzcygndG9wJywoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtJCgnLnBvcGNvbmZpcm0nKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgJChcIi5idG5va1wiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAkKFwiLmJ0bm9rXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuYnRuY2FuY2VsLC5pY29uLWNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+S/oeaBr+aPkOekuuahhlxyXG4gICAgc2hvd1BvcE1zZzpmdW5jdGlvbiAobXNnLHR5cGUpIHtcclxuICAgICAgICB2YXIgaHRtbD1cIlwiO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICBodG1sPSc8ZGl2IGNsYXNzPVwicG9wbXNnXCI+PGRpdiBjbGFzcz1cImNvbnRlbnRcIj48aW1nIHN0eWxlPVwid2lkdGg6MjIlIFwiIHNyYz1cIi4uL2J1bmRsZS9pbWcvbG9naW4tc3VjZXNzLnBuZ1wiPjxwPicrbXNnKyc8L3A+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICBodG1sPSc8ZGl2IGNsYXNzPVwicG9wbXNnXCI+PGRpdiBjbGFzcz1cImNvbnRlbnRcIj48aW1nIHN0eWxlPVwid2lkdGg6MjIlIFwiIHNyYz1cIi4uL2J1bmRsZS9pbWcvbG9naW4tdGFuaGFvLnBuZ1wiPjxwPicrbXNnKyc8L3A+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgaHRtbD0nPGRpdiBjbGFzcz1cInBvcG1zZ1wiPjxkaXYgY2xhc3M9XCJjb250ZW50XCI+PHA+Jyttc2crJzwvcD48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vdmFyIGh0bWw9JzxkaXYgY2xhc3M9XCJwb3Btc2dcIj48ZGl2IGNsYXNzPVwiY29udGVudFwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9sb2dpbi1zdWNlc3MucG5nXCI+PHA+Jyttc2crJzwvcD48L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ2xlZnQnLChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoICAtJCgnLnBvcG1zZycpLndpZHRoKCkpLzIpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ3RvcCcsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSQoJy5wb3Btc2cnKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyQoJy5wb3Btc2cnKS5yZW1vdmUoKTt9LDEwMDApO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5o6l5Y+jdXJsIOWmguiOt+WPlm9wZW5pZCAgIGdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKVxyXG4gICAgZ2V0QXBpVXJsOmZ1bmN0aW9uKGFjdGlvbil7XHJcbiAgICAgICAgLy/nur/kuIvmtYvor5VcclxuICAgICAgIC8vdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk4Lyc7XHJcbiAgICAgICAgLy/nur/kuIrmtYvor5VcclxuICAgICAgIHZhciBiYXNldXJsPSdodHRwOi8vMTkyLjE2OC4xNDAuNTk6ODAwMC8nO1xyXG5cclxuICAgICAgICAvL+eUn+S6p+eOr+Wig1xyXG4gICAgICAgLy92YXIgYmFzZXVybD0naHR0cDovL3Rlc3RpbmcubW9mYW5nZ2UuY29tLyc7XHJcbiAgICAgICAvLyB2YXIgYmFzZXVybD0naHR0cDovL2xvY2FsaG9zdDo4OTk3Lyc7XHJcbiAgICAgICAgcmV0dXJuIGJhc2V1cmwrYWN0aW9uO1xyXG4gICAgfSxcclxuICAgIC8v6LCD55SoYXBp5oiQ5Yqf5ZCO77yM5YWI6LCD55So5q2k5pa55rOV77yM5Yik5pat55So5oi35piv5ZCm5bey57uP57uR5a6a77yM6Iul5pyq57uR5a6a77yM6Lez6L2s5Yiw57uR5a6a6aG1XHJcbiAgICBjaGVja0JpbmQ6ZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgaWYoIWRhdGEuT0spIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuQ29kZSA9PSAxIHx8IGRhdGEuQ29kZSA9PSAyIHx8IGRhdGEuQ29kZSA9PSA0IHx8IGRhdGEuQ29kZSA9PSAxMSB8fCBkYXRhLkNvZGUgPT0gMTIgfHwgZGF0YS5Db2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiYmluZEluZm8uaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6I635Y+WT3BlbklkXHJcbiAgICBnZXRPcGVuSWQ6ZnVuY3Rpb24oYXBwaWQsYXBwc2VjcmV0LGNvZGUpe1xyXG52YXIgb3BlbmlkO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgYXN5bmM6ZmFsc2UsXHJcbiAgICAgICAgICAgIHVybDp0aGlzLmdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKSxcclxuICAgICAgICAgICAgLy8gZGF0YSB0byBiZSBhZGRlZCB0byBxdWVyeSBzdHJpbmc6XHJcbiAgICAgICAgICAgIGRhdGE6IHtBcHBJRDphcHBpZCxBcHBTZWNyZXQ6YXBwc2VjcmV0LENvZGU6Y29kZX0sXHJcbiAgICAgICAgICAgIC8vIHR5cGUgb2YgZGF0YSB3ZSBhcmUgZXhwZWN0aW5nIGluIHJldHVybjpcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgLy90aW1lb3V0OiAzMDAsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLk9LKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmlkPWRhdGEuSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KCdBamF4IGVycm9yIScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBvcGVuaWQ7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5Z1cmzlj4LmlbBcclxuICAgIGdldFF1ZXJ5U3RyaW5nOmZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIgKyBuYW1lICsgXCI9KFteJl0qKSgmfCQpXCIsIFwiaVwiKTtcclxuICAgIHZhciByID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcclxuICAgIGlmIChyICE9IG51bGwpIHJldHVybiB1bmVzY2FwZShkZWNvZGVVUkkoclsyXSkpOyByZXR1cm4gbnVsbDtcclxufSxcclxuXHJcbiAgICBkYXRlRm9ybWF0OiBmdW5jdGlvbihkYXRlLCBmb3JtYXQpe1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgdmFyIG1hcCA9IHtcclxuICAgICAgICAgICAgXCJZXCI6IGRhdGUuZ2V0WWVhcigpLFxyXG4gICAgICAgICAgICBcIk1cIjogZGF0ZS5nZXRNb250aCgpICsgMSwgLy/mnIjku71cclxuICAgICAgICAgICAgXCJkXCI6IGRhdGUuZ2V0RGF0ZSgpLCAvL+aXpVxyXG4gICAgICAgICAgICBcImhcIjogZGF0ZS5nZXRIb3VycygpLCAvL+Wwj+aXtlxyXG4gICAgICAgICAgICBcIm1cIjogZGF0ZS5nZXRNaW51dGVzKCksIC8v5YiGXHJcbiAgICAgICAgICAgIFwic1wiOiBkYXRlLmdldFNlY29uZHMoKSwgLy/np5JcclxuICAgICAgICAgICAgXCJxXCI6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksIC8v5a2j5bqmXHJcbiAgICAgICAgICAgIFwiU1wiOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvKFt5TWRobXNxU10pKy9nLCBmdW5jdGlvbiAoYWxsLCB0KSB7XHJcbiAgICAgICAgICAgIHZhciB2ID0gbWFwW3RdO1xyXG4gICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gJzAnICsgdjtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gdi5zdWJzdHIodi5sZW5ndGggLSAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHQgPT09ICd5Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnJykuc3Vic3RyKDQgLSBhbGwubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICB9LFxyXG4gICAgLy/lpITnkIbor5XpopjlhazlvI8gbWF0aGpheFxyXG4gICAgaW5pdE1hdGhKYXhPYmo6ZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgTWF0aEpheC5IdWIuUXVldWUoW1wiVHlwZXNldFwiLCBNYXRoSmF4Lkh1YiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0TG9jYWxUaW1lOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUocGFyc2VJbnQodmFsLnJlcGxhY2UoXCIvRGF0ZShcIiwgXCJcIikucmVwbGFjZShcIikvXCIsIFwiXCIpLCAxMCkpO1xyXG4gICAgICAgICAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSA8IDEwID8gXCIwXCIgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgOiBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudERhdGUgPSBkYXRlLmdldERhdGUoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldERhdGUoKSA6IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXRIb3VycygpIDogZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICB2YXIgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCkgOiBkYXRlLmdldE1pbnV0ZXMoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFyICsgXCItXCIgKyBtb250aCArIFwiLVwiICsgY3VycmVudERhdGUgKyBcIiBcIiArIGhvdXJzICsgXCI6XCIgKyBtaW51dGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W6aKY5Z6LXHJcbiAgIGdldEl0ZW1TdHlsZTpmdW5jdGlvbiAoc3ViamVjdCxzdHlsZSkge1xyXG4gICAgICAgaWYgKHN1YmplY3QgPT0gJzAzJyB8fCBzdWJqZWN0ID09ICcwMScpIHtcclxuICAgICAgICAgICBpZiAoc3R5bGUgKiAxIDwgMTAxKSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBlbHNlIGlmIChzdHlsZSAqIDEgPCAyMDEpIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGVsc2UgaWYgKHN0eWxlICogMSA8IDMwMSkge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgIH1cclxuICAgfVxyXG5cclxuXHJcbn07XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RlcC91dGlsL3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNiA4IDkgMTAgMTEgMTIgMTMgMTQgMTYgMTcgMTggMTkiLCIvKipcclxuICogQ3JlYXRlZCBieSBodW1vckhhbiBvbiAyMDE2LzUvMjYuXHJcbiAqL1xyXG52YXIgbm9EYXRhVHBsID0gcmVxdWlyZSgnbm8tZGF0YS10cGwnKTtcclxucmVxdWlyZSgnLi9jc3Mvbm8tZGF0YS5jc3MnKTtcclxuXHJcbnZhciBfJGVsO1xyXG52YXIgbm9EYXRhID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24obXNnKXtcclxuICAgICAgICB2YXIgcD17bXNnOm1zZ31cclxuICAgICAgICBfJGVsLmh0bWwobm9EYXRhVHBsKHApKTtcclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihkb20sbXNnKXtcclxuICAgICAgICBfJGVsID0gJChcIi5cIiArIGRvbSk7XHJcbiAgICAgICAgbm9EYXRhLmluaXQobXNnKTtcclxuICAgIH0sXHJcblxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGVwL2NvbXBvbmVudC9uby1kYXRhL25vLWRhdGEuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMyA0IDkgMTIgMTMgMTQgMTYgMTcgMTgiLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnZGVwL2NvbXBvbmVudC9uby1kYXRhL3RwbC9uby1kYXRhLXRwbCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZXNjYXBlPSR1dGlscy4kZXNjYXBlLG1zZz0kZGF0YS5tc2csJG91dD0nJzskb3V0Kz0nPGRpdiBjbGFzcz1cIm5vLWRhdGEtYmdcIj48L2Rpdj4gPGRpdiBjbGFzcz1cIm5vLWRhdGEtdGlwIGZvbnQtc2l6ZTEyXCI+JztcbiRvdXQrPSRlc2NhcGUobXNnIHx8ICfmmoLml6DmlbDmja4nKTtcbiRvdXQrPSc8L2Rpdj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RlcC9jb21wb25lbnQvbm8tZGF0YS90cGwvbm8tZGF0YS10cGwudHBsXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNCA5IDEyIDEzIDE0IDE2IDE3IDE4IiwiLypUTU9ESlM6e30qL1xyXG4hZnVuY3Rpb24gKCkge1xyXG5cdGZ1bmN0aW9uIGEoYSwgYikge1xyXG5cdFx0cmV0dXJuICgvc3RyaW5nfGZ1bmN0aW9uLy50ZXN0KHR5cGVvZiBiKSA/IGggOiBnKShhLCBiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYihhLCBjKSB7XHJcblx0XHRyZXR1cm4gXCJzdHJpbmdcIiAhPSB0eXBlb2YgYSAmJiAoYyA9IHR5cGVvZiBhLCBcIm51bWJlclwiID09PSBjID8gYSArPSBcIlwiIDogYSA9IFwiZnVuY3Rpb25cIiA9PT0gYyA/IGIoYS5jYWxsKGEpKSA6IFwiXCIpLCBhXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjKGEpIHtcclxuXHRcdHJldHVybiBsW2FdXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkKGEpIHtcclxuXHRcdHJldHVybiBiKGEpLnJlcGxhY2UoLyYoPyFbXFx3I10rOyl8Wzw+XCInXS9nLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZShhLCBiKSB7XHJcblx0XHRpZiAobShhKSlmb3IgKHZhciBjID0gMCwgZCA9IGEubGVuZ3RoOyBkID4gYzsgYysrKWIuY2FsbChhLCBhW2NdLCBjLCBhKTsgZWxzZSBmb3IgKGMgaW4gYSliLmNhbGwoYSwgYVtjXSwgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGYoYSwgYikge1xyXG5cdFx0dmFyIGMgPSAvKFxcLylbXlxcL10rXFwxXFwuXFwuXFwxLywgZCA9IChcIi4vXCIgKyBhKS5yZXBsYWNlKC9bXlxcL10rJC8sIFwiXCIpLCBlID0gZCArIGI7XHJcblx0XHRmb3IgKGUgPSBlLnJlcGxhY2UoL1xcL1xcLlxcLy9nLCBcIi9cIik7IGUubWF0Y2goYyk7KWUgPSBlLnJlcGxhY2UoYywgXCIvXCIpO1xyXG5cdFx0cmV0dXJuIGVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGcoYiwgYykge1xyXG5cdFx0dmFyIGQgPSBhLmdldChiKSB8fCBpKHtmaWxlbmFtZTogYiwgbmFtZTogXCJSZW5kZXIgRXJyb3JcIiwgbWVzc2FnZTogXCJUZW1wbGF0ZSBub3QgZm91bmRcIn0pO1xyXG5cdFx0cmV0dXJuIGMgPyBkKGMpIDogZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaChhLCBiKSB7XHJcblx0XHRpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgYikge1xyXG5cdFx0XHR2YXIgYyA9IGI7XHJcblx0XHRcdGIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBrKGMpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHZhciBkID0galthXSA9IGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBiKGMsIGEpICsgXCJcIlxyXG5cdFx0XHR9IGNhdGNoIChkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGkoZCkoKVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGQucHJvdG90eXBlID0gYi5wcm90b3R5cGUgPSBuLCBkLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gYiArIFwiXCJcclxuXHRcdH0sIGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGkoYSkge1xyXG5cdFx0dmFyIGIgPSBcIntUZW1wbGF0ZSBFcnJvcn1cIiwgYyA9IGEuc3RhY2sgfHwgXCJcIjtcclxuXHRcdGlmIChjKWMgPSBjLnNwbGl0KFwiXFxuXCIpLnNsaWNlKDAsIDIpLmpvaW4oXCJcXG5cIik7IGVsc2UgZm9yICh2YXIgZCBpbiBhKWMgKz0gXCI8XCIgKyBkICsgXCI+XFxuXCIgKyBhW2RdICsgXCJcXG5cXG5cIjtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBcIm9iamVjdFwiID09IHR5cGVvZiBjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IoYiArIFwiXFxuXFxuXCIgKyBjKSwgYlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIGogPSBhLmNhY2hlID0ge30sIGsgPSB0aGlzLlN0cmluZywgbCA9IHtcclxuXHRcdFwiPFwiOiBcIiYjNjA7XCIsXHJcblx0XHRcIj5cIjogXCImIzYyO1wiLFxyXG5cdFx0J1wiJzogXCImIzM0O1wiLFxyXG5cdFx0XCInXCI6IFwiJiMzOTtcIixcclxuXHRcdFwiJlwiOiBcIiYjMzg7XCJcclxuXHR9LCBtID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYSkge1xyXG5cdFx0XHRyZXR1cm4gXCJbb2JqZWN0IEFycmF5XVwiID09PSB7fS50b1N0cmluZy5jYWxsKGEpXHJcblx0XHR9LCBuID0gYS51dGlscyA9IHtcclxuXHRcdCRoZWxwZXJzOiB7fSwgJGluY2x1ZGU6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XHJcblx0XHRcdHJldHVybiBhID0gZihjLCBhKSwgZyhhLCBiKVxyXG5cdFx0fSwgJHN0cmluZzogYiwgJGVzY2FwZTogZCwgJGVhY2g6IGVcclxuXHR9LCBvID0gYS5oZWxwZXJzID0gbi4kaGVscGVycztcclxuXHRhLmdldCA9IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRyZXR1cm4galthLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKV1cclxuXHR9LCBhLmhlbHBlciA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRvW2FdID0gYlxyXG5cdH0sIG1vZHVsZS5leHBvcnRzID0gYVxyXG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA4IDkgMTEgMTIgMTMgMTQgMTYgMTcgMTgiLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25vLWRhdGEuY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25vLWRhdGEuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbm8tZGF0YS5jc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2Nzcy9uby1kYXRhLmNzc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgOSAxMiAxMyAxNCAxNiAxNyAxOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm5vLWRhdGEtYmd7XFxyXFxuICAgIG1hcmdpbjogNDclIGF1dG8gNSU7XFxyXFxuICAgIGhlaWdodDogNTdweDtcXHJcXG4gICAgd2lkdGg6IDU4cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIHJlcXVpcmUoXCIuLi9pbWcvbm8tZGF0YS5wbmdcIikgKyBcIikgY2VudGVyIGNlbnRlciBuby1yZXBlYXQ7XFxyXFxuICAgIGJhY2tncm91bmQtc2l6ZTogNThweCA1N3B4O1xcclxcbn1cXHJcXG4ubm8tZGF0YS10aXB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgY29sb3I6ICM5OTk5OTk7XFxyXFxufVwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyIS4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2Nzcy9uby1kYXRhLmNzc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgOSAxMiAxMyAxNCAxNiAxNyAxOCIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHR2YXIgcmVzdWx0ID0gW107XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcblx0XHRcdGlmKGl0ZW1bMl0pIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcblx0fTtcblxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuXHRcdH1cblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBsaXN0O1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA3IDkgMTEgMTIgMTMgMTQgMTYgMTcgMTgiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFJVUFBQUNIQ0FZQUFBQTRFcG8zQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUE0QnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU15MWpNREV4SURZMkxqRTBOVFkyTVN3Z01qQXhNaTh3TWk4d05pMHhORG8xTmpveU55QWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rOXlhV2RwYm1Gc1JHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEcGhZV05oTXpneVpDMDNaVGRtTFRSbE1ETXRZV1F3TXkxbFlUSmtZMlV4TmpGaE1XUWlJSGh0Y0UxTk9rUnZZM1Z0Wlc1MFNVUTlJbmh0Y0M1a2FXUTZORVUwTVVRMk5FWXpNakV6TVRGRk5rRkVOemc1UkRVME9FTXdOa1JEUWtZaUlIaHRjRTFOT2tsdWMzUmhibU5sU1VROUluaHRjQzVwYVdRNk5FVTBNVVEyTkVVek1qRXpNVEZGTmtGRU56ZzVSRFUwT0VNd05rUkRRa1lpSUhodGNEcERjbVZoZEc5eVZHOXZiRDBpUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5UTmlBb1YybHVaRzkzY3lraVBpQThlRzF3VFUwNlJHVnlhWFpsWkVaeWIyMGdjM1JTWldZNmFXNXpkR0Z1WTJWSlJEMGllRzF3TG1scFpEb3pOek00WkRSaU1pMWtPREUwTFRRNU5UVXRZamN4TkMwek9HTTJNamMwWWpObE9UWWlJSE4wVW1WbU9tUnZZM1Z0Wlc1MFNVUTlJbUZrYjJKbE9tUnZZMmxrT25Cb2IzUnZjMmh2Y0RvMU5EVTBZV1V5T0MwMVpUUXdMVEV4TnprdE9EUXhaaTA0Tm1VME9XUXpPVGRrTVdRaUx6NGdQQzl5WkdZNlJHVnpZM0pwY0hScGIyNCtJRHd2Y21SbU9sSkVSajRnUEM5NE9uaHRjRzFsZEdFK0lEdy9lSEJoWTJ0bGRDQmxibVE5SW5JaVB6N1lrTFFvQUFBTHdFbEVRVlI0MnV4ZFNVOGNSeGd0bXNWNHdjYllKc1liU0FRRFJra01KREV6VWFRY0xEa1NqdklIa2pQM25ITHhLWGZmdWVjZVM1RXM3RWkyNUVzdTRIaVhMV1JzdklNQnMzbkY0TlNyZEtGMmg1bXVxdTZacnByK25sVE0yQXd6UFZXdnYrOTlyNnVxcTFpSk1Edzg3UEdISDNuN21iYzhiNTh3UWx4TThmWTNiNy96OXNmUTBOQmFLVDZrcWtTRU9Pd2YrRmMwamlYREdHOC9jV0xjdHA0VW5CQkgrY05mdk8ydXJxNW16YzNOckxHeGtkWFYxYkdxcWlvYVNrTjgrUENCdlh2M2pzM1B6N1BwNldtMnVycUsvNTdqN1FRbnhxaTFwT0NFYU9RUC8vRFd0blhyVnRiZTNzNXFhMnRwUkJQR3lzb0t1M3YzTG52NThpWCsrWkMzTHpneFhpVDEvbDdDeC9zckNMRnAweWJXMGRGQmhDZ1IwSytIRHg5bTlmWDErT2RCM2s1WkdTbDRsS2pqRDg5NTJ3NUNiTisrblVhdnhGaGNYR1RqNCtONHVveDB6YVBGVzlzaXhiY2dCRmhNaENnUDBNL1FhaHpiZVB2T3h2U1Jsd2RLS0I4YUdocmswMitTZXMrYUJJOHZoeDhRbURwWVdscGlNek16YkhsNVdRZ29xT3lzNmdRTThPN2R1NE1ESFlsdDI3YXgyZGxaUEIyd1NsTndQWUgzbWVHdHFidTdtMjNac2tWSlFVOU9UcktGaFFVNjNVUFlzV01IYTIxdFZSTHFyMSsvWnJkdTNSTG5GMitOU1JoYVNVVUttRlZObnVleHpaczNLeEhpenAwNzdPM2J0d3hlUmxkWGx5aGY0V2ZnUGJLR3RiVTE0VCtnekx4OSs3WTRVZEEvcURCOHpWQVE2Ry8wNGVycUtzTExFZDV1MkVLS1kvaUJDQkZsVUNFOTRNdURFTkFmSjA2Y1lEdDM3c3g4ZE5pN2Q2OW9QVDA5YkdSa1JGUVdFeE1UckxPek03SlBrYkx4ZWwvWHhTWkZVcWRsVHVhM0tNek56UW5UQldmQTRPQWdFU0lFUk11VEowOHllRDNvSitpdEtBUjBYQ0s2SWlsU0RLaUt6S21wS2ZIWTM5K3ZKYWl5Qkp4YzZCOEFscllHS1hKV2tJS0xUQnpSWnlxa2dKYUFNSUp1UUZna0ZCRnBYRStnbjk2OGVTT3VlVVNSeUVjWEg0K2ROa1FLWEFtdFJqcUlVc3UrVjg5Mjdkb1ZLYUN5RHZRUHl0Tmd2eFVDaEtadmVTZVNRcElneFlDcW5wQmZUbjVaUW5ISWZucjE2bFZaVTBoaXBGRFJFL0xMN2RtemgwWmNBYktmb2lKRjZLUzBJbExrZEVsQmtVS1BGSnFSWXNDZjlaWU9LZmlIdC9HSFp0VFJVUzRteE5MNzkrK0ZlR3BxYXFJUlZ3REs5WnFhR2pHaEJyNU9NVWdUaTBPYVdLbEZDaEVsVkV3cnlYYUl6Q3k2bGlaQW42Sy9WRk5JSUZya1V5Y0ZpVXo3VWtpYXBEaEdJclB5S2hCalVuQTlnY0s0bDBTbVBaRWlLUk1yVHFUb1kySWFRRzJrRVVVaTB4eTRGcUlxTnBNeXNlS1FRdHVmSUpGWlZyR1pzNW9VSkRKVFNTR3BSSXE4YXVWQklqTVpVbWhHQ21NVHkraVArSWZ0NHcvN1ZVd3JFcG5salJSSm1GaGVuQ2lCQTRqU0NFR1JTUk5xeklBNW14RDBtTGFIUytrYTBTSmZUbEpvK3hPb09ud0dFMktJelhLWVdLYWtVSFl5S1hXVVA0WEVyVUMwU2NIMUJHYlM5T3RHQ2lKRitjUm1YQlBMSkZKZ3E0RjZHQ3FZWEVxVlIzbWdZM2ZITmJGTVNLR3NKekFuRTQyY3pGVEZacTRjcEZEMkoyU29JNUdack5nczlVd3NFMUo4VFhvaUhXQlhJSk1LUk5mRTBub3hmM01jVlR1ZWsybGxkd1VTeDhUU2pSUURvUThra1ptUzJGUlpuVzlxWWhtUmdrUm1lbUlUMHhRTXhPYUFGYVFna1psK2FXcGFnU2lUZ3V1SmFpa3l5Y2wwZ3hTbUpwWk9wT2dCK1VMR0NKSENZckZwYW1McGtFSnIreUlTbWRhSnpWeXFwQ0NSYVkvWU5ER3hkRWh4VEZWUGtNZ3NUN1FvMVV3c3BSZjVJcVZMTlZLUW5pZ3RkSnhORXhQTDA0a1NFQzA2cGhXUkl2MEtKSFFpNTVNa2hiSS9RYVFvSHltd0s1Q20yQnhJa2hUYUloTlg5VWhrbGdiWVZSQnpXVXAxR1QyU0ZQN0dxZG9pVXk2ako2UXZOblZOTEpWSUFZRzVBK1dsam1sRi9rUnBVVW9UUzRVVTY2bEQ1YzQrcENlc0Y1dTVKRWloUFAyT0lrVTZwRkFSbXpvbWxsYWtJSkZwbjlnRUlWQ0Y2RlFnVVNhV0Z5RXlZWGowcUlwTUdTVklaTnFuSzNSTXJLaElnVXZsSGhpcE1zaVVPdXdsUlNoYTVPT1FRa3RQMEpZRDlwYWw0UlFTaHhSNUVwbjJSd29EWnpNWE4zMlF5TFFVMEhud0gxVEZwcXFKNVJVUm1aK0NqREN0ZEtiems4aTAxNjlRTmJHS1JRcnhSeW9icDFMcWNGSnM1b3hKUVNLenNzU21pb21WR0Nrb1VqZ25OZ3VhV0Y0QlBZRmJCaDROTVl0RXBxVmlFOFlVQ0pHVWlWVW9VbUJUa21vc2ZWZTVOeWFKVEdkMVJWNkhGTXJiRFZEcWNLc0NDYWNRSFZLUWs1bmhDcVFRS1l3Vy9oQXAwbzBVcW1JenlzVHlOaENaaC9oRGkrckdxVUdSS1hkYUlaUVhPSGwxeEdhVWllVVZLa1ZCQ0pYTjFlVkJ5TjNtQ2U2bkVDOHBmNEpTaHgwcEpBa1R5MHRLVDFEbDRXeWsrSitKNVlYMEJPN20wbWRTamxLa3NJTVVXQWVDOVNCUktHWmloU01GYnY5VUIyMmdjdHRwYk1TT0Rka2hNb2tVNlFJYUVFMzFNbm9vV3VTTGtTSm5FaVZJWkxxZlFvcVJna3lyQ2lDRndmUzhYR1NrSUpIcGRnV2lHaWtLbVZoZVFHUzI4SWRXNkFNcVI5MG1oYXJZTEdSaWVlSFVvWEszSHhLWkZTazJjeHVSd2loMWtNaTBDM0krUzlROVREZElJUnRHQ2kwbkUxRkNrb0pnRDZTVmdKdmI2bFlnMHNUeWZEMkJVLzFMSFZMSW5FVlJ3aTdJeWtObGNwU1VDMkVUUzBhS3o1R1NNTUFxZTFBRXliQzh2RXdqWVFtUU1wNC9mNzZ1TDFRUk5yRThrOVFSekVWVFUxTktXK3dRU28rclY2K0tDQTVDcURqU0c2V1FXS1RBaDRJWU9JakxseS9UaUtTTUJ3OGVDRklBKy9idDAvcmJjQVZpVElyZ2g5KzRjWU9OajQvVHlLUUFuSlFndy9uejUwVXBpdW9EdS9McUlHeGkxZkFmbUM3VllVS0tob1lHc2RIbjlQUTB1M2p4SXB1ZG5XVjlmWDFhb1N2TFFOcDk5dXlaS085VnF3VUp2SDVoWVlFOWZQandJM3VncmExTit6aWtpZVhMZ0FHb1JhMk5VOE00Y09DQVlDZ0V6clZyMTlqTm16ZFpTMHVMMkdsRm1tQWd5VVpMRC9GN3FGK1lYNWpLcDdJOHNSS0FrMmgwZEpROWV2UW9rZmREcFlHb0hjZEVSRUR3U1pHcllaclQrY1BBUUI0NmRFaXc5UEhqeDRLMUpsOFdVYWUzdDVkMWRYVlZOQ0dndjhiR3h0WW4yRUlVWWxNWUZSYzUzTzhnQThZTmZSZjNoTUw3SU5KL0ZDbDBVMGNZaUF4b1lCdHFaWmhiOG9zWENvMzRQVjZIc25acGFZbGR1blNKVFV4TXNPUEhqMWRrQ2dJaEVDRUFSRWFjM2JaOHowQUoyd2RTOU92V3RjV0FOS1RxZFFURjBzek1qSWcwaURMbnpwMWpnNE9EMm1lUHpZQjJRSVFBRUZsdHU3SWNJT2N1OUxxNFpLcHlpK3BTQVlNUHdkcloyU2wwemRPblQ5bVZLMWNxS2tvZ1FpQXlJa0xZT05VZ21INjhvQUsxSVlUaExBSkFDbmw5eFhVZ25UNTU4a1E4Mzc5L3YvWEhhMTE4UnAyTmlnU1g1dS9mdjE4UnBFQmFsR0pPOVpvRWtTSUVyRjRINE5KVkFuQXBJRTZGUjZUd0t4bDVocW1zalhTRkZIRXJ2RXlUQXRvQ0dnZFgvZnphMlZsZ25lMkxGeThvVWlTaGhHSElBRW01Zm1rQjdpV2luZXF1eFVRS2hSVGlPaWxjU3gxT2tBS2Rpa3FFUkNhUlFvUmJ1R3l3eU9FR3VwdytLRkpRQ2xuSC9QeThFTXZ5YWpDUmdranhVWlJ3YVZxQTFhU1FGY2pjM0p6eTRoWVNtUlZPQ3BSdzh1cXR0SXFKRkJrbmhjc3B4RVhUaWtoUkJqM2htbW5sRENsd2xrRzlZNXFmUFBNb2RXU2NGRkR0TXZ5NnBDdGNOSzJjSVVVd2hkeTdkODhaUFNFbjFSQXBTZ1JNdkVIRXdEUTlGOXpONjlldkN5Y1docFZMcHBWVHBNQnNKYm5GODRVTEY1UzM3MGtEaUJCeUdTWFd2N2dJWjZaTFk5RVJsRHlXQTV3NWM4YTZhZ1F6MHJFUWFtUmtSRHhIZEpNenlGeURNN1VTSnQxMGRIU0lOYXNneHRtelowWDB3RVRZTkJVK0NMQzR1Q2ltRHNxOUlVeVg3eEVwRElCSTBkM2RMVUkwMW9sZ1ZwWk5NN09RNXBBeVhOOHQwTGx0YUJBeERoNDhLRG9mWnlqMFJacnpMZVR5UFVRclZFbVZzQjdXMmIySjRCSWliOU9ON0RJc05BbEVDZ0tSZ2tDa0lCQXBDRVFLQXBHQ1FLUWdaSWNVbGJDNm01QWNLY1ErZVM0dnpTUEVSMkN6dWpjZ3hWMDhVNzN2RktFeUVaaWpNZzVTbk1VelhIVWtaQmVCOFI4QktZWjVXOEdXdmxpSlJjZ2VNTzRZZi9BQWZQQ0dob2FRUGs3amZ5WW5KNGtZR1NRRXh0M0hhZkJCWGpvL3hkdVJ0YlcxSHpCakdpL0VQczlZc29lNUFsblpNenNMUUpXSjJlYlFFRWdaZm9RQS92UjV3TlpIZTNoNEdIdjUvY2JiTDd6VlV2ZGxCaXQrcGpqRm84VEtSNlFJa0tPZFB3eng5ajM3NzVZUDlkUnZGUWZZRUxoQnl3aUczSmNRNi9oWGdBRUFObzFWSStZWnNmUUFBQUFBU1VWT1JLNUNZSUk9XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9pbWcvbm8tZGF0YS5wbmdcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMyA0IDkgMTIgMTMgMTQgMTYgMTcgMTgiLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA3IDkgMTEgMTIgMTMgMTQgMTYgMTcgMTgiLCJ2YXIgc2VsZT1yZXF1aXJlKCcuLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L21vY2stc2VsZWN0LmpzJyk7XHJcbnZhciBob21lPXJlcXVpcmUoJy4uL2RlcC91dGlsL3V0aWwnKTtcclxudmFyIG5vZGF0YT1yZXF1aXJlKCcuLi9kZXAvY29tcG9uZW50L25vLWRhdGEvbm8tZGF0YS5qcycpO1xyXG4vL+eUn+aIkOiPnOWNlVxyXG5ob21lLmdvX21lbnUoJ2NvbnRhaW5lcicpO1xyXG4vL+iOt+WPlm9wZW5pZCBhcHBpZFxyXG52YXIgYXBpZD0nJyxvcGlkPScnO1xyXG5hcGlkPXNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FwcGlkJyk7XHJcbm9waWQ9c2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnb3BlbmlkJyk7XHJcblxyXG4vL21vYmFuXHJcbnZhciBtb2RlPXJlcXVpcmUoJ2FmdGVyY2xhc3Nqb2IudHBsJyk7XHJcbi8v6K+35rGC5LiL5ouJ5qGG5pWw5o2u6aG16Z2i5pi+56S6XHJcbnZhciBwbGFuaWQ9Jyc7XHJcbnZhciBwbGFuaW5kZXhpZD0nJztcclxuJC5hamF4KHtcclxuICAgIHR5cGU6J3Bvc3QnLFxyXG4gICAgdXJsOmhvbWUuZ2V0QXBpVXJsKCdIb21lU2Nob29sQ29udGFjdC9MZXJuaW5nUGF0aC9HZXRTdWJqZWN0R3JhZGVMaXN0UGxhbkluZm8nKSxcclxuICAgIGRhdGFUeXBlOidqc29uJyxcclxuICAgIGRhdGE6e1wiT3BlbklEXCI6b3BpZCxcIkFwcElEXCI6YXBpZH0sXHJcbiAgICBzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGhvbWUuY2hlY2tCaW5kKGRhdGEpO1xyXG4gICAgICAgIGlmKCFkYXRhLk4ubGVuZ3RoKXtcclxuICAgICAgICAgICAgbm9kYXRhLmluaXQoJ2NvbnRhaW5lcicsJ+aaguaXoOaKpeWQjeWtpuenkScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGRhdGEuT0spe1xyXG4gICAgICAgICAgICB2YXIgbWVzc2FnZT17XCJkYXRhXCI6W119O1xyXG4gICAgICAgICAgICBpZihkYXRhLk9LKXtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8ZGF0YS5OLmxlbmd0aDtpKyspe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmRhdGFbaV09e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6ZGF0YS5OW2ldLnBsYW5pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6ZGF0YS5OW2ldLm9yZGVyTnVtID4gMCA/IGRhdGEuTltpXS5HcmFkZU5hbWUgKyBkYXRhLk5baV0uU3ViamVjdE5hbWUrZGF0YS5OW2ldLm9yZGVyTnVtOmRhdGEuTltpXS5HcmFkZU5hbWUgKyBkYXRhLk5baV0uU3ViamVjdE5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGUoJ2NsYXNzLWxlYXJuJyxtZXNzYWdlLGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGFuaWQ9aWQ7XHJcbiAgICAgICAgICAgIH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKHBsYW5pZCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHh1ZWFuKHBsYW5pZCk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBub2RhdGEuaW5pdCgnbWFpbicsJ+aaguaXoOWtpuahiOS/oeaBrycpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jbGFzcy1kYXRlJykuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sJ2xlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KTtcclxuZnVuY3Rpb24geHVlYW4ocGxhbmlkKXtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZToncG9zdCcsXHJcbiAgICAgICAgdXJsOmhvbWUuZ2V0QXBpVXJsKCdIb21lU2Nob29sQ29udGFjdC9MZXJuaW5nUGF0aC9HZXRQbGFuSW5kZXhMaXN0JyksXHJcbiAgICAgICAgZGF0YVR5cGU6J2pzb24nLFxyXG4gICAgICAgIGRhdGE6e1wiT3BlbklEXCI6b3BpZCxcIkFwcElEXCI6YXBpZCxcIlBsYW5JZFwiOnBsYW5pZH0sXHJcbiAgICAgICAgc3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgaWYoIWRhdGEuTi5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgbm9kYXRhLmluaXQoJ21haW4nLCfmmoLml6DlrabmoYjkv6Hmga8nKTtcclxuICAgICAgICAgICAgICAgICQoJy5jbGFzcy1kYXRlJykuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLm1haW4nKS5odG1sKG1vZGUoKSk7XHJcbiAgICAgICAgICAgIGlmKGRhdGEuT0spe1xyXG4gICAgICAgICAgICAgICAgdmFyIG1lc3NhZ2U9e1wiZGF0YVwiOltdfTtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuT0spe1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wO2k8ZGF0YS5OLmxlbmd0aDtpKyspe1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5kYXRhW2ldPXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjpkYXRhLk5baV0uUGxhbkluZGV4SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjpkYXRhLk5baV0uT3JkZXJOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzZWxlKCdjbGFzcy1kYXRlJyxtZXNzYWdlLGZ1bmN0aW9uKGlkKXtcclxuICAgICAgICAgICAgICAgICAgICBwbGFuaW5kZXhpZD1pZDtcclxuICAgICAgICAgICAgICAgIH0sZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICBkZXRhaW5scyhwbGFuaW5kZXhpZCk7XHJcbiAgICAgICAgICAgICAgICB9LCdjbCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGRldGFpbmxzKHBsYW5pbmRleCl7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6J3Bvc3QnLFxyXG4gICAgICAgIHVybDpob21lLmdldEFwaVVybCgnSG9tZVNjaG9vbENvbnRhY3QvTGVybmluZ1BhdGgvTGVzc29uUGxhbkRldGFpbHMnKSxcclxuICAgICAgICBkYXRhVHlwZTonanNvbicsXHJcbiAgICAgICAgZGF0YTp7XCJPcGVuSURcIjpvcGlkLFwiQXBwSURcIjphcGlkLFwiUGxhbmluZGV4XCI6cGxhbmluZGV4fSxcclxuICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG5cclxuICAgICAgICAgICAgaWYoIWRhdGEuTil7XHJcbiAgICAgICAgICAgICAgICBub2RhdGEuaW5pdCgnbWFpbicsJ+aaguaXoOWtpuahiOS/oeaBrycpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5tYWluJykuaHRtbChtb2RlKCkpO1xyXG4gICAgICAgICAgICBpZihkYXRhLlJlc3VsdCl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLk4uSXNUaXRsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnRlYWNocGxhbi1uYW1lJykuaHRtbChkYXRhLk4uVGl0bGVOYW1lKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy50ZWFjaHBsYW4tbmFtZScpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5OLklzRmlyc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5jcmktY29udGFpbicpLmh0bWwoZGF0YS5OLkZpcnN0TWFyayk7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuY2xhc3Nyb29tLWludGFrZScpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5OLklzVGFyZ2V0KXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcudGVhY2hhaW0gPiBwICcpLmh0bWwoZGF0YS5OLlRhcmdldE1hcmspO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnRlYWNoYWltJykuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhLk4uSXNEaWZmKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuZGlmZiA+IHAgJykuaHRtbChkYXRhLk4uRGlmZk1hcmspO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmRpZmYnKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEuTi5Jc1N1bW1hcnkpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5zdW1tYXJ5ID4gcCcpLmh0bWwoZGF0YS5OLlN1bW1hcnlNYXJrKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5zdW1tYXJ5JykuaHRtbCgnJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJCgnLnRlYWNocGxhbi1zdGFydHRpbWUnKS5odG1sKHRpbWUoZGF0YS5OLlN0YXJ0VGltZVxyXG4gICAgICAgICAgICAgICAgKSArJ34nKyB0aW1lKGRhdGEuTi5FbmRUaW1lKSApO1xyXG4gICAgICAgICAgICAgICAgJCgnLmtvbndwb2ludCcpLmh0bWwoJycpO1xyXG4gICAgICAgICAgICAgICAgJCgnLnRlc3R3YXknKS5odG1sKCcnKTtcclxuICAgICAgICAgICAgICAgIHZhciBwb0luZGV4PTE7XHJcbiAgICAgICAgICAgICAgICAkLmVhY2goZGF0YS5OLlBsYW5Qb2ludHNMaXN0LGZ1bmN0aW9uKGluZGV4LGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGl0ZW0uQ3VycmVudExldmVyID09IDIgJiYgaXRlbS5Jc1Nob3cpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcj1pdGVtLlBsYW5Qb2ludHNJRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3YXlJbmRleD0xO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnLmtvbndwb2ludCcpLmFwcGVuZChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPGRpdiBpZD0nICsgaXRlbS5QbGFuUG9pbnRzSUQgKyAnPjxwIGNsYXNzPVwicG9pbnQtdGl0bGVcIj7nn6Xor4bngrknICsgcG9JbmRleCArICc6JyArIGl0ZW0uUG9pbnROYW1lICsgJzwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycrcGFyKS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJrb253cG9pbnQtdGl0bGVcIj48L2Rpdj4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvSW5kZXgrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChkYXRhLk4uUGxhblBvaW50c0xpc3QsZnVuY3Rpb24oaW5kZXgsaXRlbSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoaXRlbS5DdXJyZW50TGV2ZXIgPT0gMyAmJiBpdGVtLklzU2hvdyAmJiBpdGVtLlBhcmVudElEPT1wYXIgKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycraXRlbS5QYXJlbnRJRCkuZmluZCgnLmtvbndwb2ludC10aXRsZScpLmFwcGVuZCgnPHA+Jyt3YXlJbmRleCsnOicraXRlbS5Qb2ludE5hbWUrJzwvcD4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnIycraXRlbS5QYXJlbnRJRCkuYXBwZW5kKCc8ZGl2IGlkPScraXRlbS5QbGFuUG9pbnRzSUQrJz48cCBjbGFzcz1cInRlc3R3YXktdGl0bGVcIj7ogIPms5UnK3dheUluZGV4Kyc6JytpdGVtLlBvaW50TmFtZSsnPC9wPjxkaXYgY2xhc3M9XCJqaW5ncGluXCI+PHA+57K+5ZOB5L6L6aKYPC9wPjwvZGl2PjxkaXYgY2xhc3M9XCJzdWl0YW5nXCI+PHA+6ZqP5aCC57uD5LmgPC9wPjwvZGl2PjwvZGl2PicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3YXlJbmRleCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uKGRhdGEuTi5QbGFuSW5kZXhJRCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuZnVuY3Rpb24gIHF1ZXN0aW9uKHBsYW5pbmRleCl7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6J3Bvc3QnLFxyXG4gICAgICAgIHVybDpob21lLmdldEFwaVVybCgnSG9tZVNjaG9vbENvbnRhY3QvTGVybmluZ1BhdGgvR2V0UGxhblF1ZXN0aW9uSXRlbXMnKSxcclxuICAgICAgICBkYXRhVHlwZTonanNvbicsXHJcbiAgICAgICAgZGF0YTp7XCJPcGVuSURcIjpvcGlkLFwiQXBwSURcIjphcGlkLFwiUGxhbmluZGV4XCI6cGxhbmluZGV4fSxcclxuICAgICAgICBzdWNjZXNzOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAkLmVhY2goZGF0YS5OLGZ1bmN0aW9uKGluZGV4LGl0ZW0pe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5Qb2ludFR5cGUgPT0gMSA/ICQoJyMnK2l0ZW0uUGxhblBvaW50c0lEKS5maW5kKCcuamluZ3BpbicpLmFwcGVuZCgnPHA+5L6L6aKYJytpdGVtLkl0ZW1JbmRleCsnPC9wPicraXRlbS5JdGVtTmFtZSArJzxwPuino+aekDo8L3A+JytpdGVtLkl0ZW1BbmFseSk6JCgnIycraXRlbS5QbGFuUG9pbnRzSUQpLmZpbmQoJy5zdWl0YW5nJykuYXBwZW5kKCc8cD7nu4PkuaAnK2l0ZW0uSXRlbUluZGV4Kyc8L3A+JytpdGVtLkl0ZW1OYW1lICsnPHA+6Kej5p6QPC9wPicraXRlbS5JdGVtQW5hbHkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaG9tZS5pbml0TWF0aEpheE9iaignY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIC8vaW5pdEltZygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiAgdGltZShkYXRhKXtcclxuICAgIHZhciBzdHJpbmdUPWRhdGEuc3BsaXQoJ1QnKTtcclxuICAgIHZhciByZXN1bHQ9c3RyaW5nVFswXS5yZXBsYWNlKC8tLywn5bm0JykucmVwbGFjZSgvLS8sJ+aciCcpO1xyXG4gICAgdmFyIGg9c3RyaW5nVFsxXS5zcGxpdCgnOicpO1xyXG4gICAgcmVzdWx0PXJlc3VsdCArICfml6UgJytoWzBdKyc6JytoWzFdO1xyXG4gICAgcmV0dXJuIHJlc3VsdCA7XHJcbn1cclxuXHJcbi8v5aSE55CG6K+V6aKY5qC35byPXHJcbi8qZnVuY3Rpb24gaW5pdEltZygpe1xyXG4gICAgdmFyIGltZz0kKCcua29ud3BvaW50JykuZmluZCgnaW1nJyk7XHJcbiAgICB2YXIgdz1kb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIHx8IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgZm9yKHZhciBpPTA7aTxpbWcubGVuZ3RoO2krKyl7XHJcbiAgICAgICAgaWYgKGltZy5lcShpKS53aWR0aCgpID49IHcpIHtcclxuICAgICAgICAgICAgaW1nLmVxKGkpLndpZHRoKFwiMTAwJVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0qL1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vanMvYWZ0ZXJjbGFzc2pvYi5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAxIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzIwLlxyXG4gKi9cclxucmVxdWlyZSgnLi9jc3MvbW9jay1zZWxlY3QuY3NzJyk7XHJcbnZhciBzZWxlY3RUcGwgPSByZXF1aXJlKCdtb2NrLXNlbGVjdC10cGwnKTtcclxudmFyIHNlbGVjdFVsVHBsID0gcmVxdWlyZSgnc2VsZWN0LXVsLXRwbCcpO1xyXG5cclxuZnVuY3Rpb24gbW9ja1NlbGVjdChkb20sIGRhdGEsIGNhbGxiYWNrSWQsIGNhbGxiYWNrLCBpZCwgY2FsbEJhY2tGbGFnKXtcclxuICAgIHRoaXMuZG9tID0gJChcIi5cIiArIGRvbSk7XHJcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgdGhpcy5jYWxsYmFja0lkID0gY2FsbGJhY2tJZDtcclxuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcclxuICAgIHRoaXMuaWQgPSAkKFwiI1wiICsgaWQpO1xyXG4gICAgdGhpcy5jYWxsQmFja0ZsYWcgPSBjYWxsQmFja0ZsYWc7XHJcbiAgICB0aGlzLmluaXREb20oKTtcclxuICAgIHRoaXMuaW5pdEJ0bnMoKTtcclxufVxyXG5tb2NrU2VsZWN0LnByb3RvdHlwZSA9IHtcclxuICAgIGluaXREb206IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5kb20uaHRtbChzZWxlY3RUcGwodGhpcy5kYXRhKSk7XHJcbiAgICAgICAgdGhpcy5pZC5odG1sKHNlbGVjdFVsVHBsKHRoaXMuZGF0YSkpO1xyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tJZCh0aGlzLmRvbS5maW5kKFwiLm5hbWVcIikuYXR0cignZGF0YS1pZCcpKTtcclxuICAgICAgICBpZiAodGhpcy5jYWxsQmFja0ZsYWcpIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsQmFja0ZsYWcodHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgb2Zmc2V0ID0gdGhpcy5kb20ub2Zmc2V0KCk7XHJcbiAgICAgICAgdGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuY3NzKHtcclxuICAgICAgICAgICAgJ2xlZnQnOiAwLFxyXG4gICAgICAgICAgICAndG9wJzogb2Zmc2V0LnRvcCArIDQyXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuY3NzKHtcclxuICAgICAgICAgICAgJ21heC1oZWlnaHQnOiAkKHdpbmRvdykuaGVpZ2h0KCkgLSBvZmZzZXQuaGVpZ2h0IC0gb2Zmc2V0LnRvcFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIGluaXRCdG5zOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8v54K55Ye75pi+56S65LiL5ouJXHJcbiAgICAgICAgdmFyIHRUaGlzPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuZG9tLnVuZGVsZWdhdGUoKS5kZWxlZ2F0ZSgnLm5hbWUtd3JhcCcsICd0YXAnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0VGhpcy5kb20pO1xyXG4gICAgICAgICAgICBpZiAoISh0VGhpcy5kb20uZmluZCgnLm5hbWUtd3JhcCcpLmhhc0NsYXNzKCdhY3RpdmUnKSkpIHtcclxuICAgICAgICAgICAgICAgICQoXCIubW9jay1zZWxlY3RcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoXCIubmFtZS13cmFwXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoXCIubW9jay11bFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmRvbS5maW5kKFwiLm1vY2stc2VsZWN0XCIpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vY2stdWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5tb2NrLXNlbGVjdFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmluZChcIi5uYW1lLXdyYXBcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5kb20uZmluZChcIi5tb2NrLXNlbGVjdFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/kuIvmi4nmtojlpLFcclxuICAgICAgICB0aGlzLmlkLnVuZGVsZWdhdGUoKS5kZWxlZ2F0ZSgnbGknLCAndGFwJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIHRUaGlzLmlkLmZpbmQoXCJsaS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmVcIikuZmluZChcIi5yaWdodFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXktbm9uZVwiKTtcclxuICAgICAgICAgICAgdFRoaXMuZG9tLmZpbmQoJy5uYW1lLXdyYXAnKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmluZChcIi5uYW1lXCIpLmh0bWwoJCh0aGlzKS5maW5kKFwiLml0ZW0tbmFtZVwiKS5odG1sKCkpLmF0dHIoXCJkYXRhLWlkXCIsICQodGhpcykuYXR0cihcImRhdGEtaWRcIikpO1xyXG4gICAgICAgICAgICB0VGhpcy5kb20uZmluZChcIi5tb2NrLXNlbGVjdFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHRUaGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIHRUaGlzLmNhbGxiYWNrSWQodFRoaXMuZG9tLmZpbmQoXCIubmFtZVwiKS5hdHRyKCdkYXRhLWlkJykpO1xyXG4gICAgICAgICAgICBpZiAodFRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+S4i+aLiea2iOWksVxyXG4gICAgICAgICQoZG9jdW1lbnQpLnVuYmluZChcIi5sb2NhbFwiKS5iaW5kKFwidGFwLmxvY2FsXCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubW9jay11bFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoJy5uYW1lLXdyYXAsLm1vY2stc2VsZWN0JykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbSwgZGF0YSwgY2FsbGJhY2tJZCwgY2FsbGJhY2ssIGlkLCBjYWxsQmFja0ZsYWcpe1xyXG4gICAgLyoqXHJcbiAgICAgKiAqIOaooeaLn+S4i+aLieahhue7hOS7tlxyXG4gICAgICog5ou/5YiwaWRcclxuICAgICAqIEBwYXJhbSBkb20gICAgICAg5LiL5ouJ5qGG54i257qnY2xhc3NcclxuICAgICAqIEBwYXJhbSBkYXRhICAgICAg5LiL5ouJ5pWw5o2u77yI5aSE55CG6L+H55qE5qC85byP5Li6e2RhdGE6IFt7aWQ6JycsbmFtZTonJ30se30se31dfe+8iSzlj6blpJbms6jmhI9vcmRlck51bSA+IDAgPyArb3JkZXJOdW0gOiAnJ1xyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrSWQgICAgICDpgJrov4flm57osIPkvKDnu5nkuKrkurrpobXpnaLpnIDopoHnmoRpZFxyXG4gICAgICogQHBhcmFtIGNhbGxiYWNrICAgICAgICDkuKrkurrpobXpnaLnmoTlm57osIPlpITnkIZcclxuICAgICAqIEBwYXJhbSBpZCAgICAgICAgICAgICAg5a2Y5pS+5LiL5ouJ6YCJ6aG555qEaWRcclxuICAgICAqIEBwYXJhbSBjYWxsQmFja0ZsYWfvvIjpnZ7lv4XkvKDvvIkgIOWRiuiviemhtemdouaooeadv+a4suafk+WujOS6huacieS6hmlk562J5Y+C5pWwIOWPr+S7pea4suafk+S4quS6uumhtemdouS6hlxyXG4gICAgICovXHJcbiAgICByZXR1cm4gbmV3IG1vY2tTZWxlY3QoZG9tLCBkYXRhLCBjYWxsYmFja0lkLCBjYWxsYmFjaywgaWQsIGNhbGxCYWNrRmxhZyk7XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L21vY2stc2VsZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEgNCA5IDEyIDE4IiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9tb2NrLXNlbGVjdC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbW9jay1zZWxlY3QuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbW9jay1zZWxlY3QuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvY3NzL21vY2stc2VsZWN0LmNzc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxOCIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm1vY2stc2VsZWN0e1xcclxcbiAgICBsaW5lLWhlaWdodDogNDJweDtcXHJcXG4gICAgaGVpZ2h0OiA0MnB4O1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGJvcmRlcjpub25lO1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmV7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxufVxcclxcbi5tb2NrLXVse1xcclxcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICAgIGJhY2tncm91bmQ6ICNmZmY7XFxyXFxuICAgIHotaW5kZXg6IDEwMDtcXHJcXG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkOWQ5ZDk7XFxyXFxuICAgIHdpZHRoOiA5My42JTtcXHJcXG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcHtcXHJcXG4gICAgY29sb3I6ICNmZmY7XFxyXFxuICAgIGhlaWdodDogNDJweDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5iZ3tcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBoZWlnaHQ6IDZweDtcXHJcXG4gICAgd2lkdGg6IDEzcHg7XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAubmFtZS13cmFwIC5iZ3tcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ltZy9hcnJvdy1ib3R0b20ucG5nXCIpICsgXCIpIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEzcHggNnB4O1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmV7XFxyXFxuICAgIGNvbG9yOiAjMDBkNTM1O1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmUgLmJnIHtcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ltZy9hcnJvdy10b3AucG5nXCIpICsgXCIpIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0O1xcclxcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEzcHggNnB4O1xcclxcbn1cXHJcXG4ubW9jay11bCBsaXtcXHJcXG4gICAgbWFyZ2luOjA7XFxyXFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICBoZWlnaHQ6IDQycHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xcclxcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2Q5ZDlkOTtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGkgLnJpZ2h0e1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBmbG9hdDogcmlnaHQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMXJlbTtcXHJcXG4gICAgcGFkZGluZzogMTZweCAwO1xcclxcbiAgICBoZWlnaHQ6IDlweDtcXHJcXG4gICAgd2lkdGg6IDE0cHg7XFxyXFxufVxcclxcbi5tb2NrLXVsIGxpLmFjdGl2ZSAucmlnaHR7XFxyXFxuICAgIGRpc3BsYXk6IGlubGluZTtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGkuYWN0aXZle1xcclxcbiAgICBjb2xvcjogIzAwZDUzNTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Nzcy1sb2FkZXIhLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2Nzcy9tb2NrLXNlbGVjdC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMSA0IDkgMTIgMTgiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCNEFBQUFQQ0FZQUFBRHp1bitjQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUE0QnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU15MWpNREV4SURZMkxqRTBOVFkyTVN3Z01qQXhNaTh3TWk4d05pMHhORG8xTmpveU55QWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rOXlhV2RwYm1Gc1JHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEcGhZV05oTXpneVpDMDNaVGRtTFRSbE1ETXRZV1F3TXkxbFlUSmtZMlV4TmpGaE1XUWlJSGh0Y0UxTk9rUnZZM1Z0Wlc1MFNVUTlJbmh0Y0M1a2FXUTZSalJCUWpCRk1VRXpNakE0TVRGRk5qZ3pPVGM1UVRnME1qWTFRMFZETWpJaUlIaHRjRTFOT2tsdWMzUmhibU5sU1VROUluaHRjQzVwYVdRNlJqUkJRakJGTVRrek1qQTRNVEZGTmpnek9UYzVRVGcwTWpZMVEwVkRNaklpSUhodGNEcERjbVZoZEc5eVZHOXZiRDBpUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5UTmlBb1YybHVaRzkzY3lraVBpQThlRzF3VFUwNlJHVnlhWFpsWkVaeWIyMGdjM1JTWldZNmFXNXpkR0Z1WTJWSlJEMGllRzF3TG1scFpEcGhOVEl6T1RZd1lTMHhZV0l5TFRRNE9UTXRPR1l3TkMwME5HRTFNbVpqTWpaaE5EZ2lJSE4wVW1WbU9tUnZZM1Z0Wlc1MFNVUTlJbUZrYjJKbE9tUnZZMmxrT25Cb2IzUnZjMmh2Y0RvNU5qUmxaakpsTmkwellqZzFMVEV4TnprdE9UVXpNeTFrWVRKaU1ETTJNVGN4TW1NaUx6NGdQQzl5WkdZNlJHVnpZM0pwY0hScGIyNCtJRHd2Y21SbU9sSkVSajRnUEM5NE9uaHRjRzFsZEdFK0lEdy9lSEJoWTJ0bGRDQmxibVE5SW5JaVB6Nm9DdUJEQUFBQWYwbEVRVlI0MnJ6UFN3NkFJQXdFMEJvOEtUZkRlNXBhRENTb2ZEb0lURElrN2VZVlltWWpQWGhkbkRkSkhscUl1MkJSaENQdVZxQnZlQ2IrUUhQd0RQeURsdUNSZUJhdHdTUHdJdHFDLytCVlZBUDM0RTFVQ3lPNENrVmdEYTVHVWJpR1EyZ1BuTU5oMUhjblBLZlVKck1OT3lqYi9lMittT1FRT0pjQUF3RGZmbHB1ZGhhcmxBQUFBQUJKUlU1RXJrSmdnZz09XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LWJvdHRvbS5wbmdcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMSA0IDkgMTIgMTgiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFCNEFBQUFQQ0FZQUFBRHp1bitjQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUF5SnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU15MWpNREV4SURZMkxqRTBOVFkyTVN3Z01qQXhNaTh3TWk4d05pMHhORG8xTmpveU55QWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1BTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZJaUI0Yld4dWN6cDRiWEJOVFQwaWFIUjBjRG92TDI1ekxtRmtiMkpsTG1OdmJTOTRZWEF2TVM0d0wyMXRMeUlnZUcxc2JuTTZjM1JTWldZOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOXpWSGx3WlM5U1pYTnZkWEpqWlZKbFppTWlJSGh0Y0RwRGNtVmhkRzl5Vkc5dmJEMGlRV1J2WW1VZ1VHaHZkRzl6YUc5d0lFTlROaUFvVjJsdVpHOTNjeWtpSUhodGNFMU5Pa2x1YzNSaGJtTmxTVVE5SW5odGNDNXBhV1E2TlRaRU9FSXlPRFF6TWpCQk1URkZOamhCT0RGRE56STVRelV3UXpJM05EZ2lJSGh0Y0UxTk9rUnZZM1Z0Wlc1MFNVUTlJbmh0Y0M1a2FXUTZOVFpFT0VJeU9EVXpNakJCTVRGRk5qaEJPREZETnpJNVF6VXdRekkzTkRnaVBpQThlRzF3VFUwNlJHVnlhWFpsWkVaeWIyMGdjM1JTWldZNmFXNXpkR0Z1WTJWSlJEMGllRzF3TG1scFpEbzFOa1E0UWpJNE1qTXlNRUV4TVVVMk9FRTRNVU0zTWpsRE5UQkRNamMwT0NJZ2MzUlNaV1k2Wkc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRvMU5rUTRRakk0TXpNeU1FRXhNVVUyT0VFNE1VTTNNamxETlRCRE1qYzBPQ0l2UGlBOEwzSmtaanBFWlhOamNtbHdkR2x2Ymo0Z1BDOXlaR1k2VWtSR1BpQThMM2c2ZUcxd2JXVjBZVDRnUEQ5NGNHRmphMlYwSUdWdVpEMGljaUkvUHFXK3JkZ0FBQUI3U1VSQlZIamF2TlU3Q29Bd0VBVFFaSEliZXoyTzRNVzA4RGIyZWh2UkJBeWtVWlA5RGN4Mnd5dlh1NzEzeElSMHJtNDdLV013MERuVkgwT3dnak02UGlYaFlLQTVKQnhNbEl4REFDWGhFRUtiY1FpaVRUaUUwV29jQ21nVkRpWDBGNGNpK29sREdYM0ZZWUNXK0pKeEg3K1RCVnBtaloxdUFRWUF1WjB0KzBzKzVJd0FBQUFBU1VWT1JLNUNZSUk9XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LXRvcC5wbmdcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMSA0IDkgMTIgMTgiLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvbW9jay1zZWxlY3QtdHBsJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsZGF0YT0kZGF0YS5kYXRhLCRvdXQ9Jyc7JG91dCs9JzxkaXYgY2xhc3M9XCJtb2NrLXNlbGVjdCBmb250LXNpemUxNlwiPiA8ZGl2IGNsYXNzPVwibmFtZS13cmFwXCI+IDxzcGFuIGNsYXNzPVwibmFtZVwiIGRhdGEtaWQ9XCInO1xuJG91dCs9JGVzY2FwZShkYXRhWzBdLmlkKTtcbiRvdXQrPSdcIj4nO1xuJG91dCs9JGVzY2FwZShkYXRhWzBdLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJiZ1wiPjwvc3Bhbj4gPC9kaXY+IDwvZGl2Pic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvbW9jay1zZWxlY3QtdHBsLnRwbFxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAxIDQgOSAxMiAxOCIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCdkZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9zZWxlY3QtdWwtdHBsJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlYWNoPSR1dGlscy4kZWFjaCxkYXRhPSRkYXRhLmRhdGEsJHZhbHVlPSRkYXRhLiR2YWx1ZSwkaW5kZXg9JGRhdGEuJGluZGV4LCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsJG91dD0nJzskb3V0Kz0nPHVsIGNsYXNzPVwibW9jay11bCBib3gtcGFkZGluZyBkaXNwbGF5LW5vbmVcIj4gJztcbiRlYWNoKGRhdGEsZnVuY3Rpb24oJHZhbHVlLCRpbmRleCl7XG4kb3V0Kz0nICc7XG5pZigkaW5kZXggPT0gMCl7XG4kb3V0Kz0nIDxsaSBjbGFzcz1cImFjdGl2ZVwiIHN0eWxlPVwiYm9yZGVyOm5vbmU7XCIgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5pZCk7XG4kb3V0Kz0nXCI+IDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3JpZ2h0LnBuZ1wiIGNsYXNzPVwicmlnaHRcIj4gPC9saT4gJztcbn1lbHNle1xuJG91dCs9JyA8bGkgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5pZCk7XG4kb3V0Kz0nXCI+IDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3JpZ2h0LnBuZ1wiIGNsYXNzPVwicmlnaHRcIj4gPC9saT4gJztcbn1cbiRvdXQrPScgJztcbn0pO1xuJG91dCs9JyA8L3VsPic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvc2VsZWN0LXVsLXRwbC50cGxcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMSA0IDkgMTIgMTgiLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgndHBsL2FmdGVyY2xhc3Nqb2InLCcgPHVsIGNsYXNzPVwidGVhY2gtcGxhblwiPiA8bGkgY2xhc3M9XCJ0ZWFjaHBsYW4taW5mb1wiPiA8cCBjbGFzcz1cInRlYWNocGxhbi1uYW1lIHRpdGxlXCI+PC9wPiA8cCBjbGFzcz1cInRlYWNocGxhbi1zdGFydHRpbWVcIj48L3A+IDwvbGk+IDxsaSBjbGFzcz1cImNsYXNzcm9vbS1pbnRha2VcIj4gPGRpdiBjbGFzcz1cInRpdGxlXCI+PGkgY2xhc3M9XCJpY29uIGZsXCI+PC9pPjxwIGNsYXNzPVwiZmxcIj7or77loILlvJXlhaU8L3A+PC9kaXY+IDxwIGNsYXNzPVwiY3JpLWNvbnRhaW5cIj48L3A+IDwvbGk+IDxsaSBjbGFzcz1cInRlYWNoYWltXCI+IDxkaXYgY2xhc3M9XCJ0aXRsZVwiPjxpIGNsYXNzPVwiaWNvbiBmbFwiPjwvaT48cCBjbGFzcz1cImZsXCI+5pWZ5a2m55uu5qCHPC9wPjwvZGl2PiA8cD48L3A+IDwvbGk+IDxsaSBjbGFzcz1cImRpZmZcIj4gPGRpdiBjbGFzcz1cInRpdGxlXCI+PGkgY2xhc3M9XCJpY29uIGZsXCI+PC9pPjxwIGNsYXNzPVwiZmxcIj7ph43pmr7ngrnliIbmnpA8L3A+PC9kaXY+IDxwPjwvcD4gPC9saT4gPGxpIGNsYXNzPVwidGVhY2gtY291cnNlXCI+IDxkaXYgY2xhc3M9XCJ0aXRsZVwiPjxpIGNsYXNzPVwiaWNvbiBmbFwiPjwvaT48cCBjbGFzcz1cImZsXCI+5pWZ5a2m6L+H56iLPC9wPjwvZGl2PiA8ZGl2IGNsYXNzPVwia29ud3BvaW50XCI+IDwvZGl2PiA8L2xpPiA8bGkgY2xhc3M9XCJzdW1tYXJ5XCI+IDxkaXYgY2xhc3M9XCJ0aXRsZVwiPjxpIGNsYXNzPVwiaWNvbiBmbFwiPjwvaT48cCBjbGFzcz1cImZsXCI+5pa55rOV5LiO5oC757uTPC9wPjwvZGl2PiA8cD48L3A+IDwvbGk+IDwvdWw+Jyk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90cGwvYWZ0ZXJjbGFzc2pvYi50cGxcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMSJdLCJzb3VyY2VSb290IjoiIn0=