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

	

	var _classindex;
	var _classgroupid = 0;
	var _studentid = 0;

	$(function () {
	    _classindex = $("#hidden-classindex").text();
	    var ishavegroup =  $("#hidden-ishavegroup").text();
	    $(".s-tab").on("click",
	        function() {
	            var types = $(this).attr("data-id");

	            $(this).addClass("active");
	            $(this).siblings().removeClass("active");

	            if (types == "g") {

	                GetGroupOrderList();

	            } else {
	                GetStudentOrderList();
	            }


	        });

	    if (ishavegroup == "1") {

	        GetGroupOrderList();

	    } else {
	        GetStudentOrderList();
	    }




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
	            if (li.length > 0) {

	                var tpl = __webpack_require__(42);

	                $("#g-s-content").html(tpl(li));

	                $(".b-grouplist-item").off("click");
	                $(".b-grouplist-item").on("click", function () {
	                    var groupindex = $(this).attr("data-groupindex");
	                    _classgroupid = $(this).attr("data-classgroupid");


	                    $(".b-addcoin-num").removeClass("active").first().addClass("active");
	                    $("#hidden-coinnum").text(10);

	                    $(".b-showaddcoin").show();
	                    $("#b-showaddcoin-title").html("奖励学币-" + groupindex + "组");

	                    $(".b-addcoin-num").off("click");
	                    $(".b-addcoin-num").on("click", function () {

	                        $(".b-addcoin-num").removeClass("active");

	                        var coinnum = $(this).addClass("active").text();

	                        $("#hidden-coinnum").text(coinnum);

	                    });


	                    $("#btn-submit").off("click");
	                    $("#btn-submit").click(function () {

	                        $(".b-showaddcoin").hide();
	                        AddGroupCurrency();

	                    });
	                    $("#btn-cancel").off("click");
	                    $("#btn-cancel").click(function () {
	                        $(".b-showaddcoin").hide();
	                    });


	                });


	            }
	            else {

	            $("#g-s-content").html("");
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

	            var tpl = __webpack_require__(43);

	            $("#g-s-content").html(tpl(li));

	            $(".b-studentlist-item").off("click");
	            $(".b-studentlist-item").on("click", function () {
	                _studentid = $(this).attr("data-studentid");
	                var studentname = $(this).attr("data-studentname");

	                $(".b-addcoin-num").removeClass("active").first().addClass("active");
	                $("#hidden-coinnum").text(10);

	                $(".b-showaddcoin").show();


	                $("#b-showaddcoin-title").html("奖励学币-" + studentname);

	                $(".b-addcoin-num").off("click");
	                $(".b-addcoin-num").on("click", function () {

	                    $(".b-addcoin-num").removeClass("active");

	                    var coinnum = $(this).addClass("active").text();

	                    $("#hidden-coinnum").text(coinnum);

	                });

	                $("#btn-submit").off("click");
	                $("#btn-submit").click(function () {

	                    $(".b-showaddcoin").hide();
	                    AddStudentCurrency();

	                });
	                $("#btn-cancel").off("click");
	                $("#btn-cancel").click(function () {
	                    $(".b-showaddcoin").hide();
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

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/teacher/lesson-report-group-g',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+=' <div class="card"> <div class="card-header">选择奖励小组</div> <div class="card-content"> <div class="card-content-inner"> <div class="list-block"> <ul> ';
	$each($data,function(v,i){
	$out+=' <li class="item-content b-grouplist-item" data-groupindex="';
	$out+=$escape(v.GroupIndex);
	$out+='" data-classgroupid="';
	$out+=$escape(v.ClassGroupID);
	$out+='"> <div class="item-media"></div> <div class="item-inner"> <div class="item-title"> <span class="seq">';
	$out+=$escape(v.Ranking);
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

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/teacher/lesson-report-group-s',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+=' <div class="card"> <div class="card-header">选择奖励学生</div> <div class="card-content"> <div class="card-content-inner"> <div class="list-block"> <ul> ';
	$each($data,function(v,i){
	$out+=' <li class="item-content b-studentlist-item" data-studentid="';
	$out+=$escape(v.StudentID);
	$out+='" data-studentname ="';
	$out+=$escape(v.UserName);
	$out+='"> <div class="item-media"></div> <div class="item-inner"> <div class="item-title"> <span class="seq">';
	$out+=$escape(v.Ranking);
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