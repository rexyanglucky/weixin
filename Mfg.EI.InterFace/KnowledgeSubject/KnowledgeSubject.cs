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
    public class KnowledgeSubject :IKnowledgeSubject
    {
        #region 私有变量
        private KnowledgeSubjectDal _knowledgeSubjectDal=new KnowledgeSubjectDal();
        #endregion
        public KnowledgeSubjectPointModel GetSubjectReport(string taid, string sid)
        {
            return _knowledgeSubjectDal.GetSubjectReport(taid,sid);

        }



        /// <summary>
        /// 测评设置接口
        /// </summary>
        /// <param name="taidList"></param>
        /// <returns></returns>
        public ReportConteSetModel GetConteSetModel(string taidList)
        {
            return _knowledgeSubjectDal.GetConteSetModel(taidList);
        }


        public bool SaveReportSet(ReportSetSaveModel reportsetModel)
        {
            return _knowledgeSubjectDal.SaveReportSet(reportsetModel);
        }
    }
}
