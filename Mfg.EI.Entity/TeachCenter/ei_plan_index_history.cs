/******************************************
* 模块名称：实体 计划--课节表--历史
* 当前版本：1.0
* 开发人员：rex
* 生成时间：2015/12/5
* 版本历史：此代码由 VB/C#.Net实体代码生成工具(EntitysCodeGenerate 4.6) 自动生成。
* 
******************************************/
using System;
using System.Collections;
using System.Collections.Specialized;
using System.ComponentModel;

namespace Mfg.EI.Entity
{
	/// <summary>
	/// 实体 计划--课节表--历史
	/// </summary>
	[Description("Primary:PlanIndexID")]
    [Serializable]
	public class ei_plan_index_history
	{
        #region 构造函数
        /// <summary>
        /// 实体 计划--课节表--历史
        /// </summary>
        public ei_plan_index_history(){}
        #endregion

        #region 私有变量
        private long _planindexid = long.MinValue;
        private long _planid = long.MinValue;
        #endregion

        #region 公共属性
        /// <summary>
        /// 主键 节课属性(NOT NULL)
        /// </summary>
        public long PlanIndexID
        {
            set{ _planindexid=value;}
            get{return _planindexid;}
        }
        /// <summary>
        /// 计划ID(NOT NULL)
        /// </summary>
        public long PlanID
        {
            set{ _planid=value;}
            get{return _planid;}
        }
        #endregion
	}

}
