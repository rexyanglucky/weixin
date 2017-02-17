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
	//发送请求调取省市县数据
	var arrS = [];//省
	var arrSs = [];//市
	var arrX = [];//县
	
	//arrS.push({ name: '北京市', id: '110000', pid: '110000' });
	//arrSs.push({ name: '北京市', id: '110000', pid: '110000' });
	//arrX.push({ name: '东城区', id: '110101', pid: '110101' });
	
	
	//机构类型的下拉
	lui.initDropDownList({ warpid: "drop_type", width: 85, nameField: 'name', idField: 'id', data: [{ name: '全部', id: '0', pid: '' }, { name: '金牌', id: '1', pid: '00' }, { name: '银牌', id: '2', pid: '00' }] });
	//合作类型的下拉
	lui.initDropDownList({ warpid: "drop_hz", width: 120, nameField: 'name', idField: 'id', data: [{ name: '金牌', id: '1', pid: '' }, { name: '银牌', id: '2', pid: '00' }] });
	//合同期限的下拉
	lui.initDropDownList({ warpid: "drop_ht", width: 70, nameField: 'name', idField: 'id', data: [{ name: '一年', id: '1', pid: '' }, { name: '二年', id: '2', pid: '00' }, { name: '三年', id: '3', pid: '00' }] });
	//签约渠道的下拉
	lui.initDropDownList({ warpid: "drop_qd1", width: 100, nameField: 'name', idField: 'id', data: [{ name: '专职销售团队', id: '1', pid: '1' }, { name: '渠道代理团队', id: '2', pid: '2' }, { name: '客户转介绍', id: '3', pid: '3' }, { name: '品牌广告吸引', id: '4', pid: '4' }] });
	lui.initDropDownList({ warpid: "drop_qd2", width: 100, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	//////省的下拉（下面）
	//lui.initDropDownList({ warpid: "drop_sheng", width: 60, nameField: 'name', idField: 'id', data: arrS });
	//////市的下拉
	//lui.initDropDownList({ warpid: "drop_shi", width: 60, nameField: 'name', idField: 'id', data: arrSs });
	//////县的下拉
	//lui.initDropDownList({ warpid: "drop_x", width: 60, nameField: 'name', idField: 'id', data: arrX });
	//区域等级的下拉
	lui.initDropDownList({ warpid: "drop_qy", width: 60, nameField: 'name', idField: 'id', data: [{ name: '一级', id: '1', pid: '1' }, { name: '二级', id: '2', pid: '2' }, { name: '三级', id: '3', pid: '3' }, { name: '四级', id: '4', pid: '4' }, { name: '县城', id: '5', pid: '5' }, { name: '乡镇', id: '6', pid: '6' }] });
	//生产源量的下拉
	lui.initDropDownList({ warpid: "drop_scy", width: 100, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	//校区数量下拉
	lui.initDropDownList({ warpid: "drop_xq", width: 90, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	//教研评级下拉12
	lui.initDropDownList({ warpid: "drop_jy", width: 60, nameField: 'name', idField: 'id', data: [{ name: 'A级', id: '1', pid: '1' }, { name: 'B级', id: '2', pid: '2' }] });
	//销售额的下拉13
	lui.initDropDownList({ warpid: "drop_xs", width: 100, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	//教师数量的下拉
	lui.initDropDownList({ warpid: "drop_js", width: 90, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	//添加机构的弹出层事件
	tool.pophide($('.eg-pop .close'), $('.eg-pop'));
	tool.popshow($('.addbtn '), $('#addorg-pop'));
	//机构详情的弹出层事件
	tool.popshow($('.see-detail '), $('#addorg-name'));
	//后台交互
	var tplTableOrg = __webpack_require__(18);
	__webpack_require__(7);
	var module = {
	    init: function () {
	        //todo 逻辑函数
	        this.render();
	        this.initBtns();
	
	    },
	
	    render: function () {
	        //加载列表
	        GetOrgData();
	
	    },
	    initBtns: function () {
	        //todo 绑定事件
	        //搜索
	        $("body").delegate("#searchImg", "click", function () {
	            GetOrgData();
	
	        });
	
	        //详情页跳转
	        $("body").delegate(".see-detail", "click", function () {
	            var dataId = $(this).attr("data-id");
	            window.location.href = "/Management/OrgManage/OrgDetail?orgId=" + dataId;
	
	        });
	        //展示完的确定的删除弹窗
	        $("body").delegate("#loginShowBtn", "click", function () {
	            $(".eg-pop .close").click();//关闭弹窗
	        });
	
	
	        $("body").delegate("#btnOk", "click", function () {
	            var jsonAdd = {};
	            var ht = $("#drop_ht").attr("title");
	            jsonAdd.OrgName = escape($("#txtorgname").val().trim());
	            jsonAdd.CoType = $("#drop_hz").attr("title");//1金牌，2银牌
	
	            switch (ht) {
	                case "一年":
	                    jsonAdd.CoYear = 1;
	                    break;
	                case "二年":
	                    jsonAdd.CoYear = 2;
	                    break;
	                case "三年":
	                    jsonAdd.CoYear = 3;
	                    break;
	
	
	                default:
	            }
	
	            jsonAdd.ChannelId = $("#drop_qd1").attr("data-id");//签约渠道
	            jsonAdd.SellerId = $("#drop_qd2").attr("data-id");//签约人
	            jsonAdd.ProvinceId = $("#drop_sheng").attr("data-id");//省
	            jsonAdd.CityId = $("#drop_shi").attr("data-id");
	            jsonAdd.CountyId = $("#drop_x").attr("data-id");
	            jsonAdd.AreaLeval = $("#drop_qy").attr("data-id");
	            jsonAdd.Students = $("#drop_scy").attr("title");//学生
	            jsonAdd.Schools = $("#drop_xq").attr("title");
	            jsonAdd.TeachType = $("#drop_jy").attr("data-id");//教研评级：1为教研A级；2为教研B级；
	            jsonAdd.Sales = $("#drop_xs").attr("title");//销售额/年
	            jsonAdd.Teachers = $("#drop_js").attr("title");//教师
	            jsonAdd.LinkMan = escape($("#txtorgcon").val());//联系人
	            jsonAdd.LinkManTel = $("#txtcontel").val();
	            jsonAdd.Addr = escape($("#txtconaddr").val());
	            jsonAdd.Remark = escape($("#txtmark").val());//备注
	            if (jsonAdd.OrgName.length < 1) {
	                alert("机构名称不能为空");
	                return;
	            }
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
	
	                    data: jsonAdd.LinkManTel, orgId: -1
	                },
	                success: function (data) {
	
	
	                    if (data.Data == "0") {
	
	                        $(".eg-pop .close").click();//关闭弹窗
	                        //提交表单
	                        $.ajax({
	                            type: "post",
	                            url: "/Management/OrgManage/AddMfgOrg",
	                            dataType: "json",
	                            data: {
	
	                                data: JSON.stringify(jsonAdd)
	                            },
	                            success: function (data) {
	                                
	                                //进行显示赋值
	                                $("#orgName").html($("#txtorgname").val().trim());//机构名不要加密过的
	                                $("#loginId").html(data.Data);//登录账号
	                                $("#loginTel").html(jsonAdd.LinkManTel);//电话
	                                $("#addorg-name").show();
	                                $('.pop-mask').show();
	                                alert(data + "添加成功");
	                                GetOrgData();//重新加载列表
	
	                            }
	                        });
	                    } else {
	                        alert("电话重复");
	                    }
	
	                }
	            });
	
	
	
	
	
	
	
	        });
	
	    }
	
	
	};
	
	var titleO = "全部";//$("#drop_type").attr("title")  定义全局变量来监听改变事件
	var dataType = "0";
	//绑定数据
	$(function () {
	    module.init();
	    OptTypeSel();
	   
	
	});
	
	
	//处理下拉列表
	function OptTypeSel() {
	    $("#drop_type li").click(function () {
	        var titleN = $(this).attr("title");
	        dataType = $(this).attr("data-id");
	
	
	        if (titleO != titleN) {
	            titleO = titleN;//重新赋值
	            GetOrgData();
	
	        }
	
	
	    });
	
	}
	
	
	//发送请求调取数据
	function GetOrgData() {
	
	    var json = {};
	    json.OrgType = dataType;//0:全部，1金牌，2银牌
	    json.KeyWord = escape($("#txtserch").val());
	    //加载机构列表
	    $.ajax({
	        type: "post",
	        url: "/Management/OrgManage/GetOrgList",
	        dataType: "json",
	        data: {
	            //OrgType: dataType,
	            //KeyWord: escape($("#txtserch").val()) //$("#tagId").val()
	            data: JSON.stringify(json)
	        },
	        success: function (data) {
	
	
	            if (data.Data && data.Data.length > 0) {
	                $("#tb").html(tplTableOrg(data.Data));
	                //$("#Totalcount").html(data.PageSum);
	                //Paginator.Paginator(10, page, data.PageSum, loadExamStu);
	                //加载咨询师列表
	                GetSData();//初始化省市数据
	
	            }
	            else {
	
	                $("#tb").html("");
	
	                //$("#tb").html('<tr  style="border:none;text-align:center;height:280px;"><td style="font-size: 16px;" colspan="8"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;"><img src="../../../bundle/img/noclass.png" style="text-align:center;"><br/><span>暂无数据！</span></div></div></td></tr>');//清空数据
	                //$("#pagination").html("");//分页控件不显示
	                //$("#Totalcount").html(0);//数据设置为0
	
	
	
	
	            }
	        }
	    });
	
	}
	
	
	var Scode = "110000";//省的代码
	var Sscode = "110000";//市
	var Xcode = "110101";//县
	var provinceData = {};//省市全部数据
	var xData = {};//县的数据
	//发送请求调取省数据
	function GetSData() {
	    var json = {};
	    json.Parent = dataType;//0:全部，1金牌，2银牌
	    json.KeyWord = escape($("#txtserch").val());
	    //加载机构列表
	    $.ajax({
	        type: "post",
	        url: "/Management/OrgManage/GetProvinceAndCity",
	        dataType: "json",
	        data: {
	            data: JSON.stringify(json)
	        },
	        success: function (data) {
	            if (data.Data && data.Data.length > 0) {
	
	                provinceData = data.Data;
	
	                for (var i = 0; i < data.Data.length; i++) {
	
	                    arrS.push({ name: data.Data[i].Name, id: data.Data[i].Code, pid: data.Data[i].Code });//省
	                }
	
	                lui.initDropDownList({ warpid: "drop_sheng", width: 60, nameField: 'name', idField: 'id', data: arrS, selectedCallBack: OptSxBind });//省
	
	                BindSx(data.Data[0].Code);
	            }
	            else {
	
	                alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	
	
	
	//校验是不是电话
	function IsMobile(obj) {
	    return (/^1[3|4|5|7|8]\d{9}$/.test(obj));
	}
	
	
	//绑定市县
	function BindSx(scode) {
	    
	    arrSs.length = 0;
	    arrX.length = 0;
	    for (var i = 0; i < provinceData.length; i++) {
	        if (provinceData[i].Code == scode) {
	            xData = provinceData[i].CityList[0].AreaList;//赋值县的数据
	            for (var j = 0; j < provinceData[i].CityList.length; j++) {
	                arrSs.push({
	                    name: provinceData[i].CityList[j].Name, id: provinceData[i].CityList[j].Code, pid: '1'
	                });//市
	            }
	
	        }
	
	    }
	
	    for (var k = 0; k < xData.length; k++) {
	        arrX.push({
	            name: xData[k].Name, id: xData[k].Code, pid: '1'
	        });//县
	
	    }
	    lui.initDropDownList({ warpid: "drop_shi", width: 60, nameField: 'name', idField: 'id', data: arrSs, selectedCallBack: OptShiBind });//市
	    lui.initDropDownList({ warpid: "drop_x", width: 60, nameField: 'name', idField: 'id', data: arrX });//县
	
	
	}
	//绑定县参数传递市的code
	function Bindx(sscode) {
	    
	    arrSs.length = 0;
	    arrX.length = 0;
	    for (var i = 0; i < provinceData.length; i++) {
	        if (provinceData[i].Code == Scode) {
	
	            for (var j = 0; j < provinceData[i].CityList.length; j++) {
	                if (provinceData[i].CityList[j].Code == sscode) {
	                    xData = provinceData[i].CityList[j].AreaList;//赋值对应的县的数据
	                    
	                }
	                
	            }
	          
	           
	        }
	
	    }
	
	    for (var k = 0; k < xData.length; k++) {
	        arrX.push({
	            name: xData[k].Name, id: xData[k].Code, pid: '1'
	        });//县
	
	    }
	    //lui.initDropDownList({ warpid: "drop_shi", width: 60, nameField: 'name', idField: 'id', data: arrSs });//市
	    lui.initDropDownList({ warpid: "drop_x", width: 60, nameField: 'name', idField: 'id', data: arrX });//县
	
	
	}
	
	//绑定事件
	function OptSxBind() {
	    Scode = $("#drop_sheng").attr("data-id");
	    
	    BindSx(Scode);
	
	}
	
	//市区的下拉点击的时候
	function OptShiBind() {
	    Sscode = $("#drop_shi").attr("data-id");
	    
	    Bindx(Sscode);
	
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/OrgManage/OrgManageList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' ';
	$each($data,function($value,$index){
	$out+=' <tr> <td>';
	$out+=$escape($value.OrgId);
	$out+='</td> <td>';
	$out+=$escape($value.OrgName);
	$out+='</td> <td>';
	$out+=$escape($value.CoType);
	$out+='</td> <td>';
	$out+=$escape($value.TeachType);
	$out+='</td> <td>';
	$out+=$escape($helpers. dateFormat($value.ExpireTime ,  "yyyy-MM-dd"));
	$out+='</td> <td>';
	$out+=$escape($value.CurrentValue);
	$out+='</td> <td> <span class="inline operatBtn see-detail" data-id="';
	$out+=$escape($value.OrgId);
	$out+='">查看详情</span> <span class="inline operatBtn ml25" data-id="';
	$out+=$escape($value.OrgId);
	$out+='">储值</span> </td> </tr> ';
	});
	return new String($out);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2JhY2tTdGFnZS9vcmctbWFuYWdlbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2x1aS5qcz9lNzkwKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2Ryb3Bkb3dubGlzdC5qcz9mZWYwKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2NoZWNrYm94LmpzPzYxNmQqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9MVUkvdG9vbC5qcz81ZTZhKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy90cGwvdGVtcGxhdGUtaGVscGVycy5qcz8xOTQzKiIsIndlYnBhY2s6Ly8vLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qcz84OTY2KioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL09yZ01hbmFnZS9PcmdNYW5hZ2VMaXN0LnRwbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2QsZ0JBQWU7QUFDZixlQUFjOztBQUVkLGNBQWEsMkNBQTJDO0FBQ3hELGVBQWMsMkNBQTJDO0FBQ3pELGNBQWEsMkNBQTJDOzs7QUFHeEQ7QUFDQSx1QkFBc0IsMkVBQTJFLCtCQUErQixHQUFHLGlDQUFpQyxHQUFHLGlDQUFpQyxHQUFHO0FBQzNNO0FBQ0EsdUJBQXNCLDBFQUEwRSwrQkFBK0IsR0FBRyxpQ0FBaUMs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QUF5QztBQUN6QyxvQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0MsbUNBQW1DO0FBQ3ZFO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsNkJBQTRCLG9DQUFvQztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDcklBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRCx1Q0FBc0MsV0FBVyxDOzs7Ozs7QUM3SmpELFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQWtDO0FBQ2xDOztBQUVBO0FBQ0EseUNBQXdDLE9BQU8sMkJBQTJCO0FBQzFFOztBQUVBO0FBQ0E7QUFDQSxzQ0FBcUMsWUFBWTtBQUNqRDtBQUNBOztBQUVBO0FBQ0EsMEJBQXlCLGlFQUFpRTtBQUMxRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQSxhQUFZLGVBQWU7QUFDM0Isa0RBQWlEO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFxQjtBQUNyQixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLEdBQUU7QUFDRixrQ0FBaUM7QUFDakMsSUFBRztBQUNILGVBQWM7QUFDZDtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBLEdBQUU7QUFDRixFQUFDLEc7Ozs7Ozs7Ozs7Ozs7OztBQzlFRDtBQUNBO0FBQ0E7QUFDQSxjQUFhLG1JQUFtSTtBQUNoSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSxFQUFDLEUiLCJmaWxlIjoiYmFja1N0YWdlL29yZy1tYW5hZ2VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjUiLCJcclxudmFyIEx1aSA9IHJlcXVpcmUoJy4uLy4uL0xVSS9qcy9sdWknKTtcclxudmFyIHRvb2wgPSByZXF1aXJlKCcuLi8uLi9MVUkvdG9vbCcpO1xyXG52YXIgbHVpID0gbmV3IEx1aSgpO1xyXG4vL+WPkemAgeivt+axguiwg+WPluecgeW4guWOv+aVsOaNrlxyXG52YXIgYXJyUyA9IFtdOy8v55yBXHJcbnZhciBhcnJTcyA9IFtdOy8v5biCXHJcbnZhciBhcnJYID0gW107Ly/ljr9cclxuXHJcbi8vYXJyUy5wdXNoKHsgbmFtZTogJ+WMl+S6rOW4gicsIGlkOiAnMTEwMDAwJywgcGlkOiAnMTEwMDAwJyB9KTtcclxuLy9hcnJTcy5wdXNoKHsgbmFtZTogJ+WMl+S6rOW4gicsIGlkOiAnMTEwMDAwJywgcGlkOiAnMTEwMDAwJyB9KTtcclxuLy9hcnJYLnB1c2goeyBuYW1lOiAn5Lic5Z+O5Yy6JywgaWQ6ICcxMTAxMDEnLCBwaWQ6ICcxMTAxMDEnIH0pO1xyXG5cclxuXHJcbi8v5py65p6E57G75Z6L55qE5LiL5ouJXHJcbmx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfdHlwZVwiLCB3aWR0aDogODUsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAn5YWo6YOoJywgaWQ6ICcwJywgcGlkOiAnJyB9LCB7IG5hbWU6ICfph5HniYwnLCBpZDogJzEnLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAn6ZO254mMJywgaWQ6ICcyJywgcGlkOiAnMDAnIH1dIH0pO1xyXG4vL+WQiOS9nOexu+Wei+eahOS4i+aLiVxyXG5sdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2h6XCIsIHdpZHRoOiAxMjAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAn6YeR54mMJywgaWQ6ICcxJywgcGlkOiAnJyB9LCB7IG5hbWU6ICfpk7bniYwnLCBpZDogJzInLCBwaWQ6ICcwMCcgfV0gfSk7XHJcbi8v5ZCI5ZCM5pyf6ZmQ55qE5LiL5ouJXHJcbmx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfaHRcIiwgd2lkdGg6IDcwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogW3sgbmFtZTogJ+S4gOW5tCcsIGlkOiAnMScsIHBpZDogJycgfSwgeyBuYW1lOiAn5LqM5bm0JywgaWQ6ICcyJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJ+S4ieW5tCcsIGlkOiAnMycsIHBpZDogJzAwJyB9XSB9KTtcclxuLy/nrb7nuqbmuKDpgZPnmoTkuIvmi4lcclxubHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9xZDFcIiwgd2lkdGg6IDEwMCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICfkuJPogYzplIDllK7lm6LpmJ8nLCBpZDogJzEnLCBwaWQ6ICcxJyB9LCB7IG5hbWU6ICfmuKDpgZPku6PnkIblm6LpmJ8nLCBpZDogJzInLCBwaWQ6ICcyJyB9LCB7IG5hbWU6ICflrqLmiLfovazku4vnu40nLCBpZDogJzMnLCBwaWQ6ICczJyB9LCB7IG5hbWU6ICflk4HniYzlub/lkYrlkLjlvJUnLCBpZDogJzQnLCBwaWQ6ICc0JyB9XSB9KTtcclxubHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9xZDJcIiwgd2lkdGg6IDEwMCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICcwMScsIGlkOiAnMDAnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJzAyJywgaWQ6ICcwMF8wMScsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICcwMycsIGlkOiAnMDBfMDInLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDQnLCBpZDogJzAwXzAxXzAxJywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJzA1JywgaWQ6ICcwMF8wMV8wMicsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNicsIGlkOiAnMDBfMDJfMDEnLCBwaWQ6ICcwMF8wMicgfSwgeyBuYW1lOiAnMDcnLCBpZDogJzAwXzAyXzAyJywgcGlkOiAnMDBfMDInIH1dIH0pO1xyXG4vLy8vLy/nnIHnmoTkuIvmi4nvvIjkuIvpnaLvvIlcclxuLy9sdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX3NoZW5nXCIsIHdpZHRoOiA2MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IGFyclMgfSk7XHJcbi8vLy8vL+W4gueahOS4i+aLiVxyXG4vL2x1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3Bfc2hpXCIsIHdpZHRoOiA2MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IGFyclNzIH0pO1xyXG4vLy8vLy/ljr/nmoTkuIvmi4lcclxuLy9sdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX3hcIiwgd2lkdGg6IDYwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogYXJyWCB9KTtcclxuLy/ljLrln5/nrYnnuqfnmoTkuIvmi4lcclxubHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9xeVwiLCB3aWR0aDogNjAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAn5LiA57qnJywgaWQ6ICcxJywgcGlkOiAnMScgfSwgeyBuYW1lOiAn5LqM57qnJywgaWQ6ICcyJywgcGlkOiAnMicgfSwgeyBuYW1lOiAn5LiJ57qnJywgaWQ6ICczJywgcGlkOiAnMycgfSwgeyBuYW1lOiAn5Zub57qnJywgaWQ6ICc0JywgcGlkOiAnNCcgfSwgeyBuYW1lOiAn5Y6/5Z+OJywgaWQ6ICc1JywgcGlkOiAnNScgfSwgeyBuYW1lOiAn5Lmh6ZWHJywgaWQ6ICc2JywgcGlkOiAnNicgfV0gfSk7XHJcbi8v55Sf5Lqn5rqQ6YeP55qE5LiL5ouJXHJcbmx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3Bfc2N5XCIsIHdpZHRoOiAxMDAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAnMDEnLCBpZDogJzAwJywgcGlkOiAnJyB9LCB7IG5hbWU6ICcwMicsIGlkOiAnMDBfMDEnLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDMnLCBpZDogJzAwXzAyJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJzA0JywgaWQ6ICcwMF8wMV8wMScsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNScsIGlkOiAnMDBfMDFfMDInLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAnMDYnLCBpZDogJzAwXzAyXzAxJywgcGlkOiAnMDBfMDInIH0sIHsgbmFtZTogJzA3JywgaWQ6ICcwMF8wMl8wMicsIHBpZDogJzAwXzAyJyB9XSB9KTtcclxuLy/moKHljLrmlbDph4/kuIvmi4lcclxubHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF94cVwiLCB3aWR0aDogOTAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAnMDEnLCBpZDogJzAwJywgcGlkOiAnJyB9LCB7IG5hbWU6ICcwMicsIGlkOiAnMDBfMDEnLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDMnLCBpZDogJzAwXzAyJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJzA0JywgaWQ6ICcwMF8wMV8wMScsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNScsIGlkOiAnMDBfMDFfMDInLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAnMDYnLCBpZDogJzAwXzAyXzAxJywgcGlkOiAnMDBfMDInIH0sIHsgbmFtZTogJzA3JywgaWQ6ICcwMF8wMl8wMicsIHBpZDogJzAwXzAyJyB9XSB9KTtcclxuLy/mlZnnoJTor4TnuqfkuIvmi4kxMlxyXG5sdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2p5XCIsIHdpZHRoOiA2MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICdB57qnJywgaWQ6ICcxJywgcGlkOiAnMScgfSwgeyBuYW1lOiAnQue6pycsIGlkOiAnMicsIHBpZDogJzInIH1dIH0pO1xyXG4vL+mUgOWUrumineeahOS4i+aLiTEzXHJcbmx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfeHNcIiwgd2lkdGg6IDEwMCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICcwMScsIGlkOiAnMDAnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJzAyJywgaWQ6ICcwMF8wMScsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICcwMycsIGlkOiAnMDBfMDInLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDQnLCBpZDogJzAwXzAxXzAxJywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJzA1JywgaWQ6ICcwMF8wMV8wMicsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNicsIGlkOiAnMDBfMDJfMDEnLCBwaWQ6ICcwMF8wMicgfSwgeyBuYW1lOiAnMDcnLCBpZDogJzAwXzAyXzAyJywgcGlkOiAnMDBfMDInIH1dIH0pO1xyXG4vL+aVmeW4iOaVsOmHj+eahOS4i+aLiVxyXG5sdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2pzXCIsIHdpZHRoOiA5MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICcwMScsIGlkOiAnMDAnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJzAyJywgaWQ6ICcwMF8wMScsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICcwMycsIGlkOiAnMDBfMDInLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDQnLCBpZDogJzAwXzAxXzAxJywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJzA1JywgaWQ6ICcwMF8wMV8wMicsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNicsIGlkOiAnMDBfMDJfMDEnLCBwaWQ6ICcwMF8wMicgfSwgeyBuYW1lOiAnMDcnLCBpZDogJzAwXzAyXzAyJywgcGlkOiAnMDBfMDInIH1dIH0pO1xyXG4vL+a3u+WKoOacuuaehOeahOW8ueWHuuWxguS6i+S7tlxyXG50b29sLnBvcGhpZGUoJCgnLmVnLXBvcCAuY2xvc2UnKSwgJCgnLmVnLXBvcCcpKTtcclxudG9vbC5wb3BzaG93KCQoJy5hZGRidG4gJyksICQoJyNhZGRvcmctcG9wJykpO1xyXG4vL+acuuaehOivpuaDheeahOW8ueWHuuWxguS6i+S7tlxyXG50b29sLnBvcHNob3coJCgnLnNlZS1kZXRhaWwgJyksICQoJyNhZGRvcmctbmFtZScpKTtcclxuLy/lkI7lj7DkuqTkupJcclxudmFyIHRwbFRhYmxlT3JnID0gcmVxdWlyZShcIk9yZ01hbmFnZS9PcmdNYW5hZ2VMaXN0LnRwbFwiKTtcclxucmVxdWlyZShcIi4uLy4uL3RwbC90ZW1wbGF0ZS1oZWxwZXJzLmpzXCIpO1xyXG52YXIgbW9kdWxlID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vdG9kbyDpgLvovpHlh73mlbBcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgICAgIHRoaXMuaW5pdEJ0bnMoKTtcclxuXHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v5Yqg6L295YiX6KGoXHJcbiAgICAgICAgR2V0T3JnRGF0YSgpO1xyXG5cclxuICAgIH0sXHJcbiAgICBpbml0QnRuczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vdG9kbyDnu5Hlrprkuovku7ZcclxuICAgICAgICAvL+aQnOe0olxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI3NlYXJjaEltZ1wiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgR2V0T3JnRGF0YSgpO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/or6bmg4XpobXot7PovaxcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIi5zZWUtZGV0YWlsXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0YUlkID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9NYW5hZ2VtZW50L09yZ01hbmFnZS9PcmdEZXRhaWw/b3JnSWQ9XCIgKyBkYXRhSWQ7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v5bGV56S65a6M55qE56Gu5a6a55qE5Yig6Zmk5by556qXXHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIjbG9naW5TaG93QnRuXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKFwiLmVnLXBvcCAuY2xvc2VcIikuY2xpY2soKTsvL+WFs+mXreW8ueeql1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIjYnRuT2tcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBqc29uQWRkID0ge307XHJcbiAgICAgICAgICAgIHZhciBodCA9ICQoXCIjZHJvcF9odFwiKS5hdHRyKFwidGl0bGVcIik7XHJcbiAgICAgICAgICAgIGpzb25BZGQuT3JnTmFtZSA9IGVzY2FwZSgkKFwiI3R4dG9yZ25hbWVcIikudmFsKCkudHJpbSgpKTtcclxuICAgICAgICAgICAganNvbkFkZC5Db1R5cGUgPSAkKFwiI2Ryb3BfaHpcIikuYXR0cihcInRpdGxlXCIpOy8vMemHkeeJjO+8jDLpk7bniYxcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAoaHQpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCLkuIDlubRcIjpcclxuICAgICAgICAgICAgICAgICAgICBqc29uQWRkLkNvWWVhciA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwi5LqM5bm0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAganNvbkFkZC5Db1llYXIgPSAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIuS4ieW5tFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGpzb25BZGQuQ29ZZWFyID0gMztcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAganNvbkFkZC5DaGFubmVsSWQgPSAkKFwiI2Ryb3BfcWQxXCIpLmF0dHIoXCJkYXRhLWlkXCIpOy8v562+57qm5rig6YGTXHJcbiAgICAgICAgICAgIGpzb25BZGQuU2VsbGVySWQgPSAkKFwiI2Ryb3BfcWQyXCIpLmF0dHIoXCJkYXRhLWlkXCIpOy8v562+57qm5Lq6XHJcbiAgICAgICAgICAgIGpzb25BZGQuUHJvdmluY2VJZCA9ICQoXCIjZHJvcF9zaGVuZ1wiKS5hdHRyKFwiZGF0YS1pZFwiKTsvL+ecgVxyXG4gICAgICAgICAgICBqc29uQWRkLkNpdHlJZCA9ICQoXCIjZHJvcF9zaGlcIikuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgIGpzb25BZGQuQ291bnR5SWQgPSAkKFwiI2Ryb3BfeFwiKS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAganNvbkFkZC5BcmVhTGV2YWwgPSAkKFwiI2Ryb3BfcXlcIikuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgIGpzb25BZGQuU3R1ZGVudHMgPSAkKFwiI2Ryb3Bfc2N5XCIpLmF0dHIoXCJ0aXRsZVwiKTsvL+WtpueUn1xyXG4gICAgICAgICAgICBqc29uQWRkLlNjaG9vbHMgPSAkKFwiI2Ryb3BfeHFcIikuYXR0cihcInRpdGxlXCIpO1xyXG4gICAgICAgICAgICBqc29uQWRkLlRlYWNoVHlwZSA9ICQoXCIjZHJvcF9qeVwiKS5hdHRyKFwiZGF0YS1pZFwiKTsvL+aVmeeglOivhOe6p++8mjHkuLrmlZnnoJRB57qn77ybMuS4uuaVmeeglELnuqfvvJtcclxuICAgICAgICAgICAganNvbkFkZC5TYWxlcyA9ICQoXCIjZHJvcF94c1wiKS5hdHRyKFwidGl0bGVcIik7Ly/plIDllK7pop0v5bm0XHJcbiAgICAgICAgICAgIGpzb25BZGQuVGVhY2hlcnMgPSAkKFwiI2Ryb3BfanNcIikuYXR0cihcInRpdGxlXCIpOy8v5pWZ5biIXHJcbiAgICAgICAgICAgIGpzb25BZGQuTGlua01hbiA9IGVzY2FwZSgkKFwiI3R4dG9yZ2NvblwiKS52YWwoKSk7Ly/ogZTns7vkurpcclxuICAgICAgICAgICAganNvbkFkZC5MaW5rTWFuVGVsID0gJChcIiN0eHRjb250ZWxcIikudmFsKCk7XHJcbiAgICAgICAgICAgIGpzb25BZGQuQWRkciA9IGVzY2FwZSgkKFwiI3R4dGNvbmFkZHJcIikudmFsKCkpO1xyXG4gICAgICAgICAgICBqc29uQWRkLlJlbWFyayA9IGVzY2FwZSgkKFwiI3R4dG1hcmtcIikudmFsKCkpOy8v5aSH5rOoXHJcbiAgICAgICAgICAgIGlmIChqc29uQWRkLk9yZ05hbWUubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoXCLmnLrmnoTlkI3np7DkuI3og73kuLrnqbpcIik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGpzb25BZGQuTGlua01hbi5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuacuuaehOiBlOezu+S6uuS4jeiDveS4uuepulwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoanNvbkFkZC5MaW5rTWFuVGVsLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi5py65p6E55S16K+d5LiN6IO95Li656m6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+agoemqjOeUteivnVxyXG4gICAgICAgICAgICBpZiAoIUlzTW9iaWxlKGpzb25BZGQuTGlua01hblRlbCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhbGVydChcIueUteivneagvOW8j+S4jeWvuVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAvL+aPkOS6pOihqOWNlVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL01hbmFnZW1lbnQvT3JnTWFuYWdlL0NoZWNrT3JnUGhvbmVcIixcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YToganNvbkFkZC5MaW5rTWFuVGVsLCBvcmdJZDogLTFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuRGF0YSA9PSBcIjBcIikge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5lZy1wb3AgLmNsb3NlXCIpLmNsaWNrKCk7Ly/lhbPpl63lvLnnqpdcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/mj5DkuqTooajljZVcclxuICAgICAgICAgICAgICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiBcIi9NYW5hZ2VtZW50L09yZ01hbmFnZS9BZGRNZmdPcmdcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoanNvbkFkZClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6L+b6KGM5pi+56S66LWL5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNvcmdOYW1lXCIpLmh0bWwoJChcIiN0eHRvcmduYW1lXCIpLnZhbCgpLnRyaW0oKSk7Ly/mnLrmnoTlkI3kuI3opoHliqDlr4bov4fnmoRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2xvZ2luSWRcIikuaHRtbChkYXRhLkRhdGEpOy8v55m75b2V6LSm5Y+3XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNsb2dpblRlbFwiKS5odG1sKGpzb25BZGQuTGlua01hblRlbCk7Ly/nlLXor51cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2FkZG9yZy1uYW1lXCIpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcucG9wLW1hc2snKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YSArIFwi5re75Yqg5oiQ5YqfXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdldE9yZ0RhdGEoKTsvL+mHjeaWsOWKoOi9veWIl+ihqFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLnlLXor53ph43lpI1cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5cclxudmFyIHRpdGxlTyA9IFwi5YWo6YOoXCI7Ly8kKFwiI2Ryb3BfdHlwZVwiKS5hdHRyKFwidGl0bGVcIikgIOWumuS5ieWFqOWxgOWPmOmHj+adpeebkeWQrOaUueWPmOS6i+S7tlxyXG52YXIgZGF0YVR5cGUgPSBcIjBcIjtcclxuLy/nu5HlrprmlbDmja5cclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICBtb2R1bGUuaW5pdCgpO1xyXG4gICAgT3B0VHlwZVNlbCgpO1xyXG4gICBcclxuXHJcbn0pO1xyXG5cclxuXHJcbi8v5aSE55CG5LiL5ouJ5YiX6KGoXHJcbmZ1bmN0aW9uIE9wdFR5cGVTZWwoKSB7XHJcbiAgICAkKFwiI2Ryb3BfdHlwZSBsaVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRpdGxlTiA9ICQodGhpcykuYXR0cihcInRpdGxlXCIpO1xyXG4gICAgICAgIGRhdGFUeXBlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuXHJcblxyXG4gICAgICAgIGlmICh0aXRsZU8gIT0gdGl0bGVOKSB7XHJcbiAgICAgICAgICAgIHRpdGxlTyA9IHRpdGxlTjsvL+mHjeaWsOi1i+WAvFxyXG4gICAgICAgICAgICBHZXRPcmdEYXRhKCk7XHJcblxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuLy/lj5HpgIHor7fmsYLosIPlj5bmlbDmja5cclxuZnVuY3Rpb24gR2V0T3JnRGF0YSgpIHtcclxuXHJcbiAgICB2YXIganNvbiA9IHt9O1xyXG4gICAganNvbi5PcmdUeXBlID0gZGF0YVR5cGU7Ly8wOuWFqOmDqO+8jDHph5HniYzvvIwy6ZO254mMXHJcbiAgICBqc29uLktleVdvcmQgPSBlc2NhcGUoJChcIiN0eHRzZXJjaFwiKS52YWwoKSk7XHJcbiAgICAvL+WKoOi9veacuuaehOWIl+ihqFxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICB1cmw6IFwiL01hbmFnZW1lbnQvT3JnTWFuYWdlL0dldE9yZ0xpc3RcIixcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAvL09yZ1R5cGU6IGRhdGFUeXBlLFxyXG4gICAgICAgICAgICAvL0tleVdvcmQ6IGVzY2FwZSgkKFwiI3R4dHNlcmNoXCIpLnZhbCgpKSAvLyQoXCIjdGFnSWRcIikudmFsKClcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoanNvbilcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuRGF0YSAmJiBkYXRhLkRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgJChcIiN0YlwiKS5odG1sKHRwbFRhYmxlT3JnKGRhdGEuRGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgLy8kKFwiI1RvdGFsY291bnRcIikuaHRtbChkYXRhLlBhZ2VTdW0pO1xyXG4gICAgICAgICAgICAgICAgLy9QYWdpbmF0b3IuUGFnaW5hdG9yKDEwLCBwYWdlLCBkYXRhLlBhZ2VTdW0sIGxvYWRFeGFtU3R1KTtcclxuICAgICAgICAgICAgICAgIC8v5Yqg6L295ZKo6K+i5biI5YiX6KGoXHJcbiAgICAgICAgICAgICAgICBHZXRTRGF0YSgpOy8v5Yid5aeL5YyW55yB5biC5pWw5o2uXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICQoXCIjdGJcIikuaHRtbChcIlwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyQoXCIjdGJcIikuaHRtbCgnPHRyICBzdHlsZT1cImJvcmRlcjpub25lO3RleHQtYWxpZ246Y2VudGVyO2hlaWdodDoyODBweDtcIj48dGQgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7XCIgY29sc3Bhbj1cIjhcIj48ZGl2IGNsYXNzPVwiZGF0YV9pbWdcIj48ZGl2IGNsYXNzPVwiYmlnX2FyZWFcIiBzdHlsZT1cIm1hcmdpbi10b3A6MTBweDtsaW5lLWhlaWdodDozMHB4O1wiPjxpbWcgc3JjPVwiLi4vLi4vLi4vYnVuZGxlL2ltZy9ub2NsYXNzLnBuZ1wiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7XCI+PGJyLz48c3Bhbj7mmoLml6DmlbDmja7vvIE8L3NwYW4+PC9kaXY+PC9kaXY+PC90ZD48L3RyPicpOy8v5riF56m65pWw5o2uXHJcbiAgICAgICAgICAgICAgICAvLyQoXCIjcGFnaW5hdGlvblwiKS5odG1sKFwiXCIpOy8v5YiG6aG15o6n5Lu25LiN5pi+56S6XHJcbiAgICAgICAgICAgICAgICAvLyQoXCIjVG90YWxjb3VudFwiKS5odG1sKDApOy8v5pWw5o2u6K6+572u5Li6MFxyXG5cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcbnZhciBTY29kZSA9IFwiMTEwMDAwXCI7Ly/nnIHnmoTku6PnoIFcclxudmFyIFNzY29kZSA9IFwiMTEwMDAwXCI7Ly/luIJcclxudmFyIFhjb2RlID0gXCIxMTAxMDFcIjsvL+WOv1xyXG52YXIgcHJvdmluY2VEYXRhID0ge307Ly/nnIHluILlhajpg6jmlbDmja5cclxudmFyIHhEYXRhID0ge307Ly/ljr/nmoTmlbDmja5cclxuLy/lj5HpgIHor7fmsYLosIPlj5bnnIHmlbDmja5cclxuZnVuY3Rpb24gR2V0U0RhdGEoKSB7XHJcbiAgICB2YXIganNvbiA9IHt9O1xyXG4gICAganNvbi5QYXJlbnQgPSBkYXRhVHlwZTsvLzA65YWo6YOo77yMMemHkeeJjO+8jDLpk7bniYxcclxuICAgIGpzb24uS2V5V29yZCA9IGVzY2FwZSgkKFwiI3R4dHNlcmNoXCIpLnZhbCgpKTtcclxuICAgIC8v5Yqg6L295py65p6E5YiX6KGoXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgIHVybDogXCIvTWFuYWdlbWVudC9PcmdNYW5hZ2UvR2V0UHJvdmluY2VBbmRDaXR5XCIsXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoanNvbilcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLkRhdGEgJiYgZGF0YS5EYXRhLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICBwcm92aW5jZURhdGEgPSBkYXRhLkRhdGE7XHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLkRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyUy5wdXNoKHsgbmFtZTogZGF0YS5EYXRhW2ldLk5hbWUsIGlkOiBkYXRhLkRhdGFbaV0uQ29kZSwgcGlkOiBkYXRhLkRhdGFbaV0uQ29kZSB9KTsvL+ecgVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3Bfc2hlbmdcIiwgd2lkdGg6IDYwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogYXJyUywgc2VsZWN0ZWRDYWxsQmFjazogT3B0U3hCaW5kIH0pOy8v55yBXHJcblxyXG4gICAgICAgICAgICAgICAgQmluZFN4KGRhdGEuRGF0YVswXS5Db2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuiOt+WPluaVsOaNruWksei0pVwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcbi8v5qCh6aqM5piv5LiN5piv55S16K+dXHJcbmZ1bmN0aW9uIElzTW9iaWxlKG9iaikge1xyXG4gICAgcmV0dXJuICgvXjFbM3w0fDV8N3w4XVxcZHs5fSQvLnRlc3Qob2JqKSk7XHJcbn1cclxuXHJcblxyXG4vL+e7keWumuW4guWOv1xyXG5mdW5jdGlvbiBCaW5kU3goc2NvZGUpIHtcclxuICAgIFxyXG4gICAgYXJyU3MubGVuZ3RoID0gMDtcclxuICAgIGFyclgubGVuZ3RoID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvdmluY2VEYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHByb3ZpbmNlRGF0YVtpXS5Db2RlID09IHNjb2RlKSB7XHJcbiAgICAgICAgICAgIHhEYXRhID0gcHJvdmluY2VEYXRhW2ldLkNpdHlMaXN0WzBdLkFyZWFMaXN0Oy8v6LWL5YC85Y6/55qE5pWw5o2uXHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcHJvdmluY2VEYXRhW2ldLkNpdHlMaXN0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJTcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBwcm92aW5jZURhdGFbaV0uQ2l0eUxpc3Rbal0uTmFtZSwgaWQ6IHByb3ZpbmNlRGF0YVtpXS5DaXR5TGlzdFtqXS5Db2RlLCBwaWQ6ICcxJ1xyXG4gICAgICAgICAgICAgICAgfSk7Ly/luIJcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgeERhdGEubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICBhcnJYLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiB4RGF0YVtrXS5OYW1lLCBpZDogeERhdGFba10uQ29kZSwgcGlkOiAnMSdcclxuICAgICAgICB9KTsvL+WOv1xyXG5cclxuICAgIH1cclxuICAgIGx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3Bfc2hpXCIsIHdpZHRoOiA2MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IGFyclNzLCBzZWxlY3RlZENhbGxCYWNrOiBPcHRTaGlCaW5kIH0pOy8v5biCXHJcbiAgICBsdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX3hcIiwgd2lkdGg6IDYwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogYXJyWCB9KTsvL+WOv1xyXG5cclxuXHJcbn1cclxuLy/nu5Hlrprljr/lj4LmlbDkvKDpgJLluILnmoRjb2RlXHJcbmZ1bmN0aW9uIEJpbmR4KHNzY29kZSkge1xyXG4gICAgXHJcbiAgICBhcnJTcy5sZW5ndGggPSAwO1xyXG4gICAgYXJyWC5sZW5ndGggPSAwO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm92aW5jZURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAocHJvdmluY2VEYXRhW2ldLkNvZGUgPT0gU2NvZGUpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcHJvdmluY2VEYXRhW2ldLkNpdHlMaXN0Lmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvdmluY2VEYXRhW2ldLkNpdHlMaXN0W2pdLkNvZGUgPT0gc3Njb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeERhdGEgPSBwcm92aW5jZURhdGFbaV0uQ2l0eUxpc3Rbal0uQXJlYUxpc3Q7Ly/otYvlgLzlr7nlupTnmoTljr/nmoTmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBcclxuICAgICAgICAgICBcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgeERhdGEubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICBhcnJYLnB1c2goe1xyXG4gICAgICAgICAgICBuYW1lOiB4RGF0YVtrXS5OYW1lLCBpZDogeERhdGFba10uQ29kZSwgcGlkOiAnMSdcclxuICAgICAgICB9KTsvL+WOv1xyXG5cclxuICAgIH1cclxuICAgIC8vbHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9zaGlcIiwgd2lkdGg6IDYwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogYXJyU3MgfSk7Ly/luIJcclxuICAgIGx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfeFwiLCB3aWR0aDogNjAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBhcnJYIH0pOy8v5Y6/XHJcblxyXG5cclxufVxyXG5cclxuLy/nu5Hlrprkuovku7ZcclxuZnVuY3Rpb24gT3B0U3hCaW5kKCkge1xyXG4gICAgU2NvZGUgPSAkKFwiI2Ryb3Bfc2hlbmdcIikuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICBcclxuICAgIEJpbmRTeChTY29kZSk7XHJcblxyXG59XHJcblxyXG4vL+W4guWMuueahOS4i+aLieeCueWHu+eahOaXtuWAmVxyXG5mdW5jdGlvbiBPcHRTaGlCaW5kKCkge1xyXG4gICAgU3Njb2RlID0gJChcIiNkcm9wX3NoaVwiKS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgIFxyXG4gICAgQmluZHgoU3Njb2RlKTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2JhY2tTdGFnZS9vcmctbWFuYWdlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDE5IiwidmFyIEx1aURyb3BEb3duTGlzdCA9IHJlcXVpcmUoJy4uL2pzL2Ryb3Bkb3dubGlzdCcpO1xyXG52YXIgTHVpQ2hlY2tCb3ggPSByZXF1aXJlKCcuLi9qcy9jaGVja2JveCcpO1xyXG5cclxuZnVuY3Rpb24gTHVpKCkge1xyXG4gICAgLy90aGlzLmNoZWNrQm94ID0gbnVsbDtcclxuICAgIC8vIHRoaXMuaW5pdFdvcmRTcGVhaygpO1xyXG59O1xyXG5cclxuTHVpLnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWksXHJcbiAgICBpbml0VHJlZTogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICB2YXIgdCA9IG5ldyBMdWlUcmVlKCk7XHJcbiAgICAgICAgcmV0dXJuIHQuaW5pdChwKTtcclxuICAgIH0sXHJcbiAgICBpbml0RHJvcERvd25MaXN0OiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHZhciBkID0gbmV3IEx1aURyb3BEb3duTGlzdCgpO1xyXG4gICAgICAgIHJldHVybiBkLmluaXQocCk7XHJcbiAgICB9LFxyXG4gICAgaW5pdENoZWNrQm94OiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIC8v77+977+977+977+90rvvv73vv73vv73vv73vv73vv73vv73vv73Iq++/vda177+9Y2hlY2tib3jvv73vv73vv73vv71cclxuICAgICAgICBpZiAoIXRoaXMuY2hlY2tCb3gpIHtcclxuICAgICAgICAgICAgdGhpcy5jaGVja0JveCA9IG5ldyBMdWlDaGVja0JveCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IG5ldyBMdWlDaGVja0JveCgpO1xyXG4gICAgICAgIHJldHVybiBjLmluaXQocCk7XHJcblxyXG4gICAgfSxcclxuICAgIGluaXRXb3JkU3BlYWs6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgLy/vv73vv73vv73vv73Su++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vcir77+91rXvv713b3Jkc3BlYWvvv73vv73vv73vv71cclxuICAgICAgICBpZiAoIXRoaXMud29yZHNwZWFrKSB7XHJcbiAgICAgICAgICAgIHRoaXMud29yZHNwZWFrID0gbmV3IEx1aVdvcmRTcGVhaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgYyA9IG5ldyBMdWlXb3JkU3BlYWsoKTtcclxuICAgICAgICByZXR1cm4gYy5pbml0KHApO1xyXG4gICAgfVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMdWk7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9sdWkuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJmdW5jdGlvbiBMdWlEcm9wRG93bkxpc3QoKSB7XHJcbiAgICB0aGlzLnBhcmFtID0gbnVsbDtcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBcIlwiO1xyXG59XHJcbnZhciBkcm9wY291bnQgPSAxMDAwO1xyXG5MdWlEcm9wRG93bkxpc3QucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aURyb3BEb3duTGlzdCxcclxuICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSB0aGlzLndhcnBpZCA9IFwiI1wiICsgcGFyYW0ud2FycGlkO1xyXG4gICAgICAgIHZhciB3YXJwaWQgPSBwYXJhbS53YXJwaWQ7XHJcbiAgICAgICAgaWYgKCFwYXJhbS5kYXRhKSB7IHJldHVybjsgfVxyXG4gICAgICAgIHZhciBkYXRhID0gcGFyYW0uZGF0YTtcclxuXHJcbiAgICAgICAgdmFyIHdpZHRoID0gcGFyYW0ud2lkdGggPSBwYXJhbS53aWR0aCB8fCAxODA7XHJcbiAgICAgICAgdmFyIGhlaWdodCA9IHBhcmFtLmhlaWdodCA9IHBhcmFtLmhlaWdodCB8fCAyMDA7XHJcbiAgICAgICAgdmFyIHN1YnRleHRsZW5ndGggPSBwYXJhbS5zdWJ0ZXh0bGVuZ3RoID0gcGFyYW0uc3VidGV4dGxlbmd0aCB8fCA1O1xyXG4gICAgICAgIHBhcmFtLnZhbHVlRmllbGQgPSBwYXJhbS52YWx1ZUZpZWxkIHx8IFwiaWRcIjtcclxuICAgICAgICBwYXJhbS50ZXh0RmllbGQgPSBwYXJhbS50ZXh0RmllbGQgfHwgXCJuYW1lXCI7XHJcbiAgICAgICAgdmFyIHZhbHVlRmllbGQgPSBwYXJhbS52YWx1ZUZpZWxkO1xyXG4gICAgICAgIHZhciB0ZXh0RmllbGQgPSBwYXJhbS50ZXh0RmllbGQ7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkQ2FsbEJhY2sgPSBwYXJhbS5zZWxlY3RlZENhbGxCYWNrO1xyXG4gICAgICAgIHZhciBsb2FkZWRDYWxsQmFjayA9IHBhcmFtLmxvYWRlZENhbGxCYWNrO1xyXG4gICAgICAgIHZhciB6aW5kZXggPSBwYXJhbS56aW5kZXg7XHJcbiAgICAgICAgaWYgKHBhcmFtLmRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBkID0ge307XHJcbiAgICAgICAgICAgIGRbdmFsdWVGaWVsZF0gPSAtMTtcclxuICAgICAgICAgICAgZFt0ZXh0RmllbGRdID0gXCJcIjtcclxuICAgICAgICAgICAgZGF0YS5wdXNoKGQpO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSAwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/orr7nva7pu5jorqTlgLxcclxuICAgICAgICB2YXIgZGVmYXVsdFZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IGRhdGFbMF1bdmFsdWVGaWVsZF07XHJcbiAgICAgICAgdmFyIGRlZmF1bHRUZXh0ID0gcGFyYW0uZGVmYXVsdFRleHQgPSBwYXJhbS5kZWZhdWx0VmFsdWUgfHwgZGF0YVswXVt0ZXh0RmllbGRdO1xyXG4gICAgICAgIHRoaXMucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICB2YXIgdWxIdG1sID0gXCI8ZGl2IGNsYXNzPSdkcm9wZGl2IGRuJz5cIjtcclxuICAgICAgICB1bEh0bWwgKz0gJyAgPHVsIGNsYXNzPVwiZHJvcHVsXCIgc3R5bGU9XCJtYXgtaGVpZ2h0OicgKyBoZWlnaHQgKyAncHg7b3ZlcmZsb3c6YXV0bztcIiBkYXRhLWlkPVwiJyArIGRlZmF1bHRWYWx1ZSArICdcIiBkYXRhLW5hbWU9XCInICsgZGVmYXVsdFRleHQgKyAnXCI+JztcclxuXHJcbiAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBkYXRhLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gZGF0YVtrXTtcclxuICAgICAgICAgICAgdmFyIHYgPSBpdGVtW3RleHRGaWVsZF0ubGVuZ3RoID4gc3VidGV4dGxlbmd0aCA/IGl0ZW1bdGV4dEZpZWxkXS5zdWJzdHJpbmcoMCwgc3VidGV4dGxlbmd0aCkgKyBcIi4uLlwiIDogaXRlbVt0ZXh0RmllbGRdO1xyXG4gICAgICAgICAgICB2YXIgaXRlbUh0bWwgPSAnPGxpIHRpdGxlPScgKyBpdGVtW3RleHRGaWVsZF0gKyAnIGRhdGEtaW5kZXg9JyArIGsgKyAnIGRhdGEtaWQ9JyArIGl0ZW1bdmFsdWVGaWVsZF0gKyAnIGRhdGEtdGFnPVxcJycgKyBKU09OLnN0cmluZ2lmeShkYXRhW2tdKSArICdcXCc+JyArIHYgKyAnPC9saT4nO1xyXG4gICAgICAgICAgICB1bEh0bWwgKz0gaXRlbUh0bWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHVsSHRtbCArPSBcIjwvdWw+XCI7XHJcbiAgICAgICAgdWxIdG1sICs9IFwiPC9kaXY+XCI7XHJcbiAgICAgICAgdmFyIHNwYW5IdG1sID0gJyA8c3BhbiBzdHlsZT1cIndpZHRoOiAnICsgd2lkdGggKyAncHg7XCIgY2xhc3M9XCJkaWJcIj48c3BhbiBkYXRhLXR5cGU9XCJkcm9wZG93bmxpc3RfZHJvcF9zcGFuXCIgaWQ9XCJzcGFuJyArIHBhcmFtLndhcnBpZCArICdcIj4nICsgZGVmYXVsdFRleHQgKyAnPC9zcGFuPiA8aSBjbGFzcz1cIm51bV9kb3duXCI+PC9pPjwvc3Bhbj4nO1xyXG5cclxuICAgICAgICB2YXIgY29uID0gJChcIiNcIiArIHdhcnBpZCk7XHJcbiAgICAgICAgY29uLmNzcyh7IHdpZHRoOiB3aWR0aCB9KTtcclxuICAgICAgICBjb24uYWRkQ2xhc3MoXCJsdWlfZHJvcGRvd25saXN0XCIpO1xyXG4gICAgICAgIGNvbi5odG1sKHNwYW5IdG1sKTtcclxuICAgICAgICBjb24uYXBwZW5kKHVsSHRtbCk7XHJcbiAgICAgICAgaWYgKHppbmRleCkge1xyXG4gICAgICAgICAgICBjb24uZmluZChcIi5kcm9wZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgemluZGV4KTtcclxuICAgICAgICAgICAgY29uLmF0dHIoXCJ6aW5kZXhcIiwgemluZGV4KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBjb24uZmluZChcIi5kcm9wZGl2XCIpLmNzcyhcInotaW5kZXhcIiwgZHJvcGNvdW50LS0pO1xyXG4gICAgICAgICAgICAvLyBjb24uYXR0cihcInppbmRleFwiLCBkcm9wY291bnQgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uLmFkZENsYXNzKFwiYnRuX251bV91cGRvd25cIikuYWRkQ2xhc3MoXCJidG5fbnVtX3VwZG93bjFcIikuYWRkQ2xhc3MoXCJkaWJcIik7XHJcbiAgICAgICAgY29uLmF0dHIoXCJ0aXRsZVwiLCBkZWZhdWx0VGV4dCk7XHJcbiAgICAgICAgY29uLmF0dHIoXCJkYXRhLWlkXCIsIGRlZmF1bHRWYWx1ZSk7XHJcblxyXG4gICAgICAgIHZhciB1bCA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiB1bFwiKTtcclxuICAgICAgICB2YXIgZHJvcGRpdiA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiAuZHJvcGRpdlwiKTtcclxuICAgICAgICB2YXIgbGkgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgdWwgbGlcIik7XHJcbiAgICAgICAgdmFyIHNwYW4gPSBjb24uZmluZChcInNwYW5bZGF0YS10eXBlPSdkcm9wZG93bmxpc3RfZHJvcF9zcGFuJ11cIik7XHJcbiAgICAgICAgLy/kuovku7ZcclxuICAgICAgICAvL+S4i+aLieS6i+S7tlxyXG4gICAgICAgIGNvbi5jbGljayhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodWwuaXMoXCI6dmlzaWJsZVwiKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRpdi5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLmRyb3BkaXZcIikuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAgICAgLy8gZHJvcGRpdi5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAvLyB1bC5zbGlkZURvd24oMjAwKTtcclxuICAgICAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVEb3duKDIwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCJib2R5XCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAkKFwiLmRyb3BkaXZcIikuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gY29uLm1vdXNlbGVhdmUoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAvLyAgICAgdWwuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIC8v6YCJ5Lit5LqL5Lu2XHJcbiAgICAgICAgbGkuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9ICQodGhpcykuYXR0cihcImRhdGEtaWRcIik7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFRleHQgPSAkKHRoaXMpLmh0bWwoKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSnNvbiA9ICQodGhpcykuYXR0cihcImRhdGEtam9zblwiKTtcclxuICAgICAgICAgICAgdmFyIGFsbHRpdGxlID0gJCh0aGlzKS5hdHRyKFwidGl0bGVcIik7XHJcbiAgICAgICAgICAgIHNwYW4udGV4dChzZWxlY3RlZFRleHQpO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWlkXCIsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWpzb25cIiwgc2VsZWN0ZWRKc29uKTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwidGl0bGVcIiwgYWxsdGl0bGUpO1xyXG5cclxuICAgICAgICAgICAgY29uLmF0dHIoXCJ0aXRsZVwiLCBhbGx0aXRsZSk7XHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwiZGF0YS1pZFwiLCBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgLy/pgInkuK3lm57osIPkuovku7ZcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkQ2FsbEJhY2spIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2FsbEJhY2sod2FycGlkLCBzZWxlY3RlZFZhbHVlLCBhbGx0aXRsZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJvcGRpdi5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5zcGFuID0gc3BhbjtcclxuICAgICAgICAvL+iuvue9rum7mOiupOWAvFxyXG4gICAgICAgIHRoaXMuc2V0VmFsdWUoZGVmYXVsdFZhbHVlKTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH0sXHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHNwYW4uYXR0cihcImRhdGEtaWRcIiksIHRleHQ6IHNwYW4uYXR0cihcInRpdGxlXCIpLCB6aW5kZXg6ICQodGhpcy5zZWxlY3RvcikuYXR0cihcInppbmRleFwiKSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IC0xLCB0ZXh0OiBcIlwiIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvL+aatOmcsue7meWklumDqOeahOaWueazlVxyXG4gICAgZ2V0U2VsZWN0ZWRKc29uVmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHNwYW4uYXR0cihcImRhdGEtanNvblwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICB2YXIgdGV4dHNlbCA9IFwiXCI7XHJcbiAgICAgICAgLy/pgInkuK3nmoTlgLxcclxuICAgICAgICB2YXIgc2VsSXRlbTtcclxuICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICBmb3IgKHZhciBtID0gMDsgbSA8IHRoaXMucGFyYW0uZGF0YS5sZW5ndGg7IG0rKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbXNlbCA9IHRoaXMucGFyYW0uZGF0YVttXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zZWxbdGhpcy5wYXJhbS52YWx1ZUZpZWxkXSA9PSB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGV4dHNlbCA9IGl0ZW1zZWxbdGhpcy5wYXJhbS50ZXh0RmllbGRdO1xyXG4gICAgICAgICAgICAgICAgc2VsSXRlbSA9IGl0ZW1zZWw7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWlkXCIsIHZhbHVlKTtcclxuICAgICAgICBzcGFuLmF0dHIoXCJkYXRhLWpzb25cIiwgSlNPTi5zdHJpbmdpZnkoc2VsSXRlbSkpO1xyXG4gICAgICAgIHNwYW4uYXR0cihcInRpdGxlXCIsIHRleHRzZWwpO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuYXR0cihcInRpdGxlXCIsIHRleHRzZWwpO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9IHRleHRzZWw7XHJcbiAgICAgICAgdmFyIHYgPSB0ZXh0c2VsLmxlbmd0aCA+IHRoaXMucGFyYW0uc3VidGV4dGxlbmd0aCA/IHRleHRzZWwuc3Vic3RyaW5nKDAsIHRoaXMucGFyYW0uc3VidGV4dGxlbmd0aCkgKyBcIi4uLlwiIDogdGV4dHNlbDtcclxuICAgICAgICBzcGFuLnRleHQodik7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmxvYWRlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFyYW0ubG9hZGVkQ2FsbEJhY2soY29udGFpbmVySWQsIHNlbGVjdGVkVmFsdWUsIHNlbGVjdGVkVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuXHJcbn07XHJcbm1vZHVsZS5leHBvcnRzID0gTHVpRHJvcERvd25MaXN0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9kcm9wZG93bmxpc3QuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJcclxuZnVuY3Rpb24gTHVpQ2hlY2tCb3goKSB7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gXCJsdWljaGVja1wiO1xyXG4gICAgLy/lj4LmlbBcclxuICAgIHRoaXMucGFyYW0gPSB7fTtcclxufVxyXG5cclxuTHVpQ2hlY2tCb3gucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aUNoZWNrQm94LFxyXG4gICAgLypcclxuICAgICAqd2FycGlkIOWuueWZqGlkXHJcbiAgICAgKmRhdGEg5pWw5o2u6ZuG77yManNvbiDkuLIgW3tuYW1lOnJleCx2YWw6MDAxfSx7bmFtZTpsaWxlaSx2YWw6MDAyfV1cclxuICAgICAq5bGV56S65a2X5q61ICAgdGV4dEZpZWxkXHJcbiAgICAgKuWunumZheWAvOWtl+autSB2YWx1ZUZpZWxkXHJcbiAgICAgKuWbnuiwg+WHveaVsCBjYWxsYmFjayDlj4LmlbDkuLrlvZPliY3op6blj5HnmoTlpI3pgInmoYbkuIrnu5HlrprnmoTmlbDmja5cclxuICAgICAqL1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgdmFyIGN0aGlzID0gdGhpcztcclxuICAgICAgICBpZiAocGFyYW0gJiYgcGFyYW0uZ3JvdXApIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9ICdsdWljaGVja1tkYXRhLW5hbWU9XCInICsgcGFyYW0uZ3JvdXAgKyAnXCJdJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2tTdHlsZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKSA9PSAxID8gXCJjaGVja19zZWxcIiA6IFwiXCI7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrc2hvdyA9ICQoaXRlbSkuYXR0cihcImRhdGEtc2hvd2NoZWNrYm94XCIpICE9IDE7XHJcblxyXG4gICAgICAgICAgICB2YXIgdGV4dCA9ICQoaXRlbSkuYXR0cihcImRhdGEtdGV4dFwiKTtcclxuICAgICAgICAgICAgdmFyIGggPSAnPGkgY2xhc3M9XCJpY29uX2NoZWNrICcgKyBpc2NoZWNrU3R5bGUgKyAnIFwiPjwvaT4nO1xyXG4gICAgICAgICAgICB2YXIgcyA9ICc8c3BhbiBjbGFzcz1cImNoZWNrX3RleHRcIiAgb25zZWxlY3RzdGFydD1cInJldHVybiBmYWxzZTtcIiA+JyArIHRleHQgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgICAgIGggPSBpc2NoZWNrc2hvdyA/IGggKyBzIDogcztcclxuICAgICAgICAgICAgLy8gaWYgKCQoaXRlbSkuZmluZChcImljb25fY2hlY2tcIikubGVuZ3RoID4gMCB8fCAkKGl0ZW0pLmZpbmQoXCJjaGVja190ZXh0XCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgJChpdGVtKS5odG1sKGgpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNzcyh7IFwiY3Vyc29yXCI6IFwicG9pbnRlclwiIH0pO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmJpbmQoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19zZWxcIikuYWRkQ2xhc3MoXCJjaGVja19kZWZcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19kZWZcIikuYWRkQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBhbGVydChcImJpbmRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW0mJnBhcmFtLmNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdyb3VwbmFtZSA9ICQoaXRlbSkuYXR0cihcImRhdGEtbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gY3RoaXMuZ2V0SnNvblZhbHVlKGdyb3VwbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/osIPnlKjlm57osIPlh73mlbDvvIzlubbov5Tlm57nu4TlkI3lkozmiYDpgInkuK3lgLzlvpdqc29u5LiyXHJcbiAgICAgICAgICAgICAgICAgICAgLy9wYXJhbS5jYWxsYmFjayhncm91cG5hbWUsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uY2FsbGJhY2soaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuXHJcblxyXG4gICAgfSxcclxuICAgIC8v6K6+572uY2hlY2tib3jnu4Tlk6rkupvlgLzooqvpgInkuK1cclxuICAgIHNldFZhbHVlOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5maWx0ZXIoJ1tkYXRhLXZhbD1cIicgKyB2YWwgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoaXRlbSkuY2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlmNoZWNrYm9457uE6YCJ5Lit55qE5YC8XHJcbiAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICByLnB1c2goJChpdGVtKS5hdHRyKFwiZGF0YS12YWxcIikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBhbGVydChyLmpvaW4oJywnKSk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5ZjaGVja2JveOe7hOmAieS4reeahOWAvFxyXG4gICAgZ2V0SnNvblZhbHVlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGpzb25zdHIgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWpzb25cIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvbnN0cikge1xyXG4gICAgICAgICAgICAgICAgICAgIHIucHVzaChKU09OLnBhcnNlKHVuZXNjYXBlKGpzb25zdHIpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcjtcclxuICAgIH0sXHJcbiAgICAvKirliKTmlq3lvZPliY0gY2hlY2tib3gg5piv5ZCm6YCJ5LitICovXHJcbiAgICBpc2NoZWNrOiBmdW5jdGlvbiAobmFtZSwgdmFsKSB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmZpbHRlcignW2RhdGEtdmFsPVwiJyArIHZhbCArICdcIl0nKVswXTtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICByZXR1cm4gaXNjaGVjayA9PSAxO1xyXG4gICAgfSxcclxuICAgIC8qKuWIpOaWreW9k+WJjSBjaGVja2JveCDmmK/lkKbpgInkuK0gKi9cclxuICAgIGlzY2hlY2tFbGVtZW50OiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIHJldHVybiBpc2NoZWNrID09IDE7XHJcbiAgICB9LFxyXG4gICAgLyoq5qih5ouf5Y2V5Ye7IOWPquaUueWPmOagt+W8jyAqL1xyXG4gICAgc2V0Q2xpY2tTdHlsZTogZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAwKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jaGlsZHJlbihcImlcIikucmVtb3ZlQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMSk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY2hpbGRyZW4oXCJpXCIpLmFkZENsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHM9THVpQ2hlY2tCb3g7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2NoZWNrYm94LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIiwiXHJcblxyXG5mdW5jdGlvbiBwb3BzaG93KHNlbGUsIHBvcHNob3cpIHsvL+W8ueWHuuWxgueahOaYvuekulxyXG4gICBcclxuICAgIHNlbGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBvcHNob3cuc2hvdygpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5zaG93KCk7XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIHBvcGhpZGUoc2VsZSwgcG9wc2hvdykgey8v5by55Ye65bGC55qE5raI5aSxXHJcbiAgICBzZWxlLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwb3BzaG93LmhpZGUoKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5oaWRlKCk7XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGNoZWNrQm9veCgpIHsvL+WkjemAieahhueahOagt+W8j1xyXG4gICAgJCgnLmNoZWNrQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gY2hvb3NlQWxsKCkgey8v5YWo6YCJ5YWo5LiN6YCJXHJcbiAgICAkKCcuY2hlY2tCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIG51bSA9ICQoJy5jaGVja0JveCcpLmluZGV4KCQodGhpcykpO1xyXG4gICAgICAgIGlmIChudW0gPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknKSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyICRpbWdzID0gJC5tYWtlQXJyYXkoJCgnLnRhYmxlIHRyOm5vdCg6Zmlyc3QpJykuZmluZCgnaW1nJykpO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAkaW1ncy5ldmVyeShmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc3R5bGUudmlzaWJpbGl0eSA9PSAndmlzaWJsZSc7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxufVxyXG5mdW5jdGlvbiBTaWJzKFRoaXMpIHtcclxuICAgIFRoaXMub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNpYmxpbmdzKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gcmFkaW8oKSB7Ly/ljZXpgInnmoTmoLflvI9cclxuICAgICQoJy5yYWRpbycpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCcucmFkaW8nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiBzZXRDb29raWUob2JqTmFtZSwgb2JqVmFsdWUsIG9iakhvdXJzKSB7XHJcbiAgICB2YXIgc3RyID0gb2JqTmFtZSArIFwiPVwiICsgZXNjYXBlKG9ialZhbHVlKTtcclxuXHJcbiAgICBpZiAob2JqSG91cnMgPiAwKSB7IC8v5Li6MOaXtuS4jeiuvuWumui/h+acn+aXtumXtO+8jOa1j+iniOWZqOWFs+mXreaXtmNvb2tpZeiHquWKqOa2iOWksVxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICB2YXIgbXMgPSBvYmpIb3VycyAqIDM2MDAgKiAxMDAwO1xyXG4gICAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIG1zKTtcclxuICAgICAgICBzdHIgKz0gXCI7IGV4cGlyZXM9XCIgKyBkYXRlLnRvR01UU3RyaW5nKCkgKyBcIjtwYXRoPS9cIjtcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmNvb2tpZSA9IHN0cjtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0Q29va2llKG9iak5hbWUpIHsgLy/ojrflj5bmjIflrprlkI3np7DnmoRjb29raWXnmoTlgLxcclxuICAgIHZhciBhcnJTdHIgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoXCI7IFwiKTtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyU3RyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRlbXAgPSBhcnJTdHJbaV0uc3BsaXQoXCI9XCIpO1xyXG4gICAgICAgIGlmICh0ZW1wWzBdID09IG9iak5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHVuZXNjYXBlKHRlbXBbMV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy/lvLnlh7rliqDovb3lm77niYdcclxuZnVuY3Rpb24gU2hvd0xvYWRpbmcob2JqKSB7XHJcbiAgICBvYmouaHRtbChqUXVlcnkoXCIjZGl2TG9hZGluZ1wiKS5odG1sKCkpO1xyXG59XHJcbmZ1bmN0aW9uIHRpbWVUaWNrQmlnKHNlY29uZCkge1xyXG4gICAgJChcIi50aW1lcy1iaWdcIikuaHRtbChzZWNvbmQpO1xyXG4gICAgdmFyIHQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi50aW1lcy1iaWdcIikuaHRtbCgtLXNlY29uZCk7XHJcbiAgICAgICAgaWYgKHNlY29uZCA8PSAwKSB7XHJcbiAgICAgICAgICAgICQoXCIucm90YXRlLXBvaW50XCIpLmNzcyh7IFwiYW5pbWF0aW9uLXBsYXktc3RhdGVcIjogXCJwYXVzZWRcIiB9KTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0KTtcclxuICAgICAgICB9XHJcbiAgICB9LCAxMDAwKTtcclxuICAgICQoXCIucm90YXRlLXBvaW50XCIpLmNzcyh7IFwiYW5pbWF0aW9uLXBsYXktc3RhdGVcIjogXCJydW5uaW5nXCIgfSk7XHJcbn1cclxuXHJcbi8v5Yqg6L295Zu+54mH5Yiw5p+Q5Liq5YWD57Sg5LitXHJcbmZ1bmN0aW9uIEluc2VydExvYWRpbmcob2JqKSB7XHJcbiAgICBvYmouYXBwZW5kKGpRdWVyeShcIiNkaXZMb2FkaW5nXCIpLmh0bWwoKSk7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgcG9waGlkZTogcG9waGlkZSxcclxuICAgIHBvcHNob3c6IHBvcHNob3csXHJcbiAgICBjaGVja0Jvb3g6IGNoZWNrQm9veCxcclxuICAgIFNpYnM6IFNpYnMsXHJcbiAgICByYWRpbzogcmFkaW8sXHJcbiAgICBjaG9vc2VBbGw6IGNob29zZUFsbCxcclxuICAgIHNldENvb2tpZTogc2V0Q29va2llLC8v6K6+572uY29va2llXHJcbiAgICBnZXRDb29raWU6IGdldENvb2tpZSwgLy8g6I635Y+WY29va2llXHJcbiAgICBTaG93TG9hZGluZzogU2hvd0xvYWRpbmcsLy/liqDovb3kuK1cclxuICAgIEluc2VydExvYWRpbmc6IEluc2VydExvYWRpbmcsXHJcbiAgICB0aW1lVGlja0JpZzogdGltZVRpY2tCaWcvL+WAkuiuoeaXtlxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS90b29sLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDUgNiA3IDggOSAxMiAxMyAxOCAxOSAyMCAyMSAyNyAyOCAzNiIsIi8vdmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xyXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcclxuXHJcbi8qKiBcclxuICog5a+55pel5pyf6L+b6KGM5qC85byP5YyW77yMIFxyXG4gKiBAcGFyYW0gZGF0ZSDopoHmoLzlvI/ljJbnmoTml6XmnJ8gXHJcbiAqIEBwYXJhbSBmb3JtYXQg6L+b6KGM5qC85byP5YyW55qE5qih5byP5a2X56ym5LiyXHJcbiAqICAgICDmlK/mjIHnmoTmqKHlvI/lrZfmr43mnInvvJogXHJcbiAqICAgICB5OuW5tCwgXHJcbiAqICAgICBNOuW5tOS4reeahOaciOS7vSgxLTEyKSwgXHJcbiAqICAgICBkOuaciOS7veS4reeahOWkqSgxLTMxKSwgXHJcbiAqICAgICBoOuWwj+aXtigwLTIzKSwgXHJcbiAqICAgICBtOuWIhigwLTU5KSwgXHJcbiAqICAgICBzOuenkigwLTU5KSwgXHJcbiAqICAgICBTOuavq+enkigwLTk5OSksXHJcbiAqICAgICBxOuWto+W6pigxLTQpXHJcbiAqIEByZXR1cm4gU3RyaW5nXHJcbiAqIEBhdXRob3IgeWFuaXMud2FuZ1xyXG4gKiBAc2VlXHRodHRwOi8veWFuaXN3YW5nLmNvbS9mcm9udGVuZC8yMDEzLzAyLzE2L2RhdGVmb3JtYXQtcGVyZm9ybWFuY2UvXHJcbiAqL1xyXG5cclxuLy/ml7bpl7TovazmjaJcclxudGVtcGxhdGUuaGVscGVyKCdkYXRlRm9ybWF0JywgZnVuY3Rpb24gKGRhdGUsIGZvcm1hdCkge1xyXG4gICAgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KGRhdGUucmVwbGFjZShcIi9EYXRlKFwiLCBcIlwiKS5yZXBsYWNlKFwiKS9cIiwgXCJcIiksIDEwKSk7XHJcbiAgICAvL3JldHVybiBkYXRlLmdldERhdGUoKTtcclxuICAgLy9kYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcblxyXG4gICAgdmFyIG1hcCA9IHtcclxuICAgICAgICBcInlcIjogZGF0ZS5nZXRZZWFyKCksXHJcbiAgICAgICAgXCJNXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9IFxyXG4gICAgICAgIFwiZFwiOiBkYXRlLmdldERhdGUoKSwgLy/ml6UgXHJcbiAgICAgICAgXCJoXCI6IGRhdGUuZ2V0SG91cnMoKSwgLy/lsI/ml7YgXHJcbiAgICAgICAgXCJtXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhiBcclxuICAgICAgICBcInNcIjogZGF0ZS5nZXRTZWNvbmRzKCksIC8v56eSIFxyXG4gICAgICAgIFwicVwiOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6piBcclxuICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enkiBcclxuICAgIH07XHJcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvKFt5TWRobXNxU10pKy9nLCBmdW5jdGlvbihhbGwsIHQpe1xyXG4gICAgICAgIHZhciB2ID0gbWFwW3RdO1xyXG4gICAgICAgIGlmKHYgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGFsbC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgICAgIHYgPSAnMCcgKyB2O1xyXG4gICAgICAgICAgICAgICAgdiA9IHYuc3Vic3RyKHYubGVuZ3RoLTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHQgPT09ICd5Jyl7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gYWxsLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGw7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmb3JtYXQ7XHJcbn0pO1xyXG5cclxuLy/miKrlrZflpITnkIZcclxudGVtcGxhdGUuaGVscGVyKCdjdXRjaGFyJywgZnVuY3Rpb24gKG9iaiwgY2hhcmxlbmd0aCkge1xyXG5cclxuICAgIGlmIChvYmogPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5sZW5ndGggPiBwYXJzZUludChjaGFybGVuZ3RoKSkge1xyXG4gICAgICAgIG9iaiA9IG9iai5zdWJzdHJpbmcoMCwgcGFyc2VJbnQoY2hhcmxlbmd0aCkpICsgXCIuLi5cIjtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iajtcclxuXHJcbn0pO1xyXG5cclxuLy/mlZnnoJTor4TnuqdcclxudGVtcGxhdGUuaGVscGVyKCdUZWFjaFR5cGVUcmFuJywgZnVuY3Rpb24gKG9iaikge1xyXG5cclxuICAgIGlmIChvYmogPT0gMSkge1xyXG4gICAgICAgIHJldHVybiBcIkHnuqdcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiQue6p1wiO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5ZCI5ZCM5pyf6ZmQ6L2s5o2iXHJcbnRlbXBsYXRlLmhlbHBlcignSHRReCcsIGZ1bmN0aW9uIChvYmopIHtcclxuXHJcbiAgICByZXR1cm4gdGVtcGxhdGUuaGVscGVyKG9iaikgKyBcIuW5tFwiO1xyXG59KTtcclxuXHJcbi8v5bm057qnXHJcbnRlbXBsYXRlLmhlbHBlcignR2V0QmlnR3JhZGUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgcmV0dXJuIGUgPT0gMSA/IFwi5LiA5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gMiA/IFwi5LqM5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gMyA/IFwi5LiJ5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNCA/IFwi5Zub5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNSA/IFwi5LqU5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNiA/IFwi5YWt5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNyA/IFwi5LiD5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gOCA/IFwi5YWr5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gOSA/IFwi5Lmd5bm057qnXCJcclxuICAgICAgICAgOiBlID09IDEwID8gXCLpq5jkuIBcIlxyXG4gICAgICAgIDogZSA9PSAxMSA/IFwi6auY5LqMXCJcclxuICAgICAgICA6IGUgPT0gMTIgPyBcIumrmOS4iVwiXHJcbiAgICAgICAgOiBcIlwiO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy/lpKflhpnnmoTovazmjaJcclxudGVtcGxhdGUuaGVscGVyKCdHZXRCaWdXJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHJldHVybiBlID09IDEgPyBcIuS4gFwiXHJcbiAgICAgICAgOiBlID09IDIgPyBcIuS6jFwiXHJcbiAgICAgICAgOiBlID09IDMgPyBcIuS4iVwiXHJcbiAgICAgICAgOiBlID09IDQgPyBcIuWbm1wiXHJcbiAgICAgICAgOiBlID09IDUgPyBcIuS6lFwiXHJcbiAgICAgICAgOiBlID09IDYgPyBcIuWFrVwiXHJcbiAgICAgICAgOiBlID09IDcgPyBcIuS4g1wiXHJcbiAgICAgICAgOiBlID09IDggPyBcIuWFq1wiXHJcbiAgICAgICAgOiBlID09IDkgPyBcIuS5nVwiXHJcbiAgICAgICAgOiBlID09IDEwID8gXCLljYFcIlxyXG4gICAgICAgIDogZSA9PSAxMSA/IFwi5Y2B5LiAXCJcclxuICAgICAgICA6IGUgPT0gMTIgPyBcIuWNgeS6jFwiXHJcbiAgICAgICAgOiBlID09IDEzID8gXCLljYHkuIlcIlxyXG4gICAgICAgIDogZSA9PSAxNCA/IFwi5Y2B5ZubXCJcclxuICAgICAgICA6IGUgPT0gMTUgPyBcIuWNgeS6lFwiXHJcbiAgICAgICAgOiBlID09IDE2ID8gXCLljYHlha1cIlxyXG4gICAgICAgIDogZSA9PSAxNyA/IFwi5Y2B5LiDXCJcclxuICAgICAgICA6IGUgPT0gMTggPyBcIuWNgeWFq1wiXHJcbiAgICAgICAgOiBlID09IDE5ID8gXCLljYHkuZ1cIlxyXG4gICAgICAgIDogZSA9PSAyMCA/IFwi5LqM5Y2BXCJcclxuICAgICAgICA6IGUgPT0gMjEgPyBcIuS6jOWNgeS4gFwiXHJcbiAgICAgICAgOiBlID09IDIyID8gXCLkuozljYHkuoxcIlxyXG4gICAgICAgIDogZSA9PSAyMyA/IFwi5LqM5Y2B5LiJXCJcclxuICAgICAgICA6IGUgPT0gMjQgPyBcIuS6jOWNgeWbm1wiXHJcbiAgICAgICAgOiBlID09IDI1ID8gXCLkuozljYHkupRcIlxyXG4gICAgICAgIDogZSA9PSAyNiA/IFwi5LqM5Y2B5YWtXCJcclxuICAgICAgICA6IGUgPT0gMjcgPyBcIuS6jOWNgeS4g1wiXHJcbiAgICAgICAgOiBlID09IDI4ID8gXCLkuozljYHlhatcIlxyXG4gICAgICAgIDogZSA9PSAyOSA/IFwi5LqM5Y2B5LmdXCJcclxuICAgICAgICA6IGUgPT0gMzAgPyBcIuS4ieWNgVwiXHJcbiAgICAgICAgOiBlID09IDMxID8gXCLkuInljYHkuIBcIlxyXG4gICAgICAgIDogZSA9PSAzMiA/IFwi5LiJ5Y2B5LqMXCJcclxuICAgICAgICA6IGUgPT0gMzMgPyBcIuS4ieWNgeS4iVwiXHJcbiAgICAgICAgOiBlID09IDM0ID8gXCLkuInljYHlm5tcIlxyXG4gICAgICAgIDogZSA9PSAzNSA/IFwi5LiJ5Y2B5LqUXCJcclxuICAgICAgICA6IGUgPT0gMzYgPyBcIuS4ieWNgeWFrVwiXHJcbiAgICAgICAgOiBlID09IDM3ID8gXCLkuInljYHkuINcIlxyXG4gICAgICAgIDogZSA9PSAzOCA/IFwi5LiJ5Y2B5YWrXCJcclxuICAgICAgICA6IGUgPT0gMzkgPyBcIuS4ieWNgeS5nVwiXHJcbiAgICAgICAgOiBlID09IDQwID8gXCLlm5vljYFcIlxyXG4gICAgICAgIDogZSA9PSA0MSA/IFwi5Zub5Y2B5LiAXCJcclxuICAgICAgICA6IGUgPT0gNDIgPyBcIuWbm+WNgeS6jFwiXHJcbiAgICAgICAgOiBlID09IDQzID8gXCLlm5vljYHkuIlcIlxyXG4gICAgICAgIDogZSA9PSA0NCA/IFwi5Zub5Y2B5ZubXCJcclxuICAgICAgICA6IGUgPT0gNDUgPyBcIuWbm+WNgeS6lFwiXHJcbiAgICAgICAgOiBlID09IDQ2ID8gXCLlm5vljYHlha1cIlxyXG4gICAgICAgIDogZSA9PSA0NyA/IFwi5Zub5Y2B5LiDXCJcclxuICAgICAgICA6IGUgPT0gNDggPyBcIuWbm+WNgeWFq1wiXHJcbiAgICAgICAgOiBlID09IDQ5ID8gXCLlm5vljYHkuZ1cIlxyXG4gICAgICAgIDogZSA9PSA1MCA/IFwi5LqU5Y2BXCJcclxuICAgICAgICA6IFwiXCI7XHJcbn0pO1xyXG50ZW1wbGF0ZS5oZWxwZXIoJ3Rlc3QnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZTt9KVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RwbC90ZW1wbGF0ZS1oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMTcgMTkgMjAgMjEgMjMgMjcgMjggNDUiLCIvKlRNT0RKUzp7fSovXHJcbiFmdW5jdGlvbiAoKSB7XHJcblx0ZnVuY3Rpb24gYShhLCBiKSB7XHJcblx0XHRyZXR1cm4gKC9zdHJpbmd8ZnVuY3Rpb24vLnRlc3QodHlwZW9mIGIpID8gaCA6IGcpKGEsIGIpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBiKGEsIGMpIHtcclxuXHRcdHJldHVybiBcInN0cmluZ1wiICE9IHR5cGVvZiBhICYmIChjID0gdHlwZW9mIGEsIFwibnVtYmVyXCIgPT09IGMgPyBhICs9IFwiXCIgOiBhID0gXCJmdW5jdGlvblwiID09PSBjID8gYihhLmNhbGwoYSkpIDogXCJcIiksIGFcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGMoYSkge1xyXG5cdFx0cmV0dXJuIGxbYV1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGQoYSkge1xyXG5cdFx0cmV0dXJuIGIoYSkucmVwbGFjZSgvJig/IVtcXHcjXSs7KXxbPD5cIiddL2csIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBlKGEsIGIpIHtcclxuXHRcdGlmIChtKGEpKWZvciAodmFyIGMgPSAwLCBkID0gYS5sZW5ndGg7IGQgPiBjOyBjKyspYi5jYWxsKGEsIGFbY10sIGMsIGEpOyBlbHNlIGZvciAoYyBpbiBhKWIuY2FsbChhLCBhW2NdLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZihhLCBiKSB7XHJcblx0XHR2YXIgYyA9IC8oXFwvKVteXFwvXStcXDFcXC5cXC5cXDEvLCBkID0gKFwiLi9cIiArIGEpLnJlcGxhY2UoL1teXFwvXSskLywgXCJcIiksIGUgPSBkICsgYjtcclxuXHRcdGZvciAoZSA9IGUucmVwbGFjZSgvXFwvXFwuXFwvL2csIFwiL1wiKTsgZS5tYXRjaChjKTspZSA9IGUucmVwbGFjZShjLCBcIi9cIik7XHJcblx0XHRyZXR1cm4gZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZyhiLCBjKSB7XHJcblx0XHR2YXIgZCA9IGEuZ2V0KGIpIHx8IGkoe2ZpbGVuYW1lOiBiLCBuYW1lOiBcIlJlbmRlciBFcnJvclwiLCBtZXNzYWdlOiBcIlRlbXBsYXRlIG5vdCBmb3VuZFwifSk7XHJcblx0XHRyZXR1cm4gYyA/IGQoYykgOiBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoKGEsIGIpIHtcclxuXHRcdGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBiKSB7XHJcblx0XHRcdHZhciBjID0gYjtcclxuXHRcdFx0YiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGsoYylcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dmFyIGQgPSBqW2FdID0gZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGIoYywgYSkgKyBcIlwiXHJcblx0XHRcdH0gY2F0Y2ggKGQpIHtcclxuXHRcdFx0XHRyZXR1cm4gaShkKSgpXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRyZXR1cm4gZC5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSA9IG4sIGQudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBiICsgXCJcIlxyXG5cdFx0fSwgZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaShhKSB7XHJcblx0XHR2YXIgYiA9IFwie1RlbXBsYXRlIEVycm9yfVwiLCBjID0gYS5zdGFjayB8fCBcIlwiO1xyXG5cdFx0aWYgKGMpYyA9IGMuc3BsaXQoXCJcXG5cIikuc2xpY2UoMCwgMikuam9pbihcIlxcblwiKTsgZWxzZSBmb3IgKHZhciBkIGluIGEpYyArPSBcIjxcIiArIGQgKyBcIj5cXG5cIiArIGFbZF0gKyBcIlxcblxcblwiO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIFwib2JqZWN0XCIgPT0gdHlwZW9mIGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcihiICsgXCJcXG5cXG5cIiArIGMpLCBiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgaiA9IGEuY2FjaGUgPSB7fSwgayA9IHRoaXMuU3RyaW5nLCBsID0ge1xyXG5cdFx0XCI8XCI6IFwiJiM2MDtcIixcclxuXHRcdFwiPlwiOiBcIiYjNjI7XCIsXHJcblx0XHQnXCInOiBcIiYjMzQ7XCIsXHJcblx0XHRcIidcIjogXCImIzM5O1wiLFxyXG5cdFx0XCImXCI6IFwiJiMzODtcIlxyXG5cdH0sIG0gPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRcdHJldHVybiBcIltvYmplY3QgQXJyYXldXCIgPT09IHt9LnRvU3RyaW5nLmNhbGwoYSlcclxuXHRcdH0sIG4gPSBhLnV0aWxzID0ge1xyXG5cdFx0JGhlbHBlcnM6IHt9LCAkaW5jbHVkZTogZnVuY3Rpb24gKGEsIGIsIGMpIHtcclxuXHRcdFx0cmV0dXJuIGEgPSBmKGMsIGEpLCBnKGEsIGIpXHJcblx0XHR9LCAkc3RyaW5nOiBiLCAkZXNjYXBlOiBkLCAkZWFjaDogZVxyXG5cdH0sIG8gPSBhLmhlbHBlcnMgPSBuLiRoZWxwZXJzO1xyXG5cdGEuZ2V0ID0gZnVuY3Rpb24gKGEpIHtcclxuXHRcdHJldHVybiBqW2EucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpXVxyXG5cdH0sIGEuaGVscGVyID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdG9bYV0gPSBiXHJcblx0fSwgbW9kdWxlLmV4cG9ydHMgPSBhXHJcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMTUgMTYgMTcgMTkgMjAgMjEgMjMgMjcgMjggMzQgNDAgNDEgNDIgNDMgNDUgNDYgNTMgNTQiLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnc3JjL3RwbC9PcmdNYW5hZ2UvT3JnTWFuYWdlTGlzdCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZWFjaD0kdXRpbHMuJGVhY2gsJHZhbHVlPSRkYXRhLiR2YWx1ZSwkaW5kZXg9JGRhdGEuJGluZGV4LCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsJG91dD0nJzskb3V0Kz0nICc7XG4kZWFjaCgkZGF0YSxmdW5jdGlvbigkdmFsdWUsJGluZGV4KXtcbiRvdXQrPScgPHRyPiA8dGQ+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLk9yZ0lkKTtcbiRvdXQrPSc8L3RkPiA8dGQ+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLk9yZ05hbWUpO1xuJG91dCs9JzwvdGQ+IDx0ZD4nO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuQ29UeXBlKTtcbiRvdXQrPSc8L3RkPiA8dGQ+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLlRlYWNoVHlwZSk7XG4kb3V0Kz0nPC90ZD4gPHRkPic7XG4kb3V0Kz0kZXNjYXBlKCRoZWxwZXJzLiBkYXRlRm9ybWF0KCR2YWx1ZS5FeHBpcmVUaW1lICwgIFwieXl5eS1NTS1kZFwiKSk7XG4kb3V0Kz0nPC90ZD4gPHRkPic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5DdXJyZW50VmFsdWUpO1xuJG91dCs9JzwvdGQ+IDx0ZD4gPHNwYW4gY2xhc3M9XCJpbmxpbmUgb3BlcmF0QnRuIHNlZS1kZXRhaWxcIiBkYXRhLWlkPVwiJztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLk9yZ0lkKTtcbiRvdXQrPSdcIj7mn6XnnIvor6bmg4U8L3NwYW4+IDxzcGFuIGNsYXNzPVwiaW5saW5lIG9wZXJhdEJ0biBtbDI1XCIgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5PcmdJZCk7XG4kb3V0Kz0nXCI+5YKo5YC8PC9zcGFuPiA8L3RkPiA8L3RyPiAnO1xufSk7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RwbC9PcmdNYW5hZ2UvT3JnTWFuYWdlTGlzdC50cGxcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTkiXSwic291cmNlUm9vdCI6IiJ9