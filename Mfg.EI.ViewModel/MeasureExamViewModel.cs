using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 开始作答model
    /// </summary>
   public class MeasureExamViewModel
    {
       /// <summary>
       /// 作答转台
       /// </summary>
       public int MeasureStatus { get; set; }


       /// <summary>
       /// 机构Id
       /// </summary>
       public int OrgID { get; set; }

       /// <summary>
       /// 临时学生id
       /// </summary>
       public string TempID { get; set; }


       /// <summary>
       /// 教师Id
       /// </summary>
       public int TID { get; set; }

       /// <summary>
       ///试卷Id 
       /// </summary>
       public int ExamID { get; set; }

       /// <summary>
       /// 试卷名称
       /// </summary>
       public string ExamName { get; set; }

       /// <summary>
       /// 试卷版本
       /// </summary>
       public int ExamEdition { get; set; }


       /// <summary>
       /// 预计时间
       /// </summary>
       public float ExpectTime { get; set; }


       /// <summary>
       /// 测评范围
       /// </summary>
       public string AgeRange { get; set; }


       /// <summary>
       /// 添加时间
       /// </summary>
       public DateTime AddTime { get; set; }

       /// <summary>
       /// 开始答题时间
       /// </summary>
       public DateTime MeasureTime { get; set; }


       /// <summary>
       /// 答题完毕时间
       /// </summary>
       public DateTime LastEditTime { get; set; }

       /// <summary>
       /// 备注
       /// </summary>
       public string Remark { get; set; }


       /// <summary>
       /// 纬度ids
       /// </summary>
       public string DimIDs { get; set; }


    }
}
