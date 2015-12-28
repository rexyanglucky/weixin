/*
 * author:谢利民;
 * function:公告表【EI_Announcement】实体类
 * adddate:2015-04-20
 * updatedate:2015-04-20
 */
using System;
namespace Mfg.EI.Entity
{
	/// <summary>
    /// EI_Announcement:公告表【EI_Announcement】实体类
	/// </summary>
	[Serializable]
	public partial class EI_Announcement
	{
		public EI_Announcement()
		{}
		#region Model
		private int _id;
        private string _contentTitle;
		private string _content;
        private int _orgId;

      
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

        public string ContentTitle
        {
            get { return _contentTitle; }
            set { _contentTitle = value; }
        }

		/// <summary>
		/// 
		/// </summary>
		public string Content
		{
			set{ _content=value;}
			get{return _content;}
		}

        public int OrgId
        {
            get { return _orgId; }
            set { _orgId = value; }
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

