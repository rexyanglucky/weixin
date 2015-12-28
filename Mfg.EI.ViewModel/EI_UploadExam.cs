using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{/// <summary>
    /// EI_UploadExam:实体类(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Serializable]
    public partial class EI_UploadExam
    {
        public EI_UploadExam()
        { }
        #region Model
        private string _id = "00000000-0000-0000-0000-000000000000";
        private string _name;
        private string _year;
        private int? _grade = 0;
        private int? _subjectid = 0;
        private int? _examtype = 0;
        private string _examversion;
        private int? _shareset = 0;
        private int? _previewcount = 0;
        private int? _downloadcount = 0;
        private string _uri;
        private int _orgID;
        private string _createBy;
        private DateTime? _createtime = DateTime.Now;
        private Int64 _shouCang;


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
        /// 
        /// </summary>
        public string Year
        {
            set { _year = value; }
            get { return _year; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? Grade
        {
            set { _grade = value; }
            get { return _grade; }
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
        public int? ExamType
        {
            set { _examtype = value; }
            get { return _examtype; }
        }
        /// <summary>
        /// 类型名称
        /// </summary>
        public string ExamTypeName { get; set; }

        /// <summary>
        /// 来源，创建人
        /// </summary>
        public string Source { get; set; }

        //文件全路径
        public string FullUrl { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string ExamVersion
        {
            set { _examversion = value; }
            get { return _examversion; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? ShareSet
        {
            set { _shareset = value; }
            get { return _shareset; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? PreviewCount
        {
            set { _previewcount = value; }
            get { return _previewcount; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? DownloadCount
        {
            set { _downloadcount = value; }
            get { return _downloadcount; }
        }
        /// <summary>
        /// 
        /// </summary>
        public string Uri
        {
            set { _uri = value; }
            get { return _uri; }
        }

        public int OrgID
        {
            set { _orgID = value; }
            get { return _orgID; }
        }

        public string CreateBy
        {
            set { _createBy = value; }
            get { return _createBy; }
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

        public Int64 ShouCang
        {
            get { return _shouCang; }
            set { _shouCang = value; }
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


        public int PaperFrom { get; set; }

        /// <summary>
        /// 试卷来源地区
        /// </summary>
        public string FromArea { get; set; }
    }
}
