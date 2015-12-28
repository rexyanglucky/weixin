/*
 * author:谢利民;
 * function:题目相关功能的接口
 * date:2015-05-02
 * updateDate:2015-05-02
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;

namespace Mfg.EI.InterFace
{
    /// <summary>
    /// 在线考试接口的功能
    /// </summary>
    public interface IExamOnline
    {

        #region 添加一份考试

        /// <summary>
        /// 添加一份考试
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool Add(EI_Exam model);

        /// <summary>
        /// 添加一份考试(老师考试)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool AddTea(EI_Exam model);

        #endregion

        #region 获取未提交未批改的考试数量

        /// <summary>
        /// 获取未提交未批改的考试数量
        /// </summary>
        /// <param name="roleType"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        int GetEI_ERelSCount(UserTypeEnum roleType, int userID, string bGrade);

        #endregion

        #region 获取考试列表(老师分页)

        /// <summary>
        /// 获取考试列表(老师分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        List<ExamModel> LoadExamList(Dictionary<string, object> dic, out int count);

        /// <summary>
        /// 获取考试列表(老师考试分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        List<ExamModel> LoadTeaExamList(Dictionary<string, object> dic, out int count);
        #endregion

        #region 获取考试列表(微信分页)
        /// <summary>
        /// 获取考试列表(微信分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        List<ExamModel> LoadExamList2Weixin(SearchObjModel searchObjModel, out int count);
        #endregion

        #region 获取考试列表(学生分页)

        /// <summary>
        /// 获取考试列表(学生分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        List<ExamModel> LoadExamList2Student(Dictionary<string, object> dic, out int count);

        #endregion

        #region 获取考试布置

        /// <summary>
        /// 获取考试布置
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        SettedExamModel GetSettedExam(string ID);


        /// <summary>
        /// 获取考试布置(老师考试)
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        SettedExamModel GetTeaSettedExam(string ID);


        #endregion

        #region 获取考试试题
        /// <summary>
        /// 获取考试试题
        /// </summary>
        /// <param name="ID">考试ID</param>
        /// <param name="SID">学生ID</param>
        /// <returns></returns>
        SettedExamModel GetExamItem(string ID, string SID);


        /// <summary>
        /// 获取考试试题(老师考试)
        /// </summary>
        /// <param name="ID">考试ID</param>
        /// <param name="SID">学生ID</param>
        /// <returns></returns>
        SettedExamModel GetTeaExamItem(string ID, string TID);

        #endregion

        #region 删除考试
        /// <summary>
        /// 删除考试
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        bool DeleteExam(string ID);

        /// <summary>
        /// 删除考试(老师考试 我的试卷)
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        bool DeleteTeaExamBook(string ID);

        /// <summary>
        /// 删除考试(老师考试 我的布置)
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        bool DeleteTeaExam(string ID);
        #endregion

        #region 批量添加答案(初始化答案)

        /// <summary>
        /// 批量添加答案(初始化答案)
        /// </summary>
        /// <param name="eID"></param>
        /// <param name="sID"></param>
        /// <param name="settedModel"></param>
        /// <returns></returns>
        bool BatchAddAnswer(string eID, string sID, SettedExamModel settedModel);


        /// <summary>
        /// 批量添加答案(初始化答案 老师考试)
        /// </summary>
        /// <param name="eID"></param>
        /// <param name="tID"></param>
        /// <param name="settedModel"></param>
        /// <returns></returns>
        bool BatchAddTeaAnswer(string eID, string tID, SettedExamModel settedModel);

        #endregion

        #region 提交答案

        /// <summary>
        /// 提交答案
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool SubmitAnswer(EAnswerModel model);

        /// <summary>
        /// 提交答案(老师考试)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool SubmitTeaAnswer(EAnswerModel model);
        #endregion

        #region 提交试卷
        /// <summary>
        /// 提交试卷
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool SubmitExam(ERelSModel model);

        /// <summary>
        /// 提交试卷(老师考试)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool SubmitTeaExam(ERelSModel model);
        #endregion

        #region 在线考试分析

        /// <summary>
        /// 获取学生回答情况
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        List<StudentExamModel> GetStudentByExamID(string examId, string sid = "");

        /// <summary>
        /// 获取掌握分析
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        List<StudentExamModel> GetKnowledgeListByExamID(string examId, string sid = "");

        /// <summary>
        /// 获取学生回答表详细信息
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        List<StudentExamModel> GetExamAnswerDetialByExamID(string examId, string sid = "");

        List<StudentExamModel> GetExamAnswerDetialByExamID(string examId, ref List<StudentModel> students, string sid = "");

        #endregion

        #region 在线考试分析 教学基本功

        /// <summary>
        /// 获取学生回答情况
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        List<StudentExamModel> TeaGetStudentByExamID(string examId, string sid = "");

        ///// <summary>
        ///// 获取掌握分析
        ///// </summary>
        ///// <param name="examId"></param>
        ///// <param name="sid"></param>
        ///// <returns></returns>
        //List<StudentExamModel> TeaGetKnowledgeListByExamID(string examId, string sid = "");

        ///// <summary>
        ///// 获取学生回答表详细信息
        ///// </summary>
        ///// <param name="examId"></param>
        ///// <param name="sid"></param>
        ///// <returns></returns>
        List<StudentExamModel> TeaGetExamAnswerDetialByExamID(string examId, string sid = "");

        List<StudentExamModel> TeaGetExamAnswerDetialByExamID(string examId, ref List<StudentModel> students, string sid = "");

        #endregion

        #region 组卷考试并不布置

        /// <summary>
        /// 获取在线考试信息
        /// </summary>
        /// <param name="exammodel"></param>
        /// <returns></returns>
        ExamModel GetExamModel(string examId);

        /// <summary>
        /// 更新在线考试
        /// </summary>
        /// <param name="exammodel"></param>
        /// <returns></returns>
        bool UpdateExamModel(ExamModel exammodel);

        /// <summary>
        /// 更新在线考试
        /// </summary>
        /// <param name="exammodel"></param>
        /// <returns></returns>
        bool UpdateExamModelToCache(ExamModel exammodel);

        /// <summary>
        /// 获取布置对象
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        List<TreeModel> GetWorkList(string tid, int orgid);

        /// <summary>
        /// 删除试题
        /// </summary>
        /// <param name="delmodel"></param>
        /// <returns></returns>
        bool DeleteItem(DeleteQuesModel delmodel);

        bool DeleteAllItem(DeleteQuesModel deletemodel);
        #endregion

        #region 保存题目

        string SaveJRelI(List<ERelIModel> list, Int32 mBook);

        string SaveTJRelI(List<ERelIModel> list, Int32 mBook);
        #endregion


        /// <summary>
        /// 查询题目
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        List<ERelIGetModel> GetInit(EI_Base<EI_ERelI> dto);


        /// <summary>
        /// 查询题目
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        List<ERelIGetModel> GetTInit(EI_Base<EI_ERelI> dto);


        /// <summary>
        /// 获取作业主信息
        /// </summary>
        /// <param name="eI_Job">参数</param>
        ExamInfoModel GetExam(EI_Exam eI_Job);

        /// <summary>
        /// 获取作业主信息
        /// </summary>
        /// <param name="eI_Job">参数</param>
        ExamInfoModel GetTExam(EI_Exam eI_Job);


        #region 批改试卷
        /// <summary>
        /// 批改电子作业
        /// </summary>
        /// <param name="comments"></param>
        /// <returns></returns>
        bool CommnetJob(List<StudentExamItemModel> comments, string tid, string tname);


        bool SaveTeacherCommnet(string jobId, string sid, string commnet);

        bool ChangeJobState(StudentExamModel examModel, string tid, string tname);
        #endregion

        #region 批改试卷 教学基本功
        /// <summary>
        /// 批改电子作业
        /// </summary>
        /// <param name="comments"></param>
        /// <returns></returns>
        bool TeaCommnetJob(List<StudentExamItemModel> comments, string tid, string tname);


        bool TeaSaveTeacherCommnet(string jobId, string sid, string commnet);

        bool TeaChangeJobState(StudentExamModel examModel, string tid, string tname);
        #endregion

        #region 学生添加笔记
        bool AddItemNote(string eaid, string noteContent);
        #endregion
        #region 老师添加笔记 教学基本功
        bool TeaAddItemNote(string jaid, string noteContent);
        #endregion


        bool AddWrongBook(StudentExamModel examModel);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        bool ExitsJob(string jobId, string itemId);

        /// <summary>
        /// 智能换题是否存在作业本记录
        /// </summary>
        /// <returns></returns>
        bool ExitsBookJob(string jobId, string itemId);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="bookId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        bool ExitsTeaExam(string bookId, string itemId);

        /// <summary>
        /// 智能换题
        /// </summary>
        /// <returns></returns>
        bool AddErelItem(EI_ERelI model);

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        bool AddEBookItem(JBookRelIModel model);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool AddTeaBookItem(TeaExamBookRelIModel model);



        List<TagKeepReponseModel> GetInitTagKeep(TagKeepInitModel tag);

        #region 作业箱列表
        /// <summary>
        /// 作业箱列表
        /// </summary>
        /// <returns></returns>
        void GetJobBookList(ParamFilterModel filterModel);
        #endregion

        #region 删除作业箱
        bool DeleteBookInfo(string bookID);
        #endregion


        #region 获取编辑页面信息
        /// <summary>
        /// 获取编辑页面信息
        /// </summary>
        /// <param name="bookID"></param>
        /// <returns></returns>
        JobBookModel GetJobBookModel(string bookID);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        TeaExamBookModel GetExamBookModel(string id);


        /// <summary>
        /// 获取教师基本功能编辑页面信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        TeaExamBookModel GetTeaExamBookModel(string id);

        #endregion

        #region 删除编辑列表试题
        bool DeleteBookItem(DeleteQuesModel delmodel);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="delmodel"></param>
        /// <returns></returns>
        bool DeleteTeaBookItem(DeleteQuesModel delmodel);
        #endregion

        #region 删除编辑列表试题
        bool DeleteAllBookItem(DeleteQuesModel delmodel);
        #endregion

        #region 修改作业本
        /// <summary>
        /// 修改作业本
        /// </summary>
        /// <param name="bookModel"></param>
        /// <returns></returns>
        bool UpdateBookInfo(JobBookModel bookModel);

        bool UpdateBookInfoToCache(JobBookModel bookModel);
        #endregion


        #region 保存作业箱
        bool SaveBookInfo(JobBookModel bookModel);

        /// <summary>
        /// 保存教师基本功编辑信息
        /// </summary>
        /// <param name="teaModel"></param>
        /// <returns></returns>
        bool SaveTeaExamInfo(TeaExamBookModel teaModel);

        bool SaveTeaExamInfoToCache(TeaExamBookModel teaModel);
        #endregion

        bool MoveItem(string eid, string oldId, string newId);
        bool ChangeItem(QuestionRandModel questionrandModel, Resource.Entity.Question questionentity);

        #region
        /// <summary>
        /// 保存作业布置对象
        /// </summary>
        /// <param name="jobmodel"></param>
        /// <returns></returns>
        bool SaveObject(ExamModel exammodel);

        bool SaveTeaObject(ExamModel exammodel);

        #endregion

        #region 获取教师布置对象
        List<TreeModel> GetTeaTree(string tid, int orgid);
        #endregion





        void RemoveKey(RedisTypeEnum redisTypeEnum, string id);

        #region 微信调用
        /// <summary>
        /// 微信调用，获取考试题目信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        StudentExamModel GetExamDetialByJobID(string examId, string sid);
        /// <summary>
        /// 微信调用，获取学生回答详细信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        StudentExamModel GetAnswerDetialByJobID(string jobId, string sid);
        #endregion





    }
}
