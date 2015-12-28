/*
 * author:杨礼文;
 * function:公共Dal
 * date:2015-04-20
 */
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using Mfg.EI.DBHelper;
using MySql.Data.MySqlClient;

namespace Mfg.EI.DAL
{
    public class CommonDal
    {
        #region 根据sql和Dic获取dataSet
        /// <summary>
        /// 根据sql和Dic获取dataSet
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="dic">字典</param>
        /// <returns></returns>
        public DataSet GetDataSetBySqlAndDic(string sql, Dictionary<string, object> dic)
        {
            MySqlParameter[] parameters = new MySqlParameter[dic.Count];
            int i = 0;
            foreach (var item in dic)
            {
                parameters[i] = new MySqlParameter("@" + item.Key, item.Value);
                i++;
            }

            return MySQLHelper.Query(sql, parameters);


        } 
        #endregion

        #region 根据sql和Dic获取受影响的记录数
        /// <summary>
        /// 根据sql和Dic获取受影响的记录数
        /// </summary>
        /// <param name="sql">sql语句</param>
        /// <param name="dic">字典</param>
        /// <returns></returns>
        public int GetNumBySqlAndDic(string sql, Dictionary<string, object> dic)
        {
            MySqlParameter[] parameters = new MySqlParameter[dic.Count];
            int i = 0;
            foreach (var item in dic)
            {
                parameters[i] = new MySqlParameter("@" + item.Key, item.Value);
                i++;
            }

            return MySQLHelper.ExecuteSql(sql, parameters);
        }
        #endregion

        #region 查询科目
        /// <summary>
        /// 查询科目
        /// </summary>
        /// <returns></returns>
        public static DataSet QuerySubject()
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select ID,Subject from ei_subject");
            return MySQLHelper.Query(strSql.ToString());
        }
        #endregion
    }
}
