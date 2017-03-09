<div class="voice">
    <div class="word" style="width:95%;border-bottom: 1px solid #d0d8dd;">
        {{Word}}
    </div>
    <div class="pronunce" style="float:none;">
         <span style="font-size:0;" class="pronunce-guide">
             {{# $helpers.GetRedWord($data)}}

          </span>
        <i class="lui_wordspeak" data-src="{{Audio}}" data-auto="true" data-loop="2"></i>
        <!--<img src="/egword/build/img/horn.png" alt="" class="horn">-->
    </div>
    <div class="word-types">
        <!--单词类型0，熟词；1，夹生词；2，生词；-->
        {{if WordType==2}}
        <div>
            <span class="konow-gap-guide">
                <span class="konow-gap">陌</span>
                <span>陌生词，请慢速跟读三遍</span>
            </span>
        </div>
        {{else if WordType==1}}
        <div class="">
            <span class="konow-gap-guide">
             <span class="konow-gap">生</span>
             <span>夹生词，请快速跟读两遍</span>
            </span>
        </div>
        {{/if}}


    </div>
    <div class="anysis none">
        {{each WordNatures as v i}}
        <span>{{WordNatures[0]}}</span>
        {{/each}}

    </div>
    <div class="remumber none" >
        <div class="wordWrap"><span class="mr10">【记忆法】</span>{{Rember}}</div>
    </div>
    <div class="btn"  id="btn-learn-next" style="margin-top:35px;background: #ff8b1e;border: 1px solid #ff3c00;width: 100%;text-align:center;color:#fff;display: none">下一个</div>
</div>