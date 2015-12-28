/*
 * author:谢利民;
 * function:公告表【EI_Announcement】实体类
 * adddate:2015-05-13
 * updatedate:2015-05-13
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Entity
{
    /// <summary>
    /// 同步学习课后作业表【EI_SyncJob】
    /// </summary>
   public class EI_SyncJob
    {
       public EI_SyncJob()
        { }
        #region Model
        private string _id = "00000000-0000-0000-0000-000000000000";
        private string _sid=string.Empty;
        private int? _knowledgeid = 0;
        private string _knowledgename = string.Empty;
        private int? _gradeid = 0;
        private int? _subjectid = 0;
        private int? _state = 0;
        private DateTime _createtime = DateTime.Now;
        private int? _delflag = 0;
        private string _remark;
        private int? _roundnumber = 0;//奖杯数
        private string _masterrate = string.Empty;
        private int? _ruletype = 0;
        private int? _tropnumber = 0;
        /// <summary>
        /// 作业ID
        /// </summary>
        public string ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string SID
        {
            set { _sid = value; }
            get { return _sid; }
        }

       public int? KnowledgeID
        {
            set { _knowledgeid = value; }
            get { return _knowledgeid; }
        }

       /// <summary>
       /// 
       /// </summary>
       public string KnowledgeName
       {
           set { _knowledgename = value; }
           get { return _knowledgename; }
       }
        /// <summary>
        /// 
        /// </summary>
        public int? GradeID
        {
            set { _gradeid = value; }
            get { return _gradeid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? SubjectID
        {
            set { _subjectid = value; }
            get { return _subjectid; }
        }
     
        /// <summary>
        /// 
        /// </summary>
        public int? State
        {
            set { _state = value; }
            get { return _state; }
        }
     
        /// <summary>
        /// 
        /// </summary>
        public DateTime CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? DelFlag
        {
            set { _delflag = value; }
            get { return _delflag; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Remark
        {
            set { _remark = value; }
            get { return _remark; }
        }


       /// <summary>
       /// 
       /// </summary>
       public int? RoundNumber
        {
            set { _roundnumber = value; }
            get { return _roundnumber; }
        }

       /// <summary>
       /// 
       /// </summary>
       public string MasterRate
       {
           set { _masterrate = value; }
           get { return _masterrate; }
       }

       /// <summary>
       /// 
       /// </summary>
       public int? RuleType
       {
           set { _ruletype = value; }
           get { return _ruletype; }
       }

       /// <summary>
       /// 
       /// </summary>
       public int? TropNumber 
       {
           set { _tropnumber = value; }
           get { return _tropnumber; }
       }
        #endregion Model

       /// <summary>
       /// 大年级
       /// </summary>
       public int StageID { get; set; }

       /// <summary>
       /// 知识点详细ID
       /// </summary>
       public string KnowledgeDetialID { get; set; }
    }
}
