
/*
 * author:谢利民;
 * function:教师阶段科目教材对应表【EI_ManRelSta】模型
 * adddate:2015-04-22
 * updatedate:2015-04-22
 */
using System;
namespace Mfg.EI.Entity
{
	/// <summary>
	/// EI_SubRelMat:实体类(属性说明自动提取数据库字段的描述信息)
	/// </summary>
	[Serializable]
	public partial class EI_SubRelMat
	{


		public EI_SubRelMat()
		{}
		#region Model
        private int? _tid = 0;
        private int? _stageid=0;
		private int? _subjectid=0;
		private int? _materialid=0;

        public int? TID
        {
            set { _tid = value; }
            get { return _tid; }
        }
        public int? StageID
		{
			set{ _stageid=value;}
			get{return _stageid;}
		}

		/// <summary>
		/// 
		/// </summary>
		public int? SubjectID
		{
			set{ _subjectid=value;}
			get{return _subjectid;}
		}
		/// <summary>
		/// 
		/// </summary>
		public int? MaterialID
		{
			set{ _materialid=value;}
			get{return _materialid;}
		}
		#endregion Model

	}
}

