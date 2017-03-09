var lesson = {
    init: function () {

        $(".card-header").off("click");
        $(".card-header").on("click",
            function () {
                var p = $(this).parent();
                if (p.hasClass("slide-down")) {
                    var next = $(this).next();
                    $(next).hide(100);
                    p.removeClass("slide-down").addClass("slide-up");
                    $(this).find(".icon-down-drop").removeClass("icon-down-drop").addClass("icon-right-drop");
                } else {
                    var next = $(this).next();
                    $(next).show(100);
                    p.removeClass("slide-up").addClass("slide-down");
                    $(this).find(".icon-right-drop").removeClass("icon-right-drop").addClass("icon-down-drop");
                }

            });
    }


}


var classindex;
var classid;
var timer = {};

$(function () {
    
    classindex = $("#hidden-classindex").text();
    classid = $("#hidden-classid").text();

    GetClassroomMonitor();

    $("#btn-submit").click(SaveClassEnd);

});

function GetClassroomMonitor() {

    $.ajax({
        type: "get",
        url: "/teacher/myclass/GetClassroomMonitor",
        cache: false,
        data: { classindex: classindex },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);
            var li = data.result;

            var tpl = require("teacher/lesson-watching");
            $("#b-monitorlist").html(tpl(li));

            lesson.init();

           window.timer= setTimeout(GetClassroomMonitor, 10000);

        }
    });

}

function SaveClassEnd() {

    $.ajax({
        type: "POST",
        url: "/teacher/myclass/SaveClassEnd",
        cache: false,
        data: { classindex: classindex },
        dataType: "JSON",
        success: function (data) {

            $("#btn-submit").off("click");

            $.router.load('/teacher/myclass/CourseReport?classindex=' + classindex+"&classid="+classid, true);

        }
    });

}




