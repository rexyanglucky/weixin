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

	module.exports = __webpack_require__(56);


/***/ },

/***/ 2:
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
	       var baseurl='http://192.168.180.15:8997/';
	
	        //生产环境
	       //var baseurl='http://testing.mofangge.com/';
	       //var baseurl='http://localhost:8997/';
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

/***/ 3:
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

/***/ 4:
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

/***/ 6:
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

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports
	
	
	// module
	exports.push([module.id, ".no-data-bg{\r\n    margin: 47% auto 5%;\r\n    height: 57px;\r\n    width: 58px;\r\n    background: url(" + __webpack_require__(9) + ") center center no-repeat;\r\n    background-size: 58px 57px;\r\n}\r\n.no-data-tip{\r\n    text-align: center;\r\n    color: #999999;\r\n}", ""]);
	
	// exports


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

/***/ 9:
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAACHCAYAAAA4Epo3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEU0MUQ2NEYzMjEzMTFFNkFENzg5RDU0OEMwNkRDQkYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEU0MUQ2NEUzMjEzMTFFNkFENzg5RDU0OEMwNkRDQkYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzM4ZDRiMi1kODE0LTQ5NTUtYjcxNC0zOGM2Mjc0YjNlOTYiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NDU0YWUyOC01ZTQwLTExNzktODQxZi04NmU0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"

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

/***/ 33:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/26.
	 */
	var art = __webpack_require__(5);
	var u=__webpack_require__(2);
	
	//时间戳转化方法
	art.helper('dateFormat', function (date, format) {
	    date = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
	    date = new Date(date);
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
	});
	//获取科目
	art.helper('getSubjectName',function(subject){
	    return u.getSubjectName(subject);
	});
	//获取阶段
	art.helper('getStageStr',function(stage){
	        return u.getStageStr(stage);
	});
	//转码 正确答案
	art.helper('unEscape', function(answer){
	    if (!answer){
	        return "未作答";
	    } else {
	        return unescape(answer);
	    }
	});
	//获取题型
	art.helper('getItemStyle',function (obj) {
	    var subject=obj.Subjectid;
	    var style=obj.QuestionType;
	    if(subject=='03'||subject=='01')
	    {
	        if(style*1<101)
	        {
	            return 1;
	        }
	        else if(style*1<201)
	        {
	            return 2;
	        }
	        else if(style*1<301)
	        {
	            return 3;
	        }
	        else {
	            return 3;
	        }
	    }
	    else
	    {
	        return style;
	    }
	
	})

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/30.
	 */
	var noData = __webpack_require__(3);
	var util = __webpack_require__(2);
	__webpack_require__(33);
	var topicBody = __webpack_require__(57);
	var explainQues = __webpack_require__(58);
	var handlerTpl = __webpack_require__(61);
	
	var _num = 1;
	var homeworkStatus = util.getQueryString('homework-status');
	var searchHomeworkSubject = {
	    init: function(){
	        $(".header").find(".course-name").html(util.getQueryString('stage-subject-name'));
	        this.render();
	        this.initBtns();
	    },
	    render: function(){
	        var tThis = this;
	        $.ajax({
	            type:'post',
	            url: util.getApiUrl('HomeSchoolContact/LerningPath/HomeworkDetailsLP'),
	            data: {
	                AppID: sessionStorage.appid,
	                OpenID: sessionStorage.openid,
	                workId: util.getQueryString('homework-id'),
	                index: _num
	            },
	            dataType:'json',
	            success: function(dt){
	                util.checkBind(dt);
	                var data = dt.N;
	                data.homeworkStatus = homeworkStatus;
	                if (!data) {
	                    $(".handler").remove();
	                    $(".content-wrapper").addClass('no');
	                    noData.init("content-wrapper");
	                    return false;
	                }
	                $(".handler").addClass("click");
	                data.num = _num;
	                //data.QuestionCount = 21;
	                $(".homework-name").html(data.homeWorkName);
	                $(".content").html(topicBody(data));
	                $(".answer-analysis-note").html(explainQues(data));
	                if (homeworkStatus == 2 || homeworkStatus == 3) {
	                    $(".user-answer").hide();
	                    $(".score").hide();
	                    $(".subjective-answer").show();
	                }
	                $(".handler").html(handlerTpl(data));
	                $("img").css("max-width", "100%");
	                util.initMathJaxObj("content-wrapper");
	                tThis.initq();
	            }
	        })
	    },
	    initBtns: function(){
	        var tThis = this;
	        var $handler = $(".handler");
	        //查看评语 上一题 下一题
	        $handler.delegate('.homework-comment', 'touchend', function(){
	            location.href = encodeURI('./homework-comment.html' + '?stage-subject-name=' + $(".course-name").html() + '&homework-id=' + util.getQueryString("homework-id"));
	        }).delegate('.left-btn', 'touchend', function(){
	            if ($handler.hasClass("click")) {
	                $handler.removeClass("click");
	                tThis.render(--_num);
	            }
	        }).delegate('.right-btn', 'touchend', function(){
	            if ($handler.hasClass("click")) {
	                $handler.removeClass("click");
	                tThis.render(++_num);
	            }
	        });
	    },
	    //处理试题样式
	    initq: function(){
	        var winH = parseFloat(document.body.clientWidth);
	        var $tb = $('table');
	        //var $img = $(".subAnswer-style").find("img");
	        for (var i = 0, len1 = $tb.length; i < len1; i++) {
	            if ($tb.eq(i).width() >= winH) {
	                $tb.eq(i).width("100%");
	            }
	        }
	        /*for (var j = 0, len2 = $img.length; j < len2; j++) {
	            if ($img.eq(j).width() >= winH) {
	                $img.eq(j).width("100%");
	            }
	        }*/
	    }
	};
	$(function(){
	    searchHomeworkSubject.init();
	});

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);
	module.exports=template('tpl/topic-text',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,QuestionBody=$data.QuestionBody,$out='';$out+='<div class="bg-white box-padding-left box-padding-right box-padding-top border-bottom box-padding-bottom " > ';
	$out+=$string(QuestionBody);
	$out+=' </div>';
	return new String($out);
	});

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);__webpack_require__(59);__webpack_require__(60);
	module.exports=template('tpl/explainQuestion',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$value=$data.$value,getItemStyle=$data.getItemStyle,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';if(($value | getItemStyle)==1 ){
	$out+=' ';
	include('./choose-topic');
	$out+=' ';
	}else{
	$out+=' ';
	include('./subjective-topic');
	$out+=' ';
	}
	$out+=' ';
	return new String($out);
	});

/***/ },

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);
	module.exports=template('tpl/choose-topic',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$string=$utils.$string,RightAnswer=$data.RightAnswer,UserAnswer=$data.UserAnswer,UserResult=$data.UserResult,$escape=$utils.$escape,QuestionAnalsis=$data.QuestionAnalsis,NoteContent=$data.NoteContent,$out='';$out+='<div > 正确答案：<span class="color-green">';
	$out+=$string(RightAnswer||"　");
	$out+='</span>， <span class="user-answer">您的答案：</span> ';
	if( UserAnswer){
	$out+=' ';
	if(UserResult==1){
	$out+=' <span class="color-green user-answer">';
	$out+=$string(UserAnswer);
	$out+='<i style="font-style:normal;color:black">，</i></span> 回答： <span class="color-green" >正确 </span>。 ';
	}else if(UserResult==0||UserResult==2){
	$out+=' <span class="color-red user-answer">';
	$out+=$string(UserAnswer || "未作答");
	$out+='<i style="font-style:normal;color:black">，</i></span> 回答： <span class="color-red" >错误 </span>。 ';
	}
	$out+=' ';
	}else{
	$out+=' <span class="color-green user-answer">';
	$out+=$escape("　");
	$out+='<i style="font-style:normal;color:black">，</i></span> 回答： <span class="color-black" > 未作答 </span>。 ';
	}
	$out+=' </div> <span class="color-green">试题分析：</span> <div class="answer-ques" > <div id="explain-que">';
	$out+=$string(QuestionAnalsis);
	$out+='</div> <span class="color-green pretext" >笔记：</span> <pre class="color-siliver pretext" id="text-book"> ';
	if(NoteContent==null){
	$out+=' <p class="color-siliver">(无)</p> ';
	}else{
	$out+=' <pre class="color-black pretext"> ';
	$out+=$string(NoteContent);
	$out+='</pre> ';
	}
	$out+=' </pre> </div> ';
	return new String($out);
	});

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);
	module.exports=template('tpl/subjective-topic',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,Score=$data.Score,AllScore=$data.AllScore,$string=$utils.$string,UserAnswer=$data.UserAnswer,RightAnswer=$data.RightAnswer,QuestionAnalsis=$data.QuestionAnalsis,NoteContent=$data.NoteContent,$out='';$out+='<div class="subAnswer-style" > <div class="score">得分： <span id="outcome">';
	$out+=$escape(Score);
	$out+='分</span>，满分：';
	$out+=$escape(AllScore);
	$out+='分</div> <span class="color-green user-answer">您的答案：</span><div class="color-black user-answer" >';
	$out+=$string($helpers. unEscape(UserAnswer ));
	$out+='</div> <span class="color-green ">正确答案：</span> <div class="color-black" >';
	$out+=$string(RightAnswer||"  ");
	$out+='</div> <div class="subjective-answer display-none" > <span class="color-green "> 回答：</span> <span class="color-black" > 未作答 </span>。</div> </div> <span class="color-green ">试题分析：</span> <div class="answer-ques"> <div id="explain-que" style="overflow:hidden;zoom:1;color:black">';
	$out+=$string(QuestionAnalsis||"<br>");
	$out+='</div> <span class="color-green " >笔记：</span> <pre class="color-siliver pretext" id="text-book"> ';
	if(NoteContent==null){
	$out+=' <div class="color-siliver">(无)</div> ';
	}else{
	$out+=' <div class="color-black pretext"> ';
	$out+=$string(NoteContent);
	$out+='</div> ';
	}
	$out+=' </pre> </div> ';
	return new String($out);
	});

/***/ },

/***/ 61:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(5);
	module.exports=template('tpl/handler',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,num=$data.num,QuestionCount=$data.QuestionCount,homeworkStatus=$data.homeworkStatus,$out='';if(num == 1){
	$out+=' ';
	if(QuestionCount == 1){
	$out+=' <div class="homework-comment"> <img class="search" src="../bundle/img/search.png"> ';
	if(homeworkStatus == 3){
	$out+=' <span>忽略原因</span> ';
	}else{
	$out+=' <span>查看评语</span> ';
	}
	$out+=' </div> ';
	}else{
	$out+=' <div class="some-subjects"> <div class="homework-comment border-right w49 fl"> <img class="search" src="../bundle/img/search.png"> ';
	if(homeworkStatus == 3){
	$out+=' <span>忽略原因</span> ';
	}else{
	$out+=' <span>查看评语</span> ';
	}
	$out+=' </div> <div class="right-btn w50 fl"> <img src="../bundle/img/right-text.png"> <span>下一题</span> </div> <div> ';
	}
	$out+=' ';
	}else if(num >= QuestionCount){
	$out+=' <div class="last left-btn"> <img src="../bundle/img/left-text.png"> <span>上一题</span> </div> ';
	}else{
	$out+=' <div class="middle"> <div class="left-btn border-right w49 fl"> <img class="search" src="../bundle/img/left-text.png"> <span>上一题</span> </div> <div class="right-btn w50 fl"> <img src="../bundle/img/right-text.png"> <span>下一题</span> </div> </div> ';
	}
	return new String($out);
	});

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjdiZDIyOTQyZjE3YzA4YWYzMGU/ZmNmMyoqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL3V0aWwvdXRpbC5qcz8yMjIxKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9uby1kYXRhL25vLWRhdGEuanM/MWYwOSoqKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvdHBsL25vLWRhdGEtdHBsLnRwbD8wYWM2KioqKioqIiwid2VicGFjazovLy8uL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzPzg5NjYqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2Nzcy9uby1kYXRhLmNzcz9iNjMyKioqKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvY3NzL25vLWRhdGEuY3NzP2E4MTUqKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcz9kYTA0KioqKioqKioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbm8tZGF0YS9pbWcvbm8tZGF0YS5wbmc/Y2Q0ZSoqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCoqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvdGVtcGxhdGUtaGVscGVyLmpzPzhiZTIqIiwid2VicGFjazovLy8uL2pzL3NlYXJjaC1ob21ld29yay1zdWJqZWN0LmpzIiwid2VicGFjazovLy8uL3RwbC90b3BpYy10ZXh0LnRwbCIsIndlYnBhY2s6Ly8vLi90cGwvZXhwbGFpblF1ZXN0aW9uLnRwbCIsIndlYnBhY2s6Ly8vLi90cGwvY2hvb3NlLXRvcGljLnRwbCIsIndlYnBhY2s6Ly8vLi90cGwvc3ViamVjdGl2ZS10b3BpYy50cGwiLCJ3ZWJwYWNrOi8vLy4vdHBsL2hhbmRsZXIudHBs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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDLEM7Ozs7Ozs7QUMvRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsVUFBVTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7QUMvRkQ7QUFDQTtBQUNBO0FBQ0EsY0FBYSx3R0FBd0c7QUFDckg7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7O0FDUEQscUNBQThDLHdCQUE4QjtBQUM1RTtBQUNBO0FBQ0EsY0FBYSw2SEFBNkgsaUJBQWlCLGtEQUFrRCxXQUFXLGFBQWEsU0FBUztBQUM5TztBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7O0FDZEQ7QUFDQTtBQUNBO0FBQ0EsY0FBYSx5UEFBeVA7QUFDdFE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUM7QUFDbkMsRUFBQztBQUNEO0FBQ0E7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0Esb0NBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7QUNuQ0Q7QUFDQTtBQUNBO0FBQ0EsY0FBYSx1UUFBdVE7QUFDcFI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5UUFBd1EsT0FBTztBQUMvUTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7QUN2QkQ7QUFDQTtBQUNBO0FBQ0EsY0FBYSxxSUFBcUk7QUFDbEo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFIiwiZmlsZSI6InNlYXJjaC1ob21ld29yay1zdWJqZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL21mZy13ZWNoYXQvYnVuZGxlL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMjdiZDIyOTQyZjE3YzA4YWYzMGVcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBodW1vckhhbiBvbiAyMDE2LzUvMjAuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cz17XHJcbiAgICBzY3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSAkKGRvY3VtZW50KS5oZWlnaHQoKTtcclxuICAgICAgICB2YXIgd2luZG93SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpO1xyXG4gICAgICAgIGlmKHNjcm9sbFRvcCArIHdpbmRvd0hlaWdodCA9PSBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZ2V0U3ViamVjdE5hbWU6ZnVuY3Rpb24oaWQpe1xyXG5cclxuICAgICAgICB2YXIgc3ViamVjdElkU3RyID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKGlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwMVwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLor63mlodcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDJcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5pWw5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjAzXCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuiLseivrVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwNFwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLniannkIZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDVcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5YyW5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA2XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuWcsOeQhlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwN1wiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLljoblj7JcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDhcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5pS/5rK7XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA5XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIueUn+eJqVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIxNFwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLlpaXmlbBcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0SWRTdHI7XHJcbiAgICB9LFxyXG4gICAgZ2V0U3RhZ2VTdHI6IGZ1bmN0aW9uIChzdGFnZUlkKSB7XHJcbiAgICAgICAgaWYoIXN0YWdlSWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuWIneS4rVwiO1xyXG4gICAgICAgICAgICByZXR1cm4gc3ViamVjdElkU3RyO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3RhZ2VJZFN0ciA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChzdGFnZUlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4XCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLlsI/lraZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY1wiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi5Yid5LitXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImdcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIumrmOS4rVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YWdlSWRTdHI7XHJcbiAgICB9LFxyXG4gICAgZ29fbWVudTpmdW5jdGlvbihjb25JZCl7XHJcbiAgICAgICAgdmFyIGNvbj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb25JZCk7XHJcbiAgICAgICAgdmFyIGltZz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVDb250cicpO1xyXG4gICAgICAgIGltZy5zcmM9Jy4uL2J1bmRsZS9pbWcvYm90dG9tLXl1YW4tc2hvdy5wbmcnO1xyXG4gICAgICAgIGNvbi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgIHZhciBtZW51Q29udHI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVDb250cicpO1xyXG4gICAgICAgIG1lbnVDb250ci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JyxtZW51Qm9keSxmYWxzZSk7XHJcbiAgICAgICAgZnVuY3Rpb24gbWVudUJvZHkoKXtcclxuICAgICAgICAgICAgdmFyIG1lbnVTaG93PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICB2YXIgaD13aW5kb3cuaW5uZXJIZWlnaHQrXCJweFwiO1xyXG4gICAgICAgICAgICBpZihtZW51U2hvdyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgdD1tZW51U2hvdy5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnN0dWR5LXNob3dcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYoIHQgPT0gJ2Rpc3BsYXk6IG5vbmU7Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNzdHVkeS1zaG93MVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudVNob3cuc3R5bGUuZGlzcGxheT0nYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL21lbnUyLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbi5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnaGVpZ2h0OicraCsnLG92ZXJmbG93OmhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudVNob3cuc3R5bGUuZGlzcGxheT0nbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYz1cIi4uL2J1bmRsZS9pbWcvYm90dG9tLXl1YW4tc2hvdy5wbmdcIjtcclxuICAgICAgICAgICAgICAgICAgICBjb24ucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHZhciBzaG93PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5zZXRBdHRyaWJ1dGUoJ2lkJywnbWVudVNob3cnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuc2V0QXR0cmlidXRlKCdzdHlsZScsJ2Rpc3BsYXk6YmxvY2s7Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LmlubmVySFRNTD0nPGEgaHJlZj1cImFmdGVyY2xhc3Nqb2IuaHRtbFwiIGNsYXNzPVwia3R4YVwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy94dWVhbi5wbmdcIi8+PC9hPjxhIGhyZWY9XCJob21ld29yay1saXN0Lmh0bWxcIiBjbGFzcz1cImt4amxcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvamlsdS5wbmdcIjwvYT48YSBocmVmPVwid3JvbmctZ2F0aGVyLmh0bWxcIiAgY2xhc3M9XCJjdGpqXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppamluLnBuZ1wiPjwvYT48YSBocmVmPVwibW9udGh3ZWFrLmh0bWxcIiBjbGFzcz1cIm15cnhcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvcnVveGlhbmcucG5nXCI+PC9hPic7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNob3cpO1xyXG4gICAgICAgICAgICAgICAgaW1nLnNyYz1cIi4uL2J1bmRsZS9pbWcvbWVudTIucG5nXCI7XHJcbiAgICAgICAgICAgICAgICBjb24uc2V0QXR0cmlidXRlKCdzdHlsZScsJ2hlaWdodDonK2grJyxvdmVyZmxvdzpoaWRkZW4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgc2hvd0NvbmZpcm06ZnVuY3Rpb24obXNnLGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsYXllcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxheWVyLmNsYXNzTmFtZT1cImxheWVyXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsYXllcik7XHJcbiAgICAgICAgdmFyIGNvbmZpcm09JzxkaXYgY2xhc3M9XCJwb3Bjb25maXJtXCI+JztcclxuICAgICAgICBjb25maXJtKz0nPGRpdiBjbGFzcz1cInRpdGxlXCI+JztcclxuICAgICAgICBjb25maXJtKz0nPGkgY2xhc3M9XCJpY29uLWNsb3NlXCI+PC9pPic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8L2Rpdj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj4nK21zZysnIDwvZGl2Pic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8ZGl2IGNsYXNzPVwiZm9vdFwiPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgPGlucHV0IGNsYXNzPVwicG9wYnRuIGJ0bm9rIGNvbG9yLWdyZWVuXCIgdHlwZT1cImJ1dHRvblwiICB2YWx1ZT1cIuehruWumlwiLz4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgIDxpbnB1dCBjbGFzcz1cInBvcGJ0biBidG5jYW5jZWwgY29sb3ItZ3JlZW5cIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLlj5bmtohcIi8+JztcclxuICAgICAgICBjb25maXJtKz0nICAgPC9kaXY+PC9kaXY+JztcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGNvbmZpcm0pO1xyXG4gICAgICAgIC8vJCgnLnBvcGNvbmZpcm0nKS5jc3MoJ3RvcCcsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSQoJy5wb3Bjb25maXJtJykuaGVpZ2h0KCkpLzIpO1xyXG4gICAgICAgICQoXCIuYnRub2tcIikudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICAgJChcIi5idG5va1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLmxheWVyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBvcGNvbmZpcm1cIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmJ0bmNhbmNlbCwuaWNvbi1jbG9zZVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLmxheWVyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBvcGNvbmZpcm1cIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/kv6Hmga/mj5DnpLrmoYZcclxuICAgIHNob3dQb3BNc2c6ZnVuY3Rpb24gKG1zZyx0eXBlKSB7XHJcbiAgICAgICAgdmFyIGh0bWw9XCJcIjtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgaHRtbD0nPGRpdiBjbGFzcz1cInBvcG1zZ1wiPjxkaXYgY2xhc3M9XCJjb250ZW50XCI+PGltZyBzdHlsZT1cIndpZHRoOjIyJSBcIiBzcmM9XCIuLi9idW5kbGUvaW1nL2xvZ2luLXN1Y2Vzcy5wbmdcIj48cD4nK21zZysnPC9wPjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgaHRtbD0nPGRpdiBjbGFzcz1cInBvcG1zZ1wiPjxkaXYgY2xhc3M9XCJjb250ZW50XCI+PGltZyBzdHlsZT1cIndpZHRoOjIyJSBcIiBzcmM9XCIuLi9idW5kbGUvaW1nL2xvZ2luLXRhbmhhby5wbmdcIj48cD4nK21zZysnPC9wPjwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGh0bWw9JzxkaXYgY2xhc3M9XCJwb3Btc2dcIj48ZGl2IGNsYXNzPVwiY29udGVudFwiPjxwPicrbXNnKyc8L3A+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL3ZhciBodG1sPSc8ZGl2IGNsYXNzPVwicG9wbXNnXCI+PGRpdiBjbGFzcz1cImNvbnRlbnRcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvbG9naW4tc3VjZXNzLnBuZ1wiPjxwPicrbXNnKyc8L3A+PC9kaXY+PC9kaXY+JztcclxuICAgICAgICAkKCcucG9wbXNnJykucmVtb3ZlKCk7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChodG1sKTtcclxuICAgICAgICAkKCcucG9wbXNnJykuY3NzKCdsZWZ0JywoZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAgLSQoJy5wb3Btc2cnKS53aWR0aCgpKS8yKTtcclxuICAgICAgICAkKCcucG9wbXNnJykuY3NzKCd0b3AnLChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0kKCcucG9wbXNnJykuaGVpZ2h0KCkpLzIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXskKCcucG9wbXNnJykucmVtb3ZlKCk7fSwxMDAwKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluaOpeWPo3VybCDlpoLojrflj5ZvcGVuaWQgICBnZXRBcGlVcmwoJ0FjY291bnQvR2V0T3BlbklEJylcclxuICAgIGdldEFwaVVybDpmdW5jdGlvbihhY3Rpb24pe1xyXG4gICAgICAgIC8v57q/5LiL5rWL6K+VXHJcbiAgICAgICAvL3ZhciBiYXNldXJsPSdodHRwOi8vMTkyLjE2OC4xODAuMTU6ODk5OC8nO1xyXG4gICAgICAgIC8v57q/5LiK5rWL6K+VXHJcbiAgICAgICB2YXIgYmFzZXVybD0naHR0cDovLzE5Mi4xNjguMTgwLjE1Ojg5OTcvJztcclxuXHJcbiAgICAgICAgLy/nlJ/kuqfnjq/looNcclxuICAgICAgIC8vdmFyIGJhc2V1cmw9J2h0dHA6Ly90ZXN0aW5nLm1vZmFuZ2dlLmNvbS8nO1xyXG4gICAgICAgLy92YXIgYmFzZXVybD0naHR0cDovL2xvY2FsaG9zdDo4OTk3Lyc7XHJcbiAgICAgICAgcmV0dXJuIGJhc2V1cmwrYWN0aW9uO1xyXG4gICAgfSxcclxuICAgIC8v6LCD55SoYXBp5oiQ5Yqf5ZCO77yM5YWI6LCD55So5q2k5pa55rOV77yM5Yik5pat55So5oi35piv5ZCm5bey57uP57uR5a6a77yM6Iul5pyq57uR5a6a77yM6Lez6L2s5Yiw57uR5a6a6aG1XHJcbiAgICBjaGVja0JpbmQ6ZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgaWYoIWRhdGEuT0spIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuQ29kZSA9PSAxIHx8IGRhdGEuQ29kZSA9PSAyIHx8IGRhdGEuQ29kZSA9PSA0IHx8IGRhdGEuQ29kZSA9PSAxMSB8fCBkYXRhLkNvZGUgPT0gMTIgfHwgZGF0YS5Db2RlID09IDEzKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiYmluZEluZm8uaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6I635Y+WT3BlbklkXHJcbiAgICBnZXRPcGVuSWQ6ZnVuY3Rpb24oYXBwaWQsYXBwc2VjcmV0LGNvZGUpe1xyXG52YXIgb3BlbmlkO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgYXN5bmM6ZmFsc2UsXHJcbiAgICAgICAgICAgIHVybDp0aGlzLmdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKSxcclxuICAgICAgICAgICAgLy8gZGF0YSB0byBiZSBhZGRlZCB0byBxdWVyeSBzdHJpbmc6XHJcbiAgICAgICAgICAgIGRhdGE6IHtBcHBJRDphcHBpZCxBcHBTZWNyZXQ6YXBwc2VjcmV0LENvZGU6Y29kZX0sXHJcbiAgICAgICAgICAgIC8vIHR5cGUgb2YgZGF0YSB3ZSBhcmUgZXhwZWN0aW5nIGluIHJldHVybjpcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgLy90aW1lb3V0OiAzMDAsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLk9LKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmlkPWRhdGEuSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KCdBamF4IGVycm9yIScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBvcGVuaWQ7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5Z1cmzlj4LmlbBcclxuICAgIGdldFF1ZXJ5U3RyaW5nOmZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIgKyBuYW1lICsgXCI9KFteJl0qKSgmfCQpXCIsIFwiaVwiKTtcclxuICAgIHZhciByID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcclxuICAgIGlmIChyICE9IG51bGwpIHJldHVybiB1bmVzY2FwZShkZWNvZGVVUkkoclsyXSkpOyByZXR1cm4gbnVsbDtcclxufSxcclxuXHJcbiAgICBkYXRlRm9ybWF0OiBmdW5jdGlvbihkYXRlLCBmb3JtYXQpe1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgdmFyIG1hcCA9IHtcclxuICAgICAgICAgICAgXCJZXCI6IGRhdGUuZ2V0WWVhcigpLFxyXG4gICAgICAgICAgICBcIk1cIjogZGF0ZS5nZXRNb250aCgpICsgMSwgLy/mnIjku71cclxuICAgICAgICAgICAgXCJkXCI6IGRhdGUuZ2V0RGF0ZSgpLCAvL+aXpVxyXG4gICAgICAgICAgICBcImhcIjogZGF0ZS5nZXRIb3VycygpLCAvL+Wwj+aXtlxyXG4gICAgICAgICAgICBcIm1cIjogZGF0ZS5nZXRNaW51dGVzKCksIC8v5YiGXHJcbiAgICAgICAgICAgIFwic1wiOiBkYXRlLmdldFNlY29uZHMoKSwgLy/np5JcclxuICAgICAgICAgICAgXCJxXCI6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksIC8v5a2j5bqmXHJcbiAgICAgICAgICAgIFwiU1wiOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvKFt5TWRobXNxU10pKy9nLCBmdW5jdGlvbiAoYWxsLCB0KSB7XHJcbiAgICAgICAgICAgIHZhciB2ID0gbWFwW3RdO1xyXG4gICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gJzAnICsgdjtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gdi5zdWJzdHIodi5sZW5ndGggLSAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHQgPT09ICd5Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnJykuc3Vic3RyKDQgLSBhbGwubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICB9LFxyXG4gICAgLy/lpITnkIbor5XpopjlhazlvI8gbWF0aGpheFxyXG4gICAgaW5pdE1hdGhKYXhPYmo6ZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgTWF0aEpheC5IdWIuUXVldWUoW1wiVHlwZXNldFwiLCBNYXRoSmF4Lkh1YiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0TG9jYWxUaW1lOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUocGFyc2VJbnQodmFsLnJlcGxhY2UoXCIvRGF0ZShcIiwgXCJcIikucmVwbGFjZShcIikvXCIsIFwiXCIpLCAxMCkpO1xyXG4gICAgICAgICAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSA8IDEwID8gXCIwXCIgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgOiBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudERhdGUgPSBkYXRlLmdldERhdGUoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldERhdGUoKSA6IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXRIb3VycygpIDogZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICB2YXIgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCkgOiBkYXRlLmdldE1pbnV0ZXMoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFyICsgXCItXCIgKyBtb250aCArIFwiLVwiICsgY3VycmVudERhdGUgKyBcIiBcIiArIGhvdXJzICsgXCI6XCIgKyBtaW51dGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W6aKY5Z6LXHJcbiAgIGdldEl0ZW1TdHlsZTpmdW5jdGlvbiAoc3ViamVjdCxzdHlsZSkge1xyXG4gICAgICAgaWYgKHN1YmplY3QgPT0gJzAzJyB8fCBzdWJqZWN0ID09ICcwMScpIHtcclxuICAgICAgICAgICBpZiAoc3R5bGUgKiAxIDwgMTAxKSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiAxO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgICAgICBlbHNlIGlmIChzdHlsZSAqIDEgPCAyMDEpIHtcclxuICAgICAgICAgICAgICAgcmV0dXJuIDI7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgICAgIGVsc2UgaWYgKHN0eWxlICogMSA8IDMwMSkge1xyXG4gICAgICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICAgICB9XHJcbiAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgIHJldHVybiAzO1xyXG4gICAgICAgICAgIH1cclxuICAgICAgIH1cclxuICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgIHJldHVybiBzdHlsZTtcclxuICAgICAgIH1cclxuICAgfVxyXG5cclxuXHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL3V0aWwvdXRpbC5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDYgOCA5IDEwIDExIDEyIDEzIDE0IDE2IDE3IDE4IDE5XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzI2LlxyXG4gKi9cclxudmFyIG5vRGF0YVRwbCA9IHJlcXVpcmUoJ25vLWRhdGEtdHBsJyk7XHJcbnJlcXVpcmUoJy4vY3NzL25vLWRhdGEuY3NzJyk7XHJcblxyXG52YXIgXyRlbDtcclxudmFyIG5vRGF0YSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKG1zZyl7XHJcbiAgICAgICAgdmFyIHA9e21zZzptc2d9XHJcbiAgICAgICAgXyRlbC5odG1sKG5vRGF0YVRwbChwKSk7XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oZG9tLG1zZyl7XHJcbiAgICAgICAgXyRlbCA9ICQoXCIuXCIgKyBkb20pO1xyXG4gICAgICAgIG5vRGF0YS5pbml0KG1zZyk7XHJcbiAgICB9LFxyXG5cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9uby1kYXRhL25vLWRhdGEuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgOSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCdkZXAvY29tcG9uZW50L25vLWRhdGEvdHBsL25vLWRhdGEtdHBsJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsbXNnPSRkYXRhLm1zZywkb3V0PScnOyRvdXQrPSc8ZGl2IGNsYXNzPVwibm8tZGF0YS1iZ1wiPjwvZGl2PiA8ZGl2IGNsYXNzPVwibm8tZGF0YS10aXAgZm9udC1zaXplMTJcIj4nO1xuJG91dCs9JGVzY2FwZShtc2cgfHwgJ+aaguaXoOaVsOaNricpO1xuJG91dCs9JzwvZGl2Pic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L25vLWRhdGEvdHBsL25vLWRhdGEtdHBsLnRwbFxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNCA5IDEyIDEzIDE0IDE2IDE3IDE4XG4gKiovIiwiLypUTU9ESlM6e30qL1xyXG4hZnVuY3Rpb24gKCkge1xyXG5cdGZ1bmN0aW9uIGEoYSwgYikge1xyXG5cdFx0cmV0dXJuICgvc3RyaW5nfGZ1bmN0aW9uLy50ZXN0KHR5cGVvZiBiKSA/IGggOiBnKShhLCBiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYihhLCBjKSB7XHJcblx0XHRyZXR1cm4gXCJzdHJpbmdcIiAhPSB0eXBlb2YgYSAmJiAoYyA9IHR5cGVvZiBhLCBcIm51bWJlclwiID09PSBjID8gYSArPSBcIlwiIDogYSA9IFwiZnVuY3Rpb25cIiA9PT0gYyA/IGIoYS5jYWxsKGEpKSA6IFwiXCIpLCBhXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjKGEpIHtcclxuXHRcdHJldHVybiBsW2FdXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkKGEpIHtcclxuXHRcdHJldHVybiBiKGEpLnJlcGxhY2UoLyYoPyFbXFx3I10rOyl8Wzw+XCInXS9nLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZShhLCBiKSB7XHJcblx0XHRpZiAobShhKSlmb3IgKHZhciBjID0gMCwgZCA9IGEubGVuZ3RoOyBkID4gYzsgYysrKWIuY2FsbChhLCBhW2NdLCBjLCBhKTsgZWxzZSBmb3IgKGMgaW4gYSliLmNhbGwoYSwgYVtjXSwgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGYoYSwgYikge1xyXG5cdFx0dmFyIGMgPSAvKFxcLylbXlxcL10rXFwxXFwuXFwuXFwxLywgZCA9IChcIi4vXCIgKyBhKS5yZXBsYWNlKC9bXlxcL10rJC8sIFwiXCIpLCBlID0gZCArIGI7XHJcblx0XHRmb3IgKGUgPSBlLnJlcGxhY2UoL1xcL1xcLlxcLy9nLCBcIi9cIik7IGUubWF0Y2goYyk7KWUgPSBlLnJlcGxhY2UoYywgXCIvXCIpO1xyXG5cdFx0cmV0dXJuIGVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGcoYiwgYykge1xyXG5cdFx0dmFyIGQgPSBhLmdldChiKSB8fCBpKHtmaWxlbmFtZTogYiwgbmFtZTogXCJSZW5kZXIgRXJyb3JcIiwgbWVzc2FnZTogXCJUZW1wbGF0ZSBub3QgZm91bmRcIn0pO1xyXG5cdFx0cmV0dXJuIGMgPyBkKGMpIDogZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaChhLCBiKSB7XHJcblx0XHRpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgYikge1xyXG5cdFx0XHR2YXIgYyA9IGI7XHJcblx0XHRcdGIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBrKGMpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHZhciBkID0galthXSA9IGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBiKGMsIGEpICsgXCJcIlxyXG5cdFx0XHR9IGNhdGNoIChkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGkoZCkoKVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGQucHJvdG90eXBlID0gYi5wcm90b3R5cGUgPSBuLCBkLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gYiArIFwiXCJcclxuXHRcdH0sIGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGkoYSkge1xyXG5cdFx0dmFyIGIgPSBcIntUZW1wbGF0ZSBFcnJvcn1cIiwgYyA9IGEuc3RhY2sgfHwgXCJcIjtcclxuXHRcdGlmIChjKWMgPSBjLnNwbGl0KFwiXFxuXCIpLnNsaWNlKDAsIDIpLmpvaW4oXCJcXG5cIik7IGVsc2UgZm9yICh2YXIgZCBpbiBhKWMgKz0gXCI8XCIgKyBkICsgXCI+XFxuXCIgKyBhW2RdICsgXCJcXG5cXG5cIjtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBcIm9iamVjdFwiID09IHR5cGVvZiBjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IoYiArIFwiXFxuXFxuXCIgKyBjKSwgYlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIGogPSBhLmNhY2hlID0ge30sIGsgPSB0aGlzLlN0cmluZywgbCA9IHtcclxuXHRcdFwiPFwiOiBcIiYjNjA7XCIsXHJcblx0XHRcIj5cIjogXCImIzYyO1wiLFxyXG5cdFx0J1wiJzogXCImIzM0O1wiLFxyXG5cdFx0XCInXCI6IFwiJiMzOTtcIixcclxuXHRcdFwiJlwiOiBcIiYjMzg7XCJcclxuXHR9LCBtID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYSkge1xyXG5cdFx0XHRyZXR1cm4gXCJbb2JqZWN0IEFycmF5XVwiID09PSB7fS50b1N0cmluZy5jYWxsKGEpXHJcblx0XHR9LCBuID0gYS51dGlscyA9IHtcclxuXHRcdCRoZWxwZXJzOiB7fSwgJGluY2x1ZGU6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XHJcblx0XHRcdHJldHVybiBhID0gZihjLCBhKSwgZyhhLCBiKVxyXG5cdFx0fSwgJHN0cmluZzogYiwgJGVzY2FwZTogZCwgJGVhY2g6IGVcclxuXHR9LCBvID0gYS5oZWxwZXJzID0gbi4kaGVscGVycztcclxuXHRhLmdldCA9IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRyZXR1cm4galthLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKV1cclxuXHR9LCBhLmhlbHBlciA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRvW2FdID0gYlxyXG5cdH0sIG1vZHVsZS5leHBvcnRzID0gYVxyXG59KCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgOCA5IDExIDEyIDEzIDE0IDE2IDE3IDE4XG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9uby1kYXRhLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9uby1kYXRhLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25vLWRhdGEuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2Nzcy9uby1kYXRhLmNzc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNCA5IDEyIDEzIDE0IDE2IDE3IDE4XG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubm8tZGF0YS1iZ3tcXHJcXG4gICAgbWFyZ2luOiA0NyUgYXV0byA1JTtcXHJcXG4gICAgaGVpZ2h0OiA1N3B4O1xcclxcbiAgICB3aWR0aDogNThweDtcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ltZy9uby1kYXRhLnBuZ1wiKSArIFwiKSBjZW50ZXIgY2VudGVyIG5vLXJlcGVhdDtcXHJcXG4gICAgYmFja2dyb3VuZC1zaXplOiA1OHB4IDU3cHg7XFxyXFxufVxcclxcbi5uby1kYXRhLXRpcHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBjb2xvcjogIzk5OTk5OTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9jc3Mvbm8tZGF0YS5jc3NcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDQgOSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDcgOSAxMSAxMiAxMyAxNCAxNiAxNyAxOFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUlVQUFBQ0hDQVlBQUFBNEVwbzNBQUFBR1hSRldIUlRiMlowZDJGeVpRQkJaRzlpWlNCSmJXRm5aVkpsWVdSNWNjbGxQQUFBQTRCcFZGaDBXRTFNT21OdmJTNWhaRzlpWlM1NGJYQUFBQUFBQUR3L2VIQmhZMnRsZENCaVpXZHBiajBpNzd1L0lpQnBaRDBpVnpWTk1FMXdRMlZvYVVoNmNtVlRlazVVWTNwcll6bGtJajgrSUR4NE9uaHRjRzFsZEdFZ2VHMXNibk02ZUQwaVlXUnZZbVU2Ym5NNmJXVjBZUzhpSUhnNmVHMXdkR3M5SWtGa2IySmxJRmhOVUNCRGIzSmxJRFV1TXkxak1ERXhJRFkyTGpFME5UWTJNU3dnTWpBeE1pOHdNaTh3TmkweE5EbzFOam95TnlBZ0lDQWdJQ0FnSWo0Z1BISmtaanBTUkVZZ2VHMXNibk02Y21SbVBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHhPVGs1THpBeUx6SXlMWEprWmkxemVXNTBZWGd0Ym5NaklqNGdQSEprWmpwRVpYTmpjbWx3ZEdsdmJpQnlaR1k2WVdKdmRYUTlJaUlnZUcxc2JuTTZlRzF3VFUwOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOXRiUzhpSUhodGJHNXpPbk4wVW1WbVBTSm9kSFJ3T2k4dmJuTXVZV1J2WW1VdVkyOXRMM2hoY0M4eExqQXZjMVI1Y0dVdlVtVnpiM1Z5WTJWU1pXWWpJaUI0Yld4dWN6cDRiWEE5SW1oMGRIQTZMeTl1Y3k1aFpHOWlaUzVqYjIwdmVHRndMekV1TUM4aUlIaHRjRTFOT2s5eWFXZHBibUZzUkc5amRXMWxiblJKUkQwaWVHMXdMbVJwWkRwaFlXTmhNemd5WkMwM1pUZG1MVFJsTURNdFlXUXdNeTFsWVRKa1kyVXhOakZoTVdRaUlIaHRjRTFOT2tSdlkzVnRaVzUwU1VROUluaHRjQzVrYVdRNk5FVTBNVVEyTkVZek1qRXpNVEZGTmtGRU56ZzVSRFUwT0VNd05rUkRRa1lpSUhodGNFMU5Pa2x1YzNSaGJtTmxTVVE5SW5odGNDNXBhV1E2TkVVME1VUTJORVV6TWpFek1URkZOa0ZFTnpnNVJEVTBPRU13TmtSRFFrWWlJSGh0Y0RwRGNtVmhkRzl5Vkc5dmJEMGlRV1J2WW1VZ1VHaHZkRzl6YUc5d0lFTlROaUFvVjJsdVpHOTNjeWtpUGlBOGVHMXdUVTA2UkdWeWFYWmxaRVp5YjIwZ2MzUlNaV1k2YVc1emRHRnVZMlZKUkQwaWVHMXdMbWxwWkRvek56TTRaRFJpTWkxa09ERTBMVFE1TlRVdFlqY3hOQzB6T0dNMk1qYzBZak5sT1RZaUlITjBVbVZtT21SdlkzVnRaVzUwU1VROUltRmtiMkpsT21SdlkybGtPbkJvYjNSdmMyaHZjRG8xTkRVMFlXVXlPQzAxWlRRd0xURXhOemt0T0RReFppMDRObVUwT1dRek9UZGtNV1FpTHo0Z1BDOXlaR1k2UkdWelkzSnBjSFJwYjI0K0lEd3ZjbVJtT2xKRVJqNGdQQzk0T25odGNHMWxkR0UrSUR3L2VIQmhZMnRsZENCbGJtUTlJbklpUHo3WWtMUW9BQUFMd0VsRVFWUjQydXhkU1U4Y1J4Z3Rtc1Y0d2NiWUpzWWJTQVFEUmtrTUpERXpVYVFjTERrU2p2SUhralAzbkhMeEtYZmZ1ZWNlUzVFczdFaTI1RXN1NEhpWExXUnN2SU1CczNuRjROU3JkS0YyaDVtdXF1NlpycHIrbmxUTTJBd3pQVld2dis5OXI2dXFxMWlKTUR3ODdQR0hIM243bWJjOGI1OHdRbHhNOGZZM2I3L3o5c2ZRME5CYUtUNmtxa1NFT093ZitGYzBqaVhER0c4L2NXTGN0cDRVbkJCSCtjTmZ2TzJ1cnE1bXpjM05yTEd4a2RYVjFiR3FxaW9hU2tOOCtQQ0J2WHYzanMzUHo3UHA2V20ydXJxSy81N2o3UVFueHFpMXBPQ0VhT1FQLy9EV3RuWHJWdGJlM3M1cWEydHBSQlBHeXNvS3UzdjNMbnY1OGlYKytaQzNMemd4WGlUMS9sN0N4L3NyQ0xGcDB5YlcwZEZCaENnUjBLK0hEeDltOWZYMStPZEIzazVaR1NsNGxLampEODk1Mnc1Q2JOKytuVWF2eEZoY1hHVGo0K040dW94MHphUEZXOXNpeGJjZ0JGaE1oQ2dQME0vUWFoemJlUHZPeHZTUmx3ZEtLQjhhR2hyazAyK1NlcythQkk4dmh4OFFtRHBZV2xwaU16TXpiSGw1V1Fnb3FPeXM2Z1FNOE83ZHU0TURIWWx0MjdheDJkbFpQQjJ3U2xOd1BZSDNtZUd0cWJ1N20yM1pza1ZKUVU5T1RyS0ZoUVU2M1VQWXNXTUhhMjF0VlJMcXIxKy9acmR1M1JMbkYyK05TUmhhU1VVS21GVk5udWV4elpzM0t4SGl6cDA3N08zYnR3eGVSbGRYbHloZjRXZmdQYktHdGJVMTRUK2d6THg5KzdZNFVkQS9xREI4elZBUTZHLzA0ZXJxS3NMTEVkNXUyRUtLWS9pQkNCRmxVQ0U5NE11REVOQWZKMDZjWUR0MzdzeDhkTmk3ZDY5b1BUMDliR1JrUkZRV0V4TVRyTE96TTdKUGtiTHhlbC9YeFNaRlVxZGxUdWEzS016TnpRblRCV2ZBNE9BZ0VTSUVSTXVUSjA4eWVEM29KK2l0S0FSMFhDSzZJaWxTREtpS3pLbXBLZkhZMzkrdkphaXlCSnhjNkI4QWxyWUdLWEpXa0lLTFRCelJaeXFrZ0phQU1JSnVRRmdrRkJGcFhFK2duOTY4ZVNPdWVVU1J5RWNYSDQrZE5rUUtYQW10UmpxSVVzdStWODkyN2RvVkthQ3lEdlFQeXROZ3Z4VUNoS1p2ZVNlU1FwSWd4WUNxbnBCZlRuNVpRbkhJZm5yMTZsVlpVMGhpcEZEUkUvTEw3ZG16aDBaY0FiS2ZvaUpGNktTMElsTGtkRWxCa1VLUEZKcVJZc0NmOVpZT0tmaUh0L0dIWnRUUlVTNG14Tkw3OSsrRmVHcHFhcUlSVndESzlacWFHakdoQnI1T01VZ1RpME9hV0tsRkNoRWxWRXdyeVhhSXpDeTZsaVpBbjZLL1ZGTklJRnJrVXljRmlVejdVa2lhcERoR0lyUHlLaEJqVW5BOWdjSzRsMFNtUFpFaUtSTXJUcVRvWTJJYVFHMmtFVVVpMHh5NEZxSXFOcE15c2VLUVF0dWZJSkZaVnJHWnM1b1VKREpUU1NHcFJJcThhdVZCSWpNWlVtaEdDbU1UeStpUCtJZnQ0dy83VlV3ckVwbmxqUlJKbUZoZW5DaUJBNGpTQ0VHUlNSTnF6SUE1bXhEMG1MYUhTK2thMFNKZlRsSm8reE9vT253R0UyS0l6WEtZV0tha1VIWXlLWFdVUDRYRXJVQzBTY0gxQkdiUzlPdEdDaUpGK2NSbVhCUExKRkpncTRGNkdDcVlYRXFWUjNtZ1kzZkhOYkZNU0tHc0p6QW5FNDJjekZURlpxNGNwRkQySjJTb0k1R1pyTmdzOVV3c0UxSjhUWG9pSFdCWElKTUtSTmZFMG5veGYzTWNWVHVlazJsbGR3VVN4OFRTalJRRG9ROGtrWm1TMkZSWm5XOXFZaG1SZ2tSbWVtSVQweFFNeE9hQUZhUWdrWmwrYVdwYWdTaVRndXVKYWlreXljbDBneFNtSnBaT3BPZ0IrVUxHQ0pIQ1lyRnBhbUxwa0VKcit5SVNtZGFKelZ5cXBDQ1JhWS9ZTkRHeGRFaHhURlZQa01nc1Q3UW8xVXdzcFJmNUlxVkxOVktRbmlndGRKeE5FeFBMMDRrU0VDMDZwaFdSSXYwS0pIUWk1NU1raGJJL1FhUW9IeW13SzVDbTJCeElraFRhSWhOWDlVaGtsZ2JZVlJCeldVcDFHVDJTRlA3R3Fkb2lVeTZqSjZRdk5uVk5MSlZJQVlHNUErV2xqbWxGL2tScFVVb1RTNFVVNjZsRDVjNCtwQ2VzRjV1NUpFaWhQUDJPSWtVNnBGQVJtem9tbGxha0lKRnBuOWdFSVZDRjZGUWdVU2FXRnlFeVlYajBxSXBNR1NWSVpOcW5LM1JNcktoSWdVdmxIaGlwTXNpVU91d2xSU2hhNU9PUVFrdFAwSllEOXBhbDRSUVNoeFI1RXBuMlJ3b0Raek1YTjMyUXlMUVUwSG53SDFURnBxcUo1UlVSbVorQ2pEQ3RkS2J6azhpMDE2OVFOYkdLUlFyeFJ5b2JwMUxxY0ZKczVveEpRU0t6c3NTbWlvbVZHQ2tvVWpnbk5ndWFXRjRCUFlGYkJoNE5NWXRFcHFWaUU4WVVDSkdVaVZVb1VtQlRrbW9zZlZlNU55YUpUR2QxUlY2SEZNcmJEVkRxY0tzQ0NhY1FIVktRazVuaENxUVFLWXdXL2hBcDBvMFVxbUl6eXNUeU5oQ1poL2hEaStyR3FVR1JLWGRhSVpRWE9IbDF4R2FVaWVVVktrVkJDSlhOMWVWQnlOM21DZTZuRUM4cGY0SlNoeDBwSkFrVHkwdEtUMURsNFd5aytKK0o1WVgwQk83bTBtZFNqbEtrc0lNVVdBZUM5U0JSS0daaWhTTUZidjlVQjIyZ2N0dHBiTVNPRGRraE1va1U2UUlhRUUzMU1ub29XdVNMa1NKbkVpVklaTHFmUW9xUmdreXJDaUNGd2ZTOFhHU2tJSkhwZGdXaUdpa0ttVmhlUUdTMjhJZFc2QU1xUjkwbWhhcllMR1JpZWVIVW9YSzNIeEtaRlNrMmN4dVJ3aWgxa01pMEMzSStTOVE5VERkSUlSdEdDaTBuRTFGQ2tvSmdENlNWZ0p2YjZsWWcwc1R5ZkQyQlUvMUxIVkxJbkVWUndpN0l5a05sY3BTVUMyRVRTMGFLejVHU01NQXFlMUFFeWJDOHZFd2pZUW1RTXA0L2Y3NnVMMVFSTnJFOGs5UVJ6RVZUVTFOS1crd1FTbytyVjYrS0NBNUNxRGpTRzZXUVdLVEFoNElZT0lqTGx5L1RpS1NNQnc4ZUNGSUErL2J0MC9yYmNBVmlUSXJnaDkrNGNZT05qNC9UeUtRQW5KUWd3L256NTBVcGl1b0R1L0xxSUd4aTFmQWZtQzdWWVVLS2hvWUdzZEhuOVBRMHUzanhJcHVkbldWOWZYMWFvU3ZMUU5wOTl1eVpLTzlWcXdVSnZINWhZWUU5ZlBqd0kzdWdyYTFOK3ppa2llWExnQUdvUmEyTlU4TTRjT0NBWUNnRXpyVnIxOWpObXpkWlMwdUwyR2xGbW1BZ3lVWkxEL0Y3cUYrWVg1aktwN0k4c1JLQWsyaDBkSlE5ZXZRb2tmZERwWUdvSGNkRVJFRHdTWkdyWVpyVCtjUEFRQjQ2ZEVpdzlQSGp4NEsxSmw4V1VhZTN0NWQxZFhWVk5DR2d2OGJHeHRZbjJFSVVZbE1ZRlJjNTNPOGdBOFlOZlJmM2hNTDdJTkovRkNsMFUwY1lpQXhvWUJ0cVpaaGI4b3NYQ28zNFBWNkhzblpwYVlsZHVuU0pUVXhNc09QSGoxZGtDZ0loRUNFQVJFYWMzYlo4ejBBSjJ3ZFM5T3ZXdGNXQU5LVHFkUVRGMHN6TWpJZzBpRExuenAxamc0T0QybWVQellCMlFJUUFFRmx0dTdJY0lPY3U5THE0WktweWkrcFNBWU1Qd2RyWjJTbDB6ZE9uVDltVksxY3FLa29nUWlBeUlrTFlPTlVnbUg2OG9BSzFJWVRoTEFKQUNubDl4WFVnblQ1NThrUTgzNzkvdi9YSGExMThScDJOaWdTWDV1L2Z2MThScEVCYWxHSk85Wm9Fa1NJRXJGNEg0TkpWQW5BcElFNkZSNlR3S3hsNWhxbXNqWFNGRkhFcnZFeVRBdG9DR2dkWC9memEyVmxnbmUyTEZ5OG9VaVNoaEdISUFFbTVmbWtCN2lXaW5lcXV4VVFLaFJUaU9pbGNTeDFPa0FLZGlrcUVSQ2FSUW9SYnVHeXd5T0VHdXB3K0tGSlFDbG5IL1B5OEVNdnlhakNSZ2tqeFVaUndhVnFBMWFTUUZjamMzSnp5NGhZU21SVk9DcFJ3OHVxdHRJcUpGQmtuaGNzcHhFWFRpa2hSQmozaG1tbmxEQ2x3bGtHOVk1cWZQUE1vZFdTY0ZGRHRNdnk2cEN0Y05LMmNJVVV3aGR5N2Q4OFpQU0VuMVJBcFNnUk12RUhFd0RROUY5ek42OWV2Q3ljV2hwVkxwcFZUcE1Cc0pibkY4NFVMRjVTMzcwa0RpQkJ5R1NYV3Y3Z0laNlpMWTlFUmxEeVdBNXc1YzhhNmFnUXowckVRYW1Sa1JEeEhkSk16eUZ5RE03VVNKdDEwZEhTSU5hc2d4dG16WjBYMHdFVFlOQlUrQ0xDNHVDaW1Ec3E5SVV5WDd4RXBESUJJMGQzZExVSTAxb2xnVnBaTk03T1E1cEF5WE44dDBMbHRhQkF4RGg0OEtEb2ZaeWowUlpyekxlVHlQVVFyVkVtVnNCN1cyYjJKNEJJaWI5T043RElzTkFsRUNnS1Jna0NrSUJBcENFUUtBcEdDUUtRZ1pJY1VsYkM2bTVBY0tjUStlUzR2elNQRVIyQ3p1amNneFYwOFU3M3ZGS0V5RVppak1nNVNuTVV6WEhVa1pCZUI4UjhCS1laNVc4R1d2bGlKUmNnZU1PNFlmL0FBZlBDR2hvYVFQazdqZnlZbko0a1lHU1FFeHQzSGFmQkJYam8veGR1UnRiVzFIekJqR2kvRVBzOVlzb2U1QWxuWk16c0xRSldKMmViUUVFZ1pmb1FBL3ZSNXdOWkhlM2g0R0h2NS9jYmJMN3pWVXZkbEJpdCtwampGbzhUS1I2UUlrS09kUHd6eDlqMzc3NVlQOWRSdkZRZllFTGhCeXdpRzNKY1E2L2hYZ0FFQU5vMVZJK1lac2ZRQUFBQUFTVVZPUks1Q1lJST1cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L25vLWRhdGEvaW1nL25vLWRhdGEucG5nXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMyA0IDkgMTIgMTMgMTQgMTYgMTcgMThcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNyA5IDExIDEyIDEzIDE0IDE2IDE3IDE4XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzI2LlxyXG4gKi9cclxudmFyIGFydCA9IHJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xyXG52YXIgdT1yZXF1aXJlKFwidXRpbC91dGlsXCIpO1xyXG5cclxuLy/ml7bpl7TmiLPovazljJbmlrnms5VcclxuYXJ0LmhlbHBlcignZGF0ZUZvcm1hdCcsIGZ1bmN0aW9uIChkYXRlLCBmb3JtYXQpIHtcclxuICAgIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChkYXRlLnJlcGxhY2UoXCIvRGF0ZShcIiwgXCJcIikucmVwbGFjZShcIikvXCIsIFwiXCIpLCAxMCkpO1xyXG4gICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgdmFyIG1hcCA9IHtcclxuICAgICAgICBcIllcIjogZGF0ZS5nZXRZZWFyKCksXHJcbiAgICAgICAgXCJNXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9XHJcbiAgICAgICAgXCJkXCI6IGRhdGUuZ2V0RGF0ZSgpLCAvL+aXpVxyXG4gICAgICAgIFwiaFwiOiBkYXRlLmdldEhvdXJzKCksIC8v5bCP5pe2XHJcbiAgICAgICAgXCJtXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhlxyXG4gICAgICAgIFwic1wiOiBkYXRlLmdldFNlY29uZHMoKSwgLy/np5JcclxuICAgICAgICBcInFcIjogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqZcclxuICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enklxyXG4gICAgfTtcclxuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC8oW3lNZGhtc3FTXSkrL2csIGZ1bmN0aW9uIChhbGwsIHQpIHtcclxuICAgICAgICB2YXIgdiA9IG1hcFt0XTtcclxuICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGlmIChhbGwubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgdiA9ICcwJyArIHY7XHJcbiAgICAgICAgICAgICAgICB2ID0gdi5zdWJzdHIodi5sZW5ndGggLSAyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAodCA9PT0gJ3knKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gYWxsLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGw7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmb3JtYXQ7XHJcbn0pO1xyXG4vL+iOt+WPluenkeebrlxyXG5hcnQuaGVscGVyKCdnZXRTdWJqZWN0TmFtZScsZnVuY3Rpb24oc3ViamVjdCl7XHJcbiAgICByZXR1cm4gdS5nZXRTdWJqZWN0TmFtZShzdWJqZWN0KTtcclxufSk7XHJcbi8v6I635Y+W6Zi25q61XHJcbmFydC5oZWxwZXIoJ2dldFN0YWdlU3RyJyxmdW5jdGlvbihzdGFnZSl7XHJcbiAgICAgICAgcmV0dXJuIHUuZ2V0U3RhZ2VTdHIoc3RhZ2UpO1xyXG59KTtcclxuLy/ovaznoIEg5q2j56Gu562U5qGIXHJcbmFydC5oZWxwZXIoJ3VuRXNjYXBlJywgZnVuY3Rpb24oYW5zd2VyKXtcclxuICAgIGlmICghYW5zd2VyKXtcclxuICAgICAgICByZXR1cm4gXCLmnKrkvZznrZRcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHVuZXNjYXBlKGFuc3dlcik7XHJcbiAgICB9XHJcbn0pO1xyXG4vL+iOt+WPlumimOWei1xyXG5hcnQuaGVscGVyKCdnZXRJdGVtU3R5bGUnLGZ1bmN0aW9uIChvYmopIHtcclxuICAgIHZhciBzdWJqZWN0PW9iai5TdWJqZWN0aWQ7XHJcbiAgICB2YXIgc3R5bGU9b2JqLlF1ZXN0aW9uVHlwZTtcclxuICAgIGlmKHN1YmplY3Q9PScwMyd8fHN1YmplY3Q9PScwMScpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoc3R5bGUqMTwxMDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihzdHlsZSoxPDIwMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHN0eWxlKjE8MzAxKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIDM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHN0eWxlO1xyXG4gICAgfVxyXG5cclxufSlcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL3RlbXBsYXRlLWhlbHBlci5qc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDMgOSAxNCAxOFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8zMC5cclxuICovXHJcbnZhciBub0RhdGEgPSByZXF1aXJlKCdjb21wb25lbnQvbm8tZGF0YS9uby1kYXRhLmpzJyk7XHJcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbC91dGlsJyk7XHJcbnJlcXVpcmUoJ3RlbXBsYXRlLWhlbHBlci5qcycpO1xyXG52YXIgdG9waWNCb2R5ID0gcmVxdWlyZSgndG9waWMtdGV4dC50cGwnKTtcclxudmFyIGV4cGxhaW5RdWVzID0gcmVxdWlyZSgnZXhwbGFpblF1ZXN0aW9uLnRwbCcpO1xyXG52YXIgaGFuZGxlclRwbCA9IHJlcXVpcmUoJ2hhbmRsZXIudHBsJyk7XHJcblxyXG52YXIgX251bSA9IDE7XHJcbnZhciBob21ld29ya1N0YXR1cyA9IHV0aWwuZ2V0UXVlcnlTdHJpbmcoJ2hvbWV3b3JrLXN0YXR1cycpO1xyXG52YXIgc2VhcmNoSG9tZXdvcmtTdWJqZWN0ID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICAkKFwiLmhlYWRlclwiKS5maW5kKFwiLmNvdXJzZS1uYW1lXCIpLmh0bWwodXRpbC5nZXRRdWVyeVN0cmluZygnc3RhZ2Utc3ViamVjdC1uYW1lJykpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0QnRucygpO1xyXG4gICAgfSxcclxuICAgIHJlbmRlcjogZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdFRoaXMgPSB0aGlzO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6J3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6IHV0aWwuZ2V0QXBpVXJsKCdIb21lU2Nob29sQ29udGFjdC9MZXJuaW5nUGF0aC9Ib21ld29ya0RldGFpbHNMUCcpLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICBBcHBJRDogc2Vzc2lvblN0b3JhZ2UuYXBwaWQsXHJcbiAgICAgICAgICAgICAgICBPcGVuSUQ6IHNlc3Npb25TdG9yYWdlLm9wZW5pZCxcclxuICAgICAgICAgICAgICAgIHdvcmtJZDogdXRpbC5nZXRRdWVyeVN0cmluZygnaG9tZXdvcmstaWQnKSxcclxuICAgICAgICAgICAgICAgIGluZGV4OiBfbnVtXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOidqc29uJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZHQpe1xyXG4gICAgICAgICAgICAgICAgdXRpbC5jaGVja0JpbmQoZHQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkdC5OO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5ob21ld29ya1N0YXR1cyA9IGhvbWV3b3JrU3RhdHVzO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5oYW5kbGVyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuY29udGVudC13cmFwcGVyXCIpLmFkZENsYXNzKCdubycpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5vRGF0YS5pbml0KFwiY29udGVudC13cmFwcGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQoXCIuaGFuZGxlclwiKS5hZGRDbGFzcyhcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgZGF0YS5udW0gPSBfbnVtO1xyXG4gICAgICAgICAgICAgICAgLy9kYXRhLlF1ZXN0aW9uQ291bnQgPSAyMTtcclxuICAgICAgICAgICAgICAgICQoXCIuaG9tZXdvcmstbmFtZVwiKS5odG1sKGRhdGEuaG9tZVdvcmtOYW1lKTtcclxuICAgICAgICAgICAgICAgICQoXCIuY29udGVudFwiKS5odG1sKHRvcGljQm9keShkYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmFuc3dlci1hbmFseXNpcy1ub3RlXCIpLmh0bWwoZXhwbGFpblF1ZXMoZGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGhvbWV3b3JrU3RhdHVzID09IDIgfHwgaG9tZXdvcmtTdGF0dXMgPT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIudXNlci1hbnN3ZXJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc2NvcmVcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuc3ViamVjdGl2ZS1hbnN3ZXJcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJChcIi5oYW5kbGVyXCIpLmh0bWwoaGFuZGxlclRwbChkYXRhKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiaW1nXCIpLmNzcyhcIm1heC13aWR0aFwiLCBcIjEwMCVcIik7XHJcbiAgICAgICAgICAgICAgICB1dGlsLmluaXRNYXRoSmF4T2JqKFwiY29udGVudC13cmFwcGVyXCIpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMuaW5pdHEoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9LFxyXG4gICAgaW5pdEJ0bnM6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHRUaGlzID0gdGhpcztcclxuICAgICAgICB2YXIgJGhhbmRsZXIgPSAkKFwiLmhhbmRsZXJcIik7XHJcbiAgICAgICAgLy/mn6XnnIvor4Tor60g5LiK5LiA6aKYIOS4i+S4gOmimFxyXG4gICAgICAgICRoYW5kbGVyLmRlbGVnYXRlKCcuaG9tZXdvcmstY29tbWVudCcsICd0b3VjaGVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBlbmNvZGVVUkkoJy4vaG9tZXdvcmstY29tbWVudC5odG1sJyArICc/c3RhZ2Utc3ViamVjdC1uYW1lPScgKyAkKFwiLmNvdXJzZS1uYW1lXCIpLmh0bWwoKSArICcmaG9tZXdvcmstaWQ9JyArIHV0aWwuZ2V0UXVlcnlTdHJpbmcoXCJob21ld29yay1pZFwiKSk7XHJcbiAgICAgICAgfSkuZGVsZWdhdGUoJy5sZWZ0LWJ0bicsICd0b3VjaGVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmICgkaGFuZGxlci5oYXNDbGFzcyhcImNsaWNrXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAkaGFuZGxlci5yZW1vdmVDbGFzcyhcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMucmVuZGVyKC0tX251bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5kZWxlZ2F0ZSgnLnJpZ2h0LWJ0bicsICd0b3VjaGVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGlmICgkaGFuZGxlci5oYXNDbGFzcyhcImNsaWNrXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAkaGFuZGxlci5yZW1vdmVDbGFzcyhcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgdFRoaXMucmVuZGVyKCsrX251bSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+WkhOeQhuivlemimOagt+W8j1xyXG4gICAgaW5pdHE6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHdpbkggPSBwYXJzZUZsb2F0KGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpO1xyXG4gICAgICAgIHZhciAkdGIgPSAkKCd0YWJsZScpO1xyXG4gICAgICAgIC8vdmFyICRpbWcgPSAkKFwiLnN1YkFuc3dlci1zdHlsZVwiKS5maW5kKFwiaW1nXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4xID0gJHRiLmxlbmd0aDsgaSA8IGxlbjE7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoJHRiLmVxKGkpLndpZHRoKCkgPj0gd2luSCkge1xyXG4gICAgICAgICAgICAgICAgJHRiLmVxKGkpLndpZHRoKFwiMTAwJVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvKmZvciAodmFyIGogPSAwLCBsZW4yID0gJGltZy5sZW5ndGg7IGogPCBsZW4yOyBqKyspIHtcclxuICAgICAgICAgICAgaWYgKCRpbWcuZXEoaikud2lkdGgoKSA+PSB3aW5IKSB7XHJcbiAgICAgICAgICAgICAgICAkaW1nLmVxKGopLndpZHRoKFwiMTAwJVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0qL1xyXG4gICAgfVxyXG59O1xyXG4kKGZ1bmN0aW9uKCl7XHJcbiAgICBzZWFyY2hIb21ld29ya1N1YmplY3QuaW5pdCgpO1xyXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvc2VhcmNoLWhvbWV3b3JrLXN1YmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1NlxuICoqIG1vZHVsZSBjaHVua3MgPSAxNFxuICoqLyIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCd0cGwvdG9waWMtdGV4dCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkc3RyaW5nPSR1dGlscy4kc3RyaW5nLFF1ZXN0aW9uQm9keT0kZGF0YS5RdWVzdGlvbkJvZHksJG91dD0nJzskb3V0Kz0nPGRpdiBjbGFzcz1cImJnLXdoaXRlIGJveC1wYWRkaW5nLWxlZnQgYm94LXBhZGRpbmctcmlnaHQgYm94LXBhZGRpbmctdG9wIGJvcmRlci1ib3R0b20gYm94LXBhZGRpbmctYm90dG9tIFwiID4gJztcbiRvdXQrPSRzdHJpbmcoUXVlc3Rpb25Cb2R5KTtcbiRvdXQrPScgPC9kaXY+JztcbnJldHVybiBuZXcgU3RyaW5nKCRvdXQpO1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3RwbC90b3BpYy10ZXh0LnRwbFxuICoqIG1vZHVsZSBpZCA9IDU3XG4gKiogbW9kdWxlIGNodW5rcyA9IDE0IDE4XG4gKiovIiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO3JlcXVpcmUoJy4vY2hvb3NlLXRvcGljLnRwbCcpO3JlcXVpcmUoJy4vc3ViamVjdGl2ZS10b3BpYy50cGwnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCd0cGwvZXhwbGFpblF1ZXN0aW9uJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCR2YWx1ZT0kZGF0YS4kdmFsdWUsZ2V0SXRlbVN0eWxlPSRkYXRhLmdldEl0ZW1TdHlsZSxpbmNsdWRlPWZ1bmN0aW9uKGZpbGVuYW1lLGRhdGEpe2RhdGE9ZGF0YXx8JGRhdGE7dmFyIHRleHQ9JHV0aWxzLiRpbmNsdWRlKGZpbGVuYW1lLGRhdGEsJGZpbGVuYW1lKTskb3V0Kz10ZXh0O3JldHVybiAkb3V0O30sJG91dD0nJztpZigoJHZhbHVlIHwgZ2V0SXRlbVN0eWxlKT09MSApe1xuJG91dCs9JyAnO1xuaW5jbHVkZSgnLi9jaG9vc2UtdG9waWMnKTtcbiRvdXQrPScgJztcbn1lbHNle1xuJG91dCs9JyAnO1xuaW5jbHVkZSgnLi9zdWJqZWN0aXZlLXRvcGljJyk7XG4kb3V0Kz0nICc7XG59XG4kb3V0Kz0nICc7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90cGwvZXhwbGFpblF1ZXN0aW9uLnRwbFxuICoqIG1vZHVsZSBpZCA9IDU4XG4gKiogbW9kdWxlIGNodW5rcyA9IDE0IDE4XG4gKiovIiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ3RwbC9jaG9vc2UtdG9waWMnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJHN0cmluZz0kdXRpbHMuJHN0cmluZyxSaWdodEFuc3dlcj0kZGF0YS5SaWdodEFuc3dlcixVc2VyQW5zd2VyPSRkYXRhLlVzZXJBbnN3ZXIsVXNlclJlc3VsdD0kZGF0YS5Vc2VyUmVzdWx0LCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsUXVlc3Rpb25BbmFsc2lzPSRkYXRhLlF1ZXN0aW9uQW5hbHNpcyxOb3RlQ29udGVudD0kZGF0YS5Ob3RlQ29udGVudCwkb3V0PScnOyRvdXQrPSc8ZGl2ID4g5q2j56Gu562U5qGI77yaPHNwYW4gY2xhc3M9XCJjb2xvci1ncmVlblwiPic7XG4kb3V0Kz0kc3RyaW5nKFJpZ2h0QW5zd2VyfHxcIuOAgFwiKTtcbiRvdXQrPSc8L3NwYW4+77yMIDxzcGFuIGNsYXNzPVwidXNlci1hbnN3ZXJcIj7mgqjnmoTnrZTmoYjvvJo8L3NwYW4+ICc7XG5pZiggVXNlckFuc3dlcil7XG4kb3V0Kz0nICc7XG5pZihVc2VyUmVzdWx0PT0xKXtcbiRvdXQrPScgPHNwYW4gY2xhc3M9XCJjb2xvci1ncmVlbiB1c2VyLWFuc3dlclwiPic7XG4kb3V0Kz0kc3RyaW5nKFVzZXJBbnN3ZXIpO1xuJG91dCs9JzxpIHN0eWxlPVwiZm9udC1zdHlsZTpub3JtYWw7Y29sb3I6YmxhY2tcIj7vvIw8L2k+PC9zcGFuPiDlm57nrZTvvJogPHNwYW4gY2xhc3M9XCJjb2xvci1ncmVlblwiID7mraPnoa4gPC9zcGFuPuOAgiAnO1xufWVsc2UgaWYoVXNlclJlc3VsdD09MHx8VXNlclJlc3VsdD09Mil7XG4kb3V0Kz0nIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkIHVzZXItYW5zd2VyXCI+JztcbiRvdXQrPSRzdHJpbmcoVXNlckFuc3dlciB8fCBcIuacquS9nOetlFwiKTtcbiRvdXQrPSc8aSBzdHlsZT1cImZvbnQtc3R5bGU6bm9ybWFsO2NvbG9yOmJsYWNrXCI+77yMPC9pPjwvc3Bhbj4g5Zue562U77yaIDxzcGFuIGNsYXNzPVwiY29sb3ItcmVkXCIgPumUmeivryA8L3NwYW4+44CCICc7XG59XG4kb3V0Kz0nICc7XG59ZWxzZXtcbiRvdXQrPScgPHNwYW4gY2xhc3M9XCJjb2xvci1ncmVlbiB1c2VyLWFuc3dlclwiPic7XG4kb3V0Kz0kZXNjYXBlKFwi44CAXCIpO1xuJG91dCs9JzxpIHN0eWxlPVwiZm9udC1zdHlsZTpub3JtYWw7Y29sb3I6YmxhY2tcIj7vvIw8L2k+PC9zcGFuPiDlm57nrZTvvJogPHNwYW4gY2xhc3M9XCJjb2xvci1ibGFja1wiID4g5pyq5L2c562UIDwvc3Bhbj7jgIIgJztcbn1cbiRvdXQrPScgPC9kaXY+IDxzcGFuIGNsYXNzPVwiY29sb3ItZ3JlZW5cIj7or5XpopjliIbmnpDvvJo8L3NwYW4+IDxkaXYgY2xhc3M9XCJhbnN3ZXItcXVlc1wiID4gPGRpdiBpZD1cImV4cGxhaW4tcXVlXCI+JztcbiRvdXQrPSRzdHJpbmcoUXVlc3Rpb25BbmFsc2lzKTtcbiRvdXQrPSc8L2Rpdj4gPHNwYW4gY2xhc3M9XCJjb2xvci1ncmVlbiBwcmV0ZXh0XCIgPueslOiusO+8mjwvc3Bhbj4gPHByZSBjbGFzcz1cImNvbG9yLXNpbGl2ZXIgcHJldGV4dFwiIGlkPVwidGV4dC1ib29rXCI+ICc7XG5pZihOb3RlQ29udGVudD09bnVsbCl7XG4kb3V0Kz0nIDxwIGNsYXNzPVwiY29sb3Itc2lsaXZlclwiPijml6ApPC9wPiAnO1xufWVsc2V7XG4kb3V0Kz0nIDxwcmUgY2xhc3M9XCJjb2xvci1ibGFjayBwcmV0ZXh0XCI+ICc7XG4kb3V0Kz0kc3RyaW5nKE5vdGVDb250ZW50KTtcbiRvdXQrPSc8L3ByZT4gJztcbn1cbiRvdXQrPScgPC9wcmU+IDwvZGl2PiAnO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHBsL2Nob29zZS10b3BpYy50cGxcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAxNCAxOFxuICoqLyIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCd0cGwvc3ViamVjdGl2ZS10b3BpYycsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZXNjYXBlPSR1dGlscy4kZXNjYXBlLFNjb3JlPSRkYXRhLlNjb3JlLEFsbFNjb3JlPSRkYXRhLkFsbFNjb3JlLCRzdHJpbmc9JHV0aWxzLiRzdHJpbmcsVXNlckFuc3dlcj0kZGF0YS5Vc2VyQW5zd2VyLFJpZ2h0QW5zd2VyPSRkYXRhLlJpZ2h0QW5zd2VyLFF1ZXN0aW9uQW5hbHNpcz0kZGF0YS5RdWVzdGlvbkFuYWxzaXMsTm90ZUNvbnRlbnQ9JGRhdGEuTm90ZUNvbnRlbnQsJG91dD0nJzskb3V0Kz0nPGRpdiBjbGFzcz1cInN1YkFuc3dlci1zdHlsZVwiID4gPGRpdiBjbGFzcz1cInNjb3JlXCI+5b6X5YiG77yaIDxzcGFuIGlkPVwib3V0Y29tZVwiPic7XG4kb3V0Kz0kZXNjYXBlKFNjb3JlKTtcbiRvdXQrPSfliIY8L3NwYW4+77yM5ruh5YiG77yaJztcbiRvdXQrPSRlc2NhcGUoQWxsU2NvcmUpO1xuJG91dCs9J+WIhjwvZGl2PiA8c3BhbiBjbGFzcz1cImNvbG9yLWdyZWVuIHVzZXItYW5zd2VyXCI+5oKo55qE562U5qGI77yaPC9zcGFuPjxkaXYgY2xhc3M9XCJjb2xvci1ibGFjayB1c2VyLWFuc3dlclwiID4nO1xuJG91dCs9JHN0cmluZygkaGVscGVycy4gdW5Fc2NhcGUoVXNlckFuc3dlciApKTtcbiRvdXQrPSc8L2Rpdj4gPHNwYW4gY2xhc3M9XCJjb2xvci1ncmVlbiBcIj7mraPnoa7nrZTmoYjvvJo8L3NwYW4+IDxkaXYgY2xhc3M9XCJjb2xvci1ibGFja1wiID4nO1xuJG91dCs9JHN0cmluZyhSaWdodEFuc3dlcnx8XCIgIFwiKTtcbiRvdXQrPSc8L2Rpdj4gPGRpdiBjbGFzcz1cInN1YmplY3RpdmUtYW5zd2VyIGRpc3BsYXktbm9uZVwiID4gPHNwYW4gY2xhc3M9XCJjb2xvci1ncmVlbiBcIj4g5Zue562U77yaPC9zcGFuPiA8c3BhbiBjbGFzcz1cImNvbG9yLWJsYWNrXCIgPiDmnKrkvZznrZQgPC9zcGFuPuOAgjwvZGl2PiA8L2Rpdj4gPHNwYW4gY2xhc3M9XCJjb2xvci1ncmVlbiBcIj7or5XpopjliIbmnpDvvJo8L3NwYW4+IDxkaXYgY2xhc3M9XCJhbnN3ZXItcXVlc1wiPiA8ZGl2IGlkPVwiZXhwbGFpbi1xdWVcIiBzdHlsZT1cIm92ZXJmbG93OmhpZGRlbjt6b29tOjE7Y29sb3I6YmxhY2tcIj4nO1xuJG91dCs9JHN0cmluZyhRdWVzdGlvbkFuYWxzaXN8fFwiPGJyPlwiKTtcbiRvdXQrPSc8L2Rpdj4gPHNwYW4gY2xhc3M9XCJjb2xvci1ncmVlbiBcIiA+56yU6K6w77yaPC9zcGFuPiA8cHJlIGNsYXNzPVwiY29sb3Itc2lsaXZlciBwcmV0ZXh0XCIgaWQ9XCJ0ZXh0LWJvb2tcIj4gJztcbmlmKE5vdGVDb250ZW50PT1udWxsKXtcbiRvdXQrPScgPGRpdiBjbGFzcz1cImNvbG9yLXNpbGl2ZXJcIj4o5pegKTwvZGl2PiAnO1xufWVsc2V7XG4kb3V0Kz0nIDxkaXYgY2xhc3M9XCJjb2xvci1ibGFjayBwcmV0ZXh0XCI+ICc7XG4kb3V0Kz0kc3RyaW5nKE5vdGVDb250ZW50KTtcbiRvdXQrPSc8L2Rpdj4gJztcbn1cbiRvdXQrPScgPC9wcmU+IDwvZGl2PiAnO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHBsL3N1YmplY3RpdmUtdG9waWMudHBsXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTQgMThcbiAqKi8iLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgndHBsL2hhbmRsZXInLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsbnVtPSRkYXRhLm51bSxRdWVzdGlvbkNvdW50PSRkYXRhLlF1ZXN0aW9uQ291bnQsaG9tZXdvcmtTdGF0dXM9JGRhdGEuaG9tZXdvcmtTdGF0dXMsJG91dD0nJztpZihudW0gPT0gMSl7XG4kb3V0Kz0nICc7XG5pZihRdWVzdGlvbkNvdW50ID09IDEpe1xuJG91dCs9JyA8ZGl2IGNsYXNzPVwiaG9tZXdvcmstY29tbWVudFwiPiA8aW1nIGNsYXNzPVwic2VhcmNoXCIgc3JjPVwiLi4vYnVuZGxlL2ltZy9zZWFyY2gucG5nXCI+ICc7XG5pZihob21ld29ya1N0YXR1cyA9PSAzKXtcbiRvdXQrPScgPHNwYW4+5b+955Wl5Y6f5ZugPC9zcGFuPiAnO1xufWVsc2V7XG4kb3V0Kz0nIDxzcGFuPuafpeeci+ivhOivrTwvc3Bhbj4gJztcbn1cbiRvdXQrPScgPC9kaXY+ICc7XG59ZWxzZXtcbiRvdXQrPScgPGRpdiBjbGFzcz1cInNvbWUtc3ViamVjdHNcIj4gPGRpdiBjbGFzcz1cImhvbWV3b3JrLWNvbW1lbnQgYm9yZGVyLXJpZ2h0IHc0OSBmbFwiPiA8aW1nIGNsYXNzPVwic2VhcmNoXCIgc3JjPVwiLi4vYnVuZGxlL2ltZy9zZWFyY2gucG5nXCI+ICc7XG5pZihob21ld29ya1N0YXR1cyA9PSAzKXtcbiRvdXQrPScgPHNwYW4+5b+955Wl5Y6f5ZugPC9zcGFuPiAnO1xufWVsc2V7XG4kb3V0Kz0nIDxzcGFuPuafpeeci+ivhOivrTwvc3Bhbj4gJztcbn1cbiRvdXQrPScgPC9kaXY+IDxkaXYgY2xhc3M9XCJyaWdodC1idG4gdzUwIGZsXCI+IDxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9yaWdodC10ZXh0LnBuZ1wiPiA8c3Bhbj7kuIvkuIDpopg8L3NwYW4+IDwvZGl2PiA8ZGl2PiAnO1xufVxuJG91dCs9JyAnO1xufWVsc2UgaWYobnVtID49IFF1ZXN0aW9uQ291bnQpe1xuJG91dCs9JyA8ZGl2IGNsYXNzPVwibGFzdCBsZWZ0LWJ0blwiPiA8aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvbGVmdC10ZXh0LnBuZ1wiPiA8c3Bhbj7kuIrkuIDpopg8L3NwYW4+IDwvZGl2PiAnO1xufWVsc2V7XG4kb3V0Kz0nIDxkaXYgY2xhc3M9XCJtaWRkbGVcIj4gPGRpdiBjbGFzcz1cImxlZnQtYnRuIGJvcmRlci1yaWdodCB3NDkgZmxcIj4gPGltZyBjbGFzcz1cInNlYXJjaFwiIHNyYz1cIi4uL2J1bmRsZS9pbWcvbGVmdC10ZXh0LnBuZ1wiPiA8c3Bhbj7kuIrkuIDpopg8L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVwicmlnaHQtYnRuIHc1MCBmbFwiPiA8aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvcmlnaHQtdGV4dC5wbmdcIj4gPHNwYW4+5LiL5LiA6aKYPC9zcGFuPiA8L2Rpdj4gPC9kaXY+ICc7XG59XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90cGwvaGFuZGxlci50cGxcbiAqKiBtb2R1bGUgaWQgPSA2MVxuICoqIG1vZHVsZSBjaHVua3MgPSAxNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=