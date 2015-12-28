using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 学能试卷Model
    /// </summary>
    public class SmartExamViewModel
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

    /// <summary>
    /// 学能试卷纬度Model
    /// </summary>
    public class ExamDimViewModel
    {
        /// <summary>
        /// 纬度ID
        /// </summary>
        public int DimID { get; set; }
        /// <summary>
        /// 纬度名称
        /// </summary>
        public string DimName { get; set; }
        /// <summary>
        /// 是否启用
        /// </summary>
        public bool IsEnable { get; set; }
        /// <summary>
        /// 是否固定：1是；否0
        /// </summary>
        public bool IsDefault { get; set; }
        /// <summary>
        /// 排序
        /// </summary>
        public int DimIndex { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime AddTime { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }



        #region MyRegion
        /// <summary>
        /// 试卷ID
        /// </summary>
        public int ExamID { get; set; }

        /// <summary>
        /// 试卷名称
        /// </summary>
        public string ExamName { get; set; }
        /// <summary>
        /// 序号
        /// </summary>
        public int ExamItemIndex { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string ExamRemark { get; set; }
        #endregion
    }


}
