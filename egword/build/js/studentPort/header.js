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

	
	if($('#eg-header').length){//检测是否有导航
	    var data={title:'20'};
	    var html=__webpack_require__(26)(data);
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

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/component/student-header',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,title=$data.title,$out='';$out+='<div class="header"> <div class="log"></div><ul class="nav"> <li class="active"><a href="javascript:void(0)">学习中心</a></li> <li><a href="javascript:void(0)">测评中心</a></li> <li class="right" style="position:relative;"> <a href="javascript:void(0)">奥巴马<img style="margin-left:10px;" src="../../../build/img/Obrma.png" alt="" class="vm" /></a> <div class="hover-brm"> <ul> <li>修改密码</li> <li>财富记录</li> <li>退出</li> </ul> </div> </li> <li class=\'right last\' style=\'margin-right:20px;\'><a href="javascript:void(0)"><img src="../../../build/img/$.png" alt="" class="vm none"><img src="../../../build/img/pc.png" alt="" class="vm"></img>&nbsp;<span class="learn-coins">学币</span>:<span style="margin-left:20px;">';
	$out+=$escape(title);
	$out+=' </span></a></li> </ul> </div>';
	return new String($out);
	});

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3R1ZGVudFBvcnQvaGVhZGVyLmpzIiwid2VicGFjazovLy8uL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzPzg5NjYqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9jb21wb25lbnQvc3R1ZGVudC1oZWFkZXIudHBsIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNyQ0EsNEJBQTJCO0FBQzNCLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxnREFBK0M7QUFDL0M7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsTUFBSztBQUNMOzs7Ozs7OztBQ3JDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFrQztBQUNsQzs7QUFFQTtBQUNBLHlDQUF3QyxPQUFPLDJCQUEyQjtBQUMxRTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXFDLFlBQVk7QUFDakQ7QUFDQTs7QUFFQTtBQUNBLDBCQUF5QixpRUFBaUU7QUFDMUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0EsYUFBWSxlQUFlO0FBQzNCLGtEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUI7QUFDckIsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixHQUFFO0FBQ0Ysa0NBQWlDO0FBQ2pDLElBQUc7QUFDSCxlQUFjO0FBQ2Q7QUFDQSxJQUFHO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0YsRUFBQyxHOzs7Ozs7O0FDOUVEO0FBQ0E7QUFDQTtBQUNBLGNBQWEsMEZBQTBGLDROQUE0TixnRUFBZ0UseU1BQXlNLDhKQUE4SixrRUFBa0U7QUFDNXlCO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRSIsImZpbGUiOiJzdHVkZW50UG9ydC9oZWFkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTA2MTQ4ZDA1Nzk0MDgwMGZmNSIsIlxyXG5pZigkKCcjZWctaGVhZGVyJykubGVuZ3RoKXsvL+ajgOa1i+aYr+WQpuacieWvvOiIqlxyXG4gICAgdmFyIGRhdGE9e3RpdGxlOicyMCd9O1xyXG4gICAgdmFyIGh0bWw9cmVxdWlyZSgnY29tcG9uZW50L3N0dWRlbnQtaGVhZGVyJykoZGF0YSk7XHJcbiAgICAkKCcjZWctaGVhZGVyJykuaHRtbChodG1sKTtcclxuICAgICQoJy5oZWFkZXIgLm5hdiBsaScpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoJCh0aGlzKS5pcygnLmhlYWRlciAubmF2IGxpOmxhc3QnKSl7cmV0dXJuIGZhbHNlfVxyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHZhbD0kKCcubWFpbi1wb3AnKS5vdXRlckhlaWdodCgpPCQod2luZG93KS5oZWlnaHQoKS04MjtcclxuICAgIGlmKHZhbCl7XHJcbiAgICAgICAgJCgnI2NvbnRlbnQnKS5oZWlnaHQoJCh3aW5kb3cpLmhlaWdodCgpLTgyKTtcclxuICAgIH1cclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKXtcclxuICAgICAgICB2YXIgdmFsPSQoJy5tYWluLXBvcCcpLm91dGVySGVpZ2h0KCk8JCh3aW5kb3cpLmhlaWdodCgpLTgyO1xyXG5cclxuICAgICAgICBpZih2YWwpe1xyXG4gICAgICAgICAgICAkKCcjY29udGVudCcpLmhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCktODIpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKCcjY29udGVudCcpLmhlaWdodCgkKCcubWFpbi1wb3AnKS5vdXRlckhlaWdodCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59ZWxzZXtcclxuICAgdmFyIHZhbD0kKCcubWFpbi1wb3AnKS5vdXRlckhlaWdodCgpPCQod2luZG93KS5oZWlnaHQoKTtcclxuICAgIGNvbnNvbGUubG9nKCQoJy5tYWluLXBvcCcpLm91dGVySGVpZ2h0KCkpXHJcbiAgIGlmKHZhbCl7XHJcbiAgICAgICAkKCcjY29udGVudCcpLmhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG4gICB9XHJcbiAgICAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIHZhbD0kKCcubWFpbi1wb3AnKS5vdXRlckhlaWdodCgpPCQod2luZG93KS5oZWlnaHQoKTtcclxuICAgICAgICBpZih2YWwpe1xyXG4gICAgICAgICAgICAkKCcjY29udGVudCcpLmhlaWdodCgkKHdpbmRvdykuaGVpZ2h0KCkpO1xyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAkKCcjY29udGVudCcpLmhlaWdodCgkKCcubWFpbi1wb3AnKS5vdXRlckhlaWdodCgpKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL3N0dWRlbnRQb3J0L2hlYWRlci5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDM0IiwiLypUTU9ESlM6e30qL1xyXG4hZnVuY3Rpb24gKCkge1xyXG5cdGZ1bmN0aW9uIGEoYSwgYikge1xyXG5cdFx0cmV0dXJuICgvc3RyaW5nfGZ1bmN0aW9uLy50ZXN0KHR5cGVvZiBiKSA/IGggOiBnKShhLCBiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYihhLCBjKSB7XHJcblx0XHRyZXR1cm4gXCJzdHJpbmdcIiAhPSB0eXBlb2YgYSAmJiAoYyA9IHR5cGVvZiBhLCBcIm51bWJlclwiID09PSBjID8gYSArPSBcIlwiIDogYSA9IFwiZnVuY3Rpb25cIiA9PT0gYyA/IGIoYS5jYWxsKGEpKSA6IFwiXCIpLCBhXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjKGEpIHtcclxuXHRcdHJldHVybiBsW2FdXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkKGEpIHtcclxuXHRcdHJldHVybiBiKGEpLnJlcGxhY2UoLyYoPyFbXFx3I10rOyl8Wzw+XCInXS9nLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZShhLCBiKSB7XHJcblx0XHRpZiAobShhKSlmb3IgKHZhciBjID0gMCwgZCA9IGEubGVuZ3RoOyBkID4gYzsgYysrKWIuY2FsbChhLCBhW2NdLCBjLCBhKTsgZWxzZSBmb3IgKGMgaW4gYSliLmNhbGwoYSwgYVtjXSwgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGYoYSwgYikge1xyXG5cdFx0dmFyIGMgPSAvKFxcLylbXlxcL10rXFwxXFwuXFwuXFwxLywgZCA9IChcIi4vXCIgKyBhKS5yZXBsYWNlKC9bXlxcL10rJC8sIFwiXCIpLCBlID0gZCArIGI7XHJcblx0XHRmb3IgKGUgPSBlLnJlcGxhY2UoL1xcL1xcLlxcLy9nLCBcIi9cIik7IGUubWF0Y2goYyk7KWUgPSBlLnJlcGxhY2UoYywgXCIvXCIpO1xyXG5cdFx0cmV0dXJuIGVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGcoYiwgYykge1xyXG5cdFx0dmFyIGQgPSBhLmdldChiKSB8fCBpKHtmaWxlbmFtZTogYiwgbmFtZTogXCJSZW5kZXIgRXJyb3JcIiwgbWVzc2FnZTogXCJUZW1wbGF0ZSBub3QgZm91bmRcIn0pO1xyXG5cdFx0cmV0dXJuIGMgPyBkKGMpIDogZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaChhLCBiKSB7XHJcblx0XHRpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgYikge1xyXG5cdFx0XHR2YXIgYyA9IGI7XHJcblx0XHRcdGIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBrKGMpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHZhciBkID0galthXSA9IGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBiKGMsIGEpICsgXCJcIlxyXG5cdFx0XHR9IGNhdGNoIChkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGkoZCkoKVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGQucHJvdG90eXBlID0gYi5wcm90b3R5cGUgPSBuLCBkLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gYiArIFwiXCJcclxuXHRcdH0sIGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGkoYSkge1xyXG5cdFx0dmFyIGIgPSBcIntUZW1wbGF0ZSBFcnJvcn1cIiwgYyA9IGEuc3RhY2sgfHwgXCJcIjtcclxuXHRcdGlmIChjKWMgPSBjLnNwbGl0KFwiXFxuXCIpLnNsaWNlKDAsIDIpLmpvaW4oXCJcXG5cIik7IGVsc2UgZm9yICh2YXIgZCBpbiBhKWMgKz0gXCI8XCIgKyBkICsgXCI+XFxuXCIgKyBhW2RdICsgXCJcXG5cXG5cIjtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBcIm9iamVjdFwiID09IHR5cGVvZiBjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IoYiArIFwiXFxuXFxuXCIgKyBjKSwgYlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIGogPSBhLmNhY2hlID0ge30sIGsgPSB0aGlzLlN0cmluZywgbCA9IHtcclxuXHRcdFwiPFwiOiBcIiYjNjA7XCIsXHJcblx0XHRcIj5cIjogXCImIzYyO1wiLFxyXG5cdFx0J1wiJzogXCImIzM0O1wiLFxyXG5cdFx0XCInXCI6IFwiJiMzOTtcIixcclxuXHRcdFwiJlwiOiBcIiYjMzg7XCJcclxuXHR9LCBtID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYSkge1xyXG5cdFx0XHRyZXR1cm4gXCJbb2JqZWN0IEFycmF5XVwiID09PSB7fS50b1N0cmluZy5jYWxsKGEpXHJcblx0XHR9LCBuID0gYS51dGlscyA9IHtcclxuXHRcdCRoZWxwZXJzOiB7fSwgJGluY2x1ZGU6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XHJcblx0XHRcdHJldHVybiBhID0gZihjLCBhKSwgZyhhLCBiKVxyXG5cdFx0fSwgJHN0cmluZzogYiwgJGVzY2FwZTogZCwgJGVhY2g6IGVcclxuXHR9LCBvID0gYS5oZWxwZXJzID0gbi4kaGVscGVycztcclxuXHRhLmdldCA9IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRyZXR1cm4galthLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKV1cclxuXHR9LCBhLmhlbHBlciA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRvW2FdID0gYlxyXG5cdH0sIG1vZHVsZS5leHBvcnRzID0gYVxyXG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEyIDE1IDE2IDE3IDE5IDIwIDIxIDIzIDI3IDI4IDM0IDQwIDQxIDQyIDQzIDQ1IDQ2IDUzIDU0IiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ3NyYy90cGwvY29tcG9uZW50L3N0dWRlbnQtaGVhZGVyJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsdGl0bGU9JGRhdGEudGl0bGUsJG91dD0nJzskb3V0Kz0nPGRpdiBjbGFzcz1cImhlYWRlclwiPiA8ZGl2IGNsYXNzPVwibG9nXCI+PC9kaXY+PHVsIGNsYXNzPVwibmF2XCI+IDxsaSBjbGFzcz1cImFjdGl2ZVwiPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj7lrabkuaDkuK3lv4M8L2E+PC9saT4gPGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIj7mtYvor4TkuK3lv4M8L2E+PC9saT4gPGxpIGNsYXNzPVwicmlnaHRcIiBzdHlsZT1cInBvc2l0aW9uOnJlbGF0aXZlO1wiPiA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCI+5aWl5be06amsPGltZyBzdHlsZT1cIm1hcmdpbi1sZWZ0OjEwcHg7XCIgc3JjPVwiLi4vLi4vLi4vYnVpbGQvaW1nL09icm1hLnBuZ1wiIGFsdD1cIlwiIGNsYXNzPVwidm1cIiAvPjwvYT4gPGRpdiBjbGFzcz1cImhvdmVyLWJybVwiPiA8dWw+IDxsaT7kv67mlLnlr4bnoIE8L2xpPiA8bGk+6LSi5a+M6K6w5b2VPC9saT4gPGxpPumAgOWHujwvbGk+IDwvdWw+IDwvZGl2PiA8L2xpPiA8bGkgY2xhc3M9XFwncmlnaHQgbGFzdFxcJyBzdHlsZT1cXCdtYXJnaW4tcmlnaHQ6MjBweDtcXCc+PGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiPjxpbWcgc3JjPVwiLi4vLi4vLi4vYnVpbGQvaW1nLyQucG5nXCIgYWx0PVwiXCIgY2xhc3M9XCJ2bSBub25lXCI+PGltZyBzcmM9XCIuLi8uLi8uLi9idWlsZC9pbWcvcGMucG5nXCIgYWx0PVwiXCIgY2xhc3M9XCJ2bVwiPjwvaW1nPiZuYnNwOzxzcGFuIGNsYXNzPVwibGVhcm4tY29pbnNcIj7lrabluIE8L3NwYW4+OjxzcGFuIHN0eWxlPVwibWFyZ2luLWxlZnQ6MjBweDtcIj4nO1xuJG91dCs9JGVzY2FwZSh0aXRsZSk7XG4kb3V0Kz0nIDwvc3Bhbj48L2E+PC9saT4gPC91bD4gPC9kaXY+JztcbnJldHVybiBuZXcgU3RyaW5nKCRvdXQpO1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdHBsL2NvbXBvbmVudC9zdHVkZW50LWhlYWRlci50cGxcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMzQiXSwic291cmNlUm9vdCI6IiJ9