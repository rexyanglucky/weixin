using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.Entity
{
    /// <summary>
    ///EI_TAConfigure:配置课时实体类
    /// </summary>
  public  class EI_TAConfigure
    {
      /// <summary>
      /// 测评ID
      /// </summary>
      private string _taid = string.Empty;

      /// <summary>
      /// 总课时
      /// </summary>
      private int? _totalhour = 0;

      /// <summary>
      /// 知识点ID
      /// </summary>
      private string _kid = string.Empty;

      /// <summary>
      /// 知识点名称
      /// </summary>
      private string _knowledgename = string.Empty;

      /// <summary>
      /// 等级设置1、优秀 2、较好 3、一般 4较差
      /// </summary>
      private string _levelset = string.Empty;

      /// <summary>
      /// 匹配课时
      /// </summary>
      private int? _mathclass = 0;

      public string TAID
      {
          set { _taid = value; }
          get { return _taid; }
      }

      public int? TotalHour
      {

          set { _totalhour = value; }
          get { return _totalhour; }
      }

      public string KID
      {
          set { _kid = value; }
          get { return _kid; }
      }

      public string KnowledgeName
      {
          set { _knowledgename = value; }
          get { return _knowledgename; }
      }

      public string LevelSet
      {
          set { _levelset = value; }
          get { return _levelset; }
      }

      public int? MathClass
      {
          set { _mathclass = value; }
          get { return _mathclass; }
      }
    }
}
