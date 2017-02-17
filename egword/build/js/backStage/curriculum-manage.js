/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	var row_data = { BookSetID: 0, SName: "", BookNumber: 0, Remark: "" };//当前行数据
	
	$("[data-close]").click(function () {
	    $('.pop-mask,#edit').hide();
	});
	
	$("#edit-num").keypress(function () {
	    var keynum = event.keyCode;
	    if (!(keynum >= 48 && keynum <= 57))//非数字
	        return false;
	    if ($(this).val().length == 3)//3位数字
	        return false;
	    if ($(this).val() == "" && keynum == 48)//首位不能为0
	        return false;
	    $("[data-type='edit-info']").css({ "visibility": "hidden" });
	});
	
	
	$("[data-type='view-info']").click(function () {
	    $.ajax({
	        type: "post",
	        url: "/Org/Course/GetBookSetInfo",
	        data: { BookSetID: row_data.BookSetID },
	        dataType: "json",
	        error: function (e) {
	        },
	        success: function (e) {
	            if (e.OK) {
	                $("#edit-num").val(e.Data[0].DefaultNumber);
	            }
	        }
	    });
	});
	
	//修改班级
	$("#edit-ok").click(function () {
	    if ($("[data-type='edit-info']").css("visibility") == "visible") {
	        return;
	    }
	    row_data.BookNumber = $("#edit-num").val();
	    row_data.Remark = $("#edit-remark").val();
	    if (!(+row_data.BookNumber > 0 && +row_data.BookNumber < 1000)) {
	        $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请正确填写课次！");
	        return;
	    }
	    $.ajax({
	        type: "post",
	        url: "/Org/Course/EditCourse",
	        data: { data: JSON.stringify(row_data) },
	        dataType: "json",
	        error: function (e) {
	            $("[data-type='edit-info']").css({ "visibility": "visible" }).text("请求失败!");
	        },
	        success: function (e) {
	            if (e.OK) {
	                $('.pop-mask,#edit').hide();
	                init(1);//加载表格
	            }
	            else {
	                $("[data-type='edit-info']").css({ "visibility": "visible" }).text(e.Result);
	            }
	        }
	    });
	});
	
	init(1);
	
	function init(e1) {
	    $("#pager").html("");
	    $("#ctable").children(":first").nextAll().remove();
	    $("#emptyDataBefore").tmpl(null).appendTo("#ctable");
	    $.ajax({
	        type: "post",
	        url: "/Org/Course/GetCourse",
	        data: {
	            PageIndex: e1
	        },
	        dataType: "json",
	        error: function (e) {
	        },
	        success: function (e) {
	            $("#ctable").children(":first").nextAll().remove();
	            if (e.Data.length == 0) {
	                $("#emptyDataOver").tmpl(null).appendTo("#ctable");
	            }
	            else {
	                $("#courseData").tmpl(e.Data).appendTo("#ctable");
	            }
	            $("#pager").html(e.TagValue);
	            //分页事件
	            PagerClick();
	
	            //修改事件
	            EditClick();
	        }
	    });
	}
	
	
	function PagerClick() {
	    $("#pager a[data-num]").click(function () {
	        init($(this).attr("data-num"));//加载表格
	    });
	}
	
	
	//点击修改班级
	function EditClick() {
	    $("[data-type='edit']").click(function () {
	
	        $('.pop-mask,#edit').show();
	
	        var $r = $(("tr[data-id=" + $(this).attr("data-id") + "]"));
	        row_data.BookSetID = $(this).attr("data-id")//套课ID
	        row_data.SName = $r.children("[data-index=1]").attr("data-value");//套课名称
	        row_data.BookNumber = $r.children("[data-index=2]").attr("data-value");//套课课次
	        row_data.Remark = $r.children("[data-index=3]").attr("data-value");//套课备注
	        //
	        $("#edit-name").html(row_data.SName);
	        $("#edit-num").val(row_data.BookNumber);
	        $("#edit-remark").val(row_data.Remark);
	    });
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy9iYWNrU3RhZ2UvY3VycmljdWx1bS1tYW5hZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0EsaUJBQWdCLHNEQUFzRDs7QUFFdEU7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQyx5QkFBeUI7QUFDL0QsRUFBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxnQ0FBZ0M7QUFDL0M7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQywwQkFBMEI7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlDQUFpQztBQUNoRDtBQUNBO0FBQ0EsK0NBQThDLDBCQUEwQjtBQUN4RSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EseUJBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxtREFBa0QsMEJBQTBCO0FBQzVFO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsRUFBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBLHdDQUF1QztBQUN2QyxNQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsMkVBQTBFO0FBQzFFLGdGQUErRTtBQUMvRSw0RUFBMkU7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsRSIsImZpbGUiOiJiYWNrU3RhZ2UvY3VycmljdWx1bS1tYW5hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTA2MTQ4ZDA1Nzk0MDgwMGZmNSIsInZhciByb3dfZGF0YSA9IHsgQm9va1NldElEOiAwLCBTTmFtZTogXCJcIiwgQm9va051bWJlcjogMCwgUmVtYXJrOiBcIlwiIH07Ly/lvZPliY3ooYzmlbDmja5cclxuXHJcbiQoXCJbZGF0YS1jbG9zZV1cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnLnBvcC1tYXNrLCNlZGl0JykuaGlkZSgpO1xyXG59KTtcclxuXHJcbiQoXCIjZWRpdC1udW1cIikua2V5cHJlc3MoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGtleW51bSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICBpZiAoIShrZXludW0gPj0gNDggJiYga2V5bnVtIDw9IDU3KSkvL+mdnuaVsOWtl1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PSAzKS8vM+S9jeaVsOWtl1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIGlmICgkKHRoaXMpLnZhbCgpID09IFwiXCIgJiYga2V5bnVtID09IDQ4KS8v6aaW5L2N5LiN6IO95Li6MFxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICQoXCJbZGF0YS10eXBlPSdlZGl0LWluZm8nXVwiKS5jc3MoeyBcInZpc2liaWxpdHlcIjogXCJoaWRkZW5cIiB9KTtcclxufSk7XHJcblxyXG5cclxuJChcIltkYXRhLXR5cGU9J3ZpZXctaW5mbyddXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJwb3N0XCIsXHJcbiAgICAgICAgdXJsOiBcIi9PcmcvQ291cnNlL0dldEJvb2tTZXRJbmZvXCIsXHJcbiAgICAgICAgZGF0YTogeyBCb29rU2V0SUQ6IHJvd19kYXRhLkJvb2tTZXRJRCB9LFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGlmIChlLk9LKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2VkaXQtbnVtXCIpLnZhbChlLkRhdGFbMF0uRGVmYXVsdE51bWJlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vL+S/ruaUueePree6p1xyXG4kKFwiI2VkaXQtb2tcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCQoXCJbZGF0YS10eXBlPSdlZGl0LWluZm8nXVwiKS5jc3MoXCJ2aXNpYmlsaXR5XCIpID09IFwidmlzaWJsZVwiKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcm93X2RhdGEuQm9va051bWJlciA9ICQoXCIjZWRpdC1udW1cIikudmFsKCk7XHJcbiAgICByb3dfZGF0YS5SZW1hcmsgPSAkKFwiI2VkaXQtcmVtYXJrXCIpLnZhbCgpO1xyXG4gICAgaWYgKCEoK3Jvd19kYXRhLkJvb2tOdW1iZXIgPiAwICYmICtyb3dfZGF0YS5Cb29rTnVtYmVyIDwgMTAwMCkpIHtcclxuICAgICAgICAkKFwiW2RhdGEtdHlwZT0nZWRpdC1pbmZvJ11cIikuY3NzKHsgXCJ2aXNpYmlsaXR5XCI6IFwidmlzaWJsZVwiIH0pLnRleHQoXCLor7fmraPnoa7loavlhpnor77mrKHvvIFcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiBcInBvc3RcIixcclxuICAgICAgICB1cmw6IFwiL09yZy9Db3Vyc2UvRWRpdENvdXJzZVwiLFxyXG4gICAgICAgIGRhdGE6IHsgZGF0YTogSlNPTi5zdHJpbmdpZnkocm93X2RhdGEpIH0sXHJcbiAgICAgICAgZGF0YVR5cGU6IFwianNvblwiLFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAkKFwiW2RhdGEtdHlwZT0nZWRpdC1pbmZvJ11cIikuY3NzKHsgXCJ2aXNpYmlsaXR5XCI6IFwidmlzaWJsZVwiIH0pLnRleHQoXCLor7fmsYLlpLHotKUhXCIpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUuT0spIHtcclxuICAgICAgICAgICAgICAgICQoJy5wb3AtbWFzaywjZWRpdCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGluaXQoMSk7Ly/liqDovb3ooajmoLxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoXCJbZGF0YS10eXBlPSdlZGl0LWluZm8nXVwiKS5jc3MoeyBcInZpc2liaWxpdHlcIjogXCJ2aXNpYmxlXCIgfSkudGV4dChlLlJlc3VsdCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5pbml0KDEpO1xyXG5cclxuZnVuY3Rpb24gaW5pdChlMSkge1xyXG4gICAgJChcIiNwYWdlclwiKS5odG1sKFwiXCIpO1xyXG4gICAgJChcIiNjdGFibGVcIikuY2hpbGRyZW4oXCI6Zmlyc3RcIikubmV4dEFsbCgpLnJlbW92ZSgpO1xyXG4gICAgJChcIiNlbXB0eURhdGFCZWZvcmVcIikudG1wbChudWxsKS5hcHBlbmRUbyhcIiNjdGFibGVcIik7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6IFwicG9zdFwiLFxyXG4gICAgICAgIHVybDogXCIvT3JnL0NvdXJzZS9HZXRDb3Vyc2VcIixcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIFBhZ2VJbmRleDogZTFcclxuICAgICAgICB9LFxyXG4gICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICQoXCIjY3RhYmxlXCIpLmNoaWxkcmVuKFwiOmZpcnN0XCIpLm5leHRBbGwoKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgaWYgKGUuRGF0YS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgJChcIiNlbXB0eURhdGFPdmVyXCIpLnRtcGwobnVsbCkuYXBwZW5kVG8oXCIjY3RhYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIiNjb3Vyc2VEYXRhXCIpLnRtcGwoZS5EYXRhKS5hcHBlbmRUbyhcIiNjdGFibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChcIiNwYWdlclwiKS5odG1sKGUuVGFnVmFsdWUpO1xyXG4gICAgICAgICAgICAvL+WIhumhteS6i+S7tlxyXG4gICAgICAgICAgICBQYWdlckNsaWNrKCk7XHJcblxyXG4gICAgICAgICAgICAvL+S/ruaUueS6i+S7tlxyXG4gICAgICAgICAgICBFZGl0Q2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIFBhZ2VyQ2xpY2soKSB7XHJcbiAgICAkKFwiI3BhZ2VyIGFbZGF0YS1udW1dXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpbml0KCQodGhpcykuYXR0cihcImRhdGEtbnVtXCIpKTsvL+WKoOi9veihqOagvFxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vL+eCueWHu+S/ruaUueePree6p1xyXG5mdW5jdGlvbiBFZGl0Q2xpY2soKSB7XHJcbiAgICAkKFwiW2RhdGEtdHlwZT0nZWRpdCddXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgJCgnLnBvcC1tYXNrLCNlZGl0Jykuc2hvdygpO1xyXG5cclxuICAgICAgICB2YXIgJHIgPSAkKChcInRyW2RhdGEtaWQ9XCIgKyAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpICsgXCJdXCIpKTtcclxuICAgICAgICByb3dfZGF0YS5Cb29rU2V0SUQgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpLy/lpZfor75JRFxyXG4gICAgICAgIHJvd19kYXRhLlNOYW1lID0gJHIuY2hpbGRyZW4oXCJbZGF0YS1pbmRleD0xXVwiKS5hdHRyKFwiZGF0YS12YWx1ZVwiKTsvL+Wll+ivvuWQjeensFxyXG4gICAgICAgIHJvd19kYXRhLkJvb2tOdW1iZXIgPSAkci5jaGlsZHJlbihcIltkYXRhLWluZGV4PTJdXCIpLmF0dHIoXCJkYXRhLXZhbHVlXCIpOy8v5aWX6K++6K++5qyhXHJcbiAgICAgICAgcm93X2RhdGEuUmVtYXJrID0gJHIuY2hpbGRyZW4oXCJbZGF0YS1pbmRleD0zXVwiKS5hdHRyKFwiZGF0YS12YWx1ZVwiKTsvL+Wll+ivvuWkh+azqFxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgJChcIiNlZGl0LW5hbWVcIikuaHRtbChyb3dfZGF0YS5TTmFtZSk7XHJcbiAgICAgICAgJChcIiNlZGl0LW51bVwiKS52YWwocm93X2RhdGEuQm9va051bWJlcik7XHJcbiAgICAgICAgJChcIiNlZGl0LXJlbWFya1wiKS52YWwocm93X2RhdGEuUmVtYXJrKTtcclxuICAgIH0pO1xyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvanMvYmFja1N0YWdlL2N1cnJpY3VsdW0tbWFuYWdlLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMTEiXSwic291cmNlUm9vdCI6IiJ9