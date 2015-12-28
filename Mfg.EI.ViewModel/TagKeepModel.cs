using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class TagKeepInitModel
    {
        public Int32 TID { get; set; }

        public int SubjectID { get; set; }

        /// <summary>
        /// 试题ID
        /// </summary>
        public int ItemID { get; set; }

        public string ResponseString { get; set; }


        public string ItemIDStr { get; set; }


    }

    public class TagKeepReponseModel
    {
        /// <summary>
        /// 试题ID
        /// </summary>
        public int ItemID { get; set; }


        public bool IsTag { get; set; }


    }

    public class TagPointPageResponseModel
    {
        /// <summary>
        /// 试题ID
        /// </summary>
        public int ItemID { get; set; }

        public int KeepID { get; set; }


        public string Tag { get; set; }

        public string T { get; set; }
    }

    public class TagModel
    {
        /// <summary>
        /// 标签ID
        /// </summary>
        public int TagID { get; set; }

        /// <summary>
        /// 标签名称
        /// </summary>
        public string TagName { get; set; }

        /// <summary>
        /// 标签类型,0公共标签；1为自定义标签
        /// </summary>
        public int TagType { get; set; }

        /// <summary>
        /// 是否收藏
        /// </summary>
        public bool IsKeep { get; set; }


        public int ItemID { get; set; }
    }

    public class TagKeepModel
    {
        public string SubjectIDMapping { get; set; }

        public int ItemID { get; set; }


        public int KeepID { get; set; }
        public string TID { get; set; }
        public int GradeID { get; set; }
        public int StageID { get; set; }
        public int SubjectID { get; set; }
        public int ItemType { get; set; }
        public string TagID { get; set; }

        public int KnowledgeID { get; set; }

        public string KnowledgeName { get; set; }


        private DateTime _defaultTime = DateTime.Now;

        public DateTime AddTime
        {
            get { return _defaultTime; }
            set { _defaultTime = value; }
        }
        public DateTime EditTime
        {
            get { return _defaultTime; }
            set { _defaultTime = value; }
        }
        public int KeepState { get; set; }
        public int DiffNum { get; set; }
        public int DelFlag { get; set; }
        public int SequenceID { get; set; }

        public int TagSource { get; set; }

    }

    public class TagPointModel
    {
        public string f_name { get; set; }
        public string f_parent { get; set; }
        public string f_pointid { get; set; }
        public int f_sec { get; set; }
        public string f_sec1 { get; set; }
    }


    public class TagKeepMappingModel : TagKeepModel
    {
        public List<TagModel> Tag { get; set; }
    }
}
