
/*
 * author:杨礼文;
 * function:电子作业答案ViewModel
 * date:2015-05-14
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{


    public class AccuracyProgressModel
    {
        public int KnowledgeID { get; set; }
        public string KnowledgeName { get; set; }

        public double OldAccuracy { get; set; }

        public double OldTotalAccuracy { get; set; }
        public double OldFullAccuracy { get; set; }
        public double NewAccuracy { get; set; }
        public double NewTotalAccuracy { get; set; }
        public double NewFullAccuracy { get; set; }
        public double DiffAccuracy { get; set; }

        public DateTime CreateTime { get; set; }

        public string SID { get; set; }
        public int SubjectID { get; set; }

        public string SubjectName { get; set; }

        public string RecordMonth { get; set; }
    }


}
