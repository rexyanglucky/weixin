using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class JRelIModel
    {
        public string ID
        {
            get;
            set;
        }
        /// <summary>
        /// 
        /// </summary>
        public string JID
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

    public class JRItem
    {
        public int ItemID { get; set; }

        public int Score { get; set; }

        public int ItemType { get; set; }


    }


    public class JRIndex
    {
        public int ItemID { get; set; }

        public int SequenceID { get; set; }

        public int Score { get; set; }

        public int ItemType { get; set; }

    }
}
