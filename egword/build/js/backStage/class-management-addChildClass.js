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
	var dataDic = __webpack_require__(5);
	var util = __webpack_require__(6);
	var lui = new Lui();
	//教材部分的点击效果
	//tool.Sibs($('.edit-mesg .operatBtn'));
	
	
	var AddChildClass = {
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
	})
	


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


/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
	    //学段列表
	    stageList: [{ name: "不限", value: "" }, { name: "小学", value: "X" }, { name: "初中", value: "C" }, { name: "高中", value: "G" }],
	    bookTypeList: (function () {
	        var result = [];
	        $.ajax({
	            url: "/Management/CourseManage/GetDicList",
	            type: "get",
	            async: false,
	            data: { dicType: 2 },
	            success: function (data) {
	                result = data.Data;
	
	            },
	            error: function () { return result; }
	        });
	        return result;
	    })()
	
	}


/***/ },
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2JhY2tTdGFnZS9jbGFzcy1tYW5hZ2VtZW50LWFkZENoaWxkQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9sdWkuanM/ZTc5MCoqIiwid2VicGFjazovLy8uL3NyYy9MVUkvanMvZHJvcGRvd25saXN0LmpzP2ZlZjAqKiIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2NoZWNrYm94LmpzPzYxNmQqKiIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL3Rvb2wuanM/NWU2YSoqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9kYXRhRGljLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBMkMsc0dBQXNHO0FBQ2pKLCtDQUE4QywrR0FBK0c7QUFDN0o7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsNENBQTJDLGdCQUFnQixFQUFFO0FBQzdELE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLGNBQWE7QUFDYixpQ0FBZ0M7QUFDaEMsVUFBUzs7OztBQUlULE1BQUs7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Q3ZFO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsNkJBQTRCLG9DQUFvQztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JJQTtBQUNBO0FBQ0Esa0JBQWlCLHdCQUF3QixHQUFHLHlCQUF5QixHQUFHLHlCQUF5QixHQUFHLHlCQUF5QjtBQUM3SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUIsYUFBYTtBQUNoQztBQUNBOztBQUVBLGNBQWE7QUFDYixpQ0FBZ0MsZUFBZTtBQUMvQyxVQUFTO0FBQ1Q7QUFDQSxNQUFLOztBQUVMOzs7Ozs7O0FDbkJBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMLGlDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBLE1BQUs7QUFDTCxrQ0FBaUMsRUFBRSxZQUFZO0FBQy9DO0FBQ0EsRSIsImZpbGUiOiJiYWNrU3RhZ2UvY2xhc3MtbWFuYWdlbWVudC1hZGRDaGlsZENsYXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjUiLCJ2YXIgTHVpID0gcmVxdWlyZSgnLi4vLi4vTFVJL2pzL2x1aScpO1xyXG52YXIgdG9vbCA9IHJlcXVpcmUoJy4uLy4uL0xVSS90b29sJyk7XHJcbnZhciBkYXRhRGljID0gcmVxdWlyZShcIi4uL2xpYi9kYXRhRGljXCIpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi9saWIvdXRpbFwiKTtcclxudmFyIGx1aSA9IG5ldyBMdWkoKTtcclxuLy/mlZnmnZDpg6jliIbnmoTngrnlh7vmlYjmnpxcclxuLy90b29sLlNpYnMoJCgnLmVkaXQtbWVzZyAub3BlcmF0QnRuJykpO1xyXG5cclxuXHJcbnZhciBBZGRDaGlsZENsYXNzID0ge1xyXG4gICAgZHJvcF9zdGFnZTogdW5kZWZpbmVkLFxyXG4gICAgZHJvcF9ib29rdHlwZTogdW5kZWZpbmVkLFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGRyb3Bfc3RhZ2UgPSBsdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX3N0YWdlaWRcIiwgd2lkdGg6IDI2MCwgdGV4dEZpZWxkOiAnbmFtZScsIHZhbHVlRmllbGQ6ICd2YWx1ZScsIGRhdGE6IGRhdGFEaWMuc3RhZ2VMaXN0IH0pO1xyXG4gICAgICAgIGRyb3BfYm9va3R5cGUgPSBsdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2Jvb2t0eXBlXCIsIHdpZHRoOiAyNjAsIHRleHRGaWVsZDogJ0RpY1ZhbHVlJywgdmFsdWVGaWVsZDogJ0RpY0tleScsIGRhdGE6IGRhdGFEaWMuYm9va1R5cGVMaXN0IH0pO1xyXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJJblByaWNlXCJdLGlucHV0W25hbWU9XCJPdXRQcmljZVwiXScpLm9uKFwia2V5cHJlc3NcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHV0aWwuY2hlY2tGbG9hdChlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJEZWZhdWx0TnVtYmVyXCJdJykub24oXCJrZXlwcmVzc1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXRpbC5jaGVja051bShlKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIHZhciB0dGhpcyA9IHRoaXM7XHJcbiAgICAgICAgJChcIiNidG5TdWJtaXRcIikuY2xpY2soZnVuY3Rpb24gKCkgeyB0dGhpcy5zdWJtaXQoKTsgfSlcclxuICAgIH0sXHJcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfSxcclxuICAgIHN1Ym1pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICghdGhpcy52YWxpZGF0ZSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGQgPSB0aGlzLmdldFN1Ym1pdERhdGEoKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiL01hbmFnZW1lbnQvQ291cnNlTWFuYWdlL0FkZENoaWxkQ291cnNlQXBpXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICBkYXRhOiBkLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5PayA9PSBcInRydWVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvTWFuYWdlbWVudC9Db3Vyc2VNYW5hZ2UvQ2hpbGRDb3Vyc2VJbmRleFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoKSB7IH1cclxuICAgICAgICB9KVxyXG5cclxuXHJcblxyXG4gICAgfSxcclxuICAgIGdldFN1Ym1pdERhdGE6IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyIHN1Ym1pdERhdGEgPSB7fTtcclxuICAgICAgICBzdWJtaXREYXRhLkdOYW1lID0gJCgnaW5wdXRbbmFtZT1cIkdOYW1lXCJdJykudmFsKCk7XHJcbiAgICAgICAgc3VibWl0RGF0YS5JblByaWNlID0gJCgnaW5wdXRbbmFtZT1cIkluUHJpY2VcIl0nKS52YWwoKTtcclxuICAgICAgICBzdWJtaXREYXRhLk91dFByaWNlID0gJCgnaW5wdXRbbmFtZT1cIk91dFByaWNlXCJdJykudmFsKCk7XHJcbiAgICAgICAgc3VibWl0RGF0YS5EZWZhdWx0TnVtYmVyID0gJCgnaW5wdXRbbmFtZT1cIkRlZmF1bHROdW1iZXJcIl0nKS52YWwoKTtcclxuICAgICAgICBzdWJtaXREYXRhLlN0YWdlSUQgPSBkcm9wX3N0YWdlLmdldFZhbHVlKCkudmFsdWU7XHJcbiAgICAgICAgc3VibWl0RGF0YS5Cb29rVHlwZSA9IGRyb3BfYm9va3R5cGUuZ2V0VmFsdWUoKS52YWx1ZTtcclxuXHJcblxyXG4gICAgICAgIC8v6I635Y+W5Lmm5pys5YiX6KGoXHJcblxyXG4gICAgICAgIHZhciBib29rTGlzdCA9IFtdO1xyXG4gICAgICAgICQoJ3NwYW5bZGF0YS1uYW1lPVwiY291cnNlX2Jvb2tcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgYm9va2lkID0gJChpdGVtKS5hdHRyKFwiZGF0YS1ib29raWRcIik7XHJcbiAgICAgICAgICAgIGJvb2tMaXN0LnB1c2goeyBCb29rSUQ6IGJvb2tpZCwgQm9va0dyb3VwSUQ6IDAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICBzdWJtaXREYXRhLkJvb2tMaXN0ID0gYm9va0xpc3Q7XHJcbiAgICAgICAgc3VibWl0RGF0YS5SZW1hcmsgPSAkKCd0ZXh0YXJlYVtuYW1lPVwiUmVtYXJrXCJdJykudmFsKCk7XHJcbiAgICAgICAgcmV0dXJuIHN1Ym1pdERhdGE7XHJcbiAgICB9XHJcblxyXG5cclxufVxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIEFkZENoaWxkQ2xhc3MuaW5pdCgpO1xyXG59KVxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvYmFja1N0YWdlL2NsYXNzLW1hbmFnZW1lbnQtYWRkQ2hpbGRDbGFzcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDQiLCJ2YXIgTHVpRHJvcERvd25MaXN0ID0gcmVxdWlyZSgnLi4vanMvZHJvcGRvd25saXN0Jyk7XHJcbnZhciBMdWlDaGVja0JveCA9IHJlcXVpcmUoJy4uL2pzL2NoZWNrYm94Jyk7XHJcblxyXG5mdW5jdGlvbiBMdWkoKSB7XHJcbiAgICAvL3RoaXMuY2hlY2tCb3ggPSBudWxsO1xyXG4gICAgLy8gdGhpcy5pbml0V29yZFNwZWFrKCk7XHJcbn07XHJcblxyXG5MdWkucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aSxcclxuICAgIGluaXRUcmVlOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHZhciB0ID0gbmV3IEx1aVRyZWUoKTtcclxuICAgICAgICByZXR1cm4gdC5pbml0KHApO1xyXG4gICAgfSxcclxuICAgIGluaXREcm9wRG93bkxpc3Q6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgdmFyIGQgPSBuZXcgTHVpRHJvcERvd25MaXN0KCk7XHJcbiAgICAgICAgcmV0dXJuIGQuaW5pdChwKTtcclxuICAgIH0sXHJcbiAgICBpbml0Q2hlY2tCb3g6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgLy/vv73vv73vv73vv73Su++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vcir77+91rXvv71jaGVja2JveO+/ve+/ve+/ve+/vVxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja0JveCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQm94ID0gbmV3IEx1aUNoZWNrQm94KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjID0gbmV3IEx1aUNoZWNrQm94KCk7XHJcbiAgICAgICAgcmV0dXJuIGMuaW5pdChwKTtcclxuXHJcbiAgICB9LFxyXG4gICAgaW5pdFdvcmRTcGVhazogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAvL++/ve+/ve+/ve+/vdK777+977+977+977+977+977+977+977+9yKvvv73Wte+/vXdvcmRzcGVha++/ve+/ve+/ve+/vVxyXG4gICAgICAgIGlmICghdGhpcy53b3Jkc3BlYWspIHtcclxuICAgICAgICAgICAgdGhpcy53b3Jkc3BlYWsgPSBuZXcgTHVpV29yZFNwZWFrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjID0gbmV3IEx1aVdvcmRTcGVhaygpO1xyXG4gICAgICAgIHJldHVybiBjLmluaXQocCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEx1aTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2x1aS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiA0IDcgOCAxMCAxMiAxMyAxOSAyMCAyMSAyNiAyNyAyOCA0MyIsImZ1bmN0aW9uIEx1aURyb3BEb3duTGlzdCgpIHtcclxuICAgIHRoaXMucGFyYW0gPSBudWxsO1xyXG4gICAgdGhpcy5zZWxlY3RvciA9IFwiXCI7XHJcbn1cclxudmFyIGRyb3Bjb3VudCA9IDEwMDA7XHJcbkx1aURyb3BEb3duTGlzdC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogTHVpRHJvcERvd25MaXN0LFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHRoaXMud2FycGlkID0gXCIjXCIgKyBwYXJhbS53YXJwaWQ7XHJcbiAgICAgICAgdmFyIHdhcnBpZCA9IHBhcmFtLndhcnBpZDtcclxuICAgICAgICBpZiAoIXBhcmFtLmRhdGEpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdmFyIGRhdGEgPSBwYXJhbS5kYXRhO1xyXG5cclxuICAgICAgICB2YXIgd2lkdGggPSBwYXJhbS53aWR0aCA9IHBhcmFtLndpZHRoIHx8IDE4MDtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gcGFyYW0uaGVpZ2h0ID0gcGFyYW0uaGVpZ2h0IHx8IDIwMDtcclxuICAgICAgICB2YXIgc3VidGV4dGxlbmd0aCA9IHBhcmFtLnN1YnRleHRsZW5ndGggPSBwYXJhbS5zdWJ0ZXh0bGVuZ3RoIHx8IDU7XHJcbiAgICAgICAgcGFyYW0udmFsdWVGaWVsZCA9IHBhcmFtLnZhbHVlRmllbGQgfHwgXCJpZFwiO1xyXG4gICAgICAgIHBhcmFtLnRleHRGaWVsZCA9IHBhcmFtLnRleHRGaWVsZCB8fCBcIm5hbWVcIjtcclxuICAgICAgICB2YXIgdmFsdWVGaWVsZCA9IHBhcmFtLnZhbHVlRmllbGQ7XHJcbiAgICAgICAgdmFyIHRleHRGaWVsZCA9IHBhcmFtLnRleHRGaWVsZDtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRDYWxsQmFjayA9IHBhcmFtLnNlbGVjdGVkQ2FsbEJhY2s7XHJcbiAgICAgICAgdmFyIGxvYWRlZENhbGxCYWNrID0gcGFyYW0ubG9hZGVkQ2FsbEJhY2s7XHJcbiAgICAgICAgdmFyIHppbmRleCA9IHBhcmFtLnppbmRleDtcclxuICAgICAgICBpZiAocGFyYW0uZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdmFyIGQgPSB7fTtcclxuICAgICAgICAgICAgZFt2YWx1ZUZpZWxkXSA9IC0xO1xyXG4gICAgICAgICAgICBkW3RleHRGaWVsZF0gPSBcIlwiO1xyXG4gICAgICAgICAgICBkYXRhLnB1c2goZCk7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iuvue9rum7mOiupOWAvFxyXG4gICAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSBwYXJhbS5kZWZhdWx0VmFsdWUgPSBwYXJhbS5kZWZhdWx0VmFsdWUgfHwgZGF0YVswXVt2YWx1ZUZpZWxkXTtcclxuICAgICAgICB2YXIgZGVmYXVsdFRleHQgPSBwYXJhbS5kZWZhdWx0VGV4dCA9IHBhcmFtLmRlZmF1bHRWYWx1ZSB8fCBkYXRhWzBdW3RleHRGaWVsZF07XHJcbiAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xyXG4gICAgICAgIHZhciB1bEh0bWwgPSBcIjxkaXYgY2xhc3M9J2Ryb3BkaXYgZG4nPlwiO1xyXG4gICAgICAgIHVsSHRtbCArPSAnICA8dWwgY2xhc3M9XCJkcm9wdWxcIiBzdHlsZT1cIm1heC1oZWlnaHQ6JyArIGhlaWdodCArICdweDtvdmVyZmxvdzphdXRvO1wiIGRhdGEtaWQ9XCInICsgZGVmYXVsdFZhbHVlICsgJ1wiIGRhdGEtbmFtZT1cIicgKyBkZWZhdWx0VGV4dCArICdcIj4nO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGEubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhW2tdO1xyXG4gICAgICAgICAgICB2YXIgdiA9IGl0ZW1bdGV4dEZpZWxkXS5sZW5ndGggPiBzdWJ0ZXh0bGVuZ3RoID8gaXRlbVt0ZXh0RmllbGRdLnN1YnN0cmluZygwLCBzdWJ0ZXh0bGVuZ3RoKSArIFwiLi4uXCIgOiBpdGVtW3RleHRGaWVsZF07XHJcbiAgICAgICAgICAgIHZhciBpdGVtSHRtbCA9ICc8bGkgdGl0bGU9JyArIGl0ZW1bdGV4dEZpZWxkXSArICcgZGF0YS1pbmRleD0nICsgayArICcgZGF0YS1pZD0nICsgaXRlbVt2YWx1ZUZpZWxkXSArICcgZGF0YS10YWc9XFwnJyArIEpTT04uc3RyaW5naWZ5KGRhdGFba10pICsgJ1xcJz4nICsgdiArICc8L2xpPic7XHJcbiAgICAgICAgICAgIHVsSHRtbCArPSBpdGVtSHRtbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWxIdG1sICs9IFwiPC91bD5cIjtcclxuICAgICAgICB1bEh0bWwgKz0gXCI8L2Rpdj5cIjtcclxuICAgICAgICB2YXIgc3Bhbkh0bWwgPSAnIDxzcGFuIHN0eWxlPVwid2lkdGg6ICcgKyB3aWR0aCArICdweDtcIiBjbGFzcz1cImRpYlwiPjxzcGFuIGRhdGEtdHlwZT1cImRyb3Bkb3dubGlzdF9kcm9wX3NwYW5cIiBpZD1cInNwYW4nICsgcGFyYW0ud2FycGlkICsgJ1wiPicgKyBkZWZhdWx0VGV4dCArICc8L3NwYW4+IDxpIGNsYXNzPVwibnVtX2Rvd25cIj48L2k+PC9zcGFuPic7XHJcblxyXG4gICAgICAgIHZhciBjb24gPSAkKFwiI1wiICsgd2FycGlkKTtcclxuICAgICAgICBjb24uY3NzKHsgd2lkdGg6IHdpZHRoIH0pO1xyXG4gICAgICAgIGNvbi5hZGRDbGFzcyhcImx1aV9kcm9wZG93bmxpc3RcIik7XHJcbiAgICAgICAgY29uLmh0bWwoc3Bhbkh0bWwpO1xyXG4gICAgICAgIGNvbi5hcHBlbmQodWxIdG1sKTtcclxuICAgICAgICBpZiAoemluZGV4KSB7XHJcbiAgICAgICAgICAgIGNvbi5maW5kKFwiLmRyb3BkaXZcIikuY3NzKFwiei1pbmRleFwiLCB6aW5kZXgpO1xyXG4gICAgICAgICAgICBjb24uYXR0cihcInppbmRleFwiLCB6aW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbi5maW5kKFwiLmRyb3BkaXZcIikuY3NzKFwiei1pbmRleFwiLCBkcm9wY291bnQtLSk7XHJcbiAgICAgICAgICAgIC8vIGNvbi5hdHRyKFwiemluZGV4XCIsIGRyb3Bjb3VudCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb24uYWRkQ2xhc3MoXCJidG5fbnVtX3VwZG93blwiKS5hZGRDbGFzcyhcImJ0bl9udW1fdXBkb3duMVwiKS5hZGRDbGFzcyhcImRpYlwiKTtcclxuICAgICAgICBjb24uYXR0cihcInRpdGxlXCIsIGRlZmF1bHRUZXh0KTtcclxuICAgICAgICBjb24uYXR0cihcImRhdGEtaWRcIiwgZGVmYXVsdFZhbHVlKTtcclxuXHJcbiAgICAgICAgdmFyIHVsID0gJChcIiNcIiArIHdhcnBpZCArIFwiIHVsXCIpO1xyXG4gICAgICAgIHZhciBkcm9wZGl2ID0gJChcIiNcIiArIHdhcnBpZCArIFwiIC5kcm9wZGl2XCIpO1xyXG4gICAgICAgIHZhciBsaSA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiB1bCBsaVwiKTtcclxuICAgICAgICB2YXIgc3BhbiA9IGNvbi5maW5kKFwic3BhbltkYXRhLXR5cGU9J2Ryb3Bkb3dubGlzdF9kcm9wX3NwYW4nXVwiKTtcclxuICAgICAgICAvL+S6i+S7tlxyXG4gICAgICAgIC8v5LiL5ouJ5LqL5Lu2XHJcbiAgICAgICAgY29uLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh1bC5pcyhcIjp2aXNpYmxlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1bC5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgICAgICBkcm9wZGl2LnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIuZHJvcGRpdlwiKS5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBkcm9wZGl2LnNob3coKTtcclxuICAgICAgICAgICAgICAgIC8vIHVsLnNsaWRlRG93bigyMDApO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRpdi5zbGlkZURvd24oMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcImJvZHlcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyB1bC5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgICQoXCIuZHJvcGRpdlwiKS5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjb24ubW91c2VsZWF2ZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vICAgICB1bC5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy/pgInkuK3kuovku7ZcclxuICAgICAgICBsaS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9ICQodGhpcykuaHRtbCgpO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRKc29uID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1qb3NuXCIpO1xyXG4gICAgICAgICAgICB2YXIgYWxsdGl0bGUgPSAkKHRoaXMpLmF0dHIoXCJ0aXRsZVwiKTtcclxuICAgICAgICAgICAgc3Bhbi50ZXh0KHNlbGVjdGVkVGV4dCk7XHJcbiAgICAgICAgICAgIHNwYW4uYXR0cihcImRhdGEtaWRcIiwgc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgIHNwYW4uYXR0cihcImRhdGEtanNvblwiLCBzZWxlY3RlZEpzb24pO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJ0aXRsZVwiLCBhbGx0aXRsZSk7XHJcblxyXG4gICAgICAgICAgICBjb24uYXR0cihcInRpdGxlXCIsIGFsbHRpdGxlKTtcclxuICAgICAgICAgICAgY29uLmF0dHIoXCJkYXRhLWlkXCIsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAvL+mAieS4reWbnuiwg+S6i+S7tlxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRDYWxsQmFjaykge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYWxsQmFjayh3YXJwaWQsIHNlbGVjdGVkVmFsdWUsIGFsbHRpdGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkcm9wZGl2LnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwYW4gPSBzcGFuO1xyXG4gICAgICAgIC8v6K6+572u6buY6K6k5YC8XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZShkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzcGFuID0gdGhpcy5zcGFuO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogc3Bhbi5hdHRyKFwiZGF0YS1pZFwiKSwgdGV4dDogc3Bhbi5hdHRyKFwidGl0bGVcIiksIHppbmRleDogJCh0aGlzLnNlbGVjdG9yKS5hdHRyKFwiemluZGV4XCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogLTEsIHRleHQ6IFwiXCIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8v5pq06Zyy57uZ5aSW6YOo55qE5pa55rOVXHJcbiAgICBnZXRTZWxlY3RlZEpzb25WYWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3Bhbi5hdHRyKFwiZGF0YS1qc29uXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHZhciB0ZXh0c2VsID0gXCJcIjtcclxuICAgICAgICAvL+mAieS4reeahOWAvFxyXG4gICAgICAgIHZhciBzZWxJdGVtO1xyXG4gICAgICAgIHZhciBzcGFuID0gdGhpcy5zcGFuO1xyXG4gICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgdGhpcy5wYXJhbS5kYXRhLmxlbmd0aDsgbSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtc2VsID0gdGhpcy5wYXJhbS5kYXRhW21dO1xyXG4gICAgICAgICAgICBpZiAoaXRlbXNlbFt0aGlzLnBhcmFtLnZhbHVlRmllbGRdID09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0c2VsID0gaXRlbXNlbFt0aGlzLnBhcmFtLnRleHRGaWVsZF07XHJcbiAgICAgICAgICAgICAgICBzZWxJdGVtID0gaXRlbXNlbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNwYW4uYXR0cihcImRhdGEtaWRcIiwgdmFsdWUpO1xyXG4gICAgICAgIHNwYW4uYXR0cihcImRhdGEtanNvblwiLCBKU09OLnN0cmluZ2lmeShzZWxJdGVtKSk7XHJcbiAgICAgICAgc3Bhbi5hdHRyKFwidGl0bGVcIiwgdGV4dHNlbCk7XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5hdHRyKFwidGl0bGVcIiwgdGV4dHNlbCk7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gdGV4dHNlbDtcclxuICAgICAgICB2YXIgdiA9IHRleHRzZWwubGVuZ3RoID4gdGhpcy5wYXJhbS5zdWJ0ZXh0bGVuZ3RoID8gdGV4dHNlbC5zdWJzdHJpbmcoMCwgdGhpcy5wYXJhbS5zdWJ0ZXh0bGVuZ3RoKSArIFwiLi4uXCIgOiB0ZXh0c2VsO1xyXG4gICAgICAgIHNwYW4udGV4dCh2KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0ubG9hZGVkQ2FsbEJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJhbS5sb2FkZWRDYWxsQmFjayhjb250YWluZXJJZCwgc2VsZWN0ZWRWYWx1ZSwgc2VsZWN0ZWRUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBMdWlEcm9wRG93bkxpc3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2Ryb3Bkb3dubGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiA0IDcgOCAxMCAxMiAxMyAxOSAyMCAyMSAyNiAyNyAyOCA0MyIsIlxyXG5mdW5jdGlvbiBMdWlDaGVja0JveCgpIHtcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBcImx1aWNoZWNrXCI7XHJcbiAgICAvL+WPguaVsFxyXG4gICAgdGhpcy5wYXJhbSA9IHt9O1xyXG59XHJcblxyXG5MdWlDaGVja0JveC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogTHVpQ2hlY2tCb3gsXHJcbiAgICAvKlxyXG4gICAgICp3YXJwaWQg5a655ZmoaWRcclxuICAgICAqZGF0YSDmlbDmja7pm4bvvIxqc29uIOS4siBbe25hbWU6cmV4LHZhbDowMDF9LHtuYW1lOmxpbGVpLHZhbDowMDJ9XVxyXG4gICAgICrlsZXnpLrlrZfmrrUgICB0ZXh0RmllbGRcclxuICAgICAq5a6e6ZmF5YC85a2X5q61IHZhbHVlRmllbGRcclxuICAgICAq5Zue6LCD5Ye95pWwIGNhbGxiYWNrIOWPguaVsOS4uuW9k+WJjeinpuWPkeeahOWkjemAieahhuS4iue7keWumueahOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICB2YXIgY3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChwYXJhbSAmJiBwYXJhbS5ncm91cCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yID0gJ2x1aWNoZWNrW2RhdGEtbmFtZT1cIicgKyBwYXJhbS5ncm91cCArICdcIl0nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmFtID0gcGFyYW07XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVja1N0eWxlID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpID09IDEgPyBcImNoZWNrX3NlbFwiIDogXCJcIjtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2tzaG93ID0gJChpdGVtKS5hdHRyKFwiZGF0YS1zaG93Y2hlY2tib3hcIikgIT0gMTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJChpdGVtKS5hdHRyKFwiZGF0YS10ZXh0XCIpO1xyXG4gICAgICAgICAgICB2YXIgaCA9ICc8aSBjbGFzcz1cImljb25fY2hlY2sgJyArIGlzY2hlY2tTdHlsZSArICcgXCI+PC9pPic7XHJcbiAgICAgICAgICAgIHZhciBzID0gJzxzcGFuIGNsYXNzPVwiY2hlY2tfdGV4dFwiICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiID4nICsgdGV4dCArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgaCA9IGlzY2hlY2tzaG93ID8gaCArIHMgOiBzO1xyXG4gICAgICAgICAgICAvLyBpZiAoJChpdGVtKS5maW5kKFwiaWNvbl9jaGVja1wiKS5sZW5ndGggPiAwIHx8ICQoaXRlbSkuZmluZChcImNoZWNrX3RleHRcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKGl0ZW0pLmh0bWwoaCk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY3NzKHsgXCJjdXJzb3JcIjogXCJwb2ludGVyXCIgfSk7XHJcbiAgICAgICAgICAgICQoaXRlbSkudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKFwiaVwiKS5yZW1vdmVDbGFzcyhcImNoZWNrX3NlbFwiKS5hZGRDbGFzcyhcImNoZWNrX2RlZlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKFwiaVwiKS5yZW1vdmVDbGFzcyhcImNoZWNrX2RlZlwiKS5hZGRDbGFzcyhcImNoZWNrX3NlbFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGFsZXJ0KFwiYmluZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbSYmcGFyYW0uY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBuYW1lID0gJChpdGVtKS5hdHRyKFwiZGF0YS1uYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBjdGhpcy5nZXRKc29uVmFsdWUoZ3JvdXBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOWbnuiwg+WHveaVsO+8jOW5tui/lOWbnue7hOWQjeWSjOaJgOmAieS4reWAvOW+l2pzb27kuLJcclxuICAgICAgICAgICAgICAgICAgICAvL3BhcmFtLmNhbGxiYWNrKGdyb3VwbmFtZSwgdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5jYWxsYmFjayhpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgLy/orr7nva5jaGVja2JveOe7hOWTquS6m+WAvOiiq+mAieS4rVxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uIChuYW1lLCB2YWwpIHtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmZpbHRlcignW2RhdGEtdmFsPVwiJyArIHZhbCArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChpdGVtKS5jbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+WY2hlY2tib3jnu4TpgInkuK3nmoTlgLxcclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHIucHVzaCgkKGl0ZW0pLmF0dHIoXCJkYXRhLXZhbFwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFsZXJ0KHIuam9pbignLCcpKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlmNoZWNrYm9457uE6YCJ5Lit55qE5YC8XHJcbiAgICBnZXRKc29uVmFsdWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHIgPSBbXTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIganNvbnN0ciA9ICQoaXRlbSkuYXR0cihcImRhdGEtanNvblwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uc3RyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKEpTT04ucGFyc2UodW5lc2NhcGUoanNvbnN0cikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByO1xyXG4gICAgfSxcclxuICAgIC8qKuWIpOaWreW9k+WJjSBjaGVja2JveCDmmK/lkKbpgInkuK0gKi9cclxuICAgIGlzY2hlY2s6IGZ1bmN0aW9uIChuYW1lLCB2YWwpIHtcclxuICAgICAgICB2YXIgaXRlbSA9ICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZmlsdGVyKCdbZGF0YS12YWw9XCInICsgdmFsICsgJ1wiXScpWzBdO1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIHJldHVybiBpc2NoZWNrID09IDE7XHJcbiAgICB9LFxyXG4gICAgLyoq5Yik5pat5b2T5YmNIGNoZWNrYm94IOaYr+WQpumAieS4rSAqL1xyXG4gICAgaXNjaGVja0VsZW1lbnQ6IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGlzY2hlY2sgPT0gMTtcclxuICAgIH0sXHJcbiAgICAvKirmqKHmi5/ljZXlh7sg5Y+q5pS55Y+Y5qC35byPICovXHJcbiAgICBzZXRDbGlja1N0eWxlOiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDApO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNoaWxkcmVuKFwiaVwiKS5yZW1vdmVDbGFzcyhcImNoZWNrX3NlbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAxKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jaGlsZHJlbihcImlcIikuYWRkQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cz1MdWlDaGVja0JveDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvanMvY2hlY2tib3guanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJcclxuXHJcbmZ1bmN0aW9uIHBvcHNob3coc2VsZSwgcG9wc2hvdykgey8v5by55Ye65bGC55qE5pi+56S6XHJcbiAgIFxyXG4gICAgc2VsZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcG9wc2hvdy5zaG93KCk7XHJcbiAgICAgICAgJCgnLnBvcC1tYXNrJykuc2hvdygpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gcG9waGlkZShzZWxlLCBwb3BzaG93KSB7Ly/lvLnlh7rlsYLnmoTmtojlpLFcclxuICAgIHNlbGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBvcHNob3cuaGlkZSgpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLmhpZGUoKTtcclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gY2hlY2tCb294KCkgey8v5aSN6YCJ5qGG55qE5qC35byPXHJcbiAgICAkKCcuY2hlY2tCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBjaG9vc2VBbGwoKSB7Ly/lhajpgInlhajkuI3pgIlcclxuICAgICQoJy5jaGVja0JveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbnVtID0gJCgnLmNoZWNrQm94JykuaW5kZXgoJCh0aGlzKSk7XHJcbiAgICAgICAgaWYgKG51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgJGltZ3MgPSAkLm1ha2VBcnJheSgkKCcudGFibGUgdHI6bm90KDpmaXJzdCknKS5maW5kKCdpbWcnKSk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRpbWdzLmV2ZXJ5KGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5zdHlsZS52aXNpYmlsaXR5ID09ICd2aXNpYmxlJztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG59XHJcbmZ1bmN0aW9uIFNpYnMoVGhpcykge1xyXG4gICAgVGhpcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByYWRpbygpIHsvL+WNlemAieeahOagt+W8j1xyXG4gICAgJCgnLnJhZGlvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5yYWRpbycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENvb2tpZShvYmpOYW1lLCBvYmpWYWx1ZSwgb2JqSG91cnMpIHtcclxuICAgIHZhciBzdHIgPSBvYmpOYW1lICsgXCI9XCIgKyBlc2NhcGUob2JqVmFsdWUpO1xyXG5cclxuICAgIGlmIChvYmpIb3VycyA+IDApIHsgLy/kuLow5pe25LiN6K6+5a6a6L+H5pyf5pe26Ze077yM5rWP6KeI5Zmo5YWz6Zet5pe2Y29va2ll6Ieq5Yqo5raI5aSxXHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHZhciBtcyA9IG9iakhvdXJzICogMzYwMCAqIDEwMDA7XHJcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgbXMpO1xyXG4gICAgICAgIHN0ciArPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKSArIFwiO3BhdGg9L1wiO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQuY29va2llID0gc3RyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb29raWUob2JqTmFtZSkgeyAvL+iOt+WPluaMh+WumuWQjeensOeahGNvb2tpZeeahOWAvFxyXG4gICAgdmFyIGFyclN0ciA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjsgXCIpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJTdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGFyclN0cltpXS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgaWYgKHRlbXBbMF0gPT0gb2JqTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5lc2NhcGUodGVtcFsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL+W8ueWHuuWKoOi9veWbvueJh1xyXG5mdW5jdGlvbiBTaG93TG9hZGluZyhvYmopIHtcclxuICAgIG9iai5odG1sKGpRdWVyeShcIiNkaXZMb2FkaW5nXCIpLmh0bWwoKSk7XHJcbn1cclxuZnVuY3Rpb24gdGltZVRpY2tCaWcoc2Vjb25kKSB7XHJcbiAgICAkKFwiLnRpbWVzLWJpZ1wiKS5odG1sKHNlY29uZCk7XHJcbiAgICB2YXIgdCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLnRpbWVzLWJpZ1wiKS5odG1sKC0tc2Vjb25kKTtcclxuICAgICAgICBpZiAoc2Vjb25kIDw9IDApIHtcclxuICAgICAgICAgICAgJChcIi5yb3RhdGUtcG9pbnRcIikuY3NzKHsgXCJhbmltYXRpb24tcGxheS1zdGF0ZVwiOiBcInBhdXNlZFwiIH0pO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDEwMDApO1xyXG4gICAgJChcIi5yb3RhdGUtcG9pbnRcIikuY3NzKHsgXCJhbmltYXRpb24tcGxheS1zdGF0ZVwiOiBcInJ1bm5pbmdcIiB9KTtcclxufVxyXG5cclxuLy/liqDovb3lm77niYfliLDmn5DkuKrlhYPntKDkuK1cclxuZnVuY3Rpb24gSW5zZXJ0TG9hZGluZyhvYmopIHtcclxuICAgIG9iai5hcHBlbmQoalF1ZXJ5KFwiI2RpdkxvYWRpbmdcIikuaHRtbCgpKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwb3BoaWRlOiBwb3BoaWRlLFxyXG4gICAgcG9wc2hvdzogcG9wc2hvdyxcclxuICAgIGNoZWNrQm9veDogY2hlY2tCb294LFxyXG4gICAgU2liczogU2licyxcclxuICAgIHJhZGlvOiByYWRpbyxcclxuICAgIGNob29zZUFsbDogY2hvb3NlQWxsLFxyXG4gICAgc2V0Q29va2llOiBzZXRDb29raWUsLy/orr7nva5jb29raWVcclxuICAgIGdldENvb2tpZTogZ2V0Q29va2llLCAvLyDojrflj5Zjb29raWVcclxuICAgIFNob3dMb2FkaW5nOiBTaG93TG9hZGluZywvL+WKoOi9veS4rVxyXG4gICAgSW5zZXJ0TG9hZGluZzogSW5zZXJ0TG9hZGluZyxcclxuICAgIHRpbWVUaWNrQmlnOiB0aW1lVGlja0JpZy8v5YCS6K6h5pe2XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL3Rvb2wuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEyIDEzIDE4IDE5IDIwIDIxIDI3IDI4IDM2IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAvL+WtpuauteWIl+ihqFxyXG4gICAgc3RhZ2VMaXN0OiBbeyBuYW1lOiBcIuS4jemZkFwiLCB2YWx1ZTogXCJcIiB9LCB7IG5hbWU6IFwi5bCP5a2mXCIsIHZhbHVlOiBcIlhcIiB9LCB7IG5hbWU6IFwi5Yid5LitXCIsIHZhbHVlOiBcIkNcIiB9LCB7IG5hbWU6IFwi6auY5LitXCIsIHZhbHVlOiBcIkdcIiB9XSxcclxuICAgIGJvb2tUeXBlTGlzdDogKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiBcIi9NYW5hZ2VtZW50L0NvdXJzZU1hbmFnZS9HZXREaWNMaXN0XCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiZ2V0XCIsXHJcbiAgICAgICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICAgICAgZGF0YTogeyBkaWNUeXBlOiAyIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkYXRhLkRhdGE7XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzdWx0OyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0pKClcclxuXHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvbGliL2RhdGFEaWMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSA0IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjaGVja051bTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIHZhciBrZXludW0gPSBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgIGlmICgoa2V5bnVtID49IDQ4ICYmIGtleW51bSA8PSA1NykpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJDdXRcIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgblQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xyXG4gICAgICAgICAgICAvL+esrOS4gOS4quS4jeiDvei+k+WFpTBcclxuICAgICAgICAgICAgaWYgKChuVCA9PSBcIlwiKSAmJiBrZXludW0gPT0gNDgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBlbHNlIGlmIChuVC5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtYXRjaE51bTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICB0LnZhbHVlID0gdC52YWx1ZS50cmltdGV4dCgnLicpO1xyXG4gICAgfSxcclxuICAgIGNoZWNrRmxvYXQ6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIC8vdmFyIHNjb3JlID0gdGhpcy50b3RhbFNvcmU7XHJcbiAgICAgICAgdmFyIGtleW51bSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhrZXludW0pO1xyXG4gICAgICAgIGlmICgoa2V5bnVtID49IDQ4ICYmIGtleW51bSA8PSA1NykgfHwgKGtleW51bSA9PSA0NikpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJDdXRcIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgblQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xyXG4gICAgICAgICAgICAvL+esrOS4gOS4quWtl+espuS4jeiDveS4uuWwj+aVsOeCue+8jOS4jeiDvemHjeWkjei+k+WFpeWwj+aVsOeCuVxyXG4gICAgICAgICAgICBpZiAoKG5UID09IFwiXCIgfHwgblQuaW5kZXhPZihcIi5cIikgPiAtMSkgJiYga2V5bnVtID09IDQ2KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy/lsI/mlbDngrnlkI7kv53nlZnkuIDkvY1cclxuICAgICAgICAgICAgZWxzZSBpZiAoblQubGVuZ3RoID4gMiAmJiBuVC5pbmRleE9mKFwiLlwiKSA9PSBuVC5sZW5ndGggLSAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vMOWQjumdouWPquiDvei+k+WFpeWwj+aVsOeCuVxyXG4gICAgICAgICAgICBlbHNlIGlmIChuVCA9PSBcIjBcIiAmJiBrZXludW0gIT0gNDYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL+S4ieS9jeaVsOWQjuWPquiDvei+k+WFpeWwj+aVsOeCuVxyXG4gICAgICAgICAgICBlbHNlIGlmIChuVC5sZW5ndGggPT0gMyAmJiBuVC5pbmRleE9mKFwiLlwiKSA8IDAgJiYga2V5bnVtICE9IDQ2KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChuVC5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBudW1HcmFkZVRyYW46IGZ1bmN0aW9uICh0KSB7IC8v5pWw5a2X5bm057qn6L2s5o2iXHJcbiAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgc3dpdGNoICh0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuS4gOW5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLkuozlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5LiJ5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuWbm+W5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLkupTlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5YWt5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuS4g+W5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLlhavlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5Lmd5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLpq5jkuIBcIjtcclxuICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIumrmOS6jFwiO1xyXG4gICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi6auY5LiJXCI7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfSwgSXNNb2JpbGU6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gKC9eMVszfDR8NXw3fDhdXFxkezl9JC8udGVzdCh0KSk7Ly/moKHpqozmiYvmnLrnmoTmoLzlvI9cclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2xpYi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gNCAxMiAxMyAyMSAyMyAyNyAyOCJdLCJzb3VyY2VSb290IjoiIn0=