using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.WeiXin.ViewModel
{
    public class OrgBulletin
    {
        public int ID { get; set; }
        public string ContentTitle { get; set; }
        public string Content { get; set; }
        public DateTime CreateTime { get; set; }
        public int OrgID { get; set; }
    }
}
