<div class="voice">
    <div class="need" style="margin-top:35px;height:75px;line-height:75px;">
        <span>根据词意拼写单词</span>
    </div>
    <div class="tell">
        {{each WordNatures as v i}}
        <span>{{v}}</span>
        {{/each}}
    </div>
    <div class="write">
        {{each spellList as v i}}
        <input type="text" data-index="{{i}}" data-haswrite="0" >
        {{/each}}
        <img src="/egword/build/img/error.png" class="word0-clear pointer" alt="">
        <span class="none word0-right-answer-right">
                        <img src="/egword/build/img/smail.png" alt="" class="ml30">
                        <span class="success">正确拼写:<span>{{Answer}}</span></span>
                    </span>
        <span class="none word0-right-answer-error">
                        <img src="/egword/build/img/cry.png" alt="" class="ml30">
                        <span class="error">正确拼写:<span>{{Answer}}</span></span>
                    </span>
    </div>
    <div class="sing-word">
        {{each Selection as v i}}
        <span data-op="word0-sel">{{v}}</span>
        {{/each}}
     </div>
</div>
