/*
 * author:谢利民;
 * function:知识测评知识点关联表【EI_TARelKno】操作的功能
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
    /// 知识测评知识点关联表【EI_TARelKno】操作的功能
    /// </summary>
    public class TARelKnoDal
    {
        /// <summary>
        /// 根据测评ID获取模型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<TARelKnoModel> GetTKnoModelList(string id)
        {
            //List<TARelKnoModel> list = new List<TARelKnoModel>();
            StringBuilder strSql = new StringBuilder();
            //List<MySqlParameter> para = new List<MySqlParameter>()
            //{
            //    new MySqlParameter("@ExamID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=id},
            //};
            //strSql.Append(@"select ExamKnowID,KID,KnowledgeName,ClassHour,DefaultHour,DiffNum from EI_TestExamKnow where ExamID=@ExamID;");
            //list = MySQLHelper.ExecuteStatement<TARelKnoModel>(strSql.ToString(), (a) =>
            //{
            //    return new TARelKnoModel()
            //    {
            //        TAID = id,
            //        KID = a.GetString(1),
            //        KnowledgeName = a.GetString(2),
            //        ClassHour = a.GetInt32(3),
            //        DefaultHour = a.GetInt32(4),
            //        DiffNum = a.GetInt32(5)
            //    };
            //}, para);
            //return list;
            strSql.Append("select TAID,KID,KnowledgeName,ClassHour,DefaultHour from EI_TARelKno");
            strSql.Append(" where TAID=@TAID  ");
            MySqlParameter[] parameters = {
                     new MySqlParameter("@TAID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = id;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<TARelKnoModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }


        /// <summary>
        /// 根据测评ID获取模型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<TARelKnoModel> GetNewTKnoModelList(string id)
        {
            List<TARelKnoModel> list = new List<TARelKnoModel>();
            StringBuilder strSql = new StringBuilder();
            List<MySqlParameter> para = new List<MySqlParameter>()
            {
                new MySqlParameter("@ExamID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=id},
            };
            strSql.Append(@"select ExamKnowID,KID,KnowledgeName,ClassHour,DefaultHour,DiffNum from EI_TestExamKnow where ExamID=@ExamID;");
            list = MySQLHelper.ExecuteStatement<TARelKnoModel>(strSql.ToString(), (a) =>
            {
                return new TARelKnoModel()
                {
                    TAID = id,
                    KID = a.GetString(1),
                    KnowledgeName = a.GetString(2),
                    ClassHour = a.GetInt32(3),
                    DefaultHour = a.GetInt32(4),
                    DiffNum = a.GetInt32(5)
                };
            }, para);
            return list;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="Taid"></param>
        /// <param name="kid"></param>
        /// <returns></returns>
        public bool UpdateClassHour(string Taid, string kid, int classhour)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_TARelKno set ");
            strSql.Append("ClassHour=@ClassHour,IsUse=1");
            strSql.Append(" where TAID=@TAID and KID=@KID");
            MySqlParameter[] parameters = {
                    new MySqlParameter("@ClassHour", MySqlDbType.Int32,40),
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40),
					new MySqlParameter("@KID", MySqlDbType.VarChar,40)
                };
            parameters[0].Value = classhour;
            parameters[1].Value = Taid;
            parameters[2].Value = kid;

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
        /// 
        /// </summary>
        /// <param name="Taid"></param>
        /// <param name="kid"></param>
        /// <returns></returns>
        public bool UpdateIsUse(string Taid, string kid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_TARelKno set ");
            strSql.Append("IsUse=1");
            strSql.Append(" where TAID=@TAID and KID=@KID");
            MySqlParameter[] parameters = {
                 
					new MySqlParameter("@TAID", MySqlDbType.VarChar,40),
					new MySqlParameter("@KID", MySqlDbType.VarChar,40)
                };
            parameters[0].Value = Taid;
            parameters[1].Value = kid;
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
    }
}
