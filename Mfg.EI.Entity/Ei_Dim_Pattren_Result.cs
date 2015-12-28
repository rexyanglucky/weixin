using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Entity
{
    public class Ei_Dim_Pattren_Result
    {

        public int ID { get; set; }
        public int ResultID { get; set; }
        public int ParttenID { get; set; }
        public string PattrenName { get; set; }
        public int ParttenValue { get; set; }
        public float ParttenValuePercent { get; set; }

    }
}
