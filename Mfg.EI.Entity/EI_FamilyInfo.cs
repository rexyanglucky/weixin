using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_FamilyInfo:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_FamilyInfo
	{
		public EI_FamilyInfo()
		{}
		#region Model
		private int _id;
		private string _sid;
		private string _relationship;
		private string _name;
		private string _company;
		private string _phone;
        private DateTime? _createtime = DateTime.Now;
		private int? _delflag=0;
		private string _remark;
        private string _weixin;
        public string WeiXin
        {
            set { _weixin = value; }
            get { return _weixin; }
        }
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
		public string Relationship
		{
			set{ _relationship=value;}
			get{return _relationship;}
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
		public string Company
		{
			set{ _company=value;}
			get{return _company;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Phone
		{
			set{ _phone=value;}
			get{return _phone;}
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

