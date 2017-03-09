
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
                var evaluationid = $(this).attr("data-evaluationid");
                var username = $(this).attr("data-username");

                $.router.load("/teacher/testcenter/StudentTestReportDetail?evaluationid=" + evaluationid+"&username="+username, true);

            });

        }
    });

}
