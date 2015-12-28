using System;
namespace Mfg.EI.Entity
{
    /// <summary>
    /// EI_StuDiary:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_StuDiary
    {
        public EI_StuDiary()
        { }
        #region Model
        private string _id = "00000000-0000-0000-0000-000000000000";
        private string _name;
        private string _sid;
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
        public string Name
        {
            set { _name = value; }
            get { return _name; }
        }

        /// <summary>
        /// 类型0和1时为知识点名称，类型2为作业名称，类型3时为考试名称；类型4为空
        /// </summary>
        public string DiaryName { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string SId
        {
            set { _sid = value; }
            get { return _sid; }
        }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? CreateTime
        {
            set { _createtime = value; }
            get { return _createtime; }
        }

        public DateTime CreateDay { get; set; }


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
        /// 类型0、1和4为总题数;类型为2和3为总分数
        /// </summary>
        public int TotalNum { get; set; }

        /// <summary>
        /// 类型:0代表同步学习；1代表弱项提分；2电子作业；3在线考试4错题重练 
        /// </summary>
        public Int32 DiaryTtype { get; set; }

        /// <summary>
        /// 类型0、1和4为答对多少题；类型为2和3为成绩
        /// </summary>
        public string RightNum { get; set; }

        /// <summary>
        /// 
        /// </summary>

        public string RightNumStr { get; set; }

        /// <summary>
        /// 类型0、1和4时为科目名称，类型2和3为教师名称；
        /// </summary>
        public string FormatStr { get; set; }

        #endregion Model


    }


}

