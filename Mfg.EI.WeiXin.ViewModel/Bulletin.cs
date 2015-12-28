using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.WeiXin.ViewModel
{
    public class Bulletin
    {
            public List<OrgBulletin> BulletinList { get; set; }
            public Condition Condition { get; set; }
            public Dictionary<int, string> CateDic { get; set; }
            public Dictionary<int, string> CaSonId { get; set; }
            public string OpenId {get;set;}
            public string Pager { get; set; }
    }
    public class Condition
    {
        public int CategoryId { get; set; }
        public int CsId { get; set; }
        public DateTime? ApplyDate { get; set; }
        private int pageindex = 1;
        public int pi { get { return pageindex; } set { pageindex = value; } }
        private int pagesize = 10;
        public int ps { get { return pagesize; } set { pagesize = value; } }
    }
}
