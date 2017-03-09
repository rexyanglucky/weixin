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

	//后台交互
	//发送请求调取数据绑定下拉框
	var arrTbk = [];//同步课
	var arrBj = [];//班级
	var arrTjr = [];//推荐人，老师
	var tplTableStuDetail = __webpack_require__(25);//学生详情
	var stuId = $("#stuId").val();//学生id  stuEditionId
	var stuEditionId = $("#stuEditionId").val();//教材id
	var grade;//年级
	var stuName;//学生姓名
	__webpack_require__(9);
	var pop = __webpack_require__(11);
	var loadimg = __webpack_require__(12);
	var commJs = __webpack_require__(8);//公共方法
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
	            window.location.href = "/Org/StudentManage/EditStu/" + stuId + "-" + stuEditionId;
	            //"?stuId=" + stuId;//跳转

	        });

	        //重置密码
	        $("body").delegate("#reSetPwd", "click", function () {
	            pop.OpenConfrimPop("重置后,密码为:000000", "ConfrimReset","重置提示");
	           

	        });
	        //确定重置
	        $("body").delegate("#ConfrimReset", "click", function() {
	            
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
	                        $(".small-popbtn").remove();
	                        pop.PopTipShow("重置成功","密码重置");

	                    } else {
	                      
	                        pop.PopTipShow("重置失败", "密码重置");
	                    }



	                }
	            });


	        });

	        //账号冻结
	        var strFree = "1";
	        $("body").delegate("#accountFreeze", "click", function () {
	            

	            strFree = $("#accountFreeze").attr("data-id");
	            if (strFree == "1") {
	                pop.OpenConfrimPop("禁用后,此账号将无法登陆", "Confrim", "禁用提示");
	                
	            } else {
	                pop.OpenConfrimPop("确认启用学生账号?", "Confrim", "启用提示");
	            }
	           
	            


	        });
	        //确定冻结
	        $("body").delegate("#Confrim", "click", function () {
	            //提交表单
	            $.ajax({
	                type: "post",
	                url: "/Org/StudentManage/ResetStuAccount",
	                dataType: "json",
	                data: {

	                    stuId: stuId, type: 1, val: strFree
	                },
	                success: function (data) {
	                    GetStuDetailData();
	                    if (data && data.Data > 0) {
	                        $(".small-popbtn").remove();
	                        pop.PopTipShow("操作成功");

	                    } else {
	                        pop.PopTipShow("操作失败");
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
	           
	            if ($("#stuCourse .active").length < 1 || $("#drop_cc").attr("data-id")=="0") {

	                return;//无课程
	            }
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
	            $("#addCourseNum").val("");//置空
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
	           
	            if (addNum == "" || parseInt(addNum)<1) {
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
	            $("#backReason").val("");//清空
	            var strGrade = commJs.numGradeTran(parseInt(grade));
	            $("#backStuName").html(stuName + "(" + strGrade + ")");//张三（七年级）
	            $('.pop-mask').show();
	            $("#sing-out").show();

	        });
	        

	        //退课的取消
	        $("body").delegate("#backCancel", "click", function () {
	            $("#sing-out").hide();
	            $('.pop-mask').hide();

	        });


	         //退课的提交
	        $("body").delegate("#backBtn", "click", function () {

	            
	            var jsonAdd = {};
	            jsonAdd.StuId = stuId;
	            var orgCourse = $("#drop_backC").attr("data-id");
	            if (orgCourse=="0") {
	                return;
	            }
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
	            if ($("#AddCourseRead").hasClass("active")) {
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

	          
	            if (data.Data) {
	                $("#tb").html(tplTableStuDetail(data.Data));
	                grade = data.Data.GradeId;
	                stuName = data.Data.StuName;
	                if (data.Data.IsFrozen==1) {
	                    $("#accountFreeze").html("账号启用");
	                    $("#accountFreeze").attr("data-id","0");
	                } else {
	                    $("#accountFreeze").html("账号冻结");
	                    $("#accountFreeze").attr("data-id", "1");
	                }


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
	                arrTemp.push({
	                    name: "请选择", id: 0, pid: 0
	                });//课程
	                for (var i = 0; i < data.Data.length; i++) {

	                    arrTemp.push({
	                        name: data.Data[i].StrClassName, id: data.Data[i].StrSchoolAndClassId, pid: data.Data[i].ClassId
	                    });//课程
	                }

	                if (obj == 2) {//调班的
	                    lui.initDropDownList({ warpid: "drop_cc", width: 200, nameField: 'name', idField: 'id', data: arrTemp, subtextlength: 15 });
	                    loadCourseRad();//加载学生已报的课程

	                } else {
	                    lui.initDropDownList({ warpid: "drop_class", width: 200, subtextlength: 15, nameField: 'name', idField: 'id', data: arrTemp });//报课的班级
	                    loadCourse(1);
	                }

	            }
	            else {

	                if (obj == 2) {//调班的
	                    lui.initDropDownList({ warpid: "drop_cc", width: 200, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0' }], subtextlength: 15 });
	                    loadCourseRad();//加载学生已报的课程

	                } else {
	                    lui.initDropDownList({ warpid: "drop_class", width: 200, subtextlength: 15, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0' }] });//报课的班级
	                    loadCourse(1);
	                }

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



	                lui.initDropDownList({ warpid: "drop_course", width: 200, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: loadCourseData, subtextlength:15 });//同步课程，需要进行联动

	                $("#lessonNumber").html(arrTemp[0].id.split('-')[1]);
	                $("#lessonTime").html(arrTemp[0].id.split('-')[2] + "次");
	                $("#lessonPrice").html(arrTemp[0].id.split('-')[3] + "元");
	                //$("#actuPrice").html(arrTemp[0].id.split('-')[4] + "元");
	                loadTeachers();//加载推荐人

	            }
	            else {

	                lui.initDropDownList({ warpid: "drop_course", width: 200, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }], selectedCallBack: loadCourseData, subtextlength: 15 });//同步课程，需要进行联动

	                $("#lessonNumber").html(0);
	                $("#lessonTime").html(0 + "次");
	                $("#lessonPrice").html(0 + "元");
	                //$("#actuPrice").html(0+ "元");
	                loadTeachers();//加载推荐人

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
	                        strHtml += '<label style="" class="lbCourse" data-type="0" data-id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId + "-" + data.Data[i].ClassName + "-" + data.Data[i].IsEng + '><span data-type="0" class="radio active" style="margin-right:15px;" id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId + "-" + data.Data[i].ClassName + "-" + data.Data[i].IsEng + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';
	                        $("#currentClass").html(data.Data[i].ClassName);//目前班级
	                        $("#currentClass").attr("data-id", data.Data[i].ClassId);
	                       

	                    } else {
	                        strHtml += '<label style="" class="lbCourse" data-type="0" data-id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId + "-" + data.Data[i].ClassName + "-" + data.Data[i].IsEng + '><span data-type="0"  class="radio " style="margin-right:15px;" id=' + data.Data[i].CourseId + "-" + data.Data[i].ClassId + "-" + data.Data[i].ClassName + "-" + data.Data[i].IsEng + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';

	                    }
	                }
	                if (obj == 2) {
	                   
	                    $("#updateReadCourse").html(strHtml);
	                    //updateRead
	                    $('#change-prounce .spans ').removeClass('active');
	                    
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

	                $("#stuCourse").html("<span>无</span>");

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
	                        strHtml += '<label style="width:50%;display:inline-block;font-size:14px;" class="lbCourse" data-type="1" data-id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + '><span data-type="1"  class="radio active" style="margin-right:15px;" id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';
	                        $("#currentCourseNumber").html(data.Data[i].HaveNumber + "/" + data.Data[i].BookNumber + "课次");//目前班级
	                        $("#currentCourseNumber").attr("data-id", data.Data[i].HaveNumber + "-" + data.Data[i].CourseId);

	                    } else {
	                        strHtml += '<label style="width:50%;display:inline-block;font-size:14px;" class="lbCourse" data-type="1" data-id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + '><span data-type="1"  class="radio " style="margin-right:15px;" id=' + data.Data[i].CourseId + "-" + data.Data[i].HaveNumber + "-" + data.Data[i].BookNumber + '></span><span class="left15">' + data.Data[i].CourseName + '</span></label>';

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
	                    warpid: "drop_backC", width: 200, nameField: 'name', idField: 'id', data: arrTemp, selectedCallBack: loadCourseDataBack,subtextlength: 15
	                });//同步课程，需要进行联动

	                $("#backCourse").html(arrTemp[0].id.split('-')[1] + "/" + arrTemp[0].id.split('-')[2] + "课次");//显示的课程进度


	            }
	            else {

	                lui.initDropDownList({
	                    warpid: "drop_backC", width: 200, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }], selectedCallBack: loadCourseDataBack, subtextlength: 15
	                });//同步课程，需要进行联动
	                $("#backCourse").html("0/0课次");//显示的课程进度

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
	                    warpid: "drop_tjr", width: 200, nameField: 'name', idField: 'id', data: arrTjr
	                });//推荐人


	            }
	            else {

	                lui.initDropDownList({
	                    warpid: "drop_tjr", width: 200, nameField: 'name', idField: 'id', data: [{ name: '无', id: '0', pid: '' }]
	                });//推荐人

	            }
	        }
	    });

	}


	//进行联动课程的选择
	function loadCourseData() {
	    var jsData = $("#drop_course").attr("data-id");//组合的数据进行联动

	    if (jsData.length > 0) {
	        $("#lessonNumber").html(jsData.split('-')[1]);
	        $("#lessonTime").html(jsData.split('-')[2] + "次");
	        $("#lessonPrice").html(jsData.split('-')[3] + "元");
	        //$("#actuPrice").html(jsData.split('-')[4] + "元");
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
	var tool = __webpack_require__(6);
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
/* 8 */
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
	            default:
	                return t;


	        }

	        return t;
	    }, IsMobile: function(t) {
	        return (/^1[3|4|5|7|8]\d{9}$/.test(t));//校验手机的格式
	    }
	}

/***/ },
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
/* 11 */
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
	function PopTipShow(obj,title) {
	    $(".small-pop").each(function () {

	        $(this).remove();
	    });

	    if (title == undefined) {
	        title = "提示消息";
	    }
	    var tiphtml = '<div class="eg-pop small-pop" > <div class="header"> ' + title + '<span class="close"></span> </div> <div class="body">' + obj + ' </div> </div>';

	   
	    $("body").append(tiphtml);
	    $(".pop-mask").show();
	    $(".small-pop").show();
	}



	//弹出确认框
	var OpenConfrimPop = function (obj,btnId,title) {
	    $('[class="pop-up font14"]').each(function () {

	        $(this).remove();
	    });

	    if (title==undefined) {
	        title ="提示消息";
	    }
	   
	    var html = '<div class="eg-pop small-popbtn" > <div class="header"> ' + title + '<span class="close"></span> </div> <div class="body"> ' + obj + ' </div> <div class="footer"> <span class="operatBtn left" id="' + btnId + '" style="margin-left:50px;">确定</span> <span class="operatBtn right" id="Cancel" style="margin-right:50px;">取消</span> </div> </div>';
	    debugger;
	    $("body").append(html);
	    $(".pop-mask").show();
	    $(".small-popbtn").show();
	};

	function PopTipHide() {
	    $(".pop-up").hide();
	    $(".pop-mask").hide();
	    $(".add").hide();
	    document.location.reload();
	}

	exports.MaskShow = MaskShow;
	exports.MaskHide = MaskHide;
	exports.PopTipShow = PopTipShow;
	exports.PopTipHide = PopTipHide;
	exports.OpenConfrimPop = OpenConfrimPop;

	//处理弹出框的隐藏
	$(function () {
	    $("body").delegate(".close,#Cancel", "click", function () {
	        $(".small-popbtn").hide();
	        $(".small-pop").hide();
	        $(".pop-mask").hide();
	        //document.location.reload();
	    });

	   



	});



/***/ },
/* 12 */
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
/* 24 */,
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);__webpack_require__(26);
	module.exports=template('src/tpl/StudentManage/StuDetail',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,StuName=$data.StuName,LoginId=$data.LoginId,Gender=$data.Gender,Tel=$data.Tel,GradeId=$data.GradeId,EditionName=$data.EditionName,include=function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);$out+=text;return $out;},CourseInfoList=$data.CourseInfoList,$out='';$out+=' <div> <span class="mr20">姓&emsp;&emsp;名:</span> <span>';
	$out+=$escape(StuName);
	$out+='</span> </div> <div class="mt20"> <span class="mr20">账&emsp;&emsp;号:</span> <span> ';
	$out+=$escape(LoginId);
	$out+='</span> </div> <div class="mt20"> <span class="mr20">性&emsp;&emsp;别:</span> ';
	if(Gender==1){
	$out+=' <span> 男</span> ';
	}else{
	$out+=' <span> 女</span> ';
	}
	$out+=' </div> <div class="mt20"> <span class="mr20">手&emsp;&emsp;机:</span> <span>';
	$out+=$escape(Tel);
	$out+='</span> </div> <div class="mt20"> <span class="mr20">年&emsp;&emsp;级:</span> <span>';
	$out+=$escape($helpers. GetBigGrade(GradeId ));
	$out+='</span> </div> <div class="mt20"> <span class="mr20">教材版本:</span> <span>';
	$out+=$escape(EditionName);
	$out+='</span> </div> <div class="mt20"> <span class="mr20">课程信息:</span> </div> <div class="table" style="margin-top:15px;"> <table class="wd100"> <tr> <td>报班课程</td> <td>班级</td> <td>班主任</td> <td>课次进度</td> <td>有效期</td> <td>读音</td> </tr> ';
	include('./StuDetail2',CourseInfoList);
	$out+=' </table> </div> ';
	return new String($out);
	});

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
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
	$out+='课次/';
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