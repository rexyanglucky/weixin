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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	//后台交互
	__webpack_require__(9);
	var pop = __webpack_require__(11);
	var loadimg = __webpack_require__(12);
	var Paginator = __webpack_require__(13);
	var commJs = __webpack_require__(8);//公共方法
	var calender = __webpack_require__(14);
	//require('../lib/calendar/calender-plugin.min.css');
	var tplTablePerDetail = __webpack_require__(24);//员工模板
	var dataId = $("#perId").val();
	var userRole = 0;


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
	            var str = $("#btnBand").html();
	            pop.OpenConfrimPop("确认" + str + "员工账号?", "Confrim", str + "提示");



	        });
	        //确定禁用
	        $("body").delegate("#Confrim", "click", function () {
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
	                        $(".small-popbtn").remove();
	                        pop.PopTipShow("操作成功");

	                    } else {
	                        pop.PopTipShow("操作失败");
	                    }



	                }
	            });

	        });

	        //重置密码
	        $("body").delegate("#btnReset", "click", function () {
	            var tipStr = "确认重置" + $("#perName0").html() + "(" + $("#perLoginId").html() + ")"+"的密码?";
	           
	            pop.OpenConfrimPop(tipStr, "ConfrimReset", "重置提示");



	        });
	        //确定重置
	        $("body").delegate("#ConfrimReset", "click", function () {
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
	                        $(".small-popbtn").remove();
	                        pop.PopTipShow("重置成功,重置密码为:000000");

	                    } else {
	                        $(".small-popbtn").remove();
	                        pop.PopTipShow("重置失败");
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
	                userRole = data.Data.RoleId;
	                $("#perTb").html(tplTablePerDetail(data.Data));
	                if (data.Data.IsFrozen == 1) {
	                    $("#btnBand").html("启用");
	                    $("#btnBand").attr("data-id", 0);
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
/* 6 */,
/* 7 */,
/* 8 */
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
	            default:
	                return t;


	        }

	        return t;
	    }, IsMobile: function(t) {
	        return (/^1[3|4|5|7|8]\d{9}$/.test(t));//校验手机的格式
	    }
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	//var template = require('./template');
	var template = __webpack_require__(10);

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
	 * @see    http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
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
	    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
	        var v = map[t];
	        if (v !== undefined) {
	            if (all.length > 1) {
	                v = '0' + v;
	                v = v.substr(v.length - 2);
	            }
	            return v;
	        }
	        else if (t === 'y') {
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

	//获取json对象属性个数
	template.helper('getJsonLength',
	    function (jsonData) {

	        var jsonLength = 0;

	        for (var item in jsonData) {

	            jsonLength++;

	        }

	        return jsonLength;

	    });

	template.helper('floor',
	    function (d) {
	        return Math.floor(d);

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
	//字母的转换
	template.helper('GetEngBig', function (e) {
	    return e == 1 ? "A"
	        : e == 2 ? "B"
	        : e == 3 ? "C"
	        : e == 4 ? "D"
	        : e == 5 ? "E"
	        : e == 6 ? "F"
	        : e == 7 ? "G"
	        : e == 8 ? "H"
	        : e == 9 ? "I"
	        : e == 10 ? "J"
	        : e == 11 ? "K"
	        : e == 12 ? "L"
	        : e == 13 ? "M"
	        : e == 14 ? "N"
	        : e == 15 ? "O"
	        : e == 16 ? "P"
	        : e == 17 ? "Q"
	        : e == 18 ? "R"
	        : e == 19 ? "S"
	        : e == 20 ? "T"
	        : e == 21 ? "U"
	        : e == 22 ? "V"
	        : e == 23 ? "W"
	        : e == 24 ? "X"
	        : e == 25 ? "Y"
	        : e == 26 ? "Z"
	        : "";
	});
	//单词按音节套红
	template.helper('GetRedWord', function (word) {
	    // var arr=e.split("");
	    // var keyword=["a","e","i","o","u"];
	    // var result="";
	    // if(arr&&arr.length>0)
	    // {
	    //      result= arr.map(function (item,index,array) {
	    //         if(keyword.indexOf(item)>-1){
	    //                 return "<span class='red'>"+item+"</span>"
	    //         }
	    //         else{
	    //             return "<span>"+item+"</span>"
	    //         }
	    //     });
	    //     result=result.toString().replace(/,/gi,"");
	    // }
	    // console.log(result);
	    // return result;
	    var wordStr = word.Word;
	    if (word.Word.indexOf("-") == -1) {
	        wordStr = word.Syllables.join("-");
	    }
	    var array = ['sion', 'tion', 'sual', 'sure', 'ture', 'dge', 'ar', 'or', 'er', 'ir', 'ur', 'air', 'eir', 'ear', 'eer', 'oar', 'are', 'ere', 'ere', 'ire', 'ore', 'ure', '-y', 'le', 'al', 'el', 'ol', 'il', 'ul', 'ow', 'ew', 'aw', 'gh', 'nk', 'ng', 'ge', 'a', 'e', 'i', 'o', 'u', 'an', 'en', 'in'];
	    for (var l = 0; l < array.length; l++) {
	        if (wordStr.indexOf(array[l]) != -1) {
	            wordStr = wordStr.replace(new RegExp(array[l], "gi"), (l + 10000).toString());
	        }
	    }
	    for (var l = 0; l < array.length; l++) {
	        if (wordStr.indexOf((l + 10000).toString()) != -1) {
	            wordStr = wordStr.replace(new RegExp((l + 10000).toString(), "gi"), ("<span class=\"red\">" + array[l] + "</span>"));
	        }

	    }

	    var arr = wordStr.split("<span class=\"red\">");
	    for (var m = 0; m < arr.length; m++) {
	        if (arr[m].indexOf("<") == -1) {
	            wordStr = wordStr.replace(arr[m], ("<span>" + arr[m] + "</span>"));
	        } else {
	            if (arr[m].split("</span>")[1] != "") {
	                wordStr = wordStr.replace(arr[m], (arr[m].split("</span>")[0] + "</span><span>" + arr[m].split("</span>")[1] + "</span>"));
	            }
	        }
	    }
	    return wordStr;
	});
	template.helper('test', function (e) {
	    return e;
	})

/***/ },
/* 10 */
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
/* 11 */
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
	function PopTipShow(obj,title) {
	    $(".small-pop").each(function () {

	        $(this).remove();
	    });

	    if (title == undefined) {
	        title = "提示消息";
	    }
	    var tiphtml = '<div class="eg-pop small-pop" > <div class="header"> ' + title + '<span class="close"></span> </div> <div class="body">' + obj + ' </div> </div>';

	   
	    $("body").append(tiphtml);
	    $(".pop-mask").show();
	    $(".small-pop").show();
	}



	//弹出确认框
	var OpenConfrimPop = function (obj,btnId,title) {
	    $('[class="pop-up font14"]').each(function () {

	        $(this).remove();
	    });

	    if (title==undefined) {
	        title ="提示消息";
	    }
	   
	    var html = '<div class="eg-pop small-popbtn" > <div class="header"> ' + title + '<span class="close"></span> </div> <div class="body"> ' + obj + ' </div> <div class="footer"> <span class="operatBtn left" id="' + btnId + '" style="margin-left:50px;">确定</span> <span class="operatBtn right" id="Cancel" style="margin-right:50px;">取消</span> </div> </div>';
	    debugger;
	    $("body").append(html);
	    $(".pop-mask").show();
	    $(".small-popbtn").show();
	};

	function PopTipHide() {
	    $(".pop-up").hide();
	    $(".pop-mask").hide();
	    $(".add").hide();
	    document.location.reload();
	}

	exports.MaskShow = MaskShow;
	exports.MaskHide = MaskHide;
	exports.PopTipShow = PopTipShow;
	exports.PopTipHide = PopTipHide;
	exports.OpenConfrimPop = OpenConfrimPop;

	//处理弹出框的隐藏
	$(function () {
	    $("body").delegate(".close,#Cancel", "click", function () {
	        $(".small-popbtn").hide();
	        $(".small-pop").hide();
	        $(".pop-mask").hide();
	        //document.location.reload();
	    });

	   



	});



/***/ },
/* 12 */
/***/ function(module, exports) {

	//弹出加载图片针对列表传递居中参数
	function ShowLoadingForTable(obj, num) {
	    if (num == undefined || obj==undefined) {
	        return;
	    }
	    obj.html('<tr  style="border:none;text-align:center;height:280px;"><td style="font-size: 16px;" colspan="'+num+'"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;">'+jQuery("#divLoading").html() +'</div></div></td></tr>');
	}

	function ShowLoadingForTableNoClass(obj, num) {
	    if (num == undefined || obj == undefined) {
	        return;
	    }
	    obj.html('<tr><td colspan="' + num + '"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;">' + jQuery("#divLoading").html() + '</div></div></td></tr>');
	}


	//弹出加载图片
	function ShowLoading(obj) {
	    if (obj == undefined) {
	        return;
	    }
	    obj.html(jQuery("#divLoading").html());
	}


	exports.ShowLoadingForTable = ShowLoadingForTable;//针对table布局的
	exports.ShowLoadingForTableNoClass = ShowLoadingForTableNoClass;//清除样式

	exports.ShowLoading = ShowLoading;




/***/ },
/* 13 */
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
	        var pagePre = '<a href="#"  data-num=' + (parseInt(currentPage) - 1) + ' class="pre-page inline mr20 pre-e">上一页</a>';
	        var pageNext = '<a href="#"  data-num=' + (parseInt(currentPage) + 1) + ' class="next-page inline next-e">下一页</a>';
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	var controlWidth=0;//赋值插件的宽度(全局)

	var flatpickr = function flatpickr(selector, config, width) {
	    if (width!= undefined) {
	controlWidth = width;
	        
	    }
	  
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
		    

		    //制定下宽度
			if (className) {
			    newElement.className = className;
			    if (className=="flatpickr-calendar"&&controlWidth!=0) {
			        $(newElement).css("width", controlWidth);
			    }
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

			onValueUpdate: function() {
			    self.close();//更改完值之后关闭
			}
	     
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/PersonManage/PersonDetail',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,UserName=$data.UserName,LoginId=$data.LoginId,Gender=$data.Gender,RoleName=$data.RoleName,IsShowSchool=$data.IsShowSchool,SchoolName=$data.SchoolName,EnterTime=$data.EnterTime,Tel=$data.Tel,$out='';$out+=' <div class="font18" style="height:85px;line-height:85px;"> <span id="perName">';
	$out+=$escape(UserName);
	$out+='</span> </div> <div> <span class="mr20">姓&emsp;&emsp;名:</span> <span id="perName0">';
	$out+=$escape(UserName);
	$out+='</span> </div> <div class="mt20"> <span class="mr20">账&emsp;&emsp;号:</span> <span id="perLoginId"> ';
	$out+=$escape(LoginId);
	$out+='</span> </div> <div class="mt20"> <span class="mr20">性&emsp;&emsp;别:</span> ';
	if(Gender==1){
	$out+=' <span > 男</span> ';
	}else{
	$out+=' <span > 女</span> ';
	}
	$out+=' </div> <div class="mt20"> <span class="mr20">角&emsp;&emsp;色:</span> <span id="perRoleName">';
	$out+=$escape(RoleName);
	$out+='</span> </div> ';
	if(IsShowSchool==0){
	$out+=' <div class="mt20"> <span class="mr20">管理校区:</span> <span id="perScName">';
	$out+=$escape(SchoolName);
	$out+='</span> </div> ';
	}else{
	$out+=' ';
	}
	$out+=' <div class="mt20"> <span class="mr20">入职时间:</span> <span id="perEnterTime">';
	$out+=$escape(EnterTime);
	$out+='</span> </div> <div class="mt20"> <span class="mr20">手&emsp;&emsp;机:</span> <span id="perTel"> ';
	$out+=$escape(Tel);
	$out+='</span> </div>';
	return new String($out);
	});

/***/ }
/******/ ]);