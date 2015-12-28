/*
 * author:yangjin;
 * function:分组相关功能
 * adddate:2015-04-24
 * updatedate:2015-04-24
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.Entity;
using MySql.Data;
using MySql.Data.MySqlClient;
using Mfg.EI.DBHelper;
using System.Data;
using Mfg.EI.Common;


namespace Mfg.EI.DAL
{

    public partial class GroupInfoDal
    {
        public GroupInfoDal()
        { }
        #region  BasicMethod

        /// <summary>
        /// 得到最大ID
        /// </summary>
        public int GetMaxId()
        {
            return MySQLHelper.GetMaxID("ID", "EI_GroupInfo");
        }

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_GroupInfo");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.Int32)
			};
            parameters[0].Value = ID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 是否已存在该组名
        /// </summary>
        public bool Exists(string name, int orgID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_GroupInfo");
            strSql.Append(" where Name=@Name");
            strSql.Append(" and  OrgID=@OrgID");

            MySqlParameter[] parameters = {
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@OrgID", MySqlDbType.Int32,11)
					};
            parameters[0].Value = name;
            parameters[1].Value = orgID;
            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_GroupInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_GroupInfo(");
            strSql.Append("Name,OrgID,CreateTime,CreateBy,DelFlag,Remark)");
            strSql.Append(" values (");
            strSql.Append("@Name,@OrgID,@CreateTime,@CreateBy,@DelFlag,@Remark)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@OrgID", MySqlDbType.Int32,11),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
                    new MySqlParameter("@CreateBy", MySqlDbType.VarChar,50),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,11),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50)};
            parameters[0].Value = model.Name;
            parameters[1].Value = model.OrgID;
            parameters[2].Value = model.CreateTime;
            parameters[3].Value = model.CreateBy;
            parameters[4].Value = model.DelFlag;
            parameters[5].Value = model.Remark;

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
        public bool Update(EI_GroupInfo model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_GroupInfo set ");
            strSql.Append("Name=@Name,");
            strSql.Append("OrgID=@OrgID,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@OrgID", MySqlDbType.Int32,11),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,11),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@ID", MySqlDbType.Int32,11)};
            parameters[0].Value = model.Name;
            parameters[1].Value = model.OrgID;
            parameters[2].Value = model.CreateTime;
            parameters[3].Value = model.DelFlag;
            parameters[4].Value = model.Remark;
            parameters[5].Value = model.ID;

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

        public bool UpdateGroupName(string NewName, string OldName, int orgId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_GroupInfo set ");
            strSql.Append("Name=@Name");
            strSql.Append(" where Name=@OldName and OrgID=@OrgID");
            MySqlParameter[] parameters =
            {
                new MySqlParameter("@Name", MySqlDbType.VarChar, 50),
                new MySqlParameter("@OldName", MySqlDbType.VarChar, 50),
                new MySqlParameter("@OrgID", MySqlDbType.Int32, 11)
            };
            parameters[0].Value = NewName;
            parameters[1].Value = OldName;
            parameters[2].Value = orgId;
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
        public bool Delete(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_GroupInfo ");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.Int32)
			};
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
            strSql.Append("delete from EI_GroupInfo ");
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
        ///根据账号ID获取分组信息
        /// </summary>
        public List<EI_GroupInfo> GetModelList(int ID,int OrgID)
        {
            StringBuilder strSql;
            DataSet ds = new DataSet();
            //超级管理员
            if (ID == 0)
            {
                strSql = new StringBuilder();
                strSql.Append("select ID,Name,OrgID,CreateBy,CreateTime,DelFlag,Remark from EI_GroupInfo WHERE DelFlag=0 ");
                ds = MySQLHelper.Query(strSql.ToString());

            }
            else //管理员
            {
                strSql = new StringBuilder();
                strSql.Append("select ID,`Name` from EI_GroupInfo G LEFT JOIN EI_GRelM M ON G.ID=M.GID WHERE TID=@CreateBy AND OrgID=@OrgID");
              
                MySqlParameter[] parameters = {
					new MySqlParameter("@CreateBy", MySqlDbType.Int32,40),
                    new MySqlParameter("@OrgID",MySqlDbType.Int32,40)
			        };
                parameters[0].Value = ID;
                parameters[1].Value = OrgID;
                ds = MySQLHelper.Query(strSql.ToString(), parameters);
            }

            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_GroupInfo>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<EI_StudentInfo> GetRelStuInfo(int ID,int OrgID)
        {
            StringBuilder strSql;
            DataSet ds = new DataSet();
            strSql = new StringBuilder();
            strSql.Append("SELECT S.MfgID AS MfgID,S.NAME AS NAME FROM EI_StudentInfo S LEFT JOIN EI_MRelS M ON S.MfgID=M.SID  ");
            strSql.Append(" Where M.TID=@CreateBy AND OrgID=@OrgID  ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@CreateBy", MySqlDbType.Int32,40),
                    new MySqlParameter("@OrgID",MySqlDbType.Int32,40)
			        };
            parameters[0].Value = ID;
            parameters[1].Value = OrgID;
            ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_StudentInfo>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public EI_GroupInfo DataRowToModel(DataRow row)
        {
            EI_GroupInfo model = new EI_GroupInfo();
            if (row != null)
            {
                if (row["ID"] != null && row["ID"].ToString() != "")
                {
                    model.ID = int.Parse(row["ID"].ToString());
                }
                if (row["Name"] != null)
                {
                    model.Name = row["Name"].ToString();
                }
                if (row["OrgID"] != null && row["OrgID"].ToString() != "")
                {
                    model.OrgID = int.Parse(row["OrgID"].ToString());
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
            strSql.Append("select ID,Name,OrgID,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_GroupInfo ");
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
            strSql.Append("select count(1) FROM EI_GroupInfo ");
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
            strSql.Append(")AS Row, T.*  from EI_GroupInfo T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySQLHelper.Query(strSql.ToString());
        }


        #endregion  BasicMethod
        #region  ExtensionMethod

        #endregion  ExtensionMethod


        #region 删除组
        /// <summary>
        /// 删除组
        /// </summary>
        /// <param name="ID"></param>
        /// <returns></returns>
        public int DeleteGroup(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_GroupInfo where ID=@ID ;");
            strSql.Append("delete from EI_GRelM where GID=@ID ;");
            strSql.Append("delete from EI_GRelS where GID=@ID ;");

            List<MySqlParameter> parameters = new List<MySqlParameter>();
            parameters.Add(new MySqlParameter("@ID", MySqlDbType.Int32) { Direction = ParameterDirection.InputOutput, Value = ID });


            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters.ToArray());
            return rows;
        }



        #endregion
    }
}
