/*
 * author:谢利民;
 * function:同步学习作业与题目连接表【EI_SyncJob】操作的功能
 * adddate:2015-05-18
 * updatedate:2015-05-18
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
    public class SyncJobDal
    {
        private StudentInfoDal _studentInfoDal = new StudentInfoDal(); //学生信息
        /// <summary>
        /// 判断是否存在弱项提分
        /// </summary>
        /// <param name="jobId"></param>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public bool Exists(string jobId)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select count(1) from EI_SyncJob");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)
                            };
            parameters[0].Value = jobId;


            return MySQLHelper.Exists(strSql.ToString(), parameters);
        }

        /// <summary>
        /// 根据知识点ID和学生ID获取当前最大的轮数
        /// </summary>
        /// <param name="sid"></param>
        /// <param name="kid"></param>
        /// <returns></returns>
        public int GetTropNumber(string sid, string kid, string ruletype)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT  MAX(TropNumber) as TropNumber FROM EI_SyncJob");
            strSql.Append("  WHERE  SID=@SID AND KnowledgeID=@KnowledgeID AND RuleType=@RuleType");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@KnowledgeID",MySqlDbType.VarChar,40),
                    new MySqlParameter("@RuleType",MySqlDbType.VarChar,40)
                            };
            parameters[0].Value = sid;
            parameters[1].Value = kid;
            parameters[2].Value = ruletype;
            return (int)MySQLHelper.GetSingle(strSql.ToString(), parameters);
        }
        /// <summary>
        /// 根据知识点ID和学生ID获取当前最大的轮数
        /// </summary>
        /// <param name="sid"></param>
        /// <param name="kid"></param>
        /// <returns></returns>
        public int GetRoundNumber(string sid, string kid, string ruletype)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("SELECT  MAX(RoundNumber) as RoundNumber FROM EI_SyncJob");
            strSql.Append("  WHERE  SID=@SID AND KnowledgeID=@KnowledgeID AND RuleType=@RuleType");
            MySqlParameter[] parameters = {
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@KnowledgeID",MySqlDbType.VarChar,40),
                    new MySqlParameter("@RuleType",MySqlDbType.VarChar,40)
                            };
            parameters[0].Value = sid;
            parameters[1].Value = kid;
            parameters[2].Value = ruletype;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);


            return ds.Tables[0].Rows[0]["RoundNumber"].ToString() == "" ? 0 : Convert.ToInt32(ds.Tables[0].Rows[0]["RoundNumber"].ToString());
        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_SyncJob model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_SyncJob(");
            strSql.Append("ID,SID,KnowledgeID,KnowledgeName,GradeID,SubjectID,RoundNumber,MasterRate,RuleType,TropNumber,CreateTime,DelFlag,Remark,StageID,KnowledgeDetialID)");
            strSql.Append(" values (");
            strSql.Append("@ID,@SID,@KnowledgeID,@KnowledgeName,@GradeID,@SubjectID,@RoundNumber,@MasterRate,@RuleType,@TropNumber,@CreateTime,@DelFlag,@Remark,@StageID,@KnowledgeDetialID)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@ID", MySqlDbType.VarChar,40),
					new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,40),
					new MySqlParameter("@KnowledgeName", MySqlDbType.VarChar,100),
					new MySqlParameter("@GradeID", MySqlDbType.Int32,40),
					new MySqlParameter("@SubjectID", MySqlDbType.Int32,40),
					new MySqlParameter("@RoundNumber", MySqlDbType.Int32,11),
                    new MySqlParameter("@MasterRate", MySqlDbType.VarChar,40),
                    new MySqlParameter("@RuleType", MySqlDbType.Int32,10),
                    new MySqlParameter("@TropNumber", MySqlDbType.Int32,10),
					new MySqlParameter("@CreateTime", MySqlDbType.DateTime),
					new MySqlParameter("@DelFlag", MySqlDbType.Int32,1),
					new MySqlParameter("@Remark", MySqlDbType.VarChar,50),
                    new MySqlParameter("@StageID", MySqlDbType.Int32,11),
                    new MySqlParameter("@KnowledgeDetialID", MySqlDbType.VarChar,20)
                                          };
            parameters[0].Value = model.ID;
            parameters[1].Value = model.SID;
            parameters[2].Value = model.KnowledgeID;
            parameters[3].Value = model.KnowledgeName;
            parameters[4].Value = model.GradeID;
            parameters[5].Value = model.SubjectID;
            parameters[6].Value = model.RoundNumber;
            parameters[7].Value = model.MasterRate;
            parameters[8].Value = model.RuleType;
            parameters[9].Value = model.TropNumber;
            parameters[10].Value = model.CreateTime;
            parameters[11].Value = model.DelFlag;
            parameters[12].Value = model.Remark;
            parameters[13].Value = model.StageID;
            parameters[14].Value = model.KnowledgeDetialID;
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
        /// 更新一条数据
        /// </summary>
        public bool Update(EI_SyncJob model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_SyncJob set ");
            strSql.Append("RoundNumber=@RoundNumber,");
            strSql.Append("MasterRate=@MasterRate,");
            strSql.Append("RuleType=@RuleType,");
            strSql.Append("TropNumber=@TropNumber");
            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@RoundNumber", MySqlDbType.Int32,40),
					new MySqlParameter("@MasterRate", MySqlDbType.VarChar,40),
                    new MySqlParameter("@RuleType", MySqlDbType.Int32,40),
					new MySqlParameter("@TropNumber", MySqlDbType.Int32,10),
					new MySqlParameter("@ID", MySqlDbType.VarChar,40)
                                          };
            parameters[0].Value = model.RoundNumber;
            parameters[1].Value = model.MasterRate;
            parameters[2].Value = model.RuleType;
            parameters[3].Value = model.TropNumber;
            parameters[4].Value = model.ID;

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
        /// 更新奖杯数量
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateTrop(EI_SyncJob model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_SyncJob set ");
            strSql.Append("RoundNumber=@RoundNumber,");
            strSql.Append("MasterRate=@MasterRate,");
            strSql.Append("RuleType=@RuleType,");
            strSql.Append("TropNumber=@TropNumber");
            strSql.Append(" where KnowledgeID=@KnowledgeID ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@RoundNumber", MySqlDbType.Int32,40),
					new MySqlParameter("@MasterRate", MySqlDbType.VarChar,40),
                    new MySqlParameter("@RuleType", MySqlDbType.Int32,40),
					new MySqlParameter("@TropNumber", MySqlDbType.Int32,10),
					new MySqlParameter("@KnowledgeID", MySqlDbType.VarChar,40)
                                          };
            parameters[0].Value = model.RoundNumber;
            parameters[1].Value = model.MasterRate;
            parameters[2].Value = model.RuleType;
            parameters[3].Value = model.TropNumber;
            parameters[4].Value = model.KnowledgeID;

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
        /// 根据知识点获取信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<EI_SyncJob> GetModelList(string id, string subjectid, string gradeid)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select SID,KnowledgeID,KnowledgeName,GradeID,SubjectID,RoundNumber,MasterRate from EI_SyncJob");
            strSql.Append(" where KnowledgeID=@KnowledgeID  AND  SubjectID=@SubjectID AND GradeID=@GradeID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@KnowledgeID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@SubjectID", MySqlDbType.VarChar,40),
                      new MySqlParameter("@GradeID", MySqlDbType.VarChar,40)
                                         };
            parameters[0].Value = id;
            parameters[1].Value = subjectid;
            parameters[2].Value = gradeid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_SyncJob>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }

        /// <summary>
        /// 根据知识点ID和学生ID获取信息
        /// </summary>
        /// <param name="kid"></param>
        /// <param name="sid"></param>
        /// <returns></returns>
        public List<EI_SyncJob> GetSysModelList(string kid, string sid,string subjectID)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select SID,KnowledgeID,KnowledgeName,GradeID,SubjectID,RoundNumber,MasterRate from EI_SyncJob");
            strSql.Append(" where KnowledgeID=@KnowledgeID  AND  SID=@SID AND SubjectID=@SubjectID");
            MySqlParameter[] parameters = {
					new MySqlParameter("@KnowledgeID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@SID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@SubjectID", MySqlDbType.VarChar,40)
                                         };
            parameters[0].Value = kid;
            parameters[1].Value = sid;
            parameters[2].Value = subjectID;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<EI_SyncJob>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 插入经验值
        /// </summary>
        /// <param name="sID"></param>
        /// <param name="experNumber"></param>
        /// <returns></returns>
        public bool InsertExceptValue(string sID, int experNumber)
        {
            string strSql = _studentInfoDal.UpdateExperNumber(sID, experNumber);

            return MySQLHelper.ExecuteSql(strSql) > 0;
        }
    }
}
