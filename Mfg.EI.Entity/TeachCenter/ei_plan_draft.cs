/******************************************
* 模块名称：实体 教学计划--草稿
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
	/// 实体 教学计划--草稿
	/// </summary>
	[Description("Primary:PlanID")]
    [Serializable]
	public class ei_plan_draft
	{
        #region 构造函数
        /// <summary>
        /// 实体 教学计划--草稿
        /// </summary>
        public ei_plan_draft(){}
        #endregion

        #region 私有变量
        private long _planid = long.MinValue;
        #endregion

        #region 公共属性
        /// <summary>
        /// 主键 计划ID(NOT NULL)
        /// </summary>
        public long PlanID
        {
            set{ _planid=value;}
            get{return _planid;}
        }
        #endregion
	}

  
}
