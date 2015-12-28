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
using System.Threading.Tasks;
using Mfg.EI.Common;
using Mfg.EI.DAL;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
namespace Mfg.EI.InterFace
{
    /// <summary>
    /// 电子作业接口
    /// </summary>
    public class HomeWork : IHomeWork
    {

        #region 私有变量
        private JobDal _jobDal = new JobDal();
        private WorkObjecDal _workobjectDal = new WorkObjecDal();//布置对象的Dal
        private JRelIDal _jobreliDal = new JRelIDal();//作业与题目的Dal
        private JRelSDal _jobrelsDal = new JRelSDal();//作业与学生的Dal
        private JAnswerDal _janswerDal = new JAnswerDal();
        private IQuestion _questionbank;
        private TeachDiaryDal _teachdiaryDal = new TeachDiaryDal();//教学日记


        #endregion
        public HomeWork(IQuestion question)
        {
            _questionbank = question;
        }

        #region 添加一份电子作业
        /// <summary>
        /// 添加一份电子作业
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool Add(EI_Job model)
        {
            return _jobDal.Add(model);

        }
        #endregion

        #region 获取未提交未批改的作业数量
        /// <summary>
        /// 获取未提交未批改的作业数量
        /// </summary>
        /// <param name="roleType"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        public int GetEI_JRelSCount(UserTypeEnum roleType, int userID, string bGrade)
        {
            try
            {
                return _jobrelsDal.GetEI_JRelSCount(roleType, userID, bGrade);
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("获取未提交未批改的作业数量失败", ex);
                return 0;
            }
        }

        #endregion

        #region 获取作业列表(老师分页)
        /// <summary>
        /// 获取作业列表(老师分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public List<EI_Job> LoadJobList(Dictionary<string, object> dic, out int count)
        {
            dic.Add("Skip", (Convert.ToInt32(dic["CurrentPage"]) - 1) * 10);//LIMIT @Skip,@Take
            dic.Add("Take", 10);
            var dataSet = _jobDal.GetJobListByDic(dic);

            List<EI_Job> ei_JobList = ModelConvertHelper<EI_Job>.ConvertToModelList(dataSet.Tables[1]);

            count = Convert.ToInt32(dataSet.Tables[0].Rows[0]["Count"]);
            return ei_JobList;

        }

        #endregion

        #region 获取作业列表(微信分页)
        /// <summary>
        /// 获取作业列表(微信分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<EI_Job> LoadJobList2Weixin(Dictionary<string, object> dic, out int count)
        {
            dic.Add("Skip", (Convert.ToInt32(dic["CurrentPage"]) - 1) * 10);//LIMIT @Skip,@Take
            dic.Add("Take", 10);
            var dataSet = _jobDal.GetJobList2WeixinByDic(dic);
            List<EI_Job> ei_JobList = ModelConvertHelper<EI_Job>.ConvertToModelList(dataSet.Tables[1]);
            count = Convert.ToInt32(dataSet.Tables[0].Rows[0]["Count"]);
            return ei_JobList;
        }
        #endregion

        #region 获取作业列表(学生分页)
        /// <summary>
        /// 获取作业列表(学生分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<EI_Job> LoadJobList2Student(Dictionary<string, object> dic, out int count)
        {
            dic.Add("Skip", (Convert.ToInt32(dic["CurrentPage"]) - 1) * 10);//LIMIT @Skip,@Take
            dic.Add("Take", 10);

            var dataSet = _jobDal.GetJobList2StudentByDic(dic);
            List<EI_Job> ei_JobList = ModelConvertHelper<EI_Job>.ConvertToModelList(dataSet.Tables[1]);
            count = Convert.ToInt32(dataSet.Tables[0].Rows[0]["Count"]);
            return ei_JobList;

        }



        #endregion

        #region 删除电子作业
        /// <summary>
        /// 删除电子作业
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool DeleteJob(string ID)
        {
            return _jobDal.DeleteJob(ID) > 0;
        }

        #endregion

        #region 获取查看作业布置
        /// <summary>
        /// 获取查看作业布置
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public SettedModel GetSetted(string ID)
        {
            var dataSet = _jobDal.GetSetted(ID);
            SettedModel settedModel = new SettedModel();


            settedModel.job = ModelConvertHelper<EI_Job>.ConvertToModel(dataSet.Tables[0]);
            settedModel.jRelSList = ModelConvertHelper<EI_JRelS>.ConvertToModelList(dataSet.Tables[1]);
            settedModel.JRelIList = ModelConvertHelper<EI_JRelI>.ConvertToModelList(dataSet.Tables[2]);
            settedModel.QuestionAttrList = new List<QuestionItemViewModel>();
            string ids = "";
            foreach (var item in settedModel.JRelIList)
            {
                ids += item.ItemID + ",";
            }
            List<Mfg.Resouce.Models.Question> questionList = null;
            try
            {
                if (ids != "")
                {
                    questionList = _questionbank.FindByIdlist("0" + settedModel.job.SubjectID.ToString(), ids.Substring(0, ids.Length - 1));
                }

            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用_questionbank.FindByIdlist接口出错,参数为({0})", settedModel.job.SubjectID.ToString() + "|" + ids.Substring(0, ids.Length - 1)), ex);
                //return null;

            }
            if (questionList != null)
            {
                var subjectId = 0;
                if (settedModel.job.SubjectID != null)
                {
                    subjectId = settedModel.job.SubjectID.Value;
                }
                foreach (var item in questionList)
                {
                    //settedModel.QuestionAttrList.Add(new QuestionAttrModel()
                    //                                {
                    //                                    f_answer = item.f_answer,
                    //                                    //todo
                    //                                    //f_answerlist = item.f_answerlist,
                    //                                    //f_bclass = item.f_bclass,
                    //                                    f_body = item.f_body,
                    //                                    f_class = item.f_class,
                    //                                    f_detailpath = item.f_detailpath,
                    //                                    f_difficulty = item.f_difficulty,
                    //                                    f_id = item.f_id,
                    //                                    f_isapp = item.f_isapp,
                    //                                    f_mainsec = item.f_mainsec,
                    //                                    f_mainsec1 = item.f_mainsec1,
                    //                                    f_secorder = item.f_secorder,
                    //                                    f_secpoint = item.f_secpoint,
                    //                                    f_style = item.f_style,
                    //                                    f_ways = item.f_ways,
                    //                                    ItemType = item.f_qtype
                    //                                }
                    //);
                    settedModel.QuestionAttrList.Add(new QuestionItemViewModel(item, subjectId));

                }
            }

            return settedModel;
        }

        #endregion

        #region 获取电子作业题
        /// <summary>
        /// 获取电子作业题
        /// </summary>
        /// <param name="ID">考试ID</param>
        /// <param name="SID">学生ID</param>
        /// <returns></returns>
        public SettedModel GetJobItem(string ID, string SID)
        {
            var dataSet = _jobDal.GetJobItem(ID, SID);
            SettedModel settedModel = new SettedModel();

            settedModel.JRelIList = ModelConvertHelper<EI_JRelI>.ConvertToModelList(dataSet.Tables[0]);
            settedModel.QuestionAttrList = new List<QuestionItemViewModel>();
            string ids = "";
            foreach (var item in settedModel.JRelIList)
            {
                ids += item.ItemID + ",";
            }
            List<Mfg.Resouce.Models.Question> questionList = null;
            try
            {
                if (ids != "")
                {
                    questionList = _questionbank.FindByIdlist("0" + settedModel.JRelIList[0].SubjectID, ids.TrimEnd(','));
                }

            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用_questionbank.FindByIdlist接口出错,参数为({0})", settedModel.JRelIList[0].SubjectID + "|" + ids.Substring(0, ids.Length - 1)), ex);
                //return null;

            }
            if (questionList != null)
            {
                foreach (var item in questionList)
                {
                    //settedModel.QuestionAttrList.Add(new QuestionAttrModel()
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
                    //    ItemType = item.f_qtype,
                    //    questionItem = new QuestionItemViewModel(item)
                    //}
                    settedModel.QuestionAttrList.Add(new QuestionItemViewModel(item, settedModel.JRelIList[0].SubjectID));
                }
            }

            return settedModel;

        }

        #endregion

        #region 批量添加答案(初始化答案)
        /// <summary>
        /// 批量添加答案(初始化答案)
        /// </summary>
        /// <param name="jID"></param>
        /// <param name="sID"></param>
        /// <param name="settedModel"></param>
        /// <returns></returns>
        public bool BatchAddAnswer(string jID, string sID, SettedModel settedModel)
        {

            bool isExists = _janswerDal.Exists(jID, sID);
            if (!isExists)
            {
                List<string> itemIDList = settedModel.JRelIList.Select(m => m.ItemID.ToString()).ToList();
                return _janswerDal.BatchAdd(jID, sID, itemIDList);
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
        public bool SubmitAnswer(JAnswerModel model)
        {
            EI_JAnswer eAnswer = new EI_JAnswer()
            {
                ID = Guid.NewGuid().ToString(),
                SID = model.SID,
                JID = model.JID,
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
            return _janswerDal.SubmitAnswer(eAnswer);
        }
        #endregion

        #region 提交作业
        /// <summary>
        /// 提交作业
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool SubmitJob(JRelSModel model)
        {
            EI_JRelS ei_ERelS = new EI_JRelS()
            {
                JID = model.JID,
                SID = model.SID,
                StuState = 1,
                SumeTime = model.SumeTime
            };
            var dataSet = _jobDal.GetJobItem(ei_ERelS.JID, ei_ERelS.SID);
            List<EI_JRelI> ei_JRelIList = ModelConvertHelper<EI_JRelI>.ConvertToModelList(dataSet.Tables[0]).Where(m => m.ItemType <= 100).OrderBy(o => o.ItemID).ToList();//只取选择题 <=100

            //string itemIDs = string.Join(",", ei_ERelIList.Select(m => m.ItemID).ToList());
            //List<string> sanswer = ei_ERelIList.Select(m => m.Answer).ToList();

            string itemIDs = "";
            List<string> sanswerList = new List<string>();
            foreach (var item in ei_JRelIList)
            {
                itemIDs += item.ItemID + ",";
                sanswerList.Add(item.Answer ?? "");
            }

            Dictionary<string, double> dic = null;

            if (!string.IsNullOrEmpty(itemIDs))
            {
                dic = _questionbank.QuesCorrect("0" + ei_JRelIList[0].SubjectID, itemIDs.TrimEnd(','), sanswerList);
            }

            return _jobrelsDal.UpdateStuState(ei_ERelS, dic, ei_JRelIList);

        }

        #endregion

        #region 根据教师ID获取布置对象
        /// <summary>
        /// 根据教师ID获取布置对象
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public List<TreeModel> GetWorkList(string tid, int orgid)
        {
            return _workobjectDal.GetObjectModelList(tid, orgid);
        }
        #endregion


        #region 电子作业分析
        /// <summary>
        /// 获取学生回答情况
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentJobModel> GetStudentByJobID(string jobId, string sid = "")
        {
            List<StudentJobModel> modelList = new List<StudentJobModel>();
            var ds = _jobDal.GetStudentByJobID(jobId, sid);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentJobItemModel>.ConvertToModelList(ds.Tables[1]);
            //var itemTypeCountList = itemInfo.GroupBy(m => m.ItemType).Select(g => g.Key).ToList();

            foreach (var model in stuInfo)
            {
                StudentJobModel smodel = new StudentJobModel { JobID = jobId, Student = model };
                var items = itemInfo.Where(i => i.JobId == jobId && i.SID == model.MfgID).ToList();
                //排序取题目顺序
                //foreach (var key in itemTypeCountList)
                //{
                //    int index = 0;
                //    items.Where(m => m.ItemType == key)
                //        .ToList()
                //        .OrderBy(j => j.SequenceID)
                //        .ToList()
                //        .ForEach(n => n.SequenceID = ++index);
                //}
                if (items.Count > 0)
                {
                    smodel.SubjectID = items[0].SubjectID;
                    smodel.Items = items;
                    //计算当前学生的总分
                    var totalScore = 0f;
                    var totalTime = 0;
                    smodel.JobName = items[0].JobName;
                    smodel.StuState = items[0].StuState;
                    smodel.GradeID = items[0].GradeID;
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
            return modelList.OrderByDescending(m => m.TotalScore)
                .ThenByDescending(m => m.Student.Name).ToList();

        }


        /// <summary>
        /// 进入批改页面时触发
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="students"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        private List<StudentJobModel> GetStudentByJobID(string jobId, ref List<StudentModel> students, string sid = "")
        {
            List<StudentJobModel> modelList = new List<StudentJobModel>();
            var ds = _jobDal.GetStudentByJobID(jobId, sid);
            //该作业的布置对象
            students = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentJobItemModel>.ConvertToModelList(ds.Tables[1]);
            foreach (var model in students)
            {
                StudentJobModel smodel = new StudentJobModel { JobID = jobId, Student = model };
                var items = itemInfo.Where(i => i.JobId == jobId && i.SID == model.MfgID).ToList();

                if (items.Count > 0)
                {
                    smodel.SubjectID = items[0].SubjectID;
                    smodel.Items = items;
                    //计算当前学生的总分
                    var totalScore = 0f;
                    var totalTime = 0;
                    smodel.JobName = items[0].JobName;
                    smodel.StuState = items[0].StuState;
                    items.ForEach(m =>
                    {
                        totalScore += m.Score;
                        totalTime += (string.IsNullOrEmpty(m.AnswerTime) ? 0 : Convert.ToInt32(m.AnswerTime));

                    });
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
        /// 获取掌握分析知识点
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentJobModel> GetKnowledgeListByJobID(string jobId, string sid = "")
        {

            List<StudentJobModel> modelList = new List<StudentJobModel>();
            var ds = _jobDal.GetStudentByJobID(jobId);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            //获取作业的题目信息
            //var itemInfo = ModelConvertHelper<StudentJobItemModel>.ConvertToModelList(ds.Tables[1]);
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
                       AverageRate = g.Sum(item => item.FullScore) <= 0 ? 0 : g.Sum(item => item.ActuScore) / g.Sum(item => item.FullScore),
                       //总分
                       TotalFullScore = g.Sum(item => item.FullScore),
                       //实际总得分
                       TotalActuScore = g.Sum(item => item.ActuScore),
                       JobID = jobId

                   }).ToList();
            if (string.IsNullOrEmpty(sid))
            {
                StudentJobModel smodel = new StudentJobModel { JobID = jobId, KnowledgeList = knowledgePointList };
                modelList.Add(smodel);
            }
            else
            {
                StudentJobModel smodel = new StudentJobModel { JobID = jobId, KnowledgeList = knowledgePointList };
                var myKnow = knowInfo.Where(i => i.JobID == jobId && i.SID == sid).ToList();
                myKnow.ForEach(m => { m.MyRate = m.FullScore <= 0 ? 0 : (m.ActuScore / m.FullScore); });
                smodel.KnowledgeStudentList = myKnow;
                modelList.Add(smodel);

            }
            return modelList;


        }

        /// <summary>
        /// 获取学生回答表详细信息 查看，批改，讲评页面
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<StudentJobModel> GetJobAnswerDetialByJobID(string jobId, string sid = "")
        {
            var models = GetStudentByJobID(jobId, sid);
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

        public List<StudentJobModel> GetJobAnswerDetialByJobID(string jobId, ref List<StudentModel> students, string sid = "")
        {
            var models = GetStudentByJobID(jobId, ref students, sid);
            if (models == null)
            {
                return null;
            }
            if (models.Count == 0)
            {
                return null;
            }

            var subjectID = "0" + models[0].SubjectID;

            var itemlist = new StringBuilder();
            models[0].Items.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
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
                    var qViewMode = new QuestionItemViewModel(question, models[0].SubjectID);
                    item.ItemName = qViewMode.GetItemBodyHtml();
                    item.ItemAnaly = qViewMode.f_ways;
                    item.ItemTypeName = qViewMode.f_styleName;
                    item.ItemType = _r(qViewMode.f_style);

                    item.RightAnswer = qViewMode.f_answer;
                    var itemText = HtmlHelper.StripTags(item.ItemName).Replace("@", "").Replace("\t", "").Replace("\n", "");
                    item.ItemText = itemText.Length > 40 ? itemText.Substring(0, 37) + "..." : itemText;

                }
            }

            return models;
        }

        #region 微信调用
        /// <summary>
        /// 微信调用，获取job题目信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public StudentJobModel GetJobDetialByJobID(string jobId, string sid)
        {

            var ds = _jobDal.GetStudentByJobID(jobId, sid);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            var stumodel = stuInfo.Where(m => m.MfgID.Equals(sid)).FirstOrDefault();

            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentJobItemModel>.ConvertToModelList(ds.Tables[3]);
            if (itemInfo == null)
            {
                return null;
            }
            if (itemInfo.Count == 0)
            {
                return null;
            }
            StudentJobModel jobModel = new StudentJobModel { JobID = jobId, Student = stumodel, SubjectID = itemInfo[0].SubjectID };

            var subjectID = "0" + jobModel.SubjectID;

            var itemlist = new StringBuilder();
            itemInfo.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
            //通过接口获取题干，解析信息
            var questionList = _questionbank.FindByIdlist(subjectID, itemlist.ToString().TrimEnd(','));

            Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, jobModel.SubjectID);
            foreach (var item in itemInfo)
            {
                var question = questionList.Where(m => m.f_id == item.ItemID).FirstOrDefault();
                var qViewMode = new QuestionItemViewModel(question, jobModel.SubjectID);
                item.ItemName = qViewMode.GetItemBodyHtml();
                item.ItemAnaly = qViewMode.f_ways;
                item.RightAnswer = qViewMode.f_answer;
            }
            jobModel.Items = itemInfo;
            return jobModel;
        }
        /// <summary>
        /// 微信调用，获取学生回答详细信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public StudentJobModel GetAnswerDetialByJobID(string jobId, string sid)
        {
            var ds = _jobDal.GetStudentByJobID(jobId, sid);
            //该作业的布置对象
            var stuInfo = ModelConvertHelper<StudentModel>.ConvertToModelList(ds.Tables[0]);
            var stumodel = stuInfo.FirstOrDefault(m => m.MfgID.Equals(sid));
            //获取作业的题目信息
            var itemInfo = ModelConvertHelper<StudentJobItemModel>.ConvertToModelList(ds.Tables[1]);
            if (itemInfo == null)
            {
                return null;
            }
            if (itemInfo.Count == 0)
            {
                return null;
            }
            StudentJobModel jobModel = new StudentJobModel { JobID = jobId, Student = stumodel, SubjectID = itemInfo[0].SubjectID };

            var subjectID = "0" + jobModel.SubjectID;

            var itemlist = new StringBuilder();
            itemInfo.ForEach(m => { itemlist.Append(m.ItemID.ToString() + ","); });
            //通过接口获取题干，解析信息
            var questionList = _questionbank.FindByIdlist(subjectID, itemlist.ToString().TrimEnd(','));

            Func<int, ItemState> _r = (a) => _questionbank.GetStyle(a, jobModel.SubjectID);
            foreach (var item in itemInfo)
            {
                var question = questionList.FirstOrDefault(m => m.f_id == item.ItemID);
                item.ItemName = question.f_body;
                item.ItemAnaly = question.f_ways;
                var qViewMode = new QuestionItemViewModel(question, jobModel.SubjectID);
                item.ItemName = qViewMode.GetItemBodyHtml();
                item.ItemAnaly = qViewMode.f_ways;
                item.RightAnswer = qViewMode.f_answer;
                item.ItemType = _r(qViewMode.f_style);

            }
            jobModel.Items = itemInfo;
            return jobModel;
        }
        #endregion
        #endregion

        #region 根据电子作业ID查找电子作业
        /// <summary>
        ///  根据电子作业ID查找电子作业
        /// </summary>
        /// <param name="jobID"></param>
        /// <returns></returns>
        public JobModel GetJobModel(string jobId)
        {

            return _jobDal.GetJobInfo(jobId);


            #region Redis之前代码

            //JobModel _jobmode = new JobModel();
            ////电子作业
            //EI_Job _eijob = _jobDal.GetModel(jobId);
            //_jobmode.ID = jobId;
            //_jobmode.Name = _eijob == null ? string.Empty : _eijob.Name;
            //_jobmode.GradeID = _eijob == null ? 0 : _eijob.GradeID;
            //_jobmode.SubjectID = _eijob == null ? 0 : _eijob.SubjectID;
            //_jobmode.EndTime = _eijob.EndTime;
            //_jobmode.State = _eijob == null ? 0 : _eijob.State;
            //_jobmode.TID = _eijob == null ? string.Empty : _eijob.TID;
            //#region 题目
            //List<JobRelItemModel> _jobRelIList = new List<JobRelItemModel>();
            //var _jobrelList = _jobreliDal.GetModelList(jobId);
            //if (_jobrelList != null)
            //{
            //    if (_jobrelList.Count > 0)
            //    {
            //        foreach (var item in _jobrelList)
            //        {
            //            JobRelItemModel _jobrelmodel = new JobRelItemModel();
            //            _jobrelmodel.JID = item.JID;
            //            _jobrelmodel.SequenceID = item.SequenceID;
            //            _jobrelmodel.ItemID = item.ItemID;
            //            _jobrelmodel.ItemType = item.ItemType;
            //            _jobrelmodel.KnowledgeID = item.KnowledgeID;
            //            _jobrelmodel.KnowledgeName = item.KnowledgeName;
            //            _jobrelmodel.DiffNum = item.DiffNum;
            //            _jobrelmodel.ItemSourceType = item.ItemSourceType;
            //            _jobrelmodel.Score = item.Score;
            //            _jobrelmodel.PID = item.PID;
            //            _jobRelIList.Add(_jobrelmodel);

            //        }
            //    }
            //}

            //_jobmode.JobrelItemList = _jobRelIList;
            //#endregion

            //#region  布置对象集合
            //List<JRelSModel> _jrelsmodelList = new List<JRelSModel>();
            //var jrelsList = _jobrelsDal.GetJrelSList(jobId);
            //if (jrelsList != null)
            //{
            //    if (jrelsList.Count > 0)
            //    {
            //        foreach (var item in jrelsList)
            //        {
            //            JRelSModel _jrelsmodel = new JRelSModel();
            //            _jrelsmodel.JID = jobId;
            //            _jrelsmodel.SID = item.SID;
            //            _jrelsmodel.StuState = item.StuState;
            //            _jrelsmodelList.Add(_jrelsmodel);
            //        }

            //    }
            //}
            //_jobmode.JrelsList = _jrelsmodelList;
            //#endregion

            //return _jobmode; 

            #endregion
        }
        #endregion


        #region 电子作业编辑
        /// <summary>
        /// 电子作业编辑
        /// </summary>
        /// <param name="jobmodel"></param>
        /// <returns></returns>
        public bool UpdateJobModel(JobModel jobmodel)
        {
            /**20150616修改*/
            bool result = false;
            result = _jobDal.SaveJob2Model(jobmodel);
            return result;
        }

        /// <summary>
        /// 电子作业编辑 保存到缓存
        /// </summary>
        /// <param name="jobmodel"></param>
        /// <returns></returns>
        public bool UpdateJobModelToCache(JobModel jobmodel)
        {
            /**20150616修改*/
            bool result = false;
            result = _jobDal.SaveJob2ModelToCache(jobmodel);
            return result;
        }

        #endregion


        #region 保存题目
        public string SaveJRelI(List<JRelIModel> list, Int32 mbook)
        {
            return new JRelIDal().SaveJRelI(list, mbook);
        }
        #endregion

        /// <summary>
        /// 查询题目
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public List<JRelIGetModel> GetInit(EI_Base<EI_JRelI> dto)
        {
            return new JRelIDal().GetInit(dto);
        }

        /// <summary>
        /// 删除试题
        /// </summary>
        /// <param name="delmodel"></param>
        /// <returns></returns>
        public bool DeleteItem(DeleteQuesModel delmodel)
        {
            return _jobreliDal.DeleteList(delmodel.ItemID, delmodel.JID);
        }

        /// <summary>
        /// 获取作业主信息
        /// </summary>
        public JobInfoModel GetJob(EI_Job eI_Job)
        {
            return _jobreliDal.GetJob(eI_Job);
        }
        #region 批改电子作业

        /// <summary>
        /// 批改电子作业
        /// </summary>
        /// <param name="comments"></param>
        /// <returns></returns>
        public bool CommnetJob(List<StudentJobItemModel> comments, string tId, string tname)
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

            List<EI_JAnswer> janswer = comments.Select(m => new EI_JAnswer
            {
                ID = m.ID,
                SubjectID = m.SubjectID,
                Accuracy = m.Accuracy,
                Review = m.TeacherComment,
                ItemID = m.ItemID,
                JID = m.JobId,
                SID = m.SID,
                Score = m.Score,
                jobName = m.JobName,
                KnowledgeName = m.KnowledgeName,
                KnowledgeID = m.KnowledgeID.ToString(),
                ItemType = (int)m.ItemType,
                FullScore = (int)m.FullScore,
                Answer = m.Answer,
                IsTextAnswer = m.IsTextAnswer,
                StageId = stageId,
                GradeID = gradeId
            }).ToList();

            return _janswerDal.Update(janswer, tId, tname);
        }
        #endregion

        #region 学生 - 电子作业

        public List<JobQuestionDTO> GetQuestions(Guid jobID)
        {
            return _jobDal.GetQuestions(jobID);
        }

        public bool AnswerQuestion(EI_JAnswer model)
        {
            return _janswerDal.Add(model);
        }

        public bool UpdateTheQuestion(EI_JAnswer model)
        {
            return _janswerDal.Update(model);
        }

        public bool IsAnswerTheQuestion(int studentID, Guid jobID, int questionID)
        {
            var ds = _janswerDal.GetList(string.Format("SID='{0}' AND JID='{1}' AND ItemID='{2}'",
                studentID, jobID, questionID));

            return ds.Tables[0].Rows.Count > 0;
        }

        public bool CompleteHomeWork(int studentID, Guid jobID)
        {
            var student = _jobrelsDal.GetJrelSList(jobID.ToString()).FirstOrDefault(x => x.SID == studentID.ToString());
            return _jobrelsDal.Update(new EI_JRelS()
            {
                SID = studentID.ToString(),
                JID = jobID.ToString(),
                SName = student.SName,
                StuState = 1
            });
        }

        public EI_JAnswer GetTheAnswer(int studentID, Guid jobID, int questionID)
        {
            var ds = _janswerDal.GetList(string.Format("SID='{0}' AND JID='{1}' AND ItemID='{2}'",
                studentID, jobID, questionID));

            if (ds.Tables[0].Rows.Count > 0)
            {
                var row = ds.Tables[0].Rows[0];

                EI_JAnswer returnModel = _janswerDal.DataRowToModel(row);

                return returnModel;
            }
            else
            {
                return null;
            }
        }

        #endregion

        #region 学生添加笔记
        /// <summary>
        /// 修改学生笔记
        /// </summary>
        /// <param name="jaid">答题表ID</param>
        /// <param name="comment">笔记内容</param>
        /// <returns></returns>
        public bool AddItemNote(string jaid, string noteContent)
        {
            EI_JAnswer janswer = new EI_JAnswer { ID = jaid, NoteContent = noteContent };
            return _janswerDal.UpdateNote(janswer);
        }
        #endregion



        public bool ChangeJobState(StudentJobModel jobModel, string tid, string tname)
        {
            //获取学生信息
            var stageId = "1";
            var gradeId = 1;
            if (jobModel != null)
            {
                var sid = jobModel.Student.MfgID;
                var stuModel = new Student().GetStudentInfoModel(sid);

                if (stuModel != null && stuModel.GradeID != null)
                {
                    gradeId = stuModel.GradeID.Value;
                    stageId = stuModel.StageId;
                }
            }
            jobModel.GradeID = gradeId;
            jobModel.StageId = stageId;
            return _janswerDal.ChangeJobState(jobModel, tid, tname);
        }

        public bool AddWrongBook(StudentJobModel jobModel)
        {
            return _janswerDal.AddWrongBook(jobModel);
        }

        /// <summary>
        /// 根据作业ID和试题ID
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public bool ExitsJob(string jobId, string itemId)
        {
            return _jobreliDal.Exists(jobId, itemId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddJRelModel(EI_JRelI model)
        {
            return _jobreliDal.Add(model);
        }

        #region 布置巩固作业

        /// <summary>
        /// 布置巩固作业
        /// </summary>
        /// <param name="jid">作业ID，考试ID</param>
        /// <param name="items">要布置的试题列表</param>
        /// <param name="type">类别，0 作业，1 考试</param>
        /// <param name="newjid"></param>
        /// <returns></returns>
        public bool AddJob(string jid, string items, int type, out string newjid)
        {
            return _jobDal.AddJob(jid, items, type, out newjid);
        }
        public bool AddJob(string jobId, int type, out string newjid, string items)
        {
            List<string[]> arrys = new List<string[]>();
            int gradeid = 0;
            //job
            //if (type == 0)
            //{

            var jobitems = items.FromJsonTo<List<StudentJobItemModel>>();
            jobitems = jobitems.OrderBy(m => m.ItemType).ToList();

            switch (jobitems[0].SubjectID)
            {
                case 1:
                case 3:
                    arrys = jobitems.GroupBy(m => new { m.KnowledgeID, m.ItemStyle })
            .Select(k => new string[] { k.Key.KnowledgeID.ToString(), ((int)k.Key.ItemStyle).ToString(), k.Count().ToString(), "x" }).ToList();
                    break;
                default:
                    arrys = jobitems.GroupBy(m => new { m.KnowledgeID, m.ItemStyle })
            .Select(k => new string[] { k.Key.KnowledgeID.ToString(), ((int)k.Key.ItemStyle).ToString(), k.Count().ToString(), "d" }).ToList();
                    break;

            }


            gradeid = jobitems[0].GradeID;
            //}
            ////Exam
            //else
            //{
            //    var jobitems = items.FromJsonTo<List<StudentExamItemModel>>();
            //    jobitems = jobitems.OrderBy(m => m.ItemType).ToList();

            //    arrys = jobitems.GroupBy(m => new { m.KnowledgeID, m.ItemType })
            //       .Select(k => new string[] { k.Key.KnowledgeID.ToString(), ((int)k.Key.ItemType).ToString(), k.Count().ToString() }).ToList();
            //    gradeid = jobitems[0].GradeID;


            //}
            var arr = new string[arrys.Count() * 4];
            int t = 0;
            foreach (var item in arrys)
            {
                arr[t * 4 + 0] = item[0];
                arr[t * 4 + 1] = item[1];
                arr[t * 4 + 2] = item[2];
                arr[t * 4 + 3] = item[3];
                t++;
            }
            //var grade = "x1";
            //if (gradeid <= 6)
            //{
            //    grade = "x" + gradeid;
            //}
            //else if (gradeid > 6 && gradeid <= 9)
            //{
            //    grade = "c" + (gradeid - 6);
            //}
            //else if (gradeid > 9 && gradeid <= 12)
            //{
            //    //grade = "g" + (gradeid - 9);
            //    grade = "g";
            //}

            var grade = "x";
            if (gradeid <= 6)
            {
                grade = "x";
            }
            else if (gradeid > 6 && gradeid <= 9)
            {
                grade = "c";
            }
            else if (gradeid > 9 && gradeid <= 12)
            {
                grade = "g";
            }

            //调用接口
            var questionList = _questionbank.QueryQuestions(arr, grade, "0" + jobitems[0].SubjectID.ToString());
            var questionItems = questionList.Select(m =>
              {

                  var qViewModel = new QuestionItemViewModel(m, jobitems[0].SubjectID);
                  return new StudentJobItemModel
                  {
                      ItemID = m.f_id,
                      DiffNum = m.f_difficulty,
                      ItemType = _questionbank.GetStyle(m.f_style, jobitems[0].SubjectID),
                      ItemStyle = qViewModel.f_style,
                      KnowledgeID = m.f_mainsec,
                      KnowledgeName = jobitems.FirstOrDefault(k => k.KnowledgeID.Equals(m.f_mainsec)).KnowledgeName
                  };

              }).ToList();
            return _jobDal.AddJob(jobId, questionItems, type, out newjid);
        }
        #endregion





        public bool SaveTeacherCommnet(string jid, string sid, string commnet)
        {
            return _jobDal.SaveTeacherCommnet(jid, sid, commnet);
        }

        /// <summary>
        /// 获取作业本列表信息
        /// </summary>
        /// <param name="filterModel"></param>
        /// <returns></returns>
        public void GetJobBookList(ParamFilterModel filterModel)
        {
            _jobDal.GetJobBookList(filterModel);
        }

        /// <summary>
        /// 保存作业箱信息
        /// </summary>
        /// <param name="bookModel"></param>
        /// <returns></returns>
        public bool SaveBookInfo(JobBookModel bookModel)
        {
            //bookModel.ID = Guid.NewGuid().ToString();
            bookModel.CreateTime = DateTime.Now;
            bookModel.UpdateTime = DateTime.Now;
            bookModel.StageID = DataConverter.GetStageByGradeID(bookModel.GradeID);
            return _jobDal.SaveBookInfo(bookModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bookID"></param>
        /// <returns></returns>
        public bool DeleteBookInfo(string bookID)
        {
            return _jobDal.DeleteBookInfo(bookID);
        }

        /// <summary>
        /// 获取编辑页面信息
        /// </summary>
        /// <param name="bookID"></param>
        /// <returns></returns>
        public JobBookModel GetJobBookModel(string bookID)
        {
            return _jobDal.GetBookModel(bookID);
        }


        /// <summary>
        /// 删除编辑列表试题
        /// </summary>
        /// <param name="delmodel"></param>
        /// <returns></returns>
        public bool DeleteBookItem(DeleteQuesModel delmodel)
        {
            return _jobreliDal.DeleteBookList(delmodel.ItemID, delmodel.JID);
        }


        public List<TagKeepReponseModel> GetInitTagKeep(TagKeepInitModel tag)
        {
            return new JRelIDal().GetInitTagKeep(tag);
        }




        public TagPointPageModel GetTagList(TagPointPageParaModel para)
        {
            return new JRelIDal().GetTagList(para);
        }

        #region 智能换题
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

        public bool MoveItem(string jid, string oldId, string newId)
        {
            var items = RedisDal.GetValuesFromHash(RedisTypeEnum.Jobitem, jid, new string[] { "Item_" + oldId, "Item_" + newId }).Select(m => m.FromJsonTo<JRelIModel>()).ToList();
            //交换题目顺序
            items[0].SequenceID = (items[0].SequenceID + items[1].SequenceID);
            items[1].SequenceID = items[0].SequenceID - items[1].SequenceID;
            items[0].SequenceID = items[0].SequenceID - items[1].SequenceID;
            var keys = items.Select(m => new KeyValuePair<string, string>("Item_" + m.ItemID, m.ConvertToJson())).ToList();
            return RedisDal.SetRangeInHash(RedisTypeEnum.Jobitem, jid, keys);

        }

        #endregion

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bookModel"></param>
        /// <returns></returns>
        public bool UpdateBookInfo(JobBookModel bookModel)
        {
            return _jobDal.UpdateBookInfo(bookModel);
        }
        public bool UpdateBookInfoToCache(JobBookModel bookModel)
        {
            return _jobDal.UpdateBookInfoToCache(bookModel);
        }

        /// <summary>
        /// 保存作业布置对象
        /// </summary>
        /// <param name="jobmodel"></param>
        /// <returns></returns>
        public bool SaveObject(JobModel jobmodel)
        {
            RedisDal.RemoveKey(RedisTypeEnum.Jobitem, jobmodel.ID);
            var jobbookModel = _jobDal.GetBookModel(jobmodel.ID);
            return _jobDal.SaveObject(jobmodel, jobbookModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="deletemodel"></param>
        /// <returns></returns>
        public bool DeleteAllBookItem(DeleteQuesModel deletemodel)
        {
            return _jobreliDal.DeleteAllBookList(deletemodel.ItemID, deletemodel.JID);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="deletemodel"></param>
        /// <returns></returns>
        public bool DeleteAllItem(DeleteQuesModel deletemodel)
        {
            return _jobreliDal.DeleteAllList(deletemodel.ItemID, deletemodel.JID);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public bool ExitsBookJob(string bookId, string itemId)
        {
            return _jobreliDal.ExistsBook(bookId, itemId);
        }


        public bool AddJBookModel(JBookRelIModel model)
        {
            return _jobreliDal.AddBook(model);
        }
    }
}
