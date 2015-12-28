using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_ORelR:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_ORelR
	{
		public EI_ORelR()
		{}
		#region Model
		private int? _oid=0;
		private int? _rid=0;
		/// <summary>
		/// 
		/// </summary>
		public int? OID
		{
			set{ _oid=value;}
			get{return _oid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? RID
		{
			set{ _rid=value;}
			get{return _rid;}
		}
		#endregion Model

	}
}

