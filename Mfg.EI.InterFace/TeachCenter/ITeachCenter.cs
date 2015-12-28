using Mfg.EI.ViewModel;
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
    public interface ITeachCenter
    {

        //PrepareLessonsModel GetPrepareLessonFromResource(TeachCenterQueryModel queryModel);
        /// <summary>
        /// 从数据库读取教案
        /// </summary>
        /// <param name="queryModel"></param>
        /// <returns></returns>
        PrepareLessonsModel GetPrepareLessonFromDb(TeachCenterQueryModel queryModel);


        /// <summary>
        /// 设计教案保存数据
        /// </summary>
        /// <param name="queryModel">planindex，知识点列表，科目</param>
        /// <returns>int 0 成功 1 无数据 2程序异常</returns>
        int SavePrepareLessonsDetial(TeachCenterQueryModel queryModel);

        /// <summary>
        /// 获取试题列表
        /// </summary>
        /// <param name="queryModel"></param>
        /// <returns></returns>
        List<PlanQuestionItemsModel> GetPlanQuestionItemsFromDb(TeachCenterQueryModel queryModel);

        /// <summary>
        /// 更新 指定字段 教案表
        /// </summary>
        /// <param name="lessonModel"></param>
        /// <param name="cloumns">
        /// 1 fristmark 2 targetmark 3 diffmark 4 summarymark 
        /// 5 isfirst 6 istarget 7 isdiff 8 istach 9 issummary
        /// </param>
        /// <returns>bool</returns>
        bool UpdateLessonData(PrepareLessonsModel lessonModel, params int[] cloumns);

        /// <summary>
        /// 更新 指定字段 知识点表
        /// </summary>
        /// <param name="pointModel"></param>
        /// <param name="cloumns">
        /// 1 IsShow
        /// </param>
        /// <returns></returns>
        bool UpdateLessonPoint(PlanPointModel pointModel, params int[] cloumns);

        bool UpdateLessonPoint(List<PlanPointModel> pointModels, params int[] cloumns);
        /// <summary>
        /// 更新 指定字段 试题表
        /// </summary>
        /// <param name="itemModel"></param>
        /// <param name="cloumns">
        /// 1 ItemIndex
        /// </param>
        /// <returns></returns>
        bool UpdateLessonPointQuestion(PlanQuestionItemsModel itemModel, params int[] cloumns);


        /// <summary>
        /// 更新 指定字段 试题表集合
        /// </summary>
        /// <param name="itemsModel"></param>
        /// <param name="cloumns">
        /// 1 ItemIndex
        /// </param>
        /// <returns></returns>
        bool UpdateLessonPointQuestion(List<PlanQuestionItemsModel> itemsModel, params int[] cloumns);

        Tuple<int, PlanQuestionItemsModel> ChangeItem(TeachCenterQuestionRandModel questionrandModel);
        /// <summary>
        /// 删除试题
        /// </summary>
        /// <param name="detialId"></param>
        /// <returns></returns>
        bool DeleteQuestionItem(params string[] detialId);
    }
}
