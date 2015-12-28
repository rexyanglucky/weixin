using System;
namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_ManRelSta:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_ManRelSta
    {
        public EI_ManRelSta()
        { }
        #region Model
        private int? _tid = 0;
        private int? _stageid = 0;
        private int? _subjectid = 0;
        private string _materialid = string.Empty;
        /// <summary>
        /// 
        /// </summary>
        public int? TID
        {
            set { _tid = value; }
            get { return _tid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? StageID
        {
            set { _stageid = value; }
            get { return _stageid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? SubjectID
        {
            set { _subjectid = value; }
            get { return _subjectid; }
        }

        public string MaterialID
        {
            set { _materialid = value; }
            get { return _materialid; }
        }
        #endregion Model
        public string SubjectName { get; set; }

    }
}

