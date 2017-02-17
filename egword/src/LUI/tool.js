

function popshow(sele, popshow) {//弹出层的显示
   
    sele.on('click', function () {
        popshow.show();
        $('.pop-mask').show();
        $('.pop-mask').show();
    })
}
function pophide(sele, popshow) {//弹出层的消失
    sele.on('click', function () {
        popshow.hide();
        $('.pop-mask').hide();
    })
}
function checkBoox() {//复选框的样式
    $('.checkBox').on('click', function () {
        if ($(this).find('img').css('visibility') == 'visible') {
            $(this).find('img').css('visibility', 'hidden');
            $(this).css('border', '1px solid #8e9fa8');
        } else {
            $(this).find('img').css('visibility', 'visible');
            $(this).css('border', '1px solid #fff');
        }
    })
}
function chooseAll() {//全选全不选
    $('.checkBox').on('click', function () {
        var num = $('.checkBox').index($(this));
        if (num == 0) {
            if ($(this).find('img').css('visibility') == 'visible') {
                $('.checkBox').each(function () {
                    $(this).find('img').css('visibility', 'hidden');
                    $(this).css('border', '1px solid #8e9fa8');
                })
            } else {
                $('.checkBox').each(function () {
                    $(this).find('img').css('visibility', 'visible');
                    $(this).css('border', '1px solid #fff');
                })
            }
        } else {
            if ($(this).find('img').css('visibility') == 'visible') {
                $(this).find('img').css('visibility', 'hidden');
                $(this).css('border', '1px solid #8e9fa8');
            } else {
                $(this).find('img').css('visibility', 'visible');
                $(this).css('border', '1px solid #fff');
            }
            var $imgs = $.makeArray($('.table tr:not(:first)').find('img'));
            var value = $imgs.every(function (item) {
                return item.style.visibility == 'visible';
            })
            if (value) {
                $('.checkBox').first().find('img').css('visibility', 'visible');
                $('.checkBox').first().css('border', '1px solid #fff');
            } else {
                $('.checkBox').first().find('img').css('visibility', 'hidden');
                $('.checkBox').first().css('border', '1px solid #8e9fa8');
            }
        }
    })

}
function Sibs(This) {
    This.on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
}

function radio() {//单选的样式
    $('.radio').on('click', function () {
        $('.radio').removeClass('active');
        $(this).addClass('active');
    })
}

function setCookie(objName, objValue, objHours) {
    var str = objName + "=" + escape(objValue);

    if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString() + ";path=/";
    }
    document.cookie = str;
}

function getCookie(objName) { //获取指定名称的cookie的值
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] == objName) {
            return unescape(temp[1]);
        }
    }
}

//弹出加载图片
function ShowLoading(obj) {
    obj.html(jQuery("#divLoading").html());
}
function timeTickBig(second) {
    $(".times-big").html(second);
    var t = setInterval(function () {
        $(".times-big").html(--second);
        if (second <= 0) {
            $(".rotate-point").css({ "animation-play-state": "paused" });
            clearInterval(t);
        }
    }, 1000);
    $(".rotate-point").css({ "animation-play-state": "running" });
}

//加载图片到某个元素中
function InsertLoading(obj) {
    obj.append(jQuery("#divLoading").html());
}

module.exports = {
    pophide: pophide,
    popshow: popshow,
    checkBoox: checkBoox,
    Sibs: Sibs,
    radio: radio,
    chooseAll: chooseAll,
    setCookie: setCookie,//设置cookie
    getCookie: getCookie, // 获取cookie
    ShowLoading: ShowLoading,//加载中
    InsertLoading: InsertLoading,
    timeTickBig: timeTickBig//倒计时
}
