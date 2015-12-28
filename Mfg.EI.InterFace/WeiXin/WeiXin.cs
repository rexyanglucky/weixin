using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.WeiXin.ViewModel;
using Mfg.EI.Common;
using Mfg.EI.ViewModel;
namespace Mfg.EI.InterFace.WeiXin
{
    public class WeiXin : IWeiXin
    {
        private Mfg.EI.DAL.WeiXin.Contact.BindInfo _BindInfo = new DAL.WeiXin.Contact.BindInfo();
        private Mfg.EI.DAL.WeiXin.Student.StudentInfo _student = new DAL.WeiXin.Student.StudentInfo();
        private Mfg.EI.DAL.WeiXin.Bulletin.BulletinDAL _bulletin = new DAL.WeiXin.Bulletin.BulletinDAL();
        private Mfg.EI.DAL.AnnouncementDal _announcement = new DAL.AnnouncementDal();
        private IHomeWork _homeWork;
        private IExamOnline _examOnline;
        private IStudent _stu;
        private IWrong _wrong;

        public WeiXin(IHomeWork homeWork, IStudent stu, IExamOnline examonline,IWrong wrong)
        {
            _homeWork = homeWork;
            _stu = stu;
            _examOnline = examonline;
            _wrong = wrong;
        }
        #region 公共方法查询
        public List<Subject> SubjectList
        {
            get
            {
                return ModelConvertHelper<Subject>.ConvertToModelList(_announcement.GetList().Tables[0]);
            }
        }
        #endregion

        #region 绑定信息接口
        /// <summary>
        /// 查询绑定信息
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        public RefStudent GetBindInfo(string WeiXin,string AppId)
        {
            return ModelConvertHelper<RefStudent>.ConvertToModel(_BindInfo.GetBindInfo(WeiXin,AppId).Tables[0]);
        }
        /// <summary>
        /// 判断家长是否绑定微信
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        public bool IsBind(string WeiXin, string AppId)
        {
            return _BindInfo.IsBind(WeiXin,AppId);
        }
        /// <summary>
        /// 提交家长信息
        /// </summary>
        /// <param name="model"></param>
        /// <param name="MfgID"></param>
        /// <returns></returns>
        public bool SubmitParentInfo(FamilyInfoModel model)
        {
            return _BindInfo.SubmitParentInfo(model);
        }
        #endregion

        #region 最新通知接口
        /// <summary>
        /// 查询机构最新通知
        /// </summary>
        /// <param name="OrgID"></param>
        /// <returns></returns>
        public List<OrgBulletin> GetOrgBulletin(int OrgID, int pageIndex, out int totalCount)
        {
            int pageSize = 10;
            int StartIndex = (pageIndex * pageSize);
            int EndIndex = (pageIndex + 1) * pageSize;
            return ModelConvertHelper<OrgBulletin>.ConvertToModelList(_BindInfo.GetOrgBulletin(OrgID, StartIndex, EndIndex, out totalCount).Tables[0]);
        }
        /// <summary>
        /// 通过微信账号查询
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        public int OrgIDByWeiXin(string WeiXin)
        {
            return ModelConvertHelper<OrgBulletin>.ConvertToModel(_student.OrgIDByWeiXin(WeiXin).Tables[0]).OrgID;
        }
        /// <summary>
        /// 查询公告列表封装
        /// </summary>
        /// <returns></returns>
        public List<OrgBulletin> BulletinList(string WeiXin, int pageIndex, out int total)
        {
            return GetOrgBulletin(OrgIDByWeiXin(WeiXin), pageIndex, out total);
        }
        /// <summary>
        /// 查询单条公告
        /// </summary>
        /// <param name="Bid"></param>
        /// <returns></returns>
        public OrgBulletin SingleInfo(int Bid)
        {
            return ModelConvertHelper<OrgBulletin>.ConvertToModel(_bulletin.GetSingleBulletin(Bid).Tables[0]);
        }
        #endregion

        #region 查询老师信息
        /// <summary>
        /// 通过微信查询老师信息
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        public IList<Teacher> TeacherList(string WeiXin)
        {
            return ModelConvertHelper<Teacher>.ConvertToModelList(_student.QueryTeacherList(WeiXin).Tables[0]);
        }
        #endregion

        #region 查询学生绑定科目
        /// <summary>
        /// 查询学生绑定科目
        /// </summary>
        /// <param name="SID"></param>
        /// <returns></returns>
        public List<int> SubList(string SID)
        {
            return _stu.GetMaterials2Weixin(SID);

        }
        #endregion

        #region 查询学生信息
        /// <summary>
        /// 微信帐号查询学生信息
        /// </summary>
        /// <param name="OpenId"></param>
        /// <returns></returns>
        public StudentInfo QueryStudentByWeiXin(string OpenId,string AppId)
        {
            return ModelConvertHelper<StudentInfo>.ConvertToModel(_student.StuIDByWeiXin(OpenId,AppId).Tables[0]);
        }
        #endregion

        #region 获取考试列表(微信分页)
        /// <summary>
        /// 获取考试列表(微信分页)
        /// </summary>
        /// <param name="dic"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public List<ExamModel> LoadExamList2Weixin(SearchObjModel searchObjModel, out int count)
        {

            return _examOnline.LoadExamList2Weixin(searchObjModel, out count);
        }
        #endregion

        #region 作业详情

        /// <summary>
        /// 未回答作业
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <param name="pageIndex"></param>
        /// <returns></returns>
        public StudentJobItemModel GetJobDetialByJobID(string jobId, string sid, int pageIndex, out int toalCount)
        {
            toalCount = 0;
            var model = _homeWork.GetJobDetialByJobID(jobId, sid);
            if (model == null) return null;
            toalCount = model.Items.Count;
            if (toalCount < 1) return null;
            return model.Items[pageIndex];
        }
        /// <summary>
        /// 已回答作业
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public StudentJobItemModel GetAnswerDetialByJobID(string jobId, string sid, int pageIndex, out int totalCount)
        {
            totalCount = 0;
            var model = _homeWork.GetAnswerDetialByJobID(jobId, sid);
            if (model == null) return null;
            totalCount = model.Items.Count;
            if (totalCount < 1) return null;
            return model.Items[pageIndex];
        }
        #endregion

        #region 考试详情

        /// <summary>
        /// 获取学生回答表详细信息
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public StudentExamItemModel GetExamDetialByExamID(string examId, string sid, int pageIndex, out int toalCount)
        {
            toalCount = 0;
            var model = _examOnline.GetExamDetialByJobID(examId, sid);
            if (model == null) return null;
            toalCount = model.Items.Count;
            if (toalCount < 1) return null;
            return model.Items[pageIndex];

        }

        public StudentExamItemModel GetExamAnswerDetialByExamID(string examId, string sid, int pageIndex, out int totalCount)
        {
            totalCount = 0;
            var model = _examOnline.GetAnswerDetialByJobID(examId, sid);
            if (model == null) return null;
            totalCount = model.Items.Count;
            if (totalCount < 1) return null;
            return model.Items[pageIndex];
        }
        #endregion

        #region 错题本
        /// <summary>
        /// 获取错题详情
        /// </summary>
        /// <param name="sid"></param>
        /// <param name="subjectID"></param>
        /// <returns></returns>
        public StudentWrongItemModel GetWrongItem(string sid, string subjectID, int pageIndex, out int totalCount,out int allTotal)
        {
            totalCount = 0;
            allTotal = 0;
            var items = _wrong.GetWrongItems(sid, subjectID);
            if (items == null )
            { return null; }
            allTotal = items.Count;
            totalCount = items.Count;
            if (totalCount < 1) return null;
            return items[pageIndex];
        }
        #endregion

    }
}
