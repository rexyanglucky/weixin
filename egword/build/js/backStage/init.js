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

	var tool = __webpack_require__(4);
	
	tool.popshow($("#btnlogin"), $('#popLogin'));
	tool.pophide($('#popLogin .close'), $('#popLogin'));
	
	$("#btnlogin").click(function () {
	    $("#usercode").val(tool.getCookie("word-code"));
	    $("#userpwd").val("");
	    $("#errorInfo").parent().hide();
	    if (tool.getCookie("word-isauto") && tool.getCookie("word-isauto") != "0") {
	        $("#autoCheck").css("visibility", "visible");
	        $("#userpwd").val(tool.getCookie("word-token"));
	    }
	    else {
	        $("#autoCheck").css("visibility", "hidden");        
	    }
	});
	
	
	$("span[data-auto]").click(function () {
	    if ($("#autoCheck").css("visibility") == "hidden") {
	        $("#autoCheck").css("visibility", "visible");
	        setIsAuto(1);
	    }
	    else {
	        $("#autoCheck").css("visibility", "hidden");
	        setIsAuto(0);
	    }
	});
	
	$("#usercode").keypress(function () {
	    var keynum = event.keyCode;
	    if (!(keynum >= 48 && keynum <= 57))
	        return false;
	    if ($("#usercode").val().length > 10) {
	        $("#errorInfo").text("账号或密码错误！");
	        $("#errorInfo").parent().show();
	    }
	    else {
	        $("#errorInfo").parent().hide();
	    }
	});
	
	//不能有空格
	$("#userpwd").keypress(function () {
	    var keynum = event.keyCode;
	    if (keynum == 32)
	        return false;
	    $("#errorInfo").parent().hide();
	});
	
	//不能有空格
	$("#reg-code").keypress(function () {
	    var keynum = event.keyCode;
	    if (keynum == 32)
	        return false;
	});
	
	$("#usercode").keydown(function () {
	    if ($("#usercode").val().length > 12) {
	        $("#errorInfo").text("账号或密码错误！");
	        $("#errorInfo").parent().show();
	    }
	    else {
	        $("#errorInfo").parent().hide();
	    }
	});
	
	$("#userpwd,#reg-code").keydown(function () {
	    if (event.keyCode == 13 || event.keyCode == 9) {
	        $("#ok").click();
	    }
	});
	
	$("#imgAuthCode").click(function () {
	    setVC();
	});
	
	$("#reg-code").keyup(function () {
	
	    var codeValue = $("#reg-code").val();
	    if (codeValue.length == 4) {
	        $.ajax({
	            type: "post",
	            url: "/Home/GetCode",
	            dataType: "json",
	            data: { Code: codeValue },
	            error: function (e) {
	
	            },
	            success: function (e) {
	                if (e && e.OK) {
	                    $("#errorInfo").parent().hide();
	                }
	                else {
	                    $("#errorInfo").text(e.Result);
	                    $("#errorInfo").parent().show();
	                }
	            }
	        });
	    }
	    else {
	        if (codeValue == "")
	            $("#errorInfo").text("验证码不能为空！");
	        else
	            $("#errorInfo").text("验证码有误！");
	        $("#errorInfo").parent().show();
	    }
	});
	
	
	$("#ok").click(function () {
	    login();
	});
	
	function login() {
	    if ($.trim($("#usercode").val()) == "" || $.trim($("#userpwd").val()) == "") {
	        $("#errorInfo").text("用户名或密码不能为空！");
	        $("#errorInfo").parent().show();
	        return;
	    }
	
	    if (!$("#org-validate").is(":hidden") && ($.trim($("#reg-code").val()) == "")) {
	        $("#errorInfo").text("验证码不能为空！");
	        $("#errorInfo").parent().show();
	        return;
	    }
	
	    var orgCode = $("#usercode").val();
	
	    $.ajax({
	        type: "post",
	        url: "/Home/Login",
	        data: {
	            UserCode: orgCode,
	            UserPWD: $("#userpwd").val(),
	            Code: $("#reg-code").val()
	        },
	        dataType: "json",
	        error: function (e) {
	            $("#errorInfo").text("登录异常！");
	            $("#errorInfo").parent().show();
	        },
	        success: function (e) {
	            if (e.OK) {
	                setCode(orgCode);
	                location.href = e.TagValue;
	            }
	            else {
	                if (e.Code == "2") {
	                    setVC();
	                    $("#org-validate").show();
	                }
	                $("#errorInfo").text(e.Result);
	                $("#errorInfo").parent().show();
	            }
	        }
	    });
	}
	
	//设置自动登录属性
	function setIsAuto(e) {
	    tool.setCookie("word-isauto", e, 24 * 1000);
	}
	
	//设置账号
	function setCode(e) {
	    tool.setCookie("word-code", e, 24 * 1000);
	}
	
	//获取验证码
	function setVC() {
	    $("#imgAuthCode").attr("src", "/Home/VCode?UserCode=0" + "&t=" + Math.random());
	}
	


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYmFja1N0YWdlL2luaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS90b29sLmpzPzVlNmEqKioqKioqKioqKiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEO0FBQ0E7QUFDQSxFQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixrQkFBa0I7QUFDckM7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7O0FBR0Q7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzNLQSxrQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0Esa0NBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLHVCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakIsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUEsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsb0NBQW9DO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQSw4QkFBNkI7QUFDN0IsMENBQXlDO0FBQ3pDLG9CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQyxtQ0FBbUM7QUFDdkU7QUFDQTtBQUNBLE1BQUs7QUFDTCw2QkFBNEIsb0NBQW9DO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJhY2tTdGFnZS9pbml0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjUiLCJ2YXIgdG9vbCA9IHJlcXVpcmUoJy4uLy4uL0xVSS90b29sJyk7XHJcblxyXG50b29sLnBvcHNob3coJChcIiNidG5sb2dpblwiKSwgJCgnI3BvcExvZ2luJykpO1xyXG50b29sLnBvcGhpZGUoJCgnI3BvcExvZ2luIC5jbG9zZScpLCAkKCcjcG9wTG9naW4nKSk7XHJcblxyXG4kKFwiI2J0bmxvZ2luXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIjdXNlcmNvZGVcIikudmFsKHRvb2wuZ2V0Q29va2llKFwid29yZC1jb2RlXCIpKTtcclxuICAgICQoXCIjdXNlcnB3ZFwiKS52YWwoXCJcIik7XHJcbiAgICAkKFwiI2Vycm9ySW5mb1wiKS5wYXJlbnQoKS5oaWRlKCk7XHJcbiAgICBpZiAodG9vbC5nZXRDb29raWUoXCJ3b3JkLWlzYXV0b1wiKSAmJiB0b29sLmdldENvb2tpZShcIndvcmQtaXNhdXRvXCIpICE9IFwiMFwiKSB7XHJcbiAgICAgICAgJChcIiNhdXRvQ2hlY2tcIikuY3NzKFwidmlzaWJpbGl0eVwiLCBcInZpc2libGVcIik7XHJcbiAgICAgICAgJChcIiN1c2VycHdkXCIpLnZhbCh0b29sLmdldENvb2tpZShcIndvcmQtdG9rZW5cIikpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJChcIiNhdXRvQ2hlY2tcIikuY3NzKFwidmlzaWJpbGl0eVwiLCBcImhpZGRlblwiKTsgICAgICAgIFxyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG4kKFwic3BhbltkYXRhLWF1dG9dXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgkKFwiI2F1dG9DaGVja1wiKS5jc3MoXCJ2aXNpYmlsaXR5XCIpID09IFwiaGlkZGVuXCIpIHtcclxuICAgICAgICAkKFwiI2F1dG9DaGVja1wiKS5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwidmlzaWJsZVwiKTtcclxuICAgICAgICBzZXRJc0F1dG8oMSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKFwiI2F1dG9DaGVja1wiKS5jc3MoXCJ2aXNpYmlsaXR5XCIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIHNldElzQXV0bygwKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4kKFwiI3VzZXJjb2RlXCIpLmtleXByZXNzKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBrZXludW0gPSBldmVudC5rZXlDb2RlO1xyXG4gICAgaWYgKCEoa2V5bnVtID49IDQ4ICYmIGtleW51bSA8PSA1NykpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKCQoXCIjdXNlcmNvZGVcIikudmFsKCkubGVuZ3RoID4gMTApIHtcclxuICAgICAgICAkKFwiI2Vycm9ySW5mb1wiKS50ZXh0KFwi6LSm5Y+35oiW5a+G56CB6ZSZ6K+v77yBXCIpO1xyXG4gICAgICAgICQoXCIjZXJyb3JJbmZvXCIpLnBhcmVudCgpLnNob3coKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgICQoXCIjZXJyb3JJbmZvXCIpLnBhcmVudCgpLmhpZGUoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+S4jeiDveacieepuuagvFxyXG4kKFwiI3VzZXJwd2RcIikua2V5cHJlc3MoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGtleW51bSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICBpZiAoa2V5bnVtID09IDMyKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICQoXCIjZXJyb3JJbmZvXCIpLnBhcmVudCgpLmhpZGUoKTtcclxufSk7XHJcblxyXG4vL+S4jeiDveacieepuuagvFxyXG4kKFwiI3JlZy1jb2RlXCIpLmtleXByZXNzKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBrZXludW0gPSBldmVudC5rZXlDb2RlO1xyXG4gICAgaWYgKGtleW51bSA9PSAzMilcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbn0pO1xyXG5cclxuJChcIiN1c2VyY29kZVwiKS5rZXlkb3duKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgkKFwiI3VzZXJjb2RlXCIpLnZhbCgpLmxlbmd0aCA+IDEyKSB7XHJcbiAgICAgICAgJChcIiNlcnJvckluZm9cIikudGV4dChcIui0puWPt+aIluWvhueggemUmeivr++8gVwiKTtcclxuICAgICAgICAkKFwiI2Vycm9ySW5mb1wiKS5wYXJlbnQoKS5zaG93KCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkKFwiI2Vycm9ySW5mb1wiKS5wYXJlbnQoKS5oaWRlKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuJChcIiN1c2VycHdkLCNyZWctY29kZVwiKS5rZXlkb3duKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmIChldmVudC5rZXlDb2RlID09IDEzIHx8IGV2ZW50LmtleUNvZGUgPT0gOSkge1xyXG4gICAgICAgICQoXCIjb2tcIikuY2xpY2soKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4kKFwiI2ltZ0F1dGhDb2RlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIHNldFZDKCk7XHJcbn0pO1xyXG5cclxuJChcIiNyZWctY29kZVwiKS5rZXl1cChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgdmFyIGNvZGVWYWx1ZSA9ICQoXCIjcmVnLWNvZGVcIikudmFsKCk7XHJcbiAgICBpZiAoY29kZVZhbHVlLmxlbmd0aCA9PSA0KSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvSG9tZS9HZXRDb2RlXCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgZGF0YTogeyBDb2RlOiBjb2RlVmFsdWUgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUgJiYgZS5PSykge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZXJyb3JJbmZvXCIpLnBhcmVudCgpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZXJyb3JJbmZvXCIpLnRleHQoZS5SZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZXJyb3JJbmZvXCIpLnBhcmVudCgpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgaWYgKGNvZGVWYWx1ZSA9PSBcIlwiKVxyXG4gICAgICAgICAgICAkKFwiI2Vycm9ySW5mb1wiKS50ZXh0KFwi6aqM6K+B56CB5LiN6IO95Li656m677yBXCIpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICAgJChcIiNlcnJvckluZm9cIikudGV4dChcIumqjOivgeeggeacieivr++8gVwiKTtcclxuICAgICAgICAkKFwiI2Vycm9ySW5mb1wiKS5wYXJlbnQoKS5zaG93KCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbiQoXCIjb2tcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgbG9naW4oKTtcclxufSk7XHJcblxyXG5mdW5jdGlvbiBsb2dpbigpIHtcclxuICAgIGlmICgkLnRyaW0oJChcIiN1c2VyY29kZVwiKS52YWwoKSkgPT0gXCJcIiB8fCAkLnRyaW0oJChcIiN1c2VycHdkXCIpLnZhbCgpKSA9PSBcIlwiKSB7XHJcbiAgICAgICAgJChcIiNlcnJvckluZm9cIikudGV4dChcIueUqOaIt+WQjeaIluWvhueggeS4jeiDveS4uuepuu+8gVwiKTtcclxuICAgICAgICAkKFwiI2Vycm9ySW5mb1wiKS5wYXJlbnQoKS5zaG93KCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghJChcIiNvcmctdmFsaWRhdGVcIikuaXMoXCI6aGlkZGVuXCIpICYmICgkLnRyaW0oJChcIiNyZWctY29kZVwiKS52YWwoKSkgPT0gXCJcIikpIHtcclxuICAgICAgICAkKFwiI2Vycm9ySW5mb1wiKS50ZXh0KFwi6aqM6K+B56CB5LiN6IO95Li656m677yBXCIpO1xyXG4gICAgICAgICQoXCIjZXJyb3JJbmZvXCIpLnBhcmVudCgpLnNob3coKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIG9yZ0NvZGUgPSAkKFwiI3VzZXJjb2RlXCIpLnZhbCgpO1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9Ib21lL0xvZ2luXCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBVc2VyQ29kZTogb3JnQ29kZSxcclxuICAgICAgICAgICAgVXNlclBXRDogJChcIiN1c2VycHdkXCIpLnZhbCgpLFxyXG4gICAgICAgICAgICBDb2RlOiAkKFwiI3JlZy1jb2RlXCIpLnZhbCgpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICQoXCIjZXJyb3JJbmZvXCIpLnRleHQoXCLnmbvlvZXlvILluLjvvIFcIik7XHJcbiAgICAgICAgICAgICQoXCIjZXJyb3JJbmZvXCIpLnBhcmVudCgpLnNob3coKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLk9LKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRDb2RlKG9yZ0NvZGUpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IGUuVGFnVmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5Db2RlID09IFwiMlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VkMoKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI29yZy12YWxpZGF0ZVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKFwiI2Vycm9ySW5mb1wiKS50ZXh0KGUuUmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICQoXCIjZXJyb3JJbmZvXCIpLnBhcmVudCgpLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vL+iuvue9ruiHquWKqOeZu+W9leWxnuaAp1xyXG5mdW5jdGlvbiBzZXRJc0F1dG8oZSkge1xyXG4gICAgdG9vbC5zZXRDb29raWUoXCJ3b3JkLWlzYXV0b1wiLCBlLCAyNCAqIDEwMDApO1xyXG59XHJcblxyXG4vL+iuvue9rui0puWPt1xyXG5mdW5jdGlvbiBzZXRDb2RlKGUpIHtcclxuICAgIHRvb2wuc2V0Q29va2llKFwid29yZC1jb2RlXCIsIGUsIDI0ICogMTAwMCk7XHJcbn1cclxuXHJcbi8v6I635Y+W6aqM6K+B56CBXHJcbmZ1bmN0aW9uIHNldFZDKCkge1xyXG4gICAgJChcIiNpbWdBdXRoQ29kZVwiKS5hdHRyKFwic3JjXCIsIFwiL0hvbWUvVkNvZGU/VXNlckNvZGU9MFwiICsgXCImdD1cIiArIE1hdGgucmFuZG9tKCkpO1xyXG59XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9iYWNrU3RhZ2UvaW5pdC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDE4IiwiXHJcblxyXG5mdW5jdGlvbiBwb3BzaG93KHNlbGUsIHBvcHNob3cpIHsvL+W8ueWHuuWxgueahOaYvuekulxyXG4gICBcclxuICAgIHNlbGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBvcHNob3cuc2hvdygpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5zaG93KCk7XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIHBvcGhpZGUoc2VsZSwgcG9wc2hvdykgey8v5by55Ye65bGC55qE5raI5aSxXHJcbiAgICBzZWxlLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwb3BzaG93LmhpZGUoKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5oaWRlKCk7XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGNoZWNrQm9veCgpIHsvL+WkjemAieahhueahOagt+W8j1xyXG4gICAgJCgnLmNoZWNrQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gY2hvb3NlQWxsKCkgey8v5YWo6YCJ5YWo5LiN6YCJXHJcbiAgICAkKCcuY2hlY2tCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG51bSA9ICQoJy5jaGVja0JveCcpLmluZGV4KCQodGhpcykpO1xyXG4gICAgICAgIGlmIChudW0gPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknKSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyICRpbWdzID0gJC5tYWtlQXJyYXkoJCgnLnRhYmxlIHRyOm5vdCg6Zmlyc3QpJykuZmluZCgnaW1nJykpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkaW1ncy5ldmVyeShmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc3R5bGUudmlzaWJpbGl0eSA9PSAndmlzaWJsZSc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxufVxyXG5mdW5jdGlvbiBTaWJzKFRoaXMpIHtcclxuICAgIFRoaXMub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcmFkaW8oKSB7Ly/ljZXpgInnmoTmoLflvI9cclxuICAgICQoJy5yYWRpbycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcucmFkaW8nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDb29raWUob2JqTmFtZSwgb2JqVmFsdWUsIG9iakhvdXJzKSB7XHJcbiAgICB2YXIgc3RyID0gb2JqTmFtZSArIFwiPVwiICsgZXNjYXBlKG9ialZhbHVlKTtcclxuXHJcbiAgICBpZiAob2JqSG91cnMgPiAwKSB7IC8v5Li6MOaXtuS4jeiuvuWumui/h+acn+aXtumXtO+8jOa1j+iniOWZqOWFs+mXreaXtmNvb2tpZeiHquWKqOa2iOWksVxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB2YXIgbXMgPSBvYmpIb3VycyAqIDM2MDAgKiAxMDAwO1xyXG4gICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIG1zKTtcclxuICAgICAgICBzdHIgKz0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCkgKyBcIjtwYXRoPS9cIjtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IHN0cjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29va2llKG9iak5hbWUpIHsgLy/ojrflj5bmjIflrprlkI3np7DnmoRjb29raWXnmoTlgLxcclxuICAgIHZhciBhcnJTdHIgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7IFwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyU3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBhcnJTdHJbaV0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgIGlmICh0ZW1wWzBdID09IG9iak5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZXNjYXBlKHRlbXBbMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy/lvLnlh7rliqDovb3lm77niYdcclxuZnVuY3Rpb24gU2hvd0xvYWRpbmcob2JqKSB7XHJcbiAgICBvYmouaHRtbChqUXVlcnkoXCIjZGl2TG9hZGluZ1wiKS5odG1sKCkpO1xyXG59XHJcbmZ1bmN0aW9uIHRpbWVUaWNrQmlnKHNlY29uZCkge1xyXG4gICAgJChcIi50aW1lcy1iaWdcIikuaHRtbChzZWNvbmQpO1xyXG4gICAgdmFyIHQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi50aW1lcy1iaWdcIikuaHRtbCgtLXNlY29uZCk7XHJcbiAgICAgICAgaWYgKHNlY29uZCA8PSAwKSB7XHJcbiAgICAgICAgICAgICQoXCIucm90YXRlLXBvaW50XCIpLmNzcyh7IFwiYW5pbWF0aW9uLXBsYXktc3RhdGVcIjogXCJwYXVzZWRcIiB9KTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LCAxMDAwKTtcclxuICAgICQoXCIucm90YXRlLXBvaW50XCIpLmNzcyh7IFwiYW5pbWF0aW9uLXBsYXktc3RhdGVcIjogXCJydW5uaW5nXCIgfSk7XHJcbn1cclxuXHJcbi8v5Yqg6L295Zu+54mH5Yiw5p+Q5Liq5YWD57Sg5LitXHJcbmZ1bmN0aW9uIEluc2VydExvYWRpbmcob2JqKSB7XHJcbiAgICBvYmouYXBwZW5kKGpRdWVyeShcIiNkaXZMb2FkaW5nXCIpLmh0bWwoKSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcG9waGlkZTogcG9waGlkZSxcclxuICAgIHBvcHNob3c6IHBvcHNob3csXHJcbiAgICBjaGVja0Jvb3g6IGNoZWNrQm9veCxcclxuICAgIFNpYnM6IFNpYnMsXHJcbiAgICByYWRpbzogcmFkaW8sXHJcbiAgICBjaG9vc2VBbGw6IGNob29zZUFsbCxcclxuICAgIHNldENvb2tpZTogc2V0Q29va2llLC8v6K6+572uY29va2llXHJcbiAgICBnZXRDb29raWU6IGdldENvb2tpZSwgLy8g6I635Y+WY29va2llXHJcbiAgICBTaG93TG9hZGluZzogU2hvd0xvYWRpbmcsLy/liqDovb3kuK1cclxuICAgIEluc2VydExvYWRpbmc6IEluc2VydExvYWRpbmcsXHJcbiAgICB0aW1lVGlja0JpZzogdGltZVRpY2tCaWcvL+WAkuiuoeaXtlxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS90b29sLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMiAxMyAxOCAxOSAyMCAyMSAyNyAyOCAzNiJdLCJzb3VyY2VSb290IjoiIn0=