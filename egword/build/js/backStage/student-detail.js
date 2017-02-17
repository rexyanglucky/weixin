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
	var arrTbk = [];//同步课
	var arrBj = [];//班级
	var arrTjr = [];//推荐人，老师
	var tplTableStuDetail = __webpack_require__(22);//学生详情
	var stuId = $("#stuId").val();//学生id  stuEditionId
	var stuEditionId = $("#stuEditionId").val();//教材id
	var grade;//年级
	var stuName;//学生姓名
	__webpack_require__(7);
	var pop = __webpack_require__(9);
	var loadimg = __webpack_require__(10);
	var commJs = __webpack_require__(6);//公共方法
	var module = {
	    init: function () {
	        //todo 逻辑函数
	        this.render();
	        this.initBtns();
	    },
	
	    render: function () {
	        //加载列表
	        GetStuDetailData();//加载数据
	
	    },
	    initBtns: function () {
	        //todo 绑定事件
	        //编辑
	        $("body").delegate("#stuEdit", "click", function () {
	            window.location.href = "/Org/StudentManage/EditStu/" + stuId;
	            //"?stuId=" + stuId;//跳转
	
	        });
	
	        //重置密码
	        $("body").delegate("#reSetPwd", "click", function () {
	
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/ResetStuAccount",
	                dataType: "json",
	                data: {
	
	                    stuId: stuId, type: 0
	                },
	                success: function (data) {
	
	                    if (data && data.Data > 0) {
	                        alert("重置成功");
	
	                    } else {
	                        alert("提交失败");
	                    }
	
	
	
	                }
	            });
	
	        });
	
	        //账号冻结
	        $("body").delegate("#accountFreeze", "click", function () {
	
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/ResetStuAccount",
	                dataType: "json",
	                data: {
	
	                    stuId: stuId, type: 1
	                },
	                success: function (data) {
	
	                    if (data && data.Data > 0) {
	                        alert("冻结成功");
	
	                    } else {
	                        alert("冻结失败");
	                    }
	
	
	
	                }
	            });
	
	
	        });
	
	        //课程续课
	        $("body").delegate("#courseReNew", "click", function () {
	
	            $('.pop-mask').show();
	            $("#sing-up").show();
	            loadClass();//加载弹框数据
	            var strGrade = commJs.numGradeTran(parseInt(grade));
	            $("#stuName").html(stuName + "(" + strGrade + ")");//张三（七年级）
	
	        });
	        ///单选
	        $("body").delegate(".radio", "click", function () {
	
	            var type = $(this).attr("data-type");//类型0为调班1为加课次
	            var id = this.id;
	            if (type == "0") {
	                $("#currentClass").html(id.split('-')[2]);
	                if ($("#change-prounce").css("display")!="none") {
	                    //进行联动读音
	                    $('.spans').removeClass('active');
	                    if (id.split('-')[3] == "true") {//英式选中，美式移除
	                        $("#updateRead").addClass('active');
	
	                    } else {
	                        $("#updateRead2").addClass('active');
	
	                    }
	                }
	
	            } else {
	                $("#currentCourseNumber").html(id.split('-')[1] + "/" + id.split('-')[2] + "课次");//目前班级
	
	            }
	
	
	            $('.radio').removeClass('active');
	            $(this).addClass('active');
	
	        });
	
	        ///单选课程的lable
	        $("body").delegate(".lbCourse", "click", function () {
	            var id = $(this).attr("data-id");
	
	            var type = $(this).attr("data-type");//类型0为调班1为加课次
	            if (type == "0") {
	              
	                if ($("#change-prounce").css("display") != "none") {//修改读音
	                    //进行联动读音
	                    $('.spans').removeClass('active');
	                    if (id.split('-')[3] == "true") {//英式选中，美式移除
	                        $("#updateRead").addClass('active');
	
	                    } else {
	                        $("#updateRead2").addClass('active');
	
	                    }
	                } else {
	                    $("#currentClass").html(id.split('-')[2]);
	                    
	                }
	
	            } else {
	                $("#currentCourseNumber").html(id.split('-')[1] + "/" + id.split('-')[2] + "课次");//目前班级
	
	            }
	            $("#currentClass").html(id.split('-')[2]);
	            $('.radio').removeClass('active');
	            $($(this).find(".radio")[0]).addClass('active');
	
	        });
	
	        //调班
	        $("body").delegate("#classChange", "click", function () {
	
	            loadClass(2);//加载班级2代表调班加载下拉班级
	            $("#stuNameCc").html(stuName);//张三（七年级）
	            $('.pop-mask').show();
	            $("#change-class").show();
	
	
	
	
	        });
	        //调班提交数据
	        $("body").delegate("#changeClassBtn", "click", function () {
	            var jsonAdd = {};
	            jsonAdd.StuId = stuId;
	            var orgClass = $("#drop_cc").attr("data-id");//班级数组
	            jsonAdd.SchoolId = orgClass.split('-')[0];
	            jsonAdd.ClassId = orgClass.split('-')[1];
	            var orgCourse = $("#stuCourse .active")[0].id;
	            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、课次 、课程有效期 课价
	            var currC = $("#currentClass").attr("data-id");//当前选择课程所在的班级old
	            if (currC == jsonAdd.ClassId) {
	                return;//无效请求每更换班级
	            }
	
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/ChangeOrgStuClass",
	                dataType: "json",
	                data: {
	
	                    data: JSON.stringify(jsonAdd)
	                },
	                success: function (data) {
	
	                    if (data && data.Data > 0) {
	                        GetStuDetailData();//重新加载列表
	                        $("#change-class").hide();
	                        $('.pop-mask').hide();
	
	                    } else {
	                        alert("提交失败");
	                    }
	
	
	
	                }
	            });
	
	
	        });
	
	
	        //加课次
	        $("body").delegate("#classAdd", "click", function () {
	
	            loadCourseRad2();//添加课次
	            $("#addCStuName").html(stuName);//张三（七年级）
	            $('.pop-mask').show();
	            $("#add-classOrder").show();
	
	        });
	        //加课次提交数据
	        $("body").delegate("#addCourseBtn", "click", function () {
	            
	            var jsonAdd = {};
	            jsonAdd.StuId = stuId;
	            var orgCourse = $("#stuCourseAddC .active")[0].id;
	            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、已经上课次 、总课次
	            var addNum = $("#addCourseNum").val().trim();//要添加课次
	            if (addNum == "") {
	                return;//必填课次
	            }
	            //var leftNum = parseInt(orgCourse.split('-')[2]) - parseInt(orgCourse.split('-')[1]) + parseInt(addNum);//剩余课次的和加上新添加的
	
	            // if (leftNum > parseInt(orgCourse.split('-')[2])) {
	            //     return;//无效请求不能超过当前的总课次
	            // }
	            jsonAdd.LeftNumber = addNum;//加课的次数
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/AddOrgStuCourse",
	                dataType: "json",
	                data: {
	
	                    data: JSON.stringify(jsonAdd)
	                },
	                success: function (data) {
	
	                    if (data && data.Data > 0) {
	                        GetStuDetailData();//重新加载列表
	                        $("#add-classOrder").hide();
	                        $('.pop-mask').hide();
	
	                    } else {
	                        alert("提交失败");
	                    }
	
	
	
	                }
	            });
	
	
	        });
	
	        //退课
	        $("body").delegate("#classBack", "click", function () {
	            
	            loadCourseBack();//退课的加载课程下拉
	            var strGrade = commJs.numGradeTran(parseInt(grade));
	            $("#backStuName").html(stuName + "(" + strGrade + ")");//张三（七年级）
	            $('.pop-mask').show();
	            $("#sing-out").show();
	
	        });
	         //退课的提交
	        $("body").delegate("#backBtn", "click", function () {
	
	            
	            var jsonAdd = {};
	            jsonAdd.StuId = stuId;
	            var orgCourse = $("#drop_backC").attr("data-id");
	            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、已经上课次 、总课次
	            jsonAdd.Remark = $("#backReason").val().trim();//退课的原因
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/BackOrgStuCourse",
	                dataType: "json",
	                data: {
	
	                    data: JSON.stringify(jsonAdd)
	                },
	                success: function (data) {
	
	                    if (data && data.Data > 0) {
	                        GetStuDetailData();//重新加载列表
	                        $("#sing-out").hide();
	                        $('.pop-mask').hide();
	
	                    } else {
	                        alert("提交失败");
	                    }
	
	
	
	                }
	            });
	
	            
	        });
	
	        //修改读音
	        $("body").delegate("#editSound", "click", function () {
	            
	            loadCourseRad(2);//当为2的时候渲染读音的课程下拉
	            $("#updateReadStuName").html(stuName);//张三（七年级）
	            $('.pop-mask').show();
	            $("#change-prounce").show();
	
	        });
	
	
	        //修改读音的提交
	        $("body").delegate("#updateReadBtn", "click", function () {
	
	            
	            var jsonAdd = {};
	            jsonAdd.StuId = stuId;
	            var orgCourse = $("#updateReadCourse .active")[0].id;
	            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、已经上课次 、总课次
	            jsonAdd.IsEng = 0;//美
	            if ($("#updateRead").hasClass("active")) {
	                jsonAdd.IsEng = 1;//英
	                
	            }
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/UpdateOrgStuCourseRead",
	                dataType: "json",
	                data: {
	
	                    data: JSON.stringify(jsonAdd)
	                },
	                success: function (data) {
	
	                    if (data && data.Data > 0) {
	                        GetStuDetailData();//重新加载列表
	                        $("#change-prounce").hide();
	                        $('.pop-mask').hide();
	
	                    } else {
	                        alert("提交失败");
	                    }
	
	
	
	                }
	            });
	
	
	        });
	
	
	        //续课的确定
	        $("body").delegate("#courseAddBtn", "click", function () {
	            var jsonAdd = {};
	            var orgCourse = $("#drop_course").attr("data-id");//课程数组
	            jsonAdd.StuId = stuId;
	
	            jsonAdd.RefereeId = $("#drop_tjr").attr("data-id");//推荐人
	            jsonAdd.CourseId = orgCourse.split('-')[0];//课程id、课次 、课程有效期 课价
	            jsonAdd.BookNumber = orgCourse.split('-')[1];//课次
	            jsonAdd.LeftNumber = orgCourse.split('-')[1];//课次
	            jsonAdd.ExpireMonth = orgCourse.split('-')[2];//课次有效期月
	            jsonAdd.InPrice = orgCourse.split('-')[3];//课次有效期月
	            jsonAdd.BookType = orgCourse.split('-')[5];//教材类型，同步1
	            jsonAdd.StuEditionId = stuEditionId;//学生教材
	            jsonAdd.SchoolId = $("#drop_class").attr("data-id").split('-')[0];
	            jsonAdd.ClassId = $("#drop_class").attr("data-id").split('-')[1];
	            jsonAdd.HistoryType = 0;//从数据库查，不知道是哪种类型续报就是0
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
	                        GetStuDetailData();//重新加载列表
	                        $("#sing-up").hide();
	                        $('.pop-mask').hide();
	
	                    } else {
	                        alert("提交失败");
	                    }
	
	
	
	                }
	            });
	        });
	
	
	
	
	
	    }
	
	
	};
	
	
	//绑定数据
	$(function () {
	    module.init();
	
	});
	
	
	
	//发送请求调取数据
	function GetStuDetailData() {
	    //加载列表
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetStuDetail",
	        dataType: "json",
	        data: {
	            data: stuId
	        },
	        success: function (data) {
	
	            debugger;
	            if (data.Data) {
	                $("#tb").html(tplTableStuDetail(data.Data));
	                grade = data.Data.GradeId;
	                stuName = data.Data.StuName;
	
	
	            }
	            else {
	
	                alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	
	//加载班级
	function loadClass(obj) {
	
	    var arrTemp = [];
	    //加载班级列表
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetOrgClassConNumber",
	        dataType: "json",
	        data: {
	            data: stuId//需要进行过滤
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
	
	                if (obj == 2) {//调班的
	                    lui.initDropDownList({ warpid: "drop_cc", width: 160, nameField: 'name', idField: 'id', data: arrTemp, subtextlength: 15 });
	                    loadCourseRad();//加载学生已报的课程
	
	                } else {
	                    lui.initDropDownList({ warpid: "drop_class", width: 160, subtextlength: 15, nameField: 'name', idField: 'id', data: arrTemp });//报课的班级
	                    loadCourse(1);
	                }
	
	            }
	            else {
	
	                // alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	//只是加载列表数据
	function GetStuDataNotLoadSelect() {
	    return GetStuDetailData(-1);
	
	}
	
	//加载课程
	function loadCourse() {
	    var arrTemp = [];//创建一个临时数组
	    //加载列表
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetOrgCourse",
	        dataType: "json",
	        data: {
	            data: stuId//需要进行过滤
	        },
	        success: function (data) {
	
	            if (data.Data && data.Data.length > 0) {
	
	
	                arrTbk.push({
	                    name: "全部", id: 0, pid: 0
	                });//课程
	                for (var i = 0; i < data.Data.length; i++) {
	
	                    arrTemp.push({ name: data.Data[i].CourseName, id: data.Data[i].CourseId + "-" + data.Data[i].BookNumber + "-" + data.Data[i].ExpiryMonth + "-" + data.Data[i].OutPrice + "-" + data.Data[i].InPrice + "-" + data.Data[i].BookType, pid: data.Data[i].CourseId });//报班的课程
	
	                }
	
	
	
	                lui.initDropDownList({ warpid: "drop_course", width: 140, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: loadCourseData, subtextlength:15 });//同步课程，需要进行联动
	
	                $("#lessonNumber").html(arrTemp[0].id.split('-')[1]);
	                $("#lessonTime").html(arrTemp[0].id.split('-')[2] + "月");
	                $("#lessonPrice").html(arrTemp[0].id.split('-')[3] + "元");
	                $("#actuPrice").html(arrTemp[0].id.split('-')[4] + "元");
	                loadTeachers();//加载推荐人
	
	            }
	            else {
	
	                //alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	
	//加载课程Rdio
	function loadCourseRad(obj) {//当为2的时候为修改读音的渲染
	    var strHtml = "";//创建一个字符串进行拼接
	    //加载列表
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetOrgStuCourse",
	        dataType: "json",
	        data: {
	            data: stuId//需要进行过滤
	        },
	        success: function (data) {
	
	            if (data.Data && data.Data.length > 0) {
	                for (var i = 0; i < data.Data.length; i++) {
	
	                    if (i == 0) {
	                        strHtml += '<label style="margin-right:30px;" class="lbCourse" data-type="0" data-id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId + "-" + data.Data[i].ClassName + "-" + data.Data[i].IsEng + '><span data-type="0" class="radio active" style="margin-right:15px;" id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId + "-" + data.Data[i].ClassName + "-" + data.Data[i].IsEng + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';
	                        $("#currentClass").html(data.Data[i].ClassName);//目前班级
	                        $("#currentClass").attr("data-id", data.Data[i].ClassId);
	
	                    } else {
	                        strHtml += '<label style="margin-right:30px;" class="lbCourse" data-type="0" data-id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId + "-" + data.Data[i].ClassName + "-" + data.Data[i].IsEng + '><span data-type="0"  class="radio " style="margin-right:15px;" id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId + "-" + data.Data[i].ClassName + "-" + data.Data[i].IsEng + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';
	
	                    }
	                }
	                if (obj == 2) {
	                    $("#updateReadCourse").html(strHtml);
	                    //updateRead
	                    $('.spans ').removeClass('active');
	                    
	                    if (data.Data[0].IsEng ==true) {//英式选中，美式移除
	                        $("#updateRead").addClass('active');
	                        
	                    } else {
	                        $("#updateRead2").addClass('active');
	                        
	                    }
	                } else {
	                    $("#stuCourse").html(strHtml);
	                    
	                }
	               
	
	
	
	            }
	            else {
	
	                //alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	
	//加载课程Rdio（加课次）
	function loadCourseRad2() {
	    var strHtml = "";//创建一个字符串进行拼接
	    //加载列表
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetOrgStuCourse",
	        dataType: "json",
	        data: {
	            data: stuId//需要进行过滤
	        },
	        success: function (data) {
	
	            if (data.Data && data.Data.length > 0) {
	                for (var i = 0; i < data.Data.length; i++) {
	
	                    if (i == 0) {
	                        strHtml += '<label style="margin-right:30px;" class="lbCourse" data-type="1" data-id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + '><span data-type="1"  class="radio active" style="margin-right:15px;" id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';
	                        $("#currentCourseNumber").html(data.Data[i].HaveNumber + "/" + data.Data[i].BookNumber + "课次");//目前班级
	                        $("#currentCourseNumber").attr("data-id", data.Data[i].HaveNumber + "-" + data.Data[i].CourseId);
	
	                    } else {
	                        strHtml += '<label style="margin-right:30px;" class="lbCourse" data-type="1" data-id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + '><span data-type="1"  class="radio " style="margin-right:15px;" id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';
	
	                    }
	                }
	
	                $("#stuCourseAddC").html(strHtml);
	
	
	
	            }
	            else {
	
	                //alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	
	
	//加载课程退课
	function loadCourseBack() {
	    var arrTemp = [];//创建一个临时数组
	    //加载列表
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetOrgStuCourse",
	        dataType: "json",
	        data: {
	            data: stuId//需要进行过滤
	        },
	        success: function (data) {
	
	            if (data.Data && data.Data.length > 0) {
	
	                for (var i = 0; i < data.Data.length; i++) {
	
	                    arrTemp.push({
	                        name: data.Data[i].CourseName, id: data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + "-" + data.Data[i].ExpiryMonth, pid: data.Data[i].CourseId
	                    });//报班的课程
	
	                }
	
	
	
	                lui.initDropDownList({
	                    warpid: "drop_backC", width: 140, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: loadCourseDataBack,subtextlength: 15
	                });//同步课程，需要进行联动
	
	                $("#backCourse").html(arrTemp[0].id.split('-')[1] + "/" + arrTemp[0].id.split('-')[2] + "课次");//显示的课程进度
	
	
	            }
	            else {
	
	                //alert("获取数据失败");
	
	            }
	        }
	    });
	
	}
	
	
	
	//加载推荐人
	function loadTeachers() {
	
	    //加载班级列表
	    $.ajax({
	        type: "post",
	        url: "/Org/StudentManage/GetOrgTeachers",
	        dataType: "json",
	        data: {
	            data: ""
	        },
	        success: function (data) {
	            if (data.Data && data.Data.length > 0) {
	
	
	
	                for (var i = 0; i < data.Data.length; i++) {
	
	                    arrTjr.push({
	                        name: data.Data[i].TeachName, id: data.Data[i].TeachId, pid: 1
	                    });//推荐人
	                }
	
	
	                lui.initDropDownList({
	                    warpid: "drop_tjr", width: 140, nameField: 'name', idField: 'id', data: arrTjr
	                });//推荐人
	
	
	            }
	            else {
	
	                // alert("获取数据失败");
	
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
	        $("#actuPrice").html(jsData.split('-')[4] + "元");
	    }
	
	
	
	
	}
	
	
	//进行联动课程的选择(退课)
	function loadCourseDataBack() {
	    var jsData = $("#drop_backC").attr("data-id");//组合的数据进行联动
	
	    if (jsData.length > 0) {
	        $("#backCourse").html(jsData.split('-')[1] + "/" + jsData.split('-')[2] + "课次");//显示的课程进度
	    }
	
	
	
	
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//初始化下拉框
	var Lui = __webpack_require__(1);
	var tool = __webpack_require__(4);
	var lui = new Lui();
	//创建下级弹出层事件
	/*tool.pophide($('.eg-pop .close,.eg-pop .sure'),$('.eg-pop'));
	tool.popshow($('.creatStudent'),$('#creatStudent'));
	//课程开通
	tool.popshow($('.continue'),$('#continue'));
	tool.Sibs($('.spans'));*/
	//鼠标移动倒课程管理的事件
	$('.managebtn').on('mouseenter', function () {
	    $('.managebtn').css({
	        'padding-bottom': '10px'
	    });
	    $('.drop').show();
	})
	$('.manage').on('mouseleave', function () {
	    $('.managebtn').css({
	        'padding-bottom': '0px'
	    });
	    $('.drop').hide();
	})
	$('.drop li').on('click', function (event) {
	    $('.drop').hide();
	});
	//性别按钮
	tool.radio();
	//选择读音
	tool.Sibs($('.spans'));
	
	//创建下级弹出层事件
	tool.pophide($('.eg-pop .close'), $('.eg-pop'));
	//编辑学生的弹窗
	/*tool.popshow($('.editMesg'),$('#editMesg'));*/
	/*课程续保推荐人的下拉*/
	//lui.initDropDownList({ warpid: "drop_dem1", width: 140, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	/*课程续保课程的下拉*/
	//lui.initDropDownList({ warpid: "drop_dem2", width: 140, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	/*课程续保班级的下拉*/
	//lui.initDropDownList({ warpid: "drop_dem3", width: 140, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	
	//办理退课课程的下拉
	//lui.initDropDownList({
	//    warpid: "drop_backC", width: 140, nameField: 'name', idField: 'id', data: [{
	//        name: '01', id: '00', pid: ''
	//    }, {
	//        name: '02', id: '00_01', pid: '00'
	//    }, {
	//        name: '03', id: '00_02', pid: '00'
	//    }, {
	//        name: '04', id: '00_01_01', pid: '00_01'
	//    }, {
	//        name: '05', id: '00_01_02', pid: '00_01'
	//    }, {
	//        name: '06', id: '00_02_01', pid: '00_02'
	//    }, {
	//        name: '07', id: '00_02_02', pid: '00_02'
	//    }]
	//});
	//调班班级的下拉
	//lui.initDropDownList({ warpid: "drop_cc", width: 100, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	


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

	var template=__webpack_require__(8);__webpack_require__(23);
	module.exports=template('src/tpl/StudentManage/StuDetail',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,StuName=$data.StuName,LoginId=$data.LoginId,Gender=$data.Gender,Tel=$data.Tel,GradeId=$data.GradeId,EditionName=$data.EditionName,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},CourseInfoList=$data.CourseInfoList,$out='';$out+=' <div> <span class="mr20"><span class="white">姓名</span>姓名:</span> <span>';
	$out+=$escape(StuName);
	$out+='</span> </div> <div class="mt20"> <span class="mr20"><span class="white">账号</span>账号:</span> <span> ';
	$out+=$escape(LoginId);
	$out+='</span> </div> <div class="mt20"> <span class="mr20"><span class="white">性别</span>性别:</span> ';
	if(Gender==1){
	$out+=' <span> 男</span> ';
	}else{
	$out+=' <span> 女</span> ';
	}
	$out+=' </div> <div class="mt20"> <span class="mr20"><span class="white">手机</span>手机:</span> <span>';
	$out+=$escape(Tel);
	$out+='</span> </div> <div class="mt20"> <span class="mr20"><span class="white">年级</span>年级:</span> <span>';
	$out+=$escape($helpers. GetBigGrade(GradeId ));
	$out+='</span> </div> <div class="mt20"> <span class="mr20">教材版本:</span> <span>';
	$out+=$escape(EditionName);
	$out+='</span> </div> <div class="mt20"> <span class="mr20">课程信息:</span> </div> <div class="table" style="margin-top:15px;"> <table class="wd100"> <tr> <td>报班课程</td> <td>班级</td> <td>班主任</td> <td>课次进度</td> <td>有效期</td> <td>读音</td> </tr> ';
	include('./StuDetail2',CourseInfoList);
	$out+=' </table> </div> ';
	return new String($out);
	});

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(8);
	module.exports=template('src/tpl/StudentManage/StuDetail2',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' ';
	$each($data,function($value,$index){
	$out+=' <tr> <td>';
	$out+=$escape($value.CourseName);
	$out+='</td> <td>';
	$out+=$escape($value.ClassName);
	$out+='</td> <td>';
	$out+=$escape($value.TeachName);
	$out+='</td> <td> ';
	$out+=$escape($value.HaveNumber);
	$out+='课时/';
	$out+=$escape($value.BookNumber);
	$out+='课次 </td> ';
	if($value.IsWarn==1){
	$out+=' <td class="red"> 过期 </td> ';
	}else{
	$out+=' <td> ';
	$out+=$escape($helpers. dateFormat($value.ExpireTime ,  "yyyy-MM-dd"));
	$out+=' </td> ';
	}
	$out+=' ';
	if($value.IsEng==1){
	$out+=' <td> 英式读音 </td> ';
	}else{
	$out+=' <td> 美式读音 </td> ';
	}
	$out+=' </tr> ';
	});
	return new String($out);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYmFja1N0YWdlL3N0dWRlbnQtZGV0YWlsLmpzIiwid2VicGFjazovLy8uL3NyYy9MVUkvanMvbHVpLmpzP2U3OTAqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2Ryb3Bkb3dubGlzdC5qcz9mZWYwKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9jaGVja2JveC5qcz82MTZkKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS90b29sLmpzPzVlNmEqKioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi91dGlsLmpzP2I5OTIqKioqIiwid2VicGFjazovLy8uL3NyYy90cGwvdGVtcGxhdGUtaGVscGVycy5qcz8xOTQzKioqKioiLCJ3ZWJwYWNrOi8vLy4vfi90bW9kanMtbG9hZGVyL3J1bnRpbWUuanM/ODk2NioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvcG9wdXAvcG9wdXB0aXAuanM/ZTE4YioqIiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvcG9wdXAvc2hvd2xvYWRpbWcuanM/NzMzNCoqIiwid2VicGFjazovLy8uL3NyYy90cGwvU3R1ZGVudE1hbmFnZS9TdHVEZXRhaWwudHBsIiwid2VicGFjazovLy8uL3NyYy90cGwvU3R1ZGVudE1hbmFnZS9TdHVEZXRhaWwyLnRwbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7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QUFDQSxNQUFLO0FBQ0wsaUNBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBO0FBQ0EsTUFBSztBQUNMLGtDQUFpQyxFQUFFLFlBQVk7QUFDL0M7QUFDQSxFOzs7Ozs7QUNuRkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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OztBQUlBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNQUFLOzs7O0FBSUwsRUFBQzs7Ozs7Ozs7QUMvT0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQyxrQkFBa0IsYUFBYSw2QkFBNkIsdUZBQXVGLGlCQUFpQjtBQUMxTTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxtREFBa0Q7QUFDbEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEJBLHFDQUE4QztBQUM5QztBQUNBO0FBQ0EsY0FBYSxrT0FBa08saUJBQWlCLGtEQUFrRCxXQUFXLGFBQWEsNkNBQTZDO0FBQ3ZYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkhBQTBIO0FBQzFIO0FBQ0E7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7O0FDdkJEO0FBQ0E7QUFDQTtBQUNBLGNBQWEsbUlBQW1JO0FBQ2hKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsRUFBQyxFIiwiZmlsZSI6ImJhY2tTdGFnZS9zdHVkZW50LWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwiLy/lkI7lj7DkuqTkupJcclxuLy/lj5HpgIHor7fmsYLosIPlj5bmlbDmja7nu5HlrprkuIvmi4nmoYZcclxudmFyIGFyclRiayA9IFtdOy8v5ZCM5q2l6K++XHJcbnZhciBhcnJCaiA9IFtdOy8v54+t57qnXHJcbnZhciBhcnJUanIgPSBbXTsvL+aOqOiNkOS6uu+8jOiAgeW4iFxyXG52YXIgdHBsVGFibGVTdHVEZXRhaWwgPSByZXF1aXJlKFwiU3R1ZGVudE1hbmFnZS9TdHVEZXRhaWwudHBsXCIpOy8v5a2m55Sf6K+m5oOFXHJcbnZhciBzdHVJZCA9ICQoXCIjc3R1SWRcIikudmFsKCk7Ly/lrabnlJ9pZCAgc3R1RWRpdGlvbklkXHJcbnZhciBzdHVFZGl0aW9uSWQgPSAkKFwiI3N0dUVkaXRpb25JZFwiKS52YWwoKTsvL+aVmeadkGlkXHJcbnZhciBncmFkZTsvL+W5tOe6p1xyXG52YXIgc3R1TmFtZTsvL+WtpueUn+Wnk+WQjVxyXG5yZXF1aXJlKFwiLi4vLi4vdHBsL3RlbXBsYXRlLWhlbHBlcnMuanNcIik7XHJcbnZhciBwb3AgPSByZXF1aXJlKFwiLi4vbGliL3BvcHVwL3BvcHVwdGlwLmpzXCIpO1xyXG52YXIgbG9hZGltZyA9IHJlcXVpcmUoXCIuLi9saWIvcG9wdXAvc2hvd2xvYWRpbWcuanNcIik7XHJcbnZhciBjb21tSnMgPSByZXF1aXJlKFwiLi4vbGliL3V0aWwuanNcIik7Ly/lhazlhbHmlrnms5VcclxudmFyIG1vZHVsZSA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvL3RvZG8g6YC76L6R5Ye95pWwXHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB0aGlzLmluaXRCdG5zKCk7XHJcbiAgICB9LFxyXG5cclxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIC8v5Yqg6L295YiX6KGoXHJcbiAgICAgICAgR2V0U3R1RGV0YWlsRGF0YSgpOy8v5Yqg6L295pWw5o2uXHJcblxyXG4gICAgfSxcclxuICAgIGluaXRCdG5zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy90b2RvIOe7keWumuS6i+S7tlxyXG4gICAgICAgIC8v57yW6L6RXHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIjc3R1RWRpdFwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIi9PcmcvU3R1ZGVudE1hbmFnZS9FZGl0U3R1L1wiICsgc3R1SWQ7XHJcbiAgICAgICAgICAgIC8vXCI/c3R1SWQ9XCIgKyBzdHVJZDsvL+i3s+i9rFxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/ph43nva7lr4bnoIFcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNyZVNldFB3ZFwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIC8v5o+Q5Lqk6KGo5Y2VXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICAgICAgICAgIHVybDogXCIvT3JnL1N0dWRlbnRNYW5hZ2UvUmVzZXRTdHVBY2NvdW50XCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHN0dUlkOiBzdHVJZCwgdHlwZTogMFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuRGF0YSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLph43nva7miJDlip9cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi5o+Q5Lqk5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL+i0puWPt+WGu+e7k1xyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2FjY291bnRGcmVlemVcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAvL+aPkOS6pOihqOWNlVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL09yZy9TdHVkZW50TWFuYWdlL1Jlc2V0U3R1QWNjb3VudFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzdHVJZDogc3R1SWQsIHR5cGU6IDFcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLkRhdGEgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi5Ya757uT5oiQ5YqfXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuWGu+e7k+Wksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v6K++56iL57ut6K++XHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIjY291cnNlUmVOZXdcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkKCcucG9wLW1hc2snKS5zaG93KCk7XHJcbiAgICAgICAgICAgICQoXCIjc2luZy11cFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgIGxvYWRDbGFzcygpOy8v5Yqg6L295by55qGG5pWw5o2uXHJcbiAgICAgICAgICAgIHZhciBzdHJHcmFkZSA9IGNvbW1Kcy5udW1HcmFkZVRyYW4ocGFyc2VJbnQoZ3JhZGUpKTtcclxuICAgICAgICAgICAgJChcIiNzdHVOYW1lXCIpLmh0bWwoc3R1TmFtZSArIFwiKFwiICsgc3RyR3JhZGUgKyBcIilcIik7Ly/lvKDkuInvvIjkuIPlubTnuqfvvIlcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8v5Y2V6YCJXHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIucmFkaW9cIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9ICQodGhpcykuYXR0cihcImRhdGEtdHlwZVwiKTsvL+exu+WeizDkuLrosIPnj60x5Li65Yqg6K++5qyhXHJcbiAgICAgICAgICAgIHZhciBpZCA9IHRoaXMuaWQ7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2N1cnJlbnRDbGFzc1wiKS5odG1sKGlkLnNwbGl0KCctJylbMl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKCQoXCIjY2hhbmdlLXByb3VuY2VcIikuY3NzKFwiZGlzcGxheVwiKSE9XCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+i/m+ihjOiBlOWKqOivu+mfs1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGFucycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWQuc3BsaXQoJy0nKVszXSA9PSBcInRydWVcIikgey8v6Iux5byP6YCJ5Lit77yM576O5byP56e76ZmkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjdXBkYXRlUmVhZFwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjdXBkYXRlUmVhZDJcIikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIiNjdXJyZW50Q291cnNlTnVtYmVyXCIpLmh0bWwoaWQuc3BsaXQoJy0nKVsxXSArIFwiL1wiICsgaWQuc3BsaXQoJy0nKVsyXSArIFwi6K++5qyhXCIpOy8v55uu5YmN54+t57qnXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgJCgnLnJhZGlvJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vL+WNlemAieivvueoi+eahGxhYmxlXHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIubGJDb3Vyc2VcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBpZCA9ICQodGhpcykuYXR0cihcImRhdGEtaWRcIik7XHJcblxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9ICQodGhpcykuYXR0cihcImRhdGEtdHlwZVwiKTsvL+exu+WeizDkuLrosIPnj60x5Li65Yqg6K++5qyhXHJcbiAgICAgICAgICAgIGlmICh0eXBlID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBpZiAoJChcIiNjaGFuZ2UtcHJvdW5jZVwiKS5jc3MoXCJkaXNwbGF5XCIpICE9IFwibm9uZVwiKSB7Ly/kv67mlLnor7vpn7NcclxuICAgICAgICAgICAgICAgICAgICAvL+i/m+ihjOiBlOWKqOivu+mfs1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5zcGFucycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWQuc3BsaXQoJy0nKVszXSA9PSBcInRydWVcIikgey8v6Iux5byP6YCJ5Lit77yM576O5byP56e76ZmkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjdXBkYXRlUmVhZFwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjdXBkYXRlUmVhZDJcIikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjY3VycmVudENsYXNzXCIpLmh0bWwoaWQuc3BsaXQoJy0nKVsyXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIiNjdXJyZW50Q291cnNlTnVtYmVyXCIpLmh0bWwoaWQuc3BsaXQoJy0nKVsxXSArIFwiL1wiICsgaWQuc3BsaXQoJy0nKVsyXSArIFwi6K++5qyhXCIpOy8v55uu5YmN54+t57qnXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoXCIjY3VycmVudENsYXNzXCIpLmh0bWwoaWQuc3BsaXQoJy0nKVsyXSk7XHJcbiAgICAgICAgICAgICQoJy5yYWRpbycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgJCgkKHRoaXMpLmZpbmQoXCIucmFkaW9cIilbMF0pLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8v6LCD54+tXHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIjY2xhc3NDaGFuZ2VcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBsb2FkQ2xhc3MoMik7Ly/liqDovb3nj63nuqcy5Luj6KGo6LCD54+t5Yqg6L295LiL5ouJ54+t57qnXHJcbiAgICAgICAgICAgICQoXCIjc3R1TmFtZUNjXCIpLmh0bWwoc3R1TmFtZSk7Ly/lvKDkuInvvIjkuIPlubTnuqfvvIlcclxuICAgICAgICAgICAgJCgnLnBvcC1tYXNrJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKFwiI2NoYW5nZS1jbGFzc1wiKS5zaG93KCk7XHJcblxyXG5cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v6LCD54+t5o+Q5Lqk5pWw5o2uXHJcbiAgICAgICAgJChcImJvZHlcIikuZGVsZWdhdGUoXCIjY2hhbmdlQ2xhc3NCdG5cIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBqc29uQWRkID0ge307XHJcbiAgICAgICAgICAgIGpzb25BZGQuU3R1SWQgPSBzdHVJZDtcclxuICAgICAgICAgICAgdmFyIG9yZ0NsYXNzID0gJChcIiNkcm9wX2NjXCIpLmF0dHIoXCJkYXRhLWlkXCIpOy8v54+t57qn5pWw57uEXHJcbiAgICAgICAgICAgIGpzb25BZGQuU2Nob29sSWQgPSBvcmdDbGFzcy5zcGxpdCgnLScpWzBdO1xyXG4gICAgICAgICAgICBqc29uQWRkLkNsYXNzSWQgPSBvcmdDbGFzcy5zcGxpdCgnLScpWzFdO1xyXG4gICAgICAgICAgICB2YXIgb3JnQ291cnNlID0gJChcIiNzdHVDb3Vyc2UgLmFjdGl2ZVwiKVswXS5pZDtcclxuICAgICAgICAgICAganNvbkFkZC5Db3Vyc2VJZCA9IG9yZ0NvdXJzZS5zcGxpdCgnLScpWzBdOy8v6K++56iLaWTjgIHor77mrKEg44CB6K++56iL5pyJ5pWI5pyfIOivvuS7t1xyXG4gICAgICAgICAgICB2YXIgY3VyckMgPSAkKFwiI2N1cnJlbnRDbGFzc1wiKS5hdHRyKFwiZGF0YS1pZFwiKTsvL+W9k+WJjemAieaLqeivvueoi+aJgOWcqOeahOePree6p29sZFxyXG4gICAgICAgICAgICBpZiAoY3VyckMgPT0ganNvbkFkZC5DbGFzc0lkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47Ly/ml6DmlYjor7fmsYLmr4/mm7TmjaLnj63nuqdcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy/mj5DkuqTooajljZVcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9PcmcvU3R1ZGVudE1hbmFnZS9DaGFuZ2VPcmdTdHVDbGFzc1wiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShqc29uQWRkKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuRGF0YSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2V0U3R1RGV0YWlsRGF0YSgpOy8v6YeN5paw5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjY2hhbmdlLWNsYXNzXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBvcC1tYXNrJykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuaPkOS6pOWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvL+WKoOivvuasoVxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2NsYXNzQWRkXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgbG9hZENvdXJzZVJhZDIoKTsvL+a3u+WKoOivvuasoVxyXG4gICAgICAgICAgICAkKFwiI2FkZENTdHVOYW1lXCIpLmh0bWwoc3R1TmFtZSk7Ly/lvKDkuInvvIjkuIPlubTnuqfvvIlcclxuICAgICAgICAgICAgJCgnLnBvcC1tYXNrJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKFwiI2FkZC1jbGFzc09yZGVyXCIpLnNob3coKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/liqDor77mrKHmj5DkuqTmlbDmja5cclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNhZGRDb3Vyc2VCdG5cIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB2YXIganNvbkFkZCA9IHt9O1xyXG4gICAgICAgICAgICBqc29uQWRkLlN0dUlkID0gc3R1SWQ7XHJcbiAgICAgICAgICAgIHZhciBvcmdDb3Vyc2UgPSAkKFwiI3N0dUNvdXJzZUFkZEMgLmFjdGl2ZVwiKVswXS5pZDtcclxuICAgICAgICAgICAganNvbkFkZC5Db3Vyc2VJZCA9IG9yZ0NvdXJzZS5zcGxpdCgnLScpWzBdOy8v6K++56iLaWTjgIHlt7Lnu4/kuIror77mrKEg44CB5oC76K++5qyhXHJcbiAgICAgICAgICAgIHZhciBhZGROdW0gPSAkKFwiI2FkZENvdXJzZU51bVwiKS52YWwoKS50cmltKCk7Ly/opoHmt7vliqDor77mrKFcclxuICAgICAgICAgICAgaWYgKGFkZE51bSA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47Ly/lv4Xloavor77mrKFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL3ZhciBsZWZ0TnVtID0gcGFyc2VJbnQob3JnQ291cnNlLnNwbGl0KCctJylbMl0pIC0gcGFyc2VJbnQob3JnQ291cnNlLnNwbGl0KCctJylbMV0pICsgcGFyc2VJbnQoYWRkTnVtKTsvL+WJqeS9meivvuasoeeahOWSjOWKoOS4iuaWsOa3u+WKoOeahFxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKGxlZnROdW0gPiBwYXJzZUludChvcmdDb3Vyc2Uuc3BsaXQoJy0nKVsyXSkpIHtcclxuICAgICAgICAgICAgLy8gICAgIHJldHVybjsvL+aXoOaViOivt+axguS4jeiDvei2hei/h+W9k+WJjeeahOaAu+ivvuasoVxyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIGpzb25BZGQuTGVmdE51bWJlciA9IGFkZE51bTsvL+WKoOivvueahOasoeaVsFxyXG4gICAgICAgICAgICAvL+aPkOS6pOihqOWNlVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL09yZy9TdHVkZW50TWFuYWdlL0FkZE9yZ1N0dUNvdXJzZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShqc29uQWRkKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuRGF0YSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2V0U3R1RGV0YWlsRGF0YSgpOy8v6YeN5paw5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjYWRkLWNsYXNzT3JkZXJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucG9wLW1hc2snKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi5o+Q5Lqk5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/pgIDor75cclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNjbGFzc0JhY2tcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsb2FkQ291cnNlQmFjaygpOy8v6YCA6K++55qE5Yqg6L296K++56iL5LiL5ouJXHJcbiAgICAgICAgICAgIHZhciBzdHJHcmFkZSA9IGNvbW1Kcy5udW1HcmFkZVRyYW4ocGFyc2VJbnQoZ3JhZGUpKTtcclxuICAgICAgICAgICAgJChcIiNiYWNrU3R1TmFtZVwiKS5odG1sKHN0dU5hbWUgKyBcIihcIiArIHN0ckdyYWRlICsgXCIpXCIpOy8v5byg5LiJ77yI5LiD5bm057qn77yJXHJcbiAgICAgICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuICAgICAgICAgICAgJChcIiNzaW5nLW91dFwiKS5zaG93KCk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICAvL+mAgOivvueahOaPkOS6pFxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI2JhY2tCdG5cIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGpzb25BZGQgPSB7fTtcclxuICAgICAgICAgICAganNvbkFkZC5TdHVJZCA9IHN0dUlkO1xyXG4gICAgICAgICAgICB2YXIgb3JnQ291cnNlID0gJChcIiNkcm9wX2JhY2tDXCIpLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgICAgICBqc29uQWRkLkNvdXJzZUlkID0gb3JnQ291cnNlLnNwbGl0KCctJylbMF07Ly/or77nqItpZOOAgeW3sue7j+S4iuivvuasoSDjgIHmgLvor77mrKFcclxuICAgICAgICAgICAganNvbkFkZC5SZW1hcmsgPSAkKFwiI2JhY2tSZWFzb25cIikudmFsKCkudHJpbSgpOy8v6YCA6K++55qE5Y6f5ZugXHJcbiAgICAgICAgICAgIC8v5o+Q5Lqk6KGo5Y2VXHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICAgICAgICAgIHVybDogXCIvT3JnL1N0dWRlbnRNYW5hZ2UvQmFja09yZ1N0dUNvdXJzZVwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShqc29uQWRkKVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuRGF0YSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2V0U3R1RGV0YWlsRGF0YSgpOy8v6YeN5paw5Yqg6L295YiX6KGoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjc2luZy1vdXRcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcucG9wLW1hc2snKS5oaWRlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwi5o+Q5Lqk5aSx6LSlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy/kv67mlLnor7vpn7NcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNlZGl0U291bmRcIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBsb2FkQ291cnNlUmFkKDIpOy8v5b2T5Li6MueahOaXtuWAmea4suafk+ivu+mfs+eahOivvueoi+S4i+aLiVxyXG4gICAgICAgICAgICAkKFwiI3VwZGF0ZVJlYWRTdHVOYW1lXCIpLmh0bWwoc3R1TmFtZSk7Ly/lvKDkuInvvIjkuIPlubTnuqfvvIlcclxuICAgICAgICAgICAgJCgnLnBvcC1tYXNrJykuc2hvdygpO1xyXG4gICAgICAgICAgICAkKFwiI2NoYW5nZS1wcm91bmNlXCIpLnNob3coKTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvL+S/ruaUueivu+mfs+eahOaPkOS6pFxyXG4gICAgICAgICQoXCJib2R5XCIpLmRlbGVnYXRlKFwiI3VwZGF0ZVJlYWRCdG5cIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdmFyIGpzb25BZGQgPSB7fTtcclxuICAgICAgICAgICAganNvbkFkZC5TdHVJZCA9IHN0dUlkO1xyXG4gICAgICAgICAgICB2YXIgb3JnQ291cnNlID0gJChcIiN1cGRhdGVSZWFkQ291cnNlIC5hY3RpdmVcIilbMF0uaWQ7XHJcbiAgICAgICAgICAgIGpzb25BZGQuQ291cnNlSWQgPSBvcmdDb3Vyc2Uuc3BsaXQoJy0nKVswXTsvL+ivvueoi2lk44CB5bey57uP5LiK6K++5qyhIOOAgeaAu+ivvuasoVxyXG4gICAgICAgICAgICBqc29uQWRkLklzRW5nID0gMDsvL+e+jlxyXG4gICAgICAgICAgICBpZiAoJChcIiN1cGRhdGVSZWFkXCIpLmhhc0NsYXNzKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBqc29uQWRkLklzRW5nID0gMTsvL+iLsVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy/mj5DkuqTooajljZVcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9PcmcvU3R1ZGVudE1hbmFnZS9VcGRhdGVPcmdTdHVDb3Vyc2VSZWFkXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGpzb25BZGQpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5EYXRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHZXRTdHVEZXRhaWxEYXRhKCk7Ly/ph43mlrDliqDovb3liJfooahcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNjaGFuZ2UtcHJvdW5jZVwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5wb3AtbWFzaycpLmhpZGUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCLmj5DkuqTlpLHotKVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgLy/nu63or77nmoTnoa7lrppcclxuICAgICAgICAkKFwiYm9keVwiKS5kZWxlZ2F0ZShcIiNjb3Vyc2VBZGRCdG5cIiwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBqc29uQWRkID0ge307XHJcbiAgICAgICAgICAgIHZhciBvcmdDb3Vyc2UgPSAkKFwiI2Ryb3BfY291cnNlXCIpLmF0dHIoXCJkYXRhLWlkXCIpOy8v6K++56iL5pWw57uEXHJcbiAgICAgICAgICAgIGpzb25BZGQuU3R1SWQgPSBzdHVJZDtcclxuXHJcbiAgICAgICAgICAgIGpzb25BZGQuUmVmZXJlZUlkID0gJChcIiNkcm9wX3RqclwiKS5hdHRyKFwiZGF0YS1pZFwiKTsvL+aOqOiNkOS6ulxyXG4gICAgICAgICAgICBqc29uQWRkLkNvdXJzZUlkID0gb3JnQ291cnNlLnNwbGl0KCctJylbMF07Ly/or77nqItpZOOAgeivvuasoSDjgIHor77nqIvmnInmlYjmnJ8g6K++5Lu3XHJcbiAgICAgICAgICAgIGpzb25BZGQuQm9va051bWJlciA9IG9yZ0NvdXJzZS5zcGxpdCgnLScpWzFdOy8v6K++5qyhXHJcbiAgICAgICAgICAgIGpzb25BZGQuTGVmdE51bWJlciA9IG9yZ0NvdXJzZS5zcGxpdCgnLScpWzFdOy8v6K++5qyhXHJcbiAgICAgICAgICAgIGpzb25BZGQuRXhwaXJlTW9udGggPSBvcmdDb3Vyc2Uuc3BsaXQoJy0nKVsyXTsvL+ivvuasoeacieaViOacn+aciFxyXG4gICAgICAgICAgICBqc29uQWRkLkluUHJpY2UgPSBvcmdDb3Vyc2Uuc3BsaXQoJy0nKVszXTsvL+ivvuasoeacieaViOacn+aciFxyXG4gICAgICAgICAgICBqc29uQWRkLkJvb2tUeXBlID0gb3JnQ291cnNlLnNwbGl0KCctJylbNV07Ly/mlZnmnZDnsbvlnovvvIzlkIzmraUxXHJcbiAgICAgICAgICAgIGpzb25BZGQuU3R1RWRpdGlvbklkID0gc3R1RWRpdGlvbklkOy8v5a2m55Sf5pWZ5p2QXHJcbiAgICAgICAgICAgIGpzb25BZGQuU2Nob29sSWQgPSAkKFwiI2Ryb3BfY2xhc3NcIikuYXR0cihcImRhdGEtaWRcIikuc3BsaXQoJy0nKVswXTtcclxuICAgICAgICAgICAganNvbkFkZC5DbGFzc0lkID0gJChcIiNkcm9wX2NsYXNzXCIpLmF0dHIoXCJkYXRhLWlkXCIpLnNwbGl0KCctJylbMV07XHJcbiAgICAgICAgICAgIGpzb25BZGQuSGlzdG9yeVR5cGUgPSAwOy8v5LuO5pWw5o2u5bqT5p+l77yM5LiN55+l6YGT5piv5ZOq56eN57G75Z6L57ut5oql5bCx5pivMFxyXG4gICAgICAgICAgICBpZiAoJChcIiNlbmdUeXBlXCIpLmhhc0NsYXNzKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBqc29uQWRkLklzRW5nID0gMTsvL+aYr+m7mOiupOeahOiLseivrVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGpzb25BZGQuSXNFbmcgPSAwOy8v5LiN5pivXHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoc3R1SWQubGVuZ3RoIDwgMSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybjsvL+aXoOaViOivt+axglxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvL+aPkOS6pOihqOWNlVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IFwiL09yZy9TdHVkZW50TWFuYWdlL0FkZE9yZ1N0dUNsYXNzXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KGpzb25BZGQpXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5EYXRhID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBHZXRTdHVEZXRhaWxEYXRhKCk7Ly/ph43mlrDliqDovb3liJfooahcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNzaW5nLXVwXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnLnBvcC1tYXNrJykuaGlkZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIuaPkOS6pOWksei0pVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxufTtcclxuXHJcblxyXG4vL+e7keWumuaVsOaNrlxyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgIG1vZHVsZS5pbml0KCk7XHJcblxyXG59KTtcclxuXHJcblxyXG5cclxuLy/lj5HpgIHor7fmsYLosIPlj5bmlbDmja5cclxuZnVuY3Rpb24gR2V0U3R1RGV0YWlsRGF0YSgpIHtcclxuICAgIC8v5Yqg6L295YiX6KGoXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgIHVybDogXCIvT3JnL1N0dWRlbnRNYW5hZ2UvR2V0U3R1RGV0YWlsXCIsXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgZGF0YTogc3R1SWRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICBkZWJ1Z2dlcjtcclxuICAgICAgICAgICAgaWYgKGRhdGEuRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgJChcIiN0YlwiKS5odG1sKHRwbFRhYmxlU3R1RGV0YWlsKGRhdGEuRGF0YSkpO1xyXG4gICAgICAgICAgICAgICAgZ3JhZGUgPSBkYXRhLkRhdGEuR3JhZGVJZDtcclxuICAgICAgICAgICAgICAgIHN0dU5hbWUgPSBkYXRhLkRhdGEuU3R1TmFtZTtcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIGFsZXJ0KFwi6I635Y+W5pWw5o2u5aSx6LSlXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcbi8v5Yqg6L2954+t57qnXHJcbmZ1bmN0aW9uIGxvYWRDbGFzcyhvYmopIHtcclxuXHJcbiAgICB2YXIgYXJyVGVtcCA9IFtdO1xyXG4gICAgLy/liqDovb3nj63nuqfliJfooahcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvU3R1ZGVudE1hbmFnZS9HZXRPcmdDbGFzc0Nvbk51bWJlclwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGRhdGE6IHN0dUlkLy/pnIDopoHov5vooYzov4fmu6RcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLkRhdGEgJiYgZGF0YS5EYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vYXJyQmoucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAvLyAgICBuYW1lOiBcIuWFqOmDqFwiLCBpZDogMCwgcGlkOiAwXHJcbiAgICAgICAgICAgICAgICAvL30pOy8v6K++56iLXHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuRGF0YS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBhcnJUZW1wLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBkYXRhLkRhdGFbaV0uU3RyQ2xhc3NOYW1lLCBpZDogZGF0YS5EYXRhW2ldLlN0clNjaG9vbEFuZENsYXNzSWQsIHBpZDogZGF0YS5EYXRhW2ldLkNsYXNzSWRcclxuICAgICAgICAgICAgICAgICAgICB9KTsvL+ivvueoi1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChvYmogPT0gMikgey8v6LCD54+t55qEXHJcbiAgICAgICAgICAgICAgICAgICAgbHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9jY1wiLCB3aWR0aDogMTYwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogYXJyVGVtcCwgc3VidGV4dGxlbmd0aDogMTUgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9hZENvdXJzZVJhZCgpOy8v5Yqg6L295a2m55Sf5bey5oql55qE6K++56iLXHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2NsYXNzXCIsIHdpZHRoOiAxNjAsIHN1YnRleHRsZW5ndGg6IDE1LCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogYXJyVGVtcCB9KTsvL+aKpeivvueahOePree6p1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRDb3Vyc2UoMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFsZXJ0KFwi6I635Y+W5pWw5o2u5aSx6LSlXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuLy/lj6rmmK/liqDovb3liJfooajmlbDmja5cclxuZnVuY3Rpb24gR2V0U3R1RGF0YU5vdExvYWRTZWxlY3QoKSB7XHJcbiAgICByZXR1cm4gR2V0U3R1RGV0YWlsRGF0YSgtMSk7XHJcblxyXG59XHJcblxyXG4vL+WKoOi9veivvueoi1xyXG5mdW5jdGlvbiBsb2FkQ291cnNlKCkge1xyXG4gICAgdmFyIGFyclRlbXAgPSBbXTsvL+WIm+W7uuS4gOS4quS4tOaXtuaVsOe7hFxyXG4gICAgLy/liqDovb3liJfooahcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvU3R1ZGVudE1hbmFnZS9HZXRPcmdDb3Vyc2VcIixcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBkYXRhOiBzdHVJZC8v6ZyA6KaB6L+b6KGM6L+H5rukXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuRGF0YSAmJiBkYXRhLkRhdGEubGVuZ3RoID4gMCkge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICBhcnJUYmsucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCLlhajpg6hcIiwgaWQ6IDAsIHBpZDogMFxyXG4gICAgICAgICAgICAgICAgfSk7Ly/or77nqItcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5EYXRhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFyclRlbXAucHVzaCh7IG5hbWU6IGRhdGEuRGF0YVtpXS5Db3Vyc2VOYW1lLCBpZDogZGF0YS5EYXRhW2ldLkNvdXJzZUlkICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uQm9va051bWJlciArIFwiLVwiICsgZGF0YS5EYXRhW2ldLkV4cGlyeU1vbnRoICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uT3V0UHJpY2UgKyBcIi1cIiArIGRhdGEuRGF0YVtpXS5JblByaWNlICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uQm9va1R5cGUsIHBpZDogZGF0YS5EYXRhW2ldLkNvdXJzZUlkIH0pOy8v5oql54+t55qE6K++56iLXHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgbHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9jb3Vyc2VcIiwgd2lkdGg6IDE0MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IGFyclRlbXAsIHNlbGVjdGVkQ2FsbEJhY2s6IGxvYWRDb3Vyc2VEYXRhLCBzdWJ0ZXh0bGVuZ3RoOjE1IH0pOy8v5ZCM5q2l6K++56iL77yM6ZyA6KaB6L+b6KGM6IGU5YqoXHJcblxyXG4gICAgICAgICAgICAgICAgJChcIiNsZXNzb25OdW1iZXJcIikuaHRtbChhcnJUZW1wWzBdLmlkLnNwbGl0KCctJylbMV0pO1xyXG4gICAgICAgICAgICAgICAgJChcIiNsZXNzb25UaW1lXCIpLmh0bWwoYXJyVGVtcFswXS5pZC5zcGxpdCgnLScpWzJdICsgXCLmnIhcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2xlc3NvblByaWNlXCIpLmh0bWwoYXJyVGVtcFswXS5pZC5zcGxpdCgnLScpWzNdICsgXCLlhYNcIik7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2FjdHVQcmljZVwiKS5odG1sKGFyclRlbXBbMF0uaWQuc3BsaXQoJy0nKVs0XSArIFwi5YWDXCIpO1xyXG4gICAgICAgICAgICAgICAgbG9hZFRlYWNoZXJzKCk7Ly/liqDovb3mjqjojZDkurpcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9hbGVydChcIuiOt+WPluaVsOaNruWksei0pVwiKTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbn1cclxuXHJcblxyXG4vL+WKoOi9veivvueoi1JkaW9cclxuZnVuY3Rpb24gbG9hZENvdXJzZVJhZChvYmopIHsvL+W9k+S4ujLnmoTml7blgJnkuLrkv67mlLnor7vpn7PnmoTmuLLmn5NcclxuICAgIHZhciBzdHJIdG1sID0gXCJcIjsvL+WIm+W7uuS4gOS4quWtl+espuS4sui/m+ihjOaLvOaOpVxyXG4gICAgLy/liqDovb3liJfooahcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvU3R1ZGVudE1hbmFnZS9HZXRPcmdTdHVDb3Vyc2VcIixcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBkYXRhOiBzdHVJZC8v6ZyA6KaB6L+b6KGM6L+H5rukXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuRGF0YSAmJiBkYXRhLkRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLkRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJIdG1sICs9ICc8bGFiZWwgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6MzBweDtcIiBjbGFzcz1cImxiQ291cnNlXCIgZGF0YS10eXBlPVwiMFwiIGRhdGEtaWQ9JyArIGRhdGEuRGF0YVtpXS5Db3Vyc2VJZCArIFwiLVwiICsgZGF0YS5EYXRhW2ldLkNsYXNzSWQgKyBcIi1cIiArIGRhdGEuRGF0YVtpXS5DbGFzc05hbWUgKyBcIi1cIiArIGRhdGEuRGF0YVtpXS5Jc0VuZyArICc+PHNwYW4gZGF0YS10eXBlPVwiMFwiIGNsYXNzPVwicmFkaW8gYWN0aXZlXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6MTVweDtcIiBpZD0nICsgZGF0YS5EYXRhW2ldLkNvdXJzZUlkICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uQ2xhc3NJZCArIFwiLVwiICsgZGF0YS5EYXRhW2ldLkNsYXNzTmFtZSArIFwiLVwiICsgZGF0YS5EYXRhW2ldLklzRW5nICsgJz48L3NwYW4+PHNwYW4gY2xhc3M9XCJsZWZ0MTVcIj4nICsgZGF0YS5EYXRhW2ldLkNvdXJzZU5hbWUgKyAnPC9zcGFuPjwvbGFiZWw+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNjdXJyZW50Q2xhc3NcIikuaHRtbChkYXRhLkRhdGFbaV0uQ2xhc3NOYW1lKTsvL+ebruWJjeePree6p1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2N1cnJlbnRDbGFzc1wiKS5hdHRyKFwiZGF0YS1pZFwiLCBkYXRhLkRhdGFbaV0uQ2xhc3NJZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ckh0bWwgKz0gJzxsYWJlbCBzdHlsZT1cIm1hcmdpbi1yaWdodDozMHB4O1wiIGNsYXNzPVwibGJDb3Vyc2VcIiBkYXRhLXR5cGU9XCIwXCIgZGF0YS1pZD0nICsgZGF0YS5EYXRhW2ldLkNvdXJzZUlkICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uQ2xhc3NJZCArIFwiLVwiICsgZGF0YS5EYXRhW2ldLkNsYXNzTmFtZSArIFwiLVwiICsgZGF0YS5EYXRhW2ldLklzRW5nICsgJz48c3BhbiBkYXRhLXR5cGU9XCIwXCIgIGNsYXNzPVwicmFkaW8gXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6MTVweDtcIiBpZD0nICsgZGF0YS5EYXRhW2ldLkNvdXJzZUlkICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uQ2xhc3NJZCArIFwiLVwiICsgZGF0YS5EYXRhW2ldLkNsYXNzTmFtZSArIFwiLVwiICsgZGF0YS5EYXRhW2ldLklzRW5nICsgJz48L3NwYW4+PHNwYW4gY2xhc3M9XCJsZWZ0MTVcIj4nICsgZGF0YS5EYXRhW2ldLkNvdXJzZU5hbWUgKyAnPC9zcGFuPjwvbGFiZWw+JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKG9iaiA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiN1cGRhdGVSZWFkQ291cnNlXCIpLmh0bWwoc3RySHRtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy91cGRhdGVSZWFkXHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLnNwYW5zICcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS5EYXRhWzBdLklzRW5nID09dHJ1ZSkgey8v6Iux5byP6YCJ5Lit77yM576O5byP56e76ZmkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjdXBkYXRlUmVhZFwiKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjdXBkYXRlUmVhZDJcIikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc3R1Q291cnNlXCIpLmh0bWwoc3RySHRtbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgIFxyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCLojrflj5bmlbDmja7lpLHotKVcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuLy/liqDovb3or77nqItSZGlv77yI5Yqg6K++5qyh77yJXHJcbmZ1bmN0aW9uIGxvYWRDb3Vyc2VSYWQyKCkge1xyXG4gICAgdmFyIHN0ckh0bWwgPSBcIlwiOy8v5Yib5bu65LiA5Liq5a2X56ym5Liy6L+b6KGM5ou85o6lXHJcbiAgICAvL+WKoOi9veWIl+ihqFxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICB1cmw6IFwiL09yZy9TdHVkZW50TWFuYWdlL0dldE9yZ1N0dUNvdXJzZVwiLFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIGRhdGE6IHN0dUlkLy/pnIDopoHov5vooYzov4fmu6RcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGF0YS5EYXRhICYmIGRhdGEuRGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEuRGF0YS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0ckh0bWwgKz0gJzxsYWJlbCBzdHlsZT1cIm1hcmdpbi1yaWdodDozMHB4O1wiIGNsYXNzPVwibGJDb3Vyc2VcIiBkYXRhLXR5cGU9XCIxXCIgZGF0YS1pZD0nICsgZGF0YS5EYXRhW2ldLkNvdXJzZUlkICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uSGF2ZU51bWJlciArIFwiLVwiICsgZGF0YS5EYXRhW2ldLkJvb2tOdW1iZXIgKyAnPjxzcGFuIGRhdGEtdHlwZT1cIjFcIiAgY2xhc3M9XCJyYWRpbyBhY3RpdmVcIiBzdHlsZT1cIm1hcmdpbi1yaWdodDoxNXB4O1wiIGlkPScgKyBkYXRhLkRhdGFbaV0uQ291cnNlSWQgKyBcIi1cIiArIGRhdGEuRGF0YVtpXS5IYXZlTnVtYmVyICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uQm9va051bWJlciArICc+PC9zcGFuPjxzcGFuIGNsYXNzPVwibGVmdDE1XCI+JyArIGRhdGEuRGF0YVtpXS5Db3Vyc2VOYW1lICsgJzwvc3Bhbj48L2xhYmVsPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjY3VycmVudENvdXJzZU51bWJlclwiKS5odG1sKGRhdGEuRGF0YVtpXS5IYXZlTnVtYmVyICsgXCIvXCIgKyBkYXRhLkRhdGFbaV0uQm9va051bWJlciArIFwi6K++5qyhXCIpOy8v55uu5YmN54+t57qnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjY3VycmVudENvdXJzZU51bWJlclwiKS5hdHRyKFwiZGF0YS1pZFwiLCBkYXRhLkRhdGFbaV0uSGF2ZU51bWJlciArIFwiLVwiICsgZGF0YS5EYXRhW2ldLkNvdXJzZUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RySHRtbCArPSAnPGxhYmVsIHN0eWxlPVwibWFyZ2luLXJpZ2h0OjMwcHg7XCIgY2xhc3M9XCJsYkNvdXJzZVwiIGRhdGEtdHlwZT1cIjFcIiBkYXRhLWlkPScgKyBkYXRhLkRhdGFbaV0uQ291cnNlSWQgKyBcIi1cIiArIGRhdGEuRGF0YVtpXS5IYXZlTnVtYmVyICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uQm9va051bWJlciArICc+PHNwYW4gZGF0YS10eXBlPVwiMVwiICBjbGFzcz1cInJhZGlvIFwiIHN0eWxlPVwibWFyZ2luLXJpZ2h0OjE1cHg7XCIgaWQ9JyArIGRhdGEuRGF0YVtpXS5Db3Vyc2VJZCArIFwiLVwiICsgZGF0YS5EYXRhW2ldLkhhdmVOdW1iZXIgKyBcIi1cIiArIGRhdGEuRGF0YVtpXS5Cb29rTnVtYmVyICsgJz48L3NwYW4+PHNwYW4gY2xhc3M9XCJsZWZ0MTVcIj4nICsgZGF0YS5EYXRhW2ldLkNvdXJzZU5hbWUgKyAnPC9zcGFuPjwvbGFiZWw+JztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICQoXCIjc3R1Q291cnNlQWRkQ1wiKS5odG1sKHN0ckh0bWwpO1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCLojrflj5bmlbDmja7lpLHotKVcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8v5Yqg6L296K++56iL6YCA6K++XHJcbmZ1bmN0aW9uIGxvYWRDb3Vyc2VCYWNrKCkge1xyXG4gICAgdmFyIGFyclRlbXAgPSBbXTsvL+WIm+W7uuS4gOS4quS4tOaXtuaVsOe7hFxyXG4gICAgLy/liqDovb3liJfooahcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvU3R1ZGVudE1hbmFnZS9HZXRPcmdTdHVDb3Vyc2VcIixcclxuICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICBkYXRhOiBzdHVJZC8v6ZyA6KaB6L+b6KGM6L+H5rukXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGRhdGEuRGF0YSAmJiBkYXRhLkRhdGEubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5EYXRhLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGFyclRlbXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IGRhdGEuRGF0YVtpXS5Db3Vyc2VOYW1lLCBpZDogZGF0YS5EYXRhW2ldLkNvdXJzZUlkICsgXCItXCIgKyBkYXRhLkRhdGFbaV0uSGF2ZU51bWJlciArIFwiLVwiICsgZGF0YS5EYXRhW2ldLkJvb2tOdW1iZXIgKyBcIi1cIiArIGRhdGEuRGF0YVtpXS5FeHBpcnlNb250aCwgcGlkOiBkYXRhLkRhdGFbaV0uQ291cnNlSWRcclxuICAgICAgICAgICAgICAgICAgICB9KTsvL+aKpeePreeahOivvueoi1xyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGx1aS5pbml0RHJvcERvd25MaXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB3YXJwaWQ6IFwiZHJvcF9iYWNrQ1wiLCB3aWR0aDogMTQwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogYXJyVGVtcCwgc2VsZWN0ZWRDYWxsQmFjazogbG9hZENvdXJzZURhdGFCYWNrLHN1YnRleHRsZW5ndGg6IDE1XHJcbiAgICAgICAgICAgICAgICB9KTsvL+WQjOatpeivvueoi++8jOmcgOimgei/m+ihjOiBlOWKqFxyXG5cclxuICAgICAgICAgICAgICAgICQoXCIjYmFja0NvdXJzZVwiKS5odG1sKGFyclRlbXBbMF0uaWQuc3BsaXQoJy0nKVsxXSArIFwiL1wiICsgYXJyVGVtcFswXS5pZC5zcGxpdCgnLScpWzJdICsgXCLor77mrKFcIik7Ly/mmL7npLrnmoTor77nqIvov5vluqZcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCLojrflj5bmlbDmja7lpLHotKVcIik7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbi8v5Yqg6L295o6o6I2Q5Lq6XHJcbmZ1bmN0aW9uIGxvYWRUZWFjaGVycygpIHtcclxuXHJcbiAgICAvL+WKoOi9veePree6p+WIl+ihqFxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICB1cmw6IFwiL09yZy9TdHVkZW50TWFuYWdlL0dldE9yZ1RlYWNoZXJzXCIsXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgZGF0YTogXCJcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuRGF0YSAmJiBkYXRhLkRhdGEubGVuZ3RoID4gMCkge1xyXG5cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLkRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYXJyVGpyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBkYXRhLkRhdGFbaV0uVGVhY2hOYW1lLCBpZDogZGF0YS5EYXRhW2ldLlRlYWNoSWQsIHBpZDogMVxyXG4gICAgICAgICAgICAgICAgICAgIH0pOy8v5o6o6I2Q5Lq6XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICAgICAgICAgIGx1aS5pbml0RHJvcERvd25MaXN0KHtcclxuICAgICAgICAgICAgICAgICAgICB3YXJwaWQ6IFwiZHJvcF90anJcIiwgd2lkdGg6IDE0MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IGFyclRqclxyXG4gICAgICAgICAgICAgICAgfSk7Ly/mjqjojZDkurpcclxuXHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGFsZXJ0KFwi6I635Y+W5pWw5o2u5aSx6LSlXCIpO1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufVxyXG5cclxuXHJcbi8v6L+b6KGM6IGU5Yqo6K++56iL55qE6YCJ5oupXHJcbmZ1bmN0aW9uIGxvYWRDb3Vyc2VEYXRhKCkge1xyXG4gICAgdmFyIGpzRGF0YSA9ICQoXCIjZHJvcF9jb3Vyc2VcIikuYXR0cihcImRhdGEtaWRcIik7Ly/nu4TlkIjnmoTmlbDmja7ov5vooYzogZTliqhcclxuXHJcbiAgICBpZiAoanNEYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKFwiI2xlc3Nvbk51bWJlclwiKS5odG1sKGpzRGF0YS5zcGxpdCgnLScpWzFdKTtcclxuICAgICAgICAkKFwiI2xlc3NvblRpbWVcIikuaHRtbChqc0RhdGEuc3BsaXQoJy0nKVsyXSArIFwi5pyIXCIpO1xyXG4gICAgICAgICQoXCIjbGVzc29uUHJpY2VcIikuaHRtbChqc0RhdGEuc3BsaXQoJy0nKVszXSArIFwi5YWDXCIpO1xyXG4gICAgICAgICQoXCIjYWN0dVByaWNlXCIpLmh0bWwoanNEYXRhLnNwbGl0KCctJylbNF0gKyBcIuWFg1wiKTtcclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn1cclxuXHJcblxyXG4vL+i/m+ihjOiBlOWKqOivvueoi+eahOmAieaLqSjpgIDor74pXHJcbmZ1bmN0aW9uIGxvYWRDb3Vyc2VEYXRhQmFjaygpIHtcclxuICAgIHZhciBqc0RhdGEgPSAkKFwiI2Ryb3BfYmFja0NcIikuYXR0cihcImRhdGEtaWRcIik7Ly/nu4TlkIjnmoTmlbDmja7ov5vooYzogZTliqhcclxuXHJcbiAgICBpZiAoanNEYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKFwiI2JhY2tDb3Vyc2VcIikuaHRtbChqc0RhdGEuc3BsaXQoJy0nKVsxXSArIFwiL1wiICsganNEYXRhLnNwbGl0KCctJylbMl0gKyBcIuivvuasoVwiKTsvL+aYvuekuueahOivvueoi+i/m+W6plxyXG4gICAgfVxyXG5cclxuXHJcblxyXG5cclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbi8v5Yid5aeL5YyW5LiL5ouJ5qGGXHJcbnZhciBMdWkgPSByZXF1aXJlKCcuLi8uLi9MVUkvanMvbHVpJyk7XHJcbnZhciB0b29sID0gcmVxdWlyZSgnLi4vLi4vTFVJL3Rvb2wnKTtcclxudmFyIGx1aSA9IG5ldyBMdWkoKTtcclxuLy/liJvlu7rkuIvnuqflvLnlh7rlsYLkuovku7ZcclxuLyp0b29sLnBvcGhpZGUoJCgnLmVnLXBvcCAuY2xvc2UsLmVnLXBvcCAuc3VyZScpLCQoJy5lZy1wb3AnKSk7XHJcbnRvb2wucG9wc2hvdygkKCcuY3JlYXRTdHVkZW50JyksJCgnI2NyZWF0U3R1ZGVudCcpKTtcclxuLy/or77nqIvlvIDpgJpcclxudG9vbC5wb3BzaG93KCQoJy5jb250aW51ZScpLCQoJyNjb250aW51ZScpKTtcclxudG9vbC5TaWJzKCQoJy5zcGFucycpKTsqL1xyXG4vL+m8oOagh+enu+WKqOWAkuivvueoi+euoeeQhueahOS6i+S7tlxyXG4kKCcubWFuYWdlYnRuJykub24oJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcubWFuYWdlYnRuJykuY3NzKHtcclxuICAgICAgICAncGFkZGluZy1ib3R0b20nOiAnMTBweCdcclxuICAgIH0pO1xyXG4gICAgJCgnLmRyb3AnKS5zaG93KCk7XHJcbn0pXHJcbiQoJy5tYW5hZ2UnKS5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5tYW5hZ2VidG4nKS5jc3Moe1xyXG4gICAgICAgICdwYWRkaW5nLWJvdHRvbSc6ICcwcHgnXHJcbiAgICB9KTtcclxuICAgICQoJy5kcm9wJykuaGlkZSgpO1xyXG59KVxyXG4kKCcuZHJvcCBsaScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgJCgnLmRyb3AnKS5oaWRlKCk7XHJcbn0pO1xyXG4vL+aAp+WIq+aMiemSrlxyXG50b29sLnJhZGlvKCk7XHJcbi8v6YCJ5oup6K+76Z+zXHJcbnRvb2wuU2licygkKCcuc3BhbnMnKSk7XHJcblxyXG4vL+WIm+W7uuS4i+e6p+W8ueWHuuWxguS6i+S7tlxyXG50b29sLnBvcGhpZGUoJCgnLmVnLXBvcCAuY2xvc2UnKSwgJCgnLmVnLXBvcCcpKTtcclxuLy/nvJbovpHlrabnlJ/nmoTlvLnnqpdcclxuLyp0b29sLnBvcHNob3coJCgnLmVkaXRNZXNnJyksJCgnI2VkaXRNZXNnJykpOyovXHJcbi8q6K++56iL57ut5L+d5o6o6I2Q5Lq655qE5LiL5ouJKi9cclxuLy9sdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2RlbTFcIiwgd2lkdGg6IDE0MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICcwMScsIGlkOiAnMDAnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJzAyJywgaWQ6ICcwMF8wMScsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICcwMycsIGlkOiAnMDBfMDInLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDQnLCBpZDogJzAwXzAxXzAxJywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJzA1JywgaWQ6ICcwMF8wMV8wMicsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNicsIGlkOiAnMDBfMDJfMDEnLCBwaWQ6ICcwMF8wMicgfSwgeyBuYW1lOiAnMDcnLCBpZDogJzAwXzAyXzAyJywgcGlkOiAnMDBfMDInIH1dIH0pO1xyXG4vKuivvueoi+e7reS/neivvueoi+eahOS4i+aLiSovXHJcbi8vbHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9kZW0yXCIsIHdpZHRoOiAxNDAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAnMDEnLCBpZDogJzAwJywgcGlkOiAnJyB9LCB7IG5hbWU6ICcwMicsIGlkOiAnMDBfMDEnLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDMnLCBpZDogJzAwXzAyJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJzA0JywgaWQ6ICcwMF8wMV8wMScsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNScsIGlkOiAnMDBfMDFfMDInLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAnMDYnLCBpZDogJzAwXzAyXzAxJywgcGlkOiAnMDBfMDInIH0sIHsgbmFtZTogJzA3JywgaWQ6ICcwMF8wMl8wMicsIHBpZDogJzAwXzAyJyB9XSB9KTtcclxuLyror77nqIvnu63kv53nj63nuqfnmoTkuIvmi4kqL1xyXG4vL2x1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfZGVtM1wiLCB3aWR0aDogMTQwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogW3sgbmFtZTogJzAxJywgaWQ6ICcwMCcsIHBpZDogJycgfSwgeyBuYW1lOiAnMDInLCBpZDogJzAwXzAxJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJzAzJywgaWQ6ICcwMF8wMicsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICcwNCcsIGlkOiAnMDBfMDFfMDEnLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAnMDUnLCBpZDogJzAwXzAxXzAyJywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJzA2JywgaWQ6ICcwMF8wMl8wMScsIHBpZDogJzAwXzAyJyB9LCB7IG5hbWU6ICcwNycsIGlkOiAnMDBfMDJfMDInLCBwaWQ6ICcwMF8wMicgfV0gfSk7XHJcblxyXG4vL+WKnueQhumAgOivvuivvueoi+eahOS4i+aLiVxyXG4vL2x1aS5pbml0RHJvcERvd25MaXN0KHtcclxuLy8gICAgd2FycGlkOiBcImRyb3BfYmFja0NcIiwgd2lkdGg6IDE0MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7XHJcbi8vICAgICAgICBuYW1lOiAnMDEnLCBpZDogJzAwJywgcGlkOiAnJ1xyXG4vLyAgICB9LCB7XHJcbi8vICAgICAgICBuYW1lOiAnMDInLCBpZDogJzAwXzAxJywgcGlkOiAnMDAnXHJcbi8vICAgIH0sIHtcclxuLy8gICAgICAgIG5hbWU6ICcwMycsIGlkOiAnMDBfMDInLCBwaWQ6ICcwMCdcclxuLy8gICAgfSwge1xyXG4vLyAgICAgICAgbmFtZTogJzA0JywgaWQ6ICcwMF8wMV8wMScsIHBpZDogJzAwXzAxJ1xyXG4vLyAgICB9LCB7XHJcbi8vICAgICAgICBuYW1lOiAnMDUnLCBpZDogJzAwXzAxXzAyJywgcGlkOiAnMDBfMDEnXHJcbi8vICAgIH0sIHtcclxuLy8gICAgICAgIG5hbWU6ICcwNicsIGlkOiAnMDBfMDJfMDEnLCBwaWQ6ICcwMF8wMidcclxuLy8gICAgfSwge1xyXG4vLyAgICAgICAgbmFtZTogJzA3JywgaWQ6ICcwMF8wMl8wMicsIHBpZDogJzAwXzAyJ1xyXG4vLyAgICB9XVxyXG4vL30pO1xyXG4vL+iwg+ePreePree6p+eahOS4i+aLiVxyXG4vL2x1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfY2NcIiwgd2lkdGg6IDEwMCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICcwMScsIGlkOiAnMDAnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJzAyJywgaWQ6ICcwMF8wMScsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICcwMycsIGlkOiAnMDBfMDInLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDQnLCBpZDogJzAwXzAxXzAxJywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJzA1JywgaWQ6ICcwMF8wMV8wMicsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNicsIGlkOiAnMDBfMDJfMDEnLCBwaWQ6ICcwMF8wMicgfSwgeyBuYW1lOiAnMDcnLCBpZDogJzAwXzAyXzAyJywgcGlkOiAnMDBfMDInIH1dIH0pO1xyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvYmFja1N0YWdlL3N0dWRlbnQtZGV0YWlsLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMjciLCJ2YXIgTHVpRHJvcERvd25MaXN0ID0gcmVxdWlyZSgnLi4vanMvZHJvcGRvd25saXN0Jyk7XHJcbnZhciBMdWlDaGVja0JveCA9IHJlcXVpcmUoJy4uL2pzL2NoZWNrYm94Jyk7XHJcblxyXG5mdW5jdGlvbiBMdWkoKSB7XHJcbiAgICAvL3RoaXMuY2hlY2tCb3ggPSBudWxsO1xyXG4gICAgLy8gdGhpcy5pbml0V29yZFNwZWFrKCk7XHJcbn07XHJcblxyXG5MdWkucHJvdG90eXBlID0ge1xyXG4gICAgY29uc3RydWN0b3I6IEx1aSxcclxuICAgIGluaXRUcmVlOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIHZhciB0ID0gbmV3IEx1aVRyZWUoKTtcclxuICAgICAgICByZXR1cm4gdC5pbml0KHApO1xyXG4gICAgfSxcclxuICAgIGluaXREcm9wRG93bkxpc3Q6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgdmFyIGQgPSBuZXcgTHVpRHJvcERvd25MaXN0KCk7XHJcbiAgICAgICAgcmV0dXJuIGQuaW5pdChwKTtcclxuICAgIH0sXHJcbiAgICBpbml0Q2hlY2tCb3g6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgLy/vv73vv73vv73vv73Su++/ve+/ve+/ve+/ve+/ve+/ve+/ve+/vcir77+91rXvv71jaGVja2JveO+/ve+/ve+/ve+/vVxyXG4gICAgICAgIGlmICghdGhpcy5jaGVja0JveCkge1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQm94ID0gbmV3IEx1aUNoZWNrQm94KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjID0gbmV3IEx1aUNoZWNrQm94KCk7XHJcbiAgICAgICAgcmV0dXJuIGMuaW5pdChwKTtcclxuXHJcbiAgICB9LFxyXG4gICAgaW5pdFdvcmRTcGVhazogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAvL++/ve+/ve+/ve+/vdK777+977+977+977+977+977+977+977+9yKvvv73Wte+/vXdvcmRzcGVha++/ve+/ve+/ve+/vVxyXG4gICAgICAgIGlmICghdGhpcy53b3Jkc3BlYWspIHtcclxuICAgICAgICAgICAgdGhpcy53b3Jkc3BlYWsgPSBuZXcgTHVpV29yZFNwZWFrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjID0gbmV3IEx1aVdvcmRTcGVhaygpO1xyXG4gICAgICAgIHJldHVybiBjLmluaXQocCk7XHJcbiAgICB9XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEx1aTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2x1aS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiA0IDcgOCAxMCAxMiAxMyAxOSAyMCAyMSAyNiAyNyAyOCA0MyIsImZ1bmN0aW9uIEx1aURyb3BEb3duTGlzdCgpIHtcclxuICAgIHRoaXMucGFyYW0gPSBudWxsO1xyXG4gICAgdGhpcy5zZWxlY3RvciA9IFwiXCI7XHJcbn1cclxudmFyIGRyb3Bjb3VudCA9IDEwMDA7XHJcbkx1aURyb3BEb3duTGlzdC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogTHVpRHJvcERvd25MaXN0LFxyXG4gICAgaW5pdDogZnVuY3Rpb24gKHBhcmFtKSB7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RvciA9IHRoaXMud2FycGlkID0gXCIjXCIgKyBwYXJhbS53YXJwaWQ7XHJcbiAgICAgICAgdmFyIHdhcnBpZCA9IHBhcmFtLndhcnBpZDtcclxuICAgICAgICBpZiAoIXBhcmFtLmRhdGEpIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgdmFyIGRhdGEgPSBwYXJhbS5kYXRhO1xyXG5cclxuICAgICAgICB2YXIgd2lkdGggPSBwYXJhbS53aWR0aCA9IHBhcmFtLndpZHRoIHx8IDE4MDtcclxuICAgICAgICB2YXIgaGVpZ2h0ID0gcGFyYW0uaGVpZ2h0ID0gcGFyYW0uaGVpZ2h0IHx8IDIwMDtcclxuICAgICAgICB2YXIgc3VidGV4dGxlbmd0aCA9IHBhcmFtLnN1YnRleHRsZW5ndGggPSBwYXJhbS5zdWJ0ZXh0bGVuZ3RoIHx8IDU7XHJcbiAgICAgICAgcGFyYW0udmFsdWVGaWVsZCA9IHBhcmFtLnZhbHVlRmllbGQgfHwgXCJpZFwiO1xyXG4gICAgICAgIHBhcmFtLnRleHRGaWVsZCA9IHBhcmFtLnRleHRGaWVsZCB8fCBcIm5hbWVcIjtcclxuICAgICAgICB2YXIgdmFsdWVGaWVsZCA9IHBhcmFtLnZhbHVlRmllbGQ7XHJcbiAgICAgICAgdmFyIHRleHRGaWVsZCA9IHBhcmFtLnRleHRGaWVsZDtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRDYWxsQmFjayA9IHBhcmFtLnNlbGVjdGVkQ2FsbEJhY2s7XHJcbiAgICAgICAgdmFyIGxvYWRlZENhbGxCYWNrID0gcGFyYW0ubG9hZGVkQ2FsbEJhY2s7XHJcbiAgICAgICAgdmFyIHppbmRleCA9IHBhcmFtLnppbmRleDtcclxuICAgICAgICBpZiAocGFyYW0uZGF0YS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgdmFyIGQgPSB7fTtcclxuICAgICAgICAgICAgZFt2YWx1ZUZpZWxkXSA9IC0xO1xyXG4gICAgICAgICAgICBkW3RleHRGaWVsZF0gPSBcIlwiO1xyXG4gICAgICAgICAgICBkYXRhLnB1c2goZCk7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+iuvue9rum7mOiupOWAvFxyXG4gICAgICAgIHZhciBkZWZhdWx0VmFsdWUgPSBwYXJhbS5kZWZhdWx0VmFsdWUgPSBwYXJhbS5kZWZhdWx0VmFsdWUgfHwgZGF0YVswXVt2YWx1ZUZpZWxkXTtcclxuICAgICAgICB2YXIgZGVmYXVsdFRleHQgPSBwYXJhbS5kZWZhdWx0VGV4dCA9IHBhcmFtLmRlZmF1bHRWYWx1ZSB8fCBkYXRhWzBdW3RleHRGaWVsZF07XHJcbiAgICAgICAgdGhpcy5wYXJhbSA9IHBhcmFtO1xyXG4gICAgICAgIHZhciB1bEh0bWwgPSBcIjxkaXYgY2xhc3M9J2Ryb3BkaXYgZG4nPlwiO1xyXG4gICAgICAgIHVsSHRtbCArPSAnICA8dWwgY2xhc3M9XCJkcm9wdWxcIiBzdHlsZT1cIm1heC1oZWlnaHQ6JyArIGhlaWdodCArICdweDtvdmVyZmxvdzphdXRvO1wiIGRhdGEtaWQ9XCInICsgZGVmYXVsdFZhbHVlICsgJ1wiIGRhdGEtbmFtZT1cIicgKyBkZWZhdWx0VGV4dCArICdcIj4nO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IGRhdGEubGVuZ3RoOyBrKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhW2tdO1xyXG4gICAgICAgICAgICB2YXIgdiA9IGl0ZW1bdGV4dEZpZWxkXS5sZW5ndGggPiBzdWJ0ZXh0bGVuZ3RoID8gaXRlbVt0ZXh0RmllbGRdLnN1YnN0cmluZygwLCBzdWJ0ZXh0bGVuZ3RoKSArIFwiLi4uXCIgOiBpdGVtW3RleHRGaWVsZF07XHJcbiAgICAgICAgICAgIHZhciBpdGVtSHRtbCA9ICc8bGkgdGl0bGU9JyArIGl0ZW1bdGV4dEZpZWxkXSArICcgZGF0YS1pbmRleD0nICsgayArICcgZGF0YS1pZD0nICsgaXRlbVt2YWx1ZUZpZWxkXSArICcgZGF0YS10YWc9XFwnJyArIEpTT04uc3RyaW5naWZ5KGRhdGFba10pICsgJ1xcJz4nICsgdiArICc8L2xpPic7XHJcbiAgICAgICAgICAgIHVsSHRtbCArPSBpdGVtSHRtbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdWxIdG1sICs9IFwiPC91bD5cIjtcclxuICAgICAgICB1bEh0bWwgKz0gXCI8L2Rpdj5cIjtcclxuICAgICAgICB2YXIgc3Bhbkh0bWwgPSAnIDxzcGFuIHN0eWxlPVwid2lkdGg6ICcgKyB3aWR0aCArICdweDtcIiBjbGFzcz1cImRpYlwiPjxzcGFuIGRhdGEtdHlwZT1cImRyb3Bkb3dubGlzdF9kcm9wX3NwYW5cIiBpZD1cInNwYW4nICsgcGFyYW0ud2FycGlkICsgJ1wiPicgKyBkZWZhdWx0VGV4dCArICc8L3NwYW4+IDxpIGNsYXNzPVwibnVtX2Rvd25cIj48L2k+PC9zcGFuPic7XHJcblxyXG4gICAgICAgIHZhciBjb24gPSAkKFwiI1wiICsgd2FycGlkKTtcclxuICAgICAgICBjb24uY3NzKHsgd2lkdGg6IHdpZHRoIH0pO1xyXG4gICAgICAgIGNvbi5hZGRDbGFzcyhcImx1aV9kcm9wZG93bmxpc3RcIik7XHJcbiAgICAgICAgY29uLmh0bWwoc3Bhbkh0bWwpO1xyXG4gICAgICAgIGNvbi5hcHBlbmQodWxIdG1sKTtcclxuICAgICAgICBpZiAoemluZGV4KSB7XHJcbiAgICAgICAgICAgIGNvbi5maW5kKFwiLmRyb3BkaXZcIikuY3NzKFwiei1pbmRleFwiLCB6aW5kZXgpO1xyXG4gICAgICAgICAgICBjb24uYXR0cihcInppbmRleFwiLCB6aW5kZXgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGNvbi5maW5kKFwiLmRyb3BkaXZcIikuY3NzKFwiei1pbmRleFwiLCBkcm9wY291bnQtLSk7XHJcbiAgICAgICAgICAgIC8vIGNvbi5hdHRyKFwiemluZGV4XCIsIGRyb3Bjb3VudCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb24uYWRkQ2xhc3MoXCJidG5fbnVtX3VwZG93blwiKS5hZGRDbGFzcyhcImJ0bl9udW1fdXBkb3duMVwiKS5hZGRDbGFzcyhcImRpYlwiKTtcclxuICAgICAgICBjb24uYXR0cihcInRpdGxlXCIsIGRlZmF1bHRUZXh0KTtcclxuICAgICAgICBjb24uYXR0cihcImRhdGEtaWRcIiwgZGVmYXVsdFZhbHVlKTtcclxuXHJcbiAgICAgICAgdmFyIHVsID0gJChcIiNcIiArIHdhcnBpZCArIFwiIHVsXCIpO1xyXG4gICAgICAgIHZhciBkcm9wZGl2ID0gJChcIiNcIiArIHdhcnBpZCArIFwiIC5kcm9wZGl2XCIpO1xyXG4gICAgICAgIHZhciBsaSA9ICQoXCIjXCIgKyB3YXJwaWQgKyBcIiB1bCBsaVwiKTtcclxuICAgICAgICB2YXIgc3BhbiA9IGNvbi5maW5kKFwic3BhbltkYXRhLXR5cGU9J2Ryb3Bkb3dubGlzdF9kcm9wX3NwYW4nXVwiKTtcclxuICAgICAgICAvL+S6i+S7tlxyXG4gICAgICAgIC8v5LiL5ouJ5LqL5Lu2XHJcbiAgICAgICAgY29uLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmICh1bC5pcyhcIjp2aXNpYmxlXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyB1bC5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgICAgICBkcm9wZGl2LnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCIuZHJvcGRpdlwiKS5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgICAgICAvLyBkcm9wZGl2LnNob3coKTtcclxuICAgICAgICAgICAgICAgIC8vIHVsLnNsaWRlRG93bigyMDApO1xyXG4gICAgICAgICAgICAgICAgZHJvcGRpdi5zbGlkZURvd24oMjAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcImJvZHlcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyB1bC5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgICQoXCIuZHJvcGRpdlwiKS5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgICAgIC8vIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBjb24ubW91c2VsZWF2ZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIC8vICAgICB1bC5zbGlkZVVwKDIwMCk7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgLy/pgInkuK3kuovku7ZcclxuICAgICAgICBsaS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZFZhbHVlID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pZFwiKTtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9ICQodGhpcykuaHRtbCgpO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRKc29uID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1qb3NuXCIpO1xyXG4gICAgICAgICAgICB2YXIgYWxsdGl0bGUgPSAkKHRoaXMpLmF0dHIoXCJ0aXRsZVwiKTtcclxuICAgICAgICAgICAgc3Bhbi50ZXh0KHNlbGVjdGVkVGV4dCk7XHJcbiAgICAgICAgICAgIHNwYW4uYXR0cihcImRhdGEtaWRcIiwgc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgIHNwYW4uYXR0cihcImRhdGEtanNvblwiLCBzZWxlY3RlZEpzb24pO1xyXG4gICAgICAgICAgICBzcGFuLmF0dHIoXCJ0aXRsZVwiLCBhbGx0aXRsZSk7XHJcblxyXG4gICAgICAgICAgICBjb24uYXR0cihcInRpdGxlXCIsIGFsbHRpdGxlKTtcclxuICAgICAgICAgICAgY29uLmF0dHIoXCJkYXRhLWlkXCIsIHNlbGVjdGVkVmFsdWUpO1xyXG4gICAgICAgICAgICAvL+mAieS4reWbnuiwg+S6i+S7tlxyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRDYWxsQmFjaykge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRDYWxsQmFjayh3YXJwaWQsIHNlbGVjdGVkVmFsdWUsIGFsbHRpdGxlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkcm9wZGl2LnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNwYW4gPSBzcGFuO1xyXG4gICAgICAgIC8v6K6+572u6buY6K6k5YC8XHJcbiAgICAgICAgdGhpcy5zZXRWYWx1ZShkZWZhdWx0VmFsdWUpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfSxcclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzcGFuID0gdGhpcy5zcGFuO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogc3Bhbi5hdHRyKFwiZGF0YS1pZFwiKSwgdGV4dDogc3Bhbi5hdHRyKFwidGl0bGVcIiksIHppbmRleDogJCh0aGlzLnNlbGVjdG9yKS5hdHRyKFwiemluZGV4XCIpIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogLTEsIHRleHQ6IFwiXCIgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8v5pq06Zyy57uZ5aSW6YOo55qE5pa55rOVXHJcbiAgICBnZXRTZWxlY3RlZEpzb25WYWx1ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBhcmFtLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB2YXIgc3BhbiA9IHRoaXMuc3BhbjtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3Bhbi5hdHRyKFwiZGF0YS1qc29uXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgIHZhciB0ZXh0c2VsID0gXCJcIjtcclxuICAgICAgICAvL+mAieS4reeahOWAvFxyXG4gICAgICAgIHZhciBzZWxJdGVtO1xyXG4gICAgICAgIHZhciBzcGFuID0gdGhpcy5zcGFuO1xyXG4gICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgdGhpcy5wYXJhbS5kYXRhLmxlbmd0aDsgbSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtc2VsID0gdGhpcy5wYXJhbS5kYXRhW21dO1xyXG4gICAgICAgICAgICBpZiAoaXRlbXNlbFt0aGlzLnBhcmFtLnZhbHVlRmllbGRdID09IHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXh0c2VsID0gaXRlbXNlbFt0aGlzLnBhcmFtLnRleHRGaWVsZF07XHJcbiAgICAgICAgICAgICAgICBzZWxJdGVtID0gaXRlbXNlbDtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNwYW4uYXR0cihcImRhdGEtaWRcIiwgdmFsdWUpO1xyXG4gICAgICAgIHNwYW4uYXR0cihcImRhdGEtanNvblwiLCBKU09OLnN0cmluZ2lmeShzZWxJdGVtKSk7XHJcbiAgICAgICAgc3Bhbi5hdHRyKFwidGl0bGVcIiwgdGV4dHNlbCk7XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5hdHRyKFwidGl0bGVcIiwgdGV4dHNlbCk7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gdGV4dHNlbDtcclxuICAgICAgICB2YXIgdiA9IHRleHRzZWwubGVuZ3RoID4gdGhpcy5wYXJhbS5zdWJ0ZXh0bGVuZ3RoID8gdGV4dHNlbC5zdWJzdHJpbmcoMCwgdGhpcy5wYXJhbS5zdWJ0ZXh0bGVuZ3RoKSArIFwiLi4uXCIgOiB0ZXh0c2VsO1xyXG4gICAgICAgIHNwYW4udGV4dCh2KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0ubG9hZGVkQ2FsbEJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5wYXJhbS5sb2FkZWRDYWxsQmFjayhjb250YWluZXJJZCwgc2VsZWN0ZWRWYWx1ZSwgc2VsZWN0ZWRUZXh0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG5cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBMdWlEcm9wRG93bkxpc3Q7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL2pzL2Ryb3Bkb3dubGlzdC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiA0IDcgOCAxMCAxMiAxMyAxOSAyMCAyMSAyNiAyNyAyOCA0MyIsIlxyXG5mdW5jdGlvbiBMdWlDaGVja0JveCgpIHtcclxuICAgIHRoaXMuc2VsZWN0b3IgPSBcImx1aWNoZWNrXCI7XHJcbiAgICAvL+WPguaVsFxyXG4gICAgdGhpcy5wYXJhbSA9IHt9O1xyXG59XHJcblxyXG5MdWlDaGVja0JveC5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogTHVpQ2hlY2tCb3gsXHJcbiAgICAvKlxyXG4gICAgICp3YXJwaWQg5a655ZmoaWRcclxuICAgICAqZGF0YSDmlbDmja7pm4bvvIxqc29uIOS4siBbe25hbWU6cmV4LHZhbDowMDF9LHtuYW1lOmxpbGVpLHZhbDowMDJ9XVxyXG4gICAgICrlsZXnpLrlrZfmrrUgICB0ZXh0RmllbGRcclxuICAgICAq5a6e6ZmF5YC85a2X5q61IHZhbHVlRmllbGRcclxuICAgICAq5Zue6LCD5Ye95pWwIGNhbGxiYWNrIOWPguaVsOS4uuW9k+WJjeinpuWPkeeahOWkjemAieahhuS4iue7keWumueahOaVsOaNrlxyXG4gICAgICovXHJcbiAgICBpbml0OiBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICB2YXIgY3RoaXMgPSB0aGlzO1xyXG4gICAgICAgIGlmIChwYXJhbSAmJiBwYXJhbS5ncm91cCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yID0gJ2x1aWNoZWNrW2RhdGEtbmFtZT1cIicgKyBwYXJhbS5ncm91cCArICdcIl0nO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhcmFtID0gcGFyYW07XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVja1N0eWxlID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpID09IDEgPyBcImNoZWNrX3NlbFwiIDogXCJcIjtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2tzaG93ID0gJChpdGVtKS5hdHRyKFwiZGF0YS1zaG93Y2hlY2tib3hcIikgIT0gMTtcclxuXHJcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gJChpdGVtKS5hdHRyKFwiZGF0YS10ZXh0XCIpO1xyXG4gICAgICAgICAgICB2YXIgaCA9ICc8aSBjbGFzcz1cImljb25fY2hlY2sgJyArIGlzY2hlY2tTdHlsZSArICcgXCI+PC9pPic7XHJcbiAgICAgICAgICAgIHZhciBzID0gJzxzcGFuIGNsYXNzPVwiY2hlY2tfdGV4dFwiICBvbnNlbGVjdHN0YXJ0PVwicmV0dXJuIGZhbHNlO1wiID4nICsgdGV4dCArICc8L3NwYW4+JztcclxuICAgICAgICAgICAgaCA9IGlzY2hlY2tzaG93ID8gaCArIHMgOiBzO1xyXG4gICAgICAgICAgICAvLyBpZiAoJChpdGVtKS5maW5kKFwiaWNvbl9jaGVja1wiKS5sZW5ndGggPiAwIHx8ICQoaXRlbSkuZmluZChcImNoZWNrX3RleHRcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKGl0ZW0pLmh0bWwoaCk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY3NzKHsgXCJjdXJzb3JcIjogXCJwb2ludGVyXCIgfSk7XHJcbiAgICAgICAgICAgICQoaXRlbSkudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKFwiaVwiKS5yZW1vdmVDbGFzcyhcImNoZWNrX3NlbFwiKS5hZGRDbGFzcyhcImNoZWNrX2RlZlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKFwiaVwiKS5yZW1vdmVDbGFzcyhcImNoZWNrX2RlZlwiKS5hZGRDbGFzcyhcImNoZWNrX3NlbFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGFsZXJ0KFwiYmluZFwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbSYmcGFyYW0uY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBuYW1lID0gJChpdGVtKS5hdHRyKFwiZGF0YS1uYW1lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBjdGhpcy5nZXRKc29uVmFsdWUoZ3JvdXBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+iwg+eUqOWbnuiwg+WHveaVsO+8jOW5tui/lOWbnue7hOWQjeWSjOaJgOmAieS4reWAvOW+l2pzb27kuLJcclxuICAgICAgICAgICAgICAgICAgICAvL3BhcmFtLmNhbGxiYWNrKGdyb3VwbmFtZSwgdmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5jYWxsYmFjayhpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG5cclxuXHJcbiAgICB9LFxyXG4gICAgLy/orr7nva5jaGVja2JveOe7hOWTquS6m+WAvOiiq+mAieS4rVxyXG4gICAgc2V0VmFsdWU6IGZ1bmN0aW9uIChuYW1lLCB2YWwpIHtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmZpbHRlcignW2RhdGEtdmFsPVwiJyArIHZhbCArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChpdGVtKS5jbGljaygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+WY2hlY2tib3jnu4TpgInkuK3nmoTlgLxcclxuICAgIGdldFZhbHVlOiBmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgaXRlbSkge1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHIucHVzaCgkKGl0ZW0pLmF0dHIoXCJkYXRhLXZhbFwiKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFsZXJ0KHIuam9pbignLCcpKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlmNoZWNrYm9457uE6YCJ5Lit55qE5YC8XHJcbiAgICBnZXRKc29uVmFsdWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHIgPSBbXTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIganNvbnN0ciA9ICQoaXRlbSkuYXR0cihcImRhdGEtanNvblwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uc3RyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKEpTT04ucGFyc2UodW5lc2NhcGUoanNvbnN0cikpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByO1xyXG4gICAgfSxcclxuICAgIC8qKuWIpOaWreW9k+WJjSBjaGVja2JveCDmmK/lkKbpgInkuK0gKi9cclxuICAgIGlzY2hlY2s6IGZ1bmN0aW9uIChuYW1lLCB2YWwpIHtcclxuICAgICAgICB2YXIgaXRlbSA9ICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZmlsdGVyKCdbZGF0YS12YWw9XCInICsgdmFsICsgJ1wiXScpWzBdO1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIHJldHVybiBpc2NoZWNrID09IDE7XHJcbiAgICB9LFxyXG4gICAgLyoq5Yik5pat5b2T5YmNIGNoZWNrYm94IOaYr+WQpumAieS4rSAqL1xyXG4gICAgaXNjaGVja0VsZW1lbnQ6IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGlzY2hlY2sgPT0gMTtcclxuICAgIH0sXHJcbiAgICAvKirmqKHmi5/ljZXlh7sg5Y+q5pS55Y+Y5qC35byPICovXHJcbiAgICBzZXRDbGlja1N0eWxlOiBmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDApO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNoaWxkcmVuKFwiaVwiKS5yZW1vdmVDbGFzcyhcImNoZWNrX3NlbFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiLCAxKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jaGlsZHJlbihcImlcIikuYWRkQ2xhc3MoXCJjaGVja19zZWxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cz1MdWlDaGVja0JveDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvanMvY2hlY2tib3guanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDIgNCA3IDggMTAgMTIgMTMgMTkgMjAgMjEgMjYgMjcgMjggNDMiLCJcclxuXHJcbmZ1bmN0aW9uIHBvcHNob3coc2VsZSwgcG9wc2hvdykgey8v5by55Ye65bGC55qE5pi+56S6XHJcbiAgIFxyXG4gICAgc2VsZS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcG9wc2hvdy5zaG93KCk7XHJcbiAgICAgICAgJCgnLnBvcC1tYXNrJykuc2hvdygpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLnNob3coKTtcclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gcG9waGlkZShzZWxlLCBwb3BzaG93KSB7Ly/lvLnlh7rlsYLnmoTmtojlpLFcclxuICAgIHNlbGUub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHBvcHNob3cuaGlkZSgpO1xyXG4gICAgICAgICQoJy5wb3AtbWFzaycpLmhpZGUoKTtcclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gY2hlY2tCb294KCkgey8v5aSN6YCJ5qGG55qE5qC35byPXHJcbiAgICAkKCcuY2hlY2tCb3gnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ2hpZGRlbicpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjOGU5ZmE4Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufVxyXG5mdW5jdGlvbiBjaG9vc2VBbGwoKSB7Ly/lhajpgInlhajkuI3pgIlcclxuICAgICQoJy5jaGVja0JveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgbnVtID0gJCgnLmNoZWNrQm94JykuaW5kZXgoJCh0aGlzKSk7XHJcbiAgICAgICAgaWYgKG51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICgkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScpID09ICd2aXNpYmxlJykge1xyXG4gICAgICAgICAgICAgICAgJCgnLmNoZWNrQm94JykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbWcnKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jc3MoJ2JvcmRlcicsICcxcHggc29saWQgIzhlOWZhOCcpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JykgPT0gJ3Zpc2libGUnKSB7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW1nJykuY3NzKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKTtcclxuICAgICAgICAgICAgICAgICQodGhpcykuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICNmZmYnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgJGltZ3MgPSAkLm1ha2VBcnJheSgkKCcudGFibGUgdHI6bm90KDpmaXJzdCknKS5maW5kKCdpbWcnKSk7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9ICRpbWdzLmV2ZXJ5KGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5zdHlsZS52aXNpYmlsaXR5ID09ICd2aXNpYmxlJztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmNzcygnYm9yZGVyJywgJzFweCBzb2xpZCAjZmZmJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuY2hlY2tCb3gnKS5maXJzdCgpLmZpbmQoJ2ltZycpLmNzcygndmlzaWJpbGl0eScsICdoaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgICQoJy5jaGVja0JveCcpLmZpcnN0KCkuY3NzKCdib3JkZXInLCAnMXB4IHNvbGlkICM4ZTlmYTgnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG59XHJcbmZ1bmN0aW9uIFNpYnMoVGhpcykge1xyXG4gICAgVGhpcy5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnYWN0aXZlJykuc2libGluZ3MoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICB9KVxyXG59XHJcblxyXG5mdW5jdGlvbiByYWRpbygpIHsvL+WNlemAieeahOagt+W8j1xyXG4gICAgJCgnLnJhZGlvJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJy5yYWRpbycpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldENvb2tpZShvYmpOYW1lLCBvYmpWYWx1ZSwgb2JqSG91cnMpIHtcclxuICAgIHZhciBzdHIgPSBvYmpOYW1lICsgXCI9XCIgKyBlc2NhcGUob2JqVmFsdWUpO1xyXG5cclxuICAgIGlmIChvYmpIb3VycyA+IDApIHsgLy/kuLow5pe25LiN6K6+5a6a6L+H5pyf5pe26Ze077yM5rWP6KeI5Zmo5YWz6Zet5pe2Y29va2ll6Ieq5Yqo5raI5aSxXHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIHZhciBtcyA9IG9iakhvdXJzICogMzYwMCAqIDEwMDA7XHJcbiAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgbXMpO1xyXG4gICAgICAgIHN0ciArPSBcIjsgZXhwaXJlcz1cIiArIGRhdGUudG9HTVRTdHJpbmcoKSArIFwiO3BhdGg9L1wiO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQuY29va2llID0gc3RyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRDb29raWUob2JqTmFtZSkgeyAvL+iOt+WPluaMh+WumuWQjeensOeahGNvb2tpZeeahOWAvFxyXG4gICAgdmFyIGFyclN0ciA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdChcIjsgXCIpO1xyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJTdHIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdGVtcCA9IGFyclN0cltpXS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgaWYgKHRlbXBbMF0gPT0gb2JqTmFtZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdW5lc2NhcGUodGVtcFsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vL+W8ueWHuuWKoOi9veWbvueJh1xyXG5mdW5jdGlvbiBTaG93TG9hZGluZyhvYmopIHtcclxuICAgIG9iai5odG1sKGpRdWVyeShcIiNkaXZMb2FkaW5nXCIpLmh0bWwoKSk7XHJcbn1cclxuZnVuY3Rpb24gdGltZVRpY2tCaWcoc2Vjb25kKSB7XHJcbiAgICAkKFwiLnRpbWVzLWJpZ1wiKS5odG1sKHNlY29uZCk7XHJcbiAgICB2YXIgdCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLnRpbWVzLWJpZ1wiKS5odG1sKC0tc2Vjb25kKTtcclxuICAgICAgICBpZiAoc2Vjb25kIDw9IDApIHtcclxuICAgICAgICAgICAgJChcIi5yb3RhdGUtcG9pbnRcIikuY3NzKHsgXCJhbmltYXRpb24tcGxheS1zdGF0ZVwiOiBcInBhdXNlZFwiIH0pO1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKHQpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDEwMDApO1xyXG4gICAgJChcIi5yb3RhdGUtcG9pbnRcIikuY3NzKHsgXCJhbmltYXRpb24tcGxheS1zdGF0ZVwiOiBcInJ1bm5pbmdcIiB9KTtcclxufVxyXG5cclxuLy/liqDovb3lm77niYfliLDmn5DkuKrlhYPntKDkuK1cclxuZnVuY3Rpb24gSW5zZXJ0TG9hZGluZyhvYmopIHtcclxuICAgIG9iai5hcHBlbmQoalF1ZXJ5KFwiI2RpdkxvYWRpbmdcIikuaHRtbCgpKTtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBwb3BoaWRlOiBwb3BoaWRlLFxyXG4gICAgcG9wc2hvdzogcG9wc2hvdyxcclxuICAgIGNoZWNrQm9veDogY2hlY2tCb294LFxyXG4gICAgU2liczogU2licyxcclxuICAgIHJhZGlvOiByYWRpbyxcclxuICAgIGNob29zZUFsbDogY2hvb3NlQWxsLFxyXG4gICAgc2V0Q29va2llOiBzZXRDb29raWUsLy/orr7nva5jb29raWVcclxuICAgIGdldENvb2tpZTogZ2V0Q29va2llLCAvLyDojrflj5Zjb29raWVcclxuICAgIFNob3dMb2FkaW5nOiBTaG93TG9hZGluZywvL+WKoOi9veS4rVxyXG4gICAgSW5zZXJ0TG9hZGluZzogSW5zZXJ0TG9hZGluZyxcclxuICAgIHRpbWVUaWNrQmlnOiB0aW1lVGlja0JpZy8v5YCS6K6h5pe2XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvTFVJL3Rvb2wuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNSA2IDcgOCA5IDEyIDEzIDE4IDE5IDIwIDIxIDI3IDI4IDM2IiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBjaGVja051bTogZnVuY3Rpb24gKGV2ZW50KSB7XHJcblxyXG4gICAgICAgIHZhciBrZXludW0gPSBldmVudC5rZXlDb2RlO1xyXG4gICAgICAgIGlmICgoa2V5bnVtID49IDQ4ICYmIGtleW51bSA8PSA1NykpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJDdXRcIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgblQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xyXG4gICAgICAgICAgICAvL+esrOS4gOS4quS4jeiDvei+k+WFpTBcclxuICAgICAgICAgICAgaWYgKChuVCA9PSBcIlwiKSAmJiBrZXludW0gPT0gNDgpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBlbHNlIGlmIChuVC5sZW5ndGggPiAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBtYXRjaE51bTogZnVuY3Rpb24gKHQpIHtcclxuICAgICAgICB0LnZhbHVlID0gdC52YWx1ZS50cmltdGV4dCgnLicpO1xyXG4gICAgfSxcclxuICAgIGNoZWNrRmxvYXQ6IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgIC8vdmFyIHNjb3JlID0gdGhpcy50b3RhbFNvcmU7XHJcbiAgICAgICAgdmFyIGtleW51bSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhrZXludW0pO1xyXG4gICAgICAgIGlmICgoa2V5bnVtID49IDQ4ICYmIGtleW51bSA8PSA1NykgfHwgKGtleW51bSA9PSA0NikpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJDdXRcIiwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgICAgICB2YXIgblQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpO1xyXG4gICAgICAgICAgICAvL+esrOS4gOS4quWtl+espuS4jeiDveS4uuWwj+aVsOeCue+8jOS4jeiDvemHjeWkjei+k+WFpeWwj+aVsOeCuVxyXG4gICAgICAgICAgICBpZiAoKG5UID09IFwiXCIgfHwgblQuaW5kZXhPZihcIi5cIikgPiAtMSkgJiYga2V5bnVtID09IDQ2KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgLy/lsI/mlbDngrnlkI7kv53nlZnkuIDkvY1cclxuICAgICAgICAgICAgZWxzZSBpZiAoblQubGVuZ3RoID4gMiAmJiBuVC5pbmRleE9mKFwiLlwiKSA9PSBuVC5sZW5ndGggLSAyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vMOWQjumdouWPquiDvei+k+WFpeWwj+aVsOeCuVxyXG4gICAgICAgICAgICBlbHNlIGlmIChuVCA9PSBcIjBcIiAmJiBrZXludW0gIT0gNDYpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAvL+S4ieS9jeaVsOWQjuWPquiDvei+k+WFpeWwj+aVsOeCuVxyXG4gICAgICAgICAgICBlbHNlIGlmIChuVC5sZW5ndGggPT0gMyAmJiBuVC5pbmRleE9mKFwiLlwiKSA8IDAgJiYga2V5bnVtICE9IDQ2KVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChuVC5sZW5ndGggPiA0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0sXHJcbiAgICBudW1HcmFkZVRyYW46IGZ1bmN0aW9uICh0KSB7IC8v5pWw5a2X5bm057qn6L2s5o2iXHJcbiAgICAgICAgZGVidWdnZXI7XHJcbiAgICAgICAgc3dpdGNoICh0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuS4gOW5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLkuozlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5LiJ5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuWbm+W5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDU6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLkupTlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5YWt5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgNzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIuS4g+W5tOe6p1wiO1xyXG4gICAgICAgICAgICBjYXNlIDg6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLlhavlubTnuqdcIjtcclxuICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi5Lmd5bm057qnXCI7XHJcbiAgICAgICAgICAgIGNhc2UgMTA6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCLpq5jkuIBcIjtcclxuICAgICAgICAgICAgY2FzZSAxMTpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcIumrmOS6jFwiO1xyXG4gICAgICAgICAgICBjYXNlIDEyOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwi6auY5LiJXCI7XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0O1xyXG4gICAgfSwgSXNNb2JpbGU6IGZ1bmN0aW9uKHQpIHtcclxuICAgICAgICByZXR1cm4gKC9eMVszfDR8NXw3fDhdXFxkezl9JC8udGVzdCh0KSk7Ly/moKHpqozmiYvmnLrnmoTmoLzlvI9cclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2xpYi91dGlsLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gNCAxMiAxMyAyMSAyMyAyNyAyOCIsIi8vdmFyIHRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZScpO1xyXG52YXIgdGVtcGxhdGUgPSByZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcclxuXHJcbi8qKiBcclxuICog5a+55pel5pyf6L+b6KGM5qC85byP5YyW77yMIFxyXG4gKiBAcGFyYW0gZGF0ZSDopoHmoLzlvI/ljJbnmoTml6XmnJ8gXHJcbiAqIEBwYXJhbSBmb3JtYXQg6L+b6KGM5qC85byP5YyW55qE5qih5byP5a2X56ym5LiyXHJcbiAqICAgICDmlK/mjIHnmoTmqKHlvI/lrZfmr43mnInvvJogXHJcbiAqICAgICB5OuW5tCwgXHJcbiAqICAgICBNOuW5tOS4reeahOaciOS7vSgxLTEyKSwgXHJcbiAqICAgICBkOuaciOS7veS4reeahOWkqSgxLTMxKSwgXHJcbiAqICAgICBoOuWwj+aXtigwLTIzKSwgXHJcbiAqICAgICBtOuWIhigwLTU5KSwgXHJcbiAqICAgICBzOuenkigwLTU5KSwgXHJcbiAqICAgICBTOuavq+enkigwLTk5OSksXHJcbiAqICAgICBxOuWto+W6pigxLTQpXHJcbiAqIEByZXR1cm4gU3RyaW5nXHJcbiAqIEBhdXRob3IgeWFuaXMud2FuZ1xyXG4gKiBAc2VlXHRodHRwOi8veWFuaXN3YW5nLmNvbS9mcm9udGVuZC8yMDEzLzAyLzE2L2RhdGVmb3JtYXQtcGVyZm9ybWFuY2UvXHJcbiAqL1xyXG5cclxuLy/ml7bpl7TovazmjaJcclxudGVtcGxhdGUuaGVscGVyKCdkYXRlRm9ybWF0JywgZnVuY3Rpb24gKGRhdGUsIGZvcm1hdCkge1xyXG4gICAgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KGRhdGUucmVwbGFjZShcIi9EYXRlKFwiLCBcIlwiKS5yZXBsYWNlKFwiKS9cIiwgXCJcIiksIDEwKSk7XHJcbiAgICAvL3JldHVybiBkYXRlLmdldERhdGUoKTtcclxuICAgLy9kYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcblxyXG4gICAgdmFyIG1hcCA9IHtcclxuICAgICAgICBcInlcIjogZGF0ZS5nZXRZZWFyKCksXHJcbiAgICAgICAgXCJNXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9IFxyXG4gICAgICAgIFwiZFwiOiBkYXRlLmdldERhdGUoKSwgLy/ml6UgXHJcbiAgICAgICAgXCJoXCI6IGRhdGUuZ2V0SG91cnMoKSwgLy/lsI/ml7YgXHJcbiAgICAgICAgXCJtXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhiBcclxuICAgICAgICBcInNcIjogZGF0ZS5nZXRTZWNvbmRzKCksIC8v56eSIFxyXG4gICAgICAgIFwicVwiOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6piBcclxuICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enkiBcclxuICAgIH07XHJcbiAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvKFt5TWRobXNxU10pKy9nLCBmdW5jdGlvbihhbGwsIHQpe1xyXG4gICAgICAgIHZhciB2ID0gbWFwW3RdO1xyXG4gICAgICAgIGlmKHYgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGlmKGFsbC5sZW5ndGggPiAxKXtcclxuICAgICAgICAgICAgICAgIHYgPSAnMCcgKyB2O1xyXG4gICAgICAgICAgICAgICAgdiA9IHYuc3Vic3RyKHYubGVuZ3RoLTIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHQgPT09ICd5Jyl7XHJcbiAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gYWxsLmxlbmd0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbGw7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBmb3JtYXQ7XHJcbn0pO1xyXG5cclxuLy/miKrlrZflpITnkIZcclxudGVtcGxhdGUuaGVscGVyKCdjdXRjaGFyJywgZnVuY3Rpb24gKG9iaiwgY2hhcmxlbmd0aCkge1xyXG5cclxuICAgIGlmIChvYmogPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgaWYgKG9iai5sZW5ndGggPiBwYXJzZUludChjaGFybGVuZ3RoKSkge1xyXG4gICAgICAgIG9iaiA9IG9iai5zdWJzdHJpbmcoMCwgcGFyc2VJbnQoY2hhcmxlbmd0aCkpICsgXCIuLi5cIjtcclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9iajtcclxuXHJcbn0pO1xyXG5cclxuLy/mlZnnoJTor4TnuqdcclxudGVtcGxhdGUuaGVscGVyKCdUZWFjaFR5cGVUcmFuJywgZnVuY3Rpb24gKG9iaikge1xyXG5cclxuICAgIGlmIChvYmogPT0gMSkge1xyXG4gICAgICAgIHJldHVybiBcIkHnuqdcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFwiQue6p1wiO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8v5ZCI5ZCM5pyf6ZmQ6L2s5o2iXHJcbnRlbXBsYXRlLmhlbHBlcignSHRReCcsIGZ1bmN0aW9uIChvYmopIHtcclxuXHJcbiAgICByZXR1cm4gdGVtcGxhdGUuaGVscGVyKG9iaikgKyBcIuW5tFwiO1xyXG59KTtcclxuXHJcbi8v5bm057qnXHJcbnRlbXBsYXRlLmhlbHBlcignR2V0QmlnR3JhZGUnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgcmV0dXJuIGUgPT0gMSA/IFwi5LiA5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gMiA/IFwi5LqM5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gMyA/IFwi5LiJ5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNCA/IFwi5Zub5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNSA/IFwi5LqU5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNiA/IFwi5YWt5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gNyA/IFwi5LiD5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gOCA/IFwi5YWr5bm057qnXCJcclxuICAgICAgICA6IGUgPT0gOSA/IFwi5Lmd5bm057qnXCJcclxuICAgICAgICAgOiBlID09IDEwID8gXCLpq5jkuIBcIlxyXG4gICAgICAgIDogZSA9PSAxMSA/IFwi6auY5LqMXCJcclxuICAgICAgICA6IGUgPT0gMTIgPyBcIumrmOS4iVwiXHJcbiAgICAgICAgOiBcIlwiO1xyXG5cclxufSk7XHJcblxyXG5cclxuLy/lpKflhpnnmoTovazmjaJcclxudGVtcGxhdGUuaGVscGVyKCdHZXRCaWdXJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIHJldHVybiBlID09IDEgPyBcIuS4gFwiXHJcbiAgICAgICAgOiBlID09IDIgPyBcIuS6jFwiXHJcbiAgICAgICAgOiBlID09IDMgPyBcIuS4iVwiXHJcbiAgICAgICAgOiBlID09IDQgPyBcIuWbm1wiXHJcbiAgICAgICAgOiBlID09IDUgPyBcIuS6lFwiXHJcbiAgICAgICAgOiBlID09IDYgPyBcIuWFrVwiXHJcbiAgICAgICAgOiBlID09IDcgPyBcIuS4g1wiXHJcbiAgICAgICAgOiBlID09IDggPyBcIuWFq1wiXHJcbiAgICAgICAgOiBlID09IDkgPyBcIuS5nVwiXHJcbiAgICAgICAgOiBlID09IDEwID8gXCLljYFcIlxyXG4gICAgICAgIDogZSA9PSAxMSA/IFwi5Y2B5LiAXCJcclxuICAgICAgICA6IGUgPT0gMTIgPyBcIuWNgeS6jFwiXHJcbiAgICAgICAgOiBlID09IDEzID8gXCLljYHkuIlcIlxyXG4gICAgICAgIDogZSA9PSAxNCA/IFwi5Y2B5ZubXCJcclxuICAgICAgICA6IGUgPT0gMTUgPyBcIuWNgeS6lFwiXHJcbiAgICAgICAgOiBlID09IDE2ID8gXCLljYHlha1cIlxyXG4gICAgICAgIDogZSA9PSAxNyA/IFwi5Y2B5LiDXCJcclxuICAgICAgICA6IGUgPT0gMTggPyBcIuWNgeWFq1wiXHJcbiAgICAgICAgOiBlID09IDE5ID8gXCLljYHkuZ1cIlxyXG4gICAgICAgIDogZSA9PSAyMCA/IFwi5LqM5Y2BXCJcclxuICAgICAgICA6IGUgPT0gMjEgPyBcIuS6jOWNgeS4gFwiXHJcbiAgICAgICAgOiBlID09IDIyID8gXCLkuozljYHkuoxcIlxyXG4gICAgICAgIDogZSA9PSAyMyA/IFwi5LqM5Y2B5LiJXCJcclxuICAgICAgICA6IGUgPT0gMjQgPyBcIuS6jOWNgeWbm1wiXHJcbiAgICAgICAgOiBlID09IDI1ID8gXCLkuozljYHkupRcIlxyXG4gICAgICAgIDogZSA9PSAyNiA/IFwi5LqM5Y2B5YWtXCJcclxuICAgICAgICA6IGUgPT0gMjcgPyBcIuS6jOWNgeS4g1wiXHJcbiAgICAgICAgOiBlID09IDI4ID8gXCLkuozljYHlhatcIlxyXG4gICAgICAgIDogZSA9PSAyOSA/IFwi5LqM5Y2B5LmdXCJcclxuICAgICAgICA6IGUgPT0gMzAgPyBcIuS4ieWNgVwiXHJcbiAgICAgICAgOiBlID09IDMxID8gXCLkuInljYHkuIBcIlxyXG4gICAgICAgIDogZSA9PSAzMiA/IFwi5LiJ5Y2B5LqMXCJcclxuICAgICAgICA6IGUgPT0gMzMgPyBcIuS4ieWNgeS4iVwiXHJcbiAgICAgICAgOiBlID09IDM0ID8gXCLkuInljYHlm5tcIlxyXG4gICAgICAgIDogZSA9PSAzNSA/IFwi5LiJ5Y2B5LqUXCJcclxuICAgICAgICA6IGUgPT0gMzYgPyBcIuS4ieWNgeWFrVwiXHJcbiAgICAgICAgOiBlID09IDM3ID8gXCLkuInljYHkuINcIlxyXG4gICAgICAgIDogZSA9PSAzOCA/IFwi5LiJ5Y2B5YWrXCJcclxuICAgICAgICA6IGUgPT0gMzkgPyBcIuS4ieWNgeS5nVwiXHJcbiAgICAgICAgOiBlID09IDQwID8gXCLlm5vljYFcIlxyXG4gICAgICAgIDogZSA9PSA0MSA/IFwi5Zub5Y2B5LiAXCJcclxuICAgICAgICA6IGUgPT0gNDIgPyBcIuWbm+WNgeS6jFwiXHJcbiAgICAgICAgOiBlID09IDQzID8gXCLlm5vljYHkuIlcIlxyXG4gICAgICAgIDogZSA9PSA0NCA/IFwi5Zub5Y2B5ZubXCJcclxuICAgICAgICA6IGUgPT0gNDUgPyBcIuWbm+WNgeS6lFwiXHJcbiAgICAgICAgOiBlID09IDQ2ID8gXCLlm5vljYHlha1cIlxyXG4gICAgICAgIDogZSA9PSA0NyA/IFwi5Zub5Y2B5LiDXCJcclxuICAgICAgICA6IGUgPT0gNDggPyBcIuWbm+WNgeWFq1wiXHJcbiAgICAgICAgOiBlID09IDQ5ID8gXCLlm5vljYHkuZ1cIlxyXG4gICAgICAgIDogZSA9PSA1MCA/IFwi5LqU5Y2BXCJcclxuICAgICAgICA6IFwiXCI7XHJcbn0pO1xyXG50ZW1wbGF0ZS5oZWxwZXIoJ3Rlc3QnLCBmdW5jdGlvbiAoZSkgeyByZXR1cm4gZTt9KVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RwbC90ZW1wbGF0ZS1oZWxwZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMTcgMTkgMjAgMjEgMjMgMjcgMjggNDUiLCIvKlRNT0RKUzp7fSovXHJcbiFmdW5jdGlvbiAoKSB7XHJcblx0ZnVuY3Rpb24gYShhLCBiKSB7XHJcblx0XHRyZXR1cm4gKC9zdHJpbmd8ZnVuY3Rpb24vLnRlc3QodHlwZW9mIGIpID8gaCA6IGcpKGEsIGIpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBiKGEsIGMpIHtcclxuXHRcdHJldHVybiBcInN0cmluZ1wiICE9IHR5cGVvZiBhICYmIChjID0gdHlwZW9mIGEsIFwibnVtYmVyXCIgPT09IGMgPyBhICs9IFwiXCIgOiBhID0gXCJmdW5jdGlvblwiID09PSBjID8gYihhLmNhbGwoYSkpIDogXCJcIiksIGFcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGMoYSkge1xyXG5cdFx0cmV0dXJuIGxbYV1cclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGQoYSkge1xyXG5cdFx0cmV0dXJuIGIoYSkucmVwbGFjZSgvJig/IVtcXHcjXSs7KXxbPD5cIiddL2csIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBlKGEsIGIpIHtcclxuXHRcdGlmIChtKGEpKWZvciAodmFyIGMgPSAwLCBkID0gYS5sZW5ndGg7IGQgPiBjOyBjKyspYi5jYWxsKGEsIGFbY10sIGMsIGEpOyBlbHNlIGZvciAoYyBpbiBhKWIuY2FsbChhLCBhW2NdLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZihhLCBiKSB7XHJcblx0XHR2YXIgYyA9IC8oXFwvKVteXFwvXStcXDFcXC5cXC5cXDEvLCBkID0gKFwiLi9cIiArIGEpLnJlcGxhY2UoL1teXFwvXSskLywgXCJcIiksIGUgPSBkICsgYjtcclxuXHRcdGZvciAoZSA9IGUucmVwbGFjZSgvXFwvXFwuXFwvL2csIFwiL1wiKTsgZS5tYXRjaChjKTspZSA9IGUucmVwbGFjZShjLCBcIi9cIik7XHJcblx0XHRyZXR1cm4gZVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZyhiLCBjKSB7XHJcblx0XHR2YXIgZCA9IGEuZ2V0KGIpIHx8IGkoe2ZpbGVuYW1lOiBiLCBuYW1lOiBcIlJlbmRlciBFcnJvclwiLCBtZXNzYWdlOiBcIlRlbXBsYXRlIG5vdCBmb3VuZFwifSk7XHJcblx0XHRyZXR1cm4gYyA/IGQoYykgOiBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBoKGEsIGIpIHtcclxuXHRcdGlmIChcInN0cmluZ1wiID09IHR5cGVvZiBiKSB7XHJcblx0XHRcdHZhciBjID0gYjtcclxuXHRcdFx0YiA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGsoYylcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dmFyIGQgPSBqW2FdID0gZnVuY3Rpb24gKGMpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IGIoYywgYSkgKyBcIlwiXHJcblx0XHRcdH0gY2F0Y2ggKGQpIHtcclxuXHRcdFx0XHRyZXR1cm4gaShkKSgpXHJcblx0XHRcdH1cclxuXHRcdH07XHJcblx0XHRyZXR1cm4gZC5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSA9IG4sIGQudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBiICsgXCJcIlxyXG5cdFx0fSwgZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaShhKSB7XHJcblx0XHR2YXIgYiA9IFwie1RlbXBsYXRlIEVycm9yfVwiLCBjID0gYS5zdGFjayB8fCBcIlwiO1xyXG5cdFx0aWYgKGMpYyA9IGMuc3BsaXQoXCJcXG5cIikuc2xpY2UoMCwgMikuam9pbihcIlxcblwiKTsgZWxzZSBmb3IgKHZhciBkIGluIGEpYyArPSBcIjxcIiArIGQgKyBcIj5cXG5cIiArIGFbZF0gKyBcIlxcblxcblwiO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIFwib2JqZWN0XCIgPT0gdHlwZW9mIGNvbnNvbGUgJiYgY29uc29sZS5lcnJvcihiICsgXCJcXG5cXG5cIiArIGMpLCBiXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR2YXIgaiA9IGEuY2FjaGUgPSB7fSwgayA9IHRoaXMuU3RyaW5nLCBsID0ge1xyXG5cdFx0XCI8XCI6IFwiJiM2MDtcIixcclxuXHRcdFwiPlwiOiBcIiYjNjI7XCIsXHJcblx0XHQnXCInOiBcIiYjMzQ7XCIsXHJcblx0XHRcIidcIjogXCImIzM5O1wiLFxyXG5cdFx0XCImXCI6IFwiJiMzODtcIlxyXG5cdH0sIG0gPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRcdHJldHVybiBcIltvYmplY3QgQXJyYXldXCIgPT09IHt9LnRvU3RyaW5nLmNhbGwoYSlcclxuXHRcdH0sIG4gPSBhLnV0aWxzID0ge1xyXG5cdFx0JGhlbHBlcnM6IHt9LCAkaW5jbHVkZTogZnVuY3Rpb24gKGEsIGIsIGMpIHtcclxuXHRcdFx0cmV0dXJuIGEgPSBmKGMsIGEpLCBnKGEsIGIpXHJcblx0XHR9LCAkc3RyaW5nOiBiLCAkZXNjYXBlOiBkLCAkZWFjaDogZVxyXG5cdH0sIG8gPSBhLmhlbHBlcnMgPSBuLiRoZWxwZXJzO1xyXG5cdGEuZ2V0ID0gZnVuY3Rpb24gKGEpIHtcclxuXHRcdHJldHVybiBqW2EucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpXVxyXG5cdH0sIGEuaGVscGVyID0gZnVuY3Rpb24gKGEsIGIpIHtcclxuXHRcdG9bYV0gPSBiXHJcblx0fSwgbW9kdWxlLmV4cG9ydHMgPSBhXHJcbn0oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMTUgMTYgMTcgMTkgMjAgMjEgMjMgMjcgMjggMzQgNDAgNDEgNDIgNDMgNDUgNDYgNTMgNTQiLCIvL+mBrue9qVxyXG5mdW5jdGlvbiBNYXNrU2hvdygpIHtcclxuICAgICQoXCIucG9wLW1hc2tcIikuc2hvdygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBNYXNrSGlkZSgpIHtcclxuICAgICQoXCIucG9wLW1hc2tcIikuaGlkZSgpO1xyXG4gICAgJChcIi5hZGRcIikuaGlkZSgpO1xyXG59XHJcbi8v5Lyg6YCS5pi+56S655qE5raI5oGvXHJcbmZ1bmN0aW9uIFBvcFRpcFNob3cob2JqKSB7XHJcbiAgICAkKFwiLmFkZHVwZFwiKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIHZhciB0aXBodG1sID0gJzxkaXYgY2xhc3M9XCJwb3AtdXAgZm9udDE0IGhpZGRlbiBhZGR1cGRcIiBpZD1cIm9rdGlwXCI+PHNwYW4gY2xhc3M9XCJwb3AtY2xvc2UgY3Vyc29yXCI+PC9zcGFuPjxkaXYgY2xhc3M9XCJwb3AtY29udGVudFwiPjxwIGNsYXNzPVwibGluZTEwMFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7XCI+JyArIG9iaiArICc8L3A+PC9kaXY+PC9kaXY+JztcclxuXHJcbiAgICAkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmFwcGVuZCh0aXBodG1sKTtcclxuICAgICQoXCIjY29udGVudFwiKS5hcHBlbmQodGlwaHRtbCk7XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLnNob3coKTtcclxuICAgICQoXCIucG9wLXVwXCIpLnNob3coKTtcclxufVxyXG5cclxuLy/kvKDpgJLmmL7npLrnmoTmtojmga/lj6rorqnlr7nlupTnmoRpZOaYvuekulxyXG5mdW5jdGlvbiBQb3BUaXBTaG93SWQob2JqKSB7XHJcbiAgICAkKFwiLmFkZHVwZFwiKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHZhciB0aXBodG1sID0gJzxkaXYgY2xhc3M9XCJwb3AtdXAgZm9udDE0IGhpZGRlbiBhZGR1cGRcIiBpZD1cIm9rdGlwXCI+PHNwYW4gY2xhc3M9XCJwb3AtY2xvc2UgY3Vyc29yXCI+PC9zcGFuPjxkaXYgY2xhc3M9XCJwb3AtY29udGVudFwiPjxwIGNsYXNzPVwibGluZTEwMFwiIHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7XCI+JyArIG9iaiArICc8L3A+PC9kaXY+PC9kaXY+JztcclxuXHJcbiAgICAkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmFwcGVuZCh0aXBodG1sKTtcclxuICAgICQoXCIjY29udGVudFwiKS5hcHBlbmQodGlwaHRtbCk7XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLnNob3coKTtcclxuICAgICQoXCIjb2t0aXBcIikuc2hvdygpO1xyXG59XHJcblxyXG4vL+S8oOmAkuaYvuekuueahOa2iOaBryzljIXlkKtESVblkI3np7BcclxuZnVuY3Rpb24gUG9wVGlwU2hvd0J5RGl2TmFtZShvYmopIHtcclxuICAgIHZhciB0aXBodG1sID0gJzxkaXYgY2xhc3M9XCJwb3AtdXAgZm9udDE0IGhpZGRlblwiIGlkPVwiZGl2Q29tbW9uUG9wVGlwU2hvd1wiPjxzcGFuIGNsYXNzPVwicG9wLWNsb3NlIGN1cnNvclwiPjwvc3Bhbj48ZGl2IGNsYXNzPVwicG9wLWNvbnRlbnRcIj48cCBjbGFzcz1cImxpbmUxMDBcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO1wiPicgKyBvYmogKyAnPC9wPjwvZGl2PjwvZGl2Pic7XHJcblxyXG4gICAgJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5hcHBlbmQodGlwaHRtbCk7XHJcbiAgICAkKFwiI2NvbnRlbnRcIikuYXBwZW5kKHRpcGh0bWwpO1xyXG4gICAgJChcIi5wb3AtbWFza1wiKS5zaG93KCk7XHJcbiAgICAkKFwiI2RpdkNvbW1vblBvcFRpcFNob3dcIikuc2hvdygpO1xyXG59XHJcblxyXG4vL+W8ueWHuuehruiupOahhlxyXG52YXIgT3BlbkNvbmZyaW1Qb3AgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAkKCdbY2xhc3M9XCJwb3AtdXAgZm9udDE0XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJwb3AtdXAgZm9udDE0XCI+PHNwYW4gY2xhc3M9XCJwb3AtY2xvc2UgY3Vyc29yXCI+PC9zcGFuPjxkaXYgY2xhc3M9XCJwb3AtY29udGVudFwiID4nICsgb2JqICsgJzwvZGl2PjxiciAvPjxiciAvPjxkaXYgY2xhc3M9XCJoYW5kbGVcIj4gPHNwYW4gY2xhc3M9XCJva1wiIGlkPVwiQ29uZnJpbVwiPuehruWumjwvc3Bhbj4gJm5ic3A7Jm5ic3A7Jm5ic3A7PHNwYW4gY2xhc3M9XCJva1wiIGlkPVwiQ2FuY2VsXCI+5Y+W5raIPC9zcGFuPiA8L2Rpdj48L2Rpdj4nO1xyXG4gICAgZGVidWdnZXI7XHJcbiAgICAkKFwiI2NvbnRlbnRcIikuYXBwZW5kKGh0bWwpO1xyXG4gICAgJChcIi5wb3AtbWFza1wiKS5zaG93KCk7XHJcbiAgICAkKFwiLnBvcC11cFwiKS5zaG93KCk7XHJcbn07XHJcbi8v5by55Ye656Gu6K6k5qGGXHJcbnZhciBvcmdPcGVuQ29uZnJpbVBvcCA9IGZ1bmN0aW9uIChvYmopIHtcclxuICAgIHZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJwb3AtdXAgZm9udDE0XCIgc3R5bGU9XCJoZWlnaHQ6YXV0bztcIj48c3BhbiBjbGFzcz1cInBvcC1jbG9zZSBjdXJzb3JcIj48L3NwYW4+PGJyLz48ZGl2IGNsYXNzPVwicG9wLWNvbnRlbnRcIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO21hcmdpbjozMHB4IDEwcHggMDtcIj4nICsgb2JqICsgJzwvZGl2PjxiciAvPjxiciAvPjxkaXYgY2xhc3M9XCJoYW5kbGVcIj4gPHNwYW4gY2xhc3M9XCJva1wiIGlkPVwiQ29uZnJpbVwiPuehruWumjwvc3Bhbj4gPC9kaXY+PC9kaXY+JztcclxuICAgICQoXCIjY29udGVudFwiKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLnNob3coKTtcclxuICAgICQoXCIucG9wLXVwXCIpLnNob3coKTtcclxufTtcclxuLy/lvLnlh7rnoa7orqTmoYYs5rKh5pyJ5Y+W5raI5oyJ6ZKuXHJcbnZhciBPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsID0gZnVuY3Rpb24gKG9iaix0aXRsZSxidG5pZCkge1xyXG4gICAgJCgnW2NsYXNzPVwicG9wLXVwIGZvbnQxNFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgaHRtbCA9ICcnO1xyXG4gICAgaWYgKHRpdGxlID09IHVuZGVmaW5lZCB8fCB0aXRsZT09XCJcIikge1xyXG4gICAgICAgIHRpdGxlID0gXCLph43nva7lr4bnoIFcIjtcclxuICAgIH1cclxuICAgIGlmIChidG5pZCA9PSB1bmRlZmluZWQgfHwgYnRuaWQgPT0gXCJcIikge1xyXG4gICAgICAgIGJ0bmlkID0gXCJDb25mcmltXCI7XHJcbiAgICB9XHJcbiAgICBkZWJ1Z2dlcjtcclxuICAgIGh0bWwgPSAnPGRpdiBjbGFzcz1cIm15cG9wdXAgZm9udDE0IGFkZFwiIGlkPVwiZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiPjxoNSBjbGFzcz1cImNlbnRlciBmb250MTYgcG9wdXBoZWFkXCIgc3R5bGU9XCJoZWlnaHQ6NDVweDtcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+JyArIHRpdGxlICsgJzwvc3Bhbj48aSBjbGFzcz1cInBvcGNsb3NlIGN1cnNvclwiPjwvaT48L2g1PjxkaXYgY2xhc3M9XCJwb3B1cGJveFwiIHN0eWxlPVwibWluLWhlaWdodDoxMjBweDt0ZXh0LWFsaWduOmNlbnRlcjtcIj48c3BhbiBjbGFzcz1cIm10MjBcIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lLWJsb2NrO1wiPjxzcGFuIGNsYXNzPVwiY29udGVudFwiPicgKyBvYmogKyAnPC9zcGFuPjxzcGFuPjxkaXYgY2xhc3M9XCJoYW5kbGUgbXQyMFwiPiA8c3BhbiBjbGFzcz1cIm9rIHN1Ym1pdFwiIGlkPVwiJyArIGJ0bmlkICsgJ1wiPuehruWumjwvc3Bhbj4gPC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgIGlmICgkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmFwcGVuZChodG1sKTtcclxuICAgIH0gZWxzZSBpZiAoJChcIiNtYWluLWNvbnRlbnRcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoXCIjbWFpbi1jb250ZW50XCIpLmFwcGVuZChodG1sKTtcclxuICAgIH1cclxuICAgICQoXCIucG9wLW1hc2tcIikuc2hvdygpO1xyXG4gICAgJChcIi5wb3AtdXBcIikuc2hvdygpO1xyXG4gICAgJChcIiNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCIpLmZpbmQoXCIucG9wY2xvc2VcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoXCIucG9wLW1hc2tcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucG9wLXVwXCIpLmhpZGUoKTtcclxuICAgICAgIFxyXG4gICAgfSk7XHJcbiAgICAkKCcjQ29uZnJpbScpLmNsaWNrKGZ1bmN0aW9uICgpIHsvL+W8oOi2iua3u+WKoOeahOWHveaVsFxyXG4gICAgICAgIGlmICgkKCcuY29udGVudCcpLnRleHQoKSAhPSAn6YeN572u5a+G56CB5ZCO77yM6K+l6LSm5Y+35a+G56CB5bCG5oGi5aSN5Yid5aeL5a+G56CB77yBJykge1xyXG4gICAgICAgICAgICAkKFwiI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wLW1hc2tcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBvcC11cFwiKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfSlcclxufTtcclxudmFyIE9wZW5Db25mcmltUG9wTm9DYW5jZTIgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICAkKCdbY2xhc3M9XCJwb3AtdXAgZm9udDE0XCJdJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxuICAgIHZhciBodG1sID0gJyc7XHJcbiAgICBodG1sID0gJzxkaXYgY2xhc3M9XCJteXBvcHVwIGZvbnQxNFwiIGlkPVwiZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiPjxoNSBjbGFzcz1cImNlbnRlciBmb250MTYgcG9wdXBoZWFkXCIgc3R5bGU9XCJoZWlnaHQ6NDVweDtcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5o+Q56S65raI5oGvPC9zcGFuPjxpIGNsYXNzPVwicG9wY2xvc2UgY3Vyc29yXCI+PC9pPjwvaDU+PGRpdiBjbGFzcz1cInBvcHVwYm94XCIgc3R5bGU9XCJtaW4taGVpZ2h0OjEyMHB4O3RleHQtYWxpZ246Y2VudGVyO1wiPjxzcGFuIGNsYXNzPVwibXQyMFwiIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7XCI+PHNwYW4gY2xhc3M9XCJjb250ZW50XCI+JyArIG9iaiArICc8L3NwYW4+PHNwYW4+PGRpdiBjbGFzcz1cImhhbmRsZSBtdDIwXCI+IDxzcGFuIGNsYXNzPVwib2sgc3VibWl0XCIgaWQ9XCJDb25mcmltXCI+56Gu5a6aPC9zcGFuPiA8L2Rpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgaWYgKCQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikubGVuZ3RoID4gMCkge1xyXG4gICAgICAgJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5hcHBlbmQoaHRtbCk7XHJcbiAgICB9IGVsc2UgaWYgKCQoXCIjbWFpbi1jb250ZW50XCIpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAkKFwiI21haW4tY29udGVudFwiKS5hcHBlbmQoaHRtbCk7XHJcbiAgICB9XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLnNob3coKTtcclxuICAgICQoXCIucG9wLXVwXCIpLnNob3coKTtcclxuICAgICQoXCIjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiKS5maW5kKFwiLnBvcGNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjZGl2UG9wT3BlbkNvbmZyaW1Qb3BOb0NhbmNlbFwiKS5yZW1vdmUoKTtcclxuICAgICAgICAkKFwiLnBvcC1tYXNrXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnBvcC11cFwiKS5oaWRlKCk7XHJcblxyXG4gICAgfSk7XHJcbiAgIFxyXG59O1xyXG4vLy/lvLnlh7rlpJrplb/ml7bpl7TlkI7mtojlpLFcclxudmFyIE9wZW5UaW1lSGlkZSA9IGZ1bmN0aW9uIChvYmosIHRpbWUpIHtcclxuICAgIC8vdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cInBvcHVwXCI+IDxoNSBjbGFzcz1cImNlbnRlciBmb250MTYgcG9wdXBoZWFkXCI+5raI5oGv5o+Q56S6PGkgY2xhc3M9XCJwb3BjbG9zZSBjdXJzb3JcIj48L2k+PC9oNT48ZGl2IGNsYXNzPVwicG9wdXBib3hcIj48ZGl2IGNsYXNzPVwiaGFuZGxlIGZvbnQxNCBhdXRvXCI+JyArIG9iaiArICc8L2Rpdj48L2Rpdj48L2Rpdj4nO1xyXG4gICAgdmFyIGh0bWwgPSAnICA8ZGl2IGNsYXNzPVwicG9wdXAgXCI+PGg1IGNsYXNzPVwiY2VudGVyIGZvbnQxNiBwb3B1cGhlYWRcIj4g5raI5oGv5o+Q56S6PGkgY2xhc3M9XCJwb3BjbG9zZSBjdXJzb3JcIj48L2k+PC9oNT48ZGl2IGNsYXNzPVwicG9wdXBib3hcIj48ZGl2IHN0eWxlPVwidGV4dC1hbGlnbjpjZW50ZXI7XCI+PGRpdiBjbGFzcz1cInN1Y2Nlc3MgYXV0b1wiIHN0eWxlPVwiZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXRvcDoyMHB4O1wiPjwvZGl2PjwvZGl2PjxkaXYgY2xhc3M9XCJoYW5kbGUgc3VjY2Vzc0xldHRlclwiPiA8c3BhbiBjbGFzcz1cIm10MjBcIj4nK29iaisnPC9zcGFuPjwvZGl2PjwvZGl2PjwvZGl2Pic7XHJcbiAgICAkKFwiI21haW4tY29udGVudC13cmFwcGVyXCIpLmFwcGVuZChodG1sKTtcclxuICAgICQoXCIucG9wdXBcIikuc2hvdygpO1xyXG4gIFxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5wb3B1cFwiKS5oaWRlKCk7XHJcbiAgICAgICAgZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICB9LCB0aW1lKTtcclxuXHJcbn07XHJcblxyXG4vLy/lvLnlh7rlpJrplb/ml7bpl7TlkI7mtojlpLEs5YyF5ZCrRElW5ZCN56ewXHJcbnZhciBPcGVuVGltZUhpZGVCeURpdk5hbWUgPSBmdW5jdGlvbiAob2JqLCB0aW1lLCBjb250YWluc0Rpdikge1xyXG4gICAgJCgnW2NsYXNzPVwicG9wLXVwIGZvbnQxNFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgICAvL3ZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJwb3B1cFwiPiA8aDUgY2xhc3M9XCJjZW50ZXIgZm9udDE2IHBvcHVwaGVhZFwiPua2iOaBr+aPkOekujxpIGNsYXNzPVwicG9wY2xvc2UgY3Vyc29yXCI+PC9pPjwvaDU+PGRpdiBjbGFzcz1cInBvcHVwYm94XCI+PGRpdiBjbGFzcz1cImhhbmRsZSBmb250MTQgYXV0b1wiPicgKyBvYmogKyAnPC9kaXY+PC9kaXY+PC9kaXY+JztcclxuICAgIHZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJwb3AtdXAgZm9udDE0IGhpZGRlbiBhZGR1cGRcIiBpZD1cImRpdkNvbW1vblBvcE9wZW5UaW1lSGlkZVwiPjxzcGFuIGNsYXNzPVwicG9wLWNsb3NlIGN1cnNvclwiPjwvc3Bhbj48ZGl2IGNsYXNzPVwicG9wLWNvbnRlbnRcIiAgc3R5bGU9XCJtYXJnaW46MzBweCAwO3dpZHRoOmF1dG87XCI+PHAgY2xhc3M9XCJsaW5lMTAwXCIgc3R5bGU9XCJ0ZXh0LWFsaWduOmNlbnRlcjtcIj4nICsgb2JqICsgJzwvcD48L2Rpdj48L2Rpdj4nO1xyXG4gICAgJChcIiNcIiArIGNvbnRhaW5zRGl2KS5hcHBlbmQoaHRtbCk7XHJcbiAgICAkKFwiI2RpdkNvbW1vblBvcE9wZW5UaW1lSGlkZVwiKS5zaG93KCk7XHJcbiAgICAkKFwiI2RpdkNvbW1vblBvcE9wZW5UaW1lSGlkZVwiKS5maW5kKFwiLnBvcC1jbG9zZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIiNkaXZDb21tb25Qb3BPcGVuVGltZUhpZGVcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIjZGl2Q29tbW9uUG9wT3BlblRpbWVIaWRlXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoJyNkaXZQb3BPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiI2RpdkNvbW1vblBvcE9wZW5UaW1lSGlkZVwiKS5oaWRlKCk7XHJcbiAgICAgICAgJChcIiNkaXZDb21tb25Qb3BPcGVuVGltZUhpZGVcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgLy8vLzIwMTYxMDIzMTYxNyBrbGdcclxuICAgICAgICAkKFwiLnBvcC1tYXNrXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLnBvcC11cFwiKS5oaWRlKCk7XHJcbiAgICAgICAgJCgnI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWwnKS5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAvLyAkKFwiI2RpdlBvcE9wZW5Db25mcmltUG9wTm9DYW5jZWxcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgLy8vXHJcbiAgICAgICAgLy9kb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgIH0sIHRpbWUpO1xyXG5cclxufTtcclxuXHJcbmZ1bmN0aW9uIFBvcFRpcEhpZGUoKSB7XHJcbiAgICAkKFwiLnBvcC11cFwiKS5oaWRlKCk7XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLmhpZGUoKTtcclxuICAgICQoXCIuYWRkXCIpLmhpZGUoKTtcclxuICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG59XHJcblxyXG5cclxuLy/mtYvor4TmqKHlnZdcclxudmFyIENvbmZyaW1FeGFtID0gZnVuY3Rpb24gKG9iaikge1xyXG4gICAgJCgnW2NsYXNzPVwicG9wLXVwIGZvbnQxNFwiXScpLmVhY2goZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwicG9wLXVwIGZvbnQxNFwiPjxzcGFuIGNsYXNzPVwicG9wLWNsb3NlIGN1cnNvclwiPjwvc3Bhbj48ZGl2IGNsYXNzPVwicG9wLWNvbnRlbnRcIj4nICsgb2JqICsgJzwvZGl2PjxiciAvPjxiciAvPjxkaXYgY2xhc3M9XCJoYW5kbGVcIj4gPHNwYW4gY2xhc3M9XCJva1wiIGlkPVwiQ29uZnJpbVwiPuaIkeimgeaUvuW8gzwvc3Bhbj4gJm5ic3A7Jm5ic3A7Jm5ic3A7PHNwYW4gY2xhc3M9XCJva1wiIGlkPVwiQ2FuY2VsXCI+57un57ut5L2c562UPC9zcGFuPiA8L2Rpdj48L2Rpdj4nO1xyXG4gICAgJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAkKFwiLnBvcC1tYXNrXCIpLnNob3coKTtcclxuICAgICQoXCIucG9wLXVwXCIpLnNob3coKTtcclxufTtcclxuXHJcblxyXG5cclxuZXhwb3J0cy5NYXNrU2hvdyA9IE1hc2tTaG93O1xyXG5leHBvcnRzLk1hc2tIaWRlID0gTWFza0hpZGU7XHJcbmV4cG9ydHMuUG9wVGlwU2hvdyA9IFBvcFRpcFNob3c7XHJcbmV4cG9ydHMuUG9wVGlwU2hvd0lkID0gUG9wVGlwU2hvd0lkOy8v5Y+q6K6pZGl25a+55bqU55qEaWTmmL7npLpcclxuZXhwb3J0cy5Qb3BUaXBIaWRlID0gUG9wVGlwSGlkZTtcclxuZXhwb3J0cy5PcGVuQ29uZnJpbVBvcCA9IE9wZW5Db25mcmltUG9wO1xyXG5leHBvcnRzLk9wZW5Db25mcmltUG9wTm9DYW5jZWwgPSBPcGVuQ29uZnJpbVBvcE5vQ2FuY2VsO1xyXG5leHBvcnRzLk9wZW5UaW1lSGlkZSA9IE9wZW5UaW1lSGlkZTtcclxuZXhwb3J0cy5Db25mcmltRXhhbSA9IENvbmZyaW1FeGFtO1xyXG5leHBvcnRzLk9wZW5UaW1lSGlkZUJ5RGl2TmFtZSA9IE9wZW5UaW1lSGlkZUJ5RGl2TmFtZTtcclxuZXhwb3J0cy5vcmdPcGVuQ29uZnJpbVBvcCA9IG9yZ09wZW5Db25mcmltUG9wO1xyXG5leHBvcnRzLk9wZW5Db25mcmltUG9wTm9DYW5jZTIgPSBPcGVuQ29uZnJpbVBvcE5vQ2FuY2UyO1xyXG4vL+WkhOeQhuW8ueWHuuahhueahOmakOiXj1xyXG4kKGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIjbWFpbi1jb250ZW50LXdyYXBwZXJcIikuZGVsZWdhdGUoXCIucG9wLWNsb3NlXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIucG9wLW1hc2tcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucG9wLXVwXCIpLmhpZGUoKTtcclxuICAgICAgICAvL2RvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNtYWluLWNvbnRlbnQtd3JhcHBlclwiKS5kZWxlZ2F0ZShcIi5wb3BjbG9zZVwiLCBcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKFwiLnBvcC1tYXNrXCIpLmhpZGUoKTtcclxuICAgICAgICAkKFwiLmFkZFwiKS5oaWRlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKFwiI2NvbnRlbnRcIikuZGVsZWdhdGUoXCIucG9wLWNsb3NlXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIucG9wLW1hc2tcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIucG9wLXVwXCIpLmhpZGUoKTtcclxuICAgICAgICAvL2RvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChcIiNjb250ZW50XCIpLmRlbGVnYXRlKFwiLnBvcGNsb3NlXCIsIFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoXCIucG9wLW1hc2tcIikuaGlkZSgpO1xyXG4gICAgICAgICQoXCIuYWRkXCIpLmhpZGUoKTtcclxuICAgIH0pO1xyXG5cclxuXHJcblxyXG59KTtcclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2pzL2xpYi9wb3B1cC9wb3B1cHRpcC5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDEyIDIxIDIzIDI3IDI4IiwiLy/lvLnlh7rliqDovb3lm77niYfpkojlr7nliJfooajkvKDpgJLlsYXkuK3lj4LmlbBcclxuZnVuY3Rpb24gU2hvd0xvYWRpbmdGb3JUYWJsZShvYmosIG51bSkge1xyXG4gICAgaWYgKG51bSA9PSB1bmRlZmluZWQgfHwgb2JqPT11bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBvYmouaHRtbCgnPHRyICBzdHlsZT1cImJvcmRlcjpub25lO3RleHQtYWxpZ246Y2VudGVyO2hlaWdodDoyODBweDtcIj48dGQgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7XCIgY29sc3Bhbj1cIicrbnVtKydcIj48ZGl2IGNsYXNzPVwiZGF0YV9pbWdcIj48ZGl2IGNsYXNzPVwiYmlnX2FyZWFcIiBzdHlsZT1cIm1hcmdpbi10b3A6MTBweDtsaW5lLWhlaWdodDozMHB4O1wiPicralF1ZXJ5KFwiI2RpdkxvYWRpbmdcIikuaHRtbCgpICsnPC9kaXY+PC9kaXY+PC90ZD48L3RyPicpO1xyXG59XHJcblxyXG5cclxuXHJcbi8v5by55Ye65Yqg6L295Zu+54mHXHJcbmZ1bmN0aW9uIFNob3dMb2FkaW5nKG9iaikge1xyXG4gICAgaWYgKG9iaiA9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBvYmouaHRtbChqUXVlcnkoXCIjZGl2TG9hZGluZ1wiKS5odG1sKCkpO1xyXG59XHJcblxyXG5cclxuZXhwb3J0cy5TaG93TG9hZGluZ0ZvclRhYmxlID0gU2hvd0xvYWRpbmdGb3JUYWJsZTsvL+mSiOWvuXRhYmxl5biD5bGA55qEXHJcbmV4cG9ydHMuU2hvd0xvYWRpbmcgPSBTaG93TG9hZGluZztcclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9saWIvcG9wdXAvc2hvd2xvYWRpbWcuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTIgMjEgMjMgMjcgMjgiLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7cmVxdWlyZSgnLi9TdHVEZXRhaWwyLnRwbCcpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ3NyYy90cGwvU3R1ZGVudE1hbmFnZS9TdHVEZXRhaWwnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVzY2FwZT0kdXRpbHMuJGVzY2FwZSxTdHVOYW1lPSRkYXRhLlN0dU5hbWUsTG9naW5JZD0kZGF0YS5Mb2dpbklkLEdlbmRlcj0kZGF0YS5HZW5kZXIsVGVsPSRkYXRhLlRlbCxHcmFkZUlkPSRkYXRhLkdyYWRlSWQsRWRpdGlvbk5hbWU9JGRhdGEuRWRpdGlvbk5hbWUsaW5jbHVkZT1mdW5jdGlvbihmaWxlbmFtZSxkYXRhKXtkYXRhPWRhdGF8fCRkYXRhO3ZhciB0ZXh0PSR1dGlscy4kaW5jbHVkZShmaWxlbmFtZSxkYXRhLCRmaWxlbmFtZSk7JG91dCs9dGV4dDtyZXR1cm4gJG91dDt9LENvdXJzZUluZm9MaXN0PSRkYXRhLkNvdXJzZUluZm9MaXN0LCRvdXQ9Jyc7JG91dCs9JyA8ZGl2PiA8c3BhbiBjbGFzcz1cIm1yMjBcIj48c3BhbiBjbGFzcz1cIndoaXRlXCI+5aeT5ZCNPC9zcGFuPuWnk+WQjTo8L3NwYW4+IDxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKFN0dU5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJtdDIwXCI+IDxzcGFuIGNsYXNzPVwibXIyMFwiPjxzcGFuIGNsYXNzPVwid2hpdGVcIj7otKblj7c8L3NwYW4+6LSm5Y+3Ojwvc3Bhbj4gPHNwYW4+ICc7XG4kb3V0Kz0kZXNjYXBlKExvZ2luSWQpO1xuJG91dCs9Jzwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJtdDIwXCI+IDxzcGFuIGNsYXNzPVwibXIyMFwiPjxzcGFuIGNsYXNzPVwid2hpdGVcIj7mgKfliKs8L3NwYW4+5oCn5YirOjwvc3Bhbj4gJztcbmlmKEdlbmRlcj09MSl7XG4kb3V0Kz0nIDxzcGFuPiDnlLc8L3NwYW4+ICc7XG59ZWxzZXtcbiRvdXQrPScgPHNwYW4+IOWlszwvc3Bhbj4gJztcbn1cbiRvdXQrPScgPC9kaXY+IDxkaXYgY2xhc3M9XCJtdDIwXCI+IDxzcGFuIGNsYXNzPVwibXIyMFwiPjxzcGFuIGNsYXNzPVwid2hpdGVcIj7miYvmnLo8L3NwYW4+5omL5py6Ojwvc3Bhbj4gPHNwYW4+JztcbiRvdXQrPSRlc2NhcGUoVGVsKTtcbiRvdXQrPSc8L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibXQyMFwiPiA8c3BhbiBjbGFzcz1cIm1yMjBcIj48c3BhbiBjbGFzcz1cIndoaXRlXCI+5bm057qnPC9zcGFuPuW5tOe6pzo8L3NwYW4+IDxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKCRoZWxwZXJzLiBHZXRCaWdHcmFkZShHcmFkZUlkICkpO1xuJG91dCs9Jzwvc3Bhbj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJtdDIwXCI+IDxzcGFuIGNsYXNzPVwibXIyMFwiPuaVmeadkOeJiOacrDo8L3NwYW4+IDxzcGFuPic7XG4kb3V0Kz0kZXNjYXBlKEVkaXRpb25OYW1lKTtcbiRvdXQrPSc8L3NwYW4+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibXQyMFwiPiA8c3BhbiBjbGFzcz1cIm1yMjBcIj7or77nqIvkv6Hmga86PC9zcGFuPiA8L2Rpdj4gPGRpdiBjbGFzcz1cInRhYmxlXCIgc3R5bGU9XCJtYXJnaW4tdG9wOjE1cHg7XCI+IDx0YWJsZSBjbGFzcz1cIndkMTAwXCI+IDx0cj4gPHRkPuaKpeePreivvueoizwvdGQ+IDx0ZD7nj63nuqc8L3RkPiA8dGQ+54+t5Li75Lu7PC90ZD4gPHRkPuivvuasoei/m+W6pjwvdGQ+IDx0ZD7mnInmlYjmnJ88L3RkPiA8dGQ+6K+76Z+zPC90ZD4gPC90cj4gJztcbmluY2x1ZGUoJy4vU3R1RGV0YWlsMicsQ291cnNlSW5mb0xpc3QpO1xuJG91dCs9JyA8L3RhYmxlPiA8L2Rpdj4gJztcbnJldHVybiBuZXcgU3RyaW5nKCRvdXQpO1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdHBsL1N0dWRlbnRNYW5hZ2UvU3R1RGV0YWlsLnRwbFxuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAyNyIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCdzcmMvdHBsL1N0dWRlbnRNYW5hZ2UvU3R1RGV0YWlsMicsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZWFjaD0kdXRpbHMuJGVhY2gsJHZhbHVlPSRkYXRhLiR2YWx1ZSwkaW5kZXg9JGRhdGEuJGluZGV4LCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsJG91dD0nJzskb3V0Kz0nICc7XG4kZWFjaCgkZGF0YSxmdW5jdGlvbigkdmFsdWUsJGluZGV4KXtcbiRvdXQrPScgPHRyPiA8dGQ+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLkNvdXJzZU5hbWUpO1xuJG91dCs9JzwvdGQ+IDx0ZD4nO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuQ2xhc3NOYW1lKTtcbiRvdXQrPSc8L3RkPiA8dGQ+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLlRlYWNoTmFtZSk7XG4kb3V0Kz0nPC90ZD4gPHRkPiAnO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUuSGF2ZU51bWJlcik7XG4kb3V0Kz0n6K++5pe2Lyc7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5Cb29rTnVtYmVyKTtcbiRvdXQrPSfor77mrKEgPC90ZD4gJztcbmlmKCR2YWx1ZS5Jc1dhcm49PTEpe1xuJG91dCs9JyA8dGQgY2xhc3M9XCJyZWRcIj4g6L+H5pyfIDwvdGQ+ICc7XG59ZWxzZXtcbiRvdXQrPScgPHRkPiAnO1xuJG91dCs9JGVzY2FwZSgkaGVscGVycy4gZGF0ZUZvcm1hdCgkdmFsdWUuRXhwaXJlVGltZSAsICBcInl5eXktTU0tZGRcIikpO1xuJG91dCs9JyA8L3RkPiAnO1xufVxuJG91dCs9JyAnO1xuaWYoJHZhbHVlLklzRW5nPT0xKXtcbiRvdXQrPScgPHRkPiDoi7HlvI/or7vpn7MgPC90ZD4gJztcbn1lbHNle1xuJG91dCs9JyA8dGQ+IOe+juW8j+ivu+mfsyA8L3RkPiAnO1xufVxuJG91dCs9JyA8L3RyPiAnO1xufSk7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3RwbC9TdHVkZW50TWFuYWdlL1N0dURldGFpbDIudHBsXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDI3Il0sInNvdXJjZVJvb3QiOiIifQ==