using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.WeiXin.ViewModel
{
    public class StuProgessModel
    {
        public int SubjectID { get; set; }

        public List<int> BindSubject { get; set; }

        public string SName { get; set; }

        public List<Mfg.EI.ViewModel.AccuracyProgressModel> ProgressList { get; set; }

        public string Month { get; set; }

        public string DateMonth { get; set; }
    }

}
