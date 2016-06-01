/**
 *
 * HTML5 Image uploader with Jcrop
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2012, Script Tutorials
 * http://www.script-tutorials.com/
 */
var jcrop_api, boundx, boundy;

var fixWidth = 500;
var fixHeight = 290;
// convert bytes into friendly format
function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB'];
    if (bytes == 0) return 'n/a';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

// check for selected crop region
function checkForm() {
    if (!$("#preview").attr("src")) {
        $('.error').html("还没有选择图片哦").show();
        return false;
    }
    //if (parseInt($('#w').val())) return true;
    //$('.error').html('Please select a crop region and then press Upload').show();
    //return false;
    return true;
};

// update info by cropping (onChange and onSelect events handler)
function updateInfo(e) {
    $('#x1').val(e.x);
    $('#y1').val(e.y);
    $('#x2').val(e.x2);
    $('#y2').val(e.y2);
    $('#w').val(e.w);
    $('#h').val(e.h);
    updateInfo1(e);
};

function updateInfo1(e) {
    // preview element
    var oImage = document.getElementById('preview');
    //small img
    var smallImg = document.getElementById('small');
    //midd img
    var middImg = document.getElementById('midd');

    var rx1 = $("#smalldiv").width() / e.w;
    var ry1 = $("#smalldiv").height() / e.h;
    var rx2 = $("#midddiv").width() / e.w;
    var ry2 = $("#midddiv").height() / e.h;
    $(smallImg).css({
        "width": Math.round(rx1 * boundx) + 'px',
        "height": Math.round(ry1 * boundy) + 'px',
        "margin-left": '-' + Math.round(rx1 * e.x) + 'px',
        "margin-top": '-' + Math.round(ry1 * e.y) + 'px'

    });
    $(middImg).css({
        "width": Math.round(rx2 * boundx) + 'px',
        "height": Math.round(ry2 * boundy) + 'px',
        "margin-left": '-' + Math.round(rx2 * e.x) + 'px',
        "margin-top": '-' + Math.round(ry2 * e.y) + 'px'

    });
}

// clear info by cropping (onRelease event handler)
function clearInfo() {
    $('.info #w').val('');
    $('.info #h').val('');
};

function fileSelectHandler() {

    // get selected file
    var oFile = $('#image_file')[0].files[0];

    // hide all errors
    $('.error').hide();

    // check for image type (jpg and png are allowed)
    var rFilter = /^(image\/jpeg|image\/png)$/i;
    if (!rFilter.test(oFile.type)) {
        $('.error').html('Please select a valid image file (jpg and png are allowed)').show();
        return;
    }

    // check for file size
    if (oFile.size > 4 * 1024 * 1024) {
        $('.error').html('You have selected too big file, please select a one smaller image file').show();
        return;
    }

    // preview element
    var oImage = document.getElementById('preview');
    //small img
    var smallImg = document.getElementById('small');
    //midd img
    var middImg = document.getElementById('midd');

    // prepare HTML5 FileReader
    var oReader = new FileReader();
    oReader.onload = function (e) {

        // e.target.result contains the DataURL which we can use as a source of the image
        var tempImg = new Image();
        tempImg.src = e.target.result;
        $("#relImg").val(e.target.result);
        var tempImg1 = jic.compress(tempImg, 100);
        //oImage.src = tempImg1.src;
        oImage.src = e.target.result;
        //计算图片缩放
        var width = oImage.naturalWidth;
        var height = oImage.naturalHeight;
        var w1 = width >= fixWidth;
        var h1 = height >= fixHeight;
        //图片宽高比例
        var whp = width / height;
        var wp = width / fixWidth;
        var hp = height / fixHeight;
        var nw = width;
        var nh = height;

        if (w1) {
            if (h1) {
                if (wp >= hp) {
                    nw = fixWidth;
                    nh = Math.round(fixWidth / whp);
                    //$(oImage).css({ "width": "500px" });
                } else {
                    nh = fixHeight;
                    nw = Math.round(whp * fixHeight);
                    //$(oImage).css({ "height": "290px" });
                }
            } else {
                nw = fixWidth;
                nh = Math.round(fixWidth / whp);
                //$(oImage).css({ "width": "500px" });
            }
        } else {
            if (h1) {
                nh = fixHeight;
                nw = Math.round(whp * fixHeight);
                //$(oImage).css({ "height": "290px" });
            }
        }
        $(oImage).css({ "height": nh + "px", "width": nw + "px" });

        //$(oImage).css({ "height": fixHeight + "px", "width": fixWidth + "px" });

        var mt = fixHeight - nh > 0 ? (fixHeight - nh) / 2 : 0;
        $("#divImg").css({ "margin-top": mt + "px" });

        smallImg.src = e.target.result;
        middImg.src = e.target.result;

        $(smallImg).css({
            "width": $("#smalldiv").width() + 'px',
            "height": $("#smalldiv").height() + 'px',
        });
        $(middImg).css({
            "width": $("#midddiv").width() + 'px',
            "height": $("#midddiv").height() + 'px',
        });
        //初始化参数值
        $('#ow').val(nw);
        $('#oh').val(nh);
        $('#x1').val(0);
        $('#y1').val(0);
        $('#x2').val(0);
        $('#y2').val(0);
        $('#w').val(nw);
        $('#h').val(nh);
        oImage.onload = function () { // onload event handler

            $("#step1").hide();
            // display step 2
            $('.step2').fadeIn(500);

            // display some basic image info
            var sResultFileSize = bytesToSize(oFile.size);
            $('#filesize').val(sResultFileSize);
            $('#filetype').val(oFile.type);
            $('#filedim').val(oImage.naturalWidth + ' x ' + oImage.naturalHeight);

            // Create variables (in this scope) to hold the Jcrop API and image size


            // destroy Jcrop if it is existed
            if (typeof jcrop_api != 'undefined')
                jcrop_api.destroy();

            // initialize Jcrop
            $('#preview').Jcrop({
                //minSize: [32, 32], // min crop size
                aspectRatio: 0, // keep aspect ratio 1:1
                bgFade: true, // use fade effect
                bgOpacity: .3, // fade opacity
                onChange: updateInfo,
                onSelect: updateInfo,
                onRelease: clearInfo,
                boundary: 10,
                touchSupport: true
            }, function () {

                // use the Jcrop API to get the real image size
                var bounds = this.getBounds();
                boundx = bounds[0];
                boundy = bounds[1];

                // Store the Jcrop API in the jcrop_api variable
                jcrop_api = this;
            });
        };
    };

    // read selected file as DataURL
    oReader.readAsDataURL(oFile);
}

function WaitCall(url) {
    addCookie("ImgName", url, 0);
    window.parent.waitCall();
}


//上传图片
function addCookie(objName, objValue, objHours) { //添加cookie

    var str = objName + "=" + escape(objValue);
    if (objHours > 0) { //为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    str += ";path=/";

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



//压缩图片
function compressImg(imgData, maxHeight, onCompress) {

    if (!imgData) return;

    onCompress = onCompress || function () { };



    maxHeight = maxHeight || 200;//默认最大高度200px



    var canvas = document.createElement('canvas');



    var img = new Image();

    img.onload = function () {

        if (img.height > maxHeight) {//按最大高度等比缩放

            img.width *= maxHeight / img.height;

            img.height = maxHeight;

        }

        var ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height); // canvas清屏

        //重置canvans宽高 canvas.width = img.width; canvas.height = img.height;

        ctx.drawImage(img, 0, 0, img.width, img.height); // 将图像绘制到canvas上 



        onCompress(canvas.toDataURL("image/jpeg"));//必须等压缩完才读取canvas值，否则canvas内容是黑帆布

    };

    // 记住必须先绑定事件，才能设置src属性，否则img没内容可以画到canvas

    img.src = imgData;

}



var jic = {
    /**
     * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
     * @param {Image} source_img_obj The source Image Object
     * @param {Integer} quality The output quality of Image Object
     * @return {Image} result_image_obj The compressed Image Object
     */

    compress: function (source_img_obj, quality, output_format) {

        var mime_type = "image/jpeg";
        if (output_format != undefined && output_format == "png") {
            mime_type = "image/png";
        }
        var cvs = document.createElement('canvas');
        //naturalWidth真实图片的宽度
        cvs.width = source_img_obj.naturalWidth;
        cvs.height = source_img_obj.naturalHeight;
        var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
        var newImageData = cvs.toDataURL(mime_type, quality / 100);
        var result_image_obj = new Image();
        result_image_obj.src = newImageData;
        return result_image_obj;
    }

}