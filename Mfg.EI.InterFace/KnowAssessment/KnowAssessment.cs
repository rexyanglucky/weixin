
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
    /// KnowAssessment：知识测评相关功能的接口
    /// </summary>
    public class KnowAssessment : IKnowAssessment
    {
        #region 私有变量
        private TARelKnoDal _tarelknoDal = new TARelKnoDal();
        private KnowQuesDal _knowquesDal = new KnowQuesDal();
        private TARelItemDal _tarelitemDal = new TARelItemDal();
        private TAnswerDal _tanswerDal = new TAnswerDal();
        private KnowReportDal _knowreportDal = new KnowReportDal();
        private TAConfigureDal _taconfigureDal = new TAConfigureDal();
        private TARContentDal _tarcontentDal = new TARContentDal();
        private ManRelStaDal _subrelmatdal = new ManRelStaDal();
        private const string _onlinetime = "2015-7-24 16:00:00";
        #endregion

        public KnowledgeModel GetTeach(KnowledgeModel dto)
        {

            return new ManRelStaDal().GetTeach(dto);
        }

        /// <summary>
        /// 根据ID 获取知识测评的模型
        /// </summary>
        /// <param name="id"></param>
        /// /// <param name="para"></param>
        /// <returns></returns>
        public KnowAssessmentModel GetAnalyModel(string id, string para)
        {
            try
            {
                KnowAssessmentModel _knowassessmentModel = new KnowAssessmentModel();
                _knowassessmentModel.SubjectID = Convert.ToInt32(para);
                _knowassessmentModel.ID = id;
                _knowassessmentModel.tarelknomodelList = _tarelknoDal.GetTKnoModelList(id);

                return _knowassessmentModel;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }

        /// <summary>
        /// 根据ID 获取知识测评的模型
        /// </summary>
        /// <param name="id"></param>
        /// /// <param name="para"></param>
        /// <returns></returns>
        public KnowAssessmentModel GetNewAnalyModel(string id, string para)
        {
            try
            {
                KnowAssessmentModel _knowassessmentModel = new KnowAssessmentModel();
                _knowassessmentModel.SubjectID = Convert.ToInt32(para);
                _knowassessmentModel.ID = id;
                _knowassessmentModel.tarelknomodelList = _tarelknoDal.GetNewTKnoModelList(id);

                return _knowassessmentModel;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }


        public ReponseData SaveBook(TempStudentInfoModel dto)
        {
            try
            {
                return new ManRelStaDal().SaveBook(dto);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }


        public ReponseData SaveStuInfo(TempStudentInfoModel dto)
        {
            try
            {
                return new ManRelStaDal().SaveStuInfo(dto);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return new ReponseData(){Result = "0"};
            }

        }


        public ReponseData SaveBookExam(TempStudentInfoModel dto)
        {
            try
            {
                return new ManRelStaDal().SaveBookExam(dto);
            }
            catch (Exception ex)
            {

                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }

        /// <summary>
        /// 随机生成10道题
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public List<KnowQuesModel> GetRandKnowList(Dictionary<int, int> dic)
        {
            try
            {
                return _knowquesDal.GetModelList(dic);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }


        public ReponseData SaveItem(TempTARelModel dto)
        {
            try
            {
                return new ManRelStaDal().SaveItem(dto);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public KnowAssessmentModel GetKnowModel(string id)
        {
            try
            {
                KnowAssessmentModel _knowassessmentModel = new KnowAssessmentModel();
                _knowassessmentModel.ID = id;
                _knowassessmentModel.tarelitemmodelList = _tarelitemDal.GetItemModelList(id);
                _knowassessmentModel.tarelknomodelList = _tarelknoDal.GetTKnoModelList(id);
                _knowassessmentModel.tanswermodelList = _tanswerDal.GetTAnswerModelList(id);
                return _knowassessmentModel;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="idlist"></param>
        /// <returns></returns>
        public List<KnowQuesModel> GetKnowList(string idlist)
        {
            try
            {
                return _knowquesDal.GetKnowList(idlist);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }


        public List<TempStudentInfoModel> GetInit(TempStudentInfoModel para)
        {
            try
            {
                return _knowquesDal.GetInit(para);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }

        public bool UpdateTempUser(MfgUserInfoModel dtoSelf, int TID)
        {
            try
            {
                return _knowquesDal.UpdateTempUser(dtoSelf, TID);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return false;
            }

        }

        /// <summary>
        /// 保存数据
        /// </summary>
        /// <param name="knowModel"></param>
        /// <returns></returns>
        public bool SaveKnowList(KnowAssessmentModel knowModel, List<SecmainQuesModel> seamainList)
        {
            try
            {
                bool result = false;
                var datalist = knowModel.tanswermodelList;
                var datalist1 = datalist.Where(x => x.KID != "1" && x.KID != "2" && x.KID != "3").ToList();
                List<EI_TAnswer> _tanswerList = new List<EI_TAnswer>();
                if (datalist.Count > 0)
                {
                    foreach (var item in datalist)
                    {
                        EI_TAnswer _eitanswer = new EI_TAnswer();
                        _eitanswer.TAID = item.TAID;
                        _eitanswer.ItemID = item.ItemID;
                        _eitanswer.Accuracy = item.Accuracy;
                        _eitanswer.Answer = item.Answer;
                        _eitanswer.AnswerTime = item.AnswerTime;
                        _eitanswer.ItemSource = item.ItemSource;
                        _tanswerList.Add(_eitanswer);

                    }
                    result = _tanswerDal.Add(_tanswerList);
                }

                //更新数据库中的
                if (datalist1.Count > 0)
                {
                    foreach (var item in datalist1)
                    {
                        _tarelknoDal.UpdateIsUse(item.TAID, item.KID);
                    }
                    result = SaveSubReport(knowModel.ID, knowModel.SID, seamainList);
                }
                return result;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return false;
            }

        }

        /// <summary>
        /// 根据学生ID获取学生姓名
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetTempStuName(string id)
        {
            try
            {
                return _tarelitemDal.GetTempStudentName(id);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }

        /// <summary>
        /// 根据测评ID获取答题时间
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int GetAnswerTime(string id)
        {
            try
            {
                return _tarelitemDal.GetAnswerCount(id);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return 0;
            }

        }

        /// <summary>
        /// 根据参数获取知识测评报告
        /// </summary>
        /// <param name="parammodel"></param>
        /// <returns></returns>
        public KnowReportModel GetReportModel(ParamModel parammodel)
        {
            try
            {
                KnowReportModel _knowReportModel = new KnowReportModel();
                EI_TempStudentInfo tempstudentModel = _tarelitemDal.GetTempStudent(parammodel.SID);

                if (tempstudentModel != null)
                {
                    _knowReportModel.Name = tempstudentModel.Name;
                    _knowReportModel.TrainAim = tempstudentModel.TrainAim.ToString();//培训目的T
                    _knowReportModel.Phone = tempstudentModel.Phone;
                    _knowReportModel.StageID = parammodel.Statge;
                    _knowReportModel.SubjectID = parammodel.SubjectId;
                    _knowReportModel.startTime = tempstudentModel.CreateTime;
                }

                int statge = 0;
                if (parammodel.Statge == "x")
                {
                    statge = 1;
                }
                else if (parammodel.Statge == "c")
                {
                    statge = 2;
                }
                else if (parammodel.Statge == "g")
                {
                    statge = 3;
                }

                var tid = "000";
                if (tempstudentModel != null)
                {
                    tid = tempstudentModel.TID.ToString();
                }
                //获取知识点教材
                var dataMareList = _knowquesDal.GetTestAnaylzeInfo(parammodel.Taid);
                if (dataMareList != null)
                {
                    if (dataMareList.Count > 0)
                    {
                        if (dataMareList.First().Mversion == null || dataMareList.First().Mversion == "")
                        {
                            //兼容旧的版本数据
                            var data = _knowquesDal.GetManRelStaList(tid, statge, Convert.ToInt32(parammodel.SubjectId));
                            _knowReportModel.MaterialName = data == null ? "人教版" : data.First().Mversion;
                        }
                        else
                        {
                            _knowReportModel.MaterialName = dataMareList.First().Mversion;
                        }

                    }


                }

                List<KnowledgeShowModel> _knowshowList = new List<KnowledgeShowModel>();
                List<PerQuestionsModel> perquestionModelList = new List<PerQuestionsModel>();
                //知识测评集合
                var ConfigList = _taconfigureDal.GetTAConfigureModelList(parammodel.Taid);
                //没有配置测评
                List<TARelKnoModel> _tarelknoList = _tarelknoDal.GetTKnoModelList(parammodel.Taid);
                List<EI_TAnswer> datalist = _tanswerDal.GetModelList(parammodel.Taid);
                var listContentModel = _tarcontentDal.GetContentModelList(parammodel.Taid);//获取修改内容
                if (_tarelknoList != null)
                {
                    if (_tarelknoList.Count > 0)
                    {
                        #region
                        foreach (var item in _tarelknoList)
                        {
                            //判断是否配置课时，如果配置测评为true,否则为false;

                            List<TARelAnswerModel> tarelansermodelList = _knowquesDal.GettarelanserList(parammodel.Taid);
                            if (tarelansermodelList != null)
                            {
                                if (tarelansermodelList.Where(x => x.KID == item.KID).ToList().Count > 0)
                                {
                                    KnowledgeShowModel _knowledgeshowModel = new KnowledgeShowModel();
                                    if (ConfigList == null)
                                    {
                                        _knowledgeshowModel.KID = item.KID;
                                        _knowledgeshowModel.KnowledgeName = item.KnowledgeName;
                                        _knowledgeshowModel.DefaultHour = item.ClassHour.ToString();
                                        int wrongCount = tarelansermodelList.Where(x => x.KID == item.KID).ToList().Where(x => x.Accuracy == 1).Count();
                                        int TotalCount = tarelansermodelList.Where(x => x.KID == item.KID).ToList().Count;
                                        int masterValue = 0;
                                        if (TotalCount > 0)
                                        {
                                            masterValue = Convert.ToInt32((float)(wrongCount * 100 / TotalCount));
                                        }
                                        _knowledgeshowModel.Level = _knowreportDal.GetKnowLevel(masterValue);
                                        double G = _knowreportDal.GetAverageG(parammodel.Taid);//感知题平均分
                                        int M = Convert.ToInt32(item.ClassHour);
                                        int T = Convert.ToInt32(tempstudentModel.TrainAim);
                                        _knowledgeshowModel.DefaultHour = item.ClassHour.ToString();
                                        _knowledgeshowModel.ClassHour = Convert.ToInt32(_knowreportDal.GetHoursCalculation(masterValue, M, G, T)).ToString();
                                        _knowledgeshowModel.KnowUnderstand = _knowreportDal.GetKnowUnderstandFive(masterValue);
                                        _knowledgeshowModel.KnowResult = _knowreportDal.GetKnowResultSix(masterValue);
                                        //修改内容
                                        _knowledgeshowModel.KnowContent = "测评结果显示你在" + _knowReportModel.MaterialName + "知识点方面" + _knowledgeshowModel.KnowUnderstand + _knowledgeshowModel.KnowResult;
                                        if (listContentModel != null)
                                        {

                                            var dataitem = listContentModel.Where(x => x.KID == item.KID).ToList();
                                            if (dataitem != null)
                                            {
                                                if (dataitem.Count != 0)
                                                {
                                                    _knowledgeshowModel.KnowContent = dataitem.First().SetContent;
                                                }

                                            }
                                        }
                                    }
                                    else
                                    {
                                        _knowledgeshowModel.KID = item.KID;
                                        _knowledgeshowModel.KnowledgeName = item.KnowledgeName;

                                        _knowledgeshowModel.Level = ConfigList.Where(x => x.KID == item.KID).ToList().First().LevelSet;

                                        //更新classHour
                                        _knowledgeshowModel.ClassHour = ConfigList.Where(x => x.KID == item.KID).ToList().First().MathClass.ToString();//取配置完知识测评的值
                                        _knowledgeshowModel.DefaultHour = ConfigList.Where(x => x.KID == item.KID).ToList().First().MathClass.ToString();
                                        int wrongCount = tarelansermodelList.Where(x => x.KID == item.KID).ToList().Where(x => x.Accuracy == 1).Count();
                                        int TotalCount = tarelansermodelList.Where(x => x.KID == item.KID).ToList().Count;
                                        int masterValue = 0;
                                        if (TotalCount > 0)
                                        {
                                            masterValue = Convert.ToInt32((float)(wrongCount * 100 / TotalCount));
                                        }

                                        double G = _knowreportDal.GetAverageG(parammodel.Taid);//感知题平均分
                                        int M = 0;
                                        if (_knowledgeshowModel.ClassHour != string.Empty)
                                        {
                                            M = Convert.ToInt32(_knowledgeshowModel.ClassHour);
                                        }

                                        int T = Convert.ToInt32(tempstudentModel.TrainAim);
                                        if (_knowledgeshowModel.ClassHour != "")
                                        {
                                            _tarelknoDal.UpdateClassHour(parammodel.Taid, item.KID, Convert.ToInt32(_knowledgeshowModel.ClassHour));
                                        }

                                        _knowledgeshowModel.ClassHour = Convert.ToInt32(_knowreportDal.GetHoursCalculation(masterValue, M, G, T)).ToString();

                                        _knowledgeshowModel.KnowUnderstand = _knowreportDal.GetKnowUnderStandLevel(ConfigList.Where(x => x.KID == item.KID).ToList().First().LevelSet);
                                        _knowledgeshowModel.KnowResult = _knowreportDal.GetKnowResultContent(ConfigList.Where(x => x.KID == item.KID).ToList().First().LevelSet);
                                        _knowledgeshowModel.KnowContent = "测评结果显示你在" + _knowReportModel.MaterialName + "知识点方面" + _knowledgeshowModel.KnowUnderstand + _knowledgeshowModel.KnowResult;
                                        if (listContentModel != null)
                                        {
                                            var dataitem = listContentModel.Where(x => x.KID == item.KID).ToList();
                                            //判断配置和修改内容
                                            if (dataitem != null)
                                            {
                                                if (dataitem.Count > 0)
                                                {
                                                    if (dataitem.First().State == 0)
                                                    {
                                                        _knowledgeshowModel.KnowContent = dataitem.First().SetContent;
                                                    }

                                                }

                                            }
                                        }
                                    }

                                    _knowshowList.Add(_knowledgeshowModel);
                                }

                            }

                        }
                        #endregion
                        _knowReportModel.TotalHour = _knowshowList.Sum(x => Convert.ToInt32(x.ClassHour)).ToString();
                        _knowReportModel.knowledgeListModel = _knowshowList;
                    }
                }

                //判断是否配置课时，如果配置测评为true,否则为false;
                if (datalist != null)
                {
                    #region //计算观察力

                    var datalist1 = datalist.Where(x => x.ItemSource == 1).ToList();
                    int sumtotal1 = 0;
                    if (datalist1 != null)
                    {
                        foreach (var item in datalist1)
                        {
                            //根据日期判断题库的新旧
                            if (item.CreateTime < Convert.ToDateTime(_onlinetime))
                            {
                                //兼容以前
                                sumtotal1 += GetForceByItem(item.Answer);
                            }
                            else
                            {
                                //兼容现在
                                var knowdata = GetKnowList(item.ItemID.ToString()).First();
                                var postion = knowdata.AnswerList.IndexOf(item.Answer);
                                sumtotal1 += Convert.ToInt32(knowdata.ListSorce[postion].ToString());

                            }

                        }
                    }
                    int per1 = 0;
                    if (datalist1.Count > 0)
                    {
                        // per1 = Convert.ToInt32((sumtotal1 * 100 / (datalist1.Count * 3)));
                        per1 = GetPerByTotal(sumtotal1);
                    }
                    PerQuestionsModel _perquestionModel = new PerQuestionsModel();
                    if (ConfigList == null)
                    {
                        _perquestionModel.Name = "观察力";
                        _perquestionModel.Level = _knowreportDal.GetLevel(per1);
                        _perquestionModel.Content = _knowreportDal.GetObserAbility(per1);
                        //加载修改内容
                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "1").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {
                                    _perquestionModel.Content = dataitem.First().SetContent;
                                }
                            }
                        }

                    }
                    else
                    {
                        _perquestionModel.Name = "观察力";
                        _perquestionModel.Level = ConfigList.Where(x => x.KID == "1").ToList().First().LevelSet;
                        _perquestionModel.Content = _knowreportDal.GetObserAbilityContent(_perquestionModel.Level);
                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "1").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {
                                    if (dataitem.First().State == 0)
                                    {
                                        _perquestionModel.Content = dataitem.First().SetContent;
                                    }

                                }
                            }
                        }
                    }

                    perquestionModelList.Add(_perquestionModel);
                    #endregion

                    #region 想象力
                    var datalist2 = datalist.Where(x => x.ItemSource == 2).ToList();

                    int sumtotal2 = 0;
                    if (datalist2 != null)
                    {
                        foreach (var item in datalist2)
                        {
                            if (item.CreateTime < Convert.ToDateTime(_onlinetime))
                            {
                                sumtotal2 += GetForceByItem(item.Answer);
                            }
                            else
                            {
                                var knowdata = GetKnowList(item.ItemID.ToString()).First();
                                var postion = knowdata.AnswerList.IndexOf(item.Answer);
                                sumtotal2 += Convert.ToInt32(knowdata.ListSorce[postion].ToString());
                            }

                        }
                    }
                    int per2 = 0;
                    if (datalist2.Count > 0)
                    {
                        //per2 = Convert.ToInt32(sumtotal2 * 100 / (datalist2.Count * 3));
                        per2 = GetPerByTotal(sumtotal2);
                    }

                    _perquestionModel = new PerQuestionsModel();

                    if (ConfigList == null)
                    {
                        _perquestionModel.Name = "想象力";
                        _perquestionModel.Level = _knowreportDal.GetLevel(per2);
                        _perquestionModel.Content = _knowreportDal.GetImagination(per2);
                        //加载修改内容
                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "2").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {
                                    _perquestionModel.Content = dataitem.First().SetContent;
                                }
                            }
                        }

                    }
                    else
                    {
                        _perquestionModel.Name = "想象力";
                        _perquestionModel.Level = ConfigList.Where(x => x.KID == "2").ToList().First().LevelSet;
                        _perquestionModel.Content = _knowreportDal.GetImaginationContent(_perquestionModel.Level);
                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "2").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {
                                    if (dataitem.First().State == 0)
                                    {
                                        _perquestionModel.Content = dataitem.First().SetContent;
                                    }

                                }
                            }
                        }
                    }

                    perquestionModelList.Add(_perquestionModel);
                    #endregion

                    #region 意志力
                    var datalist3 = datalist.Where(x => x.ItemSource == 3).ToList();
                    int sumtotal3 = 0;
                    if (datalist3 != null)
                    {
                        foreach (var item in datalist3)
                        {
                            if (item.CreateTime < Convert.ToDateTime(_onlinetime))
                            {
                                sumtotal3 += GetForceByItem(item.Answer);
                            }
                            else
                            {
                                var knowdata = GetKnowList(item.ItemID.ToString()).First();
                                var postion = knowdata.AnswerList.IndexOf(item.Answer);
                                sumtotal3 += Convert.ToInt32(knowdata.ListSorce[postion].ToString());
                            }

                        }

                    }
                    int per3 = 0;
                    if (datalist3.Count > 0)
                    {
                        //per3 = Convert.ToInt32(sumtotal3 * 100 / (datalist3.Count * 3));
                        per3 = GetPerByTotal(sumtotal3);
                    }
                    _perquestionModel = new PerQuestionsModel();
                    if (ConfigList == null)
                    {
                        _perquestionModel.Name = "意志力";
                        _perquestionModel.Level = _knowreportDal.GetLevel(per3);
                        _perquestionModel.Content = _knowreportDal.GetWillpower(per3);
                        //加载修改内容
                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "3").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count() > 0)
                                {
                                    _perquestionModel.Content = dataitem.First().SetContent;
                                }

                            }
                        }
                    }
                    else
                    {
                        _perquestionModel.Name = "意志力";
                        _perquestionModel.Level = ConfigList.Where(x => x.KID == "3").ToList().First().LevelSet;
                        _perquestionModel.Content = _knowreportDal.GetWillpowerContent(_perquestionModel.Level);
                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "3").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {
                                    if (dataitem.First().State == 0)
                                    {
                                        _perquestionModel.Content = dataitem.First().SetContent;
                                    }

                                }
                            }
                        }
                    }

                    perquestionModelList.Add(_perquestionModel);
                    #endregion
                }

                _knowReportModel.perquestionListModel = perquestionModelList;


                return _knowReportModel;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }


        /// <summary>
        /// 根据选项返回得分
        /// </summary>
        /// <param name="item"></param>
        /// <returns></returns>
        public int GetForceByItem(string item)
        {
            int force = 0;
            switch (item)
            {
                case "A":
                    force = 0;
                    break;
                case "B":
                    force = 1;
                    break;
                case "C":
                    force = 2;
                    break;
                case "D":
                    force = 3;
                    break;

            }
            return force;
        }

        /// <summary>
        /// 根据观察力分数获取得分率
        /// </summary>
        /// <param name="total"></param>
        /// <returns></returns>
        public int GetPerByTotal(int total)
        {
            int per = 0;
            if (total >= 0 && total <= 3)
            {
                per = 40;
            }
            else if (total >= 4 && total <= 7)
            {
                per = 60;
            }
            else if (total >= 8 && total <= 11)
            {
                per = 80;
            }
            else if (total >= 12 && total <= 15)
            {
                per = 100;
            }
            return per;
        }

        public void SaveKnowAssEffect(string TID, string TAID)
        {
            _knowquesDal.SaveKnowAssEffect(TID, TAID);
        }


        public bool DeleteTempUser(string TempID, int p)
        {
            return _knowquesDal.DeleteTempUser(TempID, p);
        }


        public void SelectItem(TempTARelModel dto)
        {
            _knowquesDal.SelectItem(dto);
        }

        /// <summary>
        /// 生成打印模板
        /// </summary>
        /// <param name="parammodel"></param>
        /// <returns></returns>
        public KnowReportModel GetPrintReportModel(ParamModel parammodel)
        {
            try
            {
                KnowReportModel _knowReportModel = new KnowReportModel();
                EI_TempStudentInfo tempstudentModel = _tarelitemDal.GetTempStudent(parammodel.SID);
                if (tempstudentModel != null)
                {
                    _knowReportModel.Name = tempstudentModel.Name;
                    _knowReportModel.TrainAim = tempstudentModel.TrainAim.ToString();//培训目的T
                    _knowReportModel.Phone = tempstudentModel.Phone;
                    _knowReportModel.StageID = parammodel.Statge;
                    _knowReportModel.SubjectID = parammodel.SubjectId;
                    _knowReportModel.startTime = tempstudentModel.CreateTime;
                    _knowReportModel.Gender = tempstudentModel.Gender;
                    _knowReportModel.Age = tempstudentModel.Age;
                    _knowReportModel.GradeID = tempstudentModel.GradeID;
                    _knowReportModel.School = tempstudentModel.School;
                    _knowReportModel.Adddress = tempstudentModel.Adddress;
                }

                int statge = 0;
                if (parammodel.Statge == "x")
                {
                    statge = 1;
                }
                else if (parammodel.Statge == "c")
                {
                    statge = 2;
                }
                else if (parammodel.Statge == "g")
                {
                    statge = 3;
                }

                var tid = "000";
                if (tempstudentModel != null)
                {
                    tid = tempstudentModel.TID.ToString();
                }
                //获取知识点教材
                var dataMareList = _knowquesDal.GetTestAnaylzeInfo(parammodel.Taid);
                if (dataMareList != null)
                {
                    if (dataMareList.Count > 0)
                    {
                        if (dataMareList.First().Mversion == null || dataMareList.First().Mversion == "")
                        {
                            //兼容旧的版本数据
                            var data = _knowquesDal.GetManRelStaList(tid, statge, Convert.ToInt32(parammodel.SubjectId));
                            _knowReportModel.MaterialName = data == null ? "人教版" : data.First().Mversion;
                        }
                        else
                        {
                            _knowReportModel.MaterialName = dataMareList.First().Mversion;
                        }

                    }


                }
                //判断是否配置课时，如果配置测评为true,否则为false;


                #region  知识测评算法

                var ConfigList = _taconfigureDal.GetTAConfigureModelList(parammodel.Taid);
                List<KnowledgeShowModel> _knowshowList = new List<KnowledgeShowModel>();
                List<TARelKnoModel> _tarelknoList = _tarelknoDal.GetTKnoModelList(parammodel.Taid);
                var listContentModel = _tarcontentDal.GetContentModelList(parammodel.Taid);//获取修改内容
                if (_tarelknoList != null)
                {
                    if (_tarelknoList.Count > 0)
                    {
                        #region
                        foreach (var item in _tarelknoList)
                        {
                            //判断是否配置课时，如果配置测评为true,否则为false;

                            List<TARelAnswerModel> tarelansermodelList = _knowquesDal.GettarelanserList(parammodel.Taid);
                            if (tarelansermodelList != null)
                            {
                                if (tarelansermodelList.Where(x => x.KID == item.KID).ToList().Count > 0)
                                {
                                    KnowledgeShowModel _knowledgeshowModel = new KnowledgeShowModel();
                                    if (ConfigList == null)
                                    {
                                        _knowledgeshowModel.KID = item.KID;
                                        _knowledgeshowModel.KnowledgeName = item.KnowledgeName;
                                        _knowledgeshowModel.DefaultHour = item.ClassHour.ToString();
                                        int wrongCount = tarelansermodelList.Where(x => x.KID == item.KID).ToList().Where(x => x.Accuracy == 1).Count();
                                        int TotalCount = tarelansermodelList.Where(x => x.KID == item.KID).ToList().Count;
                                        int masterValue = 0;
                                        if (TotalCount > 0)
                                        {
                                            masterValue = Convert.ToInt32((float)(wrongCount * 100 / TotalCount));
                                        }
                                        _knowledgeshowModel.Level = _knowreportDal.GetKnowLevel(masterValue);
                                        double G = _knowreportDal.GetAverageG(parammodel.Taid);//感知题平均分
                                        int M = Convert.ToInt32(item.ClassHour);
                                        int T = Convert.ToInt32(tempstudentModel.TrainAim);
                                        _knowledgeshowModel.DefaultHour = item.ClassHour.ToString();
                                        _knowledgeshowModel.ClassHour = Convert.ToInt32(_knowreportDal.GetHoursCalculation(masterValue, M, G, T)).ToString();
                                        _knowledgeshowModel.KnowUnderstand = _knowreportDal.GetKnowUnderstandFive(masterValue);
                                        _knowledgeshowModel.KnowResult = _knowreportDal.GetKnowResultSix(masterValue);
                                        //修改内容
                                        _knowledgeshowModel.KnowContent = "测评结果显示你在" + _knowReportModel.MaterialName + "知识点方面" + _knowledgeshowModel.KnowUnderstand + _knowledgeshowModel.KnowResult;
                                        if (listContentModel != null)
                                        {

                                            var dataitem = listContentModel.Where(x => x.KID == item.KID).ToList();
                                            if (dataitem != null)
                                            {
                                                if (dataitem.Count != 0)
                                                {
                                                    _knowledgeshowModel.KnowContent = dataitem.First().SetContent;
                                                }

                                            }
                                        }
                                    }
                                    else
                                    {
                                        _knowledgeshowModel.KID = item.KID;
                                        _knowledgeshowModel.KnowledgeName = item.KnowledgeName;

                                        _knowledgeshowModel.Level = ConfigList.Where(x => x.KID == item.KID).ToList().First().LevelSet;

                                        //更新classHour
                                        _knowledgeshowModel.ClassHour = ConfigList.Where(x => x.KID == item.KID).ToList().First().MathClass.ToString();//取配置完知识测评的值
                                        _knowledgeshowModel.DefaultHour = ConfigList.Where(x => x.KID == item.KID).ToList().First().MathClass.ToString();
                                        int wrongCount = tarelansermodelList.Where(x => x.KID == item.KID).ToList().Where(x => x.Accuracy == 1).Count();
                                        int TotalCount = tarelansermodelList.Where(x => x.KID == item.KID).ToList().Count;
                                        int masterValue = 0;
                                        if (TotalCount > 0)
                                        {
                                            masterValue = Convert.ToInt32((float)(wrongCount * 100 / TotalCount));
                                        }
                                        double G = _knowreportDal.GetAverageG(parammodel.Taid);//感知题平均分
                                        int M = Convert.ToInt32(_knowledgeshowModel.ClassHour);
                                        int T = Convert.ToInt32(tempstudentModel.TrainAim);
                                        _tarelknoDal.UpdateClassHour(parammodel.Taid, item.KID, Convert.ToInt32(_knowledgeshowModel.ClassHour));
                                        _knowledgeshowModel.ClassHour = Convert.ToInt32(_knowreportDal.GetHoursCalculation(masterValue, M, G, T)).ToString();

                                        _knowledgeshowModel.KnowUnderstand = _knowreportDal.GetKnowUnderStandLevel(ConfigList.Where(x => x.KID == item.KID).ToList().First().LevelSet);
                                        _knowledgeshowModel.KnowResult = _knowreportDal.GetKnowResultContent(ConfigList.Where(x => x.KID == item.KID).ToList().First().LevelSet);
                                        _knowledgeshowModel.KnowContent = "测评结果显示你在" + _knowReportModel.MaterialName + "知识点方面" + _knowledgeshowModel.KnowUnderstand + _knowledgeshowModel.KnowResult;
                                        if (listContentModel != null)
                                        {
                                            var dataitem = listContentModel.Where(x => x.KID == item.KID).ToList();
                                            //判断配置和修改内容
                                            if (dataitem != null)
                                            {
                                                if (dataitem.Count > 0)
                                                {
                                                    if (dataitem.First().State == 0)
                                                    {
                                                        _knowledgeshowModel.KnowContent = dataitem.First().SetContent;
                                                    }

                                                }

                                            }
                                        }
                                    }

                                    _knowshowList.Add(_knowledgeshowModel);
                                }

                            }

                        }
                        #endregion
                        _knowReportModel.TotalHour = _knowshowList.Sum(x => Convert.ToInt32(x.ClassHour)).ToString();
                        _knowReportModel.knowledgeListModel = _knowshowList;
                    }
                }

                //判断是否配置课时，如果配置测评为true,否则为false;
                List<PerQuestionsModel> perquestionModelList = new List<PerQuestionsModel>();
                List<EI_TAnswer> datalist = _tanswerDal.GetModelList(parammodel.Taid);
                if (datalist != null)
                {
                    #region //计算观察力
                    var datalist1 = datalist.Where(x => x.ItemSource == 1).ToList();
                    int sumtotal1 = 0;
                    if (datalist1 != null)
                    {
                        foreach (var item in datalist1)
                        {
                            //根据日期判断题库的新旧
                            if (item.CreateTime < Convert.ToDateTime(_onlinetime))
                            {
                                //兼容以前
                                sumtotal1 += GetForceByItem(item.Answer);
                            }
                            else
                            {
                                //兼容现在
                                var knowdata = GetKnowList(item.ItemID.ToString()).First();
                                var postion = knowdata.AnswerList.IndexOf(item.Answer);
                                sumtotal1 += Convert.ToInt32(knowdata.ListSorce[postion].ToString());

                            }
                        }
                    }

                    //int per1 = Convert.ToInt32((sumtotal1 * 100 / (datalist1.Count * 3)));
                    int per1 = GetPerByTotal(sumtotal1);
                    PerQuestionsModel _perquestionModel = new PerQuestionsModel();

                    if (ConfigList == null)
                    {
                        _perquestionModel.Name = "观察力";
                        _perquestionModel.Level = _knowreportDal.GetLevel(per1);
                        _perquestionModel.Content = _knowreportDal.GetObserAbility(per1);
                        //加载修改内容
                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "1").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {
                                    _perquestionModel.Content = dataitem.First().SetContent;
                                }
                            }
                        }
                    }
                    else
                    {
                        _perquestionModel.Name = "观察力";
                        _perquestionModel.Level = ConfigList.Where(x => x.KID == "1").ToList().First().LevelSet;
                        _perquestionModel.Content = _knowreportDal.GetObserAbilityContent(_perquestionModel.Level);

                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "1").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {
                                    if (dataitem.First().State == 0)
                                    {
                                        _perquestionModel.Content = dataitem.First().SetContent;
                                    }

                                }
                            }
                        }
                    }

                    perquestionModelList.Add(_perquestionModel);
                    #endregion

                    #region 想象力
                    var datalist2 = datalist.Where(x => x.ItemSource == 2).ToList();
                    int sumtotal2 = 0;
                    if (datalist2 != null)
                    {
                        foreach (var item in datalist2)
                        {
                            //根据日期判断题库的新旧
                            if (item.CreateTime < Convert.ToDateTime(_onlinetime))
                            {
                                //兼容以前
                                sumtotal2 += GetForceByItem(item.Answer);
                            }
                            else
                            {
                                //兼容现在
                                var knowdata = GetKnowList(item.ItemID.ToString()).First();
                                var postion = knowdata.AnswerList.IndexOf(item.Answer);
                                sumtotal2 += Convert.ToInt32(knowdata.ListSorce[postion].ToString());

                            }
                        }
                    }
                    _perquestionModel = new PerQuestionsModel();
                    //int per2 = Convert.ToInt32(sumtotal2 * 100 / (datalist2.Count * 3));
                    int per2 = GetPerByTotal(sumtotal2);
                    if (ConfigList == null)
                    {
                        _perquestionModel.Name = "想象力";
                        _perquestionModel.Level = _knowreportDal.GetLevel(per2);
                        _perquestionModel.Content = _knowreportDal.GetImagination(per2);
                        //加载修改内容
                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "2").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {

                                    _perquestionModel.Content = dataitem.First().SetContent;
                                }
                            }
                        }
                    }
                    else
                    {
                        _perquestionModel.Name = "想象力";
                        _perquestionModel.Level = ConfigList.Where(x => x.KID == "2").ToList().First().LevelSet;
                        _perquestionModel.Content = _knowreportDal.GetImaginationContent(_perquestionModel.Level);

                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "2").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {
                                    if (dataitem.First().State == 0)
                                    {
                                        _perquestionModel.Content = dataitem.First().SetContent;
                                    }

                                }
                            }
                        }
                    }

                    perquestionModelList.Add(_perquestionModel);
                    #endregion

                    #region 意志力
                    var datalist3 = datalist.Where(x => x.ItemSource == 3).ToList();
                    int sumtotal3 = 0;
                    if (datalist3 != null)
                    {
                        foreach (var item in datalist3)
                        {
                            //根据日期判断题库的新旧
                            if (item.CreateTime < Convert.ToDateTime(_onlinetime))
                            {
                                //兼容以前
                                sumtotal3 += GetForceByItem(item.Answer);
                            }
                            else
                            {
                                //兼容现在
                                var knowdata = GetKnowList(item.ItemID.ToString()).First();
                                var postion = knowdata.AnswerList.IndexOf(item.Answer);
                                sumtotal3 += Convert.ToInt32(knowdata.ListSorce[postion].ToString());

                            }
                        }

                    }
                    //int per3 = Convert.ToInt32(sumtotal3 * 100 / (datalist3.Count * 3));
                    int per3 = GetPerByTotal(sumtotal3);
                    _perquestionModel = new PerQuestionsModel();
                    if (ConfigList == null)
                    {
                        _perquestionModel.Name = "意志力";
                        _perquestionModel.Level = _knowreportDal.GetLevel(per3);
                        _perquestionModel.Content = _knowreportDal.GetWillpower(per3);
                        //加载修改内容
                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "3").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {
                                    _perquestionModel.Content = dataitem.First().SetContent;
                                }
                            }
                        }
                    }
                    else
                    {
                        _perquestionModel.Name = "意志力";
                        _perquestionModel.Level = ConfigList.Where(x => x.KID == "3").ToList().First().LevelSet;
                        _perquestionModel.Content = _knowreportDal.GetWillpowerContent(_perquestionModel.Level);
                        if (listContentModel != null)
                        {
                            var dataitem = listContentModel.Where(x => x.KID == "3").ToList();
                            if (dataitem != null)
                            {
                                if (dataitem.Count > 0)
                                {
                                    if (dataitem.First().State == 0)
                                    {
                                        _perquestionModel.Content = dataitem.First().SetContent;
                                    }

                                }
                            }
                        }
                    }

                    perquestionModelList.Add(_perquestionModel);
                    #endregion
                }
                #endregion
                _knowReportModel.perquestionListModel = perquestionModelList;
                return _knowReportModel;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="modelList"></param>
        /// <returns></returns>
        public bool AddConfigure(List<TAConfigureModel> modelList)
        {
            try
            {
                return _taconfigureDal.Add(modelList);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return false;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="modelList"></param>
        /// <returns></returns>
        public bool UpdatConfigure(List<TAConfigureModel> modelList)
        {
            try
            {
                return _taconfigureDal.Update(modelList);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return false;
            }

        }


        /// <summary>
        /// 判断是否存在配置信息
        /// </summary>
        /// <param name="taid"></param>
        /// <returns></returns>
        public bool IsExitConfigure(string taid)
        {
            try
            {
                return _taconfigureDal.Exists(taid);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return false;
            }

        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="taid"></param>
        /// <returns></returns>
        public bool DeleteConfigure(string taid)
        {
            try
            {
                return _taconfigureDal.Delete(taid);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return false;
            }

        }


        public void GetTestExam(TestExamPageModel dto)
        {
            _knowquesDal.GetTestExam(dto);
        }

        public string DeleteTestExam(TestExamModel dto)
        {
            return _knowquesDal.DeleteTestExam(dto);
        }

        /// <summary>
        /// 修改配置结果内容
        /// </summary>
        /// <param name="contentModel"></param>
        /// <returns></returns>
        public bool UpdateTARContent(TARContentModel contentModel)
        {
            try
            {
                return _tarcontentDal.UpdateTARContent(contentModel);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return false;
            }

        }


        public List<TestExamItemModel> GePreView(TestExamModel dto)
        {
            return _knowquesDal.GePreView(dto);
        }


        public void GetSingleInfo(TestSingleBaseModel dto)
        {
            _knowquesDal.GetSingleInfo(dto);
        }


        public List<TagModel> GetTagKeepInit(TagKeepInitModel dto)
        {
            return _knowquesDal.GetTagKeepInit(dto);
        }


        public int SaveTagKeepInit(TagKeepInitModel para, TagKeepMappingModel dto)
        {
            return _knowquesDal.GetTagKeepInit(para, dto);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public bool GetManrelstaCount(string tid)
        {
            var listdata = _subrelmatdal.GetModelList(tid);
            return listdata != null ? true : false;
        }

        /// <summary>
        /// 获取感知题
        /// </summary>
        /// <returns></returns>
        public List<KnowQuesModel> GetKnowDataList(int id)
        {
            return _knowquesDal.GetKnowDataList(id);
        }


        public List<TempMeasureModel> GetMeasure(TempMeasureModelPara p)
        {
            return _knowquesDal.GetMeasure(p);
        }

        public List<TempMeasureStudentModel> GetAllMeasure(string measurID)
        {
            return _knowquesDal.GetAllMeasure(measurID);

        }
        public List<TempMeasureStudentModel> GetAllMeasureSub(string measurID)
        {
            return _knowquesDal.GetAllMeasureSub(measurID);
        }

        /// <summary>
        /// 保存学科测评报告结果
        /// </summary>
        /// <param name="taid"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public bool SaveSubReport(string taid, string sid, List<SecmainQuesModel> seamainList)
        {
            return _knowquesDal.SaveSubReport(taid, sid, seamainList);
        }

        /// <summary>
        /// 获取tempIDlist
        /// </summary>
        /// <param name="mfgid"></param>
        /// <returns></returns>
        public List<TempMeasureModel> GetFileMeasureID(string mfgid)
        {
            return _knowquesDal.GetFileMeasureID(mfgid);
        }

        public List<TempMeasureModel> GetFileMeasureID(TempMeasureModelPara p)
        {
            return _knowquesDal.GetFileMeasureID(p);
        }


        public AnswerTestModel WorkInit(string TAID)
        {
            return _knowquesDal.WorkInit(TAID);
        }


        public bool SaveKnowItem(KnowAssessmentSubModel dto)
        {
            return _knowquesDal.SaveKnowItem(dto);
        }
    }
}
