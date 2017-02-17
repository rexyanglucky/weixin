
var tool=require('../../LUI/tool');
//单选按钮
tool.radio();
//添加员工的弹出层事件
tool.pophide($('.eg-pop .close'),$('.eg-pop'));
tool.popshow($('.addstuff'),$('#addStuff'));
var Lui=require('../../LUI/js/lui');
var lui = new Lui();
var arrJxd = [];//教学点的数组
//角色
lui.initDropDownList({ warpid: "drop_role", width: 260, nameField: 'name', idField: 'id', subtextlength:15, data: [{ name: '教学点管理员', id: '3', pid: '' }, { name: '老师', id: '4', pid: '00' }] });
//校区
//lui.initDropDownList({ warpid: "drop_sc", width: 260, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });


//后台交互
require("../../tpl/template-helpers.js");
var pop = require("../lib/popup/popuptip.js");
var loadimg = require("../lib/popup/showloadimg.js");
var Paginator = require('../lib/page/Paginator.js');
var commJs = require("../lib/util.js");//公共方法

var calender = require('../lib/calendar/calender-plugin.js');
//require('../lib/calendar/calender-plugin.min.css');
var tplTablePer = require("PersonManage/PersonManageList.tpl");//员工模板



var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        //加载列表
        GetPerData();

    },
    initBtns: function () {
        //todo 绑定事件
        //搜索
        $("body").delegate("#searchImg", "click", function () {
            GetPerData();

        });

      
        //详情页跳转
        $("body").delegate(".see-detail", "click", function () {

            var dataId = $(this).attr("data-id");
            window.location.href = "/Org/PersonManage/PersonDetail/" + dataId;

        });
        //添加员工的按钮
        $("body").delegate(".addstuff", "click", function () {

            $("#addStuff").show();
            $(".pop-mask").show();
            //日期控件初始化
            calender("#txtEnterTime");//dateFormat: 'yyyy-MM-dd hh:mm:ss'
            //加载校区
            loadSchools();


        });
     
        //添加员工的确定请求
        $("body").delegate("#btnAddPer", "click", function () {
           
            var jsonAdd = {};
            jsonAdd.UserName = escape($.trim($("#txtPreName").val()));
            jsonAdd.Tel = escape($.trim($("#txtTel").val()));
            if ($("#sexMan").hasClass("active")) {
                jsonAdd.Gender = 1;//1为男，0为女
            } else {
                jsonAdd.Gender = 0;
            }
            jsonAdd.EnterTime = $.trim($("#txtEnterTime").val());//入职时间
            jsonAdd.UserRole = $("#drop_role").attr("data-id");//角色
            jsonAdd.SchoolId = $("#SchoolId").attr("data-id");//校区id

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
                            url: "/Org/PersonManage/AddOrgPre",
                            dataType: "json",
                            data: {

                                data: JSON.stringify(jsonAdd)
                            },
                            success: function (data) {

                                //进行显示赋值
                                $("#orgName").html($("#txtPreName").val().trim());//名不要加密过的
                                $("#loginId").html(data.Data);//登录账号
                                $("#loginTel").html(jsonAdd.Tel);//电话

                                $("#addStuff").hide();
                                $("#addstuff-success").show();
                                $('.pop-mask').show();
                               

                            }
                        });
                    } else {
                        alert("电话重复");
                    }

                }
            });



        });

        //处理单选男
        $("body").delegate("#lbMan,#lbWman", "click", function () {
           
            var type = $(this).attr("data-id");
            $('.radio').removeClass('active');
            if (type == 1) {
                
                $("#sexMan").addClass('active');
                
            } else {
                $("#sexWMan").addClass('active');
            }
           
            
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
function GetPerData(page) {
    //$("#divLoading").show();
    loadimg.ShowLoadingForTable($("#tb"), 4);
    if (page == undefined) {
        page = 1;
    }

    var pageSize = 10;
    //加载列表
    $.ajax({
        type: "post",
        url: "/Org/PersonManage/GetPerList",
        dataType: "json",
        data: {
            data: escape($("#txtserch").val()), PageIndex: page, PageSize: pageSize

        },
        success: function (data) {

            //$("#divLoading").hide();
            if (data.Data && data.Data.length > 0) {
                
                $("#tb").html(tplTablePer(data.Data));
                $("#Totalcount").html(data.PageSum);
                $("#bandTotalcount").html(data.TagValue);//禁用
                Paginator.Paginator(pageSize, page, data.PageSum, GetPerData);
                //日期控件
                calender("#txtEnterTime");
            }
            else {

                $("#tb").html("");
                //<img src="../../../bundle/img/noclass.png" style="text-align:center;">
                $("#tb").html('<tr  style="border:none;text-align:center;height:280px;"><td style="font-size: 16px;" colspan="8"><div class="data_img"><div class="big_area" style="margin-top:10px;line-height:30px;"><br/><span>暂无数据！</span></div></div></td></tr>');//清空数据
                $("#pagination").html("");//分页控件不显示
                $("#Totalcount").html(0);//数据设置为0
                $("#bandTotalcount").html(0);//禁用

            }
        }
    });

}


//加载学校下拉
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
                //arrJxd.push({
                //    name: "全部", id: 0, pid: 0
                //});//学校
                for (var i = 0; i < data.Data.length; i++) {

                    arrJxd.push({ name: data.Data[i].SchoolName, id: data.Data[i].SchoolId, pid: data.Data[i].SchoolId });
                }

                lui.initDropDownList({ warpid: "drop_sc", width: 260, nameField: 'name', idField: 'id', data: arrJxd, selectedCallBack: null });//学校和班级的联动
              
            }
            else {

                //alert("获取数据失败");

            }
        }
    });

}

