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

	

	$("[data-year]").click(function () {
	    $(this).siblings().removeClass("active").end().addClass("active");
	    GetKpi(1);
	});

	GetKpi(1);

	function GetKpi(e1)//ҳ��
	{
	    $("#pager").html("");
	    $("#ctable").children(":first").nextAll().remove();
	    $("#emptyDataBefore").tmpl(null).appendTo("#ctable");
	    //
	    var year = +$(".active[data-year]").attr("data-year");
	    //
	    $.ajax({
	        type: "post",
	        url: "/Org/KPI/GetKPI",
	        data: {
	            Year: year, PageIndex: e1
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
	                $("#kpiData").tmpl(e.Data).appendTo("#ctable");
	            }
	            $("#pager").html(e.TagValue);
	            //��ҳ�¼�
	            PagerClick();

	        }
	    });
	}

	function PagerClick() {
	    $("#pager a[data-num]").click(function () {
	        GetKpi($(this).attr("data-num"));//���ر��
	    });
	}


/***/ }
/******/ ]);