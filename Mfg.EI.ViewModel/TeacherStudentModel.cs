using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    public class TeacherStudentModel
    {
        /// <summary>
        /// 学生ID
        /// </summary>
        public string SID { get; set; }

        /// <summary>
        /// 老师ID
        /// </summary>
        public int TID { get; set; }

        /// <summary>
        /// 分组ID
        /// </summary>
        public int GID { get; set; }

        /// <summary>
        /// 老师名字
        /// </summary>
        public string SName { get; set; }
    }
}
