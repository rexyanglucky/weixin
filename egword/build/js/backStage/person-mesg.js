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

	
	//后台交互
	__webpack_require__(7);
	var pop = __webpack_require__(9);
	var loadimg = __webpack_require__(10);
	var Paginator = __webpack_require__(11);
	var commJs = __webpack_require__(6);//公共方法
	var calender = __webpack_require__(12);
	//require('../lib/calendar/calender-plugin.min.css');
	var tplTablePerDetail = __webpack_require__(21);//员工模板
	var dataId = $("#perId").val();
	
	
	var module = {
	    init: function () {
	        //todo 逻辑函数
	        this.render();
	        this.initBtns();
	    },
	
	    render: function () {
	        //加载
	        GetPerSingle();
	
	    },
	    initBtns: function () {
	
	        //编辑跳转
	        $("body").delegate("#btnPerEdite", "click", function () {
	            window.location.href = "/Org/PersonManage/PersonEdit/" + dataId;
	
	        });
	        //禁用员工
	        $("body").delegate("#btnBand", "click", function () {
	
	            //pop.OpenConfrimPop("确认禁用");
	
	            //return;
	            var subVal = $("#btnBand").attr("data-id");
	           
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/PersonManage/ResetAccount",
	                dataType: "json",
	                data: {
	
	                    perId: dataId, type: 1, val: subVal
	                },
	                success: function (data) {
	
	                    if (data && data.Data > 0) {
	                        GetPerSingle();
	                        alert("操作成功");
	
	                    } else {
	                        alert("操作失败");
	                    }
	
	
	
	                }
	            });
	
	
	        });
	        //重置密码
	        $("body").delegate("#btnReset", "click", function () {
	
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/PersonManage/ResetAccount",
	                dataType: "json",
	                data: {
	
	                    perId: dataId, type: 0
	                },
	                success: function (data) {
	
	                    if (data && data.Data > 0) {
	                        alert("重置成功");
	
	                    } else {
	                        alert("提交失败");
	                    }
	
	
	
	                }
	            });
	
	
	        });
	
	   
	
	        //展示完的确定的删除弹窗
	        $("body").delegate("#btnloginOk", "click", function () {
	            $(".eg-pop .close").click();//关闭弹窗
	        });
	
	
	
	
	    }
	
	
	};
	
	//绑定数据
	$(function () {
	    module.init();
	
	
	
	});
	
	
	//发送请求调取数据
	function GetPerSingle() {
	    debugger;
	    //加载列表
	    $.ajax({
	        type: "post",
	        url: "/Org/PersonManage/GetPerSingle",
	        dataType: "json",
	        data: {
	            data: dataId//员工id
	
	        },
	        success: function (data) {
	
	            //$("#divLoading").hide();
	            if (data.OK) {
	
	                $("#perTb").html(tplTablePerDetail(data.Data));
	                if (data.Data.IsFrozen==1) {
	                    $("#btnBand").html("启用");
	                    $("#btnBand").attr("data-id",0);
	                } else {
	                    $("#btnBand").html("禁用");
	                    $("#btnBand").attr("data-id", 1);
	                }
	
	            }
	            else {
	
	                $("#perTb").html("");
	                alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports) {

	module.exports = {
	    checkNum: function (event) {
	
	        var keynum = event.keyCode;
	        if ((keynum >= 48 && keynum <= 57)) {
	            document.execCommand("Cut", false, true);
	            var nT = $(event.currentTarget).val();
	            //第一个不能输入0
	            if ((nT == "") && keynum == 48)
	                return false;
	
	            else if (nT.length > 2) {
	                return false;
	            } else
	                return true;
	        } else
	            return false;
	    },
	    matchNum: function (t) {
	        t.value = t.value.trimtext('.');
	    },
	    checkFloat: function (event) {
	        //var score = this.totalSore;
	        var keynum = event.keyCode;
	        //console.log(keynum);
	        if ((keynum >= 48 && keynum <= 57) || (keynum == 46)) {
	            document.execCommand("Cut", false, true);
	            var nT = $(event.currentTarget).val();
	            //第一个字符不能为小数点，不能重复输入小数点
	            if ((nT == "" || nT.indexOf(".") > -1) && keynum == 46)
	                return false;
	                //小数点后保留一位
	            else if (nT.length > 2 && nT.indexOf(".") == nT.length - 2) {
	                return false;
	            }
	                //0后面只能输入小数点
	            else if (nT == "0" && keynum != 46)
	                return false;
	                //三位数后只能输入小数点
	            else if (nT.length == 3 && nT.indexOf(".") < 0 && keynum != 46)
	                return false;
	            else if (nT.length > 4) {
	                return false;
	            } else
	                return true;
	        } else
	            return false;
	    },
	    numGradeTran: function (t) { //数字年级转换
	        debugger;
	        switch (t) {
	            case 1:
	                return "一年级";
	            case 2:
	                return "二年级";
	            case 3:
	                return "三年级";
	            case 4:
	                return "四年级";
	            case 5:
	                return "五年级";
	            case 6:
	                return "六年级";
	            case 7:
	                return "七年级";
	            case 8:
	                return "八年级";
	            case 9:
	                return "九年级";
	            case 10:
	                return "高一";
	            case 11:
	                return "高二";
	            case 12:
	                return "高三";
	
	
	        }
	
	        return t;
	    }, IsMobile: function(t) {
	        return (/^1[3|4|5|7|8]\d{9}$/.test(t));//校验手机的格式
	    }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	//var template = require('./template');
	var template = __webpack_require__(8);
	
	/** 
	 * 对日期进行格式化， 
	 * @param date 要格式化的日期 
	 * @param format 进行格式化的模式字符串
	 *     支持的模式字母有： 
	 *     y:年, 
	 *     M:年中的月份(1-12), 
	 *     d:月份中的天(1-31), 
	 *     h:小时(0-23), 
	 *     m:分(0-59), 
	 *     s:秒(0-59), 
	 *     S:毫秒(0-999),
	 *     q:季度(1-4)
	 * @return String
	 * @author yanis.wang
	 * @see	http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
	 */
	
	//时间转换
	template.helper('dateFormat', function (date, format) {
	    date = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
	    //return date.getDate();
	   //date = new Date(date);
	
	    var map = {
	        "y": date.getYear(),
	        "M": date.getMonth() + 1, //月份 
	        "d": date.getDate(), //日 
	        "h": date.getHours(), //小时 
	        "m": date.getMinutes(), //分 
	        "s": date.getSeconds(), //秒 
	        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
	        "S": date.getMilliseconds() //毫秒 
	    };
	    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
	        var v = map[t];
	        if(v !== undefined){
	            if(all.length > 1){
	                v = '0' + v;
	                v = v.substr(v.length-2);
	            }
	            return v;
	        }
	        else if(t === 'y'){
	            return (date.getFullYear() + '').substr(4 - all.length);
	        }
	        return all;
	    });
	    return format;
	});
	
	//截字处理
	template.helper('cutchar', function (obj, charlength) {
	
	    if (obj == null) {
	        return "";
	    }
	    if (obj.length > parseInt(charlength)) {
	        obj = obj.substring(0, parseInt(charlength)) + "...";
	        return obj;
	    }
	    return obj;
	
	});
	
	//教研评级
	template.helper('TeachTypeTran', function (obj) {
	
	    if (obj == 1) {
	        return "A级";
	    } else {
	        return "B级";
	    }
	});
	
	//合同期限转换
	template.helper('HtQx', function (obj) {
	
	    return template.helper(obj) + "年";
	});
	
	//年级
	template.helper('GetBigGrade', function (e) {
	    return e == 1 ? "一年级"
	        : e == 2 ? "二年级"
	        : e == 3 ? "三年级"
	        : e == 4 ? "四年级"
	        : e == 5 ? "五年级"
	        : e == 6 ? "六年级"
	        : e == 7 ? "七年级"
	        : e == 8 ? "八年级"
	        : e == 9 ? "九年级"
	         : e == 10 ? "高一"
	        : e == 11 ? "高二"
	        : e == 12 ? "高三"
	        : "";
	
	});
	
	
	//大写的转换
	template.helper('GetBigW', function (e) {
	    return e == 1 ? "一"
	        : e == 2 ? "二"
	        : e == 3 ? "三"
	        : e == 4 ? "四"
	        : e == 5 ? "五"
	        : e == 6 ? "六"
	        : e == 7 ? "七"
	        : e == 8 ? "八"
	        : e == 9 ? "九"
	        : e == 10 ? "十"
	        : e == 11 ? "十一"
	        : e == 12 ? "十二"
	        : e == 13 ? "十三"
	        : e == 14 ? "十四"
	        : e == 15 ? "十五"
	        : e == 16 ? "十六"
	        : e == 17 ? "十七"
	        : e == 18 ? "十八"
	        : e == 19 ? "十九"
	        : e == 20 ? "二十"
	        : e == 21 ? "二十一"
	        : e == 22 ? "二十二"
	        : e == 23 ? "二十三"
	        : e == 24 ? "二十四"
	        : e == 25 ? "二十五"
	        : e == 26 ? "二十六"
	        : e == 27 ? "二十七"
	        : e == 28 ? "二十八"
	        : e == 29 ? "二十九"
	        : e == 30 ? "三十"
	        : e == 31 ? "三十一"
	        : e == 32 ? "三十二"
	        : e == 33 ? "三十三"
	        : e == 34 ? "三十四"
	        : e == 35 ? "三十五"
	        : e == 36 ? "三十六"
	        : e == 37 ? "三十七"
	        : e == 38 ? "三十八"
	        : e == 39 ? "三十九"
	        : e == 40 ? "四十"
	        : e == 41 ? "四十一"
	        : e == 42 ? "四十二"
	        : e == 43 ? "四十三"
	        : e == 44 ? "四十四"
	        : e == 45 ? "四十五"
	        : e == 46 ? "四十六"
	        : e == 47 ? "四十七"
	        : e == 48 ? "四十八"
	        : e == 49 ? "四十九"
	        : e == 50 ? "五十"
	        : "";
	});
	template.helper('test', function (e) { return e;})

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports) {

	//遮罩
	function MaskShow() {
	    $(".pop-mask").show();
	}
	
	function MaskHide() {
	    $(".pop-mask").hide();
	    $(".add").hide();
	}
	//传递显示的消息
	function PopTipShow(obj) {
	    $(".addupd").each(function() {
	
	        $(this).remove();
	    });
	    
	    var tiphtml = '<div class="pop-up font14 hidden addupd" id="oktip"><span class="pop-close cursor"></span><div class="pop-content"><p class="line100" style="text-align:center;">' + obj + '</p></div></div>';
	
	    $("#main-content-wrapper").append(tiphtml);
	    $("#content").append(tiphtml);
	    $(".pop-mask").show();
	    $(".pop-up").show();
	}
	
	//传递显示的消息只让对应的id显示
	function PopTipShowId(obj) {
	    $(".addupd").each(function () {
	
	        $(this).remove();
	    });
	
	    var tiphtml = '<div class="pop-up font14 hidden addupd" id="oktip"><span class="pop-close cursor"></span><div class="pop-content"><p class="line100" style="text-align:center;">' + obj + '</p></div></div>';
	
	    $("#main-content-wrapper").append(tiphtml);
	    $("#content").append(tiphtml);
	    $(".pop-mask").show();
	    $("#oktip").show();
	}
	
	//传递显示的消息,包含DIV名称
	function PopTipShowByDivName(obj) {
	    var tiphtml = '<div class="pop-up font14 hidden" id="divCommonPopTipShow"><span class="pop-close cursor"></span><div class="pop-content"><p class="line100" style="text-align:center;">' + obj + '</p></div></div>';
	
	    $("#main-content-wrapper").append(tiphtml);
	    $("#content").append(tiphtml);
	    $(".pop-mask").show();
	    $("#divCommonPopTipShow").show();
	}
	
	//弹出确认框
	var OpenConfrimPop = function (obj) {
	    $('[class="pop-up font14"]').each(function () {
	
	        $(this).remove();
	    });
	    var html = '<div class="pop-up font14"><span class="pop-close cursor"></span><div class="pop-content" >' + obj + '</div><br /><br /><div class="handle"> <span class="ok" id="Confrim">确定</span> &nbsp;&nbsp;&nbsp;<span class="ok" id="Cancel">取消</span> </div></div>';
	    debugger;
	    $("#content").append(html);
	    $(".pop-mask").show();
	    $(".pop-up").show();
	};
	//弹出确认框
	var orgOpenConfrimPop = function (obj) {
	    var html = '<div class="pop-up font14" style="height:auto;"><span class="pop-close cursor"></span><br/><div class="pop-content" style="text-align:center;margin:30px 10px 0;">' + obj + '</div><br /><br /><div class="handle"> <span class="ok" id="Confrim">确定</span> </div></div>';
	    $("#content").append(html);
	    $(".pop-mask").show();
	    $(".pop-up").show();
	};
	//弹出确认框,没有取消按钮
	var OpenConfrimPopNoCancel = function (obj,title,btnid) {
	    $('[class="pop-up font14"]').each(function () {
	
	        $(this).remove();
	    });
	    var html = '';
	    if (title == undefined || title=="") {
	        title = "重置密码";
	    }
	    if (btnid == undefined || btnid == "") {
	        btnid = "Confrim";
	    }
	    debugger;
	    html = '<div class="mypopup font14 add" id="divPopOpenConfrimPopNoCancel"><h5 class="center font16 popuphead" style="height:45px;"><span class="title">' + title + '</span><i class="popclose cursor"></i></h5><div class="popupbox" style="min-height:120px;text-align:center;"><span class="mt20" style="display:inline-block;"><span class="content">' + obj + '</span><span><div class="handle mt20"> <span class="ok submit" id="' + btnid + '">确定</span> </div></div></div>';
	    if ($("#main-content-wrapper").length > 0) {
	        $("#main-content-wrapper").append(html);
	    } else if ($("#main-content").length > 0) {
	        $("#main-content").append(html);
	    }
	    $(".pop-mask").show();
	    $(".pop-up").show();
	    $("#divPopOpenConfrimPopNoCancel").find(".popclose").click(function () {
	        $("#divPopOpenConfrimPopNoCancel").hide();
	        $("#divPopOpenConfrimPopNoCancel").remove();
	        $(".pop-mask").hide();
	        $(".pop-up").hide();
	       
	    });
	    $('#Confrim').click(function () {//张越添加的函数
	        if ($('.content').text() != '重置密码后，该账号密码将恢复初始密码！') {
	            $("#divPopOpenConfrimPopNoCancel").hide();
	            $("#divPopOpenConfrimPopNoCancel").remove();
	            $(".pop-mask").hide();
	            $(".pop-up").hide();
	        }
	        
	    })
	};
	var OpenConfrimPopNoCance2 = function (obj) {
	    $('[class="pop-up font14"]').each(function () {
	
	        $(this).remove();
	    });
	    var html = '';
	    html = '<div class="mypopup font14" id="divPopOpenConfrimPopNoCancel"><h5 class="center font16 popuphead" style="height:45px;"><span class="title">提示消息</span><i class="popclose cursor"></i></h5><div class="popupbox" style="min-height:120px;text-align:center;"><span class="mt20" style="display:inline-block;"><span class="content">' + obj + '</span><span><div class="handle mt20"> <span class="ok submit" id="Confrim">确定</span> </div></div></div>';
	    if ($("#main-content-wrapper").length > 0) {
	       $("#main-content-wrapper").append(html);
	    } else if ($("#main-content").length > 0) {
	        $("#main-content").append(html);
	    }
	    $(".pop-mask").show();
	    $(".pop-up").show();
	    $("#divPopOpenConfrimPopNoCancel").find(".popclose").click(function () {
	        $("#divPopOpenConfrimPopNoCancel").hide();
	        $("#divPopOpenConfrimPopNoCancel").remove();
	        $(".pop-mask").hide();
	        $(".pop-up").hide();
	
	    });
	   
	};
	///弹出多长时间后消失
	var OpenTimeHide = function (obj, time) {
	    //var html = '<div class="popup"> <h5 class="center font16 popuphead">消息提示<i class="popclose cursor"></i></h5><div class="popupbox"><div class="handle font14 auto">' + obj + '</div></div></div>';
	    var html = '  <div class="popup "><h5 class="center font16 popuphead"> 消息提示<i class="popclose cursor"></i></h5><div class="popupbox"><div style="text-align:center;"><div class="success auto" style="display:inline-block;margin-top:20px;"></div></div><div class="handle successLetter"> <span class="mt20">'+obj+'</span></div></div></div>';
	    $("#main-content-wrapper").append(html);
	    $(".popup").show();
	  
	    setTimeout(function () {
	        $(".popup").hide();
	        document.location.reload();
	    }, time);
	
	};
	
	///弹出多长时间后消失,包含DIV名称
	var OpenTimeHideByDivName = function (obj, time, containsDiv) {
	    $('[class="pop-up font14"]').each(function () {
	
	        $(this).remove();
	    });
	    //var html = '<div class="popup"> <h5 class="center font16 popuphead">消息提示<i class="popclose cursor"></i></h5><div class="popupbox"><div class="handle font14 auto">' + obj + '</div></div></div>';
	    var html = '<div class="pop-up font14 hidden addupd" id="divCommonPopOpenTimeHide"><span class="pop-close cursor"></span><div class="pop-content"  style="margin:30px 0;width:auto;"><p class="line100" style="text-align:center;">' + obj + '</p></div></div>';
	    $("#" + containsDiv).append(html);
	    $("#divCommonPopOpenTimeHide").show();
	    $("#divCommonPopOpenTimeHide").find(".pop-close").click(function () {
	        $("#divCommonPopOpenTimeHide").hide();
	        $("#divCommonPopOpenTimeHide").remove();
	        $('#divPopOpenConfrimPopNoCancel').each(function () {
	
	            $(this).remove();
	        });
	    });
	    setTimeout(function () {
	        $("#divCommonPopOpenTimeHide").hide();
	        $("#divCommonPopOpenTimeHide").remove();
	        ////201610231617 klg
	        $(".pop-mask").hide();
	        $(".pop-up").hide();
	        $('#divPopOpenConfrimPopNoCancel').each(function () {
	
	            $(this).remove();
	        });
	       // $("#divPopOpenConfrimPopNoCancel").remove();
	        ///
	        //document.location.reload();
	    }, time);
	
	};
	
	function PopTipHide() {
	    $(".pop-up").hide();
	    $(".pop-mask").hide();
	    $(".add").hide();
	    document.location.reload();
	}
	
	
	//测评模块
	var ConfrimExam = function (obj) {
	    $('[class="pop-up font14"]').each(function () {
	
	        $(this).remove();
	    });
	    var html = '<div class="pop-up font14"><span class="pop-close cursor"></span><div class="pop-content">' + obj + '</div><br /><br /><div class="handle"> <span class="ok" id="Confrim">我要放弃</span> &nbsp;&nbsp;&nbsp;<span class="ok" id="Cancel">继续作答</span> </div></div>';
	    $("#main-content-wrapper").append(html);
	    $(".pop-mask").show();
	    $(".pop-up").show();
	};
	
	
	
	exports.MaskShow = MaskShow;
	exports.MaskHide = MaskHide;
	exports.PopTipShow = PopTipShow;
	exports.PopTipShowId = PopTipShowId;//只让div对应的id显示
	exports.PopTipHide = PopTipHide;
	exports.OpenConfrimPop = OpenConfrimPop;
	exports.OpenConfrimPopNoCancel = OpenConfrimPopNoCancel;
	exports.OpenTimeHide = OpenTimeHide;
	exports.ConfrimExam = ConfrimExam;
	exports.OpenTimeHideByDivName = OpenTimeHideByDivName;
	exports.orgOpenConfrimPop = orgOpenConfrimPop;
	exports.OpenConfrimPopNoCance2 = OpenConfrimPopNoCance2;
	//处理弹出框的隐藏
	$(function () {
	    $("#main-content-wrapper").delegate(".pop-close", "click", function () {
	        $(".pop-mask").hide();
	        $(".pop-up").hide();
	        //document.location.reload();
	    });
	
	    $("#main-content-wrapper").delegate(".popclose", "click", function () {
	        $(".pop-mask").hide();
	        $(".add").hide();
	    });
	
	    $("#content").delegate(".pop-close", "click", function () {
	        $(".pop-mask").hide();
	        $(".pop-up").hide();
	        //document.location.reload();
	    });
	
	    $("#content").delegate(".popclose", "click", function () {
	        $(".pop-mask").hide();
	        $(".add").hide();
	    });
	
	
	
	});
	


/***/ },
/* 10 */
/***/ function(module, exports) {

	//弹出加载图片针对列表传递居中参数
	function ShowLoadingForTable(obj, num) {
	    if (num == undefined || obj==undefined) {
	        return;
	    }
	    obj.html('<tr  style="border:none;text-align:center;height:280px;"><td style="font-size: 16px;" colspan="'+num+'"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;">'+jQuery("#divLoading").html() +'</div></div></td></tr>');
	}
	
	
	
	//弹出加载图片
	function ShowLoading(obj) {
	    if (obj == undefined) {
	        return;
	    }
	    obj.html(jQuery("#divLoading").html());
	}
	
	
	exports.ShowLoadingForTable = ShowLoadingForTable;//针对table布局的
	exports.ShowLoading = ShowLoading;
	
	


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {
	    Paginator: function (pageSize, currentPage, totalCount, callback) {
	        //todo 绑定事件
	
	        var totalPages;
	        if (totalCount % pageSize == 0) {
	            totalPages = totalCount / pageSize;
	        }
	        else {
	            totalPages = parseInt(totalCount / pageSize) + 1;
	        }
	        var pagePre = '<a href="#"  data-num=' + (parseInt(currentPage) - 1) + ' class="pre-page inline mr20">上一页</a>';
	        var pageNext = '<a href="#"  data-num=' + (parseInt(currentPage) + 1) + ' class="next-page inline">下一页</a>';
	        var indexPage = '<a href="#"  data-num="1" class="pre-page inline mr20">首页</a></li>';
	
	        var lastPage = ' <a href="#"  data-num=' + totalPages + ' class="pre-page inline mr20 ml20"> 末页</a>';
	        if (totalPages < pageSize) {
	            // pagePre = "";
	            //pageNext = "";
	            indexPage = "";
	            lastPage = "";
	        }
	
	        if (currentPage <= 1) {
	            currentPage = 1;
	            pagePre = "";
	
	        }
	        if (currentPage >= totalPages) {
	            currentPage = totalPages;
	            pageNext = "";
	            lastPage = "";
	        }
	
	        if (totalCount > 0) {
	
	            var pagenum = '<ul class="page-box inline mr20 mb20">';
	
	
	            if (totalPages > 1) {
	                if (currentPage == 1) //第一页
	                {
	
	                    //output.Append(" <a disabled='disabled' class='colH'>上一页</a> ");//上一页
	                }
	                if (currentPage > 1) {
	                    //处理首页连接
	                    //处理上一页的连接
	                    //pagePre = ' <li><a href="#"  data-num=' + (parseInt(currentPage) - 1) + '>上一页</a> </li>';
	                    // output.AppendFormat(" <a data-pageIndex='{0}' class='pageLink'>上一页</a> ", currentPage - 1);//上一页
	                }
	                if (totalPages > 7) {
	                    var currint = 3;
	                    if (currentPage < 4)//4
	                    {
	
	                        for (var i = 0; i <= 6; i++) {
	                            if (currentPage == i + 1) {
	                                pagenum = pagenum + ' <li><a href="#" class="active" data-num=' + currentPage + '>' + currentPage + '</a> </li>';
	
	                            }
	                            else {
	                                if (i == 6) {
	
	                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + 7 + '>...</a> </li>';
	                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + totalPages + '>' + totalPages + '</a> </li>';
	                                }
	                                else {
	
	                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + (i + 1) + '>' + (i + 1) + '</a> </li>';
	                                }
	                            }
	                        }
	                    }//4
	                    else if (currentPage >= 4 && currentPage < totalPages - 3) {
	
	                        for (var i = 0; i <= 6; i++) {
	                            if (i == 0) {
	                                //pagenum=pagenum+' <li data-num='+(currentPage-3)+'><a href="#" onclick="Paginator('+pageSize+','+(currentPage-3)+',' + totalCount + ')">...</a> </li>';
	                                pagenum = pagenum + ' <li><a href="#"  data-num="1">1</a> </li>';//201609130930
	                                if (parseInt(currentPage) - 3 > 1) {
	                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + (parseInt(currentPage) - 3) + '>...</a> </li>';//201609130930
	                                }
	
	                            }
	                            else if (i == 3)//中间当前页
	                            {
	
	
	                                pagenum = pagenum + ' <li><a href="#" class="active" data-num=' + (currentPage) + '>' + currentPage + '</a> </li>';
	                            }
	                            else if (i == 6) {
	
	                                pagenum = pagenum + ' <li><a href="#" data-num=' + (parseInt(currentPage) + 3) + '>...</a> </li>';
	                                pagenum = pagenum + ' <li><a href="#"  data-num=' + totalPages + '>' + totalPages + '</a> </li>';
	                            }
	                            else {
	
	                                pagenum = pagenum + ' <li><a href="#"  data-num=' + (parseInt(currentPage) + i - parseInt(currint)) + '>' + (parseInt(currentPage) + i - parseInt(currint)) + '</a> </li>';
	                            }
	                        }
	
	                    }
	                    else {
	                        for (var i = 0; i <= 6; i++) {
	                            if (i == 0) {
	
	                                pagenum = pagenum + ' <li><a href="#"  data-num="1">1</a> </li>';//201609130930
	                                pagenum = pagenum + ' <li><a href="#" data-num=' + (parseInt(totalPages) - 6) + '>...</a> </li>';//201609130930
	                            }
	                            else {
	                                if (totalPages - 6 + i == currentPage) {
	
	
	                                    pagenum = pagenum + ' <li><a href="#" class="active"  data-num=' + currentPage + '>' + currentPage + '</a> </li>';
	                                }
	                                else {
	
	                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + (totalPages - 6 + i) + '>' + (totalPages - 6 + i) + '</a> </li>';
	                                }
	                            }
	                        }
	                    }
	
	                }
	                else {
	                    for (var i = 0; i < totalPages; i++) {
	                        if (currentPage == i + 1) {
	
	                            pagenum = pagenum + ' <li><a href="#" class="active" data-num=' + currentPage + '>' + currentPage + '</a> </li>';
	
	                        }
	                        else {
	
	                            pagenum = pagenum + ' <li><a href="#"  data-num=' + (i + 1) + '>' + (i + 1) + '</a> </li>';
	
	                        }
	                    }
	                }
	                if (currentPage == totalPages) //最后一页
	                {//处理下一页和尾页的链接
	
	
	                    //output.Append(" <a disabled='disabled' class='colH'>下一页</a> ");
	                    pageNext = "";
	                    lastPage = "";
	                }
	                if (currentPage < totalPages) {//处理下一页和尾页的链接 
	
	                    //output.AppendFormat(" <a data-pageindex='{0}' class='pageLink'>下一页</a> ", currentPage + 1);
	                    //pagePre = '<a href="#"  data-num=' + (parseInt(currentPage) + 1) + ' class="next-page inline">下一页</a>';
	                }
	
	
	            }
	
	            pagenum = pagenum + '</ul>';
	            document.getElementById("pagination").innerHTML = indexPage + pagePre + pagenum + pageNext;
	
	
	        }
	        else {
	            document.getElementById("pagination").innerHTML = "";
	        }
	        $("#pagination a").unbind("click");
	        $("#pagination a").bind("click", function () {
	           
	            if (callback) {
	                callback($(this).attr("data-num"));
	            }
	        });
	
	    }
	}
	//function Paginator(pageSize, currentPage, totalCount, callback) {
	
	
	//}
	


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var flatpickr = function flatpickr(selector, config) {
		var elements = void 0;
	
		var createInstance = function createInstance(element) {
			if (element._flatpickr) {
				element._flatpickr.destroy();
			}
	
			element._flatpickr = new flatpickr.init(element, config);
			return element._flatpickr;
		};
	
		if (selector.nodeName) {
			return createInstance(selector);
		}
		/*
	 Utilize the performance of native getters if applicable
	 https://jsperf.com/getelementsbyclassname-vs-queryselectorall/18
	 https://jsperf.com/jquery-vs-javascript-performance-comparison/22
	 */
		else if (/^#[a-zA-Z0-9\-_]*$/.test(selector)) {
				return createInstance(document.getElementById(selector.slice(1)));
			} else if (/^\.[a-zA-Z0-9\-_]*$/.test(selector)) {
				elements = document.getElementsByClassName(selector.slice(1));
			} else {
				elements = document.querySelectorAll(selector);
			}
	
		var instances = [];
	
		for (var i = 0; i < elements.length; i++) {
			instances.push(createInstance(elements[i]));
		}
	
		if (instances.length === 1) {
			return instances[0];
		}
	
		return {
			calendars: instances,
			byID: function byID(id) {
				return document.getElementById(id)._flatpickr;
			}
		};
	};
	
	/**
	 * @constructor
	 */
	flatpickr.init = function (element, instanceConfig) {
		function createElement(tag, className, content) {
			var newElement = document.createElement(tag);
	
			if (content) {
				newElement.textContent = content;
			}
	
			if (className) {
				newElement.className = className;
			}
	
			return newElement;
		}
	
		var debounce = function debounce(func, wait, immediate) {
			var timeout = void 0;
			return function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}
	
				var context = this;
	
				var later = function later() {
					timeout = null;
					if (!immediate) {
						func.apply(context, args);
					}
				};
	
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (immediate && !timeout) {
					func.apply(context, args);
				}
			};
		};
	
		// functions
		var self = this;
		var parseConfig = void 0,
		    init = void 0,
		    wrap = void 0,
		    uDate = void 0,
		    equalDates = void 0,
		    pad = void 0,
		    monthToStr = void 0,
		    isEnabled = void 0,
		    buildMonthNavigation = void 0,
		    buildWeekdays = void 0,
		    buildCalendar = void 0,
		    buildDays = void 0,
		    buildWeeks = void 0,
		    buildTime = void 0,
		    timeWrapper = void 0,
		    yearScroll = void 0,
		    updateValue = void 0,
		    amPMToggle = void 0,
		    onKeyDown = void 0,
		    onResize = void 0,
		    updateNavigationCurrentMonth = void 0,
		    handleYearChange = void 0,
		    changeMonth = void 0,
		    getDaysinMonth = void 0,
		    documentClick = void 0,
		    selectDate = void 0,
		    getRandomCalendarIdStr = void 0,
		    bind = void 0,
		    triggerChange = void 0;
	
		// elements & variables
		var calendarContainer = void 0,
		    weekdayContainer = void 0,
		    timeContainer = void 0,
		    navigationCurrentMonth = void 0,
		    monthsNav = void 0,
		    prevMonthNav = void 0,
		    currentYearElement = void 0,
		    currentMonthElement = void 0,
		    nextMonthNav = void 0,
		    calendar = void 0,
		    weekNumbers = void 0,
		    now = new Date(),
		    wrapperElement = void 0,
		    clickEvt = void 0;
	
		self.formats = {
			// weekday name, short, e.g. Thu
			D: function D() {
				return self.l10n.weekdays.shorthand[self.formats.w()];
			},
	
			// full month name e.g. January
			F: function F() {
				return monthToStr(self.formats.n() - 1, false);
			},
	
			// hours with leading zero e.g. 03
			H: function H() {
				return pad(self.selectedDateObj.getHours());
			},
	
			// day (1-30) with ordinal suffix e.g. 1st, 2nd
			J: function J() {
				return self.formats.j() + self.l10n.ordinal(self.formats.j());
			},
	
			// AM/PM
			K: function K() {
				return self.selectedDateObj.getHours() > 11 ? "PM" : "AM";
			},
	
			// shorthand month e.g. Jan, Sep, Oct, etc
			M: function M() {
				return monthToStr(self.formats.n() - 1, true);
			},
	
			// seconds 00-59
			S: function S() {
				return pad(self.selectedDateObj.getSeconds());
			},
	
			// unix timestamp
			U: function U() {
				return self.selectedDateObj.getTime() / 1000;
			},
	
			// full year e.g. 2016
			Y: function Y() {
				return self.selectedDateObj.getFullYear();
			},
	
			// day in month, padded (01-30)
			d: function d() {
				return pad(self.formats.j());
			},
	
			// hour from 1-12 (am/pm)
			h: function h() {
				return self.selectedDateObj.getHours() % 12 ? self.selectedDateObj.getHours() % 12 : 12;
			},
	
			// minutes, padded with leading zero e.g. 09
			i: function i() {
				return pad(self.selectedDateObj.getMinutes());
			},
	
			// day in month (1-30)
			j: function j() {
				return self.selectedDateObj.getDate();
			},
	
			// weekday name, full, e.g. Thursday
			l: function l() {
				return self.l10n.weekdays.longhand[self.formats.w()];
			},
	
			// padded month number (01-12)
			m: function m() {
				return pad(self.formats.n());
			},
	
			// the month number (1-12)
			n: function n() {
				return self.selectedDateObj.getMonth() + 1;
			},
	
			// seconds 0-59
			s: function s() {
				return self.selectedDateObj.getSeconds();
			},
	
			// number of the day of the week
			w: function w() {
				return self.selectedDateObj.getDay();
			},
	
			// last two digits of year e.g. 16 for 2016
			y: function y() {
				return String(self.formats.Y()).substring(2);
			}
		};
	
		self.defaultConfig = {
			/* if true, dates will be parsed, formatted, and displayed in UTC.
	  preloading date strings w/ timezones is recommended but not necessary */
			utc: false,
	
			// wrap: see https://chmln.github.io/flatpickr/#strap
			wrap: false,
	
			// enables week numbers
			weekNumbers: false,
	
			allowInput: false,
	
			/*
	  	clicking on input opens the date(time)picker.
	  	disable if you wish to open the calendar manually with .open()
	  */
			clickOpens: true,
	
			// display time picker in 24 hour mode
			time_24hr: false,
	
			// enables the time picker functionality
			enableTime: false,
	
			// noCalendar: true will hide the calendar. use for a time picker along w/ enableTime
			noCalendar: false,
	
			// more date format chars at https://chmln.github.io/flatpickr/#dateformat
			dateFormat: "Y-m-d",
	
			// altInput - see https://chmln.github.io/flatpickr/#altinput
			altInput: false,
	
			// the created altInput element will have this class.
			altInputClass: "",
	
			// same as dateFormat, but for altInput
			altFormat: "F j, Y", // defaults to e.g. June 10, 2016
	
			// defaultDate - either a datestring or a date object. used for datetimepicker"s initial value
			defaultDate: null,
	
			// the minimum date that user can pick (inclusive)
			minDate: null,
	
			// the maximum date that user can pick (inclusive)
			maxDate: null,
	
			// dateparser that transforms a given string to a date object
			parseDate: null,
	
			// see https://chmln.github.io/flatpickr/#disable
			enable: [],
	
			// see https://chmln.github.io/flatpickr/#disable
			disable: [],
	
			// display the short version of month names - e.g. Sep instead of September
			shorthandCurrentMonth: false,
	
			// displays calendar inline. see https://chmln.github.io/flatpickr/#inline-calendar
			inline: false,
	
			// position calendar inside wrapper and next to the input element
			// leave at false unless you know what you"re doing
			static: false,
	
			// code for previous/next icons. this is where you put your custom icon code e.g. fontawesome
			prevArrow: "&lt;",
			nextArrow: "&gt;",
	
			// enables seconds in the time picker
			enableSeconds: false,
	
			// step size used when scrolling/incrementing the hour element
			hourIncrement: 1,
	
			// step size used when scrolling/incrementing the minute element
			minuteIncrement: 5,
	
			// onChange callback when user selects a date or time
			onChange: null, // function (dateObj, dateStr) {}
	
			// called every time calendar is opened
			onOpen: null, // function (dateObj, dateStr) {}
	
			// called every time calendar is closed
			onClose: null, // function (dateObj, dateStr) {}
	
			onValueUpdate: null
		};
	
		init = function init() {
			instanceConfig = instanceConfig || {};
	
			self.element = element;
	
			parseConfig();
	
			self.input = self.config.wrap ? element.querySelector("[data-input]") : element;
			self.input.classList.add("flatpickr-input");
	
			if (self.config.defaultDate) {
				self.config.defaultDate = uDate(self.config.defaultDate);
			}
	
			if (self.input.value || self.config.defaultDate) {
				self.selectedDateObj = uDate(self.config.defaultDate || self.input.value);
			}
	
			wrap();
			buildCalendar();
			bind();
	
			self.uDate = uDate;
			self.jumpToDate();
			updateValue();
		};
	
		parseConfig = function parseConfig() {
			self.config = {};
	
			Object.keys(self.defaultConfig).forEach(function (key) {
				if (instanceConfig.hasOwnProperty(key)) {
					self.config[key] = instanceConfig[key];
				} else if (self.element.dataset && self.element.dataset.hasOwnProperty(key.toLowerCase())) {
					self.config[key] = self.element.dataset[key.toLowerCase()];
				} else if (!self.element.dataset && self.element.hasAttribute("data-" + key)) {
					self.config[key] = self.element.getAttribute("data-" + key);
				} else {
					self.config[key] = flatpickr.init.prototype.defaultConfig[key] || self.defaultConfig[key];
				}
	
				if (typeof self.defaultConfig[key] === "boolean") {
					self.config[key] = self.config[key] === true || self.config[key] === "" || self.config[key] === "true";
				}
	
				if (key === "enableTime" && self.config[key]) {
					self.defaultConfig.dateFormat = !self.config.time_24hr ? "Y-m-d h:i K" : "Y-m-d H:i";
					self.defaultConfig.altFormat = !self.config.time_24hr ? "F j Y, h:i K" : "F j, Y H:i";
				} else if (key === "noCalendar" && self.config[key]) {
					self.defaultConfig.dateFormat = "h:i K";
					self.defaultConfig.altFormat = "h:i K";
				}
			});
		};
	
		getRandomCalendarIdStr = function getRandomCalendarIdStr() {
			var randNum = void 0,
			    idStr = void 0;
			do {
				randNum = Math.round(Math.random() * Math.pow(10, 10));
				idStr = "flatpickr-" + randNum;
			} while (document.getElementById(idStr) !== null);
	
			return idStr;
		};
	
		uDate = function uDate(date, timeless) {
			timeless = timeless || false;
	
			if (date === "today") {
				date = new Date();
				timeless = true;
			} else if (typeof date === "string") {
				date = date.trim();
	
				if (self.config.parseDate) {
					date = self.config.parseDate(date);
				} else if (/^\d\d\d\d\-\d{1,2}\-\d\d$/.test(date)) {
					// this utc datestring gets parsed, but incorrectly by Date.parse
					date = new Date(date.replace(/(\d)-(\d)/g, "$1/$2"));
				} else if (Date.parse(date)) {
					date = new Date(date);
				} else if (/^\d\d\d\d\-\d\d\-\d\d/.test(date)) {
					// disable special utc datestring
					date = new Date(date.replace(/(\d)-(\d)/g, "$1/$2"));
				} else if (/^(\d?\d):(\d\d)/.test(date)) {
					// time-only picker
					var matches = date.match(/^(\d?\d):(\d\d)(:(\d\d))?/),
					    seconds = matches[4] !== undefined ? matches[4] : 0;
	
					date = new Date();
					date.setHours(matches[1], matches[2], seconds, 0);
				} else {
					console.error("flatpickr: invalid date string " + date);
					console.info(self.element);
				}
			}
	
			if (!(date instanceof Date) || !date.getTime()) {
				return null;
			}
	
			if (self.config.utc && !date.fp_isUTC) {
				date = date.fp_toUTC();
			}
	
			if (timeless) {
				date.setHours(0, 0, 0, 0);
			}
	
			return date;
		};
	
		equalDates = function equalDates(date1, date2) {
			return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
		};
	
		wrap = function wrap() {
			wrapperElement = createElement("div", "flatpickr-wrapper");
	
			if (self.config.inline || self.config.static) {
				// Wrap input and place calendar underneath
				self.element.parentNode.insertBefore(wrapperElement, self.element);
				wrapperElement.appendChild(self.element);
	
				wrapperElement.classList.add(self.config.inline ? "inline" : "static");
			} else {
				// Insert at bottom of BODY tag to display outside
				// of relative positioned elements with css "overflow: hidden;"
				// property set.
				document.body.appendChild(wrapperElement);
			}
	
			if (self.config.altInput) {
				// replicate self.element
				self.altInput = createElement(self.input.nodeName, self.config.altInputClass + " flatpickr-input");
				self.altInput.placeholder = self.input.placeholder;
				self.altInput.type = "text";
	
				self.input.type = "hidden";
				self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
			}
		};
	
		getDaysinMonth = function getDaysinMonth() {
			var month = arguments.length <= 0 || arguments[0] === undefined ? self.currentMonth : arguments[0];
	
			var yr = self.currentYear;
	
			if (month === 1 && (yr % 4 === 0 && yr % 100 !== 0 || yr % 400 === 0)) {
				return 29;
			}
	
			return self.l10n.daysInMonth[month];
		};
	
		updateValue = function updateValue(e) {
			if (self.config.noCalendar && !self.selectedDateObj) {
				// picking time only and method triggered from picker
				self.selectedDateObj = new Date();
			} else if (!self.selectedDateObj) {
				return;
			}
	
			if (e) {
				e.target.blur();
			}
	
			var timeHasChanged = void 0;
	
			if (self.config.enableTime) {
				var previousTimestamp = self.selectedDateObj.getTime();
	
				// update time
				var hours = parseInt(self.hourElement.value, 10) || 0,
				    seconds = void 0;
	
				var minutes = (60 + (parseInt(self.minuteElement.value, 10) || 0)) % 60;
	
				if (self.config.enableSeconds) {
					seconds = (60 + parseInt(self.secondElement.value, 10) || 0) % 60;
				}
	
				if (!self.config.time_24hr) {
					// the real number of hours for the date object
					hours = hours % 12 + 12 * (self.amPM.innerHTML === "PM");
				}
	
				self.selectedDateObj.setHours(hours, minutes, seconds === undefined ? self.selectedDateObj.getSeconds() : seconds);
	
				self.hourElement.value = pad(!self.config.time_24hr ? (12 + hours) % 12 + 12 * (hours % 12 === 0) : hours);
				self.minuteElement.value = pad(minutes);
	
				if (seconds !== undefined) {
					self.secondElement.value = pad(seconds);
				}
	
				timeHasChanged = self.selectedDateObj.getTime() !== previousTimestamp;
			}
	
			self.input.value = self.formatDate(self.config.dateFormat);
	
			if (self.altInput) {
				self.altInput.value = self.formatDate(self.config.altFormat);
			}
	
			if (e && (timeHasChanged || e.target.classList.contains("flatpickr-day"))) {
				triggerChange();
			}
	
			if (self.config.onValueUpdate) {
				self.config.onValueUpdate(self.selectedDateObj, self.input.value);
			}
		};
	
		pad = function pad(num) {
			return ("0" + num).slice(-2);
		};
	
		self.formatDate = function (dateFormat) {
			var formattedDate = "";
			var formatPieces = dateFormat.split("");
	
			for (var i = 0; i < formatPieces.length; i++) {
				var c = formatPieces[i];
				if (self.formats.hasOwnProperty(c) && formatPieces[i - 1] !== "\\") {
					formattedDate += self.formats[c]();
				} else if (c !== "\\") {
					formattedDate += c;
				}
			}
	
			return formattedDate;
		};
	
		monthToStr = function monthToStr(date, shorthand) {
			if (shorthand || self.config.shorthandCurrentMonth) {
				return self.l10n.months.shorthand[date];
			}
	
			return self.l10n.months.longhand[date];
		};
	
		isEnabled = function isEnabled(dateToCheck) {
			if (self.config.minDate && dateToCheck < self.config.minDate || self.config.maxDate && dateToCheck > self.config.maxDate) {
				return false;
			}
	
			dateToCheck = uDate(dateToCheck, true); // timeless
	
			var bool = self.config.enable.length > 0,
			    array = bool ? self.config.enable : self.config.disable;
	
			var d = void 0;
	
			for (var i = 0; i < array.length; i++) {
				d = array[i];
	
				if (d instanceof Function && d(dateToCheck)) {
					// disabled by function
					return bool;
				} else if ( // disabled weekday
				typeof d === "string" && /^wkd/.test(d) && dateToCheck.getDay() === (parseInt(d.slice(-1), 10) + self.l10n.firstDayOfWeek - 1) % 7) {
					return bool;
				} else if ((d instanceof Date || typeof d === "string" && !/^wkd/.test(d)) && uDate(d, true).getTime() === dateToCheck.getTime()) {
					// disabled by date string
					return bool;
				} else if ( // disabled by range
				(typeof d === "undefined" ? "undefined" : _typeof(d)) === "object" && d.hasOwnProperty("from") && dateToCheck >= uDate(d.from) && dateToCheck <= uDate(d.to)) {
					return bool;
				}
			}
	
			return !bool;
		};
	
		yearScroll = function yearScroll(event) {
			event.preventDefault();
	
			var delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.deltaY));
			self.currentYear = event.target.value = parseInt(event.target.value, 10) + delta;
			self.redraw();
		};
	
		timeWrapper = function timeWrapper(e) {
			e.preventDefault();
	
			var min = parseInt(e.target.min, 10),
			    max = parseInt(e.target.max, 10),
			    step = parseInt(e.target.step, 10),
			    value = parseInt(e.target.value, 10);
	
			var newValue = value;
	
			if (e.type === "wheel") {
				newValue = value + step * Math.max(-1, Math.min(1, e.wheelDelta || -e.deltaY));
			}
	
			if (newValue <= min) {
				newValue = max - step;
			} else if (newValue >= max) {
				newValue = min + step;
			}
	
			e.target.value = pad(newValue);
		};
	
		updateNavigationCurrentMonth = function updateNavigationCurrentMonth() {
			currentMonthElement.textContent = monthToStr(self.currentMonth) + " ";
			currentYearElement.value = self.currentYear;
		};
	
		handleYearChange = function handleYearChange() {
			if (self.currentMonth < 0 || self.currentMonth > 11) {
				self.currentYear += self.currentMonth % 11;
				self.currentMonth = (self.currentMonth + 12) % 12;
			}
		};
	
		documentClick = function documentClick(e) {
			var isCalendarElement = wrapperElement.contains(e.target),
			    isInput = self.element.contains(e.target) || e.target === self.altInput;
	
			if (self.isOpen && !isCalendarElement && !isInput) {
				self.close();
			}
		};
	
		changeMonth = function changeMonth(offset) {
			self.currentMonth += offset;
	
			handleYearChange();
			updateNavigationCurrentMonth();
			buildDays();
			(self.config.noCalendar ? timeContainer : calendar).focus();
		};
	
		selectDate = function selectDate(e) {
			e.preventDefault();
			e.stopPropagation();
	
			if (self.config.allowInput && e.target === (self.altInput || self.input) && e.which === 13) {
				self.setDate((self.altInput || self.input).value);
				self.redraw();
			} else if (e.target.classList.contains("flatpickr-day")) {
				var isPrevMonthDay = e.target.classList.contains("prevMonthDay"),
				    isNextMonthDay = e.target.classList.contains("nextMonthDay"),
				    monthNum = self.currentMonth - isPrevMonthDay + isNextMonthDay;
	
				if (isPrevMonthDay || isNextMonthDay) {
					changeMonth(+isNextMonthDay - isPrevMonthDay);
				}
	
				self.selectedDateObj = new Date(self.currentYear, monthNum, e.target.innerHTML);
	
				updateValue(e);
				buildDays();
			}
		};
	
		buildCalendar = function buildCalendar() {
			calendarContainer = createElement("div", "flatpickr-calendar");
			calendarContainer.id = getRandomCalendarIdStr();
	
			calendar = createElement("div", "flatpickr-days");
			calendar.tabIndex = -1;
	
			if (!self.config.noCalendar) {
				buildMonthNavigation();
				buildWeekdays();
	
				if (self.config.weekNumbers) {
					buildWeeks();
				}
	
				buildDays();
	
				calendarContainer.appendChild(calendar);
			}
	
			wrapperElement.appendChild(calendarContainer);
	
			if (self.config.enableTime) {
				buildTime();
			}
		};
	
		buildMonthNavigation = function buildMonthNavigation() {
			monthsNav = createElement("div", "flatpickr-month");
	
			prevMonthNav = createElement("span", "flatpickr-prev-month");
			prevMonthNav.innerHTML = self.config.prevArrow;
	
			currentMonthElement = createElement("span", "cur_month");
	
			currentYearElement = createElement("input", "cur_year");
			currentYearElement.type = "number";
			currentYearElement.title = self.l10n.scrollTitle;
	
			nextMonthNav = createElement("span", "flatpickr-next-month");
			nextMonthNav.innerHTML = self.config.nextArrow;
	
			navigationCurrentMonth = createElement("span", "flatpickr-current-month");
			navigationCurrentMonth.appendChild(currentMonthElement);
			navigationCurrentMonth.appendChild(currentYearElement);
	
			monthsNav.appendChild(prevMonthNav);
			monthsNav.appendChild(navigationCurrentMonth);
			monthsNav.appendChild(nextMonthNav);
	
			calendarContainer.appendChild(monthsNav);
			updateNavigationCurrentMonth();
		};
	
		buildWeekdays = function buildWeekdays() {
			weekdayContainer = createElement("div", "flatpickr-weekdays");
			var firstDayOfWeek = self.l10n.firstDayOfWeek;
	
			var weekdays = self.l10n.weekdays.shorthand.slice();
	
			if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
				weekdays = [].concat(weekdays.splice(firstDayOfWeek, weekdays.length), weekdays.splice(0, firstDayOfWeek));
			}
	
			if (self.config.weekNumbers) {
				weekdayContainer.innerHTML = "<span>" + self.l10n.weekAbbreviation + "</span>";
			}
	
			weekdayContainer.innerHTML += "<span>" + weekdays.join("</span><span>") + "</span>";
	
			calendarContainer.appendChild(weekdayContainer);
		};
	
		buildWeeks = function buildWeeks() {
			calendarContainer.classList.add("hasWeeks");
	
			weekNumbers = createElement("div", "flatpickr-weeks");
			calendarContainer.appendChild(weekNumbers);
		};
	
		buildDays = function buildDays() {
			var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() - self.l10n.firstDayOfWeek + 7) % 7,
			    daysInMonth = getDaysinMonth(),
			    prevMonthDays = getDaysinMonth((self.currentMonth - 1 + 12) % 12),
			    days = document.createDocumentFragment();
	
			var dayNumber = prevMonthDays + 1 - firstOfMonth,
			    currentDate = void 0,
			    dateIsDisabled = void 0;
	
			if (self.config.weekNumbers) {
				weekNumbers.innerHTML = "";
			}
	
			calendar.innerHTML = "";
	
			self.config.minDate = uDate(self.config.minDate, true);
			self.config.maxDate = uDate(self.config.maxDate, true);
	
			// prepend days from the ending of previous month
			for (; dayNumber <= prevMonthDays; dayNumber++) {
				var curDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber, 0, 0, 0, 0, 0),
				    dateIsEnabled = isEnabled(curDate),
				    dayElem = createElement("span", dateIsEnabled ? "flatpickr-day prevMonthDay" : "disabled", dayNumber);
	
				if (dateIsEnabled) {
					dayElem.tabIndex = 0;
				}
	
				days.appendChild(dayElem);
			}
	
			// Start at 1 since there is no 0th day
			for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
				currentDate = new Date(self.currentYear, self.currentMonth, dayNumber, 0, 0, 0, 0, 0);
	
				if (self.config.weekNumbers && dayNumber % 7 === 1) {
					weekNumbers.appendChild(createElement("span", "disabled flatpickr-day", currentDate.fp_getWeek()));
				}
	
				dateIsDisabled = !isEnabled(currentDate);
	
				var dayElement = createElement("span", dateIsDisabled ? "disabled" : "flatpickr-day", dayNumber);
	
				if (!dateIsDisabled) {
					dayElement.tabIndex = 0;
	
					if (equalDates(currentDate, now)) {
						dayElement.classList.add("today");
					}
	
					if (self.selectedDateObj && equalDates(currentDate, self.selectedDateObj)) {
						dayElement.classList.add("selected");
					}
				}
	
				days.appendChild(dayElement);
			}
	
			// append days from the next month
			for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++) {
				var _curDate = new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth, 0, 0, 0, 0, 0),
				    _dateIsEnabled = isEnabled(_curDate),
				    _dayElement = createElement("span", _dateIsEnabled ? "nextMonthDay flatpickr-day" : "disabled", dayNum % daysInMonth);
	
				if (self.config.weekNumbers && dayNum % 7 === 1) {
					weekNumbers.appendChild(createElement("span", "disabled", _curDate.fp_getWeek()));
				}
	
				if (_dateIsEnabled) {
					_dayElement.tabIndex = 0;
				}
	
				days.appendChild(_dayElement);
			}
	
			calendar.appendChild(days);
		};
	
		buildTime = function buildTime() {
			timeContainer = createElement("div", "flatpickr-time");
			timeContainer.tabIndex = -1;
			var separator = createElement("span", "flatpickr-time-separator", ":");
	
			self.hourElement = createElement("input", "flatpickr-hour");
			self.minuteElement = createElement("input", "flatpickr-minute");
	
			self.hourElement.tabIndex = self.minuteElement.tabIndex = 0;
			self.hourElement.type = self.minuteElement.type = "number";
	
			self.hourElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getHours()) : 12;
	
			self.minuteElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getMinutes()) : "00";
	
			self.hourElement.step = self.config.hourIncrement;
			self.minuteElement.step = self.config.minuteIncrement;
	
			self.hourElement.min = -self.config.time_24hr;
			self.hourElement.max = self.config.time_24hr ? 24 : 13;
	
			self.minuteElement.min = -self.minuteElement.step;
			self.minuteElement.max = 60;
	
			self.hourElement.title = self.minuteElement.title = self.l10n.scrollTitle;
	
			timeContainer.appendChild(self.hourElement);
			timeContainer.appendChild(separator);
			timeContainer.appendChild(self.minuteElement);
	
			if (self.config.enableSeconds) {
				timeContainer.classList.add("has-seconds");
	
				self.secondElement = createElement("input", "flatpickr-second");
				self.secondElement.type = "number";
				self.secondElement.value = self.selectedDateObj ? pad(self.selectedDateObj.getSeconds()) : "00";
	
				self.secondElement.step = self.minuteElement.step;
				self.secondElement.min = self.minuteElement.min;
				self.secondElement.max = self.minuteElement.max;
	
				timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
				timeContainer.appendChild(self.secondElement);
			}
	
			if (!self.config.time_24hr) {
				// add self.amPM if appropriate
				self.amPM = createElement("span", "flatpickr-am-pm", ["AM", "PM"][self.hourElement.value > 11 | 0]);
				self.amPM.title = self.l10n.toggleTitle;
				self.amPM.tabIndex = 0;
				timeContainer.appendChild(self.amPM);
			}
	
			calendarContainer.appendChild(timeContainer);
		};
	
		bind = function bind() {
			document.addEventListener("keydown", onKeyDown);
			window.addEventListener("resize", onResize);
	
			if (self.config.clickOpens) {
				(self.altInput || self.input).addEventListener("click", self.open);
				(self.altInput || self.input).addEventListener("focus", self.open);
			}
	
			if (self.config.wrap && self.element.querySelector("[data-open]")) {
				self.element.querySelector("[data-open]").addEventListener("click", self.open);
			}
	
			if (self.config.wrap && self.element.querySelector("[data-close]")) {
				self.element.querySelector("[data-close]").addEventListener("click", self.close);
			}
	
			if (self.config.wrap && self.element.querySelector("[data-toggle]")) {
				self.element.querySelector("[data-toggle]").addEventListener("click", self.toggle);
			}
	
			if (self.config.wrap && self.element.querySelector("[data-clear]")) {
				self.element.querySelector("[data-clear]").addEventListener("click", self.clear);
			}
	
			if (!self.config.noCalendar) {
				prevMonthNav.addEventListener("click", function () {
					changeMonth(-1);
				});
	
				nextMonthNav.addEventListener("click", function () {
					changeMonth(1);
				});
	
				currentYearElement.addEventListener("wheel", yearScroll);
				currentYearElement.addEventListener("focus", currentYearElement.select);
	
				currentYearElement.addEventListener("input", function (event) {
					self.currentYear = parseInt(event.target.value, 10);
					self.redraw();
				});
	
				calendar.addEventListener("click", selectDate);
			}
	
			document.addEventListener("click", documentClick);
			document.addEventListener("blur", documentClick, true);
	
			if (self.config.enableTime) {
				self.hourElement.addEventListener("wheel", timeWrapper);
				self.minuteElement.addEventListener("wheel", timeWrapper);
	
				self.hourElement.addEventListener("input", timeWrapper);
				self.minuteElement.addEventListener("input", timeWrapper);
	
				self.hourElement.addEventListener("mouseout", updateValue);
				self.minuteElement.addEventListener("mouseout", updateValue);
	
				self.hourElement.addEventListener("change", updateValue);
				self.minuteElement.addEventListener("change", updateValue);
	
				self.hourElement.addEventListener("focus", self.hourElement.select);
				self.minuteElement.addEventListener("focus", self.minuteElement.select);
	
				if (self.config.enableSeconds) {
					self.secondElement.addEventListener("wheel", timeWrapper);
					self.secondElement.addEventListener("input", timeWrapper);
					self.secondElement.addEventListener("mouseout", updateValue);
					self.secondElement.addEventListener("change", updateValue);
					self.secondElement.addEventListener("focus", self.secondElement.select);
				}
	
				if (!self.config.time_24hr) {
					self.amPM.addEventListener("click", amPMToggle);
	
					self.amPM.addEventListener("wheel", amPMToggle);
					self.amPM.addEventListener("mouseout", updateValue);
	
					self.amPM.addEventListener("keydown", function (e) {
						if (e.which === 38 || e.which === 40) {
							amPMToggle(e);
						}
					});
				}
			}
	
			if (document.createEvent) {
				clickEvt = document.createEvent("MouseEvent");
				// without all these args ms edge spergs out
				clickEvt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			} else {
				clickEvt = new MouseEvent("click", {
					view: window,
					bubbles: true,
					cancelable: true
				});
			}
		};
	
		self.open = function () {
			if (self.isOpen || (self.altInput || self.input).disabled || self.config.inline) {
				return;
			} else if (!self.config.static) {
				self.positionCalendar();
			}
	
			self.isOpen = true;
	
			wrapperElement.classList.add("open");
	
			if (!self.config.allowInput) {
				(self.altInput || self.input).blur();
				(self.config.noCalendar ? timeContainer : calendar).focus();
			}
	
			(self.altInput || self.input).classList.add("active");
	
			if (self.config.onOpen) {
				self.config.onOpen(self.selectedDateObj, self.input.value);
			}
		};
	
		// For calendars inserted in BODY (as opposed to inline wrapper)
		// it"s necessary to properly calculate top/left position.
		self.positionCalendar = function () {
			var calendarHeight = calendarContainer.offsetHeight,
			    input = self.altInput || self.input,
			    inputBounds = input.getBoundingClientRect(),
			    distanceFromBottom = window.innerHeight - inputBounds.bottom + input.offsetHeight;
	
			var top = void 0,
			    left = window.pageXOffset + inputBounds.left;
	
			if (distanceFromBottom < calendarHeight) {
				top = window.pageYOffset - calendarHeight + inputBounds.top - 2;
				calendarContainer.classList.remove("arrowTop");
				calendarContainer.classList.add("arrowBottom");
			} else {
				top = window.pageYOffset + input.offsetHeight + inputBounds.top + 2;
				calendarContainer.classList.remove("arrowBottom");
				calendarContainer.classList.add("arrowTop");
			}
	
			wrapperElement.style.top = top + "px";
			wrapperElement.style.left = left + "px";
		};
	
		self.toggle = function () {
			if (self.isOpen) {
				self.close();
			} else {
				self.open();
			}
		};
	
		self.close = function () {
			self.isOpen = false;
			wrapperElement.classList.remove("open");
			(self.altInput || self.input).classList.remove("active");
	
			if (self.config.onClose) {
				self.config.onClose(self.selectedDateObj, self.input.value);
			}
		};
	
		self.clear = function () {
			self.input.value = "";
	
			if (self.altInput) {
				self.altInput.value = "";
			}
	
			self.selectedDateObj = null;
	
			triggerChange();
			self.jumpToDate();
		};
	
		triggerChange = function triggerChange() {
			self.input.dispatchEvent(clickEvt);
	
			if (self.config.onChange) {
				self.config.onChange(self.selectedDateObj, self.input.value);
			}
		};
	
		self.destroy = function () {
			document.removeEventListener("click", documentClick, false);
	
			if (self.altInput) {
				self.altInput.parentNode.removeChild(self.altInput);
			}
	
			if (self.config.inline) {
				var parent = self.element.parentNode,
				    removedElement = parent.removeChild(self.element);
	
				parent.removeChild(calendarContainer);
				parent.parentNode.replaceChild(removedElement, parent);
			} else {
				document.getElementsByTagName("body")[0].removeChild(wrapperElement);
			}
		};
	
		self.redraw = function () {
			if (self.config.noCalendar) {
				return;
			}
	
			updateNavigationCurrentMonth();
			buildDays();
		};
	
		self.jumpToDate = function (jumpDate) {
			jumpDate = uDate(jumpDate || self.selectedDateObj || self.config.defaultDate || self.config.minDate || now);
	
			self.currentYear = jumpDate.getFullYear();
			self.currentMonth = jumpDate.getMonth();
			self.redraw();
		};
	
		self.setDate = function (date, triggerChangeEvent) {
			date = uDate(date);
	
			if (date instanceof Date && date.getTime()) {
				self.selectedDateObj = uDate(date);
				self.jumpToDate(self.selectedDateObj);
				updateValue();
	
				if (triggerChangeEvent) {
					triggerChange();
				}
			}
		};
	
		self.setTime = function (hour, minute, triggerChangeEvent) {
			if (!self.selectedDateObj) {
				return;
			}
	
			self.hourElement.value = parseInt(hour, 10) % 24;
			self.minuteElement.value = parseInt(minute || 0, 10) % 60;
	
			if (!self.config.time_24hr) {
				self.amPM.innerHTML = hour > 11 ? "PM" : "AM";
			}
	
			updateValue();
	
			if (triggerChangeEvent) {
				triggerChange();
			}
		};
	
		self.set = function (key, value) {
			if (key in self.config) {
				self.config[key] = value;
				self.jumpToDate();
			}
		};
	
		amPMToggle = function amPMToggle(e) {
			e.preventDefault();
			self.amPM.textContent = ["AM", "PM"][self.amPM.innerHTML === "AM" | 0];
		};
	
		onKeyDown = function onKeyDown(e) {
			if (!self.isOpen || self.config.enableTime && timeContainer.contains(e.target)) {
				return;
			}
	
			switch (e.which) {
				case 13:
					selectDate(e);
					break;
	
				case 27:
					self.close();
					break;
	
				case 37:
					changeMonth(-1);
					break;
	
				case 38:
					e.preventDefault();
					self.currentYear++;
					self.redraw();
					break;
	
				case 39:
					changeMonth(1);
					break;
	
				case 40:
					e.preventDefault();
					self.currentYear--;
					self.redraw();
					break;
	
				default:
					break;
			}
		};
	
		onResize = debounce(function () {
			if (self.isOpen && !self.config.inline && !self.config.static) {
				self.positionCalendar();
			}
		}, 300);
	
		try {
			init();
		} catch (error) {
			// skip and carry on
			console.error(error);
			console.info(self.element);
		}
	
		return self;
	};
	
	flatpickr.init.prototype = {
	
		defaultConfig: {},
	
		l10n: {
			weekdays: {
				shorthand: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
				longhand: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
			},
			months: {
				shorthand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
				longhand: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			},
			daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			firstDayOfWeek: 0,
			ordinal: function ordinal(nth) {
				var s = nth % 100;
				if (s > 3 && s < 21) return "th";
				switch (s % 10) {
					case 1:
						return "st";
					case 2:
						return "nd";
					case 3:
						return "rd";
					default:
						return "th";
				}
			},
			weekAbbreviation: "Wk",
			scrollTitle: "Scroll to increment",
			toggleTitle: "Click to toggle"
		}
	
	};
	
	Date.prototype.fp_incr = function (days) {
		return new Date(this.getFullYear(), this.getMonth(), this.getDate() + parseInt(days, 10));
	};
	
	Date.prototype.fp_isUTC = false;
	Date.prototype.fp_toUTC = function () {
		var newDate = new Date(this.getTime() + this.getTimezoneOffset() * 60000);
		newDate.fp_isUTC = true;
	
		return newDate;
	};
	
	Date.prototype.fp_getWeek = function () {
		var date = new Date(this.getTime());
		date.setHours(0, 0, 0, 0);
	
		// Thursday in current week decides the year.
		date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
		// January 4 is always in week 1.
		var week1 = new Date(date.getFullYear(), 0, 4);
		// Adjust to Thursday in week 1 and count number of weeks from date to week1.
		return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
	};
	
	// classList polyfill
	if (!("classList" in document.documentElement) && Object.defineProperty && typeof HTMLElement !== "undefined") {
		Object.defineProperty(HTMLElement.prototype, "classList", {
			get: function get() {
				var selfElements = this;
				function update(fn) {
					return function (value) {
						var classes = selfElements.className.split(/\s+/);
						var index = classes.indexOf(value);
	
						fn(classes, index, value);
						selfElements.className = classes.join(" ");
					};
				}
	
				var ret = {
					add: update(function (classes, index, value) {
						return ~index || classes.push(value);
					}),
					remove: update(function (classes, index) {
						return ~index && classes.splice(index, 1);
					}),
					toggle: update(function (classes, index, value) {
						if (~index) {
							classes.splice(index, 1);
						} else {
							classes.push(value);
						}
					}),
					contains: function contains(value) {
						return !! ~selfElements.className.split(/\s+/).indexOf(value);
					}
				};
	
				return ret;
			}
		});
	}
	
	if (true) {
		module.exports = flatpickr;
	}

/***/ },
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/PersonManage/PersonDetail',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,UserName=$data.UserName,LoginId=$data.LoginId,Gender=$data.Gender,RoleName=$data.RoleName,SchoolName=$data.SchoolName,EnterTime=$data.EnterTime,Tel=$data.Tel,$out='';$out+=' <div class="font18" style="height:85px;line-height:85px;"> <span style="margin-left:27px;" id="perName">';
	$out+=$escape(UserName);
	$out+='</span> </div> <div> <span class="mr20"><span class="white">姓名</span>姓名:</span> <span id="perName0">';
	$out+=$escape(UserName);
	$out+='</span> </div> <div class="mt20"> <span class="mr20"><span class="white">账号</span>账号:</span> <span id="perLoginId"> ';
	$out+=$escape(LoginId);
	$out+='</span> </div> <div class="mt20"> <span class="mr20"><span class="white">性别</span>性别:</span> ';
	if(Gender==1){
	$out+=' <span > 男</span> ';
	}else{
	$out+=' <span > 女</span> ';
	}
	$out+=' </div> <div class="mt20"> <span class="mr20"><span class="white">角色</span>角色:</span> <span id="perRoleName">';
	$out+=$escape(RoleName);
	$out+='</span> </div> <div class="mt20"> <span class="mr20">管理校区:</span> <span id="perScName">';
	$out+=$escape(SchoolName);
	$out+='</span> </div> <div class="mt20"> <span class="mr20">入职时间:</span> <span id="perEnterTime">';
	$out+=$escape(EnterTime);
	$out+='</span> </div> <div class="mt20"> <span class="mr20"><span class="white">手机</span>手机:</span> <span id="perTel"> ';
	$out+=$escape(Tel);
	$out+='</span> </div>';
	return new String($out);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy9iYWNrU3RhZ2UvcGVyc29uLW1lc2cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi91dGlsLmpzP2I5OTIqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC90ZW1wbGF0ZS1oZWxwZXJzLmpzPzE5NDMqKioqIiwid2VicGFjazovLy8uL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzPzg5NjYqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvcG9wdXAvcG9wdXB0aXAuanM/ZTE4YioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9wb3B1cC9zaG93bG9hZGltZy5qcz83MzM0KiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL3BhZ2UvUGFnaW5hdG9yLmpzP2NhNTkqIiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvY2FsZW5kYXIvY2FsZW5kZXItcGx1Z2luLmpzP2M3NzYqIiwid2VicGFjazovLy8uL3NyYy90cGwvUGVyc29uTWFuYWdlL1BlcnNvbkRldGFpbC50cGwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBdUM7QUFDdkM7QUFDQTtBQUNBLGlEQUFpRTtBQUNqRTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNCQUFxQjtBQUNyQjtBQUNBOzs7O0FBSUE7QUFDQSxjQUFhOzs7QUFHYixVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBaUI7QUFDakI7O0FBRUE7QUFDQTs7QUFFQSxzQkFBcUI7QUFDckI7QUFDQTs7OztBQUlBO0FBQ0EsY0FBYTs7O0FBR2IsVUFBUzs7OztBQUlUO0FBQ0E7QUFDQSx5Q0FBd0M7QUFDeEMsVUFBUzs7Ozs7QUFLVDs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FBSUEsRUFBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7Ozs7Ozs7Ozs7Ozs7QUMzSkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLO0FBQ0wsaUNBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EsTUFBSztBQUNMLGtDQUFpQyxFQUFFLFlBQVk7QUFDL0M7QUFDQSxFOzs7Ozs7QUNuRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELHVDQUFzQyxXQUFXLEM7Ozs7OztBQzdKakQsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQSx5Q0FBd0MsT0FBTywyQkFBMkI7QUFDMUU7O0FBRUE7QUFDQTtBQUNBLHNDQUFxQyxZQUFZO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQSwwQkFBeUIsaUVBQWlFO0FBQzFGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBLGFBQVksZUFBZTtBQUMzQixrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXFCO0FBQ3JCLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsR0FBRTtBQUNGLGtDQUFpQztBQUNqQyxJQUFHO0FBQ0gsZUFBYztBQUNkO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGLEVBQUMsRzs7Ozs7O0FDOUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTCxtTEFBa0w7O0FBRWxMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSzs7QUFFTCxtTEFBa0w7O0FBRWxMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBMQUF5TDs7QUFFekw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0wsNE1BQTJNLE1BQU0sTUFBTTtBQUN2TjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUE4RCwrRkFBK0YsbUJBQW1CO0FBQ2hMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzSUFBcUksNEhBQTRILGtCQUFrQixpREFBaUQ7QUFDcFU7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMLHNDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDtBQUNBLGtJQUFpSSxtSEFBbUgsa0JBQWtCLGlEQUFpRDtBQUN2VDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0tBQXVLLHdEQUF3RCxnQkFBZ0I7QUFDL087QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDtBQUNBLDZLQUE0SyxXQUFXLDhDQUE4QztBQUNyTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0wsNk1BQTRNLE1BQU0sTUFBTTtBQUN4TjtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLOzs7O0FBSUwsRUFBQzs7Ozs7Ozs7QUMvT0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQyxrQkFBa0IsYUFBYSw2QkFBNkIsdUZBQXVGLGlCQUFpQjtBQUMxTTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxtREFBa0Q7QUFDbEQ7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBLHNGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWlFLEVBQUUsK0NBQStDO0FBQ2xIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXVDLFFBQVE7QUFDL0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7O0FBRUEsd0NBQXVDLFFBQVE7QUFDL0M7QUFDQTtBQUNBLGtHQUFpRztBQUNqRztBQUNBLHdJQUF1STtBQUN2STs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdDQUF1QyxRQUFRO0FBQy9DOztBQUVBLGtHQUFpRztBQUNqRyxrSUFBaUk7QUFDakk7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW1DLGdCQUFnQjtBQUNuRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCOzs7QUFHakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBK0M7O0FBRS9DLGlFQUFnRSxFQUFFO0FBQ2xFO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTs7O0FBR0E7Ozs7Ozs7O0FDakxBOztBQUVBLHFHQUFvRyxtQkFBbUIsRUFBRSxtQkFBbUIsa0dBQWtHOztBQUU5TztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBLGlCQUFnQixxQkFBcUI7QUFDckM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtRUFBa0UsYUFBYTtBQUMvRTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1CQUFrQjtBQUNsQixtQkFBa0I7O0FBRWxCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsS0FBSTtBQUNKO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxLQUFJLHlCQUF5QixJQUFJO0FBQ2pDO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRztBQUNIO0FBQ0Esa0VBQWlFO0FBQ2pFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFpQix5QkFBeUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMENBQXlDOztBQUV6QztBQUNBOztBQUVBOztBQUVBLGtCQUFpQixrQkFBa0I7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLFNBQVEsNEJBQTRCO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHNCQUFxQiwwQkFBMEI7QUFDL0M7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBb0MsNkJBQTZCO0FBQ2pFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQWtCOztBQUVsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7Ozs7Ozs7QUNoekNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsc09BQXNPLCtDQUErQyxpQkFBaUIsaUNBQWlDO0FBQ3BWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFIiwiZmlsZSI6ImJhY2tTdGFnZS9wZXJzb24tbWVzZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwiXHJcbi8v5ZCO5Y+w5Lqk5LqSXHJcbnJlcXVpcmUoXCIuLi8uLi90cGwvdGVtcGxhdGUtaGVscGVycy5qc1wiKTtcclxudmFyIHBvcCA9IHJlcXVpcmUoXCIuLi9saWIvcG9wdXAvcG9wdXB0aXAuanNcIik7XHJcbnZhciBsb2FkaW1nID0gcmVxdWlyZShcIi4uL2xpYi9wb3B1cC9zaG93bG9hZGltZy5qc1wiKTtcclxudmFyIFBhZ2luYXRvciA9IHJlcXVpcmUoJy4uL2xpYi9wYWdlL1BhZ2luYXRvci5qcycpO1xyXG52YXIgY29tbUpzID0gcmVxdWlyZShcIi4uL2xpYi91dGlsLmpzXCIpOy8v5YWs5YWx5pa55rOVXHJcbnZhciBjYWxlbmRlciA9IHJlcXVpcmUoJy4uL2xpYi9jYWxlbmRhci9jYWxlbmRlci1wbHVnaW4uanMnKTtcclxuLy9yZXF1aXJlKCcuLi9saWIvY2FsZW5kYXIvY2FsZW5kZXItcGx1Z2luLm1pbi5jc3MnKTtcclxudmFyIHRwbFRhYmxlUGVyRGV0YWlsID0gcmVxdWlyZShcIlBlcnNvbk1hbmFnZS9QZXJzb25EZXRhaWwudHBsXCIpOy8v5ZGY5bel5qih5p2/XHJcbnZhciBkYXRhSWQgPSAkKFwiI3BlcklkXCIpLnZhbCgpO1xyXG5cclxuXHJcbnZhciBtb2R1bGUgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy90b2RvIOmAu+i+keWHveaVsFxyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0QnRucygpO1xyXG4gICAgfSxcclxuXHJcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL+WKoOi9vVxyXG4gICAgICAgIEdldFBlclNpbmdsZSgpO1xyXG5cclxuICAgIH0sXHJcbiAgICBpbml0QnRuczogZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAvL+e8lui+kei3s+i9rFxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2J0blBlckVkaXRlXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL09yZy9QZXJzb25NYW5hZ2UvUGVyc29uRWRpdC9cIiArIGRhdGFJZDtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/npoHnlKjlkZjlt6VcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNidG5CYW5kXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgLy9wb3AuT3BlbkNvbmZyaW1Qb3AoXCLnoa7orqTnpoHnlKhcIik7XHJcblxyXG4gICAgICAgICAgICAvL3JldHVybjtcclxuICAgICAgICAgICAgdmFyIHN1YlZhbCA9ICQoXCIjYnRuQmFuZFwiKS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgLy/mj5DkuqTooajljZVcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9PcmcvUGVyc29uTWFuYWdlL1Jlc2V0QWNjb3VudFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwZXJJZDogZGF0YUlkLCB0eXBlOiAxLCB2YWw6IHN1YlZhbFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuRGF0YSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2V0UGVyU2luZ2xlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi5pON5L2c5oiQ5YqfXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuaTjeS9nOWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/ph43nva7lr4bnoIFcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNidG5SZXNldFwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIC8v5o+Q5Lqk6KGo5Y2VXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICAgICAgICAgIHVybDogXCIvT3JnL1BlcnNvbk1hbmFnZS9SZXNldEFjY291bnRcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGVySWQ6IGRhdGFJZCwgdHlwZTogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuRGF0YSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLph43nva7miJDlip9cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi5o+Q5Lqk5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgIFxyXG5cclxuICAgICAgICAvL+WxleekuuWujOeahOehruWumueahOWIoOmZpOW8ueeql1xyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2J0bmxvZ2luT2tcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoXCIuZWctcG9wIC5jbG9zZVwiKS5jbGljaygpOy8v5YWz6Zet5by556qXXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn07XHJcblxyXG4vL+e7keWumuaVsOaNrlxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIG1vZHVsZS5pbml0KCk7XHJcblxyXG5cclxuXHJcbn0pO1xyXG5cclxuXHJcbi8v5Y+R6YCB6K+35rGC6LCD5Y+W5pWw5o2uXHJcbmZ1bmN0aW9uIEdldFBlclNpbmdsZSgpIHtcclxuICAgIGRlYnVnZ2VyO1xyXG4gICAgLy/liqDovb3liJfooahcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvUGVyc29uTWFuYWdlL0dldFBlclNpbmdsZVwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGRhdGE6IGRhdGFJZC8v5ZGY5belaWRcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgLy8kKFwiI2RpdkxvYWRpbmdcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5PSykge1xyXG5cclxuICAgICAgICAgICAgICAgICQoXCIjcGVyVGJcIikuaHRtbCh0cGxUYWJsZVBlckRldGFpbChkYXRhLkRhdGEpKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLkRhdGEuSXNGcm96ZW49PTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2J0bkJhbmRcIikuaHRtbChcIuWQr+eUqFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2J0bkJhbmRcIikuYXR0cihcImRhdGEtaWRcIiwwKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNidG5CYW5kXCIpLmh0bWwoXCLnpoHnlKhcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNidG5CYW5kXCIpLmF0dHIoXCJkYXRhLWlkXCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAkKFwiI3BlclRiXCIpLmh0bWwoXCJcIik7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuiOt+WPluaVsOaNruWksei0pVwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9iYWNrU3RhZ2UvcGVyc29uLW1lc2cuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAyMyIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgY2hlY2tOdW06IGZ1bmN0aW9uIChldmVudCkge1xyXG5cclxuICAgICAgICB2YXIga2V5bnVtID0gZXZlbnQua2V5Q29kZTtcclxuICAgICAgICBpZiAoKGtleW51bSA+PSA0OCAmJiBrZXludW0gPD0gNTcpKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiQ3V0XCIsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgdmFyIG5UID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcclxuICAgICAgICAgICAgLy/nrKzkuIDkuKrkuI3og73ovpPlhaUwXHJcbiAgICAgICAgICAgIGlmICgoblQgPT0gXCJcIikgJiYga2V5bnVtID09IDQ4KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgZWxzZSBpZiAoblQubGVuZ3RoID4gMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbWF0Y2hOdW06IGZ1bmN0aW9uICh0KSB7XHJcbiAgICAgICAgdC52YWx1ZSA9IHQudmFsdWUudHJpbXRleHQoJy4nKTtcclxuICAgIH0sXHJcbiAgICBjaGVja0Zsb2F0OiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAvL3ZhciBzY29yZSA9IHRoaXMudG90YWxTb3JlO1xyXG4gICAgICAgIHZhciBrZXludW0gPSBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coa2V5bnVtKTtcclxuICAgICAgICBpZiAoKGtleW51bSA+PSA0OCAmJiBrZXludW0gPD0gNTcpIHx8IChrZXludW0gPT0gNDYpKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiQ3V0XCIsIGZhbHNlLCB0cnVlKTtcclxuICAgICAgICAgICAgdmFyIG5UID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcclxuICAgICAgICAgICAgLy/nrKzkuIDkuKrlrZfnrKbkuI3og73kuLrlsI/mlbDngrnvvIzkuI3og73ph43lpI3ovpPlhaXlsI/mlbDngrlcclxuICAgICAgICAgICAgaWYgKChuVCA9PSBcIlwiIHx8IG5ULmluZGV4T2YoXCIuXCIpID4gLTEpICYmIGtleW51bSA9PSA0NilcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8v5bCP5pWw54K55ZCO5L+d55WZ5LiA5L2NXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5ULmxlbmd0aCA+IDIgJiYgblQuaW5kZXhPZihcIi5cIikgPT0gblQubGVuZ3RoIC0gMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLzDlkI7pnaLlj6rog73ovpPlhaXlsI/mlbDngrlcclxuICAgICAgICAgICAgZWxzZSBpZiAoblQgPT0gXCIwXCIgJiYga2V5bnVtICE9IDQ2KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy/kuInkvY3mlbDlkI7lj6rog73ovpPlhaXlsI/mlbDngrlcclxuICAgICAgICAgICAgZWxzZSBpZiAoblQubGVuZ3RoID09IDMgJiYgblQuaW5kZXhPZihcIi5cIikgPCAwICYmIGtleW51bSAhPSA0NilcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoblQubGVuZ3RoID4gNCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9LFxyXG4gICAgbnVtR3JhZGVUcmFuOiBmdW5jdGlvbiAodCkgeyAvL+aVsOWtl+W5tOe6p+i9rOaNolxyXG4gICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgIHN3aXRjaCAodCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLkuIDlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5LqM5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuS4ieW5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLlm5vlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5LqU5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgNjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuWFreW5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLkuIPlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5YWr5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgOTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuS5neW5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi6auY5LiAXCI7XHJcbiAgICAgICAgICAgIGNhc2UgMTE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLpq5jkuoxcIjtcclxuICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIumrmOS4iVwiO1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH0sIElzTW9iaWxlOiBmdW5jdGlvbih0KSB7XHJcbiAgICAgICAgcmV0dXJuICgvXjFbM3w0fDV8N3w4XVxcZHs5fSQvLnRlc3QodCkpOy8v5qCh6aqM5omL5py655qE5qC85byPXHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9saWIvdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDQgMTIgMTMgMjEgMjMgMjcgMjgiLCIvL3ZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUnKTtcclxudmFyIHRlbXBsYXRlID0gcmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XHJcblxyXG4vKiogXHJcbiAqIOWvueaXpeacn+i/m+ihjOagvOW8j+WMlu+8jCBcclxuICogQHBhcmFtIGRhdGUg6KaB5qC85byP5YyW55qE5pel5pyfIFxyXG4gKiBAcGFyYW0gZm9ybWF0IOi/m+ihjOagvOW8j+WMlueahOaooeW8j+Wtl+espuS4slxyXG4gKiAgICAg5pSv5oyB55qE5qih5byP5a2X5q+N5pyJ77yaIFxyXG4gKiAgICAgeTrlubQsIFxyXG4gKiAgICAgTTrlubTkuK3nmoTmnIjku70oMS0xMiksIFxyXG4gKiAgICAgZDrmnIjku73kuK3nmoTlpKkoMS0zMSksIFxyXG4gKiAgICAgaDrlsI/ml7YoMC0yMyksIFxyXG4gKiAgICAgbTrliIYoMC01OSksIFxyXG4gKiAgICAgczrnp5IoMC01OSksIFxyXG4gKiAgICAgUzrmr6vnp5IoMC05OTkpLFxyXG4gKiAgICAgcTrlraPluqYoMS00KVxyXG4gKiBAcmV0dXJuIFN0cmluZ1xyXG4gKiBAYXV0aG9yIHlhbmlzLndhbmdcclxuICogQHNlZVx0aHR0cDovL3lhbmlzd2FuZy5jb20vZnJvbnRlbmQvMjAxMy8wMi8xNi9kYXRlZm9ybWF0LXBlcmZvcm1hbmNlL1xyXG4gKi9cclxuXHJcbi8v5pe26Ze06L2s5o2iXHJcbnRlbXBsYXRlLmhlbHBlcignZGF0ZUZvcm1hdCcsIGZ1bmN0aW9uIChkYXRlLCBmb3JtYXQpIHtcclxuICAgIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludChkYXRlLnJlcGxhY2UoXCIvRGF0ZShcIiwgXCJcIikucmVwbGFjZShcIikvXCIsIFwiXCIpLCAxMCkpO1xyXG4gICAgLy9yZXR1cm4gZGF0ZS5nZXREYXRlKCk7XHJcbiAgIC8vZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG5cclxuICAgIHZhciBtYXAgPSB7XHJcbiAgICAgICAgXCJ5XCI6IGRhdGUuZ2V0WWVhcigpLFxyXG4gICAgICAgIFwiTVwiOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vSBcclxuICAgICAgICBcImRcIjogZGF0ZS5nZXREYXRlKCksIC8v5pelIFxyXG4gICAgICAgIFwiaFwiOiBkYXRlLmdldEhvdXJzKCksIC8v5bCP5pe2IFxyXG4gICAgICAgIFwibVwiOiBkYXRlLmdldE1pbnV0ZXMoKSwgLy/liIYgXHJcbiAgICAgICAgXCJzXCI6IGRhdGUuZ2V0U2Vjb25kcygpLCAvL+enkiBcclxuICAgICAgICBcInFcIjogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqYgXHJcbiAgICAgICAgXCJTXCI6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLy/mr6vnp5IgXHJcbiAgICB9O1xyXG4gICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoLyhbeU1kaG1zcVNdKSsvZywgZnVuY3Rpb24oYWxsLCB0KXtcclxuICAgICAgICB2YXIgdiA9IG1hcFt0XTtcclxuICAgICAgICBpZih2ICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBpZihhbGwubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgICAgICB2ID0gJzAnICsgdjtcclxuICAgICAgICAgICAgICAgIHYgPSB2LnN1YnN0cih2Lmxlbmd0aC0yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0ID09PSAneScpe1xyXG4gICAgICAgICAgICByZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIGFsbC5sZW5ndGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYWxsO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gZm9ybWF0O1xyXG59KTtcclxuXHJcbi8v5oiq5a2X5aSE55CGXHJcbnRlbXBsYXRlLmhlbHBlcignY3V0Y2hhcicsIGZ1bmN0aW9uIChvYmosIGNoYXJsZW5ndGgpIHtcclxuXHJcbiAgICBpZiAob2JqID09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIGlmIChvYmoubGVuZ3RoID4gcGFyc2VJbnQoY2hhcmxlbmd0aCkpIHtcclxuICAgICAgICBvYmogPSBvYmouc3Vic3RyaW5nKDAsIHBhcnNlSW50KGNoYXJsZW5ndGgpKSArIFwiLi4uXCI7XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuICAgIHJldHVybiBvYmo7XHJcblxyXG59KTtcclxuXHJcbi8v5pWZ56CU6K+E57qnXHJcbnRlbXBsYXRlLmhlbHBlcignVGVhY2hUeXBlVHJhbicsIGZ1bmN0aW9uIChvYmopIHtcclxuXHJcbiAgICBpZiAob2JqID09IDEpIHtcclxuICAgICAgICByZXR1cm4gXCJB57qnXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBcIkLnuqdcIjtcclxuICAgIH1cclxufSk7XHJcblxyXG4vL+WQiOWQjOacn+mZkOi9rOaNolxyXG50ZW1wbGF0ZS5oZWxwZXIoJ0h0UXgnLCBmdW5jdGlvbiAob2JqKSB7XHJcblxyXG4gICAgcmV0dXJuIHRlbXBsYXRlLmhlbHBlcihvYmopICsgXCLlubRcIjtcclxufSk7XHJcblxyXG4vL+W5tOe6p1xyXG50ZW1wbGF0ZS5oZWxwZXIoJ0dldEJpZ0dyYWRlJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHJldHVybiBlID09IDEgPyBcIuS4gOW5tOe6p1wiXHJcbiAgICAgICAgOiBlID09IDIgPyBcIuS6jOW5tOe6p1wiXHJcbiAgICAgICAgOiBlID09IDMgPyBcIuS4ieW5tOe6p1wiXHJcbiAgICAgICAgOiBlID09IDQgPyBcIuWbm+W5tOe6p1wiXHJcbiAgICAgICAgOiBlID09IDUgPyBcIuS6lOW5tOe6p1wiXHJcbiAgICAgICAgOiBlID09IDYgPyBcIuWFreW5tOe6p1wiXHJcbiAgICAgICAgOiBlID09IDcgPyBcIuS4g+W5tOe6p1wiXHJcbiAgICAgICAgOiBlID09IDggPyBcIuWFq+W5tOe6p1wiXHJcbiAgICAgICAgOiBlID09IDkgPyBcIuS5neW5tOe6p1wiXHJcbiAgICAgICAgIDogZSA9PSAxMCA/IFwi6auY5LiAXCJcclxuICAgICAgICA6IGUgPT0gMTEgPyBcIumrmOS6jFwiXHJcbiAgICAgICAgOiBlID09IDEyID8gXCLpq5jkuIlcIlxyXG4gICAgICAgIDogXCJcIjtcclxuXHJcbn0pO1xyXG5cclxuXHJcbi8v5aSn5YaZ55qE6L2s5o2iXHJcbnRlbXBsYXRlLmhlbHBlcignR2V0QmlnVycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICByZXR1cm4gZSA9PSAxID8gXCLkuIBcIlxyXG4gICAgICAgIDogZSA9PSAyID8gXCLkuoxcIlxyXG4gICAgICAgIDogZSA9PSAzID8gXCLkuIlcIlxyXG4gICAgICAgIDogZSA9PSA0ID8gXCLlm5tcIlxyXG4gICAgICAgIDogZSA9PSA1ID8gXCLkupRcIlxyXG4gICAgICAgIDogZSA9PSA2ID8gXCLlha1cIlxyXG4gICAgICAgIDogZSA9PSA3ID8gXCLkuINcIlxyXG4gICAgICAgIDogZSA9PSA4ID8gXCLlhatcIlxyXG4gICAgICAgIDogZSA9PSA5ID8gXCLkuZ1cIlxyXG4gICAgICAgIDogZSA9PSAxMCA/IFwi5Y2BXCJcclxuICAgICAgICA6IGUgPT0gMTEgPyBcIuWNgeS4gFwiXHJcbiAgICAgICAgOiBlID09IDEyID8gXCLljYHkuoxcIlxyXG4gICAgICAgIDogZSA9PSAxMyA/IFwi5Y2B5LiJXCJcclxuICAgICAgICA6IGUgPT0gMTQgPyBcIuWNgeWbm1wiXHJcbiAgICAgICAgOiBlID09IDE1ID8gXCLljYHkupRcIlxyXG4gICAgICAgIDogZSA9PSAxNiA/IFwi5Y2B5YWtXCJcclxuICAgICAgICA6IGUgPT0gMTcgPyBcIuWNgeS4g1wiXHJcbiAgICAgICAgOiBlID09IDE4ID8gXCLljYHlhatcIlxyXG4gICAgICAgIDogZSA9PSAxOSA/IFwi5Y2B5LmdXCJcclxuICAgICAgICA6IGUgPT0gMjAgPyBcIuS6jOWNgVwiXHJcbiAgICAgICAgOiBlID09IDIxID8gXCLkuozljYHkuIBcIlxyXG4gICAgICAgIDogZSA9PSAyMiA/IFwi5LqM5Y2B5LqMXCJcclxuICAgICAgICA6IGUgPT0gMjMgPyBcIuS6jOWNgeS4iVwiXHJcbiAgICAgICAgOiBlID09IDI0ID8gXCLkuozljYHlm5tcIlxyXG4gICAgICAgIDogZSA9PSAyNSA/IFwi5LqM5Y2B5LqUXCJcclxuICAgICAgICA6IGUgPT0gMjYgPyBcIuS6jOWNgeWFrVwiXHJcbiAgICAgICAgOiBlID09IDI3ID8gXCLkuozljYHkuINcIlxyXG4gICAgICAgIDogZSA9PSAyOCA/IFwi5LqM5Y2B5YWrXCJcclxuICAgICAgICA6IGUgPT0gMjkgPyBcIuS6jOWNgeS5nVwiXHJcbiAgICAgICAgOiBlID09IDMwID8gXCLkuInljYFcIlxyXG4gICAgICAgIDogZSA9PSAzMSA/IFwi5LiJ5Y2B5LiAXCJcclxuICAgICAgICA6IGUgPT0gMzIgPyBcIuS4ieWNgeS6jFwiXHJcbiAgICAgICAgOiBlID09IDMzID8gXCLkuInljYHkuIlcIlxyXG4gICAgICAgIDogZSA9PSAzNCA/IFwi5LiJ5Y2B5ZubXCJcclxuICAgICAgICA6IGUgPT0gMzUgPyBcIuS4ieWNgeS6lFwiXHJcbiAgICAgICAgOiBlID09IDM2ID8gXCLkuInljYHlha1cIlxyXG4gICAgICAgIDogZSA9PSAzNyA/IFwi5LiJ5Y2B5LiDXCJcclxuICAgICAgICA6IGUgPT0gMzggPyBcIuS4ieWNgeWFq1wiXHJcbiAgICAgICAgOiBlID09IDM5ID8gXCLkuInljYHkuZ1cIlxyXG4gICAgICAgIDogZSA9PSA0MCA/IFwi5Zub5Y2BXCJcclxuICAgICAgICA6IGUgPT0gNDEgPyBcIuWbm+WNgeS4gFwiXHJcbiAgICAgICAgOiBlID09IDQyID8gXCLlm5vljYHkuoxcIlxyXG4gICAgICAgIDogZSA9PSA0MyA/IFwi5Zub5Y2B5LiJXCJcclxuICAgICAgICA6IGUgPT0gNDQgPyBcIuWbm+WNgeWbm1wiXHJcbiAgICAgICAgOiBlID09IDQ1ID8gXCLlm5vljYHkupRcIlxyXG4gICAgICAgIDogZSA9PSA0NiA/IFwi5Zub5Y2B5YWtXCJcclxuICAgICAgICA6IGUgPT0gNDcgPyBcIuWbm+WNgeS4g1wiXHJcbiAgICAgICAgOiBlID09IDQ4ID8gXCLlm5vljYHlhatcIlxyXG4gICAgICAgIDogZSA9PSA0OSA/IFwi5Zub5Y2B5LmdXCJcclxuICAgICAgICA6IGUgPT0gNTAgPyBcIuS6lOWNgVwiXHJcbiAgICAgICAgOiBcIlwiO1xyXG59KTtcclxudGVtcGxhdGUuaGVscGVyKCd0ZXN0JywgZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGU7fSlcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90cGwvdGVtcGxhdGUtaGVscGVycy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDEyIDE3IDE5IDIwIDIxIDIzIDI3IDI4IDQ1IiwiLypUTU9ESlM6e30qL1xyXG4hZnVuY3Rpb24gKCkge1xyXG5cdGZ1bmN0aW9uIGEoYSwgYikge1xyXG5cdFx0cmV0dXJuICgvc3RyaW5nfGZ1bmN0aW9uLy50ZXN0KHR5cGVvZiBiKSA/IGggOiBnKShhLCBiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYihhLCBjKSB7XHJcblx0XHRyZXR1cm4gXCJzdHJpbmdcIiAhPSB0eXBlb2YgYSAmJiAoYyA9IHR5cGVvZiBhLCBcIm51bWJlclwiID09PSBjID8gYSArPSBcIlwiIDogYSA9IFwiZnVuY3Rpb25cIiA9PT0gYyA/IGIoYS5jYWxsKGEpKSA6IFwiXCIpLCBhXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjKGEpIHtcclxuXHRcdHJldHVybiBsW2FdXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkKGEpIHtcclxuXHRcdHJldHVybiBiKGEpLnJlcGxhY2UoLyYoPyFbXFx3I10rOyl8Wzw+XCInXS9nLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZShhLCBiKSB7XHJcblx0XHRpZiAobShhKSlmb3IgKHZhciBjID0gMCwgZCA9IGEubGVuZ3RoOyBkID4gYzsgYysrKWIuY2FsbChhLCBhW2NdLCBjLCBhKTsgZWxzZSBmb3IgKGMgaW4gYSliLmNhbGwoYSwgYVtjXSwgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGYoYSwgYikge1xyXG5cdFx0dmFyIGMgPSAvKFxcLylbXlxcL10rXFwxXFwuXFwuXFwxLywgZCA9IChcIi4vXCIgKyBhKS5yZXBsYWNlKC9bXlxcL10rJC8sIFwiXCIpLCBlID0gZCArIGI7XHJcblx0XHRmb3IgKGUgPSBlLnJlcGxhY2UoL1xcL1xcLlxcLy9nLCBcIi9cIik7IGUubWF0Y2goYyk7KWUgPSBlLnJlcGxhY2UoYywgXCIvXCIpO1xyXG5cdFx0cmV0dXJuIGVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGcoYiwgYykge1xyXG5cdFx0dmFyIGQgPSBhLmdldChiKSB8fCBpKHtmaWxlbmFtZTogYiwgbmFtZTogXCJSZW5kZXIgRXJyb3JcIiwgbWVzc2FnZTogXCJUZW1wbGF0ZSBub3QgZm91bmRcIn0pO1xyXG5cdFx0cmV0dXJuIGMgPyBkKGMpIDogZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaChhLCBiKSB7XHJcblx0XHRpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgYikge1xyXG5cdFx0XHR2YXIgYyA9IGI7XHJcblx0XHRcdGIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBrKGMpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHZhciBkID0galthXSA9IGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBiKGMsIGEpICsgXCJcIlxyXG5cdFx0XHR9IGNhdGNoIChkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGkoZCkoKVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGQucHJvdG90eXBlID0gYi5wcm90b3R5cGUgPSBuLCBkLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gYiArIFwiXCJcclxuXHRcdH0sIGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGkoYSkge1xyXG5cdFx0dmFyIGIgPSBcIntUZW1wbGF0ZSBFcnJvcn1cIiwgYyA9IGEuc3RhY2sgfHwgXCJcIjtcclxuXHRcdGlmIChjKWMgPSBjLnNwbGl0KFwiXFxuXCIpLnNsaWNlKDAsIDIpLmpvaW4oXCJcXG5cIik7IGVsc2UgZm9yICh2YXIgZCBpbiBhKWMgKz0gXCI8XCIgKyBkICsgXCI+XFxuXCIgKyBhW2RdICsgXCJcXG5cXG5cIjtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBcIm9iamVjdFwiID09IHR5cGVvZiBjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IoYiArIFwiXFxuXFxuXCIgKyBjKSwgYlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIGogPSBhLmNhY2hlID0ge30sIGsgPSB0aGlzLlN0cmluZywgbCA9IHtcclxuXHRcdFwiPFwiOiBcIiYjNjA7XCIsXHJcblx0XHRcIj5cIjogXCImIzYyO1wiLFxyXG5cdFx0J1wiJzogXCImIzM0O1wiLFxyXG5cdFx0XCInXCI6IFwiJiMzOTtcIixcclxuXHRcdFwiJlwiOiBcIiYjMzg7XCJcclxuXHR9LCBtID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYSkge1xyXG5cdFx0XHRyZXR1cm4gXCJbb2JqZWN0IEFycmF5XVwiID09PSB7fS50b1N0cmluZy5jYWxsKGEpXHJcblx0XHR9LCBuID0gYS51dGlscyA9IHtcclxuXHRcdCRoZWxwZXJzOiB7fSwgJGluY2x1ZGU6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XHJcblx0XHRcdHJldHVybiBhID0gZihjLCBhKSwgZyhhLCBiKVxyXG5cdFx0fSwgJHN0cmluZzogYiwgJGVzY2FwZTogZCwgJGVhY2g6IGVcclxuXHR9LCBvID0gYS5oZWxwZXJzID0gbi4kaGVscGVycztcclxuXHRhLmdldCA9IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRyZXR1cm4galthLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKV1cclxuXHR9LCBhLmhlbHBlciA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRvW2FdID0gYlxyXG5cdH0sIG1vZHVsZS5leHBvcnRzID0gYVxyXG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEyIDE1IDE2IDE3IDE5IDIwIDIxIDIzIDI3IDI4IDM0IDQwIDQxIDQyIDQzIDQ1IDQ2IDUzIDU0IiwiLy/pga7nvalcclxuZnVuY3Rpb24gTWFza1Nob3coKSB7XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLnNob3coKTtcclxufVxyXG5cclxuZnVuY3Rpb24gTWFza0hpZGUoKSB7XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLmhpZGUoKTtcclxuICAgICQoXCIuYWRkXCIpLmhpZGUoKTtcclxufVxyXG4vL+S8oOmAkuaYvuekuueahOa2iOaBr1xyXG5mdW5jdGlvbiBQb3BUaXBTaG93KG9iaikge1xyXG4gICAgJChcIi5hZGR1cGRcIikuZWFjaChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB2YXIgdGlwaHRtbCA9ICc8ZGl2IGNsYXNzPVwicG9wLXVwIGZvbnQxNCBoaWRkZW4gYWRkdXBkXCIgaWQ9XCJva3RpcFwiPjxzcGFuIGNsYXNzPVwicG9wLWNsb3NlIGN1cnNvclwiPjwvc3Bhbj48ZGl2IGNsYXNzPVwicG9wLWNvbnRlbnRcIj48cCBjbGFzcz1cImxpbmUxMDBcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO1wiPicgKyBvYmogKyAnPC9wPjwvZGl2PjwvZGl2Pic7XHJcblxyXG4gICAgJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5hcHBlbmQodGlwaHRtbCk7XHJcbiAgICAkKFwiI2NvbnRlbnRcIikuYXBwZW5kKHRpcGh0bWwpO1xyXG4gICAgJChcIi5wb3AtbWFza1wiKS5zaG93KCk7XHJcbiAgICAkKFwiLnBvcC11cFwiKS5zaG93KCk7XHJcbn1cclxuXHJcbi8v5Lyg6YCS5pi+56S655qE5raI5oGv5Y+q6K6p5a+55bqU55qEaWTmmL7npLpcclxuZnVuY3Rpb24gUG9wVGlwU2hvd0lkKG9iaikge1xyXG4gICAgJChcIi5hZGR1cGRcIikuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgdGlwaHRtbCA9ICc8ZGl2IGNsYXNzPVwicG9wLXVwIGZvbnQxNCBoaWRkZW4gYWRkdXBkXCIgaWQ9XCJva3RpcFwiPjxzcGFuIGNsYXNzPVwicG9wLWNsb3NlIGN1cnNvclwiPjwvc3Bhbj48ZGl2IGNsYXNzPVwicG9wLWNvbnRlbnRcIj48cCBjbGFzcz1cImxpbmUxMDBcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO1wiPicgKyBvYmogKyAnPC9wPjwvZGl2PjwvZGl2Pic7XHJcblxyXG4gICAgJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5hcHBlbmQodGlwaHRtbCk7XHJcbiAgICAkKFwiI2NvbnRlbnRcIikuYXBwZW5kKHRpcGh0bWwpO1xyXG4gICAgJChcIi5wb3AtbWFza1wiKS5zaG93KCk7XHJcbiAgICAkKFwiI29rdGlwXCIpLnNob3coKTtcclxufVxyXG5cclxuLy/kvKDpgJLmmL7npLrnmoTmtojmga8s5YyF5ZCrRElW5ZCN56ewXHJcbmZ1bmN0aW9uIFBvcFRpcFNob3dCeURpdk5hbWUob2JqKSB7XHJcbiAgICB2YXIgdGlwaHRtbCA9ICc8ZGl2IGNsYXNzPVwicG9wLXVwIGZvbnQxNCBoaWRkZW5cIiBpZD1cImRpdkNvbW1vblBvcFRpcFNob3dcIj48c3BhbiBjbGFzcz1cInBvcC1jbG9zZSBjdXJzb3JcIj48L3NwYW4+PGRpdiBjbGFzcz1cInBvcC1jb250ZW50XCI+PHAgY2xhc3M9XCJsaW5lMTAwXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtcIj4nICsgb2JqICsgJzwvcD48L2Rpdj48L2Rpdj4nO1xyXG5cclxuICAgICQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikuYXBwZW5kKHRpcGh0bWwpO1xyXG4gICAgJChcIiNjb250ZW50XCIpLmFwcGVuZCh0aXBodG1sKTtcclxuICAgICQoXCIucG9wLW1hc2tcIikuc2hvdygpO1xyXG4gICAgJChcIiNkaXZDb21tb25Qb3BUaXBTaG93XCIpLnNob3coKTtcclxufVxyXG5cclxuLy/lvLnlh7rnoa7orqTmoYZcclxudmFyIE9wZW5Db25mcmltUG9wID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgJCgnW2NsYXNzPVwicG9wLXVwIGZvbnQxNFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwicG9wLXVwIGZvbnQxNFwiPjxzcGFuIGNsYXNzPVwicG9wLWNsb3NlIGN1cnNvclwiPjwvc3Bhbj48ZGl2IGNsYXNzPVwicG9wLWNvbnRlbnRcIiA+JyArIG9iaiArICc8L2Rpdj48YnIgLz48YnIgLz48ZGl2IGNsYXNzPVwiaGFuZGxlXCI+IDxzcGFuIGNsYXNzPVwib2tcIiBpZD1cIkNvbmZyaW1cIj7noa7lrpo8L3NwYW4+ICZuYnNwOyZuYnNwOyZuYnNwOzxzcGFuIGNsYXNzPVwib2tcIiBpZD1cIkNhbmNlbFwiPuWPlua2iDwvc3Bhbj4gPC9kaXY+PC9kaXY+JztcclxuICAgIGRlYnVnZ2VyO1xyXG4gICAgJChcIiNjb250ZW50XCIpLmFwcGVuZChodG1sKTtcclxuICAgICQoXCIucG9wLW1hc2tcIikuc2hvdygpO1xyXG4gICAgJChcIi5wb3AtdXBcIikuc2hvdygpO1xyXG59O1xyXG4vL+W8ueWHuuehruiupOahhlxyXG52YXIgb3JnT3BlbkNvbmZyaW1Qb3AgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICB2YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwicG9wLXVwIGZvbnQxNFwiIHN0eWxlPVwiaGVpZ2h0OmF1dG87XCI+PHNwYW4gY2xhc3M9XCJwb3AtY2xvc2UgY3Vyc29yXCI+PC9zcGFuPjxici8+PGRpdiBjbGFzcz1cInBvcC1jb250ZW50XCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW46MzBweCAxMHB4IDA7XCI+JyArIG9iaiArICc8L2Rpdj48YnIgLz48YnIgLz48ZGl2IGNsYXNzPVwiaGFuZGxlXCI+IDxzcGFuIGNsYXNzPVwib2tcIiBpZD1cIkNvbmZyaW1cIj7noa7lrpo8L3NwYW4+IDwvZGl2PjwvZGl2Pic7XHJcbiAgICAkKFwiI2NvbnRlbnRcIikuYXBwZW5kKGh0bWwpO1xyXG4gICAgJChcIi5wb3AtbWFza1wiKS5zaG93KCk7XHJcbiAgICAkKFwiLnBvcC11cFwiKS5zaG93KCk7XHJcbn07XHJcbi8v5by55Ye656Gu6K6k5qGGLOayoeacieWPlua2iOaMiemSrlxyXG52YXIgT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbCA9IGZ1bmN0aW9uIChvYmosdGl0bGUsYnRuaWQpIHtcclxuICAgICQoJ1tjbGFzcz1cInBvcC11cCBmb250MTRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGh0bWwgPSAnJztcclxuICAgIGlmICh0aXRsZSA9PSB1bmRlZmluZWQgfHwgdGl0bGU9PVwiXCIpIHtcclxuICAgICAgICB0aXRsZSA9IFwi6YeN572u5a+G56CBXCI7XHJcbiAgICB9XHJcbiAgICBpZiAoYnRuaWQgPT0gdW5kZWZpbmVkIHx8IGJ0bmlkID09IFwiXCIpIHtcclxuICAgICAgICBidG5pZCA9IFwiQ29uZnJpbVwiO1xyXG4gICAgfVxyXG4gICAgZGVidWdnZXI7XHJcbiAgICBodG1sID0gJzxkaXYgY2xhc3M9XCJteXBvcHVwIGZvbnQxNCBhZGRcIiBpZD1cImRpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIj48aDUgY2xhc3M9XCJjZW50ZXIgZm9udDE2IHBvcHVwaGVhZFwiIHN0eWxlPVwiaGVpZ2h0OjQ1cHg7XCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPicgKyB0aXRsZSArICc8L3NwYW4+PGkgY2xhc3M9XCJwb3BjbG9zZSBjdXJzb3JcIj48L2k+PC9oNT48ZGl2IGNsYXNzPVwicG9wdXBib3hcIiBzdHlsZT1cIm1pbi1oZWlnaHQ6MTIwcHg7dGV4dC1hbGlnbjpjZW50ZXI7XCI+PHNwYW4gY2xhc3M9XCJtdDIwXCIgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj48c3BhbiBjbGFzcz1cImNvbnRlbnRcIj4nICsgb2JqICsgJzwvc3Bhbj48c3Bhbj48ZGl2IGNsYXNzPVwiaGFuZGxlIG10MjBcIj4gPHNwYW4gY2xhc3M9XCJvayBzdWJtaXRcIiBpZD1cIicgKyBidG5pZCArICdcIj7noa7lrpo8L3NwYW4+IDwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICBpZiAoJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5hcHBlbmQoaHRtbCk7XHJcbiAgICB9IGVsc2UgaWYgKCQoXCIjbWFpbi1jb250ZW50XCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKFwiI21haW4tY29udGVudFwiKS5hcHBlbmQoaHRtbCk7XHJcbiAgICB9XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLnNob3coKTtcclxuICAgICQoXCIucG9wLXVwXCIpLnNob3coKTtcclxuICAgICQoXCIjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiKS5maW5kKFwiLnBvcGNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAkKFwiLnBvcC1tYXNrXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnBvcC11cFwiKS5oaWRlKCk7XHJcbiAgICAgICBcclxuICAgIH0pO1xyXG4gICAgJCgnI0NvbmZyaW0nKS5jbGljayhmdW5jdGlvbiAoKSB7Ly/lvKDotormt7vliqDnmoTlh73mlbBcclxuICAgICAgICBpZiAoJCgnLmNvbnRlbnQnKS50ZXh0KCkgIT0gJ+mHjee9ruWvhueggeWQju+8jOivpei0puWPt+WvhueggeWwhuaBouWkjeWIneWni+Wvhuegge+8gScpIHtcclxuICAgICAgICAgICAgJChcIiNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChcIiNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBvcC1tYXNrXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgJChcIi5wb3AtdXBcIikuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH0pXHJcbn07XHJcbnZhciBPcGVuQ29uZnJpbVBvcE5vQ2FuY2UyID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgJCgnW2NsYXNzPVwicG9wLXVwIGZvbnQxNFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgaHRtbCA9ICcnO1xyXG4gICAgaHRtbCA9ICc8ZGl2IGNsYXNzPVwibXlwb3B1cCBmb250MTRcIiBpZD1cImRpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIj48aDUgY2xhc3M9XCJjZW50ZXIgZm9udDE2IHBvcHVwaGVhZFwiIHN0eWxlPVwiaGVpZ2h0OjQ1cHg7XCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPuaPkOekuua2iOaBrzwvc3Bhbj48aSBjbGFzcz1cInBvcGNsb3NlIGN1cnNvclwiPjwvaT48L2g1PjxkaXYgY2xhc3M9XCJwb3B1cGJveFwiIHN0eWxlPVwibWluLWhlaWdodDoxMjBweDt0ZXh0LWFsaWduOmNlbnRlcjtcIj48c3BhbiBjbGFzcz1cIm10MjBcIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO1wiPjxzcGFuIGNsYXNzPVwiY29udGVudFwiPicgKyBvYmogKyAnPC9zcGFuPjxzcGFuPjxkaXYgY2xhc3M9XCJoYW5kbGUgbXQyMFwiPiA8c3BhbiBjbGFzcz1cIm9rIHN1Ym1pdFwiIGlkPVwiQ29uZnJpbVwiPuehruWumjwvc3Bhbj4gPC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgIGlmICgkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikuYXBwZW5kKGh0bWwpO1xyXG4gICAgfSBlbHNlIGlmICgkKFwiI21haW4tY29udGVudFwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJChcIiNtYWluLWNvbnRlbnRcIikuYXBwZW5kKGh0bWwpO1xyXG4gICAgfVxyXG4gICAgJChcIi5wb3AtbWFza1wiKS5zaG93KCk7XHJcbiAgICAkKFwiLnBvcC11cFwiKS5zaG93KCk7XHJcbiAgICAkKFwiI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIikuZmluZChcIi5wb3BjbG9zZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgJChcIi5wb3AtbWFza1wiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wb3AtdXBcIikuaGlkZSgpO1xyXG5cclxuICAgIH0pO1xyXG4gICBcclxufTtcclxuLy8v5by55Ye65aSa6ZW/5pe26Ze05ZCO5raI5aSxXHJcbnZhciBPcGVuVGltZUhpZGUgPSBmdW5jdGlvbiAob2JqLCB0aW1lKSB7XHJcbiAgICAvL3ZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJwb3B1cFwiPiA8aDUgY2xhc3M9XCJjZW50ZXIgZm9udDE2IHBvcHVwaGVhZFwiPua2iOaBr+aPkOekujxpIGNsYXNzPVwicG9wY2xvc2UgY3Vyc29yXCI+PC9pPjwvaDU+PGRpdiBjbGFzcz1cInBvcHVwYm94XCI+PGRpdiBjbGFzcz1cImhhbmRsZSBmb250MTQgYXV0b1wiPicgKyBvYmogKyAnPC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgIHZhciBodG1sID0gJyAgPGRpdiBjbGFzcz1cInBvcHVwIFwiPjxoNSBjbGFzcz1cImNlbnRlciBmb250MTYgcG9wdXBoZWFkXCI+IOa2iOaBr+aPkOekujxpIGNsYXNzPVwicG9wY2xvc2UgY3Vyc29yXCI+PC9pPjwvaDU+PGRpdiBjbGFzcz1cInBvcHVwYm94XCI+PGRpdiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO1wiPjxkaXYgY2xhc3M9XCJzdWNjZXNzIGF1dG9cIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi10b3A6MjBweDtcIj48L2Rpdj48L2Rpdj48ZGl2IGNsYXNzPVwiaGFuZGxlIHN1Y2Nlc3NMZXR0ZXJcIj4gPHNwYW4gY2xhc3M9XCJtdDIwXCI+JytvYmorJzwvc3Bhbj48L2Rpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAkKFwiLnBvcHVwXCIpLnNob3coKTtcclxuICBcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIucG9wdXBcIikuaGlkZSgpO1xyXG4gICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSwgdGltZSk7XHJcblxyXG59O1xyXG5cclxuLy8v5by55Ye65aSa6ZW/5pe26Ze05ZCO5raI5aSxLOWMheWQq0RJVuWQjeensFxyXG52YXIgT3BlblRpbWVIaWRlQnlEaXZOYW1lID0gZnVuY3Rpb24gKG9iaiwgdGltZSwgY29udGFpbnNEaXYpIHtcclxuICAgICQoJ1tjbGFzcz1cInBvcC11cCBmb250MTRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gICAgLy92YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwicG9wdXBcIj4gPGg1IGNsYXNzPVwiY2VudGVyIGZvbnQxNiBwb3B1cGhlYWRcIj7mtojmga/mj5DnpLo8aSBjbGFzcz1cInBvcGNsb3NlIGN1cnNvclwiPjwvaT48L2g1PjxkaXYgY2xhc3M9XCJwb3B1cGJveFwiPjxkaXYgY2xhc3M9XCJoYW5kbGUgZm9udDE0IGF1dG9cIj4nICsgb2JqICsgJzwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICB2YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwicG9wLXVwIGZvbnQxNCBoaWRkZW4gYWRkdXBkXCIgaWQ9XCJkaXZDb21tb25Qb3BPcGVuVGltZUhpZGVcIj48c3BhbiBjbGFzcz1cInBvcC1jbG9zZSBjdXJzb3JcIj48L3NwYW4+PGRpdiBjbGFzcz1cInBvcC1jb250ZW50XCIgIHN0eWxlPVwibWFyZ2luOjMwcHggMDt3aWR0aDphdXRvO1wiPjxwIGNsYXNzPVwibGluZTEwMFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7XCI+JyArIG9iaiArICc8L3A+PC9kaXY+PC9kaXY+JztcclxuICAgICQoXCIjXCIgKyBjb250YWluc0RpdikuYXBwZW5kKGh0bWwpO1xyXG4gICAgJChcIiNkaXZDb21tb25Qb3BPcGVuVGltZUhpZGVcIikuc2hvdygpO1xyXG4gICAgJChcIiNkaXZDb21tb25Qb3BPcGVuVGltZUhpZGVcIikuZmluZChcIi5wb3AtY2xvc2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjZGl2Q29tbW9uUG9wT3BlblRpbWVIaWRlXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2RpdkNvbW1vblBvcE9wZW5UaW1lSGlkZVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCcjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNkaXZDb21tb25Qb3BPcGVuVGltZUhpZGVcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjZGl2Q29tbW9uUG9wT3BlblRpbWVIaWRlXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgIC8vLy8yMDE2MTAyMzE2MTcga2xnXHJcbiAgICAgICAgJChcIi5wb3AtbWFza1wiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wb3AtdXBcIikuaGlkZSgpO1xyXG4gICAgICAgICQoJyNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgLy8gJChcIiNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgIC8vL1xyXG4gICAgICAgIC8vZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9LCB0aW1lKTtcclxuXHJcbn07XHJcblxyXG5mdW5jdGlvbiBQb3BUaXBIaWRlKCkge1xyXG4gICAgJChcIi5wb3AtdXBcIikuaGlkZSgpO1xyXG4gICAgJChcIi5wb3AtbWFza1wiKS5oaWRlKCk7XHJcbiAgICAkKFwiLmFkZFwiKS5oaWRlKCk7XHJcbiAgICBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcclxufVxyXG5cclxuXHJcbi8v5rWL6K+E5qih5Z2XXHJcbnZhciBDb25mcmltRXhhbSA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICQoJ1tjbGFzcz1cInBvcC11cCBmb250MTRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cInBvcC11cCBmb250MTRcIj48c3BhbiBjbGFzcz1cInBvcC1jbG9zZSBjdXJzb3JcIj48L3NwYW4+PGRpdiBjbGFzcz1cInBvcC1jb250ZW50XCI+JyArIG9iaiArICc8L2Rpdj48YnIgLz48YnIgLz48ZGl2IGNsYXNzPVwiaGFuZGxlXCI+IDxzcGFuIGNsYXNzPVwib2tcIiBpZD1cIkNvbmZyaW1cIj7miJHopoHmlL7lvIM8L3NwYW4+ICZuYnNwOyZuYnNwOyZuYnNwOzxzcGFuIGNsYXNzPVwib2tcIiBpZD1cIkNhbmNlbFwiPue7p+e7reS9nOetlDwvc3Bhbj4gPC9kaXY+PC9kaXY+JztcclxuICAgICQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikuYXBwZW5kKGh0bWwpO1xyXG4gICAgJChcIi5wb3AtbWFza1wiKS5zaG93KCk7XHJcbiAgICAkKFwiLnBvcC11cFwiKS5zaG93KCk7XHJcbn07XHJcblxyXG5cclxuXHJcbmV4cG9ydHMuTWFza1Nob3cgPSBNYXNrU2hvdztcclxuZXhwb3J0cy5NYXNrSGlkZSA9IE1hc2tIaWRlO1xyXG5leHBvcnRzLlBvcFRpcFNob3cgPSBQb3BUaXBTaG93O1xyXG5leHBvcnRzLlBvcFRpcFNob3dJZCA9IFBvcFRpcFNob3dJZDsvL+WPquiuqWRpduWvueW6lOeahGlk5pi+56S6XHJcbmV4cG9ydHMuUG9wVGlwSGlkZSA9IFBvcFRpcEhpZGU7XHJcbmV4cG9ydHMuT3BlbkNvbmZyaW1Qb3AgPSBPcGVuQ29uZnJpbVBvcDtcclxuZXhwb3J0cy5PcGVuQ29uZnJpbVBvcE5vQ2FuY2VsID0gT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbDtcclxuZXhwb3J0cy5PcGVuVGltZUhpZGUgPSBPcGVuVGltZUhpZGU7XHJcbmV4cG9ydHMuQ29uZnJpbUV4YW0gPSBDb25mcmltRXhhbTtcclxuZXhwb3J0cy5PcGVuVGltZUhpZGVCeURpdk5hbWUgPSBPcGVuVGltZUhpZGVCeURpdk5hbWU7XHJcbmV4cG9ydHMub3JnT3BlbkNvbmZyaW1Qb3AgPSBvcmdPcGVuQ29uZnJpbVBvcDtcclxuZXhwb3J0cy5PcGVuQ29uZnJpbVBvcE5vQ2FuY2UyID0gT3BlbkNvbmZyaW1Qb3BOb0NhbmNlMjtcclxuLy/lpITnkIblvLnlh7rmoYbnmoTpmpDol49cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmRlbGVnYXRlKFwiLnBvcC1jbG9zZVwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLnBvcC1tYXNrXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnBvcC11cFwiKS5oaWRlKCk7XHJcbiAgICAgICAgLy9kb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikuZGVsZWdhdGUoXCIucG9wY2xvc2VcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5wb3AtbWFza1wiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5hZGRcIikuaGlkZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjb250ZW50XCIpLmRlbGVnYXRlKFwiLnBvcC1jbG9zZVwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLnBvcC1tYXNrXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnBvcC11cFwiKS5oaWRlKCk7XHJcbiAgICAgICAgLy9kb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY29udGVudFwiKS5kZWxlZ2F0ZShcIi5wb3BjbG9zZVwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLnBvcC1tYXNrXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLmFkZFwiKS5oaWRlKCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG5cclxufSk7XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9saWIvcG9wdXAvcG9wdXB0aXAuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiAyMSAyMyAyNyAyOCIsIi8v5by55Ye65Yqg6L295Zu+54mH6ZKI5a+55YiX6KGo5Lyg6YCS5bGF5Lit5Y+C5pWwXHJcbmZ1bmN0aW9uIFNob3dMb2FkaW5nRm9yVGFibGUob2JqLCBudW0pIHtcclxuICAgIGlmIChudW0gPT0gdW5kZWZpbmVkIHx8IG9iaj09dW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgb2JqLmh0bWwoJzx0ciAgc3R5bGU9XCJib3JkZXI6bm9uZTt0ZXh0LWFsaWduOmNlbnRlcjtoZWlnaHQ6MjgwcHg7XCI+PHRkIHN0eWxlPVwiZm9udC1zaXplOiAxNnB4O1wiIGNvbHNwYW49XCInK251bSsnXCI+PGRpdiBjbGFzcz1cImRhdGFfaW1nXCI+PGRpdiBjbGFzcz1cImJpZ19hcmVhXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjEwcHg7bGluZS1oZWlnaHQ6MzBweDtcIj4nK2pRdWVyeShcIiNkaXZMb2FkaW5nXCIpLmh0bWwoKSArJzwvZGl2PjwvZGl2PjwvdGQ+PC90cj4nKTtcclxufVxyXG5cclxuXHJcblxyXG4vL+W8ueWHuuWKoOi9veWbvueJh1xyXG5mdW5jdGlvbiBTaG93TG9hZGluZyhvYmopIHtcclxuICAgIGlmIChvYmogPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgb2JqLmh0bWwoalF1ZXJ5KFwiI2RpdkxvYWRpbmdcIikuaHRtbCgpKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydHMuU2hvd0xvYWRpbmdGb3JUYWJsZSA9IFNob3dMb2FkaW5nRm9yVGFibGU7Ly/pkojlr7l0YWJsZeW4g+WxgOeahFxyXG5leHBvcnRzLlNob3dMb2FkaW5nID0gU2hvd0xvYWRpbmc7XHJcblxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvbGliL3BvcHVwL3Nob3dsb2FkaW1nLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDEyIDIxIDIzIDI3IDI4IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBQYWdpbmF0b3I6IGZ1bmN0aW9uIChwYWdlU2l6ZSwgY3VycmVudFBhZ2UsIHRvdGFsQ291bnQsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgLy90b2RvIOe7keWumuS6i+S7tlxyXG5cclxuICAgICAgICB2YXIgdG90YWxQYWdlcztcclxuICAgICAgICBpZiAodG90YWxDb3VudCAlIHBhZ2VTaXplID09IDApIHtcclxuICAgICAgICAgICAgdG90YWxQYWdlcyA9IHRvdGFsQ291bnQgLyBwYWdlU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRvdGFsUGFnZXMgPSBwYXJzZUludCh0b3RhbENvdW50IC8gcGFnZVNpemUpICsgMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHBhZ2VQcmUgPSAnPGEgaHJlZj1cIiNcIiAgZGF0YS1udW09JyArIChwYXJzZUludChjdXJyZW50UGFnZSkgLSAxKSArICcgY2xhc3M9XCJwcmUtcGFnZSBpbmxpbmUgbXIyMFwiPuS4iuS4gOmhtTwvYT4nO1xyXG4gICAgICAgIHZhciBwYWdlTmV4dCA9ICc8YSBocmVmPVwiI1wiICBkYXRhLW51bT0nICsgKHBhcnNlSW50KGN1cnJlbnRQYWdlKSArIDEpICsgJyBjbGFzcz1cIm5leHQtcGFnZSBpbmxpbmVcIj7kuIvkuIDpobU8L2E+JztcclxuICAgICAgICB2YXIgaW5kZXhQYWdlID0gJzxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPVwiMVwiIGNsYXNzPVwicHJlLXBhZ2UgaW5saW5lIG1yMjBcIj7pppbpobU8L2E+PC9saT4nO1xyXG5cclxuICAgICAgICB2YXIgbGFzdFBhZ2UgPSAnIDxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPScgKyB0b3RhbFBhZ2VzICsgJyBjbGFzcz1cInByZS1wYWdlIGlubGluZSBtcjIwIG1sMjBcIj4g5pyr6aG1PC9hPic7XHJcbiAgICAgICAgaWYgKHRvdGFsUGFnZXMgPCBwYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICAvLyBwYWdlUHJlID0gXCJcIjtcclxuICAgICAgICAgICAgLy9wYWdlTmV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGluZGV4UGFnZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxhc3RQYWdlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjdXJyZW50UGFnZSA8PSAxKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlID0gMTtcclxuICAgICAgICAgICAgcGFnZVByZSA9IFwiXCI7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY3VycmVudFBhZ2UgPj0gdG90YWxQYWdlcykge1xyXG4gICAgICAgICAgICBjdXJyZW50UGFnZSA9IHRvdGFsUGFnZXM7XHJcbiAgICAgICAgICAgIHBhZ2VOZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgbGFzdFBhZ2UgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRvdGFsQ291bnQgPiAwKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgcGFnZW51bSA9ICc8dWwgY2xhc3M9XCJwYWdlLWJveCBpbmxpbmUgbXIyMCBtYjIwXCI+JztcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAodG90YWxQYWdlcyA+IDEpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGFnZSA9PSAxKSAvL+esrOS4gOmhtVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL291dHB1dC5BcHBlbmQoXCIgPGEgZGlzYWJsZWQ9J2Rpc2FibGVkJyBjbGFzcz0nY29sSCc+5LiK5LiA6aG1PC9hPiBcIik7Ly/kuIrkuIDpobVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGFnZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+WkhOeQhummlumhtei/nuaOpVxyXG4gICAgICAgICAgICAgICAgICAgIC8v5aSE55CG5LiK5LiA6aG155qE6L+e5o6lXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYWdlUHJlID0gJyA8bGk+PGEgaHJlZj1cIiNcIiAgZGF0YS1udW09JyArIChwYXJzZUludChjdXJyZW50UGFnZSkgLSAxKSArICc+5LiK5LiA6aG1PC9hPiA8L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gb3V0cHV0LkFwcGVuZEZvcm1hdChcIiA8YSBkYXRhLXBhZ2VJbmRleD0nezB9JyBjbGFzcz0ncGFnZUxpbmsnPuS4iuS4gOmhtTwvYT4gXCIsIGN1cnJlbnRQYWdlIC0gMSk7Ly/kuIrkuIDpobVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0b3RhbFBhZ2VzID4gNykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJyaW50ID0gMztcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBhZ2UgPCA0KS8vNFxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IDY7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlID09IGkgKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYWN0aXZlXCIgZGF0YS1udW09JyArIGN1cnJlbnRQYWdlICsgJz4nICsgY3VycmVudFBhZ2UgKyAnPC9hPiA8L2xpPic7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gNikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiICBkYXRhLW51bT0nICsgNyArICc+Li4uPC9hPiA8L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiAgZGF0YS1udW09JyArIHRvdGFsUGFnZXMgKyAnPicgKyB0b3RhbFBhZ2VzICsgJzwvYT4gPC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiAgZGF0YS1udW09JyArIChpICsgMSkgKyAnPicgKyAoaSArIDEpICsgJzwvYT4gPC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0vLzRcclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjdXJyZW50UGFnZSA+PSA0ICYmIGN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcyAtIDMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IDY7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vcGFnZW51bT1wYWdlbnVtKycgPGxpIGRhdGEtbnVtPScrKGN1cnJlbnRQYWdlLTMpKyc+PGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwiUGFnaW5hdG9yKCcrcGFnZVNpemUrJywnKyhjdXJyZW50UGFnZS0zKSsnLCcgKyB0b3RhbENvdW50ICsgJylcIj4uLi48L2E+IDwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICcgPGxpPjxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPVwiMVwiPjE8L2E+IDwvbGk+JzsvLzIwMTYwOTEzMDkzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZUludChjdXJyZW50UGFnZSkgLSAzID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICcgPGxpPjxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPScgKyAocGFyc2VJbnQoY3VycmVudFBhZ2UpIC0gMykgKyAnPi4uLjwvYT4gPC9saT4nOy8vMjAxNjA5MTMwOTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGkgPT0gMykvL+S4remXtOW9k+WJjemhtVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYWN0aXZlXCIgZGF0YS1udW09JyArIChjdXJyZW50UGFnZSkgKyAnPicgKyBjdXJyZW50UGFnZSArICc8L2E+IDwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGkgPT0gNikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICcgPGxpPjxhIGhyZWY9XCIjXCIgZGF0YS1udW09JyArIChwYXJzZUludChjdXJyZW50UGFnZSkgKyAzKSArICc+Li4uPC9hPiA8L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiICBkYXRhLW51bT0nICsgdG90YWxQYWdlcyArICc+JyArIHRvdGFsUGFnZXMgKyAnPC9hPiA8L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiICBkYXRhLW51bT0nICsgKHBhcnNlSW50KGN1cnJlbnRQYWdlKSArIGkgLSBwYXJzZUludChjdXJyaW50KSkgKyAnPicgKyAocGFyc2VJbnQoY3VycmVudFBhZ2UpICsgaSAtIHBhcnNlSW50KGN1cnJpbnQpKSArICc8L2E+IDwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IDY7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICcgPGxpPjxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPVwiMVwiPjE8L2E+IDwvbGk+JzsvLzIwMTYwOTEzMDkzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiBkYXRhLW51bT0nICsgKHBhcnNlSW50KHRvdGFsUGFnZXMpIC0gNikgKyAnPi4uLjwvYT4gPC9saT4nOy8vMjAxNjA5MTMwOTMwXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG90YWxQYWdlcyAtIDYgKyBpID09IGN1cnJlbnRQYWdlKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiIGNsYXNzPVwiYWN0aXZlXCIgIGRhdGEtbnVtPScgKyBjdXJyZW50UGFnZSArICc+JyArIGN1cnJlbnRQYWdlICsgJzwvYT4gPC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiAgZGF0YS1udW09JyArICh0b3RhbFBhZ2VzIC0gNiArIGkpICsgJz4nICsgKHRvdGFsUGFnZXMgLSA2ICsgaSkgKyAnPC9hPiA8L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxQYWdlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGFnZSA9PSBpICsgMSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiIGRhdGEtbnVtPScgKyBjdXJyZW50UGFnZSArICc+JyArIGN1cnJlbnRQYWdlICsgJzwvYT4gPC9saT4nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICcgPGxpPjxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPScgKyAoaSArIDEpICsgJz4nICsgKGkgKyAxKSArICc8L2E+IDwvbGk+JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBhZ2UgPT0gdG90YWxQYWdlcykgLy/mnIDlkI7kuIDpobVcclxuICAgICAgICAgICAgICAgIHsvL+WkhOeQhuS4i+S4gOmhteWSjOWwvumhteeahOmTvuaOpVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vdXRwdXQuQXBwZW5kKFwiIDxhIGRpc2FibGVkPSdkaXNhYmxlZCcgY2xhc3M9J2NvbEgnPuS4i+S4gOmhtTwvYT4gXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOZXh0ID0gXCJcIjtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0UGFnZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBhZ2UgPCB0b3RhbFBhZ2VzKSB7Ly/lpITnkIbkuIvkuIDpobXlkozlsL7pobXnmoTpk77mjqUgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vb3V0cHV0LkFwcGVuZEZvcm1hdChcIiA8YSBkYXRhLXBhZ2VpbmRleD0nezB9JyBjbGFzcz0ncGFnZUxpbmsnPuS4i+S4gOmhtTwvYT4gXCIsIGN1cnJlbnRQYWdlICsgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYWdlUHJlID0gJzxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPScgKyAocGFyc2VJbnQoY3VycmVudFBhZ2UpICsgMSkgKyAnIGNsYXNzPVwibmV4dC1wYWdlIGlubGluZVwiPuS4i+S4gOmhtTwvYT4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJzwvdWw+JztcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYWdpbmF0aW9uXCIpLmlubmVySFRNTCA9IGluZGV4UGFnZSArIHBhZ2VQcmUgKyBwYWdlbnVtICsgcGFnZU5leHQ7XHJcblxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFnaW5hdGlvblwiKS5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkKFwiI3BhZ2luYXRpb24gYVwiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAkKFwiI3BhZ2luYXRpb24gYVwiKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCQodGhpcykuYXR0cihcImRhdGEtbnVtXCIpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxufVxyXG4vL2Z1bmN0aW9uIFBhZ2luYXRvcihwYWdlU2l6ZSwgY3VycmVudFBhZ2UsIHRvdGFsQ291bnQsIGNhbGxiYWNrKSB7XHJcblxyXG5cclxuLy99XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9saWIvcGFnZS9QYWdpbmF0b3IuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMjEgMjMgMjgiLCJcInVzZSBzdHJpY3RcIjtcclxuXHJcbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xyXG5cclxudmFyIGZsYXRwaWNrciA9IGZ1bmN0aW9uIGZsYXRwaWNrcihzZWxlY3RvciwgY29uZmlnKSB7XHJcblx0dmFyIGVsZW1lbnRzID0gdm9pZCAwO1xyXG5cclxuXHR2YXIgY3JlYXRlSW5zdGFuY2UgPSBmdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShlbGVtZW50KSB7XHJcblx0XHRpZiAoZWxlbWVudC5fZmxhdHBpY2tyKSB7XHJcblx0XHRcdGVsZW1lbnQuX2ZsYXRwaWNrci5kZXN0cm95KCk7XHJcblx0XHR9XHJcblxyXG5cdFx0ZWxlbWVudC5fZmxhdHBpY2tyID0gbmV3IGZsYXRwaWNrci5pbml0KGVsZW1lbnQsIGNvbmZpZyk7XHJcblx0XHRyZXR1cm4gZWxlbWVudC5fZmxhdHBpY2tyO1xyXG5cdH07XHJcblxyXG5cdGlmIChzZWxlY3Rvci5ub2RlTmFtZSkge1xyXG5cdFx0cmV0dXJuIGNyZWF0ZUluc3RhbmNlKHNlbGVjdG9yKTtcclxuXHR9XHJcblx0LypcclxuIFV0aWxpemUgdGhlIHBlcmZvcm1hbmNlIG9mIG5hdGl2ZSBnZXR0ZXJzIGlmIGFwcGxpY2FibGVcclxuIGh0dHBzOi8vanNwZXJmLmNvbS9nZXRlbGVtZW50c2J5Y2xhc3NuYW1lLXZzLXF1ZXJ5c2VsZWN0b3JhbGwvMThcclxuIGh0dHBzOi8vanNwZXJmLmNvbS9qcXVlcnktdnMtamF2YXNjcmlwdC1wZXJmb3JtYW5jZS1jb21wYXJpc29uLzIyXHJcbiAqL1xyXG5cdGVsc2UgaWYgKC9eI1thLXpBLVowLTlcXC1fXSokLy50ZXN0KHNlbGVjdG9yKSkge1xyXG5cdFx0XHRyZXR1cm4gY3JlYXRlSW5zdGFuY2UoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3Iuc2xpY2UoMSkpKTtcclxuXHRcdH0gZWxzZSBpZiAoL15cXC5bYS16QS1aMC05XFwtX10qJC8udGVzdChzZWxlY3RvcikpIHtcclxuXHRcdFx0ZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdG9yLnNsaWNlKDEpKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblx0XHR9XHJcblxyXG5cdHZhciBpbnN0YW5jZXMgPSBbXTtcclxuXHJcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBlbGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0aW5zdGFuY2VzLnB1c2goY3JlYXRlSW5zdGFuY2UoZWxlbWVudHNbaV0pKTtcclxuXHR9XHJcblxyXG5cdGlmIChpbnN0YW5jZXMubGVuZ3RoID09PSAxKSB7XHJcblx0XHRyZXR1cm4gaW5zdGFuY2VzWzBdO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHtcclxuXHRcdGNhbGVuZGFyczogaW5zdGFuY2VzLFxyXG5cdFx0YnlJRDogZnVuY3Rpb24gYnlJRChpZCkge1xyXG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLl9mbGF0cGlja3I7XHJcblx0XHR9XHJcblx0fTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbmZsYXRwaWNrci5pbml0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGluc3RhbmNlQ29uZmlnKSB7XHJcblx0ZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzTmFtZSwgY29udGVudCkge1xyXG5cdFx0dmFyIG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XHJcblxyXG5cdFx0aWYgKGNvbnRlbnQpIHtcclxuXHRcdFx0bmV3RWxlbWVudC50ZXh0Q29udGVudCA9IGNvbnRlbnQ7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKGNsYXNzTmFtZSkge1xyXG5cdFx0XHRuZXdFbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbmV3RWxlbWVudDtcclxuXHR9XHJcblxyXG5cdHZhciBkZWJvdW5jZSA9IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xyXG5cdFx0dmFyIHRpbWVvdXQgPSB2b2lkIDA7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xyXG5cdFx0XHRcdGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBjb250ZXh0ID0gdGhpcztcclxuXHJcblx0XHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uIGxhdGVyKCkge1xyXG5cdFx0XHRcdHRpbWVvdXQgPSBudWxsO1xyXG5cdFx0XHRcdGlmICghaW1tZWRpYXRlKSB7XHJcblx0XHRcdFx0XHRmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHJcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcclxuXHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xyXG5cdFx0XHRpZiAoaW1tZWRpYXRlICYmICF0aW1lb3V0KSB7XHJcblx0XHRcdFx0ZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHR9O1xyXG5cclxuXHQvLyBmdW5jdGlvbnNcclxuXHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0dmFyIHBhcnNlQ29uZmlnID0gdm9pZCAwLFxyXG5cdCAgICBpbml0ID0gdm9pZCAwLFxyXG5cdCAgICB3cmFwID0gdm9pZCAwLFxyXG5cdCAgICB1RGF0ZSA9IHZvaWQgMCxcclxuXHQgICAgZXF1YWxEYXRlcyA9IHZvaWQgMCxcclxuXHQgICAgcGFkID0gdm9pZCAwLFxyXG5cdCAgICBtb250aFRvU3RyID0gdm9pZCAwLFxyXG5cdCAgICBpc0VuYWJsZWQgPSB2b2lkIDAsXHJcblx0ICAgIGJ1aWxkTW9udGhOYXZpZ2F0aW9uID0gdm9pZCAwLFxyXG5cdCAgICBidWlsZFdlZWtkYXlzID0gdm9pZCAwLFxyXG5cdCAgICBidWlsZENhbGVuZGFyID0gdm9pZCAwLFxyXG5cdCAgICBidWlsZERheXMgPSB2b2lkIDAsXHJcblx0ICAgIGJ1aWxkV2Vla3MgPSB2b2lkIDAsXHJcblx0ICAgIGJ1aWxkVGltZSA9IHZvaWQgMCxcclxuXHQgICAgdGltZVdyYXBwZXIgPSB2b2lkIDAsXHJcblx0ICAgIHllYXJTY3JvbGwgPSB2b2lkIDAsXHJcblx0ICAgIHVwZGF0ZVZhbHVlID0gdm9pZCAwLFxyXG5cdCAgICBhbVBNVG9nZ2xlID0gdm9pZCAwLFxyXG5cdCAgICBvbktleURvd24gPSB2b2lkIDAsXHJcblx0ICAgIG9uUmVzaXplID0gdm9pZCAwLFxyXG5cdCAgICB1cGRhdGVOYXZpZ2F0aW9uQ3VycmVudE1vbnRoID0gdm9pZCAwLFxyXG5cdCAgICBoYW5kbGVZZWFyQ2hhbmdlID0gdm9pZCAwLFxyXG5cdCAgICBjaGFuZ2VNb250aCA9IHZvaWQgMCxcclxuXHQgICAgZ2V0RGF5c2luTW9udGggPSB2b2lkIDAsXHJcblx0ICAgIGRvY3VtZW50Q2xpY2sgPSB2b2lkIDAsXHJcblx0ICAgIHNlbGVjdERhdGUgPSB2b2lkIDAsXHJcblx0ICAgIGdldFJhbmRvbUNhbGVuZGFySWRTdHIgPSB2b2lkIDAsXHJcblx0ICAgIGJpbmQgPSB2b2lkIDAsXHJcblx0ICAgIHRyaWdnZXJDaGFuZ2UgPSB2b2lkIDA7XHJcblxyXG5cdC8vIGVsZW1lbnRzICYgdmFyaWFibGVzXHJcblx0dmFyIGNhbGVuZGFyQ29udGFpbmVyID0gdm9pZCAwLFxyXG5cdCAgICB3ZWVrZGF5Q29udGFpbmVyID0gdm9pZCAwLFxyXG5cdCAgICB0aW1lQ29udGFpbmVyID0gdm9pZCAwLFxyXG5cdCAgICBuYXZpZ2F0aW9uQ3VycmVudE1vbnRoID0gdm9pZCAwLFxyXG5cdCAgICBtb250aHNOYXYgPSB2b2lkIDAsXHJcblx0ICAgIHByZXZNb250aE5hdiA9IHZvaWQgMCxcclxuXHQgICAgY3VycmVudFllYXJFbGVtZW50ID0gdm9pZCAwLFxyXG5cdCAgICBjdXJyZW50TW9udGhFbGVtZW50ID0gdm9pZCAwLFxyXG5cdCAgICBuZXh0TW9udGhOYXYgPSB2b2lkIDAsXHJcblx0ICAgIGNhbGVuZGFyID0gdm9pZCAwLFxyXG5cdCAgICB3ZWVrTnVtYmVycyA9IHZvaWQgMCxcclxuXHQgICAgbm93ID0gbmV3IERhdGUoKSxcclxuXHQgICAgd3JhcHBlckVsZW1lbnQgPSB2b2lkIDAsXHJcblx0ICAgIGNsaWNrRXZ0ID0gdm9pZCAwO1xyXG5cclxuXHRzZWxmLmZvcm1hdHMgPSB7XHJcblx0XHQvLyB3ZWVrZGF5IG5hbWUsIHNob3J0LCBlLmcuIFRodVxyXG5cdFx0RDogZnVuY3Rpb24gRCgpIHtcclxuXHRcdFx0cmV0dXJuIHNlbGYubDEwbi53ZWVrZGF5cy5zaG9ydGhhbmRbc2VsZi5mb3JtYXRzLncoKV07XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIGZ1bGwgbW9udGggbmFtZSBlLmcuIEphbnVhcnlcclxuXHRcdEY6IGZ1bmN0aW9uIEYoKSB7XHJcblx0XHRcdHJldHVybiBtb250aFRvU3RyKHNlbGYuZm9ybWF0cy5uKCkgLSAxLCBmYWxzZSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIGhvdXJzIHdpdGggbGVhZGluZyB6ZXJvIGUuZy4gMDNcclxuXHRcdEg6IGZ1bmN0aW9uIEgoKSB7XHJcblx0XHRcdHJldHVybiBwYWQoc2VsZi5zZWxlY3RlZERhdGVPYmouZ2V0SG91cnMoKSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIGRheSAoMS0zMCkgd2l0aCBvcmRpbmFsIHN1ZmZpeCBlLmcuIDFzdCwgMm5kXHJcblx0XHRKOiBmdW5jdGlvbiBKKCkge1xyXG5cdFx0XHRyZXR1cm4gc2VsZi5mb3JtYXRzLmooKSArIHNlbGYubDEwbi5vcmRpbmFsKHNlbGYuZm9ybWF0cy5qKCkpO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBBTS9QTVxyXG5cdFx0SzogZnVuY3Rpb24gSygpIHtcclxuXHRcdFx0cmV0dXJuIHNlbGYuc2VsZWN0ZWREYXRlT2JqLmdldEhvdXJzKCkgPiAxMSA/IFwiUE1cIiA6IFwiQU1cIjtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gc2hvcnRoYW5kIG1vbnRoIGUuZy4gSmFuLCBTZXAsIE9jdCwgZXRjXHJcblx0XHRNOiBmdW5jdGlvbiBNKCkge1xyXG5cdFx0XHRyZXR1cm4gbW9udGhUb1N0cihzZWxmLmZvcm1hdHMubigpIC0gMSwgdHJ1ZSk7XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIHNlY29uZHMgMDAtNTlcclxuXHRcdFM6IGZ1bmN0aW9uIFMoKSB7XHJcblx0XHRcdHJldHVybiBwYWQoc2VsZi5zZWxlY3RlZERhdGVPYmouZ2V0U2Vjb25kcygpKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gdW5peCB0aW1lc3RhbXBcclxuXHRcdFU6IGZ1bmN0aW9uIFUoKSB7XHJcblx0XHRcdHJldHVybiBzZWxmLnNlbGVjdGVkRGF0ZU9iai5nZXRUaW1lKCkgLyAxMDAwO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBmdWxsIHllYXIgZS5nLiAyMDE2XHJcblx0XHRZOiBmdW5jdGlvbiBZKCkge1xyXG5cdFx0XHRyZXR1cm4gc2VsZi5zZWxlY3RlZERhdGVPYmouZ2V0RnVsbFllYXIoKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gZGF5IGluIG1vbnRoLCBwYWRkZWQgKDAxLTMwKVxyXG5cdFx0ZDogZnVuY3Rpb24gZCgpIHtcclxuXHRcdFx0cmV0dXJuIHBhZChzZWxmLmZvcm1hdHMuaigpKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gaG91ciBmcm9tIDEtMTIgKGFtL3BtKVxyXG5cdFx0aDogZnVuY3Rpb24gaCgpIHtcclxuXHRcdFx0cmV0dXJuIHNlbGYuc2VsZWN0ZWREYXRlT2JqLmdldEhvdXJzKCkgJSAxMiA/IHNlbGYuc2VsZWN0ZWREYXRlT2JqLmdldEhvdXJzKCkgJSAxMiA6IDEyO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBtaW51dGVzLCBwYWRkZWQgd2l0aCBsZWFkaW5nIHplcm8gZS5nLiAwOVxyXG5cdFx0aTogZnVuY3Rpb24gaSgpIHtcclxuXHRcdFx0cmV0dXJuIHBhZChzZWxmLnNlbGVjdGVkRGF0ZU9iai5nZXRNaW51dGVzKCkpO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBkYXkgaW4gbW9udGggKDEtMzApXHJcblx0XHRqOiBmdW5jdGlvbiBqKCkge1xyXG5cdFx0XHRyZXR1cm4gc2VsZi5zZWxlY3RlZERhdGVPYmouZ2V0RGF0ZSgpO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyB3ZWVrZGF5IG5hbWUsIGZ1bGwsIGUuZy4gVGh1cnNkYXlcclxuXHRcdGw6IGZ1bmN0aW9uIGwoKSB7XHJcblx0XHRcdHJldHVybiBzZWxmLmwxMG4ud2Vla2RheXMubG9uZ2hhbmRbc2VsZi5mb3JtYXRzLncoKV07XHJcblx0XHR9LFxyXG5cclxuXHRcdC8vIHBhZGRlZCBtb250aCBudW1iZXIgKDAxLTEyKVxyXG5cdFx0bTogZnVuY3Rpb24gbSgpIHtcclxuXHRcdFx0cmV0dXJuIHBhZChzZWxmLmZvcm1hdHMubigpKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gdGhlIG1vbnRoIG51bWJlciAoMS0xMilcclxuXHRcdG46IGZ1bmN0aW9uIG4oKSB7XHJcblx0XHRcdHJldHVybiBzZWxmLnNlbGVjdGVkRGF0ZU9iai5nZXRNb250aCgpICsgMTtcclxuXHRcdH0sXHJcblxyXG5cdFx0Ly8gc2Vjb25kcyAwLTU5XHJcblx0XHRzOiBmdW5jdGlvbiBzKCkge1xyXG5cdFx0XHRyZXR1cm4gc2VsZi5zZWxlY3RlZERhdGVPYmouZ2V0U2Vjb25kcygpO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBudW1iZXIgb2YgdGhlIGRheSBvZiB0aGUgd2Vla1xyXG5cdFx0dzogZnVuY3Rpb24gdygpIHtcclxuXHRcdFx0cmV0dXJuIHNlbGYuc2VsZWN0ZWREYXRlT2JqLmdldERheSgpO1xyXG5cdFx0fSxcclxuXHJcblx0XHQvLyBsYXN0IHR3byBkaWdpdHMgb2YgeWVhciBlLmcuIDE2IGZvciAyMDE2XHJcblx0XHR5OiBmdW5jdGlvbiB5KCkge1xyXG5cdFx0XHRyZXR1cm4gU3RyaW5nKHNlbGYuZm9ybWF0cy5ZKCkpLnN1YnN0cmluZygyKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRzZWxmLmRlZmF1bHRDb25maWcgPSB7XHJcblx0XHQvKiBpZiB0cnVlLCBkYXRlcyB3aWxsIGJlIHBhcnNlZCwgZm9ybWF0dGVkLCBhbmQgZGlzcGxheWVkIGluIFVUQy5cclxuICBwcmVsb2FkaW5nIGRhdGUgc3RyaW5ncyB3LyB0aW1lem9uZXMgaXMgcmVjb21tZW5kZWQgYnV0IG5vdCBuZWNlc3NhcnkgKi9cclxuXHRcdHV0YzogZmFsc2UsXHJcblxyXG5cdFx0Ly8gd3JhcDogc2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci8jc3RyYXBcclxuXHRcdHdyYXA6IGZhbHNlLFxyXG5cclxuXHRcdC8vIGVuYWJsZXMgd2VlayBudW1iZXJzXHJcblx0XHR3ZWVrTnVtYmVyczogZmFsc2UsXHJcblxyXG5cdFx0YWxsb3dJbnB1dDogZmFsc2UsXHJcblxyXG5cdFx0LypcclxuICBcdGNsaWNraW5nIG9uIGlucHV0IG9wZW5zIHRoZSBkYXRlKHRpbWUpcGlja2VyLlxyXG4gIFx0ZGlzYWJsZSBpZiB5b3Ugd2lzaCB0byBvcGVuIHRoZSBjYWxlbmRhciBtYW51YWxseSB3aXRoIC5vcGVuKClcclxuICAqL1xyXG5cdFx0Y2xpY2tPcGVuczogdHJ1ZSxcclxuXHJcblx0XHQvLyBkaXNwbGF5IHRpbWUgcGlja2VyIGluIDI0IGhvdXIgbW9kZVxyXG5cdFx0dGltZV8yNGhyOiBmYWxzZSxcclxuXHJcblx0XHQvLyBlbmFibGVzIHRoZSB0aW1lIHBpY2tlciBmdW5jdGlvbmFsaXR5XHJcblx0XHRlbmFibGVUaW1lOiBmYWxzZSxcclxuXHJcblx0XHQvLyBub0NhbGVuZGFyOiB0cnVlIHdpbGwgaGlkZSB0aGUgY2FsZW5kYXIuIHVzZSBmb3IgYSB0aW1lIHBpY2tlciBhbG9uZyB3LyBlbmFibGVUaW1lXHJcblx0XHRub0NhbGVuZGFyOiBmYWxzZSxcclxuXHJcblx0XHQvLyBtb3JlIGRhdGUgZm9ybWF0IGNoYXJzIGF0IGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci8jZGF0ZWZvcm1hdFxyXG5cdFx0ZGF0ZUZvcm1hdDogXCJZLW0tZFwiLFxyXG5cclxuXHRcdC8vIGFsdElucHV0IC0gc2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci8jYWx0aW5wdXRcclxuXHRcdGFsdElucHV0OiBmYWxzZSxcclxuXHJcblx0XHQvLyB0aGUgY3JlYXRlZCBhbHRJbnB1dCBlbGVtZW50IHdpbGwgaGF2ZSB0aGlzIGNsYXNzLlxyXG5cdFx0YWx0SW5wdXRDbGFzczogXCJcIixcclxuXHJcblx0XHQvLyBzYW1lIGFzIGRhdGVGb3JtYXQsIGJ1dCBmb3IgYWx0SW5wdXRcclxuXHRcdGFsdEZvcm1hdDogXCJGIGosIFlcIiwgLy8gZGVmYXVsdHMgdG8gZS5nLiBKdW5lIDEwLCAyMDE2XHJcblxyXG5cdFx0Ly8gZGVmYXVsdERhdGUgLSBlaXRoZXIgYSBkYXRlc3RyaW5nIG9yIGEgZGF0ZSBvYmplY3QuIHVzZWQgZm9yIGRhdGV0aW1lcGlja2VyXCJzIGluaXRpYWwgdmFsdWVcclxuXHRcdGRlZmF1bHREYXRlOiBudWxsLFxyXG5cclxuXHRcdC8vIHRoZSBtaW5pbXVtIGRhdGUgdGhhdCB1c2VyIGNhbiBwaWNrIChpbmNsdXNpdmUpXHJcblx0XHRtaW5EYXRlOiBudWxsLFxyXG5cclxuXHRcdC8vIHRoZSBtYXhpbXVtIGRhdGUgdGhhdCB1c2VyIGNhbiBwaWNrIChpbmNsdXNpdmUpXHJcblx0XHRtYXhEYXRlOiBudWxsLFxyXG5cclxuXHRcdC8vIGRhdGVwYXJzZXIgdGhhdCB0cmFuc2Zvcm1zIGEgZ2l2ZW4gc3RyaW5nIHRvIGEgZGF0ZSBvYmplY3RcclxuXHRcdHBhcnNlRGF0ZTogbnVsbCxcclxuXHJcblx0XHQvLyBzZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyLyNkaXNhYmxlXHJcblx0XHRlbmFibGU6IFtdLFxyXG5cclxuXHRcdC8vIHNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvI2Rpc2FibGVcclxuXHRcdGRpc2FibGU6IFtdLFxyXG5cclxuXHRcdC8vIGRpc3BsYXkgdGhlIHNob3J0IHZlcnNpb24gb2YgbW9udGggbmFtZXMgLSBlLmcuIFNlcCBpbnN0ZWFkIG9mIFNlcHRlbWJlclxyXG5cdFx0c2hvcnRoYW5kQ3VycmVudE1vbnRoOiBmYWxzZSxcclxuXHJcblx0XHQvLyBkaXNwbGF5cyBjYWxlbmRhciBpbmxpbmUuIHNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvI2lubGluZS1jYWxlbmRhclxyXG5cdFx0aW5saW5lOiBmYWxzZSxcclxuXHJcblx0XHQvLyBwb3NpdGlvbiBjYWxlbmRhciBpbnNpZGUgd3JhcHBlciBhbmQgbmV4dCB0byB0aGUgaW5wdXQgZWxlbWVudFxyXG5cdFx0Ly8gbGVhdmUgYXQgZmFsc2UgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91XCJyZSBkb2luZ1xyXG5cdFx0c3RhdGljOiBmYWxzZSxcclxuXHJcblx0XHQvLyBjb2RlIGZvciBwcmV2aW91cy9uZXh0IGljb25zLiB0aGlzIGlzIHdoZXJlIHlvdSBwdXQgeW91ciBjdXN0b20gaWNvbiBjb2RlIGUuZy4gZm9udGF3ZXNvbWVcclxuXHRcdHByZXZBcnJvdzogXCImbHQ7XCIsXHJcblx0XHRuZXh0QXJyb3c6IFwiJmd0O1wiLFxyXG5cclxuXHRcdC8vIGVuYWJsZXMgc2Vjb25kcyBpbiB0aGUgdGltZSBwaWNrZXJcclxuXHRcdGVuYWJsZVNlY29uZHM6IGZhbHNlLFxyXG5cclxuXHRcdC8vIHN0ZXAgc2l6ZSB1c2VkIHdoZW4gc2Nyb2xsaW5nL2luY3JlbWVudGluZyB0aGUgaG91ciBlbGVtZW50XHJcblx0XHRob3VySW5jcmVtZW50OiAxLFxyXG5cclxuXHRcdC8vIHN0ZXAgc2l6ZSB1c2VkIHdoZW4gc2Nyb2xsaW5nL2luY3JlbWVudGluZyB0aGUgbWludXRlIGVsZW1lbnRcclxuXHRcdG1pbnV0ZUluY3JlbWVudDogNSxcclxuXHJcblx0XHQvLyBvbkNoYW5nZSBjYWxsYmFjayB3aGVuIHVzZXIgc2VsZWN0cyBhIGRhdGUgb3IgdGltZVxyXG5cdFx0b25DaGFuZ2U6IG51bGwsIC8vIGZ1bmN0aW9uIChkYXRlT2JqLCBkYXRlU3RyKSB7fVxyXG5cclxuXHRcdC8vIGNhbGxlZCBldmVyeSB0aW1lIGNhbGVuZGFyIGlzIG9wZW5lZFxyXG5cdFx0b25PcGVuOiBudWxsLCAvLyBmdW5jdGlvbiAoZGF0ZU9iaiwgZGF0ZVN0cikge31cclxuXHJcblx0XHQvLyBjYWxsZWQgZXZlcnkgdGltZSBjYWxlbmRhciBpcyBjbG9zZWRcclxuXHRcdG9uQ2xvc2U6IG51bGwsIC8vIGZ1bmN0aW9uIChkYXRlT2JqLCBkYXRlU3RyKSB7fVxyXG5cclxuXHRcdG9uVmFsdWVVcGRhdGU6IG51bGxcclxuXHR9O1xyXG5cclxuXHRpbml0ID0gZnVuY3Rpb24gaW5pdCgpIHtcclxuXHRcdGluc3RhbmNlQ29uZmlnID0gaW5zdGFuY2VDb25maWcgfHwge307XHJcblxyXG5cdFx0c2VsZi5lbGVtZW50ID0gZWxlbWVudDtcclxuXHJcblx0XHRwYXJzZUNvbmZpZygpO1xyXG5cclxuXHRcdHNlbGYuaW5wdXQgPSBzZWxmLmNvbmZpZy53cmFwID8gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtaW5wdXRdXCIpIDogZWxlbWVudDtcclxuXHRcdHNlbGYuaW5wdXQuY2xhc3NMaXN0LmFkZChcImZsYXRwaWNrci1pbnB1dFwiKTtcclxuXHJcblx0XHRpZiAoc2VsZi5jb25maWcuZGVmYXVsdERhdGUpIHtcclxuXHRcdFx0c2VsZi5jb25maWcuZGVmYXVsdERhdGUgPSB1RGF0ZShzZWxmLmNvbmZpZy5kZWZhdWx0RGF0ZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlbGYuaW5wdXQudmFsdWUgfHwgc2VsZi5jb25maWcuZGVmYXVsdERhdGUpIHtcclxuXHRcdFx0c2VsZi5zZWxlY3RlZERhdGVPYmogPSB1RGF0ZShzZWxmLmNvbmZpZy5kZWZhdWx0RGF0ZSB8fCBzZWxmLmlucHV0LnZhbHVlKTtcclxuXHRcdH1cclxuXHJcblx0XHR3cmFwKCk7XHJcblx0XHRidWlsZENhbGVuZGFyKCk7XHJcblx0XHRiaW5kKCk7XHJcblxyXG5cdFx0c2VsZi51RGF0ZSA9IHVEYXRlO1xyXG5cdFx0c2VsZi5qdW1wVG9EYXRlKCk7XHJcblx0XHR1cGRhdGVWYWx1ZSgpO1xyXG5cdH07XHJcblxyXG5cdHBhcnNlQ29uZmlnID0gZnVuY3Rpb24gcGFyc2VDb25maWcoKSB7XHJcblx0XHRzZWxmLmNvbmZpZyA9IHt9O1xyXG5cclxuXHRcdE9iamVjdC5rZXlzKHNlbGYuZGVmYXVsdENvbmZpZykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XHJcblx0XHRcdGlmIChpbnN0YW5jZUNvbmZpZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcblx0XHRcdFx0c2VsZi5jb25maWdba2V5XSA9IGluc3RhbmNlQ29uZmlnW2tleV07XHJcblx0XHRcdH0gZWxzZSBpZiAoc2VsZi5lbGVtZW50LmRhdGFzZXQgJiYgc2VsZi5lbGVtZW50LmRhdGFzZXQuaGFzT3duUHJvcGVydHkoa2V5LnRvTG93ZXJDYXNlKCkpKSB7XHJcblx0XHRcdFx0c2VsZi5jb25maWdba2V5XSA9IHNlbGYuZWxlbWVudC5kYXRhc2V0W2tleS50b0xvd2VyQ2FzZSgpXTtcclxuXHRcdFx0fSBlbHNlIGlmICghc2VsZi5lbGVtZW50LmRhdGFzZXQgJiYgc2VsZi5lbGVtZW50Lmhhc0F0dHJpYnV0ZShcImRhdGEtXCIgKyBrZXkpKSB7XHJcblx0XHRcdFx0c2VsZi5jb25maWdba2V5XSA9IHNlbGYuZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiICsga2V5KTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRzZWxmLmNvbmZpZ1trZXldID0gZmxhdHBpY2tyLmluaXQucHJvdG90eXBlLmRlZmF1bHRDb25maWdba2V5XSB8fCBzZWxmLmRlZmF1bHRDb25maWdba2V5XTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYgKHR5cGVvZiBzZWxmLmRlZmF1bHRDb25maWdba2V5XSA9PT0gXCJib29sZWFuXCIpIHtcclxuXHRcdFx0XHRzZWxmLmNvbmZpZ1trZXldID0gc2VsZi5jb25maWdba2V5XSA9PT0gdHJ1ZSB8fCBzZWxmLmNvbmZpZ1trZXldID09PSBcIlwiIHx8IHNlbGYuY29uZmlnW2tleV0gPT09IFwidHJ1ZVwiO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoa2V5ID09PSBcImVuYWJsZVRpbWVcIiAmJiBzZWxmLmNvbmZpZ1trZXldKSB7XHJcblx0XHRcdFx0c2VsZi5kZWZhdWx0Q29uZmlnLmRhdGVGb3JtYXQgPSAhc2VsZi5jb25maWcudGltZV8yNGhyID8gXCJZLW0tZCBoOmkgS1wiIDogXCJZLW0tZCBIOmlcIjtcclxuXHRcdFx0XHRzZWxmLmRlZmF1bHRDb25maWcuYWx0Rm9ybWF0ID0gIXNlbGYuY29uZmlnLnRpbWVfMjRociA/IFwiRiBqIFksIGg6aSBLXCIgOiBcIkYgaiwgWSBIOmlcIjtcclxuXHRcdFx0fSBlbHNlIGlmIChrZXkgPT09IFwibm9DYWxlbmRhclwiICYmIHNlbGYuY29uZmlnW2tleV0pIHtcclxuXHRcdFx0XHRzZWxmLmRlZmF1bHRDb25maWcuZGF0ZUZvcm1hdCA9IFwiaDppIEtcIjtcclxuXHRcdFx0XHRzZWxmLmRlZmF1bHRDb25maWcuYWx0Rm9ybWF0ID0gXCJoOmkgS1wiO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9O1xyXG5cclxuXHRnZXRSYW5kb21DYWxlbmRhcklkU3RyID0gZnVuY3Rpb24gZ2V0UmFuZG9tQ2FsZW5kYXJJZFN0cigpIHtcclxuXHRcdHZhciByYW5kTnVtID0gdm9pZCAwLFxyXG5cdFx0ICAgIGlkU3RyID0gdm9pZCAwO1xyXG5cdFx0ZG8ge1xyXG5cdFx0XHRyYW5kTnVtID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogTWF0aC5wb3coMTAsIDEwKSk7XHJcblx0XHRcdGlkU3RyID0gXCJmbGF0cGlja3ItXCIgKyByYW5kTnVtO1xyXG5cdFx0fSB3aGlsZSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRTdHIpICE9PSBudWxsKTtcclxuXHJcblx0XHRyZXR1cm4gaWRTdHI7XHJcblx0fTtcclxuXHJcblx0dURhdGUgPSBmdW5jdGlvbiB1RGF0ZShkYXRlLCB0aW1lbGVzcykge1xyXG5cdFx0dGltZWxlc3MgPSB0aW1lbGVzcyB8fCBmYWxzZTtcclxuXHJcblx0XHRpZiAoZGF0ZSA9PT0gXCJ0b2RheVwiKSB7XHJcblx0XHRcdGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG5cdFx0XHR0aW1lbGVzcyA9IHRydWU7XHJcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBkYXRlID09PSBcInN0cmluZ1wiKSB7XHJcblx0XHRcdGRhdGUgPSBkYXRlLnRyaW0oKTtcclxuXHJcblx0XHRcdGlmIChzZWxmLmNvbmZpZy5wYXJzZURhdGUpIHtcclxuXHRcdFx0XHRkYXRlID0gc2VsZi5jb25maWcucGFyc2VEYXRlKGRhdGUpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKC9eXFxkXFxkXFxkXFxkXFwtXFxkezEsMn1cXC1cXGRcXGQkLy50ZXN0KGRhdGUpKSB7XHJcblx0XHRcdFx0Ly8gdGhpcyB1dGMgZGF0ZXN0cmluZyBnZXRzIHBhcnNlZCwgYnV0IGluY29ycmVjdGx5IGJ5IERhdGUucGFyc2VcclxuXHRcdFx0XHRkYXRlID0gbmV3IERhdGUoZGF0ZS5yZXBsYWNlKC8oXFxkKS0oXFxkKS9nLCBcIiQxLyQyXCIpKTtcclxuXHRcdFx0fSBlbHNlIGlmIChEYXRlLnBhcnNlKGRhdGUpKSB7XHJcblx0XHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG5cdFx0XHR9IGVsc2UgaWYgKC9eXFxkXFxkXFxkXFxkXFwtXFxkXFxkXFwtXFxkXFxkLy50ZXN0KGRhdGUpKSB7XHJcblx0XHRcdFx0Ly8gZGlzYWJsZSBzcGVjaWFsIHV0YyBkYXRlc3RyaW5nXHJcblx0XHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKGRhdGUucmVwbGFjZSgvKFxcZCktKFxcZCkvZywgXCIkMS8kMlwiKSk7XHJcblx0XHRcdH0gZWxzZSBpZiAoL14oXFxkP1xcZCk6KFxcZFxcZCkvLnRlc3QoZGF0ZSkpIHtcclxuXHRcdFx0XHQvLyB0aW1lLW9ubHkgcGlja2VyXHJcblx0XHRcdFx0dmFyIG1hdGNoZXMgPSBkYXRlLm1hdGNoKC9eKFxcZD9cXGQpOihcXGRcXGQpKDooXFxkXFxkKSk/LyksXHJcblx0XHRcdFx0ICAgIHNlY29uZHMgPSBtYXRjaGVzWzRdICE9PSB1bmRlZmluZWQgPyBtYXRjaGVzWzRdIDogMDtcclxuXHJcblx0XHRcdFx0ZGF0ZSA9IG5ldyBEYXRlKCk7XHJcblx0XHRcdFx0ZGF0ZS5zZXRIb3VycyhtYXRjaGVzWzFdLCBtYXRjaGVzWzJdLCBzZWNvbmRzLCAwKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiZmxhdHBpY2tyOiBpbnZhbGlkIGRhdGUgc3RyaW5nIFwiICsgZGF0ZSk7XHJcblx0XHRcdFx0Y29uc29sZS5pbmZvKHNlbGYuZWxlbWVudCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIShkYXRlIGluc3RhbmNlb2YgRGF0ZSkgfHwgIWRhdGUuZ2V0VGltZSgpKSB7XHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZWxmLmNvbmZpZy51dGMgJiYgIWRhdGUuZnBfaXNVVEMpIHtcclxuXHRcdFx0ZGF0ZSA9IGRhdGUuZnBfdG9VVEMoKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAodGltZWxlc3MpIHtcclxuXHRcdFx0ZGF0ZS5zZXRIb3VycygwLCAwLCAwLCAwKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZGF0ZTtcclxuXHR9O1xyXG5cclxuXHRlcXVhbERhdGVzID0gZnVuY3Rpb24gZXF1YWxEYXRlcyhkYXRlMSwgZGF0ZTIpIHtcclxuXHRcdHJldHVybiBkYXRlMS5nZXREYXRlKCkgPT09IGRhdGUyLmdldERhdGUoKSAmJiBkYXRlMS5nZXRNb250aCgpID09PSBkYXRlMi5nZXRNb250aCgpICYmIGRhdGUxLmdldEZ1bGxZZWFyKCkgPT09IGRhdGUyLmdldEZ1bGxZZWFyKCk7XHJcblx0fTtcclxuXHJcblx0d3JhcCA9IGZ1bmN0aW9uIHdyYXAoKSB7XHJcblx0XHR3cmFwcGVyRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3Itd3JhcHBlclwiKTtcclxuXHJcblx0XHRpZiAoc2VsZi5jb25maWcuaW5saW5lIHx8IHNlbGYuY29uZmlnLnN0YXRpYykge1xyXG5cdFx0XHQvLyBXcmFwIGlucHV0IGFuZCBwbGFjZSBjYWxlbmRhciB1bmRlcm5lYXRoXHJcblx0XHRcdHNlbGYuZWxlbWVudC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyRWxlbWVudCwgc2VsZi5lbGVtZW50KTtcclxuXHRcdFx0d3JhcHBlckVsZW1lbnQuYXBwZW5kQ2hpbGQoc2VsZi5lbGVtZW50KTtcclxuXHJcblx0XHRcdHdyYXBwZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoc2VsZi5jb25maWcuaW5saW5lID8gXCJpbmxpbmVcIiA6IFwic3RhdGljXCIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0Ly8gSW5zZXJ0IGF0IGJvdHRvbSBvZiBCT0RZIHRhZyB0byBkaXNwbGF5IG91dHNpZGVcclxuXHRcdFx0Ly8gb2YgcmVsYXRpdmUgcG9zaXRpb25lZCBlbGVtZW50cyB3aXRoIGNzcyBcIm92ZXJmbG93OiBoaWRkZW47XCJcclxuXHRcdFx0Ly8gcHJvcGVydHkgc2V0LlxyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHdyYXBwZXJFbGVtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2VsZi5jb25maWcuYWx0SW5wdXQpIHtcclxuXHRcdFx0Ly8gcmVwbGljYXRlIHNlbGYuZWxlbWVudFxyXG5cdFx0XHRzZWxmLmFsdElucHV0ID0gY3JlYXRlRWxlbWVudChzZWxmLmlucHV0Lm5vZGVOYW1lLCBzZWxmLmNvbmZpZy5hbHRJbnB1dENsYXNzICsgXCIgZmxhdHBpY2tyLWlucHV0XCIpO1xyXG5cdFx0XHRzZWxmLmFsdElucHV0LnBsYWNlaG9sZGVyID0gc2VsZi5pbnB1dC5wbGFjZWhvbGRlcjtcclxuXHRcdFx0c2VsZi5hbHRJbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcblxyXG5cdFx0XHRzZWxmLmlucHV0LnR5cGUgPSBcImhpZGRlblwiO1xyXG5cdFx0XHRzZWxmLmlucHV0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNlbGYuYWx0SW5wdXQsIHNlbGYuaW5wdXQubmV4dFNpYmxpbmcpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGdldERheXNpbk1vbnRoID0gZnVuY3Rpb24gZ2V0RGF5c2luTW9udGgoKSB7XHJcblx0XHR2YXIgbW9udGggPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyBzZWxmLmN1cnJlbnRNb250aCA6IGFyZ3VtZW50c1swXTtcclxuXHJcblx0XHR2YXIgeXIgPSBzZWxmLmN1cnJlbnRZZWFyO1xyXG5cclxuXHRcdGlmIChtb250aCA9PT0gMSAmJiAoeXIgJSA0ID09PSAwICYmIHlyICUgMTAwICE9PSAwIHx8IHlyICUgNDAwID09PSAwKSkge1xyXG5cdFx0XHRyZXR1cm4gMjk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHNlbGYubDEwbi5kYXlzSW5Nb250aFttb250aF07XHJcblx0fTtcclxuXHJcblx0dXBkYXRlVmFsdWUgPSBmdW5jdGlvbiB1cGRhdGVWYWx1ZShlKSB7XHJcblx0XHRpZiAoc2VsZi5jb25maWcubm9DYWxlbmRhciAmJiAhc2VsZi5zZWxlY3RlZERhdGVPYmopIHtcclxuXHRcdFx0Ly8gcGlja2luZyB0aW1lIG9ubHkgYW5kIG1ldGhvZCB0cmlnZ2VyZWQgZnJvbSBwaWNrZXJcclxuXHRcdFx0c2VsZi5zZWxlY3RlZERhdGVPYmogPSBuZXcgRGF0ZSgpO1xyXG5cdFx0fSBlbHNlIGlmICghc2VsZi5zZWxlY3RlZERhdGVPYmopIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlKSB7XHJcblx0XHRcdGUudGFyZ2V0LmJsdXIoKTtcclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdGltZUhhc0NoYW5nZWQgPSB2b2lkIDA7XHJcblxyXG5cdFx0aWYgKHNlbGYuY29uZmlnLmVuYWJsZVRpbWUpIHtcclxuXHRcdFx0dmFyIHByZXZpb3VzVGltZXN0YW1wID0gc2VsZi5zZWxlY3RlZERhdGVPYmouZ2V0VGltZSgpO1xyXG5cclxuXHRcdFx0Ly8gdXBkYXRlIHRpbWVcclxuXHRcdFx0dmFyIGhvdXJzID0gcGFyc2VJbnQoc2VsZi5ob3VyRWxlbWVudC52YWx1ZSwgMTApIHx8IDAsXHJcblx0XHRcdCAgICBzZWNvbmRzID0gdm9pZCAwO1xyXG5cclxuXHRcdFx0dmFyIG1pbnV0ZXMgPSAoNjAgKyAocGFyc2VJbnQoc2VsZi5taW51dGVFbGVtZW50LnZhbHVlLCAxMCkgfHwgMCkpICUgNjA7XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5jb25maWcuZW5hYmxlU2Vjb25kcykge1xyXG5cdFx0XHRcdHNlY29uZHMgPSAoNjAgKyBwYXJzZUludChzZWxmLnNlY29uZEVsZW1lbnQudmFsdWUsIDEwKSB8fCAwKSAlIDYwO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXNlbGYuY29uZmlnLnRpbWVfMjRocikge1xyXG5cdFx0XHRcdC8vIHRoZSByZWFsIG51bWJlciBvZiBob3VycyBmb3IgdGhlIGRhdGUgb2JqZWN0XHJcblx0XHRcdFx0aG91cnMgPSBob3VycyAlIDEyICsgMTIgKiAoc2VsZi5hbVBNLmlubmVySFRNTCA9PT0gXCJQTVwiKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0c2VsZi5zZWxlY3RlZERhdGVPYmouc2V0SG91cnMoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgPT09IHVuZGVmaW5lZCA/IHNlbGYuc2VsZWN0ZWREYXRlT2JqLmdldFNlY29uZHMoKSA6IHNlY29uZHMpO1xyXG5cclxuXHRcdFx0c2VsZi5ob3VyRWxlbWVudC52YWx1ZSA9IHBhZCghc2VsZi5jb25maWcudGltZV8yNGhyID8gKDEyICsgaG91cnMpICUgMTIgKyAxMiAqIChob3VycyAlIDEyID09PSAwKSA6IGhvdXJzKTtcclxuXHRcdFx0c2VsZi5taW51dGVFbGVtZW50LnZhbHVlID0gcGFkKG1pbnV0ZXMpO1xyXG5cclxuXHRcdFx0aWYgKHNlY29uZHMgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHRcdHNlbGYuc2Vjb25kRWxlbWVudC52YWx1ZSA9IHBhZChzZWNvbmRzKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dGltZUhhc0NoYW5nZWQgPSBzZWxmLnNlbGVjdGVkRGF0ZU9iai5nZXRUaW1lKCkgIT09IHByZXZpb3VzVGltZXN0YW1wO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuaW5wdXQudmFsdWUgPSBzZWxmLmZvcm1hdERhdGUoc2VsZi5jb25maWcuZGF0ZUZvcm1hdCk7XHJcblxyXG5cdFx0aWYgKHNlbGYuYWx0SW5wdXQpIHtcclxuXHRcdFx0c2VsZi5hbHRJbnB1dC52YWx1ZSA9IHNlbGYuZm9ybWF0RGF0ZShzZWxmLmNvbmZpZy5hbHRGb3JtYXQpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChlICYmICh0aW1lSGFzQ2hhbmdlZCB8fCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJmbGF0cGlja3ItZGF5XCIpKSkge1xyXG5cdFx0XHR0cmlnZ2VyQ2hhbmdlKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlbGYuY29uZmlnLm9uVmFsdWVVcGRhdGUpIHtcclxuXHRcdFx0c2VsZi5jb25maWcub25WYWx1ZVVwZGF0ZShzZWxmLnNlbGVjdGVkRGF0ZU9iaiwgc2VsZi5pbnB1dC52YWx1ZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0cGFkID0gZnVuY3Rpb24gcGFkKG51bSkge1xyXG5cdFx0cmV0dXJuIChcIjBcIiArIG51bSkuc2xpY2UoLTIpO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuZm9ybWF0RGF0ZSA9IGZ1bmN0aW9uIChkYXRlRm9ybWF0KSB7XHJcblx0XHR2YXIgZm9ybWF0dGVkRGF0ZSA9IFwiXCI7XHJcblx0XHR2YXIgZm9ybWF0UGllY2VzID0gZGF0ZUZvcm1hdC5zcGxpdChcIlwiKTtcclxuXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGZvcm1hdFBpZWNlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgYyA9IGZvcm1hdFBpZWNlc1tpXTtcclxuXHRcdFx0aWYgKHNlbGYuZm9ybWF0cy5oYXNPd25Qcm9wZXJ0eShjKSAmJiBmb3JtYXRQaWVjZXNbaSAtIDFdICE9PSBcIlxcXFxcIikge1xyXG5cdFx0XHRcdGZvcm1hdHRlZERhdGUgKz0gc2VsZi5mb3JtYXRzW2NdKCk7XHJcblx0XHRcdH0gZWxzZSBpZiAoYyAhPT0gXCJcXFxcXCIpIHtcclxuXHRcdFx0XHRmb3JtYXR0ZWREYXRlICs9IGM7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZm9ybWF0dGVkRGF0ZTtcclxuXHR9O1xyXG5cclxuXHRtb250aFRvU3RyID0gZnVuY3Rpb24gbW9udGhUb1N0cihkYXRlLCBzaG9ydGhhbmQpIHtcclxuXHRcdGlmIChzaG9ydGhhbmQgfHwgc2VsZi5jb25maWcuc2hvcnRoYW5kQ3VycmVudE1vbnRoKSB7XHJcblx0XHRcdHJldHVybiBzZWxmLmwxMG4ubW9udGhzLnNob3J0aGFuZFtkYXRlXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gc2VsZi5sMTBuLm1vbnRocy5sb25naGFuZFtkYXRlXTtcclxuXHR9O1xyXG5cclxuXHRpc0VuYWJsZWQgPSBmdW5jdGlvbiBpc0VuYWJsZWQoZGF0ZVRvQ2hlY2spIHtcclxuXHRcdGlmIChzZWxmLmNvbmZpZy5taW5EYXRlICYmIGRhdGVUb0NoZWNrIDwgc2VsZi5jb25maWcubWluRGF0ZSB8fCBzZWxmLmNvbmZpZy5tYXhEYXRlICYmIGRhdGVUb0NoZWNrID4gc2VsZi5jb25maWcubWF4RGF0ZSkge1xyXG5cdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHR9XHJcblxyXG5cdFx0ZGF0ZVRvQ2hlY2sgPSB1RGF0ZShkYXRlVG9DaGVjaywgdHJ1ZSk7IC8vIHRpbWVsZXNzXHJcblxyXG5cdFx0dmFyIGJvb2wgPSBzZWxmLmNvbmZpZy5lbmFibGUubGVuZ3RoID4gMCxcclxuXHRcdCAgICBhcnJheSA9IGJvb2wgPyBzZWxmLmNvbmZpZy5lbmFibGUgOiBzZWxmLmNvbmZpZy5kaXNhYmxlO1xyXG5cclxuXHRcdHZhciBkID0gdm9pZCAwO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0ZCA9IGFycmF5W2ldO1xyXG5cclxuXHRcdFx0aWYgKGQgaW5zdGFuY2VvZiBGdW5jdGlvbiAmJiBkKGRhdGVUb0NoZWNrKSkge1xyXG5cdFx0XHRcdC8vIGRpc2FibGVkIGJ5IGZ1bmN0aW9uXHJcblx0XHRcdFx0cmV0dXJuIGJvb2w7XHJcblx0XHRcdH0gZWxzZSBpZiAoIC8vIGRpc2FibGVkIHdlZWtkYXlcclxuXHRcdFx0dHlwZW9mIGQgPT09IFwic3RyaW5nXCIgJiYgL153a2QvLnRlc3QoZCkgJiYgZGF0ZVRvQ2hlY2suZ2V0RGF5KCkgPT09IChwYXJzZUludChkLnNsaWNlKC0xKSwgMTApICsgc2VsZi5sMTBuLmZpcnN0RGF5T2ZXZWVrIC0gMSkgJSA3KSB7XHJcblx0XHRcdFx0cmV0dXJuIGJvb2w7XHJcblx0XHRcdH0gZWxzZSBpZiAoKGQgaW5zdGFuY2VvZiBEYXRlIHx8IHR5cGVvZiBkID09PSBcInN0cmluZ1wiICYmICEvXndrZC8udGVzdChkKSkgJiYgdURhdGUoZCwgdHJ1ZSkuZ2V0VGltZSgpID09PSBkYXRlVG9DaGVjay5nZXRUaW1lKCkpIHtcclxuXHRcdFx0XHQvLyBkaXNhYmxlZCBieSBkYXRlIHN0cmluZ1xyXG5cdFx0XHRcdHJldHVybiBib29sO1xyXG5cdFx0XHR9IGVsc2UgaWYgKCAvLyBkaXNhYmxlZCBieSByYW5nZVxyXG5cdFx0XHQodHlwZW9mIGQgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihkKSkgPT09IFwib2JqZWN0XCIgJiYgZC5oYXNPd25Qcm9wZXJ0eShcImZyb21cIikgJiYgZGF0ZVRvQ2hlY2sgPj0gdURhdGUoZC5mcm9tKSAmJiBkYXRlVG9DaGVjayA8PSB1RGF0ZShkLnRvKSkge1xyXG5cdFx0XHRcdHJldHVybiBib29sO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuICFib29sO1xyXG5cdH07XHJcblxyXG5cdHllYXJTY3JvbGwgPSBmdW5jdGlvbiB5ZWFyU2Nyb2xsKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuXHRcdHZhciBkZWx0YSA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbigxLCBldmVudC53aGVlbERlbHRhIHx8IC1ldmVudC5kZWx0YVkpKTtcclxuXHRcdHNlbGYuY3VycmVudFllYXIgPSBldmVudC50YXJnZXQudmFsdWUgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUsIDEwKSArIGRlbHRhO1xyXG5cdFx0c2VsZi5yZWRyYXcoKTtcclxuXHR9O1xyXG5cclxuXHR0aW1lV3JhcHBlciA9IGZ1bmN0aW9uIHRpbWVXcmFwcGVyKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcblx0XHR2YXIgbWluID0gcGFyc2VJbnQoZS50YXJnZXQubWluLCAxMCksXHJcblx0XHQgICAgbWF4ID0gcGFyc2VJbnQoZS50YXJnZXQubWF4LCAxMCksXHJcblx0XHQgICAgc3RlcCA9IHBhcnNlSW50KGUudGFyZ2V0LnN0ZXAsIDEwKSxcclxuXHRcdCAgICB2YWx1ZSA9IHBhcnNlSW50KGUudGFyZ2V0LnZhbHVlLCAxMCk7XHJcblxyXG5cdFx0dmFyIG5ld1ZhbHVlID0gdmFsdWU7XHJcblxyXG5cdFx0aWYgKGUudHlwZSA9PT0gXCJ3aGVlbFwiKSB7XHJcblx0XHRcdG5ld1ZhbHVlID0gdmFsdWUgKyBzdGVwICogTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIGUud2hlZWxEZWx0YSB8fCAtZS5kZWx0YVkpKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAobmV3VmFsdWUgPD0gbWluKSB7XHJcblx0XHRcdG5ld1ZhbHVlID0gbWF4IC0gc3RlcDtcclxuXHRcdH0gZWxzZSBpZiAobmV3VmFsdWUgPj0gbWF4KSB7XHJcblx0XHRcdG5ld1ZhbHVlID0gbWluICsgc3RlcDtcclxuXHRcdH1cclxuXHJcblx0XHRlLnRhcmdldC52YWx1ZSA9IHBhZChuZXdWYWx1ZSk7XHJcblx0fTtcclxuXHJcblx0dXBkYXRlTmF2aWdhdGlvbkN1cnJlbnRNb250aCA9IGZ1bmN0aW9uIHVwZGF0ZU5hdmlnYXRpb25DdXJyZW50TW9udGgoKSB7XHJcblx0XHRjdXJyZW50TW9udGhFbGVtZW50LnRleHRDb250ZW50ID0gbW9udGhUb1N0cihzZWxmLmN1cnJlbnRNb250aCkgKyBcIiBcIjtcclxuXHRcdGN1cnJlbnRZZWFyRWxlbWVudC52YWx1ZSA9IHNlbGYuY3VycmVudFllYXI7XHJcblx0fTtcclxuXHJcblx0aGFuZGxlWWVhckNoYW5nZSA9IGZ1bmN0aW9uIGhhbmRsZVllYXJDaGFuZ2UoKSB7XHJcblx0XHRpZiAoc2VsZi5jdXJyZW50TW9udGggPCAwIHx8IHNlbGYuY3VycmVudE1vbnRoID4gMTEpIHtcclxuXHRcdFx0c2VsZi5jdXJyZW50WWVhciArPSBzZWxmLmN1cnJlbnRNb250aCAlIDExO1xyXG5cdFx0XHRzZWxmLmN1cnJlbnRNb250aCA9IChzZWxmLmN1cnJlbnRNb250aCArIDEyKSAlIDEyO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGRvY3VtZW50Q2xpY2sgPSBmdW5jdGlvbiBkb2N1bWVudENsaWNrKGUpIHtcclxuXHRcdHZhciBpc0NhbGVuZGFyRWxlbWVudCA9IHdyYXBwZXJFbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSxcclxuXHRcdCAgICBpc0lucHV0ID0gc2VsZi5lbGVtZW50LmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBlLnRhcmdldCA9PT0gc2VsZi5hbHRJbnB1dDtcclxuXHJcblx0XHRpZiAoc2VsZi5pc09wZW4gJiYgIWlzQ2FsZW5kYXJFbGVtZW50ICYmICFpc0lucHV0KSB7XHJcblx0XHRcdHNlbGYuY2xvc2UoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRjaGFuZ2VNb250aCA9IGZ1bmN0aW9uIGNoYW5nZU1vbnRoKG9mZnNldCkge1xyXG5cdFx0c2VsZi5jdXJyZW50TW9udGggKz0gb2Zmc2V0O1xyXG5cclxuXHRcdGhhbmRsZVllYXJDaGFuZ2UoKTtcclxuXHRcdHVwZGF0ZU5hdmlnYXRpb25DdXJyZW50TW9udGgoKTtcclxuXHRcdGJ1aWxkRGF5cygpO1xyXG5cdFx0KHNlbGYuY29uZmlnLm5vQ2FsZW5kYXIgPyB0aW1lQ29udGFpbmVyIDogY2FsZW5kYXIpLmZvY3VzKCk7XHJcblx0fTtcclxuXHJcblx0c2VsZWN0RGF0ZSA9IGZ1bmN0aW9uIHNlbGVjdERhdGUoZSkge1xyXG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0ZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcblx0XHRpZiAoc2VsZi5jb25maWcuYWxsb3dJbnB1dCAmJiBlLnRhcmdldCA9PT0gKHNlbGYuYWx0SW5wdXQgfHwgc2VsZi5pbnB1dCkgJiYgZS53aGljaCA9PT0gMTMpIHtcclxuXHRcdFx0c2VsZi5zZXREYXRlKChzZWxmLmFsdElucHV0IHx8IHNlbGYuaW5wdXQpLnZhbHVlKTtcclxuXHRcdFx0c2VsZi5yZWRyYXcoKTtcclxuXHRcdH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZmxhdHBpY2tyLWRheVwiKSkge1xyXG5cdFx0XHR2YXIgaXNQcmV2TW9udGhEYXkgPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcmV2TW9udGhEYXlcIiksXHJcblx0XHRcdCAgICBpc05leHRNb250aERheSA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm5leHRNb250aERheVwiKSxcclxuXHRcdFx0ICAgIG1vbnRoTnVtID0gc2VsZi5jdXJyZW50TW9udGggLSBpc1ByZXZNb250aERheSArIGlzTmV4dE1vbnRoRGF5O1xyXG5cclxuXHRcdFx0aWYgKGlzUHJldk1vbnRoRGF5IHx8IGlzTmV4dE1vbnRoRGF5KSB7XHJcblx0XHRcdFx0Y2hhbmdlTW9udGgoK2lzTmV4dE1vbnRoRGF5IC0gaXNQcmV2TW9udGhEYXkpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRzZWxmLnNlbGVjdGVkRGF0ZU9iaiA9IG5ldyBEYXRlKHNlbGYuY3VycmVudFllYXIsIG1vbnRoTnVtLCBlLnRhcmdldC5pbm5lckhUTUwpO1xyXG5cclxuXHRcdFx0dXBkYXRlVmFsdWUoZSk7XHJcblx0XHRcdGJ1aWxkRGF5cygpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGJ1aWxkQ2FsZW5kYXIgPSBmdW5jdGlvbiBidWlsZENhbGVuZGFyKCkge1xyXG5cdFx0Y2FsZW5kYXJDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLWNhbGVuZGFyXCIpO1xyXG5cdFx0Y2FsZW5kYXJDb250YWluZXIuaWQgPSBnZXRSYW5kb21DYWxlbmRhcklkU3RyKCk7XHJcblxyXG5cdFx0Y2FsZW5kYXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLWRheXNcIik7XHJcblx0XHRjYWxlbmRhci50YWJJbmRleCA9IC0xO1xyXG5cclxuXHRcdGlmICghc2VsZi5jb25maWcubm9DYWxlbmRhcikge1xyXG5cdFx0XHRidWlsZE1vbnRoTmF2aWdhdGlvbigpO1xyXG5cdFx0XHRidWlsZFdlZWtkYXlzKCk7XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5jb25maWcud2Vla051bWJlcnMpIHtcclxuXHRcdFx0XHRidWlsZFdlZWtzKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGJ1aWxkRGF5cygpO1xyXG5cclxuXHRcdFx0Y2FsZW5kYXJDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FsZW5kYXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHdyYXBwZXJFbGVtZW50LmFwcGVuZENoaWxkKGNhbGVuZGFyQ29udGFpbmVyKTtcclxuXHJcblx0XHRpZiAoc2VsZi5jb25maWcuZW5hYmxlVGltZSkge1xyXG5cdFx0XHRidWlsZFRpbWUoKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRidWlsZE1vbnRoTmF2aWdhdGlvbiA9IGZ1bmN0aW9uIGJ1aWxkTW9udGhOYXZpZ2F0aW9uKCkge1xyXG5cdFx0bW9udGhzTmF2ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci1tb250aFwiKTtcclxuXHJcblx0XHRwcmV2TW9udGhOYXYgPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImZsYXRwaWNrci1wcmV2LW1vbnRoXCIpO1xyXG5cdFx0cHJldk1vbnRoTmF2LmlubmVySFRNTCA9IHNlbGYuY29uZmlnLnByZXZBcnJvdztcclxuXHJcblx0XHRjdXJyZW50TW9udGhFbGVtZW50ID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJjdXJfbW9udGhcIik7XHJcblxyXG5cdFx0Y3VycmVudFllYXJFbGVtZW50ID0gY3JlYXRlRWxlbWVudChcImlucHV0XCIsIFwiY3VyX3llYXJcIik7XHJcblx0XHRjdXJyZW50WWVhckVsZW1lbnQudHlwZSA9IFwibnVtYmVyXCI7XHJcblx0XHRjdXJyZW50WWVhckVsZW1lbnQudGl0bGUgPSBzZWxmLmwxMG4uc2Nyb2xsVGl0bGU7XHJcblxyXG5cdFx0bmV4dE1vbnRoTmF2ID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJmbGF0cGlja3ItbmV4dC1tb250aFwiKTtcclxuXHRcdG5leHRNb250aE5hdi5pbm5lckhUTUwgPSBzZWxmLmNvbmZpZy5uZXh0QXJyb3c7XHJcblxyXG5cdFx0bmF2aWdhdGlvbkN1cnJlbnRNb250aCA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZmxhdHBpY2tyLWN1cnJlbnQtbW9udGhcIik7XHJcblx0XHRuYXZpZ2F0aW9uQ3VycmVudE1vbnRoLmFwcGVuZENoaWxkKGN1cnJlbnRNb250aEVsZW1lbnQpO1xyXG5cdFx0bmF2aWdhdGlvbkN1cnJlbnRNb250aC5hcHBlbmRDaGlsZChjdXJyZW50WWVhckVsZW1lbnQpO1xyXG5cclxuXHRcdG1vbnRoc05hdi5hcHBlbmRDaGlsZChwcmV2TW9udGhOYXYpO1xyXG5cdFx0bW9udGhzTmF2LmFwcGVuZENoaWxkKG5hdmlnYXRpb25DdXJyZW50TW9udGgpO1xyXG5cdFx0bW9udGhzTmF2LmFwcGVuZENoaWxkKG5leHRNb250aE5hdik7XHJcblxyXG5cdFx0Y2FsZW5kYXJDb250YWluZXIuYXBwZW5kQ2hpbGQobW9udGhzTmF2KTtcclxuXHRcdHVwZGF0ZU5hdmlnYXRpb25DdXJyZW50TW9udGgoKTtcclxuXHR9O1xyXG5cclxuXHRidWlsZFdlZWtkYXlzID0gZnVuY3Rpb24gYnVpbGRXZWVrZGF5cygpIHtcclxuXHRcdHdlZWtkYXlDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLXdlZWtkYXlzXCIpO1xyXG5cdFx0dmFyIGZpcnN0RGF5T2ZXZWVrID0gc2VsZi5sMTBuLmZpcnN0RGF5T2ZXZWVrO1xyXG5cclxuXHRcdHZhciB3ZWVrZGF5cyA9IHNlbGYubDEwbi53ZWVrZGF5cy5zaG9ydGhhbmQuc2xpY2UoKTtcclxuXHJcblx0XHRpZiAoZmlyc3REYXlPZldlZWsgPiAwICYmIGZpcnN0RGF5T2ZXZWVrIDwgd2Vla2RheXMubGVuZ3RoKSB7XHJcblx0XHRcdHdlZWtkYXlzID0gW10uY29uY2F0KHdlZWtkYXlzLnNwbGljZShmaXJzdERheU9mV2Vlaywgd2Vla2RheXMubGVuZ3RoKSwgd2Vla2RheXMuc3BsaWNlKDAsIGZpcnN0RGF5T2ZXZWVrKSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlbGYuY29uZmlnLndlZWtOdW1iZXJzKSB7XHJcblx0XHRcdHdlZWtkYXlDb250YWluZXIuaW5uZXJIVE1MID0gXCI8c3Bhbj5cIiArIHNlbGYubDEwbi53ZWVrQWJicmV2aWF0aW9uICsgXCI8L3NwYW4+XCI7XHJcblx0XHR9XHJcblxyXG5cdFx0d2Vla2RheUNvbnRhaW5lci5pbm5lckhUTUwgKz0gXCI8c3Bhbj5cIiArIHdlZWtkYXlzLmpvaW4oXCI8L3NwYW4+PHNwYW4+XCIpICsgXCI8L3NwYW4+XCI7XHJcblxyXG5cdFx0Y2FsZW5kYXJDb250YWluZXIuYXBwZW5kQ2hpbGQod2Vla2RheUNvbnRhaW5lcik7XHJcblx0fTtcclxuXHJcblx0YnVpbGRXZWVrcyA9IGZ1bmN0aW9uIGJ1aWxkV2Vla3MoKSB7XHJcblx0XHRjYWxlbmRhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGFzV2Vla3NcIik7XHJcblxyXG5cdFx0d2Vla051bWJlcnMgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLXdlZWtzXCIpO1xyXG5cdFx0Y2FsZW5kYXJDb250YWluZXIuYXBwZW5kQ2hpbGQod2Vla051bWJlcnMpO1xyXG5cdH07XHJcblxyXG5cdGJ1aWxkRGF5cyA9IGZ1bmN0aW9uIGJ1aWxkRGF5cygpIHtcclxuXHRcdHZhciBmaXJzdE9mTW9udGggPSAobmV3IERhdGUoc2VsZi5jdXJyZW50WWVhciwgc2VsZi5jdXJyZW50TW9udGgsIDEpLmdldERheSgpIC0gc2VsZi5sMTBuLmZpcnN0RGF5T2ZXZWVrICsgNykgJSA3LFxyXG5cdFx0ICAgIGRheXNJbk1vbnRoID0gZ2V0RGF5c2luTW9udGgoKSxcclxuXHRcdCAgICBwcmV2TW9udGhEYXlzID0gZ2V0RGF5c2luTW9udGgoKHNlbGYuY3VycmVudE1vbnRoIC0gMSArIDEyKSAlIDEyKSxcclxuXHRcdCAgICBkYXlzID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuXHRcdHZhciBkYXlOdW1iZXIgPSBwcmV2TW9udGhEYXlzICsgMSAtIGZpcnN0T2ZNb250aCxcclxuXHRcdCAgICBjdXJyZW50RGF0ZSA9IHZvaWQgMCxcclxuXHRcdCAgICBkYXRlSXNEaXNhYmxlZCA9IHZvaWQgMDtcclxuXHJcblx0XHRpZiAoc2VsZi5jb25maWcud2Vla051bWJlcnMpIHtcclxuXHRcdFx0d2Vla051bWJlcnMuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRcdH1cclxuXHJcblx0XHRjYWxlbmRhci5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuXHRcdHNlbGYuY29uZmlnLm1pbkRhdGUgPSB1RGF0ZShzZWxmLmNvbmZpZy5taW5EYXRlLCB0cnVlKTtcclxuXHRcdHNlbGYuY29uZmlnLm1heERhdGUgPSB1RGF0ZShzZWxmLmNvbmZpZy5tYXhEYXRlLCB0cnVlKTtcclxuXHJcblx0XHQvLyBwcmVwZW5kIGRheXMgZnJvbSB0aGUgZW5kaW5nIG9mIHByZXZpb3VzIG1vbnRoXHJcblx0XHRmb3IgKDsgZGF5TnVtYmVyIDw9IHByZXZNb250aERheXM7IGRheU51bWJlcisrKSB7XHJcblx0XHRcdHZhciBjdXJEYXRlID0gbmV3IERhdGUoc2VsZi5jdXJyZW50WWVhciwgc2VsZi5jdXJyZW50TW9udGggLSAxLCBkYXlOdW1iZXIsIDAsIDAsIDAsIDAsIDApLFxyXG5cdFx0XHQgICAgZGF0ZUlzRW5hYmxlZCA9IGlzRW5hYmxlZChjdXJEYXRlKSxcclxuXHRcdFx0ICAgIGRheUVsZW0gPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBkYXRlSXNFbmFibGVkID8gXCJmbGF0cGlja3ItZGF5IHByZXZNb250aERheVwiIDogXCJkaXNhYmxlZFwiLCBkYXlOdW1iZXIpO1xyXG5cclxuXHRcdFx0aWYgKGRhdGVJc0VuYWJsZWQpIHtcclxuXHRcdFx0XHRkYXlFbGVtLnRhYkluZGV4ID0gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZGF5cy5hcHBlbmRDaGlsZChkYXlFbGVtKTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBTdGFydCBhdCAxIHNpbmNlIHRoZXJlIGlzIG5vIDB0aCBkYXlcclxuXHRcdGZvciAoZGF5TnVtYmVyID0gMTsgZGF5TnVtYmVyIDw9IGRheXNJbk1vbnRoOyBkYXlOdW1iZXIrKykge1xyXG5cdFx0XHRjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKHNlbGYuY3VycmVudFllYXIsIHNlbGYuY3VycmVudE1vbnRoLCBkYXlOdW1iZXIsIDAsIDAsIDAsIDAsIDApO1xyXG5cclxuXHRcdFx0aWYgKHNlbGYuY29uZmlnLndlZWtOdW1iZXJzICYmIGRheU51bWJlciAlIDcgPT09IDEpIHtcclxuXHRcdFx0XHR3ZWVrTnVtYmVycy5hcHBlbmRDaGlsZChjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImRpc2FibGVkIGZsYXRwaWNrci1kYXlcIiwgY3VycmVudERhdGUuZnBfZ2V0V2VlaygpKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGRhdGVJc0Rpc2FibGVkID0gIWlzRW5hYmxlZChjdXJyZW50RGF0ZSk7XHJcblxyXG5cdFx0XHR2YXIgZGF5RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIGRhdGVJc0Rpc2FibGVkID8gXCJkaXNhYmxlZFwiIDogXCJmbGF0cGlja3ItZGF5XCIsIGRheU51bWJlcik7XHJcblxyXG5cdFx0XHRpZiAoIWRhdGVJc0Rpc2FibGVkKSB7XHJcblx0XHRcdFx0ZGF5RWxlbWVudC50YWJJbmRleCA9IDA7XHJcblxyXG5cdFx0XHRcdGlmIChlcXVhbERhdGVzKGN1cnJlbnREYXRlLCBub3cpKSB7XHJcblx0XHRcdFx0XHRkYXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJ0b2RheVwiKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChzZWxmLnNlbGVjdGVkRGF0ZU9iaiAmJiBlcXVhbERhdGVzKGN1cnJlbnREYXRlLCBzZWxmLnNlbGVjdGVkRGF0ZU9iaikpIHtcclxuXHRcdFx0XHRcdGRheUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkXCIpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZGF5cy5hcHBlbmRDaGlsZChkYXlFbGVtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHQvLyBhcHBlbmQgZGF5cyBmcm9tIHRoZSBuZXh0IG1vbnRoXHJcblx0XHRmb3IgKHZhciBkYXlOdW0gPSBkYXlzSW5Nb250aCArIDE7IGRheU51bSA8PSA0MiAtIGZpcnN0T2ZNb250aDsgZGF5TnVtKyspIHtcclxuXHRcdFx0dmFyIF9jdXJEYXRlID0gbmV3IERhdGUoc2VsZi5jdXJyZW50WWVhciwgc2VsZi5jdXJyZW50TW9udGggKyAxLCBkYXlOdW0gJSBkYXlzSW5Nb250aCwgMCwgMCwgMCwgMCwgMCksXHJcblx0XHRcdCAgICBfZGF0ZUlzRW5hYmxlZCA9IGlzRW5hYmxlZChfY3VyRGF0ZSksXHJcblx0XHRcdCAgICBfZGF5RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIF9kYXRlSXNFbmFibGVkID8gXCJuZXh0TW9udGhEYXkgZmxhdHBpY2tyLWRheVwiIDogXCJkaXNhYmxlZFwiLCBkYXlOdW0gJSBkYXlzSW5Nb250aCk7XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5jb25maWcud2Vla051bWJlcnMgJiYgZGF5TnVtICUgNyA9PT0gMSkge1xyXG5cdFx0XHRcdHdlZWtOdW1iZXJzLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZGlzYWJsZWRcIiwgX2N1ckRhdGUuZnBfZ2V0V2VlaygpKSk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmIChfZGF0ZUlzRW5hYmxlZCkge1xyXG5cdFx0XHRcdF9kYXlFbGVtZW50LnRhYkluZGV4ID0gMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ZGF5cy5hcHBlbmRDaGlsZChfZGF5RWxlbWVudCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y2FsZW5kYXIuYXBwZW5kQ2hpbGQoZGF5cyk7XHJcblx0fTtcclxuXHJcblx0YnVpbGRUaW1lID0gZnVuY3Rpb24gYnVpbGRUaW1lKCkge1xyXG5cdFx0dGltZUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3ItdGltZVwiKTtcclxuXHRcdHRpbWVDb250YWluZXIudGFiSW5kZXggPSAtMTtcclxuXHRcdHZhciBzZXBhcmF0b3IgPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImZsYXRwaWNrci10aW1lLXNlcGFyYXRvclwiLCBcIjpcIik7XHJcblxyXG5cdFx0c2VsZi5ob3VyRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCBcImZsYXRwaWNrci1ob3VyXCIpO1xyXG5cdFx0c2VsZi5taW51dGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudChcImlucHV0XCIsIFwiZmxhdHBpY2tyLW1pbnV0ZVwiKTtcclxuXHJcblx0XHRzZWxmLmhvdXJFbGVtZW50LnRhYkluZGV4ID0gc2VsZi5taW51dGVFbGVtZW50LnRhYkluZGV4ID0gMDtcclxuXHRcdHNlbGYuaG91ckVsZW1lbnQudHlwZSA9IHNlbGYubWludXRlRWxlbWVudC50eXBlID0gXCJudW1iZXJcIjtcclxuXHJcblx0XHRzZWxmLmhvdXJFbGVtZW50LnZhbHVlID0gc2VsZi5zZWxlY3RlZERhdGVPYmogPyBwYWQoc2VsZi5zZWxlY3RlZERhdGVPYmouZ2V0SG91cnMoKSkgOiAxMjtcclxuXHJcblx0XHRzZWxmLm1pbnV0ZUVsZW1lbnQudmFsdWUgPSBzZWxmLnNlbGVjdGVkRGF0ZU9iaiA/IHBhZChzZWxmLnNlbGVjdGVkRGF0ZU9iai5nZXRNaW51dGVzKCkpIDogXCIwMFwiO1xyXG5cclxuXHRcdHNlbGYuaG91ckVsZW1lbnQuc3RlcCA9IHNlbGYuY29uZmlnLmhvdXJJbmNyZW1lbnQ7XHJcblx0XHRzZWxmLm1pbnV0ZUVsZW1lbnQuc3RlcCA9IHNlbGYuY29uZmlnLm1pbnV0ZUluY3JlbWVudDtcclxuXHJcblx0XHRzZWxmLmhvdXJFbGVtZW50Lm1pbiA9IC1zZWxmLmNvbmZpZy50aW1lXzI0aHI7XHJcblx0XHRzZWxmLmhvdXJFbGVtZW50Lm1heCA9IHNlbGYuY29uZmlnLnRpbWVfMjRociA/IDI0IDogMTM7XHJcblxyXG5cdFx0c2VsZi5taW51dGVFbGVtZW50Lm1pbiA9IC1zZWxmLm1pbnV0ZUVsZW1lbnQuc3RlcDtcclxuXHRcdHNlbGYubWludXRlRWxlbWVudC5tYXggPSA2MDtcclxuXHJcblx0XHRzZWxmLmhvdXJFbGVtZW50LnRpdGxlID0gc2VsZi5taW51dGVFbGVtZW50LnRpdGxlID0gc2VsZi5sMTBuLnNjcm9sbFRpdGxlO1xyXG5cclxuXHRcdHRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5ob3VyRWxlbWVudCk7XHJcblx0XHR0aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlcGFyYXRvcik7XHJcblx0XHR0aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYubWludXRlRWxlbWVudCk7XHJcblxyXG5cdFx0aWYgKHNlbGYuY29uZmlnLmVuYWJsZVNlY29uZHMpIHtcclxuXHRcdFx0dGltZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGFzLXNlY29uZHNcIik7XHJcblxyXG5cdFx0XHRzZWxmLnNlY29uZEVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KFwiaW5wdXRcIiwgXCJmbGF0cGlja3Itc2Vjb25kXCIpO1xyXG5cdFx0XHRzZWxmLnNlY29uZEVsZW1lbnQudHlwZSA9IFwibnVtYmVyXCI7XHJcblx0XHRcdHNlbGYuc2Vjb25kRWxlbWVudC52YWx1ZSA9IHNlbGYuc2VsZWN0ZWREYXRlT2JqID8gcGFkKHNlbGYuc2VsZWN0ZWREYXRlT2JqLmdldFNlY29uZHMoKSkgOiBcIjAwXCI7XHJcblxyXG5cdFx0XHRzZWxmLnNlY29uZEVsZW1lbnQuc3RlcCA9IHNlbGYubWludXRlRWxlbWVudC5zdGVwO1xyXG5cdFx0XHRzZWxmLnNlY29uZEVsZW1lbnQubWluID0gc2VsZi5taW51dGVFbGVtZW50Lm1pbjtcclxuXHRcdFx0c2VsZi5zZWNvbmRFbGVtZW50Lm1heCA9IHNlbGYubWludXRlRWxlbWVudC5tYXg7XHJcblxyXG5cdFx0XHR0aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZmxhdHBpY2tyLXRpbWUtc2VwYXJhdG9yXCIsIFwiOlwiKSk7XHJcblx0XHRcdHRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5zZWNvbmRFbGVtZW50KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXNlbGYuY29uZmlnLnRpbWVfMjRocikge1xyXG5cdFx0XHQvLyBhZGQgc2VsZi5hbVBNIGlmIGFwcHJvcHJpYXRlXHJcblx0XHRcdHNlbGYuYW1QTSA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZmxhdHBpY2tyLWFtLXBtXCIsIFtcIkFNXCIsIFwiUE1cIl1bc2VsZi5ob3VyRWxlbWVudC52YWx1ZSA+IDExIHwgMF0pO1xyXG5cdFx0XHRzZWxmLmFtUE0udGl0bGUgPSBzZWxmLmwxMG4udG9nZ2xlVGl0bGU7XHJcblx0XHRcdHNlbGYuYW1QTS50YWJJbmRleCA9IDA7XHJcblx0XHRcdHRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5hbVBNKTtcclxuXHRcdH1cclxuXHJcblx0XHRjYWxlbmRhckNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aW1lQ29udGFpbmVyKTtcclxuXHR9O1xyXG5cclxuXHRiaW5kID0gZnVuY3Rpb24gYmluZCgpIHtcclxuXHRcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCBvblJlc2l6ZSk7XHJcblxyXG5cdFx0aWYgKHNlbGYuY29uZmlnLmNsaWNrT3BlbnMpIHtcclxuXHRcdFx0KHNlbGYuYWx0SW5wdXQgfHwgc2VsZi5pbnB1dCkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNlbGYub3Blbik7XHJcblx0XHRcdChzZWxmLmFsdElucHV0IHx8IHNlbGYuaW5wdXQpLmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBzZWxmLm9wZW4pO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZWxmLmNvbmZpZy53cmFwICYmIHNlbGYuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtb3Blbl1cIikpIHtcclxuXHRcdFx0c2VsZi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1vcGVuXVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZi5vcGVuKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2VsZi5jb25maWcud3JhcCAmJiBzZWxmLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNsb3NlXVwiKSkge1xyXG5cdFx0XHRzZWxmLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLWNsb3NlXVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZi5jbG9zZSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHNlbGYuY29uZmlnLndyYXAgJiYgc2VsZi5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS10b2dnbGVdXCIpKSB7XHJcblx0XHRcdHNlbGYuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtdG9nZ2xlXVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2VsZi50b2dnbGUpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChzZWxmLmNvbmZpZy53cmFwICYmIHNlbGYuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY2xlYXJdXCIpKSB7XHJcblx0XHRcdHNlbGYuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtY2xlYXJdXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZWxmLmNsZWFyKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXNlbGYuY29uZmlnLm5vQ2FsZW5kYXIpIHtcclxuXHRcdFx0cHJldk1vbnRoTmF2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y2hhbmdlTW9udGgoLTEpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdG5leHRNb250aE5hdi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdGNoYW5nZU1vbnRoKDEpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGN1cnJlbnRZZWFyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgeWVhclNjcm9sbCk7XHJcblx0XHRcdGN1cnJlbnRZZWFyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgY3VycmVudFllYXJFbGVtZW50LnNlbGVjdCk7XHJcblxyXG5cdFx0XHRjdXJyZW50WWVhckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG5cdFx0XHRcdHNlbGYuY3VycmVudFllYXIgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUsIDEwKTtcclxuXHRcdFx0XHRzZWxmLnJlZHJhdygpO1xyXG5cdFx0XHR9KTtcclxuXHJcblx0XHRcdGNhbGVuZGFyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzZWxlY3REYXRlKTtcclxuXHRcdH1cclxuXHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZG9jdW1lbnRDbGljayk7XHJcblx0XHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiYmx1clwiLCBkb2N1bWVudENsaWNrLCB0cnVlKTtcclxuXHJcblx0XHRpZiAoc2VsZi5jb25maWcuZW5hYmxlVGltZSkge1xyXG5cdFx0XHRzZWxmLmhvdXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3aGVlbFwiLCB0aW1lV3JhcHBlcik7XHJcblx0XHRcdHNlbGYubWludXRlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgdGltZVdyYXBwZXIpO1xyXG5cclxuXHRcdFx0c2VsZi5ob3VyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGltZVdyYXBwZXIpO1xyXG5cdFx0XHRzZWxmLm1pbnV0ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHRpbWVXcmFwcGVyKTtcclxuXHJcblx0XHRcdHNlbGYuaG91ckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHVwZGF0ZVZhbHVlKTtcclxuXHRcdFx0c2VsZi5taW51dGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCB1cGRhdGVWYWx1ZSk7XHJcblxyXG5cdFx0XHRzZWxmLmhvdXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgdXBkYXRlVmFsdWUpO1xyXG5cdFx0XHRzZWxmLm1pbnV0ZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCB1cGRhdGVWYWx1ZSk7XHJcblxyXG5cdFx0XHRzZWxmLmhvdXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmb2N1c1wiLCBzZWxmLmhvdXJFbGVtZW50LnNlbGVjdCk7XHJcblx0XHRcdHNlbGYubWludXRlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZm9jdXNcIiwgc2VsZi5taW51dGVFbGVtZW50LnNlbGVjdCk7XHJcblxyXG5cdFx0XHRpZiAoc2VsZi5jb25maWcuZW5hYmxlU2Vjb25kcykge1xyXG5cdFx0XHRcdHNlbGYuc2Vjb25kRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgdGltZVdyYXBwZXIpO1xyXG5cdFx0XHRcdHNlbGYuc2Vjb25kRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgdGltZVdyYXBwZXIpO1xyXG5cdFx0XHRcdHNlbGYuc2Vjb25kRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgdXBkYXRlVmFsdWUpO1xyXG5cdFx0XHRcdHNlbGYuc2Vjb25kRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHVwZGF0ZVZhbHVlKTtcclxuXHRcdFx0XHRzZWxmLnNlY29uZEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZvY3VzXCIsIHNlbGYuc2Vjb25kRWxlbWVudC5zZWxlY3QpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZiAoIXNlbGYuY29uZmlnLnRpbWVfMjRocikge1xyXG5cdFx0XHRcdHNlbGYuYW1QTS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYW1QTVRvZ2dsZSk7XHJcblxyXG5cdFx0XHRcdHNlbGYuYW1QTS5hZGRFdmVudExpc3RlbmVyKFwid2hlZWxcIiwgYW1QTVRvZ2dsZSk7XHJcblx0XHRcdFx0c2VsZi5hbVBNLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCB1cGRhdGVWYWx1ZSk7XHJcblxyXG5cdFx0XHRcdHNlbGYuYW1QTS5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0XHRcdFx0aWYgKGUud2hpY2ggPT09IDM4IHx8IGUud2hpY2ggPT09IDQwKSB7XHJcblx0XHRcdFx0XHRcdGFtUE1Ub2dnbGUoZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQpIHtcclxuXHRcdFx0Y2xpY2tFdnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XHJcblx0XHRcdC8vIHdpdGhvdXQgYWxsIHRoZXNlIGFyZ3MgbXMgZWRnZSBzcGVyZ3Mgb3V0XHJcblx0XHRcdGNsaWNrRXZ0LmluaXRNb3VzZUV2ZW50KFwiY2xpY2tcIiwgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAwLCAwLCAwLCAwLCAwLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRjbGlja0V2dCA9IG5ldyBNb3VzZUV2ZW50KFwiY2xpY2tcIiwge1xyXG5cdFx0XHRcdHZpZXc6IHdpbmRvdyxcclxuXHRcdFx0XHRidWJibGVzOiB0cnVlLFxyXG5cdFx0XHRcdGNhbmNlbGFibGU6IHRydWVcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2VsZi5vcGVuID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHNlbGYuaXNPcGVuIHx8IChzZWxmLmFsdElucHV0IHx8IHNlbGYuaW5wdXQpLmRpc2FibGVkIHx8IHNlbGYuY29uZmlnLmlubGluZSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9IGVsc2UgaWYgKCFzZWxmLmNvbmZpZy5zdGF0aWMpIHtcclxuXHRcdFx0c2VsZi5wb3NpdGlvbkNhbGVuZGFyKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0c2VsZi5pc09wZW4gPSB0cnVlO1xyXG5cclxuXHRcdHdyYXBwZXJFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJvcGVuXCIpO1xyXG5cclxuXHRcdGlmICghc2VsZi5jb25maWcuYWxsb3dJbnB1dCkge1xyXG5cdFx0XHQoc2VsZi5hbHRJbnB1dCB8fCBzZWxmLmlucHV0KS5ibHVyKCk7XHJcblx0XHRcdChzZWxmLmNvbmZpZy5ub0NhbGVuZGFyID8gdGltZUNvbnRhaW5lciA6IGNhbGVuZGFyKS5mb2N1cygpO1xyXG5cdFx0fVxyXG5cclxuXHRcdChzZWxmLmFsdElucHV0IHx8IHNlbGYuaW5wdXQpLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcblxyXG5cdFx0aWYgKHNlbGYuY29uZmlnLm9uT3Blbikge1xyXG5cdFx0XHRzZWxmLmNvbmZpZy5vbk9wZW4oc2VsZi5zZWxlY3RlZERhdGVPYmosIHNlbGYuaW5wdXQudmFsdWUpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdC8vIEZvciBjYWxlbmRhcnMgaW5zZXJ0ZWQgaW4gQk9EWSAoYXMgb3Bwb3NlZCB0byBpbmxpbmUgd3JhcHBlcilcclxuXHQvLyBpdFwicyBuZWNlc3NhcnkgdG8gcHJvcGVybHkgY2FsY3VsYXRlIHRvcC9sZWZ0IHBvc2l0aW9uLlxyXG5cdHNlbGYucG9zaXRpb25DYWxlbmRhciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHZhciBjYWxlbmRhckhlaWdodCA9IGNhbGVuZGFyQ29udGFpbmVyLm9mZnNldEhlaWdodCxcclxuXHRcdCAgICBpbnB1dCA9IHNlbGYuYWx0SW5wdXQgfHwgc2VsZi5pbnB1dCxcclxuXHRcdCAgICBpbnB1dEJvdW5kcyA9IGlucHV0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxyXG5cdFx0ICAgIGRpc3RhbmNlRnJvbUJvdHRvbSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGlucHV0Qm91bmRzLmJvdHRvbSArIGlucHV0Lm9mZnNldEhlaWdodDtcclxuXHJcblx0XHR2YXIgdG9wID0gdm9pZCAwLFxyXG5cdFx0ICAgIGxlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgKyBpbnB1dEJvdW5kcy5sZWZ0O1xyXG5cclxuXHRcdGlmIChkaXN0YW5jZUZyb21Cb3R0b20gPCBjYWxlbmRhckhlaWdodCkge1xyXG5cdFx0XHR0b3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgLSBjYWxlbmRhckhlaWdodCArIGlucHV0Qm91bmRzLnRvcCAtIDI7XHJcblx0XHRcdGNhbGVuZGFyQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhcnJvd1RvcFwiKTtcclxuXHRcdFx0Y2FsZW5kYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFycm93Qm90dG9tXCIpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0ICsgaW5wdXQub2Zmc2V0SGVpZ2h0ICsgaW5wdXRCb3VuZHMudG9wICsgMjtcclxuXHRcdFx0Y2FsZW5kYXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFycm93Qm90dG9tXCIpO1xyXG5cdFx0XHRjYWxlbmRhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYXJyb3dUb3BcIik7XHJcblx0XHR9XHJcblxyXG5cdFx0d3JhcHBlckVsZW1lbnQuc3R5bGUudG9wID0gdG9wICsgXCJweFwiO1xyXG5cdFx0d3JhcHBlckVsZW1lbnQuc3R5bGUubGVmdCA9IGxlZnQgKyBcInB4XCI7XHJcblx0fTtcclxuXHJcblx0c2VsZi50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoc2VsZi5pc09wZW4pIHtcclxuXHRcdFx0c2VsZi5jbG9zZSgpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c2VsZi5vcGVuKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2VsZi5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHNlbGYuaXNPcGVuID0gZmFsc2U7XHJcblx0XHR3cmFwcGVyRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwib3BlblwiKTtcclxuXHRcdChzZWxmLmFsdElucHV0IHx8IHNlbGYuaW5wdXQpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcblxyXG5cdFx0aWYgKHNlbGYuY29uZmlnLm9uQ2xvc2UpIHtcclxuXHRcdFx0c2VsZi5jb25maWcub25DbG9zZShzZWxmLnNlbGVjdGVkRGF0ZU9iaiwgc2VsZi5pbnB1dC52YWx1ZSk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2VsZi5jbGVhciA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdHNlbGYuaW5wdXQudmFsdWUgPSBcIlwiO1xyXG5cclxuXHRcdGlmIChzZWxmLmFsdElucHV0KSB7XHJcblx0XHRcdHNlbGYuYWx0SW5wdXQudmFsdWUgPSBcIlwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuc2VsZWN0ZWREYXRlT2JqID0gbnVsbDtcclxuXHJcblx0XHR0cmlnZ2VyQ2hhbmdlKCk7XHJcblx0XHRzZWxmLmp1bXBUb0RhdGUoKTtcclxuXHR9O1xyXG5cclxuXHR0cmlnZ2VyQ2hhbmdlID0gZnVuY3Rpb24gdHJpZ2dlckNoYW5nZSgpIHtcclxuXHRcdHNlbGYuaW5wdXQuZGlzcGF0Y2hFdmVudChjbGlja0V2dCk7XHJcblxyXG5cdFx0aWYgKHNlbGYuY29uZmlnLm9uQ2hhbmdlKSB7XHJcblx0XHRcdHNlbGYuY29uZmlnLm9uQ2hhbmdlKHNlbGYuc2VsZWN0ZWREYXRlT2JqLCBzZWxmLmlucHV0LnZhbHVlKTtcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRzZWxmLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZG9jdW1lbnRDbGljaywgZmFsc2UpO1xyXG5cclxuXHRcdGlmIChzZWxmLmFsdElucHV0KSB7XHJcblx0XHRcdHNlbGYuYWx0SW5wdXQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzZWxmLmFsdElucHV0KTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoc2VsZi5jb25maWcuaW5saW5lKSB7XHJcblx0XHRcdHZhciBwYXJlbnQgPSBzZWxmLmVsZW1lbnQucGFyZW50Tm9kZSxcclxuXHRcdFx0ICAgIHJlbW92ZWRFbGVtZW50ID0gcGFyZW50LnJlbW92ZUNoaWxkKHNlbGYuZWxlbWVudCk7XHJcblxyXG5cdFx0XHRwYXJlbnQucmVtb3ZlQ2hpbGQoY2FsZW5kYXJDb250YWluZXIpO1xyXG5cdFx0XHRwYXJlbnQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocmVtb3ZlZEVsZW1lbnQsIHBhcmVudCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0ucmVtb3ZlQ2hpbGQod3JhcHBlckVsZW1lbnQpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHNlbGYucmVkcmF3ID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0aWYgKHNlbGYuY29uZmlnLm5vQ2FsZW5kYXIpIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHVwZGF0ZU5hdmlnYXRpb25DdXJyZW50TW9udGgoKTtcclxuXHRcdGJ1aWxkRGF5cygpO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuanVtcFRvRGF0ZSA9IGZ1bmN0aW9uIChqdW1wRGF0ZSkge1xyXG5cdFx0anVtcERhdGUgPSB1RGF0ZShqdW1wRGF0ZSB8fCBzZWxmLnNlbGVjdGVkRGF0ZU9iaiB8fCBzZWxmLmNvbmZpZy5kZWZhdWx0RGF0ZSB8fCBzZWxmLmNvbmZpZy5taW5EYXRlIHx8IG5vdyk7XHJcblxyXG5cdFx0c2VsZi5jdXJyZW50WWVhciA9IGp1bXBEYXRlLmdldEZ1bGxZZWFyKCk7XHJcblx0XHRzZWxmLmN1cnJlbnRNb250aCA9IGp1bXBEYXRlLmdldE1vbnRoKCk7XHJcblx0XHRzZWxmLnJlZHJhdygpO1xyXG5cdH07XHJcblxyXG5cdHNlbGYuc2V0RGF0ZSA9IGZ1bmN0aW9uIChkYXRlLCB0cmlnZ2VyQ2hhbmdlRXZlbnQpIHtcclxuXHRcdGRhdGUgPSB1RGF0ZShkYXRlKTtcclxuXHJcblx0XHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUgJiYgZGF0ZS5nZXRUaW1lKCkpIHtcclxuXHRcdFx0c2VsZi5zZWxlY3RlZERhdGVPYmogPSB1RGF0ZShkYXRlKTtcclxuXHRcdFx0c2VsZi5qdW1wVG9EYXRlKHNlbGYuc2VsZWN0ZWREYXRlT2JqKTtcclxuXHRcdFx0dXBkYXRlVmFsdWUoKTtcclxuXHJcblx0XHRcdGlmICh0cmlnZ2VyQ2hhbmdlRXZlbnQpIHtcclxuXHRcdFx0XHR0cmlnZ2VyQ2hhbmdlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHRzZWxmLnNldFRpbWUgPSBmdW5jdGlvbiAoaG91ciwgbWludXRlLCB0cmlnZ2VyQ2hhbmdlRXZlbnQpIHtcclxuXHRcdGlmICghc2VsZi5zZWxlY3RlZERhdGVPYmopIHtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdHNlbGYuaG91ckVsZW1lbnQudmFsdWUgPSBwYXJzZUludChob3VyLCAxMCkgJSAyNDtcclxuXHRcdHNlbGYubWludXRlRWxlbWVudC52YWx1ZSA9IHBhcnNlSW50KG1pbnV0ZSB8fCAwLCAxMCkgJSA2MDtcclxuXHJcblx0XHRpZiAoIXNlbGYuY29uZmlnLnRpbWVfMjRocikge1xyXG5cdFx0XHRzZWxmLmFtUE0uaW5uZXJIVE1MID0gaG91ciA+IDExID8gXCJQTVwiIDogXCJBTVwiO1xyXG5cdFx0fVxyXG5cclxuXHRcdHVwZGF0ZVZhbHVlKCk7XHJcblxyXG5cdFx0aWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xyXG5cdFx0XHR0cmlnZ2VyQ2hhbmdlKCk7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0c2VsZi5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xyXG5cdFx0aWYgKGtleSBpbiBzZWxmLmNvbmZpZykge1xyXG5cdFx0XHRzZWxmLmNvbmZpZ1trZXldID0gdmFsdWU7XHJcblx0XHRcdHNlbGYuanVtcFRvRGF0ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdGFtUE1Ub2dnbGUgPSBmdW5jdGlvbiBhbVBNVG9nZ2xlKGUpIHtcclxuXHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdHNlbGYuYW1QTS50ZXh0Q29udGVudCA9IFtcIkFNXCIsIFwiUE1cIl1bc2VsZi5hbVBNLmlubmVySFRNTCA9PT0gXCJBTVwiIHwgMF07XHJcblx0fTtcclxuXHJcblx0b25LZXlEb3duID0gZnVuY3Rpb24gb25LZXlEb3duKGUpIHtcclxuXHRcdGlmICghc2VsZi5pc09wZW4gfHwgc2VsZi5jb25maWcuZW5hYmxlVGltZSAmJiB0aW1lQ29udGFpbmVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0c3dpdGNoIChlLndoaWNoKSB7XHJcblx0XHRcdGNhc2UgMTM6XHJcblx0XHRcdFx0c2VsZWN0RGF0ZShlKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgMjc6XHJcblx0XHRcdFx0c2VsZi5jbG9zZSgpO1xyXG5cdFx0XHRcdGJyZWFrO1xyXG5cclxuXHRcdFx0Y2FzZSAzNzpcclxuXHRcdFx0XHRjaGFuZ2VNb250aCgtMSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIDM4OlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRzZWxmLmN1cnJlbnRZZWFyKys7XHJcblx0XHRcdFx0c2VsZi5yZWRyYXcoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGNhc2UgMzk6XHJcblx0XHRcdFx0Y2hhbmdlTW9udGgoMSk7XHJcblx0XHRcdFx0YnJlYWs7XHJcblxyXG5cdFx0XHRjYXNlIDQwOlxyXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcclxuXHRcdFx0XHRzZWxmLmN1cnJlbnRZZWFyLS07XHJcblx0XHRcdFx0c2VsZi5yZWRyYXcoKTtcclxuXHRcdFx0XHRicmVhaztcclxuXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0YnJlYWs7XHJcblx0XHR9XHJcblx0fTtcclxuXHJcblx0b25SZXNpemUgPSBkZWJvdW5jZShmdW5jdGlvbiAoKSB7XHJcblx0XHRpZiAoc2VsZi5pc09wZW4gJiYgIXNlbGYuY29uZmlnLmlubGluZSAmJiAhc2VsZi5jb25maWcuc3RhdGljKSB7XHJcblx0XHRcdHNlbGYucG9zaXRpb25DYWxlbmRhcigpO1xyXG5cdFx0fVxyXG5cdH0sIDMwMCk7XHJcblxyXG5cdHRyeSB7XHJcblx0XHRpbml0KCk7XHJcblx0fSBjYXRjaCAoZXJyb3IpIHtcclxuXHRcdC8vIHNraXAgYW5kIGNhcnJ5IG9uXHJcblx0XHRjb25zb2xlLmVycm9yKGVycm9yKTtcclxuXHRcdGNvbnNvbGUuaW5mbyhzZWxmLmVsZW1lbnQpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHNlbGY7XHJcbn07XHJcblxyXG5mbGF0cGlja3IuaW5pdC5wcm90b3R5cGUgPSB7XHJcblxyXG5cdGRlZmF1bHRDb25maWc6IHt9LFxyXG5cclxuXHRsMTBuOiB7XHJcblx0XHR3ZWVrZGF5czoge1xyXG5cdFx0XHRzaG9ydGhhbmQ6IFsn5ZGo5pelJywgJ+WRqOS4gCcsICflkajkuownLCAn5ZGo5LiJJywgJ+WRqOWbmycsICflkajkupQnLCAn5ZGo5YWtJ10sXHJcblx0XHRcdGxvbmdoYW5kOiBbJ+WRqOaXpScsICflkajkuIAnLCAn5ZGo5LqMJywgJ+WRqOS4iScsICflkajlm5snLCAn5ZGo5LqUJywgJ+WRqOWFrSddXHJcblx0XHR9LFxyXG5cdFx0bW9udGhzOiB7XHJcblx0XHRcdHNob3J0aGFuZDogWyfkuIDmnIgnLCAn5LqM5pyIJywgJ+S4ieaciCcsICflm5vmnIgnLCAn5LqU5pyIJywgJ+WFreaciCcsICfkuIPmnIgnLCAn5YWr5pyIJywgJ+S5neaciCcsICfljYHmnIgnLCAn5Y2B5LiA5pyIJywgJ+WNgeS6jOaciCddLFxyXG5cdFx0XHRsb25naGFuZDogWyfkuIDmnIgnLCAn5LqM5pyIJywgJ+S4ieaciCcsICflm5vmnIgnLCAn5LqU5pyIJywgJ+WFreaciCcsICfkuIPmnIgnLCAn5YWr5pyIJywgJ+S5neaciCcsICfljYHmnIgnLCAn5Y2B5LiA5pyIJywgJ+WNgeS6jOaciCddXHJcblx0XHR9LFxyXG5cdFx0ZGF5c0luTW9udGg6IFszMSwgMjgsIDMxLCAzMCwgMzEsIDMwLCAzMSwgMzEsIDMwLCAzMSwgMzAsIDMxXSxcclxuXHRcdGZpcnN0RGF5T2ZXZWVrOiAwLFxyXG5cdFx0b3JkaW5hbDogZnVuY3Rpb24gb3JkaW5hbChudGgpIHtcclxuXHRcdFx0dmFyIHMgPSBudGggJSAxMDA7XHJcblx0XHRcdGlmIChzID4gMyAmJiBzIDwgMjEpIHJldHVybiBcInRoXCI7XHJcblx0XHRcdHN3aXRjaCAocyAlIDEwKSB7XHJcblx0XHRcdFx0Y2FzZSAxOlxyXG5cdFx0XHRcdFx0cmV0dXJuIFwic3RcIjtcclxuXHRcdFx0XHRjYXNlIDI6XHJcblx0XHRcdFx0XHRyZXR1cm4gXCJuZFwiO1xyXG5cdFx0XHRcdGNhc2UgMzpcclxuXHRcdFx0XHRcdHJldHVybiBcInJkXCI7XHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHJldHVybiBcInRoXCI7XHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHR3ZWVrQWJicmV2aWF0aW9uOiBcIldrXCIsXHJcblx0XHRzY3JvbGxUaXRsZTogXCJTY3JvbGwgdG8gaW5jcmVtZW50XCIsXHJcblx0XHR0b2dnbGVUaXRsZTogXCJDbGljayB0byB0b2dnbGVcIlxyXG5cdH1cclxuXHJcbn07XHJcblxyXG5EYXRlLnByb3RvdHlwZS5mcF9pbmNyID0gZnVuY3Rpb24gKGRheXMpIHtcclxuXHRyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIHRoaXMuZ2V0RGF0ZSgpICsgcGFyc2VJbnQoZGF5cywgMTApKTtcclxufTtcclxuXHJcbkRhdGUucHJvdG90eXBlLmZwX2lzVVRDID0gZmFsc2U7XHJcbkRhdGUucHJvdG90eXBlLmZwX3RvVVRDID0gZnVuY3Rpb24gKCkge1xyXG5cdHZhciBuZXdEYXRlID0gbmV3IERhdGUodGhpcy5nZXRUaW1lKCkgKyB0aGlzLmdldFRpbWV6b25lT2Zmc2V0KCkgKiA2MDAwMCk7XHJcblx0bmV3RGF0ZS5mcF9pc1VUQyA9IHRydWU7XHJcblxyXG5cdHJldHVybiBuZXdEYXRlO1xyXG59O1xyXG5cclxuRGF0ZS5wcm90b3R5cGUuZnBfZ2V0V2VlayA9IGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHRoaXMuZ2V0VGltZSgpKTtcclxuXHRkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xyXG5cclxuXHQvLyBUaHVyc2RheSBpbiBjdXJyZW50IHdlZWsgZGVjaWRlcyB0aGUgeWVhci5cclxuXHRkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyAzIC0gKGRhdGUuZ2V0RGF5KCkgKyA2KSAlIDcpO1xyXG5cdC8vIEphbnVhcnkgNCBpcyBhbHdheXMgaW4gd2VlayAxLlxyXG5cdHZhciB3ZWVrMSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgNCk7XHJcblx0Ly8gQWRqdXN0IHRvIFRodXJzZGF5IGluIHdlZWsgMSBhbmQgY291bnQgbnVtYmVyIG9mIHdlZWtzIGZyb20gZGF0ZSB0byB3ZWVrMS5cclxuXHRyZXR1cm4gMSArIE1hdGgucm91bmQoKChkYXRlLmdldFRpbWUoKSAtIHdlZWsxLmdldFRpbWUoKSkgLyA4NjQwMDAwMCAtIDMgKyAod2VlazEuZ2V0RGF5KCkgKyA2KSAlIDcpIC8gNyk7XHJcbn07XHJcblxyXG4vLyBjbGFzc0xpc3QgcG9seWZpbGxcclxuaWYgKCEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSAmJiB0eXBlb2YgSFRNTEVsZW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTEVsZW1lbnQucHJvdG90eXBlLCBcImNsYXNzTGlzdFwiLCB7XHJcblx0XHRnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcclxuXHRcdFx0dmFyIHNlbGZFbGVtZW50cyA9IHRoaXM7XHJcblx0XHRcdGZ1bmN0aW9uIHVwZGF0ZShmbikge1xyXG5cdFx0XHRcdHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcclxuXHRcdFx0XHRcdHZhciBjbGFzc2VzID0gc2VsZkVsZW1lbnRzLmNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pO1xyXG5cdFx0XHRcdFx0dmFyIGluZGV4ID0gY2xhc3Nlcy5pbmRleE9mKHZhbHVlKTtcclxuXHJcblx0XHRcdFx0XHRmbihjbGFzc2VzLCBpbmRleCwgdmFsdWUpO1xyXG5cdFx0XHRcdFx0c2VsZkVsZW1lbnRzLmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbihcIiBcIik7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHJldCA9IHtcclxuXHRcdFx0XHRhZGQ6IHVwZGF0ZShmdW5jdGlvbiAoY2xhc3NlcywgaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gfmluZGV4IHx8IGNsYXNzZXMucHVzaCh2YWx1ZSk7XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0cmVtb3ZlOiB1cGRhdGUoZnVuY3Rpb24gKGNsYXNzZXMsIGluZGV4KSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gfmluZGV4ICYmIGNsYXNzZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdFx0XHR9KSxcclxuXHRcdFx0XHR0b2dnbGU6IHVwZGF0ZShmdW5jdGlvbiAoY2xhc3NlcywgaW5kZXgsIHZhbHVlKSB7XHJcblx0XHRcdFx0XHRpZiAofmluZGV4KSB7XHJcblx0XHRcdFx0XHRcdGNsYXNzZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaCh2YWx1ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSksXHJcblx0XHRcdFx0Y29udGFpbnM6IGZ1bmN0aW9uIGNvbnRhaW5zKHZhbHVlKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gISEgfnNlbGZFbGVtZW50cy5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5pbmRleE9mKHZhbHVlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblxyXG5cdFx0XHRyZXR1cm4gcmV0O1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG5cdG1vZHVsZS5leHBvcnRzID0gZmxhdHBpY2tyO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvbGliL2NhbGVuZGFyL2NhbGVuZGVyLXBsdWdpbi5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiAyMSAyMyIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCdzcmMvdHBsL1BlcnNvbk1hbmFnZS9QZXJzb25EZXRhaWwnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVzY2FwZT0kdXRpbHMuJGVzY2FwZSxVc2VyTmFtZT0kZGF0YS5Vc2VyTmFtZSxMb2dpbklkPSRkYXRhLkxvZ2luSWQsR2VuZGVyPSRkYXRhLkdlbmRlcixSb2xlTmFtZT0kZGF0YS5Sb2xlTmFtZSxTY2hvb2xOYW1lPSRkYXRhLlNjaG9vbE5hbWUsRW50ZXJUaW1lPSRkYXRhLkVudGVyVGltZSxUZWw9JGRhdGEuVGVsLCRvdXQ9Jyc7JG91dCs9JyA8ZGl2IGNsYXNzPVwiZm9udDE4XCIgc3R5bGU9XCJoZWlnaHQ6ODVweDtsaW5lLWhlaWdodDo4NXB4O1wiPiA8c3BhbiBzdHlsZT1cIm1hcmdpbi1sZWZ0OjI3cHg7XCIgaWQ9XCJwZXJOYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoVXNlck5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPC9kaXY+IDxkaXY+IDxzcGFuIGNsYXNzPVwibXIyMFwiPjxzcGFuIGNsYXNzPVwid2hpdGVcIj7lp5PlkI08L3NwYW4+5aeT5ZCNOjwvc3Bhbj4gPHNwYW4gaWQ9XCJwZXJOYW1lMFwiPic7XG4kb3V0Kz0kZXNjYXBlKFVzZXJOYW1lKTtcbiRvdXQrPSc8L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibXQyMFwiPiA8c3BhbiBjbGFzcz1cIm1yMjBcIj48c3BhbiBjbGFzcz1cIndoaXRlXCI+6LSm5Y+3PC9zcGFuPui0puWPtzo8L3NwYW4+IDxzcGFuIGlkPVwicGVyTG9naW5JZFwiPiAnO1xuJG91dCs9JGVzY2FwZShMb2dpbklkKTtcbiRvdXQrPSc8L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibXQyMFwiPiA8c3BhbiBjbGFzcz1cIm1yMjBcIj48c3BhbiBjbGFzcz1cIndoaXRlXCI+5oCn5YirPC9zcGFuPuaAp+WIqzo8L3NwYW4+ICc7XG5pZihHZW5kZXI9PTEpe1xuJG91dCs9JyA8c3BhbiA+IOeUtzwvc3Bhbj4gJztcbn1lbHNle1xuJG91dCs9JyA8c3BhbiA+IOWlszwvc3Bhbj4gJztcbn1cbiRvdXQrPScgPC9kaXY+IDxkaXYgY2xhc3M9XCJtdDIwXCI+IDxzcGFuIGNsYXNzPVwibXIyMFwiPjxzcGFuIGNsYXNzPVwid2hpdGVcIj7op5LoibI8L3NwYW4+6KeS6ImyOjwvc3Bhbj4gPHNwYW4gaWQ9XCJwZXJSb2xlTmFtZVwiPic7XG4kb3V0Kz0kZXNjYXBlKFJvbGVOYW1lKTtcbiRvdXQrPSc8L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibXQyMFwiPiA8c3BhbiBjbGFzcz1cIm1yMjBcIj7nrqHnkIbmoKHljLo6PC9zcGFuPiA8c3BhbiBpZD1cInBlclNjTmFtZVwiPic7XG4kb3V0Kz0kZXNjYXBlKFNjaG9vbE5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJtdDIwXCI+IDxzcGFuIGNsYXNzPVwibXIyMFwiPuWFpeiBjOaXtumXtDo8L3NwYW4+IDxzcGFuIGlkPVwicGVyRW50ZXJUaW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoRW50ZXJUaW1lKTtcbiRvdXQrPSc8L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibXQyMFwiPiA8c3BhbiBjbGFzcz1cIm1yMjBcIj48c3BhbiBjbGFzcz1cIndoaXRlXCI+5omL5py6PC9zcGFuPuaJi+acujo8L3NwYW4+IDxzcGFuIGlkPVwicGVyVGVsXCI+ICc7XG4kb3V0Kz0kZXNjYXBlKFRlbCk7XG4kb3V0Kz0nPC9zcGFuPiA8L2Rpdj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90cGwvUGVyc29uTWFuYWdlL1BlcnNvbkRldGFpbC50cGxcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMjMiXSwic291cmNlUm9vdCI6IiJ9