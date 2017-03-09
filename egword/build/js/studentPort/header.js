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

	
	if($('#eg-header').length){//检测是否有导航
	    var data={title:'20'};
	    var html=__webpack_require__(35)(data);
	    $('#eg-header').html(html);
	    $('.header .nav li').click(function(){
	        if($(this).is('.header .nav li:last')){return false}
	        $(this).addClass('active').siblings().removeClass('active');
	    });

	    var val=$('.main-pop').outerHeight()<$(window).height()-82;
	    if(val){
	        $('#content').height($(window).height()-82);
	    }
	    $(window).resize(function(){
	        var val=$('.main-pop').outerHeight()<$(window).height()-82;

	        if(val){
	            $('#content').height($(window).height()-82);
	        }else{
	            $('#content').height($('.main-pop').outerHeight());
	        }
	    })
	}else{
	   var val=$('.main-pop').outerHeight()<$(window).height();
	    console.log($('.main-pop').outerHeight())
	   if(val){
	       $('#content').height($(window).height());
	   }
	    $(window).resize(function(){
	        var val=$('.main-pop').outerHeight()<$(window).height();
	        if(val){
	            $('#content').height($(window).height());
	        }else{
	            $('#content').height($('.main-pop').outerHeight());
	        }
	    })
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

/***/ 35:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/component/student-header',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,$out='';$out+='<div class="header"> <div class="log"></div><ul class="nav"> <li class="active"><a href="javascript:void(0)">学习中心</a></li> <li><a href="javascript:void(0)">测评中心</a></li> <li class="right" style="position:relative;"> <a href="javascript:void(0)">奥巴马<img style="margin-left:10px;" src="/egword/build/img/Obrma.png" alt="" class="vm" /></a> <div class="hover-brm"> <ul> <li>修改密码</li> <li>财富记录</li> <li>退出</li> </ul> </div> </li> <li class=\'right last\' style=\'margin-right:20px;\'><a href="javascript:void(0)"><img src="/egword/build/img/$.png" alt="" class="vm none"><img src="/egword/build/img/pc.png" alt="" class="vm"></img>&nbsp;<span class="learn-coins">学币</span>:<span style="margin-left:20px;">';
	$out+=$escape(title);
	$out+=' </span></a></li> </ul> </div>';
	return new String($out);
	});

/***/ }

/******/ });