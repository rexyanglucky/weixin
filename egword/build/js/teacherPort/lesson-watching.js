/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var lesson = {
	    init: function () {

	        $(".card-header").off("click");
	        $(".card-header").on("click",
	            function () {
	                var p = $(this).parent();
	                if (p.hasClass("slide-down")) {
	                    var next = $(this).next();
	                    $(next).hide(100);
	                    p.removeClass("slide-down").addClass("slide-up");
	                    $(this).find(".icon-down-drop").removeClass("icon-down-drop").addClass("icon-right-drop");
	                } else {
	                    var next = $(this).next();
	                    $(next).show(100);
	                    p.removeClass("slide-up").addClass("slide-down");
	                    $(this).find(".icon-right-drop").removeClass("icon-right-drop").addClass("icon-down-drop");
	                }

	            });
	    }


	}


	var classindex;
	var classid;
	var timer = {};

	$(function () {
	    
	    classindex = $("#hidden-classindex").text();
	    classid = $("#hidden-classid").text();

	    GetClassroomMonitor();

	    $("#btn-submit").click(SaveClassEnd);

	});

	function GetClassroomMonitor() {

	    $.ajax({
	        type: "get",
	        url: "/teacher/myclass/GetClassroomMonitor",
	        cache: false,
	        data: { classindex: classindex },
	        dataType: "JSON",
	        success: function (data) {

	            data = JSON.parse(data);
	            var li = data.result;

	            var tpl = __webpack_require__(46);
	            $("#b-monitorlist").html(tpl(li));

	            lesson.init();

	           window.timer= setTimeout(GetClassroomMonitor, 10000);

	        }
	    });

	}

	function SaveClassEnd() {

	    $.ajax({
	        type: "POST",
	        url: "/teacher/myclass/SaveClassEnd",
	        cache: false,
	        data: { classindex: classindex },
	        dataType: "JSON",
	        success: function (data) {

	            $("#btn-submit").off("click");

	            $.router.load('/teacher/myclass/CourseReport?classindex=' + classindex+"&classid="+classid, true);

	        }
	    });

	}






/***/ },

/***/ 10:
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

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/teacher/lesson-watching',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,v=$data.v,i=$data.i,$escape=$utils.$escape,d=$data.d,j=$data.j,$out='';$out+=' ';
	$each($data,function(v,i){
	$out+=' <div class="card slide-down"> ';
	if(v.GroupIndex>0){
	$out+=' <div class="card-header"> <div class="head-title"> <span class="icon-down-drop"></span> ';
	$out+=$escape(v.GroupIndex);
	$out+='组 </div> <div class="head-after"><span>平均：</span><span>';
	$out+=$escape(v.AvgCredits);
	$out+='</span><span>学分</span><span>（第';
	$out+=$escape(v.Ranking);
	$out+='名）</span></div> </div> ';
	}
	$out+=' <div class="card-content"> <div class="list-block"> <ul> ';
	$each(v.StudentMonitorInfoList,function(d,j){
	$out+=' <li class="item-content"> <div class="item-inner"> <div class="item-title"> ';
	$out+=$escape(d.UserName);
	$out+=' ';
	if(d.BookName!=""){
	$out+=' <div class="item-desc">正在学习：<span class="data mldot5rem">第';
	$out+=$escape(d.UnitID);
	$out+='单元</span><span class="data">（';
	$out+=$escape(d.BookName);
	$out+='）</span></div> <div class="item-desc">本次课已得<span class="data mldot5rem">';
	$out+=$escape(d.Credits);
	$out+='</span><span class="data">学分</span></div> ';
	}else{
	$out+=' <div class="item-desc">正在学习：<span class="data mldot5rem"></span><span class="data">（未知）</span></div> <div class="item-desc">本次课已得<span class="data mldot5rem">0</span><span class="data">学分</span></div> ';
	}
	$out+=' </div> <div class="item-after"> <div>课消<span>';
	$out+=$escape(d.CurrentNumber);
	$out+='/';
	$out+=$escape(d.BookNumber);
	$out+='</span></div> <div class="item-status-lesson">复习任务量：<span>';
	$out+=$escape(d.ReviewCount);
	$out+='</span></div> </div> </div> </li> ';
	});
	$out+=' </ul> </div> </div> </div> ';
	});
	return new String($out);
	});

/***/ }

/******/ });