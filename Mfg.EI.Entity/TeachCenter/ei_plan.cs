/******************************************
* 模块名称：实体 教学计划--模板
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
    /// 实体 教学计划--模板
    /// </summary>
    [Description("Primary:PlanID")]
    [Serializable]
    public class ei_plan
    {
        #region 构造函数
        /// <summary>
        /// 实体 教学计划--模板
        /// </summary>
        public ei_plan() { }
        #endregion

        #region 私有变量
        private long _planid;
        private Int32 _planversion;
        private string _planname;
        private short _plannumber;
        private byte _teachsituation;
        private Int32 _stageid;
        private Int32 _gradeid;
        private Int32 _subjectid;
        private string _materialid;
        private string _materialname;
        private string _remarks;
        private DateTime _createtime;
        #endregion

        #region 公共属性
        /// <summary>
        /// 主键 计划ID(NOT NULL)
        /// </summary>
        public long PlanID
        {
            set { _planid = value; }
            get { return _planid; }
        }
        /// <summary>
        /// 版本号(NOT NULL)
        /// </summary>
        public Int32 PlanVersion
        {
            set { _planversion = value; }
            get { return _planversion; }
        }
        /// <summary>
        /// 计划名称(NOT NULL)
        /// </summary>
        public string PlanName
        {
            set { _planname = value; }
            get { return _planname; }
        }
        /// <summary>
        /// 次课总数量(NOT NULL)
        /// </summary>
        public short PlanNumber
        {
            set { _plannumber = value; }
            get { return _plannumber; }
        }
        /// <summary>
        /// 教学情境：1同步教学；2综合复习；(NOT NULL)
        /// </summary>
        public byte TeachSituation
        {
            set { _teachsituation = value; }
            get { return _teachsituation; }
        }
        /// <summary>
        /// 大年级(1，2，3)；小升初：1；中考：2；高考：3(NOT NULL)
        /// </summary>
        public Int32 StageID
        {
            set { _stageid = value; }
            get { return _stageid; }
        }
        /// <summary>
        /// 小年级(NOT NULL)
        /// </summary>
        public Int32 GradeID
        {
            set { _gradeid = value; }
            get { return _gradeid; }
        }
        /// <summary>
        /// 科目(NOT NULL)
        /// </summary>
        public Int32 SubjectID
        {
            set { _subjectid = value; }
            get { return _subjectid; }
        }
        /// <summary>
        /// 教材ID
        /// </summary>
        public string MaterialID
        {
            set { _materialid = value; }
            get { return _materialid; }
        }
        /// <summary>
        /// 教材名称
        /// </summary>
        public string MaterialName
        {
            set { _materialname = value; }
            get { return _materialname; }
        }
        /// <summary>
        /// 备注
        /// </summary>
        public string Remarks
        {
            set { _remarks = value; }
            get { return _remarks; }
        }
        /// <summary>
        /// 创建时间(NOT NULL)
        /// </summary>
        public DateTime CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }
        #endregion

        /// <summary>
        /// 资源是否支持考法
        /// </summary>
        public bool IsHaveKfSubject { get; set; }
    }


}
