using Climb.Core;
using Mfg.EI.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.Resouce.Models;

namespace Mfg.EI.InterFace
{
    public interface IExamPaper
    {
        bool Add(EI_UploadExam eI_UploadExam, int orgId, int userId);

        List<EI_UploadExam> ExamShare();

        List<EI_UploadExam> MyUpExamPaper(int orgId);

        List<EI_UploadExam> MyCollect(int orgId);

        List<EI_UploadExam> GetAllData();

        List<EI_UploadExam> GetExamType(int examType);
        List<EI_UploadExam> GetExamVersion(int version);
        List<EI_UploadExam> GetGrade(int grade);

        List<EI_UploadExam> GetName(int name);

        List<EI_UploadExam> GetOrderBy(string orderBy);

        List<EI_UploadExam> GetPreviewCount(int count);

        List<EI_UploadExam> GetWhere(
            string grade,
            string examType,
            string examVersion,
            string name,
            string menuType,
            string subjectId,
            string createBy,
            string orderByName,
            string orderByType,
            string orgId = "");

        /// <summary>
        /// 添加收藏的数据
        /// </summary>
        /// <param name="eI_Favorite"></param>
        /// <returns></returns>
        bool Add(EI_Favorite eI_Favorite);
        /// <summary>
        /// 获取收藏字符串
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        string GetFav(string tid, string subjectID);

        //试卷添加人气
        EI_UploadExam AddClickCount(string id);
        /// <summary>
        /// 删除收藏
        /// </summary>
        /// <param name="eIFavorite"></param>
        /// <returns></returns>
        bool DeleteFav(EI_Favorite eIFavorite);


        /// <summary>
        /// 删除收藏
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        bool DeletePaper(string id);


        #region 题库 试卷


        /// <summary>
        /// 添加收藏
        /// </summary>
        /// <param name="subject">科目</param>
        /// <param name="org">机构ID</param>
        /// <param name="userid">用户ID</param>
        /// <param name="paper">试卷ID</param>
        /// <returns>成功 or 失败</returns>
        bool AddQuePaperColl(string subject, int org, int userid, int paper);




        /// <summary>
        /// 从收藏中删除
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="userid"></param>
        /// <param name="paper"></param>
        /// <returns></returns>
        bool RemoveQuePaperColl(string subject, int userid, int paper);


        /// <summary>
        /// 更具年份获取数据
        /// </summary>
        /// <param name="subject">科目</param>
        /// <param name="user">用户ID</param>
        /// <param name="year">年份,0时为2013年以前的数据</param>
        /// <param name="tid">类型ID</param>
        /// <param name="pno">页码</param>
        /// <param name="psize">单页条数</param>
        /// <param name="allconut">所有条数</param>
        /// <returns></returns>
        List<Paper> GetQuePaperCollByYear(string subject, int user, int year, int tid, int pno, int psize,
            out int allconut);


        /// <summary>
        /// 试卷ID获取试题
        /// </summary>
        /// <param name="subject">科目</param>
        /// <param name="id">试卷ID</param>
        /// <returns></returns>
        List<Resouce.Models.Question> GetOnePaper(string subject, int id);



        /// <summary>
        /// 获取试卷标签
        /// </summary>
        /// <param name="stage">阶段 x c g</param>
        /// <returns></returns>
        List<Papertype> GetTags(string stage);



        /// <summary>
        /// 
        /// </summary>
        /// <param name="tp">机构2  系统 1</param>
        /// <param name="subject">科目</param>
        /// <param name="grade">年级</param>
        /// <param name="edition">版本</param>
        /// <param name="edu">学制</param>
        /// <param name="term">学期</param>
        /// <param name="tag">标签</param>
        /// <param name="wl">文理</param>
        /// <param name="year">年</param>
        /// <param name="area">地区</param>
        /// <param name="uid">用户id</param>
        /// <param name="pno">页码</param>
        /// <param name="count">总条数</param>
        /// <returns>试卷集合</returns>
        List<Paper> GetQuePapers(
            int tp,
            string subject,
            string grade,
            int edition,
            int edu,
            int term,
            int tag,
            int wl,
            int year,
            string area,
            int uid,
            int pno,
            out int count);


        /// <summary>
        /// 全文检索 试卷
        /// </summary>
        /// <param name="subject">科目</param>
        /// <param name="key">关键字</param>
        /// <param name="pno">页码</param>
        /// <param name="count">总条数</param>
        /// <param name="time">总时间</param>
        /// <returns></returns>
        List<Paper> SearchPaper(string subject, string key, int pno, out int count, out double time);



        /// <summary>
        /// 搜索试卷,排除指定的ID
        /// </summary>
        /// <param name="subject"></param>
        /// <param name="key"></param>
        /// <param name="noids"></param>
        /// <param name="pno"></param>
        /// <param name="count"></param>
        /// <param name="time"></param>
        /// <returns></returns>
        List<Paper> SearchPaper(string subject, string key, int[] noids, int pno, out int count, out double time);

        /// <summary>
        /// 全文检索 试题
        /// </summary>
        /// <param name="subject">科目</param>
        /// <param name="key">关键字</param>
        /// <param name="pno">页码</param>
        /// <param name="count">数量</param>
        /// <param name="time">用时</param>
        List<Resouce.Models.Question> SearchQues(string subject, string key, int pno, out int count, out double time);


        /// <summary>
        /// 获取单个试卷
        /// </summary>
        /// <param name="id">试卷ID</param>
        /// <param name="subject">科目</param>
        /// <param name="userid">用户ID</param>
        /// <param name="isColl">是否收藏</param>
        /// <returns></returns>
        Paper GetOnePaper(int id, string subject, int userid, out int isColl);




        /// <summary>
        ///  获取前10条
        /// </summary>
        /// <param name="p"></param>
        /// <param name="subject"></param>
        /// <returns></returns>
        List<Paper> GetSuPaper(Paper p, string subject);

        #endregion


    }


}
