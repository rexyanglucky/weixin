using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_TARelKno:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_TARelKno
	{
		public EI_TARelKno()
		{}
		#region Model
		private string  _taid=string.Empty;
		private string  _kid=string.Empty;
        private string _knowledgename = string.Empty;
        private int? _classhour = 0;
        private int? _diffnum = 0;
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
		public string KID
		{
			set{ _kid=value;}
			get{return _kid;}
		}

        public string KnowledgeName
        {
            set { _knowledgename = value; }
            get { return _knowledgename; }
        }

        /// <summary>
        /// 
        /// </summary>
        public int? ClassHour
        {
            set { _classhour = value; }
            get { return _classhour; }
        }
        /// <summary>
        /// 
        /// </summary>
        public int? DiffNum
        {
            set { _diffnum = value; }
            get { return _diffnum; }
        }
		#endregion Model

	}
}

