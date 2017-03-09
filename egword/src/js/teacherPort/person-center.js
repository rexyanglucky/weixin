
$(function () {

    GetTeacherKpi(1);

    GetGroupOrderList();


    $("#btn-submit").click(function () {
        $.router.load("/teacher/myinfo/set", true);
    });

    $("#b-picker").change(function () {
        var str = $(this).val();

        var timenum = ConvertName2Num(str);

        GetTeacherKpi(timenum);
      
    });

    $("#b-picker").picker({
        toolbarTemplate: '<header class="bar bar-nav" style="background:#dfebf2;height:1rem;"></header>',
        cols: [
            {
                textAlign: 'center',
                values: ['本周', '本月', '本季度', '半年', '全年']
            }
        ]
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
            $("#b-classcount").html(m.ClassCount + "个");
            $("#b-studentcount").html(m.StudentCount + "个");
            $("#b-allstudentcount").html(m.AllStudentCount + "人次");

            if (m.PassRate>0) {
                $("#b-passrate").html(m.PassRate + "%");
            } else {
                $("#b-passrate").html("-");

            }

            
            $("#b-quitstudentcount").html(m.QuitStudentCount + "个");


        }
    });
}

function GetTeacherKpi(timenum) {

    $.ajax({
        type: "get",
        url: "/teacher/myinfo/GetTeacherKpi",
        cache: false,
        data: { timenum: timenum },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);

            var m = data.result;

            $("#b-kpivalue").html(m.KpiValue + "分");
            $("#b-ordernum").html("第" + m.OrderNum + "名");


        }
    });
}

function ConvertName2Num(name) {
    var num = 1;
    switch (name) {

        case "本月":
            num = 1;
            break;
        case "本季度":
            num = 2;
            break;
        case "半年":
            num = 3;
            break;
        case "全年":
            num = 4;
            break;
        case "本周":
            num = 5;
            break;

    }

    return num;
}
