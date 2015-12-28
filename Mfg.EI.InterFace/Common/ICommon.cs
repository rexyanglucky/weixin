using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.InterFace.Common
{
    public interface ICommon
    {
        #region 查询科目
         Dictionary<int, string> getSubject();
        #endregion
    }
}
