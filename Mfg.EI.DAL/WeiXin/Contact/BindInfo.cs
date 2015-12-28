using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Mfg.EI.DBHelper;
using MySql.Data.MySqlClient;
using MySql.Data;
using System.Data;
using Mfg.EI.ViewModel;
using Mfg.EI.Entity;
namespace Mfg.EI.DAL.WeiXin.Contact
{
    public class BindInfo
    {
        #region 绑定学生信息
        /// <summary>
        /// 查询家长绑定信息
        /// </summary>
        /// <returns></returns>
        public DataSet GetBindInfo(string WeiXin, string AppId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select a.name as StuName,a.mfgid as StuAccount,b.name as ParentName,b.Phone as ParentPhone  from ei_studentinfo as a ");
            strSql.Append(" inner join ei_familyinfo b ");
            strSql.Append(" on a.mfgid=b.sid ");
            strSql.Append(" inner join ei_org c ");
            strSql.Append(" on a.orgid=c.id");
            strSql.Append(" where b.weixin=@WeiXin");
            strSql.Append(" and  c.weixin=@AppId");
            strSql.Append(" order by b.CreateTime desc ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@WeiXin", MySqlDbType.VarChar,50),
                new MySqlParameter("@AppId", MySqlDbType.VarChar,50),
                                         };
            parameters[0].Value = WeiXin;
            parameters[1].Value = AppId;
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        #region 20150826
        /// <summary>
        /// 判断家长微信是否绑定
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        public bool IsBind(string WeiXin)
        {
            if (string.IsNullOrEmpty(WeiXin)) return false;
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_FamilyInfo a ");
            strSql.Append(" where a.weixin=@WeiXin ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@WeiXin", MySqlDbType.VarChar,200)
                                         };
            parameters[0].Value = WeiXin;
            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }
        #endregion
        /// <summary>
        /// 判断家长微信是否绑定
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        public bool IsBind(string WeiXin, string AppId)
        {
            if (string.IsNullOrEmpty(WeiXin)) return false;
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_FamilyInfo a ");
            strSql.Append(" INNER JOIN ei_studentinfo b ");
            strSql.Append(" on a.SID=b.MfgID  ");
            strSql.Append(" INNER JOIN ei_org c ");
            strSql.Append(" on b.OrgID=c.ID  ");
            strSql.Append(" where a.weixin=@WeiXin ");
            strSql.Append(" and c.weixin=@AppId ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@WeiXin", MySqlDbType.VarChar,200),
                new MySqlParameter("@AppId", MySqlDbType.VarChar,200)
                                         };
            parameters[0].Value = WeiXin;
            parameters[1].Value = AppId;
            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 判断家长微信是否绑定
        /// </summary>
        /// <param name="WeiXin"></param>
        /// <returns></returns>
        public bool IsBind(string WeiXin, string MfgID, string Name)
        {
            if (string.IsNullOrEmpty(WeiXin)) return false;
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_FamilyInfo a ");
            strSql.Append(" inner join ei_studentinfo b ");
            strSql.Append(" on a.sid=b.mfgid ");
            strSql.Append(" where a.weixin=@WeiXin");
            strSql.Append(" and b.mfgid=@MfgID ");
            strSql.Append(" and b.Name=@Name ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@WeiXin", MySqlDbType.VarChar,200),
                new MySqlParameter("@MfgID", MySqlDbType.VarChar,200),
                new MySqlParameter("@Name", MySqlDbType.VarChar,200)
                                         };
            parameters[0].Value = WeiXin;
            parameters[1].Value = MfgID;
            parameters[2].Value = Name;
            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public bool ParentExists(string Pname, string Phone, string SID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_FamilyInfo ");
            strSql.Append(" where Name=@Pname ");
            strSql.Append(" and Phone=@Phone ");
            strSql.Append(" and SID=@SID ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@Pname", MySqlDbType.VarChar,50),
                 new MySqlParameter("@Phone", MySqlDbType.VarChar,50),
                 new MySqlParameter("@SID", MySqlDbType.VarChar,50),
                                         };
            parameters[0].Value = Pname;
            parameters[1].Value = Phone;
            parameters[2].Value = SID;
            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }
        public DataSet QueryFid(string Pname, string Phone)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID from EI_FamilyInfo ");
            strSql.Append(" where Name=@Pname ");
            strSql.Append(" and Phone=@Phone ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@Pname", MySqlDbType.VarChar,50),
                 new MySqlParameter("@Phone", MySqlDbType.VarChar,50)
                                         };
            parameters[0].Value = Pname;
            parameters[1].Value = Phone;
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_FamilyInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_FamilyInfo(");
            strSql.Append("SID,Relationship,Name,Company,Phone,CreateTime,DelFlag,Remark,WeiXin)");
            strSql.Append(" values (");
            strSql.Append("@SID,@Relationship,@Name,@Company,@Phone,@CreateTime,@DelFlag,@Remark,@WeiXin)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
					new MySqlParameter("@Relationship", MySqlDbType.VarChar,20),
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@Company", MySqlDbType.VarChar,50),
					new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
                    new MySqlParameter("@WeiXin", MySqlDbType.VarChar,50),
                                          };
            parameters[0].Value = model.SID;
            parameters[1].Value = model.Relationship;
            parameters[2].Value = model.Name;
            parameters[3].Value = model.Company;
            parameters[4].Value = model.Phone;
            parameters[5].Value = model.CreateTime;
            parameters[6].Value = model.DelFlag;
            parameters[7].Value = model.Remark;
            parameters[8].Value = model.WeiXin;
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 更新家长信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateParentInfo(EI_FamilyInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_FamilyInfo set ");
            strSql.Append(" Name=@Name,");
            strSql.Append(" Phone=@Phone, ");
            strSql.Append(" WeiXin=@WeiXin, ");
            strSql.Append(" CreateTime=@CreateTime, ");
            strSql.Append(" SID=@SID ");
            strSql.Append(" where WeiXin=@WeiXin");
      
            MySqlParameter[] parameters = {
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
					new MySqlParameter("@WeiXin", MySqlDbType.VarChar,50),
                    new MySqlParameter("@CreateTime", MySqlDbType.Datetime,50),
                    new MySqlParameter("@SID", MySqlDbType.VarChar,50)
                                          };
            parameters[0].Value = model.Name;
            parameters[1].Value = model.Phone;
            parameters[2].Value = model.WeiXin;
            parameters[3].Value = model.CreateTime;
            parameters[4].Value = model.SID;
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        public bool UpdateParentInfo(string Phone, string Name, string WeiXin, int Fid, DateTime CreateTime)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" update EI_FamilyInfo set ");
            strSql.Append(" WeiXin='' ");
            strSql.Append(" where WeiXin=@WeiXin; ");
            strSql.Append(" update EI_FamilyInfo set ");
            strSql.Append(" Name=@Name,");
            strSql.Append(" Phone=@Phone, ");
            strSql.Append(" WeiXin=@WeiXin, ");
            strSql.Append(" CreateTime=@CreateTime ");
            strSql.Append(" where ID=@Fid");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
                    new MySqlParameter("@WeiXin", MySqlDbType.VarChar,50),
					new MySqlParameter("@Fid", MySqlDbType.Int32),
                    new MySqlParameter("@CreateTime", MySqlDbType.Datetime)
                                          };
            parameters[0].Value = Name;
            parameters[1].Value = Phone;
            parameters[2].Value = WeiXin;
            parameters[3].Value = Fid;
            parameters[4].Value = CreateTime;
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 提交家长信息
        /// </summary>
        /// <param name="model"></param>
        /// <param name="MfgID"></param>
        /// <returns></returns>
        public bool SubmitParentInfo(FamilyInfoModel model)
        {
            bool result = true;
            EI_FamilyInfo info = new EI_FamilyInfo()
            {
                ID = model.ID,
                WeiXin = model.WeiXin,
                SID = model.SID,
                Phone = model.Phone,
                Name = model.Name,
                CreateTime = System.DateTime.Now,
                DelFlag = 0,
            };

            //判断当前微信号是否已经被绑定,如果绑定则更新该条信息，如果未绑定则插入新数据
            if (IsBind(model.WeiXin))
            {
                result = UpdateParentInfo(info);
            }
            else
            {
                //判断当前学生权限，是否支持微信功能
                var allowWexin = AllowBind(model.SID);
                if (allowWexin)
                {
                    result = Add(info);
                }
                else
                {
                    result = false;
                }

            }

           
            
            return result;







            #region 之前代码

            //switch (IsBind(model.WeiXin,model.SID,model.Name))
            //{
            //    case true:
            //        //如果绑定更新家长信息
            //        if (!UpdateParentInfo(info))
            //        {
            //            result = false;
            //        }
            //        break;
            //    case false:
            //        if (AllowBind(model.SID))
            //        {
            //            if (!ParentExists(model.Name, model.Phone,model.SID))
            //            {
            //                if (!Add(info))
            //                {
            //                    result = false;
            //                }
            //            }
            //            else
            //            {
            //                if (!UpdateParentInfo(model.Phone, model.Name, model.WeiXin, Convert.ToInt32(QueryFid(model.Name, model.Phone).Tables[0].Rows[0][0]),DateTime.Now))
            //                {
            //                    result = false;
            //                }
            //            }
            //        }
            //        else
            //        {
            //            result = false;
            //        }
            //        break;
            //}
            //return result; 

            #endregion
        }
        /// <summary>
        /// 查询学生类型
        /// </summary>
        /// <param name="MfgId"></param>
        /// <returns></returns>
        public bool AllowBind(string MfgId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from ei_studentinfo a ");
            strSql.Append(" inner join ei_org b");
            strSql.Append(" on a.OrgID=b.ID ");
            strSql.Append(" where a.MfgID=@MfgId ");
            strSql.Append(" and  SType>1 ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@MfgId", MySqlDbType.VarChar,50)
                                        };
            parameters[0].Value = MfgId;
            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }
        #endregion

        #region 查询公告
        /// <summary>
        /// 查询机构公告
        /// </summary>
        /// <param name="OrgID"></param>
        /// <returns></returns>
        public DataSet GetOrgBulletin(int OrgID, int StartIndex, int EndIndex, out int totalCount)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select ID,ContentTitle,Content,OrgID,CreateTime from ei_announcement ");
            strSql.Append(" where OrgID=@OrgID ");
            strSql.Append(" and DelFlag=0 ");
            strSql.Append(" order by CreateTime desc ");
            strSql.Append(" limit @StartIndex,@EndIndex ");

            MySqlParameter[] parameters ={
                new MySqlParameter("@OrgID", MySqlDbType.Int32,20),
                new MySqlParameter("@StartIndex", MySqlDbType.Int32,20),
                new MySqlParameter("@EndIndex", MySqlDbType.Int32,20)
                                         };
            parameters[0].Value = OrgID;
            parameters[1].Value = StartIndex;
            parameters[2].Value = EndIndex;

            totalCount = Convert.ToInt32(MySQLHelper.GetSingle("select count(1) from ei_announcement where OrgID=@OrgID and DelFlag=0 ", parameters));
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        #endregion

    }
}
