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
	var lui = new Lui();
	var drop_school;//校区对象
	var drop_clsss;//班级对象
	var row_data = { StudentID: 0, CValue: 0, Remark: "", CType: 0 };//当前行数据
	
	
	$("[data-close]").click(function () {
	    $('.pop-mask,#coins,#coins-add').hide();
	});
	
	$("#edit-num,#add-num").keypress(function () {
	    var keynum = event.keyCode;
	    if (!(keynum >= 48 && keynum <= 57))//非数字
	        return false;
	    if ($(this).val().length == 9)//9位数字
	        return false;
	    if ($(this).val() == "" && keynum == 48)//首位不能为0
	        return false;
	    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
	});
	
	$("#edit-remark,#add-remark").keypress(function () {
	    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
	});
	
	
	initData();
	
	//初始化数据
	function initData() {
	    if (userRole == 2)//超管
	    {
	        /*全部教学点的下拉*/
	        $.ajax({
	            type: "post",
	            url: "/Org/School/GetSchool",
	            dataType: "json",
	            error: function (e) {
	                drop_school = lui.initDropDownList({
	                    warpid: "schoolAll", width: 170, subtextlength: 10, textField: 'SchoolName', valueField: 'SchoolID', data: [{ SchoolName: '全部教学点', SchoolID: 0 }]
	                });
	            },
	            success: function (e) {
	                drop_school = lui.initDropDownList({
	                    warpid: "schoolAll", width: 170, subtextlength: 10, textField: 'SchoolName', valueField: 'SchoolID', data: e.Data, selectedCallBack: GetChange
	                });
	                GetClasses(0);
	            }
	        });
	    }
	    else if (userRole == 3)//校长
	    {
	        GetClasses(0);
	    }
	}
	
	function GetClasses(e1) {
	    /*全部班级的下拉*/
	    $.ajax({
	        type: "post",
	        url: "/Org/Classes/GetClassName",
	        dataType: "json",
	        data: { SchoolID: e1 },
	        error: function (e) {
	            drop_clsss = lui.initDropDownList({
	                warpid: "classAll", width: 170, subtextlength: 10, textField: 'ClassName', valueField: 'ClassID', data: [{ ClassName: '全部班级', ClassID: 0 }]
	            });
	        },
	        success: function (e) {
	            drop_clsss = lui.initDropDownList({
	                warpid: "classAll", width: 170, subtextlength: 10, textField: 'ClassName', valueField: 'ClassID', data: e, selectedCallBack: GetTableChange
	            });
	            var _schoolID = 0;//校长
	            if (drop_school)
	                _schoolID = drop_school.getValue().value;//超管
	            loadData(_schoolID, 0, 1);//加载表格--学校/班级/页码
	        }
	    });
	}
	
	function GetChange(e1, e2)//控件ID、选中项ID--加载班级
	{
	    GetClasses(e2);
	}
	
	function GetTableChange(e1, e2)//控件ID、e2班级ID--加载表格
	{
	    var _schoolID = 0;//校长
	    if (drop_school)
	        _schoolID = drop_school.getValue().value;//超管
	    loadData(_schoolID, e2, 1);//加载表格--学校/班级/页码
	}
	
	function loadData(e1, e2, e3) {
	    $("#pager").html("");
	    $("#ctable").children(":first").nextAll().remove();
	    $("#emptyDataBefore").tmpl(null).appendTo("#ctable");
	    $.ajax({
	        type: "post",
	        url: "/Org/Currency/GetCurrency",
	        data: {
	            SchoolID: e1, ClassID: e2, PageIndex: e3
	        },
	        dataType: "json",
	        error: function (e) {
	        },
	        success: function (e) {
	            $("#ctable").children(":first").nextAll().remove();
	            if (e.Data.length == 0) {
	                $("#emptyDataOver").tmpl(null).appendTo("#ctable");
	            }
	            else {
	                $("#curData").tmpl(e.Data).appendTo("#ctable");
	            }
	            $("#pager").html(e.TagValue);
	            //分页事件
	            PagerClick();
	
	            //弹出层
	            EditClick();
	        }
	    });
	}
	
	function PagerClick() {
	    $("#pager a[data-num]").click(function () {
	        var _schoolID = 0;//校长
	        if (drop_school)
	            _schoolID = drop_school.getValue().value;//超管
	        var _classID = drop_clsss.getValue().value;
	        loadData(_schoolID, _classID, $(this).attr("data-num"));//加载表格--学校/班级/页码
	    });
	}
	
	
	//点击修改班级
	function EditClick() {
	    $("[data-type='edit']").click(function () {
	
	        var $r = $(("tr[data-id=" + $(this).attr("data-id") + "]"));
	        row_data.StudentID = $(this).attr("data-id")//学生ID
	        GetCur(row_data.StudentID, "#edit-cur")//Money       
	        $("#edit-num").val("");
	        $("#edit-remark").val("");
	        $("[data-type='edit-info']").css({ "visibility": "hidden" });
	        $('.pop-mask,#coins').show();
	
	    });
	
	    $("[data-type='add']").click(function () {
	        var $r = $(("tr[data-id=" + $(this).attr("data-id") + "]"));
	        row_data.StudentID = $(this).attr("data-id")//学生ID
	        GetCur(row_data.StudentID, "#add-cur")//Money
	        $("#add-num").val("");
	        $("#add-remark").val("");
	        $("[data-type='add-info']").css({ "visibility": "hidden" });
	        $('.pop-mask,#coins-add').show();
	    });
	}
	
	function GetCur(e1, e2) {
	    $.ajax({
	        type: "post",
	        url: "/Org/Currency/GetCur",
	        dataType: "json",
	        data: { StudentID: e1 },
	        error: function (e) {
	
	        },
	        success: function (e) {
	            $(e2).text(e.TagValue);
	        }
	    });
	}
	
	//修改班级
	$("#edit-ok").click(function () {
	    if ($("[data-type='edit-info']").css("visibility") == "visible") {
	        return;
	    }
	    row_data.CType = 5;
	    row_data.CValue = +($("#edit-num").val());
	    row_data.Remark = $.trim($("#edit-remark").val());
	    if (row_data.CValue == 0) {
	        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请输入兑换数量！");
	        return;
	    }
	    if (!(+row_data.CValue > 0 && +row_data.CValue <= +($("#edit-cur").text()))) {
	        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("兑换数量过大！");
	        return;
	    }
	    if (row_data.Remark == "") {
	        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请填写备注");
	        return;
	    }
	    $.ajax({
	        type: "post",
	        url: "/Org/Currency/EditCur",
	        data: { data: JSON.stringify(row_data) },
	        dataType: "json",
	        error: function (e) {
	            $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请求失败!");
	        },
	        success: function (e) {
	            if (e.OK) {
	                $('.pop-mask,#coins').hide();
	                var _schoolID = 0;//校长
	                if (drop_school)
	                    _schoolID = drop_school.getValue().value;//超管
	                var _classID = drop_clsss.getValue().value;
	                loadData(_schoolID, _classID, 1);//加载表格--学校/班级/页码
	            }
	            else {
	                $("[data-type='edit-info']").css({ "visibility": "visible" }).text(e.Result);
	            }
	        }
	    });
	});
	
	//添加班级
	$("#add-ok").click(function () {
	    if ($("[data-type='add-info']").css("visibility") == "visible") {
	        return;
	    }
	    row_data.CType = 4;
	    row_data.CValue = +$("#add-num").val();
	    row_data.Remark = $.trim($("#add-remark").val());
	    if (row_data.CValue == 0) {
	        $("[data-type='add-info']").css({ "visibility": "visible" }).text("请输入奖励数量！");
	        return;
	    }
	    if (!(+row_data.CValue > 0 && +row_data.CValue <= 999999999)) {
	        $("[data-type='add-info']").css({ "visibility": "visible" }).text("奖励数量过大！");
	        return;
	    }
	    if (row_data.Remark == "") {
	        $("[data-type='add-info']").css({ "visibility": "visible" }).text("请填写备注");
	        return;
	    }
	    $.ajax({
	        type: "post",
	        url: "/Org/Currency/EditCur",
	        data: { data: JSON.stringify(row_data) },
	        dataType: "json",
	        error: function (e) {
	            $("[data-type='add-info']").css({ "visibility": "visible" }).text("请求失败！");
	        },
	        success: function (e) {
	            if (e.OK) {
	                $('.pop-mask,#coins-add').hide();
	                var _schoolID = 0;//校长
	                if (drop_school)
	                    _schoolID = drop_school.getValue().value;//超管
	                var _classID = drop_clsss.getValue().value;
	                loadData(_schoolID, _classID, 1);//加载表格--学校/班级/页码
	            }
	            else {
	                $("[data-type='add-info']").css({ "visibility": "visible" }).text(e.Result);
	            }
	        }
	    });
	});
	


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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy9iYWNrU3RhZ2Uvc3R1ZGVudC1jb2lucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2x1aS5qcz9lNzkwKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2Ryb3Bkb3dubGlzdC5qcz9mZWYwKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2NoZWNrYm94LmpzPzYxNmQqKioqKioqKioqIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEIsZ0JBQWU7QUFDZixpQkFBZ0IsaURBQWlEOzs7QUFHakU7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE2RCx5QkFBeUI7QUFDdEYsRUFBQzs7QUFFRDtBQUNBLDhEQUE2RCx5QkFBeUI7QUFDdEYsRUFBQzs7O0FBR0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtJQUFpSSxtQ0FBbUM7QUFDcEssa0JBQWlCO0FBQ2pCLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTs7QUFFQTtBQUNBO0FBQ0EsNEVBQTJFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQXlCLHNCQUFzQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWIsVUFBUztBQUNUOzs7QUFHQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QiIsImZpbGUiOiJiYWNrU3RhZ2Uvc3R1ZGVudC1jb2lucy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwidmFyIEx1aSA9IHJlcXVpcmUoJy4uLy4uL0xVSS9qcy9sdWknKTtcclxudmFyIGx1aSA9IG5ldyBMdWkoKTtcclxudmFyIGRyb3Bfc2Nob29sOy8v5qCh5Yy65a+56LGhXHJcbnZhciBkcm9wX2Nsc3NzOy8v54+t57qn5a+56LGhXHJcbnZhciByb3dfZGF0YSA9IHsgU3R1ZGVudElEOiAwLCBDVmFsdWU6IDAsIFJlbWFyazogXCJcIiwgQ1R5cGU6IDAgfTsvL+W9k+WJjeihjOaVsOaNrlxyXG5cclxuXHJcbiQoXCJbZGF0YS1jbG9zZV1cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnLnBvcC1tYXNrLCNjb2lucywjY29pbnMtYWRkJykuaGlkZSgpO1xyXG59KTtcclxuXHJcbiQoXCIjZWRpdC1udW0sI2FkZC1udW1cIikua2V5cHJlc3MoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGtleW51bSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICBpZiAoIShrZXludW0gPj0gNDggJiYga2V5bnVtIDw9IDU3KSkvL+mdnuaVsOWtl1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PSA5KS8vOeS9jeaVsOWtl1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmICgkKHRoaXMpLnZhbCgpID09IFwiXCIgJiYga2V5bnVtID09IDQ4KS8v6aaW5L2N5LiN6IO95Li6MFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICQoXCJbZGF0YS10eXBlPSdlZGl0LWluZm8nXSxbZGF0YS10eXBlPSdhZGQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcImhpZGRlblwiIH0pO1xyXG59KTtcclxuXHJcbiQoXCIjZWRpdC1yZW1hcmssI2FkZC1yZW1hcmtcIikua2V5cHJlc3MoZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIltkYXRhLXR5cGU9J2VkaXQtaW5mbyddLFtkYXRhLXR5cGU9J2FkZC1pbmZvJ11cIikuY3NzKHsgXCJ2aXNpYmlsaXR5XCI6IFwiaGlkZGVuXCIgfSk7XHJcbn0pO1xyXG5cclxuXHJcbmluaXREYXRhKCk7XHJcblxyXG4vL+WIneWni+WMluaVsOaNrlxyXG5mdW5jdGlvbiBpbml0RGF0YSgpIHtcclxuICAgIGlmICh1c2VyUm9sZSA9PSAyKS8v6LaF566hXHJcbiAgICB7XHJcbiAgICAgICAgLyrlhajpg6jmlZnlrabngrnnmoTkuIvmi4kqL1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICB1cmw6IFwiL09yZy9TY2hvb2wvR2V0U2Nob29sXCIsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICBkcm9wX3NjaG9vbCA9IGx1aS5pbml0RHJvcERvd25MaXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB3YXJwaWQ6IFwic2Nob29sQWxsXCIsIHdpZHRoOiAxNzAsIHN1YnRleHRsZW5ndGg6IDEwLCB0ZXh0RmllbGQ6ICdTY2hvb2xOYW1lJywgdmFsdWVGaWVsZDogJ1NjaG9vbElEJywgZGF0YTogW3sgU2Nob29sTmFtZTogJ+WFqOmDqOaVmeWtpueCuScsIFNjaG9vbElEOiAwIH1dXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bfc2Nob29sID0gbHVpLmluaXREcm9wRG93bkxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHdhcnBpZDogXCJzY2hvb2xBbGxcIiwgd2lkdGg6IDE3MCwgc3VidGV4dGxlbmd0aDogMTAsIHRleHRGaWVsZDogJ1NjaG9vbE5hbWUnLCB2YWx1ZUZpZWxkOiAnU2Nob29sSUQnLCBkYXRhOiBlLkRhdGEsIHNlbGVjdGVkQ2FsbEJhY2s6IEdldENoYW5nZVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBHZXRDbGFzc2VzKDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh1c2VyUm9sZSA9PSAzKS8v5qCh6ZW/XHJcbiAgICB7XHJcbiAgICAgICAgR2V0Q2xhc3NlcygwKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gR2V0Q2xhc3NlcyhlMSkge1xyXG4gICAgLyrlhajpg6jnj63nuqfnmoTkuIvmi4kqL1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICB1cmw6IFwiL09yZy9DbGFzc2VzL0dldENsYXNzTmFtZVwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBkYXRhOiB7IFNjaG9vbElEOiBlMSB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBkcm9wX2Nsc3NzID0gbHVpLmluaXREcm9wRG93bkxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgd2FycGlkOiBcImNsYXNzQWxsXCIsIHdpZHRoOiAxNzAsIHN1YnRleHRsZW5ndGg6IDEwLCB0ZXh0RmllbGQ6ICdDbGFzc05hbWUnLCB2YWx1ZUZpZWxkOiAnQ2xhc3NJRCcsIGRhdGE6IFt7IENsYXNzTmFtZTogJ+WFqOmDqOePree6pycsIENsYXNzSUQ6IDAgfV1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBkcm9wX2Nsc3NzID0gbHVpLmluaXREcm9wRG93bkxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgd2FycGlkOiBcImNsYXNzQWxsXCIsIHdpZHRoOiAxNzAsIHN1YnRleHRsZW5ndGg6IDEwLCB0ZXh0RmllbGQ6ICdDbGFzc05hbWUnLCB2YWx1ZUZpZWxkOiAnQ2xhc3NJRCcsIGRhdGE6IGUsIHNlbGVjdGVkQ2FsbEJhY2s6IEdldFRhYmxlQ2hhbmdlXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB2YXIgX3NjaG9vbElEID0gMDsvL+agoemVv1xyXG4gICAgICAgICAgICBpZiAoZHJvcF9zY2hvb2wpXHJcbiAgICAgICAgICAgICAgICBfc2Nob29sSUQgPSBkcm9wX3NjaG9vbC5nZXRWYWx1ZSgpLnZhbHVlOy8v6LaF566hXHJcbiAgICAgICAgICAgIGxvYWREYXRhKF9zY2hvb2xJRCwgMCwgMSk7Ly/liqDovb3ooajmoLwtLeWtpuagoS/nj63nuqcv6aG156CBXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEdldENoYW5nZShlMSwgZTIpLy/mjqfku7ZJROOAgemAieS4remhuUlELS3liqDovb3nj63nuqdcclxue1xyXG4gICAgR2V0Q2xhc3NlcyhlMik7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEdldFRhYmxlQ2hhbmdlKGUxLCBlMikvL+aOp+S7tklE44CBZTLnj63nuqdJRC0t5Yqg6L296KGo5qC8XHJcbntcclxuICAgIHZhciBfc2Nob29sSUQgPSAwOy8v5qCh6ZW/XHJcbiAgICBpZiAoZHJvcF9zY2hvb2wpXHJcbiAgICAgICAgX3NjaG9vbElEID0gZHJvcF9zY2hvb2wuZ2V0VmFsdWUoKS52YWx1ZTsvL+i2heeuoVxyXG4gICAgbG9hZERhdGEoX3NjaG9vbElELCBlMiwgMSk7Ly/liqDovb3ooajmoLwtLeWtpuagoS/nj63nuqcv6aG156CBXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxvYWREYXRhKGUxLCBlMiwgZTMpIHtcclxuICAgICQoXCIjcGFnZXJcIikuaHRtbChcIlwiKTtcclxuICAgICQoXCIjY3RhYmxlXCIpLmNoaWxkcmVuKFwiOmZpcnN0XCIpLm5leHRBbGwoKS5yZW1vdmUoKTtcclxuICAgICQoXCIjZW1wdHlEYXRhQmVmb3JlXCIpLnRtcGwobnVsbCkuYXBwZW5kVG8oXCIjY3RhYmxlXCIpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICB1cmw6IFwiL09yZy9DdXJyZW5jeS9HZXRDdXJyZW5jeVwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgU2Nob29sSUQ6IGUxLCBDbGFzc0lEOiBlMiwgUGFnZUluZGV4OiBlM1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgJChcIiNjdGFibGVcIikuY2hpbGRyZW4oXCI6Zmlyc3RcIikubmV4dEFsbCgpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBpZiAoZS5EYXRhLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2VtcHR5RGF0YU92ZXJcIikudG1wbChudWxsKS5hcHBlbmRUbyhcIiNjdGFibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2N1ckRhdGFcIikudG1wbChlLkRhdGEpLmFwcGVuZFRvKFwiI2N0YWJsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKFwiI3BhZ2VyXCIpLmh0bWwoZS5UYWdWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8v5YiG6aG15LqL5Lu2XHJcbiAgICAgICAgICAgIFBhZ2VyQ2xpY2soKTtcclxuXHJcbiAgICAgICAgICAgIC8v5by55Ye65bGCXHJcbiAgICAgICAgICAgIEVkaXRDbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBQYWdlckNsaWNrKCkge1xyXG4gICAgJChcIiNwYWdlciBhW2RhdGEtbnVtXVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9zY2hvb2xJRCA9IDA7Ly/moKHplb9cclxuICAgICAgICBpZiAoZHJvcF9zY2hvb2wpXHJcbiAgICAgICAgICAgIF9zY2hvb2xJRCA9IGRyb3Bfc2Nob29sLmdldFZhbHVlKCkudmFsdWU7Ly/otoXnrqFcclxuICAgICAgICB2YXIgX2NsYXNzSUQgPSBkcm9wX2Nsc3NzLmdldFZhbHVlKCkudmFsdWU7XHJcbiAgICAgICAgbG9hZERhdGEoX3NjaG9vbElELCBfY2xhc3NJRCwgJCh0aGlzKS5hdHRyKFwiZGF0YS1udW1cIikpOy8v5Yqg6L296KGo5qC8LS3lrabmoKEv54+t57qnL+mhteeggVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vL+eCueWHu+S/ruaUueePree6p1xyXG5mdW5jdGlvbiBFZGl0Q2xpY2soKSB7XHJcbiAgICAkKFwiW2RhdGEtdHlwZT0nZWRpdCddXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdmFyICRyID0gJCgoXCJ0cltkYXRhLWlkPVwiICsgJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKSArIFwiXVwiKSk7XHJcbiAgICAgICAgcm93X2RhdGEuU3R1ZGVudElEID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKS8v5a2m55SfSURcclxuICAgICAgICBHZXRDdXIocm93X2RhdGEuU3R1ZGVudElELCBcIiNlZGl0LWN1clwiKS8vTW9uZXkgICAgICAgXHJcbiAgICAgICAgJChcIiNlZGl0LW51bVwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgJChcIiNlZGl0LXJlbWFya1wiKS52YWwoXCJcIik7XHJcbiAgICAgICAgJChcIltkYXRhLXR5cGU9J2VkaXQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcImhpZGRlblwiIH0pO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaywjY29pbnMnKS5zaG93KCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIltkYXRhLXR5cGU9J2FkZCddXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgJHIgPSAkKChcInRyW2RhdGEtaWQ9XCIgKyAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpICsgXCJdXCIpKTtcclxuICAgICAgICByb3dfZGF0YS5TdHVkZW50SUQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpLy/lrabnlJ9JRFxyXG4gICAgICAgIEdldEN1cihyb3dfZGF0YS5TdHVkZW50SUQsIFwiI2FkZC1jdXJcIikvL01vbmV5XHJcbiAgICAgICAgJChcIiNhZGQtbnVtXCIpLnZhbChcIlwiKTtcclxuICAgICAgICAkKFwiI2FkZC1yZW1hcmtcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICQoXCJbZGF0YS10eXBlPSdhZGQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcImhpZGRlblwiIH0pO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaywjY29pbnMtYWRkJykuc2hvdygpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIEdldEN1cihlMSwgZTIpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvQ3VycmVuY3kvR2V0Q3VyXCIsXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgIGRhdGE6IHsgU3R1ZGVudElEOiBlMSB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICQoZTIpLnRleHQoZS5UYWdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8v5L+u5pS554+t57qnXHJcbiQoXCIjZWRpdC1va1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoJChcIltkYXRhLXR5cGU9J2VkaXQtaW5mbyddXCIpLmNzcyhcInZpc2liaWxpdHlcIikgPT0gXCJ2aXNpYmxlXCIpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByb3dfZGF0YS5DVHlwZSA9IDU7XHJcbiAgICByb3dfZGF0YS5DVmFsdWUgPSArKCQoXCIjZWRpdC1udW1cIikudmFsKCkpO1xyXG4gICAgcm93X2RhdGEuUmVtYXJrID0gJC50cmltKCQoXCIjZWRpdC1yZW1hcmtcIikudmFsKCkpO1xyXG4gICAgaWYgKHJvd19kYXRhLkNWYWx1ZSA9PSAwKSB7XHJcbiAgICAgICAgJChcIltkYXRhLXR5cGU9J2VkaXQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIiB9KS50ZXh0KFwi6K+36L6T5YWl5YWR5o2i5pWw6YeP77yBXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghKCtyb3dfZGF0YS5DVmFsdWUgPiAwICYmICtyb3dfZGF0YS5DVmFsdWUgPD0gKygkKFwiI2VkaXQtY3VyXCIpLnRleHQoKSkpKSB7XHJcbiAgICAgICAgJChcIltkYXRhLXR5cGU9J2VkaXQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIiB9KS50ZXh0KFwi5YWR5o2i5pWw6YeP6L+H5aSn77yBXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChyb3dfZGF0YS5SZW1hcmsgPT0gXCJcIikge1xyXG4gICAgICAgICQoXCJbZGF0YS10eXBlPSdlZGl0LWluZm8nXVwiKS5jc3MoeyBcInZpc2liaWxpdHlcIjogXCJ2aXNpYmxlXCIgfSkudGV4dChcIuivt+Whq+WGmeWkh+azqFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgIHVybDogXCIvT3JnL0N1cnJlbmN5L0VkaXRDdXJcIixcclxuICAgICAgICBkYXRhOiB7IGRhdGE6IEpTT04uc3RyaW5naWZ5KHJvd19kYXRhKSB9LFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgJChcIltkYXRhLXR5cGU9J2VkaXQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIiB9KS50ZXh0KFwi6K+35rGC5aSx6LSlIVwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLk9LKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucG9wLW1hc2ssI2NvaW5zJykuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgdmFyIF9zY2hvb2xJRCA9IDA7Ly/moKHplb9cclxuICAgICAgICAgICAgICAgIGlmIChkcm9wX3NjaG9vbClcclxuICAgICAgICAgICAgICAgICAgICBfc2Nob29sSUQgPSBkcm9wX3NjaG9vbC5nZXRWYWx1ZSgpLnZhbHVlOy8v6LaF566hXHJcbiAgICAgICAgICAgICAgICB2YXIgX2NsYXNzSUQgPSBkcm9wX2Nsc3NzLmdldFZhbHVlKCkudmFsdWU7XHJcbiAgICAgICAgICAgICAgICBsb2FkRGF0YShfc2Nob29sSUQsIF9jbGFzc0lELCAxKTsvL+WKoOi9veihqOagvC0t5a2m5qChL+ePree6py/pobXnoIFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCJbZGF0YS10eXBlPSdlZGl0LWluZm8nXVwiKS5jc3MoeyBcInZpc2liaWxpdHlcIjogXCJ2aXNpYmxlXCIgfSkudGV4dChlLlJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vL+a3u+WKoOePree6p1xyXG4kKFwiI2FkZC1va1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoJChcIltkYXRhLXR5cGU9J2FkZC1pbmZvJ11cIikuY3NzKFwidmlzaWJpbGl0eVwiKSA9PSBcInZpc2libGVcIikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJvd19kYXRhLkNUeXBlID0gNDtcclxuICAgIHJvd19kYXRhLkNWYWx1ZSA9ICskKFwiI2FkZC1udW1cIikudmFsKCk7XHJcbiAgICByb3dfZGF0YS5SZW1hcmsgPSAkLnRyaW0oJChcIiNhZGQtcmVtYXJrXCIpLnZhbCgpKTtcclxuICAgIGlmIChyb3dfZGF0YS5DVmFsdWUgPT0gMCkge1xyXG4gICAgICAgICQoXCJbZGF0YS10eXBlPSdhZGQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIiB9KS50ZXh0KFwi6K+36L6T5YWl5aWW5Yqx5pWw6YeP77yBXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghKCtyb3dfZGF0YS5DVmFsdWUgPiAwICYmICtyb3dfZGF0YS5DVmFsdWUgPD0gOTk5OTk5OTk5KSkge1xyXG4gICAgICAgICQoXCJbZGF0YS10eXBlPSdhZGQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIiB9KS50ZXh0KFwi5aWW5Yqx5pWw6YeP6L+H5aSn77yBXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmIChyb3dfZGF0YS5SZW1hcmsgPT0gXCJcIikge1xyXG4gICAgICAgICQoXCJbZGF0YS10eXBlPSdhZGQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIiB9KS50ZXh0KFwi6K+35aGr5YaZ5aSH5rOoXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvQ3VycmVuY3kvRWRpdEN1clwiLFxyXG4gICAgICAgIGRhdGE6IHsgZGF0YTogSlNPTi5zdHJpbmdpZnkocm93X2RhdGEpIH0sXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKFwiW2RhdGEtdHlwZT0nYWRkLWluZm8nXVwiKS5jc3MoeyBcInZpc2liaWxpdHlcIjogXCJ2aXNpYmxlXCIgfSkudGV4dChcIuivt+axguWksei0pe+8gVwiKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLk9LKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcucG9wLW1hc2ssI2NvaW5zLWFkZCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIHZhciBfc2Nob29sSUQgPSAwOy8v5qCh6ZW/XHJcbiAgICAgICAgICAgICAgICBpZiAoZHJvcF9zY2hvb2wpXHJcbiAgICAgICAgICAgICAgICAgICAgX3NjaG9vbElEID0gZHJvcF9zY2hvb2wuZ2V0VmFsdWUoKS52YWx1ZTsvL+i2heeuoVxyXG4gICAgICAgICAgICAgICAgdmFyIF9jbGFzc0lEID0gZHJvcF9jbHNzcy5nZXRWYWx1ZSgpLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgbG9hZERhdGEoX3NjaG9vbElELCBfY2xhc3NJRCwgMSk7Ly/liqDovb3ooajmoLwtLeWtpuagoS/nj63nuqcv6aG156CBXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiW2RhdGEtdHlwZT0nYWRkLWluZm8nXVwiKS5jc3MoeyBcInZpc2liaWxpdHlcIjogXCJ2aXNpYmxlXCIgfSkudGV4dChlLlJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9iYWNrU3RhZ2Uvc3R1ZGVudC1jb2lucy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDI2IiwidmFyIEx1aURyb3BEb3duTGlzdCA9IHJlcXVpcmUoJy4uL2pzL2Ryb3Bkb3dubGlzdCcpO1xyXG52YXIgTHVpQ2hlY2tCb3ggPSByZXF1aXJlKCcuLi9qcy9jaGVja2JveCcpO1xyXG5cclxuZnVuY3Rpb24gTHVpKCkge1xyXG4gICAgLy90aGlzLmNoZWNrQm94ID0gbnVsbDtcclxuICAgIC8vIHRoaXMuaW5pdFdvcmRTcGVhaygpO1xyXG59O1xyXG5cclxuTHVpLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWksXHJcbiAgICBpbml0VHJlZTogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICB2YXIgdCA9IG5ldyBMdWlUcmVlKCk7XHJcbiAgICAgICAgcmV0dXJuIHQuaW5pdChwKTtcclxuICAgIH0sXHJcbiAgICBpbml0RHJvcERvd25MaXN0OiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHZhciBkID0gbmV3IEx1aURyb3BEb3duTGlzdCgpO1xyXG4gICAgICAgIHJldHVybiBkLmluaXQocCk7XHJcbiAgICB9LFxyXG4gICAgaW5pdENoZWNrQm94OiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIC8v77+977+977+977+90rvvv73vv73vv73vv73vv73vv73vv73vv73Iq++/vda177+9Y2hlY2tib3jvv73vv73vv73vv71cclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tCb3gpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0JveCA9IG5ldyBMdWlDaGVja0JveCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IG5ldyBMdWlDaGVja0JveCgpO1xyXG4gICAgICAgIHJldHVybiBjLmluaXQocCk7XHJcblxyXG4gICAgfSxcclxuICAgIGluaXRXb3JkU3BlYWs6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgLy/vv73vv73vv73vv73Su++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vcir77+91rXvv713b3Jkc3BlYWvvv73vv73vv73vv71cclxuICAgICAgICBpZiAoIXRoaXMud29yZHNwZWFrKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29yZHNwZWFrID0gbmV3IEx1aVdvcmRTcGVhaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IG5ldyBMdWlXb3JkU3BlYWsoKTtcclxuICAgICAgICByZXR1cm4gYy5pbml0KHApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMdWk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9sdWkuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJmdW5jdGlvbiBMdWlEcm9wRG93bkxpc3QoKSB7XHJcbiAgICB0aGlzLnBhcmFtID0gbnVsbDtcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBcIlwiO1xyXG59XHJcbnZhciBkcm9wY291bnQgPSAxMDAwO1xyXG5MdWlEcm9wRG93bkxpc3QucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aURyb3BEb3duTGlzdCxcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSB0aGlzLndhcnBpZCA9IFwiI1wiICsgcGFyYW0ud2FycGlkO1xyXG4gICAgICAgIHZhciB3YXJwaWQgPSBwYXJhbS53YXJwaWQ7XHJcbiAgICAgICAgaWYgKCFwYXJhbS5kYXRhKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHZhciBkYXRhID0gcGFyYW0uZGF0YTtcclxuXHJcbiAgICAgICAgdmFyIHdpZHRoID0gcGFyYW0ud2lkdGggPSBwYXJhbS53aWR0aCB8fCAxODA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHBhcmFtLmhlaWdodCA9IHBhcmFtLmhlaWdodCB8fCAyMDA7XHJcbiAgICAgICAgdmFyIHN1YnRleHRsZW5ndGggPSBwYXJhbS5zdWJ0ZXh0bGVuZ3RoID0gcGFyYW0uc3VidGV4dGxlbmd0aCB8fCA1O1xyXG4gICAgICAgIHBhcmFtLnZhbHVlRmllbGQgPSBwYXJhbS52YWx1ZUZpZWxkIHx8IFwiaWRcIjtcclxuICAgICAgICBwYXJhbS50ZXh0RmllbGQgPSBwYXJhbS50ZXh0RmllbGQgfHwgXCJuYW1lXCI7XHJcbiAgICAgICAgdmFyIHZhbHVlRmllbGQgPSBwYXJhbS52YWx1ZUZpZWxkO1xyXG4gICAgICAgIHZhciB0ZXh0RmllbGQgPSBwYXJhbS50ZXh0RmllbGQ7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkQ2FsbEJhY2sgPSBwYXJhbS5zZWxlY3RlZENhbGxCYWNrO1xyXG4gICAgICAgIHZhciBsb2FkZWRDYWxsQmFjayA9IHBhcmFtLmxvYWRlZENhbGxCYWNrO1xyXG4gICAgICAgIHZhciB6aW5kZXggPSBwYXJhbS56aW5kZXg7XHJcbiAgICAgICAgaWYgKHBhcmFtLmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBkID0ge307XHJcbiAgICAgICAgICAgIGRbdmFsdWVGaWVsZF0gPSAtMTtcclxuICAgICAgICAgICAgZFt0ZXh0RmllbGRdID0gXCJcIjtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKGQpO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/orr7nva7pu5jorqTlgLxcclxuICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IGRhdGFbMF1bdmFsdWVGaWVsZF07XHJcbiAgICAgICAgdmFyIGRlZmF1bHRUZXh0ID0gcGFyYW0uZGVmYXVsdFRleHQgPSBwYXJhbS5kZWZhdWx0VmFsdWUgfHwgZGF0YVswXVt0ZXh0RmllbGRdO1xyXG4gICAgICAgIHRoaXMucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICB2YXIgdWxIdG1sID0gXCI8ZGl2IGNsYXNzPSdkcm9wZGl2IGRuJz5cIjtcclxuICAgICAgICB1bEh0bWwgKz0gJyAgPHVsIGNsYXNzPVwiZHJvcHVsXCIgc3R5bGU9XCJtYXgtaGVpZ2h0OicgKyBoZWlnaHQgKyAncHg7b3ZlcmZsb3c6YXV0bztcIiBkYXRhLWlkPVwiJyArIGRlZmF1bHRWYWx1ZSArICdcIiBkYXRhLW5hbWU9XCInICsgZGVmYXVsdFRleHQgKyAnXCI+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBkYXRhLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gZGF0YVtrXTtcclxuICAgICAgICAgICAgdmFyIHYgPSBpdGVtW3RleHRGaWVsZF0ubGVuZ3RoID4gc3VidGV4dGxlbmd0aCA/IGl0ZW1bdGV4dEZpZWxkXS5zdWJzdHJpbmcoMCwgc3VidGV4dGxlbmd0aCkgKyBcIi4uLlwiIDogaXRlbVt0ZXh0RmllbGRdO1xyXG4gICAgICAgICAgICB2YXIgaXRlbUh0bWwgPSAnPGxpIHRpdGxlPScgKyBpdGVtW3RleHRGaWVsZF0gKyAnIGRhdGEtaW5kZXg9JyArIGsgKyAnIGRhdGEtaWQ9JyArIGl0ZW1bdmFsdWVGaWVsZF0gKyAnIGRhdGEtdGFnPVxcJycgKyBKU09OLnN0cmluZ2lmeShkYXRhW2tdKSArICdcXCc+JyArIHYgKyAnPC9saT4nO1xyXG4gICAgICAgICAgICB1bEh0bWwgKz0gaXRlbUh0bWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVsSHRtbCArPSBcIjwvdWw+XCI7XHJcbiAgICAgICAgdWxIdG1sICs9IFwiPC9kaXY+XCI7XHJcbiAgICAgICAgdmFyIHNwYW5IdG1sID0gJyA8c3BhbiBzdHlsZT1cIndpZHRoOiAnICsgd2lkdGggKyAncHg7XCIgY2xhc3M9XCJkaWJcIj48c3BhbiBkYXRhLXR5cGU9XCJkcm9wZG93bmxpc3RfZHJvcF9zcGFuXCIgaWQ9XCJzcGFuJyArIHBhcmFtLndhcnBpZCArICdcIj4nICsgZGVmYXVsdFRleHQgKyAnPC9zcGFuPiA8aSBjbGFzcz1cIm51bV9kb3duXCI+PC9pPjwvc3Bhbj4nO1xyXG5cclxuICAgICAgICB2YXIgY29uID0gJChcIiNcIiArIHdhcnBpZCk7XHJcbiAgICAgICAgY29uLmNzcyh7IHdpZHRoOiB3aWR0aCB9KTtcclxuICAgICAgICBjb24uYWRkQ2xhc3MoXCJsdWlfZHJvcGRvd25saXN0XCIpO1xyXG4gICAgICAgIGNvbi5odG1sKHNwYW5IdG1sKTtcclxuICAgICAgICBjb24uYXBwZW5kKHVsSHRtbCk7XHJcbiAgICAgICAgaWYgKHppbmRleCkge1xyXG4gICAgICAgICAgICBjb24uZmluZChcIi5kcm9wZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgemluZGV4KTtcclxuICAgICAgICAgICAgY29uLmF0dHIoXCJ6aW5kZXhcIiwgemluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBjb24uZmluZChcIi5kcm9wZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgZHJvcGNvdW50LS0pO1xyXG4gICAgICAgICAgICAvLyBjb24uYXR0cihcInppbmRleFwiLCBkcm9wY291bnQgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uLmFkZENsYXNzKFwiYnRuX251bV91cGRvd25cIikuYWRkQ2xhc3MoXCJidG5fbnVtX3VwZG93bjFcIikuYWRkQ2xhc3MoXCJkaWJcIik7XHJcbiAgICAgICAgY29uLmF0dHIoXCJ0aXRsZVwiLCBkZWZhdWx0VGV4dCk7XHJcbiAgICAgICAgY29uLmF0dHIoXCJkYXRhLWlkXCIsIGRlZmF1bHRWYWx1ZSk7XHJcblxyXG4gICAgICAgIHZhciB1bCA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiB1bFwiKTtcclxuICAgICAgICB2YXIgZHJvcGRpdiA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiAuZHJvcGRpdlwiKTtcclxuICAgICAgICB2YXIgbGkgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgdWwgbGlcIik7XHJcbiAgICAgICAgdmFyIHNwYW4gPSBjb24uZmluZChcInNwYW5bZGF0YS10eXBlPSdkcm9wZG93bmxpc3RfZHJvcF9zcGFuJ11cIik7XHJcbiAgICAgICAgLy/kuovku7ZcclxuICAgICAgICAvL+S4i+aLieS6i+S7tlxyXG4gICAgICAgIGNvbi5jbGljayhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodWwuaXMoXCI6dmlzaWJsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRpdi5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmRyb3BkaXZcIikuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAgICAgLy8gZHJvcGRpdi5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB1bC5zbGlkZURvd24oMjAwKTtcclxuICAgICAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVEb3duKDIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAkKFwiLmRyb3BkaXZcIikuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uLm1vdXNlbGVhdmUoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyAgICAgdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8v6YCJ5Lit5LqL5Lu2XHJcbiAgICAgICAgbGkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFRleHQgPSAkKHRoaXMpLmh0bWwoKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSnNvbiA9ICQodGhpcykuYXR0cihcImRhdGEtam9zblwiKTtcclxuICAgICAgICAgICAgdmFyIGFsbHRpdGxlID0gJCh0aGlzKS5hdHRyKFwidGl0bGVcIik7XHJcbiAgICAgICAgICAgIHNwYW4udGV4dChzZWxlY3RlZFRleHQpO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWlkXCIsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWpzb25cIiwgc2VsZWN0ZWRKc29uKTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwidGl0bGVcIiwgYWxsdGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgY29uLmF0dHIoXCJ0aXRsZVwiLCBhbGx0aXRsZSk7XHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwiZGF0YS1pZFwiLCBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgLy/pgInkuK3lm57osIPkuovku7ZcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2FsbEJhY2sod2FycGlkLCBzZWxlY3RlZFZhbHVlLCBhbGx0aXRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJvcGRpdi5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGFuID0gc3BhbjtcclxuICAgICAgICAvL+iuvue9rum7mOiupOWAvFxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHNwYW4uYXR0cihcImRhdGEtaWRcIiksIHRleHQ6IHNwYW4uYXR0cihcInRpdGxlXCIpLCB6aW5kZXg6ICQodGhpcy5zZWxlY3RvcikuYXR0cihcInppbmRleFwiKSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IC0xLCB0ZXh0OiBcIlwiIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvL+aatOmcsue7meWklumDqOeahOaWueazlVxyXG4gICAgZ2V0U2VsZWN0ZWRKc29uVmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNwYW4uYXR0cihcImRhdGEtanNvblwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgdGV4dHNlbCA9IFwiXCI7XHJcbiAgICAgICAgLy/pgInkuK3nmoTlgLxcclxuICAgICAgICB2YXIgc2VsSXRlbTtcclxuICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICBmb3IgKHZhciBtID0gMDsgbSA8IHRoaXMucGFyYW0uZGF0YS5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXNlbCA9IHRoaXMucGFyYW0uZGF0YVttXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zZWxbdGhpcy5wYXJhbS52YWx1ZUZpZWxkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGV4dHNlbCA9IGl0ZW1zZWxbdGhpcy5wYXJhbS50ZXh0RmllbGRdO1xyXG4gICAgICAgICAgICAgICAgc2VsSXRlbSA9IGl0ZW1zZWw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWlkXCIsIHZhbHVlKTtcclxuICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWpzb25cIiwgSlNPTi5zdHJpbmdpZnkoc2VsSXRlbSkpO1xyXG4gICAgICAgIHNwYW4uYXR0cihcInRpdGxlXCIsIHRleHRzZWwpO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuYXR0cihcInRpdGxlXCIsIHRleHRzZWwpO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9IHRleHRzZWw7XHJcbiAgICAgICAgdmFyIHYgPSB0ZXh0c2VsLmxlbmd0aCA+IHRoaXMucGFyYW0uc3VidGV4dGxlbmd0aCA/IHRleHRzZWwuc3Vic3RyaW5nKDAsIHRoaXMucGFyYW0uc3VidGV4dGxlbmd0aCkgKyBcIi4uLlwiIDogdGV4dHNlbDtcclxuICAgICAgICBzcGFuLnRleHQodik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmxvYWRlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW0ubG9hZGVkQ2FsbEJhY2soY29udGFpbmVySWQsIHNlbGVjdGVkVmFsdWUsIHNlbGVjdGVkVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gTHVpRHJvcERvd25MaXN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9kcm9wZG93bmxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJcclxuZnVuY3Rpb24gTHVpQ2hlY2tCb3goKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gXCJsdWljaGVja1wiO1xyXG4gICAgLy/lj4LmlbBcclxuICAgIHRoaXMucGFyYW0gPSB7fTtcclxufVxyXG5cclxuTHVpQ2hlY2tCb3gucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aUNoZWNrQm94LFxyXG4gICAgLypcclxuICAgICAqd2FycGlkIOWuueWZqGlkXHJcbiAgICAgKmRhdGEg5pWw5o2u6ZuG77yManNvbiDkuLIgW3tuYW1lOnJleCx2YWw6MDAxfSx7bmFtZTpsaWxlaSx2YWw6MDAyfV1cclxuICAgICAq5bGV56S65a2X5q61ICAgdGV4dEZpZWxkXHJcbiAgICAgKuWunumZheWAvOWtl+autSB2YWx1ZUZpZWxkXHJcbiAgICAgKuWbnuiwg+WHveaVsCBjYWxsYmFjayDlj4LmlbDkuLrlvZPliY3op6blj5HnmoTlpI3pgInmoYbkuIrnu5HlrprnmoTmlbDmja5cclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgdmFyIGN0aGlzID0gdGhpcztcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0uZ3JvdXApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9ICdsdWljaGVja1tkYXRhLW5hbWU9XCInICsgcGFyYW0uZ3JvdXAgKyAnXCJdJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2tTdHlsZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKSA9PSAxID8gXCJjaGVja19zZWxcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrc2hvdyA9ICQoaXRlbSkuYXR0cihcImRhdGEtc2hvd2NoZWNrYm94XCIpICE9IDE7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dCA9ICQoaXRlbSkuYXR0cihcImRhdGEtdGV4dFwiKTtcclxuICAgICAgICAgICAgdmFyIGggPSAnPGkgY2xhc3M9XCJpY29uX2NoZWNrICcgKyBpc2NoZWNrU3R5bGUgKyAnIFwiPjwvaT4nO1xyXG4gICAgICAgICAgICB2YXIgcyA9ICc8c3BhbiBjbGFzcz1cImNoZWNrX3RleHRcIiAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiA+JyArIHRleHQgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGggPSBpc2NoZWNrc2hvdyA/IGggKyBzIDogcztcclxuICAgICAgICAgICAgLy8gaWYgKCQoaXRlbSkuZmluZChcImljb25fY2hlY2tcIikubGVuZ3RoID4gMCB8fCAkKGl0ZW0pLmZpbmQoXCJjaGVja190ZXh0XCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChpdGVtKS5odG1sKGgpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNzcyh7IFwiY3Vyc29yXCI6IFwicG9pbnRlclwiIH0pO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19zZWxcIikuYWRkQ2xhc3MoXCJjaGVja19kZWZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19kZWZcIikuYWRkQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBhbGVydChcImJpbmRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0mJnBhcmFtLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwbmFtZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gY3RoaXMuZ2V0SnNvblZhbHVlKGdyb3VwbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjlm57osIPlh73mlbDvvIzlubbov5Tlm57nu4TlkI3lkozmiYDpgInkuK3lgLzlvpdqc29u5LiyXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXJhbS5jYWxsYmFjayhncm91cG5hbWUsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uY2FsbGJhY2soaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcblxyXG4gICAgfSxcclxuICAgIC8v6K6+572uY2hlY2tib3jnu4Tlk6rkupvlgLzooqvpgInkuK1cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5maWx0ZXIoJ1tkYXRhLXZhbD1cIicgKyB2YWwgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoaXRlbSkuY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlmNoZWNrYm9457uE6YCJ5Lit55qE5YC8XHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByLnB1c2goJChpdGVtKS5hdHRyKFwiZGF0YS12YWxcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGVydChyLmpvaW4oJywnKSk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5ZjaGVja2JveOe7hOmAieS4reeahOWAvFxyXG4gICAgZ2V0SnNvblZhbHVlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGpzb25zdHIgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWpzb25cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbnN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHIucHVzaChKU09OLnBhcnNlKHVuZXNjYXBlKGpzb25zdHIpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH0sXHJcbiAgICAvKirliKTmlq3lvZPliY0gY2hlY2tib3gg5piv5ZCm6YCJ5LitICovXHJcbiAgICBpc2NoZWNrOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmZpbHRlcignW2RhdGEtdmFsPVwiJyArIHZhbCArICdcIl0nKVswXTtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICByZXR1cm4gaXNjaGVjayA9PSAxO1xyXG4gICAgfSxcclxuICAgIC8qKuWIpOaWreW9k+WJjSBjaGVja2JveCDmmK/lkKbpgInkuK0gKi9cclxuICAgIGlzY2hlY2tFbGVtZW50OiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIHJldHVybiBpc2NoZWNrID09IDE7XHJcbiAgICB9LFxyXG4gICAgLyoq5qih5ouf5Y2V5Ye7IOWPquaUueWPmOagt+W8jyAqL1xyXG4gICAgc2V0Q2xpY2tTdHlsZTogZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAwKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMSk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY2hpbGRyZW4oXCJpXCIpLmFkZENsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHM9THVpQ2hlY2tCb3g7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2NoZWNrYm94LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIl0sInNvdXJjZVJvb3QiOiIifQ==