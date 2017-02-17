 
 <div class="font18" style="height:85px;line-height:85px;">
            <span style="margin-left:27px;" id="perName">{{UserName}}</span>
        </div>
        <div>
            <span class="mr20"><span class="white">姓名</span>姓名:</span>
            <span id="perName0">{{UserName}}</span>
        </div>
        <div class="mt20">
            <span class="mr20"><span class="white">账号</span>账号:</span>
            <span id="perLoginId"> {{LoginId}}</span>
        </div>
        <div class="mt20">
            <span class="mr20"><span class="white">性别</span>性别:</span>
			{{if Gender==1}}
            <span  > 男</span>
			{{else}}
			 <span  > 女</span>
			{{/if}}
        </div>
        <div class="mt20">
            <span class="mr20"><span class="white">角色</span>角色:</span>
            <span id="perRoleName">{{RoleName}}</span>
        </div>
        <div class="mt20">
            <span class="mr20">管理校区:</span>
            <span id="perScName">{{SchoolName}}</span>
        </div>
        <div class="mt20">
            <span class="mr20">入职时间:</span>
            <span id="perEnterTime">{{EnterTime}}</span>
        </div>
        <div class="mt20">
            <span class="mr20"><span class="white">手机</span>手机:</span>
            <span id="perTel"> {{Tel}}</span>
        </div>