/*
 * author:谢利民;
 * function:机构管理操作的功能
 * adddate:2015-05-04
 * updatedate:2015-05-04
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// JobRelItemModel:作业与题目连接表【EI_JRelI】
    /// </summary>
    public class JobRelItemModel
    {
        /// <summary>
        /// 作业ID
        /// </summary>
        public string JID { get; set; }

        /// <summary>
        /// 排序ID
        /// </summary>
        public int? SequenceID { get; set; }

        /// <summary>
        /// 题目ID
        /// </summary>
        public int? ItemID { get; set; }

        /// <summary>
        /// 智能换题ID
        /// </summary>
        public int? OldItemID { get; set; }

        /// <summary>
        /// 题目类别
        /// </summary>
        public int? ItemType { get; set; }

        /// <summary>
        /// 知识点ID
        /// </summary>
        public int? KnowledgeID { get; set; }

        /// <summary>
        /// 知识点名称
        /// </summary>
        public string KnowledgeName { get; set; }
        /// <summary>
        /// 题目来源
        /// </summary>
        public int? ItemSourceType { get; set; }

        /// <summary>
        /// 难度
        /// </summary>
        public int? DiffNum { get; set; }
        /// <summary>
        /// 题目分值
        /// </summary>
        public float? Score { get; set; }

        /// <summary>
        /// 类别分类
        /// </summary>
        public string PID { get; set; }

    }
}
