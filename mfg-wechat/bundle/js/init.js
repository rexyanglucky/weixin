//$(document).on('ajaxBeforeSend',function(e,xhr,options){
//    console.log("here is ajaxBeforSend\r\n");
//    var openid=sessionStorage.getItem('openid');
//     var appid= sessionStorage.getItem('appid');
//
//    xhr.setRequestHeader("openid",openid);
//    xhr.setRequestHeader("appid",appid);
//    //xhr. setRequestHeader('X-Request-With', null)
//
//});
//$(function(){
    var u=require('util/util');
    var appid=u.getQueryString('a');
    var appsecret= u.getQueryString('b');
    var code= u.getQueryString('code');
    //测试用
    //var appid='wx5be5cfaafdd810b4';
    //var appsecret='test';
    //var code='test';
    if(appid&&appsecret&&code)
    { var openid=sessionStorage.getItem('openid');
        if(!openid||openid=='undefined')
        {
            openid=u.getOpenId(appid,appsecret,code);
        }
        if(openid||openid!='undefined') {
            sessionStorage.setItem('openid', openid);
            sessionStorage.setItem('appid', appid);
        }
    }
    else
    {
        //如果url中没有appid,appsecret,code 则说明该页面不是从菜单页跳转，已经有openid了
    }
checkIsBind();
function checkIsBind()
{
    var param = {
        AppID: sessionStorage.getItem('appid'),
        OpenID: sessionStorage.getItem('openid')
    };
    $.ajax({
        type: 'post',
        url: u.getApiUrl('Account/GetInit'),
        data: param,
        dataType: 'json',
        success: function (data) {
            if (data) {
                if (data.OK) {
                    //window.location.href='lookInfo.html';
                    //return;
                }
                else {
                    window.location.href='bindInfo.html';
                    //var d=data.N;
                    //if(d.MfgID&&d.MfgID>0)
                    //{
                    //    $("#stuid").val(d.MfgID);
                    //    $("#stupwd").val('');
                    //    $("#fname").val(d.ParentName);
                    //    $("#fphone").val(d.ParentPhone);
                    //}
                }
            }
        }
    });
}
//})





