

/*
 * author:杨礼文;
 * function:学能分析报告文案实体
 * date:2015-10-18
 * updateDate:2015-10-18
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Entity
{
    public class EI_Smart_doc
    {
        public EI_Smart_doc()
        { }

        public int DocID { get; set; }
        public int ExamID { get; set; }
        public bool IsEnable { get; set; }
        public int DimID { get; set; }
        public int DocEnum { get; set; }
        public float DocKey { get; set; }
        public string DocMark { get; set; }
        public string DocValue { get; set; }
        public string Description { get; set; }
        public string LocalDescription { get; set; }

    }
}
