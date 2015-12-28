using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.ViewModel;
using Mfg.EI.Entity;
using Mfg.Resouce.Models;

namespace Mfg.EI.InterFace
{
    public interface ITeachingPlan
    {

        #region 获取需求设置
        /// <summary>
        /// 获取需求设置
        /// </summary>
        /// <param name="planID"></param>
        /// <param name="IsEffect"></param>
        /// <returns></returns>
        FirstStepModel GetPlanDraft(Int64 planID, int IsEffect);
        #endregion

        #region  获取教师阶段科目对应

        /// <summary>
        /// 获取教师阶段科目对应
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        List<ManRelStaModel> GetManRelStaList(string tid);
        #endregion

        #region 保存需求设置
        /// <summary>
        /// 保存需求设置
        /// </summary>
        /// <param name="model"></param>
        /// <param name="planID"></param>
        /// <returns></returns>
        bool SavePlan(FirstStepModel model);
        #endregion


        #region 获取课程规划
        /// <summary>
        /// 获取课程规划
        /// </summary>
        /// <param name="planID"></param>
        /// <param name="IsEffect"></param>
        /// <param name="IsRoot">第二步只取根数据</param>
        /// <returns></returns>
        List<SecondStepModel> GetPlan_Index_PointDraft(Int64 planID, int IsEffect, bool IsRoot);
        #endregion

        #region 保存课程规划
        /// <summary>
        /// 保存课程规划
        /// </summary>
        /// <param name="oldModelList"></param>
        /// <param name="newModelList"></param>
        /// <returns></returns>
        bool SavePlan_Index_Point(List<SecondStepModel> oldModelList, List<SecondStepModel> newModelList);
        #endregion

        #region 保存课程规划(第三步)
        /// <summary>
        /// 保存课程规划(第三步)
        /// </summary>
        /// <param name="oldModelList"></param>
        /// <param name="newModelList"></param>
        /// <param name="oldIndexStatusList"></param>
        /// <param name="newIndexStatusList"></param>
        /// <returns></returns>
        bool SavePlan_Index_Point_3(List<SecondStepModel> oldModelList, List<SecondStepModel> newModelList, List<SecondStepModel> oldIndexStatusList, List<SecondStepModel> newIndexStatusList);

        #endregion

        #region 获取设计教案详情
        /// <summary>
        /// 获取设计教案详情
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        PlanIndexViewModel GetPlanIndex(PlanParaViewModel para);
        #endregion

        #region 删除草稿箱
        /// <summary>
        /// 删除草稿箱
        /// </summary>
        /// <param name="planID"></param>
        /// <returns></returns>
        bool DeleteDraft(Int64 planID);
        #endregion

        PlanViewModel GetPlan(PlanParaViewModel para);
        List<PlanGroup> GetGroup(PlanParaViewModel para);
        PlanViewModel GetPlanSearch(PlanParaViewModel para);


        //  List<QuestionPage> ScreeningQuestion(string subjectId, int? Index, QuestionQuery query, out int RealCount);
        List<Mfg.Resouce.Models.Question> GetQuestionList(string subjectId, int[] idList);
        List<QuestionPage> ScreeningQuestion(string subjectId, string grade, int styleArea, int diffArea, string mainSec, int mainTest, int order, int pageIndex, int pageSize, out int RealCount);
        int ScreeningQuestionAdd(ei_plan_details model);
        int ScreeningQuestionDel(ei_plan_details model);
        byte GetQuote(PlanParaViewModel para);
        byte SaveFinish(PlanParaViewModel para);
        PlanIndexViewModel GetPlanIndexs(PlanParaViewModel para);
        PlanPointViewModel GetPlanPoints(PlanParaViewModel para);
        bool isHadExcamPoint(string SubjectID, string StageID);
    }
}
