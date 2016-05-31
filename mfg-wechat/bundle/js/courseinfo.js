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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(30);


/***/ },
/* 1 */,
/* 2 */
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
/* 3 */,
/* 4 */
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
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/20.
	 */
	__webpack_require__(12);
	var selectTpl = __webpack_require__(18);
	var selectUlTpl = __webpack_require__(19);
	
	function mockSelect(dom, data, callbackId, callback, id, callBackFlag){
	    this.dom = $("." + dom);
	    this.data = data;
	    this.callbackId = callbackId;
	    this.callback = callback;
	    this.id = $("#" + id);
	    this.callBackFlag = callBackFlag;
	    this.initDom();
	    this.initBtns();
	}
	mockSelect.prototype = {
	    initDom: function(){
	        this.dom.html(selectTpl(this.data));
	        this.id.html(selectUlTpl(this.data));
	        this.callbackId(this.dom.find(".name").attr('data-id'));
	        if (this.callBackFlag) {
	            this.callBackFlag(true);
	        }
	        var offset = this.dom.offset();
	        this.id.find(".mock-ul").css({
	            'left': 0,
	            'top': offset.top + 42
	        });
	        this.id.find(".mock-ul").css({
	            'max-height': $(window).height() - offset.height - offset.top
	        });
	    },
	    initBtns: function(){
	        //点击显示下拉
	        var tThis= this;
	        this.dom.delegate('.name-wrap', 'touchstart', function(){
	            //console.log(tThis.dom);
	            if (!(tThis.dom.find('.name-wrap').hasClass('active'))) {
	                $(".mock-select").removeClass('active').find(".name-wrap").removeClass('active');
	                $(".mock-ul").hide();
	                $(this).addClass('active');
	                tThis.dom.find(".mock-select").addClass('active');
	                tThis.id.find(".mock-ul").show();
	            } else {
	                $(".mock-ul").hide();
	                $(".mock-select").removeClass('active').find(".name-wrap").removeClass('active');
	                $(this).removeClass('active');
	                tThis.dom.find(".mock-select").removeClass('active');
	                tThis.id.find(".mock-ul").hide();
	            }
	        });
	        //下拉消失
	        this.id.delegate('li', 'touchend', function(){
	            tThis.id.find("li.active").removeClass("active");
	            $(this).addClass("active").find(".right").removeClass("display-none");
	            tThis.dom.find('.name-wrap').removeClass('active').find(".name").html($(this).find(".item-name").html()).attr("data-id", $(this).attr("data-id"));
	            tThis.dom.find(".mock-select").removeClass('active');
	            tThis.id.find(".mock-ul").hide();
	            tThis.callbackId(tThis.dom.find(".name").attr('data-id'));
	            if (tThis.callback) {
	                tThis.callback();
	            }
	        });
	    }
	};
	module.exports = function(dom, data, callbackId, callback, id, callBackFlag){
	    /**
	     * * 模拟下拉框组件
	     * 拿到id
	     * @param dom       下拉框父级class
	     * @param data      下拉数据（处理过的格式为{data: [{id:'',name:''},{},{}]}）,另外注意orderNum > 0 ? +orderNum : ''
	     * @param callbackId      通过回调传给个人页面需要的id
	     * @param callback        个人页面的回调处理
	     * @param id              存放下拉选项的id
	     * @param callBackFlag（非必传）  告诉页面模板渲染完了有了id等参数 可以渲染个人页面了
	     */
	    return new mockSelect(dom, data, callbackId, callback, id, callBackFlag);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./mock-select.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./mock-select.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".mock-select{\r\n    line-height: 42px;\r\n    height: 42px;\r\n    text-align: center;\r\n    border:none;\r\n}\r\n.mock-select .name-wrap.active{\r\n    background: #fff;\r\n}\r\n.mock-ul{\r\n    position: absolute;\r\n    background: #fff;\r\n    z-index: 100;\r\n    border-bottom: 1px solid #d9d9d9;\r\n    width: 93.6%;\r\n    overflow: scroll;\r\n}\r\n.mock-select .name-wrap{\r\n    color: #fff;\r\n    height: 42px;\r\n    overflow: hidden;\r\n}\r\n.mock-select .bg{\r\n    display: inline-block;\r\n    height: 6px;\r\n    width: 13px;\r\n}\r\n.mock-select .name-wrap .bg{\r\n    background: url(" + __webpack_require__(15) + ") center center no-repeat;\r\n}\r\n.mock-select .name-wrap.active{\r\n    color: #00d535;\r\n}\r\n.mock-select .name-wrap.active .bg {\r\n    background: url(" + __webpack_require__(16) + ") center center no-repeat;\r\n}\r\n.mock-ul li{\r\n    margin:0;\r\n    color: #333333;\r\n    text-align: left;\r\n    height: 42px;\r\n    line-height: 42px;\r\n    border-top: 1px solid #d9d9d9;\r\n}\r\n.mock-ul li .right{\r\n    display: none;\r\n    float: right;\r\n    margin-right: 10px;\r\n}\r\n.mock-ul li.active .right{\r\n    display: inline;\r\n}\r\n.mock-ul li.active{\r\n    color: #00d535;\r\n}", ""]);
	
	// exports


/***/ },
/* 14 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAGCAYAAAAYLBS/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTYwQkQ4RjgyMEI2MTFFNjk4QjBGMzFFNkNGQTgxMDMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTYwQkQ4RjcyMEI2MTFFNjk4QjBGMzFFNkNGQTgxMDMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjkxMkNDRTlBMjBFNjExOEZCQzg4QzIxN0QyRUJGOSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmYxYzk5MjgxLTM4NWEtMTE3OS1hMzViLTkzNTU2ZTcyMjJiNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PheHe58AAABVSURBVHjaYvj//78OEN/7DwGf8OD/UHU6DEAChE2RJHCBT1B1DDBNICwMxBdwaLgAlWdA1wTCXEB8GE3DYag4Ay5NMLwNqmEbNnlcmkA4C5ccQIABAPGiC0psi9bFAAAAAElFTkSuQmCC"

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAGCAYAAAAYLBS/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4JpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEFBNUQyRTYyMEI2MTFFNjg0OUZDNjY1RDdFMUNFMEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEFBNUQyRTUyMEI2MTFFNjg0OUZDNjY1RDdFMUNFMEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowNjkxMkNDRTlBMjBFNjExOEZCQzg4QzIxN0QyRUJGOSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmYxYzk5MjgxLTM4NWEtMTE3OS1hMzViLTkzNTU2ZTcyMjJiNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmlp944AAACeSURBVHjaYvj//78OEN/7DwGfQDjjWfsvEIbxofg/VJ0OA8NVUwYgwxQm0fhq9n+gGBiD2EjgE1QdA1gTVKNw6YtJz2EaYLjp1RyQhgsgeag6BkawJgioB+IGBiyAi4mj9du/HzUg9n+tUwwsUPF+IC5gwAGAGqqBFDcQF4L4IE35UA3fgfgPTCErIwvr7/9/fkO5LFA1D4B4IkCAAQDWEYtLHKvdIwAAAABJRU5ErkJggg=="

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(4);
	module.exports=template('dep/component/mock-select/tpl/mock-select-tpl',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,data=$data.data,$out='';$out+='<div class="mock-select font-size16"> <div class="name-wrap"> <span class="name" data-id="';
	$out+=$escape(data[0].id);
	$out+='">';
	$out+=$escape(data[0].name);
	$out+='</span> <span class="bg"></span> </div> </div>';
	return new String($out);
	});

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(4);
	module.exports=template('dep/component/mock-select/tpl/select-ul-tpl',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+='<ul class="mock-ul box-padding display-none"> ';
	$each(data,function($value,$index){
	$out+=' ';
	if($index == 0){
	$out+=' <li style="border:none;" data-id="';
	$out+=$escape($value.id);
	$out+='"> <span class="item-name">';
	$out+=$escape($value.name);
	$out+='</span> <span class="right">√</span> </li> ';
	}else{
	$out+=' <li data-id="';
	$out+=$escape($value.id);
	$out+='"> <span class="item-name">';
	$out+=$escape($value.name);
	$out+='</span> <span class="right">√</span> </li> ';
	}
	$out+=' ';
	});
	$out+=' </ul>';
	return new String($out);
	});

/***/ },
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/26.
	 */
	var noDataTpl = __webpack_require__(26);
	__webpack_require__(27);
	
	var _$el;
	var noData = {
	    init: function(msg){
	        var p={msg:msg}
	        _$el.html(noDataTpl(p));
	    }
	};
	module.exports = {
	    init: function(dom,msg){
	        _$el = $("." + dom);
	        noData.init(msg);
	    },
	
	};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(4);
	module.exports=template('dep/component/no-data/tpl/no-data-tpl',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,msg=$data.msg,$out='';$out+='<div class="no-data-bg"></div> <div class="no-data-tip font-size12">';
	$out+=$escape(msg || '暂无数据');
	$out+='</div>';
	return new String($out);
	});

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(28);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(17)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./no-data.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./no-data.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(14)();
	// imports
	
	
	// module
	exports.push([module.id, ".no-data-bg{\r\n    margin: 47% auto 5%;\r\n    height: 57px;\r\n    width: 58px;\r\n    background: url(" + __webpack_require__(29) + ") center center no-repeat;\r\n}\r\n.no-data-tip{\r\n    text-align: center;\r\n    color: #999999;\r\n}", ""]);
	
	// exports


/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA6CAYAAAAKjPErAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4BpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphYWNhMzgyZC03ZTdmLTRlMDMtYWQwMy1lYTJkY2UxNjFhMWQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTVGNjVEQjYyMzI4MTFFNjlFRDU4OEIxMTg3ODdDNDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTVGNjVEQjUyMzI4MTFFNjlFRDU4OEIxMTg3ODdDNDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNzM4ZDRiMi1kODE0LTQ5NTUtYjcxNC0zOGM2Mjc0YjNlOTYiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo1NDU0YWUyOC01ZTQwLTExNzktODQxZi04NmU0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"

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by humorHan on 2016/5/24.
	 */
	var mockSelect = __webpack_require__(11);
	var util = __webpack_require__(2);
	var Mock = __webpack_require__(31);
	var mockData = Mock.mock(
	    {
	        'N|3-5': [
	            {
	                'GradeID|+1': 1,
	                'GradeName|1': ['小学','初中','高中'],
	                'SubjectID|+1': 100,
	                'SubjectName|1': ['数学','语文','英语','物理','生物','化学','政治','历史']
	            }
	        ]
	    }
	);
	
	
	var isCourseReady = false;
	var CurrentBigGrade, CurrentSubject;
	var courseInfo = {
	    init: function(){
	        this.initCourse();
	    },
	    initCourse: function(){
	        var param = {
	            AppID: sessionStorage.getItem('appid'),
	            OpenID: sessionStorage.getItem('openid')
	        };
	        var tThis = this;
	        //处理数据
	        var subjectlist = {
	            data: mockData.N
	        };
	        $.each(subjectlist.data,function(i, item){
	            item.id = item.GradeID + ',' + item.SubjectID;
	            item.name = item.GradeName + item.SubjectName
	        });
	        $.ajax({
	            type: 'post',
	            async:false,
	            url:util.getApiUrl('HomeSchoolContact/Registration/GetRegistrationDropDownList'),
	            data: param,
	            success:function(data){
	                util.checkBind(data);
	
	                if(data)
	                {
	                    if(data.OK)
	                    {
	                            //clist=data.N;
	                            $.each(data.N, function (i, item) {
	                                item.id = item.userSujectId;
	                                if (item.orderNum > 0) {
	                                    item.name = util.getStageStr(item.bgrade) + util.getSubjectName(item.subjectId) + item.orderNum.toString();
	                                }
	                                else {
	                                    item.name = util.getStageStr(item.bgrade) + util.getSubjectName(item.subjectId);
	                                }
	                                subjectlist.data = data.N;
	                            })
	                    }
	                    else {
	
	                    }
	                }
	            }
	        });
	
	        if(subjectlist.data.length>0)
	        {
	            mockSelect('course', subjectlist, function(ids){
	                //console.log('你需要的id集合: ' + ids);
	                var arrTemp = ids.split(',');
	                tThis.getcourseInfo(ids);
	            },function(){
	                //页面回调
	                //tThis.getcourseInfo();
	            },'course-option', function(flag){
	                if (flag) {}
	            });
	        }
	        else {
	            //无数据
	            var nodata=__webpack_require__(25);
	            nodata.init('bg-white','暂无课程信息');
	            return false;
	        }
	
	    },
	    //获取课程信息
	    getcourseInfo: function (id) {
	        var param = {
	            AppID: sessionStorage.getItem('appid'),
	            OpenID: sessionStorage.getItem('openid'),
	            usersubjectid:id
	
	        };
	        $.ajax({
	            type: 'post',
	            url: util.getApiUrl('HomeSchoolContact/Registration/GetRegistration'),
	            data: param,
	            dataType: 'json',
	            // timeout: 300,
	            success: function (data) {
	                util.checkBind(data);
	                if (data) {
	                    if (data.OK) {
	                        var c=data.N;
	                        if(c.length>0){
	                            if(c[0].classStartTime&&c[0].planid>0)
	                            {
	                            $("#coursestarttime").html('于 '+util.getLocalTime(c[0].classStartTime)+' 开课');
	                            }
	                            else
	                            {
	                                $("#coursestarttime").html('未开课');
	                            }
	                            var tpl=__webpack_require__(32);
	                            $("#tbcourseinfo").html(tpl(c));
	                        }
	                        else {
	                            //无数据
	                            var nodata=__webpack_require__(25);
	                            nodata.init('main','暂无课程信息');
	                        }
	
	
	                    }
	                }
	            }
	        });
	    }
	};
	$(function(){
	    courseInfo.init();
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*! mockjs 23-06-2014 15:57:37 */
	/*! src/mock-prefix.js */
	/*!
	    Mock - 模拟请求 & 模拟数据
	    https://github.com/nuysoft/Mock
	    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
	*/
	(function(undefined) {
	    var Mock = {
	        version: "0.1.5",
	        _mocked: {}
	    };
	    /*! src/util.js */
	    var Util = function() {
	        var Util = {};
	        Util.extend = function extend() {
	            var target = arguments[0] || {}, i = 1, length = arguments.length, options, name, src, copy, clone;
	            if (length === 1) {
	                target = this;
	                i = 0;
	            }
	            for (;i < length; i++) {
	                options = arguments[i];
	                if (!options) continue;
	                for (name in options) {
	                    src = target[name];
	                    copy = options[name];
	                    if (target === copy) continue;
	                    if (copy === undefined) continue;
	                    if (Util.isArray(copy) || Util.isObject(copy)) {
	                        if (Util.isArray(copy)) clone = src && Util.isArray(src) ? src : [];
	                        if (Util.isObject(copy)) clone = src && Util.isObject(src) ? src : {};
	                        target[name] = Util.extend(clone, copy);
	                    } else {
	                        target[name] = copy;
	                    }
	                }
	            }
	            return target;
	        };
	        Util.each = function each(obj, iterator, context) {
	            var i, key;
	            if (this.type(obj) === "number") {
	                for (i = 0; i < obj; i++) {
	                    iterator(i, i);
	                }
	            } else if (obj.length === +obj.length) {
	                for (i = 0; i < obj.length; i++) {
	                    if (iterator.call(context, obj[i], i, obj) === false) break;
	                }
	            } else {
	                for (key in obj) {
	                    if (iterator.call(context, obj[key], key, obj) === false) break;
	                }
	            }
	        };
	        Util.type = function type(obj) {
	            return obj === null || obj === undefined ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
	        };
	        Util.each("String Object Array RegExp Function".split(" "), function(value) {
	            Util["is" + value] = function(obj) {
	                return Util.type(obj) === value.toLowerCase();
	            };
	        });
	        Util.isObjectOrArray = function(value) {
	            return Util.isObject(value) || Util.isArray(value);
	        };
	        Util.isNumeric = function(value) {
	            return !isNaN(parseFloat(value)) && isFinite(value);
	        };
	        Util.keys = function(obj) {
	            var keys = [];
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) keys.push(key);
	            }
	            return keys;
	        };
	        Util.values = function(obj) {
	            var values = [];
	            for (var key in obj) {
	                if (obj.hasOwnProperty(key)) values.push(obj[key]);
	            }
	            return values;
	        };
	        Util.heredoc = function heredoc(fn) {
	            return fn.toString().replace(/^[^\/]+\/\*!?/, "").replace(/\*\/[^\/]+$/, "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
	        };
	        Util.noop = function() {};
	        return Util;
	    }();
	    /*! src/random.js */
	    var Random = function() {
	        var Random = {
	            extend: Util.extend
	        };
	        Random.extend({
	            "boolean": function(min, max, cur) {
	                if (cur !== undefined) {
	                    min = typeof min !== "undefined" && !isNaN(min) ? parseInt(min, 10) : 1;
	                    max = typeof max !== "undefined" && !isNaN(max) ? parseInt(max, 10) : 1;
	                    return Math.random() > 1 / (min + max) * min ? !cur : cur;
	                }
	                return Math.random() >= .5;
	            },
	            bool: function(min, max, cur) {
	                return this.boolean(min, max, cur);
	            },
	            natural: function(min, max) {
	                min = typeof min !== "undefined" ? parseInt(min, 10) : 0;
	                max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
	                return Math.round(Math.random() * (max - min)) + min;
	            },
	            integer: function(min, max) {
	                min = typeof min !== "undefined" ? parseInt(min, 10) : -9007199254740992;
	                max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
	                return Math.round(Math.random() * (max - min)) + min;
	            },
	            "int": function(min, max) {
	                return this.integer(min, max);
	            },
	            "float": function(min, max, dmin, dmax) {
	                dmin = dmin === undefined ? 0 : dmin;
	                dmin = Math.max(Math.min(dmin, 17), 0);
	                dmax = dmax === undefined ? 17 : dmax;
	                dmax = Math.max(Math.min(dmax, 17), 0);
	                var ret = this.integer(min, max) + ".";
	                for (var i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
	                    ret += this.character("number");
	                }
	                return parseFloat(ret, 10);
	            },
	            character: function(pool) {
	                var pools = {
	                    lower: "abcdefghijklmnopqrstuvwxyz",
	                    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
	                    number: "0123456789",
	                    symbol: "!@#$%^&*()[]"
	                };
	                pools.alpha = pools.lower + pools.upper;
	                pools["undefined"] = pools.lower + pools.upper + pools.number + pools.symbol;
	                pool = pools[("" + pool).toLowerCase()] || pool;
	                return pool.charAt(Random.natural(0, pool.length - 1));
	            },
	            "char": function(pool) {
	                return this.character(pool);
	            },
	            string: function(pool, min, max) {
	                var length;
	                if (arguments.length === 3) {
	                    length = Random.natural(min, max);
	                }
	                if (arguments.length === 2) {
	                    if (typeof arguments[0] === "string") {
	                        length = min;
	                    } else {
	                        length = Random.natural(pool, min);
	                        pool = undefined;
	                    }
	                }
	                if (arguments.length === 1) {
	                    length = pool;
	                    pool = undefined;
	                }
	                if (arguments.length === 0) {
	                    length = Random.natural(3, 7);
	                }
	                var text = "";
	                for (var i = 0; i < length; i++) {
	                    text += Random.character(pool);
	                }
	                return text;
	            },
	            str: function(pool, min, max) {
	                return this.string(pool, min, max);
	            },
	            range: function(start, stop, step) {
	                if (arguments.length <= 1) {
	                    stop = start || 0;
	                    start = 0;
	                }
	                step = arguments[2] || 1;
	                start = +start, stop = +stop, step = +step;
	                var len = Math.max(Math.ceil((stop - start) / step), 0);
	                var idx = 0;
	                var range = new Array(len);
	                while (idx < len) {
	                    range[idx++] = start;
	                    start += step;
	                }
	                return range;
	            }
	        });
	        Random.extend({
	            patternLetters: {
	                yyyy: "getFullYear",
	                yy: function(date) {
	                    return ("" + date.getFullYear()).slice(2);
	                },
	                y: "yy",
	                MM: function(date) {
	                    var m = date.getMonth() + 1;
	                    return m < 10 ? "0" + m : m;
	                },
	                M: function(date) {
	                    return date.getMonth() + 1;
	                },
	                dd: function(date) {
	                    var d = date.getDate();
	                    return d < 10 ? "0" + d : d;
	                },
	                d: "getDate",
	                HH: function(date) {
	                    var h = date.getHours();
	                    return h < 10 ? "0" + h : h;
	                },
	                H: "getHours",
	                hh: function(date) {
	                    var h = date.getHours() % 12;
	                    return h < 10 ? "0" + h : h;
	                },
	                h: function(date) {
	                    return date.getHours() % 12;
	                },
	                mm: function(date) {
	                    var m = date.getMinutes();
	                    return m < 10 ? "0" + m : m;
	                },
	                m: "getMinutes",
	                ss: function(date) {
	                    var s = date.getSeconds();
	                    return s < 10 ? "0" + s : s;
	                },
	                s: "getSeconds",
	                SS: function(date) {
	                    var ms = date.getMilliseconds();
	                    return ms < 10 && "00" + ms || ms < 100 && "0" + ms || ms;
	                },
	                S: "getMilliseconds",
	                A: function(date) {
	                    return date.getHours() < 12 ? "AM" : "PM";
	                },
	                a: function(date) {
	                    return date.getHours() < 12 ? "am" : "pm";
	                },
	                T: "getTime"
	            }
	        });
	        Random.extend({
	            rformat: new RegExp(function() {
	                var re = [];
	                for (var i in Random.patternLetters) re.push(i);
	                return "(" + re.join("|") + ")";
	            }(), "g"),
	            format: function(date, format) {
	                var patternLetters = Random.patternLetters, rformat = Random.rformat;
	                return format.replace(rformat, function($0, flag) {
	                    return typeof patternLetters[flag] === "function" ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? arguments.callee($0, patternLetters[flag]) : date[patternLetters[flag]]();
	                });
	            },
	            randomDate: function(min, max) {
	                min = min === undefined ? new Date(0) : min;
	                max = max === undefined ? new Date() : max;
	                return new Date(Math.random() * (max.getTime() - min.getTime()));
	            },
	            date: function(format) {
	                format = format || "yyyy-MM-dd";
	                return this.format(this.randomDate(), format);
	            },
	            time: function(format) {
	                format = format || "HH:mm:ss";
	                return this.format(this.randomDate(), format);
	            },
	            datetime: function(format) {
	                format = format || "yyyy-MM-dd HH:mm:ss";
	                return this.format(this.randomDate(), format);
	            },
	            now: function(unit, format) {
	                if (arguments.length === 1) {
	                    if (!/year|month|week|day|hour|minute|second|week/.test(unit)) {
	                        format = unit;
	                        unit = "";
	                    }
	                }
	                unit = (unit || "").toLowerCase();
	                format = format || "yyyy-MM-dd HH:mm:ss";
	                var date = new Date();
	                switch (unit) {
	                  case "year":
	                    date.setMonth(0);
	
	                  case "month":
	                    date.setDate(1);
	
	                  case "week":
	                  case "day":
	                    date.setHours(0);
	
	                  case "hour":
	                    date.setMinutes(0);
	
	                  case "minute":
	                    date.setSeconds(0);
	
	                  case "second":
	                    date.setMilliseconds(0);
	                }
	                switch (unit) {
	                  case "week":
	                    date.setDate(date.getDate() - date.getDay());
	                }
	                return this.format(date, format);
	            }
	        });
	        Random.extend({
	            ad_size: [ "300x250", "250x250", "240x400", "336x280", "180x150", "720x300", "468x60", "234x60", "88x31", "120x90", "120x60", "120x240", "125x125", "728x90", "160x600", "120x600", "300x600" ],
	            screen_size: [ "320x200", "320x240", "640x480", "800x480", "800x480", "1024x600", "1024x768", "1280x800", "1440x900", "1920x1200", "2560x1600" ],
	            video_size: [ "720x480", "768x576", "1280x720", "1920x1080" ],
	            image: function(size, background, foreground, format, text) {
	                if (arguments.length === 4) {
	                    text = format;
	                    format = undefined;
	                }
	                if (arguments.length === 3) {
	                    text = foreground;
	                    foreground = undefined;
	                }
	                if (!size) size = this.pick(this.ad_size);
	                if (background && ~background.indexOf("#")) background = background.slice(1);
	                if (foreground && ~foreground.indexOf("#")) foreground = foreground.slice(1);
	                return "http://dummyimage.com/" + size + (background ? "/" + background : "") + (foreground ? "/" + foreground : "") + (format ? "." + format : "") + (text ? "&text=" + text : "");
	            },
	            img: function() {
	                return this.image.apply(this, arguments);
	            }
	        });
	        Random.extend({
	            brandColors: {
	                "4ormat": "#fb0a2a",
	                "500px": "#02adea",
	                "About.me (blue)": "#00405d",
	                "About.me (yellow)": "#ffcc33",
	                Addvocate: "#ff6138",
	                Adobe: "#ff0000",
	                Aim: "#fcd20b",
	                Amazon: "#e47911",
	                Android: "#a4c639",
	                "Angie's List": "#7fbb00",
	                AOL: "#0060a3",
	                Atlassian: "#003366",
	                Behance: "#053eff",
	                "Big Cartel": "#97b538",
	                bitly: "#ee6123",
	                Blogger: "#fc4f08",
	                Boeing: "#0039a6",
	                "Booking.com": "#003580",
	                Carbonmade: "#613854",
	                Cheddar: "#ff7243",
	                "Code School": "#3d4944",
	                Delicious: "#205cc0",
	                Dell: "#3287c1",
	                Designmoo: "#e54a4f",
	                Deviantart: "#4e6252",
	                "Designer News": "#2d72da",
	                Devour: "#fd0001",
	                DEWALT: "#febd17",
	                "Disqus (blue)": "#59a3fc",
	                "Disqus (orange)": "#db7132",
	                Dribbble: "#ea4c89",
	                Dropbox: "#3d9ae8",
	                Drupal: "#0c76ab",
	                Dunked: "#2a323a",
	                eBay: "#89c507",
	                Ember: "#f05e1b",
	                Engadget: "#00bdf6",
	                Envato: "#528036",
	                Etsy: "#eb6d20",
	                Evernote: "#5ba525",
	                "Fab.com": "#dd0017",
	                Facebook: "#3b5998",
	                Firefox: "#e66000",
	                "Flickr (blue)": "#0063dc",
	                "Flickr (pink)": "#ff0084",
	                Forrst: "#5b9a68",
	                Foursquare: "#25a0ca",
	                Garmin: "#007cc3",
	                GetGlue: "#2d75a2",
	                Gimmebar: "#f70078",
	                GitHub: "#171515",
	                "Google Blue": "#0140ca",
	                "Google Green": "#16a61e",
	                "Google Red": "#dd1812",
	                "Google Yellow": "#fcca03",
	                "Google+": "#dd4b39",
	                Grooveshark: "#f77f00",
	                Groupon: "#82b548",
	                "Hacker News": "#ff6600",
	                HelloWallet: "#0085ca",
	                "Heroku (light)": "#c7c5e6",
	                "Heroku (dark)": "#6567a5",
	                HootSuite: "#003366",
	                Houzz: "#73ba37",
	                HTML5: "#ec6231",
	                IKEA: "#ffcc33",
	                IMDb: "#f3ce13",
	                Instagram: "#3f729b",
	                Intel: "#0071c5",
	                Intuit: "#365ebf",
	                Kickstarter: "#76cc1e",
	                kippt: "#e03500",
	                Kodery: "#00af81",
	                LastFM: "#c3000d",
	                LinkedIn: "#0e76a8",
	                Livestream: "#cf0005",
	                Lumo: "#576396",
	                Mixpanel: "#a086d3",
	                Meetup: "#e51937",
	                Nokia: "#183693",
	                NVIDIA: "#76b900",
	                Opera: "#cc0f16",
	                Path: "#e41f11",
	                "PayPal (dark)": "#1e477a",
	                "PayPal (light)": "#3b7bbf",
	                Pinboard: "#0000e6",
	                Pinterest: "#c8232c",
	                PlayStation: "#665cbe",
	                Pocket: "#ee4056",
	                Prezi: "#318bff",
	                Pusha: "#0f71b4",
	                Quora: "#a82400",
	                "QUOTE.fm": "#66ceff",
	                Rdio: "#008fd5",
	                Readability: "#9c0000",
	                "Red Hat": "#cc0000",
	                Resource: "#7eb400",
	                Rockpack: "#0ba6ab",
	                Roon: "#62b0d9",
	                RSS: "#ee802f",
	                Salesforce: "#1798c1",
	                Samsung: "#0c4da2",
	                Shopify: "#96bf48",
	                Skype: "#00aff0",
	                Snagajob: "#f47a20",
	                Softonic: "#008ace",
	                SoundCloud: "#ff7700",
	                "Space Box": "#f86960",
	                Spotify: "#81b71a",
	                Sprint: "#fee100",
	                Squarespace: "#121212",
	                StackOverflow: "#ef8236",
	                Staples: "#cc0000",
	                "Status Chart": "#d7584f",
	                Stripe: "#008cdd",
	                StudyBlue: "#00afe1",
	                StumbleUpon: "#f74425",
	                "T-Mobile": "#ea0a8e",
	                Technorati: "#40a800",
	                "The Next Web": "#ef4423",
	                Treehouse: "#5cb868",
	                Trulia: "#5eab1f",
	                Tumblr: "#34526f",
	                "Twitch.tv": "#6441a5",
	                Twitter: "#00acee",
	                TYPO3: "#ff8700",
	                Ubuntu: "#dd4814",
	                Ustream: "#3388ff",
	                Verizon: "#ef1d1d",
	                Vimeo: "#86c9ef",
	                Vine: "#00a478",
	                Virb: "#06afd8",
	                "Virgin Media": "#cc0000",
	                Wooga: "#5b009c",
	                "WordPress (blue)": "#21759b",
	                "WordPress (orange)": "#d54e21",
	                "WordPress (grey)": "#464646",
	                Wunderlist: "#2b88d9",
	                XBOX: "#9bc848",
	                XING: "#126567",
	                "Yahoo!": "#720e9e",
	                Yandex: "#ffcc00",
	                Yelp: "#c41200",
	                YouTube: "#c4302b",
	                Zalongo: "#5498dc",
	                Zendesk: "#78a300",
	                Zerply: "#9dcc7a",
	                Zootool: "#5e8b1d"
	            },
	            brands: function() {
	                var brands = [];
	                for (var b in this.brandColors) {
	                    brands.push(b);
	                }
	                return brands;
	            },
	            dataImage: function(size, text) {
	                var canvas = typeof document !== "undefined" && document.createElement("canvas"), ctx = canvas && canvas.getContext && canvas.getContext("2d");
	                if (!canvas || !ctx) return "";
	                if (!size) size = this.pick(this.ad_size);
	                text = text !== undefined ? text : size;
	                size = size.split("x");
	                var width = parseInt(size[0], 10), height = parseInt(size[1], 10), background = this.brandColors[this.pick(this.brands())], foreground = "#FFF", text_height = 14, font = "sans-serif";
	                canvas.width = width;
	                canvas.height = height;
	                ctx.textAlign = "center";
	                ctx.textBaseline = "middle";
	                ctx.fillStyle = background;
	                ctx.fillRect(0, 0, width, height);
	                ctx.fillStyle = foreground;
	                ctx.font = "bold " + text_height + "px " + font;
	                ctx.fillText(text, width / 2, height / 2, width);
	                return canvas.toDataURL("image/png");
	            }
	        });
	        Random.extend({
	            color: function() {
	                var colour = Math.floor(Math.random() * (16 * 16 * 16 * 16 * 16 * 16 - 1)).toString(16);
	                colour = "#" + ("000000" + colour).slice(-6);
	                return colour;
	            }
	        });
	        Random.extend({
	            capitalize: function(word) {
	                return (word + "").charAt(0).toUpperCase() + (word + "").substr(1);
	            },
	            upper: function(str) {
	                return (str + "").toUpperCase();
	            },
	            lower: function(str) {
	                return (str + "").toLowerCase();
	            },
	            pick: function(arr) {
	                arr = arr || [];
	                return arr[this.natural(0, arr.length - 1)];
	            },
	            shuffle: function(arr) {
	                arr = arr || [];
	                var old = arr.slice(0), result = [], index = 0, length = old.length;
	                for (var i = 0; i < length; i++) {
	                    index = this.natural(0, old.length - 1);
	                    result.push(old[index]);
	                    old.splice(index, 1);
	                }
	                return result;
	            }
	        });
	        Random.extend({
	            paragraph: function(min, max) {
	                var len;
	                if (arguments.length === 0) len = Random.natural(3, 7);
	                if (arguments.length === 1) len = max = min;
	                if (arguments.length === 2) {
	                    min = parseInt(min, 10);
	                    max = parseInt(max, 10);
	                    len = Random.natural(min, max);
	                }
	                var arr = [];
	                for (var i = 0; i < len; i++) {
	                    arr.push(Random.sentence());
	                }
	                return arr.join(" ");
	            },
	            sentence: function(min, max) {
	                var len;
	                if (arguments.length === 0) len = Random.natural(12, 18);
	                if (arguments.length === 1) len = max = min;
	                if (arguments.length === 2) {
	                    min = parseInt(min, 10);
	                    max = parseInt(max, 10);
	                    len = Random.natural(min, max);
	                }
	                var arr = [];
	                for (var i = 0; i < len; i++) {
	                    arr.push(Random.word());
	                }
	                return Random.capitalize(arr.join(" ")) + ".";
	            },
	            word: function(min, max) {
	                var len;
	                if (arguments.length === 0) len = Random.natural(3, 10);
	                if (arguments.length === 1) len = max = min;
	                if (arguments.length === 2) {
	                    min = parseInt(min, 10);
	                    max = parseInt(max, 10);
	                    len = Random.natural(min, max);
	                }
	                var result = "";
	                for (var i = 0; i < len; i++) {
	                    result += Random.character("lower");
	                }
	                return result;
	            },
	            title: function(min, max) {
	                var len, result = [];
	                if (arguments.length === 0) len = Random.natural(3, 7);
	                if (arguments.length === 1) len = max = min;
	                if (arguments.length === 2) {
	                    min = parseInt(min, 10);
	                    max = parseInt(max, 10);
	                    len = Random.natural(min, max);
	                }
	                for (var i = 0; i < len; i++) {
	                    result.push(this.capitalize(this.word()));
	                }
	                return result.join(" ");
	            }
	        });
	        Random.extend({
	            first: function() {
	                var names = [ "James", "John", "Robert", "Michael", "William", "David", "Richard", "Charles", "Joseph", "Thomas", "Christopher", "Daniel", "Paul", "Mark", "Donald", "George", "Kenneth", "Steven", "Edward", "Brian", "Ronald", "Anthony", "Kevin", "Jason", "Matthew", "Gary", "Timothy", "Jose", "Larry", "Jeffrey", "Frank", "Scott", "Eric" ].concat([ "Mary", "Patricia", "Linda", "Barbara", "Elizabeth", "Jennifer", "Maria", "Susan", "Margaret", "Dorothy", "Lisa", "Nancy", "Karen", "Betty", "Helen", "Sandra", "Donna", "Carol", "Ruth", "Sharon", "Michelle", "Laura", "Sarah", "Kimberly", "Deborah", "Jessica", "Shirley", "Cynthia", "Angela", "Melissa", "Brenda", "Amy", "Anna" ]);
	                return this.pick(names);
	                return this.capitalize(this.word());
	            },
	            last: function() {
	                var names = [ "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Garcia", "Rodriguez", "Wilson", "Martinez", "Anderson", "Taylor", "Thomas", "Hernandez", "Moore", "Martin", "Jackson", "Thompson", "White", "Lopez", "Lee", "Gonzalez", "Harris", "Clark", "Lewis", "Robinson", "Walker", "Perez", "Hall", "Young", "Allen" ];
	                return this.pick(names);
	                return this.capitalize(this.word());
	            },
	            name: function(middle) {
	                return this.first() + " " + (middle ? this.first() + " " : "") + this.last();
	            }
	        });
	        Random.extend({
	            url: function() {
	                return "http://" + this.domain() + "/" + this.word();
	            },
	            domain: function(tld) {
	                return this.word() + "." + (tld || this.tld());
	            },
	            email: function(domain) {
	                return this.character("lower") + "." + this.last().toLowerCase() + "@" + this.last().toLowerCase() + "." + this.tld();
	                return this.word() + "@" + (domain || this.domain());
	            },
	            ip: function() {
	                return this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255);
	            },
	            tlds: [ "com", "org", "edu", "gov", "co.uk", "net", "io" ],
	            tld: function() {
	                return this.pick(this.tlds);
	            }
	        });
	        Random.extend({
	            areas: [ "东北", "华北", "华东", "华中", "华南", "西南", "西北" ],
	            area: function() {
	                return this.pick(this.areas);
	            },
	            regions: [ "110000 北京市", "120000 天津市", "130000 河北省", "140000 山西省", "150000 内蒙古自治区", "210000 辽宁省", "220000 吉林省", "230000 黑龙江省", "310000 上海市", "320000 江苏省", "330000 浙江省", "340000 安徽省", "350000 福建省", "360000 江西省", "370000 山东省", "410000 河南省", "420000 湖北省", "430000 湖南省", "440000 广东省", "450000 广西壮族自治区", "460000 海南省", "500000 重庆市", "510000 四川省", "520000 贵州省", "530000 云南省", "540000 西藏自治区", "610000 陕西省", "620000 甘肃省", "630000 青海省", "640000 宁夏回族自治区", "650000 新疆维吾尔自治区", "650000 新疆维吾尔自治区", "710000 台湾省", "810000 香港特别行政区", "820000 澳门特别行政区" ],
	            region: function() {
	                return this.pick(this.regions).split(" ")[1];
	            },
	            address: function() {},
	            city: function() {},
	            phone: function() {},
	            areacode: function() {},
	            street: function() {},
	            street_suffixes: function() {},
	            street_suffix: function() {},
	            states: function() {},
	            state: function() {},
	            zip: function(len) {
	                var zip = "";
	                for (var i = 0; i < (len || 6); i++) zip += this.natural(0, 9);
	                return zip;
	            }
	        });
	        Random.extend({
	            todo: function() {
	                return "todo";
	            }
	        });
	        Random.extend({
	            d4: function() {
	                return this.natural(1, 4);
	            },
	            d6: function() {
	                return this.natural(1, 6);
	            },
	            d8: function() {
	                return this.natural(1, 8);
	            },
	            d12: function() {
	                return this.natural(1, 12);
	            },
	            d20: function() {
	                return this.natural(1, 20);
	            },
	            d100: function() {
	                return this.natural(1, 100);
	            },
	            guid: function() {
	                var pool = "ABCDEF1234567890", guid = this.string(pool, 8) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 12);
	                return guid;
	            },
	            id: function() {
	                var id, sum = 0, rank = [ "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2" ], last = [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ];
	                id = this.pick(this.regions).split(" ")[0] + this.date("yyyyMMdd") + this.string("number", 3);
	                for (var i = 0; i < id.length; i++) {
	                    sum += id[i] * rank[i];
	                }
	                id += last[sum % 11];
	                return id;
	            },
	            autoIncrementInteger: 0,
	            increment: function(step) {
	                return this.autoIncrementInteger += +step || 1;
	            },
	            inc: function(step) {
	                return this.increment(step);
	            }
	        });
	        return Random;
	    }();
	    /*! src/mock.js */
	    var rkey = /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/, rrange = /([\+\-]?\d+)-?([\+\-]?\d+)?/, rplaceholder = /\\*@([^@#%&()\?\s\/\.]+)(?:\((.*?)\))?/g;
	    Mock.extend = Util.extend;
	    Mock.mock = function(rurl, rtype, template) {
	        if (arguments.length === 1) {
	            return Handle.gen(rurl);
	        }
	        if (arguments.length === 2) {
	            template = rtype;
	            rtype = undefined;
	        }
	        Mock._mocked[rurl + (rtype || "")] = {
	            rurl: rurl,
	            rtype: rtype,
	            template: template
	        };
	        return Mock;
	    };
	    var Handle = {
	        extend: Util.extend
	    };
	    Handle.rule = function(name) {
	        name = (name || "") + "";
	        var parameters = (name || "").match(rkey), range = parameters && parameters[3] && parameters[3].match(rrange), min = range && parseInt(range[1], 10), max = range && parseInt(range[2], 10), count = range ? !range[2] && parseInt(range[1], 10) || Random.integer(min, max) : 1, decimal = parameters && parameters[4] && parameters[4].match(rrange), dmin = decimal && parseInt(decimal[1], 10), dmax = decimal && parseInt(decimal[2], 10), dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random.integer(dmin, dmax) : 0, point = parameters && parameters[4];
	        return {
	            parameters: parameters,
	            range: range,
	            min: min,
	            max: max,
	            count: count,
	            decimal: decimal,
	            dmin: dmin,
	            dmax: dmax,
	            dcount: dcount,
	            point: point
	        };
	    };
	    Handle.gen = function(template, name, context) {
	        name = name = (name || "") + "";
	        context = context || {};
	        context = {
	            path: context.path || [],
	            templatePath: context.templatePath || [],
	            currentContext: context.currentContext,
	            templateCurrentContext: context.templateCurrentContext || template,
	            root: context.root,
	            templateRoot: context.templateRoot
	        };
	        var rule = Handle.rule(name);
	        var type = Util.type(template);
	        if (Handle[type]) {
	            return Handle[type]({
	                type: type,
	                template: template,
	                name: name,
	                parsedName: name ? name.replace(rkey, "$1") : name,
	                rule: rule,
	                context: context
	            });
	        }
	        return template;
	    };
	    Handle.extend({
	        array: function(options) {
	            var result = [], i, j;
	            if (!options.rule.parameters) {
	                for (i = 0; i < options.template.length; i++) {
	                    options.context.path.push(i);
	                    result.push(Handle.gen(options.template[i], i, {
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        path: options.context.path
	                    }));
	                    options.context.path.pop();
	                }
	            } else {
	                if (options.rule.count === 1 && options.template.length > 1) {
	                    options.context.path.push(options.name);
	                    result = Random.pick(Handle.gen(options.template, undefined, {
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        path: options.context.path
	                    }));
	                    options.context.path.pop();
	                } else {
	                    for (i = 0; i < options.rule.count; i++) {
	                        j = 0;
	                        do {
	                            result.push(Handle.gen(options.template[j++]));
	                        } while (j < options.template.length);
	                    }
	                }
	            }
	            return result;
	        },
	        object: function(options) {
	            var result = {}, keys, fnKeys, key, parsedKey, inc, i;
	            if (options.rule.min) {
	                keys = Util.keys(options.template);
	                keys = Random.shuffle(keys);
	                keys = keys.slice(0, options.rule.count);
	                for (i = 0; i < keys.length; i++) {
	                    key = keys[i];
	                    parsedKey = key.replace(rkey, "$1");
	                    options.context.path.push(parsedKey);
	                    result[parsedKey] = Handle.gen(options.template[key], key, {
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        path: options.context.path
	                    });
	                    options.context.path.pop();
	                }
	            } else {
	                keys = [];
	                fnKeys = [];
	                for (key in options.template) {
	                    (typeof options.template[key] === "function" ? fnKeys : keys).push(key);
	                }
	                keys = keys.concat(fnKeys);
	                for (i = 0; i < keys.length; i++) {
	                    key = keys[i];
	                    parsedKey = key.replace(rkey, "$1");
	                    options.context.path.push(parsedKey);
	                    result[parsedKey] = Handle.gen(options.template[key], key, {
	                        currentContext: result,
	                        templateCurrentContext: options.template,
	                        path: options.context.path
	                    });
	                    options.context.path.pop();
	                    inc = key.match(rkey);
	                    if (inc && inc[2] && Util.type(options.template[key]) === "number") {
	                        options.template[key] += parseInt(inc[2], 10);
	                    }
	                }
	            }
	            return result;
	        },
	        number: function(options) {
	            var result, parts, i;
	            if (options.rule.point) {
	                options.template += "";
	                parts = options.template.split(".");
	                parts[0] = options.rule.range ? options.rule.count : parts[0];
	                parts[1] = (parts[1] || "").slice(0, options.rule.dcount);
	                for (i = 0; parts[1].length < options.rule.dcount; i++) {
	                    parts[1] += Random.character("number");
	                }
	                result = parseFloat(parts.join("."), 10);
	            } else {
	                result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template;
	            }
	            return result;
	        },
	        "boolean": function(options) {
	            var result;
	            result = options.rule.parameters ? Random.bool(options.rule.min, options.rule.max, options.template) : options.template;
	            return result;
	        },
	        string: function(options) {
	            var result = "", i, placeholders, ph, phed;
	            if (options.template.length) {
	                for (i = 0; i < options.rule.count; i++) {
	                    result += options.template;
	                }
	                placeholders = result.match(rplaceholder) || [];
	                for (i = 0; i < placeholders.length; i++) {
	                    ph = placeholders[i];
	                    if (/^\\/.test(ph)) {
	                        placeholders.splice(i--, 1);
	                        continue;
	                    }
	                    phed = Handle.placeholder(ph, options.context.currentContext, options.context.templateCurrentContext);
	                    if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) {
	                        result = phed;
	                        break;
	                        if (Util.isNumeric(phed)) {
	                            result = parseFloat(phed, 10);
	                            break;
	                        }
	                        if (/^(true|false)$/.test(phed)) {
	                            result = phed === "true" ? true : phed === "false" ? false : phed;
	                            break;
	                        }
	                    }
	                    result = result.replace(ph, phed);
	                }
	            } else {
	                result = options.rule.range ? Random.string(options.rule.count) : options.template;
	            }
	            return result;
	        },
	        "function": function(options) {
	            return options.template.call(options.context.currentContext);
	        }
	    });
	    Handle.extend({
	        _all: function() {
	            var re = {};
	            for (var key in Random) re[key.toLowerCase()] = key;
	            return re;
	        },
	        placeholder: function(placeholder, obj, templateContext) {
	            rplaceholder.exec("");
	            var parts = rplaceholder.exec(placeholder), key = parts && parts[1], lkey = key && key.toLowerCase(), okey = this._all()[lkey], params = parts && parts[2] || "";
	            try {
	                params = eval("(function(){ return [].splice.call(arguments, 0 ) })(" + params + ")");
	            } catch (error) {
	                params = parts[2].split(/,\s*/);
	            }
	            if (obj && key in obj) return obj[key];
	            if (templateContext && typeof templateContext === "object" && key in templateContext && placeholder !== templateContext[key]) {
	                templateContext[key] = Handle.gen(templateContext[key], key, {
	                    currentContext: obj,
	                    templateCurrentContext: templateContext
	                });
	                return templateContext[key];
	            }
	            if (!(key in Random) && !(lkey in Random) && !(okey in Random)) return placeholder;
	            for (var i = 0; i < params.length; i++) {
	                rplaceholder.exec("");
	                if (rplaceholder.test(params[i])) {
	                    params[i] = Handle.placeholder(params[i], obj);
	                }
	            }
	            var handle = Random[key] || Random[lkey] || Random[okey];
	            switch (Util.type(handle)) {
	              case "array":
	                return Random.pick(handle);
	
	              case "function":
	                var re = handle.apply(Random, params);
	                if (re === undefined) re = "";
	                return re;
	            }
	        }
	    });
	    /*! src/mockjax.js */
	    function find(options) {
	        for (var sUrlType in Mock._mocked) {
	            var item = Mock._mocked[sUrlType];
	            if ((!item.rurl || match(item.rurl, options.url)) && (!item.rtype || match(item.rtype, options.type.toLowerCase()))) {
	                return item;
	            }
	        }
	        function match(expected, actual) {
	            if (Util.type(expected) === "string") {
	                return expected === actual;
	            }
	            if (Util.type(expected) === "regexp") {
	                return expected.test(actual);
	            }
	        }
	    }
	    function convert(item, options) {
	        return Util.isFunction(item.template) ? item.template(options) : Mock.mock(item.template);
	    }
	    Mock.mockjax = function mockjax(jQuery) {
	        function mockxhr() {
	            return {
	                readyState: 4,
	                status: 200,
	                statusText: "",
	                open: jQuery.noop,
	                send: function() {
	                    if (this.onload) this.onload();
	                },
	                setRequestHeader: jQuery.noop,
	                getAllResponseHeaders: jQuery.noop,
	                getResponseHeader: jQuery.noop,
	                statusCode: jQuery.noop,
	                abort: jQuery.noop
	            };
	        }
	        function prefilter(options, originalOptions, jqXHR) {
	            var item = find(options);
	            if (item) {
	                options.dataFilter = options.converters["text json"] = options.converters["text jsonp"] = options.converters["text script"] = options.converters["script json"] = function() {
	                    return convert(item, options);
	                };
	                options.xhr = mockxhr;
	                if (originalOptions.dataType !== "script") return "json";
	            }
	        }
	        jQuery.ajaxPrefilter("json jsonp script", prefilter);
	        return Mock;
	    };
	    if (typeof jQuery != "undefined") Mock.mockjax(jQuery);
	    if (typeof Zepto != "undefined") {
	        Mock.mockjax = function(Zepto) {
	            var __original_ajax = Zepto.ajax;
	            var xhr = {
	                readyState: 4,
	                responseText: "",
	                responseXML: null,
	                state: 2,
	                status: 200,
	                statusText: "success",
	                timeoutTimer: null
	            };
	            Zepto.ajax = function(options) {
	                var item = find(options);
	                if (item) {
	                    var data = Mock.mock(item.template);
	                    if (options.success) options.success(data, xhr, options);
	                    if (options.complete) options.complete(xhr.status, xhr, options);
	                    return xhr;
	                }
	                return __original_ajax.call(Zepto, options);
	            };
	        };
	        Mock.mockjax(Zepto);
	    }
	    if (typeof KISSY != "undefined" && KISSY.add) {
	        Mock.mockjax = function mockjax(KISSY) {
	            var _original_ajax = KISSY.io;
	            var xhr = {
	                readyState: 4,
	                responseText: "",
	                responseXML: null,
	                state: 2,
	                status: 200,
	                statusText: "success",
	                timeoutTimer: null
	            };
	            KISSY.io = function(options) {
	                var item = find(options);
	                if (item) {
	                    var data = Mock.mock(item.template);
	                    if (options.success) options.success(data, xhr, options);
	                    if (options.complete) options.complete(xhr.status, xhr, options);
	                    return xhr;
	                }
	                return _original_ajax.apply(this, arguments);
	            };
	            for (var name in _original_ajax) {
	                KISSY.io[name] = _original_ajax[name];
	            }
	        };
	    }
	    /*! src/expose.js */
	    Mock.Util = Util;
	    Mock.Random = Random;
	    Mock.heredoc = Util.heredoc;
	    if (typeof module === "object" && module.exports) {
	        module.exports = Mock;
	    } else if (true) {
	        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	            return Mock;
	        }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof define === "function" && define.cmd) {
	        define(function() {
	            return Mock;
	        });
	    }
	    this.Mock = Mock;
	    this.Random = Random;
	    if (typeof KISSY != "undefined") {
	        Util.each([ "mock", "components/mock/", "mock/dist/mock", "gallery/Mock/0.1.1/", "gallery/Mock/0.1.2/", "gallery/Mock/0.1.3/" ], function register(name) {
	            KISSY.add(name, function(S) {
	                Mock.mockjax(S);
	                return Mock;
	            }, {
	                requires: [ "ajax" ]
	            });
	        });
	    }
	    /*! src/mock4tpl.js */
	    (function(undefined) {
	        var Mock4Tpl = {
	            version: "0.0.1"
	        };
	        if (!this.Mock) module.exports = Mock4Tpl;
	        Mock.tpl = function(input, options, helpers, partials) {
	            return Mock4Tpl.mock(input, options, helpers, partials);
	        };
	        Mock.parse = function(input) {
	            return Handlebars.parse(input);
	        };
	        Mock4Tpl.mock = function(input, options, helpers, partials) {
	            helpers = helpers ? Util.extend({}, helpers, Handlebars.helpers) : Handlebars.helpers;
	            partials = partials ? Util.extend({}, partials, Handlebars.partials) : Handlebars.partials;
	            return Handle.gen(input, null, options, helpers, partials);
	        };
	        var Handle = {
	            debug: Mock4Tpl.debug || false,
	            extend: Util.extend
	        };
	        Handle.gen = function(node, context, options, helpers, partials) {
	            if (Util.isString(node)) {
	                var ast = Handlebars.parse(node);
	                options = Handle.parseOptions(node, options);
	                var data = Handle.gen(ast, context, options, helpers, partials);
	                return data;
	            }
	            context = context || [ {} ];
	            options = options || {};
	            if (this[node.type] === Util.noop) return;
	            options.__path = options.__path || [];
	            if (Mock4Tpl.debug || Handle.debug) {
	                console.log();
	                console.group("[" + node.type + "]", JSON.stringify(node));
	                console.log("[options]", options.__path.length, JSON.stringify(options));
	            }
	            var preLength = options.__path.length;
	            this[node.type](node, context, options, helpers, partials);
	            options.__path.splice(preLength);
	            if (Mock4Tpl.debug || Handle.debug) {
	                console.groupEnd();
	            }
	            return context[context.length - 1];
	        };
	        Handle.parseOptions = function(input, options) {
	            var rComment = /<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g;
	            var comments = input.match(rComment), ret = {}, i, ma, option;
	            for (i = 0; comments && i < comments.length; i++) {
	                rComment.lastIndex = 0;
	                ma = rComment.exec(comments[i]);
	                if (ma) {
	                    option = new Function("return " + ma[1]);
	                    option = option();
	                    Util.extend(ret, option);
	                }
	            }
	            return Util.extend(ret, options);
	        };
	        Handle.val = function(name, options, context, def) {
	            if (name !== options.__path[options.__path.length - 1]) throw new Error(name + "!==" + options.__path);
	            if (Mock4Tpl.debug || Handle.debug) console.log("[options]", name, options.__path);
	            if (def !== undefined) def = Mock.mock(def);
	            if (options) {
	                var mocked = Mock.mock(options);
	                if (Util.isString(mocked)) return mocked;
	                if (name in mocked) {
	                    return mocked[name];
	                }
	            }
	            if (Util.isArray(context[0])) return {};
	            return def !== undefined ? def : name || Random.word();
	        };
	        Handle.program = function(node, context, options, helpers, partials) {
	            for (var i = 0; i < node.statements.length; i++) {
	                this.gen(node.statements[i], context, options, helpers, partials);
	            }
	        };
	        Handle.mustache = function(node, context, options, helpers, partials) {
	            var i, currentContext = context[0], contextLength = context.length;
	            if (Util.type(currentContext) === "array") {
	                currentContext.push({});
	                currentContext = currentContext[currentContext.length - 1];
	                context.unshift(currentContext);
	            }
	            if (node.isHelper || helpers && helpers[node.id.string]) {
	                if (node.params.length === 0) {} else {
	                    for (i = 0; i < node.params.length; i++) {
	                        this.gen(node.params[i], context, options, helpers, partials);
	                    }
	                }
	                if (node.hash) this.gen(node.hash, context, options, helpers, partials);
	            } else {
	                this.gen(node.id, context, options, helpers, partials);
	            }
	            if (context.length > contextLength) context.splice(0, context.length - contextLength);
	        };
	        Handle.block = function(node, context, options, helpers, partials) {
	            var parts = node.mustache.id.parts, i, len, cur, val, type, currentContext = context[0], contextLength = context.length;
	            if (node.inverse) {}
	            if (node.mustache.isHelper || helpers && helpers[node.mustache.id.string]) {
	                type = parts[0];
	                val = (Helpers[type] || Helpers.custom).apply(this, arguments);
	                currentContext = context[0];
	            } else {
	                for (i = 0; i < parts.length; i++) {
	                    options.__path.push(parts[i]);
	                    cur = parts[i];
	                    val = this.val(cur, options, context, {});
	                    currentContext[cur] = Util.isArray(val) && [] || val;
	                    type = Util.type(currentContext[cur]);
	                    if (type === "object" || type === "array") {
	                        currentContext = currentContext[cur];
	                        context.unshift(currentContext);
	                    }
	                }
	            }
	            if (node.program) {
	                if (Util.type(currentContext) === "array") {
	                    len = val.length || Random.integer(3, 7);
	                    for (i = 0; i < len; i++) {
	                        currentContext.push(typeof val[i] !== "undefined" ? val[i] : {});
	                        options.__path.push("[]");
	                        context.unshift(currentContext[currentContext.length - 1]);
	                        this.gen(node.program, context, options, helpers, partials);
	                        options.__path.pop();
	                        context.shift();
	                    }
	                } else this.gen(node.program, context, options, helpers, partials);
	            }
	            if (context.length > contextLength) context.splice(0, context.length - contextLength);
	        };
	        Handle.hash = function(node, context, options, helpers, partials) {
	            var pairs = node.pairs, pair, i, j;
	            for (i = 0; i < pairs.length; i++) {
	                pair = pairs[i];
	                for (j = 1; j < pair.length; j++) {
	                    this.gen(pair[j], context, options, helpers, partials);
	                }
	            }
	        };
	        Handle.ID = function(node, context, options) {
	            var parts = node.parts, i, len, cur, prev, def, val, type, valType, preOptions, currentContext = context[node.depth], contextLength = context.length;
	            if (Util.isArray(currentContext)) currentContext = context[node.depth + 1];
	            if (!parts.length) {} else {
	                for (i = 0, len = parts.length; i < len; i++) {
	                    options.__path.push(parts[i]);
	                    cur = parts[i];
	                    prev = parts[i - 1];
	                    preOptions = options[prev];
	                    def = i === len - 1 ? currentContext[cur] : {};
	                    val = this.val(cur, options, context, def);
	                    type = Util.type(currentContext[cur]);
	                    valType = Util.type(val);
	                    if (type === "undefined") {
	                        if (i < len - 1 && valType !== "object" && valType !== "array") {
	                            currentContext[cur] = {};
	                        } else {
	                            currentContext[cur] = Util.isArray(val) && [] || val;
	                        }
	                    } else {
	                        if (i < len - 1 && type !== "object" && type !== "array") {
	                            currentContext[cur] = Util.isArray(val) && [] || {};
	                        }
	                    }
	                    type = Util.type(currentContext[cur]);
	                    if (type === "object" || type === "array") {
	                        currentContext = currentContext[cur];
	                        context.unshift(currentContext);
	                    }
	                }
	            }
	            if (context.length > contextLength) context.splice(0, context.length - contextLength);
	        };
	        Handle.partial = function(node, context, options, helpers, partials) {
	            var name = node.partialName.name, partial = partials && partials[name], contextLength = context.length;
	            if (partial) Handle.gen(partial, context, options, helpers, partials);
	            if (context.length > contextLength) context.splice(0, context.length - contextLength);
	        };
	        Handle.content = Util.noop;
	        Handle.PARTIAL_NAME = Util.noop;
	        Handle.DATA = Util.noop;
	        Handle.STRING = Util.noop;
	        Handle.INTEGER = Util.noop;
	        Handle.BOOLEAN = Util.noop;
	        Handle.comment = Util.noop;
	        var Helpers = {};
	        Helpers.each = function(node, context, options) {
	            var i, len, cur, val, parts, def, type, currentContext = context[0];
	            parts = node.mustache.params[0].parts;
	            for (i = 0, len = parts.length; i < len; i++) {
	                options.__path.push(parts[i]);
	                cur = parts[i];
	                def = i === len - 1 ? [] : {};
	                val = this.val(cur, options, context, def);
	                currentContext[cur] = Util.isArray(val) && [] || val;
	                type = Util.type(currentContext[cur]);
	                if (type === "object" || type === "array") {
	                    currentContext = currentContext[cur];
	                    context.unshift(currentContext);
	                }
	            }
	            return val;
	        };
	        Helpers["if"] = Helpers.unless = function(node, context, options) {
	            var params = node.mustache.params, i, j, cur, val, parts, def, type, currentContext = context[0];
	            for (i = 0; i < params.length; i++) {
	                parts = params[i].parts;
	                for (j = 0; j < parts.length; j++) {
	                    if (i === 0) options.__path.push(parts[j]);
	                    cur = parts[j];
	                    def = j === parts.length - 1 ? "@BOOL(2,1,true)" : {};
	                    val = this.val(cur, options, context, def);
	                    if (j === parts.length - 1) {
	                        val = val === "true" ? true : val === "false" ? false : val;
	                    }
	                    currentContext[cur] = Util.isArray(val) ? [] : val;
	                    type = Util.type(currentContext[cur]);
	                    if (type === "object" || type === "array") {
	                        currentContext = currentContext[cur];
	                        context.unshift(currentContext);
	                    }
	                }
	            }
	            return val;
	        };
	        Helpers["with"] = function(node, context, options) {
	            var i, cur, val, parts, def, currentContext = context[0];
	            parts = node.mustache.params[0].parts;
	            for (i = 0; i < parts.length; i++) {
	                options.__path.push(parts[i]);
	                cur = parts[i];
	                def = {};
	                val = this.val(cur, options, context, def);
	                currentContext = currentContext[cur] = val;
	                context.unshift(currentContext);
	            }
	            return val;
	        };
	        Helpers.log = function() {};
	        Helpers.custom = function(node, context, options) {
	            var i, len, cur, val, parts, def, type, currentContext = context[0];
	            if (node.mustache.params.length === 0) {
	                return;
	                options.__path.push(node.mustache.id.string);
	                cur = node.mustache.id.string;
	                def = "@BOOL(2,1,true)";
	                val = this.val(cur, options, context, def);
	                currentContext[cur] = Util.isArray(val) && [] || val;
	                type = Util.type(currentContext[cur]);
	                if (type === "object" || type === "array") {
	                    currentContext = currentContext[cur];
	                    context.unshift(currentContext);
	                }
	            } else {
	                parts = node.mustache.params[0].parts;
	                for (i = 0, len = parts.length; i < len; i++) {
	                    options.__path.push(parts[i]);
	                    cur = parts[i];
	                    def = i === len - 1 ? [] : {};
	                    val = this.val(cur, options, context, def);
	                    currentContext[cur] = Util.isArray(val) && [] || val;
	                    type = Util.type(currentContext[cur]);
	                    if (type === "object" || type === "array") {
	                        currentContext = currentContext[cur];
	                        context.unshift(currentContext);
	                    }
	                }
	            }
	            return val;
	        };
	    }).call(this);
	    /*! src/mock4xtpl.js */
	    (function(undefined) {
	        if (typeof KISSY === "undefined") return;
	        var Mock4XTpl = {
	            debug: false
	        };
	        var XTemplate;
	        KISSY.use("xtemplate", function(S, T) {
	            XTemplate = T;
	        });
	        if (!this.Mock) module.exports = Mock4XTpl;
	        Mock.xtpl = function(input, options, helpers, partials) {
	            return Mock4XTpl.mock(input, options, helpers, partials);
	        };
	        Mock.xparse = function(input) {
	            return XTemplate.compiler.parse(input);
	        };
	        Mock4XTpl.mock = function(input, options, helpers, partials) {
	            helpers = helpers ? Util.extend({}, helpers, XTemplate.RunTime.commands) : XTemplate.RunTime.commands;
	            partials = partials ? Util.extend({}, partials, XTemplate.RunTime.subTpls) : XTemplate.RunTime.subTpls;
	            return this.gen(input, null, options, helpers, partials, {});
	        };
	        Mock4XTpl.parse = function(input) {
	            return XTemplate.compiler.parse(input);
	        };
	        Mock4XTpl.gen = function(node, context, options, helpers, partials, other) {
	            if (typeof node === "string") {
	                if (Mock4XTpl.debug) {
	                    console.log("[tpl    ]\n", node);
	                }
	                var ast = this.parse(node);
	                options = this.parseOptions(node, options);
	                var data = this.gen(ast, context, options, helpers, partials, other);
	                return data;
	            }
	            context = context || [ {} ];
	            options = options || {};
	            node.type = node.type;
	            if (this[node.type] === Util.noop) return;
	            options.__path = options.__path || [];
	            if (Mock4XTpl.debug) {
	                console.log();
	                console.group("[" + node.type + "]", JSON.stringify(node));
	                console.log("[context]", "[before]", context.length, JSON.stringify(context));
	                console.log("[options]", "[before]", options.__path.length, JSON.stringify(options));
	                console.log("[other  ]", "[before]", JSON.stringify(other));
	            }
	            var preLength = options.__path.length;
	            this[node.type](node, context, options, helpers, partials, other);
	            if (Mock4XTpl.debug) {
	                console.log("[__path ]", "[after ]", options.__path);
	            }
	            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context)) {
	                options.__path.splice(preLength);
	            }
	            if (Mock4XTpl.debug) {
	                console.log("[context]", "[after ]", context.length, JSON.stringify(context));
	                console.groupEnd();
	            }
	            return context[context.length - 1];
	        };
	        Mock4XTpl.parseOptions = function(input, options) {
	            var rComment = /<!--\s*\n*Mock\s*\n*([\w\W]+?)\s*\n*-->/g;
	            var comments = input.match(rComment), ret = {}, i, ma, option;
	            for (i = 0; comments && i < comments.length; i++) {
	                rComment.lastIndex = 0;
	                ma = rComment.exec(comments[i]);
	                if (ma) {
	                    option = new Function("return " + ma[1]);
	                    option = option();
	                    Util.extend(ret, option);
	                }
	            }
	            return Util.extend(ret, options);
	        };
	        Mock4XTpl.parseVal = function(expr, object) {
	            function queryArray(prop, context) {
	                if (typeof context === "object" && prop in context) return [ context[prop] ];
	                var ret = [];
	                for (var i = 0; i < context.length; i++) {
	                    ret.push.apply(ret, query(prop, [ context[i] ]));
	                }
	                return ret;
	            }
	            function queryObject(prop, context) {
	                if (typeof context === "object" && prop in context) return [ context[prop] ];
	                var ret = [];
	                for (var key in context) {
	                    ret.push.apply(ret, query(prop, [ context[key] ]));
	                }
	                return ret;
	            }
	            function query(prop, set) {
	                var ret = [];
	                for (var i = 0; i < set.length; i++) {
	                    if (typeof set[i] !== "object") continue;
	                    if (prop in set[i]) ret.push(set[i][prop]); else {
	                        ret.push.apply(ret, Util.isArray(set[i]) ? queryArray(prop, set[i]) : queryObject(prop, set[i]));
	                    }
	                }
	                return ret;
	            }
	            function parse(expr, context) {
	                var parts = typeof expr === "string" ? expr.split(".") : expr.slice(0), set = [ context ];
	                while (parts.length) {
	                    set = query(parts.shift(), set);
	                }
	                return set;
	            }
	            return parse(expr, object);
	        };
	        Mock4XTpl.val = function(name, options, context, def) {
	            if (name !== options.__path[options.__path.length - 1]) throw new Error(name + "!==" + options.__path);
	            if (def !== undefined) def = Mock.mock(def);
	            if (options) {
	                var mocked = Mock.mock(options);
	                if (Util.isString(mocked)) return mocked;
	                var ret = Mock4XTpl.parseVal(options.__path, mocked);
	                if (ret.length > 0) return ret[0];
	                if (name in mocked) {
	                    return mocked[name];
	                }
	            }
	            if (Util.isArray(context[0])) return {};
	            return def !== undefined ? def : name;
	        };
	        Mock4XTpl.program = function(node, context, options, helpers, partials, other) {
	            for (var i = 0; i < node.statements.length; i++) {
	                this.gen(node.statements[i], context, options, helpers, partials, other);
	            }
	            for (var j = 0; node.inverse && j < node.inverse.length; j++) {
	                this.gen(node.inverse[j], context, options, helpers, partials, other);
	            }
	        };
	        Mock4XTpl.block = function(node, context, options, helpers, partials, other) {
	            var contextLength = context.length;
	            this.gen(node.tpl, context, options, helpers, partials, Util.extend({}, other, {
	                def: {},
	                hold: true
	            }));
	            var currentContext = context[0], mocked, i, len;
	            if (Util.type(currentContext) === "array") {
	                mocked = this.val(options.__path[options.__path.length - 1], options, context);
	                len = mocked && mocked.length || Random.integer(3, 7);
	                for (i = 0; i < len; i++) {
	                    currentContext.push(mocked && mocked[i] !== undefined ? mocked[i] : {});
	                    options.__path.push(i);
	                    context.unshift(currentContext[currentContext.length - 1]);
	                    this.gen(node.program, context, options, helpers, partials, other);
	                    options.__path.pop();
	                    context.shift();
	                }
	            } else this.gen(node.program, context, options, helpers, partials, other);
	            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context)) {
	                context.splice(0, context.length - contextLength);
	            }
	        };
	        Mock4XTpl.tpl = function(node, context, options, helpers, partials, other) {
	            if (node.params && node.params.length) {
	                other = Util.extend({}, other, {
	                    def: {
	                        each: [],
	                        "if": "@BOOL(2,1,true)",
	                        unless: "@BOOL(2,1,false)",
	                        "with": {}
	                    }[node.path.string],
	                    hold: {
	                        each: true,
	                        "if": function(_, __, ___, name, value) {
	                            return typeof value === "object";
	                        },
	                        unless: function(_, __, ___, name, value) {
	                            return typeof value === "object";
	                        },
	                        "with": true,
	                        include: false
	                    }[node.path.string]
	                });
	                for (var i = 0, input; i < node.params.length; i++) {
	                    if (node.path.string === "include") {
	                        input = partials && partials[node.params[i].value];
	                    } else input = node.params[i];
	                    if (input) this.gen(input, context, options, helpers, partials, other);
	                }
	                if (node.hash) {
	                    this.gen(node.hash, context, options, helpers, partials, other);
	                }
	            } else {
	                this.gen(node.path, context, options, helpers, partials, other);
	            }
	        };
	        Mock4XTpl.tplExpression = function(node, context, options, helpers, partials, other) {
	            this.gen(node.expression, context, options, helpers, partials, other);
	        };
	        Mock4XTpl.content = Util.noop;
	        Mock4XTpl.unaryExpression = Util.noop;
	        Mock4XTpl.multiplicativeExpression = Mock4XTpl.additiveExpression = function(node, context, options, helpers, partials, other) {
	            this.gen(node.op1, context, options, helpers, partials, Util.extend({}, other, {
	                def: function() {
	                    return node.op2.type === "number" ? node.op2.value.indexOf(".") > -1 ? Random.float(-Math.pow(10, 10), Math.pow(10, 10), 1, Math.pow(10, 6)) : Random.integer() : undefined;
	                }()
	            }));
	            this.gen(node.op2, context, options, helpers, partials, Util.extend({}, other, {
	                def: function() {
	                    return node.op1.type === "number" ? node.op1.value.indexOf(".") > -1 ? Random.float(-Math.pow(10, 10), Math.pow(10, 10), 1, Math.pow(10, 6)) : Random.integer() : undefined;
	                }()
	            }));
	        };
	        Mock4XTpl.relationalExpression = function(node, context, options, helpers, partials, other) {
	            this.gen(node.op1, context, options, helpers, partials, other);
	            this.gen(node.op2, context, options, helpers, partials, other);
	        };
	        Mock4XTpl.equalityExpression = Util.noop;
	        Mock4XTpl.conditionalAndExpression = Util.noop;
	        Mock4XTpl.conditionalOrExpression = Util.noop;
	        Mock4XTpl.string = Util.noop;
	        Mock4XTpl.number = Util.noop;
	        Mock4XTpl.boolean = Util.noop;
	        Mock4XTpl.hash = function(node, context, options, helpers, partials, other) {
	            var pairs = node.value, key;
	            for (key in pairs) {
	                this.gen(pairs[key], context, options, helpers, partials, other);
	            }
	        };
	        Mock4XTpl.id = function(node, context, options, helpers, partials, other) {
	            var contextLength = context.length;
	            var parts = node.parts, currentContext = context[node.depth], i, len, cur, def, val;
	            function fix(currentContext, index, length, name, val) {
	                var type = Util.type(currentContext[name]), valType = Util.type(val);
	                val = val === "true" ? true : val === "false" ? false : val;
	                if (type === "undefined") {
	                    if (index < length - 1 && !Util.isObjectOrArray(val)) {
	                        currentContext[name] = {};
	                    } else {
	                        currentContext[name] = Util.isArray(val) && [] || val;
	                    }
	                } else {
	                    if (index < length - 1 && type !== "object" && type !== "array") {
	                        currentContext[name] = Util.isArray(val) && [] || {};
	                    } else {
	                        if (type !== "object" && type !== "array" && valType !== "object" && valType !== "array") {
	                            currentContext[name] = val;
	                        }
	                    }
	                }
	                return currentContext[name];
	            }
	            if (Util.isArray(currentContext)) currentContext = context[node.depth + 1];
	            for (i = 0, len = parts.length; i < len; i++) {
	                if (i === 0 && parts[i] === "this") continue;
	                if (/^(xindex|xcount|xkey)$/.test(parts[i])) continue;
	                if (i === 0 && len === 1 && parts[i] in helpers) continue;
	                options.__path.push(parts[i]);
	                cur = parts[i];
	                def = i === len - 1 ? other.def !== undefined ? other.def : context[0][cur] : {};
	                val = this.val(cur, options, context, def);
	                if (Mock4XTpl.debug) {
	                    console.log("[def    ]", JSON.stringify(def));
	                    console.log("[val    ]", JSON.stringify(val));
	                }
	                val = fix(currentContext, i, len, cur, val);
	                if (Util.isObjectOrArray(currentContext[cur])) {
	                    context.unshift(currentContext = currentContext[cur]);
	                }
	            }
	            if (!other.hold || typeof other.hold === "function" && !other.hold(node, options, context, cur, val)) {
	                context.splice(0, context.length - contextLength);
	            }
	        };
	    }).call(this);
	}).call(this);

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(4);
	module.exports=template('tpl/courseinfo',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' ';
	$each($data,function($value,$index){
	$out+=' <table> <tr><td class="pct25">授课老师</td><td class="tdvalue">';
	$out+=$escape($value.teacherName);
	$out+='</td></tr> <tr><td>报名课时</td><td class="tdvalue">';
	$out+=$escape($value.totalClassHour-$value.classHour);
	$out+='</td></tr> <tr><td>剩余课时</td><td class="tdvalue">';
	$out+=$escape(($value.totalClassHour-$value.classHour)>0?($value.totalClassHour-$value.classHour):0);
	$out+='</td></tr> </table> <div class="foot"> <p class="plan">已上完 ';
	$out+=$escape($value.teachProcess);
	$out+='/';
	$out+=$escape($value.totalCourse);
	$out+=' 次课</p> <p class="hint">根据实际情况：总课次会略有调整</p> </div> <div class="totalinfo fl"> <div class="teach fl mlp6"> <p class="desc bg-ff7f01">';
	$out+=$escape($value.teachProcess);
	$out+='</p> <p class="num bg-e85700">已讲学案</p> </div> <div class="teach fr mrp6"> <p class="desc bg-green">';
	$out+=$escape($value.makeHomeWorkCount);
	$out+='</p> <p class="num bg-darkgreen">作业总数</p> </div> </div> ';
	});
	$out+=' ';
	return new String($out);
	});

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTM2ZGJlYzQzMzZlNjI1NThjNDQ/Y2Y2NCoqKioiLCJ3ZWJwYWNrOi8vLy4vZGVwL3V0aWwvdXRpbC5qcz8yMjIxKioqKiIsIndlYnBhY2s6Ly8vLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qcz84OTY2KioqIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvbW9jay1zZWxlY3QuanM/YjQyNyIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2Nzcy9tb2NrLXNlbGVjdC5jc3M/OGEwYSoiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9jc3MvbW9jay1zZWxlY3QuY3NzPzEzOTQqIiwid2VicGFjazovLy8uL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanM/ZGEwNCoiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9pbWcvYXJyb3ctYm90dG9tLnBuZz9mN2Y5Iiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LXRvcC5wbmc/ZTYyYyIsIndlYnBhY2s6Ly8vLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanM/Yjk4MCoiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvbW9jay1zZWxlY3QtdHBsLnRwbD9mN2RlIiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvdHBsL3NlbGVjdC11bC10cGwudHBsPzNjNDUiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9uby1kYXRhL25vLWRhdGEuanM/MWYwOSIsIndlYnBhY2s6Ly8vLi9kZXAvY29tcG9uZW50L25vLWRhdGEvdHBsL25vLWRhdGEtdHBsLnRwbD8wYWM2Iiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbm8tZGF0YS9jc3Mvbm8tZGF0YS5jc3M/YjYzMioiLCJ3ZWJwYWNrOi8vLy4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2Nzcy9uby1kYXRhLmNzcz9hODE1Iiwid2VicGFjazovLy8uL2RlcC9jb21wb25lbnQvbm8tZGF0YS9pbWcvbm8tZGF0YS5wbmc/Y2Q0ZSIsIndlYnBhY2s6Ly8vLi9qcy9jb3Vyc2VpbmZvLmpzIiwid2VicGFjazovLy8uL2RlcC9tb2NrLmpzIiwid2VicGFjazovLy8uL3RwbC9jb3Vyc2VpbmZvLnRwbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSwwREFB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Q2I7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLFlBQVk7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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QkFBMkIseUJBQXlCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTJDLHVDQUF1QztBQUNsRixjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsNEJBQTJCLG1CQUFtQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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Q0E7QUFDQSxjQUFhLG1JQUFtSTtBQUNoSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDtBQUNBO0FBQ0EsRUFBQyxFIiwiZmlsZSI6ImNvdXJzZWluZm8uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvbWZnLXdlY2hhdC9idW5kbGUvanMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA5MzZkYmVjNDMzNmU2MjU1OGM0NFxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8yMC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzPXtcclxuICAgICAgICBzY3I6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgZEhlaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgICAgIHZhciBzVG9wID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3A7XHJcbiAgICAgICAgdmFyIGNIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgICAgaWYgKHNUb3AgKyBjSGVpZ2h0ID09IGRIZWlnaHQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBnZXRTdWJqZWN0TmFtZTpmdW5jdGlvbihpZCl7XHJcbiAgICAgICAgdmFyIG5hbWU9Jyc7XHJcbiAgICAgICAgc3dpdGNoIChpZC50b1N0cmluZygpKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSAnMDEnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n6K+t5paHJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwMic6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfmlbDlraYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzAzJzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+iLseivrSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDQnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n54mp55CGJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwNSc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSfljJblraYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA2JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+aUv+ayuyc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnMDcnOlxyXG4gICAgICAgICAgICAgICAgbmFtZT0n5Y6G5Y+yJztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICcwOCc6XHJcbiAgICAgICAgICAgICAgICBuYW1lPSflnLDnkIYnO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJzA5JzpcclxuICAgICAgICAgICAgICAgIG5hbWU9J+eUn+eJqSc7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9LFxyXG4gICAgZ2V0U3RhZ2VTdHI6IGZ1bmN0aW9uIChzdGFnZUlkKSB7XHJcbiAgICAgICAgdmFyIHN0YWdlSWRTdHIgPSBcIlwiO1xyXG4gICAgICAgIHN3aXRjaCAoc3RhZ2VJZCkge1xyXG4gICAgICAgICAgICBjYXNlIFwieFwiOlxyXG4gICAgICAgICAgICAgICAgc3RhZ2VJZFN0ciA9IFwi5bCP5a2mXCI7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImNcIjpcclxuICAgICAgICAgICAgICAgIHN0YWdlSWRTdHIgPSBcIuWIneS4rVwiO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJnXCI6XHJcbiAgICAgICAgICAgICAgICBzdGFnZUlkU3RyID0gXCLpq5jkuK1cIjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzdGFnZUlkU3RyO1xyXG4gICAgfSxcclxuICAgIGdvX21lbnU6ZnVuY3Rpb24oY29uSWQpe1xyXG4gICAgICAgIHZhciBjb249ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29uSWQpO1xyXG4gICAgICAgIHZhciBpbWc9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgnaWQnLCdtZW51Q29udHInKTtcclxuICAgICAgICBpbWcuc3JjPScuLi9idW5kbGUvaW1nL2JvdHRvbS15dWFuLXNob3cucG5nJztcclxuICAgICAgICBjb24uYXBwZW5kQ2hpbGQoaW1nKTtcclxuICAgICAgICB2YXIgbWVudUNvbnRyPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZW51Q29udHInKTtcclxuICAgICAgICBtZW51Q29udHIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsbWVudUJvZHksZmFsc2UpO1xyXG4gICAgICAgIGZ1bmN0aW9uIG1lbnVCb2R5KCl7XHJcbiAgICAgICAgICAgIHZhciBtZW51U2hvdz1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudVNob3cnKTtcclxuICAgICAgICAgICAgaWYobWVudVNob3cpe1xyXG4gICAgICAgICAgICAgICAgdmFyIHQ9bWVudVNob3cuZ2V0QXR0cmlidXRlKCdzdHlsZScpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5zdHVkeS1zaG93XCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgIGlmKCB0ID09ICdkaXNwbGF5OiBub25lOycpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoXCIjc3R1ZHktc2hvdzFcIikuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J2Jsb2NrJztcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjPVwiLi4vYnVuZGxlL2ltZy9tZW51Mi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIG1lbnVTaG93LnN0eWxlLmRpc3BsYXk9J25vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmM9XCIuLi9idW5kbGUvaW1nL2JvdHRvbS15dWFuLXNob3cucG5nXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgdmFyIHNob3c9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBzaG93LnNldEF0dHJpYnV0ZSgnaWQnLCdtZW51U2hvdycpO1xyXG4gICAgICAgICAgICAgICAgc2hvdy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywnZGlzcGxheTpibG9jazsnKTtcclxuICAgICAgICAgICAgICAgIHNob3cuaW5uZXJIVE1MPSc8YSBocmVmPVwiYWZ0ZXJjbGFzc2pvYi5odG1sXCIgY2xhc3M9XCJrdHhhXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL3h1ZWFuLnBuZ1wiLz48L2E+PGEgaHJlZj1cIndyb25nLWdhdGhlci5odG1sXCIgY2xhc3M9XCJreGpsXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppamluLnBuZ1wiPC9hPjxhIGhyZWY9XCJob21ld29yay1saXN0Lmh0bWxcIiAgY2xhc3M9XCJjdGpqXCI+PGltZyBzcmM9XCIuLi9idW5kbGUvaW1nL2ppbHUucG5nXCI+PC9hPjxhIGhyZWY9XCJtb250aHdlYWsuaHRtbFwiIGNsYXNzPVwibXlyeFwiPjxpbWcgc3JjPVwiLi4vYnVuZGxlL2ltZy9ydW94aWFuZy5wbmdcIj48L2E+JztcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2hvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGdvX3N0dWR5X3Nob3c6ZnVuY3Rpb24oaW1nbG9nbyxzaG93aWQpe1xyXG4gICAgICAgICAgIHZhciBuPTE7XHJcbiAgICAgICAgICAgICQoaW1nbG9nbykucGFyZW50KFwiaDNcIikub24oXCJ0b3VjaHN0YXJ0XCIsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKG4gJTIgIT0wKXtcclxuICAgICAgICAgICAgICAgICAgICAkKGltZ2xvZ28pLmF0dHIoXCJzcmNcIixcIi4uL2ltZy9idG0ucG5nXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoc2hvd2lkKS5zaG93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoaW1nbG9nbykuYXR0cihcInNyY1wiLFwiLi4vaW1nL3RvcC1qaWFudG91LnBuZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKHNob3dpZCkuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbisrO1xyXG4gICAgICAgICAgICB9KX0sXHJcblxyXG4gICAgc2hvd0NvbmZpcm06ZnVuY3Rpb24obXNnLGNhbGxiYWNrKVxyXG4gICAge1xyXG4gICAgICAgIHZhciBsYXllcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIGxheWVyLmNsYXNzTmFtZT1cImxheWVyXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsYXllcik7XHJcbiAgICAgICAgdmFyIGNvbmZpcm09JzxkaXYgY2xhc3M9XCJwb3Bjb25maXJtXCI+JztcclxuICAgICAgICBjb25maXJtKz0nPGRpdiBjbGFzcz1cInRpdGxlXCI+JztcclxuICAgICAgICBjb25maXJtKz0nPGkgY2xhc3M9XCJpY29uLWNsb3NlXCI+PC9pPic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8L2Rpdj4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj4nK21zZysnIDwvZGl2Pic7XHJcbiAgICAgICAgY29uZmlybSs9JyA8ZGl2IGNsYXNzPVwiZm9vdFwiPic7XHJcbiAgICAgICAgY29uZmlybSs9JyAgPGlucHV0IGNsYXNzPVwicG9wYnRuIGJ0bm9rIGNvbG9yLWdyZWVuXCIgdHlwZT1cImJ1dHRvblwiICB2YWx1ZT1cIuehruWumlwiLz4nO1xyXG4gICAgICAgIGNvbmZpcm0rPScgIDxpbnB1dCBjbGFzcz1cInBvcGJ0biBidG5jYW5jZWwgY29sb3ItZ3JlZW5cIiB0eXBlPVwiYnV0dG9uXCIgdmFsdWU9XCLlj5bmtohcIi8+JztcclxuICAgICAgICBjb25maXJtKz0nICAgPC9kaXY+PC9kaXY+JztcclxuICAgICAgICAkKCdib2R5JykuYXBwZW5kKGNvbmZpcm0pO1xyXG4gICAgICAgIC8vJCgnLnBvcGNvbmZpcm0nKS5jc3MoJ3RvcCcsKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQgLSQoJy5wb3Bjb25maXJtJykuaGVpZ2h0KCkpLzIpO1xyXG4gICAgICAgICQoXCIuYnRub2tcIikudW5iaW5kKFwiY2xpY2tcIik7XHJcbiAgICAgICAgJChcIi5idG5va1wiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLmxheWVyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBvcGNvbmZpcm1cIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0cnVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiLmJ0bmNhbmNlbCwuaWNvbi1jbG9zZVwiKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKFwiLmxheWVyXCIpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAkKFwiLnBvcGNvbmZpcm1cIikucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/kv6Hmga/mj5DnpLrmoYZcclxuICAgIHNob3dQb3BNc2c6ZnVuY3Rpb24gKG1zZykge1xyXG4gICAgICAgIHZhciBodG1sPSc8ZGl2IGNsYXNzPVwicG9wbXNnXCI+PGRpdiBjbGFzcz1cImNvbnRlbnRcIj4nK21zZysnPC9kaXY+PC9kaXY+JztcclxuICAgICAgICAkKCcucG9wbXNnJykucmVtb3ZlKCk7XHJcbiAgICAgICAgJCgnYm9keScpLmFwcGVuZChodG1sKTtcclxuICAgICAgICAkKCcucG9wbXNnJykuY3NzKCdsZWZ0JywoZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCAgLSQoJy5wb3Btc2cnKS53aWR0aCgpKS8yKTtcclxuICAgICAgICAkKCcucG9wbXNnJykuY3NzKCd0b3AnLChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0IC0kKCcucG9wbXNnJykuaGVpZ2h0KCkpLzIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXskKCcucG9wbXNnJykucmVtb3ZlKCk7fSwxMDAwKTtcclxuICAgIH0sXHJcbiAgICAvL+iOt+WPluaOpeWPo3VybCDlpoLojrflj5ZvcGVuaWQgICBnZXRBcGlVcmwoJ0FjY291bnQvR2V0T3BlbklEJylcclxuICAgIGdldEFwaVVybDpmdW5jdGlvbihhY3Rpb24pe1xyXG4gICAgICAgIC8vdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk4Lyc7XHJcbiAgICAgICAgdmFyIGJhc2V1cmw9J2h0dHA6Ly8xOTIuMTY4LjE4MC4xNTo4OTk3Lyc7XHJcbiAgICAgICAgLy92YXIgYmFzZXVybD0naHR0cDovL2xvY2FsaG9zdDo1NDQxLyc7XHJcbiAgICAgICAgcmV0dXJuIGJhc2V1cmwrYWN0aW9uO1xyXG4gICAgfSxcclxuICAgIC8v6LCD55SoYXBp5oiQ5Yqf5ZCO77yM5YWI6LCD55So5q2k5pa55rOV77yM5Yik5pat55So5oi35piv5ZCm5bey57uP57uR5a6a77yM6Iul5pyq57uR5a6a77yM6Lez6L2s5Yiw57uR5a6a6aG1XHJcbiAgICBjaGVja0JpbmQ6ZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgaWYoIWRhdGEuT0spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihkYXRhLkNvZGU9PTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmPVwiYmluZGluZm8uaHRtbFwiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8v6I635Y+WT3BlbklkXHJcbiAgICBnZXRPcGVuSWQ6ZnVuY3Rpb24oYXBwaWQsYXBwc2VjcmV0LGNvZGUpe1xyXG52YXIgb3BlbmlkO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgYXN5bmM6ZmFsc2UsXHJcbiAgICAgICAgICAgIHVybDp0aGlzLmdldEFwaVVybCgnQWNjb3VudC9HZXRPcGVuSUQnKSxcclxuICAgICAgICAgICAgLy8gZGF0YSB0byBiZSBhZGRlZCB0byBxdWVyeSBzdHJpbmc6XHJcbiAgICAgICAgICAgIGRhdGE6IHtBcHBJRDphcHBpZCxBcHBTZWNyZXQ6YXBwc2VjcmV0LENvZGU6Y29kZX0sXHJcbiAgICAgICAgICAgIC8vIHR5cGUgb2YgZGF0YSB3ZSBhcmUgZXhwZWN0aW5nIGluIHJldHVybjpcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgLy90aW1lb3V0OiAzMDAsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhLk9LKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuaWQ9ZGF0YS5JRDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQob3BlbmlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgdHlwZSl7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnQWpheCBlcnJvciEnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gb3BlbmlkO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+WdXJs5Y+C5pWwXHJcbiAgICBnZXRRdWVyeVN0cmluZzpmdW5jdGlvbiAobmFtZSkge1xyXG4gICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoXCIoXnwmKVwiICsgbmFtZSArIFwiPShbXiZdKikoJnwkKVwiLCBcImlcIik7XHJcbiAgICB2YXIgciA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLm1hdGNoKHJlZyk7XHJcbiAgICBpZiAociAhPSBudWxsKSByZXR1cm4gdW5lc2NhcGUoZGVjb2RlVVJJKHJbMl0pKTsgcmV0dXJuIG51bGw7XHJcbn0sXHJcblxyXG4gICAgZGF0ZUZvcm1hdDogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0KXtcclxuICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIHZhciBtYXAgPSB7XHJcbiAgICAgICAgICAgIFwiWVwiOiBkYXRlLmdldFllYXIoKSxcclxuICAgICAgICAgICAgXCJNXCI6IGRhdGUuZ2V0TW9udGgoKSArIDEsIC8v5pyI5Lu9XHJcbiAgICAgICAgICAgIFwiZFwiOiBkYXRlLmdldERhdGUoKSwgLy/ml6VcclxuICAgICAgICAgICAgXCJoXCI6IGRhdGUuZ2V0SG91cnMoKSwgLy/lsI/ml7ZcclxuICAgICAgICAgICAgXCJtXCI6IGRhdGUuZ2V0TWludXRlcygpLCAvL+WIhlxyXG4gICAgICAgICAgICBcInNcIjogZGF0ZS5nZXRTZWNvbmRzKCksIC8v56eSXHJcbiAgICAgICAgICAgIFwicVwiOiBNYXRoLmZsb29yKChkYXRlLmdldE1vbnRoKCkgKyAzKSAvIDMpLCAvL+Wto+W6plxyXG4gICAgICAgICAgICBcIlNcIjogZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enklxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoLyhbeU1kaG1zcVNdKSsvZywgZnVuY3Rpb24gKGFsbCwgdCkge1xyXG4gICAgICAgICAgICB2YXIgdiA9IG1hcFt0XTtcclxuICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFsbC5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdiA9ICcwJyArIHY7XHJcbiAgICAgICAgICAgICAgICAgICAgdiA9IHYuc3Vic3RyKHYubGVuZ3RoIC0gMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0ID09PSAneScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRGdWxsWWVhcigpICsgJycpLnN1YnN0cig0IC0gYWxsLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGFsbDtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZm9ybWF0O1xyXG4gICAgfSxcclxuICAgIC8v5aSE55CG6K+V6aKY5YWs5byPIG1hdGhqYXhcclxuICAgIGluaXRNYXRoSmF4T2JqOmZ1bmN0aW9uIChpZCkge1xyXG4gICAgICAgIE1hdGhKYXguSHViLlF1ZXVlKFtcIlR5cGVzZXRcIiwgTWF0aEpheC5IdWIsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKV0pO1xyXG4gICAgfSxcclxuICAgIGdldExvY2FsVGltZTogZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKHBhcnNlSW50KHZhbC5yZXBsYWNlKFwiL0RhdGUoXCIsIFwiXCIpLnJlcGxhY2UoXCIpL1wiLCBcIlwiKSwgMTApKTtcclxuICAgICAgICAgICAgdmFyIHllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIHZhciBtb250aCA9IGRhdGUuZ2V0TW9udGgoKSArIDEgPCAxMCA/IFwiMFwiICsgKGRhdGUuZ2V0TW9udGgoKSArIDEpIDogZGF0ZS5nZXRNb250aCgpICsgMTtcclxuICAgICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gZGF0ZS5nZXREYXRlKCkgPCAxMCA/IFwiMFwiICsgZGF0ZS5nZXREYXRlKCkgOiBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRIb3VycygpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0SG91cnMoKSA6IGRhdGUuZ2V0SG91cnMoKTtcclxuICAgICAgICAgICAgdmFyIG1pbnV0ZSA9IGRhdGUuZ2V0TWludXRlcygpIDwgMTAgPyBcIjBcIiArIGRhdGUuZ2V0TWludXRlcygpIDogZGF0ZS5nZXRNaW51dGVzKCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4geWVhciArIFwiLVwiICsgbW9udGggKyBcIi1cIiArIGN1cnJlbnREYXRlICsgXCIgXCIgKyBob3VycyArIFwiOlwiICsgbWludXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL3V0aWwvdXRpbC5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDIgMyA0IDcgOSAxMCAxMSAxMiAxMyAxNCAxNSAxNyAxOCAxOSAyMFxuICoqLyIsIi8qVE1PREpTOnt9Ki9cclxuIWZ1bmN0aW9uICgpIHtcclxuXHRmdW5jdGlvbiBhKGEsIGIpIHtcclxuXHRcdHJldHVybiAoL3N0cmluZ3xmdW5jdGlvbi8udGVzdCh0eXBlb2YgYikgPyBoIDogZykoYSwgYilcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGIoYSwgYykge1xyXG5cdFx0cmV0dXJuIFwic3RyaW5nXCIgIT0gdHlwZW9mIGEgJiYgKGMgPSB0eXBlb2YgYSwgXCJudW1iZXJcIiA9PT0gYyA/IGEgKz0gXCJcIiA6IGEgPSBcImZ1bmN0aW9uXCIgPT09IGMgPyBiKGEuY2FsbChhKSkgOiBcIlwiKSwgYVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gYyhhKSB7XHJcblx0XHRyZXR1cm4gbFthXVxyXG5cdH1cclxuXHJcblx0ZnVuY3Rpb24gZChhKSB7XHJcblx0XHRyZXR1cm4gYihhKS5yZXBsYWNlKC8mKD8hW1xcdyNdKzspfFs8PlwiJ10vZywgYylcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGUoYSwgYikge1xyXG5cdFx0aWYgKG0oYSkpZm9yICh2YXIgYyA9IDAsIGQgPSBhLmxlbmd0aDsgZCA+IGM7IGMrKyliLmNhbGwoYSwgYVtjXSwgYywgYSk7IGVsc2UgZm9yIChjIGluIGEpYi5jYWxsKGEsIGFbY10sIGMpXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBmKGEsIGIpIHtcclxuXHRcdHZhciBjID0gLyhcXC8pW15cXC9dK1xcMVxcLlxcLlxcMS8sIGQgPSAoXCIuL1wiICsgYSkucmVwbGFjZSgvW15cXC9dKyQvLCBcIlwiKSwgZSA9IGQgKyBiO1xyXG5cdFx0Zm9yIChlID0gZS5yZXBsYWNlKC9cXC9cXC5cXC8vZywgXCIvXCIpOyBlLm1hdGNoKGMpOyllID0gZS5yZXBsYWNlKGMsIFwiL1wiKTtcclxuXHRcdHJldHVybiBlXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBnKGIsIGMpIHtcclxuXHRcdHZhciBkID0gYS5nZXQoYikgfHwgaSh7ZmlsZW5hbWU6IGIsIG5hbWU6IFwiUmVuZGVyIEVycm9yXCIsIG1lc3NhZ2U6IFwiVGVtcGxhdGUgbm90IGZvdW5kXCJ9KTtcclxuXHRcdHJldHVybiBjID8gZChjKSA6IGRcclxuXHR9XHJcblxyXG5cdGZ1bmN0aW9uIGgoYSwgYikge1xyXG5cdFx0aWYgKFwic3RyaW5nXCIgPT0gdHlwZW9mIGIpIHtcclxuXHRcdFx0dmFyIGMgPSBiO1xyXG5cdFx0XHRiID0gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgayhjKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR2YXIgZCA9IGpbYV0gPSBmdW5jdGlvbiAoYykge1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgYihjLCBhKSArIFwiXCJcclxuXHRcdFx0fSBjYXRjaCAoZCkge1xyXG5cdFx0XHRcdHJldHVybiBpKGQpKClcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHRcdHJldHVybiBkLnByb3RvdHlwZSA9IGIucHJvdG90eXBlID0gbiwgZC50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0cmV0dXJuIGIgKyBcIlwiXHJcblx0XHR9LCBkXHJcblx0fVxyXG5cclxuXHRmdW5jdGlvbiBpKGEpIHtcclxuXHRcdHZhciBiID0gXCJ7VGVtcGxhdGUgRXJyb3J9XCIsIGMgPSBhLnN0YWNrIHx8IFwiXCI7XHJcblx0XHRpZiAoYyljID0gYy5zcGxpdChcIlxcblwiKS5zbGljZSgwLCAyKS5qb2luKFwiXFxuXCIpOyBlbHNlIGZvciAodmFyIGQgaW4gYSljICs9IFwiPFwiICsgZCArIFwiPlxcblwiICsgYVtkXSArIFwiXFxuXFxuXCI7XHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gKCkge1xyXG5cdFx0XHRyZXR1cm4gXCJvYmplY3RcIiA9PSB0eXBlb2YgY29uc29sZSAmJiBjb25zb2xlLmVycm9yKGIgKyBcIlxcblxcblwiICsgYyksIGJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHZhciBqID0gYS5jYWNoZSA9IHt9LCBrID0gdGhpcy5TdHJpbmcsIGwgPSB7XHJcblx0XHRcIjxcIjogXCImIzYwO1wiLFxyXG5cdFx0XCI+XCI6IFwiJiM2MjtcIixcclxuXHRcdCdcIic6IFwiJiMzNDtcIixcclxuXHRcdFwiJ1wiOiBcIiYjMzk7XCIsXHJcblx0XHRcIiZcIjogXCImIzM4O1wiXHJcblx0fSwgbSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGEpIHtcclxuXHRcdFx0cmV0dXJuIFwiW29iamVjdCBBcnJheV1cIiA9PT0ge30udG9TdHJpbmcuY2FsbChhKVxyXG5cdFx0fSwgbiA9IGEudXRpbHMgPSB7XHJcblx0XHQkaGVscGVyczoge30sICRpbmNsdWRlOiBmdW5jdGlvbiAoYSwgYiwgYykge1xyXG5cdFx0XHRyZXR1cm4gYSA9IGYoYywgYSksIGcoYSwgYilcclxuXHRcdH0sICRzdHJpbmc6IGIsICRlc2NhcGU6IGQsICRlYWNoOiBlXHJcblx0fSwgbyA9IGEuaGVscGVycyA9IG4uJGhlbHBlcnM7XHJcblx0YS5nZXQgPSBmdW5jdGlvbiAoYSkge1xyXG5cdFx0cmV0dXJuIGpbYS5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIildXHJcblx0fSwgYS5oZWxwZXIgPSBmdW5jdGlvbiAoYSwgYikge1xyXG5cdFx0b1thXSA9IGJcclxuXHR9LCBtb2R1bGUuZXhwb3J0cyA9IGFcclxufSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3Rtb2Rqcy1sb2FkZXIvcnVudGltZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNCA1IDkgMTAgMTIgMTMgMTUgMTYgMTlcbiAqKi8iLCIvKipcclxuICogQ3JlYXRlZCBieSBodW1vckhhbiBvbiAyMDE2LzUvMjAuXHJcbiAqL1xyXG5yZXF1aXJlKCcuL2Nzcy9tb2NrLXNlbGVjdC5jc3MnKTtcclxudmFyIHNlbGVjdFRwbCA9IHJlcXVpcmUoJ21vY2stc2VsZWN0LXRwbCcpO1xyXG52YXIgc2VsZWN0VWxUcGwgPSByZXF1aXJlKCdzZWxlY3QtdWwtdHBsJyk7XHJcblxyXG5mdW5jdGlvbiBtb2NrU2VsZWN0KGRvbSwgZGF0YSwgY2FsbGJhY2tJZCwgY2FsbGJhY2ssIGlkLCBjYWxsQmFja0ZsYWcpe1xyXG4gICAgdGhpcy5kb20gPSAkKFwiLlwiICsgZG9tKTtcclxuICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB0aGlzLmNhbGxiYWNrSWQgPSBjYWxsYmFja0lkO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gICAgdGhpcy5pZCA9ICQoXCIjXCIgKyBpZCk7XHJcbiAgICB0aGlzLmNhbGxCYWNrRmxhZyA9IGNhbGxCYWNrRmxhZztcclxuICAgIHRoaXMuaW5pdERvbSgpO1xyXG4gICAgdGhpcy5pbml0QnRucygpO1xyXG59XHJcbm1vY2tTZWxlY3QucHJvdG90eXBlID0ge1xyXG4gICAgaW5pdERvbTogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmRvbS5odG1sKHNlbGVjdFRwbCh0aGlzLmRhdGEpKTtcclxuICAgICAgICB0aGlzLmlkLmh0bWwoc2VsZWN0VWxUcGwodGhpcy5kYXRhKSk7XHJcbiAgICAgICAgdGhpcy5jYWxsYmFja0lkKHRoaXMuZG9tLmZpbmQoXCIubmFtZVwiKS5hdHRyKCdkYXRhLWlkJykpO1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGxCYWNrRmxhZykge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxCYWNrRmxhZyh0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuZG9tLm9mZnNldCgpO1xyXG4gICAgICAgIHRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICdsZWZ0JzogMCxcclxuICAgICAgICAgICAgJ3RvcCc6IG9mZnNldC50b3AgKyA0MlxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuaWQuZmluZChcIi5tb2NrLXVsXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICdtYXgtaGVpZ2h0JzogJCh3aW5kb3cpLmhlaWdodCgpIC0gb2Zmc2V0LmhlaWdodCAtIG9mZnNldC50b3BcclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICBpbml0QnRuczogZnVuY3Rpb24oKXtcclxuICAgICAgICAvL+eCueWHu+aYvuekuuS4i+aLiVxyXG4gICAgICAgIHZhciB0VGhpcz0gdGhpcztcclxuICAgICAgICB0aGlzLmRvbS5kZWxlZ2F0ZSgnLm5hbWUtd3JhcCcsICd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh0VGhpcy5kb20pO1xyXG4gICAgICAgICAgICBpZiAoISh0VGhpcy5kb20uZmluZCgnLm5hbWUtd3JhcCcpLmhhc0NsYXNzKCdhY3RpdmUnKSkpIHtcclxuICAgICAgICAgICAgICAgICQoXCIubW9jay1zZWxlY3RcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmZpbmQoXCIubmFtZS13cmFwXCIpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICQoXCIubW9jay11bFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmRvbS5maW5kKFwiLm1vY2stc2VsZWN0XCIpLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiLm1vY2stdWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgJChcIi5tb2NrLXNlbGVjdFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmluZChcIi5uYW1lLXdyYXBcIikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5kb20uZmluZChcIi5tb2NrLXNlbGVjdFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB0VGhpcy5pZC5maW5kKFwiLm1vY2stdWxcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy/kuIvmi4nmtojlpLFcclxuICAgICAgICB0aGlzLmlkLmRlbGVnYXRlKCdsaScsICd0b3VjaGVuZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHRUaGlzLmlkLmZpbmQoXCJsaS5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmVcIikuZmluZChcIi5yaWdodFwiKS5yZW1vdmVDbGFzcyhcImRpc3BsYXktbm9uZVwiKTtcclxuICAgICAgICAgICAgdFRoaXMuZG9tLmZpbmQoJy5uYW1lLXdyYXAnKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuZmluZChcIi5uYW1lXCIpLmh0bWwoJCh0aGlzKS5maW5kKFwiLml0ZW0tbmFtZVwiKS5odG1sKCkpLmF0dHIoXCJkYXRhLWlkXCIsICQodGhpcykuYXR0cihcImRhdGEtaWRcIikpO1xyXG4gICAgICAgICAgICB0VGhpcy5kb20uZmluZChcIi5tb2NrLXNlbGVjdFwiKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIHRUaGlzLmlkLmZpbmQoXCIubW9jay11bFwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgIHRUaGlzLmNhbGxiYWNrSWQodFRoaXMuZG9tLmZpbmQoXCIubmFtZVwiKS5hdHRyKCdkYXRhLWlkJykpO1xyXG4gICAgICAgICAgICBpZiAodFRoaXMuY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb20sIGRhdGEsIGNhbGxiYWNrSWQsIGNhbGxiYWNrLCBpZCwgY2FsbEJhY2tGbGFnKXtcclxuICAgIC8qKlxyXG4gICAgICogKiDmqKHmi5/kuIvmi4nmoYbnu4Tku7ZcclxuICAgICAqIOaLv+WIsGlkXHJcbiAgICAgKiBAcGFyYW0gZG9tICAgICAgIOS4i+aLieahhueItue6p2NsYXNzXHJcbiAgICAgKiBAcGFyYW0gZGF0YSAgICAgIOS4i+aLieaVsOaNru+8iOWkhOeQhui/h+eahOagvOW8j+S4untkYXRhOiBbe2lkOicnLG5hbWU6Jyd9LHt9LHt9XX3vvIks5Y+m5aSW5rOo5oSPb3JkZXJOdW0gPiAwID8gK29yZGVyTnVtIDogJydcclxuICAgICAqIEBwYXJhbSBjYWxsYmFja0lkICAgICAg6YCa6L+H5Zue6LCD5Lyg57uZ5Liq5Lq66aG16Z2i6ZyA6KaB55qEaWRcclxuICAgICAqIEBwYXJhbSBjYWxsYmFjayAgICAgICAg5Liq5Lq66aG16Z2i55qE5Zue6LCD5aSE55CGXHJcbiAgICAgKiBAcGFyYW0gaWQgICAgICAgICAgICAgIOWtmOaUvuS4i+aLiemAiemhueeahGlkXHJcbiAgICAgKiBAcGFyYW0gY2FsbEJhY2tGbGFn77yI6Z2e5b+F5Lyg77yJICDlkYror4npobXpnaLmqKHmnb/muLLmn5PlrozkuobmnInkuoZpZOetieWPguaVsCDlj6/ku6XmuLLmn5PkuKrkurrpobXpnaLkuoZcclxuICAgICAqL1xyXG4gICAgcmV0dXJuIG5ldyBtb2NrU2VsZWN0KGRvbSwgZGF0YSwgY2FsbGJhY2tJZCwgY2FsbGJhY2ssIGlkLCBjYWxsQmFja0ZsYWcpO1xyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L21vY2stc2VsZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDEwIDEzIDE2IDE5XG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9tb2NrLXNlbGVjdC5jc3NcIik7XG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbi8vIGFkZCB0aGUgc3R5bGVzIHRvIHRoZSBET01cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcIikoY29udGVudCwge30pO1xuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG4vLyBIb3QgTW9kdWxlIFJlcGxhY2VtZW50XG5pZihtb2R1bGUuaG90KSB7XG5cdC8vIFdoZW4gdGhlIHN0eWxlcyBjaGFuZ2UsIHVwZGF0ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdGlmKCFjb250ZW50LmxvY2Fscykge1xuXHRcdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbW9jay1zZWxlY3QuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vbW9jay1zZWxlY3QuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9jc3MvbW9jay1zZWxlY3QuY3NzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDEwIDEzIDE2IDE5XG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIubW9jay1zZWxlY3R7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xcclxcbiAgICBoZWlnaHQ6IDQycHg7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgYm9yZGVyOm5vbmU7XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAubmFtZS13cmFwLmFjdGl2ZXtcXHJcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXHJcXG59XFxyXFxuLm1vY2stdWx7XFxyXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXHJcXG4gICAgei1pbmRleDogMTAwO1xcclxcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2Q5ZDlkOTtcXHJcXG4gICAgd2lkdGg6IDkzLjYlO1xcclxcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcHtcXHJcXG4gICAgY29sb3I6ICNmZmY7XFxyXFxuICAgIGhlaWdodDogNDJweDtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuLm1vY2stc2VsZWN0IC5iZ3tcXHJcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcclxcbiAgICBoZWlnaHQ6IDZweDtcXHJcXG4gICAgd2lkdGg6IDEzcHg7XFxyXFxufVxcclxcbi5tb2NrLXNlbGVjdCAubmFtZS13cmFwIC5iZ3tcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ltZy9hcnJvdy1ib3R0b20ucG5nXCIpICsgXCIpIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0O1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmV7XFxyXFxuICAgIGNvbG9yOiAjMDBkNTM1O1xcclxcbn1cXHJcXG4ubW9jay1zZWxlY3QgLm5hbWUtd3JhcC5hY3RpdmUgLmJnIHtcXHJcXG4gICAgYmFja2dyb3VuZDogdXJsKFwiICsgcmVxdWlyZShcIi4uL2ltZy9hcnJvdy10b3AucG5nXCIpICsgXCIpIGNlbnRlciBjZW50ZXIgbm8tcmVwZWF0O1xcclxcbn1cXHJcXG4ubW9jay11bCBsaXtcXHJcXG4gICAgbWFyZ2luOjA7XFxyXFxuICAgIGNvbG9yOiAjMzMzMzMzO1xcclxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcclxcbiAgICBoZWlnaHQ6IDQycHg7XFxyXFxuICAgIGxpbmUtaGVpZ2h0OiA0MnB4O1xcclxcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2Q5ZDlkOTtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGkgLnJpZ2h0e1xcclxcbiAgICBkaXNwbGF5OiBub25lO1xcclxcbiAgICBmbG9hdDogcmlnaHQ7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXHJcXG59XFxyXFxuLm1vY2stdWwgbGkuYWN0aXZlIC5yaWdodHtcXHJcXG4gICAgZGlzcGxheTogaW5saW5lO1xcclxcbn1cXHJcXG4ubW9jay11bCBsaS5hY3RpdmV7XFxyXFxuICAgIGNvbG9yOiAjMDBkNTM1O1xcclxcbn1cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyIS4vZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC9jc3MvbW9jay1zZWxlY3QuY3NzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDEwIDEzIDE2IDE5XG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxuLy8gY3NzIGJhc2UgY29kZSwgaW5qZWN0ZWQgYnkgdGhlIGNzcy1sb2FkZXJcclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cclxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXHJcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xyXG5cdFx0dmFyIHJlc3VsdCA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSB0aGlzW2ldO1xyXG5cdFx0XHRpZihpdGVtWzJdKSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBpdGVtWzFdICsgXCJ9XCIpO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKGl0ZW1bMV0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcmVzdWx0LmpvaW4oXCJcIik7XHJcblx0fTtcclxuXHJcblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcclxuXHRsaXN0LmkgPSBmdW5jdGlvbihtb2R1bGVzLCBtZWRpYVF1ZXJ5KSB7XHJcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcclxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xyXG5cdFx0dmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XHJcblx0XHRcdGlmKHR5cGVvZiBpZCA9PT0gXCJudW1iZXJcIilcclxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XHJcblx0XHR9XHJcblx0XHRmb3IoaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcclxuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxyXG5cdFx0XHQvLyB0aGlzIGltcGxlbWVudGF0aW9uIGlzIG5vdCAxMDAlIHBlcmZlY3QgZm9yIHdlaXJkIG1lZGlhIHF1ZXJ5IGNvbWJpbmF0aW9uc1xyXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxyXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxyXG5cdFx0XHRpZih0eXBlb2YgaXRlbVswXSAhPT0gXCJudW1iZXJcIiB8fCAhYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xyXG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xyXG5cdFx0XHRcdH0gZWxzZSBpZihtZWRpYVF1ZXJ5KSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH07XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSAzIDQgMTAgMTIgMTMgMTYgMTlcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBMEFBQUFHQ0FZQUFBQVlMQlMvQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUE0SnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU15MWpNREV4SURZMkxqRTBOVFkyTVN3Z01qQXhNaTh3TWk4d05pMHhORG8xTmpveU55QWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rOXlhV2RwYm1Gc1JHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEcGhZV05oTXpneVpDMDNaVGRtTFRSbE1ETXRZV1F3TXkxbFlUSmtZMlV4TmpGaE1XUWlJSGh0Y0UxTk9rUnZZM1Z0Wlc1MFNVUTlJbmh0Y0M1a2FXUTZNVFl3UWtRNFJqZ3lNRUkyTVRGRk5qazRRakJHTXpGRk5rTkdRVGd4TURNaUlIaHRjRTFOT2tsdWMzUmhibU5sU1VROUluaHRjQzVwYVdRNk1UWXdRa1E0UmpjeU1FSTJNVEZGTmprNFFqQkdNekZGTmtOR1FUZ3hNRE1pSUhodGNEcERjbVZoZEc5eVZHOXZiRDBpUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5ESURJd01UVWdLRTFoWTJsdWRHOXphQ2tpUGlBOGVHMXdUVTA2UkdWeWFYWmxaRVp5YjIwZ2MzUlNaV1k2YVc1emRHRnVZMlZKUkQwaWVHMXdMbWxwWkRvd05qa3hNa05EUlRsQk1qQkZOakV4T0VaQ1F6ZzRRekl4TjBReVJVSkdPU0lnYzNSU1pXWTZaRzlqZFcxbGJuUkpSRDBpWVdSdlltVTZaRzlqYVdRNmNHaHZkRzl6YUc5d09tWXhZems1TWpneExUTTROV0V0TVRFM09TMWhNelZpTFRrek5UVTJaVGN5TWpKaU5TSXZQaUE4TDNKa1pqcEVaWE5qY21sd2RHbHZiajRnUEM5eVpHWTZVa1JHUGlBOEwzZzZlRzF3YldWMFlUNGdQRDk0Y0dGamEyVjBJR1Z1WkQwaWNpSS9QaGVIZTU4QUFBQlZTVVJCVkhqYVl2ai8vNzhPRU4vN0R3R2Y4T0QvVUhVNkRFQUNoRTJSSkhDQlQxQjFEREJOSUN3TXhCZHdhTGdBbFdkQTF3VENYRUI4R0UzRFlhZzRBeTVOTUx3TnFtRWJObmxjbWtBNEM1Y2NRSUFCQVBHaUMwcHNpOWJGQUFBQUFFbEZUa1N1UW1DQ1wiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvaW1nL2Fycm93LWJvdHRvbS5wbmdcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDQgMTAgMTMgMTYgMTlcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFBMEFBQUFHQ0FZQUFBQVlMQlMvQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUE0SnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU15MWpNREV4SURZMkxqRTBOVFkyTVN3Z01qQXhNaTh3TWk4d05pMHhORG8xTmpveU55QWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rOXlhV2RwYm1Gc1JHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEcGhZV05oTXpneVpDMDNaVGRtTFRSbE1ETXRZV1F3TXkxbFlUSmtZMlV4TmpGaE1XUWlJSGh0Y0UxTk9rUnZZM1Z0Wlc1MFNVUTlJbmh0Y0M1a2FXUTZNRUZCTlVReVJUWXlNRUkyTVRGRk5qZzBPVVpETmpZMVJEZEZNVU5GTUVJaUlIaHRjRTFOT2tsdWMzUmhibU5sU1VROUluaHRjQzVwYVdRNk1FRkJOVVF5UlRVeU1FSTJNVEZGTmpnME9VWkROalkxUkRkRk1VTkZNRUlpSUhodGNEcERjbVZoZEc5eVZHOXZiRDBpUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5ESURJd01UVWdLRTFoWTJsdWRHOXphQ2tpUGlBOGVHMXdUVTA2UkdWeWFYWmxaRVp5YjIwZ2MzUlNaV1k2YVc1emRHRnVZMlZKUkQwaWVHMXdMbWxwWkRvd05qa3hNa05EUlRsQk1qQkZOakV4T0VaQ1F6ZzRRekl4TjBReVJVSkdPU0lnYzNSU1pXWTZaRzlqZFcxbGJuUkpSRDBpWVdSdlltVTZaRzlqYVdRNmNHaHZkRzl6YUc5d09tWXhZems1TWpneExUTTROV0V0TVRFM09TMWhNelZpTFRrek5UVTJaVGN5TWpKaU5TSXZQaUE4TDNKa1pqcEVaWE5qY21sd2RHbHZiajRnUEM5eVpHWTZVa1JHUGlBOEwzZzZlRzF3YldWMFlUNGdQRDk0Y0dGamEyVjBJR1Z1WkQwaWNpSS9QbWxwOTQ0QUFBQ2VTVVJCVkhqYVl2ai8vNzhPRU4vN0R3R2ZRRGpqV2ZzdkVJYnhvZmcvVkowT0E4TlZVd1lnd3hRbTBmaHE5bitnR0JpRDJFamdFMVFkQTFnVFZLTnc2WXRKejJFYVlManAxUnlRaGdzZ2VhZzZCa2F3Smdpb0IrSUdCaXlBaTRtajlkdS9IelVnOW4rdFV3d3NVUEYrSUM1Z3dBR0FHcXFCRkRjUUY0TDRJRTM1VUEzZmdmZ1BUQ0VySXd2cjcvOS9ma081TEZBMUQ0QjRJa0NBQVFEV0VZdExIS3ZkSXdBQUFBQkpSVTVFcmtKZ2dnPT1cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L2ltZy9hcnJvdy10b3AucG5nXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDEwIDEzIDE2IDE5XG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSAzIDQgMTAgMTIgMTMgMTYgMTlcbiAqKi8iLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgnZGVwL2NvbXBvbmVudC9tb2NrLXNlbGVjdC90cGwvbW9jay1zZWxlY3QtdHBsJyxmdW5jdGlvbigkZGF0YSwkZmlsZW5hbWVcbi8qKi8pIHtcbid1c2Ugc3RyaWN0Jzt2YXIgJHV0aWxzPXRoaXMsJGhlbHBlcnM9JHV0aWxzLiRoZWxwZXJzLCRlc2NhcGU9JHV0aWxzLiRlc2NhcGUsZGF0YT0kZGF0YS5kYXRhLCRvdXQ9Jyc7JG91dCs9JzxkaXYgY2xhc3M9XCJtb2NrLXNlbGVjdCBmb250LXNpemUxNlwiPiA8ZGl2IGNsYXNzPVwibmFtZS13cmFwXCI+IDxzcGFuIGNsYXNzPVwibmFtZVwiIGRhdGEtaWQ9XCInO1xuJG91dCs9JGVzY2FwZShkYXRhWzBdLmlkKTtcbiRvdXQrPSdcIj4nO1xuJG91dCs9JGVzY2FwZShkYXRhWzBdLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJiZ1wiPjwvc3Bhbj4gPC9kaXY+IDwvZGl2Pic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9tb2NrLXNlbGVjdC10cGwudHBsXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSA0IDEwIDEzIDE2IDE5XG4gKiovIiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ2RlcC9jb21wb25lbnQvbW9jay1zZWxlY3QvdHBsL3NlbGVjdC11bC10cGwnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVhY2g9JHV0aWxzLiRlYWNoLGRhdGE9JGRhdGEuZGF0YSwkdmFsdWU9JGRhdGEuJHZhbHVlLCRpbmRleD0kZGF0YS4kaW5kZXgsJGVzY2FwZT0kdXRpbHMuJGVzY2FwZSwkb3V0PScnOyRvdXQrPSc8dWwgY2xhc3M9XCJtb2NrLXVsIGJveC1wYWRkaW5nIGRpc3BsYXktbm9uZVwiPiAnO1xuJGVhY2goZGF0YSxmdW5jdGlvbigkdmFsdWUsJGluZGV4KXtcbiRvdXQrPScgJztcbmlmKCRpbmRleCA9PSAwKXtcbiRvdXQrPScgPGxpIHN0eWxlPVwiYm9yZGVyOm5vbmU7XCIgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5pZCk7XG4kb3V0Kz0nXCI+IDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJyaWdodFwiPuKImjwvc3Bhbj4gPC9saT4gJztcbn1lbHNle1xuJG91dCs9JyA8bGkgZGF0YS1pZD1cIic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5pZCk7XG4kb3V0Kz0nXCI+IDxzcGFuIGNsYXNzPVwiaXRlbS1uYW1lXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLm5hbWUpO1xuJG91dCs9Jzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJyaWdodFwiPuKImjwvc3Bhbj4gPC9saT4gJztcbn1cbiRvdXQrPScgJztcbn0pO1xuJG91dCs9JyA8L3VsPic7XG5yZXR1cm4gbmV3IFN0cmluZygkb3V0KTtcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L21vY2stc2VsZWN0L3RwbC9zZWxlY3QtdWwtdHBsLnRwbFxuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgNCAxMCAxMyAxNiAxOVxuICoqLyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGh1bW9ySGFuIG9uIDIwMTYvNS8yNi5cclxuICovXHJcbnZhciBub0RhdGFUcGwgPSByZXF1aXJlKCduby1kYXRhLXRwbCcpO1xyXG5yZXF1aXJlKCcuL2Nzcy9uby1kYXRhLmNzcycpO1xyXG5cclxudmFyIF8kZWw7XHJcbnZhciBub0RhdGEgPSB7XHJcbiAgICBpbml0OiBmdW5jdGlvbihtc2cpe1xyXG4gICAgICAgIHZhciBwPXttc2c6bXNnfVxyXG4gICAgICAgIF8kZWwuaHRtbChub0RhdGFUcGwocCkpO1xyXG4gICAgfVxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uKGRvbSxtc2cpe1xyXG4gICAgICAgIF8kZWwgPSAkKFwiLlwiICsgZG9tKTtcclxuICAgICAgICBub0RhdGEuaW5pdChtc2cpO1xyXG4gICAgfSxcclxuXHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9uby1kYXRhLmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA0IDEwIDE5XG4gKiovIiwidmFyIHRlbXBsYXRlPXJlcXVpcmUoJ3Rtb2Rqcy1sb2FkZXIvcnVudGltZScpO1xubW9kdWxlLmV4cG9ydHM9dGVtcGxhdGUoJ2RlcC9jb21wb25lbnQvbm8tZGF0YS90cGwvbm8tZGF0YS10cGwnLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVzY2FwZT0kdXRpbHMuJGVzY2FwZSxtc2c9JGRhdGEubXNnLCRvdXQ9Jyc7JG91dCs9JzxkaXYgY2xhc3M9XCJuby1kYXRhLWJnXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJuby1kYXRhLXRpcCBmb250LXNpemUxMlwiPic7XG4kb3V0Kz0kZXNjYXBlKG1zZyB8fCAn5pqC5peg5pWw5o2uJyk7XG4kb3V0Kz0nPC9kaXY+JztcbnJldHVybiBuZXcgU3RyaW5nKCRvdXQpO1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RlcC9jb21wb25lbnQvbm8tZGF0YS90cGwvbm8tZGF0YS10cGwudHBsXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA0IDEwIDE5XG4gKiovIiwiLy8gc3R5bGUtbG9hZGVyOiBBZGRzIHNvbWUgY3NzIHRvIHRoZSBET00gYnkgYWRkaW5nIGEgPHN0eWxlPiB0YWdcblxuLy8gbG9hZCB0aGUgc3R5bGVzXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9uby1kYXRhLmNzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9uby1kYXRhLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL25vLWRhdGEuY3NzXCIpO1xuXHRcdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cdFx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdFx0fSk7XG5cdH1cblx0Ly8gV2hlbiB0aGUgbW9kdWxlIGlzIGRpc3Bvc2VkLCByZW1vdmUgdGhlIDxzdHlsZT4gdGFnc1xuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL2NvbXBvbmVudC9uby1kYXRhL2Nzcy9uby1kYXRhLmNzc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgNCAxMCAxOVxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLm5vLWRhdGEtYmd7XFxyXFxuICAgIG1hcmdpbjogNDclIGF1dG8gNSU7XFxyXFxuICAgIGhlaWdodDogNTdweDtcXHJcXG4gICAgd2lkdGg6IDU4cHg7XFxyXFxuICAgIGJhY2tncm91bmQ6IHVybChcIiArIHJlcXVpcmUoXCIuLi9pbWcvbm8tZGF0YS5wbmdcIikgKyBcIikgY2VudGVyIGNlbnRlciBuby1yZXBlYXQ7XFxyXFxufVxcclxcbi5uby1kYXRhLXRpcHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBjb2xvcjogIzk5OTk5OTtcXHJcXG59XCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL2RlcC9jb21wb25lbnQvbm8tZGF0YS9jc3Mvbm8tZGF0YS5jc3NcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDQgMTAgMTlcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFEa0FBQUE2Q0FZQUFBQUtqUEVyQUFBQUdYUkZXSFJUYjJaMGQyRnlaUUJCWkc5aVpTQkpiV0ZuWlZKbFlXUjVjY2xsUEFBQUE0QnBWRmgwV0UxTU9tTnZiUzVoWkc5aVpTNTRiWEFBQUFBQUFEdy9lSEJoWTJ0bGRDQmlaV2RwYmowaTc3dS9JaUJwWkQwaVZ6Vk5NRTF3UTJWb2FVaDZjbVZUZWs1VVkzcHJZemxrSWo4K0lEeDRPbmh0Y0cxbGRHRWdlRzFzYm5NNmVEMGlZV1J2WW1VNmJuTTZiV1YwWVM4aUlIZzZlRzF3ZEdzOUlrRmtiMkpsSUZoTlVDQkRiM0psSURVdU15MWpNREV4SURZMkxqRTBOVFkyTVN3Z01qQXhNaTh3TWk4d05pMHhORG8xTmpveU55QWdJQ0FnSUNBZ0lqNGdQSEprWmpwU1JFWWdlRzFzYm5NNmNtUm1QU0pvZEhSd09pOHZkM2QzTG5jekxtOXlaeTh4T1RrNUx6QXlMekl5TFhKa1ppMXplVzUwWVhndGJuTWpJajRnUEhKa1pqcEVaWE5qY21sd2RHbHZiaUJ5WkdZNllXSnZkWFE5SWlJZ2VHMXNibk02ZUcxd1RVMDlJbWgwZEhBNkx5OXVjeTVoWkc5aVpTNWpiMjB2ZUdGd0x6RXVNQzl0YlM4aUlIaHRiRzV6T25OMFVtVm1QU0pvZEhSd09pOHZibk11WVdSdlltVXVZMjl0TDNoaGNDOHhMakF2YzFSNWNHVXZVbVZ6YjNWeVkyVlNaV1lqSWlCNGJXeHVjenA0YlhBOUltaDBkSEE2THk5dWN5NWhaRzlpWlM1amIyMHZlR0Z3THpFdU1DOGlJSGh0Y0UxTk9rOXlhV2RwYm1Gc1JHOWpkVzFsYm5SSlJEMGllRzF3TG1ScFpEcGhZV05oTXpneVpDMDNaVGRtTFRSbE1ETXRZV1F3TXkxbFlUSmtZMlV4TmpGaE1XUWlJSGh0Y0UxTk9rUnZZM1Z0Wlc1MFNVUTlJbmh0Y0M1a2FXUTZSVFZHTmpWRVFqWXlNekk0TVRGRk5qbEZSRFU0T0VJeE1UZzNPRGRETkRZaUlIaHRjRTFOT2tsdWMzUmhibU5sU1VROUluaHRjQzVwYVdRNlJUVkdOalZFUWpVeU16STRNVEZGTmpsRlJEVTRPRUl4TVRnM09EZERORFlpSUhodGNEcERjbVZoZEc5eVZHOXZiRDBpUVdSdlltVWdVR2h2ZEc5emFHOXdJRU5UTmlBb1YybHVaRzkzY3lraVBpQThlRzF3VFUwNlJHVnlhWFpsWkVaeWIyMGdjM1JTWldZNmFXNXpkR0Z1WTJWSlJEMGllRzF3TG1scFpEb3pOek00WkRSaU1pMWtPREUwTFRRNU5UVXRZamN4TkMwek9HTTJNamMwWWpObE9UWWlJSE4wVW1WbU9tUnZZM1Z0Wlc1MFNVUTlJbUZrYjJKbE9tUnZZMmxrT25Cb2IzUnZjMmh2Y0RvMU5EVTBZV1V5T0MwMVpUUXdMVEV4TnprdE9EUXhaaTA0Tm1VME9XUXpPVGRrTVdRaUx6NGdQQzl5WkdZNlJHVnpZM0pwY0hScGIyNCtJRHd2Y21SbU9sSkVSajRnUEM5NE9uaHRjRzFsZEdFK0lEdy9lSEJoWTJ0bGRDQmxibVE5SW5JaVB6NUZteWlGQUFBRnFFbEVRVlI0MnVSYVcwc3JWeFRlbWR4TllqWHhpcUxWZUcxUEN5MmVlbzY5U0cyTFBiL0RVQjhMZld4cG9kQSs5cUdQbHZUSDZJdWdJb3FvZUFtQ2lxS0kxV3E4NVdMWE4yVENudTFrY25GeVptc1h4REV6eWN6KzlscnJXOTllT3k1V2dzWGo4ZS9wOEF1OS9BNkhJOE5zdHZ2N2V5Y2RidWoxYXl3Vys3UFk1eDBsQVB6QjQvSDhGbzFHL1Y2dmw4bGl0N2UzTEpGSVhLZFNxWjhuSmliK3FCamsxTlNVdytsMC9qTTRPUGlPVEFBMXU3dTdZMnRyYS85bU1wbTZ5Y25KKzBLZmN4VzVUNS9MNVhLSUFHbjIyT25wS1V1bjB3aWRxb09oRkdFMERoWU9oNW5iN2M2ZnB3aFQzeFBJQVhxN1hoRkl1dm1yVUNpa1EzaDFkY1YyZG5aWWIyOHZhMjV1Wm9xaVZCMWtOcHRsUjBkSGJITnprM1YxZGJHYW1wcjhOWXlQUW5la1lwQTBlOThHZzBFZHlMMjlQVFkyTnNiYTI5dmZhbWgyZDNlempvNE9OajA5emZyNysvUG5NYjZ6czdOeCt2ZnZRdDlWaXJEWTYwQWdvRXQyaE03YkJxaFpXMXViK255TVF6T01qOFk1WXZZOXhZUjBBdlRsSnAvUHB3dlZscFlXVzhrR3o4YzROQU5mMERqcmFieWhTanc1NVBmN1UveUptNXNiMXRUVVpDdElQQi9qNEkyOGlkbzlYRFpJSXBRdmFtdHJneUxJeHNaR1cwSGkrU0pJSXA4Z2xiclJza0hTbDhacGhuVFhrOG1rU3VOMkdwNlBjZkJHNU9NZ3A0eVhEWkpvK3dPZWRGQjRFZitvVjNZYW5vOFN3cE1QM2xPdGZBL2lwV1NROU9GM3laTlFPenJTc1R0VStaRGx2WWxhVGNJQWVkbFhqaWVIS2M1MUxydSt2bGFMdnd4bVJENm9sMVJlUmtvR1NWSnBuTDdrRjBtbm9hRkJHazhha0k4WDRxVmtrRlIzUHVmelVTTWRXVUFha1krWktGQU04dEZMcE5OR05WSTYwdUdZWHdYRmswOU9GSVNOUklHUkp6OFNSWUJNcEZPSWZISXNtellTQllxQkNQaU00anNnSyttWWtRK0psNUNSS0ZBTVFnRXJENmVzcEdOR1BoVENFQVhmRkFWSitmaXh6S1JUakh4SUZMeHZDcEtTdHBWbXdzMFRETG9BV0lITFFqcG01QU5SUU9VdlN6ajZ6RHo1Q2pwUTlLSnNwR05HUHFpWEpBcGVGd1JKM3ZwYUpCMFpsbGZsa0krUktGQ0VuczZvbUk4eUxLL0tKQi9VeTA4TlFWSWN1eWhwdTNrUkFMdTh2SlNPZERTTFJDSVB3alVuQ2lLRUoyamt5UTk5UGw4S1BSU1JkUGcyb0V3R29pRU9lZUJORWdWWWtYenlBQ1NTbGVMWi8xUkloODlMdnVlVEV3VzZUb0hDa2M0YmltZjNVeUdkSWowZlhhZEE0VlllTCtINnAwSTZtb0V2SURzTlJNRUxIVWhLMGdpdWlia25NK253eWtjTTE1d295R2lpUVBQa01LSFA4aCtVblhTS2tRL3hpMGRia1NnNWlmUWxuUXlKeXl2WnZXaEdQZ1RjUnc1Nmt3ZEpzL0dWS0FJUTU3S1RUaEh5eVhjS0ZJcGJoWkswbjk4cGdrSDR5azQ2dkNqZ2hUb00yeHZZNXNCMkJ6dzVRTG1YRXJmZ3NQY29xaDlaalp4a2VKNGNodzdIU3dWdFBGRUVhRE9CYlRyWkRadkFTMHRMVEtDVWZLZUFuRGRLR3NDRjlxUEhTUHd1THkrckRJdTlRUnp0TUtpdXc4TkRkU05XTkRUWXRyYTJWS0RZdXhRTm9nRGJIUzRrcDBnNk1JQ0tScU5zZlgyZExTd3NxQ1dGbnozUTl0RFFrRG9CMWJLVmxSVzJ1TGpJNnVycUNwWXlYQ09QR1Y0RExwcWNGeTc2RXk3MG93ZWNONW9ocmNUTXpzNnFNOXpUMDJNNXdPUGpZeldTQmdZR0t1NUs1SGpHU1VjbFhja053TWFkbloxc2JtNnVLbDdjMk5oUVUrYXhiUmZpbk95amZ0V2dzZS81K2JubElKR0hvcGF1V0JVOTlnWmd0ZjM5ZlVzQm9ueEJqUEJiK2JhQ1JITHY3dTVhbm85V2VkRXlUMkpRVnY1b0NmZXpVb2c4R2lRWURDU0VnVmxsQndjSFRKU1p0b0xVUXRiS3ZEdzVPV0ZHdGR0V2tBalpSQ0poV2FoQ2lGajVjelpMN29UUVFwZHZmbjdlVUg2VmFoY1hGMnhtWnNieWRheGxHeHdRQmhEMHE2dXJGZVVUSmdmTHBkYldWbFpmWHk4blNHekFBQ2dHaXpwWGlVR2Y4bjFmNlVEeWJHdlhpcVdxT1NtNy9UOUFrbEo1MWtDQkR3Q1RZaFBvdVZnT1Z4SWdmOXplM3I1NmJrQ0JCN2lBVCtYcmVEeitIUjErUjEzSEl2TTVoQ2lhRi9UNktSYUwvZldmQUFNQStwUkxQMFBTTC9NQUFBQUFTVVZPUks1Q1lJST1cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kZXAvY29tcG9uZW50L25vLWRhdGEvaW1nL25vLWRhdGEucG5nXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA0IDEwIDE5XG4gKiovIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgaHVtb3JIYW4gb24gMjAxNi81LzI0LlxyXG4gKi9cclxudmFyIG1vY2tTZWxlY3QgPSByZXF1aXJlKCdjb21wb25lbnQvbW9jay1zZWxlY3QvbW9jay1zZWxlY3QuanMnKTtcclxudmFyIHV0aWwgPSByZXF1aXJlKCd1dGlsL3V0aWwnKTtcclxudmFyIE1vY2sgPSByZXF1aXJlKCdtb2NrJyk7XHJcbnZhciBtb2NrRGF0YSA9IE1vY2subW9jayhcclxuICAgIHtcclxuICAgICAgICAnTnwzLTUnOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICdHcmFkZUlEfCsxJzogMSxcclxuICAgICAgICAgICAgICAgICdHcmFkZU5hbWV8MSc6IFsn5bCP5a2mJywn5Yid5LitJywn6auY5LitJ10sXHJcbiAgICAgICAgICAgICAgICAnU3ViamVjdElEfCsxJzogMTAwLFxyXG4gICAgICAgICAgICAgICAgJ1N1YmplY3ROYW1lfDEnOiBbJ+aVsOWtpicsJ+ivreaWhycsJ+iLseivrScsJ+eJqeeQhicsJ+eUn+eJqScsJ+WMluWtpicsJ+aUv+ayuycsJ+WOhuWPsiddXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbik7XHJcblxyXG5cclxudmFyIGlzQ291cnNlUmVhZHkgPSBmYWxzZTtcclxudmFyIEN1cnJlbnRCaWdHcmFkZSwgQ3VycmVudFN1YmplY3Q7XHJcbnZhciBjb3Vyc2VJbmZvID0ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmluaXRDb3Vyc2UoKTtcclxuICAgIH0sXHJcbiAgICBpbml0Q291cnNlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgIHZhciBwYXJhbSA9IHtcclxuICAgICAgICAgICAgQXBwSUQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ2FwcGlkJyksXHJcbiAgICAgICAgICAgIE9wZW5JRDogc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgnb3BlbmlkJylcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB0VGhpcyA9IHRoaXM7XHJcbiAgICAgICAgLy/lpITnkIbmlbDmja5cclxuICAgICAgICB2YXIgc3ViamVjdGxpc3QgPSB7XHJcbiAgICAgICAgICAgIGRhdGE6IG1vY2tEYXRhLk5cclxuICAgICAgICB9O1xyXG4gICAgICAgICQuZWFjaChzdWJqZWN0bGlzdC5kYXRhLGZ1bmN0aW9uKGksIGl0ZW0pe1xyXG4gICAgICAgICAgICBpdGVtLmlkID0gaXRlbS5HcmFkZUlEICsgJywnICsgaXRlbS5TdWJqZWN0SUQ7XHJcbiAgICAgICAgICAgIGl0ZW0ubmFtZSA9IGl0ZW0uR3JhZGVOYW1lICsgaXRlbS5TdWJqZWN0TmFtZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgYXN5bmM6ZmFsc2UsXHJcbiAgICAgICAgICAgIHVybDp1dGlsLmdldEFwaVVybCgnSG9tZVNjaG9vbENvbnRhY3QvUmVnaXN0cmF0aW9uL0dldFJlZ2lzdHJhdGlvbkRyb3BEb3duTGlzdCcpLFxyXG4gICAgICAgICAgICBkYXRhOiBwYXJhbSxcclxuICAgICAgICAgICAgc3VjY2VzczpmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgIHV0aWwuY2hlY2tCaW5kKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKGRhdGEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YS5PSylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NsaXN0PWRhdGEuTjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQuZWFjaChkYXRhLk4sIGZ1bmN0aW9uIChpLCBpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5pZCA9IGl0ZW0udXNlclN1amVjdElkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLm9yZGVyTnVtID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLm5hbWUgPSB1dGlsLmdldFN0YWdlU3RyKGl0ZW0uYmdyYWRlKSArIHV0aWwuZ2V0U3ViamVjdE5hbWUoaXRlbS5zdWJqZWN0SWQpICsgaXRlbS5vcmRlck51bS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5uYW1lID0gdXRpbC5nZXRTdGFnZVN0cihpdGVtLmJncmFkZSkgKyB1dGlsLmdldFN1YmplY3ROYW1lKGl0ZW0uc3ViamVjdElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3ViamVjdGxpc3QuZGF0YSA9IGRhdGEuTjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYoc3ViamVjdGxpc3QuZGF0YS5sZW5ndGg+MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1vY2tTZWxlY3QoJ2NvdXJzZScsIHN1YmplY3RsaXN0LCBmdW5jdGlvbihpZHMpe1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygn5L2g6ZyA6KaB55qEaWTpm4blkIg6ICcgKyBpZHMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGFyclRlbXAgPSBpZHMuc3BsaXQoJywnKTtcclxuICAgICAgICAgICAgICAgIHRUaGlzLmdldGNvdXJzZUluZm8oaWRzKTtcclxuICAgICAgICAgICAgfSxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgLy/pobXpnaLlm57osINcclxuICAgICAgICAgICAgICAgIC8vdFRoaXMuZ2V0Y291cnNlSW5mbygpO1xyXG4gICAgICAgICAgICB9LCdjb3Vyc2Utb3B0aW9uJywgZnVuY3Rpb24oZmxhZyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoZmxhZykge31cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvL+aXoOaVsOaNrlxyXG4gICAgICAgICAgICB2YXIgbm9kYXRhPXJlcXVpcmUoJ2NvbXBvbmVudC9uby1kYXRhL25vLWRhdGEnKTtcclxuICAgICAgICAgICAgbm9kYXRhLmluaXQoJ2JnLXdoaXRlJywn5pqC5peg6K++56iL5L+h5oGvJyk7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuICAgIC8v6I635Y+W6K++56iL5L+h5oGvXHJcbiAgICBnZXRjb3Vyc2VJbmZvOiBmdW5jdGlvbiAoaWQpIHtcclxuICAgICAgICB2YXIgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIEFwcElEOiBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdhcHBpZCcpLFxyXG4gICAgICAgICAgICBPcGVuSUQ6IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ29wZW5pZCcpLFxyXG4gICAgICAgICAgICB1c2Vyc3ViamVjdGlkOmlkXHJcblxyXG4gICAgICAgIH07XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICB1cmw6IHV0aWwuZ2V0QXBpVXJsKCdIb21lU2Nob29sQ29udGFjdC9SZWdpc3RyYXRpb24vR2V0UmVnaXN0cmF0aW9uJyksXHJcbiAgICAgICAgICAgIGRhdGE6IHBhcmFtLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICAvLyB0aW1lb3V0OiAzMDAsXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICB1dGlsLmNoZWNrQmluZChkYXRhKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEuT0spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGM9ZGF0YS5OO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihjLmxlbmd0aD4wKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNbMF0uY2xhc3NTdGFydFRpbWUmJmNbMF0ucGxhbmlkPjApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2NvdXJzZXN0YXJ0dGltZVwiKS5odG1sKCfkuo4gJyt1dGlsLmdldExvY2FsVGltZShjWzBdLmNsYXNzU3RhcnRUaW1lKSsnIOW8gOivvicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjY291cnNlc3RhcnR0aW1lXCIpLmh0bWwoJ+acquW8gOivvicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRwbD1yZXF1aXJlKCdjb3Vyc2VpbmZvLnRwbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiN0YmNvdXJzZWluZm9cIikuaHRtbCh0cGwoYykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy/ml6DmlbDmja5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RhdGE9cmVxdWlyZSgnY29tcG9uZW50L25vLWRhdGEvbm8tZGF0YScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kYXRhLmluaXQoJ21haW4nLCfmmoLml6Dor77nqIvkv6Hmga8nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbiQoZnVuY3Rpb24oKXtcclxuICAgIGNvdXJzZUluZm8uaW5pdCgpO1xyXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvY291cnNlaW5mby5qc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iLCIvKiEgbW9ja2pzIDIzLTA2LTIwMTQgMTU6NTc6MzcgKi9cclxuLyohIHNyYy9tb2NrLXByZWZpeC5qcyAqL1xyXG4vKiFcclxuICAgIE1vY2sgLSDmqKHmi5/or7fmsYIgJiDmqKHmi5/mlbDmja5cclxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9udXlzb2Z0L01vY2tcclxuICAgIOWiqOaZuiBtb3poaS5neXlAdGFvYmFvLmNvbSBudXlzb2Z0QGdtYWlsLmNvbVxyXG4qL1xyXG4oZnVuY3Rpb24odW5kZWZpbmVkKSB7XHJcbiAgICB2YXIgTW9jayA9IHtcclxuICAgICAgICB2ZXJzaW9uOiBcIjAuMS41XCIsXHJcbiAgICAgICAgX21vY2tlZDoge31cclxuICAgIH07XHJcbiAgICAvKiEgc3JjL3V0aWwuanMgKi9cclxuICAgIHZhciBVdGlsID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIFV0aWwgPSB7fTtcclxuICAgICAgICBVdGlsLmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZCgpIHtcclxuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50c1swXSB8fCB7fSwgaSA9IDEsIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGgsIG9wdGlvbnMsIG5hbWUsIHNyYywgY29weSwgY2xvbmU7XHJcbiAgICAgICAgICAgIGlmIChsZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldCA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICBpID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKDtpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcmMgPSB0YXJnZXRbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgY29weSA9IG9wdGlvbnNbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gY29weSkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvcHkgPT09IHVuZGVmaW5lZCkgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNBcnJheShjb3B5KSB8fCBVdGlsLmlzT2JqZWN0KGNvcHkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY29weSkpIGNsb25lID0gc3JjICYmIFV0aWwuaXNBcnJheShzcmMpID8gc3JjIDogW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzT2JqZWN0KGNvcHkpKSBjbG9uZSA9IHNyYyAmJiBVdGlsLmlzT2JqZWN0KHNyYykgPyBzcmMgOiB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W25hbWVdID0gVXRpbC5leHRlbmQoY2xvbmUsIGNvcHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFtuYW1lXSA9IGNvcHk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLmVhY2ggPSBmdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgdmFyIGksIGtleTtcclxuICAgICAgICAgICAgaWYgKHRoaXMudHlwZShvYmopID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb2JqOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvcihpLCBpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChvYmoubGVuZ3RoID09PSArb2JqLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKSA9PT0gZmFsc2UpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKSA9PT0gZmFsc2UpIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLnR5cGUgPSBmdW5jdGlvbiB0eXBlKG9iaikge1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkID8gU3RyaW5nKG9iaikgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKS5tYXRjaCgvXFxbb2JqZWN0IChcXHcrKVxcXS8pWzFdLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLmVhY2goXCJTdHJpbmcgT2JqZWN0IEFycmF5IFJlZ0V4cCBGdW5jdGlvblwiLnNwbGl0KFwiIFwiKSwgZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgVXRpbFtcImlzXCIgKyB2YWx1ZV0gPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBVdGlsLnR5cGUob2JqKSA9PT0gdmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBVdGlsLmlzT2JqZWN0T3JBcnJheSA9IGZ1bmN0aW9uKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlsLmlzT2JqZWN0KHZhbHVlKSB8fCBVdGlsLmlzQXJyYXkodmFsdWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgVXRpbC5pc051bWVyaWMgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLmtleXMgPSBmdW5jdGlvbihvYmopIHtcclxuICAgICAgICAgICAgdmFyIGtleXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSBrZXlzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4ga2V5cztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWwudmFsdWVzID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB2YWx1ZXMucHVzaChvYmpba2V5XSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcztcclxuICAgICAgICB9O1xyXG4gICAgICAgIFV0aWwuaGVyZWRvYyA9IGZ1bmN0aW9uIGhlcmVkb2MoZm4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZuLnRvU3RyaW5nKCkucmVwbGFjZSgvXlteXFwvXStcXC9cXCohPy8sIFwiXCIpLnJlcGxhY2UoL1xcKlxcL1teXFwvXSskLywgXCJcIikucmVwbGFjZSgvXltcXHNcXHhBMF0rLywgXCJcIikucmVwbGFjZSgvW1xcc1xceEEwXSskLywgXCJcIik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBVdGlsLm5vb3AgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICAgIHJldHVybiBVdGlsO1xyXG4gICAgfSgpO1xyXG4gICAgLyohIHNyYy9yYW5kb20uanMgKi9cclxuICAgIHZhciBSYW5kb20gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgUmFuZG9tID0ge1xyXG4gICAgICAgICAgICBleHRlbmQ6IFV0aWwuZXh0ZW5kXHJcbiAgICAgICAgfTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgXCJib29sZWFuXCI6IGZ1bmN0aW9uKG1pbiwgbWF4LCBjdXIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChjdXIgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbiA9IHR5cGVvZiBtaW4gIT09IFwidW5kZWZpbmVkXCIgJiYgIWlzTmFOKG1pbikgPyBwYXJzZUludChtaW4sIDEwKSA6IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gdHlwZW9mIG1heCAhPT0gXCJ1bmRlZmluZWRcIiAmJiAhaXNOYU4obWF4KSA/IHBhcnNlSW50KG1heCwgMTApIDogMTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+IDEgLyAobWluICsgbWF4KSAqIG1pbiA/ICFjdXIgOiBjdXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA+PSAuNTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9vbDogZnVuY3Rpb24obWluLCBtYXgsIGN1cikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYm9vbGVhbihtaW4sIG1heCwgY3VyKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbmF0dXJhbDogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IHR5cGVvZiBtaW4gIT09IFwidW5kZWZpbmVkXCIgPyBwYXJzZUludChtaW4sIDEwKSA6IDA7XHJcbiAgICAgICAgICAgICAgICBtYXggPSB0eXBlb2YgbWF4ICE9PSBcInVuZGVmaW5lZFwiID8gcGFyc2VJbnQobWF4LCAxMCkgOiA5MDA3MTk5MjU0NzQwOTkyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaW50ZWdlcjogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIG1pbiA9IHR5cGVvZiBtaW4gIT09IFwidW5kZWZpbmVkXCIgPyBwYXJzZUludChtaW4sIDEwKSA6IC05MDA3MTk5MjU0NzQwOTkyO1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gdHlwZW9mIG1heCAhPT0gXCJ1bmRlZmluZWRcIiA/IHBhcnNlSW50KG1heCwgMTApIDogOTAwNzE5OTI1NDc0MDk5MjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaW50XCI6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbnRlZ2VyKG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJmbG9hdFwiOiBmdW5jdGlvbihtaW4sIG1heCwgZG1pbiwgZG1heCkge1xyXG4gICAgICAgICAgICAgICAgZG1pbiA9IGRtaW4gPT09IHVuZGVmaW5lZCA/IDAgOiBkbWluO1xyXG4gICAgICAgICAgICAgICAgZG1pbiA9IE1hdGgubWF4KE1hdGgubWluKGRtaW4sIDE3KSwgMCk7XHJcbiAgICAgICAgICAgICAgICBkbWF4ID0gZG1heCA9PT0gdW5kZWZpbmVkID8gMTcgOiBkbWF4O1xyXG4gICAgICAgICAgICAgICAgZG1heCA9IE1hdGgubWF4KE1hdGgubWluKGRtYXgsIDE3KSwgMCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gdGhpcy5pbnRlZ2VyKG1pbiwgbWF4KSArIFwiLlwiO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGRjb3VudCA9IHRoaXMubmF0dXJhbChkbWluLCBkbWF4KTsgaSA8IGRjb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0ICs9IHRoaXMuY2hhcmFjdGVyKFwibnVtYmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQocmV0LCAxMCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNoYXJhY3RlcjogZnVuY3Rpb24ocG9vbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvb2xzID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvd2VyOiBcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgdXBwZXI6IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVpcIixcclxuICAgICAgICAgICAgICAgICAgICBudW1iZXI6IFwiMDEyMzQ1Njc4OVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIHN5bWJvbDogXCIhQCMkJV4mKigpW11cIlxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHBvb2xzLmFscGhhID0gcG9vbHMubG93ZXIgKyBwb29scy51cHBlcjtcclxuICAgICAgICAgICAgICAgIHBvb2xzW1widW5kZWZpbmVkXCJdID0gcG9vbHMubG93ZXIgKyBwb29scy51cHBlciArIHBvb2xzLm51bWJlciArIHBvb2xzLnN5bWJvbDtcclxuICAgICAgICAgICAgICAgIHBvb2wgPSBwb29sc1soXCJcIiArIHBvb2wpLnRvTG93ZXJDYXNlKCldIHx8IHBvb2w7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9vbC5jaGFyQXQoUmFuZG9tLm5hdHVyYWwoMCwgcG9vbC5sZW5ndGggLSAxKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY2hhclwiOiBmdW5jdGlvbihwb29sKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXIocG9vbCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN0cmluZzogZnVuY3Rpb24ocG9vbCwgbWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMykge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IFJhbmRvbS5uYXR1cmFsKG1pbiwgbWF4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gbWluO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IFJhbmRvbS5uYXR1cmFsKHBvb2wsIG1pbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvb2wgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBwb29sO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvb2wgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aCA9IFJhbmRvbS5uYXR1cmFsKDMsIDcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gUmFuZG9tLmNoYXJhY3Rlcihwb29sKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0O1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzdHI6IGZ1bmN0aW9uKHBvb2wsIG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdHJpbmcocG9vbCwgbWluLCBtYXgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByYW5nZTogZnVuY3Rpb24oc3RhcnQsIHN0b3AsIHN0ZXApIHtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9wID0gc3RhcnQgfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCA9IDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGVwID0gYXJndW1lbnRzWzJdIHx8IDE7XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9ICtzdGFydCwgc3RvcCA9ICtzdG9wLCBzdGVwID0gK3N0ZXA7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gTWF0aC5tYXgoTWF0aC5jZWlsKChzdG9wIC0gc3RhcnQpIC8gc3RlcCksIDApO1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkeCA9IDA7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgQXJyYXkobGVuKTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICByYW5nZVtpZHgrK10gPSBzdGFydDtcclxuICAgICAgICAgICAgICAgICAgICBzdGFydCArPSBzdGVwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIHBhdHRlcm5MZXR0ZXJzOiB7XHJcbiAgICAgICAgICAgICAgICB5eXl5OiBcImdldEZ1bGxZZWFyXCIsXHJcbiAgICAgICAgICAgICAgICB5eTogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXCJcIiArIGRhdGUuZ2V0RnVsbFllYXIoKSkuc2xpY2UoMik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgeTogXCJ5eVwiLFxyXG4gICAgICAgICAgICAgICAgTU06IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG0gPCAxMCA/IFwiMFwiICsgbSA6IG07XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgTTogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGRkOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBkYXRlLmdldERhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZCA8IDEwID8gXCIwXCIgKyBkIDogZDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkOiBcImdldERhdGVcIixcclxuICAgICAgICAgICAgICAgIEhIOiBmdW5jdGlvbihkYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGggPSBkYXRlLmdldEhvdXJzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGggPCAxMCA/IFwiMFwiICsgaCA6IGg7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgSDogXCJnZXRIb3Vyc1wiLFxyXG4gICAgICAgICAgICAgICAgaGg6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaCA9IGRhdGUuZ2V0SG91cnMoKSAlIDEyO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBoIDwgMTAgPyBcIjBcIiArIGggOiBoO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGg6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpICUgMTI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgbW06IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0TWludXRlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtIDwgMTAgPyBcIjBcIiArIG0gOiBtO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG06IFwiZ2V0TWludXRlc1wiLFxyXG4gICAgICAgICAgICAgICAgc3M6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcyA9IGRhdGUuZ2V0U2Vjb25kcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzIDwgMTAgPyBcIjBcIiArIHMgOiBzO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIHM6IFwiZ2V0U2Vjb25kc1wiLFxyXG4gICAgICAgICAgICAgICAgU1M6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbXMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtcyA8IDEwICYmIFwiMDBcIiArIG1zIHx8IG1zIDwgMTAwICYmIFwiMFwiICsgbXMgfHwgbXM7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgUzogXCJnZXRNaWxsaXNlY29uZHNcIixcclxuICAgICAgICAgICAgICAgIEE6IGZ1bmN0aW9uKGRhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRIb3VycygpIDwgMTIgPyBcIkFNXCIgOiBcIlBNXCI7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYTogZnVuY3Rpb24oZGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgPCAxMiA/IFwiYW1cIiA6IFwicG1cIjtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBUOiBcImdldFRpbWVcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIHJmb3JtYXQ6IG5ldyBSZWdFeHAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmUgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gUmFuZG9tLnBhdHRlcm5MZXR0ZXJzKSByZS5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiKFwiICsgcmUuam9pbihcInxcIikgKyBcIilcIjtcclxuICAgICAgICAgICAgfSgpLCBcImdcIiksXHJcbiAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24oZGF0ZSwgZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGF0dGVybkxldHRlcnMgPSBSYW5kb20ucGF0dGVybkxldHRlcnMsIHJmb3JtYXQgPSBSYW5kb20ucmZvcm1hdDtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXQucmVwbGFjZShyZm9ybWF0LCBmdW5jdGlvbigkMCwgZmxhZykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcGF0dGVybkxldHRlcnNbZmxhZ10gPT09IFwiZnVuY3Rpb25cIiA/IHBhdHRlcm5MZXR0ZXJzW2ZsYWddKGRhdGUpIDogcGF0dGVybkxldHRlcnNbZmxhZ10gaW4gcGF0dGVybkxldHRlcnMgPyBhcmd1bWVudHMuY2FsbGVlKCQwLCBwYXR0ZXJuTGV0dGVyc1tmbGFnXSkgOiBkYXRlW3BhdHRlcm5MZXR0ZXJzW2ZsYWddXSgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJhbmRvbURhdGU6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBtaW4gPSBtaW4gPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKDApIDogbWluO1xyXG4gICAgICAgICAgICAgICAgbWF4ID0gbWF4ID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSgpIDogbWF4O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKE1hdGgucmFuZG9tKCkgKiAobWF4LmdldFRpbWUoKSAtIG1pbi5nZXRUaW1lKCkpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0ZTogZnVuY3Rpb24oZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXQgfHwgXCJ5eXl5LU1NLWRkXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQodGhpcy5yYW5kb21EYXRlKCksIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpbWU6IGZ1bmN0aW9uKGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8IFwiSEg6bW06c3NcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcm1hdCh0aGlzLnJhbmRvbURhdGUoKSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0ZXRpbWU6IGZ1bmN0aW9uKGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8IFwieXl5eS1NTS1kZCBISDptbTpzc1wiO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KHRoaXMucmFuZG9tRGF0ZSgpLCBmb3JtYXQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBub3c6IGZ1bmN0aW9uKHVuaXQsIGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIS95ZWFyfG1vbnRofHdlZWt8ZGF5fGhvdXJ8bWludXRlfHNlY29uZHx3ZWVrLy50ZXN0KHVuaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuaXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuaXQgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHVuaXQgPSAodW5pdCB8fCBcIlwiKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8IFwieXl5eS1NTS1kZCBISDptbTpzc1wiO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh1bml0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ5ZWFyXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXRNb250aCgwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJtb250aFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0RGF0ZSgxKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3ZWVrXCI6XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJkYXlcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldEhvdXJzKDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgY2FzZSBcImhvdXJcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXRlLnNldE1pbnV0ZXMoMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBjYXNlIFwibWludXRlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXRTZWNvbmRzKDApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgY2FzZSBcInNlY29uZFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoICh1bml0KSB7XHJcbiAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3ZWVrXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gZGF0ZS5nZXREYXkoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQoZGF0ZSwgZm9ybWF0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBhZF9zaXplOiBbIFwiMzAweDI1MFwiLCBcIjI1MHgyNTBcIiwgXCIyNDB4NDAwXCIsIFwiMzM2eDI4MFwiLCBcIjE4MHgxNTBcIiwgXCI3MjB4MzAwXCIsIFwiNDY4eDYwXCIsIFwiMjM0eDYwXCIsIFwiODh4MzFcIiwgXCIxMjB4OTBcIiwgXCIxMjB4NjBcIiwgXCIxMjB4MjQwXCIsIFwiMTI1eDEyNVwiLCBcIjcyOHg5MFwiLCBcIjE2MHg2MDBcIiwgXCIxMjB4NjAwXCIsIFwiMzAweDYwMFwiIF0sXHJcbiAgICAgICAgICAgIHNjcmVlbl9zaXplOiBbIFwiMzIweDIwMFwiLCBcIjMyMHgyNDBcIiwgXCI2NDB4NDgwXCIsIFwiODAweDQ4MFwiLCBcIjgwMHg0ODBcIiwgXCIxMDI0eDYwMFwiLCBcIjEwMjR4NzY4XCIsIFwiMTI4MHg4MDBcIiwgXCIxNDQweDkwMFwiLCBcIjE5MjB4MTIwMFwiLCBcIjI1NjB4MTYwMFwiIF0sXHJcbiAgICAgICAgICAgIHZpZGVvX3NpemU6IFsgXCI3MjB4NDgwXCIsIFwiNzY4eDU3NlwiLCBcIjEyODB4NzIwXCIsIFwiMTkyMHgxMDgwXCIgXSxcclxuICAgICAgICAgICAgaW1hZ2U6IGZ1bmN0aW9uKHNpemUsIGJhY2tncm91bmQsIGZvcmVncm91bmQsIGZvcm1hdCwgdGV4dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0ZXh0ID0gZm9ybWF0O1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCA9IGZvcmVncm91bmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yZWdyb3VuZCA9IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghc2l6ZSkgc2l6ZSA9IHRoaXMucGljayh0aGlzLmFkX3NpemUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhY2tncm91bmQgJiYgfmJhY2tncm91bmQuaW5kZXhPZihcIiNcIikpIGJhY2tncm91bmQgPSBiYWNrZ3JvdW5kLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZvcmVncm91bmQgJiYgfmZvcmVncm91bmQuaW5kZXhPZihcIiNcIikpIGZvcmVncm91bmQgPSBmb3JlZ3JvdW5kLnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaHR0cDovL2R1bW15aW1hZ2UuY29tL1wiICsgc2l6ZSArIChiYWNrZ3JvdW5kID8gXCIvXCIgKyBiYWNrZ3JvdW5kIDogXCJcIikgKyAoZm9yZWdyb3VuZCA/IFwiL1wiICsgZm9yZWdyb3VuZCA6IFwiXCIpICsgKGZvcm1hdCA/IFwiLlwiICsgZm9ybWF0IDogXCJcIikgKyAodGV4dCA/IFwiJnRleHQ9XCIgKyB0ZXh0IDogXCJcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGltZzogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbWFnZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGJyYW5kQ29sb3JzOiB7XHJcbiAgICAgICAgICAgICAgICBcIjRvcm1hdFwiOiBcIiNmYjBhMmFcIixcclxuICAgICAgICAgICAgICAgIFwiNTAwcHhcIjogXCIjMDJhZGVhXCIsXHJcbiAgICAgICAgICAgICAgICBcIkFib3V0Lm1lIChibHVlKVwiOiBcIiMwMDQwNWRcIixcclxuICAgICAgICAgICAgICAgIFwiQWJvdXQubWUgKHllbGxvdylcIjogXCIjZmZjYzMzXCIsXHJcbiAgICAgICAgICAgICAgICBBZGR2b2NhdGU6IFwiI2ZmNjEzOFwiLFxyXG4gICAgICAgICAgICAgICAgQWRvYmU6IFwiI2ZmMDAwMFwiLFxyXG4gICAgICAgICAgICAgICAgQWltOiBcIiNmY2QyMGJcIixcclxuICAgICAgICAgICAgICAgIEFtYXpvbjogXCIjZTQ3OTExXCIsXHJcbiAgICAgICAgICAgICAgICBBbmRyb2lkOiBcIiNhNGM2MzlcIixcclxuICAgICAgICAgICAgICAgIFwiQW5naWUncyBMaXN0XCI6IFwiIzdmYmIwMFwiLFxyXG4gICAgICAgICAgICAgICAgQU9MOiBcIiMwMDYwYTNcIixcclxuICAgICAgICAgICAgICAgIEF0bGFzc2lhbjogXCIjMDAzMzY2XCIsXHJcbiAgICAgICAgICAgICAgICBCZWhhbmNlOiBcIiMwNTNlZmZcIixcclxuICAgICAgICAgICAgICAgIFwiQmlnIENhcnRlbFwiOiBcIiM5N2I1MzhcIixcclxuICAgICAgICAgICAgICAgIGJpdGx5OiBcIiNlZTYxMjNcIixcclxuICAgICAgICAgICAgICAgIEJsb2dnZXI6IFwiI2ZjNGYwOFwiLFxyXG4gICAgICAgICAgICAgICAgQm9laW5nOiBcIiMwMDM5YTZcIixcclxuICAgICAgICAgICAgICAgIFwiQm9va2luZy5jb21cIjogXCIjMDAzNTgwXCIsXHJcbiAgICAgICAgICAgICAgICBDYXJib25tYWRlOiBcIiM2MTM4NTRcIixcclxuICAgICAgICAgICAgICAgIENoZWRkYXI6IFwiI2ZmNzI0M1wiLFxyXG4gICAgICAgICAgICAgICAgXCJDb2RlIFNjaG9vbFwiOiBcIiMzZDQ5NDRcIixcclxuICAgICAgICAgICAgICAgIERlbGljaW91czogXCIjMjA1Y2MwXCIsXHJcbiAgICAgICAgICAgICAgICBEZWxsOiBcIiMzMjg3YzFcIixcclxuICAgICAgICAgICAgICAgIERlc2lnbm1vbzogXCIjZTU0YTRmXCIsXHJcbiAgICAgICAgICAgICAgICBEZXZpYW50YXJ0OiBcIiM0ZTYyNTJcIixcclxuICAgICAgICAgICAgICAgIFwiRGVzaWduZXIgTmV3c1wiOiBcIiMyZDcyZGFcIixcclxuICAgICAgICAgICAgICAgIERldm91cjogXCIjZmQwMDAxXCIsXHJcbiAgICAgICAgICAgICAgICBERVdBTFQ6IFwiI2ZlYmQxN1wiLFxyXG4gICAgICAgICAgICAgICAgXCJEaXNxdXMgKGJsdWUpXCI6IFwiIzU5YTNmY1wiLFxyXG4gICAgICAgICAgICAgICAgXCJEaXNxdXMgKG9yYW5nZSlcIjogXCIjZGI3MTMyXCIsXHJcbiAgICAgICAgICAgICAgICBEcmliYmJsZTogXCIjZWE0Yzg5XCIsXHJcbiAgICAgICAgICAgICAgICBEcm9wYm94OiBcIiMzZDlhZThcIixcclxuICAgICAgICAgICAgICAgIERydXBhbDogXCIjMGM3NmFiXCIsXHJcbiAgICAgICAgICAgICAgICBEdW5rZWQ6IFwiIzJhMzIzYVwiLFxyXG4gICAgICAgICAgICAgICAgZUJheTogXCIjODljNTA3XCIsXHJcbiAgICAgICAgICAgICAgICBFbWJlcjogXCIjZjA1ZTFiXCIsXHJcbiAgICAgICAgICAgICAgICBFbmdhZGdldDogXCIjMDBiZGY2XCIsXHJcbiAgICAgICAgICAgICAgICBFbnZhdG86IFwiIzUyODAzNlwiLFxyXG4gICAgICAgICAgICAgICAgRXRzeTogXCIjZWI2ZDIwXCIsXHJcbiAgICAgICAgICAgICAgICBFdmVybm90ZTogXCIjNWJhNTI1XCIsXHJcbiAgICAgICAgICAgICAgICBcIkZhYi5jb21cIjogXCIjZGQwMDE3XCIsXHJcbiAgICAgICAgICAgICAgICBGYWNlYm9vazogXCIjM2I1OTk4XCIsXHJcbiAgICAgICAgICAgICAgICBGaXJlZm94OiBcIiNlNjYwMDBcIixcclxuICAgICAgICAgICAgICAgIFwiRmxpY2tyIChibHVlKVwiOiBcIiMwMDYzZGNcIixcclxuICAgICAgICAgICAgICAgIFwiRmxpY2tyIChwaW5rKVwiOiBcIiNmZjAwODRcIixcclxuICAgICAgICAgICAgICAgIEZvcnJzdDogXCIjNWI5YTY4XCIsXHJcbiAgICAgICAgICAgICAgICBGb3Vyc3F1YXJlOiBcIiMyNWEwY2FcIixcclxuICAgICAgICAgICAgICAgIEdhcm1pbjogXCIjMDA3Y2MzXCIsXHJcbiAgICAgICAgICAgICAgICBHZXRHbHVlOiBcIiMyZDc1YTJcIixcclxuICAgICAgICAgICAgICAgIEdpbW1lYmFyOiBcIiNmNzAwNzhcIixcclxuICAgICAgICAgICAgICAgIEdpdEh1YjogXCIjMTcxNTE1XCIsXHJcbiAgICAgICAgICAgICAgICBcIkdvb2dsZSBCbHVlXCI6IFwiIzAxNDBjYVwiLFxyXG4gICAgICAgICAgICAgICAgXCJHb29nbGUgR3JlZW5cIjogXCIjMTZhNjFlXCIsXHJcbiAgICAgICAgICAgICAgICBcIkdvb2dsZSBSZWRcIjogXCIjZGQxODEyXCIsXHJcbiAgICAgICAgICAgICAgICBcIkdvb2dsZSBZZWxsb3dcIjogXCIjZmNjYTAzXCIsXHJcbiAgICAgICAgICAgICAgICBcIkdvb2dsZStcIjogXCIjZGQ0YjM5XCIsXHJcbiAgICAgICAgICAgICAgICBHcm9vdmVzaGFyazogXCIjZjc3ZjAwXCIsXHJcbiAgICAgICAgICAgICAgICBHcm91cG9uOiBcIiM4MmI1NDhcIixcclxuICAgICAgICAgICAgICAgIFwiSGFja2VyIE5ld3NcIjogXCIjZmY2NjAwXCIsXHJcbiAgICAgICAgICAgICAgICBIZWxsb1dhbGxldDogXCIjMDA4NWNhXCIsXHJcbiAgICAgICAgICAgICAgICBcIkhlcm9rdSAobGlnaHQpXCI6IFwiI2M3YzVlNlwiLFxyXG4gICAgICAgICAgICAgICAgXCJIZXJva3UgKGRhcmspXCI6IFwiIzY1NjdhNVwiLFxyXG4gICAgICAgICAgICAgICAgSG9vdFN1aXRlOiBcIiMwMDMzNjZcIixcclxuICAgICAgICAgICAgICAgIEhvdXp6OiBcIiM3M2JhMzdcIixcclxuICAgICAgICAgICAgICAgIEhUTUw1OiBcIiNlYzYyMzFcIixcclxuICAgICAgICAgICAgICAgIElLRUE6IFwiI2ZmY2MzM1wiLFxyXG4gICAgICAgICAgICAgICAgSU1EYjogXCIjZjNjZTEzXCIsXHJcbiAgICAgICAgICAgICAgICBJbnN0YWdyYW06IFwiIzNmNzI5YlwiLFxyXG4gICAgICAgICAgICAgICAgSW50ZWw6IFwiIzAwNzFjNVwiLFxyXG4gICAgICAgICAgICAgICAgSW50dWl0OiBcIiMzNjVlYmZcIixcclxuICAgICAgICAgICAgICAgIEtpY2tzdGFydGVyOiBcIiM3NmNjMWVcIixcclxuICAgICAgICAgICAgICAgIGtpcHB0OiBcIiNlMDM1MDBcIixcclxuICAgICAgICAgICAgICAgIEtvZGVyeTogXCIjMDBhZjgxXCIsXHJcbiAgICAgICAgICAgICAgICBMYXN0Rk06IFwiI2MzMDAwZFwiLFxyXG4gICAgICAgICAgICAgICAgTGlua2VkSW46IFwiIzBlNzZhOFwiLFxyXG4gICAgICAgICAgICAgICAgTGl2ZXN0cmVhbTogXCIjY2YwMDA1XCIsXHJcbiAgICAgICAgICAgICAgICBMdW1vOiBcIiM1NzYzOTZcIixcclxuICAgICAgICAgICAgICAgIE1peHBhbmVsOiBcIiNhMDg2ZDNcIixcclxuICAgICAgICAgICAgICAgIE1lZXR1cDogXCIjZTUxOTM3XCIsXHJcbiAgICAgICAgICAgICAgICBOb2tpYTogXCIjMTgzNjkzXCIsXHJcbiAgICAgICAgICAgICAgICBOVklESUE6IFwiIzc2YjkwMFwiLFxyXG4gICAgICAgICAgICAgICAgT3BlcmE6IFwiI2NjMGYxNlwiLFxyXG4gICAgICAgICAgICAgICAgUGF0aDogXCIjZTQxZjExXCIsXHJcbiAgICAgICAgICAgICAgICBcIlBheVBhbCAoZGFyaylcIjogXCIjMWU0NzdhXCIsXHJcbiAgICAgICAgICAgICAgICBcIlBheVBhbCAobGlnaHQpXCI6IFwiIzNiN2JiZlwiLFxyXG4gICAgICAgICAgICAgICAgUGluYm9hcmQ6IFwiIzAwMDBlNlwiLFxyXG4gICAgICAgICAgICAgICAgUGludGVyZXN0OiBcIiNjODIzMmNcIixcclxuICAgICAgICAgICAgICAgIFBsYXlTdGF0aW9uOiBcIiM2NjVjYmVcIixcclxuICAgICAgICAgICAgICAgIFBvY2tldDogXCIjZWU0MDU2XCIsXHJcbiAgICAgICAgICAgICAgICBQcmV6aTogXCIjMzE4YmZmXCIsXHJcbiAgICAgICAgICAgICAgICBQdXNoYTogXCIjMGY3MWI0XCIsXHJcbiAgICAgICAgICAgICAgICBRdW9yYTogXCIjYTgyNDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIlFVT1RFLmZtXCI6IFwiIzY2Y2VmZlwiLFxyXG4gICAgICAgICAgICAgICAgUmRpbzogXCIjMDA4ZmQ1XCIsXHJcbiAgICAgICAgICAgICAgICBSZWFkYWJpbGl0eTogXCIjOWMwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIlJlZCBIYXRcIjogXCIjY2MwMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBSZXNvdXJjZTogXCIjN2ViNDAwXCIsXHJcbiAgICAgICAgICAgICAgICBSb2NrcGFjazogXCIjMGJhNmFiXCIsXHJcbiAgICAgICAgICAgICAgICBSb29uOiBcIiM2MmIwZDlcIixcclxuICAgICAgICAgICAgICAgIFJTUzogXCIjZWU4MDJmXCIsXHJcbiAgICAgICAgICAgICAgICBTYWxlc2ZvcmNlOiBcIiMxNzk4YzFcIixcclxuICAgICAgICAgICAgICAgIFNhbXN1bmc6IFwiIzBjNGRhMlwiLFxyXG4gICAgICAgICAgICAgICAgU2hvcGlmeTogXCIjOTZiZjQ4XCIsXHJcbiAgICAgICAgICAgICAgICBTa3lwZTogXCIjMDBhZmYwXCIsXHJcbiAgICAgICAgICAgICAgICBTbmFnYWpvYjogXCIjZjQ3YTIwXCIsXHJcbiAgICAgICAgICAgICAgICBTb2Z0b25pYzogXCIjMDA4YWNlXCIsXHJcbiAgICAgICAgICAgICAgICBTb3VuZENsb3VkOiBcIiNmZjc3MDBcIixcclxuICAgICAgICAgICAgICAgIFwiU3BhY2UgQm94XCI6IFwiI2Y4Njk2MFwiLFxyXG4gICAgICAgICAgICAgICAgU3BvdGlmeTogXCIjODFiNzFhXCIsXHJcbiAgICAgICAgICAgICAgICBTcHJpbnQ6IFwiI2ZlZTEwMFwiLFxyXG4gICAgICAgICAgICAgICAgU3F1YXJlc3BhY2U6IFwiIzEyMTIxMlwiLFxyXG4gICAgICAgICAgICAgICAgU3RhY2tPdmVyZmxvdzogXCIjZWY4MjM2XCIsXHJcbiAgICAgICAgICAgICAgICBTdGFwbGVzOiBcIiNjYzAwMDBcIixcclxuICAgICAgICAgICAgICAgIFwiU3RhdHVzIENoYXJ0XCI6IFwiI2Q3NTg0ZlwiLFxyXG4gICAgICAgICAgICAgICAgU3RyaXBlOiBcIiMwMDhjZGRcIixcclxuICAgICAgICAgICAgICAgIFN0dWR5Qmx1ZTogXCIjMDBhZmUxXCIsXHJcbiAgICAgICAgICAgICAgICBTdHVtYmxlVXBvbjogXCIjZjc0NDI1XCIsXHJcbiAgICAgICAgICAgICAgICBcIlQtTW9iaWxlXCI6IFwiI2VhMGE4ZVwiLFxyXG4gICAgICAgICAgICAgICAgVGVjaG5vcmF0aTogXCIjNDBhODAwXCIsXHJcbiAgICAgICAgICAgICAgICBcIlRoZSBOZXh0IFdlYlwiOiBcIiNlZjQ0MjNcIixcclxuICAgICAgICAgICAgICAgIFRyZWVob3VzZTogXCIjNWNiODY4XCIsXHJcbiAgICAgICAgICAgICAgICBUcnVsaWE6IFwiIzVlYWIxZlwiLFxyXG4gICAgICAgICAgICAgICAgVHVtYmxyOiBcIiMzNDUyNmZcIixcclxuICAgICAgICAgICAgICAgIFwiVHdpdGNoLnR2XCI6IFwiIzY0NDFhNVwiLFxyXG4gICAgICAgICAgICAgICAgVHdpdHRlcjogXCIjMDBhY2VlXCIsXHJcbiAgICAgICAgICAgICAgICBUWVBPMzogXCIjZmY4NzAwXCIsXHJcbiAgICAgICAgICAgICAgICBVYnVudHU6IFwiI2RkNDgxNFwiLFxyXG4gICAgICAgICAgICAgICAgVXN0cmVhbTogXCIjMzM4OGZmXCIsXHJcbiAgICAgICAgICAgICAgICBWZXJpem9uOiBcIiNlZjFkMWRcIixcclxuICAgICAgICAgICAgICAgIFZpbWVvOiBcIiM4NmM5ZWZcIixcclxuICAgICAgICAgICAgICAgIFZpbmU6IFwiIzAwYTQ3OFwiLFxyXG4gICAgICAgICAgICAgICAgVmlyYjogXCIjMDZhZmQ4XCIsXHJcbiAgICAgICAgICAgICAgICBcIlZpcmdpbiBNZWRpYVwiOiBcIiNjYzAwMDBcIixcclxuICAgICAgICAgICAgICAgIFdvb2dhOiBcIiM1YjAwOWNcIixcclxuICAgICAgICAgICAgICAgIFwiV29yZFByZXNzIChibHVlKVwiOiBcIiMyMTc1OWJcIixcclxuICAgICAgICAgICAgICAgIFwiV29yZFByZXNzIChvcmFuZ2UpXCI6IFwiI2Q1NGUyMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJXb3JkUHJlc3MgKGdyZXkpXCI6IFwiIzQ2NDY0NlwiLFxyXG4gICAgICAgICAgICAgICAgV3VuZGVybGlzdDogXCIjMmI4OGQ5XCIsXHJcbiAgICAgICAgICAgICAgICBYQk9YOiBcIiM5YmM4NDhcIixcclxuICAgICAgICAgICAgICAgIFhJTkc6IFwiIzEyNjU2N1wiLFxyXG4gICAgICAgICAgICAgICAgXCJZYWhvbyFcIjogXCIjNzIwZTllXCIsXHJcbiAgICAgICAgICAgICAgICBZYW5kZXg6IFwiI2ZmY2MwMFwiLFxyXG4gICAgICAgICAgICAgICAgWWVscDogXCIjYzQxMjAwXCIsXHJcbiAgICAgICAgICAgICAgICBZb3VUdWJlOiBcIiNjNDMwMmJcIixcclxuICAgICAgICAgICAgICAgIFphbG9uZ286IFwiIzU0OThkY1wiLFxyXG4gICAgICAgICAgICAgICAgWmVuZGVzazogXCIjNzhhMzAwXCIsXHJcbiAgICAgICAgICAgICAgICBaZXJwbHk6IFwiIzlkY2M3YVwiLFxyXG4gICAgICAgICAgICAgICAgWm9vdG9vbDogXCIjNWU4YjFkXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYnJhbmRzOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBicmFuZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGIgaW4gdGhpcy5icmFuZENvbG9ycykge1xyXG4gICAgICAgICAgICAgICAgICAgIGJyYW5kcy5wdXNoKGIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyYW5kcztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGF0YUltYWdlOiBmdW5jdGlvbihzaXplLCB0ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2FudmFzID0gdHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksIGN0eCA9IGNhbnZhcyAmJiBjYW52YXMuZ2V0Q29udGV4dCAmJiBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjYW52YXMgfHwgIWN0eCkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNpemUpIHNpemUgPSB0aGlzLnBpY2sodGhpcy5hZF9zaXplKTtcclxuICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0ICE9PSB1bmRlZmluZWQgPyB0ZXh0IDogc2l6ZTtcclxuICAgICAgICAgICAgICAgIHNpemUgPSBzaXplLnNwbGl0KFwieFwiKTtcclxuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IHBhcnNlSW50KHNpemVbMF0sIDEwKSwgaGVpZ2h0ID0gcGFyc2VJbnQoc2l6ZVsxXSwgMTApLCBiYWNrZ3JvdW5kID0gdGhpcy5icmFuZENvbG9yc1t0aGlzLnBpY2sodGhpcy5icmFuZHMoKSldLCBmb3JlZ3JvdW5kID0gXCIjRkZGXCIsIHRleHRfaGVpZ2h0ID0gMTQsIGZvbnQgPSBcInNhbnMtc2VyaWZcIjtcclxuICAgICAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICAgICAgICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCI7XHJcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gYmFja2dyb3VuZDtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBmb3JlZ3JvdW5kO1xyXG4gICAgICAgICAgICAgICAgY3R4LmZvbnQgPSBcImJvbGQgXCIgKyB0ZXh0X2hlaWdodCArIFwicHggXCIgKyBmb250O1xyXG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIHdpZHRoIC8gMiwgaGVpZ2h0IC8gMiwgd2lkdGgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBSYW5kb20uZXh0ZW5kKHtcclxuICAgICAgICAgICAgY29sb3I6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNvbG91ciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxNiAqIDE2ICogMTYgKiAxNiAqIDE2ICogMTYgLSAxKSkudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgICAgICAgICAgY29sb3VyID0gXCIjXCIgKyAoXCIwMDAwMDBcIiArIGNvbG91cikuc2xpY2UoLTYpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbG91cjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBjYXBpdGFsaXplOiBmdW5jdGlvbih3b3JkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHdvcmQgKyBcIlwiKS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArICh3b3JkICsgXCJcIikuc3Vic3RyKDEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB1cHBlcjogZnVuY3Rpb24oc3RyKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHN0ciArIFwiXCIpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGxvd2VyOiBmdW5jdGlvbihzdHIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoc3RyICsgXCJcIikudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGljazogZnVuY3Rpb24oYXJyKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBhcnIgfHwgW107XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYXJyW3RoaXMubmF0dXJhbCgwLCBhcnIubGVuZ3RoIC0gMSldO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzaHVmZmxlOiBmdW5jdGlvbihhcnIpIHtcclxuICAgICAgICAgICAgICAgIGFyciA9IGFyciB8fCBbXTtcclxuICAgICAgICAgICAgICAgIHZhciBvbGQgPSBhcnIuc2xpY2UoMCksIHJlc3VsdCA9IFtdLCBpbmRleCA9IDAsIGxlbmd0aCA9IG9sZC5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLm5hdHVyYWwoMCwgb2xkLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG9sZFtpbmRleF0pO1xyXG4gICAgICAgICAgICAgICAgICAgIG9sZC5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBwYXJhZ3JhcGg6IGZ1bmN0aW9uKG1pbiwgbWF4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbGVuO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIGxlbiA9IFJhbmRvbS5uYXR1cmFsKDMsIDcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIGxlbiA9IG1heCA9IG1pbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcGFyc2VJbnQobWluLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VJbnQobWF4LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gUmFuZG9tLm5hdHVyYWwobWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKFJhbmRvbS5zZW50ZW5jZSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBhcnIuam9pbihcIiBcIik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNlbnRlbmNlOiBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSBsZW4gPSBSYW5kb20ubmF0dXJhbCgxMiwgMTgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIGxlbiA9IG1heCA9IG1pbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcGFyc2VJbnQobWluLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VJbnQobWF4LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gUmFuZG9tLm5hdHVyYWwobWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIGFyciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKFJhbmRvbS53b3JkKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5jYXBpdGFsaXplKGFyci5qb2luKFwiIFwiKSkgKyBcIi5cIjtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgd29yZDogZnVuY3Rpb24obWluLCBtYXgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsZW47XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgbGVuID0gUmFuZG9tLm5hdHVyYWwoMywgMTApO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIGxlbiA9IG1heCA9IG1pbjtcclxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluID0gcGFyc2VJbnQobWluLCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VJbnQobWF4LCAxMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuID0gUmFuZG9tLm5hdHVyYWwobWluLCBtYXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IFJhbmRvbS5jaGFyYWN0ZXIoXCJsb3dlclwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRpdGxlOiBmdW5jdGlvbihtaW4sIG1heCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbiwgcmVzdWx0ID0gW107XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgbGVuID0gUmFuZG9tLm5hdHVyYWwoMywgNyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkgbGVuID0gbWF4ID0gbWluO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBtaW4gPSBwYXJzZUludChtaW4sIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUludChtYXgsIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSBSYW5kb20ubmF0dXJhbChtaW4sIG1heCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oXCIgXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgUmFuZG9tLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGZpcnN0OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBuYW1lcyA9IFsgXCJKYW1lc1wiLCBcIkpvaG5cIiwgXCJSb2JlcnRcIiwgXCJNaWNoYWVsXCIsIFwiV2lsbGlhbVwiLCBcIkRhdmlkXCIsIFwiUmljaGFyZFwiLCBcIkNoYXJsZXNcIiwgXCJKb3NlcGhcIiwgXCJUaG9tYXNcIiwgXCJDaHJpc3RvcGhlclwiLCBcIkRhbmllbFwiLCBcIlBhdWxcIiwgXCJNYXJrXCIsIFwiRG9uYWxkXCIsIFwiR2VvcmdlXCIsIFwiS2VubmV0aFwiLCBcIlN0ZXZlblwiLCBcIkVkd2FyZFwiLCBcIkJyaWFuXCIsIFwiUm9uYWxkXCIsIFwiQW50aG9ueVwiLCBcIktldmluXCIsIFwiSmFzb25cIiwgXCJNYXR0aGV3XCIsIFwiR2FyeVwiLCBcIlRpbW90aHlcIiwgXCJKb3NlXCIsIFwiTGFycnlcIiwgXCJKZWZmcmV5XCIsIFwiRnJhbmtcIiwgXCJTY290dFwiLCBcIkVyaWNcIiBdLmNvbmNhdChbIFwiTWFyeVwiLCBcIlBhdHJpY2lhXCIsIFwiTGluZGFcIiwgXCJCYXJiYXJhXCIsIFwiRWxpemFiZXRoXCIsIFwiSmVubmlmZXJcIiwgXCJNYXJpYVwiLCBcIlN1c2FuXCIsIFwiTWFyZ2FyZXRcIiwgXCJEb3JvdGh5XCIsIFwiTGlzYVwiLCBcIk5hbmN5XCIsIFwiS2FyZW5cIiwgXCJCZXR0eVwiLCBcIkhlbGVuXCIsIFwiU2FuZHJhXCIsIFwiRG9ubmFcIiwgXCJDYXJvbFwiLCBcIlJ1dGhcIiwgXCJTaGFyb25cIiwgXCJNaWNoZWxsZVwiLCBcIkxhdXJhXCIsIFwiU2FyYWhcIiwgXCJLaW1iZXJseVwiLCBcIkRlYm9yYWhcIiwgXCJKZXNzaWNhXCIsIFwiU2hpcmxleVwiLCBcIkN5bnRoaWFcIiwgXCJBbmdlbGFcIiwgXCJNZWxpc3NhXCIsIFwiQnJlbmRhXCIsIFwiQW15XCIsIFwiQW5uYVwiIF0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGljayhuYW1lcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYXBpdGFsaXplKHRoaXMud29yZCgpKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgbGFzdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmFtZXMgPSBbIFwiU21pdGhcIiwgXCJKb2huc29uXCIsIFwiV2lsbGlhbXNcIiwgXCJCcm93blwiLCBcIkpvbmVzXCIsIFwiTWlsbGVyXCIsIFwiRGF2aXNcIiwgXCJHYXJjaWFcIiwgXCJSb2RyaWd1ZXpcIiwgXCJXaWxzb25cIiwgXCJNYXJ0aW5lelwiLCBcIkFuZGVyc29uXCIsIFwiVGF5bG9yXCIsIFwiVGhvbWFzXCIsIFwiSGVybmFuZGV6XCIsIFwiTW9vcmVcIiwgXCJNYXJ0aW5cIiwgXCJKYWNrc29uXCIsIFwiVGhvbXBzb25cIiwgXCJXaGl0ZVwiLCBcIkxvcGV6XCIsIFwiTGVlXCIsIFwiR29uemFsZXpcIiwgXCJIYXJyaXNcIiwgXCJDbGFya1wiLCBcIkxld2lzXCIsIFwiUm9iaW5zb25cIiwgXCJXYWxrZXJcIiwgXCJQZXJlelwiLCBcIkhhbGxcIiwgXCJZb3VuZ1wiLCBcIkFsbGVuXCIgXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2sobmFtZXMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FwaXRhbGl6ZSh0aGlzLndvcmQoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG5hbWU6IGZ1bmN0aW9uKG1pZGRsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmlyc3QoKSArIFwiIFwiICsgKG1pZGRsZSA/IHRoaXMuZmlyc3QoKSArIFwiIFwiIDogXCJcIikgKyB0aGlzLmxhc3QoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICB1cmw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiaHR0cDovL1wiICsgdGhpcy5kb21haW4oKSArIFwiL1wiICsgdGhpcy53b3JkKCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRvbWFpbjogZnVuY3Rpb24odGxkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53b3JkKCkgKyBcIi5cIiArICh0bGQgfHwgdGhpcy50bGQoKSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVtYWlsOiBmdW5jdGlvbihkb21haW4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlcihcImxvd2VyXCIpICsgXCIuXCIgKyB0aGlzLmxhc3QoKS50b0xvd2VyQ2FzZSgpICsgXCJAXCIgKyB0aGlzLmxhc3QoKS50b0xvd2VyQ2FzZSgpICsgXCIuXCIgKyB0aGlzLnRsZCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud29yZCgpICsgXCJAXCIgKyAoZG9tYWluIHx8IHRoaXMuZG9tYWluKCkpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBpcDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDAsIDI1NSkgKyBcIi5cIiArIHRoaXMubmF0dXJhbCgwLCAyNTUpICsgXCIuXCIgKyB0aGlzLm5hdHVyYWwoMCwgMjU1KSArIFwiLlwiICsgdGhpcy5uYXR1cmFsKDAsIDI1NSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHRsZHM6IFsgXCJjb21cIiwgXCJvcmdcIiwgXCJlZHVcIiwgXCJnb3ZcIiwgXCJjby51a1wiLCBcIm5ldFwiLCBcImlvXCIgXSxcclxuICAgICAgICAgICAgdGxkOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2sodGhpcy50bGRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBhcmVhczogWyBcIuS4nOWMl1wiLCBcIuWNjuWMl1wiLCBcIuWNjuS4nFwiLCBcIuWNjuS4rVwiLCBcIuWNjuWNl1wiLCBcIuilv+WNl1wiLCBcIuilv+WMl1wiIF0sXHJcbiAgICAgICAgICAgIGFyZWE6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGljayh0aGlzLmFyZWFzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVnaW9uczogWyBcIjExMDAwMCDljJfkuqzluIJcIiwgXCIxMjAwMDAg5aSp5rSl5biCXCIsIFwiMTMwMDAwIOays+WMl+ecgVwiLCBcIjE0MDAwMCDlsbHopb/nnIFcIiwgXCIxNTAwMDAg5YaF6JKZ5Y+k6Ieq5rK75Yy6XCIsIFwiMjEwMDAwIOi+veWugeecgVwiLCBcIjIyMDAwMCDlkInmnpfnnIFcIiwgXCIyMzAwMDAg6buR6b6Z5rGf55yBXCIsIFwiMzEwMDAwIOS4iua1t+W4glwiLCBcIjMyMDAwMCDmsZ/oi4/nnIFcIiwgXCIzMzAwMDAg5rWZ5rGf55yBXCIsIFwiMzQwMDAwIOWuieW+veecgVwiLCBcIjM1MDAwMCDnpo/lu7rnnIFcIiwgXCIzNjAwMDAg5rGf6KW/55yBXCIsIFwiMzcwMDAwIOWxseS4nOecgVwiLCBcIjQxMDAwMCDmsrPljZfnnIFcIiwgXCI0MjAwMDAg5rmW5YyX55yBXCIsIFwiNDMwMDAwIOa5luWNl+ecgVwiLCBcIjQ0MDAwMCDlub/kuJznnIFcIiwgXCI0NTAwMDAg5bm/6KW/5aOu5peP6Ieq5rK75Yy6XCIsIFwiNDYwMDAwIOa1t+WNl+ecgVwiLCBcIjUwMDAwMCDph43luobluIJcIiwgXCI1MTAwMDAg5Zub5bed55yBXCIsIFwiNTIwMDAwIOi0teW3nuecgVwiLCBcIjUzMDAwMCDkupHljZfnnIFcIiwgXCI1NDAwMDAg6KW/6JeP6Ieq5rK75Yy6XCIsIFwiNjEwMDAwIOmZleilv+ecgVwiLCBcIjYyMDAwMCDnlJjogoPnnIFcIiwgXCI2MzAwMDAg6Z2S5rW355yBXCIsIFwiNjQwMDAwIOWugeWkj+WbnuaXj+iHquayu+WMulwiLCBcIjY1MDAwMCDmlrDnlobnu7TlkL7lsJToh6rmsrvljLpcIiwgXCI2NTAwMDAg5paw55aG57u05ZC+5bCU6Ieq5rK75Yy6XCIsIFwiNzEwMDAwIOWPsOa5vuecgVwiLCBcIjgxMDAwMCDpppnmuK/nibnliKvooYzmlL/ljLpcIiwgXCI4MjAwMDAg5r6z6Zeo54m55Yir6KGM5pS/5Yy6XCIgXSxcclxuICAgICAgICAgICAgcmVnaW9uOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBpY2sodGhpcy5yZWdpb25zKS5zcGxpdChcIiBcIilbMV07XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGFkZHJlc3M6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIGNpdHk6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHBob25lOiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBhcmVhY29kZTogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgc3RyZWV0OiBmdW5jdGlvbigpIHt9LFxyXG4gICAgICAgICAgICBzdHJlZXRfc3VmZml4ZXM6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHN0cmVldF9zdWZmaXg6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHN0YXRlczogZnVuY3Rpb24oKSB7fSxcclxuICAgICAgICAgICAgc3RhdGU6IGZ1bmN0aW9uKCkge30sXHJcbiAgICAgICAgICAgIHppcDogZnVuY3Rpb24obGVuKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgemlwID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgKGxlbiB8fCA2KTsgaSsrKSB6aXAgKz0gdGhpcy5uYXR1cmFsKDAsIDkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHppcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICB0b2RvOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInRvZG9cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFJhbmRvbS5leHRlbmQoe1xyXG4gICAgICAgICAgICBkNDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDQpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkNjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDYpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkODogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDgpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkMTI6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubmF0dXJhbCgxLCAxMik7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGQyMDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDIwKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZDEwMDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5uYXR1cmFsKDEsIDEwMCk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGd1aWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBvb2wgPSBcIkFCQ0RFRjEyMzQ1Njc4OTBcIiwgZ3VpZCA9IHRoaXMuc3RyaW5nKHBvb2wsIDgpICsgXCItXCIgKyB0aGlzLnN0cmluZyhwb29sLCA0KSArIFwiLVwiICsgdGhpcy5zdHJpbmcocG9vbCwgNCkgKyBcIi1cIiArIHRoaXMuc3RyaW5nKHBvb2wsIDQpICsgXCItXCIgKyB0aGlzLnN0cmluZyhwb29sLCAxMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZ3VpZDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgaWQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlkLCBzdW0gPSAwLCByYW5rID0gWyBcIjdcIiwgXCI5XCIsIFwiMTBcIiwgXCI1XCIsIFwiOFwiLCBcIjRcIiwgXCIyXCIsIFwiMVwiLCBcIjZcIiwgXCIzXCIsIFwiN1wiLCBcIjlcIiwgXCIxMFwiLCBcIjVcIiwgXCI4XCIsIFwiNFwiLCBcIjJcIiBdLCBsYXN0ID0gWyBcIjFcIiwgXCIwXCIsIFwiWFwiLCBcIjlcIiwgXCI4XCIsIFwiN1wiLCBcIjZcIiwgXCI1XCIsIFwiNFwiLCBcIjNcIiwgXCIyXCIgXTtcclxuICAgICAgICAgICAgICAgIGlkID0gdGhpcy5waWNrKHRoaXMucmVnaW9ucykuc3BsaXQoXCIgXCIpWzBdICsgdGhpcy5kYXRlKFwieXl5eU1NZGRcIikgKyB0aGlzLnN0cmluZyhcIm51bWJlclwiLCAzKTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaWQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gaWRbaV0gKiByYW5rW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWQgKz0gbGFzdFtzdW0gJSAxMV07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGF1dG9JbmNyZW1lbnRJbnRlZ2VyOiAwLFxyXG4gICAgICAgICAgICBpbmNyZW1lbnQ6IGZ1bmN0aW9uKHN0ZXApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmF1dG9JbmNyZW1lbnRJbnRlZ2VyICs9ICtzdGVwIHx8IDE7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGluYzogZnVuY3Rpb24oc3RlcCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5jcmVtZW50KHN0ZXApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIFJhbmRvbTtcclxuICAgIH0oKTtcclxuICAgIC8qISBzcmMvbW9jay5qcyAqL1xyXG4gICAgdmFyIHJrZXkgPSAvKC4rKVxcfCg/OlxcKyhcXGQrKXwoW1xcK1xcLV0/XFxkKy0/W1xcK1xcLV0/XFxkKik/KD86XFwuKFxcZCstP1xcZCopKT8pLywgcnJhbmdlID0gLyhbXFwrXFwtXT9cXGQrKS0/KFtcXCtcXC1dP1xcZCspPy8sIHJwbGFjZWhvbGRlciA9IC9cXFxcKkAoW15AIyUmKClcXD9cXHNcXC9cXC5dKykoPzpcXCgoLio/KVxcKSk/L2c7XHJcbiAgICBNb2NrLmV4dGVuZCA9IFV0aWwuZXh0ZW5kO1xyXG4gICAgTW9jay5tb2NrID0gZnVuY3Rpb24ocnVybCwgcnR5cGUsIHRlbXBsYXRlKSB7XHJcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEhhbmRsZS5nZW4ocnVybCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XHJcbiAgICAgICAgICAgIHRlbXBsYXRlID0gcnR5cGU7XHJcbiAgICAgICAgICAgIHJ0eXBlID0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBNb2NrLl9tb2NrZWRbcnVybCArIChydHlwZSB8fCBcIlwiKV0gPSB7XHJcbiAgICAgICAgICAgIHJ1cmw6IHJ1cmwsXHJcbiAgICAgICAgICAgIHJ0eXBlOiBydHlwZSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHRlbXBsYXRlXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gTW9jaztcclxuICAgIH07XHJcbiAgICB2YXIgSGFuZGxlID0ge1xyXG4gICAgICAgIGV4dGVuZDogVXRpbC5leHRlbmRcclxuICAgIH07XHJcbiAgICBIYW5kbGUucnVsZSA9IGZ1bmN0aW9uKG5hbWUpIHtcclxuICAgICAgICBuYW1lID0gKG5hbWUgfHwgXCJcIikgKyBcIlwiO1xyXG4gICAgICAgIHZhciBwYXJhbWV0ZXJzID0gKG5hbWUgfHwgXCJcIikubWF0Y2gocmtleSksIHJhbmdlID0gcGFyYW1ldGVycyAmJiBwYXJhbWV0ZXJzWzNdICYmIHBhcmFtZXRlcnNbM10ubWF0Y2gocnJhbmdlKSwgbWluID0gcmFuZ2UgJiYgcGFyc2VJbnQocmFuZ2VbMV0sIDEwKSwgbWF4ID0gcmFuZ2UgJiYgcGFyc2VJbnQocmFuZ2VbMl0sIDEwKSwgY291bnQgPSByYW5nZSA/ICFyYW5nZVsyXSAmJiBwYXJzZUludChyYW5nZVsxXSwgMTApIHx8IFJhbmRvbS5pbnRlZ2VyKG1pbiwgbWF4KSA6IDEsIGRlY2ltYWwgPSBwYXJhbWV0ZXJzICYmIHBhcmFtZXRlcnNbNF0gJiYgcGFyYW1ldGVyc1s0XS5tYXRjaChycmFuZ2UpLCBkbWluID0gZGVjaW1hbCAmJiBwYXJzZUludChkZWNpbWFsWzFdLCAxMCksIGRtYXggPSBkZWNpbWFsICYmIHBhcnNlSW50KGRlY2ltYWxbMl0sIDEwKSwgZGNvdW50ID0gZGVjaW1hbCA/ICFkZWNpbWFsWzJdICYmIHBhcnNlSW50KGRlY2ltYWxbMV0sIDEwKSB8fCBSYW5kb20uaW50ZWdlcihkbWluLCBkbWF4KSA6IDAsIHBvaW50ID0gcGFyYW1ldGVycyAmJiBwYXJhbWV0ZXJzWzRdO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcclxuICAgICAgICAgICAgbWluOiBtaW4sXHJcbiAgICAgICAgICAgIG1heDogbWF4LFxyXG4gICAgICAgICAgICBjb3VudDogY291bnQsXHJcbiAgICAgICAgICAgIGRlY2ltYWw6IGRlY2ltYWwsXHJcbiAgICAgICAgICAgIGRtaW46IGRtaW4sXHJcbiAgICAgICAgICAgIGRtYXg6IGRtYXgsXHJcbiAgICAgICAgICAgIGRjb3VudDogZGNvdW50LFxyXG4gICAgICAgICAgICBwb2ludDogcG9pbnRcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuICAgIEhhbmRsZS5nZW4gPSBmdW5jdGlvbih0ZW1wbGF0ZSwgbmFtZSwgY29udGV4dCkge1xyXG4gICAgICAgIG5hbWUgPSBuYW1lID0gKG5hbWUgfHwgXCJcIikgKyBcIlwiO1xyXG4gICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IHt9O1xyXG4gICAgICAgIGNvbnRleHQgPSB7XHJcbiAgICAgICAgICAgIHBhdGg6IGNvbnRleHQucGF0aCB8fCBbXSxcclxuICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBjb250ZXh0LnRlbXBsYXRlUGF0aCB8fCBbXSxcclxuICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IGNvbnRleHQuY3VycmVudENvbnRleHQsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IGNvbnRleHQudGVtcGxhdGVDdXJyZW50Q29udGV4dCB8fCB0ZW1wbGF0ZSxcclxuICAgICAgICAgICAgcm9vdDogY29udGV4dC5yb290LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IGNvbnRleHQudGVtcGxhdGVSb290XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgcnVsZSA9IEhhbmRsZS5ydWxlKG5hbWUpO1xyXG4gICAgICAgIHZhciB0eXBlID0gVXRpbC50eXBlKHRlbXBsYXRlKTtcclxuICAgICAgICBpZiAoSGFuZGxlW3R5cGVdKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBIYW5kbGVbdHlwZV0oe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICBwYXJzZWROYW1lOiBuYW1lID8gbmFtZS5yZXBsYWNlKHJrZXksIFwiJDFcIikgOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgcnVsZTogcnVsZSxcclxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGNvbnRleHRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICAgIH07XHJcbiAgICBIYW5kbGUuZXh0ZW5kKHtcclxuICAgICAgICBhcnJheTogZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sIGksIGo7XHJcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLnRlbXBsYXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChIYW5kbGUuZ2VuKG9wdGlvbnMudGVtcGxhdGVbaV0sIGksIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGhcclxuICAgICAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5ydWxlLmNvdW50ID09PSAxICYmIG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2gob3B0aW9ucy5uYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBSYW5kb20ucGljayhIYW5kbGUuZ2VuKG9wdGlvbnMudGVtcGxhdGUsIHVuZGVmaW5lZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBvcHRpb25zLnRlbXBsYXRlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoOiBvcHRpb25zLmNvbnRleHQucGF0aFxyXG4gICAgICAgICAgICAgICAgICAgIH0pKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMucnVsZS5jb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChIYW5kbGUuZ2VuKG9wdGlvbnMudGVtcGxhdGVbaisrXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChqIDwgb3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb2JqZWN0OiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB7fSwga2V5cywgZm5LZXlzLCBrZXksIHBhcnNlZEtleSwgaW5jLCBpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ydWxlLm1pbikge1xyXG4gICAgICAgICAgICAgICAga2V5cyA9IFV0aWwua2V5cyhvcHRpb25zLnRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgIGtleXMgPSBSYW5kb20uc2h1ZmZsZShrZXlzKTtcclxuICAgICAgICAgICAgICAgIGtleXMgPSBrZXlzLnNsaWNlKDAsIG9wdGlvbnMucnVsZS5jb3VudCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkS2V5ID0ga2V5LnJlcGxhY2UocmtleSwgXCIkMVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKHBhcnNlZEtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3BhcnNlZEtleV0gPSBIYW5kbGUuZ2VuKG9wdGlvbnMudGVtcGxhdGVba2V5XSwga2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBrZXlzID0gW107XHJcbiAgICAgICAgICAgICAgICBmbktleXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAoa2V5IGluIG9wdGlvbnMudGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIG9wdGlvbnMudGVtcGxhdGVba2V5XSA9PT0gXCJmdW5jdGlvblwiID8gZm5LZXlzIDoga2V5cykucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAga2V5cyA9IGtleXMuY29uY2F0KGZuS2V5cyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkS2V5ID0ga2V5LnJlcGxhY2UocmtleSwgXCIkMVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKHBhcnNlZEtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3BhcnNlZEtleV0gPSBIYW5kbGUuZ2VuKG9wdGlvbnMudGVtcGxhdGVba2V5XSwga2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5jID0ga2V5Lm1hdGNoKHJrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmMgJiYgaW5jWzJdICYmIFV0aWwudHlwZShvcHRpb25zLnRlbXBsYXRlW2tleV0pID09PSBcIm51bWJlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGVba2V5XSArPSBwYXJzZUludChpbmNbMl0sIDEwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIG51bWJlcjogZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0LCBwYXJ0cywgaTtcclxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5wb2ludCkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZSArPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgcGFydHMgPSBvcHRpb25zLnRlbXBsYXRlLnNwbGl0KFwiLlwiKTtcclxuICAgICAgICAgICAgICAgIHBhcnRzWzBdID0gb3B0aW9ucy5ydWxlLnJhbmdlID8gb3B0aW9ucy5ydWxlLmNvdW50IDogcGFydHNbMF07XHJcbiAgICAgICAgICAgICAgICBwYXJ0c1sxXSA9IChwYXJ0c1sxXSB8fCBcIlwiKS5zbGljZSgwLCBvcHRpb25zLnJ1bGUuZGNvdW50KTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IHBhcnRzWzFdLmxlbmd0aCA8IG9wdGlvbnMucnVsZS5kY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzWzFdICs9IFJhbmRvbS5jaGFyYWN0ZXIoXCJudW1iZXJcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBwYXJzZUZsb2F0KHBhcnRzLmpvaW4oXCIuXCIpLCAxMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvcHRpb25zLnJ1bGUucmFuZ2UgJiYgIW9wdGlvbnMucnVsZS5wYXJhbWV0ZXJzWzJdID8gb3B0aW9ucy5ydWxlLmNvdW50IDogb3B0aW9ucy50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJib29sZWFuXCI6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdDtcclxuICAgICAgICAgICAgcmVzdWx0ID0gb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnMgPyBSYW5kb20uYm9vbChvcHRpb25zLnJ1bGUubWluLCBvcHRpb25zLnJ1bGUubWF4LCBvcHRpb25zLnRlbXBsYXRlKSA6IG9wdGlvbnMudGVtcGxhdGU7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHJpbmc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFwiXCIsIGksIHBsYWNlaG9sZGVycywgcGgsIHBoZWQ7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnRlbXBsYXRlLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMucnVsZS5jb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IG9wdGlvbnMudGVtcGxhdGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcnMgPSByZXN1bHQubWF0Y2gocnBsYWNlaG9sZGVyKSB8fCBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwbGFjZWhvbGRlcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBwaCA9IHBsYWNlaG9sZGVyc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoL15cXFxcLy50ZXN0KHBoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcnMuc3BsaWNlKGktLSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBwaGVkID0gSGFuZGxlLnBsYWNlaG9sZGVyKHBoLCBvcHRpb25zLmNvbnRleHQuY3VycmVudENvbnRleHQsIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZUN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGxhY2Vob2xkZXJzLmxlbmd0aCA9PT0gMSAmJiBwaCA9PT0gcmVzdWx0ICYmIHR5cGVvZiBwaGVkICE9PSB0eXBlb2YgcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBoZWQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc051bWVyaWMocGhlZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHBhcnNlRmxvYXQocGhlZCwgMTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9eKHRydWV8ZmFsc2UpJC8udGVzdChwaGVkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcGhlZCA9PT0gXCJ0cnVlXCIgPyB0cnVlIDogcGhlZCA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiBwaGVkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnJlcGxhY2UocGgsIHBoZWQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb3B0aW9ucy5ydWxlLnJhbmdlID8gUmFuZG9tLnN0cmluZyhvcHRpb25zLnJ1bGUuY291bnQpIDogb3B0aW9ucy50ZW1wbGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJmdW5jdGlvblwiOiBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLnRlbXBsYXRlLmNhbGwob3B0aW9ucy5jb250ZXh0LmN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIEhhbmRsZS5leHRlbmQoe1xyXG4gICAgICAgIF9hbGw6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgcmUgPSB7fTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIFJhbmRvbSkgcmVba2V5LnRvTG93ZXJDYXNlKCldID0ga2V5O1xyXG4gICAgICAgICAgICByZXR1cm4gcmU7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBwbGFjZWhvbGRlcjogZnVuY3Rpb24ocGxhY2Vob2xkZXIsIG9iaiwgdGVtcGxhdGVDb250ZXh0KSB7XHJcbiAgICAgICAgICAgIHJwbGFjZWhvbGRlci5leGVjKFwiXCIpO1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBycGxhY2Vob2xkZXIuZXhlYyhwbGFjZWhvbGRlciksIGtleSA9IHBhcnRzICYmIHBhcnRzWzFdLCBsa2V5ID0ga2V5ICYmIGtleS50b0xvd2VyQ2FzZSgpLCBva2V5ID0gdGhpcy5fYWxsKClbbGtleV0sIHBhcmFtcyA9IHBhcnRzICYmIHBhcnRzWzJdIHx8IFwiXCI7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSBldmFsKFwiKGZ1bmN0aW9uKCl7IHJldHVybiBbXS5zcGxpY2UuY2FsbChhcmd1bWVudHMsIDAgKSB9KShcIiArIHBhcmFtcyArIFwiKVwiKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHBhcnRzWzJdLnNwbGl0KC8sXFxzKi8pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChvYmogJiYga2V5IGluIG9iaikgcmV0dXJuIG9ialtrZXldO1xyXG4gICAgICAgICAgICBpZiAodGVtcGxhdGVDb250ZXh0ICYmIHR5cGVvZiB0ZW1wbGF0ZUNvbnRleHQgPT09IFwib2JqZWN0XCIgJiYga2V5IGluIHRlbXBsYXRlQ29udGV4dCAmJiBwbGFjZWhvbGRlciAhPT0gdGVtcGxhdGVDb250ZXh0W2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlQ29udGV4dFtrZXldID0gSGFuZGxlLmdlbih0ZW1wbGF0ZUNvbnRleHRba2V5XSwga2V5LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IG9iaixcclxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiB0ZW1wbGF0ZUNvbnRleHRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlQ29udGV4dFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghKGtleSBpbiBSYW5kb20pICYmICEobGtleSBpbiBSYW5kb20pICYmICEob2tleSBpbiBSYW5kb20pKSByZXR1cm4gcGxhY2Vob2xkZXI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFyYW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBycGxhY2Vob2xkZXIuZXhlYyhcIlwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChycGxhY2Vob2xkZXIudGVzdChwYXJhbXNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zW2ldID0gSGFuZGxlLnBsYWNlaG9sZGVyKHBhcmFtc1tpXSwgb2JqKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gUmFuZG9tW2tleV0gfHwgUmFuZG9tW2xrZXldIHx8IFJhbmRvbVtva2V5XTtcclxuICAgICAgICAgICAgc3dpdGNoIChVdGlsLnR5cGUoaGFuZGxlKSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgXCJhcnJheVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKGhhbmRsZSk7XHJcblxyXG4gICAgICAgICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxyXG4gICAgICAgICAgICAgICAgdmFyIHJlID0gaGFuZGxlLmFwcGx5KFJhbmRvbSwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZSA9PT0gdW5kZWZpbmVkKSByZSA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIC8qISBzcmMvbW9ja2pheC5qcyAqL1xyXG4gICAgZnVuY3Rpb24gZmluZChvcHRpb25zKSB7XHJcbiAgICAgICAgZm9yICh2YXIgc1VybFR5cGUgaW4gTW9jay5fbW9ja2VkKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gTW9jay5fbW9ja2VkW3NVcmxUeXBlXTtcclxuICAgICAgICAgICAgaWYgKCghaXRlbS5ydXJsIHx8IG1hdGNoKGl0ZW0ucnVybCwgb3B0aW9ucy51cmwpKSAmJiAoIWl0ZW0ucnR5cGUgfHwgbWF0Y2goaXRlbS5ydHlwZSwgb3B0aW9ucy50eXBlLnRvTG93ZXJDYXNlKCkpKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZnVuY3Rpb24gbWF0Y2goZXhwZWN0ZWQsIGFjdHVhbCkge1xyXG4gICAgICAgICAgICBpZiAoVXRpbC50eXBlKGV4cGVjdGVkKSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV4cGVjdGVkID09PSBhY3R1YWw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFV0aWwudHlwZShleHBlY3RlZCkgPT09IFwicmVnZXhwXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBleHBlY3RlZC50ZXN0KGFjdHVhbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjb252ZXJ0KGl0ZW0sIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gVXRpbC5pc0Z1bmN0aW9uKGl0ZW0udGVtcGxhdGUpID8gaXRlbS50ZW1wbGF0ZShvcHRpb25zKSA6IE1vY2subW9jayhpdGVtLnRlbXBsYXRlKTtcclxuICAgIH1cclxuICAgIE1vY2subW9ja2pheCA9IGZ1bmN0aW9uIG1vY2tqYXgoalF1ZXJ5KSB7XHJcbiAgICAgICAgZnVuY3Rpb24gbW9ja3hocigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU6IDQsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBvcGVuOiBqUXVlcnkubm9vcCxcclxuICAgICAgICAgICAgICAgIHNlbmQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9ubG9hZCkgdGhpcy5vbmxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBzZXRSZXF1ZXN0SGVhZGVyOiBqUXVlcnkubm9vcCxcclxuICAgICAgICAgICAgICAgIGdldEFsbFJlc3BvbnNlSGVhZGVyczogalF1ZXJ5Lm5vb3AsXHJcbiAgICAgICAgICAgICAgICBnZXRSZXNwb25zZUhlYWRlcjogalF1ZXJ5Lm5vb3AsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBqUXVlcnkubm9vcCxcclxuICAgICAgICAgICAgICAgIGFib3J0OiBqUXVlcnkubm9vcFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBmdW5jdGlvbiBwcmVmaWx0ZXIob3B0aW9ucywgb3JpZ2luYWxPcHRpb25zLCBqcVhIUikge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGZpbmQob3B0aW9ucyk7XHJcbiAgICAgICAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRhdGFGaWx0ZXIgPSBvcHRpb25zLmNvbnZlcnRlcnNbXCJ0ZXh0IGpzb25cIl0gPSBvcHRpb25zLmNvbnZlcnRlcnNbXCJ0ZXh0IGpzb25wXCJdID0gb3B0aW9ucy5jb252ZXJ0ZXJzW1widGV4dCBzY3JpcHRcIl0gPSBvcHRpb25zLmNvbnZlcnRlcnNbXCJzY3JpcHQganNvblwiXSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb252ZXJ0KGl0ZW0sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMueGhyID0gbW9ja3hocjtcclxuICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbE9wdGlvbnMuZGF0YVR5cGUgIT09IFwic2NyaXB0XCIpIHJldHVybiBcImpzb25cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBqUXVlcnkuYWpheFByZWZpbHRlcihcImpzb24ganNvbnAgc2NyaXB0XCIsIHByZWZpbHRlcik7XHJcbiAgICAgICAgcmV0dXJuIE1vY2s7XHJcbiAgICB9O1xyXG4gICAgaWYgKHR5cGVvZiBqUXVlcnkgIT0gXCJ1bmRlZmluZWRcIikgTW9jay5tb2NramF4KGpRdWVyeSk7XHJcbiAgICBpZiAodHlwZW9mIFplcHRvICE9IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBNb2NrLm1vY2tqYXggPSBmdW5jdGlvbihaZXB0bykge1xyXG4gICAgICAgICAgICB2YXIgX19vcmlnaW5hbF9hamF4ID0gWmVwdG8uYWpheDtcclxuICAgICAgICAgICAgdmFyIHhociA9IHtcclxuICAgICAgICAgICAgICAgIHJlYWR5U3RhdGU6IDQsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZVRleHQ6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICByZXNwb25zZVhNTDogbnVsbCxcclxuICAgICAgICAgICAgICAgIHN0YXRlOiAyLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAyMDAsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXNUZXh0OiBcInN1Y2Nlc3NcIixcclxuICAgICAgICAgICAgICAgIHRpbWVvdXRUaW1lcjogbnVsbFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBaZXB0by5hamF4ID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBmaW5kKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayhpdGVtLnRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zdWNjZXNzKSBvcHRpb25zLnN1Y2Nlc3MoZGF0YSwgeGhyLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jb21wbGV0ZSkgb3B0aW9ucy5jb21wbGV0ZSh4aHIuc3RhdHVzLCB4aHIsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4aHI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX19vcmlnaW5hbF9hamF4LmNhbGwoWmVwdG8sIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jay5tb2NramF4KFplcHRvKTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgS0lTU1kgIT0gXCJ1bmRlZmluZWRcIiAmJiBLSVNTWS5hZGQpIHtcclxuICAgICAgICBNb2NrLm1vY2tqYXggPSBmdW5jdGlvbiBtb2NramF4KEtJU1NZKSB7XHJcbiAgICAgICAgICAgIHZhciBfb3JpZ2luYWxfYWpheCA9IEtJU1NZLmlvO1xyXG4gICAgICAgICAgICB2YXIgeGhyID0ge1xyXG4gICAgICAgICAgICAgICAgcmVhZHlTdGF0ZTogNCxcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlVGV4dDogXCJcIixcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNlWE1MOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc3RhdGU6IDIsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXM6IDIwMCxcclxuICAgICAgICAgICAgICAgIHN0YXR1c1RleHQ6IFwic3VjY2Vzc1wiLFxyXG4gICAgICAgICAgICAgICAgdGltZW91dFRpbWVyOiBudWxsXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIEtJU1NZLmlvID0gZnVuY3Rpb24ob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBmaW5kKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayhpdGVtLnRlbXBsYXRlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5zdWNjZXNzKSBvcHRpb25zLnN1Y2Nlc3MoZGF0YSwgeGhyLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5jb21wbGV0ZSkgb3B0aW9ucy5jb21wbGV0ZSh4aHIuc3RhdHVzLCB4aHIsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB4aHI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gX29yaWdpbmFsX2FqYXguYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBfb3JpZ2luYWxfYWpheCkge1xyXG4gICAgICAgICAgICAgICAgS0lTU1kuaW9bbmFtZV0gPSBfb3JpZ2luYWxfYWpheFtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvKiEgc3JjL2V4cG9zZS5qcyAqL1xyXG4gICAgTW9jay5VdGlsID0gVXRpbDtcclxuICAgIE1vY2suUmFuZG9tID0gUmFuZG9tO1xyXG4gICAgTW9jay5oZXJlZG9jID0gVXRpbC5oZXJlZG9jO1xyXG4gICAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IE1vY2s7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XHJcbiAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gTW9jaztcclxuICAgICAgICB9KTtcclxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5jbWQpIHtcclxuICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb2NrO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdGhpcy5Nb2NrID0gTW9jaztcclxuICAgIHRoaXMuUmFuZG9tID0gUmFuZG9tO1xyXG4gICAgaWYgKHR5cGVvZiBLSVNTWSAhPSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgVXRpbC5lYWNoKFsgXCJtb2NrXCIsIFwiY29tcG9uZW50cy9tb2NrL1wiLCBcIm1vY2svZGlzdC9tb2NrXCIsIFwiZ2FsbGVyeS9Nb2NrLzAuMS4xL1wiLCBcImdhbGxlcnkvTW9jay8wLjEuMi9cIiwgXCJnYWxsZXJ5L01vY2svMC4xLjMvXCIgXSwgZnVuY3Rpb24gcmVnaXN0ZXIobmFtZSkge1xyXG4gICAgICAgICAgICBLSVNTWS5hZGQobmFtZSwgZnVuY3Rpb24oUykge1xyXG4gICAgICAgICAgICAgICAgTW9jay5tb2NramF4KFMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1vY2s7XHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIHJlcXVpcmVzOiBbIFwiYWpheFwiIF1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKiEgc3JjL21vY2s0dHBsLmpzICovXHJcbiAgICAoZnVuY3Rpb24odW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmFyIE1vY2s0VHBsID0ge1xyXG4gICAgICAgICAgICB2ZXJzaW9uOiBcIjAuMC4xXCJcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICghdGhpcy5Nb2NrKSBtb2R1bGUuZXhwb3J0cyA9IE1vY2s0VHBsO1xyXG4gICAgICAgIE1vY2sudHBsID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb2NrNFRwbC5tb2NrKGlucHV0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrLnBhcnNlID0gZnVuY3Rpb24oaW5wdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEhhbmRsZWJhcnMucGFyc2UoaW5wdXQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRUcGwubW9jayA9IGZ1bmN0aW9uKGlucHV0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICBoZWxwZXJzID0gaGVscGVycyA/IFV0aWwuZXh0ZW5kKHt9LCBoZWxwZXJzLCBIYW5kbGViYXJzLmhlbHBlcnMpIDogSGFuZGxlYmFycy5oZWxwZXJzO1xyXG4gICAgICAgICAgICBwYXJ0aWFscyA9IHBhcnRpYWxzID8gVXRpbC5leHRlbmQoe30sIHBhcnRpYWxzLCBIYW5kbGViYXJzLnBhcnRpYWxzKSA6IEhhbmRsZWJhcnMucGFydGlhbHM7XHJcbiAgICAgICAgICAgIHJldHVybiBIYW5kbGUuZ2VuKGlucHV0LCBudWxsLCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB2YXIgSGFuZGxlID0ge1xyXG4gICAgICAgICAgICBkZWJ1ZzogTW9jazRUcGwuZGVidWcgfHwgZmFsc2UsXHJcbiAgICAgICAgICAgIGV4dGVuZDogVXRpbC5leHRlbmRcclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5nZW4gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc1N0cmluZyhub2RlKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFzdCA9IEhhbmRsZWJhcnMucGFyc2Uobm9kZSk7XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zID0gSGFuZGxlLnBhcnNlT3B0aW9ucyhub2RlLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gSGFuZGxlLmdlbihhc3QsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IFsge30gXTtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcbiAgICAgICAgICAgIGlmICh0aGlzW25vZGUudHlwZV0gPT09IFV0aWwubm9vcCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBvcHRpb25zLl9fcGF0aCA9IG9wdGlvbnMuX19wYXRoIHx8IFtdO1xyXG4gICAgICAgICAgICBpZiAoTW9jazRUcGwuZGVidWcgfHwgSGFuZGxlLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5ncm91cChcIltcIiArIG5vZGUudHlwZSArIFwiXVwiLCBKU09OLnN0cmluZ2lmeShub2RlKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltvcHRpb25zXVwiLCBvcHRpb25zLl9fcGF0aC5sZW5ndGgsIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHJlTGVuZ3RoID0gb3B0aW9ucy5fX3BhdGgubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzW25vZGUudHlwZV0obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5zcGxpY2UocHJlTGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYgKE1vY2s0VHBsLmRlYnVnIHx8IEhhbmRsZS5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0W2NvbnRleHQubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUucGFyc2VPcHRpb25zID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJDb21tZW50ID0gLzwhLS1cXHMqXFxuKk1vY2tcXHMqXFxuKihbXFx3XFxXXSs/KVxccypcXG4qLS0+L2c7XHJcbiAgICAgICAgICAgIHZhciBjb21tZW50cyA9IGlucHV0Lm1hdGNoKHJDb21tZW50KSwgcmV0ID0ge30sIGksIG1hLCBvcHRpb247XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGNvbW1lbnRzICYmIGkgPCBjb21tZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgckNvbW1lbnQubGFzdEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIG1hID0gckNvbW1lbnQuZXhlYyhjb21tZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gXCIgKyBtYVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gb3B0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5leHRlbmQocmV0LCBvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlsLmV4dGVuZChyZXQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLnZhbCA9IGZ1bmN0aW9uKG5hbWUsIG9wdGlvbnMsIGNvbnRleHQsIGRlZikge1xyXG4gICAgICAgICAgICBpZiAobmFtZSAhPT0gb3B0aW9ucy5fX3BhdGhbb3B0aW9ucy5fX3BhdGgubGVuZ3RoIC0gMV0pIHRocm93IG5ldyBFcnJvcihuYW1lICsgXCIhPT1cIiArIG9wdGlvbnMuX19wYXRoKTtcclxuICAgICAgICAgICAgaWYgKE1vY2s0VHBsLmRlYnVnIHx8IEhhbmRsZS5kZWJ1ZykgY29uc29sZS5sb2coXCJbb3B0aW9uc11cIiwgbmFtZSwgb3B0aW9ucy5fX3BhdGgpO1xyXG4gICAgICAgICAgICBpZiAoZGVmICE9PSB1bmRlZmluZWQpIGRlZiA9IE1vY2subW9jayhkZWYpO1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgdmFyIG1vY2tlZCA9IE1vY2subW9jayhvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLmlzU3RyaW5nKG1vY2tlZCkpIHJldHVybiBtb2NrZWQ7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSBpbiBtb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9ja2VkW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY29udGV4dFswXSkpIHJldHVybiB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZiAhPT0gdW5kZWZpbmVkID8gZGVmIDogbmFtZSB8fCBSYW5kb20ud29yZCgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLnByb2dyYW0gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscykge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuc3RhdGVtZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5zdGF0ZW1lbnRzW2ldLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5tdXN0YWNoZSA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBpLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbMF0sIGNvbnRleHRMZW5ndGggPSBjb250ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKFV0aWwudHlwZShjdXJyZW50Q29udGV4dCkgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQucHVzaCh7fSk7XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cnJlbnRDb250ZXh0Lmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAobm9kZS5pc0hlbHBlciB8fCBoZWxwZXJzICYmIGhlbHBlcnNbbm9kZS5pZC5zdHJpbmddKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXJhbXMubGVuZ3RoID09PSAwKSB7fSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbm9kZS5wYXJhbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5wYXJhbXNbaV0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobm9kZS5oYXNoKSB0aGlzLmdlbihub2RlLmhhc2gsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUuaWQsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5sZW5ndGggPiBjb250ZXh0TGVuZ3RoKSBjb250ZXh0LnNwbGljZSgwLCBjb250ZXh0Lmxlbmd0aCAtIGNvbnRleHRMZW5ndGgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLmJsb2NrID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gbm9kZS5tdXN0YWNoZS5pZC5wYXJ0cywgaSwgbGVuLCBjdXIsIHZhbCwgdHlwZSwgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdLCBjb250ZXh0TGVuZ3RoID0gY29udGV4dC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmludmVyc2UpIHt9XHJcbiAgICAgICAgICAgIGlmIChub2RlLm11c3RhY2hlLmlzSGVscGVyIHx8IGhlbHBlcnMgJiYgaGVscGVyc1tub2RlLm11c3RhY2hlLmlkLnN0cmluZ10pIHtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBwYXJ0c1swXTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IChIZWxwZXJzW3R5cGVdIHx8IEhlbHBlcnMuY3VzdG9tKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyID0gcGFydHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChub2RlLnByb2dyYW0pIHtcclxuICAgICAgICAgICAgICAgIGlmIChVdGlsLnR5cGUoY3VycmVudENvbnRleHQpID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZW4gPSB2YWwubGVuZ3RoIHx8IFJhbmRvbS5pbnRlZ2VyKDMsIDcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dC5wdXNoKHR5cGVvZiB2YWxbaV0gIT09IFwidW5kZWZpbmVkXCIgPyB2YWxbaV0gOiB7fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2goXCJbXVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0W2N1cnJlbnRDb250ZXh0Lmxlbmd0aCAtIDFdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5wcm9ncmFtLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHRoaXMuZ2VuKG5vZGUucHJvZ3JhbSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IGNvbnRleHRMZW5ndGgpIGNvbnRleHQuc3BsaWNlKDAsIGNvbnRleHQubGVuZ3RoIC0gY29udGV4dExlbmd0aCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUuaGFzaCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWlycyA9IG5vZGUucGFpcnMsIHBhaXIsIGksIGo7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcGFpciA9IHBhaXJzW2ldO1xyXG4gICAgICAgICAgICAgICAgZm9yIChqID0gMTsgaiA8IHBhaXIubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbihwYWlyW2pdLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIEhhbmRsZS5JRCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gbm9kZS5wYXJ0cywgaSwgbGVuLCBjdXIsIHByZXYsIGRlZiwgdmFsLCB0eXBlLCB2YWxUeXBlLCBwcmVPcHRpb25zLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbbm9kZS5kZXB0aF0sIGNvbnRleHRMZW5ndGggPSBjb250ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKFV0aWwuaXNBcnJheShjdXJyZW50Q29udGV4dCkpIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFtub2RlLmRlcHRoICsgMV07XHJcbiAgICAgICAgICAgIGlmICghcGFydHMubGVuZ3RoKSB7fSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHBhcnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyID0gcGFydHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgcHJldiA9IHBhcnRzW2kgLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBwcmVPcHRpb25zID0gb3B0aW9uc1twcmV2XTtcclxuICAgICAgICAgICAgICAgICAgICBkZWYgPSBpID09PSBsZW4gLSAxID8gY3VycmVudENvbnRleHRbY3VyXSA6IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwgZGVmKTtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbFR5cGUgPSBVdGlsLnR5cGUodmFsKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IGxlbiAtIDEgJiYgdmFsVHlwZSAhPT0gXCJvYmplY3RcIiAmJiB2YWxUeXBlICE9PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA8IGxlbiAtIDEgJiYgdHlwZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlICE9PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB7fTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjb250ZXh0Lmxlbmd0aCA+IGNvbnRleHRMZW5ndGgpIGNvbnRleHQuc3BsaWNlKDAsIGNvbnRleHQubGVuZ3RoIC0gY29udGV4dExlbmd0aCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIYW5kbGUucGFydGlhbCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gbm9kZS5wYXJ0aWFsTmFtZS5uYW1lLCBwYXJ0aWFsID0gcGFydGlhbHMgJiYgcGFydGlhbHNbbmFtZV0sIGNvbnRleHRMZW5ndGggPSBjb250ZXh0Lmxlbmd0aDtcclxuICAgICAgICAgICAgaWYgKHBhcnRpYWwpIEhhbmRsZS5nZW4ocGFydGlhbCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgICAgICBpZiAoY29udGV4dC5sZW5ndGggPiBjb250ZXh0TGVuZ3RoKSBjb250ZXh0LnNwbGljZSgwLCBjb250ZXh0Lmxlbmd0aCAtIGNvbnRleHRMZW5ndGgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGFuZGxlLmNvbnRlbnQgPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgSGFuZGxlLlBBUlRJQUxfTkFNRSA9IFV0aWwubm9vcDtcclxuICAgICAgICBIYW5kbGUuREFUQSA9IFV0aWwubm9vcDtcclxuICAgICAgICBIYW5kbGUuU1RSSU5HID0gVXRpbC5ub29wO1xyXG4gICAgICAgIEhhbmRsZS5JTlRFR0VSID0gVXRpbC5ub29wO1xyXG4gICAgICAgIEhhbmRsZS5CT09MRUFOID0gVXRpbC5ub29wO1xyXG4gICAgICAgIEhhbmRsZS5jb21tZW50ID0gVXRpbC5ub29wO1xyXG4gICAgICAgIHZhciBIZWxwZXJzID0ge307XHJcbiAgICAgICAgSGVscGVycy5lYWNoID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgaSwgbGVuLCBjdXIsIHZhbCwgcGFydHMsIGRlZiwgdHlwZSwgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdO1xyXG4gICAgICAgICAgICBwYXJ0cyA9IG5vZGUubXVzdGFjaGUucGFyYW1zWzBdLnBhcnRzO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBwYXJ0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBjdXIgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgICAgICAgIGRlZiA9IGkgPT09IGxlbiAtIDEgPyBbXSA6IHt9O1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHZhbDtcclxuICAgICAgICAgICAgICAgIHR5cGUgPSBVdGlsLnR5cGUoY3VycmVudENvbnRleHRbY3VyXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlID09PSBcImFycmF5XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGVscGVyc1tcImlmXCJdID0gSGVscGVycy51bmxlc3MgPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zKSB7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBub2RlLm11c3RhY2hlLnBhcmFtcywgaSwgaiwgY3VyLCB2YWwsIHBhcnRzLCBkZWYsIHR5cGUsIGN1cnJlbnRDb250ZXh0ID0gY29udGV4dFswXTtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcGFydHMgPSBwYXJhbXNbaV0ucGFydHM7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgcGFydHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tqXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VyID0gcGFydHNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmID0gaiA9PT0gcGFydHMubGVuZ3RoIC0gMSA/IFwiQEJPT0woMiwxLHRydWUpXCIgOiB7fTtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbChjdXIsIG9wdGlvbnMsIGNvbnRleHQsIGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPT09IHBhcnRzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdmFsID09PSBcInRydWVcIiA/IHRydWUgOiB2YWwgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtjdXJdID0gVXRpbC5pc0FycmF5KHZhbCkgPyBbXSA6IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBIZWxwZXJzW1wid2l0aFwiXSA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIGksIGN1ciwgdmFsLCBwYXJ0cywgZGVmLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbMF07XHJcbiAgICAgICAgICAgIHBhcnRzID0gbm9kZS5tdXN0YWNoZS5wYXJhbXNbMF0ucGFydHM7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGgucHVzaChwYXJ0c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBjdXIgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgICAgICAgIGRlZiA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdGhpcy52YWwoY3VyLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdID0gdmFsO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC51bnNoaWZ0KGN1cnJlbnRDb250ZXh0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgSGVscGVycy5sb2cgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICAgIEhlbHBlcnMuY3VzdG9tID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucykge1xyXG4gICAgICAgICAgICB2YXIgaSwgbGVuLCBjdXIsIHZhbCwgcGFydHMsIGRlZiwgdHlwZSwgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdO1xyXG4gICAgICAgICAgICBpZiAobm9kZS5tdXN0YWNoZS5wYXJhbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKG5vZGUubXVzdGFjaGUuaWQuc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgIGN1ciA9IG5vZGUubXVzdGFjaGUuaWQuc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgZGVmID0gXCJAQk9PTCgyLDEsdHJ1ZSlcIjtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwgZGVmKTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W2N1cl0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB2YWw7XHJcbiAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwib2JqZWN0XCIgfHwgdHlwZSA9PT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0cyA9IG5vZGUubXVzdGFjaGUucGFyYW1zWzBdLnBhcnRzO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKHBhcnRzW2ldKTtcclxuICAgICAgICAgICAgICAgICAgICBjdXIgPSBwYXJ0c1tpXTtcclxuICAgICAgICAgICAgICAgICAgICBkZWYgPSBpID09PSBsZW4gLSAxID8gW10gOiB7fTtcclxuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnZhbChjdXIsIG9wdGlvbnMsIGNvbnRleHQsIGRlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbY3VyXSA9IFV0aWwuaXNBcnJheSh2YWwpICYmIFtdIHx8IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W2N1cl0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcIm9iamVjdFwiIHx8IHR5cGUgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2N1cl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfTtcclxuICAgIH0pLmNhbGwodGhpcyk7XHJcbiAgICAvKiEgc3JjL21vY2s0eHRwbC5qcyAqL1xyXG4gICAgKGZ1bmN0aW9uKHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgS0lTU1kgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICAgICAgICB2YXIgTW9jazRYVHBsID0ge1xyXG4gICAgICAgICAgICBkZWJ1ZzogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciBYVGVtcGxhdGU7XHJcbiAgICAgICAgS0lTU1kudXNlKFwieHRlbXBsYXRlXCIsIGZ1bmN0aW9uKFMsIFQpIHtcclxuICAgICAgICAgICAgWFRlbXBsYXRlID0gVDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXRoaXMuTW9jaykgbW9kdWxlLmV4cG9ydHMgPSBNb2NrNFhUcGw7XHJcbiAgICAgICAgTW9jay54dHBsID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBNb2NrNFhUcGwubW9jayhpbnB1dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jay54cGFyc2UgPSBmdW5jdGlvbihpbnB1dCkge1xyXG4gICAgICAgICAgICByZXR1cm4gWFRlbXBsYXRlLmNvbXBpbGVyLnBhcnNlKGlucHV0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5tb2NrID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzKSB7XHJcbiAgICAgICAgICAgIGhlbHBlcnMgPSBoZWxwZXJzID8gVXRpbC5leHRlbmQoe30sIGhlbHBlcnMsIFhUZW1wbGF0ZS5SdW5UaW1lLmNvbW1hbmRzKSA6IFhUZW1wbGF0ZS5SdW5UaW1lLmNvbW1hbmRzO1xyXG4gICAgICAgICAgICBwYXJ0aWFscyA9IHBhcnRpYWxzID8gVXRpbC5leHRlbmQoe30sIHBhcnRpYWxzLCBYVGVtcGxhdGUuUnVuVGltZS5zdWJUcGxzKSA6IFhUZW1wbGF0ZS5SdW5UaW1lLnN1YlRwbHM7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbihpbnB1dCwgbnVsbCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIHt9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5wYXJzZSA9IGZ1bmN0aW9uKGlucHV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBYVGVtcGxhdGUuY29tcGlsZXIucGFyc2UoaW5wdXQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLmdlbiA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChNb2NrNFhUcGwuZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlt0cGwgICAgXVxcblwiLCBub2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBhc3QgPSB0aGlzLnBhcnNlKG5vZGUpO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucyA9IHRoaXMucGFyc2VPcHRpb25zKG5vZGUsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmdlbihhc3QsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb250ZXh0ID0gY29udGV4dCB8fCBbIHt9IF07XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG4gICAgICAgICAgICBub2RlLnR5cGUgPSBub2RlLnR5cGU7XHJcbiAgICAgICAgICAgIGlmICh0aGlzW25vZGUudHlwZV0gPT09IFV0aWwubm9vcCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBvcHRpb25zLl9fcGF0aCA9IG9wdGlvbnMuX19wYXRoIHx8IFtdO1xyXG4gICAgICAgICAgICBpZiAoTW9jazRYVHBsLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5ncm91cChcIltcIiArIG5vZGUudHlwZSArIFwiXVwiLCBKU09OLnN0cmluZ2lmeShub2RlKSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltjb250ZXh0XVwiLCBcIltiZWZvcmVdXCIsIGNvbnRleHQubGVuZ3RoLCBKU09OLnN0cmluZ2lmeShjb250ZXh0KSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltvcHRpb25zXVwiLCBcIltiZWZvcmVdXCIsIG9wdGlvbnMuX19wYXRoLmxlbmd0aCwgSlNPTi5zdHJpbmdpZnkob3B0aW9ucykpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbb3RoZXIgIF1cIiwgXCJbYmVmb3JlXVwiLCBKU09OLnN0cmluZ2lmeShvdGhlcikpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwcmVMZW5ndGggPSBvcHRpb25zLl9fcGF0aC5sZW5ndGg7XHJcbiAgICAgICAgICAgIHRoaXNbbm9kZS50eXBlXShub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICBpZiAoTW9jazRYVHBsLmRlYnVnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltfX3BhdGggXVwiLCBcIlthZnRlciBdXCIsIG9wdGlvbnMuX19wYXRoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW90aGVyLmhvbGQgfHwgdHlwZW9mIG90aGVyLmhvbGQgPT09IFwiZnVuY3Rpb25cIiAmJiAhb3RoZXIuaG9sZChub2RlLCBvcHRpb25zLCBjb250ZXh0KSkge1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5fX3BhdGguc3BsaWNlKHByZUxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKE1vY2s0WFRwbC5kZWJ1Zykge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbY29udGV4dF1cIiwgXCJbYWZ0ZXIgXVwiLCBjb250ZXh0Lmxlbmd0aCwgSlNPTi5zdHJpbmdpZnkoY29udGV4dCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5ncm91cEVuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBjb250ZXh0W2NvbnRleHQubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBNb2NrNFhUcGwucGFyc2VPcHRpb25zID0gZnVuY3Rpb24oaW5wdXQsIG9wdGlvbnMpIHtcclxuICAgICAgICAgICAgdmFyIHJDb21tZW50ID0gLzwhLS1cXHMqXFxuKk1vY2tcXHMqXFxuKihbXFx3XFxXXSs/KVxccypcXG4qLS0+L2c7XHJcbiAgICAgICAgICAgIHZhciBjb21tZW50cyA9IGlucHV0Lm1hdGNoKHJDb21tZW50KSwgcmV0ID0ge30sIGksIG1hLCBvcHRpb247XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGNvbW1lbnRzICYmIGkgPCBjb21tZW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgckNvbW1lbnQubGFzdEluZGV4ID0gMDtcclxuICAgICAgICAgICAgICAgIG1hID0gckNvbW1lbnQuZXhlYyhjb21tZW50c1tpXSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWEpIHtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb24gPSBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gXCIgKyBtYVsxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uID0gb3B0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgVXRpbC5leHRlbmQocmV0LCBvcHRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBVdGlsLmV4dGVuZChyZXQsIG9wdGlvbnMpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLnBhcnNlVmFsID0gZnVuY3Rpb24oZXhwciwgb2JqZWN0KSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHF1ZXJ5QXJyYXkocHJvcCwgY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb250ZXh0ID09PSBcIm9iamVjdFwiICYmIHByb3AgaW4gY29udGV4dCkgcmV0dXJuIFsgY29udGV4dFtwcm9wXSBdO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0LnB1c2guYXBwbHkocmV0LCBxdWVyeShwcm9wLCBbIGNvbnRleHRbaV0gXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBxdWVyeU9iamVjdChwcm9wLCBjb250ZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbnRleHQgPT09IFwib2JqZWN0XCIgJiYgcHJvcCBpbiBjb250ZXh0KSByZXR1cm4gWyBjb250ZXh0W3Byb3BdIF07XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldC5wdXNoLmFwcGx5KHJldCwgcXVlcnkocHJvcCwgWyBjb250ZXh0W2tleV0gXSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmdW5jdGlvbiBxdWVyeShwcm9wLCBzZXQpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXQgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZXRbaV0gIT09IFwib2JqZWN0XCIpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wIGluIHNldFtpXSkgcmV0LnB1c2goc2V0W2ldW3Byb3BdKTsgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldC5wdXNoLmFwcGx5KHJldCwgVXRpbC5pc0FycmF5KHNldFtpXSkgPyBxdWVyeUFycmF5KHByb3AsIHNldFtpXSkgOiBxdWVyeU9iamVjdChwcm9wLCBzZXRbaV0pKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHBhcnNlKGV4cHIsIGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHR5cGVvZiBleHByID09PSBcInN0cmluZ1wiID8gZXhwci5zcGxpdChcIi5cIikgOiBleHByLnNsaWNlKDApLCBzZXQgPSBbIGNvbnRleHQgXTtcclxuICAgICAgICAgICAgICAgIHdoaWxlIChwYXJ0cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXQgPSBxdWVyeShwYXJ0cy5zaGlmdCgpLCBzZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNldDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2UoZXhwciwgb2JqZWN0KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC52YWwgPSBmdW5jdGlvbihuYW1lLCBvcHRpb25zLCBjb250ZXh0LCBkZWYpIHtcclxuICAgICAgICAgICAgaWYgKG5hbWUgIT09IG9wdGlvbnMuX19wYXRoW29wdGlvbnMuX19wYXRoLmxlbmd0aCAtIDFdKSB0aHJvdyBuZXcgRXJyb3IobmFtZSArIFwiIT09XCIgKyBvcHRpb25zLl9fcGF0aCk7XHJcbiAgICAgICAgICAgIGlmIChkZWYgIT09IHVuZGVmaW5lZCkgZGVmID0gTW9jay5tb2NrKGRlZik7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbW9ja2VkID0gTW9jay5tb2NrKG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNTdHJpbmcobW9ja2VkKSkgcmV0dXJuIG1vY2tlZDtcclxuICAgICAgICAgICAgICAgIHZhciByZXQgPSBNb2NrNFhUcGwucGFyc2VWYWwob3B0aW9ucy5fX3BhdGgsIG1vY2tlZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmV0Lmxlbmd0aCA+IDApIHJldHVybiByZXRbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSBpbiBtb2NrZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9ja2VkW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChVdGlsLmlzQXJyYXkoY29udGV4dFswXSkpIHJldHVybiB7fTtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZiAhPT0gdW5kZWZpbmVkID8gZGVmIDogbmFtZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5wcm9ncmFtID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5zdGF0ZW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLnN0YXRlbWVudHNbaV0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IG5vZGUuaW52ZXJzZSAmJiBqIDwgbm9kZS5pbnZlcnNlLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLmludmVyc2Vbal0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5ibG9jayA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dExlbmd0aCA9IGNvbnRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICB0aGlzLmdlbihub2RlLnRwbCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIFV0aWwuZXh0ZW5kKHt9LCBvdGhlciwge1xyXG4gICAgICAgICAgICAgICAgZGVmOiB7fSxcclxuICAgICAgICAgICAgICAgIGhvbGQ6IHRydWVcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICB2YXIgY3VycmVudENvbnRleHQgPSBjb250ZXh0WzBdLCBtb2NrZWQsIGksIGxlbjtcclxuICAgICAgICAgICAgaWYgKFV0aWwudHlwZShjdXJyZW50Q29udGV4dCkgPT09IFwiYXJyYXlcIikge1xyXG4gICAgICAgICAgICAgICAgbW9ja2VkID0gdGhpcy52YWwob3B0aW9ucy5fX3BhdGhbb3B0aW9ucy5fX3BhdGgubGVuZ3RoIC0gMV0sIG9wdGlvbnMsIGNvbnRleHQpO1xyXG4gICAgICAgICAgICAgICAgbGVuID0gbW9ja2VkICYmIG1vY2tlZC5sZW5ndGggfHwgUmFuZG9tLmludGVnZXIoMywgNyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dC5wdXNoKG1vY2tlZCAmJiBtb2NrZWRbaV0gIT09IHVuZGVmaW5lZCA/IG1vY2tlZFtpXSA6IHt9KTtcclxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLl9fcGF0aC5wdXNoKGkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQudW5zaGlmdChjdXJyZW50Q29udGV4dFtjdXJyZW50Q29udGV4dC5sZW5ndGggLSAxXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5wcm9ncmFtLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHRoaXMuZ2VuKG5vZGUucHJvZ3JhbSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgaWYgKCFvdGhlci5ob2xkIHx8IHR5cGVvZiBvdGhlci5ob2xkID09PSBcImZ1bmN0aW9uXCIgJiYgIW90aGVyLmhvbGQobm9kZSwgb3B0aW9ucywgY29udGV4dCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3BsaWNlKDAsIGNvbnRleHQubGVuZ3RoIC0gY29udGV4dExlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC50cGwgPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgaWYgKG5vZGUucGFyYW1zICYmIG5vZGUucGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgb3RoZXIgPSBVdGlsLmV4dGVuZCh7fSwgb3RoZXIsIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWY6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWFjaDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWZcIjogXCJAQk9PTCgyLDEsdHJ1ZSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5sZXNzOiBcIkBCT09MKDIsMSxmYWxzZSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ3aXRoXCI6IHt9XHJcbiAgICAgICAgICAgICAgICAgICAgfVtub2RlLnBhdGguc3RyaW5nXSxcclxuICAgICAgICAgICAgICAgICAgICBob2xkOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhY2g6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWZcIjogZnVuY3Rpb24oXywgX18sIF9fXywgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVubGVzczogZnVuY3Rpb24oXywgX18sIF9fXywgbmFtZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwid2l0aFwiOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH1bbm9kZS5wYXRoLnN0cmluZ11cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGlucHV0OyBpIDwgbm9kZS5wYXJhbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS5wYXRoLnN0cmluZyA9PT0gXCJpbmNsdWRlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBwYXJ0aWFscyAmJiBwYXJ0aWFsc1tub2RlLnBhcmFtc1tpXS52YWx1ZV07XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlucHV0ID0gbm9kZS5wYXJhbXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0KSB0aGlzLmdlbihpbnB1dCwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChub2RlLmhhc2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLmhhc2gsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbihub2RlLnBhdGgsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC50cGxFeHByZXNzaW9uID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUuZXhwcmVzc2lvbiwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5jb250ZW50ID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC51bmFyeUV4cHJlc3Npb24gPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLm11bHRpcGxpY2F0aXZlRXhwcmVzc2lvbiA9IE1vY2s0WFRwbC5hZGRpdGl2ZUV4cHJlc3Npb24gPSBmdW5jdGlvbihub2RlLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW4obm9kZS5vcDEsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBVdGlsLmV4dGVuZCh7fSwgb3RoZXIsIHtcclxuICAgICAgICAgICAgICAgIGRlZjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5vZGUub3AyLnR5cGUgPT09IFwibnVtYmVyXCIgPyBub2RlLm9wMi52YWx1ZS5pbmRleE9mKFwiLlwiKSA+IC0xID8gUmFuZG9tLmZsb2F0KC1NYXRoLnBvdygxMCwgMTApLCBNYXRoLnBvdygxMCwgMTApLCAxLCBNYXRoLnBvdygxMCwgNikpIDogUmFuZG9tLmludGVnZXIoKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICAgICAgICAgIH0oKVxyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUub3AyLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgVXRpbC5leHRlbmQoe30sIG90aGVyLCB7XHJcbiAgICAgICAgICAgICAgICBkZWY6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBub2RlLm9wMS50eXBlID09PSBcIm51bWJlclwiID8gbm9kZS5vcDEudmFsdWUuaW5kZXhPZihcIi5cIikgPiAtMSA/IFJhbmRvbS5mbG9hdCgtTWF0aC5wb3coMTAsIDEwKSwgTWF0aC5wb3coMTAsIDEwKSwgMSwgTWF0aC5wb3coMTAsIDYpKSA6IFJhbmRvbS5pbnRlZ2VyKCkgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgICAgICB9KClcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgTW9jazRYVHBsLnJlbGF0aW9uYWxFeHByZXNzaW9uID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuKG5vZGUub3AxLCBjb250ZXh0LCBvcHRpb25zLCBoZWxwZXJzLCBwYXJ0aWFscywgb3RoZXIpO1xyXG4gICAgICAgICAgICB0aGlzLmdlbihub2RlLm9wMiwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5lcXVhbGl0eUV4cHJlc3Npb24gPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLmNvbmRpdGlvbmFsQW5kRXhwcmVzc2lvbiA9IFV0aWwubm9vcDtcclxuICAgICAgICBNb2NrNFhUcGwuY29uZGl0aW9uYWxPckV4cHJlc3Npb24gPSBVdGlsLm5vb3A7XHJcbiAgICAgICAgTW9jazRYVHBsLnN0cmluZyA9IFV0aWwubm9vcDtcclxuICAgICAgICBNb2NrNFhUcGwubnVtYmVyID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC5ib29sZWFuID0gVXRpbC5ub29wO1xyXG4gICAgICAgIE1vY2s0WFRwbC5oYXNoID0gZnVuY3Rpb24obm9kZSwgY29udGV4dCwgb3B0aW9ucywgaGVscGVycywgcGFydGlhbHMsIG90aGVyKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWlycyA9IG5vZGUudmFsdWUsIGtleTtcclxuICAgICAgICAgICAgZm9yIChrZXkgaW4gcGFpcnMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuKHBhaXJzW2tleV0sIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIE1vY2s0WFRwbC5pZCA9IGZ1bmN0aW9uKG5vZGUsIGNvbnRleHQsIG9wdGlvbnMsIGhlbHBlcnMsIHBhcnRpYWxzLCBvdGhlcikge1xyXG4gICAgICAgICAgICB2YXIgY29udGV4dExlbmd0aCA9IGNvbnRleHQubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBub2RlLnBhcnRzLCBjdXJyZW50Q29udGV4dCA9IGNvbnRleHRbbm9kZS5kZXB0aF0sIGksIGxlbiwgY3VyLCBkZWYsIHZhbDtcclxuICAgICAgICAgICAgZnVuY3Rpb24gZml4KGN1cnJlbnRDb250ZXh0LCBpbmRleCwgbGVuZ3RoLCBuYW1lLCB2YWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gVXRpbC50eXBlKGN1cnJlbnRDb250ZXh0W25hbWVdKSwgdmFsVHlwZSA9IFV0aWwudHlwZSh2YWwpO1xyXG4gICAgICAgICAgICAgICAgdmFsID0gdmFsID09PSBcInRydWVcIiA/IHRydWUgOiB2YWwgPT09IFwiZmFsc2VcIiA/IGZhbHNlIDogdmFsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBsZW5ndGggLSAxICYmICFVdGlsLmlzT2JqZWN0T3JBcnJheSh2YWwpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W25hbWVdID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHRbbmFtZV0gPSBVdGlsLmlzQXJyYXkodmFsKSAmJiBbXSB8fCB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBsZW5ndGggLSAxICYmIHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZSAhPT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0W25hbWVdID0gVXRpbC5pc0FycmF5KHZhbCkgJiYgW10gfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZSAhPT0gXCJhcnJheVwiICYmIHZhbFR5cGUgIT09IFwib2JqZWN0XCIgJiYgdmFsVHlwZSAhPT0gXCJhcnJheVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dFtuYW1lXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Q29udGV4dFtuYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoVXRpbC5pc0FycmF5KGN1cnJlbnRDb250ZXh0KSkgY3VycmVudENvbnRleHQgPSBjb250ZXh0W25vZGUuZGVwdGggKyAxXTtcclxuICAgICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gcGFydHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09PSAwICYmIHBhcnRzW2ldID09PSBcInRoaXNcIikgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoL14oeGluZGV4fHhjb3VudHx4a2V5KSQvLnRlc3QocGFydHNbaV0pKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGlmIChpID09PSAwICYmIGxlbiA9PT0gMSAmJiBwYXJ0c1tpXSBpbiBoZWxwZXJzKSBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnMuX19wYXRoLnB1c2gocGFydHNbaV0pO1xyXG4gICAgICAgICAgICAgICAgY3VyID0gcGFydHNbaV07XHJcbiAgICAgICAgICAgICAgICBkZWYgPSBpID09PSBsZW4gLSAxID8gb3RoZXIuZGVmICE9PSB1bmRlZmluZWQgPyBvdGhlci5kZWYgOiBjb250ZXh0WzBdW2N1cl0gOiB7fTtcclxuICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMudmFsKGN1ciwgb3B0aW9ucywgY29udGV4dCwgZGVmKTtcclxuICAgICAgICAgICAgICAgIGlmIChNb2NrNFhUcGwuZGVidWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltkZWYgICAgXVwiLCBKU09OLnN0cmluZ2lmeShkZWYpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlt2YWwgICAgXVwiLCBKU09OLnN0cmluZ2lmeSh2YWwpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhbCA9IGZpeChjdXJyZW50Q29udGV4dCwgaSwgbGVuLCBjdXIsIHZhbCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoVXRpbC5pc09iamVjdE9yQXJyYXkoY3VycmVudENvbnRleHRbY3VyXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LnVuc2hpZnQoY3VycmVudENvbnRleHQgPSBjdXJyZW50Q29udGV4dFtjdXJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIW90aGVyLmhvbGQgfHwgdHlwZW9mIG90aGVyLmhvbGQgPT09IFwiZnVuY3Rpb25cIiAmJiAhb3RoZXIuaG9sZChub2RlLCBvcHRpb25zLCBjb250ZXh0LCBjdXIsIHZhbCkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3BsaWNlKDAsIGNvbnRleHQubGVuZ3RoIC0gY29udGV4dExlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSkuY2FsbCh0aGlzKTtcclxufSkuY2FsbCh0aGlzKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGVwL21vY2suanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSA0IDUgMTZcbiAqKi8iLCJ2YXIgdGVtcGxhdGU9cmVxdWlyZSgndG1vZGpzLWxvYWRlci9ydW50aW1lJyk7XG5tb2R1bGUuZXhwb3J0cz10ZW1wbGF0ZSgndHBsL2NvdXJzZWluZm8nLGZ1bmN0aW9uKCRkYXRhLCRmaWxlbmFtZVxuLyoqLykge1xuJ3VzZSBzdHJpY3QnO3ZhciAkdXRpbHM9dGhpcywkaGVscGVycz0kdXRpbHMuJGhlbHBlcnMsJGVhY2g9JHV0aWxzLiRlYWNoLCR2YWx1ZT0kZGF0YS4kdmFsdWUsJGluZGV4PSRkYXRhLiRpbmRleCwkZXNjYXBlPSR1dGlscy4kZXNjYXBlLCRvdXQ9Jyc7JG91dCs9JyAnO1xuJGVhY2goJGRhdGEsZnVuY3Rpb24oJHZhbHVlLCRpbmRleCl7XG4kb3V0Kz0nIDx0YWJsZT4gPHRyPjx0ZCBjbGFzcz1cInBjdDI1XCI+5o6I6K++6ICB5biIPC90ZD48dGQgY2xhc3M9XCJ0ZHZhbHVlXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLnRlYWNoZXJOYW1lKTtcbiRvdXQrPSc8L3RkPjwvdHI+IDx0cj48dGQ+5oql5ZCN6K++5pe2PC90ZD48dGQgY2xhc3M9XCJ0ZHZhbHVlXCI+JztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLnRvdGFsQ2xhc3NIb3VyLSR2YWx1ZS5jbGFzc0hvdXIpO1xuJG91dCs9JzwvdGQ+PC90cj4gPHRyPjx0ZD7liankvZnor77ml7Y8L3RkPjx0ZCBjbGFzcz1cInRkdmFsdWVcIj4nO1xuJG91dCs9JGVzY2FwZSgoJHZhbHVlLnRvdGFsQ2xhc3NIb3VyLSR2YWx1ZS5jbGFzc0hvdXIpPjA/KCR2YWx1ZS50b3RhbENsYXNzSG91ci0kdmFsdWUuY2xhc3NIb3VyKTowKTtcbiRvdXQrPSc8L3RkPjwvdHI+IDwvdGFibGU+IDxkaXYgY2xhc3M9XCJmb290XCI+IDxwIGNsYXNzPVwicGxhblwiPuW3suS4iuWujCAnO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUudGVhY2hQcm9jZXNzKTtcbiRvdXQrPScvJztcbiRvdXQrPSRlc2NhcGUoJHZhbHVlLnRvdGFsQ291cnNlKTtcbiRvdXQrPScg5qyh6K++PC9wPiA8cCBjbGFzcz1cImhpbnRcIj7moLnmja7lrp7pmYXmg4XlhrXvvJrmgLvor77mrKHkvJrnlaXmnInosIPmlbQ8L3A+IDwvZGl2PiA8ZGl2IGNsYXNzPVwidG90YWxpbmZvIGZsXCI+IDxkaXYgY2xhc3M9XCJ0ZWFjaCBmbCBtbHA2XCI+IDxwIGNsYXNzPVwiZGVzYyBiZy1mZjdmMDFcIj4nO1xuJG91dCs9JGVzY2FwZSgkdmFsdWUudGVhY2hQcm9jZXNzKTtcbiRvdXQrPSc8L3A+IDxwIGNsYXNzPVwibnVtIGJnLWU4NTcwMFwiPuW3suiusuWtpuahiDwvcD4gPC9kaXY+IDxkaXYgY2xhc3M9XCJ0ZWFjaCBmciBtcnA2XCI+IDxwIGNsYXNzPVwiZGVzYyBiZy1ncmVlblwiPic7XG4kb3V0Kz0kZXNjYXBlKCR2YWx1ZS5tYWtlSG9tZVdvcmtDb3VudCk7XG4kb3V0Kz0nPC9wPiA8cCBjbGFzcz1cIm51bSBiZy1kYXJrZ3JlZW5cIj7kvZzkuJrmgLvmlbA8L3A+IDwvZGl2PiA8L2Rpdj4gJztcbn0pO1xuJG91dCs9JyAnO1xucmV0dXJuIG5ldyBTdHJpbmcoJG91dCk7XG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHBsL2NvdXJzZWluZm8udHBsXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=