using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 知识测评与题目关联表
    /// </summary>
    public class TARelItemModel
    {
        public string PointID { get; set; }

        public string PointName { get; set; }

        public string KnowledgeName { get; set; }

        public int GroupID { get; set; }
        /// <summary>
        /// 测评ID
        /// </summary>
        public string TAID { get; set; }

        /// <summary>
        /// 知识点ID
        /// </summary>
        public string KID { get; set; }

        /// <summary>
        /// 题目ID
        /// </summary>
        public int? ItemID { get; set; }

        /// <summary>
        /// 难度
        /// </summary>
        public int? DiffNum { get; set; }

        /// <summary>
        /// 排序
        /// </summary>
        public int? SequenceID { get; set; }

        /// <summary>
        /// 试题来源
        /// </summary>
        public int? ItemSource { get; set; }

        public int DefaultHour { get; set; }

        /// <summary>
        ///  答案
        /// </summary>
        public string Answer { get; set; }

        /// <summary>
        /// 正确答案
        /// </summary>
        public string RightAnswer { get; set; }


    }
}
