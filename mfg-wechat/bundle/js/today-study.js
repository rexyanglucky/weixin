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

	module.exports = __webpack_require__(42);


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
	                show.innerHTML='<a href="#" class="ktxa"><img src="../bundle/img/xuean.png"/></a><a href="#" class="kxjl"><img src="../bundle/img/jijin.png"</a><a href="#" class="ctjj"><img src="../bundle/img/jilu.png"></a><a href="#" class="myrx"><img src="../bundle/img/ruoxiang.png"></a>';
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
	        //var baseurl='http://localhost:5441/';
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
	    },
	
	};
	


/***/ },

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    var WebStorageCache = __webpack_require__(43);
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

/***/ 43:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGRmMzA4ZjVkMzJkNzFlNzhiMGE/ZDhkZioqKioqKioqKioqKioqIiwid2VicGFjazovLy8uL2RlcC91dGlsL3V0aWwuanM/MjIyMSoqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvdG9kYXktc3R1ZHkuanMiLCJ3ZWJwYWNrOi8vLy4vZGVwL3dlYi1zdG9yYWdlLWNhY2hlLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDO0FBQ3hDO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSwwREFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsRUFBRTs7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQThCLHVCQUF1QjtBQUNyRCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLDBDQUEwQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQW9EO0FBQ3BELEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDs7Ozs7Ozs7O0FDaFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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dHVkeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9tZmctd2VjaGF0L2J1bmRsZS9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDBkZjMwOGY1ZDMyZDcxZTc4YjBhXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzIwLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgICAgIHNjcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkSGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcclxuICAgICAgICB2YXIgY0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICBpZiAoc1RvcCArIGNIZWlnaHQgPT0gZEhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIGdldFN1YmplY3ROYW1lOmZ1bmN0aW9uKGlkKXtcclxuICAgICAgICB2YXIgbmFtZT0nJztcclxuICAgICAgICBzd2l0Y2ggKGlkLnRvU3RyaW5nKCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlICcwMSc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfor63mlocnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzAyJzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+aVsOWtpic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDMnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n6Iux6K+tJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwNCc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfniannkIYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA1JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+WMluWtpic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDYnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n5pS/5rK7JztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwNyc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfljoblj7InO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA4JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+WcsOeQhic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDknOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n55Sf54mpJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgIH0sXHJcbiAgICBnZXRTdGFnZVN0cjogZnVuY3Rpb24gKHN0YWdlSWQpIHtcclxuICAgICAgICB2YXIgc3RhZ2VJZFN0ciA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChzdGFnZUlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4XCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLlsI/lraZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY1wiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi5Yid5LitXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImdcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIumrmOS4rVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YWdlSWRTdHI7XHJcbiAgICB9LFxyXG4gICAgZ29fbWVudTpmdW5jdGlvbihjb25JZCl7XHJcbiAgICAgICAgdmFyIGNvbj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb25JZCk7XHJcbiAgICAgICAgdmFyIGltZz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVDb250cicpO1xyXG4gICAgICAgIGltZy5zcmM9Jy4uL2J1bmRsZS9pbWcvYm90dG9tLXl1YW4tc2hvdy5wbmcnO1xyXG4gICAgICAgIGNvbi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgIHZhciBtZW51Q29udHI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVDb250cicpO1xyXG4gICAgICAgIG1lbnVDb250ci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JyxtZW51Qm9keSxmYWxzZSk7XHJcbiAgICAgICAgZnVuY3Rpb24gbWVudUJvZHkoKXtcclxuICAgICAgICAgICAgdmFyIG1lbnVTaG93PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICBpZihtZW51U2hvdyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgdD1tZW51U2hvdy5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiggdCA9PSAnZGlzcGxheTogbm9uZTsnKXtcclxuICAgICAgICAgICAgICAgICAgICBtZW51U2hvdy5zdHlsZS5kaXNwbGF5PSdibG9jayc7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYz1cIi4uL2J1bmRsZS9pbWcvbWVudTIucG5nXCI7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBtZW51U2hvdy5zdHlsZS5kaXNwbGF5PSdub25lJztcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPVwiLi4vYnVuZGxlL2ltZy9ib3R0b20teXVhbi1zaG93LnBuZ1wiXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdmFyIHNob3c9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnaWQnLCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuaW5uZXJIVE1MPSc8YSBocmVmPVwiI1wiIGNsYXNzPVwia3R4YVwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy94dWVhbi5wbmdcIi8+PC9hPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJreGpsXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppamluLnBuZ1wiPC9hPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJjdGpqXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppbHUucG5nXCI+PC9hPjxhIGhyZWY9XCIjXCIgY2xhc3M9XCJteXJ4XCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3J1b3hpYW5nLnBuZ1wiPjwvYT4nO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ29fc3R1ZHlfc2hvdzpmdW5jdGlvbihpbWdsb2dvLHNob3dpZCl7XHJcbiAgICAgICAgICAgdmFyIG49MTtcclxuICAgICAgICAgICAgJChpbWdsb2dvKS5wYXJlbnQoXCJoM1wiKS5vbihcInRvdWNoc3RhcnRcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYobiAlMiAhPTApe1xyXG4gICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykuYXR0cihcInNyY1wiLFwiLi4vaW1nL2J0bS5wbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChzaG93aWQpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJChpbWdsb2dvKS5hdHRyKFwic3JjXCIsXCIuLi9pbWcvdG9wLWppYW50b3UucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoc2hvd2lkKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgIH0pfSxcclxuXHJcbiAgICBzaG93Q29uZmlybTpmdW5jdGlvbihtc2csY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxheWVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGF5ZXIuY2xhc3NOYW1lPVwibGF5ZXJcIjtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxheWVyKTtcclxuICAgICAgICB2YXIgY29uZmlybT0nPGRpdiBjbGFzcz1cInBvcGNvbmZpcm1cIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8ZGl2IGNsYXNzPVwidGl0bGVcIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8aSBjbGFzcz1cImljb24tY2xvc2VcIj48L2k+JztcclxuICAgICAgICBjb25maXJtKz0nIDwvZGl2Pic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8ZGl2IGNsYXNzPVwiY29udGVudFwiPicrbXNnKycgPC9kaXY+JztcclxuICAgICAgICBjb25maXJtKz0nIDxkaXYgY2xhc3M9XCJmb290XCI+JztcclxuICAgICAgICBjb25maXJtKz0nICA8aW5wdXQgY2xhc3M9XCJwb3BidG4gYnRub2sgY29sb3ItZ3JlZW5cIiB0eXBlPVwiYnV0dG9uXCIgIHZhbHVlPVwi56Gu5a6aXCIvPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgPGlucHV0IGNsYXNzPVwicG9wYnRuIGJ0bmNhbmNlbCBjb2xvci1ncmVlblwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPlua2iFwiLz4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgICA8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoY29uZmlybSk7XHJcbiAgICAgICAgLy8kKCcucG9wY29uZmlybScpLmNzcygndG9wJywoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtJCgnLnBvcGNvbmZpcm0nKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgJChcIi5idG5va1wiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAkKFwiLmJ0bm9rXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuYnRuY2FuY2VsLC5pY29uLWNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+S/oeaBr+aPkOekuuahhlxyXG4gICAgc2hvd1BvcE1zZzpmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgdmFyIGh0bWw9JzxkaXYgY2xhc3M9XCJwb3Btc2dcIj48ZGl2IGNsYXNzPVwiY29udGVudFwiPicrbXNnKyc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ2xlZnQnLChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoICAtJCgnLnBvcG1zZycpLndpZHRoKCkpLzIpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ3RvcCcsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSQoJy5wb3Btc2cnKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyQoJy5wb3Btc2cnKS5yZW1vdmUoKTt9LDEwMDApO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5o6l5Y+jdXJsIOWmguiOt+WPlm9wZW5pZCAgIGdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKVxyXG4gICAgZ2V0QXBpVXJsOmZ1bmN0aW9uKGFjdGlvbil7XHJcbiAgICAgICAgdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk4Lyc7XHJcbiAgICAgICAgLy92YXIgYmFzZXVybD0naHR0cDovL2xvY2FsaG9zdDo1NDQxLyc7XHJcbiAgICAgICAgcmV0dXJuIGJhc2V1cmwrYWN0aW9uO1xyXG4gICAgfSxcclxuICAgIC8v6LCD55SoYXBp5oiQ5Yqf5ZCO77yM5YWI6LCD55So5q2k5pa55rOV77yM5Yik5pat55So5oi35piv5ZCm5bey57uP57uR5a6a77yM6Iul5pyq57uR5a6a77yM6Lez6L2s5Yiw57uR5a6a6aG1XHJcbiAgICBjaGVja0JpbmQ6ZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgaWYoIWRhdGEuT0spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihkYXRhLkNvZGU9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmPVwiYmluZGluZm8uaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6I635Y+WT3BlbklkXHJcbiAgICBnZXRPcGVuSWQ6ZnVuY3Rpb24oYXBwaWQsYXBwc2VjcmV0LGNvZGUpe1xyXG52YXIgb3BlbmlkO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgYXN5bmM6ZmFsc2UsXHJcbiAgICAgICAgICAgIHVybDp0aGlzLmdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKSxcclxuICAgICAgICAgICAgLy8gZGF0YSB0byBiZSBhZGRlZCB0byBxdWVyeSBzdHJpbmc6XHJcbiAgICAgICAgICAgIGRhdGE6IHtBcHBJRDphcHBpZCxBcHBTZWNyZXQ6YXBwc2VjcmV0LENvZGU6Y29kZX0sXHJcbiAgICAgICAgICAgIC8vIHR5cGUgb2YgZGF0YSB3ZSBhcmUgZXhwZWN0aW5nIGluIHJldHVybjpcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgLy90aW1lb3V0OiAzMDAsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLk9LKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5pZD1kYXRhLklEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCB0eXBlKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdBamF4IGVycm9yIScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBvcGVuaWQ7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5Z1cmzlj4LmlbBcclxuICAgIGdldFF1ZXJ5U3RyaW5nOmZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIgKyBuYW1lICsgXCI9KFteJl0qKSgmfCQpXCIsIFwiaVwiKTtcclxuICAgIHZhciByID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcclxuICAgIGlmIChyICE9IG51bGwpIHJldHVybiB1bmVzY2FwZShkZWNvZGVVUkkoclsyXSkpOyByZXR1cm4gbnVsbDtcclxufSxcclxuXHJcbiAgICBkYXRlRm9ybWF0OiBmdW5jdGlvbihkYXRlLCBmb3JtYXQpe1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgdmFyIG1hcCA9IHtcclxuICAgICAgICAgICAgXCJZXCI6IGRhdGUuZ2V0WWVhcigpLFxyXG4gICAgICAgICAgICBcIk1cIjogZGF0ZS5nZXRNb250aCgpICsgMSwgLy/mnIjku71cclxuICAgICAgICAgICAgXCJkXCI6IGRhdGUuZ2V0RGF0ZSgpLCAvL+aXpVxyXG4gICAgICAgICAgICBcImhcIjogZGF0ZS5nZXRIb3VycygpLCAvL+Wwj+aXtlxyXG4gICAgICAgICAgICBcIm1cIjogZGF0ZS5nZXRNaW51dGVzKCksIC8v5YiGXHJcbiAgICAgICAgICAgIFwic1wiOiBkYXRlLmdldFNlY29uZHMoKSwgLy/np5JcclxuICAgICAgICAgICAgXCJxXCI6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksIC8v5a2j5bqmXHJcbiAgICAgICAgICAgIFwiU1wiOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvKFt5TWRobXNxU10pKy9nLCBmdW5jdGlvbiAoYWxsLCB0KSB7XHJcbiAgICAgICAgICAgIHZhciB2ID0gbWFwW3RdO1xyXG4gICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gJzAnICsgdjtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gdi5zdWJzdHIodi5sZW5ndGggLSAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHQgPT09ICd5Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnJykuc3Vic3RyKDQgLSBhbGwubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGdldExvY2FsVGltZTogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KHZhbC5yZXBsYWNlKFwiL0RhdGUoXCIsIFwiXCIpLnJlcGxhY2UoXCIpL1wiLCBcIlwiKSwgMTApKTtcclxuICAgICAgICAgICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEgPCAxMCA/IFwiMFwiICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gZGF0ZS5nZXREYXRlKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0SG91cnMoKSA6IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgdmFyIG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpIDogZGF0ZS5nZXRNaW51dGVzKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geWVhciArIFwiLVwiICsgbW9udGggKyBcIi1cIiArIGN1cnJlbnREYXRlICsgXCIgXCIgKyBob3VycyArIFwiOlwiICsgbWludXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH0sXHJcblxyXG59O1xyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC91dGlsL3V0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA3IDkgMTAgMTEgMTIgMTMgMTUgMTYgMTcgMThcbiAqKi8iLCIkKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBXZWJTdG9yYWdlQ2FjaGUgPSByZXF1aXJlKCd3ZWItc3RvcmFnZS1jYWNoZS5taW4uanMnKTtcclxuICAgIHZhciBob21lID0gcmVxdWlyZShcInV0aWwvdXRpbFwiKTtcclxuICAgIC8v5byV5YWl5pe26Ze06K6+572u55qE5o+S5Lu2XHJcbiAgICAvLyB2YXIgV2ViU3RvcmFnZUNhY2hlID0gcmVxdWlyZSgnd2ViLXN0b3JhZ2UtY2FjaGUubWluLmpzJyk7XHJcblxyXG4gICAgdmFyIHRvZHl1cmwgPSBob21lLmdldEFwaVVybCgnSG9tZVNjaG9vbENvbnRhY3QvVG9kYXlTdHVkeVN0YXR1cy9HZXRUb2RheVN0dWR5U3RhdHVzTGlzdCcpO1xyXG4gICAgY29uc29sZS5sb2codG9keXVybCk7XHJcbiAgICAvL+W+l+aJk0FwcElE5ZKMb3BlbmlkXHJcbiAgICB2YXIgYXBwaWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhcHBpZCcpO1xyXG4gICAgdmFyIG9wZW5pZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ29wZW5pZCcpO1xyXG4gICAgY29uc29sZS5sb2coYXBwaWQpO1xyXG4gICAgY29uc29sZS5sb2cob3BlbmlkKTtcclxuICAgIHZhciB3c0NhY2hlID0gbmV3IFdlYlN0b3JhZ2VDYWNoZSh7XHJcbiAgICAgICAgc3RvcmFnZTogJ2xvY2FsU3RvcmFnZSdcclxuICAgIH0pO1xyXG4gICAgLy/kuablhpnmlbDnu4TlrZjlgqhpZFxyXG4gICAgdmFyIHNwZWFrID0gW107XHJcbiAgICB2YXIgaG9tZXdvcmsgPSBbXTtcclxuICAgIHZhciBtb2R1bGUgPSBbXTtcclxuICAgIHZhciBuZXd3b3JrID0gW107XHJcbiAgICAvL+ivt+axguaVsOaNrlxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgIHVybDogdG9keXVybCxcclxuICAgICAgICAvLyBkYXRhIHRvIGJlIGFkZGVkIHRvIHF1ZXJ5IHN0cmluZzpcclxuICAgICAgICBkYXRhOiB7QXBwSUQ6IGFwcGlkLCBvcGVuSUQ6IG9wZW5pZH0sXHJcbiAgICAgICAgLy8gdHlwZSBvZiBkYXRhIHdlIGFyZSBleHBlY3RpbmcgaW4gcmV0dXJuOlxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgLy90aW1lb3V0OiAzMDAsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy/lvIDor77mj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhID0gZGF0YS5OLkhhdmVDbGFzc0FsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/kuqTkvZzkuJrmj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhMSA9IGRhdGEuTi5TdWJtaXRIb21lV29ya0FsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/lrabmoYjmj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhMiA9IGRhdGEuTi5OZXdUZWFjaFBsYW5BbGVydExpc3Q7XHJcbiAgICAgICAgICAgIC8v5paw5L2c5Lia5o+Q6YaS55qE5pWw5o2uXHJcbiAgICAgICAgICAgIHZhciBkYXR0YTMgPSBkYXRhLk4uTmV3SG9tZVdvcmtBbGVydExpc3Q7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBkYXR0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGgxID0gZGF0dGExLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aDIgPSBkYXR0YTIubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgbGVuZ3RoMyA9IGRhdHRhMy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjEgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjIgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjMgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy/lsIZJZOWtmOWIsOaVsOe7hOmHjOmdolxyXG4gICAgICAgICAgICAgICAgc3BlYWsucHVzaChkYXR0YVtpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMCA9IChkYXR0YTBbaV0uZGF0ZVRpbWVzKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGFydDAgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzBbMF0sICdoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZzAxID0gKGRhdHRhMFtpXS5lbmREYXRlVGltZSkubWF0Y2goKC8oXFxkKSsvKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW5kMCA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMDFbMF0sICdoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgc3RyICs9ICc8ZGl2IGNsYXNzPVwicGFydCBzcGVha1wiIGlkPVwiJyArIGRhdHRhW2ldLmlkICsgJ1wiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9kZXRhaWxzXzAzLnBuZ1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj7lvIDorrLllaY8L3NwYW4+PHA+5oKo5aW9OjxzcGFuIGNsYXNzPVwiZmlyc3Rfc3BhblwiPicgKyBkYXR0YVtpXS51c2VyTmFtZSArICc8L3NwYW4+5LuK5aSp5pyJ6K++77yM5b+r5o+Q6YaS5LuW5LiK6K++5ZCnfjwvcD48aHIgLz48cCAgY2xhc3M9XCJkZXRhaWxlZFwiPjxzcGFuIGNsYXNzPVwic3ViamVjdFwiPicgKyBkYXR0YVtpXS5zdWJqZWN0ICsgJzwvc3Bhbj7vvIjnrKw8c3BhbiAgY2xhc3M9XCJudW1cIj4nICsgZGF0dGFbaV0uZXh0ZW5kTnVtICsgJzwvc3Bhbj7mrKEpPHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPicgKyBzdGFydDAgKyAnPC9zcGFuPn48c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+JyArIGVuZDAgKyAnPC9zcGFuPjwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGgxOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGhvbWV3b3JrLnB1c2goZGF0dGExW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcxID0gKGRhdHRhMVtpXS5kYXRlVGltZXMpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0MSA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMVswXSwgJ3l5eXk6TU06ZGQ6aGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcxMSA9IChkYXR0YTFbaV0uZW5kRGF0ZVRpbWUpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVuZDEgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzExWzBdLCAneXl5eTpNTTpkZDpoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgc3RyMSArPSAnPGRpdiBjbGFzcz1cInBhcnQgaG9tZXdvcmtcIiBpZD1cIicgKyBkYXR0YTFbaV0uaWQgKyAnXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2RldGFpbHNfMDYuanBnXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPuW/q+S6pOS9nOS4muWVpjwvc3Bhbj48cD7mgqjlpb06PHNwYW4gY2xhc3M9XCJmaXJzdF9zcGFuXCI+JyArIGRhdHRhMVtpXS51c2VyTmFtZSArICc8L3NwYW4+6L+Y5pyJ5pyq5Lqk5L2c5Lia77yM5b+r552j5L+D5LuW5Lqk5L2c5Lia5ZCnfjwvcD48aHIgLz48cCAgY2xhc3M9XCJkZXRhaWxlZFwiPjxzcGFuIGNsYXNzPVwic3ViamVjdFwiPicgKyBkYXR0YTFbaV0uc3ViamVjdCArICc8L3NwYW4+77yI56ysPHNwYW4gIGNsYXNzPVwibnVtXCI+JyArIGRhdHRhMVtpXS5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+5oiq5q2iJm5ic3A7Jm5ic3DmmI7lpKkmbmJzcDsnICsgZW5kMSArICc8L3NwYW4+PC9zcGFuPjwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyMSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoMjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBtb2R1bGUucHVzaChkYXR0YTJbaV0uaWQpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZzIgPSAoZGF0dGEyW2ldLmRhdGVUaW1lcykubWF0Y2goKC8oXFxkKSsvKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQyID0gaG9tZS5kYXRlRm9ybWF0KCtzdHJpbmcyWzBdLCAnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcyMSA9IChkYXR0YTJbaV0uZW5kRGF0ZVRpbWUpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVuZDIgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzIxWzBdLCAnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHN0cjIgKz0gJzxkaXYgY2xhc3M9XCJwYXJ0IG1vZHVsZVwiIGlkPVwiJyArIGRhdHRhMltpXS5pZCArICdcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlsc18wOS5qcGdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5pS25Yiw5LiA5Lu95paw5a2m5qGIPC9zcGFuPjxwPuaCqOWlvTrogIHluIjlj5HluIPkuobmlrDlrabmoYjvvIzlv6vmj5DphpI8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICsgZGF0dGEyW2ldLnVzZXJOYW1lICsgJzwvc3Bhbj7pooTkuaDlkKc8L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICsgZGF0dGEyW2ldLnN1YmplY3QgKyAnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgKyBkYXR0YTJbaV0uZXh0ZW5kTnVtICsgJzwvc3Bhbj7mrKEpPHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPuS4iuivviZuYnNwOyZuYnNwJm5ic3A7PHNwYW4gY2xhc3M9XCJ0aW1lXCI+JyArIGVuZDIgKyAnPC9zcGFuPjwvc3Bhbj48L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIDtcclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyMik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoMzsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBuZXd3b3JrLnB1c2goZGF0dGEzW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmczID0gKGRhdHRhM1tpXS5kYXRlVGltZXMpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0MyA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nM1swXSwgJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMzEgPSAoZGF0dGEzW2ldLmVuZERhdGVUaW1lKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHZhciBlbmQzID0gaG9tZS5kYXRlRm9ybWF0KCtzdHJpbmczMVswXSwgJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICBzdHIzICs9ICc8ZGl2IGNsYXNzPVwicGFydCBuZXd3b3JrXCIgaWQ9XCInICsgZGF0dGEzW2ldLmlkICsgJ1wiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9kZXRhaWxzLmpwZ1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj7mlLbliLDkuIDku73mlrDkvZzkuJo8L3NwYW4+PHA+5oKo5aW9OuiAgeW4iOW4g+e9ruS6huaWsOS9nOS4mu+8jOW/q+edo+S/gzxzcGFuIGNsYXNzPVwiZmlyc3Rfc3BhblwiPicgKyBkYXR0YTNbaV0udXNlck5hbWUgKyAnPC9zcGFuPuS9nOetlOWQp348L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICsgZGF0dGEzW2ldLnN1YmplY3QgKyAnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgKyBkYXR0YTNbaV0uZXh0ZW5kTnVtICsgJzwvc3Bhbj7mrKEpPHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPuaIquatoiZuYnNwOyZuYnNw5piO5aSpJm5ic3A7PHNwYW4gY2xhc3M9XCJ0aW1lXCI+JyArIGVuZDMgKyAnPC9zcGFuPjwvc3Bhbj48L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5tYWluJykuYXBwZW5kKHN0cjMpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHR5cGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ0FqYXggZXJyb3IhJylcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHZhciB0eXBlc3RyID0gWydzcGVhaycsICdob21ld29yaycsICdtb2R1bGUnLCAnbmV3d29yayddO1xyXG4gICAgdmFyIHR5cGV2YWwgPSBbc3BlYWssIGhvbWV3b3JrLCBtb2R1bGUsIG5ld3dvcmtdO1xyXG4gICAgY29uc29sZS5sb2codHlwZXZhbCk7XHJcbiAgICB2YXIgdHlwZWNsYXNzID0gWycuc3BlYWsnLCAnLmhvbWV3b3JrJywgJy5tb2R1bGUnLCAnLm5ld3dvcmsnXTtcclxuICAgIC8vd3NDYWNoZS5zZXQoJ2RldGFpbHNudW1zJywgMSwge2V4cCA6IG5ldyBEYXRlKCcyMDE2IDUgMjgnKX0pO1xyXG4gICAgLy/lr7nkvZzkuJrlpITnmoTkv6Hmga/ov5vooYzorr7nva5cclxuXHJcbiAgICAvL2NsYXNz5Luj6KGo6YCJ5oup5Zmo55qE57G755uuXHJcbiAgICAvL3ZhbOS7o+ihqOaVsOe7hFxyXG4gICAgLy9zdHLku6PooajmoIfor4bnmoTlj5jph49cclxuICAgIGZ1bmN0aW9uIHJlYWRlZChjbGFzLCB2YSwgc3RyKSB7XHJcbiAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgLy/orr7nva7kuIDkuKrov4fmnJ/ml7bpl7RcclxuICAgICAgICAgICAgd3NDYWNoZS5zZXQoJ2RldGFpbHNudW1zJywgMSwge2V4cDogbmV3IERhdGUoJzIwMTYgNSAyOCcpfSk7XHJcbiAgICAgICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZGV0YWlsc251bXMnKSA9PSBudWxsKXtcclxuICAgICAgICAgICAgICAgICQoY2xhcykuZXEoaSkuY2hpbGRyZW4oJy5kZXRhaWxlZCcpLmh0bWwoJ+atpOS/oeaBr+W3sui/h+acnycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgICQoY2xhcykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+W+l+WIsOatpOaXtueCueWHu+eahOWFg+e0oOeahOS9jee9ruWAvFxyXG4gICAgICAgICAgICB2YXIgbnVtID0gJCh0aGlzKS5pbmRleChjbGFzKTtcclxuICAgICAgICAgICAgLy/lr7l3b3Jr5pWw57uE6L+b6KGM5b6q546v5a+55b2T5YmN54K55Ye755qE5YWD57Sg6K6+572u5LiA5LiqbG9jYWxTdG9yYWdl5pWw5YC8XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChudW0gPT0gaSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHN0ciArIGksIHZhW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCcuZGV0YWlsZWQnKS5odG1sKCfmraTkv6Hmga/lt7Looqvor7vlj5YnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+W+queOr+S+v+WIqeaJgOacieeahOaVsOWAvO+8jOWmguaenOeCueWHu+S5i+WQjuWwhuS/oeaBr+iuvue9ruaIkOW3suivu1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgIC8v5b6X5Yiw5YWD57Sg55qEaWRcclxuICAgICAgICAgICAgdmFyIG15SWQ9JChjbGFzKS5lcShpKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgIGlmIChteUlkPT1sb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdHIgKyBpKSkge1xyXG4gICAgICAgICAgICAgICAgJChjbGFzKS5lcShpKS5jaGlsZHJlbignLmRldGFpbGVkJykuaHRtbCgn5q2k5L+h5oGv5bey6KKr6K+75Y+WJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+W+queOr+eahOS+v+WIqeS4iumdoueahOWHveaVsFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICByZWFkZWQodHlwZWNsYXNzW2ldLCB0eXBldmFsW2ldLCB0eXBlc3RyW2ldKTtcclxuICAgIH1cclxuXHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL3RvZGF5LXN0dWR5LmpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTVcbiAqKi8iLCIvKiFcclxuIHdlYi1zdG9yYWdlLWNhY2hlIC0tIEFkZGVkIGBleHBpcmVzYCBhdHRyaWJ1dGUgYW5kIHNlcmlhbGl6ZSBkYXRhIHdpdGggYEpTT04ucGFyc2VgIGZvciB0aGUgbG9jYWxTdG9yYWdlIGFuZCBzZXNzaW9uU3RvcmFnZS5cclxuIFZlcnNpb24gMS4wLjBcclxuIGh0dHBzOi8vZ2l0aHViLmNvbS9XUVRlYW0vd2ViLXN0b3JhZ2UtY2FjaGVcclxuIChjKSAyMDEzLTIwMTYgV1FUZWFtLCBNSVQgbGljZW5zZVxyXG4gKi9cclxuIWZ1bmN0aW9uKGEsYil7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShiKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1iKCk6YS5XZWJTdG9yYWdlQ2FjaGU9YigpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYShhLGIpe2Zvcih2YXIgYyBpbiBiKWFbY109YltjXTtyZXR1cm4gYX1mdW5jdGlvbiBiKGEpe3ZhciBiPSExO2lmKGEmJmEuc2V0SXRlbSl7Yj0hMDt2YXIgYz1cIl9fXCIrTWF0aC5yb3VuZCgxZTcqTWF0aC5yYW5kb20oKSk7dHJ5e2Euc2V0SXRlbShjLGMpLGEucmVtb3ZlSXRlbShjKX1jYXRjaChkKXtiPSExfX1yZXR1cm4gYn1mdW5jdGlvbiBjKGEpe3ZhciBiPXR5cGVvZiBhO3JldHVyblwic3RyaW5nXCI9PT1iJiZ3aW5kb3dbYV1pbnN0YW5jZW9mIFN0b3JhZ2U/d2luZG93W2FdOmF9ZnVuY3Rpb24gZChhKXtyZXR1cm5cIltvYmplY3QgRGF0ZV1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSYmIWlzTmFOKGEuZ2V0VGltZSgpKX1mdW5jdGlvbiBlKGEsYil7aWYoYj1ifHxuZXcgRGF0ZSxcIm51bWJlclwiPT10eXBlb2YgYT9hPWE9PT0xLzA/bDpuZXcgRGF0ZShiLmdldFRpbWUoKSsxZTMqYSk6XCJzdHJpbmdcIj09dHlwZW9mIGEmJihhPW5ldyBEYXRlKGEpKSxhJiYhZChhKSl0aHJvdyBuZXcgRXJyb3IoXCJgZXhwaXJlc2AgcGFyYW1ldGVyIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gYSB2YWxpZCBEYXRlIGluc3RhbmNlXCIpO3JldHVybiBhfWZ1bmN0aW9uIGYoYSl7dmFyIGI9ITE7aWYoYSlpZihhLmNvZGUpc3dpdGNoKGEuY29kZSl7Y2FzZSAyMjpiPSEwO2JyZWFrO2Nhc2UgMTAxNDpcIk5TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEXCI9PT1hLm5hbWUmJihiPSEwKX1lbHNlLTIxNDcwMjQ4ODI9PT1hLm51bWJlciYmKGI9ITApO3JldHVybiBifWZ1bmN0aW9uIGcoYSxiKXt0aGlzLmM9KG5ldyBEYXRlKS5nZXRUaW1lKCksYj1ifHxsO3ZhciBjPWUoYik7dGhpcy5lPWMuZ2V0VGltZSgpLHRoaXMudj1hfWZ1bmN0aW9uIGgoYSl7cmV0dXJuIGEmJlwiY1wiaW4gYSYmXCJlXCJpbiBhJiZcInZcImluIGE/ITA6ITF9ZnVuY3Rpb24gaShhKXt2YXIgYj0obmV3IERhdGUpLmdldFRpbWUoKTtyZXR1cm4gYjxhLmV9ZnVuY3Rpb24gaihhKXtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2YgYSYmKGNvbnNvbGUud2FybihhK1wiIHVzZWQgYXMgYSBrZXksIGJ1dCBpdCBpcyBub3QgYSBzdHJpbmcuXCIpLGE9U3RyaW5nKGEpKSxhfWZ1bmN0aW9uIGsoZCl7dmFyIGU9e3N0b3JhZ2U6XCJsb2NhbFN0b3JhZ2VcIixleHA6MS8wfSxmPWEoZSxkKSxnPWMoZi5zdG9yYWdlKSxoPWIoZyk7dGhpcy5pc1N1cHBvcnRlZD1mdW5jdGlvbigpe3JldHVybiBofSxoPyh0aGlzLnN0b3JhZ2U9Zyx0aGlzLnF1b3RhRXhjZWVkSGFuZGxlcj1mdW5jdGlvbihhLGIsYyl7aWYoY29uc29sZS53YXJuKFwiUXVvdGEgZXhjZWVkZWQhXCIpLGMmJmMuZm9yY2U9PT0hMCl7dmFyIGQ9dGhpcy5kZWxldGVBbGxFeHBpcmVzKCk7Y29uc29sZS53YXJuKFwiZGVsZXRlIGFsbCBleHBpcmVzIENhY2hlSXRlbSA6IFtcIitkK1wiXSBhbmQgdHJ5IGV4ZWN1dGUgYHNldGAgbWV0aG9kIGFnYWluIVwiKTt0cnl7Yy5mb3JjZT0hMSx0aGlzLnNldChhLGIsYyl9Y2F0Y2goZSl7Y29uc29sZS53YXJuKGUpfX19KTphKHRoaXMsbil9dmFyIGw9bmV3IERhdGUoXCJGcmksIDMxIERlYyA5OTk5IDIzOjU5OjU5IFVUQ1wiKSxtPXtzZXJpYWxpemU6ZnVuY3Rpb24oYSl7cmV0dXJuIEpTT04uc3RyaW5naWZ5KGEpfSxkZXNlcmlhbGl6ZTpmdW5jdGlvbihhKXtyZXR1cm4gYSYmSlNPTi5wYXJzZShhKX19LG49e3NldDpmdW5jdGlvbigpe30sZ2V0OmZ1bmN0aW9uKCl7fSxcImRlbGV0ZVwiOmZ1bmN0aW9uKCl7fSxkZWxldGVBbGxFeHBpcmVzOmZ1bmN0aW9uKCl7fSxjbGVhcjpmdW5jdGlvbigpe30sYWRkOmZ1bmN0aW9uKCl7fSxyZXBsYWNlOmZ1bmN0aW9uKCl7fSx0b3VjaDpmdW5jdGlvbigpe319LG89e3NldDpmdW5jdGlvbihiLGMsZCl7aWYoYj1qKGIpLGQ9YSh7Zm9yY2U6ITB9LGQpLHZvaWQgMD09PWMpcmV0dXJuIHRoaXNbXCJkZWxldGVcIl0oYik7dmFyIGU9bS5zZXJpYWxpemUoYyksaD1uZXcgZyhlLGQuZXhwKTt0cnl7dGhpcy5zdG9yYWdlLnNldEl0ZW0oYixtLnNlcmlhbGl6ZShoKSl9Y2F0Y2goaSl7ZihpKT90aGlzLnF1b3RhRXhjZWVkSGFuZGxlcihiLGUsZCxpKTpjb25zb2xlLmVycm9yKGkpfXJldHVybiBjfSxnZXQ6ZnVuY3Rpb24oYSl7YT1qKGEpO3ZhciBiPW51bGw7dHJ5e2I9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShhKSl9Y2F0Y2goYyl7cmV0dXJuIG51bGx9aWYoaChiKSl7aWYoaShiKSl7dmFyIGQ9Yi52O3JldHVybiBtLmRlc2VyaWFsaXplKGQpfXRoaXNbXCJkZWxldGVcIl0oYSl9cmV0dXJuIG51bGx9LFwiZGVsZXRlXCI6ZnVuY3Rpb24oYSl7cmV0dXJuIGE9aihhKSx0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShhKSxhfSxkZWxldGVBbGxFeHBpcmVzOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMuc3RvcmFnZS5sZW5ndGgsYj1bXSxjPXRoaXMsZD0wO2E+ZDtkKyspe3ZhciBlPXRoaXMuc3RvcmFnZS5rZXkoZCksZj1udWxsO3RyeXtmPW0uZGVzZXJpYWxpemUodGhpcy5zdG9yYWdlLmdldEl0ZW0oZSkpfWNhdGNoKGcpe31pZihudWxsIT09ZiYmdm9pZCAwIT09Zi5lKXt2YXIgaD0obmV3IERhdGUpLmdldFRpbWUoKTtoPj1mLmUmJmIucHVzaChlKX19cmV0dXJuIGIuZm9yRWFjaChmdW5jdGlvbihhKXtjW1wiZGVsZXRlXCJdKGEpfSksYn0sY2xlYXI6ZnVuY3Rpb24oKXt0aGlzLnN0b3JhZ2UuY2xlYXIoKX0sYWRkOmZ1bmN0aW9uKGIsYyxkKXtiPWooYiksZD1hKHtmb3JjZTohMH0sZCk7dHJ5e3ZhciBlPW0uZGVzZXJpYWxpemUodGhpcy5zdG9yYWdlLmdldEl0ZW0oYikpO2lmKCFoKGUpfHwhaShlKSlyZXR1cm4gdGhpcy5zZXQoYixjLGQpLCEwfWNhdGNoKGYpe3JldHVybiB0aGlzLnNldChiLGMsZCksITB9cmV0dXJuITF9LHJlcGxhY2U6ZnVuY3Rpb24oYSxiLGMpe2E9aihhKTt2YXIgZD1udWxsO3RyeXtkPW0uZGVzZXJpYWxpemUodGhpcy5zdG9yYWdlLmdldEl0ZW0oYSkpfWNhdGNoKGUpe3JldHVybiExfWlmKGgoZCkpe2lmKGkoZCkpcmV0dXJuIHRoaXMuc2V0KGEsYixjKSwhMDt0aGlzW1wiZGVsZXRlXCJdKGEpfXJldHVybiExfSx0b3VjaDpmdW5jdGlvbihhLGIpe2E9aihhKTt2YXIgYz1udWxsO3RyeXtjPW0uZGVzZXJpYWxpemUodGhpcy5zdG9yYWdlLmdldEl0ZW0oYSkpfWNhdGNoKGQpe3JldHVybiExfWlmKGgoYykpe2lmKGkoYykpcmV0dXJuIHRoaXMuc2V0KGEsdGhpcy5nZXQoYSkse2V4cDpifSksITA7dGhpc1tcImRlbGV0ZVwiXShhKX1yZXR1cm4hMX19O3JldHVybiBrLnByb3RvdHlwZT1vLGt9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL3dlYi1zdG9yYWdlLWNhY2hlLm1pbi5qc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDE1XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==