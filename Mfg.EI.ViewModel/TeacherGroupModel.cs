using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    public class TeacherGroupModel
    {
        #region 教师分组
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
        public Int64 Count { get; set; }
        #endregion


        #region 右侧单个学生分组
        /// <summary>
        /// 魔方格ID
        /// </summary>
        public string TID { get; set; }

        //分组ID使用上面的分组ID

        //组名使用上面的Name

        #endregion

    }
}
