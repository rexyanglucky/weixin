

/*
 * author:杨礼文;
 * function:区间对象
 * date:2015-10-17
 * updateDate:2015-10-17
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Entity
{
    public class Interval
    {
        /// <summary>
        /// 总分
        /// </summary>
        public int Total { get; set; }

        /// <summary>
        /// 最小值
        /// </summary>
        public int Min { get; set; }
        /// <summary>
        /// 最大值
        /// </summary>
        public int Max { get; set; }

        /// <summary>
        /// 文案
        /// </summary>
        public string DocID { get; set; }

        /// <summary>
        /// 文案
        /// </summary>
        public string Doc { get; set; }

    }
}
