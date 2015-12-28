using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class SearchObj
    {
        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 科目ID
        /// </summary>
        public string SubjectID { get; set; }

        /// <summary>
        /// 学生作答状态
        /// </summary>
        public int StuState { get; set; }


        /// <summary>
        /// 当前页
        /// </summary>
        public int CurrentPage { get; set; }


        /// <summary>
        /// 过滤(分页)
        /// </summary>
        public int Skip { get; set; }


        /// <summary>
        /// 取(分页)
        /// </summary>
        public int Take { get; set; }
    }
}
