using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Entity;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 学能试卷Model
    /// </summary>
    public class SmartExamReportViewModel
    {
        /// <summary>
        /// 维度列表
        /// </summary>
        public List<DimResult> DimList { get; set; }
        /// <summary>
        /// 试卷ID
        /// </summary>
        public string MeasureId { get; set; }
        /// <summary>
        /// 测试卷ID
        /// </summary>
        public string ExamId { get; set; }

        public string ExamName { get; set; }
        public string ReportDescResult { get; set; }


        public int ExamEdition { get; set; }
    }

    public class DimResult
    {
        /// <summary>
        /// 对应维度回答ID
        /// </summary>
        public int ResultId { get; set; }
        public string DimName;
        public string DocValue;
        public string Description;
        public string LocalDescription;
        public string DimRemark;

        /// <summary>
        /// 每个型所得分值列表
        /// </summary>
        public List<DimPatrrenResult> PatrrenList { get; set; }
    }

    public class DimPatrrenResult
    {
        /// <summary>
        /// 对应维度回答ID
        /// </summary>
        public int ResultId { get; set; }
        public int ParttenId { get; set; }
        public int ParttenValue { get; set; }
        public float ParttenValuePercent { get; set; }

        public string PattrenName { get; set; }

        public int DocKey { get; set; }

        public int DocEnum { get; set; }
    }
}
