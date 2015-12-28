
/*
 * author:杨礼文;
 * function:学生分组结果
 * date:2015-04-22
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.Entity
{
    public partial class StudentGroup
    {
        #region 左侧全部学生分组
        /// <summary>
        /// 分组ID
        /// </summary>
        public Int64 ID { get; set; }
        /// <summary>
        /// 组名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 每组多少人
        /// </summary>
        public double Count { get; set; }
        #endregion


        #region 右侧单个学生分组
        /// <summary>
        /// 魔方格ID
        /// </summary>
        public string SID { get; set; }

        //分组ID使用上面的分组ID

        //组名使用上面的Name

        #endregion



    }
}
