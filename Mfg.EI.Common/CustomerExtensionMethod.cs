using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.ViewModel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NPOI.SS.Formula.Functions;

namespace Mfg.EI.Common
{
    public static class CustomerExtensionMethod
    {
        #region string
        /// <summary>
        /// 将数字转换为大写字符串，1-9
        /// </summary>
        /// <param name="p"></param>
        /// <returns></returns>
        public static string ToBigDescString(this int p)
        {
            switch (p)
            {
                case 1:
                    return "一";
                    break;
                case 2:
                    return "二";
                    break;
                case 3:
                    return "三";
                    break;
                case 4:
                    return "四";
                    break;
                case 5:
                    return "五";
                    break;
                case 6:
                    return "六";
                    break;
                case 7:
                    return "七";
                    break;
                case 8:
                    return "八";
                case 9:
                    return "九";
                    break;
                case 0:
                    return "零";
                    break;
                case 10:
                    return "十";
                    break;
                default:
                    return p.ToString();
                    break;

            }
        }
        public static string ToBigLetter(this int p)
        {
            switch (p)
            {
                case 1:
                    return "A";
                    break;
                case 2:
                    return "B";
                    break;
                case 3:
                    return "C";
                    break;
                case 4:
                    return "D";
                    break;
                case 5:
                    return "E";
                    break;
                case 6:
                    return "F";
                    break;
                case 7:
                    return "G";
                    break;
                case 8:
                    return "H";
                case 9:
                    return "I";
                    break;
                case 0:
                    return "A";
                    break;
                case 10:
                    return "K";
                    break;
                default:
                    return p.ToString();
                    break;

            }
        }
        #endregion


        #region Demo
        public static string ModelToHtml(this QuestionItemViewModel model)
        {
            StringBuilder itemStr = new StringBuilder();
            //itemStr.Append("<div data-item='1' class='bbH pt10 pb10 clear'><span class='l w25 tr'>" + 1
            //                + "、</span>");
            //新数据
            if (model.f_isold == 0)
            {
                #region body
                itemStr.Append("<div class='cell' style='overflow:hidden;'>");

                var itemBody = "<div style='backgoud:red；width:100%'>" + model.f_body + "</div>";
                for (int k = 0; k < model.Selection.Count(); k++)
                {
                    itemBody += "<br/>";


                    var selection = model.Selection[k];
                    if (!string.IsNullOrEmpty(selection.desc))
                    {
                        itemBody += "<div style='width:100%'>" + selection.desc + "</div>";
                        itemBody += "<br/>";
                    }
                    for (int m = 0; m < selection.f_content.Length; m++)
                    {
                        var content = selection.f_content[m];
                        if (!string.IsNullOrEmpty(content))
                        {
                            itemBody += "<div style='width:100%'>" + content + "</div>";
                            itemBody += "<br/>";
                        }
                    }

                }
                itemStr.Append(itemBody);

                #endregion

                #region 解答
                itemStr.Append("<div data-btn='1'><br/>解答：");



                var jarray = JsonConvert.DeserializeObject<JArray>(model.f_answer);
                string jvalue = "";
                for (int k = 0; k < jarray.Count; k++)
                {
                    var array = jarray[k];
                    if (array.HasValues)
                    {
                        for (int m = 0; m < array.Children().Count(); m++)
                        {
                            itemStr.Append(((JValue)array[m]).Value.ToString());
                        }
                    }
                }
                //string jvalue = ((JValue)jarray[0][0]).Value.ToString();
                //itemStr.Append(jvalue);

                itemStr.Append("</div>");
                itemStr.Append("<div data-btn='1'><br/>解析：");
                jarray = JsonConvert.DeserializeObject<JArray>(model.f_ways);
                jvalue = ((JValue)jarray[0]).Value.ToString();
                itemStr.Append(jvalue);
                //itemStr.Append(model.f_ways);
                itemStr.Append("</div>");
                itemStr.Append("</div>");
                #endregion

            }
            //老数据
            else
            {
                itemStr.Append("<div class='cell' style='overflow:hidden;'>"
                    + model.f_body + "<div data-btn='1'><br/>解答：" + model.f_answer + model.f_ways + "</div></div>");
            }
            //itemStr.Append("</div>");
            return itemStr.ToString();
        }
        public static string ModelToHtml(this QuestionListViewModel model)
        {
            var str = new StringBuilder("");
            for (int k = 0; k < model.QuestionList.Count; k++)
            {
                var question = model.QuestionList[k];
                str.Append("<div data-item='1' class='bbH pt10 pb10 clear'><span class='l w25 tr'>" + (k + 1)
                      + "、</span>");
                str.AppendLine(question.ModelToHtml());
                str.Append("</div>");
            }

            return str.ToString();
        }
        #endregion

        /// <summary>
        /// 获取题干HTML
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static string GetItemBodyHtml(this QuestionItemViewModel model)
        {
            StringBuilder itemStr = new StringBuilder("");
            if (model.f_isold == 0)
            {

                //<div class="que_main">
                //            <div>某探究性学习小组仅利用一副三角板不能完成的操作是(       )</div>
                //            <div class="r_num">1.</div>
                //            <div class="que_main">
                //                <div>某探究性学习小组仅利用一副三角板不能完成的操作是(       )</div>

                //                <dl class="ans_list">
                //                    <dd>（A）作已知直线的平行线 </dd>
                //                    <dd>（B）作已知直线的平行线 </dd>
                //                    <dd>（C）作已知直线的平行线 </dd>
                //                    <dd>（D）作已知直线的平行线 </dd>
                //                </dl>


                //            </div>
                //            <dl class="ans_list">
                //                <dd>（A）作已知直线的平行线 </dd>
                //                <dd>（B）作已知直线的平行线 </dd>
                //                <dd>（C）作已知直线的平行线 </dd>
                //                <dd>（D）作已知直线的平行线 </dd>
                //            </dl>


                //        </div>
                //TODO 新题如何展示
                itemStr.Append("<div class='que_main'>");

                var itemBody = "<div>" + model.f_body + "</div>";
                for (int k = 0; k < model.Selection.Count(); k++)
                {

                    var selection = model.Selection[k];
                    if (!string.IsNullOrEmpty(selection.desc))
                    {
                        //小题序号
                        itemBody += "<div class='r_num'>" + (k + 1) + ".</div>";

                        itemBody += "<div class='que_main mml20'>";
                        itemBody += "<div>" + selection.desc + "</div>";


                    }
                    itemBody += " <dl class='ans_list'>";
                    for (int m = 0; m < selection.f_content.Length; m++)
                    {
                        var content = selection.f_content[m];
                        if (!string.IsNullOrEmpty(content))
                        {
                            itemBody += "<dd>" + (m + 1).ToBigLetter() + "、" + content + "</dd>";

                        }
                    }
                    itemBody += " </dl>";
                    if (!string.IsNullOrEmpty(selection.desc))
                    {
                        itemBody += "</div>";
                    }

                }
                itemStr.Append(itemBody);
                itemStr.Append("</div>");

            }
            else
            {
                itemStr.Append(model.f_body);
            }
            return itemStr.ToString();
        }

        /// <summary>
        /// 获取选项列表
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public static List<string> GetAnswerList(this QuestionItemViewModel model)
        {
            var answerList = new List<string>();
            if (model.f_isold == 0)
            {
                if (model.Selection != null && model.Selection.Count > 0)
                {
                    for (int k = 0; k < model.Selection.Count; k++)
                    {
                        string answer = "";
                        for (int m = 0; m < model.Selection[k].f_content.Length; m++)
                        {
                            answer += (m + 1).ToBigLetter();
                        }
                        answerList.Add(answer);
                    }
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(model.f_selection))
                {

                    answerList.Add(model.f_selection.Split('|')[0]);
                }
            }
            return answerList.Count <= 0 ? new List<string>() { "" } : answerList;
        }

    }
}
