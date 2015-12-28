using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 意见反馈模型
    /// </summary>
    public class FeedBackModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int? FeedID { get; set; }

        /// <summary>
        /// 账号
        /// </summary>
        public int? AccountNumber { get; set; }

        /// <summary>
        /// 机构ID
        /// </summary>
        public int? OrgID { get; set; }

        /// <summary>
        /// 意见反馈内容
        /// </summary>
        public string Content { get; set; }

        /// <summary>
        /// 登录账号
        /// </summary>
        public string LoginAccountNumber { get; set; }

        /// <summary>
        /// 登录名称
        /// </summary>
        public string LoginName { get; set; }

        /// <summary>
        /// 类型：0：老师；1：学生
        /// </summary>
        public int? FType { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime? CreateTime { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? DelFlag { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public string Remark { get; set; }

    }
}
