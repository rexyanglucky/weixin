/*
 * author:谢利民;
 * function:分组模型
 * adddate:2015-04-21
 * updatedate:2015-04-21
 */
using System;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// GroupInfoModel：分组模型
    /// </summary>
    public class GroupInfoModel
    {

        /// <summary>
        /// 分组ID
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 分组名称
        /// </summary>
        [Required]

        public string Name { get; set; }

        /// <summary>
        /// 机构ID
        /// </summary>
        public int OrgID { get; set; }
        public string CreateBy { get; set; }

        public string OldGroupName { get; set; }

    }
}
