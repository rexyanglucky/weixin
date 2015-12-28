using System;
namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_ERelI:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_ERelI
    {
        public EI_ERelI()
        { }
        #region Model
        private string _id = "00000000-0000-0000-0000-000000000000";
        private string _eid;
        private int? _sequenceid = 0;
        private int? _itemid = 0;
        private int? _itemtype = 0;
        private int? _knowledgeid = 0;
        private string _knowledgename;
        private int? _itemsourcetype = 0;
        private float? _score = 0;
        private string _pid = "0";
        private int? _diffnum = 0;

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
        public string EID
        {
            set { _eid = value; }
            get { return _eid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? SequenceID
        {
            set { _sequenceid = value; }
            get { return _sequenceid; }
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
        /// 
        /// </summary>
        public int? ItemType
        {
            set { _itemtype = value; }
            get { return _itemtype; }
        }
        /// <summary>
        /// 
        /// </summary>
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
        public int? ItemSourceType
        {
            set { _itemsourcetype = value; }
            get { return _itemsourcetype; }
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
        public int? DiffNum
        {
            set { _diffnum = value; }
            get { return _diffnum; }
        }

        /// <summary>
        /// 
        /// </summary>
        public string PID
        {
            set { _pid = value; }
            get { return _pid; }
        }
        #endregion Model


        public int mBook { get; set; }

        /// <summary>
        /// 科目ID
        /// </summary>
        public int SubjectID { get; set; }

        /// <summary>
        /// 试题用时
        /// </summary>
        public int ExamTime { get; set; }

        /// <summary>
        /// 回答时间
        /// </summary>
        public string AnswerTime { get; set; }

        /// <summary>
        /// 答题
        /// </summary>
        public string Answer { get; set; }


        /// <summary>
        /// 试题名称
        /// </summary>
        public string Name { get; set; }

        public int IsTextAnswer { get; set; }

        /// <summary>
        /// 学生状态
        /// </summary>
        public int StuState { get; set; }

        public DateTime EndTime { get; set; }
    }
}

