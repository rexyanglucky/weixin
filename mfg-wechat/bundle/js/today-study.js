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
/******/ 	__webpack_require__.p = "/mfg-wechat/bundle/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	/**
	 * Created by humorHan on 2016/5/20.
	 */
	module.exports={
	        scr: function () {
	        var dHeight = document.body.scrollHeight;
	        var sTop = document.body.scrollTop;
	        var cHeight = window.innerHeight;
	        if (sTop + cHeight == dHeight) {
	            return true;
	        }
	
	    },
	    getSubjectName:function(id){
	        var name='';
	        switch (id.toString())
	        {
	            case '01':
	                name='语文';
	                break;
	            case '02':
	                name='数学';
	                break;
	            case '03':
	                name='英语';
	                break;
	            case '04':
	                name='物理';
	                break;
	            case '05':
	                name='化学';
	                break;
	            case '06':
	                name='政治';
	                break;
	            case '07':
	                name='历史';
	                break;
	            case '08':
	                name='地理';
	                break;
	            case '09':
	                name='生物';
	                break;
	        }
	        return name;
	    },
	    getStageStr: function (stageId) {
	        var stageIdStr = "";
	        switch (stageId) {
	            case "x":
	                stageIdStr = "小学";
	                break;
	            case "c":
	                stageIdStr = "初中";
	                break;
	            case "g":
	                stageIdStr = "高中";
	                break;
	            default:
	                break;
	        }
	        return stageIdStr;
	    },
	    go_menu:function(conId){
	        var con=document.getElementById(conId);
	        var img=document.createElement('img');
	        img.setAttribute('id','menuContr');
	        img.src='../bundle/img/bottom-yuan-show.png';
	        con.appendChild(img);
	        var menuContr=document.getElementById('menuContr');
	        menuContr.addEventListener('touchstart',menuBody,false);
	        function menuBody(){
	            var menuShow=document.getElementById('menuShow');
	            if(menuShow){
	                var t=menuShow.getAttribute('style');
	                if( t == 'display: none;'){
	                    menuShow.style.display='block';
	                    img.src="../bundle/img/menu2.png";
	                }else{
	                    menuShow.style.display='none';
	                    img.src="../bundle/img/bottom-yuan-show.png"
	                }
	            }else{
	                var show=document.createElement('div');
	                show.setAttribute('id','menuShow');
	                show.setAttribute('style','display:block;');
	                show.innerHTML='<a href="afterclassjob.html" class="ktxa"><img src="../bundle/img/xuean.png"/></a><a href="wrong-gather.html" class="kxjl"><img src="../bundle/img/jijin.png"</a><a href="homework-list.html"  class="ctjj"><img src="../bundle/img/jilu.png"></a><a href="monthweak.html" class="myrx"><img src="../bundle/img/ruoxiang.png"></a>';
	                document.body.appendChild(show);
	            }
	        }
	    },
	
	    go_study_show:function(imglogo,showid){
	           var n=1;
	            $(imglogo).parent("h3").on("touchstart",function(){
	                if(n %2 !=0){
	                    $(imglogo).attr("src","../img/btm.png");
	                    $(showid).show();
	                }
	                else{
	                    $(imglogo).attr("src","../img/top-jiantou.png");
	                    $(showid).hide();
	                }
	                n++;
	            })},
	
	    showConfirm:function(msg,callback)
	    {
	        var layer=document.createElement("div");
	        layer.className="layer";
	        document.body.appendChild(layer);
	        var confirm='<div class="popconfirm">';
	        confirm+='<div class="title">';
	        confirm+='<i class="icon-close"></i>';
	        confirm+=' </div>';
	        confirm+=' <div class="content">'+msg+' </div>';
	        confirm+=' <div class="foot">';
	        confirm+='  <input class="popbtn btnok color-green" type="button"  value="确定"/>';
	        confirm+='  <input class="popbtn btncancel color-green" type="button" value="取消"/>';
	        confirm+='   </div></div>';
	        $('body').append(confirm);
	        //$('.popconfirm').css('top',(document.documentElement.clientHeight -$('.popconfirm').height())/2);
	        $(".btnok").unbind("click");
	        $(".btnok").click(function(){
	            $(".layer").remove();
	            $(".popconfirm").remove();
	            return callback(true);
	        });
	        $(".btncancel,.icon-close").click(function(){
	            $(".layer").remove();
	            $(".popconfirm").remove();
	            return callback(false);
	        });
	    },
	    //信息提示框
	    showPopMsg:function (msg) {
	        var html='<div class="popmsg"><div class="content">'+msg+'</div></div>';
	        $('.popmsg').remove();
	        $('body').append(html);
	        $('.popmsg').css('left',(document.body.clientWidth  -$('.popmsg').width())/2);
	        $('.popmsg').css('top',(document.documentElement.clientHeight -$('.popmsg').height())/2);
	        setTimeout(function(){$('.popmsg').remove();},1000);
	    },
	    //获取接口url 如获取openid   getApiUrl('Account/GetOpenID')
	    getApiUrl:function(action){
	        var baseurl='http://192.168.180.15:8998/';
	        var baseurl='http://localhost:5441/';
	        return baseurl+action;
	    },
	    //调用api成功后，先调用此方法，判断用户是否已经绑定，若未绑定，跳转到绑定页
	    checkBind:function(data){
	        if(!data.OK)
	        {
	            if(data.Code==1)
	            {
	                window.location.href="bindinfo.html";
	                return;
	            }
	        }
	    },
	    //获取OpenId
	    getOpenId:function(appid,appsecret,code){
	var openid;
	        $.ajax({
	            type: 'post',
	            async:false,
	            url:this.getApiUrl('Account/GetOpenID'),
	            // data to be added to query string:
	            data: {AppID:appid,AppSecret:appsecret,Code:code},
	            // type of data we are expecting in return:
	            dataType: 'json',
	            //timeout: 300,
	            success: function(data){
	                if(data)
	                {
	                    if(data.OK)
	                    {
	                         openid=data.ID;
	
	                    }
	                }
	
	            },
	            error: function(xhr, type){
	                alert('Ajax error!')
	            }
	        })
	        return openid;
	    },
	    //获取url参数
	    getQueryString:function (name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) return unescape(decodeURI(r[2])); return null;
	},
	
	    dateFormat: function(date, format){
	        var date = new Date(date);
	        var map = {
	            "Y": date.getYear(),
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
	    },
	    //处理试题公式 mathjax
	    initMathJaxObj:function (id) {
	        MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById(id)]);
	    },
	    getLocalTime: function (val) {
	        if (val != null) {
	            var date = new Date(parseInt(val.replace("/Date(", "").replace(")/", ""), 10));
	            var year = date.getFullYear();
	            var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
	            var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	            var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	            var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	
	            return year + "-" + month + "-" + currentDate + " " + hours + ":" + minute;
	        }
	        return "";
	    }
	
	};
	


/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    var WebStorageCache = __webpack_require__(46);
	    var home = __webpack_require__(2);
	    //引入时间设置的插件
	    // var WebStorageCache = require('web-storage-cache.min.js');
	
	    var todyurl = home.getApiUrl('HomeSchoolContact/TodayStudyStatus/GetTodayStudyStatusList');
	    console.log(todyurl);
	    //得打AppID和openid
	    var appid = sessionStorage.getItem('appid');
	    var openid = sessionStorage.getItem('openid');
	    console.log(appid);
	    console.log(openid);
	    var wsCache = new WebStorageCache({
	        storage: 'localStorage'
	    });
	    //书写数组存储id
	    var speak = [];
	    var homework = [];
	    var module = [];
	    var newwork = [];
	    //请求数据
	    $.ajax({
	        type: 'post',
	        async: false,
	        url: todyurl,
	        // data to be added to query string:
	        data: {AppID: appid, openID: openid},
	        // type of data we are expecting in return:
	        dataType: 'json',
	        //timeout: 300,
	        success: function (data) {
	            //开课提醒的数据
	            var datta = data.N.HaveClassAlertList;
	            //交作业提醒的数据
	            var datta1 = data.N.SubmitHomeWorkAlertList;
	            //学案提醒的数据
	            var datta2 = data.N.NewTeachPlanAlertList;
	            //新作业提醒的数据
	            var datta3 = data.N.NewHomeWorkAlertList;
	            var length = datta.length;
	            var length1 = datta1.length;
	            var length2 = datta2.length;
	            var length3 = datta3.length;
	            var str = '';
	            var str1 = '';
	            var str2 = '';
	            var str3 = '';
	            for (var i = 0; i < length; i++) {
	                //将Id存到数组里面
	                speak.push(datta[i].id);
	                var string0 = (datta0[i].dateTimes).match((/(\d)+/));
	                var start0 = home.dateFormat(+string0[0], 'hh:mm');
	                var string01 = (datta0[i].endDateTime).match((/(\d)+/));
	                var end0 = home.dateFormat(+string01[0], 'hh:mm');
	                str += '<div class="part speak" id="' + datta[i].id + '"><img src="../bundle/img/details_03.png"><span class="title">开讲啦</span><p>您好:<span class="first_span">' + datta[i].userName + '</span>今天有课，快提醒他上课吧~</p><hr /><p  class="detailed"><span class="subject">' + datta[i].subject + '</span>（第<span  class="num">' + datta[i].extendNum + '</span>次)<span class="datatime">' + start0 + '</span>~<span class="datatime">' + end0 + '</span></p></div>'
	            }
	            $('.main').append(str);
	            for (var i = 0; i < length1; i++) {
	                homework.push(datta1[i].id);
	                var string1 = (datta1[i].dateTimes).match((/(\d)+/));
	                var start1 = home.dateFormat(+string1[0], 'yyyy:MM:dd:hh:mm');
	                var string11 = (datta1[i].endDateTime).match((/(\d)+/));
	                var end1 = home.dateFormat(+string11[0], 'yyyy:MM:dd:hh:mm');
	                str1 += '<div class="part homework" id="' + datta1[i].id + '"><img src="../bundle/img/details_06.jpg"><span class="title">快交作业啦</span><p>您好:<span class="first_span">' + datta1[i].userName + '</span>还有未交作业，快督促他交作业吧~</p><hr /><p  class="detailed"><span class="subject">' + datta1[i].subject + '</span>（第<span  class="num">' + datta1[i].extendNum + '</span>次)<span class="datatime">截止&nbsp;&nbsp明天&nbsp;' + end1 + '</span></span></p></div>'
	            }
	            $('.main').append(str1);
	            for (var i = 0; i < length2; i++) {
	                module.push(datta2[i].id);
	                var string2 = (datta2[i].dateTimes).match((/(\d)+/));
	                var start2 = home.dateFormat(+string2[0], 'hh:mm');
	                var string21 = (datta2[i].endDateTime).match((/(\d)+/));
	                var end2 = home.dateFormat(+string21[0], 'hh:mm');
	                str2 += '<div class="part module" id="' + datta2[i].id + '"><img src="../bundle/img/details_09.jpg"><span class="title">收到一份新学案</span><p>您好:老师发布了新学案，快提醒<span class="first_span">' + datta2[i].userName + '</span>预习吧</p><hr /><p  class="detailed"><span class="subject">' + datta2[i].subject + '</span>（第<span  class="num">' + datta2[i].extendNum + '</span>次)<span class="datatime">上课&nbsp;&nbsp&nbsp;<span class="time">' + end2 + '</span></span></p></div>'
	            }
	            ;
	            $('.main').append(str2);
	            for (var i = 0; i < length3; i++) {
	                newwork.push(datta3[i].id);
	                var string3 = (datta3[i].dateTimes).match((/(\d)+/));
	                var start3 = home.dateFormat(+string3[0], 'hh:mm');
	                var string31 = (datta3[i].endDateTime).match((/(\d)+/));
	                var end3 = home.dateFormat(+string31[0], 'hh:mm');
	                str3 += '<div class="part newwork" id="' + datta3[i].id + '"><img src="../bundle/img/details.jpg"><span class="title">收到一份新作业</span><p>您好:老师布置了新作业，快督促<span class="first_span">' + datta3[i].userName + '</span>作答吧~</p><hr /><p  class="detailed"><span class="subject">' + datta3[i].subject + '</span>（第<span  class="num">' + datta3[i].extendNum + '</span>次)<span class="datatime">截止&nbsp;&nbsp明天&nbsp;<span class="time">' + end3 + '</span></span></p></div>'
	            }
	            $('.main').append(str3);
	        },
	        error: function (xhr, type) {
	            alert('Ajax error!')
	        }
	    });
	    var typestr = ['speak', 'homework', 'module', 'newwork'];
	    var typeval = [speak, homework, module, newwork];
	    console.log(typeval);
	    var typeclass = ['.speak', '.homework', '.module', '.newwork'];
	    //wsCache.set('detailsnums', 1, {exp : new Date('2016 5 28')});
	    //对作业处的信息进行设置
	
	    //class代表选择器的类目
	    //val代表数组
	    //str代表标识的变量
	    function readed(clas, va, str) {
	         for (var i = 0; i < va.length; i++) {
	            //设置一个过期时间
	            wsCache.set('detailsnums', 1, {exp: new Date('2016 5 28')});
	            if (localStorage.getItem('detailsnums') == null){
	                $(clas).eq(i).children('.detailed').html('此信息已过期');
	            }
	        }
	        $(clas).click(function () {
	            //得到此时点击的元素的位置值
	            var num = $(this).index(clas);
	            //对work数组进行循环对当前点击的元素设置一个localStorage数值
	            for (var i = 0; i < va.length; i++) {
	                if (num == i) {
	                    localStorage.setItem(str + i, va[i]);
	                }
	            }
	            $(this).children('.detailed').html('此信息已被读取');
	        });
	        //循环便利所有的数值，如果点击之后将信息设置成已读
	        for (var i = 0; i < va.length; i++) {
	             //得到元素的id
	            var myId=$(clas).eq(i).attr('id');
	           if (myId==localStorage.getItem(str + i)) {
	                $(clas).eq(i).children('.detailed').html('此信息已被读取');
	            }
	        }
	    }
	    //循环的便利上面的函数
	    for (var i = 0; i < 4; i++) {
	        readed(typeclass[i], typeval[i], typestr[i]);
	    }
	
	});
	
	
	
	


/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 web-storage-cache -- Added `expires` attribute and serialize data with `JSON.parse` for the localStorage and sessionStorage.
	 Version 1.0.0
	 https://github.com/WQTeam/web-storage-cache
	 (c) 2013-2016 WQTeam, MIT license
	 */
	!function(a,b){ true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (b), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=b():a.WebStorageCache=b()}(this,function(){"use strict";function a(a,b){for(var c in b)a[c]=b[c];return a}function b(a){var b=!1;if(a&&a.setItem){b=!0;var c="__"+Math.round(1e7*Math.random());try{a.setItem(c,c),a.removeItem(c)}catch(d){b=!1}}return b}function c(a){var b=typeof a;return"string"===b&&window[a]instanceof Storage?window[a]:a}function d(a){return"[object Date]"===Object.prototype.toString.call(a)&&!isNaN(a.getTime())}function e(a,b){if(b=b||new Date,"number"==typeof a?a=a===1/0?l:new Date(b.getTime()+1e3*a):"string"==typeof a&&(a=new Date(a)),a&&!d(a))throw new Error("`expires` parameter cannot be converted to a valid Date instance");return a}function f(a){var b=!1;if(a)if(a.code)switch(a.code){case 22:b=!0;break;case 1014:"NS_ERROR_DOM_QUOTA_REACHED"===a.name&&(b=!0)}else-2147024882===a.number&&(b=!0);return b}function g(a,b){this.c=(new Date).getTime(),b=b||l;var c=e(b);this.e=c.getTime(),this.v=a}function h(a){return a&&"c"in a&&"e"in a&&"v"in a?!0:!1}function i(a){var b=(new Date).getTime();return b<a.e}function j(a){return"string"!=typeof a&&(console.warn(a+" used as a key, but it is not a string."),a=String(a)),a}function k(d){var e={storage:"localStorage",exp:1/0},f=a(e,d),g=c(f.storage),h=b(g);this.isSupported=function(){return h},h?(this.storage=g,this.quotaExceedHandler=function(a,b,c){if(console.warn("Quota exceeded!"),c&&c.force===!0){var d=this.deleteAllExpires();console.warn("delete all expires CacheItem : ["+d+"] and try execute `set` method again!");try{c.force=!1,this.set(a,b,c)}catch(e){console.warn(e)}}}):a(this,n)}var l=new Date("Fri, 31 Dec 9999 23:59:59 UTC"),m={serialize:function(a){return JSON.stringify(a)},deserialize:function(a){return a&&JSON.parse(a)}},n={set:function(){},get:function(){},"delete":function(){},deleteAllExpires:function(){},clear:function(){},add:function(){},replace:function(){},touch:function(){}},o={set:function(b,c,d){if(b=j(b),d=a({force:!0},d),void 0===c)return this["delete"](b);var e=m.serialize(c),h=new g(e,d.exp);try{this.storage.setItem(b,m.serialize(h))}catch(i){f(i)?this.quotaExceedHandler(b,e,d,i):console.error(i)}return c},get:function(a){a=j(a);var b=null;try{b=m.deserialize(this.storage.getItem(a))}catch(c){return null}if(h(b)){if(i(b)){var d=b.v;return m.deserialize(d)}this["delete"](a)}return null},"delete":function(a){return a=j(a),this.storage.removeItem(a),a},deleteAllExpires:function(){for(var a=this.storage.length,b=[],c=this,d=0;a>d;d++){var e=this.storage.key(d),f=null;try{f=m.deserialize(this.storage.getItem(e))}catch(g){}if(null!==f&&void 0!==f.e){var h=(new Date).getTime();h>=f.e&&b.push(e)}}return b.forEach(function(a){c["delete"](a)}),b},clear:function(){this.storage.clear()},add:function(b,c,d){b=j(b),d=a({force:!0},d);try{var e=m.deserialize(this.storage.getItem(b));if(!h(e)||!i(e))return this.set(b,c,d),!0}catch(f){return this.set(b,c,d),!0}return!1},replace:function(a,b,c){a=j(a);var d=null;try{d=m.deserialize(this.storage.getItem(a))}catch(e){return!1}if(h(d)){if(i(d))return this.set(a,b,c),!0;this["delete"](a)}return!1},touch:function(a,b){a=j(a);var c=null;try{c=m.deserialize(this.storage.getItem(a))}catch(d){return!1}if(h(c)){if(i(c))return this.set(a,this.get(a),{exp:b}),!0;this["delete"](a)}return!1}};return k.prototype=o,k});

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGIwODMzNWMyZDQ3NTBlMGQ5ZDg/NTY4MCoqKioqKioqKioqIiwid2VicGFjazovLy8uL2RlcC91dGlsL3V0aWwuanM/MjIyMSoqKioqKioqKioqIiwid2VicGFjazovLy8uL2pzL3RvZGF5LXN0dWR5LmpzIiwid2VicGFjazovLy8uL2RlcC93ZWItc3RvcmFnZS1jYWNoZS5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QztBQUN4QztBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsMERBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLEVBQUU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUE4Qix1QkFBdUI7QUFDckQsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQiwwQ0FBMEM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFvRDtBQUNwRCxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUNuUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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IiwiZmlsZSI6InRvZGF5LXN0dWR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL21mZy13ZWNoYXQvYnVuZGxlL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNGIwODMzNWMyZDQ3NTBlMGQ5ZDhcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBodW1vckhhbiBvbiAyMDE2LzUvMjAuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cz17XHJcbiAgICAgICAgc2NyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRIZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcclxuICAgICAgICB2YXIgc1RvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG4gICAgICAgIHZhciBjSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIGlmIChzVG9wICsgY0hlaWdodCA9PSBkSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgZ2V0U3ViamVjdE5hbWU6ZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIHZhciBuYW1lPScnO1xyXG4gICAgICAgIHN3aXRjaCAoaWQudG9TdHJpbmcoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgJzAxJzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+ivreaWhyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDInOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n5pWw5a2mJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwMyc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfoi7Hor60nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA0JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+eJqeeQhic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDUnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n5YyW5a2mJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwNic6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfmlL/msrsnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA3JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+WOhuWPsic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDgnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n5Zyw55CGJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwOSc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfnlJ/niaknO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfSxcclxuICAgIGdldFN0YWdlU3RyOiBmdW5jdGlvbiAoc3RhZ2VJZCkge1xyXG4gICAgICAgIHZhciBzdGFnZUlkU3RyID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKHN0YWdlSWQpIHtcclxuICAgICAgICAgICAgY2FzZSBcInhcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIuWwj+WtplwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjXCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLliJ3kuK1cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZ1wiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi6auY5LitXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhZ2VJZFN0cjtcclxuICAgIH0sXHJcbiAgICBnb19tZW51OmZ1bmN0aW9uKGNvbklkKXtcclxuICAgICAgICB2YXIgY29uPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbklkKTtcclxuICAgICAgICB2YXIgaW1nPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2lkJywnbWVudUNvbnRyJyk7XHJcbiAgICAgICAgaW1nLnNyYz0nLi4vYnVuZGxlL2ltZy9ib3R0b20teXVhbi1zaG93LnBuZyc7XHJcbiAgICAgICAgY29uLmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICAgICAgdmFyIG1lbnVDb250cj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudUNvbnRyJyk7XHJcbiAgICAgICAgbWVudUNvbnRyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLG1lbnVCb2R5LGZhbHNlKTtcclxuICAgICAgICBmdW5jdGlvbiBtZW51Qm9keSgpe1xyXG4gICAgICAgICAgICB2YXIgbWVudVNob3c9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVTaG93Jyk7XHJcbiAgICAgICAgICAgIGlmKG1lbnVTaG93KXtcclxuICAgICAgICAgICAgICAgIHZhciB0PW1lbnVTaG93LmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIGlmKCB0ID09ICdkaXNwbGF5OiBub25lOycpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPVwiLi4vYnVuZGxlL2ltZy9tZW51Mi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL2JvdHRvbS15dWFuLXNob3cucG5nXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2hvdz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVTaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCdkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5pbm5lckhUTUw9JzxhIGhyZWY9XCJhZnRlcmNsYXNzam9iLmh0bWxcIiBjbGFzcz1cImt0eGFcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcveHVlYW4ucG5nXCIvPjwvYT48YSBocmVmPVwid3JvbmctZ2F0aGVyLmh0bWxcIiBjbGFzcz1cImt4amxcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvamlqaW4ucG5nXCI8L2E+PGEgaHJlZj1cImhvbWV3b3JrLWxpc3QuaHRtbFwiICBjbGFzcz1cImN0ampcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvamlsdS5wbmdcIj48L2E+PGEgaHJlZj1cIm1vbnRod2Vhay5odG1sXCIgY2xhc3M9XCJteXJ4XCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3J1b3hpYW5nLnBuZ1wiPjwvYT4nO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ29fc3R1ZHlfc2hvdzpmdW5jdGlvbihpbWdsb2dvLHNob3dpZCl7XHJcbiAgICAgICAgICAgdmFyIG49MTtcclxuICAgICAgICAgICAgJChpbWdsb2dvKS5wYXJlbnQoXCJoM1wiKS5vbihcInRvdWNoc3RhcnRcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYobiAlMiAhPTApe1xyXG4gICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykuYXR0cihcInNyY1wiLFwiLi4vaW1nL2J0bS5wbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChzaG93aWQpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJChpbWdsb2dvKS5hdHRyKFwic3JjXCIsXCIuLi9pbWcvdG9wLWppYW50b3UucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoc2hvd2lkKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgIH0pfSxcclxuXHJcbiAgICBzaG93Q29uZmlybTpmdW5jdGlvbihtc2csY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxheWVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGF5ZXIuY2xhc3NOYW1lPVwibGF5ZXJcIjtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxheWVyKTtcclxuICAgICAgICB2YXIgY29uZmlybT0nPGRpdiBjbGFzcz1cInBvcGNvbmZpcm1cIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8ZGl2IGNsYXNzPVwidGl0bGVcIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8aSBjbGFzcz1cImljb24tY2xvc2VcIj48L2k+JztcclxuICAgICAgICBjb25maXJtKz0nIDwvZGl2Pic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8ZGl2IGNsYXNzPVwiY29udGVudFwiPicrbXNnKycgPC9kaXY+JztcclxuICAgICAgICBjb25maXJtKz0nIDxkaXYgY2xhc3M9XCJmb290XCI+JztcclxuICAgICAgICBjb25maXJtKz0nICA8aW5wdXQgY2xhc3M9XCJwb3BidG4gYnRub2sgY29sb3ItZ3JlZW5cIiB0eXBlPVwiYnV0dG9uXCIgIHZhbHVlPVwi56Gu5a6aXCIvPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgPGlucHV0IGNsYXNzPVwicG9wYnRuIGJ0bmNhbmNlbCBjb2xvci1ncmVlblwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPlua2iFwiLz4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgICA8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoY29uZmlybSk7XHJcbiAgICAgICAgLy8kKCcucG9wY29uZmlybScpLmNzcygndG9wJywoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtJCgnLnBvcGNvbmZpcm0nKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgJChcIi5idG5va1wiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAkKFwiLmJ0bm9rXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuYnRuY2FuY2VsLC5pY29uLWNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+S/oeaBr+aPkOekuuahhlxyXG4gICAgc2hvd1BvcE1zZzpmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgdmFyIGh0bWw9JzxkaXYgY2xhc3M9XCJwb3Btc2dcIj48ZGl2IGNsYXNzPVwiY29udGVudFwiPicrbXNnKyc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ2xlZnQnLChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoICAtJCgnLnBvcG1zZycpLndpZHRoKCkpLzIpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ3RvcCcsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSQoJy5wb3Btc2cnKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyQoJy5wb3Btc2cnKS5yZW1vdmUoKTt9LDEwMDApO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5o6l5Y+jdXJsIOWmguiOt+WPlm9wZW5pZCAgIGdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKVxyXG4gICAgZ2V0QXBpVXJsOmZ1bmN0aW9uKGFjdGlvbil7XHJcbiAgICAgICAgdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk4Lyc7XHJcbiAgICAgICAgdmFyIGJhc2V1cmw9J2h0dHA6Ly9sb2NhbGhvc3Q6NTQ0MS8nO1xyXG4gICAgICAgIHJldHVybiBiYXNldXJsK2FjdGlvbjtcclxuICAgIH0sXHJcbiAgICAvL+iwg+eUqGFwaeaIkOWKn+WQju+8jOWFiOiwg+eUqOatpOaWueazle+8jOWIpOaWreeUqOaIt+aYr+WQpuW3sue7j+e7keWumu+8jOiLpeacque7keWumu+8jOi3s+i9rOWIsOe7keWumumhtVxyXG4gICAgY2hlY2tCaW5kOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGlmKCFkYXRhLk9LKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZGF0YS5Db2RlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj1cImJpbmRpbmZvLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlk9wZW5JZFxyXG4gICAgZ2V0T3BlbklkOmZ1bmN0aW9uKGFwcGlkLGFwcHNlY3JldCxjb2RlKXtcclxudmFyIG9wZW5pZDtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGFzeW5jOmZhbHNlLFxyXG4gICAgICAgICAgICB1cmw6dGhpcy5nZXRBcGlVcmwoJ0FjY291bnQvR2V0T3BlbklEJyksXHJcbiAgICAgICAgICAgIC8vIGRhdGEgdG8gYmUgYWRkZWQgdG8gcXVlcnkgc3RyaW5nOlxyXG4gICAgICAgICAgICBkYXRhOiB7QXBwSUQ6YXBwaWQsQXBwU2VjcmV0OmFwcHNlY3JldCxDb2RlOmNvZGV9LFxyXG4gICAgICAgICAgICAvLyB0eXBlIG9mIGRhdGEgd2UgYXJlIGV4cGVjdGluZyBpbiByZXR1cm46XHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIC8vdGltZW91dDogMzAwLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5PSylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuaWQ9ZGF0YS5JRDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnQWpheCBlcnJvciEnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gb3BlbmlkO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+WdXJs5Y+C5pWwXHJcbiAgICBnZXRRdWVyeVN0cmluZzpmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoXnwmKVwiICsgbmFtZSArIFwiPShbXiZdKikoJnwkKVwiLCBcImlcIik7XHJcbiAgICB2YXIgciA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLm1hdGNoKHJlZyk7XHJcbiAgICBpZiAociAhPSBudWxsKSByZXR1cm4gdW5lc2NhcGUoZGVjb2RlVVJJKHJbMl0pKTsgcmV0dXJuIG51bGw7XHJcbn0sXHJcblxyXG4gICAgZGF0ZUZvcm1hdDogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0KXtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHZhciBtYXAgPSB7XHJcbiAgICAgICAgICAgIFwiWVwiOiBkYXRlLmdldFllYXIoKSxcclxuICAgICAgICAgICAgXCJNXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9XHJcbiAgICAgICAgICAgIFwiZFwiOiBkYXRlLmdldERhdGUoKSwgLy/ml6VcclxuICAgICAgICAgICAgXCJoXCI6IGRhdGUuZ2V0SG91cnMoKSwgLy/lsI/ml7ZcclxuICAgICAgICAgICAgXCJtXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhlxyXG4gICAgICAgICAgICBcInNcIjogZGF0ZS5nZXRTZWNvbmRzKCksIC8v56eSXHJcbiAgICAgICAgICAgIFwicVwiOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6plxyXG4gICAgICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enklxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoLyhbeU1kaG1zcVNdKSsvZywgZnVuY3Rpb24gKGFsbCwgdCkge1xyXG4gICAgICAgICAgICB2YXIgdiA9IG1hcFt0XTtcclxuICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFsbC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdiA9ICcwJyArIHY7XHJcbiAgICAgICAgICAgICAgICAgICAgdiA9IHYuc3Vic3RyKHYubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0ID09PSAneScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gYWxsLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFsbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgfSxcclxuICAgIC8v5aSE55CG6K+V6aKY5YWs5byPIG1hdGhqYXhcclxuICAgIGluaXRNYXRoSmF4T2JqOmZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIE1hdGhKYXguSHViLlF1ZXVlKFtcIlR5cGVzZXRcIiwgTWF0aEpheC5IdWIsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKV0pO1xyXG4gICAgfSxcclxuICAgIGdldExvY2FsVGltZTogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KHZhbC5yZXBsYWNlKFwiL0RhdGUoXCIsIFwiXCIpLnJlcGxhY2UoXCIpL1wiLCBcIlwiKSwgMTApKTtcclxuICAgICAgICAgICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEgPCAxMCA/IFwiMFwiICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gZGF0ZS5nZXREYXRlKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0SG91cnMoKSA6IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgdmFyIG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpIDogZGF0ZS5nZXRNaW51dGVzKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geWVhciArIFwiLVwiICsgbW9udGggKyBcIi1cIiArIGN1cnJlbnREYXRlICsgXCIgXCIgKyBob3VycyArIFwiOlwiICsgbWludXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL3V0aWwvdXRpbC5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDcgOSAxMCAxMSAxMiAxMyAxNCAxNiAxNyAxOCAxOVxuICoqLyIsIiQoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIFdlYlN0b3JhZ2VDYWNoZSA9IHJlcXVpcmUoJ3dlYi1zdG9yYWdlLWNhY2hlLm1pbi5qcycpO1xyXG4gICAgdmFyIGhvbWUgPSByZXF1aXJlKFwidXRpbC91dGlsXCIpO1xyXG4gICAgLy/lvJXlhaXml7bpl7Torr7nva7nmoTmj5Lku7ZcclxuICAgIC8vIHZhciBXZWJTdG9yYWdlQ2FjaGUgPSByZXF1aXJlKCd3ZWItc3RvcmFnZS1jYWNoZS5taW4uanMnKTtcclxuXHJcbiAgICB2YXIgdG9keXVybCA9IGhvbWUuZ2V0QXBpVXJsKCdIb21lU2Nob29sQ29udGFjdC9Ub2RheVN0dWR5U3RhdHVzL0dldFRvZGF5U3R1ZHlTdGF0dXNMaXN0Jyk7XHJcbiAgICBjb25zb2xlLmxvZyh0b2R5dXJsKTtcclxuICAgIC8v5b6X5omTQXBwSUTlkoxvcGVuaWRcclxuICAgIHZhciBhcHBpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FwcGlkJyk7XHJcbiAgICB2YXIgb3BlbmlkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnb3BlbmlkJyk7XHJcbiAgICBjb25zb2xlLmxvZyhhcHBpZCk7XHJcbiAgICBjb25zb2xlLmxvZyhvcGVuaWQpO1xyXG4gICAgdmFyIHdzQ2FjaGUgPSBuZXcgV2ViU3RvcmFnZUNhY2hlKHtcclxuICAgICAgICBzdG9yYWdlOiAnbG9jYWxTdG9yYWdlJ1xyXG4gICAgfSk7XHJcbiAgICAvL+S5puWGmeaVsOe7hOWtmOWCqGlkXHJcbiAgICB2YXIgc3BlYWsgPSBbXTtcclxuICAgIHZhciBob21ld29yayA9IFtdO1xyXG4gICAgdmFyIG1vZHVsZSA9IFtdO1xyXG4gICAgdmFyIG5ld3dvcmsgPSBbXTtcclxuICAgIC8v6K+35rGC5pWw5o2uXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgdXJsOiB0b2R5dXJsLFxyXG4gICAgICAgIC8vIGRhdGEgdG8gYmUgYWRkZWQgdG8gcXVlcnkgc3RyaW5nOlxyXG4gICAgICAgIGRhdGE6IHtBcHBJRDogYXBwaWQsIG9wZW5JRDogb3BlbmlkfSxcclxuICAgICAgICAvLyB0eXBlIG9mIGRhdGEgd2UgYXJlIGV4cGVjdGluZyBpbiByZXR1cm46XHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAvL3RpbWVvdXQ6IDMwMCxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvL+W8gOivvuaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGEgPSBkYXRhLk4uSGF2ZUNsYXNzQWxlcnRMaXN0O1xyXG4gICAgICAgICAgICAvL+S6pOS9nOS4muaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGExID0gZGF0YS5OLlN1Ym1pdEhvbWVXb3JrQWxlcnRMaXN0O1xyXG4gICAgICAgICAgICAvL+WtpuahiOaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGEyID0gZGF0YS5OLk5ld1RlYWNoUGxhbkFsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/mlrDkvZzkuJrmj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhMyA9IGRhdGEuTi5OZXdIb21lV29ya0FsZXJ0TGlzdDtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGRhdHRhLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aDEgPSBkYXR0YTEubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgbGVuZ3RoMiA9IGRhdHRhMi5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGgzID0gZGF0dGEzLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIHN0ciA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgc3RyMSA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgc3RyMiA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgc3RyMyA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAvL+Wwhklk5a2Y5Yiw5pWw57uE6YeM6Z2iXHJcbiAgICAgICAgICAgICAgICBzcGVhay5wdXNoKGRhdHRhW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcwID0gKGRhdHRhMFtpXS5kYXRlVGltZXMpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0MCA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMFswXSwgJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMDEgPSAoZGF0dGEwW2ldLmVuZERhdGVUaW1lKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHZhciBlbmQwID0gaG9tZS5kYXRlRm9ybWF0KCtzdHJpbmcwMVswXSwgJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICBzdHIgKz0gJzxkaXYgY2xhc3M9XCJwYXJ0IHNwZWFrXCIgaWQ9XCInICsgZGF0dGFbaV0uaWQgKyAnXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2RldGFpbHNfMDMucG5nXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPuW8gOiusuWVpjwvc3Bhbj48cD7mgqjlpb06PHNwYW4gY2xhc3M9XCJmaXJzdF9zcGFuXCI+JyArIGRhdHRhW2ldLnVzZXJOYW1lICsgJzwvc3Bhbj7ku4rlpKnmnInor77vvIzlv6vmj5DphpLku5bkuIror77lkKd+PC9wPjxociAvPjxwICBjbGFzcz1cImRldGFpbGVkXCI+PHNwYW4gY2xhc3M9XCJzdWJqZWN0XCI+JyArIGRhdHRhW2ldLnN1YmplY3QgKyAnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgKyBkYXR0YVtpXS5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+JyArIHN0YXJ0MCArICc8L3NwYW4+fjxzcGFuIGNsYXNzPVwiZGF0YXRpbWVcIj4nICsgZW5kMCArICc8L3NwYW4+PC9wPjwvZGl2PidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcubWFpbicpLmFwcGVuZChzdHIpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDE7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaG9tZXdvcmsucHVzaChkYXR0YTFbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZzEgPSAoZGF0dGExW2ldLmRhdGVUaW1lcykubWF0Y2goKC8oXFxkKSsvKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQxID0gaG9tZS5kYXRlRm9ybWF0KCtzdHJpbmcxWzBdLCAneXl5eTpNTTpkZDpoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZzExID0gKGRhdHRhMVtpXS5lbmREYXRlVGltZSkubWF0Y2goKC8oXFxkKSsvKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW5kMSA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMTFbMF0sICd5eXl5Ok1NOmRkOmhoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICBzdHIxICs9ICc8ZGl2IGNsYXNzPVwicGFydCBob21ld29ya1wiIGlkPVwiJyArIGRhdHRhMVtpXS5pZCArICdcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlsc18wNi5qcGdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5b+r5Lqk5L2c5Lia5ZWmPC9zcGFuPjxwPuaCqOWlvTo8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICsgZGF0dGExW2ldLnVzZXJOYW1lICsgJzwvc3Bhbj7ov5jmnInmnKrkuqTkvZzkuJrvvIzlv6vnnaPkv4Pku5bkuqTkvZzkuJrlkKd+PC9wPjxociAvPjxwICBjbGFzcz1cImRldGFpbGVkXCI+PHNwYW4gY2xhc3M9XCJzdWJqZWN0XCI+JyArIGRhdHRhMVtpXS5zdWJqZWN0ICsgJzwvc3Bhbj7vvIjnrKw8c3BhbiAgY2xhc3M9XCJudW1cIj4nICsgZGF0dGExW2ldLmV4dGVuZE51bSArICc8L3NwYW4+5qyhKTxzcGFuIGNsYXNzPVwiZGF0YXRpbWVcIj7miKrmraImbmJzcDsmbmJzcOaYjuWkqSZuYnNwOycgKyBlbmQxICsgJzwvc3Bhbj48L3NwYW4+PC9wPjwvZGl2PidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcubWFpbicpLmFwcGVuZChzdHIxKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGgyOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG1vZHVsZS5wdXNoKGRhdHRhMltpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMiA9IChkYXR0YTJbaV0uZGF0ZVRpbWVzKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGFydDIgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzJbMF0sICdoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZzIxID0gKGRhdHRhMltpXS5lbmREYXRlVGltZSkubWF0Y2goKC8oXFxkKSsvKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW5kMiA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMjFbMF0sICdoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgc3RyMiArPSAnPGRpdiBjbGFzcz1cInBhcnQgbW9kdWxlXCIgaWQ9XCInICsgZGF0dGEyW2ldLmlkICsgJ1wiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9kZXRhaWxzXzA5LmpwZ1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj7mlLbliLDkuIDku73mlrDlrabmoYg8L3NwYW4+PHA+5oKo5aW9OuiAgeW4iOWPkeW4g+S6huaWsOWtpuahiO+8jOW/q+aPkOmGkjxzcGFuIGNsYXNzPVwiZmlyc3Rfc3BhblwiPicgKyBkYXR0YTJbaV0udXNlck5hbWUgKyAnPC9zcGFuPumihOS5oOWQpzwvcD48aHIgLz48cCAgY2xhc3M9XCJkZXRhaWxlZFwiPjxzcGFuIGNsYXNzPVwic3ViamVjdFwiPicgKyBkYXR0YTJbaV0uc3ViamVjdCArICc8L3NwYW4+77yI56ysPHNwYW4gIGNsYXNzPVwibnVtXCI+JyArIGRhdHRhMltpXS5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+5LiK6K++Jm5ic3A7Jm5ic3AmbmJzcDs8c3BhbiBjbGFzcz1cInRpbWVcIj4nICsgZW5kMiArICc8L3NwYW4+PC9zcGFuPjwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgO1xyXG4gICAgICAgICAgICAkKCcubWFpbicpLmFwcGVuZChzdHIyKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGgzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG5ld3dvcmsucHVzaChkYXR0YTNbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZzMgPSAoZGF0dGEzW2ldLmRhdGVUaW1lcykubWF0Y2goKC8oXFxkKSsvKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQzID0gaG9tZS5kYXRlRm9ybWF0KCtzdHJpbmczWzBdLCAnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmczMSA9IChkYXR0YTNbaV0uZW5kRGF0ZVRpbWUpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVuZDMgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzMxWzBdLCAnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHN0cjMgKz0gJzxkaXYgY2xhc3M9XCJwYXJ0IG5ld3dvcmtcIiBpZD1cIicgKyBkYXR0YTNbaV0uaWQgKyAnXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2RldGFpbHMuanBnXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPuaUtuWIsOS4gOS7veaWsOS9nOS4mjwvc3Bhbj48cD7mgqjlpb066ICB5biI5biD572u5LqG5paw5L2c5Lia77yM5b+r552j5L+DPHNwYW4gY2xhc3M9XCJmaXJzdF9zcGFuXCI+JyArIGRhdHRhM1tpXS51c2VyTmFtZSArICc8L3NwYW4+5L2c562U5ZCnfjwvcD48aHIgLz48cCAgY2xhc3M9XCJkZXRhaWxlZFwiPjxzcGFuIGNsYXNzPVwic3ViamVjdFwiPicgKyBkYXR0YTNbaV0uc3ViamVjdCArICc8L3NwYW4+77yI56ysPHNwYW4gIGNsYXNzPVwibnVtXCI+JyArIGRhdHRhM1tpXS5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+5oiq5q2iJm5ic3A7Jm5ic3DmmI7lpKkmbmJzcDs8c3BhbiBjbGFzcz1cInRpbWVcIj4nICsgZW5kMyArICc8L3NwYW4+PC9zcGFuPjwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyMyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgdHlwZSkge1xyXG4gICAgICAgICAgICBhbGVydCgnQWpheCBlcnJvciEnKVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdmFyIHR5cGVzdHIgPSBbJ3NwZWFrJywgJ2hvbWV3b3JrJywgJ21vZHVsZScsICduZXd3b3JrJ107XHJcbiAgICB2YXIgdHlwZXZhbCA9IFtzcGVhaywgaG9tZXdvcmssIG1vZHVsZSwgbmV3d29ya107XHJcbiAgICBjb25zb2xlLmxvZyh0eXBldmFsKTtcclxuICAgIHZhciB0eXBlY2xhc3MgPSBbJy5zcGVhaycsICcuaG9tZXdvcmsnLCAnLm1vZHVsZScsICcubmV3d29yayddO1xyXG4gICAgLy93c0NhY2hlLnNldCgnZGV0YWlsc251bXMnLCAxLCB7ZXhwIDogbmV3IERhdGUoJzIwMTYgNSAyOCcpfSk7XHJcbiAgICAvL+WvueS9nOS4muWkhOeahOS/oeaBr+i/m+ihjOiuvue9rlxyXG5cclxuICAgIC8vY2xhc3Pku6PooajpgInmi6nlmajnmoTnsbvnm65cclxuICAgIC8vdmFs5Luj6KGo5pWw57uEXHJcbiAgICAvL3N0cuS7o+ihqOagh+ivhueahOWPmOmHj1xyXG4gICAgZnVuY3Rpb24gcmVhZGVkKGNsYXMsIHZhLCBzdHIpIHtcclxuICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAvL+iuvue9ruS4gOS4qui/h+acn+aXtumXtFxyXG4gICAgICAgICAgICB3c0NhY2hlLnNldCgnZGV0YWlsc251bXMnLCAxLCB7ZXhwOiBuZXcgRGF0ZSgnMjAxNiA1IDI4Jyl9KTtcclxuICAgICAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkZXRhaWxzbnVtcycpID09IG51bGwpe1xyXG4gICAgICAgICAgICAgICAgJChjbGFzKS5lcShpKS5jaGlsZHJlbignLmRldGFpbGVkJykuaHRtbCgn5q2k5L+h5oGv5bey6L+H5pyfJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgJChjbGFzKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8v5b6X5Yiw5q2k5pe254K55Ye755qE5YWD57Sg55qE5L2N572u5YC8XHJcbiAgICAgICAgICAgIHZhciBudW0gPSAkKHRoaXMpLmluZGV4KGNsYXMpO1xyXG4gICAgICAgICAgICAvL+WvuXdvcmvmlbDnu4Tov5vooYzlvqrnjq/lr7nlvZPliY3ngrnlh7vnmoTlhYPntKDorr7nva7kuIDkuKpsb2NhbFN0b3JhZ2XmlbDlgLxcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bSA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RyICsgaSwgdmFbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5kZXRhaWxlZCcpLmh0bWwoJ+atpOS/oeaBr+W3suiiq+ivu+WPlicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v5b6q546v5L6/5Yip5omA5pyJ55qE5pWw5YC877yM5aaC5p6c54K55Ye75LmL5ZCO5bCG5L+h5oGv6K6+572u5oiQ5bey6K+7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgLy/lvpfliLDlhYPntKDnmoRpZFxyXG4gICAgICAgICAgICB2YXIgbXlJZD0kKGNsYXMpLmVxKGkpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgaWYgKG15SWQ9PWxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0ciArIGkpKSB7XHJcbiAgICAgICAgICAgICAgICAkKGNsYXMpLmVxKGkpLmNoaWxkcmVuKCcuZGV0YWlsZWQnKS5odG1sKCfmraTkv6Hmga/lt7Looqvor7vlj5YnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5b6q546v55qE5L6/5Yip5LiK6Z2i55qE5Ye95pWwXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIHJlYWRlZCh0eXBlY2xhc3NbaV0sIHR5cGV2YWxbaV0sIHR5cGVzdHJbaV0pO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvdG9kYXktc3R1ZHkuanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAxNlxuICoqLyIsIi8qIVxyXG4gd2ViLXN0b3JhZ2UtY2FjaGUgLS0gQWRkZWQgYGV4cGlyZXNgIGF0dHJpYnV0ZSBhbmQgc2VyaWFsaXplIGRhdGEgd2l0aCBgSlNPTi5wYXJzZWAgZm9yIHRoZSBsb2NhbFN0b3JhZ2UgYW5kIHNlc3Npb25TdG9yYWdlLlxyXG4gVmVyc2lvbiAxLjAuMFxyXG4gaHR0cHM6Ly9naXRodWIuY29tL1dRVGVhbS93ZWItc3RvcmFnZS1jYWNoZVxyXG4gKGMpIDIwMTMtMjAxNiBXUVRlYW0sIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4hZnVuY3Rpb24oYSxiKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGIpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWIoKTphLldlYlN0b3JhZ2VDYWNoZT1iKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBhKGEsYil7Zm9yKHZhciBjIGluIGIpYVtjXT1iW2NdO3JldHVybiBhfWZ1bmN0aW9uIGIoYSl7dmFyIGI9ITE7aWYoYSYmYS5zZXRJdGVtKXtiPSEwO3ZhciBjPVwiX19cIitNYXRoLnJvdW5kKDFlNypNYXRoLnJhbmRvbSgpKTt0cnl7YS5zZXRJdGVtKGMsYyksYS5yZW1vdmVJdGVtKGMpfWNhdGNoKGQpe2I9ITF9fXJldHVybiBifWZ1bmN0aW9uIGMoYSl7dmFyIGI9dHlwZW9mIGE7cmV0dXJuXCJzdHJpbmdcIj09PWImJndpbmRvd1thXWluc3RhbmNlb2YgU3RvcmFnZT93aW5kb3dbYV06YX1mdW5jdGlvbiBkKGEpe3JldHVyblwiW29iamVjdCBEYXRlXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpJiYhaXNOYU4oYS5nZXRUaW1lKCkpfWZ1bmN0aW9uIGUoYSxiKXtpZihiPWJ8fG5ldyBEYXRlLFwibnVtYmVyXCI9PXR5cGVvZiBhP2E9YT09PTEvMD9sOm5ldyBEYXRlKGIuZ2V0VGltZSgpKzFlMyphKTpcInN0cmluZ1wiPT10eXBlb2YgYSYmKGE9bmV3IERhdGUoYSkpLGEmJiFkKGEpKXRocm93IG5ldyBFcnJvcihcImBleHBpcmVzYCBwYXJhbWV0ZXIgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhIHZhbGlkIERhdGUgaW5zdGFuY2VcIik7cmV0dXJuIGF9ZnVuY3Rpb24gZihhKXt2YXIgYj0hMTtpZihhKWlmKGEuY29kZSlzd2l0Y2goYS5jb2RlKXtjYXNlIDIyOmI9ITA7YnJlYWs7Y2FzZSAxMDE0OlwiTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRURcIj09PWEubmFtZSYmKGI9ITApfWVsc2UtMjE0NzAyNDg4Mj09PWEubnVtYmVyJiYoYj0hMCk7cmV0dXJuIGJ9ZnVuY3Rpb24gZyhhLGIpe3RoaXMuYz0obmV3IERhdGUpLmdldFRpbWUoKSxiPWJ8fGw7dmFyIGM9ZShiKTt0aGlzLmU9Yy5nZXRUaW1lKCksdGhpcy52PWF9ZnVuY3Rpb24gaChhKXtyZXR1cm4gYSYmXCJjXCJpbiBhJiZcImVcImluIGEmJlwidlwiaW4gYT8hMDohMX1mdW5jdGlvbiBpKGEpe3ZhciBiPShuZXcgRGF0ZSkuZ2V0VGltZSgpO3JldHVybiBiPGEuZX1mdW5jdGlvbiBqKGEpe3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoY29uc29sZS53YXJuKGErXCIgdXNlZCBhcyBhIGtleSwgYnV0IGl0IGlzIG5vdCBhIHN0cmluZy5cIiksYT1TdHJpbmcoYSkpLGF9ZnVuY3Rpb24gayhkKXt2YXIgZT17c3RvcmFnZTpcImxvY2FsU3RvcmFnZVwiLGV4cDoxLzB9LGY9YShlLGQpLGc9YyhmLnN0b3JhZ2UpLGg9YihnKTt0aGlzLmlzU3VwcG9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGh9LGg/KHRoaXMuc3RvcmFnZT1nLHRoaXMucXVvdGFFeGNlZWRIYW5kbGVyPWZ1bmN0aW9uKGEsYixjKXtpZihjb25zb2xlLndhcm4oXCJRdW90YSBleGNlZWRlZCFcIiksYyYmYy5mb3JjZT09PSEwKXt2YXIgZD10aGlzLmRlbGV0ZUFsbEV4cGlyZXMoKTtjb25zb2xlLndhcm4oXCJkZWxldGUgYWxsIGV4cGlyZXMgQ2FjaGVJdGVtIDogW1wiK2QrXCJdIGFuZCB0cnkgZXhlY3V0ZSBgc2V0YCBtZXRob2QgYWdhaW4hXCIpO3RyeXtjLmZvcmNlPSExLHRoaXMuc2V0KGEsYixjKX1jYXRjaChlKXtjb25zb2xlLndhcm4oZSl9fX0pOmEodGhpcyxuKX12YXIgbD1uZXcgRGF0ZShcIkZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgVVRDXCIpLG09e3NlcmlhbGl6ZTpmdW5jdGlvbihhKXtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSl9LGRlc2VyaWFsaXplOmZ1bmN0aW9uKGEpe3JldHVybiBhJiZKU09OLnBhcnNlKGEpfX0sbj17c2V0OmZ1bmN0aW9uKCl7fSxnZXQ6ZnVuY3Rpb24oKXt9LFwiZGVsZXRlXCI6ZnVuY3Rpb24oKXt9LGRlbGV0ZUFsbEV4cGlyZXM6ZnVuY3Rpb24oKXt9LGNsZWFyOmZ1bmN0aW9uKCl7fSxhZGQ6ZnVuY3Rpb24oKXt9LHJlcGxhY2U6ZnVuY3Rpb24oKXt9LHRvdWNoOmZ1bmN0aW9uKCl7fX0sbz17c2V0OmZ1bmN0aW9uKGIsYyxkKXtpZihiPWooYiksZD1hKHtmb3JjZTohMH0sZCksdm9pZCAwPT09YylyZXR1cm4gdGhpc1tcImRlbGV0ZVwiXShiKTt2YXIgZT1tLnNlcmlhbGl6ZShjKSxoPW5ldyBnKGUsZC5leHApO3RyeXt0aGlzLnN0b3JhZ2Uuc2V0SXRlbShiLG0uc2VyaWFsaXplKGgpKX1jYXRjaChpKXtmKGkpP3RoaXMucXVvdGFFeGNlZWRIYW5kbGVyKGIsZSxkLGkpOmNvbnNvbGUuZXJyb3IoaSl9cmV0dXJuIGN9LGdldDpmdW5jdGlvbihhKXthPWooYSk7dmFyIGI9bnVsbDt0cnl7Yj1tLmRlc2VyaWFsaXplKHRoaXMuc3RvcmFnZS5nZXRJdGVtKGEpKX1jYXRjaChjKXtyZXR1cm4gbnVsbH1pZihoKGIpKXtpZihpKGIpKXt2YXIgZD1iLnY7cmV0dXJuIG0uZGVzZXJpYWxpemUoZCl9dGhpc1tcImRlbGV0ZVwiXShhKX1yZXR1cm4gbnVsbH0sXCJkZWxldGVcIjpmdW5jdGlvbihhKXtyZXR1cm4gYT1qKGEpLHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGEpLGF9LGRlbGV0ZUFsbEV4cGlyZXM6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5zdG9yYWdlLmxlbmd0aCxiPVtdLGM9dGhpcyxkPTA7YT5kO2QrKyl7dmFyIGU9dGhpcy5zdG9yYWdlLmtleShkKSxmPW51bGw7dHJ5e2Y9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShlKSl9Y2F0Y2goZyl7fWlmKG51bGwhPT1mJiZ2b2lkIDAhPT1mLmUpe3ZhciBoPShuZXcgRGF0ZSkuZ2V0VGltZSgpO2g+PWYuZSYmYi5wdXNoKGUpfX1yZXR1cm4gYi5mb3JFYWNoKGZ1bmN0aW9uKGEpe2NbXCJkZWxldGVcIl0oYSl9KSxifSxjbGVhcjpmdW5jdGlvbigpe3RoaXMuc3RvcmFnZS5jbGVhcigpfSxhZGQ6ZnVuY3Rpb24oYixjLGQpe2I9aihiKSxkPWEoe2ZvcmNlOiEwfSxkKTt0cnl7dmFyIGU9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShiKSk7aWYoIWgoZSl8fCFpKGUpKXJldHVybiB0aGlzLnNldChiLGMsZCksITB9Y2F0Y2goZil7cmV0dXJuIHRoaXMuc2V0KGIsYyxkKSwhMH1yZXR1cm4hMX0scmVwbGFjZTpmdW5jdGlvbihhLGIsYyl7YT1qKGEpO3ZhciBkPW51bGw7dHJ5e2Q9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShhKSl9Y2F0Y2goZSl7cmV0dXJuITF9aWYoaChkKSl7aWYoaShkKSlyZXR1cm4gdGhpcy5zZXQoYSxiLGMpLCEwO3RoaXNbXCJkZWxldGVcIl0oYSl9cmV0dXJuITF9LHRvdWNoOmZ1bmN0aW9uKGEsYil7YT1qKGEpO3ZhciBjPW51bGw7dHJ5e2M9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShhKSl9Y2F0Y2goZCl7cmV0dXJuITF9aWYoaChjKSl7aWYoaShjKSlyZXR1cm4gdGhpcy5zZXQoYSx0aGlzLmdldChhKSx7ZXhwOmJ9KSwhMDt0aGlzW1wiZGVsZXRlXCJdKGEpfXJldHVybiExfX07cmV0dXJuIGsucHJvdG90eXBlPW8sa30pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvd2ViLXN0b3JhZ2UtY2FjaGUubWluLmpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTZcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9