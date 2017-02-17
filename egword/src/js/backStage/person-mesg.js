
//后台交互
require("../../tpl/template-helpers.js");
var pop = require("../lib/popup/popuptip.js");
var loadimg = require("../lib/popup/showloadimg.js");
var Paginator = require('../lib/page/Paginator.js');
var commJs = require("../lib/util.js");//公共方法
var calender = require('../lib/calendar/calender-plugin.js');
//require('../lib/calendar/calender-plugin.min.css');
var tplTablePerDetail = require("PersonManage/PersonDetail.tpl");//员工模板
var dataId = $("#perId").val();


var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        //加载
        GetPerSingle();

    },
    initBtns: function () {

        //编辑跳转
        $("body").delegate("#btnPerEdite", "click", function () {
            window.location.href = "/Org/PersonManage/PersonEdit/" + dataId;

        });
        //禁用员工
        $("body").delegate("#btnBand", "click", function () {

            //pop.OpenConfrimPop("确认禁用");

            //return;
            var subVal = $("#btnBand").attr("data-id");
           
            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/PersonManage/ResetAccount",
                dataType: "json",
                data: {

                    perId: dataId, type: 1, val: subVal
                },
                success: function (data) {

                    if (data && data.Data > 0) {
                        GetPerSingle();
                        alert("操作成功");

                    } else {
                        alert("操作失败");
                    }



                }
            });


        });
        //重置密码
        $("body").delegate("#btnReset", "click", function () {

            //提交表单
            $.ajax({
                type: "post",
                url: "/Org/PersonManage/ResetAccount",
                dataType: "json",
                data: {

                    perId: dataId, type: 0
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

   

        //展示完的确定的删除弹窗
        $("body").delegate("#btnloginOk", "click", function () {
            $(".eg-pop .close").click();//关闭弹窗
        });




    }


};

//绑定数据
$(function () {
    module.init();



});


//发送请求调取数据
function GetPerSingle() {
    debugger;
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/PersonManage/GetPerSingle",
        dataType: "json",
        data: {
            data: dataId//员工id

        },
        success: function (data) {

            //$("#divLoading").hide();
            if (data.OK) {

                $("#perTb").html(tplTablePerDetail(data.Data));
                if (data.Data.IsFrozen==1) {
                    $("#btnBand").html("启用");
                    $("#btnBand").attr("data-id",0);
                } else {
                    $("#btnBand").html("禁用");
                    $("#btnBand").attr("data-id", 1);
                }

            }
            else {

                $("#perTb").html("");
                alert("获取数据失败");

            }
        }
    });

}


