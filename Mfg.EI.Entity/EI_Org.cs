using System;
namespace Mfg.EI.Entity
{

	/// <summary>
	/// EI_Org:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_Org
	{
		public EI_Org()
		{}
		#region Model
		private int _id;
		private int _pid=0;
		private string _name;
		private int? _orgtype=0;
		private string _url;
		private int? _stulimitcount=300;
		private int? _manlimitcount=300;
		private DateTime? _expirtime= DateTime.Now;
		private string _orgtemplate;
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
		public int PID
		{
			set{ _pid=value;}
			get{return _pid;}
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
		public int? OrgType
		{
			set{ _orgtype=value;}
			get{return _orgtype;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Url
		{
			set{ _url=value;}
			get{return _url;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? StuLimitCount
		{
			set{ _stulimitcount=value;}
			get{return _stulimitcount;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ManLimitCount
		{
			set{ _manlimitcount=value;}
			get{return _manlimitcount;}
		}
		/// <summary>
		/// 
		/// </summary>
		public DateTime? ExpirTime
		{
			set{ _expirtime=value;}
			get{return _expirtime;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string OrgTemplate
		{
			set{ _orgtemplate=value;}
			get{return _orgtemplate;}
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


        public string LogoUrl { get; set; }

        public string FootFragment { get; set; }
	    public string BannerImgUrls { get; set; }
	}
}

