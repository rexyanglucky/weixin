/*
 * author:谢利民;
 * function:同步学习作业与题目连接表【EI_SyncJRelI】操作的功能
 * adddate:2015-05-13
 * updatedate:2015-05-13
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
    /// 同步学习作业与题目连接表【EI_SyncJRelI】操作
    /// </summary>
    public class SyncJRelIDal
    {

        /// <summary>
        /// 根据JobID获取同步学习作业
        /// </summary>
        /// <returns></returns>
        public List<SyncJRelIModel> GetModelList(string jobid)
        {
            List<SyncJRelIModel> listRelI = new List<SyncJRelIModel>();
            StringBuilder strSql = new StringBuilder();
            strSql.Append("select JID,SequenceID,ItemID,ItemType,KnowledgeID,KnowledgeName from EI_SyncJRelI");
            strSql.Append(" where JID=@JID ORDER BY ItemID  ");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40)			};
            parameters[0].Value = jobid;
            DataSet ds = MySQLHelper.Query(strSql.ToString(), parameters);
            if (ds.Tables[0].Rows.Count > 0)
            {
                return ModelConvertHelper<SyncJRelIModel>.ConvertToModelList(ds.Tables[0]);
            }
            else
            {
                return null;
            }

        }

        /// <summary>
        /// 增加一条数据
        /// </summary>
        public bool Add(EI_SyncJRelI model)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("insert into EI_SyncJRelI(");
            strSql.Append("JID,ItemID,ItemType,SequenceID,KnowledgeID,KnowledgeName)");
            strSql.Append(" values (");
            strSql.Append("@JID,@ItemID,@ItemType,@SequenceID,@KnowledgeID,@KnowledgeName)");
            MySqlParameter[] parameters = {
					new MySqlParameter("@JID", MySqlDbType.VarChar,40),
					new MySqlParameter("@ItemID", MySqlDbType.VarChar,40),
                    new MySqlParameter("@ItemType", MySqlDbType.Int32,40),
					new MySqlParameter("@SequenceID", MySqlDbType.VarChar,100),
					new MySqlParameter("@KnowledgeID", MySqlDbType.Int32,40),
					new MySqlParameter("@KnowledgeName", MySqlDbType.VarChar,40)
                                          };
            parameters[0].Value = model.JID;
            parameters[1].Value = model.ItemID;
            parameters[2].Value = model.ItemType;
            parameters[3].Value = model.SequenceID;
            parameters[4].Value = model.KnowledgeID;
            parameters[5].Value = model.KnowledgeName;
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
        /// 添加笔记
        /// </summary>
        /// <param name="jaid"></param>
        /// <param name="noteContent"></param>
        /// <returns></returns>
        public bool AddItemNote(string jaid, string noteContent)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append("update EI_SyncJAnswer set ");

            strSql.Append("NoteContent=@NoteContent");

            strSql.Append(" where ID=@ID ");
            MySqlParameter[] parameters = {
				
					new MySqlParameter("@NoteContent", MySqlDbType.VarChar,500),
                    new MySqlParameter("@ID", MySqlDbType.VarChar,40)
				};
            parameters[0].Value = noteContent;
            parameters[1].Value = jaid;

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

        public List<SyncJobModel> GetCup(SyncJobModel dto)
        {
            StringBuilder strSql = new StringBuilder();
            strSql.Append(@"select KnowledgeID,MAX(TropNumber) as TropNumber from EI_SyncJob where SID=@SID and GradeID=@GradeID and TropNumber>0  AND subjectID=@SubjectID AND RuleType=0
GROUP BY  KnowledgeID;");
            List<MySqlParameter> parameters = new List<MySqlParameter>()
            {
                new MySqlParameter("@SID", MySqlDbType.VarChar,40){ Direction=ParameterDirection.InputOutput, Value=dto.SID},
                new MySqlParameter("@GradeID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.GradeID},
                new MySqlParameter("@SubjectID", MySqlDbType.Int32,11){ Direction=ParameterDirection.InputOutput, Value=dto.SubjectID},
            };
            return MySQLHelper.ExecuteStatement<SyncJobModel>(strSql.ToString(), (a) =>
            {
                return new SyncJobModel()
                {
                    KnowledgeID = a.IsDBNull(0) ? 0 : a.GetInt32(0),
                    TropNumber = a.IsDBNull(1) ? 0 : a.GetInt32(1)
                };
            }, parameters);
        }
    }
}
