using System;

namespace Mfg.EI.Entity
{
    /// <summary>
    /// 试卷主题
    /// </summary>
    public class EI_Measure_exam
    {
        /// <summary>
        /// 试卷主键
        /// </summary>
        public int MeasureID { get; set; }

        /// <summary>
        /// 状态：0无效，1开始作答，2答题完毕（有效测评）255删除；
        /// </summary>
        public int MeasureStatus { get; set; }

        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID { get; set; }

        /// <summary>
        /// 临时学生id
        /// </summary>
        public string TempID { get; set; }

        /// <summary>
        /// 教师Id
        /// </summary>
        public int TID { get; set; }

        /// <summary>
        ///试卷Id 
        /// </summary>
        public int ExamID { get; set; }

        /// <summary>
        /// 试卷名称
        /// </summary>
        public string ExamName { get; set; }

        /// <summary>
        /// 试卷版本
        /// </summary>
        public int ExamEdition { get; set; }


        /// <summary>
        /// 预计时间
        /// </summary>
        public float ExpectTime { get; set; }


        /// <summary>
        /// 测评范围
        /// </summary>
        public string AgeRange { get; set; }


        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime AddTime { get; set; }

        /// <summary>
        /// 开始答题时间
        /// </summary>
        public DateTime MeasureTime { get; set; }


        /// <summary>
        /// 答题完毕时间
        /// </summary>
        public DateTime LastEditTime { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }



        /// <summary>
        /// 纬度ids
        /// </summary>
        public string DimIDs { get; set; }
    }
}
