/*
 * author:谢利民;
 * function:阶段科目对应模型
 * adddate:2015-05-05
 * updatedate:2015-05-05
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.Resouce.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Mfg.Resource.Comm;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 题库的ViewModel
    /// </summary>
    public class QuestionAttrModel
    {


        public string f_answer { get; set; }
        public string f_answerlist { get; set; }
        public string f_bclass { get; set; }
        public string f_body { get; set; }
        public string f_class { get; set; }
        public string f_detailpath { get; set; }
        public int f_difficulty { get; set; }
        public int f_id { get; set; }
        public int f_isapp { get; set; }
        public int f_mainsec { get; set; }
        public string f_mainsec1 { get; set; }
        public string f_secorder { get; set; }
        public string f_secpoint { get; set; }
        public int f_style { get; set; }
        public string f_ways { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        public string SequenceID { get; set; }
        /// <summary>
        /// 题型
        /// </summary>
        public string ItemType { get; set; }

        /// <summary>
        /// 分数
        /// </summary>
        public string Score { get; set; }


        /// <summary>
        /// 题目所有信息
        /// </summary>
        public QuestionItemViewModel questionItem;
    }




    /// <summary>
    /// 将资源试题model转换为本地试题model
    /// </summary>
    public class QuestionItemViewModel
    {
        public QuestionItemViewModel()
        {
        }
        #region 构造函数
        public QuestionItemViewModel(Question question, int subjectId)
        {
            this.f_maintest = question.f_maintest;
            this.SubjectId = subjectId;

            this.f_isapp = question.f_isapp;

            this.f_score = question.f_score;

            this.f_evaluate = question.f_evaluate;

            this.f_comment = question.f_comment;

            this.f_ability = question.f_ability;

            this.f_secorder = question.f_secorder;

            this.f_qtype = question.f_qtype;

            this.f_func = question.f_func;

            this.f_errorpoint = question.f_errorpoint;

            this.f_thought = question.f_thought;

            this.f_answertime = question.f_answertime;

            this.f_detailpath = question.f_detailpath;

            //questionBase
            this._f_style = question.f_style;

            this.f_difficulty = question.f_difficulty;

            this.f_mainsec = question.f_mainsec;

            this.f_mainsec1 = question.f_mainsec1;

            this.f_class = question.f_class;

            this.f_body = question.f_body;

            this.f_selection = question.f_selection;

            this.f_secpoint = question.f_secpoint;

            this.f_year = question.f_year;

            this.f_schoolname = question.f_schoolname;

            this.f_papername = question.f_papername;

            this.f_papertype = question.f_papertype;

            this.f_papertypename = question.f_papertypename;

            this.f_isanswer = question.f_isanswer;

            this.f_areaname = question.f_areaname;

            this.f_isold = question.f_isold;
            //BaseEntity
            this.f_id = question.f_id;

            this.OrderByIndex = question.f_order;
            if (question.f_isold == 0)
            {

                if (!string.IsNullOrEmpty(question.f_answer))
                {
                    var jarray = JsonConvert.DeserializeObject<List<string[]>>(question.f_answer);
                    this.RightAnswer = jarray;
                    //默认取第一个为正确答案
                    this.f_answer = jarray[0][0];
                }

            }
            else
            {
                this.f_answer = question.f_answer;
                //如果是老试题并且是选择题，正确答案为f_selection以【|】分割
                if (!string.IsNullOrEmpty(question.f_selection))
                {
                    if (question.f_selection.Split('|').Length > 1)
                    {
                        this.f_answer = question.f_selection.Split('|')[1];
                    }
                }
                this.RightAnswer = null;
            }
            if (question.f_isold == 0)//新题
            {

                if (!string.IsNullOrEmpty(question.f_ways))
                {

                    try
                    {

                        var ways = JsonConvert.DeserializeObject<List<string>>(question.f_ways);

                        this.Ways = ways;
                        //默认取第一个解析
                        this.f_ways = ways[0];
                    }
                    catch (Exception)
                    {
                        var exceptionways = question.f_ways;

                        this.Ways = new List<string>() { exceptionways };
                        //默认取第一个解析
                        this.f_ways = exceptionways;

                    }

                }

            }
            else
            {
                this.f_ways = question.f_ways;
                this.Ways = null;

                if (question.f_year == 0 && question.f_papertypename.Trim() == string.Empty)
                {
                    question.f_papertypename = string.Empty;//前台打印
                }
                else
                {

                    if (question.f_schoolname.Trim() != string.Empty)//只有学校
                    {
                        if (new string[] { "小考,中考，高考" }.Contains(question.f_papertypename))
                        {
                            question.f_papertypename = question.f_year.ToString() + " " + question.f_papertypename;
                        }
                        else
                        {
                            question.f_papertypename = question.f_year.ToString() + " " + question.f_schoolname + " " + question.f_papertypename;
                        }
                    }
                    else if (question.f_areaname.Trim() != string.Empty)
                    {
                        question.f_papertypename = question.f_year.ToString() + " " + question.f_areaname + " " + question.f_papertypename;
                    }
                    else
                    {
                        question.f_papertypename = question.f_year + " " + question.f_papertypename;
                    }
                }
                if (question.f_paperid <= 0)
                    this.f_papername = question.f_papertypename;

            }

            //Selection
            if (this.f_isold == 0)//新题
            {
                if (!string.IsNullOrEmpty(this.f_selection))
                {
                    this._selection = JsonConvert.DeserializeObject<List<SelectionViewModel>>(question.f_selection);
                }
                else
                {
                    this._selection = new List<SelectionViewModel>();
                }
            }
            else
            {
                this._selection = new List<SelectionViewModel>();
            }




            //处理没有解析和解答的情况
            if (string.IsNullOrEmpty(this.f_ways) && string.IsNullOrEmpty(this.f_answer))
            {
                this.f_ways = "略";
            }



        }



        #endregion

        #region 属性
        private List<SelectionViewModel> _selection = new List<SelectionViewModel>();

        public List<SelectionViewModel> Selection
        {
            get
            {
                return this._selection;
            }
            set
            {
                this._selection = value;
            }
        }
        /// <summary>
        /// 答题选项卡 每一小问，不同的选项卡
        /// </summary>
        public List<string> AnswerList { get; set; }

        /// <summary>
        /// 0是试题 1 为可作答试题 2为app试题 3 为app可作答的试题 
        /// </summary>
        public int f_isapp { get; set; }
        /// <summary>
        /// 分值
        /// </summary>
        public int f_score { get; set; }
        /// <summary>
        /// 试题的评价 占位表示 0000000000 共10位 1位是否是基础题 2位是否是长考题 3位是否是易错题 4位是否是压轴题 5位是否是创新题 
        /// </summary>
        public string f_evaluate { get; set; }

        /// <summary>
        /// 试题的点评 
        /// </summary>
        public string f_comment { get; set; }
        /// <summary>
        /// 能力层级名称 
        /// </summary>
        public string f_ability { get; set; }

        /// <summary>
        /// 本题所选的所有直接考察知识点的id列表 
        /// </summary>
        public string f_secorder { get; set; }
        /// <summary>
        /// 试题类型 
        /// </summary>
        public string f_qtype { get; set; }

        /// <summary>
        /// 方法技巧 
        /// </summary>
        public string f_func { get; set; }

        /// <summary>
        /// 易错点 
        /// </summary>
        public string f_errorpoint { get; set; }
        /// <summary>
        /// 能力思想 
        /// </summary>
        public string f_thought { get; set; }
        /// <summary>
        /// 解题时间
        /// </summary>
        public int f_answertime { get; set; }

        /// <summary>
        /// 试题详细页路径 
        /// </summary>
        public string f_detailpath { get; set; }

        public static readonly string SplitStr = "\\f\\f";
        public static readonly string AnswerSplitStr = "\\d";

        /// <summary>
        /// 题型ID  语文英语：小题型名称，其余科目：大题型名称   配套题型名称  f_styleName
        /// </summary>
        public int f_style
        {
            get
            {
                switch (this.SubjectId)
                {
                    case 1:
                    case 3:
                        return _f_style;
                        break;
                    default:
                        {
                            if (_f_style <= 100)
                            {
                                return 1;
                            }
                            else if (_f_style <= 200)
                            {
                                return 2;
                            }
                            else
                            {
                                return 3;
                            }
                        }
                        break;
                }

            }

            set { _f_style = value; }
        }

        /// <summary>
        /// 小题型ID 配套题型名称 styleName
        /// </summary>
        public int _f_style;

        /// <summary>
        /// 小题型名称 配套题型ID _f_style
        /// </summary>
        public string StyleName
        {

            get
            {
                QuestionStyleBase obj = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionStyleQuery("CResource")
                                    .QueryQuestionStyle(_f_style);
                return obj == null ? "其它" : obj.f_name;
            }

        }

        /// <summary>
        /// 题型名称 语文英语：小题型名称，其余科目：大题型名称   配套题型ID  f_style
        /// </summary>
        public string f_styleName
        {
            get
            {
                switch (this.SubjectId)
                {
                    case 1:
                    case 3:
                        {
                            QuestionStyleBase obj = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionStyleQuery("CResource")
                                      .QueryQuestionStyle(_f_style);
                            return obj == null ? "其它" : obj.f_name;
                        }
                        break;
                    default:
                        {
                            if (_f_style <= 100)
                            {
                                return "选择题";
                            }
                            else if (_f_style <= 200)
                            {
                                return "填空题";
                            }
                            else
                            {
                                return "解答题";
                            }
                        }

                        break;

                }
            }

        }

        /// <summary>
        /// 试题难度 1-100 1-40简单 41-80中等 81-100 困难 
        /// </summary>
        public int f_difficulty { get; set; }

        public int Difficulty
        {
            get
            {
                if (f_difficulty <= 20)
                    return 1;
                if (f_difficulty <= 40)
                    return 2;
                if (f_difficulty <= 60)
                    return 3;
                if (f_difficulty <= 80)
                    return 4;
                if (f_difficulty <= 100)
                    return 5;
                else
                {
                    return 1;
                }
            }
        }


        /// <summary>
        /// 试题难度描述 1-100 1-40偏易 41-80中档 81-100 偏难 
        /// </summary>
        public string DifficultyDesc
        {
            get
            {
                var diffName = "";
                if (f_difficulty <= 20)
                    diffName = "容易";
                else if (f_difficulty <= 40)
                    diffName = "较易";
                else if (f_difficulty <= 60)
                    diffName = "中等";
                else if (f_difficulty <= 80)
                    diffName = "较难";
                else if (f_difficulty <= 100)
                    diffName = "困难";
                return diffName;
            }
        }

        /// <summary>
        /// 主知识点的名称 
        /// </summary>
        public int f_mainsec { get; set; }
        /// <summary>
        /// 主知识点的名称 
        /// </summary>
        public string f_mainsec1 { get; set; }
        /// <summary>
        /// 试题所在的年级id。 默认值：’’ 注意：需要跟试卷表数据同步 业务层提供 单选和不定项 多选的数据提供 试题如果 在多个 年级下出现 则显示 小年级 
        /// </summary>
        public string f_class { get; set; }
        /// <summary>
        /// 试题的题干 
        /// </summary>
        public string f_body { get; set; }
        /// <summary>
        /// 选项 老题为ABCD ,新题为json格式，Selection 为数组
        /// </summary>
        public string f_selection { get; set; }
        /// <summary>
        /// 试题的答案 
        /// </summary>
        public string f_answer { get; set; }
        /// <summary>
        /// 试题的答案 新题才有，老题为null
        /// </summary>
        public List<string[]> RightAnswer { get; set; }
        /// <summary>
        /// 试题的解析 
        /// </summary>
        public string f_ways { get; set; }
        /// <summary>
        ///  试题的解析 新题才有，老题为null
        /// </summary>
        public List<string> Ways { get; set; }
        /// <summary>
        /// 本题所选的知识点名称的列表。列表中知识点名称的顺序，是按照知识点id从小到大排列的结果。各个知识点名称之间通过两个英文逗号隔开（，，），前后都闭合。 
        /// </summary>
        public string f_secpoint { get; set; }

        /// <summary>
        /// 年份 
        /// </summary>
        public int f_year { get; set; }
        /// <summary>
        /// 学校名称
        /// </summary>
        public string f_schoolname { get; set; }


        /// <summary>
        /// 试卷Id
        /// </summary>
        public int f_paperid { get; set; }

        /// <summary>
        /// 试卷名称
        /// </summary>
        public string f_papername { get; set; }
        /// <summary>
        /// 试卷类型 
        /// </summary>
        public int f_papertype { get; set; }
        /// <summary>
        /// 试卷类型名称
        /// </summary>
        public string f_papertypename { get; set; }

        /// <summary>
        /// 试题是否支持在线作答 
        /// </summary>
        public int f_isanswer { get; set; }
        /// <summary>
        /// 试题所属地区
        /// </summary>
        public string f_areaname { get; set; }
        /// <summary>
        /// 是否是老题 如果是老题 则为1 不是老题 为0 
        /// </summary>
        public int f_isold { get; set; }
        public int f_id { get; set; }

        /// <summary>
        /// 是否多选题和不定项选择题
        /// </summary>
        public bool IsMultipeSelect
        {
            get { return _f_style != 1; }
        }
        #endregion

        /// <summary>
        /// 考法 
        /// </summary>
        public int f_maintest { get; set; }
        public int SubjectId { get; set; }
        /// <summary>
        /// 题型排序
        /// </summary>
        public int OrderByIndex
        {
            get
            {
                switch (this.SubjectId)
                {
                    case 1:
                    case 3:
                        {
                            return _orderByIndex;
                        }
                    default://其它学科按老的顺序处理
                        {
                            if (_f_style <= 100)
                            {
                                return 1;
                            }
                            else if (_f_style <= 200)
                            {
                                return 2;
                            }
                            else
                            {
                                return 3;
                            }
                        }
                }
            }
            set { _orderByIndex = value; }
        }

        private int _orderByIndex;

    }

    public class QuestionListViewModel
    {
        public QuestionListViewModel()
        {
        }

        public QuestionListViewModel(List<Question> questionList, int subjectId)
        {
            this.QuestionList = questionList.Select(m => new QuestionItemViewModel(m, subjectId)).ToList();
        }

        public List<QuestionItemViewModel> QuestionList { get; set; }

    }
    public class SelectionViewModel
    {
        public SelectionViewModel()
        {
        }

        public SelectionViewModel(Selection selection)
        {
            this.desc = selection.desc;
            this.f_content = selection.f_content;
        }

        public string desc { get; set; }

        public string[] f_content { get; set; }
    }
}
