using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_GRelM:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_GRelM
	{
		public EI_GRelM()
		{}
		#region Model
		private int _gid=0;
		private string _tid;
		/// <summary>
		/// 
		/// </summary>
		public int GID
		{
			set{ _gid=value;}
			get{return _gid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string TID
		{
			set{ _tid=value;}
			get{return _tid;}
		}
		#endregion Model

	}
}

