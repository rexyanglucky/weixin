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

	
	var classindex;
	
	$(function () {
	
	    classindex = $("#hidden-classindex").text();
	
	    GetCourseReportList();
	
	    $("#btn-submit").click(function () {
	
	        $.router.load("/teacher/myclass/RewardCoin?classindex=" + classindex, true);
	
	    });
	
	    $(".s-tab").on("click", function () {
	        var types = $(this).attr("data-id");
	
	        $(this).addClass("active");
	        $(this).siblings().removeClass("active");
	
	        if (types == "c") {
	
	        } else {
	           
	        }
	
	
	    });
	});
	
	
	function GetCourseReportList() {
	    $.ajax({
	        type: "get",
	        url: "/teacher/myclass/GetCourseReportList",
	        cache: false,
	        data: { classindex: classindex },
	        dataType: "JSON",
	        success: function (data) {
	
	            data = JSON.parse(data);
	
	            var tpl = __webpack_require__(27);
	
	            $("#g-s-content").html(tpl(data));
	
	            $(".b-studentlist-item").on("click", function () {
	                var classindex = $(this).attr("data-classindex");
	                var studentid = $(this).attr("data-studentid");
	                var courseid = $(this).attr("data-courseid");
	
	                $.router.load("/teacher/myclass/StudentAnalysis?classindex=" + classindex + "&studentid=" + studentid + "&courseid=" + courseid, true);
	
	            });
	
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

/***/ 27:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/teacher/lesson-report',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,grouplist=$data.grouplist,$each=$utils.$each,d=$data.d,j=$data.j,$escape=$utils.$escape,studentlist=$data.studentlist,v=$data.v,i=$data.i,$out='';$out+=' ';
	if(grouplist.length>1){
	$out+=' <div class="card"> <div class="card-header">小组排名</div> <div class="card-content"> <div class="card-content-inner"> <div class="list-block"> <ul> ';
	$each(grouplist,function(d,j){
	$out+=' <li class="item-content"> <div class="item-media"></div> <div class="item-inner"> <div class="item-title"> <span class="seq">';
	$out+=$escape((j+1));
	$out+='.</span> <span>';
	$out+=$escape(d.GroupIndex);
	$out+='组</span> </div> <div class="item-after"><span class="word-num"><span>';
	$out+=$escape(d.avgCredits);
	$out+='</span>学分</span></div> </div> </li> ';
	});
	$out+=' </ul> </div> </div> </div> <div class="card-footer"></div> </div> ';
	}
	$out+=' <div class="card student"> <div class="card-header">学生排名</div> <div class="card-content"> <div class="card-content-inner"> <div class="list-block"> <ul> ';
	$each(studentlist,function(v,i){
	$out+=' <li class="item-content b-studentlist-item" data-classindex="';
	$out+=$escape(v.ClassIndex);
	$out+='" data-studentid="';
	$out+=$escape(v.StudentID);
	$out+='" data-courseid="';
	$out+=$escape(v.CourseID);
	$out+='"> <div class="item-media"></div> <div class="item-inner"> <div class="item-title"> <span class="seq">';
	$out+=$escape((i+1));
	$out+='.';
	$out+=$escape(v.UserName);
	$out+='</span> ';
	if(grouplist.length>1){
	$out+=' <span>(';
	$out+=$escape(v.GroupIndex);
	$out+='组)</span> ';
	}
	$out+=' </div> ';
	if(v.BookNumber - v.CurrentNumber == 0){
	$out+=' <div class="lesson-circle over">已结课</div> ';
	}else if(v.BookNumber - v.CurrentNumber == 1){
	$out+=' <div class="lesson-circle normal">剩1次</div> ';
	}else{
	$out+=' ';
	}
	$out+=' <div class="item-after"><span class="word-num">学分<span>';
	$out+=$escape(v.Credits);
	$out+='</span>分</span></div> </div> </li> ';
	});
	$out+=' </ul> </div> </div> </div> <div class="card-footer"></div> </div>';
	return new String($out);
	});

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGVhY2hlclBvcnQvbGVzc29uLXJlcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qcz84OTY2KioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3RlYWNoZXIvbGVzc29uLXJlcG9ydC50cGwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3JDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxVQUFTOztBQUVUOzs7QUFHQSxNQUFLO0FBQ0wsRUFBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLHlCQUF5QjtBQUN4QztBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGNBQWE7O0FBRWI7QUFDQSxNQUFLO0FBQ0wsRTs7Ozs7OztBQzFEQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFrQztBQUNsQzs7QUFFQTtBQUNBLHlDQUF3QyxPQUFPLDJCQUEyQjtBQUMxRTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXFDLFlBQVk7QUFDakQ7QUFDQTs7QUFFQTtBQUNBLDBCQUF5QixpRUFBaUU7QUFDMUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0EsYUFBWSxlQUFlO0FBQzNCLGtEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUI7QUFDckIsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixHQUFFO0FBQ0Ysa0NBQWlDO0FBQ2pDLElBQUc7QUFDSCxlQUFjO0FBQ2Q7QUFDQSxJQUFHO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0YsRUFBQyxHOzs7Ozs7O0FDOUVEO0FBQ0E7QUFDQTtBQUNBLGNBQWEsMkxBQTJMO0FBQ3hNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsRUFBQyxFIiwiZmlsZSI6InRlYWNoZXJQb3J0L2xlc3Nvbi1yZXBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTA2MTQ4ZDA1Nzk0MDgwMGZmNSIsIlxyXG52YXIgY2xhc3NpbmRleDtcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGNsYXNzaW5kZXggPSAkKFwiI2hpZGRlbi1jbGFzc2luZGV4XCIpLnRleHQoKTtcclxuXHJcbiAgICBHZXRDb3Vyc2VSZXBvcnRMaXN0KCk7XHJcblxyXG4gICAgJChcIiNidG4tc3VibWl0XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJC5yb3V0ZXIubG9hZChcIi90ZWFjaGVyL215Y2xhc3MvUmV3YXJkQ29pbj9jbGFzc2luZGV4PVwiICsgY2xhc3NpbmRleCwgdHJ1ZSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIi5zLXRhYlwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdHlwZXMgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG5cclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgICQodGhpcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVzID09IFwiY1wiKSB7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cclxuZnVuY3Rpb24gR2V0Q291cnNlUmVwb3J0TGlzdCgpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJnZXRcIixcclxuICAgICAgICB1cmw6IFwiL3RlYWNoZXIvbXljbGFzcy9HZXRDb3Vyc2VSZXBvcnRMaXN0XCIsXHJcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgIGRhdGE6IHsgY2xhc3NpbmRleDogY2xhc3NpbmRleCB9LFxyXG4gICAgICAgIGRhdGFUeXBlOiBcIkpTT05cIixcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHBsID0gcmVxdWlyZShcInRlYWNoZXIvbGVzc29uLXJlcG9ydFwiKTtcclxuXHJcbiAgICAgICAgICAgICQoXCIjZy1zLWNvbnRlbnRcIikuaHRtbCh0cGwoZGF0YSkpO1xyXG5cclxuICAgICAgICAgICAgJChcIi5iLXN0dWRlbnRsaXN0LWl0ZW1cIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NpbmRleCA9ICQodGhpcykuYXR0cihcImRhdGEtY2xhc3NpbmRleFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHVkZW50aWQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXN0dWRlbnRpZFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciBjb3Vyc2VpZCA9ICQodGhpcykuYXR0cihcImRhdGEtY291cnNlaWRcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5yb3V0ZXIubG9hZChcIi90ZWFjaGVyL215Y2xhc3MvU3R1ZGVudEFuYWx5c2lzP2NsYXNzaW5kZXg9XCIgKyBjbGFzc2luZGV4ICsgXCImc3R1ZGVudGlkPVwiICsgc3R1ZGVudGlkICsgXCImY291cnNlaWQ9XCIgKyBjb3Vyc2VpZCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy90ZWFjaGVyUG9ydC9sZXNzb24tcmVwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gNDAiLCIvKlRNT0RKUzp7fSovXHJcbiFmdW5jdGlvbiAoKSB7XHJcblx0ZnVuY3Rpb24gYShhLCBiKSB7XHJcblx0XHRyZXR1cm4gKC9zdHJpbmd8ZnVuY3Rpb24vLnRlc3QodHlwZW9mIGIpID8gaCA6IGcpKGEsIGIpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBiKGEsIGMpIHtcclxuXHRcdHJldHVybiBcInN0cmluZ1wiICE9IHR5cGVvZiBhICYmIChjID0gdHlwZW9mIGEsIFwibnVtYmVyXCIgPT09IGMgPyBhICs9IFwiXCIgOiBhID0gXCJmdW5jdGlvblwiID09PSBjID8gYihhLmNhbGwoYSkpIDogXCJcIiksIGFcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGMoYSkge1xyXG5cdFx0cmV0dXJuIGxbYV1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGQoYSkge1xyXG5cdFx0cmV0dXJuIGIoYSkucmVwbGFjZSgvJig/IVtcXHcjXSs7KXxbPD5cIiddL2csIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBlKGEsIGIpIHtcclxuXHRcdGlmIChtKGEpKWZvciAodmFyIGMgPSAwLCBkID0gYS5sZW5ndGg7IGQgPiBjOyBjKyspYi5jYWxsKGEsIGFbY10sIGMsIGEpOyBlbHNlIGZvciAoYyBpbiBhKWIuY2FsbChhLCBhW2NdLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZihhLCBiKSB7XHJcblx0XHR2YXIgYyA9IC8oXFwvKVteXFwvXStcXDFcXC5cXC5cXDEvLCBkID0gKFwiLi9cIiArIGEpLnJlcGxhY2UoL1teXFwvXSskLywgXCJcIiksIGUgPSBkICsgYjtcclxuXHRcdGZvciAoZSA9IGUucmVwbGFjZSgvXFwvXFwuXFwvL2csIFwiL1wiKTsgZS5tYXRjaChjKTspZSA9IGUucmVwbGFjZShjLCBcIi9cIik7XHJcblx0XHRyZXR1cm4gZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZyhiLCBjKSB7XHJcblx0XHR2YXIgZCA9IGEuZ2V0KGIpIHx8IGkoe2ZpbGVuYW1lOiBiLCBuYW1lOiBcIlJlbmRlciBFcnJvclwiLCBtZXNzYWdlOiBcIlRlbXBsYXRlIG5vdCBmb3VuZFwifSk7XHJcblx0XHRyZXR1cm4gYyA/IGQoYykgOiBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoKGEsIGIpIHtcclxuXHRcdGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBiKSB7XHJcblx0XHRcdHZhciBjID0gYjtcclxuXHRcdFx0YiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGsoYylcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dmFyIGQgPSBqW2FdID0gZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGIoYywgYSkgKyBcIlwiXHJcblx0XHRcdH0gY2F0Y2ggKGQpIHtcclxuXHRcdFx0XHRyZXR1cm4gaShkKSgpXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRyZXR1cm4gZC5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSA9IG4sIGQudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBiICsgXCJcIlxyXG5cdFx0fSwgZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaShhKSB7XHJcblx0XHR2YXIgYiA9IFwie1RlbXBsYXRlIEVycm9yfVwiLCBjID0gYS5zdGFjayB8fCBcIlwiO1xyXG5cdFx0aWYgKGMpYyA9IGMuc3BsaXQoXCJcXG5cIikuc2xpY2UoMCwgMikuam9pbihcIlxcblwiKTsgZWxzZSBmb3IgKHZhciBkIGluIGEpYyArPSBcIjxcIiArIGQgKyBcIj5cXG5cIiArIGFbZF0gKyBcIlxcblxcblwiO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIFwib2JqZWN0XCIgPT0gdHlwZW9mIGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcihiICsgXCJcXG5cXG5cIiArIGMpLCBiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgaiA9IGEuY2FjaGUgPSB7fSwgayA9IHRoaXMuU3RyaW5nLCBsID0ge1xyXG5cdFx0XCI8XCI6IFwiJiM2MDtcIixcclxuXHRcdFwiPlwiOiBcIiYjNjI7XCIsXHJcblx0XHQnXCInOiBcIiYjMzQ7XCIsXHJcblx0XHRcIidcIjogXCImIzM5O1wiLFxyXG5cdFx0XCImXCI6IFwiJiMzODtcIlxyXG5cdH0sIG0gPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRcdHJldHVybiBcIltvYmplY3QgQXJyYXldXCIgPT09IHt9LnRvU3RyaW5nLmNhbGwoYSlcclxuXHRcdH0sIG4gPSBhLnV0aWxzID0ge1xyXG5cdFx0JGhlbHBlcnM6IHt9LCAkaW5jbHVkZTogZnVuY3Rpb24gKGEsIGIsIGMpIHtcclxuXHRcdFx0cmV0dXJuIGEgPSBmKGMsIGEpLCBnKGEsIGIpXHJcblx0XHR9LCAkc3RyaW5nOiBiLCAkZXNjYXBlOiBkLCAkZWFjaDogZVxyXG5cdH0sIG8gPSBhLmhlbHBlcnMgPSBuLiRoZWxwZXJzO1xyXG5cdGEuZ2V0ID0gZnVuY3Rpb24gKGEpIHtcclxuXHRcdHJldHVybiBqW2EucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpXVxyXG5cdH0sIGEuaGVscGVyID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdG9bYV0gPSBiXHJcblx0fSwgbW9kdWxlLmV4cG9ydHMgPSBhXHJcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMTUgMTYgMTcgMTkgMjAgMjEgMjMgMjcgMjggMzQgNDAgNDEgNDIgNDMgNDUgNDYgNTMgNTQiLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnc3JjL3RwbC90ZWFjaGVyL2xlc3Nvbi1yZXBvcnQnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsZ3JvdXBsaXN0PSRkYXRhLmdyb3VwbGlzdCwkZWFjaD0kdXRpbHMuJGVhY2gsZD0kZGF0YS5kLGo9JGRhdGEuaiwkZXNjYXBlPSR1dGlscy4kZXNjYXBlLHN0dWRlbnRsaXN0PSRkYXRhLnN0dWRlbnRsaXN0LHY9JGRhdGEudixpPSRkYXRhLmksJG91dD0nJzskb3V0Kz0nICc7XG5pZihncm91cGxpc3QubGVuZ3RoPjEpe1xuJG91dCs9JyA8ZGl2IGNsYXNzPVwiY2FyZFwiPiA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj7lsI/nu4TmjpLlkI08L2Rpdj4gPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPiA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50LWlubmVyXCI+IDxkaXYgY2xhc3M9XCJsaXN0LWJsb2NrXCI+IDx1bD4gJztcbiRlYWNoKGdyb3VwbGlzdCxmdW5jdGlvbihkLGope1xuJG91dCs9JyA8bGkgY2xhc3M9XCJpdGVtLWNvbnRlbnRcIj4gPGRpdiBjbGFzcz1cIml0ZW0tbWVkaWFcIj48L2Rpdj4gPGRpdiBjbGFzcz1cIml0ZW0taW5uZXJcIj4gPGRpdiBjbGFzcz1cIml0ZW0tdGl0bGVcIj4gPHNwYW4gY2xhc3M9XCJzZXFcIj4nO1xuJG91dCs9JGVzY2FwZSgoaisxKSk7XG4kb3V0Kz0nLjwvc3Bhbj4gPHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoZC5Hcm91cEluZGV4KTtcbiRvdXQrPSfnu4Q8L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVwiaXRlbS1hZnRlclwiPjxzcGFuIGNsYXNzPVwid29yZC1udW1cIj48c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShkLmF2Z0NyZWRpdHMpO1xuJG91dCs9Jzwvc3Bhbj7lrabliIY8L3NwYW4+PC9kaXY+IDwvZGl2PiA8L2xpPiAnO1xufSk7XG4kb3V0Kz0nIDwvdWw+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlclwiPjwvZGl2PiA8L2Rpdj4gJztcbn1cbiRvdXQrPScgPGRpdiBjbGFzcz1cImNhcmQgc3R1ZGVudFwiPiA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj7lrabnlJ/mjpLlkI08L2Rpdj4gPGRpdiBjbGFzcz1cImNhcmQtY29udGVudFwiPiA8ZGl2IGNsYXNzPVwiY2FyZC1jb250ZW50LWlubmVyXCI+IDxkaXYgY2xhc3M9XCJsaXN0LWJsb2NrXCI+IDx1bD4gJztcbiRlYWNoKHN0dWRlbnRsaXN0LGZ1bmN0aW9uKHYsaSl7XG4kb3V0Kz0nIDxsaSBjbGFzcz1cIml0ZW0tY29udGVudCBiLXN0dWRlbnRsaXN0LWl0ZW1cIiBkYXRhLWNsYXNzaW5kZXg9XCInO1xuJG91dCs9JGVzY2FwZSh2LkNsYXNzSW5kZXgpO1xuJG91dCs9J1wiIGRhdGEtc3R1ZGVudGlkPVwiJztcbiRvdXQrPSRlc2NhcGUodi5TdHVkZW50SUQpO1xuJG91dCs9J1wiIGRhdGEtY291cnNlaWQ9XCInO1xuJG91dCs9JGVzY2FwZSh2LkNvdXJzZUlEKTtcbiRvdXQrPSdcIj4gPGRpdiBjbGFzcz1cIml0ZW0tbWVkaWFcIj48L2Rpdj4gPGRpdiBjbGFzcz1cIml0ZW0taW5uZXJcIj4gPGRpdiBjbGFzcz1cIml0ZW0tdGl0bGVcIj4gPHNwYW4gY2xhc3M9XCJzZXFcIj4nO1xuJG91dCs9JGVzY2FwZSgoaSsxKSk7XG4kb3V0Kz0nLic7XG4kb3V0Kz0kZXNjYXBlKHYuVXNlck5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gJztcbmlmKGdyb3VwbGlzdC5sZW5ndGg+MSl7XG4kb3V0Kz0nIDxzcGFuPignO1xuJG91dCs9JGVzY2FwZSh2Lkdyb3VwSW5kZXgpO1xuJG91dCs9J+e7hCk8L3NwYW4+ICc7XG59XG4kb3V0Kz0nIDwvZGl2PiAnO1xuaWYodi5Cb29rTnVtYmVyIC0gdi5DdXJyZW50TnVtYmVyID09IDApe1xuJG91dCs9JyA8ZGl2IGNsYXNzPVwibGVzc29uLWNpcmNsZSBvdmVyXCI+5bey57uT6K++PC9kaXY+ICc7XG59ZWxzZSBpZih2LkJvb2tOdW1iZXIgLSB2LkN1cnJlbnROdW1iZXIgPT0gMSl7XG4kb3V0Kz0nIDxkaXYgY2xhc3M9XCJsZXNzb24tY2lyY2xlIG5vcm1hbFwiPuWJqTHmrKE8L2Rpdj4gJztcbn1lbHNle1xuJG91dCs9JyAnO1xufVxuJG91dCs9JyA8ZGl2IGNsYXNzPVwiaXRlbS1hZnRlclwiPjxzcGFuIGNsYXNzPVwid29yZC1udW1cIj7lrabliIY8c3Bhbj4nO1xuJG91dCs9JGVzY2FwZSh2LkNyZWRpdHMpO1xuJG91dCs9Jzwvc3Bhbj7liIY8L3NwYW4+PC9kaXY+IDwvZGl2PiA8L2xpPiAnO1xufSk7XG4kb3V0Kz0nIDwvdWw+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJjYXJkLWZvb3RlclwiPjwvZGl2PiA8L2Rpdj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90cGwvdGVhY2hlci9sZXNzb24tcmVwb3J0LnRwbFxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSA0MCJdLCJzb3VyY2VSb290IjoiIn0=