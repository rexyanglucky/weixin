
var classid;

$(function () {
    classid = $("#hidden-classid").text();

    GetStudentTestList();

});

function GetStudentTestList() {

    $.ajax({
        type: "get",
        url: "/teacher/TestCenter/GetStudentTestReportList",
        cache: false,
        data: { classid: classid },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);
            var li = data.result;

            var tpl = require("teacher/test-center-class");

            $("#b-studentlist").html(tpl(li));


            $(".b-studentlist-item").on("click", function () {
                var studentid = $(this).attr("data-studentid");

                $.router.load("/teacher/testcenter/StudentTestReportDetail?studentid=" + studentid, true);

            });

        }
    });

}
