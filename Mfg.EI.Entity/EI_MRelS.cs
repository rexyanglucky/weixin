using System;
namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_MRelS:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_MRelS
    {
        public EI_MRelS()
        { }
        #region Model
        private string _sid;
        private string _tid;
        private int _gid;
        private string _tName;
        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID
        {
            set { _sid = value; }
            get { return _sid; }
        }
        /// <summary>
        /// 老师ID
        /// </summary>
        public string TID
        {
            set { _tid = value; }
            get { return _tid; }
        }

        /// <summary>
        /// 分组ID
        /// </summary>
        public int GID
        {
            set { _gid = value; }
            get { return _gid; }
        }

        /// <summary>
        /// 老师名字
        /// </summary>
        public string TName
        {
            set { _tName = value; }
            get { return _tName; }
        }



        #endregion Model

    }
}

