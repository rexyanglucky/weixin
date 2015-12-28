using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class ERelIModel
    {
        public string ID
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public string EID
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public int? SequenceID
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public int? ItemID
        {
            get;
            set;
        }


        /// <summary>
        /// 
        /// </summary>
        public int? ItemType
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public int? KnowledgeID
        {
            get;
            set;
        }

        public string KnowledgeName
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public int? ItemSourceType
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public float? Score
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public string PID
        {
            get;
            set;
        }

        public bool IsAddOrDel { get; set; }

        public int DiffNum { get; set; }
    }

    /// <summary>
    /// 临时查询
    /// </summary>
    public class ERelIGetModel
    {
        public string ID { get; set; }

        public int ItemID { get; set; }

        public int SequenceID { get; set; }

        /// <summary>
        /// 当前序列的最大值
        /// </summary>
        public int MaxSequenceID { get; set; }

        /// <summary>
        /// 总记录数
        /// </summary>
        public int SumSequenceID { get; set; }


        /// <summary>
        /// 知识点
        /// </summary>
        public int KnowledgeID { get; set; }


        /// <summary>
        /// 题型
        /// </summary>
        public int ItemType { get; set; }
    }

}
