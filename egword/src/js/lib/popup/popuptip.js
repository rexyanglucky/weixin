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

