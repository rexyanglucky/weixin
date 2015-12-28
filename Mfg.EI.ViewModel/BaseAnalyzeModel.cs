using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.ViewModel
{
    /// <summary>
    /// 基本知识测评信息模型
    /// </summary>
   public  class BaseAnalyzeModel
    {
       /// <summary>
       /// 
       /// </summary>
       public int Index { get; set; }
       /// <summary>
       /// 魔方格ID
       /// </summary>
       public string MFGID { get; set; }

       /// <summary>
       /// 测评分析ID
       /// </summary>
       public string TAID { get; set; }

       /// <summary>
       /// 学生ID
       /// </summary>
       public string SID { get; set; }

       /// <summary>
       /// 阶段ID
       /// </summary>
       public int  StageID { get; set; }

       /// <summary>
       /// 科目ID
       /// </summary>
       public int SubjectID { get; set; }

       /// <summary>
       /// 测评分析时间
       /// </summary>
       public DateTime CreateTime { get; set; }


       public int CurrentPage { get; set; }

       public int PageSize { get; set; }

       public int MaxCount { get; set; }


       public string pageNavigate { get; set; }

       /// <summary>
       /// 
       /// </summary>
       public List<BaseAnalyzeModel> Data { get; set; }

    }
}
