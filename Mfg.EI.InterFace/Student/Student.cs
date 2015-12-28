/*
 * author:杨礼文;
 * function:学生档案相关接口
 * date:2015-04-16
 */

using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Mfg.EI.Common;
using Mfg.EI.DAL.Teacher;
using Mfg.EI.Entity;
using Mfg.EI.InterFace;
using Mfg.EI.DAL;
using Mfg.EI.ViewModel;
using Mfg.UserCenter.Comm.UserInfo.BLL;
using Mfg.UserCenter;
using Mfg.EI.WeiXin.ViewModel;
using MongoDB.Bson.Serialization.Conventions;

namespace Mfg.EI.InterFace
{
    public class Student : IStudent
    {
        //private static log4net.ILog _log = log4net.LogManager.GetLogger("LogFile");
        #region 私有变量
        private StudentInfoDal _studentInfoDal = new StudentInfoDal(); //学生信息
        private ManagerInfoDal _managerInfoDal = new ManagerInfoDal(); //老师信息
        private GRelSDal _gRelSDal = new GRelSDal();//学生分组
        private GRelMDal _gRelMDal = new GRelMDal();//老师分组
        private CommonDal _commonDal = new CommonDal();//公用的Dal 

        private MfgOutfitBll _mfgOutfitBll = new MfgOutfitBll();//魔方格注册的dll对象 

        private OrgDal _orgDal = new OrgDal();

        private KnowQuesDal _knowQuesDal = new KnowQuesDal();
        #endregion

        #region 私有方法
        #region 魔方格对象转换成机构学生对象
        /// <summary>
        /// 魔方格对象转换成机构学生对象
        /// </summary>
        /// <param name="ei_StudentInfo"></param>
        /// <param name="mfgUserInfoModel"></param>
        public void MfgUserInfoModelCovertToEI_StudentInfo(MfgUserInfoModel mfgUserInfoModel, EI_StudentInfo ei_StudentInfo)
        {
            #region 魔方格对象转换成机构学生对象
            // {"PId":64042904,"PAlias":"小明","PSex":"男","PPhone":"","PInClass":"x1","PEdu":1,"PSchool":0,"PSchoolName":"","PBirthday":"1899-12-31 16:00:00","PQq":"","PAddress":"","PPhoto":"","PWl":0}
            ei_StudentInfo.MfgID = mfgUserInfoModel.PId;
            ei_StudentInfo.Name = mfgUserInfoModel.PAlias;
            ei_StudentInfo.Gender = mfgUserInfoModel.PSex == "男" ? 0 : 1;
            //ei_StudentInfo.Phone = mfgUserInfoModel.PPhone;
            ei_StudentInfo.Shool = string.IsNullOrEmpty(mfgUserInfoModel.PSchoolName) ? ei_StudentInfo.Shool : mfgUserInfoModel.PSchoolName;
            //ei_StudentInfo.BirthDate = Convert.ToDateTime(mfgUserInfoModel.PBirthday);
            //ei_StudentInfo.QQ = mfgUserInfoModel.PQq;
            //ei_StudentInfo.Address = mfgUserInfoModel.PAddress;
            ei_StudentInfo.ImgUrl = mfgUserInfoModel.PPhoto;

            switch (mfgUserInfoModel.PInClass)
            {
                case "x1":
                case "x2":
                case "x3":
                case "x4":
                case "x5":
                case "x6":
                    ei_StudentInfo.GradeID = Convert.ToInt32(mfgUserInfoModel.PInClass.Substring(1));

                    if (mfgUserInfoModel.PEdu == 1)
                    {
                        ei_StudentInfo.AcaStru = 0;
                    }
                    else
                    {
                        ei_StudentInfo.AcaStru = 1;
                    }

                    break;

                case "c1":
                case "c2":
                case "c3":
                    ei_StudentInfo.GradeID = Convert.ToInt32(mfgUserInfoModel.PInClass.Substring(1)) + 6;

                    if (mfgUserInfoModel.PEdu == 1)
                    {
                        ei_StudentInfo.AcaStru = 0;
                    }
                    else
                    {
                        ei_StudentInfo.AcaStru = 1;
                    }
                    break;

                case "g1":
                case "g2":
                case "g3":
                    ei_StudentInfo.GradeID = Convert.ToInt32(mfgUserInfoModel.PInClass.Substring(1)) + 9;

                    if (mfgUserInfoModel.PWl == 1)
                    {
                        ei_StudentInfo.AcaStru = 2;
                    }
                    else if (mfgUserInfoModel.PWl == 0)
                    {
                        ei_StudentInfo.AcaStru = 3;
                    }
                    else
                    {
                        ei_StudentInfo.AcaStru = 4;
                    }

                    break;

            }
            ei_StudentInfo.StageId = getBgrade(ei_StudentInfo.GradeID == null ? 1 : ei_StudentInfo.GradeID.Value, ei_StudentInfo.AcaStru == null ? 1 : ei_StudentInfo.AcaStru.Value);


            #endregion

        }
        #endregion

        #region 机构学生对象转换成魔方格对象
        /// <summary>
        /// 机构学生对象转换成魔方格对象
        /// </summary>
        /// <param name="ei_StudentInfo"></param>
        /// <param name="mfgUserInfoModel"></param>
        public void EI_StudentInfoCovertToMfgUserInfoModel(EI_StudentInfo ei_StudentInfo, MfgUserInfoModel mfgUserInfoModel)
        {


        }

        #endregion
        #endregion


        #region 根据mfgID获取实体
        /// <summary>
        /// 根据mfgID获取实体
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        public EI_StudentInfo GetStudentInfoModel(string mfgID)
        {

            MfgUserInfoModel mfgUserInfoModel = new MfgUserInfoModel();
            try
            {
                string strUserInfo = _mfgOutfitBll.GetUserInfo("user", Convert.ToInt32(mfgID));//接口
                mfgUserInfoModel = JsonHelper.FromJsonTo<MfgUserInfoModel>(strUserInfo);
            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用_mfgOutfitBll.GetUserInfo接口出错,参数为({0})", "user" + "|" + mfgID), ex);
                return null;
            }

            EI_StudentInfo ei_StudentInfo = _studentInfoDal.GetModel(mfgID);

            if (ei_StudentInfo == null)
            {
                return null;
            }

            MfgUserInfoModelCovertToEI_StudentInfo(mfgUserInfoModel, ei_StudentInfo);


            ei_StudentInfo.StageId = getBgrade(ei_StudentInfo.GradeID == null ? 1 : ei_StudentInfo.GradeID.Value, ei_StudentInfo.AcaStru == null ? 1 : ei_StudentInfo.AcaStru.Value);
            return ei_StudentInfo;
        }
        #endregion

        #region 该机构能否创建学生
        /// <summary>
        /// 该机构能否创建学生
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="createCount"></param>
        /// <returns></returns>
        public bool CanCreateStu(int orgID, int createCount)
        {
            //在合约内，VIP机构版创建学生账号无限制；通用版创建学生账号上限为StuLimitCount个。
            return _orgDal.CanCreateStu(orgID) >= createCount;
        }


        #endregion

        #region 添加学生
        /// <summary>
        ///  添加学生
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool Add(EI_StudentInfo model, out string mfgID)
        {

            #region 用户注册
            // <summary>用户注册
            // </summary>
            // <param name="userKey">用户中心链接键</param>
            // <param name="billKey">账单链接键</param>
            // <param name="alias">用户昵称</param> 
            // <param name="pwd">密码(明文密码)</param>
            // <param name="sex">性别（男、女）</param>
            // <param name="inclass">年级（x1,x2....c1,c2,c3...g1,g2,g3）</param>
            // <param name="edu">学制 用户的学制 0六三制 1五四制 高中用户按照六三制处理</param>
            // <param name="wl">文理 用户的文理科 小初都为理科 0理科 1文科 2不分文理 </param>
            // <param name="phone">联系方式</param>
            // <param name="photo">头像</param>
            // <param name="ip">ip地址</param>
            // <returns>魔方号 -1：注册失败 -2：号池中没有号码 -3：参数异常</returns> 
            #endregion

            #region 魔方格注册
            string sex = model.Gender == 0 ? "男" : "女";
            string inclass = "";//年级
            int edu = 0;//学制
            int wl = 0;//文理

            switch (model.GradeID)
            {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    inclass = "x" + model.GradeID.ToString();
                    //@*学制,0五四制，1六三制，2文科，3理科，4不分文理*@
                    if (model.AcaStru == 0)
                    {
                        edu = 1;
                    }
                    else
                    {
                        edu = 0;
                    }

                    wl = 0;

                    break;
                case 7:
                case 8:
                case 9:
                    inclass = "c" + (model.GradeID - 6).ToString();

                    if (model.AcaStru == 0)
                    {
                        edu = 1;
                    }
                    else
                    {
                        edu = 0;
                    }
                    wl = 0;

                    break;
                case 10:
                case 11:
                case 12:
                    inclass = "g" + (model.GradeID - 9).ToString();
                    edu = 0;

                    if (model.AcaStru == 2)//
                    {
                        wl = 1;//文科
                    }
                    else if (model.AcaStru == 3)
                    {
                        wl = 0;//理科
                    }
                    else
                    {
                        wl = 2;//不分文理
                    }

                    break;
            }


            string ip = HttpHelper.GetExtranetIP();
            int resultmfgID = _mfgOutfitBll.MfgOutfitReg("user", "bill", model.Name, model.InitialPassword, sex, inclass, edu, wl, model.Phone, model.ImgUrl, ip);
            #endregion

            if (resultmfgID > 0)
            {
                mfgID = resultmfgID.ToString();
                model.MfgID = mfgID;
            }
            else
            {
                mfgID = "";
                LogHelperNet.Error(string.Format("调用_mfgOutfitBll.MfgOutfitReg接口出错,参数为({0})", "user" + "|" + "bill" + "|" + model.Name + "|" + model.InitialPassword + "|" + sex + "|" + inclass + "|" + edu + "|" + wl + "|" + model.Phone + "|" + "" + "|" + ""), null);
                return false;
            }
            bool _return = false;
            try
            {
                _return = _studentInfoDal.Add(model);//添加用户
            }
            catch (Exception ex)
            {
                _return = false;
                LogHelperNet.Error("创建失败", ex);
            }

            if (_return)
            {
                //_studentInfoDal.AddEI_Experience(model);//添加经验值
                Func<EI_StudentInfo, bool> _r = (a) => _studentInfoDal.AddEI_Experience(a);
                _r.BeginInvoke(model, (b) =>
                {
                    (b.AsyncState as Func<EI_StudentInfo, bool>).EndInvoke(b);
                }, _r);
            }

            return _return;
        }
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
        public string GetManagerTree(UserTypeEnum roleType, string userID, string name, int orgID)
        {

            StringBuilder strTree = new StringBuilder();
            DataSet ds = new DataSet();
            string strWhere = "";
            if (roleType == UserTypeEnum.VIPSuperManager || roleType == UserTypeEnum.SuperManager)//超级管理员
            {
                strWhere = string.Format(" UType BETWEEN 0 AND 1  AND OrgID={0}", orgID);
                ds = _managerInfoDal.GetList(strWhere);
            }
            else //if (roleType == UserTypeEnum.Manager || roleType == UserTypeEnum.Manager)//普通管理员 只能看自己
            {
                //strWhere = string.Format(" UType=1  AND OrgID={0} AND AccountNumber={1}", orgID);
            }


            if (roleType == UserTypeEnum.VIPSuperManager || roleType == UserTypeEnum.SuperManager)
            {
                strWhere = " CreateBy is NULL";
                DataRow[] rows = ds.Tables[0].Select(strWhere);
                foreach (var row in rows)
                {
                    string pName = row["Name"].ToString();
                    string accountNumber = row["AccountNumber"].ToString();
                    strTree.Append("<div>");
                    strTree.AppendFormat("<h3 class='pl30 rel hand' usertype='{0}' userid='{1}'><i class='li_open'></i>{2}</h3>", "superManager", accountNumber, pName);
                    strTree.Append(" <ol class='F12'>");


                    strWhere = string.Format(" CreateBy = '{0}' ", accountNumber);
                    DataRow[] rows2 = ds.Tables[0].Select(strWhere);
                    foreach (var row2 in rows2)
                    {

                        string pName2 = row2["Name"].ToString();
                        string accountNumber2 = row2["AccountNumber"].ToString();
                        strTree.Append("<li>");
                        strTree.AppendFormat("<h3 class='pl30 rel hand mml20 hoverh3' usertype='{0}' userid='{1}'><i class='li_close'></i>{2}<a class='tip_skin ico' href='/TeacherManager/Details?id={1}'></a></h3>", "manager", accountNumber2, pName2);
                        strTree.AppendFormat("<ol class='F12 mgllist mg_hover_list' userid='{0}' style='display: block;'></ol></li>", accountNumber2);
                    }

                    strTree.Append("</ol>");
                    strTree.Append("</div>");
                }


            }
            else if (roleType == UserTypeEnum.VIPManager || roleType == UserTypeEnum.Manager)
            {
                //strWhere = string.Format(" CreateBy = '{0}' ", userID);
                //DataRow[] rows = ds.Tables[0].Select(strWhere);
                strTree.Append("<div>");
                string pName = name;
                string accountNumber = userID;
                strTree.AppendFormat("<h3 class='pl30 rel hand mml20' usertype='{0}' userid='{1}'><i class='li_close'></i>{2}</h3>", "manager", accountNumber, pName);
                strTree.AppendFormat("<ol class='F12 mgllist mg_hover_list' userid='{0}' style='display: block;'></ol></li>", accountNumber);
                strTree.Append("</ol>");
                strTree.Append("</div>");
            }


            //if (strTree.Length > 0)
            //{
            //    strTree.Append("</ol>");
            //}
            return strTree.ToString();
        }

        #endregion

        #region 获取该管理员下的学生分组
        /// <summary>
        /// 获取该管理员下的学生分组
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        public List<StudentGroup> GetStudentGroup(int orgID, string createBy)
        {
            var dataSet = _gRelSDal.GetStudentGroup(orgID, createBy);

            List<StudentGroup> studentGroupList = ModelConvertHelper<StudentGroup>.ConvertToModelList(dataSet.Tables[0]);

            #region MyRegion
            //#region 所有学生 id=-1 name=所有学生
            //studentGroupList.AddRange(ModelConvertHelper<StudentGroup>.ConvertToModelList(dataSet.Tables[0]));
            //#endregion

            //#region 已分组
            //studentGroupList.AddRange(ModelConvertHelper<StudentGroup>.ConvertToModelList(dataSet.Tables[1]));
            //#endregion

            //#region 未分组 id=0
            //studentGroupList.AddRange(ModelConvertHelper<StudentGroup>.ConvertToModelList(dataSet.Tables[2]));
            //#endregion

            //#region 未关联 id=-2
            //studentGroupList.AddRange(ModelConvertHelper<StudentGroup>.ConvertToModelList(dataSet.Tables[3]));
            //#endregion 
            #endregion

            return studentGroupList;

        }

        #endregion

        #region 根据条件获取该管理员分组下的学生列表
        /// <summary>
        /// 根据条件获取该管理员分组下的学生列表
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public List<StudentModel> GetStudentList(Dictionary<string, object> dic)
        {

            Dictionary<string, object> dictionary = new Dictionary<string, object>();

            foreach (var item in dic)
            {
                if (item.Value != null && item.Value != "")
                {
                    dictionary.Add(item.Key, item.Value);
                }
            }



            StringBuilder strSql = new StringBuilder();

            switch (dictionary["groupID"].ToString())
            {
                case "-1": //所有学生为groupID=-1
                    strSql.Append(" SELECT DISTINCT a.Name,d.Value STypeName,a.MfgID,a.ReamrkName,a.CreateTime,a.ActivationTime,a.ExpirDate from  EI_StudentInfo a ");
                    //strSql.Append(" LEFT JOIN EI_GRelS b ON  a.MfgID=b.SID ");
                    //strSql.Append(" LEFT JOIN EI_GroupInfo c on b.GID=c.ID ");
                    strSql.Append(" INNER JOIN EI_Dict d ON a.SType=d.Code AND d.Type='SType' ");
                    strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0 AND a.CreateBy=@CreateBy ");
                    break;
                case "0": //未分组groupID=0,

                    strSql.Append(" SELECT DISTINCT a.Name,d.Value STypeName,a.MfgID,a.ReamrkName,a.CreateTime,a.ActivationTime,a.ExpirDate from  EI_StudentInfo a ");
                    strSql.Append(" INNER JOIN EI_Dict d ON a.SType=d.Code AND d.Type='SType' ");
                    strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0 AND a.CreateBy=@CreateBy ");
                    strSql.Append(" AND a.MfgID NOT IN (select SID from EI_GRelS ) "); //分组过滤
                    break;
                case "-2":// 未关联groupID=-2
                    strSql.Append(" SELECT DISTINCT a.Name,d.Value STypeName,a.MfgID,a.ReamrkName,a.CreateTime,a.ActivationTime,a.ExpirDate from  EI_StudentInfo a ");
                    strSql.Append(" INNER JOIN EI_Dict d ON a.SType=d.Code AND d.Type='SType' ");
                    strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0 AND a.CreateBy=@CreateBy ");
                    strSql.Append("  AND a.MfgID NOT IN (select SID from EI_GRelS) AND MfgID not IN( select SID from EI_MRelS )"); //分组过滤 以及 学生老师关系过滤
                    // strSql.Append(" AND MfgID not IN( select SID from EI_MRelS )"); //学生老师关系过滤

                    break;

                default: // 分组
                    strSql.Append(" SELECT DISTINCT a.Name,d.Value STypeName,a.MfgID ,a.ReamrkName,a.CreateTime,a.ActivationTime,a.ExpirDate from  EI_StudentInfo a ");
                    strSql.Append(" INNER JOIN EI_GRelS b ON  a.MfgID=b.SID ");
                    strSql.Append(" INNER JOIN EI_GroupInfo c on b.GID=c.ID ");
                    strSql.Append(" INNER JOIN EI_Dict d ON a.SType=d.Code AND d.Type='SType' ");
                    strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0 AND  c.ID=@ID ");
                    dictionary.Add("ID", dictionary["groupID"]);
                    break;
            }

            if (dictionary.ContainsKey("stuName"))
            {
                dictionary["stuName"] = "%" + dictionary["stuName"] + "%";
                strSql.Append(" And a.Name like @stuName ");
            }
            strSql.Append(" Order by a.CreateTime desc");
            var dataSet = _commonDal.GetDataSetBySqlAndDic(strSql.ToString(), dictionary);
            return ModelConvertHelper<StudentModel>.ConvertToModelList(dataSet.Tables[0]);

        }
        #endregion

        #region 根据机构id获取学生分组EI_StudentInfo

        /// <summary>
        /// 根据机构id获取学生分组
        /// </summary>
        /// <param name="orgID">机构id</param>
        /// <returns></returns>
        public List<StudentGroup> GetStudentGroupByOrgID(int orgID, string createBy)
        {
            var dataSet = _gRelSDal.GetStudentGroupByOrgID(orgID, createBy);
            List<StudentGroup> studentGroupList = ModelConvertHelper<StudentGroup>.ConvertToModelList(dataSet.Tables[0]);
            List<StudentGroup> studentGroupList2 = ModelConvertHelper<StudentGroup>.ConvertToModelList(dataSet.Tables[3]);////该分组下没有学生

            double total = 0;
            //所有学生为ID=-1,未分组ID=0,未关联ID=-2
            if (studentGroupList.Count > 0)
            {
                total = Convert.ToInt32(dataSet.Tables[1].Rows[0]["Count"]);
            }

            studentGroupList.Insert(0, new StudentGroup() { Name = "所有学生", Count = total, ID = -1 });
            studentGroupList.InsertRange(studentGroupList.Count > 2 ? studentGroupList.Count - 1 : 1, studentGroupList2);
            studentGroupList.Add(new StudentGroup() { Name = "未关联学生", Count = Convert.ToInt32(dataSet.Tables[2].Rows[0]["Count"]), ID = -2 });

            return studentGroupList;
        }

        #endregion

        #region 根据老师ID获取学生分组
        /// <summary>
        /// 
        /// </summary>
        /// <param name="tID"></param>
        /// <returns></returns>
        public List<StudentGroup> GetStudentGroup(string tID)
        {
            var dataSet = _gRelSDal.GetStudentGroup(tID);
            List<StudentGroup> studentGroupList = ModelConvertHelper<StudentGroup>.ConvertToModelList(dataSet.Tables[0]);
            studentGroupList.Add(new StudentGroup() { Name = "关联学生", Count = Convert.ToInt32(dataSet.Tables[1].Rows[0]["Count"]), ID = -3 });

            return studentGroupList;
        }
        #endregion

        #region 根据条件获取学生列表
        /// <summary>
        /// 根据条件获取学生列表
        /// </summary>
        /// <param name="dic"></param>
        /// <returns></returns>
        public List<StudentModel> GetStudentListByDic(Dictionary<string, object> dic)
        {

            Dictionary<string, object> dictionary = new Dictionary<string, object>();

            foreach (var item in dic)
            {
                if (item.Value != null && item.Value != "")
                {
                    dictionary.Add(item.Key, item.Value);
                }
            }



            StringBuilder strSql = new StringBuilder();

            switch (Convert.ToInt32(dictionary["groupID"]))
            {
                case -1: //所有学生为groupID=-1
                    strSql.Append(" SELECT DISTINCT a.Name,d.Value STypeName,a.MfgID,a.ReamrkName,a.CreateTime,a.ActivationTime,a.ExpirDate from  EI_StudentInfo a ");
                    strSql.Append(" LEFT JOIN EI_GRelS b ON  a.MfgID=b.SID ");
                    strSql.Append(" LEFT JOIN EI_GroupInfo c on b.GID=c.ID ");
                    strSql.Append(" INNER JOIN EI_Dict d ON a.SType=d.Code AND d.Type='SType' ");
                    strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0 ");
                    break;
                case 0: //未分组groupID=0,

                    strSql.Append(" SELECT DISTINCT a.Name,d.Value STypeName,a.MfgID,a.ReamrkName,a.CreateTime,a.ActivationTime,a.ExpirDate from  EI_StudentInfo a ");
                    strSql.Append(" INNER JOIN EI_Dict d ON a.SType=d.Code AND d.Type='SType' ");
                    strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0  ");
                    strSql.Append(" AND a.MfgID NOT IN (select SID from EI_GRelS ) "); //分组过滤
                    break;
                case -2:// 未关联groupID=-2
                    strSql.Append(" SELECT DISTINCT a.Name,d.Value STypeName,a.MfgID,a.ReamrkName,a.CreateTime,a.ActivationTime,a.ExpirDate from  EI_StudentInfo a ");
                    strSql.Append(" LEFT JOIN EI_Dict d ON a.SType=d.Code AND d.Type='SType' ");
                    strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0  ");
                    strSql.Append("  AND a.MfgID NOT IN (select SID from EI_GRelS) AND MfgID not IN( select SID from EI_MRelS )"); //分组过滤 以及 学生老师关系过滤
                    // strSql.Append(" AND MfgID not IN( select SID from EI_MRelS )"); //学生老师关系过滤

                    break;

                case -3:// 关联groupID=-3(普通老师)
                    strSql.Append(" SELECT DISTINCT a.Name,d.Value STypeName,a.MfgID,a.ReamrkName,a.CreateTime,a.ActivationTime,a.ExpirDate from  EI_StudentInfo a ");
                    strSql.Append(" INNER JOIN EI_MRelS b ON a.MfgID=b.SID AND b.TID=@TID ");
                    strSql.Append(" LEFT JOIN EI_Dict d ON a.SType=d.Code AND d.Type='SType' ");
                    strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0  ");

                    break;

                default: // 分组
                    strSql.Append(" SELECT DISTINCT a.Name,d.Value STypeName,a.MfgID ,a.ReamrkName,a.CreateTime,a.ActivationTime,a.ExpirDate from  EI_StudentInfo a ");
                    strSql.Append(" INNER JOIN EI_GRelS b ON  a.MfgID=b.SID ");
                    strSql.Append(" INNER JOIN EI_GroupInfo c on b.GID=c.ID ");
                    strSql.Append(" INNER JOIN EI_Dict d ON a.SType=d.Code AND d.Type='SType' ");
                    strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0 AND  c.ID=@ID ");
                    dictionary.Add("ID", dic["groupID"]);
                    break;
            }

            if (dictionary.ContainsKey("stuName"))
            {
                dictionary["stuName"] = "%" + dictionary["stuName"] + "%";
                strSql.Append(" And a.Name like @stuName ");
            }

            if (dictionary.ContainsKey("CreateBy"))//添加创建者过滤
            {
                strSql.Append(" And a.CreateBy=@CreateBy ");
            }

            strSql.Append(" ORDER BY MfgID DESC ");


            var dataSet = _commonDal.GetDataSetBySqlAndDic(strSql.ToString(), dictionary);
            return ModelConvertHelper<StudentModel>.ConvertToModelList(dataSet.Tables[0]);

        }
        #endregion

        #region 根据魔方格ID获取该生分组

        /// <summary>
        /// 根据魔方格ID获取该生分组
        /// </summary>
        /// <param name="mfgID">魔方格id</param>
        /// <returns></returns>
        public List<StudentGroup> GetStudentGroupByMfgID(string mfgID)
        {
            var dataSet = _gRelSDal.GetStudentGroupByMfgID(mfgID);

            List<StudentGroup> studentGroupList = ModelConvertHelper<StudentGroup>.ConvertToModelList(dataSet.Tables[0]);
            return studentGroupList;
        }

        #endregion

        #region 根据机构ID获取未分组学生
        /// <summary>
        /// 根据机构ID获取未分组学生
        /// </summary>
        /// <param name="orgID"></param>
        /// <returns></returns>
        public List<EI_StudentInfo> GetStuNotInGroupByOrgID(int orgID)
        {
            var dataSet = _gRelSDal.GetStuNotInGroupByOrgID(orgID);
            return ModelConvertHelper<EI_StudentInfo>.ConvertToModelList(dataSet.Tables[0]);
        }
        #endregion

        #region 根据机构ID和分组ID获取不在该组的学生
        /// <summary>
        ///  根据机构ID和分组ID获取不在该组的学生
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="groupID"></param>
        /// <returns></returns>
        public List<EI_StudentInfo> GetStuNotInGroupByOrgIDAndGroupID(int orgID, int groupID, string createBy)
        {
            var dataSet = _gRelSDal.GetStuNotInGroupByOrgIDAndGroupID(orgID, groupID, createBy);
            return ModelConvertHelper<EI_StudentInfo>.ConvertToModelList(dataSet.Tables[0]);
        }
        #endregion


        #region 批量添加学生到分组
        /// <summary>
        ///  批量添加学生到分组
        /// </summary>
        /// <param name="mfgIDs">魔方格IDs</param>
        /// <param name="groupid">分组ID</param>
        /// <returns></returns>
        public int AddStu2Group(string mfgIDs, string groupid)
        {
            return _gRelSDal.AddStu2Group(mfgIDs, groupid);
        }

        #endregion

        #region 根据gID和sID删除一条数据(学生与分组)
        /// <summary>
        /// 根据gID和sID删除一条数据(学生与分组)
        /// </summary>
        /// <param name="gID">gID</param>
        /// <param name="sID">sID</param>
        /// <returns></returns>
        public bool DeleteByGIDAndSID(int gID, string sID)
        {
            return _gRelSDal.DeleteByGIDAndSID(gID, sID);
        }

        #endregion

        #region 根据魔方格ID获取为关联的分组
        /// <summary>
        ///  根据魔方格ID获取为关联的分组
        /// </summary>
        /// <param name="mfgIDs"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public List<StudentGroup> GetStuNotRelGroupByMfgID(string mfgIDs, string name, string createBy, int orgID)
        {
            var dataSet = _gRelSDal.GetStuNotRelGroupByMfgID(mfgIDs, name, createBy, orgID);

            return ModelConvertHelper<StudentGroup>.ConvertToModelList(dataSet.Tables[0]);


        }

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
        public string GetNotRelGroupTree(UserTypeEnum roleType, int userID, int orgID, string mfgIDs)
        {
            if (roleType == UserTypeEnum.VIPSuperManager || roleType == UserTypeEnum.SuperManager) //超级管理员
            {
                userID = 0;
            }
            else//管理员
            {
            }
            string notRelGroupSql = _gRelSDal.GetNotRelGroupSql(mfgIDs, orgID, userID);
            var gtreelist = _gRelMDal.GetNotRelGroupForTree(notRelGroupSql, orgID, userID);

            StringBuilder strTree = new StringBuilder();
            if (roleType == UserTypeEnum.VIPSuperManager || roleType == UserTypeEnum.SuperManager) //超级管理员
            {
                ProcessNotRelGroupTree(null, ref gtreelist, ref strTree);
            }
            else
            {
                ProcessNotRelGroupTree(gtreelist.FirstOrDefault(m => m.ID == userID && m.Level >= 0), ref gtreelist, ref strTree);
            }
            return strTree.ToString();
        }

        private void ProcessNotRelGroupTree(TeacherTreeModel tModel, ref List<TeacherTreeModel> list, ref StringBuilder sb)
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
                    ProcessNotRelGroupTree(gmodel, ref list, ref sb);
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
        #endregion



        #region 批量添加多个学生到多个组
        /// <summary>
        /// 
        /// </summary>
        /// <param name="mfgIDs">学生IDs</param>
        /// <param name="groupIDs">分组IDs</param>
        /// <returns></returns>
        public int AddStus2Groups(string mfgIDs, string groupIDs)
        {
            return _gRelSDal.AddStus2Groups(mfgIDs, groupIDs);
        }

        #endregion

        #region 根据魔方ID获取该生与老师的关联

        public List<EI_MRelS> GetSutRelTeacByMfgID(string mfgID)
        {
            var dataSet = _gRelSDal.GetSutRelTeacByMfgID(mfgID);

            List<EI_MRelS> ei_MRelSList = new List<EI_MRelS>();
            List<EI_MRelS> ei_MRelSList2 = new List<EI_MRelS>();
            ei_MRelSList = ModelConvertHelper<EI_MRelS>.ConvertToModelList(dataSet.Tables[0]);//通过分组关联
            ei_MRelSList2 = ModelConvertHelper<EI_MRelS>.ConvertToModelList(dataSet.Tables[1]);//老师和学生直接关联

            ei_MRelSList.AddRange(ei_MRelSList2);
            return ei_MRelSList2; //只取直接关联的
        }

        #endregion

        #region 根据sID和tID删除一条数据(学生与老师)
        /// <summary>
        /// 根据sID和tID删除一条数据(学生与老师)
        /// </summary>
        /// <param name="gID">gID</param>
        /// <param name="sID">sID</param>
        /// <returns></returns>
        public bool DeleteBySIDAndTID(string sID, string tID)
        {
            return _gRelSDal.DeleteBySIDAndTID(sID, tID);
        }

        #endregion

        #region 根据魔方格ID和机构ID获取未关联的老师
        /// <summary>
        /// 根据魔方格ID和机构ID获取未关联的老师
        /// </summary>
        /// <param name="mfgID">魔方格ID</param>
        /// <param name="orgID">机构ID</param>
        /// <param name="name">老师名字</param>
        /// <returns></returns>
        public List<EI_ManagerInfo> GetStuNotRelTeacByMfgIDAndOrgID(string mfgID, int orgID, string name, string createBy)
        {
            var dataSet = _gRelSDal.GetStuNotRelTeacByMfgIDAndOrgID(mfgID, orgID, name, createBy);
            return ModelConvertHelper<EI_ManagerInfo>.ConvertToModelList(dataSet.Tables[0]);
        }

        #endregion


        #region 获取学生未关联的老师列表
        /// <summary>
        /// 获取学生未关联的老师列表
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="tID"></param>
        /// <param name="mfgIDs"></param>
        /// <returns></returns>
        public List<EI_ManagerInfo> GetStuNotRelTeac(int orgID, int tID, string mfgIDs)
        {
            var dataSet = _gRelSDal.GetStuNotRelTeac(mfgIDs, orgID, tID);
            return ModelConvertHelper<EI_ManagerInfo>.ConvertToModelList(dataSet.Tables[0]);
        }

        #endregion

        #region 批量添加学生与老师的关联
        /// <summary>
        ///  批量添加学生与老师的关联
        /// </summary>
        /// <param name="mfgIDs">魔方格IDs</param>
        /// <param name="tIDs">老师IDs</param>
        /// <returns></returns>
        public int AddStuRelTeac(string mfgIDs, string tIDs)
        {
            return _gRelSDal.AddStuRelTeac(mfgIDs, tIDs);
        }

        #endregion

        #region 更新备注名
        /// <summary>
        /// 更新备注名
        /// </summary>
        /// <param name="mfgID">魔方格ID</param>
        /// <param name="reamrkName">备注名</param>
        /// <returns></returns>
        public bool UpdateReamrkName(string mfgID, string reamrkName)
        {
            return _studentInfoDal.UpdateReamrkName(mfgID, reamrkName);
        }
        #endregion

        #region 更新学生档案
        /// <summary>
        /// 更新学生档案
        /// </summary>
        /// <param name="ei_StudentInfo">学生信息</param>
        /// <param name="ei_familyList">家庭信息</param>
        /// <param name="ei_EnterScoreList">成绩</param>
        /// <returns></returns>
        public bool UpdateStudentArchives(EI_StudentInfo ei_StudentInfo, List<EI_FamilyInfo> ei_familyList, List<EI_EnterScore> ei_EnterScoreList)
        {

            string sex = ei_StudentInfo.Gender == 0 ? "男" : "女";
            string inclass = "";//年级
            int edu = 0;//学制
            int wl = 0;//文理

            switch (ei_StudentInfo.GradeID)
            {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                    inclass = "x" + ei_StudentInfo.GradeID.ToString();
                    //@*学制,0五四制，1六三制，2文科，3理科，4不分文理*@
                    if (ei_StudentInfo.AcaStru == 0)
                    {
                        edu = 1;
                    }
                    else
                    {
                        edu = 0;
                    }

                    wl = 0;

                    break;
                case 7:
                case 8:
                case 9:
                    inclass = "c" + (ei_StudentInfo.GradeID - 6).ToString();

                    if (ei_StudentInfo.AcaStru == 0)
                    {
                        edu = 1;
                    }
                    else
                    {
                        edu = 0;
                    }
                    wl = 0;

                    break;
                case 10:
                case 11:
                case 12:
                    inclass = "g" + (ei_StudentInfo.GradeID - 9).ToString();
                    edu = 0;

                    if (ei_StudentInfo.AcaStru == 2)//
                    {
                        wl = 1;//文科
                    }
                    else if (ei_StudentInfo.AcaStru == 3)
                    {
                        wl = 0;//理科
                    }
                    else
                    {
                        wl = 2;//不分文理
                    }

                    break;
            }
            int n = 0;
            try
            {
                //n = _mfgOutfitBll.UpdateUserInfo("user", Convert.ToInt32(ei_StudentInfo.MfgID), ei_StudentInfo.Name, sex, ei_StudentInfo.Phone, inclass, edu, -1, ei_StudentInfo.Shool, Convert.ToDateTime(ei_StudentInfo.BirthDate).ToString("yyyy-MM-dd"), ei_StudentInfo.QQ, ei_StudentInfo.Address, ei_StudentInfo.ImgUrl);

                n = _mfgOutfitBll.UpdateUserInfo("user", Convert.ToInt32(ei_StudentInfo.MfgID), ei_StudentInfo.Name, sex, ei_StudentInfo.Phone, inclass, edu, wl, -1, ei_StudentInfo.Shool, Convert.ToDateTime(ei_StudentInfo.BirthDate).ToString("yyyy-MM-dd"), ei_StudentInfo.QQ, ei_StudentInfo.Address, ei_StudentInfo.ImgUrl);

                if (n < 0)
                {

                    LogHelperNet.Error(string.Format("调用_mfgOutfitBll.UpdateUserInfo接口出错,参数为({0})", "user" + "|" + ei_StudentInfo.MfgID + "|" + ei_StudentInfo.Name + "|" + sex + "|" + ei_StudentInfo.Phone + "|" + inclass + "|" + edu.ToString() + "|" + "-1" + "|" + ei_StudentInfo.Shool + "|" + Convert.ToDateTime(ei_StudentInfo.BirthDate).ToString("yyyy-MM-dd") + "|" + ei_StudentInfo.QQ + "|" + ei_StudentInfo.Address + "|" + ei_StudentInfo.ImgUrl), null);
                    return false;
                }
            }
            catch (Exception ex)
            {

                LogHelperNet.Error(string.Format("调用_mfgOutfitBll.UpdateUserInfo接口出错,参数为({0})", "user" + "|" + ei_StudentInfo.MfgID + "|" + ei_StudentInfo.Name + "|" + sex + "|" + ei_StudentInfo.Phone + "|" + inclass + "|" + edu.ToString() + "|" + "-1" + "|" + ei_StudentInfo.Shool + "|" + Convert.ToDateTime(ei_StudentInfo.BirthDate).ToString("yyyy-MM-dd") + "|" + ei_StudentInfo.QQ + "|" + ei_StudentInfo.Address + "|" + ei_StudentInfo.ImgUrl), ex);
                return false;
            }

            if (n > 0)
            {

                return _studentInfoDal.UpdateStudentArchives(ei_StudentInfo, ei_familyList, ei_EnterScoreList);
            }

            return false;
        }
        #endregion

        #region 续费
        /// <summary>
        /// 续费(到期时间添加一年)
        /// </summary>
        /// <param name="mfgID">魔方格ID</param>
        /// <returns></returns>
        public bool UpdateExpirDate(string mfgID, string name, string createBy)
        {
            return _studentInfoDal.UpdateExpirDate(mfgID, name, createBy);
        }

        #endregion

        #region 重置密码
        /// <summary>
        /// 重置密码
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        public bool ResetPwr(string mfgID, string name, string createBy)
        {

            bool result = _mfgOutfitBll.ResetPassWord("user", Convert.ToInt32(mfgID), "000000") > 0;
            _studentInfoDal.ResetPwr(name, createBy);
            if (!result)
            {
                LogHelperNet.Error(string.Format("调用_mfgOutfitBll.ResetPassWord接口出错,参数为({0})", mfgID + "|000000"), null);
            }
            return result;

        }

        #endregion

        #region 修改年级
        /// <summary>
        /// 修改年级
        /// </summary>
        /// <param name="mfgID"></param>
        /// <param name="gradeID"></param>
        /// <returns></returns>
        public bool EditGrade(string mfgID, string gradeID)
        {
            // _mfgOutfitBll.BllUpdateBooks("user");

            return false;
        }

        #endregion

        #region 获取教材
        /// <summary>
        /// 获取教材
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        public Dictionary<string, string> GetMaterialsModel(string mfgID)
        {
            MaterialsModel materialsModel = new MaterialsModel();

            Dictionary<string, string> dic = null;
            try
            {

                dic = _mfgOutfitBll.BllMfgGetUserBookInfo("user", Convert.ToInt32(mfgID));


            }
            catch (Exception ex)
            {

                EI.Common.LogHelperNet.Error(string.Format("调用_mfgOutfitBll.BllMfgGetUserBookInfo接口出错,参数为({0})", mfgID), ex);
            }

            return dic;
        }


        #endregion


        #region 获取教材2微信
        /// <summary>
        /// 获取教材2微信
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        public List<int> GetMaterials2Weixin(string mfgID)
        {
            #region 根据学生年级，学制筛选科目
            var subjectIDList = new List<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
            var stu = GetStudentInfoModel(mfgID);
            if (stu == null)
            {
                LogHelperNet.Error("获取学生对象为空", null);
                return subjectIDList;
            }
            if (stu.GradeID != null && stu.GradeID > 0)
            {

                if (stu.GradeID <= 5)
                {
                    subjectIDList = new List<int>() { 1, 2, 3 };
                }
                else if (stu.GradeID == 6)
                {
                    if (stu.AcaStru != null && stu.AcaStru == 1)
                    {
                        subjectIDList = new List<int>() { 1, 2, 3 };
                    }

                }
            }
            return subjectIDList;
            #endregion

            #region 根据配置教材筛选科目

            //List<int> subjectIDList = new List<int>();
            //Mfg.EI.Common.LogHelperNet.Error("进入科目", null);
            //Dictionary<string, string> dic = GetMaterialsModel(mfgID);
            //Mfg.EI.Common.LogHelperNet.Error("科目查询:" + dic.Count, null);
            //if (dic != null)
            //{
            //    foreach (var item in dic)
            //    {
            //        if (!string.IsNullOrEmpty(item.Value))
            //        {
            //            subjectIDList.Add(Convert.ToInt32(item.Key.Substring(1)));
            //        }
            //    }
            //}
            //return subjectIDList; 

            #endregion
        }


        #endregion

        #region 修改教材
        public bool EditMaterials(MaterialsModel model)
        {
            int n = 0;
            try
            {
                //成功返回1，操作失败返回-1，用户不存在返回-2 今年修改的次数已达到六次 -3
                n = _mfgOutfitBll.BllUpdateBooks("user", model.Userid, model.Inclass, model.Term, model.Wl, model.Book01, model.Book02, model.Book03, model.Book04, model.Book05, model.Book06, model.Book07, model.Book08, model.Book09);
            }
            catch (Exception ex)
            {
                LogHelperNet.Error(string.Format("调用_mfgOutfitBll.BllUpdateBooks接口出错,参数为({0})", "user" + "|" + model.Userid + "|" + model.Inclass + "|" + model.Term + "|" + model.Wl + "|" + model.Book01 + "|" + model.Book02 + "|" + model.Book03 + "|" + model.Book04 + "|" + model.Book05 + "|" + model.Book06 + "|" + model.Book07 + "|" + model.Book08 + "|" + model.Book09), null);
                return false;
            }

            if (n == -3)
            {
                LogHelperNet.Error("调用_mfgOutfitBll.BllUpdateBooks,返回值为-3", null);
                return false;
            }
            if (n <= 0)
            {
                LogHelperNet.Error(string.Format("调用_mfgOutfitBll.BllUpdateBooks接口出错,参数为({0}),返回值为{1}", "user" + "|" + model.Userid + "|" + model.Inclass + "|" + model.Term + "|" + model.Wl + "|" + model.Book01 + "|" + model.Book02 + "|" + model.Book03 + "|" + model.Book04 + "|" + model.Book05 + "|" + model.Book06 + "|" + model.Book07 + "|" + model.Book08 + "|" + model.Book09, n), null);
                return false;
            }



            return true;
        }
        #endregion

        #region 修改密码
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="mfgID"></param>
        /// <param name="oldPwr"></param>
        /// <param name="newPwr"></param>
        /// <returns></returns>
        public bool EditPwr(string mfgID, string oldPwr, string newPwr)
        {
            bool result = _mfgOutfitBll.UpdatePassWord("user", Convert.ToInt32(mfgID), oldPwr, newPwr) > 0;
            if (!result)
            {
                LogHelperNet.Error(string.Format("调用_mfgOutfitBll.UpdatePassWord接口出错,参数为({0})", mfgID + "|" + oldPwr + "|" + newPwr), null);
            }
            return result;
        }

        #endregion

        #region 学生登录
        /// <summary>
        /// 登录 0用户名错误，1机构错误，2登录成功，3密码错误
        /// </summary>
        /// <param name="loginModel"></param>
        /// <returns></returns>
        public int StuLogin(ref LoginModel loginModel)
        {
            if (loginModel == null || string.IsNullOrEmpty(loginModel.LoginName))
            {
                return 0;
            }

            //是否是mfg账户
            var ismfgUser = _mfgOutfitBll.CheckPassWord("user", Convert.ToInt32(loginModel.LoginName), loginModel.Pwd) > 0;

            if (ismfgUser)
            {

                var stuModel = GetStudentInfoModel(loginModel.LoginName);

                if (stuModel == null)//魔方格接口存在着问题 或者 被冻结
                {
                    return -2;
                }

                if (stuModel.ExpirDate < DateTime.Now)//判断是否过期
                {
                    return -1;
                }

                if (stuModel.OrgID.Equals(loginModel.OrgID))
                {
                    loginModel.SType = stuModel.SType;
                    loginModel.UserName = stuModel.Name;
                    loginModel.FirstLogin = stuModel.FristLogin;
                    loginModel.GradeID = stuModel.GradeID == null ? 1 : stuModel.GradeID.Value;
                    //取大年级
                    loginModel.BGrade = getBgrade(stuModel.GradeID == null ? 1 : stuModel.GradeID.Value, stuModel.AcaStru == null ? 1 : stuModel.AcaStru.Value);
                    loginModel.IsActivate = (stuModel.ActivationTime.HasValue && stuModel.ActivationTime.Value.CompareTo(System.DateTime.Now) < 0);


                    if (loginModel.IsActivate && loginModel.FirstLogin == 1)
                    {
                        //已激活，且首次登陆，修改首次登录标识
                        _studentInfoDal.UpdateFirstLogin(stuModel.MfgID);
                    }

                    return 2;
                }
                else
                {
                    return 1;
                }


            }
            else
            {
                return 3;
            }
            //判断是否和该机构匹配

        }
        Func<int, int, string> getBgrade = (m, n) =>
        {
            if (m <= 5)
            {

                return "1";
            }
            else if (m == 6)
            {
                //0 五四，1 六三
                if (n == 0)
                {
                    return "2";
                }
                else
                {
                    return "1";
                }

            }
            else if (m <= 9 && m > 6)
            {
                return "2";
            }
            else if (m > 9)
            {
                return "3";
            }
            return "1";
        };

        #endregion

        #region 更改经验值
        /// <summary>
        /// 更改经验值
        /// </summary>
        /// <param name="sID">学生ID</param>
        /// <param name="experNumber">经验值</param>
        /// <returns>更改经验值的sql</returns>
        public string UpdateExperNumber(string sID, int experNumber)
        {
            return _studentInfoDal.UpdateExperNumber(sID, experNumber);

        }
        #endregion

        #region 获取等级名称(学霸一段....)
        /// <summary>
        /// 获取等级名称(学霸一段....)
        /// </summary>
        /// <param name="sID"></param>
        /// <returns></returns>
        public string GetLevelName(string sID)
        {
            string levelName = "学霸一段";
            try
            {
                var dataSet = _studentInfoDal.GetEI_Experience(sID);
                if (dataSet.Tables[0].Rows.Count > 0)
                {
                    levelName = dataSet.Tables[0].Rows[0]["LevelName"].ToString();
                }
            }
            catch (Exception ex)
            {
                LogHelperNet.Error("获取等级名称(学霸一段....)失败", ex);
            }

            return levelName;
        }

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
        public List<ImportAndExportStudent> GetStu(int currentPage, string starTime, string endTime, string createBy, out int count)
        {
            return _studentInfoDal.GetStu(currentPage, starTime, endTime, createBy, out count);
        }
        #endregion

        #region 导出ei_studentinfo

        /// <summary>
        ///  导出ei_studentinfo
        /// </summary>
        /// <param name="createBy"></param>
        /// <param name="starTime"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        public MemoryStream ExportStu(string createBy, string starTime, string endTime)
        {
            //"ExpirDate:结束时间",
            string[] fields = new string[] { "CreateTime:创建时间", "ActivationTime:开通时间", "Name:姓名", "Gender:性别", "BirthDate:出生日期", "GradeID:年级", "MfgID:帐号", "InitialPassword:初始密码", "SType:学生类型", "Phone:联系方式", "AcaStru:学制文理", "Address:家庭住址", "Shool:学校", "Class:班级", "ParentName:家长姓名", "ParentPhone:家长手机" };

            int count = 0;
            var modeList = _studentInfoDal.GetStu(0, starTime, endTime, createBy, out count);

            return ExcelHelper.ExportExcel<ImportAndExportStudent>(modeList, fields);
        }
        #endregion

        #region 获取excel内容
        /// <summary>
        ///  获取excel内容
        /// </summary>
        /// <param name="filepath"></param>
        /// <param name="orgType"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public List<ImportAndExportStudent> GetExcelData(string filepath, int orgType, out string message)
        {

            // var ds = ExcelHelper.GetExcelDataSource(filepath, "学生列表");
            //List<ImportAndExportStudent> ei_Studentlist = CheckExcelDate(ds.Tables[0], orgType, out  message);
            var ds = ExcelHelper.GetExcelDataSource(filepath, "学生列表", true);
            List<ImportAndExportStudent> ei_Studentlist = CheckExcelDate(ds, orgType, out  message);
            return ei_Studentlist;
        }

        #endregion

        #region 验证excel内容
        /// <summary>
        /// 验证excel内容
        /// </summary>
        /// <param name="dt"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        private List<ImportAndExportStudent> CheckExcelDate(DataTable dt, int orgType, out string message)
        {
            SqlChecker SqlChecker = new SqlChecker();

            List<ImportAndExportStudent> modelList = new List<ImportAndExportStudent>();

            string message1 = null;
            string message2 = null;
            string message3 = null;
            int n = 3;

            dt.Rows.RemoveAt(0);
            foreach (DataRow dr in dt.Rows)
            {
                //出错位置：A3，姓名错误

                ImportAndExportStudent model = new ImportAndExportStudent();
                model.IsPass = 1;

                #region 姓名（必填） A
                string name = dr["DataNameField"] == null ? "" : dr["DataNameField"].ToString().Trim();
                if (string.IsNullOrEmpty(name))
                {
                    model.IsPass = 0;
                    message3 = message3 ?? "<p>您上传的文档中信息不完整，请确认后，重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：A" + n + "，姓名错误</p>";

                }
                else if (SqlChecker.CheckKeyWord(name))
                {
                    model.IsPass = 0;
                    message2 = message2 ?? "<p>您上传的文档存在非法字符，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：A" + n + "，姓名错误</p>";
                }
                model.Name = name;

                #endregion

                #region 性别（必填 ：男或者女） B
                string gender = dr["DataGenderField"] == null ? "" : dr["DataGenderField"].ToString().Trim();

                switch (gender)//性别，0男,1女
                {
                    case "":
                        model.IsPass = 0;
                        message3 = message3 ?? "<p>您上传的文档中信息不完整，请确认后，重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：B" + n + "，性别错误</p>";
                        break;
                    case "男":
                    case "女":
                        break;
                    default: //格式不对
                        model.IsPass = 0;
                        message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：B" + n + "，性别错误</p>";
                        break;
                }
                model.Gender = gender;


                #endregion

                #region 出生年月  C
                string birthDate = dr["DataBirthDateField"] == null ? "" : dr["DataBirthDateField"].ToString().Trim();
                DateTime dateTime;
                try
                {
                    if (!string.IsNullOrEmpty(birthDate))
                    {
                        var date = Convert.ToDateTime(birthDate);
                        if (date > DateTime.Now)
                        {
                            model.IsPass = 0;
                            message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：C" + n + "，出生年月错误</p>";
                        }
                    }
                    else
                    {

                    }
                }
                catch (Exception ex)//格式不对
                {
                    model.IsPass = 0;
                    message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：C" + n + "，出生年月错误</p>";
                }

                model.BirthDate = birthDate;

                #endregion

                #region 年级（必填 ：一年级~九年级；高一~高三）  D
                string gradeID = dr["DataGradeIDField"] == null ? "" : dr["DataGradeIDField"].ToString().Trim();
                int grade = 0;

                switch (gradeID)
                {
                    case "":
                        model.IsPass = 0;
                        message3 = message3 ?? "<p>您上传的文档中信息不完整，请确认后，重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：D" + n + "，年级错误</p>";
                        break;
                    case "一年级":
                        grade = 1;
                        break;
                    case "二年级":
                        grade = 2;
                        break;
                    case "三年级":
                        grade = 3;
                        break;
                    case "四年级":
                        grade = 4;
                        break;
                    case "五年级":
                        grade = 5;
                        break;
                    case "六年级":
                        grade = 6;
                        break;
                    case "七年级":
                        grade = 7;
                        break;
                    case "八年级":
                        grade = 8;
                        break;
                    case "九年级":
                        grade = 9;
                        break;
                    case "高一":
                        grade = 10;
                        break;
                    case "高二":
                        grade = 11;
                        break;
                    case "高三":
                        grade = 12;
                        break;
                    default: //格式不对
                        model.IsPass = 0;
                        message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：D" + n + "，年级错误</p>";
                        break;
                }
                model.GradeID = gradeID;

                #endregion

                #region VIP类型（必填 ：普通版，VIP标准版，VIP白金版，VIP钻石版）  F
                string sType = dr["DataSTypeField"] == null ? "" : dr["DataSTypeField"].ToString().Trim();

                switch (sType)//学生类型，0普通，1VIP标准，2VIP白金，3VIP钻石     
                {
                    case "":
                        model.IsPass = 0;
                        message3 = message3 ?? "<p>您上传的文档中信息不完整，请确认后，重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：F" + n + "，VIP类型错误</p>";
                        break;
                    case "普通版":
                        if (orgType != 0)// 普通版
                        {
                            model.IsPass = 0;
                            message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：F" + n + "，VIP类型错误</p>";
                        }

                        break;
                    case "VIP标准版":
                    case "VIP白金版":
                    case "VIP钻石版":
                        if (orgType != 1)//Vip机构
                        {
                            model.IsPass = 0;
                            message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：F" + n + "，VIP类型错误</p>";
                        }


                        break;

                    default: //格式不对
                        model.IsPass = 0;
                        message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：F" + n + "，VIP类型错误</p>";
                        break;
                }
                model.SType = sType;

                #endregion

                #region 联系方式（必填）  G
                string phone = dr["DataPhoneField"] == null ? "" : dr["DataPhoneField"].ToString().Trim();

                Regex reg = new Regex(@"^(?:13\d|17\d|15\d|18\d)\d{5}(\d{3}|\*{3})$");

                if (string.IsNullOrEmpty(phone))
                {
                    model.IsPass = 0;
                    message3 = message3 ?? "<p>您上传的文档中信息不完整，请确认后，重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：G" + n + "，手机号错误</p>";
                }
                else if (reg.IsMatch(phone))
                {

                }
                else
                {
                    model.IsPass = 0;
                    message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：G" + n + "，手机号错误</p>";
                }
                model.Phone = phone;
                #endregion

                #region 学制（必填 ： 五四制，六三制，文科，理科，不分文理）  H
                string acaStru = dr["DataAcaStruField"] == null ? "" : dr["DataAcaStruField"].ToString().Trim();
                switch (acaStru)//学制,0五四制，1六三制，2文科，3理科，4不分文理 
                {
                    case "":
                        model.IsPass = 0;
                        message3 = message3 ?? "<p>您上传的文档中信息不完整，请确认后，重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：H" + n + "，学制文理错误</p>";
                        break;
                    case "五四制":
                    case "六三制":

                        if (0 < grade && grade <= 9)
                        {

                        }
                        else
                        {
                            model.IsPass = 0;
                            message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：H" + n + "，学制文理错误</p>";
                        }

                        break;

                    case "文科":
                    case "理科":
                    case "不分文理":
                        if (9 < grade && grade <= 12)
                        {
                        }
                        else
                        {
                            model.IsPass = 0;
                            message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：H" + n + "，学制文理错误</p>";
                        }
                        break;

                    default: //格式不对
                        model.IsPass = 0;
                        message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：H" + n + "，学制文理错误</p>";
                        break;
                }
                model.AcaStru = acaStru;

                #endregion

                #region 家庭住址(必填)  I
                string address = dr["DataAddressField"] == null ? "" : dr["DataAddressField"].ToString().Trim();

                if (string.IsNullOrEmpty(address))
                {
                    model.IsPass = 0;
                    message3 = message3 ?? "<p>您上传的文档中信息不完整，请确认后，重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：I" + n + "，家庭住址错误</p>";
                }
                else if (SqlChecker.CheckKeyWord(address))
                {
                    model.IsPass = 0;
                    message2 = message2 ?? "<p>您上传的文档存在非法字符，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：I" + n + "，家庭住址错误</p>";
                }
                else if (address.Length > 100)
                {
                    model.IsPass = 0;
                    message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：I" + n + "，家庭住址错误</p>";
                }
                model.Address = address;


                #endregion

                #region 学校  J
                string shool = dr["DataShoolField"] == null ? "" : dr["DataShoolField"].ToString().Trim();


                if (SqlChecker.CheckKeyWord(shool))
                {
                    model.IsPass = 0;
                    message2 = message2 ?? "<p>您上传的文档存在非法字符，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：J" + n + "，学校错误</p>";
                }
                model.Shool = shool;

                #endregion

                #region 班级  K
                string className = dr["DataClassField"] == null ? "" : dr["DataClassField"].ToString().Trim();
                if (SqlChecker.CheckKeyWord(className))
                {
                    model.IsPass = 0;
                    message2 = message2 ?? "<p>您上传的文档存在非法字符，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：K" + n + "，班级错误</p>";
                }
                model.Class = className;
                #endregion

                #region 家长姓名（必填） L
                string parentName = dr["DataParentNameField"] == null ? "" : dr["DataParentNameField"].ToString().Trim();
                if (string.IsNullOrEmpty(parentName))
                {
                    model.IsPass = 0;
                    message3 = message3 ?? "<p>您上传的文档中信息不完整，请确认后，重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：L" + n + "，家长姓名错误</p>";

                }
                else if (SqlChecker.CheckKeyWord(parentName))
                {
                    model.IsPass = 0;
                    message2 = message2 ?? "<p>您上传的文档存在非法字符，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：L" + n + "，家长姓名错误</p>";
                }
                model.ParentName = parentName;

                #endregion

                #region 家长手机（必填）  M
                string parentPhone = dr["DataParentPhoneField"] == null ? "" : dr["DataParentPhoneField"].ToString().Trim();

                //Regex reg = new Regex(@"^(?:13\d|17\d|15\d|18\d)\d{5}(\d{3}|\*{3})$");

                if (string.IsNullOrEmpty(parentPhone))
                {
                    model.IsPass = 0;
                    message3 = message3 ?? "<p>您上传的文档中信息不完整，请确认后，重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：M" + n + "，手机号错误</p>";
                }
                else if (reg.IsMatch(parentPhone))
                {

                }
                else
                {
                    model.IsPass = 0;
                    message1 = message1 ?? "<p>您上传的文档格式不正确，请重新上传！</p><br/> <p style='color: red;text-align:center'>出错位置：M" + n + "，手机号错误</p>";
                }
                model.ParentPhone = parentPhone;
                #endregion


                modelList.Add(model);

                n++;
            }


            message = (message1 ?? (message2 ?? message3));

            return modelList;

        }
        #endregion

        #region 批量创建学生
        /// <summary>
        /// 批量创建学生
        /// </summary>
        /// <param name="modeList"></param>
        /// <param name="createBy"></param>
        /// <param name="orgID"></param>
        /// <returns></returns>
        public List<ImportAndExportStudent> BatchAddStu(List<ImportAndExportStudent> modeList, string createBy, int orgID)
        {
            List<ImportAndExportStudent> batchAddStu = new List<ImportAndExportStudent>();
            string mfgID = "";
            bool isSuccess = false;

            foreach (var model in modeList)
            {

                var datetime = DateTime.Now;

                if (model.IsPass == 0)
                {
                    model.CreateTime = datetime.ToString("yyyy-MM-dd");
                    model.ActivationTime = "------";
                    model.ExpirDate = "------";
                    model.InitialPassword = "------";
                    batchAddStu.Add(model);
                    continue;
                }

                mfgID = "";

                EI_StudentInfo ei_StudentInfo = new EI_StudentInfo();
                ei_StudentInfo.Gender = model.Gender == "男" ? 0 : 1;


                //ei_StudentInfo.GradeID = Convert.ToInt32(model.GradeID);
                #region 年级
                switch (string.IsNullOrEmpty(model.GradeID) ? "" : model.GradeID)
                {
                    case "":
                        ei_StudentInfo.GradeID = 0;
                        break;
                    case "一年级":
                        ei_StudentInfo.GradeID = 1;
                        break;
                    case "二年级":
                        ei_StudentInfo.GradeID = 2;
                        break;
                    case "三年级":
                        ei_StudentInfo.GradeID = 3;
                        break;
                    case "四年级":
                        ei_StudentInfo.GradeID = 4;
                        break;
                    case "五年级":
                        ei_StudentInfo.GradeID = 5;
                        break;
                    case "六年级":
                        ei_StudentInfo.GradeID = 6;
                        break;
                    case "七年级":
                        ei_StudentInfo.GradeID = 7;
                        break;
                    case "八年级":
                        ei_StudentInfo.GradeID = 8;
                        break;
                    case "九年级":
                        ei_StudentInfo.GradeID = 9;
                        break;
                    case "高一":
                        ei_StudentInfo.GradeID = 10;
                        break;
                    case "高二":
                        ei_StudentInfo.GradeID = 11;
                        break;
                    case "高三":
                        ei_StudentInfo.GradeID = 12;
                        break;
                    default: //格式不对
                        ei_StudentInfo.GradeID = 0;
                        break;
                }
                #endregion


                #region 学制
                switch (model.AcaStru)//学制,0五四制，1六三制，2文科，3理科，4不分文理 
                {
                    case "五四制":
                        ei_StudentInfo.AcaStru = 0;
                        break;
                    case "六三制":
                        ei_StudentInfo.AcaStru = 1;
                        break;
                    case "文科":
                        ei_StudentInfo.AcaStru = 2;
                        break;
                    case "理科":
                        ei_StudentInfo.AcaStru = 3;
                        break;
                    case "不分文理":
                        ei_StudentInfo.AcaStru = 4;
                        break;
                }
                #endregion


                #region 类型
                switch (model.SType)//0普通版，1VIP标准版，2VIP白金版，3VIP钻石版
                {
                    case "普通版":
                        ei_StudentInfo.SType = 0;
                        break;
                    case "VIP标准版":
                        ei_StudentInfo.SType = 1;
                        break;
                    case "VIP白金版":
                        ei_StudentInfo.SType = 2;
                        break;
                    case "VIP钻石版":
                        ei_StudentInfo.SType = 3;
                        break;
                }
                #endregion

                ei_StudentInfo.Name = model.Name;

                ei_StudentInfo.Phone = model.Phone;
                ei_StudentInfo.ImgUrl = "";


                ei_StudentInfo.CreateTime = datetime;
                ei_StudentInfo.ActivationTime = datetime;
                ei_StudentInfo.ExpirDate = datetime.AddYears(1);
                ei_StudentInfo.DelFlag = 0;
                ei_StudentInfo.CreateBy = createBy;
                ei_StudentInfo.OrgID = orgID;

                #region MyRegion
                ei_StudentInfo.Shool = model.Shool;
                ei_StudentInfo.Class = model.Class;
                ei_StudentInfo.Address = model.Address;
                if (!string.IsNullOrEmpty(model.BirthDate))
                {
                    ei_StudentInfo.BirthDate = Convert.ToDateTime(model.BirthDate);
                }
                #endregion


                ei_StudentInfo.InitialPassword = "000000";

                isSuccess = Add(ei_StudentInfo, out mfgID);

                if (isSuccess)
                {
                    model.IsPass = 1;
                    model.MfgID = mfgID;
                    model.CreateTime = datetime.ToString("yyyy-MM-dd");
                    model.ActivationTime = datetime.ToString("yyyy-MM-dd");
                    model.ExpirDate = datetime.AddYears(1).ToString("yyyy-MM-dd");
                    model.InitialPassword = "------";
                }
                else
                {
                    model.IsPass = 0;
                    model.CreateTime = datetime.ToString("yyyy-MM-dd");
                    model.ActivationTime = "------";
                    model.ExpirDate = "------";
                    model.InitialPassword = "------";
                }

                batchAddStu.Add(model);

            }

            Task.Factory.StartNew(() =>
            {
                //异步写入异常表
                _studentInfoDal.BatchAddStuAbnormal(batchAddStu, createBy, orgID);
                //异步写入家庭信息表
                new FamilyInfoDal().BatchAdd(batchAddStu);
            });

            return batchAddStu;
        }


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
        public List<ImportAndExportStudent> GetStuAbnormal(int currentPage, string starTime, string endTime, string createBy, out int count)
        {
            return _studentInfoDal.GetStuAbnormal(currentPage, starTime, endTime, createBy, out count);
        }
        #endregion

        #region 导出异常汇总

        /// <summary>
        /// 导出创建异常汇总
        /// </summary>
        /// <param name="modeList"></param>
        /// <param name="createBy"></param>
        /// <param name="starTime"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        public MemoryStream ExportStuAbnormal(List<ImportAndExportStudent> modeList, string createBy, string starTime, string endTime)
        {


            string[] fields;


            if (modeList == null)
            {
                fields = new string[] { "CreateTime:创建异常时间", "Name:姓名", "Gender:性别", "BirthDate:出生日期", "GradeID:年级", "MfgID:帐号", "InitialPassword:初始密码", "SType:学生类型", "Phone:联系方式", "AcaStru:学制文理", "Address:家庭住址", "Shool:学校", "Class:班级", "ParentName:家长姓名", "ParentPhone:家长手机" };
                // ExcelHelper.ExportExcel();
                int count = 0;
                modeList = _studentInfoDal.GetStuAbnormal(0, starTime, endTime, createBy, out count);
            }
            else
            {
                if (modeList.Where(m => m.IsPass == 0).Count() > 0) //部分成功 部分失败
                {
                    fields = new string[] { "CreateTime:创建或异常时间", "ActivationTime:开通时间", "ExpirDate:结束时间", "Name:姓名", "Gender:性别", "BirthDate:出生日期", "GradeID:年级", "MfgID:帐号", "InitialPassword:初始密码", "SType:学生类型", "Phone:联系方式", "AcaStru:学制文理", "Address:家庭住址", "Shool:学校", "Class:班级", "ParentName:家长姓名", "ParentPhone:家长手机" };
                }
                else
                {
                    fields = new string[] { "CreateTime:创建时间", "ActivationTime:开通时间", "ExpirDate:结束时间", "Name:姓名", "Gender:性别", "BirthDate:出生日期", "GradeID:年级", "MfgID:帐号", "InitialPassword:初始密码", "SType:学生类型", "Phone:联系方式", "AcaStru:学制文理", "Address:家庭住址", "Shool:学校", "Class:班级", "ParentName:家长姓名", "ParentPhone:家长手机" };
                }



            }

            return ExcelHelper.ExportExcel<ImportAndExportStudent>(modeList, fields);
        }
        #endregion

        #region 删除异常汇总
        /// <summary>
        /// 删除异常汇总
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public bool DeleteStuAbnormal(string IDs)
        {
            return _studentInfoDal.DeleteStuAbnormal(IDs) > 0;
        }

        #endregion

        #region 批量预先创建用户
        /// <summary>
        /// 批量预先创建用户
        /// </summary>
        /// <param name="model"></param>
        /// <param name="count"></param>
        /// <returns></returns>
        public int BatchAddStu(EI_StudentInfo model, int count)
        {
            //Guid.NewGuid().ToString().Replace("-", "").ToLower().Substring(0, 6)
            int successNum = 0;
            string mfgID;
            for (int i = 0; i < count; i++)
            {
                EI_StudentInfo studentInfo = new EI_StudentInfo()
                {
                    Name = model.Name,
                    Gender = model.Gender,
                    Phone = model.Phone,
                    GradeID = model.GradeID,
                    AcaStru = model.AcaStru,
                    SType = model.SType,
                    OrgID = model.OrgID,

                    ImgUrl = model.ImgUrl,
                    CreateTime = model.CreateTime,
                    ActivationTime = model.ActivationTime,
                    ExpirDate = model.ExpirDate,
                    DelFlag = model.DelFlag,
                    CreateBy = model.CreateBy,
                    InitialPassword = Guid.NewGuid().ToString().Replace("-", "").ToLower().Substring(0, 6)
                };

                bool isSuccess = Add(studentInfo, out mfgID);
                if (isSuccess)
                {
                    successNum++;
                }
            }
            return successNum;
        }


        #endregion

        #region 更新激活时间首次登录标识
        /// <summary>
        /// 更新激活时间首次登录标识
        /// </summary>
        /// <param name="mfgID"></param>
        public void UpdateActivationTimeFirstLogin(string mfgID)
        {
            Task.Factory.StartNew(() =>
            {
                _studentInfoDal.UpdateActivationTimeFirstLogin(mfgID);
            });
        }
        #endregion



        public List<AnnouncementModel> GetAnnouncement(EI_StudentInfo dto)
        {
            return _studentInfoDal.GetAnnouncement(dto);
        }


        public AnnouncementModel GetFirstAnnouncement(AnnouncementModel p)
        {
            return _studentInfoDal.GetFirstAnnouncement(p);
        }


        public List<StuDiaryModel> GetStudentDiaryList(EI_Base<EI_StuDiary> para)
        {
            return _studentInfoDal.GetStudentDiaryList(para);
        }


        public List<StuDiaryModel> GetStudentDiaryDetails(EI_Base<EI_StuDiary> para)
        {
            return _studentInfoDal.GetStudentDiaryDetails(para);
        }


        public StuInitModel GetInitData(EI_Base<EI_StuDiary> dto)
        {
            return _studentInfoDal.GetInitData(dto);
        }


        public StudentExperienceModel GetStudentData(EI_Base<EI_StuDiary> para)
        {
            return _studentInfoDal.GetStudentData(para);
        }

        /// <summary>
        /// 添加经验值
        /// </summary>
        public bool AddEI_Experience(EI_StudentInfo dto)
        {
            return _studentInfoDal.AddEI_Experience(dto);
        }




        /// <summary>
        /// 学霸日记
        /// </summary>
        /// <param name="SID">学生ID</param>
        /// <param name="DiaryType">类型:0代表同步学习；1代表弱项提分；2电子作业；3在线考试 4错题重练  </param>
        /// <param name="DiaryName">类型0和1时为知识点名称，类型2为作业名称，类型3时为考试名称；类型4为空</param>
        /// <param name="FormatStr">类型0、1和4时为科目名称，类型2和3为教师名称；</param>
        /// <param name="TotalNum">类型0、1和4为总题数;类型为2和3为总分数；</param>
        /// <param name="RightNum">类型0、1和4为答对多少题；类型为2和3为成绩</param>
        /// <param name="SourceID">类型0、1为知识点ID；类型2为作业ID；类型3为考试ID；类型4为空</param>
        /// <returns>
        /// </returns>
        public string SaveDiary(string SID, byte DiaryType, string DiaryName, string FormatStr, int TotalNum, int RightNum, string SourceID)
        {
            return _studentInfoDal.SaveDiary(SID, DiaryType, DiaryName, FormatStr, TotalNum, RightNum.ToString(), SourceID);
        }

        #region  学生知识测评分析
        /// <summary>
        ///  获取基本知识测评基本模型
        /// </summary>
        /// <param name="MFGID"></param>
        /// <returns></returns>
        public List<BaseAnalyzeModel> GetAnalyzeModelList(BaseAnalyzeModel basemodel)
        {
            return _knowQuesDal.GetBaseAnalyzeModelList(basemodel);
        }
        #endregion


        public EI_StudentInfo GetSingleUser(EI_StudentInfo dto)
        {
            return _studentInfoDal.GetSingleUser(dto);
        }



        /// <summary>
        /// 根据mfgID获取实体
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        public StudentInfo GetStudentInfo(string mfgID, string name)
        {
            var model = _studentInfoDal.GetModel(mfgID, name);
            if (model != null)
            {
                StudentInfo info = new StudentInfo()
                {
                    Mfgid = model.MfgID,

                };
                return info;
            }
            else
            {
                return null;
            }
        }
        public StudentInfo GetStudentInfo(string WeiXin)
        {
            var model = _studentInfoDal.GetModel(WeiXin);
            if (model != null)
            {
                StudentInfo info = new StudentInfo()
                {
                    Mfgid = model.MfgID
                };
                return info;
            }
            else
            {
                return null;
            }
        }

    }
}
