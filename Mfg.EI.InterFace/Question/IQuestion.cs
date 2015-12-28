
/*
 * author:谢利民;
 * function:题目相关功能的接口
 * date:2015-04-16
 * update:205-05-04
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.Resource.Entity;
using Mfg.EI.ViewModel;
namespace Mfg.EI.InterFace
{
    /// <summary>
    /// Question:试题相关的功能接口
    /// </summary>
    public interface IQuestion
    {
        /// <summary>
        /// 判断题型返回的值是否正确
        /// </summary>
        /// <param name="ItemId">题目ID</param>
        /// <returns>返回Bool</returns>
        Dictionary<string, bool> IsQuesCorrect(string subjectId, string ItemId, List<string> sanswer);



        /// <summary>
        /// 获取教材版本
        /// </summary>
        /// <param name="bgrade">阶段x/c/g</param>
        /// <param name="subject">科目01/02......</param>
        /// <returns></returns>
        List<Edition> QueryEditionlist(string bgrade, string subject);

        /// <summary>
        /// 电子作业---同步教材
        /// 获取小学、初中目录结构
        /// </summary>
        /// <param name="dto">参数</param>
        /// <returns></returns>
        List<Point> QueryBookPoint(QuestionModel dto);

        /// <summary>
        /// 电子作业---同步教材
        /// 获取高中教材的选修和必修
        /// </summary>
        /// <param name="dto">参数</param>
        /// <returns></returns>
        List<Tchmaterial> QueryBookEdition(QuestionModel dto);

        /// <summary>
        /// 电子作业---同步教材
        /// 获取高中目录结构
        /// </summary>
        /// <param name="dto">参数</param>
        /// <returns></returns>
        List<Point> QueryBookDetail(QuestionModel dto);

        /// <summary>
        /// 电子作业---考点分类
        /// </summary>
        /// <param name="dto">参数</param>
        /// <returns></returns>
        List<Point> QueryBookSec(QuestionModel dto);

        /// <summary>
        /// 电子作业---题
        /// </summary>
        /// <param name="dto">参数</param>
        /// <param name="TotalNumber">总数</param>
        /// <returns></returns>
        List<Mfg.Resource.Entity.Question> QueryMainSecClassDiff(QuestionModel dto, ref int TotalNumber);


        /// <summary>
        /// 作业编辑-根据试题id集合去查找试题
        /// </summary>
        /// <param name="idlist"></param>
        /// <returns></returns>
        List<Mfg.Resource.Entity.Question> FindByIdlist(string subjectID, string idlist);

        #region 根据大年级  返回可配置的教材版本
        /// <summary>
        /// 根据大年级  返回可配置的教材版本
        /// </summary>
        /// <param name="bgrade">大年级的id   x,c,g</param>
        /// <returns></returns>
        List<Edition> QueryEditionlist(string bgrade);

        #endregion


        /// <summary>
        /// 随机取得同一道题型同知识点 同一年级的试题
        /// </summary>
        /// <param name="questionrandModel"></param>
        /// <returns></returns>
        Mfg.Resource.Entity.Question RandQuestion(QuestionRandModel questionrandModel);

        /// <summary>
        /// 获取题型
        /// </summary>
        /// <param name="f_style"></param>
        /// <returns></returns>
        string GetStyle(int f_style);
    }
}
