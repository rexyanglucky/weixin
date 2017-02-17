//幻灯片开始部分
var iCountOfImage=$('.image-list img').length;
var interval=null;
//play函数
function play(index){
    $(".ppt-container .image-list li").hide();
    $(".ppt-container .image-list li").eq(index).show();
    $(".ppt-container .button-list span").removeClass("selected");
};
//自动播放
function auto(num){
    interval=setInterval(function() { // 自动播放，每5秒触发一次单击事件，来播放幻灯片
        play(num);
        $(".ppt-container .button-list span").eq(num).addClass("selected");
        num++;
        if(num>=iCountOfImage){num=0;}
    },800);
};
auto(0);
$(".ppt-container ul.button-list li span").on('mouseenter',function(){
    var index=$(this).parent().index();
    clearInterval(interval);
    play(index);
    $(this).addClass("selected");
});
$(".ppt-container ul.button-list li span").on('mouseleave',function(){
    var index=$(this).parent().index()+1;
    if(index>=iCountOfImage){index=0;}
    auto(index);
});
//幻灯片结束部分