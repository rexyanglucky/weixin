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

namespace Mfg.EI.DAL.WeiXin.Bulletin
{
   public class BulletinDAL
    {
        #region 查询公告
        /// <summary>
        /// 查询机构公告
        /// </summary>
        /// <param name="OrgID"></param>
        /// <returns></returns>
        public DataSet GetOrgBulletin(int OrgID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select ID,ContentTitle,Content,OrgID,CreateTime from ei_announcement ");
            strSql.Append(" where OrgID=@OrgID ");
            strSql.Append(" and DelFlag=0 ");
            strSql.Append(" order by CreateTime desc ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@OrgID", MySqlDbType.Int32,20)};

            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
       /// <summary>
       /// 查询单个公告
       /// </summary>
       /// <param name="OrgID"></param>
       /// <returns></returns>
       public DataSet GetSingleBulletin(int BID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(" select ID,ContentTitle,Content,OrgID,CreateTime from ei_announcement ");
            strSql.Append(" where ID=@BID ");
            MySqlParameter[] parameters ={
                new MySqlParameter("@BID", MySqlDbType.Int32,20)};
            parameters[0].Value = BID;
            return MySQLHelper.Query(strSql.ToString(), parameters);
        }
        #endregion
    }
}
