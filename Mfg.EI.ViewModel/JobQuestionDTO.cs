using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class JobQuestionDTO
    {
        public Guid JobID { get; set; }
        public string JobName { get; set; }
        public int SubjectID { get; set; }
        public int SequenceID { get; set; }
        public int ItemID { get; set; }
        public int ItemType { get; set; }
    }
}
