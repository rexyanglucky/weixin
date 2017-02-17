

$(function () {

    $("#btn-submit").click(function () {
        var pwdold = $("#b-pwdold").val().trim();
        var pwdnew1 = $("#b-pwdnew1").val().trim();
        var pwdnew2 = $("#b-pwdnew2").val().trim();
        var showtip = "";
          $("#showtip").html(showtip);
        if (!isPasswd(pwdold)) {
            showtip = "请输入正确格式的原密码!";
            $("#showtip").html(showtip);
            return;
        }
        if (!isPasswd(pwdnew1) || !isPasswd(pwdnew2)) {
            showtip = "请输入正确格式的新密码!";
            $("#showtip").html(showtip);
            return;
        }
        if (pwdnew1 != pwdnew2) {
            showtip = "两次输入的新密码不一致!";
            $("#showtip").html(showtip);
            return;
        }


        $.ajax({
            type: "post",
            url: "/teacher/myinfo/SetPassword",
            cache: false,
            data: { pwdold: pwdold, pwdnew1: pwdnew1, pwdnew2: pwdnew2 },
            dataType: "JSON",
            success: function (data) {

                data = JSON.parse(data);

                if (data.result == 0) {
                    showtip = "原密码不正确,请重新输入!";
                      $("#showtip").html(showtip);
                    $("#b-pwdold").val("");
                    return;
                } else {
                    showtip = "修改成功!";
                }

            }
        });

    });

    //校验密码：只能输入6-20个字母、数字、下划线
    function isPasswd(s) {
        var patrn = /^(\w){6,20}$/;
        if (!patrn.exec(s)) {
            return false;
        }
        return true;
    }
});









