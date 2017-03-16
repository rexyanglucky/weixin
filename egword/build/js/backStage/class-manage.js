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

	var Lui = __webpack_require__(1);
	var lui = new Lui();
	var tool = __webpack_require__(6);

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

	$("#edit-name,#add-name,#edit-num,#add-num").keydown(function () {
	    if (event.keyCode == 8) {
	        $("[data-type='edit-info'],[data-type='add-info']").css({ "visibility": "hidden" });
	    }
	});

	$("#edit-name,#add-name").keyup(function () {
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
	    if (+row_data.TeacherID < 1) {
	        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请选择老师！");
	        return;
	    }
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
	    if (+row_data.TeacherID < 1) {
	        $("[data-type='add-info']").css({ "visibility": "visible" }).text("请选择老师！");
	        return;
	    }
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
	            if (e.Data == null || e.Data.length == 0) {
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
	var LuiWordSpeak=__webpack_require__(4);
	var LuiGuide=__webpack_require__(5);

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
	        //声明一个适用于全局的checkbox对象
	        if (!this.checkBox) {
	            this.checkBox = new LuiCheckBox();
	        }
	        var c = new LuiCheckBox();
	        return c.init(p);

	    },
	    initWordSpeak: function (p) {
	        //声明一个适用于全局的wordspeak对象
	        if (!this.wordspeak) {
	            this.wordspeak = new LuiWordSpeak();
	        }
	        var c = new LuiWordSpeak();
	        return c.init(p);
	    },
	    initGuide:function(p){
	        //声明一个适用于全局的checkbox对象
	        if (!this.guide) {
	            this.guide = new LuiGuide();
	        }
	        var c = new LuiGuide();
	        return c.init();
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
	            $(item).attr("onselectstart", "return false;");
	            var text = $(item).attr("data-text");
	            var h = '<i class="icon_check ' + ischeckStyle + ' "></i>';
	            var s = '<span class="check_text"  onselectstart="return false;" >' + text + '</span>';
	            h = ischeckshow ? h + s : s;
	            // if ($(item).find("icon_check").length > 0 || $(item).find("check_text").length > 0) {
	            //     return;
	            // }

	            $(item).html(h);
	            $(item).css({"cursor": "pointer"});
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
	                if (param && param.callback) {
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
	       this.setClickStyle1(item,ischeck);
	    },
	    setClickStyle1: function (item,ischeck) {
	        if (ischeck == 1) {
	            $(item).attr("data-checked", 0);
	            $(item).children("i").removeClass("check_sel").addClass("check_def");
	        }
	        else {
	            $(item).attr("data-checked", 1);
	            $(item).children("i").addClass("check_sel").removeClass("check_sel");
	        }
	    }
	};
	module.exports = LuiCheckBox;

/***/ },
/* 4 */
/***/ function(module, exports) {

	
	function LuiWordSpeak() {
	    this.selector = "lui_wordspeak";
	    //参数
	    this.param = {};
	}

	LuiWordSpeak.prototype = {
	    constructor: LuiWordSpeak,
	    /*
	     *warpid 容器id
	     *data 数据集，json 串 [{name:rex,val:001},{name:lilei,val:002}]
	     *展示字段   textField
	     *实际值字段 valueField
	     *回调函数 callback 参数为当前触发的复选框上绑定的数据
	     */
	    init: function (param) {
	        var sthis = this;
	        param = param || {};
	        var luidivspeak = '<div class="lui_div_speak" id="lui_div_speak"/>';
	        $("body").append(luidivspeak);
	        $(".lui_wordspeak").each(function (index, item) {
	            // $(item).unbind("mouseover");
	            //$(item).unbind("click");
	            //$(item).bind("click", function () {
	            //    // var soundurl = $(item).attr("data-src");
	            //    sthis.play(item);
	            //});
	            $(item).unbind("mouseover");
	            $(item).bind("mouseover", function () {
	                // var soundurl = $(item).attr("data-src");
	                sthis.play(item);
	            });

	        });
	        if (param.auto) {
	            param.loop = param.loop || 1;
	            if (param.loop > 0) {
	                $(".lui_wordspeak").each(function (index, item) {
	                    sthis.play(item, param.loop,param.interval, param.callback);
	                });
	            }
	        }
	        sthis.param = param;
	        return sthis;
	    },
	    //时间间隔
	    play: function (item, loop, interval, callback) {
	        var sthis = this;
	        loop = loop || 1;
	        interval = interval || 1000;
	        var url = $(item).attr("data-src");
	        var div = document.getElementById('lui_div_speak');
	        div.innerHTML = '<audio id="lui_audio_speak"><source src="' + url + '"></audio>';
	        var audio = $("#lui_audio_speak")[0];
	        audio.onended = null;
	        if (loop > 0) {
	             audio.play();
	            if (callback) {
	                if (loop === 1) {
	                    // audio.onended=callback;
	                    var is_playFinish = setInterval(function () {
	                        if (audio.ended) {
	                            callback();
	                            window.clearInterval(is_playFinish);
	                        }
	                    }, 5);
	                    setTimeout(function () {
	                        window.clearInterval(is_playFinish);
	                    }, 10000);
	                }
	            }
	            loop--;
	        }
	        if (loop > 0) {
	          
	            audio.onended = function () {
	                setTimeout(function () {
	                    sthis.play(item, loop, interval, callback);
	                }, interval);
	            }
	           
	            
	            
	        }
	        else { return; }
	    }

	};
	module.exports=LuiWordSpeak;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function LuiGuide() {

	};
	LuiGuide.prototype.popup=function(dist,getItbutton,has,line,box,dir,content,hasimg,pd,url){//dist那个元素为引导 yes有引导线和框，false没引导线和框  line 线的宽高，box框的宽高  dir向上引导还是向下引导up 向上 down向下,
	                                                            //content 传入的内容  hasimg按钮有没有图片  url  连接框的地址
	                                                            //getItbutton  get-it按钮触发的事件类  pd:外围的padding

	    this.init();
	    var line=line;
	    var box=box;
	    var url=url;
	    var pd=pd
	    if(url){
	        url='/egword/build/img/leade-guide-lineS.png'
	    }else{
	        url='/egword/build/img/guide-line.png'
	    }
	   
	    if(pd){
	        pd=pd
	    }else{pd=10}
	    var hasimg=hasimg;
	   function removeUnit(str,unit) {
	        unit=unit||"px";
	        str=str+"";
	        if(str.indexOf(unit)<0)
	        {
	            return str*1;
	        }
	        else{
	            return (str.substr(0,str.indexOf(unit)))*1;
	        }

	    }
	    if(!has){
	        $(".guide-over-layer").remove();
	        $(".guide-line").remove();
	        $(".guide-msg-pop").remove();
	        $(".guide-pop").remove();
	        $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	    }else{
	        $('<div class="guide-line" style="width:'+line.width+'px;height:'+line.height+'px;background:url('+url+') no-repeat"></div>').insertBefore(document.body.firstChild);
	        $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	        $('<div class="guide-pop"></div>').insertBefore(document.body.firstChild);
	        $('<div class="guide-msg-pop" style="width:'+box.width+'px;height:'+box.height+'px"><span class="anchor"></span><div class="padding"><p>'+content+'</p></div><div class="button-center"><span class="get-it '+getItbutton+'">GET IT!</span></div></div>').insertBefore(document.body.firstChild);
	        if(hasimg){
	            $(".guide-msg-pop").remove();
	            $('<div class="guide-msg-pop" style="width:'+box.width+'px;height:'+box.height+'px;"><span class="anchor"></span><div class="padding"><p>'+content+'</p></div><div class="bottombutton"><span class="get-it '+getItbutton+'">GET IT!</span><img src="'+hasimg+'" alt=""></div></dvi></div>').insertBefore(document.body.firstChild);
	        }
	    }
	    console.log($(getItbutton))
	    $('.' + getItbutton).on('click', function () {
	       $('.guide-pop').hide();
	    })
	    if(dist){
	        var d=$(dist);
	        var pos=d.offset();
	        var t=pos.top-pd-removeUnit(d.css("border-top-width"));
	        var l=pos.left-pd-removeUnit(d.css("border-left-width"));
	        var w=d.width()+removeUnit(d.css("padding-left"))+removeUnit(d.css("padding-right"));
	        var h=d.height()+removeUnit(d.css("padding-top"))+removeUnit(d.css("padding-bottom"));
	        $(".guide-over-layer").css({"top":t+"px","left":l+"px","width":w,"height":h,"padding":pd+'px'});
	        console.log(pd)
	        var hs=$(".guide-over-layer").outerHeight();
	        var ws=$(".guide-over-layer").outerWidth();
	        if(dir=='up'){
	            $(".guide-line").css({"top":t-line.height+"px","left":l+ws/2+"px"});
	            $('.guide-msg-pop').css({"top":t-line.height-box.height/3+"px","left":l+ws/2+line.width+"px"});
	        }else{
	            $(".guide-line").css({"top":t+hs/3+"px","left":l-line.width+"px"});
	            $('.guide-msg-pop').css({"top":t+line.height+hs/3+"px","left":l-box.width/2-line.width+"px"});
	            if(url.indexOf('leade-guide-lineS')>0){
	                console.log(00)
	                $(".guide-line").css({"top":t+hs/2+"px","left":l-line.width/2-10+"px"});
	                $('.guide-msg-pop').css({"top":t+hs/2+box.height/2+"px","left":l+"px"});
	            }
	        }

	    }
	};
	LuiGuide.prototype.init=function(){
	    $(".guide-over-layer").remove();
	    $(".guide-line").remove();
	    $(".guide-pop").remove();
	    $(".guide-msg-pop").remove();
	    /*$('<div class="guide-line"></div>').insertBefore(document.body.firstChild);
	    $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	    $('<div class="guide-msg-pop"><span class="anchor"></span></div>').insertBefore(document.body.firstChild);*/



	    return this;
	};
	module.exports=LuiGuide;


/***/ },
/* 6 */
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
/******/ ]);