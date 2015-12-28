/*
 * author:谢利民;
 * function:教师管理的功能操作
 * date:2015-04-16
 * updateDate:2015-04-26
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using Mfg.EI.DAL;
using Mfg.EI.DAL.Teacher;
using System.Data;
using Mfg.EI.Common;
using System.Threading.Tasks;
using Mfg.UserCenter.Comm.UserInfo.BLL;

namespace Mfg.EI.InterFace
{
    public class TeacherManager : ITeacher
    {
        /// <summary>
        /// 
        /// </summary>
        #region 私有变量
        private ManagerInfoDal _managerInfodal = new ManagerInfoDal();
        private GRelMDal _grelmdal = new GRelMDal();
        private ManRelStaDal _subrelmatdal = new ManRelStaDal();
        private EI_ManagerInfo _mangagerInfoEntiy;
        private GroupInfoDal _Group = new GroupInfoDal();
        private GroupInfoDal _groupinfodal = new GroupInfoDal();
        private StaRelSubDal _starelsubdal = new StaRelSubDal();
        private AnnouncementDal _announcementDal = new AnnouncementDal();
        private OrgDal _orgDal = new OrgDal();
        private TeachDiaryDal _teachDiaryDal = new TeachDiaryDal();

        #endregion
        /// <summary>
        /// 获取教师管理信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public EI_ManagerInfo GetManagerInfo(string aid)
        {
            return _managerInfodal.GetModel(aid);

        }

        /// <summary>
        /// 创建教师信息
        /// </summary>
        /// <param name="teachaerModel"></param>
        /// <returns></returns>
        public string AddManagerInfo(CreateTeacherModel teachaerModel)
        {


            #region 魔方格注册
            string sex = teachaerModel.Gender == 0 ? "男" : "女";
            string inclass = "10";//年级
            string pwd = "000000";

            string ip = HttpHelper.GetExtranetIP();
            int resultmfgID = new MfgOutfitBll().MfgOutfitReg("user", "bill", teachaerModel.Name, pwd, sex, inclass, teachaerModel.AcaStru ?? 0, teachaerModel.ArtSciences ?? 2, teachaerModel.Phone, "", ip);


            if (resultmfgID <= 0)
            {
                LogHelperNet.Error(string.Format("创建老师时调用_mfgOutfitBll.MfgOutfitReg接口出错,参数为({0})", "user" + "|" + "bill" + "|" + teachaerModel.Name + "|" + pwd + "|" + sex + "|" + inclass + "|" + teachaerModel.ArtSciences + "|" + teachaerModel.ArtSciences + "|" + teachaerModel.Phone + "|" + "" + "|" + ""), null);
                return string.Empty;
            }

            //return resultmfgID.ToString();
            #endregion

            _mangagerInfoEntiy = new EI_ManagerInfo();
            _mangagerInfoEntiy.OrgID = teachaerModel.OrgID;
            _mangagerInfoEntiy.ID = Guid.NewGuid().ToString();
            _mangagerInfoEntiy.Name = teachaerModel.Name;
            _mangagerInfoEntiy.Pwd = "000000";
            _mangagerInfoEntiy.Gender = teachaerModel.Gender;
            _mangagerInfoEntiy.Phone = teachaerModel.Phone;
            _mangagerInfoEntiy.Postion = teachaerModel.Postion;
            _mangagerInfoEntiy.AcaStru = teachaerModel.AcaStru == null ? 0 : teachaerModel.AcaStru;
            _mangagerInfoEntiy.ArtSciences = teachaerModel.ArtSciences == null ? 0 : teachaerModel.ArtSciences;
            _mangagerInfoEntiy.UType = teachaerModel.UType;
            _mangagerInfoEntiy.CreateTime = DateTime.Now;
            _mangagerInfoEntiy.CreateBy = teachaerModel.CreateBy.ToString();
            _mangagerInfoEntiy.IsTeach = teachaerModel.IsTeach;
            _mangagerInfoEntiy.MfgID = resultmfgID;//魔方格帐号 收藏试题的时候会用到
            var result = _managerInfodal.Add(_mangagerInfoEntiy);
            if (result)
            {
                EI_ManagerInfo managerinfo = _managerInfodal.GetModel(_mangagerInfoEntiy.ID);
                return managerinfo.AccountNumber.ToString();
            }
            else
            {
                return string.Empty;
            }

        }

        /// <summary>
        /// 修改教师信息
        /// </summary>
        /// <param name="teacherModel"></param>
        /// <returns></returns>
        public bool UpdateManagerInfo(TeacherManagerModel teacherModel)
        {
            var flag = 0;
            bool result = true;
            EI_ManagerInfo _managerInfo = _managerInfodal.GetModel(teacherModel.AccountNumber);
            EI_ManagerInfo managerInfo = new EI_ManagerInfo();
            managerInfo.AccountNumber = teacherModel.AccountNumber;
            managerInfo.UType = teacherModel.UType;
            managerInfo.Name = teacherModel.Name;
            managerInfo.Gender = teacherModel.Gender;
            managerInfo.CardNumber = teacherModel.CardNumber;
            managerInfo.OrgID = teacherModel.OrgID;
            managerInfo.Phone = teacherModel.Phone;
            managerInfo.LoginName = teacherModel.LoginName;
            managerInfo.Pwd = _managerInfo.Pwd;
            managerInfo.Postion = teacherModel.Postion;
            managerInfo.Pwd = _managerInfo.Pwd;
            managerInfo.QQ = teacherModel.QQ;
            managerInfo.Email = _managerInfo.Email;
            managerInfo.HeadImg = teacherModel.HeadImg;
            managerInfo.AcaStru = teacherModel.AcaStru;
            managerInfo.ArtSciences = teacherModel.ArtSciences;
            managerInfo.CreateBy = _managerInfo.CreateBy;
            managerInfo.RoleTypeID = _managerInfo.RoleTypeID;
            managerInfo.CreateTime = DateTime.Now;
            managerInfo.IsTeach = teacherModel.IsTeach;
            _managerInfodal.Update(managerInfo);
            ////添加管理人员信息表
            //if (_managerInfodal.Exists(teacherModel.AccountNumber.ToString()))
            //{
            //    _managerInfodal.Update(managerInfo);
            //}
            //else
            //{
            //    _managerInfodal.Add(managerInfo);
            //}
            //#region 添加教师与分组对应关系数据
            //EI_GRelM _grelm = new EI_GRelM();
            //_grelm.GID = teacherModel.GroupID;
            //_grelm.TID = teacherModel.AccountNumber.ToString();
            ////判断是否存在分组关系，如果存在修改，否则增加
            //if (_grelmdal.IsExits(teacherModel.AccountNumber))
            //{
            //    _grelmdal.Update(_grelm);
            //}
            //else
            //{
            //    _grelmdal.Add(_grelm);
            //}
            //#endregion

            #region 添加教师与阶段科目对应关系数据

            if (teacherModel.OldAcaStru != teacherModel.AcaStru)
            {
                flag = 1;//1、清空教材版本0：不晴空；科目同步
            }
            List<ManRelStaModel> _manrelModelList = teacherModel.ManRelStaList;
            _subrelmatdal.InsertManRelStaList(_manrelModelList, teacherModel.AccountNumber, flag);

            #endregion
            return result;
        }

        /// <summary>
        /// 更改教师信息，部分信息
        /// </summary>
        /// <param name="teacherModel"></param>
        /// <returns></returns>
        public bool UpdateTeacerInfo(TeacherManagerModel teacherModel)
        {
            bool result = true;
            int flag = 0;

            EI_ManagerInfo managerInfo = new EI_ManagerInfo { Name = teacherModel.Name, UType = teacherModel.UType, Postion = teacherModel.Postion, AccountNumber = teacherModel.AccountNumber };

            _managerInfodal.UpdateTeacherInfo(managerInfo);

            return result;
        }


        /// <summary>
        /// 添加发布公告内容
        /// </summary>
        /// <param name="announcement">公告内容</param>
        /// <returns></returns>
        public bool AddAnnouncement(string announcement, string annTitle, string type, string id, int orgId)
        {
            EI_Announcement eI_Announcement = new EI_Announcement();
            if (!string.IsNullOrEmpty(id))
            {
                eI_Announcement.ID = int.Parse(id);
            }
            eI_Announcement.Content = announcement;
            eI_Announcement.OrgId = orgId;
            eI_Announcement.ContentTitle = annTitle;
            eI_Announcement.Remark = "";
            eI_Announcement.DelFlag = 0;
            eI_Announcement.CreateTime = DateTime.Now;

            if (type == "u")
            {
                return _announcementDal.Update(eI_Announcement);
            }
            else
            {
                return _announcementDal.Add(eI_Announcement);
            }

        }


        /// <summary>
        /// 获取教师与分组模型
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public EI_GRelM GetRelGroupInfo(string tid)
        {
            return _grelmdal.GetModel(tid);
        }

        /// <summary>
        /// 获取教师阶段科目教材对应
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public List<ManRelStaModel> GetManRelStaList(string tid)
        {
            var _subrelList = _subrelmatdal.GetModelList(tid);
            List<ManRelStaModel> _subrelmodelList = new List<ManRelStaModel>();


            if (_subrelList != null)
            {
                foreach (var item in _subrelList)
                {
                    ManRelStaModel _subrelmodel = new ManRelStaModel();
                    _subrelmodel.TID = Convert.ToInt32(tid);
                    _subrelmodel.StageID = item.StageID;
                    _subrelmodel.SubjectID = item.SubjectID;
                    _subrelmodel.MaterialID = item.MaterialID;
                    _subrelmodel.SubjectName = item.SubjectName;
                    _subrelmodelList.Add(_subrelmodel);
                }
            }
            return _subrelmodelList;
        }



        /// <summary>
        /// 添加分组
        /// </summary>
        /// <returns></returns>
        public bool AddGroupInfo(GroupInfoModel model)
        {
            EI_GroupInfo group = new EI_GroupInfo { CreateTime = DateTime.Now, CreateBy = model.CreateBy, DelFlag = 0, Name = model.Name, OrgID = model.OrgID };
            return _Group.Add(group);
        }


        public bool CheckGroupName(string name, int orgID)
        {
            return _Group.Exists(name, orgID);
        }



        /// <summary>
        /// 登录 0用户名错误，1机构错误，2登录成功，3密码错误,4冻结
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        public int TeacherLogin(ref TeacherManagerModel loginModel)
        {
            var model = _managerInfodal.GetModel(int.Parse(loginModel.LoginName));
            if (model != null)
            {
                if (model.OrgID.Equals(loginModel.OrgID))
                {
                    if (model.Pwd.Equals(loginModel.Pwd))
                    {
                        if (model.FreezeFlag == 1)
                        {
                            return 4;
                        }
                        loginModel.Name = model.Name;
                        loginModel.RoleTypeID = model.RoleTypeID;
                        loginModel.UType = model.UType;
                        loginModel.FirstLogin = model.FirstLogin;
                        loginModel.MfgID = model.MfgID;
                        if (loginModel.FirstLogin == 1)
                        {
                            //已登录，修改首次登录标识
                            _managerInfodal.UpdateFirstLogin(loginModel.LoginName);
                        }
                        return 2;

                    }
                    else
                    {
                        return 3;
                    }
                }
                else
                { return 1; }
            }
            else
            {
                return 0;
            }
        }

        /// <summary>
        /// 根据账号ID获取分组信息
        /// </summary>
        /// <param name="aid"></param>
        /// <returns></returns>
        public List<EI_GroupInfo> GetGroupInfoList(int aid, int orgid)
        {
            return _groupinfodal.GetModelList(aid, orgid);

        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<EI_StaRelSub> GetStaRelSubList(int sid)
        {
            return _starelsubdal.GetModelList(sid);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public EI_ManagerInfo GetManagerInfo(int id)
        {
            return _managerInfodal.GetModel(id);
        }

        ///// <summary>
        ///// 获取教师分组列表
        ///// </summary>
        ///// <param name="orgID"></param>
        ///// <param name="createBy"></param>
        ///// <returns></returns>
        //public List<TeacherGroupModel> GetTeacherGroup(int orgID, int createBy)
        //{
        //    List<TeacherGroupModel> TeacherGroupList = new List<TeacherGroupModel>();
        //    //createBy 0超级管理员
        //    var managerModel = _managerInfodal.GetModel(createBy);
        //    var utype = managerModel.UType;
        //    if (utype == 0)
        //    {
        //        var ds = _grelmdal.GetTeacherGroupByOrgID(orgID);
        //        var groupList = ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[0]);
        //        var noRelList = ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[1]);
        //        var allList = ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[2]);
        //        var noTeacerList = ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[3]);
        //        TeacherGroupList.AddRange(allList);
        //        if (groupList.Count() > 2)
        //        {
        //            groupList.InsertRange(groupList.Count() - 2, noTeacerList);
        //        }
        //        else if (groupList.Count == 2)
        //        {
        //            groupList.InsertRange(1, noTeacerList);
        //        }
        //        else
        //        {
        //            groupList.InsertRange(0, noTeacerList);
        //        }
        //        TeacherGroupList.AddRange(groupList);
        //        TeacherGroupList.AddRange(noRelList);
        //    }
        //    else
        //    {
        //        var ds = _grelmdal.GetTeacherGroupByOrgIDAndCreateBy(orgID, createBy);
        //        var groupList = ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[0]);
        //        var noRelList = ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[1]);
        //        var allList = ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[2]);
        //        var noTeacerList = ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[3]);
        //        TeacherGroupList.AddRange(allList);
        //        if (groupList.Count() > 2)
        //        {
        //            groupList.InsertRange(groupList.Count() - 2, noTeacerList);
        //        }
        //        else if (groupList.Count == 2)
        //        {
        //            groupList.InsertRange(1, noTeacerList);
        //        }
        //        else
        //        {
        //            groupList.InsertRange(0, noTeacerList);
        //        }
        //        TeacherGroupList.AddRange(groupList);
        //        TeacherGroupList.AddRange(noRelList);


        //    }
        //    return TeacherGroupList;
        //}


        /// <summary>
        /// 获取教师分组列表
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        public List<TeacherGroupModel> GetTeacherGroup(int orgID, int createBy)
        {

            List<TeacherGroupModel> TeacherGroupList = new List<TeacherGroupModel>();
            //createBy 0超级管理员
            var ds = _grelmdal.GetTeacherGroupByOrgIDAndCreateBy(orgID, createBy);
            TeacherGroupList = ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[0]);
            return TeacherGroupList;
        }


        public string GetTeacherTree(int orgID, int tid = 0)
        {
            var ds = _managerInfodal.GetTeacherGroupTree(orgID, tid);
            var list = ModelConvertHelper<TeacherTreeModel>.ConvertToModelList(ds.Tables[0]);
            StringBuilder sb = new StringBuilder();
            GetTeacherTreeView(null, ref list, ref sb);
            return sb.ToString();
            //return list;

        }
        /// <summary>
        /// 递归构造树
        /// </summary>
        /// <param name="tModel"></param>
        /// <param name="list"></param>
        /// <param name="sb"></param>
        private void GetTeacherTreeView(TeacherTreeModel tModel, ref List<TeacherTreeModel> list, ref StringBuilder sb)
        {
            string createBy = string.Empty;
            string createByName = string.Empty;
            if (tModel != null)
            {
                createBy = tModel.ID.ToString();
                createByName = tModel.Name;

            }
            var glist = list.Where(m => (m.CreateBy == (string.IsNullOrEmpty(createBy) ? null : createBy))).ToList();

            if (glist.Count > 0)
            {
                if (tModel != null)
                {
                    //if (string.IsNullOrEmpty(tModel.CreateBy))
                    //{
                    if (tModel.Level == 0)
                    {
                        sb.Append(" <h3 class='pl40 rel'><i class='li_open'></i>" + tModel.Name + "</h3>");
                    }
                    //}
                    else
                    {
                        sb.Append(" <h3 class='pl30 rel mml20'><i class='li_open'></i>" + tModel.Name + "</h3>");
                    }
                    tModel.IsLeaf = false;
                    sb.Append("<ol class='F12 mgllist_a' tname='" + tModel.Name + "'>");
                }

                foreach (var gmodel in glist)
                {
                    GetTeacherTreeView(gmodel, ref list, ref sb);
                }
                if (tModel != null)
                {
                    sb.Append("</ol>");
                }
            }
            else
            {
                if (tModel != null)
                {
                    if (tModel.Level == 2 || tModel.Level == -1)
                    {
                        sb.Append(" <li gid='" + tModel.ID + "' gname='" + tModel.Name + "' tname='" + createByName + "'><span class='r pct20 tc hand'>添加</span><a class='db pl50 '>" + tModel.Name + "</a></li>");
                    }
                    else
                    {
                        sb.Append(" <h3 class='pl30 rel mml20'><i class='li_open'></i>" + tModel.Name + "</h3>");
                    }
                    tModel.IsLeaf = true;

                }

            }

        }

        #region 老的getteacherlist
        /// <summary>
        /// 获取教师列表
        /// </summary>
        /// <param name="groupID"></param>
        /// <param name="orgID"></param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        //public List<TeacherManagerModel> GetTeacherList(int groupID, int orgID, int createBy, string teacherName = "")
        //{
        //    List<TeacherManagerModel> TeacherList = new List<TeacherManagerModel>();
        //    //createBy 0超级管理员
        //    var managerModel = _managerInfodal.GetModel(createBy);
        //    var utype = managerModel.UType;
        //    System.Data.DataSet ds = new System.Data.DataSet();

        //    if (utype == 0)
        //    {
        //        //groupID -1 所有老师，-2未关联老师，0未分组老师
        //        if (groupID == -1)
        //        {
        //            ds = _managerInfodal.GetTeacherListByOrgID(orgID);
        //            var allTeacherList = ModelConvertHelper<TeacherManagerModel>.ConvertToModelList(ds.Tables[0]);
        //            TeacherList.AddRange(allTeacherList);

        //        }
        //        else if (groupID == -2)
        //        {
        //            ds = _managerInfodal.GetTeacherListByOrgID(orgID, false, false);
        //            var allTeacherList = ModelConvertHelper<TeacherManagerModel>.ConvertToModelList(ds.Tables[0]);
        //            TeacherList.AddRange(allTeacherList.Where(m => string.IsNullOrEmpty(m.SID) && m.GroupID == 0));

        //        }
        //        else if (groupID == 0)
        //        {
        //            ds = _managerInfodal.GetTeacherListByOrgID(orgID, true, false);
        //            var nogroupTeacherList = ModelConvertHelper<TeacherManagerModel>.ConvertToModelList(ds.Tables[0]);
        //            TeacherList.AddRange(nogroupTeacherList.Where(m => m.GroupID == 0));
        //        }
        //        //分组老师
        //        else
        //        {
        //            ds = _managerInfodal.GetTeacherListByOrgID(orgID, true, false);
        //            var groupTeacherList = ModelConvertHelper<TeacherManagerModel>.ConvertToModelList(ds.Tables[0]);
        //            TeacherList.AddRange(groupTeacherList.Where(m => m.GroupID == groupID));
        //        }


        //    }
        //    else
        //    {

        //        //groupID -1 所有老师，-2未关联老师，0未分组老师
        //        if (groupID == -1)
        //        {
        //            ds = _managerInfodal.GetTeacherListByOrgID(orgID);

        //            var allTeacherList = ModelConvertHelper<TeacherManagerModel>.ConvertToModelList(ds.Tables[0]);
        //            TeacherList.AddRange(allTeacherList.Where(item => item.CreateBy == createBy.ToString()));

        //        }
        //        else if (groupID == -2)
        //        {
        //            ds = _managerInfodal.GetTeacherListByOrgID(orgID, false, true);
        //            var allTeacherList = ModelConvertHelper<TeacherManagerModel>.ConvertToModelList(ds.Tables[0]);
        //            //TeacherList.AddRange(allTeacherList.Where(item => item.CreateBy == createBy.ToString() && string.IsNullOrEmpty(item.SID)));
        //            TeacherList.AddRange(allTeacherList.Where(item => item.CreateBy == createBy.ToString() && string.IsNullOrEmpty(item.SID) && item.GroupID == 0));

        //        }
        //        else if (groupID == 0)
        //        {
        //            ds = _managerInfodal.GetTeacherListByOrgID(orgID, true, false);
        //            var allTeacherList = ModelConvertHelper<TeacherManagerModel>.ConvertToModelList(ds.Tables[0]);
        //            TeacherList.AddRange(allTeacherList.Where(item => item.CreateBy == createBy.ToString() && item.GroupID == 0));
        //        }
        //        //分组老师
        //        else
        //        {
        //            ds = _managerInfodal.GetTeacherListByOrgID(orgID, true, false);
        //            var allTeacherList = ModelConvertHelper<TeacherManagerModel>.ConvertToModelList(ds.Tables[0]);
        //            TeacherList.AddRange(allTeacherList.Where(item => item.CreateBy == createBy.ToString() && item.GroupID == groupID));
        //        }



        //    }
        //    if (!string.IsNullOrEmpty(teacherName))
        //    {
        //        TeacherList = TeacherList.Where(m => (!string.IsNullOrEmpty(m.Name) && m.Name.Contains(teacherName))).ToList();
        //    }
        //    return TeacherList.OrderBy(m => m.UType).ToList();
        //}
        #endregion


        public List<TeacherManagerModel> GetTeacherList(int groupID, int orgID, int createBy, string teacherName = "")
        {
            var ds = _managerInfodal.GetTeacherList(orgID, groupID, createBy, teacherName);
            var allTeacherList = ModelConvertHelper<TeacherManagerModel>.ConvertToModelList(ds.Tables[0]);
            return allTeacherList;
        }


        /// <summary>
        /// 获取教师所在分组列表
        /// </summary>
        /// <param name="TID"></param>
        /// <returns></returns>
        public List<TeacherGroupModel> GetTeacherGroupList(int TID)
        {
            var ds = _grelmdal.GetTeacherGroupList(TID);
            var TeacherGroupList = ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[0]);
            return TeacherGroupList;
        }
        /// <summary>
        /// 获取教师关联的学生
        /// </summary>
        /// <param name="TID"></param>
        /// <returns></returns>
        public List<TeacherStudentModel> GetStudentByTeacher(int TID)
        {
            var Result = new List<TeacherStudentModel>();
            var ds = _grelmdal.GetStudentByTID(TID);
            //教师与学生直接关联
            var stuList1 = ModelConvertHelper<TeacherStudentModel>.ConvertToModelList(ds.Tables[1]);
            Result.AddRange(stuList1);
            //教师与学生通过分组关联
            // var stuList = ModelConvertHelper<TeacherStudentModel>.ConvertToModelList(ds.Tables[0]);
            //Result.AddRange(stuList);

            return Result;
        }


        //删除教师分组关联
        public bool DelTeacherGroupRel(int tid, int gid)
        {
            return _grelmdal.Delete(tid, gid);
        }

        //添加教师分组关联
        public bool AddTeacherGroupRel(int tid, int gid)
        {
            return _grelmdal.Add(new EI_GRelM { GID = gid, TID = tid.ToString() });
        }

        /// <summary>
        /// 添加教师列表到分组
        /// </summary>
        /// <param name="tids"></param>
        /// <param name="gid"></param>
        /// <returns></returns>
        public int AddTeacherToGroupRel(List<string> tids, int gid)
        {
            var models = tids.Where(m => !string.IsNullOrEmpty(m)).Select(m => new EI_GRelM { TID = m, GID = gid }).ToList();
            return _grelmdal.Add(models);
        }

        /// <summary>
        /// 根据教师ID获取未关联的分组
        /// </summary>
        /// <param name="tids">教师ID</param>
        /// <param name="name"></param>
        /// <param name="orgID"></param>
        /// <param name="createBy"></param>
        /// <param name="utype"></param>
        /// <returns></returns>
        public List<TeacherGroupModel> GetNotRelGroupByTID(string tids, string name, int orgID, int createBy, int utype)
        {
            //超级管理员
            if (utype == 0)
            {
                var ds = _grelmdal.GetStuNotRelGroupByTID(tids, name, orgID);
                return ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                var ds = _grelmdal.GetStuNotRelGroupByTID(tids, name, orgID, createBy);
                return ModelConvertHelper<TeacherGroupModel>.ConvertToModelList(ds.Tables[0]);
            }


        }
        /// <summary>
        /// 根据教师ID获取未关联学生
        /// </summary>
        /// <param name="tid">教师ID</param>
        /// <param name="orgID">组织ID</param>
        /// <param name="name">姓名</param>
        /// <param name="utype">用户类型</param>
        /// <param name="createBy">当前用户</param>
        /// <returns></returns>
        public List<StudentModel> GetStuNotRelTeacByTID(string tid, int orgID, string name, int utype, int createBy)
        {
            if (utype == 0)
            {
                var dataSet = _grelmdal.GetStuNotRelTeacByTID(tid, orgID, name);
                return ModelConvertHelper<StudentModel>.ConvertToModelList(dataSet.Tables[0]);
            }
            else
            {
                var dataSet = _grelmdal.GetStuNotRelTeacByTID(tid, orgID, name, createBy);
                return ModelConvertHelper<StudentModel>.ConvertToModelList(dataSet.Tables[0]);
            }
        }
        public int Addteachers2Groups(string tids, string groupIDs)
        {
            return _grelmdal.Addteachers2Groups(tids, groupIDs);
        }
        /// <summary>
        /// 获取教师教学日记
        /// </summary>
        /// <param name="paraList">查询参数类</param>
        /// <returns></returns>
        public List<TeachDiaryModel> GetTechDiaryList(EI_Base<EI_TeachDiary> para)
        {
            return new TeachDiaryDal().GetTechDiaryList(para);
        }

        /// <summary>
        /// 教学日记历史明细
        /// </summary>
        /// <param name="eI_Base">查询参数类</param>
        /// <returns></returns>
        public List<TeachDiaryModel> GetTechDiaryDetailsList(EI_Base<EI_TeachDiary> eI_Base)
        {
            return new TeachDiaryDal().GetTechDiaryDetailsList(eI_Base);
        }

        /// <summary>
        /// 更新老师信息
        /// </summary>
        /// <param name="eI_Base">选课属性</param>
        /// <returns></returns>
        public List<ManRelStaModel> GetTeacherCenterList(EI_Base<EI_ManRelSta> eI_Base)
        {
            return new ManRelStaDal().GetTeacherCenterList(eI_Base);
        }

        /// <summary>
        /// 保存教师信息
        /// </summary>
        public string SaveTeacherCenter(int TID, List<ManRelStaModel> list, TeacherManagerModel dto)
        {
            return new ManRelStaDal().SaveTeacherCenter(TID, list, dto);
        }

        /// <summary>
        /// 更新老师选课
        /// </summary>
        /// <param name="eI_Base">选课</param>
        /// <returns></returns>
        public List<ManRelStaModel> GetTeacherSelect(EI_Base<EI_ManRelSta> eI_Base)
        {
            List<ManRelStaModel> list = new ManRelStaDal().GetTeacherSelect(eI_Base);
            var i = 1;
            list.ForEach(a =>
            {
                a.TempID = i;
                i++;

                switch (a.StageID.Value)
                {
                    case 1: a.StageIDName = "小学"; break;
                    case 2: a.StageIDName = "初中"; break;
                    case 3: a.StageIDName = "高中"; break;
                    default:
                        break;
                }
                switch (a.SubjectID.Value)
                {
                    case 1: a.SubjectIDName = "语文"; break;
                    case 2: a.SubjectIDName = "数学"; break;
                    case 3: a.SubjectIDName = "英语"; break;
                    case 4: a.SubjectIDName = "物理"; break;
                    case 5: a.SubjectIDName = "化学"; break;
                    case 6: a.SubjectIDName = "地理"; break;
                    case 7: a.SubjectIDName = "历史"; break;
                    case 8: a.SubjectIDName = "政治"; break;
                    case 9: a.SubjectIDName = "生物"; break;
                    default:
                        break;
                }
                a.Name = a.StageIDName + a.SubjectIDName;
            });
            return list;
        }
        public List<EI_Announcement> GetAnnouncement(int id, int orgId)
        {
            //string strWhere = (id == 0 ? "1=1" : "ID=" + id.ToString());
            //DataSet dsAnn = new DataSet();
            //if (id == 0)
            //{
            //    dsAnn = _announcementDal.GetAnnouncementList(strWhere);
            //}
            //else
            //{
            //    dsAnn = _announcementDal.GetList(" orgId=" + orgId + " and ID=" + id + "");
            //}
            string strWhere = " orgId=" + orgId;
            DataSet dsAnn = new DataSet();
            dsAnn = _announcementDal.GetAnnouncementList(strWhere);
            List<EI_Announcement> listAnn = Mfg.EI.Common.ModelConvertHelper<EI_Announcement>.ConvertToModelList(dsAnn.Tables[0]);
            return listAnn;
        }

        /// <summary>
        /// 删除数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteData(int id)
        {
            return _announcementDal.Delete(id);
        }


        public List<EI_Announcement> GetPageList(string id, int orgId)
        {
            DataSet ds = _announcementDal.GetPageList(id, orgId);
            return Mfg.EI.Common.ModelConvertHelper<EI_Announcement>.ConvertToModelList(ds.Tables[0]);
        }

        /// <summary>
        /// 保存选课教师
        /// </summary>
        public string SaveTeacherSelect(int TID, List<ManRelStaModel> list)
        {
            return new ManRelStaDal().SaveTeacherSelect(TID, list);
        }

        /// <summary>
        /// 查询教程
        /// </summary>
        /// <returns></returns>
        public List<EI_Material> GetMaterial()
        {
            return new ManRelStaDal().GetMaterial();
        }

        /// <summary>
        /// 教师基本信息
        /// </summary>
        /// <param name="eI_Base">参数</param>
        /// <returns></returns>
        public List<TeacherBaseModel> TeacherBaseIndex(EI_Base<EI_ManagerInfo> eI_Base)
        {
            return new ManRelStaDal().TeacherBaseIndex(eI_Base);
        }


        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="eI_Base"></param>
        /// <returns></returns>
        public string SavePW(EI_Base<TeacherBaseModel> eI_Base)
        {
            return new ManRelStaDal().SavePW(eI_Base);
        }

        #region 换肤
        /// <summary>
        /// 换肤
        /// </summary>
        /// <param name="orgTemplate">皮肤</param>
        /// <param name="ID">机构ID</param>
        /// <returns></returns>
        public bool UpdateOrgTemplate(string orgTemplate, int ID, string createBy)
        {
            return _orgDal.UpdateOrgTemplate(orgTemplate, ID, createBy);
        }
        #endregion

        #region 换Logo
        /// <summary>
        /// 换Logo
        /// </summary>
        /// <param name="orgTemplate">皮肤</param>
        /// <param name="ID">机构ID</param>
        /// <returns></returns>
        public bool UpdateLogoUrl(string logoUrl, int ID, string createBy)
        {
            return _orgDal.UpdateLogoUrl(logoUrl, ID, createBy);
        }
        #endregion

        #region 换登录页轮播图

        /// <summary>
        /// 换Logo
        /// </summary>
        /// <param name="bannerImgUrls"></param>
        /// <param name="id"></param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        public bool ChangeBannerImg(string bannerImgUrls, int id, string createBy)
        {
            return _orgDal.ChangeBannerImg(bannerImgUrls, id, createBy);
        }
        #endregion


        public EI_Announcement GetAnnouncementStep(EI_Announcement para)
        {
            return new AnnouncementDal().GetAnnouncementStep(para);
        }

        #region 重置密码

        /// <summary>
        /// 重置密码
        /// </summary>
        /// <param name="accountNumber"></param>
        /// <param name="tname"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool ResetPwd(int accountNumber, string tname, string userId)
        {
            return new ManRelStaDal().RestePwd(accountNumber, tname, userId);
        }
        #endregion


        #region 删除组
        /// <summary>
        /// 删除组
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool DeleteGroup(int ID)
        {
            int rows = _groupinfodal.DeleteGroup(ID);
            return rows > 0;
        }
        #endregion


        #region 异步
        public async Task<string> SaveDiaryAsync(string DiaryName, string TID) //async Task<string>
        {
            StringBuilder sql = new StringBuilder();
            sql.AppendFormat(@"INSERT into EI_TeachDiary(ID,Name,Tid,CreateTime,DelFlag,Remark) VALUES('{0}','{1}','{2}','{3}',0,'');", Guid.NewGuid(), DiaryName, TID, DateTime.Now);
            return await Task.Run<string>(() => { return sql.ToString(); });
        }
        #endregion

        #region 教学日志
        /// <summary>
        /// 教学日志
        /// </summary>
        /// <param name="DiaryName"></param>
        /// <param name="TID"></param>
        /// <returns></returns>
        public string SaveDiary(string DiaryName, string TID) //async Task<string>
        {
            return _teachDiaryDal.SaveDiary(DiaryName, TID);
        }
        #region 冻结老师
        public bool FreezeTeacherInfo(string tId, string tName, string managerID)
        {
            return _managerInfodal.FreezeTeacherInfo(tId, tName, managerID);

        }
        public bool DeFreezeTeacherInfo(string tId, string tName, string managerID)
        {
            return _managerInfodal.DeFreezeTeacherInfo(tId, tName, managerID);
        }
        #endregion

        #endregion


        /// <summary>
        /// 获取关联学生信息
        /// </summary>
        /// <param name="aid"></param>
        /// <param name="orgid"></param>
        /// <returns></returns>
        public List<EI_StudentInfo> GetRelStuInfo(int aid, int orgid)
        {
            return _groupinfodal.GetRelStuInfo(aid, orgid);
        }
        /// <summary>
        /// 更新分组名
        /// </summary>
        /// <param name="groupModel"></param>
        public bool UpdateGroupInfo(GroupInfoModel model)
        {
            return _Group.UpdateGroupName(model.Name, model.OldGroupName, model.OrgID);
        }

        /// <summary>
        /// 老师获取配置阶段科目
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public List<ManRelStaModel> GetManStaInfoList(string tid)
        {
            var _subrelList = _subrelmatdal.GetManRelStaList(tid);
            List<ManRelStaModel> _subrelmodelList = new List<ManRelStaModel>();


            if (_subrelList != null)
            {
                foreach (var item in _subrelList)
                {
                    ManRelStaModel _subrelmodel = new ManRelStaModel();
                    _subrelmodel.TID = Convert.ToInt32(tid);
                    _subrelmodel.StageID = item.StageID;
                    _subrelmodel.SubjectID = item.SubjectID;
                    _subrelmodel.MaterialID = item.MaterialID;
                    _subrelmodel.SubjectName = item.SubjectName;
                    _subrelmodelList.Add(_subrelmodel);
                }
            }
            return _subrelmodelList;
        }

        /// <summary>
        /// 获取教师分组树
        /// </summary>
        /// <param name="tids"></param>
        /// <param name="name"></param>
        /// <param name="orgID"></param>
        /// <param name="userId"></param>
        /// <param name="utype"></param>
        /// <returns></returns>
        public string GetNotRelGroupTree(string tids, string name, int orgID, int userId, int utype)
        {

            var sql = _grelmdal.GetTeacherNotRelGroupSql(tids, name, orgID, utype == 0 ? 0 : userId);
            var gtreelist = _grelmdal.GetNotRelGroupForTree(sql, orgID, utype == 0 ? 0 : userId);

            var html = new StringBuilder();
            if (utype == 0)
            {
                GetTeacherTreeView(null, ref gtreelist, ref html);
            }
            else
            {
                GetTeacherTreeView(gtreelist.FirstOrDefault(m => m.ID == userId && m.Level >= 0), ref gtreelist, ref html);
            }
            return html.ToString();

        }


        /// <summary>
        /// 获取指定机构下，某类型的老师
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="utype"></param>
        /// <returns></returns>
        public List<TeacherManagerModel> GetManagerList(int orgID, int utype)
        {
            var ds = _managerInfodal.GetManagerList(orgID, utype);
            return ModelConvertHelper<TeacherManagerModel>.ConvertToModelList(ds.Tables[0]);
        }




        public bool ValidatePW(EI_Base<TeacherBaseModel> eI_Base)
        {
            return new ManRelStaDal().ValidatePW(eI_Base);
        }

        /// <summary>
        /// 保存意见反馈
        /// </summary>
        /// <param name="feedModel"></param>
        /// <returns></returns>
        public bool SaveFeedBack(FeedBackModel feedModel)
        {
            return _managerInfodal.SaveFeedBack(feedModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public string GetFeedBackInfo(string LoginAccountNumber, int OrgID)
        {
            return _managerInfodal.GetFeedBackInfo(LoginAccountNumber, OrgID);
        }

        #region 试题蓝函数

        /// <summary>
        /// 获取试题蓝试题
        /// </summary>
        /// <returns></returns>
        public List<PaperBasketViewModel> GetQuestionBoxList(EI_PaperBasket eiPaper)
        {
            return new QuestionBox().GetQuestionBoxList(eiPaper).ConvertAll(a =>
            {
                var paper = new PaperBasketViewModel()
                {
                    OrgID = a.OrgID,
                    SequenceID = a.SequenceID,
                    SubjectID = a.SubjectID,
                    ItemID = a.ItemID,
                    ItemType = a.ItemType,
                    KnowledgeID = a.KnowledgeID,
                    KnowledgeName = a.KnowledgeName,
                    ItemSourceType = a.ItemSourceType,
                    Score = a.Score,
                    DiffNum = a.DiffNum,
                    PID = a.PID,
                    AddTime = a.AddTime,
                    BigGrade = a.BigGrade
                };
                return paper;
            });
        }

        /// <summary>
        /// 获取试题 是否在试题蓝并返回此试题实体
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public EI_PaperBasket GetQuestionInBox(EI_PaperBasket eiPaper)
        {
            return new QuestionBox().GetQuestionInBox(eiPaper);
        }

        /// <summary>
        /// 删除一条试题
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public bool DeleteQuestionInBox(EI_PaperBasket eiPaper)
        {
            return new QuestionBox().DeleteQuestionInBox(eiPaper);
        }

        /// <summary>
        /// 清空当前老师试所选科目试题蓝
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public bool ClearQuestionInBox(EI_PaperBasket eiPaper)
        {
            return new QuestionBox().ClearQuestionInBox(eiPaper);
        }

        /// <summary>
        /// 添加试题
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public int AddQuestionInBox(EI_PaperBasket eiPaper)
        {
            QuestionBox qb = new QuestionBox();
            EI_PaperBasket tempEipaper = GetQuestionInBox(eiPaper);
            if (tempEipaper != null)
            {
                //数据已存在
                return -2;
            }

            tempEipaper = qb.VerificationSubjectAndBigGrade(eiPaper);
            if (tempEipaper != null && tempEipaper.SubjectID != eiPaper.SubjectID)
            {
                //加入数据与当前试题蓝科目 或年级不相符。
                return -3;
            }
            if (tempEipaper != null)
            {
                eiPaper.PaperName = tempEipaper.PaperName;

                //if (eiPaper.ItemType == 1)//选择题
                //    eiPaper.Score = tempEipaper.Score;
            }
            var temSequenceID = qb.GetSequenceID(eiPaper);
            if (temSequenceID == null)
            {
                eiPaper.SequenceID = 1;
            }
            else
            {
                eiPaper.SequenceID = temSequenceID.SequenceID + 1;
            }

            return qb.AddQuestionInBox(eiPaper);
        }



        /// <summary>
        /// 批量插入数据
        /// </summary>
        /// <param name="listEiPaper"></param>
        /// <returns></returns>
        public Tuple<int, int, int> BatchAddQuestionInBox(List<EI_PaperBasket> listEiPaper, EI_PaperBasket eiPaper)
        {
            QuestionBox qb = new QuestionBox();

            if (listEiPaper == null && listEiPaper.Count <= 0) return new Tuple<int, int, int>(0, 0, 0);

            var tempEiPaper = listEiPaper.FirstOrDefault();

            EI_PaperBasket tempEipaper = qb.VerificationSubjectAndBigGrade(eiPaper);
            if (tempEipaper != null && tempEipaper.SubjectID != tempEiPaper.SubjectID)
            {
                //加入数据与当前试题蓝科目 或年级不相符。
                return new Tuple<int, int, int>(0, 0, 0);
            }

            List<EI_PaperBasket> existEiPaper = qb.BatchGetQuestionInBox(eiPaper, listEiPaper.Select(a => a.ItemID).ToList<int>());
            foreach (var item in existEiPaper)
            {
                listEiPaper.RemoveAll(a => a.ItemID == item.ItemID);

            }

            int i = 0;
            var temSequenceID = qb.GetSequenceID(eiPaper);
            if (temSequenceID != null)
            {
                i = temSequenceID.SequenceID;
            }

            listEiPaper.ForEach(a =>
            {
                i++;
                a.SequenceID = i;
            });


            if (tempEipaper != null)
            {
                listEiPaper.ForEach(a =>
                {
                    i++;
                    a.PaperName = tempEipaper.PaperName;

                    //if (a.ItemType == 1)//选择题
                    //    a.Score = tempEipaper.Score;
                    a.SequenceID = i;
                });
            }

            Tuple<int, int, int> tu = new Tuple<int, int, int>(0, 0, 0);

            if (qb.BatchAddQuestionInBox(listEiPaper) > 0)
            {
                int x = listEiPaper.Where(a => a.ItemType == 1).Count();
                int c = listEiPaper.Where(a => a.ItemType == 2).Count();
                int g = listEiPaper.Where(a => a.ItemType == 3).Count();
                tu = new Tuple<int, int, int>(x, c, g);
            }
            return tu;
        }


        /// <summary>
        /// 批量判断是否在试题蓝并返回此试题实体
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public List<EI_PaperBasket> BatchGetQuestionExist(EI_PaperBasket eiPaper, List<int> listItemId)
        {
            return new QuestionBox().BatchGetQuestionInBox(eiPaper, listItemId);
        }


        /// <summary>
        /// 获取一条试题蓝试题数据
        /// </summary>
        /// <param name="eiPaper"></param>
        /// <returns></returns>
        public EI_PaperBasket GetOneQuestionBox(EI_PaperBasket eiPaperParam)
        {
            return new QuestionBox().GetOneQuestionBox(eiPaperParam);
        }

        #endregion


        public Paper GetExam(int orgid, int tid, int subJectId, string PID, int ptype, int p)
        {
            return new QuestionBox().GetExam(orgid, tid, subJectId, PID, ptype, p);


        }


        public bool DelDataIndex(string PID, int ItemID, int ActionStaus)
        {
            return new QuestionBox().DelDataIndex(PID, ItemID, ActionStaus);
        }


        public bool CheckDataIndex(List<KnowledgePointList> dto)
        {
            return new QuestionBox().CheckDataIndex(dto);
        }


        public bool SaveItem(PaperBasketModel para, List<EI_PaperBasket> dto)
        {
            return new QuestionBox().SaveItem(para, dto);
        }


        public bool SaveSore(int TID, int OrgID, int ItemType, int itemID, double score)
        {
            return new QuestionBox().SaveSore(TID, OrgID, ItemType, itemID, score);
        }


        public bool SaveName(int OrgID, int TID, int SubjectID, string p)
        {
            return new QuestionBox().SaveName(OrgID, TID, SubjectID, p);
        }


        public bool SaveChange(int OrgID, int TID, int ItemID, int DiffNum, int newItemID)
        {
            return new QuestionBox().SaveChange(OrgID, TID, ItemID, DiffNum, newItemID);
        }


        public bool ClearPaper(int OrgID, int TID)
        {
            return new QuestionBox().ClearPaper(OrgID, TID);
        }

        public Paper GetBookPreView(string bookID, int ptype)
        {
            return new QuestionBox().GetBookPreView(bookID, ptype);
        }



        /// <summary>
        /// 获取试题篮汇总
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public List<QueBoxSummary> GetSummary(int tid)
        {
            var rtValue = new QuestionBox().GetSummary(tid);
            return rtValue;
        }

        public bool UpdateBox(QueBoxMain box)
        {
            var rtValue = new QuestionBox().UpdateBox(box);
            return rtValue;
        }

        /// <summary>
        /// 获取试题篮主记录
        /// </summary>
        /// <param name="tid">用户ID</param>
        /// <param name="org">机构ID</param>
        /// <returns></returns>
        public QueBoxMain GetMainRecored(int tid, int org)
        {
            var rtValue = new QuestionBox().GetMainRecored(tid, org);
            return rtValue;
        }

        /// <summary>
        /// 清除试题篮中某个试卷的题目
        /// </summary>
        /// <param name="OrgID"></param>
        /// <param name="TID"></param>
        /// <param name="ids"></param>
        /// <returns></returns>
        public bool ClearFromPaper(int OrgID, int TID, int[] ids)
        {
            return new QuestionBox().ClearFromPaper(OrgID, TID, ids);
        }
    }
}
