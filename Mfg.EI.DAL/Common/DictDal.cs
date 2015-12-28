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
    public class DictDal
    {
        public List<EI_Dict> GetDict(string type)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT EI_Dict.ID,EI_Dict.PID,EI_Dict.`Value`,EI_Dict.`Code`,EI_Dict.Type,EI_Dict.CreateTime,EI_Dict.DelFlag,EI_Dict.Remark FROM EI_Dict  WHERE EI_Dict.Type=@type");

            MySqlParameter[] parameters = {
					new MySqlParameter("@type", MySqlDbType.VarChar,40)
			};
            parameters[0].Value = type;

            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            return Common.ModelConvertHelper<EI_Dict>.ConvertToModelList(ds.Tables[0]);

        }
    }
}
