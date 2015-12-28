/*
 * author:谢利民;
 * function:角色模型
 * adddate:2015-04-21
 * updatedate:2015-04-21
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// RoleModel:角色模型
    /// </summary>
   public class RoleModel
    {
       /// <summary>
       /// 角色ID
       /// </summary>
       public int ID { get; set; }
       /// <summary>
       /// 角色名称
       /// </summary>
       public string Name { get; set; }

       /// <summary>
       /// 角色类型
       /// </summary>
       public int? Rtype { get; set; }
    }
}
