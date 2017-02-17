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

	// var tool=require("../../LUI/tool.js");
	var Lui = __webpack_require__(1);
	var lui = new Lui();
	
	
	var _studentGroup = null;
	var classid;
	/*初始化*/
	$(function () {
	
	    classid = $("#hidden-classid").text();
	    GetStudentGroup(classid, 1);
	
	    $("#btn-submit").click(SaveClassBegin);
	
	});
	
	/*获取学生分组信息 ajax*/
	function GetStudentGroup(classid, isgroup) {
	    var url = "/teacher/myclass/GetStudentGroup";
	    if (!isgroup) {
	        url = "/teacher/myclass/GetStudentNoGroup";
	    }
	    $.ajax({
	        type: "get",
	        url: url,
	        cache: false,
	        data: { classid: classid },
	        dataType: "JSON",
	        success: function (data) {
	
	            data = JSON.parse(data);
	
	            var li = data.result;
	            _studentGroup = li;
	
	            var groupCount = 0;
	            var studentCount = 0;
	
	            var t_data = { isgroup: isgroup, list: li }
	
	            var tpl = __webpack_require__(31);
	            $("#grouplist").html(tpl(t_data));
	
	            if (isgroup) {
	
	                for (var i = 0; i < li.length; i++) {
	
	                    groupCount++;
	
	                    for (var j = 0; j < li[i].StudentInfoList.length; j++) {
	                        studentCount++;
	                    }
	                }
	
	                $("#groupinfo").html("( " + studentCount + "人 共 " + groupCount + " 组)");
	
	            } else {
	                var sl = li[0].StudentInfoList;
	                for (var j = 0; j < sl.length; j++) {
	                    studentCount++;
	                }
	                $("#groupinfo").html("( " + studentCount + " 人)");
	            }
	
	            if (studentCount == 0) {
	                //确定按钮不可用
	
	            } else {
	                $("#btn-submit").show();
	                $("#btn-submit-no").hide();
	
	            }
	
	            lui.initCheckBox({
	                callback: function (item) {
	                    var groupname = $(item).attr("data-name");
	                    if (groupname == "gall") {
	
	                        if ($(item).attr("data-checked") == "1") {
	                            //分组
	                            GetStudentGroup(classid, 1);
	                        } else {
	                            //不分组
	                            GetStudentGroup(classid, 0);
	                        }
	                    }
	                    else if (groupname == "g1") {
	                        if ($(item).attr("data-checked") == "1") {
	                            $(item).parent().removeClass("def").addClass("sel");
	                        }
	                        else {
	                            $(item).parent().removeClass("sel").addClass("def");
	                        }
	                    }
	                }
	            });
	        }
	    });
	}
	
	/*获取操作后 学生分组信息*/
	function changeCheckBox() {
	    $("luicheck[data-name='g1']").each(function () {
	
	        var isbool = $(this).attr("data-checked") == 1;
	
	        if (!isbool) {
	
	            var getgroupindexid = $(this).attr("data-groupindexid");
	            var studentid = $(this).attr("data-val");
	
	            for (var i = 0; i < _studentGroup.length; i++) {
	                if (getgroupindexid == _studentGroup[i].GroupIndexId) {
	
	                    for (var j = 0; j < _studentGroup[i].StudentInfoList.length; j++) {
	                        if (studentid == _studentGroup[i].StudentInfoList[j].StudentID) {
	                            _studentGroup[i].StudentInfoList.splice(j, 1);
	                            j--;
	                        }
	                    }
	
	
	                }
	            }
	        }
	
	
	    });
	}
	
	/*提交上课信息*/
	function SaveClassBegin() {
	
	    changeCheckBox();
	
	    var groupinfo = JSON.stringify(_studentGroup);
	
	    $.ajax({
	        type: "POST",
	        url: "/teacher/myclass/SaveClassBegin",
	        cache: false,
	        data: { classid: classid, groupinfo: groupinfo },
	        dataType: "JSON",
	        success: function (data) {
	
	            data = JSON.parse(data);
	
	            $.router.load('/teacher/myclass/ClassroomMonitor?classindex=' + data.result, true);
	
	        }
	    });
	
	}


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	var LuiDropDownList = __webpack_require__(2);
	var LuiCheckBox = __webpack_require__(3);
	
	function Lui() {
	    //this.checkBox = null;
	    // this.initWordSpeak();
	};
	
	Lui.prototype = {
	    constructor: Lui,
	    initTree: function (p) {
	        var t = new LuiTree();
	        return t.init(p);
	    },
	    initDropDownList: function (p) {
	        var d = new LuiDropDownList();
	        return d.init(p);
	    },
	    initCheckBox: function (p) {
	        //����һ��������ȫ�ֵ�checkbox����
	        if (!this.checkBox) {
	            this.checkBox = new LuiCheckBox();
	        }
	        var c = new LuiCheckBox();
	        return c.init(p);
	
	    },
	    initWordSpeak: function (p) {
	        //����һ��������ȫ�ֵ�wordspeak����
	        if (!this.wordspeak) {
	            this.wordspeak = new LuiWordSpeak();
	        }
	        var c = new LuiWordSpeak();
	        return c.init(p);
	    }
	};
	
	module.exports = Lui;


/***/ },

/***/ 2:
/***/ function(module, exports) {

	function LuiDropDownList() {
	    this.param = null;
	    this.selector = "";
	}
	var dropcount = 1000;
	LuiDropDownList.prototype = {
	    constructor: LuiDropDownList,
	    init: function (param) {
	        this.selector = this.warpid = "#" + param.warpid;
	        var warpid = param.warpid;
	        if (!param.data) { return; }
	        var data = param.data;
	
	        var width = param.width = param.width || 180;
	        var height = param.height = param.height || 200;
	        var subtextlength = param.subtextlength = param.subtextlength || 5;
	        param.valueField = param.valueField || "id";
	        param.textField = param.textField || "name";
	        var valueField = param.valueField;
	        var textField = param.textField;
	        var selectedCallBack = param.selectedCallBack;
	        var loadedCallBack = param.loadedCallBack;
	        var zindex = param.zindex;
	        if (param.data.length === 0) {
	            var d = {};
	            d[valueField] = -1;
	            d[textField] = "";
	            data.push(d);
	            height = 0;
	        }
	
	        //设置默认值
	        var defaultValue = param.defaultValue = param.defaultValue || data[0][valueField];
	        var defaultText = param.defaultText = param.defaultValue || data[0][textField];
	        this.param = param;
	        var ulHtml = "<div class='dropdiv dn'>";
	        ulHtml += '  <ul class="dropul" style="max-height:' + height + 'px;overflow:auto;" data-id="' + defaultValue + '" data-name="' + defaultText + '">';
	
	        for (var k = 0; k < data.length; k++) {
	            var item = data[k];
	            var v = item[textField].length > subtextlength ? item[textField].substring(0, subtextlength) + "..." : item[textField];
	            var itemHtml = '<li title=' + item[textField] + ' data-index=' + k + ' data-id=' + item[valueField] + ' data-tag=\'' + JSON.stringify(data[k]) + '\'>' + v + '</li>';
	            ulHtml += itemHtml;
	        }
	        ulHtml += "</ul>";
	        ulHtml += "</div>";
	        var spanHtml = ' <span style="width: ' + width + 'px;" class="dib"><span data-type="dropdownlist_drop_span" id="span' + param.warpid + '">' + defaultText + '</span> <i class="num_down"></i></span>';
	
	        var con = $("#" + warpid);
	        con.css({ width: width });
	        con.addClass("lui_dropdownlist");
	        con.html(spanHtml);
	        con.append(ulHtml);
	        if (zindex) {
	            con.find(".dropdiv").css("z-index", zindex);
	            con.attr("zindex", zindex);
	        } else {
	            // con.find(".dropdiv").css("z-index", dropcount--);
	            // con.attr("zindex", dropcount + 1);
	        }
	        con.addClass("btn_num_updown").addClass("btn_num_updown1").addClass("dib");
	        con.attr("title", defaultText);
	        con.attr("data-id", defaultValue);
	
	        var ul = $("#" + warpid + " ul");
	        var dropdiv = $("#" + warpid + " .dropdiv");
	        var li = $("#" + warpid + " ul li");
	        var span = con.find("span[data-type='dropdownlist_drop_span']");
	        //事件
	        //下拉事件
	        con.click(function () {
	
	            if (ul.is(":visible")) {
	                // ul.slideUp(200);
	                dropdiv.slideUp(200);
	            } else {
	                $(".dropdiv").slideUp(200);
	                // dropdiv.show();
	                // ul.slideDown(200);
	                dropdiv.slideDown(200);
	            }
	            return false;
	        });
	        $("body").click(function () {
	            // ul.slideUp(200);
	            $(".dropdiv").slideUp(200);
	            // return false;
	        });
	        // con.mouseleave(function (e) {
	        //     ul.slideUp(200);
	        //     console.log(e);
	        //     return false;
	        // });
	        //选中事件
	        li.click(function () {
	            var selectedValue = $(this).attr("data-id");
	            var selectedText = $(this).html();
	            var selectedJson = $(this).attr("data-josn");
	            var alltitle = $(this).attr("title");
	            span.text(selectedText);
	            span.attr("data-id", selectedValue);
	            span.attr("data-json", selectedJson);
	            span.attr("title", alltitle);
	
	            con.attr("title", alltitle);
	            con.attr("data-id", selectedValue);
	            //选中回调事件
	            if (selectedCallBack) {
	                selectedCallBack(warpid, selectedValue, alltitle);
	            }
	            dropdiv.slideUp(200);
	            return false;
	
	        });
	        this.span = span;
	        //设置默认值
	        this.setValue(defaultValue);
	        return this;
	    },
	    getValue: function () {
	        if (this.param.data.length > 0) {
	            var span = this.span;
	            return { value: span.attr("data-id"), text: span.attr("title"), zindex: $(this.selector).attr("zindex") };
	        }
	        else {
	            return { value: -1, text: "" };
	        }
	
	    },
	    //暴露给外部的方法
	    getSelectedJsonValue: function () {
	        if (this.param.data.length > 0) {
	            var span = this.span;
	            return JSON.parse(span.attr("data-json"));
	        }
	        else {
	            return null;
	        }
	
	    },
	    setValue: function (value) {
	        var textsel = "";
	        //选中的值
	        var selItem;
	        var span = this.span;
	        for (var m = 0; m < this.param.data.length; m++) {
	            var itemsel = this.param.data[m];
	            if (itemsel[this.param.valueField] == value) {
	                textsel = itemsel[this.param.textField];
	                selItem = itemsel;
	                break;
	            }
	        }
	        span.attr("data-id", value);
	        span.attr("data-json", JSON.stringify(selItem));
	        span.attr("title", textsel);
	        $(this.selector).attr("title", textsel);
	        var selectedValue = value;
	        var selectedText = textsel;
	        var v = textsel.length > this.param.subtextlength ? textsel.substring(0, this.param.subtextlength) + "..." : textsel;
	        span.text(v);
	
	        if (this.param.loadedCallBack) {
	            this.param.loadedCallBack(containerId, selectedValue, selectedText);
	        }
	        return this;
	    }
	
	
	};
	module.exports = LuiDropDownList;

/***/ },

/***/ 3:
/***/ function(module, exports) {

	
	function LuiCheckBox() {
	    this.selector = "luicheck";
	    //参数
	    this.param = {};
	}
	
	LuiCheckBox.prototype = {
	    constructor: LuiCheckBox,
	    /*
	     *warpid 容器id
	     *data 数据集，json 串 [{name:rex,val:001},{name:lilei,val:002}]
	     *展示字段   textField
	     *实际值字段 valueField
	     *回调函数 callback 参数为当前触发的复选框上绑定的数据
	     */
	    init: function (param) {
	        var cthis = this;
	        if (param && param.group) {
	            this.selector = 'luicheck[data-name="' + param.group + '"]';
	        }
	        this.param = param;
	        $(this.selector).each(function (index, item) {
	            var ischeckStyle = $(item).attr("data-checked") == 1 ? "check_sel" : "";
	            var ischeckshow = $(item).attr("data-showcheckbox") != 1;
	
	            var text = $(item).attr("data-text");
	            var h = '<i class="icon_check ' + ischeckStyle + ' "></i>';
	            var s = '<span class="check_text"  onselectstart="return false;" >' + text + '</span>';
	            h = ischeckshow ? h + s : s;
	            // if ($(item).find("icon_check").length > 0 || $(item).find("check_text").length > 0) {
	            //     return;
	            // }
	            
	            $(item).html(h);
	            $(item).css({ "cursor": "pointer" });
	            $(item).unbind("click");
	            $(item).bind("click", function () {
	                var ischeck = $(this).attr("data-checked");
	                if (ischeck == 1) {
	                    $(this).attr("data-checked", 0);
	                    $(this).children("i").removeClass("check_sel").addClass("check_def");
	                }
	                else {
	                    $(this).attr("data-checked", 1);
	                    $(this).children("i").removeClass("check_def").addClass("check_sel");
	                }
	                // alert("bind");
	                if (param&&param.callback) {
	                    var groupname = $(item).attr("data-name");
	                    var val = cthis.getJsonValue(groupname);
	                    //调用回调函数，并返回组名和所选中值得json串
	                    //param.callback(groupname, val);
	                    param.callback(item);
	                }
	            });
	
	        });
	        return this;
	
	
	    },
	    //设置checkbox组哪些值被选中
	    setValue: function (name, val) {
	        $(this.selector).filter('[data-name="' + name + '"]').filter('[data-val="' + val + '"]').each(function (index, item) {
	            var ischeck = $(item).attr("data-checked");
	            if (ischeck == 1) {
	            }
	            else {
	                $(item).click();
	            }
	
	        });
	    },
	    //获取checkbox组选中的值
	    getValue: function (name) {
	        var r = [];
	        $(this.selector).filter('[data-name="' + name + '"]').each(function (index, item) {
	            var ischeck = $(item).attr("data-checked");
	
	            if (ischeck == 1) {
	                r.push($(item).attr("data-val"));
	            }
	
	
	        });
	        alert(r.join(','));
	    },
	    //获取checkbox组选中的值
	    getJsonValue: function (name) {
	        var r = [];
	        $(this.selector).filter('[data-name="' + name + '"]').each(function (index, item) {
	            var ischeck = $(item).attr("data-checked");
	            if (ischeck == 1) {
	                var jsonstr = $(item).attr("data-json");
	                if (jsonstr) {
	                    r.push(JSON.parse(unescape(jsonstr)));
	                }
	            }
	        });
	        return r;
	    },
	    /**判断当前 checkbox 是否选中 */
	    ischeck: function (name, val) {
	        var item = $(this.selector).filter('[data-name="' + name + '"]').filter('[data-val="' + val + '"]')[0];
	        var ischeck = $(item).attr("data-checked");
	        return ischeck == 1;
	    },
	    /**判断当前 checkbox 是否选中 */
	    ischeckElement: function (item) {
	        var ischeck = $(item).attr("data-checked");
	        return ischeck == 1;
	    },
	    /**模拟单击 只改变样式 */
	    setClickStyle: function (item) {
	        var ischeck = $(item).attr("data-checked");
	        if (ischeck == 1) {
	            $(item).attr("data-checked", 0);
	            $(item).children("i").removeClass("check_sel");
	        }
	        else {
	            $(item).attr("data-checked", 1);
	            $(item).children("i").addClass("check_sel");
	        }
	    }
	};
	module.exports=LuiCheckBox;

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

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/teacher/student-group',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,isgroup=$data.isgroup,$each=$utils.$each,list=$data.list,v=$data.v,i=$data.i,$escape=$utils.$escape,d=$data.d,j=$data.j,$out='';$out+=' ';
	if(isgroup){
	$out+='  <div class="list-block cards-list"> <ul> ';
	$each(list,function(v,i){
	$out+=' <li class="card"> <div class="card-header">';
	$out+=$escape(v.GroupIndexId);
	$out+='组</div> <div class="card-content"> <div class="card-content-inner"> ';
	$each(v.StudentInfoList,function(d,j){
	$out+=' <div class="stu sel"> <luicheck class="lui_checkbox" data-name="g1" data-val="';
	$out+=$escape(d.StudentID);
	$out+='" data-groupindexid="';
	$out+=$escape(v.GroupIndexId);
	$out+='" data-text="" data-checked="1"></luicheck> <span class="check-name">';
	$out+=$escape(d.UserName);
	$out+='</span> <span class="info">';
	$out+=$escape((d.BookNumber - d.LeftNumber));
	$out+='/';
	$out+=$escape(d.BookNumber);
	$out+='</span> </div> ';
	});
	$out+=' </div> </div> </li> ';
	});
	$out+=' </ul> </div> ';
	}else{
	$out+='  <div class="list-block cards-list"> <ul> ';
	$each(list,function(v,i){
	$out+=' <li class="card"> <div class="card-content"> <div class="card-content-inner"> ';
	$each(v.StudentInfoList,function(d,j){
	$out+=' <div class="stu sel"> <luicheck class="lui_checkbox" data-name="g1" data-val="';
	$out+=$escape(d.StudentID);
	$out+='" data-groupindexid="';
	$out+=$escape(v.GroupIndexId);
	$out+='" data-text="" data-checked="1"></luicheck> <span class="check-name">';
	$out+=$escape(d.UserName);
	$out+='</span> <span class="info">';
	$out+=$escape((d.BookNumber - d.LeftNumber));
	$out+='/';
	$out+=$escape(d.BookNumber);
	$out+='</span> </div> ';
	});
	$out+=' </div> </div> </li> ';
	});
	$out+=' </ul> </div> ';
	}
	return new String($out);
	});

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGVhY2hlclBvcnQvbGVzc29uLXN0dWRlbnQtZ3JvdXAuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9sdWkuanM/ZTc5MCoqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9kcm9wZG93bmxpc3QuanM/ZmVmMCoqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9jaGVja2JveC5qcz82MTZkKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qcz84OTY2KioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3RlYWNoZXIvc3R1ZGVudC1ncm91cC50cGwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsbUJBQW1CO0FBQ2xDO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEwQjs7QUFFMUI7QUFDQTs7QUFFQTs7QUFFQSxnQ0FBK0IsZUFBZTs7QUFFOUM7O0FBRUEsb0NBQW1DLGtDQUFrQztBQUNy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O0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFxQjtBQUNyQixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLEdBQUU7QUFDRixrQ0FBaUM7QUFDakMsSUFBRztBQUNILGVBQWM7QUFDZDtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBLEdBQUU7QUFDRixFQUFDLEc7Ozs7Ozs7QUM5RUQ7QUFDQTtBQUNBO0FBQ0EsY0FBYSx5S0FBeUs7QUFDdEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsRUFBQztBQUNEO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxFQUFDLEUiLCJmaWxlIjoidGVhY2hlclBvcnQvbGVzc29uLXN0dWRlbnQtZ3JvdXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTA2MTQ4ZDA1Nzk0MDgwMGZmNSIsIi8vIHZhciB0b29sPXJlcXVpcmUoXCIuLi8uLi9MVUkvdG9vbC5qc1wiKTtcclxudmFyIEx1aSA9IHJlcXVpcmUoXCIuLi8uLi9MVUkvanMvbHVpLmpzXCIpO1xyXG52YXIgbHVpID0gbmV3IEx1aSgpO1xyXG5cclxuXHJcbnZhciBfc3R1ZGVudEdyb3VwID0gbnVsbDtcclxudmFyIGNsYXNzaWQ7XHJcbi8q5Yid5aeL5YyWKi9cclxuJChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgY2xhc3NpZCA9ICQoXCIjaGlkZGVuLWNsYXNzaWRcIikudGV4dCgpO1xyXG4gICAgR2V0U3R1ZGVudEdyb3VwKGNsYXNzaWQsIDEpO1xyXG5cclxuICAgICQoXCIjYnRuLXN1Ym1pdFwiKS5jbGljayhTYXZlQ2xhc3NCZWdpbik7XHJcblxyXG59KTtcclxuXHJcbi8q6I635Y+W5a2m55Sf5YiG57uE5L+h5oGvIGFqYXgqL1xyXG5mdW5jdGlvbiBHZXRTdHVkZW50R3JvdXAoY2xhc3NpZCwgaXNncm91cCkge1xyXG4gICAgdmFyIHVybCA9IFwiL3RlYWNoZXIvbXljbGFzcy9HZXRTdHVkZW50R3JvdXBcIjtcclxuICAgIGlmICghaXNncm91cCkge1xyXG4gICAgICAgIHVybCA9IFwiL3RlYWNoZXIvbXljbGFzcy9HZXRTdHVkZW50Tm9Hcm91cFwiO1xyXG4gICAgfVxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcImdldFwiLFxyXG4gICAgICAgIHVybDogdXJsLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBkYXRhOiB7IGNsYXNzaWQ6IGNsYXNzaWQgfSxcclxuICAgICAgICBkYXRhVHlwZTogXCJKU09OXCIsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGxpID0gZGF0YS5yZXN1bHQ7XHJcbiAgICAgICAgICAgIF9zdHVkZW50R3JvdXAgPSBsaTtcclxuXHJcbiAgICAgICAgICAgIHZhciBncm91cENvdW50ID0gMDtcclxuICAgICAgICAgICAgdmFyIHN0dWRlbnRDb3VudCA9IDA7XHJcblxyXG4gICAgICAgICAgICB2YXIgdF9kYXRhID0geyBpc2dyb3VwOiBpc2dyb3VwLCBsaXN0OiBsaSB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdHBsID0gcmVxdWlyZShcInRlYWNoZXIvc3R1ZGVudC1ncm91cFwiKTtcclxuICAgICAgICAgICAgJChcIiNncm91cGxpc3RcIikuaHRtbCh0cGwodF9kYXRhKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNncm91cCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGkubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZ3JvdXBDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxpW2ldLlN0dWRlbnRJbmZvTGlzdC5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHVkZW50Q291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiNncm91cGluZm9cIikuaHRtbChcIiggXCIgKyBzdHVkZW50Q291bnQgKyBcIuS6uiDlhbEgXCIgKyBncm91cENvdW50ICsgXCIg57uEKVwiKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2wgPSBsaVswXS5TdHVkZW50SW5mb0xpc3Q7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNsLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3R1ZGVudENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkKFwiI2dyb3VwaW5mb1wiKS5odG1sKFwiKCBcIiArIHN0dWRlbnRDb3VudCArIFwiIOS6uilcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChzdHVkZW50Q291bnQgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy/noa7lrprmjInpkq7kuI3lj6/nlKhcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2J0bi1zdWJtaXRcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNidG4tc3VibWl0LW5vXCIpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGx1aS5pbml0Q2hlY2tCb3goe1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwbmFtZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JvdXBuYW1lID09IFwiZ2FsbFwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpID09IFwiMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL+WIhue7hFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgR2V0U3R1ZGVudEdyb3VwKGNsYXNzaWQsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/kuI3liIbnu4RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdldFN0dWRlbnRHcm91cChjbGFzc2lkLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChncm91cG5hbWUgPT0gXCJnMVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIikgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoaXRlbSkucGFyZW50KCkucmVtb3ZlQ2xhc3MoXCJkZWZcIikuYWRkQ2xhc3MoXCJzZWxcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGl0ZW0pLnBhcmVudCgpLnJlbW92ZUNsYXNzKFwic2VsXCIpLmFkZENsYXNzKFwiZGVmXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyrojrflj5bmk43kvZzlkI4g5a2m55Sf5YiG57uE5L+h5oGvKi9cclxuZnVuY3Rpb24gY2hhbmdlQ2hlY2tCb3goKSB7XHJcbiAgICAkKFwibHVpY2hlY2tbZGF0YS1uYW1lPSdnMSddXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB2YXIgaXNib29sID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpID09IDE7XHJcblxyXG4gICAgICAgIGlmICghaXNib29sKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgZ2V0Z3JvdXBpbmRleGlkID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1ncm91cGluZGV4aWRcIik7XHJcbiAgICAgICAgICAgIHZhciBzdHVkZW50aWQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLXZhbFwiKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgX3N0dWRlbnRHcm91cC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGdldGdyb3VwaW5kZXhpZCA9PSBfc3R1ZGVudEdyb3VwW2ldLkdyb3VwSW5kZXhJZCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IF9zdHVkZW50R3JvdXBbaV0uU3R1ZGVudEluZm9MaXN0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdHVkZW50aWQgPT0gX3N0dWRlbnRHcm91cFtpXS5TdHVkZW50SW5mb0xpc3Rbal0uU3R1ZGVudElEKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc3R1ZGVudEdyb3VwW2ldLlN0dWRlbnRJbmZvTGlzdC5zcGxpY2UoaiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqLS07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8q5o+Q5Lqk5LiK6K++5L+h5oGvKi9cclxuZnVuY3Rpb24gU2F2ZUNsYXNzQmVnaW4oKSB7XHJcblxyXG4gICAgY2hhbmdlQ2hlY2tCb3goKTtcclxuXHJcbiAgICB2YXIgZ3JvdXBpbmZvID0gSlNPTi5zdHJpbmdpZnkoX3N0dWRlbnRHcm91cCk7XHJcblxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICB1cmw6IFwiL3RlYWNoZXIvbXljbGFzcy9TYXZlQ2xhc3NCZWdpblwiLFxyXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcclxuICAgICAgICBkYXRhOiB7IGNsYXNzaWQ6IGNsYXNzaWQsIGdyb3VwaW5mbzogZ3JvdXBpbmZvIH0sXHJcbiAgICAgICAgZGF0YVR5cGU6IFwiSlNPTlwiLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcclxuXHJcbiAgICAgICAgICAgICQucm91dGVyLmxvYWQoJy90ZWFjaGVyL215Y2xhc3MvQ2xhc3Nyb29tTW9uaXRvcj9jbGFzc2luZGV4PScgKyBkYXRhLnJlc3VsdCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy90ZWFjaGVyUG9ydC9sZXNzb24tc3R1ZGVudC1ncm91cC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDQzIiwidmFyIEx1aURyb3BEb3duTGlzdCA9IHJlcXVpcmUoJy4uL2pzL2Ryb3Bkb3dubGlzdCcpO1xyXG52YXIgTHVpQ2hlY2tCb3ggPSByZXF1aXJlKCcuLi9qcy9jaGVja2JveCcpO1xyXG5cclxuZnVuY3Rpb24gTHVpKCkge1xyXG4gICAgLy90aGlzLmNoZWNrQm94ID0gbnVsbDtcclxuICAgIC8vIHRoaXMuaW5pdFdvcmRTcGVhaygpO1xyXG59O1xyXG5cclxuTHVpLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWksXHJcbiAgICBpbml0VHJlZTogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICB2YXIgdCA9IG5ldyBMdWlUcmVlKCk7XHJcbiAgICAgICAgcmV0dXJuIHQuaW5pdChwKTtcclxuICAgIH0sXHJcbiAgICBpbml0RHJvcERvd25MaXN0OiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHZhciBkID0gbmV3IEx1aURyb3BEb3duTGlzdCgpO1xyXG4gICAgICAgIHJldHVybiBkLmluaXQocCk7XHJcbiAgICB9LFxyXG4gICAgaW5pdENoZWNrQm94OiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIC8v77+977+977+977+90rvvv73vv73vv73vv73vv73vv73vv73vv73Iq++/vda177+9Y2hlY2tib3jvv73vv73vv73vv71cclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tCb3gpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0JveCA9IG5ldyBMdWlDaGVja0JveCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IG5ldyBMdWlDaGVja0JveCgpO1xyXG4gICAgICAgIHJldHVybiBjLmluaXQocCk7XHJcblxyXG4gICAgfSxcclxuICAgIGluaXRXb3JkU3BlYWs6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgLy/vv73vv73vv73vv73Su++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vcir77+91rXvv713b3Jkc3BlYWvvv73vv73vv73vv71cclxuICAgICAgICBpZiAoIXRoaXMud29yZHNwZWFrKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29yZHNwZWFrID0gbmV3IEx1aVdvcmRTcGVhaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IG5ldyBMdWlXb3JkU3BlYWsoKTtcclxuICAgICAgICByZXR1cm4gYy5pbml0KHApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMdWk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9sdWkuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJmdW5jdGlvbiBMdWlEcm9wRG93bkxpc3QoKSB7XHJcbiAgICB0aGlzLnBhcmFtID0gbnVsbDtcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBcIlwiO1xyXG59XHJcbnZhciBkcm9wY291bnQgPSAxMDAwO1xyXG5MdWlEcm9wRG93bkxpc3QucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aURyb3BEb3duTGlzdCxcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSB0aGlzLndhcnBpZCA9IFwiI1wiICsgcGFyYW0ud2FycGlkO1xyXG4gICAgICAgIHZhciB3YXJwaWQgPSBwYXJhbS53YXJwaWQ7XHJcbiAgICAgICAgaWYgKCFwYXJhbS5kYXRhKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHZhciBkYXRhID0gcGFyYW0uZGF0YTtcclxuXHJcbiAgICAgICAgdmFyIHdpZHRoID0gcGFyYW0ud2lkdGggPSBwYXJhbS53aWR0aCB8fCAxODA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHBhcmFtLmhlaWdodCA9IHBhcmFtLmhlaWdodCB8fCAyMDA7XHJcbiAgICAgICAgdmFyIHN1YnRleHRsZW5ndGggPSBwYXJhbS5zdWJ0ZXh0bGVuZ3RoID0gcGFyYW0uc3VidGV4dGxlbmd0aCB8fCA1O1xyXG4gICAgICAgIHBhcmFtLnZhbHVlRmllbGQgPSBwYXJhbS52YWx1ZUZpZWxkIHx8IFwiaWRcIjtcclxuICAgICAgICBwYXJhbS50ZXh0RmllbGQgPSBwYXJhbS50ZXh0RmllbGQgfHwgXCJuYW1lXCI7XHJcbiAgICAgICAgdmFyIHZhbHVlRmllbGQgPSBwYXJhbS52YWx1ZUZpZWxkO1xyXG4gICAgICAgIHZhciB0ZXh0RmllbGQgPSBwYXJhbS50ZXh0RmllbGQ7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkQ2FsbEJhY2sgPSBwYXJhbS5zZWxlY3RlZENhbGxCYWNrO1xyXG4gICAgICAgIHZhciBsb2FkZWRDYWxsQmFjayA9IHBhcmFtLmxvYWRlZENhbGxCYWNrO1xyXG4gICAgICAgIHZhciB6aW5kZXggPSBwYXJhbS56aW5kZXg7XHJcbiAgICAgICAgaWYgKHBhcmFtLmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBkID0ge307XHJcbiAgICAgICAgICAgIGRbdmFsdWVGaWVsZF0gPSAtMTtcclxuICAgICAgICAgICAgZFt0ZXh0RmllbGRdID0gXCJcIjtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKGQpO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/orr7nva7pu5jorqTlgLxcclxuICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IGRhdGFbMF1bdmFsdWVGaWVsZF07XHJcbiAgICAgICAgdmFyIGRlZmF1bHRUZXh0ID0gcGFyYW0uZGVmYXVsdFRleHQgPSBwYXJhbS5kZWZhdWx0VmFsdWUgfHwgZGF0YVswXVt0ZXh0RmllbGRdO1xyXG4gICAgICAgIHRoaXMucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICB2YXIgdWxIdG1sID0gXCI8ZGl2IGNsYXNzPSdkcm9wZGl2IGRuJz5cIjtcclxuICAgICAgICB1bEh0bWwgKz0gJyAgPHVsIGNsYXNzPVwiZHJvcHVsXCIgc3R5bGU9XCJtYXgtaGVpZ2h0OicgKyBoZWlnaHQgKyAncHg7b3ZlcmZsb3c6YXV0bztcIiBkYXRhLWlkPVwiJyArIGRlZmF1bHRWYWx1ZSArICdcIiBkYXRhLW5hbWU9XCInICsgZGVmYXVsdFRleHQgKyAnXCI+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBkYXRhLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gZGF0YVtrXTtcclxuICAgICAgICAgICAgdmFyIHYgPSBpdGVtW3RleHRGaWVsZF0ubGVuZ3RoID4gc3VidGV4dGxlbmd0aCA/IGl0ZW1bdGV4dEZpZWxkXS5zdWJzdHJpbmcoMCwgc3VidGV4dGxlbmd0aCkgKyBcIi4uLlwiIDogaXRlbVt0ZXh0RmllbGRdO1xyXG4gICAgICAgICAgICB2YXIgaXRlbUh0bWwgPSAnPGxpIHRpdGxlPScgKyBpdGVtW3RleHRGaWVsZF0gKyAnIGRhdGEtaW5kZXg9JyArIGsgKyAnIGRhdGEtaWQ9JyArIGl0ZW1bdmFsdWVGaWVsZF0gKyAnIGRhdGEtdGFnPVxcJycgKyBKU09OLnN0cmluZ2lmeShkYXRhW2tdKSArICdcXCc+JyArIHYgKyAnPC9saT4nO1xyXG4gICAgICAgICAgICB1bEh0bWwgKz0gaXRlbUh0bWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVsSHRtbCArPSBcIjwvdWw+XCI7XHJcbiAgICAgICAgdWxIdG1sICs9IFwiPC9kaXY+XCI7XHJcbiAgICAgICAgdmFyIHNwYW5IdG1sID0gJyA8c3BhbiBzdHlsZT1cIndpZHRoOiAnICsgd2lkdGggKyAncHg7XCIgY2xhc3M9XCJkaWJcIj48c3BhbiBkYXRhLXR5cGU9XCJkcm9wZG93bmxpc3RfZHJvcF9zcGFuXCIgaWQ9XCJzcGFuJyArIHBhcmFtLndhcnBpZCArICdcIj4nICsgZGVmYXVsdFRleHQgKyAnPC9zcGFuPiA8aSBjbGFzcz1cIm51bV9kb3duXCI+PC9pPjwvc3Bhbj4nO1xyXG5cclxuICAgICAgICB2YXIgY29uID0gJChcIiNcIiArIHdhcnBpZCk7XHJcbiAgICAgICAgY29uLmNzcyh7IHdpZHRoOiB3aWR0aCB9KTtcclxuICAgICAgICBjb24uYWRkQ2xhc3MoXCJsdWlfZHJvcGRvd25saXN0XCIpO1xyXG4gICAgICAgIGNvbi5odG1sKHNwYW5IdG1sKTtcclxuICAgICAgICBjb24uYXBwZW5kKHVsSHRtbCk7XHJcbiAgICAgICAgaWYgKHppbmRleCkge1xyXG4gICAgICAgICAgICBjb24uZmluZChcIi5kcm9wZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgemluZGV4KTtcclxuICAgICAgICAgICAgY29uLmF0dHIoXCJ6aW5kZXhcIiwgemluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBjb24uZmluZChcIi5kcm9wZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgZHJvcGNvdW50LS0pO1xyXG4gICAgICAgICAgICAvLyBjb24uYXR0cihcInppbmRleFwiLCBkcm9wY291bnQgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uLmFkZENsYXNzKFwiYnRuX251bV91cGRvd25cIikuYWRkQ2xhc3MoXCJidG5fbnVtX3VwZG93bjFcIikuYWRkQ2xhc3MoXCJkaWJcIik7XHJcbiAgICAgICAgY29uLmF0dHIoXCJ0aXRsZVwiLCBkZWZhdWx0VGV4dCk7XHJcbiAgICAgICAgY29uLmF0dHIoXCJkYXRhLWlkXCIsIGRlZmF1bHRWYWx1ZSk7XHJcblxyXG4gICAgICAgIHZhciB1bCA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiB1bFwiKTtcclxuICAgICAgICB2YXIgZHJvcGRpdiA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiAuZHJvcGRpdlwiKTtcclxuICAgICAgICB2YXIgbGkgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgdWwgbGlcIik7XHJcbiAgICAgICAgdmFyIHNwYW4gPSBjb24uZmluZChcInNwYW5bZGF0YS10eXBlPSdkcm9wZG93bmxpc3RfZHJvcF9zcGFuJ11cIik7XHJcbiAgICAgICAgLy/kuovku7ZcclxuICAgICAgICAvL+S4i+aLieS6i+S7tlxyXG4gICAgICAgIGNvbi5jbGljayhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodWwuaXMoXCI6dmlzaWJsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRpdi5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmRyb3BkaXZcIikuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAgICAgLy8gZHJvcGRpdi5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB1bC5zbGlkZURvd24oMjAwKTtcclxuICAgICAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVEb3duKDIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAkKFwiLmRyb3BkaXZcIikuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uLm1vdXNlbGVhdmUoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyAgICAgdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8v6YCJ5Lit5LqL5Lu2XHJcbiAgICAgICAgbGkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFRleHQgPSAkKHRoaXMpLmh0bWwoKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSnNvbiA9ICQodGhpcykuYXR0cihcImRhdGEtam9zblwiKTtcclxuICAgICAgICAgICAgdmFyIGFsbHRpdGxlID0gJCh0aGlzKS5hdHRyKFwidGl0bGVcIik7XHJcbiAgICAgICAgICAgIHNwYW4udGV4dChzZWxlY3RlZFRleHQpO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWlkXCIsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWpzb25cIiwgc2VsZWN0ZWRKc29uKTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwidGl0bGVcIiwgYWxsdGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgY29uLmF0dHIoXCJ0aXRsZVwiLCBhbGx0aXRsZSk7XHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwiZGF0YS1pZFwiLCBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgLy/pgInkuK3lm57osIPkuovku7ZcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2FsbEJhY2sod2FycGlkLCBzZWxlY3RlZFZhbHVlLCBhbGx0aXRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJvcGRpdi5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGFuID0gc3BhbjtcclxuICAgICAgICAvL+iuvue9rum7mOiupOWAvFxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHNwYW4uYXR0cihcImRhdGEtaWRcIiksIHRleHQ6IHNwYW4uYXR0cihcInRpdGxlXCIpLCB6aW5kZXg6ICQodGhpcy5zZWxlY3RvcikuYXR0cihcInppbmRleFwiKSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IC0xLCB0ZXh0OiBcIlwiIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvL+aatOmcsue7meWklumDqOeahOaWueazlVxyXG4gICAgZ2V0U2VsZWN0ZWRKc29uVmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNwYW4uYXR0cihcImRhdGEtanNvblwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgdGV4dHNlbCA9IFwiXCI7XHJcbiAgICAgICAgLy/pgInkuK3nmoTlgLxcclxuICAgICAgICB2YXIgc2VsSXRlbTtcclxuICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICBmb3IgKHZhciBtID0gMDsgbSA8IHRoaXMucGFyYW0uZGF0YS5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXNlbCA9IHRoaXMucGFyYW0uZGF0YVttXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zZWxbdGhpcy5wYXJhbS52YWx1ZUZpZWxkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGV4dHNlbCA9IGl0ZW1zZWxbdGhpcy5wYXJhbS50ZXh0RmllbGRdO1xyXG4gICAgICAgICAgICAgICAgc2VsSXRlbSA9IGl0ZW1zZWw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWlkXCIsIHZhbHVlKTtcclxuICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWpzb25cIiwgSlNPTi5zdHJpbmdpZnkoc2VsSXRlbSkpO1xyXG4gICAgICAgIHNwYW4uYXR0cihcInRpdGxlXCIsIHRleHRzZWwpO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuYXR0cihcInRpdGxlXCIsIHRleHRzZWwpO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9IHRleHRzZWw7XHJcbiAgICAgICAgdmFyIHYgPSB0ZXh0c2VsLmxlbmd0aCA+IHRoaXMucGFyYW0uc3VidGV4dGxlbmd0aCA/IHRleHRzZWwuc3Vic3RyaW5nKDAsIHRoaXMucGFyYW0uc3VidGV4dGxlbmd0aCkgKyBcIi4uLlwiIDogdGV4dHNlbDtcclxuICAgICAgICBzcGFuLnRleHQodik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmxvYWRlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW0ubG9hZGVkQ2FsbEJhY2soY29udGFpbmVySWQsIHNlbGVjdGVkVmFsdWUsIHNlbGVjdGVkVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gTHVpRHJvcERvd25MaXN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9kcm9wZG93bmxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJcclxuZnVuY3Rpb24gTHVpQ2hlY2tCb3goKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gXCJsdWljaGVja1wiO1xyXG4gICAgLy/lj4LmlbBcclxuICAgIHRoaXMucGFyYW0gPSB7fTtcclxufVxyXG5cclxuTHVpQ2hlY2tCb3gucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aUNoZWNrQm94LFxyXG4gICAgLypcclxuICAgICAqd2FycGlkIOWuueWZqGlkXHJcbiAgICAgKmRhdGEg5pWw5o2u6ZuG77yManNvbiDkuLIgW3tuYW1lOnJleCx2YWw6MDAxfSx7bmFtZTpsaWxlaSx2YWw6MDAyfV1cclxuICAgICAq5bGV56S65a2X5q61ICAgdGV4dEZpZWxkXHJcbiAgICAgKuWunumZheWAvOWtl+autSB2YWx1ZUZpZWxkXHJcbiAgICAgKuWbnuiwg+WHveaVsCBjYWxsYmFjayDlj4LmlbDkuLrlvZPliY3op6blj5HnmoTlpI3pgInmoYbkuIrnu5HlrprnmoTmlbDmja5cclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgdmFyIGN0aGlzID0gdGhpcztcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0uZ3JvdXApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9ICdsdWljaGVja1tkYXRhLW5hbWU9XCInICsgcGFyYW0uZ3JvdXAgKyAnXCJdJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2tTdHlsZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKSA9PSAxID8gXCJjaGVja19zZWxcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrc2hvdyA9ICQoaXRlbSkuYXR0cihcImRhdGEtc2hvd2NoZWNrYm94XCIpICE9IDE7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dCA9ICQoaXRlbSkuYXR0cihcImRhdGEtdGV4dFwiKTtcclxuICAgICAgICAgICAgdmFyIGggPSAnPGkgY2xhc3M9XCJpY29uX2NoZWNrICcgKyBpc2NoZWNrU3R5bGUgKyAnIFwiPjwvaT4nO1xyXG4gICAgICAgICAgICB2YXIgcyA9ICc8c3BhbiBjbGFzcz1cImNoZWNrX3RleHRcIiAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiA+JyArIHRleHQgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGggPSBpc2NoZWNrc2hvdyA/IGggKyBzIDogcztcclxuICAgICAgICAgICAgLy8gaWYgKCQoaXRlbSkuZmluZChcImljb25fY2hlY2tcIikubGVuZ3RoID4gMCB8fCAkKGl0ZW0pLmZpbmQoXCJjaGVja190ZXh0XCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChpdGVtKS5odG1sKGgpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNzcyh7IFwiY3Vyc29yXCI6IFwicG9pbnRlclwiIH0pO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19zZWxcIikuYWRkQ2xhc3MoXCJjaGVja19kZWZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19kZWZcIikuYWRkQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBhbGVydChcImJpbmRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0mJnBhcmFtLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwbmFtZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gY3RoaXMuZ2V0SnNvblZhbHVlKGdyb3VwbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjlm57osIPlh73mlbDvvIzlubbov5Tlm57nu4TlkI3lkozmiYDpgInkuK3lgLzlvpdqc29u5LiyXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXJhbS5jYWxsYmFjayhncm91cG5hbWUsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uY2FsbGJhY2soaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcblxyXG4gICAgfSxcclxuICAgIC8v6K6+572uY2hlY2tib3jnu4Tlk6rkupvlgLzooqvpgInkuK1cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5maWx0ZXIoJ1tkYXRhLXZhbD1cIicgKyB2YWwgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoaXRlbSkuY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlmNoZWNrYm9457uE6YCJ5Lit55qE5YC8XHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByLnB1c2goJChpdGVtKS5hdHRyKFwiZGF0YS12YWxcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGVydChyLmpvaW4oJywnKSk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5ZjaGVja2JveOe7hOmAieS4reeahOWAvFxyXG4gICAgZ2V0SnNvblZhbHVlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGpzb25zdHIgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWpzb25cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbnN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHIucHVzaChKU09OLnBhcnNlKHVuZXNjYXBlKGpzb25zdHIpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH0sXHJcbiAgICAvKirliKTmlq3lvZPliY0gY2hlY2tib3gg5piv5ZCm6YCJ5LitICovXHJcbiAgICBpc2NoZWNrOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmZpbHRlcignW2RhdGEtdmFsPVwiJyArIHZhbCArICdcIl0nKVswXTtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICByZXR1cm4gaXNjaGVjayA9PSAxO1xyXG4gICAgfSxcclxuICAgIC8qKuWIpOaWreW9k+WJjSBjaGVja2JveCDmmK/lkKbpgInkuK0gKi9cclxuICAgIGlzY2hlY2tFbGVtZW50OiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIHJldHVybiBpc2NoZWNrID09IDE7XHJcbiAgICB9LFxyXG4gICAgLyoq5qih5ouf5Y2V5Ye7IOWPquaUueWPmOagt+W8jyAqL1xyXG4gICAgc2V0Q2xpY2tTdHlsZTogZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAwKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMSk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY2hpbGRyZW4oXCJpXCIpLmFkZENsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHM9THVpQ2hlY2tCb3g7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2NoZWNrYm94LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIiwiLypUTU9ESlM6e30qL1xyXG4hZnVuY3Rpb24gKCkge1xyXG5cdGZ1bmN0aW9uIGEoYSwgYikge1xyXG5cdFx0cmV0dXJuICgvc3RyaW5nfGZ1bmN0aW9uLy50ZXN0KHR5cGVvZiBiKSA/IGggOiBnKShhLCBiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYihhLCBjKSB7XHJcblx0XHRyZXR1cm4gXCJzdHJpbmdcIiAhPSB0eXBlb2YgYSAmJiAoYyA9IHR5cGVvZiBhLCBcIm51bWJlclwiID09PSBjID8gYSArPSBcIlwiIDogYSA9IFwiZnVuY3Rpb25cIiA9PT0gYyA/IGIoYS5jYWxsKGEpKSA6IFwiXCIpLCBhXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjKGEpIHtcclxuXHRcdHJldHVybiBsW2FdXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkKGEpIHtcclxuXHRcdHJldHVybiBiKGEpLnJlcGxhY2UoLyYoPyFbXFx3I10rOyl8Wzw+XCInXS9nLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZShhLCBiKSB7XHJcblx0XHRpZiAobShhKSlmb3IgKHZhciBjID0gMCwgZCA9IGEubGVuZ3RoOyBkID4gYzsgYysrKWIuY2FsbChhLCBhW2NdLCBjLCBhKTsgZWxzZSBmb3IgKGMgaW4gYSliLmNhbGwoYSwgYVtjXSwgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGYoYSwgYikge1xyXG5cdFx0dmFyIGMgPSAvKFxcLylbXlxcL10rXFwxXFwuXFwuXFwxLywgZCA9IChcIi4vXCIgKyBhKS5yZXBsYWNlKC9bXlxcL10rJC8sIFwiXCIpLCBlID0gZCArIGI7XHJcblx0XHRmb3IgKGUgPSBlLnJlcGxhY2UoL1xcL1xcLlxcLy9nLCBcIi9cIik7IGUubWF0Y2goYyk7KWUgPSBlLnJlcGxhY2UoYywgXCIvXCIpO1xyXG5cdFx0cmV0dXJuIGVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGcoYiwgYykge1xyXG5cdFx0dmFyIGQgPSBhLmdldChiKSB8fCBpKHtmaWxlbmFtZTogYiwgbmFtZTogXCJSZW5kZXIgRXJyb3JcIiwgbWVzc2FnZTogXCJUZW1wbGF0ZSBub3QgZm91bmRcIn0pO1xyXG5cdFx0cmV0dXJuIGMgPyBkKGMpIDogZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaChhLCBiKSB7XHJcblx0XHRpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgYikge1xyXG5cdFx0XHR2YXIgYyA9IGI7XHJcblx0XHRcdGIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBrKGMpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHZhciBkID0galthXSA9IGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBiKGMsIGEpICsgXCJcIlxyXG5cdFx0XHR9IGNhdGNoIChkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGkoZCkoKVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGQucHJvdG90eXBlID0gYi5wcm90b3R5cGUgPSBuLCBkLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gYiArIFwiXCJcclxuXHRcdH0sIGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGkoYSkge1xyXG5cdFx0dmFyIGIgPSBcIntUZW1wbGF0ZSBFcnJvcn1cIiwgYyA9IGEuc3RhY2sgfHwgXCJcIjtcclxuXHRcdGlmIChjKWMgPSBjLnNwbGl0KFwiXFxuXCIpLnNsaWNlKDAsIDIpLmpvaW4oXCJcXG5cIik7IGVsc2UgZm9yICh2YXIgZCBpbiBhKWMgKz0gXCI8XCIgKyBkICsgXCI+XFxuXCIgKyBhW2RdICsgXCJcXG5cXG5cIjtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBcIm9iamVjdFwiID09IHR5cGVvZiBjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IoYiArIFwiXFxuXFxuXCIgKyBjKSwgYlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIGogPSBhLmNhY2hlID0ge30sIGsgPSB0aGlzLlN0cmluZywgbCA9IHtcclxuXHRcdFwiPFwiOiBcIiYjNjA7XCIsXHJcblx0XHRcIj5cIjogXCImIzYyO1wiLFxyXG5cdFx0J1wiJzogXCImIzM0O1wiLFxyXG5cdFx0XCInXCI6IFwiJiMzOTtcIixcclxuXHRcdFwiJlwiOiBcIiYjMzg7XCJcclxuXHR9LCBtID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYSkge1xyXG5cdFx0XHRyZXR1cm4gXCJbb2JqZWN0IEFycmF5XVwiID09PSB7fS50b1N0cmluZy5jYWxsKGEpXHJcblx0XHR9LCBuID0gYS51dGlscyA9IHtcclxuXHRcdCRoZWxwZXJzOiB7fSwgJGluY2x1ZGU6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XHJcblx0XHRcdHJldHVybiBhID0gZihjLCBhKSwgZyhhLCBiKVxyXG5cdFx0fSwgJHN0cmluZzogYiwgJGVzY2FwZTogZCwgJGVhY2g6IGVcclxuXHR9LCBvID0gYS5oZWxwZXJzID0gbi4kaGVscGVycztcclxuXHRhLmdldCA9IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRyZXR1cm4galthLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKV1cclxuXHR9LCBhLmhlbHBlciA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRvW2FdID0gYlxyXG5cdH0sIG1vZHVsZS5leHBvcnRzID0gYVxyXG59KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDEyIDE1IDE2IDE3IDE5IDIwIDIxIDIzIDI3IDI4IDM0IDQwIDQxIDQyIDQzIDQ1IDQ2IDUzIDU0IiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ3NyYy90cGwvdGVhY2hlci9zdHVkZW50LWdyb3VwJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLGlzZ3JvdXA9JGRhdGEuaXNncm91cCwkZWFjaD0kdXRpbHMuJGVhY2gsbGlzdD0kZGF0YS5saXN0LHY9JGRhdGEudixpPSRkYXRhLmksJGVzY2FwZT0kdXRpbHMuJGVzY2FwZSxkPSRkYXRhLmQsaj0kZGF0YS5qLCRvdXQ9Jyc7JG91dCs9JyAnO1xuaWYoaXNncm91cCl7XG4kb3V0Kz0nICA8ZGl2IGNsYXNzPVwibGlzdC1ibG9jayBjYXJkcy1saXN0XCI+IDx1bD4gJztcbiRlYWNoKGxpc3QsZnVuY3Rpb24odixpKXtcbiRvdXQrPScgPGxpIGNsYXNzPVwiY2FyZFwiPiA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXJcIj4nO1xuJG91dCs9JGVzY2FwZSh2Lkdyb3VwSW5kZXhJZCk7XG4kb3V0Kz0n57uEPC9kaXY+IDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj4gPGRpdiBjbGFzcz1cImNhcmQtY29udGVudC1pbm5lclwiPiAnO1xuJGVhY2godi5TdHVkZW50SW5mb0xpc3QsZnVuY3Rpb24oZCxqKXtcbiRvdXQrPScgPGRpdiBjbGFzcz1cInN0dSBzZWxcIj4gPGx1aWNoZWNrIGNsYXNzPVwibHVpX2NoZWNrYm94XCIgZGF0YS1uYW1lPVwiZzFcIiBkYXRhLXZhbD1cIic7XG4kb3V0Kz0kZXNjYXBlKGQuU3R1ZGVudElEKTtcbiRvdXQrPSdcIiBkYXRhLWdyb3VwaW5kZXhpZD1cIic7XG4kb3V0Kz0kZXNjYXBlKHYuR3JvdXBJbmRleElkKTtcbiRvdXQrPSdcIiBkYXRhLXRleHQ9XCJcIiBkYXRhLWNoZWNrZWQ9XCIxXCI+PC9sdWljaGVjaz4gPHNwYW4gY2xhc3M9XCJjaGVjay1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoZC5Vc2VyTmFtZSk7XG4kb3V0Kz0nPC9zcGFuPiA8c3BhbiBjbGFzcz1cImluZm9cIj4nO1xuJG91dCs9JGVzY2FwZSgoZC5Cb29rTnVtYmVyIC0gZC5MZWZ0TnVtYmVyKSk7XG4kb3V0Kz0nLyc7XG4kb3V0Kz0kZXNjYXBlKGQuQm9va051bWJlcik7XG4kb3V0Kz0nPC9zcGFuPiA8L2Rpdj4gJztcbn0pO1xuJG91dCs9JyA8L2Rpdj4gPC9kaXY+IDwvbGk+ICc7XG59KTtcbiRvdXQrPScgPC91bD4gPC9kaXY+ICc7XG59ZWxzZXtcbiRvdXQrPScgIDxkaXYgY2xhc3M9XCJsaXN0LWJsb2NrIGNhcmRzLWxpc3RcIj4gPHVsPiAnO1xuJGVhY2gobGlzdCxmdW5jdGlvbih2LGkpe1xuJG91dCs9JyA8bGkgY2xhc3M9XCJjYXJkXCI+IDxkaXYgY2xhc3M9XCJjYXJkLWNvbnRlbnRcIj4gPGRpdiBjbGFzcz1cImNhcmQtY29udGVudC1pbm5lclwiPiAnO1xuJGVhY2godi5TdHVkZW50SW5mb0xpc3QsZnVuY3Rpb24oZCxqKXtcbiRvdXQrPScgPGRpdiBjbGFzcz1cInN0dSBzZWxcIj4gPGx1aWNoZWNrIGNsYXNzPVwibHVpX2NoZWNrYm94XCIgZGF0YS1uYW1lPVwiZzFcIiBkYXRhLXZhbD1cIic7XG4kb3V0Kz0kZXNjYXBlKGQuU3R1ZGVudElEKTtcbiRvdXQrPSdcIiBkYXRhLWdyb3VwaW5kZXhpZD1cIic7XG4kb3V0Kz0kZXNjYXBlKHYuR3JvdXBJbmRleElkKTtcbiRvdXQrPSdcIiBkYXRhLXRleHQ9XCJcIiBkYXRhLWNoZWNrZWQ9XCIxXCI+PC9sdWljaGVjaz4gPHNwYW4gY2xhc3M9XCJjaGVjay1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoZC5Vc2VyTmFtZSk7XG4kb3V0Kz0nPC9zcGFuPiA8c3BhbiBjbGFzcz1cImluZm9cIj4nO1xuJG91dCs9JGVzY2FwZSgoZC5Cb29rTnVtYmVyIC0gZC5MZWZ0TnVtYmVyKSk7XG4kb3V0Kz0nLyc7XG4kb3V0Kz0kZXNjYXBlKGQuQm9va051bWJlcik7XG4kb3V0Kz0nPC9zcGFuPiA8L2Rpdj4gJztcbn0pO1xuJG91dCs9JyA8L2Rpdj4gPC9kaXY+IDwvbGk+ICc7XG59KTtcbiRvdXQrPScgPC91bD4gPC9kaXY+ICc7XG59XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RwbC90ZWFjaGVyL3N0dWRlbnQtZ3JvdXAudHBsXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDQzIl0sInNvdXJjZVJvb3QiOiIifQ==