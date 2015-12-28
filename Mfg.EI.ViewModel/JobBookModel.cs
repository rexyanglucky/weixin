/*
 * author:谢利民;
 * function:作业箱模型
 * adddate:2015-07-09
 * updatedate:2015-07-09
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 作业箱列表模型
    /// </summary>
    public class JobBookModel
    {
        /// <summary>
        /// 
        /// </summary>
        public int Index { get; set; }
        /// <summary>
        /// 作业本ID
        /// </summary>
        public string ID { get; set; }

        /// <summary>
        /// 作业本名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 来源者名称
        /// </summary>
        public string TeacherName { get; set; }

        /// <summary>
        /// 教师ID(来源)
        /// </summary>
        public string TID { get; set; }

        /// <summary>
        /// 大年级 1小学 2初中 3高中
        /// </summary>
        public int StageID { get; set; }

        /// <summary>
        /// 小年级ID
        /// </summary>
        public int GradeID { get; set; }

        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; }

        /// <summary>
        /// 科目名称
        /// </summary>
        public string SubjectName { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 修改时间
        /// </summary>
        public DateTime UpdateTime { get; set; }

        /// <summary>
        /// 是否布置 0 否 1是
        /// </summary>
        public int IsAssign { get; set; }

        /// <summary>
        /// 是否编辑 0 否1 是
        /// </summary>
        public int IsEdit { get; set; }

        /// <summary>
        /// 是否删除 0否 1 是
        /// </summary>
        public int IsDel { get; set; }

        /// <summary>
        /// 是否共享 0 否1是
        /// </summary>
        public int IsShare { get; set; }

        /// <summary>
        /// 考试时间
        /// </summary>
        public int ExamTime { get; set; }

        /// <summary>
        /// 作业箱试题列表
        /// </summary>
        public List<JBookRelIModel> JBookModelList { get; set; }

        /// <summary>
        /// 题库集合
        /// </summary>
        public List<QuestionAttrModel> QuestionList { get; set; }

    }

    /// <summary>
    /// 作业箱与试题关联模型
    /// </summary>
    public class JBookRelIModel
    {
        /// <summary>
        /// 
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string BookID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int? SequenceID { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int? ItemID { get; set; }


        /// <summary>
        /// 
        /// </summary>
        public int? ItemType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int? KnowledgeID { get; set; }

        public string KnowledgeName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int? ItemSourceType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public float? Score { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int PID { get; set; }

        public int DiffNum { get; set; }
    }

    /// <summary>
    /// 参数条件
    /// </summary>
    public class ParamFilterModel
    {
        /// <summary>
        /// 教师ID(来源)
        /// </summary>
        public string TID { get; set; }

        /// <summary>
        /// 大年级 1小学 2初中 3高中
        /// </summary>
        public int StageID { get; set; }

        /// <summary>
        /// 小年级ID
        /// </summary>
        public int GradeID { get; set; }

        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; } 
        /// <summary>
        /// 
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int PageSize { get; set; }

        /// <summary>
        ///机构ID
        /// </summary>
        public int OrgID { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public List<JobBookModel> bookmodelList { get; set; }

        public string pageNavigate { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int MaxCount { get; set; }
    }

}
