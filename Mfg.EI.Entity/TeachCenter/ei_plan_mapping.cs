/******************************************
* 模块名称：实体 用户与计划关联表
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
	/// 实体 用户与计划关联表
	/// </summary>
	[Description("Primary:MappingID")]
    [Serializable]
	public class ei_plan_mapping
	{
        #region 构造函数
        /// <summary>
        /// 实体 用户与计划关联表
        /// </summary>
        public ei_plan_mapping(){}
        #endregion

        #region 私有变量
        private long _mappingid = long.MinValue;
        private byte _sourcetype = byte.MaxValue;
        private string _souceid = null;
        private Int32 _orgid = Int32.MinValue;
        private Int32 _tid = Int32.MinValue;
        private long _planid = long.MinValue;
        private Int32 _stageid = Int32.MinValue;
        private Int32 _gradeid = Int32.MinValue;
        private Int32 _subjectid = Int32.MinValue;
        private short _currentnumber = short.MaxValue;
        private byte[] _isshare = null;
        private byte[] _iseffect = null;
        private byte[] _isdelete = null;
        private byte[] _isedit = null;
        private byte[] _isfinish = null;
        private byte[] _istest = null;
        private byte[] _isquote = null;
        private long _parentplanid = long.MinValue;
        private short _quotednumber = short.MaxValue;
        private DateTime _createtime = DateTime.MinValue;
        private DateTime _lastupdatetime = DateTime.MinValue;
        private Int32 _lasttid = Int32.MinValue;
        #endregion

        #region 公共属性
        /// <summary>
        /// 主键 主键(NOT NULL)
        /// </summary>
        public long MappingID
        {
            set{ _mappingid=value;}
            get{return _mappingid;}
        }
        /// <summary>
        /// 0为模板；1为学生；2为组；(NOT NULL)
        /// </summary>
        public byte SourceType
        {
            set{ _sourcetype=value;}
            get{return _sourcetype;}
        }
        /// <summary>
        /// 用户ID或组ID(NOT NULL)
        /// </summary>
        public string SouceID
        {
            set{ _souceid=value;}
            get{return _souceid;}
        }
        /// <summary>
        /// 机构ID(NOT NULL)
        /// </summary>
        public Int32 OrgID
        {
            set{ _orgid=value;}
            get{return _orgid;}
        }
        /// <summary>
        /// 创建者ID(NOT NULL)
        /// </summary>
        public Int32 TID
        {
            set{ _tid=value;}
            get{return _tid;}
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
        /// 大年级(1，2，3)；小升初：1；中考：2；高考：3(NOT NULL)
        /// </summary>
        public Int32 StageID
        {
            set{ _stageid=value;}
            get{return _stageid;}
        }
        /// <summary>
        /// 小年级(NOT NULL)
        /// </summary>
        public Int32 GradeID
        {
            set{ _gradeid=value;}
            get{return _gradeid;}
        }
        /// <summary>
        /// 科目(NOT NULL)
        /// </summary>
        public Int32 SubjectID
        {
            set{ _subjectid=value;}
            get{return _subjectid;}
        }
        /// <summary>
        /// 当前进度(NOT NULL)
        /// </summary>
        public short CurrentNumber
        {
            set{ _currentnumber=value;}
            get{return _currentnumber;}
        }
        /// <summary>
        /// 是否共享；1是；0否；（同机构可见）(NOT NULL)
        /// </summary>
        public byte[] IsShare
        {
            set{ _isshare=value;}
            get{return _isshare;}
        }
        /// <summary>
        /// 0为无效；1为有效（保存的标志）(NOT NULL)
        /// </summary>
        public byte[] IsEffect
        {
            set{ _iseffect=value;}
            get{return _iseffect;}
        }
        /// <summary>
        /// 是否删除：1删除；0不删除(NOT NULL)
        /// </summary>
        public byte[] IsDelete
        {
            set{ _isdelete=value;}
            get{return _isdelete;}
        }
        /// <summary>
        /// 是否处于编辑状态：1是；0否(NOT NULL)
        /// </summary>
        public byte[] IsEdit
        {
            set{ _isedit=value;}
            get{return _isedit;}
        }
        /// <summary>
        /// 是否完成授课：1是；0否(NOT NULL)
        /// </summary>
        public byte[] IsFinish
        {
            set{ _isfinish=value;}
            get{return _isfinish;}
        }
        /// <summary>
        /// 是否有测评数据：1有；0无(NOT NULL)
        /// </summary>
        public byte[] IsTest
        {
            set{ _istest=value;}
            get{return _istest;}
        }
        /// <summary>
        /// 是否引用：1是；0否(NOT NULL)
        /// </summary>
        public byte[] IsQuote
        {
            set{ _isquote=value;}
            get{return _isquote;}
        }
        /// <summary>
        /// 引用计划的ID(NOT NULL)
        /// </summary>
        public long ParentPlanID
        {
            set{ _parentplanid=value;}
            get{return _parentplanid;}
        }
        /// <summary>
        /// 被引用次数；(NOT NULL)
        /// </summary>
        public short QuotedNumber
        {
            set{ _quotednumber=value;}
            get{return _quotednumber;}
        }
        /// <summary>
        /// 创建时间(NOT NULL)
        /// </summary>
        public DateTime CreateTime
        {
            set{ _createtime=value;}
            get{return _createtime;}
        }
        /// <summary>
        /// 最后一次操作时间(NOT NULL)
        /// </summary>
        public DateTime LastUpdateTime
        {
            set{ _lastupdatetime=value;}
            get{return _lastupdatetime;}
        }
        /// <summary>
        /// 最后一次修改人(NOT NULL)
        /// </summary>
        public Int32 LastTID
        {
            set{ _lasttid=value;}
            get{return _lasttid;}
        }
        #endregion
	}


}
