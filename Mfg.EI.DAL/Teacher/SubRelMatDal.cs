/*
 * author:谢利民;
 * function:阶段科目对应表【EI_StaRelSub】操作的功能
 * adddate:2015-04-22
 * updatedate:2015-04-22
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

namespace Mfg.EI.DAL.Teacher
{
    /// <summary>
    /// 
    /// </summary>
   public class SubRelMatDal
    {
        /// <summary>
        /// 得到一个对象实体
        /// </summary>
        public List<EI_SubRelMat> GetModelList()
        {
            //该表无主键信息，请自定义主键/条件字段
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select SubjectID,MaterialID from EI_SubRelMat ");
          //  strSql.Append(" where TID=@TID");
            //MySqlParameter[] parameters = {
            //        new MySqlParameter("@TID", MySqlDbType.VarChar,40)			};
            //parameters[0].Value = tid;
            DataSet ds = MySQLHelper.Query(strSql.ToString());
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_SubRelMat>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }
    }
}
