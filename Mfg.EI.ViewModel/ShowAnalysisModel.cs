using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 同步学习和弱项提交的结果ViewModel
    /// </summary>
    public  class ShowAnalysisModel
    {
        /// <summary>
        /// 试题ID集合
        /// </summary>
        public string idlist { get; set; }

        /// <summary>
        /// 工作ID
        /// </summary>
        public string jobId{get;set;}

        /// <summary>
        /// 知识点ID
        /// </summary>
        public string knid{get;set;}
          
        /// <summary>
        /// 知识点名称
        /// </summary>
        public string kname{get;set;}

        /// <summary>
        /// 科目ID
        /// </summary>
        public string subjectid{get;set;}
        /// <summary>
        /// 学生ID
        /// </summary>
        public string sid { get; set; }

        /// <summary>
        /// 同步学习和弱项提分类型
        /// </summary>
        public int? ruletype { get; set; }
    }
}
