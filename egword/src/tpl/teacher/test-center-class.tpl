<ul>
    {{each $data as v i }}
    <li class="b-studentlist-item" data-studentid="{{v.a}}">
        <a href="#" class="item-link item-content">
            <div class="item-inner">
                <div class="item-title-row">
                    <div class="item-title">{{v.b}}大黑狗子</div>
                    <div class="item-after"><span>{{v.c}}词汇等级：</span><span class="ml10">{{v.d}}三级+</span></div>
                </div>
                <div class="item-subtitle"><span>测评时间：</span><span class="ml10">{{v.e}}2016/02/25  9:20</span></div>
            </div>
        </a>
    </li>
    {{/each}}
</ul>