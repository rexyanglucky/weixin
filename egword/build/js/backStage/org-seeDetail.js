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
	var lui = new Lui();
	//编辑的弹出层事件
	tool.pophide($('.eg-pop .close,.eg-pop .cancel'), $('.eg-pop'));
	//tool.popshow($('.editMesg '),$('#edit-pop'));
	//储值的弹出层事件
	//tool.popshow($('.saveVal '),$('#save-pop'));
	
	//机构详情的弹出层事件
	/*
	tool.popshow($('.see-detail '),$('#addorg-name'));*/
	//奖励之前面的选项
	tool.checkBoox();
	//合同类型下拉
	lui.initDropDownList({ warpid: "drop_ht", width: 90, nameField: 'name', idField: 'id', data: [{ name: '金牌', id: '1', pid: '1' }, { name: '银牌', id: '2', pid: '2' }] });
	//教研评级下拉
	lui.initDropDownList({
	    warpid: "drop_jy", width: 85, nameField: 'name', idField: 'id', data: [{ name: 'A级', id: '1', pid: '1' }, { name: 'B级', id: '2', pid: '2' }]
	});
	//合同延期的下拉
	lui.initDropDownList({ warpid: "drop_htyq", width: 150, nameField: 'name', idField: 'id', data: [{ name: '一年', id: '1', pid: '' }, { name: '二年', id: '2', pid: '00' }, { name: '三年', id: '3', pid: '00' }, { name: '四年', id: '4', pid: '00_01' }] });
	//储值折扣的下拉
	//lui.initDropDownList({ warpid: "drop_czzk", width: 150, nameField: 'name', idField: 'id', data: [{ name: '九折', id: '9', pid: '' }, { name: '八折', id: '8', pid: '00' }, { name: '七折', id: '7', pid: '00' }, { name: '六折', id: '6', pid: '00_01' }, { name: '五折', id: '5', pid: '00_01' }, { name: '四折', id: '4', pid: '00_02' }] });
	//折扣的下拉
	lui.initDropDownList({
	    warpid: "drop_zk", width: 90, nameField: 'name', idField: 'id', data: [{
	        name: '一折', id: '0.1', pid: '00_02'
	    }, {
	        name: '二折', id: '0.2', pid: '00_02'
	    }, {
	        name: '三折', id: '0.3', pid: '00_02'
	    }, {
	        name: '四折', id: '0.4', pid: '00_02'
	    }, { name: '五折', id: '0.5', pid: '00_01' }, { name: '六折', id: '0.6', pid: '00_01' }, {
	        name: '七折', id: '0.7', pid: '00'
	    }, {
	        name: '八折', id: '0.8', pid: '00'
	    }, { name: '九折', id: '0.9', pid: '' } ]
	});
	
	
	//后台交互
	var tplTableOrgDetail = __webpack_require__(19);
	var orgId = $("#orgId").val();//机构id，从后台返回的隐藏值
	var orgName = "";//作为全局变量取值
	//var oldCoYear = 0;//旧的合作年限
	__webpack_require__(7);
	var module = {
	    init: function () {
	        //todo 逻辑函数
	        this.render();
	        this.initBtns();
	
	    },
	
	    render: function () {
	        //详情数据(绑定)
	        GetSingleOrg();
	
	    },
	    initBtns: function () {
	        //todo 绑定事件 委托事件
	        //编辑
	        $("body").delegate("#editBtn", "click", function () {
	            $('#edit-pop').show();
	            $('.pop-mask').show();
	
	        });
	
	        //储值
	        $("body").delegate("#storeBtn", "click", function () {
	            $('#save-pop').show();
	            $('.pop-mask').show();
	
	        });
	
	        //编辑的提交
	        $("body").delegate("#updateOrgBtn", "click", function () {
	            var jsonAdd = {};
	           
	            jsonAdd.OrgId = orgId;
	            jsonAdd.CoType = $("#drop_ht").attr("title");//1金牌，2银牌
	            jsonAdd.TeachType = $("#drop_jy").attr("data-id");//教研A级B级
	            jsonAdd.CoYear = $("#drop_htyq").attr("data-id");//合作期限
	            
	            //jsonAdd.OldCoYear = oldCoYear;//老的合作期限
	            jsonAdd.LinkMan = escape($("#txtorgcon").val());//联系人
	            jsonAdd.LinkManTel = $("#txtcontel").val();
	            jsonAdd.Addr = escape($("#txtconaddr").val());
	            jsonAdd.Remark = escape($("#txtmark").val());//备注
	           
	            if (jsonAdd.LinkMan.length < 1) {
	                alert("机构联系人不能为空");
	                return;
	            }
	            if (jsonAdd.LinkManTel.length < 1) {
	                alert("机构电话不能为空");
	                return;
	            }
	
	            //校验电话
	            if (!IsMobile(jsonAdd.LinkManTel)) {
	
	                alert("电话格式不对");
	                return;
	
	            }
	            
	
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Management/OrgManage/CheckOrgPhone",
	                dataType: "json",
	                data: {
	
	                    data: jsonAdd.LinkManTel, orgId: orgId
	                },
	                success: function (data) {
	
	                    
	                    if (data.Data=="0") {
	                        
	                        $(".eg-pop .close").click();//关闭弹窗
	                        //提交表单
	                        $.ajax({
	                            type: "post",
	                            url: "/Management/OrgManage/UpdateSingleOrg",
	                            dataType: "json",
	                            data: {
	
	                                data: JSON.stringify(jsonAdd)
	                            },
	                            success: function (data) {
	
	
	                                alert("添加成功");
	
	                            }
	                        });
	                    } else {
	                        alert("电话重复");
	                    }
	
	                }
	            });
	
	
	
	
	
	
	
	        });
	
	        //机构付款金额和奖励储值失去焦点的时候
	        $("body").delegate("#txtOrgMoney,#txtOrgValue", "blur", function () {
	            CalMoney();
	        });
	
	        //checkbox点击的时候
	        $("body").delegate("#checkBoxSpan", "click", function () {
	            debugger;
	            CalMoney();
	        });
	      
	
	        //储值信息的提交表单
	        $("body").delegate("#btnCzOk", "click", function () {
	            var jsonAddCz = {};
	            jsonAddCz.OrgId = orgId;
	            jsonAddCz.OrgMoney = $("#txtOrgMoney").val();//付款金额
	            jsonAddCz.DisCount = $("#drop_zk").attr("data-id");//折扣  
	            jsonAddCz.OrgValue = $("#txtOrgValue").val();//奖励储值  checkImg
	            jsonAddCz.Remarks = escape($("#txtRemarks").val());//备注
	            jsonAddCz.AfterValue = escape($("#addCz").html());//最后的总的计算钱数
	
	
	            if (jsonAddCz.OrgValue=="") {
	                jsonAddCz.OrgValue = 0;
	            }
	            if (jsonAddCz.OrgMoney.length < 1) {
	                alert("机构付款金额不能为空");
	                return;
	            }
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Management/OrgManage/AddOrgMoney",
	                dataType: "json",
	                data: {
	
	                    data: JSON.stringify(jsonAddCz)
	                },
	                success: function (data) {
	                    debugger;
	                    $(".eg-pop .close").click();//关闭弹窗
	
	                    alert("添加成功");
	
	                }
	            });
	
	
	
	        });
	
	
	        //机构账号冻结
	        $("body").delegate("#froBtn", "click", function () {
	            //提交表单
	                $.ajax({
	                    type: "post",
	                    url: "/Management/OrgManage/FrozenAccount",
	                    dataType: "json",
	                    data: {
	                        data: orgId
	            },
	                success: function (data) {
	                    debugger;
	                   
	                    alert("冻结成功");
	
	                }
	            });
	        });
	
	
	    }
	
	
	};
	
	
	//绑定数据
	$(function () {
	    module.init();
	    OptDrop();
	
	
	});
	
	
	
	
	
	//发送请求调取数据
	function GetSingleOrg() {
	
	    
	    //加载机构列表
	    $.ajax({
	        type: "post",
	        url: "/Management/OrgManage/GetSingleOrg",
	        dataType: "json",
	        data: {
	            orgId: orgId
	        },
	        success: function (data) {
	            
	            if (data.Data) {
	                orgName = data.Data.OrgName;//赋值机构名称
	                $("#content").html(tplTableOrgDetail(data.Data));//读取模板加载
	                //加载编辑框的内容
	                $("#drop_ht").attr("title", data.Data.CoType);
	                $("#spandrop_ht").html(data.Data.CoType);
	                if (data.Data.TeachType == "1") {
	                    $("#drop_jy").attr("title", "A级");
	                    $("#drop_jy").attr("data-id", 1);
	                    $("#spandrop_jy").html("A级");
	
	                } else {
	                    $("#drop_jy").attr("title", "B级");
	                    $("#drop_jy").attr("data-id", 2);
	                    $("#spandrop_jy").html("B级");
	
	                }
	                debugger;
	                $("#drop_htyq").attr("title", GetNumTran(data.Data.CoYear) + "年");//合同延期
	                $("#spandrop_htyq").html(GetNumTran(data.Data.CoYear) + "年");//合同延期显示赋值
	                $("#drop_htyq").attr("data-id", data.Data.CoYear);
	               
	                $("#experTime").html(data.Data.ExpireTimeStr);//直接赋值字符串
	                $("#txtorgcon").val(data.Data.LinkMan);
	                $("#txtcontel").val(data.Data.LinkManTel);
	                $("#txtconaddr").val(data.Data.Addr);
	                $("#txtmark").val(data.Data.Remark);
	                //oldCoYear = data.Data.CoYear;//后台需要进行减法处理（暂时不需要）
	                //储值信息赋值
	                $("#orgName").html(orgName);
	
	
	            }
	            else {
	                alert("获取数据失败");
	                $("#content").html("");
	
	
	
	            }
	        }
	    });
	
	}
	
	
	//针对下拉框的//折扣点击的时候
	function OptDrop() {
	    $("#drop_zk li").click(function() {
	        CalMoney();
	    });
	
	}
	
	
	
	//计算总额
	function CalMoney() {
	
	    debugger;
	    var total = 0;
	    var zk = $("#drop_zk").attr("data-id");
	    if ($("#txtOrgMoney").val() != "") {
	        
	        total = parseFloat($("#txtOrgMoney").val()) / parseFloat(zk);
	    }
	    var cssVal = $("#checkImg").css("visibility");
	    if (cssVal != "hidden") {
	        if ($("#txtOrgValue").val() != "") {
	            total = parseFloat($("#txtOrgValue").val()) + total;
	            
	        }
	       
	    }
	    total = total.toFixed(2);//保留两位小数
	    $("#addCz").html(total);
	
	}
	
	
	
	
	
	
	
	
	//进行转换
	function GetNumTran(num) {
	
	    switch (num) {
	        case 1:
	            return "一";
	        case 2:
	            return "二";
	        case 3:
	            return "三";
	        case 4:
	            return "四";
	        case 5:
	            return "五";
	        case 6:
	            return "六";
	        case 7:
	            return "七";
	        case 8:
	            return "八";
	        case 9:
	            return "九";
	        case 10:
	            return "十";
	
	
	    }
	
	
	
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
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	//var template = require('./template');
	var template = __webpack_require__(8);
	
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
	 * @see	http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
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
	    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
	        var v = map[t];
	        if(v !== undefined){
	            if(all.length > 1){
	                v = '0' + v;
	                v = v.substr(v.length-2);
	            }
	            return v;
	        }
	        else if(t === 'y'){
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
	template.helper('test', function (e) { return e;})

/***/ },
/* 8 */
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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/OrgManage/OrgDetail',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,OrgName=$data.OrgName,CoType=$data.CoType,CurrentValue=$data.CurrentValue,ExpireTime=$data.ExpireTime,ChannelId=$data.ChannelId,ProvinceId=$data.ProvinceId,AreaLeval=$data.AreaLeval,TeachType=$data.TeachType,Students=$data.Students,Schools=$data.Schools,Sales=$data.Sales,Teachers=$data.Teachers,LinkMan=$data.LinkMan,LinkManTel=$data.LinkManTel,$out='';$out+=' <div class="btns"> <div class="addbtn editMesg" style="margin-right:10px;" id="editBtn">编辑</div> <div class="addbtn saveVal" style="margin-right:10px;" id="storeBtn">储值</div> <div class="addbtn" style="margin-right:30px;" id="froBtn">冻结账号</div> </div> <div class="contetn-show"> <div> <div class="response-div"> <span>机构名称 :</span><span>';
	$out+=$escape(OrgName);
	$out+='</span> </div> </div> <div> <div class="response-div mt20"> <span>合同类型 :</span><span>';
	$out+=$escape(CoType);
	$out+='</span> </div> <div class="response-div"> <span>储值余额 :</span><span>';
	$out+=$escape(CurrentValue);
	$out+='元</span> </div> </div> <div> <div class="response-div mt20"> <span>到期时间 :</span><span>';
	$out+=$escape($helpers. dateFormat(ExpireTime ,  "yyyy-MM-dd" ));
	$out+='</span> </div> <div class="response-div"> <span>签约渠道 :</span><span>';
	$out+=$escape(ChannelId);
	$out+='</span> </div> </div> <div> <div class="response-div mt20"> <span>所在区域 :</span><span>';
	$out+=$escape(ProvinceId);
	$out+='</span> </div> <div class="response-div"> <span>区域等级 :</span><span>';
	$out+=$escape(AreaLeval);
	$out+='</span> </div> <div class="response-div"> <span>教研评级 :</span><span>';
	$out+=$escape($helpers. TeachTypeTran(TeachType ));
	$out+='</span> </div> </div> <div> <div class="response-div"> <span>生源量/年 :</span><span>';
	$out+=$escape(Students);
	$out+='人</span> </div> <div class="response-div mt20"> <span>校区数量 :</span><span>';
	$out+=$escape(Schools);
	$out+='个</span> </div> </div> <div> <div class="response-div"> <span>销售额/年 :</span><span>';
	$out+=$escape(Sales);
	$out+='元</span> </div> <div class="response-div mt20"> <span>教师数量 :</span><span>';
	$out+=$escape(Teachers);
	$out+='人</span> </div> </div> <div> <div class="response-div"> <span>机构联系人 :</span><span>';
	$out+=$escape(LinkMan);
	$out+='</span> </div> <div class="response-div mt20"> <span>电话 :</span><span>';
	$out+=$escape(LinkManTel);
	$out+='</span> </div> </div> </div>';
	return new String($out);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy9iYWNrU3RhZ2Uvb3JnLXNlZURldGFpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2x1aS5qcz9lNzkwKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9kcm9wZG93bmxpc3QuanM/ZmVmMCoqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9MVUkvanMvY2hlY2tib3guanM/NjE2ZCoqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9MVUkvdG9vbC5qcz81ZTZhKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3RlbXBsYXRlLWhlbHBlcnMuanM/MTk0MyoqIiwid2VicGFjazovLy8uL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzPzg5NjYqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL09yZ01hbmFnZS9PcmdEZXRhaWwudHBsIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1EQUFrRDtBQUNsRDtBQUNBO0FBQ0E7QUFDQSx1QkFBc0IseUVBQXlFLGdDQUFnQyxHQUFHLGdDQUFnQyxHQUFHO0FBQ3JLO0FBQ0E7QUFDQSw2RUFBNEUsZ0NBQWdDLEdBQUcsZ0NBQWdDO0FBQy9JLEVBQUM7QUFDRDtBQUNBLHVCQUFzQiw0RUFBNEUsK0JBQStCLEdBQUcsaUNBQWlDLEdBQUcsaUNBQWlDLEdBQUcsb0NBQW9DLEdBQUc7QUFDblA7QUFDQSx5QkFBd0IsNEVBQTRFLCtCQUErQixHQUFHLGlDQUFpQyxHQUFHLGlDQUFpQyxHQUFHLG9DQUFvQyxHQUFHLG9DQUFvQyxHQUFHLG9DQUFvQyxHQUFHO0FBQ25VO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSyxHQUFHLHNDQUFzQyxHQUFHLHNDQUFzQztBQUN2RjtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUssR0FBRyxpQ0FBaUM7QUFDekMsRUFBQzs7O0FBR0Q7QUFDQTtBQUNBLCtCQUE4QjtBQUM5QixrQkFBaUI7QUFDakIscUJBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBeUQ7QUFDekQsK0RBQThEO0FBQzlELDhEQUE2RDs7QUFFN0QsNkNBQTRDO0FBQzVDLDZEQUE0RDtBQUM1RDtBQUNBO0FBQ0EsMERBQXlEOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWlCO0FBQ2pCOzs7QUFHQTs7QUFFQSxxREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQTZCO0FBQzdCOzs7QUFHQTs7QUFFQTtBQUNBLDBCQUF5QjtBQUN6QixzQkFBcUI7QUFDckI7QUFDQTs7QUFFQTtBQUNBLGNBQWE7Ozs7Ozs7O0FBUWIsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7O0FBR1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBeUQ7QUFDekQsZ0VBQStEO0FBQy9ELDBEQUF5RDtBQUN6RCxnRUFBK0Q7QUFDL0QsK0RBQThEOzs7QUFHOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlEQUFnRDs7QUFFaEQ7O0FBRUE7QUFDQSxjQUFhOzs7O0FBSWIsVUFBUzs7O0FBR1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxjQUFhO0FBQ2IsVUFBUzs7O0FBR1Q7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsRUFBQzs7Ozs7O0FBTUQ7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7O0FBRUE7QUFDQSw2Q0FBNEM7QUFDNUMsa0VBQWlFO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1GQUFrRjtBQUNsRiw4RUFBNkU7QUFDN0U7O0FBRUEsK0RBQThEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQStDO0FBQy9DO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBLE1BQUs7O0FBRUw7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7OztBQUlBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsOEJBQTZCO0FBQzdCOztBQUVBOzs7Ozs7Ozs7QUFTQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7Ozs7QUFJQTs7Ozs7Ozs7Ozs7QUN6WEE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLFFBQVE7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTJFLGNBQWM7O0FBRXpGLHdCQUF1QixpQkFBaUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBNkQ7O0FBRTdEO0FBQ0Esa0JBQWlCLGVBQWU7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQjtBQUNwQjtBQUNBO0FBQ0EscUJBQW9CO0FBQ3BCOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBdUIsNEJBQTRCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLGtDOzs7Ozs7O0FDektBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBd0IsaUJBQWlCLEVBQUUsbUJBQW1CO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0RUFBMkU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBeUIsc0JBQXNCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTs7QUFFYixVQUFTO0FBQ1Q7OztBQUdBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCOzs7Ozs7OztBQzVIQSxrQ0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0Esa0NBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLHVCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSx1QkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakIsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUEsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsb0NBQW9DO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQSw4QkFBNkI7QUFDN0IsMENBQXlDO0FBQ3pDLG9CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQyxtQ0FBbUM7QUFDdkU7QUFDQTtBQUNBLE1BQUs7QUFDTCw2QkFBNEIsb0NBQW9DO0FBQ2hFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUNySUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNELHVDQUFzQyxXQUFXLEM7Ozs7OztBQzdKakQsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBa0M7QUFDbEM7O0FBRUE7QUFDQSx5Q0FBd0MsT0FBTywyQkFBMkI7QUFDMUU7O0FBRUE7QUFDQTtBQUNBLHNDQUFxQyxZQUFZO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQSwwQkFBeUIsaUVBQWlFO0FBQzFGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBLGFBQVksZUFBZTtBQUMzQixrREFBaUQ7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXFCO0FBQ3JCLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsR0FBRTtBQUNGLGtDQUFpQztBQUNqQyxJQUFHO0FBQ0gsZUFBYztBQUNkO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0EsR0FBRTtBQUNGLEVBQUMsRzs7Ozs7Ozs7Ozs7Ozs7OztBQzlFRDtBQUNBO0FBQ0E7QUFDQSxjQUFhLGthQUFrYSxpRkFBaUYsNkVBQTZFLHNFQUFzRTtBQUNucEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRSIsImZpbGUiOiJiYWNrU3RhZ2Uvb3JnLXNlZURldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwidmFyIEx1aSA9IHJlcXVpcmUoJy4uLy4uL0xVSS9qcy9sdWknKTtcclxudmFyIHRvb2wgPSByZXF1aXJlKCcuLi8uLi9MVUkvdG9vbCcpO1xyXG52YXIgbHVpID0gbmV3IEx1aSgpO1xyXG4vL+e8lui+keeahOW8ueWHuuWxguS6i+S7tlxyXG50b29sLnBvcGhpZGUoJCgnLmVnLXBvcCAuY2xvc2UsLmVnLXBvcCAuY2FuY2VsJyksICQoJy5lZy1wb3AnKSk7XHJcbi8vdG9vbC5wb3BzaG93KCQoJy5lZGl0TWVzZyAnKSwkKCcjZWRpdC1wb3AnKSk7XHJcbi8v5YKo5YC855qE5by55Ye65bGC5LqL5Lu2XHJcbi8vdG9vbC5wb3BzaG93KCQoJy5zYXZlVmFsICcpLCQoJyNzYXZlLXBvcCcpKTtcclxuXHJcbi8v5py65p6E6K+m5oOF55qE5by55Ye65bGC5LqL5Lu2XHJcbi8qXHJcbnRvb2wucG9wc2hvdygkKCcuc2VlLWRldGFpbCAnKSwkKCcjYWRkb3JnLW5hbWUnKSk7Ki9cclxuLy/lpZblirHkuYvliY3pnaLnmoTpgInpoblcclxudG9vbC5jaGVja0Jvb3goKTtcclxuLy/lkIjlkIznsbvlnovkuIvmi4lcclxubHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9odFwiLCB3aWR0aDogOTAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAn6YeR54mMJywgaWQ6ICcxJywgcGlkOiAnMScgfSwgeyBuYW1lOiAn6ZO254mMJywgaWQ6ICcyJywgcGlkOiAnMicgfV0gfSk7XHJcbi8v5pWZ56CU6K+E57qn5LiL5ouJXHJcbmx1aS5pbml0RHJvcERvd25MaXN0KHtcclxuICAgIHdhcnBpZDogXCJkcm9wX2p5XCIsIHdpZHRoOiA4NSwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICdB57qnJywgaWQ6ICcxJywgcGlkOiAnMScgfSwgeyBuYW1lOiAnQue6pycsIGlkOiAnMicsIHBpZDogJzInIH1dXHJcbn0pO1xyXG4vL+WQiOWQjOW7tuacn+eahOS4i+aLiVxyXG5sdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2h0eXFcIiwgd2lkdGg6IDE1MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICfkuIDlubQnLCBpZDogJzEnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJ+S6jOW5tCcsIGlkOiAnMicsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICfkuInlubQnLCBpZDogJzMnLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAn5Zub5bm0JywgaWQ6ICc0JywgcGlkOiAnMDBfMDEnIH1dIH0pO1xyXG4vL+WCqOWAvOaKmOaJo+eahOS4i+aLiVxyXG4vL2x1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfY3p6a1wiLCB3aWR0aDogMTUwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogW3sgbmFtZTogJ+S5neaKmCcsIGlkOiAnOScsIHBpZDogJycgfSwgeyBuYW1lOiAn5YWr5oqYJywgaWQ6ICc4JywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJ+S4g+aKmCcsIGlkOiAnNycsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICflha3mipgnLCBpZDogJzYnLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAn5LqU5oqYJywgaWQ6ICc1JywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJ+Wbm+aKmCcsIGlkOiAnNCcsIHBpZDogJzAwXzAyJyB9XSB9KTtcclxuLy/mipjmiaPnmoTkuIvmi4lcclxubHVpLmluaXREcm9wRG93bkxpc3Qoe1xyXG4gICAgd2FycGlkOiBcImRyb3BfemtcIiwgd2lkdGg6IDkwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogW3tcclxuICAgICAgICBuYW1lOiAn5LiA5oqYJywgaWQ6ICcwLjEnLCBwaWQ6ICcwMF8wMidcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAn5LqM5oqYJywgaWQ6ICcwLjInLCBwaWQ6ICcwMF8wMidcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAn5LiJ5oqYJywgaWQ6ICcwLjMnLCBwaWQ6ICcwMF8wMidcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAn5Zub5oqYJywgaWQ6ICcwLjQnLCBwaWQ6ICcwMF8wMidcclxuICAgIH0sIHsgbmFtZTogJ+S6lOaKmCcsIGlkOiAnMC41JywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJ+WFreaKmCcsIGlkOiAnMC42JywgcGlkOiAnMDBfMDEnIH0sIHtcclxuICAgICAgICBuYW1lOiAn5LiD5oqYJywgaWQ6ICcwLjcnLCBwaWQ6ICcwMCdcclxuICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAn5YWr5oqYJywgaWQ6ICcwLjgnLCBwaWQ6ICcwMCdcclxuICAgIH0sIHsgbmFtZTogJ+S5neaKmCcsIGlkOiAnMC45JywgcGlkOiAnJyB9IF1cclxufSk7XHJcblxyXG5cclxuLy/lkI7lj7DkuqTkupJcclxudmFyIHRwbFRhYmxlT3JnRGV0YWlsID0gcmVxdWlyZShcIk9yZ01hbmFnZS9PcmdEZXRhaWwudHBsXCIpO1xyXG52YXIgb3JnSWQgPSAkKFwiI29yZ0lkXCIpLnZhbCgpOy8v5py65p6EaWTvvIzku47lkI7lj7Dov5Tlm57nmoTpmpDol4/lgLxcclxudmFyIG9yZ05hbWUgPSBcIlwiOy8v5L2c5Li65YWo5bGA5Y+Y6YeP5Y+W5YC8XHJcbi8vdmFyIG9sZENvWWVhciA9IDA7Ly/ml6fnmoTlkIjkvZzlubTpmZBcclxucmVxdWlyZShcIi4uLy4uL3RwbC90ZW1wbGF0ZS1oZWxwZXJzLmpzXCIpO1xyXG52YXIgbW9kdWxlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vdG9kbyDpgLvovpHlh73mlbBcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJ0bnMoKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v6K+m5oOF5pWw5o2uKOe7keWumilcclxuICAgICAgICBHZXRTaW5nbGVPcmcoKTtcclxuXHJcbiAgICB9LFxyXG4gICAgaW5pdEJ0bnM6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL3RvZG8g57uR5a6a5LqL5Lu2IOWnlOaJmOS6i+S7tlxyXG4gICAgICAgIC8v57yW6L6RXHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIjZWRpdEJ0blwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJCgnI2VkaXQtcG9wJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKCcucG9wLW1hc2snKS5zaG93KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+WCqOWAvFxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI3N0b3JlQnRuXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKCcjc2F2ZS1wb3AnKS5zaG93KCk7XHJcbiAgICAgICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v57yW6L6R55qE5o+Q5LqkXHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIjdXBkYXRlT3JnQnRuXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIganNvbkFkZCA9IHt9O1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBqc29uQWRkLk9yZ0lkID0gb3JnSWQ7XHJcbiAgICAgICAgICAgIGpzb25BZGQuQ29UeXBlID0gJChcIiNkcm9wX2h0XCIpLmF0dHIoXCJ0aXRsZVwiKTsvLzHph5HniYzvvIwy6ZO254mMXHJcbiAgICAgICAgICAgIGpzb25BZGQuVGVhY2hUeXBlID0gJChcIiNkcm9wX2p5XCIpLmF0dHIoXCJkYXRhLWlkXCIpOy8v5pWZ56CUQee6p0LnuqdcclxuICAgICAgICAgICAganNvbkFkZC5Db1llYXIgPSAkKFwiI2Ryb3BfaHR5cVwiKS5hdHRyKFwiZGF0YS1pZFwiKTsvL+WQiOS9nOacn+mZkFxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy9qc29uQWRkLk9sZENvWWVhciA9IG9sZENvWWVhcjsvL+iAgeeahOWQiOS9nOacn+mZkFxyXG4gICAgICAgICAgICBqc29uQWRkLkxpbmtNYW4gPSBlc2NhcGUoJChcIiN0eHRvcmdjb25cIikudmFsKCkpOy8v6IGU57O75Lq6XHJcbiAgICAgICAgICAgIGpzb25BZGQuTGlua01hblRlbCA9ICQoXCIjdHh0Y29udGVsXCIpLnZhbCgpO1xyXG4gICAgICAgICAgICBqc29uQWRkLkFkZHIgPSBlc2NhcGUoJChcIiN0eHRjb25hZGRyXCIpLnZhbCgpKTtcclxuICAgICAgICAgICAganNvbkFkZC5SZW1hcmsgPSBlc2NhcGUoJChcIiN0eHRtYXJrXCIpLnZhbCgpKTsvL+Wkh+azqFxyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoanNvbkFkZC5MaW5rTWFuLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi5py65p6E6IGU57O75Lq65LiN6IO95Li656m6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChqc29uQWRkLkxpbmtNYW5UZWwubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLmnLrmnoTnlLXor53kuI3og73kuLrnqbpcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v5qCh6aqM55S16K+dXHJcbiAgICAgICAgICAgIGlmICghSXNNb2JpbGUoanNvbkFkZC5MaW5rTWFuVGVsKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi55S16K+d5qC85byP5LiN5a+5XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuXHJcbiAgICAgICAgICAgIC8v5o+Q5Lqk6KGo5Y2VXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICAgICAgICAgIHVybDogXCIvTWFuYWdlbWVudC9PcmdNYW5hZ2UvQ2hlY2tPcmdQaG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBqc29uQWRkLkxpbmtNYW5UZWwsIG9yZ0lkOiBvcmdJZFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLkRhdGE9PVwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmVnLXBvcCAuY2xvc2VcIikuY2xpY2soKTsvL+WFs+mXreW8ueeql1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aPkOS6pOihqOWNlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL01hbmFnZW1lbnQvT3JnTWFuYWdlL1VwZGF0ZVNpbmdsZU9yZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShqc29uQWRkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIua3u+WKoOaIkOWKn1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi55S16K+d6YeN5aSNXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/mnLrmnoTku5jmrL7ph5Hpop3lkozlpZblirHlgqjlgLzlpLHljrvnhKbngrnnmoTml7blgJlcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiN0eHRPcmdNb25leSwjdHh0T3JnVmFsdWVcIiwgXCJibHVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgQ2FsTW9uZXkoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9jaGVja2JveOeCueWHu+eahOaXtuWAmVxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2NoZWNrQm94U3BhblwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgIENhbE1vbmV5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIFxyXG5cclxuICAgICAgICAvL+WCqOWAvOS/oeaBr+eahOaPkOS6pOihqOWNlVxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2J0bkN6T2tcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBqc29uQWRkQ3ogPSB7fTtcclxuICAgICAgICAgICAganNvbkFkZEN6Lk9yZ0lkID0gb3JnSWQ7XHJcbiAgICAgICAgICAgIGpzb25BZGRDei5PcmdNb25leSA9ICQoXCIjdHh0T3JnTW9uZXlcIikudmFsKCk7Ly/ku5jmrL7ph5Hpop1cclxuICAgICAgICAgICAganNvbkFkZEN6LkRpc0NvdW50ID0gJChcIiNkcm9wX3prXCIpLmF0dHIoXCJkYXRhLWlkXCIpOy8v5oqY5omjICBcclxuICAgICAgICAgICAganNvbkFkZEN6Lk9yZ1ZhbHVlID0gJChcIiN0eHRPcmdWYWx1ZVwiKS52YWwoKTsvL+WlluWKseWCqOWAvCAgY2hlY2tJbWdcclxuICAgICAgICAgICAganNvbkFkZEN6LlJlbWFya3MgPSBlc2NhcGUoJChcIiN0eHRSZW1hcmtzXCIpLnZhbCgpKTsvL+Wkh+azqFxyXG4gICAgICAgICAgICBqc29uQWRkQ3ouQWZ0ZXJWYWx1ZSA9IGVzY2FwZSgkKFwiI2FkZEN6XCIpLmh0bWwoKSk7Ly/mnIDlkI7nmoTmgLvnmoTorqHnrpfpkrHmlbBcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoanNvbkFkZEN6Lk9yZ1ZhbHVlPT1cIlwiKSB7XHJcbiAgICAgICAgICAgICAgICBqc29uQWRkQ3ouT3JnVmFsdWUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChqc29uQWRkQ3ouT3JnTW9uZXkubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLmnLrmnoTku5jmrL7ph5Hpop3kuI3og73kuLrnqbpcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mj5DkuqTooajljZVcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9NYW5hZ2VtZW50L09yZ01hbmFnZS9BZGRPcmdNb25leVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShqc29uQWRkQ3opXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiLmVnLXBvcCAuY2xvc2VcIikuY2xpY2soKTsvL+WFs+mXreW8ueeql1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIua3u+WKoOaIkOWKn1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy/mnLrmnoTotKblj7flhrvnu5NcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNmcm9CdG5cIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8v5o+Q5Lqk6KGo5Y2VXHJcbiAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogXCIvTWFuYWdlbWVudC9PcmdNYW5hZ2UvRnJvemVuQWNjb3VudFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IG9yZ0lkXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLlhrvnu5PmiJDlip9cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbn07XHJcblxyXG5cclxuLy/nu5HlrprmlbDmja5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBtb2R1bGUuaW5pdCgpO1xyXG4gICAgT3B0RHJvcCgpO1xyXG5cclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbi8v5Y+R6YCB6K+35rGC6LCD5Y+W5pWw5o2uXHJcbmZ1bmN0aW9uIEdldFNpbmdsZU9yZygpIHtcclxuXHJcbiAgICBcclxuICAgIC8v5Yqg6L295py65p6E5YiX6KGoXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgIHVybDogXCIvTWFuYWdlbWVudC9PcmdNYW5hZ2UvR2V0U2luZ2xlT3JnXCIsXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgb3JnSWQ6IG9yZ0lkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGRhdGEuRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgb3JnTmFtZSA9IGRhdGEuRGF0YS5PcmdOYW1lOy8v6LWL5YC85py65p6E5ZCN56ewXHJcbiAgICAgICAgICAgICAgICAkKFwiI2NvbnRlbnRcIikuaHRtbCh0cGxUYWJsZU9yZ0RldGFpbChkYXRhLkRhdGEpKTsvL+ivu+WPluaooeadv+WKoOi9vVxyXG4gICAgICAgICAgICAgICAgLy/liqDovb3nvJbovpHmoYbnmoTlhoXlrrlcclxuICAgICAgICAgICAgICAgICQoXCIjZHJvcF9odFwiKS5hdHRyKFwidGl0bGVcIiwgZGF0YS5EYXRhLkNvVHlwZSk7XHJcbiAgICAgICAgICAgICAgICAkKFwiI3NwYW5kcm9wX2h0XCIpLmh0bWwoZGF0YS5EYXRhLkNvVHlwZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5EYXRhLlRlYWNoVHlwZSA9PSBcIjFcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZHJvcF9qeVwiKS5hdHRyKFwidGl0bGVcIiwgXCJB57qnXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjZHJvcF9qeVwiKS5hdHRyKFwiZGF0YS1pZFwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3NwYW5kcm9wX2p5XCIpLmh0bWwoXCJB57qnXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNkcm9wX2p5XCIpLmF0dHIoXCJ0aXRsZVwiLCBcIkLnuqdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNkcm9wX2p5XCIpLmF0dHIoXCJkYXRhLWlkXCIsIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc3BhbmRyb3BfanlcIikuaHRtbChcIkLnuqdcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2Ryb3BfaHR5cVwiKS5hdHRyKFwidGl0bGVcIiwgR2V0TnVtVHJhbihkYXRhLkRhdGEuQ29ZZWFyKSArIFwi5bm0XCIpOy8v5ZCI5ZCM5bu25pyfXHJcbiAgICAgICAgICAgICAgICAkKFwiI3NwYW5kcm9wX2h0eXFcIikuaHRtbChHZXROdW1UcmFuKGRhdGEuRGF0YS5Db1llYXIpICsgXCLlubRcIik7Ly/lkIjlkIzlu7bmnJ/mmL7npLrotYvlgLxcclxuICAgICAgICAgICAgICAgICQoXCIjZHJvcF9odHlxXCIpLmF0dHIoXCJkYXRhLWlkXCIsIGRhdGEuRGF0YS5Db1llYXIpO1xyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICQoXCIjZXhwZXJUaW1lXCIpLmh0bWwoZGF0YS5EYXRhLkV4cGlyZVRpbWVTdHIpOy8v55u05o6l6LWL5YC85a2X56ym5LiyXHJcbiAgICAgICAgICAgICAgICAkKFwiI3R4dG9yZ2NvblwiKS52YWwoZGF0YS5EYXRhLkxpbmtNYW4pO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0eHRjb250ZWxcIikudmFsKGRhdGEuRGF0YS5MaW5rTWFuVGVsKTtcclxuICAgICAgICAgICAgICAgICQoXCIjdHh0Y29uYWRkclwiKS52YWwoZGF0YS5EYXRhLkFkZHIpO1xyXG4gICAgICAgICAgICAgICAgJChcIiN0eHRtYXJrXCIpLnZhbChkYXRhLkRhdGEuUmVtYXJrKTtcclxuICAgICAgICAgICAgICAgIC8vb2xkQ29ZZWFyID0gZGF0YS5EYXRhLkNvWWVhcjsvL+WQjuWPsOmcgOimgei/m+ihjOWHj+azleWkhOeQhu+8iOaaguaXtuS4jemcgOimge+8iVxyXG4gICAgICAgICAgICAgICAgLy/lgqjlgLzkv6Hmga/otYvlgLxcclxuICAgICAgICAgICAgICAgICQoXCIjb3JnTmFtZVwiKS5odG1sKG9yZ05hbWUpO1xyXG5cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuiOt+WPluaVsOaNruWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICQoXCIjY29udGVudFwiKS5odG1sKFwiXCIpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuLy/pkojlr7nkuIvmi4nmoYbnmoQvL+aKmOaJo+eCueWHu+eahOaXtuWAmVxyXG5mdW5jdGlvbiBPcHREcm9wKCkge1xyXG4gICAgJChcIiNkcm9wX3prIGxpXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIENhbE1vbmV5KCk7XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuLy/orqHnrpfmgLvpop1cclxuZnVuY3Rpb24gQ2FsTW9uZXkoKSB7XHJcblxyXG4gICAgZGVidWdnZXI7XHJcbiAgICB2YXIgdG90YWwgPSAwO1xyXG4gICAgdmFyIHprID0gJChcIiNkcm9wX3prXCIpLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgaWYgKCQoXCIjdHh0T3JnTW9uZXlcIikudmFsKCkgIT0gXCJcIikge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRvdGFsID0gcGFyc2VGbG9hdCgkKFwiI3R4dE9yZ01vbmV5XCIpLnZhbCgpKSAvIHBhcnNlRmxvYXQoemspO1xyXG4gICAgfVxyXG4gICAgdmFyIGNzc1ZhbCA9ICQoXCIjY2hlY2tJbWdcIikuY3NzKFwidmlzaWJpbGl0eVwiKTtcclxuICAgIGlmIChjc3NWYWwgIT0gXCJoaWRkZW5cIikge1xyXG4gICAgICAgIGlmICgkKFwiI3R4dE9yZ1ZhbHVlXCIpLnZhbCgpICE9IFwiXCIpIHtcclxuICAgICAgICAgICAgdG90YWwgPSBwYXJzZUZsb2F0KCQoXCIjdHh0T3JnVmFsdWVcIikudmFsKCkpICsgdG90YWw7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgdG90YWwgPSB0b3RhbC50b0ZpeGVkKDIpOy8v5L+d55WZ5Lik5L2N5bCP5pWwXHJcbiAgICAkKFwiI2FkZEN6XCIpLmh0bWwodG90YWwpO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8v6L+b6KGM6L2s5o2iXHJcbmZ1bmN0aW9uIEdldE51bVRyYW4obnVtKSB7XHJcblxyXG4gICAgc3dpdGNoIChudW0pIHtcclxuICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgIHJldHVybiBcIuS4gFwiO1xyXG4gICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgcmV0dXJuIFwi5LqMXCI7XHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICByZXR1cm4gXCLkuIlcIjtcclxuICAgICAgICBjYXNlIDQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcIuWbm1wiO1xyXG4gICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgcmV0dXJuIFwi5LqUXCI7XHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICByZXR1cm4gXCLlha1cIjtcclxuICAgICAgICBjYXNlIDc6XHJcbiAgICAgICAgICAgIHJldHVybiBcIuS4g1wiO1xyXG4gICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgcmV0dXJuIFwi5YWrXCI7XHJcbiAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICByZXR1cm4gXCLkuZ1cIjtcclxuICAgICAgICBjYXNlIDEwOlxyXG4gICAgICAgICAgICByZXR1cm4gXCLljYFcIjtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9iYWNrU3RhZ2Uvb3JnLXNlZURldGFpbC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDIwIiwidmFyIEx1aURyb3BEb3duTGlzdCA9IHJlcXVpcmUoJy4uL2pzL2Ryb3Bkb3dubGlzdCcpO1xyXG52YXIgTHVpQ2hlY2tCb3ggPSByZXF1aXJlKCcuLi9qcy9jaGVja2JveCcpO1xyXG5cclxuZnVuY3Rpb24gTHVpKCkge1xyXG4gICAgLy90aGlzLmNoZWNrQm94ID0gbnVsbDtcclxuICAgIC8vIHRoaXMuaW5pdFdvcmRTcGVhaygpO1xyXG59O1xyXG5cclxuTHVpLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWksXHJcbiAgICBpbml0VHJlZTogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICB2YXIgdCA9IG5ldyBMdWlUcmVlKCk7XHJcbiAgICAgICAgcmV0dXJuIHQuaW5pdChwKTtcclxuICAgIH0sXHJcbiAgICBpbml0RHJvcERvd25MaXN0OiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHZhciBkID0gbmV3IEx1aURyb3BEb3duTGlzdCgpO1xyXG4gICAgICAgIHJldHVybiBkLmluaXQocCk7XHJcbiAgICB9LFxyXG4gICAgaW5pdENoZWNrQm94OiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIC8v77+977+977+977+90rvvv73vv73vv73vv73vv73vv73vv73vv73Iq++/vda177+9Y2hlY2tib3jvv73vv73vv73vv71cclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tCb3gpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0JveCA9IG5ldyBMdWlDaGVja0JveCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IG5ldyBMdWlDaGVja0JveCgpO1xyXG4gICAgICAgIHJldHVybiBjLmluaXQocCk7XHJcblxyXG4gICAgfSxcclxuICAgIGluaXRXb3JkU3BlYWs6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgLy/vv73vv73vv73vv73Su++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vcir77+91rXvv713b3Jkc3BlYWvvv73vv73vv73vv71cclxuICAgICAgICBpZiAoIXRoaXMud29yZHNwZWFrKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29yZHNwZWFrID0gbmV3IEx1aVdvcmRTcGVhaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IG5ldyBMdWlXb3JkU3BlYWsoKTtcclxuICAgICAgICByZXR1cm4gYy5pbml0KHApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMdWk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9sdWkuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJmdW5jdGlvbiBMdWlEcm9wRG93bkxpc3QoKSB7XHJcbiAgICB0aGlzLnBhcmFtID0gbnVsbDtcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBcIlwiO1xyXG59XHJcbnZhciBkcm9wY291bnQgPSAxMDAwO1xyXG5MdWlEcm9wRG93bkxpc3QucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aURyb3BEb3duTGlzdCxcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSB0aGlzLndhcnBpZCA9IFwiI1wiICsgcGFyYW0ud2FycGlkO1xyXG4gICAgICAgIHZhciB3YXJwaWQgPSBwYXJhbS53YXJwaWQ7XHJcbiAgICAgICAgaWYgKCFwYXJhbS5kYXRhKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHZhciBkYXRhID0gcGFyYW0uZGF0YTtcclxuXHJcbiAgICAgICAgdmFyIHdpZHRoID0gcGFyYW0ud2lkdGggPSBwYXJhbS53aWR0aCB8fCAxODA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHBhcmFtLmhlaWdodCA9IHBhcmFtLmhlaWdodCB8fCAyMDA7XHJcbiAgICAgICAgdmFyIHN1YnRleHRsZW5ndGggPSBwYXJhbS5zdWJ0ZXh0bGVuZ3RoID0gcGFyYW0uc3VidGV4dGxlbmd0aCB8fCA1O1xyXG4gICAgICAgIHBhcmFtLnZhbHVlRmllbGQgPSBwYXJhbS52YWx1ZUZpZWxkIHx8IFwiaWRcIjtcclxuICAgICAgICBwYXJhbS50ZXh0RmllbGQgPSBwYXJhbS50ZXh0RmllbGQgfHwgXCJuYW1lXCI7XHJcbiAgICAgICAgdmFyIHZhbHVlRmllbGQgPSBwYXJhbS52YWx1ZUZpZWxkO1xyXG4gICAgICAgIHZhciB0ZXh0RmllbGQgPSBwYXJhbS50ZXh0RmllbGQ7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkQ2FsbEJhY2sgPSBwYXJhbS5zZWxlY3RlZENhbGxCYWNrO1xyXG4gICAgICAgIHZhciBsb2FkZWRDYWxsQmFjayA9IHBhcmFtLmxvYWRlZENhbGxCYWNrO1xyXG4gICAgICAgIHZhciB6aW5kZXggPSBwYXJhbS56aW5kZXg7XHJcbiAgICAgICAgaWYgKHBhcmFtLmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBkID0ge307XHJcbiAgICAgICAgICAgIGRbdmFsdWVGaWVsZF0gPSAtMTtcclxuICAgICAgICAgICAgZFt0ZXh0RmllbGRdID0gXCJcIjtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKGQpO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/orr7nva7pu5jorqTlgLxcclxuICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IGRhdGFbMF1bdmFsdWVGaWVsZF07XHJcbiAgICAgICAgdmFyIGRlZmF1bHRUZXh0ID0gcGFyYW0uZGVmYXVsdFRleHQgPSBwYXJhbS5kZWZhdWx0VmFsdWUgfHwgZGF0YVswXVt0ZXh0RmllbGRdO1xyXG4gICAgICAgIHRoaXMucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICB2YXIgdWxIdG1sID0gXCI8ZGl2IGNsYXNzPSdkcm9wZGl2IGRuJz5cIjtcclxuICAgICAgICB1bEh0bWwgKz0gJyAgPHVsIGNsYXNzPVwiZHJvcHVsXCIgc3R5bGU9XCJtYXgtaGVpZ2h0OicgKyBoZWlnaHQgKyAncHg7b3ZlcmZsb3c6YXV0bztcIiBkYXRhLWlkPVwiJyArIGRlZmF1bHRWYWx1ZSArICdcIiBkYXRhLW5hbWU9XCInICsgZGVmYXVsdFRleHQgKyAnXCI+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBkYXRhLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gZGF0YVtrXTtcclxuICAgICAgICAgICAgdmFyIHYgPSBpdGVtW3RleHRGaWVsZF0ubGVuZ3RoID4gc3VidGV4dGxlbmd0aCA/IGl0ZW1bdGV4dEZpZWxkXS5zdWJzdHJpbmcoMCwgc3VidGV4dGxlbmd0aCkgKyBcIi4uLlwiIDogaXRlbVt0ZXh0RmllbGRdO1xyXG4gICAgICAgICAgICB2YXIgaXRlbUh0bWwgPSAnPGxpIHRpdGxlPScgKyBpdGVtW3RleHRGaWVsZF0gKyAnIGRhdGEtaW5kZXg9JyArIGsgKyAnIGRhdGEtaWQ9JyArIGl0ZW1bdmFsdWVGaWVsZF0gKyAnIGRhdGEtdGFnPVxcJycgKyBKU09OLnN0cmluZ2lmeShkYXRhW2tdKSArICdcXCc+JyArIHYgKyAnPC9saT4nO1xyXG4gICAgICAgICAgICB1bEh0bWwgKz0gaXRlbUh0bWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVsSHRtbCArPSBcIjwvdWw+XCI7XHJcbiAgICAgICAgdWxIdG1sICs9IFwiPC9kaXY+XCI7XHJcbiAgICAgICAgdmFyIHNwYW5IdG1sID0gJyA8c3BhbiBzdHlsZT1cIndpZHRoOiAnICsgd2lkdGggKyAncHg7XCIgY2xhc3M9XCJkaWJcIj48c3BhbiBkYXRhLXR5cGU9XCJkcm9wZG93bmxpc3RfZHJvcF9zcGFuXCIgaWQ9XCJzcGFuJyArIHBhcmFtLndhcnBpZCArICdcIj4nICsgZGVmYXVsdFRleHQgKyAnPC9zcGFuPiA8aSBjbGFzcz1cIm51bV9kb3duXCI+PC9pPjwvc3Bhbj4nO1xyXG5cclxuICAgICAgICB2YXIgY29uID0gJChcIiNcIiArIHdhcnBpZCk7XHJcbiAgICAgICAgY29uLmNzcyh7IHdpZHRoOiB3aWR0aCB9KTtcclxuICAgICAgICBjb24uYWRkQ2xhc3MoXCJsdWlfZHJvcGRvd25saXN0XCIpO1xyXG4gICAgICAgIGNvbi5odG1sKHNwYW5IdG1sKTtcclxuICAgICAgICBjb24uYXBwZW5kKHVsSHRtbCk7XHJcbiAgICAgICAgaWYgKHppbmRleCkge1xyXG4gICAgICAgICAgICBjb24uZmluZChcIi5kcm9wZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgemluZGV4KTtcclxuICAgICAgICAgICAgY29uLmF0dHIoXCJ6aW5kZXhcIiwgemluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBjb24uZmluZChcIi5kcm9wZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgZHJvcGNvdW50LS0pO1xyXG4gICAgICAgICAgICAvLyBjb24uYXR0cihcInppbmRleFwiLCBkcm9wY291bnQgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uLmFkZENsYXNzKFwiYnRuX251bV91cGRvd25cIikuYWRkQ2xhc3MoXCJidG5fbnVtX3VwZG93bjFcIikuYWRkQ2xhc3MoXCJkaWJcIik7XHJcbiAgICAgICAgY29uLmF0dHIoXCJ0aXRsZVwiLCBkZWZhdWx0VGV4dCk7XHJcbiAgICAgICAgY29uLmF0dHIoXCJkYXRhLWlkXCIsIGRlZmF1bHRWYWx1ZSk7XHJcblxyXG4gICAgICAgIHZhciB1bCA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiB1bFwiKTtcclxuICAgICAgICB2YXIgZHJvcGRpdiA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiAuZHJvcGRpdlwiKTtcclxuICAgICAgICB2YXIgbGkgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgdWwgbGlcIik7XHJcbiAgICAgICAgdmFyIHNwYW4gPSBjb24uZmluZChcInNwYW5bZGF0YS10eXBlPSdkcm9wZG93bmxpc3RfZHJvcF9zcGFuJ11cIik7XHJcbiAgICAgICAgLy/kuovku7ZcclxuICAgICAgICAvL+S4i+aLieS6i+S7tlxyXG4gICAgICAgIGNvbi5jbGljayhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodWwuaXMoXCI6dmlzaWJsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRpdi5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmRyb3BkaXZcIikuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAgICAgLy8gZHJvcGRpdi5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB1bC5zbGlkZURvd24oMjAwKTtcclxuICAgICAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVEb3duKDIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAkKFwiLmRyb3BkaXZcIikuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uLm1vdXNlbGVhdmUoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyAgICAgdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8v6YCJ5Lit5LqL5Lu2XHJcbiAgICAgICAgbGkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFRleHQgPSAkKHRoaXMpLmh0bWwoKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSnNvbiA9ICQodGhpcykuYXR0cihcImRhdGEtam9zblwiKTtcclxuICAgICAgICAgICAgdmFyIGFsbHRpdGxlID0gJCh0aGlzKS5hdHRyKFwidGl0bGVcIik7XHJcbiAgICAgICAgICAgIHNwYW4udGV4dChzZWxlY3RlZFRleHQpO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWlkXCIsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWpzb25cIiwgc2VsZWN0ZWRKc29uKTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwidGl0bGVcIiwgYWxsdGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgY29uLmF0dHIoXCJ0aXRsZVwiLCBhbGx0aXRsZSk7XHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwiZGF0YS1pZFwiLCBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgLy/pgInkuK3lm57osIPkuovku7ZcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2FsbEJhY2sod2FycGlkLCBzZWxlY3RlZFZhbHVlLCBhbGx0aXRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJvcGRpdi5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGFuID0gc3BhbjtcclxuICAgICAgICAvL+iuvue9rum7mOiupOWAvFxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHNwYW4uYXR0cihcImRhdGEtaWRcIiksIHRleHQ6IHNwYW4uYXR0cihcInRpdGxlXCIpLCB6aW5kZXg6ICQodGhpcy5zZWxlY3RvcikuYXR0cihcInppbmRleFwiKSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IC0xLCB0ZXh0OiBcIlwiIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvL+aatOmcsue7meWklumDqOeahOaWueazlVxyXG4gICAgZ2V0U2VsZWN0ZWRKc29uVmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNwYW4uYXR0cihcImRhdGEtanNvblwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgdGV4dHNlbCA9IFwiXCI7XHJcbiAgICAgICAgLy/pgInkuK3nmoTlgLxcclxuICAgICAgICB2YXIgc2VsSXRlbTtcclxuICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICBmb3IgKHZhciBtID0gMDsgbSA8IHRoaXMucGFyYW0uZGF0YS5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXNlbCA9IHRoaXMucGFyYW0uZGF0YVttXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zZWxbdGhpcy5wYXJhbS52YWx1ZUZpZWxkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGV4dHNlbCA9IGl0ZW1zZWxbdGhpcy5wYXJhbS50ZXh0RmllbGRdO1xyXG4gICAgICAgICAgICAgICAgc2VsSXRlbSA9IGl0ZW1zZWw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWlkXCIsIHZhbHVlKTtcclxuICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWpzb25cIiwgSlNPTi5zdHJpbmdpZnkoc2VsSXRlbSkpO1xyXG4gICAgICAgIHNwYW4uYXR0cihcInRpdGxlXCIsIHRleHRzZWwpO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuYXR0cihcInRpdGxlXCIsIHRleHRzZWwpO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9IHRleHRzZWw7XHJcbiAgICAgICAgdmFyIHYgPSB0ZXh0c2VsLmxlbmd0aCA+IHRoaXMucGFyYW0uc3VidGV4dGxlbmd0aCA/IHRleHRzZWwuc3Vic3RyaW5nKDAsIHRoaXMucGFyYW0uc3VidGV4dGxlbmd0aCkgKyBcIi4uLlwiIDogdGV4dHNlbDtcclxuICAgICAgICBzcGFuLnRleHQodik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmxvYWRlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW0ubG9hZGVkQ2FsbEJhY2soY29udGFpbmVySWQsIHNlbGVjdGVkVmFsdWUsIHNlbGVjdGVkVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gTHVpRHJvcERvd25MaXN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9kcm9wZG93bmxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJcclxuZnVuY3Rpb24gTHVpQ2hlY2tCb3goKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gXCJsdWljaGVja1wiO1xyXG4gICAgLy/lj4LmlbBcclxuICAgIHRoaXMucGFyYW0gPSB7fTtcclxufVxyXG5cclxuTHVpQ2hlY2tCb3gucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aUNoZWNrQm94LFxyXG4gICAgLypcclxuICAgICAqd2FycGlkIOWuueWZqGlkXHJcbiAgICAgKmRhdGEg5pWw5o2u6ZuG77yManNvbiDkuLIgW3tuYW1lOnJleCx2YWw6MDAxfSx7bmFtZTpsaWxlaSx2YWw6MDAyfV1cclxuICAgICAq5bGV56S65a2X5q61ICAgdGV4dEZpZWxkXHJcbiAgICAgKuWunumZheWAvOWtl+autSB2YWx1ZUZpZWxkXHJcbiAgICAgKuWbnuiwg+WHveaVsCBjYWxsYmFjayDlj4LmlbDkuLrlvZPliY3op6blj5HnmoTlpI3pgInmoYbkuIrnu5HlrprnmoTmlbDmja5cclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgdmFyIGN0aGlzID0gdGhpcztcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0uZ3JvdXApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9ICdsdWljaGVja1tkYXRhLW5hbWU9XCInICsgcGFyYW0uZ3JvdXAgKyAnXCJdJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2tTdHlsZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKSA9PSAxID8gXCJjaGVja19zZWxcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrc2hvdyA9ICQoaXRlbSkuYXR0cihcImRhdGEtc2hvd2NoZWNrYm94XCIpICE9IDE7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dCA9ICQoaXRlbSkuYXR0cihcImRhdGEtdGV4dFwiKTtcclxuICAgICAgICAgICAgdmFyIGggPSAnPGkgY2xhc3M9XCJpY29uX2NoZWNrICcgKyBpc2NoZWNrU3R5bGUgKyAnIFwiPjwvaT4nO1xyXG4gICAgICAgICAgICB2YXIgcyA9ICc8c3BhbiBjbGFzcz1cImNoZWNrX3RleHRcIiAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiA+JyArIHRleHQgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGggPSBpc2NoZWNrc2hvdyA/IGggKyBzIDogcztcclxuICAgICAgICAgICAgLy8gaWYgKCQoaXRlbSkuZmluZChcImljb25fY2hlY2tcIikubGVuZ3RoID4gMCB8fCAkKGl0ZW0pLmZpbmQoXCJjaGVja190ZXh0XCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChpdGVtKS5odG1sKGgpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNzcyh7IFwiY3Vyc29yXCI6IFwicG9pbnRlclwiIH0pO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19zZWxcIikuYWRkQ2xhc3MoXCJjaGVja19kZWZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19kZWZcIikuYWRkQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBhbGVydChcImJpbmRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0mJnBhcmFtLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwbmFtZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gY3RoaXMuZ2V0SnNvblZhbHVlKGdyb3VwbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjlm57osIPlh73mlbDvvIzlubbov5Tlm57nu4TlkI3lkozmiYDpgInkuK3lgLzlvpdqc29u5LiyXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXJhbS5jYWxsYmFjayhncm91cG5hbWUsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uY2FsbGJhY2soaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcblxyXG4gICAgfSxcclxuICAgIC8v6K6+572uY2hlY2tib3jnu4Tlk6rkupvlgLzooqvpgInkuK1cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5maWx0ZXIoJ1tkYXRhLXZhbD1cIicgKyB2YWwgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoaXRlbSkuY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlmNoZWNrYm9457uE6YCJ5Lit55qE5YC8XHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByLnB1c2goJChpdGVtKS5hdHRyKFwiZGF0YS12YWxcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGVydChyLmpvaW4oJywnKSk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5ZjaGVja2JveOe7hOmAieS4reeahOWAvFxyXG4gICAgZ2V0SnNvblZhbHVlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGpzb25zdHIgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWpzb25cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbnN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHIucHVzaChKU09OLnBhcnNlKHVuZXNjYXBlKGpzb25zdHIpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH0sXHJcbiAgICAvKirliKTmlq3lvZPliY0gY2hlY2tib3gg5piv5ZCm6YCJ5LitICovXHJcbiAgICBpc2NoZWNrOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmZpbHRlcignW2RhdGEtdmFsPVwiJyArIHZhbCArICdcIl0nKVswXTtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICByZXR1cm4gaXNjaGVjayA9PSAxO1xyXG4gICAgfSxcclxuICAgIC8qKuWIpOaWreW9k+WJjSBjaGVja2JveCDmmK/lkKbpgInkuK0gKi9cclxuICAgIGlzY2hlY2tFbGVtZW50OiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIHJldHVybiBpc2NoZWNrID09IDE7XHJcbiAgICB9LFxyXG4gICAgLyoq5qih5ouf5Y2V5Ye7IOWPquaUueWPmOagt+W8jyAqL1xyXG4gICAgc2V0Q2xpY2tTdHlsZTogZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAwKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMSk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY2hpbGRyZW4oXCJpXCIpLmFkZENsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHM9THVpQ2hlY2tCb3g7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2NoZWNrYm94LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIiwiXHJcblxyXG5mdW5jdGlvbiBwb3BzaG93KHNlbGUsIHBvcHNob3cpIHsvL+W8ueWHuuWxgueahOaYvuekulxyXG4gICBcclxuICAgIHNlbGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBvcHNob3cuc2hvdygpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5zaG93KCk7XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIHBvcGhpZGUoc2VsZSwgcG9wc2hvdykgey8v5by55Ye65bGC55qE5raI5aSxXHJcbiAgICBzZWxlLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwb3BzaG93LmhpZGUoKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5oaWRlKCk7XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGNoZWNrQm9veCgpIHsvL+WkjemAieahhueahOagt+W8j1xyXG4gICAgJCgnLmNoZWNrQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gY2hvb3NlQWxsKCkgey8v5YWo6YCJ5YWo5LiN6YCJXHJcbiAgICAkKCcuY2hlY2tCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG51bSA9ICQoJy5jaGVja0JveCcpLmluZGV4KCQodGhpcykpO1xyXG4gICAgICAgIGlmIChudW0gPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknKSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyICRpbWdzID0gJC5tYWtlQXJyYXkoJCgnLnRhYmxlIHRyOm5vdCg6Zmlyc3QpJykuZmluZCgnaW1nJykpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkaW1ncy5ldmVyeShmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc3R5bGUudmlzaWJpbGl0eSA9PSAndmlzaWJsZSc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxufVxyXG5mdW5jdGlvbiBTaWJzKFRoaXMpIHtcclxuICAgIFRoaXMub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcmFkaW8oKSB7Ly/ljZXpgInnmoTmoLflvI9cclxuICAgICQoJy5yYWRpbycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcucmFkaW8nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDb29raWUob2JqTmFtZSwgb2JqVmFsdWUsIG9iakhvdXJzKSB7XHJcbiAgICB2YXIgc3RyID0gb2JqTmFtZSArIFwiPVwiICsgZXNjYXBlKG9ialZhbHVlKTtcclxuXHJcbiAgICBpZiAob2JqSG91cnMgPiAwKSB7IC8v5Li6MOaXtuS4jeiuvuWumui/h+acn+aXtumXtO+8jOa1j+iniOWZqOWFs+mXreaXtmNvb2tpZeiHquWKqOa2iOWksVxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB2YXIgbXMgPSBvYmpIb3VycyAqIDM2MDAgKiAxMDAwO1xyXG4gICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIG1zKTtcclxuICAgICAgICBzdHIgKz0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCkgKyBcIjtwYXRoPS9cIjtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IHN0cjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29va2llKG9iak5hbWUpIHsgLy/ojrflj5bmjIflrprlkI3np7DnmoRjb29raWXnmoTlgLxcclxuICAgIHZhciBhcnJTdHIgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7IFwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyU3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBhcnJTdHJbaV0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgIGlmICh0ZW1wWzBdID09IG9iak5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZXNjYXBlKHRlbXBbMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy/lvLnlh7rliqDovb3lm77niYdcclxuZnVuY3Rpb24gU2hvd0xvYWRpbmcob2JqKSB7XHJcbiAgICBvYmouaHRtbChqUXVlcnkoXCIjZGl2TG9hZGluZ1wiKS5odG1sKCkpO1xyXG59XHJcbmZ1bmN0aW9uIHRpbWVUaWNrQmlnKHNlY29uZCkge1xyXG4gICAgJChcIi50aW1lcy1iaWdcIikuaHRtbChzZWNvbmQpO1xyXG4gICAgdmFyIHQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi50aW1lcy1iaWdcIikuaHRtbCgtLXNlY29uZCk7XHJcbiAgICAgICAgaWYgKHNlY29uZCA8PSAwKSB7XHJcbiAgICAgICAgICAgICQoXCIucm90YXRlLXBvaW50XCIpLmNzcyh7IFwiYW5pbWF0aW9uLXBsYXktc3RhdGVcIjogXCJwYXVzZWRcIiB9KTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LCAxMDAwKTtcclxuICAgICQoXCIucm90YXRlLXBvaW50XCIpLmNzcyh7IFwiYW5pbWF0aW9uLXBsYXktc3RhdGVcIjogXCJydW5uaW5nXCIgfSk7XHJcbn1cclxuXHJcbi8v5Yqg6L295Zu+54mH5Yiw5p+Q5Liq5YWD57Sg5LitXHJcbmZ1bmN0aW9uIEluc2VydExvYWRpbmcob2JqKSB7XHJcbiAgICBvYmouYXBwZW5kKGpRdWVyeShcIiNkaXZMb2FkaW5nXCIpLmh0bWwoKSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcG9waGlkZTogcG9waGlkZSxcclxuICAgIHBvcHNob3c6IHBvcHNob3csXHJcbiAgICBjaGVja0Jvb3g6IGNoZWNrQm9veCxcclxuICAgIFNpYnM6IFNpYnMsXHJcbiAgICByYWRpbzogcmFkaW8sXHJcbiAgICBjaG9vc2VBbGw6IGNob29zZUFsbCxcclxuICAgIHNldENvb2tpZTogc2V0Q29va2llLC8v6K6+572uY29va2llXHJcbiAgICBnZXRDb29raWU6IGdldENvb2tpZSwgLy8g6I635Y+WY29va2llXHJcbiAgICBTaG93TG9hZGluZzogU2hvd0xvYWRpbmcsLy/liqDovb3kuK1cclxuICAgIEluc2VydExvYWRpbmc6IEluc2VydExvYWRpbmcsXHJcbiAgICB0aW1lVGlja0JpZzogdGltZVRpY2tCaWcvL+WAkuiuoeaXtlxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS90b29sLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMiAxMyAxOCAxOSAyMCAyMSAyNyAyOCAzNiIsIi8vdmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xyXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcclxuXHJcbi8qKiBcclxuICog5a+55pel5pyf6L+b6KGM5qC85byP5YyW77yMIFxyXG4gKiBAcGFyYW0gZGF0ZSDopoHmoLzlvI/ljJbnmoTml6XmnJ8gXHJcbiAqIEBwYXJhbSBmb3JtYXQg6L+b6KGM5qC85byP5YyW55qE5qih5byP5a2X56ym5LiyXHJcbiAqICAgICDmlK/mjIHnmoTmqKHlvI/lrZfmr43mnInvvJogXHJcbiAqICAgICB5OuW5tCwgXHJcbiAqICAgICBNOuW5tOS4reeahOaciOS7vSgxLTEyKSwgXHJcbiAqICAgICBkOuaciOS7veS4reeahOWkqSgxLTMxKSwgXHJcbiAqICAgICBoOuWwj+aXtigwLTIzKSwgXHJcbiAqICAgICBtOuWIhigwLTU5KSwgXHJcbiAqICAgICBzOuenkigwLTU5KSwgXHJcbiAqICAgICBTOuavq+enkigwLTk5OSksXHJcbiAqICAgICBxOuWto+W6pigxLTQpXHJcbiAqIEByZXR1cm4gU3RyaW5nXHJcbiAqIEBhdXRob3IgeWFuaXMud2FuZ1xyXG4gKiBAc2VlXHRodHRwOi8veWFuaXN3YW5nLmNvbS9mcm9udGVuZC8yMDEzLzAyLzE2L2RhdGVmb3JtYXQtcGVyZm9ybWFuY2UvXHJcbiAqL1xyXG5cclxuLy/ml7bpl7TovazmjaJcclxudGVtcGxhdGUuaGVscGVyKCdkYXRlRm9ybWF0JywgZnVuY3Rpb24gKGRhdGUsIGZvcm1hdCkge1xyXG4gICAgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KGRhdGUucmVwbGFjZShcIi9EYXRlKFwiLCBcIlwiKS5yZXBsYWNlKFwiKS9cIiwgXCJcIiksIDEwKSk7XHJcbiAgICAvL3JldHVybiBkYXRlLmdldERhdGUoKTtcclxuICAgLy9kYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcblxyXG4gICAgdmFyIG1hcCA9IHtcclxuICAgICAgICBcInlcIjogZGF0ZS5nZXRZZWFyKCksXHJcbiAgICAgICAgXCJNXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9IFxyXG4gICAgICAgIFwiZFwiOiBkYXRlLmdldERhdGUoKSwgLy/ml6UgXHJcbiAgICAgICAgXCJoXCI6IGRhdGUuZ2V0SG91cnMoKSwgLy/lsI/ml7YgXHJcbiAgICAgICAgXCJtXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhiBcclxuICAgICAgICBcInNcIjogZGF0ZS5nZXRTZWNvbmRzKCksIC8v56eSIFxyXG4gICAgICAgIFwicVwiOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6piBcclxuICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enkiBcclxuICAgIH07XHJcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvKFt5TWRobXNxU10pKy9nLCBmdW5jdGlvbihhbGwsIHQpe1xyXG4gICAgICAgIHZhciB2ID0gbWFwW3RdO1xyXG4gICAgICAgIGlmKHYgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGFsbC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgICAgIHYgPSAnMCcgKyB2O1xyXG4gICAgICAgICAgICAgICAgdiA9IHYuc3Vic3RyKHYubGVuZ3RoLTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHQgPT09ICd5Jyl7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gYWxsLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGw7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmb3JtYXQ7XHJcbn0pO1xyXG5cclxuLy/miKrlrZflpITnkIZcclxudGVtcGxhdGUuaGVscGVyKCdjdXRjaGFyJywgZnVuY3Rpb24gKG9iaiwgY2hhcmxlbmd0aCkge1xyXG5cclxuICAgIGlmIChvYmogPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5sZW5ndGggPiBwYXJzZUludChjaGFybGVuZ3RoKSkge1xyXG4gICAgICAgIG9iaiA9IG9iai5zdWJzdHJpbmcoMCwgcGFyc2VJbnQoY2hhcmxlbmd0aCkpICsgXCIuLi5cIjtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iajtcclxuXHJcbn0pO1xyXG5cclxuLy/mlZnnoJTor4TnuqdcclxudGVtcGxhdGUuaGVscGVyKCdUZWFjaFR5cGVUcmFuJywgZnVuY3Rpb24gKG9iaikge1xyXG5cclxuICAgIGlmIChvYmogPT0gMSkge1xyXG4gICAgICAgIHJldHVybiBcIkHnuqdcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiQue6p1wiO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5ZCI5ZCM5pyf6ZmQ6L2s5o2iXHJcbnRlbXBsYXRlLmhlbHBlcignSHRReCcsIGZ1bmN0aW9uIChvYmopIHtcclxuXHJcbiAgICByZXR1cm4gdGVtcGxhdGUuaGVscGVyKG9iaikgKyBcIuW5tFwiO1xyXG59KTtcclxuXHJcbi8v5bm057qnXHJcbnRlbXBsYXRlLmhlbHBlcignR2V0QmlnR3JhZGUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgcmV0dXJuIGUgPT0gMSA/IFwi5LiA5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gMiA/IFwi5LqM5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gMyA/IFwi5LiJ5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNCA/IFwi5Zub5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNSA/IFwi5LqU5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNiA/IFwi5YWt5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNyA/IFwi5LiD5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gOCA/IFwi5YWr5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gOSA/IFwi5Lmd5bm057qnXCJcclxuICAgICAgICAgOiBlID09IDEwID8gXCLpq5jkuIBcIlxyXG4gICAgICAgIDogZSA9PSAxMSA/IFwi6auY5LqMXCJcclxuICAgICAgICA6IGUgPT0gMTIgPyBcIumrmOS4iVwiXHJcbiAgICAgICAgOiBcIlwiO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy/lpKflhpnnmoTovazmjaJcclxudGVtcGxhdGUuaGVscGVyKCdHZXRCaWdXJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHJldHVybiBlID09IDEgPyBcIuS4gFwiXHJcbiAgICAgICAgOiBlID09IDIgPyBcIuS6jFwiXHJcbiAgICAgICAgOiBlID09IDMgPyBcIuS4iVwiXHJcbiAgICAgICAgOiBlID09IDQgPyBcIuWbm1wiXHJcbiAgICAgICAgOiBlID09IDUgPyBcIuS6lFwiXHJcbiAgICAgICAgOiBlID09IDYgPyBcIuWFrVwiXHJcbiAgICAgICAgOiBlID09IDcgPyBcIuS4g1wiXHJcbiAgICAgICAgOiBlID09IDggPyBcIuWFq1wiXHJcbiAgICAgICAgOiBlID09IDkgPyBcIuS5nVwiXHJcbiAgICAgICAgOiBlID09IDEwID8gXCLljYFcIlxyXG4gICAgICAgIDogZSA9PSAxMSA/IFwi5Y2B5LiAXCJcclxuICAgICAgICA6IGUgPT0gMTIgPyBcIuWNgeS6jFwiXHJcbiAgICAgICAgOiBlID09IDEzID8gXCLljYHkuIlcIlxyXG4gICAgICAgIDogZSA9PSAxNCA/IFwi5Y2B5ZubXCJcclxuICAgICAgICA6IGUgPT0gMTUgPyBcIuWNgeS6lFwiXHJcbiAgICAgICAgOiBlID09IDE2ID8gXCLljYHlha1cIlxyXG4gICAgICAgIDogZSA9PSAxNyA/IFwi5Y2B5LiDXCJcclxuICAgICAgICA6IGUgPT0gMTggPyBcIuWNgeWFq1wiXHJcbiAgICAgICAgOiBlID09IDE5ID8gXCLljYHkuZ1cIlxyXG4gICAgICAgIDogZSA9PSAyMCA/IFwi5LqM5Y2BXCJcclxuICAgICAgICA6IGUgPT0gMjEgPyBcIuS6jOWNgeS4gFwiXHJcbiAgICAgICAgOiBlID09IDIyID8gXCLkuozljYHkuoxcIlxyXG4gICAgICAgIDogZSA9PSAyMyA/IFwi5LqM5Y2B5LiJXCJcclxuICAgICAgICA6IGUgPT0gMjQgPyBcIuS6jOWNgeWbm1wiXHJcbiAgICAgICAgOiBlID09IDI1ID8gXCLkuozljYHkupRcIlxyXG4gICAgICAgIDogZSA9PSAyNiA/IFwi5LqM5Y2B5YWtXCJcclxuICAgICAgICA6IGUgPT0gMjcgPyBcIuS6jOWNgeS4g1wiXHJcbiAgICAgICAgOiBlID09IDI4ID8gXCLkuozljYHlhatcIlxyXG4gICAgICAgIDogZSA9PSAyOSA/IFwi5LqM5Y2B5LmdXCJcclxuICAgICAgICA6IGUgPT0gMzAgPyBcIuS4ieWNgVwiXHJcbiAgICAgICAgOiBlID09IDMxID8gXCLkuInljYHkuIBcIlxyXG4gICAgICAgIDogZSA9PSAzMiA/IFwi5LiJ5Y2B5LqMXCJcclxuICAgICAgICA6IGUgPT0gMzMgPyBcIuS4ieWNgeS4iVwiXHJcbiAgICAgICAgOiBlID09IDM0ID8gXCLkuInljYHlm5tcIlxyXG4gICAgICAgIDogZSA9PSAzNSA/IFwi5LiJ5Y2B5LqUXCJcclxuICAgICAgICA6IGUgPT0gMzYgPyBcIuS4ieWNgeWFrVwiXHJcbiAgICAgICAgOiBlID09IDM3ID8gXCLkuInljYHkuINcIlxyXG4gICAgICAgIDogZSA9PSAzOCA/IFwi5LiJ5Y2B5YWrXCJcclxuICAgICAgICA6IGUgPT0gMzkgPyBcIuS4ieWNgeS5nVwiXHJcbiAgICAgICAgOiBlID09IDQwID8gXCLlm5vljYFcIlxyXG4gICAgICAgIDogZSA9PSA0MSA/IFwi5Zub5Y2B5LiAXCJcclxuICAgICAgICA6IGUgPT0gNDIgPyBcIuWbm+WNgeS6jFwiXHJcbiAgICAgICAgOiBlID09IDQzID8gXCLlm5vljYHkuIlcIlxyXG4gICAgICAgIDogZSA9PSA0NCA/IFwi5Zub5Y2B5ZubXCJcclxuICAgICAgICA6IGUgPT0gNDUgPyBcIuWbm+WNgeS6lFwiXHJcbiAgICAgICAgOiBlID09IDQ2ID8gXCLlm5vljYHlha1cIlxyXG4gICAgICAgIDogZSA9PSA0NyA/IFwi5Zub5Y2B5LiDXCJcclxuICAgICAgICA6IGUgPT0gNDggPyBcIuWbm+WNgeWFq1wiXHJcbiAgICAgICAgOiBlID09IDQ5ID8gXCLlm5vljYHkuZ1cIlxyXG4gICAgICAgIDogZSA9PSA1MCA/IFwi5LqU5Y2BXCJcclxuICAgICAgICA6IFwiXCI7XHJcbn0pO1xyXG50ZW1wbGF0ZS5oZWxwZXIoJ3Rlc3QnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZTt9KVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RwbC90ZW1wbGF0ZS1oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMTcgMTkgMjAgMjEgMjMgMjcgMjggNDUiLCIvKlRNT0RKUzp7fSovXHJcbiFmdW5jdGlvbiAoKSB7XHJcblx0ZnVuY3Rpb24gYShhLCBiKSB7XHJcblx0XHRyZXR1cm4gKC9zdHJpbmd8ZnVuY3Rpb24vLnRlc3QodHlwZW9mIGIpID8gaCA6IGcpKGEsIGIpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBiKGEsIGMpIHtcclxuXHRcdHJldHVybiBcInN0cmluZ1wiICE9IHR5cGVvZiBhICYmIChjID0gdHlwZW9mIGEsIFwibnVtYmVyXCIgPT09IGMgPyBhICs9IFwiXCIgOiBhID0gXCJmdW5jdGlvblwiID09PSBjID8gYihhLmNhbGwoYSkpIDogXCJcIiksIGFcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGMoYSkge1xyXG5cdFx0cmV0dXJuIGxbYV1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGQoYSkge1xyXG5cdFx0cmV0dXJuIGIoYSkucmVwbGFjZSgvJig/IVtcXHcjXSs7KXxbPD5cIiddL2csIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBlKGEsIGIpIHtcclxuXHRcdGlmIChtKGEpKWZvciAodmFyIGMgPSAwLCBkID0gYS5sZW5ndGg7IGQgPiBjOyBjKyspYi5jYWxsKGEsIGFbY10sIGMsIGEpOyBlbHNlIGZvciAoYyBpbiBhKWIuY2FsbChhLCBhW2NdLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZihhLCBiKSB7XHJcblx0XHR2YXIgYyA9IC8oXFwvKVteXFwvXStcXDFcXC5cXC5cXDEvLCBkID0gKFwiLi9cIiArIGEpLnJlcGxhY2UoL1teXFwvXSskLywgXCJcIiksIGUgPSBkICsgYjtcclxuXHRcdGZvciAoZSA9IGUucmVwbGFjZSgvXFwvXFwuXFwvL2csIFwiL1wiKTsgZS5tYXRjaChjKTspZSA9IGUucmVwbGFjZShjLCBcIi9cIik7XHJcblx0XHRyZXR1cm4gZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZyhiLCBjKSB7XHJcblx0XHR2YXIgZCA9IGEuZ2V0KGIpIHx8IGkoe2ZpbGVuYW1lOiBiLCBuYW1lOiBcIlJlbmRlciBFcnJvclwiLCBtZXNzYWdlOiBcIlRlbXBsYXRlIG5vdCBmb3VuZFwifSk7XHJcblx0XHRyZXR1cm4gYyA/IGQoYykgOiBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoKGEsIGIpIHtcclxuXHRcdGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBiKSB7XHJcblx0XHRcdHZhciBjID0gYjtcclxuXHRcdFx0YiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGsoYylcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dmFyIGQgPSBqW2FdID0gZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGIoYywgYSkgKyBcIlwiXHJcblx0XHRcdH0gY2F0Y2ggKGQpIHtcclxuXHRcdFx0XHRyZXR1cm4gaShkKSgpXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRyZXR1cm4gZC5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSA9IG4sIGQudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBiICsgXCJcIlxyXG5cdFx0fSwgZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaShhKSB7XHJcblx0XHR2YXIgYiA9IFwie1RlbXBsYXRlIEVycm9yfVwiLCBjID0gYS5zdGFjayB8fCBcIlwiO1xyXG5cdFx0aWYgKGMpYyA9IGMuc3BsaXQoXCJcXG5cIikuc2xpY2UoMCwgMikuam9pbihcIlxcblwiKTsgZWxzZSBmb3IgKHZhciBkIGluIGEpYyArPSBcIjxcIiArIGQgKyBcIj5cXG5cIiArIGFbZF0gKyBcIlxcblxcblwiO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIFwib2JqZWN0XCIgPT0gdHlwZW9mIGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcihiICsgXCJcXG5cXG5cIiArIGMpLCBiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgaiA9IGEuY2FjaGUgPSB7fSwgayA9IHRoaXMuU3RyaW5nLCBsID0ge1xyXG5cdFx0XCI8XCI6IFwiJiM2MDtcIixcclxuXHRcdFwiPlwiOiBcIiYjNjI7XCIsXHJcblx0XHQnXCInOiBcIiYjMzQ7XCIsXHJcblx0XHRcIidcIjogXCImIzM5O1wiLFxyXG5cdFx0XCImXCI6IFwiJiMzODtcIlxyXG5cdH0sIG0gPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRcdHJldHVybiBcIltvYmplY3QgQXJyYXldXCIgPT09IHt9LnRvU3RyaW5nLmNhbGwoYSlcclxuXHRcdH0sIG4gPSBhLnV0aWxzID0ge1xyXG5cdFx0JGhlbHBlcnM6IHt9LCAkaW5jbHVkZTogZnVuY3Rpb24gKGEsIGIsIGMpIHtcclxuXHRcdFx0cmV0dXJuIGEgPSBmKGMsIGEpLCBnKGEsIGIpXHJcblx0XHR9LCAkc3RyaW5nOiBiLCAkZXNjYXBlOiBkLCAkZWFjaDogZVxyXG5cdH0sIG8gPSBhLmhlbHBlcnMgPSBuLiRoZWxwZXJzO1xyXG5cdGEuZ2V0ID0gZnVuY3Rpb24gKGEpIHtcclxuXHRcdHJldHVybiBqW2EucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpXVxyXG5cdH0sIGEuaGVscGVyID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdG9bYV0gPSBiXHJcblx0fSwgbW9kdWxlLmV4cG9ydHMgPSBhXHJcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMTUgMTYgMTcgMTkgMjAgMjEgMjMgMjcgMjggMzQgNDAgNDEgNDIgNDMgNDUgNDYgNTMgNTQiLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnc3JjL3RwbC9PcmdNYW5hZ2UvT3JnRGV0YWlsJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsT3JnTmFtZT0kZGF0YS5PcmdOYW1lLENvVHlwZT0kZGF0YS5Db1R5cGUsQ3VycmVudFZhbHVlPSRkYXRhLkN1cnJlbnRWYWx1ZSxFeHBpcmVUaW1lPSRkYXRhLkV4cGlyZVRpbWUsQ2hhbm5lbElkPSRkYXRhLkNoYW5uZWxJZCxQcm92aW5jZUlkPSRkYXRhLlByb3ZpbmNlSWQsQXJlYUxldmFsPSRkYXRhLkFyZWFMZXZhbCxUZWFjaFR5cGU9JGRhdGEuVGVhY2hUeXBlLFN0dWRlbnRzPSRkYXRhLlN0dWRlbnRzLFNjaG9vbHM9JGRhdGEuU2Nob29scyxTYWxlcz0kZGF0YS5TYWxlcyxUZWFjaGVycz0kZGF0YS5UZWFjaGVycyxMaW5rTWFuPSRkYXRhLkxpbmtNYW4sTGlua01hblRlbD0kZGF0YS5MaW5rTWFuVGVsLCRvdXQ9Jyc7JG91dCs9JyA8ZGl2IGNsYXNzPVwiYnRuc1wiPiA8ZGl2IGNsYXNzPVwiYWRkYnRuIGVkaXRNZXNnXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6MTBweDtcIiBpZD1cImVkaXRCdG5cIj7nvJbovpE8L2Rpdj4gPGRpdiBjbGFzcz1cImFkZGJ0biBzYXZlVmFsXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6MTBweDtcIiBpZD1cInN0b3JlQnRuXCI+5YKo5YC8PC9kaXY+IDxkaXYgY2xhc3M9XCJhZGRidG5cIiBzdHlsZT1cIm1hcmdpbi1yaWdodDozMHB4O1wiIGlkPVwiZnJvQnRuXCI+5Ya757uT6LSm5Y+3PC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVwiY29udGV0bi1zaG93XCI+IDxkaXY+IDxkaXYgY2xhc3M9XCJyZXNwb25zZS1kaXZcIj4gPHNwYW4+5py65p6E5ZCN56ewIDo8L3NwYW4+PHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoT3JnTmFtZSk7XG4kb3V0Kz0nPC9zcGFuPiA8L2Rpdj4gPC9kaXY+IDxkaXY+IDxkaXYgY2xhc3M9XCJyZXNwb25zZS1kaXYgbXQyMFwiPiA8c3Bhbj7lkIjlkIznsbvlnosgOjwvc3Bhbj48c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShDb1R5cGUpO1xuJG91dCs9Jzwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJyZXNwb25zZS1kaXZcIj4gPHNwYW4+5YKo5YC85L2Z6aKdIDo8L3NwYW4+PHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoQ3VycmVudFZhbHVlKTtcbiRvdXQrPSflhYM8L3NwYW4+IDwvZGl2PiA8L2Rpdj4gPGRpdj4gPGRpdiBjbGFzcz1cInJlc3BvbnNlLWRpdiBtdDIwXCI+IDxzcGFuPuWIsOacn+aXtumXtCA6PC9zcGFuPjxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKCRoZWxwZXJzLiBkYXRlRm9ybWF0KEV4cGlyZVRpbWUgLCAgXCJ5eXl5LU1NLWRkXCIgKSk7XG4kb3V0Kz0nPC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cInJlc3BvbnNlLWRpdlwiPiA8c3Bhbj7nrb7nuqbmuKDpgZMgOjwvc3Bhbj48c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShDaGFubmVsSWQpO1xuJG91dCs9Jzwvc3Bhbj4gPC9kaXY+IDwvZGl2PiA8ZGl2PiA8ZGl2IGNsYXNzPVwicmVzcG9uc2UtZGl2IG10MjBcIj4gPHNwYW4+5omA5Zyo5Yy65Z+fIDo8L3NwYW4+PHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoUHJvdmluY2VJZCk7XG4kb3V0Kz0nPC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cInJlc3BvbnNlLWRpdlwiPiA8c3Bhbj7ljLrln5/nrYnnuqcgOjwvc3Bhbj48c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShBcmVhTGV2YWwpO1xuJG91dCs9Jzwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJyZXNwb25zZS1kaXZcIj4gPHNwYW4+5pWZ56CU6K+E57qnIDo8L3NwYW4+PHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoJGhlbHBlcnMuIFRlYWNoVHlwZVRyYW4oVGVhY2hUeXBlICkpO1xuJG91dCs9Jzwvc3Bhbj4gPC9kaXY+IDwvZGl2PiA8ZGl2PiA8ZGl2IGNsYXNzPVwicmVzcG9uc2UtZGl2XCI+IDxzcGFuPueUn+a6kOmHjy/lubQgOjwvc3Bhbj48c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShTdHVkZW50cyk7XG4kb3V0Kz0n5Lq6PC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cInJlc3BvbnNlLWRpdiBtdDIwXCI+IDxzcGFuPuagoeWMuuaVsOmHjyA6PC9zcGFuPjxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKFNjaG9vbHMpO1xuJG91dCs9J+S4qjwvc3Bhbj4gPC9kaXY+IDwvZGl2PiA8ZGl2PiA8ZGl2IGNsYXNzPVwicmVzcG9uc2UtZGl2XCI+IDxzcGFuPumUgOWUruminS/lubQgOjwvc3Bhbj48c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShTYWxlcyk7XG4kb3V0Kz0n5YWDPC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cInJlc3BvbnNlLWRpdiBtdDIwXCI+IDxzcGFuPuaVmeW4iOaVsOmHjyA6PC9zcGFuPjxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKFRlYWNoZXJzKTtcbiRvdXQrPSfkuro8L3NwYW4+IDwvZGl2PiA8L2Rpdj4gPGRpdj4gPGRpdiBjbGFzcz1cInJlc3BvbnNlLWRpdlwiPiA8c3Bhbj7mnLrmnoTogZTns7vkurogOjwvc3Bhbj48c3Bhbj4nO1xuJG91dCs9JGVzY2FwZShMaW5rTWFuKTtcbiRvdXQrPSc8L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVwicmVzcG9uc2UtZGl2IG10MjBcIj4gPHNwYW4+55S16K+dIDo8L3NwYW4+PHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoTGlua01hblRlbCk7XG4kb3V0Kz0nPC9zcGFuPiA8L2Rpdj4gPC9kaXY+IDwvZGl2Pic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RwbC9PcmdNYW5hZ2UvT3JnRGV0YWlsLnRwbFxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAyMCJdLCJzb3VyY2VSb290IjoiIn0=