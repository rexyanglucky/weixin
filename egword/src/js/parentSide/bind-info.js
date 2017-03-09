
var module = {
    init: function () {
        //todo 逻辑函数
        this.render();
        this.initBtns();
    },

    render: function () {
        //账号绑定
       

    },
    initBtns: function () {
        //todo 绑定事件


        

        //绑定
        $("body").delegate("#btnBind", "click", function () {
            var stuAccount = $("#stuAccount").val().trim();
            var stuPwd = $("#stuPwd").val().trim();

            if (stuAccount.length < 1) {
                $.alert("请输入正确账号或密码!", "提示");
                return;
                // $.confirm("确定解除绑定此学生吗？", function () { alert("ok") }, function () { alert("cancel") });
            }
            if (stuPwd.length < 1) {

                $.alert("请输入正确账号或密码!", "提示");
                return;
            }
          
            BindStuAccount(stuAccount, stuPwd);
        });
        


    }


};
var openId = $("#openId").val();
var stuId = $("#stuId").val();
//绑定数据
$(function () {
    module.init();
   
    if (stuId != "0" && stuId != "") {
       // $.router.load("/Parents/ParentMenu/UnBindStuAccount/" + openId, true);//处理跳转
        window.location.href = "/Parents/ParentMenu/UnBindStuAccount/" + openId;
        
    } 



});



//绑定
function BindStuAccount(a, b) {
   
    $("#divLoading").show();
    //加载列表
    $.ajax({
        type: "post",
        url: "/Parents/ParentMenu/BindAccount",
        dataType: "json",

        data: {
            loginAccount: a, loginPwd: b, openId: openId, type: 0//0绑定1解绑

        },
        success: function (data) {
          
           
            //$("#divLoading").hide();
            if (data.Data && data.Data == 1) {
                $("#openId").val(data.TagValue);//赋值
                $.toast('绑定成功', 2000, 'pop-toast');
                this.setTimeout(function () {
                    $.router.load("/Parents/ParentMenu/Index/" + data.TagValue, true);//处理跳转

                }, 1000);


              


            }
            else {
                $.alert(data.Data, "提示");


            }
        }
    });

}




