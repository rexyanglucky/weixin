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
	var tool = __webpack_require__(4);
	
	tool.pophide($("[data-close]"), $('#editMesg,#addMesg,#student'));
	
	var drop_school;//校区对象
	var drop_teacher;//老师对象
	var drop_time;//授课时间对象
	var row_data = { ClassID: 0, ClassName: "", ClassType: 0, TeacherID: 0, DefaultNumber: 0 };//当前行数据
	
	$("#edit-num,#add-num").keypress(function () {
	    var keynum = event.keyCode;
	    if (!(keynum >= 48 && keynum <= 57))//非数字
	        return false;
	    if ($(this).val().length == 3)//3位数字
	        return false;
	    if ($(this).val() == "" && keynum == 48)//首位不能为0
	        return false;
	    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
	});
	
	$("#edit-name,#add-name").keypress(function () {
	    var keynum = event.keyCode;
	    if (keynum == 32)
	        return false;
	    if ($(this).val().length == 25)//25位
	        return false;
	    $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
	});
	
	//修改班级
	$("#edit-ok").click(function () {
	    if ($("[data-type='edit-info']").css("visibility") == "visible") {
	        return;
	    }
	    row_data.TeacherID = drop_teacher.getValue().value;
	    row_data.ClassType = drop_time.getValue().value;
	    row_data.ClassName = $("#edit-name").val();
	    row_data.DefaultNumber = $("#edit-num").val();
	    if ($.trim(row_data.ClassName).length == 0) {
	        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("班级不能为空！");
	        return;
	    }
	    if (!(+row_data.DefaultNumber > 0 && +row_data.DefaultNumber < 1000)) {
	        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请正确填写班级数量！");
	        return;
	    }
	    $.ajax({
	        type: "post",
	        url: "/Org/Classes/EditClasses",
	        data: { data: JSON.stringify(row_data) },
	        dataType: "json",
	        error: function (e) {
	            $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请求失败!");
	        },
	        success: function (e) {
	            if (e.OK) {
	                $('.pop-mask,#editMesg').hide();
	                var _schoolID = 0;//校长
	                if (drop_school)
	                    _schoolID = drop_school.getValue().value;//超管
	                GetSchool(_schoolID, 1);//加载表格
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
	    row_data.TeacherID = drop_teacher.getValue().value;
	    row_data.ClassType = drop_time.getValue().value;
	    row_data.ClassName = $("#add-name").val();
	    row_data.DefaultNumber = $("#add-num").val();
	    if ($.trim(row_data.ClassName).length == 0) {
	        $("[data-type='add-info']").css({ "visibility": "visible" }).text("班级不能为空！");
	        return;
	    }
	    if (!(+row_data.DefaultNumber > 0 && +row_data.DefaultNumber < 1000)) {
	        $("[data-type='add-info']").css({ "visibility": "visible" }).text("请正确填写班级数量！");
	        return;
	    }
	    $.ajax({
	        type: "post",
	        url: "/Org/Classes/AddClasses",
	        data: { data: JSON.stringify(row_data) },
	        dataType: "json",
	        error: function (e) {
	            $("[data-type='add-info']").css({ "visibility": "visible" }).text("请求失败！");
	        },
	        success: function (e) {
	            if (e.OK) {
	                $('.pop-mask,#addMesg').hide();
	                GetSchool(0, 1);//加载表格
	            }
	            else {
	                $("[data-type='add-info']").css({ "visibility": "visible" }).text(e.Result);
	            }
	        }
	    });
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
	                GetSchool(0, 1);
	            }
	        });
	    }
	    else if (userRole == 3)//校长
	    {
	        tool.popshow($("[data-type='add']"), $('#addMesg'));//添加班级弹出层觖发事件
	        AddClick();//添加弹出层
	        GetSchool(0, 1);//加载表格
	    }
	}
	
	function GetSchool(e1, e2)//学校ID、页码
	{
	    $("#pager").html("");
	    $("#ctable").children(":first").nextAll().remove();
	    $("#emptyDataBefore").tmpl(null).appendTo("#ctable");
	    $.ajax({
	        type: "post",
	        url: "/Org/Classes/GetClasses",
	        data: {
	            SchoolID: e1, PageIndex: e2
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
	                $("#classData").tmpl(e.Data).appendTo("#ctable");
	            }
	            $("#pager").html(e.TagValue);
	            tool.popshow($("[data-type='edit']"), $('#editMesg'));
	            //分页事件
	            PagerClick();
	            //修改事件
	            EditClick();
	            //查看人数事件
	            ViewInfo();
	        }
	    });
	}
	
	function ViewInfo() {
	    $("[data-type='view-info']").click(function () {
	        var _classID = $(this).attr("data-id");
	        $('.pop-mask,#student').show();
	        GetStudent(_classID);
	    });
	}
	
	function PagerClick() {
	    $("#pager a[data-num]").click(function () {
	        var _schoolID = 0;//校长
	        if (drop_school)
	            _schoolID = drop_school.getValue().value;//超管
	        GetSchool(_schoolID, $(this).attr("data-num"));//加载表格
	    });
	}
	
	function GetChange(e1, e2)//控件ID、选中项ID
	{
	    GetSchool(e2, 1);
	}
	
	//点击添加班级
	function AddClick() {
	    $("[data-type='add']").click(function () {
	        $("#add-name").val("");
	        $("#add-num").val("");
	        $.ajax({
	            type: "post",
	            url: "/Org/Classes/GetDic",
	            data: {
	                DicType: 1
	            },
	            dataType: "json",
	            error: function (e) {
	            },
	            success: function (e) {
	                drop_time = lui.initDropDownList({
	                    warpid: "drop_time_add", width: 260, subtextlength: 10, textField: 'DicValue', valueField: 'DicKey', data: e.Data
	                });
	                GetTeachersAdd();
	            }
	        });
	
	    });
	}
	
	//点击修改班级
	function EditClick() {
	    $("[data-type='edit']").click(function () {
	        var $r = $(("tr[data-id=" + $(this).attr("data-id") + "]"));
	        row_data.ClassID = $(this).attr("data-id")//班级ID
	        row_data.ClassName = $r.children("[data-index=1]").attr("data-value");//班级名称
	        row_data.ClassType = $r.children("[data-index=2]").attr("data-value");//班级类型
	        row_data.TeacherID = $r.children("[data-index=3]").attr("data-value");//老师
	        row_data.DefaultNumber = $r.children("[data-index=4]").attr("data-value");//班级默认人数
	        //
	        $("#edit-name").val(row_data.ClassName);
	        $("#edit-num").val(row_data.DefaultNumber);
	        //
	        $.ajax({
	            type: "post",
	            url: "/Org/Classes/GetDic",
	            data: {
	                DicType: 1
	            },
	            dataType: "json",
	            error: function (e) {
	            },
	            success: function (e) {
	                drop_time = lui.initDropDownList({
	                    warpid: "drop_time", width: 260, subtextlength: 10, textField: 'DicValue', valueField: 'DicKey', data: e.Data
	                });
	                drop_time.setValue(row_data.ClassType);
	                GetTeachers();
	            }
	        });
	    });
	}
	
	//加载老师数据
	function GetTeachers() {
	    $.ajax({
	        type: "post",
	        url: "/Org/Classes/GetTeachers",
	        dataType: "json",
	        error: function (e) {
	        },
	        success: function (e) {
	            drop_teacher = lui.initDropDownList({
	                warpid: "drop_teacher", width: 260, subtextlength: 10, textField: 'UserName', valueField: 'UserID', data: e.Data
	            });
	            drop_teacher.setValue(row_data.TeacherID);
	        }
	    });
	}
	
	//加载老师数据
	function GetTeachersAdd() {
	    $.ajax({
	        type: "post",
	        url: "/Org/Classes/GetTeachers",
	        dataType: "json",
	        error: function (e) {
	        },
	        success: function (e) {
	            drop_teacher = lui.initDropDownList({
	                warpid: "drop_teacher_add", width: 260, subtextlength: 10, textField: 'UserName', valueField: 'UserID', data: e.Data
	            });
	        }
	    });
	}
	
	//加载学生数据
	function GetStudent(e1) {
	    $("#viewDataHtml").html("");
	    $("#emptyViewDataBefore").tmpl(null).appendTo("#viewDataHtml");
	    $.ajax({
	        type: "post",
	        url: "/Org/Classes/GetStuents",
	        data: { ClassID: e1 },
	        dataType: "json",
	        error: function (e) {
	        },
	        success: function (e) {
	            if (e.OK) {
	                $("#viewDataHtml").html("");
	                if (e.Data.length == 0) {
	                    $("#emptyViewDataOver").tmpl(null).appendTo("#viewDataHtml");
	                }
	                else {
	                    $("#viewData").tmpl(e).appendTo("#viewDataHtml");
	                    var divhtml = $("#viewDataHtml").html();
	                    var reg = /<td data-id="a"><\/td>(.*?)<td data-id="b"><\/td>/gi;
	                    var newhtml = divhtml.replace(reg, "<tr>$1</tr>");
	                    $("#viewDataHtml").html(newhtml);
	                }
	            }
	        }
	    });
	}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqIiwid2VicGFjazovLy8uL3NyYy9qcy9iYWNrU3RhZ2UvY2xhc3MtbWFuYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9MVUkvanMvbHVpLmpzP2U3OTAqIiwid2VicGFjazovLy8uL3NyYy9MVUkvanMvZHJvcGRvd25saXN0LmpzP2ZlZjAqIiwid2VicGFjazovLy8uL3NyYy9MVUkvanMvY2hlY2tib3guanM/NjE2ZCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS90b29sLmpzPzVlNmEqKiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUJBQWdCO0FBQ2hCLGtCQUFpQjtBQUNqQixlQUFjO0FBQ2QsaUJBQWdCLDJFQUEyRTs7QUFFM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE2RCx5QkFBeUI7QUFDdEYsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBNkQseUJBQXlCO0FBQ3RGLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMsMEJBQTBCO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQywwQkFBMEI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlDQUFpQztBQUNoRDtBQUNBO0FBQ0EsK0NBQThDLDBCQUEwQjtBQUN4RSxVQUFTO0FBQ1Q7QUFDQTtB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QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakIsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUEsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsb0NBQW9DO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQSw4QkFBNkI7QUFDN0IsMENBQXlDO0FBQ3pDLG9CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQyxtQ0FBbUM7QUFDdkU7QUFDQTtBQUNBLE1BQUs7QUFDTCw2QkFBNEIsb0NBQW9DO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJhY2tTdGFnZS9jbGFzcy1tYW5hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTA2MTQ4ZDA1Nzk0MDgwMGZmNSIsInZhciBMdWkgPSByZXF1aXJlKCcuLi8uLi9MVUkvanMvbHVpJyk7XHJcbnZhciBsdWkgPSBuZXcgTHVpKCk7XHJcbnZhciB0b29sID0gcmVxdWlyZSgnLi4vLi4vTFVJL3Rvb2wnKTtcclxuXHJcbnRvb2wucG9waGlkZSgkKFwiW2RhdGEtY2xvc2VdXCIpLCAkKCcjZWRpdE1lc2csI2FkZE1lc2csI3N0dWRlbnQnKSk7XHJcblxyXG52YXIgZHJvcF9zY2hvb2w7Ly/moKHljLrlr7nosaFcclxudmFyIGRyb3BfdGVhY2hlcjsvL+iAgeW4iOWvueixoVxyXG52YXIgZHJvcF90aW1lOy8v5o6I6K++5pe26Ze05a+56LGhXHJcbnZhciByb3dfZGF0YSA9IHsgQ2xhc3NJRDogMCwgQ2xhc3NOYW1lOiBcIlwiLCBDbGFzc1R5cGU6IDAsIFRlYWNoZXJJRDogMCwgRGVmYXVsdE51bWJlcjogMCB9Oy8v5b2T5YmN6KGM5pWw5o2uXHJcblxyXG4kKFwiI2VkaXQtbnVtLCNhZGQtbnVtXCIpLmtleXByZXNzKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBrZXludW0gPSBldmVudC5rZXlDb2RlO1xyXG4gICAgaWYgKCEoa2V5bnVtID49IDQ4ICYmIGtleW51bSA8PSA1NykpLy/pnZ7mlbDlrZdcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoJCh0aGlzKS52YWwoKS5sZW5ndGggPT0gMykvLzPkvY3mlbDlrZdcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICBpZiAoJCh0aGlzKS52YWwoKSA9PSBcIlwiICYmIGtleW51bSA9PSA0OCkvL+mmluS9jeS4jeiDveS4ujBcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAkKFwiW2RhdGEtdHlwZT0nZWRpdC1pbmZvJ10sW2RhdGEtdHlwZT0nYWRkLWluZm8nXVwiKS5jc3MoeyBcInZpc2liaWxpdHlcIjogXCJoaWRkZW5cIiB9KTtcclxufSk7XHJcblxyXG4kKFwiI2VkaXQtbmFtZSwjYWRkLW5hbWVcIikua2V5cHJlc3MoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGtleW51bSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICBpZiAoa2V5bnVtID09IDMyKVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PSAyNSkvLzI15L2NXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgJChcIltkYXRhLXR5cGU9J2VkaXQtaW5mbyddLFtkYXRhLXR5cGU9J2FkZC1pbmZvJ11cIikuY3NzKHsgXCJ2aXNpYmlsaXR5XCI6IFwiaGlkZGVuXCIgfSk7XHJcbn0pO1xyXG5cclxuLy/kv67mlLnnj63nuqdcclxuJChcIiNlZGl0LW9rXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICgkKFwiW2RhdGEtdHlwZT0nZWRpdC1pbmZvJ11cIikuY3NzKFwidmlzaWJpbGl0eVwiKSA9PSBcInZpc2libGVcIikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHJvd19kYXRhLlRlYWNoZXJJRCA9IGRyb3BfdGVhY2hlci5nZXRWYWx1ZSgpLnZhbHVlO1xyXG4gICAgcm93X2RhdGEuQ2xhc3NUeXBlID0gZHJvcF90aW1lLmdldFZhbHVlKCkudmFsdWU7XHJcbiAgICByb3dfZGF0YS5DbGFzc05hbWUgPSAkKFwiI2VkaXQtbmFtZVwiKS52YWwoKTtcclxuICAgIHJvd19kYXRhLkRlZmF1bHROdW1iZXIgPSAkKFwiI2VkaXQtbnVtXCIpLnZhbCgpO1xyXG4gICAgaWYgKCQudHJpbShyb3dfZGF0YS5DbGFzc05hbWUpLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgJChcIltkYXRhLXR5cGU9J2VkaXQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIiB9KS50ZXh0KFwi54+t57qn5LiN6IO95Li656m677yBXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghKCtyb3dfZGF0YS5EZWZhdWx0TnVtYmVyID4gMCAmJiArcm93X2RhdGEuRGVmYXVsdE51bWJlciA8IDEwMDApKSB7XHJcbiAgICAgICAgJChcIltkYXRhLXR5cGU9J2VkaXQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIiB9KS50ZXh0KFwi6K+35q2j56Gu5aGr5YaZ54+t57qn5pWw6YeP77yBXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvQ2xhc3Nlcy9FZGl0Q2xhc3Nlc1wiLFxyXG4gICAgICAgIGRhdGE6IHsgZGF0YTogSlNPTi5zdHJpbmdpZnkocm93X2RhdGEpIH0sXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKFwiW2RhdGEtdHlwZT0nZWRpdC1pbmZvJ11cIikuY3NzKHsgXCJ2aXNpYmlsaXR5XCI6IFwidmlzaWJsZVwiIH0pLnRleHQoXCLor7fmsYLlpLHotKUhXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuT0spIHtcclxuICAgICAgICAgICAgICAgICQoJy5wb3AtbWFzaywjZWRpdE1lc2cnKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgX3NjaG9vbElEID0gMDsvL+agoemVv1xyXG4gICAgICAgICAgICAgICAgaWYgKGRyb3Bfc2Nob29sKVxyXG4gICAgICAgICAgICAgICAgICAgIF9zY2hvb2xJRCA9IGRyb3Bfc2Nob29sLmdldFZhbHVlKCkudmFsdWU7Ly/otoXnrqFcclxuICAgICAgICAgICAgICAgIEdldFNjaG9vbChfc2Nob29sSUQsIDEpOy8v5Yqg6L296KGo5qC8XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiW2RhdGEtdHlwZT0nZWRpdC1pbmZvJ11cIikuY3NzKHsgXCJ2aXNpYmlsaXR5XCI6IFwidmlzaWJsZVwiIH0pLnRleHQoZS5SZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLy/mt7vliqDnj63nuqdcclxuJChcIiNhZGQtb2tcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCQoXCJbZGF0YS10eXBlPSdhZGQtaW5mbyddXCIpLmNzcyhcInZpc2liaWxpdHlcIikgPT0gXCJ2aXNpYmxlXCIpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICByb3dfZGF0YS5UZWFjaGVySUQgPSBkcm9wX3RlYWNoZXIuZ2V0VmFsdWUoKS52YWx1ZTtcclxuICAgIHJvd19kYXRhLkNsYXNzVHlwZSA9IGRyb3BfdGltZS5nZXRWYWx1ZSgpLnZhbHVlO1xyXG4gICAgcm93X2RhdGEuQ2xhc3NOYW1lID0gJChcIiNhZGQtbmFtZVwiKS52YWwoKTtcclxuICAgIHJvd19kYXRhLkRlZmF1bHROdW1iZXIgPSAkKFwiI2FkZC1udW1cIikudmFsKCk7XHJcbiAgICBpZiAoJC50cmltKHJvd19kYXRhLkNsYXNzTmFtZSkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAkKFwiW2RhdGEtdHlwZT0nYWRkLWluZm8nXVwiKS5jc3MoeyBcInZpc2liaWxpdHlcIjogXCJ2aXNpYmxlXCIgfSkudGV4dChcIuePree6p+S4jeiDveS4uuepuu+8gVwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoISgrcm93X2RhdGEuRGVmYXVsdE51bWJlciA+IDAgJiYgK3Jvd19kYXRhLkRlZmF1bHROdW1iZXIgPCAxMDAwKSkge1xyXG4gICAgICAgICQoXCJbZGF0YS10eXBlPSdhZGQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIiB9KS50ZXh0KFwi6K+35q2j56Gu5aGr5YaZ54+t57qn5pWw6YeP77yBXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvQ2xhc3Nlcy9BZGRDbGFzc2VzXCIsXHJcbiAgICAgICAgZGF0YTogeyBkYXRhOiBKU09OLnN0cmluZ2lmeShyb3dfZGF0YSkgfSxcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICQoXCJbZGF0YS10eXBlPSdhZGQtaW5mbyddXCIpLmNzcyh7IFwidmlzaWJpbGl0eVwiOiBcInZpc2libGVcIiB9KS50ZXh0KFwi6K+35rGC5aSx6LSl77yBXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuT0spIHtcclxuICAgICAgICAgICAgICAgICQoJy5wb3AtbWFzaywjYWRkTWVzZycpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIEdldFNjaG9vbCgwLCAxKTsvL+WKoOi9veihqOagvFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIltkYXRhLXR5cGU9J2FkZC1pbmZvJ11cIikuY3NzKHsgXCJ2aXNpYmlsaXR5XCI6IFwidmlzaWJsZVwiIH0pLnRleHQoZS5SZXN1bHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuaW5pdERhdGEoKTtcclxuXHJcbi8v5Yid5aeL5YyW5pWw5o2uXHJcbmZ1bmN0aW9uIGluaXREYXRhKCkge1xyXG4gICAgaWYgKHVzZXJSb2xlID09IDIpLy/otoXnrqFcclxuICAgIHtcclxuICAgICAgICAvKuWFqOmDqOaVmeWtpueCueeahOS4i+aLiSovXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvT3JnL1NjaG9vbC9HZXRTY2hvb2xcIixcclxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGRyb3Bfc2Nob29sID0gbHVpLmluaXREcm9wRG93bkxpc3Qoe1xyXG4gICAgICAgICAgICAgICAgICAgIHdhcnBpZDogXCJzY2hvb2xBbGxcIiwgd2lkdGg6IDE3MCwgc3VidGV4dGxlbmd0aDogMTAsIHRleHRGaWVsZDogJ1NjaG9vbE5hbWUnLCB2YWx1ZUZpZWxkOiAnU2Nob29sSUQnLCBkYXRhOiBbeyBTY2hvb2xOYW1lOiAn5YWo6YOo5pWZ5a2m54K5JywgU2Nob29sSUQ6IDAgfV1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgZHJvcF9zY2hvb2wgPSBsdWkuaW5pdERyb3BEb3duTGlzdCh7XHJcbiAgICAgICAgICAgICAgICAgICAgd2FycGlkOiBcInNjaG9vbEFsbFwiLCB3aWR0aDogMTcwLCBzdWJ0ZXh0bGVuZ3RoOiAxMCwgdGV4dEZpZWxkOiAnU2Nob29sTmFtZScsIHZhbHVlRmllbGQ6ICdTY2hvb2xJRCcsIGRhdGE6IGUuRGF0YSwgc2VsZWN0ZWRDYWxsQmFjazogR2V0Q2hhbmdlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIEdldFNjaG9vbCgwLCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodXNlclJvbGUgPT0gMykvL+agoemVv1xyXG4gICAge1xyXG4gICAgICAgIHRvb2wucG9wc2hvdygkKFwiW2RhdGEtdHlwZT0nYWRkJ11cIiksICQoJyNhZGRNZXNnJykpOy8v5re75Yqg54+t57qn5by55Ye65bGC6KeW5Y+R5LqL5Lu2XHJcbiAgICAgICAgQWRkQ2xpY2soKTsvL+a3u+WKoOW8ueWHuuWxglxyXG4gICAgICAgIEdldFNjaG9vbCgwLCAxKTsvL+WKoOi9veihqOagvFxyXG4gICAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBHZXRTY2hvb2woZTEsIGUyKS8v5a2m5qChSUTjgIHpobXnoIFcclxue1xyXG4gICAgJChcIiNwYWdlclwiKS5odG1sKFwiXCIpO1xyXG4gICAgJChcIiNjdGFibGVcIikuY2hpbGRyZW4oXCI6Zmlyc3RcIikubmV4dEFsbCgpLnJlbW92ZSgpO1xyXG4gICAgJChcIiNlbXB0eURhdGFCZWZvcmVcIikudG1wbChudWxsKS5hcHBlbmRUbyhcIiNjdGFibGVcIik7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgIHVybDogXCIvT3JnL0NsYXNzZXMvR2V0Q2xhc3Nlc1wiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgU2Nob29sSUQ6IGUxLCBQYWdlSW5kZXg6IGUyXHJcbiAgICAgICAgfSxcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKFwiI2N0YWJsZVwiKS5jaGlsZHJlbihcIjpmaXJzdFwiKS5uZXh0QWxsKCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGlmIChlLkRhdGEubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICQoXCIjZW1wdHlEYXRhT3ZlclwiKS50bXBsKG51bGwpLmFwcGVuZFRvKFwiI2N0YWJsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIjY2xhc3NEYXRhXCIpLnRtcGwoZS5EYXRhKS5hcHBlbmRUbyhcIiNjdGFibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcIiNwYWdlclwiKS5odG1sKGUuVGFnVmFsdWUpO1xyXG4gICAgICAgICAgICB0b29sLnBvcHNob3coJChcIltkYXRhLXR5cGU9J2VkaXQnXVwiKSwgJCgnI2VkaXRNZXNnJykpO1xyXG4gICAgICAgICAgICAvL+WIhumhteS6i+S7tlxyXG4gICAgICAgICAgICBQYWdlckNsaWNrKCk7XHJcbiAgICAgICAgICAgIC8v5L+u5pS55LqL5Lu2XHJcbiAgICAgICAgICAgIEVkaXRDbGljaygpO1xyXG4gICAgICAgICAgICAvL+afpeeci+S6uuaVsOS6i+S7tlxyXG4gICAgICAgICAgICBWaWV3SW5mbygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBWaWV3SW5mbygpIHtcclxuICAgICQoXCJbZGF0YS10eXBlPSd2aWV3LWluZm8nXVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIF9jbGFzc0lEID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAkKCcucG9wLW1hc2ssI3N0dWRlbnQnKS5zaG93KCk7XHJcbiAgICAgICAgR2V0U3R1ZGVudChfY2xhc3NJRCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gUGFnZXJDbGljaygpIHtcclxuICAgICQoXCIjcGFnZXIgYVtkYXRhLW51bV1cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBfc2Nob29sSUQgPSAwOy8v5qCh6ZW/XHJcbiAgICAgICAgaWYgKGRyb3Bfc2Nob29sKVxyXG4gICAgICAgICAgICBfc2Nob29sSUQgPSBkcm9wX3NjaG9vbC5nZXRWYWx1ZSgpLnZhbHVlOy8v6LaF566hXHJcbiAgICAgICAgR2V0U2Nob29sKF9zY2hvb2xJRCwgJCh0aGlzKS5hdHRyKFwiZGF0YS1udW1cIikpOy8v5Yqg6L296KGo5qC8XHJcbiAgICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gR2V0Q2hhbmdlKGUxLCBlMikvL+aOp+S7tklE44CB6YCJ5Lit6aG5SURcclxue1xyXG4gICAgR2V0U2Nob29sKGUyLCAxKTtcclxufVxyXG5cclxuLy/ngrnlh7vmt7vliqDnj63nuqdcclxuZnVuY3Rpb24gQWRkQ2xpY2soKSB7XHJcbiAgICAkKFwiW2RhdGEtdHlwZT0nYWRkJ11cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjYWRkLW5hbWVcIikudmFsKFwiXCIpO1xyXG4gICAgICAgICQoXCIjYWRkLW51bVwiKS52YWwoXCJcIik7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvT3JnL0NsYXNzZXMvR2V0RGljXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIERpY1R5cGU6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGRyb3BfdGltZSA9IGx1aS5pbml0RHJvcERvd25MaXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB3YXJwaWQ6IFwiZHJvcF90aW1lX2FkZFwiLCB3aWR0aDogMjYwLCBzdWJ0ZXh0bGVuZ3RoOiAxMCwgdGV4dEZpZWxkOiAnRGljVmFsdWUnLCB2YWx1ZUZpZWxkOiAnRGljS2V5JywgZGF0YTogZS5EYXRhXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIEdldFRlYWNoZXJzQWRkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxufVxyXG5cclxuLy/ngrnlh7vkv67mlLnnj63nuqdcclxuZnVuY3Rpb24gRWRpdENsaWNrKCkge1xyXG4gICAgJChcIltkYXRhLXR5cGU9J2VkaXQnXVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyICRyID0gJCgoXCJ0cltkYXRhLWlkPVwiICsgJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKSArIFwiXVwiKSk7XHJcbiAgICAgICAgcm93X2RhdGEuQ2xhc3NJRCA9ICQodGhpcykuYXR0cihcImRhdGEtaWRcIikvL+ePree6p0lEXHJcbiAgICAgICAgcm93X2RhdGEuQ2xhc3NOYW1lID0gJHIuY2hpbGRyZW4oXCJbZGF0YS1pbmRleD0xXVwiKS5hdHRyKFwiZGF0YS12YWx1ZVwiKTsvL+ePree6p+WQjeensFxyXG4gICAgICAgIHJvd19kYXRhLkNsYXNzVHlwZSA9ICRyLmNoaWxkcmVuKFwiW2RhdGEtaW5kZXg9Ml1cIikuYXR0cihcImRhdGEtdmFsdWVcIik7Ly/nj63nuqfnsbvlnotcclxuICAgICAgICByb3dfZGF0YS5UZWFjaGVySUQgPSAkci5jaGlsZHJlbihcIltkYXRhLWluZGV4PTNdXCIpLmF0dHIoXCJkYXRhLXZhbHVlXCIpOy8v6ICB5biIXHJcbiAgICAgICAgcm93X2RhdGEuRGVmYXVsdE51bWJlciA9ICRyLmNoaWxkcmVuKFwiW2RhdGEtaW5kZXg9NF1cIikuYXR0cihcImRhdGEtdmFsdWVcIik7Ly/nj63nuqfpu5jorqTkurrmlbBcclxuICAgICAgICAvL1xyXG4gICAgICAgICQoXCIjZWRpdC1uYW1lXCIpLnZhbChyb3dfZGF0YS5DbGFzc05hbWUpO1xyXG4gICAgICAgICQoXCIjZWRpdC1udW1cIikudmFsKHJvd19kYXRhLkRlZmF1bHROdW1iZXIpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgIHVybDogXCIvT3JnL0NsYXNzZXMvR2V0RGljXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgIERpY1R5cGU6IDFcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGRyb3BfdGltZSA9IGx1aS5pbml0RHJvcERvd25MaXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB3YXJwaWQ6IFwiZHJvcF90aW1lXCIsIHdpZHRoOiAyNjAsIHN1YnRleHRsZW5ndGg6IDEwLCB0ZXh0RmllbGQ6ICdEaWNWYWx1ZScsIHZhbHVlRmllbGQ6ICdEaWNLZXknLCBkYXRhOiBlLkRhdGFcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZHJvcF90aW1lLnNldFZhbHVlKHJvd19kYXRhLkNsYXNzVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBHZXRUZWFjaGVycygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy/liqDovb3ogIHluIjmlbDmja5cclxuZnVuY3Rpb24gR2V0VGVhY2hlcnMoKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgIHVybDogXCIvT3JnL0NsYXNzZXMvR2V0VGVhY2hlcnNcIixcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBkcm9wX3RlYWNoZXIgPSBsdWkuaW5pdERyb3BEb3duTGlzdCh7XHJcbiAgICAgICAgICAgICAgICB3YXJwaWQ6IFwiZHJvcF90ZWFjaGVyXCIsIHdpZHRoOiAyNjAsIHN1YnRleHRsZW5ndGg6IDEwLCB0ZXh0RmllbGQ6ICdVc2VyTmFtZScsIHZhbHVlRmllbGQ6ICdVc2VySUQnLCBkYXRhOiBlLkRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGRyb3BfdGVhY2hlci5zZXRWYWx1ZShyb3dfZGF0YS5UZWFjaGVySUQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vL+WKoOi9veiAgeW4iOaVsOaNrlxyXG5mdW5jdGlvbiBHZXRUZWFjaGVyc0FkZCgpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvQ2xhc3Nlcy9HZXRUZWFjaGVyc1wiLFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGRyb3BfdGVhY2hlciA9IGx1aS5pbml0RHJvcERvd25MaXN0KHtcclxuICAgICAgICAgICAgICAgIHdhcnBpZDogXCJkcm9wX3RlYWNoZXJfYWRkXCIsIHdpZHRoOiAyNjAsIHN1YnRleHRsZW5ndGg6IDEwLCB0ZXh0RmllbGQ6ICdVc2VyTmFtZScsIHZhbHVlRmllbGQ6ICdVc2VySUQnLCBkYXRhOiBlLkRhdGFcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8v5Yqg6L295a2m55Sf5pWw5o2uXHJcbmZ1bmN0aW9uIEdldFN0dWRlbnQoZTEpIHtcclxuICAgICQoXCIjdmlld0RhdGFIdG1sXCIpLmh0bWwoXCJcIik7XHJcbiAgICAkKFwiI2VtcHR5Vmlld0RhdGFCZWZvcmVcIikudG1wbChudWxsKS5hcHBlbmRUbyhcIiN2aWV3RGF0YUh0bWxcIik7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgIHVybDogXCIvT3JnL0NsYXNzZXMvR2V0U3R1ZW50c1wiLFxyXG4gICAgICAgIGRhdGE6IHsgQ2xhc3NJRDogZTEgfSxcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoZS5PSykge1xyXG4gICAgICAgICAgICAgICAgJChcIiN2aWV3RGF0YUh0bWxcIikuaHRtbChcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChlLkRhdGEubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2VtcHR5Vmlld0RhdGFPdmVyXCIpLnRtcGwobnVsbCkuYXBwZW5kVG8oXCIjdmlld0RhdGFIdG1sXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiN2aWV3RGF0YVwiKS50bXBsKGUpLmFwcGVuZFRvKFwiI3ZpZXdEYXRhSHRtbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGl2aHRtbCA9ICQoXCIjdmlld0RhdGFIdG1sXCIpLmh0bWwoKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVnID0gLzx0ZCBkYXRhLWlkPVwiYVwiPjxcXC90ZD4oLio/KTx0ZCBkYXRhLWlkPVwiYlwiPjxcXC90ZD4vZ2k7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld2h0bWwgPSBkaXZodG1sLnJlcGxhY2UocmVnLCBcIjx0cj4kMTwvdHI+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjdmlld0RhdGFIdG1sXCIpLmh0bWwobmV3aHRtbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9iYWNrU3RhZ2UvY2xhc3MtbWFuYWdlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsInZhciBMdWlEcm9wRG93bkxpc3QgPSByZXF1aXJlKCcuLi9qcy9kcm9wZG93bmxpc3QnKTtcclxudmFyIEx1aUNoZWNrQm94ID0gcmVxdWlyZSgnLi4vanMvY2hlY2tib3gnKTtcclxuXHJcbmZ1bmN0aW9uIEx1aSgpIHtcclxuICAgIC8vdGhpcy5jaGVja0JveCA9IG51bGw7XHJcbiAgICAvLyB0aGlzLmluaXRXb3JkU3BlYWsoKTtcclxufTtcclxuXHJcbkx1aS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogTHVpLFxyXG4gICAgaW5pdFRyZWU6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgdmFyIHQgPSBuZXcgTHVpVHJlZSgpO1xyXG4gICAgICAgIHJldHVybiB0LmluaXQocCk7XHJcbiAgICB9LFxyXG4gICAgaW5pdERyb3BEb3duTGlzdDogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICB2YXIgZCA9IG5ldyBMdWlEcm9wRG93bkxpc3QoKTtcclxuICAgICAgICByZXR1cm4gZC5pbml0KHApO1xyXG4gICAgfSxcclxuICAgIGluaXRDaGVja0JveDogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAvL++/ve+/ve+/ve+/vdK777+977+977+977+977+977+977+977+9yKvvv73Wte+/vWNoZWNrYm9477+977+977+977+9XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrQm94KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tCb3ggPSBuZXcgTHVpQ2hlY2tCb3goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGMgPSBuZXcgTHVpQ2hlY2tCb3goKTtcclxuICAgICAgICByZXR1cm4gYy5pbml0KHApO1xyXG5cclxuICAgIH0sXHJcbiAgICBpbml0V29yZFNwZWFrOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIC8v77+977+977+977+90rvvv73vv73vv73vv73vv73vv73vv73vv73Iq++/vda177+9d29yZHNwZWFr77+977+977+977+9XHJcbiAgICAgICAgaWYgKCF0aGlzLndvcmRzcGVhaykge1xyXG4gICAgICAgICAgICB0aGlzLndvcmRzcGVhayA9IG5ldyBMdWlXb3JkU3BlYWsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGMgPSBuZXcgTHVpV29yZFNwZWFrKCk7XHJcbiAgICAgICAgcmV0dXJuIGMuaW5pdChwKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTHVpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvanMvbHVpLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIiwiZnVuY3Rpb24gTHVpRHJvcERvd25MaXN0KCkge1xyXG4gICAgdGhpcy5wYXJhbSA9IG51bGw7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gXCJcIjtcclxufVxyXG52YXIgZHJvcGNvdW50ID0gMTAwMDtcclxuTHVpRHJvcERvd25MaXN0LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWlEcm9wRG93bkxpc3QsXHJcbiAgICBpbml0OiBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gdGhpcy53YXJwaWQgPSBcIiNcIiArIHBhcmFtLndhcnBpZDtcclxuICAgICAgICB2YXIgd2FycGlkID0gcGFyYW0ud2FycGlkO1xyXG4gICAgICAgIGlmICghcGFyYW0uZGF0YSkgeyByZXR1cm47IH1cclxuICAgICAgICB2YXIgZGF0YSA9IHBhcmFtLmRhdGE7XHJcblxyXG4gICAgICAgIHZhciB3aWR0aCA9IHBhcmFtLndpZHRoID0gcGFyYW0ud2lkdGggfHwgMTgwO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBwYXJhbS5oZWlnaHQgPSBwYXJhbS5oZWlnaHQgfHwgMjAwO1xyXG4gICAgICAgIHZhciBzdWJ0ZXh0bGVuZ3RoID0gcGFyYW0uc3VidGV4dGxlbmd0aCA9IHBhcmFtLnN1YnRleHRsZW5ndGggfHwgNTtcclxuICAgICAgICBwYXJhbS52YWx1ZUZpZWxkID0gcGFyYW0udmFsdWVGaWVsZCB8fCBcImlkXCI7XHJcbiAgICAgICAgcGFyYW0udGV4dEZpZWxkID0gcGFyYW0udGV4dEZpZWxkIHx8IFwibmFtZVwiO1xyXG4gICAgICAgIHZhciB2YWx1ZUZpZWxkID0gcGFyYW0udmFsdWVGaWVsZDtcclxuICAgICAgICB2YXIgdGV4dEZpZWxkID0gcGFyYW0udGV4dEZpZWxkO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZENhbGxCYWNrID0gcGFyYW0uc2VsZWN0ZWRDYWxsQmFjaztcclxuICAgICAgICB2YXIgbG9hZGVkQ2FsbEJhY2sgPSBwYXJhbS5sb2FkZWRDYWxsQmFjaztcclxuICAgICAgICB2YXIgemluZGV4ID0gcGFyYW0uemluZGV4O1xyXG4gICAgICAgIGlmIChwYXJhbS5kYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgZCA9IHt9O1xyXG4gICAgICAgICAgICBkW3ZhbHVlRmllbGRdID0gLTE7XHJcbiAgICAgICAgICAgIGRbdGV4dEZpZWxkXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaChkKTtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6K6+572u6buY6K6k5YC8XHJcbiAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IHBhcmFtLmRlZmF1bHRWYWx1ZSA9IHBhcmFtLmRlZmF1bHRWYWx1ZSB8fCBkYXRhWzBdW3ZhbHVlRmllbGRdO1xyXG4gICAgICAgIHZhciBkZWZhdWx0VGV4dCA9IHBhcmFtLmRlZmF1bHRUZXh0ID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IGRhdGFbMF1bdGV4dEZpZWxkXTtcclxuICAgICAgICB0aGlzLnBhcmFtID0gcGFyYW07XHJcbiAgICAgICAgdmFyIHVsSHRtbCA9IFwiPGRpdiBjbGFzcz0nZHJvcGRpdiBkbic+XCI7XHJcbiAgICAgICAgdWxIdG1sICs9ICcgIDx1bCBjbGFzcz1cImRyb3B1bFwiIHN0eWxlPVwibWF4LWhlaWdodDonICsgaGVpZ2h0ICsgJ3B4O292ZXJmbG93OmF1dG87XCIgZGF0YS1pZD1cIicgKyBkZWZhdWx0VmFsdWUgKyAnXCIgZGF0YS1uYW1lPVwiJyArIGRlZmF1bHRUZXh0ICsgJ1wiPic7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZGF0YS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFba107XHJcbiAgICAgICAgICAgIHZhciB2ID0gaXRlbVt0ZXh0RmllbGRdLmxlbmd0aCA+IHN1YnRleHRsZW5ndGggPyBpdGVtW3RleHRGaWVsZF0uc3Vic3RyaW5nKDAsIHN1YnRleHRsZW5ndGgpICsgXCIuLi5cIiA6IGl0ZW1bdGV4dEZpZWxkXTtcclxuICAgICAgICAgICAgdmFyIGl0ZW1IdG1sID0gJzxsaSB0aXRsZT0nICsgaXRlbVt0ZXh0RmllbGRdICsgJyBkYXRhLWluZGV4PScgKyBrICsgJyBkYXRhLWlkPScgKyBpdGVtW3ZhbHVlRmllbGRdICsgJyBkYXRhLXRhZz1cXCcnICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtrXSkgKyAnXFwnPicgKyB2ICsgJzwvbGk+JztcclxuICAgICAgICAgICAgdWxIdG1sICs9IGl0ZW1IdG1sO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1bEh0bWwgKz0gXCI8L3VsPlwiO1xyXG4gICAgICAgIHVsSHRtbCArPSBcIjwvZGl2PlwiO1xyXG4gICAgICAgIHZhciBzcGFuSHRtbCA9ICcgPHNwYW4gc3R5bGU9XCJ3aWR0aDogJyArIHdpZHRoICsgJ3B4O1wiIGNsYXNzPVwiZGliXCI+PHNwYW4gZGF0YS10eXBlPVwiZHJvcGRvd25saXN0X2Ryb3Bfc3BhblwiIGlkPVwic3BhbicgKyBwYXJhbS53YXJwaWQgKyAnXCI+JyArIGRlZmF1bHRUZXh0ICsgJzwvc3Bhbj4gPGkgY2xhc3M9XCJudW1fZG93blwiPjwvaT48L3NwYW4+JztcclxuXHJcbiAgICAgICAgdmFyIGNvbiA9ICQoXCIjXCIgKyB3YXJwaWQpO1xyXG4gICAgICAgIGNvbi5jc3MoeyB3aWR0aDogd2lkdGggfSk7XHJcbiAgICAgICAgY29uLmFkZENsYXNzKFwibHVpX2Ryb3Bkb3dubGlzdFwiKTtcclxuICAgICAgICBjb24uaHRtbChzcGFuSHRtbCk7XHJcbiAgICAgICAgY29uLmFwcGVuZCh1bEh0bWwpO1xyXG4gICAgICAgIGlmICh6aW5kZXgpIHtcclxuICAgICAgICAgICAgY29uLmZpbmQoXCIuZHJvcGRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIHppbmRleCk7XHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwiemluZGV4XCIsIHppbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gY29uLmZpbmQoXCIuZHJvcGRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIGRyb3Bjb3VudC0tKTtcclxuICAgICAgICAgICAgLy8gY29uLmF0dHIoXCJ6aW5kZXhcIiwgZHJvcGNvdW50ICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbi5hZGRDbGFzcyhcImJ0bl9udW1fdXBkb3duXCIpLmFkZENsYXNzKFwiYnRuX251bV91cGRvd24xXCIpLmFkZENsYXNzKFwiZGliXCIpO1xyXG4gICAgICAgIGNvbi5hdHRyKFwidGl0bGVcIiwgZGVmYXVsdFRleHQpO1xyXG4gICAgICAgIGNvbi5hdHRyKFwiZGF0YS1pZFwiLCBkZWZhdWx0VmFsdWUpO1xyXG5cclxuICAgICAgICB2YXIgdWwgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgdWxcIik7XHJcbiAgICAgICAgdmFyIGRyb3BkaXYgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgLmRyb3BkaXZcIik7XHJcbiAgICAgICAgdmFyIGxpID0gJChcIiNcIiArIHdhcnBpZCArIFwiIHVsIGxpXCIpO1xyXG4gICAgICAgIHZhciBzcGFuID0gY29uLmZpbmQoXCJzcGFuW2RhdGEtdHlwZT0nZHJvcGRvd25saXN0X2Ryb3Bfc3BhbiddXCIpO1xyXG4gICAgICAgIC8v5LqL5Lu2XHJcbiAgICAgICAgLy/kuIvmi4nkuovku7ZcclxuICAgICAgICBjb24uY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHVsLmlzKFwiOnZpc2libGVcIikpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVsLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIi5kcm9wZGl2XCIpLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgICAgIC8vIGRyb3BkaXYuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gdWwuc2xpZGVEb3duKDIwMCk7XHJcbiAgICAgICAgICAgICAgICBkcm9wZGl2LnNsaWRlRG93bigyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiYm9keVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIHVsLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgJChcIi5kcm9wZGl2XCIpLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGNvbi5tb3VzZWxlYXZlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy8gICAgIHVsLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvL+mAieS4reS6i+S7tlxyXG4gICAgICAgIGxpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gJCh0aGlzKS5odG1sKCk7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEpzb24gPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWpvc25cIik7XHJcbiAgICAgICAgICAgIHZhciBhbGx0aXRsZSA9ICQodGhpcykuYXR0cihcInRpdGxlXCIpO1xyXG4gICAgICAgICAgICBzcGFuLnRleHQoc2VsZWN0ZWRUZXh0KTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1pZFwiLCBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1qc29uXCIsIHNlbGVjdGVkSnNvbik7XHJcbiAgICAgICAgICAgIHNwYW4uYXR0cihcInRpdGxlXCIsIGFsbHRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwidGl0bGVcIiwgYWxsdGl0bGUpO1xyXG4gICAgICAgICAgICBjb24uYXR0cihcImRhdGEtaWRcIiwgc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8v6YCJ5Lit5Zue6LCD5LqL5Lu2XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhbGxCYWNrKHdhcnBpZCwgc2VsZWN0ZWRWYWx1ZSwgYWxsdGl0bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3BhbiA9IHNwYW47XHJcbiAgICAgICAgLy/orr7nva7pu5jorqTlgLxcclxuICAgICAgICB0aGlzLnNldFZhbHVlKGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBzcGFuLmF0dHIoXCJkYXRhLWlkXCIpLCB0ZXh0OiBzcGFuLmF0dHIoXCJ0aXRsZVwiKSwgemluZGV4OiAkKHRoaXMuc2VsZWN0b3IpLmF0dHIoXCJ6aW5kZXhcIikgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiAtMSwgdGV4dDogXCJcIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy/mmrTpnLLnu5nlpJbpg6jnmoTmlrnms5VcclxuICAgIGdldFNlbGVjdGVkSnNvblZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzcGFuID0gdGhpcy5zcGFuO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzcGFuLmF0dHIoXCJkYXRhLWpzb25cIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHRleHRzZWwgPSBcIlwiO1xyXG4gICAgICAgIC8v6YCJ5Lit55qE5YC8XHJcbiAgICAgICAgdmFyIHNlbEl0ZW07XHJcbiAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCB0aGlzLnBhcmFtLmRhdGEubGVuZ3RoOyBtKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1zZWwgPSB0aGlzLnBhcmFtLmRhdGFbbV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtc2VsW3RoaXMucGFyYW0udmFsdWVGaWVsZF0gPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRleHRzZWwgPSBpdGVtc2VsW3RoaXMucGFyYW0udGV4dEZpZWxkXTtcclxuICAgICAgICAgICAgICAgIHNlbEl0ZW0gPSBpdGVtc2VsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1pZFwiLCB2YWx1ZSk7XHJcbiAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1qc29uXCIsIEpTT04uc3RyaW5naWZ5KHNlbEl0ZW0pKTtcclxuICAgICAgICBzcGFuLmF0dHIoXCJ0aXRsZVwiLCB0ZXh0c2VsKTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmF0dHIoXCJ0aXRsZVwiLCB0ZXh0c2VsKTtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZFRleHQgPSB0ZXh0c2VsO1xyXG4gICAgICAgIHZhciB2ID0gdGV4dHNlbC5sZW5ndGggPiB0aGlzLnBhcmFtLnN1YnRleHRsZW5ndGggPyB0ZXh0c2VsLnN1YnN0cmluZygwLCB0aGlzLnBhcmFtLnN1YnRleHRsZW5ndGgpICsgXCIuLi5cIiA6IHRleHRzZWw7XHJcbiAgICAgICAgc3Bhbi50ZXh0KHYpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5sb2FkZWRDYWxsQmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtLmxvYWRlZENhbGxCYWNrKGNvbnRhaW5lcklkLCBzZWxlY3RlZFZhbHVlLCBzZWxlY3RlZFRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IEx1aURyb3BEb3duTGlzdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvanMvZHJvcGRvd25saXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIiwiXHJcbmZ1bmN0aW9uIEx1aUNoZWNrQm94KCkge1xyXG4gICAgdGhpcy5zZWxlY3RvciA9IFwibHVpY2hlY2tcIjtcclxuICAgIC8v5Y+C5pWwXHJcbiAgICB0aGlzLnBhcmFtID0ge307XHJcbn1cclxuXHJcbkx1aUNoZWNrQm94LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWlDaGVja0JveCxcclxuICAgIC8qXHJcbiAgICAgKndhcnBpZCDlrrnlmahpZFxyXG4gICAgICpkYXRhIOaVsOaNrumbhu+8jGpzb24g5LiyIFt7bmFtZTpyZXgsdmFsOjAwMX0se25hbWU6bGlsZWksdmFsOjAwMn1dXHJcbiAgICAgKuWxleekuuWtl+autSAgIHRleHRGaWVsZFxyXG4gICAgICrlrp7pmYXlgLzlrZfmrrUgdmFsdWVGaWVsZFxyXG4gICAgICrlm57osIPlh73mlbAgY2FsbGJhY2sg5Y+C5pWw5Li65b2T5YmN6Kem5Y+R55qE5aSN6YCJ5qGG5LiK57uR5a6a55qE5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgIHZhciBjdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHBhcmFtICYmIHBhcmFtLmdyb3VwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSAnbHVpY2hlY2tbZGF0YS1uYW1lPVwiJyArIHBhcmFtLmdyb3VwICsgJ1wiXSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrU3R5bGUgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIikgPT0gMSA/IFwiY2hlY2tfc2VsXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVja3Nob3cgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLXNob3djaGVja2JveFwiKSAhPSAxO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRleHQgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLXRleHRcIik7XHJcbiAgICAgICAgICAgIHZhciBoID0gJzxpIGNsYXNzPVwiaWNvbl9jaGVjayAnICsgaXNjaGVja1N0eWxlICsgJyBcIj48L2k+JztcclxuICAgICAgICAgICAgdmFyIHMgPSAnPHNwYW4gY2xhc3M9XCJjaGVja190ZXh0XCIgIG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgPicgKyB0ZXh0ICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBoID0gaXNjaGVja3Nob3cgPyBoICsgcyA6IHM7XHJcbiAgICAgICAgICAgIC8vIGlmICgkKGl0ZW0pLmZpbmQoXCJpY29uX2NoZWNrXCIpLmxlbmd0aCA+IDAgfHwgJChpdGVtKS5maW5kKFwiY2hlY2tfdGV4dFwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoaXRlbSkuaHRtbChoKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jc3MoeyBcImN1cnNvclwiOiBcInBvaW50ZXJcIiB9KTtcclxuICAgICAgICAgICAgJChpdGVtKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgJChpdGVtKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oXCJpXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tfc2VsXCIpLmFkZENsYXNzKFwiY2hlY2tfZGVmXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oXCJpXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tfZGVmXCIpLmFkZENsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gYWxlcnQoXCJiaW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtJiZwYXJhbS5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBncm91cG5hbWUgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLW5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGN0aGlzLmdldEpzb25WYWx1ZShncm91cG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6LCD55So5Zue6LCD5Ye95pWw77yM5bm26L+U5Zue57uE5ZCN5ZKM5omA6YCJ5Lit5YC85b6XanNvbuS4slxyXG4gICAgICAgICAgICAgICAgICAgIC8vcGFyYW0uY2FsbGJhY2soZ3JvdXBuYW1lLCB2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmNhbGxiYWNrKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICAvL+iuvue9rmNoZWNrYm9457uE5ZOq5Lqb5YC86KKr6YCJ5LitXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKG5hbWUsIHZhbCkge1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZmlsdGVyKCdbZGF0YS12YWw9XCInICsgdmFsICsgJ1wiXScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKGl0ZW0pLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5ZjaGVja2JveOe7hOmAieS4reeahOWAvFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHIgPSBbXTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgci5wdXNoKCQoaXRlbSkuYXR0cihcImRhdGEtdmFsXCIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWxlcnQoci5qb2luKCcsJykpO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+WY2hlY2tib3jnu4TpgInkuK3nmoTlgLxcclxuICAgIGdldEpzb25WYWx1ZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBqc29uc3RyID0gJChpdGVtKS5hdHRyKFwiZGF0YS1qc29uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25zdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByLnB1c2goSlNPTi5wYXJzZSh1bmVzY2FwZShqc29uc3RyKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9LFxyXG4gICAgLyoq5Yik5pat5b2T5YmNIGNoZWNrYm94IOaYr+WQpumAieS4rSAqL1xyXG4gICAgaXNjaGVjazogZnVuY3Rpb24gKG5hbWUsIHZhbCkge1xyXG4gICAgICAgIHZhciBpdGVtID0gJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5maWx0ZXIoJ1tkYXRhLXZhbD1cIicgKyB2YWwgKyAnXCJdJylbMF07XHJcbiAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGlzY2hlY2sgPT0gMTtcclxuICAgIH0sXHJcbiAgICAvKirliKTmlq3lvZPliY0gY2hlY2tib3gg5piv5ZCm6YCJ5LitICovXHJcbiAgICBpc2NoZWNrRWxlbWVudDogZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICByZXR1cm4gaXNjaGVjayA9PSAxO1xyXG4gICAgfSxcclxuICAgIC8qKuaooeaLn+WNleWHuyDlj6rmlLnlj5jmoLflvI8gKi9cclxuICAgIHNldENsaWNrU3R5bGU6IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMCk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY2hpbGRyZW4oXCJpXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDEpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNoaWxkcmVuKFwiaVwiKS5hZGRDbGFzcyhcImNoZWNrX3NlbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzPUx1aUNoZWNrQm94O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9jaGVja2JveC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiA0IDcgOCAxMCAxMiAxMyAxOSAyMCAyMSAyNiAyNyAyOCA0MyIsIlxyXG5cclxuZnVuY3Rpb24gcG9wc2hvdyhzZWxlLCBwb3BzaG93KSB7Ly/lvLnlh7rlsYLnmoTmmL7npLpcclxuICAgXHJcbiAgICBzZWxlLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwb3BzaG93LnNob3coKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5zaG93KCk7XHJcbiAgICAgICAgJCgnLnBvcC1tYXNrJykuc2hvdygpO1xyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBwb3BoaWRlKHNlbGUsIHBvcHNob3cpIHsvL+W8ueWHuuWxgueahOa2iOWksVxyXG4gICAgc2VsZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcG9wc2hvdy5oaWRlKCk7XHJcbiAgICAgICAgJCgnLnBvcC1tYXNrJykuaGlkZSgpO1xyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBjaGVja0Jvb3goKSB7Ly/lpI3pgInmoYbnmoTmoLflvI9cclxuICAgICQoJy5jaGVja0JveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknKSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGNob29zZUFsbCgpIHsvL+WFqOmAieWFqOS4jemAiVxyXG4gICAgJCgnLmNoZWNrQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBudW0gPSAkKCcuY2hlY2tCb3gnKS5pbmRleCgkKHRoaXMpKTtcclxuICAgICAgICBpZiAobnVtID09IDApIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknKSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciAkaW1ncyA9ICQubWFrZUFycmF5KCQoJy50YWJsZSB0cjpub3QoOmZpcnN0KScpLmZpbmQoJ2ltZycpKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJGltZ3MuZXZlcnkoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnN0eWxlLnZpc2liaWxpdHkgPT0gJ3Zpc2libGUnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbn1cclxuZnVuY3Rpb24gU2licyhUaGlzKSB7XHJcbiAgICBUaGlzLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhZGlvKCkgey8v5Y2V6YCJ55qE5qC35byPXHJcbiAgICAkKCcucmFkaW8nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnJhZGlvJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q29va2llKG9iak5hbWUsIG9ialZhbHVlLCBvYmpIb3Vycykge1xyXG4gICAgdmFyIHN0ciA9IG9iak5hbWUgKyBcIj1cIiArIGVzY2FwZShvYmpWYWx1ZSk7XHJcblxyXG4gICAgaWYgKG9iakhvdXJzID4gMCkgeyAvL+S4ujDml7bkuI3orr7lrprov4fmnJ/ml7bpl7TvvIzmtY/op4jlmajlhbPpl63ml7Zjb29raWXoh6rliqjmtojlpLFcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdmFyIG1zID0gb2JqSG91cnMgKiAzNjAwICogMTAwMDtcclxuICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBtcyk7XHJcbiAgICAgICAgc3RyICs9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpICsgXCI7cGF0aD0vXCI7XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5jb29raWUgPSBzdHI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvb2tpZShvYmpOYW1lKSB7IC8v6I635Y+W5oyH5a6a5ZCN56ew55qEY29va2ll55qE5YC8XHJcbiAgICB2YXIgYXJyU3RyID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiOyBcIik7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyclN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0ZW1wID0gYXJyU3RyW2ldLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICBpZiAodGVtcFswXSA9PSBvYmpOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmVzY2FwZSh0ZW1wWzFdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5by55Ye65Yqg6L295Zu+54mHXHJcbmZ1bmN0aW9uIFNob3dMb2FkaW5nKG9iaikge1xyXG4gICAgb2JqLmh0bWwoalF1ZXJ5KFwiI2RpdkxvYWRpbmdcIikuaHRtbCgpKTtcclxufVxyXG5mdW5jdGlvbiB0aW1lVGlja0JpZyhzZWNvbmQpIHtcclxuICAgICQoXCIudGltZXMtYmlnXCIpLmh0bWwoc2Vjb25kKTtcclxuICAgIHZhciB0ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIudGltZXMtYmlnXCIpLmh0bWwoLS1zZWNvbmQpO1xyXG4gICAgICAgIGlmIChzZWNvbmQgPD0gMCkge1xyXG4gICAgICAgICAgICAkKFwiLnJvdGF0ZS1wb2ludFwiKS5jc3MoeyBcImFuaW1hdGlvbi1wbGF5LXN0YXRlXCI6IFwicGF1c2VkXCIgfSk7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTAwMCk7XHJcbiAgICAkKFwiLnJvdGF0ZS1wb2ludFwiKS5jc3MoeyBcImFuaW1hdGlvbi1wbGF5LXN0YXRlXCI6IFwicnVubmluZ1wiIH0pO1xyXG59XHJcblxyXG4vL+WKoOi9veWbvueJh+WIsOafkOS4quWFg+e0oOS4rVxyXG5mdW5jdGlvbiBJbnNlcnRMb2FkaW5nKG9iaikge1xyXG4gICAgb2JqLmFwcGVuZChqUXVlcnkoXCIjZGl2TG9hZGluZ1wiKS5odG1sKCkpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHBvcGhpZGU6IHBvcGhpZGUsXHJcbiAgICBwb3BzaG93OiBwb3BzaG93LFxyXG4gICAgY2hlY2tCb294OiBjaGVja0Jvb3gsXHJcbiAgICBTaWJzOiBTaWJzLFxyXG4gICAgcmFkaW86IHJhZGlvLFxyXG4gICAgY2hvb3NlQWxsOiBjaG9vc2VBbGwsXHJcbiAgICBzZXRDb29raWU6IHNldENvb2tpZSwvL+iuvue9rmNvb2tpZVxyXG4gICAgZ2V0Q29va2llOiBnZXRDb29raWUsIC8vIOiOt+WPlmNvb2tpZVxyXG4gICAgU2hvd0xvYWRpbmc6IFNob3dMb2FkaW5nLC8v5Yqg6L295LitXHJcbiAgICBJbnNlcnRMb2FkaW5nOiBJbnNlcnRMb2FkaW5nLFxyXG4gICAgdGltZVRpY2tCaWc6IHRpbWVUaWNrQmlnLy/lgJLorqHml7ZcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvdG9vbC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTIgMTMgMTggMTkgMjAgMjEgMjcgMjggMzYiXSwic291cmNlUm9vdCI6IiJ9