/*
 * author:谢利民;
 * function:题目相关功能的接口
 * date:2015-04-16
 * version:
 */

using Climb.Core;
using Mfg.EI.Common;
using Mfg.EI.ViewModel;
//using Mfg.Resource.ResourceApi;
using Mfg.Resouce.Models;
using Mfg.Resource.ApiClient;
using Mfg.UserCenter.Comm.UserInfo.BLL;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Mfg.EI.InterFace
{
    public class Question : IQuestion
    {




        public List<Mfg.Resouce.Models.Tchmaterial> GetGradeList(QuestionModel dto)
        {
            try
            {
                if (dto.ID == "1") //获取小年级上、下级 
                {
                    return
                        ResourceQueryClient.ResourceQueryClient.Query.CreateTchmaterialQuery("CResource").GetSmallGradeList(dto.SubjectID, dto.edition, dto.grade, dto.edu);
                }
                //return new ResourceApi().GetTchmaterial().GetSmallGradeList(dto.SubjectID, dto.edition, dto.grade, dto.edu);
                else //获取大年级上、下级
                {
                    var res = ResourceQueryClient.ResourceQueryClient.Query.CreateTchmaterialQuery("CResource").GetGradeList(dto.SubjectID, dto.edition, dto.grade, dto.edu);

                    if (dto.edu == 1 && dto.grade == "c")
                    {
                        var x = (from i in res
                                 where i.f_class.StartsWith("x")
                                 //orderby i.f_class, i.f_term ascending
                                 select i).ToList();

                        var c = (from i in res
                                 where i.f_class.StartsWith("c")
                                 //orderby i.f_class, i.f_term ascending
                                 select i).ToList();

                        res = new List<Tchmaterial>();
                        res.AddRange(x);
                        res.AddRange(c);
                    }

                    return res;
                }
                //return new ResourceApi().GetTchmaterial().GetGradeList(dto.SubjectID, dto.edition, dto.grade, dto.edu);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        #region  题目相关功能的操作

        /// <summary>
        /// 
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="ItemId">试题ID集合，以逗号隔开</param>
        /// <param name="sanswer"></param>
        /// <returns></returns>
        public Dictionary<string, bool> IsQuesCorrect(string subjectId, string ItemId, List<string> sanswer)
        {
            Dictionary<string, bool> dictList = new Dictionary<string, bool>();
            try
            {
                List<Mfg.Resouce.Models.Question> listQuestion = FindByIdlist(subjectId, ItemId);
                if (listQuestion.Count > 0)
                {
                    for (var i = 0; i < listQuestion.Count; i++)
                    {
                        ////todo
                        //if (listQuestion[i].f_isold == 0)
                        //{
                        //    var _abcd = JsonConvert.DeserializeObject<List<string[]>>(listQuestion[i].f_answer);
                        //    listQuestion[i].f_answer = _abcd.First().First();
                        //}


                        //if (!string.IsNullOrEmpty(listQuestion[i].f_answer))
                        //{
                        //    var stranswer = listQuestion[i].f_answer;
                        //    // var stranswer = listQuestion[i].f_answerok.Trim().Replace("<table style=\"word-break:break-all;\" width=\"650\" ><tr><td>", "").Replace("</td></tr></table>", "").Trim();
                        //    if (stranswer == sanswer[i].ToString())
                        //    {
                        //        dictList.Add(listQuestion[i].f_id.ToString(), true);
                        //        continue;
                        //    }
                        //}
                        var qv = new QuestionItemViewModel(listQuestion[i], Convert.ToInt32(subjectId));
                        dictList.Add(listQuestion[i].f_id.ToString(), sanswer[i].ToUpper() == qv.f_answer.ToUpper());
                        //dictList.Add(listQuestion[i].f_id.ToString(), false);
                    }
                }
            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用FindByIdlist接口出错,参数为({0})", subjectId + "|" + ItemId), ex);
                return new Dictionary<string, bool>();
            }


            return dictList;
        }






        /// <summary>
        /// 判題
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="ItemId"></param>
        /// <param name="sanswer"></param>
        /// <returns>題目ID，该题正确率</returns>
        public Dictionary<string, double> QuesCorrect(string subjectId, string ItemId, List<string> sanswer)
        {

            Dictionary<string, double> dictList = new Dictionary<string, double>();
            try
            {
                List<Mfg.Resouce.Models.Question> listQuestion = FindByIdlist(subjectId, ItemId);
                if (listQuestion.Count > 0)
                {
                    for (var i = 0; i < listQuestion.Count; i++)
                    {
                        var qv = new QuestionItemViewModel(listQuestion[i], Convert.ToInt32(subjectId));
                        if (qv.IsMultipeSelect)
                        {
                            #region MyRegion
                            //int answerCount = qv.f_answer.Length;
                            //int right = 0;
                            //foreach (var item in sanswer[i])
                            //{
                            //    if (qv.f_answer.ToUpper().Contains(item.ToString().ToUpper()))
                            //    {
                            //        right++;
                            //    }
                            //    else
                            //    {
                            //        dictList.Add(listQuestion[i].f_id.ToString(), 0);
                            //        break;
                            //    }
                            //}
                            //dictList.Add(listQuestion[i].f_id.ToString(), Math.Round((double)right / answerCount, 3)); 
                            #endregion

                            dictList.Add(listQuestion[i].f_id.ToString(),
                                qv.f_answer.ToUpper().Contains(sanswer[i].ToUpper())
                                    ? Math.Round((double)sanswer[i].Length / qv.f_answer.Length, 3)
                                    : 0);
                        }
                        else
                        {
                            dictList.Add(listQuestion[i].f_id.ToString(), sanswer[i].ToUpper() == qv.f_answer.ToUpper() ? 1 : 0);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用FindByIdlist接口出错,参数为({0})", subjectId + "|" + ItemId), ex);
                return new Dictionary<string, double>();
            }
            return dictList;
        }

        #endregion

        public List<Edition> QueryEditionlist(string bgrade, string subject, int edu)
        {

            //edu 54 63
            try
            {

                if (bgrade == "g")
                {
                    edu = 0;
                }
                var res = ResourceQueryClient.ResourceQueryClient.Query.CreateTchmaterialQuery("CResource").QueryEditionTchmaterialList(bgrade, subject, edu);
                //var res = ResourceQueryClient.ResourceQueryClient.Query.CreateEditionQuery("CResource").QueryEdition("", bgrade, subject, edu);
                return res;
                /*
                 return new ResourceApi().GetTchmaterial().QueryEditionTchmaterialList(bgrade, subject, edu);*/
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        public List<Edition> QueryEditionlistOld(string bgrade, string subject)
        {
            try
            {

                return ResourceQueryClient.ResourceQueryClient.Query.CreateEditionQuery("CResource").QueryEdition("", bgrade, subject);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        public List<Book> QueryBookPoint(QuestionModel dto)
        {
            try
            {
                return ResourceQueryClient.ResourceQueryClient.Query.CreateBookQuery(dto.SubjectID).QueryBook(dto.edu, dto.edition, dto.grade, dto.term);
                //return new ResourceApi().GetPoinQuery(dto.SubjectID)
                //    .QueryBookPoint(dto.edu, dto.edition, dto.grade, dto.term, dto.qcount);
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
        /// <param name="dto"></param>
        /// <returns></returns>
        public List<Tchmaterial> QueryBookEdition(QuestionModel dto)
        {
            try
            {
                return ResourceQueryClient.ResourceQueryClient.Query.CreateTchmaterialQuery("CResource").QueryTchmaterialList(dto.SubjectID, dto.edition);
                //return new ResourceApi().GetTchmaterial().QueryTchmaterialList(dto.SubjectID)
                //    .Where(a => a.f_edition == dto.edition).ToList();
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        public List<Book> QueryBookDetail(QuestionModel dto)
        {
            try
            {

                return ResourceQueryClient.ResourceQueryClient.Query.CreateBookQuery(dto.SubjectID).QueryBook(dto.edtitionType);
                //return ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery(dto.SubjectID).QueryPoint(dto.edtitionType);
                //return new ResourceApi().GetPoinQuery(dto.SubjectID).QueryBookPoint(dto.edtitionType);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        public List<Point> QueryBookSec(QuestionModel dto)
        {
            try
            {
                switch (dto.grade.ToLower().First().ToString())
                {
                    case "x":
                    case "c":
                        return ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery(dto.SubjectID).QueryPoint(dto.edu, dto.grade);
                    //return new ResourceApi().GetPoinQuery(dto.SubjectID)
                    //    .QueryBookSec(dto.edu, dto.grade, dto.qcount);
                    case "g":
                        return ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery(dto.SubjectID).QueryPointSec(dto.grade.First().ToString(), Convert.ToInt32(dto.artScience));
                    //return new ResourceApi().GetPoinQuery(dto.SubjectID)
                    //    .QueryBookSec(dto.grade, dto.artScience, dto.qcount);
                    default:
                        return null;
                }
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        public List<Mfg.Resouce.Models.Question> QueryMainSecClassDiff(QuestionModel dto, ref int TotalNumber)
        {
            try
            {
                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(dto.SubjectID).FindMainSecClassDiff(dto.styleareaid, dto.f_id, dto.grade, dto.diff, dto.pNumber, dto.pageSize, out TotalNumber);
                //return new ResourceApi().GetQuestionQuery(dto.SubjectID)
                //    .FindMainSecClassDiff(dto.styleareaid, dto.f_id, dto.grade, dto.diff, ref TotalNumber, dto.pNumber,
                //        dto.pageSize);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        /// <summary>
        /// 获取科目下题型
        /// </summary>
        /// <param name="subjectID"></param>
        /// <returns></returns>
        public List<QuestionStyleBase> GetStyle(string subjectID, string f_bclass)
        {
            try
            {
                switch (subjectID)
                {
                    case "01":
                    case "03":
                        var query = new QuestionStyleQuery();
                        query.f_subject = subjectID;
                        query.f_bclass = f_bclass;
                        int allc = 0;
                        return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionStyleQuery("CResource").QueryQuestionStyle(query, 1, int.MaxValue, out allc);

                    default:
                        List<QuestionStyleBase> list = new List<QuestionStyleBase>();
                        list.Add(new QuestionStyleBase() { f_id = 1, f_name = "选择题", f_styleareaid = 1, f_styleareaname = "选择题" });
                        list.Add(new QuestionStyleBase() { f_id = 2, f_name = "填空题", f_styleareaid = 2, f_styleareaname = "填空题" });
                        list.Add(new QuestionStyleBase() { f_id = 3, f_name = "解答题", f_styleareaid = 3, f_styleareaname = "解答题" });
                        return list;
                }
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }

        public QuestionStyleBase GetStyle(string subjectID, int f_styleid)
        {
            try
            {
                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionStyleQuery("CResource").QueryQuestionStyle(f_styleid);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        public QuestionStyleBase GetStyleDetial(int f_styleid)
        {
            try
            {
                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionStyleQuery("CResource").QueryQuestionStyle(f_styleid);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        public List<Mfg.Resouce.Models.Question> QueryMainSecClassDiffExts(QuestionModel dto, ref int TotalNumber)
        {
            try
            {
                TotalNumber = dto.TotalNumber;

                QuestionQuery query = new QuestionQuery();
                if (dto.IsTest)//大题
                    query.f_stylearea = dto.styleareaid;
                else
                {
                    switch (dto.SubjectID)
                    {
                        case "01":
                        case "03":
                            query.f_style = dto.styleareaid;
                            break;
                        default:
                            query.f_stylearea = dto.styleareaid;
                            break;
                    }
                }
                query.f_mainsec = dto.f_id;
                query.f_class = dto.grade;
                query.f_diffarea = dto.diff;
                if (dto.questionSort == 1)
                    query.OrderEnum = QuestionOrder.DiffAsc;
                else
                    query.OrderEnum = QuestionOrder.DiffDesc;

                //

                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(dto.SubjectID).QueryQuestions(query, dto.pNumber, dto.pageSize, out TotalNumber);

                //return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(dto.SubjectID).FindMainSecClassDiff(dto.styleareaid, dto.f_id, dto.grade, dto.diff, dto.pNumber, dto.pageSize, out TotalNumber);

                //return new ResourceApi().GetQuestionExtQuery(dto.SubjectID)
                //    .FindMainSecClassDiffExts(dto.styleareaid, dto.f_id, dto.grade, dto.diff, dto.questionSort, ref TotalNumber,
                //        dto.pNumber, dto.pageSize);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        /// <summary>
        /// 题库资源试题
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="TotalNumber"></param>
        /// <returns></returns>
        public List<Mfg.Resouce.Models.Question> ResQueryMainSecClassDiff(QuestionModel dto, ref int TotalNumber)
        {
            try
            {
                List<Mfg.Resouce.Models.Question> resultData = null;

                //系统
                if (dto.range == "0")
                {
                    QuestionQuery query = new QuestionQuery();
                    //query.f_stylearea = dto.styleareaid;
                    query.f_mainsec = dto.f_id;
                    query.f_class = dto.grade;
                    query.f_diffarea = dto.diff;
                    query.f_papertype = dto.PaperTagID;
                    switch (dto.SubjectID)
                    {
                        case "01":
                        case "03":
                            query.f_style = dto.styleareaid; // 小题型
                            break;
                        default:
                            query.f_stylearea = dto.styleareaid; // 大题型
                            break;
                    }

                    if (dto.questionSort == 1)
                        query.OrderEnum = QuestionOrder.DiffDesc;
                    else
                        query.OrderEnum = QuestionOrder.DiffAsc;

                    resultData = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(dto.SubjectID).QueryQuestions(query, dto.pNumber, dto.pageSize, out TotalNumber);
                }

                else if (dto.range == "1")
                {
                    //机构
                    QuestionTempQuery questionTemp = new QuestionTempQuery();

                    switch (dto.SubjectID)
                    {
                        case "01":
                        case "03":
                            questionTemp.f_style = dto.styleareaid; // 小题型
                            break;
                        default:
                            questionTemp.f_stylearea = dto.styleareaid; // 大题型
                            break;
                    }
                    questionTemp.f_mainsec = dto.f_id;
                    questionTemp.f_class = dto.grade;
                    questionTemp.f_diffarea = dto.diff;
                    questionTemp.f_papertype = dto.PaperTagID;
                    questionTemp.f_qfrom = dto.OrgId;
                    if (dto.questionSort == 1)
                        questionTemp.OrderEnum = QuestionOrder.DiffDesc;
                    else
                        questionTemp.OrderEnum = QuestionOrder.DiffAsc;

                    var data = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(dto.SubjectID);
                    resultData = data.QueryOrgQuestion(questionTemp, dto.pNumber, dto.pageSize, out TotalNumber);
                }
                else
                {
                    //收藏
                    CollectQuestionQuery queryFilter = new CollectQuestionQuery();
                    queryFilter.f_pageSize = dto.pageSize;
                    queryFilter.f_pno = dto.pNumber;
                    queryFilter.f_userid = dto.UserID;
                    //queryFilter.f_style = dto.styleareaid;
                    switch (dto.SubjectID)
                    {
                        case "01":
                        case "03":
                            queryFilter.f_style = dto.styleareaid; // 小题型
                            break;
                        default:
                            queryFilter.f_stylearea = dto.styleareaid; // 大题型
                            break;
                    }
                    queryFilter.f_diff = dto.diff;
                    queryFilter.f_sec = dto.f_id;
                    queryFilter.f_markid = dto.PaperTagID;
                    if (dto.questionSort == 1)
                        queryFilter.OrderEnum = QuestionOrder.DiffDesc;
                    else
                        queryFilter.OrderEnum = QuestionOrder.DiffAsc;

                    var api = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionCollectQuery(dto.SubjectID);

                    resultData = api.QueryCollectQuestion(queryFilter, out TotalNumber);

                }

                return resultData;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        /// <summary>
        ///  作业编辑-根据试题id集合去查找试题
        /// </summary>
        /// <param name="subjectID"></param>
        /// <param name="idlist"></param>
        /// <returns></returns>
        public List<Mfg.Resouce.Models.Question> FindByIdlist(string subjectID, string idlist)
        {
            try
            {
                //List<Resource.Entity.Question> list = new ResourceApi().GetQuestionQuery(subjectID).FindByIdlist(idlist);
                int[] idIntList = idlist.Split(',').ToList().Select(m => int.Parse(m)).ToList().ToArray();
                List<Mfg.Resouce.Models.Question> list = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectID).FindIdlist(idIntList);

                list.ForEach(a =>
                {
                    if (a.f_isold != 0)
                    {
                        a.f_body = a.f_body.Replace(@"</body>", "").Replace(@"</ body>", "").Replace(@"</BODY>", "");
                    }
                });
                list = idlist.Split(',').ToList().Where(a => a.Trim() != string.Empty).Join(list, a => a, b => b.f_id.ToString(), (a, b) => b).ToList();
                return list;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("接口错误--行空--FindByIdlist", ex);
                return null;
            }
        }

        public List<Mfg.Resouce.Models.Question> FindByIdlistOrderbyStyle(string subjectID, string idlist)
        {
            try
            {
                //List<Resource.Entity.Question> list = new ResourceApi().GetQuestionQuery(subjectID).FindByIdlistOrderbyStyle(idlist);
                int[] idIntList = idlist.Split(',').ToList().Select(m => int.Parse(m)).ToList().ToArray();
                List<Mfg.Resouce.Models.Question> list = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectID).FindByIdlistOrderbyStyle(idIntList);
                list.ForEach(a =>
                {
                    if (a.f_isold != 0)
                    {
                        a.f_body = a.f_body.Replace(@"</body>", "").Replace(@"</ body>", "").Replace(@"</BODY>", "");
                    }
                });
                list = idlist.Split(',').ToList().Where(a => a.Trim() != string.Empty).Join(list, a => a, b => b.f_id.ToString(), (a, b) => b).ToList();
                return list;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("接口错误--行空--FindByIdlistOrderbyStyle", ex);
                return null;
            }
        }


        public List<Mfg.Resouce.Models.Question> NewFindByIdlistOrderbyStyle(string subjectID, string idlist)
        {
            try
            {
                //List<Resource.Entity.QuestionExt> list = new ResourceApi().GetQuestionExtQuery(subjectID).FindByIdlistOrderbyStyle(idlist);
                int[] idIntList = idlist.Split(',').ToList().Select(m => int.Parse(m)).ToList().ToArray();
                List<Mfg.Resouce.Models.Question> list = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectID).FindByIdlistOrderbyStyle(idIntList);

                list.ForEach(a =>
                {//old data replace Body to body
                    if (a.f_isold != 0)
                    {
                        a.f_body = a.f_body.Replace(@"</body>", "").Replace(@"</ body>", "").Replace(@"</BODY>", "");
                    }
                });
                list = idlist.Split(',').ToList().Where(a => a.Trim() != string.Empty).Join(list, a => a, b => b.f_id.ToString(), (a, b) => b).ToList();
                return list;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("接口错误--行空--FindByIdlistOrderbyStyle", ex);
                return null;
            }
        }


        /// <summary>
        /// 返回纯文本试题
        /// </summary>
        /// <param name="subjectID"></param>
        /// <param name="idlist"></param>
        /// <returns></returns>
        public List<string> FindByIdlistText(string subjectID, string idlist)
        {
            try
            {
                //int[] idIntList = idlist.Split(',').ToList().Select(m => int.Parse(m)).ToList().ToArray();

                //return new ResourceApi().GetQuestionTempQuery(subjectID).GetContentList(idlist);
                int[] idIntList = idlist.Split(',').ToList().Select(m => int.Parse(m)).ToList().ToArray();
                //return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionTempQuery(subjectID).GetContentList(idIntList);
                var resources = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectID);
                return resources.GetContentList(idIntList);


                //return new ResourceApi().GetQuestionQuery(subjectID).FindByIdlist(idlist);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        #region 根据大年级  返回可配置的教材版本

        /// <summary>
        ///  根据大年级  返回可配置的教材版本
        /// </summary>
        /// <param name="bgrade">大年级的id   x,c,g</param>
        /// <returns></returns>
        public List<Edition> QueryEditionlist(string bgrade)
        {
            return ResourceQueryClient.ResourceQueryClient.Query.CreateEditionQuery("CResource").QueryEdition("", bgrade, "");
            //return new ResourceApi().GetEditionQuery().QueryEditionlist(bgrade);
        }

        /// <summary>
        ///  
        /// </summary>
        /// <param name="bgrade"></param>
        /// <param name="edu"></param>
        /// <returns></returns>
        public List<Edition> QueryEditionTchmaterialList(string bgrade, int edu)
        {
            return ResourceQueryClient.ResourceQueryClient.Query.CreateTchmaterialQuery("CResource").QueryEditionTchmaterialList(bgrade, edu);
            //return new ResourceApi().GetTchmaterial().QueryEditionTchmaterialList(bgrade, edu);

            #region MyRegion
            //var list = ResourceQueryClient.ResourceQueryClient.Query.CreateTchmaterialQuery("CResource")
            //    .QueryTchmaterialList(bgrade, "", edu);
            //if (list != null)
            //{
            //    return list.Select(m => new Edition()
            //                        {
            //                            f_editionid = m.f_bookid,
            //                            f_name = m.f_name
            //                        }
            //       ).ToList();

            //}
            //else
            //{
            //    return null;
            //} 
            #endregion


        }
        #endregion

        /// <summary>
        /// 随机取得同一道题型同知识点 同一年级的试题
        /// </summary>
        /// <param name="questionrandModel"></param>
        /// <returns></returns>
        public Mfg.Resouce.Models.Question RandQuestion(QuestionRandModel questionrandModel)
        {
            try
            {
                //return
                //    new ResourceApi().GetQuestionQuery(questionrandModel.SubjectID)
                //        .RandQuestion(questionrandModel.styleareid, questionrandModel.mainsecid, questionrandModel.grade,
                //            questionrandModel.noidlist);
                int[] idIntList = questionrandModel.noidlist.Split(',').ToList().Select(m => int.Parse(m)).ToList().ToArray();
                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(questionrandModel.SubjectID).RandQuestion(questionrandModel.styleareid, questionrandModel.mainsecid, questionrandModel.grade, idIntList);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }
        public Mfg.Resouce.Models.Question RandQuestion(TeachCenterQuestionRandModel questionrandModel)
        {
            try
            {
                int[] idIntList = questionrandModel.noidlist.Split(',').ToList().Select(m => int.Parse(m)).ToList().ToArray();
                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(questionrandModel.SubjectID).RandQuestion(questionrandModel.styleareid, questionrandModel.mainsecid, questionrandModel.grade, idIntList);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        /// <summary>
        /// 随机取得同一道题型同知识点 同一年级的试题
        /// </summary>
        /// <param name="questionrandModel"></param>
        /// <returns></returns>
        public Mfg.Resouce.Models.Question RandQuestion(string SubjectID, int styleareid, int mainsecid, string grade, int[] idIntList, int diff)
        {
            try
            {
                QuestionQuery query = new QuestionQuery();
                //query.f_stylearea = styleareid;
                switch (SubjectID)
                {
                    case "01":
                    case "03":
                        query.f_style = styleareid;
                        break;
                    default:
                        query.f_stylearea = styleareid;//大题型
                        break;
                }
                query.f_mainsec = mainsecid;
                query.f_class = grade;

                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(SubjectID).RandQuestions(query, 1, idIntList).FirstOrDefault();
                // return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(SubjectID).RandQuestion(styleareid, mainsecid, grade, idIntList);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        /// <summary>
        /// 获取题型
        /// </summary>
        /// <param name="f_style"></param>
        /// <returns></returns>
        public ItemState GetStyle(int f_style, int subjectId)
        {
            try
            {
                switch (subjectId)
                {
                    case 1:
                    case 3:
                        {
                            var style = Mfg.Resource.Comm.ResourceJyStyle.GetStyle(f_style);
                            switch (style.Trim())
                            {
                                case "选择题":
                                    return ItemState.Choice;
                                case "填空题":
                                    return ItemState.Completion;
                                case "解答题":
                                    return ItemState.Answer;
                                default:
                                    return ItemState.Answer;
                            }
                        }
                        break;
                    default:
                        {
                            return (ItemState)f_style;
                        }
                        break;
                }

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return ItemState.Answer;
            }
        }


        ///// <summary>
        ///// 
        ///// </summary>
        ///// <param name="dto"></param>
        ///// <returns></returns>
        //public List<Teach> FindBySecGrade(QuestionModel dto)
        //{
        //    try
        //    {
        //        return new ResourceApi().GetTeachQuery(dto.SubjectID).FindBySecGrade(dto.grade, dto.f_id);
        //    }
        //    catch (Exception ex)
        //    {
        //        Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
        //        return null;
        //    }
        //}


        public Dictionary<string, string> BllMfgGetUserBookInfo(string conn, int userid)
        {
            try
            {
                return new MfgOutfitBll().BllMfgGetUserBookInfo("user", userid);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        /// <summary>
        /// 获取知识点
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public SecMainqlist QuerySecmainQuesList(QuestionModel dto)
        {
            try
            {
                //return new ResourceApi().GetSecMainQuery(dto.SubjectID).QuerySecmainQuesList(dto.f_id, dto.grade);
                return ResourceQueryClient.ResourceQueryClient.Query.CreateSecMainqlistQuery(dto.SubjectID).QuerySecmainQuesList(dto.f_id, dto.grade);

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        public List<Mfg.Resouce.Models.Question> RandQuestionList(QuestionModel dto)
        {
            try
            {
                //return new ResourceApi().GetQuestionQuery(dto.SubjectID)
                //    .RandQuestionList(dto.f_id, dto.grade, dto.pageSize);

                //return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(dto.SubjectID).RandQuestionList(dto.f_id, dto.grade, dto.pageSize);

                QuestionQuery query = new QuestionQuery { f_mainsec = dto.f_id, f_class = dto.grade, f_stylearea = 1, };
                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(dto.SubjectID)
                     .RandQuestions(query, dto.pageSize);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        #region 揪错

        /// <summary>
        /// 揪错
        /// </summary>
        /// <param name="model"></param>
        public OperateType AddResource(CorrectionModel model)
        {
            try
            {
                //return new ResourceApi().GetDebugQuery(model.SubjectID)
                //    .AddResource(model.Content, model.IP, model.QID, model.BugType, model.Builder, model.Url);
                var query = new DebugQuestion
                {
                    f_content = model.Content,
                    f_bugtype = model.BugType,
                    f_builder = model.Builder,
                    f_fromtype = 2,
                    f_ip = model.IP,
                    f_url = model.Url,
                    f_question = model.QID
                };

                var result = ResourceQueryClient.ResourceQueryClient.Query.CreateDebugQuestionQuery(model.SubjectID).SaveDebugQuestion(query);
                return result.ErrorOptionEnum;

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return OperateType.OperateFail;
            }
        }

        #endregion

        /// <summary>
        /// 问题
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="ok"></param>
        /// <returns></returns>
        public List<Point> QueryBookPoint(QuestionModel dto, string ok)
        {
            try
            {
                //知识点
                return ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery(dto.SubjectID).QueryPoint(dto.BookID);

                //教材
                //return ResourceQueryClient.ResourceQueryClient.Query.CreateBookQuery(dto.SubjectID).QueryBook(dto.BookID);

                //return new ResourceApi().GetPoinQuery(dto.SubjectID).QueryBookPoint(dto.BookID, dto.qcount);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        /// <summary>
        /// 叶子节点
        /// </summary>
        /// <param name="subjectID">科目</param>
        /// <param name="bookID">书ID</param>
        /// <param name="idList">ID集合</param>
        /// <returns></returns>
        public List<Book> QuerySimpleBookChilds(string subjectID, string bookID, string[] idList)
        {
            try
            {
                return ResourceQueryClient.ResourceQueryClient.Query.CreateBookQuery(subjectID).QueryChilds(bookID, idList);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        /// <summary>
        /// 获取最字节点上边一层的父级目录 只显示父级一层  小升初 中考 高考 使 用
        /// </summary>
        /// <param name="BookID">书本目录ID</param>
        /// <returns>返回叶子节点的父级的集合</returns>
        public List<Book> QuerySimpleBookList(QuestionModel dto)
        {
            try
            {
                return ResourceQueryClient.ResourceQueryClient.Query.CreateBookQuery(dto.SubjectID).QueryBook(dto.BookID, 2);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        /// <summary>
        /// 获取最字节点上边一层的父级目录 只显示父级一层  小初使用
        /// </summary>
        /// <param name="edu">学制 0五四 1 六三</param>
        /// <param name="bgrade">大年级  x g c</param>
        /// <returns>返回书本的集合</returns>
        public List<Point> QuerySimpleSmallList(QuestionModel dto)
        {
            try
            {
                //return new ResourceApi().GetPoinQuery(dto.SubjectID).QuerySimpleParentList(dto.edu, dto.grade);
                return ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery(dto.SubjectID).QuerySimpleParentList(dto.edu, dto.grade);

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        /// <summary>
        /// 获取最字节点上边一层的父级目录 只显示父级一层  高中使用
        /// </summary>
        /// <param name="wl">artScience文理</param>
        /// <param name="subject">学科</param>
        /// <returns>返回书本的集合</returns>
        public List<Point> QuerySimpleHightList(QuestionModel dto)
        {
            try
            {
                //return new ResourceApi().GetPoinQuery(dto.SubjectID)
                //    .QuerySimpleParentList(dto.artScience, dto.SubjectID);

                return ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery(dto.SubjectID).QuerySimpleParentList(dto.artScience, dto.SubjectID);

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        /// <summary>
        /// 获取一个父节点或者多个父节点下的所有 知识点 和学习时间
        /// </summary>
        /// <param name="pointidAry">父节点的集合</param>
        /// <returns>返回书本的集合</returns>
        public List<Point> QueryPointTimeList(QuestionModel dto, string[] pointidAry)
        {
            try
            {
                //return new ResourceApi().GetPoinQuery(dto.SubjectID).QueryPointTimeList(pointidAry);
                return ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery(dto.SubjectID).QueryPointTimeList(pointidAry);

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        public MfgUserInfoModel GetMFGUser(string constStr, string sid)
        {
            try
            {
                string strUserInfo = new MfgOutfitBll().GetUserInfo("user", Convert.ToInt32(sid)); //接口有问题
                return JsonHelper.FromJsonTo<MfgUserInfoModel>(strUserInfo);
            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用MfgOutfitBll.GetUserInfo接口出错,参数为({0})", "user" + "|" + sid), ex);
                return null;
            }
        }


        public bool UpdateMFGUserInfo(MfgUserInfoModel dto)
        {
            int n = 0;
            try
            {
                //n = new MfgOutfitBll().UpdateUserInfo(Convert.ToInt32(dto.PId), dto.PAlias, dto.PSex, dto.PInClass,
                //    dto.PEdu, dto.PWl, "", "", 0, dto.PSchoolName, dto.PBirthday, dto.PPhoto);

                n = new MfgOutfitBll().UpdateUserInfo("user", Convert.ToInt32(dto.PId), dto.PAlias, dto.PSex, dto.PInClass, dto.PPhone,
                  dto.PEdu, dto.PWl, 0, dto.PSchoolName, dto.PBirthday, dto.PQq, dto.PAddress, dto.PPhoto);
                if (n > 0)
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {
                LogHelperNet.Error(
                    string.Format("调用MfgOutfitBll.UpdateUserInfo接口出错,参数为({0})",
                        "user" + "|" + dto.PId + "|" + dto.PAlias), ex);
                return false;
            }
        }

        #region 获取精品试题

        /// <summary>
        /// 精品试题的集合
        /// </summary>
        /// 
        /// <param name="dto"></param>
        /// <param name="totalCount">总数</param>
        /// <param name="pno">页码</param>
        /// <param name="pageSize">每页显示数量</param>
        /// <returns></returns>
        //public List<Mfg.Resouce.Models.Question> GetGoodQuestion(QuestionModel dto, ref int totalCount, int pno = 1, int pageSize = 10)
        //{
        //    try
        //    {
        //        List<Mfg.Resouce.Models.Question> ResultList = new List<Mfg.Resouce.Models.Question>() { };

        //        if (dto.TagID > 0)
        //        {
        //            //0 不限 2 常考 3 必考 4 易考
        //            //必考
        //            //var resource = new ResourceApi().GetQuestionQuery(dto.SubjectID);
        //            var bkCount = 0;
        //            //var bkItems = resource.QueryQuestionBikao(dto.styleareaid, dto.diff, dto.TagID, dto.grade,
        //            //    ref bkCount, pno, pageSize);
        //            //todo
        //            ResultList.AddRange(bkItems);
        //            totalCount = bkCount;
        //        }
        //        else if (dto.PaperTagID > 0)
        //        {
        //            // var resource = new ResourceApi().GetQuestionQuery(dto.SubjectID);
        //            //试卷类型 0 全部 1其中 2 期末 3 模拟 7中考  9 高考 10小考
        //            int paperCount = 0;
        //            //var paperItems = resource.QueryQuestionPapertype(dto.styleareaid, dto.diff, dto.PaperTagID,
        //            //    dto.grade, ref paperCount, pno, pageSize);
        //            //ResultList.AddRange(paperItems);

        //            var paperItems = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(dto.SubjectID).
        //                QueryQuestionPapertype(dto.styleareaid, dto.diff, dto.PaperTagID, dto.grade, out paperCount, pno, pageSize);

        //            ResultList.AddRange(paperItems);

        //            totalCount = paperCount;
        //        }
        //        //全部
        //        else
        //        {
        //            // var resource = new ResourceApi().GetQuestionQuery(dto.SubjectID);
        //            //试卷类型 0 全部 1其中 2 期末 3 模拟 7中考  9 高考 10小考
        //            int paperCount = 0;

        //            var paperItems = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(dto.SubjectID).
        //                QueryQuestionPapertype(dto.styleareaid, dto.diff, dto.PaperTagID, dto.grade, out paperCount, pno, pageSize);

        //            //var paperItems = resource.QueryQuestionPapertype(dto.styleareaid, dto.diff, dto.PaperTagID,
        //            //    dto.grade, ref paperCount, pno, pageSize);
        //            //0 不限 2 常考 3 必考 4 易考
        //            //必考
        //            var bkCount = 0;
        //            //todo
        //            var bkItems = resource.QueryQuestionBikao(dto.styleareaid, dto.diff, dto.TagID, dto.grade,
        //                ref bkCount, pno, pageSize);
        //            ResultList.AddRange(bkItems);
        //            ResultList.AddRange(paperItems);
        //            totalCount = bkCount + paperCount;
        //        }
        //        return ResultList;
        //    }
        //    catch (Exception ex)
        //    {
        //        Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
        //        return null;
        //    }
        //}

        /// <summary>
        /// 根据考卷类型获取 试题的集合
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="totalCount"></param>
        /// <param name="pno"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        //public List<QuestionExt> QueryQuestionPapertype(QuestionModel dto, ref int totalCount, int pno = 1,
        //    int pageSize = 10)
        //{
        //    try
        //    {
        //        var resultList = new List<QuestionExt>() { };

        //        var resource = new ResourceApi().GetQuestionQuery(dto.SubjectID);
        //        //试卷类型 0 全部 1其中 2 期末 3 模拟 7中考  9 高考 10小考
        //        var paperItems = resource.QueryQuestionPapertype(dto.styleareaid, dto.diff, dto.PaperTagID,
        //            dto.grade, ref totalCount, pno, pageSize);
        //        resultList.AddRange(paperItems);


        //        return resultList;
        //    }
        //    catch (Exception ex)
        //    {
        //        LogHelperNet.Error(ex.Message, ex);
        //        return null;
        //    }
        //}

        /// <summary>
        /// 根据必考类型获取 试题的集合
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="totalCount"></param>
        /// <param name="pno"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        //public List<QuestionExt> QueryQuestionBikao(QuestionModel dto, ref int totalCount, int pno = 1,
        //    int pageSize = 10)
        //{
        //    try
        //    {
        //        var resultList = new List<QuestionExt>() { };
        //        //0 不限 2 常考 3 必考 4 易考
        //        //必考
        //        var resource = new ResourceApi().GetQuestionQuery(dto.SubjectID);
        //        var bkCount = 0;
        //        var bkItems = resource.QueryQuestionBikao(dto.styleareaid, dto.diff, dto.TagID, dto.grade,
        //            ref bkCount, pno, pageSize);
        //        resultList.AddRange(bkItems);
        //        totalCount = bkCount;
        //        return resultList;
        //    }
        //    catch (Exception ex)
        //    {
        //        Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
        //        return null;
        //    }
        //}

        #endregion

        public SecMain GetSecMainById(QuestionModel dto)
        {
            try
            {
                //return new ResourceApi().GetSecMainQuery(dto.SubjectID).GetSecMainById(dto.f_id);
                return ResourceQueryClient.ResourceQueryClient.Query.CreateSecMainQuery(dto.SubjectID).FindOne(dto.f_id);

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        public List<SecMain> GetSecMainById(QuestionModel dto, int[] idlist)
        {
            try
            {
                //return new ResourceApi().GetSecMainQuery(dto.SubjectID).GetSecMainById(dto.f_id);
                return ResourceQueryClient.ResourceQueryClient.Query.CreateSecMainQuery(dto.SubjectID).FindList(idlist);

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
        /// <param name="aryStrings">0：知识点ID，1:题型ID，2:题目数量,3:d x 大题型，小题型</param>
        /// <param name="grade"></param>
        /// <param name="subjectId"></param>
        /// <returns></returns>
        public List<Resouce.Models.Question> QueryQuestions(string[] aryStrings, string grade, string subjectId)
        {
            //return new ResourceApi().GetQuestionQuery(subjectId).QueryQuestions(aryStrings, grade);
            return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectId).QueryQuestions(aryStrings, grade);

        }

        public Tchmaterial FindOne(string bookid, string subject)
        {
            //return new ResourceApi().GetTchmaterial().FindOne(bookid, subject);
            return ResourceQueryClient.ResourceQueryClient.Query.CreateTchmaterialQuery("CResource").FindOne(bookid, subject);

        }

        #region 获取试卷版本

        public List<Edition> GetPaperMaterial(string bGrade, string subject)
        {
            try
            {
                // return new ResourceApi().GetEditionQuery().QueryEditionlist(bGrade, subject);
                return ResourceQueryClient.ResourceQueryClient.Query.CreateEditionQuery("CResource").QueryEdition("", bGrade, subject);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        #endregion

        public List<Resouce.Models.Question> RandQuestionListExts(QuestionModel dto)
        {
            //int mainsecid, string grade, int inputct
            try
            {
                //return new ResourceApi().GetQuestionExtQuery(dto.SubjectID).RandQuestionListExts(dto.f_id, dto.grade, dto.pageSize);

                QuestionQuery query = new QuestionQuery { f_mainsec = dto.f_id, f_class = dto.grade, f_stylearea = 1, };
                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(dto.SubjectID)
                     .RandQuestions(query, dto.pageSize);


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
        /// <param name="subjectID"></param>
        /// <param name="idlist"></param>
        /// <returns></returns>
        public List<Resouce.Models.Question> FindByIdlistExt(string subjectID, string idlist)
        {
            try
            {
                //return new ResourceApi().GetQuestionExtQuery(subjectID).FindByIdlistExt(idlist);
                int[] idIntList = idlist.Split(',').ToList().Select(m => int.Parse(m)).ToList().ToArray();
                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectID).FindIdlist(idIntList);

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }


        /// <summary>
        /// 获取知识点树下一个知识点
        /// </summary>
        /// <param name="subjectID"></param>
        /// <param name="pointid"></param>
        /// <param name="filterct"></param>
        /// <returns></returns>
        public Point GetNextSec(string subjectID, string pointid, int filterct)
        {
            try
            {
                //return new ResourceApi().GetPoinQuery(subjectID).GetNextSec(pointid, filterct);
                return ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery(subjectID).GetNextSec(pointid, filterct);

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }
        /// <summary>
        /// 获取同步教材下一个知识点
        /// </summary>
        /// <param name="subjectID"></param>
        /// <param name="pointid"></param>
        /// <param name="filterct"></param>
        /// <returns></returns>
        public Point GetNextSecBook(string subjectID, string pointid, int filterct)
        {
            try
            {
                //return new ResourceApi().GetPoinQuery(subjectID).GetNextSec(pointid, filterct);
                var book = ResourceQueryClient.ResourceQueryClient.Query.CreateBookQuery(subjectID).GetNextSec(pointid, filterct);
                return new Point() { f_id = book.f_id, f_name = book.f_name, f_pointid = book.f_bookid, f_questionallct = book.f_quetionallct, f_parent = book.f_parent, f_questionct = book.f_questionct, f_sec = book.f_unit };

            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }

        public List<Resource.Entity.QuestionExt> GetQueryIndexs(QuestionSearch dto, out int allCount)
        {
            allCount = 0;
            try
            {
                return new ResourceApi().GetQuestionExtQuery(dto.SubjectID).QueryIndexs(dto.SearchText, dto.CurrentIndex, dto.pageCount, out allCount);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }
        }





        public List<Resouce.Models.Question> QueryQuestions(string constr, int difficulty, int qfrom, string grade, int style, int skip, int pno, out int allct)
        {
            allct = 0;
            try
            {
                var api = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(constr);

                //var sec = api.QueryQuestions(constr, difficulty, qfrom, grade, style, skip, pno, out allct);

                var sec = api.QueryQuestionsByPaperFrom(2, qfrom, difficulty, grade, style, skip, pno, out allct);

                return sec;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }


        /// <summary>
        /// 获取我的收藏
        /// </summary>
        /// <param name="queryFilter">查询对象</param>
        /// <param name="allct">返回总数</param>
        /// <returns>返回试题的集合对象</returns>
        public List<Resouce.Models.Question> QueryCollectQuestion(QuestionModel dto, out int allCount)
        {
            allCount = 0;
            try
            {
                var api = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionCollectQuery(dto.SubjectID);
                CollectQuestionQuery queryFilter = new CollectQuestionQuery();
                queryFilter.f_pageSize = dto.pageSize;
                queryFilter.f_typeid = 2;//机构
                queryFilter.f_pno = dto.pNumber;
                queryFilter.f_userid = dto.UserID;
                if (dto.IsTest)//大题
                {
                    queryFilter.f_stylearea = dto.styleareaid;
                }
                else
                {
                    switch (dto.SubjectID)
                    {
                        case "01":
                        case "03":
                            queryFilter.f_style = dto.styleareaid;
                            break;
                        default:
                            queryFilter.f_stylearea = dto.styleareaid;
                            break;
                    }
                }
                queryFilter.f_sec = dto.f_id;
                queryFilter.f_diff = dto.diff;
                if (dto.questionSort == 1)
                    queryFilter.OrderEnum = QuestionOrder.DiffAsc;
                else
                    queryFilter.OrderEnum = QuestionOrder.DiffDesc;
                return api.QueryCollectQuestion(queryFilter, out allCount);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }


        /// <summary>
        /// 根据试题 获取试题所有的标签
        /// </summary>
        /// <param name="qid">试题id</param>
        /// <returns>放回标签的集合</returns>
        public List<CollectMark> GetQuestionMark(CollectionModel p)
        {

            try
            {
                List<CollectMark> dto = new List<CollectMark>();

                dto = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionCollectQuery(p.subjectID).GetQuestionMark(p.SecID, p.UserID);

                return dto;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
                return null;
            }

        }

        /// <summary>
        /// 获取试题是否被收藏
        /// </summary>
        /// <param name="idListAry">试题集合</param>
        /// <param name="userId">用户id</param>
        /// <returns>返回收藏的集合</returns>
        public List<CollectQuestionState> GetQuestionListCollectState(int[] idList, int userID, string subject)
        {
            List<CollectQuestionState> r = new List<CollectQuestionState>();

            try
            {
                r = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionCollectQuery(subject).GetQuestionListCollectState(idList, userID);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
            }

            return r;

        }


        /// <summary>
        /// 获取用户所有的标签名称
        /// </summary>
        /// <param name="userId">用户id</param>
        /// <returns>返回用户的所有的标签</returns>
        public List<QCollectMark> QueryMarkList(int userID)
        {
            List<QCollectMark> r = new List<QCollectMark>();
            try
            {
                r = ResourceQueryClient.ResourceQueryClient.Query.CreateQCollectMarkQuery("CResource").QueryMarkList(userID);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
            }

            return r;
        }

        /// <summary>
        /// 添加收藏、修改收藏
        /// </summary>
        /// <param name="userID">用户id</param>
        /// <param name="f_id">试题id</param>
        /// <param name="listMark">标签的id的集合</param>
        /// <param name="subjectID">科目</param>
        public bool UpdateQuestionCollect(int userID, int f_id, int orgID, List<int> listMark, string subjectID)
        {
            bool isok = false;
            try
            {
                var resut = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionCollectQuery(subjectID).UpdateQuestionCollect(userID, f_id, orgID, 2, listMark);
                if (resut.ErrorOptionEnum == OperateType.OperateOk)
                    isok = true;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error(ex.Message, ex);
            }

            return isok;

        }


        public List<Resouce.Models.Question> FindByIdlist(string subjectID, int[] idlist)
        {
            try
            {
                List<Mfg.Resouce.Models.Question> list = ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectID).FindByIdlistOrderbyStyle(idlist);
                list.ForEach(a =>
                {
                    if (a.f_isold != 0)
                    {
                        a.f_body = a.f_body.Replace(@"</body>", "").Replace(@"</ body>", "").Replace(@"</BODY>", "");
                    }
                });
                list = idlist.Join(list, a => a, b => b.f_id, (a, b) => b).ToList();
                return list;
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("接口错误--行空--FindByIdlistOrderbyStyle", ex);
                return null;
            }
        }

        /// <summary>
        /// 获取教案 知识点ID
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="secid"></param>
        /// <returns></returns>
        public List<Mfg.Resouce.Models.SecTestQuestion> GetSecTestQ(string subjectId, int[] secid)
        {
            try
            {
                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectId).GetSecTestQ(secid);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("接口错误--行空--GetSecTestQ", ex);
                return null;
            }
        }
        /// <summary>
        /// 获取教案 目录ID
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="secid"></param>
        /// <returns></returns>
        public List<Mfg.Resouce.Models.SecTestQuestion> GetPointTestQ(string subjectId, string[] secid)
        {
            try
            {
                return ResourceQueryClient.ResourceQueryClient.Query.CreateQuestionQuery(subjectId).GetPointTestQ(secid);
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("接口错误--行空--GetSecTestQ", ex);
                return null;
            }
        }

        /// <summary>
        /// 根据目录ID 获取知识点ID
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="pointid"></param>
        /// <returns></returns>
        public int FindOneByPointId(string subjectId, string pointid)
        {
            try
            {
                var p = ResourceQueryClient.ResourceQueryClient.Query.CreatePointQuery("0" + Convert.ToInt32(subjectId)).FindOneByPointId(pointid);
                if (p != null)
                {
                    return p.f_sec;
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                Mfg.EI.Common.LogHelperNet.Error("接口错误--行空--FindOneByPointId", ex);
                return 0;
            }
        }

    }
}