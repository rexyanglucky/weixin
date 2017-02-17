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

	 $(function() {
	
	        GetStudentStatistics();
	    });
	
	    function GetStudentStatistics() {
	
	         var classindex =$("#hidden-classindex").text();
	         var studentid =$("#hidden-studentid").text();
	         var courseid =$("#hidden-courseid").text();
	
	        $.ajax({
	            type: "get",
	            url: "/teacher/myclass/GetStudentStatistics",
	            cache: false,
	            data: {
	                studentid: studentid,classindex:classindex,courseid:courseid
	            },
	            dataType: "JSON",
	            success: function (data) {
	
	                data = JSON.parse(data);
	
	
	                var tpl = __webpack_require__(30);
	
	                $("#studentinfo").html(tpl(data));
	
	                
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

/***/ 30:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/teacher/lesson-report-study-info',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,studentOne=$data.studentOne,studentAll=$data.studentAll,$out='';$out+=' <div class="card"> <div class="head-before"></div> <div class="card-header"> <span>';
	$out+=$escape(studentOne.UserName);
	$out+='</span> <span>课次：<span>';
	$out+=$escape(studentOne.CurrentNumber);
	$out+='/';
	$out+=$escape(studentOne.BookNumber);
	$out+='</span></span> </div> <div class="card-content"> <div class="card-content-inner"> <div class="content-block-title"> 本次课程 </div> <div class="list-block"> <ul> <li class="item-content"> <div class="item-inner"> <div class="item-title"> 新学单词： ';
	if(studentOne.NewWord<studentOne.DestNumber){
	$out+=' <span class="word-num"> ';
	$out+=$escape(studentOne.NewWord);
	$out+=' ';
	}else{
	$out+=' <span> ';
	$out+=$escape(studentOne.NewWord);
	$out+=' ';
	}
	$out+=' </span> <span class="item-remark">（目标量：<span>';
	$out+=$escape(studentOne.DestNumber);
	$out+='</span>）</span> </div> <div class="item-after"></div> </div> </li> <li class="item-content"> <div class="item-inner"> <div class="item-title"> 奖励学分：<span>';
	$out+=$escape(studentOne.Credits);
	$out+='</span> <span class="item-remark">（班级排名：<span>';
	$out+=$escape(studentOne.StudentOrder);
	$out+='</span>）</span> </div> <div class="item-after"></div> </div> </li> <li class="item-content"> <div class="item-inner"> <div class="item-title"> 单元小测：<span>';
	$out+=$escape(studentOne.UnitFullScore);
	$out+='个100分</span> </div> <div class="item-after"></div> </div> </li> <li class="item-content"> <div class="item-inner"> <div class="item-title"> 拼写错误率：<span>';
	$out+=$escape(studentOne.SpellFix);
	$out+='%</span>； 词义错误率：<span>';
	$out+=$escape(studentOne.NatureFix);
	$out+='%</span>； </div> <div class="item-after"></div> </div> </li> </ul> </div> <div class="split"></div> <div class="content-block-title"> 累计成果 </div> <div class="list-block"> <ul> <li class="item-content"> <div class="item-inner"> <div class="item-title"> 单词学习进度：<span>';
	$out+=$escape(studentAll.NewWord);
	$out+='/';
	$out+=$escape(studentAll.DestNumber);
	$out+='</span> </div> <div class="item-after"></div> </div> </li> <li class="item-content"> <div class="item-inner"> <div class="item-title"> 累计学分： ';
	if(studentAll.Credits<120){
	$out+=' <span class="word-num"> ';
	$out+=$escape(studentAll.Credits);
	$out+=' ';
	}else{
	$out+=' <span> ';
	$out+=$escape(studentAll.Credits);
	$out+=' ';
	}
	$out+=' </span> <span class="item-remark">（参考值：<span>120/500</span>）</span> </div> <div class="item-after"></div> </div> </li> <li class="item-content"> <div class="item-inner"> <div class="item-title"> 单元小测：<span>';
	$out+=$escape(studentAll.UnitFullScore);
	$out+='个100分</span> </div> <div class="item-after"></div> </div> </li> <li class="item-content"> <div class="item-inner"> <div class="item-title"> 拼写错误率：<span>';
	$out+=$escape(studentAll.SpellFix);
	$out+='%</span>； 词义错误率：<span>';
	$out+=$escape(studentAll.NatureFix);
	$out+='%</span>； </div> <div class="item-after"></div> </div> </li> </ul> </div> </div> </div> </div>';
	return new String($out);
	});

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy90ZWFjaGVyUG9ydC9sZXNzb24tcmVwb3J0LXN0dWR5LWluZm8uanMiLCJ3ZWJwYWNrOi8vLy4vfi90bW9kanMtbG9hZGVyL3J1bnRpbWUuanM/ODk2NioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3RlYWNoZXIvbGVzc29uLXJlcG9ydC1zdHVkeS1pbmZvLnRwbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUN0Q0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7OztBQUdBO0FBQ0EsVUFBUzs7QUFFVCxNOzs7Ozs7O0FDaENBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQWtDO0FBQ2xDOztBQUVBO0FBQ0EseUNBQXdDLE9BQU8sMkJBQTJCO0FBQzFFOztBQUVBO0FBQ0E7QUFDQSxzQ0FBcUMsWUFBWTtBQUNqRDtBQUNBOztBQUVBO0FBQ0EsMEJBQXlCLGlFQUFpRTtBQUMxRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQSxhQUFZLGVBQWU7QUFDM0Isa0RBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFxQjtBQUNyQixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLEdBQUU7QUFDRixrQ0FBaUM7QUFDakMsSUFBRztBQUNILGVBQWM7QUFDZDtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBLEdBQUU7QUFDRixFQUFDLEc7Ozs7Ozs7QUM5RUQ7QUFDQTtBQUNBO0FBQ0EsY0FBYSxnSUFBZ0k7QUFDN0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFIiwiZmlsZSI6InRlYWNoZXJQb3J0L2xlc3Nvbi1yZXBvcnQtc3R1ZHktaW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwiICQoZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgIEdldFN0dWRlbnRTdGF0aXN0aWNzKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBHZXRTdHVkZW50U3RhdGlzdGljcygpIHtcclxuXHJcbiAgICAgICAgIHZhciBjbGFzc2luZGV4ID0kKFwiI2hpZGRlbi1jbGFzc2luZGV4XCIpLnRleHQoKTtcclxuICAgICAgICAgdmFyIHN0dWRlbnRpZCA9JChcIiNoaWRkZW4tc3R1ZGVudGlkXCIpLnRleHQoKTtcclxuICAgICAgICAgdmFyIGNvdXJzZWlkID0kKFwiI2hpZGRlbi1jb3Vyc2VpZFwiKS50ZXh0KCk7XHJcblxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiZ2V0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvdGVhY2hlci9teWNsYXNzL0dldFN0dWRlbnRTdGF0aXN0aWNzXCIsXHJcbiAgICAgICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgc3R1ZGVudGlkOiBzdHVkZW50aWQsY2xhc3NpbmRleDpjbGFzc2luZGV4LGNvdXJzZWlkOmNvdXJzZWlkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcIkpTT05cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHRwbCA9IHJlcXVpcmUoXCJ0ZWFjaGVyL2xlc3Nvbi1yZXBvcnQtc3R1ZHktaW5mb1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiI3N0dWRlbnRpbmZvXCIpLmh0bWwodHBsKGRhdGEpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy90ZWFjaGVyUG9ydC9sZXNzb24tcmVwb3J0LXN0dWR5LWluZm8uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSA0MiIsIi8qVE1PREpTOnt9Ki9cclxuIWZ1bmN0aW9uICgpIHtcclxuXHRmdW5jdGlvbiBhKGEsIGIpIHtcclxuXHRcdHJldHVybiAoL3N0cmluZ3xmdW5jdGlvbi8udGVzdCh0eXBlb2YgYikgPyBoIDogZykoYSwgYilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGIoYSwgYykge1xyXG5cdFx0cmV0dXJuIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEgJiYgKGMgPSB0eXBlb2YgYSwgXCJudW1iZXJcIiA9PT0gYyA/IGEgKz0gXCJcIiA6IGEgPSBcImZ1bmN0aW9uXCIgPT09IGMgPyBiKGEuY2FsbChhKSkgOiBcIlwiKSwgYVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYyhhKSB7XHJcblx0XHRyZXR1cm4gbFthXVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZChhKSB7XHJcblx0XHRyZXR1cm4gYihhKS5yZXBsYWNlKC8mKD8hW1xcdyNdKzspfFs8PlwiJ10vZywgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGUoYSwgYikge1xyXG5cdFx0aWYgKG0oYSkpZm9yICh2YXIgYyA9IDAsIGQgPSBhLmxlbmd0aDsgZCA+IGM7IGMrKyliLmNhbGwoYSwgYVtjXSwgYywgYSk7IGVsc2UgZm9yIChjIGluIGEpYi5jYWxsKGEsIGFbY10sIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmKGEsIGIpIHtcclxuXHRcdHZhciBjID0gLyhcXC8pW15cXC9dK1xcMVxcLlxcLlxcMS8sIGQgPSAoXCIuL1wiICsgYSkucmVwbGFjZSgvW15cXC9dKyQvLCBcIlwiKSwgZSA9IGQgKyBiO1xyXG5cdFx0Zm9yIChlID0gZS5yZXBsYWNlKC9cXC9cXC5cXC8vZywgXCIvXCIpOyBlLm1hdGNoKGMpOyllID0gZS5yZXBsYWNlKGMsIFwiL1wiKTtcclxuXHRcdHJldHVybiBlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnKGIsIGMpIHtcclxuXHRcdHZhciBkID0gYS5nZXQoYikgfHwgaSh7ZmlsZW5hbWU6IGIsIG5hbWU6IFwiUmVuZGVyIEVycm9yXCIsIG1lc3NhZ2U6IFwiVGVtcGxhdGUgbm90IGZvdW5kXCJ9KTtcclxuXHRcdHJldHVybiBjID8gZChjKSA6IGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGgoYSwgYikge1xyXG5cdFx0aWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGIpIHtcclxuXHRcdFx0dmFyIGMgPSBiO1xyXG5cdFx0XHRiID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgayhjKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR2YXIgZCA9IGpbYV0gPSBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgYihjLCBhKSArIFwiXCJcclxuXHRcdFx0fSBjYXRjaCAoZCkge1xyXG5cdFx0XHRcdHJldHVybiBpKGQpKClcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBkLnByb3RvdHlwZSA9IGIucHJvdG90eXBlID0gbiwgZC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGIgKyBcIlwiXHJcblx0XHR9LCBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpKGEpIHtcclxuXHRcdHZhciBiID0gXCJ7VGVtcGxhdGUgRXJyb3J9XCIsIGMgPSBhLnN0YWNrIHx8IFwiXCI7XHJcblx0XHRpZiAoYyljID0gYy5zcGxpdChcIlxcblwiKS5zbGljZSgwLCAyKS5qb2luKFwiXFxuXCIpOyBlbHNlIGZvciAodmFyIGQgaW4gYSljICs9IFwiPFwiICsgZCArIFwiPlxcblwiICsgYVtkXSArIFwiXFxuXFxuXCI7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJvYmplY3RcIiA9PSB0eXBlb2YgY29uc29sZSAmJiBjb25zb2xlLmVycm9yKGIgKyBcIlxcblxcblwiICsgYyksIGJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBqID0gYS5jYWNoZSA9IHt9LCBrID0gdGhpcy5TdHJpbmcsIGwgPSB7XHJcblx0XHRcIjxcIjogXCImIzYwO1wiLFxyXG5cdFx0XCI+XCI6IFwiJiM2MjtcIixcclxuXHRcdCdcIic6IFwiJiMzNDtcIixcclxuXHRcdFwiJ1wiOiBcIiYjMzk7XCIsXHJcblx0XHRcIiZcIjogXCImIzM4O1wiXHJcblx0fSwgbSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGEpIHtcclxuXHRcdFx0cmV0dXJuIFwiW29iamVjdCBBcnJheV1cIiA9PT0ge30udG9TdHJpbmcuY2FsbChhKVxyXG5cdFx0fSwgbiA9IGEudXRpbHMgPSB7XHJcblx0XHQkaGVscGVyczoge30sICRpbmNsdWRlOiBmdW5jdGlvbiAoYSwgYiwgYykge1xyXG5cdFx0XHRyZXR1cm4gYSA9IGYoYywgYSksIGcoYSwgYilcclxuXHRcdH0sICRzdHJpbmc6IGIsICRlc2NhcGU6IGQsICRlYWNoOiBlXHJcblx0fSwgbyA9IGEuaGVscGVycyA9IG4uJGhlbHBlcnM7XHJcblx0YS5nZXQgPSBmdW5jdGlvbiAoYSkge1xyXG5cdFx0cmV0dXJuIGpbYS5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIildXHJcblx0fSwgYS5oZWxwZXIgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0b1thXSA9IGJcclxuXHR9LCBtb2R1bGUuZXhwb3J0cyA9IGFcclxufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi90bW9kanMtbG9hZGVyL3J1bnRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiAxNSAxNiAxNyAxOSAyMCAyMSAyMyAyNyAyOCAzNCA0MCA0MSA0MiA0MyA0NSA0NiA1MyA1NCIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCdzcmMvdHBsL3RlYWNoZXIvbGVzc29uLXJlcG9ydC1zdHVkeS1pbmZvJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsc3R1ZGVudE9uZT0kZGF0YS5zdHVkZW50T25lLHN0dWRlbnRBbGw9JGRhdGEuc3R1ZGVudEFsbCwkb3V0PScnOyRvdXQrPScgPGRpdiBjbGFzcz1cImNhcmRcIj4gPGRpdiBjbGFzcz1cImhlYWQtYmVmb3JlXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJjYXJkLWhlYWRlclwiPiA8c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShzdHVkZW50T25lLlVzZXJOYW1lKTtcbiRvdXQrPSc8L3NwYW4+IDxzcGFuPuivvuasoe+8mjxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKHN0dWRlbnRPbmUuQ3VycmVudE51bWJlcik7XG4kb3V0Kz0nLyc7XG4kb3V0Kz0kZXNjYXBlKHN0dWRlbnRPbmUuQm9va051bWJlcik7XG4kb3V0Kz0nPC9zcGFuPjwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj4gPGRpdiBjbGFzcz1cImNhcmQtY29udGVudC1pbm5lclwiPiA8ZGl2IGNsYXNzPVwiY29udGVudC1ibG9jay10aXRsZVwiPiDmnKzmrKHor77nqIsgPC9kaXY+IDxkaXYgY2xhc3M9XCJsaXN0LWJsb2NrXCI+IDx1bD4gPGxpIGNsYXNzPVwiaXRlbS1jb250ZW50XCI+IDxkaXYgY2xhc3M9XCJpdGVtLWlubmVyXCI+IDxkaXYgY2xhc3M9XCJpdGVtLXRpdGxlXCI+IOaWsOWtpuWNleivje+8miAnO1xuaWYoc3R1ZGVudE9uZS5OZXdXb3JkPHN0dWRlbnRPbmUuRGVzdE51bWJlcil7XG4kb3V0Kz0nIDxzcGFuIGNsYXNzPVwid29yZC1udW1cIj4gJztcbiRvdXQrPSRlc2NhcGUoc3R1ZGVudE9uZS5OZXdXb3JkKTtcbiRvdXQrPScgJztcbn1lbHNle1xuJG91dCs9JyA8c3Bhbj4gJztcbiRvdXQrPSRlc2NhcGUoc3R1ZGVudE9uZS5OZXdXb3JkKTtcbiRvdXQrPScgJztcbn1cbiRvdXQrPScgPC9zcGFuPiA8c3BhbiBjbGFzcz1cIml0ZW0tcmVtYXJrXCI+77yI55uu5qCH6YeP77yaPHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoc3R1ZGVudE9uZS5EZXN0TnVtYmVyKTtcbiRvdXQrPSc8L3NwYW4+77yJPC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cIml0ZW0tYWZ0ZXJcIj48L2Rpdj4gPC9kaXY+IDwvbGk+IDxsaSBjbGFzcz1cIml0ZW0tY29udGVudFwiPiA8ZGl2IGNsYXNzPVwiaXRlbS1pbm5lclwiPiA8ZGl2IGNsYXNzPVwiaXRlbS10aXRsZVwiPiDlpZblirHlrabliIbvvJo8c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShzdHVkZW50T25lLkNyZWRpdHMpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJpdGVtLXJlbWFya1wiPu+8iOePree6p+aOkuWQje+8mjxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKHN0dWRlbnRPbmUuU3R1ZGVudE9yZGVyKTtcbiRvdXQrPSc8L3NwYW4+77yJPC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cIml0ZW0tYWZ0ZXJcIj48L2Rpdj4gPC9kaXY+IDwvbGk+IDxsaSBjbGFzcz1cIml0ZW0tY29udGVudFwiPiA8ZGl2IGNsYXNzPVwiaXRlbS1pbm5lclwiPiA8ZGl2IGNsYXNzPVwiaXRlbS10aXRsZVwiPiDljZXlhYPlsI/mtYvvvJo8c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShzdHVkZW50T25lLlVuaXRGdWxsU2NvcmUpO1xuJG91dCs9J+S4qjEwMOWIhjwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJpdGVtLWFmdGVyXCI+PC9kaXY+IDwvZGl2PiA8L2xpPiA8bGkgY2xhc3M9XCJpdGVtLWNvbnRlbnRcIj4gPGRpdiBjbGFzcz1cIml0ZW0taW5uZXJcIj4gPGRpdiBjbGFzcz1cIml0ZW0tdGl0bGVcIj4g5ou85YaZ6ZSZ6K+v546H77yaPHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoc3R1ZGVudE9uZS5TcGVsbEZpeCk7XG4kb3V0Kz0nJTwvc3Bhbj7vvJsg6K+N5LmJ6ZSZ6K+v546H77yaPHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoc3R1ZGVudE9uZS5OYXR1cmVGaXgpO1xuJG91dCs9JyU8L3NwYW4+77ybIDwvZGl2PiA8ZGl2IGNsYXNzPVwiaXRlbS1hZnRlclwiPjwvZGl2PiA8L2Rpdj4gPC9saT4gPC91bD4gPC9kaXY+IDxkaXYgY2xhc3M9XCJzcGxpdFwiPjwvZGl2PiA8ZGl2IGNsYXNzPVwiY29udGVudC1ibG9jay10aXRsZVwiPiDntK/orqHmiJDmnpwgPC9kaXY+IDxkaXYgY2xhc3M9XCJsaXN0LWJsb2NrXCI+IDx1bD4gPGxpIGNsYXNzPVwiaXRlbS1jb250ZW50XCI+IDxkaXYgY2xhc3M9XCJpdGVtLWlubmVyXCI+IDxkaXYgY2xhc3M9XCJpdGVtLXRpdGxlXCI+IOWNleivjeWtpuS5oOi/m+W6pu+8mjxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKHN0dWRlbnRBbGwuTmV3V29yZCk7XG4kb3V0Kz0nLyc7XG4kb3V0Kz0kZXNjYXBlKHN0dWRlbnRBbGwuRGVzdE51bWJlcik7XG4kb3V0Kz0nPC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cIml0ZW0tYWZ0ZXJcIj48L2Rpdj4gPC9kaXY+IDwvbGk+IDxsaSBjbGFzcz1cIml0ZW0tY29udGVudFwiPiA8ZGl2IGNsYXNzPVwiaXRlbS1pbm5lclwiPiA8ZGl2IGNsYXNzPVwiaXRlbS10aXRsZVwiPiDntK/orqHlrabliIbvvJogJztcbmlmKHN0dWRlbnRBbGwuQ3JlZGl0czwxMjApe1xuJG91dCs9JyA8c3BhbiBjbGFzcz1cIndvcmQtbnVtXCI+ICc7XG4kb3V0Kz0kZXNjYXBlKHN0dWRlbnRBbGwuQ3JlZGl0cyk7XG4kb3V0Kz0nICc7XG59ZWxzZXtcbiRvdXQrPScgPHNwYW4+ICc7XG4kb3V0Kz0kZXNjYXBlKHN0dWRlbnRBbGwuQ3JlZGl0cyk7XG4kb3V0Kz0nICc7XG59XG4kb3V0Kz0nIDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJpdGVtLXJlbWFya1wiPu+8iOWPguiAg+WAvO+8mjxzcGFuPjEyMC81MDA8L3NwYW4+77yJPC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cIml0ZW0tYWZ0ZXJcIj48L2Rpdj4gPC9kaXY+IDwvbGk+IDxsaSBjbGFzcz1cIml0ZW0tY29udGVudFwiPiA8ZGl2IGNsYXNzPVwiaXRlbS1pbm5lclwiPiA8ZGl2IGNsYXNzPVwiaXRlbS10aXRsZVwiPiDljZXlhYPlsI/mtYvvvJo8c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShzdHVkZW50QWxsLlVuaXRGdWxsU2NvcmUpO1xuJG91dCs9J+S4qjEwMOWIhjwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJpdGVtLWFmdGVyXCI+PC9kaXY+IDwvZGl2PiA8L2xpPiA8bGkgY2xhc3M9XCJpdGVtLWNvbnRlbnRcIj4gPGRpdiBjbGFzcz1cIml0ZW0taW5uZXJcIj4gPGRpdiBjbGFzcz1cIml0ZW0tdGl0bGVcIj4g5ou85YaZ6ZSZ6K+v546H77yaPHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoc3R1ZGVudEFsbC5TcGVsbEZpeCk7XG4kb3V0Kz0nJTwvc3Bhbj7vvJsg6K+N5LmJ6ZSZ6K+v546H77yaPHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoc3R1ZGVudEFsbC5OYXR1cmVGaXgpO1xuJG91dCs9JyU8L3NwYW4+77ybIDwvZGl2PiA8ZGl2IGNsYXNzPVwiaXRlbS1hZnRlclwiPjwvZGl2PiA8L2Rpdj4gPC9saT4gPC91bD4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+JztcbnJldHVybiBuZXcgU3RyaW5nKCRvdXQpO1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdHBsL3RlYWNoZXIvbGVzc29uLXJlcG9ydC1zdHVkeS1pbmZvLnRwbFxuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSA0MiJdLCJzb3VyY2VSb290IjoiIn0=