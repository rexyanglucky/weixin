
$(function () {
    GetGroupOrderList();


    $("#btn-submit").click(function() {
        $.router.load("/teacher/myinfo/set",true);
    });

});

function GetGroupOrderList() {

    $.ajax({
        type: "get",
        url: "/teacher/myinfo/GetTeacherStatistics",
        cache: false,
        data: {},
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);

            var m = data.result;

            $("#b-userid").html(m.TeacherId);
            $("#b-username").html(m.TeacherName);
            $("#b-classcount").html(m.ClassCount);
            $("#b-studentcount").html(m.StudentCount);
            $("#b-allstudentcount").html(m.AllStudentCount);
            $("#b-passrate").html(m.PassRate+"%");
            $("#b-quitstudentcount").html(m.QuitStudentCount);


        }
    });
}
