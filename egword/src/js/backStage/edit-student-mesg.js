//后台交互
var stuId = $("#stuId").val();//学生id  stuEditionId
var commJs = require("../lib/util.js");//公共方法
var gradeArr = [{ name: '一年级', id: '1', pid: '' }, { name: '二年级', id: '2', pid: '00' }, { name: '三年级', id: '3', pid: '00' }, { name: '四年级', id: '4', pid: '00_01' }, { name: '五年级', id: '5', pid: '00_01' }, { name: '六年级', id: '6', pid: '00_02' }, { name: '七年级', id: '7', pid: '00_02' }, { name: '八年级', id: '8', pid: '' }, { name: '九年级', id: '9', pid: '00' }, { name: '高一', id: '10', pid: '00' }, { name: '高二', id: '11', pid: '00_01' }, { name: '高三', id: '12', pid: '00_01' }];
var Lui = require('../../LUI/js/lui');
var tool = require('../../LUI/tool');
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










