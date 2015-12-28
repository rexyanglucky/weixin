/*
 * author:谢利民;
 * function:教师班级关联表【EI_GRelM】操作的功能
 * adddate:2015-04-20
 * updatedate:2015-04-20
 */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Mfg.EI.DAL.Teacher;
using Mfg.EI.Entity;
using Mfg.EI.ViewModel;
using MySql.Data;
using MySql.Data.MySqlClient;
using Mfg.EI.DBHelper;
using System.Data;
using Mfg.EI.Common;


namespace Mfg.EI.DAL
{
    /// <summary>
    /// GRelMDal:教师班级关联表【EI_GRelM】操作的功能
    /// </summary>
    public class GRelMDal
    {

        /// <summary>
        /// 判断是否存在该记录
        /// </summary>
        /// <param name="tid"></param>
        /// <returns></returns>
        public bool IsExits(int tid)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_GRelM");
            strSql.Append(" where TID=@TID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@TID", MySqlDbType.VarChar,40)
			};
            parameters[0].Value = tid;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_GRelM model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_GRelM(");
            strSql.Append("GID,TID)");
            strSql.Append(" values (");
            strSql.Append("@GID,@TID)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@GID", MySqlDbType.Int32,11),
					new MySqlParameter("@TID", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.GID;
            parameters[1].Value = model.TID;

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

        public int Add(List<EI_GRelM> models)
        {
            StringBuilder strSql = new StringBuilder();
            foreach (EI_GRelM model in models)
            {
                strSql.Append("insert into EI_GRelM(");
                strSql.Append("GID,TID)");
                strSql.Append(" values (");
                strSql.Append(model.GID + "," + model.TID + ");");
            }


            int rows = MySQLHelper.ExecuteSql(strSql.ToString());
            return rows;
        }
        /// <summary>
        /// 更新一条数据
        /// </summary>
        public bool Update(EI_GRelM model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_GRelM set ");
            strSql.Append("GID=@GID");
            strSql.Append(" where TID=@TID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@GID", MySqlDbType.Int32,11),
					new MySqlParameter("@TID", MySqlDbType.VarChar,40)};
            parameters[0].Value = model.GID;
            parameters[1].Value = model.TID;

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
        public bool Delete(int tid, int gid)
        {
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_GRelM ");
            strSql.Append(" where tid=@tid and gid=@gid");
            MySqlParameter[] parameters = {new MySqlParameter("@tid",MySqlDbType.Int32,1),
                                              new MySqlParameter("@gid",MySqlDbType.Int32,1)
			};
            parameters[0].Value = tid;
            parameters[1].Value = gid;
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
        /// 得到一个对象实体
        /// </summary>
        public EI_GRelM GetModel(string tid)
        {
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select GID,TID from EI_GRelM ");
            strSql.Append(" where TID=@TID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@TID", MySqlDbType.VarChar,40)};
            parameters[0].Value = tid;
            EI_GRelM model = new EI_GRelM();
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
        public EI_GRelM DataRowToModel(DataRow row)
        {
            EI_GRelM model = new EI_GRelM();
            if (row != null)
            {
                if (row["GID"] != null && row["GID"].ToString() != "")
                {
                    model.GID = int.Parse(row["GID"].ToString());
                }
                if (row["TID"] != null)
                {
                    model.TID = row["TID"].ToString();
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
            strSql.Append("select GID,TID ");
            strSql.Append(" FROM EI_GRelM ");
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
            strSql.Append("select count(1) FROM EI_GRelM ");
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

        public DataSet GetTeacherGroupByOrgID(int orgID)
        {

            //分组
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT EIG.ID,case WHEN ISNULL(EIG.Name) then '未分组老师' ELSE EIG.Name END Name,");
            strSql.Append("case WHEN ISNULL(EIG.Name) then 1 ELSE 0 END OrderByNum,COUNT(1) as Count  FROM EI_ManagerInfo EIM ");
            strSql.Append("LEFT JOIN EI_GRelM EIGM ON EIM.AccountNumber=EIGM.TID LEFT JOIN EI_GroupInfo EIG ON EIGM.GID=EIG.ID");
            strSql.Append(" where EIM.OrgID=@OrgID  and EIM.DelFlag=0 GROUP BY EIG.`Name`");
            strSql.Append(" ORDER BY OrderByNum ASC ; ");



            //未关联学生的老师
            #region MyRegion
            strSql.Append("SELECT  -2 as ID,'未关联老师' as `Name`,count(1) as Count FROM (");
            strSql.Append("select ");
            strSql.Append(" MAX(EIMS.SID) AS MSID,");
            //strSql.Append(" MAX(EIGS.SID) AS GSID, ");
            strSql.Append("MAX(EIG.GID) AS GID ");
            strSql.Append(" FROM EI_ManagerInfo EIM ");
            strSql.Append(" LEFT JOIN EI_MRelS EIMS ON EIM.AccountNumber=EIMS.TID ");
            strSql.Append(" LEFT JOIN EI_GRelM EIG ON EIM.AccountNumber=EIG.TID  ");
            strSql.Append(" LEFT JOIN EI_GRelS EIGS ON EIG.GID=EIGS.GID ");
            strSql.Append(" where   EIM.DelFlag=0 ");
            strSql.Append(" and OrgID=@OrgID ");
            strSql.Append(" GROUP BY EIM.AccountNumber ");
            strSql.Append(" HAVING  ISNULL(MSID) AND ISNULL(GID)"); //AND ISNULL(GSID)
            strSql.Append(") AS TOTAL;");
            #endregion
            //strSql.Append(
            // " select -2 as ID,'未关联老师' as `Name`, count(1) as Count from  EI_ManagerInfo where AccountNumber not IN( select TID from EI_MRelS ) ");
            //strSql.Append(" and OrgID=@OrgID AND DelFlag=0 ;");


            //所有老师
            strSql.Append("SELECT -1 as ID,'所有老师' AS Name, COUNT(1) as Count FROM EI_ManagerInfo EIM where  EIM.DelFlag=0");
            strSql.Append(" and OrgID=@OrgID;");

            //获取所有没有教师的分组
            #region MyRegion
            //strSql.Append("select EIG.`Name`,EIG.ID, 0 AS Count  FROM EI_GroupInfo AS EIG LEFT JOIN EI_GRelM AS EIGM ON EIG.ID=EIGM.GID WHERE ISNULL(EIGM.GID)");
            //strSql.Append("and EIG.OrgID=@OrgID "); 
            #endregion
            strSql.Append(" SELECT ID, Name,0 Count from EI_GroupInfo ");
            strSql.Append(" where  OrgID=@OrgID ");
            strSql.Append(" AND  ID not in ");
            strSql.Append(
                " (  SELECT GID from EI_ManagerInfo a INNER JOIN EI_GRelM b on  a.AccountNumber=b.TID  and a.OrgID=@OrgID AND a.DelFlag=0 ) ;");



            MySqlParameter[] parameters = {
					new MySqlParameter("@OrgID", MySqlDbType.Int32,11)};
            parameters[0].Value = orgID;

            return MySQLHelper.Query(strSql.ToString(), parameters);

        }

        //public DataSet GetTeacherGroupByOrgIDAndCreateBy(int orgID, int CreateBy)
        //{
        //    StringBuilder strSql = new StringBuilder();
        //    strSql.Append("SELECT EIG.ID,case WHEN ISNULL(EIG.Name) then '未分组老师' ELSE EIG.Name END Name,");
        //    strSql.Append("case WHEN ISNULL(EIG.Name) then 1 ELSE 0 END OrderByNum,COUNT(1) as Count  FROM EI_ManagerInfo EIM ");
        //    strSql.Append("LEFT JOIN EI_GRelM EIGM ON EIM.AccountNumber=EIGM.TID LEFT JOIN EI_GroupInfo EIG ON EIGM.GID=EIG.ID  AND EIG.CreateBy=@CreateBy");
        //    strSql.Append(" where EIM.OrgID=@OrgID  and EIM.DelFlag=0 and EIM.CreateBy=@CreateBy GROUP BY EIG.`Name`");
        //    strSql.Append(" ORDER BY OrderByNum ASC ; ");



        //    //未关联学生的老师
        //    #region MyRegion
        //    strSql.Append("SELECT  -2 as ID,'未关联老师' as `Name`,count(1) as Count FROM (");
        //    strSql.Append("select ");
        //    strSql.Append(" MAX(EIMS.SID) AS MSID,");
        //    //strSql.Append(" MAX(EIGS.SID) AS GSID, ");
        //    strSql.Append("MAX(EIG.GID) AS GID ");
        //    strSql.Append(" FROM EI_ManagerInfo EIM ");
        //    strSql.Append(" LEFT JOIN EI_MRelS EIMS ON EIM.AccountNumber=EIMS.TID ");
        //    strSql.Append(" LEFT JOIN EI_GRelM EIG ON EIM.AccountNumber=EIG.TID  ");
        //    strSql.Append(" LEFT JOIN EI_GRelS EIGS ON EIG.GID=EIGS.GID ");
        //    strSql.Append(" where   EIM.DelFlag=0 ");
        //    strSql.Append(" and OrgID=@OrgID ");
        //    strSql.Append(" and CreateBy=@CreateBy ");
        //    strSql.Append(" GROUP BY EIM.AccountNumber ");
        //    strSql.Append(" HAVING  ISNULL(MSID) AND ISNULL(GID) ");//AND ISNULL(GSID)
        //    strSql.Append(") AS TOTAL;");
        //    #endregion
        //    // strSql.Append(
        //    //" select -2 as ID,'未关联老师' as `Name`, count(1) as Count from  EI_ManagerInfo where AccountNumber not IN( select TID from EI_MRelS )");
        //    // strSql.Append(" and OrgID=@OrgID AND DelFlag=0 ");
        //    // strSql.Append(" AND CreateBy=@CreateBy ;");

        //    //所有老师
        //    strSql.Append("SELECT -1 as ID,'所有老师' AS Name, COUNT(1) as Count FROM EI_ManagerInfo EIM where  EIM.DelFlag=0 ");
        //    strSql.Append(" and OrgID=@OrgID AND DelFlag=0  ");
        //    strSql.Append(" and CreateBy=@CreateBy ;");

        //    //获取所有没有教师的分组
        //    #region MyRegion
        //    //strSql.Append("select EIG.`Name`,EIG.ID, 0 AS Count  FROM EI_GroupInfo AS EIG LEFT JOIN EI_GRelM AS EIGM ON EIG.ID=EIGM.GID WHERE ISNULL(EIGM.GID)");
        //    //strSql.Append("and EIG.OrgID=@OrgID ");
        //    //strSql.Append(" and EIG.CreateBy=@CreateBy ;"); 
        //    #endregion
        //    strSql.Append(" SELECT ID, Name,0 Count from EI_GroupInfo ");
        //    strSql.Append(" where  OrgID=@OrgID ");
        //    strSql.Append(" AND CreateBy=@CreateBy ");
        //    strSql.Append(" AND  ID not in ");
        //    strSql.Append(
        //        " (  SELECT GID from EI_ManagerInfo a INNER JOIN EI_GRelM b on  a.AccountNumber=b.TID  and a.OrgID=@OrgID AND a.CreateBy=@CreateBy AND a.DelFlag=0  ) ;");



        //    MySqlParameter[] parameters = {
        //            new MySqlParameter("@OrgID", MySqlDbType.Int32,11),
        //            new MySqlParameter("@CreateBy",MySqlDbType.Int32,11)                                         
        //                                  };
        //    parameters[0].Value = orgID;
        //    parameters[1].Value = CreateBy;


        //    return MySQLHelper.Query(strSql.ToString(), parameters);

        //}

        public DataSet GetTeacherGroupByOrgIDAndCreateBy(int orgID, int createBy)
        {
            StringBuilder strSql = new StringBuilder();

            #region 所有老师
            strSql.Append("SELECT -1 as ID,'所有老师' AS Name, COUNT(1) as Count FROM EI_ManagerInfo EIM ");
            strSql.Append(" WHERE EIM.OrgID=@OrgID AND EIM.DelFlag=0 and EIM.CreateBy=@CreateBy  ");
            #endregion

            strSql.Append(" UNION ALL ");

            #region 已分组
            strSql.Append(" SELECT * FROM (");
            strSql.Append(" SELECT EIG.ID, EIG.Name, COUNT(EIGM.TID) COUNT  FROM EI_GroupInfo AS EIG LEFT JOIN EI_GRelM AS EIGM ON EIG.ID=EIGM.GID ");
            strSql.Append(" WHERE EIG.OrgID=@OrgID AND EIG.DelFlag=0 AND EIG.CreateBy=@CreateBy ");
            strSql.Append(" GROUP BY EIG.ID   ");
            strSql.Append(" ORDER BY EIG.CreateTime DESC  ) t");

            #endregion
                
            strSql.Append(" UNION ALL ");

            #region 未分组
            strSql.Append("  SELECT 0 ID,'未分组老师' NAME ,COUNT(EIM.`AccountNumber`) COUNT FROM EI_ManagerInfo EIM ");
            strSql.Append(" LEFT JOIN EI_GRelM  EIGM ON  EIM.AccountNumber = EIGM.TID  ");
            strSql.Append(" WHERE EIM.DelFlag=0 AND EIM.CreateBy=@CreateBy AND EIGM.GID IS NULL ");
            #endregion

            strSql.Append(" UNION ALL ");

            #region 未关联老师的学生
            //未关联老师的学生
            strSql.Append(
                @" SELECT  - 2 ID,  '未关联老师' NAME,  COUNT(1) COUNT FROM EI_ManagerInfo EIM WHERE EIM.AccountNumber NOT IN 
                      (SELECT 
                        TID 
                      FROM
                        EI_GRelM) 
                      AND EIM.AccountNumber NOT IN 
                      (SELECT 
                        TID 
                      FROM
                        EI_MRelS)");
            strSql.Append(" and EIM.OrgID=@OrgID AND EIM.DelFlag=0 AND EIM.CreateBy=@CreateBy ; ");
            #endregion

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@OrgID", MySqlDbType.Int32, 11),
                new MySqlParameter("@CreateBy", MySqlDbType.VarChar, 40)
            };
            parameters[0].Value = orgID;
            parameters[1].Value = createBy;
            return MySQLHelper.Query(strSql.ToString(), parameters);

        }
        public DataSet GetTeacherGroupList(int TID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select EIG.`Name`,EIGM.GID as ID,EIGM.TID FROM  EI_GRelM AS EIGM INNER JOIN EI_GroupInfo AS EIG on EIGM.GID= EIG.ID");
            strSql.Append(" where EIGM.TID=@TID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@TID", MySqlDbType.Int32,11)                         
                                          };
            parameters[0].Value = TID;

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 获取和教师关联的学生
        /// </summary>
        /// <param name="TID"></param>
        /// <returns></returns>
        public DataSet GetStudentByTID(int TID)
        {
            StringBuilder strSql = new StringBuilder();
            //学生分组 老师分组 关联
            strSql.Append(" SELECT EIM.AccountNumber AS TID, EIS.MfgID AS SID,EIS.`Name` AS SName,EIGS.GID FROM EI_GRelM EIGM ");
            strSql.Append(" INNER JOIN EI_ManagerInfo EIM ON EIGM.TID=EIM.AccountNumber ");
            strSql.Append(" INNER JOIN EI_GRelS EIGS ON EIGM.GID=EIGS.GID ");
            strSql.Append(" INNER JOIN EI_StudentInfo EIS ON EIGS.SID=EIS.MfgID ");
            strSql.Append(" WHERE EIS.DelFlag=0 AND EIM.AccountNumber=@TID ;");


            //学生老师关联
            strSql.Append(" SELECT EIM.AccountNumber AS TID, EIS.MfgID AS SID,EIS.`Name` AS SName FROM EI_MRelS EIMS  ");
            strSql.Append(" INNER JOIN EI_StudentInfo EIS ON EIMS.SID=EIS.MfgID ");
            strSql.Append(" INNER JOIN EI_ManagerInfo EIM ON EIM.AccountNumber=EIMS.TID ");
            strSql.Append(" Where EIM.AccountNumber=@TID ;");

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@TID", MySqlDbType.VarChar, 40)
            };
            parameters[0].Value = TID;
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 根据教师ID获取未关联的分组
        /// </summary>
        /// <param name="tids"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public DataSet GetStuNotRelGroupByTID(string tids, string name, int orgID, int createBy = 0)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT EIG.ID,EIG.`Name` FROM EI_GroupInfo EIG ");
            strSql.Append(" WHERE OrgID=@OrgID AND EIG.DelFlag=0");
            strSql.AppendFormat(" AND EIG.ID NOT IN (select EIGM.GID FROM  EI_GRelM EIGM WHERE FIND_IN_SET(TID,@tids) GROUP BY EIGM.GID  HAVING COUNT(EIGM.GID)={0} )  ", (tids.Split(',').Length - 1));

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@tids", MySqlDbType.VarChar, 2000),
                new MySqlParameter("@Name", MySqlDbType.VarChar, 40),
                new MySqlParameter("@OrgID",MySqlDbType.Int32,1),
                 new MySqlParameter("@createBy",MySqlDbType.Int32,1)
            };

            parameters[0].Value = tids.Substring(0, tids.Length - 1);
            parameters[1].Value = name;
            parameters[2].Value = orgID;

            if (createBy > 0)
            {
                strSql.Append(" AND CreateBy = @createBy");
                parameters[3].Value = createBy;
            }
            if (!string.IsNullOrEmpty(name))
            {
                strSql.Append(" AND Name=@Name");
            }

            return MySQLHelper.Query(strSql.ToString(), parameters);

        }

        /// <summary>
        /// 根据教师ID获取未关联分组的树结构
        /// </summary>
        /// <param name="tids"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public List<TeacherTreeModel> GetNotRelGroupForTree(string sql, int orgID, int createBy = 0)
        {

            StringBuilder strSql = new StringBuilder();

            strSql.Append(sql);

            strSql.Append(new ManagerInfoDal().GetTeacherGroupTreeSql(orgID, createBy));

            return MySQLHelper.ExecuteStatementList<List<TeacherTreeModel>>(strSql.ToString(), (dr) =>
            {
                List<TeacherTreeModel> tlist = new List<TeacherTreeModel>();
                List<string> gids = new List<string>();
                if (dr.HasRows) //同步学习
                {
                    while (dr.Read())
                    {
                        gids.Add(dr.GetInt32("ID").ToString());

                    }
                }
                if (dr.NextResult())
                {
                    while (dr.Read())
                    {
                        tlist.Add(new TeacherTreeModel
                        {
                            CreateBy = dr.IsDBNull(0) ? null : dr.GetInt32("CreateBy").ToString(),
                            ID = dr.GetInt32("ID"),
                            Name = dr.GetString("Name"),
                            Level = dr.GetInt32("Level")
                        });

                    }
                }
                tlist = tlist.Where(m => (gids.Contains(m.ID.ToString()) || m.Level == 0 || m.Level == 1)).ToList();
                return tlist;
            }, null, CommandType.Text);

        }



        public string GetTeacherNotRelGroupSql(string tids, string name, int orgID, int createBy = 0)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT EIG.ID,EIG.`Name` FROM EI_GroupInfo EIG ");
            strSql.AppendFormat(" WHERE OrgID='{0}' AND EIG.DelFlag=0", orgID);
            strSql.AppendFormat(" AND EIG.ID NOT IN (select EIGM.GID FROM  EI_GRelM EIGM WHERE FIND_IN_SET(TID,'{0}') GROUP BY EIGM.GID  HAVING COUNT(EIGM.GID)={1} )  ", tids, (tids.Split(',').Length - 1));

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@tids", MySqlDbType.VarChar, 2000),
                new MySqlParameter("@Name", MySqlDbType.VarChar, 40),
                new MySqlParameter("@OrgID",MySqlDbType.Int32,1),
                 new MySqlParameter("@createBy",MySqlDbType.Int32,1)
            };

            parameters[0].Value = tids.Substring(0, tids.Length - 1);
            parameters[1].Value = name;
            parameters[2].Value = orgID;

            if (createBy > 0)
            {
                strSql.AppendFormat(" AND CreateBy = '{0}'", createBy);
                parameters[3].Value = createBy;
            }
            if (!string.IsNullOrEmpty(name))
            {
                strSql.AppendFormat(" AND Name={0}", name);
            }
            strSql.Append(";");
            return strSql.ToString();


        }

        #region 根据魔方格ID和机构ID获取未关联的老师
        /// <summary>
        /// 根据教师ID获取未关联学生
        /// </summary>
        /// <param name="mfgID">魔方格ID</param>
        /// <param name="orgID">机构ID</param>
        /// <param name="name">老师名字</param>
        /// <returns></returns>
        public DataSet GetStuNotRelTeacByTID(string tid, int orgID, string name, int createBy = 0)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT MfgID,OrgID,SType,Name,ReamrkName,Shool,Class,MasterName,MasterPhone,Gender,GradeID,AcaStru,BirthDate,CardNumber,QQ,Phone,Address,ImgUrl,RoleTypeID,UpdateTime,RenewTime,RenewRoleID,ExpirDate,CreateTime,CreateBy,DelFlag,Remark,FirstLogin from EI_StudentInfo EIS ");
            strSql.Append(" WHERE OrgID=@OrgID  ");
            //strSql.Append(" AND  EIS.MfgID  NOT IN (SELECT  SID FROM EI_MRelS WHERE FIND_IN_SET (TID,@TID)) ");//老师与学生关联
            strSql.AppendFormat(" AND  EIS.MfgID  NOT IN (SELECT  SID FROM EI_MRelS WHERE FIND_IN_SET (TID,@TID) GROUP BY SID  HAVING COUNT(SID)={0})  ", (tid.Split(',').Length - 1));//老师与学生关联

            //strSql.Append(" AND EIS.MfgID NOT IN ( SELECT b.TID FROM  EI_GRelS a INNER JOIN  EI_GRelM b ON a.GID=b.GID WHERE FIND_IN_SET (b.TID,@TID) ) ");//学生分组 老师分组
            if (!string.IsNullOrEmpty(name))
            {
                strSql.Append(" AND Name=@Name ");
            }
            if (createBy > 0)
            {
                strSql.Append(" AND CreateBy=@CreateBy "); //添加创建者过滤
            }

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@TID", MySqlDbType.VarChar, 2000),
                new MySqlParameter("@OrgID", MySqlDbType.Int32, 11),
                new MySqlParameter("@Name", MySqlDbType.VarChar, 40),
                new MySqlParameter("@CreateBy", MySqlDbType.VarChar, 40)
            };

            parameters[0].Value = tid.Substring(0, tid.Length - 1);
            parameters[1].Value = orgID;
            parameters[2].Value = name;
            parameters[3].Value = createBy;

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        #endregion
        #region 批量添加多个老师到多个组
        /// <summary>
        /// 批量添加多个老师到多个组
        /// </summary>
        /// <param name="mfgIDs">学生IDs</param>
        /// <param name="groupIDs">分组IDs</param>
        /// <returns></returns>
        public int Addteachers2Groups(string tids, string groupIDs)
        {
            var _commonDal = new CommonDal();
            // INSERT INTO EI_GRelS VALUES (GID,SID),(1,'22222222') 批量插入语句
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            StringBuilder strSql = new StringBuilder();
            StringBuilder sb = new StringBuilder();
            StringBuilder delSql = new StringBuilder();

            int i = 0, j = 0;
            foreach (var groupID in groupIDs.Substring(0, groupIDs.Length - 1).Split(','))
            {
                j = 0;
                sb.Clear();

                sb.Append(" INSERT INTO EI_GRelM(GID,TID) VALUES ");

                foreach (var mfgID in tids.Substring(0, tids.Length - 1).Split(','))
                {
                    delSql.AppendFormat(" DELETE FROM EI_GRelM WHERE GID=@GID{0} AND TID=@TID{1} ; ", i, j);//删除
                    sb.AppendFormat(" (@GID{0},@TID{1}),", i, j);
                    if (i == 0)
                    {
                        dictionary.Add("TID" + j, mfgID);
                    }

                    j++;
                }
                dictionary.Add("GID" + i, groupID);
                strSql.Append(sb.ToString().Substring(0, sb.ToString().Length - 1) + "; ");
                i++;
            }

            return _commonDal.GetNumBySqlAndDic(delSql.ToString() + strSql.ToString().Substring(0, strSql.ToString().Length - 1), dictionary);
        }

        #endregion






    }
}
