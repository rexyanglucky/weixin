
<div class="main-pops">
    <div class="report-wrap">
        <div class="header ">
            <div class="name tc">测评报告书</div>
            <div class="split mt10"></div>
            <div class="ovh mt15">
                <div class="fr ">
                    <span>测试时间：</span>
                    <span>{{CreateTime}}</span>
                </div>
            </div>
        </div>

        <dl>
            <dd class="mt40">
                <div class="head">【考纲对词汇量掌握要求】</div>
                <div class="mt35 ml20">
                    {{MasterRequir}}
                </div>
            </dd>
            <dd class="mt30">
                <div class="head">【测试结果】</div>
                <div class="report-result mt45 ">
                    <div class="tc">
                        <span class="f24">词汇量等级：</span>
                        <span class="red-dark f32 fb">{{ResultLevel}}</span>
                        <div class="mt35">你当前的词汇量约：<span class="col-ff8716">{{Vocabulary}}</span>个，<span class="col-ff8716">{{CiHuiOne}}</span>{{CiHuiTwo}}</div>
                    </div>
                    <div class="info mt20">
                        <span>【测试学段】</span><span>{{BGrade == "x" ? "小学" : BGrade == "c" ? "初中" : "高中"}}</span>
                        <span class="ml60">【测试卷题数】</span><span>{{$helpers.getJsonLength(AnswerResult) *40}}</span>
                        <br>
                        <span>【作答正确率】</span><span>{{CorrectRate}}%</span>
                        <span class="ml30">【测试用时】</span><span>{{UseTime / 60 | floor }}分钟{{UseTime % 60}}秒</span>
                    </div>
                </div>
            </dd>
            <dd class="mt45">
                <p class="head">【测评分析】</p>
                <p class="tc col-ff8716 f18">
                    应试能力
                </p>
                <table class="table-result wp100 mt10">
                    <tr>
                        <td class="wp20 tl pl25">听说能力</td>
                        <td class="wp60 tl pl35">能力说明</td>

                        {{if AbilityResult[0]=="优秀"}}
                        <td class="wp20 col-best tc">优秀</td>
                        {{else if AbilityResult[0]=="良好"}}
                        <td class="wp20 col-good tc">良好</td>
                        {{else if AbilityResult[0]=="及格"}}
                        <td class="wp20 col-pass tc">及格</td>
                        {{else if AbilityResult[0]=="不及格"}}
                        <td class="wp20 col-bad tc">不及格</td>
                        {{/if}}

                    </tr>
                    <tr>
                        <td class="wp20 tl pl25">写作能力</td>
                        <td class="wp60 tl pl35">能力说明</td>

                        {{if AbilityResult[2]=="优秀"}}
                        <td class="wp20 col-best tc">优秀</td>
                        {{else if AbilityResult[2]=="良好"}}
                        <td class="wp20 col-good tc">良好</td>
                        {{else if AbilityResult[2]=="及格"}}
                        <td class="wp20 col-pass tc">及格</td>
                        {{else if AbilityResult[2]=="不及格"}}
                        <td class="wp20 col-bad tc">不及格</td>
                        {{/if}}


                    </tr>
                    <tr>
                        <td class="wp20 tl pl25">阅读能力</td>
                        <td class="wp60 tl pl35">能力说明</td>

                        {{if AbilityResult[1]=="优秀"}}
                        <td class="wp20 col-best tc">优秀</td>
                        {{else if AbilityResult[1]=="良好"}}
                        <td class="wp20 col-good tc">良好</td>
                        {{else if AbilityResult[1]=="及格"}}
                        <td class="wp20 col-pass tc">及格</td>
                        {{else if AbilityResult[1]=="不及格"}}
                        <td class="wp20 col-bad tc">不及格</td>
                        {{/if}}


                    </tr>
                    <tr>
                        <td class="wp20 tl pl25">翻译能力</td>
                        <td class="wp60 tl pl35">能力说明</td>
                        {{if AbilityResult[3]=="优秀"}}
                        <td class="wp20 col-best tc">优秀</td>
                        {{else if AbilityResult[3]=="良好"}}
                        <td class="wp20 col-good tc">良好</td>
                        {{else if AbilityResult[3]=="及格"}}
                        <td class="wp20 col-pass tc">及格</td>
                        {{else if AbilityResult[3]=="不及格"}}
                        <td class="wp20 col-bad tc">不及格</td>
                        {{/if}}
                    </tr>
                </table>
                <p class="tc col-ff8716 f18 mt35">
                    识词能力
                </p>
                <table class="table-result wp100 mt10">
                    <tr>
                        <td class="wp40 tl pl25">拼读能力</td>
                        <td class="wp40 tl pl35">能力说明</td>

                        {{if AbilityResult[4]=="优秀"}}
                        <td class="wp20 col-best tc">优秀</td>
                        {{else if AbilityResult[4]=="良好"}}
                        <td class="wp20 col-good tc">良好</td>
                        {{else if AbilityResult[4]=="及格"}}
                        <td class="wp20 col-pass tc">及格</td>
                        {{else if AbilityResult[4]=="不及格"}}
                        <td class="wp20 col-bad tc">不及格</td>
                        {{/if}}


                    </tr>
                    <tr>
                        <td class="tl pl25">词形识记能力</td>
                        <td class="tl pl35">能力说明</td>
                        {{if AbilityResult[5]=="优秀"}}
                        <td class="wp20 col-best tc">优秀</td>
                        {{else if AbilityResult[5]=="良好"}}
                        <td class="wp20 col-good tc">良好</td>
                        {{else if AbilityResult[5]=="及格"}}
                        <td class="wp20 col-pass tc">及格</td>
                        {{else if AbilityResult[5]=="不及格"}}
                        <td class="wp20 col-bad tc">不及格</td>
                        {{/if}}
                    </tr>
                    <tr>
                        <td class="tl pl25">词义识记能力</td>
                        <td class="tl pl35">能力说明</td>
                        {{if AbilityResult[6]=="优秀"}}
                        <td class="wp20 col-best tc">优秀</td>
                        {{else if AbilityResult[6]=="良好"}}
                        <td class="wp20 col-good tc">良好</td>
                        {{else if AbilityResult[6]=="及格"}}
                        <td class="wp20 col-pass tc">及格</td>
                        {{else if AbilityResult[6]=="不及格"}}
                        <td class="wp20 col-bad tc">不及格</td>
                        {{/if}}
                    </tr>
                    <tr>
                        <td class="tl pl25">词义词形的辨析能力</td>
                        <td class="tl pl35">能力说明</td>
                        {{if AbilityResult[7]=="优秀"}}
                        <td class="wp20 col-best tc">优秀</td>
                        {{else if AbilityResult[7]=="良好"}}
                        <td class="wp20 col-good tc">良好</td>
                        {{else if AbilityResult[7]=="及格"}}
                        <td class="wp20 col-pass tc">及格</td>
                        {{else if AbilityResult[7]=="不及格"}}
                        <td class="wp20 col-bad tc">不及格</td>
                        {{/if}}
                    </tr>
                </table>
            </dd>
            <dd class="mt50">
                <p class="head">【提分方案】</p>
                <div class="ml10">
                    <p class="lh200 mt20">
                        1、{{MentionScore[0]}}
                    </p>
                    <p class="lh200 mt10">
                        2、{{MentionScore[1]}}
                    </p>
                </div>

            </dd>
            <dd class="mt45">
                <p class="head">【课程推荐】</p>
                <div class="synchronization mt45">
                    <div style="height:1rem;border-bottom:0.025rem solid #ffa754;">
                        <div class="tabs-btn" style="margin-left:20px;">{{Course.BookSetName}}</div>
                        <span class="ml30 red">￥</span>
                        <span class="red" style="font-size:0.6rem;font-weight:600;">{{Course.Money}}元</span>

                    </div>
                    <div class=" mt35 tc">
                        <div class="tabs mr10 w160">
                            <span class="">课次</span><span class="span">|</span><span class="">{{Course.AllTimes}}</span>
                        </div>
                        <div class="tabs mr10 w230">
                            <span class="">学习词汇量</span><span class="span">|</span> <span class="">{{Course.WordCount}}</span>
                        </div>
                        <div class="tabs w210">
                            <span class="">有效期</span><span class="span">|</span><span class="">
                                {{Course.UseMoth | GetBigW }}个月
                            </span>
                        </div>
                    </div>
                    <p class="wordWrap mt40">{{Course.Remark}}</p>
                </div>
            </dd>
        </dl>
        <div class="footer mt100 mb40">
            <p class="line"></p>
            <div class="kouhao">
             
              {{BGrade == "x" ? "20小时拿下小学6年单词" : BGrade == "c" ? "30小时拿下初中3年单词" : "50小时拿下高中3年单词"}}
             
            </div>
        </div>

    </div>
</div>