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
	       //var baseurl='http://192.168.180.15:8998/';
	        //线上测试
	       var baseurl='http://192.168.180.15:8997/';
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
	            var end='';
	            //设置得到的时间的变量
	            var gotTime='';
	            //得到今天的时间的变量
	            var nowTime='';
	            //
	            function mytime(val,style){
	                var string= (val.dateTimes).match((/(\d)+/));
	                start= home.dateFormat(+string[0],style );//'hh:mm'
	                var string1 = (val.endDateTime).match((/(\d)+/));
	                end= home.dateFormat(+string1[0],style);// 'hh:mm'
	                nowTimes=home.dateFormat(+string1[0],'dd');
	            };
	            //nowTimes=home.dateFormat(+new Date()+24*60*60*1000,'dd')
	            //书写一个进行时间比较的函数
	          var comparetime=function(gettime){
	               gotTime=home.dateFormat(+new Date(),'dd');
	                var valtime=parseInt(gettime)-parseInt(gotTime);
	                if(valtime==0){
	                   return  '今天';
	                }else if(valtime==1){
	                   return '明天';
	                }else{
	                    return '日期有误';
	                }
	            }
	            var str = '';
	            var str1 = '';
	            var str2 = '';
	            var str3 = '';
	            //开讲了
	            $.each(datta,function(i,val) {
	                speak.push(val.id);
	                mytime(val,'hh:mm');
	                var courseName = home.getSubjectName(val.subject);
	                str += '<div class="part speak" id="'+val.id+'"><img src="../bundle/img/details_03.png"><span class="title">开讲啦</span><p>您好:<span class="first_span">' + val.userName + '</span>今天有课，快提醒他上课吧~</p><hr /><p  class="detailed"><span class="subject">' + courseName + '</span>（第<span  class="num">' + val.extendNum + '</span>次)<span class="datatime">' + start+ '</span>~<span class="datatime">' + end+ '</span></p></div>'
	             })
	            $('.main').append(str);
	            //快交作业了
	            $.each(datta1,function(i,val) {
	                homework.push(val.id);
	                mytime(val,'hh:mm');
	                comparetime(nowTimes);
	                var courseName = home.getSubjectName(val.subject);
	                str1 += '<div class="part homework" id="'+val.id+'"><img src="../bundle/img/details_06.jpg"><span class="title">快交作业啦</span><p>您好:<span class="first_span">' +val.userName + '</span>还有未交作业，快督促他交作业吧~</p><hr /><p  class="detailed"><span class="subject">' +courseName+'</span>（第<span  class="num">' +val.extendNum + '</span>次)<span class="datatime">截止&nbsp;&nbsp;<span>'+comparetime(nowTimes)+'</span>&nbsp;' +end+ '</span></span></p></div>'
	             })
	            $('.main').append(str1);
	            //新学案
	            $.each(datta2,function(i,val){
	                module.push(val.id);
	                mytime(val,'MM月dd日');
	                var courseName = home.getSubjectName(val.subject);
	                str2 += '<div class="part module" id="'+val.id+'"><img src="../bundle/img/details_09.jpg"><span class="title">收到一份新学案</span><p>您好:老师发布了新学案，快提醒<span class="first_span">' +val.userName + '</span>预习吧</p><hr /><p  class="detailed"><span class="subject">' +courseName+ '</span>（第<span  class="num">' +val.extendNum + '</span>次)<span class="datatime">上课&nbsp;&nbsp&nbsp;<span class="time">' +end+ '</span></span></p></div>'
	            })
	            //新作业
	            $('.main').append(str2);
	            $.each(datta3,function(i,val){
	                newwork.push(val.id);
	                mytime(val,'hh:mm');
	                comparetime(nowTimes);
	                var courseName = home.getSubjectName(val.subject);
	                str3 += '<div class="part newwork" id="'+val.id+'"><img src="../bundle/img/details.jpg"><span class="title">收到一份新作业</span><p>您好:老师布置了新作业，快督促<span class="first_span">' +val.userName + '</span>作答吧~</p><hr /><p  class="detailed"><span class="subject">' +courseName+ '</span>（第<span  class="num">' +val.extendNum + '</span>次)<span class="datatime">截止&nbsp;&nbsp<span>'+comparetime(nowTimes)+'</span>&nbsp;<span class="time">' + end+ '</span></span></p></div>';
	            })
	            $('.main').append(str3);
	
	        },
	        error: function (xhr, type) {
	            alert('Ajax error!')
	        }
	    });
	
	    //将一个将时间存到localStrong里面存储过期时间进行数据清除
	    var limitTime= home.dateFormat(+new Date()+24*60*60*1000,'yyyy MM dd');
	    wsCache.set('limitTime',1, {exp :new Date(limitTime)});
	    if(localStorage.getItem('limitTime')==null){
	       localStorage.clear();
	    }
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
	                    url="mfg-wechat/html/today-work.html";
	                    geturl(url,'workid',id);
	                    break;
	               case '.module':
	                    url="mfg-wechat/html/prepare.html";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgY2QxZjg2NDlmZGE3MjAxMTM0ZDM/ZDBjZCoqKioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL3V0aWwvdXRpbC5qcz8yMjIxKioqKioqKioqKioqIiwid2VicGFjazovLy8uL2pzL3RvZGF5LXN0dWR5LmpzIiwid2VicGFjazovLy8uL2RlcC93ZWItc3RvcmFnZS1jYWNoZS5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FB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QTJCLG1CQUFtQiw2QkFBNkIsZUFBZSxJQUFJLGtCQUFrQixxQkFBcUIscUJBQXFCLFlBQVksU0FBUyxJQUFJLElBQUksNkNBQTZDLDBDQUEwQyxTQUFTLDBCQUEwQixTQUFTLHlCQUF5QixPQUFPLFdBQVcsSUFBSSx5Q0FBeUMsU0FBUyxTQUFTLFNBQVMsa0NBQWtDLGtCQUFrQixTQUFTLHFCQUFxQixPQUFPLFdBQVcsSUFBSSx5Q0FBeUMsU0FBUyxTQUFTLFNBQVMsdUNBQXVDLE1BQU0sS0FBSyxrQkFBa0IsV0FBVyx1QkFBdUIsRSIsImZpbGUiOiJ0b2RheS1zdHVkeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9tZmctd2VjaGF0L2J1bmRsZS9qcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGNkMWY4NjQ5ZmRhNzIwMTEzNGQzXG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzIwLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHM9e1xyXG4gICAgICAgIHNjcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBkSGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNUb3AgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcDtcclxuICAgICAgICB2YXIgY0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICBpZiAoc1RvcCArIGNIZWlnaHQgPT0gZEhlaWdodCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIGdldFN1YmplY3ROYW1lOmZ1bmN0aW9uKGlkKXtcclxuICAgICAgICB2YXIgc3ViamVjdElkU3RyID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKGlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwMVwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLor63mlodcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDJcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5pWw5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjAzXCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuiLseivrVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwNFwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLniannkIZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDVcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5YyW5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA2XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuWcsOeQhlwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwN1wiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLljoblj7JcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDhcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5pS/5rK7XCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA5XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIueUn+eJqVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN1YmplY3RJZFN0cjtcclxuICAgIH0sXHJcbiAgICBnZXRTdGFnZVN0cjogZnVuY3Rpb24gKHN0YWdlSWQpIHtcclxuICAgICAgICB2YXIgc3RhZ2VJZFN0ciA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChzdGFnZUlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ4XCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLlsI/lraZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiY1wiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi5Yid5LitXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImdcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIumrmOS4rVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHN0YWdlSWRTdHI7XHJcbiAgICB9LFxyXG4gICAgZ29fbWVudTpmdW5jdGlvbihjb25JZCl7XHJcbiAgICAgICAgdmFyIGNvbj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb25JZCk7XHJcbiAgICAgICAgdmFyIGltZz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVDb250cicpO1xyXG4gICAgICAgIGltZy5zcmM9Jy4uL2J1bmRsZS9pbWcvYm90dG9tLXl1YW4tc2hvdy5wbmcnO1xyXG4gICAgICAgIGNvbi5hcHBlbmRDaGlsZChpbWcpO1xyXG4gICAgICAgIHZhciBtZW51Q29udHI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVDb250cicpO1xyXG4gICAgICAgIG1lbnVDb250ci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JyxtZW51Qm9keSxmYWxzZSk7XHJcbiAgICAgICAgZnVuY3Rpb24gbWVudUJvZHkoKXtcclxuICAgICAgICAgICAgdmFyIG1lbnVTaG93PWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICBpZihtZW51U2hvdyl7XHJcbiAgICAgICAgICAgICAgICB2YXIgdD1tZW51U2hvdy5nZXRBdHRyaWJ1dGUoJ3N0eWxlJyk7XHJcbiAgICAgICAgICAgICAgICAkKFwiLnN0dWR5LXNob3dcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgaWYoIHQgPT0gJ2Rpc3BsYXk6IG5vbmU7Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIiNzdHVkeS1zaG93MVwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudVNob3cuc3R5bGUuZGlzcGxheT0nYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL21lbnUyLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgbWVudVNob3cuc3R5bGUuZGlzcGxheT0nbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYz1cIi4uL2J1bmRsZS9pbWcvYm90dG9tLXl1YW4tc2hvdy5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2hvdz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVTaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCdkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5pbm5lckhUTUw9JzxhIGhyZWY9XCJhZnRlcmNsYXNzam9iLmh0bWxcIiBjbGFzcz1cImt0eGFcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcveHVlYW4ucG5nXCIvPjwvYT48YSBocmVmPVwid3JvbmctZ2F0aGVyLmh0bWxcIiBjbGFzcz1cImt4amxcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvamlqaW4ucG5nXCI8L2E+PGEgaHJlZj1cImhvbWV3b3JrLWxpc3QuaHRtbFwiICBjbGFzcz1cImN0ampcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvamlsdS5wbmdcIj48L2E+PGEgaHJlZj1cIm1vbnRod2Vhay5odG1sXCIgY2xhc3M9XCJteXJ4XCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3J1b3hpYW5nLnBuZ1wiPjwvYT4nO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ29fc3R1ZHlfc2hvdzpmdW5jdGlvbihpbWdsb2dvLHNob3dpZCxhcnIpe1xyXG4gICAgICAgICAgIHZhciBuPTE7XHJcbiAgICAgICAgICAgICQoaW1nbG9nbykucGFyZW50KFwiaDNcIikub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKG4gJTIgIT0wKXtcclxuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDtpPD00O2krKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiLnN0dWR5LXNob3dcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJChpbWdsb2dvKS5wYXJlbnQoXCJoM1wiKS5pbmRleD1pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJChhcnJbaV0pLmF0dHIoXCJzcmNcIixcIi4uL2J1bmRsZS9pbWcvdG9wLWppYW50b3UucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJChzaG93aWQrXCJpbmRleFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykuYXR0cihcInNyY1wiLFwiLi4vYnVuZGxlL2ltZy9idG0ucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoc2hvd2lkKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykuYXR0cihcInNyY1wiLFwiLi4vYnVuZGxlL2ltZy90b3AtamlhbnRvdS5wbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChzaG93aWQpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhuKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSl9LFxyXG5cclxuICAgIHNob3dDb25maXJtOmZ1bmN0aW9uKG1zZyxjYWxsYmFjaylcclxuICAgIHtcclxuICAgICAgICB2YXIgbGF5ZXI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICBsYXllci5jbGFzc05hbWU9XCJsYXllclwiO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGF5ZXIpO1xyXG4gICAgICAgIHZhciBjb25maXJtPSc8ZGl2IGNsYXNzPVwicG9wY29uZmlybVwiPic7XHJcbiAgICAgICAgY29uZmlybSs9JzxkaXYgY2xhc3M9XCJ0aXRsZVwiPic7XHJcbiAgICAgICAgY29uZmlybSs9JzxpIGNsYXNzPVwiaWNvbi1jbG9zZVwiPjwvaT4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgPC9kaXY+JztcclxuICAgICAgICBjb25maXJtKz0nIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+Jyttc2crJyA8L2Rpdj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgPGRpdiBjbGFzcz1cImZvb3RcIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgIDxpbnB1dCBjbGFzcz1cInBvcGJ0biBidG5vayBjb2xvci1ncmVlblwiIHR5cGU9XCJidXR0b25cIiAgdmFsdWU9XCLnoa7lrppcIi8+JztcclxuICAgICAgICBjb25maXJtKz0nICA8aW5wdXQgY2xhc3M9XCJwb3BidG4gYnRuY2FuY2VsIGNvbG9yLWdyZWVuXCIgdHlwZT1cImJ1dHRvblwiIHZhbHVlPVwi5Y+W5raIXCIvPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgIDwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChjb25maXJtKTtcclxuICAgICAgICAvLyQoJy5wb3Bjb25maXJtJykuY3NzKCd0b3AnLChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0kKCcucG9wY29uZmlybScpLmhlaWdodCgpKS8yKTtcclxuICAgICAgICAkKFwiLmJ0bm9rXCIpLnVuYmluZChcImNsaWNrXCIpO1xyXG4gICAgICAgICQoXCIuYnRub2tcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJChcIi5sYXllclwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJChcIi5wb3Bjb25maXJtXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sodHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgJChcIi5idG5jYW5jZWwsLmljb24tY2xvc2VcIikuY2xpY2soZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJChcIi5sYXllclwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgJChcIi5wb3Bjb25maXJtXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSxcclxuICAgIC8v5L+h5oGv5o+Q56S65qGGXHJcbiAgICBzaG93UG9wTXNnOmZ1bmN0aW9uIChtc2cpIHtcclxuICAgICAgICB2YXIgaHRtbD0nPGRpdiBjbGFzcz1cInBvcG1zZ1wiPjxkaXYgY2xhc3M9XCJjb250ZW50XCI+Jyttc2crJzwvZGl2PjwvZGl2Pic7XHJcbiAgICAgICAgJCgnLnBvcG1zZycpLnJlbW92ZSgpO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoaHRtbCk7XHJcbiAgICAgICAgJCgnLnBvcG1zZycpLmNzcygnbGVmdCcsKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGggIC0kKCcucG9wbXNnJykud2lkdGgoKSkvMik7XHJcbiAgICAgICAgJCgnLnBvcG1zZycpLmNzcygndG9wJywoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtJCgnLnBvcG1zZycpLmhlaWdodCgpKS8yKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7JCgnLnBvcG1zZycpLnJlbW92ZSgpO30sMTAwMCk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5bmjqXlj6N1cmwg5aaC6I635Y+Wb3BlbmlkICAgZ2V0QXBpVXJsKCdBY2NvdW50L0dldE9wZW5JRCcpXHJcbiAgICBnZXRBcGlVcmw6ZnVuY3Rpb24oYWN0aW9uKXtcclxuICAgICAgICAvL+e6v+S4i+a1i+ivlVxyXG4gICAgICAgLy92YXIgYmFzZXVybD0naHR0cDovLzE5Mi4xNjguMTgwLjE1Ojg5OTgvJztcclxuICAgICAgICAvL+e6v+S4iua1i+ivlVxyXG4gICAgICAgdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk3Lyc7XHJcbiAgICAgICAvLyB2YXIgYmFzZXVybD0naHR0cDovL2xvY2FsaG9zdDo0Njk1MS8nO1xyXG4gICAgICAgIHJldHVybiBiYXNldXJsK2FjdGlvbjtcclxuICAgIH0sXHJcbiAgICAvL+iwg+eUqGFwaeaIkOWKn+WQju+8jOWFiOiwg+eUqOatpOaWueazle+8jOWIpOaWreeUqOaIt+aYr+WQpuW3sue7j+e7keWumu+8jOiLpeacque7keWumu+8jOi3s+i9rOWIsOe7keWumumhtVxyXG4gICAgY2hlY2tCaW5kOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGlmKCFkYXRhLk9LKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLkNvZGUgPT0gMSB8fCBkYXRhLkNvZGUgPT0gMiB8fCBkYXRhLkNvZGUgPT0gNCB8fCBkYXRhLkNvZGUgPT0gMTEgfHwgZGF0YS5Db2RlID09IDEyIHx8IGRhdGEuQ29kZSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImJpbmRpbmZvLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlk9wZW5JZFxyXG4gICAgZ2V0T3BlbklkOmZ1bmN0aW9uKGFwcGlkLGFwcHNlY3JldCxjb2RlKXtcclxudmFyIG9wZW5pZDtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGFzeW5jOmZhbHNlLFxyXG4gICAgICAgICAgICB1cmw6dGhpcy5nZXRBcGlVcmwoJ0FjY291bnQvR2V0T3BlbklEJyksXHJcbiAgICAgICAgICAgIC8vIGRhdGEgdG8gYmUgYWRkZWQgdG8gcXVlcnkgc3RyaW5nOlxyXG4gICAgICAgICAgICBkYXRhOiB7QXBwSUQ6YXBwaWQsQXBwU2VjcmV0OmFwcHNlY3JldCxDb2RlOmNvZGV9LFxyXG4gICAgICAgICAgICAvLyB0eXBlIG9mIGRhdGEgd2UgYXJlIGV4cGVjdGluZyBpbiByZXR1cm46XHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIC8vdGltZW91dDogMzAwLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5PSylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5pZD1kYXRhLklEO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0FqYXggZXJyb3IhJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9wZW5pZDtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlnVybOWPguaVsFxyXG4gICAgZ2V0UXVlcnlTdHJpbmc6ZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKF58JilcIiArIG5hbWUgKyBcIj0oW14mXSopKCZ8JClcIiwgXCJpXCIpO1xyXG4gICAgdmFyIHIgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xyXG4gICAgaWYgKHIgIT0gbnVsbCkgcmV0dXJuIHVuZXNjYXBlKGRlY29kZVVSSShyWzJdKSk7IHJldHVybiBudWxsO1xyXG59LFxyXG5cclxuICAgIGRhdGVGb3JtYXQ6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCl7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICB2YXIgbWFwID0ge1xyXG4gICAgICAgICAgICBcIllcIjogZGF0ZS5nZXRZZWFyKCksXHJcbiAgICAgICAgICAgIFwiTVwiOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vVxyXG4gICAgICAgICAgICBcImRcIjogZGF0ZS5nZXREYXRlKCksIC8v5pelXHJcbiAgICAgICAgICAgIFwiaFwiOiBkYXRlLmdldEhvdXJzKCksIC8v5bCP5pe2XHJcbiAgICAgICAgICAgIFwibVwiOiBkYXRlLmdldE1pbnV0ZXMoKSwgLy/liIZcclxuICAgICAgICAgICAgXCJzXCI6IGRhdGUuZ2V0U2Vjb25kcygpLCAvL+enklxyXG4gICAgICAgICAgICBcInFcIjogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqZcclxuICAgICAgICAgICAgXCJTXCI6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLy/mr6vnp5JcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC8oW3lNZGhtc3FTXSkrL2csIGZ1bmN0aW9uIChhbGwsIHQpIHtcclxuICAgICAgICAgICAgdmFyIHYgPSBtYXBbdF07XHJcbiAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbGwubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSAnMCcgKyB2O1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSB2LnN1YnN0cih2Lmxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodCA9PT0gJ3knKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIGFsbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhbGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgIH0sXHJcbiAgICAvL+WkhOeQhuivlemimOWFrOW8jyBtYXRoamF4XHJcbiAgICBpbml0TWF0aEpheE9iajpmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBNYXRoSmF4Lkh1Yi5RdWV1ZShbXCJUeXBlc2V0XCIsIE1hdGhKYXguSHViLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCldKTtcclxuICAgIH0sXHJcbiAgICBnZXRMb2NhbFRpbWU6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludCh2YWwucmVwbGFjZShcIi9EYXRlKFwiLCBcIlwiKS5yZXBsYWNlKFwiKS9cIiwgXCJcIiksIDEwKSk7XHJcbiAgICAgICAgICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxIDwgMTAgPyBcIjBcIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKSA6IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0RGF0ZSgpIDogZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldEhvdXJzKCkgOiBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIHZhciBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKSA6IGRhdGUuZ2V0TWludXRlcygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHllYXIgKyBcIi1cIiArIG1vbnRoICsgXCItXCIgKyBjdXJyZW50RGF0ZSArIFwiIFwiICsgaG91cnMgKyBcIjpcIiArIG1pbnV0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC91dGlsL3V0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA3IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTcgMTggMTkgMjBcbiAqKi8iLCIkKGZ1bmN0aW9uICgpIHtcclxuICAgIC8v5byV5YWl5pe26Ze06K6+572u55qE5o+S5Lu2XHJcbiAgICB2YXIgV2ViU3RvcmFnZUNhY2hlID0gcmVxdWlyZSgnd2ViLXN0b3JhZ2UtY2FjaGUubWluLmpzJyk7XHJcbiAgICB2YXIgaG9tZSA9IHJlcXVpcmUoXCJ1dGlsL3V0aWxcIik7XHJcbiAgICAvL3ZhciBub2RlZGF0YT1yZXF1aXJlKCdjb21wb25lbnQvbm8tZGF0YS9uby1kYXRhLmpzJyk7XHJcbiAgIC8vIG5vZGVkYXRhLmluaXQoJ21haW4nLCflr7nkuI3otbfvvIzmlbDmja7mmoLml7bmnKrliqDovb0nKTtcclxuICAgLy8gbm9kZWRhdGEubW9kdWxlLmV4cG9ydHMuaW5pdChkb20sJ+ebruWJjeaXoOaVsOaNricpXHJcbiAgICB2YXIgdG9keXVybCA9IGhvbWUuZ2V0QXBpVXJsKCdIb21lU2Nob29sQ29udGFjdC9Ub2RheVN0dWR5U3RhdHVzL0dldFRvZGF5U3R1ZHlTdGF0dXNMaXN0Jyk7XHJcbiAgICBjb25zb2xlLmxvZyh0b2R5dXJsKTtcclxuICAgIC8v5b6X5omTQXBwSUTlkoxvcGVuaWRcclxuICAgIHZhciBhcHBpZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FwcGlkJyk7XHJcbiAgICB2YXIgb3BlbmlkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnb3BlbmlkJyk7XHJcbiAgICBjb25zb2xlLmxvZyhhcHBpZCk7XHJcbiAgICBjb25zb2xlLmxvZyhvcGVuaWQpO1xyXG4gICAgdmFyIHdzQ2FjaGUgPSBuZXcgV2ViU3RvcmFnZUNhY2hlKHtcclxuICAgICAgICBzdG9yYWdlOiAnbG9jYWxTdG9yYWdlJ1xyXG4gICAgfSk7XHJcbiAgICAvL+S5puWGmeaVsOe7hOWtmOWCqOWvueW6lOexu+eahGlkXHJcbiAgICB2YXIgc3BlYWsgPSBbXTtcclxuICAgIHZhciBob21ld29yayA9IFtdO1xyXG4gICAgdmFyIG1vZHVsZSA9IFtdO1xyXG4gICAgdmFyIG5ld3dvcmsgPSBbXTtcclxuICAgIC8v6K+35rGC5pWw5o2uXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICBhc3luYzogZmFsc2UsXHJcbiAgICAgICAgdXJsOiB0b2R5dXJsLFxyXG4gICAgICAgIC8vIGRhdGEgdG8gYmUgYWRkZWQgdG8gcXVlcnkgc3RyaW5nOlxyXG4gICAgICAgIGRhdGE6IHtBcHBJRDogYXBwaWQsIG9wZW5JRDogb3BlbmlkfSxcclxuICAgICAgICAvLyB0eXBlIG9mIGRhdGEgd2UgYXJlIGV4cGVjdGluZyBpbiByZXR1cm46XHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAvL3RpbWVvdXQ6IDMwMCxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvL+W8gOivvuaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGEgPSBkYXRhLk4uSGF2ZUNsYXNzQWxlcnRMaXN0O1xyXG4gICAgICAgICAgICAvL+S6pOS9nOS4muaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGExID0gZGF0YS5OLlN1Ym1pdEhvbWVXb3JrQWxlcnRMaXN0O1xyXG4gICAgICAgICAgICAvL+WtpuahiOaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGEyID0gZGF0YS5OLk5ld1RlYWNoUGxhbkFsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/mlrDkvZzkuJrmj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhMyA9IGRhdGEuTi5OZXdIb21lV29ya0FsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/ojrflvpfml7bpl7TmiKrlj5bnmoTlh73mlbBcclxuICAgICAgICAgICAgdmFyIHN0YXJ0PScnO1xyXG4gICAgICAgICAgICB2YXIgZW5kPScnO1xyXG4gICAgICAgICAgICAvL+iuvue9ruW+l+WIsOeahOaXtumXtOeahOWPmOmHj1xyXG4gICAgICAgICAgICB2YXIgZ290VGltZT0nJztcclxuICAgICAgICAgICAgLy/lvpfliLDku4rlpKnnmoTml7bpl7TnmoTlj5jph49cclxuICAgICAgICAgICAgdmFyIG5vd1RpbWU9Jyc7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIG15dGltZSh2YWwsc3R5bGUpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZz0gKHZhbC5kYXRlVGltZXMpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgc3RhcnQ9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nWzBdLHN0eWxlICk7Ly8naGg6bW0nXHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMSA9ICh2YWwuZW5kRGF0ZVRpbWUpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgZW5kPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzFbMF0sc3R5bGUpOy8vICdoaDptbSdcclxuICAgICAgICAgICAgICAgIG5vd1RpbWVzPWhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMVswXSwnZGQnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgLy9ub3dUaW1lcz1ob21lLmRhdGVGb3JtYXQoK25ldyBEYXRlKCkrMjQqNjAqNjAqMTAwMCwnZGQnKVxyXG4gICAgICAgICAgICAvL+S5puWGmeS4gOS4qui/m+ihjOaXtumXtOavlOi+g+eahOWHveaVsFxyXG4gICAgICAgICAgdmFyIGNvbXBhcmV0aW1lPWZ1bmN0aW9uKGdldHRpbWUpe1xyXG4gICAgICAgICAgICAgICBnb3RUaW1lPWhvbWUuZGF0ZUZvcm1hdCgrbmV3IERhdGUoKSwnZGQnKTtcclxuICAgICAgICAgICAgICAgIHZhciB2YWx0aW1lPXBhcnNlSW50KGdldHRpbWUpLXBhcnNlSW50KGdvdFRpbWUpO1xyXG4gICAgICAgICAgICAgICAgaWYodmFsdGltZT09MCl7XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gICfku4rlpKknO1xyXG4gICAgICAgICAgICAgICAgfWVsc2UgaWYodmFsdGltZT09MSl7XHJcbiAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+aYjuWkqSc7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ+aXpeacn+acieivryc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdmFyIHN0ciA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgc3RyMSA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgc3RyMiA9ICcnO1xyXG4gICAgICAgICAgICB2YXIgc3RyMyA9ICcnO1xyXG4gICAgICAgICAgICAvL+W8gOiusuS6hlxyXG4gICAgICAgICAgICAkLmVhY2goZGF0dGEsZnVuY3Rpb24oaSx2YWwpIHtcclxuICAgICAgICAgICAgICAgIHNwZWFrLnB1c2godmFsLmlkKTtcclxuICAgICAgICAgICAgICAgIG15dGltZSh2YWwsJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291cnNlTmFtZSA9IGhvbWUuZ2V0U3ViamVjdE5hbWUodmFsLnN1YmplY3QpO1xyXG4gICAgICAgICAgICAgICAgc3RyICs9ICc8ZGl2IGNsYXNzPVwicGFydCBzcGVha1wiIGlkPVwiJyt2YWwuaWQrJ1wiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9kZXRhaWxzXzAzLnBuZ1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj7lvIDorrLllaY8L3NwYW4+PHA+5oKo5aW9OjxzcGFuIGNsYXNzPVwiZmlyc3Rfc3BhblwiPicgKyB2YWwudXNlck5hbWUgKyAnPC9zcGFuPuS7iuWkqeacieivvu+8jOW/q+aPkOmGkuS7luS4iuivvuWQp348L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICsgY291cnNlTmFtZSArICc8L3NwYW4+77yI56ysPHNwYW4gIGNsYXNzPVwibnVtXCI+JyArIHZhbC5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+JyArIHN0YXJ0KyAnPC9zcGFuPn48c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+JyArIGVuZCsgJzwvc3Bhbj48L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyKTtcclxuICAgICAgICAgICAgLy/lv6vkuqTkvZzkuJrkuoZcclxuICAgICAgICAgICAgJC5lYWNoKGRhdHRhMSxmdW5jdGlvbihpLHZhbCkge1xyXG4gICAgICAgICAgICAgICAgaG9tZXdvcmsucHVzaCh2YWwuaWQpO1xyXG4gICAgICAgICAgICAgICAgbXl0aW1lKHZhbCwnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIGNvbXBhcmV0aW1lKG5vd1RpbWVzKTtcclxuICAgICAgICAgICAgICAgIHZhciBjb3Vyc2VOYW1lID0gaG9tZS5nZXRTdWJqZWN0TmFtZSh2YWwuc3ViamVjdCk7XHJcbiAgICAgICAgICAgICAgICBzdHIxICs9ICc8ZGl2IGNsYXNzPVwicGFydCBob21ld29ya1wiIGlkPVwiJyt2YWwuaWQrJ1wiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9kZXRhaWxzXzA2LmpwZ1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj7lv6vkuqTkvZzkuJrllaY8L3NwYW4+PHA+5oKo5aW9OjxzcGFuIGNsYXNzPVwiZmlyc3Rfc3BhblwiPicgK3ZhbC51c2VyTmFtZSArICc8L3NwYW4+6L+Y5pyJ5pyq5Lqk5L2c5Lia77yM5b+r552j5L+D5LuW5Lqk5L2c5Lia5ZCnfjwvcD48aHIgLz48cCAgY2xhc3M9XCJkZXRhaWxlZFwiPjxzcGFuIGNsYXNzPVwic3ViamVjdFwiPicgK2NvdXJzZU5hbWUrJzwvc3Bhbj7vvIjnrKw8c3BhbiAgY2xhc3M9XCJudW1cIj4nICt2YWwuZXh0ZW5kTnVtICsgJzwvc3Bhbj7mrKEpPHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPuaIquatoiZuYnNwOyZuYnNwOzxzcGFuPicrY29tcGFyZXRpbWUobm93VGltZXMpKyc8L3NwYW4+Jm5ic3A7JyArZW5kKyAnPC9zcGFuPjwvc3Bhbj48L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyMSk7XHJcbiAgICAgICAgICAgIC8v5paw5a2m5qGIXHJcbiAgICAgICAgICAgICQuZWFjaChkYXR0YTIsZnVuY3Rpb24oaSx2YWwpe1xyXG4gICAgICAgICAgICAgICAgbW9kdWxlLnB1c2godmFsLmlkKTtcclxuICAgICAgICAgICAgICAgIG15dGltZSh2YWwsJ01N5pyIZGTml6UnKTtcclxuICAgICAgICAgICAgICAgIHZhciBjb3Vyc2VOYW1lID0gaG9tZS5nZXRTdWJqZWN0TmFtZSh2YWwuc3ViamVjdCk7XHJcbiAgICAgICAgICAgICAgICBzdHIyICs9ICc8ZGl2IGNsYXNzPVwicGFydCBtb2R1bGVcIiBpZD1cIicrdmFsLmlkKydcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlsc18wOS5qcGdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5pS25Yiw5LiA5Lu95paw5a2m5qGIPC9zcGFuPjxwPuaCqOWlvTrogIHluIjlj5HluIPkuobmlrDlrabmoYjvvIzlv6vmj5DphpI8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICt2YWwudXNlck5hbWUgKyAnPC9zcGFuPumihOS5oOWQpzwvcD48aHIgLz48cCAgY2xhc3M9XCJkZXRhaWxlZFwiPjxzcGFuIGNsYXNzPVwic3ViamVjdFwiPicgK2NvdXJzZU5hbWUrICc8L3NwYW4+77yI56ysPHNwYW4gIGNsYXNzPVwibnVtXCI+JyArdmFsLmV4dGVuZE51bSArICc8L3NwYW4+5qyhKTxzcGFuIGNsYXNzPVwiZGF0YXRpbWVcIj7kuIror74mbmJzcDsmbmJzcCZuYnNwOzxzcGFuIGNsYXNzPVwidGltZVwiPicgK2VuZCsgJzwvc3Bhbj48L3NwYW4+PC9wPjwvZGl2PidcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLy/mlrDkvZzkuJpcclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyMik7XHJcbiAgICAgICAgICAgICQuZWFjaChkYXR0YTMsZnVuY3Rpb24oaSx2YWwpe1xyXG4gICAgICAgICAgICAgICAgbmV3d29yay5wdXNoKHZhbC5pZCk7XHJcbiAgICAgICAgICAgICAgICBteXRpbWUodmFsLCdoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgY29tcGFyZXRpbWUobm93VGltZXMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdXJzZU5hbWUgPSBob21lLmdldFN1YmplY3ROYW1lKHZhbC5zdWJqZWN0KTtcclxuICAgICAgICAgICAgICAgIHN0cjMgKz0gJzxkaXYgY2xhc3M9XCJwYXJ0IG5ld3dvcmtcIiBpZD1cIicrdmFsLmlkKydcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlscy5qcGdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5pS25Yiw5LiA5Lu95paw5L2c5LiaPC9zcGFuPjxwPuaCqOWlvTrogIHluIjluIPnva7kuobmlrDkvZzkuJrvvIzlv6vnnaPkv4M8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICt2YWwudXNlck5hbWUgKyAnPC9zcGFuPuS9nOetlOWQp348L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICtjb3Vyc2VOYW1lKyAnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgK3ZhbC5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+5oiq5q2iJm5ic3A7Jm5ic3A8c3Bhbj4nK2NvbXBhcmV0aW1lKG5vd1RpbWVzKSsnPC9zcGFuPiZuYnNwOzxzcGFuIGNsYXNzPVwidGltZVwiPicgKyBlbmQrICc8L3NwYW4+PC9zcGFuPjwvcD48L2Rpdj4nO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAkKCcubWFpbicpLmFwcGVuZChzdHIzKTtcclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKHhociwgdHlwZSkge1xyXG4gICAgICAgICAgICBhbGVydCgnQWpheCBlcnJvciEnKVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8v5bCG5LiA5Liq5bCG5pe26Ze05a2Y5YiwbG9jYWxTdHJvbmfph4zpnaLlrZjlgqjov4fmnJ/ml7bpl7Tov5vooYzmlbDmja7muIXpmaRcclxuICAgIHZhciBsaW1pdFRpbWU9IGhvbWUuZGF0ZUZvcm1hdCgrbmV3IERhdGUoKSsyNCo2MCo2MCoxMDAwLCd5eXl5IE1NIGRkJyk7XHJcbiAgICB3c0NhY2hlLnNldCgnbGltaXRUaW1lJywxLCB7ZXhwIDpuZXcgRGF0ZShsaW1pdFRpbWUpfSk7XHJcbiAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGltaXRUaW1lJyk9PW51bGwpe1xyXG4gICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICAvL+S5puWGmeS4gOS4quW+l+WIsHVybOWcsOWdgOeahOWHveaVsFxyXG4gICAgZnVuY3Rpb24gZ2V0dXJsKG9yaXVybCxrZXksdmFsKXtcclxuICAgICAgIGxvY2F0aW9uLmhyZWY9b3JpdXJsKyc/JytrZXkrJz0nK3ZhbDtcclxuICAgIH1cclxuICAgIHZhciB0eXBlc3RyID0gWydzcGVhaycsICdob21ld29yaycsICdtb2R1bGUnLCAnbmV3d29yayddO1xyXG4gICAgdmFyIHR5cGV2YWwgPSBbc3BlYWssIGhvbWV3b3JrLCBtb2R1bGUsIG5ld3dvcmtdO1xyXG4gICAgdmFyIHR5cGVjbGFzcyA9IFsnLnNwZWFrJywgJy5ob21ld29yaycsICcubW9kdWxlJywgJy5uZXd3b3JrJ107XHJcbiAgICAvL2NsYXPku6PooajpgInmi6nlmajnmoTnsbvnm650eXBlY2xhc3NcclxuICAgIC8vdmFs5Luj6KGo5pWw57uEdHlwZXZhbFxyXG4gICAgLy9zdHLku6PooajmoIfor4bnmoTlj5jph490eXBlc3RyXHJcbiAgICBmdW5jdGlvbiByZWFkZWQoY2xhcywgdmEsIHN0cikge1xyXG4gICAgICAgICQoY2xhcykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvL+W+l+WIsOW9k+WJjeWFg+e0oOebuOWvueS6juWOn+WFiOmbhuWQiOeahOS9jee9rlxyXG4gICAgICAgICAgICB2YXIgbnVtPSQoY2xhcykuaW5kZXgoJCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAvL+WvuXdvcmvmlbDnu4Tov5vooYzlvqrnjq/lr7nlvZPliY3ngrnlh7vnmoTlhYPntKDorr7nva7kuIDkuKpsb2NhbFN0b3JhZ2XmlbDlgLxcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bSA9PSBpKXtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShzdHIgKyBpLCB2YVtpXSk7XHJcbiAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5kZXRhaWxlZCcpLmh0bWwoJ+atpOS/oeaBr+W3suiiq+ivu+WPlicpO1xyXG4gICAgICAgICAgIC8v54K55Ye755qE5pe25YCZ6Lez6L2s6aG16Z2iXHJcbiAgICAgICAgICAgIHZhciB1cmw9Jyc7XHJcbiAgICAgICAgICAgIC8v5b6X5Yiw54K55Ye75a+56LGh55qEaWTnmoTlgLxcclxuICAgICAgICAgICAgdmFyIGlkPSQodGhpcykuYXR0cignaWQnKTtcclxuICAgICAgICAgICAgc3dpdGNoIChjbGFzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICBjYXNlICcuaG9tZXdvcmsnOlxyXG4gICAgICAgICAgICAgICAgICAgIHVybD1cIm1mZy13ZWNoYXQvaHRtbC90b2RheS13b3JrLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgICAgICBnZXR1cmwodXJsLCd3b3JraWQnLGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgY2FzZSAnLm1vZHVsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsPVwibWZnLXdlY2hhdC9odG1sL3ByZXBhcmUuaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgICAgZ2V0dXJsKHVybCwnd29ya2lkJyxpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/lvqrnjq/kvr/liKnmiYDmnInnmoTmlbDlgLzvvIzlpoLmnpzngrnlh7vkuYvlkI7lsIbkv6Hmga/orr7nva7miJDlt7Lor7tcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAvL+W+l+WIsOWFg+e0oOeahGlkXHJcbiAgICAgICAgICAgIHZhciBteUlkPSQoY2xhcykuZXEoaSkuYXR0cignaWQnKTtcclxuICAgICAgICAgICBpZiAobXlJZD09bG9jYWxTdG9yYWdlLmdldEl0ZW0oc3RyICsgaSkpIHtcclxuICAgICAgICAgICAgICAgICQoY2xhcykuZXEoaSkuY2hpbGRyZW4oJy5kZXRhaWxlZCcpLmh0bWwoJ+atpOS/oeaBr+W3suiiq+ivu+WPlicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICB9XHJcbiAgICAvL+W+queOr+eahOS+v+WIqeS4iumdoueahOWHveaVsFxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICByZWFkZWQodHlwZWNsYXNzW2ldLCB0eXBldmFsW2ldLCB0eXBlc3RyW2ldKTtcclxuICAgIH1cclxuICAgIC8vbG9jYWxTdG9yYWdlLmNsZWFyKCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL3RvZGF5LXN0dWR5LmpzXG4gKiogbW9kdWxlIGlkID0gNTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTdcbiAqKi8iLCIvKiFcclxuIHdlYi1zdG9yYWdlLWNhY2hlIC0tIEFkZGVkIGBleHBpcmVzYCBhdHRyaWJ1dGUgYW5kIHNlcmlhbGl6ZSBkYXRhIHdpdGggYEpTT04ucGFyc2VgIGZvciB0aGUgbG9jYWxTdG9yYWdlIGFuZCBzZXNzaW9uU3RvcmFnZS5cclxuIFZlcnNpb24gMS4wLjBcclxuIGh0dHBzOi8vZ2l0aHViLmNvbS9XUVRlYW0vd2ViLXN0b3JhZ2UtY2FjaGVcclxuIChjKSAyMDEzLTIwMTYgV1FUZWFtLCBNSVQgbGljZW5zZVxyXG4gKi9cclxuIWZ1bmN0aW9uKGEsYil7XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShiKTpcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1iKCk6YS5XZWJTdG9yYWdlQ2FjaGU9YigpfSh0aGlzLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gYShhLGIpe2Zvcih2YXIgYyBpbiBiKWFbY109YltjXTtyZXR1cm4gYX1mdW5jdGlvbiBiKGEpe3ZhciBiPSExO2lmKGEmJmEuc2V0SXRlbSl7Yj0hMDt2YXIgYz1cIl9fXCIrTWF0aC5yb3VuZCgxZTcqTWF0aC5yYW5kb20oKSk7dHJ5e2Euc2V0SXRlbShjLGMpLGEucmVtb3ZlSXRlbShjKX1jYXRjaChkKXtiPSExfX1yZXR1cm4gYn1mdW5jdGlvbiBjKGEpe3ZhciBiPXR5cGVvZiBhO3JldHVyblwic3RyaW5nXCI9PT1iJiZ3aW5kb3dbYV1pbnN0YW5jZW9mIFN0b3JhZ2U/d2luZG93W2FdOmF9ZnVuY3Rpb24gZChhKXtyZXR1cm5cIltvYmplY3QgRGF0ZV1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKSYmIWlzTmFOKGEuZ2V0VGltZSgpKX1mdW5jdGlvbiBlKGEsYil7aWYoYj1ifHxuZXcgRGF0ZSxcIm51bWJlclwiPT10eXBlb2YgYT9hPWE9PT0xLzA/bDpuZXcgRGF0ZShiLmdldFRpbWUoKSsxZTMqYSk6XCJzdHJpbmdcIj09dHlwZW9mIGEmJihhPW5ldyBEYXRlKGEpKSxhJiYhZChhKSl0aHJvdyBuZXcgRXJyb3IoXCJgZXhwaXJlc2AgcGFyYW1ldGVyIGNhbm5vdCBiZSBjb252ZXJ0ZWQgdG8gYSB2YWxpZCBEYXRlIGluc3RhbmNlXCIpO3JldHVybiBhfWZ1bmN0aW9uIGYoYSl7dmFyIGI9ITE7aWYoYSlpZihhLmNvZGUpc3dpdGNoKGEuY29kZSl7Y2FzZSAyMjpiPSEwO2JyZWFrO2Nhc2UgMTAxNDpcIk5TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEXCI9PT1hLm5hbWUmJihiPSEwKX1lbHNlLTIxNDcwMjQ4ODI9PT1hLm51bWJlciYmKGI9ITApO3JldHVybiBifWZ1bmN0aW9uIGcoYSxiKXt0aGlzLmM9KG5ldyBEYXRlKS5nZXRUaW1lKCksYj1ifHxsO3ZhciBjPWUoYik7dGhpcy5lPWMuZ2V0VGltZSgpLHRoaXMudj1hfWZ1bmN0aW9uIGgoYSl7cmV0dXJuIGEmJlwiY1wiaW4gYSYmXCJlXCJpbiBhJiZcInZcImluIGE/ITA6ITF9ZnVuY3Rpb24gaShhKXt2YXIgYj0obmV3IERhdGUpLmdldFRpbWUoKTtyZXR1cm4gYjxhLmV9ZnVuY3Rpb24gaihhKXtyZXR1cm5cInN0cmluZ1wiIT10eXBlb2YgYSYmKGNvbnNvbGUud2FybihhK1wiIHVzZWQgYXMgYSBrZXksIGJ1dCBpdCBpcyBub3QgYSBzdHJpbmcuXCIpLGE9U3RyaW5nKGEpKSxhfWZ1bmN0aW9uIGsoZCl7dmFyIGU9e3N0b3JhZ2U6XCJsb2NhbFN0b3JhZ2VcIixleHA6MS8wfSxmPWEoZSxkKSxnPWMoZi5zdG9yYWdlKSxoPWIoZyk7dGhpcy5pc1N1cHBvcnRlZD1mdW5jdGlvbigpe3JldHVybiBofSxoPyh0aGlzLnN0b3JhZ2U9Zyx0aGlzLnF1b3RhRXhjZWVkSGFuZGxlcj1mdW5jdGlvbihhLGIsYyl7aWYoY29uc29sZS53YXJuKFwiUXVvdGEgZXhjZWVkZWQhXCIpLGMmJmMuZm9yY2U9PT0hMCl7dmFyIGQ9dGhpcy5kZWxldGVBbGxFeHBpcmVzKCk7Y29uc29sZS53YXJuKFwiZGVsZXRlIGFsbCBleHBpcmVzIENhY2hlSXRlbSA6IFtcIitkK1wiXSBhbmQgdHJ5IGV4ZWN1dGUgYHNldGAgbWV0aG9kIGFnYWluIVwiKTt0cnl7Yy5mb3JjZT0hMSx0aGlzLnNldChhLGIsYyl9Y2F0Y2goZSl7Y29uc29sZS53YXJuKGUpfX19KTphKHRoaXMsbil9dmFyIGw9bmV3IERhdGUoXCJGcmksIDMxIERlYyA5OTk5IDIzOjU5OjU5IFVUQ1wiKSxtPXtzZXJpYWxpemU6ZnVuY3Rpb24oYSl7cmV0dXJuIEpTT04uc3RyaW5naWZ5KGEpfSxkZXNlcmlhbGl6ZTpmdW5jdGlvbihhKXtyZXR1cm4gYSYmSlNPTi5wYXJzZShhKX19LG49e3NldDpmdW5jdGlvbigpe30sZ2V0OmZ1bmN0aW9uKCl7fSxcImRlbGV0ZVwiOmZ1bmN0aW9uKCl7fSxkZWxldGVBbGxFeHBpcmVzOmZ1bmN0aW9uKCl7fSxjbGVhcjpmdW5jdGlvbigpe30sYWRkOmZ1bmN0aW9uKCl7fSxyZXBsYWNlOmZ1bmN0aW9uKCl7fSx0b3VjaDpmdW5jdGlvbigpe319LG89e3NldDpmdW5jdGlvbihiLGMsZCl7aWYoYj1qKGIpLGQ9YSh7Zm9yY2U6ITB9LGQpLHZvaWQgMD09PWMpcmV0dXJuIHRoaXNbXCJkZWxldGVcIl0oYik7dmFyIGU9bS5zZXJpYWxpemUoYyksaD1uZXcgZyhlLGQuZXhwKTt0cnl7dGhpcy5zdG9yYWdlLnNldEl0ZW0oYixtLnNlcmlhbGl6ZShoKSl9Y2F0Y2goaSl7ZihpKT90aGlzLnF1b3RhRXhjZWVkSGFuZGxlcihiLGUsZCxpKTpjb25zb2xlLmVycm9yKGkpfXJldHVybiBjfSxnZXQ6ZnVuY3Rpb24oYSl7YT1qKGEpO3ZhciBiPW51bGw7dHJ5e2I9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShhKSl9Y2F0Y2goYyl7cmV0dXJuIG51bGx9aWYoaChiKSl7aWYoaShiKSl7dmFyIGQ9Yi52O3JldHVybiBtLmRlc2VyaWFsaXplKGQpfXRoaXNbXCJkZWxldGVcIl0oYSl9cmV0dXJuIG51bGx9LFwiZGVsZXRlXCI6ZnVuY3Rpb24oYSl7cmV0dXJuIGE9aihhKSx0aGlzLnN0b3JhZ2UucmVtb3ZlSXRlbShhKSxhfSxkZWxldGVBbGxFeHBpcmVzOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMuc3RvcmFnZS5sZW5ndGgsYj1bXSxjPXRoaXMsZD0wO2E+ZDtkKyspe3ZhciBlPXRoaXMuc3RvcmFnZS5rZXkoZCksZj1udWxsO3RyeXtmPW0uZGVzZXJpYWxpemUodGhpcy5zdG9yYWdlLmdldEl0ZW0oZSkpfWNhdGNoKGcpe31pZihudWxsIT09ZiYmdm9pZCAwIT09Zi5lKXt2YXIgaD0obmV3IERhdGUpLmdldFRpbWUoKTtoPj1mLmUmJmIucHVzaChlKX19cmV0dXJuIGIuZm9yRWFjaChmdW5jdGlvbihhKXtjW1wiZGVsZXRlXCJdKGEpfSksYn0sY2xlYXI6ZnVuY3Rpb24oKXt0aGlzLnN0b3JhZ2UuY2xlYXIoKX0sYWRkOmZ1bmN0aW9uKGIsYyxkKXtiPWooYiksZD1hKHtmb3JjZTohMH0sZCk7dHJ5e3ZhciBlPW0uZGVzZXJpYWxpemUodGhpcy5zdG9yYWdlLmdldEl0ZW0oYikpO2lmKCFoKGUpfHwhaShlKSlyZXR1cm4gdGhpcy5zZXQoYixjLGQpLCEwfWNhdGNoKGYpe3JldHVybiB0aGlzLnNldChiLGMsZCksITB9cmV0dXJuITF9LHJlcGxhY2U6ZnVuY3Rpb24oYSxiLGMpe2E9aihhKTt2YXIgZD1udWxsO3RyeXtkPW0uZGVzZXJpYWxpemUodGhpcy5zdG9yYWdlLmdldEl0ZW0oYSkpfWNhdGNoKGUpe3JldHVybiExfWlmKGgoZCkpe2lmKGkoZCkpcmV0dXJuIHRoaXMuc2V0KGEsYixjKSwhMDt0aGlzW1wiZGVsZXRlXCJdKGEpfXJldHVybiExfSx0b3VjaDpmdW5jdGlvbihhLGIpe2E9aihhKTt2YXIgYz1udWxsO3RyeXtjPW0uZGVzZXJpYWxpemUodGhpcy5zdG9yYWdlLmdldEl0ZW0oYSkpfWNhdGNoKGQpe3JldHVybiExfWlmKGgoYykpe2lmKGkoYykpcmV0dXJuIHRoaXMuc2V0KGEsdGhpcy5nZXQoYSkse2V4cDpifSksITA7dGhpc1tcImRlbGV0ZVwiXShhKX1yZXR1cm4hMX19O3JldHVybiBrLnByb3RvdHlwZT1vLGt9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL3dlYi1zdG9yYWdlLWNhY2hlLm1pbi5qc1xuICoqIG1vZHVsZSBpZCA9IDYwXG4gKiogbW9kdWxlIGNodW5rcyA9IDE3XG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==