using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Mfg.EI.InterFace;
using Mfg.EI.WeiXin.ViewModel;
using Mfg.EI.ViewModel;



namespace Mfg.EI.WeiXin.Web.Controllers
{
    public class HistoryController : BaseController
    {
        private IHomeWork _homework;
        private ITestAnalysis _testAnalysis;
        //private static log4net.ILog _log = log4net.LogManager.GetLogger("LogFile");
        private const int NameLength = 17;
        public HistoryController(IHomeWork homework, ITestAnalysis testAnalysis)
            : base(new Authenticate.Authenticate(), new Mfg.EI.InterFace.WeiXin.WeiXin(new Mfg.EI.InterFace.HomeWork(new Mfg.EI.InterFace.Question()), new Mfg.EI.InterFace.Student(), new Mfg.EI.InterFace.ExamOnline(new Mfg.EI.InterFace.Question()), new Mfg.EI.InterFace.Wrong(new Mfg.EI.InterFace.Question())))
        {
            this._homework = homework;
            this._testAnalysis = testAnalysis;
        }
        //
        // GET: /History/



        public ActionResult ErorrHistory()
        {
            return View();
        }

        #region 作业模块
        [Login]
        /// <summary>
        /// 作业详情
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public ActionResult JobInfo(string jobId, int pageIndex = 0)
        {
            try
            {
                int total = 0;

                var model = _WeiXin.GetJobDetialByJobID(jobId, _auth.Student.StuID, pageIndex, out total);
                if (total > 1)
                {
                    string _previous = string.Empty;
                    string _next = string.Empty;
                    string pcss = "bgskin";
                    string ncss = "bgskin";
                    if (pageIndex == 0)
                    {
                        pcss = "bg9";
                    }
                    if (pageIndex == total - 1)
                    {
                        ncss = "bg9";
                    }
                    if (pageIndex > 0 && pageIndex < total)
                    {
                        _previous = @"href='/History/JobInfo.html?pageIndex=" + (pageIndex - 1) + "&jobId=" + jobId + "'";
                    }
                    if (pageIndex < total - 1)
                    {
                        _next = @"href='/History/JobInfo.html?pageIndex=" + (pageIndex + 1) + "&jobId=" + jobId + "'";
                    }
                    model.Pager = @"<div class='tc pt30'><a class='btn1 " + pcss + " colW ' " + _previous + ">上一题</a><a class='btn1 " + ncss + " colW' " + _next + ">下一题</a></div>";
                }
                model.JobName = model.JobName.Length > NameLength ? model.JobName.Substring(0, NameLength) + "..." : model.JobName;
                return View(model);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return null;
            }
        }

        [Login]
        /// <summary>
        /// 已作答作业详情
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public ActionResult AJobInfo(string jobId, int pageIndex = -1)
        {
            int total = 0;

            if (pageIndex == -1)
            {
                return RedirectToAction("JobCommnet", "History", new { jobId });
            }
            else
            {
                var model = _WeiXin.GetAnswerDetialByJobID(jobId, _auth.Student.StuID, pageIndex, out total);
                if (total > 0)
                {
                    string _previous = string.Empty;
                    string _next = string.Empty;
                    string pcss = "bgskin";
                    string ncss = "bgskin";

                    if (pageIndex > 0 && pageIndex < total)
                    {
                        _previous = @"href='/History/AJobInfo.html?pageIndex=" + (pageIndex - 1) + "&jobId=" + jobId + "'";
                    }
                    if (pageIndex < total - 1)
                    {

                        _next = @"href='/History/AJobInfo.html?pageIndex=" + (pageIndex + 1) + "&jobId=" + jobId + "'";
                    }
                    //
                    if (pageIndex == 0)
                    {
                        _previous = @"href='/History/AJobInfo.html?pageIndex=" + (pageIndex - 1) + "&jobId=" + jobId + "'";
                        model.Pager = @"<div class='tc pt30'><a class='btn1 " + pcss + " colW ' " + _previous +
                                      ">查看评语</a>";
                        if (total > 1)
                        {
                            model.Pager += "<a class='btn1 " + ncss + " colW' " + _next + ">下一题</a>";
                        }
                        model.Pager += "</div>";
                        return View(model);
                    }
                    if (pageIndex == total - 1)
                    {
                        ncss = "bg9";
                    }
                    model.Pager = @"<div class='tc pt30'><a class='btn1 " + pcss + " colW ' " + _previous + ">上一题</a><a class='btn1 " + ncss + " colW' " + _next + ">下一题</a></div>";
                }
                model.JobName = model.JobName.Length > NameLength ? model.JobName.Substring(0, NameLength) + "..." : model.JobName;
                return View(model);
            }

        }

        [Login]
        public ActionResult JobCommnet(string jobId)
        {
            int total;
            var model = _WeiXin.GetAnswerDetialByJobID(jobId, _auth.Student.StuID, 0, out total);
            if (total > 0)
            {
                string _next = string.Empty;

                string ncss = "bgskin";

                _next = @"href='/History/AJobInfo.html?pageIndex=" + 0 + "&jobId=" + jobId + "'";
                model.Pager = @"<div class='tc pt30'><a class='btn1 " + ncss + " colW' " + _next + ">查看试题</a></div>";
            }
            model.JobName = model.JobName.Length > NameLength ? model.JobName.Substring(0, NameLength) + "..." : model.JobName;
            return View(model);

        }

        [Login]
        /// <summary>
        /// 作业历史记录
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="subID"></param>
        /// <param name="states"></param>
        /// <returns></returns>
        public ActionResult JobHistory(int pageIndex = 1, int subID = 0, int states = -1)
        {
            int totalCount = 0;
            JobHistory model = new ViewModel.JobHistory();
            var OpenId = _auth.WeiXinUser.UserID;
            string Mfgid = _auth.Student.StuID;

            var dic = new Dictionary<string, object>();
            if (!string.IsNullOrEmpty(Mfgid))
            {
                dic.Add("SID", Mfgid);
            }
            if (subID > 0)
            {
                dic.Add("SubjectID", subID);
            }
            if (states > -1)
            {
                dic.Add("StuState", states);
            }
            dic.Add("CurrentPage", pageIndex);
            model.JobList = _homework.LoadJobList2Weixin(dic, out totalCount);
            model.JobList.ForEach(m => { m.Name = m.Name.Length > NameLength ? m.Name.Substring(0, NameLength) + "..." : m.Name; });
            model.BindSubject = _WeiXin.SubList(Mfgid);

            if (totalCount > 10)
            {
                string _previous = string.Empty;
                string _next = string.Empty;
                int DataCount = 0;
                if (totalCount % 10 == 0) DataCount = totalCount / 10;
                else DataCount = totalCount / 10 + 1;
                string pcss = "bgskin";
                string ncss = "bgskin";
                if (pageIndex == 1)
                {
                    pcss = "bg9";
                }
                if (pageIndex == DataCount)
                {
                    ncss = "bg9";
                }
                if (pageIndex > 1)
                {
                    _previous = @"href='/History/JobHistory.html?pageIndex=" + (pageIndex - 1) + "&subID=" + subID + "&states=" + states + "'";
                }
                if (pageIndex < DataCount)
                {
                    _next = @"href='/History/JobHistory.html?pageIndex=" + (pageIndex + 1) + "&subID=" + subID + "&states=" + states + "'";
                }
                model.Pager = @"<div class='tc'><a class='btn1 " + pcss + " colW' " + _previous + ">上一页</a><a class='btn1 " + ncss + " colW' " + _next + ">下一页</a></div>";
            }
            model.subID = subID;
            model.states = states;
            return View(model);
        }
        #endregion

        #region 弱项
        [Login]
        public ActionResult Weaknesses(string subjectID, string dateTime)
        {
            WeaknessModel model = new WeaknessModel();
            try
            {
                subjectID = string.IsNullOrEmpty(subjectID) ? "2" : subjectID;
                dateTime = string.IsNullOrEmpty(dateTime) ? DateTime.Now.AddMonths(-1).ToString("yyyy-MM") : dateTime.Replace("/", "-");
                var OpenId = _auth.WeiXinUser.UserID;
                var appid = _auth.AppId.AppIds;
                var stuModel = _WeiXin.QueryStudentByWeiXin(OpenId, appid);
                string Mfgid = stuModel.Mfgid;
                model.SName = stuModel.Name;
                model.SubjectID = int.Parse(subjectID);
                model.DateMonth = dateTime;
                model.Month = dateTime.Substring(dateTime.Length - 2, 2);
                model.Month = Convert.ToInt32(model.Month) < 10 ? model.Month.Replace("0", "") : model.Month;
                List<TestAnalysisModel> top10 = new List<TestAnalysisModel>();
                _testAnalysis.GetKnowledgeAccuracy(Mfgid, subjectID, dateTime, out top10);
                model.WeakList = top10;
                model.BindSubject = _WeiXin.SubList(Mfgid);

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("查看弱项报错", ex);
            }
            return View(model);
        }
        #endregion

        #region 进步

        [Login]
        public ActionResult Progress(string subjectID, string dateTime)
        {
            StuProgessModel model = new StuProgessModel();

            try
            {
                subjectID = string.IsNullOrEmpty(subjectID) ? "2" : subjectID;
                dateTime = string.IsNullOrEmpty(dateTime)
                    ? DateTime.Now.AddMonths(-1).ToString("yyyy-MM")
                    : dateTime.Replace("/", "-");
                var OpenId = _auth.WeiXinUser.UserID;
                var appid = _auth.AppId.AppIds;
                var stuModel = _WeiXin.QueryStudentByWeiXin(OpenId, appid);
                string Mfgid = stuModel.Mfgid;
                model.SName = stuModel.Name;
                model.SubjectID = int.Parse(subjectID);
                model.DateMonth = dateTime;
                model.Month = dateTime.Substring(dateTime.Length - 2, 2);
                model.Month = Convert.ToInt32(model.Month) < 10 ? model.Month.Replace("0", "") : model.Month;
                var progessList = new List<AccuracyProgressModel>();
                progessList = _testAnalysis.GetStuProgess(Mfgid, subjectID, dateTime);
                model.ProgressList = progessList;

                model.BindSubject = _WeiXin.SubList(Mfgid);
                //return View(model);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("查看进步错误", ex);

            }
            return View(model);
        }
        #endregion

        #region 考试模块
        [Login]
        /// <summary>
        /// 考试记录列表
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="subID"></param>
        /// <param name="states"></param>
        /// <returns></returns>
        public ActionResult ExamHistory(int pageIndex = 1, int subID = 0, int states = -1)
        {
            try
            {
                int totalCount = 0;
                ExamHistory model = new ViewModel.ExamHistory();
                SearchObjModel condtion = new SearchObjModel();
                condtion.SID = _auth.Student.StuID;
                condtion.SubjectID = subID.ToString() == "0" ? "" : subID.ToString();
                condtion.StuState = states;
                condtion.CurrentPage = pageIndex;
                model.ExamList = _WeiXin.LoadExamList2Weixin(condtion, out totalCount);
                model.ExamList.ForEach(m => { m.Name = m.Name.Length > NameLength ? m.Name.Substring(0, NameLength) + "..." : m.Name; });
                model.BindSubject = _WeiXin.SubList(condtion.SID);
                model.states = states;
                model.subID = subID;
                if (totalCount > 10)
                {
                    string _previous = string.Empty;
                    string _next = string.Empty;
                    int DataCount = 0;
                    if (totalCount % 10 == 0) DataCount = totalCount / 10;
                    else DataCount = totalCount / 10 + 1;
                    string pcss = "bgskin";
                    string ncss = "bgskin";
                    if (pageIndex == 1)
                    {
                        pcss = "bg9";
                    }
                    if (pageIndex == DataCount)
                    {
                        ncss = "bg9";
                    }
                    if (pageIndex > 1)
                    {
                        _previous = @"href='/History/ExamHistory.html?pageIndex=" + (pageIndex - 1) + "&subID=" + subID + "&states=" + states + "'";
                    }
                    if (pageIndex < DataCount)
                    {
                        _next = @"href='/History/ExamHistory.html?pageIndex=" + (pageIndex + 1) + "&subID=" + subID + "&states=" + states + "'";
                    }
                    model.Pager = @"<div class='tc'><a class='btn1 " + pcss + " colW' " + _previous + ">上一页</a><a class='btn1 " + ncss + " colW' " + _next + ">下一页</a></div>";

                }

                return View(model);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return View(new ExamHistory());

            }
        }

        [Login]
        /// <summary>
        /// 考试详情，未回答
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public ActionResult ExamInfo(string examId, int pageIndex = 0)
        {
            try
            {
                int total = 0;
                var model = _WeiXin.GetExamDetialByExamID(examId, _auth.Student.StuID, pageIndex, out total);
                if (total > 1)
                {
                    string _previous = string.Empty;
                    string _next = string.Empty;
                    string pcss = "bgskin";
                    string ncss = "bgskin";
                    if (pageIndex == 0)
                    {
                        pcss = "bg9";
                    }
                    if (pageIndex == total - 1)
                    {
                        ncss = "bg9";
                    }
                    if (pageIndex > 0 && pageIndex < total)
                    {
                        _previous = @"href='/History/ExamInfo.html?pageIndex=" + (pageIndex - 1) + "&examId=" + examId + "'";
                    }
                    if (pageIndex < total - 1)
                    {
                        _next = @"href='/History/ExamInfo.html?pageIndex=" + (pageIndex + 1) + "&examId=" + examId + "'";
                    }
                    model.Pager = @"<div class='tc pt30'><a class='btn1 " + pcss + " colW' " + _previous +
                                  ">上一题</a><a class='btn1 " + ncss + " colW' " + _next + ">下一题</a></div>";
                }
                model.ExamName = model.ExamName.Length > NameLength ? model.ExamName.Substring(0, NameLength) + "..." : model.ExamName;
                return View(model);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("", ex);
                return null;
            }

        }

        [Login]
        /// <summary>
        /// 考试详情，已回答
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public ActionResult AExamInfo(string examId, int pageIndex = -1)
        {
            if (pageIndex == -1)
            {
                return RedirectToAction("ExamCommnet", "History", new { examId });
            }

            int total = 0;
            var model = _WeiXin.GetExamAnswerDetialByExamID(examId, _auth.Student.StuID, pageIndex, out total);
            if (total > 0)
            {
                string _previous = string.Empty;
                string _next = string.Empty;
                string pcss = "bgskin";
                string ncss = "bgskin";

                if (pageIndex == total - 1)
                {
                    ncss = "bg9";
                }
                if (pageIndex > 0 && pageIndex < total)
                {
                    _previous = @"href='/History/AExamInfo.html?pageIndex=" + (pageIndex - 1) + "&examId=" + examId + "'";
                }
                if (pageIndex < total - 1)
                {
                    _next = @"href='/History/AExamInfo.html?pageIndex=" + (pageIndex + 1) + "&examId=" + examId + "'";
                }
                if (pageIndex == 0)
                {
                    _previous = @"href='/History/AExamInfo.html?pageIndex=" + (pageIndex - 1) + "&examId=" + examId + "'";
                    model.Pager = @"<div class='tc pt30'><a class='btn1 " + pcss + " colW ' " + _previous + ">查看评语</a>";
                    if (total > 1)
                    {
                        model.Pager += "<a class='btn1 " + ncss + " colW' " + _next + ">下一题</a>";
                    }
                    model.Pager += "</div>";
                    return View(model);
                }
                model.Pager = @"<div class='tc pt30'><a class='btn1 " + pcss + " colW' " + _previous + ">上一题</a><a class='btn1 " + ncss + " colW' " + _next + ">下一题</a></div>";
            }
            model.ExamName = model.ExamName.Length > NameLength ? model.ExamName.Substring(0, NameLength) + "..." : model.ExamName;
            return View(model);

        }
        [Login]
        public ActionResult ExamCommnet(string examId)
        {
            int total;
            var model = _WeiXin.GetExamAnswerDetialByExamID(examId, _auth.Student.StuID, 0, out total);
            if (total > 0)
            {
                string _next = string.Empty;

                string ncss = "bgskin";

                _next = @"href='/History/AExamInfo.html?pageIndex=" + 0 + "&examId=" + examId + "'";

                model.Pager = @"<div class='tc pt30'><a class='btn1 " + ncss + " colW' " + _next + ">查看试题</a></div>";
            }
            model.ExamName = model.ExamName.Length > NameLength ? model.ExamName.Substring(0, NameLength) + "..." : model.ExamName;
            return View(model);

        }
        #endregion

        #region 错题本
        [Login]
        public ActionResult WrongBook(string subjectId = "2", int pageIndex = 0)
        {
            try
            {

                int total;
                int alltotal;
                var model = _WeiXin.GetWrongItem(_auth.Student.StuID, subjectId, pageIndex, out total, out alltotal);
                if (model == null)
                {
                    model = new StudentWrongItemModel();
                    model.SubjectID = Convert.ToInt32(subjectId);
                }
                ViewBag.allTotal = alltotal;
                ViewBag.Current = pageIndex + 1;
                if (total > 1)
                {
                    string _previous = string.Empty;
                    string _next = string.Empty;
                    string pcss = "bgskin";
                    string ncss = "bgskin";
                    if (pageIndex == 0)
                    {
                        pcss = "bg9";
                    }
                    if (pageIndex == alltotal - 1)
                    {
                        ncss = "bg9";
                    }
                    if (pageIndex > 0 && pageIndex < alltotal)
                    {
                        _previous = @"href='/History/WrongBook.html?pageIndex=" + (pageIndex - 1) + "&subjectId=" + subjectId +
                                    "'";
                    }
                    if (pageIndex < alltotal - 1)
                    {
                        _next = @"href='/History/WrongBook.html?pageIndex=" + (pageIndex + 1) + "&subjectId=" + subjectId + "'";
                    }
                    model.Pager = @"<div class='tc pt30'><a class='btn1 " + pcss + " colW' " + _previous +
                                  ">上一题</a><a class='btn1 " + ncss + " colW' " + _next + ">下一题</a></div>";
                }
                var BindSubject = _WeiXin.SubList(_auth.Student.StuID);
                ViewBag.BindSubject = BindSubject;
                return View(model);
            }
            catch (Exception ex)
            {
                Common.LogHelperNet.Error("", ex);
                return null;
            }

        }
        #endregion

    }
}
