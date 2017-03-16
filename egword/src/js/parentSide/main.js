
var openId = $("#openId").val();
var stuId = $("#stuId").val();
$(function() {
   
    document.title = '家长端';
    if (stuId == "0" || stuId == "") {
        //$.router.load("/Parents/ParentMenu/BindStuAccount", true); //处理跳转

        window.location.href = "/Parents/ParentMenu/BindStuAccount/" + openId;


    }
});

