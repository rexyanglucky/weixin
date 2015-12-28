using Mfg.EI.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class TestExamModel : EI_TestExam
    {
        public string TeacherName { get; set; }

        public string StageIDMapping
        {
            get
            {
                switch (this.StageID)
                {
                    case 1: return "x";
                    case 2: return "c";
                    case 3: return "g";
                    default:
                        return "";
                }
            }
        }

        public string GradeStr
        {
            get
            {
                switch (this.GradeID)
                {
                    case 1: return "一年级";
                    case 2: return "二年级";
                    case 3: return "三年级";
                    case 4: return "四年级";
                    case 5: return "五年级";
                    case 6: return "六年级";
                    case 7: return "七年级";
                    case 8: return "八年级";
                    case 9: return "九年级";
                    case 10: return "高一";
                    case 11: return "高二";
                    case 12: return "高三";
                    default: return "";
                }
            }
        }

        public int Index { get; set; }

        public string CreateTimeStr { get { return this.LastUpdateTime.ToString(); } }
    }


    public class TestExamPageModel
    {
        public string TID { get; set; }

        public int SubjectID { get; set; }

        public byte StageID { get; set; }

        public byte GradeID { get; set; }

        public byte ExamTerm { get; set; }

        public int PageSize { get; set; }

        public int PageIndex { get; set; }

        public int MaxCount { get; set; }

        public List<TestExamModel> list { get; set; }

        public string pageNavigate { get; set; }

    }


    public class TestExamItemModel : EI_TestExamItem
    {
        public string SubjectIDMapping { get { return "0" + this.SubjectID.ToString(); } }


        public int SubjectID { get; set; }

        /// <summary>
        /// 小年级1到12
        /// </summary>
        public int GradeID { get; set; }

        /// <summary>
        /// 大年级1到3
        /// </summary>
        public int StageID { get; set; }

        public string ExamName { get; set; }

        public string KnowledgeName { get; set; }
    }

    public class TestExamItemPreModel
    {
        public List<QuestionPage> List { get; set; }

        public string ExamName { get; set; }
    }

    public class TestSingleBaseModel
    {
        public List<ManRelStaModel> list { get; set; }

        public int TID { get; set; }

    }

}
