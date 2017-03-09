
var classindex;
var classid;
$(function () {

    classindex = $("#hidden-classindex").text();
    classid = $("#hidden-classid").text();

    GetCourseReportList();

    $("#btn-submit").click(function () {

        $.router.load("/teacher/myclass/RewardCoin?classindex=" + classindex+"&classid="+classid, true);

    });

    $(".s-tab").on("click", function () {

        $.router.load("/teacher/myclass/SplendidMoment?classindex=" + classindex+"&classid="+classid);

    });
});

function GetCourseReportList() {
    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetCourseReportList",
        cache: false,
        data: { classindex: classindex },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);

            var tpl = require("teacher/lesson-report");

            $("#g-s-content").html(tpl(data));

            $(".b-studentlist-item").on("click", function () {
                var classindex = $(this).attr("data-classindex");
                var studentid = $(this).attr("data-studentid");
                var courseid = $(this).attr("data-courseid");
                var username = $(this).attr("data-username");
               
                $.router.load("/teacher/myclass/StudentAnalysis?classindex=" + classindex + "&studentid=" + studentid + "&courseid=" + courseid+"&username="+username, true);

            });

        }
    });
}