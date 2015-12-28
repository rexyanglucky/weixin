using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.WeiXin.ViewModel
{
    public class JobHistory
    {
        /// <summary>
        /// 作业列表
        /// </summary>
        public List<Mfg.EI.Entity.EI_Job> JobList { get; set; }
        /// <summary>
        /// 绑定科目列表
        /// </summary>
        public List<int> BindSubject { get; set; }
        public string Pager { get; set; }
        public int subID { get; set; }
        public int states { get; set; }

        public string StuID { get; set; }

        public string WeiXin { get; set; }
    }
}
