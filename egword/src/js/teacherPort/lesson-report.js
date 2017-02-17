
var classindex;

$(function () {

    classindex = $("#hidden-classindex").text();

    GetCourseReportList();

    $("#btn-submit").click(function () {

        $.router.load("/teacher/myclass/RewardCoin?classindex=" + classindex, true);

    });

    $(".s-tab").on("click", function () {
        var types = $(this).attr("data-id");

        $(this).addClass("active");
        $(this).siblings().removeClass("active");

        if (types == "c") {

        } else {
           
        }


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

                $.router.load("/teacher/myclass/StudentAnalysis?classindex=" + classindex + "&studentid=" + studentid + "&courseid=" + courseid, true);

            });

        }
    });
}