using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_TempStudentInfo:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_TempStudentInfo
	{
		public EI_TempStudentInfo()
		{}
		#region Model
		private string _id= "00000000-0000-0000-0000-000000000000";
		private string _name= "0";
		private string _phone;
        private int? _trainaim = 0;
        private DateTime? _createtime = DateTime.Now;
		private int? _delflag=0;
		private string _remark;
        private int? _tid = 0;
        private int? _gradeid=0;
        private int? _gender = 0;
        private int? _age = 0;
        private string _school = string.Empty;
        private string _adddress = string.Empty;
		/// <summary>
		/// 
		/// </summary>
		public string ID
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

        /// <summary>
        /// 培训目的
        /// </summary>
        public int? TrainAim
        {
            set { _trainaim = value; }
            get { return _trainaim; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int? TID
        {
            set { _tid = value; }
            get { return _tid; }
        }
        public int? GradeID
        {
            set { _gradeid = value; }
            get { return _gradeid; }
        }

        public int? Gender
        {
            set { _gender = value; }
            get { return _gender; }
        }

        public int? Age
        {
            set { _age = value; }
            get { return _age; }
        }

        public string School
        {
            set { _school = value; }
            get { return _school; }

        }
        public string Adddress
        {
            set { _adddress = value; }
            get { return _adddress; }
        }
		#endregion Model

	}
}

