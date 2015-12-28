/*
 * author:yangjin;
 * function:错题本
 * adddate:2015-04-22
 * updatedate:2015-04-22
 */
using System;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// GroupInfoModel：分组模型
    /// </summary>
    public class WrongTagModel
    {

        /// <summary>
        /// 错题数
        /// </summary>
        public Int64 TagCount { get; set; }

        /// <summary>
        /// 分组名称
        /// </summary>
       // public string Name { get; set; }

        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 标签类型，是否掌握，题目来源
        /// </summary>
        public string Type { get; set; }

        public Int64 TagValue { get; set; }
        /// <summary>
        /// 来源，标签
        /// </summary>
        public string Tag { get; set; }

    }
}
