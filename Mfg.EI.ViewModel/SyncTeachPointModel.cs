using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class SyncTeachPointModel
    {
        public string f_pointid { get; set; }


        public string f_parent { get; set; }

        public string f_parentName { get; set; }

        public int GroupID { get; set; }

        public string f_name { get; set; }


        public int f_sec { get; set; }

        public bool IsLeaf { get; set; }

        public int f_questioncount { get; set; }

        public double DefaultHour { get; set; }

        public double ClassHour { get; set; }


        /// <summary>
        /// 奖杯数
        /// </summary>
        public int CupCount { get; set; }

        //父节点奖杯数
        public int CupTotalCount { get; set; }
    }


    public class QuestionAnswer
    {
        public string f_body { get; set; }

        public int f_isold { get; set; }

        public int f_id { get; set; }

        public string AnswerList { get; set; }

        public string f_answer { get; set; }

        public int f_difficulty { get; set; }

        /// <summary>
        /// 1单选; 2多选题；3不定项选择题；4为双选题; ELSE 多选题
        /// </summary>
        public int f_Style { get; set; }

        public string f_StyleName { get; set; }
    }

    public class QuestionPage
    {
        /// <summary>
        /// 考法
        /// </summary>
        public int f_maintest { get; set; }
        public string f_body { get; set; }

        public string f_ways { get; set; }

        public string f_answer { get; set; }

        /// <summary>
        /// 试卷Id
        /// </summary>
        public int f_paperid { get; set; }

        public string f_typename { get; set; }

        public int f_style { get; set; }

        /// <summary>
        /// 题型名称
        /// </summary>
        public string f_styleName { get; set; }

        public int f_isold { get; set; }

        public int f_id { get; set; }

        public int f_difficulty { get; set; }


        public int f_mainsec { get; set; }

        public string f_mainsec1 { get; set; }

        /// <summary>
        /// 是否收藏
        /// </summary>
        public bool IsStore { get; set; }

        public string f_answerok { get; set; }

        public string f_province { get; set; }

        public string f_Class { get; set; }

        public float score { get; set; }
        /// <summary>
        /// 难度描述
        /// </summary>
        public string DifficultyDesc { get; set; }


        /// <summary>
        /// 排序
        /// </summary>
        public int OrderByIndex { get; set; }
    }

    public class QuestionPageIndex
    {
        public string pageNavigate { get; set; }

        public int TotalCount { get; set; }

        public List<QuestionPage> Data { get; set; }
    }
}
