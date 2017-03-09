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

	var lui = __webpack_require__(1);
	var lui = new lui();
	var guide = lui.initGuide();
	//夹生词
	//guide.popup($(".konow-gap-guide")[1],'konow-gap-guides',true,{width:130,height:125},{width:340,height:175},'up','掌握程度不同，学习方法不同，因“词”施教！','/egword/build/img/get-it-img3.png');
	//记忆法
	//guide.popup($(".remumber")[0],'remumber',false);



	//单词熟悉不熟悉 word-familiar show
	//guide.popup($(".word-familiar .btn")[0],'word-familiar',true,{width:63,height:176},{width:545,height:236},'down',' 1、用户第1次进入基础课页第1单元第1个单词，根据结果提示：<br/> 2、熟悉&答对、未作答&答对：“Congratulations！熟悉词加一<br/>3、熟悉&答错、未作答&答错：“Come on！夹生词+1','/egword/build/img/chose-guide.png',15,'/egword/build/img/leade-guide-lineS.png');



	var currentType = -1;//0，熟词；1，夹生词；2，生词(-1未进入状态；3熟悉或未熟悉没有点击;4未学)；
	var currentUseTime = 0;
	var timer;
	var timerRead;
	var canClick = false;


	//初始化页面
	function InitPage() {
	    localStorage.clear();
	    $.post("/Student/LearnCenter/MeetSelfTest", { "unitId": unitId }, function (result) {
	        if (result.State == 0) {
	            if (result.Data == 0) {
	                $.post("/Student/LearnCenter/ObtainWord", { "unitId": unitId }, function (result) {
	                    if (result.State == 0) {
	                        localStorage.Index = result.Index;
	                        localStorage.Words = JSON.stringify(result.Words);
	                        InitProccess();
	                        InitLearnPage(1, 0);
	                    }
	                });

	            } else {
	                $(".congration").html("恭喜，已完成本单元" + result.Data + "个词汇的学习！");
	                $("#learnend").removeClass("none");
	                $("#learning").addClass("none");
	            }
	        }
	    });
	}

	//初始化进度条
	function InitProccess() {
	    var index = parseInt(localStorage.Index);
	    var arrary = JSON.parse(localStorage.Words);
	    var count = (index + 1) + "/" + arrary.length;
	    $(".child-progress").attr("style", "width:" + (index + 1) * (480 / arrary.length) + "px");
	    $(".color").html(count);
	}

	///0，是否熟悉时间；1，学习阶段学习单词界面提留时间；2，学习自测时间；3，自测阶段的自测时间；4，复习阶段的自测时间；5，复习阶段学习页面停留时间
	function LogTime(useTime, type) {
	    var index = parseInt(localStorage.Index);
	    var arrary = JSON.parse(localStorage.Words);
	    var word = arrary[index];
	    $.post("/Student/LearnCenter/LogAllTime", { "unitId": unitId, "wordId": word.WordId, "useTime": currentUseTime, "type": type }, function (result) {
	        if (result.State == 0) {
	            if (result.Data == "true") {
	                console.log("LogTime log true");
	            }
	        }
	    });
	}

	//更新word单词的类别
	function SetWordType() {
	    var index = parseInt(localStorage.Index);
	    var arrary = JSON.parse(localStorage.Words);
	    var word = arrary[index];
	    $.post("/Student/LearnCenter/SetWordType", { "wordId": word.WordId, "type": currentType, "unitId": unitId, "bgrade": word.Bgrade }, function (result) {
	        if (result.State == 0) {
	            if (result.Data == "true") {
	                console.log("SetWordType log true");
	            }
	        }
	    });
	}
	//记录做题记录
	function LogStudy(ispass, qtype) {
	    var index = parseInt(localStorage.Index);
	    var arrary = JSON.parse(localStorage.Words);
	    var word = arrary[index];
	    $.post("/Student/LearnCenter/LogStudy", { "studytype": 0, "wordId": word.WordId, "ispass": ispass, "qtype": qtype, "bookGroupId": bookGroupId, "useTime": currentUseTime }, function (result) {
	        if (result.State == 0) {
	            if (result.Data == "true") {
	                console.log("LogStudy log true");
	            }
	        }
	    });
	}

	//更新方式（1，学习完上一个学习下一个。0，未学习上一个从而学习下一个）
	function SetStudyUp(type) {
	    $.post("/Student/LearnCenter/SetStudyUp", { "unitId": unitId, "type": type }, function (result) {
	        if (result.State == 0) {
	            if (result.Data == "true") {
	                if (type == 0) {
	                    var arrary = JSON.parse(localStorage.Words);
	                    var index = parseInt(localStorage.Index);
	                    var word = arrary[index];
	                    arrary.splice(index, 1);
	                    arrary.push(word);
	                }
	                console.log("SetStudyUp log true");
	            }
	        }
	    });
	}

	function SubStringStr(str) {
	    return str.substring(0,25)+(str.length>25?"...":"");
	}

	//初始化学习页面
	function InitLearnPage(position, lastposition) {


	    ///没个里面初始话一下时间
	    currentUseTime = 0;

	    $("#learn").addClass("none");
	    $("#know").addClass("none");
	    $("#learnend").addClass("none");
	    $("#choosedo").addClass("none");
	    $("#listendo").addClass("none");

	    var index = parseInt(localStorage.Index);
	    var arrary = JSON.parse(localStorage.Words);
	    var word = arrary[index];
	    switch (position) {
	        case 1:
	            clearInterval(timer);
	            $(".rotate-small").show();
	            $("#time").html("5s");
	            $("#time").attr("datanum", 5);
	            currentUseTime = 0;
	            var wordStr = word.Word;
	            if (word.Word.indexOf("-") == -1) {
	                wordStr = word.Syllables.join("-");
	            }


	            var array = ['sion', 'tion', 'sual', 'sure', 'ture', 'dge', 'ar', 'or', 'er', 'ir', 'ur', 'air', 'eir', 'ear', 'eer', 'oar', 'are', 'ere', 'ere', 'ire', 'ore', 'ure', '-y', 'le', 'al', 'el', 'ol', 'il', 'ul', 'ow', 'ew', 'aw', 'gh', 'nk', 'ng', 'ge', 'a', 'e', 'i', 'o', 'u','an','en','in'];
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

	            $("#know").children(".voice").children(".word").html(word.Word);
	            $("#know").children(".voice").children(".pronunce").html("<span class='pronunce-guide'>" + wordStr + "</span>" + "<img src=\"/egword/build/img/horn.png\" data-id=\"" + word.WordId + "\" alt=\"\" class=\"horn\"><audio id=\"myaudio" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
	            $("#know").removeClass("none");
	            if (parseInt(showTask) == 1) {
	                guide.popup($(".rotate-small")[0], 'roates', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'down', '快速聚焦是一种能力，你要在短时间内作出准确判断！', '/egword/build/img/clock-clock.png', 12);
	            } else {
	                timer = setInterval(function () {
	                    var value = parseInt($("#time").attr("datanum")) - 1;
	                    currentUseTime = parseInt(currentUseTime) + 1;
	                    $("#time").html(value + "s");
	                    $("#time").attr("datanum", value);
	                    if (value == 0) {
	                        clearInterval(timer);
	                        currentType = 3;
	                        InitLearnPage(2, 1);
	                    }
	                }, 1000);
	            }
	            break;
	        case 2:
	            clearInterval(timer);
	            $(".rotate-small").show();
	            $("#time").html("10s");
	            $("#time").attr("datanum", 10);
	            currentUseTime = 0
	            if (((word.Spoken == 1 || word.Writen == 1 || word.ReadH == 1) && lastposition == 3) || ((word.Spoken == 1 || word.Writen == 1) && lastposition == 1)) {

	                var mean = "";
	                for (var i = 0; i < word.Mean.length; i++) {
	                    mean += (word.Mean[i] + " ");
	                }
	                $("#listendo").children(".content").children(".tell").html("<img src=\"/egword/build/img/horn.png\" data-id=\"" + word.WordId + "\" alt=\"\" class=\"horn\"><span class=\"btn\" id=\"oneshow\">显示词义</span><span class=\"oneciyi\">" + mean + "</span><audio id=\"myaudio" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
	                var kong = "";
	                for (var i = 0; i < word.Syllables.length; i++) {
	                    if (i == word.Syllables.length - 1) {
	                        kong += "<input type=\"text\" id=\"onefinshed\"><span class=\"none\" id=\"errorshow\"><img src=\"/egword/build/img/cry.png\" alt=\"\" class=\"ml30\" ><span class=\"error\">正确拼写:<span>" + word.Word + "</span></span></span><span class=\"none\" id=\"rightshow\"><img src=\"/egword/build/img/smail.png\" alt=\"\" class=\"ml30\"><span class=\"success\">正确</span></span>";
	                    } else {
	                        kong += "<input type=\"text\">";
	                    }
	                }
	               
	                $("#listendo").children(".content").children(".write").html(kong);

	                var spanchoose = "";
	                for (var i = 0; i < word.Syllables.length; i++) {
	                    spanchoose += ("<span>" + word.Syllables[i] + "</span>");
	                    switch (i) {
	                        case 0:
	                            for (var j = 0; j < word.OneSd.length; j++) {
	                                spanchoose += ("<span>" + word.OneSd[j] + "</span>");
	                            }
	                            break;
	                        case 1:
	                            for (var k = 0; k < word.TwoSd.length; k++) {
	                                spanchoose += ("<span>" + word.TwoSd[k] + "</span>");
	                            }
	                            break;
	                        case 2:
	                            for (var h = 0; h < word.ThreeSd.length; h++) {
	                                spanchoose += ("<span>" + word.ThreeSd[h] + "</span>");
	                            }
	                            break;
	                        case 3:
	                            for (var p = 0; p < word.FourSd.length; p++) {
	                                spanchoose += ("<span>" + word.FourSd[p] + "</span>");
	                            }
	                            break;
	                    }
	                }
	                $("#listendo").children(".content").children(".sing-word").html(spanchoose);
	                $(".oneciyi").hide();
	                $("#listendo").removeClass("none");
	                var readId = "myaudio" + +word.WordId;
	                var start = 0;
	                document.getElementById(readId).play();
	                document.getElementById(readId).onended = function () {
	                    start++;
	                    start == 1 && document.getElementById(readId).pause();
	                };
	               
	                

	            } else {
	                $("#choosedo").children(".content").children(".voice").children(".word").children(".fl").html(word.Word);
	                //   $("#know").children(".content").children(".pronunce").html(wordStr + "<img src=\"/egword/build/img/horn.png\" data-id=\"" + word.WordId + "\" alt=\"\" class=\"horn\"><audio id=\"myaudio" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
	                $("#choosedo").children(".content").children(".voice").children(".word").children(".pronunce").html(wordStr + "<img src=\"/egword/build/img/horn.png\" data-id=\"" + word.WordId + "\" alt=\"\" class=\"horn\"><audio id=\"myaudio" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
	                var num = Math.floor(Math.random() * 4 + 1);
	                var chooseItem = "";
	                var count = 0;
	                var mean = "";
	                for (var i = 0; i < word.Mean.length; i++) {
	                    mean += (word.Mean[i] + " ");
	                }
	                for (var i = 1; i < 5; i++) {
	                    if (i == num) {
	                        chooseItem += ("<div class=\"btn\" data-id=\"ok\">" + SubStringStr(mean) + "</div><img src=\"/egword/build/img/big-ok.png\" alt=\"\" class=\"vm\" data-id=\"ok\">");
	                    } else {
	                        chooseItem += ("<div class=\"btn\" data-id=\"" + i + "\">" + SubStringStr(word.Choose[count]) + "</div><img src=\"/egword/build/img/big-error.png\" alt=\"\" class=\"vm\" data-id=\"" + i + "\" data-name=\"error\">");
	                        count++;
	                    }
	                }
	                $("#choosedo").children(".content").children(".voice").children(".items").html(chooseItem);
	                $("#choosedo").children(".content").children(".voice").children(".items").children("img").each(function () {
	                    $(this).hide();
	                });
	                $("#choosedo").removeClass("none");
	            }
	            timer = setInterval(function () {
	                var value = parseInt($("#time").attr("datanum")) - 1;
	                currentUseTime = parseInt(currentUseTime) + 1;
	                $("#time").html(value + "s");
	                $("#time").attr("datanum", value);
	                if (value == 0) {
	                    //单词未学
	                    clearInterval(timer);
	                    if (currentType == -1 || currentType == 3) {
	                        currentType = 4;
	                    }
	                    InitLearnPage(3, 0);
	                }
	            }, 1000);
	            break;
	        case 3:
	            canClick = false;
	            clearInterval(timer);
	            $("#learn").children(".voice").children(".remumber").html("");
	            $("#learn").children(".voice").children(".remumber").hide();
	            $("#nextword").hide();
	            $("#learn").children(".voice").children(".anysis").html("");

	            $(".rotate-small").hide();
	            $("#time").html("20s");
	            $("#time").attr("datanum", 20);
	            timer = setInterval(function () {
	                var value = parseInt($("#time").attr("datanum")) - 1;
	                currentUseTime = parseInt(currentUseTime) + 1;
	                $("#time").html(value + "s");
	                $("#time").attr("datanum", value);
	                if (value == 0) {
	                    clearInterval(timer);
	                }
	            }, 1000);
	            currentUseTime = 0;
	            $("#learn").children(".voice").children(".word").html(word.Word);

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
	            $("#learn").children(".voice").children(".pronunce").html("<span>" + wordStr + "</span>" + "<img src=\"/egword/build/img/horn.png\" data-id=\"" + word.WordId + "\" alt=\"\" class=\"horn\"><audio id=\"myaudio" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
	            $("#learn").removeClass("none");

	            var count = 0;
	            //发出读音后展示词性  词义
	            if (currentType == 1) {
	                count = 2;
	                $("#learn").children(".voice").children(".word-types").html("<div class=\"konow-gapone\"><span class=\"konow-gap\">生</span><span>夹生词，请快速跟读两遍</span></div><audio id=\"autuo" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");

	            } else if (currentType == 2 || currentType == 4) {
	                count = 3;
	                $("#learn").children(".voice").children(".word-types").html(" <div class=\"konow-gapone\"><span class=\"konow-gap\">陌</span><span>陌生词，请慢速跟读三遍</span></div><audio id=\"autuo" + word.WordId + "\" src=\"" + word.Audio + "\" controls=\"controls\" hidden=\"true\" >");
	            }

	            var dataId = "autuo" + word.WordId;
	            var start = 0;
	            document.getElementById(dataId).play();
	            document.getElementById(dataId).onended = function () {
	                start++;
	                if (start == count) {

	                    document.getElementById(dataId).pause();
	                    $("#learn").children(".voice").children(".remumber").show();
	                    $("#nextword").show();
	                    $("#learn").children(".voice").children(".remumber").html("<div class=\"wordWrap\"><span class=\"mr10\">【记忆法】</span>" + word.Rember + "</div>");
	                    var mean = "";
	                    for (var i = 0; i < word.Mean.length; i++) {
	                        mean += (word.Mean[i] + "<br/>");
	                    }
	                    $("#learn").children(".voice").children(".anysis").html(" <span>" + mean + "</span>");
	                    canClick = true;
	                    if (parseInt(userCount) == 0) {
	                        clearInterval(timer);
	                        guide.popup($(".konow-gapone")[0], 'konow-gap-guides', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'up', '掌握程度不同，学习方法不同，因“词”施教！', '/egword/build/img/get-it-img3.png');
	                    }
	                } else {
	                    setTimeout(function() {
	                        document.getElementById(dataId).play();
	                    }, 1000);
	                   // document.getElementById(dataId).play();
	                }
	            };

	            $("#learn").removeClass("none");

	            break;
	        default:
	            break;
	    }



	}

	$(function () {
	    InitPage();

	    $("body").delegate(".start-learn", "click", function (event) {
	        window.location.href = "/Student/LearnCenter/SelfTestWord?unitId=" + unitId;
	    });

	    $("body").delegate(".konow-gap-guides", "click", function (event) {
	        $(".guide-over-layer").remove();
	        $(".guide-line").remove();
	        $(".guide-msg-pop").remove();
	        //记忆法
	        guide.popup($(".remumber")[0], 'remumberone', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'up', '别人家的孩子经常用的记忆小贴士，让你记得更快、更牢、更有趣！', '/egword/build/img/get-it-img3.png');
	    });

	    $("body").delegate(".remumberone", "click", function (event) {
	        $(".guide-over-layer").remove();
	        $(".guide-line").remove();
	        $(".guide-msg-pop").remove();
	        $("#time").html("20s");
	        $("#time").attr("datanum", 20);
	        timer = setInterval(function () {
	            var value = parseInt($("#time").attr("datanum")) - 1;
	            currentUseTime = parseInt(currentUseTime) + 1;
	            $("#time").html(value + "s");
	            $("#time").attr("datanum", value);
	            if (value == 0) {
	                clearInterval(timer);
	            }
	        }, 1000);
	        userCount = 1;
	    });

	    $("body").delegate(".roates", "click", function (event) {
	        $(".guide-over-layer").remove();
	        $(".guide-line").remove();
	        $(".guide-msg-pop").remove();
	        guide.popup($(".pronunce-guide")[0], 'pronunce-guides', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'down', '注意标红字母的发音，掌握自然拼读法，“拼音式”记忆！', '/egword/build/img/pingzi.png', 25);
	    });

	    $("body").delegate(".pronunce-guides", "click", function (event) {
	        $(".guide-over-layer").remove();
	        $(".guide-line").remove();
	        $(".guide-msg-pop").remove();
	        $("#time").html("5s");
	        $("#time").attr("datanum", 5);
	        timer = setInterval(function () {
	            var value = parseInt($("#time").attr("datanum")) - 1;
	            currentUseTime = parseInt(currentUseTime) + 1;
	            $("#time").html(value + "s");
	            $("#time").attr("datanum", value);
	            if (value == 0) {
	                clearInterval(timer);
	                currentType = 3;
	                InitLearnPage(2, 1);
	            }
	        }, 1000);
	       
	    });

	    $("body").delegate("#exit", "click", function (event) {
	        window.location.href = "/Student/LearnCenter/Index";
	    });
	    //读音
	    $("body").delegate(".horn", "mouseover", function (event) {
	        var readId = "myaudio" + event.target.getAttribute("data-id");
	        var start = 0;
	        document.getElementById(readId).play();
	        document.getElementById(readId).onended = function () {
	            start++;
	            start == 1 && document.getElementById(readId).pause();
	        };

	    });

	    //展示词义
	    $("body").delegate("#oneshow", "click", function () {
	        if ($(this).html() == "显示词义") {
	            $(this).html("隐藏词义");
	        } else {
	            $(this).html("显示词义");
	        }

	        $(".oneciyi").each(function () {
	            $(this).toggle();
	        });
	    });

	    //拼写题
	    $("body").delegate("#onetype", "click", function (event) {
	        if ($(event.target).attr("class") != undefined) {
	            return;
	        }
	        var value = event.target.innerHTML;
	        if (value.indexOf("<") != -1) {
	            return;
	        }
	        event.target.setAttribute("class", "active");
	        var write = true;
	        $("input").each(function () {
	            if ($(this).val() == "" && write) {
	                $(this).val(value);
	                write = false;
	                if ($(this).attr("id") == "onefinshed") {
	                    var word = JSON.parse(localStorage.Words)[localStorage.Index];
	                    var answer = "";
	                    $("input").each(function () {
	                        answer += $(this).val();
	                    });
	                    if (answer == word.Word) {
	                        $("#rightshow").remove("none");
	                        $("#rightshow").show();

	                        LogTime(currentUseTime, 2);
	                        if (currentType == -1) {
	                            currentType = 0;
	                            SetWordType();
	                        } else if (currentType == 3) {
	                            LogTime(5, 0);
	                            currentType = 0;
	                            SetWordType();
	                        }
	                        LogStudy(1, 0);
	                        SetStudyUp(1);
	                        localStorage.Index = parseInt(localStorage.Index) + 1;
	                        currentType = -1;
	                        
	                        setTimeout(function () {
	                            InitProccess();
	                            if (parseInt(localStorage.Index) == JSON.parse(localStorage.Words).length) {
	                                window.location.href = "/Student/LearnCenter/SelfTestIndex?unitId=" + unitId + "&count=" + localStorage.Index;
	                            } else {
	                               
	                                InitLearnPage(1, 0);
	                            }
	                        }, 1000);


	                    } else {
	                        $("#errorshow").remove("none");
	                        $("#errorshow").show();

	                        setTimeout(function () {
	                            //进入学习页面
	                            LogTime(currentUseTime, 2);
	                            if (currentType == -1) {
	                                currentType = 1;
	                                SetWordType();
	                            } else if (currentType == 3) {
	                                LogTime(5, 0);
	                                currentType = 2;
	                                SetWordType();
	                            }
	                            LogStudy(0, 0);
	                            InitLearnPage(3, 0);
	                        }, 1000);
	                    }
	                }
	            }
	        });
	    });

	    //选义题
	    $("body").delegate(".items", "click", function (event) {
	        $(this).children("img").each(function () {
	            if ($(this).attr("data-id") == $(event.target).attr("data-id")) {
	                $(this).removeClass("none");
	            }
	        });
	        if ($(event.target).attr("data-id") == "ok") {
	            $("img[data-id=\"ok\"]").show();
	            LogTime(currentUseTime, 2);
	            if (currentType == -1) {
	                currentType = 0;
	                SetWordType();
	            } else if (currentType == 3) {
	                LogTime(5, 0);
	                currentType = 0;
	                SetWordType();
	            }
	            LogStudy(1, 3);
	            SetStudyUp(1);
	            localStorage.Index = parseInt(localStorage.Index) + 1;
	            currentType = -1;
	            if (parseInt(userCount) == 0) {
	                guide.popup($(event.target), 'userchooseok', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'up', 'Congratulations！熟词＋1', '/egword/build/img/get-it-img3.png');
	                clearInterval(timer);

	            } else {
	                setTimeout(function () {
	                    InitProccess();
	                    if (parseInt(localStorage.Index) == JSON.parse(localStorage.Words).length) {
	                        window.location.href = "/Student/LearnCenter/SelfTestIndex?unitId=" + unitId + "&count=" + localStorage.Index;
	                    } else {
	                        InitLearnPage(1, 0);
	                    }
	                }, 1000);
	            }

	        } else {
	            $("img[data-id=\"" + $(event.target).attr("data-id") + "\"]").show();
	            setTimeout(function () {
	                LogStudy(0, 3);
	                LogTime(currentUseTime, 2);
	                if (currentType == -1) {
	                    currentType = 1;
	                    SetWordType();
	                }
	                else if (currentType == 3) {
	                    LogTime(5, 0);
	                    currentType = 0;
	                    SetWordType();
	                }
	                if (parseInt(userCount) == 0) {
	                    guide.popup($(event.target), 'userchooseerror', true, { width: 130, height: 125 }, { width: 340, height: 175 }, 'up', 'Come on！夹生词＋1', '/egword/build/img/get-it-img3.png');
	                    clearInterval(timer);
	                } else {
	                    InitLearnPage(3, 0);
	                }
	            }, 1000);


	        }
	    });

	    $("body").delegate("#knowword", "click", function (event) {
	        LogTime(unitId, currentUseTime, 0);
	        InitLearnPage(2, 1);
	    });

	    $("body").delegate("#notknow", "click", function (event) {
	        LogTime(unitId, currentUseTime, 0);
	        currentType = 2;
	        SetWordType();
	        InitLearnPage(3, 0);
	    });

	    $("body").delegate("#nextword", "click", function (event) {
	        if (!canClick) {
	            return;
	        }
	        clearInterval(timer);
	        clearInterval(timerRead);
	        if (currentType == 4) {
	            SetStudyUp(0);
	            localStorage.Index = parseInt(localStorage.Index) + 1;
	            currentType = -1;
	        } else {
	            LogTime(currentUseTime, 1);
	            InitLearnPage(2, 3);
	        }

	    });

	    $("body").delegate(".userchooseok", "click", function (event) {
	        $(".guide-over-layer").remove();
	        $(".guide-line").remove();
	        $(".guide-msg-pop").remove();
	        if (parseInt(localStorage.Index) == JSON.parse(localStorage.Words).length) {
	            window.location.href = "/Student/LearnCenter/SelfTestIndex?unitId=" + unitId + "&count=" + localStorage.Index;
	        } else {
	            InitLearnPage(1, 0);
	        }
	    });

	    $("body").delegate(".userchooseerror", "click", function (event) {
	        $(".guide-over-layer").remove();
	        $(".guide-line").remove();
	        $(".guide-msg-pop").remove();
	        InitLearnPage(3, 0);
	    });
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
	            $(item).unbind("click");
	            $(item).bind("click", function () {
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
	        if (loop > 0) {
	            var url = $(item).attr("data-src");
	            var div = document.getElementById('lui_div_speak');
	            div.innerHTML = '<audio id="lui_audio_speak"><source src="' + url + '"></audio>';
	            var audio = $("#lui_audio_speak")[0];
	            audio.play();
	            if (callback) {
	                if (loop === 1) {
	                    // audio.onended=callback;
	                    var is_playFinish = setInterval(function () {
	                        if (audio.ended) {
	                            callback();
	                            window.clearInterval(is_playFinish);
	                        }
	                        setTimeout(function() {
	                            window.clearInterval(is_playFinish);
	                        }, 10000);
	                    }, 5);
	                }
	            }
	            loop--;
	        }
	        if (loop > 0) {
	            setTimeout(function () {
	                sthis.play(item, loop,interval,callback);
	            }, interval);
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
	        $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	    }else{
	        $('<div class="guide-line" style="width:'+line.width+'px;height:'+line.height+'px;background:url('+url+') no-repeat"></div>').insertBefore(document.body.firstChild);
	        $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	        $('<div class="guide-msg-pop" style="width:'+box.width+'px;height:'+box.height+'px"><span class="anchor"></span><div class="padding"><p>'+content+'</p></div><div class="button-center"><span class="get-it '+getItbutton+'">GET IT!</span></div></div>').insertBefore(document.body.firstChild);
	        if(hasimg){
	            $(".guide-msg-pop").remove();
	            $('<div class="guide-msg-pop" style="width:'+box.width+'px;height:'+box.height+'px;"><span class="anchor"></span><div class="padding"><p>'+content+'</p></div><div class="bottombutton"><span class="get-it '+getItbutton+'">GET IT!</span><img src="'+hasimg+'" alt=""></div></dvi></div>').insertBefore(document.body.firstChild);
	        }
	    }
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
	    $(".guide-msg-pop").remove();
	    /*$('<div class="guide-line"></div>').insertBefore(document.body.firstChild);
	    $('<div class="guide-over-layer"></div>').insertBefore(document.body.firstChild);
	    $('<div class="guide-msg-pop"><span class="anchor"></span></div>').insertBefore(document.body.firstChild);*/



	    return this;
	};
	module.exports=LuiGuide;


/***/ }
/******/ ]);