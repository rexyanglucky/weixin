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

	var tool = __webpack_require__(6);

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

/***/ 6:
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
	function timeTickBig(second,callback) {
	    $(".times-big").html(second+"S");
	    var t = setInterval(function () {
	        $(".times-big").html(--second+"S");
	        if (second <= 0) {
	            $(".rotate-point").css({ "animation-play-state": "paused" });
	            clearInterval(t);
	            if(callback){
	                callback();
	            }
	        }
	    }, 1000);
	    $(".rotate-point").css({ "animation-play-state": "running" });
	}
	function timeTickSmall(second,callback) {
	    var ts=second;
	    $(".rotate-small").show();
	    $(".times-small").html(second+"S");
	    var interval={
	        clock:{},
	        tickTime:0,
	        remainTickTime:0
	    };
	    var t = setInterval(function () {
	        $(".times-small").html(--second+"S");
	        interval.clock=t;
	        interval.remainTickTime=second;
	        interval.tickTime=ts-second;
	        if (second <= 0) {
	            $(".rotate-point").css({ "animation-play-state": "paused" });
	            clearInterval(t);
	            if(callback){
	                callback();
	            }
	        }

	    }, 1000);

	    $(".rotate-point").css({ "animation-play-state": "running" });
	    return interval;
	}
	function progessBar(p,cur,total){
	    if(!p){return;}
	    cur=cur||0;
	    total=total||10;
	    w=$(p).find(".progress-bar").width()*(cur/total);
	    $(p).find(".child-progress").css({"width":w+"px"});
	    $(p).find(".cur-num").html(cur);
	    $(p).find(".total-num").html(total);
	}

	//加载图片到某个元素中
	function InsertLoading(obj) {
	    obj.append(jQuery("#divLoading").html());
	}

	function CheckBrowser() {
	    //平台、设备和操作系统
	    var system = {
	        win: false,
	        mac: false,
	        xll: false,
	        ipad: false
	    };
	    //检测平台
	    var p = navigator.platform;
	    system.win = p.indexOf("Win") == 0;
	    system.mac = p.indexOf("Mac") == 0;
	    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	    system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
	    if (system.win || system.mac || system.xll) {
	        return false;
	    } else {
	        return true;

	    }
	};
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
	    timeTickBig: timeTickBig,//倒计时
	    timeTickSmall: timeTickSmall,//倒计时
	    progessBar:progessBar,
	    checkBrowser:CheckBrowser
	}


/***/ }

/******/ });