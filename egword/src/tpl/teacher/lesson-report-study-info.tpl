<div class="card">
                <div class="head-before"></div>
                <div class="card-header">
                    <span>{{studentOne.UserName}}</span>
                    <span>课次：<span>{{studentOne.CurrentNumber}}/{{studentOne.BookNumber}}</span></span>
                </div>
                <div class="card-content">
                    <div class="card-content-inner">
                        <div class="content-block-title">
                             本次课程
                            </div>
                        <div class="list-block">
                            <ul>
                                <li class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">
                                            新学单词：
                                              {{if studentOne.NewWord<studentOne.DestNumber}}
                                              <span class="word-num">
                                                 {{studentOne.NewWord}}
                                              {{else}}
                                                <span>
                                                  {{studentOne.NewWord}}
                                              {{/if}}
                                               
                                            </span>
                                            <span class="item-remark">（目标量：<span>{{studentOne.DestNumber}}</span>）</span>
                                        </div>
                                        <div class="item-after"></div>
                                    </div>
                                </li>
                                <li class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">
                                            奖励学分：<span>{{studentOne.Credits}}</span>
                                            <span class="item-remark">（班级排名：<span>{{studentOne.StudentOrder}}</span>）</span>
                                        </div>
                                        <div class="item-after"></div>
                                    </div>
                                </li>
                                <li class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">
                                            单元小测：<span>{{studentOne.UnitFullScore}}个100分</span>
                                        </div>
                                        <div class="item-after"></div>
                                    </div>
                                </li>
                                <li class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">
                                            拼写错误率：<span>{{studentOne.SpellFix}}%</span>；
                                            词义错误率：<span>{{studentOne.NatureFix}}%</span>；
                                        </div>
                                        <div class="item-after"></div>
                                    </div>
                                </li>
                            </ul>
                            </div>
                        <div class="split"></div>
                        <div class="content-block-title">
                            累计成果
                        </div>
                        <div class="list-block">
                            <ul>
                                <li class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">
                                            单词学习进度：<span>{{studentAll.NewWord}}/{{studentAll.DestNumber}}</span>
                                        </div>
                                        <div class="item-after"></div>
                                    </div>
                                </li>
                                <li class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">
                                            累计学分：
                                            {{if studentAll.Credits<120}}
                                            <span class="word-num">
                                                {{studentAll.Credits}}
                                            {{else}}
                                                <span>
                                             {{studentAll.Credits}}
                                            {{/if}}
                                            </span>
                                            <span class="item-remark">（参考值：<span>120/500</span>）</span>
                                        </div>
                                        <div class="item-after"></div>
                                    </div>
                                </li>
                                <li class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">
                                            单元小测：<span>{{studentAll.UnitFullScore}}个100分</span>
                                        </div>
                                        <div class="item-after"></div>
                                    </div>
                                </li>
                                <li class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title">
                                            拼写错误率：<span>{{studentAll.SpellFix}}%</span>；
                                            词义错误率：<span>{{studentAll.NatureFix}}%</span>；
                                        </div>
                                        <div class="item-after"></div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>