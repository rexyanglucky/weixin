using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_JRelS:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_JRelS
	{
		public EI_JRelS()
		{}
		#region Model
		private string _jid;
		private string _sid;
	    private string _sName;
		private int? _stustate=0;
		/// <summary>
		/// 
		/// </summary>
		public string JID
		{
			set{ _jid=value;}
			get{return _jid;}
		}
		/// <summary>
		/// 学生Id
		/// </summary>
		public string SID
		{
			set{ _sid=value;}
			get{return _sid;}
		}

        /// <summary>
        /// 学生名字
        /// </summary>
        public string SName
        {
            set { _sName = value; }
            get { return _sName; }
        }


		/// <summary>
		/// 
		/// </summary>
		public int? StuState
		{
			set{ _stustate=value;}
			get{return _stustate;}
		}
		#endregion Model

        /// <summary>
        /// 累计用时
        /// </summary>
        public int SumeTime { get; set; } 
	}
}

