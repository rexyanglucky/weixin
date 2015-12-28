/*
 * author:谢利民;
 * function:阶段科目对应模型
 * adddate:2015-05-08
 * updatedate:2015-05-08
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 
    /// </summary>
  public  class ERelSModel
    {
        /// <summary>
        /// 在线考试ID
        /// </summary>
        public string EID { get; set; }

        /// <summary>
        /// 布置对象ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 布置对象ID
        /// </summary>
        public string TID { get; set; }

        /// <summary>
        /// 学生作业状态
        /// </summary>
        public int? StuState { get; set; }

        /// <summary>
        /// 累计用时
        /// </summary>
        public int SumeTime { get; set; }

        public string Name { get; set; }
    }
}
