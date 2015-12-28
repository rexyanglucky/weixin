
/*
 * author:谢利民;
 * function:同步学习功能的接口
 * date:2015-05-13
 * update:205-05-13
 */
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
    /// ISyncLearnStu：同步学习功能的接口
    /// </summary>
    public interface ISyncLearnStu
    {


        /// <summary>
        /// 根据ID获取模型
        /// </summary>
        /// <param name="jobId"></param>
        /// <returns></returns>
        SyncJobModel GetSyncJobModel(string jobId);

      /// <summary>
      /// 提交同步学习答题
      /// </summary>
      /// <param name="syncjobModel"></param>
      /// <returns></returns>
        bool SumbitSyncItem(SyncJAnswerModel syncModel);

        bool SumbitSyscList(List<EI_SyncJAnswer> modelList);

        
        /// <summary>
        /// 同步学习提交选项
        /// </summary>
        /// <param name="syncJobModel"></param>
        /// <returns></returns>
        string SumbitSyscList(SyncJobModel syncJobModel);

        /// <summary>
        /// 测评分析
        /// </summary>
        /// <returns></returns>
        string SumbitTestAnalyList(SyncJobModel syncJobModel);

      /// <summary>
      /// 获取累计用时
      /// </summary>
      /// <param name="jobId"></param>
      /// <returns></returns>
        int GetAccumulated(string jobId);

      /// <summary>
      /// 获取答题
      /// </summary>
      /// <param name="jobId"></param>
      /// <param name="itemId"></param>
      /// <returns></returns>
        SyncJAnswerModel GetAnswerModel(string jobId, string itemId);
       
          /// <summary>
          /// 向错题本中插入记录
          /// </summary>
          /// <param name="idlist"></param>
          /// <returns></returns>
        int InsertWrongList(ShowAnalysisModel showmodel);

        /// <summary>
        /// 根据知识点ID和学生ID获取信息
        /// </summary>
        /// <param name="kid"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        List<EI_SyncJob> GetSysModelList(string kid, string sid,string subjectid);

        /// <summary>
        /// 插入经验值
        /// </summary>
        /// <param name="sID"></param>
        /// <param name="experNumber"></param>
        /// <returns></returns>
        bool InsertExcptValue(string sID, int experNumber);
        #region 添加揪错信息

        /// <summary>
        /// 添加揪错信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool AddCorrection(CorrectionModel model);

        #endregion


    }
}
