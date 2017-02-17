/*! <DEBUG:undefined> */
function anonymous($data,$filename) {'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,v=$data.v,i=$data.i,$escape=$utils.$escape,$out='';$out+=' <ul> <!--';
$each($data,function(v,i){
$out+=' <li class="b-studentlist-item" data-id="';
$out+=$escape(v.);
$out+='"> <a href="#" class="item-link item-content"> <div class="item-inner"> <div class="item-title-row"> <div class="item-title">';
$out+=$escape(v.);
$out+='大黑狗子</div> <div class="item-after"><span>';
$out+=$escape(v.);
$out+='词汇等级：</span><span class="ml10">';
$out+=$escape(v.);
$out+='三级+</span></div> </div> <div class="item-subtitle"><span>测评时间：</span><span class="ml10">';
$out+=$escape(v.);
$out+='2016/02/25 9:20</span></div> </div> </a> </li> ';
});
$out+='--> </ul>';
return new String($out);}