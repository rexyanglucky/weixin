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
	var tool = __webpack_require__(6);
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
	var tplTableOrgDetail = __webpack_require__(22);
	var orgId = $("#orgId").val();//机构id，从后台返回的隐藏值
	var orgName = "";//作为全局变量取值
	//var oldCoYear = 0;//旧的合作年限
	__webpack_require__(9);
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
	            $(item).unbind("click");
	            $(item).bind("click", function () {
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
	        if (loop > 0) {
	            var url = $(item).attr("data-src");
	            var div = document.getElementById('lui_div_speak');
	            div.innerHTML = '<audio id="lui_audio_speak"><source src="' + url + '"></audio>';
	            var audio = $("#lui_audio_speak")[0];
	            audio.play();
	            if (callback) {
	                if (loop === 1) {
	                    // audio.onended=callback;
	                    var is_playFinish = setInterval(function () {
	                        if (audio.ended) {
	                            callback();
	                            window.clearInterval(is_playFinish);
	                        }
	                        setTimeout(function() {
	                            window.clearInterval(is_playFinish);
	                        }, 10000);
	                    }, 5);
	                }
	            }
	            loop--;
	        }
	        if (loop > 0) {
	            setTimeout(function () {
	                sthis.play(item, loop,interval,callback);
	            }, interval);
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
	        $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	    }else{
	        $('<div class="guide-line" style="width:'+line.width+'px;height:'+line.height+'px;background:url('+url+') no-repeat"></div>').insertBefore(document.body.firstChild);
	        $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	        $('<div class="guide-msg-pop" style="width:'+box.width+'px;height:'+box.height+'px"><span class="anchor"></span><div class="padding"><p>'+content+'</p></div><div class="button-center"><span class="get-it '+getItbutton+'">GET IT!</span></div></div>').insertBefore(document.body.firstChild);
	        if(hasimg){
	            $(".guide-msg-pop").remove();
	            $('<div class="guide-msg-pop" style="width:'+box.width+'px;height:'+box.height+'px;"><span class="anchor"></span><div class="padding"><p>'+content+'</p></div><div class="bottombutton"><span class="get-it '+getItbutton+'">GET IT!</span><img src="'+hasimg+'" alt=""></div></dvi></div>').insertBefore(document.body.firstChild);
	        }
	    }
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


/***/ },
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
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
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