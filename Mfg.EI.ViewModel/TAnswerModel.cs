using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 知识测评答题表【EI_TAnswer】
    /// </summary>
   public class TAnswerModel
    {
       /// <summary>
       /// 学生ID
       /// </summary>
       public string SID { get; set; }

       /// <summary>
       /// 
       /// </summary>
       public string KID { get; set; }

       /// <summary>
       /// 知识测评ID
       /// </summary>
       public string TAID { get; set; }

       /// <summary>
       /// 试题ID
       /// </summary>
       public int? ItemID { get; set; }

       /// <summary>
       /// 正确率
       /// </summary>
       public int? Accuracy { get; set; }

       /// <summary>
       /// 回答
       /// </summary>
       public string Answer { get; set; }

       /// <summary>
       /// 回答时间
       /// </summary>
       public int? AnswerTime { get; set; }

       /// <summary>
       /// 试题来源
       /// </summary>
       public int? ItemSource { get; set; }

       /// <summary>
       /// 
       /// </summary>
       public DateTime? CreateTime
       {
           set;
           get;
       }

       /// <summary>
       /// 
       /// </summary>
       public int? DelFlag
       {
           set;
           get;
       }

       /// <summary>
       /// 
       /// </summary>
       public string Remark
       {
           set;
           get;
       }
    }
}
