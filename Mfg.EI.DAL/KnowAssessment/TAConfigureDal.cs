/*
 * author:谢利民;
 * function:知识测评答题表【EI_TAnswer】操作的功能
 * adddate:2015-06-06
 * updatedate:2015-06-06
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
using Mfg.EI.ViewModel;

namespace Mfg.EI.DAL
{
    /// <summary>
    /// 
    /// </summary>
    public class TAConfigureDal
    {
        /// <summary>
        /// 判断是否存在配置课时信息
        /// </summary>
        public bool Exists(string taid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_TAConfigure");
            strSql.Append(" where TAID=@TAID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = taid;

            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }


        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(List<TAConfigureModel> modelList)
        {

            List<String> SqlList = new List<String>();
            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            int i = 0;
            if (modelList.Count > 0)
            {
                foreach (var model in modelList)
                {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_TAConfigure(");
            strSql.Append("TAID,TotalHour,KID,KnowledgeName,LevelSet,MathClass)");
            strSql.Append(" values (");
                    strSql.AppendFormat("@TAID{0},@TotalHour{0},@KID{0},@KnowledgeName{0},@LevelSet{0},@MathClass{0});", i);
            MySqlParameter[] parameters = {
					new MySqlParameter(string.Format("@TAID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@TotalHour{0}",i), MySqlDbType.Int32,40),
					new MySqlParameter(string.Format("@KID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@KnowledgeName{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@LevelSet{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@MathClass{0}",i), MySqlDbType.Int32,40)
					};
            parameters[0].Value = model.TAID;
            parameters[1].Value = model.TotalHour;
            parameters[2].Value = model.KID;
            parameters[3].Value = model.KnowledgeName;
            parameters[4].Value = model.LevelSet;
            parameters[5].Value = model.MathClass;
  
                    SqlList.Add(strSql.ToString());
                    sqlParamList.Add(parameters);
                    i++;
            }
            }
            SqlList.Add(string.Format("Update EI_TARContent SET State=1 WHERE TAID='{0}'", modelList.First().TAID));
            sqlParamList.Add(new MySqlParameter[] { });
            return MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0;
        }
        /// <summary>
        /// 更新一条数据
        /// 
        /// </summary>
        public bool Update(List<TAConfigureModel> modelList)
        {
            List<String> SqlList = new List<String>();
            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            int i = 0;
            if (modelList.Count > 0)
            {
                foreach (var model in modelList)
                {
            StringBuilder strSql = new StringBuilder();
                    strSql.Append(" update  EI_TAConfigure set");
                    strSql.AppendFormat("TotalHour=@TotalHour{0},KID=@KID{0},KnowledgeName=@KnowledgeName{0},LevelSet=@LevelSet{0},MathClass=@MathClass{0} where TAID=@TAID{0};", i);
            MySqlParameter[] parameters = {
					new MySqlParameter(string.Format("@TotalHour{0}",i), MySqlDbType.Int32,40),
					new MySqlParameter(string.Format("@KID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@KnowledgeName{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@LevelSet{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@MathClass{0}",i), MySqlDbType.Int32,40),
                    new MySqlParameter(string.Format("@TAID{0}",i), MySqlDbType.VarChar,40)
                                          };
            parameters[0].Value = model.TotalHour;
            parameters[1].Value = model.KID;
            parameters[2].Value = model.KnowledgeName;
            parameters[3].Value = model.LevelSet;
            parameters[4].Value = model.MathClass;
            parameters[5].Value = model.TAID;
                    SqlList.Add(strSql.ToString());
                    sqlParamList.Add(parameters);
                    i++;
                }
            }

            return MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="taid"></param>
        /// <returns></returns>
        public bool Delete(string taid)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("delete from EI_TAConfigure ");
            strSql.Append(" where TAID=@TAID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = taid;

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
        /// 根据测评ID获取模型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<TAConfigureModel> GetTAConfigureModelList(string taid)
        {
       
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select TAID,TotalHour,KID,KnowledgeName,LevelSet,MathClass from EI_TAConfigure");
            strSql.Append(" where TAID=@TAID  ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = taid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<TAConfigureModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
        }

    }
}
}
