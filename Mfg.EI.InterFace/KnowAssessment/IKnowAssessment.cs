
/*
 * author:谢利民;
 * function:知识测评相关功能的接口
 * date:2015-05-11
 * update:205-05-11
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
    /// IKnowAssessment：知识测评相关功能的接口
    /// </summary>
    public interface IKnowAssessment
    {
        /// <summary>
        ///根据ID 获取知识测评的模型
        /// </summary>
        /// <returns></returns>
        KnowAssessmentModel GetAnalyModel(string id, string para);

        /// <summary>
        ///根据ID 获取知识测评的模型
        /// </summary>
        /// <returns></returns>
        KnowAssessmentModel GetNewAnalyModel(string id, string para);


        /// <summary>
        /// 初始化页面
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        KnowledgeModel GetTeach(KnowledgeModel dto);


        /// <summary>
        /// 保存知识点
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        ReponseData SaveBook(TempStudentInfoModel dto);

        /// <summary>
        /// 创建学生信息
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        ReponseData SaveStuInfo(TempStudentInfoModel dto);

        /// <summary>
        /// 保存知识点
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        ReponseData SaveBookExam(TempStudentInfoModel dto);

        /// <summary>
        /// 随机生成10道题
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        List<KnowQuesModel> GetRandKnowList(Dictionary<int, int> dic);

        ReponseData SaveItem(TempTARelModel dto);

        /// <summary>
        /// 根据ID获取知识测评模型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        KnowAssessmentModel GetKnowModel(string id);

        /// <summary>
        /// 获取想象力、观察力、意志力的试题
        /// </summary>
        /// <param name="idlist"></param>
        /// <returns></returns>
        List<KnowQuesModel> GetKnowList(string idlist);

        /// <summary>
        /// 初始化数据
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        List<TempStudentInfoModel> GetInit(TempStudentInfoModel para);


        ///// <summary>
        ///// 更新用户数据
        ///// </summary>
        ///// <param name="dtoSelf"></param>
        ///// <param name="TID">教师ID</param>
        ///// <returns></returns>
        //bool UpdateTempUser(MfgUserInfoModel dtoSelf);

        /// <summary>
        /// 保存数据
        /// </summary>
        /// <param name="knowModel"></param>
        /// <returns></returns>
        bool SaveKnowList(KnowAssessmentModel knowModel, List<SecmainQuesModel> seamainList);
        bool UpdateTempUser(MfgUserInfoModel dtoSelf, int TID);

        /// <summary>
        /// 根据学生ID获取学生姓名
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        string GetTempStuName(string id);

        /// <summary>
        /// 根据测评ID获取答题时间
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        int GetAnswerTime(string id);

        /// <summary>
        /// 根据参数生成知识测评报告
        /// </summary>
        /// <param name="parammodel"></param>
        /// <returns></returns>
        KnowReportModel GetReportModel(ParamModel parammodel);

        /// <summary>
        /// 根据参数生成打印模板
        /// </summary>
        /// <param name="parammodel"></param>
        /// <returns></returns>
        KnowReportModel GetPrintReportModel(ParamModel parammodel);

        /// <summary>
        /// 修改状态
        /// </summary>
        /// <param name="TID"></param>
        /// <param name="TAID"></param>
        void SaveKnowAssEffect(string TID, string TAID);

        /// <summary>
        /// 删除临时数据
        /// </summary>
        /// <param name="TempID"></param>
        /// <param name="p"></param>
        /// <returns></returns>
        bool DeleteTempUser(string TempID, int p);

        /// <summary>
        /// 查询已经选择的数据
        /// </summary>
        /// <param name="dto"></param>
        void SelectItem(TempTARelModel dto);

        /// <summary>
        /// 添加配置测评
        /// </summary>
        /// <param name="modelList"></param>
        /// <returns></returns>
        bool AddConfigure(List<TAConfigureModel> modelList);

        /// <summary>
        /// 更新配置测评
        /// </summary>
        /// <param name="modelList"></param>
        /// <returns></returns>
        bool UpdatConfigure(List<TAConfigureModel> modelList);

        /// <summary>
        /// 判断是否存在配置信息
        /// </summary>
        /// <param name="taid"></param>
        /// <returns></returns>
        bool IsExitConfigure(string taid);

        /// <summary>
        /// 删除配置
        /// </summary>
        /// <param name="taid"></param>
        /// <returns></returns>
        bool DeleteConfigure(string taid);

        void GetTestExam(TestExamPageModel dto);

        string DeleteTestExam(TestExamModel dto);

        /// <summary>
        /// 修改配置结果内容
        /// </summary>
        /// <param name="contentModel"></param>
        /// <returns></returns>
        bool UpdateTARContent(TARContentModel contentModel);

        List<TestExamItemModel> GePreView(TestExamModel dto);

        void GetSingleInfo(TestSingleBaseModel dto);

        List<TagModel> GetTagKeepInit(TagKeepInitModel dto);

        Int32 SaveTagKeepInit(TagKeepInitModel para, TagKeepMappingModel dto);
        /// <summary>
        /// 是否配置教程
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        bool GetManrelstaCount(string tid);

        #region 操作感知题
        List<KnowQuesModel> GetKnowDataList(int id);
        #endregion

        ///// <summary>
        ///// 保存学科测评报告结果
        ///// </summary>
        ///// <param name="taid"></param>
        ///// <param name="sid"></param>
        ///// <returns></returns>
        //bool SaveSubReport(string taid,string sid);

        List<TempMeasureModel> GetMeasure(TempMeasureModelPara p);


        /// <summary>
        /// 获取所有测评档案
        /// </summary>
        /// <param name="p"></param>
        /// <returns></returns>
        List<TempMeasureStudentModel> GetAllMeasure(string p);

        List<TempMeasureModel> GetFileMeasureID(string mfgid);

        List<TempMeasureModel> GetFileMeasureID(TempMeasureModelPara p);

        List<TempMeasureStudentModel> GetAllMeasureSub(string p);

        AnswerTestModel WorkInit(string TAID);

        bool SaveKnowItem(KnowAssessmentSubModel dto);
    }
}
