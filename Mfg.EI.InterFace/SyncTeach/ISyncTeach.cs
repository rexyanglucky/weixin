using Mfg.EI.ViewModel;
/*
 * author:谢利民;
 * function:同步教学功能操作
 * date:2015-05-10
 * updateDate:2015-05-10
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.InterFace
{
    /// <summary>
    /// ISyncTeach：同步教学功能操作
    /// </summary>
    public interface ISyncTeach
    {
        #region 同步教学教案显示的接口


        #endregion


        #region 布置课后作业编辑的接口


        #endregion

        /// <summary>
        /// 首次加载
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        SyncTeachModel GetTeach(SyncTeachModel dto);

        /// <summary>
        /// 保存初始信息
        /// </summary>
        /// <param name="initModel"></param>
        /// <returns></returns>
        string SaveJob(SyncTeachInitModel initModel);


        /// <summary>
        /// 保存修改学习目标与知识讲解
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        string SavePoint(KnowledgePoint dto);

        /// <summary>
        /// 获取用户修改的学习目标与知识讲解
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        KnowledgeCustomerPoint GetCustomerPoint(KnowledgeCustomerPoint dto);

        string InitExample(KnowledgePointItem dto);

        List<KnowledgePointList> InitDraftData(KnowledgePointItem dto);

        string CheckDataIndex(List<KnowledgePointList> dto);

        string DelDataIndex(List<KnowledgePointList> dto);

        List<KnowledgePointList> InitLocalData(KnowledgePointItem dto);

        string InitSaveData(KnowledgePointItem dto);

        List<KnowledgePointList> InitShow(KnowledgePointList dto);

        string SaveShow(KnowledgePointList dto);
    }
}
