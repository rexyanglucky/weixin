/*
 * author:谢利民;
 * function:机构管理操作的功能
 * adddate:2015-04-20
 * updatedate:2015-04-20
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 机构管理操作的功能
    /// </summary>
   public class OrgModel
    {
        /// <summary>
        /// 域名
        /// </summary>
       public string Url { set; get; }

      /// <summary>
      /// 模板名称
      /// </summary>
       public string OrgTemplate { set; get; }
     
    }
}
