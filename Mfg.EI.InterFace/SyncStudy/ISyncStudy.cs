using Mfg.EI.ViewModel;
using System.Collections.Generic;

namespace Mfg.EI.InterFace
{
    public interface ISyncStudy
    {

        /// <summary>
        /// 查询奖杯数量
        /// </summary>
        /// <param name="userId">当前登录名</param>
        /// <returns></returns>
        List<EI_KDCup> GetCupList(int userId);


        /// <summary>
        /// 初始化学生数据
        /// </summary>
        /// <param name="p"></param>
        /// <returns></returns>

        SyncStudyModel GetInit(SyncStudyModel p);

        /// <summary>
        /// 查询结果
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        SyncStudyJobModel GetInitResult(SyncStudyJob para);

        /// <summary>
        /// 添加学生同步学习
        /// </summary>
        /// <param name="_syncjobModel"></param>
        /// <returns></returns>
        bool InsertTestAnalysis(SyncJobModel _syncjobModel);

        /// <summary>
        /// 添加笔记
        /// </summary>
        /// <param name="jaid"></param>
        /// <param name="noteContent"></param>
        /// <returns></returns>
        bool AddItemNote(string jaid, string noteContent);

        /// <summary>
        /// 获取奖杯
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>

        List<SyncJobModel> GetCup(SyncJobModel dto);

        KnowledgeCustomerPoint GetCustomerPoint(KnowledgeCustomerPoint dto);
    }
}
