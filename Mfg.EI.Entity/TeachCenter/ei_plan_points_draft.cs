/******************************************
* 模块名称：实体 教学过程--草稿
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
	/// 实体 教学过程--草稿
	/// </summary>
	[Description("Primary:PlanPointsID")]
    [Serializable]
	public class ei_plan_points_draft
	{
        #region 构造函数
        /// <summary>
        /// 实体 教学过程--草稿
        /// </summary>
        public ei_plan_points_draft(){}
        #endregion

        #region 私有变量
        private long _planpointsid = long.MinValue;
        private long _planid = long.MinValue;
        private long _planindexid = long.MinValue;
        private long _parentid = long.MinValue;
        #endregion

        #region 公共属性
        /// <summary>
        /// 主键 计划详细ID(NOT NULL)
        /// </summary>
        public long PlanPointsID
        {
            set{ _planpointsid=value;}
            get{return _planpointsid;}
        }
        /// <summary>
        /// 计划ID(NOT NULL)
        /// </summary>
        public long PlanID
        {
            set{ _planid=value;}
            get{return _planid;}
        }
        /// <summary>
        /// 节课属性(NOT NULL)
        /// </summary>
        public long PlanIndexID
        {
            set{ _planindexid=value;}
            get{return _planindexid;}
        }
        /// <summary>
        /// 父ID
        /// </summary>
        public long ParentID
        {
            set{ _parentid=value;}
            get{return _parentid;}
        }
        #endregion
	}


}
