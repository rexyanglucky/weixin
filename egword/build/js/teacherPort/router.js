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

	var html_js_cssRoute=[];
	var src={jsurl:'/egword/build/js/teacherPort/',cssurl:'/egword/build/css/teacherPort/',version:'1.0'};
	//所有页面上的pageId ,js ,css的对应关系都要在此一一声明
	html_js_cssRoute["my-class-course-list"]={css:"my-class-course-list",js:"my-class-course-list"};
	html_js_cssRoute["my-class-list"]={css:"my-class-list",js:"my-class-list"};
	html_js_cssRoute["lesson-watching"]={css:"lesson-watching",js:"lesson-watching"};//课堂监管
	html_js_cssRoute["lesson-student-group"]={css:"lesson-student-group",js:"lesson-student-group"};//智能分组
	html_js_cssRoute["lesson-report-study-info"]={css:"lesson-report-study-info",js:"lesson-report-study-info"};//智能分组
	html_js_cssRoute["test-center-class"]={css:"test-center-class",js:"test-center-class"};//测评中心-班级
	html_js_cssRoute["test-center-home"]={css:"test-center-home",js:"test-center-home"};//测评中心-班级
	html_js_cssRoute["person-center"]={css:"person-center",js:"person-center"};//个人中心
	html_js_cssRoute["person-center-set"]={css:"person-center-set",js:"person-center-set"};//个人中心-设置
	html_js_cssRoute["person-center-editPas"]={css:"person-center-editPas",js:"person-center-editPas"};//个人中心-修改密码
	html_js_cssRoute["reward-coins"]={css:"reward-coins",js:"reward-coins"};//奖励学币
	html_js_cssRoute["wonderful-moment"]={css:"wonderful-moment",js:"wonderful-moment"};//精彩瞬间
	html_js_cssRoute["wonderful-sure"]={css:"wonderful-sure",js:"wonderful-sure"};//精彩瞬间-确定提交
	html_js_cssRoute["lesson-report-group"]={css:"lesson-report-group",js:"lesson-report-group"};//奖励学币-小组，学生
	html_js_cssRoute["lesson-report"]={css:"lesson-report",js:"lesson-report"};//课次报告
	html_js_cssRoute["student-evaluation-report"]={css:"student-evaluation-report",js:"student-evaluation-report"};//测评报告
	
	//页面dom加载之后加载js
	$(document).on("pageInit", function(e, pageId, $page) {
	    console.log($page);
	    console.log(pageId);
	    if(pageId&&html_js_cssRoute[pageId]){
	        var jsUrl=src.jsurl+html_js_cssRoute[pageId].js+".js?v="+src.version;
	        reloadJS("cp-script",jsUrl);
	    }
	});
	//动画切换之前换加载下一个页面的css
	$(document).on("pageAnimationStart",function(e,pageId,$page){
	    if(pageId&&html_js_cssRoute[pageId]){
	        var cssUrl=src.cssurl+html_js_cssRoute[pageId].css+".css?v="+src.version;
	        reloadCss("cp-css",cssUrl);
	    }
	});
	//动画切换之后加载下一个页面的css
	//    $(document).on("pageAnimationEnd",function(e,pageId,$page){
	//        if(pageId&&html_js_cssRoute[pageId]){
	////            var jsUrl=src.jsurl+html_js_cssRoute[pageId].js+".js?v="+src.version;
	//            var cssUrl=src.cssurl+html_js_cssRoute[pageId].css+".css?v="+src.version;
	//            reloadCss("cp-css",cssUrl);
	////            reloadJS("cp-script",jsUrl);
	//        }
	//    });
	function reloadJS(id,path)
	{
	    var oldjs = document.getElementById(id);
	    if(oldjs) {oldjs.parentNode.removeChild(oldjs);}
	    var scriptObj = document.createElement("script");
	    scriptObj.src = path;
	    scriptObj.type = "text/javascript";
	    scriptObj.id   = id;
	    document.getElementsByTagName("head")[0].appendChild(scriptObj);
	}
	function reloadCss(id,path)
	{
	    var oldcss = document.getElementById(id);
	    if(oldcss) {oldcss.parentNode.removeChild(oldcss);}
	    var linkObj = document.createElement("link");
	    linkObj.id=id;
	    linkObj.href = path;
	    linkObj.rel = 'stylesheet';
	    linkObj.type = 'text/css';
	    document.getElementsByTagName("head")[0].appendChild(linkObj);
	}

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL3NyYy9qcy90ZWFjaGVyUG9ydC9yb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSwyQ0FBMEM7QUFDMUMsb0NBQW1DO0FBQ25DLHNDQUFxQyw0Q0FBNEM7QUFDakYsMkNBQTBDLHNEQUFzRDtBQUNoRywrQ0FBOEMsOERBQThEO0FBQzVHLHdDQUF1QyxnREFBZ0Q7QUFDdkYsdUNBQXNDLDhDQUE4QztBQUNwRixvQ0FBbUMsd0NBQXdDO0FBQzNFLHdDQUF1QyxnREFBZ0Q7QUFDdkYsNENBQTJDLHdEQUF3RDtBQUNuRyxtQ0FBa0Msc0NBQXNDO0FBQ3hFLHVDQUFzQyw4Q0FBOEM7QUFDcEYscUNBQW9DLDBDQUEwQztBQUM5RSwwQ0FBeUMsb0RBQW9EO0FBQzdGLG9DQUFtQyx3Q0FBd0M7QUFDM0UsZ0RBQStDLGdFQUFnRTs7QUFFL0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFIiwiZmlsZSI6InRlYWNoZXJQb3J0L3JvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwidmFyIGh0bWxfanNfY3NzUm91dGU9W107XHJcbnZhciBzcmM9e2pzdXJsOicvZWd3b3JkL2J1aWxkL2pzL3RlYWNoZXJQb3J0LycsY3NzdXJsOicvZWd3b3JkL2J1aWxkL2Nzcy90ZWFjaGVyUG9ydC8nLHZlcnNpb246JzEuMCd9O1xyXG4vL+aJgOaciemhtemdouS4iueahHBhZ2VJZCAsanMgLGNzc+eahOWvueW6lOWFs+ezu+mDveimgeWcqOatpOS4gOS4gOWjsOaYjlxyXG5odG1sX2pzX2Nzc1JvdXRlW1wibXktY2xhc3MtY291cnNlLWxpc3RcIl09e2NzczpcIm15LWNsYXNzLWNvdXJzZS1saXN0XCIsanM6XCJteS1jbGFzcy1jb3Vyc2UtbGlzdFwifTtcclxuaHRtbF9qc19jc3NSb3V0ZVtcIm15LWNsYXNzLWxpc3RcIl09e2NzczpcIm15LWNsYXNzLWxpc3RcIixqczpcIm15LWNsYXNzLWxpc3RcIn07XHJcbmh0bWxfanNfY3NzUm91dGVbXCJsZXNzb24td2F0Y2hpbmdcIl09e2NzczpcImxlc3Nvbi13YXRjaGluZ1wiLGpzOlwibGVzc29uLXdhdGNoaW5nXCJ9Oy8v6K++5aCC55uR566hXHJcbmh0bWxfanNfY3NzUm91dGVbXCJsZXNzb24tc3R1ZGVudC1ncm91cFwiXT17Y3NzOlwibGVzc29uLXN0dWRlbnQtZ3JvdXBcIixqczpcImxlc3Nvbi1zdHVkZW50LWdyb3VwXCJ9Oy8v5pm66IO95YiG57uEXHJcbmh0bWxfanNfY3NzUm91dGVbXCJsZXNzb24tcmVwb3J0LXN0dWR5LWluZm9cIl09e2NzczpcImxlc3Nvbi1yZXBvcnQtc3R1ZHktaW5mb1wiLGpzOlwibGVzc29uLXJlcG9ydC1zdHVkeS1pbmZvXCJ9Oy8v5pm66IO95YiG57uEXHJcbmh0bWxfanNfY3NzUm91dGVbXCJ0ZXN0LWNlbnRlci1jbGFzc1wiXT17Y3NzOlwidGVzdC1jZW50ZXItY2xhc3NcIixqczpcInRlc3QtY2VudGVyLWNsYXNzXCJ9Oy8v5rWL6K+E5Lit5b+DLeePree6p1xyXG5odG1sX2pzX2Nzc1JvdXRlW1widGVzdC1jZW50ZXItaG9tZVwiXT17Y3NzOlwidGVzdC1jZW50ZXItaG9tZVwiLGpzOlwidGVzdC1jZW50ZXItaG9tZVwifTsvL+a1i+ivhOS4reW/gy3nj63nuqdcclxuaHRtbF9qc19jc3NSb3V0ZVtcInBlcnNvbi1jZW50ZXJcIl09e2NzczpcInBlcnNvbi1jZW50ZXJcIixqczpcInBlcnNvbi1jZW50ZXJcIn07Ly/kuKrkurrkuK3lv4NcclxuaHRtbF9qc19jc3NSb3V0ZVtcInBlcnNvbi1jZW50ZXItc2V0XCJdPXtjc3M6XCJwZXJzb24tY2VudGVyLXNldFwiLGpzOlwicGVyc29uLWNlbnRlci1zZXRcIn07Ly/kuKrkurrkuK3lv4Mt6K6+572uXHJcbmh0bWxfanNfY3NzUm91dGVbXCJwZXJzb24tY2VudGVyLWVkaXRQYXNcIl09e2NzczpcInBlcnNvbi1jZW50ZXItZWRpdFBhc1wiLGpzOlwicGVyc29uLWNlbnRlci1lZGl0UGFzXCJ9Oy8v5Liq5Lq65Lit5b+DLeS/ruaUueWvhueggVxyXG5odG1sX2pzX2Nzc1JvdXRlW1wicmV3YXJkLWNvaW5zXCJdPXtjc3M6XCJyZXdhcmQtY29pbnNcIixqczpcInJld2FyZC1jb2luc1wifTsvL+WlluWKseWtpuW4gVxyXG5odG1sX2pzX2Nzc1JvdXRlW1wid29uZGVyZnVsLW1vbWVudFwiXT17Y3NzOlwid29uZGVyZnVsLW1vbWVudFwiLGpzOlwid29uZGVyZnVsLW1vbWVudFwifTsvL+eyvuW9qeeerOmXtFxyXG5odG1sX2pzX2Nzc1JvdXRlW1wid29uZGVyZnVsLXN1cmVcIl09e2NzczpcIndvbmRlcmZ1bC1zdXJlXCIsanM6XCJ3b25kZXJmdWwtc3VyZVwifTsvL+eyvuW9qeeerOmXtC3noa7lrprmj5DkuqRcclxuaHRtbF9qc19jc3NSb3V0ZVtcImxlc3Nvbi1yZXBvcnQtZ3JvdXBcIl09e2NzczpcImxlc3Nvbi1yZXBvcnQtZ3JvdXBcIixqczpcImxlc3Nvbi1yZXBvcnQtZ3JvdXBcIn07Ly/lpZblirHlrabluIEt5bCP57uE77yM5a2m55SfXHJcbmh0bWxfanNfY3NzUm91dGVbXCJsZXNzb24tcmVwb3J0XCJdPXtjc3M6XCJsZXNzb24tcmVwb3J0XCIsanM6XCJsZXNzb24tcmVwb3J0XCJ9Oy8v6K++5qyh5oql5ZGKXHJcbmh0bWxfanNfY3NzUm91dGVbXCJzdHVkZW50LWV2YWx1YXRpb24tcmVwb3J0XCJdPXtjc3M6XCJzdHVkZW50LWV2YWx1YXRpb24tcmVwb3J0XCIsanM6XCJzdHVkZW50LWV2YWx1YXRpb24tcmVwb3J0XCJ9Oy8v5rWL6K+E5oql5ZGKXHJcblxyXG4vL+mhtemdomRvbeWKoOi9veS5i+WQjuWKoOi9vWpzXHJcbiQoZG9jdW1lbnQpLm9uKFwicGFnZUluaXRcIiwgZnVuY3Rpb24oZSwgcGFnZUlkLCAkcGFnZSkge1xyXG4gICAgY29uc29sZS5sb2coJHBhZ2UpO1xyXG4gICAgY29uc29sZS5sb2cocGFnZUlkKTtcclxuICAgIGlmKHBhZ2VJZCYmaHRtbF9qc19jc3NSb3V0ZVtwYWdlSWRdKXtcclxuICAgICAgICB2YXIganNVcmw9c3JjLmpzdXJsK2h0bWxfanNfY3NzUm91dGVbcGFnZUlkXS5qcytcIi5qcz92PVwiK3NyYy52ZXJzaW9uO1xyXG4gICAgICAgIHJlbG9hZEpTKFwiY3Atc2NyaXB0XCIsanNVcmwpO1xyXG4gICAgfVxyXG59KTtcclxuLy/liqjnlLvliIfmjaLkuYvliY3mjaLliqDovb3kuIvkuIDkuKrpobXpnaLnmoRjc3NcclxuJChkb2N1bWVudCkub24oXCJwYWdlQW5pbWF0aW9uU3RhcnRcIixmdW5jdGlvbihlLHBhZ2VJZCwkcGFnZSl7XHJcbiAgICBpZihwYWdlSWQmJmh0bWxfanNfY3NzUm91dGVbcGFnZUlkXSl7XHJcbiAgICAgICAgdmFyIGNzc1VybD1zcmMuY3NzdXJsK2h0bWxfanNfY3NzUm91dGVbcGFnZUlkXS5jc3MrXCIuY3NzP3Y9XCIrc3JjLnZlcnNpb247XHJcbiAgICAgICAgcmVsb2FkQ3NzKFwiY3AtY3NzXCIsY3NzVXJsKTtcclxuICAgIH1cclxufSk7XHJcbi8v5Yqo55S75YiH5o2i5LmL5ZCO5Yqg6L295LiL5LiA5Liq6aG16Z2i55qEY3NzXHJcbi8vICAgICQoZG9jdW1lbnQpLm9uKFwicGFnZUFuaW1hdGlvbkVuZFwiLGZ1bmN0aW9uKGUscGFnZUlkLCRwYWdlKXtcclxuLy8gICAgICAgIGlmKHBhZ2VJZCYmaHRtbF9qc19jc3NSb3V0ZVtwYWdlSWRdKXtcclxuLy8vLyAgICAgICAgICAgIHZhciBqc1VybD1zcmMuanN1cmwraHRtbF9qc19jc3NSb3V0ZVtwYWdlSWRdLmpzK1wiLmpzP3Y9XCIrc3JjLnZlcnNpb247XHJcbi8vICAgICAgICAgICAgdmFyIGNzc1VybD1zcmMuY3NzdXJsK2h0bWxfanNfY3NzUm91dGVbcGFnZUlkXS5jc3MrXCIuY3NzP3Y9XCIrc3JjLnZlcnNpb247XHJcbi8vICAgICAgICAgICAgcmVsb2FkQ3NzKFwiY3AtY3NzXCIsY3NzVXJsKTtcclxuLy8vLyAgICAgICAgICAgIHJlbG9hZEpTKFwiY3Atc2NyaXB0XCIsanNVcmwpO1xyXG4vLyAgICAgICAgfVxyXG4vLyAgICB9KTtcclxuZnVuY3Rpb24gcmVsb2FkSlMoaWQscGF0aClcclxue1xyXG4gICAgdmFyIG9sZGpzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgaWYob2xkanMpIHtvbGRqcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZGpzKTt9XHJcbiAgICB2YXIgc2NyaXB0T2JqID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICAgIHNjcmlwdE9iai5zcmMgPSBwYXRoO1xyXG4gICAgc2NyaXB0T2JqLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gICAgc2NyaXB0T2JqLmlkICAgPSBpZDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzY3JpcHRPYmopO1xyXG59XHJcbmZ1bmN0aW9uIHJlbG9hZENzcyhpZCxwYXRoKVxyXG57XHJcbiAgICB2YXIgb2xkY3NzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgaWYob2xkY3NzKSB7b2xkY3NzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkY3NzKTt9XHJcbiAgICB2YXIgbGlua09iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG4gICAgbGlua09iai5pZD1pZDtcclxuICAgIGxpbmtPYmouaHJlZiA9IHBhdGg7XHJcbiAgICBsaW5rT2JqLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICAgIGxpbmtPYmoudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQobGlua09iaik7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy90ZWFjaGVyUG9ydC9yb3V0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSA1MSJdLCJzb3VyY2VSb290IjoiIn0=