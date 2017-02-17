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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var tool=__webpack_require__(4)
	tool.timeTickBig(10);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	
	
	function popshow(sele, popshow) {//弹出层的显示
	   
	    sele.on('click', function () {
	        popshow.show();
	        $('.pop-mask').show();
	        $('.pop-mask').show();
	    })
	}
	function pophide(sele, popshow) {//弹出层的消失
	    sele.on('click', function () {
	        popshow.hide();
	        $('.pop-mask').hide();
	    })
	}
	function checkBoox() {//复选框的样式
	    $('.checkBox').on('click', function () {
	        if ($(this).find('img').css('visibility') == 'visible') {
	            $(this).find('img').css('visibility', 'hidden');
	            $(this).css('border', '1px solid #8e9fa8');
	        } else {
	            $(this).find('img').css('visibility', 'visible');
	            $(this).css('border', '1px solid #fff');
	        }
	    })
	}
	function chooseAll() {//全选全不选
	    $('.checkBox').on('click', function () {
	        var num = $('.checkBox').index($(this));
	        if (num == 0) {
	            if ($(this).find('img').css('visibility') == 'visible') {
	                $('.checkBox').each(function () {
	                    $(this).find('img').css('visibility', 'hidden');
	                    $(this).css('border', '1px solid #8e9fa8');
	                })
	            } else {
	                $('.checkBox').each(function () {
	                    $(this).find('img').css('visibility', 'visible');
	                    $(this).css('border', '1px solid #fff');
	                })
	            }
	        } else {
	            if ($(this).find('img').css('visibility') == 'visible') {
	                $(this).find('img').css('visibility', 'hidden');
	                $(this).css('border', '1px solid #8e9fa8');
	            } else {
	                $(this).find('img').css('visibility', 'visible');
	                $(this).css('border', '1px solid #fff');
	            }
	            var $imgs = $.makeArray($('.table tr:not(:first)').find('img'));
	            var value = $imgs.every(function (item) {
	                return item.style.visibility == 'visible';
	            })
	            if (value) {
	                $('.checkBox').first().find('img').css('visibility', 'visible');
	                $('.checkBox').first().css('border', '1px solid #fff');
	            } else {
	                $('.checkBox').first().find('img').css('visibility', 'hidden');
	                $('.checkBox').first().css('border', '1px solid #8e9fa8');
	            }
	        }
	    })
	
	}
	function Sibs(This) {
	    This.on('click', function () {
	        $(this).addClass('active').siblings().removeClass('active');
	    })
	}
	
	function radio() {//单选的样式
	    $('.radio').on('click', function () {
	        $('.radio').removeClass('active');
	        $(this).addClass('active');
	    })
	}
	
	function setCookie(objName, objValue, objHours) {
	    var str = objName + "=" + escape(objValue);
	
	    if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
	        var date = new Date();
	        var ms = objHours * 3600 * 1000;
	        date.setTime(date.getTime() + ms);
	        str += "; expires=" + date.toGMTString() + ";path=/";
	    }
	    document.cookie = str;
	}
	
	function getCookie(objName) { //获取指定名称的cookie的值
	    var arrStr = document.cookie.split("; ");
	    for (var i = 0; i < arrStr.length; i++) {
	        var temp = arrStr[i].split("=");
	        if (temp[0] == objName) {
	            return unescape(temp[1]);
	        }
	    }
	}
	
	//弹出加载图片
	function ShowLoading(obj) {
	    obj.html(jQuery("#divLoading").html());
	}
	function timeTickBig(second) {
	    $(".times-big").html(second);
	    var t = setInterval(function () {
	        $(".times-big").html(--second);
	        if (second <= 0) {
	            $(".rotate-point").css({ "animation-play-state": "paused" });
	            clearInterval(t);
	        }
	    }, 1000);
	    $(".rotate-point").css({ "animation-play-state": "running" });
	}
	
	//加载图片到某个元素中
	function InsertLoading(obj) {
	    obj.append(jQuery("#divLoading").html());
	}
	
	module.exports = {
	    pophide: pophide,
	    popshow: popshow,
	    checkBoox: checkBoox,
	    Sibs: Sibs,
	    radio: radio,
	    chooseAll: chooseAll,
	    setCookie: setCookie,//设置cookie
	    getCookie: getCookie, // 获取cookie
	    ShowLoading: ShowLoading,//加载中
	    InsertLoading: InsertLoading,
	    timeTickBig: timeTickBig//倒计时
	}


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy9zdHVkZW50UG9ydC9zdHVkZW50LXRpbWVzLXBvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL3Rvb2wuanM/NWU2YSoqKioqKioqKioqKioqKioqIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0Esc0I7Ozs7Ozs7Ozs7O0FDQ0Esa0NBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLGtDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsdUJBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBLG1CQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQSx3QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7O0FBRUEsOEJBQTZCO0FBQzdCLDBDQUF5QztBQUN6QyxvQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0MsbUNBQW1DO0FBQ3ZFO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsNkJBQTRCLG9DQUFvQztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzdHVkZW50UG9ydC9zdHVkZW50LXRpbWVzLXBvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwidmFyIHRvb2w9cmVxdWlyZShcIi4uLy4uL0xVSS90b29sLmpzXCIpXHJcbnRvb2wudGltZVRpY2tCaWcoMTApO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL3N0dWRlbnRQb3J0L3N0dWRlbnQtdGltZXMtcG9wLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMzYiLCJcclxuXHJcbmZ1bmN0aW9uIHBvcHNob3coc2VsZSwgcG9wc2hvdykgey8v5by55Ye65bGC55qE5pi+56S6XHJcbiAgIFxyXG4gICAgc2VsZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcG9wc2hvdy5zaG93KCk7XHJcbiAgICAgICAgJCgnLnBvcC1tYXNrJykuc2hvdygpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gcG9waGlkZShzZWxlLCBwb3BzaG93KSB7Ly/lvLnlh7rlsYLnmoTmtojlpLFcclxuICAgIHNlbGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBvcHNob3cuaGlkZSgpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLmhpZGUoKTtcclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gY2hlY2tCb294KCkgey8v5aSN6YCJ5qGG55qE5qC35byPXHJcbiAgICAkKCcuY2hlY2tCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBjaG9vc2VBbGwoKSB7Ly/lhajpgInlhajkuI3pgIlcclxuICAgICQoJy5jaGVja0JveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbnVtID0gJCgnLmNoZWNrQm94JykuaW5kZXgoJCh0aGlzKSk7XHJcbiAgICAgICAgaWYgKG51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgJGltZ3MgPSAkLm1ha2VBcnJheSgkKCcudGFibGUgdHI6bm90KDpmaXJzdCknKS5maW5kKCdpbWcnKSk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRpbWdzLmV2ZXJ5KGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5zdHlsZS52aXNpYmlsaXR5ID09ICd2aXNpYmxlJztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG59XHJcbmZ1bmN0aW9uIFNpYnMoVGhpcykge1xyXG4gICAgVGhpcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByYWRpbygpIHsvL+WNlemAieeahOagt+W8j1xyXG4gICAgJCgnLnJhZGlvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5yYWRpbycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENvb2tpZShvYmpOYW1lLCBvYmpWYWx1ZSwgb2JqSG91cnMpIHtcclxuICAgIHZhciBzdHIgPSBvYmpOYW1lICsgXCI9XCIgKyBlc2NhcGUob2JqVmFsdWUpO1xyXG5cclxuICAgIGlmIChvYmpIb3VycyA+IDApIHsgLy/kuLow5pe25LiN6K6+5a6a6L+H5pyf5pe26Ze077yM5rWP6KeI5Zmo5YWz6Zet5pe2Y29va2ll6Ieq5Yqo5raI5aSxXHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHZhciBtcyA9IG9iakhvdXJzICogMzYwMCAqIDEwMDA7XHJcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgbXMpO1xyXG4gICAgICAgIHN0ciArPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKSArIFwiO3BhdGg9L1wiO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQuY29va2llID0gc3RyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb29raWUob2JqTmFtZSkgeyAvL+iOt+WPluaMh+WumuWQjeensOeahGNvb2tpZeeahOWAvFxyXG4gICAgdmFyIGFyclN0ciA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjsgXCIpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJTdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGFyclN0cltpXS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgaWYgKHRlbXBbMF0gPT0gb2JqTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5lc2NhcGUodGVtcFsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL+W8ueWHuuWKoOi9veWbvueJh1xyXG5mdW5jdGlvbiBTaG93TG9hZGluZyhvYmopIHtcclxuICAgIG9iai5odG1sKGpRdWVyeShcIiNkaXZMb2FkaW5nXCIpLmh0bWwoKSk7XHJcbn1cclxuZnVuY3Rpb24gdGltZVRpY2tCaWcoc2Vjb25kKSB7XHJcbiAgICAkKFwiLnRpbWVzLWJpZ1wiKS5odG1sKHNlY29uZCk7XHJcbiAgICB2YXIgdCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLnRpbWVzLWJpZ1wiKS5odG1sKC0tc2Vjb25kKTtcclxuICAgICAgICBpZiAoc2Vjb25kIDw9IDApIHtcclxuICAgICAgICAgICAgJChcIi5yb3RhdGUtcG9pbnRcIikuY3NzKHsgXCJhbmltYXRpb24tcGxheS1zdGF0ZVwiOiBcInBhdXNlZFwiIH0pO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDEwMDApO1xyXG4gICAgJChcIi5yb3RhdGUtcG9pbnRcIikuY3NzKHsgXCJhbmltYXRpb24tcGxheS1zdGF0ZVwiOiBcInJ1bm5pbmdcIiB9KTtcclxufVxyXG5cclxuLy/liqDovb3lm77niYfliLDmn5DkuKrlhYPntKDkuK1cclxuZnVuY3Rpb24gSW5zZXJ0TG9hZGluZyhvYmopIHtcclxuICAgIG9iai5hcHBlbmQoalF1ZXJ5KFwiI2RpdkxvYWRpbmdcIikuaHRtbCgpKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwb3BoaWRlOiBwb3BoaWRlLFxyXG4gICAgcG9wc2hvdzogcG9wc2hvdyxcclxuICAgIGNoZWNrQm9veDogY2hlY2tCb294LFxyXG4gICAgU2liczogU2licyxcclxuICAgIHJhZGlvOiByYWRpbyxcclxuICAgIGNob29zZUFsbDogY2hvb3NlQWxsLFxyXG4gICAgc2V0Q29va2llOiBzZXRDb29raWUsLy/orr7nva5jb29raWVcclxuICAgIGdldENvb2tpZTogZ2V0Q29va2llLCAvLyDojrflj5Zjb29raWVcclxuICAgIFNob3dMb2FkaW5nOiBTaG93TG9hZGluZywvL+WKoOi9veS4rVxyXG4gICAgSW5zZXJ0TG9hZGluZzogSW5zZXJ0TG9hZGluZyxcclxuICAgIHRpbWVUaWNrQmlnOiB0aW1lVGlja0JpZy8v5YCS6K6h5pe2XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL3Rvb2wuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEyIDEzIDE4IDE5IDIwIDIxIDI3IDI4IDM2Il0sInNvdXJjZVJvb3QiOiIifQ==