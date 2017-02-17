//var template = require('./template');
var template = require('tmodjs-loader/runtime');

/** 
 * 对日期进行格式化， 
 * @param date 要格式化的日期 
 * @param format 进行格式化的模式字符串
 *     支持的模式字母有： 
 *     y:年, 
 *     M:年中的月份(1-12), 
 *     d:月份中的天(1-31), 
 *     h:小时(0-23), 
 *     m:分(0-59), 
 *     s:秒(0-59), 
 *     S:毫秒(0-999),
 *     q:季度(1-4)
 * @return String
 * @author yanis.wang
 * @see	http://yaniswang.com/frontend/2013/02/16/dateformat-performance/
 */

//时间转换
template.helper('dateFormat', function (date, format) {
    date = new Date(parseInt(date.replace("/Date(", "").replace(")/", ""), 10));
    //return date.getDate();
   //date = new Date(date);

    var map = {
        "y": date.getYear(),
        "M": date.getMonth() + 1, //月份 
        "d": date.getDate(), //日 
        "h": date.getHours(), //小时 
        "m": date.getMinutes(), //分 
        "s": date.getSeconds(), //秒 
        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
        var v = map[t];
        if(v !== undefined){
            if(all.length > 1){
                v = '0' + v;
                v = v.substr(v.length-2);
            }
            return v;
        }
        else if(t === 'y'){
            return (date.getFullYear() + '').substr(4 - all.length);
        }
        return all;
    });
    return format;
});

//截字处理
template.helper('cutchar', function (obj, charlength) {

    if (obj == null) {
        return "";
    }
    if (obj.length > parseInt(charlength)) {
        obj = obj.substring(0, parseInt(charlength)) + "...";
        return obj;
    }
    return obj;

});

//教研评级
template.helper('TeachTypeTran', function (obj) {

    if (obj == 1) {
        return "A级";
    } else {
        return "B级";
    }
});

//合同期限转换
template.helper('HtQx', function (obj) {

    return template.helper(obj) + "年";
});

//年级
template.helper('GetBigGrade', function (e) {
    return e == 1 ? "一年级"
        : e == 2 ? "二年级"
        : e == 3 ? "三年级"
        : e == 4 ? "四年级"
        : e == 5 ? "五年级"
        : e == 6 ? "六年级"
        : e == 7 ? "七年级"
        : e == 8 ? "八年级"
        : e == 9 ? "九年级"
         : e == 10 ? "高一"
        : e == 11 ? "高二"
        : e == 12 ? "高三"
        : "";

});


//大写的转换
template.helper('GetBigW', function (e) {
    return e == 1 ? "一"
        : e == 2 ? "二"
        : e == 3 ? "三"
        : e == 4 ? "四"
        : e == 5 ? "五"
        : e == 6 ? "六"
        : e == 7 ? "七"
        : e == 8 ? "八"
        : e == 9 ? "九"
        : e == 10 ? "十"
        : e == 11 ? "十一"
        : e == 12 ? "十二"
        : e == 13 ? "十三"
        : e == 14 ? "十四"
        : e == 15 ? "十五"
        : e == 16 ? "十六"
        : e == 17 ? "十七"
        : e == 18 ? "十八"
        : e == 19 ? "十九"
        : e == 20 ? "二十"
        : e == 21 ? "二十一"
        : e == 22 ? "二十二"
        : e == 23 ? "二十三"
        : e == 24 ? "二十四"
        : e == 25 ? "二十五"
        : e == 26 ? "二十六"
        : e == 27 ? "二十七"
        : e == 28 ? "二十八"
        : e == 29 ? "二十九"
        : e == 30 ? "三十"
        : e == 31 ? "三十一"
        : e == 32 ? "三十二"
        : e == 33 ? "三十三"
        : e == 34 ? "三十四"
        : e == 35 ? "三十五"
        : e == 36 ? "三十六"
        : e == 37 ? "三十七"
        : e == 38 ? "三十八"
        : e == 39 ? "三十九"
        : e == 40 ? "四十"
        : e == 41 ? "四十一"
        : e == 42 ? "四十二"
        : e == 43 ? "四十三"
        : e == 44 ? "四十四"
        : e == 45 ? "四十五"
        : e == 46 ? "四十六"
        : e == 47 ? "四十七"
        : e == 48 ? "四十八"
        : e == 49 ? "四十九"
        : e == 50 ? "五十"
        : "";
});
template.helper('test', function (e) { return e;})