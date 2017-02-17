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
/***/ function(module, exports, __webpack_require__) {

	var Lui=__webpack_require__(1);
	var lui=new Lui();
	
	//学段的下拉
	lui.initDropDownList({ warpid: "drop_demo1", width: 260, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	//属性下拉
	lui.initDropDownList({ warpid: "drop_demo2", width: 260, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	//版本的下拉
	lui.initDropDownList({ warpid: "drop_demo3", width: 260, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });
	//年级的下拉
	lui.initDropDownList({ warpid: "drop_demo4", width: 260, nameField: 'name', idField: 'id', data: [{ name: '01', id: '00', pid: '' }, { name: '02', id: '00_01', pid: '00' }, { name: '03', id: '00_02', pid: '00' }, { name: '04', id: '00_01_01', pid: '00_01' }, { name: '05', id: '00_01_02', pid: '00_01' }, { name: '06', id: '00_02_01', pid: '00_02' }, { name: '07', id: '00_02_02', pid: '00_02' }] });


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var LuiDropDownList = __webpack_require__(2);
	var LuiCheckBox = __webpack_require__(3);
	
	function Lui() {
	    //this.checkBox = null;
	    // this.initWordSpeak();
	};
	
	Lui.prototype = {
	    constructor: Lui,
	    initTree: function (p) {
	        var t = new LuiTree();
	        return t.init(p);
	    },
	    initDropDownList: function (p) {
	        var d = new LuiDropDownList();
	        return d.init(p);
	    },
	    initCheckBox: function (p) {
	        //����һ��������ȫ�ֵ�checkbox����
	        if (!this.checkBox) {
	            this.checkBox = new LuiCheckBox();
	        }
	        var c = new LuiCheckBox();
	        return c.init(p);
	
	    },
	    initWordSpeak: function (p) {
	        //����һ��������ȫ�ֵ�wordspeak����
	        if (!this.wordspeak) {
	            this.wordspeak = new LuiWordSpeak();
	        }
	        var c = new LuiWordSpeak();
	        return c.init(p);
	    }
	};
	
	module.exports = Lui;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function LuiDropDownList() {
	    this.param = null;
	    this.selector = "";
	}
	var dropcount = 1000;
	LuiDropDownList.prototype = {
	    constructor: LuiDropDownList,
	    init: function (param) {
	        this.selector = this.warpid = "#" + param.warpid;
	        var warpid = param.warpid;
	        if (!param.data) { return; }
	        var data = param.data;
	
	        var width = param.width = param.width || 180;
	        var height = param.height = param.height || 200;
	        var subtextlength = param.subtextlength = param.subtextlength || 5;
	        param.valueField = param.valueField || "id";
	        param.textField = param.textField || "name";
	        var valueField = param.valueField;
	        var textField = param.textField;
	        var selectedCallBack = param.selectedCallBack;
	        var loadedCallBack = param.loadedCallBack;
	        var zindex = param.zindex;
	        if (param.data.length === 0) {
	            var d = {};
	            d[valueField] = -1;
	            d[textField] = "";
	            data.push(d);
	            height = 0;
	        }
	
	        //设置默认值
	        var defaultValue = param.defaultValue = param.defaultValue || data[0][valueField];
	        var defaultText = param.defaultText = param.defaultValue || data[0][textField];
	        this.param = param;
	        var ulHtml = "<div class='dropdiv dn'>";
	        ulHtml += '  <ul class="dropul" style="max-height:' + height + 'px;overflow:auto;" data-id="' + defaultValue + '" data-name="' + defaultText + '">';
	
	        for (var k = 0; k < data.length; k++) {
	            var item = data[k];
	            var v = item[textField].length > subtextlength ? item[textField].substring(0, subtextlength) + "..." : item[textField];
	            var itemHtml = '<li title=' + item[textField] + ' data-index=' + k + ' data-id=' + item[valueField] + ' data-tag=\'' + JSON.stringify(data[k]) + '\'>' + v + '</li>';
	            ulHtml += itemHtml;
	        }
	        ulHtml += "</ul>";
	        ulHtml += "</div>";
	        var spanHtml = ' <span style="width: ' + width + 'px;" class="dib"><span data-type="dropdownlist_drop_span" id="span' + param.warpid + '">' + defaultText + '</span> <i class="num_down"></i></span>';
	
	        var con = $("#" + warpid);
	        con.css({ width: width });
	        con.addClass("lui_dropdownlist");
	        con.html(spanHtml);
	        con.append(ulHtml);
	        if (zindex) {
	            con.find(".dropdiv").css("z-index", zindex);
	            con.attr("zindex", zindex);
	        } else {
	            // con.find(".dropdiv").css("z-index", dropcount--);
	            // con.attr("zindex", dropcount + 1);
	        }
	        con.addClass("btn_num_updown").addClass("btn_num_updown1").addClass("dib");
	        con.attr("title", defaultText);
	        con.attr("data-id", defaultValue);
	
	        var ul = $("#" + warpid + " ul");
	        var dropdiv = $("#" + warpid + " .dropdiv");
	        var li = $("#" + warpid + " ul li");
	        var span = con.find("span[data-type='dropdownlist_drop_span']");
	        //事件
	        //下拉事件
	        con.click(function () {
	
	            if (ul.is(":visible")) {
	                // ul.slideUp(200);
	                dropdiv.slideUp(200);
	            } else {
	                $(".dropdiv").slideUp(200);
	                // dropdiv.show();
	                // ul.slideDown(200);
	                dropdiv.slideDown(200);
	            }
	            return false;
	        });
	        $("body").click(function () {
	            // ul.slideUp(200);
	            $(".dropdiv").slideUp(200);
	            // return false;
	        });
	        // con.mouseleave(function (e) {
	        //     ul.slideUp(200);
	        //     console.log(e);
	        //     return false;
	        // });
	        //选中事件
	        li.click(function () {
	            var selectedValue = $(this).attr("data-id");
	            var selectedText = $(this).html();
	            var selectedJson = $(this).attr("data-josn");
	            var alltitle = $(this).attr("title");
	            span.text(selectedText);
	            span.attr("data-id", selectedValue);
	            span.attr("data-json", selectedJson);
	            span.attr("title", alltitle);
	
	            con.attr("title", alltitle);
	            con.attr("data-id", selectedValue);
	            //选中回调事件
	            if (selectedCallBack) {
	                selectedCallBack(warpid, selectedValue, alltitle);
	            }
	            dropdiv.slideUp(200);
	            return false;
	
	        });
	        this.span = span;
	        //设置默认值
	        this.setValue(defaultValue);
	        return this;
	    },
	    getValue: function () {
	        if (this.param.data.length > 0) {
	            var span = this.span;
	            return { value: span.attr("data-id"), text: span.attr("title"), zindex: $(this.selector).attr("zindex") };
	        }
	        else {
	            return { value: -1, text: "" };
	        }
	
	    },
	    //暴露给外部的方法
	    getSelectedJsonValue: function () {
	        if (this.param.data.length > 0) {
	            var span = this.span;
	            return JSON.parse(span.attr("data-json"));
	        }
	        else {
	            return null;
	        }
	
	    },
	    setValue: function (value) {
	        var textsel = "";
	        //选中的值
	        var selItem;
	        var span = this.span;
	        for (var m = 0; m < this.param.data.length; m++) {
	            var itemsel = this.param.data[m];
	            if (itemsel[this.param.valueField] == value) {
	                textsel = itemsel[this.param.textField];
	                selItem = itemsel;
	                break;
	            }
	        }
	        span.attr("data-id", value);
	        span.attr("data-json", JSON.stringify(selItem));
	        span.attr("title", textsel);
	        $(this.selector).attr("title", textsel);
	        var selectedValue = value;
	        var selectedText = textsel;
	        var v = textsel.length > this.param.subtextlength ? textsel.substring(0, this.param.subtextlength) + "..." : textsel;
	        span.text(v);
	
	        if (this.param.loadedCallBack) {
	            this.param.loadedCallBack(containerId, selectedValue, selectedText);
	        }
	        return this;
	    }
	
	
	};
	module.exports = LuiDropDownList;

/***/ },
/* 3 */
/***/ function(module, exports) {

	
	function LuiCheckBox() {
	    this.selector = "luicheck";
	    //参数
	    this.param = {};
	}
	
	LuiCheckBox.prototype = {
	    constructor: LuiCheckBox,
	    /*
	     *warpid 容器id
	     *data 数据集，json 串 [{name:rex,val:001},{name:lilei,val:002}]
	     *展示字段   textField
	     *实际值字段 valueField
	     *回调函数 callback 参数为当前触发的复选框上绑定的数据
	     */
	    init: function (param) {
	        var cthis = this;
	        if (param && param.group) {
	            this.selector = 'luicheck[data-name="' + param.group + '"]';
	        }
	        this.param = param;
	        $(this.selector).each(function (index, item) {
	            var ischeckStyle = $(item).attr("data-checked") == 1 ? "check_sel" : "";
	            var ischeckshow = $(item).attr("data-showcheckbox") != 1;
	
	            var text = $(item).attr("data-text");
	            var h = '<i class="icon_check ' + ischeckStyle + ' "></i>';
	            var s = '<span class="check_text"  onselectstart="return false;" >' + text + '</span>';
	            h = ischeckshow ? h + s : s;
	            // if ($(item).find("icon_check").length > 0 || $(item).find("check_text").length > 0) {
	            //     return;
	            // }
	            
	            $(item).html(h);
	            $(item).css({ "cursor": "pointer" });
	            $(item).unbind("click");
	            $(item).bind("click", function () {
	                var ischeck = $(this).attr("data-checked");
	                if (ischeck == 1) {
	                    $(this).attr("data-checked", 0);
	                    $(this).children("i").removeClass("check_sel").addClass("check_def");
	                }
	                else {
	                    $(this).attr("data-checked", 1);
	                    $(this).children("i").removeClass("check_def").addClass("check_sel");
	                }
	                // alert("bind");
	                if (param&&param.callback) {
	                    var groupname = $(item).attr("data-name");
	                    var val = cthis.getJsonValue(groupname);
	                    //调用回调函数，并返回组名和所选中值得json串
	                    //param.callback(groupname, val);
	                    param.callback(item);
	                }
	            });
	
	        });
	        return this;
	
	
	    },
	    //设置checkbox组哪些值被选中
	    setValue: function (name, val) {
	        $(this.selector).filter('[data-name="' + name + '"]').filter('[data-val="' + val + '"]').each(function (index, item) {
	            var ischeck = $(item).attr("data-checked");
	            if (ischeck == 1) {
	            }
	            else {
	                $(item).click();
	            }
	
	        });
	    },
	    //获取checkbox组选中的值
	    getValue: function (name) {
	        var r = [];
	        $(this.selector).filter('[data-name="' + name + '"]').each(function (index, item) {
	            var ischeck = $(item).attr("data-checked");
	
	            if (ischeck == 1) {
	                r.push($(item).attr("data-val"));
	            }
	
	
	        });
	        alert(r.join(','));
	    },
	    //获取checkbox组选中的值
	    getJsonValue: function (name) {
	        var r = [];
	        $(this.selector).filter('[data-name="' + name + '"]').each(function (index, item) {
	            var ischeck = $(item).attr("data-checked");
	            if (ischeck == 1) {
	                var jsonstr = $(item).attr("data-json");
	                if (jsonstr) {
	                    r.push(JSON.parse(unescape(jsonstr)));
	                }
	            }
	        });
	        return r;
	    },
	    /**判断当前 checkbox 是否选中 */
	    ischeck: function (name, val) {
	        var item = $(this.selector).filter('[data-name="' + name + '"]').filter('[data-val="' + val + '"]')[0];
	        var ischeck = $(item).attr("data-checked");
	        return ischeck == 1;
	    },
	    /**判断当前 checkbox 是否选中 */
	    ischeckElement: function (item) {
	        var ischeck = $(item).attr("data-checked");
	        return ischeck == 1;
	    },
	    /**模拟单击 只改变样式 */
	    setClickStyle: function (item) {
	        var ischeck = $(item).attr("data-checked");
	        if (ischeck == 1) {
	            $(item).attr("data-checked", 0);
	            $(item).children("i").removeClass("check_sel");
	        }
	        else {
	            $(item).attr("data-checked", 1);
	            $(item).children("i").addClass("check_sel");
	        }
	    }
	};
	module.exports=LuiCheckBox;

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjEwNjE0OGQwNTc5NDA4MDBmZjU/ZjEwMioqKioqKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2JhY2tTdGFnZS9jbGFzcy1tYW5hZ2VtZW50LWNyZWF0Qm9vay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvTFVJL2pzL2x1aS5qcz9lNzkwKioqKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL0xVSS9qcy9kcm9wZG93bmxpc3QuanM/ZmVmMCoqKioqIiwid2VicGFjazovLy8uL3NyYy9MVUkvanMvY2hlY2tib3guanM/NjE2ZCoqKioqIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7O0FBRUE7QUFDQSx1QkFBc0IsNkVBQTZFLGdDQUFnQyxHQUFHLHFDQUFxQyxHQUFHLHFDQUFxQyxHQUFHLDJDQUEyQyxHQUFHLDJDQUEyQyxHQUFHLDJDQUEyQyxHQUFHLDJDQUEyQyxHQUFHO0FBQzlZO0FBQ0EsdUJBQXNCLDZFQUE2RSxnQ0FBZ0MsR0FBRyxxQ0FBcUMsR0FBRyxxQ0FBcUMsR0FBRywyQ0FBMkMsR0FBRywyQ0FBMkMsR0FBRywyQ0FBMkMsR0FBRywyQ0FBMkMsR0FBRztBQUM5WTtBQUNBLHVCQUFzQiw2RUFBNkUsZ0NBQWdDLEdBQUcscUNBQXFDLEdBQUcscUNBQXFDLEdBQUcsMkNBQTJDLEdBQUcsMkNBQTJDLEdBQUcsMkNBQTJDLEdBQUcsMkNBQTJDLEdBQUc7QUFDOVk7QUFDQSx1QkFBc0IsNkVBQTZFLGdDQUFnQyxHQUFHLHFDQUFxQyxHQUFHLHFDQUFxQyxHQUFHLDJDQUEyQyxHQUFHLDJDQUEy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QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QiIsImZpbGUiOiJiYWNrU3RhZ2UvY2xhc3MtbWFuYWdlbWVudC1jcmVhdEJvb2suanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MTA2MTQ4ZDA1Nzk0MDgwMGZmNSIsInZhciBMdWk9cmVxdWlyZSgnLi4vLi4vTFVJL2pzL2x1aScpO1xyXG52YXIgbHVpPW5ldyBMdWkoKTtcclxuXHJcbi8v5a2m5q6155qE5LiL5ouJXHJcbmx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfZGVtbzFcIiwgd2lkdGg6IDI2MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICcwMScsIGlkOiAnMDAnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJzAyJywgaWQ6ICcwMF8wMScsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICcwMycsIGlkOiAnMDBfMDInLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDQnLCBpZDogJzAwXzAxXzAxJywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJzA1JywgaWQ6ICcwMF8wMV8wMicsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNicsIGlkOiAnMDBfMDJfMDEnLCBwaWQ6ICcwMF8wMicgfSwgeyBuYW1lOiAnMDcnLCBpZDogJzAwXzAyXzAyJywgcGlkOiAnMDBfMDInIH1dIH0pO1xyXG4vL+WxnuaAp+S4i+aLiVxyXG5sdWkuaW5pdERyb3BEb3duTGlzdCh7IHdhcnBpZDogXCJkcm9wX2RlbW8yXCIsIHdpZHRoOiAyNjAsIG5hbWVGaWVsZDogJ25hbWUnLCBpZEZpZWxkOiAnaWQnLCBkYXRhOiBbeyBuYW1lOiAnMDEnLCBpZDogJzAwJywgcGlkOiAnJyB9LCB7IG5hbWU6ICcwMicsIGlkOiAnMDBfMDEnLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDMnLCBpZDogJzAwXzAyJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJzA0JywgaWQ6ICcwMF8wMV8wMScsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNScsIGlkOiAnMDBfMDFfMDInLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAnMDYnLCBpZDogJzAwXzAyXzAxJywgcGlkOiAnMDBfMDInIH0sIHsgbmFtZTogJzA3JywgaWQ6ICcwMF8wMl8wMicsIHBpZDogJzAwXzAyJyB9XSB9KTtcclxuLy/niYjmnKznmoTkuIvmi4lcclxubHVpLmluaXREcm9wRG93bkxpc3QoeyB3YXJwaWQ6IFwiZHJvcF9kZW1vM1wiLCB3aWR0aDogMjYwLCBuYW1lRmllbGQ6ICduYW1lJywgaWRGaWVsZDogJ2lkJywgZGF0YTogW3sgbmFtZTogJzAxJywgaWQ6ICcwMCcsIHBpZDogJycgfSwgeyBuYW1lOiAnMDInLCBpZDogJzAwXzAxJywgcGlkOiAnMDAnIH0sIHsgbmFtZTogJzAzJywgaWQ6ICcwMF8wMicsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICcwNCcsIGlkOiAnMDBfMDFfMDEnLCBwaWQ6ICcwMF8wMScgfSwgeyBuYW1lOiAnMDUnLCBpZDogJzAwXzAxXzAyJywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJzA2JywgaWQ6ICcwMF8wMl8wMScsIHBpZDogJzAwXzAyJyB9LCB7IG5hbWU6ICcwNycsIGlkOiAnMDBfMDJfMDInLCBwaWQ6ICcwMF8wMicgfV0gfSk7XHJcbi8v5bm057qn55qE5LiL5ouJXHJcbmx1aS5pbml0RHJvcERvd25MaXN0KHsgd2FycGlkOiBcImRyb3BfZGVtbzRcIiwgd2lkdGg6IDI2MCwgbmFtZUZpZWxkOiAnbmFtZScsIGlkRmllbGQ6ICdpZCcsIGRhdGE6IFt7IG5hbWU6ICcwMScsIGlkOiAnMDAnLCBwaWQ6ICcnIH0sIHsgbmFtZTogJzAyJywgaWQ6ICcwMF8wMScsIHBpZDogJzAwJyB9LCB7IG5hbWU6ICcwMycsIGlkOiAnMDBfMDInLCBwaWQ6ICcwMCcgfSwgeyBuYW1lOiAnMDQnLCBpZDogJzAwXzAxXzAxJywgcGlkOiAnMDBfMDEnIH0sIHsgbmFtZTogJzA1JywgaWQ6ICcwMF8wMV8wMicsIHBpZDogJzAwXzAxJyB9LCB7IG5hbWU6ICcwNicsIGlkOiAnMDBfMDJfMDEnLCBwaWQ6ICcwMF8wMicgfSwgeyBuYW1lOiAnMDcnLCBpZDogJzAwXzAyXzAyJywgcGlkOiAnMDBfMDInIH1dIH0pO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9qcy9iYWNrU3RhZ2UvY2xhc3MtbWFuYWdlbWVudC1jcmVhdEJvb2suanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAxMCIsInZhciBMdWlEcm9wRG93bkxpc3QgPSByZXF1aXJlKCcuLi9qcy9kcm9wZG93bmxpc3QnKTtcclxudmFyIEx1aUNoZWNrQm94ID0gcmVxdWlyZSgnLi4vanMvY2hlY2tib3gnKTtcclxuXHJcbmZ1bmN0aW9uIEx1aSgpIHtcclxuICAgIC8vdGhpcy5jaGVja0JveCA9IG51bGw7XHJcbiAgICAvLyB0aGlzLmluaXRXb3JkU3BlYWsoKTtcclxufTtcclxuXHJcbkx1aS5wcm90b3R5cGUgPSB7XHJcbiAgICBjb25zdHJ1Y3RvcjogTHVpLFxyXG4gICAgaW5pdFRyZWU6IGZ1bmN0aW9uIChwKSB7XHJcbiAgICAgICAgdmFyIHQgPSBuZXcgTHVpVHJlZSgpO1xyXG4gICAgICAgIHJldHVybiB0LmluaXQocCk7XHJcbiAgICB9LFxyXG4gICAgaW5pdERyb3BEb3duTGlzdDogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICB2YXIgZCA9IG5ldyBMdWlEcm9wRG93bkxpc3QoKTtcclxuICAgICAgICByZXR1cm4gZC5pbml0KHApO1xyXG4gICAgfSxcclxuICAgIGluaXRDaGVja0JveDogZnVuY3Rpb24gKHApIHtcclxuICAgICAgICAvL++/ve+/ve+/ve+/vdK777+977+977+977+977+977+977+977+9yKvvv73Wte+/vWNoZWNrYm9477+977+977+977+9XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoZWNrQm94KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tCb3ggPSBuZXcgTHVpQ2hlY2tCb3goKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGMgPSBuZXcgTHVpQ2hlY2tCb3goKTtcclxuICAgICAgICByZXR1cm4gYy5pbml0KHApO1xyXG5cclxuICAgIH0sXHJcbiAgICBpbml0V29yZFNwZWFrOiBmdW5jdGlvbiAocCkge1xyXG4gICAgICAgIC8v77+977+977+977+90rvvv73vv73vv73vv73vv73vv73vv73vv73Iq++/vda177+9d29yZHNwZWFr77+977+977+977+9XHJcbiAgICAgICAgaWYgKCF0aGlzLndvcmRzcGVhaykge1xyXG4gICAgICAgICAgICB0aGlzLndvcmRzcGVhayA9IG5ldyBMdWlXb3JkU3BlYWsoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGMgPSBuZXcgTHVpV29yZFNwZWFrKCk7XHJcbiAgICAgICAgcmV0dXJuIGMuaW5pdChwKTtcclxuICAgIH1cclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTHVpO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvanMvbHVpLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIiwiZnVuY3Rpb24gTHVpRHJvcERvd25MaXN0KCkge1xyXG4gICAgdGhpcy5wYXJhbSA9IG51bGw7XHJcbiAgICB0aGlzLnNlbGVjdG9yID0gXCJcIjtcclxufVxyXG52YXIgZHJvcGNvdW50ID0gMTAwMDtcclxuTHVpRHJvcERvd25MaXN0LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWlEcm9wRG93bkxpc3QsXHJcbiAgICBpbml0OiBmdW5jdGlvbiAocGFyYW0pIHtcclxuICAgICAgICB0aGlzLnNlbGVjdG9yID0gdGhpcy53YXJwaWQgPSBcIiNcIiArIHBhcmFtLndhcnBpZDtcclxuICAgICAgICB2YXIgd2FycGlkID0gcGFyYW0ud2FycGlkO1xyXG4gICAgICAgIGlmICghcGFyYW0uZGF0YSkgeyByZXR1cm47IH1cclxuICAgICAgICB2YXIgZGF0YSA9IHBhcmFtLmRhdGE7XHJcblxyXG4gICAgICAgIHZhciB3aWR0aCA9IHBhcmFtLndpZHRoID0gcGFyYW0ud2lkdGggfHwgMTgwO1xyXG4gICAgICAgIHZhciBoZWlnaHQgPSBwYXJhbS5oZWlnaHQgPSBwYXJhbS5oZWlnaHQgfHwgMjAwO1xyXG4gICAgICAgIHZhciBzdWJ0ZXh0bGVuZ3RoID0gcGFyYW0uc3VidGV4dGxlbmd0aCA9IHBhcmFtLnN1YnRleHRsZW5ndGggfHwgNTtcclxuICAgICAgICBwYXJhbS52YWx1ZUZpZWxkID0gcGFyYW0udmFsdWVGaWVsZCB8fCBcImlkXCI7XHJcbiAgICAgICAgcGFyYW0udGV4dEZpZWxkID0gcGFyYW0udGV4dEZpZWxkIHx8IFwibmFtZVwiO1xyXG4gICAgICAgIHZhciB2YWx1ZUZpZWxkID0gcGFyYW0udmFsdWVGaWVsZDtcclxuICAgICAgICB2YXIgdGV4dEZpZWxkID0gcGFyYW0udGV4dEZpZWxkO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZENhbGxCYWNrID0gcGFyYW0uc2VsZWN0ZWRDYWxsQmFjaztcclxuICAgICAgICB2YXIgbG9hZGVkQ2FsbEJhY2sgPSBwYXJhbS5sb2FkZWRDYWxsQmFjaztcclxuICAgICAgICB2YXIgemluZGV4ID0gcGFyYW0uemluZGV4O1xyXG4gICAgICAgIGlmIChwYXJhbS5kYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICB2YXIgZCA9IHt9O1xyXG4gICAgICAgICAgICBkW3ZhbHVlRmllbGRdID0gLTE7XHJcbiAgICAgICAgICAgIGRbdGV4dEZpZWxkXSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaChkKTtcclxuICAgICAgICAgICAgaGVpZ2h0ID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6K6+572u6buY6K6k5YC8XHJcbiAgICAgICAgdmFyIGRlZmF1bHRWYWx1ZSA9IHBhcmFtLmRlZmF1bHRWYWx1ZSA9IHBhcmFtLmRlZmF1bHRWYWx1ZSB8fCBkYXRhWzBdW3ZhbHVlRmllbGRdO1xyXG4gICAgICAgIHZhciBkZWZhdWx0VGV4dCA9IHBhcmFtLmRlZmF1bHRUZXh0ID0gcGFyYW0uZGVmYXVsdFZhbHVlIHx8IGRhdGFbMF1bdGV4dEZpZWxkXTtcclxuICAgICAgICB0aGlzLnBhcmFtID0gcGFyYW07XHJcbiAgICAgICAgdmFyIHVsSHRtbCA9IFwiPGRpdiBjbGFzcz0nZHJvcGRpdiBkbic+XCI7XHJcbiAgICAgICAgdWxIdG1sICs9ICcgIDx1bCBjbGFzcz1cImRyb3B1bFwiIHN0eWxlPVwibWF4LWhlaWdodDonICsgaGVpZ2h0ICsgJ3B4O292ZXJmbG93OmF1dG87XCIgZGF0YS1pZD1cIicgKyBkZWZhdWx0VmFsdWUgKyAnXCIgZGF0YS1uYW1lPVwiJyArIGRlZmF1bHRUZXh0ICsgJ1wiPic7XHJcblxyXG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgZGF0YS5sZW5ndGg7IGsrKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFba107XHJcbiAgICAgICAgICAgIHZhciB2ID0gaXRlbVt0ZXh0RmllbGRdLmxlbmd0aCA+IHN1YnRleHRsZW5ndGggPyBpdGVtW3RleHRGaWVsZF0uc3Vic3RyaW5nKDAsIHN1YnRleHRsZW5ndGgpICsgXCIuLi5cIiA6IGl0ZW1bdGV4dEZpZWxkXTtcclxuICAgICAgICAgICAgdmFyIGl0ZW1IdG1sID0gJzxsaSB0aXRsZT0nICsgaXRlbVt0ZXh0RmllbGRdICsgJyBkYXRhLWluZGV4PScgKyBrICsgJyBkYXRhLWlkPScgKyBpdGVtW3ZhbHVlRmllbGRdICsgJyBkYXRhLXRhZz1cXCcnICsgSlNPTi5zdHJpbmdpZnkoZGF0YVtrXSkgKyAnXFwnPicgKyB2ICsgJzwvbGk+JztcclxuICAgICAgICAgICAgdWxIdG1sICs9IGl0ZW1IdG1sO1xyXG4gICAgICAgIH1cclxuICAgICAgICB1bEh0bWwgKz0gXCI8L3VsPlwiO1xyXG4gICAgICAgIHVsSHRtbCArPSBcIjwvZGl2PlwiO1xyXG4gICAgICAgIHZhciBzcGFuSHRtbCA9ICcgPHNwYW4gc3R5bGU9XCJ3aWR0aDogJyArIHdpZHRoICsgJ3B4O1wiIGNsYXNzPVwiZGliXCI+PHNwYW4gZGF0YS10eXBlPVwiZHJvcGRvd25saXN0X2Ryb3Bfc3BhblwiIGlkPVwic3BhbicgKyBwYXJhbS53YXJwaWQgKyAnXCI+JyArIGRlZmF1bHRUZXh0ICsgJzwvc3Bhbj4gPGkgY2xhc3M9XCJudW1fZG93blwiPjwvaT48L3NwYW4+JztcclxuXHJcbiAgICAgICAgdmFyIGNvbiA9ICQoXCIjXCIgKyB3YXJwaWQpO1xyXG4gICAgICAgIGNvbi5jc3MoeyB3aWR0aDogd2lkdGggfSk7XHJcbiAgICAgICAgY29uLmFkZENsYXNzKFwibHVpX2Ryb3Bkb3dubGlzdFwiKTtcclxuICAgICAgICBjb24uaHRtbChzcGFuSHRtbCk7XHJcbiAgICAgICAgY29uLmFwcGVuZCh1bEh0bWwpO1xyXG4gICAgICAgIGlmICh6aW5kZXgpIHtcclxuICAgICAgICAgICAgY29uLmZpbmQoXCIuZHJvcGRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIHppbmRleCk7XHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwiemluZGV4XCIsIHppbmRleCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gY29uLmZpbmQoXCIuZHJvcGRpdlwiKS5jc3MoXCJ6LWluZGV4XCIsIGRyb3Bjb3VudC0tKTtcclxuICAgICAgICAgICAgLy8gY29uLmF0dHIoXCJ6aW5kZXhcIiwgZHJvcGNvdW50ICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbi5hZGRDbGFzcyhcImJ0bl9udW1fdXBkb3duXCIpLmFkZENsYXNzKFwiYnRuX251bV91cGRvd24xXCIpLmFkZENsYXNzKFwiZGliXCIpO1xyXG4gICAgICAgIGNvbi5hdHRyKFwidGl0bGVcIiwgZGVmYXVsdFRleHQpO1xyXG4gICAgICAgIGNvbi5hdHRyKFwiZGF0YS1pZFwiLCBkZWZhdWx0VmFsdWUpO1xyXG5cclxuICAgICAgICB2YXIgdWwgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgdWxcIik7XHJcbiAgICAgICAgdmFyIGRyb3BkaXYgPSAkKFwiI1wiICsgd2FycGlkICsgXCIgLmRyb3BkaXZcIik7XHJcbiAgICAgICAgdmFyIGxpID0gJChcIiNcIiArIHdhcnBpZCArIFwiIHVsIGxpXCIpO1xyXG4gICAgICAgIHZhciBzcGFuID0gY29uLmZpbmQoXCJzcGFuW2RhdGEtdHlwZT0nZHJvcGRvd25saXN0X2Ryb3Bfc3BhbiddXCIpO1xyXG4gICAgICAgIC8v5LqL5Lu2XHJcbiAgICAgICAgLy/kuIvmi4nkuovku7ZcclxuICAgICAgICBjb24uY2xpY2soZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHVsLmlzKFwiOnZpc2libGVcIikpIHtcclxuICAgICAgICAgICAgICAgIC8vIHVsLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJChcIi5kcm9wZGl2XCIpLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgICAgIC8vIGRyb3BkaXYuc2hvdygpO1xyXG4gICAgICAgICAgICAgICAgLy8gdWwuc2xpZGVEb3duKDIwMCk7XHJcbiAgICAgICAgICAgICAgICBkcm9wZGl2LnNsaWRlRG93bigyMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKFwiYm9keVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIHVsLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgJChcIi5kcm9wZGl2XCIpLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGNvbi5tb3VzZWxlYXZlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLy8gICAgIHVsLnNsaWRlVXAoMjAwKTtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyB9KTtcclxuICAgICAgICAvL+mAieS4reS6i+S7tlxyXG4gICAgICAgIGxpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkVmFsdWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWlkXCIpO1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gJCh0aGlzKS5odG1sKCk7XHJcbiAgICAgICAgICAgIHZhciBzZWxlY3RlZEpzb24gPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWpvc25cIik7XHJcbiAgICAgICAgICAgIHZhciBhbGx0aXRsZSA9ICQodGhpcykuYXR0cihcInRpdGxlXCIpO1xyXG4gICAgICAgICAgICBzcGFuLnRleHQoc2VsZWN0ZWRUZXh0KTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1pZFwiLCBzZWxlY3RlZFZhbHVlKTtcclxuICAgICAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1qc29uXCIsIHNlbGVjdGVkSnNvbik7XHJcbiAgICAgICAgICAgIHNwYW4uYXR0cihcInRpdGxlXCIsIGFsbHRpdGxlKTtcclxuXHJcbiAgICAgICAgICAgIGNvbi5hdHRyKFwidGl0bGVcIiwgYWxsdGl0bGUpO1xyXG4gICAgICAgICAgICBjb24uYXR0cihcImRhdGEtaWRcIiwgc2VsZWN0ZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgIC8v6YCJ5Lit5Zue6LCD5LqL5Lu2XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZENhbGxCYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZENhbGxCYWNrKHdhcnBpZCwgc2VsZWN0ZWRWYWx1ZSwgYWxsdGl0bGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRyb3BkaXYuc2xpZGVVcCgyMDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc3BhbiA9IHNwYW47XHJcbiAgICAgICAgLy/orr7nva7pu5jorqTlgLxcclxuICAgICAgICB0aGlzLnNldFZhbHVlKGRlZmF1bHRWYWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9LFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5kYXRhLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBzcGFuLmF0dHIoXCJkYXRhLWlkXCIpLCB0ZXh0OiBzcGFuLmF0dHIoXCJ0aXRsZVwiKSwgemluZGV4OiAkKHRoaXMuc2VsZWN0b3IpLmF0dHIoXCJ6aW5kZXhcIikgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiAtMSwgdGV4dDogXCJcIiB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9LFxyXG4gICAgLy/mmrTpnLLnu5nlpJbpg6jnmoTmlrnms5VcclxuICAgIGdldFNlbGVjdGVkSnNvblZhbHVlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFyYW0uZGF0YS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHZhciBzcGFuID0gdGhpcy5zcGFuO1xyXG4gICAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShzcGFuLmF0dHIoXCJkYXRhLWpzb25cIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgdmFyIHRleHRzZWwgPSBcIlwiO1xyXG4gICAgICAgIC8v6YCJ5Lit55qE5YC8XHJcbiAgICAgICAgdmFyIHNlbEl0ZW07XHJcbiAgICAgICAgdmFyIHNwYW4gPSB0aGlzLnNwYW47XHJcbiAgICAgICAgZm9yICh2YXIgbSA9IDA7IG0gPCB0aGlzLnBhcmFtLmRhdGEubGVuZ3RoOyBtKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1zZWwgPSB0aGlzLnBhcmFtLmRhdGFbbV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtc2VsW3RoaXMucGFyYW0udmFsdWVGaWVsZF0gPT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRleHRzZWwgPSBpdGVtc2VsW3RoaXMucGFyYW0udGV4dEZpZWxkXTtcclxuICAgICAgICAgICAgICAgIHNlbEl0ZW0gPSBpdGVtc2VsO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1pZFwiLCB2YWx1ZSk7XHJcbiAgICAgICAgc3Bhbi5hdHRyKFwiZGF0YS1qc29uXCIsIEpTT04uc3RyaW5naWZ5KHNlbEl0ZW0pKTtcclxuICAgICAgICBzcGFuLmF0dHIoXCJ0aXRsZVwiLCB0ZXh0c2VsKTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmF0dHIoXCJ0aXRsZVwiLCB0ZXh0c2VsKTtcclxuICAgICAgICB2YXIgc2VsZWN0ZWRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHZhciBzZWxlY3RlZFRleHQgPSB0ZXh0c2VsO1xyXG4gICAgICAgIHZhciB2ID0gdGV4dHNlbC5sZW5ndGggPiB0aGlzLnBhcmFtLnN1YnRleHRsZW5ndGggPyB0ZXh0c2VsLnN1YnN0cmluZygwLCB0aGlzLnBhcmFtLnN1YnRleHRsZW5ndGgpICsgXCIuLi5cIiA6IHRleHRzZWw7XHJcbiAgICAgICAgc3Bhbi50ZXh0KHYpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5wYXJhbS5sb2FkZWRDYWxsQmFjaykge1xyXG4gICAgICAgICAgICB0aGlzLnBhcmFtLmxvYWRlZENhbGxCYWNrKGNvbnRhaW5lcklkLCBzZWxlY3RlZFZhbHVlLCBzZWxlY3RlZFRleHQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcblxyXG59O1xyXG5tb2R1bGUuZXhwb3J0cyA9IEx1aURyb3BEb3duTGlzdDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9MVUkvanMvZHJvcGRvd25saXN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAyIDQgNyA4IDEwIDEyIDEzIDE5IDIwIDIxIDI2IDI3IDI4IDQzIiwiXHJcbmZ1bmN0aW9uIEx1aUNoZWNrQm94KCkge1xyXG4gICAgdGhpcy5zZWxlY3RvciA9IFwibHVpY2hlY2tcIjtcclxuICAgIC8v5Y+C5pWwXHJcbiAgICB0aGlzLnBhcmFtID0ge307XHJcbn1cclxuXHJcbkx1aUNoZWNrQm94LnByb3RvdHlwZSA9IHtcclxuICAgIGNvbnN0cnVjdG9yOiBMdWlDaGVja0JveCxcclxuICAgIC8qXHJcbiAgICAgKndhcnBpZCDlrrnlmahpZFxyXG4gICAgICpkYXRhIOaVsOaNrumbhu+8jGpzb24g5LiyIFt7bmFtZTpyZXgsdmFsOjAwMX0se25hbWU6bGlsZWksdmFsOjAwMn1dXHJcbiAgICAgKuWxleekuuWtl+autSAgIHRleHRGaWVsZFxyXG4gICAgICrlrp7pmYXlgLzlrZfmrrUgdmFsdWVGaWVsZFxyXG4gICAgICrlm57osIPlh73mlbAgY2FsbGJhY2sg5Y+C5pWw5Li65b2T5YmN6Kem5Y+R55qE5aSN6YCJ5qGG5LiK57uR5a6a55qE5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGluaXQ6IGZ1bmN0aW9uIChwYXJhbSkge1xyXG4gICAgICAgIHZhciBjdGhpcyA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHBhcmFtICYmIHBhcmFtLmdyb3VwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSAnbHVpY2hlY2tbZGF0YS1uYW1lPVwiJyArIHBhcmFtLmdyb3VwICsgJ1wiXSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrU3R5bGUgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIikgPT0gMSA/IFwiY2hlY2tfc2VsXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICB2YXIgaXNjaGVja3Nob3cgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLXNob3djaGVja2JveFwiKSAhPSAxO1xyXG5cclxuICAgICAgICAgICAgdmFyIHRleHQgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLXRleHRcIik7XHJcbiAgICAgICAgICAgIHZhciBoID0gJzxpIGNsYXNzPVwiaWNvbl9jaGVjayAnICsgaXNjaGVja1N0eWxlICsgJyBcIj48L2k+JztcclxuICAgICAgICAgICAgdmFyIHMgPSAnPHNwYW4gY2xhc3M9XCJjaGVja190ZXh0XCIgIG9uc2VsZWN0c3RhcnQ9XCJyZXR1cm4gZmFsc2U7XCIgPicgKyB0ZXh0ICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgICAgICBoID0gaXNjaGVja3Nob3cgPyBoICsgcyA6IHM7XHJcbiAgICAgICAgICAgIC8vIGlmICgkKGl0ZW0pLmZpbmQoXCJpY29uX2NoZWNrXCIpLmxlbmd0aCA+IDAgfHwgJChpdGVtKS5maW5kKFwiY2hlY2tfdGV4dFwiKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIC8vICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoaXRlbSkuaHRtbChoKTtcclxuICAgICAgICAgICAgJChpdGVtKS5jc3MoeyBcImN1cnNvclwiOiBcInBvaW50ZXJcIiB9KTtcclxuICAgICAgICAgICAgJChpdGVtKS51bmJpbmQoXCJjbGlja1wiKTtcclxuICAgICAgICAgICAgJChpdGVtKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oXCJpXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tfc2VsXCIpLmFkZENsYXNzKFwiY2hlY2tfZGVmXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuY2hpbGRyZW4oXCJpXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tfZGVmXCIpLmFkZENsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gYWxlcnQoXCJiaW5kXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtJiZwYXJhbS5jYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBncm91cG5hbWUgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLW5hbWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGN0aGlzLmdldEpzb25WYWx1ZShncm91cG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8v6LCD55So5Zue6LCD5Ye95pWw77yM5bm26L+U5Zue57uE5ZCN5ZKM5omA6YCJ5Lit5YC85b6XanNvbuS4slxyXG4gICAgICAgICAgICAgICAgICAgIC8vcGFyYW0uY2FsbGJhY2soZ3JvdXBuYW1lLCB2YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLmNhbGxiYWNrKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcblxyXG5cclxuICAgIH0sXHJcbiAgICAvL+iuvue9rmNoZWNrYm9457uE5ZOq5Lqb5YC86KKr6YCJ5LitXHJcbiAgICBzZXRWYWx1ZTogZnVuY3Rpb24gKG5hbWUsIHZhbCkge1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZmlsdGVyKCdbZGF0YS12YWw9XCInICsgdmFsICsgJ1wiXScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG4gICAgICAgICAgICBpZiAoaXNjaGVjayA9PSAxKSB7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkKGl0ZW0pLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9LFxyXG4gICAgLy/ojrflj5ZjaGVja2JveOe7hOmAieS4reeahOWAvFxyXG4gICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICAgICAgdmFyIHIgPSBbXTtcclxuICAgICAgICAkKHRoaXMuc2VsZWN0b3IpLmZpbHRlcignW2RhdGEtbmFtZT1cIicgKyBuYW1lICsgJ1wiXScpLmVhY2goZnVuY3Rpb24gKGluZGV4LCBpdGVtKSB7XHJcbiAgICAgICAgICAgIHZhciBpc2NoZWNrID0gJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAgICAgci5wdXNoKCQoaXRlbSkuYXR0cihcImRhdGEtdmFsXCIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYWxlcnQoci5qb2luKCcsJykpO1xyXG4gICAgfSxcclxuICAgIC8v6I635Y+WY2hlY2tib3jnu4TpgInkuK3nmoTlgLxcclxuICAgIGdldEpzb25WYWx1ZTogZnVuY3Rpb24gKG5hbWUpIHtcclxuICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgICQodGhpcy5zZWxlY3RvcikuZmlsdGVyKCdbZGF0YS1uYW1lPVwiJyArIG5hbWUgKyAnXCJdJykuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGl0ZW0pIHtcclxuICAgICAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgICAgIGlmIChpc2NoZWNrID09IDEpIHtcclxuICAgICAgICAgICAgICAgIHZhciBqc29uc3RyID0gJChpdGVtKS5hdHRyKFwiZGF0YS1qc29uXCIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25zdHIpIHtcclxuICAgICAgICAgICAgICAgICAgICByLnB1c2goSlNPTi5wYXJzZSh1bmVzY2FwZShqc29uc3RyKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHI7XHJcbiAgICB9LFxyXG4gICAgLyoq5Yik5pat5b2T5YmNIGNoZWNrYm94IOaYr+WQpumAieS4rSAqL1xyXG4gICAgaXNjaGVjazogZnVuY3Rpb24gKG5hbWUsIHZhbCkge1xyXG4gICAgICAgIHZhciBpdGVtID0gJCh0aGlzLnNlbGVjdG9yKS5maWx0ZXIoJ1tkYXRhLW5hbWU9XCInICsgbmFtZSArICdcIl0nKS5maWx0ZXIoJ1tkYXRhLXZhbD1cIicgKyB2YWwgKyAnXCJdJylbMF07XHJcbiAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgcmV0dXJuIGlzY2hlY2sgPT0gMTtcclxuICAgIH0sXHJcbiAgICAvKirliKTmlq3lvZPliY0gY2hlY2tib3gg5piv5ZCm6YCJ5LitICovXHJcbiAgICBpc2NoZWNrRWxlbWVudDogZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB2YXIgaXNjaGVjayA9ICQoaXRlbSkuYXR0cihcImRhdGEtY2hlY2tlZFwiKTtcclxuICAgICAgICByZXR1cm4gaXNjaGVjayA9PSAxO1xyXG4gICAgfSxcclxuICAgIC8qKuaooeaLn+WNleWHuyDlj6rmlLnlj5jmoLflvI8gKi9cclxuICAgIHNldENsaWNrU3R5bGU6IGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgdmFyIGlzY2hlY2sgPSAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIik7XHJcbiAgICAgICAgaWYgKGlzY2hlY2sgPT0gMSkge1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmF0dHIoXCJkYXRhLWNoZWNrZWRcIiwgMCk7XHJcbiAgICAgICAgICAgICQoaXRlbSkuY2hpbGRyZW4oXCJpXCIpLnJlbW92ZUNsYXNzKFwiY2hlY2tfc2VsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgJChpdGVtKS5hdHRyKFwiZGF0YS1jaGVja2VkXCIsIDEpO1xyXG4gICAgICAgICAgICAkKGl0ZW0pLmNoaWxkcmVuKFwiaVwiKS5hZGRDbGFzcyhcImNoZWNrX3NlbFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbm1vZHVsZS5leHBvcnRzPUx1aUNoZWNrQm94O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL0xVSS9qcy9jaGVja2JveC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMiA0IDcgOCAxMCAxMiAxMyAxOSAyMCAyMSAyNiAyNyAyOCA0MyJdLCJzb3VyY2VSb290IjoiIn0=