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
	//发送请求调取数据绑定下拉框
	var arrJxd = [];//教学点
	var arrBj = [];//班级
	var arrTbk = [];//同步课
	var tplTableStu = __webpack_require__(24);//学生列表
	var stuGrade = 0;//年级
	var stuId;//学生id
	var stuEditionId;//学生id
	__webpack_require__(7);
	var pop = __webpack_require__(9);
	var loadimg = __webpack_require__(10);
	var Paginator = __webpack_require__(11);
	var commJs = __webpack_require__(6);//公共方法
	var gradeArr = [{ name: '一年级', id: '1', pid: '' }, { name: '二年级', id: '2', pid: '00' }, { name: '三年级', id: '3', pid: '00' }, { name: '四年级', id: '4', pid: '00_01' }, { name: '五年级', id: '5', pid: '00_01' }, { name: '六年级', id: '6', pid: '00_02' }, { name: '七年级', id: '7', pid: '00_02' }, { name: '八年级', id: '8', pid: '' }, { name: '九年级', id: '9', pid: '00' }, { name: '高一', id: '10', pid: '00' }, { name: '高二', id: '11', pid: '00_01' }, { name: '高三', id: '12', pid: '00_01' }];//年级初始化
	
	var isSel = 0;//0表示没加载下拉1表示加载
	var module = {
	    init: function () {
	        //todo 逻辑函数
	        this.render();
	        this.initBtns();
	    },
	
	    render: function () {
	        //加载列表
	        GetStuData();
	
	    },
	    initBtns: function () {
	        //todo 绑定事件
	        //搜索
	        $("body").delegate("#searchImg", "click", function () {
	            GetStuData(-1);
	
	        });
	
	        //详情页跳转
	        $("body").delegate(".seeDetail", "click", function () {
	
	            var dataId = $(this).attr("data-id");
	            window.location.href = "/Org/StudentManage/StuDetail/" + dataId;
	            //"?stuId=" + dataId.split('-')[0] + "&stuEditionId=" + dataId.split('-')[1];
	
	        });
	
	        //处理单选男
	        $("body").delegate("#lbMan,#lbWman", "click", function() {
	            
	            var type = $(this).attr("data-id");
	            $('.radio').removeClass('active');
	            if (type == 1) {
	
	                $("#radSex").addClass('active');
	
	            } else {
	                $("#sexWMan").addClass('active');
	            }
	        });
	
	
	        //报课、续课的弹窗
	        $("body").delegate(".continue", "click", function () {
	            var dataArr = $(this).attr("data-id");//数组id、姓名、年级、学校id、教材id
	            stuId = parseInt(dataArr.split('-')[0]);
	            stuGrade = parseInt(dataArr.split('-')[2]);
	            stuEditionId = parseInt(dataArr.split('-')[4]);
	            var strGrade = commJs.numGradeTran(parseInt(dataArr.split('-')[2]));
	            $("#stuName").html(dataArr.split('-')[1] + "(" + strGrade + ")");//张三（七年级）
	
	
	            //调取数据初始化弹窗(下拉框的数据)
	            var arrTemp = [];//临时数据
	            //加载班级列表
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/GetOrgClassConNumber",
	                dataType: "json",
	                data: {
	                    data: -1
	                },
	                success: function (data) {
	                    if (data.Data && data.Data.length > 0) {
	                        //arrBj.push({
	                        //    name: "全部", id: 0, pid: 0
	                        //});//课程
	                        for (var i = 0; i < data.Data.length; i++) {
	
	                            arrTemp.push({
	                                name: data.Data[i].StrClassName, id: data.Data[i].StrSchoolAndClassId, pid: data.Data[i].ClassId
	                            });//课程
	                        }
	
	                        lui.initDropDownList({ warpid: "drop_class", width: 135, subtextlength: 10, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: GetStuDataNotLoadSelect });//报课的班级
	                        loadCourse(1);
	                    }
	                    else {
	
	                        // alert("获取数据失败");
	
	                    }
	                }
	            });
	
	            $("#continue").show();
	            $('.pop-mask').show();
	
	        });
	
	
	        //报课的确定
	        $("body").delegate("#btnAddLesson", "click", function () {
	           
	            var jsonAdd = {};
	            var orgCourse = $("#drop_course").attr("data-id");//课程数组
	            jsonAdd.StuId = stuId;
	            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、课次 、课程有效期 课价
	            jsonAdd.BookNumber = orgCourse.split('-')[1];//课次
	            jsonAdd.LeftNumber = orgCourse.split('-')[1];//课次
	            jsonAdd.ExpireMonth = orgCourse.split('-')[2];//课次有效期月
	            jsonAdd.InPrice = orgCourse.split('-')[3];//课次有效期月
	            jsonAdd.BookType = orgCourse.split('-')[4];//课程的类型同步课1需要
	            jsonAdd.StuEditionId = stuEditionId;//学生教材
	            jsonAdd.HistoryType = 0;//报课和续课都是0
	            jsonAdd.SchoolId = $("#drop_class").attr("data-id").split('-')[0];
	            jsonAdd.ClassId = $("#drop_class").attr("data-id").split('-')[1];
	           
	            if ($("#engType").hasClass("active")) {
	                jsonAdd.IsEng = 1;//是默认的英语
	
	            } else {
	                jsonAdd.IsEng = 0;//不是
	
	            }
	
	            if (stuId.length < 1) {
	
	                return;//无效请求
	            }
	
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/AddOrgStuClass",
	                dataType: "json",
	                data: {
	
	                    data: JSON.stringify(jsonAdd)
	                },
	                success: function (data) {
	
	                    if (data && data.Data > 0) {
	                        GetStuData(-1);//重新加载列表
	                        $("#continue").hide();
	                        $('.pop-mask').hide();
	
	                    } else {
	                        alert("提交失败");
	                    }
	
	
	
	                }
	            });
	        });
	
	
	        //创建学生的请求
	        $("body").delegate("#btnAddStu", "click", function () {
	
	            var jsonAdd = {};
	
	            jsonAdd.UserName = escape($("#txtStuName").val().trim());
	            jsonAdd.Tel = escape($("#txtStuTel").val().trim());
	            if ($("#radSex").hasClass("active")) {
	                jsonAdd.Gender = 1;//1为男，0为女
	            }
	            jsonAdd.Grade = $("#drop_nj").attr("data-id");//年级
	            jsonAdd.BookVersion = $("#drop_bb").attr("data-id");//教材版本
	          
	            if (jsonAdd.UserName.length < 1) {
	                alert("姓名不能为空");
	                return;
	            }
	            if (jsonAdd.Tel.length < 1) {
	                alert("手机不能为空");
	                return;
	            }
	            //校验电话
	            if (!commJs.IsMobile(jsonAdd.Tel)) {
	
	                alert("手机格式不对");
	                return;
	
	            }
	
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/CheckOrgPhone",
	                dataType: "json",
	                data: {
	
	                    data: jsonAdd.Tel, userId: -1
	                },
	                success: function (data) {
	
	
	                    if (data.Data == "0") {
	
	                        $(".eg-pop .close").click();//关闭弹窗
	                        //提交表单
	                        $.ajax({
	                            type: "post",
	                            url: "/Org/StudentManage/AddOrgStu",
	                            dataType: "json",
	                            data: {
	
	                                data: JSON.stringify(jsonAdd)
	                            },
	                            success: function (data) {
	
	                                //进行显示赋值
	                                //$("#orgName").html($("#txtStuName").val().trim());//名不要加密过的
	                                $("#loginId").html(data.Data);//登录账号
	                                //$("#loginTel").html(jsonAdd.LinkManTel);//电话
	                                $("#addPerson").show();
	                                $('.pop-mask').show();
	                                GetStuData();//重新加载列表
	
	                            }
	                        });
	                    } else {
	                        alert("电话重复");
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
	
	var titleO = "全部";//$("#drop_type").attr("title")  定义全局变量来监听改变事件
	//绑定数据
	$(function () {
	    module.init();
	    //OptTypeSel();
	
	
	});
	
	
	//发送请求调取数据
	function GetStuData(page) {
	    loadimg.ShowLoadingForTable($("#tb"), 8);
	    if (page == undefined) {
	        page = 1;
	    }
	    var pageSize = 10;
	    var json = {};
	    json.SchoolId = $("#drop_jxd").attr("data-id");;//学校的下拉
	    json.ClassId = $("#drop_bj").attr("data-id");//班级的下拉
	    json.CourseId = $("#drop_tbk").attr("data-id");//课程的下拉
	    json.KeyWord = escape($("#txtserch").val());
	    //加载列表
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetStuList",
	        dataType: "json",
	        data: {
	            data: JSON.stringify(json), PageIndex: page, PageSize: pageSize
	        },
	        success: function (data) {
	
	
	            if (data.Data && data.Data.length > 0) {
	                $("#tb").html(tplTableStu(data.Data));
	                $("#Totalcount").html(data.PageSum);
	                Paginator.Paginator(10, page, data.PageSum, GetStuData);
	               
	                //加载学校列表
	                if (isSel != 1) {
	                    loadSchools();
	                }
	                isSel = 1;
	
	            }
	            else {
	
	                $("#tb").html("");
	                //<img src="../../../bundle/img/noclass.png" style="text-align:center;">
	                $("#tb").html('<tr  style="border:none;text-align:center;height:280px;"><td style="font-size: 16px;" colspan="8"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;"><br/><span>暂无数据！</span></div></div></td></tr>');//清空数据
	                $("#pagination").html("");//分页控件不显示
	                $("#Totalcount").html(0);//数据设置为0
	
	            }
	        }
	    });
	
	}
	
	
	
	
	//只是加载列表数据
	function GetStuDataNotLoadSelect() {
	    return GetStuData(-1);
	
	}
	
	
	//加载学校
	function loadSchools() {
	    //加载学校
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetOrgSchools",
	        dataType: "json",
	        data: {
	            data: ""
	        },
	        success: function (data) {
	            if (data.Data && data.Data.length > 0) {
	                arrJxd.push({
	                    name: "全部", id: 0, pid: 0
	                });//学校
	                for (var i = 0; i < data.Data.length; i++) {
	
	                    arrJxd.push({ name: data.Data[i].SchoolName, id: data.Data[i].SchoolId, pid: data.Data[i].SchoolId });
	                }
	
	                lui.initDropDownList({ warpid: "drop_jxd", width: 130, nameField: 'name', idField: 'id', data: arrJxd, selectedCallBack: GetStuDataNotLoadSelect, subtextlength:10 });//学校和班级的联动
	                loadClass();
	            }
	            else {
	
	                //alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	
	
	//加载班级
	function loadClass() {
	    var jxdId = $("#drop_jxd").attr("data-id");
	
	    //加载班级列表
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetOrgClass",
	        dataType: "json",
	        data: {
	            data: jxdId
	        },
	        success: function (data) {
	            if (data.Data && data.Data.length > 0) {
	
	
	                arrBj.push({
	                    name: "全部", id: 0, pid: 0
	                });//班级
	                for (var i = 0; i < data.Data.length; i++) {
	
	                    arrBj.push({
	                        name: data.Data[i].ClassName, id: data.Data[i].ClassId, pid: data.Data[i].ClassId
	                    });//班级
	                }
	
	
	                lui.initDropDownList({ warpid: "drop_bj", width: 130, nameField: 'name', idField: 'id', data: arrBj, selectedCallBack: GetStuDataNotLoadSelect, subtextlength: 10 });//班级
	
	                loadCourse();
	            }
	            else {
	
	                // alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	
	//加载课程
	function loadCourse(obj) {
	    var arrTemp = [];//创建一个临时数组
	    //加载列表
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetOrgCourse",
	        dataType: "json",
	        data: {
	            data: ""//下面的所有的
	        },
	        success: function (data) {
	
	            if (data.Data && data.Data.length > 0) {
	
	
	                arrTbk.push({
	                    name: "全部", id: 0, pid: 0
	                });//班级
	                for (var i = 0; i < data.Data.length; i++) {
	
	
	                    if (obj == 1) {
	                        arrTemp.push({ name: data.Data[i].CourseName, id: data.Data[i].CourseId + "-" + data.Data[i].BookNumber + "-" + data.Data[i].ExpiryMonth + "-" + data.Data[i].OutPrice + "-" + data.Data[i].BookType, pid: data.Data[i].CourseId });//报班的课程
	                    } else {
	                        arrTbk.push({
	                            name: data.Data[i].CourseName, id: data.Data[i].CourseId, pid: data.Data[i].CourseId
	                        });//报班的课程
	                    }
	
	                }
	
	
	                if (obj == 1) {//报课的加载课程需要赋值一些参数
	                    lui.initDropDownList({ warpid: "drop_course", width: 100, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: loadCourseData, subtextlength: 10 });//同步课程，需要进行联动
	
	                    $("#lessonNumber").html(arrTemp[0].id.split('-')[1]);
	                    $("#lessonTime").html(arrTemp[0].id.split('-')[2] + "月");
	                    $("#lessonPrice").html(arrTemp[0].id.split('-')[3] + "元");
	
	                } else {
	                    lui.initDropDownList({ warpid: "drop_tbk", width: 135, nameField: 'name', idField: 'id', data: arrTbk, selectedCallBack: GetStuDataNotLoadSelect, subtextlength: 10 });//课程
	                }
	
	
	            }
	            else {
	
	                //alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	
	//进行联动课程的选择
	function loadCourseData() {
	    var jsData = $("#drop_course").attr("data-id");//组合的数据进行联动
	
	    if (jsData.length > 0) {
	        $("#lessonNumber").html(jsData.split('-')[1]);
	        $("#lessonTime").html(jsData.split('-')[2] + "月");
	        $("#lessonPrice").html(jsData.split('-')[3] + "元");
	    }
	
	
	
	
	}
	
	
	
	
	
	//下拉框初始化
	var Lui = __webpack_require__(1);
	var tool = __webpack_require__(4);
	var lui = new Lui();
	//创建下级弹出层事件
	tool.pophide($('.eg-pop .close'), $('.eg-pop'));
	tool.popshow($('.creatStudent'), $('#creatStudent'));
	//课程开通
	tool.popshow($('.continue'), $('#continue'));
	tool.Sibs($('.spans'));
	
	//性别按钮
	tool.radio();
	//编辑学生的弹窗
	tool.popshow($('.editMesg'), $('#editMesg'));
	
	/*全部教学点的下拉*/
	//lui.initDropDownList({ warpid: "drop_jxd", width: 100, nameField: 'name', idField: 'id', data: [{ name: '全部', id: '0', pid: '1' }] });
	///*授课时间的下拉  全部班级*/
	//lui.initDropDownList({ warpid: "drop_bj", width: 100, nameField: 'name', idField: 'id', data: [{ name: '全部', id: '0', pid: '1' }] });
	///*任课老师的下拉  同步课*/
	//lui.initDropDownList({ warpid: "drop_tbk", width: 100, nameField: 'name', idField: 'id', data: [{ name: '全部', id: '0', pid: '1' }] });
	////年级的下拉
	lui.initDropDownList({ warpid: "drop_nj", width: 260, nameField: 'name', idField: 'id', data: gradeArr });
	//版本的下拉
	lui.initDropDownList({ warpid: "drop_bb", width: 260, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	//创建学生同步课程
	//lui.initDropDownList({ warpid: "drop_course", width: 135, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	//创建学生班级的下拉
	//lui.initDropDownList({ warpid: "drop_class", width: 135, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	
	


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

/***/ },
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
/* 9 */
/***/ function(module, exports) {

	//遮罩
	function MaskShow() {
	    $(".pop-mask").show();
	}
	
	function MaskHide() {
	    $(".pop-mask").hide();
	    $(".add").hide();
	}
	//传递显示的消息
	function PopTipShow(obj) {
	    $(".addupd").each(function() {
	
	        $(this).remove();
	    });
	    
	    var tiphtml = '<div class="pop-up font14 hidden addupd" id="oktip"><span class="pop-close cursor"></span><div class="pop-content"><p class="line100" style="text-align:center;">' + obj + '</p></div></div>';
	
	    $("#main-content-wrapper").append(tiphtml);
	    $("#content").append(tiphtml);
	    $(".pop-mask").show();
	    $(".pop-up").show();
	}
	
	//传递显示的消息只让对应的id显示
	function PopTipShowId(obj) {
	    $(".addupd").each(function () {
	
	        $(this).remove();
	    });
	
	    var tiphtml = '<div class="pop-up font14 hidden addupd" id="oktip"><span class="pop-close cursor"></span><div class="pop-content"><p class="line100" style="text-align:center;">' + obj + '</p></div></div>';
	
	    $("#main-content-wrapper").append(tiphtml);
	    $("#content").append(tiphtml);
	    $(".pop-mask").show();
	    $("#oktip").show();
	}
	
	//传递显示的消息,包含DIV名称
	function PopTipShowByDivName(obj) {
	    var tiphtml = '<div class="pop-up font14 hidden" id="divCommonPopTipShow"><span class="pop-close cursor"></span><div class="pop-content"><p class="line100" style="text-align:center;">' + obj + '</p></div></div>';
	
	    $("#main-content-wrapper").append(tiphtml);
	    $("#content").append(tiphtml);
	    $(".pop-mask").show();
	    $("#divCommonPopTipShow").show();
	}
	
	//弹出确认框
	var OpenConfrimPop = function (obj) {
	    $('[class="pop-up font14"]').each(function () {
	
	        $(this).remove();
	    });
	    var html = '<div class="pop-up font14"><span class="pop-close cursor"></span><div class="pop-content" >' + obj + '</div><br /><br /><div class="handle"> <span class="ok" id="Confrim">确定</span> &nbsp;&nbsp;&nbsp;<span class="ok" id="Cancel">取消</span> </div></div>';
	    debugger;
	    $("#content").append(html);
	    $(".pop-mask").show();
	    $(".pop-up").show();
	};
	//弹出确认框
	var orgOpenConfrimPop = function (obj) {
	    var html = '<div class="pop-up font14" style="height:auto;"><span class="pop-close cursor"></span><br/><div class="pop-content" style="text-align:center;margin:30px 10px 0;">' + obj + '</div><br /><br /><div class="handle"> <span class="ok" id="Confrim">确定</span> </div></div>';
	    $("#content").append(html);
	    $(".pop-mask").show();
	    $(".pop-up").show();
	};
	//弹出确认框,没有取消按钮
	var OpenConfrimPopNoCancel = function (obj,title,btnid) {
	    $('[class="pop-up font14"]').each(function () {
	
	        $(this).remove();
	    });
	    var html = '';
	    if (title == undefined || title=="") {
	        title = "重置密码";
	    }
	    if (btnid == undefined || btnid == "") {
	        btnid = "Confrim";
	    }
	    debugger;
	    html = '<div class="mypopup font14 add" id="divPopOpenConfrimPopNoCancel"><h5 class="center font16 popuphead" style="height:45px;"><span class="title">' + title + '</span><i class="popclose cursor"></i></h5><div class="popupbox" style="min-height:120px;text-align:center;"><span class="mt20" style="display:inline-block;"><span class="content">' + obj + '</span><span><div class="handle mt20"> <span class="ok submit" id="' + btnid + '">确定</span> </div></div></div>';
	    if ($("#main-content-wrapper").length > 0) {
	        $("#main-content-wrapper").append(html);
	    } else if ($("#main-content").length > 0) {
	        $("#main-content").append(html);
	    }
	    $(".pop-mask").show();
	    $(".pop-up").show();
	    $("#divPopOpenConfrimPopNoCancel").find(".popclose").click(function () {
	        $("#divPopOpenConfrimPopNoCancel").hide();
	        $("#divPopOpenConfrimPopNoCancel").remove();
	        $(".pop-mask").hide();
	        $(".pop-up").hide();
	       
	    });
	    $('#Confrim').click(function () {//张越添加的函数
	        if ($('.content').text() != '重置密码后，该账号密码将恢复初始密码！') {
	            $("#divPopOpenConfrimPopNoCancel").hide();
	            $("#divPopOpenConfrimPopNoCancel").remove();
	            $(".pop-mask").hide();
	            $(".pop-up").hide();
	        }
	        
	    })
	};
	var OpenConfrimPopNoCance2 = function (obj) {
	    $('[class="pop-up font14"]').each(function () {
	
	        $(this).remove();
	    });
	    var html = '';
	    html = '<div class="mypopup font14" id="divPopOpenConfrimPopNoCancel"><h5 class="center font16 popuphead" style="height:45px;"><span class="title">提示消息</span><i class="popclose cursor"></i></h5><div class="popupbox" style="min-height:120px;text-align:center;"><span class="mt20" style="display:inline-block;"><span class="content">' + obj + '</span><span><div class="handle mt20"> <span class="ok submit" id="Confrim">确定</span> </div></div></div>';
	    if ($("#main-content-wrapper").length > 0) {
	       $("#main-content-wrapper").append(html);
	    } else if ($("#main-content").length > 0) {
	        $("#main-content").append(html);
	    }
	    $(".pop-mask").show();
	    $(".pop-up").show();
	    $("#divPopOpenConfrimPopNoCancel").find(".popclose").click(function () {
	        $("#divPopOpenConfrimPopNoCancel").hide();
	        $("#divPopOpenConfrimPopNoCancel").remove();
	        $(".pop-mask").hide();
	        $(".pop-up").hide();
	
	    });
	   
	};
	///弹出多长时间后消失
	var OpenTimeHide = function (obj, time) {
	    //var html = '<div class="popup"> <h5 class="center font16 popuphead">消息提示<i class="popclose cursor"></i></h5><div class="popupbox"><div class="handle font14 auto">' + obj + '</div></div></div>';
	    var html = '  <div class="popup "><h5 class="center font16 popuphead"> 消息提示<i class="popclose cursor"></i></h5><div class="popupbox"><div style="text-align:center;"><div class="success auto" style="display:inline-block;margin-top:20px;"></div></div><div class="handle successLetter"> <span class="mt20">'+obj+'</span></div></div></div>';
	    $("#main-content-wrapper").append(html);
	    $(".popup").show();
	  
	    setTimeout(function () {
	        $(".popup").hide();
	        document.location.reload();
	    }, time);
	
	};
	
	///弹出多长时间后消失,包含DIV名称
	var OpenTimeHideByDivName = function (obj, time, containsDiv) {
	    $('[class="pop-up font14"]').each(function () {
	
	        $(this).remove();
	    });
	    //var html = '<div class="popup"> <h5 class="center font16 popuphead">消息提示<i class="popclose cursor"></i></h5><div class="popupbox"><div class="handle font14 auto">' + obj + '</div></div></div>';
	    var html = '<div class="pop-up font14 hidden addupd" id="divCommonPopOpenTimeHide"><span class="pop-close cursor"></span><div class="pop-content"  style="margin:30px 0;width:auto;"><p class="line100" style="text-align:center;">' + obj + '</p></div></div>';
	    $("#" + containsDiv).append(html);
	    $("#divCommonPopOpenTimeHide").show();
	    $("#divCommonPopOpenTimeHide").find(".pop-close").click(function () {
	        $("#divCommonPopOpenTimeHide").hide();
	        $("#divCommonPopOpenTimeHide").remove();
	        $('#divPopOpenConfrimPopNoCancel').each(function () {
	
	            $(this).remove();
	        });
	    });
	    setTimeout(function () {
	        $("#divCommonPopOpenTimeHide").hide();
	        $("#divCommonPopOpenTimeHide").remove();
	        ////201610231617 klg
	        $(".pop-mask").hide();
	        $(".pop-up").hide();
	        $('#divPopOpenConfrimPopNoCancel').each(function () {
	
	            $(this).remove();
	        });
	       // $("#divPopOpenConfrimPopNoCancel").remove();
	        ///
	        //document.location.reload();
	    }, time);
	
	};
	
	function PopTipHide() {
	    $(".pop-up").hide();
	    $(".pop-mask").hide();
	    $(".add").hide();
	    document.location.reload();
	}
	
	
	//测评模块
	var ConfrimExam = function (obj) {
	    $('[class="pop-up font14"]').each(function () {
	
	        $(this).remove();
	    });
	    var html = '<div class="pop-up font14"><span class="pop-close cursor"></span><div class="pop-content">' + obj + '</div><br /><br /><div class="handle"> <span class="ok" id="Confrim">我要放弃</span> &nbsp;&nbsp;&nbsp;<span class="ok" id="Cancel">继续作答</span> </div></div>';
	    $("#main-content-wrapper").append(html);
	    $(".pop-mask").show();
	    $(".pop-up").show();
	};
	
	
	
	exports.MaskShow = MaskShow;
	exports.MaskHide = MaskHide;
	exports.PopTipShow = PopTipShow;
	exports.PopTipShowId = PopTipShowId;//只让div对应的id显示
	exports.PopTipHide = PopTipHide;
	exports.OpenConfrimPop = OpenConfrimPop;
	exports.OpenConfrimPopNoCancel = OpenConfrimPopNoCancel;
	exports.OpenTimeHide = OpenTimeHide;
	exports.ConfrimExam = ConfrimExam;
	exports.OpenTimeHideByDivName = OpenTimeHideByDivName;
	exports.orgOpenConfrimPop = orgOpenConfrimPop;
	exports.OpenConfrimPopNoCance2 = OpenConfrimPopNoCance2;
	//处理弹出框的隐藏
	$(function () {
	    $("#main-content-wrapper").delegate(".pop-close", "click", function () {
	        $(".pop-mask").hide();
	        $(".pop-up").hide();
	        //document.location.reload();
	    });
	
	    $("#main-content-wrapper").delegate(".popclose", "click", function () {
	        $(".pop-mask").hide();
	        $(".add").hide();
	    });
	
	    $("#content").delegate(".pop-close", "click", function () {
	        $(".pop-mask").hide();
	        $(".pop-up").hide();
	        //document.location.reload();
	    });
	
	    $("#content").delegate(".popclose", "click", function () {
	        $(".pop-mask").hide();
	        $(".add").hide();
	    });
	
	
	
	});
	


/***/ },
/* 10 */
/***/ function(module, exports) {

	//弹出加载图片针对列表传递居中参数
	function ShowLoadingForTable(obj, num) {
	    if (num == undefined || obj==undefined) {
	        return;
	    }
	    obj.html('<tr  style="border:none;text-align:center;height:280px;"><td style="font-size: 16px;" colspan="'+num+'"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;">'+jQuery("#divLoading").html() +'</div></div></td></tr>');
	}
	
	
	
	//弹出加载图片
	function ShowLoading(obj) {
	    if (obj == undefined) {
	        return;
	    }
	    obj.html(jQuery("#divLoading").html());
	}
	
	
	exports.ShowLoadingForTable = ShowLoadingForTable;//针对table布局的
	exports.ShowLoading = ShowLoading;
	
	


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = {
	    Paginator: function (pageSize, currentPage, totalCount, callback) {
	        //todo 绑定事件
	
	        var totalPages;
	        if (totalCount % pageSize == 0) {
	            totalPages = totalCount / pageSize;
	        }
	        else {
	            totalPages = parseInt(totalCount / pageSize) + 1;
	        }
	        var pagePre = '<a href="#"  data-num=' + (parseInt(currentPage) - 1) + ' class="pre-page inline mr20">上一页</a>';
	        var pageNext = '<a href="#"  data-num=' + (parseInt(currentPage) + 1) + ' class="next-page inline">下一页</a>';
	        var indexPage = '<a href="#"  data-num="1" class="pre-page inline mr20">首页</a></li>';
	
	        var lastPage = ' <a href="#"  data-num=' + totalPages + ' class="pre-page inline mr20 ml20"> 末页</a>';
	        if (totalPages < pageSize) {
	            // pagePre = "";
	            //pageNext = "";
	            indexPage = "";
	            lastPage = "";
	        }
	
	        if (currentPage <= 1) {
	            currentPage = 1;
	            pagePre = "";
	
	        }
	        if (currentPage >= totalPages) {
	            currentPage = totalPages;
	            pageNext = "";
	            lastPage = "";
	        }
	
	        if (totalCount > 0) {
	
	            var pagenum = '<ul class="page-box inline mr20 mb20">';
	
	
	            if (totalPages > 1) {
	                if (currentPage == 1) //第一页
	                {
	
	                    //output.Append(" <a disabled='disabled' class='colH'>上一页</a> ");//上一页
	                }
	                if (currentPage > 1) {
	                    //处理首页连接
	                    //处理上一页的连接
	                    //pagePre = ' <li><a href="#"  data-num=' + (parseInt(currentPage) - 1) + '>上一页</a> </li>';
	                    // output.AppendFormat(" <a data-pageIndex='{0}' class='pageLink'>上一页</a> ", currentPage - 1);//上一页
	                }
	                if (totalPages > 7) {
	                    var currint = 3;
	                    if (currentPage < 4)//4
	                    {
	
	                        for (var i = 0; i <= 6; i++) {
	                            if (currentPage == i + 1) {
	                                pagenum = pagenum + ' <li><a href="#" class="active" data-num=' + currentPage + '>' + currentPage + '</a> </li>';
	
	                            }
	                            else {
	                                if (i == 6) {
	
	                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + 7 + '>...</a> </li>';
	                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + totalPages + '>' + totalPages + '</a> </li>';
	                                }
	                                else {
	
	                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + (i + 1) + '>' + (i + 1) + '</a> </li>';
	                                }
	                            }
	                        }
	                    }//4
	                    else if (currentPage >= 4 && currentPage < totalPages - 3) {
	
	                        for (var i = 0; i <= 6; i++) {
	                            if (i == 0) {
	                                //pagenum=pagenum+' <li data-num='+(currentPage-3)+'><a href="#" onclick="Paginator('+pageSize+','+(currentPage-3)+',' + totalCount + ')">...</a> </li>';
	                                pagenum = pagenum + ' <li><a href="#"  data-num="1">1</a> </li>';//201609130930
	                                if (parseInt(currentPage) - 3 > 1) {
	                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + (parseInt(currentPage) - 3) + '>...</a> </li>';//201609130930
	                                }
	
	                            }
	                            else if (i == 3)//中间当前页
	                            {
	
	
	                                pagenum = pagenum + ' <li><a href="#" class="active" data-num=' + (currentPage) + '>' + currentPage + '</a> </li>';
	                            }
	                            else if (i == 6) {
	
	                                pagenum = pagenum + ' <li><a href="#" data-num=' + (parseInt(currentPage) + 3) + '>...</a> </li>';
	                                pagenum = pagenum + ' <li><a href="#"  data-num=' + totalPages + '>' + totalPages + '</a> </li>';
	                            }
	                            else {
	
	                                pagenum = pagenum + ' <li><a href="#"  data-num=' + (parseInt(currentPage) + i - parseInt(currint)) + '>' + (parseInt(currentPage) + i - parseInt(currint)) + '</a> </li>';
	                            }
	                        }
	
	                    }
	                    else {
	                        for (var i = 0; i <= 6; i++) {
	                            if (i == 0) {
	
	                                pagenum = pagenum + ' <li><a href="#"  data-num="1">1</a> </li>';//201609130930
	                                pagenum = pagenum + ' <li><a href="#" data-num=' + (parseInt(totalPages) - 6) + '>...</a> </li>';//201609130930
	                            }
	                            else {
	                                if (totalPages - 6 + i == currentPage) {
	
	
	                                    pagenum = pagenum + ' <li><a href="#" class="active"  data-num=' + currentPage + '>' + currentPage + '</a> </li>';
	                                }
	                                else {
	
	                                    pagenum = pagenum + ' <li><a href="#"  data-num=' + (totalPages - 6 + i) + '>' + (totalPages - 6 + i) + '</a> </li>';
	                                }
	                            }
	                        }
	                    }
	
	                }
	                else {
	                    for (var i = 0; i < totalPages; i++) {
	                        if (currentPage == i + 1) {
	
	                            pagenum = pagenum + ' <li><a href="#" class="active" data-num=' + currentPage + '>' + currentPage + '</a> </li>';
	
	                        }
	                        else {
	
	                            pagenum = pagenum + ' <li><a href="#"  data-num=' + (i + 1) + '>' + (i + 1) + '</a> </li>';
	
	                        }
	                    }
	                }
	                if (currentPage == totalPages) //最后一页
	                {//处理下一页和尾页的链接
	
	
	                    //output.Append(" <a disabled='disabled' class='colH'>下一页</a> ");
	                    pageNext = "";
	                    lastPage = "";
	                }
	                if (currentPage < totalPages) {//处理下一页和尾页的链接 
	
	                    //output.AppendFormat(" <a data-pageindex='{0}' class='pageLink'>下一页</a> ", currentPage + 1);
	                    //pagePre = '<a href="#"  data-num=' + (parseInt(currentPage) + 1) + ' class="next-page inline">下一页</a>';
	                }
	
	
	            }
	
	            pagenum = pagenum + '</ul>';
	            document.getElementById("pagination").innerHTML = indexPage + pagePre + pagenum + pageNext;
	
	
	        }
	        else {
	            document.getElementById("pagination").innerHTML = "";
	        }
	        $("#pagination a").unbind("click");
	        $("#pagination a").bind("click", function () {
	           
	            if (callback) {
	                callback($(this).attr("data-num"));
	            }
	        });
	
	    }
	}
	//function Paginator(pageSize, currentPage, totalCount, callback) {
	
	
	//}
	


/***/ },
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
/* 22 */,
/* 23 */,
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);__webpack_require__(25);
	module.exports=template('src/tpl/StudentManage/StudentManageList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},$out='';$out+=' ';
	$each($data,function($value,$index){
	$out+=' <tr> <td>';
	$out+=$escape($value.StuName);
	$out+='</td> <td>';
	$out+=$escape($value.LoginId);
	$out+='</td> ';
	include('./StuClassList',$value.StuClassList);
	$out+=' <td> <span class="inline operatBtn seeDetail" data-id="';
	$out+=$escape($value.StuId);
	$out+='-';
	$out+=$escape($value.EditionId);
	$out+='">查看详情</span> ';
	if($value.ClassCount==0){
	$out+=' <span class="inline operatBtn continue" data-id="';
	$out+=$escape($value.StuId);
	$out+='-';
	$out+=$escape($value.StuName);
	$out+='-';
	$out+=$escape($value.GradeId);
	$out+='-';
	$out+=$escape($value.SchoolId);
	$out+='-';
	$out+=$escape($value.EditionId);
	$out+='" >报课</span> ';
	}else{
	$out+=' <span class="inline operatBtn continue" data-id="';
	$out+=$escape($value.StuId);
	$out+='-';
	$out+=$escape($value.StuName);
	$out+='-';
	$out+=$escape($value.GradeId);
	$out+='-';
	$out+=$escape($value.SchoolId);
	$out+='-';
	$out+=$escape($value.EditionId);
	$out+='">续课</span> ';
	}
	$out+=' </td> </tr> ';
	});
	return new String($out);
	});

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/StudentManage/StuClassList',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' <td> ';
	$each($data,function($value,$index){
	$out+=' <p>';
	$out+=$escape($value.SchoolName);
	$out+='</p> ';
	});
	$out+=' </td> <td> ';
	$each($data,function($value,$index){
	$out+=' <p>';
	$out+=$escape($value.ClassName);
	$out+='</p> ';
	});
	$out+=' </td> <td>';
	$each($data,function($value,$index){
	$out+=' <p>';
	$out+=$escape($value.CourseName);
	$out+='</p> ';
	});
	$out+='</td> <td> ';
	$each($data,function($value,$index){
	$out+=' ';
	if($value.IsWarn==1){
	$out+=' <p class="red">';
	$out+=$escape($value.HaveNumber);
	$out+='/';
	$out+=$escape($value.BookNumber);
	$out+='</p> ';
	}else{
	$out+=' <p>';
	$out+=$escape($value.HaveNumber);
	$out+='/';
	$out+=$escape($value.BookNumber);
	$out+='</p> ';
	}
	$out+=' ';
	});
	$out+='</td> <td> ';
	$each($data,function($value,$index){
	$out+=' <p>';
	$out+=$escape($helpers. dateFormat($value.ExpireTime ,  "yyyy-MM-dd"));
	$out+='</p> ';
	});
	$out+='</td>';
	return new String($out);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2JhY2tTdGFnZS9zdHVkZW50LW1hbmFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2x1aS5qcz9lNzkwKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9MVUkvanMvZHJvcGRvd25saXN0LmpzP2ZlZjAqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9jaGVja2JveC5qcz82MTZkKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9MVUkvdG9vbC5qcz81ZTZhKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL3V0aWwuanM/Yjk5MioqKioqIiwid2VicGFjazovLy8uL3NyYy90cGwvdGVtcGxhdGUtaGVscGVycy5qcz8xOTQzKioqKioqIiwid2VicGFjazovLy8uL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvcG9wdXAvcG9wdXB0aXAuanM/ZTE4YioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL3BvcHVwL3Nob3dsb2FkaW1nLmpzPzczMzQqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9wYWdlL1BhZ2luYXRvci5qcz9jYTU5KioiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9TdHVkZW50TWFuYWdlL1N0dWRlbnRNYW5hZ2VMaXN0LnRwbCIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL1N0dWRlbnRNYW5hZ2UvU3R1Q2xhc3NMaXN0LnRwbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTCxpQ0FBZ0M7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0wsa0NBQWlDLEVBQUUsWUFBWTtBQUMvQztBQUNBLEU7Ozs7OztBQ25GQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUM7OztBQUdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0QsdUNBQXNDLFdBQVcsQzs7Ozs7O0FDN0pqRCxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFrQztBQUNsQzs7QUFFQTtBQUNBLHlDQUF3QyxPQUFPLDJCQUEyQjtBQUMxRTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXFDLFlBQVk7QUFDakQ7QUFDQTs7QUFFQTtBQUNBLDBCQUF5QixpRUFBaUU7QUFDMUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0EsYUFBWSxlQUFlO0FBQzNCLGtEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBcUI7QUFDckIsY0FBYTtBQUNiLGNBQWE7QUFDYixjQUFhO0FBQ2IsY0FBYTtBQUNiLGNBQWE7QUFDYixHQUFFO0FBQ0Ysa0NBQWlDO0FBQ2pDLElBQUc7QUFDSCxlQUFjO0FBQ2Q7QUFDQSxJQUFHO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0YsRUFBQyxHOzs7Ozs7QUM5RUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMLG1MQUFrTDs7QUFFbEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLOztBQUVMLG1MQUFrTDs7QUFFbEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMExBQXlMOztBQUV6TDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTCw0TUFBMk0sTUFBTSxNQUFNO0FBQ3ZOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQThELCtGQUErRixtQkFBbUI7QUFDaEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNJQUFxSSw0SEFBNEgsa0JBQWtCLGlEQUFpRDtBQUNwVTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLO0FBQ0wsc0NBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0Esa0lBQWlJLG1IQUFtSCxrQkFBa0IsaURBQWlEO0FBQ3ZUO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3S0FBdUssd0RBQXdELGdCQUFnQjtBQUMvTztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsNktBQTRLLFdBQVcsOENBQThDO0FBQ3JPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVM7QUFDVCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTCw2TUFBNE0sTUFBTSxNQUFNO0FBQ3hOO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0EscUNBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7Ozs7QUFJTCxFQUFDOzs7Ozs7OztBQy9PRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDLGtCQUFrQixhQUFhLDZCQUE2Qix1RkFBdUYsaUJBQWlCO0FBQzFNOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLG1EQUFrRDtBQUNsRDs7Ozs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUEsc0ZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBaUUsRUFBRSwrQ0FBK0M7QUFDbEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3Q0FBdUMsUUFBUTtBQUMvQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjs7QUFFQSx3Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0Esa0dBQWlHO0FBQ2pHO0FBQ0Esd0lBQXVJO0FBQ3ZJOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXVDLFFBQVE7QUFDL0M7O0FBRUEsa0dBQWlHO0FBQ2pHLGtJQUFpSTtBQUNqSTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBbUMsZ0JBQWdCO0FBQ25EOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7OztBQUdqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUErQzs7QUFFL0MsaUVBQWdFLEVBQUU7QUFDbEU7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBOzs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqTEEscUNBQThDO0FBQzlDO0FBQ0E7QUFDQSxjQUFhLDJKQUEySixpQkFBaUIsa0RBQWtELFdBQVcsYUFBYSxTQUFTO0FBQzVRO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBLEVBQUMsRTs7Ozs7O0FDNUNEO0FBQ0E7QUFDQTtBQUNBLGNBQWEsbUlBQW1JO0FBQ2hKO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsRUFBQyxFIiwiZmlsZSI6ImJhY2tTdGFnZS9zdHVkZW50LW1hbmFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwiXHJcbi8v5ZCO5Y+w5Lqk5LqSXHJcbi8v5Y+R6YCB6K+35rGC6LCD5Y+W5pWw5o2u57uR5a6a5LiL5ouJ5qGGXHJcbnZhciBhcnJKeGQgPSBbXTsvL+aVmeWtpueCuVxyXG52YXIgYXJyQmogPSBbXTsvL+ePree6p1xyXG52YXIgYXJyVGJrID0gW107Ly/lkIzmraXor75cclxudmFyIHRwbFRhYmxlU3R1ID0gcmVxdWlyZShcIlN0dWRlbnRNYW5hZ2UvU3R1ZGVudE1hbmFnZUxpc3QudHBsXCIpOy8v5a2m55Sf5YiX6KGoXHJcbnZhciBzdHVHcmFkZSA9IDA7Ly/lubTnuqdcclxudmFyIHN0dUlkOy8v5a2m55SfaWRcclxudmFyIHN0dUVkaXRpb25JZDsvL+WtpueUn2lkXHJcbnJlcXVpcmUoXCIuLi8uLi90cGwvdGVtcGxhdGUtaGVscGVycy5qc1wiKTtcclxudmFyIHBvcCA9IHJlcXVpcmUoXCIuLi9saWIvcG9wdXAvcG9wdXB0aXAuanNcIik7XHJcbnZhciBsb2FkaW1nID0gcmVxdWlyZShcIi4uL2xpYi9wb3B1cC9zaG93bG9hZGltZy5qc1wiKTtcclxudmFyIFBhZ2luYXRvciA9IHJlcXVpcmUoJy4uL2xpYi9wYWdlL1BhZ2luYXRvci5qcycpO1xyXG52YXIgY29tbUpzID0gcmVxdWlyZShcIi4uL2xpYi91dGlsLmpzXCIpOy8v5YWs5YWx5pa55rOVXHJcbnZhciBncmFkZUFyciA9IFt7IG5hbWU6ICfkuIDlubTnuqcnLCBpZDogJzEnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJ+S6jOW5tOe6pycsIGlkOiAnMicsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICfkuInlubTnuqcnLCBpZDogJzMnLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAn5Zub5bm057qnJywgaWQ6ICc0JywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJ+S6lOW5tOe6pycsIGlkOiAnNScsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICflha3lubTnuqcnLCBpZDogJzYnLCBwaWQ6ICcwMF8wMicgfSwgeyBuYW1lOiAn5LiD5bm057qnJywgaWQ6ICc3JywgcGlkOiAnMDBfMDInIH0sIHsgbmFtZTogJ+WFq+W5tOe6pycsIGlkOiAnOCcsIHBpZDogJycgfSwgeyBuYW1lOiAn5Lmd5bm057qnJywgaWQ6ICc5JywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJ+mrmOS4gCcsIGlkOiAnMTAnLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAn6auY5LqMJywgaWQ6ICcxMScsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICfpq5jkuIknLCBpZDogJzEyJywgcGlkOiAnMDBfMDEnIH1dOy8v5bm057qn5Yid5aeL5YyWXHJcblxyXG52YXIgaXNTZWwgPSAwOy8vMOihqOekuuayoeWKoOi9veS4i+aLiTHooajnpLrliqDovb1cclxudmFyIG1vZHVsZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL3RvZG8g6YC76L6R5Ye95pWwXHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB0aGlzLmluaXRCdG5zKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v5Yqg6L295YiX6KGoXHJcbiAgICAgICAgR2V0U3R1RGF0YSgpO1xyXG5cclxuICAgIH0sXHJcbiAgICBpbml0QnRuczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8vdG9kbyDnu5Hlrprkuovku7ZcclxuICAgICAgICAvL+aQnOe0olxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI3NlYXJjaEltZ1wiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgR2V0U3R1RGF0YSgtMSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+ivpuaDhemhtei3s+i9rFxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiLnNlZURldGFpbFwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRhSWQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiL09yZy9TdHVkZW50TWFuYWdlL1N0dURldGFpbC9cIiArIGRhdGFJZDtcclxuICAgICAgICAgICAgLy9cIj9zdHVJZD1cIiArIGRhdGFJZC5zcGxpdCgnLScpWzBdICsgXCImc3R1RWRpdGlvbklkPVwiICsgZGF0YUlkLnNwbGl0KCctJylbMV07XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+WkhOeQhuWNlemAieeUt1xyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2xiTWFuLCNsYldtYW5cIiwgXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgJCgnLnJhZGlvJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSAxKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiNyYWRTZXhcIikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIjc2V4V01hblwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIC8v5oql6K++44CB57ut6K++55qE5by556qXXHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIuY29udGludWVcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRhQXJyID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKTsvL+aVsOe7hGlk44CB5aeT5ZCN44CB5bm057qn44CB5a2m5qChaWTjgIHmlZnmnZBpZFxyXG4gICAgICAgICAgICBzdHVJZCA9IHBhcnNlSW50KGRhdGFBcnIuc3BsaXQoJy0nKVswXSk7XHJcbiAgICAgICAgICAgIHN0dUdyYWRlID0gcGFyc2VJbnQoZGF0YUFyci5zcGxpdCgnLScpWzJdKTtcclxuICAgICAgICAgICAgc3R1RWRpdGlvbklkID0gcGFyc2VJbnQoZGF0YUFyci5zcGxpdCgnLScpWzRdKTtcclxuICAgICAgICAgICAgdmFyIHN0ckdyYWRlID0gY29tbUpzLm51bUdyYWRlVHJhbihwYXJzZUludChkYXRhQXJyLnNwbGl0KCctJylbMl0pKTtcclxuICAgICAgICAgICAgJChcIiNzdHVOYW1lXCIpLmh0bWwoZGF0YUFyci5zcGxpdCgnLScpWzFdICsgXCIoXCIgKyBzdHJHcmFkZSArIFwiKVwiKTsvL+W8oOS4ie+8iOS4g+W5tOe6p++8iVxyXG5cclxuXHJcbiAgICAgICAgICAgIC8v6LCD5Y+W5pWw5o2u5Yid5aeL5YyW5by556qXKOS4i+aLieahhueahOaVsOaNrilcclxuICAgICAgICAgICAgdmFyIGFyclRlbXAgPSBbXTsvL+S4tOaXtuaVsOaNrlxyXG4gICAgICAgICAgICAvL+WKoOi9veePree6p+WIl+ihqFxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL09yZy9TdHVkZW50TWFuYWdlL0dldE9yZ0NsYXNzQ29uTnVtYmVyXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogLTFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLkRhdGEgJiYgZGF0YS5EYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9hcnJCai5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgbmFtZTogXCLlhajpg6hcIiwgaWQ6IDAsIHBpZDogMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL30pOy8v6K++56iLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5EYXRhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyVGVtcC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBkYXRhLkRhdGFbaV0uU3RyQ2xhc3NOYW1lLCBpZDogZGF0YS5EYXRhW2ldLlN0clNjaG9vbEFuZENsYXNzSWQsIHBpZDogZGF0YS5EYXRhW2ldLkNsYXNzSWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pOy8v6K++56iLXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfY2xhc3NcIiwgd2lkdGg6IDEzNSwgc3VidGV4dGxlbmd0aDogMTAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBhcnJUZW1wLCBzZWxlY3RlZENhbGxCYWNrOiBHZXRTdHVEYXRhTm90TG9hZFNlbGVjdCB9KTsvL+aKpeivvueahOePree6p1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2FkQ291cnNlKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsZXJ0KFwi6I635Y+W5pWw5o2u5aSx6LSlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgJChcIiNjb250aW51ZVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvL+aKpeivvueahOehruWumlxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2J0bkFkZExlc3NvblwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGpzb25BZGQgPSB7fTtcclxuICAgICAgICAgICAgdmFyIG9yZ0NvdXJzZSA9ICQoXCIjZHJvcF9jb3Vyc2VcIikuYXR0cihcImRhdGEtaWRcIik7Ly/or77nqIvmlbDnu4RcclxuICAgICAgICAgICAganNvbkFkZC5TdHVJZCA9IHN0dUlkO1xyXG4gICAgICAgICAgICBqc29uQWRkLkNvdXJzZUlkID0gb3JnQ291cnNlLnNwbGl0KCctJylbMF07Ly/or77nqItpZOOAgeivvuasoSDjgIHor77nqIvmnInmlYjmnJ8g6K++5Lu3XHJcbiAgICAgICAgICAgIGpzb25BZGQuQm9va051bWJlciA9IG9yZ0NvdXJzZS5zcGxpdCgnLScpWzFdOy8v6K++5qyhXHJcbiAgICAgICAgICAgIGpzb25BZGQuTGVmdE51bWJlciA9IG9yZ0NvdXJzZS5zcGxpdCgnLScpWzFdOy8v6K++5qyhXHJcbiAgICAgICAgICAgIGpzb25BZGQuRXhwaXJlTW9udGggPSBvcmdDb3Vyc2Uuc3BsaXQoJy0nKVsyXTsvL+ivvuasoeacieaViOacn+aciFxyXG4gICAgICAgICAgICBqc29uQWRkLkluUHJpY2UgPSBvcmdDb3Vyc2Uuc3BsaXQoJy0nKVszXTsvL+ivvuasoeacieaViOacn+aciFxyXG4gICAgICAgICAgICBqc29uQWRkLkJvb2tUeXBlID0gb3JnQ291cnNlLnNwbGl0KCctJylbNF07Ly/or77nqIvnmoTnsbvlnovlkIzmraXor74x6ZyA6KaBXHJcbiAgICAgICAgICAgIGpzb25BZGQuU3R1RWRpdGlvbklkID0gc3R1RWRpdGlvbklkOy8v5a2m55Sf5pWZ5p2QXHJcbiAgICAgICAgICAgIGpzb25BZGQuSGlzdG9yeVR5cGUgPSAwOy8v5oql6K++5ZKM57ut6K++6YO95pivMFxyXG4gICAgICAgICAgICBqc29uQWRkLlNjaG9vbElkID0gJChcIiNkcm9wX2NsYXNzXCIpLmF0dHIoXCJkYXRhLWlkXCIpLnNwbGl0KCctJylbMF07XHJcbiAgICAgICAgICAgIGpzb25BZGQuQ2xhc3NJZCA9ICQoXCIjZHJvcF9jbGFzc1wiKS5hdHRyKFwiZGF0YS1pZFwiKS5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoJChcIiNlbmdUeXBlXCIpLmhhc0NsYXNzKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBqc29uQWRkLklzRW5nID0gMTsvL+aYr+m7mOiupOeahOiLseivrVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGpzb25BZGQuSXNFbmcgPSAwOy8v5LiN5pivXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3R1SWQubGVuZ3RoIDwgMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjsvL+aXoOaViOivt+axglxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+aPkOS6pOihqOWNlVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL09yZy9TdHVkZW50TWFuYWdlL0FkZE9yZ1N0dUNsYXNzXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGpzb25BZGQpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5EYXRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHZXRTdHVEYXRhKC0xKTsvL+mHjeaWsOWKoOi9veWIl+ihqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2NvbnRpbnVlXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBvcC1tYXNrJykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuaPkOS6pOWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy/liJvlu7rlrabnlJ/nmoTor7fmsYJcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNidG5BZGRTdHVcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIganNvbkFkZCA9IHt9O1xyXG5cclxuICAgICAgICAgICAganNvbkFkZC5Vc2VyTmFtZSA9IGVzY2FwZSgkKFwiI3R4dFN0dU5hbWVcIikudmFsKCkudHJpbSgpKTtcclxuICAgICAgICAgICAganNvbkFkZC5UZWwgPSBlc2NhcGUoJChcIiN0eHRTdHVUZWxcIikudmFsKCkudHJpbSgpKTtcclxuICAgICAgICAgICAgaWYgKCQoXCIjcmFkU2V4XCIpLmhhc0NsYXNzKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBqc29uQWRkLkdlbmRlciA9IDE7Ly8x5Li655S377yMMOS4uuWls1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGpzb25BZGQuR3JhZGUgPSAkKFwiI2Ryb3BfbmpcIikuYXR0cihcImRhdGEtaWRcIik7Ly/lubTnuqdcclxuICAgICAgICAgICAganNvbkFkZC5Cb29rVmVyc2lvbiA9ICQoXCIjZHJvcF9iYlwiKS5hdHRyKFwiZGF0YS1pZFwiKTsvL+aVmeadkOeJiOacrFxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChqc29uQWRkLlVzZXJOYW1lLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi5aeT5ZCN5LiN6IO95Li656m6XCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChqc29uQWRkLlRlbC5sZW5ndGggPCAxKSB7XHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuaJi+acuuS4jeiDveS4uuepulwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+agoemqjOeUteivnVxyXG4gICAgICAgICAgICBpZiAoIWNvbW1Kcy5Jc01vYmlsZShqc29uQWRkLlRlbCkpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBhbGVydChcIuaJi+acuuagvOW8j+S4jeWvuVwiKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8v5o+Q5Lqk6KGo5Y2VXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICAgICAgICAgIHVybDogXCIvT3JnL1N0dWRlbnRNYW5hZ2UvQ2hlY2tPcmdQaG9uZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBqc29uQWRkLlRlbCwgdXNlcklkOiAtMVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5EYXRhID09IFwiMFwiKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiLmVnLXBvcCAuY2xvc2VcIikuY2xpY2soKTsvL+WFs+mXreW8ueeql1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+aPkOS6pOihqOWNlVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IFwiL09yZy9TdHVkZW50TWFuYWdlL0FkZE9yZ1N0dVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShqc29uQWRkKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v6L+b6KGM5pi+56S66LWL5YC8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8kKFwiI29yZ05hbWVcIikuaHRtbCgkKFwiI3R4dFN0dU5hbWVcIikudmFsKCkudHJpbSgpKTsvL+WQjeS4jeimgeWKoOWvhui/h+eahFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbG9naW5JZFwiKS5odG1sKGRhdGEuRGF0YSk7Ly/nmbvlvZXotKblj7dcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyQoXCIjbG9naW5UZWxcIikuaHRtbChqc29uQWRkLkxpbmtNYW5UZWwpOy8v55S16K+dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNhZGRQZXJzb25cIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHZXRTdHVEYXRhKCk7Ly/ph43mlrDliqDovb3liJfooahcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi55S16K+d6YeN5aSNXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgLy/lsZXnpLrlroznmoTnoa7lrprnmoTliKDpmaTlvLnnqpdcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNsb2dpbklkQnRuXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKFwiLmVnLXBvcCAuY2xvc2VcIikuY2xpY2soKTsvL+WFs+mXreW8ueeql1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5cclxudmFyIHRpdGxlTyA9IFwi5YWo6YOoXCI7Ly8kKFwiI2Ryb3BfdHlwZVwiKS5hdHRyKFwidGl0bGVcIikgIOWumuS5ieWFqOWxgOWPmOmHj+adpeebkeWQrOaUueWPmOS6i+S7tlxyXG4vL+e7keWumuaVsOaNrlxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIG1vZHVsZS5pbml0KCk7XHJcbiAgICAvL09wdFR5cGVTZWwoKTtcclxuXHJcblxyXG59KTtcclxuXHJcblxyXG4vL+WPkemAgeivt+axguiwg+WPluaVsOaNrlxyXG5mdW5jdGlvbiBHZXRTdHVEYXRhKHBhZ2UpIHtcclxuICAgIGxvYWRpbWcuU2hvd0xvYWRpbmdGb3JUYWJsZSgkKFwiI3RiXCIpLCA4KTtcclxuICAgIGlmIChwYWdlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHBhZ2UgPSAxO1xyXG4gICAgfVxyXG4gICAgdmFyIHBhZ2VTaXplID0gMTA7XHJcbiAgICB2YXIganNvbiA9IHt9O1xyXG4gICAganNvbi5TY2hvb2xJZCA9ICQoXCIjZHJvcF9qeGRcIikuYXR0cihcImRhdGEtaWRcIik7Oy8v5a2m5qCh55qE5LiL5ouJXHJcbiAgICBqc29uLkNsYXNzSWQgPSAkKFwiI2Ryb3BfYmpcIikuYXR0cihcImRhdGEtaWRcIik7Ly/nj63nuqfnmoTkuIvmi4lcclxuICAgIGpzb24uQ291cnNlSWQgPSAkKFwiI2Ryb3BfdGJrXCIpLmF0dHIoXCJkYXRhLWlkXCIpOy8v6K++56iL55qE5LiL5ouJXHJcbiAgICBqc29uLktleVdvcmQgPSBlc2NhcGUoJChcIiN0eHRzZXJjaFwiKS52YWwoKSk7XHJcbiAgICAvL+WKoOi9veWIl+ihqFxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICB1cmw6IFwiL09yZy9TdHVkZW50TWFuYWdlL0dldFN0dUxpc3RcIixcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShqc29uKSwgUGFnZUluZGV4OiBwYWdlLCBQYWdlU2l6ZTogcGFnZVNpemVcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuRGF0YSAmJiBkYXRhLkRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgJChcIiN0YlwiKS5odG1sKHRwbFRhYmxlU3R1KGRhdGEuRGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgJChcIiNUb3RhbGNvdW50XCIpLmh0bWwoZGF0YS5QYWdlU3VtKTtcclxuICAgICAgICAgICAgICAgIFBhZ2luYXRvci5QYWdpbmF0b3IoMTAsIHBhZ2UsIGRhdGEuUGFnZVN1bSwgR2V0U3R1RGF0YSk7XHJcbiAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy/liqDovb3lrabmoKHliJfooahcclxuICAgICAgICAgICAgICAgIGlmIChpc1NlbCAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZFNjaG9vbHMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlzU2VsID0gMTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiN0YlwiKS5odG1sKFwiXCIpO1xyXG4gICAgICAgICAgICAgICAgLy88aW1nIHNyYz1cIi4uLy4uLy4uL2J1bmRsZS9pbWcvbm9jbGFzcy5wbmdcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO1wiPlxyXG4gICAgICAgICAgICAgICAgJChcIiN0YlwiKS5odG1sKCc8dHIgIHN0eWxlPVwiYm9yZGVyOm5vbmU7dGV4dC1hbGlnbjpjZW50ZXI7aGVpZ2h0OjI4MHB4O1wiPjx0ZCBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDtcIiBjb2xzcGFuPVwiOFwiPjxkaXYgY2xhc3M9XCJkYXRhX2ltZ1wiPjxkaXYgY2xhc3M9XCJiaWdfYXJlYVwiIHN0eWxlPVwibWFyZ2luLXRvcDoxMHB4O2xpbmUtaGVpZ2h0OjMwcHg7XCI+PGJyLz48c3Bhbj7mmoLml6DmlbDmja7vvIE8L3NwYW4+PC9kaXY+PC9kaXY+PC90ZD48L3RyPicpOy8v5riF56m65pWw5o2uXHJcbiAgICAgICAgICAgICAgICAkKFwiI3BhZ2luYXRpb25cIikuaHRtbChcIlwiKTsvL+WIhumhteaOp+S7tuS4jeaYvuekulxyXG4gICAgICAgICAgICAgICAgJChcIiNUb3RhbGNvdW50XCIpLmh0bWwoMCk7Ly/mlbDmja7orr7nva7kuLowXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG4vL+WPquaYr+WKoOi9veWIl+ihqOaVsOaNrlxyXG5mdW5jdGlvbiBHZXRTdHVEYXRhTm90TG9hZFNlbGVjdCgpIHtcclxuICAgIHJldHVybiBHZXRTdHVEYXRhKC0xKTtcclxuXHJcbn1cclxuXHJcblxyXG4vL+WKoOi9veWtpuagoVxyXG5mdW5jdGlvbiBsb2FkU2Nob29scygpIHtcclxuICAgIC8v5Yqg6L295a2m5qChXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgIHVybDogXCIvT3JnL1N0dWRlbnRNYW5hZ2UvR2V0T3JnU2Nob29sc1wiLFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGRhdGE6IFwiXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLkRhdGEgJiYgZGF0YS5EYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGFyckp4ZC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIuWFqOmDqFwiLCBpZDogMCwgcGlkOiAwXHJcbiAgICAgICAgICAgICAgICB9KTsvL+WtpuagoVxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLkRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJySnhkLnB1c2goeyBuYW1lOiBkYXRhLkRhdGFbaV0uU2Nob29sTmFtZSwgaWQ6IGRhdGEuRGF0YVtpXS5TY2hvb2xJZCwgcGlkOiBkYXRhLkRhdGFbaV0uU2Nob29sSWQgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9qeGRcIiwgd2lkdGg6IDEzMCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IGFyckp4ZCwgc2VsZWN0ZWRDYWxsQmFjazogR2V0U3R1RGF0YU5vdExvYWRTZWxlY3QsIHN1YnRleHRsZW5ndGg6MTAgfSk7Ly/lrabmoKHlkoznj63nuqfnmoTogZTliqhcclxuICAgICAgICAgICAgICAgIGxvYWRDbGFzcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCLojrflj5bmlbDmja7lpLHotKVcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8v5Yqg6L2954+t57qnXHJcbmZ1bmN0aW9uIGxvYWRDbGFzcygpIHtcclxuICAgIHZhciBqeGRJZCA9ICQoXCIjZHJvcF9qeGRcIikuYXR0cihcImRhdGEtaWRcIik7XHJcblxyXG4gICAgLy/liqDovb3nj63nuqfliJfooahcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvU3R1ZGVudE1hbmFnZS9HZXRPcmdDbGFzc1wiLFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGRhdGE6IGp4ZElkXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5EYXRhICYmIGRhdGEuRGF0YS5sZW5ndGggPiAwKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGFyckJqLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwi5YWo6YOoXCIsIGlkOiAwLCBwaWQ6IDBcclxuICAgICAgICAgICAgICAgIH0pOy8v54+t57qnXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuRGF0YS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnJCai5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YS5EYXRhW2ldLkNsYXNzTmFtZSwgaWQ6IGRhdGEuRGF0YVtpXS5DbGFzc0lkLCBwaWQ6IGRhdGEuRGF0YVtpXS5DbGFzc0lkXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7Ly/nj63nuqdcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9ialwiLCB3aWR0aDogMTMwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogYXJyQmosIHNlbGVjdGVkQ2FsbEJhY2s6IEdldFN0dURhdGFOb3RMb2FkU2VsZWN0LCBzdWJ0ZXh0bGVuZ3RoOiAxMCB9KTsvL+ePree6p1xyXG5cclxuICAgICAgICAgICAgICAgIGxvYWRDb3Vyc2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBhbGVydChcIuiOt+WPluaVsOaNruWksei0pVwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG4vL+WKoOi9veivvueoi1xyXG5mdW5jdGlvbiBsb2FkQ291cnNlKG9iaikge1xyXG4gICAgdmFyIGFyclRlbXAgPSBbXTsvL+WIm+W7uuS4gOS4quS4tOaXtuaVsOe7hFxyXG4gICAgLy/liqDovb3liJfooahcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvU3R1ZGVudE1hbmFnZS9HZXRPcmdDb3Vyc2VcIixcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBkYXRhOiBcIlwiLy/kuIvpnaLnmoTmiYDmnInnmoRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5EYXRhICYmIGRhdGEuRGF0YS5sZW5ndGggPiAwKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGFyclRiay5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIuWFqOmDqFwiLCBpZDogMCwgcGlkOiAwXHJcbiAgICAgICAgICAgICAgICB9KTsvL+ePree6p1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLkRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmogPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnJUZW1wLnB1c2goeyBuYW1lOiBkYXRhLkRhdGFbaV0uQ291cnNlTmFtZSwgaWQ6IGRhdGEuRGF0YVtpXS5Db3Vyc2VJZCArIFwiLVwiICsgZGF0YS5EYXRhW2ldLkJvb2tOdW1iZXIgKyBcIi1cIiArIGRhdGEuRGF0YVtpXS5FeHBpcnlNb250aCArIFwiLVwiICsgZGF0YS5EYXRhW2ldLk91dFByaWNlICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uQm9va1R5cGUsIHBpZDogZGF0YS5EYXRhW2ldLkNvdXJzZUlkIH0pOy8v5oql54+t55qE6K++56iLXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyVGJrLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YS5EYXRhW2ldLkNvdXJzZU5hbWUsIGlkOiBkYXRhLkRhdGFbaV0uQ291cnNlSWQsIHBpZDogZGF0YS5EYXRhW2ldLkNvdXJzZUlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pOy8v5oql54+t55qE6K++56iLXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKG9iaiA9PSAxKSB7Ly/miqXor77nmoTliqDovb3or77nqIvpnIDopoHotYvlgLzkuIDkupvlj4LmlbBcclxuICAgICAgICAgICAgICAgICAgICBsdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2NvdXJzZVwiLCB3aWR0aDogMTAwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogYXJyVGVtcCwgc2VsZWN0ZWRDYWxsQmFjazogbG9hZENvdXJzZURhdGEsIHN1YnRleHRsZW5ndGg6IDEwIH0pOy8v5ZCM5q2l6K++56iL77yM6ZyA6KaB6L+b6KGM6IGU5YqoXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjbGVzc29uTnVtYmVyXCIpLmh0bWwoYXJyVGVtcFswXS5pZC5zcGxpdCgnLScpWzFdKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2xlc3NvblRpbWVcIikuaHRtbChhcnJUZW1wWzBdLmlkLnNwbGl0KCctJylbMl0gKyBcIuaciFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI2xlc3NvblByaWNlXCIpLmh0bWwoYXJyVGVtcFswXS5pZC5zcGxpdCgnLScpWzNdICsgXCLlhYNcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX3Ria1wiLCB3aWR0aDogMTM1LCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogYXJyVGJrLCBzZWxlY3RlZENhbGxCYWNrOiBHZXRTdHVEYXRhTm90TG9hZFNlbGVjdCwgc3VidGV4dGxlbmd0aDogMTAgfSk7Ly/or77nqItcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCLojrflj5bmlbDmja7lpLHotKVcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuLy/ov5vooYzogZTliqjor77nqIvnmoTpgInmi6lcclxuZnVuY3Rpb24gbG9hZENvdXJzZURhdGEoKSB7XHJcbiAgICB2YXIganNEYXRhID0gJChcIiNkcm9wX2NvdXJzZVwiKS5hdHRyKFwiZGF0YS1pZFwiKTsvL+e7hOWQiOeahOaVsOaNrui/m+ihjOiBlOWKqFxyXG5cclxuICAgIGlmIChqc0RhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoXCIjbGVzc29uTnVtYmVyXCIpLmh0bWwoanNEYXRhLnNwbGl0KCctJylbMV0pO1xyXG4gICAgICAgICQoXCIjbGVzc29uVGltZVwiKS5odG1sKGpzRGF0YS5zcGxpdCgnLScpWzJdICsgXCLmnIhcIik7XHJcbiAgICAgICAgJChcIiNsZXNzb25QcmljZVwiKS5odG1sKGpzRGF0YS5zcGxpdCgnLScpWzNdICsgXCLlhYNcIik7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy/kuIvmi4nmoYbliJ3lp4vljJZcclxudmFyIEx1aSA9IHJlcXVpcmUoJy4uLy4uL0xVSS9qcy9sdWknKTtcclxudmFyIHRvb2wgPSByZXF1aXJlKCcuLi8uLi9MVUkvdG9vbCcpO1xyXG52YXIgbHVpID0gbmV3IEx1aSgpO1xyXG4vL+WIm+W7uuS4i+e6p+W8ueWHuuWxguS6i+S7tlxyXG50b29sLnBvcGhpZGUoJCgnLmVnLXBvcCAuY2xvc2UnKSwgJCgnLmVnLXBvcCcpKTtcclxudG9vbC5wb3BzaG93KCQoJy5jcmVhdFN0dWRlbnQnKSwgJCgnI2NyZWF0U3R1ZGVudCcpKTtcclxuLy/or77nqIvlvIDpgJpcclxudG9vbC5wb3BzaG93KCQoJy5jb250aW51ZScpLCAkKCcjY29udGludWUnKSk7XHJcbnRvb2wuU2licygkKCcuc3BhbnMnKSk7XHJcblxyXG4vL+aAp+WIq+aMiemSrlxyXG50b29sLnJhZGlvKCk7XHJcbi8v57yW6L6R5a2m55Sf55qE5by556qXXHJcbnRvb2wucG9wc2hvdygkKCcuZWRpdE1lc2cnKSwgJCgnI2VkaXRNZXNnJykpO1xyXG5cclxuLyrlhajpg6jmlZnlrabngrnnmoTkuIvmi4kqL1xyXG4vL2x1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfanhkXCIsIHdpZHRoOiAxMDAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAn5YWo6YOoJywgaWQ6ICcwJywgcGlkOiAnMScgfV0gfSk7XHJcbi8vLyrmjojor77ml7bpl7TnmoTkuIvmi4kgIOWFqOmDqOePree6pyovXHJcbi8vbHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9ialwiLCB3aWR0aDogMTAwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogW3sgbmFtZTogJ+WFqOmDqCcsIGlkOiAnMCcsIHBpZDogJzEnIH1dIH0pO1xyXG4vLy8q5Lu76K++6ICB5biI55qE5LiL5ouJICDlkIzmraXor74qL1xyXG4vL2x1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfdGJrXCIsIHdpZHRoOiAxMDAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAn5YWo6YOoJywgaWQ6ICcwJywgcGlkOiAnMScgfV0gfSk7XHJcbi8vLy/lubTnuqfnmoTkuIvmi4lcclxubHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9ualwiLCB3aWR0aDogMjYwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogZ3JhZGVBcnIgfSk7XHJcbi8v54mI5pys55qE5LiL5ouJXHJcbmx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfYmJcIiwgd2lkdGg6IDI2MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICcwMScsIGlkOiAnMDAnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJzAyJywgaWQ6ICcwMF8wMScsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICcwMycsIGlkOiAnMDBfMDInLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDQnLCBpZDogJzAwXzAxXzAxJywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJzA1JywgaWQ6ICcwMF8wMV8wMicsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNicsIGlkOiAnMDBfMDJfMDEnLCBwaWQ6ICcwMF8wMicgfSwgeyBuYW1lOiAnMDcnLCBpZDogJzAwXzAyXzAyJywgcGlkOiAnMDBfMDInIH1dIH0pO1xyXG4vL+WIm+W7uuWtpueUn+WQjOatpeivvueoi1xyXG4vL2x1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfY291cnNlXCIsIHdpZHRoOiAxMzUsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAnMDEnLCBpZDogJzAwJywgcGlkOiAnJyB9LCB7IG5hbWU6ICcwMicsIGlkOiAnMDBfMDEnLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDMnLCBpZDogJzAwXzAyJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJzA0JywgaWQ6ICcwMF8wMV8wMScsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNScsIGlkOiAnMDBfMDFfMDInLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAnMDYnLCBpZDogJzAwXzAyXzAxJywgcGlkOiAnMDBfMDInIH0sIHsgbmFtZTogJzA3JywgaWQ6ICcwMF8wMl8wMicsIHBpZDogJzAwXzAyJyB9XSB9KTtcclxuLy/liJvlu7rlrabnlJ/nj63nuqfnmoTkuIvmi4lcclxuLy9sdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2NsYXNzXCIsIHdpZHRoOiAxMzUsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAnMDEnLCBpZDogJzAwJywgcGlkOiAnJyB9LCB7IG5hbWU6ICcwMicsIGlkOiAnMDBfMDEnLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDMnLCBpZDogJzAwXzAyJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJzA0JywgaWQ6ICcwMF8wMV8wMScsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNScsIGlkOiAnMDBfMDFfMDInLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAnMDYnLCBpZDogJzAwXzAyXzAxJywgcGlkOiAnMDBfMDInIH0sIHsgbmFtZTogJzA3JywgaWQ6ICcwMF8wMl8wMicsIHBpZDogJzAwXzAyJyB9XSB9KTtcclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9iYWNrU3RhZ2Uvc3R1ZGVudC1tYW5hZ2UuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAyOCIsInZhciBMdWlEcm9wRG93bkxpc3QgPSByZXF1aXJlKCcuLi9qcy9kcm9wZG93bmxpc3QnKTtcclxudmFyIEx1aUNoZWNrQm94ID0gcmVxdWlyZSgnLi4vanMvY2hlY2tib3gnKTtcclxuXHJcbmZ1bmN0aW9uIEx1aSgpIHtcclxuICAgIC8vdGhpcy5jaGVja0JveCA9IG51bGw7XHJcbiAgICAvLyB0aGlzLmluaXRXb3JkU3BlYWsoKTtcclxufTtcclxuXHJcbkx1aS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogTHVpLFxyXG4gICAgaW5pdFRyZWU6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgdmFyIHQgPSBuZXcgTHVpVHJlZSgpO1xyXG4gICAgICAgIHJldHVybiB0LmluaXQocCk7XHJcbiAgICB9LFxyXG4gICAgaW5pdERyb3BEb3duTGlzdDogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICB2YXIgZCA9IG5ldyBMdWlEcm9wRG93bkxpc3QoKTtcclxuICAgICAgICByZXR1cm4gZC5pbml0KHApO1xyXG4gICAgfSxcclxuICAgIGluaXRDaGVja0JveDogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAvL++/ve+/ve+/ve+/vdK777+977+977+977+977+977+977+977+9yKvvv73Wte+/vWNoZWNrYm9477+977+977+977+9XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrQm94KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tCb3ggPSBuZXcgTHVpQ2hlY2tCb3goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGMgPSBuZXcgTHVpQ2hlY2tCb3goKTtcclxuICAgICAgICByZXR1cm4gYy5pbml0KHApO1xyXG5cclxuICAgIH0sXHJcbiAgICBpbml0V29yZFNwZWFrOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIC8v77+977+977+977+90rvvv73vv73vv73vv73vv73vv73vv73vv73Iq++/vda177+9d29yZHNwZWFr77+977+977+977+9XHJcbiAgICAgICAgaWYgKCF0aGlzLndvcmRzcGVhaykge1xyXG4gICAgICAgICAgICB0aGlzLndvcmRzcGVhayA9IG5ldyBMdWlXb3JkU3BlYWsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGMgPSBuZXcgTHVpV29yZFNwZWFrKCk7XHJcbiAgICAgICAgcmV0dXJuIGMuaW5pdChwKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTHVpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvanMvbHVpLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIiwiZnVuY3Rpb24gTHVpRHJvcERvd25MaXN0KCkge1xyXG4gICAgdGhpcy5wYXJhbSA9IG51bGw7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gXCJcIjtcclxufVxyXG52YXIgZHJvcGNvdW50ID0gMTAwMDtcclxuTHVpRHJvcERvd25MaXN0LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWlEcm9wRG93bkxpc3QsXHJcbiAgICBpbml0OiBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gdGhpcy53YXJwaWQgPSBcIiNcIiArIHBhcmFtLndhcnBpZDtcclxuICAgICAgICB2YXIgd2FycGlkID0gcGFyYW0ud2FycGlkO1xyXG4gICAgICAgIGlmICghcGFyYW0uZGF0YSkgeyByZXR1cm47IH1cclxuICAgICAgICB2YXIgZGF0YSA9IHBhcmFtLmRhdGE7XHJcblxyXG4gICAgICAgIHZhciB3aWR0aCA9IHBhcmFtLndpZHRoID0gcGFyYW0ud2lkdGggfHwgMTgwO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBwYXJhbS5oZWlnaHQgPSBwYXJhbS5oZWlnaHQgfHwgMjAwO1xyXG4gICAgICAgIHZhciBzdWJ0ZXh0bGVuZ3RoID0gcGFyYW0uc3VidGV4dGxlbmd0aCA9IHBhcmFtLnN1YnRleHRsZW5ndGggfHwgNTtcclxuICAgICAgICBwYXJhbS52YWx1ZUZpZWxkID0gcGFyYW0udmFsdWVGaWVsZCB8fCBcImlkXCI7XHJcbiAgICAgICAgcGFyYW0udGV4dEZpZWxkID0gcGFyYW0udGV4dEZpZWxkIHx8IFwibmFtZVwiO1xyXG4gICAgICAgIHZhciB2YWx1ZUZpZWxkID0gcGFyYW0udmFsdWVGaWVsZDtcclxuICAgICAgICB2YXIgdGV4dEZpZWxkID0gcGFyYW0udGV4dEZpZWxkO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZENhbGxCYWNrID0gcGFyYW0uc2VsZWN0ZWRDYWxsQmFjaztcclxuICAgICAgICB2YXIgbG9hZGVkQ2FsbEJhY2sgPSBwYXJhbS5sb2FkZWRDYWxsQmFjaztcclxuICAgICAgICB2YXIgemluZGV4ID0gcGFyYW0uemluZGV4O1xyXG4gICAgICAgIGlmIChwYXJhbS5kYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgZCA9IHt9O1xyXG4gICAgICAgICAgICBkW3ZhbHVlRmllbGRdID0gLTE7XHJcbiAgICAgICAgICAgIGRbdGV4dEZpZWxkXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaChkKTtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6K6+572u6buY6K6k5YC8XHJcbiAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IHBhcmFtLmRlZmF1bHRWYWx1ZSA9IHBhcmFtLmRlZmF1bHRWYWx1ZSB8fCBkYXRhWzBdW3ZhbHVlRmllbGRdO1xyXG4gICAgICAgIHZhciBkZWZhdWx0VGV4dCA9IHBhcmFtLmRlZmF1bHRUZXh0ID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IGRhdGFbMF1bdGV4dEZpZWxkXTtcclxuICAgICAgICB0aGlzLnBhcmFtID0gcGFyYW07XHJcbiAgICAgICAgdmFyIHVsSHRtbCA9IFwiPGRpdiBjbGFzcz0nZHJvcGRpdiBkbic+XCI7XHJcbiAgICAgICAgdWxIdG1sICs9ICcgIDx1bCBjbGFzcz1cImRyb3B1bFwiIHN0eWxlPVwibWF4LWhlaWdodDonICsgaGVpZ2h0ICsgJ3B4O292ZXJmbG93OmF1dG87XCIgZGF0YS1pZD1cIicgKyBkZWZhdWx0VmFsdWUgKyAnXCIgZGF0YS1uYW1lPVwiJyArIGRlZmF1bHRUZXh0ICsgJ1wiPic7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZGF0YS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFba107XHJcbiAgICAgICAgICAgIHZhciB2ID0gaXRlbVt0ZXh0RmllbGRdLmxlbmd0aCA+IHN1YnRleHRsZW5ndGggPyBpdGVtW3RleHRGaWVsZF0uc3Vic3RyaW5nKDAsIHN1YnRleHRsZW5ndGgpICsgXCIuLi5cIiA6IGl0ZW1bdGV4dEZpZWxkXTtcclxuICAgICAgICAgICAgdmFyIGl0ZW1IdG1sID0gJzxsaSB0aXRsZT0nICsgaXRlbVt0ZXh0RmllbGRdICsgJyBkYXRhLWluZGV4PScgKyBrICsgJyBkYXRhLWlkPScgKyBpdGVtW3ZhbHVlRmllbGRdICsgJyBkYXRhLXRhZz1cXCcnICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtrXSkgKyAnXFwnPicgKyB2ICsgJzwvbGk+JztcclxuICAgICAgICAgICAgdWxIdG1sICs9IGl0ZW1IdG1sO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1bEh0bWwgKz0gXCI8L3VsPlwiO1xyXG4gICAgICAgIHVsSHRtbCArPSBcIjwvZGl2PlwiO1xyXG4gICAgICAgIHZhciBzcGFuSHRtbCA9ICcgPHNwYW4gc3R5bGU9XCJ3aWR0aDogJyArIHdpZHRoICsgJ3B4O1wiIGNsYXNzPVwiZGliXCI+PHNwYW4gZGF0YS10eXBlPVwiZHJvcGRvd25saXN0X2Ryb3Bfc3BhblwiIGlkPVwic3BhbicgKyBwYXJhbS53YXJwaWQgKyAnXCI+JyArIGRlZmF1bHRUZXh0ICsgJzwvc3Bhbj4gPGkgY2xhc3M9XCJudW1fZG93blwiPjwvaT48L3NwYW4+JztcclxuXHJcbiAgICAgICAgdmFyIGNvbiA9ICQoXCIjXCIgKyB3YXJwaWQpO1xyXG4gICAgICAgIGNvbi5jc3MoeyB3aWR0aDogd2lkdGggfSk7XHJcbiAgICAgICAgY29uLmFkZENsYXNzKFwibHVpX2Ryb3Bkb3dubGlzdFwiKTtcclxuICAgICAgICBjb24uaHRtbChzcGFuSHRtbCk7XHJcbiAgICAgICAgY29uLmFwcGVuZCh1bEh0bWwpO1xyXG4gICAgICAgIGlmICh6aW5kZXgpIHtcclxuICAgICAgICAgICAgY29uLmZpbmQoXCIuZHJvcGRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIHppbmRleCk7XHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwiemluZGV4XCIsIHppbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gY29uLmZpbmQoXCIuZHJvcGRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIGRyb3Bjb3VudC0tKTtcclxuICAgICAgICAgICAgLy8gY29uLmF0dHIoXCJ6aW5kZXhcIiwgZHJvcGNvdW50ICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbi5hZGRDbGFzcyhcImJ0bl9udW1fdXBkb3duXCIpLmFkZENsYXNzKFwiYnRuX251bV91cGRvd24xXCIpLmFkZENsYXNzKFwiZGliXCIpO1xyXG4gICAgICAgIGNvbi5hdHRyKFwidGl0bGVcIiwgZGVmYXVsdFRleHQpO1xyXG4gICAgICAgIGNvbi5hdHRyKFwiZGF0YS1pZFwiLCBkZWZhdWx0VmFsdWUpO1xyXG5cclxuICAgICAgICB2YXIgdWwgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgdWxcIik7XHJcbiAgICAgICAgdmFyIGRyb3BkaXYgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgLmRyb3BkaXZcIik7XHJcbiAgICAgICAgdmFyIGxpID0gJChcIiNcIiArIHdhcnBpZCArIFwiIHVsIGxpXCIpO1xyXG4gICAgICAgIHZhciBzcGFuID0gY29uLmZpbmQoXCJzcGFuW2RhdGEtdHlwZT0nZHJvcGRvd25saXN0X2Ryb3Bfc3BhbiddXCIpO1xyXG4gICAgICAgIC8v5LqL5Lu2XHJcbiAgICAgICAgLy/kuIvmi4nkuovku7ZcclxuICAgICAgICBjb24uY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHVsLmlzKFwiOnZpc2libGVcIikpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVsLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIi5kcm9wZGl2XCIpLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgICAgIC8vIGRyb3BkaXYuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gdWwuc2xpZGVEb3duKDIwMCk7XHJcbiAgICAgICAgICAgICAgICBkcm9wZGl2LnNsaWRlRG93bigyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiYm9keVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIHVsLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgJChcIi5kcm9wZGl2XCIpLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGNvbi5tb3VzZWxlYXZlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy8gICAgIHVsLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvL+mAieS4reS6i+S7tlxyXG4gICAgICAgIGxpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gJCh0aGlzKS5odG1sKCk7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEpzb24gPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWpvc25cIik7XHJcbiAgICAgICAgICAgIHZhciBhbGx0aXRsZSA9ICQodGhpcykuYXR0cihcInRpdGxlXCIpO1xyXG4gICAgICAgICAgICBzcGFuLnRleHQoc2VsZWN0ZWRUZXh0KTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1pZFwiLCBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1qc29uXCIsIHNlbGVjdGVkSnNvbik7XHJcbiAgICAgICAgICAgIHNwYW4uYXR0cihcInRpdGxlXCIsIGFsbHRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwidGl0bGVcIiwgYWxsdGl0bGUpO1xyXG4gICAgICAgICAgICBjb24uYXR0cihcImRhdGEtaWRcIiwgc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8v6YCJ5Lit5Zue6LCD5LqL5Lu2XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhbGxCYWNrKHdhcnBpZCwgc2VsZWN0ZWRWYWx1ZSwgYWxsdGl0bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3BhbiA9IHNwYW47XHJcbiAgICAgICAgLy/orr7nva7pu5jorqTlgLxcclxuICAgICAgICB0aGlzLnNldFZhbHVlKGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBzcGFuLmF0dHIoXCJkYXRhLWlkXCIpLCB0ZXh0OiBzcGFuLmF0dHIoXCJ0aXRsZVwiKSwgemluZGV4OiAkKHRoaXMuc2VsZWN0b3IpLmF0dHIoXCJ6aW5kZXhcIikgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiAtMSwgdGV4dDogXCJcIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy/mmrTpnLLnu5nlpJbpg6jnmoTmlrnms5VcclxuICAgIGdldFNlbGVjdGVkSnNvblZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzcGFuID0gdGhpcy5zcGFuO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzcGFuLmF0dHIoXCJkYXRhLWpzb25cIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHRleHRzZWwgPSBcIlwiO1xyXG4gICAgICAgIC8v6YCJ5Lit55qE5YC8XHJcbiAgICAgICAgdmFyIHNlbEl0ZW07XHJcbiAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCB0aGlzLnBhcmFtLmRhdGEubGVuZ3RoOyBtKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1zZWwgPSB0aGlzLnBhcmFtLmRhdGFbbV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtc2VsW3RoaXMucGFyYW0udmFsdWVGaWVsZF0gPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRleHRzZWwgPSBpdGVtc2VsW3RoaXMucGFyYW0udGV4dEZpZWxkXTtcclxuICAgICAgICAgICAgICAgIHNlbEl0ZW0gPSBpdGVtc2VsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1pZFwiLCB2YWx1ZSk7XHJcbiAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1qc29uXCIsIEpTT04uc3RyaW5naWZ5KHNlbEl0ZW0pKTtcclxuICAgICAgICBzcGFuLmF0dHIoXCJ0aXRsZVwiLCB0ZXh0c2VsKTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmF0dHIoXCJ0aXRsZVwiLCB0ZXh0c2VsKTtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZFRleHQgPSB0ZXh0c2VsO1xyXG4gICAgICAgIHZhciB2ID0gdGV4dHNlbC5sZW5ndGggPiB0aGlzLnBhcmFtLnN1YnRleHRsZW5ndGggPyB0ZXh0c2VsLnN1YnN0cmluZygwLCB0aGlzLnBhcmFtLnN1YnRleHRsZW5ndGgpICsgXCIuLi5cIiA6IHRleHRzZWw7XHJcbiAgICAgICAgc3Bhbi50ZXh0KHYpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5sb2FkZWRDYWxsQmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtLmxvYWRlZENhbGxCYWNrKGNvbnRhaW5lcklkLCBzZWxlY3RlZFZhbHVlLCBzZWxlY3RlZFRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IEx1aURyb3BEb3duTGlzdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvanMvZHJvcGRvd25saXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIiwiXHJcbmZ1bmN0aW9uIEx1aUNoZWNrQm94KCkge1xyXG4gICAgdGhpcy5zZWxlY3RvciA9IFwibHVpY2hlY2tcIjtcclxuICAgIC8v5Y+C5pWwXHJcbiAgICB0aGlzLnBhcmFtID0ge307XHJcbn1cclxuXHJcbkx1aUNoZWNrQm94LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWlDaGVja0JveCxcclxuICAgIC8qXHJcbiAgICAgKndhcnBpZCDlrrnlmahpZFxyXG4gICAgICpkYXRhIOaVsOaNrumbhu+8jGpzb24g5LiyIFt7bmFtZTpyZXgsdmFsOjAwMX0se25hbWU6bGlsZWksdmFsOjAwMn1dXHJcbiAgICAgKuWxleekuuWtl+autSAgIHRleHRGaWVsZFxyXG4gICAgICrlrp7pmYXlgLzlrZfmrrUgdmFsdWVGaWVsZFxyXG4gICAgICrlm57osIPlh73mlbAgY2FsbGJhY2sg5Y+C5pWw5Li65b2T5YmN6Kem5Y+R55qE5aSN6YCJ5qGG5LiK57uR5a6a55qE5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgIHZhciBjdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHBhcmFtICYmIHBhcmFtLmdyb3VwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSAnbHVpY2hlY2tbZGF0YS1uYW1lPVwiJyArIHBhcmFtLmdyb3VwICsgJ1wiXSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrU3R5bGUgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIikgPT0gMSA/IFwiY2hlY2tfc2VsXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVja3Nob3cgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLXNob3djaGVja2JveFwiKSAhPSAxO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRleHQgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLXRleHRcIik7XHJcbiAgICAgICAgICAgIHZhciBoID0gJzxpIGNsYXNzPVwiaWNvbl9jaGVjayAnICsgaXNjaGVja1N0eWxlICsgJyBcIj48L2k+JztcclxuICAgICAgICAgICAgdmFyIHMgPSAnPHNwYW4gY2xhc3M9XCJjaGVja190ZXh0XCIgIG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgPicgKyB0ZXh0ICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBoID0gaXNjaGVja3Nob3cgPyBoICsgcyA6IHM7XHJcbiAgICAgICAgICAgIC8vIGlmICgkKGl0ZW0pLmZpbmQoXCJpY29uX2NoZWNrXCIpLmxlbmd0aCA+IDAgfHwgJChpdGVtKS5maW5kKFwiY2hlY2tfdGV4dFwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoaXRlbSkuaHRtbChoKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jc3MoeyBcImN1cnNvclwiOiBcInBvaW50ZXJcIiB9KTtcclxuICAgICAgICAgICAgJChpdGVtKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgJChpdGVtKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oXCJpXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tfc2VsXCIpLmFkZENsYXNzKFwiY2hlY2tfZGVmXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oXCJpXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tfZGVmXCIpLmFkZENsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gYWxlcnQoXCJiaW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtJiZwYXJhbS5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBncm91cG5hbWUgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLW5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGN0aGlzLmdldEpzb25WYWx1ZShncm91cG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6LCD55So5Zue6LCD5Ye95pWw77yM5bm26L+U5Zue57uE5ZCN5ZKM5omA6YCJ5Lit5YC85b6XanNvbuS4slxyXG4gICAgICAgICAgICAgICAgICAgIC8vcGFyYW0uY2FsbGJhY2soZ3JvdXBuYW1lLCB2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmNhbGxiYWNrKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICAvL+iuvue9rmNoZWNrYm9457uE5ZOq5Lqb5YC86KKr6YCJ5LitXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKG5hbWUsIHZhbCkge1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZmlsdGVyKCdbZGF0YS12YWw9XCInICsgdmFsICsgJ1wiXScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKGl0ZW0pLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5ZjaGVja2JveOe7hOmAieS4reeahOWAvFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHIgPSBbXTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgci5wdXNoKCQoaXRlbSkuYXR0cihcImRhdGEtdmFsXCIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWxlcnQoci5qb2luKCcsJykpO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+WY2hlY2tib3jnu4TpgInkuK3nmoTlgLxcclxuICAgIGdldEpzb25WYWx1ZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBqc29uc3RyID0gJChpdGVtKS5hdHRyKFwiZGF0YS1qc29uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25zdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByLnB1c2goSlNPTi5wYXJzZSh1bmVzY2FwZShqc29uc3RyKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9LFxyXG4gICAgLyoq5Yik5pat5b2T5YmNIGNoZWNrYm94IOaYr+WQpumAieS4rSAqL1xyXG4gICAgaXNjaGVjazogZnVuY3Rpb24gKG5hbWUsIHZhbCkge1xyXG4gICAgICAgIHZhciBpdGVtID0gJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5maWx0ZXIoJ1tkYXRhLXZhbD1cIicgKyB2YWwgKyAnXCJdJylbMF07XHJcbiAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGlzY2hlY2sgPT0gMTtcclxuICAgIH0sXHJcbiAgICAvKirliKTmlq3lvZPliY0gY2hlY2tib3gg5piv5ZCm6YCJ5LitICovXHJcbiAgICBpc2NoZWNrRWxlbWVudDogZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICByZXR1cm4gaXNjaGVjayA9PSAxO1xyXG4gICAgfSxcclxuICAgIC8qKuaooeaLn+WNleWHuyDlj6rmlLnlj5jmoLflvI8gKi9cclxuICAgIHNldENsaWNrU3R5bGU6IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMCk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY2hpbGRyZW4oXCJpXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDEpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNoaWxkcmVuKFwiaVwiKS5hZGRDbGFzcyhcImNoZWNrX3NlbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzPUx1aUNoZWNrQm94O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9jaGVja2JveC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiA0IDcgOCAxMCAxMiAxMyAxOSAyMCAyMSAyNiAyNyAyOCA0MyIsIlxyXG5cclxuZnVuY3Rpb24gcG9wc2hvdyhzZWxlLCBwb3BzaG93KSB7Ly/lvLnlh7rlsYLnmoTmmL7npLpcclxuICAgXHJcbiAgICBzZWxlLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwb3BzaG93LnNob3coKTtcclxuICAgICAgICAkKCcucG9wLW1hc2snKS5zaG93KCk7XHJcbiAgICAgICAgJCgnLnBvcC1tYXNrJykuc2hvdygpO1xyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBwb3BoaWRlKHNlbGUsIHBvcHNob3cpIHsvL+W8ueWHuuWxgueahOa2iOWksVxyXG4gICAgc2VsZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcG9wc2hvdy5oaWRlKCk7XHJcbiAgICAgICAgJCgnLnBvcC1tYXNrJykuaGlkZSgpO1xyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBjaGVja0Jvb3goKSB7Ly/lpI3pgInmoYbnmoTmoLflvI9cclxuICAgICQoJy5jaGVja0JveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknKSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIGNob29zZUFsbCgpIHsvL+WFqOmAieWFqOS4jemAiVxyXG4gICAgJCgnLmNoZWNrQm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBudW0gPSAkKCcuY2hlY2tCb3gnKS5pbmRleCgkKHRoaXMpKTtcclxuICAgICAgICBpZiAobnVtID09IDApIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknKSA9PSAndmlzaWJsZScpIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgI2ZmZicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciAkaW1ncyA9ICQubWFrZUFycmF5KCQoJy50YWJsZSB0cjpub3QoOmZpcnN0KScpLmZpbmQoJ2ltZycpKTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gJGltZ3MuZXZlcnkoZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnN0eWxlLnZpc2liaWxpdHkgPT0gJ3Zpc2libGUnO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZmlyc3QoKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbn1cclxuZnVuY3Rpb24gU2licyhUaGlzKSB7XHJcbiAgICBUaGlzLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJhZGlvKCkgey8v5Y2V6YCJ55qE5qC35byPXHJcbiAgICAkKCcucmFkaW8nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCgnLnJhZGlvJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2V0Q29va2llKG9iak5hbWUsIG9ialZhbHVlLCBvYmpIb3Vycykge1xyXG4gICAgdmFyIHN0ciA9IG9iak5hbWUgKyBcIj1cIiArIGVzY2FwZShvYmpWYWx1ZSk7XHJcblxyXG4gICAgaWYgKG9iakhvdXJzID4gMCkgeyAvL+S4ujDml7bkuI3orr7lrprov4fmnJ/ml7bpl7TvvIzmtY/op4jlmajlhbPpl63ml7Zjb29raWXoh6rliqjmtojlpLFcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdmFyIG1zID0gb2JqSG91cnMgKiAzNjAwICogMTAwMDtcclxuICAgICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyBtcyk7XHJcbiAgICAgICAgc3RyICs9IFwiOyBleHBpcmVzPVwiICsgZGF0ZS50b0dNVFN0cmluZygpICsgXCI7cGF0aD0vXCI7XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5jb29raWUgPSBzdHI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldENvb2tpZShvYmpOYW1lKSB7IC8v6I635Y+W5oyH5a6a5ZCN56ew55qEY29va2ll55qE5YC8XHJcbiAgICB2YXIgYXJyU3RyID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiOyBcIik7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyclN0ci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0ZW1wID0gYXJyU3RyW2ldLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICBpZiAodGVtcFswXSA9PSBvYmpOYW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1bmVzY2FwZSh0ZW1wWzFdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8v5by55Ye65Yqg6L295Zu+54mHXHJcbmZ1bmN0aW9uIFNob3dMb2FkaW5nKG9iaikge1xyXG4gICAgb2JqLmh0bWwoalF1ZXJ5KFwiI2RpdkxvYWRpbmdcIikuaHRtbCgpKTtcclxufVxyXG5mdW5jdGlvbiB0aW1lVGlja0JpZyhzZWNvbmQpIHtcclxuICAgICQoXCIudGltZXMtYmlnXCIpLmh0bWwoc2Vjb25kKTtcclxuICAgIHZhciB0ID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIudGltZXMtYmlnXCIpLmh0bWwoLS1zZWNvbmQpO1xyXG4gICAgICAgIGlmIChzZWNvbmQgPD0gMCkge1xyXG4gICAgICAgICAgICAkKFwiLnJvdGF0ZS1wb2ludFwiKS5jc3MoeyBcImFuaW1hdGlvbi1wbGF5LXN0YXRlXCI6IFwicGF1c2VkXCIgfSk7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMTAwMCk7XHJcbiAgICAkKFwiLnJvdGF0ZS1wb2ludFwiKS5jc3MoeyBcImFuaW1hdGlvbi1wbGF5LXN0YXRlXCI6IFwicnVubmluZ1wiIH0pO1xyXG59XHJcblxyXG4vL+WKoOi9veWbvueJh+WIsOafkOS4quWFg+e0oOS4rVxyXG5mdW5jdGlvbiBJbnNlcnRMb2FkaW5nKG9iaikge1xyXG4gICAgb2JqLmFwcGVuZChqUXVlcnkoXCIjZGl2TG9hZGluZ1wiKS5odG1sKCkpO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHBvcGhpZGU6IHBvcGhpZGUsXHJcbiAgICBwb3BzaG93OiBwb3BzaG93LFxyXG4gICAgY2hlY2tCb294OiBjaGVja0Jvb3gsXHJcbiAgICBTaWJzOiBTaWJzLFxyXG4gICAgcmFkaW86IHJhZGlvLFxyXG4gICAgY2hvb3NlQWxsOiBjaG9vc2VBbGwsXHJcbiAgICBzZXRDb29raWU6IHNldENvb2tpZSwvL+iuvue9rmNvb2tpZVxyXG4gICAgZ2V0Q29va2llOiBnZXRDb29raWUsIC8vIOiOt+WPlmNvb2tpZVxyXG4gICAgU2hvd0xvYWRpbmc6IFNob3dMb2FkaW5nLC8v5Yqg6L295LitXHJcbiAgICBJbnNlcnRMb2FkaW5nOiBJbnNlcnRMb2FkaW5nLFxyXG4gICAgdGltZVRpY2tCaWc6IHRpbWVUaWNrQmlnLy/lgJLorqHml7ZcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvdG9vbC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA1IDYgNyA4IDkgMTIgMTMgMTggMTkgMjAgMjEgMjcgMjggMzYiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGNoZWNrTnVtOiBmdW5jdGlvbiAoZXZlbnQpIHtcclxuXHJcbiAgICAgICAgdmFyIGtleW51bSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgaWYgKChrZXludW0gPj0gNDggJiYga2V5bnVtIDw9IDU3KSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcIkN1dFwiLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhciBuVCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XHJcbiAgICAgICAgICAgIC8v56ys5LiA5Liq5LiN6IO96L6T5YWlMFxyXG4gICAgICAgICAgICBpZiAoKG5UID09IFwiXCIpICYmIGtleW51bSA9PSA0OClcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5ULmxlbmd0aCA+IDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG1hdGNoTnVtOiBmdW5jdGlvbiAodCkge1xyXG4gICAgICAgIHQudmFsdWUgPSB0LnZhbHVlLnRyaW10ZXh0KCcuJyk7XHJcbiAgICB9LFxyXG4gICAgY2hlY2tGbG9hdDogZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgLy92YXIgc2NvcmUgPSB0aGlzLnRvdGFsU29yZTtcclxuICAgICAgICB2YXIga2V5bnVtID0gZXZlbnQua2V5Q29kZTtcclxuICAgICAgICAvL2NvbnNvbGUubG9nKGtleW51bSk7XHJcbiAgICAgICAgaWYgKChrZXludW0gPj0gNDggJiYga2V5bnVtIDw9IDU3KSB8fCAoa2V5bnVtID09IDQ2KSkge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcIkN1dFwiLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhciBuVCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkudmFsKCk7XHJcbiAgICAgICAgICAgIC8v56ys5LiA5Liq5a2X56ym5LiN6IO95Li65bCP5pWw54K577yM5LiN6IO96YeN5aSN6L6T5YWl5bCP5pWw54K5XHJcbiAgICAgICAgICAgIGlmICgoblQgPT0gXCJcIiB8fCBuVC5pbmRleE9mKFwiLlwiKSA+IC0xKSAmJiBrZXludW0gPT0gNDYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL+Wwj+aVsOeCueWQjuS/neeVmeS4gOS9jVxyXG4gICAgICAgICAgICBlbHNlIGlmIChuVC5sZW5ndGggPiAyICYmIG5ULmluZGV4T2YoXCIuXCIpID09IG5ULmxlbmd0aCAtIDIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8w5ZCO6Z2i5Y+q6IO96L6T5YWl5bCP5pWw54K5XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5UID09IFwiMFwiICYmIGtleW51bSAhPSA0NilcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIC8v5LiJ5L2N5pWw5ZCO5Y+q6IO96L6T5YWl5bCP5pWw54K5XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5ULmxlbmd0aCA9PSAzICYmIG5ULmluZGV4T2YoXCIuXCIpIDwgMCAmJiBrZXludW0gIT0gNDYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5ULmxlbmd0aCA+IDQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIG51bUdyYWRlVHJhbjogZnVuY3Rpb24gKHQpIHsgLy/mlbDlrZflubTnuqfovazmjaJcclxuICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICBzd2l0Y2ggKHQpIHtcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5LiA5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgMjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuS6jOW5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLkuInlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5Zub5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgNTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuS6lOW5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLlha3lubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSA3OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5LiD5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgODpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuWFq+W5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDk6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLkuZ3lubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSAxMDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIumrmOS4gFwiO1xyXG4gICAgICAgICAgICBjYXNlIDExOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi6auY5LqMXCI7XHJcbiAgICAgICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLpq5jkuIlcIjtcclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9LCBJc01vYmlsZTogZnVuY3Rpb24odCkge1xyXG4gICAgICAgIHJldHVybiAoL14xWzN8NHw1fDd8OF1cXGR7OX0kLy50ZXN0KHQpKTsvL+agoemqjOaJi+acuueahOagvOW8j1xyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvbGliL3V0aWwuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSA0IDEyIDEzIDIxIDIzIDI3IDI4IiwiLy92YXIgdGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlJyk7XHJcbnZhciB0ZW1wbGF0ZSA9IHJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xyXG5cclxuLyoqIFxyXG4gKiDlr7nml6XmnJ/ov5vooYzmoLzlvI/ljJbvvIwgXHJcbiAqIEBwYXJhbSBkYXRlIOimgeagvOW8j+WMlueahOaXpeacnyBcclxuICogQHBhcmFtIGZvcm1hdCDov5vooYzmoLzlvI/ljJbnmoTmqKHlvI/lrZfnrKbkuLJcclxuICogICAgIOaUr+aMgeeahOaooeW8j+Wtl+avjeacie+8miBcclxuICogICAgIHk65bm0LCBcclxuICogICAgIE065bm05Lit55qE5pyI5Lu9KDEtMTIpLCBcclxuICogICAgIGQ65pyI5Lu95Lit55qE5aSpKDEtMzEpLCBcclxuICogICAgIGg65bCP5pe2KDAtMjMpLCBcclxuICogICAgIG065YiGKDAtNTkpLCBcclxuICogICAgIHM656eSKDAtNTkpLCBcclxuICogICAgIFM65q+r56eSKDAtOTk5KSxcclxuICogICAgIHE65a2j5bqmKDEtNClcclxuICogQHJldHVybiBTdHJpbmdcclxuICogQGF1dGhvciB5YW5pcy53YW5nXHJcbiAqIEBzZWVcdGh0dHA6Ly95YW5pc3dhbmcuY29tL2Zyb250ZW5kLzIwMTMvMDIvMTYvZGF0ZWZvcm1hdC1wZXJmb3JtYW5jZS9cclxuICovXHJcblxyXG4vL+aXtumXtOi9rOaNolxyXG50ZW1wbGF0ZS5oZWxwZXIoJ2RhdGVGb3JtYXQnLCBmdW5jdGlvbiAoZGF0ZSwgZm9ybWF0KSB7XHJcbiAgICBkYXRlID0gbmV3IERhdGUocGFyc2VJbnQoZGF0ZS5yZXBsYWNlKFwiL0RhdGUoXCIsIFwiXCIpLnJlcGxhY2UoXCIpL1wiLCBcIlwiKSwgMTApKTtcclxuICAgIC8vcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAvL2RhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuXHJcbiAgICB2YXIgbWFwID0ge1xyXG4gICAgICAgIFwieVwiOiBkYXRlLmdldFllYXIoKSxcclxuICAgICAgICBcIk1cIjogZGF0ZS5nZXRNb250aCgpICsgMSwgLy/mnIjku70gXHJcbiAgICAgICAgXCJkXCI6IGRhdGUuZ2V0RGF0ZSgpLCAvL+aXpSBcclxuICAgICAgICBcImhcIjogZGF0ZS5nZXRIb3VycygpLCAvL+Wwj+aXtiBcclxuICAgICAgICBcIm1cIjogZGF0ZS5nZXRNaW51dGVzKCksIC8v5YiGIFxyXG4gICAgICAgIFwic1wiOiBkYXRlLmdldFNlY29uZHMoKSwgLy/np5IgXHJcbiAgICAgICAgXCJxXCI6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksIC8v5a2j5bqmIFxyXG4gICAgICAgIFwiU1wiOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSIFxyXG4gICAgfTtcclxuICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC8oW3lNZGhtc3FTXSkrL2csIGZ1bmN0aW9uKGFsbCwgdCl7XHJcbiAgICAgICAgdmFyIHYgPSBtYXBbdF07XHJcbiAgICAgICAgaWYodiAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgaWYoYWxsLmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICAgICAgdiA9ICcwJyArIHY7XHJcbiAgICAgICAgICAgICAgICB2ID0gdi5zdWJzdHIodi5sZW5ndGgtMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodCA9PT0gJ3knKXtcclxuICAgICAgICAgICAgcmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnJykuc3Vic3RyKDQgLSBhbGwubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFsbDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGZvcm1hdDtcclxufSk7XHJcblxyXG4vL+aIquWtl+WkhOeQhlxyXG50ZW1wbGF0ZS5oZWxwZXIoJ2N1dGNoYXInLCBmdW5jdGlvbiAob2JqLCBjaGFybGVuZ3RoKSB7XHJcblxyXG4gICAgaWYgKG9iaiA9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBpZiAob2JqLmxlbmd0aCA+IHBhcnNlSW50KGNoYXJsZW5ndGgpKSB7XHJcbiAgICAgICAgb2JqID0gb2JqLnN1YnN0cmluZygwLCBwYXJzZUludChjaGFybGVuZ3RoKSkgKyBcIi4uLlwiO1xyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gb2JqO1xyXG5cclxufSk7XHJcblxyXG4vL+aVmeeglOivhOe6p1xyXG50ZW1wbGF0ZS5oZWxwZXIoJ1RlYWNoVHlwZVRyYW4nLCBmdW5jdGlvbiAob2JqKSB7XHJcblxyXG4gICAgaWYgKG9iaiA9PSAxKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiQee6p1wiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gXCJC57qnXCI7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy/lkIjlkIzmnJ/pmZDovazmjaJcclxudGVtcGxhdGUuaGVscGVyKCdIdFF4JywgZnVuY3Rpb24gKG9iaikge1xyXG5cclxuICAgIHJldHVybiB0ZW1wbGF0ZS5oZWxwZXIob2JqKSArIFwi5bm0XCI7XHJcbn0pO1xyXG5cclxuLy/lubTnuqdcclxudGVtcGxhdGUuaGVscGVyKCdHZXRCaWdHcmFkZScsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICByZXR1cm4gZSA9PSAxID8gXCLkuIDlubTnuqdcIlxyXG4gICAgICAgIDogZSA9PSAyID8gXCLkuozlubTnuqdcIlxyXG4gICAgICAgIDogZSA9PSAzID8gXCLkuInlubTnuqdcIlxyXG4gICAgICAgIDogZSA9PSA0ID8gXCLlm5vlubTnuqdcIlxyXG4gICAgICAgIDogZSA9PSA1ID8gXCLkupTlubTnuqdcIlxyXG4gICAgICAgIDogZSA9PSA2ID8gXCLlha3lubTnuqdcIlxyXG4gICAgICAgIDogZSA9PSA3ID8gXCLkuIPlubTnuqdcIlxyXG4gICAgICAgIDogZSA9PSA4ID8gXCLlhavlubTnuqdcIlxyXG4gICAgICAgIDogZSA9PSA5ID8gXCLkuZ3lubTnuqdcIlxyXG4gICAgICAgICA6IGUgPT0gMTAgPyBcIumrmOS4gFwiXHJcbiAgICAgICAgOiBlID09IDExID8gXCLpq5jkuoxcIlxyXG4gICAgICAgIDogZSA9PSAxMiA/IFwi6auY5LiJXCJcclxuICAgICAgICA6IFwiXCI7XHJcblxyXG59KTtcclxuXHJcblxyXG4vL+Wkp+WGmeeahOi9rOaNolxyXG50ZW1wbGF0ZS5oZWxwZXIoJ0dldEJpZ1cnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgcmV0dXJuIGUgPT0gMSA/IFwi5LiAXCJcclxuICAgICAgICA6IGUgPT0gMiA/IFwi5LqMXCJcclxuICAgICAgICA6IGUgPT0gMyA/IFwi5LiJXCJcclxuICAgICAgICA6IGUgPT0gNCA/IFwi5ZubXCJcclxuICAgICAgICA6IGUgPT0gNSA/IFwi5LqUXCJcclxuICAgICAgICA6IGUgPT0gNiA/IFwi5YWtXCJcclxuICAgICAgICA6IGUgPT0gNyA/IFwi5LiDXCJcclxuICAgICAgICA6IGUgPT0gOCA/IFwi5YWrXCJcclxuICAgICAgICA6IGUgPT0gOSA/IFwi5LmdXCJcclxuICAgICAgICA6IGUgPT0gMTAgPyBcIuWNgVwiXHJcbiAgICAgICAgOiBlID09IDExID8gXCLljYHkuIBcIlxyXG4gICAgICAgIDogZSA9PSAxMiA/IFwi5Y2B5LqMXCJcclxuICAgICAgICA6IGUgPT0gMTMgPyBcIuWNgeS4iVwiXHJcbiAgICAgICAgOiBlID09IDE0ID8gXCLljYHlm5tcIlxyXG4gICAgICAgIDogZSA9PSAxNSA/IFwi5Y2B5LqUXCJcclxuICAgICAgICA6IGUgPT0gMTYgPyBcIuWNgeWFrVwiXHJcbiAgICAgICAgOiBlID09IDE3ID8gXCLljYHkuINcIlxyXG4gICAgICAgIDogZSA9PSAxOCA/IFwi5Y2B5YWrXCJcclxuICAgICAgICA6IGUgPT0gMTkgPyBcIuWNgeS5nVwiXHJcbiAgICAgICAgOiBlID09IDIwID8gXCLkuozljYFcIlxyXG4gICAgICAgIDogZSA9PSAyMSA/IFwi5LqM5Y2B5LiAXCJcclxuICAgICAgICA6IGUgPT0gMjIgPyBcIuS6jOWNgeS6jFwiXHJcbiAgICAgICAgOiBlID09IDIzID8gXCLkuozljYHkuIlcIlxyXG4gICAgICAgIDogZSA9PSAyNCA/IFwi5LqM5Y2B5ZubXCJcclxuICAgICAgICA6IGUgPT0gMjUgPyBcIuS6jOWNgeS6lFwiXHJcbiAgICAgICAgOiBlID09IDI2ID8gXCLkuozljYHlha1cIlxyXG4gICAgICAgIDogZSA9PSAyNyA/IFwi5LqM5Y2B5LiDXCJcclxuICAgICAgICA6IGUgPT0gMjggPyBcIuS6jOWNgeWFq1wiXHJcbiAgICAgICAgOiBlID09IDI5ID8gXCLkuozljYHkuZ1cIlxyXG4gICAgICAgIDogZSA9PSAzMCA/IFwi5LiJ5Y2BXCJcclxuICAgICAgICA6IGUgPT0gMzEgPyBcIuS4ieWNgeS4gFwiXHJcbiAgICAgICAgOiBlID09IDMyID8gXCLkuInljYHkuoxcIlxyXG4gICAgICAgIDogZSA9PSAzMyA/IFwi5LiJ5Y2B5LiJXCJcclxuICAgICAgICA6IGUgPT0gMzQgPyBcIuS4ieWNgeWbm1wiXHJcbiAgICAgICAgOiBlID09IDM1ID8gXCLkuInljYHkupRcIlxyXG4gICAgICAgIDogZSA9PSAzNiA/IFwi5LiJ5Y2B5YWtXCJcclxuICAgICAgICA6IGUgPT0gMzcgPyBcIuS4ieWNgeS4g1wiXHJcbiAgICAgICAgOiBlID09IDM4ID8gXCLkuInljYHlhatcIlxyXG4gICAgICAgIDogZSA9PSAzOSA/IFwi5LiJ5Y2B5LmdXCJcclxuICAgICAgICA6IGUgPT0gNDAgPyBcIuWbm+WNgVwiXHJcbiAgICAgICAgOiBlID09IDQxID8gXCLlm5vljYHkuIBcIlxyXG4gICAgICAgIDogZSA9PSA0MiA/IFwi5Zub5Y2B5LqMXCJcclxuICAgICAgICA6IGUgPT0gNDMgPyBcIuWbm+WNgeS4iVwiXHJcbiAgICAgICAgOiBlID09IDQ0ID8gXCLlm5vljYHlm5tcIlxyXG4gICAgICAgIDogZSA9PSA0NSA/IFwi5Zub5Y2B5LqUXCJcclxuICAgICAgICA6IGUgPT0gNDYgPyBcIuWbm+WNgeWFrVwiXHJcbiAgICAgICAgOiBlID09IDQ3ID8gXCLlm5vljYHkuINcIlxyXG4gICAgICAgIDogZSA9PSA0OCA/IFwi5Zub5Y2B5YWrXCJcclxuICAgICAgICA6IGUgPT0gNDkgPyBcIuWbm+WNgeS5nVwiXHJcbiAgICAgICAgOiBlID09IDUwID8gXCLkupTljYFcIlxyXG4gICAgICAgIDogXCJcIjtcclxufSk7XHJcbnRlbXBsYXRlLmhlbHBlcigndGVzdCcsIGZ1bmN0aW9uIChlKSB7IHJldHVybiBlO30pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdHBsL3RlbXBsYXRlLWhlbHBlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiAxNyAxOSAyMCAyMSAyMyAyNyAyOCA0NSIsIi8qVE1PREpTOnt9Ki9cclxuIWZ1bmN0aW9uICgpIHtcclxuXHRmdW5jdGlvbiBhKGEsIGIpIHtcclxuXHRcdHJldHVybiAoL3N0cmluZ3xmdW5jdGlvbi8udGVzdCh0eXBlb2YgYikgPyBoIDogZykoYSwgYilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGIoYSwgYykge1xyXG5cdFx0cmV0dXJuIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEgJiYgKGMgPSB0eXBlb2YgYSwgXCJudW1iZXJcIiA9PT0gYyA/IGEgKz0gXCJcIiA6IGEgPSBcImZ1bmN0aW9uXCIgPT09IGMgPyBiKGEuY2FsbChhKSkgOiBcIlwiKSwgYVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYyhhKSB7XHJcblx0XHRyZXR1cm4gbFthXVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZChhKSB7XHJcblx0XHRyZXR1cm4gYihhKS5yZXBsYWNlKC8mKD8hW1xcdyNdKzspfFs8PlwiJ10vZywgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGUoYSwgYikge1xyXG5cdFx0aWYgKG0oYSkpZm9yICh2YXIgYyA9IDAsIGQgPSBhLmxlbmd0aDsgZCA+IGM7IGMrKyliLmNhbGwoYSwgYVtjXSwgYywgYSk7IGVsc2UgZm9yIChjIGluIGEpYi5jYWxsKGEsIGFbY10sIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmKGEsIGIpIHtcclxuXHRcdHZhciBjID0gLyhcXC8pW15cXC9dK1xcMVxcLlxcLlxcMS8sIGQgPSAoXCIuL1wiICsgYSkucmVwbGFjZSgvW15cXC9dKyQvLCBcIlwiKSwgZSA9IGQgKyBiO1xyXG5cdFx0Zm9yIChlID0gZS5yZXBsYWNlKC9cXC9cXC5cXC8vZywgXCIvXCIpOyBlLm1hdGNoKGMpOyllID0gZS5yZXBsYWNlKGMsIFwiL1wiKTtcclxuXHRcdHJldHVybiBlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnKGIsIGMpIHtcclxuXHRcdHZhciBkID0gYS5nZXQoYikgfHwgaSh7ZmlsZW5hbWU6IGIsIG5hbWU6IFwiUmVuZGVyIEVycm9yXCIsIG1lc3NhZ2U6IFwiVGVtcGxhdGUgbm90IGZvdW5kXCJ9KTtcclxuXHRcdHJldHVybiBjID8gZChjKSA6IGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGgoYSwgYikge1xyXG5cdFx0aWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGIpIHtcclxuXHRcdFx0dmFyIGMgPSBiO1xyXG5cdFx0XHRiID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgayhjKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR2YXIgZCA9IGpbYV0gPSBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgYihjLCBhKSArIFwiXCJcclxuXHRcdFx0fSBjYXRjaCAoZCkge1xyXG5cdFx0XHRcdHJldHVybiBpKGQpKClcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBkLnByb3RvdHlwZSA9IGIucHJvdG90eXBlID0gbiwgZC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGIgKyBcIlwiXHJcblx0XHR9LCBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpKGEpIHtcclxuXHRcdHZhciBiID0gXCJ7VGVtcGxhdGUgRXJyb3J9XCIsIGMgPSBhLnN0YWNrIHx8IFwiXCI7XHJcblx0XHRpZiAoYyljID0gYy5zcGxpdChcIlxcblwiKS5zbGljZSgwLCAyKS5qb2luKFwiXFxuXCIpOyBlbHNlIGZvciAodmFyIGQgaW4gYSljICs9IFwiPFwiICsgZCArIFwiPlxcblwiICsgYVtkXSArIFwiXFxuXFxuXCI7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJvYmplY3RcIiA9PSB0eXBlb2YgY29uc29sZSAmJiBjb25zb2xlLmVycm9yKGIgKyBcIlxcblxcblwiICsgYyksIGJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBqID0gYS5jYWNoZSA9IHt9LCBrID0gdGhpcy5TdHJpbmcsIGwgPSB7XHJcblx0XHRcIjxcIjogXCImIzYwO1wiLFxyXG5cdFx0XCI+XCI6IFwiJiM2MjtcIixcclxuXHRcdCdcIic6IFwiJiMzNDtcIixcclxuXHRcdFwiJ1wiOiBcIiYjMzk7XCIsXHJcblx0XHRcIiZcIjogXCImIzM4O1wiXHJcblx0fSwgbSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGEpIHtcclxuXHRcdFx0cmV0dXJuIFwiW29iamVjdCBBcnJheV1cIiA9PT0ge30udG9TdHJpbmcuY2FsbChhKVxyXG5cdFx0fSwgbiA9IGEudXRpbHMgPSB7XHJcblx0XHQkaGVscGVyczoge30sICRpbmNsdWRlOiBmdW5jdGlvbiAoYSwgYiwgYykge1xyXG5cdFx0XHRyZXR1cm4gYSA9IGYoYywgYSksIGcoYSwgYilcclxuXHRcdH0sICRzdHJpbmc6IGIsICRlc2NhcGU6IGQsICRlYWNoOiBlXHJcblx0fSwgbyA9IGEuaGVscGVycyA9IG4uJGhlbHBlcnM7XHJcblx0YS5nZXQgPSBmdW5jdGlvbiAoYSkge1xyXG5cdFx0cmV0dXJuIGpbYS5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIildXHJcblx0fSwgYS5oZWxwZXIgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0b1thXSA9IGJcclxuXHR9LCBtb2R1bGUuZXhwb3J0cyA9IGFcclxufSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi90bW9kanMtbG9hZGVyL3J1bnRpbWUuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiAxNSAxNiAxNyAxOSAyMCAyMSAyMyAyNyAyOCAzNCA0MCA0MSA0MiA0MyA0NSA0NiA1MyA1NCIsIi8v6YGu572pXHJcbmZ1bmN0aW9uIE1hc2tTaG93KCkge1xyXG4gICAgJChcIi5wb3AtbWFza1wiKS5zaG93KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIE1hc2tIaWRlKCkge1xyXG4gICAgJChcIi5wb3AtbWFza1wiKS5oaWRlKCk7XHJcbiAgICAkKFwiLmFkZFwiKS5oaWRlKCk7XHJcbn1cclxuLy/kvKDpgJLmmL7npLrnmoTmtojmga9cclxuZnVuY3Rpb24gUG9wVGlwU2hvdyhvYmopIHtcclxuICAgICQoXCIuYWRkdXBkXCIpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICAgIFxyXG4gICAgdmFyIHRpcGh0bWwgPSAnPGRpdiBjbGFzcz1cInBvcC11cCBmb250MTQgaGlkZGVuIGFkZHVwZFwiIGlkPVwib2t0aXBcIj48c3BhbiBjbGFzcz1cInBvcC1jbG9zZSBjdXJzb3JcIj48L3NwYW4+PGRpdiBjbGFzcz1cInBvcC1jb250ZW50XCI+PHAgY2xhc3M9XCJsaW5lMTAwXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtcIj4nICsgb2JqICsgJzwvcD48L2Rpdj48L2Rpdj4nO1xyXG5cclxuICAgICQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikuYXBwZW5kKHRpcGh0bWwpO1xyXG4gICAgJChcIiNjb250ZW50XCIpLmFwcGVuZCh0aXBodG1sKTtcclxuICAgICQoXCIucG9wLW1hc2tcIikuc2hvdygpO1xyXG4gICAgJChcIi5wb3AtdXBcIikuc2hvdygpO1xyXG59XHJcblxyXG4vL+S8oOmAkuaYvuekuueahOa2iOaBr+WPquiuqeWvueW6lOeahGlk5pi+56S6XHJcbmZ1bmN0aW9uIFBvcFRpcFNob3dJZChvYmopIHtcclxuICAgICQoXCIuYWRkdXBkXCIpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIHRpcGh0bWwgPSAnPGRpdiBjbGFzcz1cInBvcC11cCBmb250MTQgaGlkZGVuIGFkZHVwZFwiIGlkPVwib2t0aXBcIj48c3BhbiBjbGFzcz1cInBvcC1jbG9zZSBjdXJzb3JcIj48L3NwYW4+PGRpdiBjbGFzcz1cInBvcC1jb250ZW50XCI+PHAgY2xhc3M9XCJsaW5lMTAwXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtcIj4nICsgb2JqICsgJzwvcD48L2Rpdj48L2Rpdj4nO1xyXG5cclxuICAgICQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikuYXBwZW5kKHRpcGh0bWwpO1xyXG4gICAgJChcIiNjb250ZW50XCIpLmFwcGVuZCh0aXBodG1sKTtcclxuICAgICQoXCIucG9wLW1hc2tcIikuc2hvdygpO1xyXG4gICAgJChcIiNva3RpcFwiKS5zaG93KCk7XHJcbn1cclxuXHJcbi8v5Lyg6YCS5pi+56S655qE5raI5oGvLOWMheWQq0RJVuWQjeensFxyXG5mdW5jdGlvbiBQb3BUaXBTaG93QnlEaXZOYW1lKG9iaikge1xyXG4gICAgdmFyIHRpcGh0bWwgPSAnPGRpdiBjbGFzcz1cInBvcC11cCBmb250MTQgaGlkZGVuXCIgaWQ9XCJkaXZDb21tb25Qb3BUaXBTaG93XCI+PHNwYW4gY2xhc3M9XCJwb3AtY2xvc2UgY3Vyc29yXCI+PC9zcGFuPjxkaXYgY2xhc3M9XCJwb3AtY29udGVudFwiPjxwIGNsYXNzPVwibGluZTEwMFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7XCI+JyArIG9iaiArICc8L3A+PC9kaXY+PC9kaXY+JztcclxuXHJcbiAgICAkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmFwcGVuZCh0aXBodG1sKTtcclxuICAgICQoXCIjY29udGVudFwiKS5hcHBlbmQodGlwaHRtbCk7XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLnNob3coKTtcclxuICAgICQoXCIjZGl2Q29tbW9uUG9wVGlwU2hvd1wiKS5zaG93KCk7XHJcbn1cclxuXHJcbi8v5by55Ye656Gu6K6k5qGGXHJcbnZhciBPcGVuQ29uZnJpbVBvcCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICQoJ1tjbGFzcz1cInBvcC11cCBmb250MTRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cInBvcC11cCBmb250MTRcIj48c3BhbiBjbGFzcz1cInBvcC1jbG9zZSBjdXJzb3JcIj48L3NwYW4+PGRpdiBjbGFzcz1cInBvcC1jb250ZW50XCIgPicgKyBvYmogKyAnPC9kaXY+PGJyIC8+PGJyIC8+PGRpdiBjbGFzcz1cImhhbmRsZVwiPiA8c3BhbiBjbGFzcz1cIm9rXCIgaWQ9XCJDb25mcmltXCI+56Gu5a6aPC9zcGFuPiAmbmJzcDsmbmJzcDsmbmJzcDs8c3BhbiBjbGFzcz1cIm9rXCIgaWQ9XCJDYW5jZWxcIj7lj5bmtog8L3NwYW4+IDwvZGl2PjwvZGl2Pic7XHJcbiAgICBkZWJ1Z2dlcjtcclxuICAgICQoXCIjY29udGVudFwiKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLnNob3coKTtcclxuICAgICQoXCIucG9wLXVwXCIpLnNob3coKTtcclxufTtcclxuLy/lvLnlh7rnoa7orqTmoYZcclxudmFyIG9yZ09wZW5Db25mcmltUG9wID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cInBvcC11cCBmb250MTRcIiBzdHlsZT1cImhlaWdodDphdXRvO1wiPjxzcGFuIGNsYXNzPVwicG9wLWNsb3NlIGN1cnNvclwiPjwvc3Bhbj48YnIvPjxkaXYgY2xhc3M9XCJwb3AtY29udGVudFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luOjMwcHggMTBweCAwO1wiPicgKyBvYmogKyAnPC9kaXY+PGJyIC8+PGJyIC8+PGRpdiBjbGFzcz1cImhhbmRsZVwiPiA8c3BhbiBjbGFzcz1cIm9rXCIgaWQ9XCJDb25mcmltXCI+56Gu5a6aPC9zcGFuPiA8L2Rpdj48L2Rpdj4nO1xyXG4gICAgJChcIiNjb250ZW50XCIpLmFwcGVuZChodG1sKTtcclxuICAgICQoXCIucG9wLW1hc2tcIikuc2hvdygpO1xyXG4gICAgJChcIi5wb3AtdXBcIikuc2hvdygpO1xyXG59O1xyXG4vL+W8ueWHuuehruiupOahhizmsqHmnInlj5bmtojmjInpkq5cclxudmFyIE9wZW5Db25mcmltUG9wTm9DYW5jZWwgPSBmdW5jdGlvbiAob2JqLHRpdGxlLGJ0bmlkKSB7XHJcbiAgICAkKCdbY2xhc3M9XCJwb3AtdXAgZm9udDE0XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBodG1sID0gJyc7XHJcbiAgICBpZiAodGl0bGUgPT0gdW5kZWZpbmVkIHx8IHRpdGxlPT1cIlwiKSB7XHJcbiAgICAgICAgdGl0bGUgPSBcIumHjee9ruWvhueggVwiO1xyXG4gICAgfVxyXG4gICAgaWYgKGJ0bmlkID09IHVuZGVmaW5lZCB8fCBidG5pZCA9PSBcIlwiKSB7XHJcbiAgICAgICAgYnRuaWQgPSBcIkNvbmZyaW1cIjtcclxuICAgIH1cclxuICAgIGRlYnVnZ2VyO1xyXG4gICAgaHRtbCA9ICc8ZGl2IGNsYXNzPVwibXlwb3B1cCBmb250MTQgYWRkXCIgaWQ9XCJkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCI+PGg1IGNsYXNzPVwiY2VudGVyIGZvbnQxNiBwb3B1cGhlYWRcIiBzdHlsZT1cImhlaWdodDo0NXB4O1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj4nICsgdGl0bGUgKyAnPC9zcGFuPjxpIGNsYXNzPVwicG9wY2xvc2UgY3Vyc29yXCI+PC9pPjwvaDU+PGRpdiBjbGFzcz1cInBvcHVwYm94XCIgc3R5bGU9XCJtaW4taGVpZ2h0OjEyMHB4O3RleHQtYWxpZ246Y2VudGVyO1wiPjxzcGFuIGNsYXNzPVwibXQyMFwiIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI+PHNwYW4gY2xhc3M9XCJjb250ZW50XCI+JyArIG9iaiArICc8L3NwYW4+PHNwYW4+PGRpdiBjbGFzcz1cImhhbmRsZSBtdDIwXCI+IDxzcGFuIGNsYXNzPVwib2sgc3VibWl0XCIgaWQ9XCInICsgYnRuaWQgKyAnXCI+56Gu5a6aPC9zcGFuPiA8L2Rpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgaWYgKCQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikuYXBwZW5kKGh0bWwpO1xyXG4gICAgfSBlbHNlIGlmICgkKFwiI21haW4tY29udGVudFwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJChcIiNtYWluLWNvbnRlbnRcIikuYXBwZW5kKGh0bWwpO1xyXG4gICAgfVxyXG4gICAgJChcIi5wb3AtbWFza1wiKS5zaG93KCk7XHJcbiAgICAkKFwiLnBvcC11cFwiKS5zaG93KCk7XHJcbiAgICAkKFwiI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIikuZmluZChcIi5wb3BjbG9zZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgJChcIi5wb3AtbWFza1wiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wb3AtdXBcIikuaGlkZSgpO1xyXG4gICAgICAgXHJcbiAgICB9KTtcclxuICAgICQoJyNDb25mcmltJykuY2xpY2soZnVuY3Rpb24gKCkgey8v5byg6LaK5re75Yqg55qE5Ye95pWwXHJcbiAgICAgICAgaWYgKCQoJy5jb250ZW50JykudGV4dCgpICE9ICfph43nva7lr4bnoIHlkI7vvIzor6XotKblj7flr4bnoIHlsIbmgaLlpI3liJ3lp4vlr4bnoIHvvIEnKSB7XHJcbiAgICAgICAgICAgICQoXCIjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJChcIi5wb3AtbWFza1wiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wLXVwXCIpLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9KVxyXG59O1xyXG52YXIgT3BlbkNvbmZyaW1Qb3BOb0NhbmNlMiA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgICQoJ1tjbGFzcz1cInBvcC11cCBmb250MTRcIl0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG4gICAgdmFyIGh0bWwgPSAnJztcclxuICAgIGh0bWwgPSAnPGRpdiBjbGFzcz1cIm15cG9wdXAgZm9udDE0XCIgaWQ9XCJkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCI+PGg1IGNsYXNzPVwiY2VudGVyIGZvbnQxNiBwb3B1cGhlYWRcIiBzdHlsZT1cImhlaWdodDo0NXB4O1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj7mj5DnpLrmtojmga88L3NwYW4+PGkgY2xhc3M9XCJwb3BjbG9zZSBjdXJzb3JcIj48L2k+PC9oNT48ZGl2IGNsYXNzPVwicG9wdXBib3hcIiBzdHlsZT1cIm1pbi1oZWlnaHQ6MTIwcHg7dGV4dC1hbGlnbjpjZW50ZXI7XCI+PHNwYW4gY2xhc3M9XCJtdDIwXCIgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jaztcIj48c3BhbiBjbGFzcz1cImNvbnRlbnRcIj4nICsgb2JqICsgJzwvc3Bhbj48c3Bhbj48ZGl2IGNsYXNzPVwiaGFuZGxlIG10MjBcIj4gPHNwYW4gY2xhc3M9XCJvayBzdWJtaXRcIiBpZD1cIkNvbmZyaW1cIj7noa7lrpo8L3NwYW4+IDwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICBpZiAoJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmFwcGVuZChodG1sKTtcclxuICAgIH0gZWxzZSBpZiAoJChcIiNtYWluLWNvbnRlbnRcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoXCIjbWFpbi1jb250ZW50XCIpLmFwcGVuZChodG1sKTtcclxuICAgIH1cclxuICAgICQoXCIucG9wLW1hc2tcIikuc2hvdygpO1xyXG4gICAgJChcIi5wb3AtdXBcIikuc2hvdygpO1xyXG4gICAgJChcIiNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCIpLmZpbmQoXCIucG9wY2xvc2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoXCIucG9wLW1hc2tcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucG9wLXVwXCIpLmhpZGUoKTtcclxuXHJcbiAgICB9KTtcclxuICAgXHJcbn07XHJcbi8vL+W8ueWHuuWkmumVv+aXtumXtOWQjua2iOWksVxyXG52YXIgT3BlblRpbWVIaWRlID0gZnVuY3Rpb24gKG9iaiwgdGltZSkge1xyXG4gICAgLy92YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwicG9wdXBcIj4gPGg1IGNsYXNzPVwiY2VudGVyIGZvbnQxNiBwb3B1cGhlYWRcIj7mtojmga/mj5DnpLo8aSBjbGFzcz1cInBvcGNsb3NlIGN1cnNvclwiPjwvaT48L2g1PjxkaXYgY2xhc3M9XCJwb3B1cGJveFwiPjxkaXYgY2xhc3M9XCJoYW5kbGUgZm9udDE0IGF1dG9cIj4nICsgb2JqICsgJzwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICB2YXIgaHRtbCA9ICcgIDxkaXYgY2xhc3M9XCJwb3B1cCBcIj48aDUgY2xhc3M9XCJjZW50ZXIgZm9udDE2IHBvcHVwaGVhZFwiPiDmtojmga/mj5DnpLo8aSBjbGFzcz1cInBvcGNsb3NlIGN1cnNvclwiPjwvaT48L2g1PjxkaXYgY2xhc3M9XCJwb3B1cGJveFwiPjxkaXYgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtcIj48ZGl2IGNsYXNzPVwic3VjY2VzcyBhdXRvXCIgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tdG9wOjIwcHg7XCI+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cImhhbmRsZSBzdWNjZXNzTGV0dGVyXCI+IDxzcGFuIGNsYXNzPVwibXQyMFwiPicrb2JqKyc8L3NwYW4+PC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgICQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikuYXBwZW5kKGh0bWwpO1xyXG4gICAgJChcIi5wb3B1cFwiKS5zaG93KCk7XHJcbiAgXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLnBvcHVwXCIpLmhpZGUoKTtcclxuICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH0sIHRpbWUpO1xyXG5cclxufTtcclxuXHJcbi8vL+W8ueWHuuWkmumVv+aXtumXtOWQjua2iOWksSzljIXlkKtESVblkI3np7BcclxudmFyIE9wZW5UaW1lSGlkZUJ5RGl2TmFtZSA9IGZ1bmN0aW9uIChvYmosIHRpbWUsIGNvbnRhaW5zRGl2KSB7XHJcbiAgICAkKCdbY2xhc3M9XCJwb3AtdXAgZm9udDE0XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICAgIC8vdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cInBvcHVwXCI+IDxoNSBjbGFzcz1cImNlbnRlciBmb250MTYgcG9wdXBoZWFkXCI+5raI5oGv5o+Q56S6PGkgY2xhc3M9XCJwb3BjbG9zZSBjdXJzb3JcIj48L2k+PC9oNT48ZGl2IGNsYXNzPVwicG9wdXBib3hcIj48ZGl2IGNsYXNzPVwiaGFuZGxlIGZvbnQxNCBhdXRvXCI+JyArIG9iaiArICc8L2Rpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cInBvcC11cCBmb250MTQgaGlkZGVuIGFkZHVwZFwiIGlkPVwiZGl2Q29tbW9uUG9wT3BlblRpbWVIaWRlXCI+PHNwYW4gY2xhc3M9XCJwb3AtY2xvc2UgY3Vyc29yXCI+PC9zcGFuPjxkaXYgY2xhc3M9XCJwb3AtY29udGVudFwiICBzdHlsZT1cIm1hcmdpbjozMHB4IDA7d2lkdGg6YXV0bztcIj48cCBjbGFzcz1cImxpbmUxMDBcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO1wiPicgKyBvYmogKyAnPC9wPjwvZGl2PjwvZGl2Pic7XHJcbiAgICAkKFwiI1wiICsgY29udGFpbnNEaXYpLmFwcGVuZChodG1sKTtcclxuICAgICQoXCIjZGl2Q29tbW9uUG9wT3BlblRpbWVIaWRlXCIpLnNob3coKTtcclxuICAgICQoXCIjZGl2Q29tbW9uUG9wT3BlblRpbWVIaWRlXCIpLmZpbmQoXCIucG9wLWNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI2RpdkNvbW1vblBvcE9wZW5UaW1lSGlkZVwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNkaXZDb21tb25Qb3BPcGVuVGltZUhpZGVcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgJCgnI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWwnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjZGl2Q29tbW9uUG9wT3BlblRpbWVIaWRlXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiI2RpdkNvbW1vblBvcE9wZW5UaW1lSGlkZVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAvLy8vMjAxNjEwMjMxNjE3IGtsZ1xyXG4gICAgICAgICQoXCIucG9wLW1hc2tcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucG9wLXVwXCIpLmhpZGUoKTtcclxuICAgICAgICAkKCcjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgIC8vICQoXCIjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAvLy9cclxuICAgICAgICAvL2RvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSwgdGltZSk7XHJcblxyXG59O1xyXG5cclxuZnVuY3Rpb24gUG9wVGlwSGlkZSgpIHtcclxuICAgICQoXCIucG9wLXVwXCIpLmhpZGUoKTtcclxuICAgICQoXCIucG9wLW1hc2tcIikuaGlkZSgpO1xyXG4gICAgJChcIi5hZGRcIikuaGlkZSgpO1xyXG4gICAgZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XHJcbn1cclxuXHJcblxyXG4vL+a1i+ivhOaooeWdl1xyXG52YXIgQ29uZnJpbUV4YW0gPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAkKCdbY2xhc3M9XCJwb3AtdXAgZm9udDE0XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJwb3AtdXAgZm9udDE0XCI+PHNwYW4gY2xhc3M9XCJwb3AtY2xvc2UgY3Vyc29yXCI+PC9zcGFuPjxkaXYgY2xhc3M9XCJwb3AtY29udGVudFwiPicgKyBvYmogKyAnPC9kaXY+PGJyIC8+PGJyIC8+PGRpdiBjbGFzcz1cImhhbmRsZVwiPiA8c3BhbiBjbGFzcz1cIm9rXCIgaWQ9XCJDb25mcmltXCI+5oiR6KaB5pS+5byDPC9zcGFuPiAmbmJzcDsmbmJzcDsmbmJzcDs8c3BhbiBjbGFzcz1cIm9rXCIgaWQ9XCJDYW5jZWxcIj7nu6fnu63kvZznrZQ8L3NwYW4+IDwvZGl2PjwvZGl2Pic7XHJcbiAgICAkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmFwcGVuZChodG1sKTtcclxuICAgICQoXCIucG9wLW1hc2tcIikuc2hvdygpO1xyXG4gICAgJChcIi5wb3AtdXBcIikuc2hvdygpO1xyXG59O1xyXG5cclxuXHJcblxyXG5leHBvcnRzLk1hc2tTaG93ID0gTWFza1Nob3c7XHJcbmV4cG9ydHMuTWFza0hpZGUgPSBNYXNrSGlkZTtcclxuZXhwb3J0cy5Qb3BUaXBTaG93ID0gUG9wVGlwU2hvdztcclxuZXhwb3J0cy5Qb3BUaXBTaG93SWQgPSBQb3BUaXBTaG93SWQ7Ly/lj6rorqlkaXblr7nlupTnmoRpZOaYvuekulxyXG5leHBvcnRzLlBvcFRpcEhpZGUgPSBQb3BUaXBIaWRlO1xyXG5leHBvcnRzLk9wZW5Db25mcmltUG9wID0gT3BlbkNvbmZyaW1Qb3A7XHJcbmV4cG9ydHMuT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbCA9IE9wZW5Db25mcmltUG9wTm9DYW5jZWw7XHJcbmV4cG9ydHMuT3BlblRpbWVIaWRlID0gT3BlblRpbWVIaWRlO1xyXG5leHBvcnRzLkNvbmZyaW1FeGFtID0gQ29uZnJpbUV4YW07XHJcbmV4cG9ydHMuT3BlblRpbWVIaWRlQnlEaXZOYW1lID0gT3BlblRpbWVIaWRlQnlEaXZOYW1lO1xyXG5leHBvcnRzLm9yZ09wZW5Db25mcmltUG9wID0gb3JnT3BlbkNvbmZyaW1Qb3A7XHJcbmV4cG9ydHMuT3BlbkNvbmZyaW1Qb3BOb0NhbmNlMiA9IE9wZW5Db25mcmltUG9wTm9DYW5jZTI7XHJcbi8v5aSE55CG5by55Ye65qGG55qE6ZqQ6JePXHJcbiQoZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5kZWxlZ2F0ZShcIi5wb3AtY2xvc2VcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5wb3AtbWFza1wiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wb3AtdXBcIikuaGlkZSgpO1xyXG4gICAgICAgIC8vZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmRlbGVnYXRlKFwiLnBvcGNsb3NlXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIucG9wLW1hc2tcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIuYWRkXCIpLmhpZGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoXCIjY29udGVudFwiKS5kZWxlZ2F0ZShcIi5wb3AtY2xvc2VcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5wb3AtbWFza1wiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5wb3AtdXBcIikuaGlkZSgpO1xyXG4gICAgICAgIC8vZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2NvbnRlbnRcIikuZGVsZWdhdGUoXCIucG9wY2xvc2VcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5wb3AtbWFza1wiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIi5hZGRcIikuaGlkZSgpO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcbn0pO1xyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvbGliL3BvcHVwL3BvcHVwdGlwLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMjEgMjMgMjcgMjgiLCIvL+W8ueWHuuWKoOi9veWbvueJh+mSiOWvueWIl+ihqOS8oOmAkuWxheS4reWPguaVsFxyXG5mdW5jdGlvbiBTaG93TG9hZGluZ0ZvclRhYmxlKG9iaiwgbnVtKSB7XHJcbiAgICBpZiAobnVtID09IHVuZGVmaW5lZCB8fCBvYmo9PXVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIG9iai5odG1sKCc8dHIgIHN0eWxlPVwiYm9yZGVyOm5vbmU7dGV4dC1hbGlnbjpjZW50ZXI7aGVpZ2h0OjI4MHB4O1wiPjx0ZCBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDtcIiBjb2xzcGFuPVwiJytudW0rJ1wiPjxkaXYgY2xhc3M9XCJkYXRhX2ltZ1wiPjxkaXYgY2xhc3M9XCJiaWdfYXJlYVwiIHN0eWxlPVwibWFyZ2luLXRvcDoxMHB4O2xpbmUtaGVpZ2h0OjMwcHg7XCI+JytqUXVlcnkoXCIjZGl2TG9hZGluZ1wiKS5odG1sKCkgKyc8L2Rpdj48L2Rpdj48L3RkPjwvdHI+Jyk7XHJcbn1cclxuXHJcblxyXG5cclxuLy/lvLnlh7rliqDovb3lm77niYdcclxuZnVuY3Rpb24gU2hvd0xvYWRpbmcob2JqKSB7XHJcbiAgICBpZiAob2JqID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIG9iai5odG1sKGpRdWVyeShcIiNkaXZMb2FkaW5nXCIpLmh0bWwoKSk7XHJcbn1cclxuXHJcblxyXG5leHBvcnRzLlNob3dMb2FkaW5nRm9yVGFibGUgPSBTaG93TG9hZGluZ0ZvclRhYmxlOy8v6ZKI5a+5dGFibGXluIPlsYDnmoRcclxuZXhwb3J0cy5TaG93TG9hZGluZyA9IFNob3dMb2FkaW5nO1xyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2xpYi9wb3B1cC9zaG93bG9hZGltZy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAxMiAyMSAyMyAyNyAyOCIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgUGFnaW5hdG9yOiBmdW5jdGlvbiAocGFnZVNpemUsIGN1cnJlbnRQYWdlLCB0b3RhbENvdW50LCBjYWxsYmFjaykge1xyXG4gICAgICAgIC8vdG9kbyDnu5Hlrprkuovku7ZcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsUGFnZXM7XHJcbiAgICAgICAgaWYgKHRvdGFsQ291bnQgJSBwYWdlU2l6ZSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRvdGFsUGFnZXMgPSB0b3RhbENvdW50IC8gcGFnZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0b3RhbFBhZ2VzID0gcGFyc2VJbnQodG90YWxDb3VudCAvIHBhZ2VTaXplKSArIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYWdlUHJlID0gJzxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPScgKyAocGFyc2VJbnQoY3VycmVudFBhZ2UpIC0gMSkgKyAnIGNsYXNzPVwicHJlLXBhZ2UgaW5saW5lIG1yMjBcIj7kuIrkuIDpobU8L2E+JztcclxuICAgICAgICB2YXIgcGFnZU5leHQgPSAnPGEgaHJlZj1cIiNcIiAgZGF0YS1udW09JyArIChwYXJzZUludChjdXJyZW50UGFnZSkgKyAxKSArICcgY2xhc3M9XCJuZXh0LXBhZ2UgaW5saW5lXCI+5LiL5LiA6aG1PC9hPic7XHJcbiAgICAgICAgdmFyIGluZGV4UGFnZSA9ICc8YSBocmVmPVwiI1wiICBkYXRhLW51bT1cIjFcIiBjbGFzcz1cInByZS1wYWdlIGlubGluZSBtcjIwXCI+6aaW6aG1PC9hPjwvbGk+JztcclxuXHJcbiAgICAgICAgdmFyIGxhc3RQYWdlID0gJyA8YSBocmVmPVwiI1wiICBkYXRhLW51bT0nICsgdG90YWxQYWdlcyArICcgY2xhc3M9XCJwcmUtcGFnZSBpbmxpbmUgbXIyMCBtbDIwXCI+IOacq+mhtTwvYT4nO1xyXG4gICAgICAgIGlmICh0b3RhbFBhZ2VzIDwgcGFnZVNpemUpIHtcclxuICAgICAgICAgICAgLy8gcGFnZVByZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIC8vcGFnZU5leHQgPSBcIlwiO1xyXG4gICAgICAgICAgICBpbmRleFBhZ2UgPSBcIlwiO1xyXG4gICAgICAgICAgICBsYXN0UGFnZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3VycmVudFBhZ2UgPD0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50UGFnZSA9IDE7XHJcbiAgICAgICAgICAgIHBhZ2VQcmUgPSBcIlwiO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGN1cnJlbnRQYWdlID49IHRvdGFsUGFnZXMpIHtcclxuICAgICAgICAgICAgY3VycmVudFBhZ2UgPSB0b3RhbFBhZ2VzO1xyXG4gICAgICAgICAgICBwYWdlTmV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGxhc3RQYWdlID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b3RhbENvdW50ID4gMCkge1xyXG5cclxuICAgICAgICAgICAgdmFyIHBhZ2VudW0gPSAnPHVsIGNsYXNzPVwicGFnZS1ib3ggaW5saW5lIG1yMjAgbWIyMFwiPic7XHJcblxyXG5cclxuICAgICAgICAgICAgaWYgKHRvdGFsUGFnZXMgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBhZ2UgPT0gMSkgLy/nrKzkuIDpobVcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy9vdXRwdXQuQXBwZW5kKFwiIDxhIGRpc2FibGVkPSdkaXNhYmxlZCcgY2xhc3M9J2NvbEgnPuS4iuS4gOmhtTwvYT4gXCIpOy8v5LiK5LiA6aG1XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBhZ2UgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lpITnkIbpppbpobXov57mjqVcclxuICAgICAgICAgICAgICAgICAgICAvL+WkhOeQhuS4iuS4gOmhteeahOi/nuaOpVxyXG4gICAgICAgICAgICAgICAgICAgIC8vcGFnZVByZSA9ICcgPGxpPjxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPScgKyAocGFyc2VJbnQoY3VycmVudFBhZ2UpIC0gMSkgKyAnPuS4iuS4gOmhtTwvYT4gPC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG91dHB1dC5BcHBlbmRGb3JtYXQoXCIgPGEgZGF0YS1wYWdlSW5kZXg9J3swfScgY2xhc3M9J3BhZ2VMaW5rJz7kuIrkuIDpobU8L2E+IFwiLCBjdXJyZW50UGFnZSAtIDEpOy8v5LiK5LiA6aG1XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodG90YWxQYWdlcyA+IDcpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VycmludCA9IDM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlIDwgNCkvLzRcclxuICAgICAgICAgICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSA2OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UGFnZSA9PSBpICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiIGRhdGEtbnVtPScgKyBjdXJyZW50UGFnZSArICc+JyArIGN1cnJlbnRQYWdlICsgJzwvYT4gPC9saT4nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IDYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiAgZGF0YS1udW09JyArIDcgKyAnPi4uLjwvYT4gPC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICcgPGxpPjxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPScgKyB0b3RhbFBhZ2VzICsgJz4nICsgdG90YWxQYWdlcyArICc8L2E+IDwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICcgPGxpPjxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPScgKyAoaSArIDEpICsgJz4nICsgKGkgKyAxKSArICc8L2E+IDwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9Ly80XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudFBhZ2UgPj0gNCAmJiBjdXJyZW50UGFnZSA8IHRvdGFsUGFnZXMgLSAzKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSA2OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3BhZ2VudW09cGFnZW51bSsnIDxsaSBkYXRhLW51bT0nKyhjdXJyZW50UGFnZS0zKSsnPjxhIGhyZWY9XCIjXCIgb25jbGljaz1cIlBhZ2luYXRvcignK3BhZ2VTaXplKycsJysoY3VycmVudFBhZ2UtMykrJywnICsgdG90YWxDb3VudCArICcpXCI+Li4uPC9hPiA8L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiICBkYXRhLW51bT1cIjFcIj4xPC9hPiA8L2xpPic7Ly8yMDE2MDkxMzA5MzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VJbnQoY3VycmVudFBhZ2UpIC0gMyA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiICBkYXRhLW51bT0nICsgKHBhcnNlSW50KGN1cnJlbnRQYWdlKSAtIDMpICsgJz4uLi48L2E+IDwvbGk+JzsvLzIwMTYwOTEzMDkzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpID09IDMpLy/kuK3pl7TlvZPliY3pobVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiIGRhdGEtbnVtPScgKyAoY3VycmVudFBhZ2UpICsgJz4nICsgY3VycmVudFBhZ2UgKyAnPC9hPiA8L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChpID09IDYpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiIGRhdGEtbnVtPScgKyAocGFyc2VJbnQoY3VycmVudFBhZ2UpICsgMykgKyAnPi4uLjwvYT4gPC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiAgZGF0YS1udW09JyArIHRvdGFsUGFnZXMgKyAnPicgKyB0b3RhbFBhZ2VzICsgJzwvYT4gPC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiAgZGF0YS1udW09JyArIChwYXJzZUludChjdXJyZW50UGFnZSkgKyBpIC0gcGFyc2VJbnQoY3VycmludCkpICsgJz4nICsgKHBhcnNlSW50KGN1cnJlbnRQYWdlKSArIGkgLSBwYXJzZUludChjdXJyaW50KSkgKyAnPC9hPiA8L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSA2OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiICBkYXRhLW51bT1cIjFcIj4xPC9hPiA8L2xpPic7Ly8yMDE2MDkxMzA5MzBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICcgPGxpPjxhIGhyZWY9XCIjXCIgZGF0YS1udW09JyArIChwYXJzZUludCh0b3RhbFBhZ2VzKSAtIDYpICsgJz4uLi48L2E+IDwvbGk+JzsvLzIwMTYwOTEzMDkzMFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvdGFsUGFnZXMgLSA2ICsgaSA9PSBjdXJyZW50UGFnZSkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VudW0gPSBwYWdlbnVtICsgJyA8bGk+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImFjdGl2ZVwiICBkYXRhLW51bT0nICsgY3VycmVudFBhZ2UgKyAnPicgKyBjdXJyZW50UGFnZSArICc8L2E+IDwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICcgPGxpPjxhIGhyZWY9XCIjXCIgIGRhdGEtbnVtPScgKyAodG90YWxQYWdlcyAtIDYgKyBpKSArICc+JyArICh0b3RhbFBhZ2VzIC0gNiArIGkpICsgJzwvYT4gPC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsUGFnZXM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBhZ2UgPT0gaSArIDEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICcgPGxpPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJhY3RpdmVcIiBkYXRhLW51bT0nICsgY3VycmVudFBhZ2UgKyAnPicgKyBjdXJyZW50UGFnZSArICc8L2E+IDwvbGk+JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZW51bSA9IHBhZ2VudW0gKyAnIDxsaT48YSBocmVmPVwiI1wiICBkYXRhLW51bT0nICsgKGkgKyAxKSArICc+JyArIChpICsgMSkgKyAnPC9hPiA8L2xpPic7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlID09IHRvdGFsUGFnZXMpIC8v5pyA5ZCO5LiA6aG1XHJcbiAgICAgICAgICAgICAgICB7Ly/lpITnkIbkuIvkuIDpobXlkozlsL7pobXnmoTpk77mjqVcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vb3V0cHV0LkFwcGVuZChcIiA8YSBkaXNhYmxlZD0nZGlzYWJsZWQnIGNsYXNzPSdjb2xIJz7kuIvkuIDpobU8L2E+IFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlTmV4dCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdFBhZ2UgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQYWdlIDwgdG90YWxQYWdlcykgey8v5aSE55CG5LiL5LiA6aG15ZKM5bC+6aG155qE6ZO+5o6lIFxyXG5cclxuICAgICAgICAgICAgICAgICAgICAvL291dHB1dC5BcHBlbmRGb3JtYXQoXCIgPGEgZGF0YS1wYWdlaW5kZXg9J3swfScgY2xhc3M9J3BhZ2VMaW5rJz7kuIvkuIDpobU8L2E+IFwiLCBjdXJyZW50UGFnZSArIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vcGFnZVByZSA9ICc8YSBocmVmPVwiI1wiICBkYXRhLW51bT0nICsgKHBhcnNlSW50KGN1cnJlbnRQYWdlKSArIDEpICsgJyBjbGFzcz1cIm5leHQtcGFnZSBpbmxpbmVcIj7kuIvkuIDpobU8L2E+JztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwYWdlbnVtID0gcGFnZW51bSArICc8L3VsPic7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFnaW5hdGlvblwiKS5pbm5lckhUTUwgPSBpbmRleFBhZ2UgKyBwYWdlUHJlICsgcGFnZW51bSArIHBhZ2VOZXh0O1xyXG5cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhZ2luYXRpb25cIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgJChcIiNwYWdpbmF0aW9uIGFcIikudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICAgJChcIiNwYWdpbmF0aW9uIGFcIikuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBjYWxsYmFjaygkKHRoaXMpLmF0dHIoXCJkYXRhLW51bVwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcbn1cclxuLy9mdW5jdGlvbiBQYWdpbmF0b3IocGFnZVNpemUsIGN1cnJlbnRQYWdlLCB0b3RhbENvdW50LCBjYWxsYmFjaykge1xyXG5cclxuXHJcbi8vfVxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvbGliL3BhZ2UvUGFnaW5hdG9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDEyIDIxIDIzIDI4IiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO3JlcXVpcmUoJy4vU3R1Q2xhc3NMaXN0LnRwbCcpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ3NyYy90cGwvU3R1ZGVudE1hbmFnZS9TdHVkZW50TWFuYWdlTGlzdCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZWFjaD0kdXRpbHMuJGVhY2gsJHZhbHVlPSRkYXRhLiR2YWx1ZSwkaW5kZXg9JGRhdGEuJGluZGV4LCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsaW5jbHVkZT1mdW5jdGlvbihmaWxlbmFtZSxkYXRhKXtkYXRhPWRhdGF8fCRkYXRhO3ZhciB0ZXh0PSR1dGlscy4kaW5jbHVkZShmaWxlbmFtZSxkYXRhLCRmaWxlbmFtZSk7JG91dCs9dGV4dDtyZXR1cm4gJG91dDt9LCRvdXQ9Jyc7JG91dCs9JyAnO1xuJGVhY2goJGRhdGEsZnVuY3Rpb24oJHZhbHVlLCRpbmRleCl7XG4kb3V0Kz0nIDx0cj4gPHRkPic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5TdHVOYW1lKTtcbiRvdXQrPSc8L3RkPiA8dGQ+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLkxvZ2luSWQpO1xuJG91dCs9JzwvdGQ+ICc7XG5pbmNsdWRlKCcuL1N0dUNsYXNzTGlzdCcsJHZhbHVlLlN0dUNsYXNzTGlzdCk7XG4kb3V0Kz0nIDx0ZD4gPHNwYW4gY2xhc3M9XCJpbmxpbmUgb3BlcmF0QnRuIHNlZURldGFpbFwiIGRhdGEtaWQ9XCInO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuU3R1SWQpO1xuJG91dCs9Jy0nO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuRWRpdGlvbklkKTtcbiRvdXQrPSdcIj7mn6XnnIvor6bmg4U8L3NwYW4+ICc7XG5pZigkdmFsdWUuQ2xhc3NDb3VudD09MCl7XG4kb3V0Kz0nIDxzcGFuIGNsYXNzPVwiaW5saW5lIG9wZXJhdEJ0biBjb250aW51ZVwiIGRhdGEtaWQ9XCInO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuU3R1SWQpO1xuJG91dCs9Jy0nO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuU3R1TmFtZSk7XG4kb3V0Kz0nLSc7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5HcmFkZUlkKTtcbiRvdXQrPSctJztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLlNjaG9vbElkKTtcbiRvdXQrPSctJztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLkVkaXRpb25JZCk7XG4kb3V0Kz0nXCIgPuaKpeivvjwvc3Bhbj4gJztcbn1lbHNle1xuJG91dCs9JyA8c3BhbiBjbGFzcz1cImlubGluZSBvcGVyYXRCdG4gY29udGludWVcIiBkYXRhLWlkPVwiJztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLlN0dUlkKTtcbiRvdXQrPSctJztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLlN0dU5hbWUpO1xuJG91dCs9Jy0nO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuR3JhZGVJZCk7XG4kb3V0Kz0nLSc7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5TY2hvb2xJZCk7XG4kb3V0Kz0nLSc7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5FZGl0aW9uSWQpO1xuJG91dCs9J1wiPue7reivvjwvc3Bhbj4gJztcbn1cbiRvdXQrPScgPC90ZD4gPC90cj4gJztcbn0pO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90cGwvU3R1ZGVudE1hbmFnZS9TdHVkZW50TWFuYWdlTGlzdC50cGxcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMjgiLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnc3JjL3RwbC9TdHVkZW50TWFuYWdlL1N0dUNsYXNzTGlzdCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZWFjaD0kdXRpbHMuJGVhY2gsJHZhbHVlPSRkYXRhLiR2YWx1ZSwkaW5kZXg9JGRhdGEuJGluZGV4LCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsJG91dD0nJzskb3V0Kz0nIDx0ZD4gJztcbiRlYWNoKCRkYXRhLGZ1bmN0aW9uKCR2YWx1ZSwkaW5kZXgpe1xuJG91dCs9JyA8cD4nO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuU2Nob29sTmFtZSk7XG4kb3V0Kz0nPC9wPiAnO1xufSk7XG4kb3V0Kz0nIDwvdGQ+IDx0ZD4gJztcbiRlYWNoKCRkYXRhLGZ1bmN0aW9uKCR2YWx1ZSwkaW5kZXgpe1xuJG91dCs9JyA8cD4nO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuQ2xhc3NOYW1lKTtcbiRvdXQrPSc8L3A+ICc7XG59KTtcbiRvdXQrPScgPC90ZD4gPHRkPic7XG4kZWFjaCgkZGF0YSxmdW5jdGlvbigkdmFsdWUsJGluZGV4KXtcbiRvdXQrPScgPHA+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLkNvdXJzZU5hbWUpO1xuJG91dCs9JzwvcD4gJztcbn0pO1xuJG91dCs9JzwvdGQ+IDx0ZD4gJztcbiRlYWNoKCRkYXRhLGZ1bmN0aW9uKCR2YWx1ZSwkaW5kZXgpe1xuJG91dCs9JyAnO1xuaWYoJHZhbHVlLklzV2Fybj09MSl7XG4kb3V0Kz0nIDxwIGNsYXNzPVwicmVkXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLkhhdmVOdW1iZXIpO1xuJG91dCs9Jy8nO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuQm9va051bWJlcik7XG4kb3V0Kz0nPC9wPiAnO1xufWVsc2V7XG4kb3V0Kz0nIDxwPic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5IYXZlTnVtYmVyKTtcbiRvdXQrPScvJztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLkJvb2tOdW1iZXIpO1xuJG91dCs9JzwvcD4gJztcbn1cbiRvdXQrPScgJztcbn0pO1xuJG91dCs9JzwvdGQ+IDx0ZD4gJztcbiRlYWNoKCRkYXRhLGZ1bmN0aW9uKCR2YWx1ZSwkaW5kZXgpe1xuJG91dCs9JyA8cD4nO1xuJG91dCs9JGVzY2FwZSgkaGVscGVycy4gZGF0ZUZvcm1hdCgkdmFsdWUuRXhwaXJlVGltZSAsICBcInl5eXktTU0tZGRcIikpO1xuJG91dCs9JzwvcD4gJztcbn0pO1xuJG91dCs9JzwvdGQ+JztcbnJldHVybiBuZXcgU3RyaW5nKCRvdXQpO1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdHBsL1N0dWRlbnRNYW5hZ2UvU3R1Q2xhc3NMaXN0LnRwbFxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAyOCJdLCJzb3VyY2VSb290IjoiIn0=