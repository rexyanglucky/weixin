using System;
namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_Material:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_Material
    {
        public EI_Material()
        { }
        #region Model
        private string _id;
        private string _mversion;
        private DateTime? _createtime = DateTime.Now;
        private int? _delflag = 0;
        private string _remark;
        /// <summary>
        /// auto_increment
        /// </summary>
        public string ID
        {
            set { _id = value; }
            get { return _id; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Mversion
        {
            set { _mversion = value; }
            get { return _mversion; }
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

    }
}

