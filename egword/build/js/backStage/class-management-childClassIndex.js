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

	var Lui = __webpack_require__(1);
	var tool = __webpack_require__(4);
	/*var dataDic = require("../lib/DataDics");*/
	/*var util = require("../lib/util");*/
	var lui = new Lui();
	//教材部分的点击效果
	//tool.Sibs($('.edit-mesg .operatBtn'));
	
	/*var AddChildClass = {
	    drop_stage: undefined,
	    drop_booktype: undefined,
	    init: function () {
	        drop_stage = lui.initDropDownList({ warpid: "drop_stageid", width: 260, textField: 'name', valueField: 'value', data: dataDic.stageList });
	        drop_booktype = lui.initDropDownList({ warpid: "drop_booktype", width: 260, textField: 'DicValue', valueField: 'DicKey', data: dataDic.bookTypeList });
	        $('input[name="InPrice"],input[name="OutPrice"]').on("keypress", function (e) {
	            return util.checkFloat(e);
	        })
	        $('input[name="DefaultNumber"]').on("keypress", function (e) {
	            return util.checkNum(e);
	        })
	        var tthis = this;
	        $("#btnSubmit").click(function () { tthis.submit(); })
	    },
	    validate: function () {
	        return true;
	    },
	    submit: function () {
	        if (!this.validate()) {
	            return false;
	        }
	        var d = this.getSubmitData();
	        $.ajax({
	            url: "/Management/CourseManage/AddChildCourseApi",
	            type: "post",
	            data: d,
	            success: function (data) {
	                console.log(data);
	                if (data.Ok == "true") {
	                    window.location.href = "/Management/CourseManage/ChildCourseIndex";
	                }
	
	
	            },
	            error: function () { }
	        })
	
	
	
	    },
	    getSubmitData: function () {
	
	        var submitData = {};
	        submitData.GName = $('input[name="GName"]').val();
	        submitData.InPrice = $('input[name="InPrice"]').val();
	        submitData.OutPrice = $('input[name="OutPrice"]').val();
	        submitData.DefaultNumber = $('input[name="DefaultNumber"]').val();
	        submitData.StageID = drop_stage.getValue().value;
	        submitData.BookType = drop_booktype.getValue().value;
	
	
	        //获取书本列表
	
	        var bookList = [];
	        $('span[data-name="course_book"]').each(function (index, item) {
	            var bookid = $(item).attr("data-bookid");
	            bookList.push({ BookID: bookid, BookGroupID: 0 });
	        })
	        submitData.BookList = bookList;
	        submitData.Remark = $('textarea[name="Remark"]').val();
	        return submitData;
	    }
	
	
	}
	$(function () {
	    AddChildClass.init();
	})*/


/***/ },
/* 1 */
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
/* 2 */
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
/* 3 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy9iYWNrU3RhZ2UvY2xhc3MtbWFuYWdlbWVudC1jaGlsZENsYXNzSW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9sdWkuanM/ZTc5MCoqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9kcm9wZG93bmxpc3QuanM/ZmVmMCoqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9jaGVja2JveC5qcz82MTZkKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL3Rvb2wuanM/NWU2YSoqKioqKioqIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQSw0Q0FBMkM7QUFDM0MscUNBQW9DO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQyxzR0FBc0c7QUFDakosK0NBQThDLCtHQUErRztBQUM3SjtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSw0Q0FBMkMsZ0JBQWdCLEVBQUU7QUFDN0QsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsY0FBYTtBQUNiLGlDQUFnQztBQUNoQyxVQUFTOzs7O0FBSVQsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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aEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmFja1N0YWdlL2NsYXNzLW1hbmFnZW1lbnQtY2hpbGRDbGFzc0luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjUiLCJ2YXIgTHVpID0gcmVxdWlyZSgnLi4vLi4vTFVJL2pzL2x1aScpO1xyXG52YXIgdG9vbCA9IHJlcXVpcmUoJy4uLy4uL0xVSS90b29sJyk7XHJcbi8qdmFyIGRhdGFEaWMgPSByZXF1aXJlKFwiLi4vbGliL0RhdGFEaWNzXCIpOyovXHJcbi8qdmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vbGliL3V0aWxcIik7Ki9cclxudmFyIGx1aSA9IG5ldyBMdWkoKTtcclxuLy/mlZnmnZDpg6jliIbnmoTngrnlh7vmlYjmnpxcclxuLy90b29sLlNpYnMoJCgnLmVkaXQtbWVzZyAub3BlcmF0QnRuJykpO1xyXG5cclxuLyp2YXIgQWRkQ2hpbGRDbGFzcyA9IHtcclxuICAgIGRyb3Bfc3RhZ2U6IHVuZGVmaW5lZCxcclxuICAgIGRyb3BfYm9va3R5cGU6IHVuZGVmaW5lZCxcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBkcm9wX3N0YWdlID0gbHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9zdGFnZWlkXCIsIHdpZHRoOiAyNjAsIHRleHRGaWVsZDogJ25hbWUnLCB2YWx1ZUZpZWxkOiAndmFsdWUnLCBkYXRhOiBkYXRhRGljLnN0YWdlTGlzdCB9KTtcclxuICAgICAgICBkcm9wX2Jvb2t0eXBlID0gbHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9ib29rdHlwZVwiLCB3aWR0aDogMjYwLCB0ZXh0RmllbGQ6ICdEaWNWYWx1ZScsIHZhbHVlRmllbGQ6ICdEaWNLZXknLCBkYXRhOiBkYXRhRGljLmJvb2tUeXBlTGlzdCB9KTtcclxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwiSW5QcmljZVwiXSxpbnB1dFtuYW1lPVwiT3V0UHJpY2VcIl0nKS5vbihcImtleXByZXNzXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1dGlsLmNoZWNrRmxvYXQoZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKCdpbnB1dFtuYW1lPVwiRGVmYXVsdE51bWJlclwiXScpLm9uKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHV0aWwuY2hlY2tOdW0oZSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICB2YXIgdHRoaXMgPSB0aGlzO1xyXG4gICAgICAgICQoXCIjYnRuU3VibWl0XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHsgdHRoaXMuc3VibWl0KCk7IH0pXHJcbiAgICB9LFxyXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0sXHJcbiAgICBzdWJtaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmFsaWRhdGUoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkID0gdGhpcy5nZXRTdWJtaXREYXRhKCk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9NYW5hZ2VtZW50L0NvdXJzZU1hbmFnZS9BZGRDaGlsZENvdXJzZUFwaVwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICAgICAgZGF0YTogZCxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuT2sgPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL01hbmFnZW1lbnQvQ291cnNlTWFuYWdlL0NoaWxkQ291cnNlSW5kZXhcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkgeyB9XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG5cclxuICAgIH0sXHJcbiAgICBnZXRTdWJtaXREYXRhOiBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHZhciBzdWJtaXREYXRhID0ge307XHJcbiAgICAgICAgc3VibWl0RGF0YS5HTmFtZSA9ICQoJ2lucHV0W25hbWU9XCJHTmFtZVwiXScpLnZhbCgpO1xyXG4gICAgICAgIHN1Ym1pdERhdGEuSW5QcmljZSA9ICQoJ2lucHV0W25hbWU9XCJJblByaWNlXCJdJykudmFsKCk7XHJcbiAgICAgICAgc3VibWl0RGF0YS5PdXRQcmljZSA9ICQoJ2lucHV0W25hbWU9XCJPdXRQcmljZVwiXScpLnZhbCgpO1xyXG4gICAgICAgIHN1Ym1pdERhdGEuRGVmYXVsdE51bWJlciA9ICQoJ2lucHV0W25hbWU9XCJEZWZhdWx0TnVtYmVyXCJdJykudmFsKCk7XHJcbiAgICAgICAgc3VibWl0RGF0YS5TdGFnZUlEID0gZHJvcF9zdGFnZS5nZXRWYWx1ZSgpLnZhbHVlO1xyXG4gICAgICAgIHN1Ym1pdERhdGEuQm9va1R5cGUgPSBkcm9wX2Jvb2t0eXBlLmdldFZhbHVlKCkudmFsdWU7XHJcblxyXG5cclxuICAgICAgICAvL+iOt+WPluS5puacrOWIl+ihqFxyXG5cclxuICAgICAgICB2YXIgYm9va0xpc3QgPSBbXTtcclxuICAgICAgICAkKCdzcGFuW2RhdGEtbmFtZT1cImNvdXJzZV9ib29rXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGJvb2tpZCA9ICQoaXRlbSkuYXR0cihcImRhdGEtYm9va2lkXCIpO1xyXG4gICAgICAgICAgICBib29rTGlzdC5wdXNoKHsgQm9va0lEOiBib29raWQsIEJvb2tHcm91cElEOiAwIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgc3VibWl0RGF0YS5Cb29rTGlzdCA9IGJvb2tMaXN0O1xyXG4gICAgICAgIHN1Ym1pdERhdGEuUmVtYXJrID0gJCgndGV4dGFyZWFbbmFtZT1cIlJlbWFya1wiXScpLnZhbCgpO1xyXG4gICAgICAgIHJldHVybiBzdWJtaXREYXRhO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBBZGRDaGlsZENsYXNzLmluaXQoKTtcclxufSkqL1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9iYWNrU3RhZ2UvY2xhc3MtbWFuYWdlbWVudC1jaGlsZENsYXNzSW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSA4IiwidmFyIEx1aURyb3BEb3duTGlzdCA9IHJlcXVpcmUoJy4uL2pzL2Ryb3Bkb3dubGlzdCcpO1xyXG52YXIgTHVpQ2hlY2tCb3ggPSByZXF1aXJlKCcuLi9qcy9jaGVja2JveCcpO1xyXG5cclxuZnVuY3Rpb24gTHVpKCkge1xyXG4gICAgLy90aGlzLmNoZWNrQm94ID0gbnVsbDtcclxuICAgIC8vIHRoaXMuaW5pdFdvcmRTcGVhaygpO1xyXG59O1xyXG5cclxuTHVpLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWksXHJcbiAgICBpbml0VHJlZTogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICB2YXIgdCA9IG5ldyBMdWlUcmVlKCk7XHJcbiAgICAgICAgcmV0dXJuIHQuaW5pdChwKTtcclxuICAgIH0sXHJcbiAgICBpbml0RHJvcERvd25MaXN0OiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHZhciBkID0gbmV3IEx1aURyb3BEb3duTGlzdCgpO1xyXG4gICAgICAgIHJldHVybiBkLmluaXQocCk7XHJcbiAgICB9LFxyXG4gICAgaW5pdENoZWNrQm94OiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIC8v77+977+977+977+90rvvv73vv73vv73vv73vv73vv73vv73vv73Iq++/vda177+9Y2hlY2tib3jvv73vv73vv73vv71cclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tCb3gpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0JveCA9IG5ldyBMdWlDaGVja0JveCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IG5ldyBMdWlDaGVja0JveCgpO1xyXG4gICAgICAgIHJldHVybiBjLmluaXQocCk7XHJcblxyXG4gICAgfSxcclxuICAgIGluaXRXb3JkU3BlYWs6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgLy/vv73vv73vv73vv73Su++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vcir77+91rXvv713b3Jkc3BlYWvvv73vv73vv73vv71cclxuICAgICAgICBpZiAoIXRoaXMud29yZHNwZWFrKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29yZHNwZWFrID0gbmV3IEx1aVdvcmRTcGVhaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IG5ldyBMdWlXb3JkU3BlYWsoKTtcclxuICAgICAgICByZXR1cm4gYy5pbml0KHApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMdWk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9sdWkuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJmdW5jdGlvbiBMdWlEcm9wRG93bkxpc3QoKSB7XHJcbiAgICB0aGlzLnBhcmFtID0gbnVsbDtcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBcIlwiO1xyXG59XHJcbnZhciBkcm9wY291bnQgPSAxMDAwO1xyXG5MdWlEcm9wRG93bkxpc3QucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aURyb3BEb3duTGlzdCxcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSB0aGlzLndhcnBpZCA9IFwiI1wiICsgcGFyYW0ud2FycGlkO1xyXG4gICAgICAgIHZhciB3YXJwaWQgPSBwYXJhbS53YXJwaWQ7XHJcbiAgICAgICAgaWYgKCFwYXJhbS5kYXRhKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHZhciBkYXRhID0gcGFyYW0uZGF0YTtcclxuXHJcbiAgICAgICAgdmFyIHdpZHRoID0gcGFyYW0ud2lkdGggPSBwYXJhbS53aWR0aCB8fCAxODA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHBhcmFtLmhlaWdodCA9IHBhcmFtLmhlaWdodCB8fCAyMDA7XHJcbiAgICAgICAgdmFyIHN1YnRleHRsZW5ndGggPSBwYXJhbS5zdWJ0ZXh0bGVuZ3RoID0gcGFyYW0uc3VidGV4dGxlbmd0aCB8fCA1O1xyXG4gICAgICAgIHBhcmFtLnZhbHVlRmllbGQgPSBwYXJhbS52YWx1ZUZpZWxkIHx8IFwiaWRcIjtcclxuICAgICAgICBwYXJhbS50ZXh0RmllbGQgPSBwYXJhbS50ZXh0RmllbGQgfHwgXCJuYW1lXCI7XHJcbiAgICAgICAgdmFyIHZhbHVlRmllbGQgPSBwYXJhbS52YWx1ZUZpZWxkO1xyXG4gICAgICAgIHZhciB0ZXh0RmllbGQgPSBwYXJhbS50ZXh0RmllbGQ7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkQ2FsbEJhY2sgPSBwYXJhbS5zZWxlY3RlZENhbGxCYWNrO1xyXG4gICAgICAgIHZhciBsb2FkZWRDYWxsQmFjayA9IHBhcmFtLmxvYWRlZENhbGxCYWNrO1xyXG4gICAgICAgIHZhciB6aW5kZXggPSBwYXJhbS56aW5kZXg7XHJcbiAgICAgICAgaWYgKHBhcmFtLmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBkID0ge307XHJcbiAgICAgICAgICAgIGRbdmFsdWVGaWVsZF0gPSAtMTtcclxuICAgICAgICAgICAgZFt0ZXh0RmllbGRdID0gXCJcIjtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKGQpO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/orr7nva7pu5jorqTlgLxcclxuICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IGRhdGFbMF1bdmFsdWVGaWVsZF07XHJcbiAgICAgICAgdmFyIGRlZmF1bHRUZXh0ID0gcGFyYW0uZGVmYXVsdFRleHQgPSBwYXJhbS5kZWZhdWx0VmFsdWUgfHwgZGF0YVswXVt0ZXh0RmllbGRdO1xyXG4gICAgICAgIHRoaXMucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICB2YXIgdWxIdG1sID0gXCI8ZGl2IGNsYXNzPSdkcm9wZGl2IGRuJz5cIjtcclxuICAgICAgICB1bEh0bWwgKz0gJyAgPHVsIGNsYXNzPVwiZHJvcHVsXCIgc3R5bGU9XCJtYXgtaGVpZ2h0OicgKyBoZWlnaHQgKyAncHg7b3ZlcmZsb3c6YXV0bztcIiBkYXRhLWlkPVwiJyArIGRlZmF1bHRWYWx1ZSArICdcIiBkYXRhLW5hbWU9XCInICsgZGVmYXVsdFRleHQgKyAnXCI+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBkYXRhLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gZGF0YVtrXTtcclxuICAgICAgICAgICAgdmFyIHYgPSBpdGVtW3RleHRGaWVsZF0ubGVuZ3RoID4gc3VidGV4dGxlbmd0aCA/IGl0ZW1bdGV4dEZpZWxkXS5zdWJzdHJpbmcoMCwgc3VidGV4dGxlbmd0aCkgKyBcIi4uLlwiIDogaXRlbVt0ZXh0RmllbGRdO1xyXG4gICAgICAgICAgICB2YXIgaXRlbUh0bWwgPSAnPGxpIHRpdGxlPScgKyBpdGVtW3RleHRGaWVsZF0gKyAnIGRhdGEtaW5kZXg9JyArIGsgKyAnIGRhdGEtaWQ9JyArIGl0ZW1bdmFsdWVGaWVsZF0gKyAnIGRhdGEtdGFnPVxcJycgKyBKU09OLnN0cmluZ2lmeShkYXRhW2tdKSArICdcXCc+JyArIHYgKyAnPC9saT4nO1xyXG4gICAgICAgICAgICB1bEh0bWwgKz0gaXRlbUh0bWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVsSHRtbCArPSBcIjwvdWw+XCI7XHJcbiAgICAgICAgdWxIdG1sICs9IFwiPC9kaXY+XCI7XHJcbiAgICAgICAgdmFyIHNwYW5IdG1sID0gJyA8c3BhbiBzdHlsZT1cIndpZHRoOiAnICsgd2lkdGggKyAncHg7XCIgY2xhc3M9XCJkaWJcIj48c3BhbiBkYXRhLXR5cGU9XCJkcm9wZG93bmxpc3RfZHJvcF9zcGFuXCIgaWQ9XCJzcGFuJyArIHBhcmFtLndhcnBpZCArICdcIj4nICsgZGVmYXVsdFRleHQgKyAnPC9zcGFuPiA8aSBjbGFzcz1cIm51bV9kb3duXCI+PC9pPjwvc3Bhbj4nO1xyXG5cclxuICAgICAgICB2YXIgY29uID0gJChcIiNcIiArIHdhcnBpZCk7XHJcbiAgICAgICAgY29uLmNzcyh7IHdpZHRoOiB3aWR0aCB9KTtcclxuICAgICAgICBjb24uYWRkQ2xhc3MoXCJsdWlfZHJvcGRvd25saXN0XCIpO1xyXG4gICAgICAgIGNvbi5odG1sKHNwYW5IdG1sKTtcclxuICAgICAgICBjb24uYXBwZW5kKHVsSHRtbCk7XHJcbiAgICAgICAgaWYgKHppbmRleCkge1xyXG4gICAgICAgICAgICBjb24uZmluZChcIi5kcm9wZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgemluZGV4KTtcclxuICAgICAgICAgICAgY29uLmF0dHIoXCJ6aW5kZXhcIiwgemluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBjb24uZmluZChcIi5kcm9wZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgZHJvcGNvdW50LS0pO1xyXG4gICAgICAgICAgICAvLyBjb24uYXR0cihcInppbmRleFwiLCBkcm9wY291bnQgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uLmFkZENsYXNzKFwiYnRuX251bV91cGRvd25cIikuYWRkQ2xhc3MoXCJidG5fbnVtX3VwZG93bjFcIikuYWRkQ2xhc3MoXCJkaWJcIik7XHJcbiAgICAgICAgY29uLmF0dHIoXCJ0aXRsZVwiLCBkZWZhdWx0VGV4dCk7XHJcbiAgICAgICAgY29uLmF0dHIoXCJkYXRhLWlkXCIsIGRlZmF1bHRWYWx1ZSk7XHJcblxyXG4gICAgICAgIHZhciB1bCA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiB1bFwiKTtcclxuICAgICAgICB2YXIgZHJvcGRpdiA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiAuZHJvcGRpdlwiKTtcclxuICAgICAgICB2YXIgbGkgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgdWwgbGlcIik7XHJcbiAgICAgICAgdmFyIHNwYW4gPSBjb24uZmluZChcInNwYW5bZGF0YS10eXBlPSdkcm9wZG93bmxpc3RfZHJvcF9zcGFuJ11cIik7XHJcbiAgICAgICAgLy/kuovku7ZcclxuICAgICAgICAvL+S4i+aLieS6i+S7tlxyXG4gICAgICAgIGNvbi5jbGljayhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodWwuaXMoXCI6dmlzaWJsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRpdi5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmRyb3BkaXZcIikuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAgICAgLy8gZHJvcGRpdi5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB1bC5zbGlkZURvd24oMjAwKTtcclxuICAgICAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVEb3duKDIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAkKFwiLmRyb3BkaXZcIikuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uLm1vdXNlbGVhdmUoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyAgICAgdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8v6YCJ5Lit5LqL5Lu2XHJcbiAgICAgICAgbGkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFRleHQgPSAkKHRoaXMpLmh0bWwoKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSnNvbiA9ICQodGhpcykuYXR0cihcImRhdGEtam9zblwiKTtcclxuICAgICAgICAgICAgdmFyIGFsbHRpdGxlID0gJCh0aGlzKS5hdHRyKFwidGl0bGVcIik7XHJcbiAgICAgICAgICAgIHNwYW4udGV4dChzZWxlY3RlZFRleHQpO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWlkXCIsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWpzb25cIiwgc2VsZWN0ZWRKc29uKTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwidGl0bGVcIiwgYWxsdGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgY29uLmF0dHIoXCJ0aXRsZVwiLCBhbGx0aXRsZSk7XHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwiZGF0YS1pZFwiLCBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgLy/pgInkuK3lm57osIPkuovku7ZcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2FsbEJhY2sod2FycGlkLCBzZWxlY3RlZFZhbHVlLCBhbGx0aXRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJvcGRpdi5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGFuID0gc3BhbjtcclxuICAgICAgICAvL+iuvue9rum7mOiupOWAvFxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHNwYW4uYXR0cihcImRhdGEtaWRcIiksIHRleHQ6IHNwYW4uYXR0cihcInRpdGxlXCIpLCB6aW5kZXg6ICQodGhpcy5zZWxlY3RvcikuYXR0cihcInppbmRleFwiKSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IC0xLCB0ZXh0OiBcIlwiIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvL+aatOmcsue7meWklumDqOeahOaWueazlVxyXG4gICAgZ2V0U2VsZWN0ZWRKc29uVmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNwYW4uYXR0cihcImRhdGEtanNvblwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgdGV4dHNlbCA9IFwiXCI7XHJcbiAgICAgICAgLy/pgInkuK3nmoTlgLxcclxuICAgICAgICB2YXIgc2VsSXRlbTtcclxuICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICBmb3IgKHZhciBtID0gMDsgbSA8IHRoaXMucGFyYW0uZGF0YS5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXNlbCA9IHRoaXMucGFyYW0uZGF0YVttXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zZWxbdGhpcy5wYXJhbS52YWx1ZUZpZWxkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGV4dHNlbCA9IGl0ZW1zZWxbdGhpcy5wYXJhbS50ZXh0RmllbGRdO1xyXG4gICAgICAgICAgICAgICAgc2VsSXRlbSA9IGl0ZW1zZWw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWlkXCIsIHZhbHVlKTtcclxuICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWpzb25cIiwgSlNPTi5zdHJpbmdpZnkoc2VsSXRlbSkpO1xyXG4gICAgICAgIHNwYW4uYXR0cihcInRpdGxlXCIsIHRleHRzZWwpO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuYXR0cihcInRpdGxlXCIsIHRleHRzZWwpO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9IHRleHRzZWw7XHJcbiAgICAgICAgdmFyIHYgPSB0ZXh0c2VsLmxlbmd0aCA+IHRoaXMucGFyYW0uc3VidGV4dGxlbmd0aCA/IHRleHRzZWwuc3Vic3RyaW5nKDAsIHRoaXMucGFyYW0uc3VidGV4dGxlbmd0aCkgKyBcIi4uLlwiIDogdGV4dHNlbDtcclxuICAgICAgICBzcGFuLnRleHQodik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmxvYWRlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW0ubG9hZGVkQ2FsbEJhY2soY29udGFpbmVySWQsIHNlbGVjdGVkVmFsdWUsIHNlbGVjdGVkVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gTHVpRHJvcERvd25MaXN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9kcm9wZG93bmxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJcclxuZnVuY3Rpb24gTHVpQ2hlY2tCb3goKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gXCJsdWljaGVja1wiO1xyXG4gICAgLy/lj4LmlbBcclxuICAgIHRoaXMucGFyYW0gPSB7fTtcclxufVxyXG5cclxuTHVpQ2hlY2tCb3gucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aUNoZWNrQm94LFxyXG4gICAgLypcclxuICAgICAqd2FycGlkIOWuueWZqGlkXHJcbiAgICAgKmRhdGEg5pWw5o2u6ZuG77yManNvbiDkuLIgW3tuYW1lOnJleCx2YWw6MDAxfSx7bmFtZTpsaWxlaSx2YWw6MDAyfV1cclxuICAgICAq5bGV56S65a2X5q61ICAgdGV4dEZpZWxkXHJcbiAgICAgKuWunumZheWAvOWtl+autSB2YWx1ZUZpZWxkXHJcbiAgICAgKuWbnuiwg+WHveaVsCBjYWxsYmFjayDlj4LmlbDkuLrlvZPliY3op6blj5HnmoTlpI3pgInmoYbkuIrnu5HlrprnmoTmlbDmja5cclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgdmFyIGN0aGlzID0gdGhpcztcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0uZ3JvdXApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9ICdsdWljaGVja1tkYXRhLW5hbWU9XCInICsgcGFyYW0uZ3JvdXAgKyAnXCJdJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2tTdHlsZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKSA9PSAxID8gXCJjaGVja19zZWxcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrc2hvdyA9ICQoaXRlbSkuYXR0cihcImRhdGEtc2hvd2NoZWNrYm94XCIpICE9IDE7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dCA9ICQoaXRlbSkuYXR0cihcImRhdGEtdGV4dFwiKTtcclxuICAgICAgICAgICAgdmFyIGggPSAnPGkgY2xhc3M9XCJpY29uX2NoZWNrICcgKyBpc2NoZWNrU3R5bGUgKyAnIFwiPjwvaT4nO1xyXG4gICAgICAgICAgICB2YXIgcyA9ICc8c3BhbiBjbGFzcz1cImNoZWNrX3RleHRcIiAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiA+JyArIHRleHQgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGggPSBpc2NoZWNrc2hvdyA/IGggKyBzIDogcztcclxuICAgICAgICAgICAgLy8gaWYgKCQoaXRlbSkuZmluZChcImljb25fY2hlY2tcIikubGVuZ3RoID4gMCB8fCAkKGl0ZW0pLmZpbmQoXCJjaGVja190ZXh0XCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChpdGVtKS5odG1sKGgpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNzcyh7IFwiY3Vyc29yXCI6IFwicG9pbnRlclwiIH0pO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19zZWxcIikuYWRkQ2xhc3MoXCJjaGVja19kZWZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19kZWZcIikuYWRkQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBhbGVydChcImJpbmRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0mJnBhcmFtLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwbmFtZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gY3RoaXMuZ2V0SnNvblZhbHVlKGdyb3VwbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjlm57osIPlh73mlbDvvIzlubbov5Tlm57nu4TlkI3lkozmiYDpgInkuK3lgLzlvpdqc29u5LiyXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXJhbS5jYWxsYmFjayhncm91cG5hbWUsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uY2FsbGJhY2soaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcblxyXG4gICAgfSxcclxuICAgIC8v6K6+572uY2hlY2tib3jnu4Tlk6rkupvlgLzooqvpgInkuK1cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5maWx0ZXIoJ1tkYXRhLXZhbD1cIicgKyB2YWwgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoaXRlbSkuY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlmNoZWNrYm9457uE6YCJ5Lit55qE5YC8XHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByLnB1c2goJChpdGVtKS5hdHRyKFwiZGF0YS12YWxcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGVydChyLmpvaW4oJywnKSk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5ZjaGVja2JveOe7hOmAieS4reeahOWAvFxyXG4gICAgZ2V0SnNvblZhbHVlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGpzb25zdHIgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWpzb25cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbnN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHIucHVzaChKU09OLnBhcnNlKHVuZXNjYXBlKGpzb25zdHIpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH0sXHJcbiAgICAvKirliKTmlq3lvZPliY0gY2hlY2tib3gg5piv5ZCm6YCJ5LitICovXHJcbiAgICBpc2NoZWNrOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmZpbHRlcignW2RhdGEtdmFsPVwiJyArIHZhbCArICdcIl0nKVswXTtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICByZXR1cm4gaXNjaGVjayA9PSAxO1xyXG4gICAgfSxcclxuICAgIC8qKuWIpOaWreW9k+WJjSBjaGVja2JveCDmmK/lkKbpgInkuK0gKi9cclxuICAgIGlzY2hlY2tFbGVtZW50OiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIHJldHVybiBpc2NoZWNrID09IDE7XHJcbiAgICB9LFxyXG4gICAgLyoq5qih5ouf5Y2V5Ye7IOWPquaUueWPmOagt+W8jyAqL1xyXG4gICAgc2V0Q2xpY2tTdHlsZTogZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAwKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMSk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY2hpbGRyZW4oXCJpXCIpLmFkZENsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHM9THVpQ2hlY2tCb3g7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2NoZWNrYm94LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIiwiXHJcblxyXG5mdW5jdGlvbiBwb3BzaG93KHNlbGUsIHBvcHNob3cpIHsvL+W8ueWHuuWxgueahOaYvuekulxyXG4gICBcclxuICAgIHNlbGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBvcHNob3cuc2hvdygpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5zaG93KCk7XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIHBvcGhpZGUoc2VsZSwgcG9wc2hvdykgey8v5by55Ye65bGC55qE5raI5aSxXHJcbiAgICBzZWxlLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwb3BzaG93LmhpZGUoKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5oaWRlKCk7XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGNoZWNrQm9veCgpIHsvL+WkjemAieahhueahOagt+W8j1xyXG4gICAgJCgnLmNoZWNrQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gY2hvb3NlQWxsKCkgey8v5YWo6YCJ5YWo5LiN6YCJXHJcbiAgICAkKCcuY2hlY2tCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG51bSA9ICQoJy5jaGVja0JveCcpLmluZGV4KCQodGhpcykpO1xyXG4gICAgICAgIGlmIChudW0gPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknKSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyICRpbWdzID0gJC5tYWtlQXJyYXkoJCgnLnRhYmxlIHRyOm5vdCg6Zmlyc3QpJykuZmluZCgnaW1nJykpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkaW1ncy5ldmVyeShmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc3R5bGUudmlzaWJpbGl0eSA9PSAndmlzaWJsZSc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxufVxyXG5mdW5jdGlvbiBTaWJzKFRoaXMpIHtcclxuICAgIFRoaXMub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcmFkaW8oKSB7Ly/ljZXpgInnmoTmoLflvI9cclxuICAgICQoJy5yYWRpbycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcucmFkaW8nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDb29raWUob2JqTmFtZSwgb2JqVmFsdWUsIG9iakhvdXJzKSB7XHJcbiAgICB2YXIgc3RyID0gb2JqTmFtZSArIFwiPVwiICsgZXNjYXBlKG9ialZhbHVlKTtcclxuXHJcbiAgICBpZiAob2JqSG91cnMgPiAwKSB7IC8v5Li6MOaXtuS4jeiuvuWumui/h+acn+aXtumXtO+8jOa1j+iniOWZqOWFs+mXreaXtmNvb2tpZeiHquWKqOa2iOWksVxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB2YXIgbXMgPSBvYmpIb3VycyAqIDM2MDAgKiAxMDAwO1xyXG4gICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIG1zKTtcclxuICAgICAgICBzdHIgKz0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCkgKyBcIjtwYXRoPS9cIjtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IHN0cjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29va2llKG9iak5hbWUpIHsgLy/ojrflj5bmjIflrprlkI3np7DnmoRjb29raWXnmoTlgLxcclxuICAgIHZhciBhcnJTdHIgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7IFwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyU3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBhcnJTdHJbaV0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgIGlmICh0ZW1wWzBdID09IG9iak5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZXNjYXBlKHRlbXBbMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy/lvLnlh7rliqDovb3lm77niYdcclxuZnVuY3Rpb24gU2hvd0xvYWRpbmcob2JqKSB7XHJcbiAgICBvYmouaHRtbChqUXVlcnkoXCIjZGl2TG9hZGluZ1wiKS5odG1sKCkpO1xyXG59XHJcbmZ1bmN0aW9uIHRpbWVUaWNrQmlnKHNlY29uZCkge1xyXG4gICAgJChcIi50aW1lcy1iaWdcIikuaHRtbChzZWNvbmQpO1xyXG4gICAgdmFyIHQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi50aW1lcy1iaWdcIikuaHRtbCgtLXNlY29uZCk7XHJcbiAgICAgICAgaWYgKHNlY29uZCA8PSAwKSB7XHJcbiAgICAgICAgICAgICQoXCIucm90YXRlLXBvaW50XCIpLmNzcyh7IFwiYW5pbWF0aW9uLXBsYXktc3RhdGVcIjogXCJwYXVzZWRcIiB9KTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LCAxMDAwKTtcclxuICAgICQoXCIucm90YXRlLXBvaW50XCIpLmNzcyh7IFwiYW5pbWF0aW9uLXBsYXktc3RhdGVcIjogXCJydW5uaW5nXCIgfSk7XHJcbn1cclxuXHJcbi8v5Yqg6L295Zu+54mH5Yiw5p+Q5Liq5YWD57Sg5LitXHJcbmZ1bmN0aW9uIEluc2VydExvYWRpbmcob2JqKSB7XHJcbiAgICBvYmouYXBwZW5kKGpRdWVyeShcIiNkaXZMb2FkaW5nXCIpLmh0bWwoKSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcG9waGlkZTogcG9waGlkZSxcclxuICAgIHBvcHNob3c6IHBvcHNob3csXHJcbiAgICBjaGVja0Jvb3g6IGNoZWNrQm9veCxcclxuICAgIFNpYnM6IFNpYnMsXHJcbiAgICByYWRpbzogcmFkaW8sXHJcbiAgICBjaG9vc2VBbGw6IGNob29zZUFsbCxcclxuICAgIHNldENvb2tpZTogc2V0Q29va2llLC8v6K6+572uY29va2llXHJcbiAgICBnZXRDb29raWU6IGdldENvb2tpZSwgLy8g6I635Y+WY29va2llXHJcbiAgICBTaG93TG9hZGluZzogU2hvd0xvYWRpbmcsLy/liqDovb3kuK1cclxuICAgIEluc2VydExvYWRpbmc6IEluc2VydExvYWRpbmcsXHJcbiAgICB0aW1lVGlja0JpZzogdGltZVRpY2tCaWcvL+WAkuiuoeaXtlxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS90b29sLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMiAxMyAxOCAxOSAyMCAyMSAyNyAyOCAzNiJdLCJzb3VyY2VSb290IjoiIn0=