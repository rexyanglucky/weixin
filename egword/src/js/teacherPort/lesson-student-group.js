// var tool=require("../../LUI/tool.js");
var Lui = require("../../LUI/js/lui.js");
var lui = new Lui();


var _studentGroup = null;
var classid;
/*初始化*/
$(function () {

    classid = $("#hidden-classid").text();
    GetStudentGroup(classid, 1);

    $("#btn-submit").click(SaveClassBegin);

});

/*获取学生分组信息 ajax*/
function GetStudentGroup(classid, isgroup) {
    var url = "/teacher/myclass/GetStudentGroup";
    if (!isgroup) {
        url = "/teacher/myclass/GetStudentNoGroup";
    }
    $.ajax({
        type: "get",
        url: url,
        cache: false,
        data: { classid: classid },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);

            var li = data.result;
            _studentGroup = li;

            var groupCount = 0;
            var studentCount = 0;

            var t_data = { isgroup: isgroup, list: li }

            var tpl = require("teacher/student-group");
            $("#grouplist").html(tpl(t_data));

            if (isgroup) {

                for (var i = 0; i < li.length; i++) {

                    groupCount++;

                    for (var j = 0; j < li[i].StudentInfoList.length; j++) {
                        studentCount++;
                    }
                }

                $("#groupinfo").html("( " + studentCount + "人 共 " + groupCount + " 组)");

            } else {
                var sl = li[0].StudentInfoList;
                for (var j = 0; j < sl.length; j++) {
                    studentCount++;
                }
                $("#groupinfo").html("( " + studentCount + " 人)");
            }

            if (studentCount == 0) {
                //确定按钮不可用

            } else {
                $("#btn-submit").show();
                $("#btn-submit-no").hide();

            }

            lui.initCheckBox({
                callback: function (item) {
                    var groupname = $(item).attr("data-name");
                    if (groupname == "gall") {

                        if ($(item).attr("data-checked") == "1") {
                            //分组
                            GetStudentGroup(classid, 1);
                        } else {
                            //不分组
                            GetStudentGroup(classid, 0);
                        }
                    }
                    else if (groupname == "g1") {
                        if ($(item).attr("data-checked") == "1") {
                            $(item).parent().removeClass("def").addClass("sel");
                        }
                        else {
                            $(item).parent().removeClass("sel").addClass("def");
                        }
                    }
                }
            });
        }
    });
}

/*获取操作后 学生分组信息*/
function changeCheckBox() {
    $("luicheck[data-name='g1']").each(function () {

        var isbool = $(this).attr("data-checked") == 1;

        if (!isbool) {

            var getgroupindexid = $(this).attr("data-groupindexid");
            var studentid = $(this).attr("data-val");

            for (var i = 0; i < _studentGroup.length; i++) {
                if (getgroupindexid == _studentGroup[i].GroupIndexId) {

                    for (var j = 0; j < _studentGroup[i].StudentInfoList.length; j++) {
                        if (studentid == _studentGroup[i].StudentInfoList[j].StudentID) {
                            _studentGroup[i].StudentInfoList.splice(j, 1);
                            j--;
                        }
                    }


                }
            }
        }


    });
}

/*提交上课信息*/
function SaveClassBegin() {

    changeCheckBox();

    var groupinfo = JSON.stringify(_studentGroup);

    $.ajax({
        type: "POST",
        url: "/teacher/myclass/SaveClassBegin",
        cache: false,
        data: { classid: classid, groupinfo: groupinfo },
        dataType: "JSON",
        success: function (data) {

            data = JSON.parse(data);

            $.router.load('/teacher/myclass/ClassroomMonitor?classindex=' + data.result, true);

        }
    });

}
