
//后台交互
//发送请求调取数据绑定下拉框
var arrJxd = [];//教学点
var arrBj = [];//班级
var arrTbk = [];//同步课
var tplTableStu = require("StudentManage/StudentManageList.tpl");//学生列表
var stuGrade = 0;//年级
var stuId;//学生id
var stuEditionId;//学生id
require("../../tpl/template-helpers.js");
var pop = require("../lib/popup/popuptip.js");
var loadimg = require("../lib/popup/showloadimg.js");
var Paginator = require('../lib/page/Paginator.js');
var commJs = require("../lib/util.js");//公共方法
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
var Lui = require('../../LUI/js/lui');
var tool = require('../../LUI/tool');
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


