/*
 * author:谢利民;
 * function:阶段科目对应模型
 * adddate:2015-04-21
 * updatedate:2015-04-21
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// StaRelSubModel:阶段科目对应模型
    /// </summary>
    public class StaRelSubModel
    {
        /// <summary>
        /// 阶段ID
        /// </summary>
        public int? StageID { get; set; }
       
        /// <summary>
        /// 阶段名称
        /// </summary>
        public string StageName { get; set; }
       
        /// <summary>
        /// 科目ID
        /// </summary>
        public int? SubjectID { get; set; }
       
        /// <summary>
        /// 科目名称
        /// </summary>
        public string SubjectName { get; set; }
        
    }
}
