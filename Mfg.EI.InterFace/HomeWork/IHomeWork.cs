/*
 * author:杨礼文;
 * function:电子作业接口
 * date:2015-05-02
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using Mfg.EI.DAL;
namespace Mfg.EI.InterFace
{
    public interface IHomeWork
    {
        #region 添加一份电子作业
        /// <summary>
        /// 添加一份电子作业
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool Add(EI_Job model);

        /// <summary>
        /// 布置巩固作业
        /// </summary>
        /// <param name="jid">作业ID，考试ID</param>
        /// <param name="items">要布置的试题列表</param>
        /// <param name="type">类别，0 作业，1 考试</param>
        /// <param name="newjid"></param>
        /// <returns></returns>
        bool AddJob(string jid, string items, int type, out string newjid);
        #endregion

        #region 获取未提交未批改的作业数量

        /// <summary>
        /// 获取未提交未批改的作业数量
        /// </summary>
        /// <param name="roleType"></param>
        /// <param name="UserID"></param>
        /// <returns></returns>
        int GetEI_JRelSCount(UserTypeEnum roleType, int userID, string bGrade);

        #endregion

        #region 获取作业列表(老师分页)
        /// <summary>
        /// 获取作业列表(老师分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        List<EI_Job> LoadJobList(Dictionary<string, object> dic, out int count);

        #endregion

        #region 获取作业列表(微信分页)
        /// <summary>
        /// 获取作业列表(微信分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        List<EI_Job> LoadJobList2Weixin(Dictionary<string, object> dic, out int count);
        #endregion

        #region 获取作业列表(学生分页)
        /// <summary>
        /// 获取作业列表(学生分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        List<EI_Job> LoadJobList2Student(Dictionary<string, object> dic, out int count);

        #endregion

        #region 删除电子作业
        /// <summary>
        /// 删除电子作业
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        bool DeleteJob(string ID);

        #endregion

        #region 获取查看作业布置
        /// <summary>
        /// 获取查看作业布置
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        SettedModel GetSetted(string ID);
        #endregion

        #region 获取电子作业题

        /// <summary>
        /// 获取电子作业题
        /// </summary>
        /// <param name="ID">考试ID</param>
        /// <param name="SID">学生ID</param>
        /// <returns></returns>
        SettedModel GetJobItem(string ID, string SID);

        #endregion

        #region 批量添加答案(初始化答案)

        /// <summary>
        /// 批量添加答案(初始化答案)
        /// </summary>
        /// <param name="jID"></param>
        /// <param name="sID"></param>
        /// <param name="settedModel"></param>
        /// <returns></returns>
        bool BatchAddAnswer(string jID, string sID, SettedModel settedModel);
        #endregion

        #region 提交答案

        /// <summary>
        /// 提交答案
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool SubmitAnswer(JAnswerModel model);
        #endregion

        #region 提交作业

        /// <summary>
        /// 提交作业
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool SubmitJob(JRelSModel model);

        #endregion

        #region 根据教师ID获取布置对象
        /// <summary>
        /// 根据教师ID获取布置对象
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        List<TreeModel> GetWorkList(string tid, int orgid);
        #endregion

        #region 电子作业分析
        /// <summary>
        /// 获取学生回答情况
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        List<StudentJobModel> GetStudentByJobID(string jobId, string sid);
        /// <summary>
        /// 获取掌握分析
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        List<StudentJobModel> GetKnowledgeListByJobID(string jobId, string sid = "");
        /// <summary>
        /// 获取学生回答表详细信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        List<StudentJobModel> GetJobAnswerDetialByJobID(string jobId, string sid = "");

        List<StudentJobModel> GetJobAnswerDetialByJobID(string jobId, ref List<StudentModel> students, string sid = "");

        #endregion


        #region 获取一份电子作业的信息

        /// <summary>
        /// 根据电子作业ID查找电子作业
        /// </summary>
        /// <returns></returns>
        JobModel GetJobModel(string jobId);
        #endregion

        #region 电子作业编辑

        /// <summary>
        /// 电子作业编辑
        /// </summary>
        /// <param name="jobmodel"></param>
        /// <returns></returns>
        bool UpdateJobModel(JobModel jobmodel);
        /// <summary>
        /// 电子作业编辑
        /// </summary>
        /// <param name="jobmodel"></param>
        /// <returns></returns>
        bool UpdateJobModelToCache(JobModel jobmodel);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        bool ExitsJob(string jobId, string itemId);

        bool ExitsBookJob(string bookId, string itemId);
        /// <summary>
        /// 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool AddJRelModel(EI_JRelI model);

        bool AddJBookModel(JBookRelIModel model);
        #endregion


        #region 保存题目

        string SaveJRelI(List<JRelIModel> list, Int32 mbook);
        #endregion

        /// <summary>
        /// 查询题目
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        List<JRelIGetModel> GetInit(EI_Base<EI_JRelI> dto);

        /// <summary>
        /// 删除试题
        /// </summary>
        /// <param name="delmodel"></param>
        /// <returns></returns>
        bool DeleteItem(DeleteQuesModel delmodel);

        bool DeleteAllItem(DeleteQuesModel deletemodel);

        /// <summary>
        /// 获取作业主信息
        /// </summary>
        /// <param name="eI_Job">参数</param>
        JobInfoModel GetJob(EI_Job eI_Job);

        #region 批改电子作业
        /// <summary>
        /// 批改电子作业
        /// </summary>
        /// <param name="comments"></param>
        /// <returns></returns>
        bool CommnetJob(List<StudentJobItemModel> comments, string tid, string tname);




        #endregion
        #region 学生添加笔记
        /// <summary>
        /// 修改学生笔记
        /// </summary>
        /// <param name="jaid">答题表ID</param>
        /// <param name="comment">笔记内容</param>
        /// <returns></returns>
        bool AddItemNote(string jaid, string noteContent);
        #endregion

        #region 学生 - 电子作业

        List<JobQuestionDTO> GetQuestions(Guid jobID);

        bool AnswerQuestion(EI_JAnswer model);

        bool UpdateTheQuestion(EI_JAnswer model);

        bool IsAnswerTheQuestion(int studentID, Guid jobID, int questionID);

        bool CompleteHomeWork(int studentID, Guid jobID);

        EI_JAnswer GetTheAnswer(int studentID, Guid jobID, int questionID);

        #endregion

        bool ChangeJobState(StudentJobModel jobModel, string tid, string tname);

        bool AddWrongBook(StudentJobModel jobModel);

        bool AddJob(string jobId, int type, out string newjid, string items);

        bool SaveTeacherCommnet(string jid, string sid, string commnet);

        #region 作业箱列表
        /// <summary>
        /// 作业箱列表
        /// </summary>
        /// <returns></returns>
        void GetJobBookList(ParamFilterModel filterModel);
        #endregion

        #region 保存作业箱
        bool SaveBookInfo(JobBookModel bookModel);
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

        #endregion

        #region 删除编辑列表试题
        bool DeleteBookItem(DeleteQuesModel delmodel);
        #endregion

        #region 根据类型删除所有试题
        bool DeleteAllBookItem(DeleteQuesModel deletemodel);
        #endregion

        List<TagKeepReponseModel> GetInitTagKeep(TagKeepInitModel tag);

        #region 修改作业本
        /// <summary>
        /// 修改作业本
        /// </summary>
        /// <param name="bookModel"></param>
        /// <returns></returns>
        bool UpdateBookInfo(JobBookModel bookModel);

        bool UpdateBookInfoToCache(JobBookModel bookModel);
        #endregion


        TagPointPageModel GetTagList(TagPointPageParaModel para);

        #region
        /// <summary>
        /// 保存作业布置对象
        /// </summary>
        /// <param name="jobmodel"></param>
        /// <returns></returns>
        bool SaveObject(JobModel jobmodel);
        #endregion

        bool ChangeItem(QuestionRandModel oldItemId, Resource.Entity.Question newItem);
        bool MoveItem(string jid, string oldId, string newId);


        /// <summary>
        /// 微信调用，获取job题目信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        StudentJobModel GetJobDetialByJobID(string jobId, string sid);
        /// <summary>
        /// 微信调用，获取学生回答详细信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        StudentJobModel GetAnswerDetialByJobID(string jobId, string sid);


    }
}
