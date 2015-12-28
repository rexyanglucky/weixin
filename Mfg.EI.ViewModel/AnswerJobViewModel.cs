using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class AnswerJobViewModel
    {
        public AnswerJobViewModel()
        {
            this.Options = new Dictionary<string, string>();
        }

        public int QuestionID { get; set; }

        public Guid JobID { get; set; }

        public Guid? AnswerID { get; set; }

        public int Index { get; set; }

        public string QuestionHTML { get; set; }

        public int QuestionType { get; set; }

        public string Answers { get; set; }

        public Dictionary<string, string> Options { get; set; }

    }
}
