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

	module.exports = __webpack_require__(60);


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
	        //var baseurl='http://192.168.180.15:8998/';
	        var baseurl='http://192.168.180.15:8997/';
	        //var baseurl='http://localhost:46951/';
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
	                        alert(data);
	                         openid=data.ID;
	                        alert(openid);
	
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

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	   // alert('无数据')
	    var WebStorageCache = __webpack_require__(61);
	    var home = __webpack_require__(2);
	    //var nodedata=require('component/no-data/no-data.js');
	   // nodedata.init('main','对不起，数据暂时未加载');
	   // nodedata.module.exports.init(dom,'目前无数据')
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
	    //书写数组存储对应类的id
	    var speak = [];
	    var homework = [];
	    var module = [];
	    var newwork = [];
	   /* //声明一个数组来存储点击时候的id；
	    var clickId=[];*/
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
	            console.log(data.N);
	            //数据开始的位置
	        var  mydata={
	                "N":{
	                    "HaveClassAlertList": [//开课提醒
	                        {
	                            "subject": "02",
	                            "bgrade": "c",
	                            "dateTimes": "/Date(1461822000000)/",      //上课开始时间
	                            "title": "",       //无用
	                            "content": "",     //无用
	                            "id": "48",                                   //教案id
	                            "extendNum": 1,    			  //课次
	                            "endDateTime": "/Date(-62135596800000)/" ,  //上课结束时间
	                            "lType": 1,   //类型:1:上课提醒; 2:交作业提醒; 3:新教案提醒; 4:新作业提醒
	                            "userName": "小明",                          //用户名
	
	                        },
	                        {
	                            "subject": "03",
	                            "bgrade": "c",
	                            "dateTimes": "/Date(6461822000000)/",      //上课开始时间
	                            "title": "",       //无用
	                            "content": "",     //无用
	                            "id": "49",                                   //教案id
	                            "extendNum": 5,    			  //课次
	                            "endDateTime": "/Date(-65655596800000)/" ,  //上课结束时间
	                            "lType": 2,   //类型:1:上课提醒; 2:交作业提醒; 3:新教案提醒; 4:新作业提醒
	                            "userName": "小红",                          //用户名
	
	                        }
	                    ],
	                    "SubmitHomeWorkAlertList": [//作业提交提醒
	                        {
	                            "subject": "02",
	                            "bgrade": "",
	                            "dateTimes": "/Date(1461822000000)/",       //作业截止时间
	                            "title": "",         //无用
	                            "content": "",      //无用
	                            "id": "5",   //作业id
	                            "extendNum": 0,     //无用
	                            "endDateTime": "/Date(-62135596800000)/" ,   //无用
	                            "lType": 2,   //类型:1:上课提醒; 2:交作业提醒; 3:新教案提醒; 4:新作业提醒
	                            "userName": "小蓝",                          //用户名
	
	                        },
	                        {
	                            "subject": "00",
	                            "bgrade": "",
	                            "dateTimes": "/Date(6666822000000)/",       //作业截止时间
	                            "title": "",         //无用
	                            "content": "",      //无用
	                            "id": "6",   //作业id
	                            "extendNum": 0,     //无用
	                            "endDateTime": "/Date(-65565596800000)/"  ,  //无用
	                            "lType": 2,   //类型:1:上课提醒; 2:交作业提醒; 3:新教案提醒; 4:新作业提醒
	                            "userName": "小明",                          //用户名
	
	                        },
	                    ],
	                    "NewTeachPlanAlertList": [//新教案提醒
	                        {
	                            "subject": "03",
	                            "bgrade": "",
	                            "dateTimes": "/Date(7576822000000)/",       //上课时间
	                            "title": "",
	                            "content": "",
	                            "id": "7",       //教案id
	                            "extendNum": 11,   //课次
	                            "endDateTime": "/Date(-68405596800000)/",    //无用
	                            "lType": 3,   //类型:1:上课提醒; 2:交作业提醒; 3:新教案提醒; 4:新作业提醒
	                            "userName": "小花",                          //用户名
	
	                        },
	                        {
	                            "subject": "09",
	                            "bgrade": "",
	                            "dateTimes": "/Date(5859822000000)/",       //上课时间
	                            "title": "",
	                            "content": "",
	                            "id": "8",       //教案id
	                            "extendNum": 1,   //课次
	                            "endDateTime": "/Date(-64895596800000)/" ,   //无用
	                            "lType": 3,   //类型:1:上课提醒; 2:交作业提醒; 3:新教案提醒; 4:新作业提醒
	                            "userName": "小海",                          //用户名
	
	                        }
	                    ],
	                    "NewHomeWorkAlertList": [//新作业提醒
	                        {
	                            "subject": "01",
	                            "bgrade": "",
	                            "dateTimes": "/Date(5555822000000)/",       //截止时间
	                            "title": "",
	                            "content": "",
	                            "id": "9",   //作业id
	                            "extendNum": 10,   //无用
	                            "endDateTime": "/Date(-62135596800000)/" , //无用
	                            "lType": 4,   //类型:1:上课提醒; 2:交作业提醒; 3:新教案提醒; 4:新作业提醒
	                            "userName": "小明",                          //用户名
	
	                        },
	                        {
	                            "subject": "",
	                            "bgrade": "",
	                            "dateTimes": "/Date(6661822000000)/",       //截止时间
	                            "title": "",
	                            "content": "",
	                            "id": "10",   //作业id
	                            "extendNum": 8,   //无用
	                            "endDateTime": "/Date(-62465596800000)/",    //无用
	                            "lType": 4,   //类型:1:上课提醒; 2:交作业提醒; 3:新教案提醒; 4:新作业提醒
	                            "userName": "小小",                          //用户名
	
	                        },
	                    ]
	                }
	            }
	            console.log(mydata.N);
	            //数据结束的位置
	            //开课提醒的数据
	            var datta = mydata.N.HaveClassAlertList;
	            //交作业提醒的数据
	            var datta1 = mydata.N.SubmitHomeWorkAlertList;
	            //学案提醒的数据
	            var datta2 = mydata.N.NewTeachPlanAlertList;
	            //新作业提醒的数据
	            var datta3 = mydata.N.NewHomeWorkAlertList;
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
	                var string0 = (datta[i].dateTimes).match((/(\d)+/));
	                var start0 = home.dateFormat(+string0[0], 'hh:mm');
	                var string01 = (datta[i].endDateTime).match((/(\d)+/));
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
	    //书写一个得到url地址的函数
	    function geturl(oriurl,dom){
	        var  myidurl=$(dom).attr('id');
	        if(clas=='.speak'){//开讲了的页面的跳转
	            var oldurl=location.href;
	        }else if(clas=='.homework'){//交作业的跳转
	            var oldurl=location.href;
	        }else if(clas=='.module'){//跳转到学案的页面
	            var oldurl=location.href;
	        }else{//新作业的跳转
	            var oldurl=location.href;
	        }
	        var newurl=oldurl+'?id='+myidurl;
	        location.href=newurl;
	    }
	    var typestr = ['speak', 'homework', 'module', 'newwork'];
	    var typeval = [speak, homework, module, newwork];
	    console.log(typeval);
	    var typeclass = ['.speak', '.homework', '.module', '.newwork'];
	    //wsCache.set('detailsnums', 1, {exp : new Date('2016 5 28')});
	    //对作业处的信息进行设置
	
	    //clas代表选择器的类目typeclass
	    //val代表数组typeval
	    //str代表标识的变量typestr
	    function readed(clas, va, str) {
	         for (var i = 0; i < va.length; i++) {
	            //设置一个过期时间
	            wsCache.set('detailsnums', 1, {exp: new Date('2016 5 28')});
	            if (localStorage.getItem('detailsnums') == null){
	                $(clas).eq(i).children('.detailed').html('此信息已过期');
	            }
	        }
	        $(clas).click(function () {
	          //  alert(000)
	            //得到此时点击的元素的位置值
	            var num = $(this).index(clas);
	            //点击的时候跳转页面
	            location.href="http://localhost:63342/mfg-wechat/html/prepare.html?workid=91";
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

/***/ 61:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjQ0YmNhZjNmNGFhNTQ1ZmRhY2Q/YTUyYyoqKioqKioqKioqKiIsIndlYnBhY2s6Ly8vLi9kZXAvdXRpbC91dGlsLmpzPzIyMjEqKioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvdG9kYXktc3R1ZHkuanMiLCJ3ZWJwYWNrOi8vLy4vZGVwL3dlYi1zdG9yYWdlLWNhY2hlLm1pbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0M7QUFDeEM7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsMERBQXlEO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLEVBQUU7O0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUE4Qix1QkFBdUI7QUFDckQsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CLDBDQUEwQztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFvRDtBQUNwRCxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUN4UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsNkJBQTZCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFzRCxTQUFTLFNBQVM7QUFDeEU7O0FBRUEsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFzRCxTQUFTLFNBQVM7QUFDeEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXNELFNBQVMsU0FBUztBQUN4RTs7QUFFQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXNELFNBQVMsU0FBUztBQUN4RTs7QUFFQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFzRCxTQUFTLFNBQVM7QUFDeEU7O0FBRUEsMEJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUFzRCxTQUFTLFNBQVM7QUFDeEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXNELFNBQVMsU0FBUztBQUN4RTs7QUFFQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXNELFNBQVMsU0FBUztBQUN4RTs7QUFFQSwwQkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLFlBQVk7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGFBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9aQUFtWixhQUFhO0FBQ2hhO0FBQ0E7QUFDQSw0QkFBMkIsYUFBYTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbVpBQWtaLFdBQVc7QUFDN1o7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLGFBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtaQUFpWixhQUFhO0FBQzlaO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDRCQUEyQjtBQUMzQjtBQUNBLFVBQVMsMkJBQTJCO0FBQ3BDO0FBQ0EsVUFBUyx5QkFBeUI7QUFDbEM7QUFDQSxVQUFTLEtBQUs7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBcUMsNEJBQTRCO0FBQ2pFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXdCLGVBQWU7QUFDdkM7QUFDQSw0Q0FBMkMsMkJBQTJCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBMkIsZUFBZTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0Esd0JBQXVCLGVBQWU7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFtQixPQUFPO0FBQzFCO0FBQ0E7O0FBRUEsRUFBQzs7Ozs7Ozs7Ozs7O0FDdFJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGlhQUFrSCxpQkFBaUIsYUFBYSxnQkFBZ0IseUJBQXlCLFNBQVMsY0FBYyxTQUFTLGlCQUFpQixLQUFLLHlDQUF5QyxJQUFJLCtCQUErQixTQUFTLE1BQU0sU0FBUyxjQUFjLGVBQWUsNERBQTRELGNBQWMsK0VBQStFLGdCQUFnQiw2TUFBNk0sU0FBUyxjQUFjLFNBQVMsOEJBQThCLGFBQWEsTUFBTSx3REFBd0QsbUNBQW1DLFNBQVMsZ0JBQWdCLG1DQUFtQyxXQUFXLDRCQUE0QixjQUFjLDBDQUEwQyxjQUFjLDJCQUEyQixhQUFhLGNBQWMsb0dBQW9HLGNBQWMsT0FBTywrQkFBK0IsZ0NBQWdDLDRCQUE0QixTQUFTLDJEQUEyRCxvREFBb0QsOEJBQThCLDJGQUEyRixJQUFJLDJCQUEyQixTQUFTLGtCQUFrQixZQUFZLG1EQUFtRCxzQkFBc0IseUJBQXlCLHlCQUF5Qix5QkFBeUIsSUFBSSxnQkFBZ0IsaUJBQWlCLHNCQUFzQiw4QkFBOEIsbUJBQW1CLGlCQUFpQixxQkFBcUIsb0JBQW9CLElBQUksb0JBQW9CLGVBQWUsU0FBUyx3Q0FBd0Msc0NBQXNDLElBQUksdUNBQXVDLFNBQVMsdURBQXVELFNBQVMsaUJBQWlCLE9BQU8sV0FBVyxJQUFJLHlDQUF5QyxTQUFTLFlBQVksU0FBUyxTQUFTLFVBQVUsd0JBQXdCLGtCQUFrQixZQUFZLHNCQUFzQiwyQ0FBMkMsNkJBQTZCLDhDQUE4QyxJQUFJLEtBQUssaUNBQWlDLElBQUkseUNBQXlDLFVBQVUsMkJBQTJCLDJCQUEyQixtQkFBbUIsNkJBQTZCLGVBQWUsSUFBSSxrQkFBa0IscUJBQXFCLHFCQUFxQixZQUFZLFNBQVMsSUFBSSxJQUFJLDZDQUE2QywwQ0FBMEMsU0FBUywwQkFBMEIsU0FBUyx5QkFBeUIsT0FBTyxXQUFXLElBQUkseUNBQXlDLFNBQVMsU0FBUyxTQUFTLGtDQUFrQyxrQkFBa0IsU0FBUyxxQkFBcUIsT0FBTyxXQUFXLElBQUkseUNBQXlDLFNBQVMsU0FBUyxTQUFTLHVDQUF1QyxNQUFNLEtBQUssa0JBQWtCLFdBQVcsdUJBQXVCLEUiLCJmaWxlIjoidG9kYXktc3R1ZHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvbWZnLXdlY2hhdC9idW5kbGUvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmNDRiY2FmM2Y0YWE1NDVmZGFjZFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8yMC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzPXtcclxuICAgICAgICBzY3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZEhlaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIHZhciBzVG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XHJcbiAgICAgICAgdmFyIGNIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgaWYgKHNUb3AgKyBjSGVpZ2h0ID09IGRIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBnZXRTdWJqZWN0TmFtZTpmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgdmFyIG5hbWU9Jyc7XHJcbiAgICAgICAgc3dpdGNoIChpZC50b1N0cmluZygpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSAnMDEnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n6K+t5paHJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwMic6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfmlbDlraYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzAzJzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+iLseivrSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDQnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n54mp55CGJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwNSc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfljJblraYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA2JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+aUv+ayuyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDcnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n5Y6G5Y+yJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwOCc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSflnLDnkIYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA5JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+eUn+eJqSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0U3RhZ2VTdHI6IGZ1bmN0aW9uIChzdGFnZUlkKSB7XHJcbiAgICAgICAgdmFyIHN0YWdlSWRTdHIgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhZ2VJZCkge1xyXG4gICAgICAgICAgICBjYXNlIFwieFwiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi5bCP5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIuWIneS4rVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnXCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLpq5jkuK1cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGFnZUlkU3RyO1xyXG4gICAgfSxcclxuICAgIGdvX21lbnU6ZnVuY3Rpb24oY29uSWQpe1xyXG4gICAgICAgIHZhciBjb249ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uSWQpO1xyXG4gICAgICAgIHZhciBpbWc9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnaWQnLCdtZW51Q29udHInKTtcclxuICAgICAgICBpbWcuc3JjPScuLi9idW5kbGUvaW1nL2JvdHRvbS15dWFuLXNob3cucG5nJztcclxuICAgICAgICBjb24uYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICB2YXIgbWVudUNvbnRyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51Q29udHInKTtcclxuICAgICAgICBtZW51Q29udHIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsbWVudUJvZHksZmFsc2UpO1xyXG4gICAgICAgIGZ1bmN0aW9uIG1lbnVCb2R5KCl7XHJcbiAgICAgICAgICAgIHZhciBtZW51U2hvdz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudVNob3cnKTtcclxuICAgICAgICAgICAgaWYobWVudVNob3cpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHQ9bWVudVNob3cuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zdHVkeS1zaG93XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGlmKCB0ID09ICdkaXNwbGF5OiBub25lOycpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc3R1ZHktc2hvdzFcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPVwiLi4vYnVuZGxlL2ltZy9tZW51Mi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL2JvdHRvbS15dWFuLXNob3cucG5nXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdmFyIHNob3c9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnaWQnLCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuaW5uZXJIVE1MPSc8YSBocmVmPVwiYWZ0ZXJjbGFzc2pvYi5odG1sXCIgY2xhc3M9XCJrdHhhXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3h1ZWFuLnBuZ1wiLz48L2E+PGEgaHJlZj1cIndyb25nLWdhdGhlci5odG1sXCIgY2xhc3M9XCJreGpsXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppamluLnBuZ1wiPC9hPjxhIGhyZWY9XCJob21ld29yay1saXN0Lmh0bWxcIiAgY2xhc3M9XCJjdGpqXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppbHUucG5nXCI+PC9hPjxhIGhyZWY9XCJtb250aHdlYWsuaHRtbFwiIGNsYXNzPVwibXlyeFwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9ydW94aWFuZy5wbmdcIj48L2E+JztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdvX3N0dWR5X3Nob3c6ZnVuY3Rpb24oaW1nbG9nbyxzaG93aWQpe1xyXG4gICAgICAgICAgIHZhciBuPTE7XHJcbiAgICAgICAgICAgICQoaW1nbG9nbykucGFyZW50KFwiaDNcIikub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKG4gJTIgIT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAkKGltZ2xvZ28pLmF0dHIoXCJzcmNcIixcIi4uL2ltZy9idG0ucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoc2hvd2lkKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykuYXR0cihcInNyY1wiLFwiLi4vaW1nL3RvcC1qaWFudG91LnBuZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHNob3dpZCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICB9KX0sXHJcblxyXG4gICAgc2hvd0NvbmZpcm06ZnVuY3Rpb24obXNnLGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsYXllcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxheWVyLmNsYXNzTmFtZT1cImxheWVyXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsYXllcik7XHJcbiAgICAgICAgdmFyIGNvbmZpcm09JzxkaXYgY2xhc3M9XCJwb3Bjb25maXJtXCI+JztcclxuICAgICAgICBjb25maXJtKz0nPGRpdiBjbGFzcz1cInRpdGxlXCI+JztcclxuICAgICAgICBjb25maXJtKz0nPGkgY2xhc3M9XCJpY29uLWNsb3NlXCI+PC9pPic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8L2Rpdj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj4nK21zZysnIDwvZGl2Pic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8ZGl2IGNsYXNzPVwiZm9vdFwiPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgPGlucHV0IGNsYXNzPVwicG9wYnRuIGJ0bm9rIGNvbG9yLWdyZWVuXCIgdHlwZT1cImJ1dHRvblwiICB2YWx1ZT1cIuehruWumlwiLz4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgIDxpbnB1dCBjbGFzcz1cInBvcGJ0biBidG5jYW5jZWwgY29sb3ItZ3JlZW5cIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLlj5bmtohcIi8+JztcclxuICAgICAgICBjb25maXJtKz0nICAgPC9kaXY+PC9kaXY+JztcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGNvbmZpcm0pO1xyXG4gICAgICAgIC8vJCgnLnBvcGNvbmZpcm0nKS5jc3MoJ3RvcCcsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSQoJy5wb3Bjb25maXJtJykuaGVpZ2h0KCkpLzIpO1xyXG4gICAgICAgICQoXCIuYnRub2tcIikudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICAgJChcIi5idG5va1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLmxheWVyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBvcGNvbmZpcm1cIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmJ0bmNhbmNlbCwuaWNvbi1jbG9zZVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLmxheWVyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBvcGNvbmZpcm1cIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/kv6Hmga/mj5DnpLrmoYZcclxuICAgIHNob3dQb3BNc2c6ZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgIHZhciBodG1sPSc8ZGl2IGNsYXNzPVwicG9wbXNnXCI+PGRpdiBjbGFzcz1cImNvbnRlbnRcIj4nK21zZysnPC9kaXY+PC9kaXY+JztcclxuICAgICAgICAkKCcucG9wbXNnJykucmVtb3ZlKCk7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChodG1sKTtcclxuICAgICAgICAkKCcucG9wbXNnJykuY3NzKCdsZWZ0JywoZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAgLSQoJy5wb3Btc2cnKS53aWR0aCgpKS8yKTtcclxuICAgICAgICAkKCcucG9wbXNnJykuY3NzKCd0b3AnLChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0kKCcucG9wbXNnJykuaGVpZ2h0KCkpLzIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXskKCcucG9wbXNnJykucmVtb3ZlKCk7fSwxMDAwKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluaOpeWPo3VybCDlpoLojrflj5ZvcGVuaWQgICBnZXRBcGlVcmwoJ0FjY291bnQvR2V0T3BlbklEJylcclxuICAgIGdldEFwaVVybDpmdW5jdGlvbihhY3Rpb24pe1xyXG4gICAgICAgIC8vdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk4Lyc7XHJcbiAgICAgICAgdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk3Lyc7XHJcbiAgICAgICAgLy92YXIgYmFzZXVybD0naHR0cDovL2xvY2FsaG9zdDo0Njk1MS8nO1xyXG4gICAgICAgIHJldHVybiBiYXNldXJsK2FjdGlvbjtcclxuICAgIH0sXHJcbiAgICAvL+iwg+eUqGFwaeaIkOWKn+WQju+8jOWFiOiwg+eUqOatpOaWueazle+8jOWIpOaWreeUqOaIt+aYr+WQpuW3sue7j+e7keWumu+8jOiLpeacque7keWumu+8jOi3s+i9rOWIsOe7keWumumhtVxyXG4gICAgY2hlY2tCaW5kOmZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgIGlmKCFkYXRhLk9LKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZGF0YS5Db2RlPT0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj1cImJpbmRpbmZvLmh0bWxcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlk9wZW5JZFxyXG4gICAgZ2V0T3BlbklkOmZ1bmN0aW9uKGFwcGlkLGFwcHNlY3JldCxjb2RlKXtcclxudmFyIG9wZW5pZDtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXHJcbiAgICAgICAgICAgIGFzeW5jOmZhbHNlLFxyXG4gICAgICAgICAgICB1cmw6dGhpcy5nZXRBcGlVcmwoJ0FjY291bnQvR2V0T3BlbklEJyksXHJcbiAgICAgICAgICAgIC8vIGRhdGEgdG8gYmUgYWRkZWQgdG8gcXVlcnkgc3RyaW5nOlxyXG4gICAgICAgICAgICBkYXRhOiB7QXBwSUQ6YXBwaWQsQXBwU2VjcmV0OmFwcHNlY3JldCxDb2RlOmNvZGV9LFxyXG4gICAgICAgICAgICAvLyB0eXBlIG9mIGRhdGEgd2UgYXJlIGV4cGVjdGluZyBpbiByZXR1cm46XHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIC8vdGltZW91dDogMzAwLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIGlmKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5PSylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgb3BlbmlkPWRhdGEuSUQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KG9wZW5pZCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0FqYXggZXJyb3IhJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG9wZW5pZDtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPlnVybOWPguaVsFxyXG4gICAgZ2V0UXVlcnlTdHJpbmc6ZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgIHZhciByZWcgPSBuZXcgUmVnRXhwKFwiKF58JilcIiArIG5hbWUgKyBcIj0oW14mXSopKCZ8JClcIiwgXCJpXCIpO1xyXG4gICAgdmFyIHIgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5tYXRjaChyZWcpO1xyXG4gICAgaWYgKHIgIT0gbnVsbCkgcmV0dXJuIHVuZXNjYXBlKGRlY29kZVVSSShyWzJdKSk7IHJldHVybiBudWxsO1xyXG59LFxyXG5cclxuICAgIGRhdGVGb3JtYXQ6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCl7XHJcbiAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICB2YXIgbWFwID0ge1xyXG4gICAgICAgICAgICBcIllcIjogZGF0ZS5nZXRZZWFyKCksXHJcbiAgICAgICAgICAgIFwiTVwiOiBkYXRlLmdldE1vbnRoKCkgKyAxLCAvL+aciOS7vVxyXG4gICAgICAgICAgICBcImRcIjogZGF0ZS5nZXREYXRlKCksIC8v5pelXHJcbiAgICAgICAgICAgIFwiaFwiOiBkYXRlLmdldEhvdXJzKCksIC8v5bCP5pe2XHJcbiAgICAgICAgICAgIFwibVwiOiBkYXRlLmdldE1pbnV0ZXMoKSwgLy/liIZcclxuICAgICAgICAgICAgXCJzXCI6IGRhdGUuZ2V0U2Vjb25kcygpLCAvL+enklxyXG4gICAgICAgICAgICBcInFcIjogTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKSwgLy/lraPluqZcclxuICAgICAgICAgICAgXCJTXCI6IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkgLy/mr6vnp5JcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC8oW3lNZGhtc3FTXSkrL2csIGZ1bmN0aW9uIChhbGwsIHQpIHtcclxuICAgICAgICAgICAgdmFyIHYgPSBtYXBbdF07XHJcbiAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChhbGwubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSAnMCcgKyB2O1xyXG4gICAgICAgICAgICAgICAgICAgIHYgPSB2LnN1YnN0cih2Lmxlbmd0aCAtIDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodCA9PT0gJ3knKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGRhdGUuZ2V0RnVsbFllYXIoKSArICcnKS5zdWJzdHIoNCAtIGFsbC5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBhbGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZvcm1hdDtcclxuICAgIH0sXHJcbiAgICAvL+WkhOeQhuivlemimOWFrOW8jyBtYXRoamF4XHJcbiAgICBpbml0TWF0aEpheE9iajpmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICBNYXRoSmF4Lkh1Yi5RdWV1ZShbXCJUeXBlc2V0XCIsIE1hdGhKYXguSHViLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCldKTtcclxuICAgIH0sXHJcbiAgICBnZXRMb2NhbFRpbWU6IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZShwYXJzZUludCh2YWwucmVwbGFjZShcIi9EYXRlKFwiLCBcIlwiKS5yZXBsYWNlKFwiKS9cIiwgXCJcIiksIDEwKSk7XHJcbiAgICAgICAgICAgIHZhciB5ZWFyID0gZGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICB2YXIgbW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxIDwgMTAgPyBcIjBcIiArIChkYXRlLmdldE1vbnRoKCkgKyAxKSA6IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgIHZhciBjdXJyZW50RGF0ZSA9IGRhdGUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0RGF0ZSgpIDogZGF0ZS5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgIHZhciBob3VycyA9IGRhdGUuZ2V0SG91cnMoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldEhvdXJzKCkgOiBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgIHZhciBtaW51dGUgPSBkYXRlLmdldE1pbnV0ZXMoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldE1pbnV0ZXMoKSA6IGRhdGUuZ2V0TWludXRlcygpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHllYXIgKyBcIi1cIiArIG1vbnRoICsgXCItXCIgKyBjdXJyZW50RGF0ZSArIFwiIFwiICsgaG91cnMgKyBcIjpcIiArIG1pbnV0ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC91dGlsL3V0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyIDMgNCA3IDkgMTAgMTEgMTIgMTMgMTQgMTUgMTcgMTggMTkgMjBcbiAqKi8iLCIkKGZ1bmN0aW9uICgpIHtcclxuICAgLy8gYWxlcnQoJ+aXoOaVsOaNricpXHJcbiAgICB2YXIgV2ViU3RvcmFnZUNhY2hlID0gcmVxdWlyZSgnd2ViLXN0b3JhZ2UtY2FjaGUubWluLmpzJyk7XHJcbiAgICB2YXIgaG9tZSA9IHJlcXVpcmUoXCJ1dGlsL3V0aWxcIik7XHJcbiAgICAvL3ZhciBub2RlZGF0YT1yZXF1aXJlKCdjb21wb25lbnQvbm8tZGF0YS9uby1kYXRhLmpzJyk7XHJcbiAgIC8vIG5vZGVkYXRhLmluaXQoJ21haW4nLCflr7nkuI3otbfvvIzmlbDmja7mmoLml7bmnKrliqDovb0nKTtcclxuICAgLy8gbm9kZWRhdGEubW9kdWxlLmV4cG9ydHMuaW5pdChkb20sJ+ebruWJjeaXoOaVsOaNricpXHJcbiAgICAvL+W8leWFpeaXtumXtOiuvue9rueahOaPkuS7tlxyXG4gICAgLy8gdmFyIFdlYlN0b3JhZ2VDYWNoZSA9IHJlcXVpcmUoJ3dlYi1zdG9yYWdlLWNhY2hlLm1pbi5qcycpO1xyXG5cclxuICAgIHZhciB0b2R5dXJsID0gaG9tZS5nZXRBcGlVcmwoJ0hvbWVTY2hvb2xDb250YWN0L1RvZGF5U3R1ZHlTdGF0dXMvR2V0VG9kYXlTdHVkeVN0YXR1c0xpc3QnKTtcclxuICAgIGNvbnNvbGUubG9nKHRvZHl1cmwpO1xyXG4gICAgLy/lvpfmiZNBcHBJROWSjG9wZW5pZFxyXG4gICAgdmFyIGFwcGlkID0gc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnYXBwaWQnKTtcclxuICAgIHZhciBvcGVuaWQgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdvcGVuaWQnKTtcclxuICAgIGNvbnNvbGUubG9nKGFwcGlkKTtcclxuICAgIGNvbnNvbGUubG9nKG9wZW5pZCk7XHJcbiAgICB2YXIgd3NDYWNoZSA9IG5ldyBXZWJTdG9yYWdlQ2FjaGUoe1xyXG4gICAgICAgIHN0b3JhZ2U6ICdsb2NhbFN0b3JhZ2UnXHJcbiAgICB9KTtcclxuICAgIC8v5Lmm5YaZ5pWw57uE5a2Y5YKo5a+55bqU57G755qEaWRcclxuICAgIHZhciBzcGVhayA9IFtdO1xyXG4gICAgdmFyIGhvbWV3b3JrID0gW107XHJcbiAgICB2YXIgbW9kdWxlID0gW107XHJcbiAgICB2YXIgbmV3d29yayA9IFtdO1xyXG4gICAvKiAvL+WjsOaYjuS4gOS4quaVsOe7hOadpeWtmOWCqOeCueWHu+aXtuWAmeeahGlk77ybXHJcbiAgICB2YXIgY2xpY2tJZD1bXTsqL1xyXG4gICAgLy/or7fmsYLmlbDmja5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgIGFzeW5jOiBmYWxzZSxcclxuICAgICAgICB1cmw6IHRvZHl1cmwsXHJcbiAgICAgICAgLy8gZGF0YSB0byBiZSBhZGRlZCB0byBxdWVyeSBzdHJpbmc6XHJcbiAgICAgICAgZGF0YToge0FwcElEOiBhcHBpZCwgb3BlbklEOiBvcGVuaWR9LFxyXG4gICAgICAgIC8vIHR5cGUgb2YgZGF0YSB3ZSBhcmUgZXhwZWN0aW5nIGluIHJldHVybjpcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIC8vdGltZW91dDogMzAwLFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEuTik7XHJcbiAgICAgICAgICAgIC8v5pWw5o2u5byA5aeL55qE5L2N572uXHJcbiAgICAgICAgdmFyICBteWRhdGE9e1xyXG4gICAgICAgICAgICAgICAgXCJOXCI6e1xyXG4gICAgICAgICAgICAgICAgICAgIFwiSGF2ZUNsYXNzQWxlcnRMaXN0XCI6IFsvL+W8gOivvuaPkOmGklxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YmplY3RcIjogXCIwMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiZ3JhZGVcIjogXCJjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGVUaW1lc1wiOiBcIi9EYXRlKDE0NjE4MjIwMDAwMDApL1wiLCAgICAgIC8v5LiK6K++5byA5aeL5pe26Ze0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiXCIsICAgICAgIC8v5peg55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogXCJcIiwgICAgIC8v5peg55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiNDhcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pWZ5qGIaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXh0ZW5kTnVtXCI6IDEsICAgIFx0XHRcdCAgLy/or77mrKFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5kRGF0ZVRpbWVcIjogXCIvRGF0ZSgtNjIxMzU1OTY4MDAwMDApL1wiICwgIC8v5LiK6K++57uT5p2f5pe26Ze0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxUeXBlXCI6IDEsICAgLy/nsbvlnos6MTrkuIror77mj5DphpI7IDI65Lqk5L2c5Lia5o+Q6YaSOyAzOuaWsOaVmeahiOaPkOmGkjsgNDrmlrDkvZzkuJrmj5DphpJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogXCLlsI/mmI5cIiwgICAgICAgICAgICAgICAgICAgICAgICAgIC8v55So5oi35ZCNXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YmplY3RcIjogXCIwM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiZ3JhZGVcIjogXCJjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGVUaW1lc1wiOiBcIi9EYXRlKDY0NjE4MjIwMDAwMDApL1wiLCAgICAgIC8v5LiK6K++5byA5aeL5pe26Ze0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiXCIsICAgICAgIC8v5peg55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNvbnRlbnRcIjogXCJcIiwgICAgIC8v5peg55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiNDlcIiwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8v5pWZ5qGIaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXh0ZW5kTnVtXCI6IDUsICAgIFx0XHRcdCAgLy/or77mrKFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5kRGF0ZVRpbWVcIjogXCIvRGF0ZSgtNjU2NTU1OTY4MDAwMDApL1wiICwgIC8v5LiK6K++57uT5p2f5pe26Ze0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxUeXBlXCI6IDIsICAgLy/nsbvlnos6MTrkuIror77mj5DphpI7IDI65Lqk5L2c5Lia5o+Q6YaSOyAzOuaWsOaVmeahiOaPkOmGkjsgNDrmlrDkvZzkuJrmj5DphpJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogXCLlsI/nuqJcIiwgICAgICAgICAgICAgICAgICAgICAgICAgIC8v55So5oi35ZCNXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgICAgICAgICBcIlN1Ym1pdEhvbWVXb3JrQWxlcnRMaXN0XCI6IFsvL+S9nOS4muaPkOS6pOaPkOmGklxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YmplY3RcIjogXCIwMlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiZ3JhZGVcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZVRpbWVzXCI6IFwiL0RhdGUoMTQ2MTgyMjAwMDAwMCkvXCIsICAgICAgIC8v5L2c5Lia5oiq5q2i5pe26Ze0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiXCIsICAgICAgICAgLy/ml6DnlKhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcIlwiLCAgICAgIC8v5peg55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiNVwiLCAgIC8v5L2c5LiaaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXh0ZW5kTnVtXCI6IDAsICAgICAvL+aXoOeUqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbmREYXRlVGltZVwiOiBcIi9EYXRlKC02MjEzNTU5NjgwMDAwMCkvXCIgLCAgIC8v5peg55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxUeXBlXCI6IDIsICAgLy/nsbvlnos6MTrkuIror77mj5DphpI7IDI65Lqk5L2c5Lia5o+Q6YaSOyAzOuaWsOaVmeahiOaPkOmGkjsgNDrmlrDkvZzkuJrmj5DphpJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogXCLlsI/ok51cIiwgICAgICAgICAgICAgICAgICAgICAgICAgIC8v55So5oi35ZCNXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN1YmplY3RcIjogXCIwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJiZ3JhZGVcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0ZVRpbWVzXCI6IFwiL0RhdGUoNjY2NjgyMjAwMDAwMCkvXCIsICAgICAgIC8v5L2c5Lia5oiq5q2i5pe26Ze0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInRpdGxlXCI6IFwiXCIsICAgICAgICAgLy/ml6DnlKhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcIlwiLCAgICAgIC8v5peg55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiNlwiLCAgIC8v5L2c5LiaaWRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZXh0ZW5kTnVtXCI6IDAsICAgICAvL+aXoOeUqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbmREYXRlVGltZVwiOiBcIi9EYXRlKC02NTU2NTU5NjgwMDAwMCkvXCIgICwgIC8v5peg55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxUeXBlXCI6IDIsICAgLy/nsbvlnos6MTrkuIror77mj5DphpI7IDI65Lqk5L2c5Lia5o+Q6YaSOyAzOuaWsOaVmeahiOaPkOmGkjsgNDrmlrDkvZzkuJrmj5DphpJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogXCLlsI/mmI5cIiwgICAgICAgICAgICAgICAgICAgICAgICAgIC8v55So5oi35ZCNXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJOZXdUZWFjaFBsYW5BbGVydExpc3RcIjogWy8v5paw5pWZ5qGI5o+Q6YaSXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViamVjdFwiOiBcIjAzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJncmFkZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRlVGltZXNcIjogXCIvRGF0ZSg3NTc2ODIyMDAwMDAwKS9cIiwgICAgICAgLy/kuIror77ml7bpl7RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIjdcIiwgICAgICAgLy/mlZnmoYhpZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJleHRlbmROdW1cIjogMTEsICAgLy/or77mrKFcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZW5kRGF0ZVRpbWVcIjogXCIvRGF0ZSgtNjg0MDU1OTY4MDAwMDApL1wiLCAgICAvL+aXoOeUqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsVHlwZVwiOiAzLCAgIC8v57G75Z6LOjE65LiK6K++5o+Q6YaSOyAyOuS6pOS9nOS4muaPkOmGkjsgMzrmlrDmlZnmoYjmj5DphpI7IDQ65paw5L2c5Lia5o+Q6YaSXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJOYW1lXCI6IFwi5bCP6IqxXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAvL+eUqOaIt+WQjVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJqZWN0XCI6IFwiMDlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYmdyYWRlXCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImRhdGVUaW1lc1wiOiBcIi9EYXRlKDU4NTk4MjIwMDAwMDApL1wiLCAgICAgICAvL+S4iuivvuaXtumXtFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aXRsZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb250ZW50XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IFwiOFwiLCAgICAgICAvL+aVmeahiGlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV4dGVuZE51bVwiOiAxLCAgIC8v6K++5qyhXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImVuZERhdGVUaW1lXCI6IFwiL0RhdGUoLTY0ODk1NTk2ODAwMDAwKS9cIiAsICAgLy/ml6DnlKhcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibFR5cGVcIjogMywgICAvL+exu+WeizoxOuS4iuivvuaPkOmGkjsgMjrkuqTkvZzkuJrmj5DphpI7IDM65paw5pWZ5qGI5o+Q6YaSOyA0OuaWsOS9nOS4muaPkOmGklxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ1c2VyTmFtZVwiOiBcIuWwj+a1t1wiLCAgICAgICAgICAgICAgICAgICAgICAgICAgLy/nlKjmiLflkI1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiTmV3SG9tZVdvcmtBbGVydExpc3RcIjogWy8v5paw5L2c5Lia5o+Q6YaSXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3ViamVjdFwiOiBcIjAxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJncmFkZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRlVGltZXNcIjogXCIvRGF0ZSg1NTU1ODIyMDAwMDAwKS9cIiwgICAgICAgLy/miKrmraLml7bpl7RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIjlcIiwgICAvL+S9nOS4mmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImV4dGVuZE51bVwiOiAxMCwgICAvL+aXoOeUqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbmREYXRlVGltZVwiOiBcIi9EYXRlKC02MjEzNTU5NjgwMDAwMCkvXCIgLCAvL+aXoOeUqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsVHlwZVwiOiA0LCAgIC8v57G75Z6LOjE65LiK6K++5o+Q6YaSOyAyOuS6pOS9nOS4muaPkOmGkjsgMzrmlrDmlZnmoYjmj5DphpI7IDQ65paw5L2c5Lia5o+Q6YaSXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInVzZXJOYW1lXCI6IFwi5bCP5piOXCIsICAgICAgICAgICAgICAgICAgICAgICAgICAvL+eUqOaIt+WQjVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzdWJqZWN0XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJncmFkZVwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRlVGltZXNcIjogXCIvRGF0ZSg2NjYxODIyMDAwMDAwKS9cIiwgICAgICAgLy/miKrmraLml7bpl7RcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidGl0bGVcIjogXCJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY29udGVudFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBcIjEwXCIsICAgLy/kvZzkuJppZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJleHRlbmROdW1cIjogOCwgICAvL+aXoOeUqFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJlbmREYXRlVGltZVwiOiBcIi9EYXRlKC02MjQ2NTU5NjgwMDAwMCkvXCIsICAgIC8v5peg55SoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxUeXBlXCI6IDQsICAgLy/nsbvlnos6MTrkuIror77mj5DphpI7IDI65Lqk5L2c5Lia5o+Q6YaSOyAzOuaWsOaVmeahiOaPkOmGkjsgNDrmlrDkvZzkuJrmj5DphpJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidXNlck5hbWVcIjogXCLlsI/lsI9cIiwgICAgICAgICAgICAgICAgICAgICAgICAgIC8v55So5oi35ZCNXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhteWRhdGEuTik7XHJcbiAgICAgICAgICAgIC8v5pWw5o2u57uT5p2f55qE5L2N572uXHJcbiAgICAgICAgICAgIC8v5byA6K++5o+Q6YaS55qE5pWw5o2uXHJcbiAgICAgICAgICAgIHZhciBkYXR0YSA9IG15ZGF0YS5OLkhhdmVDbGFzc0FsZXJ0TGlzdDtcclxuICAgICAgICAgICAgLy/kuqTkvZzkuJrmj5DphpLnmoTmlbDmja5cclxuICAgICAgICAgICAgdmFyIGRhdHRhMSA9IG15ZGF0YS5OLlN1Ym1pdEhvbWVXb3JrQWxlcnRMaXN0O1xyXG4gICAgICAgICAgICAvL+WtpuahiOaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGEyID0gbXlkYXRhLk4uTmV3VGVhY2hQbGFuQWxlcnRMaXN0O1xyXG4gICAgICAgICAgICAvL+aWsOS9nOS4muaPkOmGkueahOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgZGF0dGEzID0gbXlkYXRhLk4uTmV3SG9tZVdvcmtBbGVydExpc3Q7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBkYXR0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBsZW5ndGgxID0gZGF0dGExLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyIGxlbmd0aDIgPSBkYXR0YTIubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgbGVuZ3RoMyA9IGRhdHRhMy5sZW5ndGg7XHJcbiAgICAgICAgICAgIHZhciBzdHIgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjEgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjIgPSAnJztcclxuICAgICAgICAgICAgdmFyIHN0cjMgPSAnJztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgLy/lsIZJZOWtmOWIsOaVsOe7hOmHjOmdolxyXG4gICAgICAgICAgICAgICAgc3BlYWsucHVzaChkYXR0YVtpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMCA9IChkYXR0YVtpXS5kYXRlVGltZXMpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0MCA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMFswXSwgJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMDEgPSAoZGF0dGFbaV0uZW5kRGF0ZVRpbWUpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGVuZDAgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzAxWzBdLCAnaGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHN0ciArPSAnPGRpdiBjbGFzcz1cInBhcnQgc3BlYWtcIiBpZD1cIicgKyBkYXR0YVtpXS5pZCArICdcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlsc18wMy5wbmdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5byA6K6y5ZWmPC9zcGFuPjxwPuaCqOWlvTo8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICsgZGF0dGFbaV0udXNlck5hbWUgKyAnPC9zcGFuPuS7iuWkqeacieivvu+8jOW/q+aPkOmGkuS7luS4iuivvuWQp348L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICsgZGF0dGFbaV0uc3ViamVjdCArICc8L3NwYW4+77yI56ysPHNwYW4gIGNsYXNzPVwibnVtXCI+JyArIGRhdHRhW2ldLmV4dGVuZE51bSArICc8L3NwYW4+5qyhKTxzcGFuIGNsYXNzPVwiZGF0YXRpbWVcIj4nICsgc3RhcnQwICsgJzwvc3Bhbj5+PHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPicgKyBlbmQwICsgJzwvc3Bhbj48L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5tYWluJykuYXBwZW5kKHN0cik7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoMTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBob21ld29yay5wdXNoKGRhdHRhMVtpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMSA9IChkYXR0YTFbaV0uZGF0ZVRpbWVzKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGFydDEgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzFbMF0sICd5eXl5Ok1NOmRkOmhoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMTEgPSAoZGF0dGExW2ldLmVuZERhdGVUaW1lKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHZhciBlbmQxID0gaG9tZS5kYXRlRm9ybWF0KCtzdHJpbmcxMVswXSwgJ3l5eXk6TU06ZGQ6aGg6bW0nKTtcclxuICAgICAgICAgICAgICAgIHN0cjEgKz0gJzxkaXYgY2xhc3M9XCJwYXJ0IGhvbWV3b3JrXCIgaWQ9XCInICsgZGF0dGExW2ldLmlkICsgJ1wiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9kZXRhaWxzXzA2LmpwZ1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj7lv6vkuqTkvZzkuJrllaY8L3NwYW4+PHA+5oKo5aW9OjxzcGFuIGNsYXNzPVwiZmlyc3Rfc3BhblwiPicgKyBkYXR0YTFbaV0udXNlck5hbWUgKyAnPC9zcGFuPui/mOacieacquS6pOS9nOS4mu+8jOW/q+edo+S/g+S7luS6pOS9nOS4muWQp348L3A+PGhyIC8+PHAgIGNsYXNzPVwiZGV0YWlsZWRcIj48c3BhbiBjbGFzcz1cInN1YmplY3RcIj4nICsgZGF0dGExW2ldLnN1YmplY3QgKyAnPC9zcGFuPu+8iOesrDxzcGFuICBjbGFzcz1cIm51bVwiPicgKyBkYXR0YTFbaV0uZXh0ZW5kTnVtICsgJzwvc3Bhbj7mrKEpPHNwYW4gY2xhc3M9XCJkYXRhdGltZVwiPuaIquatoiZuYnNwOyZuYnNw5piO5aSpJm5ic3A7JyArIGVuZDEgKyAnPC9zcGFuPjwvc3Bhbj48L3A+PC9kaXY+J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQoJy5tYWluJykuYXBwZW5kKHN0cjEpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbW9kdWxlLnB1c2goZGF0dGEyW2ldLmlkKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdHJpbmcyID0gKGRhdHRhMltpXS5kYXRlVGltZXMpLm1hdGNoKCgvKFxcZCkrLykpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0MiA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMlswXSwgJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMjEgPSAoZGF0dGEyW2ldLmVuZERhdGVUaW1lKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHZhciBlbmQyID0gaG9tZS5kYXRlRm9ybWF0KCtzdHJpbmcyMVswXSwgJ2hoOm1tJyk7XHJcbiAgICAgICAgICAgICAgICBzdHIyICs9ICc8ZGl2IGNsYXNzPVwicGFydCBtb2R1bGVcIiBpZD1cIicgKyBkYXR0YTJbaV0uaWQgKyAnXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2RldGFpbHNfMDkuanBnXCI+PHNwYW4gY2xhc3M9XCJ0aXRsZVwiPuaUtuWIsOS4gOS7veaWsOWtpuahiDwvc3Bhbj48cD7mgqjlpb066ICB5biI5Y+R5biD5LqG5paw5a2m5qGI77yM5b+r5o+Q6YaSPHNwYW4gY2xhc3M9XCJmaXJzdF9zcGFuXCI+JyArIGRhdHRhMltpXS51c2VyTmFtZSArICc8L3NwYW4+6aKE5Lmg5ZCnPC9wPjxociAvPjxwICBjbGFzcz1cImRldGFpbGVkXCI+PHNwYW4gY2xhc3M9XCJzdWJqZWN0XCI+JyArIGRhdHRhMltpXS5zdWJqZWN0ICsgJzwvc3Bhbj7vvIjnrKw8c3BhbiAgY2xhc3M9XCJudW1cIj4nICsgZGF0dGEyW2ldLmV4dGVuZE51bSArICc8L3NwYW4+5qyhKTxzcGFuIGNsYXNzPVwiZGF0YXRpbWVcIj7kuIror74mbmJzcDsmbmJzcCZuYnNwOzxzcGFuIGNsYXNzPVwidGltZVwiPicgKyBlbmQyICsgJzwvc3Bhbj48L3NwYW4+PC9wPjwvZGl2PidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICA7XHJcbiAgICAgICAgICAgICQoJy5tYWluJykuYXBwZW5kKHN0cjIpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbmV3d29yay5wdXNoKGRhdHRhM1tpXS5pZCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RyaW5nMyA9IChkYXR0YTNbaV0uZGF0ZVRpbWVzKS5tYXRjaCgoLyhcXGQpKy8pKTtcclxuICAgICAgICAgICAgICAgIHZhciBzdGFydDMgPSBob21lLmRhdGVGb3JtYXQoK3N0cmluZzNbMF0sICdoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZzMxID0gKGRhdHRhM1tpXS5lbmREYXRlVGltZSkubWF0Y2goKC8oXFxkKSsvKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgZW5kMyA9IGhvbWUuZGF0ZUZvcm1hdCgrc3RyaW5nMzFbMF0sICdoaDptbScpO1xyXG4gICAgICAgICAgICAgICAgc3RyMyArPSAnPGRpdiBjbGFzcz1cInBhcnQgbmV3d29ya1wiIGlkPVwiJyArIGRhdHRhM1tpXS5pZCArICdcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvZGV0YWlscy5qcGdcIj48c3BhbiBjbGFzcz1cInRpdGxlXCI+5pS25Yiw5LiA5Lu95paw5L2c5LiaPC9zcGFuPjxwPuaCqOWlvTrogIHluIjluIPnva7kuobmlrDkvZzkuJrvvIzlv6vnnaPkv4M8c3BhbiBjbGFzcz1cImZpcnN0X3NwYW5cIj4nICsgZGF0dGEzW2ldLnVzZXJOYW1lICsgJzwvc3Bhbj7kvZznrZTlkKd+PC9wPjxociAvPjxwICBjbGFzcz1cImRldGFpbGVkXCI+PHNwYW4gY2xhc3M9XCJzdWJqZWN0XCI+JyArIGRhdHRhM1tpXS5zdWJqZWN0ICsgJzwvc3Bhbj7vvIjnrKw8c3BhbiAgY2xhc3M9XCJudW1cIj4nICsgZGF0dGEzW2ldLmV4dGVuZE51bSArICc8L3NwYW4+5qyhKTxzcGFuIGNsYXNzPVwiZGF0YXRpbWVcIj7miKrmraImbmJzcDsmbmJzcOaYjuWkqSZuYnNwOzxzcGFuIGNsYXNzPVwidGltZVwiPicgKyBlbmQzICsgJzwvc3Bhbj48L3NwYW4+PC9wPjwvZGl2PidcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkKCcubWFpbicpLmFwcGVuZChzdHIzKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCB0eXBlKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCdBamF4IGVycm9yIScpXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvL+S5puWGmeS4gOS4quW+l+WIsHVybOWcsOWdgOeahOWHveaVsFxyXG4gICAgZnVuY3Rpb24gZ2V0dXJsKG9yaXVybCxkb20pe1xyXG4gICAgICAgIHZhciAgbXlpZHVybD0kKGRvbSkuYXR0cignaWQnKTtcclxuICAgICAgICBpZihjbGFzPT0nLnNwZWFrJyl7Ly/lvIDorrLkuobnmoTpobXpnaLnmoTot7PovaxcclxuICAgICAgICAgICAgdmFyIG9sZHVybD1sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIH1lbHNlIGlmKGNsYXM9PScuaG9tZXdvcmsnKXsvL+S6pOS9nOS4mueahOi3s+i9rFxyXG4gICAgICAgICAgICB2YXIgb2xkdXJsPWxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgfWVsc2UgaWYoY2xhcz09Jy5tb2R1bGUnKXsvL+i3s+i9rOWIsOWtpuahiOeahOmhtemdolxyXG4gICAgICAgICAgICB2YXIgb2xkdXJsPWxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgfWVsc2V7Ly/mlrDkvZzkuJrnmoTot7PovaxcclxuICAgICAgICAgICAgdmFyIG9sZHVybD1sb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3dXJsPW9sZHVybCsnP2lkPScrbXlpZHVybDtcclxuICAgICAgICBsb2NhdGlvbi5ocmVmPW5ld3VybDtcclxuICAgIH1cclxuICAgIHZhciB0eXBlc3RyID0gWydzcGVhaycsICdob21ld29yaycsICdtb2R1bGUnLCAnbmV3d29yayddO1xyXG4gICAgdmFyIHR5cGV2YWwgPSBbc3BlYWssIGhvbWV3b3JrLCBtb2R1bGUsIG5ld3dvcmtdO1xyXG4gICAgY29uc29sZS5sb2codHlwZXZhbCk7XHJcbiAgICB2YXIgdHlwZWNsYXNzID0gWycuc3BlYWsnLCAnLmhvbWV3b3JrJywgJy5tb2R1bGUnLCAnLm5ld3dvcmsnXTtcclxuICAgIC8vd3NDYWNoZS5zZXQoJ2RldGFpbHNudW1zJywgMSwge2V4cCA6IG5ldyBEYXRlKCcyMDE2IDUgMjgnKX0pO1xyXG4gICAgLy/lr7nkvZzkuJrlpITnmoTkv6Hmga/ov5vooYzorr7nva5cclxuXHJcbiAgICAvL2NsYXPku6PooajpgInmi6nlmajnmoTnsbvnm650eXBlY2xhc3NcclxuICAgIC8vdmFs5Luj6KGo5pWw57uEdHlwZXZhbFxyXG4gICAgLy9zdHLku6PooajmoIfor4bnmoTlj5jph490eXBlc3RyXHJcbiAgICBmdW5jdGlvbiByZWFkZWQoY2xhcywgdmEsIHN0cikge1xyXG4gICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8v6K6+572u5LiA5Liq6L+H5pyf5pe26Ze0XHJcbiAgICAgICAgICAgIHdzQ2FjaGUuc2V0KCdkZXRhaWxzbnVtcycsIDEsIHtleHA6IG5ldyBEYXRlKCcyMDE2IDUgMjgnKX0pO1xyXG4gICAgICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RldGFpbHNudW1zJykgPT0gbnVsbCl7XHJcbiAgICAgICAgICAgICAgICAkKGNsYXMpLmVxKGkpLmNoaWxkcmVuKCcuZGV0YWlsZWQnKS5odG1sKCfmraTkv6Hmga/lt7Lov4fmnJ8nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAkKGNsYXMpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIC8vICBhbGVydCgwMDApXHJcbiAgICAgICAgICAgIC8v5b6X5Yiw5q2k5pe254K55Ye755qE5YWD57Sg55qE5L2N572u5YC8XHJcbiAgICAgICAgICAgIHZhciBudW0gPSAkKHRoaXMpLmluZGV4KGNsYXMpO1xyXG4gICAgICAgICAgICAvL+eCueWHu+eahOaXtuWAmei3s+i9rOmhtemdolxyXG4gICAgICAgICAgICBsb2NhdGlvbi5ocmVmPVwiaHR0cDovL2xvY2FsaG9zdDo2MzM0Mi9tZmctd2VjaGF0L2h0bWwvcHJlcGFyZS5odG1sP3dvcmtpZD05MVwiO1xyXG4gICAgICAgICAgICAvL+WvuXdvcmvmlbDnu4Tov5vooYzlvqrnjq/lr7nlvZPliY3ngrnlh7vnmoTlhYPntKDorr7nva7kuIDkuKpsb2NhbFN0b3JhZ2XmlbDlgLxcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bSA9PSBpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oc3RyICsgaSwgdmFbaV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oJy5kZXRhaWxlZCcpLmh0bWwoJ+atpOS/oeaBr+W3suiiq+ivu+WPlicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8v5b6q546v5L6/5Yip5omA5pyJ55qE5pWw5YC877yM5aaC5p6c54K55Ye75LmL5ZCO5bCG5L+h5oGv6K6+572u5oiQ5bey6K+7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgLy/lvpfliLDlhYPntKDnmoRpZFxyXG4gICAgICAgICAgICB2YXIgbXlJZD0kKGNsYXMpLmVxKGkpLmF0dHIoJ2lkJyk7XHJcbiAgICAgICAgICAgaWYgKG15SWQ9PWxvY2FsU3RvcmFnZS5nZXRJdGVtKHN0ciArIGkpKSB7XHJcbiAgICAgICAgICAgICAgICAkKGNsYXMpLmVxKGkpLmNoaWxkcmVuKCcuZGV0YWlsZWQnKS5odG1sKCfmraTkv6Hmga/lt7Looqvor7vlj5YnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8v5b6q546v55qE5L6/5Yip5LiK6Z2i55qE5Ye95pWwXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgIHJlYWRlZCh0eXBlY2xhc3NbaV0sIHR5cGV2YWxbaV0sIHR5cGVzdHJbaV0pO1xyXG4gICAgfVxyXG5cclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvdG9kYXktc3R1ZHkuanNcbiAqKiBtb2R1bGUgaWQgPSA2MFxuICoqIG1vZHVsZSBjaHVua3MgPSAxN1xuICoqLyIsIi8qIVxyXG4gd2ViLXN0b3JhZ2UtY2FjaGUgLS0gQWRkZWQgYGV4cGlyZXNgIGF0dHJpYnV0ZSBhbmQgc2VyaWFsaXplIGRhdGEgd2l0aCBgSlNPTi5wYXJzZWAgZm9yIHRoZSBsb2NhbFN0b3JhZ2UgYW5kIHNlc3Npb25TdG9yYWdlLlxyXG4gVmVyc2lvbiAxLjAuMFxyXG4gaHR0cHM6Ly9naXRodWIuY29tL1dRVGVhbS93ZWItc3RvcmFnZS1jYWNoZVxyXG4gKGMpIDIwMTMtMjAxNiBXUVRlYW0sIE1JVCBsaWNlbnNlXHJcbiAqL1xyXG4hZnVuY3Rpb24oYSxiKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKGIpOlwib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzP21vZHVsZS5leHBvcnRzPWIoKTphLldlYlN0b3JhZ2VDYWNoZT1iKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBhKGEsYil7Zm9yKHZhciBjIGluIGIpYVtjXT1iW2NdO3JldHVybiBhfWZ1bmN0aW9uIGIoYSl7dmFyIGI9ITE7aWYoYSYmYS5zZXRJdGVtKXtiPSEwO3ZhciBjPVwiX19cIitNYXRoLnJvdW5kKDFlNypNYXRoLnJhbmRvbSgpKTt0cnl7YS5zZXRJdGVtKGMsYyksYS5yZW1vdmVJdGVtKGMpfWNhdGNoKGQpe2I9ITF9fXJldHVybiBifWZ1bmN0aW9uIGMoYSl7dmFyIGI9dHlwZW9mIGE7cmV0dXJuXCJzdHJpbmdcIj09PWImJndpbmRvd1thXWluc3RhbmNlb2YgU3RvcmFnZT93aW5kb3dbYV06YX1mdW5jdGlvbiBkKGEpe3JldHVyblwiW29iamVjdCBEYXRlXVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpJiYhaXNOYU4oYS5nZXRUaW1lKCkpfWZ1bmN0aW9uIGUoYSxiKXtpZihiPWJ8fG5ldyBEYXRlLFwibnVtYmVyXCI9PXR5cGVvZiBhP2E9YT09PTEvMD9sOm5ldyBEYXRlKGIuZ2V0VGltZSgpKzFlMyphKTpcInN0cmluZ1wiPT10eXBlb2YgYSYmKGE9bmV3IERhdGUoYSkpLGEmJiFkKGEpKXRocm93IG5ldyBFcnJvcihcImBleHBpcmVzYCBwYXJhbWV0ZXIgY2Fubm90IGJlIGNvbnZlcnRlZCB0byBhIHZhbGlkIERhdGUgaW5zdGFuY2VcIik7cmV0dXJuIGF9ZnVuY3Rpb24gZihhKXt2YXIgYj0hMTtpZihhKWlmKGEuY29kZSlzd2l0Y2goYS5jb2RlKXtjYXNlIDIyOmI9ITA7YnJlYWs7Y2FzZSAxMDE0OlwiTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRURcIj09PWEubmFtZSYmKGI9ITApfWVsc2UtMjE0NzAyNDg4Mj09PWEubnVtYmVyJiYoYj0hMCk7cmV0dXJuIGJ9ZnVuY3Rpb24gZyhhLGIpe3RoaXMuYz0obmV3IERhdGUpLmdldFRpbWUoKSxiPWJ8fGw7dmFyIGM9ZShiKTt0aGlzLmU9Yy5nZXRUaW1lKCksdGhpcy52PWF9ZnVuY3Rpb24gaChhKXtyZXR1cm4gYSYmXCJjXCJpbiBhJiZcImVcImluIGEmJlwidlwiaW4gYT8hMDohMX1mdW5jdGlvbiBpKGEpe3ZhciBiPShuZXcgRGF0ZSkuZ2V0VGltZSgpO3JldHVybiBiPGEuZX1mdW5jdGlvbiBqKGEpe3JldHVyblwic3RyaW5nXCIhPXR5cGVvZiBhJiYoY29uc29sZS53YXJuKGErXCIgdXNlZCBhcyBhIGtleSwgYnV0IGl0IGlzIG5vdCBhIHN0cmluZy5cIiksYT1TdHJpbmcoYSkpLGF9ZnVuY3Rpb24gayhkKXt2YXIgZT17c3RvcmFnZTpcImxvY2FsU3RvcmFnZVwiLGV4cDoxLzB9LGY9YShlLGQpLGc9YyhmLnN0b3JhZ2UpLGg9YihnKTt0aGlzLmlzU3VwcG9ydGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGh9LGg/KHRoaXMuc3RvcmFnZT1nLHRoaXMucXVvdGFFeGNlZWRIYW5kbGVyPWZ1bmN0aW9uKGEsYixjKXtpZihjb25zb2xlLndhcm4oXCJRdW90YSBleGNlZWRlZCFcIiksYyYmYy5mb3JjZT09PSEwKXt2YXIgZD10aGlzLmRlbGV0ZUFsbEV4cGlyZXMoKTtjb25zb2xlLndhcm4oXCJkZWxldGUgYWxsIGV4cGlyZXMgQ2FjaGVJdGVtIDogW1wiK2QrXCJdIGFuZCB0cnkgZXhlY3V0ZSBgc2V0YCBtZXRob2QgYWdhaW4hXCIpO3RyeXtjLmZvcmNlPSExLHRoaXMuc2V0KGEsYixjKX1jYXRjaChlKXtjb25zb2xlLndhcm4oZSl9fX0pOmEodGhpcyxuKX12YXIgbD1uZXcgRGF0ZShcIkZyaSwgMzEgRGVjIDk5OTkgMjM6NTk6NTkgVVRDXCIpLG09e3NlcmlhbGl6ZTpmdW5jdGlvbihhKXtyZXR1cm4gSlNPTi5zdHJpbmdpZnkoYSl9LGRlc2VyaWFsaXplOmZ1bmN0aW9uKGEpe3JldHVybiBhJiZKU09OLnBhcnNlKGEpfX0sbj17c2V0OmZ1bmN0aW9uKCl7fSxnZXQ6ZnVuY3Rpb24oKXt9LFwiZGVsZXRlXCI6ZnVuY3Rpb24oKXt9LGRlbGV0ZUFsbEV4cGlyZXM6ZnVuY3Rpb24oKXt9LGNsZWFyOmZ1bmN0aW9uKCl7fSxhZGQ6ZnVuY3Rpb24oKXt9LHJlcGxhY2U6ZnVuY3Rpb24oKXt9LHRvdWNoOmZ1bmN0aW9uKCl7fX0sbz17c2V0OmZ1bmN0aW9uKGIsYyxkKXtpZihiPWooYiksZD1hKHtmb3JjZTohMH0sZCksdm9pZCAwPT09YylyZXR1cm4gdGhpc1tcImRlbGV0ZVwiXShiKTt2YXIgZT1tLnNlcmlhbGl6ZShjKSxoPW5ldyBnKGUsZC5leHApO3RyeXt0aGlzLnN0b3JhZ2Uuc2V0SXRlbShiLG0uc2VyaWFsaXplKGgpKX1jYXRjaChpKXtmKGkpP3RoaXMucXVvdGFFeGNlZWRIYW5kbGVyKGIsZSxkLGkpOmNvbnNvbGUuZXJyb3IoaSl9cmV0dXJuIGN9LGdldDpmdW5jdGlvbihhKXthPWooYSk7dmFyIGI9bnVsbDt0cnl7Yj1tLmRlc2VyaWFsaXplKHRoaXMuc3RvcmFnZS5nZXRJdGVtKGEpKX1jYXRjaChjKXtyZXR1cm4gbnVsbH1pZihoKGIpKXtpZihpKGIpKXt2YXIgZD1iLnY7cmV0dXJuIG0uZGVzZXJpYWxpemUoZCl9dGhpc1tcImRlbGV0ZVwiXShhKX1yZXR1cm4gbnVsbH0sXCJkZWxldGVcIjpmdW5jdGlvbihhKXtyZXR1cm4gYT1qKGEpLHRoaXMuc3RvcmFnZS5yZW1vdmVJdGVtKGEpLGF9LGRlbGV0ZUFsbEV4cGlyZXM6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5zdG9yYWdlLmxlbmd0aCxiPVtdLGM9dGhpcyxkPTA7YT5kO2QrKyl7dmFyIGU9dGhpcy5zdG9yYWdlLmtleShkKSxmPW51bGw7dHJ5e2Y9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShlKSl9Y2F0Y2goZyl7fWlmKG51bGwhPT1mJiZ2b2lkIDAhPT1mLmUpe3ZhciBoPShuZXcgRGF0ZSkuZ2V0VGltZSgpO2g+PWYuZSYmYi5wdXNoKGUpfX1yZXR1cm4gYi5mb3JFYWNoKGZ1bmN0aW9uKGEpe2NbXCJkZWxldGVcIl0oYSl9KSxifSxjbGVhcjpmdW5jdGlvbigpe3RoaXMuc3RvcmFnZS5jbGVhcigpfSxhZGQ6ZnVuY3Rpb24oYixjLGQpe2I9aihiKSxkPWEoe2ZvcmNlOiEwfSxkKTt0cnl7dmFyIGU9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShiKSk7aWYoIWgoZSl8fCFpKGUpKXJldHVybiB0aGlzLnNldChiLGMsZCksITB9Y2F0Y2goZil7cmV0dXJuIHRoaXMuc2V0KGIsYyxkKSwhMH1yZXR1cm4hMX0scmVwbGFjZTpmdW5jdGlvbihhLGIsYyl7YT1qKGEpO3ZhciBkPW51bGw7dHJ5e2Q9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShhKSl9Y2F0Y2goZSl7cmV0dXJuITF9aWYoaChkKSl7aWYoaShkKSlyZXR1cm4gdGhpcy5zZXQoYSxiLGMpLCEwO3RoaXNbXCJkZWxldGVcIl0oYSl9cmV0dXJuITF9LHRvdWNoOmZ1bmN0aW9uKGEsYil7YT1qKGEpO3ZhciBjPW51bGw7dHJ5e2M9bS5kZXNlcmlhbGl6ZSh0aGlzLnN0b3JhZ2UuZ2V0SXRlbShhKSl9Y2F0Y2goZCl7cmV0dXJuITF9aWYoaChjKSl7aWYoaShjKSlyZXR1cm4gdGhpcy5zZXQoYSx0aGlzLmdldChhKSx7ZXhwOmJ9KSwhMDt0aGlzW1wiZGVsZXRlXCJdKGEpfXJldHVybiExfX07cmV0dXJuIGsucHJvdG90eXBlPW8sa30pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvd2ViLXN0b3JhZ2UtY2FjaGUubWluLmpzXG4gKiogbW9kdWxlIGlkID0gNjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMTdcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9