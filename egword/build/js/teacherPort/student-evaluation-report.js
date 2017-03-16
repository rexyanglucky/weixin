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

	
	var evaluationid;
	var username;
	__webpack_require__(9);
	$(function () {
	    evaluationid = $("#hidden-evaluationid").text();
	    username = $("#hidden-username").text();

	    GetStudentTestReportDetail();
	});

	function GetStudentTestReportDetail() {

	    $.ajax({
	        type: "get",
	        url: "/teacher/TestCenter/GetStudentTestReportDetail",
	        cache: false,
	        data: { evaluationid: evaluationid, username: username },
	        dataType: "JSON",
	        success: function (data) {

	            data = JSON.parse(data);
	            var li = JSON.parse(data.result);
	            var tpl = __webpack_require__(49);

	            $("#b-reportdetail").html(tpl(li));
	        }
	    });

	}

/***/ },

/***/ 9:
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

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/teacher/student-evaluation-report',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,CreateTime=$data.CreateTime,MasterRequir=$data.MasterRequir,ResultLevel=$data.ResultLevel,Vocabulary=$data.Vocabulary,CiHuiOne=$data.CiHuiOne,CiHuiTwo=$data.CiHuiTwo,BGrade=$data.BGrade,AnswerResult=$data.AnswerResult,CorrectRate=$data.CorrectRate,UseTime=$data.UseTime,floor=$data.floor,AbilityResult=$data.AbilityResult,MentionScore=$data.MentionScore,Course=$data.Course,$out='';$out+=' <div class="main-pops"> <div class="report-wrap"> <div class="header "> <div class="name tc">测评报告书</div> <div class="split mt10"></div> <div class="ovh mt15"> <div class="fr "> <span>测试时间：</span> <span>';
	$out+=$escape(CreateTime);
	$out+='</span> </div> </div> </div> <dl> <dd class="mt40"> <div class="head">【考纲对词汇量掌握要求】</div> <div class="mt35 ml20"> ';
	$out+=$escape(MasterRequir);
	$out+=' </div> </dd> <dd class="mt30"> <div class="head">【测试结果】</div> <div class="report-result mt45 "> <div class="tc"> <span class="f24">词汇量等级：</span> <span class="red-dark f32 fb">';
	$out+=$escape(ResultLevel);
	$out+='</span> <div class="mt35">你当前的词汇量约：<span class="col-ff8716">';
	$out+=$escape(Vocabulary);
	$out+='</span>个，<span class="col-ff8716">';
	$out+=$escape(CiHuiOne);
	$out+='</span>';
	$out+=$escape(CiHuiTwo);
	$out+='</div> </div> <div class="info mt20"> <span>【测试学段】</span><span>';
	$out+=$escape(BGrade == "x" ? "小学" : BGrade == "c" ? "初中" : "高中");
	$out+='</span> <span class="ml60">【测试卷题数】</span><span>';
	$out+=$escape($helpers.getJsonLength(AnswerResult) *40);
	$out+='</span> <br> <span>【作答正确率】</span><span>';
	$out+=$escape(CorrectRate);
	$out+='%</span> <span class="ml30">【测试用时】</span><span>';
	$out+=$escape(UseTime / 60 | floor);
	$out+='分钟';
	$out+=$escape(UseTime % 60);
	$out+='秒</span> </div> </div> </dd> <dd class="mt45"> <p class="head">【测评分析】</p> <p class="tc col-ff8716 f18"> 应试能力 </p> <table class="table-result wp100 mt10"> <tr> <td class="wp20 tl pl25">听说能力</td> <td class="wp60 tl pl35">体现学生在英语考试中，关于“听力和口语”方面的应试能力。</td> ';
	if(AbilityResult[0]=="优秀"){
	$out+=' <td class="wp20 col-best tc">优秀</td> ';
	}else if(AbilityResult[0]=="良好"){
	$out+=' <td class="wp20 col-good tc">良好</td> ';
	}else if(AbilityResult[0]=="及格"){
	$out+=' <td class="wp20 col-pass tc">合格</td> ';
	}else if(AbilityResult[0]=="不及格"){
	$out+=' <td class="wp20 col-bad tc">不合格</td> ';
	}
	$out+=' </tr> <tr> <td class="wp20 tl pl25">阅读能力</td> <td class="wp60 tl pl35">体现学生在英语考试中，关于“英译汉、阅读理解”方面的应试能力。</td> ';
	if(AbilityResult[2]=="优秀"){
	$out+=' <td class="wp20 col-best tc">优秀</td> ';
	}else if(AbilityResult[2]=="良好"){
	$out+=' <td class="wp20 col-good tc">良好</td> ';
	}else if(AbilityResult[2]=="及格"){
	$out+=' <td class="wp20 col-pass tc">合格</td> ';
	}else if(AbilityResult[2]=="不及格"){
	$out+=' <td class="wp20 col-bad tc">不合格</td> ';
	}
	$out+=' </tr> <tr> <td class="wp20 tl pl25">写作能力</td> <td class="wp60 tl pl35">体现学生在英语考试中，关于“书面表达、写作”方面的应试能力。</td> ';
	if(AbilityResult[1]=="优秀"){
	$out+=' <td class="wp20 col-best tc">优秀</td> ';
	}else if(AbilityResult[1]=="良好"){
	$out+=' <td class="wp20 col-good tc">良好</td> ';
	}else if(AbilityResult[1]=="及格"){
	$out+=' <td class="wp20 col-pass tc">合格</td> ';
	}else if(AbilityResult[1]=="不及格"){
	$out+=' <td class="wp20 col-bad tc">不合格</td> ';
	}
	$out+=' </tr> <tr> <td class="wp20 tl pl25">翻译能力</td> <td class="wp60 tl pl35">体现学生在英语考试中，关于“汉译英、完型填空”方面的应试能力。</td> ';
	if(AbilityResult[3]=="优秀"){
	$out+=' <td class="wp20 col-best tc">优秀</td> ';
	}else if(AbilityResult[3]=="良好"){
	$out+=' <td class="wp20 col-good tc">良好</td> ';
	}else if(AbilityResult[3]=="及格"){
	$out+=' <td class="wp20 col-pass tc">合格</td> ';
	}else if(AbilityResult[3]=="不及格"){
	$out+=' <td class="wp20 col-bad tc">不合格</td> ';
	}
	$out+=' </tr> </table> <p class="tc col-ff8716 f18 mt35"> 识词能力 </p> <table class="table-result wp100 mt10"> <tr> <td class="wp40 tl pl25">拼读能力</td> <td class="wp40 tl pl35">看到单词都能正确读出来，体现学生“见词能读”的识词能力。</td> ';
	if(AbilityResult[4]=="优秀"){
	$out+=' <td class="wp20 col-best tc">优秀</td> ';
	}else if(AbilityResult[4]=="良好"){
	$out+=' <td class="wp20 col-good tc">良好</td> ';
	}else if(AbilityResult[4]=="及格"){
	$out+=' <td class="wp20 col-pass tc">合格</td> ';
	}else if(AbilityResult[4]=="不及格"){
	$out+=' <td class="wp20 col-bad tc">不合格</td> ';
	}
	$out+=' </tr> <tr> <td class="tl pl25">词形识记能力</td> <td class="tl pl35">听到单词都能正确写出来，体现学生“听词能写”的识词能力。</td> ';
	if(AbilityResult[5]=="优秀"){
	$out+=' <td class="wp20 col-best tc">优秀</td> ';
	}else if(AbilityResult[5]=="良好"){
	$out+=' <td class="wp20 col-good tc">良好</td> ';
	}else if(AbilityResult[5]=="及格"){
	$out+=' <td class="wp20 col-pass tc">合格</td> ';
	}else if(AbilityResult[5]=="不及格"){
	$out+=' <td class="wp20 col-bad tc">不合格</td> ';
	}
	$out+=' </tr> <tr> <td class="tl pl25">词义识记能力</td> <td class="tl pl35">见到单词都能准确表达中文词义，体现学生“见词识义”的识词能力。</td> ';
	if(AbilityResult[6]=="优秀"){
	$out+=' <td class="wp20 col-best tc">优秀</td> ';
	}else if(AbilityResult[6]=="良好"){
	$out+=' <td class="wp20 col-good tc">良好</td> ';
	}else if(AbilityResult[6]=="及格"){
	$out+=' <td class="wp20 col-pass tc">合格</td> ';
	}else if(AbilityResult[6]=="不及格"){
	$out+=' <td class="wp20 col-bad tc">不合格</td> ';
	}
	$out+=' </tr> <tr> <td class="tl pl25">词义词形的辨析能力</td> <td class="tl pl35">掌握单词词义与拼写规则之间的要领，体现学生“辨别词义和词形”的能力。</td> ';
	if(AbilityResult[7]=="优秀"){
	$out+=' <td class="wp20 col-best tc">优秀</td> ';
	}else if(AbilityResult[7]=="良好"){
	$out+=' <td class="wp20 col-good tc">良好</td> ';
	}else if(AbilityResult[7]=="及格"){
	$out+=' <td class="wp20 col-pass tc">合格</td> ';
	}else if(AbilityResult[7]=="不及格"){
	$out+=' <td class="wp20 col-bad tc">不合格</td> ';
	}
	$out+=' </tr> </table> </dd> <dd class="mt50"> <p class="head">【提分方案】</p> <div class="ml10"> <p class="lh200 mt20"> 1、';
	$out+=$escape(MentionScore[0]);
	$out+=' </p> <p class="lh200 mt10"> 2、';
	$out+=$escape(MentionScore[1]);
	$out+=' </p> </div> </dd> <dd class="mt45"> <p class="head">【课程推荐】</p> <div class="synchronization mt45"> <div style="height:1rem;border-bottom:0.025rem solid #ffa754;"> <div class="tabs-btn" style="margin-left:20px;">';
	$out+=$escape(Course.BookSetName);
	$out+='</div> <span class="ml30 red">￥</span> <span class="red" style="font-size:0.6rem;font-weight:600;">';
	$out+=$escape(Course.Money);
	$out+='元</span> </div> <div class=" mt35 tc"> <div class="tabs mr10 w160"> <span class="">课次</span><span class="span">|</span><span class="">';
	$out+=$escape(Course.AllTimes);
	$out+='</span> </div> <div class="tabs mr10 w230"> <span class="">学习词汇量</span><span class="span">|</span> <span class="">';
	$out+=$escape(Course.WordCount);
	$out+='</span> </div> <div class="tabs w210"> <span class="">有效期</span><span class="span">|</span><span class=""> ';
	$out+=$escape($helpers. GetBigW (Course.UseMoth ));
	$out+='个月 </span> </div> </div> <p class="wordWrap mt40">';
	$out+=$escape(Course.Remark);
	$out+='</p> </div> </dd> </dl> <div class="footer mt100 mb40"> <p class="line"></p> <div class="kouhao"> ';
	$out+=$escape(BGrade == "x" ? "20小时拿下小学6年单词" : BGrade == "c" ? "30小时拿下初中3年单词" : "50小时拿下高中3年单词");
	$out+=' </div> </div> </div> </div>';
	return new String($out);
	});

/***/ }

/******/ });