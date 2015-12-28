using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.WeiXin.ViewModel
{
    public class WeaknessModel
    {
        public int SubjectID { get; set; }

        public List<int> BindSubject { get; set; }

        public string SName { get; set; }

        public List<EI.ViewModel.TestAnalysisModel> WeakList { get; set; }

        public string Month { get; set; }

        public string DateMonth { get; set; }
    }
}
