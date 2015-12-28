/******************************************
* 模块名称：实体 例题与练习--草稿
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
	/// 实体 例题与练习--草稿
	/// </summary>
	[Description("Primary:DetailID")]
    [Serializable]
	public class ei_plan_details_draft
	{
        #region 构造函数
        /// <summary>
        /// 实体 例题与练习--草稿
        /// </summary>
        public ei_plan_details_draft(){}
        #endregion

        #region 私有变量
        private long _detailid = long.MinValue;
        private long _planpointsid = long.MinValue;
        private byte _pointtype = byte.MaxValue;
        #endregion

        #region 公共属性
        /// <summary>
        /// 主键 试题详细表ID(NOT NULL)
        /// </summary>
        public long DetailID
        {
            set{ _detailid=value;}
            get{return _detailid;}
        }
        /// <summary>
        /// 对应过程ID(NOT NULL)
        /// </summary>
        public long PlanPointsID
        {
            set{ _planpointsid=value;}
            get{return _planpointsid;}
        }
        /// <summary>
        /// 例题为1；练习为2；(NOT NULL)
        /// </summary>
        public byte PointType
        {
            set{ _pointtype=value;}
            get{return _pointtype;}
        }
        #endregion
	}

  
}
