/*
 * author:谢利民;
 * function:教师管理模型
 * adddate:2015-05-02
 * updatedate:2015-05-02
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 布置作业对象
    /// </summary>
  public  class WorkObjectModel
    {
      /// <summary>
      /// 分组ID
      /// </summary>
      public string GID { get; set; }

      /// <summary>
      /// 教师ID
      /// </summary>
      public string TID { get; set; }

      /// <summary>
      /// 分组名称
      /// </summary>
      public string GroupName { get; set; }

      /// <summary>
      /// 学生ID
      /// </summary>
      public string SID { get; set; }

      /// <summary>
      /// 学生姓名
      /// </summary>
      public string Name { get; set; }




    }
}
