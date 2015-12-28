

/*
 * author:杨礼文;
 * function:测评分析ViewModel
 * adddate:2015-05-17
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class TestAnalysisModel
    {
        public int KnowledgeID { get; set; }
        public string KnowledgeName { get; set; }
        //掌握率
        public double Accuracy { get; set; }
        //最高掌握率
        public double TopAccuracy { get; set; }
        //平均掌握率
        public double AvgAccuracy { get; set; }

        public DateTime CreateTime { get; set; }

        public string Month { get; set; }
        public string SID { get; set; }
        public int SubjectID { get; set; }

        public string SubjectName { get; set; }
    }
}
