using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_TARelItem:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_TARelItem
	{
		public EI_TARelItem()
		{}
		#region Model
		private string  _taid=string.Empty;
        private string _kid = string.Empty;
		private int? _itemid=0;
        private int? _diffnum = 0;
        private int? _sequenceid = 0;
        private int? _itemsource = 0;
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
            set { _kid = value; }
            get { return _kid; }
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
        /// 难度
        /// </summary>
        public int? DiffNum
        {
            set { _diffnum = value; }
            get { return _diffnum; }
        }

        /// <summary>
        /// 排序
        /// </summary>
        public int? SequenceID
        {
            set { _sequenceid = value; }
            get { return _sequenceid; }
        }

        /// <summary>
        /// 0、选择知识点；1、感知力 2、意志力 3、观察力4、想象力
        /// </summary>
        public int? ItemSource
        {
            set { _itemsource = value; }
            get { return _itemsource; }
        }
		#endregion Model

	}
}

