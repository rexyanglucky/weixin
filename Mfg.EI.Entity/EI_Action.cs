/*
 * author:谢利民;
 * function:管理人员信息表【EI_ManagerInfo】操作的功能
 * adddate:2015-04-20
 * updatedate:2015-04-20
 */
using System;
namespace Mfg.EI.Entity
{
	/// <summary>
    /// EI_Action:行为表【EI_Action】实体类
	/// </summary>
	[Serializable]
	public partial class EI_Action
	{
		public EI_Action()
		{}
		#region Model
		private int _id;
		private int? _mid;
		private string _actionurl;
		private string _name;
		private DateTime? _createtime= DateTime.Now;
		private int _delflag=0;
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
		public int? MID
		{
			set{ _mid=value;}
			get{return _mid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string ActionUrl
		{
			set{ _actionurl=value;}
			get{return _actionurl;}
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
		public DateTime? CreateTime
		{
			set{ _createtime=value;}
			get{return _createtime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int DelFlag
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

