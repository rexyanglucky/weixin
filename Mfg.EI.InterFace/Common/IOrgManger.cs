/*
 * author:谢利民;
 * function:机构管理操作的功能
 * adddate:2015-04-19
 * updatedate:2015-04-19
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Entity;
namespace Mfg.EI.InterFace
{
    /// <summary>
    /// 机构管理操作的功能
    /// </summary>
    public interface IOrgManger
    {
        EI_Org GetModel(string Url);

        string GetDataTableXml(string sql, Dictionary<string, object> param);
    }

}
