using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
   public class ReportSetSaveModel
    {

       public List<SetHourModel> SetHourList { get; set; }
       public List<SetDiffModel> SetDiffList { get; set; }
    }

    public class SetHourModel
    {
        public string TAID { get; set; }

        public string TotalHour { get; set; }
    }

    public class SetDiffModel
    {
        public string TAID { get; set; }

        public string DiffName { get; set; }

        public string ExpertRate { get; set; }

    }
}
