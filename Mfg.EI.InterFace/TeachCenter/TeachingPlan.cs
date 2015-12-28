using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DAL;
using Mfg.EI.ViewModel;
using Mfg.Resouce.Models;
using Mfg.EI.Common;
using Mfg.EI.Entity;
namespace Mfg.EI.InterFace
{
    public class TeachingPlan : ITeachingPlan
    {
        #region 私有变量

        private TeachingPlanDal teachingPlanDal = new TeachingPlanDal();

        public PlanViewModel GetPlan(PlanParaViewModel para)
        {
            return teachingPlanDal.GetPlan(para);
        }

        public PlanViewModel GetPlanSearch(PlanParaViewModel para)
        {
            return teachingPlanDal.GetPlanSearch(para);
        }

        #endregion


        #region 获取需求设置
        /// <summary>
        /// 获取需求设置
        /// </summary>
        /// <param name="planID"></param>
        /// <param name="IsEffect"></param>
        /// <returns></returns>
        public FirstStepModel GetPlanDraft(Int64 planID, int IsEffect)
        {
            return teachingPlanDal.GetPlanDraft(planID, IsEffect);
        }
        #endregion

        #region  获取教师阶段科目对应
        /// <summary>
        /// 获取教师阶段科目对应
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public List<ManRelStaModel> GetManRelStaList(string tid)
        {
            var _subrelList = teachingPlanDal.GetModelList(tid);
            List<ManRelStaModel> _subrelmodelList = new List<ManRelStaModel>();


            if (_subrelList != null)
            {
                foreach (var item in _subrelList)
                {
                    ManRelStaModel _subrelmodel = new ManRelStaModel();
                    _subrelmodel.TID = Convert.ToInt32(tid);
                    _subrelmodel.StageID = item.StageID;
                    _subrelmodel.SubjectID = item.SubjectID;
                    _subrelmodel.MaterialID = item.MaterialID;
                    _subrelmodel.SubjectName = item.SubjectName;
                    _subrelmodelList.Add(_subrelmodel);
                }
            }
            return _subrelmodelList;
        }
        #endregion

        #region 保存需求设置
        /// <summary>
        /// 保存需求设置
        /// </summary>
        /// <param name="model"></param>
        /// <param name="planID"></param>
        /// <returns></returns>
        public bool SavePlan(FirstStepModel model)
        {
            return teachingPlanDal.SavePlan(model);
        }
        #endregion


        #region 获取课程规划
        /// <summary>
        /// 获取课程规划
        /// </summary>
        /// <param name="planID"></param>
        /// <param name="IsEffect"></param>
        /// <param name="IsRoot">第二步只取根数据</param>
        /// <returns></returns>
        public List<SecondStepModel> GetPlan_Index_PointDraft(Int64 planID, int IsEffect, bool IsRoot)
        {
            return ProcessPlan_Index_PointDraft(planID, IsEffect, IsRoot);
        }

        #endregion

        #region 处理第二步和第三步的Plan_Index_PointDraft
        /// <summary>
        /// 处理第二步和第三部的Plan_Index_PointDraft
        /// </summary>
        /// <param name="planID"></param>
        /// <param name="IsEffect"></param>
        /// <param name="IsRoot">第二步只取根数据</param>
        /// <returns></returns>
        private List<SecondStepModel> ProcessPlan_Index_PointDraft(Int64 planID, int IsEffect, bool IsRoot)
        {

            var modelList = teachingPlanDal.GetPlan_Index_PointDraft(planID, IsEffect);
            if (IsRoot)//第二步
            {
                return modelList.Where(m => m.IsRoot == 1).ToList();
            }
            else//第三步
            {

                var notRootModelList = modelList.Where(m => m.IsRoot != 1 && m.CurrentLever == 2).ToList();
                List<SecondStepModel> pointTimeList = new List<SecondStepModel>();//接口
                var rootmodelList = modelList.Where(m => m.IsRoot == 1).ToList();//根
                string[] pointidAry = rootmodelList.Where(m => !string.IsNullOrEmpty(m.PointID)).Select(m => m.PointID).Distinct().ToArray();


                if (modelList[0].TeachSituation == 1)
                {

                    var _point = new Question().QuerySimpleBookChilds("0" + modelList[0].SubjectID, modelList[0].BookID, pointidAry);
                    rootmodelList.ForEach(m =>
                    {
                        if (m.PlanPointsID > 0)
                        {
                            if (_point != null && _point.Count != 0)
                            {
                                foreach (var item in _point.Where(b => b.f_parent == m.PointID))
                                {
                                    //		<Item PointID="123" PointName="数一数" PointIndex="1" PlanIndexID="23" PlanPointsID="1" IsEffect="1" T="1"></Item>
                                    var model = new SecondStepModel();
                                    model.PointID = item.f_unit.ToString();
                                    model.PointName = item.f_name;
                                    model.PointIndex = 999;
                                    model.PlanIndexID = m.PlanIndexID;
                                    model.PlanPointsID = m.PlanPointsID;
                                    //model.ParentID = m.PointID;

                                    model.NumberName = m.NumberName;
                                    model.INumber = m.INumber;
                                    model.IndexStatus = m.IndexStatus;
                                    model.P_IsEffect = 0;
                                    model.DataSource = 1;
                                    pointTimeList.Add(model);
                                }
                            }

                        }

                    });

                }
                else
                {

                    var _point = new Question().QueryPointTimeList(new QuestionModel() { SubjectID = "0" + modelList[0].SubjectID }, pointidAry);

                    rootmodelList.ForEach(m =>
                    {
                        if (m.PlanPointsID > 0)
                        {
                            if (_point != null && _point.Count != 0)
                            {
                                //pName.ClassHour = pName.DefaultHour = _point.Where(p => p.f_parent == a.KID).Sum(t => t.f_time);

                                foreach (var item in _point.Where(b => b.f_parent == m.PointID))
                                {
                                    //		<Item PointID="123" PointName="数一数" PointIndex="1" PlanIndexID="23" PlanPointsID="1" IsEffect="1" T="1"></Item>
                                    var model = new SecondStepModel();
                                    model.PointID = item.f_sec.ToString();
                                    model.PointName = item.f_name;
                                    model.PointIndex = 999;
                                    model.PlanIndexID = m.PlanIndexID;
                                    model.PlanPointsID = m.PlanPointsID;
                                    //model.ParentID = m.PointID;

                                    model.NumberName = m.NumberName;
                                    model.INumber = m.INumber;
                                    model.IndexStatus = m.IndexStatus;
                                    model.P_IsEffect = 0;
                                    model.DataSource = 1;
                                    pointTimeList.Add(model);
                                }

                            }
                        }

                    });

                }

                if (notRootModelList.Count <= 0)
                {
                    return pointTimeList.OrderBy(m => m.INumber).ThenBy(m => m.PointIndex).ToList();
                }
                List<SecondStepModel> returnList = new List<SecondStepModel>();

                foreach (var notRootModel in notRootModelList)
                {
                    returnList.Add(notRootModel);
                    pointTimeList.Remove(
                        pointTimeList.Where(m => m.PointID == notRootModel.PointID && m.INumber == notRootModel.INumber && m.PointName == notRootModel.PointName).ToList().FirstOrDefault());
                }

                foreach (var item in pointTimeList)
                {
                    returnList.Add(item);
                }

                return returnList.OrderBy(m => m.INumber).ThenBy(m => m.PointIndex).ToList();



            }
        }
        #endregion

        #region 保存课程规划
        /// <summary>
        /// 保存课程规划
        /// </summary>
        /// <param name="oldModelList"></param>
        /// <param name="newModelList"></param>
        /// <returns></returns>
        public bool SavePlan_Index_Point(List<SecondStepModel> oldModelList, List<SecondStepModel> newModelList)
        {
            var modelList = ProcessPlan_Index_Point(oldModelList, newModelList);
            if (modelList.Count <= 0)
            {
                modelList.Add(new SecondStepModel()
                {
                    TID = newModelList[0].TID,
                    OrgID = newModelList[0].OrgID,
                    IsEdit = newModelList[0].IsEdit,
                    IsEffect = newModelList[0].IsEffect,
                    PlanID = newModelList[0].PlanID,

                    PointID = newModelList[0].PointID,
                    PointName = newModelList[0].PointName,
                    PointIndex = newModelList[0].PointIndex,
                    PlanIndexID = newModelList[0].PlanIndexID,

                    PlanPointsID = newModelList[0].PlanPointsID,
                    P_IsEffect = newModelList[0].P_IsEffect,
                    T = 2
                });
            }
            return teachingPlanDal.SavePlan_Index_Point(modelList);


        }
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
        public bool SavePlan_Index_Point_3(List<SecondStepModel> oldModelList, List<SecondStepModel> newModelList, List<SecondStepModel> oldIndexStatusList, List<SecondStepModel> newIndexStatusList)
        {

            List<SecondStepModel> modelList = ProcessPlan_Index_Point(oldModelList, newModelList);

            List<SecondStepModel> IndexStatusList = new List<SecondStepModel>();

            foreach (var item in newIndexStatusList)
            {
                //<Item PlanIndexID=\"{0}\" IndexStatus=\"{1}\" T=\"2\"></Item>
                var oldIndexStatus = oldIndexStatusList.Where(m => m.PlanIndexID == item.PlanIndexID).ToList().FirstOrDefault();
                if (item.IndexStatus != oldIndexStatus.IndexStatus)//状态：0末开始；1进行中；2已完成
                {
                    IndexStatusList.Add(item);
                }
            }



            if (modelList.Count <= 0 && IndexStatusList.Count <= 0)
            {
                modelList.Add(new SecondStepModel()
                {
                    TID = newModelList[0].TID,
                    OrgID = newModelList[0].OrgID,
                    IsEdit = newModelList[0].IsEdit,
                    IsEffect = newModelList[0].IsEffect,
                    PlanID = newModelList[0].PlanID,

                    PointID = newModelList[0].PointID,
                    PointName = newModelList[0].PointName,
                    PointIndex = newModelList[0].PointIndex,
                    PlanIndexID = newModelList[0].PlanIndexID,

                    PlanPointsID = newModelList[0].PlanPointsID,
                    P_IsEffect = newModelList[0].P_IsEffect,
                    T = 2
                });
            }
            return teachingPlanDal.SavePlan_Index_Point_3(modelList, IndexStatusList);
        }
        #endregion

        #region 处理第二步和第三步保存课程规划

        private List<SecondStepModel> ProcessPlan_Index_Point(List<SecondStepModel> oldModelList, List<SecondStepModel> newModelList)
        {

            List<SecondStepModel> modelList = new List<SecondStepModel>();

            foreach (var item in oldModelList)
            {

                #region 二
                //TID="123" OrgID="1" IsEdit="0" IsEffect="0"
                //T:1为新增；0为删除；2为排序变化
                //<Item PointID="123" PointName="数一数" PointIndex="1" PlanIndexID="23" T="1"></Item> 
                #endregion

                #region 三
                //TID="123" OrgID="1" IsEdit="0" IsEffect="0"
                //T:1为新增；0为删除；2为排序变化

                //<Item PointID="123" PointName="数一数" PointIndex="1" PlanIndexID="23" PlanPointsID="1" IsEffect="1" T="1"></Item> 
                #endregion

                var newModel = newModelList.Where(m => m.PointID == item.PointID && m.PointName == item.PointName && m.PlanIndexID == item.PlanIndexID).ToList();
                if (newModel.Count() > 0)
                {
                    #region MyRegion
                    //if (newModel[0].PointIndex != item.PointIndex)//顺序不一致 
                    //{
                    //    modelList.Add(new SecondStepModel()
                    //    {
                    //        TID = newModel[0].TID,
                    //        OrgID = newModel[0].OrgID,
                    //        IsEdit = newModel[0].IsEdit,
                    //        IsEffect = newModel[0].IsEffect,

                    //        PlanID = newModel[0].PlanID,
                    //        PointID = newModel[0].PointID,
                    //        PointName = newModel[0].PointName,
                    //        PointIndex = newModel[0].PointIndex,
                    //        PlanIndexID = newModel[0].PlanIndexID,

                    //        PlanPointsID = newModel[0].PlanPointsID,
                    //        P_IsEffect = newModel[0].P_IsEffect,
                    //        T = 2
                    //    });
                    //} 
                    #endregion

                }
                else //已被删除
                {
                    modelList.Add(new SecondStepModel()
                    {
                        TID = newModelList[0].TID,
                        OrgID = newModelList[0].OrgID,
                        IsEdit = newModelList[0].IsEdit,
                        IsEffect = newModelList[0].IsEffect,

                        PlanID = item.PlanID,
                        PointID = item.PointID,
                        PointName = item.PointName,
                        PointIndex = item.PointIndex,
                        PlanIndexID = item.PlanIndexID,

                        PlanPointsID = item.PlanPointsID,
                        P_IsEffect = item.P_IsEffect,
                        T = 0
                    });
                }

            }


            foreach (var item in newModelList)
            {
                var odlModel = oldModelList.Where(m => m.PointID == item.PointID && m.PointName == item.PointName && m.PlanIndexID == item.PlanIndexID).ToList();
                if (odlModel.Count() > 0)
                {
                    if (odlModel[0].PointIndex != item.PointIndex)//顺序不一致
                    {
                        modelList.Add(new SecondStepModel()
                        {
                            TID = item.TID,
                            OrgID = item.OrgID,
                            IsEdit = item.IsEdit,
                            IsEffect = item.IsEffect,

                            PlanID = item.PlanID,
                            PointID = item.PointID,
                            PointName = item.PointName,
                            PointIndex = item.PointIndex,
                            PlanIndexID = item.PlanIndexID,

                            PlanPointsID = item.PlanPointsID,
                            P_IsEffect = item.P_IsEffect,
                            T = 2
                        });
                    }

                }
                else //添加
                {
                    modelList.Add(new SecondStepModel()
                    {
                        TID = item.TID,
                        OrgID = item.OrgID,
                        IsEdit = item.IsEdit,
                        IsEffect = item.IsEffect,

                        PlanID = item.PlanID,
                        PointID = item.PointID,
                        PointName = item.PointName,
                        PointIndex = item.PointIndex,
                        PlanIndexID = item.PlanIndexID,

                        PlanPointsID = item.PlanPointsID,
                        P_IsEffect = item.P_IsEffect,
                        T = 1
                    });
                }
            }

            return modelList;
        }

        #endregion

        #region 获取设计教案详情
        /// <summary>
        /// 获取设计教案详情
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        public PlanIndexViewModel GetPlanIndex(PlanParaViewModel para)
        {
            return teachingPlanDal.GetPlanIndex(para);
        }
        #endregion

        #region 删除草稿箱
        /// <summary>
        /// 删除草稿箱
        /// </summary>
        /// <param name="planID"></param>
        /// <returns></returns>
        public bool DeleteDraft(Int64 planID)
        {
            return teachingPlanDal.DeleteDraft(planID);
        }
        #endregion

        public List<PlanGroup> GetGroup(PlanParaViewModel para)
        {
            return teachingPlanDal.GetGroup(para);
        }



        /// <summary>
        /// 赛选试题列表
        /// </summary>
        /// <param name="subjectId">科目</param>
        /// <param name="Index">页码</param>
        /// <param name="query">查询条件</param>
        /// <param name="RealCount">总行</param>
        /// <returns></returns>
        public List<QuestionPage> ScreeningQuestion(string subjectId, string grade, int styleArea, int diffArea, string mainSec, int mainTest, int order, int pageIndex, int pageSize, out int RealCount)
        {

            //Mfg.Resouce.Models.Point knownID = ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery(subjectId).FindOneByPointId(mainSec);
            //if (knownID == null)
            //{
            //    RealCount = 0;
            //    return null;
            //}

            List<Mfg.Resouce.Models.Question> Result = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectId)
          .QueryQuestionsOrderMainTest(grade, styleArea, diffArea, int.Parse(mainSec), mainTest, order, pageIndex, pageSize, out RealCount);


            List<QuestionPage> QuestionList = new List<QuestionPage>();



            if (Result != null && Result.Count != 0)
            {
                Result.ForEach(a =>
                {
                    QuestionPage qPage = new QuestionPage();
                    QuestionItemViewModel questModel = new QuestionItemViewModel(a, int.Parse(subjectId));
                    qPage.f_body = questModel.GetItemBodyHtml();//BODY
                    qPage.f_ways = questModel.f_ways;//解析
                    qPage.f_answer = questModel.f_answer;
                    qPage.f_typename = questModel.f_papername;
                    qPage.f_isold = questModel.f_isold;
                    qPage.f_id = questModel.f_id;
                    qPage.f_difficulty = questModel.f_difficulty;
                    qPage.f_mainsec = questModel.f_mainsec;
                    qPage.f_mainsec1 = questModel.f_mainsec1;
                    qPage.f_maintest = questModel.f_maintest;
                    QuestionList.Add(qPage);
                });
            }
            return QuestionList;
        }

        /// <summary>
        /// 获取试题列表
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="idList"></param>
        /// <returns></returns>
        public List<Mfg.Resouce.Models.Question> GetQuestionList(string subjectId, int[] idList)
        {
            return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectId).FindIdlist(idList);
        }


        /// <summary>
        /// 添加试题
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int ScreeningQuestionAdd(ei_plan_details model)
        {
            //设置顺序
            model.ItemIndex = teachingPlanDal.getCount(model.PlanPointsID);

            return teachingPlanDal.ScreeningQuestionAdd(model);

        }

        /// <summary>
        /// 删除试题
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int ScreeningQuestionDel(ei_plan_details model)
        {
            return teachingPlanDal.ScreeningQuestionDel(model);
        }

        /// <summary>
        ///  当前科目和年级是否有考点
        /// </summary>
        /// <returns></returns>
        public bool isHadExcamPoint(string SubjectID, string StageID)
        {
            if (!SubjectID.StartsWith("0"))
                SubjectID = "0" + SubjectID;

            string grade = string.Empty;
            if (StageID.Equals("1"))
                grade = "x";
            if (StageID.Equals("2"))
                grade = "c";
            if (StageID.Equals("3"))
                grade = "g";


            List<EI_Subject> subs = teachingPlanDal.GetAllSubject();

            Dictionary<string, string> excam = new Dictionary<string, string>();
            foreach (EI_Subject item in subs)
            {
                List<string> arr = new List<string>();

                if (item.IsXOpen)
                    arr.Add("x");
                if (item.IsCOpen)
                    arr.Add("c");
                if (item.IsGOpen)
                    arr.Add("g");

                excam["0" + item.SubjectCode] = string.Join(",", arr.ToArray());
            }
            if (!excam.ContainsKey(SubjectID))
                return false;
            return excam[SubjectID].Contains(grade);


        }


        public byte GetQuote(PlanParaViewModel para)
        {
            return teachingPlanDal.GetQuote(para);
        }

        public byte SaveFinish(PlanParaViewModel para)
        {
            return teachingPlanDal.SaveFinish(para);
        }

        public PlanIndexViewModel GetPlanIndexs(PlanParaViewModel para)
        {
            return teachingPlanDal.GetPlanIndexs(para);
        }

        public PlanPointViewModel GetPlanPoints(PlanParaViewModel para)
        {
            return teachingPlanDal.GetPlanPoints(para);
        }
    }
}
