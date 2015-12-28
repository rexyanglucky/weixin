using System;
namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// EI_Favorite:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_Favorite
    {
        public EI_Favorite()
        { }
        #region Model
        private int _id;
        private string _tid;
        private string _itemid;
        private int? _ftype = 0;
        private int? _tagid = 0;
        private DateTime? _createtime = DateTime.Now;
        private int? _delflag = 0;
        private string _remark;
        /// <summary>
        /// auto_increment
        /// </summary>
        public int ID
        {
            set { _id = value; }
            get { return _id; }
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
        public string ItemID
        {
            set { _itemid = value; }
            get { return _itemid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? FType
        {
            set { _ftype = value; }
            get { return _ftype; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? TagID
        {
            set { _tagid = value; }
            get { return _tagid; }
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


        public string subjectId { get; set; }
    }
}

