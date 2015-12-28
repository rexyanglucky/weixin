using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
namespace Mfg.EI.InterFace.Common
{
    public class Common:ICommon
    {
        #region 查询科目
        public  Dictionary<int,string> getSubject()
        {
            return Mfg.EI.DAL.CommonDal.QuerySubject().Tables[0].Rows.Cast<DataRow>().ToDictionary(x => Convert.ToInt32(x[0]), x => x[1].ToString());
        }
        #endregion
    }
}
