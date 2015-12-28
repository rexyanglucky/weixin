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
using Mfg.EI.DAL;
namespace Mfg.EI.InterFace
{
   /// <summary>
    /// 机构管理操作的功能
   /// </summary>
   public class OrgManger:IOrgManger
    {
       private OrgDal oraDal = new OrgDal();
        public Entity.EI_Org GetModel(string url)
        {
            return oraDal.GetModel(url);
        }


        public string GetDataTableXml(string sql, Dictionary<string, object> param)
        {
            return oraDal.GetDataTableXml(sql, param);
        }
    }
}
