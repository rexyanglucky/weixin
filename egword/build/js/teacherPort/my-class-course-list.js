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

	var a=__webpack_require__(7);
	var classid;
	$(function () {
	
	    console.log(a);
	    classid = $("#hidden-classid").text();
	
	    GetClassCourseRecordList(classid);
	
	    $("#btn-submit").on("click", function () {
	
	        $.router.load('/teacher/myclass/StudentGroup?classid=' + classid, true);
	    });
	
	});
	
	
	function GetClassCourseRecordList(classid) {
	    $.ajax({
	        type: "get",
	        url: "/teacher/myclass/GetClassCourseRecordList",
	        cache: false,
	        data: { classid: classid },
	        dataType: "JSON",
	        success: function (data) {
	
	            data = JSON.parse(data);
	
	            var li = data.result;
	            var str = "���޿δμ�¼";
	
	            var tpl = __webpack_require__(32);
	
	            $("#courselist").html(tpl(li));
	            if (li.length == 0) {
	                $("#courselist").html(str);
	            }
	
	            $(".s-course-list").on("click", function () {
	
	                var classindex = $(this).attr("data-classindex");
	
	                $.router.load('/teacher/myclass/CourseReport?classindex=' + classindex, true);
	
	            });
	
	        }
	    });
	}


/***/ },

/***/ 7:
/***/ function(module, exports, __webpack_require__) {

	//var template = require('./template');
	var template = __webpack_require__(8);
	
	/** 
	 * 对日期进行格式化， 
	 * @param date 要格式化的日期 
	 * @param format 进行格式化的模式字符串
	 *     支持的模式字母有： 
	 *     y:年, 
	 *     M:年中的月份(1-12), 
	 *     d:月份中的天(1-31), 
	 *     h:小时(0-23), 
	 *     m:分(0-59), 
	 *     s:秒(0-59), 
	 *     S:毫秒(0-999),
	 *     q:季度(1-4)
	 * @return String
	 * @author yanis.wang
	 * @see	http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
	 */
	
	//时间转换
	template.helper('dateFormat', function (date, format) {
	    date = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
	    //return date.getDate();
	   //date = new Date(date);
	
	    var map = {
	        "y": date.getYear(),
	        "M": date.getMonth() + 1, //月份 
	        "d": date.getDate(), //日 
	        "h": date.getHours(), //小时 
	        "m": date.getMinutes(), //分 
	        "s": date.getSeconds(), //秒 
	        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
	        "S": date.getMilliseconds() //毫秒 
	    };
	    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
	        var v = map[t];
	        if(v !== undefined){
	            if(all.length > 1){
	                v = '0' + v;
	                v = v.substr(v.length-2);
	            }
	            return v;
	        }
	        else if(t === 'y'){
	            return (date.getFullYear() + '').substr(4 - all.length);
	        }
	        return all;
	    });
	    return format;
	});
	
	//截字处理
	template.helper('cutchar', function (obj, charlength) {
	
	    if (obj == null) {
	        return "";
	    }
	    if (obj.length > parseInt(charlength)) {
	        obj = obj.substring(0, parseInt(charlength)) + "...";
	        return obj;
	    }
	    return obj;
	
	});
	
	//教研评级
	template.helper('TeachTypeTran', function (obj) {
	
	    if (obj == 1) {
	        return "A级";
	    } else {
	        return "B级";
	    }
	});
	
	//合同期限转换
	template.helper('HtQx', function (obj) {
	
	    return template.helper(obj) + "年";
	});
	
	//年级
	template.helper('GetBigGrade', function (e) {
	    return e == 1 ? "一年级"
	        : e == 2 ? "二年级"
	        : e == 3 ? "三年级"
	        : e == 4 ? "四年级"
	        : e == 5 ? "五年级"
	        : e == 6 ? "六年级"
	        : e == 7 ? "七年级"
	        : e == 8 ? "八年级"
	        : e == 9 ? "九年级"
	         : e == 10 ? "高一"
	        : e == 11 ? "高二"
	        : e == 12 ? "高三"
	        : "";
	
	});
	
	
	//大写的转换
	template.helper('GetBigW', function (e) {
	    return e == 1 ? "一"
	        : e == 2 ? "二"
	        : e == 3 ? "三"
	        : e == 4 ? "四"
	        : e == 5 ? "五"
	        : e == 6 ? "六"
	        : e == 7 ? "七"
	        : e == 8 ? "八"
	        : e == 9 ? "九"
	        : e == 10 ? "十"
	        : e == 11 ? "十一"
	        : e == 12 ? "十二"
	        : e == 13 ? "十三"
	        : e == 14 ? "十四"
	        : e == 15 ? "十五"
	        : e == 16 ? "十六"
	        : e == 17 ? "十七"
	        : e == 18 ? "十八"
	        : e == 19 ? "十九"
	        : e == 20 ? "二十"
	        : e == 21 ? "二十一"
	        : e == 22 ? "二十二"
	        : e == 23 ? "二十三"
	        : e == 24 ? "二十四"
	        : e == 25 ? "二十五"
	        : e == 26 ? "二十六"
	        : e == 27 ? "二十七"
	        : e == 28 ? "二十八"
	        : e == 29 ? "二十九"
	        : e == 30 ? "三十"
	        : e == 31 ? "三十一"
	        : e == 32 ? "三十二"
	        : e == 33 ? "三十三"
	        : e == 34 ? "三十四"
	        : e == 35 ? "三十五"
	        : e == 36 ? "三十六"
	        : e == 37 ? "三十七"
	        : e == 38 ? "三十八"
	        : e == 39 ? "三十九"
	        : e == 40 ? "四十"
	        : e == 41 ? "四十一"
	        : e == 42 ? "四十二"
	        : e == 43 ? "四十三"
	        : e == 44 ? "四十四"
	        : e == 45 ? "四十五"
	        : e == 46 ? "四十六"
	        : e == 47 ? "四十七"
	        : e == 48 ? "四十八"
	        : e == 49 ? "四十九"
	        : e == 50 ? "五十"
	        : "";
	});
	template.helper('test', function (e) { return e;})

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

/***/ 32:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/teacher/my-class-course-list',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+=' <div class="list-block"> <ul> ';
	$each($data,function(v,i){
	$out+=' <li class="item-content item-link s-course-list" data-classindex="';
	$out+=$escape(v.ClassIndex);
	$out+='"> <div class="item-inner"> <div class="item-title">课';
	$out+=$escape(v.CurrentIndex);
	$out+='</div> <div class="item-after">上课时间：<span>';
	$out+=$escape($helpers. dateFormat(v.ActionTime ,  'yyyy/MM/dd hh:mm:ss' ));
	$out+='</span></div> </div> </li> ';
	});
	$out+=' </ul> </div>';
	return new String($out);
	});

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy90ZWFjaGVyUG9ydC9teS1jbGFzcy1jb3Vyc2UtbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3RlbXBsYXRlLWhlbHBlcnMuanM/MTk0MyoqKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi90bW9kanMtbG9hZGVyL3J1bnRpbWUuanM/ODk2NioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy90cGwvdGVhY2hlci9teS1jbGFzcy1jb3Vyc2UtbGlzdC50cGwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTCxFQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsbUJBQW1CO0FBQ2xDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxjQUFhOztBQUViO0FBQ0EsTUFBSztBQUNMOzs7Ozs7OztBQ2hEQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsdUNBQXNDLFdBQVcsQzs7Ozs7OztBQzdKakQsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQSx5Q0FBd0MsT0FBTywyQkFBMkI7QUFDMUU7O0FBRUE7QUFDQTtBQUNBLHNDQUFxQyxZQUFZO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQSwwQkFBeUIsaUVBQWlFO0FBQzFGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBLGFBQVksZUFBZTtBQUMzQixrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXFCO0FBQ3JCLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsR0FBRTtBQUNGLGtDQUFpQztBQUNqQyxJQUFHO0FBQ0gsZUFBYztBQUNkO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGLEVBQUMsRzs7Ozs7OztBQzlFRDtBQUNBO0FBQ0E7QUFDQSxjQUFhLCtHQUErRztBQUM1SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSxFQUFDLEUiLCJmaWxlIjoidGVhY2hlclBvcnQvbXktY2xhc3MtY291cnNlLWxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTA2MTQ4ZDA1Nzk0MDgwMGZmNSIsInZhciBhPXJlcXVpcmUoJ3RlbXBsYXRlLWhlbHBlcnMuanMnKTtcclxudmFyIGNsYXNzaWQ7XHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGEpO1xyXG4gICAgY2xhc3NpZCA9ICQoXCIjaGlkZGVuLWNsYXNzaWRcIikudGV4dCgpO1xyXG5cclxuICAgIEdldENsYXNzQ291cnNlUmVjb3JkTGlzdChjbGFzc2lkKTtcclxuXHJcbiAgICAkKFwiI2J0bi1zdWJtaXRcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICQucm91dGVyLmxvYWQoJy90ZWFjaGVyL215Y2xhc3MvU3R1ZGVudEdyb3VwP2NsYXNzaWQ9JyArIGNsYXNzaWQsIHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG59KTtcclxuXHJcblxyXG5mdW5jdGlvbiBHZXRDbGFzc0NvdXJzZVJlY29yZExpc3QoY2xhc3NpZCkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcImdldFwiLFxyXG4gICAgICAgIHVybDogXCIvdGVhY2hlci9teWNsYXNzL0dldENsYXNzQ291cnNlUmVjb3JkTGlzdFwiLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBkYXRhOiB7IGNsYXNzaWQ6IGNsYXNzaWQgfSxcclxuICAgICAgICBkYXRhVHlwZTogXCJKU09OXCIsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxpID0gZGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSBcIu+/ve+/ve+/vd6/zrTOvO+/vcK8XCI7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHBsID0gcmVxdWlyZShcInRlYWNoZXIvbXktY2xhc3MtY291cnNlLWxpc3RcIik7XHJcblxyXG4gICAgICAgICAgICAkKFwiI2NvdXJzZWxpc3RcIikuaHRtbCh0cGwobGkpKTtcclxuICAgICAgICAgICAgaWYgKGxpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2NvdXJzZWxpc3RcIikuaHRtbChzdHIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkKFwiLnMtY291cnNlLWxpc3RcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzaW5kZXggPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWNsYXNzaW5kZXhcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgJC5yb3V0ZXIubG9hZCgnL3RlYWNoZXIvbXljbGFzcy9Db3Vyc2VSZXBvcnQ/Y2xhc3NpbmRleD0nICsgY2xhc3NpbmRleCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvdGVhY2hlclBvcnQvbXktY2xhc3MtY291cnNlLWxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSA0NSIsIi8vdmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xyXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcclxuXHJcbi8qKiBcclxuICog5a+55pel5pyf6L+b6KGM5qC85byP5YyW77yMIFxyXG4gKiBAcGFyYW0gZGF0ZSDopoHmoLzlvI/ljJbnmoTml6XmnJ8gXHJcbiAqIEBwYXJhbSBmb3JtYXQg6L+b6KGM5qC85byP5YyW55qE5qih5byP5a2X56ym5LiyXHJcbiAqICAgICDmlK/mjIHnmoTmqKHlvI/lrZfmr43mnInvvJogXHJcbiAqICAgICB5OuW5tCwgXHJcbiAqICAgICBNOuW5tOS4reeahOaciOS7vSgxLTEyKSwgXHJcbiAqICAgICBkOuaciOS7veS4reeahOWkqSgxLTMxKSwgXHJcbiAqICAgICBoOuWwj+aXtigwLTIzKSwgXHJcbiAqICAgICBtOuWIhigwLTU5KSwgXHJcbiAqICAgICBzOuenkigwLTU5KSwgXHJcbiAqICAgICBTOuavq+enkigwLTk5OSksXHJcbiAqICAgICBxOuWto+W6pigxLTQpXHJcbiAqIEByZXR1cm4gU3RyaW5nXHJcbiAqIEBhdXRob3IgeWFuaXMud2FuZ1xyXG4gKiBAc2VlXHRodHRwOi8veWFuaXN3YW5nLmNvbS9mcm9udGVuZC8yMDEzLzAyLzE2L2RhdGVmb3JtYXQtcGVyZm9ybWFuY2UvXHJcbiAqL1xyXG5cclxuLy/ml7bpl7TovazmjaJcclxudGVtcGxhdGUuaGVscGVyKCdkYXRlRm9ybWF0JywgZnVuY3Rpb24gKGRhdGUsIGZvcm1hdCkge1xyXG4gICAgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KGRhdGUucmVwbGFjZShcIi9EYXRlKFwiLCBcIlwiKS5yZXBsYWNlKFwiKS9cIiwgXCJcIiksIDEwKSk7XHJcbiAgICAvL3JldHVybiBkYXRlLmdldERhdGUoKTtcclxuICAgLy9kYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcblxyXG4gICAgdmFyIG1hcCA9IHtcclxuICAgICAgICBcInlcIjogZGF0ZS5nZXRZZWFyKCksXHJcbiAgICAgICAgXCJNXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9IFxyXG4gICAgICAgIFwiZFwiOiBkYXRlLmdldERhdGUoKSwgLy/ml6UgXHJcbiAgICAgICAgXCJoXCI6IGRhdGUuZ2V0SG91cnMoKSwgLy/lsI/ml7YgXHJcbiAgICAgICAgXCJtXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhiBcclxuICAgICAgICBcInNcIjogZGF0ZS5nZXRTZWNvbmRzKCksIC8v56eSIFxyXG4gICAgICAgIFwicVwiOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6piBcclxuICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enkiBcclxuICAgIH07XHJcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvKFt5TWRobXNxU10pKy9nLCBmdW5jdGlvbihhbGwsIHQpe1xyXG4gICAgICAgIHZhciB2ID0gbWFwW3RdO1xyXG4gICAgICAgIGlmKHYgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGFsbC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgICAgIHYgPSAnMCcgKyB2O1xyXG4gICAgICAgICAgICAgICAgdiA9IHYuc3Vic3RyKHYubGVuZ3RoLTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHQgPT09ICd5Jyl7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gYWxsLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGw7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmb3JtYXQ7XHJcbn0pO1xyXG5cclxuLy/miKrlrZflpITnkIZcclxudGVtcGxhdGUuaGVscGVyKCdjdXRjaGFyJywgZnVuY3Rpb24gKG9iaiwgY2hhcmxlbmd0aCkge1xyXG5cclxuICAgIGlmIChvYmogPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5sZW5ndGggPiBwYXJzZUludChjaGFybGVuZ3RoKSkge1xyXG4gICAgICAgIG9iaiA9IG9iai5zdWJzdHJpbmcoMCwgcGFyc2VJbnQoY2hhcmxlbmd0aCkpICsgXCIuLi5cIjtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iajtcclxuXHJcbn0pO1xyXG5cclxuLy/mlZnnoJTor4TnuqdcclxudGVtcGxhdGUuaGVscGVyKCdUZWFjaFR5cGVUcmFuJywgZnVuY3Rpb24gKG9iaikge1xyXG5cclxuICAgIGlmIChvYmogPT0gMSkge1xyXG4gICAgICAgIHJldHVybiBcIkHnuqdcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiQue6p1wiO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5ZCI5ZCM5pyf6ZmQ6L2s5o2iXHJcbnRlbXBsYXRlLmhlbHBlcignSHRReCcsIGZ1bmN0aW9uIChvYmopIHtcclxuXHJcbiAgICByZXR1cm4gdGVtcGxhdGUuaGVscGVyKG9iaikgKyBcIuW5tFwiO1xyXG59KTtcclxuXHJcbi8v5bm057qnXHJcbnRlbXBsYXRlLmhlbHBlcignR2V0QmlnR3JhZGUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgcmV0dXJuIGUgPT0gMSA/IFwi5LiA5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gMiA/IFwi5LqM5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gMyA/IFwi5LiJ5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNCA/IFwi5Zub5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNSA/IFwi5LqU5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNiA/IFwi5YWt5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNyA/IFwi5LiD5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gOCA/IFwi5YWr5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gOSA/IFwi5Lmd5bm057qnXCJcclxuICAgICAgICAgOiBlID09IDEwID8gXCLpq5jkuIBcIlxyXG4gICAgICAgIDogZSA9PSAxMSA/IFwi6auY5LqMXCJcclxuICAgICAgICA6IGUgPT0gMTIgPyBcIumrmOS4iVwiXHJcbiAgICAgICAgOiBcIlwiO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy/lpKflhpnnmoTovazmjaJcclxudGVtcGxhdGUuaGVscGVyKCdHZXRCaWdXJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHJldHVybiBlID09IDEgPyBcIuS4gFwiXHJcbiAgICAgICAgOiBlID09IDIgPyBcIuS6jFwiXHJcbiAgICAgICAgOiBlID09IDMgPyBcIuS4iVwiXHJcbiAgICAgICAgOiBlID09IDQgPyBcIuWbm1wiXHJcbiAgICAgICAgOiBlID09IDUgPyBcIuS6lFwiXHJcbiAgICAgICAgOiBlID09IDYgPyBcIuWFrVwiXHJcbiAgICAgICAgOiBlID09IDcgPyBcIuS4g1wiXHJcbiAgICAgICAgOiBlID09IDggPyBcIuWFq1wiXHJcbiAgICAgICAgOiBlID09IDkgPyBcIuS5nVwiXHJcbiAgICAgICAgOiBlID09IDEwID8gXCLljYFcIlxyXG4gICAgICAgIDogZSA9PSAxMSA/IFwi5Y2B5LiAXCJcclxuICAgICAgICA6IGUgPT0gMTIgPyBcIuWNgeS6jFwiXHJcbiAgICAgICAgOiBlID09IDEzID8gXCLljYHkuIlcIlxyXG4gICAgICAgIDogZSA9PSAxNCA/IFwi5Y2B5ZubXCJcclxuICAgICAgICA6IGUgPT0gMTUgPyBcIuWNgeS6lFwiXHJcbiAgICAgICAgOiBlID09IDE2ID8gXCLljYHlha1cIlxyXG4gICAgICAgIDogZSA9PSAxNyA/IFwi5Y2B5LiDXCJcclxuICAgICAgICA6IGUgPT0gMTggPyBcIuWNgeWFq1wiXHJcbiAgICAgICAgOiBlID09IDE5ID8gXCLljYHkuZ1cIlxyXG4gICAgICAgIDogZSA9PSAyMCA/IFwi5LqM5Y2BXCJcclxuICAgICAgICA6IGUgPT0gMjEgPyBcIuS6jOWNgeS4gFwiXHJcbiAgICAgICAgOiBlID09IDIyID8gXCLkuozljYHkuoxcIlxyXG4gICAgICAgIDogZSA9PSAyMyA/IFwi5LqM5Y2B5LiJXCJcclxuICAgICAgICA6IGUgPT0gMjQgPyBcIuS6jOWNgeWbm1wiXHJcbiAgICAgICAgOiBlID09IDI1ID8gXCLkuozljYHkupRcIlxyXG4gICAgICAgIDogZSA9PSAyNiA/IFwi5LqM5Y2B5YWtXCJcclxuICAgICAgICA6IGUgPT0gMjcgPyBcIuS6jOWNgeS4g1wiXHJcbiAgICAgICAgOiBlID09IDI4ID8gXCLkuozljYHlhatcIlxyXG4gICAgICAgIDogZSA9PSAyOSA/IFwi5LqM5Y2B5LmdXCJcclxuICAgICAgICA6IGUgPT0gMzAgPyBcIuS4ieWNgVwiXHJcbiAgICAgICAgOiBlID09IDMxID8gXCLkuInljYHkuIBcIlxyXG4gICAgICAgIDogZSA9PSAzMiA/IFwi5LiJ5Y2B5LqMXCJcclxuICAgICAgICA6IGUgPT0gMzMgPyBcIuS4ieWNgeS4iVwiXHJcbiAgICAgICAgOiBlID09IDM0ID8gXCLkuInljYHlm5tcIlxyXG4gICAgICAgIDogZSA9PSAzNSA/IFwi5LiJ5Y2B5LqUXCJcclxuICAgICAgICA6IGUgPT0gMzYgPyBcIuS4ieWNgeWFrVwiXHJcbiAgICAgICAgOiBlID09IDM3ID8gXCLkuInljYHkuINcIlxyXG4gICAgICAgIDogZSA9PSAzOCA/IFwi5LiJ5Y2B5YWrXCJcclxuICAgICAgICA6IGUgPT0gMzkgPyBcIuS4ieWNgeS5nVwiXHJcbiAgICAgICAgOiBlID09IDQwID8gXCLlm5vljYFcIlxyXG4gICAgICAgIDogZSA9PSA0MSA/IFwi5Zub5Y2B5LiAXCJcclxuICAgICAgICA6IGUgPT0gNDIgPyBcIuWbm+WNgeS6jFwiXHJcbiAgICAgICAgOiBlID09IDQzID8gXCLlm5vljYHkuIlcIlxyXG4gICAgICAgIDogZSA9PSA0NCA/IFwi5Zub5Y2B5ZubXCJcclxuICAgICAgICA6IGUgPT0gNDUgPyBcIuWbm+WNgeS6lFwiXHJcbiAgICAgICAgOiBlID09IDQ2ID8gXCLlm5vljYHlha1cIlxyXG4gICAgICAgIDogZSA9PSA0NyA/IFwi5Zub5Y2B5LiDXCJcclxuICAgICAgICA6IGUgPT0gNDggPyBcIuWbm+WNgeWFq1wiXHJcbiAgICAgICAgOiBlID09IDQ5ID8gXCLlm5vljYHkuZ1cIlxyXG4gICAgICAgIDogZSA9PSA1MCA/IFwi5LqU5Y2BXCJcclxuICAgICAgICA6IFwiXCI7XHJcbn0pO1xyXG50ZW1wbGF0ZS5oZWxwZXIoJ3Rlc3QnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZTt9KVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RwbC90ZW1wbGF0ZS1oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMTcgMTkgMjAgMjEgMjMgMjcgMjggNDUiLCIvKlRNT0RKUzp7fSovXHJcbiFmdW5jdGlvbiAoKSB7XHJcblx0ZnVuY3Rpb24gYShhLCBiKSB7XHJcblx0XHRyZXR1cm4gKC9zdHJpbmd8ZnVuY3Rpb24vLnRlc3QodHlwZW9mIGIpID8gaCA6IGcpKGEsIGIpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBiKGEsIGMpIHtcclxuXHRcdHJldHVybiBcInN0cmluZ1wiICE9IHR5cGVvZiBhICYmIChjID0gdHlwZW9mIGEsIFwibnVtYmVyXCIgPT09IGMgPyBhICs9IFwiXCIgOiBhID0gXCJmdW5jdGlvblwiID09PSBjID8gYihhLmNhbGwoYSkpIDogXCJcIiksIGFcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGMoYSkge1xyXG5cdFx0cmV0dXJuIGxbYV1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGQoYSkge1xyXG5cdFx0cmV0dXJuIGIoYSkucmVwbGFjZSgvJig/IVtcXHcjXSs7KXxbPD5cIiddL2csIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBlKGEsIGIpIHtcclxuXHRcdGlmIChtKGEpKWZvciAodmFyIGMgPSAwLCBkID0gYS5sZW5ndGg7IGQgPiBjOyBjKyspYi5jYWxsKGEsIGFbY10sIGMsIGEpOyBlbHNlIGZvciAoYyBpbiBhKWIuY2FsbChhLCBhW2NdLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZihhLCBiKSB7XHJcblx0XHR2YXIgYyA9IC8oXFwvKVteXFwvXStcXDFcXC5cXC5cXDEvLCBkID0gKFwiLi9cIiArIGEpLnJlcGxhY2UoL1teXFwvXSskLywgXCJcIiksIGUgPSBkICsgYjtcclxuXHRcdGZvciAoZSA9IGUucmVwbGFjZSgvXFwvXFwuXFwvL2csIFwiL1wiKTsgZS5tYXRjaChjKTspZSA9IGUucmVwbGFjZShjLCBcIi9cIik7XHJcblx0XHRyZXR1cm4gZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZyhiLCBjKSB7XHJcblx0XHR2YXIgZCA9IGEuZ2V0KGIpIHx8IGkoe2ZpbGVuYW1lOiBiLCBuYW1lOiBcIlJlbmRlciBFcnJvclwiLCBtZXNzYWdlOiBcIlRlbXBsYXRlIG5vdCBmb3VuZFwifSk7XHJcblx0XHRyZXR1cm4gYyA/IGQoYykgOiBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoKGEsIGIpIHtcclxuXHRcdGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBiKSB7XHJcblx0XHRcdHZhciBjID0gYjtcclxuXHRcdFx0YiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGsoYylcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dmFyIGQgPSBqW2FdID0gZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGIoYywgYSkgKyBcIlwiXHJcblx0XHRcdH0gY2F0Y2ggKGQpIHtcclxuXHRcdFx0XHRyZXR1cm4gaShkKSgpXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRyZXR1cm4gZC5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSA9IG4sIGQudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBiICsgXCJcIlxyXG5cdFx0fSwgZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaShhKSB7XHJcblx0XHR2YXIgYiA9IFwie1RlbXBsYXRlIEVycm9yfVwiLCBjID0gYS5zdGFjayB8fCBcIlwiO1xyXG5cdFx0aWYgKGMpYyA9IGMuc3BsaXQoXCJcXG5cIikuc2xpY2UoMCwgMikuam9pbihcIlxcblwiKTsgZWxzZSBmb3IgKHZhciBkIGluIGEpYyArPSBcIjxcIiArIGQgKyBcIj5cXG5cIiArIGFbZF0gKyBcIlxcblxcblwiO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIFwib2JqZWN0XCIgPT0gdHlwZW9mIGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcihiICsgXCJcXG5cXG5cIiArIGMpLCBiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgaiA9IGEuY2FjaGUgPSB7fSwgayA9IHRoaXMuU3RyaW5nLCBsID0ge1xyXG5cdFx0XCI8XCI6IFwiJiM2MDtcIixcclxuXHRcdFwiPlwiOiBcIiYjNjI7XCIsXHJcblx0XHQnXCInOiBcIiYjMzQ7XCIsXHJcblx0XHRcIidcIjogXCImIzM5O1wiLFxyXG5cdFx0XCImXCI6IFwiJiMzODtcIlxyXG5cdH0sIG0gPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRcdHJldHVybiBcIltvYmplY3QgQXJyYXldXCIgPT09IHt9LnRvU3RyaW5nLmNhbGwoYSlcclxuXHRcdH0sIG4gPSBhLnV0aWxzID0ge1xyXG5cdFx0JGhlbHBlcnM6IHt9LCAkaW5jbHVkZTogZnVuY3Rpb24gKGEsIGIsIGMpIHtcclxuXHRcdFx0cmV0dXJuIGEgPSBmKGMsIGEpLCBnKGEsIGIpXHJcblx0XHR9LCAkc3RyaW5nOiBiLCAkZXNjYXBlOiBkLCAkZWFjaDogZVxyXG5cdH0sIG8gPSBhLmhlbHBlcnMgPSBuLiRoZWxwZXJzO1xyXG5cdGEuZ2V0ID0gZnVuY3Rpb24gKGEpIHtcclxuXHRcdHJldHVybiBqW2EucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpXVxyXG5cdH0sIGEuaGVscGVyID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdG9bYV0gPSBiXHJcblx0fSwgbW9kdWxlLmV4cG9ydHMgPSBhXHJcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMTUgMTYgMTcgMTkgMjAgMjEgMjMgMjcgMjggMzQgNDAgNDEgNDIgNDMgNDUgNDYgNTMgNTQiLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnc3JjL3RwbC90ZWFjaGVyL215LWNsYXNzLWNvdXJzZS1saXN0JyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlYWNoPSR1dGlscy4kZWFjaCx2PSRkYXRhLnYsaT0kZGF0YS5pLCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsJG91dD0nJzskb3V0Kz0nIDxkaXYgY2xhc3M9XCJsaXN0LWJsb2NrXCI+IDx1bD4gJztcbiRlYWNoKCRkYXRhLGZ1bmN0aW9uKHYsaSl7XG4kb3V0Kz0nIDxsaSBjbGFzcz1cIml0ZW0tY29udGVudCBpdGVtLWxpbmsgcy1jb3Vyc2UtbGlzdFwiIGRhdGEtY2xhc3NpbmRleD1cIic7XG4kb3V0Kz0kZXNjYXBlKHYuQ2xhc3NJbmRleCk7XG4kb3V0Kz0nXCI+IDxkaXYgY2xhc3M9XCJpdGVtLWlubmVyXCI+IDxkaXYgY2xhc3M9XCJpdGVtLXRpdGxlXCI+6K++JztcbiRvdXQrPSRlc2NhcGUodi5DdXJyZW50SW5kZXgpO1xuJG91dCs9JzwvZGl2PiA8ZGl2IGNsYXNzPVwiaXRlbS1hZnRlclwiPuS4iuivvuaXtumXtO+8mjxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKCRoZWxwZXJzLiBkYXRlRm9ybWF0KHYuQWN0aW9uVGltZSAsICAneXl5eS9NTS9kZCBoaDptbTpzcycgKSk7XG4kb3V0Kz0nPC9zcGFuPjwvZGl2PiA8L2Rpdj4gPC9saT4gJztcbn0pO1xuJG91dCs9JyA8L3VsPiA8L2Rpdj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90cGwvdGVhY2hlci9teS1jbGFzcy1jb3Vyc2UtbGlzdC50cGxcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gNDUiXSwic291cmNlUm9vdCI6IiJ9