
/*
 * author:杨礼文;
 * function:揪错ViewModel
 * adddate:2015-05-18
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class CorrectionModel
    {

        public String Content { get; set; }
        public string IP { get; set; }

        public int QID { get; set; }
        public int BugType { get; set; }

        public int Builder { get; set; }

        public string Url { get; set; }

        public string SubjectID { get; set; }

        public string ParaURL { get; set; }

    }
}
