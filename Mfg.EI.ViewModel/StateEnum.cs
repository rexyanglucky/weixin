using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel;
namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 学生作业状态
    /// </summary>
    public enum StateEnum
    {
        #region 电子作业批改状态
        /// <summary>
        /// 未提交
        /// </summary>
        [Description("未提交")]
        NoSubmit = 0,

        /// <summary>
        /// 已提交
        /// </summary>
        [Description("已提交")]
        Sumbit = 1,

        /// <summary>
        /// 已批改
        /// </summary>
        [Description("已批改")]
        correct = 2,
        #endregion



    }
    /// <summary>
    /// 试题类型
    /// </summary>
    public enum ItemState : int
    {
        #region 试题类型

        /// <summary>
        /// 选择题
        /// </summary>
        [Description("选择题")]
        Choice = 1,

        /// <summary>
        /// 填空题
        /// </summary>
        [Description("填空题")]
        Completion = 2,

        /// <summary>
        /// 填空题
        /// </summary>
        [Description("解答题")]
        Answer = 3,

        #endregion
    }
}
