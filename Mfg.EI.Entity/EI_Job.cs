using System;
namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_Job:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_Job
    {
        public EI_Job()
        { }
        #region Model
        private string _id = "00000000-0000-0000-0000-000000000000";
        private string _name;
        private int? _gradeid = 0;
        private int? _subjectid = 0;
        private DateTime? _endtime = DateTime.Now;
        private int? _state = 0;
        private string _tid = "0";
        private DateTime _createtime = DateTime.Now;
        private int? _delflag = 0;
        private string _remark;

        private int _stageid = 0;

        /// <summary>
        /// 
        /// </summary>
        public string ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Name
        {
            set { _name = value; }
            get { return _name; }
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
        public DateTime? EndTime
        {
            set { _endtime = value; }
            get { return _endtime; }
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
        public string TID
        {
            set { _tid = value; }
            get { return _tid; }
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

        public int StageID
        {
            set { _stageid = value; }
            get { return _stageid; }

        }

        #endregion Model


        #region  另外添加的字段

        public Int64 StuCount { get; set; }//布置人数
        public Int64 CompleteCount { get; set; }//已完成人数

        public Int64 IsCorrecting { get; set; } //有无批改  (0:有批改  1无批改)
        public Int64 IsAnalysis { get; set; } //有无分析  (0:有分析   1无分析 )


        public int StuState { get; set; }//学生作业状态,0未提交，1已提交和2已批改

        public double SumScore { get; set; }//学生作业成绩

        public string Tname { get; set; }//老师名称

        public string SubjectName { get; set; }//科目名称


        public int mBook { get; set; }

        #endregion

    }
}

