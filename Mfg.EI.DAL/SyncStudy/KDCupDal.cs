using Mfg.EI.DBHelper;
using Mfg.EI.ViewModel;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mfg.EI.DAL.SyncStudy
{
    public class KDCupDal
    {
        /// <summary>
        /// 查询奖杯数量
        /// </summary>
        /// <param name="userId">当前登录名</param>
        /// <returns></returns>
        public List<EI_KDCup> GetCupList(int userId)
        {
            StringBuilder strSql = new StringBuilder();

            strSql.Append("select SID,KDId,CupCount from EI_KDCup where SID=@SID");
            MySqlParameter[] mySqlParameter =  
            { 
                new MySqlParameter("@SID", MySqlDbType.Int32)
             };
            mySqlParameter[0].Value = userId;
            DataSet ds= MySQLHelper.Query(strSql.ToString(), mySqlParameter);
            List<EI_KDCup> list = Mfg.EI.Common.ModelConvertHelper<EI_KDCup>.ConvertToModelList(ds.Tables[0]);
            return list;
        }
    }
}
