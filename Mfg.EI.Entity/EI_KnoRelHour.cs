using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_KnoRelHour:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_KnoRelHour
	{
		public EI_KnoRelHour()
		{}
		#region Model
		private int _id;
		private int? _kid;
		private int? _classhour=0;
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
		public int? KID
		{
			set{ _kid=value;}
			get{return _kid;}
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

