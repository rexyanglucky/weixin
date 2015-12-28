using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DAL.OrgManger;
using Mfg.Manager.Entity;

namespace Mfg.EI.InterFace
{
    public class Report : IReport
    {
        #region 私有对象
        private ReportDal reportDal = new ReportDal();
        #endregion

        public List<OrgReportStatistics> GetOrgReportStatisticsList(Search model, out int count)
        {
            return reportDal.GetOrgReportStatisticsList(model, out  count);
        }
    }
}
