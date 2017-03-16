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

	
	var classindex;
	var classid;
	$(function () {

	    classindex = $("#hidden-classindex").text();
	    classid = $("#hidden-classid").text();

	    GetCourseReportList();


	    $(".s-tab").on("click", function () {

	        $.router.load("/teacher/myclass/SplendidMoment?classindex=" + classindex+"&classid="+classid);

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

	            var tpl = __webpack_require__(41);

	            $("#g-s-content").html(tpl(data));

	            var ishavegroup = 0;

	            if (data.grouplist.length > 0) {

	                ishavegroup = 1;
	            }

	    
	            $("#btn-submit").click(function () {

	                $.router.load("/teacher/myclass/RewardCoin?classindex=" + classindex + "&classid=" + classid+"&ishavegroup="+ishavegroup, true);

	            });


	            $(".b-studentlist-item").on("click", function () {
	                var classindex = $(this).attr("data-classindex");
	                var studentid = $(this).attr("data-studentid");
	                var courseid = $(this).attr("data-courseid");
	                var username = $(this).attr("data-username");
	               
	                $.router.load("/teacher/myclass/StudentAnalysis?classindex=" + classindex + "&studentid=" + studentid + "&courseid=" + courseid+"&username="+username, true);

	            });

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

/***/ 41:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/teacher/lesson-report',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,grouplist=$data.grouplist,$each=$utils.$each,d=$data.d,j=$data.j,$escape=$utils.$escape,studentlist=$data.studentlist,v=$data.v,i=$data.i,$out='';$out+=' ';
	if(grouplist.length>0){
	$out+=' <div class="card"> <div class="card-header"><i class="seq-icon group-icon"></i> 小组排名</div> <div class="card-content"> <div class="card-content-inner"> <div class="list-block"> <ul> ';
	$each(grouplist,function(d,j){
	$out+=' <li class="item-content"> <div class="item-media"></div> <div class="item-inner"> <div class="item-title"> <span>';
	$out+=$escape(d.GroupIndex);
	$out+='组</span> </div> <div class="item-after"><span class="word-num"><span>';
	$out+=$escape(d.AvgCredits);
	$out+='</span>学分</span></div> </div> ';
	if(d.Ranking==1){
	$out+=' <i class="seq seq-icon first-icon"></i> ';
	}else if(d.Ranking==2){
	$out+=' <i class="seq seq-icon second-icon"></i> ';
	}else if(d.Ranking==3){
	$out+=' <i class="seq seq-icon third-icon"></i> ';
	}else{
	$out+=' <span class="seq-num">';
	$out+=$escape(d.Ranking);
	$out+='</span> ';
	}
	$out+=' </li> ';
	});
	$out+=' </ul> </div> </div> </div> <div class="card-footer"></div> </div> ';
	}
	$out+=' <div class="card student"> <div class="card-header"><i class="seq-icon student-icon"></i>学生排名</div> <div class="card-content"> <div class="card-content-inner"> <div class="list-block"> <ul> ';
	$each(studentlist,function(v,i){
	$out+=' <li class="item-content b-studentlist-item" data-classindex="';
	$out+=$escape(v.ClassIndex);
	$out+='" data-studentid="';
	$out+=$escape(v.StudentID);
	$out+='" data-courseid="';
	$out+=$escape(v.CourseID);
	$out+='" data-username="';
	$out+=$escape(v.UserName);
	$out+='"> <div class="item-media"></div> <div class="item-inner"> <div class="item-title"> <span >';
	$out+=$escape(v.UserName);
	$out+='</span> ';
	if(grouplist.length>0){
	$out+=' <span>(';
	$out+=$escape(v.GroupIndex);
	$out+='组)</span> ';
	}
	$out+=' </div> <div class="item-after"> ';
	if(v.LeftNumber == 0){
	$out+=' <div class="lesson-circle over">已结课</div> ';
	}else if(v.LeftNumber == 1){
	$out+=' <div class="lesson-circle normal">剩1次</div> ';
	}else{
	$out+=' ';
	}
	$out+=' <span class="word-num">学分:&nbsp;&nbsp;<span>';
	$out+=$escape(v.Credits);
	$out+='</span>分</span> </div> </div> ';
	if(v.Ranking==1){
	$out+=' <i class="seq seq-icon first-icon"></i> ';
	}else if(v.Ranking==2){
	$out+=' <i class="seq seq-icon second-icon"></i> ';
	}else if(v.Ranking==3){
	$out+=' <i class="seq seq-icon third-icon"></i> ';
	}else{
	$out+=' <span class="seq-num">';
	$out+=$escape(v.Ranking);
	$out+='</span> ';
	}
	$out+=' </li> ';
	});
	$out+=' </ul> </div> </div> </div> <div class="card-footer"></div> </div>';
	return new String($out);
	});

/***/ }

/******/ });