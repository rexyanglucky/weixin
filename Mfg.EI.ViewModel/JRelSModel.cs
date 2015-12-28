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
    /// JRelSModel:电子作业与学生连接表
    /// </summary>
    public class JRelSModel
    {
        /// <summary>
        /// 电子作业ID
        /// </summary>
        public string JID { get; set; }

        /// <summary>
        /// 布置对象ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 学生作业状态
        /// </summary>
        public int? StuState { get; set; }

        /// <summary>
        /// 累计用时
        /// </summary>
        public int SumeTime { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Name { get; set; }
    }

    /// <summary>
    /// 临时查询
    /// </summary>
    public class JRelIGetModel
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
