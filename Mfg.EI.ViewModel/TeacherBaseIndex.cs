using Mfg.EI.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class TeacherBaseModel : EI_ManagerInfo
    {
        public string Name { get; set; }

        public string GenderName { get; set; }

        public string Phone { get; set; }

        public string Postion { get; set; }

        public string UTypeName { get; set; }

        public string currentPW { get; set; }

        public string newPW { get; set; }

        public string newPW2 { get; set; }

        public int UType { get; set; }

        public List<string> GroupStr { get; set; }
        public List<string> StrudengStr { get; set; }

    }
}
