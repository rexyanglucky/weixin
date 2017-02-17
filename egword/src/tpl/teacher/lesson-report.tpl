{{if grouplist.length>1}}
<div class="card">
    <div class="card-header">小组排名</div>
    <div class="card-content">
        <div class="card-content-inner">
            <div class="list-block">
                <ul>
                    {{each grouplist as d j}}
                    <li class="item-content">
                        <div class="item-media"></div>
                        <div class="item-inner">
                            <div class="item-title">
                                <span class="seq">{{(j+1)}}.</span>
                                <span>{{d.GroupIndex}}组</span>

                            </div>
                            <div class="item-after"><span class="word-num"><span>{{d.avgCredits}}</span>学分</span></div>
                        </div>
                    </li>

                    {{/each}}
                </ul>
            </div>
        </div>
    </div>
    <div class="card-footer"></div>
</div>
{{/if}}

<div class="card student">
    <div class="card-header">学生排名</div>
    <div class="card-content">
        <div class="card-content-inner">
            <div class="list-block">
                <ul>
                    {{each studentlist as v i}}
                    <li class="item-content b-studentlist-item" data-classindex="{{v.ClassIndex}}" data-studentid="{{v.StudentID}}" data-courseid="{{v.CourseID}}">
                        <div class="item-media"></div>
                        <div class="item-inner">
                            <div class="item-title">
                                <span class="seq">{{(i+1)}}.{{v.UserName}}</span>
                                {{if grouplist.length>1}}
                                <span>({{v.GroupIndex}}组)</span>
                                {{/if}}

                            </div>

                            {{if v.BookNumber - v.CurrentNumber == 0}}
                            <div class="lesson-circle over">已结课</div>
                            {{else if v.BookNumber - v.CurrentNumber == 1}}
                            <div class="lesson-circle normal">剩1次</div>
                            {{else}}

                            {{/if}}

                            <div class="item-after"><span class="word-num">学分<span>{{v.Credits}}</span>分</span></div>
                        </div>
                    </li>
                    {{/each}}
                </ul>
            </div>
        </div>
    </div>
    <div class="card-footer"></div>
</div>