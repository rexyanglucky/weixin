/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Lui = __webpack_require__(1);
	var tool = __webpack_require__(6);
	var a = __webpack_require__(9);
	var lui = new Lui();
	var reviewWord = {
	    courseId: courseid,
	    wordList: {},
	    answerTime: 0,
	    totalAnswerTime: 0,
	    totalWordNum: 0,
	    currentWordIndex: -1,
	    currentWord: {},
	    timeTick: {},
	    //当前是否处于学习页面
	    islearning: false,
	    //总共练习了多少单词
	    practiseTotalNum: 0,
	    //总共答对了多少单词
	    answerRightNum: 0,
	    timesUp: false,
	    //当前时间
	    curTickTime: 0,
	    //当前剩余时间
	    remainTickTime: 0,
	    nextWord: function (isnext) {
	        $(".review-word").off("click");
	        isnext = isnext || true;
	        var wthis = this;
	        if (wthis.timeTick) {
	            clearInterval(wthis.timeTick.clock);
	        }
	        //复习完成
	        if (this.currentWordIndex >= 0 && this.currentWordIndex >= this.totalWordNum - 1 && (!this.islearning)) {
	            $(".review-word").hide();
	            $(".review-start").hide();
	            $("#practiseTotalNum").html(this.practiseTotalNum);
	            var p = this.answerRightNum / this.practiseTotalNum;
	            var rp = Math.floor(((isNaN(p) || !isFinite(p)) ? 0 : p) * 100);
	            var c = 0;
	            $("#answerRightNum").html(rp + "%");
	            if (rp == 100) {
	                c = 30;
	            }
	            else if (rp >= 90) {
	                c = 25;
	            }
	            else if (rp >= 80) {
	                c = 20;
	            }
	            else if (rp >= 70) {
	                c = 15;
	            }
	            else if (rp >= 60) {
	                c = 10;
	            }
	            else {
	                c = 0;
	            }
	            $("#review-learn-coins").html(c);
	            $(".review-end").show();
	            this.bindEventWordEnd();
	            if (c > 0) {
	                $.ajax({
	                    url: "/LearnCenter/SendCoins",
	                    type: "post",
	                    data: { coins: c, courseId: courseid, percent: rp },
	                    success: function (data) {
	                        if (data.State == 0) {

	                        }
	                    },
	                    error: function () {
	                    }
	                });
	            }
	            return;
	        }
	        if (!this.islearning) {
	            if (isnext) {
	                this.currentWordIndex = this.currentWordIndex * 1 + 1;
	                window.location.hash = "#" + this.currentWordIndex;
	            }
	        }
	        else {
	            window.location.hash = "#" + this.currentWordIndex + "#learn";
	        }


	        // window.history.pushState({currentWordIndex:1},null,"#1");
	        this.initWord();
	    },
	    submitAnswer: function (ispass, type) {
	        //ispass -1没有做，0没有过，1过了
	        //type 0 答题提交， 1 学习界面提交
	        var wthis = this;
	        type = type || 0;
	        var postype = 4;
	        var usetime = wthis.timeTick.tickTime;
	        if (type == 1) {
	            postype = 5;
	            usetime = usetime > 20 ? 20 : usetime;
	        }
	        $.ajax({
	            url: "/LearnCenter/SubmitReviewWord",
	            type: "post",
	            data: {
	                WordId: wthis.currentWord.WordId,
	                WordType: wthis.currentWord.WordType,
	                IsPass: ispass != 1 ? 0 : ispass,
	                PosType: postype,
	                CourseId: courseid,
	                UseTime: usetime,
	                QType: wthis.currentWord.QType
	            },
	            success: function (data) {
	                if (data.State == 0) {
	                }
	                if (type == 0) {
	                    wthis.practiseTotalNum++;
	                    //是否通过（-1没有做，0没有过，1过了）
	                    //答错需要进入学习页面
	                    if (ispass != 1) {
	                        wthis.islearning = true;
	                    }
	                    else {
	                        wthis.answerRightNum++;
	                    }
	                }
	                wthis.nextWord();
	            }
	        })
	    },
	    getWrodList: function (callback) {
	        var wthis = this;
	        $.ajax({
	            url: "/LearnCenter/GetReviewQue",
	            type: "post",
	            data: { courseId: wthis.courseId },
	            success: function (data) {
	                if (data.State == 0) {
	                    wthis.wordList = data.Data;
	                    wthis.totalWordNum = wthis.wordList.length;
	                    console.log(data.Data);
	                    if (callback) {
	                        callback(wthis);
	                    }
	                }
	                else {
	                    callback(wthis);
	                }
	            },
	            error: function () {

	            }
	        });
	    },
	    initWord: function (e) {
	        var wthis;
	        if (e) {
	            wthis = e;
	        }
	        else {
	            wthis = this;
	        }
	        // if(window.location.hash)
	        if (wthis.currentWordIndex >= 0) {
	            $(".review-start").hide();
	            $(".review-word").show();
	            var hash = window.location.hash;
	            var harr = hash.split("#");
	            wthis.currentWordIndex = harr[1];
	            if (hash.indexOf("learn") > -1) {
	                wthis.islearning = true;
	            }
	            // wthis.currentWordIndex=hash.substr(hash.indexOf("#")+1,hash.length-1);
	            tool.progessBar($(".progress"), wthis.currentWordIndex * 1 + 1, wthis.totalWordNum);
	            var curword = wthis.wordList[wthis.currentWordIndex];
	            wthis.currentWord = curword;
	            //判读当前是否是学习页面
	            if (wthis.islearning) {
	                wthis.initWordLearn(curword);
	                //if (wthis.timeTick) {
	                //    clearInterval(wthis.timeTick.clock);
	                //}
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
	                //if (wthis.timeTick) {
	                //    clearInterval(wthis.timeTick.clock);
	                //}

	                wthis.timeTick = tool.timeTickSmall(10, function () { wthis.submitAnswer(-1) });
	            }

	        }
	        else {
	            $(".review-start").show();
	            $(".review-word").hide();
	            wthis.bindEventStart();
	        }

	    },
	    bindEventStart: function () {
	        var wthis = this;
	        $(".review-start").on("click", "#btn-start", function () {
	            wthis.nextWord();
	            wthis.totalTimeTick();
	        });
	    },
	    bindEvent: function () {
	        var wthis = this;
	        $("body").on("click", ".return", function () {
	            if ($(this).hasClass("unclick")) { return; }

	            $("#remainWord").html(wthis.totalWordNum - wthis.practiseTotalNum);
	            $("#pnum").html(wthis.practiseTotalNum);
	            var p = wthis.answerRightNum / wthis.practiseTotalNum;
	            var rp = Math.floor(((isNaN(p) || !isFinite(p)) ? 0 : p) * 100);
	            $("#pright").html(rp + "%");
	            $(".pop-quit").show();
	            wthis.remainTickTime = wthis.timeTick.remainTickTime;
	            clearInterval(wthis.timeTick.clock);
	        });
	        $("body").on("click", "#btn-exit", function () {
	            //window.location.href = "/Student/LearnCenter/Index";
	            window.location.href = "/Student/LearnCenter/CourseBase?courseId="+courseid;
	            
	        });
	        $("body").on("click", "#btn-contiue,#btn-close-pop", function () {
	            $(".pop-quit").hide();
	            if (wthis.remainTickTime) {
	                wthis.timeTick = tool.timeTickSmall(wthis.remainTickTime, function () { wthis.submitAnswer(-1) });
	            }
	            if (wthis.islearning) {
	                $(".rotate-small").hide();
	            }
	        });


	    },
	    bindEventWord0: function () {
	        var wthis = this;
	        //听音拼写
	        $(".review-word").on("click", ".see", function () {
	            if ($(this).html() == "显示词义") {
	                $(".word-mean").show();
	                $(this).html("隐藏词义");
	            }
	            else {
	                $(".word-mean").hide();
	                $(this).html("显示词义");
	            }
	        });
	        //点击选项
	        $(".review-word").on("click", '[data-op="word0-sel"]', function () {
	            var opt = $(this);
	            var haseleted = false;
	            if ($(this).hasClass("active")) {
	                haseleted = true;
	            }
	            //$("input[data-haswrite='1']").each(function (index, item) {
	            //    if ($(item).val() == opt.html()) {
	            //        haseleted = true;
	            //    }
	            //});
	            if (haseleted) { return false; }
	            if ($("input[data-haswrite='0']").length > 0) {
	                $("input[data-haswrite='0']")[0].value = $(this).html();
	                $("input[data-haswrite='0']")[0].setAttribute("data-haswrite", 1);
	                //$(this).addClass("active").siblings().removeClass("active");
	                $(this).addClass("active");
	            }
	            //若都填完，判断对错，答对直接提交，答错停留1s提交
	            if ($("input[data-haswrite='0']").length == 0) {

	                var ua = "";
	                $("input[data-haswrite='1']").each(function (index, item) {
	                    ua += item.value;
	                });
	                var cword = wthis.wordList[wthis.currentWordIndex];
	                if (wthis.timeTick.clock) { clearInterval(wthis.timeTick.clock); }
	                if (ua == cword.Answer) {
	                    $(".word0-right-answer-right").show();
	                    setTimeout(function () {
	                        wthis.submitAnswer(1);
	                    }, 1000);
	                } else {
	                    $(".word0-right-answer-error").show();
	                    setTimeout(function () {
	                        wthis.submitAnswer(0);
	                    }, 1000);

	                }
	            }

	        });
	        //删除已选的
	        $(".review-word").on("click", "input[data-haswrite='1']", function () {
	            $(this).val("");
	            $(this).attr("data-haswrite", 0);
	            $('[data-op="word0-sel"]').removeClass("active");
	        });
	        //全清
	        $(".review-word").on("click", ".word0-clear", function () {
	            $("input[data-haswrite='1']").each(function (index, item) {
	                item.value = "";
	                item.setAttribute("data-haswrite", 0);
	            });
	            $('[data-op="word0-sel"]').removeClass("active");
	        })
	    },
	    bindEventWord2: function () {
	        var wthis = this;
	        //点击选项
	        $(".review-word").on("click", '[data-op="word2-sel"]', function () {
	            var ua = $(this).attr("data-index");
	            var cword = wthis.wordList[wthis.currentWordIndex];
	            var ritem = $($('[data-op="word2-sel"]').eq(cword.Answer));
	            if (wthis.timeTick.clock) { clearInterval(wthis.timeTick.clock); }
	            if (ua == cword.Answer) {
	                $(this).removeClass("error").addClass("success").siblings().removeClass("success").removeClass("error");
	                $('<img src="/egword/build/img/big-ok.png" alt="" class="vm">').insertAfter(ritem[0]);
	                setTimeout(function () {
	                    wthis.submitAnswer(1);
	                }, 1000);
	            } else {
	                $(this).removeClass("success").addClass("error").siblings().removeClass("success").removeClass("error");
	                ritem.removeClass("error").addClass("success");
	                $('<img src="/egword/build/img/big-error.png" alt="" class="vm">').insertAfter(this);
	                $('<img src="/egword/build/img/big-ok.png" alt="" class="vm">').insertAfter(ritem[0]);
	                setTimeout(function () {
	                    wthis.submitAnswer(0);
	                }, 1000);

	            }
	            $(".review-word").off("click");


	        });

	    },
	    bindEventWordLearn: function () {
	        var wthis = this;
	        $(".review-word").on("click", "#btn-learn-next", function () {
	            wthis.islearning = false;
	            wthis.submitAnswer(-2, 1);
	            // wthis.nextWord();
	        })
	    },
	    bindEventWordEnd: function () {
	        var wthis = this;
	        $(".review-end").on("click", "#btn-review-end-ok", function () {
	            window.location.href = "/Student/LearnCenter/Index";
	        })
	    },
	    initWord0: function (curword) {
	        var wthis = this;
	        var tpl = __webpack_require__(36);
	        curword.spellList = [];
	        for (var k = 0; k < curword.Count; k++) {
	            curword.spellList.push(k);
	        }
	        var html = tpl(curword);
	        $("#word-wrap").html(html);
	        lui.initWordSpeak({ auto: true, loop: 1, callback: function () { console.log("播放完毕"); } });

	        wthis.bindEventWord0()
	    },
	    initWord1: function (curword) {
	        var wthis = this;
	        var tpl = __webpack_require__(37);
	        curword.spellList = [];
	        for (var k = 0; k < curword.Count; k++) {
	            curword.spellList.push(k);
	        }
	        var html = tpl(curword);
	        $("#word-wrap").html(html);
	        // lui.initWordSpeak({ auto: true, loop: 2,callback:function(){console.log("播放完毕");} });
	        wthis.bindEventWord0()
	    },
	    initWord2: function (curword) {
	        var wthis = this;
	        var tpl = __webpack_require__(38);
	        var html = tpl(curword);
	        $("#word-wrap").html(html);
	        wthis.bindEventWord2()
	    },
	    initWord3: function (curword) {
	        var wthis = this;
	        var tpl = __webpack_require__(39);
	        var html = tpl(curword);
	        $("#word-wrap").html(html);
	        lui.initWordSpeak({ auto: false, callback: function () { console.log("播放完毕"); } });
	        wthis.bindEventWord2()
	    },
	    initWordLearn: function (curword) {
	        var wthis = this;

	        var tpl = __webpack_require__(40);

	        var html = tpl(curword);
	        $("#word-wrap").html(html);
	        //判断该单词的类型 陌生词 慢速跟读3遍 夹生词，请快速跟读2遍 单词类型0，熟词；1，夹生词；2，生词；
	        if (curword.WordType == 1) {
	            lui.initWordSpeak({
	                auto: true, loop: 2, interval: 1000, callback: function () {
	                    $(".anysis").show();
	                    $(".remumber").show();
	                    $("#btn-learn-next").show();
	                    $(".word-types").css({ "visibility": "hidden" });
	                    console.log("播放完毕");
	                }
	            });
	        }
	        else {
	            lui.initWordSpeak({
	                auto: true, loop: 3, interval: 1000, callback: function () {
	                    $(".anysis").show();
	                    $(".remumber").show();
	                    $("#btn-learn-next").show();
	                    $(".word-types").css({ "visibility": "hidden" });
	                    console.log("播放完毕");
	                }
	            });
	        }
	        wthis.bindEventWordLearn();
	    },
	    //开始复习后总计时
	    totalTimeTick: function () {
	        var wthis = this;
	        setInterval(function () {
	            wthis.totalAnswerTime++;
	            //if (wthis.totalAnswerTime >= (60 * 1)) {
	                if(wthis.totalAnswerTime>=(60*15)){
	                //如果退出是不可点状态，超过15分钟后 闪现退出按钮
	                if ($(".return").hasClass("unclick")) {
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
	                if (wthis.totalAnswerTime % 30 == 0 && !wthis.timesUp) {
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
	        }, 1000)
	    },
	    init: function () {
	        window.location.hash = "";
	        this.getWrodList(this.initWord);
	        this.bindEvent();
	    }
	};
	$(function () {
	    reviewWord.init();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var LuiDropDownList = __webpack_require__(2);
	var LuiCheckBox = __webpack_require__(3);
	var LuiWordSpeak=__webpack_require__(4);
	var LuiGuide=__webpack_require__(5);

	function Lui() {
	    //this.checkBox = null;
	    // this.initWordSpeak();
	};

	Lui.prototype = {
	    constructor: Lui,
	    initTree: function (p) {
	        var t = new LuiTree();
	        return t.init(p);
	    },
	    initDropDownList: function (p) {
	        var d = new LuiDropDownList();
	        return d.init(p);
	    },
	    initCheckBox: function (p) {
	        //声明一个适用于全局的checkbox对象
	        if (!this.checkBox) {
	            this.checkBox = new LuiCheckBox();
	        }
	        var c = new LuiCheckBox();
	        return c.init(p);

	    },
	    initWordSpeak: function (p) {
	        //声明一个适用于全局的wordspeak对象
	        if (!this.wordspeak) {
	            this.wordspeak = new LuiWordSpeak();
	        }
	        var c = new LuiWordSpeak();
	        return c.init(p);
	    },
	    initGuide:function(p){
	        //声明一个适用于全局的checkbox对象
	        if (!this.guide) {
	            this.guide = new LuiGuide();
	        }
	        var c = new LuiGuide();
	        return c.init();
	    }
	};

	module.exports = Lui;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function LuiDropDownList() {
	    this.param = null;
	    this.selector = "";
	}
	var dropcount = 1000;
	LuiDropDownList.prototype = {
	    constructor: LuiDropDownList,
	    init: function (param) {
	        this.selector = this.warpid = "#" + param.warpid;
	        var warpid = param.warpid;
	        if (!param.data) { return; }
	        var data = param.data;

	        var width = param.width = param.width || 180;
	        var height = param.height = param.height || 200;
	        var subtextlength = param.subtextlength = param.subtextlength || 5;
	        param.valueField = param.valueField || "id";
	        param.textField = param.textField || "name";
	        var valueField = param.valueField;
	        var textField = param.textField;
	        var selectedCallBack = param.selectedCallBack;
	        var loadedCallBack = param.loadedCallBack;
	        var zindex = param.zindex;
	        if (param.data.length === 0) {
	            var d = {};
	            d[valueField] = -1;
	            d[textField] = "";
	            data.push(d);
	            height = 0;
	        }

	        //设置默认值
	        var defaultValue = param.defaultValue = param.defaultValue || data[0][valueField];
	        var defaultText = param.defaultText = param.defaultValue || data[0][textField];
	        this.param = param;
	        var ulHtml = "<div class='dropdiv dn'>";
	        ulHtml += '  <ul class="dropul" style="max-height:' + height + 'px;overflow:auto;" data-id="' + defaultValue + '" data-name="' + defaultText + '">';

	        for (var k = 0; k < data.length; k++) {
	            var item = data[k];
	            var v = item[textField].length > subtextlength ? item[textField].substring(0, subtextlength) + "..." : item[textField];
	            var itemHtml = '<li title=' + item[textField] + ' data-index=' + k + ' data-id=' + item[valueField] + ' data-tag=\'' + JSON.stringify(data[k]) + '\'>' + v + '</li>';
	            ulHtml += itemHtml;
	        }
	        ulHtml += "</ul>";
	        ulHtml += "</div>";
	        var spanHtml = ' <span style="width: ' + width + 'px;" class="dib"><span data-type="dropdownlist_drop_span" id="span' + param.warpid + '">' + defaultText + '</span> <i class="num_down"></i></span>';

	        var con = $("#" + warpid);
	        con.css({ width: width });
	        con.addClass("lui_dropdownlist");
	        con.html(spanHtml);
	        con.append(ulHtml);
	        if (zindex) {
	            con.find(".dropdiv").css("z-index", zindex);
	            con.attr("zindex", zindex);
	        } else {
	            // con.find(".dropdiv").css("z-index", dropcount--);
	            // con.attr("zindex", dropcount + 1);
	        }
	        con.addClass("btn_num_updown").addClass("btn_num_updown1").addClass("dib");
	        con.attr("title", defaultText);
	        con.attr("data-id", defaultValue);

	        var ul = $("#" + warpid + " ul");
	        var dropdiv = $("#" + warpid + " .dropdiv");
	        var li = $("#" + warpid + " ul li");
	        var span = con.find("span[data-type='dropdownlist_drop_span']");
	        //事件
	        //下拉事件
	        con.click(function () {

	            if (ul.is(":visible")) {
	                // ul.slideUp(200);
	                dropdiv.slideUp(200);
	            } else {
	                $(".dropdiv").slideUp(200);
	                // dropdiv.show();
	                // ul.slideDown(200);
	                dropdiv.slideDown(200);
	            }
	            return false;
	        });
	        $("body").click(function () {
	            // ul.slideUp(200);
	            $(".dropdiv").slideUp(200);
	            // return false;
	        });
	        // con.mouseleave(function (e) {
	        //     ul.slideUp(200);
	        //     console.log(e);
	        //     return false;
	        // });
	        //选中事件
	        li.click(function () {
	            var selectedValue = $(this).attr("data-id");
	            var selectedText = $(this).html();
	            var selectedJson = $(this).attr("data-josn");
	            var alltitle = $(this).attr("title");
	            span.text(selectedText);
	            span.attr("data-id", selectedValue);
	            span.attr("data-json", selectedJson);
	            span.attr("title", alltitle);

	            con.attr("title", alltitle);
	            con.attr("data-id", selectedValue);
	            //选中回调事件
	            if (selectedCallBack) {
	                selectedCallBack(warpid, selectedValue, alltitle);
	            }
	            dropdiv.slideUp(200);
	            return false;

	        });
	        this.span = span;
	        //设置默认值
	        this.setValue(defaultValue);
	        return this;
	    },
	    getValue: function () {
	        if (this.param.data.length > 0) {
	            var span = this.span;
	            return { value: span.attr("data-id"), text: span.attr("title"), zindex: $(this.selector).attr("zindex") };
	        }
	        else {
	            return { value: -1, text: "" };
	        }

	    },
	    //暴露给外部的方法
	    getSelectedJsonValue: function () {
	        if (this.param.data.length > 0) {
	            var span = this.span;
	            return JSON.parse(span.attr("data-json"));
	        }
	        else {
	            return null;
	        }

	    },
	    setValue: function (value) {
	        var textsel = "";
	        //选中的值
	        var selItem;
	        var span = this.span;
	        for (var m = 0; m < this.param.data.length; m++) {
	            var itemsel = this.param.data[m];
	            if (itemsel[this.param.valueField] == value) {
	                textsel = itemsel[this.param.textField];
	                selItem = itemsel;
	                break;
	            }
	        }
	        span.attr("data-id", value);
	        span.attr("data-json", JSON.stringify(selItem));
	        span.attr("title", textsel);
	        $(this.selector).attr("title", textsel);
	        var selectedValue = value;
	        var selectedText = textsel;
	        var v = textsel.length > this.param.subtextlength ? textsel.substring(0, this.param.subtextlength) + "..." : textsel;
	        span.text(v);

	        if (this.param.loadedCallBack) {
	            this.param.loadedCallBack(containerId, selectedValue, selectedText);
	        }
	        return this;
	    }


	};
	module.exports = LuiDropDownList;

/***/ },
/* 3 */
/***/ function(module, exports) {

	function LuiCheckBox() {
	    this.selector = "luicheck";
	    //参数
	    this.param = {};
	}

	LuiCheckBox.prototype = {
	    constructor: LuiCheckBox,
	    /*
	     *warpid 容器id
	     *data 数据集，json 串 [{name:rex,val:001},{name:lilei,val:002}]
	     *展示字段   textField
	     *实际值字段 valueField
	     *回调函数 callback 参数为当前触发的复选框上绑定的数据
	     */
	    init: function (param) {
	        var cthis = this;
	        if (param && param.group) {
	            this.selector = 'luicheck[data-name="' + param.group + '"]';
	        }
	        this.param = param;
	        $(this.selector).each(function (index, item) {
	            var ischeckStyle = $(item).attr("data-checked") == 1 ? "check_sel" : "";
	            var ischeckshow = $(item).attr("data-showcheckbox") != 1;
	            $(item).attr("onselectstart", "return false;");
	            var text = $(item).attr("data-text");
	            var h = '<i class="icon_check ' + ischeckStyle + ' "></i>';
	            var s = '<span class="check_text"  onselectstart="return false;" >' + text + '</span>';
	            h = ischeckshow ? h + s : s;
	            // if ($(item).find("icon_check").length > 0 || $(item).find("check_text").length > 0) {
	            //     return;
	            // }

	            $(item).html(h);
	            $(item).css({"cursor": "pointer"});
	            $(item).unbind("click");
	            $(item).bind("click", function () {
	                var ischeck = $(this).attr("data-checked");
	                if (ischeck == 1) {
	                    $(this).attr("data-checked", 0);
	                    $(this).children("i").removeClass("check_sel").addClass("check_def");
	                }
	                else {
	                    $(this).attr("data-checked", 1);
	                    $(this).children("i").removeClass("check_def").addClass("check_sel");
	                }
	                // alert("bind");
	                if (param && param.callback) {
	                    var groupname = $(item).attr("data-name");
	                    var val = cthis.getJsonValue(groupname);
	                    //调用回调函数，并返回组名和所选中值得json串
	                    //param.callback(groupname, val);
	                    param.callback(item);
	                }
	            });

	        });
	        return this;


	    },
	    //设置checkbox组哪些值被选中
	    setValue: function (name, val) {
	        $(this.selector).filter('[data-name="' + name + '"]').filter('[data-val="' + val + '"]').each(function (index, item) {
	            var ischeck = $(item).attr("data-checked");
	            if (ischeck == 1) {
	            }
	            else {
	                $(item).click();
	            }

	        });
	    },
	    //获取checkbox组选中的值
	    getValue: function (name) {
	        var r = [];
	        $(this.selector).filter('[data-name="' + name + '"]').each(function (index, item) {
	            var ischeck = $(item).attr("data-checked");

	            if (ischeck == 1) {
	                r.push($(item).attr("data-val"));
	            }


	        });
	        alert(r.join(','));
	    },
	    //获取checkbox组选中的值
	    getJsonValue: function (name) {
	        var r = [];
	        $(this.selector).filter('[data-name="' + name + '"]').each(function (index, item) {
	            var ischeck = $(item).attr("data-checked");
	            if (ischeck == 1) {
	                var jsonstr = $(item).attr("data-json");
	                if (jsonstr) {
	                    r.push(JSON.parse(unescape(jsonstr)));
	                }
	            }
	        });
	        return r;
	    },
	    /**判断当前 checkbox 是否选中 */
	    ischeck: function (name, val) {
	        var item = $(this.selector).filter('[data-name="' + name + '"]').filter('[data-val="' + val + '"]')[0];
	        var ischeck = $(item).attr("data-checked");
	        return ischeck == 1;
	    },
	    /**判断当前 checkbox 是否选中 */
	    ischeckElement: function (item) {
	        var ischeck = $(item).attr("data-checked");
	        return ischeck == 1;
	    },
	    /**模拟单击 只改变样式 */
	    setClickStyle: function (item) {
	        var ischeck = $(item).attr("data-checked");
	       this.setClickStyle1(item,ischeck);
	    },
	    setClickStyle1: function (item,ischeck) {
	        if (ischeck == 1) {
	            $(item).attr("data-checked", 0);
	            $(item).children("i").removeClass("check_sel").addClass("check_def");
	        }
	        else {
	            $(item).attr("data-checked", 1);
	            $(item).children("i").addClass("check_sel").removeClass("check_sel");
	        }
	    }
	};
	module.exports = LuiCheckBox;

/***/ },
/* 4 */
/***/ function(module, exports) {

	
	function LuiWordSpeak() {
	    this.selector = "lui_wordspeak";
	    //参数
	    this.param = {};
	}

	LuiWordSpeak.prototype = {
	    constructor: LuiWordSpeak,
	    /*
	     *warpid 容器id
	     *data 数据集，json 串 [{name:rex,val:001},{name:lilei,val:002}]
	     *展示字段   textField
	     *实际值字段 valueField
	     *回调函数 callback 参数为当前触发的复选框上绑定的数据
	     */
	    init: function (param) {
	        var sthis = this;
	        param = param || {};
	        var luidivspeak = '<div class="lui_div_speak" id="lui_div_speak"/>';
	        $("body").append(luidivspeak);
	        $(".lui_wordspeak").each(function (index, item) {
	            // $(item).unbind("mouseover");
	            //$(item).unbind("click");
	            //$(item).bind("click", function () {
	            //    // var soundurl = $(item).attr("data-src");
	            //    sthis.play(item);
	            //});
	            $(item).unbind("mouseover");
	            $(item).bind("mouseover", function () {
	                // var soundurl = $(item).attr("data-src");
	                sthis.play(item);
	            });

	        });
	        if (param.auto) {
	            param.loop = param.loop || 1;
	            if (param.loop > 0) {
	                $(".lui_wordspeak").each(function (index, item) {
	                    sthis.play(item, param.loop,param.interval, param.callback);
	                });
	            }
	        }
	        sthis.param = param;
	        return sthis;
	    },
	    //时间间隔
	    play: function (item, loop, interval, callback) {
	        var sthis = this;
	        loop = loop || 1;
	        interval = interval || 1000;
	        var url = $(item).attr("data-src");
	        var div = document.getElementById('lui_div_speak');
	        div.innerHTML = '<audio id="lui_audio_speak"><source src="' + url + '"></audio>';
	        var audio = $("#lui_audio_speak")[0];
	        audio.onended = null;
	        if (loop > 0) {
	             audio.play();
	            if (callback) {
	                if (loop === 1) {
	                    // audio.onended=callback;
	                    var is_playFinish = setInterval(function () {
	                        if (audio.ended) {
	                            callback();
	                            window.clearInterval(is_playFinish);
	                        }
	                    }, 5);
	                    setTimeout(function () {
	                        window.clearInterval(is_playFinish);
	                    }, 10000);
	                }
	            }
	            loop--;
	        }
	        if (loop > 0) {
	          
	            audio.onended = function () {
	                setTimeout(function () {
	                    sthis.play(item, loop, interval, callback);
	                }, interval);
	            }
	           
	            
	            
	        }
	        else { return; }
	    }

	};
	module.exports=LuiWordSpeak;

/***/ },
/* 5 */
/***/ function(module, exports) {

	function LuiGuide() {

	};
	LuiGuide.prototype.popup=function(dist,getItbutton,has,line,box,dir,content,hasimg,pd,url){//dist那个元素为引导 yes有引导线和框，false没引导线和框  line 线的宽高，box框的宽高  dir向上引导还是向下引导up 向上 down向下,
	                                                            //content 传入的内容  hasimg按钮有没有图片  url  连接框的地址
	                                                            //getItbutton  get-it按钮触发的事件类  pd:外围的padding

	    this.init();
	    var line=line;
	    var box=box;
	    var url=url;
	    var pd=pd
	    if(url){
	        url='/egword/build/img/leade-guide-lineS.png'
	    }else{
	        url='/egword/build/img/guide-line.png'
	    }
	   
	    if(pd){
	        pd=pd
	    }else{pd=10}
	    var hasimg=hasimg;
	   function removeUnit(str,unit) {
	        unit=unit||"px";
	        str=str+"";
	        if(str.indexOf(unit)<0)
	        {
	            return str*1;
	        }
	        else{
	            return (str.substr(0,str.indexOf(unit)))*1;
	        }

	    }
	    if(!has){
	        $(".guide-over-layer").remove();
	        $(".guide-line").remove();
	        $(".guide-msg-pop").remove();
	        $(".guide-pop").remove();
	        $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	    }else{
	        $('<div class="guide-line" style="width:'+line.width+'px;height:'+line.height+'px;background:url('+url+') no-repeat"></div>').insertBefore(document.body.firstChild);
	        $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	        $('<div class="guide-pop"></div>').insertBefore(document.body.firstChild);
	        $('<div class="guide-msg-pop" style="width:'+box.width+'px;height:'+box.height+'px"><span class="anchor"></span><div class="padding"><p>'+content+'</p></div><div class="button-center"><span class="get-it '+getItbutton+'">GET IT!</span></div></div>').insertBefore(document.body.firstChild);
	        if(hasimg){
	            $(".guide-msg-pop").remove();
	            $('<div class="guide-msg-pop" style="width:'+box.width+'px;height:'+box.height+'px;"><span class="anchor"></span><div class="padding"><p>'+content+'</p></div><div class="bottombutton"><span class="get-it '+getItbutton+'">GET IT!</span><img src="'+hasimg+'" alt=""></div></dvi></div>').insertBefore(document.body.firstChild);
	        }
	    }
	    console.log($(getItbutton))
	    $('.' + getItbutton).on('click', function () {
	       $('.guide-pop').hide();
	    })
	    if(dist){
	        var d=$(dist);
	        var pos=d.offset();
	        var t=pos.top-pd-removeUnit(d.css("border-top-width"));
	        var l=pos.left-pd-removeUnit(d.css("border-left-width"));
	        var w=d.width()+removeUnit(d.css("padding-left"))+removeUnit(d.css("padding-right"));
	        var h=d.height()+removeUnit(d.css("padding-top"))+removeUnit(d.css("padding-bottom"));
	        $(".guide-over-layer").css({"top":t+"px","left":l+"px","width":w,"height":h,"padding":pd+'px'});
	        console.log(pd)
	        var hs=$(".guide-over-layer").outerHeight();
	        var ws=$(".guide-over-layer").outerWidth();
	        if(dir=='up'){
	            $(".guide-line").css({"top":t-line.height+"px","left":l+ws/2+"px"});
	            $('.guide-msg-pop').css({"top":t-line.height-box.height/3+"px","left":l+ws/2+line.width+"px"});
	        }else{
	            $(".guide-line").css({"top":t+hs/3+"px","left":l-line.width+"px"});
	            $('.guide-msg-pop').css({"top":t+line.height+hs/3+"px","left":l-box.width/2-line.width+"px"});
	            if(url.indexOf('leade-guide-lineS')>0){
	                console.log(00)
	                $(".guide-line").css({"top":t+hs/2+"px","left":l-line.width/2-10+"px"});
	                $('.guide-msg-pop').css({"top":t+hs/2+box.height/2+"px","left":l+"px"});
	            }
	        }

	    }
	};
	LuiGuide.prototype.init=function(){
	    $(".guide-over-layer").remove();
	    $(".guide-line").remove();
	    $(".guide-pop").remove();
	    $(".guide-msg-pop").remove();
	    /*$('<div class="guide-line"></div>').insertBefore(document.body.firstChild);
	    $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	    $('<div class="guide-msg-pop"><span class="anchor"></span></div>').insertBefore(document.body.firstChild);*/



	    return this;
	};
	module.exports=LuiGuide;


/***/ },
/* 6 */
/***/ function(module, exports) {

	

	function popshow(sele, popshow) {//弹出层的显示
	   
	    sele.on('click', function () {
	        popshow.show();
	        $('.pop-mask').show();
	        $('.pop-mask').show();
	    })
	}
	function pophide(sele, popshow) {//弹出层的消失
	    sele.on('click', function () {
	        popshow.hide();
	        $('.pop-mask').hide();
	    })
	}
	function checkBoox() {//复选框的样式
	    $('.checkBox').on('click', function () {
	        if ($(this).find('img').css('visibility') == 'visible') {
	            $(this).find('img').css('visibility', 'hidden');
	            $(this).css('border', '1px solid #8e9fa8');
	        } else {
	            $(this).find('img').css('visibility', 'visible');
	            $(this).css('border', '1px solid #fff');
	        }
	    })
	}
	function chooseAll() {//全选全不选
	    $('.checkBox').on('click', function () {
	        var num = $('.checkBox').index($(this));
	        if (num == 0) {
	            if ($(this).find('img').css('visibility') == 'visible') {
	                $('.checkBox').each(function () {
	                    $(this).find('img').css('visibility', 'hidden');
	                    $(this).css('border', '1px solid #8e9fa8');
	                })
	            } else {
	                $('.checkBox').each(function () {
	                    $(this).find('img').css('visibility', 'visible');
	                    $(this).css('border', '1px solid #fff');
	                })
	            }
	        } else {
	            if ($(this).find('img').css('visibility') == 'visible') {
	                $(this).find('img').css('visibility', 'hidden');
	                $(this).css('border', '1px solid #8e9fa8');
	            } else {
	                $(this).find('img').css('visibility', 'visible');
	                $(this).css('border', '1px solid #fff');
	            }
	            var $imgs = $.makeArray($('.table tr:not(:first)').find('img'));
	            var value = $imgs.every(function (item) {
	                return item.style.visibility == 'visible';
	            })
	            if (value) {
	                $('.checkBox').first().find('img').css('visibility', 'visible');
	                $('.checkBox').first().css('border', '1px solid #fff');
	            } else {
	                $('.checkBox').first().find('img').css('visibility', 'hidden');
	                $('.checkBox').first().css('border', '1px solid #8e9fa8');
	            }
	        }
	    })

	}
	function Sibs(This) {
	    This.on('click', function () {
	        $(this).addClass('active').siblings().removeClass('active');
	    })
	}

	function radio() {//单选的样式
	    $('.radio').on('click', function () {
	        $('.radio').removeClass('active');
	        $(this).addClass('active');
	    })
	}

	function setCookie(objName, objValue, objHours) {
	    var str = objName + "=" + escape(objValue);

	    if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
	        var date = new Date();
	        var ms = objHours * 3600 * 1000;
	        date.setTime(date.getTime() + ms);
	        str += "; expires=" + date.toGMTString() + ";path=/";
	    }
	    document.cookie = str;
	}

	function getCookie(objName) { //获取指定名称的cookie的值
	    var arrStr = document.cookie.split("; ");
	    for (var i = 0; i < arrStr.length; i++) {
	        var temp = arrStr[i].split("=");
	        if (temp[0] == objName) {
	            return unescape(temp[1]);
	        }
	    }
	}

	//弹出加载图片
	function ShowLoading(obj) {
	    obj.html(jQuery("#divLoading").html());
	}
	function timeTickBig(second,callback) {
	    $(".times-big").html(second+"S");
	    var t = setInterval(function () {
	        $(".times-big").html(--second+"S");
	        if (second <= 0) {
	            $(".rotate-point").css({ "animation-play-state": "paused" });
	            clearInterval(t);
	            if(callback){
	                callback();
	            }
	        }
	    }, 1000);
	    $(".rotate-point").css({ "animation-play-state": "running" });
	}
	function timeTickSmall(second,callback) {
	    var ts=second;
	    $(".rotate-small").show();
	    $(".times-small").html(second+"S");
	    var interval={
	        clock:{},
	        tickTime:0,
	        remainTickTime:0
	    };
	    var t = setInterval(function () {
	        $(".times-small").html(--second+"S");
	        interval.clock=t;
	        interval.remainTickTime=second;
	        interval.tickTime=ts-second;
	        if (second <= 0) {
	            $(".rotate-point").css({ "animation-play-state": "paused" });
	            clearInterval(t);
	            if(callback){
	                callback();
	            }
	        }

	    }, 1000);

	    $(".rotate-point").css({ "animation-play-state": "running" });
	    return interval;
	}
	function progessBar(p,cur,total){
	    if(!p){return;}
	    cur=cur||0;
	    total=total||10;
	    w=$(p).find(".progress-bar").width()*(cur/total);
	    $(p).find(".child-progress").css({"width":w+"px"});
	    $(p).find(".cur-num").html(cur);
	    $(p).find(".total-num").html(total);
	}

	//加载图片到某个元素中
	function InsertLoading(obj) {
	    obj.append(jQuery("#divLoading").html());
	}

	function CheckBrowser() {
	    //平台、设备和操作系统
	    var system = {
	        win: false,
	        mac: false,
	        xll: false,
	        ipad: false
	    };
	    //检测平台
	    var p = navigator.platform;
	    system.win = p.indexOf("Win") == 0;
	    system.mac = p.indexOf("Mac") == 0;
	    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
	    system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
	    if (system.win || system.mac || system.xll) {
	        return false;
	    } else {
	        return true;

	    }
	};
	module.exports = {
	    pophide: pophide,
	    popshow: popshow,
	    checkBoox: checkBoox,
	    Sibs: Sibs,
	    radio: radio,
	    chooseAll: chooseAll,
	    setCookie: setCookie,//设置cookie
	    getCookie: getCookie, // 获取cookie
	    ShowLoading: ShowLoading,//加载中
	    InsertLoading: InsertLoading,
	    timeTickBig: timeTickBig,//倒计时
	    timeTickSmall: timeTickSmall,//倒计时
	    progessBar:progessBar,
	    checkBrowser:CheckBrowser
	}


/***/ },
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	//var template = require('./template');
	var template = __webpack_require__(10);

	/**
	 * 对日期进行格式化，
	 * @param date 要格式化的日期
	 * @param format 进行格式化的模式字符串
	 *     支持的模式字母有：
	 *     y:年,
	 *     M:年中的月份(1-12),
	 *     d:月份中的天(1-31),
	 *     h:小时(0-23),
	 *     m:分(0-59),
	 *     s:秒(0-59),
	 *     S:毫秒(0-999),
	 *     q:季度(1-4)
	 * @return String
	 * @author yanis.wang
	 * @see    http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
	 */

	//时间转换
	template.helper('dateFormat', function (date, format) {
	    date = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
	    //return date.getDate();
	    //date = new Date(date);

	    var map = {
	        "y": date.getYear(),
	        "M": date.getMonth() + 1, //月份 
	        "d": date.getDate(), //日 
	        "h": date.getHours(), //小时 
	        "m": date.getMinutes(), //分 
	        "s": date.getSeconds(), //秒 
	        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
	        "S": date.getMilliseconds() //毫秒 
	    };
	    format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
	        var v = map[t];
	        if (v !== undefined) {
	            if (all.length > 1) {
	                v = '0' + v;
	                v = v.substr(v.length - 2);
	            }
	            return v;
	        }
	        else if (t === 'y') {
	            return (date.getFullYear() + '').substr(4 - all.length);
	        }
	        return all;
	    });
	    return format;
	});

	//截字处理
	template.helper('cutchar', function (obj, charlength) {

	    if (obj == null) {
	        return "";
	    }
	    if (obj.length > parseInt(charlength)) {
	        obj = obj.substring(0, parseInt(charlength)) + "...";
	        return obj;
	    }
	    return obj;

	});

	//教研评级
	template.helper('TeachTypeTran', function (obj) {

	    if (obj == 1) {
	        return "A级";
	    } else {
	        return "B级";
	    }
	});

	//合同期限转换
	template.helper('HtQx', function (obj) {

	    return template.helper(obj) + "年";
	});

	//年级
	template.helper('GetBigGrade', function (e) {
	    return e == 1 ? "一年级"
	        : e == 2 ? "二年级"
	        : e == 3 ? "三年级"
	        : e == 4 ? "四年级"
	        : e == 5 ? "五年级"
	        : e == 6 ? "六年级"
	        : e == 7 ? "七年级"
	        : e == 8 ? "八年级"
	        : e == 9 ? "九年级"
	        : e == 10 ? "高一"
	        : e == 11 ? "高二"
	        : e == 12 ? "高三"
	        : "";

	});

	//获取json对象属性个数
	template.helper('getJsonLength',
	    function (jsonData) {

	        var jsonLength = 0;

	        for (var item in jsonData) {

	            jsonLength++;

	        }

	        return jsonLength;

	    });

	template.helper('floor',
	    function (d) {
	        return Math.floor(d);

	    });

	//大写的转换
	template.helper('GetBigW', function (e) {
	    return e == 1 ? "一"
	        : e == 2 ? "二"
	        : e == 3 ? "三"
	        : e == 4 ? "四"
	        : e == 5 ? "五"
	        : e == 6 ? "六"
	        : e == 7 ? "七"
	        : e == 8 ? "八"
	        : e == 9 ? "九"
	        : e == 10 ? "十"
	        : e == 11 ? "十一"
	        : e == 12 ? "十二"
	        : e == 13 ? "十三"
	        : e == 14 ? "十四"
	        : e == 15 ? "十五"
	        : e == 16 ? "十六"
	        : e == 17 ? "十七"
	        : e == 18 ? "十八"
	        : e == 19 ? "十九"
	        : e == 20 ? "二十"
	        : e == 21 ? "二十一"
	        : e == 22 ? "二十二"
	        : e == 23 ? "二十三"
	        : e == 24 ? "二十四"
	        : e == 25 ? "二十五"
	        : e == 26 ? "二十六"
	        : e == 27 ? "二十七"
	        : e == 28 ? "二十八"
	        : e == 29 ? "二十九"
	        : e == 30 ? "三十"
	        : e == 31 ? "三十一"
	        : e == 32 ? "三十二"
	        : e == 33 ? "三十三"
	        : e == 34 ? "三十四"
	        : e == 35 ? "三十五"
	        : e == 36 ? "三十六"
	        : e == 37 ? "三十七"
	        : e == 38 ? "三十八"
	        : e == 39 ? "三十九"
	        : e == 40 ? "四十"
	        : e == 41 ? "四十一"
	        : e == 42 ? "四十二"
	        : e == 43 ? "四十三"
	        : e == 44 ? "四十四"
	        : e == 45 ? "四十五"
	        : e == 46 ? "四十六"
	        : e == 47 ? "四十七"
	        : e == 48 ? "四十八"
	        : e == 49 ? "四十九"
	        : e == 50 ? "五十"
	        : "";
	});
	//字母的转换
	template.helper('GetEngBig', function (e) {
	    return e == 1 ? "A"
	        : e == 2 ? "B"
	        : e == 3 ? "C"
	        : e == 4 ? "D"
	        : e == 5 ? "E"
	        : e == 6 ? "F"
	        : e == 7 ? "G"
	        : e == 8 ? "H"
	        : e == 9 ? "I"
	        : e == 10 ? "J"
	        : e == 11 ? "K"
	        : e == 12 ? "L"
	        : e == 13 ? "M"
	        : e == 14 ? "N"
	        : e == 15 ? "O"
	        : e == 16 ? "P"
	        : e == 17 ? "Q"
	        : e == 18 ? "R"
	        : e == 19 ? "S"
	        : e == 20 ? "T"
	        : e == 21 ? "U"
	        : e == 22 ? "V"
	        : e == 23 ? "W"
	        : e == 24 ? "X"
	        : e == 25 ? "Y"
	        : e == 26 ? "Z"
	        : "";
	});
	//单词按音节套红
	template.helper('GetRedWord', function (word) {
	    // var arr=e.split("");
	    // var keyword=["a","e","i","o","u"];
	    // var result="";
	    // if(arr&&arr.length>0)
	    // {
	    //      result= arr.map(function (item,index,array) {
	    //         if(keyword.indexOf(item)>-1){
	    //                 return "<span class='red'>"+item+"</span>"
	    //         }
	    //         else{
	    //             return "<span>"+item+"</span>"
	    //         }
	    //     });
	    //     result=result.toString().replace(/,/gi,"");
	    // }
	    // console.log(result);
	    // return result;
	    var wordStr = word.Word;
	    if (word.Word.indexOf("-") == -1) {
	        wordStr = word.Syllables.join("-");
	    }
	    var array = ['sion', 'tion', 'sual', 'sure', 'ture', 'dge', 'ar', 'or', 'er', 'ir', 'ur', 'air', 'eir', 'ear', 'eer', 'oar', 'are', 'ere', 'ere', 'ire', 'ore', 'ure', '-y', 'le', 'al', 'el', 'ol', 'il', 'ul', 'ow', 'ew', 'aw', 'gh', 'nk', 'ng', 'ge', 'a', 'e', 'i', 'o', 'u', 'an', 'en', 'in'];
	    for (var l = 0; l < array.length; l++) {
	        if (wordStr.indexOf(array[l]) != -1) {
	            wordStr = wordStr.replace(new RegExp(array[l], "gi"), (l + 10000).toString());
	        }
	    }
	    for (var l = 0; l < array.length; l++) {
	        if (wordStr.indexOf((l + 10000).toString()) != -1) {
	            wordStr = wordStr.replace(new RegExp((l + 10000).toString(), "gi"), ("<span class=\"red\">" + array[l] + "</span>"));
	        }

	    }

	    var arr = wordStr.split("<span class=\"red\">");
	    for (var m = 0; m < arr.length; m++) {
	        if (arr[m].indexOf("<") == -1) {
	            wordStr = wordStr.replace(arr[m], ("<span>" + arr[m] + "</span>"));
	        } else {
	            if (arr[m].split("</span>")[1] != "") {
	                wordStr = wordStr.replace(arr[m], (arr[m].split("</span>")[0] + "</span><span>" + arr[m].split("</span>")[1] + "</span>"));
	            }
	        }
	    }
	    return wordStr;
	});
	template.helper('test', function (e) {
	    return e;
	})

/***/ },
/* 10 */
/***/ function(module, exports) {

	/*TMODJS:{}*/
	!function () {
		function a(a, b) {
			return (/string|function/.test(typeof b) ? h : g)(a, b)
		}

		function b(a, c) {
			return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
		}

		function c(a) {
			return l[a]
		}

		function d(a) {
			return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
		}

		function e(a, b) {
			if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
		}

		function f(a, b) {
			var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
			for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
			return e
		}

		function g(b, c) {
			var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
			return c ? d(c) : d
		}

		function h(a, b) {
			if ("string" == typeof b) {
				var c = b;
				b = function () {
					return new k(c)
				}
			}
			var d = j[a] = function (c) {
				try {
					return new b(c, a) + ""
				} catch (d) {
					return i(d)()
				}
			};
			return d.prototype = b.prototype = n, d.toString = function () {
				return b + ""
			}, d
		}

		function i(a) {
			var b = "{Template Error}", c = a.stack || "";
			if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
			return function () {
				return "object" == typeof console && console.error(b + "\n\n" + c), b
			}
		}

		var j = a.cache = {}, k = this.String, l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		}, m = Array.isArray || function (a) {
				return "[object Array]" === {}.toString.call(a)
			}, n = a.utils = {
			$helpers: {}, $include: function (a, b, c) {
				return a = f(c, a), g(a, b)
			}, $string: b, $escape: d, $each: e
		}, o = a.helpers = n.$helpers;
		a.get = function (a) {
			return j[a.replace(/^\.\//, "")]
		}, a.helper = function (a, b) {
			o[a] = b
		}, module.exports = a
	}();

/***/ },
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/student/word0',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,Audio=$data.Audio,$each=$utils.$each,WordNatures=$data.WordNatures,v=$data.v,i=$data.i,spellList=$data.spellList,Answer=$data.Answer,Selection=$data.Selection,$out='';$out+='<div class="voice"> <div class="need" style="margin-top:35px;height:85px;line-height:85px;"> <span>听音拼写单词</span> </div> <div class="tell"> <i class="lui_wordspeak" data-src="';
	$out+=$escape(Audio);
	$out+='" data-auto="true" data-loop="2"></i> <span class="see">显示词义</span> ';
	$each(WordNatures,function(v,i){
	$out+=' <span class="word-mean none">';
	$out+=$escape(v);
	$out+='</span> ';
	});
	$out+=' </div> <div class="write"> ';
	$each(spellList,function(v,i){
	$out+=' <input type="text" data-index="';
	$out+=$escape(i);
	$out+='" data-haswrite="0" > ';
	});
	$out+=' <img src="/egword/build/img/error.png" class="word0-clear pointer" alt=""> <span class="none word0-right-answer-right"> <img src="/egword/build/img/smail.png" alt="" class="ml30"> <span class="success">正确拼写:<span>';
	$out+=$escape(Answer);
	$out+='</span></span> </span> <span class="none word0-right-answer-error"> <img src="/egword/build/img/cry.png" alt="" class="ml30"> <span class="error">正确拼写:<span>';
	$out+=$escape(Answer);
	$out+='</span></span> </span> </div> <div class="sing-word" > ';
	$each(Selection,function(v,i){
	$out+=' <span data-op="word0-sel">';
	$out+=$escape(v);
	$out+='</span> ';
	});
	$out+=' </div> </div>';
	return new String($out);
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/student/word1',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,WordNatures=$data.WordNatures,v=$data.v,i=$data.i,$escape=$utils.$escape,spellList=$data.spellList,Answer=$data.Answer,Selection=$data.Selection,$out='';$out+='<div class="voice"> <div class="need" style="margin-top:35px;height:75px;line-height:75px;"> <span>根据词意拼写单词</span> </div> <div class="tell"> ';
	$each(WordNatures,function(v,i){
	$out+=' <span>';
	$out+=$escape(v);
	$out+='</span> ';
	});
	$out+=' </div> <div class="write"> ';
	$each(spellList,function(v,i){
	$out+=' <input type="text" data-index="';
	$out+=$escape(i);
	$out+='" data-haswrite="0" > ';
	});
	$out+=' <img src="/egword/build/img/error.png" class="word0-clear pointer" alt=""> <span class="none word0-right-answer-right"> <img src="/egword/build/img/smail.png" alt="" class="ml30"> <span class="success">正确拼写:<span>';
	$out+=$escape(Answer);
	$out+='</span></span> </span> <span class="none word0-right-answer-error"> <img src="/egword/build/img/cry.png" alt="" class="ml30"> <span class="error">正确拼写:<span>';
	$out+=$escape(Answer);
	$out+='</span></span> </span> </div> <div class="sing-word"> ';
	$each(Selection,function(v,i){
	$out+=' <span data-op="word0-sel">';
	$out+=$escape(v);
	$out+='</span> ';
	});
	$out+=' </div> </div> ';
	return new String($out);
	});

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/student/word2',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,WordNatures=$data.WordNatures,v=$data.v,i=$data.i,$escape=$utils.$escape,Selection=$data.Selection,$out='';$out+='<div class="voice"> <div class="need" style="height:90px;line-height:90px;"> <span>根据词意选择正确的单词</span> </div> <p class="mean" style="margin-bottom:20px;"> ';
	$each(WordNatures,function(v,i){
	$out+=' ';
	$out+=$escape(v);
	$out+=' ';
	});
	$out+=' </p> ';
	$each(Selection,function(v,i){
	$out+=' <div class="btn" data-index="';
	$out+=$escape(i);
	$out+='" data-op="word2-sel"><span class="order">';
	$out+=$escape($helpers. GetEngBig(i+1 ));
	$out+='</span>';
	$out+=$escape(v);
	$out+='</div> ';
	});
	$out+=' </div> ';
	return new String($out);
	});

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/student/word3',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,Word=$data.Word,$string=$utils.$string,Audio=$data.Audio,$each=$utils.$each,Selection=$data.Selection,v=$data.v,i=$data.i,$out='';$out+='<div class="voice"> <div class="mt30"> <span class="need">请选择正确的词义</span> </div> <div class="word"> <span class="fl">';
	$out+=$escape(Word);
	$out+='</span> <div class="pronunce"> ';
	$out+=$string( $helpers.GetRedWord($data));
	$out+=' <i class="lui_wordspeak" data-src="';
	$out+=$escape(Audio);
	$out+='" data-auto="true" data-loop="2"></i>  </div> </div> ';
	$each(Selection,function(v,i){
	$out+=' <div class="btn" data-index="';
	$out+=$escape(i);
	$out+='" data-op="word2-sel"><span class="order">';
	$out+=$escape($helpers. GetEngBig(i+1 ));
	$out+='</span>';
	$out+=$escape(v);
	$out+='</div> ';
	});
	$out+=' </div> ';
	return new String($out);
	});

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(10);
	module.exports=template('src/tpl/student/wordlearn',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,Word=$data.Word,$string=$utils.$string,Audio=$data.Audio,WordType=$data.WordType,$each=$utils.$each,WordNatures=$data.WordNatures,v=$data.v,i=$data.i,Rember=$data.Rember,$out='';$out+='<div class="voice"> <div class="word" style="width:95%;border-bottom: 1px solid #d0d8dd;"> ';
	$out+=$escape(Word);
	$out+=' </div> <div class="pronunce" style="float:none;margin-left:0;"> <span style="font-size:0;" class="pronunce-guide"> ';
	$out+=$string( $helpers.GetRedWord($data));
	$out+=' </span> <i class="lui_wordspeak" data-src="';
	$out+=$escape(Audio);
	$out+='" data-auto="true" data-loop="2"></i>  </div> <div class="word-types">  ';
	if(WordType==2){
	$out+=' <div> <span class="konow-gap-guide"> <span class="konow-gap">陌</span> <span>陌生词，分音节，慢速跟读三遍</span> </span> </div> ';
	}else if(WordType==1){
	$out+=' <div class=""> <span class="konow-gap-guide"> <span class="konow-gap">生</span> <span>夹生词，分音节，快速跟读两遍</span> </span> </div> ';
	}
	$out+=' </div> <div class="anysis none"> ';
	$each(WordNatures,function(v,i){
	$out+=' <span>';
	$out+=$escape(v);
	$out+='</span> <br /> ';
	});
	$out+=' </div> <div class="remumber none" > <div class="wordWrap"><span class="mr10">【记忆法】</span>';
	$out+=$escape(Rember);
	$out+='</div> </div> <div class="btns" id="btn-learn-next" style="margin-top:35px;background: #ff8b1e;border: 1px solid #ff3c00;width: 100%;text-align:center;color:#fff;display: none">下一个</div> </div>';
	return new String($out);
	});

/***/ }
/******/ ]);