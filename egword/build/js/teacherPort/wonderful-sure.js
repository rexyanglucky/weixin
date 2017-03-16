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
/***/ function(module, exports) {

	

	var classindex;
	var classid;

	var temp_pic_count = 0;
	var islate = 0;

	$(function () {

	    classindex = $("#hidden-classindex").text();
	    classid = $("#hidden-classid").text();

	    $(".b-tab").click(function () {

	        $.router.load("/teacher/myclass/CourseReport?classindex=" + classindex + "&classid=" + classid, true);
	    });

	    GetSplendidPic();

	    $("#btn-submit").click(SetPic);

	    $("#b-upfile").on("change", function (e) {

	        var file = e.target.files[0];
	        console.log(file);
	        var supportedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
	        $("#b-message").html('文件格式只支持：jpg、jpeg 和 png' + "当前类型：" + file.type+"文件名称："+file.name+"文件大小"+file.size/1024+"KB");
	        //if (file && supportedTypes.indexOf(file.type) >= 0) {
	            if (typeof FileReader === 'undefined') {

	            }
	            else {
	                var oReader = new FileReader();
	                oReader.onload = function (e) {
	                    var str = e.target.result;
	                    var arr = str.split(";");
	                    var type = arr[0].split(":")[1];
	                    //$("#b-message").html('文件格式只支持：jpg、jpeg 和 png' + "当前类型：" + file.type + "文件名称：" + file.name + "文件大小" + file.size / 1024 + "KB" + "data:" + type);
	                    $("#b-message").html('文件格式只支持：jpg、jpeg 和 png' + "当前类型：" + file.type + "文件名称：" + file.name + "文件大小" + file.size / 1024 + "KB" + "data:" + e.target.result);
	                    var img = '<div class="img"><img src="' + e.target.result + '" alt="" class="b-upimg"><span class="close b-delimg"></span></div>';
	                    $("#b-piclist").prepend(img);

	                    temp_pic_count++;

	                    $("#b-show-btnsubmit").show();

	                    $(".b-delimg").off("click");
	                    $(".b-delimg").on("click", function () {
	                        $(this).parent().remove();

	                        temp_pic_count--;

	                        if (temp_pic_count == 0) {
	                            $("#b-show-btnsubmit").hide();
	                        }

	                    });


	                };
	                oReader.readAsDataURL(file);

	            }

	            //$("#b-message").html('课堂精彩瞬间照片请下课后一小时内完成上传，逾期将无法上传！');

	        //} else {
	        //    if (file) {

	        //        $("#b-message").html('文件格式只支持：jpg、jpeg 和 png' + "当前类型：" + file.type);
	        //        $("#b-message").html('文件格式只支持：jpg、jpeg 和 png' + "当前类型：" + file.type + "文件名称：" + file.name + "文件大小" + file.size / 1024 + "KB");
	        //    }

	        //}



	    });


	});

	function GetSplendidPic() {
	    //$.ajax({
	    //    type: "get",
	    //    url: "/teacher/myclass/GetSplendidPic",
	    //    cache: false,
	    //    data: {
	    //        classindex: classindex
	    //    },
	    //    dataType: "JSON",
	    //    success: function (data) {

	    //        data = JSON.parse(data);

	    //        var m = data.result;
	    //        islate = data.islate;

	    //        var str = "";
	    //        for (var i = 0; i < m.length; i++) {
	    //            str += '<div class="img" ><img src="' + m[i].PicUrl + '" alt=""></div>';
	    //        }

	    //        $("#b-piclist").html(str);

	    //        $("#b-show-btnsubmit").hide();

	    //        if (islate) {

	    //            //上传按钮不可用
	    //            $("#b-showupimg").hide();


	    //        }
	    //    }
	    //});
	}

	function SetPic() {
	    $.showPreloader('努力上传中...');

	    var picArr = [];
	    $(".b-upimg").each(function (i, v) {

	        var src = $(v).prop("src");

	        picArr.push(src);

	    });
	    if (picArr.length > 9 || picArr.length == 0) {
	        $("#b-message").html("上传失败");
	        return;
	    }
	    var picarrstr = JSON.stringify(picArr);
	    
	    $.ajax({
	        type: "post",
	        url: "/teacher/myclass/SetSplendidPic",
	        cache: false,
	        data: {
	            classindex: classindex,
	            remark: "",
	            picid: 0,//0 add,>0 del
	            picarr: picarrstr
	        },
	        dataType: "JSON",
	        success: function (data) {
	            $.hidePreloader();
	            data = JSON.parse(data);

	            if (data.result == -1) {
	                //上传失败
	                $("#b-message").html("无法上传（1小时内上传有效）");
	            }
	            else if (data.result == 0) {
	                $("#b-message").html("上传失败");
	            } else {
	                $("#b-message").html("上传成功");
	                $(".b-delimg").remove();

	                temp_pic_count = 0;
	                $("#b-show-btnsubmit").hide();

	            }
	            setTimeout(function () {
	                $("#b-message").html("课堂精彩瞬间照片请下课后一小时内完成上传，逾期将无法上传！");
	            }, 3000);

	        }
	    });

	}

/***/ }
/******/ ]);