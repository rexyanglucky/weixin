using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 
    /// </summary>
  public  class KnowQuesModel
    {
      /// <summary>
        /// 自增ID
      /// </summary>
      public int? ID { get; set; }

      /// <summary>
      /// 类型ID
      /// </summary>
      public int? TypeID { get; set; }

      /// <summary>
      /// 类型名称
      /// </summary>
      public string TypeName { get; set; }

      /// <summary>
      /// 试题内容
      /// </summary>
      public string Body { get; set; }

      /// <summary>
      /// 选项内容
      /// </summary>
      public string AnswerList { get; set; }

      /// <summary>
      /// 答案
      /// </summary>
      public string Answer { get; set; }

      /// <summary>
      /// 选项分值
      /// </summary>
      public string ListSorce { get; set; }

      /// <summary>
      /// 创建时间
      /// </summary>
      public DateTime CreateTime { get; set; }

      /// <summary>
      /// 
      /// </summary>
      public string ShowTime { get; set; }
    }
}
