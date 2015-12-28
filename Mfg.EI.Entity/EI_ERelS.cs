using System;
namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_ERelS:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_ERelS
    {
        public EI_ERelS()
        { }
        #region Model
        private string _eid;
        private string _sid;
        private string _tid;
        private int? _stustate = 0;
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
        public string SID
        {
            set { _sid = value; }
            get { return _sid; }
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
        public int? StuState
        {
            set { _stustate = value; }
            get { return _stustate; }
        }
        #endregion Model

        public string SName { get; set; }

        /// <summary>
        /// 累计用时
        /// </summary>
        public int SumeTime { get; set; }

    }
}

