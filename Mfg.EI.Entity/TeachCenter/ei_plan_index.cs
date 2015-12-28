/******************************************
* 模块名称：实体 计划--课节表--模板
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
	/// 实体 计划--课节表--模板
	/// </summary>
	[Description("Primary:PlanIndexID")]
    [Serializable]
	public class ei_plan_index
	{
        #region 构造函数
        /// <summary>
        /// 实体 计划--课节表--模板
        /// </summary>
        public ei_plan_index(){}
        #endregion

        #region 私有变量
        private long _planindexid = long.MinValue;
        private long _planid = long.MinValue;
        private string _numbername = null;
        private string _titlename = null;
        private byte _indextype = byte.MaxValue;
        private short _inumber = short.MaxValue;
        private Int32 _readnumber = Int32.MinValue;
        private Int32 _printnumber = Int32.MinValue;
        private byte[] _iseffect = null;
        private byte[] _istitle = null;
        private byte[] _isfirst = null;
        private byte[] _istarget = null;
        private byte[] _isdiff = null;
        private byte[] _issummary = null;
        private string _firstmark = null;
        private string _targetmark = null;
        private string _diffmark = null;
        private string _summarymark = null;
        private string _printtid = null;
        private string _printtime = null;
        private DateTime _createtime = DateTime.MinValue;
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
        /// <summary>
        /// 节点名称（第几次课）(NOT NULL)
        /// </summary>
        public string NumberName
        {
            set{ _numbername=value;}
            get{return _numbername;}
        }
        /// <summary>
        /// 教案名称(NOT NULL)
        /// </summary>
        public string TitleName
        {
            set{ _titlename=value;}
            get{return _titlename;}
        }
        /// <summary>
        /// 状态：0末开始；1进行中；2已完成
        /// </summary>
        public byte IndexType
        {
            set{ _indextype=value;}
            get{return _indextype;}
        }
        /// <summary>
        /// 次课序号(NOT NULL)
        /// </summary>
        public short INumber
        {
            set{ _inumber=value;}
            get{return _inumber;}
        }
        /// <summary>
        /// 查看总次数(NOT NULL)
        /// </summary>
        public Int32 ReadNumber
        {
            set{ _readnumber=value;}
            get{return _readnumber;}
        }
        /// <summary>
        /// 打印预览次数(NOT NULL)
        /// </summary>
        public Int32 PrintNumber
        {
            set{ _printnumber=value;}
            get{return _printnumber;}
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
        /// 是否显示标题(NOT NULL)
        /// </summary>
        public byte[] IsTitle
        {
            set{ _istitle=value;}
            get{return _istitle;}
        }
        /// <summary>
        /// 是否显示引入；1是；0否(NOT NULL)
        /// </summary>
        public byte[] IsFirst
        {
            set{ _isfirst=value;}
            get{return _isfirst;}
        }
        /// <summary>
        /// 是否显示学习目标(NOT NULL)
        /// </summary>
        public byte[] IsTarget
        {
            set{ _istarget=value;}
            get{return _istarget;}
        }
        /// <summary>
        /// 是否显示困难度；1是；0否(NOT NULL)
        /// </summary>
        public byte[] IsDiff
        {
            set{ _isdiff=value;}
            get{return _isdiff;}
        }
        /// <summary>
        /// 是否显示总结(NOT NULL)
        /// </summary>
        public byte[] IsSummary
        {
            set{ _issummary=value;}
            get{return _issummary;}
        }
        /// <summary>
        /// 课堂引入
        /// </summary>
        public string FirstMark
        {
            set{ _firstmark=value;}
            get{return _firstmark;}
        }
        /// <summary>
        /// 教学目标
        /// </summary>
        public string TargetMark
        {
            set{ _targetmark=value;}
            get{return _targetmark;}
        }
        /// <summary>
        /// 重难点分析
        /// </summary>
        public string DiffMark
        {
            set{ _diffmark=value;}
            get{return _diffmark;}
        }
        /// <summary>
        /// 方法与总结
        /// </summary>
        public string SummaryMark
        {
            set{ _summarymark=value;}
            get{return _summarymark;}
        }
        /// <summary>
        /// 打印预览教师ID列表，格式为（123,456,678）
        /// </summary>
        public string PrintTID
        {
            set{ _printtid=value;}
            get{return _printtid;}
        }
        /// <summary>
        /// 打印预览时间，格式为：('2015-4-5','2016-5-4')
        /// </summary>
        public string PrintTime
        {
            set{ _printtime=value;}
            get{return _printtime;}
        }
        /// <summary>
        /// 创建时间(NOT NULL)
        /// </summary>
        public DateTime CreateTime
        {
            set{ _createtime=value;}
            get{return _createtime;}
        }
        #endregion
	}

 
}
