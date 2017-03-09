var lui = require("../../LUI/js/lui.js");
var lui = new lui();
var guide = lui.initGuide();

//单元处引导
//guide.popup($(".child-unit")[0], 'child-unit0', true, { width: 130, height: 125 }, { width: 350, height: 270 }, 'up', '学完每个单元都会有测试，根据结果点亮荣耀之星！', '/egword/build/img/get-it-img2.png', 15);


$(function () {
    if (userCount <= 0) {
        guide.popup($(".child-unit")[0], 'child-unit0', true, { width: 130, height: 125 }, { width: 350, height: 270 }, 'up', '学完每个单元都会有测试，根据结果点亮荣耀之星！', '/egword/build/img/get-it-img2.png', 15);
    }

    $("body").delegate(".child-unit0", "click", function(event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
    });
    var count = 0;
    $(".tabs-content").each(function () {
        if (count != 0) {
            $(this).hide();
        }
        count++;
    });
    count = 0;

    $(".mt15").each(function () {
        if (count != 0) {
            var doc = $(this).children(".megs").children(".fr").children(".ml30");
            doc.attr("src", "/egword/build/img/left-arrow.png");
            $(this).children(".megs").addClass("megscolor");
            $(this).children(".main-content").hide();
        }
        count++;
    });

    $("body").delegate(".downleft", "click", function (event) {
        $(this).parent(".fr").parent(".megs").parent(".mt15").children(".main-content").toggle();
        var doc = $(this).parent(".fr").children(".ml30");
        var srcStr = doc.attr("src");
        if (srcStr.toString().indexOf("down-arrow.png") == -1) {
            doc.attr("src", "/egword/build/img/down-arrow.png");
            $(this).removeClass("megscolor");
        } else {
            doc.attr("src", "/egword/build/img/left-arrow.png");
            $(this).addClass("megscolor");
        }
    });

    $("body").delegate(".tabs-header", "click", function (event) {
        $(this).children("span").each(function () {
            $(this).removeClass("active");
            $(this).addClass("normal");
        });
        $(event.target).removeClass("normal");
        $(event.target).addClass("active");
        var dataid = $(event.target).attr("data-id");
        $(".tabs-content").each(function () {
            if ($(this).attr("data-id") == dataid) {
                $(this).show();
            } else {
                $(this).hide();
            }

        });
    });
    $("body").delegate(".showremark", "click", function (event) {
        var remark = $(this).attr("data-message");
        $(".text").html(remark);
        $(".eg-pop").show();
    });

    $("body").delegate(".close", "click", function (event) {
     
        $(".eg-pop").hide();
    });
    


    $("body").delegate(".fr", "click", function (event) {
        var dataid = $(event.target).attr("data-id");
        $(".orange").each(function () {
            if ($(this).attr("data-id") == dataid) {
                $(this).hide();
            }
        });
    });


    $("body").delegate(".child-unit", "click", function (event) {
        var courseId = $(this).attr("data-courseid");
        var unitId = $(this).attr("data-id");
        var orderId = $(this).attr("data-order");
        var brief = $(this).attr("data-brief");
        var bookGroupId = $(this).attr("data-bookgroup");

        $.post("/Student/LearnCenter/LogLearn", { "courseId": courseId, "unitId": unitId, "orderId": orderId, "brief": brief }, function (result) {
            if (result.State == 0) {
                window.location.href = "/Student/LearnCenter/ExperienceLesson?unitId=" + unitId + "&unitOrder=" + orderId + "&bookGroupId=" + bookGroupId + "&birefName=" + brief + "&courseId=" + courseId;
               // window.location.href = "/Student/LearnCenter/UnitLearn?unitId=" + unitId + "&order=" + orderId + "&bookGroupId=" + bookGroupId + "&userCount=" + userCount;
            }
        });
    });

});



