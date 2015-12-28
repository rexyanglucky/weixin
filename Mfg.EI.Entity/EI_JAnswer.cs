using System;
namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_JAnswer:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_JAnswer
    {
        public EI_JAnswer()
        { }
        #region Model
        private string _id = "00000000-0000-0000-0000-000000000000";
        private string _sid;
        private string _jid;
        private int? _itemid = 0;
        private string _answer;
        private float? _score = 0f;
        private string _answertime;
        private string _review;
        private string _notecontent;
        private float? _accuracy = 0f;
        private DateTime? _createtime = DateTime.Now;
        private int? _delflag = 0;
        private string _remark;
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
        public string SID
        {
            set { _sid = value; }
            get { return _sid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string JID
        {
            set { _jid = value; }
            get { return _jid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? ItemID
        {
            set { _itemid = value; }
            get { return _itemid; }
        }
        /// <summary>
        /// 科目ID
        /// </summary>
        public int? SubjectID
        { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Answer
        {
            set { _answer = value; }
            get { return _answer; }
        }
        /// <summary>
        /// 
        /// </summary>
        public float? Score
        {
            set { _score = value; }
            get { return _score; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string AnswerTime
        {
            set { _answertime = value; }
            get { return _answertime; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Review
        {
            set { _review = value; }
            get { return _review; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string NoteContent
        {
            set { _notecontent = value; }
            get { return _notecontent; }
        }
        /// <summary>
        /// 
        /// </summary>
        public float? Accuracy
        {
            set { _accuracy = value; }
            get { return _accuracy; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? CreateTime
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
        #endregion Model


        public string jobName { get; set; }

        public string KnowledgeID { get; set; }
        public string KnowledgeName { get; set; }

        public int ItemType { get; set; }



        public int FullScore { get; set; }
        public int GradeID { get; set; }

        public int IsTextAnswer { get; set; }

        public string StageId { get; set; }
    }
}

