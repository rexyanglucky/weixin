
//后台交互
require("../../tpl/template-helpers.js");

var openId = $("#openId").val();
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {

     


    },
    initBtns: function () {
        //todo 绑定事件


        //首页的跳转
        $("body").delegate("#menuId", "click", function () {

           // $.router.load("/Parents/ParentMenu/Index", true);//处理跳转

            window.location.href = "/Parents/ParentMenu/Index";


        });


        //解绑的操作
        $("body").delegate("#unbindAccount", "click", function () {//解除绑定


            $.confirm("确定解除绑定此学生吗？", function () { UnBindStuAccount(); }, function () {  });
          // alert("确定要解除绑定");


        });
      


    }


};

//绑定数据
$(function () {
    module.init();

    if (openId == "0" || openId == "") {
        $.router.load("/Parents/ParentMenu/BindStuAccount", true); //处理跳转

    }

});




//解除绑定
function UnBindStuAccount() {
   
    $("#divLoading").show();
    //加载列表
    $.ajax({
        type: "post",
        url: "/Parents/ParentMenu/BindAccount",
        dataType: "json",

        data: {
            openId: openId, type: 1//0绑定1解绑

        },
        success: function (data) {
            $("#divLoading").hide();
          
            //$("#divLoading").hide();
            if (data.Data && data.Data.length > 0) {
                
                $.router.load("/Parents/ParentMenu/BindStuAccount", true); //处理跳转
           
            }
            else {
                $.alert("绑定失败!", "提示");


            }
        }
    });

}




