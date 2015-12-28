using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_StaRelSub:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_StaRelSub
	{
		public EI_StaRelSub()
		{}
		#region Model
		private int? _stageid=0;
		private string _stagename;
		private int? _subjectid=0;
		private string _subjectname= "0";
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
		public string StageName
		{
			set{ _stagename=value;}
			get{return _stagename;}
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
		public string SubjectName
		{
			set{ _subjectname=value;}
			get{return _subjectname;}
		}
		#endregion Model

	}
}

