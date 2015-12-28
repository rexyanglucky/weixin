/*
 * author:谢利民;
 * function:知识测评与题目关联表【EI_TARelItem】操作的功能
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
    /// 知识测评与题目关联表【EI_TARelItem】操作的功能
    /// </summary>
    public class TARelItemDal
    {
        /// <summary>
        /// 根据测评ID获取模型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<TARelItemModel> GetItemModelList(string id)
        {

            StringBuilder strSql = new StringBuilder();
            strSql.Append("select TAID,KID,ItemID,DiffNum,SequenceID,ItemSource,PointID,PointName from EI_TARelItem");
            strSql.Append(" where TAID=@TAID ORDER BY ItemID  ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = id;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<TARelItemModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }

        }


        /// <summary>
        /// 根据ID获取学生姓名
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetTempStudentName(string id)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select Name from EI_TempStudentInfo where ID=@ID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = id;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ds.Tables[0].Rows[0]["Name"].ToString();
            }
            else
            {
                return string.Empty;
            }
        }
        /// <summary>
        /// 获取答题的数目
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int GetAnswerCount(string id)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"SELECT ScheduledTime from ei_testanalyze where id=@TAID;");
            //strSql.Append("select count(1) as count from EI_TARelItem where TAID=@TAID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40)		
                                          };
            parameters[0].Value = id;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());
            }
            else
            {
                return 0;
            }
        }

        /// <summary>
        /// 根据学生ID获取学生信息
        /// </summary>
        /// <param name="SID"></param>
        /// <returns></returns>
        public EI_TempStudentInfo GetTempStudent(string SID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select TID,Name,TrainAim,Phone,CreateTime,StageID, GradeID,age,School,Gender,Adddress from EI_TempStudentInfo ");
            strSql.Append(" where ID=@SID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = SID;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_TempStudentInfo>.ConvertToModel(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }

    }
}
