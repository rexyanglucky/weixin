/*
 * author:谢利民;
 * function:知识测评答题表【EI_TARContent】操作的功能
 * adddate:2015-06-26
 * updatedate:2015-06-26
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
  public  class TARContentDal
    {
      /// <summary>
      /// 修改测评结果内容
      /// </summary>
      /// <param name="contentModel"></param>
      /// <returns></returns>
       public bool UpdateTARContent(TARContentModel contentModel)
       {
           bool result = false;
           StringBuilder strSql = new StringBuilder();
           strSql.Append("select count(1) from EI_TARContent where TAID=@TAID AND KID=@KID");
           MySqlParameter[] parameters = {
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40)	,
                    new MySqlParameter("@KID", MySqlDbType.VarChar,40)              
                                         };
           parameters[0].Value = contentModel.TAID;
           parameters[1].Value = contentModel.KID;
           result= MySQLHelper.Exists(strSql.ToString(), parameters);
           strSql.Clear();
           if(result)
           {
               //更新内容
               strSql.AppendFormat("Update EI_TARContent SET SetContent='{0}',State=0,UpdateTime='{1}'WHERE TAID='{2}' AND KID='{3}'",
                   contentModel.SetContent,
                   DateTime.Now,
                   contentModel.TAID,
                   contentModel.KID);
           }
           else
           {
               //添加内容
               strSql.AppendFormat("insert into EI_TARContent(TAID,KID,KnowledgeName,SetContent,State,UpdateTime) values('{0}','{1}','{2}','{3}','{4}','{5}')",
                   contentModel.TAID,
                   contentModel.KID,
                   contentModel.KnowledgeName,
                   contentModel.SetContent,
                   contentModel.State,
                   DateTime.Now);
           }

           return MySQLHelper.ExecuteSql(strSql.ToString())>0;
       }

      /// <summary>
      /// 获取修改内容集合
      /// </summary>
      /// <returns></returns>
       public List<TARContentModel> GetContentModelList(string taid)
       {
           StringBuilder strSql = new StringBuilder();
           strSql.Append("select TAID,KID,KnowledgeName,SetContent,State ");
           strSql.Append(" from EI_TARContent ");
           strSql.Append(" WHERE TAID=@TAID ");

           MySqlParameter[] parameters = {
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40)
                                         };
           parameters[0].Value = taid;
           DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
           if (ds.Tables[0].Rows.Count > 0)
           {
               return ModelConvertHelper<TARContentModel>.ConvertToModelList(ds.Tables[0]);
           }
           else
           {
               return null;
           }
       }
    }
}
