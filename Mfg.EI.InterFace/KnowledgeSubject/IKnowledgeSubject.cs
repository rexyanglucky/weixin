using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using Mfg.EI.DAL;

namespace Mfg.EI.InterFace
{
    /// <summary>
    /// 学科测评接口
    /// </summary>
  public  interface IKnowledgeSubject
    {
      /// <summary>
      /// 学科单项测试
      /// </summary>
      /// <returns></returns>
      KnowledgeSubjectPointModel GetSubjectReport(string taid, string sid);

      /// <summary>
      /// 测评设置接口
      /// </summary>
      /// <param name="taidList"></param>
      /// <returns></returns>
      ReportConteSetModel GetConteSetModel(string taidList);


      bool SaveReportSet(ReportSetSaveModel reportsetModel);
    }
}
