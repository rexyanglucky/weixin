

/*
 * author:杨礼文;
 * function:入学成绩Dal
 * date:2015-04-20
 */

using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Mfg.EI.DBHelper;
using Mfg.EI.Entity;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL
{
    public class EnterScoreDal
    {

        public EnterScoreDal()
        { }
        #region  BasicMethod

        /// <summary>
        /// 得到最大ID
        /// </summary>
        public int GetMaxId()
        {
            return MySQLHelper.GetMaxID("ID", "EI_EnterScore");
        }

        /// <summary>
        /// 是否存在该记录
        /// </summary>
        public bool Exists(int ID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_EnterScore");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.Int32)
			};
            parameters[0].Value = ID;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_EnterScore model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_EnterScore(");
            strSql.Append("Total,Score,StuID,SubjectID,CreateTime,DelFlag,Remark)");
            strSql.Append(" values (");
            strSql.Append("@Total,@Score,@StuID,@SubjectID,@CreateTime,@DelFlag,@Remark)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Total", MySqlDbType.Int32,11),
					new MySqlParameter("@Score", MySqlDbType.Float,5),
					new MySqlParameter("@StuID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SubjectID", MySqlDbType.Int32,1),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50)};
            parameters[0].Value = model.Total;
            parameters[1].Value = model.Score;
            parameters[2].Value = model.StuID;
            parameters[3].Value = model.SubjectID;
            parameters[4].Value = model.CreateTime;
            parameters[5].Value = model.DelFlag;
            parameters[6].Value = model.Remark;

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
        public bool Update(EI_EnterScore model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_EnterScore set ");
            strSql.Append("Total=@Total,");
            strSql.Append("Score=@Score,");
            strSql.Append("StuID=@StuID,");
            strSql.Append("SubjectID=@SubjectID,");
            strSql.Append("CreateTime=@CreateTime,");
            strSql.Append("DelFlag=@DelFlag,");
            strSql.Append("Remark=@Remark");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@Total", MySqlDbType.Int32,11),
					new MySqlParameter("@Score", MySqlDbType.Float,5),
					new MySqlParameter("@StuID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SubjectID", MySqlDbType.Int32,1),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
					new MySqlParameter("@ID", MySqlDbType.Int32,11)};
            parameters[0].Value = model.Total;
            parameters[1].Value = model.Score;
            parameters[2].Value = model.StuID;
            parameters[3].Value = model.SubjectID;
            parameters[4].Value = model.CreateTime;
            parameters[5].Value = model.DelFlag;
            parameters[6].Value = model.Remark;
            parameters[7].Value = model.ID;

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
            strSql.Append("delete from EI_EnterScore ");
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
            strSql.Append("delete from EI_EnterScore ");
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
        public EI_EnterScore GetModel(int ID)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select ID,Total,Score,StuID,SubjectID,CreateTime,DelFlag,Remark from EI_EnterScore ");
            strSql.Append(" where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.Int32)
			};
            parameters[0].Value = ID;

            EI_EnterScore model = new EI_EnterScore();
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
        public EI_EnterScore DataRowToModel(DataRow row)
        {
            EI_EnterScore model = new EI_EnterScore();
            if (row != null)
            {
                if (row["ID"] != null && row["ID"].ToString() != "")
                {
                    model.ID = int.Parse(row["ID"].ToString());
                }
                if (row["Total"] != null && row["Total"].ToString() != "")
                {
                    model.Total = int.Parse(row["Total"].ToString());
                }
                if (row["Score"] != null && row["Score"].ToString() != "")
                {
                    model.Score = float.Parse(row["Score"].ToString());
                }
                if (row["StuID"] != null)
                {
                    model.StuID = row["StuID"].ToString();
                }
                if (row["SubjectID"] != null && row["SubjectID"].ToString() != "")
                {
                    model.SubjectID = int.Parse(row["SubjectID"].ToString());
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
            strSql.Append("select ID,Total,Score,StuID,SubjectID,CreateTime,DelFlag,Remark ");
            strSql.Append(" FROM EI_EnterScore ");
            if (strWhere.Trim() != "")
            {
                strSql.Append(" where " + strWhere);
            }
            return MySQLHelper.Query(strSql.ToString());
        }

        /// <summary>
        /// 根据sql获取数据
        /// </summary>
        /// <param name="sql">sql</param>
        /// <param name="stuID">学生ID</param>
        /// <returns></returns>
        public DataSet GetListBySqlandStuID(string sql, string stuID)
        {
            MySqlParameter[] parameters = {
					new MySqlParameter("@stuID", MySqlDbType.VarChar,40)
			};
            parameters[0].Value = stuID;
            return MySQLHelper.Query(sql, parameters);
        }


        /// <summary>
        /// 获取记录总数
        /// </summary>
        public int GetRecordCount(string strWhere)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) FROM EI_EnterScore ");
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
            strSql.Append(")AS Row, T.*  from EI_EnterScore T ");
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
            parameters[0].Value = "EI_EnterScore";
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




    }
}
