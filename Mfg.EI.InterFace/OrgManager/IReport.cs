using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.Manager.Entity;

namespace Mfg.EI.InterFace
{
    public interface IReport
    {
        List<OrgReportStatistics> GetOrgReportStatisticsList(Search model, out int count);
    }
}
