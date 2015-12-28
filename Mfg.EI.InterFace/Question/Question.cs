/*
 * author:谢利民;
 * function:题目相关功能的接口
 * date:2015-04-16
 * version:
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.Resource.Entity;
using Mfg.Resource.ApiClient;
using Mfg.EI.ViewModel;
//using Mfg.Resource.ResourceApi;
using Mfg.Resource.ApiClient;

namespace Mfg.EI.InterFace
{
    public class Question : IQuestion
    {

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
                List<Resource.Entity.Question> listQuestion = FindByIdlist(subjectId, ItemId);
                if (listQuestion.Count > 0)
                {
                    for (var i = 0; i < listQuestion.Count; i++)
                    {
                        var stranswer = listQuestion[i].f_answer.Trim().Replace("<table style=\"word-break:break-all;\" width=\"650\" ><tr><td>", "").Replace("</td></tr></table>", "").Trim();
                        if (stranswer == stranswer[i].ToString())
                        {
                            dictList.Add(listQuestion[i].f_id.ToString(), true);
                        }
                        else
                        {
                            dictList.Add(listQuestion[i].f_id.ToString(), false);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                dictList.Add(ex.Message, false);
            }


            return dictList;
        }
        #endregion


        public List<Edition> QueryEditionlist(string bgrade, string subject)
        {
            return new ResourceApi().GetEditionQuery().QueryEditionlist(bgrade, subject);
        }


        public List<Point> QueryBookPoint(QuestionModel dto)
        {
            return new ResourceApi().GetPoinQuery(dto.SubjectID).QueryBookPoint(dto.edu, dto.edition, dto.grade, dto.term, dto.qcount);
        }


        public List<Tchmaterial> QueryBookEdition(QuestionModel dto)
        {
            return new ResourceApi().GetTchmaterial().QueryTchmaterialList(dto.SubjectID)
                .Where(a => a.f_edition == dto.edition).ToList();
        }


        public List<Point> QueryBookDetail(QuestionModel dto)
        {
            return new ResourceApi().GetPoinQuery(dto.SubjectID).QueryBookPoint(dto.edtitionType);
        }


        public List<Point> QueryBookSec(QuestionModel dto)
        {
            switch (dto.grade.ToLower())
            {
                case "x":
                case "c":
                    return new ResourceApi().GetPoinQuery(dto.SubjectID).QueryBookSec(dto.edu, dto.grade, dto.qcount);
                case "g":
                    return new ResourceApi().GetPoinQuery(dto.SubjectID).QueryBookSec(dto.grade, dto.artScience, dto.qcount);
                default:
                    return null;
            }
        }


        public List<Mfg.Resource.Entity.Question> QueryMainSecClassDiff(QuestionModel dto, ref int TotalNumber)
        {
            return new ResourceApi().GetQuestionQuery(dto.SubjectID)
                .FindMainSecClassDiff(dto.styleareaid, dto.f_id, dto.grade, dto.diff, ref TotalNumber, dto.pNumber, dto.pageSize);
        }


        /// <summary>
        ///  作业编辑-根据试题id集合去查找试题
        /// </summary>
        /// <param name="subjectID"></param>
        /// <param name="idlist"></param>
        /// <returns></returns>
        public List<Resource.Entity.Question> FindByIdlist(string subjectID, string idlist)
        {
            return new ResourceApi().GetQuestionQuery(subjectID).FindByIdlist(idlist);
        }



        #region 根据大年级  返回可配置的教材版本
        /// <summary>
        /// 根据大年级  返回可配置的教材版本
        /// </summary>
        /// <param name="bgrade">大年级的id   x,c,g</param>
        /// <returns></returns>
        public List<Edition> QueryEditionlist(string bgrade)
        {
            return new ResourceApi().GetEditionQuery().QueryEditionlist(bgrade);
        }
        #endregion

        /// <summary>
        /// 随机取得同一道题型同知识点 同一年级的试题
        /// </summary>
        /// <param name="questionrandModel"></param>
        /// <returns></returns>
        public Resource.Entity.Question RandQuestion(QuestionRandModel questionrandModel)
        {
            return new ResourceApi().GetQuestionQuery(questionrandModel.SubjectID).RandQuestion(questionrandModel.styleareid, questionrandModel.mainsecid, questionrandModel.grade, questionrandModel.noidlist);
        }

        /// <summary>
        /// 获取题型
        /// </summary>
        /// <param name="f_style"></param>
        /// <returns></returns>
        public string GetStyle(int f_style)
        {
            return Mfg.Resource.Comm.ResourceJyStyle.GetStyle(f_style);
        }
    }
}
