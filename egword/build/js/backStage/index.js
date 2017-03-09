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

	var helpers = __webpack_require__(9);
	var data = {list:[{time : 1446175992278},{time : 1446176021568}]};
	document.getElementById('app').innerHTML = __webpack_require__(18)(data);





/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
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
	            wordStr = wordStr.replace(new RegExp((l + 10000).toString()), ("<span class=\"red\">" + array[l] + "</span>"));
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
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);__webpack_require__(19);__webpack_require__(20);
	module.exports=template('src/tpl/tpla/a',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$each=$utils.$each,list=$data.list,item=$data.item,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<div id="header"> ';
	include('../tplb/b');
	$out+=' ';
	include('../tplb/c');
	$out+=' <ul id="nav"> <div>ksafhskjgbfadjk倒计时这个设置总路径</div> ';
	$each(list,function(item,$index){
	$out+=' <li><a href="http://www.qq.com">';
	$out+=$escape($helpers. dateFormat(item.time , 'yyyy-MM-dd hh:mm:ss'));
	$out+='</a></li> ';
	});
	$out+=' </ul> </div>  ';
	return new String($out);
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/tplb/b','<h1 id="logo"> <a href="http://www.qq.com"> <div>aeisjtgfklde</div> <img width=\'134\' height=\'44\' src="http://mat1.gtimg.com/www/images/qq2012/qqlogo_1x.png" alt="腾讯网" /> </a> </h1> ');

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/tplb/c','<div> 这个是c的路径这个是通过inclue引入的设置的路径 </div>');

/***/ }
/******/ ]);