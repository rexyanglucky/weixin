using System;

namespace Mfg.EI.Entity
{
    public class QueBoxMain
    {
        /// <summary>
        /// 试卷ID
        /// </summary>
        public string PID { get; set; }

        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID { get; set; }

        /// <summary>
        /// 教师ID
        /// </summary>
        public int TID { get; set; }


        /// <summary>
        /// 来源
        /// </summary>
        public int ItemSourceType { get; set; }


        /// <summary>
        /// 来源
        /// </summary>
        public bool IsShare { get; set; }


        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; }


        /// <summary>
        /// 大年纪
        /// </summary>
        public int BigGrade { get; set; }

        /// <summary>
        /// 小年纪
        /// </summary>
        public int GradeID { get; set; }


        /// <summary>
        /// 试卷名称
        /// </summary>
        public string PaperName { get; set; }

        /// <summary>
        /// 选择题分数
        /// </summary>
        public int Score { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 上次更新时间
        /// </summary>
        public DateTime UpdateTime { get; set; }
    }
}