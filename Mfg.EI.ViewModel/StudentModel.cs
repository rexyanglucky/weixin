/*
 * author:杨礼文;
 * function:学生列表ViewModel
 * date:2015-04-23
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    public class StudentModel
    {
        public string Name { get; set; }
        public string GroupName { get; set; }
        public string STypeName { get; set; }
        public string MfgID { get; set; }


        public string ReamrkName { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? ExpirDate { get; set; }

        /// <summary>
        /// 累计用时
        /// </summary>
        public int SumeTime { get; set; }


        /// <summary>
        /// 激活时间
        /// </summary>
        public DateTime? ActivationTime { get; set; }

    }

    public class StudentExperienceModel
    {

        public DateTime ExpirDate { get; set; }

        public int ExperNumber { get; set; }

        public string MaxValue { get; set; }

        public string Remark { get; set; }

        public string ExpirDataStr { get { return ExpirDate.ToShortDateString(); } }

        /// <summary>
        /// 是否过期
        /// </summary>
        public bool IsExpire { get; set; }

        /// <summary>
        /// 最小值
        /// </summary>
        public string MinValue { get; set; }
    }
}
