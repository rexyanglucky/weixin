/*! <DEBUG:undefined> */
function anonymous($data,$filename) {'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$out+=' ';
$each($data,function($value,$index){
$out+=' ';
if($value.IsFrozenStr==1){
$out+=' <tr class="default"> <td>';
$out+=$escape($value.UserName);
$out+='</td> <td>';
$out+=$escape($value.LoginId);
$out+='</td> <td>';
$out+=$escape($value.RoleName);
$out+='</td> <td> <span class="inline operatBtn editMesg" data-id="';
$out+=$escape($value.UserId);
$out+='">查看</span> </td> </tr> ';
});
return new String($out);}