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

	module.exports = __webpack_require__(43);


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

/***/ 4:
/***/ function(module, exports) {

	/*TMODJS:{}*/
	!function () {
		function a(a, b) {
			return (/string|function/.test(typeof b) ? h : g)(a, b)
		}
	
		function b(a, c) {
			return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
		}
	
		function c(a) {
			return l[a]
		}
	
		function d(a) {
			return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
		}
	
		function e(a, b) {
			if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
		}
	
		function f(a, b) {
			var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
			for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
			return e
		}
	
		function g(b, c) {
			var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
			return c ? d(c) : d
		}
	
		function h(a, b) {
			if ("string" == typeof b) {
				var c = b;
				b = function () {
					return new k(c)
				}
			}
			var d = j[a] = function (c) {
				try {
					return new b(c, a) + ""
				} catch (d) {
					return i(d)()
				}
			};
			return d.prototype = b.prototype = n, d.toString = function () {
				return b + ""
			}, d
		}
	
		function i(a) {
			var b = "{Template Error}", c = a.stack || "";
			if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
			return function () {
				return "object" == typeof console && console.error(b + "\n\n" + c), b
			}
		}
	
		var j = a.cache = {}, k = this.String, l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		}, m = Array.isArray || function (a) {
				return "[object Array]" === {}.toString.call(a)
			}, n = a.utils = {
			$helpers: {}, $include: function (a, b, c) {
				return a = f(c, a), g(a, b)
			}, $string: b, $escape: d, $each: e
		}, o = a.helpers = n.$helpers;
		a.get = function (a) {
			return j[a.replace(/^\.\//, "")]
		}, a.helper = function (a, b) {
			o[a] = b
		}, module.exports = a
	}();

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by yangjin on 2016/5/20.
	 */
	var u=__webpack_require__(2)
	$(function () {
	    var param = {
	        AppID: sessionStorage.getItem('appid'),
	        OpenID: sessionStorage.getItem('openid')
	    };
	
	    $.ajax({
	        type: 'post',
	        url: u.getApiUrl('Account/GetBindMfgInfo'),
	        data: param,
	        dataType: 'json',
	        timeout: 300,
	        success: function (data) {
	            u.checkBind(data);
	            if (data) {
	                if (data.OK) {
	                    var d = data.N;
	                    var tpl = __webpack_require__(44);
	                    $("#stuinfo").html(tpl(d));
	                    var tpl = __webpack_require__(45);
	                    $("#parentinfo").html(tpl(d));
	                }
	            }
	        }
	    });
	
	
	    $("#btnunbind").click(function () {
	        var stuname = $("#stuname").html().trim();
	        var stuid = $("#stuid").html().trim();
	        u.showConfirm('确认解除与' + stuname + '（' + stuid + '）的绑定么？', function (e) {
	            if (e) {
	                unbindstu();
	            }
	            else {
	
	            }
	        });
	
	    });
	})
	//解绑用户
	function unbindstu()
	{
	    var param={
	        AppID:sessionStorage.getItem('appid'),
	        OpenID:sessionStorage.getItem('openid')
	    };
	
	    $.ajax({
	        type: 'post',
	        url:u.getApiUrl('Account/UnBindMfgID'),
	        data:param,
	        dataType: 'json',
	        //timeout: 300,
	        success: function(data){
	            if(data)
	            {
	                if(data.OK)
	                {
	                    u.showPopMsg('解绑成功！');
	                    setTimeout(function(){
	                        window.location.href='bindinfo.html';
	                    },1000)
	                }
	                else {
	                    u.showPopMsg('解绑失败！');
	                }
	            }
	
	        },
	        error: function(xhr, type){
	            alert('Ajax error!')
	        }
	    });
	}
	
	
	


/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(4);
	module.exports=template('tpl/lookinfostu',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,MfgName=$data.MfgName,MfgID=$data.MfgID,$out='';$out+=' <tr> <td class=\'pct30\'>姓名</td> <td id=\'stuname\'> ';
	$out+=$escape(MfgName);
	$out+=' </td> </tr> <tr> <td class=\'pct30\'>账号</td> <td id=\'stuid\'> ';
	$out+=$escape(MfgID);
	$out+=' </td> </tr> <tr> <td class=\'pct30\'>密码</td> <td> ******** </td> </tr>';
	return new String($out);
	});

/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(4);
	module.exports=template('tpl/lookinfoparent',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,ParentName=$data.ParentName,ParentPhone=$data.ParentPhone,$out='';$out+=' <tr> <td class=\'pct30\'>姓名</td> <td> ';
	$out+=$escape(ParentName);
	$out+=' </td> </tr> <tr> <td class=\'pct30\'>手机</td> <td> ';
	$out+=$escape(ParentPhone);
	$out+=' </td> </tr>';
	return new String($out);
	});

/***/ }

/******/ });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzJhMTc3MDI4NjBjODg0YTcxNTc/ODUyNCoqKioqKioqKioqIiwid2VicGFjazovLy8uL2RlcC91dGlsL3V0aWwuanM/MjIyMSoqKioqKioqIiwid2VicGFjazovLy8uL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzPzg5NjYqKioqKioiLCJ3ZWJwYWNrOi8vLy4vanMvbG9va2luZm8uanMiLCJ3ZWJwYWNrOi8vLy4vdHBsL2xvb2tpbmZvc3R1LnRwbCIsIndlYnBhY2s6Ly8vLi90cGwvbG9va2luZm9wYXJlbnQudHBsIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0M7QUFDeEM7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7Ozs7Ozs7Ozs7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBLGNBQWEsZ0hBQWdIO0FBQzdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDLEU7Ozs7Ozs7QUNURDtBQUNBO0FBQ0E7QUFDQSxjQUFhLGtJQUFrSTtBQUMvSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFIiwiZmlsZSI6Imxvb2tpbmZvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL21mZy13ZWNoYXQvYnVuZGxlL2pzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNzJhMTc3MDI4NjBjODg0YTcxNTdcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBodW1vckhhbiBvbiAyMDE2LzUvMjAuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cz17XHJcbiAgICAgICAgc2NyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGRIZWlnaHQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodDtcclxuICAgICAgICB2YXIgc1RvcCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wO1xyXG4gICAgICAgIHZhciBjSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG4gICAgICAgIGlmIChzVG9wICsgY0hlaWdodCA9PSBkSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgZ2V0U3ViamVjdE5hbWU6ZnVuY3Rpb24oaWQpe1xyXG4gICAgICAgIHZhciBuYW1lPScnO1xyXG4gICAgICAgIHN3aXRjaCAoaWQudG9TdHJpbmcoKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgJzAxJzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+ivreaWhyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDInOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n5pWw5a2mJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwMyc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfoi7Hor60nO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA0JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+eJqeeQhic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDUnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n5YyW5a2mJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwNic6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfmlL/msrsnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA3JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+WOhuWPsic7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDgnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n5Zyw55CGJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwOSc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfnlJ/niaknO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfSxcclxuICAgIGdldFN0YWdlU3RyOiBmdW5jdGlvbiAoc3RhZ2VJZCkge1xyXG4gICAgICAgIHZhciBzdGFnZUlkU3RyID0gXCJcIjtcclxuICAgICAgICBzd2l0Y2ggKHN0YWdlSWQpIHtcclxuICAgICAgICAgICAgY2FzZSBcInhcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIuWwj+WtplwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjXCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLliJ3kuK1cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZ1wiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi6auY5LitXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RhZ2VJZFN0cjtcclxuICAgIH0sXHJcbiAgICBnb19tZW51OmZ1bmN0aW9uKGNvbklkKXtcclxuICAgICAgICB2YXIgY29uPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbklkKTtcclxuICAgICAgICB2YXIgaW1nPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoJ2lkJywnbWVudUNvbnRyJyk7XHJcbiAgICAgICAgaW1nLnNyYz0nLi4vYnVuZGxlL2ltZy9ib3R0b20teXVhbi1zaG93LnBuZyc7XHJcbiAgICAgICAgY29uLmFwcGVuZENoaWxkKGltZyk7XHJcbiAgICAgICAgdmFyIG1lbnVDb250cj1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudUNvbnRyJyk7XHJcbiAgICAgICAgbWVudUNvbnRyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLG1lbnVCb2R5LGZhbHNlKTtcclxuICAgICAgICBmdW5jdGlvbiBtZW51Qm9keSgpe1xyXG4gICAgICAgICAgICB2YXIgbWVudVNob3c9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbnVTaG93Jyk7XHJcbiAgICAgICAgICAgIGlmKG1lbnVTaG93KXtcclxuICAgICAgICAgICAgICAgIHZhciB0PW1lbnVTaG93LmdldEF0dHJpYnV0ZSgnc3R5bGUnKTtcclxuICAgICAgICAgICAgICAgIGlmKCB0ID09ICdkaXNwbGF5OiBub25lOycpe1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPVwiLi4vYnVuZGxlL2ltZy9tZW51Mi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL2JvdHRvbS15dWFuLXNob3cucG5nXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2hvdz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuc2V0QXR0cmlidXRlKCdpZCcsJ21lbnVTaG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnc3R5bGUnLCdkaXNwbGF5OmJsb2NrOycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5pbm5lckhUTUw9JzxhIGhyZWY9XCJhZnRlcmNsYXNzam9iLmh0bWxcIiBjbGFzcz1cImt0eGFcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcveHVlYW4ucG5nXCIvPjwvYT48YSBocmVmPVwid3JvbmctZ2F0aGVyLmh0bWxcIiBjbGFzcz1cImt4amxcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvamlqaW4ucG5nXCI8L2E+PGEgaHJlZj1cImhvbWV3b3JrLWxpc3QuaHRtbFwiICBjbGFzcz1cImN0ampcIj48aW1nIHNyYz1cIi4uL2J1bmRsZS9pbWcvamlsdS5wbmdcIj48L2E+PGEgaHJlZj1cIm1vbnRod2Vhay5odG1sXCIgY2xhc3M9XCJteXJ4XCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3J1b3hpYW5nLnBuZ1wiPjwvYT4nO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzaG93KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZ29fc3R1ZHlfc2hvdzpmdW5jdGlvbihpbWdsb2dvLHNob3dpZCl7XHJcbiAgICAgICAgICAgdmFyIG49MTtcclxuICAgICAgICAgICAgJChpbWdsb2dvKS5wYXJlbnQoXCJoM1wiKS5vbihcInRvdWNoc3RhcnRcIixmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYobiAlMiAhPTApe1xyXG4gICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykuYXR0cihcInNyY1wiLFwiLi4vaW1nL2J0bS5wbmdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChzaG93aWQpLnNob3coKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgJChpbWdsb2dvKS5hdHRyKFwic3JjXCIsXCIuLi9pbWcvdG9wLWppYW50b3UucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoc2hvd2lkKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuKys7XHJcbiAgICAgICAgICAgIH0pfSxcclxuXHJcbiAgICBzaG93Q29uZmlybTpmdW5jdGlvbihtc2csY2FsbGJhY2spXHJcbiAgICB7XHJcbiAgICAgICAgdmFyIGxheWVyPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgbGF5ZXIuY2xhc3NOYW1lPVwibGF5ZXJcIjtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxheWVyKTtcclxuICAgICAgICB2YXIgY29uZmlybT0nPGRpdiBjbGFzcz1cInBvcGNvbmZpcm1cIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8ZGl2IGNsYXNzPVwidGl0bGVcIj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPSc8aSBjbGFzcz1cImljb24tY2xvc2VcIj48L2k+JztcclxuICAgICAgICBjb25maXJtKz0nIDwvZGl2Pic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8ZGl2IGNsYXNzPVwiY29udGVudFwiPicrbXNnKycgPC9kaXY+JztcclxuICAgICAgICBjb25maXJtKz0nIDxkaXYgY2xhc3M9XCJmb290XCI+JztcclxuICAgICAgICBjb25maXJtKz0nICA8aW5wdXQgY2xhc3M9XCJwb3BidG4gYnRub2sgY29sb3ItZ3JlZW5cIiB0eXBlPVwiYnV0dG9uXCIgIHZhbHVlPVwi56Gu5a6aXCIvPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgPGlucHV0IGNsYXNzPVwicG9wYnRuIGJ0bmNhbmNlbCBjb2xvci1ncmVlblwiIHR5cGU9XCJidXR0b25cIiB2YWx1ZT1cIuWPlua2iFwiLz4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgICA8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJ2JvZHknKS5hcHBlbmQoY29uZmlybSk7XHJcbiAgICAgICAgLy8kKCcucG9wY29uZmlybScpLmNzcygndG9wJywoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCAtJCgnLnBvcGNvbmZpcm0nKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgJChcIi5idG5va1wiKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAkKFwiLmJ0bm9rXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHRydWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQoXCIuYnRuY2FuY2VsLC5pY29uLWNsb3NlXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoXCIubGF5ZXJcIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICQoXCIucG9wY29uZmlybVwiKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAvL+S/oeaBr+aPkOekuuahhlxyXG4gICAgc2hvd1BvcE1zZzpmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgICAgdmFyIGh0bWw9JzxkaXYgY2xhc3M9XCJwb3Btc2dcIj48ZGl2IGNsYXNzPVwiY29udGVudFwiPicrbXNnKyc8L2Rpdj48L2Rpdj4nO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGh0bWwpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ2xlZnQnLChkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoICAtJCgnLnBvcG1zZycpLndpZHRoKCkpLzIpO1xyXG4gICAgICAgICQoJy5wb3Btc2cnKS5jc3MoJ3RvcCcsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSQoJy5wb3Btc2cnKS5oZWlnaHQoKSkvMik7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpeyQoJy5wb3Btc2cnKS5yZW1vdmUoKTt9LDEwMDApO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+W5o6l5Y+jdXJsIOWmguiOt+WPlm9wZW5pZCAgIGdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKVxyXG4gICAgZ2V0QXBpVXJsOmZ1bmN0aW9uKGFjdGlvbil7XHJcbiAgICAgICAgdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk4Lyc7XHJcbiAgICAgICAgLy92YXIgYmFzZXVybD0naHR0cDovL2xvY2FsaG9zdDo1NDQxLyc7XHJcbiAgICAgICAgcmV0dXJuIGJhc2V1cmwrYWN0aW9uO1xyXG4gICAgfSxcclxuICAgIC8v6LCD55SoYXBp5oiQ5Yqf5ZCO77yM5YWI6LCD55So5q2k5pa55rOV77yM5Yik5pat55So5oi35piv5ZCm5bey57uP57uR5a6a77yM6Iul5pyq57uR5a6a77yM6Lez6L2s5Yiw57uR5a6a6aG1XHJcbiAgICBjaGVja0JpbmQ6ZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgaWYoIWRhdGEuT0spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihkYXRhLkNvZGU9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmPVwiYmluZGluZm8uaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6I635Y+WT3BlbklkXHJcbiAgICBnZXRPcGVuSWQ6ZnVuY3Rpb24oYXBwaWQsYXBwc2VjcmV0LGNvZGUpe1xyXG52YXIgb3BlbmlkO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgYXN5bmM6ZmFsc2UsXHJcbiAgICAgICAgICAgIHVybDp0aGlzLmdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKSxcclxuICAgICAgICAgICAgLy8gZGF0YSB0byBiZSBhZGRlZCB0byBxdWVyeSBzdHJpbmc6XHJcbiAgICAgICAgICAgIGRhdGE6IHtBcHBJRDphcHBpZCxBcHBTZWNyZXQ6YXBwc2VjcmV0LENvZGU6Y29kZX0sXHJcbiAgICAgICAgICAgIC8vIHR5cGUgb2YgZGF0YSB3ZSBhcmUgZXhwZWN0aW5nIGluIHJldHVybjpcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgLy90aW1lb3V0OiAzMDAsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLk9LKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5pZD1kYXRhLklEO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCB0eXBlKXtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdBamF4IGVycm9yIScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBvcGVuaWQ7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5Z1cmzlj4LmlbBcclxuICAgIGdldFF1ZXJ5U3RyaW5nOmZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cChcIihefCYpXCIgKyBuYW1lICsgXCI9KFteJl0qKSgmfCQpXCIsIFwiaVwiKTtcclxuICAgIHZhciByID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkubWF0Y2gocmVnKTtcclxuICAgIGlmIChyICE9IG51bGwpIHJldHVybiB1bmVzY2FwZShkZWNvZGVVUkkoclsyXSkpOyByZXR1cm4gbnVsbDtcclxufSxcclxuXHJcbiAgICBkYXRlRm9ybWF0OiBmdW5jdGlvbihkYXRlLCBmb3JtYXQpe1xyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgdmFyIG1hcCA9IHtcclxuICAgICAgICAgICAgXCJZXCI6IGRhdGUuZ2V0WWVhcigpLFxyXG4gICAgICAgICAgICBcIk1cIjogZGF0ZS5nZXRNb250aCgpICsgMSwgLy/mnIjku71cclxuICAgICAgICAgICAgXCJkXCI6IGRhdGUuZ2V0RGF0ZSgpLCAvL+aXpVxyXG4gICAgICAgICAgICBcImhcIjogZGF0ZS5nZXRIb3VycygpLCAvL+Wwj+aXtlxyXG4gICAgICAgICAgICBcIm1cIjogZGF0ZS5nZXRNaW51dGVzKCksIC8v5YiGXHJcbiAgICAgICAgICAgIFwic1wiOiBkYXRlLmdldFNlY29uZHMoKSwgLy/np5JcclxuICAgICAgICAgICAgXCJxXCI6IE1hdGguZmxvb3IoKGRhdGUuZ2V0TW9udGgoKSArIDMpIC8gMyksIC8v5a2j5bqmXHJcbiAgICAgICAgICAgIFwiU1wiOiBkYXRlLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvKFt5TWRobXNxU10pKy9nLCBmdW5jdGlvbiAoYWxsLCB0KSB7XHJcbiAgICAgICAgICAgIHZhciB2ID0gbWFwW3RdO1xyXG4gICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYWxsLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gJzAnICsgdjtcclxuICAgICAgICAgICAgICAgICAgICB2ID0gdi5zdWJzdHIodi5sZW5ndGggLSAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHQgPT09ICd5Jykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkYXRlLmdldEZ1bGxZZWFyKCkgKyAnJykuc3Vic3RyKDQgLSBhbGwubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gYWxsO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBmb3JtYXQ7XHJcbiAgICB9LFxyXG4gICAgLy/lpITnkIbor5XpopjlhazlvI8gbWF0aGpheFxyXG4gICAgaW5pdE1hdGhKYXhPYmo6ZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgICAgTWF0aEpheC5IdWIuUXVldWUoW1wiVHlwZXNldFwiLCBNYXRoSmF4Lkh1YiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXSk7XHJcbiAgICB9LFxyXG4gICAgZ2V0TG9jYWxUaW1lOiBmdW5jdGlvbiAodmFsKSB7XHJcbiAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUocGFyc2VJbnQodmFsLnJlcGxhY2UoXCIvRGF0ZShcIiwgXCJcIikucmVwbGFjZShcIikvXCIsIFwiXCIpLCAxMCkpO1xyXG4gICAgICAgICAgICB2YXIgeWVhciA9IGRhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICAgICAgdmFyIG1vbnRoID0gZGF0ZS5nZXRNb250aCgpICsgMSA8IDEwID8gXCIwXCIgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgOiBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudERhdGUgPSBkYXRlLmdldERhdGUoKSA8IDEwID8gXCIwXCIgKyBkYXRlLmdldERhdGUoKSA6IGRhdGUuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICB2YXIgaG91cnMgPSBkYXRlLmdldEhvdXJzKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXRIb3VycygpIDogZGF0ZS5nZXRIb3VycygpO1xyXG4gICAgICAgICAgICB2YXIgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXRNaW51dGVzKCkgOiBkYXRlLmdldE1pbnV0ZXMoKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB5ZWFyICsgXCItXCIgKyBtb250aCArIFwiLVwiICsgY3VycmVudERhdGUgKyBcIiBcIiArIGhvdXJzICsgXCI6XCIgKyBtaW51dGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvdXRpbC91dGlsLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMiAzIDQgNyA5IDEwIDExIDEyIDEzIDE0IDE1IDE3IDE4IDE5IDIwXG4gKiovIiwiLypUTU9ESlM6e30qL1xyXG4hZnVuY3Rpb24gKCkge1xyXG5cdGZ1bmN0aW9uIGEoYSwgYikge1xyXG5cdFx0cmV0dXJuICgvc3RyaW5nfGZ1bmN0aW9uLy50ZXN0KHR5cGVvZiBiKSA/IGggOiBnKShhLCBiKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYihhLCBjKSB7XHJcblx0XHRyZXR1cm4gXCJzdHJpbmdcIiAhPSB0eXBlb2YgYSAmJiAoYyA9IHR5cGVvZiBhLCBcIm51bWJlclwiID09PSBjID8gYSArPSBcIlwiIDogYSA9IFwiZnVuY3Rpb25cIiA9PT0gYyA/IGIoYS5jYWxsKGEpKSA6IFwiXCIpLCBhXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBjKGEpIHtcclxuXHRcdHJldHVybiBsW2FdXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBkKGEpIHtcclxuXHRcdHJldHVybiBiKGEpLnJlcGxhY2UoLyYoPyFbXFx3I10rOyl8Wzw+XCInXS9nLCBjKVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZShhLCBiKSB7XHJcblx0XHRpZiAobShhKSlmb3IgKHZhciBjID0gMCwgZCA9IGEubGVuZ3RoOyBkID4gYzsgYysrKWIuY2FsbChhLCBhW2NdLCBjLCBhKTsgZWxzZSBmb3IgKGMgaW4gYSliLmNhbGwoYSwgYVtjXSwgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGYoYSwgYikge1xyXG5cdFx0dmFyIGMgPSAvKFxcLylbXlxcL10rXFwxXFwuXFwuXFwxLywgZCA9IChcIi4vXCIgKyBhKS5yZXBsYWNlKC9bXlxcL10rJC8sIFwiXCIpLCBlID0gZCArIGI7XHJcblx0XHRmb3IgKGUgPSBlLnJlcGxhY2UoL1xcL1xcLlxcLy9nLCBcIi9cIik7IGUubWF0Y2goYyk7KWUgPSBlLnJlcGxhY2UoYywgXCIvXCIpO1xyXG5cdFx0cmV0dXJuIGVcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGcoYiwgYykge1xyXG5cdFx0dmFyIGQgPSBhLmdldChiKSB8fCBpKHtmaWxlbmFtZTogYiwgbmFtZTogXCJSZW5kZXIgRXJyb3JcIiwgbWVzc2FnZTogXCJUZW1wbGF0ZSBub3QgZm91bmRcIn0pO1xyXG5cdFx0cmV0dXJuIGMgPyBkKGMpIDogZFxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gaChhLCBiKSB7XHJcblx0XHRpZiAoXCJzdHJpbmdcIiA9PSB0eXBlb2YgYikge1xyXG5cdFx0XHR2YXIgYyA9IGI7XHJcblx0XHRcdGIgPSBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBrKGMpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHZhciBkID0galthXSA9IGZ1bmN0aW9uIChjKSB7XHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBiKGMsIGEpICsgXCJcIlxyXG5cdFx0XHR9IGNhdGNoIChkKSB7XHJcblx0XHRcdFx0cmV0dXJuIGkoZCkoKVxyXG5cdFx0XHR9XHJcblx0XHR9O1xyXG5cdFx0cmV0dXJuIGQucHJvdG90eXBlID0gYi5wcm90b3R5cGUgPSBuLCBkLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gYiArIFwiXCJcclxuXHRcdH0sIGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGkoYSkge1xyXG5cdFx0dmFyIGIgPSBcIntUZW1wbGF0ZSBFcnJvcn1cIiwgYyA9IGEuc3RhY2sgfHwgXCJcIjtcclxuXHRcdGlmIChjKWMgPSBjLnNwbGl0KFwiXFxuXCIpLnNsaWNlKDAsIDIpLmpvaW4oXCJcXG5cIik7IGVsc2UgZm9yICh2YXIgZCBpbiBhKWMgKz0gXCI8XCIgKyBkICsgXCI+XFxuXCIgKyBhW2RdICsgXCJcXG5cXG5cIjtcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdHJldHVybiBcIm9iamVjdFwiID09IHR5cGVvZiBjb25zb2xlICYmIGNvbnNvbGUuZXJyb3IoYiArIFwiXFxuXFxuXCIgKyBjKSwgYlxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dmFyIGogPSBhLmNhY2hlID0ge30sIGsgPSB0aGlzLlN0cmluZywgbCA9IHtcclxuXHRcdFwiPFwiOiBcIiYjNjA7XCIsXHJcblx0XHRcIj5cIjogXCImIzYyO1wiLFxyXG5cdFx0J1wiJzogXCImIzM0O1wiLFxyXG5cdFx0XCInXCI6IFwiJiMzOTtcIixcclxuXHRcdFwiJlwiOiBcIiYjMzg7XCJcclxuXHR9LCBtID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYSkge1xyXG5cdFx0XHRyZXR1cm4gXCJbb2JqZWN0IEFycmF5XVwiID09PSB7fS50b1N0cmluZy5jYWxsKGEpXHJcblx0XHR9LCBuID0gYS51dGlscyA9IHtcclxuXHRcdCRoZWxwZXJzOiB7fSwgJGluY2x1ZGU6IGZ1bmN0aW9uIChhLCBiLCBjKSB7XHJcblx0XHRcdHJldHVybiBhID0gZihjLCBhKSwgZyhhLCBiKVxyXG5cdFx0fSwgJHN0cmluZzogYiwgJGVzY2FwZTogZCwgJGVhY2g6IGVcclxuXHR9LCBvID0gYS5oZWxwZXJzID0gbi4kaGVscGVycztcclxuXHRhLmdldCA9IGZ1bmN0aW9uIChhKSB7XHJcblx0XHRyZXR1cm4galthLnJlcGxhY2UoL15cXC5cXC8vLCBcIlwiKV1cclxuXHR9LCBhLmhlbHBlciA9IGZ1bmN0aW9uIChhLCBiKSB7XHJcblx0XHRvW2FdID0gYlxyXG5cdH0sIG1vZHVsZS5leHBvcnRzID0gYVxyXG59KCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vdG1vZGpzLWxvYWRlci9ydW50aW1lLmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMyA0IDUgOSAxMCAxMiAxMyAxNSAxNiAxNyAxOVxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHlhbmdqaW4gb24gMjAxNi81LzIwLlxyXG4gKi9cclxudmFyIHU9cmVxdWlyZSgndXRpbC91dGlsJylcclxuJChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgQXBwSUQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FwcGlkJyksXHJcbiAgICAgICAgT3BlbklEOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdvcGVuaWQnKVxyXG4gICAgfTtcclxuXHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICB1cmw6IHUuZ2V0QXBpVXJsKCdBY2NvdW50L0dldEJpbmRNZmdJbmZvJyksXHJcbiAgICAgICAgZGF0YTogcGFyYW0sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB0aW1lb3V0OiAzMDAsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgdS5jaGVja0JpbmQoZGF0YSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5PSykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gZGF0YS5OO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0cGwgPSByZXF1aXJlKCdsb29raW5mb3N0dS50cGwnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3N0dWluZm9cIikuaHRtbCh0cGwoZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0cGwgPSByZXF1aXJlKCdsb29raW5mb3BhcmVudC50cGwnKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3BhcmVudGluZm9cIikuaHRtbCh0cGwoZCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoXCIjYnRudW5iaW5kXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgc3R1bmFtZSA9ICQoXCIjc3R1bmFtZVwiKS5odG1sKCkudHJpbSgpO1xyXG4gICAgICAgIHZhciBzdHVpZCA9ICQoXCIjc3R1aWRcIikuaHRtbCgpLnRyaW0oKTtcclxuICAgICAgICB1LnNob3dDb25maXJtKCfnoa7orqTop6PpmaTkuI4nICsgc3R1bmFtZSArICfvvIgnICsgc3R1aWQgKyAn77yJ55qE57uR5a6a5LmI77yfJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKGUpIHtcclxuICAgICAgICAgICAgICAgIHVuYmluZHN0dSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG59KVxyXG4vL+ino+e7keeUqOaIt1xyXG5mdW5jdGlvbiB1bmJpbmRzdHUoKVxyXG57XHJcbiAgICB2YXIgcGFyYW09e1xyXG4gICAgICAgIEFwcElEOnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FwcGlkJyksXHJcbiAgICAgICAgT3BlbklEOnNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ29wZW5pZCcpXHJcbiAgICB9O1xyXG5cclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgIHVybDp1LmdldEFwaVVybCgnQWNjb3VudC9VbkJpbmRNZmdJRCcpLFxyXG4gICAgICAgIGRhdGE6cGFyYW0sXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAvL3RpbWVvdXQ6IDMwMCxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5PSylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB1LnNob3dQb3BNc2coJ+ino+e7keaIkOWKn++8gScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWY9J2JpbmRpbmZvLmh0bWwnO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sMTAwMClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHUuc2hvd1BvcE1zZygn6Kej57uR5aSx6LSl77yBJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCB0eXBlKXtcclxuICAgICAgICAgICAgYWxlcnQoJ0FqYXggZXJyb3IhJylcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvbG9va2luZm8uanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAxMlxuICoqLyIsInZhciB0ZW1wbGF0ZT1yZXF1aXJlKCd0bW9kanMtbG9hZGVyL3J1bnRpbWUnKTtcbm1vZHVsZS5leHBvcnRzPXRlbXBsYXRlKCd0cGwvbG9va2luZm9zdHUnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVzY2FwZT0kdXRpbHMuJGVzY2FwZSxNZmdOYW1lPSRkYXRhLk1mZ05hbWUsTWZnSUQ9JGRhdGEuTWZnSUQsJG91dD0nJzskb3V0Kz0nIDx0cj4gPHRkIGNsYXNzPVxcJ3BjdDMwXFwnPuWnk+WQjTwvdGQ+IDx0ZCBpZD1cXCdzdHVuYW1lXFwnPiAnO1xuJG91dCs9JGVzY2FwZShNZmdOYW1lKTtcbiRvdXQrPScgPC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFwncGN0MzBcXCc+6LSm5Y+3PC90ZD4gPHRkIGlkPVxcJ3N0dWlkXFwnPiAnO1xuJG91dCs9JGVzY2FwZShNZmdJRCk7XG4kb3V0Kz0nIDwvdGQ+IDwvdHI+IDx0cj4gPHRkIGNsYXNzPVxcJ3BjdDMwXFwnPuWvhueggTwvdGQ+IDx0ZD4gKioqKioqKiogPC90ZD4gPC90cj4nO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHBsL2xvb2tpbmZvc3R1LnRwbFxuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDEyXG4gKiovIiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ3RwbC9sb29raW5mb3BhcmVudCcsZnVuY3Rpb24oJGRhdGEsJGZpbGVuYW1lXG4vKiovKSB7XG4ndXNlIHN0cmljdCc7dmFyICR1dGlscz10aGlzLCRoZWxwZXJzPSR1dGlscy4kaGVscGVycywkZXNjYXBlPSR1dGlscy4kZXNjYXBlLFBhcmVudE5hbWU9JGRhdGEuUGFyZW50TmFtZSxQYXJlbnRQaG9uZT0kZGF0YS5QYXJlbnRQaG9uZSwkb3V0PScnOyRvdXQrPScgPHRyPiA8dGQgY2xhc3M9XFwncGN0MzBcXCc+5aeT5ZCNPC90ZD4gPHRkPiAnO1xuJG91dCs9JGVzY2FwZShQYXJlbnROYW1lKTtcbiRvdXQrPScgPC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFwncGN0MzBcXCc+5omL5py6PC90ZD4gPHRkPiAnO1xuJG91dCs9JGVzY2FwZShQYXJlbnRQaG9uZSk7XG4kb3V0Kz0nIDwvdGQ+IDwvdHI+JztcbnJldHVybiBuZXcgU3RyaW5nKCRvdXQpO1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3RwbC9sb29raW5mb3BhcmVudC50cGxcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAxMlxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=