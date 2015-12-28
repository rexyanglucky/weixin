using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Entity
{
    public class EI_TestExam
    {
        public int ExamID { get; set; }

        public string ExamName { get; set; }

        public string TID { get; set; }

        public string LastTID { get; set; }

        public int SubjectID { get; set; }

        public byte StageID { get; set; }

        public byte GradeID { get; set; }

        public byte ExamTerm { get; set; }

        public bool IsEnable { get; set; }

        public bool IsDelete { get; set; }

        public DateTime CreateTime { get; set; }

        public DateTime LastUpdateTime { get; set; }

        public string Remarks { get; set; }
    }


    public class EI_TestExamItem
    {
        public int ExamItemID { get; set; }

        public int ExamID { get; set; }

        public string KID { get; set; }

        public int ItemID { get; set; }

        public int DiffNum { get; set; }


        public int SequenceID { get; set; }

        public int ItemSource { get; set; }

    }
}
