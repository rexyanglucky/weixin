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
/***/ function(module, exports) {

	
	
	$(function () {
	
	    $("#btn-submit").click(function () {
	        var pwdold = $("#b-pwdold").val().trim();
	        var pwdnew1 = $("#b-pwdnew1").val().trim();
	        var pwdnew2 = $("#b-pwdnew2").val().trim();
	        var showtip = "";
	          $("#showtip").html(showtip);
	        if (!isPasswd(pwdold)) {
	            showtip = "请输入正确格式的原密码!";
	            $("#showtip").html(showtip);
	            return;
	        }
	        if (!isPasswd(pwdnew1) || !isPasswd(pwdnew2)) {
	            showtip = "请输入正确格式的新密码!";
	            $("#showtip").html(showtip);
	            return;
	        }
	        if (pwdnew1 != pwdnew2) {
	            showtip = "两次输入的新密码不一致!";
	            $("#showtip").html(showtip);
	            return;
	        }
	
	
	        $.ajax({
	            type: "post",
	            url: "/teacher/myinfo/SetPassword",
	            cache: false,
	            data: { pwdold: pwdold, pwdnew1: pwdnew1, pwdnew2: pwdnew2 },
	            dataType: "JSON",
	            success: function (data) {
	
	                data = JSON.parse(data);
	
	                if (data.result == 0) {
	                    showtip = "原密码不正确,请重新输入!";
	                      $("#showtip").html(showtip);
	                    $("#b-pwdold").val("");
	                    return;
	                } else {
	                    showtip = "修改成功!";
	                }
	
	            }
	        });
	
	    });
	
	    //校验密码：只能输入6-20个字母、数字、下划线
	    function isPasswd(s) {
	        var patrn = /^(\w){6,20}$/;
	        if (!patrn.exec(s)) {
	            return false;
	        }
	        return true;
	    }
	});
	
	
	
	
	
	
	
	
	


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy90ZWFjaGVyUG9ydC9wZXJzb24tY2VudGVyLWVkaXRQYXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3BDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLHFEQUFxRDtBQUN4RTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBLFVBQVM7O0FBRVQsTUFBSzs7QUFFTDtBQUNBO0FBQ0EsNEJBQTJCLEtBQUs7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMiLCJmaWxlIjoidGVhY2hlclBvcnQvcGVyc29uLWNlbnRlci1lZGl0UGFzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjUiLCJcclxuXHJcbiQoZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQoXCIjYnRuLXN1Ym1pdFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHB3ZG9sZCA9ICQoXCIjYi1wd2RvbGRcIikudmFsKCkudHJpbSgpO1xyXG4gICAgICAgIHZhciBwd2RuZXcxID0gJChcIiNiLXB3ZG5ldzFcIikudmFsKCkudHJpbSgpO1xyXG4gICAgICAgIHZhciBwd2RuZXcyID0gJChcIiNiLXB3ZG5ldzJcIikudmFsKCkudHJpbSgpO1xyXG4gICAgICAgIHZhciBzaG93dGlwID0gXCJcIjtcclxuICAgICAgICAgICQoXCIjc2hvd3RpcFwiKS5odG1sKHNob3d0aXApO1xyXG4gICAgICAgIGlmICghaXNQYXNzd2QocHdkb2xkKSkge1xyXG4gICAgICAgICAgICBzaG93dGlwID0gXCLor7fovpPlhaXmraPnoa7moLzlvI/nmoTljp/lr4bnoIEhXCI7XHJcbiAgICAgICAgICAgICQoXCIjc2hvd3RpcFwiKS5odG1sKHNob3d0aXApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNQYXNzd2QocHdkbmV3MSkgfHwgIWlzUGFzc3dkKHB3ZG5ldzIpKSB7XHJcbiAgICAgICAgICAgIHNob3d0aXAgPSBcIuivt+i+k+WFpeato+ehruagvOW8j+eahOaWsOWvhueggSFcIjtcclxuICAgICAgICAgICAgJChcIiNzaG93dGlwXCIpLmh0bWwoc2hvd3RpcCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHB3ZG5ldzEgIT0gcHdkbmV3Mikge1xyXG4gICAgICAgICAgICBzaG93dGlwID0gXCLkuKTmrKHovpPlhaXnmoTmlrDlr4bnoIHkuI3kuIDoh7QhXCI7XHJcbiAgICAgICAgICAgICQoXCIjc2hvd3RpcFwiKS5odG1sKHNob3d0aXApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvdGVhY2hlci9teWluZm8vU2V0UGFzc3dvcmRcIixcclxuICAgICAgICAgICAgY2FjaGU6IGZhbHNlLFxyXG4gICAgICAgICAgICBkYXRhOiB7IHB3ZG9sZDogcHdkb2xkLCBwd2RuZXcxOiBwd2RuZXcxLCBwd2RuZXcyOiBwd2RuZXcyIH0sXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcIkpTT05cIixcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5yZXN1bHQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3d0aXAgPSBcIuWOn+WvhueggeS4jeato+ehrizor7fph43mlrDovpPlhaUhXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAkKFwiI3Nob3d0aXBcIikuaHRtbChzaG93dGlwKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2ItcHdkb2xkXCIpLnZhbChcIlwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3d0aXAgPSBcIuS/ruaUueaIkOWKnyFcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvL+agoemqjOWvhuegge+8muWPquiDvei+k+WFpTYtMjDkuKrlrZfmr43jgIHmlbDlrZfjgIHkuIvliJLnur9cclxuICAgIGZ1bmN0aW9uIGlzUGFzc3dkKHMpIHtcclxuICAgICAgICB2YXIgcGF0cm4gPSAvXihcXHcpezYsMjB9JC87XHJcbiAgICAgICAgaWYgKCFwYXRybi5leGVjKHMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy90ZWFjaGVyUG9ydC9wZXJzb24tY2VudGVyLWVkaXRQYXMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSA0OCJdLCJzb3VyY2VSb290IjoiIn0=