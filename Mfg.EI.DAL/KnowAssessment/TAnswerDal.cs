/*
 * author:谢利民;
 * function:知识测评答题表【EI_TAnswer】操作的功能
 * adddate:2015-05-20
 * updatedate:2015-05-20
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
    /// 知识测评答题表【EI_TAnswer】操作
    /// </summary>
   public  class TAnswerDal
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
       public bool Add(List<EI_TAnswer> modelList)
        {
            List<String> SqlList = new List<String>();
            List<MySqlParameter[]> sqlParamList = new List<MySqlParameter[]>();
            StringBuilder strdel = new StringBuilder();
            strdel.AppendFormat("delete from EI_TAnswer where TAID='{0}';",modelList.First().TAID);
            SqlList.Add(strdel.ToString());
            sqlParamList.Add(new MySqlParameter[] { });
            int i = 0;
           if(modelList.Count>0)
           {
               foreach(var model in modelList)
               {
                   StringBuilder strSql = new StringBuilder();
                   strSql.Append("insert into EI_TAnswer(");
                   strSql.Append("TAID,ItemID,Accuracy,Answer,AnswerTime,ItemSource,CreateTime,DelFlag,Remark)");
                   strSql.Append(" values (");
                   strSql.AppendFormat("@TAID{0},@ItemID{0},@Accuracy{0},@Answer{0},@AnswerTime{0},@ItemSource{0},@CreateTime{0},@DelFlag{0},@Remark{0});",i);
             
                   MySqlParameter[] parameters = {
					new MySqlParameter(string.Format("@TAID{0}",i), MySqlDbType.VarChar,40),
					new MySqlParameter(string.Format("@ItemID{0}",i), MySqlDbType.Int32,40),
					new MySqlParameter(string.Format("@Accuracy{0}",i), MySqlDbType.Int32,40),
					new MySqlParameter(string.Format("@Answer{0}",i), MySqlDbType.VarChar,11),
					new MySqlParameter(string.Format("@AnswerTime{0}",i), MySqlDbType.Int32,40),
					new MySqlParameter(string.Format("@ItemSource{0}",i), MySqlDbType.Int32,5),
					new MySqlParameter(string.Format("@CreateTime{0}",i), MySqlDbType.DateTime),
					new MySqlParameter(string.Format("@DelFlag{0}",i), MySqlDbType.Int32,1),
					new MySqlParameter(string.Format("@Remark{0}",i), MySqlDbType.VarChar,50)};
                   parameters[0].Value = model.TAID;
                   parameters[1].Value = model.ItemID;
                   parameters[2].Value = model.Accuracy;
                   parameters[3].Value = model.Answer;
                   parameters[4].Value = model.AnswerTime;
                   parameters[5].Value = model.ItemSource;
                   parameters[6].Value = model.CreateTime;
                   parameters[7].Value = model.DelFlag;
                   parameters[8].Value = model.Remark;
                   SqlList.Add(strSql.ToString());
                   sqlParamList.Add(parameters);
                   i++;
               }
           }

           return MySQLHelper.ExecuteSqlTran(SqlList, sqlParamList) > 0;
        }

       /// <summary>
       /// 根据ID取答题集合
       /// </summary>
       /// <param name="taid"></param>
       /// <returns></returns>
       public List<EI_TAnswer> GetModelList(string taid)
       {
           StringBuilder strSql = new StringBuilder();
           strSql.Append("select DISTINCT ItemID, Accuracy,ItemSource,Answer,CreateTime from EI_TAnswer");
           strSql.Append(" where TAID=@TAID ");
           MySqlParameter[] parameters = {
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40)			};
           parameters[0].Value = taid;
           DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
           if (ds.Tables[0].Rows.Count > 0)
           {
               return ModelConvertHelper<EI_TAnswer>.ConvertToModelList(ds.Tables[0]);
           }
           else
           {
               return null;
           }
       }

       /// <summary>
       /// 获取试题答案模型
       /// </summary>
       /// <param name="taid"></param>
       /// <returns></returns>
       public List<TAnswerModel> GetTAnswerModelList(string taid)
       {
           StringBuilder strSql = new StringBuilder();
           strSql.Append("select A.TAID AS TAID,A.KID AS KID,A.ItemID AS ItemID, B.Accuracy AS Accuracy,B.Answer AS Answer,B.ItemSource AS ItemSource,B.CreateTime ");
           strSql.Append(" from EI_TARelItem A LEFT JOIN EI_TAnswer B on  A.TAID=B.TAID AND A.ItemID=B.ItemID");
           strSql.Append(" WHERE A.TAID=@TAID ");

           MySqlParameter[] parameters = {
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40)
                                         };
           parameters[0].Value = taid;
           DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
           if (ds.Tables[0].Rows.Count > 0)
           {
               return ModelConvertHelper<TAnswerModel>.ConvertToModelList(ds.Tables[0]);
           }
           else
           {
               return null;
           }
       }
    }
}
