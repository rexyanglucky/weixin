

$(function() {

    GetMyTeachClassList();

});

function GetMyTeachClassList() {

    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetMyTeachClassList",
        cache: false,
        data: {},
        dataType: "JSON",
        success: function (data) {
            if (data != null) {

                data = JSON.parse(data);

                var li = data.result;

                var tpl = require("teacher/test-center-home");

                $("#b-classlist").html(tpl(li));

                $(".b-classlist-item").on("click", function() {
                    var classid = $(this).attr("data-classid");

                    $.router.load("/teacher/testcenter/StudentTestReportList?classid=" + classid,true );

                });

            }
        }
    });
}
