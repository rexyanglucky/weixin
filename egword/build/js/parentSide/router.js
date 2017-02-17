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
	var src={jsurl:'/egword/build/js/parentSide/',cssurl:'/egword/build/css/parentSide/',version:'1.0'};
	//所有页面上的pageId ,js ,css的对应关系都要在此一一声明
	html_js_cssRoute["main"]={css:"main",js:"main"};//菜单
	html_js_cssRoute["wonderful-moment"]={css:"wonderful-moment",js:"wonderful-moment"};//精彩瞬间
	html_js_cssRoute["lesson-report"]={css:"lesson-report",js:"lesson-report"};//课程报告
	html_js_cssRoute["lesson-manage"]={css:"lesson-manage",js:"lesson-manage"};//课程管理
	html_js_cssRoute["lesson-evaluate"]={css:"lesson-evaluate",js:"lesson-evaluate"};//课程管理
	html_js_cssRoute["contat-us"]={css:"contat-us",js:"contat-us"};//课程管理
	
	
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvcGFyZW50U2lkZS9yb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSwyQkFBMEIsc0JBQXNCO0FBQ2hELHVDQUFzQyw4Q0FBOEM7QUFDcEYsb0NBQW1DLHdDQUF3QztBQUMzRSxvQ0FBbUMsd0NBQXdDO0FBQzNFLHNDQUFxQyw0Q0FBNEM7QUFDakYsZ0NBQStCLGdDQUFnQzs7O0FBRy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsImZpbGUiOiJwYXJlbnRTaWRlL3JvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwidmFyIGh0bWxfanNfY3NzUm91dGU9W107XHJcbnZhciBzcmM9e2pzdXJsOicvZWd3b3JkL2J1aWxkL2pzL3BhcmVudFNpZGUvJyxjc3N1cmw6Jy9lZ3dvcmQvYnVpbGQvY3NzL3BhcmVudFNpZGUvJyx2ZXJzaW9uOicxLjAnfTtcclxuLy/miYDmnInpobXpnaLkuIrnmoRwYWdlSWQgLGpzICxjc3PnmoTlr7nlupTlhbPns7vpg73opoHlnKjmraTkuIDkuIDlo7DmmI5cclxuaHRtbF9qc19jc3NSb3V0ZVtcIm1haW5cIl09e2NzczpcIm1haW5cIixqczpcIm1haW5cIn07Ly/oj5zljZVcclxuaHRtbF9qc19jc3NSb3V0ZVtcIndvbmRlcmZ1bC1tb21lbnRcIl09e2NzczpcIndvbmRlcmZ1bC1tb21lbnRcIixqczpcIndvbmRlcmZ1bC1tb21lbnRcIn07Ly/nsr7lvannnqzpl7RcclxuaHRtbF9qc19jc3NSb3V0ZVtcImxlc3Nvbi1yZXBvcnRcIl09e2NzczpcImxlc3Nvbi1yZXBvcnRcIixqczpcImxlc3Nvbi1yZXBvcnRcIn07Ly/or77nqIvmiqXlkYpcclxuaHRtbF9qc19jc3NSb3V0ZVtcImxlc3Nvbi1tYW5hZ2VcIl09e2NzczpcImxlc3Nvbi1tYW5hZ2VcIixqczpcImxlc3Nvbi1tYW5hZ2VcIn07Ly/or77nqIvnrqHnkIZcclxuaHRtbF9qc19jc3NSb3V0ZVtcImxlc3Nvbi1ldmFsdWF0ZVwiXT17Y3NzOlwibGVzc29uLWV2YWx1YXRlXCIsanM6XCJsZXNzb24tZXZhbHVhdGVcIn07Ly/or77nqIvnrqHnkIZcclxuaHRtbF9qc19jc3NSb3V0ZVtcImNvbnRhdC11c1wiXT17Y3NzOlwiY29udGF0LXVzXCIsanM6XCJjb250YXQtdXNcIn07Ly/or77nqIvnrqHnkIZcclxuXHJcblxyXG4vL+mhtemdomRvbeWKoOi9veS5i+WQjuWKoOi9vWpzXHJcbiQoZG9jdW1lbnQpLm9uKFwicGFnZUluaXRcIiwgZnVuY3Rpb24oZSwgcGFnZUlkLCAkcGFnZSkge1xyXG4gICAgY29uc29sZS5sb2coJHBhZ2UpO1xyXG4gICAgY29uc29sZS5sb2cocGFnZUlkKTtcclxuICAgIGlmKHBhZ2VJZCYmaHRtbF9qc19jc3NSb3V0ZVtwYWdlSWRdKXtcclxuICAgICAgICB2YXIganNVcmw9c3JjLmpzdXJsK2h0bWxfanNfY3NzUm91dGVbcGFnZUlkXS5qcytcIi5qcz92PVwiK3NyYy52ZXJzaW9uO1xyXG4gICAgICAgIHJlbG9hZEpTKFwiY3Atc2NyaXB0XCIsanNVcmwpO1xyXG4gICAgfVxyXG59KTtcclxuLy/liqjnlLvliIfmjaLkuYvliY3mjaLliqDovb3kuIvkuIDkuKrpobXpnaLnmoRjc3NcclxuJChkb2N1bWVudCkub24oXCJwYWdlQW5pbWF0aW9uU3RhcnRcIixmdW5jdGlvbihlLHBhZ2VJZCwkcGFnZSl7XHJcbiAgICBpZihwYWdlSWQmJmh0bWxfanNfY3NzUm91dGVbcGFnZUlkXSl7XHJcbiAgICAgICAgdmFyIGNzc1VybD1zcmMuY3NzdXJsK2h0bWxfanNfY3NzUm91dGVbcGFnZUlkXS5jc3MrXCIuY3NzP3Y9XCIrc3JjLnZlcnNpb247XHJcbiAgICAgICAgcmVsb2FkQ3NzKFwiY3AtY3NzXCIsY3NzVXJsKTtcclxuICAgIH1cclxufSk7XHJcbi8v5Yqo55S75YiH5o2i5LmL5ZCO5Yqg6L295LiL5LiA5Liq6aG16Z2i55qEY3NzXHJcbi8vICAgICQoZG9jdW1lbnQpLm9uKFwicGFnZUFuaW1hdGlvbkVuZFwiLGZ1bmN0aW9uKGUscGFnZUlkLCRwYWdlKXtcclxuLy8gICAgICAgIGlmKHBhZ2VJZCYmaHRtbF9qc19jc3NSb3V0ZVtwYWdlSWRdKXtcclxuLy8vLyAgICAgICAgICAgIHZhciBqc1VybD1zcmMuanN1cmwraHRtbF9qc19jc3NSb3V0ZVtwYWdlSWRdLmpzK1wiLmpzP3Y9XCIrc3JjLnZlcnNpb247XHJcbi8vICAgICAgICAgICAgdmFyIGNzc1VybD1zcmMuY3NzdXJsK2h0bWxfanNfY3NzUm91dGVbcGFnZUlkXS5jc3MrXCIuY3NzP3Y9XCIrc3JjLnZlcnNpb247XHJcbi8vICAgICAgICAgICAgcmVsb2FkQ3NzKFwiY3AtY3NzXCIsY3NzVXJsKTtcclxuLy8vLyAgICAgICAgICAgIHJlbG9hZEpTKFwiY3Atc2NyaXB0XCIsanNVcmwpO1xyXG4vLyAgICAgICAgfVxyXG4vLyAgICB9KTtcclxuZnVuY3Rpb24gcmVsb2FkSlMoaWQscGF0aClcclxue1xyXG4gICAgdmFyIG9sZGpzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgaWYob2xkanMpIHtvbGRqcy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG9sZGpzKTt9XHJcbiAgICB2YXIgc2NyaXB0T2JqID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcclxuICAgIHNjcmlwdE9iai5zcmMgPSBwYXRoO1xyXG4gICAgc2NyaXB0T2JqLnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiO1xyXG4gICAgc2NyaXB0T2JqLmlkICAgPSBpZDtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzY3JpcHRPYmopO1xyXG59XHJcbmZ1bmN0aW9uIHJlbG9hZENzcyhpZCxwYXRoKVxyXG57XHJcbiAgICB2YXIgb2xkY3NzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG4gICAgaWYob2xkY3NzKSB7b2xkY3NzLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkY3NzKTt9XHJcbiAgICB2YXIgbGlua09iaiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG4gICAgbGlua09iai5pZD1pZDtcclxuICAgIGxpbmtPYmouaHJlZiA9IHBhdGg7XHJcbiAgICBsaW5rT2JqLnJlbCA9ICdzdHlsZXNoZWV0JztcclxuICAgIGxpbmtPYmoudHlwZSA9ICd0ZXh0L2Nzcyc7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uYXBwZW5kQ2hpbGQobGlua09iaik7XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9wYXJlbnRTaWRlL3JvdXRlci5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDMxIl0sInNvdXJjZVJvb3QiOiIifQ==