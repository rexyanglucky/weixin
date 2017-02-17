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

	//幻灯片开始部分
	var iCountOfImage=$('.image-list img').length;
	var interval=null;
	//play函数
	function play(index){
	    $(".ppt-container .image-list li").hide();
	    $(".ppt-container .image-list li").eq(index).show();
	    $(".ppt-container .button-list span").removeClass("selected");
	};
	//自动播放
	function auto(num){
	    interval=setInterval(function() { // 自动播放，每5秒触发一次单击事件，来播放幻灯片
	        play(num);
	        $(".ppt-container .button-list span").eq(num).addClass("selected");
	        num++;
	        if(num>=iCountOfImage){num=0;}
	    },800);
	};
	auto(0);
	$(".ppt-container ul.button-list li span").on('mouseenter',function(){
	    var index=$(this).parent().index();
	    clearInterval(interval);
	    play(index);
	    $(this).addClass("selected");
	});
	$(".ppt-container ul.button-list li span").on('mouseleave',function(){
	    var index=$(this).parent().index()+1;
	    if(index>=iCountOfImage){index=0;}
	    auto(index);
	});
	//幻灯片结束部分

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioqKioqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYmFja1N0YWdlL3JlcG9ydC1kZXRhaWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQSxnQ0FBK0I7QUFDL0IsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQSw4QkFBNkI7QUFDN0I7QUFDQSxFQUFDO0FBQ0QsVSIsImZpbGUiOiJiYWNrU3RhZ2UvcmVwb3J0LWRldGFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDYxMDYxNDhkMDU3OTQwODAwZmY1IiwiLy/lubvnga/niYflvIDlp4vpg6jliIZcclxudmFyIGlDb3VudE9mSW1hZ2U9JCgnLmltYWdlLWxpc3QgaW1nJykubGVuZ3RoO1xyXG52YXIgaW50ZXJ2YWw9bnVsbDtcclxuLy9wbGF55Ye95pWwXHJcbmZ1bmN0aW9uIHBsYXkoaW5kZXgpe1xyXG4gICAgJChcIi5wcHQtY29udGFpbmVyIC5pbWFnZS1saXN0IGxpXCIpLmhpZGUoKTtcclxuICAgICQoXCIucHB0LWNvbnRhaW5lciAuaW1hZ2UtbGlzdCBsaVwiKS5lcShpbmRleCkuc2hvdygpO1xyXG4gICAgJChcIi5wcHQtY29udGFpbmVyIC5idXR0b24tbGlzdCBzcGFuXCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0ZWRcIik7XHJcbn07XHJcbi8v6Ieq5Yqo5pKt5pS+XHJcbmZ1bmN0aW9uIGF1dG8obnVtKXtcclxuICAgIGludGVydmFsPXNldEludGVydmFsKGZ1bmN0aW9uKCkgeyAvLyDoh6rliqjmkq3mlL7vvIzmr48156eS6Kem5Y+R5LiA5qyh5Y2V5Ye75LqL5Lu277yM5p2l5pKt5pS+5bm754Gv54mHXHJcbiAgICAgICAgcGxheShudW0pO1xyXG4gICAgICAgICQoXCIucHB0LWNvbnRhaW5lciAuYnV0dG9uLWxpc3Qgc3BhblwiKS5lcShudW0pLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XHJcbiAgICAgICAgbnVtKys7XHJcbiAgICAgICAgaWYobnVtPj1pQ291bnRPZkltYWdlKXtudW09MDt9XHJcbiAgICB9LDgwMCk7XHJcbn07XHJcbmF1dG8oMCk7XHJcbiQoXCIucHB0LWNvbnRhaW5lciB1bC5idXR0b24tbGlzdCBsaSBzcGFuXCIpLm9uKCdtb3VzZWVudGVyJyxmdW5jdGlvbigpe1xyXG4gICAgdmFyIGluZGV4PSQodGhpcykucGFyZW50KCkuaW5kZXgoKTtcclxuICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xyXG4gICAgcGxheShpbmRleCk7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwic2VsZWN0ZWRcIik7XHJcbn0pO1xyXG4kKFwiLnBwdC1jb250YWluZXIgdWwuYnV0dG9uLWxpc3QgbGkgc3BhblwiKS5vbignbW91c2VsZWF2ZScsZnVuY3Rpb24oKXtcclxuICAgIHZhciBpbmRleD0kKHRoaXMpLnBhcmVudCgpLmluZGV4KCkrMTtcclxuICAgIGlmKGluZGV4Pj1pQ291bnRPZkltYWdlKXtpbmRleD0wO31cclxuICAgIGF1dG8oaW5kZXgpO1xyXG59KTtcclxuLy/lubvnga/niYfnu5PmnZ/pg6jliIZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9iYWNrU3RhZ2UvcmVwb3J0LWRldGFpbC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDI0Il0sInNvdXJjZVJvb3QiOiIifQ==