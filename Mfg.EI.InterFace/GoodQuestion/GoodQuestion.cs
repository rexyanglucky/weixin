
/*
 * author:yangjin;
 * function:好题
 * date:2015-05-26
 * version:
 */

using System.Runtime.InteropServices;
using Mfg.EI.Common;
using Mfg.EI.InterFace.GoodPaper;
using Mfg.EI.ViewModel;

using Mfg.Resource.ApiClient;
using Mfg.Resource.Entity;
using Mfg.UserCenter.Comm.UserInfo.BLL;
using System;
using System.Collections.Generic;
using System.Linq;
using OperateResult;
using Mfg.EI.DAL;
using System.Configuration;

namespace Mfg.EI.InterFace
{
    public class GoodQuestion : IGoodQuestion
    {
        private const string key = "what are u 弄啥咧";
        private IQuestion _questionbank;
        private TagKeepDal _tagKeepDal = new TagKeepDal();



        private const int pageSize = 10;
        public GoodQuestion(IQuestion question)
        {
            _questionbank = question;
        }

        #region 获取精品试题

        /// <summary>
        /// 精品试题的集合
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="totalCount">总数</param>
        /// <param name="pno">页码</param>
        /// <param name="pageSize">每页显示数量</param>
        /// <returns></returns>
        //public List<QuestionExtModel> GetGoodQuestion(TagKeepModel model, QuestionModel dto, ref int totalCount, int pno = 1, int pageSize = 10)
        //{
        //    try
        //    {
        //        List<QuestionExt> ResultList = new List<QuestionExt>() { };
        //        List<QuestionExtModel> questionExtList = new List<QuestionExtModel>() { };
        //        var resource = new ResourceApi().GetQuestionQuery(dto.SubjectID);
        //        //试卷类型 0 全部 1其中 2 期末 3 模拟 7中考  9 高考 10小考
        //        var paperItems = _questionbank.QueryQuestionPapertype(dto, ref totalCount, pno, pageSize);
        //        ResultList.AddRange(paperItems);

        //        List<TagKeepModel> tagKeepList = GetTagKeep(model);

        //        string items = string.Join(",", tagKeepList.Select(m => m.ItemID).ToList());

        //        foreach (var item in ResultList)
        //        {
        //            questionExtList.Add(new QuestionExtModel()
        //            {
        //                f_answer = item.f_answer,
        //                f_body = item.f_body,
        //                f_city = item.f_city,
        //                f_class = item.f_class,
        //                f_county = item.f_county,
        //                f_difficulty = item.f_difficulty,
        //                f_id = item.f_id,
        //                f_mainsec = item.f_mainsec,
        //                f_mainsec1 = item.f_mainsec1,
        //                f_papername = item.f_papername,
        //                f_province = item.f_province,
        //                f_schollname = item.f_schollname,
        //                f_style = item.f_style,
        //                f_ways = item.f_ways,
        //                f_year = item.f_year,
        //                IsCollcet = items.Contains(item.f_id.ToString()) ? 0 : 1
        //            });
        //        }


        //        return questionExtList;

        //    }
        //    catch (Exception ex)
        //    {
        //        Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
        //        return null;
        //    }
        //}



        #endregion
        #region 获取精品试卷

        /// <summary>
        /// 好卷列表
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="grade"></param>
        /// <param name="term"></param>
        /// <param name="examType"></param>
        /// <param name="examVersion"></param>
        /// <param name="orderByName"></param>
        /// <param name="pno"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        public List<ETaoPaper> GetGoodPaper(string subjectId, string grade, string examType, string examVersion, string orderByName, int pno, out int totalCount)
        {
            totalCount = 0;
            totalCount = -1;
            try
            {
                var tsjApi = new GoodPaper.tsjAPI();
                tsjApi.Url = ConfigurationManager.AppSettings["taoshijuan_service"];

                //0 时间降序，1 热度降序，2年份
                if (orderByName.Trim().Equals("year"))
                {
                    orderByName = "0";
                }
                else if (orderByName.Trim().Equals("previewCount"))
                {
                    orderByName = "1";
                }
                else
                {
                    orderByName = "2";
                }

                var papers = tsjApi.GetPaperList(key, subjectId, grade, "", examType, examVersion, pno, pageSize, orderByName,
                    out totalCount);
                return papers.ToList();
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("调用好卷接口失败", ex);
            }
            return null;

        }
        public List<ETaoPaper> SearchGoodPaper(string subjectId, string name, string orderByName, int pno, out int totalCount)
        {
            totalCount = 0;
            try
            {
                var tsjApi = new GoodPaper.tsjAPI();
                tsjApi.Url = ConfigurationManager.AppSettings["taoshijuan_service"];
                //0 时间降序，1 热度降序，2年份
                //if (orderByName.Equals("year"))
                //{
                //    orderByName = "0";
                //}
                //else if (orderByName.Equals("previewCount"))
                //{
                //    orderByName = "1";
                //}
                //else
                //{
                //    orderByName = "2";
                //}
                var papers = tsjApi.GetPaperSearch(key, subjectId, name, pno, pageSize, out totalCount);
                return papers.ToList();
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("调用好卷接口失败", ex);
            }
            return null;

        }

        /// <summary>
        /// 根据id集合获取试卷列表
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="ids"></param>
        /// <param name="pno"></param>
        /// <returns></returns>
        public List<ETaoPaper> GetPaperList(string subjectId, List<int> ids, int pno)
        {
            try
            {
                if (ids.Any())
                {
                    var tsjApi = new GoodPaper.tsjAPI();
                    tsjApi.Url = ConfigurationManager.AppSettings["taoshijuan_service"];
                    if (pno == 0)
                        pno = 1;


                    var papers = tsjApi.GetPapers(key, "0" + subjectId, ids.ToArray(), pno, ids.Count());

                    return papers.ToList();
                }

            }
            catch (Exception ex)
            {
                LogHelperNet.Error("调用好卷接口失败", ex);
            }
            return null;
        }

        #endregion

        public List<TagPointModel> GetTagKeep(int TID, string SubjectID)
        {
            return new TagKeepDal().GetTagKeep(TID, SubjectID);
        }


        public List<TagKeepModel> GetTagKeepData(string TID, int KnowledgeID, string SubjectID)
        {
            return new TagKeepDal().GetTagKeepData(TID, KnowledgeID, SubjectID);
        }





        public ETaoPaper GetPaperDetial(string subjectid, string paperId)
        {
            try
            {
                // return null;
                var tsjApi = new GoodPaper.tsjAPI();
                tsjApi.Url = ConfigurationManager.AppSettings["taoshijuan_service"];
                var paper = tsjApi.GetPaperDetail(key, subjectid, paperId);

                return paper;
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("调用好卷接口失败", ex);
                return null;
            }
        }




        public byte[] DownLoadPaper(string subjectid, string paperId)
        {
            try
            {
                var tsjApi = new GoodPaper.tsjAPI();
                tsjApi.Url = ConfigurationManager.AppSettings["taoshijuan_service"];
                var downLoadPath = tsjApi.GetDownPath(key, subjectid, paperId);
                return RequestHelper.DownloadFile(downLoadPath);

            }
            catch (Exception ex)
            {
                LogHelperNet.Error("调用好卷接口失败", ex);
                return null;
            }
        }


        #region 好题添加收藏
        /// <summary>
        /// 好题添加收藏
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool Add(TagKeepModel model)
        {
            return _tagKeepDal.Add(model);

        }
        #endregion

        #region 获取好题收藏
        /// <summary>
        /// 获取好题收藏
        /// </summary>
        /// <param name="model"></param>
        /// <param name="skip"></param>
        /// <param name="take"></param>
        /// <returns></returns>
        public List<QuestionExtModel> GetTagKeep(TagKeepModel model, int skip, int take, out int count)
        {
            List<QuestionExtModel> models = new List<QuestionExtModel>();
            var dataSet = _tagKeepDal.GetTagKeep(model, skip, take);
            count = 0;
            count = Convert.ToInt32(dataSet.Tables[0].Rows[0]["Count"]); ;

            List<TagKeepModel> tagKeepList = ModelConvertHelper<TagKeepModel>.ConvertToModelList(dataSet.Tables[1]);
            string subjectID = "";
            string itemlist = "";
            if (tagKeepList.Count <= 0)
            {
                return null;
            }

            var ItemIDs = tagKeepList.Select(m => m.ItemID).ToList();
            if (ItemIDs.Count > 0)
            {
                itemlist = string.Join(",", ItemIDs);
            }
            subjectID = "0" + tagKeepList[0].SubjectID;
            try
            {
                var questionList = _questionbank.FindByIdlist(subjectID, itemlist);

                if (questionList != null)
                {
                    foreach (var item in questionList)
                    {
                        models.Add(new QuestionExtModel()
                        {
                            f_answer = item.f_answer,
                            f_body = item.f_body,
                            f_city = "",
                            f_class = item.f_class,
                            f_county = "",
                            f_difficulty = item.f_difficulty,
                            f_id = item.f_id,
                            f_mainsec = item.f_mainsec,
                            f_mainsec1 = item.f_mainsec1,
                            f_papername = "",
                            f_province = "",
                            f_schollname = "",
                            f_style = item.f_style,
                            f_ways = item.f_ways,
                            f_year = "",
                            IsCollcet = 0 //已收藏
                        });
                    }
                }
                else
                {
                    return null;
                }
            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用接口 _questionbank.FindByIdlist失败,参数为:{0},{1}", subjectID, itemlist), ex);
                return null;
            }
            return models;

        }
        #endregion


        #region 获取好题收藏
        /// <summary>
        /// 获取好题收藏
        /// </summary>
        /// <param name="model"></param>
        /// <param name="skip"></param>
        /// <param name="take"></param>
        /// <returns></returns>
        public List<TagKeepModel> GetTagKeep(TagKeepModel model)
        {
            var dataSet = _tagKeepDal.GetTagKeep(model, 0, 99999);
            List<TagKeepModel> tagKeepList = ModelConvertHelper<TagKeepModel>.ConvertToModelList(dataSet.Tables[1]);
            return tagKeepList;
        }
        #endregion

        #region 删除好题收藏
        /// <summary>
        /// 删除好题收藏
        /// </summary>
        /// <param name="tID"></param>
        /// <param name="itemID"></param>
        /// <returns></returns>
        public bool DeleteTagKeepData(string tID, int itemID)
        {
            var rows = _tagKeepDal.DeleteTagKeepData(tID, itemID);
            return rows > 0;

        }
        #endregion


        public List<TagModel> GetTag()
        {
            return new TagKeepDal().GetTag();
        }


    }
}
