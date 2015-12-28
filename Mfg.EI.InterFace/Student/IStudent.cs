/*
 * author:谢利民;
 * function:题目相关功能的接口
 * date:2015-04-16
 */
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using Mfg.EI.WeiXin.ViewModel;
namespace Mfg.EI.InterFace
{
    /// <summary>
    /// Student:学生相关的功能接口
    /// </summary>
    public interface IStudent
    {
        #region 根据mfgID获取实体
        /// <summary>
        /// 根据mfgID获取实体
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        EI_StudentInfo GetStudentInfoModel(string mfgID);
        #endregion

        #region
        /// <summary>
        /// 根据mfgID获取实体
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        StudentInfo GetStudentInfo(string mfgID, string name);
        #endregion
        #region 该机构能否创建学生
        /// <summary>
        /// 该机构能否创建学生
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="createCount"></param>
        /// <returns></returns>
        bool CanCreateStu(int orgID, int createCount);



        #endregion

        #region 添加学生

        /// <summary>
        /// 添加经验值
        /// </summary>
        bool AddEI_Experience(EI_StudentInfo dto);

        /// <summary>
        ///  添加学生
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        bool Add(EI_StudentInfo model, out string mfgID);

        #endregion

        #region 获取管理员的Tree
        /// <summary>
        /// 获取管理员的Tree
        /// </summary>
        /// <param name="roleType"></param>
        /// <param name="userID"></param>
        /// <param name="name"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        string GetManagerTree(UserTypeEnum roleType, string userID, string name, int orgID);

        #endregion

        #region 获取该管理员下的学生分组

        /// <summary>
        /// 获取该管理员下的学生分组
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        List<StudentGroup> GetStudentGroup(int orgID, string createBy);
        #endregion

        #region 根据条件获取该管理员分组下的学生列表
        /// <summary>
        /// 根据条件获取该管理员分组下的学生列表
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        List<StudentModel> GetStudentList(Dictionary<string, object> dic);
        #endregion


        #region 根据机构id获取学生分组

        /// <summary>
        /// 根据机构id获取学生分组
        /// </summary>
        /// <param name="orgID">机构id</param>
        /// <returns></returns>
        List<StudentGroup> GetStudentGroupByOrgID(int orgID, string createBy);

        #endregion

        #region 根据老师ID获取学生分组

        /// <summary>
        /// 
        /// </summary>
        /// <param name="tID"></param>
        /// <returns></returns>
        List<StudentGroup> GetStudentGroup(string tID);
        #endregion

        #region 根据分条件获取学生列表
        /// <summary>
        /// 根据分条件获取学生列表
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        List<StudentModel> GetStudentListByDic(Dictionary<string, object> dic);
        #endregion

        #region 根据魔方格ID获取该生分组
        /// <summary>
        /// 根据魔方格ID获取该生分组
        /// </summary>
        /// <param name="mfgID">魔方格id</param>
        /// <returns></returns>
        List<StudentGroup> GetStudentGroupByMfgID(string mfgID);

        #endregion

        #region 根据机构ID获取未分组学生

        /// <summary>
        /// 根据机构ID获取未分组学生
        /// </summary>
        /// <param name="orgID"></param>
        /// <returns></returns>
        List<EI_StudentInfo> GetStuNotInGroupByOrgID(int orgID);
        #endregion

        #region 根据机构ID和分组ID获取不在该组的学生

        /// <summary>
        ///  根据机构ID和分组ID获取不在该组的学生
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="groupID"></param>
        /// <returns></returns>
        List<EI_StudentInfo> GetStuNotInGroupByOrgIDAndGroupID(int orgID, int groupID, string createBy);
        #endregion

        #region 批量添加学生到分组

        /// <summary>
        ///  批量添加学生到分组
        /// </summary>
        /// <param name="mfgIDs">魔方格IDs</param>
        /// <param name="groupid">分组ID</param>
        /// <returns></returns>
        int AddStu2Group(string mfgIDs, string groupid);

        #endregion

        #region 根据gID和sID删除一条数据(学生与分组)

        /// <summary>
        /// 根据gID和sID删除一条数据(学生与分组)
        /// </summary>
        /// <param name="gID">gID</param>
        /// <param name="sID">sID</param>
        /// <returns></returns>
        bool DeleteByGIDAndSID(int gID, string sID);

        #endregion

        #region 根据魔方格ID获取为关联的分组
        /// <summary>
        /// 根据魔方格ID获取为关联的分组
        /// </summary>
        /// <param name="mfgIDs"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        List<StudentGroup> GetStuNotRelGroupByMfgID(string mfgIDs, string name, string createBy, int orgID);

        #endregion

        #region 获取学生未关联分组的Tree
        /// <summary>
        /// 获取学生未关联分组的Tree
        /// </summary>
        /// <param name="roleType"></param>
        /// <param name="userID"></param>
        /// <param name="orgID"></param>
        /// <param name="mfgIDs"></param>
        /// <returns></returns>
        string GetNotRelGroupTree(UserTypeEnum roleType, int userID, int orgID, string mfgIDs);

        #endregion

        #region 批量添加多个学生到多个组
        /// <summary>
        /// 
        /// </summary>
        /// <param name="mfgIDs">学生IDs</param>
        /// <param name="groupIDs">分组IDs</param>
        /// <returns></returns>

        int AddStus2Groups(string mfgIDs, string groupIDs);

        #endregion

        #region 根据魔方ID获取该生与老师的关联

        List<EI_MRelS> GetSutRelTeacByMfgID(string mfgID);

        #endregion

        #region 根据sID和tID删除一条数据(学生与老师)

        /// <summary>
        /// 根据sID和tID删除一条数据(学生与老师)
        /// </summary>
        /// <param name="gID">gID</param>
        /// <param name="sID">sID</param>
        /// <returns></returns>
        bool DeleteBySIDAndTID(string sID, string tID);

        #endregion

        #region 根据魔方格ID和机构ID获取未关联的老师

        /// <summary>
        /// 根据魔方格ID和机构ID获取未关联的老师
        /// </summary>
        /// <param name="mfgID">魔方格ID</param>
        /// <param name="orgID">机构ID</param>
        /// <param name="name">老师名字</param>
        /// <returns></returns>
        List<EI_ManagerInfo> GetStuNotRelTeacByMfgIDAndOrgID(string mfgID, int orgID, string name, string createBy);

        #endregion

        #region 获取学生未关联的老师列表

        /// <summary>
        ///  获取学生未关联的老师列表
        /// </summary>
        /// <param name="roleType"></param>
        /// <param name="orgID"></param>
        /// <param name="tID"></param>
        /// <param name="mfgIDs"></param>
        /// <returns></returns>
        List<EI_ManagerInfo> GetStuNotRelTeac(int orgID, int tID, string mfgIDs);

        #endregion

        #region 批量添加学生与老师的关联

        /// <summary>
        ///  批量添加学生与老师的关联
        /// </summary>
        /// <param name="mfgIDs">魔方格IDs</param>
        /// <param name="tIDs">老师IDs</param>
        /// <returns></returns>
        int AddStuRelTeac(string mfgIDs, string tIDs);
        #endregion

        #region 更新备注名

        /// <summary>
        /// 更新备注名
        /// </summary>
        /// <param name="mfgID">魔方格ID</param>
        /// <param name="reamrkName">备注名</param>
        /// <returns></returns>
        bool UpdateReamrkName(string mfgID, string reamrkName);

        #endregion

        #region 更新学生档案

        /// <summary>
        /// 更新学生档案
        /// </summary>
        /// <param name="ei_StudentInfo">学生信息</param>
        /// <param name="ei_familyList">家庭信息</param>
        /// <param name="ei_EnterScoreList">成绩</param>
        /// <returns></returns>
        bool UpdateStudentArchives(EI_StudentInfo ei_StudentInfo, List<EI_FamilyInfo> ei_familyList,
            List<EI_EnterScore> ei_EnterScoreList);

        #endregion

        #region 续费
        /// <summary>
        /// 续费(到期时间添加一年)
        /// </summary>
        /// <param name="mfgID">魔方格ID</param>
        /// <returns></returns>
        bool UpdateExpirDate(string mfgID, string name, string createBy);
        #endregion

        #region 重置密码

        /// <summary>
        /// 重置密码
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        bool ResetPwr(string mfgID, string name, string createBy);

        #endregion


        #region 获取教材

        /// <summary>
        /// 获取教材
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        Dictionary<string, string> GetMaterialsModel(string mfgID);
        #endregion

        #region 获取教材2微信
        /// <summary>
        /// 获取教材2微信
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        List<int> GetMaterials2Weixin(string mfgID);
        #endregion

        #region 修改教材

        bool EditMaterials(MaterialsModel model);
        #endregion

        #region 修改密码

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="mfgID"></param>
        /// <param name="oldPwr"></param>
        /// <param name="newPwr"></param>
        /// <returns></returns>
        bool EditPwr(string mfgID, string oldPwr, string newPwr);


        #endregion
        #region 学生登录
        int StuLogin(ref LoginModel loginModel);
        #endregion

        #region 更改经验值

        /// <summary>
        /// 更改经验值
        /// </summary>
        /// <param name="sID">学生ID</param>
        /// <param name="experNumber">经验值</param>
        /// <returns>更改经验值的sql</returns>
        string UpdateExperNumber(string sID, int experNumber);
        #endregion

        #region 获取等级名称(学霸一段....)
        /// <summary>
        /// 获取等级名称(学霸一段....)
        /// </summary>
        /// <param name="sID"></param>
        /// <returns></returns>
        string GetLevelName(string sID);

        #endregion

        #region 获取ei_studentinfo（分页）

        /// <summary>
        ///  获取ei_studentimportabnormal（分页）
        /// </summary>
        /// <param name="currentPage"></param>
        /// <param name="starTime"></param>
        /// <param name="endTime"></param>
        /// <param name="createBy"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        List<ImportAndExportStudent> GetStu(int currentPage, string starTime, string endTime, string createBy,
            out int count);
        #endregion

        #region 导出ei_studentinfo

        /// <summary>
        ///  导出ei_studentinfo
        /// </summary>
        /// <param name="createBy"></param>
        /// <param name="starTime"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        MemoryStream ExportStu(string createBy, string starTime, string endTime);
        #endregion

        #region 获取excel内容
        /// <summary>
        ///  获取excel内容
        /// </summary>
        /// <param name="filepath"></param>
        /// <param name="orgType"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        List<ImportAndExportStudent> GetExcelData(string filepath, int orgType, out string message);
        #endregion

        #region 批量创建学生
        /// <summary>
        /// 批量创建学生
        /// </summary>
        /// <param name="modeList"></param>
        /// <param name="createBy"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        List<ImportAndExportStudent> BatchAddStu(List<ImportAndExportStudent> modeList, string createBy, int orgID);


        #endregion

        #region 获取ei_studentimportabnormal（分页）

        /// <summary>
        ///  获取ei_studentimportabnormal（分页）
        /// </summary>
        /// <param name="currentPage"></param>
        /// <param name="starTime"></param>
        /// <param name="endTime"></param>
        /// <param name="createBy"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        List<ImportAndExportStudent> GetStuAbnormal(int currentPage, string starTime, string endTime, string createBy,
            out int count);
        #endregion

        #region 导出创建异常汇总
        /// <summary>
        /// 导出创建异常汇总
        /// </summary>
        /// <param name="modeList"></param>
        /// <param name="createBy"></param>
        /// <param name="starTime"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        MemoryStream ExportStuAbnormal(List<ImportAndExportStudent> modeList, string createBy, string starTime, string endTime);

        #endregion

        #region 删除异常汇总

        /// <summary>
        /// 删除异常汇总
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        bool DeleteStuAbnormal(string IDs);

        #endregion

        #region 批量预先创建用户

        /// <summary>
        /// 批量预先创建用户
        /// </summary>
        /// <param name="model"></param>
        /// <param name="Count"></param>
        /// <returns></returns>
        int BatchAddStu(EI_StudentInfo model, int Count);


        #endregion

        #region 更新激活时间首次登录标识
        /// <summary>
        /// 更新激活时间首次登录标识
        /// </summary>
        /// <param name="mfgID"></param>
        void UpdateActivationTimeFirstLogin(string mfgID);
        #endregion



        /// <summary>
        /// 获取学生公告
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        List<AnnouncementModel> GetAnnouncement(EI_StudentInfo dto);

        /// <summary>
        /// 获取一个公告
        /// </summary>
        /// <param name="p"></param>
        /// <returns></returns>
        AnnouncementModel GetFirstAnnouncement(AnnouncementModel p);

        /// <summary>
        /// 获取学生日记
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        List<StuDiaryModel> GetStudentDiaryList(EI_Base<EI_StuDiary> para);

        /// <summary>
        /// 获取某天学生日记
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        List<StuDiaryModel> GetStudentDiaryDetails(EI_Base<EI_StuDiary> para);

        /// <summary>
        /// 初始化学生任务
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        StuInitModel GetInitData(EI_Base<EI_StuDiary> dto);

        /// <summary>
        /// 获取经验值
        /// </summary>
        /// <param name="para"></param>
        /// <returns></returns>
        StudentExperienceModel GetStudentData(EI_Base<EI_StuDiary> para);




        #region 学生知识测评分析
        /// <summary>
        /// 获取基本知识测评基本模型
        /// </summary>
        /// <param name="MFGID"></param>
        /// <returns></returns>
        List<BaseAnalyzeModel> GetAnalyzeModelList(BaseAnalyzeModel basemodel);
        #endregion
        /// <param name="SID">学生ID</param>
        /// <param name="DiaryType">类型:0代表同步学习；1代表弱项提分；2电子作业；3在线考试 4错题重练  </param>
        /// <param name="DiaryName">类型0和1时为知识点名称，类型2为作业名称，类型3时为考试名称；类型4为空</param>
        /// <param name="FormatStr">类型0、1和4时为科目名称，类型2和3为教师名称；</param>
        /// <param name="TotalNum">类型0、1和4为总题数;类型为2和3为总分数；</param>
        /// <param name="RightNum">类型0、1和4为答对多少题；类型为2和3为成绩</param>
        /// <param name="SourceID">类型0、1为知识点ID；类型2为作业ID；类型3为考试ID；类型4为空</param>
        /// <returns>
        /// </returns>
        string SaveDiary(string SID, byte DiaryType, string DiaryName, string FormatStr, int TotalNum, int RightNum, string SourceID);

        /// <summary>
        /// 获取机构用户信息
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        EI_StudentInfo GetSingleUser(EI_StudentInfo dto);




    }
}
