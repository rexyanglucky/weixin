using Mfg.EI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.WeiXin.ViewModel
{
   public class ExamHistory
    {
       public List<ExamModel> ExamList { get; set; }
       /// <summary>
       /// 绑定科目列表
       /// </summary>
       public List<int> BindSubject { get; set; }
       public string Pager { get; set; }
       public int subID { get; set; }
       public int states { get; set; }

       public string StuID { get; set; }

       public string WeiXin { get; set; }
    }
}
