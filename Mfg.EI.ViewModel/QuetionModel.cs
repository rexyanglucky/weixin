using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.Resource.Entity
{
    public class QuestionPoint : Point
    {
        public bool open { get; set; }

        /// <summary>
        /// 书本名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 层级
        /// </summary>
        public int Level { get; set; }

        /// <summary>
        /// 是否叶子
        /// </summary>
        public bool IsLeaf { get; set; }


        /// <summary>
        /// 当前奖杯数
        /// </summary>
        public int ThisCount { get; set; }

        /// <summary>
        /// 奖杯数
        /// </summary>
        public int CupCount { get; set; }

        //父节点奖杯数
        public int CupTotalCount { get; set; }

        public int KnowledgeID { get; set; }


    }
    public class QuestionPointHasCup : QuestionPoint
    {
        ///// <summary>
        ///// 当前奖杯数
        ///// </summary>
        //public int ThisCount { get; set; }

        ///// <summary>
        ///// 奖杯数
        ///// </summary>
        //public int CupCount { get; set; }

        ////父节点奖杯数
        //public int CupTotalCount { get; set; }

        //public int KnowledgeID { get; set; }
    }


    


    public class QuestionPageIndex<T>
    {
        public string pageNavigate { get; set; }

        public List<T> Data { get; set; }
    }


}
