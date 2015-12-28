using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_GRelS:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_GRelS
	{
		public EI_GRelS()
		{}
		#region Model
		private int _gid=0;
		private string _sid;
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
		public string SID
		{
			set{ _sid=value;}
			get{return _sid;}
		}
		#endregion Model

	}
}

