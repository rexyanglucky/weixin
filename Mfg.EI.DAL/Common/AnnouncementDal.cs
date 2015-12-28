/*
 * author:谢利民;
 * function:公告表【EI_Announcement】操作的功能
 * adddate:2015-04-17
 * updatedate:2015-04-19
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

namespace Mfg.EI.DAL
{
    /// <summary>
    /// Announcement:公告功能的操作
    /// </summary>
    public class AnnouncementDal
    {
        #region 增加一条数据
        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_Announcement model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_Announcement(");
            strSql.Append("ContentTitle,Content,OrgId,CreateTime,DelFlag,Remark)");
            strSql.Append(" values (");
            strSql.Append("@ContentTitle,@Content,@OrgId,@CreateTime,@DelFlag,@Remark)");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@ContentTitle", MySqlDbType.VarChar,50),
					new MySqlParameter("@Content", MySqlDbType.Text,-1),
                    new MySqlParameter("@OrgId", MySqlDbType.Int32),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Bit,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50)};
            parameters[0].Value = model.ContentTitle;
            parameters[1].Value = model.Content;
            parameters[2].Value = model.OrgId;
            parameters[3].Value = model.CreateTime;
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
        #endregion

        #region  更新一条数据
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public bool Update(EI_Announcement model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_Announcement set ");
            strSql.Append("ContentTitle=@ContentTitle,");
            strSql.Append("Content=@Content,");
            strSql.Append("OrgId=@OrgId,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@ContentTitle", MySqlDbType.VarChar,50),
					new MySqlParameter("@Content", MySqlDbType.Text,-1),
                    new MySqlParameter("@OrgId", MySqlDbType.Int32),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Bit,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@ID", MySqlDbType.Int32,11)};
            parameters[0].Value = model.ContentTitle;
            parameters[1].Value = model.Content;
            parameters[2].Value = model.OrgId;
            parameters[3].Value = model.CreateTime;
            parameters[4].Value = model.DelFlag;
            parameters[5].Value = model.Remark;
            parameters[6].Value = model.ID;

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

        #endregion

        #region  删除一条数据
        /// <summary>
        /// 删除一条数据
        /// </summary>
        public bool Delete(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_Announcement ");
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

        #endregion

        #region 获得数据列表
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,ContentTitle,Content,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_Announcement ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where  " + strWhere + " and Delflag=0");
            }
            return MySQLHelper.Query(strSql.ToString());
        }
        /// <summary>
        /// 获得数据列表无参数
        /// </summary>
        public  DataSet GetList()
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,ContentTitle,Content,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_Announcement ");
            return MySQLHelper.Query(strSql.ToString());
        }
        /// <summary>
        /// 获得数据列表
        /// </summary>
        public DataSet GetAnnouncementList(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,ContentTitle ");
            strSql.Append(" FROM EI_Announcement ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where  " + strWhere + " and Delflag=0 order by CreateTime desc limit 10 ;");
            }
            return MySQLHelper.Query(strSql.ToString());
        }


        public DataSet GetPageList(string id, int orgId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,ContentTitle,Content,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_Announcement WHERE OrgID=" + orgId + " and  Delflag=0 LIMIT " + id + " ,1");
            return MySQLHelper.Query(strSql.ToString());
        }
        #endregion


        public EI_Announcement GetAnnouncementStep(EI_Announcement para)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"select ID, ContentTitle, Content FROM EI_Announcement where DelFlag=0 and ID=@ID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@ID", MySqlDbType.Int32,4){ Direction=ParameterDirection.InputOutput, Value=para.ID}
            };
            return MySQLHelper.ExecuteStatement<EI_Announcement>(strSql.ToString(), (a) =>
            {
                return new EI_Announcement()
                {
                    ID = a.GetInt32(0),
                    ContentTitle = a.IsDBNull(1) ? string.Empty : a.GetString(1),
                    Content = a.IsDBNull(2) ? string.Empty : a.GetString(2)
                };
            }, parameters).FirstOrDefault();
        }
    }
}
