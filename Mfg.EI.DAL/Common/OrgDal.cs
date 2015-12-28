/*
 * author:谢利民;
 * function:公告表【EI_Announcement】操作的功能
 * adddate:2015-04-20
 * updatedate:2015-04-20
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
using System.IO;
using Mfg.EI.Common;

namespace Mfg.EI.DAL
{
    public class OrgDal
    {
        #region 私有变量
        private TeachDiaryDal _teachDiaryDal = new TeachDiaryDal();
        #endregion


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_Org model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_Org(");
            strSql.Append("PID,Name,OrgType,Url,StuLimitCount,ManLimitCount,ExpirTime,OrgTemplate,CreateTime,DelFlag,Remark)");
            strSql.Append(" values (");
            strSql.Append("@PID,@Name,@OrgType,@Url,@StuLimitCount,@ManLimitCount,@ExpirTime,@OrgTemplate,@CreateTime,@DelFlag,@Remark)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@PID", MySqlDbType.Int32,11),
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@OrgType", MySqlDbType.Int32,11),
					new MySqlParameter("@Url", MySqlDbType.VarChar,100),
					new MySqlParameter("@StuLimitCount", MySqlDbType.Int32,11),
					new MySqlParameter("@ManLimitCount", MySqlDbType.Int32,11),
					new MySqlParameter("@ExpirTime", MySqlDbType.DateTime),
					new MySqlParameter("@OrgTemplate", MySqlDbType.VarChar,40),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,11),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50)};
            parameters[0].Value = model.PID;
            parameters[1].Value = model.Name;
            parameters[2].Value = model.OrgType;
            parameters[3].Value = model.Url;
            parameters[4].Value = model.StuLimitCount;
            parameters[5].Value = model.ManLimitCount;
            parameters[6].Value = model.ExpirTime;
            parameters[7].Value = model.OrgTemplate;
            parameters[8].Value = model.CreateTime;
            parameters[9].Value = model.DelFlag;
            parameters[10].Value = model.Remark;

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
        public bool Update(EI_Org model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_Org set ");
            strSql.Append("PID=@PID,");
            strSql.Append("Name=@Name,");
            strSql.Append("OrgType=@OrgType,");
            strSql.Append("Url=@Url,");
            strSql.Append("StuLimitCount=@StuLimitCount,");
            strSql.Append("ManLimitCount=@ManLimitCount,");
            strSql.Append("ExpirTime=@ExpirTime,");
            strSql.Append("OrgTemplate=@OrgTemplate,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@PID", MySqlDbType.Int32,11),
					new MySqlParameter("@Name", MySqlDbType.VarChar,50),
					new MySqlParameter("@OrgType", MySqlDbType.Int32,11),
					new MySqlParameter("@Url", MySqlDbType.VarChar,100),
					new MySqlParameter("@StuLimitCount", MySqlDbType.Int32,11),
					new MySqlParameter("@ManLimitCount", MySqlDbType.Int32,11),
					new MySqlParameter("@ExpirTime", MySqlDbType.DateTime),
					new MySqlParameter("@OrgTemplate", MySqlDbType.VarChar,40),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,11),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@ID", MySqlDbType.Int32,11)};
            parameters[0].Value = model.PID;
            parameters[1].Value = model.Name;
            parameters[2].Value = model.OrgType;
            parameters[3].Value = model.Url;
            parameters[4].Value = model.StuLimitCount;
            parameters[5].Value = model.ManLimitCount;
            parameters[6].Value = model.ExpirTime;
            parameters[7].Value = model.OrgTemplate;
            parameters[8].Value = model.CreateTime;
            parameters[9].Value = model.DelFlag;
            parameters[10].Value = model.Remark;
            parameters[11].Value = model.ID;

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
            strSql.Append("delete from EI_Org ");
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
            strSql.Append("delete from EI_Org ");
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
        public EI_Org GetModel(string Url)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,PID,Name,OrgType,Url,StuLimitCount,ManLimitCount,ExpirTime,OrgTemplate,CreateTime,DelFlag,Remark,LogoUrl,FootFragment,BannerImgUrl from EI_Org ");
            strSql.Append(" where Url=@Url");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Url", MySqlDbType.String)
			};
            parameters[0].Value = Url;

            EI_Org model = new EI_Org();
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return DataRowToModel(ds.Tables[0].Rows[0]);
            }
            else
            {
                return null;
            }
        }


        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public EI_Org DataRowToModel(DataRow row)
        {
            EI_Org model = new EI_Org();
            if (row != null)
            {
                if (row["ID"] != null && row["ID"].ToString() != "")
                {
                    model.ID = int.Parse(row["ID"].ToString());
                }
                if (row["PID"] != null && row["PID"].ToString() != "")
                {
                    model.PID = int.Parse(row["PID"].ToString());
                }
                if (row["Name"] != null)
                {
                    model.Name = row["Name"].ToString();
                }
                if (row["OrgType"] != null && row["OrgType"].ToString() != "")
                {
                    model.OrgType = int.Parse(row["OrgType"].ToString());
                }
                if (row["Url"] != null)
                {
                    model.Url = row["Url"].ToString();
                }
                if (row["StuLimitCount"] != null && row["StuLimitCount"].ToString() != "")
                {
                    model.StuLimitCount = int.Parse(row["StuLimitCount"].ToString());
                }
                if (row["ManLimitCount"] != null && row["ManLimitCount"].ToString() != "")
                {
                    model.ManLimitCount = int.Parse(row["ManLimitCount"].ToString());
                }
                if (row["ExpirTime"] != null && row["ExpirTime"].ToString() != "")
                {
                    model.ExpirTime = DateTime.Parse(row["ExpirTime"].ToString());
                }
                if (row["OrgTemplate"] != null)
                {
                    model.OrgTemplate = row["OrgTemplate"].ToString();
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
                if (row["LogoUrl"] != null)
                {
                    model.LogoUrl = row["LogoUrl"].ToString();
                }
                if (row["FootFragment"] != null)
                {
                    model.FootFragment = row["FootFragment"].ToString();
                }
                if (row["BannerImgUrl"] != null)
                {
                    model.BannerImgUrls = row["BannerImgUrl"].ToString();
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
            strSql.Append("select ID,PID,Name,OrgType,Url,StuLimitCount,ManLimitCount,ExpirTime,OrgTemplate,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_Org ");
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
            strSql.Append("select count(1) FROM EI_Org ");
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
            strSql.Append(")AS Row, T.*  from EI_Org T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySQLHelper.Query(strSql.ToString());
        }

        #region 还能能创建几个学生
        /// <summary>
        /// 还能能创建几个学生
        /// </summary>
        /// <param name="orgID"></param>
        /// <returns></returns>
        public int CanCreateStu(int orgID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT (SELECT StuLimitCount FROM EI_Org WHERE ID=@OrgID)-(SELECT COUNT(OrgID) Count FROM EI_StudentInfo  WHERE OrgID=@OrgID);");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
                	new MySqlParameter("@OrgID", MySqlDbType.Int32,11)
            };
            parameters[0].Value = orgID;

            var obj = MySQLHelper.GetSingle(strSql.ToString(), parameters);

            return Convert.ToInt32(obj);
        }


        #endregion

        #region 换肤
        /// <summary>
        /// 换肤
        /// </summary>
        /// <param name="orgTemplate">皮肤</param>
        /// <param name="ID">机构ID</param>
        /// <returns></returns>
        public bool UpdateOrgTemplate(string orgTemplate, int ID, string createBy)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_Org set ");
            strSql.Append("OrgTemplate=@OrgTemplate ");
            strSql.Append(" where ID=@ID ; ");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
                    new MySqlParameter("@OrgTemplate", MySqlDbType.VarChar,40),
                	new MySqlParameter("@ID", MySqlDbType.Int32,11)
            };
            parameters[0].Value = orgTemplate;
            parameters[1].Value = ID;
            strSql.Append(_teachDiaryDal.SaveDiary("更换网站皮肤", createBy));
            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
        }
        #endregion

        #region 换Logo
        /// <summary>
        /// 换Logo
        /// </summary>
        /// <param name="logoUrl">Logo</param>
        /// <param name="ID">机构ID</param>
        /// <returns></returns>
        public bool UpdateLogoUrl(string logoUrl, int ID, string createBy)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_Org set ");
            strSql.Append("LogoUrl=@LogoUrl ");
            strSql.Append(" where ID=@ID ;");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
                    new MySqlParameter("@LogoUrl", MySqlDbType.VarChar,500),
                	new MySqlParameter("@ID", MySqlDbType.Int32,11)
            };
            parameters[0].Value = logoUrl;
            parameters[1].Value = ID;

            strSql.Append(_teachDiaryDal.SaveDiary("上传Logo", createBy));

            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
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

            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_Org set ");
            strSql.Append("BannerImgUrl=@BannerImgUrl ");
            strSql.Append(" where ID=@ID ;");

            MySqlParameter[] parameters = new MySqlParameter[]
            {
                    new MySqlParameter("@BannerImgUrl", MySqlDbType.VarChar,1000),
                	new MySqlParameter("@ID", MySqlDbType.Int32,11)
            };
            parameters[0].Value = bannerImgUrls;
            parameters[1].Value = id;

            //TODO 修改轮播图，是否添加教学日记
            //strSql.Append(_teachDiaryDal.SaveDiary("修改轮播图", createBy));

            int rows = MySQLHelper.ExecuteSql(strSql.ToString(), parameters);
            return rows > 0;
        }
        #endregion

        public string GetDataTableXml(string sql, Dictionary<string, object> param)
        {

            MySqlParameter[] sqlParameters = new MySqlParameter[param.Count];
            if (param != null && param.Count > 0)
            {
                for (int i = 0; i < param.Count; i++)
                {
                    sqlParameters[i] = new MySqlParameter(param.Keys.ToArray()[i].ToString(), MySqlDbType.VarChar, 1000) { Direction = ParameterDirection.Input, Value = param.Values.ToArray()[i].ToString() };
                }
            }
            var ds = MySQLHelper.Query(sql, sqlParameters);
            using (var writer = new StringWriter())
            {
                ds.WriteXml(writer);
                return writer.ToString();
            }
        }
    }
}
