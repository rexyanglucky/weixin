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

	module.exports = __webpack_require__(59);


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
	        var subjectIdStr = "";
	        switch (id) {
	            case "01":
	                subjectIdStr = "语文";
	                break;
	            case "02":
	                subjectIdStr = "数学";
	                break;
	            case "03":
	                subjectIdStr = "英语";
	                break;
	            case "04":
	                subjectIdStr = "物理";
	                break;
	            case "05":
	                subjectIdStr = "化学";
	                break;
	            case "06":
	                subjectIdStr = "地理";
	                break;
	            case "07":
	                subjectIdStr = "历史";
	                break;
	            case "08":
	                subjectIdStr = "政治";
	                break;
	            case "09":
	                subjectIdStr = "生物";
	                break;
	            default:
	                break;
	        }
	        return subjectIdStr;
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
	                $(".study-show").hide();
	                if( t == 'display: none;'){
	                    $("#study-show1").show();
	                    menuShow.style.display='block';
	                    img.src="../bundle/img/menu2.png";
	                }else{
	                    menuShow.style.display='none';
	                    img.src="../bundle/img/bottom-yuan-show.png";
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
	
	    go_study_show:function(imglogo,showid,arr){
	           var n=1;
	            $(imglogo).parent("h3").on("touchstart",function(){
	                if(n %2 !=0){
	                    for(var i=0;i<=4;i++){
	                         $(".study-show").hide();
	                         $(imglogo).parent("h3").index=i;
	                         $(arr[i]).attr("src","../bundle/img/top-jiantou.png");
	                         $(showid+"index").show();
	                    }
	                    $(imglogo).attr("src","../bundle/img/btm.png");
	                    $(showid).show();
	                }
	                else{
	                    $(imglogo).attr("src","../bundle/img/top-jiantou.png");
	                    $(showid).hide();
	                    n++;
	                   console.log(n);
	                }
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
	        //线下测试
	       var baseurl='http://192.168.180.15:8998/';
	        //线上测试
	       //var baseurl='http://192.168.180.15:8997/';
	       // var baseurl='http://localhost:46951/';
	        return baseurl+action;
	    },
	    //调用api成功后，先调用此方法，判断用户是否已经绑定，若未绑定，跳转到绑定页
	    checkBind:function(data){
	        if(!data.OK) {
	            if (data.Code == 1 || data.Code == 2 || data.Code == 4 || data.Code == 11 || data.Code == 12 || data.Code == 13) {
	                window.location.href = "bindinfo.html";
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

/***/ 59:
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    //引入时间设置的插件
	    var WebStorageCache = __webpack_require__(60);
	    var home = __webpack_require__(2);
	    //var nodedata=require('component/no-data/no-data.js');
	   // nodedata.init('main','对不起，数据暂时未加载');
	   // nodedata.module.exports.init(dom,'目前无数据')
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
	    //书写数组存储对应类的id
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
	            //获得时间截取的函数
	            var start='';
	            var end=''
	            function mytime(val,style){
	                var string= (val.dateTimes).match((/(\d)+/));
	                start= home.dateFormat(+string[0],style );//'hh:mm'
	                var string1 = (val.endDateTime).match((/(\d)+/));
	                end= home.dateFormat(+string1[0],style);// 'hh:mm'
	            }
	            var str = '';
	            var str1 = '';
	            var str2 = '';
	            var str3 = '';
	            //开讲了
	            $.each(datta,function(i,val) {
	                speak.push(val.id);
	                mytime(val,'hh:mm');
	                 str += '<div class="part speak" id="'+val.id+'"><img src="../bundle/img/details_03.png"><span class="title">开讲啦</span><p>您好:<span class="first_span">' + val.userName + '</span>今天有课，快提醒他上课吧~</p><hr /><p  class="detailed"><span class="subject">' + val.subject + '</span>（第<span  class="num">' + val.extendNum + '</span>次)<span class="datatime">' + start+ '</span>~<span class="datatime">' + end+ '</span></p></div>'
	             })
	            $('.main').append(str);
	            //快交作业了
	            $.each(datta1,function(i,val) {
	                homework.push(val.id);
	                mytime(val,'yyyy:MM:dd:hh:mm');
	                str1 += '<div class="part homework" id="'+val.id+'"><img src="../bundle/img/details_06.jpg"><span class="title">快交作业啦</span><p>您好:<span class="first_span">' +val.userName + '</span>还有未交作业，快督促他交作业吧~</p><hr /><p  class="detailed"><span class="subject">' +val.subject+'</span>（第<span  class="num">' +val.extendNum + '</span>次)<span class="datatime">截止&nbsp;&nbsp明天&nbsp;' +end+ '</span></span></p></div>'
	             })
	            $('.main').append(str1);
	            //新学案
	            $.each(datta2,function(i,val){
	                module.push(val.id);
	                mytime(val,'hh:mm');
	                str2 += '<div class="part module" id="'+val.id+'"><img src="../bundle/img/details_09.jpg"><span class="title">收到一份新学案</span><p>您好:老师发布了新学案，快提醒<span class="first_span">' +val.userName + '</span>预习吧</p><hr /><p  class="detailed"><span class="subject">' +val.subject + '</span>（第<span  class="num">' +val.extendNum + '</span>次)<span class="datatime">上课&nbsp;&nbsp&nbsp;<span class="time">' +end+ '</span></span></p></div>'
	            })
	            //新作业
	            $('.main').append(str2);
	            $.each(datta3,function(i,val){
	                newwork.push(val.id);
	                mytime(val,'hh:mm');
	                str3 += '<div class="part newwork" id="'+val.id+'"><img src="../bundle/img/details.jpg"><span class="title">收到一份新作业</span><p>您好:老师布置了新作业，快督促<span class="first_span">' +val.userName + '</span>作答吧~</p><hr /><p  class="detailed"><span class="subject">' +val.subject + '</span>（第<span  class="num">' +val.extendNum + '</span>次)<span class="datatime">截止&nbsp;&nbsp明天&nbsp;<span class="time">' + end+ '</span></span></p></div>';
	            })
	            $('.main').append(str3);
	        },
	        error: function (xhr, type) {
	            alert('Ajax error!')
	        }
	    });
	    //书写一个得到url地址的函数
	    function geturl(oriurl,key,val){
	       location.href=oriurl+'?'+key+'='+val;
	    }
	    var typestr = ['speak', 'homework', 'module', 'newwork'];
	    var typeval = [speak, homework, module, newwork];
	    var typeclass = ['.speak', '.homework', '.module', '.newwork'];
	    //clas代表选择器的类目typeclass
	    //val代表数组typeval
	    //str代表标识的变量typestr
	    function readed(clas, va, str) {
	         for (var i = 0; i < va.length; i++) {
	            //设置一个过期时间
	            wsCache.set('detailsnums', 1, {exp: new Date('2016 6 31')});
	            if (wsCache.get('detailsnums') == null){
	                $(clas).eq(i).children('.detailed').html('此信息已过期');
	            }
	        }
	        $(clas).click(function () {
	            //得到当前元素相对于原先集合的位置
	            var num=$(clas).index($(this));
	             //对work数组进行循环对当前点击的元素设置一个localStorage数值
	            for (var i = 0; i < va.length; i++) {
	                if (num == i){
	                    localStorage.setItem(str + i, va[i]);
	                 }
	            }
	            $(this).children('.detailed').html('此信息已被读取');
	           //点击的时候跳转页面
	            var url='';
	            //得到点击对象的id的值
	            var id=$(this).attr('id');
	            switch (clas)
	            {
	             case '.homework':
	                    url="http://localhost:63342/mfg-wechat/html/today-work.html";
	                    geturl(url,'workid',id);
	                    break;
	               case '.module':
	                    url="http://localhost:63342/mfg-wechat/html/prepare.html";
	                   geturl(url,'workid',id);
	                    break;
	            }
	
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
	    //localStorage.clear();
	});
	
	
	
	


/***/ },

/***/ 60:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjAzYzUzNzI0ODQ1ZDRmMzY4OTY/ZmZiNCoqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvdXRpbC91dGlsLmpzPzIyMjEqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvdG9kYXktc3R1ZHkuanMiLCJ3ZWJwYWNrOi8vLy4vZGVwL3dlYi1zdG9yYWdlLWNhY2hlLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSww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LFNBQVMsa0NBQWtDLGtCQUFrQixTQUFTLHFCQUFxQixPQUFPLFdBQVcsSUFBSSx5Q0FBeUMsU0FBUyxTQUFTLFNBQVMsdUNBQXVDLE1BQU0sS0FBSyxrQkFBa0IsV0FBVyx1QkFBdUIsRSIsImZpbGUiOiJ0b2RheS1zdHVkeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9tZmctd2VjaGF0L2J1bmRsZS9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDYwM2M1MzcyNDg0NWQ0ZjM2ODk2XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzIwLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgICAgIHNjcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkSGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcclxuICAgICAgICB2YXIgY0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICBpZiAoc1RvcCArIGNIZWlnaHQgPT0gZEhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIGdldFN1YmplY3ROYW1lOmZ1bmN0aW9uKGlkKXtcclxuICAgICAgICB2YXIgc3ViamVjdElkU3RyID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKGlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwMVwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLor63mlodcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDJcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5pWw5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjAzXCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuiLseivrVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwNFwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLniannkIZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDVcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5YyW5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA2XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuWcsOeQhlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwN1wiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLljoblj7JcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDhcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5pS/5rK7XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA5XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIueUn+eJqVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3RJZFN0cjtcclxuICAgIH0sXHJcbiAgICBnZXRTdGFnZVN0cjogZnVuY3Rpb24gKHN0YWdlSWQpIHtcclxuICAgICAgICB2YXIgc3RhZ2VJZFN0ciA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChzdGFnZUlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4XCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLlsI/lraZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY1wiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi5Yid5LitXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImdcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIumrmOS4rVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YWdlSWRTdHI7XHJcbiAgICB9LFxyXG4gICAgZ29fbWVudTpmdW5jdGlvbihjb25JZCl7XHJcbiAgICAgICAgdmFyIGNvbj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb25JZCk7XHJcbiAgICAgICAgdmFyIGltZz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVDb250cicpO1xyXG4gICAgICAgIGltZy5zcmM9Jy4uL2J1bmRsZS9pbWcvYm90dG9tLXl1YW4tc2hvdy5wbmcnO1xyXG4gICAgICAgIGNvbi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgIHZhciBtZW51Q29udHI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVDb250cicpO1xyXG4gICAgICAgIG1lbnVDb250ci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JyxtZW51Qm9keSxmYWxzZSk7XHJcbiAgICAgICAgZnVuY3Rpb24gbWVudUJvZHkoKXtcclxuICAgICAgICAgICAgdmFyIG1lbnVTaG93PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICBpZihtZW51U2hvdyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgdD1tZW51U2hvdy5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnN0dWR5LXNob3dcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYoIHQgPT0gJ2Rpc3BsYXk6IG5vbmU7Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNzdHVkeS1zaG93MVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudVNob3cuc3R5bGUuZGlzcGxheT0nYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL21lbnUyLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudVNob3cuc3R5bGUuZGlzcGxheT0nbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYz1cIi4uL2J1bmRsZS9pbWcvYm90dG9tLXl1YW4tc2hvdy5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2hvdz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVTaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCdkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5pbm5lckhUTUw9JzxhIGhyZWY9XCJhZnRlcmNsYXNzam9iLmh0bWxcIiBjbGFzcz1cImt0eGFcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcveHVlYW4ucG5nXCIvPjwvYT48YSBocmVmPVwid3JvbmctZ2F0aGVyLmh0bWxcIiBjbGFzcz1cImt4amxcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvamlqaW4ucG5nXCI8L2E+PGEgaHJlZj1cImhvbWV3b3JrLWxpc3QuaHRtbFwiICBjbGFzcz1cImN0ampcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvamlsdS5wbmdcIj48L2E+PGEgaHJlZj1cIm1vbnRod2Vhay5odG1sXCIgY2xhc3M9XCJteXJ4XCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3J1b3hpYW5nLnBuZ1wiPjwvYT4nO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ29fc3R1ZHlfc2hvdzpmdW5jdGlvbihpbWdsb2dvLHNob3dpZCxhcnIpe1xyXG4gICAgICAgICAgIHZhciBuPTE7XHJcbiAgICAgICAgICAgICQoaW1nbG9nbykucGFyZW50KFwiaDNcIikub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKG4gJTIgIT0wKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPD00O2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnN0dWR5LXNob3dcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJChpbWdsb2dvKS5wYXJlbnQoXCJoM1wiKS5pbmRleD1pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJChhcnJbaV0pLmF0dHIoXCJzcmNcIixcIi4uL2J1bmRsZS9pbWcvdG9wLWppYW50b3UucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJChzaG93aWQrXCJpbmRleFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykuYXR0cihcInNyY1wiLFwiLi4vYnVuZGxlL2ltZy9idG0ucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoc2hvd2lkKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykuYXR0cihcInNyY1wiLFwiLi4vYnVuZGxlL2ltZy90b3AtamlhbnRvdS5wbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChzaG93aWQpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSl9LFxyXG5cclxuICAgIHNob3dDb25maXJtOmZ1bmN0aW9uKG1zZyxjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICB2YXIgbGF5ZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBsYXllci5jbGFzc05hbWU9XCJsYXllclwiO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGF5ZXIpO1xyXG4gICAgICAgIHZhciBjb25maXJtPSc8ZGl2IGNsYXNzPVwicG9wY29uZmlybVwiPic7XHJcbiAgICAgICAgY29uZmlybSs9JzxkaXYgY2xhc3M9XCJ0aXRsZVwiPic7XHJcbiAgICAgICAgY29uZmlybSs9JzxpIGNsYXNzPVwiaWNvbi1jbG9zZVwiPjwvaT4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgPC9kaXY+JztcclxuICAgICAgICBjb25maXJtKz0nIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+Jyttc2crJyA8L2Rpdj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgPGRpdiBjbGFzcz1cImZvb3RcIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgIDxpbnB1dCBjbGFzcz1cInBvcGJ0biBidG5vayBjb2xvci1ncmVlblwiIHR5cGU9XCJidXR0b25cIiAgdmFsdWU9XCLnoa7lrppcIi8+JztcclxuICAgICAgICBjb25maXJtKz0nICA8aW5wdXQgY2xhc3M9XCJwb3BidG4gYnRuY2FuY2VsIGNvbG9yLWdyZWVuXCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5Y+W5raIXCIvPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgIDwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChjb25maXJtKTtcclxuICAgICAgICAvLyQoJy5wb3Bjb25maXJtJykuY3NzKCd0b3AnLChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0kKCcucG9wY29uZmlybScpLmhlaWdodCgpKS8yKTtcclxuICAgICAgICAkKFwiLmJ0bm9rXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAgICQoXCIuYnRub2tcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJChcIi5sYXllclwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJChcIi5wb3Bjb25maXJtXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5idG5jYW5jZWwsLmljb24tY2xvc2VcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJChcIi5sYXllclwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJChcIi5wb3Bjb25maXJtXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v5L+h5oGv5o+Q56S65qGGXHJcbiAgICBzaG93UG9wTXNnOmZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICB2YXIgaHRtbD0nPGRpdiBjbGFzcz1cInBvcG1zZ1wiPjxkaXYgY2xhc3M9XCJjb250ZW50XCI+Jyttc2crJzwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgJCgnLnBvcG1zZycpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgJCgnLnBvcG1zZycpLmNzcygnbGVmdCcsKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggIC0kKCcucG9wbXNnJykud2lkdGgoKSkvMik7XHJcbiAgICAgICAgJCgnLnBvcG1zZycpLmNzcygndG9wJywoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtJCgnLnBvcG1zZycpLmhlaWdodCgpKS8yKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7JCgnLnBvcG1zZycpLnJlbW92ZSgpO30sMTAwMCk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5bmjqXlj6N1cmwg5aaC6I635Y+Wb3BlbmlkICAgZ2V0QXBpVXJsKCdBY2NvdW50L0dldE9wZW5JRCcpXHJcbiAgICBnZXRBcGlVcmw6ZnVuY3Rpb24oYWN0aW9uKXtcclxuICAgICAgICAvL+e6v+S4i+a1i+ivlVxyXG4gICAgICAgdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk4Lyc7XHJcbiAgICAgICAgLy/nur/kuIrmtYvor5VcclxuICAgICAgIC8vdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk3Lyc7XHJcbiAgICAgICAvLyB2YXIgYmFzZXVybD0naHR0cDovL2xvY2FsaG9zdDo0Njk1MS8nO1xyXG4gICAgICAgIHJldHVybiBiYXNldXJsK2FjdGlvbjtcclxuICAgIH0sXHJcbiAgICAvL+iwg+eUqGFwaeaIkOWKn+WQju+8jOWFiOiwg+eUqOatpOaWueazle+8jOWIpOaWreeUqOaIt+aYr+WQpuW3sue7j+e7keWumu+8jOiLpeacque7keWumu+8jOi3s+i9rOWIsOe7keWumumhtVxyXG4gICAgY2hlY2tCaW5kOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGlmKCFkYXRhLk9LKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLkNvZGUgPT0gMSB8fCBkYXRhLkNvZGUgPT0gMiB8fCBkYXRhLkNvZGUgPT0gNCB8fCBkYXRhLkNvZGUgPT0gMTEgfHwgZGF0YS5Db2RlID09IDEyIHx8IGRhdGEuQ29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImJpbmRpbmZvLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlk9wZW5JZFxyXG4gICAgZ2V0T3BlbklkOmZ1bmN0aW9uKGFwcGlkLGFwcHNlY3JldCxjb2RlKXtcclxudmFyIG9wZW5pZDtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGFzeW5jOmZhbHNlLFxyXG4gICAgICAgICAgICB1cmw6dGhpcy5nZXRBcGlVcmwoJ0FjY291bnQvR2V0T3BlbklEJyksXHJcbiAgICAgICAgICAgIC8vIGRhdGEgdG8gYmUgYWRkZWQgdG8gcXVlcnkgc3RyaW5nOlxyXG4gICAgICAgICAgICBkYXRhOiB7QXBwSUQ6YXBwaWQsQXBwU2VjcmV0OmFwcHNlY3JldCxDb2RlOmNvZGV9LFxyXG4gICAgICAgICAgICAvLyB0eXBlIG9mIGRhdGEgd2UgYXJlIGV4cGVjdGluZyBpbiByZXR1cm46XHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIC8vdGltZW91dDogMzAwLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5PSylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5pZD1kYXRhLklEO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0FqYXggZXJyb3IhJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9wZW5pZDtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlnVybOWPguaVsFxyXG4gICAgZ2V0UXVlcnlTdHJpbmc6ZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKF58JilcIiArIG5hbWUgKyBcIj0oW14mXSopKCZ8JClcIiwgXCJpXCIpO1xyXG4gICAgdmFyIHIgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xyXG4gICAgaWYgKHIgIT0gbnVsbCkgcmV0dXJuIHVuZXNjYXBlKGRlY29kZVVSSShyWzJdKSk7IHJldHVybiBudWxsO1xyXG59LFxyXG5cclxuICAgIGRhdGVGb3JtYXQ6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCl7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICB2YXIgbWFwID0ge1xyXG4gICAgICAgICAgICBcIllcIjogZGF0ZS5nZXRZZWFyKCksXHJcbiAgICAgICAgICAgIFwiTVwiOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vVxyXG4gICAgICAgICAgICBcImRcIjogZGF0ZS5nZXREYXRlKCksIC8v5pelXHJcbiAgICAgICAgICAgIFwiaFwiOiBkYXRlLmdldEhvdXJzKCksIC8v5bCP5pe2XHJcbiAgICAgICAgICAgIFwibVwiOiBkYXRlLmdldE1pbnV0ZXMoKSwgLy/liIZcclxuICAgICAgICAgICAgXCJzXCI6IGRhdGUuZ2V0U2Vjb25kcygpLCAvL+enklxyXG4gICAgICAgICAgICBcInFcIjogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqZcclxuICAgICAgICAgICAgXCJTXCI6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLy/mr6vnp5JcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC8oW3lNZGhtc3FTXSkrL2csIGZ1bmN0aW9uIChhbGwsIHQpIHtcclxuICAgICAgICAgICAgdmFyIHYgPSBtYXBbdF07XHJcbiAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbGwubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSAnMCcgKyB2O1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSB2LnN1YnN0cih2Lmxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodCA9PT0gJ3knKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIGFsbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhbGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgIH0sXHJcbiAgICAvL+WkhOeQhuivlemimOWFrOW8jyBtYXRoamF4XHJcbiAgICBpbml0TWF0aEpheE9iajpmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBNYXRoSmF4Lkh1Yi5RdWV1ZShbXCJUeXBlc2V0XCIsIE1hdGhKYXguSHViLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCldKTtcclxuICAgIH0sXHJcbiAgICBnZXRMb2NhbFRpbWU6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludCh2YWwucmVwbGFjZShcIi9EYXRlKFwiLCBcIlwiKS5yZXBsYWNlKFwiKS9cIiwgXCJcIiksIDEwKSk7XHJcbiAgICAgICAgICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxIDwgMTAgPyBcIjBcIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKSA6IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0RGF0ZSgpIDogZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldEhvdXJzKCkgOiBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIHZhciBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKSA6IGRhdGUuZ2V0TWludXRlcygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHllYXIgKyBcIi1cIiArIG1vbnRoICsgXCItXCIgKyBjdXJyZW50RGF0ZSArIFwiIFwiICsgaG91cnMgKyBcIjpcIiArIG1pbnV0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC91dGlsL3V0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA3IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTcgMTggMTkgMjBcbiAqKi8iLCIkKGZ1bmN0aW9uICgpIHtcclxuICAgIC8v5byV5YWl5pe26Ze06K6+572u55qE5o+S5Lu2XHJcbiAgICB2YXIgV2ViU3RvcmFnZUNhY2hlID0gcmVxdWlyZSgnd2ViLXN0b3JhZ2UtY2FjaGUubWluLmpzJyk7XHJcbiAgICB2YXIgaG9tZSA9IHJlcXVpcmUoXCJ1dGlsL3V0aWxcIik7XHJcbiAgICAvL3ZhciBub2RlZGF0YT1yZXF1aXJlKCdjb21wb25lbnQvbm8tZGF0YS9uby1kYXRhLmpzJyk7XHJcbiAgIC8vIG5vZGVkYXRhLmluaXQoJ21haW4nLCflr7nkuI3otbfvvIzmlbDmja7mmoLml7bmnKrliqDovb0nKTtcclxuICAgLy8gbm9kZWRhdGEubW9kdWxlLmV4cG9ydHMuaW5pdChkb20sJ+ebruWJjeaXoOaVsOaNricpXHJcbiAgICB2YXIgdG9keXVybCA9IGhvbWUuZ2V0QXBpVXJsKCdIb21lU2Nob29sQ29udGFjdC9Ub2RheVN0dWR5U3RhdHVzL0dldFRvZGF5U3R1ZHlTdGF0dXNMaXN0Jyk7XHJcbiAgICBjb25zb2xlLmxvZyh0b2R5dXJsKTtcclxuICAgIC8v5b6X5omTQXBwSUTlkoxvcGVuaWRcclxuICAgIHZhciBhcHBpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FwcGlkJyk7XHJcbiAgICB2YXIgb3BlbmlkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnb3BlbmlkJyk7XHJcbiAgICBjb25zb2xlLmxvZyhhcHBpZCk7XHJcbiAgICBjb25zb2xlLmxvZyhvcGVuaWQpO1xyXG4gICAgdmFyIHdzQ2FjaGUgPSBuZXcgV2ViU3RvcmFnZUNhY2hlKHtcclxuICAgICAgICBzdG9yYWdlOiAnbG9jYWxTdG9yYWdlJ1xyXG4gICAgfSk7XHJcbiAgICAvL+S5puWGmeaVsOe7hOWtmOWCqOWvueW6lOexu+eahGlkXHJcbiAgICB2YXIgc3BlYWsgPSBbXTtcclxuICAgIHZhciBob21ld29yayA9IFtdO1xyXG4gICAgdmFyIG1vZHVsZSA9IFtdO1xyXG4gICAgdmFyIG5ld3dvcmsgPSBbXTtcclxuICAgIC8v6K+35rGC5pWw5o2uXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgdXJsOiB0b2R5dXJsLFxyXG4gICAgICAgIC8vIGRhdGEgdG8gYmUgYWRkZWQgdG8gcXVlcnkgc3RyaW5nOlxyXG4gICAgICAgIGRhdGE6IHtBcHBJRDogYXBwaWQsIG9wZW5JRDogb3BlbmlkfSxcclxuICAgICAgICAvLyB0eXBlIG9mIGRhdGEgd2UgYXJlIGV4cGVjdGluZyBpbiByZXR1cm46XHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAvL3RpbWVvdXQ6IDMwMCxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvL+W8gOivvuaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGEgPSBkYXRhLk4uSGF2ZUNsYXNzQWxlcnRMaXN0O1xyXG4gICAgICAgICAgICAvL+S6pOS9nOS4muaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGExID0gZGF0YS5OLlN1Ym1pdEhvbWVXb3JrQWxlcnRMaXN0O1xyXG4gICAgICAgICAgICAvL+WtpuahiOaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGEyID0gZGF0YS5OLk5ld1RlYWNoUGxhbkFsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/mlrDkvZzkuJrmj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhMyA9IGRhdGEuTi5OZXdIb21lV29ya0FsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/ojrflvpfml7bpl7TmiKrlj5bnmoTlh73mlbBcclxuICAgICAgICAgICAgdmFyIHN0YXJ0PScnO1xyXG4gICAgICAgICAgICB2YXIgZW5kPScnXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG15dGltZSh2YWwsc3R5bGUpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZz0gKHZhbC5kYXRlVGltZXMpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nWzBdLHN0eWxlICk7Ly8naGg6bW0nXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMSA9ICh2YWwuZW5kRGF0ZVRpbWUpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgZW5kPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzFbMF0sc3R5bGUpOy8vICdoaDptbSdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgc3RyID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBzdHIxID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBzdHIyID0gJyc7XHJcbiAgICAgICAgICAgIHZhciBzdHIzID0gJyc7XHJcbiAgICAgICAgICAgIC8v5byA6K6y5LqGXHJcbiAgICAgICAgICAgICQuZWFjaChkYXR0YSxmdW5jdGlvbihpLHZhbCkge1xyXG4gICAgICAgICAgICAgICAgc3BlYWsucHVzaCh2YWwuaWQpO1xyXG4gICAgICAgICAgICAgICAgbXl0aW1lKHZhbCwnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgICBzdHIgKz0gJzxkaXYgY2xhc3M9XCJwYXJ0IHNwZWFrXCIgaWQ9XCInK3ZhbC5pZCsnXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2RldGFpbHNfMDMucG5nXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPuW8gOiusuWVpjwvc3Bhbj48cD7mgqjlpb06PHNwYW4gY2xhc3M9XCJmaXJzdF9zcGFuXCI+JyArIHZhbC51c2VyTmFtZSArICc8L3NwYW4+5LuK5aSp5pyJ6K++77yM5b+r5o+Q6YaS5LuW5LiK6K++5ZCnfjwvcD48aHIgLz48cCAgY2xhc3M9XCJkZXRhaWxlZFwiPjxzcGFuIGNsYXNzPVwic3ViamVjdFwiPicgKyB2YWwuc3ViamVjdCArICc8L3NwYW4+77yI56ysPHNwYW4gIGNsYXNzPVwibnVtXCI+JyArIHZhbC5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+JyArIHN0YXJ0KyAnPC9zcGFuPn48c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+JyArIGVuZCsgJzwvc3Bhbj48L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyKTtcclxuICAgICAgICAgICAgLy/lv6vkuqTkvZzkuJrkuoZcclxuICAgICAgICAgICAgJC5lYWNoKGRhdHRhMSxmdW5jdGlvbihpLHZhbCkge1xyXG4gICAgICAgICAgICAgICAgaG9tZXdvcmsucHVzaCh2YWwuaWQpO1xyXG4gICAgICAgICAgICAgICAgbXl0aW1lKHZhbCwneXl5eTpNTTpkZDpoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgc3RyMSArPSAnPGRpdiBjbGFzcz1cInBhcnQgaG9tZXdvcmtcIiBpZD1cIicrdmFsLmlkKydcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlsc18wNi5qcGdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5b+r5Lqk5L2c5Lia5ZWmPC9zcGFuPjxwPuaCqOWlvTo8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICt2YWwudXNlck5hbWUgKyAnPC9zcGFuPui/mOacieacquS6pOS9nOS4mu+8jOW/q+edo+S/g+S7luS6pOS9nOS4muWQp348L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICt2YWwuc3ViamVjdCsnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgK3ZhbC5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+5oiq5q2iJm5ic3A7Jm5ic3DmmI7lpKkmbmJzcDsnICtlbmQrICc8L3NwYW4+PC9zcGFuPjwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkKCcubWFpbicpLmFwcGVuZChzdHIxKTtcclxuICAgICAgICAgICAgLy/mlrDlrabmoYhcclxuICAgICAgICAgICAgJC5lYWNoKGRhdHRhMixmdW5jdGlvbihpLHZhbCl7XHJcbiAgICAgICAgICAgICAgICBtb2R1bGUucHVzaCh2YWwuaWQpO1xyXG4gICAgICAgICAgICAgICAgbXl0aW1lKHZhbCwnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHN0cjIgKz0gJzxkaXYgY2xhc3M9XCJwYXJ0IG1vZHVsZVwiIGlkPVwiJyt2YWwuaWQrJ1wiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9kZXRhaWxzXzA5LmpwZ1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj7mlLbliLDkuIDku73mlrDlrabmoYg8L3NwYW4+PHA+5oKo5aW9OuiAgeW4iOWPkeW4g+S6huaWsOWtpuahiO+8jOW/q+aPkOmGkjxzcGFuIGNsYXNzPVwiZmlyc3Rfc3BhblwiPicgK3ZhbC51c2VyTmFtZSArICc8L3NwYW4+6aKE5Lmg5ZCnPC9wPjxociAvPjxwICBjbGFzcz1cImRldGFpbGVkXCI+PHNwYW4gY2xhc3M9XCJzdWJqZWN0XCI+JyArdmFsLnN1YmplY3QgKyAnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgK3ZhbC5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+5LiK6K++Jm5ic3A7Jm5ic3AmbmJzcDs8c3BhbiBjbGFzcz1cInRpbWVcIj4nICtlbmQrICc8L3NwYW4+PC9zcGFuPjwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8v5paw5L2c5LiaXHJcbiAgICAgICAgICAgICQoJy5tYWluJykuYXBwZW5kKHN0cjIpO1xyXG4gICAgICAgICAgICAkLmVhY2goZGF0dGEzLGZ1bmN0aW9uKGksdmFsKXtcclxuICAgICAgICAgICAgICAgIG5ld3dvcmsucHVzaCh2YWwuaWQpO1xyXG4gICAgICAgICAgICAgICAgbXl0aW1lKHZhbCwnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHN0cjMgKz0gJzxkaXYgY2xhc3M9XCJwYXJ0IG5ld3dvcmtcIiBpZD1cIicrdmFsLmlkKydcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlscy5qcGdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5pS25Yiw5LiA5Lu95paw5L2c5LiaPC9zcGFuPjxwPuaCqOWlvTrogIHluIjluIPnva7kuobmlrDkvZzkuJrvvIzlv6vnnaPkv4M8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICt2YWwudXNlck5hbWUgKyAnPC9zcGFuPuS9nOetlOWQp348L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICt2YWwuc3ViamVjdCArICc8L3NwYW4+77yI56ysPHNwYW4gIGNsYXNzPVwibnVtXCI+JyArdmFsLmV4dGVuZE51bSArICc8L3NwYW4+5qyhKTxzcGFuIGNsYXNzPVwiZGF0YXRpbWVcIj7miKrmraImbmJzcDsmbmJzcOaYjuWkqSZuYnNwOzxzcGFuIGNsYXNzPVwidGltZVwiPicgKyBlbmQrICc8L3NwYW4+PC9zcGFuPjwvcD48L2Rpdj4nO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkKCcubWFpbicpLmFwcGVuZChzdHIzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCB0eXBlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdBamF4IGVycm9yIScpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL+S5puWGmeS4gOS4quW+l+WIsHVybOWcsOWdgOeahOWHveaVsFxyXG4gICAgZnVuY3Rpb24gZ2V0dXJsKG9yaXVybCxrZXksdmFsKXtcclxuICAgICAgIGxvY2F0aW9uLmhyZWY9b3JpdXJsKyc/JytrZXkrJz0nK3ZhbDtcclxuICAgIH1cclxuICAgIHZhciB0eXBlc3RyID0gWydzcGVhaycsICdob21ld29yaycsICdtb2R1bGUnLCAnbmV3d29yayddO1xyXG4gICAgdmFyIHR5cGV2YWwgPSBbc3BlYWssIGhvbWV3b3JrLCBtb2R1bGUsIG5ld3dvcmtdO1xyXG4gICAgdmFyIHR5cGVjbGFzcyA9IFsnLnNwZWFrJywgJy5ob21ld29yaycsICcubW9kdWxlJywgJy5uZXd3b3JrJ107XHJcbiAgICAvL2NsYXPku6PooajpgInmi6nlmajnmoTnsbvnm650eXBlY2xhc3NcclxuICAgIC8vdmFs5Luj6KGo5pWw57uEdHlwZXZhbFxyXG4gICAgLy9zdHLku6PooajmoIfor4bnmoTlj5jph490eXBlc3RyXHJcbiAgICBmdW5jdGlvbiByZWFkZWQoY2xhcywgdmEsIHN0cikge1xyXG4gICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8v6K6+572u5LiA5Liq6L+H5pyf5pe26Ze0XHJcbiAgICAgICAgICAgIHdzQ2FjaGUuc2V0KCdkZXRhaWxzbnVtcycsIDEsIHtleHA6IG5ldyBEYXRlKCcyMDE2IDYgMzEnKX0pO1xyXG4gICAgICAgICAgICBpZiAod3NDYWNoZS5nZXQoJ2RldGFpbHNudW1zJykgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAkKGNsYXMpLmVxKGkpLmNoaWxkcmVuKCcuZGV0YWlsZWQnKS5odG1sKCfmraTkv6Hmga/lt7Lov4fmnJ8nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAkKGNsYXMpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy/lvpfliLDlvZPliY3lhYPntKDnm7jlr7nkuo7ljp/lhYjpm4blkIjnmoTkvY3nva5cclxuICAgICAgICAgICAgdmFyIG51bT0kKGNsYXMpLmluZGV4KCQodGhpcykpO1xyXG4gICAgICAgICAgICAgLy/lr7l3b3Jr5pWw57uE6L+b6KGM5b6q546v5a+55b2T5YmN54K55Ye755qE5YWD57Sg6K6+572u5LiA5LiqbG9jYWxTdG9yYWdl5pWw5YC8XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChudW0gPT0gaSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RyICsgaSwgdmFbaV0pO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCcuZGV0YWlsZWQnKS5odG1sKCfmraTkv6Hmga/lt7Looqvor7vlj5YnKTtcclxuICAgICAgICAgICAvL+eCueWHu+eahOaXtuWAmei3s+i9rOmhtemdolxyXG4gICAgICAgICAgICB2YXIgdXJsPScnO1xyXG4gICAgICAgICAgICAvL+W+l+WIsOeCueWHu+WvueixoeeahGlk55qE5YC8XHJcbiAgICAgICAgICAgIHZhciBpZD0kKHRoaXMpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY2xhcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgY2FzZSAnLmhvbWV3b3JrJzpcclxuICAgICAgICAgICAgICAgICAgICB1cmw9XCJodHRwOi8vbG9jYWxob3N0OjYzMzQyL21mZy13ZWNoYXQvaHRtbC90b2RheS13b3JrLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgICAgICBnZXR1cmwodXJsLCd3b3JraWQnLGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgY2FzZSAnLm1vZHVsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsPVwiaHR0cDovL2xvY2FsaG9zdDo2MzM0Mi9tZmctd2VjaGF0L2h0bWwvcHJlcGFyZS5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICAgICBnZXR1cmwodXJsLCd3b3JraWQnLGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+W+queOr+S+v+WIqeaJgOacieeahOaVsOWAvO+8jOWmguaenOeCueWHu+S5i+WQjuWwhuS/oeaBr+iuvue9ruaIkOW3suivu1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgIC8v5b6X5Yiw5YWD57Sg55qEaWRcclxuICAgICAgICAgICAgdmFyIG15SWQ9JChjbGFzKS5lcShpKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgIGlmIChteUlkPT1sb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdHIgKyBpKSkge1xyXG4gICAgICAgICAgICAgICAgJChjbGFzKS5lcShpKS5jaGlsZHJlbignLmRldGFpbGVkJykuaHRtbCgn5q2k5L+h5oGv5bey6KKr6K+75Y+WJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgIH1cclxuICAgIC8v5b6q546v55qE5L6/5Yip5LiK6Z2i55qE5Ye95pWwXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIHJlYWRlZCh0eXBlY2xhc3NbaV0sIHR5cGV2YWxbaV0sIHR5cGVzdHJbaV0pO1xyXG4gICAgfVxyXG4gICAgLy9sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvdG9kYXktc3R1ZHkuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAxN1xuICoqLyIsIi8qIVxyXG4gd2ViLXN0b3JhZ2UtY2FjaGUgLS0gQWRkZWQgYGV4cGlyZXNgIGF0dHJpYnV0ZSBhbmQgc2VyaWFsaXplIGRhdGEgd2l0aCBgSlNPTi5wYXJzZWAgZm9yIHRoZSBsb2NhbFN0b3JhZ2UgYW5kIHNlc3Npb25TdG9yYWdlLlxyXG4gVmVyc2lvbiAxLjAuMFxyXG4gaHR0cHM6Ly9naXRodWIuY29tL1dRVGVhbS93ZWItc3RvcmFnZS1jYWNoZVxyXG4gKGMpIDIwMTMtMjAxNiBXUVRlYW0sIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4hZnVuY3Rpb24oYSxiKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGIpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWIoKTphLldlYlN0b3JhZ2VDYWNoZT1iKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBhKGEsYil7Zm9yKHZhciBjIGluIGIpYVtjXT1iW2NdO3JldHVybiBhfWZ1bmN0aW9uIGIoYSl7dmFyIGI9ITE7aWYoYSYmYS5zZXRJdGVtKXtiPSEwO3ZhciBjPVwiX19cIitNYXRoLnJvdW5kKDFlNypNYXRoLnJhbmRvbSgpKTt0cnl7YS5zZXRJdGVtKGMsYyksYS5yZW1vdmVJdGVtKGMpfWNhdGNoKGQpe2I9ITF9fXJldHVybiBifWZ1bmN0aW9uIGMoYSl7dmFyIGI9dHlwZW9mIGE7cmV0dXJuXCJzdHJpbmdcIj09PWImJndpbmRvd1thXWluc3RhbmNlb2YgU3RvcmFnZT93aW5kb3dbYV06YX1mdW5jdGlvbiBkKGEpe3JldHVyblwiW29iamVjdCBEYXRlXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpJiYhaXNOYU4oYS5nZXRUaW1lKCkpfWZ1bmN0aW9uIGUoYSxiKXtpZihiPWJ8fG5ldyBEYXRlLFwibnVtYmVyXCI9PXR5cGVvZiBhP2E9YT09PTEvMD9sOm5ldyBEYXRlKGIuZ2V0VGltZSgpKzFlMyphKTpcInN0cmluZ1wiPT10eXBlb2YgYSYmKGE9bmV3IERhdGUoYSkpLGEmJiFkKGEpKXRocm93IG5ldyBFcnJvcihcImBleHBpcmVzYCBwYXJhbWV0ZXIgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhIHZhbGlkIERhdGUgaW5zdGFuY2VcIik7cmV0dXJuIGF9ZnVuY3Rpb24gZihhKXt2YXIgYj0hMTtpZihhKWlmKGEuY29kZSlzd2l0Y2goYS5jb2RlKXtjYXNlIDIyOmI9ITA7YnJlYWs7Y2FzZSAxMDE0OlwiTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRURcIj09PWEubmFtZSYmKGI9ITApfWVsc2UtMjE0NzAyNDg4Mj09PWEubnVtYmVyJiYoYj0hMCk7cmV0dXJuIGJ9ZnVuY3Rpb24gZyhhLGIpe3RoaXMuYz0obmV3IERhdGUpLmdldFRpbWUoKSxiPWJ8fGw7dmFyIGM9ZShiKTt0aGlzLmU9Yy5nZXRUaW1lKCksdGhpcy52PWF9ZnVuY3Rpb24gaChhKXtyZXR1cm4gYSYmXCJjXCJpbiBhJiZcImVcImluIGEmJlwidlwiaW4gYT8hMDohMX1mdW5jdGlvbiBpKGEpe3ZhciBiPShuZXcgRGF0ZSkuZ2V0VGltZSgpO3JldHVybiBiPGEuZX1mdW5jdGlvbiBqKGEpe3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoY29uc29sZS53YXJuKGErXCIgdXNlZCBhcyBhIGtleSwgYnV0IGl0IGlzIG5vdCBhIHN0cmluZy5cIiksYT1TdHJpbmcoYSkpLGF9ZnVuY3Rpb24gayhkKXt2YXIgZT17c3RvcmFnZTpcImxvY2FsU3RvcmFnZVwiLGV4cDoxLzB9LGY9YShlLGQpLGc9YyhmLnN0b3JhZ2UpLGg9YihnKTt0aGlzLmlzU3VwcG9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGh9LGg/KHRoaXMuc3RvcmFnZT1nLHRoaXMucXVvdGFFeGNlZWRIYW5kbGVyPWZ1bmN0aW9uKGEsYixjKXtpZihjb25zb2xlLndhcm4oXCJRdW90YSBleGNlZWRlZCFcIiksYyYmYy5mb3JjZT09PSEwKXt2YXIgZD10aGlzLmRlbGV0ZUFsbEV4cGlyZXMoKTtjb25zb2xlLndhcm4oXCJkZWxldGUgYWxsIGV4cGlyZXMgQ2FjaGVJdGVtIDogW1wiK2QrXCJdIGFuZCB0cnkgZXhlY3V0ZSBgc2V0YCBtZXRob2QgYWdhaW4hXCIpO3RyeXtjLmZvcmNlPSExLHRoaXMuc2V0KGEsYixjKX1jYXRjaChlKXtjb25zb2xlLndhcm4oZSl9fX0pOmEodGhpcyxuKX12YXIgbD1uZXcgRGF0ZShcIkZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgVVRDXCIpLG09e3NlcmlhbGl6ZTpmdW5jdGlvbihhKXtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSl9LGRlc2VyaWFsaXplOmZ1bmN0aW9uKGEpe3JldHVybiBhJiZKU09OLnBhcnNlKGEpfX0sbj17c2V0OmZ1bmN0aW9uKCl7fSxnZXQ6ZnVuY3Rpb24oKXt9LFwiZGVsZXRlXCI6ZnVuY3Rpb24oKXt9LGRlbGV0ZUFsbEV4cGlyZXM6ZnVuY3Rpb24oKXt9LGNsZWFyOmZ1bmN0aW9uKCl7fSxhZGQ6ZnVuY3Rpb24oKXt9LHJlcGxhY2U6ZnVuY3Rpb24oKXt9LHRvdWNoOmZ1bmN0aW9uKCl7fX0sbz17c2V0OmZ1bmN0aW9uKGIsYyxkKXtpZihiPWooYiksZD1hKHtmb3JjZTohMH0sZCksdm9pZCAwPT09YylyZXR1cm4gdGhpc1tcImRlbGV0ZVwiXShiKTt2YXIgZT1tLnNlcmlhbGl6ZShjKSxoPW5ldyBnKGUsZC5leHApO3RyeXt0aGlzLnN0b3JhZ2Uuc2V0SXRlbShiLG0uc2VyaWFsaXplKGgpKX1jYXRjaChpKXtmKGkpP3RoaXMucXVvdGFFeGNlZWRIYW5kbGVyKGIsZSxkLGkpOmNvbnNvbGUuZXJyb3IoaSl9cmV0dXJuIGN9LGdldDpmdW5jdGlvbihhKXthPWooYSk7dmFyIGI9bnVsbDt0cnl7Yj1tLmRlc2VyaWFsaXplKHRoaXMuc3RvcmFnZS5nZXRJdGVtKGEpKX1jYXRjaChjKXtyZXR1cm4gbnVsbH1pZihoKGIpKXtpZihpKGIpKXt2YXIgZD1iLnY7cmV0dXJuIG0uZGVzZXJpYWxpemUoZCl9dGhpc1tcImRlbGV0ZVwiXShhKX1yZXR1cm4gbnVsbH0sXCJkZWxldGVcIjpmdW5jdGlvbihhKXtyZXR1cm4gYT1qKGEpLHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGEpLGF9LGRlbGV0ZUFsbEV4cGlyZXM6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5zdG9yYWdlLmxlbmd0aCxiPVtdLGM9dGhpcyxkPTA7YT5kO2QrKyl7dmFyIGU9dGhpcy5zdG9yYWdlLmtleShkKSxmPW51bGw7dHJ5e2Y9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShlKSl9Y2F0Y2goZyl7fWlmKG51bGwhPT1mJiZ2b2lkIDAhPT1mLmUpe3ZhciBoPShuZXcgRGF0ZSkuZ2V0VGltZSgpO2g+PWYuZSYmYi5wdXNoKGUpfX1yZXR1cm4gYi5mb3JFYWNoKGZ1bmN0aW9uKGEpe2NbXCJkZWxldGVcIl0oYSl9KSxifSxjbGVhcjpmdW5jdGlvbigpe3RoaXMuc3RvcmFnZS5jbGVhcigpfSxhZGQ6ZnVuY3Rpb24oYixjLGQpe2I9aihiKSxkPWEoe2ZvcmNlOiEwfSxkKTt0cnl7dmFyIGU9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShiKSk7aWYoIWgoZSl8fCFpKGUpKXJldHVybiB0aGlzLnNldChiLGMsZCksITB9Y2F0Y2goZil7cmV0dXJuIHRoaXMuc2V0KGIsYyxkKSwhMH1yZXR1cm4hMX0scmVwbGFjZTpmdW5jdGlvbihhLGIsYyl7YT1qKGEpO3ZhciBkPW51bGw7dHJ5e2Q9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShhKSl9Y2F0Y2goZSl7cmV0dXJuITF9aWYoaChkKSl7aWYoaShkKSlyZXR1cm4gdGhpcy5zZXQoYSxiLGMpLCEwO3RoaXNbXCJkZWxldGVcIl0oYSl9cmV0dXJuITF9LHRvdWNoOmZ1bmN0aW9uKGEsYil7YT1qKGEpO3ZhciBjPW51bGw7dHJ5e2M9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShhKSl9Y2F0Y2goZCl7cmV0dXJuITF9aWYoaChjKSl7aWYoaShjKSlyZXR1cm4gdGhpcy5zZXQoYSx0aGlzLmdldChhKSx7ZXhwOmJ9KSwhMDt0aGlzW1wiZGVsZXRlXCJdKGEpfXJldHVybiExfX07cmV0dXJuIGsucHJvdG90eXBlPW8sa30pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvd2ViLXN0b3JhZ2UtY2FjaGUubWluLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTdcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9