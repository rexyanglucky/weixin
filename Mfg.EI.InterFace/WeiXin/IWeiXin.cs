using Mfg.EI.ViewModel;
using Mfg.EI.WeiXin.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.InterFace.WeiXin
{
    public interface IWeiXin
    {
        #region 公共方法查询
        List<Subject> SubjectList { get; }
        #endregion

        #region 绑定学生信息
        /// <summary>
        /// 查询绑定信息
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        RefStudent GetBindInfo(string WeiXin,string AppId);
        /// <summary>
        /// 判断家长是否绑定微信
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        bool IsBind(string WeiXin,string AppId);
        /// <summary>
        /// 提交家长信息
        /// </summary>
        /// <param name="model"></param>
        /// <param name="MfgID"></param>
        /// <returns></returns>
        bool SubmitParentInfo(FamilyInfoModel model);
        #endregion

        #region 最新通知
        List<OrgBulletin> BulletinList(string WeiXin, int pageIndex, out int totalCount);
        /// <summary>
        /// 查询单条公告
        /// </summary>
        /// <param name="Bid"></param>
        /// <returns></returns>
        OrgBulletin SingleInfo(int Bid);
        #endregion

        #region 查询老师信息
        /// <summary>
        /// 通过微信查询老师信息
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        IList<Teacher> TeacherList(string WeiXin);
        #endregion

        #region 查询学生绑定科目
        /// <summary>
        /// 查询学生绑定科目
        /// </summary>
        /// <param name="SID"></param>
        /// <returns></returns>
        List<int> SubList(string SID);
        #endregion

        #region 查询学生信息
        /// <summary>
        /// 微信帐号查询学生信息
        /// </summary>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        StudentInfo QueryStudentByWeiXin(string OpenId,string AppId);
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

        #region 作业详情
        /// <summary>
        /// 未回答作业
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <param name="pageIndex"></param>
        /// <param name="toalCount"></param>
        /// <returns></returns>
        StudentJobItemModel GetJobDetialByJobID(string jobId, string sid, int pageIndex, out int toalCount);
        /// <summary>
        /// 已回答作业
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <param name="pageIndex"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        StudentJobItemModel GetAnswerDetialByJobID(string jobId, string sid, int pageIndex, out int totalCount);
        #endregion

        #region 考试详情
        /// <summary>
        /// 未回答考试
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <param name="pageIndex"></param>
        /// <param name="toalCount"></param>
        /// <returns></returns>
        StudentExamItemModel GetExamDetialByExamID(string examId, string sid, int pageIndex, out int toalCount);
        /// <summary>
        /// 已回答考试
        /// </summary>
        /// <param name="examId"></param>
        /// <param name="sid"></param>
        /// <param name="pageIndex"></param>
        /// <param name="totalCount"></param>
        /// <returns></returns>
        StudentExamItemModel GetExamAnswerDetialByExamID(string examId, string sid, int pageIndex, out int totalCount);
        #endregion

        #region 错题本

        StudentWrongItemModel GetWrongItem(string sid, string subjectID, int pageIndex, out int totalCount,out int alltotal);

        #endregion
    }
}
