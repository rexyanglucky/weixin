var lesson={
    init:function () {
        $(".card-header").on("click",
            function() {
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
lesson.init();


    var classindex;

    $(function () {
        classindex = $("#hidden-classindex").text();

        //var data = li = [];
        //var tpl = require("teacher/my-class-list");
        //$("#studentlist").html(tpl(li));


        $("#btn-submit").click(SaveClassEnd);

    });

    function SaveClassEnd() {

        $.ajax({
            type: "get",
            url: "/teacher/myclass/SaveClassEnd",
            cache: false,
            data: { classid: classid },
            dataType: "JSON",
            success: function (data) {

                $.router.load('/teacher/myclass/CourseReport?classindex=' + classindex, true);

            }
        });

    }




