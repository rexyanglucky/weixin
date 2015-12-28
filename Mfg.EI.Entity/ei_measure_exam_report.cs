
namespace Mfg.EI.Entity
{
    /// <summary>
    /// 学能报告实体类
    /// </summary>
    public class EI_Measure_Exam_Report
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int ExamID { get; set; }

        /// <summary>
        /// 试卷名称
        /// </summary>
        public string ExamName { get; set; }

        /// <summary>
        /// 预计时间（单位分钟）
        /// </summary>
        public float ExpectTime { get; set; }


        /// <summary>
        /// 序号
        /// </summary>
        public int ItemIndex { get; set; }

        /// <summary>
        /// 年龄范围
        /// </summary>
        public string AgeRange { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
    }
}
