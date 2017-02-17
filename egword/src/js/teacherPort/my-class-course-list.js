var a=require('template-helpers.js');
var classid;
$(function () {

    console.log(a);
    classid = $("#hidden-classid").text();

    GetClassCourseRecordList(classid);

    $("#btn-submit").on("click", function () {

        $.router.load('/teacher/myclass/StudentGroup?classid=' + classid, true);
    });

});


function GetClassCourseRecordList(classid) {
    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetClassCourseRecordList",
        cache: false,
        data: { classid: classid },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);

            var li = data.result;
            var str = "ÔÝÎÞ¿Î´Î¼ÇÂ¼";

            var tpl = require("teacher/my-class-course-list");

            $("#courselist").html(tpl(li));
            if (li.length == 0) {
                $("#courselist").html(str);
            }

            $(".s-course-list").on("click", function () {

                var classindex = $(this).attr("data-classindex");

                $.router.load('/teacher/myclass/CourseReport?classindex=' + classindex, true);

            });

        }
    });
}
