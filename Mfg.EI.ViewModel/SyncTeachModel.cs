using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    public class SyncTeachModel : InfoBaseModel
    {
        /// <summary>
        /// 选修集合
        /// </summary>
        public List<Mfg.Resouce.Models.Tchmaterial> electiveList { get; set; }

    }

    public class SyncTeachInitModel
    {
        public JobModel dto { get; set; }

        /// <summary>
        /// 试题明细
        /// </summary>
        public List<JRelIModel> StrB { get; set; }
    }
}
