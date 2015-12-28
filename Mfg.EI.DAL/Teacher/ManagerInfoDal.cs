/*
 * author:谢利民;
 * function:管理人员信息表【EI_ManagerInfo】操作的功能
 * adddate:2015-04-20
 * updatedate:2015-04-20
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using MySql.Data;
using MySql.Data.MySqlClient;
using Mfg.EI.DBHelper;
using System.Data;
using Mfg.EI.Common;

namespace Mfg.EI.DAL.Teacher
{
    /// <summary>
    /// ManagerInfoDal:管理人员信息表【EI_ManagerInfo】操作的功能
    /// </summary>
    public class ManagerInfoDal
    {

        #region 私有变量
        private TeachDiaryDal _teachDiaryDal = new TeachDiaryDal();
        #endregion

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(string ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_ManagerInfo");
            strSql.Append(" where AccountNumber=@AccountNumber ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@AccountNumber", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_ManagerInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_ManagerInfo(");
            strSql.Append("ID,UType,Name,Gender,Pwd,OrgID,LoginName,Phone,Postion,AcaStru,ArtSciences,QQ,Email,RoleTypeID,CreateBy,CreateTime,DelFlag,Remark,IsTeach,MfgID)");
            strSql.Append(" values (");
            strSql.Append("@ID,@UType,@Name,@Gender,@Pwd,@OrgID,@LoginName,@Phone,@Postion,@AcaStru,@ArtSciences,@QQ,@Email,@RoleTypeID,@CreateBy,@CreateTime,@DelFlag,@Remark,@IsTeach,@MfgID) ; ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40),
					new MySqlParameter("@UType", MySqlDbType.Int32,1),
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
                    new MySqlParameter("@Gender", MySqlDbType.Int32,1),
                    new MySqlParameter("@Pwd", MySqlDbType.VarChar,50),
					new MySqlParameter("@OrgID", MySqlDbType.Int32,11),
					new MySqlParameter("@LoginName", MySqlDbType.VarChar,40),
					new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
                    new MySqlParameter("@Postion", MySqlDbType.VarChar,20),
                    new MySqlParameter("@AcaStru",MySqlDbType.Int32,40),
                    new MySqlParameter("@ArtSciences",MySqlDbType.Int32,40),
					new MySqlParameter("@QQ", MySqlDbType.VarChar,20),
					new MySqlParameter("@Email", MySqlDbType.VarChar,50),
					new MySqlParameter("@RoleTypeID", MySqlDbType.Int32,1),
                    new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
                    new MySqlParameter("@CreateBy", MySqlDbType.VarChar,40),
                    new MySqlParameter("@IsTeach", MySqlDbType.Int32,40),
                    new MySqlParameter("@MfgID", MySqlDbType.Int32,40)
                                          };
            parameters[0].Value = model.ID;
            parameters[1].Value = model.UType;
            parameters[2].Value = model.Name;
            parameters[3].Value = model.Gender;
            parameters[4].Value = model.Pwd;
            parameters[5].Value = model.OrgID;
            parameters[6].Value = model.LoginName;
            parameters[7].Value = model.Phone;
            parameters[8].Value = model.Postion;
            parameters[9].Value = model.AcaStru;
            parameters[10].Value = model.ArtSciences;
            parameters[11].Value = model.QQ;
            parameters[12].Value = model.Email;
            parameters[13].Value = model.RoleTypeID;
            parameters[14].Value = model.CreateTime;
            parameters[15].Value = model.DelFlag;
            parameters[16].Value = model.Remark;
            parameters[17].Value = model.CreateBy;
            parameters[18].Value = model.IsTeach;
            parameters[19].Value = model.MfgID;


            strSql.Append(_teachDiaryDal.SaveDiary(string.Format("创建老师账号【{0}】", model.Name), model.CreateBy));

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
        /// 更新一条数据
        /// </summary>
        public bool Update(EI_ManagerInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_ManagerInfo set ");
            strSql.Append("UType=@UType,");
            strSql.Append("Name=@Name,");
            strSql.Append("Gender=@Gender,");
            strSql.Append("CardNumber=@CardNumber,");
            strSql.Append("OrgID=@OrgID,");
            strSql.Append("LoginName=@LoginName,");
            strSql.Append("Pwd=@Pwd,");
            strSql.Append("Phone=@Phone,");
            strSql.Append("Postion=@Postion,");
            strSql.Append("AcaStru=@AcaStru,");
            strSql.Append("ArtSciences=@ArtSciences,");
            strSql.Append("QQ=@QQ,");
            strSql.Append("Email=@Email,");
            strSql.Append("HeadImg=@HeadImg,");
            strSql.Append("RoleTypeID=@RoleTypeID,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark,");
            strSql.Append("IsTeach=@IsTeach");
            strSql.Append(" where AccountNumber=@AccountNumber ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@UType", MySqlDbType.Int32,1),
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
                    new MySqlParameter("@Gender", MySqlDbType.Int32,1),
                    new MySqlParameter("@CardNumber", MySqlDbType.VarChar,20),
					new MySqlParameter("@OrgID", MySqlDbType.Int32,11),
					new MySqlParameter("@LoginName", MySqlDbType.VarChar,40),
					new MySqlParameter("@Pwd", MySqlDbType.VarChar,50),
					new MySqlParameter("@Phone", MySqlDbType.VarChar,20),
                    new MySqlParameter("@Postion", MySqlDbType.VarChar,20),
                    new MySqlParameter("@AcaStru", MySqlDbType.Int32,1),
                    new MySqlParameter("@ArtSciences", MySqlDbType.Int32,1),
					new MySqlParameter("@QQ", MySqlDbType.VarChar,20),
					new MySqlParameter("@Email", MySqlDbType.VarChar,50),
                    new MySqlParameter("@HeadImg", MySqlDbType.VarChar,50),
					new MySqlParameter("@RoleTypeID", MySqlDbType.Int32,1),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
                     new MySqlParameter("@IsTeach", MySqlDbType.Int32,11),
					new MySqlParameter("@AccountNumber", MySqlDbType.VarChar,40)
                                          };
            parameters[0].Value = model.UType;
            parameters[1].Value = model.Name;
            parameters[2].Value = model.Gender;
            parameters[3].Value = model.CardNumber;
            parameters[4].Value = model.OrgID;
            parameters[5].Value = model.LoginName;
            parameters[6].Value = model.Pwd;
            parameters[7].Value = model.Phone;
            parameters[8].Value = model.Postion;
            parameters[9].Value = model.AcaStru;
            parameters[10].Value = model.ArtSciences;
            parameters[11].Value = model.QQ;
            parameters[12].Value = model.Email;
            parameters[13].Value = model.HeadImg;
            parameters[14].Value = model.RoleTypeID;
            parameters[15].Value = model.CreateTime;
            parameters[16].Value = model.DelFlag;
            parameters[17].Value = model.Remark;
            parameters[18].Value = model.IsTeach;
            parameters[19].Value = model.AccountNumber;

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

        public bool UpdateTeacherInfo(EI_ManagerInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_ManagerInfo set ");
            strSql.Append("UType=@UType,");
            strSql.Append("Name=@Name,");
            strSql.Append("Postion=@Postion");
            strSql.Append(" where AccountNumber=@AccountNumber ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@UType", MySqlDbType.Int32,1),
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
                   new MySqlParameter("@Postion", MySqlDbType.VarChar,20),
                   new MySqlParameter("@AccountNumber", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.UType;
            parameters[1].Value = model.Name;
            parameters[2].Value = model.Postion;
            parameters[3].Value = model.AccountNumber;
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
        /// 删除一条数据
        /// </summary>
        public bool Delete(string ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_ManagerInfo ");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

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
        /// 批量删除数据
        /// </summary>
        public bool DeleteList(string IDlist)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_ManagerInfo ");
            strSql.Append(" where ID in (" + IDlist + ")  ");
            int rows = MySQLHelper.ExecuteSql(strSql.ToString());
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
        /// 得到一个对象实体
        /// </summary>
        public EI_ManagerInfo GetModel(string ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,UType,AccountNumber,CreateBy,Name,OrgID,LoginName,Pwd,Phone,QQ,Email,RoleTypeID,CreateTime,DelFlag,Remark from EI_ManagerInfo ");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = ID;

            EI_ManagerInfo model = new EI_ManagerInfo();
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_ManagerInfo>.ConvertToModel(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 根据账号获取用户
        /// </summary>
        /// <param name="accountNumber"></param>
        /// <returns></returns>
        public EI_ManagerInfo GetModel(int accountNumber)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select  FreezeFlag,ID,UType,AccountNumber,CreateBy,Name,Gender,CardNumber,OrgID,LoginName,Pwd,Phone,Postion,QQ,Email,HeadImg,RoleTypeID,AcaStru,ArtSciences,FirstLogin,CreateTime,DelFlag,Remark,IsTeach,MfgID from EI_ManagerInfo ");
            strSql.Append(" where AccountNumber=@AccountNumber AND DelFlag=0 ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@AccountNumber",MySqlDbType.Int32,1)			};
            parameters[0].Value = accountNumber;

            EI_ManagerInfo model = new EI_ManagerInfo();
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_ManagerInfo>.ConvertToModel(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public EI_ManagerInfo DataRowToModel(DataRow row)
        {
            EI_ManagerInfo model = new EI_ManagerInfo();
            if (row != null)
            {
                if (row["ID"] != null)
                {
                    model.ID = row["ID"].ToString();
                }
                if (row["UType"] != null && row["UType"].ToString() != "")
                {
                    model.UType = int.Parse(row["UType"].ToString());
                }
                if (row["Name"] != null)
                {
                    model.Name = row["Name"].ToString();
                }
                if (row["OrgID"] != null && row["OrgID"].ToString() != "")
                {
                    model.OrgID = int.Parse(row["OrgID"].ToString());
                }
                if (row["LoginName"] != null)
                {
                    model.LoginName = row["LoginName"].ToString();
                }
                if (row["Pwd"] != null)
                {
                    model.Pwd = row["Pwd"].ToString();
                }
                if (row["Phone"] != null)
                {
                    model.Phone = row["Phone"].ToString();
                }
                if (row["QQ"] != null)
                {
                    model.QQ = row["QQ"].ToString();
                }
                if (row["Email"] != null)
                {
                    model.Email = row["Email"].ToString();
                }
                if (row["RoleTypeID"] != null && row["RoleTypeID"].ToString() != "")
                {
                    model.RoleTypeID = int.Parse(row["RoleTypeID"].ToString());
                }
                if (row["CreateTime"] != null && row["CreateTime"].ToString() != "")
                {
                    model.CreateTime = DateTime.Parse(row["CreateTime"].ToString());
                }
                if (row["DelFlag"] != null && row["DelFlag"].ToString() != "")
                {
                    model.DelFlag = int.Parse(row["DelFlag"].ToString());
                }
                if (row["Remark"] != null)
                {
                    model.Remark = row["Remark"].ToString();
                }
            }
            return model;
        }

        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,UType,Name,OrgID,LoginName,Pwd,Phone,QQ,Email,RoleTypeID,CreateTime,DelFlag,Remark,AccountNumber,CreateBy ");
            strSql.Append(" FROM EI_ManagerInfo ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return MySQLHelper.Query(strSql.ToString());
        }

        /// <summary>
        /// 获取记录总数
        /// </summary>
        public int GetRecordCount(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) FROM EI_ManagerInfo ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            object obj = MySQLHelper.GetSingle(strSql.ToString());
            if (obj == null)
            {
                return 0;
            }
            else
            {
                return Convert.ToInt32(obj);
            }
        }
        /// <summary>
        /// 分页获取数据列表
        /// </summary>
        public DataSet GetListByPage(string strWhere, string orderby, int startIndex, int endIndex)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT * FROM ( ");
            strSql.Append(" SELECT ROW_NUMBER() OVER (");
            if (!string.IsNullOrEmpty(orderby.Trim()))
            {
                strSql.Append("order by T." + orderby);
            }
            else
            {
                strSql.Append("order by T.ID desc");
            }
            strSql.Append(")AS Row, T.*  from EI_ManagerInfo T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySQLHelper.Query(strSql.ToString());
        }

        #region 获取教师列表
        /// <summary>
        /// 根据机构ID 获取教师列表
        /// </summary>
        /// <param name="orgID"></param>
        /// <returns></returns>
        public DataSet GetTeacherListByOrgID(int orgID, bool groupbyGroup = false, bool groupBySID = false)
        {
            StringBuilder strSql = new StringBuilder();
            //分组老师关联，老师学生关联
            strSql.Append("select EIM.FreezeFlag,  EIM.AccountNumber,EIM.UType,EIM.Name,EIM.OrgID,EIM.LoginName,EIM.Pwd,EIM.Phone,EIM.QQ,EIM.Email,EIM.RoleTypeID,EIM.CreateTime,EIM.Postion,EIM.DelFlag,EIM.Remark,");
            strSql.Append("EIG.GID AS GroupID,EIM.CreateBy,");
            strSql.Append("EIMS.SID");
            strSql.Append(" FROM EI_ManagerInfo EIM LEFT  JOIN EI_GRelM EIG on EIM.AccountNumber=EIG.TID");
            strSql.Append(" LEFT JOIN EI_MRelS EIMS ON EIM.AccountNumber=EIMS.TID ");
            strSql.Append(" LEFT JOIN EI_GRelS EIGS ON EIG.GID=EIGS.GID");
            strSql.Append(" where EIM.DelFlag=0 and EIM.orgID=@orgID group by AccountNumber");

            //strSql.Append("select  EIM.AccountNumber,EIM.UType,EIM.Name,EIM.OrgID,EIM.LoginName,EIM.Pwd,EIM.Phone,EIM.QQ,EIM.Email,EIM.RoleTypeID,EIM.CreateTime,EIM.Postion,EIM.DelFlag,EIM.Remark,");
            //strSql.Append("EIM.CreateBy,");
            //strSql.Append("EIMS.SID");
            //strSql.Append(" FROM EI_ManagerInfo EIM ");
            //strSql.Append(" LEFT JOIN EI_MRelS EIMS ON EIM.AccountNumber=EIMS.TID ");

            //strSql.Append(" where EIM.DelFlag=0 and EIM.orgID=@orgID group by AccountNumber");
            if (groupbyGroup)
            {
                strSql.Append(",GROUPID");
            }
            if (groupBySID)
            {
                strSql.Append(",SID");
            }
            strSql.Append(";");
            MySqlParameter[] parameters = {
					new MySqlParameter("@orgID",MySqlDbType.Int32,1)};
            parameters[0].Value = orgID;

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 根据机构ID，管理员ID获取教师列表
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="groupID"></param>
        /// <param name="createBy"></param>
        /// <param name="teacherName"></param>
        /// <returns></returns>
        public DataSet GetTeacherList(int orgID, int groupID, int createBy, string teacherName)
        {
            //groupID -1 所有老师，-2未关联老师，0未分组老师
            StringBuilder strSql = new StringBuilder();
            switch (groupID)
            {
                //所有老师
                case -1:
                    {
                        strSql.Append(
                            "SELECT EIM.FreezeFlag, EIM.AccountNumber, EIM.UType, EIM.Name, EIM.OrgID, EIM.LoginName, EIM.Pwd, EIM.Phone, EIM.QQ, EIM.Email, EIM.RoleTypeID, EIM.CreateTime, EIM.Postion, EIM.DelFlag, EIM.Remark FROM  EI_ManagerInfo EIM ");
                        strSql.Append(" WHERE EIM.OrgID=@OrgID AND EIM.DelFlag=0 AND EIM.CreateBy = @CreateBy ");
                    }
                    break;
                case 0:
                    {
                        strSql.Append("SELECT EIM.FreezeFlag, EIM.AccountNumber, EIM.UType, EIM.Name, EIM.OrgID, EIM.LoginName, EIM.Pwd, EIM.Phone, EIM.QQ, EIM.Email, EIM.RoleTypeID, EIM.CreateTime, EIM.Postion, EIM.DelFlag, EIM.Remark FROM  EI_ManagerInfo EIM ");
                        strSql.Append(" LEFT JOIN EI_GRelM  EIGM ON  EIM.AccountNumber = EIGM.TID  ");
                        strSql.Append(" WHERE EIM.OrgID=@OrgID AND EIM.DelFlag=0 AND EIM.CreateBy=@CreateBy AND EIGM.GID IS NULL ");
                    }
                    break;
                case -2:
                    {
                        strSql.Append("SELECT EIM.FreezeFlag, EIM.AccountNumber, EIM.UType, EIM.Name, EIM.OrgID, EIM.LoginName, EIM.Pwd, EIM.Phone, EIM.QQ, EIM.Email, EIM.RoleTypeID, EIM.CreateTime, EIM.Postion, EIM.DelFlag, EIM.Remark FROM  EI_ManagerInfo EIM ");
                        strSql.Append(
                            " WHERE EIM.AccountNumber NOT IN (SELECT TID FROM EI_GRelM) AND EIM.AccountNumber NOT IN (SELECT TID FROM EI_MRelS)");
                        strSql.Append(" and EIM.OrgID=@OrgID AND EIM.DelFlag=0 AND EIM.CreateBy=@CreateBy  ");
                    }
                    break;
                default:
                    {
                        strSql.Append("SELECT EIM.FreezeFlag, EIM.AccountNumber, EIM.UType, EIM.Name, EIM.OrgID, EIM.LoginName, EIM.Pwd, EIM.Phone, EIM.QQ, EIM.Email, EIM.RoleTypeID, EIM.CreateTime, EIM.Postion, EIM.DelFlag, EIM.Remark FROM  EI_ManagerInfo EIM ");
                        strSql.Append(" LEFT JOIN EI_GRelM  EIGM ON  EIM.AccountNumber = EIGM.TID  ");
                        strSql.Append(" WHERE EIM.OrgID=@OrgID AND EIM.DelFlag=0 AND EIGM.GID=@GroupID ");
                    }
                    break;
            }
            if (!string.IsNullOrEmpty(teacherName))
            {
                strSql.Append(" AND EIM.Name LIKE @Name");
            }
            strSql.Append(";");
            MySqlParameter[] parameters = {
					new MySqlParameter("@OrgID",MySqlDbType.Int32,1){Direction=ParameterDirection.InputOutput, Value=orgID},
                    new MySqlParameter("@GroupID",MySqlDbType.Int32,1){Direction=ParameterDirection.InputOutput, Value=groupID},
                    new MySqlParameter("@CreateBy",MySqlDbType.Int32,1){Direction=ParameterDirection.InputOutput, Value=createBy},
                new MySqlParameter("@Name",MySqlDbType.VarChar,50){Direction=ParameterDirection.InputOutput, Value="%"+teacherName+"%"}};


            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        #endregion

        #region 更新首次登录标识
        /// <summary>
        /// 更新登录标识
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>

        public bool UpdateFirstLogin(string accountid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_ManagerInfo set ");
            strSql.Append("FirstLogin=0 ");
            strSql.Append(" where AccountNumber=@AccountNumber ");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
               new MySqlParameter("@AccountNumber", MySqlDbType.VarChar,40)
            };
            parameters[0].Value = accountid;
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
        }
        #endregion

        public bool FreezeTeacherInfo(string tId, string tName, string managerID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_ManagerInfo set ");
            strSql.Append("FreezeFlag=1");
            strSql.Append(" where AccountNumber=@AccountNumber ;");
            MySqlParameter[] parameters = {
				
                   new MySqlParameter("@AccountNumber", MySqlDbType.VarChar,40)};

            parameters[0].Value = tId;

            strSql.Append(new TeachDiaryDal().SaveDiary(string.Format("冻结老师账号【{0}】", tName), managerID));
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            return false;
        }

        public bool DeFreezeTeacherInfo(string tId, string tName, string managerID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_ManagerInfo set ");
            strSql.Append("FreezeFlag=0");
            strSql.Append(" where AccountNumber=@AccountNumber ;");
            MySqlParameter[] parameters = {
				
                   new MySqlParameter("@AccountNumber", MySqlDbType.VarChar,40)};

            parameters[0].Value = tId;

            strSql.Append(new TeachDiaryDal().SaveDiary(string.Format("解冻老师账号【{0}】", tName), managerID));
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            if (rows > 0)
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 获取所有管理员
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="tid"></param>
        /// <returns></returns>
        public DataSet GetTeacherTree(int orgID, int tid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(
                    @"SELECT 
                          EIM.CreateBy,
                          EIM.FreezeFlag,
                          EIM.AccountNumber,
                          EIM.UType,
                          EIM.Name,
                          EIM.OrgID,
                          EIM.LoginName,
                          EIM.Pwd,
                          EIM.Phone,
                          EIM.QQ,
                          EIM.Email,
                          EIM.RoleTypeID,
                          EIM.CreateTime,
                          EIM.Postion,
                          EIM.DelFlag,
                          EIM.Remark 
                          FROM EI_ManagerInfo EIM 
                          WHERE (EIM.UType=0 OR EIM.UType=1) AND EIM.OrgID=@OrgID ");
            if (tid != 0)
            {
                strSql.Append(" AND EIM.CreateBy=@CreateBy;");
            }
            MySqlParameter[] paras = new MySqlParameter[]
            {
                new MySqlParameter("@OrgID",MySqlDbType.Int32){ Direction= ParameterDirection.InputOutput,Value =orgID},
                new MySqlParameter("@CreateBy",MySqlDbType.Int32){ Direction= ParameterDirection.InputOutput,Value =tid}
            };
            return MySQLHelper.Query(strSql.ToString(), paras);
        }



        #region 获取老师分组关联树

        /// <summary>
        /// 获取老师分组关联树
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="tid"></param>
        /// <returns></returns>
        public DataSet GetTeacherGroupTree(int orgID, int tid)
        {
            var sqlstr = GetTeacherGroupTreeSql(orgID, tid);
            return MySQLHelper.Query(sqlstr);
        }

        public string GetTeacherGroupTreeSql(int orgID, int tid)
        {
            var strSql = new StringBuilder();
            strSql.AppendFormat(
                    @"SELECT * FROM (SELECT 
                          EIM.CreateBy,
                          EIM.AccountNumber AS ID,
                          EIM.Name,
                          EIM.OrgID,
                          EIM.UType AS Level 
                        FROM
                          EI_ManagerInfo EIM 
                        WHERE EIM.`OrgID` = '{0}' AND (EIM.UType=0 OR EIM.UType=1)
                        UNION
                        ALL 
                        SELECT 
                          EIG.CreateBy ,
                          EIG.ID,
                          EIG.Name,
                          EIG.OrgID,
                          -1 AS Level 
                       
                        FROM
                          EI_GroupInfo EIG 
                        WHERE EIG.`OrgID` = '{0}') AS A WHERE 1=1", orgID);
            if (tid != 0)
            {
                strSql.AppendFormat(" AND (A.CreateBy='{0}'  OR A.ID='{0}')", tid);
            }
            strSql.Append(";");
            return strSql.ToString();
        }
        #endregion

        #region 根据utype获取教师列表
        public DataSet GetManagerList(int orgID, int utype)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(
                    @"SELECT 
                          EIM.CreateBy,
                          EIM.FreezeFlag,
                          EIM.AccountNumber,
                          EIM.UType,
                          EIM.Name,
                          EIM.OrgID,
                          EIM.LoginName,
                          EIM.Pwd,
                          EIM.Phone,
                          EIM.QQ,
                          EIM.Email,
                          EIM.RoleTypeID,
                          EIM.CreateTime,
                          EIM.Postion,
                          EIM.DelFlag,
                          EIM.Remark 
                          FROM EI_ManagerInfo EIM 
                          WHERE EIM.UType=@UType  AND EIM.OrgID=@OrgID ");

            MySqlParameter[] paras = new MySqlParameter[]
            {
                new MySqlParameter("@OrgID",MySqlDbType.Int32){ Direction= ParameterDirection.InputOutput,Value =orgID},
                new MySqlParameter("@UType",MySqlDbType.Int32){ Direction= ParameterDirection.InputOutput,Value =utype}
            };
            return MySQLHelper.Query(strSql.ToString(), paras);
        }

        #endregion

        #region 根据教师ID，获取所在分组，及所在分组的老师
        /// <summary>
        /// 根据教师ID，获取所在分组，及所在分组的老师
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="groupID"></param>
        /// <param name="createBy"></param>
        /// <param name="teacherName"></param>
        /// <returns></returns>
        public DataSet GetTeacherGroupListInfo(int orgID, int tid)
        {
            //groupID -1 所有老师，-2未关联老师，0未分组老师
            StringBuilder strSql = new StringBuilder();
            strSql.Append("   SELECT ");
            strSql.Append("   EIG.`Name`,");
            strSql.Append("   EIGM.GID AS ID,");
            strSql.Append("   EIG.OrgID ,");
            strSql.Append("   - 1 AS GID ");
            strSql.Append(" FROM");
            strSql.Append("   EI_GRelM AS EIGM ");
            strSql.Append("   INNER JOIN EI_GroupInfo AS EIG ");
            strSql.Append("     ON EIGM.GID = EIG.ID ");
            strSql.Append(" WHERE EIGM.TID = @TID ");
            strSql.Append(" UNION ALL ");
            strSql.Append(" SELECT ");
            strSql.Append("   EIM.Name,");
            strSql.Append("   EIM.AccountNumber AS ID,");
            strSql.Append("   EIM.OrgID,");
            strSql.Append("   EIGM.`GID` ");
            strSql.Append(" FROM");
            strSql.Append("   EI_ManagerInfo EIM ");
            strSql.Append("   LEFT JOIN EI_GRelM EIGM ");
            strSql.Append("     ON EIM.AccountNumber = EIGM.TID ");
            strSql.Append("     AND EIM.DelFlag = 0 ");
            strSql.Append(" WHERE EIGM.GID IN ");
            strSql.Append("   (SELECT ");
            strSql.Append("     EIGM.GID ");
            strSql.Append("   FROM");
            strSql.Append("     EI_GRelM AS EIGM ");
            strSql.Append("     INNER JOIN EI_GroupInfo AS EIG ");
            strSql.Append("       ON EIGM.GID = EIG.ID ");
            strSql.Append("   WHERE EIGM.TID = @TID AND EIM.UType <>3) AND EIGM.TID <>@TID");

            strSql.Append(";");
            MySqlParameter[] parameters = {
					new MySqlParameter("@OrgID",MySqlDbType.Int32,1){Direction=ParameterDirection.InputOutput, Value=orgID},
                    new MySqlParameter("@TID", MySqlDbType.Int32,11){Direction=ParameterDirection.InputOutput, Value=tid}  
       };


            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        #endregion

        #region 保存意见反馈
        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public bool SaveFeedBack(FeedBackModel feedModel)
        {
            var strSql = new StringBuilder();
            //strSql.AppendFormat("delete from ei_feedback where LoginAccountNumber='{0}' And Orgid='{1}';", feedModel.LoginAccountNumber, feedModel.OrgID);
            strSql.Append("Insert Into ei_feedback(AccountNumber,OrgID,Content,LoginAccountNumber,LoginName,CreateTime,FType)");
            strSql.AppendFormat(" values('{0}','{1}','{2}','{3}','{4}','{5}','{6}');",
               feedModel.AccountNumber,
               feedModel.OrgID,
               feedModel.Content,
               feedModel.LoginAccountNumber,
               feedModel.LoginName,
               DateTime.Now,
               feedModel.FType
                );
            return MySQLHelper.ExecuteSql(strSql.ToString()) > 0;
        }

        public string GetFeedBackInfo(string LoginAccountNumber, int OrgID)
        {
            var strcontent = string.Empty;
            StringBuilder strSql = new StringBuilder();
            strSql.AppendFormat("select Content from ei_feedback where LoginAccountNumber='{0}' And Orgid='{1}';", LoginAccountNumber, OrgID);
            var dataset = MySQLHelper.Query(strSql.ToString());
            if (dataset.Tables[0].Rows.Count > 0)
            {
                strcontent = dataset.Tables[0].Rows[0]["Content"].ToString();
            }
            return strcontent;
        }
        #endregion

    }
}
