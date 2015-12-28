/******************************************
* 模块名称：实体 教学过程--模板
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
	/// 实体 教学过程--模板
	/// </summary>
	[Description("Primary:PlanPointsID")]
    [Serializable]
	public class ei_plan_points
	{
        #region 构造函数
        /// <summary>
        /// 实体 教学过程--模板
        /// </summary>
        public ei_plan_points(){}
        #endregion

        #region 私有变量
        private long _planpointsid = long.MinValue;
        private long _planid = long.MinValue;
        private long _planindexid = long.MinValue;
        private long _parentid = long.MinValue;
        private byte[] _iseffect = null;
        private byte[] _isroot = null;
        private byte[] _isleaf = null;
        private byte _currentlever = byte.MaxValue;
        private byte[] _ishas = null;
        private Int32 _egnumber = Int32.MinValue;
        private Int32 _worknumber = Int32.MinValue;
        private string _pointid = null;
        private string _pointname = null;
        private Int32 _pointindex = Int32.MinValue;
        private DateTime _createtime = DateTime.MinValue;
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
        /// 节课ID(NOT NULL)
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
        /// <summary>
        /// 是否有效：1是；0否(NOT NULL)
        /// </summary>
        public byte[] IsEffect
        {
            set{ _iseffect=value;}
            get{return _iseffect;}
        }
        /// <summary>
        /// 是否根节点：1是；0否(NOT NULL)
        /// </summary>
        public byte[] IsRoot
        {
            set{ _isroot=value;}
            get{return _isroot;}
        }
        /// <summary>
        /// 是否叶子节点：1是；0否(NOT NULL)
        /// </summary>
        public byte[] IsLeaf
        {
            set{ _isleaf=value;}
            get{return _isleaf;}
        }
        /// <summary>
        /// 当前层级(NOT NULL)
        /// </summary>
        public byte CurrentLever
        {
            set{ _currentlever=value;}
            get{return _currentlever;}
        }
        /// <summary>
        /// 是否有子节点：1是；0否(NOT NULL)
        /// </summary>
        public byte[] IsHas
        {
            set{ _ishas=value;}
            get{return _ishas;}
        }
        /// <summary>
        /// 例题总数量(NOT NULL)
        /// </summary>
        public Int32 EgNumber
        {
            set{ _egnumber=value;}
            get{return _egnumber;}
        }
        /// <summary>
        /// 练习总数量(NOT NULL)
        /// </summary>
        public Int32 WorkNumber
        {
            set{ _worknumber=value;}
            get{return _worknumber;}
        }
        /// <summary>
        /// 知识点ID(NOT NULL)
        /// </summary>
        public string PointID
        {
            set{ _pointid=value;}
            get{return _pointid;}
        }
        /// <summary>
        /// 知识点名称(NOT NULL)
        /// </summary>
        public string PointName
        {
            set{ _pointname=value;}
            get{return _pointname;}
        }
        /// <summary>
        /// 排序(NOT NULL)
        /// </summary>
        public Int32 PointIndex
        {
            set{ _pointindex=value;}
            get{return _pointindex;}
        }
        /// <summary>
        /// 添加时间(NOT NULL)
        /// </summary>
        public DateTime CreateTime
        {
            set{ _createtime=value;}
            get{return _createtime;}
        }
        #endregion
	}

}
