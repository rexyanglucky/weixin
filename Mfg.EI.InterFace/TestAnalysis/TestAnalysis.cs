
/*
 * author:杨礼文;
 * function:测评分析接口
 * adddate:2015-05-17
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
    public class TestAnalysis : ITestAnalysis
    {

        #region 私有变量

        private TestAnalysisDal _testAnalysisDal = new TestAnalysisDal();
        private SyncJobDal _syncjobDal = new SyncJobDal();
        private SyncJRelIDal _syncjreliDal = new SyncJRelIDal();
        private SyncJAnswerDal _syncjanswerDal = new SyncJAnswerDal();
        private IQuestion _question;//接口
        private IStudent _student;
        #endregion

        public TestAnalysis(IQuestion question, IStudent student)
        {
            _question = question;
            _student = student;
        }
        public TestAnalysis()
        {
        }
        #region 测评分析列表
        /// <summary>
        /// 测评分析列表
        /// </summary>
        /// <returns></returns>
        public List<TestAnalysisModel> GetTestAnalysisList(string sId, string subjectId,string stageID, int currentPage, out int count)
        {
            var dataSet = _testAnalysisDal.GetTestAnalysisList(sId, subjectId,stageID);
            List<TestAnalysisModel> modelList =
                ModelConvertHelper<TestAnalysisModel>.ConvertToModelList(dataSet.Tables[0]);
            count = modelList.Count;
            return modelList;

        }
        #endregion


        #region 知识点掌握分析

        /// <summary>
        /// 指定月的知识点分析
        /// </summary>
        /// <param name="sId"></param>
        /// <param name="subjectId"></param>
        /// <param name="dateTime"></param>
        /// <param name="top10KnowledgeList"></param>
        /// <returns></returns>
        public List<TestAnalysisModel> GetTestAnalysisList(string sId, string subjectId, string dateTime, out List<TestAnalysisModel> top10KnowledgeList)
        {
            top10KnowledgeList = new List<TestAnalysisModel>();
            DateTime selectDate = System.DateTime.Parse(dateTime);
            var startDate = selectDate.ToString("yyyy-MM");
            var endDate = selectDate.AddMonths(1).ToString("yyyy-MM");
            var dataSetKnowledge = _testAnalysisDal.GetKnowledgeList(subjectId, startDate, endDate);
            var knowledgeList = ModelConvertHelper<TestAnalysisModel>.ConvertToModelList(dataSetKnowledge.Tables[0]);

            var studentList = knowledgeList.Where(m => m.SID.Equals(sId)).ToList();
            studentList.ForEach(m =>
            {
                m.TopAccuracy = knowledgeList.Where(t => t.KnowledgeID == m.KnowledgeID).Max(i => i.Accuracy);
                m.AvgAccuracy = knowledgeList.Where(t => t.KnowledgeID == m.KnowledgeID).Sum(i => i.Accuracy) /
                                knowledgeList.Count(t => t.KnowledgeID == m.KnowledgeID);
            });
            top10KnowledgeList = studentList.OrderBy(m => m.Accuracy).Take(10).ToList();
            return studentList;

        }
        /// <summary>
        /// 指定月的知识点分析
        /// </summary>
        /// <param name="sId"></param>
        /// <param name="subjectId"></param>
        /// <param name="dateTime"></param>
        /// <param name="top10KnowledgeList"></param>
        /// <returns></returns>
        public List<TestAnalysisModel> GetKnowledgeAccuracy(string sId, string subjectId, string dateTime, out List<TestAnalysisModel> top10KnowledgeList)
        {

            top10KnowledgeList = new List<TestAnalysisModel>();
            DateTime selectDate = System.DateTime.Parse(dateTime);
            var startDate = selectDate.ToString("yyyy-MM");
            var ds = _testAnalysisDal.GetKnowledgeAccuracy(sId, subjectId, startDate);
            var knowledgeList = ModelConvertHelper<TestAnalysisModel>.ConvertToModelList(ds.Tables[0]);
            top10KnowledgeList = knowledgeList.OrderBy(m => m.Accuracy).Take(10).ToList();
            return knowledgeList;

        }

        #endregion



        /// <summary>
        /// 向测评分析表中插入数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>

        public bool InsertTestAnalysis(SyncJobModel syncjobmodel)
        {
            bool result = false;
            //向主表中插入数据
            EI_SyncJob _eisyncjob = new EI_SyncJob();
            _eisyncjob.ID = syncjobmodel.ID;
            _eisyncjob.KnowledgeID = syncjobmodel.KnowledgeID;
            _eisyncjob.SID = syncjobmodel.SID;
            _eisyncjob.KnowledgeName = syncjobmodel.KnowledgeName;
            _eisyncjob.SID = syncjobmodel.SID;
            _eisyncjob.GradeID = syncjobmodel.GradeID;
            _eisyncjob.SubjectID = syncjobmodel.SubjectID;
            _eisyncjob.RoundNumber = Convert.ToInt32(_syncjobDal.GetRoundNumber(syncjobmodel.SID, syncjobmodel.KnowledgeID.ToString(), syncjobmodel.RuleType.ToString())) + 1;
            _eisyncjob.RuleType = syncjobmodel.RuleType;
            _eisyncjob.TropNumber = syncjobmodel.TropNumber == null ? 0 : syncjobmodel.TropNumber;
            _eisyncjob.CreateTime = DateTime.Now;
            _eisyncjob.StageID = syncjobmodel.StageID;
            result = _syncjobDal.Add(_eisyncjob);
            if (result)
            {
                List<SyncJRelIModel> datalist = syncjobmodel.SyncJRelIModelList;
                if (datalist != null)
                {
                    if (datalist.Count > 0)
                    {
                        foreach (var item in datalist)
                        {
                            EI_SyncJRelI _eisyncjreli = new EI_SyncJRelI();
                            _eisyncjreli.JID = item.JID;
                            _eisyncjreli.ItemID = item.ItemID;
                            _eisyncjreli.ItemType = item.ItemType;
                            _eisyncjreli.SequenceID = item.SequenceID;
                            _eisyncjreli.KnowledgeID = item.KnowledgeID;
                            _eisyncjreli.KnowledgeName = item.KnowledgeName;
                            result = _syncjreliDal.Add(_eisyncjreli);
                        }
                    }
                }
            }
            return result;
        }

        /// <summary>
        /// 根据知识点获取信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<EI_SyncJob> GetSyncJobModel(string id, string subjectid, string gradeid)
        {
            return _syncjobDal.GetModelList(id, subjectid, gradeid);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="showmodel"></param>
        /// <returns></returns>
        public int InsertWrongList(ShowAnalysisModel showmodel)
        {
            int result = 0;
            result = _syncjanswerDal.InsertWrongList(showmodel);
            EI_SyncJob _eisyncjob = new EI_SyncJob();

            if (_syncjobDal.Exists(showmodel.jobId))
            {
                // Math.Round((decimal)x / y, 2);
                //更新数据
                _eisyncjob.ID = showmodel.jobId;
                _eisyncjob.MasterRate = (int)((Math.Round((decimal)(10 - result) / 10, 2)) * 100) + "%";
                _eisyncjob.RuleType = showmodel.ruletype;
                _eisyncjob.TropNumber = (result / 10) == 1 ? 1 : 0;
                _eisyncjob.RoundNumber = _syncjobDal.GetRoundNumber(showmodel.sid, showmodel.knid, showmodel.ruletype.ToString()) + 1;
                _syncjobDal.Update(_eisyncjob);

            }

            return result;
        }

        #region 统计掌握分析情况
        public bool AnalysisDataBatch()
        {
            return _testAnalysisDal.AnalysisDataBatch();
        }
        #endregion

        #region 获取学生进步记录
        public List<AccuracyProgressModel> GetStuProgess(string Mfgid, string subjectID, string dateTime)
        {
            var ds = _testAnalysisDal.GetStuProgess(Mfgid, subjectID, dateTime);
            return ModelConvertHelper<AccuracyProgressModel>.ConvertToModelList(ds.Tables[0]);
        }
        #endregion


        public bool SaveReferInfo(SyncJobModel syncJobModel)
        {
            return _syncjanswerDal.SaveRedisReferInfo(syncJobModel);
        }

        /// <summary>
        /// 获取Redis数据
        /// </summary>
        /// <param name="jid"></param>
        /// <returns></returns>
        public SyncJobModel GetReferSyncModel(string jid)
        {
            return _syncjanswerDal.GetReferSyncModel(jid);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public KnowledgeCustomerPoint GetCustomerPoint(KnowledgeCustomerPoint dto)
        {
            return _testAnalysisDal.GetCustomerPoint(dto);
        }
    }
}
