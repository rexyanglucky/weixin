﻿using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_TestAnalyze:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_TestAnalyze
	{
		public EI_TestAnalyze()
		{}
		#region Model
		private string _id=string.Empty;
		private string _sid;
		private int? _stageid=0;
		private int? _subjectid=0;
		private int? _distancetest=0;
        private DateTime? _createtime = DateTime.Now;
		private int? _delflag=0;
		private string _remark;
		/// <summary>
		/// auto_increment
		/// </summary>
		public string ID
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
		public int? StageID
		{
			set{ _stageid=value;}
			get{return _stageid;}
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
