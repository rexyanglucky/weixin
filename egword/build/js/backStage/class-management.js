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

	var tool=__webpack_require__(4);
	////教材管理子课程部分的点击效果
	tool.Sibs($('.first-part .left'));
	
	


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYmFja1N0YWdlL2NsYXNzLW1hbmFnZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS90b29sLmpzPzVlNmEqKioiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ0FBLGtDQUFpQzs7QUFFakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxrQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsdUJBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLHVCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQSxtQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7O0FBRUEsd0JBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQixvQ0FBb0M7QUFDckQ7QUFDQTtBQUNBOztBQUVBLDhCQUE2QjtBQUM3QiwwQ0FBeUM7QUFDekMsb0JBQW1CLG1CQUFtQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQW9DLG1DQUFtQztBQUN2RTtBQUNBO0FBQ0EsTUFBSztBQUNMLDZCQUE0QixvQ0FBb0M7QUFDaEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmFja1N0YWdlL2NsYXNzLW1hbmFnZW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTA2MTQ4ZDA1Nzk0MDgwMGZmNSIsInZhciB0b29sPXJlcXVpcmUoJy4uLy4uL0xVSS90b29sJyk7XHJcbi8vLy/mlZnmnZDnrqHnkIblrZDor77nqIvpg6jliIbnmoTngrnlh7vmlYjmnpxcclxudG9vbC5TaWJzKCQoJy5maXJzdC1wYXJ0IC5sZWZ0JykpO1xyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2JhY2tTdGFnZS9jbGFzcy1tYW5hZ2VtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMyIsIlxyXG5cclxuZnVuY3Rpb24gcG9wc2hvdyhzZWxlLCBwb3BzaG93KSB7Ly/lvLnlh7rlsYLnmoTmmL7npLpcclxuICAgXHJcbiAgICBzZWxlLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwb3BzaG93LnNob3coKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5zaG93KCk7XHJcbiAgICAgICAgJCgnLnBvcC1tYXNrJykuc2hvdygpO1xyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBwb3BoaWRlKHNlbGUsIHBvcHNob3cpIHsvL+W8ueWHuuWxgueahOa2iOWksVxyXG4gICAgc2VsZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcG9wc2hvdy5oaWRlKCk7XHJcbiAgICAgICAgJCgnLnBvcC1tYXNrJykuaGlkZSgpO1xyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBjaGVja0Jvb3goKSB7Ly/lpI3pgInmoYbnmoTmoLflvI9cclxuICAgICQoJy5jaGVja0JveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknKSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGNob29zZUFsbCgpIHsvL+WFqOmAieWFqOS4jemAiVxyXG4gICAgJCgnLmNoZWNrQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBudW0gPSAkKCcuY2hlY2tCb3gnKS5pbmRleCgkKHRoaXMpKTtcclxuICAgICAgICBpZiAobnVtID09IDApIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknKSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciAkaW1ncyA9ICQubWFrZUFycmF5KCQoJy50YWJsZSB0cjpub3QoOmZpcnN0KScpLmZpbmQoJ2ltZycpKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJGltZ3MuZXZlcnkoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnN0eWxlLnZpc2liaWxpdHkgPT0gJ3Zpc2libGUnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbn1cclxuZnVuY3Rpb24gU2licyhUaGlzKSB7XHJcbiAgICBUaGlzLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhZGlvKCkgey8v5Y2V6YCJ55qE5qC35byPXHJcbiAgICAkKCcucmFkaW8nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnJhZGlvJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q29va2llKG9iak5hbWUsIG9ialZhbHVlLCBvYmpIb3Vycykge1xyXG4gICAgdmFyIHN0ciA9IG9iak5hbWUgKyBcIj1cIiArIGVzY2FwZShvYmpWYWx1ZSk7XHJcblxyXG4gICAgaWYgKG9iakhvdXJzID4gMCkgeyAvL+S4ujDml7bkuI3orr7lrprov4fmnJ/ml7bpl7TvvIzmtY/op4jlmajlhbPpl63ml7Zjb29raWXoh6rliqjmtojlpLFcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdmFyIG1zID0gb2JqSG91cnMgKiAzNjAwICogMTAwMDtcclxuICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBtcyk7XHJcbiAgICAgICAgc3RyICs9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpICsgXCI7cGF0aD0vXCI7XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5jb29raWUgPSBzdHI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvb2tpZShvYmpOYW1lKSB7IC8v6I635Y+W5oyH5a6a5ZCN56ew55qEY29va2ll55qE5YC8XHJcbiAgICB2YXIgYXJyU3RyID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiOyBcIik7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyclN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0ZW1wID0gYXJyU3RyW2ldLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICBpZiAodGVtcFswXSA9PSBvYmpOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmVzY2FwZSh0ZW1wWzFdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5by55Ye65Yqg6L295Zu+54mHXHJcbmZ1bmN0aW9uIFNob3dMb2FkaW5nKG9iaikge1xyXG4gICAgb2JqLmh0bWwoalF1ZXJ5KFwiI2RpdkxvYWRpbmdcIikuaHRtbCgpKTtcclxufVxyXG5mdW5jdGlvbiB0aW1lVGlja0JpZyhzZWNvbmQpIHtcclxuICAgICQoXCIudGltZXMtYmlnXCIpLmh0bWwoc2Vjb25kKTtcclxuICAgIHZhciB0ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIudGltZXMtYmlnXCIpLmh0bWwoLS1zZWNvbmQpO1xyXG4gICAgICAgIGlmIChzZWNvbmQgPD0gMCkge1xyXG4gICAgICAgICAgICAkKFwiLnJvdGF0ZS1wb2ludFwiKS5jc3MoeyBcImFuaW1hdGlvbi1wbGF5LXN0YXRlXCI6IFwicGF1c2VkXCIgfSk7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTAwMCk7XHJcbiAgICAkKFwiLnJvdGF0ZS1wb2ludFwiKS5jc3MoeyBcImFuaW1hdGlvbi1wbGF5LXN0YXRlXCI6IFwicnVubmluZ1wiIH0pO1xyXG59XHJcblxyXG4vL+WKoOi9veWbvueJh+WIsOafkOS4quWFg+e0oOS4rVxyXG5mdW5jdGlvbiBJbnNlcnRMb2FkaW5nKG9iaikge1xyXG4gICAgb2JqLmFwcGVuZChqUXVlcnkoXCIjZGl2TG9hZGluZ1wiKS5odG1sKCkpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHBvcGhpZGU6IHBvcGhpZGUsXHJcbiAgICBwb3BzaG93OiBwb3BzaG93LFxyXG4gICAgY2hlY2tCb294OiBjaGVja0Jvb3gsXHJcbiAgICBTaWJzOiBTaWJzLFxyXG4gICAgcmFkaW86IHJhZGlvLFxyXG4gICAgY2hvb3NlQWxsOiBjaG9vc2VBbGwsXHJcbiAgICBzZXRDb29raWU6IHNldENvb2tpZSwvL+iuvue9rmNvb2tpZVxyXG4gICAgZ2V0Q29va2llOiBnZXRDb29raWUsIC8vIOiOt+WPlmNvb2tpZVxyXG4gICAgU2hvd0xvYWRpbmc6IFNob3dMb2FkaW5nLC8v5Yqg6L295LitXHJcbiAgICBJbnNlcnRMb2FkaW5nOiBJbnNlcnRMb2FkaW5nLFxyXG4gICAgdGltZVRpY2tCaWc6IHRpbWVUaWNrQmlnLy/lgJLorqHml7ZcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvdG9vbC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTIgMTMgMTggMTkgMjAgMjEgMjcgMjggMzYiXSwic291cmNlUm9vdCI6IiJ9