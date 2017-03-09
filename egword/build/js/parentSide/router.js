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

	var html_js_cssRoute=[];
	var src={jsurl:'/egword/build/js/parentSide/',cssurl:'/egword/build/css/parentSide/',version:'1.0'};
	//所有页面上的pageId ,js ,css的对应关系都要在此一一声明
	html_js_cssRoute["main"]={css:"main",js:"main"};//菜单
	html_js_cssRoute["wonderful-moment"]={css:"wonderful-moment",js:"wonderful-moment"};//精彩瞬间
	html_js_cssRoute["lesson-report"]={css:"lesson-report",js:"lesson-report"};//课程报告
	html_js_cssRoute["lesson-manage"]={css:"lesson-manage",js:"lesson-manage"};//课程管理
	html_js_cssRoute["lesson-evaluate"]={css:"lesson-evaluate",js:"lesson-evaluate"};//课程管理
	html_js_cssRoute["contat-us"]={css:"contat-us",js:"contat-us"};//课程管理
	html_js_cssRoute["bind-info"]={css:"bind-info",js:"bind-info"};//绑定学生
	html_js_cssRoute["unbind-info"]={css:"unbind-info",js:"unbind-info"};//解除绑定


	//页面dom加载之后加载js
	$(document).on("pageInit", function(e, pageId, $page) {
	    console.log($page);
	    console.log(pageId);

	    if(pageId&&html_js_cssRoute[pageId]){
	        var jsUrl = src.jsurl + html_js_cssRoute[pageId].js + ".js?v=" + src.version;
	        reloadJS("cp-script", jsUrl, pageId);
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
	function reloadJS(id,path,pageid)
	{
	    var oldjs = document.getElementById(id);
	    //如果该页面已经加载js 不再做变动

	    if (oldjs) {
	        if (oldjs.src.indexOf(html_js_cssRoute[pageid].js+".js") > -1) { return; }
	        oldjs.parentNode.removeChild(oldjs);
	    }
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