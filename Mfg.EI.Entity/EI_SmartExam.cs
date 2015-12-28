using System;

namespace Mfg.EI.Entity
{
    /// <summary>
    /// 学能试卷实体
    /// </summary>
    [Serializable]
    public class EI_SmartExam
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
        /// 版本
        /// </summary>
        public int ExamEdition { get; set; }


        /// <summary>
        /// 预计时间（单位分钟）
        /// </summary>
        public float ExpectTime { get; set; }

        /// <summary>
        /// 是否启用
        /// </summary>
        public int IsEnable { get; set; }

        /// <summary>
        /// 序号
        /// </summary>
        public int ItemIndex { get; set; }

        /// <summary>
        /// 年龄范围
        /// </summary>
        public string AgeRange { get; set; }

        /// <summary>
        /// 添加时间
        /// </summary>
        public DateTime AddTime { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }
    }
}
