var Lui = require("../../LUI/js/lui.js");
var tool = require("../../LUI/tool.js");
var a = require('template-helpers.js');
var lui = new Lui();
var reviewWord = {
    courseId:courseid,
    wordList:{},
    answerTime:0,
    totalAnswerTime:0,
    totalWordNum:0,
    currentWordIndex:-1,
    currentWord:{},
    timeTick:{},
    //当前是否处于学习页面
    islearning:false,
    //总共练习了多少单词
    practiseTotalNum:0,
    //总共答对了多少单词
    answerRightNum:0,
    timesUp:false,
    //当前时间
    curTickTime:0,
    //当前剩余时间
    remainTickTime:0,
    nextWord:function(isnext){
        $(".review-word").off("click");
        isnext=isnext||true;
        //复习完成
        if(this.currentWordIndex>0&&this.currentWordIndex>=this.totalWordNum-1&&(!this.islearning)){
            $(".review-word").hide();
            $(".review-start").hide();
            $("#practiseTotalNum").html(this.practiseTotalNum);
            var rp=Math.floor((this.answerRightNum/ this.practiseTotalNum)*100);
            var c=0;
            $("#answerRightNum").html(rp+"%");
              if(rp==100){
                  c=30;
              }
              else if(rp>=90){
                  c=25;
              }
              else if(rp>=80){
                  c=20;
              }
              else if(rp>=70){
                  c=15;
              }
              else if(rp>=60){
                  c=10;
              }
              else {
                  c=0;
              }
            $("#review-learn-coins").html(c);
            $(".review-end").show();
            this.bindEventWordEnd();
            if(c>0) {
                $.ajax({
                    url: "/LearnCenter/SendCoins",
                    type: "post",
                    data: {coins: c, courseId: courseid},
                    success: function (data) {
                    if(data.State==0) {

                    }
                    },
                    error: function () {
                    }
                });
            }
            return;
        }
        if(!this.islearning){
            if(isnext) {
                this.currentWordIndex = this.currentWordIndex * 1 + 1;
                window.location.hash = "#" + this.currentWordIndex;
            }
        }
        else{
            window.location.hash="#"+this.currentWordIndex+"#learn";
        }


        // window.history.pushState({currentWordIndex:1},null,"#1");
        this.initWord();
    },
    submitAnswer:function(ispass,type){
        //ispass -1没有做，0没有过，1过了
        //type 0 答题提交， 1 学习界面提交
        var wthis=this;
        type=type||0;
        var postype=4;
        var usetime=wthis.timeTick.tickTime;
        if(type==1){
            postype=5;
            usetime=usetime>20?20:usetime;
        }
        $.ajax({
            url:"/LearnCenter/SubmitReviewWord",
            type:"post",
            data:{
                WordId:wthis.currentWord.WordId,
                WordType:wthis.currentWord.WordType,
                IsPass:ispass!=1?0:ispass,
                PosType:postype,
                CourseId:courseid,
                UseTime:usetime,
                QType:wthis.currentWord.QType
            },
            success:function (data) {
                if(data.State==0){
                }
                if(type==0)
                {
                    wthis.practiseTotalNum++;
                    //是否通过（-1没有做，0没有过，1过了）
                    //答错需要进入学习页面
                    if(ispass!=1)
                    {
                        wthis.islearning=true;
                    }
                    else {
                        wthis.answerRightNum++;
                    }
                }
                wthis.nextWord();
            }
        })
    },
    getWrodList:function(callback){
        var wthis=this;
        $.ajax({
            url:"/LearnCenter/GetReviewQue",
            type:"post",
            data:{courseId:wthis.courseId},
            success:function (data) {
                if(data.State==0) {
                    wthis.wordList = data.Data;
                    wthis.totalWordNum=wthis.wordList.length;
                    console.log(data.Data);
                    if(callback){
                        callback(wthis);
                    }
                }
                else{
                    callback(wthis);
                }
            },
            error:function(){

            }
        });
    },
    initWord:function(e){
        var wthis;
        if(e){
            wthis=e;
        }
        else{
            wthis=this;
        }
        // if(window.location.hash)
        if(wthis.currentWordIndex>=0)
        {
            $(".review-start").hide();
            $(".review-word").show();
            var hash=window.location.hash;
            var harr=hash.split("#");
            wthis.currentWordIndex=harr[1];
            if(hash.indexOf("learn")>-1){
                wthis.islearning=true;
            }
            // wthis.currentWordIndex=hash.substr(hash.indexOf("#")+1,hash.length-1);
            tool.progessBar($(".progress"),wthis.currentWordIndex*1+1,wthis.totalWordNum);
            var curword=wthis.wordList[wthis.currentWordIndex];
            wthis.currentWord=curword;
            //判读当前是否是学习页面
            if(wthis.islearning) {
                wthis.initWordLearn(curword);
                if (wthis.timeTick) {
                    clearInterval(wthis.timeTick.clock);
                }
                wthis.timeTick = tool.timeTickSmall(20);
                $(".rotate-small").hide();
            }
            else {
                // 试题题型（0，听音拼；1，看义拼；2，汉译英；3，英译汉）
                switch (curword.QType) {
                    case 0: {
                        wthis.initWord0(curword);
                    }
                        break;
                    case 1: {

                        wthis.initWord1(curword);
                    }
                        break;
                    case 2: {
                        wthis.initWord2(curword);
                    }
                        break;
                    case 3: {
                        wthis.initWord3(curword);
                    }
                        break;
                }

                if (wthis.timeTick) {
                    clearInterval(wthis.timeTick.clock);
                }
                wthis.timeTick = tool.timeTickSmall(10,function(){wthis.submitAnswer(-1)});
            }

        }
        else{
            $(".review-start").show();
            $(".review-word").hide();
            wthis.bindEventStart();
        }

    },
    bindEventStart:function(){
        var wthis=this;
        $(".review-start").on("click","#btn-start",function(){
        wthis.nextWord();
        wthis.totalTimeTick();
    });},
    bindEvent:function(){
        var wthis=this;
        $("body").on("click", ".return", function() {
            if($(this).hasClass("unclick")){return;}
            $("#remainWord").html(wthis.totalWordNum-wthis.practiseTotalNum);
            $("#pnum").html(wthis.practiseTotalNum);
            var rp=Math.floor((wthis.answerRightNum/ wthis.practiseTotalNum)*100);
            $("#pright").html(rp+"%");
            $(".eg-pop").show();
            wthis.remainTickTime=wthis.timeTick.remainTickTime;
            clearInterval(wthis.timeTick.clock);
        });
        $("body").on("click","#btn-exit",function(){
            window.location.href = "/Student/LearnCenter/Index";
        });
        $("body").on("click","#btn-contiue,#btn-close-pop",function(){
            $(".eg-pop").hide();

            wthis.timeTick = tool.timeTickSmall(wthis.remainTickTime,function(){wthis.submitAnswer(-1)});
            if(wthis.islearning){
                $(".rotate-small").hide();
            }
        });


    },
    bindEventWord0:function () {
        var wthis=this;
        //听音拼写
        $(".review-word").on("click",".see",function(){
            if($(this).html()=="看词义"){
                $(".word-mean").show();
                $(this).html("隐藏词义");
            }
            else{
                $(".word-mean").hide();
                $(this).html("看词义");
            }
        });
        //点击选项
        $(".review-word").on("click",'[data-op="word0-sel"]',function(){
            var opt=$(this);
            var haseleted=false;
            $("input[data-haswrite='1']").each(function (index,item) {
                if($(item).val()==opt.html()){
                    haseleted=true;
                }
            });
            if(haseleted){return false;}
            if($("input[data-haswrite='0']").length>0) {
                $("input[data-haswrite='0']")[0].value = $(this).html();
                $("input[data-haswrite='0']")[0].setAttribute("data-haswrite", 1);
                $(this).addClass("active").siblings().removeClass("active");
            }
            //若都填完，判断对错，答对直接提交，答错停留1s提交
            if($("input[data-haswrite='0']").length==0){

                var ua="";
                $("input[data-haswrite='1']").each(function(index,item){
                    ua+= item.value;
                });
                var cword=wthis.wordList[wthis.currentWordIndex]
                if(ua==cword.Answer){
                    $(".word0-right-answer-right").show();
                    setTimeout(function () {
                        wthis.submitAnswer(1);
                    },1000);
                }else{
                    $(".word0-right-answer-error").show();
                    setTimeout(function () {
                        wthis.submitAnswer(0);
                    },1000);

                }
            }

        });
        //删除已选的
        $(".review-word").on("click","input[data-haswrite='1']",function(){
            $(this).val("");
            $(this).attr("data-haswrite",0);
            $('[data-op="word0-sel"]').removeClass("active");
        });
        //全清
        $(".review-word").on("click",".word0-clear",function(){
            $("input[data-haswrite='1']").each(function(index,item){
                item.value="";
                item.setAttribute("data-haswrite",0);
            });
            $('[data-op="word0-sel"]').removeClass("active");
        })
    },
    bindEventWord2:function () {
        var wthis=this;
        //点击选项
        $(".review-word").on("click",'[data-op="word2-sel"]',function(){
                var ua=$(this).attr("data-index");
                var cword=wthis.wordList[wthis.currentWordIndex];
                var ritem=$($('[data-op="word2-sel"]').eq(cword.Answer));
                if(ua==cword.Answer){
                    $(this).removeClass("error").addClass("success").siblings().removeClass("success").removeClass("error");
                    $('<img src="/egword/build/img/big-ok.png" alt="" class="vm">').insertAfter(ritem[0]);
                    setTimeout(function () {
                        wthis.submitAnswer(1);
                    },1000);
                }else{
                    $(this).removeClass("success").addClass("error").siblings().removeClass("success").removeClass("error");
                    ritem.removeClass("error").addClass("success");
                    $('<img src="/egword/build/img/big-error.png" alt="" class="vm">').insertAfter(this);
                    $('<img src="/egword/build/img/big-ok.png" alt="" class="vm">').insertAfter(ritem[0]);
                    setTimeout(function () {
                        wthis.submitAnswer(0);
                    },1000);

                }
                $(".review-word").off("click");


        });

    },
    bindEventWordLearn:function(){
        var wthis=this;
        $(".review-word").on("click","#btn-learn-next",function(){
            wthis.islearning=false;
            wthis.submitAnswer(-2,1);
            // wthis.nextWord();
        })
    },
    bindEventWordEnd:function(){
        var wthis=this;
        $(".review-end").on("click","#btn-review-end-ok",function(){
            window.location.href = "/Student/LearnCenter/Index";
        })
    },
    initWord0:function(curword){
       var wthis=this;
        var tpl=require("student/word0");
        curword.spellList=[];
        for(var k=0;k<curword.Count;k++){
            curword.spellList.push(k);
        }
        var html=tpl(curword);
        $("#word-wrap").html(html);
        lui.initWordSpeak({ auto: true, loop: 2,callback:function(){console.log("播放完毕");} });

        wthis.bindEventWord0()
    },
    initWord1:function(curword){
        var wthis=this;
        var tpl=require("student/word1");
        curword.spellList=[];
        for(var k=0;k<curword.Count;k++){
            curword.spellList.push(k);
        }
        var html=tpl(curword);
        $("#word-wrap").html(html);
        // lui.initWordSpeak({ auto: true, loop: 2,callback:function(){console.log("播放完毕");} });
        wthis.bindEventWord0()
    },
    initWord2:function(curword){
        var wthis=this;
        var tpl=require("student/word2");
        var html=tpl(curword);
        $("#word-wrap").html(html);
        wthis.bindEventWord2()
    },
    initWord3:function(curword){
        var wthis=this;
        var tpl=require("student/word3");
        var html=tpl(curword);
        $("#word-wrap").html(html);
        lui.initWordSpeak({ auto: false,callback:function(){console.log("播放完毕");} });
        wthis.bindEventWord2()
    },
    initWordLearn:function (curword) {
        var wthis=this;

        var tpl=require("student/wordlearn");

        var html=tpl(curword);
        $("#word-wrap").html(html);
        //判断该单词的类型 陌生词 慢速跟读3遍 夹生词，请快速跟读2遍 单词类型0，熟词；1，夹生词；2，生词；
        if(curword.WordType==1)
        {
            lui.initWordSpeak({ auto: true, loop: 2,callback:function(){
                $(".anysis").show();
                $(".remumber").show();
                $("#btn-learn-next").show();
                console.log("播放完毕");}
            });
        }
        else{
            lui.initWordSpeak({ auto: true, loop: 3,interval:2000,callback:function(){
                $(".anysis").show();
                $(".remumber").show();
                $("#btn-learn-next").show();
                console.log("播放完毕"); }
            });
        }
        wthis.bindEventWordLearn();
    },
    //开始复习后总计时
    totalTimeTick:function(){
        var wthis=this;
        setInterval(function(){
            wthis.totalAnswerTime++;
            if(wthis.totalAnswerTime>=(60*15)){
                //如果退出是不可点状态，超过15分钟后 闪现退出按钮
                    if($(".return").hasClass("unclick")) {
                        var count = 0;
                        $(".return").removeClass("unclick");
                        var showt = setInterval(function () {
                            if ($(".return").hasClass("hidden")) {
                                $(".return").removeClass("hidden");
                            }
                            else {
                                $(".return").addClass("hidden");
                            }
                            if (count >= 4) {
                                clearInterval(showt);
                                $(".return").removeClass("hidden");
                            }
                            count++;
                        }, 500);
                    }
                if(wthis.totalAnswerTime%30==0&&!wthis.timesUp) {
                    //TODO 后台请求是否上课 如果上课 且超过15分钟 弹出timesup
                    $.ajax({
                        url: "/LearnCenter/GetUserClassInfo",
                        type: "post",
                        success: function (data) {
                            if (data.State == 0) {
                                if (data.CourseID > 0) {
                                    $(".time-pop").show();
                                    wthis.timesUp = true;
                                    setTimeout(function () {
                                        $(".time-pop").hide();
                                        wthis.islearning = false;
                                        wthis.nextWord(false);
                                    }, 1000);
                                }
                            }
                        }
                    });

                }
            }
        },1000)
    },
    init:function(){
        window.location.hash="";
        this.getWrodList(this.initWord);
        this.bindEvent();
    }
};
$(function () {
    reviewWord.init();
});