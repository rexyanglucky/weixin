/*
 * author:谢利民;
 * function:同步学习功能的接口
 * date:2015-05-13
 * update:205-05-13
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DAL;
using Mfg.EI.DAL.SyncStudy;
using Mfg.EI.ViewModel;
using Mfg.EI.Entity;
using OperateResult;

namespace Mfg.EI.InterFace
{
    /// <summary>
    /// SyncLearnStu：同步学习功能的操作
    /// </summary>
    public class SyncLearnStu : ISyncLearnStu
    {
        #region 私有变量
        private SyncJRelIDal _syncjreliDal = new SyncJRelIDal();
        private SyncJAnswerDal _syncjanswerDal = new SyncJAnswerDal();
        private IQuestion _questionbank;
        private SyncJobDal _syncjobDal = new SyncJobDal();
        #endregion



        public SyncLearnStu(IQuestion question)
        {
            _questionbank = question;
        }


        /// <summary>
        /// 根据ID获取模型
        /// </summary>
        /// <param name="jobId"></param>
        /// <returns></returns>
        public SyncJobModel GetSyncJobModel(string jobId)
        {
            SyncJobModel _syncjobmodel = new SyncJobModel();
            _syncjobmodel.ID = jobId;

            _syncjobmodel.SyncJRelIModelList = _syncjreliDal.GetModelList(jobId);
            var syncJRelIModel = _syncjobmodel.SyncJRelIModelList.FirstOrDefault();
            if (syncJRelIModel != null)
                _syncjobmodel.KnowledgeID = syncJRelIModel.KnowledgeID;
            var jRelIModel = _syncjobmodel.SyncJRelIModelList.FirstOrDefault();
            if (jRelIModel != null)
                _syncjobmodel.KnowledgeName = jRelIModel.KnowledgeName;
            return _syncjobmodel;
        }




        /// <summary>
        /// 提交同步学习答题
        /// </summary>
        /// <param name="syncModel"></param>
        /// <returns></returns>
        public bool SumbitSyncItem(SyncJAnswerModel syncModel)
        {
            bool result = false;
            EI_SyncJAnswer _eisyncjanswer = new EI_SyncJAnswer();
            _eisyncjanswer.ID = Guid.NewGuid().ToString();
            _eisyncjanswer.JID = syncModel.JID;
            _eisyncjanswer.SID = syncModel.SID;
            _eisyncjanswer.ItemID = syncModel.ItemID;
            _eisyncjanswer.Answer = syncModel.Answer;
            _eisyncjanswer.NoteContent = syncModel.NoteContent;
            _eisyncjanswer.Accuracy = syncModel.Accuracy;
            _eisyncjanswer.AnswerTime = syncModel.AnswerTime;
            _eisyncjanswer.Accumulated = syncModel.Accumulated;
            _eisyncjanswer.CreateTime = DateTime.Now;
            #region 1、不存在增加;2、存在修改
            if (_syncjanswerDal.Exists(syncModel.JID, syncModel.ItemID.ToString()))
            {
                result = _syncjanswerDal.Update(_eisyncjanswer);
            }
            else
            {
                result = _syncjanswerDal.Add(_eisyncjanswer);
            }
            #endregion

            return result;
        }

        /// <summary>
        /// 获取累计用时
        /// </summary>
        /// <param name="jobId"></param>
        /// <returns></returns>
        public int GetAccumulated(string jobId)
        {
            return _syncjanswerDal.GetSum(jobId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public SyncJAnswerModel GetAnswerModel(string jobId, string itemId)
        {
            return _syncjanswerDal.GetModel(jobId, itemId);
        }

        /// <summary>
        /// 向错题本中插入数据同时更新同步学习和弱项提分
        /// </summary>
        /// <param name="idlist"></param>
        /// <returns></returns>
        public int InsertWrongList(ShowAnalysisModel showmodel)
        {
            int result = 0;
            // result = _syncjanswerDal.InsertWrongList(showmodel);
            EI_SyncJob _eisyncjob = new EI_SyncJob();

            if (_syncjobDal.Exists(showmodel.jobId))
            {
                // Math.Round((decimal)x / y, 2);
                //更新数据
                _eisyncjob.ID = showmodel.jobId;
                _eisyncjob.MasterRate = (int)((Math.Round((decimal)(10 - result) / 10, 2)) * 100) + "%";
                _eisyncjob.RuleType = showmodel.ruletype;
                _eisyncjob.KnowledgeID = Convert.ToInt32(showmodel.knid);
                var dataList = GetSysModelList(showmodel.knid, showmodel.sid, showmodel.subjectid).Where(x => x.RuleType == 0).ToList();

                if (((10 - result) / 10) == 1)
                {
                    int TropNumber = 0;
                    var flag = 1;
                    foreach (var item in dataList)
                    {
                        if (item.MasterRate == "100%")
                        {
                            flag++;
                        }
                    }
                    if (flag == 1)
                    {
                        TropNumber = _syncjobDal.GetTropNumber(showmodel.sid, showmodel.knid, showmodel.ruletype.ToString()) + 1;
                    }
                    else if (flag == 3)
                    {
                        TropNumber = _syncjobDal.GetTropNumber(showmodel.sid, showmodel.knid, showmodel.ruletype.ToString()) + 1;
                    }
                    else if (flag == 5)
                    {
                        TropNumber = _syncjobDal.GetTropNumber(showmodel.sid, showmodel.knid, showmodel.ruletype.ToString()) + 1;
                    }
                    _eisyncjob.TropNumber = TropNumber;
                }


                _eisyncjob.RoundNumber = _syncjobDal.GetRoundNumber(showmodel.sid, showmodel.knid, showmodel.ruletype.ToString()) + 1;
                _syncjobDal.UpdateTrop(_eisyncjob);

            }


            return result;
        }


        #region 添加揪错信息
        /// <summary>
        /// 添加揪错信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddCorrection(CorrectionModel model)
        {
            var result = _questionbank.AddResource(model);

            if (result == Climb.Core.OperateType.OperateOk)
            {
                return true;
            }
            return false;
        }
        #endregion

        /// <summary>
        /// 根据知识点ID和学生ID获取信息
        /// </summary>
        /// <param name="kid"></param>
        /// <param name="sid"></param>
        /// <returns></returns>

        public List<EI_SyncJob> GetSysModelList(string kid, string sid, string subjectid)
        {
            return _syncjobDal.GetSysModelList(kid, sid, subjectid);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sID"></param>
        /// <param name="experNumber"></param>
        /// <returns></returns>
        public bool InsertExcptValue(string sID, int experNumber)
        {
            return _syncjobDal.InsertExceptValue(sID, experNumber);
        }

        /// <summary>
        /// 提交选型集合
        /// </summary>
        /// <param name="modelList"></param>
        /// <returns></returns>
        public bool SumbitSyscList(List<EI_SyncJAnswer> modelList)
        {
            return _syncjanswerDal.Add(modelList);
        }

        /// <summary>
        ///同步学习提交选项
        /// </summary>
        /// <param name="syncJobModel"></param>
        /// <returns></returns>
        public string SumbitSyscList(SyncJobModel syncJobModel)
        {
            return _syncjanswerDal.SumbitList(syncJobModel);
        }

        /// <summary>
        /// 测评分析提交选项
        /// </summary>
        /// <param name="syncJobModel"></param>
        /// <returns></returns>
        public string SumbitTestAnalyList(SyncJobModel syncJobModel)
        {
            return _syncjanswerDal.SumbitTestAnalyList(syncJobModel);
        }
    }
}
