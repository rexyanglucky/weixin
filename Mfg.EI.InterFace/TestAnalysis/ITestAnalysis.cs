using System;
/*
 * author:杨礼文;
 * function:测评分析接口
 * adddate:2015-05-17
 */

using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.ViewModel;
using Mfg.EI.Entity;
namespace Mfg.EI.InterFace
{
    public interface ITestAnalysis
    {

        #region 测评分析列表
        /// <summary>
        /// 测评分析列表
        /// </summary>
        /// <returns></returns>
        List<TestAnalysisModel> GetTestAnalysisList(string sId, string subjectId,string stageID, int currentPage, out int count);

        /// <summary>
        /// 指定月的知识点分析
        /// </summary>
        /// <param name="sId"></param>
        /// <param name="subjectId"></param>
        /// <param name="dateTime"></param>
        /// <param name="top10KnowledgeList"></param>
        /// <returns></returns>
        List<TestAnalysisModel> GetTestAnalysisList(string sId, string subjectId, string dateTime, out List<TestAnalysisModel> top10KnowledgeList);

        /// <summary>
        /// 指定月的知识点分析
        /// </summary>
        /// <param name="sId"></param>
        /// <param name="subjectId"></param>
        /// <param name="dateTime"></param>
        /// <param name="top10KnowledgeList"></param>
        /// <returns></returns>
        List<TestAnalysisModel> GetKnowledgeAccuracy(string sId, string subjectId, string dateTime, out List<TestAnalysisModel> top10KnowledgeList);
        #endregion

        #region 弱项提分
        bool InsertTestAnalysis(SyncJobModel syncjobmodel);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <param name="subjectid"></param>
        /// <returns></returns>
        List<EI_SyncJob> GetSyncJobModel(string id, string subjectid, string gradeid);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="showmodel"></param>
        /// <returns></returns>
        int InsertWrongList(ShowAnalysisModel showmodel);
        #endregion

        #region 统计掌握分析情况

        bool AnalysisDataBatch();

        #endregion

        List<AccuracyProgressModel> GetStuProgess(string Mfgid, string subjectID, string dateTime);

        /// <summary>
        /// 刷新时向Redis中写数据
        /// </summary>
        /// <param name="syncJobModel"></param>
        /// <returns></returns>
        bool SaveReferInfo(SyncJobModel syncJobModel);
        /// <summary>
        /// 获取刷新时的数据
        /// </summary>
        /// <param name="jid"></param>
        /// <returns></returns>
        SyncJobModel GetReferSyncModel(string jid);

        /// <summary>
        /// 获取自定知识讲解
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        KnowledgeCustomerPoint GetCustomerPoint(KnowledgeCustomerPoint dto);
    }
}
