using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_Tag:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_Tag
	{
		public EI_Tag()
		{}
		#region Model
		private int _id;
		private string _tag;
		private int? _tagtype=0;
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
		public string Tag
		{
			set{ _tag=value;}
			get{return _tag;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? TagType
		{
			set{ _tagtype=value;}
			get{return _tagtype;}
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



    public partial class EI_Measure_Test
    {

        public int DimID { get; set; }

        public string DimName { get; set; }

        public double DocKey { get; set; }


        public double DocKeyRow { get; set; }
    }

}

