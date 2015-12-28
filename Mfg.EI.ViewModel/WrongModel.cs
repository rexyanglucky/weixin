/*
 * author:yangjin;
 * function:错题本
 * adddate:2015-04-22
 * updatedate:2015-04-22
 */
using System;

using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// GroupInfoModel：分组模型
    /// </summary>
    public class WrongModel
    {
        #region Model
        /// <summary>
        /// 
        /// </summary>
        public string ID { get; set; }
        /// <summary>
        /// 答题ID
        /// </summary>
        public string EJAId { get; set; }

        /// <summary>
        /// 来源
        /// </summary>
        public int? Source { get; set; }

        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 标签，已掌握，未掌握
        /// </summary>
        public int? Tag { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateTime { get; set; }

        /// <summary>
        /// 启用标识，0启用，1禁用
        /// </summary>
        public int? DelFlag { get; set; }

        /// <summary>
        /// 备注
        /// </summary>
        public string Remark { get; set; }

        public int KnowledgeID { get; set; }

        public string KnowledgeName { get; set; }

        #endregion Model

    }
}
