using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_TestRecord:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_TestRecord
	{
		public EI_TestRecord()
		{}
		#region Model
		private int _id;
		private string _sid;
		private int? _testsubject=0;
		private int? _classhour=0;
		private int? _status=0;
		private int? _testtime=0;
		private string _testresult;
        private DateTime? _createtime = DateTime.Now;
		private int? _delflag=0;
		private string _remark;
		/// <summary>
		/// auto_increment
		/// </summary>
		public int ID
		{
			set{ _id=value;}
			get{return _id;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string SID
		{
			set{ _sid=value;}
			get{return _sid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? TestSubject
		{
			set{ _testsubject=value;}
			get{return _testsubject;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ClassHour
		{
			set{ _classhour=value;}
			get{return _classhour;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? Status
		{
			set{ _status=value;}
			get{return _status;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? TestTime
		{
			set{ _testtime=value;}
			get{return _testtime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string TestResult
		{
			set{ _testresult=value;}
			get{return _testresult;}
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

