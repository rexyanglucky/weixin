using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_UploadExam:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_UploadExam
	{
		public EI_UploadExam()
		{}
		#region Model
		private string _id= "00000000-0000-0000-0000-000000000000";
		private string _name;
		private string _year;
		private int? _grade=0;
		private int? _subjectid=0;
		private int? _examtype=0;
		private int? _examversion=0;
		private int? _shareset=0;
		private int? _previewcount=0;
		private int? _downloadcount=0;
		private string _uri;
		private DateTime? _createtime= DateTime.Now;
		private int? _delflag=0;
		private string _remark;
		/// <summary>
		/// 
		/// </summary>
		public string ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Year
		{
			set{ _year=value;}
			get{return _year;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Grade
		{
			set{ _grade=value;}
			get{return _grade;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? SubjectID
		{
			set{ _subjectid=value;}
			get{return _subjectid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ExamType
		{
			set{ _examtype=value;}
			get{return _examtype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ExamVersion
		{
			set{ _examversion=value;}
			get{return _examversion;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ShareSet
		{
			set{ _shareset=value;}
			get{return _shareset;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? PreviewCount
		{
			set{ _previewcount=value;}
			get{return _previewcount;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? DownloadCount
		{
			set{ _downloadcount=value;}
			get{return _downloadcount;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Uri
		{
			set{ _uri=value;}
			get{return _uri;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? CreateTime
		{
			set{ _createtime=value;}
			get{return _createtime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? DelFlag
		{
			set{ _delflag=value;}
			get{return _delflag;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Remark
		{
			set{ _remark=value;}
			get{return _remark;}
		}
		#endregion Model

	}
}

