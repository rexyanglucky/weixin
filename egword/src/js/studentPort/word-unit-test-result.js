var lui=require("../../LUI/js/lui.js");
var lui=new lui();
var guide=lui.initGuide();
//学分学币处的引导
//guide.popup($("#coins"),'getItEle0',true,{width:130,height:125},{width:340,height:160},'up','每个单元测试都会依据得分奖励相应的学分、学币！','/egword/build/img/get-it-img1.png');
//下一单元处
//guide.popup($(".btn")[3],'getItEle1',true,{width:130,height:125},{width:340,height:180},'up','“你也可以直接学习下一个单元，一战到底！”');
//继续学习未掌握词汇
//guide.popup($(".btns")[0],'getItEle2',true,{width:130,height:125},{width:340,height:150},'up','“Congratulations！继续学习，可以GET剩余的荣耀之星和学币奖励！”');


$(function () {
    var shoumengban;
    $("#passone").hide();
    $("#passtwo").hide();
    $("#passthree").hide();
    if (result.Score == 100) {
        shoumengban = $("#fullfen");
        $("#full").removeClass("none");
        $("#starsone").hide();
        $(".in").hide();
        var score = 0;
        var timer = setInterval(function () {
           
            if (score <= result.Score) {
                $(".pass-score").html(score + "分");
              
            } else if (score - result.Score > 10) {
                $("#passone").show();
                $(".in").show();
                clearInterval(timer);
            } else if (score - result.Score > 5) {
              
                $("#starsone").show();
            }
           
            score++;
        }, 100);
        $("#creditone").html("+" + result.Credit);
        $("#currenyone").html("+" + result.Curreny);
        

    } else if (result.Score < 80) {
        shoumengban = $("#failscore");
        $("#fail").removeClass("none");
        var score = 0;
        var timer = setInterval(function () {
            
            if (score <= result.Score) {
                $(".fail-score").html(score + "分");
              
            } else if (score - result.Score > 5) {
                $("#passthree").show();
                $(".in").show();
               clearInterval(timer);
            }
            score++;
        }, 100);

        $("#creditthree").html("+" + result.Credit);
        $("#nopasstwo").html(result.NoPass);
    } else {
        shoumengban = $("#nofullfen");
        $("#nofull").removeClass("none");
        $("#starstwo").hide();
        $(".in").hide();
        var score = 0;
        var timer = setInterval(function () {
            
            if (score <= result.Score) {
                $(".pass-score").html(score + "分");
               
            } else if (score - result.Score > 10) {
                $("#passtwo").show();
                $(".in").show();
                clearInterval(timer);
            } else if (score - result.Score > 5) {
                if (result.Score < 90) {
                    $("#starstwo").html("<i class=\"star star7 ml15\"></i>");
                } else {
                    $("#starstwo").html("<i class=\"star star7 ml15\"></i><i class=\"star star7 ml15\"></i>");
                }
                $("#starstwo").show();
            } 
            score++; 
        }, 100);
     
        $("#credittwo").html("+" + result.Credit);
        $("#currenytwo").html("+" + result.Curreny);
        $("#nopassone").html(result.NoPass);
    }
    if (parseInt(result.IsFirst) == 0) {
       
        guide.popup(shoumengban, 'getItEle0', true, { width: 130, height: 125 }, { width: 340, height: 160 }, 'up', '每个单元测试都会依据得分奖励相应的学分、学币！', '/egword/build/img/get-it-img1.png');

    }

    $("body").delegate(".getItEle0", "click", function (event) {

        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
        if (result.Score == 100) {
            guide.popup($(".nextunit"), 'getItEle1', true, { width: 130, height: 125 }, { width: 340, height: 180 }, 'up', '“Excellent！你击败了全国99%的同学！冲刺吧，奥巴马！”');
        } else if (result.Score < 80) {
            guide.popup($(".failjixu"), 'getItEle3', true, { width: 130, height: 125 }, { width: 340, height: 150 }, 'up', '“Come on！继续学习，来GET你的荣耀之星和学币奖励吧！”');
           
        } else if (result.Score < 100) {
            guide.popup($(".nofulljixu"), 'getItEle2', true, { width: 130, height: 125 }, { width: 340, height: 150 }, 'up', '“Congratulations！继续学习，可以GET剩余的荣耀之星和学币奖励！”');
        }
    });
    $("body").delegate(".getItEle2", "click", function (event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
        guide.popup(result.Score >= 80 ? $(".nofullnext") : $(".nopassnext"), 'getItEle1', true, { width: 130, height: 125 }, { width: 340, height: 180 }, 'up', '“你也可以直接学习下一个单元，一战到底！');
    });
    $("body").delegate(".getItEle3", "click", function (event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
       // guide.popup(result.Score >= 80 ? $(".nofullnext") : $(".nopassnext"), 'getItEle1', true, { width: 130, height: 125 }, { width: 340, height: 180 }, 'up', '“你也可以直接学习下一个单元，一战到底！');
    });
    $("body").delegate(".getItEle1", "click", function (event) {
        $(".guide-over-layer").remove();
        $(".guide-line").remove();
        $(".guide-msg-pop").remove();
    });

    $("body").delegate(".conunit", "click", function(event) {
        window.location.href = "/Student/LearnCenter/UnitLearn?unitId=" + result.UnitId + "&order=" + result.UnitOrder + "&bookGroupId=" + result.BookGroupId + "&userCount=2";
    });

    $("body").delegate(".nextunit", "click", function(event) {
        if (parseInt(result.NextUnitId) <= 0) {
            window.location.href = "/Student/LearnCenter/Index";
        } else {
            window.location.href = "/Student/LearnCenter/UnitLearn?unitId=" + result.NextUnitId + "&order=" + result.NextUnitOrder + "&bookGroupId=" + result.BookGroupId + "&userCount=2";
        }
    });
    $("body").delegate(".return", "click", function(event) {
        window.location.href = "/Student/LearnCenter/Index";
    });

});
