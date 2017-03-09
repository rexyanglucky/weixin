﻿{{each $data as v i}}
<div class="card slide-down">
    {{if v.GroupIndex>0}}
    <div class="card-header">
        <div class="head-title">
            <span class="icon-down-drop"></span>

            {{v.GroupIndex}}组

        </div>
        <div class="head-after"><span>平均：</span><span>{{v.AvgCredits}}</span><span>学分</span><span>（第{{v.Ranking}}名）</span></div>
    </div>
    {{/if}}
    <div class="card-content">
        <div class="list-block">
            <ul>
                {{each v.StudentMonitorInfoList as d j}}
                <li class="item-content">
                    <div class="item-inner">
                        <div class="item-title">
                            {{d.UserName}}

                            {{if d.BookName!=""}}
                            <div class="item-desc">正在学习：<span class="data mldot5rem">第{{d.UnitID}}单元</span><span class="data">（{{d.BookName}}）</span></div>
                            <div class="item-desc">本次课已得<span class="data mldot5rem">{{d.Credits}}</span><span class="data">学分</span></div>
                            {{else}}
                             <div class="item-desc">正在学习：<span class="data mldot5rem"></span><span class="data">（未知）</span></div>
                            <div class="item-desc">本次课已得<span class="data mldot5rem">0</span><span class="data">学分</span></div>
                            {{/if}}
                        </div>
                        <div class="item-after">
                            <div>课消<span>{{d.CurrentNumber}}/{{d.BookNumber}}</span></div>
                            <div class="item-status-lesson">复习任务量：<span>{{d.ReviewCount}}</span></div>
                        </div>
                    </div>
                </li>
                {{/each}}
            </ul>
        </div>
    </div>
</div>
{{/each}}