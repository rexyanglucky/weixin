using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_GroupInfo:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_GroupInfo
	{
		public EI_GroupInfo()
		{}
		#region Model
		private int _id;
		private string _name;
		private int? _orgid=0;
        private DateTime? _createtime = DateTime.Now;
		private int? _delflag=0;
		private string _remark;
        private string _createby;
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
		public string Name
		{
			set{ _name=value;}
			get{return _name;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? OrgID
		{
			set{ _orgid=value;}
			get{return _orgid;}
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
        public string CreateBy
        {
            get { return _createby; }
            set { _createby = value; }
        }
		#endregion Model

	}
}

