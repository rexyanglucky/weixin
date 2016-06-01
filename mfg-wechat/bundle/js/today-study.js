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
	                    url="today-work.html";
	                    geturl(url,'workid',id);
	                    break;
	               case '.module':
	                    url="prepare.html";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjBhODczODY3YzE4Y2JjMTVlMGI/YzI3YyoqKioqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL3V0aWwvdXRpbC5qcz8yMjIxKioqKioqKioqKioqIiwid2VicGFjazovLy8uL2pzL3RvZGF5LXN0dWR5LmpzIiwid2VicGFjazovLy8uL2RlcC93ZWItc3RvcmFnZS1jYWNoZS5taW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FB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QkFBbUIsNkJBQTZCLGVBQWUsSUFBSSxrQkFBa0IscUJBQXFCLHFCQUFxQixZQUFZLFNBQVMsSUFBSSxJQUFJLDZDQUE2QywwQ0FBMEMsU0FBUywwQkFBMEIsU0FBUyx5QkFBeUIsT0FBTyxXQUFXLElBQUkseUNBQXlDLFNBQVMsU0FBUyxTQUFTLGtDQUFrQyxrQkFBa0IsU0FBUyxxQkFBcUIsT0FBTyxXQUFXLElBQUkseUNBQXlDLFNBQVMsU0FBUyxTQUFTLHVDQUF1QyxNQUFNLEtBQUssa0JBQWtCLFdBQVcsdUJBQXVCLEUiLCJmaWxlIjoidG9kYXktc3R1ZHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvbWZnLXdlY2hhdC9idW5kbGUvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiMGE4NzM4NjdjMThjYmMxNWUwYlxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8yMC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzPXtcclxuICAgICAgICBzY3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZEhlaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIHZhciBzVG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XHJcbiAgICAgICAgdmFyIGNIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgaWYgKHNUb3AgKyBjSGVpZ2h0ID09IGRIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBnZXRTdWJqZWN0TmFtZTpmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgdmFyIHN1YmplY3RJZFN0ciA9IFwiXCI7XHJcbiAgICAgICAgc3dpdGNoIChpZCkge1xyXG4gICAgICAgICAgICBjYXNlIFwiMDFcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi6K+t5paHXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjAyXCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuaVsOWtplwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwM1wiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLoi7Hor61cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDRcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi54mp55CGXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA1XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuWMluWtplwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwNlwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLlnLDnkIZcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiMDdcIjpcclxuICAgICAgICAgICAgICAgIHN1YmplY3RJZFN0ciA9IFwi5Y6G5Y+yXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIjA4XCI6XHJcbiAgICAgICAgICAgICAgICBzdWJqZWN0SWRTdHIgPSBcIuaUv+ayu1wiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCIwOVwiOlxyXG4gICAgICAgICAgICAgICAgc3ViamVjdElkU3RyID0gXCLnlJ/nialcIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdWJqZWN0SWRTdHI7XHJcbiAgICB9LFxyXG4gICAgZ2V0U3RhZ2VTdHI6IGZ1bmN0aW9uIChzdGFnZUlkKSB7XHJcbiAgICAgICAgdmFyIHN0YWdlSWRTdHIgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhZ2VJZCkge1xyXG4gICAgICAgICAgICBjYXNlIFwieFwiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi5bCP5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIuWIneS4rVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnXCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLpq5jkuK1cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGFnZUlkU3RyO1xyXG4gICAgfSxcclxuICAgIGdvX21lbnU6ZnVuY3Rpb24oY29uSWQpe1xyXG4gICAgICAgIHZhciBjb249ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uSWQpO1xyXG4gICAgICAgIHZhciBpbWc9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnaWQnLCdtZW51Q29udHInKTtcclxuICAgICAgICBpbWcuc3JjPScuLi9idW5kbGUvaW1nL2JvdHRvbS15dWFuLXNob3cucG5nJztcclxuICAgICAgICBjb24uYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICB2YXIgbWVudUNvbnRyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51Q29udHInKTtcclxuICAgICAgICBtZW51Q29udHIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsbWVudUJvZHksZmFsc2UpO1xyXG4gICAgICAgIGZ1bmN0aW9uIG1lbnVCb2R5KCl7XHJcbiAgICAgICAgICAgIHZhciBtZW51U2hvdz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudVNob3cnKTtcclxuICAgICAgICAgICAgaWYobWVudVNob3cpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHQ9bWVudVNob3cuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zdHVkeS1zaG93XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGlmKCB0ID09ICdkaXNwbGF5OiBub25lOycpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc3R1ZHktc2hvdzFcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPVwiLi4vYnVuZGxlL2ltZy9tZW51Mi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL2JvdHRvbS15dWFuLXNob3cucG5nXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdmFyIHNob3c9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnaWQnLCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuaW5uZXJIVE1MPSc8YSBocmVmPVwiYWZ0ZXJjbGFzc2pvYi5odG1sXCIgY2xhc3M9XCJrdHhhXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3h1ZWFuLnBuZ1wiLz48L2E+PGEgaHJlZj1cIndyb25nLWdhdGhlci5odG1sXCIgY2xhc3M9XCJreGpsXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppamluLnBuZ1wiPC9hPjxhIGhyZWY9XCJob21ld29yay1saXN0Lmh0bWxcIiAgY2xhc3M9XCJjdGpqXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppbHUucG5nXCI+PC9hPjxhIGhyZWY9XCJtb250aHdlYWsuaHRtbFwiIGNsYXNzPVwibXlyeFwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9ydW94aWFuZy5wbmdcIj48L2E+JztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdvX3N0dWR5X3Nob3c6ZnVuY3Rpb24oaW1nbG9nbyxzaG93aWQsYXJyKXtcclxuICAgICAgICAgICB2YXIgbj0xO1xyXG4gICAgICAgICAgICAkKGltZ2xvZ28pLnBhcmVudChcImgzXCIpLm9uKFwidG91Y2hzdGFydFwiLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBpZihuICUyICE9MCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpPTA7aTw9NDtpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgJChcIi5zdHVkeS1zaG93XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykucGFyZW50KFwiaDNcIikuaW5kZXg9aTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICQoYXJyW2ldKS5hdHRyKFwic3JjXCIsXCIuLi9idW5kbGUvaW1nL3RvcC1qaWFudG91LnBuZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICQoc2hvd2lkK1wiaW5kZXhcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAkKGltZ2xvZ28pLmF0dHIoXCJzcmNcIixcIi4uL2J1bmRsZS9pbWcvYnRtLnBuZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHNob3dpZCkuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAkKGltZ2xvZ28pLmF0dHIoXCJzcmNcIixcIi4uL2J1bmRsZS9pbWcvdG9wLWppYW50b3UucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoc2hvd2lkKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cobik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pfSxcclxuXHJcbiAgICBzaG93Q29uZmlybTpmdW5jdGlvbihtc2csY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxheWVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGF5ZXIuY2xhc3NOYW1lPVwibGF5ZXJcIjtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxheWVyKTtcclxuICAgICAgICB2YXIgY29uZmlybT0nPGRpdiBjbGFzcz1cInBvcGNvbmZpcm1cIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8ZGl2IGNsYXNzPVwidGl0bGVcIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8aSBjbGFzcz1cImljb24tY2xvc2VcIj48L2k+JztcclxuICAgICAgICBjb25maXJtKz0nIDwvZGl2Pic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8ZGl2IGNsYXNzPVwiY29udGVudFwiPicrbXNnKycgPC9kaXY+JztcclxuICAgICAgICBjb25maXJtKz0nIDxkaXYgY2xhc3M9XCJmb290XCI+JztcclxuICAgICAgICBjb25maXJtKz0nICA8aW5wdXQgY2xhc3M9XCJwb3BidG4gYnRub2sgY29sb3ItZ3JlZW5cIiB0eXBlPVwiYnV0dG9uXCIgIHZhbHVlPVwi56Gu5a6aXCIvPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgPGlucHV0IGNsYXNzPVwicG9wYnRuIGJ0bmNhbmNlbCBjb2xvci1ncmVlblwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPlua2iFwiLz4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgICA8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoY29uZmlybSk7XHJcbiAgICAgICAgLy8kKCcucG9wY29uZmlybScpLmNzcygndG9wJywoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtJCgnLnBvcGNvbmZpcm0nKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgJChcIi5idG5va1wiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAkKFwiLmJ0bm9rXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuYnRuY2FuY2VsLC5pY29uLWNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+S/oeaBr+aPkOekuuahhlxyXG4gICAgc2hvd1BvcE1zZzpmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgdmFyIGh0bWw9JzxkaXYgY2xhc3M9XCJwb3Btc2dcIj48ZGl2IGNsYXNzPVwiY29udGVudFwiPicrbXNnKyc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ2xlZnQnLChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoICAtJCgnLnBvcG1zZycpLndpZHRoKCkpLzIpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ3RvcCcsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSQoJy5wb3Btc2cnKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyQoJy5wb3Btc2cnKS5yZW1vdmUoKTt9LDEwMDApO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5o6l5Y+jdXJsIOWmguiOt+WPlm9wZW5pZCAgIGdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKVxyXG4gICAgZ2V0QXBpVXJsOmZ1bmN0aW9uKGFjdGlvbil7XHJcbiAgICAgICAgLy/nur/kuIvmtYvor5VcclxuICAgICAgIC8vdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk4Lyc7XHJcbiAgICAgICAgLy/nur/kuIrmtYvor5VcclxuICAgICAgIHZhciBiYXNldXJsPSdodHRwOi8vMTkyLjE2OC4xODAuMTU6ODk5Ny8nO1xyXG4gICAgICAgLy8gdmFyIGJhc2V1cmw9J2h0dHA6Ly9sb2NhbGhvc3Q6NDY5NTEvJztcclxuICAgICAgICByZXR1cm4gYmFzZXVybCthY3Rpb247XHJcbiAgICB9LFxyXG4gICAgLy/osIPnlKhhcGnmiJDlip/lkI7vvIzlhYjosIPnlKjmraTmlrnms5XvvIzliKTmlq3nlKjmiLfmmK/lkKblt7Lnu4/nu5HlrprvvIzoi6XmnKrnu5HlrprvvIzot7PovazliLDnu5HlrprpobVcclxuICAgIGNoZWNrQmluZDpmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICBpZighZGF0YS5PSykge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5Db2RlID09IDEgfHwgZGF0YS5Db2RlID09IDIgfHwgZGF0YS5Db2RlID09IDQgfHwgZGF0YS5Db2RlID09IDExIHx8IGRhdGEuQ29kZSA9PSAxMiB8fCBkYXRhLkNvZGUgPT0gMTMpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCJiaW5kaW5mby5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5ZPcGVuSWRcclxuICAgIGdldE9wZW5JZDpmdW5jdGlvbihhcHBpZCxhcHBzZWNyZXQsY29kZSl7XHJcbnZhciBvcGVuaWQ7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBhc3luYzpmYWxzZSxcclxuICAgICAgICAgICAgdXJsOnRoaXMuZ2V0QXBpVXJsKCdBY2NvdW50L0dldE9wZW5JRCcpLFxyXG4gICAgICAgICAgICAvLyBkYXRhIHRvIGJlIGFkZGVkIHRvIHF1ZXJ5IHN0cmluZzpcclxuICAgICAgICAgICAgZGF0YToge0FwcElEOmFwcGlkLEFwcFNlY3JldDphcHBzZWNyZXQsQ29kZTpjb2RlfSxcclxuICAgICAgICAgICAgLy8gdHlwZSBvZiBkYXRhIHdlIGFyZSBleHBlY3RpbmcgaW4gcmV0dXJuOlxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAvL3RpbWVvdXQ6IDMwMCxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBpZihkYXRhKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuT0spXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGVuaWQ9ZGF0YS5JRDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCB0eXBlKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdBamF4IGVycm9yIScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBvcGVuaWQ7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5Z1cmzlj4LmlbBcclxuICAgIGdldFF1ZXJ5U3RyaW5nOmZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIgKyBuYW1lICsgXCI9KFteJl0qKSgmfCQpXCIsIFwiaVwiKTtcclxuICAgIHZhciByID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcclxuICAgIGlmIChyICE9IG51bGwpIHJldHVybiB1bmVzY2FwZShkZWNvZGVVUkkoclsyXSkpOyByZXR1cm4gbnVsbDtcclxufSxcclxuXHJcbiAgICBkYXRlRm9ybWF0OiBmdW5jdGlvbihkYXRlLCBmb3JtYXQpe1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgdmFyIG1hcCA9IHtcclxuICAgICAgICAgICAgXCJZXCI6IGRhdGUuZ2V0WWVhcigpLFxyXG4gICAgICAgICAgICBcIk1cIjogZGF0ZS5nZXRNb250aCgpICsgMSwgLy/mnIjku71cclxuICAgICAgICAgICAgXCJkXCI6IGRhdGUuZ2V0RGF0ZSgpLCAvL+aXpVxyXG4gICAgICAgICAgICBcImhcIjogZGF0ZS5nZXRIb3VycygpLCAvL+Wwj+aXtlxyXG4gICAgICAgICAgICBcIm1cIjogZGF0ZS5nZXRNaW51dGVzKCksIC8v5YiGXHJcbiAgICAgICAgICAgIFwic1wiOiBkYXRlLmdldFNlY29uZHMoKSwgLy/np5JcclxuICAgICAgICAgICAgXCJxXCI6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksIC8v5a2j5bqmXHJcbiAgICAgICAgICAgIFwiU1wiOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvKFt5TWRobXNxU10pKy9nLCBmdW5jdGlvbiAoYWxsLCB0KSB7XHJcbiAgICAgICAgICAgIHZhciB2ID0gbWFwW3RdO1xyXG4gICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gJzAnICsgdjtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gdi5zdWJzdHIodi5sZW5ndGggLSAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHQgPT09ICd5Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnJykuc3Vic3RyKDQgLSBhbGwubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICB9LFxyXG4gICAgLy/lpITnkIbor5XpopjlhazlvI8gbWF0aGpheFxyXG4gICAgaW5pdE1hdGhKYXhPYmo6ZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgTWF0aEpheC5IdWIuUXVldWUoW1wiVHlwZXNldFwiLCBNYXRoSmF4Lkh1YiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0TG9jYWxUaW1lOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUocGFyc2VJbnQodmFsLnJlcGxhY2UoXCIvRGF0ZShcIiwgXCJcIikucmVwbGFjZShcIikvXCIsIFwiXCIpLCAxMCkpO1xyXG4gICAgICAgICAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSA8IDEwID8gXCIwXCIgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgOiBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudERhdGUgPSBkYXRlLmdldERhdGUoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldERhdGUoKSA6IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXRIb3VycygpIDogZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICB2YXIgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCkgOiBkYXRlLmdldE1pbnV0ZXMoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFyICsgXCItXCIgKyBtb250aCArIFwiLVwiICsgY3VycmVudERhdGUgKyBcIiBcIiArIGhvdXJzICsgXCI6XCIgKyBtaW51dGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvdXRpbC91dGlsLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNyA5IDEwIDExIDEyIDEzIDE0IDE1IDE3IDE4IDE5IDIwXG4gKiovIiwiJChmdW5jdGlvbiAoKSB7XHJcbiAgICAvL+W8leWFpeaXtumXtOiuvue9rueahOaPkuS7tlxyXG4gICAgdmFyIFdlYlN0b3JhZ2VDYWNoZSA9IHJlcXVpcmUoJ3dlYi1zdG9yYWdlLWNhY2hlLm1pbi5qcycpO1xyXG4gICAgdmFyIGhvbWUgPSByZXF1aXJlKFwidXRpbC91dGlsXCIpO1xyXG4gICAgLy92YXIgbm9kZWRhdGE9cmVxdWlyZSgnY29tcG9uZW50L25vLWRhdGEvbm8tZGF0YS5qcycpO1xyXG4gICAvLyBub2RlZGF0YS5pbml0KCdtYWluJywn5a+55LiN6LW377yM5pWw5o2u5pqC5pe25pyq5Yqg6L29Jyk7XHJcbiAgIC8vIG5vZGVkYXRhLm1vZHVsZS5leHBvcnRzLmluaXQoZG9tLCfnm67liY3ml6DmlbDmja4nKVxyXG4gICAgdmFyIHRvZHl1cmwgPSBob21lLmdldEFwaVVybCgnSG9tZVNjaG9vbENvbnRhY3QvVG9kYXlTdHVkeVN0YXR1cy9HZXRUb2RheVN0dWR5U3RhdHVzTGlzdCcpO1xyXG4gICAgY29uc29sZS5sb2codG9keXVybCk7XHJcbiAgICAvL+W+l+aJk0FwcElE5ZKMb3BlbmlkXHJcbiAgICB2YXIgYXBwaWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhcHBpZCcpO1xyXG4gICAgdmFyIG9wZW5pZCA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ29wZW5pZCcpO1xyXG4gICAgY29uc29sZS5sb2coYXBwaWQpO1xyXG4gICAgY29uc29sZS5sb2cob3BlbmlkKTtcclxuICAgIHZhciB3c0NhY2hlID0gbmV3IFdlYlN0b3JhZ2VDYWNoZSh7XHJcbiAgICAgICAgc3RvcmFnZTogJ2xvY2FsU3RvcmFnZSdcclxuICAgIH0pO1xyXG4gICAgLy/kuablhpnmlbDnu4TlrZjlgqjlr7nlupTnsbvnmoRpZFxyXG4gICAgdmFyIHNwZWFrID0gW107XHJcbiAgICB2YXIgaG9tZXdvcmsgPSBbXTtcclxuICAgIHZhciBtb2R1bGUgPSBbXTtcclxuICAgIHZhciBuZXd3b3JrID0gW107XHJcbiAgICAvL+ivt+axguaVsOaNrlxyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgIHVybDogdG9keXVybCxcclxuICAgICAgICAvLyBkYXRhIHRvIGJlIGFkZGVkIHRvIHF1ZXJ5IHN0cmluZzpcclxuICAgICAgICBkYXRhOiB7QXBwSUQ6IGFwcGlkLCBvcGVuSUQ6IG9wZW5pZH0sXHJcbiAgICAgICAgLy8gdHlwZSBvZiBkYXRhIHdlIGFyZSBleHBlY3RpbmcgaW4gcmV0dXJuOlxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgLy90aW1lb3V0OiAzMDAsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy/lvIDor77mj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhID0gZGF0YS5OLkhhdmVDbGFzc0FsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/kuqTkvZzkuJrmj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhMSA9IGRhdGEuTi5TdWJtaXRIb21lV29ya0FsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/lrabmoYjmj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhMiA9IGRhdGEuTi5OZXdUZWFjaFBsYW5BbGVydExpc3Q7XHJcbiAgICAgICAgICAgIC8v5paw5L2c5Lia5o+Q6YaS55qE5pWw5o2uXHJcbiAgICAgICAgICAgIHZhciBkYXR0YTMgPSBkYXRhLk4uTmV3SG9tZVdvcmtBbGVydExpc3Q7XHJcbiAgICAgICAgICAgIC8v6I635b6X5pe26Ze05oiq5Y+W55qE5Ye95pWwXHJcbiAgICAgICAgICAgIHZhciBzdGFydD0nJztcclxuICAgICAgICAgICAgdmFyIGVuZD0nJztcclxuICAgICAgICAgICAgLy/orr7nva7lvpfliLDnmoTml7bpl7TnmoTlj5jph49cclxuICAgICAgICAgICAgdmFyIGdvdFRpbWU9Jyc7XHJcbiAgICAgICAgICAgIC8v5b6X5Yiw5LuK5aSp55qE5pe26Ze055qE5Y+Y6YePXHJcbiAgICAgICAgICAgIHZhciBub3dUaW1lPScnO1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBteXRpbWUodmFsLHN0eWxlKXtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmc9ICh2YWwuZGF0ZVRpbWVzKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHN0YXJ0PSBob21lLmRhdGVGb3JtYXQoK3N0cmluZ1swXSxzdHlsZSApOy8vJ2hoOm1tJ1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZzEgPSAodmFsLmVuZERhdGVUaW1lKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIGVuZD0gaG9tZS5kYXRlRm9ybWF0KCtzdHJpbmcxWzBdLHN0eWxlKTsvLyAnaGg6bW0nXHJcbiAgICAgICAgICAgICAgICBub3dUaW1lcz1ob21lLmRhdGVGb3JtYXQoK3N0cmluZzFbMF0sJ2RkJyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vbm93VGltZXM9aG9tZS5kYXRlRm9ybWF0KCtuZXcgRGF0ZSgpKzI0KjYwKjYwKjEwMDAsJ2RkJylcclxuICAgICAgICAgICAgLy/kuablhpnkuIDkuKrov5vooYzml7bpl7Tmr5TovoPnmoTlh73mlbBcclxuICAgICAgICAgIHZhciBjb21wYXJldGltZT1mdW5jdGlvbihnZXR0aW1lKXtcclxuICAgICAgICAgICAgICAgZ290VGltZT1ob21lLmRhdGVGb3JtYXQoK25ldyBEYXRlKCksJ2RkJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmFsdGltZT1wYXJzZUludChnZXR0aW1lKS1wYXJzZUludChnb3RUaW1lKTtcclxuICAgICAgICAgICAgICAgIGlmKHZhbHRpbWU9PTApe1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuICAn5LuK5aSpJztcclxuICAgICAgICAgICAgICAgIH1lbHNlIGlmKHZhbHRpbWU9PTEpe1xyXG4gICAgICAgICAgICAgICAgICAgcmV0dXJuICfmmI7lpKknO1xyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICfml6XmnJ/mnInor68nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjEgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjIgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjMgPSAnJztcclxuICAgICAgICAgICAgLy/lvIDorrLkuoZcclxuICAgICAgICAgICAgJC5lYWNoKGRhdHRhLGZ1bmN0aW9uKGksdmFsKSB7XHJcbiAgICAgICAgICAgICAgICBzcGVhay5wdXNoKHZhbC5pZCk7XHJcbiAgICAgICAgICAgICAgICBteXRpbWUodmFsLCdoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvdXJzZU5hbWUgPSBob21lLmdldFN1YmplY3ROYW1lKHZhbC5zdWJqZWN0KTtcclxuICAgICAgICAgICAgICAgIHN0ciArPSAnPGRpdiBjbGFzcz1cInBhcnQgc3BlYWtcIiBpZD1cIicrdmFsLmlkKydcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlsc18wMy5wbmdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5byA6K6y5ZWmPC9zcGFuPjxwPuaCqOWlvTo8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICsgdmFsLnVzZXJOYW1lICsgJzwvc3Bhbj7ku4rlpKnmnInor77vvIzlv6vmj5DphpLku5bkuIror77lkKd+PC9wPjxociAvPjxwICBjbGFzcz1cImRldGFpbGVkXCI+PHNwYW4gY2xhc3M9XCJzdWJqZWN0XCI+JyArIGNvdXJzZU5hbWUgKyAnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgKyB2YWwuZXh0ZW5kTnVtICsgJzwvc3Bhbj7mrKEpPHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPicgKyBzdGFydCsgJzwvc3Bhbj5+PHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPicgKyBlbmQrICc8L3NwYW4+PC9wPjwvZGl2PidcclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoJy5tYWluJykuYXBwZW5kKHN0cik7XHJcbiAgICAgICAgICAgIC8v5b+r5Lqk5L2c5Lia5LqGXHJcbiAgICAgICAgICAgICQuZWFjaChkYXR0YTEsZnVuY3Rpb24oaSx2YWwpIHtcclxuICAgICAgICAgICAgICAgIGhvbWV3b3JrLnB1c2godmFsLmlkKTtcclxuICAgICAgICAgICAgICAgIG15dGltZSh2YWwsJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICBjb21wYXJldGltZShub3dUaW1lcyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291cnNlTmFtZSA9IGhvbWUuZ2V0U3ViamVjdE5hbWUodmFsLnN1YmplY3QpO1xyXG4gICAgICAgICAgICAgICAgc3RyMSArPSAnPGRpdiBjbGFzcz1cInBhcnQgaG9tZXdvcmtcIiBpZD1cIicrdmFsLmlkKydcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlsc18wNi5qcGdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5b+r5Lqk5L2c5Lia5ZWmPC9zcGFuPjxwPuaCqOWlvTo8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICt2YWwudXNlck5hbWUgKyAnPC9zcGFuPui/mOacieacquS6pOS9nOS4mu+8jOW/q+edo+S/g+S7luS6pOS9nOS4muWQp348L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICtjb3Vyc2VOYW1lKyc8L3NwYW4+77yI56ysPHNwYW4gIGNsYXNzPVwibnVtXCI+JyArdmFsLmV4dGVuZE51bSArICc8L3NwYW4+5qyhKTxzcGFuIGNsYXNzPVwiZGF0YXRpbWVcIj7miKrmraImbmJzcDsmbmJzcDs8c3Bhbj4nK2NvbXBhcmV0aW1lKG5vd1RpbWVzKSsnPC9zcGFuPiZuYnNwOycgK2VuZCsgJzwvc3Bhbj48L3NwYW4+PC9wPjwvZGl2PidcclxuICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICQoJy5tYWluJykuYXBwZW5kKHN0cjEpO1xyXG4gICAgICAgICAgICAvL+aWsOWtpuahiFxyXG4gICAgICAgICAgICAkLmVhY2goZGF0dGEyLGZ1bmN0aW9uKGksdmFsKXtcclxuICAgICAgICAgICAgICAgIG1vZHVsZS5wdXNoKHZhbC5pZCk7XHJcbiAgICAgICAgICAgICAgICBteXRpbWUodmFsLCdNTeaciGRk5pelJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgY291cnNlTmFtZSA9IGhvbWUuZ2V0U3ViamVjdE5hbWUodmFsLnN1YmplY3QpO1xyXG4gICAgICAgICAgICAgICAgc3RyMiArPSAnPGRpdiBjbGFzcz1cInBhcnQgbW9kdWxlXCIgaWQ9XCInK3ZhbC5pZCsnXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2RldGFpbHNfMDkuanBnXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPuaUtuWIsOS4gOS7veaWsOWtpuahiDwvc3Bhbj48cD7mgqjlpb066ICB5biI5Y+R5biD5LqG5paw5a2m5qGI77yM5b+r5o+Q6YaSPHNwYW4gY2xhc3M9XCJmaXJzdF9zcGFuXCI+JyArdmFsLnVzZXJOYW1lICsgJzwvc3Bhbj7pooTkuaDlkKc8L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICtjb3Vyc2VOYW1lKyAnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgK3ZhbC5leHRlbmROdW0gKyAnPC9zcGFuPuasoSk8c3BhbiBjbGFzcz1cImRhdGF0aW1lXCI+5LiK6K++Jm5ic3A7Jm5ic3AmbmJzcDs8c3BhbiBjbGFzcz1cInRpbWVcIj4nICtlbmQrICc8L3NwYW4+PC9zcGFuPjwvcD48L2Rpdj4nXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC8v5paw5L2c5LiaXHJcbiAgICAgICAgICAgICQoJy5tYWluJykuYXBwZW5kKHN0cjIpO1xyXG4gICAgICAgICAgICAkLmVhY2goZGF0dGEzLGZ1bmN0aW9uKGksdmFsKXtcclxuICAgICAgICAgICAgICAgIG5ld3dvcmsucHVzaCh2YWwuaWQpO1xyXG4gICAgICAgICAgICAgICAgbXl0aW1lKHZhbCwnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIGNvbXBhcmV0aW1lKG5vd1RpbWVzKTtcclxuICAgICAgICAgICAgICAgIHZhciBjb3Vyc2VOYW1lID0gaG9tZS5nZXRTdWJqZWN0TmFtZSh2YWwuc3ViamVjdCk7XHJcbiAgICAgICAgICAgICAgICBzdHIzICs9ICc8ZGl2IGNsYXNzPVwicGFydCBuZXd3b3JrXCIgaWQ9XCInK3ZhbC5pZCsnXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2RldGFpbHMuanBnXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPuaUtuWIsOS4gOS7veaWsOS9nOS4mjwvc3Bhbj48cD7mgqjlpb066ICB5biI5biD572u5LqG5paw5L2c5Lia77yM5b+r552j5L+DPHNwYW4gY2xhc3M9XCJmaXJzdF9zcGFuXCI+JyArdmFsLnVzZXJOYW1lICsgJzwvc3Bhbj7kvZznrZTlkKd+PC9wPjxociAvPjxwICBjbGFzcz1cImRldGFpbGVkXCI+PHNwYW4gY2xhc3M9XCJzdWJqZWN0XCI+JyArY291cnNlTmFtZSsgJzwvc3Bhbj7vvIjnrKw8c3BhbiAgY2xhc3M9XCJudW1cIj4nICt2YWwuZXh0ZW5kTnVtICsgJzwvc3Bhbj7mrKEpPHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPuaIquatoiZuYnNwOyZuYnNwPHNwYW4+Jytjb21wYXJldGltZShub3dUaW1lcykrJzwvc3Bhbj4mbmJzcDs8c3BhbiBjbGFzcz1cInRpbWVcIj4nICsgZW5kKyAnPC9zcGFuPjwvc3Bhbj48L3A+PC9kaXY+JztcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgJCgnLm1haW4nKS5hcHBlbmQoc3RyMyk7XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uICh4aHIsIHR5cGUpIHtcclxuICAgICAgICAgICAgYWxlcnQoJ0FqYXggZXJyb3IhJylcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL+WwhuS4gOS4quWwhuaXtumXtOWtmOWIsGxvY2FsU3Ryb25n6YeM6Z2i5a2Y5YKo6L+H5pyf5pe26Ze06L+b6KGM5pWw5o2u5riF6ZmkXHJcbiAgICB2YXIgbGltaXRUaW1lPSBob21lLmRhdGVGb3JtYXQoK25ldyBEYXRlKCkrMjQqNjAqNjAqMTAwMCwneXl5eSBNTSBkZCcpO1xyXG4gICAgd3NDYWNoZS5zZXQoJ2xpbWl0VGltZScsMSwge2V4cCA6bmV3IERhdGUobGltaXRUaW1lKX0pO1xyXG4gICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xpbWl0VGltZScpPT1udWxsKXtcclxuICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgLy/kuablhpnkuIDkuKrlvpfliLB1cmzlnLDlnYDnmoTlh73mlbBcclxuICAgIGZ1bmN0aW9uIGdldHVybChvcml1cmwsa2V5LHZhbCl7XHJcbiAgICAgICBsb2NhdGlvbi5ocmVmPW9yaXVybCsnPycra2V5Kyc9Jyt2YWw7XHJcbiAgICB9XHJcbiAgICB2YXIgdHlwZXN0ciA9IFsnc3BlYWsnLCAnaG9tZXdvcmsnLCAnbW9kdWxlJywgJ25ld3dvcmsnXTtcclxuICAgIHZhciB0eXBldmFsID0gW3NwZWFrLCBob21ld29yaywgbW9kdWxlLCBuZXd3b3JrXTtcclxuICAgIHZhciB0eXBlY2xhc3MgPSBbJy5zcGVhaycsICcuaG9tZXdvcmsnLCAnLm1vZHVsZScsICcubmV3d29yayddO1xyXG4gICAgLy9jbGFz5Luj6KGo6YCJ5oup5Zmo55qE57G755uudHlwZWNsYXNzXHJcbiAgICAvL3ZhbOS7o+ihqOaVsOe7hHR5cGV2YWxcclxuICAgIC8vc3Ry5Luj6KGo5qCH6K+G55qE5Y+Y6YePdHlwZXN0clxyXG4gICAgZnVuY3Rpb24gcmVhZGVkKGNsYXMsIHZhLCBzdHIpIHtcclxuICAgICAgICAkKGNsYXMpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy/lvpfliLDlvZPliY3lhYPntKDnm7jlr7nkuo7ljp/lhYjpm4blkIjnmoTkvY3nva5cclxuICAgICAgICAgICAgdmFyIG51bT0kKGNsYXMpLmluZGV4KCQodGhpcykpO1xyXG4gICAgICAgICAgICAgLy/lr7l3b3Jr5pWw57uE6L+b6KGM5b6q546v5a+55b2T5YmN54K55Ye755qE5YWD57Sg6K6+572u5LiA5LiqbG9jYWxTdG9yYWdl5pWw5YC8XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChudW0gPT0gaSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RyICsgaSwgdmFbaV0pO1xyXG4gICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKHRoaXMpLmNoaWxkcmVuKCcuZGV0YWlsZWQnKS5odG1sKCfmraTkv6Hmga/lt7Looqvor7vlj5YnKTtcclxuICAgICAgICAgICAvL+eCueWHu+eahOaXtuWAmei3s+i9rOmhtemdolxyXG4gICAgICAgICAgICB2YXIgdXJsPScnO1xyXG4gICAgICAgICAgICAvL+W+l+WIsOeCueWHu+WvueixoeeahGlk55qE5YC8XHJcbiAgICAgICAgICAgIHZhciBpZD0kKHRoaXMpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoY2xhcylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgY2FzZSAnLmhvbWV3b3JrJzpcclxuICAgICAgICAgICAgICAgICAgICB1cmw9XCJ0b2RheS13b3JrLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgICAgICBnZXR1cmwodXJsLCd3b3JraWQnLGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgY2FzZSAnLm1vZHVsZSc6XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsPVwicHJlcGFyZS5odG1sXCI7XHJcbiAgICAgICAgICAgICAgICAgICBnZXR1cmwodXJsLCd3b3JraWQnLGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+W+queOr+S+v+WIqeaJgOacieeahOaVsOWAvO+8jOWmguaenOeCueWHu+S5i+WQjuWwhuS/oeaBr+iuvue9ruaIkOW3suivu1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgIC8v5b6X5Yiw5YWD57Sg55qEaWRcclxuICAgICAgICAgICAgdmFyIG15SWQ9JChjbGFzKS5lcShpKS5hdHRyKCdpZCcpO1xyXG4gICAgICAgICAgIGlmIChteUlkPT1sb2NhbFN0b3JhZ2UuZ2V0SXRlbShzdHIgKyBpKSkge1xyXG4gICAgICAgICAgICAgICAgJChjbGFzKS5lcShpKS5jaGlsZHJlbignLmRldGFpbGVkJykuaHRtbCgn5q2k5L+h5oGv5bey6KKr6K+75Y+WJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgIH1cclxuICAgIC8v5b6q546v55qE5L6/5Yip5LiK6Z2i55qE5Ye95pWwXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIHJlYWRlZCh0eXBlY2xhc3NbaV0sIHR5cGV2YWxbaV0sIHR5cGVzdHJbaV0pO1xyXG4gICAgfVxyXG4gICAgLy9sb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvdG9kYXktc3R1ZHkuanNcbiAqKiBtb2R1bGUgaWQgPSA1OVxuICoqIG1vZHVsZSBjaHVua3MgPSAxN1xuICoqLyIsIi8qIVxyXG4gd2ViLXN0b3JhZ2UtY2FjaGUgLS0gQWRkZWQgYGV4cGlyZXNgIGF0dHJpYnV0ZSBhbmQgc2VyaWFsaXplIGRhdGEgd2l0aCBgSlNPTi5wYXJzZWAgZm9yIHRoZSBsb2NhbFN0b3JhZ2UgYW5kIHNlc3Npb25TdG9yYWdlLlxyXG4gVmVyc2lvbiAxLjAuMFxyXG4gaHR0cHM6Ly9naXRodWIuY29tL1dRVGVhbS93ZWItc3RvcmFnZS1jYWNoZVxyXG4gKGMpIDIwMTMtMjAxNiBXUVRlYW0sIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4hZnVuY3Rpb24oYSxiKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGIpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWIoKTphLldlYlN0b3JhZ2VDYWNoZT1iKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBhKGEsYil7Zm9yKHZhciBjIGluIGIpYVtjXT1iW2NdO3JldHVybiBhfWZ1bmN0aW9uIGIoYSl7dmFyIGI9ITE7aWYoYSYmYS5zZXRJdGVtKXtiPSEwO3ZhciBjPVwiX19cIitNYXRoLnJvdW5kKDFlNypNYXRoLnJhbmRvbSgpKTt0cnl7YS5zZXRJdGVtKGMsYyksYS5yZW1vdmVJdGVtKGMpfWNhdGNoKGQpe2I9ITF9fXJldHVybiBifWZ1bmN0aW9uIGMoYSl7dmFyIGI9dHlwZW9mIGE7cmV0dXJuXCJzdHJpbmdcIj09PWImJndpbmRvd1thXWluc3RhbmNlb2YgU3RvcmFnZT93aW5kb3dbYV06YX1mdW5jdGlvbiBkKGEpe3JldHVyblwiW29iamVjdCBEYXRlXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpJiYhaXNOYU4oYS5nZXRUaW1lKCkpfWZ1bmN0aW9uIGUoYSxiKXtpZihiPWJ8fG5ldyBEYXRlLFwibnVtYmVyXCI9PXR5cGVvZiBhP2E9YT09PTEvMD9sOm5ldyBEYXRlKGIuZ2V0VGltZSgpKzFlMyphKTpcInN0cmluZ1wiPT10eXBlb2YgYSYmKGE9bmV3IERhdGUoYSkpLGEmJiFkKGEpKXRocm93IG5ldyBFcnJvcihcImBleHBpcmVzYCBwYXJhbWV0ZXIgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhIHZhbGlkIERhdGUgaW5zdGFuY2VcIik7cmV0dXJuIGF9ZnVuY3Rpb24gZihhKXt2YXIgYj0hMTtpZihhKWlmKGEuY29kZSlzd2l0Y2goYS5jb2RlKXtjYXNlIDIyOmI9ITA7YnJlYWs7Y2FzZSAxMDE0OlwiTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRURcIj09PWEubmFtZSYmKGI9ITApfWVsc2UtMjE0NzAyNDg4Mj09PWEubnVtYmVyJiYoYj0hMCk7cmV0dXJuIGJ9ZnVuY3Rpb24gZyhhLGIpe3RoaXMuYz0obmV3IERhdGUpLmdldFRpbWUoKSxiPWJ8fGw7dmFyIGM9ZShiKTt0aGlzLmU9Yy5nZXRUaW1lKCksdGhpcy52PWF9ZnVuY3Rpb24gaChhKXtyZXR1cm4gYSYmXCJjXCJpbiBhJiZcImVcImluIGEmJlwidlwiaW4gYT8hMDohMX1mdW5jdGlvbiBpKGEpe3ZhciBiPShuZXcgRGF0ZSkuZ2V0VGltZSgpO3JldHVybiBiPGEuZX1mdW5jdGlvbiBqKGEpe3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoY29uc29sZS53YXJuKGErXCIgdXNlZCBhcyBhIGtleSwgYnV0IGl0IGlzIG5vdCBhIHN0cmluZy5cIiksYT1TdHJpbmcoYSkpLGF9ZnVuY3Rpb24gayhkKXt2YXIgZT17c3RvcmFnZTpcImxvY2FsU3RvcmFnZVwiLGV4cDoxLzB9LGY9YShlLGQpLGc9YyhmLnN0b3JhZ2UpLGg9YihnKTt0aGlzLmlzU3VwcG9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGh9LGg/KHRoaXMuc3RvcmFnZT1nLHRoaXMucXVvdGFFeGNlZWRIYW5kbGVyPWZ1bmN0aW9uKGEsYixjKXtpZihjb25zb2xlLndhcm4oXCJRdW90YSBleGNlZWRlZCFcIiksYyYmYy5mb3JjZT09PSEwKXt2YXIgZD10aGlzLmRlbGV0ZUFsbEV4cGlyZXMoKTtjb25zb2xlLndhcm4oXCJkZWxldGUgYWxsIGV4cGlyZXMgQ2FjaGVJdGVtIDogW1wiK2QrXCJdIGFuZCB0cnkgZXhlY3V0ZSBgc2V0YCBtZXRob2QgYWdhaW4hXCIpO3RyeXtjLmZvcmNlPSExLHRoaXMuc2V0KGEsYixjKX1jYXRjaChlKXtjb25zb2xlLndhcm4oZSl9fX0pOmEodGhpcyxuKX12YXIgbD1uZXcgRGF0ZShcIkZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgVVRDXCIpLG09e3NlcmlhbGl6ZTpmdW5jdGlvbihhKXtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSl9LGRlc2VyaWFsaXplOmZ1bmN0aW9uKGEpe3JldHVybiBhJiZKU09OLnBhcnNlKGEpfX0sbj17c2V0OmZ1bmN0aW9uKCl7fSxnZXQ6ZnVuY3Rpb24oKXt9LFwiZGVsZXRlXCI6ZnVuY3Rpb24oKXt9LGRlbGV0ZUFsbEV4cGlyZXM6ZnVuY3Rpb24oKXt9LGNsZWFyOmZ1bmN0aW9uKCl7fSxhZGQ6ZnVuY3Rpb24oKXt9LHJlcGxhY2U6ZnVuY3Rpb24oKXt9LHRvdWNoOmZ1bmN0aW9uKCl7fX0sbz17c2V0OmZ1bmN0aW9uKGIsYyxkKXtpZihiPWooYiksZD1hKHtmb3JjZTohMH0sZCksdm9pZCAwPT09YylyZXR1cm4gdGhpc1tcImRlbGV0ZVwiXShiKTt2YXIgZT1tLnNlcmlhbGl6ZShjKSxoPW5ldyBnKGUsZC5leHApO3RyeXt0aGlzLnN0b3JhZ2Uuc2V0SXRlbShiLG0uc2VyaWFsaXplKGgpKX1jYXRjaChpKXtmKGkpP3RoaXMucXVvdGFFeGNlZWRIYW5kbGVyKGIsZSxkLGkpOmNvbnNvbGUuZXJyb3IoaSl9cmV0dXJuIGN9LGdldDpmdW5jdGlvbihhKXthPWooYSk7dmFyIGI9bnVsbDt0cnl7Yj1tLmRlc2VyaWFsaXplKHRoaXMuc3RvcmFnZS5nZXRJdGVtKGEpKX1jYXRjaChjKXtyZXR1cm4gbnVsbH1pZihoKGIpKXtpZihpKGIpKXt2YXIgZD1iLnY7cmV0dXJuIG0uZGVzZXJpYWxpemUoZCl9dGhpc1tcImRlbGV0ZVwiXShhKX1yZXR1cm4gbnVsbH0sXCJkZWxldGVcIjpmdW5jdGlvbihhKXtyZXR1cm4gYT1qKGEpLHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGEpLGF9LGRlbGV0ZUFsbEV4cGlyZXM6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5zdG9yYWdlLmxlbmd0aCxiPVtdLGM9dGhpcyxkPTA7YT5kO2QrKyl7dmFyIGU9dGhpcy5zdG9yYWdlLmtleShkKSxmPW51bGw7dHJ5e2Y9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShlKSl9Y2F0Y2goZyl7fWlmKG51bGwhPT1mJiZ2b2lkIDAhPT1mLmUpe3ZhciBoPShuZXcgRGF0ZSkuZ2V0VGltZSgpO2g+PWYuZSYmYi5wdXNoKGUpfX1yZXR1cm4gYi5mb3JFYWNoKGZ1bmN0aW9uKGEpe2NbXCJkZWxldGVcIl0oYSl9KSxifSxjbGVhcjpmdW5jdGlvbigpe3RoaXMuc3RvcmFnZS5jbGVhcigpfSxhZGQ6ZnVuY3Rpb24oYixjLGQpe2I9aihiKSxkPWEoe2ZvcmNlOiEwfSxkKTt0cnl7dmFyIGU9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShiKSk7aWYoIWgoZSl8fCFpKGUpKXJldHVybiB0aGlzLnNldChiLGMsZCksITB9Y2F0Y2goZil7cmV0dXJuIHRoaXMuc2V0KGIsYyxkKSwhMH1yZXR1cm4hMX0scmVwbGFjZTpmdW5jdGlvbihhLGIsYyl7YT1qKGEpO3ZhciBkPW51bGw7dHJ5e2Q9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShhKSl9Y2F0Y2goZSl7cmV0dXJuITF9aWYoaChkKSl7aWYoaShkKSlyZXR1cm4gdGhpcy5zZXQoYSxiLGMpLCEwO3RoaXNbXCJkZWxldGVcIl0oYSl9cmV0dXJuITF9LHRvdWNoOmZ1bmN0aW9uKGEsYil7YT1qKGEpO3ZhciBjPW51bGw7dHJ5e2M9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShhKSl9Y2F0Y2goZCl7cmV0dXJuITF9aWYoaChjKSl7aWYoaShjKSlyZXR1cm4gdGhpcy5zZXQoYSx0aGlzLmdldChhKSx7ZXhwOmJ9KSwhMDt0aGlzW1wiZGVsZXRlXCJdKGEpfXJldHVybiExfX07cmV0dXJuIGsucHJvdG90eXBlPW8sa30pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvd2ViLXN0b3JhZ2UtY2FjaGUubWluLmpzXG4gKiogbW9kdWxlIGlkID0gNjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTdcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9