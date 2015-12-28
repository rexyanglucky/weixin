

/*
 * author:杨礼文;
 * function:学生入学成绩ViewModel
 * date:2015-04-20
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    public class EnterScoreModel
    {

        public int? Total { get; set; }
        public float? Score { get; set; }
        public int? SubjectID { get; set; }
        public string Subject { get; set; } 

    }
}
