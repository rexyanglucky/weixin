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
	var stuId = $("#stuId").val();//学生id  stuEditionId
	var commJs = __webpack_require__(6);//公共方法
	var gradeArr = [{ name: '一年级', id: '1', pid: '' }, { name: '二年级', id: '2', pid: '00' }, { name: '三年级', id: '3', pid: '00' }, { name: '四年级', id: '4', pid: '00_01' }, { name: '五年级', id: '5', pid: '00_01' }, { name: '六年级', id: '6', pid: '00_02' }, { name: '七年级', id: '7', pid: '00_02' }, { name: '八年级', id: '8', pid: '' }, { name: '九年级', id: '9', pid: '00' }, { name: '高一', id: '10', pid: '00' }, { name: '高二', id: '11', pid: '00_01' }, { name: '高三', id: '12', pid: '00_01' }];
	var Lui = __webpack_require__(1);
	var tool = __webpack_require__(4);
	var lui = new Lui();
	//性别按钮
	tool.radio();
	tool.Sibs($('.tabs span'));
	//编辑学生的弹窗
	//tool.popshow($('.teacher-grade'), $('#add-grade'));
	tool.pophide($('.eg-pop .close'), $('.eg-pop'));
	/*年级*/
	lui.initDropDownList({ warpid: "drop_grade", width: 130, nameField: 'name', idField: 'id', data: gradeArr });
	
	
	var module = {
	    init: function () {
	        //todo 逻辑函数
	        this.render();
	        this.initBtns();
	    },
	
	    render: function () {
	        //加载学生修改信息
	        GetStuEditData();
	
	    },
	    initBtns: function () {
	        //todo 绑定事件
	        //教材选择框
	        $("body").delegate('.teacher-grade', "click", function () {
	            $("#add-grade").show();
	            $(".pop-mask").show();
	
	        });
	
	        //男选择
	        $("body").delegate("#lman", "click", function () {
	          
	            $(".radio").removeClass("active");
	            $("#sexMan").addClass("active");
	        });
	
	        //女选择
	        $("body").delegate("#lwman", "click", function () {
	          
	            $(".radio").removeClass("active");
	            $("#sexWMan").addClass("active");
	        });
	
	
	
	        //修改学生的保存操作
	        $("body").delegate("#btnEdit,#spanEditBtn", "click", function () {
	
	            var jsonAdd = {};
	            jsonAdd.UserId = stuId;
	            jsonAdd.UserName = escape($("#txtStuName").val().trim());
	            jsonAdd.Gender = 0;
	            if ($("#sexMan").hasClass("active")) {
	                jsonAdd.Gender = 1;//1为男，0为女
	            }
	            jsonAdd.Grade = $("#drop_grade").attr("data-id");//年级
	            jsonAdd.EditionId = $("#editionId").val();//教材id
	
	            if (jsonAdd.UserName.length < 1) {
	                alert("姓名不能为空");
	                return;
	            }
	           
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/UpdateOrgStuInfo",
	                dataType: "json",
	                data: {
	
	                    data: JSON.stringify(jsonAdd)
	                },
	                success: function (data) {
	                    if (data) {
	                        //alert("修改成功");
	                       // GetStuEditData();//重新加载列表
	                        window.location.href = "/Org/StudentManage/Index";
	                        
	                    } else {
	                        alert("修改失败");
	                        
	                    }
	
	                  
	
	                }
	            });
	
	           
	
	
	        });
	
	
	
	
	
	        //展示完的确定的删除弹窗
	        $("body").delegate("#loginIdBtn", "click", function () {
	            $(".eg-pop .close").click();//关闭弹窗
	        });
	
	
	
	
	    }
	
	
	};
	//页面加载
	$(function(parameters) {
	    module.init();
	});
	
	
	//发送请求调取数据
	function GetStuEditData() {
	    //加载
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetStuDetail",
	        dataType: "json",
	        data: {
	            data: stuId,type:1//传递学生id,当type为1时不需要加载课程信息
	        },
	        success: function (data) {
	
	
	            if (data.Data) {
	                $("#stuName").html(data.Data.StuName);
	                $("#txtStuName").val(data.Data.StuName);
	                $('.radio').removeClass('active');
	                if (data.Data.Gender == 1) {
	                   
	                    $("#sexMan").addClass('active');
	                    
	                } else {
	                    $("#sexWMan").addClass('active');
	                }
	              
	                $("#drop_grade,#spandrop_grade").attr("title", commJs.numGradeTran(data.Data.GradeId));//年级转换
	                $("#spandrop_grade").html(commJs.numGradeTran(data.Data.GradeId));
	                $("#drop_grade,#spandrop_grade").attr("data-id", data.Data.GradeId);
	                //教材   data.Data.TeachVersion
	                $("#editionName").html(data.Data.EditionName);
	                $("#editionId").val(data.Data.EditionId);
	
	
	            }
	            else {
	
	            
	                alert("获取数据失败");
	
	
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


/***/ },
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

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2JhY2tTdGFnZS9lZGl0LXN0dWRlbnQtbWVzZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2x1aS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2Ryb3Bkb3dubGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2NoZWNrYm94LmpzIiwid2VicGFjazovLy8uL3NyYy9MVUkvdG9vbC5qcz81ZTZhKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL3V0aWwuanM/Yjk5MioiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQSwrQkFBOEI7QUFDOUIscUNBQXVDO0FBQ3ZDLGtCQUFpQixnQ0FBZ0MsR0FBRyxrQ0FBa0MsR0FBRyxrQ0FBa0MsR0FBRyxxQ0FBcUMsR0FBRyxxQ0FBcUMsR0FBRyxxQ0FBcUMsR0FBRyxxQ0FBcUMsR0FBRyxnQ0FBZ0MsR0FBRyxrQ0FBa0MsR0FBRyxrQ0FBa0MsR0FBRyxxQ0FBcUMsR0FBRyxxQ0FBcUM7QUFDeGQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBc0IscUZBQXFGOzs7QUFHM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7Ozs7QUFJVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQSw4REFBNkQ7QUFDN0QsdURBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsNENBQTJDO0FBQzNDOztBQUVBLHNCQUFxQjtBQUNyQjs7QUFFQTs7OztBQUlBO0FBQ0EsY0FBYTs7Ozs7QUFLYixVQUFTOzs7Ozs7QUFNVDtBQUNBO0FBQ0EseUNBQXdDO0FBQ3hDLFVBQVM7Ozs7O0FBS1Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtCQUFpQjtBQUNqQjtBQUNBOztBQUVBLHdHQUF1RztBQUN2RztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEtBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQixRQUFRO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUEyRSxjQUFjOztBQUV6Rix3QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQTZEOztBQUU3RDtBQUNBLGtCQUFpQixlQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxxQkFBb0I7QUFDcEI7QUFDQTtBQUNBLHFCQUFvQjtBQUNwQjs7QUFFQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXVCLDRCQUE0QjtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxrQzs7Ozs7OztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLGlCQUFpQixFQUFFLG1CQUFtQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEVBQTJFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQXlCLHNCQUFzQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7O0FBRWIsVUFBUztBQUNUOzs7QUFHQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Qjs7Ozs7Ozs7QUM1SEEsa0NBQWlDOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLGtDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsdUJBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBLG1CQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTs7QUFFQSx3QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLG9DQUFvQztBQUNyRDtBQUNBO0FBQ0E7O0FBRUEsOEJBQTZCO0FBQzdCLDBDQUF5QztBQUN6QyxvQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0MsbUNBQW1DO0FBQ3ZFO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsNkJBQTRCLG9DQUFvQztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNySUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLO0FBQ0wsaUNBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EsTUFBSztBQUNMLGtDQUFpQyxFQUFFLFlBQVk7QUFDL0M7QUFDQSxFIiwiZmlsZSI6ImJhY2tTdGFnZS9lZGl0LXN0dWRlbnQtbWVzZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwiLy/lkI7lj7DkuqTkupJcclxudmFyIHN0dUlkID0gJChcIiNzdHVJZFwiKS52YWwoKTsvL+WtpueUn2lkICBzdHVFZGl0aW9uSWRcclxudmFyIGNvbW1KcyA9IHJlcXVpcmUoXCIuLi9saWIvdXRpbC5qc1wiKTsvL+WFrOWFseaWueazlVxyXG52YXIgZ3JhZGVBcnIgPSBbeyBuYW1lOiAn5LiA5bm057qnJywgaWQ6ICcxJywgcGlkOiAnJyB9LCB7IG5hbWU6ICfkuozlubTnuqcnLCBpZDogJzInLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAn5LiJ5bm057qnJywgaWQ6ICczJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJ+Wbm+W5tOe6pycsIGlkOiAnNCcsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICfkupTlubTnuqcnLCBpZDogJzUnLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAn5YWt5bm057qnJywgaWQ6ICc2JywgcGlkOiAnMDBfMDInIH0sIHsgbmFtZTogJ+S4g+W5tOe6pycsIGlkOiAnNycsIHBpZDogJzAwXzAyJyB9LCB7IG5hbWU6ICflhavlubTnuqcnLCBpZDogJzgnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJ+S5neW5tOe6pycsIGlkOiAnOScsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICfpq5jkuIAnLCBpZDogJzEwJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJ+mrmOS6jCcsIGlkOiAnMTEnLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAn6auY5LiJJywgaWQ6ICcxMicsIHBpZDogJzAwXzAxJyB9XTtcclxudmFyIEx1aSA9IHJlcXVpcmUoJy4uLy4uL0xVSS9qcy9sdWknKTtcclxudmFyIHRvb2wgPSByZXF1aXJlKCcuLi8uLi9MVUkvdG9vbCcpO1xyXG52YXIgbHVpID0gbmV3IEx1aSgpO1xyXG4vL+aAp+WIq+aMiemSrlxyXG50b29sLnJhZGlvKCk7XHJcbnRvb2wuU2licygkKCcudGFicyBzcGFuJykpO1xyXG4vL+e8lui+keWtpueUn+eahOW8ueeql1xyXG4vL3Rvb2wucG9wc2hvdygkKCcudGVhY2hlci1ncmFkZScpLCAkKCcjYWRkLWdyYWRlJykpO1xyXG50b29sLnBvcGhpZGUoJCgnLmVnLXBvcCAuY2xvc2UnKSwgJCgnLmVnLXBvcCcpKTtcclxuLyrlubTnuqcqL1xyXG5sdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2dyYWRlXCIsIHdpZHRoOiAxMzAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBncmFkZUFyciB9KTtcclxuXHJcblxyXG52YXIgbW9kdWxlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vdG9kbyDpgLvovpHlh73mlbBcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJ0bnMoKTtcclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy/liqDovb3lrabnlJ/kv67mlLnkv6Hmga9cclxuICAgICAgICBHZXRTdHVFZGl0RGF0YSgpO1xyXG5cclxuICAgIH0sXHJcbiAgICBpbml0QnRuczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vdG9kbyDnu5Hlrprkuovku7ZcclxuICAgICAgICAvL+aVmeadkOmAieaLqeahhlxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKCcudGVhY2hlci1ncmFkZScsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKFwiI2FkZC1ncmFkZVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wLW1hc2tcIikuc2hvdygpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/nlLfpgInmi6lcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNsbWFuXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICQoXCIucmFkaW9cIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICQoXCIjc2V4TWFuXCIpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+Wls+mAieaLqVxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2x3bWFuXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgICQoXCIucmFkaW9cIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICQoXCIjc2V4V01hblwiKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG5cclxuICAgICAgICAvL+S/ruaUueWtpueUn+eahOS/neWtmOaTjeS9nFxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2J0bkVkaXQsI3NwYW5FZGl0QnRuXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIGpzb25BZGQgPSB7fTtcclxuICAgICAgICAgICAganNvbkFkZC5Vc2VySWQgPSBzdHVJZDtcclxuICAgICAgICAgICAganNvbkFkZC5Vc2VyTmFtZSA9IGVzY2FwZSgkKFwiI3R4dFN0dU5hbWVcIikudmFsKCkudHJpbSgpKTtcclxuICAgICAgICAgICAganNvbkFkZC5HZW5kZXIgPSAwO1xyXG4gICAgICAgICAgICBpZiAoJChcIiNzZXhNYW5cIikuaGFzQ2xhc3MoXCJhY3RpdmVcIikpIHtcclxuICAgICAgICAgICAgICAgIGpzb25BZGQuR2VuZGVyID0gMTsvLzHkuLrnlLfvvIww5Li65aWzXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAganNvbkFkZC5HcmFkZSA9ICQoXCIjZHJvcF9ncmFkZVwiKS5hdHRyKFwiZGF0YS1pZFwiKTsvL+W5tOe6p1xyXG4gICAgICAgICAgICBqc29uQWRkLkVkaXRpb25JZCA9ICQoXCIjZWRpdGlvbklkXCIpLnZhbCgpOy8v5pWZ5p2QaWRcclxuXHJcbiAgICAgICAgICAgIGlmIChqc29uQWRkLlVzZXJOYW1lLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi5aeT5ZCN5LiN6IO95Li656m6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8v5o+Q5Lqk6KGo5Y2VXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICAgICAgICAgIHVybDogXCIvT3JnL1N0dWRlbnRNYW5hZ2UvVXBkYXRlT3JnU3R1SW5mb1wiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShqc29uQWRkKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcIuS/ruaUueaIkOWKn1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAvLyBHZXRTdHVFZGl0RGF0YSgpOy8v6YeN5paw5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIvT3JnL1N0dWRlbnRNYW5hZ2UvSW5kZXhcIjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLkv67mlLnlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgIFxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAvL+WxleekuuWujOeahOehruWumueahOWIoOmZpOW8ueeql1xyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2xvZ2luSWRCdG5cIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoXCIuZWctcG9wIC5jbG9zZVwiKS5jbGljaygpOy8v5YWz6Zet5by556qXXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn07XHJcbi8v6aG16Z2i5Yqg6L29XHJcbiQoZnVuY3Rpb24ocGFyYW1ldGVycykge1xyXG4gICAgbW9kdWxlLmluaXQoKTtcclxufSk7XHJcblxyXG5cclxuLy/lj5HpgIHor7fmsYLosIPlj5bmlbDmja5cclxuZnVuY3Rpb24gR2V0U3R1RWRpdERhdGEoKSB7XHJcbiAgICAvL+WKoOi9vVxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICB1cmw6IFwiL09yZy9TdHVkZW50TWFuYWdlL0dldFN0dURldGFpbFwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGRhdGE6IHN0dUlkLHR5cGU6MS8v5Lyg6YCS5a2m55SfaWQs5b2TdHlwZeS4ujHml7bkuI3pnIDopoHliqDovb3or77nqIvkv6Hmga9cclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJChcIiNzdHVOYW1lXCIpLmh0bWwoZGF0YS5EYXRhLlN0dU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0eHRTdHVOYW1lXCIpLnZhbChkYXRhLkRhdGEuU3R1TmFtZSk7XHJcbiAgICAgICAgICAgICAgICAkKCcucmFkaW8nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5EYXRhLkdlbmRlciA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3NleE1hblwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc2V4V01hblwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAkKFwiI2Ryb3BfZ3JhZGUsI3NwYW5kcm9wX2dyYWRlXCIpLmF0dHIoXCJ0aXRsZVwiLCBjb21tSnMubnVtR3JhZGVUcmFuKGRhdGEuRGF0YS5HcmFkZUlkKSk7Ly/lubTnuqfovazmjaJcclxuICAgICAgICAgICAgICAgICQoXCIjc3BhbmRyb3BfZ3JhZGVcIikuaHRtbChjb21tSnMubnVtR3JhZGVUcmFuKGRhdGEuRGF0YS5HcmFkZUlkKSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2Ryb3BfZ3JhZGUsI3NwYW5kcm9wX2dyYWRlXCIpLmF0dHIoXCJkYXRhLWlkXCIsIGRhdGEuRGF0YS5HcmFkZUlkKTtcclxuICAgICAgICAgICAgICAgIC8v5pWZ5p2QICAgZGF0YS5EYXRhLlRlYWNoVmVyc2lvblxyXG4gICAgICAgICAgICAgICAgJChcIiNlZGl0aW9uTmFtZVwiKS5odG1sKGRhdGEuRGF0YS5FZGl0aW9uTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2VkaXRpb25JZFwiKS52YWwoZGF0YS5EYXRhLkVkaXRpb25JZCk7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLojrflj5bmlbDmja7lpLHotKVcIik7XHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvYmFja1N0YWdlL2VkaXQtc3R1ZGVudC1tZXNnLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTMiLCJ2YXIgTHVpRHJvcERvd25MaXN0ID0gcmVxdWlyZSgnLi4vanMvZHJvcGRvd25saXN0Jyk7XHJcbnZhciBMdWlDaGVja0JveCA9IHJlcXVpcmUoJy4uL2pzL2NoZWNrYm94Jyk7XHJcblxyXG5mdW5jdGlvbiBMdWkoKSB7XHJcbiAgICAvL3RoaXMuY2hlY2tCb3ggPSBudWxsO1xyXG4gICAgLy8gdGhpcy5pbml0V29yZFNwZWFrKCk7XHJcbn07XHJcblxyXG5MdWkucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aSxcclxuICAgIGluaXRUcmVlOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHZhciB0ID0gbmV3IEx1aVRyZWUoKTtcclxuICAgICAgICByZXR1cm4gdC5pbml0KHApO1xyXG4gICAgfSxcclxuICAgIGluaXREcm9wRG93bkxpc3Q6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgdmFyIGQgPSBuZXcgTHVpRHJvcERvd25MaXN0KCk7XHJcbiAgICAgICAgcmV0dXJuIGQuaW5pdChwKTtcclxuICAgIH0sXHJcbiAgICBpbml0Q2hlY2tCb3g6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgLy/vv73vv73vv73vv73Su++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vcir77+91rXvv71jaGVja2JveO+/ve+/ve+/ve+/vVxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja0JveCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQm94ID0gbmV3IEx1aUNoZWNrQm94KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjID0gbmV3IEx1aUNoZWNrQm94KCk7XHJcbiAgICAgICAgcmV0dXJuIGMuaW5pdChwKTtcclxuXHJcbiAgICB9LFxyXG4gICAgaW5pdFdvcmRTcGVhazogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAvL++/ve+/ve+/ve+/vdK777+977+977+977+977+977+977+977+9yKvvv73Wte+/vXdvcmRzcGVha++/ve+/ve+/ve+/vVxyXG4gICAgICAgIGlmICghdGhpcy53b3Jkc3BlYWspIHtcclxuICAgICAgICAgICAgdGhpcy53b3Jkc3BlYWsgPSBuZXcgTHVpV29yZFNwZWFrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjID0gbmV3IEx1aVdvcmRTcGVhaygpO1xyXG4gICAgICAgIHJldHVybiBjLmluaXQocCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEx1aTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2x1aS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiA0IDcgOCAxMCAxMiAxMyAxOSAyMCAyMSAyNiAyNyAyOCA0MyIsImZ1bmN0aW9uIEx1aURyb3BEb3duTGlzdCgpIHtcclxuICAgIHRoaXMucGFyYW0gPSBudWxsO1xyXG4gICAgdGhpcy5zZWxlY3RvciA9IFwiXCI7XHJcbn1cclxudmFyIGRyb3Bjb3VudCA9IDEwMDA7XHJcbkx1aURyb3BEb3duTGlzdC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogTHVpRHJvcERvd25MaXN0LFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHRoaXMud2FycGlkID0gXCIjXCIgKyBwYXJhbS53YXJwaWQ7XHJcbiAgICAgICAgdmFyIHdhcnBpZCA9IHBhcmFtLndhcnBpZDtcclxuICAgICAgICBpZiAoIXBhcmFtLmRhdGEpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdmFyIGRhdGEgPSBwYXJhbS5kYXRhO1xyXG5cclxuICAgICAgICB2YXIgd2lkdGggPSBwYXJhbS53aWR0aCA9IHBhcmFtLndpZHRoIHx8IDE4MDtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gcGFyYW0uaGVpZ2h0ID0gcGFyYW0uaGVpZ2h0IHx8IDIwMDtcclxuICAgICAgICB2YXIgc3VidGV4dGxlbmd0aCA9IHBhcmFtLnN1YnRleHRsZW5ndGggPSBwYXJhbS5zdWJ0ZXh0bGVuZ3RoIHx8IDU7XHJcbiAgICAgICAgcGFyYW0udmFsdWVGaWVsZCA9IHBhcmFtLnZhbHVlRmllbGQgfHwgXCJpZFwiO1xyXG4gICAgICAgIHBhcmFtLnRleHRGaWVsZCA9IHBhcmFtLnRleHRGaWVsZCB8fCBcIm5hbWVcIjtcclxuICAgICAgICB2YXIgdmFsdWVGaWVsZCA9IHBhcmFtLnZhbHVlRmllbGQ7XHJcbiAgICAgICAgdmFyIHRleHRGaWVsZCA9IHBhcmFtLnRleHRGaWVsZDtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRDYWxsQmFjayA9IHBhcmFtLnNlbGVjdGVkQ2FsbEJhY2s7XHJcbiAgICAgICAgdmFyIGxvYWRlZENhbGxCYWNrID0gcGFyYW0ubG9hZGVkQ2FsbEJhY2s7XHJcbiAgICAgICAgdmFyIHppbmRleCA9IHBhcmFtLnppbmRleDtcclxuICAgICAgICBpZiAocGFyYW0uZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdmFyIGQgPSB7fTtcclxuICAgICAgICAgICAgZFt2YWx1ZUZpZWxkXSA9IC0xO1xyXG4gICAgICAgICAgICBkW3RleHRGaWVsZF0gPSBcIlwiO1xyXG4gICAgICAgICAgICBkYXRhLnB1c2goZCk7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iuvue9rum7mOiupOWAvFxyXG4gICAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSBwYXJhbS5kZWZhdWx0VmFsdWUgPSBwYXJhbS5kZWZhdWx0VmFsdWUgfHwgZGF0YVswXVt2YWx1ZUZpZWxkXTtcclxuICAgICAgICB2YXIgZGVmYXVsdFRleHQgPSBwYXJhbS5kZWZhdWx0VGV4dCA9IHBhcmFtLmRlZmF1bHRWYWx1ZSB8fCBkYXRhWzBdW3RleHRGaWVsZF07XHJcbiAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xyXG4gICAgICAgIHZhciB1bEh0bWwgPSBcIjxkaXYgY2xhc3M9J2Ryb3BkaXYgZG4nPlwiO1xyXG4gICAgICAgIHVsSHRtbCArPSAnICA8dWwgY2xhc3M9XCJkcm9wdWxcIiBzdHlsZT1cIm1heC1oZWlnaHQ6JyArIGhlaWdodCArICdweDtvdmVyZmxvdzphdXRvO1wiIGRhdGEtaWQ9XCInICsgZGVmYXVsdFZhbHVlICsgJ1wiIGRhdGEtbmFtZT1cIicgKyBkZWZhdWx0VGV4dCArICdcIj4nO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGEubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhW2tdO1xyXG4gICAgICAgICAgICB2YXIgdiA9IGl0ZW1bdGV4dEZpZWxkXS5sZW5ndGggPiBzdWJ0ZXh0bGVuZ3RoID8gaXRlbVt0ZXh0RmllbGRdLnN1YnN0cmluZygwLCBzdWJ0ZXh0bGVuZ3RoKSArIFwiLi4uXCIgOiBpdGVtW3RleHRGaWVsZF07XHJcbiAgICAgICAgICAgIHZhciBpdGVtSHRtbCA9ICc8bGkgdGl0bGU9JyArIGl0ZW1bdGV4dEZpZWxkXSArICcgZGF0YS1pbmRleD0nICsgayArICcgZGF0YS1pZD0nICsgaXRlbVt2YWx1ZUZpZWxkXSArICcgZGF0YS10YWc9XFwnJyArIEpTT04uc3RyaW5naWZ5KGRhdGFba10pICsgJ1xcJz4nICsgdiArICc8L2xpPic7XHJcbiAgICAgICAgICAgIHVsSHRtbCArPSBpdGVtSHRtbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWxIdG1sICs9IFwiPC91bD5cIjtcclxuICAgICAgICB1bEh0bWwgKz0gXCI8L2Rpdj5cIjtcclxuICAgICAgICB2YXIgc3Bhbkh0bWwgPSAnIDxzcGFuIHN0eWxlPVwid2lkdGg6ICcgKyB3aWR0aCArICdweDtcIiBjbGFzcz1cImRpYlwiPjxzcGFuIGRhdGEtdHlwZT1cImRyb3Bkb3dubGlzdF9kcm9wX3NwYW5cIiBpZD1cInNwYW4nICsgcGFyYW0ud2FycGlkICsgJ1wiPicgKyBkZWZhdWx0VGV4dCArICc8L3NwYW4+IDxpIGNsYXNzPVwibnVtX2Rvd25cIj48L2k+PC9zcGFuPic7XHJcblxyXG4gICAgICAgIHZhciBjb24gPSAkKFwiI1wiICsgd2FycGlkKTtcclxuICAgICAgICBjb24uY3NzKHsgd2lkdGg6IHdpZHRoIH0pO1xyXG4gICAgICAgIGNvbi5hZGRDbGFzcyhcImx1aV9kcm9wZG93bmxpc3RcIik7XHJcbiAgICAgICAgY29uLmh0bWwoc3Bhbkh0bWwpO1xyXG4gICAgICAgIGNvbi5hcHBlbmQodWxIdG1sKTtcclxuICAgICAgICBpZiAoemluZGV4KSB7XHJcbiAgICAgICAgICAgIGNvbi5maW5kKFwiLmRyb3BkaXZcIikuY3NzKFwiei1pbmRleFwiLCB6aW5kZXgpO1xyXG4gICAgICAgICAgICBjb24uYXR0cihcInppbmRleFwiLCB6aW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbi5maW5kKFwiLmRyb3BkaXZcIikuY3NzKFwiei1pbmRleFwiLCBkcm9wY291bnQtLSk7XHJcbiAgICAgICAgICAgIC8vIGNvbi5hdHRyKFwiemluZGV4XCIsIGRyb3Bjb3VudCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb24uYWRkQ2xhc3MoXCJidG5fbnVtX3VwZG93blwiKS5hZGRDbGFzcyhcImJ0bl9udW1fdXBkb3duMVwiKS5hZGRDbGFzcyhcImRpYlwiKTtcclxuICAgICAgICBjb24uYXR0cihcInRpdGxlXCIsIGRlZmF1bHRUZXh0KTtcclxuICAgICAgICBjb24uYXR0cihcImRhdGEtaWRcIiwgZGVmYXVsdFZhbHVlKTtcclxuXHJcbiAgICAgICAgdmFyIHVsID0gJChcIiNcIiArIHdhcnBpZCArIFwiIHVsXCIpO1xyXG4gICAgICAgIHZhciBkcm9wZGl2ID0gJChcIiNcIiArIHdhcnBpZCArIFwiIC5kcm9wZGl2XCIpO1xyXG4gICAgICAgIHZhciBsaSA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiB1bCBsaVwiKTtcclxuICAgICAgICB2YXIgc3BhbiA9IGNvbi5maW5kKFwic3BhbltkYXRhLXR5cGU9J2Ryb3Bkb3dubGlzdF9kcm9wX3NwYW4nXVwiKTtcclxuICAgICAgICAvL+S6i+S7tlxyXG4gICAgICAgIC8v5LiL5ouJ5LqL5Lu2XHJcbiAgICAgICAgY29uLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh1bC5pcyhcIjp2aXNpYmxlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1bC5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgICAgICBkcm9wZGl2LnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIuZHJvcGRpdlwiKS5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBkcm9wZGl2LnNob3coKTtcclxuICAgICAgICAgICAgICAgIC8vIHVsLnNsaWRlRG93bigyMDApO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRpdi5zbGlkZURvd24oMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcImJvZHlcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyB1bC5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgICQoXCIuZHJvcGRpdlwiKS5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjb24ubW91c2VsZWF2ZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vICAgICB1bC5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy/pgInkuK3kuovku7ZcclxuICAgICAgICBsaS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9ICQodGhpcykuaHRtbCgpO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRKc29uID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1qb3NuXCIpO1xyXG4gICAgICAgICAgICB2YXIgYWxsdGl0bGUgPSAkKHRoaXMpLmF0dHIoXCJ0aXRsZVwiKTtcclxuICAgICAgICAgICAgc3Bhbi50ZXh0KHNlbGVjdGVkVGV4dCk7XHJcbiAgICAgICAgICAgIHNwYW4uYXR0cihcImRhdGEtaWRcIiwgc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgIHNwYW4uYXR0cihcImRhdGEtanNvblwiLCBzZWxlY3RlZEpzb24pO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJ0aXRsZVwiLCBhbGx0aXRsZSk7XHJcblxyXG4gICAgICAgICAgICBjb24uYXR0cihcInRpdGxlXCIsIGFsbHRpdGxlKTtcclxuICAgICAgICAgICAgY29uLmF0dHIoXCJkYXRhLWlkXCIsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAvL+mAieS4reWbnuiwg+S6i+S7tlxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRDYWxsQmFjaykge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYWxsQmFjayh3YXJwaWQsIHNlbGVjdGVkVmFsdWUsIGFsbHRpdGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkcm9wZGl2LnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwYW4gPSBzcGFuO1xyXG4gICAgICAgIC8v6K6+572u6buY6K6k5YC8XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZShkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzcGFuID0gdGhpcy5zcGFuO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogc3Bhbi5hdHRyKFwiZGF0YS1pZFwiKSwgdGV4dDogc3Bhbi5hdHRyKFwidGl0bGVcIiksIHppbmRleDogJCh0aGlzLnNlbGVjdG9yKS5hdHRyKFwiemluZGV4XCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogLTEsIHRleHQ6IFwiXCIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8v5pq06Zyy57uZ5aSW6YOo55qE5pa55rOVXHJcbiAgICBnZXRTZWxlY3RlZEpzb25WYWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3Bhbi5hdHRyKFwiZGF0YS1qc29uXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHZhciB0ZXh0c2VsID0gXCJcIjtcclxuICAgICAgICAvL+mAieS4reeahOWAvFxyXG4gICAgICAgIHZhciBzZWxJdGVtO1xyXG4gICAgICAgIHZhciBzcGFuID0gdGhpcy5zcGFuO1xyXG4gICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgdGhpcy5wYXJhbS5kYXRhLmxlbmd0aDsgbSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtc2VsID0gdGhpcy5wYXJhbS5kYXRhW21dO1xyXG4gICAgICAgICAgICBpZiAoaXRlbXNlbFt0aGlzLnBhcmFtLnZhbHVlRmllbGRdID09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0c2VsID0gaXRlbXNlbFt0aGlzLnBhcmFtLnRleHRGaWVsZF07XHJcbiAgICAgICAgICAgICAgICBzZWxJdGVtID0gaXRlbXNlbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNwYW4uYXR0cihcImRhdGEtaWRcIiwgdmFsdWUpO1xyXG4gICAgICAgIHNwYW4uYXR0cihcImRhdGEtanNvblwiLCBKU09OLnN0cmluZ2lmeShzZWxJdGVtKSk7XHJcbiAgICAgICAgc3Bhbi5hdHRyKFwidGl0bGVcIiwgdGV4dHNlbCk7XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5hdHRyKFwidGl0bGVcIiwgdGV4dHNlbCk7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gdGV4dHNlbDtcclxuICAgICAgICB2YXIgdiA9IHRleHRzZWwubGVuZ3RoID4gdGhpcy5wYXJhbS5zdWJ0ZXh0bGVuZ3RoID8gdGV4dHNlbC5zdWJzdHJpbmcoMCwgdGhpcy5wYXJhbS5zdWJ0ZXh0bGVuZ3RoKSArIFwiLi4uXCIgOiB0ZXh0c2VsO1xyXG4gICAgICAgIHNwYW4udGV4dCh2KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0ubG9hZGVkQ2FsbEJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJhbS5sb2FkZWRDYWxsQmFjayhjb250YWluZXJJZCwgc2VsZWN0ZWRWYWx1ZSwgc2VsZWN0ZWRUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBMdWlEcm9wRG93bkxpc3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2Ryb3Bkb3dubGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiA0IDcgOCAxMCAxMiAxMyAxOSAyMCAyMSAyNiAyNyAyOCA0MyIsIlxyXG5mdW5jdGlvbiBMdWlDaGVja0JveCgpIHtcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBcImx1aWNoZWNrXCI7XHJcbiAgICAvL+WPguaVsFxyXG4gICAgdGhpcy5wYXJhbSA9IHt9O1xyXG59XHJcblxyXG5MdWlDaGVja0JveC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogTHVpQ2hlY2tCb3gsXHJcbiAgICAvKlxyXG4gICAgICp3YXJwaWQg5a655ZmoaWRcclxuICAgICAqZGF0YSDmlbDmja7pm4bvvIxqc29uIOS4siBbe25hbWU6cmV4LHZhbDowMDF9LHtuYW1lOmxpbGVpLHZhbDowMDJ9XVxyXG4gICAgICrlsZXnpLrlrZfmrrUgICB0ZXh0RmllbGRcclxuICAgICAq5a6e6ZmF5YC85a2X5q61IHZhbHVlRmllbGRcclxuICAgICAq5Zue6LCD5Ye95pWwIGNhbGxiYWNrIOWPguaVsOS4uuW9k+WJjeinpuWPkeeahOWkjemAieahhuS4iue7keWumueahOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICB2YXIgY3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChwYXJhbSAmJiBwYXJhbS5ncm91cCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yID0gJ2x1aWNoZWNrW2RhdGEtbmFtZT1cIicgKyBwYXJhbS5ncm91cCArICdcIl0nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmFtID0gcGFyYW07XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVja1N0eWxlID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpID09IDEgPyBcImNoZWNrX3NlbFwiIDogXCJcIjtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2tzaG93ID0gJChpdGVtKS5hdHRyKFwiZGF0YS1zaG93Y2hlY2tib3hcIikgIT0gMTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJChpdGVtKS5hdHRyKFwiZGF0YS10ZXh0XCIpO1xyXG4gICAgICAgICAgICB2YXIgaCA9ICc8aSBjbGFzcz1cImljb25fY2hlY2sgJyArIGlzY2hlY2tTdHlsZSArICcgXCI+PC9pPic7XHJcbiAgICAgICAgICAgIHZhciBzID0gJzxzcGFuIGNsYXNzPVwiY2hlY2tfdGV4dFwiICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiID4nICsgdGV4dCArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgaCA9IGlzY2hlY2tzaG93ID8gaCArIHMgOiBzO1xyXG4gICAgICAgICAgICAvLyBpZiAoJChpdGVtKS5maW5kKFwiaWNvbl9jaGVja1wiKS5sZW5ndGggPiAwIHx8ICQoaXRlbSkuZmluZChcImNoZWNrX3RleHRcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKGl0ZW0pLmh0bWwoaCk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY3NzKHsgXCJjdXJzb3JcIjogXCJwb2ludGVyXCIgfSk7XHJcbiAgICAgICAgICAgICQoaXRlbSkudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKFwiaVwiKS5yZW1vdmVDbGFzcyhcImNoZWNrX3NlbFwiKS5hZGRDbGFzcyhcImNoZWNrX2RlZlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKFwiaVwiKS5yZW1vdmVDbGFzcyhcImNoZWNrX2RlZlwiKS5hZGRDbGFzcyhcImNoZWNrX3NlbFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGFsZXJ0KFwiYmluZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbSYmcGFyYW0uY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBuYW1lID0gJChpdGVtKS5hdHRyKFwiZGF0YS1uYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBjdGhpcy5nZXRKc29uVmFsdWUoZ3JvdXBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOWbnuiwg+WHveaVsO+8jOW5tui/lOWbnue7hOWQjeWSjOaJgOmAieS4reWAvOW+l2pzb27kuLJcclxuICAgICAgICAgICAgICAgICAgICAvL3BhcmFtLmNhbGxiYWNrKGdyb3VwbmFtZSwgdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5jYWxsYmFjayhpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgLy/orr7nva5jaGVja2JveOe7hOWTquS6m+WAvOiiq+mAieS4rVxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uIChuYW1lLCB2YWwpIHtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmZpbHRlcignW2RhdGEtdmFsPVwiJyArIHZhbCArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChpdGVtKS5jbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+WY2hlY2tib3jnu4TpgInkuK3nmoTlgLxcclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHIucHVzaCgkKGl0ZW0pLmF0dHIoXCJkYXRhLXZhbFwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFsZXJ0KHIuam9pbignLCcpKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlmNoZWNrYm9457uE6YCJ5Lit55qE5YC8XHJcbiAgICBnZXRKc29uVmFsdWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHIgPSBbXTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIganNvbnN0ciA9ICQoaXRlbSkuYXR0cihcImRhdGEtanNvblwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uc3RyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKEpTT04ucGFyc2UodW5lc2NhcGUoanNvbnN0cikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByO1xyXG4gICAgfSxcclxuICAgIC8qKuWIpOaWreW9k+WJjSBjaGVja2JveCDmmK/lkKbpgInkuK0gKi9cclxuICAgIGlzY2hlY2s6IGZ1bmN0aW9uIChuYW1lLCB2YWwpIHtcclxuICAgICAgICB2YXIgaXRlbSA9ICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZmlsdGVyKCdbZGF0YS12YWw9XCInICsgdmFsICsgJ1wiXScpWzBdO1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIHJldHVybiBpc2NoZWNrID09IDE7XHJcbiAgICB9LFxyXG4gICAgLyoq5Yik5pat5b2T5YmNIGNoZWNrYm94IOaYr+WQpumAieS4rSAqL1xyXG4gICAgaXNjaGVja0VsZW1lbnQ6IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGlzY2hlY2sgPT0gMTtcclxuICAgIH0sXHJcbiAgICAvKirmqKHmi5/ljZXlh7sg5Y+q5pS55Y+Y5qC35byPICovXHJcbiAgICBzZXRDbGlja1N0eWxlOiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDApO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNoaWxkcmVuKFwiaVwiKS5yZW1vdmVDbGFzcyhcImNoZWNrX3NlbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAxKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jaGlsZHJlbihcImlcIikuYWRkQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cz1MdWlDaGVja0JveDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvanMvY2hlY2tib3guanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJcclxuXHJcbmZ1bmN0aW9uIHBvcHNob3coc2VsZSwgcG9wc2hvdykgey8v5by55Ye65bGC55qE5pi+56S6XHJcbiAgIFxyXG4gICAgc2VsZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcG9wc2hvdy5zaG93KCk7XHJcbiAgICAgICAgJCgnLnBvcC1tYXNrJykuc2hvdygpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gcG9waGlkZShzZWxlLCBwb3BzaG93KSB7Ly/lvLnlh7rlsYLnmoTmtojlpLFcclxuICAgIHNlbGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBvcHNob3cuaGlkZSgpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLmhpZGUoKTtcclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gY2hlY2tCb294KCkgey8v5aSN6YCJ5qGG55qE5qC35byPXHJcbiAgICAkKCcuY2hlY2tCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBjaG9vc2VBbGwoKSB7Ly/lhajpgInlhajkuI3pgIlcclxuICAgICQoJy5jaGVja0JveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbnVtID0gJCgnLmNoZWNrQm94JykuaW5kZXgoJCh0aGlzKSk7XHJcbiAgICAgICAgaWYgKG51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgJGltZ3MgPSAkLm1ha2VBcnJheSgkKCcudGFibGUgdHI6bm90KDpmaXJzdCknKS5maW5kKCdpbWcnKSk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRpbWdzLmV2ZXJ5KGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5zdHlsZS52aXNpYmlsaXR5ID09ICd2aXNpYmxlJztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG59XHJcbmZ1bmN0aW9uIFNpYnMoVGhpcykge1xyXG4gICAgVGhpcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByYWRpbygpIHsvL+WNlemAieeahOagt+W8j1xyXG4gICAgJCgnLnJhZGlvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5yYWRpbycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENvb2tpZShvYmpOYW1lLCBvYmpWYWx1ZSwgb2JqSG91cnMpIHtcclxuICAgIHZhciBzdHIgPSBvYmpOYW1lICsgXCI9XCIgKyBlc2NhcGUob2JqVmFsdWUpO1xyXG5cclxuICAgIGlmIChvYmpIb3VycyA+IDApIHsgLy/kuLow5pe25LiN6K6+5a6a6L+H5pyf5pe26Ze077yM5rWP6KeI5Zmo5YWz6Zet5pe2Y29va2ll6Ieq5Yqo5raI5aSxXHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHZhciBtcyA9IG9iakhvdXJzICogMzYwMCAqIDEwMDA7XHJcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgbXMpO1xyXG4gICAgICAgIHN0ciArPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKSArIFwiO3BhdGg9L1wiO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQuY29va2llID0gc3RyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb29raWUob2JqTmFtZSkgeyAvL+iOt+WPluaMh+WumuWQjeensOeahGNvb2tpZeeahOWAvFxyXG4gICAgdmFyIGFyclN0ciA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjsgXCIpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJTdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGFyclN0cltpXS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgaWYgKHRlbXBbMF0gPT0gb2JqTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5lc2NhcGUodGVtcFsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL+W8ueWHuuWKoOi9veWbvueJh1xyXG5mdW5jdGlvbiBTaG93TG9hZGluZyhvYmopIHtcclxuICAgIG9iai5odG1sKGpRdWVyeShcIiNkaXZMb2FkaW5nXCIpLmh0bWwoKSk7XHJcbn1cclxuZnVuY3Rpb24gdGltZVRpY2tCaWcoc2Vjb25kKSB7XHJcbiAgICAkKFwiLnRpbWVzLWJpZ1wiKS5odG1sKHNlY29uZCk7XHJcbiAgICB2YXIgdCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLnRpbWVzLWJpZ1wiKS5odG1sKC0tc2Vjb25kKTtcclxuICAgICAgICBpZiAoc2Vjb25kIDw9IDApIHtcclxuICAgICAgICAgICAgJChcIi5yb3RhdGUtcG9pbnRcIikuY3NzKHsgXCJhbmltYXRpb24tcGxheS1zdGF0ZVwiOiBcInBhdXNlZFwiIH0pO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDEwMDApO1xyXG4gICAgJChcIi5yb3RhdGUtcG9pbnRcIikuY3NzKHsgXCJhbmltYXRpb24tcGxheS1zdGF0ZVwiOiBcInJ1bm5pbmdcIiB9KTtcclxufVxyXG5cclxuLy/liqDovb3lm77niYfliLDmn5DkuKrlhYPntKDkuK1cclxuZnVuY3Rpb24gSW5zZXJ0TG9hZGluZyhvYmopIHtcclxuICAgIG9iai5hcHBlbmQoalF1ZXJ5KFwiI2RpdkxvYWRpbmdcIikuaHRtbCgpKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwb3BoaWRlOiBwb3BoaWRlLFxyXG4gICAgcG9wc2hvdzogcG9wc2hvdyxcclxuICAgIGNoZWNrQm9veDogY2hlY2tCb294LFxyXG4gICAgU2liczogU2licyxcclxuICAgIHJhZGlvOiByYWRpbyxcclxuICAgIGNob29zZUFsbDogY2hvb3NlQWxsLFxyXG4gICAgc2V0Q29va2llOiBzZXRDb29raWUsLy/orr7nva5jb29raWVcclxuICAgIGdldENvb2tpZTogZ2V0Q29va2llLCAvLyDojrflj5Zjb29raWVcclxuICAgIFNob3dMb2FkaW5nOiBTaG93TG9hZGluZywvL+WKoOi9veS4rVxyXG4gICAgSW5zZXJ0TG9hZGluZzogSW5zZXJ0TG9hZGluZyxcclxuICAgIHRpbWVUaWNrQmlnOiB0aW1lVGlja0JpZy8v5YCS6K6h5pe2XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL3Rvb2wuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEyIDEzIDE4IDE5IDIwIDIxIDI3IDI4IDM2IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjaGVja051bTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIHZhciBrZXludW0gPSBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgIGlmICgoa2V5bnVtID49IDQ4ICYmIGtleW51bSA8PSA1NykpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJDdXRcIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgblQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xyXG4gICAgICAgICAgICAvL+esrOS4gOS4quS4jeiDvei+k+WFpTBcclxuICAgICAgICAgICAgaWYgKChuVCA9PSBcIlwiKSAmJiBrZXludW0gPT0gNDgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBlbHNlIGlmIChuVC5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtYXRjaE51bTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICB0LnZhbHVlID0gdC52YWx1ZS50cmltdGV4dCgnLicpO1xyXG4gICAgfSxcclxuICAgIGNoZWNrRmxvYXQ6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIC8vdmFyIHNjb3JlID0gdGhpcy50b3RhbFNvcmU7XHJcbiAgICAgICAgdmFyIGtleW51bSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhrZXludW0pO1xyXG4gICAgICAgIGlmICgoa2V5bnVtID49IDQ4ICYmIGtleW51bSA8PSA1NykgfHwgKGtleW51bSA9PSA0NikpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJDdXRcIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgblQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xyXG4gICAgICAgICAgICAvL+esrOS4gOS4quWtl+espuS4jeiDveS4uuWwj+aVsOeCue+8jOS4jeiDvemHjeWkjei+k+WFpeWwj+aVsOeCuVxyXG4gICAgICAgICAgICBpZiAoKG5UID09IFwiXCIgfHwgblQuaW5kZXhPZihcIi5cIikgPiAtMSkgJiYga2V5bnVtID09IDQ2KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy/lsI/mlbDngrnlkI7kv53nlZnkuIDkvY1cclxuICAgICAgICAgICAgZWxzZSBpZiAoblQubGVuZ3RoID4gMiAmJiBuVC5pbmRleE9mKFwiLlwiKSA9PSBuVC5sZW5ndGggLSAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vMOWQjumdouWPquiDvei+k+WFpeWwj+aVsOeCuVxyXG4gICAgICAgICAgICBlbHNlIGlmIChuVCA9PSBcIjBcIiAmJiBrZXludW0gIT0gNDYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL+S4ieS9jeaVsOWQjuWPquiDvei+k+WFpeWwj+aVsOeCuVxyXG4gICAgICAgICAgICBlbHNlIGlmIChuVC5sZW5ndGggPT0gMyAmJiBuVC5pbmRleE9mKFwiLlwiKSA8IDAgJiYga2V5bnVtICE9IDQ2KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChuVC5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBudW1HcmFkZVRyYW46IGZ1bmN0aW9uICh0KSB7IC8v5pWw5a2X5bm057qn6L2s5o2iXHJcbiAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgc3dpdGNoICh0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuS4gOW5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLkuozlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5LiJ5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuWbm+W5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLkupTlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5YWt5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuS4g+W5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLlhavlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5Lmd5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLpq5jkuIBcIjtcclxuICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIumrmOS6jFwiO1xyXG4gICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi6auY5LiJXCI7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfSwgSXNNb2JpbGU6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gKC9eMVszfDR8NXw3fDhdXFxkezl9JC8udGVzdCh0KSk7Ly/moKHpqozmiYvmnLrnmoTmoLzlvI9cclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2xpYi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gNCAxMiAxMyAyMSAyMyAyNyAyOCJdLCJzb3VyY2VSb290IjoiIn0=