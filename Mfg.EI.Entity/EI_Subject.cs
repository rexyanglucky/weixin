using System;
namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_Subject:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_Subject
    {
        public EI_Subject()
        { }
        #region Model
        private int _id;
        private string _subject = "NULL";
        private DateTime? _createtime = DateTime.Now;
        private int? _delflag = 0;
        private string _remark = "NULL";
        /// <summary>
        /// 科目ID
        /// </summary>
        public int ID { get; set; }


        /// <summary>
        /// 科目编号
        /// </summary>
        public int SubjectCode { get; set; }

        /// <summary>
        /// 科目
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// 小学是否公开考点：1是；0否
        /// </summary>
        public bool IsXOpen { get; set; }
        /// <summary>
        /// 初中是否公开考点：1是；0否
        /// </summary>
        public bool IsCOpen { get; set; }
        /// <summary>
        /// 高中是否公开考点：1是；0否
        /// </summary>
        public bool IsGOpen { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateTime { get; set; }

        /// <summary>
        /// 启用标识，0启用，1禁用
        /// </summary>
        public int? DelFlag { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

        #endregion Model

    }
}

