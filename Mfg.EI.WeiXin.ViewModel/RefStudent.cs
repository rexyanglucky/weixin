using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.WeiXin.ViewModel
{
    public class RefStudent
    {
        /// <summary>
        /// 学生姓名
        /// </summary>
        public string StuName { get; set; }
        /// <summary>
        /// 学生帐号
        /// </summary>
        public string StuAccount { get; set; }
        /// <summary>
        /// 家长姓名
        /// </summary>
        public string ParentName { get; set; }
        /// <summary>
        /// 家长手机
        /// </summary>
        public string ParentPhone { get; set; }
        /// <summary>
        /// 家长微信
        /// </summary>
        public string WeiXin { get; set; }

        public int ID { get; set; }
    }
}
