/*
 * author:杨礼文;
 * function:学生分组关联表Dal
 * date:2015-04-22
 */

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Mfg.EI.Common;
using Mfg.EI.DBHelper;
using Mfg.EI.Entity;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL
{
    public partial class GRelSDal
    {
        private CommonDal _commonDal = new CommonDal();//公用的Dal private   _commonDal =new 

        public GRelSDal()
        {
        }

        #region  BasicMethod



        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_GRelS model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_GRelS(");
            strSql.Append("GID,SID)");
            strSql.Append(" values (");
            strSql.Append("@GID,@SID)");
            MySqlParameter[] parameters =
            {
                new MySqlParameter("@GID", MySqlDbType.Int32, 11),
                new MySqlParameter("@SID", MySqlDbType.VarChar, 40)
            };
            parameters[0].Value = model.GID;
            parameters[1].Value = model.SID;

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
        public bool Update(EI_GRelS model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_GRelS set ");
            strSql.Append("GID=@GID,");
            strSql.Append("SID=@SID");
            strSql.Append(" where ");
            MySqlParameter[] parameters =
            {
                new MySqlParameter("@GID", MySqlDbType.Int32, 11),
                new MySqlParameter("@SID", MySqlDbType.VarChar, 40)
            };
            parameters[0].Value = model.GID;
            parameters[1].Value = model.SID;

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
        public bool Delete()
        {
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_GRelS ");
            strSql.Append(" where ");
            MySqlParameter[] parameters =
            {
            };

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
        public EI_GRelS GetModel()
        {
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select GID,SID from EI_GRelS ");
            strSql.Append(" where ");
            MySqlParameter[] parameters =
            {
            };

            EI_GRelS model = new EI_GRelS();
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
        public EI_GRelS DataRowToModel(DataRow row)
        {
            EI_GRelS model = new EI_GRelS();
            if (row != null)
            {
                if (row["GID"] != null && row["GID"].ToString() != "")
                {
                    model.GID = int.Parse(row["GID"].ToString());
                }
                if (row["SID"] != null)
                {
                    model.SID = row["SID"].ToString();
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
            strSql.Append("select GID,SID ");
            strSql.Append(" FROM EI_GRelS ");
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
            strSql.Append("select count(1) FROM EI_GRelS ");
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
            strSql.Append(")AS Row, T.*  from EI_GRelS T ");
            if (!string.IsNullOrEmpty(strWhere.Trim()))
            {
                strSql.Append(" WHERE " + strWhere);
            }
            strSql.Append(" ) TT");
            strSql.AppendFormat(" WHERE TT.Row between {0} and {1}", startIndex, endIndex);
            return MySQLHelper.Query(strSql.ToString());
        }

        /*
        /// <summary>
        /// 分页获取数据列表
        /// </summary>
        public DataSet GetList(int PageSize,int PageIndex,string strWhere)
        {
            MySqlParameter[] parameters = {
                    new MySqlParameter("@tblName", MySqlDbType.VarChar, 255),
                    new MySqlParameter("@fldName", MySqlDbType.VarChar, 255),
                    new MySqlParameter("@PageSize", MySqlDbType.Int32),
                    new MySqlParameter("@PageIndex", MySqlDbType.Int32),
                    new MySqlParameter("@IsReCount", MySqlDbType.Bit),
                    new MySqlParameter("@OrderType", MySqlDbType.Bit),
                    new MySqlParameter("@strWhere", MySqlDbType.VarChar,1000),
                    };
            parameters[0].Value = "EI_GRelS";
            parameters[1].Value = "ID";
            parameters[2].Value = PageSize;
            parameters[3].Value = PageIndex;
            parameters[4].Value = 0;
            parameters[5].Value = 0;
            parameters[6].Value = strWhere;	
            return MySQLHelper.RunProcedure("UP_GetRecordByPage",parameters,"ds");
        }*/

        #endregion  BasicMethod

        #region  ExtensionMethod

        #endregion  ExtensionMethod


        #region 获取该管理员下的学生分组
        /// <summary>
        /// 获取该管理员下的学生分组
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        public DataSet GetStudentGroup(int orgID, string createBy)
        {
            //EI_StudentInfo   EI_GRelS  EI_GroupInfo  EI_MRelS师生关联表

            StringBuilder strSql = new StringBuilder();

            #region 所有学生
            strSql.Append(
                " SELECT -1 ID,'所有学生' Name ,COUNT(1) Count from  EI_StudentInfo where OrgID=@OrgID AND DelFlag=0 AND CreateBy=@CreateBy  ");
            #endregion

            strSql.Append(" UNION ALL ");

            #region 已分组

            //strSql.Append(" SELECT * FROM (");
            //strSql.Append(" SELECT a.ID, a.Name, COUNT(b.SID) Count   ");
            //strSql.Append(" FROM EI_GroupInfo a ");
            //strSql.Append(" LEFT JOIN EI_GRelS b ON b.GID=a.ID ");
            //strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0 AND a.CreateBy=@CreateBy ");
            //strSql.Append(" GROUP BY a.ID ");
            //strSql.Append(" ORDER BY CreateTime DESC  ) t");

            strSql.Append(" SELECT * FROM (");
            strSql.Append(" SELECT a.ID, a.Name, COUNT(d.SID) Count   ");
            strSql.Append(" FROM EI_GroupInfo a ");
            strSql.Append(" LEFT JOIN ");

            strSql.Append(" (SELECT * from EI_GRelS b INNER JOIN EI_StudentInfo c ON c.MfgID=b.SID AND c.DelFlag=0) d ");
            strSql.Append(" ON d.GID=a.ID ");

            strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0 AND a.CreateBy=@CreateBy ");
            strSql.Append(" GROUP BY a.ID ");
            strSql.Append(" ORDER BY a.CreateTime DESC  ) t");


            #endregion

            strSql.Append(" UNION ALL ");

            #region 未分组
            strSql.Append(" SELECT 0 ID,'未分组学生' Name ,COUNT(a.MfgID) Count FROM EI_StudentInfo a    ");
            strSql.Append(" LEFT JOIN EI_GRelS b ON b.SID=a.MfgID ");
            strSql.Append(" WHERE a.DelFlag=0 AND a.CreateBy=@CreateBy AND b.GID IS NULL ");
            #endregion

            strSql.Append(" UNION ALL ");

            #region 未关联老师的学生
            //未关联老师的学生
            strSql.Append(
                " select -2 ID,'未关联学生' Name ,COUNT(1) Count from  EI_StudentInfo where MfgID not IN ( select SID from EI_GRelS ) and MfgID not IN( select SID from EI_MRelS )");
            //strSql.Append(
            //  " select count(1) Count from  EI_StudentInfo where MfgID not IN( select SID from EI_MRelS )");
            strSql.Append(" and OrgID=@OrgID AND DelFlag=0 AND CreateBy=@CreateBy ; ");
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
        #endregion

        #region 根据机构id获取学生分组

        /// <summary>
        /// 根据机构id获取学生分组
        /// </summary>
        /// <param name="orgID">机构id</param>
        /// <returns></returns>
        public DataSet GetStudentGroupByOrgID(int orgID, string createBy)
        {
            //EI_StudentInfo   EI_GRelS  EI_GroupInfo  EI_MRelS师生关联表

            StringBuilder strSql = new StringBuilder();

            #region 已分组和未分组
            strSql.Append(" SELECT c.ID, case WHEN ISNULL(c.Name) then '未分组' ");
            strSql.Append(" ELSE c.Name END Name,");
            strSql.Append(" case WHEN ISNULL(c.Name) then 1");
            strSql.Append(" ELSE 0 END OrderByNum,");
            strSql.Append(" COUNT(a.MfgID) Count ");
            //分组
            strSql.Append(" from EI_StudentInfo a ");
            strSql.Append(" LEFT  JOIN EI_GRelS b on a.MfgID=b.SID ");
            strSql.Append(" LEFT JOIN EI_GroupInfo c on b.GID=c.ID AND c.OrgID=a.OrgID ");
            if (!string.IsNullOrEmpty(createBy))
            {
                strSql.Append(" AND c.CreateBy=@CreateBy  ");//分组添加创建者过滤
            }
            strSql.Append(" WHERE a.OrgID=@OrgID AND a.DelFlag=0 ");


            if (!string.IsNullOrEmpty(createBy))
            {
                strSql.Append(" AND a.CreateBy=@CreateBy ");//添加创建者过滤
            }


            strSql.Append(" GROUP BY  c.Name,c.ID ");
            strSql.Append(" ORDER BY OrderByNum ASC ; ");
            #endregion

            #region 获取所有的学生
            //获取所有的学生
            strSql.Append(
                " select count(1) Count from  EI_StudentInfo where OrgID=@OrgID AND DelFlag=0 ");
            if (!string.IsNullOrEmpty(createBy))
            {
                strSql.Append(" AND CreateBy=@CreateBy "); //添加创建者过滤
            }
            strSql.Append(";");
            #endregion

            #region 未关联老师的学生
            //未关联老师的学生
            strSql.Append(
                " select count(1) Count from  EI_StudentInfo where MfgID not IN ( select SID from EI_GRelS ) and MfgID not IN( select SID from EI_MRelS )");
            //strSql.Append(
            //  " select count(1) Count from  EI_StudentInfo where MfgID not IN( select SID from EI_MRelS )");
            strSql.Append(" and OrgID=@OrgID AND DelFlag=0 ");
            if (!string.IsNullOrEmpty(createBy))
            {
                strSql.Append(" AND CreateBy=@CreateBy "); //添加创建者过滤
            }
            strSql.Append(";");
            #endregion

            #region 该分组下没有学生
            //该分组下没有学生
            strSql.Append(" SELECT ID, Name,0 Count from EI_GroupInfo ");
            strSql.Append(" where  OrgID=@OrgID ");

            if (!string.IsNullOrEmpty(createBy))
            {
                strSql.Append(" AND CreateBy=@CreateBy "); //添加创建者过滤
            }

            strSql.Append(" AND  ID not in ");
            strSql.Append(
                " (  SELECT GID from EI_StudentInfo a INNER JOIN EI_GRelS b on  a.MfgID=b.SID  and a.OrgID=@OrgID  AND a.DelFlag=0 ");
            if (!string.IsNullOrEmpty(createBy))
            {
                strSql.Append(" AND a.CreateBy=@CreateBy "); //添加创建者过滤
            }
            strSql.Append(" );");
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
        #endregion

        #region 根据老师ID获取学生分组
        /// <summary>
        /// 根据老师ID获取学生分组
        /// </summary>
        /// <param name="tID"></param>
        /// <returns></returns>
        public DataSet GetStudentGroup(string tID)
        {
            StringBuilder strSql = new StringBuilder();

            #region 所在分组
            strSql.Append(" SELECT a.ID,a.Name,COUNT(a.ID)Count ");
            strSql.Append(" FROM EI_GroupInfo a ");
            strSql.Append(" INNER JOIN EI_GRelM b on b.GID=a.ID AND b.TID=@TID ");
            strSql.Append(" INNER JOIN EI_GRelS c ON c.GID=a.ID ");
            strSql.Append(" GROUP BY a.ID,a.Name ; ");
            #endregion

            #region 关联学生
            strSql.Append(" SELECT  count(1) Count ");
            strSql.Append(" FROM EI_MRelS ");
            strSql.Append(" where TID=@TID ; ");
            #endregion

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@TID", MySqlDbType.VarChar, 40){Direction = ParameterDirection.InputOutput,Value=tID}
            };
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }


        #endregion

        #region 根据机构ID获取未分组学生

        /// <summary>
        /// 根据机构ID获取未分组学生
        /// </summary>
        /// <param name="orgID"></param>
        /// <returns></returns>
        public DataSet GetStuNotInGroupByOrgID(int orgID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select MfgID,OrgID,SType,Name,ReamrkName,Shool,Class,MasterName,MasterPhone,Gender,GradeID,AcaStru,BirthDate,CardNumber,QQ,Phone,Address,ImgUrl,RoleTypeID,UpdateTime,RenewTime,RenewRoleID,ExpirDate,CreateTime,CreateBy,DelFlag,Remark,FirstLogin from EI_StudentInfo ");
            strSql.Append(" where MfgID not IN ( select SID from EI_GRelS ) ");
            strSql.Append(" AND OrgID=@OrgID AND DelFlag=0 ");

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@OrgID", MySqlDbType.Int32, 11)
            };
            parameters[0].Value = orgID;

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        #endregion

        #region 根据机构ID和分组ID获取不在该组的学生
        /// <summary>
        ///  根据机构ID和分组ID获取不在该组的学生
        /// </summary>
        /// <param name="orgID"></param>
        /// <param name="groupID"></param>
        /// <returns></returns>
        public DataSet GetStuNotInGroupByOrgIDAndGroupID(int orgID, int groupID, string createBy)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select MfgID,OrgID,SType,Name,ReamrkName,Shool,Class,MasterName,MasterPhone,Gender,GradeID,AcaStru,BirthDate,CardNumber,QQ,Phone,Address,ImgUrl,RoleTypeID,UpdateTime,RenewTime,RenewRoleID,ExpirDate,CreateTime,CreateBy,DelFlag,Remark,FirstLogin from EI_StudentInfo ");
            strSql.Append(" where MfgID not IN ( select SID from EI_GRelS WHERE GID=@GID ) ");
            strSql.Append(" AND OrgID=@OrgID AND DelFlag=0 ");
            if (!string.IsNullOrEmpty(createBy))
            {
                strSql.Append(" AND CreateBy=@CreateBy "); //添加创建者过滤
            }

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@GID", MySqlDbType.Int32, 11),
                new MySqlParameter("@OrgID", MySqlDbType.Int32, 11),
                new MySqlParameter("@CreateBy", MySqlDbType.VarChar, 40)
            };
            parameters[0].Value = groupID;
            parameters[1].Value = orgID;
            parameters[2].Value = createBy;

            return MySQLHelper.Query(strSql.ToString(), parameters);
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
            //  INSERT INTO EI_GRelS VALUES (1,'11111111'),(1,'22222222') 批量插入语句
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            dictionary.Add("groupid", groupid);
            StringBuilder strSql = new StringBuilder();

            strSql.Append(" INSERT INTO EI_GRelS VALUES ");
            string[] mfgID = mfgIDs.Substring(0, mfgIDs.Length - 1).Split(',');
            for (int i = 0; i < mfgID.Length; i++)
            {
                strSql.Append(" (@groupid,@mfgID" + i + "),");
                dictionary.Add("mfgID" + i, mfgID[i]);
            }

            return _commonDal.GetNumBySqlAndDic(strSql.ToString().Substring(0, strSql.ToString().Length - 1), dictionary);
        }

        #endregion

        #region 根据魔方格ID获取该生分组

        /// <summary>
        /// 根据魔方格ID获取该生分组
        /// </summary>
        /// <param name="mfgID"></param>
        /// <returns></returns>
        public DataSet GetStudentGroupByMfgID(string mfgID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT a.SID,b.ID,b.Name FROM EI_GRelS a ");
            strSql.Append(" INNER JOIN EI_GroupInfo b ");
            strSql.Append(" ON a.GID=b.ID ");
            strSql.Append(" where a.SID=@mfgID");

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@mfgID", MySqlDbType.VarChar, 40)
            };
            parameters[0].Value = mfgID;
            return MySQLHelper.Query(strSql.ToString(), parameters);
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
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_GRelS ");
            strSql.Append(" where GID=@GID and SID=@SID  ");
            MySqlParameter[] parameters = {
                                             new MySqlParameter("@GID", MySqlDbType.Int32,11),
                                             new MySqlParameter("@SID", MySqlDbType.VarChar,40)
			};
            parameters[0].Value = gID;
            parameters[1].Value = sID;
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

        #region 根据魔方格ID获取为关联的分组
        /// <summary>
        /// 根据魔方格ID获取未关联的分组
        /// </summary>
        /// <param name="mfgIDs"></param>
        /// <param name="name"></param>
        /// <returns></returns>
        public DataSet GetStuNotRelGroupByMfgID(string mfgIDs, string name, string createBy, int orgID)
        {
            //a.SID,b.ID,b.Name
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select ID, Name from EI_GroupInfo   ");
            strSql.Append(" where OrgID=@OrgID  ");
            strSql.AppendFormat(" AND ID NOT IN ( select GID FROM EI_GRelS WHERE  FIND_IN_SET (SID ,@mfgID ) GROUP BY GID  HAVING COUNT(GID)={0}) ", (mfgIDs.Split(',').Length - 1));



            MySqlParameter[] parameters =
            {
                new MySqlParameter("@mfgID", MySqlDbType.VarChar, 2000),
                new MySqlParameter("@Name", MySqlDbType.VarChar, 40),
                new MySqlParameter("@CreateBy", MySqlDbType.VarChar, 40),
                 new MySqlParameter("@OrgID", MySqlDbType.Int32, 11)
            };

            parameters[0].Value = mfgIDs.Substring(0, mfgIDs.Length - 1);
            parameters[1].Value = name;
            parameters[2].Value = createBy;
            parameters[3].Value = orgID;

            if (!string.IsNullOrEmpty(name))
            {
                strSql.Append(" AND Name=@Name ");
            }
            if (!string.IsNullOrEmpty(createBy))
            {
                strSql.Append(" AND CreateBy=@CreateBy "); //添加创建者过滤
            }

            return MySQLHelper.Query(strSql.ToString(), parameters);

        }

        #endregion

        #region 获取学生未关联组的Sql
        /// <summary>
        /// 获取学生未关联组的Sql
        /// </summary>
        /// <param name="sIDs"></param>
        /// <param name="orgID"></param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        public string GetNotRelGroupSql(string sIDs, int orgID, int createBy)
        {

            StringBuilder strSql = new StringBuilder();

            strSql.Append(" SELECT ID,Name FROM EI_GroupInfo ");
            strSql.AppendFormat(" WHERE OrgID='{0}' AND DelFlag=0", orgID);
            strSql.AppendFormat(" AND ID NOT IN (select GID FROM EI_GRelS WHERE FIND_IN_SET(SID,'{0}') GROUP BY GID  HAVING COUNT(GID)={1} )  ", sIDs, (sIDs.Split(',').Length - 1));

            if (createBy > 0)
            {
                strSql.AppendFormat(" AND CreateBy = '{0}'", createBy);
            }
            strSql.Append(";");
            return strSql.ToString();
        }
        #endregion

        #region 批量添加多个学生到多个组
        /// <summary>
        /// 批量添加多个学生到多个组
        /// </summary>
        /// <param name="mfgIDs">学生IDs</param>
        /// <param name="groupIDs">分组IDs</param>
        /// <returns></returns>
        public int AddStus2Groups(string mfgIDs, string groupIDs)
        {
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
                sb.Append(" INSERT INTO EI_GRelS VALUES ");

                foreach (var mfgID in mfgIDs.Substring(0, mfgIDs.Length - 1).Split(','))
                {
                    delSql.AppendFormat(" DELETE FROM EI_GRelS WHERE GID=@GID{0} AND SID=@SID{1} ; ", i, j);//删除
                    sb.AppendFormat(" (@GID{0},@SID{1}),", i, j);
                    if (i == 0)
                    {
                        dictionary.Add("SID" + j, mfgID);
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

        #region 根据魔方ID获取该生与老师的关联
        /// <summary>
        /// 根据魔方ID获取该生与老师的关联
        /// </summary>
        /// <param name="mfgID">魔方ID</param>
        /// <returns></returns>
        public DataSet GetSutRelTeacByMfgID(string mfgID)
        {
            StringBuilder strSql = new StringBuilder();
            //学生分组 老师分组 关联
            strSql.Append(" SELECT b.SID,b.GID,d.Name TName FROM EI_StudentInfo a  ");
            strSql.Append(" INNER JOIN EI_GRelS b  on a.MfgID=b.SID ");
            strSql.Append(" INNER JOIN EI_GRelM c ON c.GID=b.GID ");
            strSql.Append(" INNER JOIN EI_ManagerInfo d ON d.AccountNumber=c.TID ");
            strSql.Append(" Where a.MfgID=@mfgID AND a.DelFlag=0 ;");

            //学生老师关联
            strSql.Append(" SELECT b.SID,b.TID,c.Name TName FROM EI_StudentInfo a  ");
            strSql.Append(" INNER JOIN EI_MRelS b on a.MfgID=b.SID ");
            strSql.Append(" INNER JOIN EI_ManagerInfo c on c.AccountNumber=b.TID ");
            strSql.Append(" Where a.MfgID=@mfgID AND a.DelFlag=0 ;");

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@mfgID", MySqlDbType.VarChar, 40)
            };
            parameters[0].Value = mfgID;
            return MySQLHelper.Query(strSql.ToString(), parameters);
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
        public DataSet GetStuNotRelTeacByMfgIDAndOrgID(string mfgID, int orgID, string name, string createBy)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT ID,AccountNumber,UType,Name,Gender,CardNumber,OrgID,LoginName,Pwd,Phone,Postion,QQ,Email,HeadImg,AcaStru,ArtSciences,RoleTypeID,CreateTime,FirstLogin,CreateBy,DelFlag,FreezeFlag,Remark from EI_ManagerInfo ");
            strSql.Append(" WHERE OrgID=@OrgID  ");
            //strSql.Append(" AND  AccountNumber  NOT IN (SELECT  TID FROM EI_MRelS WHERE FIND_IN_SET (SID,@MfgID)) ");//老师与学生关联
            strSql.AppendFormat(" AND  AccountNumber  NOT IN (SELECT  TID FROM EI_MRelS WHERE FIND_IN_SET (SID,@MfgID) GROUP BY TID  HAVING COUNT(TID)={0})  ", (mfgID.Split(',').Length - 1));//老师与学生关联
            //strSql.Append(" AND AccountNumber NOT IN ( SELECT b.TID FROM  EI_GRelS a INNER JOIN  EI_GRelM b ON a.GID=b.GID WHERE FIND_IN_SET (a.SID,@MfgID) )  ");//学生分组 老师分组
            if (!string.IsNullOrEmpty(name))
            {
                strSql.Append(" AND Name=@Name ");
            }
            if (!string.IsNullOrEmpty(createBy))
            {
                strSql.Append(" AND ( CreateBy=@CreateBy OR AccountNumber=@CreateBy )"); //添加创建者过滤
            }

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@mfgID", MySqlDbType.VarChar, 2000),
                new MySqlParameter("@OrgID", MySqlDbType.Int32, 11),
                new MySqlParameter("@Name", MySqlDbType.VarChar, 40),
                new MySqlParameter("@CreateBy", MySqlDbType.VarChar, 40)
            };

            parameters[0].Value = mfgID.Substring(0, mfgID.Length - 1);
            parameters[1].Value = orgID;
            parameters[2].Value = name;
            parameters[3].Value = createBy;

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        #endregion

        #region 获取学生未关联的老师列表
        /// <summary>
        /// 获取学生未关联的老师列表
        /// </summary>
        /// <param name="mfgID"></param>
        /// <param name="orgID"></param>
        /// <param name="createBy"></param>
        /// <returns></returns>
        public DataSet GetStuNotRelTeac(string mfgIDs, int orgID, int createBy)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" SELECT ID,AccountNumber,UType,Name,Gender,CardNumber,OrgID,LoginName,Pwd,Phone,Postion,QQ,Email,HeadImg,AcaStru,ArtSciences,RoleTypeID,CreateTime,FirstLogin,CreateBy,DelFlag,FreezeFlag,Remark from EI_ManagerInfo ");
            strSql.Append(" WHERE OrgID=@OrgID  ");
            //strSql.Append(" AND  AccountNumber  NOT IN (SELECT  TID FROM EI_MRelS WHERE FIND_IN_SET (SID,@mfgIDs)) ");//老师与学生关联
            strSql.AppendFormat(" AND  AccountNumber  NOT IN (SELECT  TID FROM EI_MRelS WHERE FIND_IN_SET (SID,@mfgIDs) GROUP BY TID  HAVING COUNT(TID)={0})  ", (mfgIDs.Split(',').Length - 1));//老师与学生关联
            //strSql.Append(" AND AccountNumber NOT IN ( SELECT b.TID FROM  EI_GRelS a INNER JOIN  EI_GRelM b ON a.GID=b.GID WHERE FIND_IN_SET (a.SID,@mfgIDs) )  ");//学生分组 老师分组

            if (createBy > 0)
            {
                //strSql.Append(" AND ( CreateBy=@CreateBy OR AccountNumber=@CreateBy )"); //添加创建者过滤
                strSql.Append(" AND ( CreateBy=@CreateBy )"); //添加创建者过滤
            }

            MySqlParameter[] parameters =
            {
                new MySqlParameter("@mfgIDs", MySqlDbType.VarChar, 2000),
                new MySqlParameter("@OrgID", MySqlDbType.Int32, 11),
                new MySqlParameter("@CreateBy", MySqlDbType.VarChar, 40)
            };

            parameters[0].Value = mfgIDs.Substring(0, mfgIDs.Length - 1);
            parameters[1].Value = orgID;
            parameters[2].Value = createBy;

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }

        #endregion

        #region 根据sID和tID删除一条数据(学生与老师)
        /// <summary>
        /// 根据sID和tID删除一条数据(学生与老师)
        /// </summary>
        /// <param name="sID">sID</param>
        /// <param name="tID">tID</param>
        /// <returns></returns>
        public bool DeleteBySIDAndTID(string sID, string tID)
        {
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_MRelS ");
            strSql.Append(" where SID=@SID and TID=@TID  ");
            MySqlParameter[] parameters = {
                                             new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                                             new MySqlParameter("@TID", MySqlDbType.VarChar,40)
			};
            parameters[0].Value = sID;
            parameters[1].Value = tID;
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

        #region 批量添加学生与老师的关联
        /// <summary>
        ///  批量添加学生与老师的关联
        /// </summary>
        /// <param name="mfgIDs">魔方格IDs</param>
        /// <param name="tIDs">老师IDs</param>
        /// <returns></returns>
        public int AddStuRelTeac(string mfgIDs, string tIDs)
        {
            //  INSERT INTO EI_MRelS VALUES (SID,TID),(1,'22222222') 批量插入语句
            Dictionary<string, object> dictionary = new Dictionary<string, object>();
            StringBuilder strSql = new StringBuilder();
            StringBuilder sb = new StringBuilder();
            StringBuilder delSql = new StringBuilder();


            int i = 0, j = 0;
            foreach (var mfgID in mfgIDs.Substring(0, mfgIDs.Length - 1).Split(','))
            {
                j = 0;
                sb.Clear();

                sb.Append(" INSERT INTO EI_MRelS(SID,TID) VALUES ");

                foreach (var tID in tIDs.Substring(0, tIDs.Length - 1).Split(','))
                {
                    delSql.AppendFormat(" DELETE FROM EI_MRelS WHERE SID=@SID{0} AND TID=@TID{1} ; ", i, j);//删除
                    sb.AppendFormat(" (@SID{0},@TID{1}),", i, j);
                    if (i == 0)
                    {
                        dictionary.Add("TID" + j, tID);
                    }

                    j++;
                }
                dictionary.Add("SID" + i, mfgID);

                strSql.Append(sb.ToString().Substring(0, sb.ToString().Length - 1) + "; ");

                i++;
            }

            return _commonDal.GetNumBySqlAndDic(delSql.ToString() + strSql.ToString().Substring(0, strSql.ToString().Length - 1), dictionary);
        }

        #endregion


    }
}
