
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
using Climb.Core;
using Mfg.EI.ViewModel;
using Mfg.Resouce.Models;




namespace Mfg.EI.InterFace
{
    /// <summary>
    /// Question:试题相关的功能接口
    /// </summary>
    public interface IQuestion
    {
        QuestionStyleBase GetStyle(string subjectID, int f_styleid);

        QuestionStyleBase GetStyleDetial(int f_styleid);

        /// <summary>
        /// 获取科目下题型
        /// </summary>
        /// <param name="subjectID"></param>
        /// <returns></returns>
        List<QuestionStyleBase> GetStyle(string subjectID, string f_bgclass);

        List<Resouce.Models.Question> QueryQuestions(string constr, int difficulty, int qfrom, string grade, int style, int skip, int pno, out int allct);

        /// <summary>
        /// 获取下一个知识点
        /// </summary>
        /// <param name="subjectid">科目ID</param>
        /// <param name="pointid">知识点ID</param>
        /// <param name="filterct">知识点下的试题数量</param>
        /// <returns></returns>
        Point GetNextSec(string subjectid, string pointid, int filterct);

        /// <summary>
        /// 同步教材获取下一个知识点
        /// </summary>
        /// <param name="subjectID"></param>
        /// <param name="pointid"></param>
        /// <param name="filterct"></param>
        /// <returns></returns>
        Point GetNextSecBook(string subjectID, string pointid, int filterct);
        /// <summary>
        /// 获取中小学的上下年级
        /// </summary>
        ///<param name="dto">参数</param>
        /// <returns></returns>
        List<Mfg.Resouce.Models.Tchmaterial> GetGradeList(QuestionModel dto);

        /// <summary>
        /// 判断题型返回的值是否正确
        /// </summary>
        /// <param name="ItemId">题目ID</param>
        /// <returns>返回Bool</returns>
        Dictionary<string, bool> IsQuesCorrect(string subjectId, string ItemId, List<string> sanswer);

        /// <summary>
        /// 判題
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="ItemId"></param>
        /// <param name="sanswer"></param>
        /// <returns>題目ID，该题正确率</returns>
        Dictionary<string, double> QuesCorrect(string subjectId, string ItemId, List<string> sanswer);

        /// <summary>
        /// 获取教材版本
        /// </summary>
        /// <param name="bgrade">阶段x/c/g</param>
        /// <param name="subject">科目01/02......</param>
        /// <param name="edu"></param>
        /// <returns></returns>
        List<Edition> QueryEditionlist(string bgrade, string subject, int edu);

        /// <summary>
        /// 新方法、获取教材版本
        /// </summary>
        /// <param name="bgrade">阶段x/c/g</param>
        /// <param name="subject">科目01/02......</param>
        /// <returns></returns>
        List<Edition> QueryEditionlistOld(string bgrade, string subject);


        /// <summary>
        /// 电子作业---同步教材
        /// 获取小学、初中目录结构
        /// </summary>
        /// <param name="dto">参数</param>
        /// <returns></returns>
        List<Book> QueryBookPoint(QuestionModel dto);

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
        List<Book> QueryBookDetail(QuestionModel dto);

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
        List<Mfg.Resouce.Models.Question> QueryMainSecClassDiff(QuestionModel dto, ref int TotalNumber);

        /// <summary>
        /// 电子作业---题
        /// </summary>
        /// <param name="dto">参数</param>
        /// <param name="TotalNumber">总数</param>
        /// <returns></returns>
        List<Mfg.Resouce.Models.Question> QueryMainSecClassDiffExts(QuestionModel dto, ref int TotalNumber);


        /// <summary>
        /// 题库资源---试题
        /// </summary>
        /// <param name="dto">参数</param>
        /// <param name="TotalNumber">总数</param>
        /// <returns></returns>
        List<Mfg.Resouce.Models.Question> ResQueryMainSecClassDiff(QuestionModel dto, ref int TotalNumber);

        /// <summary>
        /// 作业编辑-根据试题id集合去查找试题
        /// </summary>
        /// <param name="idlist"></param>
        /// <returns></returns>
        List<Mfg.Resouce.Models.Question> FindByIdlist(string subjectID, string idlist);

        /// <summary>
        /// 作业编辑-根据试题id集合去查找试题
        /// </summary>
        /// <param name="idlist"></param>
        /// <returns></returns>
        List<Mfg.Resouce.Models.Question> FindByIdlist(string subjectID, Int32[] idlist);

        /// <summary>
        /// 作业编辑-根据试题id集合去查找试题
        /// </summary>
        /// <param name="idlist"></param>
        /// <returns></returns>
        List<Mfg.Resouce.Models.Question> FindByIdlistOrderbyStyle(string subjectID, string idlist);


        /// <summary>
        /// 搜索
        /// </summary>
        /// <param name="keyword"></param>
        /// <param name="pno"></param>
        /// <param name="page"></param>
        /// <param name="allct"></param>
        /// <returns></returns>
        List<Resource.Entity.QuestionExt> GetQueryIndexs(QuestionSearch dto, out int allCount);

        /// <summary>
        /// 作业编辑-根据试题id集合去查找试题
        /// </summary>
        /// <param name="idlist"></param>
        /// <returns></returns>
        List<Mfg.Resouce.Models.Question> NewFindByIdlistOrderbyStyle(string subjectID, string idlist);


        #region 根据大年级  返回可配置的教材版本
        /// <summary>
        /// 根据大年级  返回可配置的教材版本
        /// </summary>
        /// <param name="bgrade">大年级的id   x,c,g</param>
        /// <returns></returns>
        List<Edition> QueryEditionlist(string bgrade);

        List<Edition> QueryEditionTchmaterialList(string bgrade, int edu);
        #endregion


        /// <summary>
        /// 随机取得同一道题型同知识点 同一年级的试题
        /// </summary>
        /// <param name="questionrandModel"></param>
        /// <returns></returns>
        Mfg.Resouce.Models.Question RandQuestion(QuestionRandModel questionrandModel);

        Mfg.Resouce.Models.Question RandQuestion(TeachCenterQuestionRandModel questionrandModel);

        /// <summary>
        /// 随机取得同一道题型同知识点 同一年级的试题
        /// </summary>
        /// <param name="questionrandModel"></param>
        /// <returns></returns>
        Mfg.Resouce.Models.Question RandQuestion(string SubjectID, int styleareid, int mainsecid, string grade, int[] idIntList, int diff);

        /// <summary>
        /// 获取题型
        /// </summary>
        /// <param name="f_style"></param>
        /// <returns></returns>
        //string GetStyle(int f_style);

        //ItemState GetStyle(int f_style);

        ItemState GetStyle(int f_style, int subjectId);

        ///// <summary>
        ///// 获取讲义--旧方法
        ///// 获取讲义--旧方法--知识讲解--例题--作业--...
        ///// </summary>
        ///// <param name="dto">参数</param>
        ///// <returns></returns>
        //List<Teach> FindBySecGrade(QuestionModel dto);


        /// <summary>
        /// 获取讲义--新方法
        /// 获取讲义--新方法--知识讲解--例题--作业--...
        /// </summary>
        /// <param name="dto"></param>
        SecMainqlist QuerySecmainQuesList(QuestionModel dto);

        /// <summary>
        /// 随机获取试题
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        List<Mfg.Resouce.Models.Question> RandQuestionList(QuestionModel dto);

        /// <summary>
        /// 通过学生ID获取教材版本
        /// </summary>
        /// <param name="conn"></param>
        /// <param name="userid"></param>
        /// <returns></returns>
        Dictionary<string, string> BllMfgGetUserBookInfo(string conn, int userid);

        /// <summary>
        /// 通过书本ID，获取书本信息
        /// </summary>
        /// <param name="bookid"></param>
        /// <param name="qcount"></param>
        /// <returns></returns>
        List<Point> QueryBookPoint(QuestionModel dto, string ok);

        #region 揪错
        /// <summary>
        /// 揪错
        /// </summary>
        /// <param name="model"></param>
        OperateType AddResource(CorrectionModel model);

        #endregion


        /// <summary>
        /// 叶子节点
        /// </summary>
        /// <param name="subjectID">科目</param>
        /// <param name="bookID">书ID</param>
        /// <param name="idList">ID集合</param>
        /// <returns></returns>
        List<Book> QuerySimpleBookChilds(string subjectID, string bookID, string[] idList);

        /// <summary>
        /// 获取最字节点上边一层的父级目录 只显示父级一层  小初使用
        /// </summary>
        /// <param name="BookID">书本目录ID</param>
        /// <returns>返回叶子节点的父级的集合</returns>
        List<Book> QuerySimpleBookList(QuestionModel dto);

        /// <summary>
        /// 获取最字节点上边一层的父级目录 只显示父级一层  小初使用
        /// </summary>
        /// <param name="edu">学制 0五四 1 六三</param>
        /// <param name="bgrade">大年级  x g c</param>
        /// <returns>返回书本的集合</returns>
        List<Point> QuerySimpleSmallList(QuestionModel dto);


        /// <summary>
        /// 获取最字节点上边一层的父级目录 只显示父级一层  高中使用
        /// </summary>
        /// <param name="wl">文理</param>
        /// <param name="subject">学科</param>
        /// <returns>返回书本的集合</returns>
        List<Point> QuerySimpleHightList(QuestionModel dto);

        /// <summary>
        ///  获取一个父节点或者多个父节点下的所有 知识点 和学习时间
        /// </summary>
        /// <param name="pointidAry"></param>
        /// <returns></returns>
        List<Point> QueryPointTimeList(QuestionModel dto, string[] pointidAry);

        /// <summary>
        /// 获取MFG用户数据
        /// </summary>
        /// <param name="constStr">用户为user</param>
        /// <param name="sid">用户ID</param>
        /// <returns></returns>
        MfgUserInfoModel GetMFGUser(string constStr, string sid);


        /// <summary>
        /// 更新MFG用户数据
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        bool UpdateMFGUserInfo(MfgUserInfoModel dto);

        #region 获取精品试题
        /// <summary>
        /// 根据必考类型获取 试题的集合
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="totalCount">总数</param>
        /// <param name="pno">页码</param>
        /// <param name="pageSize">每页显示数量</param>
        /// <returns></returns>
        //List<QuestionExt> GetGoodQuestion(QuestionModel dto, ref int totalCount, int pno = 1, int pageSize = 10);
        /// <summary>
        /// 根据考卷类型获取 试题的集合
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="totalCount"></param>
        /// <param name="pno"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        //List<QuestionExt> QueryQuestionPapertype(QuestionModel dto, ref int totalCount, int pno = 1, int pageSize = 10);
        /// <summary>
        /// 根据必考类型获取 试题的集合
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="totalCount"></param>
        /// <param name="pno"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        //List<QuestionExt> QueryQuestionBikao(QuestionModel dto, ref int totalCount, int pno = 1, int pageSize = 10);

        #endregion

        /// <summary>
        /// 根据知识点ID获取学习目标
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        SecMain GetSecMainById(QuestionModel dto);

        List<SecMain> GetSecMainById(QuestionModel dto, int[] idlist);

        /// <summary>
        /// 返回纯文本试题
        /// </summary>
        /// <param name="subjectID"></param>
        /// <param name="idlist"></param>
        /// <returns></returns>
        List<string> FindByIdlistText(string subjectID, string idlist);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="aryStrings">0：知识点ID，1:题型ID，2:题目数量,3:d x 大题型，小题型</param>
        /// <param name="grade"></param>
        /// <param name="subjectId"></param>
        /// <returns></returns>
        List<Resouce.Models.Question> QueryQuestions(string[] aryStrings, string grade, string subjectId);


        /// <summary>
        /// 通过书本ID获取教材
        /// </summary>
        /// <param name="p1"></param>
        /// <param name="p2"></param>
        /// <returns></returns>
        Tchmaterial FindOne(string p1, string p2);

        /// <summary>
        /// 根据大年纪获取试卷版本列表
        /// </summary>
        /// <param name="bGrade"></param>
        /// <param name="subject"></param>
        /// <returns></returns>
        List<Edition> GetPaperMaterial(string bGrade, string subject);


        /// <summary>
        /// 
        /// </summary>
        /// <param name="mainsecid"></param>
        /// <param name="grade"></param>
        /// <param name="inputct"></param>
        /// <returns></returns>
        List<Resouce.Models.Question> RandQuestionListExts(QuestionModel dto);


        List<Resouce.Models.Question> FindByIdlistExt(string subjectID, string idlist);


        List<Resouce.Models.Question> QueryCollectQuestion(QuestionModel dto, out int allCount);


        /// <summary>
        /// 根据试题 获取试题所有的标签
        /// </summary>
        /// <param name="qid">试题id</param>
        /// <returns>放回标签的集合</returns>
        List<CollectMark> GetQuestionMark(CollectionModel p);


        /// <summary>
        /// 获取试题是否被收藏
        /// </summary>
        /// <param name="idListAry">试题集合</param>
        /// <param name="userId">用户id</param>
        /// <returns>返回收藏的集合</returns>
        List<CollectQuestionState> GetQuestionListCollectState(int[] idList, int userID, string subject);

        /// <summary>
        /// 获取用户所有的标签名称
        /// </summary>
        /// <param name="userId">用户id</param>
        /// <returns>返回用户的所有的标签</returns>
        List<QCollectMark> QueryMarkList(int userID);


        /// <summary>
        /// 添加收藏、修改收藏
        /// </summary>
        /// <param name="userID">用户id</param>
        /// <param name="f_id">试题id</param>
        /// <param name="listMark">标签的id的集合</param>
        /// <param name="subjectID">科目</param>
        bool UpdateQuestionCollect(int userID, int f_id, int orgID, List<int> listMark, string subjectID);

        /// <summary>
        /// 获取教案 知识点ID
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="secid"></param>
        /// <returns></returns>
        List<Mfg.Resouce.Models.SecTestQuestion> GetSecTestQ(string subjectId, int[] secid);
        /// <summary>
        /// 获取教案 目录ID
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="secid"></param>
        /// <returns></returns>
        List<Mfg.Resouce.Models.SecTestQuestion> GetPointTestQ(string subjectId, string[] secid);

        /// <summary>
        /// 根据目录ID 获取知识点ID
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="pointid"></param>
        /// <returns></returns>
        int FindOneByPointId(string subjectId, string pointid);
    }
}
