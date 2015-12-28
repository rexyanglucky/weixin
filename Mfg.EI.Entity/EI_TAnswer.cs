using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_TAnswer:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_TAnswer
	{
		public EI_TAnswer()
		{}
		#region Model
		private int _id;
		private string _sid;
		private string _taid=string.Empty;
		private int? _itemid=0;
		private string _answer=string.Empty;
		private int? _answertime=0;
        private int? _accuracy = 0;
        private DateTime? _createtime = DateTime.Now;
		private int? _delflag=0;
		private string _remark;
        private int? _itemsource = 0;
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
		public string TAID
		{
			set{ _taid=value;}
			get{return _taid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? ItemID
		{
			set{ _itemid=value;}
			get{return _itemid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public string Answer
		{
			set{ _answer=value;}
			get{return _answer;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? AnswerTime
		{
			set{ _answertime=value;}
			get{return _answertime;}
		}

        /// <summary>
        ///正确率 
        /// </summary>
        public int? Accuracy
        {
            set { _accuracy = value; }
            get { return _accuracy; }
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

        public int? ItemSource
        {
            set { _itemsource = value; }
            get { return _itemsource; }
        }
		#endregion Model

	}
}

