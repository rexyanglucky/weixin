using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.InterFace.GoodPaper;
using Mfg.EI.ViewModel;
using Mfg.Resource.Entity;

namespace Mfg.EI.InterFace
{
    public interface IGoodQuestion
    {
        #region 获取好题
        /// <summary>
        /// 精品试题的集合
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="totalCount">总数</param>
        /// <param name="pno">页码</param>
        /// <param name="pageSize">每页显示数量</param>
        /// <returns></returns>
        // List<QuestionExtModel> GetGoodQuestion(TagKeepModel model, QuestionModel dto, ref int totalCount, int pno = 1, int pageSize = 10);
        #endregion

        /// <summary>
        /// 获取用户收藏知识点
        /// </summary>
        /// <param name="TID"></param>
        /// <returns></returns>
        List<TagPointModel> GetTagKeep(int TID, string SubjectID);

        #region 获取精品试卷

        /// <summary>
        /// 好卷列表
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="grade"></param>
        /// <param name="term"></param>
        /// <param name="examType"></param>
        /// <param name="examVersion"></param>
        /// <param name="name"></param>
        /// <param name="orderByName"></param>
        /// <param name="pno"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        List<ETaoPaper> GetGoodPaper(string subjectId, string grade, string examType, string examVersion, string orderByName, int pno, out int totalCount);
        /// <summary>
        /// 搜索
        /// </summary>
        /// <param name="subjectId"></param>
        /// <param name="name"></param>
        /// <param name="orderByName"></param>
        /// <param name="pno"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        List<ETaoPaper> SearchGoodPaper(string subjectId, string name, string orderByName, int pno, out int totalCount);
        List<ETaoPaper> GetPaperList(string subjectId, List<int> ids, int pno);
        ETaoPaper GetPaperDetial(string subjectid, string paperId);

        byte[] DownLoadPaper(string subjectid, string paperId);
        #endregion

        #region 获取收藏试题
        List<TagKeepModel> GetTagKeepData(string TID, int KnowledgeID, string SubjectID);
        #endregion


        #region MyRegion

        /// <summary>
        /// 好题添加收藏
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool Add(TagKeepModel model);

        #endregion

        #region 获取好题收藏
        /// <summary>
        /// 获取好题收藏
        /// </summary>
        /// <param name="model"></param>
        /// <param name="skip"></param>
        /// <param name="take"></param>
        /// <returns></returns>
        List<QuestionExtModel> GetTagKeep(TagKeepModel model, int skip, int take, out int count);

        #endregion

        #region 获取好题收藏
        /// <summary>
        /// 获取好题收藏
        /// </summary>
        /// <param name="model"></param>
        /// <param name="skip"></param>
        /// <param name="take"></param>
        /// <returns></returns>
        List<TagKeepModel> GetTagKeep(TagKeepModel model);

        #endregion

        #region 删除好题收藏
        /// <summary>
        /// 删除好题收藏
        /// </summary>
        /// <param name="tID"></param>
        /// <param name="itemID"></param>
        /// <returns></returns>
        bool DeleteTagKeepData(string tID, int itemID);

        #endregion

        /// <summary>
        /// 获取系统的收藏列表
        /// </summary>
        /// <returns></returns>
        List<TagModel> GetTag();
    }
}
