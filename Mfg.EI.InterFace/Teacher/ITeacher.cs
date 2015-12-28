/*
 * author:谢利民;
 * function:题目相关功能的接口
 * date:2015-04-16
 * updateDate:2015-04-24
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using System.Threading.Tasks;
namespace Mfg.EI.InterFace
{
    /// <summary>
    /// Teacher:教师相关的功能接口
    /// </summary>
    public interface ITeacher
    {
        /// <summary>
        /// 获取教师模型对象
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        EI_ManagerInfo GetManagerInfo(string aid);

        /// <summary>
        /// 获取教师模型对象
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        EI_ManagerInfo GetManagerInfo(int id);
        /// <summary>
        /// 创建教师模型
        /// </summary>
        /// <param name="teachaerModel"></param>
        /// <returns></returns>
        string AddManagerInfo(CreateTeacherModel teachaerModel);
        /// <summary>
        /// 修改教师模型
        /// </summary>
        /// <param name="teacherModel"></param>
        /// <returns></returns>
        bool UpdateManagerInfo(TeacherManagerModel teacherModel);

        /// <summary>
        /// 更改教师信息，部分信息
        /// </summary>
        /// <param name="teacherModel"></param>
        /// <returns></returns>
        bool UpdateTeacerInfo(TeacherManagerModel teacherModel);
        /// <summary>
        /// 获取教师与分组模型
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        EI_GRelM GetRelGroupInfo(string tid);

        /// <summary>
        /// 获取教师阶段科目教材对应
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        List<ManRelStaModel> GetManRelStaList(string tid);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        List<ManRelStaModel> GetManStaInfoList(string tid);

        /// <summary>
        /// 根据账号ID获取分组信息
        /// </summary>
        /// <param name="aid"></param>
        /// <returns></returns>
        List<EI_GroupInfo> GetGroupInfoList(int aid, int orgid);

        /// <summary>
        /// 获取关联学生信息
        /// </summary>
        /// <param name="aid"></param>
        /// <param name="orgid"></param>
        /// <returns></returns>
        List<EI_StudentInfo> GetRelStuInfo(int aid, int orgid);

        /// <summary>
        /// 添加分组
        /// </summary>
        /// <returns></returns>
        bool AddGroupInfo(GroupInfoModel model);

        bool CheckGroupName(string name, int orgID);

        /// <summary>
        /// 登录 0用户名错误，1机构错误，2登录成功，3密码错误
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        int TeacherLogin(ref TeacherManagerModel loginModel);

        /// <summary>
        /// 获取阶段科目对应信息
        /// </summary>
        /// <returns></returns>
        List<EI_StaRelSub> GetStaRelSubList(int sid);

        /// <summary>
        /// 获取教师创建的分组列表
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        List<TeacherGroupModel> GetTeacherGroup(int orgID, int createBy);

        string GetTeacherTree(int orgID, int tid = 0);

        /// <summary>
        /// 获取教师列表
        /// </summary>
        /// <param name="groupID"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        List<TeacherManagerModel> GetTeacherList(int groupID, int orgID, int createBy, string teacherName = "");

        /// <summary>
        /// 获取教师所在分组列表
        /// </summary>
        /// <param name="TID"></param>
        /// <returns></returns>
        List<TeacherGroupModel> GetTeacherGroupList(int TID);

        /// <summary>
        /// 删除教师分组关联
        /// </summary>
        /// <param name="tid"></param>
        /// <param name="gid"></param>
        /// <returns></returns>
        bool DelTeacherGroupRel(int tid, int gid);
        /// <summary>
        /// 添加教师分组关联
        /// </summary>
        /// <param name="tid"></param>
        /// <param name="gid"></param>
        /// <returns></returns>
        bool AddTeacherGroupRel(int tid, int gid);

        /// <summary>
        /// 添加教师列表到分组
        /// </summary>
        /// <param name="tids"></param>
        /// <param name="gid"></param>
        /// <returns></returns>
        int AddTeacherToGroupRel(List<string> tids, int gid);

        /// <summary>
        /// 获取教师关联的学生
        /// </summary>
        /// <param name="TID"></param>
        /// <returns></returns>
        List<TeacherStudentModel> GetStudentByTeacher(int TID);

        /// <summary>
        /// 根据教师ID获取未关联的分组
        /// </summary>
        /// <param name="tids">教师ID</param>
        /// <param name="name"></param>
        /// <param name="orgID"></param>
        /// <param name="createBy"></param>
        /// <param name="utype"></param>
        /// <returns></returns>
        List<TeacherGroupModel> GetNotRelGroupByTID(string tids, string name, int orgID, int createBy, int utype);


        /// <summary>
        /// 根据教师ID获取未关联学生
        /// </summary>
        /// <param name="tid"></param>
        /// <param name="orgID"></param>
        /// <param name="name"></param>
        /// <param name="utype"></param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        List<StudentModel> GetStuNotRelTeacByTID(string tid, int orgID, string name, int utype, int createBy);

        /// <summary>
        /// 多个老师多个分组关联
        /// </summary>
        /// <param name="tids"></param>
        /// <param name="groupIDs"></param>
        /// <returns></returns>
        int Addteachers2Groups(string tids, string groupIDs);
        /// <summary>
        /// 获取教师教学日记
        /// </summary>
        /// <param name="para">查询参数类</param>
        /// <returns></returns>
        List<TeachDiaryModel> GetTechDiaryList(EI_Base<EI_TeachDiary> para);

        /// <summary>
        /// 获取教学日记明细
        /// </summary>
        /// <param name="eI_Base"></param>
        /// <returns></returns>
        List<TeachDiaryModel> GetTechDiaryDetailsList(EI_Base<EI_TeachDiary> eI_Base);

        /// <summary>
        /// 更新老师信息
        /// </summary>
        /// <param name="eI_Base">选课属性</param>
        /// <returns></returns>
        List<ManRelStaModel> GetTeacherCenterList(EI_Base<EI_ManRelSta> eI_Base);

        /// <summary>
        /// 保存教师信息
        /// </summary>
        string SaveTeacherCenter(int TID, List<ManRelStaModel> list, TeacherManagerModel dto);

        /// <summary>
        /// 更新老师选课
        /// </summary>
        /// <param name="eI_Base">选课</param>
        /// <returns></returns>
        List<ManRelStaModel> GetTeacherSelect(EI_Base<EI_ManRelSta> eI_Base);

        /// <summary>
        /// 添加发布公告内容
        /// </summary>
        /// <param name="announcement">公告内容</param>
        /// <param name="annTitle"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        bool AddAnnouncement(string announcement, string annTitle, string type, string id, int orgId);

        /// <summary>
        /// 根据条件查询发布内容
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        List<EI_Announcement> GetAnnouncement(int id, int orgId);

        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="id">主键</param>
        /// <returns></returns>
        bool DeleteData(int id);

        /// <summary>
        /// 获取分页数据
        /// </summary>
        /// <param name="id"></param>
        /// <param name="OrgId"></param>
        /// <returns></returns>
        List<EI_Announcement> GetPageList(string id, int orgId);

        /// <summary>
        /// 更新教师选课
        /// </summary>
        /// <param name="TID">教师ID</param>
        /// <param name="list">参数</param>
        /// <returns></returns>
        string SaveTeacherSelect(int TID, List<ManRelStaModel> list);

        /// <summary>
        /// 查询教程
        /// </summary>
        /// <returns></returns>
        List<EI_Material> GetMaterial();

        /// <summary>
        /// 教师基本信息
        /// </summary>
        /// <param name="eI_Base">参数</param>
        /// <returns></returns>
        List<TeacherBaseModel> TeacherBaseIndex(EI_Base<EI_ManagerInfo> eI_Base);

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="eI_Base"></param>
        /// <returns></returns>
        string SavePW(EI_Base<TeacherBaseModel> eI_Base);

        bool ResetPwd(int accountNumber, string tname, string userId);

        #region 换肤

        /// <summary>
        /// 换肤
        /// </summary>
        /// <param name="orgTemplate">皮肤</param>
        /// <param name="ID">机构ID</param>
        /// <returns></returns>
        bool UpdateOrgTemplate(string orgTemplate, int ID, string createBy);

        #endregion

        #region 换Logo

        /// <summary>
        /// 换Logo
        /// </summary>
        /// <param name="orgTemplate">皮肤</param>
        /// <param name="ID">机构ID</param>
        /// <returns></returns>
        bool UpdateLogoUrl(string logoUrl, int ID, string createBy);

        #endregion

        #region 换登录页轮播图

        /// <summary>
        /// 换Logo
        /// </summary>
        /// <param name="bannerImgUrls">图片Url</param>
        /// <param name="id">机构ID</param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        bool ChangeBannerImg(string bannerImgUrls, int id, string createBy);

        #endregion


        /// <summary>
        /// 获取公告数
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        EI_Announcement GetAnnouncementStep(EI_Announcement para);

        #region 删除组
        /// <summary>
        /// 删除组
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        bool DeleteGroup(int ID);
        #endregion

        /// <summary>
        /// 保存教学日记
        /// </summary>
        /// <param name="DiaryName"></param>
        /// <param name="TID"></param>
        /// <returns></returns>
        Task<string> SaveDiaryAsync(string DiaryName, string TID);

        #region 教学日志

        /// <summary>
        /// 教学日志
        /// </summary>
        /// <param name="DiaryName"></param>
        /// <param name="TID"></param>
        /// <returns></returns>
        string SaveDiary(string DiaryName, string TID);

        #endregion
        #region 冻结老师

        bool FreezeTeacherInfo(string tId, string tName, string managerID);

        bool DeFreezeTeacherInfo(string tId, string tName, string managerID);

        #endregion
        /// <summary>
        /// 更新分组名
        /// </summary>
        /// <param name="groupModel"></param>
        bool UpdateGroupInfo(GroupInfoModel groupModel);

        string GetNotRelGroupTree(string tids, string name, int orgId, int userId, int utype);

        List<TeacherManagerModel> GetManagerList(int orgID, int utype);

        bool ValidatePW(EI_Base<TeacherBaseModel> eI_Base);

        /// <summary>
        /// 保存意见反馈
        /// </summary>
        /// <param name="feedModel"></param>
        /// <returns></returns>
        bool SaveFeedBack(FeedBackModel feedModel);

        /// <summary>
        /// 获取意见反馈
        /// </summary>
        /// <returns></returns>
        string GetFeedBackInfo(string LoginAccountNumber, int OrgID);


        /// <summary>
        /// 获取试题蓝试题
        /// </summary>
        /// <returns></returns>
        List<PaperBasketViewModel> GetQuestionBoxList(EI_PaperBasket eiPaper);

        /// <summary>
        /// 获取试题 是否在试题蓝并返回此试题实体
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        EI_PaperBasket GetQuestionInBox(EI_PaperBasket eiPaper);

        /// <summary>
        /// 删除一条试题
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        bool DeleteQuestionInBox(EI_PaperBasket eiPaper);

        /// <summary>
        /// 清空当前老师试所选科目试题蓝
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        bool ClearQuestionInBox(EI_PaperBasket eiPaper);

        /// <summary>
        /// 添加试题
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        int AddQuestionInBox(EI_PaperBasket eiPaper);



        /// <summary>
        /// 批量插入
        /// </summary>
        /// <param name="listEiPaper"></param>
        /// <returns></returns>
        Tuple<int, int, int> BatchAddQuestionInBox(List<EI_PaperBasket> listEiPaper, EI_PaperBasket eiPaper);


        /// <summary>
        /// 批量判断是否在试题蓝并返回此试题实体
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        List<EI_PaperBasket> BatchGetQuestionExist(EI_PaperBasket eiPaper, List<int> listItemId);


        /// <summary>
        /// 获取一条试题蓝试题数据
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        EI_PaperBasket GetOneQuestionBox(EI_PaperBasket eiPaperParam);

        Paper GetExam(int orgid, int tid, int subJectId, string PID, int ptype, int p);

        bool DelDataIndex(string PID, int ItemID, int ActionStaus);

        bool CheckDataIndex(List<KnowledgePointList> dto);

        bool SaveItem(PaperBasketModel para, List<EI_PaperBasket> dto);

        bool SaveSore(int TID, int OrgID, int ItemType, int itemID, double Score);

        bool SaveName(int OrgID, int TID, int SubjectID, string p);

        bool SaveChange(int OrgID, int TID, int ItemID, int DiffNum, int newItemID);

        bool ClearPaper(int OrgID, int TID);

        Paper GetBookPreView(string bookID, int ptype);

        /// <summary>
        /// 获取试题篮汇总
        /// </summary>
        /// <param name="tid">教师ID</param>
        /// <returns></returns>
        List<QueBoxSummary> GetSummary(int tid);

        /// <summary>
        /// 更新试题篮主记录
        /// </summary>
        /// <param name="box"></param>
        /// <returns></returns>
        bool UpdateBox(QueBoxMain box);

        /// <summary>
        /// 获取试题篮主记录
        /// </summary>
        /// <param name="tid">用户ID</param>
        /// <param name="org">机构ID</param>
        /// <returns></returns>
        QueBoxMain GetMainRecored(int tid, int org);



        /// <summary>
        /// 清除试题篮中某个试卷的题目
        /// </summary>
        /// <param name="OrgID"></param>
        /// <param name="TID"></param>
        /// <param name="ids"></param>
        /// <returns></returns>
        bool ClearFromPaper(int OrgID, int TID, int[] ids);

    }
}
