using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_RRelA:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_RRelA
	{
		public EI_RRelA()
		{}
		#region Model
		private int? _rid=0;
		private int? _aid=0;
		/// <summary>
		/// 
		/// </summary>
		public int? RID
		{
			set{ _rid=value;}
			get{return _rid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? AID
		{
			set{ _aid=value;}
			get{return _aid;}
		}
		#endregion Model

	}
}

