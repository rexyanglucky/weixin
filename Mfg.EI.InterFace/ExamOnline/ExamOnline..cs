/*
 * author:谢利民;
 * function:题目相关功能的接口
 * date:2015-05-02
 * updateDate:2015-05-02
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Common;
using Mfg.EI.DAL;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;

namespace Mfg.EI.InterFace
{
    /// <summary>
    /// 在线考试接口
    /// </summary>
    public class ExamOnline : IExamOnline
    {

        #region 私有变量
        private ExamDal _examDal = new ExamDal();//考试
        private ERelIDal _eRelIDal = new ERelIDal();//考试与题目
        private ERelSDal _eRelSDal = new ERelSDal();//考试与学生
        private WorkObjecDal _workobjectDal = new WorkObjecDal();//布置对象的Dal
        private EAnswerDal _eanswerDal = new EAnswerDal();
        private IQuestion _questionbank;
        private TeachDiaryDal _teachdiaryDal = new TeachDiaryDal();//教学日记

        #endregion
        public ExamOnline(IQuestion question)
        {
            _questionbank = question;
        }


        #region 添加一份考试
        /// <summary>
        /// 添加一份考试
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool Add(EI_Exam model)
        {
            return _examDal.Add(model);
        }

        /// <summary>
        /// 添加一份考试(老师考试)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddTea(EI_Exam model)
        {
            return _examDal.AddTea(model);
        }
        #endregion

        #region 获取未提交未批改的考试数量
        /// <summary>
        /// 获取未提交未批改的考试数量
        /// </summary>
        /// <param name="roleType"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public int GetEI_ERelSCount(UserTypeEnum roleType, int userID, string bGrade)
        {
            try
            {
                return _eRelSDal.GetEI_ERelSCount(roleType, userID, bGrade);
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("获取未提交未批改的考试数量失败", ex);
                return 0;
            }
        }

        #endregion

        #region 获取考试列表(老师分页)
        /// <summary>
        /// 获取考试列表(老师分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public List<ExamModel> LoadExamList(Dictionary<string, object> dic, out int count)
        {
            dic.Add("Skip", (Convert.ToInt32(dic["CurrentPage"]) - 1) * 9);//LIMIT @Skip,@Take
            dic.Add("Take", 9);
            var dataSet = _examDal.GetExamListByDic(dic);

            List<ExamModel> examList = ModelConvertHelper<ExamModel>.ConvertToModelList(dataSet.Tables[1]);

            count = Convert.ToInt32(dataSet.Tables[0].Rows[0]["Count"]);
            return examList;

        }


        /// <summary>
        /// 获取考试列表(老师考试分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public List<ExamModel> LoadTeaExamList(Dictionary<string, object> dic, out int count)
        {
            dic.Add("Skip", (Convert.ToInt32(dic["CurrentPage"]) - 1) * 10);//LIMIT @Skip,@Take
            dic.Add("Take", 10);
            var dataSet = _examDal.GetTeaExamListByDic(dic);
            List<ExamModel> examList = ModelConvertHelper<ExamModel>.ConvertToModelList(dataSet.Tables[1]);
            count = Convert.ToInt32(dataSet.Tables[0].Rows[0]["Count"]);
            return examList;

        }

        #endregion

        #region 获取考试列表(微信分页)
        /// <summary>
        /// 获取考试列表(微信分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<ExamModel> LoadExamList2Weixin(SearchObjModel searchObjModel, out int count)
        {

            if (searchObjModel.Skip != 0 && searchObjModel.Take != 0)
            {
            }
            else
            {
                searchObjModel.Skip = (searchObjModel.CurrentPage - 1) * 10;
                searchObjModel.Take = 10;
            }

            SearchObj searchObj = new SearchObj();
            searchObj.SID = searchObjModel.SID;
            searchObj.StuState = searchObjModel.StuState;
            searchObj.SubjectID = searchObjModel.SubjectID;
            searchObj.Skip = searchObjModel.Skip;
            searchObj.Take = searchObjModel.Take;

            var dataSet = _examDal.GetExamList2WeixinByDic(searchObj);
            List<ExamModel> examList = ModelConvertHelper<ExamModel>.ConvertToModelList(dataSet.Tables[1]);
            count = Convert.ToInt32(dataSet.Tables[0].Rows[0]["Count"]);
            return examList;
        }
        #endregion

        #region 获取考试列表(学生分页)
        /// <summary>
        /// 获取考试列表(学生分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public List<ExamModel> LoadExamList2Student(Dictionary<string, object> dic, out int count)
        {
            dic.Add("Skip", (Convert.ToInt32(dic["CurrentPage"]) - 1) * 9);//LIMIT @Skip,@Take
            dic.Add("Take", 9);
            var dataSet = _examDal.GetExamList2StudentByDic(dic);

            List<ExamModel> examList = ModelConvertHelper<ExamModel>.ConvertToModelList(dataSet.Tables[1]);

            count = Convert.ToInt32(dataSet.Tables[0].Rows[0]["Count"]);
            return examList;

        }

        #endregion

        #region 删除考试
        /// <summary>
        /// 删除考试
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool DeleteExam(string ID)
        {
            return _examDal.DeleteExam(ID) > 0;
        }

        /// <summary>
        /// 删除考试(老师考试 我的试卷)
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool DeleteTeaExamBook(string ID)
        {
            return _examDal.DeleteTeaExamBook(ID) > 0;
        }

        /// <summary>
        /// 删除考试(老师考试 我的布置)
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool DeleteTeaExam(string ID)
        {
            return _examDal.DeleteTeaExam(ID) > 0;
        }
        #endregion

        #region 获取考试布置
        /// <summary>
        /// 获取考试布置
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public SettedExamModel GetSettedExam(string ID)
        {
            var dataSet = _examDal.GetSetted(ID);
            SettedExamModel settedExamModel = new SettedExamModel();


            settedExamModel.Exam = ModelConvertHelper<EI_Exam>.ConvertToModel(dataSet.Tables[0]);
            settedExamModel.ERelSList = ModelConvertHelper<EI_ERelS>.ConvertToModelList(dataSet.Tables[1]);
            settedExamModel.ERelIList = ModelConvertHelper<EI_ERelI>.ConvertToModelList(dataSet.Tables[2]);

            settedExamModel.QuestionAttrList = new List<QuestionItemViewModel>();
            string ids = "";
            foreach (var item in settedExamModel.ERelIList)
            {
                ids += item.ItemID + ",";
            }
            List<Resouce.Models.Question> questionList = null;
            try
            {
                if (ids != "")
                {
                    questionList = _questionbank.FindByIdlist("0" + settedExamModel.Exam.SubjectID.ToString(), ids.Substring(0, ids.Length - 1));
                }

            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用_questionbank.FindByIdlist接口出错,参数为({0})", settedExamModel.Exam.SubjectID.ToString() + "|" + ids.Substring(0, ids.Length - 1)), ex);
                //return null;

            }
            var subjectId = 0;
            if (settedExamModel.Exam.SubjectID != null)
                subjectId = settedExamModel.Exam.SubjectID.Value;
            if (questionList != null)
            {
                foreach (var item in questionList)
                {


                    settedExamModel.QuestionAttrList.Add(new QuestionItemViewModel(item, subjectId));
                    //{
                    //    f_answer = item.f_answer,
                    //    //todo
                    //    //f_answerlist = item.f_answerlist,
                    //    //f_bclass = item.f_bclass,
                    //    f_body = item.f_body,
                    //    f_class = item.f_class,
                    //    f_detailpath = item.f_detailpath,
                    //    f_difficulty = item.f_difficulty,
                    //    f_id = item.f_id,
                    //    f_isapp = item.f_isapp,
                    //    f_mainsec = item.f_mainsec,
                    //    f_mainsec1 = item.f_mainsec1,
                    //    f_secorder = item.f_secorder,
                    //    f_secpoint = item.f_secpoint,
                    //    f_style = item.f_style,
                    //    f_ways = item.f_ways,
                    //    ItemType = item.f_qtype
                    //}
                    //);
                }
            }

            return settedExamModel;
        }


        /// <summary>
        /// 获取考试布置(老师考试)
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public SettedExamModel GetTeaSettedExam(string ID)
        {
            var dataSet = _examDal.GetTeaSetted(ID);
            SettedExamModel settedExamModel = new SettedExamModel();


            settedExamModel.Exam = ModelConvertHelper<EI_Exam>.ConvertToModel(dataSet.Tables[0]);
            settedExamModel.ERelSList = ModelConvertHelper<EI_ERelS>.ConvertToModelList(dataSet.Tables[1]);
            settedExamModel.ERelIList = ModelConvertHelper<EI_ERelI>.ConvertToModelList(dataSet.Tables[2]);

            settedExamModel.QuestionAttrList = new List<QuestionItemViewModel>();
            string ids = "";
            foreach (var item in settedExamModel.ERelIList)
            {
                ids += item.ItemID + ",";
            }
            List<Resouce.Models.Question> questionList = null;
            try
            {
                if (ids != "")
                {
                    questionList = _questionbank.FindByIdlist("0" + settedExamModel.Exam.SubjectID.ToString(), ids.Substring(0, ids.Length - 1));
                }

            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用_questionbank.FindByIdlist接口出错,参数为({0})", settedExamModel.Exam.SubjectID.ToString() + "|" + ids.Substring(0, ids.Length - 1)), ex);
                //return null;

            }

            if (questionList != null)
            {
                var subjectId = 0;
                if (settedExamModel.Exam.SubjectID != null)
                    subjectId = settedExamModel.Exam.SubjectID.Value;
                foreach (var item in questionList)
                {

                    settedExamModel.QuestionAttrList.Add(new QuestionItemViewModel(item, subjectId));
                    //{
                    //    f_answer = item.f_answer,
                    //    //todo
                    //    //f_answerlist = item.f_answerlist,
                    //    //f_bclass = item.f_bclass,
                    //    f_body = item.f_body,
                    //    f_class = item.f_class,
                    //    f_detailpath = item.f_detailpath,
                    //    f_difficulty = item.f_difficulty,
                    //    f_id = item.f_id,
                    //    f_isapp = item.f_isapp,
                    //    f_mainsec = item.f_mainsec,
                    //    f_mainsec1 = item.f_mainsec1,
                    //    f_secorder = item.f_secorder,
                    //    f_secpoint = item.f_secpoint,
                    //    f_style = item.f_style,
                    //    f_ways = item.f_ways
                    //    //ItemType = item.ItemType
                    //}
                    //);
                }
            }

            return settedExamModel;
        }

        #endregion

        #region 获取考试试题
        /// <summary>
        /// 获取考试试题
        /// </summary>
        /// <param name="ID">考试ID</param>
        /// <param name="SID">学生ID</param>
        /// <returns></returns>
        public SettedExamModel GetExamItem(string ID, string SID)
        {
            var dataSet = _examDal.GetExamItem(ID, SID);
            SettedExamModel settedExamModel = new SettedExamModel();

            settedExamModel.ERelIList = ModelConvertHelper<EI_ERelI>.ConvertToModelList(dataSet.Tables[0]);

            settedExamModel.QuestionAttrList = new List<QuestionItemViewModel>();
            string ids = "";
            foreach (var item in settedExamModel.ERelIList)
            {
                ids += item.ItemID + ",";
            }
            List<Resouce.Models.Question> questionList = null;
            try
            {
                if (ids != "")
                {
                    questionList = _questionbank.FindByIdlist("0" + settedExamModel.ERelIList[0].SubjectID, ids.TrimEnd(','));
                }

            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用_questionbank.FindByIdlist接口出错,参数为({0})", settedExamModel.ERelIList[0].SubjectID + "|" + ids.Substring(0, ids.Length - 1)), ex);
                //return null;

            }
            if (questionList != null)
            {

                foreach (var item in questionList)
                {

                    settedExamModel.QuestionAttrList.Add(new QuestionItemViewModel(item, settedExamModel.ERelIList[0].SubjectID));
                    //{
                    //    f_answer = item.f_answer,
                    //    //todo
                    //    //f_answerlist = item.f_answerlist,
                    //    //f_bclass = item.f_bclass,
                    //    f_body = item.f_body,
                    //    f_class = item.f_class,
                    //    f_detailpath = item.f_detailpath,
                    //    f_difficulty = item.f_difficulty,
                    //    f_id = item.f_id,
                    //    f_isapp = item.f_isapp,
                    //    f_mainsec = item.f_mainsec,
                    //    f_mainsec1 = item.f_mainsec1,
                    //    f_secorder = item.f_secorder,
                    //    f_secpoint = item.f_secpoint,
                    //    f_style = item.f_style,
                    //    f_ways = item.f_ways
                    //    //ItemType = item.ItemType
                    //}
                    //);
                }
            }

            return settedExamModel;

        }



        /// <summary>
        /// 获取考试试题(老师考试)
        /// </summary>
        /// <param name="ID">考试ID</param>
        /// <param name="SID">学生ID</param>
        /// <returns></returns>
        public SettedExamModel GetTeaExamItem(string ID, string TID)
        {
            var dataSet = _examDal.GetTeaExamItem(ID, TID);
            SettedExamModel settedExamModel = new SettedExamModel();

            settedExamModel.ERelIList = ModelConvertHelper<EI_ERelI>.ConvertToModelList(dataSet.Tables[0]);

            settedExamModel.QuestionAttrList = new List<QuestionItemViewModel>();
            string ids = "";
            foreach (var item in settedExamModel.ERelIList)
            {
                ids += item.ItemID + ",";
            }
            List<Resouce.Models.Question> questionList = null;
            try
            {
                if (ids != "")
                {
                    questionList = _questionbank.FindByIdlist("0" + settedExamModel.ERelIList[0].SubjectID, ids.TrimEnd(','));
                }

            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用_questionbank.FindByIdlist接口出错,参数为({0})", settedExamModel.ERelIList[0].SubjectID + "|" + ids.Substring(0, ids.Length - 1)), ex);
                //return null;

            }
            if (questionList != null)
            {

                foreach (var item in questionList)
                {

                    settedExamModel.QuestionAttrList.Add(new QuestionItemViewModel(item, settedExamModel.ERelIList[0].SubjectID));
                    //{
                    //    f_answer = item.f_answer,
                    //    //todo
                    //    //f_answerlist = item.f_answerlist,
                    //    //f_bclass = item.f_bclass,
                    //    f_body = item.f_body,
                    //    f_class = item.f_class,
                    //    f_detailpath = item.f_detailpath,
                    //    f_difficulty = item.f_difficulty,
                    //    f_id = item.f_id,
                    //    f_isapp = item.f_isapp,
                    //    f_mainsec = item.f_mainsec,
                    //    f_mainsec1 = item.f_mainsec1,
                    //    f_secorder = item.f_secorder,
                    //    f_secpoint = item.f_secpoint,
                    //    f_style = item.f_style,
                    //    f_ways = item.f_ways
                    //    //ItemType = item.ItemType
                    //}
                    //);
                }
            }

            return settedExamModel;

        }

        #endregion

        #region 批量添加答案(初始化答案)
        /// <summary>
        /// 批量添加答案(初始化答案)
        /// </summary>
        /// <param name="eID"></param>
        /// <param name="sID"></param>
        /// <param name="settedModel"></param>
        /// <returns></returns>
        public bool BatchAddAnswer(string eID, string sID, SettedExamModel settedModel)
        {

            bool isExists = _eanswerDal.Exists(eID, sID);
            if (!isExists)
            {
                List<string> itemIDList = settedModel.ERelIList.Select(m => m.ItemID.ToString()).ToList();
                return _eanswerDal.BatchAdd(eID, sID, itemIDList);
            }
            return true;
        }


        /// <summary>
        /// 批量添加答案(初始化答案 老师考试)
        /// </summary>
        /// <param name="eID"></param>
        /// <param name="tID"></param>
        /// <param name="settedModel"></param>
        /// <returns></returns>
        public bool BatchAddTeaAnswer(string eID, string tID, SettedExamModel settedModel)
        {

            bool isExists = _eanswerDal.ExistsTea(eID, tID);
            if (!isExists)
            {
                List<string> itemIDList = settedModel.ERelIList.Select(m => m.ItemID.ToString()).ToList();
                return _eanswerDal.BatchAddTea(eID, tID, itemIDList);
            }
            return true;
        }
        #endregion

        #region 提交答案
        /// <summary>
        /// 提交答案
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool SubmitAnswer(EAnswerModel model)
        {
            EI_EAnswer eAnswer = new EI_EAnswer()
            {
                ID = Guid.NewGuid().ToString(),
                SID = model.SID,
                EID = model.EID,
                ItemID = model.ItemID,
                Answer = model.Answer,
                Score = 0,//分数
                AnswerTime = model.AnswerTime,
                Review = model.Review,//老师评语
                NoteContent = model.NoteContent,//笔记
                Accuracy = 0,//正确率
                CreateTime = DateTime.Now,//创建时间
                DelFlag = 0,
                Remark = model.Remark,//备注
                IsTextAnswer = model.IsTextAnswer ? 1 : 0//答案是否是文本，1 文本，0 图片

            };
            return _eanswerDal.SubmitAnswer(eAnswer);
        }


        /// <summary>
        /// 提交答案(老师考试)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool SubmitTeaAnswer(EAnswerModel model)
        {
            EI_EAnswer eAnswer = new EI_EAnswer()
            {
                ID = Guid.NewGuid().ToString(),
                //SID = model.SID,
                TID = model.TID,
                EID = model.EID,
                ItemID = model.ItemID,
                Answer = model.Answer,
                Score = 0,//分数
                AnswerTime = model.AnswerTime,
                Review = model.Review,//老师评语
                NoteContent = model.NoteContent,//笔记
                Accuracy = 0,//正确率
                CreateTime = DateTime.Now,//创建时间
                DelFlag = 0,
                Remark = model.Remark,//备注
                IsTextAnswer = model.IsTextAnswer ? 1 : 0//答案是否是文本，1 文本，0 图片

            };
            return _eanswerDal.SubmitTeaAnswer(eAnswer);
        }
        #endregion

        #region 提交试卷
        /// <summary>
        /// 提交试卷
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool SubmitExam(ERelSModel model)
        {
            EI_ERelS ei_ERelS = new EI_ERelS()
            {
                EID = model.EID,
                SID = model.SID,
                StuState = 1,
                SumeTime = model.SumeTime
            };
            var dataSet = _examDal.GetExamItem(ei_ERelS.EID, ei_ERelS.SID);
            List<EI_ERelI> ei_ERelIList = ModelConvertHelper<EI_ERelI>.ConvertToModelList(dataSet.Tables[0]).Where(m => m.ItemType <= 100).OrderBy(o => o.ItemID).ToList();//只取选择题

            //string itemIDs = string.Join(",", ei_ERelIList.Select(m => m.ItemID).ToList());
            //List<string> sanswer = ei_ERelIList.Select(m => m.Answer).ToList();

            string itemIDs = "";
            List<string> sanswerList = new List<string>();
            foreach (var item in ei_ERelIList)
            {
                itemIDs += item.ItemID + ",";
                sanswerList.Add(item.Answer ?? "");
            }

            Dictionary<string, double> dic = null;

            if (!string.IsNullOrEmpty(itemIDs))
            {
                dic = _questionbank.QuesCorrect("0" + ei_ERelIList[0].SubjectID, itemIDs.TrimEnd(','), sanswerList);
            }

            return _eRelSDal.UpdateStuState(ei_ERelS, dic, ei_ERelIList);

        }


        /// <summary>
        /// 提交试卷(老师考试)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool SubmitTeaExam(ERelSModel model)
        {
            EI_ERelS ei_ERelS = new EI_ERelS()
            {
                EID = model.EID,
                TID = model.TID,
                StuState = 1,
                SumeTime = model.SumeTime
            };
            var dataSet = _examDal.GetTeaExamItem(ei_ERelS.EID, ei_ERelS.TID);
            List<EI_ERelI> ei_ERelIList = ModelConvertHelper<EI_ERelI>.ConvertToModelList(dataSet.Tables[0]).Where(m => m.ItemType <= 100).OrderBy(o => o.ItemID).ToList();//只取选择题

            string itemIDs = "";
            List<string> sanswerList = new List<string>();
            foreach (var item in ei_ERelIList)
            {
                itemIDs += item.ItemID + ",";
                sanswerList.Add(item.Answer ?? "");
            }

            Dictionary<string, double> dic = null;

            if (!string.IsNullOrEmpty(itemIDs))
            {
                dic = _questionbank.QuesCorrect("0" + ei_ERelIList[0].SubjectID, itemIDs.TrimEnd(','), sanswerList);
            }

            return _eRelSDal.UpdateTeaStuState(ei_ERelS, dic, ei_ERelIList);

        }
        #endregion

        #region 在线考试分析
        /// <summary>
        /// 获取学生回答情况 掌握分析
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentExamModel> GetStudentByExamID(string examId, string sid = "")
        {
            List<StudentExamModel> modelList = new List<StudentExamModel>();
            var ds = _examDal.GetStudentByExamID(examId);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentExamItemModel>.ConvertToModelList(ds.Tables[1]);
            foreach (var model in stuInfo)
            {
                StudentExamModel smodel = new StudentExamModel { ExamID = examId, Student = model };
                var items = itemInfo.Where(i => i.ExamId == examId && i.SID == model.MfgID).ToList();

                if (items.Count > 0)
                {
                    smodel.SubjectID = items[0].SubjectID;
                    smodel.Items = items;
                    //计算当前学生的总分
                    var totalScore = 0f;
                    var totalTime = 0;
                    smodel.ExamName = items[0].ExamName;
                    smodel.StuState = items[0].StuState;
                    smodel.TeacherTotalComment = items[0].TeacherTotalComment;
                    items.ForEach(m =>
                    {
                        totalScore += m.Score;
                        totalTime += (string.IsNullOrEmpty(m.AnswerTime) ? 0 : Convert.ToInt32(m.AnswerTime));
                    });
                    //smodel.TotalScore = totalScore;
                    smodel.TotalScore = (int)Math.Round(totalScore * 100) / 100f;
                    smodel.TotalTime = model.SumeTime == 0 ? totalTime : model.SumeTime;
                    modelList.Add(smodel);
                }
            }
            //计算学生排名
            var k = 0;
            var preScore = 1000f;
            modelList.OrderByDescending(m => m.TotalScore)
                .ThenByDescending(m => m.Student.Name)
                .ToList().ForEach(item =>
                {
                    if (preScore > item.TotalScore)
                    {
                        preScore = item.TotalScore;
                        k++;
                    }
                    item.Ranking = k;
                });
            //筛选指定学生
            if (!string.IsNullOrEmpty(sid))
            {
                modelList = modelList.Where(m => m.Student.MfgID == sid).ToList();
            }

            return modelList.OrderByDescending(m => m.TotalScore).ThenByDescending(m => m.Student.Name).ToList();
        }

        /// <summary>
        /// 获取学生回答情况 批改试卷
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        private List<StudentExamModel> GetStudentByExamID(string examId, ref List<StudentModel> students, string sid = "")
        {
            List<StudentExamModel> modelList = new List<StudentExamModel>();
            var ds = _examDal.GetStudentByExamID(examId);
            //该作业的布置对象
            students = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentExamItemModel>.ConvertToModelList(ds.Tables[1]);

            foreach (var model in students)
            {
                StudentExamModel smodel = new StudentExamModel { ExamID = examId, Student = model };
                var items = itemInfo.Where(i => i.ExamId == examId && i.SID == model.MfgID).ToList();
                if (items.Count > 0)
                {
                    smodel.SubjectID = items[0].SubjectID;
                    smodel.Items = items;
                    //计算当前学生的总分
                    var totalScore = 0f;
                    var totalTime = 0;
                    smodel.ExamName = items[0].ExamName;
                    smodel.StuState = items[0].StuState;
                    items.ForEach(m =>
                    {
                        totalScore += m.Score;
                        totalTime += (string.IsNullOrEmpty(m.AnswerTime) ? 0 : Convert.ToInt32(m.AnswerTime));
                    });
                    //smodel.TotalScore = totalScore;
                    smodel.TotalScore = (int)Math.Round(totalScore * 100) / 100f;
                    smodel.TotalTime = totalTime;
                    modelList.Add(smodel);
                }
            }
            //计算学生排名
            var k = 1;
            modelList.OrderByDescending(m => m.TotalScore).ToList().ForEach(item => { item.Ranking = k; k++; });
            //筛选指定学生
            if (!string.IsNullOrEmpty(sid))
            {
                modelList = modelList.Where(m => m.Student.MfgID == sid).ToList();
            }

            return modelList;
        }
        /// <summary>
        /// 获取掌握分析
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentExamModel> GetKnowledgeListByExamID(string examId, string sid = "")
        {

            List<StudentExamModel> modelList = new List<StudentExamModel>();
            var ds = _examDal.GetStudentByExamID(examId);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            //获取作业的题目信息
            //var itemInfo = ModelConvertHelper<StudentExamItemModel>.ConvertToModelList(ds.Tables[1]);
            //获取题目对应的知识点
            var knowInfo = ModelConvertHelper<KnowledgeStudentModel>.ConvertToModelList(ds.Tables[2]);

            //获取知识点信息
            var knowledgePointList = knowInfo.GroupBy(k => k.PointID).Select
                   (g => new KnowledgePointModel
                   {
                       PointID = g.Key,
                       PointName = g.Max(item => item.PointName),
                       //最高分
                       TopScore = g.Max(item => item.ActuScore),
                       //最高掌握率
                       TopRate = g.Max(item => item.FullScore) <= 0 ? 0 : (g.Max(item => item.ActuScore) / g.Max(item => item.FullScore)),
                       //平均掌握率
                       AverageRate = g.Sum(item => item.FullScore) <= 0 ? 0 : (g.Sum(item => item.ActuScore) / g.Sum(item => item.FullScore)),
                       //总分
                       TotalFullScore = g.Sum(item => item.FullScore),
                       //实际总得分
                       TotalActuScore = g.Sum(item => item.ActuScore),
                       ExamID = examId

                   }).ToList();
            if (string.IsNullOrEmpty(sid))
            {
                StudentExamModel smodel = new StudentExamModel { ExamID = examId, KnowledgeList = knowledgePointList };
                modelList.Add(smodel);
            }
            else
            {
                StudentExamModel smodel = new StudentExamModel { ExamID = examId, KnowledgeList = knowledgePointList };
                var myKnow = knowInfo.Where(i => i.ExamID == examId && i.SID == sid).ToList();
                myKnow.ForEach(m => { m.MyRate = m.FullScore <= 0 ? 0 : (m.ActuScore / m.FullScore); });
                smodel.KnowledgeStudentList = myKnow;
                modelList.Add(smodel);

            }
            ////获取当前学生的得分情况
            //foreach (var model in stuInfo)
            //{
            //    StudentExamModel smodel = new StudentExamModel { ExamID = examId, Student = model, KnowledgeList = knowledgePointList };
            //    var myKnow = knowInfo.Where(i => i.ExamID == examId && i.SID == model.MfgID).ToList();
            //    myKnow.ForEach(m => { m.MyRate = m.FullScore <= 0 ? 0 : (m.ActuScore / m.FullScore); });
            //    smodel.KnowledgeStudentList = myKnow;
            //    modelList.Add(smodel);
            //}
            ////筛选指定学生
            //if (!string.IsNullOrEmpty(sid))
            //{
            //    modelList = modelList.Where(m => m.Student.MfgID == sid).ToList();
            //}
            return modelList;

        }

        /// <summary>
        /// 获取学生回答表详细信息
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentExamModel> GetExamAnswerDetialByExamID(string examId, string sid = "")
        {
            var models = GetStudentByExamID(examId, sid);
            if (models == null)
            {
                return null;
            }
            if (models.Count == 0)
            {
                return null;
            }

            var subjectID = "0" + models[0].SubjectID;

            var itemlist = new StringBuilder(); models[0].Items.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
            itemlist.ToString().TrimEnd(',');

            //通过接口获取题干，解析信息
            var questionList = _questionbank.FindByIdlist(subjectID, itemlist.ToString().TrimEnd(','));

            Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, models[0].SubjectID);

            var items = models[0].Items;
            foreach (var item in items)
            {
                var question = questionList.Where(m => m.f_id == item.ItemID).FirstOrDefault();
                item.AvgAccuracy = models.Sum(m => m.Items.FirstOrDefault(t => t.ItemID == item.ItemID).Accuracy) / models.Count;
                var qViewMode = new QuestionItemViewModel(question, models[0].SubjectID);
                item.ItemName = qViewMode.GetItemBodyHtml();
                item.ItemAnaly = qViewMode.f_ways;
                item.ItemTypeName = qViewMode.f_styleName;
                item.ItemType = _r(qViewMode.f_style);
                item.ItemStyle = qViewMode.f_style;
                item.RightAnswer = qViewMode.f_answer;
                item.OrderByIndex = qViewMode.OrderByIndex;
                var itemText = HtmlHelper.StripTags(item.ItemName).Replace("@", "").Replace("\t", "").Replace("\n", "");
                item.ItemText = itemText.Length > 40 ? itemText.Substring(0, 37) + "..." : itemText;
            }

            //小题型
            int styleIndex = 0;
            var styleList = items.GroupBy(m => new { m.ItemStyle, m.ItemTypeName, m.OrderByIndex })
                .OrderBy(f => f.Key.OrderByIndex)
                .Select(
                    g =>
                        new ItemStyleModel
                        {
                            ItemStyle = g.Key.ItemStyle,
                            Count = g.Count(),
                            ItemTypeName = g.Key.ItemTypeName
                        })
                .ToList();
            styleList.ForEach(n =>
            {
                n.Index = ++styleIndex;
                n.IndexZw = StringHelper.WholeNumberToChinese(n.Index);
            });

            //排序取题目顺序
            foreach (var key in styleList)
            {
                int index = 0;
                items.Where(m => m.ItemStyle == key.ItemStyle)
                    .ToList()
                    .OrderBy(j => j.SequenceID)
                    .ToList()
                    .ForEach(n => n.SequenceID = ++index);
            }
            models[0].StyleList = styleList;
            return models.Take(1).ToList();
        }

        public List<StudentExamModel> GetExamAnswerDetialByExamID(string examId, ref List<StudentModel> students, string sid = "")
        {
            var models = GetStudentByExamID(examId, ref students, sid);
            if (models == null)
            {
                return null;
            }
            if (models.Count == 0)
            {
                return null;
            }

            var subjectID = "0" + models[0].SubjectID;

            var itemlist = new StringBuilder(); models[0].Items.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
            itemlist.ToString().TrimEnd(',');

            //通过接口获取题干，解析信息
            var questionList = _questionbank.FindByIdlist(subjectID, itemlist.ToString().TrimEnd(','));

            Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, models[0].SubjectID);
            foreach (var model in models)
            {
                var items = model.Items;
                foreach (var item in items)
                {
                    var question = questionList.Where(m => m.f_id == item.ItemID).FirstOrDefault();
                    item.AvgAccuracy = models.Sum(m => m.Items.FirstOrDefault(t => t.ItemID == item.ItemID).Accuracy) / models.Count;
                    var qViewModel = new QuestionItemViewModel(question, models[0].SubjectID);
                    item.ItemName = qViewModel.GetItemBodyHtml();
                    item.ItemAnaly = qViewModel.f_ways;
                    item.ItemTypeName = qViewModel.f_styleName;
                    item.ItemType = _r(qViewModel.f_style);

                    item.RightAnswer = qViewModel.f_answer;
                    var itemText = HtmlHelper.StripTags(item.ItemName).Replace("@", "").Replace("\t", "").Replace("\n", "");
                    item.ItemText = itemText.Length > 40 ? itemText.Substring(0, 37) + "..." : itemText;
                }
            }

            return models;
        }
        #region 微信调用
        /// <summary>
        /// 微信调用，获取考试题目信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public StudentExamModel GetJobDetialByJobID(string examId, string sid)
        {

            var ds = _examDal.GetStudentByExamID(examId, sid);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            var stumodel = stuInfo.Where(m => m.MfgID.Equals(sid)).FirstOrDefault();

            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentExamItemModel>.ConvertToModelList(ds.Tables[3]);
            if (itemInfo == null)
            {
                return null;
            }
            if (itemInfo.Count == 0)
            {
                return null;
            }
            StudentExamModel examModel = new StudentExamModel { ExamID = examId, Student = stumodel, SubjectID = itemInfo[0].SubjectID };


            var subjectID = "0" + examModel.SubjectID;

            var itemlist = new StringBuilder();
            itemInfo.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
            //通过接口获取题干，解析信息
            var questionList = _questionbank.FindByIdlist(subjectID, itemlist.ToString().TrimEnd(','));

            //Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, examModel.SubjectID);
            foreach (var item in itemInfo)
            {
                var question = questionList.Where(m => m.f_id == item.ItemID).FirstOrDefault();
                var qViewModel = new QuestionItemViewModel(question, examModel.SubjectID);
                item.ItemName = qViewModel.GetItemBodyHtml();
                item.ItemAnaly = qViewModel.f_ways;
                item.RightAnswer = qViewModel.f_answer;
            }
            examModel.Items = itemInfo;
            return examModel;
        }
        /// <summary>
        /// 微信调用，获取学生回答详细信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public StudentExamModel GetAnswerDetialByJobID(string jobId, string sid)
        {
            var ds = _examDal.GetStudentByExamID(jobId, sid);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            var stumodel = stuInfo.Where(m => m.MfgID.Equals(sid)).FirstOrDefault();
            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentExamItemModel>.ConvertToModelList(ds.Tables[1]);
            if (itemInfo == null)
            {
                return null;
            }
            if (itemInfo.Count == 0)
            {
                return null;
            }
            StudentExamModel examModel = new StudentExamModel { ExamID = jobId, Student = stumodel, SubjectID = itemInfo[0].SubjectID };

            var subjectID = "0" + examModel.SubjectID;

            var itemlist = new StringBuilder();
            itemInfo.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
            //通过接口获取题干，解析信息
            var questionList = _questionbank.FindByIdlist(subjectID, itemlist.ToString().TrimEnd(','));

            Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, examModel.SubjectID);

            foreach (var item in itemInfo)
            {
                var question = questionList.FirstOrDefault(m => m.f_id == item.ItemID);
                var qViewMode = new QuestionItemViewModel(question, examModel.SubjectID);
                item.ItemName = qViewMode.GetItemBodyHtml();
                item.ItemAnaly = qViewMode.f_ways;
                item.RightAnswer = qViewMode.f_answer;
                item.ItemType = _r(qViewMode.f_style);
            }
            examModel.Items = itemInfo;
            return examModel;
        }
        #endregion
        #endregion

        #region 在线考试分析 教学基本功
        /// <summary>
        /// 获取学生回答情况 试卷分析
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentExamModel> TeaGetStudentByExamID(string examId, string sid = "")
        {
            List<StudentExamModel> modelList = new List<StudentExamModel>();
            var ds = _examDal.TeaGetStudentByExamID(examId);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentExamItemModel>.ConvertToModelList(ds.Tables[1]);
            var itemTypeCountList = itemInfo.GroupBy(m => m.ItemType).Select(g => g.Key).ToList();
            //foreach (var key in itemTypeCountList)
            //{
            //    int index = 0;
            //    itemInfo.Where(m => m.ItemType == key)
            //        .ToList()
            //        .OrderBy(j => j.SequenceID)
            //        .ToList()
            //        .ForEach(n => n.SequenceID = ++index);
            //}
            foreach (var model in stuInfo)
            {
                StudentExamModel smodel = new StudentExamModel { ExamID = examId, Student = model };
                var items = itemInfo.Where(i => i.ExamId == examId && i.SID == model.MfgID).ToList();
                //排序取题目顺序
                foreach (var key in itemTypeCountList)
                {
                    int index = 0;
                    items.Where(m => m.ItemType == key)
                        .ToList()
                        .OrderBy(j => j.SequenceID)
                        .ToList()
                        .ForEach(n => n.SequenceID = ++index);
                }
                if (items.Count > 0)
                {
                    smodel.SubjectID = items[0].SubjectID;
                    smodel.Items = items;
                    //计算当前学生的总分
                    var totalScore = 0f;
                    var totalTime = 0;
                    smodel.ExamName = items[0].ExamName;
                    smodel.StuState = items[0].StuState;
                    smodel.TeacherTotalComment = items[0].TeacherTotalComment;
                    items.ForEach(m =>
                    {
                        totalScore += m.Score;
                        totalTime += (string.IsNullOrEmpty(m.AnswerTime) ? 0 : Convert.ToInt32(m.AnswerTime));
                    });
                    //smodel.TotalScore = totalScore;
                    smodel.TotalScore = (int)Math.Round(totalScore * 100) / 100f;
                    smodel.TotalTime = model.SumeTime == 0 ? totalTime : model.SumeTime;
                    modelList.Add(smodel);
                }
            }
            //计算学生排名
            var k = 0;
            var preScore = 1000f;
            modelList.OrderByDescending(m => m.TotalScore)
                .ThenByDescending(m => m.Student.Name)
                .ToList().ForEach(item =>
                {
                    if (preScore > item.TotalScore)
                    {
                        preScore = item.TotalScore;
                        k++;
                    }
                    item.Ranking = k;
                });
            //筛选指定学生
            if (!string.IsNullOrEmpty(sid))
            {
                modelList = modelList.Where(m => m.Student.MfgID == sid).ToList();
            }
            return modelList.OrderByDescending(m => m.TotalScore).ThenByDescending(m => m.Student.Name).ToList();
            //return modelList;
        }

        /// <summary>
        /// 获取学生回答情况 试卷批改
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentExamModel> TeaGetStudentByExamID(string examId, ref List<StudentModel> students, string sid = "")
        {
            List<StudentExamModel> modelList = new List<StudentExamModel>();
            var ds = _examDal.TeaGetStudentByExamID(examId);
            //该作业的布置对象

            students = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentExamItemModel>.ConvertToModelList(ds.Tables[1]);
            foreach (var model in students)
            {
                StudentExamModel smodel = new StudentExamModel { ExamID = examId, Student = model };
                var items = itemInfo.Where(i => i.ExamId == examId && i.SID == model.MfgID).ToList();
                if (items.Count > 0)
                {
                    smodel.SubjectID = items[0].SubjectID;
                    smodel.Items = items;
                    //计算当前学生的总分
                    var totalScore = 0f;
                    var totalTime = 0;
                    smodel.ExamName = items[0].ExamName;
                    smodel.StuState = items[0].StuState;
                    items.ForEach(m =>
                    {
                        totalScore += m.Score;
                        totalTime += (string.IsNullOrEmpty(m.AnswerTime) ? 0 : Convert.ToInt32(m.AnswerTime));
                    });
                    //smodel.TotalScore = totalScore;
                    smodel.TotalScore = (int)Math.Round(totalScore * 100) / 100f;
                    smodel.TotalTime = totalTime;
                    modelList.Add(smodel);
                }
            }

            //筛选指定学生
            if (!string.IsNullOrEmpty(sid))
            {
                modelList = modelList.Where(m => m.Student.MfgID == sid).ToList();
            }

            return modelList;
        }
        /// <summary>
        /// 获取掌握分析
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentExamModel> TeaGetKnowledgeListByExamID(string examId, string sid = "")
        {

            List<StudentExamModel> modelList = new List<StudentExamModel>();
            var ds = _examDal.GetStudentByExamID(examId);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            //获取作业的题目信息
            //var itemInfo = ModelConvertHelper<StudentExamItemModel>.ConvertToModelList(ds.Tables[1]);
            //获取题目对应的知识点
            var knowInfo = ModelConvertHelper<KnowledgeStudentModel>.ConvertToModelList(ds.Tables[2]);

            //获取知识点信息
            var knowledgePointList = knowInfo.GroupBy(k => k.PointID).Select
                   (g => new KnowledgePointModel
                   {
                       PointID = g.Key,
                       PointName = g.Max(item => item.PointName),
                       //最高分
                       TopScore = g.Max(item => item.ActuScore),
                       //最高掌握率
                       TopRate = g.Max(item => item.FullScore) <= 0 ? 0 : (g.Max(item => item.ActuScore) / g.Max(item => item.FullScore)),
                       //平均掌握率
                       AverageRate = g.Sum(item => item.FullScore) <= 0 ? 0 : (g.Sum(item => item.ActuScore) / g.Sum(item => item.FullScore)),
                       //总分
                       TotalFullScore = g.Sum(item => item.FullScore),
                       //实际总得分
                       TotalActuScore = g.Sum(item => item.ActuScore),
                       ExamID = examId

                   }).ToList();

            //获取当前学生的得分情况
            foreach (var model in stuInfo)
            {
                StudentExamModel smodel = new StudentExamModel { ExamID = examId, Student = model, KnowledgeList = knowledgePointList };
                var myKnow = knowInfo.Where(i => i.ExamID == examId && i.SID == model.MfgID).ToList();
                myKnow.ForEach(m => { m.MyRate = m.FullScore <= 0 ? 0 : (m.ActuScore / m.FullScore); });
                smodel.KnowledgeStudentList = myKnow;
                modelList.Add(smodel);
            }
            //筛选指定学生
            if (!string.IsNullOrEmpty(sid))
            {
                modelList = modelList.Where(m => m.Student.MfgID == sid).ToList();
            }
            return modelList;

        }

        /// <summary>
        /// 获取学生回答表详细信息
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentExamModel> TeaGetExamAnswerDetialByExamID(string examId, string sid = "")
        {
            var models = TeaGetStudentByExamID(examId, sid);
            if (models == null)
            {
                return null;
            }
            if (models.Count == 0)
            {
                return null;
            }

            var subjectID = "0" + models[0].SubjectID;

            var itemlist = new StringBuilder(); models[0].Items.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
            itemlist.ToString().TrimEnd(',');

            //通过接口获取题干，解析信息
            var questionList = _questionbank.FindByIdlist(subjectID, itemlist.ToString().TrimEnd(','));

            Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, models[0].SubjectID);
            var items = models[0].Items;
            foreach (var item in items)
            {
                var question = questionList.FirstOrDefault(m => m.f_id == item.ItemID);
                item.AvgAccuracy = models.Sum(m => m.Items.FirstOrDefault(t => t.ItemID == item.ItemID).Accuracy) / models.Count;
                var qViewMode = new QuestionItemViewModel(question, models[0].SubjectID);
                item.ItemName = qViewMode.GetItemBodyHtml();
                item.ItemAnaly = qViewMode.f_ways;
                item.ItemTypeName = qViewMode.f_styleName;
                item.ItemType = _r(qViewMode.f_style);
                item.ItemStyle = qViewMode.f_style;
                item.RightAnswer = qViewMode.f_answer;
                var itemText = HtmlHelper.StripTags(item.ItemName).Replace("@", "").Replace("\t", "").Replace("\n", "");
                item.ItemText = itemText.Length > 40 ? itemText.Substring(0, 37) + "..." : itemText;
            }


            //小题型
            int styleIndex = 0;
            var styleList = items.GroupBy(m => new { m.ItemStyle, m.ItemTypeName, m.OrderByIndex })
                .OrderBy(f => f.Key.OrderByIndex)
                .Select(
                    g =>
                        new ItemStyleModel
                        {
                            ItemStyle = g.Key.ItemStyle,
                            Count = g.Count(),
                            ItemTypeName = g.Key.ItemTypeName
                        })
                .ToList();
            styleList.ForEach(n =>
            {
                n.Index = ++styleIndex;
                n.IndexZw = StringHelper.WholeNumberToChinese(n.Index);
            });

            //排序取题目顺序
            foreach (var key in styleList)
            {
                int index = 0;
                items.Where(m => m.ItemStyle == key.ItemStyle)
                    .ToList()
                    .OrderBy(j => j.SequenceID)
                    .ToList()
                    .ForEach(n => n.SequenceID = ++index);
            }
            models[0].StyleList = styleList;

            return models.Take(1).ToList();
        }

        public List<StudentExamModel> TeaGetExamAnswerDetialByExamID(string examId, ref List<StudentModel> students, string sid = "")
        {
            var models = TeaGetStudentByExamID(examId, ref students, sid);
            if (models == null)
            {
                return null;
            }
            if (models.Count == 0)
            {
                return null;
            }

            var subjectID = "0" + models[0].SubjectID;

            var itemlist = new StringBuilder(); models[0].Items.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
            itemlist.ToString().TrimEnd(',');

            //通过接口获取题干，解析信息
            var questionList = _questionbank.FindByIdlist(subjectID, itemlist.ToString().TrimEnd(','));

            Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, models[0].SubjectID);
            foreach (var model in models)
            {
                var items = model.Items;
                foreach (var item in items)
                {
                    var question = questionList.FirstOrDefault(m => m.f_id == item.ItemID);
                    item.AvgAccuracy = models.Sum(m => m.Items.FirstOrDefault(t => t.ItemID == item.ItemID).Accuracy) / models.Count;
                    var qViewModel = new QuestionItemViewModel(question, models[0].SubjectID);
                    item.ItemName = qViewModel.GetItemBodyHtml();
                    item.ItemAnaly = qViewModel.f_ways;
                    item.ItemTypeName = qViewModel.f_styleName;
                    item.ItemType = _r(qViewModel.f_style);

                    item.RightAnswer = qViewModel.f_answer;
                    var itemText = HtmlHelper.StripTags(item.ItemName).Replace("@", "").Replace("\t", "").Replace("\n", "");
                    item.ItemText = itemText.Length > 40 ? itemText.Substring(0, 37) + "..." : itemText;

                }
            }

            return models;
        }

        #endregion

        #region 批改在线考试

        /// <summary>
        /// 批改在线考试
        /// </summary>
        /// <param name="comments"></param>
        /// <returns></returns>
        public bool CommnetJob(List<StudentExamItemModel> comments, string tid, string tname)
        {
            var studentJobItemModel = comments.FirstOrDefault();
            var stageId = "1";
            var gradeId = 1;
            //获取学生信息
            if (studentJobItemModel != null)
            {
                var sid = studentJobItemModel.SID;
                var stuModel = new Student().GetStudentInfoModel(sid);

                if (stuModel != null && stuModel.GradeID != null)
                {
                    gradeId = stuModel.GradeID.Value;
                    stageId = stuModel.StageId;
                }
            }
            List<EI_EAnswer> janswer = comments.Select(m => new EI_EAnswer
            {
                ID = m.ID,
                SubjectID = m.SubjectID,
                Accuracy = m.Accuracy,
                Review = m.TeacherComment,
                ItemID = m.ItemID,
                EID = m.ExamId,
                SID = m.SID,
                Score = m.Score,
                ExamName = m.ExamName,
                KnowledgeName = m.KnowledgeName,
                KnowledgeID = m.KnowledgeID.ToString(),
                ItemType = (int)m.ItemType,
                FullScore = (int)m.FullScore,
                Answer = m.Answer,
                IsTextAnswer = m.IsTextAnswer,
                StageId = stageId,
                GradeID = gradeId

            }).ToList();
            return _eanswerDal.Update(janswer, tid, tname);
        }
        public bool ChangeJobState(StudentExamModel examModel, string tid, string tname)
        {  //获取学生信息
            var stageId = "1";
            var gradeId = 1;
            if (examModel != null)
            {
                var sid = examModel.Student.MfgID;
                var stuModel = new Student().GetStudentInfoModel(sid);

                if (stuModel != null && stuModel.GradeID != null)
                {
                    gradeId = stuModel.GradeID.Value;
                    stageId = stuModel.StageId;
                }
            }
            examModel.GradeID = gradeId;
            examModel.StageId = stageId;
            return _eanswerDal.ChangeJobState(examModel, tid, tname);
        }

        #region 保存总评语
        public bool SaveTeacherCommnet(string examid, string sid, string commnet)
        {
            return _examDal.SaveTeacherCommnet(examid, sid, commnet);
        }

        #endregion
        #endregion

        #region 批改在线考试 教学基本功

        /// <summary>
        /// 批改在线考试
        /// </summary>
        /// <param name="comments"></param>
        /// <returns></returns>
        public bool TeaCommnetJob(List<StudentExamItemModel> comments, string tid, string tname)
        {
            List<EI_EAnswer> janswer = comments.Select(m => new EI_EAnswer
            {
                ID = m.ID,
                SubjectID = m.SubjectID,
                Accuracy = m.Accuracy,
                Review = m.TeacherComment,
                ItemID = m.ItemID,
                EID = m.ExamId,
                SID = m.SID,
                Score = m.Score,
                ExamName = m.ExamName,
                KnowledgeName = m.KnowledgeName,
                KnowledgeID = m.KnowledgeID.ToString(),
                ItemType = (int)m.ItemType,
                FullScore = (int)m.FullScore,
                GradeID = (int)m.GradeID,
                Answer = m.Answer,
                IsTextAnswer = m.IsTextAnswer

            }).ToList();
            return _eanswerDal.TeaUpdate(janswer, tid, tname);
        }
        public bool TeaChangeJobState(StudentExamModel examModel, string tid, string tname)
        {
            return _eanswerDal.TeaChangeJobState(examModel, tid, tname);
        }

        #region 保存总评语
        public bool TeaSaveTeacherCommnet(string examid, string sid, string commnet)
        {
            return _examDal.TeaSaveTeacherCommnet(examid, sid, commnet);
        }
        #endregion



        #endregion

        #region 学生添加笔记

        /// <summary>
        /// 修改学生笔记
        /// </summary>
        /// <param name="eaid">答题表ID</param>
        /// <param name="noteContent"></param>
        /// <returns></returns>
        public bool AddItemNote(string eaid, string noteContent)
        {
            EI_EAnswer eanswer = new EI_EAnswer { ID = eaid, NoteContent = noteContent };
            return _eanswerDal.UpdateNote(eanswer);
        }

        #endregion
        /// <summary>
        /// 微信调用，获取考试题目信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public StudentExamModel GetExamDetialByJobID(string examId, string sid)
        {

            var ds = _examDal.GetStudentByExamID(examId, sid);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            var stumodel = stuInfo.FirstOrDefault(m => m.MfgID.Equals(sid));

            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentExamItemModel>.ConvertToModelList(ds.Tables[3]);
            if (itemInfo == null)
            {
                return null;
            }
            if (itemInfo.Count == 0)
            {
                return null;
            }
            StudentExamModel examModel = new StudentExamModel { ExamID = examId, Student = stumodel, SubjectID = itemInfo[0].SubjectID };


            var subjectID = "0" + examModel.SubjectID;

            var itemlist = new StringBuilder();
            itemInfo.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
            //通过接口获取题干，解析信息
            var questionList = _questionbank.FindByIdlist(subjectID, itemlist.ToString().TrimEnd(','));
            foreach (var item in itemInfo)
            {
                var question = questionList.FirstOrDefault(m => m.f_id == item.ItemID);
                var qViewMode = new QuestionItemViewModel(question, examModel.SubjectID);
                item.ItemName = qViewMode.GetItemBodyHtml();
                item.ItemAnaly = qViewMode.f_ways;
                item.RightAnswer = qViewMode.f_answer;
            }
            examModel.Items = itemInfo;
            return examModel;
        }
        #region 老师添加笔记 教学基本功
        public bool TeaAddItemNote(string eaid, string noteContent)
        {
            EI_EAnswer eanswer = new EI_EAnswer { ID = eaid, NoteContent = noteContent };
            return _eanswerDal.TeaUpdateNote(eanswer);
        }
        #endregion


        /// <summary>
        /// 
        /// </summary>
        /// <param name="examId"></param>
        /// <returns></returns>
        public ExamModel GetExamModel(string examId)
        {
            #region Redis之前代码
            return _examDal.GetExamInfo(examId);
            //ExamModel _exammodel = new ExamModel();
            ////在线考试
            //EI_Exam _eiexam = _examDal.GetModel(examId);
            //_exammodel.ID = examId;
            //_exammodel.Name = _eiexam == null ? string.Empty : _eiexam.Name;
            //_exammodel.GradeID = _eiexam == null ? 0 : _eiexam.GradeID;
            //_exammodel.SubjectID = _eiexam == null ? 0 : _eiexam.SubjectID;
            //_exammodel.EndTime = _eiexam.EndTime;
            //_exammodel.State = _eiexam == null ? 0 : _eiexam.State;
            //_exammodel.TID = _eiexam == null ? string.Empty : _eiexam.TID;

            //#region 题目
            //List<ERelItemModel> _erelimodelList = new List<ERelItemModel>();
            //var _examrelList = _eRelIDal.GetModelList(examId);
            //if (_examrelList.Count > 0)
            //{
            //    foreach (var item in _examrelList)
            //    {

            //        ERelItemModel _eobrelmodel = new ERelItemModel();
            //        _eobrelmodel.EID = item.EID;
            //        _eobrelmodel.SequenceID = item.SequenceID;
            //        _eobrelmodel.ItemID = item.ItemID;
            //        _eobrelmodel.ItemType = item.ItemType;
            //        _eobrelmodel.KnowledgeID = item.KnowledgeID;
            //        _eobrelmodel.ItemSourceType = item.ItemSourceType;
            //        _eobrelmodel.KnowledgeName = item.KnowledgeName;
            //        _eobrelmodel.DiffNum = item.DiffNum;
            //        _eobrelmodel.Score = item.Score;
            //        _eobrelmodel.PID = item.PID;
            //        _erelimodelList.Add(_eobrelmodel);

            //    }
            //}
            //_exammodel.ExamrelItemList = _erelimodelList;
            //#endregion

            //#region 在线考试布置对象
            //List<ERelSModel> _erelsmodelList = new List<ERelSModel>();
            //var _erelsList = _eRelSDal.GetErelSList(examId);

            //if (_erelsList != null)
            //{
            //    if (_erelsList.Count > 0)
            //    {
            //        foreach (var item in _erelsList)
            //        {
            //            ERelSModel _erelsmodel = new ERelSModel();
            //            _erelsmodel.EID = examId;
            //            _erelsmodel.SID = item.SID;
            //            _erelsmodel.StuState = item.StuState;
            //            _erelsmodelList.Add(_erelsmodel);
            //        }

            //    }
            //}
            //_exammodel.ErelsList = _erelsmodelList;
            //#endregion


            //return _exammodel;
            #endregion
        }

        /// <summary>
        /// 更新在线考试
        /// </summary>
        /// <param name="exammodel"></param>
        /// <returns></returns>
        public bool UpdateExamModel(ExamModel exammodel)
        {
            /**20150616修改*/
            bool result = false;
            result = _examDal.SaveExam2Model(exammodel);
            return result;
        }

        public bool UpdateExamModelToCache(ExamModel exammodel)
        {

            bool result = false;
            result = _examDal.SaveExam2ModelToCache(exammodel);
            return result;
        }

        /// <summary>
        ///  获取布置对象
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public List<TreeModel> GetWorkList(string tid, int orgid)
        {
            return _workobjectDal.GetObjectModelList(tid, orgid);
        }

        /// <summary>
        ///  删除试题
        /// </summary>
        /// <param name="delmodel"></param>
        /// <returns></returns>
        public bool DeleteItem(DeleteQuesModel delmodel)
        {
            return _eRelIDal.DeleteList(delmodel.ItemID, delmodel.JID);
        }


        public string SaveJRelI(List<ERelIModel> list, Int32 mBook)
        {
            return _eRelIDal.SaveERelI(list, mBook);
        }

        public string SaveTJRelI(List<ERelIModel> list, Int32 mBook)
        {
            return _eRelIDal.SaveTERelI(list, mBook);
        }

        public List<ERelIGetModel> GetInit(EI_Base<EI_ERelI> dto)
        {
            return _eRelIDal.GetInit(dto);
        }

        public List<ERelIGetModel> GetTInit(EI_Base<EI_ERelI> dto)
        {
            return _eRelIDal.GetTInit(dto);
        }

        public ExamInfoModel GetExam(EI_Exam eI_Job)
        {
            return _eRelIDal.GetExam(eI_Job);
        }

        public ExamInfoModel GetTExam(EI_Exam eI_Job)
        {
            return _eRelIDal.GetTExam(eI_Job);
        }


        public bool AddWrongBook(StudentExamModel examModel)
        {
            return _eanswerDal.AddWrongBook(examModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public bool ExitsJob(string jobId, string itemId)
        {
            return _eRelIDal.Exists(jobId, itemId);
        }

        /// <summary>
        /// 智能换题
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddErelItem(EI_ERelI model)
        {
            return _eRelIDal.Add(model);
        }




        public List<TagKeepReponseModel> GetInitTagKeep(TagKeepInitModel tag)
        {
            return new JRelIDal().GetInitTagKeep(tag);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="filterModel"></param>
        public void GetJobBookList(ParamFilterModel filterModel)
        {
            _examDal.GetJobBookList(filterModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bookID"></param>
        /// <returns></returns>
        public bool DeleteBookInfo(string bookID)
        {
            return _examDal.DeleteBookInfo(bookID);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bookID"></param>
        /// <returns></returns>
        public JobBookModel GetJobBookModel(string bookID)
        {
            return _examDal.GetBookModel(bookID);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="delmodel"></param>
        /// <returns></returns>
        public bool DeleteBookItem(DeleteQuesModel delmodel)
        {
            return _eRelIDal.DeleteBookList(delmodel.ItemID, delmodel.JID);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bookModel"></param>
        /// <returns></returns>
        public bool UpdateBookInfo(JobBookModel bookModel)
        {
            return _examDal.UpdateBookInfo(bookModel);
        }

        public bool UpdateBookInfoToCache(JobBookModel bookModel)
        {
            return _examDal.UpdateBookInfoToCache(bookModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bookModel"></param>
        /// <returns></returns>
        public bool SaveBookInfo(JobBookModel bookModel)
        {
            //bookModel.ID = Guid.NewGuid().ToString();
            bookModel.CreateTime = DateTime.Now;
            bookModel.UpdateTime = DateTime.Now;
            bookModel.StageID = DataConverter.GetStageByGradeID(bookModel.GradeID);
            return _examDal.SaveBookInfo(bookModel);
            #region Redis之前代码
            //bookModel.ID = Guid.NewGuid().ToString();
            //bookModel.CreateTime = DateTime.Now;
            //bookModel.UpdateTime = DateTime.Now;
            //bookModel.StageID = DataConverter.GetStageByGradeID(bookModel.GradeID);
            //return _examDal.SaveBookInfo(bookModel); 
            #endregion
        }



        public bool MoveItem(string jid, string oldId, string newId)
        {
            var items = RedisDal.GetValuesFromHash(RedisTypeEnum.Jobitem, jid, new string[] { "Item_" + oldId, "Item_" + newId }).Select(m => m.FromJsonTo<ERelIModel>()).ToList();
            //交换题目顺序
            items[0].SequenceID = (items[0].SequenceID + items[1].SequenceID);
            items[1].SequenceID = items[0].SequenceID - items[1].SequenceID;
            items[0].SequenceID = items[0].SequenceID - items[1].SequenceID;
            var keys = items.Select(m => new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())).ToList();
            return RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, jid, keys);
        }

        public bool ChangeItem(QuestionRandModel oldItem, Resource.Entity.Question newItem)
        {
            var redisItem = RedisDal.GetValueFromHash(RedisTypeEnum.Jobitem, oldItem.JID, "Item_" + oldItem.fid).FromJsonTo<JRelIModel>();

            //添加newItem

            redisItem.ItemID = newItem.f_id;
            var key = new KeyValuePair<string, string>("Item_" + newItem.f_id.ToString(),
               redisItem.ConvertToJson());
            RedisDal.SetEntryInHash(RedisTypeEnum.Jobitem, oldItem.JID, key);
            //删除oldItem
            return RedisDal.RemoveEntryFromHash(RedisTypeEnum.Jobitem, oldItem.JID, "Item_" + oldItem.fid);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="exammodel"></param>
        /// <returns></returns>
        public bool SaveObject(ExamModel exammodel)
        {
            RedisDal.RemoveKey(RedisTypeEnum.Jobitem, exammodel.ID);
            var jobbookModel = _examDal.GetBookModel(exammodel.ID);
            return _examDal.SaveObject(exammodel, jobbookModel);
        }


        public bool DeleteAllBookItem(DeleteQuesModel delmodel)
        {
            return _eRelIDal.DeleteAllBookList(delmodel.ItemID, delmodel.JID);
        }


        public bool DeleteAllItem(DeleteQuesModel deletemodel)
        {
            return _eRelIDal.DeleteAllList(deletemodel.ItemID, deletemodel.JID);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public bool ExitsBookJob(string jobId, string itemId)
        {
            return _eRelIDal.ExitsBook(jobId, itemId);
        }


        public bool AddEBookItem(JBookRelIModel model)
        {
            return _eRelIDal.AddBook(model);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public TeaExamBookModel GetTeaExamBookModel(string id)
        {
            return _examDal.GetTeaExamBookModel(id);
        }


        public bool ExitsTeaExam(string bookId, string itemId)
        {
            return _eRelIDal.ExitsTeaExam(bookId, itemId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="delmodel"></param>
        /// <returns></returns>
        public bool DeleteTeaBookItem(DeleteQuesModel delmodel)
        {
            return _eRelIDal.DeleteTeaList(delmodel.ItemID, delmodel.JID);
        }


        public bool AddTeaBookItem(TeaExamBookRelIModel model)
        {
            return _eRelIDal.AddTeaBook(model);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="teaModel"></param>
        /// <returns></returns>
        public bool SaveTeaExamInfo(TeaExamBookModel teaModel)
        {
            teaModel.UpdateTime = DateTime.Now;
            return _examDal.SaveTeaExamInfo(teaModel);
        }
        public bool SaveTeaExamInfoToCache(TeaExamBookModel teaModel)
        {
            teaModel.UpdateTime = DateTime.Now;
            return _examDal.SaveTeaExamInfoToCache(teaModel);

        }

        public List<TreeModel> GetTeaTree(string tid, int orgid)
        {
            return _workobjectDal.GetTeaTreeList(tid, orgid);
        }


        public bool SaveTeaObject(ExamModel exammodel)
        {
            RedisDal.RemoveKey(RedisTypeEnum.Jobitem, exammodel.ID);
            var examBookModel = _examDal.GetTeaExamBookModel(exammodel.ID);
            return _examDal.SaveTeaObject(exammodel, examBookModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public TeaExamBookModel GetExamBookModel(string id)
        {
            return _examDal.GetTeaExamBookModel(id);
        }
        public void RemoveKey(RedisTypeEnum redisTypeEnum, string id)
        {
            RedisDal.RemoveKey(redisTypeEnum, id);
        }
    }
}
