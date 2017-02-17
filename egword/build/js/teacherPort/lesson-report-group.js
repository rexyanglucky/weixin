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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	
	
	var _classindex;
	var _classgroupid = 0;
	var _studentid = 0;
	
	$(function () {
	    _classindex = $("#hidden-classindex").text();
	
	    $(".s-tab").on("click", function () {
	        var types = $(this).attr("data-id");
	
	        $(this).addClass("active");
	        $(this).siblings().removeClass("active");
	
	        if (types == "g") {
	
	            GetGroupOrderList();
	
	        } else {
	            GetStudentOrderList();
	        }
	
	
	    });
	
	
	    GetGroupOrderList();
	
	});
	
	
	function GetGroupOrderList() {
	
	    $.ajax({
	        type: "get",
	        url: "/teacher/myclass/GetGroupOrderList",
	        cache: false,
	        data: {
	            classindex: _classindex
	        },
	        dataType: "JSON",
	        success: function (data) {
	
	            data = JSON.parse(data);
	            var li = data.result;
	            if (li.length > 1) {
	
	                var tpl = __webpack_require__(28);
	
	                $("#g-s-content").html(tpl(li));
	
	                $(".b-grouplist-item").off("click");
	                $(".b-grouplist-item").on("click", function () {
	                    var groupindex = $(this).attr("data-groupindex");
	                    _classgroupid = $(this).attr("data-classgroupid");
	
	
	                    $(".b-addcoin-num").removeClass("active").first().addClass("active");
	                    $("#hidden-coinnum").text(10);
	
	                    $("#b-showaddcoin").show();
	                    $("#b-showaddcoin-title").html("奖励学币-" + groupindex + "组");
	
	                    $(".b-addcoin-num").off("click");
	                    $(".b-addcoin-num").on("click", function () {
	
	                        $(".b-addcoin-num").removeClass("active");
	
	                        var coinnum = $(this).addClass("active").text();
	
	                        $("#hidden-coinnum").text(coinnum);
	
	                    });
	
	
	                    $("#btn-submit").off("click");
	                    $("#btn-submit").click(function () {
	
	                        $("#b-showaddcoin").hide();
	                        AddGroupCurrency();
	
	                    });
	                    $("#btn-cancel").off("click");
	                    $("#btn-cancel").click(function () {
	                        $("#b-showaddcoin").hide();
	                    });
	
	
	                });
	
	
	            }
	
	
	        }
	    });
	}
	
	function GetStudentOrderList() {
	
	    $.ajax({
	        type: "get",
	        url: "/teacher/myclass/GetStudentOrderList",
	        cache: false,
	        data: {
	            classindex: _classindex
	        },
	        dataType: "JSON",
	        success: function (data) {
	
	
	            data = JSON.parse(data);
	            var li = data.result;
	
	            var tpl = __webpack_require__(29);
	
	            $("#g-s-content").html(tpl(li));
	
	            $(".b-studentlist-item").off("click");
	            $(".b-studentlist-item").on("click", function () {
	                _studentid = $(this).attr("data-studentid");
	                var studentname = $(this).attr("data-studentname");
	
	                $(".b-addcoin-num").removeClass("active").first().addClass("active");
	                $("#hidden-coinnum").text(10);
	
	                $("#b-showaddcoin").show();
	
	
	                $("#b-showaddcoin-title").html("奖励学币-" + studentname);
	
	                $(".b-addcoin-num").off("click");
	                $(".b-addcoin-num").on("click", function () {
	
	                    $(".b-addcoin-num").removeClass("active");
	
	                    var coinnum = $(this).addClass("active").text();
	
	                    $("#hidden-coinnum").text(coinnum);
	
	                });
	
	                $("#btn-submit").off("click");
	                $("#btn-submit").click(function () {
	
	                    $("#b-showaddcoin").hide();
	                    AddStudentCurrency();
	
	                });
	                $("#btn-cancel").off("click");
	                $("#btn-cancel").click(function () {
	                    $("#b-showaddcoin").hide();
	                });
	            });
	
	
	
	        }
	    });
	}
	
	
	function AddGroupCurrency() {
	
	    var num = $("#hidden-coinnum").text();
	
	    $.ajax({
	        type: "post",
	        url: "/teacher/myclass/AddGroupCurrency",
	        cache: false,
	        data: {
	            classindex: _classindex,
	            classGroupId: _classgroupid,
	            currencyNum: num
	
	        },
	        dataType: "JSON",
	        success: function (data) {
	
	            GetGroupOrderList();
	
	
	        }
	    });
	
	}
	
	
	function AddStudentCurrency() {
	
	
	    var num = $("#hidden-coinnum").text();
	    $.ajax({
	        type: "post",
	        url: "/teacher/myclass/AddStudentCurrency",
	        cache: false,
	        data: {
	            classindex: _classindex,
	            studentId: _studentid,
	            currencyNum: num
	
	        },
	        dataType: "JSON",
	        success: function (data) {
	
	            GetStudentOrderList();
	
	        }
	    });
	
	}

/***/ },

/***/ 8:
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

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/teacher/lesson-report-group-g',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+=' <div class="card"> <div class="card-header">选择奖励小组</div> <div class="card-content"> <div class="card-content-inner"> <div class="list-block"> <ul> ';
	$each($data,function(v,i){
	$out+=' <li class="item-content b-grouplist-item" data-groupindex="';
	$out+=$escape(v.GroupIndex);
	$out+='" data-classgroupid="';
	$out+=$escape(v.ClassGroupID);
	$out+='"> <div class="item-media"></div> <div class="item-inner"> <div class="item-title"> <span class="seq">';
	$out+=$escape((i+1));
	$out+='.</span> <span>';
	$out+=$escape(v.GroupIndex);
	$out+='组</span> </div> <div class="item-after"><span class="word-num">奖学币：<span>';
	$out+=$escape(v.Currency);
	$out+='</span></span></div> </div> </li> ';
	});
	$out+=' </ul> </div> </div> </div> <div class="card-footer"></div> </div>';
	return new String($out);
	});

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/teacher/lesson-report-group-s',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+=' <div class="card"> <div class="card-header">选择奖励学生</div> <div class="card-content"> <div class="card-content-inner"> <div class="list-block"> <ul> ';
	$each($data,function(v,i){
	$out+=' <li class="item-content b-studentlist-item" data-studentid="';
	$out+=$escape(v.StudentID);
	$out+='" data-studentname ="';
	$out+=$escape(v.UserName);
	$out+='"> <div class="item-media"></div> <div class="item-inner"> <div class="item-title"> <span class="seq">';
	$out+=$escape((i+1));
	$out+='.</span> <span>';
	$out+=$escape(v.UserName);
	$out+='</span> </div> <div class="item-after"><span class="word-num">奖学币：<span>';
	$out+=$escape(v.Currency);
	$out+='</span></span></div> </div> </li> ';
	});
	$out+=' </ul> </div> </div> </div> <div class="card-footer"></div> </div>';
	return new String($out);
	});

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RlYWNoZXJQb3J0L2xlc3Nvbi1yZXBvcnQtZ3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi90bW9kanMtbG9hZGVyL3J1bnRpbWUuanM/ODk2NioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy90cGwvdGVhY2hlci9sZXNzb24tcmVwb3J0LWdyb3VwLWcudHBsIiwid2VicGFjazovLy8uL3NyYy90cGwvdGVhY2hlci9sZXNzb24tcmVwb3J0LWdyb3VwLXMudHBsIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDcENBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxVQUFTO0FBQ1Q7QUFDQTs7O0FBR0EsTUFBSzs7O0FBR0w7O0FBRUEsRUFBQzs7O0FBR0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxzQkFBcUI7OztBQUdyQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjs7O0FBR3JCLGtCQUFpQjs7O0FBR2pCOzs7QUFHQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLGtCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakIsY0FBYTs7OztBQUliO0FBQ0EsTUFBSztBQUNMOzs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7QUFDVDtBQUNBOztBQUVBOzs7QUFHQTtBQUNBLE1BQUs7O0FBRUw7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxNQUFLOztBQUVMLEU7Ozs7Ozs7QUNuTkEsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQSx5Q0FBd0MsT0FBTywyQkFBMkI7QUFDMUU7O0FBRUE7QUFDQTtBQUNBLHNDQUFxQyxZQUFZO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQSwwQkFBeUIsaUVBQWlFO0FBQzFGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBLGFBQVksZUFBZTtBQUMzQixrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXFCO0FBQ3JCLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsR0FBRTtBQUNGLGtDQUFpQztBQUNqQyxJQUFHO0FBQ0gsZUFBYztBQUNkO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGLEVBQUMsRzs7Ozs7OztBQzlFRDtBQUNBO0FBQ0E7QUFDQSxjQUFhLCtHQUErRztBQUM1SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7OztBQ25CRDtBQUNBO0FBQ0E7QUFDQSxjQUFhLCtHQUErRztBQUM1SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLEVBQUMsRSIsImZpbGUiOiJ0ZWFjaGVyUG9ydC9sZXNzb24tcmVwb3J0LWdyb3VwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjUiLCJcclxuXHJcbnZhciBfY2xhc3NpbmRleDtcclxudmFyIF9jbGFzc2dyb3VwaWQgPSAwO1xyXG52YXIgX3N0dWRlbnRpZCA9IDA7XHJcblxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIF9jbGFzc2luZGV4ID0gJChcIiNoaWRkZW4tY2xhc3NpbmRleFwiKS50ZXh0KCk7XHJcblxyXG4gICAgJChcIi5zLXRhYlwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdHlwZXMgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG5cclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICQodGhpcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVzID09IFwiZ1wiKSB7XHJcblxyXG4gICAgICAgICAgICBHZXRHcm91cE9yZGVyTGlzdCgpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBHZXRTdHVkZW50T3JkZXJMaXN0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgR2V0R3JvdXBPcmRlckxpc3QoKTtcclxuXHJcbn0pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIEdldEdyb3VwT3JkZXJMaXN0KCkge1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJnZXRcIixcclxuICAgICAgICB1cmw6IFwiL3RlYWNoZXIvbXljbGFzcy9HZXRHcm91cE9yZGVyTGlzdFwiLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGNsYXNzaW5kZXg6IF9jbGFzc2luZGV4XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhVHlwZTogXCJKU09OXCIsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG4gICAgICAgICAgICB2YXIgbGkgPSBkYXRhLnJlc3VsdDtcclxuICAgICAgICAgICAgaWYgKGxpLmxlbmd0aCA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgdHBsID0gcmVxdWlyZShcInRlYWNoZXIvbGVzc29uLXJlcG9ydC1ncm91cC1nXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICQoXCIjZy1zLWNvbnRlbnRcIikuaHRtbCh0cGwobGkpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmItZ3JvdXBsaXN0LWl0ZW1cIikub2ZmKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmItZ3JvdXBsaXN0LWl0ZW1cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwaW5kZXggPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWdyb3VwaW5kZXhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgX2NsYXNzZ3JvdXBpZCA9ICQodGhpcykuYXR0cihcImRhdGEtY2xhc3Nncm91cGlkXCIpO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5iLWFkZGNvaW4tbnVtXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLmZpcnN0KCkuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNoaWRkZW4tY29pbm51bVwiKS50ZXh0KDEwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNiLXNob3dhZGRjb2luXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2Itc2hvd2FkZGNvaW4tdGl0bGVcIikuaHRtbChcIuWlluWKseWtpuW4gS1cIiArIGdyb3VwaW5kZXggKyBcIue7hFwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5iLWFkZGNvaW4tbnVtXCIpLm9mZihcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIuYi1hZGRjb2luLW51bVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIuYi1hZGRjb2luLW51bVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2lubnVtID0gJCh0aGlzKS5hZGRDbGFzcyhcImFjdGl2ZVwiKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2hpZGRlbi1jb2lubnVtXCIpLnRleHQoY29pbm51bSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNidG4tc3VibWl0XCIpLm9mZihcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjYnRuLXN1Ym1pdFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2Itc2hvd2FkZGNvaW5cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBZGRHcm91cEN1cnJlbmN5KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjYnRuLWNhbmNlbFwiKS5vZmYoXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2J0bi1jYW5jZWxcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2Itc2hvd2FkZGNvaW5cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gR2V0U3R1ZGVudE9yZGVyTGlzdCgpIHtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwiZ2V0XCIsXHJcbiAgICAgICAgdXJsOiBcIi90ZWFjaGVyL215Y2xhc3MvR2V0U3R1ZGVudE9yZGVyTGlzdFwiLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGNsYXNzaW5kZXg6IF9jbGFzc2luZGV4XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhVHlwZTogXCJKU09OXCIsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcblxyXG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuICAgICAgICAgICAgdmFyIGxpID0gZGF0YS5yZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHBsID0gcmVxdWlyZShcInRlYWNoZXIvbGVzc29uLXJlcG9ydC1ncm91cC1zXCIpO1xyXG5cclxuICAgICAgICAgICAgJChcIiNnLXMtY29udGVudFwiKS5odG1sKHRwbChsaSkpO1xyXG5cclxuICAgICAgICAgICAgJChcIi5iLXN0dWRlbnRsaXN0LWl0ZW1cIikub2ZmKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgICQoXCIuYi1zdHVkZW50bGlzdC1pdGVtXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgX3N0dWRlbnRpZCA9ICQodGhpcykuYXR0cihcImRhdGEtc3R1ZGVudGlkXCIpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0dWRlbnRuYW1lID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1zdHVkZW50bmFtZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiLmItYWRkY29pbi1udW1cIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIikuZmlyc3QoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjaGlkZGVuLWNvaW5udW1cIikudGV4dCgxMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiNiLXNob3dhZGRjb2luXCIpLnNob3coKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiNiLXNob3dhZGRjb2luLXRpdGxlXCIpLmh0bWwoXCLlpZblirHlrabluIEtXCIgKyBzdHVkZW50bmFtZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIi5iLWFkZGNvaW4tbnVtXCIpLm9mZihcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5iLWFkZGNvaW4tbnVtXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmItYWRkY29pbi1udW1cIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2lubnVtID0gJCh0aGlzKS5hZGRDbGFzcyhcImFjdGl2ZVwiKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjaGlkZGVuLWNvaW5udW1cIikudGV4dChjb2lubnVtKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiI2J0bi1zdWJtaXRcIikub2ZmKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2J0bi1zdWJtaXRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2Itc2hvd2FkZGNvaW5cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIEFkZFN0dWRlbnRDdXJyZW5jeSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgJChcIiNidG4tY2FuY2VsXCIpLm9mZihcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNidG4tY2FuY2VsXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2Itc2hvd2FkZGNvaW5cIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gQWRkR3JvdXBDdXJyZW5jeSgpIHtcclxuXHJcbiAgICB2YXIgbnVtID0gJChcIiNoaWRkZW4tY29pbm51bVwiKS50ZXh0KCk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICB1cmw6IFwiL3RlYWNoZXIvbXljbGFzcy9BZGRHcm91cEN1cnJlbmN5XCIsXHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgY2xhc3NpbmRleDogX2NsYXNzaW5kZXgsXHJcbiAgICAgICAgICAgIGNsYXNzR3JvdXBJZDogX2NsYXNzZ3JvdXBpZCxcclxuICAgICAgICAgICAgY3VycmVuY3lOdW06IG51bVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGFUeXBlOiBcIkpTT05cIixcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgR2V0R3JvdXBPcmRlckxpc3QoKTtcclxuXHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIEFkZFN0dWRlbnRDdXJyZW5jeSgpIHtcclxuXHJcblxyXG4gICAgdmFyIG51bSA9ICQoXCIjaGlkZGVuLWNvaW5udW1cIikudGV4dCgpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICB1cmw6IFwiL3RlYWNoZXIvbXljbGFzcy9BZGRTdHVkZW50Q3VycmVuY3lcIixcclxuICAgICAgICBjYWNoZTogZmFsc2UsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBjbGFzc2luZGV4OiBfY2xhc3NpbmRleCxcclxuICAgICAgICAgICAgc3R1ZGVudElkOiBfc3R1ZGVudGlkLFxyXG4gICAgICAgICAgICBjdXJyZW5jeU51bTogbnVtXHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YVR5cGU6IFwiSlNPTlwiLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICBHZXRTdHVkZW50T3JkZXJMaXN0KCk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL3RlYWNoZXJQb3J0L2xlc3Nvbi1yZXBvcnQtZ3JvdXAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSA0MSIsIi8qVE1PREpTOnt9Ki9cclxuIWZ1bmN0aW9uICgpIHtcclxuXHRmdW5jdGlvbiBhKGEsIGIpIHtcclxuXHRcdHJldHVybiAoL3N0cmluZ3xmdW5jdGlvbi8udGVzdCh0eXBlb2YgYikgPyBoIDogZykoYSwgYilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGIoYSwgYykge1xyXG5cdFx0cmV0dXJuIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEgJiYgKGMgPSB0eXBlb2YgYSwgXCJudW1iZXJcIiA9PT0gYyA/IGEgKz0gXCJcIiA6IGEgPSBcImZ1bmN0aW9uXCIgPT09IGMgPyBiKGEuY2FsbChhKSkgOiBcIlwiKSwgYVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYyhhKSB7XHJcblx0XHRyZXR1cm4gbFthXVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZChhKSB7XHJcblx0XHRyZXR1cm4gYihhKS5yZXBsYWNlKC8mKD8hW1xcdyNdKzspfFs8PlwiJ10vZywgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGUoYSwgYikge1xyXG5cdFx0aWYgKG0oYSkpZm9yICh2YXIgYyA9IDAsIGQgPSBhLmxlbmd0aDsgZCA+IGM7IGMrKyliLmNhbGwoYSwgYVtjXSwgYywgYSk7IGVsc2UgZm9yIChjIGluIGEpYi5jYWxsKGEsIGFbY10sIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmKGEsIGIpIHtcclxuXHRcdHZhciBjID0gLyhcXC8pW15cXC9dK1xcMVxcLlxcLlxcMS8sIGQgPSAoXCIuL1wiICsgYSkucmVwbGFjZSgvW15cXC9dKyQvLCBcIlwiKSwgZSA9IGQgKyBiO1xyXG5cdFx0Zm9yIChlID0gZS5yZXBsYWNlKC9cXC9cXC5cXC8vZywgXCIvXCIpOyBlLm1hdGNoKGMpOyllID0gZS5yZXBsYWNlKGMsIFwiL1wiKTtcclxuXHRcdHJldHVybiBlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnKGIsIGMpIHtcclxuXHRcdHZhciBkID0gYS5nZXQoYikgfHwgaSh7ZmlsZW5hbWU6IGIsIG5hbWU6IFwiUmVuZGVyIEVycm9yXCIsIG1lc3NhZ2U6IFwiVGVtcGxhdGUgbm90IGZvdW5kXCJ9KTtcclxuXHRcdHJldHVybiBjID8gZChjKSA6IGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGgoYSwgYikge1xyXG5cdFx0aWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGIpIHtcclxuXHRcdFx0dmFyIGMgPSBiO1xyXG5cdFx0XHRiID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgayhjKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR2YXIgZCA9IGpbYV0gPSBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgYihjLCBhKSArIFwiXCJcclxuXHRcdFx0fSBjYXRjaCAoZCkge1xyXG5cdFx0XHRcdHJldHVybiBpKGQpKClcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBkLnByb3RvdHlwZSA9IGIucHJvdG90eXBlID0gbiwgZC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGIgKyBcIlwiXHJcblx0XHR9LCBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpKGEpIHtcclxuXHRcdHZhciBiID0gXCJ7VGVtcGxhdGUgRXJyb3J9XCIsIGMgPSBhLnN0YWNrIHx8IFwiXCI7XHJcblx0XHRpZiAoYyljID0gYy5zcGxpdChcIlxcblwiKS5zbGljZSgwLCAyKS5qb2luKFwiXFxuXCIpOyBlbHNlIGZvciAodmFyIGQgaW4gYSljICs9IFwiPFwiICsgZCArIFwiPlxcblwiICsgYVtkXSArIFwiXFxuXFxuXCI7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJvYmplY3RcIiA9PSB0eXBlb2YgY29uc29sZSAmJiBjb25zb2xlLmVycm9yKGIgKyBcIlxcblxcblwiICsgYyksIGJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBqID0gYS5jYWNoZSA9IHt9LCBrID0gdGhpcy5TdHJpbmcsIGwgPSB7XHJcblx0XHRcIjxcIjogXCImIzYwO1wiLFxyXG5cdFx0XCI+XCI6IFwiJiM2MjtcIixcclxuXHRcdCdcIic6IFwiJiMzNDtcIixcclxuXHRcdFwiJ1wiOiBcIiYjMzk7XCIsXHJcblx0XHRcIiZcIjogXCImIzM4O1wiXHJcblx0fSwgbSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGEpIHtcclxuXHRcdFx0cmV0dXJuIFwiW29iamVjdCBBcnJheV1cIiA9PT0ge30udG9TdHJpbmcuY2FsbChhKVxyXG5cdFx0fSwgbiA9IGEudXRpbHMgPSB7XHJcblx0XHQkaGVscGVyczoge30sICRpbmNsdWRlOiBmdW5jdGlvbiAoYSwgYiwgYykge1xyXG5cdFx0XHRyZXR1cm4gYSA9IGYoYywgYSksIGcoYSwgYilcclxuXHRcdH0sICRzdHJpbmc6IGIsICRlc2NhcGU6IGQsICRlYWNoOiBlXHJcblx0fSwgbyA9IGEuaGVscGVycyA9IG4uJGhlbHBlcnM7XHJcblx0YS5nZXQgPSBmdW5jdGlvbiAoYSkge1xyXG5cdFx0cmV0dXJuIGpbYS5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIildXHJcblx0fSwgYS5oZWxwZXIgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0b1thXSA9IGJcclxuXHR9LCBtb2R1bGUuZXhwb3J0cyA9IGFcclxufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi90bW9kanMtbG9hZGVyL3J1bnRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiAxNSAxNiAxNyAxOSAyMCAyMSAyMyAyNyAyOCAzNCA0MCA0MSA0MiA0MyA0NSA0NiA1MyA1NCIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCdzcmMvdHBsL3RlYWNoZXIvbGVzc29uLXJlcG9ydC1ncm91cC1nJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlYWNoPSR1dGlscy4kZWFjaCx2PSRkYXRhLnYsaT0kZGF0YS5pLCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsJG91dD0nJzskb3V0Kz0nIDxkaXYgY2xhc3M9XCJjYXJkXCI+IDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPumAieaLqeWlluWKseWwj+e7hDwvZGl2PiA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50XCI+IDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnQtaW5uZXJcIj4gPGRpdiBjbGFzcz1cImxpc3QtYmxvY2tcIj4gPHVsPiAnO1xuJGVhY2goJGRhdGEsZnVuY3Rpb24odixpKXtcbiRvdXQrPScgPGxpIGNsYXNzPVwiaXRlbS1jb250ZW50IGItZ3JvdXBsaXN0LWl0ZW1cIiBkYXRhLWdyb3VwaW5kZXg9XCInO1xuJG91dCs9JGVzY2FwZSh2Lkdyb3VwSW5kZXgpO1xuJG91dCs9J1wiIGRhdGEtY2xhc3Nncm91cGlkPVwiJztcbiRvdXQrPSRlc2NhcGUodi5DbGFzc0dyb3VwSUQpO1xuJG91dCs9J1wiPiA8ZGl2IGNsYXNzPVwiaXRlbS1tZWRpYVwiPjwvZGl2PiA8ZGl2IGNsYXNzPVwiaXRlbS1pbm5lclwiPiA8ZGl2IGNsYXNzPVwiaXRlbS10aXRsZVwiPiA8c3BhbiBjbGFzcz1cInNlcVwiPic7XG4kb3V0Kz0kZXNjYXBlKChpKzEpKTtcbiRvdXQrPScuPC9zcGFuPiA8c3Bhbj4nO1xuJG91dCs9JGVzY2FwZSh2Lkdyb3VwSW5kZXgpO1xuJG91dCs9J+e7hDwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJpdGVtLWFmdGVyXCI+PHNwYW4gY2xhc3M9XCJ3b3JkLW51bVwiPuWlluWtpuW4ge+8mjxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKHYuQ3VycmVuY3kpO1xuJG91dCs9Jzwvc3Bhbj48L3NwYW4+PC9kaXY+IDwvZGl2PiA8L2xpPiAnO1xufSk7XG4kb3V0Kz0nIDwvdWw+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlclwiPjwvZGl2PiA8L2Rpdj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90cGwvdGVhY2hlci9sZXNzb24tcmVwb3J0LWdyb3VwLWcudHBsXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDQxIiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ3NyYy90cGwvdGVhY2hlci9sZXNzb24tcmVwb3J0LWdyb3VwLXMnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVhY2g9JHV0aWxzLiRlYWNoLHY9JGRhdGEudixpPSRkYXRhLmksJGVzY2FwZT0kdXRpbHMuJGVzY2FwZSwkb3V0PScnOyRvdXQrPScgPGRpdiBjbGFzcz1cImNhcmRcIj4gPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCI+6YCJ5oup5aWW5Yqx5a2m55SfPC9kaXY+IDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj4gPGRpdiBjbGFzcz1cImNhcmQtY29udGVudC1pbm5lclwiPiA8ZGl2IGNsYXNzPVwibGlzdC1ibG9ja1wiPiA8dWw+ICc7XG4kZWFjaCgkZGF0YSxmdW5jdGlvbih2LGkpe1xuJG91dCs9JyA8bGkgY2xhc3M9XCJpdGVtLWNvbnRlbnQgYi1zdHVkZW50bGlzdC1pdGVtXCIgZGF0YS1zdHVkZW50aWQ9XCInO1xuJG91dCs9JGVzY2FwZSh2LlN0dWRlbnRJRCk7XG4kb3V0Kz0nXCIgZGF0YS1zdHVkZW50bmFtZSA9XCInO1xuJG91dCs9JGVzY2FwZSh2LlVzZXJOYW1lKTtcbiRvdXQrPSdcIj4gPGRpdiBjbGFzcz1cIml0ZW0tbWVkaWFcIj48L2Rpdj4gPGRpdiBjbGFzcz1cIml0ZW0taW5uZXJcIj4gPGRpdiBjbGFzcz1cIml0ZW0tdGl0bGVcIj4gPHNwYW4gY2xhc3M9XCJzZXFcIj4nO1xuJG91dCs9JGVzY2FwZSgoaSsxKSk7XG4kb3V0Kz0nLjwvc3Bhbj4gPHNwYW4+JztcbiRvdXQrPSRlc2NhcGUodi5Vc2VyTmFtZSk7XG4kb3V0Kz0nPC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cIml0ZW0tYWZ0ZXJcIj48c3BhbiBjbGFzcz1cIndvcmQtbnVtXCI+5aWW5a2m5biB77yaPHNwYW4+JztcbiRvdXQrPSRlc2NhcGUodi5DdXJyZW5jeSk7XG4kb3V0Kz0nPC9zcGFuPjwvc3Bhbj48L2Rpdj4gPC9kaXY+IDwvbGk+ICc7XG59KTtcbiRvdXQrPScgPC91bD4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cImNhcmQtZm9vdGVyXCI+PC9kaXY+IDwvZGl2Pic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RwbC90ZWFjaGVyL2xlc3Nvbi1yZXBvcnQtZ3JvdXAtcy50cGxcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gNDEiXSwic291cmNlUm9vdCI6IiJ9